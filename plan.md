# YÊU CẦU CHỈNH SỬA WEBSITE KENO

> Tài liệu này mô tả **trạng thái yêu cầu hiện tại** của website (đã gộp toàn bộ các đợt chỉnh sửa). Khi có yêu cầu mới, cập nhật trực tiếp vào mục tương ứng thay vì chỉ nối thêm ở cuối, để tài liệu luôn phản ánh đúng website hiện có.

## 1. Nguyên tắc chỉnh sửa chung

* Chỉ thực hiện đúng các thay đổi được nêu trong yêu cầu tại thời điểm đó.
* Những nội dung, bố cục, tính năng, màu sắc hoặc thành phần **không được đề cập** thì giữ nguyên.
* Ưu tiên chỉnh sửa/tái sử dụng code, component hiện có; không redesign lại toàn bộ website.
* Không tự suy đoán, không tự bịa số liệu/luật chơi/dữ liệu mẫu khi chưa có yêu cầu hoặc nguồn chính thức xác nhận.

---

## 2. Màu sắc & nhận diện thương hiệu

* Tông màu chủ đạo: cam – vàng, lấy cảm hứng từ logo sản phẩm Keno.
* Logo đầu trang (header): dùng file `img/logo_stroke.png`, giữ nguyên viền trắng quanh chữ, không áp filter tách nền (ảnh đã có nền trong suốt thật).
* Logo chân trang (footer): dùng file `img/keno-logo.png`, hiển thị **to hơn** logo ở header.

---

## 3. Header / Menu đầu trang

* Header chỉ còn 3 mục dạng chip cuộn ngang: **Cộng đồng**, **Thông tin**, **Ưu đãi**.
  * "Ưu đãi" có badge tròn nhỏ hiển thị số voucher **chưa sử dụng** (ẩn khi = 0), badge nằm **inline ngay sau chữ** (không dùng `position:absolute` đè lên chữ — tránh lỗi mất chữ/chỉ còn số).
* Không có nút "Tham gia cộng đồng" / "Mua vé" cố định ở đầu trang (xem mục 4).
* **Nút quay lại:** thanh nhỏ ngay dưới header, nút "‹ Quay lại" — hoạt động như Back trình duyệt dựa trên lịch sử điều hướng thực tế trong phiên (không phải nút về cố định một trang); tự ẩn khi không còn trang trước để quay lại.
* **Thanh điều hướng dưới cùng (bottom nav)** — đúng 6 mục, theo thứ tự:
  1. Thông tin
  2. Chọn số
  3. Trực tiếp
  4. Kết quả
  5. Điểm bán
  6. Cộng đồng
* Tên gọi "Kết quả & Thống kê" đã đổi thành **"Kết quả"** ở mọi nơi hiển thị (bottom nav, tiêu đề trang, breadcrumb, link chân trang).

### 3.1. Vị trí mặc định khi mở website

* Khi mở website, tự động vào thẳng mục **"Thông tin"** (không phải "Kết quả").
* Trong mục "Thông tin", trang cuộn về đầu nên hiển thị đúng "Hình 1" của thư viện ảnh (xem mục 6).

### 3.2. Nút "Tham gia cộng đồng" & "Mua vé"

* Không cố định ở đầu trang.
* Hiển thị dạng thanh nổi (floating) ngay phía trên bottom nav, kích thước **nhỏ gọn** (đã giảm padding/font-size so với bản đầu).
* Hiệu ứng cuộn: cuộn lên → hiện; cuộn xuống → ẩn tạm thời, mượt, không giật.

---

## 4. Chân trang (Footer)

* Sau logo Keno (to), hiển thị danh sách 7 link tính năng dạng **chữ nhỏ, hàng ngang** (tự xuống dòng khi cần) — không phải card/tiêu đề "Tính năng chính" riêng biệt, để tránh cảm giác lặp lại ở mọi trang.
* Thứ tự 7 link: Kết quả · Trực tiếp · Chọn số · Điểm bán · Cộng đồng · Thông tin · Đăng nhập điểm bán.
  * "Đăng nhập điểm bán" giữ trong danh sách vì đây là đường dẫn duy nhất vào trang đó (trang này đã tách khỏi nội dung tính năng "Điểm bán" — xem mục 10).
