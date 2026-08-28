/* =========================================================
   TRANG "CỘNG ĐỒNG" — chủ đề nổi bật
   ========================================================= */
const TOPICS = [
  {t:'Kinh nghiệm chọn số cho người mới', d:'Chia sẻ cách đọc bảng tần suất trước khi chọn số.', c:'34 bình luận'},
  {t:'Tổng hợp câu hỏi về Lớn/Nhỏ, Chẵn/Lẻ', d:'Giải đáp các thắc mắc thường gặp từ cộng đồng.', c:'21 bình luận'},
  {t:'Chơi có trách nhiệm — đặt giới hạn cho bản thân', d:'Một số nguyên tắc giúp kiểm soát ngân sách khi chơi.', c:'18 bình luận'},
  {t:'Danh sách điểm bán được cộng đồng đánh giá tốt', d:'Tổng hợp điểm bán uy tín theo khu vực.', c:'12 bình luận'},
];
document.getElementById('topicList').innerHTML = TOPICS.map(t=>`
  <div class="topic-card" onclick="toast('Đang chuyển sang Facebook Group…')">
    <b>${t.t}</b><span>${t.d}</span>
    <div class="topic-meta"><span>💬 ${t.c}</span><span>Facebook Group</span></div>
  </div>`).join('');
