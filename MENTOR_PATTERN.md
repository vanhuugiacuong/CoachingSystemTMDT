# Mentor pattern (BCN Coach)

Tài liệu này mô tả **flow Mentor** đã được đồng bộ trong project, bao gồm: navbar theo role, lịch dạy, phòng coaching, đánh dấu hoàn thành buổi học, tài liệu khóa học, và inbox tin nhắn học viên.

## 1) Role & routing

- **Role mapping**: xác định qua email whitelist trong `js/session.js`
  - `ADMIN_EMAILS` → role `admin`
  - `MENTOR_EMAILS` → role `mentor`
  - còn lại → role `student`
- **Guard cho mentor**: `requireMentor()` (mentor + admin được phép vào mentor pages).
- **Chống “rớt role” khi điều hướng**:
  - `landing.html` nút Dashboard tự route theo role:
    - admin → `admin-dashboard.html`
    - mentor → `mentor-dashboard.html`
    - student → `dashboard.html`
  - `dashboard.html` auto redirect nếu user thực tế là mentor/admin.

## 2) Navbar mentor (sync theo role)

Navbar dùng chung function `renderStudentNavbar(active, options)` trong `js/layout.js` nhưng **tabs đổi theo role**.

- **Mentor tabs** (được bật qua `{ forceMentor: true }`):
  - `mentor-dashboard.html` (Dashboard)
  - `mentor-timetable.html` (Lịch dạy)
  - `mentor-inbox.html` (Tin nhắn)
  - `mentor-courses.html` (Tài liệu – danh sách khóa)
  - `mentor-call.html` (Coaching)

## 3) Lịch dạy (Mentor timetable)

### Trang

- `mentor-timetable.html`
- Guard: `requireMentor()`
- Nguồn dữ liệu: đọc từ `localStorage["mkd-registered-courses"]`

### Hiển thị

- Grid theo tuần + time slots (tương tự `timetable.html` của student nhưng **read-only** và hiển thị theo góc nhìn mentor).
- Mỗi ô lịch có thể có nhiều lịch (nhiều học viên) → hiển thị 1 item + `+n lịch khác`.
- CTA trong mỗi ô:
  - **Tài liệu** → `mentor-course.html?courseId=...&session=...`
  - **Vào phòng** → `mentor-call.html?courseId=...&session=...&userEmail=...&userUid=...`

### “Hoàn thành buổi”

Trong ô lịch sẽ hiện badge **Hoàn thành** nếu buổi đó đã được mark (xem mục 5).

## 4) Mentor Dashboard (schedule-centric)

### Trang

- `mentor-dashboard.html`
- Guard: `requireMentor()`

### KPI + list

- KPI:
  - Buổi coaching hôm nay
  - Tổng buổi trong 7 ngày tới
  - Số học viên có lịch
- List “Lịch coaching” hiện cả **7 ngày trước → 7 ngày tới** (để thấy buổi đã dạy gần đây).
- Mỗi item có:
  - Badge trạng thái (Đã đăng ký/Đang học/Hoàn thành)
  - Nút **Tài liệu** và **Vào phòng**

## 5) Mentor Call (phòng coaching) + rule hoàn thành

### Trang

- `mentor-call.html`
- Guard: `requireMentor()`
- Nhận params:
  - `courseId`
  - `session` (buổi số mấy)
  - `userEmail` và `userUid` (để match đúng học viên trong data)

### Rule mark hoàn thành

Một buổi học được xem là **hoàn thành** khi mentor bấm nút **Kết thúc call**.

Khi kết thúc:
- Ghi vào `localStorage["mkd-registered-courses"]` đúng record của học viên + course:
  - `completedSessions = max(completedSessions, sessionNumber)`
  - `completedSessionsMeta[sessionNumber] = <ISO timestamp>`
- UI cập nhật status “Buổi X đã hoàn thành …”.

> Lưu ý: match record theo thứ tự ưu tiên:
> 1) `userUid` (nếu có)
> 2) `userEmail`
> 3) fallback nếu courseId chỉ có đúng 1 registration.

## 6) Tài liệu khóa học (hub + inline)

### Pages

- `mentor-courses.html`: list toàn bộ khóa → bấm vào hub.
- `mentor-course.html`: hub theo `courseId` + chọn `session`.
- `mentor-call.html`: có nút “Tài liệu khóa học” dẫn đến hub.
- `mentor-dashboard.html` / `mentor-timetable.html`: mỗi lịch có nút “Tài liệu”.

### Data model (courses catalog)

Trong `js/courses-data.js`, mỗi course có thể thêm:

- `detail.resources`: tài liệu chung cho toàn khóa
- `detail.sessionResources`: tài liệu theo buổi (map theo `"1"`, `"2"`, …)

Ví dụ (đã seed mẫu ở course `2k-prep`):

```js
detail: {
  resources: [{ title, type, url }, ...],
  sessionResources: {
    "1": [{ title, type, url }],
    "5": [{ title, type, url }]
  }
}
```

## 7) Inbox tin nhắn (mentor)

### Trang

- `mentor-inbox.html`
- Guard: `requireMentor()`
- Nguồn dữ liệu: `localStorage["mkd-mentor-chats"]`

### Đồng bộ với user “chat nhanh”

User “chat nhanh” nằm trong `progress.html` và sẽ push message vào `mkd-mentor-chats` với schema:

```js
{
  from: "student" | "mentor",
  userEmail: "<email>",
  message: "<text>",
  timestamp: "<ISO>"
}
```

Mentor inbox:
- Group theo `userEmail`
- Mentor reply sẽ push vào cùng list với `from: "mentor"`
- Có auto refresh theo event `storage` (khi trang khác ghi localStorage).

## 8) LocalStorage keys (tổng hợp)

- **Đăng ký khóa học + lịch học**: `mkd-registered-courses`
  - `userEmail`, `userUid`, `courseId`, `status`, `schedule[]`, `completedSessions`, `completedSessionsMeta`
- **Chat mentor**: `mkd-mentor-chats`
- **Last signed-in email (helper)**: `mkd-last-user-email`

## 9) Gợi ý nâng cấp (khi muốn “chuẩn production”)

- **Gắn mentor thật cho từng registration**: thêm `mentorEmail/mentorUid` vào `mkd-registered-courses` để mentor chỉ thấy lịch của mình.
- **Chuẩn hóa sessionNumber**: thay vì suy ra bằng “index trong schedule đã sort”, lưu trực tiếp `sessionNumber` trong từng slot.
- **Realtime thật**: thay localStorage bằng Firestore/Realtime DB hoặc backend websocket, nhưng giữ schema message tương tự để migrate dễ.