* Bên dưới danh sách link: giữ dòng tagline "Tra cứu kết quả · Cộng đồng · Điểm bán gần bạn" và "Chơi có trách nhiệm.".
* **Đã xóa hẳn** dòng "18+ · Bản demo giao diện — không phải kênh phát hành/bán vé chính thức." — không hiển thị lại ở bất kỳ vị trí nào khác.

---

## 5. Trang "Thông tin"

* Không hiển thị tiêu đề in đậm "Thông tin" (chỉ còn breadcrumb "Trang chủ / Thông tin").
* Ngay dưới breadcrumb: hiển thị **7 hình** liên tiếp theo chiều dọc, đánh số chú thích "Hình 1" → "Hình 7" (file `img/guide-1.jpg` … `img/guide-7.jpg`).
* Sau 7 hình là danh sách 3 mục điều hướng, mỗi mục dẫn tới một trang con riêng:

### 5.1. "Hướng dẫn cách chơi"

Nội dung theo đúng thứ tự:

1. Text giới thiệu (giữ nguyên văn, không diễn giải lại):
   > KENO là một hình thức xổ số tự chọn số quay số nhanh do Vietlott phát hành, chính thức ra mắt vào thứ 6 ngày 23/08/2019.
   >
   > KENO được phát hành từ 06:00 và kết thúc chậm nhất 21:55 từ thứ Hai đến Chủ Nhật hàng tuần. Tần suất quay số mở thưởng là 10 phút/kỳ, bán vé liên tục trong thời gian của mỗi kỳ.
   >
   > Trường hợp Vietlott Online thay đổi thời gian phát hành/lịch quay số, Vietlott sẽ thông báo chậm nhất 05 ngày trước ngày thay đổi.
2. Video "Hướng dẫn cách chơi" (YouTube `jfDh0y1qIN4`) ngay bên dưới text.
   * **Lưu ý kỹ thuật:** nhúng trực tiếp bằng `<iframe>` bị YouTube báo **lỗi 153** khi mở qua `file://` (không có origin/referrer hợp lệ để YouTube xác thực nhúng — giới hạn của giao thức `file://`, không phải lỗi cấu hình). Giải pháp đang dùng: hiển thị ảnh thumbnail thật của video kèm nút play, bấm vào mở đúng video trên YouTube ở tab mới (`https://www.youtube.com/watch?v=jfDh0y1qIN4`) — video phát bình thường vì lúc đó không còn nằm trong ngữ cảnh `file://`.

### 5.2. "Cơ cấu giải thưởng"

* Giữ nguyên ảnh hiện tại (`img/prize-structure.png`), hiển thị full-width, không có CSS nào crop ảnh (đã kiểm tra `object-fit`/`overflow`).
* **Ghi chú tồn đọng:** bản thân file ảnh này bị thiếu vài dòng ở mép trên cùng (do được chụp lại từ PDF gốc ở một bước xử lý trước, crop hơi hụt) và nguồn PDF gốc không còn để tái tạo. Nếu cần hiển thị đầy đủ 100%, cần người dùng cung cấp lại ảnh/PDF gốc để thay thế đúng file này (không đổi nội dung).

### 5.3. "Chương trình tại điểm bán hàng"

* Chỉ hiển thị nội dung liên quan đến Keno (không nhắc sản phẩm xổ số khác).
* Nội dung: "8 phút xổ 1 lần" (6h00–22h00 mỗi ngày) và "Nhận mã trải nghiệm tại điểm bán" — giá trị ưu đãi hiển thị **100.000₫** (đã cập nhật từ 30.000₫).
* Ngoài giá trị ưu đãi, không chỉnh sửa nội dung nào khác của mục này.

---

## 6. Trang "Chọn số"

* Không có dòng mô tả dưới tiêu đề.
* 2 tab: "Kỳ quay lịch sử" và "Kỳ quay hiện tại" — giữ nguyên cách hoạt động.

### 6.1. "Kỳ quay lịch sử"

