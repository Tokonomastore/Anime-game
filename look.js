/* =====================================================================
   مظهر جديد: لعبة جوّال كرتونية (ألوان مشرقة · أزرار ثلاثية الأبعاد · خريطة مرسومة)
   يُحمَّل في آخر الملفات ولا يغيّر منطق اللعبة
   ===================================================================== */
(function () {
  const lk = document.createElement("link"); lk.rel = "stylesheet";
  lk.href = "https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;700;800&display=swap";
  document.head.appendChild(lk);
  const st = document.createElement("style");
  st.textContent = `
:root{--ink:#1f2a44;--gray:#5d6b88;--red:#ff5a4f;--green:#1fb866;--gold:#ffc83d;--line:#d3e2f6;--opt:#f1f7ff;--page:#fff;--page2:#fff;--cover:transparent}
body{background:linear-gradient(180deg,#4fb8ff 0,#8fdcff 45%,#d9f6ff 75%,#ffe9a8 100%) fixed;font-family:'Baloo Bhaijaan 2','Tajawal',system-ui,sans-serif;color:var(--ink)}
.brand{color:#fff;font-weight:700;letter-spacing:.25em;text-shadow:0 2px 0 #1f2a4460}
.book{background:none;box-shadow:none;padding:0;border-radius:0;perspective:none}
.book::before{display:none}
#page{background:#fff;border:4px solid var(--ink);border-radius:28px;box-shadow:0 8px 0 var(--ink),0 22px 34px #0a2a5a40;padding:20px 16px 22px;min-height:440px;transform-origin:center}
#page.hell{--ink:#f6e8ff;--gray:#cdb0e8;--line:#4a2a63;--opt:#3a1a52;--red:#ff7a45;--green:#ffb02e;background:linear-gradient(180deg,#2a0f3d,#4a1740);border-color:#12061a;box-shadow:0 8px 0 #12061a,0 0 40px #ff5a2a55,0 22px 34px #0008}
#page.out{transform:scale(.9) translateY(14px);opacity:0;transition:transform .32s ease,opacity .32s ease}
#page.in{animation:popIn .5s cubic-bezier(.2,1.4,.4,1)}
@keyframes popIn{from{transform:scale(.88) translateY(18px);opacity:0}to{transform:none;opacity:1}}
h1,h2{font-family:'Baloo Bhaijaan 2','Amiri',serif;font-weight:800;color:var(--ink);text-shadow:0 3px 0 #0001}
h1{font-size:2.3rem;line-height:1.2}h2{font-size:1.65rem}
.sub{font-weight:500;color:var(--gray);font-size:.95rem}
.sigil{filter:drop-shadow(0 6px 0 #0002)}
.reward,.info{background:#fff6d6;border:3px solid var(--ink);border-radius:18px;color:#1f2a44;box-shadow:0 4px 0 var(--ink)}
.reward b,.info b{color:#e0402f}
.reward small{color:#5d6b88}
.info.hellbox{background:#3a1a52;border-color:#12061a;color:#f6e8ff;box-shadow:0 4px 0 #12061a}
.info.hellbox b{color:#ffb02e}
.btn{border-radius:18px;border:3px solid var(--ink);background:#4dabf7;color:#fff;font-family:'Baloo Bhaijaan 2','Tajawal',sans-serif;font-weight:800;font-size:1.08rem;padding:12px;box-shadow:0 6px 0 var(--ink);transition:transform .08s,box-shadow .08s;text-shadow:0 2px 0 #0003;margin-top:12px}
.btn:active{transform:translateY(5px);box-shadow:0 1px 0 var(--ink)}
.btn.alt{background:#fff;color:var(--ink);text-shadow:none}
#page.hell .btn.alt{background:#3a1a52;color:#f6e8ff;border-color:#12061a;box-shadow:0 6px 0 #12061a}
.btn.go{background:linear-gradient(180deg,#ff8a4c,#ff5a4f);border-color:var(--ink)}
.btn.go::after{background:linear-gradient(100deg,#0000,#fff6,#0000)}
input,select{border:3px solid var(--ink);border-radius:16px;background:#fff;font-weight:500}
input:focus{border-color:#4dabf7}
.tabs button{border:3px solid var(--ink);border-radius:16px;font-family:inherit;font-weight:700;color:var(--gray);background:#fff;box-shadow:0 4px 0 var(--ink)}
.tabs button.on{background:#ffc83d;color:var(--ink)}
.stats b{font-family:'Baloo Bhaijaan 2',sans-serif;color:#ff5a4f}
.top{font-weight:700}
.lvl{font-family:'Baloo Bhaijaan 2',sans-serif;font-weight:800;font-size:1.15rem}
.dots{gap:4px}
.dots i{height:10px;border-radius:6px;background:var(--line);border:2px solid var(--ink)}
.dots i.done{background:#1fb866}.dots i.cur{background:#ffc83d;animation:pulse 1.2s infinite}
.bar{height:20px;border:3px solid var(--ink);border-radius:12px;background:#fff;margin:6px 0 16px;padding:0}
.bar b{background:linear-gradient(180deg,#5eea9a,#1fb866);border-radius:8px}
.bar.low b{background:linear-gradient(180deg,#ff8a7a,#ff3d3d)}
.tag{font-weight:800;border:3px solid var(--ink);color:var(--ink);background:#ffd1d1;padding:2px 12px}
.tag.gold{background:#ffe27a;color:var(--ink);border-color:var(--ink)}
#page.hell .tag{background:#ff7a45;color:#2a0f3d;border-color:#12061a}
#page.hell .tag.gold{background:#ffd27a;color:#2a0f3d}
.q{font-family:'Baloo Bhaijaan 2','Tajawal',sans-serif;font-weight:700;font-size:1.32rem;line-height:1.7;text-align:center;background:#eaf5ff;border:3px solid var(--ink);border-radius:20px;padding:14px 12px;margin:6px 0 14px;box-shadow:0 4px 0 var(--ink)}
#page.hell .q{background:#3a1a52;border-color:#12061a;box-shadow:0 4px 0 #12061a}
.opt{border:3px solid var(--ink);border-radius:18px;font-family:'Baloo Bhaijaan 2','Tajawal',sans-serif;font-weight:700;font-size:1.08rem;text-align:center;color:#fff;text-shadow:0 2px 0 #0003;padding:13px 14px;margin:10px 0;box-shadow:0 6px 0 var(--ink);transition:transform .08s,box-shadow .08s,background .2s}
#opts .opt:nth-child(4n+1){background:#ff6b6b}
#opts .opt:nth-child(4n+2){background:#4dabf7}
#opts .opt:nth-child(4n+3){background:#f5b800;color:#1f2a44;text-shadow:none}
#opts .opt:nth-child(4n+4){background:#9b6bff}
#page.hell .opt{border-color:#12061a;box-shadow:0 6px 0 #12061a}
.opt:active{transform:translateY(5px);filter:none;box-shadow:0 1px 0 var(--ink)}
.opt.ok{background:#1fb866!important;color:#fff!important;border-color:var(--ink);animation:pop .35s}
.opt.dead{opacity:.35;filter:grayscale(1);text-decoration:line-through}
.msg{font-weight:700}
.lb td{border-top:2px dashed var(--line)}
.rw{border-top:2px dashed var(--line)}
.code{border:3px dashed var(--red);border-radius:14px;background:#fff}
#map{border:4px solid var(--ink);border-radius:22px;box-shadow:0 6px 0 var(--ink)}
.small{font-weight:500}
footer{color:#1f2a44aa}
footer a{color:#1f2a44}
#snd{border:3px solid var(--ink);background:#fff;color:var(--ink);box-shadow:0 3px 0 var(--ink)}
.chip,.pc{border-width:3px}
#gst{margin-bottom:12px}
`;
  document.head.appendChild(st);
})();

