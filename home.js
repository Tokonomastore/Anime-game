/* =====================================================================
   صفحة رئيسية جديدة: مشهد متحرك · زر "العب الآن" كبير · جوائز · شرح سريع
   يُحمَّل بعد look.js
   ===================================================================== */
(function () {
  const st = document.createElement("style");
  st.textContent = `
.hero2{position:relative;margin:-4px -4px 8px;border:3px solid var(--ink);border-radius:22px;overflow:hidden;box-shadow:0 5px 0 var(--ink);background:#7fe0ff}
.hero2 svg{display:block;width:100%;height:auto}
.hero2 .ttl{position:absolute;left:0;right:0;bottom:8px;text-align:center}
.hero2 h1{margin:0;font-size:2.2rem;color:#fff;-webkit-text-stroke:0;text-shadow:0 3px 0 #1f2a44,0 0 0 #1f2a44,2px 0 0 #1f2a44,-2px 0 0 #1f2a44,0 -2px 0 #1f2a44}
.tagl{text-align:center;font-weight:700;font-size:1.02rem;margin:10px 0 4px;color:var(--ink)}
.tagl b{color:#ff5a4f}
.big-cta{font-size:1.35rem!important;padding:16px!important;margin-top:10px}
.hint2{text-align:center;font-size:.82rem;color:var(--gray);margin:8px 0 4px}
.prz{display:flex;gap:10px;margin:14px 0 6px}
.prz>div{flex:1;border:3px solid var(--ink);border-radius:18px;padding:10px 8px;text-align:center;box-shadow:0 4px 0 var(--ink);font-weight:700;font-size:.92rem;line-height:1.5}
.prz .p1{background:#e4f7ff}.prz .p2{background:#fff0b8}
.prz span{display:block;font-size:1.9rem;line-height:1.2}
.stp{display:flex;gap:8px;margin:14px 0 4px}
.stp>div{flex:1;text-align:center;font-size:.8rem;line-height:1.5;font-weight:500}
.stp i{display:flex;align-items:center;justify-content:center;width:46px;height:46px;margin:0 auto 4px;border:3px solid var(--ink);border-radius:50%;font-style:normal;font-size:1.4rem;background:#fff;box-shadow:0 3px 0 var(--ink)}
.sech{font-family:'Baloo Bhaijaan 2',sans-serif;font-weight:800;text-align:center;margin:16px 0 0;font-size:1.1rem}
.live2{text-align:center;font-weight:700;font-size:.88rem;margin:12px 0 0;color:var(--gray)}
.live2 .dot{display:inline-block;width:10px;height:10px;border-radius:50%;background:#1fb866;margin-inline-end:6px;animation:pulse 1.4s infinite}
.authbox{border:3px dashed var(--line);border-radius:18px;padding:6px 12px 12px;margin-top:14px}
.prog{display:flex;gap:4px;margin:10px 0 2px;direction:rtl}
.prog i{flex:1;height:14px;border-radius:7px;border:2px solid var(--ink);background:var(--line)}
.prog i.d{background:#1fb866}.prog i.c{background:#ffc83d;animation:pulse 1.2s infinite}.prog i.h{border-color:#ff5a4f}
.prog i.h.d{background:#ff7a45}
.plabel{text-align:center;font-weight:700;margin:2px 0 4px}
`;
  document.head.appendChild(st);
})();

let authOpen = false;