* Giữ nguyên card "Phạm vi kỳ quay" (pill chọn 10/20/30/50/100 kỳ — điều khiển bảng nhiệt tần suất 1–80 và tỷ lệ % theo cách chơi).
* Bổ sung ngay bên dưới, trong cùng card: **"Tra cứu số kỳ quay"**.
  * Là ô nhập số (không phải dropdown/bộ lọc cố định) + nút "Tra cứu".
  * Người dùng nhập **bất kỳ số lượng kỳ** muốn xem (ví dụ nhập `20` → hiển thị 20 kỳ gần nhất; nhập `100` → hiển thị 100 kỳ gần nhất), không giới hạn trong các mốc dựng sẵn.
  * Kết quả hiển thị tái dùng đúng kiểu danh sách "Kỳ gần đây" đã có (mã kỳ, giờ quay, tag Lớn/Nhỏ, tag Chẵn/Lẻ/Hòa).
  * Bỏ trống ô nhập rồi bấm "Tra cứu" → hiện gợi ý nhập số kỳ, không báo lỗi.

### 6.2. Bộ số bạn đã chọn (áp dụng cho cả 2 tab)

* Nút "Mua bộ số này" hiển thị/kích hoạt ngay khi chọn **từ 1 số trở lên** (không bắt buộc đủ 10 số như trước).
* Ngay dưới bộ số đã chọn, hiển thị dòng mức thưởng tương ứng đúng số lượng đang chọn, theo đúng cơ cấu giải thưởng chính thức (Chọn 1 số → trúng 20.000; 2 số → 90.000; 3 số → 200.000; 4 số → 400.000; 5 số → 4.400.000; 6 số → 12.500.000; 7 số → 40.000.000; 8 số → 200.000.000; 9 số → 800.000.000; 10 số → 2.000.000.000).
* Khi chưa chọn đủ 10 số: hiển thị gợi ý số còn thiếu, có mức độ ưu tiên theo màu (dựa trên tần suất xuất hiện).
* Khi đã chọn đủ 10 số: hiển thị nhận xét tần suất cao/trung bình/thấp của bộ số (giữ nguyên, không phải dự đoán kết quả).
* "Tỷ lệ % theo cách chơi": gắn nhãn đầy đủ **Bậc 1 → Bậc 10** tương ứng "Chọn 1 số" → "Chọn 10 số".

---

## 7. Trang "Trực tiếp"

* Không có dòng ghi chú kiểu "nội dung giữ nguyên như bản demo".
* **Đồng bộ kỳ quay:** mã kỳ hiển thị ở đây luôn khớp với "Chọn số → Kỳ quay hiện tại" (cùng lấy từ kỳ đang mở, không phải kỳ vừa quay xong).
* Màn hình quay hiển thị placeholder (20 ô "?") ngay khi tải, không để trống.
* Không có 2 ô thống kê Lớn/Nhỏ và Chẵn/Lẻ dưới bảng quay (đã bỏ vì kỳ đang chờ quay chưa có kết quả đầy đủ để thống kê).
* Ngay dưới bảng quay:
  * Dòng "X người đang truy cập" (cùng cơ chế đếm mô phỏng như trang "Chọn số").
  * Khung "💬 Bình luận trực tiếp": danh sách bình luận tự động cập nhật (tên/ nội dung giả lập, thêm mới sau mỗi ~2–5 giây, tối đa 30 bình luận gần nhất) **và** ô nhập + nút gửi để người dùng tự viết bình luận thật.

---

## 8. Trang "Kết quả"

* Không có dòng mô tả kiểu "Gộp kết quả kỳ mới nhất và thống kê tần suất vào một màn hình".
* **Bảng kết quả kỳ mới nhất:**
  * Không hiển thị "Tổng".
  * Bi kết quả phân màu theo chẵn/lẻ: **cam nhạt = số lẻ**, **cam đậm = số chẵn**.
  * 2 ô thống kê dưới bảng dùng đúng **luật chính thức Vietlott** (không phải công thức tự suy đoán):
    * Lớn/Nhỏ: dựa trên số lượng số quay ra ở mỗi nửa dải 01–80 — ≥11 số ở nửa nào thì thắng nửa đó (Lớn = ≥11 số thuộc 41–80, Nhỏ = ≥11 số thuộc 01–40), đúng 10-10 là **Hòa Lớn-Nhỏ**.
    * Chẵn/Lẻ: theo số lượng số chẵn/lẻ quay ra, phân theo 5 mức chính thức — Chẵn (≥13 chẵn), Chẵn 11-12, Hòa Chẵn-Lẻ (đúng 10-10), Lẻ 11-12, Lẻ (≥13 lẻ).
  * Caption phụ hiển thị dạng "X Lẻ · Y Chẵn" (số đứng trước chữ).
