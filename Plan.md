# ✅ **Lộ Trình Dự Án Web Bán Hàng Nội Thất** (CDTN + Project cá nhân)

## 📅 **Ngày 1 - Khởi tạo dự án và cấu trúc cơ bản**

- [ ] **Tạo dự án Next.js**:
  - Cài đặt Next.js bằng lệnh `npx create-next-app@latest your-project-name`.
  - Cài đặt TypeScript: `npm install typescript @types/react @types/node`.
  - Cài đặt các package cần thiết: `npm install tailwindcss react-redux @reduxjs/toolkit`.
- [ ] **Cấu trúc thư mục cơ bản**:
  - Tạo các thư mục chính: `pages/`, `components/`, `redux/`, `styles/`.
  - Tạo các tệp cần thiết trong thư mục `components`: `Header.tsx`, `Footer.tsx`, `Layout.tsx`.
  - Cấu hình Tailwind (thêm tệp `tailwind.config.js` và cấu hình trong `globals.css`).
- [ ] **Tạo layout chung**:
  - Tạo component `Layout.tsx` chứa `Header` và `Footer`.
  - Tạo trang chủ `index.tsx` để hiển thị cấu trúc chung của trang.

---

## 📅 **Ngày 2 - Hoàn thiện Header và Footer**

- [ ] **Hoàn thiện `Header.tsx`**:
  - Thiết kế phần logo, thanh điều hướng (Navigation) với các trang: Trang chủ, Danh sách sản phẩm, Giỏ hàng.
  - Cải thiện UI với Tailwind CSS.
  - Kiểm tra hiển thị các liên kết trong header.
- [ ] **Hoàn thiện `Footer.tsx`**:
  - Chia footer thành 3 cột: Liên hệ, Chính sách, Hỗ trợ khách hàng.
  - Tạo các liên kết trong footer cho các mục liên quan đến chính sách và hỗ trợ.
- [ ] **Kiểm tra Layout**: Đảm bảo header và footer xuất hiện đúng trên tất cả các trang.

---

## 📅 **Ngày 3 - Tạo trang Danh Sách Sản Phẩm**

- [ ] **Tạo trang `products/index.tsx`**:
  - Tạo trang hiển thị danh sách sản phẩm.
  - Lấy dữ liệu sản phẩm từ API Tiki/Shopee hoặc dữ liệu giả.
  - Hiển thị sản phẩm dưới dạng card với ảnh, tên sản phẩm, giá cả.
- [ ] **Thêm liên kết đến trang chi tiết sản phẩm**: Mỗi sản phẩm trên danh sách sẽ có một liên kết tới trang chi tiết sản phẩm.
- [ ] **Kiểm tra UI**: Đảm bảo các sản phẩm hiển thị đúng, bố cục đẹp mắt.

---

## 📅 **Ngày 4 - Tạo trang Chi Tiết Sản Phẩm**

- [ ] **Tạo trang chi tiết sản phẩm**:
  - Sử dụng dynamic routing `[id].tsx` trong `pages/products/[id].tsx`.
  - Lấy dữ liệu chi tiết sản phẩm từ API (hoặc dữ liệu giả).
  - Hiển thị thông tin chi tiết: mô tả sản phẩm, giá, nút "Thêm vào giỏ hàng".
- [ ] **Kiểm tra**: Đảm bảo dữ liệu sản phẩm được hiển thị đúng và chuyển hướng hoạt động tốt.

---

## 📅 **Ngày 5 - Xây dựng Giỏ Hàng**

- [ ] **Tạo trang giỏ hàng `cart.tsx`**:
  - Tạo giao diện giỏ hàng, hiển thị sản phẩm đã thêm vào.
  - Tính tổng giá trị giỏ hàng.
  - Thêm chức năng xóa sản phẩm khỏi giỏ hàng.
- [ ] **Sử dụng Redux để quản lý giỏ hàng**:
  - Cài đặt Redux để quản lý trạng thái giỏ hàng.
  - Thêm các hành động và reducer để thêm/sửa/xóa sản phẩm.
- [ ] **Kiểm tra**: Đảm bảo các sản phẩm có thể được thêm và xóa đúng cách.

---

## 📅 **Ngày 6 - Đăng nhập và Đăng ký**

