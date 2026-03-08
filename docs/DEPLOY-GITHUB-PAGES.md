# Deploy lên GitHub Pages

## Cấu trúc đã chuẩn bị

- **`index.html`** (root): Tự động chuyển sang `landing.html` khi mở URL gốc (vd. `https://username.github.io/ten-repo/`).
- **`.nojekyll`** (root): Báo GitHub Pages không dùng Jekyll, tránh bỏ qua file/thư mục không chuẩn.
- Toàn bộ link trong site dùng **đường dẫn tương đối** (vd. `landing.html`, `asset/logo.png`) nên chạy đúng khi deploy ở subpath.

## Cách deploy

### 1. Đẩy repo lên GitHub

- Tạo repo mới trên GitHub (vd. tên: `bcn-coach` hoặc giữ `baitapnhomlythuyet`).
- Nếu muốn đổi tên repo cho gọn URL:
  - GitHub → repo → **Settings** → **General** → **Repository name** → đổi rồi **Rename**.
- Push code (branch `master` hoặc `main`):

```bash
git remote add origin https://github.com/USERNAME/TEN-REPO.git
git push -u origin master
```

(Nếu dùng branch `main`: `git push -u origin main`.)

### 2. Bật GitHub Pages

- Vào repo → **Settings** → **Pages**.
- **Source**: chọn **Deploy from a branch**.
- **Branch**: chọn `master` (hoặc `main`), folder **/ (root)**.
- **Save**. Vài phút sau site sẽ có tại:

  - **Project site:** `https://USERNAME.github.io/TEN-REPO/`
  - **User/Org site** (nếu repo tên `USERNAME.github.io`): `https://USERNAME.github.io/`

### 3. (Tuỳ chọn) Custom domain

Trong **Settings** → **Pages** → **Custom domain** nhập tên miền của bạn và cấu hình DNS theo hướng dẫn của GitHub.

## Lưu ý

- **Firebase Auth** vẫn chạy bình thường trên GitHub Pages (HTTPS).
- Trong **Firebase Console** → **Authentication** → **Settings** → **Authorized domains**, thêm:
  - `USERNAME.github.io`
  - Nếu dùng custom domain thì thêm domain đó.
- Mở site bằng đúng URL có dấu `/` cuối khi cần (vd. `https://username.github.io/baitapnhomlythuyet/`) để link tương đối resolve đúng.
