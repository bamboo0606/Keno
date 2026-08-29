# Keno

Website demo giao diện Keno (mobile-first). Không cần cài đặt hay build — mở trực tiếp `index.html` bằng trình duyệt.

## Cấu trúc thư mục

```
index.html          Khung trang, toàn bộ markup các view
css/
  style.css          Toàn bộ style của trang
js/
  data.js            Dữ liệu giả lập kỳ quay + hàm phân loại kết quả dùng chung
  router.js          Điều hướng giữa các view, nút quay lại, toast, CTA nổi
  result.js          Trang "Kết quả" (kỳ mới nhất, kỳ gần đây, thống kê)
  live.js            Trang "Trực tiếp" (quay số + bình luận real-time)
  chonso.js          Trang "Chọn số"
  diemban.js         Trang "Điểm bán" (tìm điểm bán gần bạn)
  voucher.js         Ưu đãi/voucher + đăng nhập & bảng điều khiển điểm bán
  congdong.js        Trang "Cộng đồng"
  main.js            Khởi động trang — luôn tải sau cùng
img/                 Logo, 7 hình hướng dẫn cách chơi, ảnh cơ cấu giải thưởng
plan.md              Yêu cầu chỉnh sửa website (trạng thái hiện tại)
```

Các file trong `js/` là script thường (không dùng ES module) để mở được trực tiếp qua `file://` mà không cần server. Thứ tự nạp trong `index.html` có ý nghĩa: `data.js` phải nạp trước tiên, `main.js` phải nạp sau cùng vì nó gọi hàm khởi tạo từ tất cả các file còn lại.

## Phụ thuộc bên ngoài

Trang tải 2 thư viện qua CDN (cần Internet ở lần mở đầu, trình duyệt sẽ cache lại):

* [`qrcode-generator`](https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js) — tạo mã QR thật cho voucher trong `js/voucher.js`.
* [`jsQR`](https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js) — giải mã QR quét được từ camera (tính năng "Quét QR" ở trang Đăng nhập điểm bán).

## Lưu ý

* Video "Hướng dẫn cách chơi" (mục Thông tin) mở bằng cách chuyển sang tab YouTube mới thay vì nhúng `<iframe>` — nhúng trực tiếp bị YouTube báo lỗi 153 khi chạy qua `file://` (không có origin/referrer hợp lệ để xác thực nhúng). Nếu sau này trang được host qua http/https, có thể đổi lại thành iframe nhúng trực tiếp.
* Ảnh `img/prize-structure.png` (Cơ cấu giải thưởng) hiện bị thiếu vài dòng ở mép trên do được chụp lại từ PDF gốc ở một bước xử lý trước; cần ảnh/PDF gốc để thay thế nếu muốn hiển thị đầy đủ 100%.
