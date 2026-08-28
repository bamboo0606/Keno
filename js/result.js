/* =========================================================
   TRANG "KẾT QUẢ" — kỳ mới nhất, kỳ gần đây, thống kê tần suất
   ========================================================= */
function renderResult(){
  const p = periods[0];
  document.getElementById('rsPeriodCode').textContent = 'Kỳ '+p.code;
  document.getElementById('liveCode').textContent = currentPeriod.code;
  const ballsWrap = document.getElementById('rsBalls');
  ballsWrap.innerHTML = p.nums.map(n=>`<div class="ball ${n%2===0?'even':'odd'}">${pad(n)}</div>`).join('');
  document.getElementById('rsSize').textContent = classifySize(p.nums);
  document.getElementById('rsParity').textContent = classifyParity(p.evenCt);
  document.getElementById('rsEvenCt').textContent = p.evenCt;
  document.getElementById('rsOddCt').textContent = p.oddCt;
  renderRecent();
}
function renderRecent(){
  const list = document.getElementById('recentList');
  const range = +document.getElementById('recentRangeSelect').value;
  const q = document.getElementById('recentSearch').value.trim().toLowerCase();
  let items = periods.slice(0, range);
  if(q) items = items.filter(p=>p.code.toLowerCase().includes(q));
  list.innerHTML = items.length ? items.map(p=>`
    <li>
      <span class="code">${p.code} ${fmtTime(p.date)}</span>
      <span class="tags">
        <span class="tag ${p.size==='Lớn'?'tag-big':'tag-small'}">${p.size}</span>
        <span class="tag ${p.parity==='Chẵn'?'tag-even':p.parity==='Lẻ'?'tag-odd':'tag-tie'}">${p.parity}</span>
      </span>
    </li>`).join('') : '<li class="muted" style="justify-content:center;border-bottom:none">Không tìm thấy kỳ phù hợp.</li>';
}

function freqInRange(range){
  const slice = periods.slice(0, range);
  const freq = {}; for(let i=1;i<=80;i++)freq[i]=0;
  let small=0,big=0,even=0,odd=0,tie=0;
  slice.forEach(p=>{
    p.nums.forEach(n=>freq[n]++);
    if(p.size==='Nhỏ')small++;else big++;
    if(p.parity==='Chẵn')even++;else if(p.parity==='Lẻ')odd++;else tie++;
  });
  return {freq, small, big, even, odd, tie, count:slice.length};
}
let statRange = 50;
function onStatRangeChange(){
  statRange = +document.getElementById('statRangeSelect').value;
  renderStats();
}
function renderStats(){
  const {freq, small, big, even, odd, tie} = freqInRange(statRange);
  document.getElementById('stSmall').textContent = small+' kỳ';
  document.getElementById('stBig').textContent = big+' kỳ';
  document.getElementById('stEven').textContent = even+' kỳ';
  document.getElementById('stOdd').textContent = odd+' kỳ';
  document.getElementById('stTie').textContent = tie+' kỳ';

  const vals = Object.values(freq);
  const min = Math.min(...vals), max = Math.max(...vals);
  const grid = document.getElementById('statHeatgrid');
  let html='';
  for(let i=1;i<=80;i++){
    const lvl = heatLevel(freq[i], min, max);
    html += `<div class="hcell lvl${lvl}" title="${i}: ${freq[i]} lần">${pad(i)}<small>${freq[i]}l</small></div>`;
  }
  grid.innerHTML = html;

  const sorted = Object.entries(freq).map(([k,v])=>({n:+k,c:v})).sort((a,b)=>b.c-a.c);
  const most = sorted.slice(0,10);
  const least = sorted.slice().sort((a,b)=>a.c-b.c).slice(0,10);
  document.getElementById('topMostList').innerHTML = most.map((x,i)=>`<li><span class="rk">${i+1}.</span><span class="num">${pad(x.n)}</span> ${x.c} lần</li>`).join('');
  document.getElementById('topLeastList').innerHTML = least.map((x,i)=>`<li><span class="rk">${i+1}.</span><span class="num">${pad(x.n)}</span> ${x.c} lần</li>`).join('');
}
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>q.parentElement.classList.toggle('open'));
});
