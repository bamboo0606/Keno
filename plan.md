# YÊU CẦU CHỈNH SỬA WEBSITE KENO

## 1. Nguyên tắc chỉnh sửa chung

Website hiện tại sau khi chỉnh sửa theo yêu cầu trước đã tương đối đúng định hướng. Ở phiên bản tiếp theo, chỉ thực hiện các thay đổi được nêu dưới đây.

**Lưu ý quan trọng:** Những nội dung, bố cục, tính năng hoặc thành phần không được đề cập trong danh sách này thì giữ nguyên, không chỉnh sửa hoặc thay đổi.

---

## 2. Màu sắc & nhận diện thương hiệu

* Chuyển toàn bộ màu sắc chủ đạo của website sang tông cam – vàng, lấy cảm hứng từ màu sắc của logo sản phẩm Keno.
* Đảm bảo màu sắc mới được áp dụng đồng bộ nhưng vẫn giữ nguyên bố cục và các thành phần khác của website.
* Thay logo chữ “KENO” hiện tại bằng hình logo sản phẩm Keno được cung cấp.
* Logo Keno ở khu vực chân trang (footer) hiển thị to hơn logo ở đầu trang (header).
* Logo ở đầu trang (header) dùng file `logo_stroke.png` — giữ nguyên viền trắng quanh chữ, không tách/chỉnh sửa nền của ảnh gốc.

---

## 3. Điều chỉnh Header / Menu đầu trang

### 3.1. Xóa các mục đang hiển thị ở đầu trang

Bỏ toàn bộ các mục sau khỏi khu vực đầu trang:

* Kết quả & thống kê
* Trực tiếp quay số
* Chọn số
* Điểm bán
* Kỳ tới

### 3.2. Điều chỉnh nút cố định “Tham gia cộng đồng” và “Mua vé”

Hiện tại hai nội dung “Tham gia cộng đồng” và “Mua vé” đang được cố định ở đầu trang.

Yêu cầu thay đổi:

* Không đặt cố định hai nút này ở đầu trang nữa.
* Chuyển hai nút xuống khu vực cuối trang, đặt phía trên danh sách các tính năng chính.
* Hai nút vẫn giữ vai trò CTA chính của website.

### 3.3. Hiệu ứng khi người dùng cuộn trang

Thiết lập hành vi hiển thị như sau:

* Khi người dùng lướt lên (scroll up) → hai nút “Tham gia cộng đồng” và “Mua vé” sẽ xuất hiện.
* Khi người dùng lướt xuống (scroll down) → hai nút tạm thời ẩn đi để không che nội dung.
* Hiệu ứng xuất hiện/ẩn nên mượt, tránh gây cảm giác giật hoặc làm ảnh hưởng trải nghiệm đọc nội dung.

---

## 4. Khu vực cuối trang – Các tính năng chính

**Không** tạo một khối/card riêng có tiêu đề “Tính năng chính” — vì khối này nằm ngoài các view và sẽ hiển thị lặp lại ở cuối mọi trang/tính năng khi cuộn xuống, gây cảm giác trùng lặp.

Thay vào đó, trình bày danh sách điều hướng dưới dạng **chữ nhỏ** ngay trong khu vực chân trang (footer) hiện có, với vị trí:

* Nằm bên dưới phần nội dung chính của trang.
* Đặt ngay sau logo Keno ở chân trang.
* Trình bày dạng hàng ngang, tự xuống dòng khi cần (không phải danh sách dọc kiểu thẻ/card lớn kèm icon).
* Phần nội dung mô tả/pháp lý phía dưới danh sách link (tagline giới thiệu, “Chơi có trách nhiệm.”, dòng 18+…) giữ nguyên, không xóa.

Thứ tự các mục (mỗi mục là một link điều hướng, dẫn đến đúng khu vực/tính năng tương ứng):

1. Kết quả & thống kê
2. Trực tiếp
3. Chọn số
4. Điểm bán
5. Cộng đồng
6. Thông tin
7. Đăng nhập điểm bán — giữ trong danh sách này vì đây là đường dẫn duy nhất để vào trang đăng nhập điểm bán, sau khi mục 7 (Điểm bán) đã yêu cầu bỏ nó khỏi nội dung tính năng Điểm bán.

---

## 5. Tính năng “Kết quả & thống kê”

### 5.1. Bảng kết quả kỳ mới nhất

* Bỏ nội dung “Tổng” đang hiển thị bên dưới bảng kết quả kỳ mới nhất.
* Các nội dung khác của bảng giữ nguyên.

### 5.2. Khu vực “Kỳ gần đây”

Thay đổi cách lựa chọn kỳ:

* Không hiển thị cố định hai lựa chọn “Hôm nay” và “Lịch sử” như hiện tại.
* Thay bằng bộ lọc cho phép người dùng chọn kỳ muốn xem.
* Bộ lọc cần giúp người dùng dễ dàng lựa chọn và tra cứu kỳ phù hợp.

### 5.3. Khu vực “Thống kê”

* Thay bộ lựa chọn hiện tại “30 – 50 – 100 kỳ” bằng bộ lọc chọn kỳ.
* Người dùng có thể chủ động lựa chọn khoảng/kỳ muốn xem thống kê.
* Các nội dung và cách hiển thị thống kê khác giữ nguyên nếu không được đề cập.