function sceneSVG(pos) {
  const isl = (x, y, i, sc) => '<g transform="translate(' + x + ' ' + y + ') scale(' + sc + ') translate(' + (-x) + ' ' + (-y) + ')">' + _island({ x, y }, i, pos) + '</g>';
  return '<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg"><defs>' +
    '<linearGradient id="hs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5cc8ff"/><stop offset=".55" stop-color="#bff0ff"/><stop offset=".56" stop-color="#3db4f5"/><stop offset="1" stop-color="#1d8fe0"/></linearGradient>' +
    '<radialGradient id="hg" cx="82%" cy="30%" r="50%"><stop offset="0" stop-color="#ff7a45" stop-opacity=".85"/><stop offset="1" stop-color="#ff7a45" stop-opacity="0"/></radialGradient></defs>' +
    '<rect width="360" height="190" fill="url(#hs)"/><rect width="360" height="190" fill="url(#hg)"/>' +
    '<circle cx="60" cy="34" r="16" fill="#ffe27a" stroke="#fff" stroke-width="3" stroke-opacity=".6"/>' +
    '<g class="cl" style="animation-delay:-8s"><ellipse cx="0" cy="40" rx="26" ry="8" fill="#fff"/><ellipse cx="16" cy="35" rx="16" ry="7" fill="#fff"/></g>' +
    '<g class="cl" style="animation-delay:-30s"><ellipse cx="0" cy="22" rx="20" ry="6" fill="#fff"/><ellipse cx="-12" cy="18" rx="12" ry="5" fill="#fff"/></g>' +
    [[20, 150], [150, 172], [250, 160], [320, 178], [90, 180]].map((w, i) => '<path class="wv" style="animation-delay:-' + (i * 0.7).toFixed(1) + 's" d="M' + w[0] + ' ' + w[1] + ' q6 -7 12 0 t12 0" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="2.4" stroke-linecap="round"/>').join("") +
    '<path d="M70 118 Q120 80 175 108 T290 60" fill="none" stroke="#fff" stroke-width="3.2" stroke-dasharray="1 8" stroke-linecap="round"/>' +
    isl(56, 124, 1, .8) + isl(168, 112, 2, .72) + isl(298, 66, 10, .86) +
    '<g transform="translate(56 114)"><g id="hero0">' + HERO2 + '</g></g></svg>';
}

function steps3() {
  return '<div class="sech">كيف تلعب؟</div><div class="stp">' +
    '<div><i>⏳</i>أجب عن الأسئلة قبل انتهاء الوقت</div>' +
    '<div><i>🌊</i>الخطأ يكلّفك وقتاً، وانتهاؤه يغرقك</div>' +
    '<div><i>🔥</i>اجتز الجحيم ثم اقطف الكنز</div></div>';
}

