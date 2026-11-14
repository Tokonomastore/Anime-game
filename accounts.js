/* =====================================================================
   الحسابات: سؤال الاستعادة · ملف اللاعب · الشارات · الترتيب الدائم
   ملف إضافي يُحمَّل بعد الملف الرئيسي ويستبدل بعض الشاشات
   ===================================================================== */
(function () {
  const st = document.createElement("style");
  st.textContent =
    "select{width:100%;padding:12px 13px;margin:5px 0;font:inherit;font-size:.95rem;border:1.5px solid var(--line);border-radius:10px;background:#fff;color:#2b2b2b}" +
    ".grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0}" +
    ".cell{background:var(--opt);border:1px solid var(--line);border-radius:10px;padding:8px 4px;text-align:center;font-size:.74rem;color:var(--gray);line-height:1.4}" +
    ".cell b{display:block;font-size:1.2rem;color:var(--red);font-family:ui-monospace,Menlo,monospace;direction:ltr}" +
    ".bd{display:flex;gap:12px;align-items:center;padding:8px 0;border-top:1px dashed var(--line)}" +
    ".bd .e{font-size:1.7rem;width:38px;text-align:center}" +
    ".bd b{display:block;font-size:.95rem}.bd small{color:var(--gray);font-size:.78rem}" +
    ".bd.off{opacity:.38;filter:grayscale(1)}" +
    ".lbn{background:none;border:0;font:inherit;color:inherit;cursor:pointer;text-decoration:underline dotted;padding:0}" +
    ".warn{background:#fff3cf;border:1.5px solid #c9a24a;border-radius:12px;padding:10px 14px;margin:8px 0;font-size:.88rem;line-height:1.8;color:#4a3300}" +
    ".lnk{background:none;border:0;font:inherit;color:var(--gray);text-decoration:underline;cursor:pointer;display:block;margin:10px auto 0;font-size:.88rem}";
  document.head.appendChild(st);
})();

const RQS = [
  "ما اسم أول أنمي شاهدته؟",
  "ما اسم شخصيتك المفضلة؟",
  "في أي مدينة وُلدتَ؟",
  "ما اسم أقرب صديق لك في الطفولة؟",
  "ما اسم أول مدرسة درست فيها؟",
  "ما طعامك المفضل؟",
];
const BADGES = {
  first:    ["🏝", "أول جزيرة", "أنهيت جزيرتك الأولى"],
  isl4:     ["🧭", "مستكشف", "وصلت إلى الجزيرة 4"],
  isl5:     ["🎟", "كاسر الخصم", "تجاوزت الجزيرة 5"],
  hell:     ["🔥", "ناجٍ من الجحيم", "أنهيت جزيرة في الجحيم"],
  treasure: ["🏆", "صائد الكنز", "أنهيت الجزيرة 10"],
  twice:    ["👑", "الأسطورة", "ربحت الكنز مرتين"],
  fast:     ["⚡", "البرق", "أنهيت جزيرة في 4 دقائق أو أقل"],
  gold:     ["✨", "صائد الذهب", "أخذت 3 أسئلة ذهبية"],
  a100:     ["🎯", "قنّاص", "100 إجابة صحيحة"],
  a500:     ["🧠", "موسوعة", "500 إجابة صحيحة"],
  drown:    ["🌊", "غريق محترف", "غرقت 3 مرات"],
  c10:      ["🗺", "رحّالة", "أنهيت 10 جزر"],
};
const rqOptions = () => RQS.map((q, i) => '<option value="' + (i + 1) + '">' + q + '</option>').join("");

/* رسائل خطأ إضافية */
const _errAr0 = errAr;
errAr = function (e) {
  const m = ((e && e.message) || "").toLowerCase();
  if (m.includes("no_recovery")) return "هذا الحساب لم يضبط سؤال الاستعادة، لذلك لا يمكن استعادته";
  if (m.includes("no_player")) return "لا يوجد لاعب بهذا الاسم";
  if (m.includes("bad_answer_len")) return "الإجابة من 3 إلى 60 حرفاً";
  if (m.includes("bad_question")) return "اختر سؤالاً من القائمة";
  return _errAr0(e);
};

