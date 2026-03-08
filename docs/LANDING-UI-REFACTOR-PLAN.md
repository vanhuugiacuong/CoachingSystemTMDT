    # Kế hoạch refactor UI Landing Page – BCN Coach

## 1. Mục tiêu
- Nâng cấp giao diện landing hiện đại, chuyên nghiệp.
- Thêm animation khi scroll (reveal từng section).
- Thêm hiệu ứng loop vô hạn (marquee, gradient, floating).
- Tận dụng tối đa ảnh trong thư mục `asset/`.

---

## 2. Thư viện ngoài đề xuất

| Thư viện | Mục đích | Cách dùng |
|----------|----------|-----------|
| **AOS** (Animate On Scroll) | Animation khi scroll xuống (fade, slide, zoom) | CDN, data-aos attributes |
| **Simple Icons** (cdn.simpleicons.org) | Icon thương hiệu / framework (OpenAI, GitHub, Angular, Git, …) | `<img src="https://cdn.simpleicons.org/{slug}/{hex}">` |
| **Iconify + Lucide** (api.iconify.design) | Icon khái niệm (zap, target, users, database, …) cho Why Us & thẻ khóa học | `<img src="https://api.iconify.design/lucide/{icon}.svg?color=%23{hex}">` |
| **CSS keyframes** | Infinite loop (gradient chạy, float, pulse) | Không cần thư viện |
| **Optional: Swiper / Splide** | Carousel testimonial nếu cần | Chỉ thêm khi muốn slider |

**Khuyến nghị:** Dùng **AOS** (nhẹ, dễ tích hợp) + **CSS thuần** cho infinite effects để tránh phụ thuộc nhiều.

---

## 3. Scroll animations (AOS)

- **Hero:** fade-up cho text, fade-left cho dashboard card (hoặc zoom-in).
- **Why choose:** Mỗi card fade-up + stagger delay (lần lượt xuất hiện).
- **Partners:** fade-up cho tiêu đề, có thể kết hợp marquee infinite.
- **Stories:** Fade-up từng testimonial, delay khác nhau.
- **CTA cuối:** Fade-up + scale nhẹ.

Cấu hình AOS: `duration`, `offset`, `once: true` (chỉ animate 1 lần khi vào viewport).

---

## 4. Infinite loop effects

- **Gradient background:** Background hero hoặc section có gradient chạy nhẹ (animation gradient infinite).
- **Floating orbs/shapes:** Vòng tròn mờ phía sau hero float lên xuống (infinite).
- **Partners marquee:** Logo/ tên đối tác chạy ngang vô hạn (infinite scroll).
- **Pulse/glow:** Nút CTA hoặc badge “Học hiệu quả 3x” có pulse nhẹ (infinite).

Tất cả dùng `@keyframes` + `animation: ... infinite`.

---

## 5. Sử dụng asset images

| Asset | Gợi ý dùng |
|-------|------------|
| `logo.png` | Giữ nguyên navbar, footer. |
| `People_in_programming_01ung_03.jpg` | Hero: ảnh bên phải thay cho dashboard mockup, hoặc background hero (overlay tối để chữ đọc rõ). |
| `4884785.jpg` | Section “Why” hoặc “Stories” – background một block hoặc ảnh minh họa. |
| `21Z_2103.w023.n001.159B.p1.159.jpg` | Section khác (Partners/Stories) – background hoặc decorative. |

Lưu ý: Ảnh dùng làm background nên có `object-fit: cover`, overlay (gradient hoặc bg đen opacity) để text contrast tốt.

---

## 6. Cải thiện UI chung

- **Typography:** Giữ Tailwind, có thể tăng hierarchy (heading to hơn, line-height thoáng).
- **Spacing:** Tăng padding section (py-16 → py-20) cho “breathing room”.
- **Màu:** Giữ primary blue, có thể thêm gradient (primary → primary-soft) cho CTA.
- **Card:** Shadow nhẹ, hover lift (translateY + shadow) cho cards “Why” và “Stories”.
- **Navbar:** Giữ sticky, có thể thêm transition opacity/background khi scroll.

---

## 7. Thứ tự triển khai

1. Thêm AOS (CDN) + init, thêm `data-aos` cho từng section/block.
2. Thêm file CSS (hoặc `<style>`) cho infinite animations (gradient, float, marquee).
3. Thay/ thêm ảnh từ `asset/` vào Hero và tối đa 1–2 section khác.
4. Chỉnh spacing, shadow, hover cho cards và CTA.
5. Test responsive (mobile/tablet).

---

## 8. File cần sửa

- `landing.html`: cấu trúc HTML, class, data-aos, thẻ `<img>` và `<section>` background.
- (Tuỳ chọn) `css/landing.css` hoặc inline `<style>` trong `landing.html` cho keyframes.

Sau khi refactor xong, có thể cập nhật lại plan này với trạng thái “Đã áp dụng”.
