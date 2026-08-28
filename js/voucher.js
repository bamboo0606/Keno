/* =========================================================
   ƯU ĐÃI / VOUCHER + ĐĂNG NHẬP ĐIỂM BÁN
   ========================================================= */
const VOUCHER_TTL_DAYS = 3;
const VOUCHER_COUNTDOWN = 10;
let vouchers = []; // {code, savedAt, expiresAt, status:'unused'|'used'}
let vmInterval = null, vmSecLeft = 0;

function genCode(){
  document.getElementById('voucherModal').classList.remove('hidden');
  vmSecLeft = VOUCHER_COUNTDOWN;
  const timerEl = document.getElementById('vmTimer');
  const saveBtn = document.getElementById('vmSaveBtn');
  timerEl.textContent = vmSecLeft;
  saveBtn.disabled = false;
  saveBtn.textContent = 'LƯU MÃ NGAY';
  clearInterval(vmInterval);
  vmInterval = setInterval(()=>{
    vmSecLeft--;
    timerEl.textContent = Math.max(0, vmSecLeft);
    if(vmSecLeft<=0){
      clearInterval(vmInterval);
      saveBtn.disabled = true;
      saveBtn.textContent = 'Đã hết thời gian';
      setTimeout(closeVoucherModal, 900);
    }
  }, 1000);
}
function closeVoucherModal(){
  document.getElementById('voucherModal').classList.add('hidden');
  clearInterval(vmInterval);
}
function saveVoucher(){
  if(vmSecLeft<=0) return;
  clearInterval(vmInterval);
  const code = 'KENO-'+Math.random().toString(36).slice(2,7).toUpperCase();
  const savedAt = new Date();
  const expiresAt = new Date(savedAt.getTime() + VOUCHER_TTL_DAYS*24*60*60*1000);
  vouchers.unshift({code, savedAt, expiresAt, status:'unused'});
  closeVoucherModal();
  renderVoucherList();
  renderSellerVoucherList();
  updateUuDaiBadge();
  toast('Đã lưu mã '+code+'. Xem lại tại mục "Ưu đãi".');
}
function fmtDateTime(d){ return pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear()+' '+pad(d.getHours())+':'+pad(d.getMinutes()); }
function voucherStatus(v){
  if(v.status==='used') return 'used';
  if(new Date() > v.expiresAt) return 'expired';
  return 'unused';
}
function drawFakeQR(canvas, text){
  const size = 15, cell = 6;
  canvas.width = size*cell; canvas.height = size*cell;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
  let seed = 0; for(let i=0;i<text.length;i++) seed = (seed*31 + text.charCodeAt(i))>>>0;
  function rand(){ seed = (seed*1103515245 + 12345) >>> 0; return (seed>>>8) / 16777216; }
  ctx.fillStyle = '#241315';
  for(let y=0;y<size;y++){
    for(let x=0;x<size;x++){
      const inFinder = (x<7&&y<7) || (x>=size-7&&y<7) || (x<7&&y>=size-7);
      if(inFinder){
        const lx = x<7?x:x-(size-7), ly = y<7?y:y-(size-7);
        const border = lx===0||lx===6||ly===0||ly===6;
        const innerFill = lx>=2&&lx<=4&&ly>=2&&ly<=4;
        if(border||innerFill) ctx.fillRect(x*cell,y*cell,cell,cell);
        continue;
      }
      if(rand()<0.48) ctx.fillRect(x*cell,y*cell,cell,cell);
    }
  }
}
function renderVoucherCard(v, idPrefix){
  const st = voucherStatus(v);
  const canvasId = 'qr-'+idPrefix+'-'+v.code;
  setTimeout(()=>{ const c=document.getElementById(canvasId); if(c) drawFakeQR(c, v.code); },0);
  return `<div class="voucher-card">
    <div class="vc-qr"><canvas id="${canvasId}" width="90" height="90"></canvas></div>
    <div class="vc-info">
      <div class="vc-code">${v.code}</div>
      <div class="vc-desc">Ưu đãi 30.000₫ cho xổ số Keno tại điểm bán.</div>
      <div class="vc-exp ${st==='expired'?'bad':'ok'}">${st==='used'?'Đã sử dụng · ':''}Hết hạn: ${fmtDateTime(v.expiresAt)}</div>
    </div>
  </div>`;
}
function renderVoucherList(){
  const box = document.getElementById('voucherList');
  if(!box) return;
  box.innerHTML = vouchers.length ? vouchers.map(v=>renderVoucherCard(v,'u')).join('')
    : '<div class="voucher-empty">Bạn chưa lưu mã ưu đãi nào. Vào mục "Điểm bán" → "Nhận mã trải nghiệm" để lấy mã.</div>';
}
function updateUuDaiBadge(){
  const badge = document.getElementById('uuDaiBadge');
  const activeCount = vouchers.filter(v=>voucherStatus(v)==='unused').length;
  badge.style.display = activeCount>0 ? 'flex':'none';
  badge.textContent = activeCount;
}

