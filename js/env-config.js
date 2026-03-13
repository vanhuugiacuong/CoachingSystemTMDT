/**
 * Cấu hình môi trường / API base URL.
 * - Chạy local với Node server (npm start): mở http://localhost:3000 → API cùng origin, không cần set gì.
 * - Deploy lên GitHub Pages: chỉ có static, không chạy server.js. Set MKD_API_BASE_URL trỏ tới backend deploy riêng (Render, Railway, Vercel...) hoặc để trống (chat dùng bot nội bộ, gửi email sẽ báo lỗi).
 * - Không cần chỉnh port: GitHub Pages luôn dùng HTTPS (443). Port chỉ dùng khi chạy local (mặc định 3000 trong server.js).
 */
(function () {
  const isGitHubPages =
    typeof window !== "undefined" &&
    (window.location.hostname === "github.io" || window.location.hostname.endsWith(".github.io"));

  /** Base URL của backend (Express). Để trống = cùng origin. Ví dụ: "https://your-app.onrender.com" */
  window.MKD_API_BASE_URL = window.MKD_API_BASE_URL ?? "";
  window.MKD_CHAT_API_BASE_URL = window.MKD_CHAT_API_BASE_URL ?? window.MKD_API_BASE_URL;

  /** Có đang chạy trên GitHub Pages (chỉ static, không có backend) không */
  window.MKD_IS_GITHUB_PAGES = isGitHubPages;

  /**
   * Trả về URL đầy đủ cho API path. Ví dụ: getApiUrl("/api/chat") → "https://origin/api/chat" hoặc "https://backend.com/api/chat"
   */
  window.MKD_getApiUrl = function (path) {
    const base = window.MKD_API_BASE_URL || "";
    const p = path.startsWith("/") ? path : "/" + path;
    return base ? base.replace(/\/$/, "") + p : p;
  };
})();