function homeOut(msg) {
  const reg = tab === "reg";
  if (msg) authOpen = true;
  show('<div class="hero2">' + sceneSVG(0) + '<div class="ttl"><h1>خريطة الكنز</h1></div></div>' +
    '<div class="tagl"><b>10 جزر</b> · <b>150 سؤال</b> أنمي · ومجسّم في النهاية</div>' +
    '<button class="btn go big-cta" id="gst">🎮 العب الآن بدون تسجيل</button>' +
    '<div class="hint2">الجزيرة 1 مجانية وتأخذ دقيقتين فقط</div>' +
    '<div class="prz"><div class="p1"><span>🎁</span>الجزيرة 5<br>خصم 10% على طلبك</div><div class="p2"><span>🏆</span>الجزيرة 10<br>مجسّم أنمي مجاني</div></div>' +
    steps3() + '<div id="live2"></div>' +
    (authOpen
      ? '<div class="authbox"><div class="tabs"><button id="tl" class="' + (!reg ? "on" : "") + '">دخول</button><button id="tr" class="' + (reg ? "on" : "") + '">حساب جديد</button></div>' +
        '<input id="u" placeholder="اسم اللاعب (English / أرقام / _)" autocomplete="username" autocapitalize="none" maxlength="16">' +
        '<input id="p" type="password" placeholder="كلمة المرور (6 أحرف على الأقل)" autocomplete="' + (reg ? "new-password" : "current-password") + '">' +
        (reg ? '<div class="small" style="margin:8px 0 0;text-align:right">🔑 سؤال سرّي لاستعادة حسابك إن نسيت كلمة المرور:</div><select id="rq">' + rqOptions() + '</select>' +
               '<input id="ra" placeholder="إجابتك السرية" maxlength="60" style="direction:rtl;text-align:right">' : '') +
        '<div class="err" id="err">' + esc(msg || "") + '</div>' +
        '<button class="btn" id="sub">' + (reg ? "إنشاء الحساب وفتح الخريطة" : "دخول") + '</button>' +
        (!reg ? '<button class="lnk" id="forgot">نسيت كلمة المرور؟</button>' : '') + '</div>'
      : '<div class="err" id="err"></div><button class="btn alt" id="hv">لدي حساب · تسجيل الدخول</button>') +
    '<div class="row"><button class="btn alt" id="lb">🏆 الترتيب</button><button class="btn alt" id="shg">📣 شارك</button></div>' +
    '<a class="btn alt" href="https://tokonomastore.com" target="_blank" rel="noopener">🛍 متجر توكونوما</a>');
  $("#gst").onclick = e => guestStart(e.target);
  $("#lb").onclick = () => flip(() => leaderboard());
  $("#shg").onclick = e => shareText(SHARE_GAME, e.target);
  const hv = $("#hv"); if (hv) hv.onclick = () => { authOpen = true; tab = "login"; homeOut(); };
  if (authOpen) {
    $("#tl").onclick = () => { tab = "login"; homeOut(); };
    $("#tr").onclick = () => { tab = "reg"; homeOut(); };
    $("#sub").onclick = submitAuth;
    const f = $("#forgot"); if (f) f.onclick = () => flip(() => recoverScreen());
    $("#p").addEventListener("keydown", e => { if (e.key === "Enter" && !reg) submitAuth(); });
  }
  if (typeof decorateHome === "function") {
    decorateHome();
    const nw = $("#news"), h2 = document.querySelector(".stp");
    if (nw && h2) h2.after(nw);
  }
  rpc("public_pulse", {}, false).then(d => {
    const b = $("#live2"); if (!b) return;
    const top = d.top && d.top[0];
    let h = "";
    if (d.active > 0) h += '<span class="dot"></span>' + d.active + (d.active === 1 ? " لاعب يلعب الآن" : " لاعبين يلعبون الآن");
    if (top && top.island >= 2) h += (h ? " · " : "") + "🏅 الأول هذا الأسبوع: " + esc(top.username) + " (الجزيرة " + top.island + ")";
    if (h) b.innerHTML = '<div class="live2">' + h + '</div>';
  }).catch(() => {});
}

/* ===== بعد الدخول: تقدّم واضح وزر المتابعة في الأعلى ===== */
const _homeIn3 = homeIn;
homeIn = function (msg) {
  _homeIn3(msg);
  const pg = $("#page"); if (!pg || !ME) return;
  const rb = pg.querySelector(".reward"); if (rb) rb.remove();
  const sg = pg.querySelector(".sigil"); if (sg) sg.remove();
  const pos = C.pos, bp = C.best_pos;
  let strip = ""; for (let i = 1; i <= 10; i++) strip += '<i class="' + (i >= 6 ? "h " : "") + (i <= pos ? "d" : (i === pos + 1 ? "c" : "")) + '"></i>';
  const h2 = pg.querySelector("h2");
  const go = $("#go");
  if (h2) {
    h2.insertAdjacentHTML("afterend", '<div class="plabel">' + (pos === 0 ? "رحلتك لم تبدأ بعد" : "أنت عند الجزيرة " + pos + " من 10") + '</div><div class="prog">' + strip + '</div>');
    if (go) { go.textContent = pos === 0 ? "🗺 ابدأ الرحلة" : "🗺 تابع الرحلة"; go.classList.add("big-cta"); const pr = pg.querySelector(".prog"); pr.after(go); }
    const nw = $("#news"), stt = pg.querySelector(".stats"); if (nw && stt) stt.after(nw);
  }
};

home();