/* ============ الصفحة الأولى (قبل الدخول) ============ */
function homeOut(msg) {
  const reg = tab === "reg";
  show(SIGIL + '<h1>خريطة الكنز</h1><p class="sub">عشر جزر. خمس منها في الجحيم. والمجسم ينتظر في آخر جزيرة.</p>' + REWARD_BOX +
    '<div class="tabs"><button id="tl" class="' + (!reg ? "on" : "") + '">دخول</button><button id="tr" class="' + (reg ? "on" : "") + '">حساب جديد</button></div>' +
    '<input id="u" placeholder="اسم اللاعب (English / أرقام / _)" autocomplete="username" autocapitalize="none" maxlength="16">' +
    '<input id="p" type="password" placeholder="كلمة المرور (6 أحرف على الأقل)" autocomplete="' + (reg ? "new-password" : "current-password") + '">' +
    (reg ? '<div class="small" style="margin:8px 0 0;text-align:right">🔑 سؤال سرّي لاستعادة حسابك إن نسيت كلمة المرور:</div>' +
           '<select id="rq">' + rqOptions() + '</select>' +
           '<input id="ra" placeholder="إجابتك السرية" maxlength="60" style="direction:rtl;text-align:right">' : '') +
    '<div class="err" id="err">' + esc(msg || "") + '</div>' +
    '<button class="btn" id="sub">' + (reg ? "إنشاء الحساب وفتح الخريطة" : "دخول") + '</button>' +
    (!reg ? '<button class="lnk" id="forgot">نسيت كلمة المرور؟</button>' : '') +
    '<button class="btn alt" id="lb">🏆 الترتيب</button>' +
    '<div class="row"><button class="btn alt" id="shg">📣 شارك اللعبة</button><a class="btn alt" href="https://tokonomastore.com" target="_blank" rel="noopener">🛍 المتجر</a></div>' +
    '<div class="small">' + (reg ? "اسمك سيظهر في الترتيب. اختر إجابة سرية لا يعرفها غيرك: هي الطريقة الوحيدة لاستعادة حسابك. ولا تستعمل كلمة مرور من حساباتك الأخرى." : "الدخول يحفظ تقدمك وأكوادك على أي هاتف.") + '</div>');
  $("#tl").onclick = () => { tab = "login"; homeOut(); };
  $("#tr").onclick = () => { tab = "reg"; homeOut(); };
  $("#lb").onclick = () => flip(() => leaderboard());
  $("#shg").onclick = e => shareText(SHARE_GAME, e.target);
  $("#sub").onclick = submitAuth;
  const f = $("#forgot"); if (f) f.onclick = () => flip(() => recoverScreen());
  $("#p").addEventListener("keydown", e => { if (e.key === "Enter" && !reg) submitAuth(); });
}

async function submitAuth() {
  const u = $("#u").value.trim(), p = $("#p").value, err = $("#err"), b = $("#sub");
  const reg = tab === "reg";
  if (!/^[A-Za-z0-9_]{3,16}$/.test(u)) { err.textContent = errAr(new Error("bad_username")); return; }
  if (p.length < 6) { err.textContent = errAr(new Error("weak_password")); return; }
  let rq = 0, ra = "";
  if (reg) {
    rq = +$("#rq").value; ra = $("#ra").value.trim();
    if (ra.replace(/\s/g, "").length < 3) { err.textContent = "اكتب إجابة سرية (3 أحرف على الأقل)"; return; }
  }
  b.disabled = true; err.textContent = "";
  try {
    if (reg) {
      const j = await http("/auth/v1/signup", { body: { email: EMAIL(u), password: p }, auth: false });
      if (!j.access_token) throw new Error("confirm_required");
      setSess(j);
      try { await rpc("create_profile", { p_username: u }); }
      catch (e) { clearSess(); throw e; }
      try { await rpc("set_recovery", { p_q: rq, p_answer: ra }); } catch (e) {}
    } else {
      const j = await http("/auth/v1/token?grant_type=password", { body: { email: EMAIL(u), password: p }, auth: false });
      setSess(j);
      const me = await rpc("get_me");
      if (!me.username) await rpc("create_profile", { p_username: u });
    }
    flip(() => home());
  } catch (e) { err.textContent = errAr(e); b.disabled = false; }
}

