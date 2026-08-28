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
img/                 Logo, hình hướng dẫn cách chơi, ảnh cơ cấu giải thưởng
plan.md              Lịch sử yêu cầu chỉnh sửa website
```

Các file trong `js/` là script thường (không dùng ES module) để mở được trực tiếp qua `file://` mà không cần server. Thứ tự nạp trong `index.html` có ý nghĩa: `data.js` phải nạp trước tiên, `main.js` phải nạp sau cùng vì nó gọi hàm khởi tạo từ tất cả các file còn lại.
