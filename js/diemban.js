/* =========================================================
   TRANG "ĐIỂM BÁN" — tìm điểm bán gần bạn
   ========================================================= */
const OUTLETS = [
  {city:'hcm', name:'Đại lý Keno Quận 1', addr:'12 Nguyễn Huệ, Q.1, TP.HCM', ic:'🏬'},
  {city:'hcm', name:'Điểm bán Keno Bình Thạnh', addr:'88 Xô Viết Nghệ Tĩnh, Bình Thạnh, TP.HCM', ic:'🏪'},
  {city:'hn', name:'Đại lý Keno Hoàn Kiếm', addr:'25 Tràng Tiền, Hoàn Kiếm, Hà Nội', ic:'🏬'},
  {city:'hn', name:'Điểm bán Keno Cầu Giấy', addr:'170 Cầu Giấy, Hà Nội', ic:'🏪'},
  {city:'dn', name:'Đại lý Keno Hải Châu', addr:'45 Trần Phú, Hải Châu, Đà Nẵng', ic:'🏬'},
  {city:'ct', name:'Điểm bán Keno Ninh Kiều', addr:'9 Hòa Bình, Ninh Kiều, Cần Thơ', ic:'🏪'},
];
let outletDistances = {};
function useMyLocation(){
  OUTLETS.forEach((o,i)=>{outletDistances[i]=(0.4+Math.random()*4.2).toFixed(1);});
  document.getElementById('citySelect').value='all';
  renderOutlets(true);
  toast('Đã xác định vị trí gần đúng của bạn (demo).');
}
function renderOutlets(sortByDist){
  const city = document.getElementById('citySelect').value;
  let list = OUTLETS.map((o,i)=>({...o, idx:i}));
  if(city!=='all') list = list.filter(o=>o.city===city);
  if(sortByDist) list.sort((a,b)=>(outletDistances[a.idx]||99)-(outletDistances[b.idx]||99));
  document.getElementById('outletList').innerHTML = list.map(o=>`
    <div class="outlet">
      <div class="outlet-ic">${o.ic}</div>
      <div>
        <div class="outlet-name">${o.name}</div>
        <div class="outlet-addr">${o.addr}</div>
        ${outletDistances[o.idx]!==undefined ? `<div class="outlet-dist">📍 cách bạn ~${outletDistances[o.idx]} km</div>`:''}
      </div>
    </div>`).join('') || '<p class="muted" style="font-size:12.5px">Chưa có điểm bán phù hợp.</p>';
}