/* ============ استعادة كلمة المرور ============ */
function recoverScreen(msg, uname) {
  show(SIGIL + '<h2>🔑 استعادة الحساب</h2><p class="sub">اكتب اسم لاعبك، ثم أجب عن سؤالك السري واختر كلمة مرور جديدة.</p>' +
    '<input id="u" placeholder="اسم اللاعب" autocapitalize="none" maxlength="16" value="' + esc(uname || "") + '">' +
    '<div class="err" id="err">' + esc(msg || "") + '</div>' +
    '<button class="btn" id="nx">التالي</button><button class="btn alt" id="bk">رجوع</button>');
  $("#bk").onclick = () => flip(() => homeOut());
  $("#nx").onclick = async () => {
    const u = $("#u").value.trim(), err = $("#err"), b = $("#nx");
    if (!/^[A-Za-z0-9_]{3,16}$/.test(u)) { err.textContent = errAr(new Error("bad_username")); return; }
    b.disabled = true; err.textContent = "";
    try {
      const r = await rpc("get_recovery_q", { p_username: u }, false);
      recoverStep2(u, r.qid);
    } catch (e) { err.textContent = errAr(e); b.disabled = false; }
  };
}
function recoverStep2(u, qid, msg) {
  show(SIGIL + '<h2>🔑 ' + esc(u) + '</h2><p class="sub"><b>' + esc(RQS[qid - 1] || "") + '</b></p>' +
    '<input id="ra" placeholder="إجابتك السرية" maxlength="60" style="direction:rtl;text-align:right">' +
    '<input id="np" type="password" placeholder="كلمة المرور الجديدة (6 أحرف على الأقل)" autocomplete="new-password">' +
    '<div class="err" id="err">' + esc(msg || "") + '</div>' +
    '<button class="btn go" id="go">تغيير كلمة المرور ودخول</button><button class="btn alt" id="bk">رجوع</button>');
  $("#bk").onclick = () => flip(() => recoverScreen("", u));
  $("#go").onclick = async () => {
    const a = $("#ra").value, np = $("#np").value, err = $("#err"), b = $("#go");
    if (np.length < 6) { err.textContent = errAr(new Error("weak_password")); return; }
    b.disabled = true; err.textContent = "";
    try {
      const r = await rpc("recover_password", { p_username: u, p_answer: a, p_new: np }, false);
      if (!r.ok) {
        err.textContent = r.reason === "locked" ? "محاولات كثيرة خاطئة. انتظر " + r.mins + " دقيقة ثم حاول ثانية"
          : "الإجابة غير صحيحة" + (r.left > 0 ? " · تبقّى " + r.left + " محاولات" : " · تم إيقاف المحاولات مؤقتاً");
        b.disabled = false; return;
      }
      const j = await http("/auth/v1/token?grant_type=password", { body: { email: EMAIL(u), password: np }, auth: false });
      setSess(j);
      flip(() => home());
    } catch (e) { err.textContent = errAr(e); b.disabled = false; }
  };
}

