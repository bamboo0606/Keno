/* =========================================================
   MOCK DATA ENGINE
   Dữ liệu giả lập kỳ quay + các hàm phân loại kết quả dùng chung.
   ========================================================= */
function pad(n,l){l=l||2;n=String(n);while(n.length<l)n="0"+n;return n;}
function pick20(){
  const pool=[];for(let i=1;i<=80;i++)pool.push(i);
  const out=[];
  for(let i=0;i<20;i++){
    const idx=Math.floor(Math.random()*pool.length);
    out.push(pool.splice(idx,1)[0]);
  }
  return out.sort((a,b)=>a-b);
}
/* Phân loại theo đúng luật chính thức Vietlott Keno:
   Lớn/Nhỏ dựa trên số lượng số quay ra ở mỗi nửa dải 01–80 (không phải tổng),
   Chẵn/Lẻ dựa trên số lượng số chẵn/lẻ quay ra. Ngưỡng 11 số trở lên mới tính
   thắng Lớn/Nhỏ hoặc Chẵn/Lẻ; đúng 10-10 là Hòa. */
function analyze(nums){
  const tong=nums.reduce((a,b)=>a+b,0);
  const bigCt=nums.filter(n=>n>=41).length;
  const smallCt=20-bigCt;
  const size = bigCt>=11 ? 'Lớn' : smallCt>=11 ? 'Nhỏ' : 'Hòa';
  const evenCt=nums.filter(n=>n%2===0).length;
  const oddCt=20-evenCt;
  const parity = evenCt>=11 ? 'Chẵn' : oddCt>=11 ? 'Lẻ' : 'Hòa';
  return {tong,size,evenCt,oddCt,parity};
}
function fmtTime(d){return pad(d.getHours())+':'+pad(d.getMinutes());}
function fmtDate(d){return pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear();}
function heatLevel(value, min, max){
  if(max===min) return 1;
  const p = (value-min)/(max-min);
  if(p<0.2) return 1; if(p<0.4) return 2; if(p<0.6) return 3; if(p<0.8) return 4; return 5;
}
/* Phân loại chính thức theo luật Keno (dùng cho trang Kết quả) */
function classifySize(nums){
  const bigCt = nums.filter(n=>n>=41).length;
  const smallCt = 20-bigCt;
  if(bigCt>=11) return 'Lớn';
  if(smallCt>=11) return 'Nhỏ';
  return 'Hòa Lớn-Nhỏ';
}
function classifyParity(evenCt){
  const oddCt = 20-evenCt;
  if(evenCt>=13) return 'Chẵn';
  if(evenCt===11||evenCt===12) return 'Chẵn 11-12';
  if(evenCt===10) return 'Hòa Chẵn-Lẻ';
  if(oddCt===11||oddCt===12) return 'Lẻ 11-12';
  return 'Lẻ';
}

const DRAW_INTERVAL = 8*60; // seconds
const now = new Date();
let periods = []; // most recent first
(function seedHistory(){
  let t = new Date(now);
  t.setSeconds(0,0);
  // round down to nearest 8-min boundary
  const mins = t.getMinutes();
  t.setMinutes(mins - (mins % 8));
  let seq = 900; // running sequence for the day, just for display
  for(let i=0;i<120;i++){
    const nums = pick20();
    const a = analyze(nums);
    const code = t.getFullYear().toString()+pad(t.getMonth()+1)+pad(t.getDate())+'-'+pad(seq-i,3);
    periods.push({code, date:new Date(t), nums, ...a});
    t = new Date(t.getTime() - DRAW_INTERVAL*1000);
  }
})();
let nextDrawAt = new Date(periods[0].date.getTime() + DRAW_INTERVAL*1000);

/* current in-progress period (chosen numbers by other "players", live) */
let currentPeriod = {
  code: (function(){const d=nextDrawAt;return d.getFullYear().toString()+pad(d.getMonth()+1)+pad(d.getDate())+'-'+pad(901,3);})(),
  liveCounts: (function(){const o={};for(let i=1;i<=80;i++)o[i]=Math.floor(Math.random()*140)+5;return o;})()
};

/* play types (cách chơi) */
const PLAY_TYPES = [
  {name:'Chọn 1 số – Bậc 1', base:26},
  {name:'Chọn 2 số – Bậc 2', base:19},
  {name:'Chọn 3 số – Bậc 3', base:14},
  {name:'Chọn 4 số – Bậc 4', base:11},
  {name:'Chọn 5 số – Bậc 5', base:9},
  {name:'Chọn 6 số – Bậc 6', base:7},
  {name:'Chọn 7 số – Bậc 7', base:5},
  {name:'Chọn 8 số – Bậc 8', base:3.5},
  {name:'Chọn 9 số – Bậc 9', base:2.5},
  {name:'Chọn 10 số – Bậc 10', base:2},
];
function playTypeStats(seedShift){
  // returns {name, pct, count} normalized to 100
  const raw = PLAY_TYPES.map(p=>Math.max(0.3, p.base + (Math.random()*0.6-0.3)*p.base + seedShift*0));
  const sum = raw.reduce((a,b)=>a+b,0);
  return PLAY_TYPES.map((p,i)=>({
    name:p.name,
    pct: Math.round(raw[i]/sum*1000)/10,
    count: Math.floor(raw[i]*37 + Math.random()*20)
  }));
}
