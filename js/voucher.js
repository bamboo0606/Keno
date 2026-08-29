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
function drawQR(canvas, text){
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const count = qr.getModuleCount();
  const cell = Math.max(1, Math.floor(canvas.width / count));
  canvas.width = count*cell; canvas.height = count*cell;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#241315';
  for(let r=0;r<count;r++){
    for(let c=0;c<count;c++){
      if(qr.isDark(r,c)) ctx.fillRect(c*cell, r*cell, cell, cell);
    }
  }
}
function renderVoucherCard(v, idPrefix){
  const st = voucherStatus(v);
  const canvasId = 'qr-'+idPrefix+'-'+v.code;
  setTimeout(()=>{ const c=document.getElementById(canvasId); if(c) drawQR(c, v.code); },0);
  return `<div class="voucher-card">
    <div class="vc-qr"><canvas id="${canvasId}" width="90" height="90"></canvas></div>
    <div class="vc-info">
      <div class="vc-code">${v.code}</div>
      <div class="vc-desc">Ưu đãi 100.000₫ cho xổ số Keno tại điểm bán.</div>
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
  badge.style.display = activeCount>0 ? 'inline-flex':'none';
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
  // Chưa kết nối dữ liệu thực tế — để trống, không hiển thị dữ liệu mẫu/placeholder.
  const box = document.getElementById('sellerVoucherList');
  if(!box) return;
  box.innerHTML = '';
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

/* ---------- Quét mã QR bằng camera ---------- */
let qrScanStream = null;
let qrScanRAF = null;
function openQrScan(){
  const modal = document.getElementById('qrScanModal');
  const video = document.getElementById('qrScanVideo');
  const hint = document.getElementById('qrScanHint');
  modal.classList.remove('hidden');
  hint.textContent = 'Đưa mã QR vào giữa khung hình.';
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    hint.textContent = 'Trình duyệt này không hỗ trợ quét QR bằng camera. Vui lòng nhập mã thủ công.';
    return;
  }
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(stream=>{
    qrScanStream = stream;
    video.srcObject = stream;
    video.play();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    function tick(){
      if(!qrScanStream) return;
      if(video.readyState === video.HAVE_ENOUGH_DATA){
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if(code && code.data){
          onQrDetected(code.data);
          return;
        }
      }
      qrScanRAF = requestAnimationFrame(tick);
    }
    qrScanRAF = requestAnimationFrame(tick);
  }).catch(()=>{
    hint.textContent = 'Không thể truy cập camera. Vui lòng cho phép quyền camera hoặc nhập mã thủ công.';
  });
}
function closeQrScan(){
  document.getElementById('qrScanModal').classList.add('hidden');
  if(qrScanRAF) cancelAnimationFrame(qrScanRAF);
  qrScanRAF = null;
  if(qrScanStream){ qrScanStream.getTracks().forEach(t=>t.stop()); qrScanStream = null; }
}
function onQrDetected(text){
  closeQrScan();
  document.getElementById('codeInput').value = text;
  checkCode();
  toast('Đã quét được mã: '+text);
}