/* ============ الصفحة الرئيسية بعد الدخول ============ */
function homeIn(msg) {
  const rw = (ME.rewards || []).map(r =>
    '<div class="rw"><div><span class="mono">' + esc(r.code) + '</span><div class="st">' + (r.kind === "figurine" ? "🏆 مجسم مجاني" : "🎁 خصم 10%") + ' · ' + (r.claimed ? "✅ تم تسليمها" : "⏳ لم تُستلم بعد") + '</div></div>' +
    '<button class="btn alt" style="width:auto;margin:0;padding:7px 12px;font-size:.8rem" data-c="' + esc(r.code) + '">نسخ</button></div>').join("");
  show(SIGIL + '<h2>أهلاً <span class="mono">' + esc(ME.username) + '</span></h2>' + REWARD_BOX +
    '<div class="stats"><span><b>' + C.pos + '</b>موقعك (جزيرة)</span><span><b>' + ME.islands_cleared + '</b>جزر أُنجزت</span><span><b>' + ME.campaigns_won + '</b>مجسمات 🏆</span></div>' +
    '<div class="small" style="margin:0">أنت الآن على: <b>' + placeName(C.pos) + '</b> · نقطة الحفظ: <b>' + placeName(ckOf(C.best_pos)) + '</b></div>' +
    (ME.has_recovery ? '' : '<div class="warn">⚠️ لم تضبط <b>سؤال الاستعادة</b> بعد. إن نسيت كلمة مرورك لن تستطيع استعادة حسابك. <button class="lnk" id="setrq" style="color:#4a3300;display:inline;margin:0">اضبطه الآن</button></div>') +
    '<div class="err" id="err">' + esc(msg || "") + '</div>' +
    '<button class="btn go" id="go">🗺 افتح خريطة الكنز</button>' +
    '<div class="row"><button class="btn alt" id="lb">🏆 الترتيب</button><button class="btn alt" id="me">👤 ملفي</button></div>' +
    '<div class="row"><button class="btn alt" id="rules">📜 القواعد</button><button class="btn alt" id="shg">📣 شارك اللعبة</button></div>' +
    '<a class="btn alt" href="https://tokonomastore.com" target="_blank" rel="noopener">🛍 المتجر</a>' +
    (rw ? '<div style="margin-top:12px"><b>أكوادك</b>' + rw + '<div class="small">لاستلام جائزتك أرسل الكود مع اسم حسابك إلى إنستغرام <b>' + INSTAGRAM + '</b>.</div></div>' : '') +
    '<button class="btn alt" id="out" style="margin-top:14px;font-size:.85rem">تسجيل الخروج</button>');
  $("#go").onclick = () => flip(() => mapScreen());
  $("#lb").onclick = () => flip(() => leaderboard());
  $("#me").onclick = () => flip(() => profileScreen());
  const s = $("#setrq"); if (s) s.onclick = () => flip(() => profileScreen(null, null, true));
  $("#rules").onclick = () => flip(rulesPage);
  $("#shg").onclick = e => shareText(SHARE_GAME, e.target);
  $("#out").onclick = () => { clearSess(); ME = null; flip(() => homeOut()); };
  document.querySelectorAll("[data-c]").forEach(b => b.onclick = async () => { try { await navigator.clipboard.writeText(b.dataset.c); b.textContent = "تم ✅"; } catch (e) { prompt("انسخ الكود:", b.dataset.c); } });
}

/* ============ الترتيب ============ */
let lbTab = lsGet("toko_lbtab") || "week";
async function leaderboard() {
  show('<h2>🏆 الترتيب</h2><p class="sub">جارٍ التحميل...</p>');
  try {
    const rows = await rpc(lbTab === "all" ? "leaderboard_all" : "leaderboard", {}, !!sess);
    const medal = i => ["🥇", "🥈", "🥉"][i] || (i + 1);
    show('<h2>🏆 الترتيب</h2>' +
      '<div class="tabs"><button id="tw" class="' + (lbTab === "week" ? "on" : "") + '">هذا الأسبوع</button><button id="ta" class="' + (lbTab === "all" ? "on" : "") + '">كل الأوقات</button></div>' +
      '<p class="sub">' + (lbTab === "week" ? "يتجدد كل يوم اثنين · " : "") + 'الأبعد وصولاً على الخريطة · اضغط على اسم لاعب لترى ملفه</p>' +
      (rows.length ? '<table class="lb">' + rows.map((r, i) => '<tr><td>' + medal(i) + '</td><td><button class="lbn" data-u="' + esc(r.username) + '">' + esc(r.username) + '</button></td><td>' + (r.island >= 10 ? "🏆 " : "") + 'الجزيرة ' + r.island + (r.wins > 1 ? ' ×' + r.wins : '') + '</td></tr>').join("") + '</table>'
                   : '<p class="sub">لم يُكمل أحد جزيرة بعد. كن الأول! 🔥</p>') +
      '<button class="btn" id="bk">رجوع</button>');
    $("#tw").onclick = () => { lbTab = "week"; lsSet("toko_lbtab", lbTab); leaderboard(); };
    $("#ta").onclick = () => { lbTab = "all"; lsSet("toko_lbtab", lbTab); leaderboard(); };
    document.querySelectorAll(".lbn").forEach(b => b.onclick = () => flip(() => profileScreen(b.dataset.u, "lb")));
  } catch (e) { show('<h2>🏆 الترتيب</h2><p class="sub">' + esc(errAr(e)) + '</p><button class="btn" id="bk">رجوع</button>'); }
  $("#bk").onclick = () => flip(() => home());
}