* **"Kỳ gần đây":**
  * Bộ lọc chọn số kỳ gần nhất muốn xem (8/20/50/120) + ô tra cứu theo mã kỳ.
  * Tag "Chẵn/Lẻ/Hòa" dùng tông màu cam nhạt/cam đậm **đồng bộ** với màu bi lẻ/chẵn ở bảng kỳ mới nhất (không dùng chung màu với tag Lớn/Nhỏ/Hòa).
* **"Thống kê Keno":**
  * Bộ lọc chọn số kỳ muốn xem thống kê (10/20/30/50/80/120), thay cho 3 nút cố định "30-50-100 kỳ" trước đây.
  * Có đủ 3 ô Lớn/Nhỏ/**Hòa** (bổ sung ô Hòa để khớp đúng luật — trước đây chỉ có 2 ô nên bị gộp sai lệch phần hòa vào "Lớn") và 3 ô Chẵn/Lẻ/Hòa.
  * Mỗi số liệu có thêm chữ "kỳ" phía sau (ví dụ "24 kỳ").
  * Toàn bộ số liệu thống kê được tính trực tiếp từ dữ liệu các kỳ quay hiện có trong hệ thống (không phải số cố định), dùng cùng luật phân loại chính thức nói trên.

---

## 9. Trang "Điểm bán"

* Không có nội dung "Luồng xử lý mã trải nghiệm".
* Không có nội dung/tính năng "Đăng nhập điểm bán" trong trang này (đã tách thành trang riêng — xem mục 11).
* Nút "🎫 Nhận mã trải nghiệm" mở popup ưu đãi:
  * Giá trị ưu đãi: **100.000₫** (đã cập nhật từ 30.000₫).
  * Đếm ngược 10 giây, trong thời gian đó bấm "LƯU MÃ NGAY" để lưu mã; hết giờ thì popup tự đóng.
  * Mã lưu thành công sẽ xuất hiện trong trang "Ưu đãi" (mục 10), kèm mã QR thật (mã hoá đúng nội dung mã voucher) và hạn dùng 3 ngày kể từ lúc lưu.

---

## 10. Trang "Ưu đãi" (mới)

* Liệt kê các mã ưu đãi người dùng đã lưu: mã voucher, QR thật, hạn sử dụng.
* Badge trên header ("Ưu đãi") hiển thị số voucher chưa dùng, cập nhật ngay sau khi lưu mã.

---

## 11. Trang "Đăng nhập điểm bán" (tách riêng khỏi "Điểm bán")

* Chỉ còn form đăng nhập: POSID + Mật khẩu (tài khoản demo: `DEMO001` / `123456`).
* Sai POSID hoặc mật khẩu → hiển thị "Đăng nhập không hợp lệ." (không giới hạn tài khoản thực tế vì là bản demo).
* Sau khi đăng nhập thành công, có 2 tab:
  * **"Quản lý"** — 4 mục lọc: Tất cả / Đã sử dụng / Chưa sử dụng / Hết hạn. **Nội dung bên trong cả 4 mục để trống** — không hiển thị dữ liệu mẫu, vé mẫu, giao dịch mẫu hay placeholder; sẽ nối với dữ liệu thực tế sau.
  * **"Kiểm tra"** — kiểm tra voucher theo 2 cách:
    * Nhập mã thủ công (giữ như cũ).
    * **Quét mã QR** bằng camera thiết bị (nút "📷 Quét QR") — quét được sẽ tự điền mã và kiểm tra ngay.
    * Kiểm tra dựa trên voucher thật đã được lưu qua trang "Điểm bán" (không phải mã mẫu cố định); xác nhận xong đánh dấu voucher là đã sử dụng, đồng bộ ngay với trang "Ưu đãi".

---

## 12. Trang "Cộng đồng"

* Không có nội dung/tính năng "Gửi chủ đề".
* Các nội dung khác (banner Facebook Group, nút "Tham gia cộng đồng", "Chủ đề nổi bật", nội quy) giữ nguyên.

---

## 13. Cấu trúc thư mục & kỹ thuật

```
index.html          Khung trang, toàn bộ markup các view
css/style.css        Toàn bộ style
js/                  9 module JS, script thường (không dùng ES module) để chạy được qua file://
  data.js, router.js, result.js, live.js, chonso.js,
  diemban.js, voucher.js, congdong.js, main.js (nạp sau cùng)
img/                 Logo, 7 hình hướng dẫn, ảnh cơ cấu giải thưởng
```

* Thư viện ngoài (qua CDN, cần Internet khi tải trang lần đầu):
  * `qrcode-generator` — tạo mã QR thật cho voucher.
  * `jsQR` — giải mã QR quét được từ camera.
* Video hướng dẫn cách chơi mở bằng cách chuyển sang tab YouTube mới (không nhúng iframe) do giới hạn nhúng của `file://` (xem mục 5.1).

---

## 14. Bảng tóm tắt nhanh

| Khu vực | Trạng thái hiện tại |
| --- | --- |
| Màu sắc | Cam – vàng theo logo Keno |
| Logo | Header: `logo_stroke.png` (giữ viền trắng); Footer: `keno-logo.png`, to hơn header |
| Header | Cộng đồng / Thông tin / Ưu đãi (có badge); nút "‹ Quay lại" dưới header |
| Bottom nav | Thông tin → Chọn số → Trực tiếp → Kết quả → Điểm bán → Cộng đồng |
| Trang mặc định | "Thông tin" (không phải "Kết quả") |
| CTA nổi | "Tham gia cộng đồng" + "Mua vé", kích thước nhỏ gọn, ẩn/hiện theo hướng cuộn |
| Footer | Logo to → 7 link chữ nhỏ hàng ngang → tagline + "Chơi có trách nhiệm." (đã bỏ hẳn dòng "18+...") |
| Thông tin | Bỏ tiêu đề in đậm; 7 hình (Hình 1-7) đầu trang; 3 mục con: Hướng dẫn cách chơi (text + video mở tab mới), Cơ cấu giải thưởng (ảnh hiện có, cần ảnh gốc để hết crop), Chương trình tại điểm bán (ưu đãi 100.000₫) |
| Chọn số | Bỏ mô tả; thêm "Tra cứu số kỳ quay" (nhập số tự do); mua từ 1 số; hiện mức thưởng theo số đã chọn; nhãn Bậc 1-10 |
| Trực tiếp | Đồng bộ kỳ với Chọn số; bỏ ghi chú demo + 2 ô Lớn/Nhỏ-Chẵn/Lẻ; thêm số người truy cập + bình luận real-time có ô nhập |
| Kết quả | Đổi tên từ "Kết quả & Thống kê"; bỏ mô tả + "Tổng"; bi màu theo chẵn/lẻ; thống kê Lớn/Nhỏ/Hòa và Chẵn/Lẻ/Hòa theo đúng luật Vietlott; tag màu đồng bộ với bi; thêm chữ "kỳ" |
| Điểm bán | Bỏ "Luồng xử lý mã trải nghiệm" + đăng nhập điểm bán (tách trang riêng); ưu đãi mã trải nghiệm 100.000₫, đếm ngược 10s |
| Ưu đãi | Trang mới: danh sách voucher (mã + QR thật + hạn 3 ngày); badge header hiển thị đúng cả chữ lẫn số |
| Đăng nhập điểm bán | POSID/mật khẩu demo; "Quản lý" (4 mục lọc, để trống, không dữ liệu mẫu) + "Kiểm tra" (nhập tay hoặc quét QR camera) |
| Cộng đồng | Bỏ "Gửi chủ đề" |

---

## Nguyên tắc cuối cùng

**Chỉ chỉnh sửa đúng các nội dung được liệt kê trong yêu cầu tại thời điểm đó. Không tự ý thay đổi các thành phần khác của website — bố cục, nội dung, chức năng, hình ảnh, màu sắc hoặc cách hiển thị — nếu không được đề cập.**