/* ===== خريطة مرسومة ===== */
const HERO2 = '<ellipse class="ring" cx="0" cy="2" rx="15" ry="5" fill="none" stroke="#ffc83d" stroke-width="2"/>' +
  '<g class="bob"><ellipse cx="0" cy="2" rx="12" ry="3.6" fill="#0003"/>' +
  '<rect x="-6" y="-9" width="4.6" height="10" rx="2" fill="#2a3b6a" stroke="#1f2a44" stroke-width="1.6"/><rect x="1.4" y="-9" width="4.6" height="10" rx="2" fill="#2a3b6a" stroke="#1f2a44" stroke-width="1.6"/>' +
  '<path d="M-8 -20 L-14 -11 M8 -20 L14 -11" stroke="#1f2a44" stroke-width="4.6" stroke-linecap="round"/><path d="M-8 -20 L-14 -11 M8 -20 L14 -11" stroke="#f6c9a0" stroke-width="2.4" stroke-linecap="round"/>' +
  '<rect x="-8.5" y="-24" width="17" height="17" rx="5" fill="#2fc26b" stroke="#1f2a44" stroke-width="1.8"/>' +
  '<path d="M-8 -20 h16" stroke="#ffc83d" stroke-width="3"/>' +
  '<circle cx="0" cy="-33" r="11" fill="#f9d2aa" stroke="#1f2a44" stroke-width="1.8"/>' +
  '<path d="M-12 -35 Q0 -52 12 -35 Z" fill="#ff4d43" stroke="#1f2a44" stroke-width="1.8" stroke-linejoin="round"/><rect x="-14" y="-37" width="28" height="4" rx="2" fill="#d63a31" stroke="#1f2a44" stroke-width="1.4"/>' +
  '<circle cx="-4" cy="-31" r="3" fill="#fff" stroke="#1f2a44" stroke-width="1"/><circle cx="4" cy="-31" r="3" fill="#fff" stroke="#1f2a44" stroke-width="1"/><circle cx="-3.4" cy="-30.6" r="1.4" fill="#1f2a44"/><circle cx="4.6" cy="-30.6" r="1.4" fill="#1f2a44"/>' +
  '<path d="M-3 -26 q3 3 6 0" fill="none" stroke="#1f2a44" stroke-width="1.4" stroke-linecap="round"/></g>';

