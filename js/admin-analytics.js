import { formatPriceVND } from "./courses-data.js";

function safeJsonParse(raw, fallback) {
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function loadList(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = safeJsonParse(raw, []);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toDayKey(dateLike) {
  const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
  if (Number.isNaN(d.getTime())) return null;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function lastNDaysKeys(days) {
  const out = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const k = toDayKey(d);
    if (k) out.push(k);
  }
  return out;
}

function sum(nums) {
  return nums.reduce((acc, n) => acc + (Number.isFinite(n) ? n : 0), 0);
}

function groupSumBy(items, keyFn, valueFn) {
  const map = new Map();
  items.forEach((it) => {
    const k = keyFn(it);
    if (!k) return;
    const v = valueFn(it);
    map.set(k, (map.get(k) || 0) + (Number.isFinite(v) ? v : 0));
  });
  return map;
}

function groupCountBy(items, keyFn) {
  const map = new Map();
  items.forEach((it) => {
    const k = keyFn(it);
    if (!k) return;
    map.set(k, (map.get(k) || 0) + 1);
  });
  return map;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function money(n) {
  return formatPriceVND(Number.isFinite(n) ? n : 0);
}

function buildTopCourses(invoices, limit = 5) {
  const byCourse = groupSumBy(
    invoices,
    (inv) => inv?.courseId || inv?.courseTitle || "unknown",
    (inv) => Number(inv?.amount ?? 0)
  );
  const rows = Array.from(byCourse.entries())
    .map(([k, revenue]) => {
      const title =
        invoices.find((i) => (i?.courseId || i?.courseTitle) === k)?.courseTitle || k;
      return { key: k, title, revenue };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
  return rows;
}

function viDayLabel(dayKey) {
  const [y, m, d] = String(dayKey).split("-").map((x) => Number(x));
  const dt = new Date(y, (m || 1) - 1, d || 1);
  return dt.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
}

function ensureChartAvailable() {
  return typeof window !== "undefined" && typeof window.Chart !== "undefined";
}

function destroyChartIfAny(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const existing = window.Chart?.getChart?.(canvas);
  if (existing) existing.destroy();
}

function renderCharts({ days, revenueByDay, regsByDay, paymentSplit, chatsByDay }) {
  if (!ensureChartAvailable()) {
    setText("mkd-admin-chart-error", "Không tải được thư viện biểu đồ (Chart.js).");
    return;
  }
  setText("mkd-admin-chart-error", "");

  const labels = days.map(viDayLabel);

  destroyChartIfAny("mkd-chart-revenue");
  destroyChartIfAny("mkd-chart-registrations");
  destroyChartIfAny("mkd-chart-payments");
  destroyChartIfAny("mkd-chart-chats");

  const revenueCtx = document.getElementById("mkd-chart-revenue");
  const regsCtx = document.getElementById("mkd-chart-registrations");
  const payCtx = document.getElementById("mkd-chart-payments");
  const chatsCtx = document.getElementById("mkd-chart-chats");

  if (revenueCtx) {
    // eslint-disable-next-line no-new
    new window.Chart(revenueCtx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Doanh thu",
            data: days.map((d) => revenueByDay.get(d) || 0),
            borderColor: "#2563eb",
            backgroundColor: "rgba(37, 99, 235, 0.12)",
            fill: true,
            tension: 0.35,
            pointRadius: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${money(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (v) => new Intl.NumberFormat("vi-VN").format(v) + " ₫"
            }
          }
        }
      }
    });
  }

  if (regsCtx) {
    // eslint-disable-next-line no-new
    new window.Chart(regsCtx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Đăng ký",
            data: days.map((d) => regsByDay.get(d) || 0),
            backgroundColor: "rgba(16, 185, 129, 0.75)",
            borderColor: "rgba(16, 185, 129, 1)",
            borderWidth: 1,
            borderRadius: 8,
            maxBarThickness: 32
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        }
      }
    });
  }

  if (payCtx) {
    const bank = paymentSplit.get("bank") || 0;
    const cash = paymentSplit.get("cash") || 0;
    const other = (paymentSplit.get("other") || 0) + (paymentSplit.get("") || 0);

    // eslint-disable-next-line no-new
    new window.Chart(payCtx, {
      type: "doughnut",
      data: {
        labels: ["Chuyển khoản", "Tiền mặt", "Khác"],
        datasets: [
          {
            data: [bank, cash, other],
            backgroundColor: ["#2563eb", "#f59e0b", "#94a3b8"],
            borderColor: "#ffffff",
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" }
        },
        cutout: "65%"
      }
    });
  }

  if (chatsCtx) {
    // eslint-disable-next-line no-new
    new window.Chart(chatsCtx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Tin nhắn",
            data: days.map((d) => chatsByDay.get(d) || 0),
            borderColor: "#7c3aed",
            backgroundColor: "rgba(124, 58, 237, 0.12)",
            fill: true,
            tension: 0.35,
            pointRadius: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } }
        }
      }
    });
  }
}

export function initAdminDashboard({ days = 7 } = {}) {
  const invoices = loadList("mkd-invoices").filter((x) => x && x.status === "paid");
  const regs = loadList("mkd-registered-courses");
  const chats = loadList("mkd-mentor-chats");

  const daysKeys = lastNDaysKeys(days);

  const revenueByDay = groupSumBy(invoices, (inv) => toDayKey(inv?.createdAt), (inv) =>
    Number(inv?.amount ?? 0)
  );
  const regsByDay = groupCountBy(regs, (r) => toDayKey(r?.createdAt));
  const chatsByDay = groupCountBy(chats, (c) => toDayKey(c?.timestamp));

  const revenueTotal = sum(invoices.map((i) => Number(i?.amount ?? 0)));
  const revenueNDays = sum(daysKeys.map((k) => revenueByDay.get(k) || 0));

  const regsTotal = regs.length;
  const learningCount = regs.filter((r) => (r?.status || "") === "learning").length;
  const invoicesCount = invoices.length;

  const paymentSplit = groupCountBy(invoices, (inv) => {
    const m = String(inv?.method || "").trim();
    if (m === "bank" || m === "cash") return m;
    return "other";
  });

  setText("mkd-kpi-revenue-total", money(revenueTotal));
  setText("mkd-kpi-revenue-7d", money(revenueNDays));
  setText("mkd-kpi-invoices", String(invoicesCount));
  setText("mkd-kpi-registrations", String(regsTotal));
  setText("mkd-kpi-learning", String(learningCount));
  setText(
    "mkd-kpi-chat-7d",
    String(sum(daysKeys.map((k) => chatsByDay.get(k) || 0)))
  );

  const topCourses = buildTopCourses(invoices, 5);
  if (!topCourses.length) {
    setHtml(
      "mkd-top-courses",
      '<p class="text-sm text-slate-500">Chưa có hóa đơn nào để thống kê.</p>'
    );
  } else {
    setHtml(
      "mkd-top-courses",
      `<div class="space-y-2">
        ${topCourses
          .map((c) => {
            return `
              <div class="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3">
                <div class="min-w-0">
                  <p class="text-sm font-medium text-slate-900 truncate">${c.title}</p>
                  <p class="text-xs text-slate-500">Doanh thu: <span class="font-medium text-slate-700">${money(
                    c.revenue
                  )}</span></p>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>`
    );
  }

  renderCharts({ days: daysKeys, revenueByDay, regsByDay, paymentSplit, chatsByDay });
}