/* ============ ملف اللاعب ============ */
async function profileScreen(name, from, focusRq) {
  show('<h2>👤 الملف</h2><p class="sub">جارٍ التحميل...</p>');
  const own = !name;
  try {
    const d = await rpc("player_card", own ? {} : { p_username: name }, !!sess);
    const acc = d.answers > 0 ? Math.round(d.correct / d.answers * 100) + "%" : "-";
    const got = new Set(d.badges || []);
    const bd = Object.keys(BADGES).map(k => {
      const b = BADGES[k], on = got.has(k);
      return '<div class="bd' + (on ? "" : " off") + '"><span class="e">' + b[0] + '</span><div><b>' + b[1] + '</b><small>' + b[2] + '</small></div></div>';
    }).join("");
    show('<h2>👤 <span class="mono">' + esc(d.username) + '</span></h2>' +
      '<p class="sub">' + (d.rank ? "المركز " + d.rank + " في الترتيب الدائم · " : "") + 'لاعب منذ <span dir="ltr">' + esc(String(d.since).slice(0, 10)) + '</span></p>' +
      '<div class="grid">' +
        '<div class="cell"><b>' + d.best + '</b>أبعد جزيرة</div>' +
        '<div class="cell"><b>' + d.cleared + '</b>جزر أُنجزت</div>' +
        '<div class="cell"><b>' + d.wins + '</b>كنوز 🏆</div>' +
        '<div class="cell"><b>' + acc + '</b>دقة الإجابات</div>' +
        '<div class="cell"><b>' + d.correct + '</b>إجابة صحيحة</div>' +
        '<div class="cell"><b>' + d.drowns + '</b>مرات الغرق 🌊</div>' +
        '<div class="cell"><b>' + (d.fastest ? fmt(d.fastest) : "-") + '</b>أسرع جزيرة</div>' +
        '<div class="cell"><b>' + d.golds + '</b>أسئلة ذهبية ✨</div>' +
        '<div class="cell"><b>' + got.size + '/' + Object.keys(BADGES).length + '</b>الشارات</div>' +
      '</div>' +
      '<b>🏅 الشارات</b>' + bd +
      (own ? '<div id="rcv" style="margin-top:14px"><b>🔑 سؤال الاستعادة</b>' +
          '<div class="small" style="text-align:right;margin:4px 0">' + (ME && ME.has_recovery ? "✅ مضبوط. يمكنك تغييره هنا." : "⚠️ غير مضبوط. اضبطه كي تستطيع استعادة حسابك إن نسيت كلمة المرور.") + '</div>' +
          '<select id="rq">' + rqOptions() + '</select><input id="ra" placeholder="إجابتك السرية" maxlength="60" style="direction:rtl;text-align:right">' +
          '<div class="err" id="err"></div><button class="btn alt" id="svr">حفظ</button></div>' : '') +
      '<button class="btn" id="bk">رجوع</button>');
    $("#bk").onclick = () => flip(() => from === "lb" ? leaderboard() : home());
    if (own) {
      $("#svr").onclick = async () => {
        const a = $("#ra").value.trim(), err = $("#err"), b = $("#svr");
        if (a.replace(/\s/g, "").length < 3) { err.textContent = "اكتب إجابة سرية (3 أحرف على الأقل)"; return; }
        b.disabled = true; err.textContent = "";
        try {
          await rpc("set_recovery", { p_q: +$("#rq").value, p_answer: a });
          if (ME) ME.has_recovery = true;
          b.textContent = "تم الحفظ ✅"; $("#ra").value = "";
          setTimeout(() => { b.disabled = false; b.textContent = "حفظ"; }, 2000);
        } catch (e) { err.textContent = errAr(e); b.disabled = false; }
      };
      if (focusRq) { const r = $("#rcv"); if (r) r.scrollIntoView(); }
    }
  } catch (e) {
    show('<h2>👤 الملف</h2><p class="sub">' + esc(errAr(e)) + '</p><button class="btn" id="bk">رجوع</button>');
    $("#bk").onclick = () => flip(() => from === "lb" ? leaderboard() : home());
  }
}

home();