function _island(p, i, mark) {
  const x = p.x, y = p.y, hell = i >= 6, reached = i <= mark;
  let s = '<g>';
  if (hell) s += '<ellipse class="pulse" cx="' + x + '" cy="' + (y + 2) + '" rx="46" ry="28" fill="#ff7a45" fill-opacity=".22" stroke="#ff7a45" stroke-width="2"/>';
  s += '<ellipse cx="' + x + '" cy="' + (y + 20) + '" rx="40" ry="11" fill="' + (hell ? "#12061a" : "#0b5fa5") + '" opacity=".28"/>' +
       '<path d="M' + (x - 36) + ' ' + y + ' q0 22 36 22 q36 0 36 -22 z" fill="' + (hell ? "#3a1a2e" : "#c98a4b") + '" stroke="#1f2a44" stroke-width="3" stroke-linejoin="round"/>' +
       '<ellipse cx="' + x + '" cy="' + y + '" rx="36" ry="21" fill="' + (hell ? "#5a2a3a" : "#ffe08a") + '" stroke="#1f2a44" stroke-width="3"/>' +
       '<ellipse cx="' + x + '" cy="' + (y - 2) + '" rx="27" ry="14" fill="' + (hell ? "#7a2f35" : (reached ? "#34c759" : "#5fd068")) + '"/>';
  if (hell) {
    s += '<path d="M' + (x - 22) + ' ' + (y + 2) + ' l8 -4 l6 5 l8 -6" fill="none" stroke="#ff7a45" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
         '<path d="M' + (x + 8) + ' ' + (y - 4) + ' L' + (x + 17) + ' ' + (y - 20) + ' L' + (x + 26) + ' ' + (y - 4) + ' Z" fill="#2b1036" stroke="#1f1228" stroke-width="2.4" stroke-linejoin="round"/>' +
         '<path d="M' + (x + 14) + ' ' + (y - 17) + ' L' + (x + 17) + ' ' + (y - 21) + ' L' + (x + 20) + ' ' + (y - 17) + ' Z" fill="#ff9a3d"/>' +
         '<circle class="ember" style="animation-delay:-' + ((i * 0.6) % 3).toFixed(1) + 's" cx="' + (x + 17) + '" cy="' + (y - 24) + '" r="2.4" fill="#ffd27a"/>';
  } else {
    s += '<path d="M' + (x - 15) + ' ' + (y - 2) + ' q-3 -12 3 -22" fill="none" stroke="#8a5a2b" stroke-width="3.2" stroke-linecap="round"/>' +
         '<g fill="#1fa34a" stroke="#1f2a44" stroke-width="1.6"><ellipse cx="' + (x - 22) + '" cy="' + (y - 25) + '" rx="9" ry="3.6" transform="rotate(-25 ' + (x - 22) + ' ' + (y - 25) + ')"/>' +
         '<ellipse cx="' + (x - 6) + '" cy="' + (y - 26) + '" rx="9" ry="3.6" transform="rotate(25 ' + (x - 6) + ' ' + (y - 26) + ')"/>' +
         '<ellipse cx="' + (x - 14) + '" cy="' + (y - 29) + '" rx="3.6" ry="8"/></g>';
  }
  s += '<circle cx="' + x + '" cy="' + (y + 14) + '" r="11" fill="#fff" stroke="#1f2a44" stroke-width="2.6"/>' +
       '<text x="' + x + '" y="' + (y + 19.5) + '" font-size="15" font-weight="800" fill="#1f2a44" text-anchor="middle" font-family="Baloo Bhaijaan 2,Tajawal,sans-serif">' + i + '</text>';
  if (i === 2 || i === 4 || i === 7) s += '<path d="M' + (x + 25) + ' ' + (y - 4) + ' v-28" stroke="#1f2a44" stroke-width="2.6" stroke-linecap="round"/><path d="M' + (x + 26) + ' ' + (y - 32) + ' l16 6 l-16 6 z" fill="' + (reached ? "#ffc83d" : "#ff4d43") + '" stroke="#1f2a44" stroke-width="2" stroke-linejoin="round"/>';
  if (i === 5) s += '<text x="' + (x + 20) + '" y="' + (y - 12) + '" font-size="19">🎟</text>';
  if (i === 10) s += '<circle cx="' + x + '" cy="' + (y - 32) + '" r="16" fill="#ffc83d" fill-opacity=".45"/><text x="' + x + '" y="' + (y - 26) + '" font-size="30" text-anchor="middle">🏆</text>';
  if (reached && i < 10) s += '<text x="' + (x - 32) + '" y="' + (y - 12) + '" font-size="15">⭐</text>';
  return s + '</g>';
}

