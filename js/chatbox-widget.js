/**
 * Chatbox AI trợ lý – popup góc phải.
 * Ưu tiên gọi API AI thật (backend /api/chat với Groq). Không có API hoặc lỗi thì dùng bot nội bộ (rule-based).
 */

import { courses } from "./courses-data.js";
import {
  FIRST_COURSE_DISCOUNT_PERCENT,
  FULL_STACK_DISCOUNT_PERCENT,
  FULL_STACK_COURSE_IDS,
} from "./promotions.js";

const WIDGET_ID = "mkd-chatbox-widget";
const PANEL_ID = "mkd-chatbox-panel";
const BTN_ID = "mkd-chatbox-toggle";

/** URL API chat. Dùng window.MKD_getApiUrl nếu có (env-config.js), không thì cùng origin /api/chat hoặc MKD_CHAT_API_BASE_URL. */
function getChatApiUrl() {
  if (typeof window !== "undefined" && window.MKD_getApiUrl) return window.MKD_getApiUrl("/api/chat");
  const base = window.MKD_CHAT_API_BASE_URL ?? "";
  return base ? `${base.replace(/\/$/, "")}/api/chat` : "/api/chat";
}
const CHAT_API_URL = getChatApiUrl();

function normalizeText(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getBotResponse(userText) {
  const t = normalizeText(userText);
  if (!t) return "Bạn muốn hỏi gì? Thử: khóa học, lộ trình, ưu đãi, hoặc liên hệ.";

  // Chào hỏi / trợ giúp
  if (
    /^(xin chao|hello|hi|chao|help|tro giup|giup toi|huong dan)$/.test(t) ||
    t.length < 4
  ) {
    return `Xin chào! Tôi là trợ lý ảo của BCN Coach. Bạn có thể hỏi tôi về:\n• **Các khóa học** hiện có\n• **Lộ trình học** (ví dụ Full Stack)\n• **Ưu đãi** (khóa đầu, combo)\n• **Liên hệ** / tư vấn\n\nHãy gõ câu hỏi của bạn.`;
  }

  // Khóa học / danh sách khóa
  if (
    /khoa hoc|cac khoa|danh sach|course|khoa nao|hoc gi|hoc nhung gi/.test(t)
  ) {
    const list = courses
      .slice(0, 10)
      .map((c) => `• ${c.title} (${c.sessions} buổi)`)
      .join("\n");
    const more = courses.length > 10 ? `\n... và ${courses.length - 10} khóa khác.` : "";
    return `Hiện BCN Coach có các khóa học sau:\n\n${list}${more}\n\nXem chi tiết và đăng ký tại trang **Khóa học** (menu trên).`;
  }

  // Lộ trình / full stack / học gì trước
  if (
    /lo trinh|full stack|fullstack|hoc gi truoc|huong di|frontend|backend|lap trinh web/.test(t)
  ) {
    const fullStackNames = courses
      .filter((c) => FULL_STACK_COURSE_IDS.includes(c.id))
      .map((c) => c.title);
    return `**Lộ trình gợi ý (Full Stack):**\n\n1. Nền tảng: Git Foundation\n2. Frontend: Next.js 15 cho Người mới bắt đầu\n3. Backend: Backend với NestJS (Cơ bản)\n4. Dữ liệu: Cơ sở dữ liệu & Data Engineering\n\nCác khóa này đều được áp dụng **ưu đãi combo Full Stack** khi bạn đăng ký từ 2 khóa trở lên. Bạn có thể xem chi tiết tại trang Khóa học.`;
  }

  // Ưu đãi / giảm giá
  if (
    /uu dai|giam gia|khuyen mai|discount|gia re|tiet kiem|combo/.test(t)
  ) {
    return `**Chương trình ưu đãi BCN Coach:**\n\n• **Khóa học đầu tiên:** Giảm ${FIRST_COURSE_DISCOUNT_PERCENT}% khi bạn chưa đăng ký khóa nào.\n• **Combo Full Stack:** Giảm ${FULL_STACK_DISCOUNT_PERCENT}% cho mỗi khóa thuộc lộ trình Full Stack (Git, Next.js, NestJS, Cơ sở dữ liệu) khi bạn đã có ít nhất 1 khóa Full Stack.\n\nChi tiết giá và đăng ký tại trang Khóa học.`;
  }

  // Giá / học phí
  if (/gia|hoc phi|price|bao nhieu tien|chi phi/.test(t)) {
    return `Học phí từng khóa khác nhau, ví dụ: Git Foundation (vài trăm nghìn), các khóa 10–15 buổi (vài triệu đến khoảng 10 triệu). Bạn được **ưu đãi khóa đầu 10%** và **combo Full Stack 15%**. Xem giá cụ thể tại trang **Khóa học** hoặc từng khóa chi tiết.`;
  }

  // Liên hệ / mentor / tư vấn
  if (
    /lien he|contact|mentor|tu van|hotline|email|support|ho tro/.test(t)
  ) {
    return `Bạn có thể:\n• **Hotline:** 123 456 789\n• **Email mentor:** mentor@example.com\n• Trang **Liên hệ** (menu) để gửi form tư vấn.\n\nNếu đã đăng ký khóa, bạn có thể gửi email trực tiếp cho mentor phụ trách khóa trong trang Tiến độ học tập.`;
  }

  // Mặc định
  return `Tôi chưa hiểu rõ câu hỏi. Bạn có thể thử:\n• "Các khóa học có những gì?"\n• "Lộ trình Full Stack?"\n• "Ưu đãi giảm giá?"\n• "Liên hệ / tư vấn?"\n\nHoặc gửi email **mentor@example.com** để được tư vấn trực tiếp.`;
}

function escapeHtml(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

function formatMessage(text) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
}

/**
 * Render chatbox widget (nút float + panel) và gắn vào body.
 * Gọi sau khi DOM đã có (ví dụ DOMContentLoaded hoặc sau render navbar).
 */
export function renderChatboxWidget() {
  if (document.getElementById(WIDGET_ID)) return;

  const root = document.createElement("div");
  root.id = WIDGET_ID;
  root.innerHTML = `
    <div id="${PANEL_ID}" class="fixed bottom-20 right-6 z-[90] w-[360px] max-w-[calc(100vw-3rem)] flex flex-col rounded-2xl border border-slate-200 bg-white shadow-xl hidden">
      <div class="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50 rounded-t-2xl">
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">AI</div>
          <div>
            <p class="text-sm font-semibold text-slate-900">Trợ lý BCN Coach</p>
            <p class="text-[11px] text-slate-500">Tư vấn khóa học · Lộ trình · Ưu đãi</p>
          </div>
        </div>
        <button type="button" id="mkd-chatbox-close" class="h-8 w-8 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center" aria-label="Đóng">×</button>
      </div>
      <div id="mkd-chatbox-messages" class="flex-1 overflow-y-auto p-4 space-y-3 min-h-[240px] max-h-[320px] text-sm">
        <div class="flex justify-start">
          <div class="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2 text-slate-700">
            Xin chào! Tôi là trợ lý ảo. Bạn có thể hỏi về <strong>khóa học</strong>, <strong>lộ trình</strong>, <strong>ưu đãi</strong> hoặc <strong>liên hệ</strong>. Hãy gõ câu hỏi bên dưới.
          </div>
        </div>
      </div>
      <div class="p-3 border-t border-slate-100">
        <div class="flex gap-2">
          <input
            type="text"
            id="mkd-chatbox-input"
            placeholder="Nhập câu hỏi..."
            class="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            autocomplete="off"
          />
          <button type="button" id="mkd-chatbox-send" class="shrink-0 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-soft transition-colors" aria-label="Gửi">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </div>
        <p class="text-[10px] text-slate-400 mt-2" id="mkd-chatbox-footer-label">Trợ lý · Khóa học & ưu đãi</p>
      </div>
    </div>
    <button
      type="button"
      id="${BTN_ID}"
      class="fixed bottom-6 right-6 z-[89] h-14 w-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary-soft hover:scale-105 transition-all flex items-center justify-center"
      aria-label="Mở trợ lý chat"
    >
      <svg id="mkd-chatbox-btn-icon-chat" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
      <svg id="mkd-chatbox-btn-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;

  document.body.appendChild(root);

  const panel = document.getElementById(PANEL_ID);
  const toggleBtn = document.getElementById(BTN_ID);
  const closeBtn = document.getElementById("mkd-chatbox-close");
  const messagesEl = document.getElementById("mkd-chatbox-messages");
  const inputEl = document.getElementById("mkd-chatbox-input");
  const sendBtn = document.getElementById("mkd-chatbox-send");
  const iconChat = document.getElementById("mkd-chatbox-btn-icon-chat");
  const iconClose = document.getElementById("mkd-chatbox-btn-icon-close");

  function openPanel() {
    panel.classList.remove("hidden");
    panel.classList.add("flex");
    toggleBtn.setAttribute("aria-label", "Đóng trợ lý chat");
    if (iconChat) iconChat.classList.add("hidden");
    if (iconClose) iconClose.classList.remove("hidden");
    inputEl.focus();
  }

  function closePanel() {
    panel.classList.add("hidden");
    panel.classList.remove("flex");
    toggleBtn.setAttribute("aria-label", "Mở trợ lý chat");
    if (iconChat) iconChat.classList.remove("hidden");
    if (iconClose) iconClose.classList.add("hidden");
  }

  const chatHistory = [];

  function appendMessage(text, isUser, isPlaceholder = false) {
    const wrap = document.createElement("div");
    wrap.className = isUser ? "flex justify-end" : "flex justify-start";
    if (isPlaceholder) wrap.setAttribute("data-mkd-typing", "1");
    const bubble = document.createElement("div");
    bubble.className = isUser
      ? "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-white px-3 py-2"
      : "max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2 text-slate-700";
    bubble.innerHTML = isUser ? escapeHtml(text).replace(/\n/g, "<br>") : formatMessage(text);
    wrap.appendChild(bubble);
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return wrap;
  }

  function removeTypingPlaceholder() {
    const el = messagesEl.querySelector("[data-mkd-typing]");
    if (el) el.remove();
  }

  async function sendUserMessage() {
    const text = (inputEl.value || "").trim();
    if (!text) return;
    inputEl.value = "";
    appendMessage(text, true);

    const typingWrap = appendMessage("Đang suy nghĩ...", false, true);

    let reply = null;
    let usedApi = false;

    try {
      const history = chatHistory.slice(-10).map((h) => ({ role: h.role, content: h.content }));
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();

      if (res.ok && data.reply) {
        reply = data.reply;
        usedApi = true;
      }
      if (res.status === 503 && data.error === "AI_CHAT_UNAVAILABLE") {
        reply = getBotResponse(text);
      }
    } catch (e) {
      reply = getBotResponse(text);
    }

    removeTypingPlaceholder();
    if (reply == null) reply = getBotResponse(text);

    chatHistory.push({ role: "user", content: text });
    chatHistory.push({ role: "assistant", content: reply });
    appendMessage(reply, false);
  }

  toggleBtn.addEventListener("click", () => {
    if (panel.classList.contains("hidden")) openPanel();
    else closePanel();
  });
  closeBtn.addEventListener("click", closePanel);
  sendBtn.addEventListener("click", sendUserMessage);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendUserMessage();
    }
  });
}
