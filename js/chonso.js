/* =========================================================
   TRANG "CHỌN SỐ" — chọn số theo kỳ lịch sử / kỳ hiện tại
   ========================================================= */
let csTab = 'lichsu';
let csRange = 10;
let pickedHist = [];
let pickedLive = [];

document.querySelectorAll('.subtab').forEach(t=>{
  t.addEventListener('click',()=>{
    document.querySelectorAll('.subtab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    csTab = t.dataset.cs;
    document.getElementById('cs-lichsu').style.display = csTab==='lichsu' ? 'block':'none';
    document.getElementById('cs-hientai').style.display = csTab==='hientai' ? 'block':'none';
  });
});
function onCsRangeSelectChange(){
  csRange = +document.getElementById('csRangeSelect').value;
  renderChonSoHist();
}
function onCsRangeCustomConfirm(){
  const n = parseInt(document.getElementById('csRangeCustomInput').value, 10);
  if(!n || n<1) return;
  csRange = n;
  renderChonSoHist();
}

function toggleNumber(arr, n, cap){
  const idx = arr.indexOf(n);
  if(idx>=0){arr.splice(idx,1); return true;}
  if(arr.length>=cap) return false;
  arr.push(n); return true;
}

function renderPlayTypes(container, stats, revealAll){
  container.innerHTML = stats.map(s=>`
    <div class="playtype ${revealAll?'show-detail':''}" onclick="this.classList.toggle('show-detail')">
      <div class="pt-name">${s.name}</div>
      <div class="pt-bar"><div class="pt-fill" style="width:${s.pct}%"></div></div>
      <div class="pt-pct">${s.pct}%</div>
      <div class="pt-detail">${s.count} lượt chọn</div>
    </div>`).join('');
}

function priorityLabel(lvl){
  return lvl>=5 ? 'Ưu tiên rất cao' : lvl===4 ? 'Ưu tiên cao' : lvl===3 ? 'Ưu tiên trung bình' : lvl===2 ? 'Ưu tiên thấp' : 'Ưu tiên rất thấp';
}
const REWARD_BY_COUNT = {1:'20.000',2:'90.000',3:'200.000',4:'400.000',5:'4.400.000',6:'12.500.000',7:'40.000.000',8:'200.000.000',9:'800.000.000',10:'2.000.000.000'};
function renderPickedArea(prefix, freqMap, picked, cap){
  const wrap = document.getElementById('csPicked'+prefix);
  const countEl = document.getElementById('cs'+prefix+'Count');
  countEl.textContent = picked.length;
  wrap.innerHTML = picked.length ? picked.slice().sort((a,b)=>a-b).map(n=>`<div class="picked-chip" onclick="removePicked('${prefix}',${n})">${pad(n)}</div>`).join('')
    : `<span class="picked-empty">Chạm vào bảng số phía trên để chọn tối đa 10 số.</span>`;

  const rewardBox = document.getElementById('csReward'+prefix);
  if(rewardBox){
    rewardBox.innerHTML = picked.length ? `<div class="reward-box">Bạn chọn <b>${picked.length}</b> số, nếu trùng <b>${picked.length}/20</b> số của kỳ quay, bạn trúng <b>${REWARD_BY_COUNT[picked.length]}</b></div>` : '';
  }

  const buyBtn = document.getElementById('csBuy'+prefix);
  const commentBox = document.getElementById('csComment'+prefix);
  const suggestBox = document.getElementById('csSuggest'+prefix);
  const missing = cap - picked.length;
  const vals = Object.values(freqMap); const min=Math.min(...vals), max=Math.max(...vals);
  buyBtn.disabled = picked.length===0;

  if(missing > 0){
    commentBox.innerHTML='';
    const sorted = Object.entries(freqMap).map(([k,v])=>({n:+k,c:v,lvl:heatLevel(v,min,max)})).sort((a,b)=>b.c-a.c);
    const suggestions = sorted.filter(x=>!picked.includes(x.n)).slice(0,missing);
    suggestBox.innerHTML = `
      <div class="suggest-head">Bạn đã chọn <b>${picked.length}</b>/${cap} số. Chọn thêm <b>${missing}</b> số để có cơ hội trúng <b>2 tỷ đồng</b>.</div> 
      <div class="suggest-head">Gợi ý ${suggestions.length} số ưu tiên cao nhất theo số lần xuất hiện:</div>
      <div class="suggest-chips">${suggestions.map(s=>`<span class="suggest-chip lvl${s.lvl}" title="${priorityLabel(s.lvl)} · ${s.c} lần xuất hiện" onclick="addPicked('${prefix}',${s.n})">${pad(s.n)}</span>`).join('')}</div>
      <div class="legend" style="margin-top:6px">
        <i style="background:var(--heat-5)"></i>ưu tiên rất cao
        <i style="background:var(--heat-3)"></i>trung bình
        <i style="background:var(--heat-1)"></i>thấp
      </div>`;
  } else {
    suggestBox.innerHTML='';
    const levels = picked.map(n=>heatLevel(freqMap[n],min,max));
    const hi = levels.filter(l=>l>=4).length, lo = levels.filter(l=>l<=2).length, mid = cap-hi-lo;
    commentBox.innerHTML = `<div class="comment-box">Nhận xét: bộ số của bạn có <b>${hi}</b> số thuộc nhóm tần suất cao, <b>${mid}</b> số trung bình và <b>${lo}</b> số thấp (dựa trên dữ liệu đã chọn). Đây chỉ là mô tả dữ liệu, không phải dự đoán kết quả.</div>`;
  }
}
function addPicked(prefix, n){
  const arr = prefix==='Hist'?pickedHist:pickedLive;
  toggleNumber(arr, n, 10);
  prefix==='Hist' ? renderChonSoHist() : renderChonSoLive();
}
function removePicked(prefix, n){ addPicked(prefix, n); }

function renderChonSoHist(){
  const {freq} = freqInRange(csRange);
  const vals = Object.values(freq); const min=Math.min(...vals), max=Math.max(...vals);
  const grid = document.getElementById('csHeatHist');
  let html='';
  for(let i=1;i<=80;i++){
    const lvl = heatLevel(freq[i], min, max);
    const sel = pickedHist.includes(i) ? 'selected':'';
    html += `<div class="hcell lvl${lvl} ${sel}" onclick="onGridClick('Hist',${i})">${pad(i)}<small>${freq[i]} kỳ</small></div>`;
  }
  grid.innerHTML = html;
  renderPlayTypes(document.getElementById('csPlayHist'), playTypeStats(0), false);
  renderPickedArea('Hist', freq, pickedHist, 10);
}
function renderChonSoLive(){
  document.getElementById('csCurCode').textContent = 'Kỳ '+currentPeriod.code;
  const freq = currentPeriod.liveCounts;
  const vals = Object.values(freq); const min=Math.min(...vals), max=Math.max(...vals);
  const grid = document.getElementById('csHeatLive');
  let html='';
  for(let i=1;i<=80;i++){
    const lvl = heatLevel(freq[i], min, max);
    const sel = pickedLive.includes(i) ? 'selected':'';
    html += `<div class="hcell lvl${lvl} ${sel}" onclick="onGridClick('Live',${i})">${pad(i)}<small>${freq[i]}ng</small></div>`;
  }
  grid.innerHTML = html;
  renderPlayTypes(document.getElementById('csPlayLive'), playTypeStats(0), false);
  renderPickedArea('Live', freq, pickedLive, 10);
}
function onGridClick(prefix, n){
  const arr = prefix==='Hist'?pickedHist:pickedLive;
  const ok = toggleNumber(arr, n, 10);
  if(!ok) toast('Bạn chỉ có thể chọn tối đa 10 số.');
  prefix==='Hist' ? renderChonSoHist() : renderChonSoLive();
}
function renderChonSo(){ renderChonSoHist(); renderChonSoLive(); }

let onlineVisitors = 180 + Math.floor(Math.random()*220);
function tickOnline(){
  onlineVisitors = Math.max(60, onlineVisitors + Math.floor(Math.random()*11-5));
  document.getElementById('onlineCountHist').textContent = onlineVisitors.toLocaleString('vi-VN');
  document.getElementById('onlineCountLive').textContent = onlineVisitors.toLocaleString('vi-VN');
  document.getElementById('onlineCountTruc').textContent = onlineVisitors.toLocaleString('vi-VN');
  // jitter live counts a bit for realism
  const k = 1+Math.floor(Math.random()*80);
  currentPeriod.liveCounts[k] += Math.floor(Math.random()*4);
  if(csTab==='hientai') renderChonSoLive();
}
setInterval(tickOnline, 2500);

let lastBuySet = null;
function buySet(prefix){
  const picked = prefix==='lichsu' ? pickedHist : pickedLive;
  if(picked.length<1) return;
  lastBuySet = picked.slice().sort((a,b)=>a-b);
  go('diem-ban');
  const box = document.getElementById('pickedSummaryBox');
  box.style.display='flex';
  document.getElementById('pickedSummaryNums').innerHTML = lastBuySet.map(n=>`<span class="mini">${pad(n)}</span>`).join(' ');
  toast('Đã lưu bộ số. Chọn điểm bán gần nhất để đổi vé.');
}
