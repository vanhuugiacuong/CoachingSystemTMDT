# Deploy lên GitHub Pages

## Không cần chỉnh port

- **GitHub Pages** chỉ host **static** (HTML, CSS, JS). Site chạy trên **HTTPS, port 443** (mặc định), bạn không cấu hình port.
- **Backend Node (server.js)** **không chạy** trên GitHub Pages. Các tính năng cần server (gửi email, chat AI thật) sẽ không có backend nếu bạn chỉ bật GitHub Pages.

## Cách deploy static (chỉ frontend)

1. Đẩy repo lên GitHub.
2. Vào **Settings → Pages** của repo.
3. Chọn **Source**: branch (vd. `main`) và thư mục **/ (root)**.
4. Save. Site sẽ có dạng: `https://<username>.github.io/<repo>/`.

**Lưu ý:** Dùng đường dẫn **tương đối** (không dẫn đầu bằng `/`) cho asset và link (vd. `asset/logo.png`, `dashboard.html`) để đúng khi site nằm dưới subpath `/<repo>/`.

## Nếu muốn dùng API (email, chat AI) khi deploy

Deploy **backend** (Express) ở một host khác, rồi trỏ frontend tới đó:

1. Deploy **server.js** lên [Render](https://render.com), [Railway](https://railway.app), [Vercel Serverless](https://vercel.com), v.v.  
   - Ví dụ Render: New → Web Service, connect repo, start command `npm start`, thêm biến môi trường (vd. `GROQ_API_KEY`, `EMAIL_*`) trong dashboard.
2. Lấy URL backend (vd. `https://your-app.onrender.com`).
3. Trước khi load app trên GitHub Pages, set base URL cho API (trong trang chính, ví dụ `index.html` hoặc `landing.html`):

```html
<script>
  window.MKD_API_BASE_URL = "https://your-app.onrender.com";
</script>
<script src="js/env-config.js"></script>
```

Sau đó load các script như bình thường. `env-config.js` sẽ dùng `MKD_API_BASE_URL` cho mọi request API (gửi email, chat).

## Chạy local (có backend)

- Chạy backend: `npm start` (mặc định port **3000**).
- Mở trình duyệt: `http://localhost:3000` (vd. `http://localhost:3000/dashboard.html`).
- Không cần set `MKD_API_BASE_URL` vì frontend và API cùng origin.

## Tóm tắt

| Môi trường      | Port | Backend        | API (email / chat AI)      |
|-----------------|------|----------------|----------------------------|
| Local (npm start) | 3000 | Có (server.js) | Cùng origin, hoạt động     |
| GitHub Pages    | 443 (HTTPS) | Không   | Cần deploy backend riêng + set `MKD_API_BASE_URL` |
