/* =========================================================
   TRANG "TRỰC TIẾP" — quay số trực tiếp + bình luận real-time
   ========================================================= */
function renderLiveBallsEmpty(){
  document.getElementById('liveBalls').innerHTML = Array.from({length:20}).map(()=>`<div class="live-ball">?</div>`).join('');
}
function tickCountdown(){
  const secLeft = Math.max(0, Math.round((nextDrawAt - new Date())/1000));
  const mm = pad(Math.floor(secLeft/60)), ss = pad(secLeft%60);
  const str = mm+':'+ss;
  document.getElementById('rsCountdown').textContent = str;
  document.getElementById('liveTimer').textContent = str;
  document.getElementById('csCurCountdown').textContent = str;
  if(secLeft<=0){
    runDraw();
  }
}
let drawing=false;
function runDraw(){
  if(drawing) return;
  drawing=true;
  document.getElementById('liveStatus').textContent = 'Đang quay số…';
  const nums = pick20();
  const a = analyze(nums);
  const balls = document.getElementById('liveBalls');
  balls.innerHTML = Array.from({length:20}).map(()=>`<div class="live-ball">?</div>`).join('');
  let i=0;
  const seq = setInterval(()=>{
    if(i>=20){
      clearInterval(seq);
      document.getElementById('liveStatus').textContent = 'Đã có kết quả kỳ '+currentPeriod.code;
      // commit new period to history
      periods.unshift({code:currentPeriod.code, date:new Date(), nums:nums.slice().sort((x,y)=>x-y), ...a});
      periods = periods.slice(0,150);
      nextDrawAt = new Date(Date.now() + DRAW_INTERVAL*1000);
      currentPeriod = {
        code: nextPeriodCode(currentPeriod.code),
        liveCounts: (function(){const o={};for(let k=1;k<=80;k++)o[k]=Math.floor(Math.random()*140)+5;return o;})()
      };
      drawing=false;
      renderResult();
      renderStats();
      renderChonSo();
      setTimeout(()=>{document.getElementById('liveStatus').textContent='Đang chờ đến giờ quay…';renderLiveBallsEmpty();},4000);
      return;
    }
    const b = balls.children[i];
    b.textContent = pad(nums[i]);
    b.classList.add('on');
    i++;
  }, 130);
}
function nextPeriodCode(code){
  const parts = code.split('-');
  const seq = (+parts[1])+1;
  return parts[0]+'-'+pad(seq,3);
}
setInterval(tickCountdown, 1000);

/* ---------- Bình luận trực tiếp ---------- */
const CHAT_NAMES = ['Minh Anh','Quốc Bảo','Thu Hà','Hoàng Long','Bích Ngọc','Trung Kiên','Lan Phương','Đức Anh','Ngọc Mai','Tuấn Vũ','Hải Yến','Gia Huy','Thanh Tùng','Kim Chi'];
const CHAT_MSGS = [
  'Chúc mọi người may mắn kỳ này!',
  'Số 23 lâu rồi chưa về, chắc sắp tới lượt.',
  'Ai theo cầu Lớn giống mình không?',
  'Kỳ trước mình về sát nút luôn.',
  'Bảng thống kê hôm nay nhìn hay đó.',
  'Mọi người chọn theo tần suất hay theo cảm tính vậy?',
  'Xem trực tiếp thế này trực quan thật.',
  'Chúc kỳ sau về đẹp cho cả nhà!',
  'Vừa đối chiếu xong, gần trúng rồi.',
  'Có ai để ý cầu Chẵn/Lẻ mấy kỳ nay không?',
  'Chờ kỳ tiếp theo quay nè.',
  'Nhớ chơi có trách nhiệm mọi người ơi.',
];
function initialsOf(name){
  return name.split(' ').map(w=>w[0]).join('').slice(-2).toUpperCase();
}
let chatMessages = [];
function renderChat(){
  const box = document.getElementById('liveChat');
  if(!box) return;
  box.innerHTML = chatMessages.map(c=>`
    <div class="chat-msg ${c.mine?'mine':''}">
      <div class="chat-avatar">${c.mine ? 'B' : initialsOf(c.name)}</div>
      <div class="chat-body">
        <div class="chat-name-row"><b>${c.name}</b><span>${fmtTime(c.time)}</span></div>
        <div class="chat-text">${c.msg}</div>
      </div>
    </div>`).join('');
  box.scrollTop = box.scrollHeight;
}
function pushChat(){
  const name = CHAT_NAMES[Math.floor(Math.random()*CHAT_NAMES.length)];
  const msg = CHAT_MSGS[Math.floor(Math.random()*CHAT_MSGS.length)];
  chatMessages.push({name, msg, time:new Date()});
  if(chatMessages.length>30) chatMessages = chatMessages.slice(-30);
  renderChat();
}
function tickChat(){
  pushChat();
  setTimeout(tickChat, 2200 + Math.random()*3200);
}
function sendChat(){
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if(!text) return;
  chatMessages.push({name:'Bạn', msg:text, time:new Date(), mine:true});
  if(chatMessages.length>30) chatMessages = chatMessages.slice(-30);
  renderChat();
  input.value='';
}