---

## 6. Tính năng “Trực tiếp”

### 6.1. Màn hình quay trực tiếp

* Sử dụng màn hình quay trực tiếp giống website demo ban đầu.
* Không để khu vực màn hình quay ở trạng thái trống như phiên bản hiện tại.
* Giữ trải nghiệm trực tiếp tương tự website demo.

### 6.2. Bảng kết quả

* Bỏ nội dung “Tổng” ở cuối bảng.
* Các thành phần khác của bảng giữ nguyên.

### 6.3. “Bộ số bạn đã chọn” – Gợi ý hoàn thiện bộ số

Bổ sung cơ chế gợi ý khi người dùng chưa chọn đủ số theo bậc chơi.

**Ví dụ:**

* Người dùng chọn bậc 10 → cần chọn đủ 10 số.
* Người dùng hiện mới chọn 6 số.
* Hệ thống nhận biết người dùng còn thiếu 4 số.
* Hệ thống hiển thị gợi ý các số có mức độ ưu tiên cao nhất dựa trên dữ liệu/phân tích số lượng và màu sắc đang có trên hệ thống.
* Người dùng có thể sử dụng các số được gợi ý để nhanh chóng hoàn thiện bộ số.

**Nguyên tắc hiển thị**

Phần gợi ý cần thể hiện rõ:

* Người dùng đã chọn bao nhiêu số.
* Còn thiếu bao nhiêu số.
* Các số được hệ thống đề xuất.
* Mức độ ưu tiên của từng số thông qua phân tích số lượng và màu sắc.

**Mục tiêu:** hỗ trợ người dùng hoàn thiện bộ số nhanh hơn, nhưng vẫn để người dùng chủ động quyết định số cuối cùng.

### 6.4. Bình luận trực tiếp & số người đang truy cập

* Thêm khu vực bình luận trực tiếp (real-time) của người dùng, đặt ngay phía dưới bảng trực tiếp quay số.
* Thêm số người đang truy cập (giống cách hiển thị ở tính năng “Chọn số”), đặt ngay phía dưới bảng trực tiếp quay số.

---

## 7. Tính năng “Điểm bán”

Chỉ thực hiện 2 thay đổi:

**Xóa:**

* Bỏ nội dung “Luồng xử lý mã trải nghiệm”.
* Bỏ nội dung/tính năng “Đăng nhập điểm bán” khỏi khu vực tính năng Điểm bán.

Các nội dung khác của tính năng “Điểm bán” giữ nguyên.

**Lưu ý:** Mục “Đăng nhập điểm bán” vẫn xuất hiện trong danh sách link tính năng chính ở cuối trang theo mục 4, nhưng không hiển thị bên trong nội dung tính năng “Điểm bán”.

---

## 8. Tính năng “Cộng đồng”

* Bỏ nội dung/tính năng “Gửi chủ đề”.
* Các nội dung khác của khu vực Cộng đồng giữ nguyên.

---

## 9. Tóm tắt các thay đổi cần thực hiện

| Khu vực            | Thay đổi                                                         |
| ------------------ | ---------------------------------------------------------------- |
| Màu sắc            | Chuyển sang tông cam – vàng theo logo Keno                       |
| Logo               | Thay chữ “KENO” bằng logo sản phẩm Keno; header dùng `logo_stroke.png` (giữ viền trắng, không tách nền); logo chân trang to hơn logo đầu trang |
| Menu đầu trang     | Xóa Kết quả & thống kê / Trực tiếp / Chọn số / Điểm bán / Kỳ tới |
| CTA đầu trang      | Đưa “Tham gia cộng đồng” + “Mua vé” xuống cuối trang             |
| CTA khi scroll     | Scroll lên → hiện; scroll xuống → ẩn tạm thời                    |
| Cuối trang         | Hiển thị 7 link tính năng dạng chữ nhỏ, hàng ngang, đặt sau logo trong footer (không tạo card “Tính năng chính” riêng) |
| Kết quả & thống kê | Bỏ “Tổng”                                                        |
| Kỳ gần đây         | Thay “Hôm nay / Lịch sử” bằng bộ lọc chọn kỳ                     |
| Thống kê           | Thay “30 / 50 / 100 kỳ” bằng bộ lọc chọn kỳ                      |
| Trực tiếp          | Hiển thị màn hình quay trực tiếp giống demo                      |
| Trực tiếp          | Bỏ “Tổng” cuối bảng                                              |
| Trực tiếp          | Thêm bình luận trực tiếp + số người đang truy cập dưới bảng quay số |
| Bộ số đã chọn      | Gợi ý số khi người dùng chưa chọn đủ                             |
| Điểm bán           | Bỏ “Luồng xử lý mã trải nghiệm”                                  |
| Điểm bán           | Bỏ “Đăng nhập điểm bán” khỏi nội dung tính năng                  |
| Cộng đồng          | Bỏ “Gửi chủ đề”                                                  |

---

## Nguyên tắc cuối cùng

**Chỉ chỉnh sửa đúng các nội dung được liệt kê trong yêu cầu này. Không tự ý thay đổi các thành phần khác của website, bao gồm bố cục, nội dung, chức năng, hình ảnh hoặc cách hiển thị nếu những phần đó không được đề cập.**