mapSVG = function (mark) {
  let s = '<svg id="map" viewBox="0 0 360 596" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#1a0a2e"/><stop offset=".33" stop-color="#4a1740"/><stop offset=".445" stop-color="#ff7a45"/><stop offset=".462" stop-color="#7fe0ff"/><stop offset=".7" stop-color="#3db4f5"/><stop offset="1" stop-color="#1d8fe0"/></linearGradient>' +
    '<clipPath id="mc"><rect width="360" height="596" rx="18"/></clipPath></defs>' +
    '<g clip-path="url(#mc)"><rect width="360" height="596" fill="url(#sea)"/>';
  [[30,520],[300,540],[40,430],[310,470],[150,420],[20,340],[190,300],[320,390],[150,566],[250,330]].forEach(w =>
    s += '<path class="wv" style="animation-delay:-' + ((w[0] * 7 + w[1]) % 30 / 10).toFixed(1) + 's" d="M' + w[0] + ' ' + w[1] + ' q6 -7 12 0 t12 0 t12 0" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="2.4" stroke-linecap="round"/>');
  s += '<g class="cl" style="animation-delay:-14s"><ellipse cx="0" cy="520" rx="34" ry="11" fill="#fff"/><ellipse cx="22" cy="512" rx="22" ry="10" fill="#fff"/><ellipse cx="-20" cy="513" rx="18" ry="9" fill="#fff"/></g>' +
       '<g class="cl" style="animation-delay:-34s"><ellipse cx="0" cy="378" rx="28" ry="9" fill="#fff"/><ellipse cx="-18" cy="372" rx="18" ry="8" fill="#fff"/></g>';
  [[30,60],[310,100],[60,150],[320,200],[150,30],[200,120],[30,230],[170,200],[290,40],[120,250],[250,180],[80,90]].forEach((w, i) =>
    s += '<circle class="ember" style="animation-delay:-' + (i * 0.37).toFixed(2) + 's" cx="' + w[0] + '" cy="' + w[1] + '" r="' + (i % 3 ? 2.2 : 3) + '" fill="#ff9a3d"/>');
  s += '<text x="62" y="246" font-size="12.5" font-weight="800" fill="#fff" stroke="#1a0a2e" stroke-width="3.4" paint-order="stroke" text-anchor="middle" font-family="Baloo Bhaijaan 2,Tajawal,sans-serif">🔥 منطقة الجحيم 🔥</text>';
  for (let i = 1; i <= 10; i++) {
    const a = POS[i - 1], b = POS[i], done = i <= mark, hell = i >= 6;
    const d = 'M' + a.x + ' ' + (a.y - 4) + ' Q' + ((a.x + b.x) / 2) + ' ' + (((a.y + b.y) / 2) - 18) + ' ' + b.x + ' ' + (b.y - 4);
    if (done) s += '<path d="' + d + '" fill="none" stroke="#1f2a44" stroke-width="9" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="#c98a4b" stroke-width="6" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="#7a4a1f" stroke-width="6" stroke-dasharray="2 6"/>';
    else s += '<path d="' + d + '" fill="none" stroke="' + (hell ? "#ffb27a" : "#fff") + '" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="1 8" stroke-opacity=".95"/>';
  }
  s += '<ellipse cx="180" cy="568" rx="92" ry="26" fill="#0b5fa5" opacity=".25"/><ellipse cx="180" cy="560" rx="82" ry="24" fill="#ffe08a" stroke="#1f2a44" stroke-width="3"/><ellipse cx="180" cy="557" rx="60" ry="15" fill="#fff0b8"/>' +
       '<path d="M130 566 q8 -8 20 -2 l-2 8 h-20z" fill="#c98a4b" stroke="#1f2a44" stroke-width="2.2" stroke-linejoin="round"/><path d="M142 564 v-14 l9 8z" fill="#fff" stroke="#1f2a44" stroke-width="1.8" stroke-linejoin="round"/>' +
       '<text x="180" y="584" font-size="13" font-weight="800" fill="#fff" stroke="#1f2a44" stroke-width="3.2" paint-order="stroke" text-anchor="middle" font-family="Baloo Bhaijaan 2,Tajawal,sans-serif">🏖 الشاطئ</text>';
  for (let i = 1; i <= 10; i++) s += _island(POS[i], i, mark);
  s += '</g><g id="fx"></g><g id="hero">' + HERO2 + '</g></svg>';
  return s;
};

