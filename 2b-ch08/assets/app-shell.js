/* =========================================================
   版面 / 分頁 / 初始化
   ========================================================= */
(function () {
  "use strict";
  var CH = window.CH08, STORE = CH.STORE, E = CH.E;

  var TABS = CH.TOPICS.map(function (t, i) {
    return { id: t.id, chip: t.chip, num: ("0" + (i + 1)).slice(-2), title: t.title, kind: "topic", data: t };
  });
  TABS.push({ id: "final", chip: "綜合測驗", num: "★", title: "綜合測驗", kind: "final" });
  TABS.push({ id: "gacha", chip: "抽卡", num: "🎟", title: "指數抽卡機", kind: "gacha" });
  TABS.push({ id: "collection", chip: "圖鑑", num: "📖", title: "小精靈圖鑑", kind: "collection" });
  TABS.push({ id: "wrong", chip: "錯題本", num: "📕", title: "我的錯題本", kind: "wrong" });

  var built = {};
  var current = null;

  /* ---------------- HUD ---------------- */
  function refreshHud() {
    var p = document.getElementById("hudPts"), t = document.getElementById("hudTk");
    if (p) p.innerHTML = "⭐ <b>" + STORE.s.pts + "</b> 分";
    if (t) t.innerHTML = "🎟 <b>" + STORE.tickets() + "</b>";
    document.querySelectorAll(".tabchip").forEach(function (chip) {
      if (STORE.s.best[chip.dataset.id]) chip.classList.add("done");
    });
    var gchip = document.querySelector('.tabchip[data-id="gacha"]');
    if (gchip) {
      var tkN = STORE.tickets();
      gchip.innerHTML = '<span class="num">🎟</span>抽卡' + (tkN > 0 ? '<b class="tkn">' + tkN + "</b>" : "");
      gchip.classList.toggle("hot", tkN > 0);
    }
    var mb = document.getElementById("modeBtn");
    if (mb) {
      var teacher = document.body.classList.contains("teacher");
      mb.innerHTML = teacher ? '👩‍🏫<span class="lbl"> 老師模式：開</span>' : '👩‍🏫<span class="lbl"> 老師模式</span>';
      mb.classList.toggle("on", teacher);
    }
  }
  CH.refreshHud = refreshHud;

  /* ---------------- 教材區塊 ---------------- */
  function recapHTML(lawIdx) {
    if (lawIdx === 0) {
      return '<div class="wnote" style="margin:6px 0 0">這是你的第一塊積木 🧱 — 之後每一條公式都會由它長出來，所以先把它記牢。</div>';
    }
    var html = '<div class="recap-grid">';
    for (var i = 0; i < lawIdx; i++) {
      var L = CH.LAWS[i];
      html += '<div class="reca" tabindex="0"><span class="n">' + L.tag + "</span>" +
        '<div class="f">' + E(L.f) + "</div>" +
        '<div class="e">' + L.name + "：" + L.e + "</div>" +
        '<div class="more">例：' + E(L.ex) + "<br>" + L.note + "</div></div>";
    }
    html += "</div>";
    html += '<div class="wnote">👆 點一點卡片，可以看到例子和提醒。小測的「累積重溫」題目就是從這裡出的。</div>';
    return html;
  }

  function tipsHTML(t) {
    return '<div class="tips"><b>👩‍🏫 教學提示（切換老師模式後長期顯示）</b><ul>' +
      t.tips.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div>";
  }

  function topicPanel(t, i) {
    var next = TABS[i + 1];
    var sec = document.createElement("section");
    sec.className = "panel";
    sec.id = "p-" + t.id;
    sec.innerHTML =
      '<div class="hero">' +
      '<span class="kicker">' + t.kicker + "</span>" +
      "<h2>" + t.chip + "｜" + t.title + "</h2>" +
      "<p>" + t.lead + "</p>" +
      '<div class="bigformula">' + E(t.formula) + "</div></div>" +

      '<section class="block"><h3><span class="badge">1</span>互動教學 <span class="sub">先動手玩，再記公式</span></h3>' +
      '<div class="widget" data-w="' + t.widget + '"></div>' +
      t.teach() +
      tipsHTML(t) +
      "</section>" +

      '<section class="block"><h3><span class="badge mint">2</span>累積重溫 <span class="sub">由第 1 條開始疊上去</span></h3>' +
      recapHTML(t.law) + "</section>" +

      '<section class="block"><h3><span class="badge pink">3</span>互動小測 <span class="sub">' +
      (CH.QUIZ[t.id] ? CH.QUIZ[t.id].length : 0) + " 題 · 新學 + 累積 · " +
      (CH.QUIZ[t.id] ? CH.QUIZ[t.id].filter(function (q) { return q.lv === 3; }).length : 0) + " 題多步挑戰</span></h3>" +
      '<div class="quiz" data-quiz="' + t.id + '"></div></section>';

    setTimeout(function () {
      var w = sec.querySelector(".widget");
      if (w && CH.WIDGETS[w.dataset.w]) CH.WIDGETS[w.dataset.w](w);
      var qq = sec.querySelector(".quiz");
      if (qq) CH.buildQuiz(qq, t.id, CH.QUIZ[t.id], {
        topicName: t.chip + " " + t.title,
        next: next ? { id: next.id, label: next.kind === "topic" ? "下一節：" + next.chip + " →" : "去" + next.chip + " →" } : null
      });
    }, 0);
    return sec;
  }

  function finalPanel() {
    var sec = document.createElement("section");
    sec.className = "panel";
    sec.id = "p-final";
    sec.innerHTML =
      '<div class="hero"><span class="kicker">總複習 · ' + CH.QUIZ.final.length + ' 題</span>' +
      "<h2>綜合測驗：整數指數律全攻略</h2>" +
      "<p>由定義到科學記數法，一次過檢查你是否真正掌握。每題 15 分，全對另有 20 分獎勵；當中有多題要連用 3 條以上公式。</p>" +
      '<div class="bigformula" style="display:flex;flex-wrap:wrap;gap:4px 14px">' + E("a^m × a^n = a^(m+n)") + '<span class="op">·</span>' + E("(a^m)^n = a^(mn)") + '<span class="op">·</span>' + E("a^-n = 1/a^n") + "</div></div>" +

      '<section class="block"><h3><span class="badge sun">★</span>開始測驗 <span class="sub">做完可抽卡</span></h3>' +
      '<div class="quiz" data-quiz="final"></div></section>' +

      '<section class="block"><h3><span class="badge mint">📋</span>考前速查表 <span class="sub">不肯定時偷看一眼</span></h3>' +
      '<details><summary style="cursor:pointer;font-weight:900;padding:6px 0">展開 10 條公式</summary>' +
      '<table class="mini-table" style="max-width:100%"><tr><th>#</th><th>名稱</th><th>公式</th><th>一句話</th></tr>' +
      CH.LAWS.map(function (L) {
        return "<tr><td>" + L.no + "</td><td>" + L.name + "</td><td>" + E(L.f) + "</td><td style='font-size:13px'>" + L.e + "</td></tr>";
      }).join("") + "</table></details></section>";

    setTimeout(function () {
      var qq = sec.querySelector(".quiz");
      CH.buildQuiz(qq, "final", CH.QUIZ.final, { final: true, topicName: "綜合測驗", next: { id: "gacha", label: "去抽卡 🎟" } });
    }, 0);
    return sec;
  }

  function simplePanel(id, kicker, title, lead, bodyFn) {
    var sec = document.createElement("section");
    sec.className = "panel";
    sec.id = "p-" + id;
    sec.innerHTML = '<div class="hero"><span class="kicker">' + kicker + "</span><h2>" + title + "</h2><p>" + lead + "</p></div>" +
      '<section class="block" id="' + id + '-body"></section>';
    setTimeout(function () { bodyFn(sec.querySelector("#" + id + "-body")); }, 0);
    return sec;
  }

  /* ---------------- 分頁切換 ---------------- */
  function ensure(id) {
    if (built[id]) return built[id];
    var tab = TABS.filter(function (t) { return t.id === id; })[0];
    if (!tab) return null;
    var el;
    if (tab.kind === "topic") el = topicPanel(tab.data, TABS.indexOf(tab));
    else if (tab.kind === "final") el = finalPanel();
    else if (tab.kind === "gacha") el = simplePanel("gacha", "獎勵 · 抽卡", "指數抽卡機 🎰", "用小測換來的抽卡券，抽取原創「指數小精靈」卡。稀有度越高，代表你越努力！", CH.buildGacha);
    else if (tab.kind === "collection") el = simplePanel("collection", "收藏 · 圖鑑", "小精靈圖鑑 📖", "已收集的小精靈會亮起來。全部 16 隻，你能集齊嗎？", CH.buildCollection);
    else el = simplePanel("wrong", "重溫 · 錯題本", "我的錯題本 📕", "這裡自動收集你做錯的題目，附有完整解釋。重做答對就會自動消失。", CH.buildWrong);
    document.getElementById("panels").appendChild(el);
    built[id] = el;
    return el;
  }

  CH.goto = function (id) {
    var tab = TABS.filter(function (t) { return t.id === id; })[0];
    // 抽卡／圖鑑／錯題本每次進入都重新繪製，確保數字最新
    if (tab && tab.kind !== "topic" && tab.kind !== "final" && built[id]) {
      built[id].remove();
      delete built[id];
    }
    var el = ensure(id);
    if (!el) return;
    document.querySelectorAll(".panel").forEach(function (p) { p.classList.remove("active"); });
    el.classList.add("active");
    document.querySelectorAll(".tabchip").forEach(function (c) {
      c.setAttribute("aria-selected", c.dataset.id === id ? "true" : "false");
    });
    current = id;
    try { history.replaceState(null, "", "#" + id); } catch (e) { }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------------- 初始化 ---------------- */
  function init() {
    // 分頁列
    var bar = document.getElementById("tabs");
    var navTabs = TABS.filter(function (t) { return t.kind === "topic" || t.kind === "final" || t.kind === "gacha"; });
    bar.innerHTML = navTabs.map(function (t) {
      return '<button class="tabchip' + (t.kind !== "topic" && t.kind !== "final" ? " special" : "") + '" data-id="' + t.id + '" aria-selected="false">' +
        '<span class="num">' + t.num + "</span>" + t.chip + "</button>";
    }).join("");
    bar.querySelectorAll(".tabchip").forEach(function (c) {
      c.onclick = function () { CH.goto(c.dataset.id); };
    });

    // 模式切換
    var gchip = document.querySelector('.tabchip[data-id="gacha"]');
    if (gchip) {
      var tkN = STORE.tickets();
      gchip.innerHTML = '<span class="num">🎟</span>抽卡' + (tkN > 0 ? '<b class="tkn">' + tkN + "</b>" : "");
      gchip.classList.toggle("hot", tkN > 0);
    }
    var mb = document.getElementById("modeBtn");
    if (STORE.s.mode === "teacher") document.body.classList.add("teacher");
    mb.onclick = function () {
      var on = !document.body.classList.contains("teacher");
      document.body.classList.toggle("teacher", on);
      STORE.setMode(on ? "teacher" : "student");
      refreshHud();
      CH.toast(on ? "已切換到老師模式：教學提示會一直顯示 👩‍🏫" : "已切換到學生模式：儲分、抽卡、錯題本啟動 🧑‍🎓");
    };

    document.getElementById("goWrong").onclick = function () { CH.goto("wrong"); };
    var tk = document.getElementById("hudTk");
    if (tk) { tk.style.cursor = "pointer"; tk.title = "去抽卡"; tk.onclick = function () { CH.goto("gacha"); }; }
    document.getElementById("goCards").onclick = function () { CH.goto("gacha"); };

    // 重設
    var rs = document.getElementById("resetBtn");
    if (rs) rs.onclick = function () {
      if (confirm("確定要清除所有分數、抽卡記錄和錯題嗎？")) {
        STORE.reset(); location.reload();
      }
    };

    // 重溫卡展開
    document.addEventListener("click", function (e) {
      var r = e.target.closest ? e.target.closest(".reca") : null;
      if (r) r.classList.toggle("open");
    });
    document.addEventListener("keydown", function (e) {
      if (e.target.matches("input, textarea")) return;
      var i = TABS.findIndex(function (t) { return t.id === current; });
      if (e.key === "ArrowRight" && i < TABS.length - 1) { CH.goto(TABS[i + 1].id); }
      if (e.key === "ArrowLeft" && i > 0) { CH.goto(TABS[i - 1].id); }
    });

    window.addEventListener("ch08:update", refreshHud);
    refreshHud();

    var h = (location.hash || "").replace("#", "");
    var known = TABS.some(function (t) { return t.id === h; });
    CH.goto(known ? h : "t0");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
