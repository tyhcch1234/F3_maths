/* =========================================================
   儲存 / 共用小工具
   ========================================================= */
(function () {
  "use strict";
  var KEY = "f3m_ch08_v1";
  var DEF = { pts: 0, usedTk: 0, cards: {}, best: {}, wrong: [], mode: "student", seen: {}, plays: 0 };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  var st = (function () {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return clone(DEF);
      var o = JSON.parse(raw), out = clone(DEF);
      for (var k in out) if (k in o) out[k] = o[k];
      return out;
    } catch (e) { return clone(DEF); }
  })();

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { }
    window.dispatchEvent(new Event("ch08:update"));
  }

  var STORE = {
    get s() { return st; },
    save: save,
    tickets: function () { return Math.max(0, Math.floor(st.pts / 50) - st.usedTk); },
    nextTicketAt: function () { return 50 - (st.pts % 50); },
    addPts: function (n) { st.pts += n; save(); },
    useTicket: function () { if (STORE.tickets() > 0) { st.usedTk++; save(); return true; } return false; },
    addCard: function (id) {
      var n = st.cards[id] || 0;
      st.cards[id] = n + 1; save();
      return n === 0; // 新卡
    },
    seenTopic: function (id) { return !!st.seen[id]; },
    markSeen: function (id) { st.seen[id] = 1; save(); },
    addWrong: function (item) {
      var found = false;
      st.wrong.forEach(function (w) { if (w.id === item.id) { w.ts = Date.now(); w.chosen = item.chosen; found = true; } });
      if (!found) st.wrong.unshift(item);
      if (st.wrong.length > 120) st.wrong.length = 120;
      save();
    },
    removeWrong: function (id) {
      st.wrong = st.wrong.filter(function (w) { return w.id !== id; });
      save();
    },
    clearWrong: function () { st.wrong = []; save(); },
    setMode: function (m) { st.mode = m; save(); },
    reset: function () { st = clone(DEF); save(); }
  };

  /* ---- toast ---- */
  var toastEl = null;
  function toast(msg, ms) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.id = "toast"; document.body.appendChild(toastEl); }
    toastEl.innerHTML = msg;
    toastEl.classList.add("show");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove("show"); }, ms || 2200);
  }

  /* ---- 彩花 ---- */
  function confetti(n) {
    var colors = ["#7C5CFF", "#FF7EB6", "#20C39B", "#FFC93C", "#3FB6FF", "#FF8A5B"];
    for (var i = 0; i < (n || 14); i++) {
      var d = document.createElement("i");
      d.className = "confetti";
      d.style.left = Math.random() * 100 + "vw";
      d.style.top = "-20px";
      d.style.background = colors[(Math.random() * colors.length) | 0];
      d.style.animationDuration = (1.6 + Math.random() * 1.4) + "s";
      d.style.animationDelay = (Math.random() * .25) + "s";
      d.style.width = (6 + Math.random() * 8) + "px";
      d.style.height = (10 + Math.random() * 10) + "px";
      document.body.appendChild(d);
      (function (el) { setTimeout(function () { el.remove(); }, 3200); })(d);
    }
  }

  window.CH08.STORE = STORE;
  window.CH08.toast = toast;
  window.CH08.confetti = confetti;
})();