/* ===== شعار كرتوني بدل البوصلة القديمة ===== */
const EMBLEM = '<svg class="sigil" viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">' +
  '<ellipse cx="50" cy="80" rx="34" ry="7" fill="#0b5fa5" opacity=".25"/>' +
  '<rect x="16" y="38" width="68" height="38" rx="8" fill="#c98a4b" stroke="#1f2a44" stroke-width="4"/>' +
  '<path d="M16 46 Q16 18 50 18 Q84 18 84 46 Z" fill="#e0a35e" stroke="#1f2a44" stroke-width="4" stroke-linejoin="round"/>' +
  '<rect x="16" y="44" width="68" height="9" fill="#ffc83d" stroke="#1f2a44" stroke-width="3"/>' +
  '<rect x="42" y="42" width="16" height="20" rx="4" fill="#ffc83d" stroke="#1f2a44" stroke-width="3.5"/><circle cx="50" cy="52" r="3" fill="#1f2a44"/>' +
  '<g fill="#fff6a8" stroke="#1f2a44" stroke-width="1.4"><path d="M14 22 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3z"/><path d="M84 14 l2.4 4.8 4.8 2.4 -4.8 2.4 -2.4 4.8 -2.4 -4.8 -4.8 -2.4 4.8 -2.4z"/></g></svg>';
const _show3 = show;
show = function (html, hell) {
  _show3(html, hell);
  const sg = document.querySelector("#page .sigil");
  if (sg && sg.getAttribute("viewBox") === "0 0 100 100") sg.outerHTML = EMBLEM;
};

home();
