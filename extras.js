/* =====================================================================
   أحداث مباشرة: رسالة اليوم · ساعة المضاعفة · تحدّي الأسبوع
   يُحمَّل بعد accounts.js
   ===================================================================== */
BADGES.wk1 = ["🎯", "منجز الأسبوع", "أنجزت تحدّي أسبوع"];
BADGES.wk4 = ["🏅", "المواظب", "أنجزت 4 تحديات أسبوعية"];

const WEEKLY = [
  "أنهِ جزيرة كاملة دون أي خطأ",
  "اجمع 3 أسئلة ذهبية ✨",
  "أنهِ جزيرتين من الجحيم 🔥",
  "أنهِ جزيرة في 4:30 دقيقة أو أقل",
  "أنهِ 5 جزر خلال الأسبوع",
];
const fmtLeft = s => { const m = Math.max(1, Math.ceil(s / 60)); return m >= 60 ? Math.floor(m / 60) + " س " + (m % 60 ? (m % 60) + " د" : "") : m + " دقيقة"; };
const BOX = (txt, bg, bd, col) => '<div class="warn" style="background:' + bg + ';border-color:' + bd + ';color:' + col + '">' + txt + '</div>';

let _dt = 0;
function decorateHome() {
  const pg = $("#page"); if (!pg || !READY) return;
  const t = ++_dt;
  pg.insertAdjacentHTML("afterbegin", '<div id="news" data-t="' + t + '"></div>');
  rpc("public_news", {}, !!sess).then(n => {
    const box = $("#news"); if (!box || box.dataset.t != t) return;
    let h = "";
    if (n.news) h += BOX("📢 " + esc(n.news), "#e9f3ff", "#5b9bd5", "#12304d");
    if (n.boost_secs > 0) h += BOX("⚡ <b>ساعة المضاعفة!</b> كل جزيرة تبدأ الآن بـ <b>+" + n.boost_secs + " ثانية</b> إضافية · تنتهي بعد " + fmtLeft(n.boost_left), "#e8f7ec", "#2f7d4f", "#12361f");
    box.innerHTML = h;
    const title = WEEKLY[n.week_id] || "";
    if (ME && sess) {
      rpc("weekly_status").then(w => {
        const b2 = $("#news"); if (!b2 || b2.dataset.t != t) return;
        try { if (w.total_done > (lsGet("toko_wk") || 0)) lsSet("toko_wk", w.total_done); } catch (e) {}
        b2.insertAdjacentHTML("beforeend", '<div class="info" style="margin:8px 0"><b>🎯 تحدّي الأسبوع</b>' + (w.done ? ' <span style="color:#2f7d4f">✅ أنجزته!</span>' : '') + '<br>' + esc(WEEKLY[w.id] || title) +
          '<div class="bar" style="margin:8px 0 4px"><b style="width:' + Math.round(w.progress / w.goal * 100) + '%"></b></div>' +
          '<span style="font-size:.8rem;opacity:.8">' + w.progress + ' / ' + w.goal + ' · أنجزه ' + w.done_count + ' لاعب هذا الأسبوع · يتجدد كل اثنين</span></div>');
      }).catch(() => {});
    } else if (title) {
      box.insertAdjacentHTML("beforeend", '<div class="info" style="margin:8px 0"><b>🎯 تحدّي الأسبوع</b><br>' + esc(title) + '<br><span style="font-size:.8rem;opacity:.8">أنجزه ' + n.week_done + ' لاعب · سجّل الدخول لتشارك</span></div>');
    }
  }).catch(() => {});
}

const _homeIn1 = homeIn;
homeIn = function (msg) { _homeIn1(msg); decorateHome(); };
const _homeOut1 = homeOut;
homeOut = function (msg) { _homeOut1(msg); decorateHome(); };

/* عند إنهاء جزيرة: سجّل تقدّم التحدّي وأخبر اللاعب إن أنجزه */
const _cleared1 = cleared;
cleared = function (res) {
  _cleared1(res);
  rpc("weekly_status").then(w => {
    if (w.done && w.total_done > (lsGet("toko_wk") || 0)) {
      lsSet("toko_wk", w.total_done);
      setTimeout(() => { FX.toast("🎯 أنجزت تحدّي الأسبوع!"); FX.confetti(60, true); SFX.clear(); }, 2600);
    }
  }).catch(() => {});
};

home();