- [ ] **Tạo trang đăng nhập `auth/login.tsx`**:
  - Xây dựng form đăng nhập cơ bản (email, password).
  - Sử dụng `localStorage` để lưu trạng thái người dùng tạm thời.
- [ ] **Tạo trang đăng ký `auth/register.tsx`**:
  - Xây dựng form đăng ký (email, password, xác nhận mật khẩu).
  - Thêm kiểm tra xác nhận mật khẩu.
- [ ] **Kiểm tra**: Đảm bảo cả đăng nhập và đăng ký hoạt động đúng.

---

## 📅 **Ngày 7 - Quản lý Tài Khoản Người Dùng**

- [ ] **Tạo trang `account.tsx`**:
  - Hiển thị thông tin người dùng (email, tên, v.v.).
  - Thêm chức năng thay đổi mật khẩu và cập nhật thông tin.
- [ ] **Tạo trang `order-history.tsx`**:
  - Hiển thị lịch sử đơn hàng (nếu có).

---

## 📅 **Ngày 8 - Responsive Design**

- [ ] **Tối ưu hóa giao diện**:
  - Đảm bảo giao diện responsive (dùng Tailwind CSS để xử lý các breakpoints).
  - Kiểm tra trên các thiết bị khác nhau: mobile, tablet, desktop.
- [ ] **Chỉnh sửa bố cục**:
  - Đảm bảo header, footer, và các trang khác đều hiển thị đẹp trên mọi kích thước màn hình.

---

## 📅 **Ngày 9 - Thêm Tìm Kiếm và Bộ Lọc**

- [ ] **Tạo thanh tìm kiếm sản phẩm**:
  - Xây dựng thanh tìm kiếm cho phép tìm sản phẩm theo tên hoặc mô tả.
- [ ] **Thêm bộ lọc**:
  - Tạo các bộ lọc để người dùng có thể lọc sản phẩm theo các tiêu chí như giá, loại sản phẩm, v.v.

---

## 📅 **Ngày 10 - Kiểm Tra và Sửa Lỗi**

- [ ] **Kiểm tra toàn bộ dự án**:
  - Kiểm tra tất cả các trang và chức năng xem có hoạt động đúng không.
- [ ] **Sửa lỗi UI và logic**:
  - Sửa các lỗi nhỏ liên quan đến giao diện và logic.
  - Đảm bảo các tính năng hoạt động mượt mà.

---

## 📅 **Ngày 11 - Backend và API**

- [ ] **Tạo Backend**:
  - Cài đặt Backend với Node.js/NestJS.
  - Xây dựng API cho sản phẩm, giỏ hàng, người dùng.
  - Kết nối Backend với Frontend.
- [ ] **Kiểm tra API**:
  - Đảm bảo API trả về dữ liệu đúng và Frontend nhận được dữ liệu chính xác.

---

## 📅 **Ngày 12 - Tối Ưu Hóa và Test**

- [ ] **Tối ưu tốc độ website**:
  - Kiểm tra tốc độ tải trang và tối ưu các vấn đề về performance.
- [ ] **Viết test cho các chức năng quan trọng**:
  - Viết các unit test cho các hàm và API.
- [ ] **Kiểm tra lần cuối**:
  - Kiểm tra lại toàn bộ các chức năng từ Frontend đến Backend.

---

## 📅 **Ngày 13 - Hoàn Thiện Tài Liệu và Demo**

- [ ] **Viết tài liệu**:
  - Viết tài liệu hướng dẫn sử dụng và báo cáo kết quả dự án.
- [ ] **Chuẩn bị bài thuyết trình**:
  - Chuẩn bị bài thuyết trình cho bảo vệ CDTN.

---

## 📅 **Ngày 14 - Bảo vệ và Gửi Bài**

- [ ] **Bảo vệ dự án**:
  - Trình bày và giải thích dự án cho giảng viên.
- [ ] **Gửi dự án**:
  - Đảm bảo gửi dự án đúng hạn và hoàn chỉnh.

---

### 🌟 **Các ngày tiếp theo (Nếu còn thời gian)**

- [ ] **Dọn dẹp mã nguồn**:
  - Xóa code không dùng, tối ưu hóa mã.
- [ ] **Cải thiện UI/UX**:
  - Làm đẹp lại giao diện nếu còn thời gian.
- [ ] **Tối ưu SEO**:
  - Đảm bảo SEO cho các trang của bạn hoạt động tốt.

---
