/* =========================================================
   INIT — khởi động toàn bộ trang, chạy sau khi mọi module đã tải.
   ========================================================= */
renderResult();
renderStats();
renderChonSo();
renderOutlets();
renderLiveBallsEmpty();
renderVoucherList();
updateUuDaiBadge();
tickCountdown();
tickOnline();
initCtaScroll();
for(let i=0;i<4;i++) pushChat();
tickChat();
go('ketqua');