let voucherFilter = 'all';
document.querySelectorAll('#voucherFilterPills .pill').forEach(p=>{
  p.addEventListener('click',()=>{
    document.querySelectorAll('#voucherFilterPills .pill').forEach(x=>x.classList.remove('active'));
    p.classList.add('active');
    voucherFilter = p.dataset.vfilter;
    renderSellerVoucherList();
  });
});
function renderSellerVoucherList(){
  const box = document.getElementById('sellerVoucherList');
  if(!box) return;
  let list = vouchers.map(v=>({...v, st:voucherStatus(v)}));
  if(voucherFilter!=='all') list = list.filter(v=>v.st===voucherFilter);
  box.innerHTML = list.length ? list.map(v=>renderVoucherCard(v,'s')).join('') : '<div class="voucher-empty">Không có voucher phù hợp.</div>';
}

/* ---------- Đăng nhập điểm bán ---------- */
const SELLER_POSID = 'DEMO001', SELLER_PASS = '123456';
let sellerLoggedIn = false;
function sellerLogin(){
  const user = document.getElementById('sellerUser').value.trim();
  const pass = document.getElementById('sellerPass').value;
  const msg = document.getElementById('loginMsg');
  if(user!==SELLER_POSID || pass!==SELLER_PASS){
    msg.textContent = 'Đăng nhập không hợp lệ.';
    msg.className='state-msg state-bad show';
    return;
  }
  msg.classList.remove('show');
  sellerLoggedIn = true;
  document.getElementById('sellerLoginBox').style.display='none';
  document.getElementById('sellerPanel').style.display='block';
  document.getElementById('sellerName').textContent=user;
  renderSellerVoucherList();
}
function sellerLogout(){
  sellerLoggedIn=false;
  document.getElementById('sellerLoginBox').style.display='block';
  document.getElementById('sellerPanel').style.display='none';
  document.getElementById('loginMsg').classList.remove('show');
  document.getElementById('codeMsg').classList.remove('show');
  document.getElementById('confirmBtn').style.display='none';
  document.getElementById('sellerUser').value='';
  document.getElementById('sellerPass').value='';
  document.getElementById('codeInput').value='';
}
document.querySelectorAll('.subtab2').forEach(t=>{
  t.addEventListener('click',()=>{
    document.querySelectorAll('.subtab2').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const tab = t.dataset.seller;
    document.getElementById('sellerQuanLy').style.display = tab==='quanly' ? 'block':'none';
    document.getElementById('sellerKiemTra').style.display = tab==='kiemtra' ? 'block':'none';
  });
});
let pendingCode=null;
function checkCode(){
  const raw = document.getElementById('codeInput').value.trim().toUpperCase();
  const msg = document.getElementById('codeMsg');
  const confirmBtn = document.getElementById('confirmBtn');
  confirmBtn.style.display='none';
  pendingCode=null;
  if(!raw){ msg.textContent='Nhập mã voucher trước khi kiểm tra.'; msg.className='state-msg state-warn show'; return; }
  const v = vouchers.find(x=>x.code===raw);
  if(!v){ msg.textContent='Mã không hợp lệ.'; msg.className='state-msg state-bad show'; return; }
  const st = voucherStatus(v);
  if(st==='used'){ msg.textContent='Mã đã được sử dụng trước đó.'; msg.className='state-msg state-warn show'; return; }
  if(st==='expired'){ msg.textContent='Mã đã hết hạn sử dụng.'; msg.className='state-msg state-warn show'; return; }
  msg.textContent='Mã hợp lệ — có thể tiếp tục quy đổi cho khách.'; msg.className='state-msg state-ok show';
  confirmBtn.style.display='block';
  pendingCode=raw;
}
function confirmCode(){
  if(!pendingCode) return;
  const v = vouchers.find(x=>x.code===pendingCode);
  if(v) v.status='used';
  const msg = document.getElementById('codeMsg');
  msg.textContent='Đã ghi nhận. Vui lòng giao vé hoặc ưu đãi tương ứng cho khách.';
  msg.className='state-msg state-ok show';
  document.getElementById('confirmBtn').style.display='none';
  pendingCode=null;
  renderVoucherList();
  renderSellerVoucherList();
  updateUuDaiBadge();
}
