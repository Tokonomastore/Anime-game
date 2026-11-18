/* =====================================================================
   اللعب كضيف: جرّب الجزيرة 1 بدون حساب، ثم سجّل لتكمل
   + عدّاد الزيارات. يُحمَّل بعد extras.js
   ===================================================================== */

/* رسائل خطأ إضافية */
const _errAr2 = errAr;
errAr = function (e) {
  const m = ((e && e.message) || "").toLowerCase();
  if (m.includes("guest_limit")) return "سجّل حسابك لتكمل إلى الجزيرة 2";
  if (m.includes("not_guest")) return "حسابك مسجّل بالفعل";
  return _errAr2(e);
};

/* ===== عدّاد الزيارات: مرة واحدة لكل متصفح في اليوم ===== */
(function () {
  try {
    const td = new Date().toISOString().slice(0, 10);
    if (lsGet("toko_visit") !== td && READY) { lsSet("toko_visit", td); rpc("track_visit", {}, false).catch(() => {}); }
  } catch (e) {}
})();

/* ===== إنشاء حساب ضيف تلقائياً ===== */
const _rnd = (chars, n) => { const a = new Uint32Array(n); crypto.getRandomValues(a); return Array.from(a, v => chars[v % chars.length]).join(""); };
async function guestStart(btn) {
  const err = $("#err"); btn.disabled = true; if (err) err.textContent = "";
  try {
    const u = "guest_" + _rnd("abcdefghjkmnpqrstuvwxyz23456789", 6), p = _rnd("abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789", 20);
    const j = await http("/auth/v1/signup", { body: { email: EMAIL(u), password: p }, auth: false });
    if (!j.access_token) throw new Error("confirm_required");
    setSess(j);
    try { await rpc("create_guest", { p_username: u }); } catch (e) { clearSess(); throw e; }
    lsSet("toko_guest", true);
    flip(() => home());
  } catch (e) { if (err) err.textContent = errAr(e); btn.disabled = false; }
}

/* ===== الشاشة الأولى: زر التجربة بدون حساب ===== */
const _homeOut2 = homeOut;
homeOut = function (msg) {
  _homeOut2(msg);
  const tabs = document.querySelector(".tabs"); if (!tabs) return;
  tabs.insertAdjacentHTML("beforebegin",
    '<button class="btn go" id="gst">🎮 جرّب الآن بدون حساب</button>' +
    '<div class="small" style="margin:0 0 10px">تلعب الجزيرة 1 فوراً دون تسجيل، وتسجّل لاحقاً إن أعجبتك.</div>' +
    '<div class="small" style="margin:6px 0">أو لديك حساب؟</div>');
  $("#gst").onclick = e => guestStart(e.target);
};

/* ===== الصفحة الرئيسية للضيف ===== */
const _homeIn2 = homeIn;
homeIn = function (msg) {
  _homeIn2(msg);
  if (!(ME && ME.is_guest)) return;
  const pg = $("#page"); if (!pg) return;
  const done = C.pos >= 1;
  ["#me", "#shg"].forEach(s => { const x = $(s); if (x) x.remove(); });
  const w = pg.querySelector(".warn"); if (w) w.remove();
  const rb = pg.querySelector(".reward"); if (rb) rb.remove();
  pg.insertAdjacentHTML("afterbegin",
    '<div class="info" style="margin:8px 0">🎮 <b>أنت تلعب كضيف.</b> ' +
    (done ? 'أحسنت! أنهيت الجزيرة 1. سجّل حسابك الآن لتحفظ تقدمك وتكمل إلى الجزيرة 2 والجوائز.' : 'الجزيرة 1 مجانية بلا تسجيل. بعدها تسجّل حسابك لتكمل وتربح الجوائز.') +
    '<button class="btn go" id="upg" style="margin-top:8px">' + (done ? "🔓 سجّل لتكمل" : "💾 سجّل حسابك الآن") + '</button></div>');
  $("#upg").onclick = () => flip(() => upgradeScreen());
  const o = $("#out"); if (o) o.onclick = () => {
    if (!confirm("إن خرجت الآن ستفقد تقدمك كضيف. هل تريد الخروج؟")) return;
    clearSess(); ME = null; flip(() => homeOut());
  };
};

/* ===== بعد الجزيرة 1: الزر يقود للتسجيل ===== */
const _panelNext2 = panelNext;
panelNext = function (extra) {
  _panelNext2(extra);
  if (ME && ME.is_guest && C.pos >= 1) {
    const j = $("#jump"); if (j) { j.textContent = "🔓 سجّل حسابك لتكمل إلى الجزيرة " + (C.pos + 1); j.onclick = () => flip(() => upgradeScreen()); }
  }
};
const _startIsland2 = startIsland;
startIsland = function () {
  if (ME && ME.is_guest && C.pos >= 1) return flip(() => upgradeScreen());
  return _startIsland2();
};

/* ===== شاشة التسجيل (تحويل الضيف إلى حساب دائم) ===== */
function upgradeScreen(msg) {
  show(SIGIL + '<h2>💾 سجّل حسابك</h2><p class="sub">اختر اسماً وكلمة مرور ليبقى تقدمك محفوظاً على أي هاتف، وتكمل إلى الجزيرة 2 وما بعدها.</p>' +
    '<input id="u" placeholder="اسم اللاعب (English / أرقام / _)" autocomplete="username" autocapitalize="none" maxlength="16">' +
    '<input id="p" type="password" placeholder="كلمة المرور (6 أحرف على الأقل)" autocomplete="new-password">' +
    '<div class="small" style="margin:8px 0 0;text-align:right">🔑 سؤال سرّي لاستعادة حسابك إن نسيت كلمة المرور:</div>' +
    '<select id="rq">' + rqOptions() + '</select>' +
    '<input id="ra" placeholder="إجابتك السرية" maxlength="60" style="direction:rtl;text-align:right">' +
    '<div class="err" id="err">' + esc(msg || "") + '</div>' +
    '<button class="btn go" id="sub">إنشاء الحساب وحفظ تقدمي</button><button class="btn alt" id="bk">رجوع</button>' +
    '<div class="small">اسمك سيظهر في الترتيب. اختر إجابة سرية لا يعرفها غيرك، ولا تستعمل كلمة مرور من حساباتك الأخرى.</div>');
  $("#bk").onclick = () => flip(() => home());
  $("#sub").onclick = async () => {
    const u = $("#u").value.trim(), p = $("#p").value, ra = $("#ra").value.trim(), err = $("#err"), b = $("#sub");
    if (!/^[A-Za-z0-9_]{3,16}$/.test(u)) { err.textContent = errAr(new Error("bad_username")); return; }
    if (/^guest_/i.test(u)) { err.textContent = "اختر اسماً آخر لا يبدأ بـ guest_"; return; }
    if (p.length < 6) { err.textContent = errAr(new Error("weak_password")); return; }
    if (ra.replace(/\s/g, "").length < 3) { err.textContent = "اكتب إجابة سرية (3 أحرف على الأقل)"; return; }
    b.disabled = true; err.textContent = "";
    try {
      await rpc("upgrade_guest", { p_username: u, p_password: p, p_q: +$("#rq").value, p_answer: ra });
      lsSet("toko_guest", null);
      try { setSess(await http("/auth/v1/token?grant_type=password", { body: { email: EMAIL(u), password: p }, auth: false })); } catch (e) {}
      flip(() => home("✅ تم إنشاء حسابك وحفظ تقدمك. أكمل رحلتك!"));
    } catch (e) { err.textContent = errAr(e); b.disabled = false; }
  };
}

home();
