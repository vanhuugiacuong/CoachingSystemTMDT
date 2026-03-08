// layout.js
// Render shared top navbar for student area

export function renderStudentNavbar(active) {
  const container = document.getElementById("mkd-navbar");
  if (!container) return;

  const linkBase =
    "inline-flex items-center h-10 px-4 text-sm font-medium rounded-full transition-colors";
  const linkInactive =
    "text-slate-500 hover:text-slate-900 hover:bg-slate-100";
  const linkActive = "bg-slate-900 text-white";

  const tabs = [
    { id: "dashboard", label: "Dashboard", href: "dashboard.html" },
    { id: "timetable", label: "Thời khóa biểu", href: "timetable.html" },
    { id: "courses", label: "Khóa học", href: "courses.html" },
    { id: "groups", label: "Nhóm học tập", href: "groups.html" }
  ];

  container.innerHTML = `
    <header class="w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex h-16 items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
            <a href="landing.html" class="flex items-center gap-2">
              <img src="asset/logo.png" alt="BCN Coach" class="w-[200px] h-[auto] object-contain" />
            </a>
            </div>
          </div>

          <nav class="flex-1 flex justify-center">
            <div class="flex items-center gap-1 rounded-full bg-slate-100 p-1">
              ${tabs
                .map((tab) => {
                  const isActive = tab.id === active;
                  const cls = [
                    linkBase,
                    isActive ? linkActive : linkInactive
                  ].join(" ");
                  return `
                    <a href="${tab.href}" class="${cls}">
                      ${tab.label}
                    </a>
                  `;
                })
                .join("")}
            </div>
          </nav>

          <div class="flex items-center gap-3">
            <a href="profile.html" class="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div class="hidden sm:flex flex-col items-end">
                <span class="text-xs font-medium text-slate-900">Học viên</span>
                <span class="text-[11px] text-slate-500" id="mkd-user-email">Student</span>
              </div>
              <div class="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold">
                <span id="mkd-user-initial">C</span>
              </div>
            </a>
            <button
              type="button"
              id="mkd-logout-btn"
              class="hidden sm:inline-flex items-center h-9 px-4 rounded-full border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  `;
}

// Shared footer for BCN Coach pages
export function renderSiteFooter() {
  const container = document.getElementById("mkd-footer");
  if (!container) return;

  container.innerHTML = `
    <footer class="border-t border-slate-200 bg-slate-50 mt-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div class="max-w-sm">
            <div class="flex items-center gap-2">
              <img src="asset/logo.png" alt="BCN Coach" class="w-[100px] h-[auto] object-contain" />
            </div>
            <p class="text-sm text-slate-500">
              Nền tảng coaching 1-1 chuyên nghiệp hàng đầu Việt Nam. Giúp bạn học tập hiệu quả hơn với sự hướng dẫn tận tình từ các chuyên gia.
            </p>
            <div class="flex gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:border-slate-300 transition-colors" aria-label="Instagram">
                <img src="https://cdn.simpleicons.org/instagram/64748b" alt="" class="w-4 h-4 object-contain" width="16" height="16" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:border-slate-300 transition-colors" aria-label="LinkedIn">
                <img src="https://api.iconify.design/simple-icons/linkedin.svg?width=16&height=16&color=%2364748b" alt="" class="w-4 h-4 object-contain" width="16" height="16" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:border-slate-300 transition-colors" aria-label="Facebook">
                <img src="https://cdn.simpleicons.org/facebook/64748b" alt="" class="w-4 h-4 object-contain" width="16" height="16" />
              </a>
            </div>
          </div>

          <div class="flex-1 grid grid-cols-2 gap-8 max-w-md text-sm">
            <div>
              <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Sản phẩm</h3>
              <ul class="space-y-1.5 text-slate-600">
                <li><a href="courses.html" class="hover:text-slate-900">Các khóa học</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Công ty</h3>
              <ul class="space-y-1.5 text-slate-600">
                <li><a href="contact.html" class="hover:text-slate-900">Liên hệ</a></li>
                <li><span class="font-medium">Hotline: 123 456 789</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t border-slate-200 bg-slate-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 text-xs text-slate-500">
          <span>© 2025 BCN Coach. Tất cả quyền được bảo lưu.</span>
          <button class="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-slate-200 text-xs text-slate-600 hover:bg-slate-100">
            <span>Tiếng Việt</span>
          </button>
        </div>
      </div>
    </footer>
  `;
}
