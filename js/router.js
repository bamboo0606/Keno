/* =========================================================
   NAV / ROUTER
   Điều hướng giữa các view + nút quay lại + toast + CTA nổi.
   ========================================================= */
let viewHistory = [];
let currentView = null;
function renderView(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+view).classList.add('active');
  document.querySelectorAll('.menu-chip').forEach(c=>c.classList.toggle('active', c.dataset.view===view));
  document.querySelectorAll('.navitem').forEach(c=>c.classList.toggle('active', c.dataset.view===view));
  window.scrollTo({top:0,behavior:'instant' in window ? 'instant':'auto'});
  ctaLastY = 0;
  document.getElementById('ctaFloat').classList.remove('cta-hidden');
  currentView = view;
  document.getElementById('backBar').style.display = viewHistory.length ? 'block' : 'none';
}
function go(view){
  if(currentView && currentView!==view) viewHistory.push(currentView);
  renderView(view);
}
function goBack(){
  if(!viewHistory.length) return;
  const prev = viewHistory.pop();
  renderView(prev);
}
document.querySelectorAll('.menu-chip,.navitem').forEach(el=>{
  el.addEventListener('click',()=>go(el.dataset.view));
});

function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer=setTimeout(()=>t.classList.remove('show'),2600);
}

/* Ẩn/hiện CTA nổi theo hướng cuộn: cuộn lên → hiện, cuộn xuống → ẩn */
let ctaLastY = 0;
function onCtaScroll(){
  const cta = document.getElementById('ctaFloat');
  const y = window.scrollY || 0;
  if(Math.abs(y-ctaLastY) < 4) return;
  if(y > ctaLastY && y > 40) cta.classList.add('cta-hidden');
  else cta.classList.remove('cta-hidden');
  ctaLastY = y;
}
function initCtaScroll(){
  ctaLastY = window.scrollY || 0;
  window.addEventListener('scroll', onCtaScroll, {passive:true});
}
