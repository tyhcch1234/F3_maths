/* =========================================================
   小測引擎 / 抽卡 / 圖鑑 / 錯題本
   ========================================================= */
(function () {
  "use strict";
  var CH = window.CH08, STORE = CH.STORE, toast = CH.toast, confetti = CH.confetti;
  var LET = "ABCD";

  /* =======================================================
     小精靈插畫
     ======================================================= */
  function critter(a) {
    var b = a.body || "#C3B4FF", s = a.shade || "#8E77F0", ink = "#2E2A3B", w = 2.6;
    var back = "", front = "";
    var ears = a.ears || "none";

    if (ears === "cat") {
      back += '<path d="M27 42 L31 15 L49 33 Z" fill="' + b + '" stroke="' + ink + '" stroke-width="' + w + '" stroke-linejoin="round"/>';
      back += '<path d="M73 42 L69 15 L51 33 Z" fill="' + b + '" stroke="' + ink + '" stroke-width="' + w + '" stroke-linejoin="round"/>';
      back += '<path d="M33 34 L35 22 L43 31 Z" fill="#FFC2DE"/><path d="M67 34 L65 22 L57 31 Z" fill="#FFC2DE"/>';
    } else if (ears === "rabbit") {
      back += '<ellipse cx="38" cy="22" rx="8" ry="17" fill="' + b + '" stroke="' + ink + '" stroke-width="' + w + '"/>';
      back += '<ellipse cx="62" cy="22" rx="8" ry="17" fill="' + b + '" stroke="' + ink + '" stroke-width="' + w + '"/>';
      back += '<ellipse cx="38" cy="22" rx="4" ry="10" fill="#FFC2DE"/><ellipse cx="62" cy="22" rx="4" ry="10" fill="#FFC2DE"/>';
    } else if (ears === "horn") {
      back += '<path d="M50 8 L59 34 L41 34 Z" fill="' + s + '" stroke="' + ink + '" stroke-width="' + w + '" stroke-linejoin="round"/>';
    } else if (ears === "devil") {
      back += '<path d="M34 36 q-11 -14 1 -21 q7 9 5 21 z" fill="' + s + '" stroke="' + ink + '" stroke-width="' + w + '" stroke-linejoin="round"/>';
      back += '<path d="M66 36 q11 -14 -1 -21 q-7 9 -5 21 z" fill="' + s + '" stroke="' + ink + '" stroke-width="' + w + '" stroke-linejoin="round"/>';
    } else if (ears === "bear") {
      back += '<circle cx="29" cy="37" r="11" fill="' + b + '" stroke="' + ink + '" stroke-width="' + w + '"/>';
      back += '<circle cx="71" cy="37" r="11" fill="' + b + '" stroke="' + ink + '" stroke-width="' + w + '"/>';
      back += '<circle cx="29" cy="37" r="5" fill="' + s + '"/><circle cx="71" cy="37" r="5" fill="' + s + '"/>';
    } else if (ears === "antenna") {
      back += '<path d="M42 34 q-6 -16 -12 -20" fill="none" stroke="' + ink + '" stroke-width="' + w + '" stroke-linecap="round"/>';
      back += '<path d="M58 34 q6 -16 12 -20" fill="none" stroke="' + ink + '" stroke-width="' + w + '" stroke-linecap="round"/>';
      back += '<circle cx="29" cy="13" r="4.5" fill="' + s + '" stroke="' + ink + '" stroke-width="2"/>';
      back += '<circle cx="71" cy="13" r="4.5" fill="' + s + '" stroke="' + ink + '" stroke-width="2"/>';
    } else if (ears === "leaf") {
      back += '<path d="M48 36 q-14 -4 -16 -18 q15 2 16 18 z" fill="#5FB33F" stroke="' + ink + '" stroke-width="2.2"/>';
      back += '<path d="M52 36 q14 -4 16 -18 q-15 2 -16 18 z" fill="#7BD35B" stroke="' + ink + '" stroke-width="2.2"/>';
    } else if (ears === "fin") {
      back += '<path d="M50 10 q13 10 7 24 q-9 -6 -7 -24 z" fill="' + s + '" stroke="' + ink + '" stroke-width="' + w + '" stroke-linejoin="round"/>';
    }

    if (a.extra === "wings") {
      back += '<path d="M22 62 q-18 -10 -16 12 q11 4 17 -4 z" fill="#FFFFFF" stroke="' + ink + '" stroke-width="2.2" stroke-linejoin="round"/>';
      back += '<path d="M78 62 q18 -10 16 12 q-11 4 -17 -4 z" fill="#FFFFFF" stroke="' + ink + '" stroke-width="2.2" stroke-linejoin="round"/>';
    }
    if (ears === "none" && a.extra !== "wings") {
      back += '<ellipse cx="50" cy="30" rx="18" ry="12" fill="' + b + '" stroke="' + ink + '" stroke-width="' + w + '"/>';
    }

    var body = '<ellipse cx="50" cy="62" rx="31" ry="27" fill="' + b + '" stroke="' + ink + '" stroke-width="2.8"/>' +
      '<ellipse cx="50" cy="72" rx="18" ry="13" fill="#FFFFFF" opacity=".45"/>' +
      '<ellipse cx="31" cy="70" rx="5" ry="3.4" fill="#FF9FBE" opacity=".5"/>' +
      '<ellipse cx="69" cy="70" rx="5" ry="3.4" fill="#FF9FBE" opacity=".5"/>';

    var eyes = "";
    if (a.eyes === "star") {
      eyes = star(39, 58) + star(61, 58);
    } else if (a.eyes === "sleepy") {
      eyes = '<path d="M34 58 q5 -6 10 0" fill="none" stroke="' + ink + '" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M56 58 q5 -6 10 0" fill="none" stroke="' + ink + '" stroke-width="3" stroke-linecap="round"/>';
    } else if (a.eyes === "sparkle") {
      eyes = '<circle cx="39" cy="58" r="5.4" fill="#FFFFFF" stroke="' + ink + '" stroke-width="2.2"/>' +
        '<circle cx="61" cy="58" r="5.4" fill="#FFFFFF" stroke="' + ink + '" stroke-width="2.2"/>' +
        '<circle cx="39" cy="58" r="2.3" fill="' + ink + '"/><circle cx="61" cy="58" r="2.3" fill="' + ink + '"/>' +
        '<circle cx="40.6" cy="56.4" r="1" fill="#fff"/><circle cx="62.6" cy="56.4" r="1" fill="#fff"/>';
    } else {
      eyes = '<circle cx="39" cy="58" r="4.4" fill="' + ink + '"/><circle cx="61" cy="58" r="4.4" fill="' + ink + '"/>' +
        '<circle cx="40.6" cy="56.4" r="1.4" fill="#fff"/><circle cx="62.6" cy="56.4" r="1.4" fill="#fff"/>';
    }

    var mouth = a.extra === "beak" ? "" :
      '<path d="M46 68 q4 5 8 0" fill="none" stroke="' + ink + '" stroke-width="2.2" stroke-linecap="round"/>';

    if (a.extra === "beak") front += '<path d="M45 64 L55 64 L50 74 Z" fill="#FFB340" stroke="' + ink + '" stroke-width="2.2" stroke-linejoin="round"/>';
    if (a.extra === "glasses") {
      front += '<circle cx="39" cy="58" r="9.5" fill="#FFFFFF" opacity=".28" stroke="' + ink + '" stroke-width="2.4"/>' +
        '<circle cx="61" cy="58" r="9.5" fill="#FFFFFF" opacity=".28" stroke="' + ink + '" stroke-width="2.4"/>' +
        '<path d="M48.5 58 h3" stroke="' + ink + '" stroke-width="2.4"/>';
    }
    if (a.extra === "crown") {
      front += '<path d="M33 30 L38 15 L45 26 L50 12 L55 26 L62 15 L67 30 Z" fill="#FFC93C" stroke="' + ink + '" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<circle cx="50" cy="22" r="2.4" fill="#FF7EB6"/>';
    }
    if (a.extra === "bow") {
      front += '<path d="M50 30 l-12 -8 v16 z" fill="#FF7EB6" stroke="' + ink + '" stroke-width="2.2" stroke-linejoin="round"/>' +
        '<path d="M50 30 l12 -8 v16 z" fill="#FF7EB6" stroke="' + ink + '" stroke-width="2.2" stroke-linejoin="round"/>' +
        '<circle cx="50" cy="30" r="3.6" fill="#FFD1E4" stroke="' + ink + '" stroke-width="2"/>';
    }
    if (a.extra === "cap") {
      front += '<path d="M24 40 a26 24 0 0 1 52 0 z" fill="#5B8DEF" stroke="' + ink + '" stroke-width="2.4"/>' +
        '<rect x="16" y="36" width="32" height="7" rx="3.5" fill="#3E6FCB" stroke="' + ink + '" stroke-width="2.2"/>';
    }

    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img">' +
      back + body + eyes + mouth + front + "</svg>";
  }
  function star(cx, cy) {
    return '<path d="M' + cx + ' ' + (cy - 6) + ' l1.9 4.1 4.5.5 -3.3 3.1 .9 4.4 -4-2.1 -4 2.1 .9-4.4 -3.3-3.1 4.5-.5 z" fill="#2E2A3B"/>';
  }
  CH.critter = critter;

  /* =======================================================
     小測
     ======================================================= */
  // 把純文字選項轉成數學排版（避免出現 x^2 這種原文）
  CH.opt = function (s) {
    s = String(s);
    if (/[<>]/.test(s)) return s;
    if (/[\^0-9]/.test(s)) return '<span class="m">' + CH.fmt(s).replace(/(^|[\s(>])-/g, "$1\u2212") + "</span>";
    return s;
  };

  function stars(lv) {
    lv = lv || 1;
    return "★".repeat(lv) + "☆".repeat(3 - lv);
  }

  function buildQuiz(host, key, questions, opts) {
    opts = opts || {};
    var per = opts.final ? 15 : 10;
    var idx = 0, right = 0, firstTime = !STORE.s.best[key];
    // 每次進入都把選項重新洗牌，避免「答案永遠是 A」
    questions = questions.map(function (q) {
      var order = q.opts.map(function (_, i) { return i; });
      for (var i = order.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = order[i]; order[i] = order[j]; order[j] = t;
      }
      return {
        tag: q.tag, q: q.q, exp: q.exp, lv: q.lv || 1,
        opts: order.map(function (i) { return CH.opt(q.opts[i]); }),
        ans: order.indexOf(q.ans)
      };
    });

    function head() {
      return '<div class="qhead"><span class="qcount">第 ' + (idx + 1) + " / " + questions.length + " 題</span>" +
        '<span class="qtag ' + (questions[idx].tag === "new" ? "new" : "cum") + '">' +
        (questions[idx].tag === "new" ? "本節新學" : questions[idx].tag === "cum" ? "累積重溫" : "綜合挑戰") + "</span>" +
        '<span class="qtag lv" title="難度">' + stars(questions[idx].lv) + "</span>" +
        '<div class="qprog"><i style="width:' + (idx / questions.length * 100) + '%"></i></div></div>';
    }

    function render() {
      if (idx >= questions.length) return result();
      var qq = questions[idx];
      host.innerHTML = head() +
        '<div class="qtext">' + qq.q + "</div>" +
        '<div class="opts">' + qq.opts.map(function (o, i) {
          return '<button class="opt" data-i="' + i + '"><span class="k">' + LET[i] + "</span><span>" + o + "</span></button>";
        }).join("") + "</div>" +
        '<div class="fb" hidden></div>' +
        '<div class="qfoot"><span class="hint">選一個答案，馬上知道對錯</span></div>';
      var btns = host.querySelectorAll(".opt");
      btns.forEach(function (b) { b.onclick = function () { answer(+b.dataset.i, btns); }; });
    }

    function answer(i, btns) {
      var qq = questions[idx], ok = i === qq.ans;
      btns.forEach(function (b, j) {
        b.disabled = true;
        if (j === qq.ans) b.classList.add("right");
        if (j === i && !ok) b.classList.add("wrong");
      });
      if (ok) { right++; confetti(8); }
      else {
        STORE.addWrong({
          id: key + "-" + idx, quiz: key, topic: opts.topicName || "綜合測驗",
          q: qq.q, opts: qq.opts, ans: qq.ans, chosen: i, exp: qq.exp, ts: Date.now()
        });
      }
      var fb = host.querySelector(".fb");
      fb.hidden = false;
      fb.className = "fb " + (ok ? "good" : "bad");
      fb.innerHTML = '<div class="fbhead">' + (ok ? "✅ 答對了！ +" + per + " 分" : "❌ 差一點… 正確答案：" + LET[qq.ans]) + "</div>" +
        '<div class="exp">' + qq.exp + "</div>";
      host.querySelector(".qfoot").innerHTML =
        '<button class="btn primary" id="nx">' + (idx === questions.length - 1 ? "看成績 🎉" : "下一題 →") + "</button>" +
        '<span class="hint">' + (ok ? "繼續加油！" : "已存入錯題本，日後可重溫") + "</span>";
      host.querySelector("#nx").onclick = function () { idx++; render(); };
      host.querySelector("#nx").focus();
    }

    function result() {
      var total = questions.length, pct = Math.round(right / total * 100);
      var stars = pct >= 90 ? 5 : pct >= 75 ? 4 : pct >= 60 ? 3 : pct >= 40 ? 2 : 1;
      var pts = right * per + (right === total ? (opts.final ? 20 : 10) : 0);
      if (!firstTime) pts = Math.round(pts * 0.3);
      if (pts > 0) STORE.addPts(pts);
      var prev = STORE.s.best[key];
      if (!prev || right > prev.right) STORE.s.best[key] = { right: right, total: total, pct: pct };
      STORE.markSeen(key);
      STORE.save();
      if (pct >= 80) confetti(40);

      var msg = pct === 100 ? "完美！你已完全掌握這一節 🏆" :
        pct >= 80 ? "很棒！再檢查一下粗心的地方就行。" :
          pct >= 60 ? "不錯，但仍有幾條公式要再練。" :
            "先回到上面的互動教學再看一次，然後重試 💪";

      host.innerHTML =
        '<div class="result"><div style="font-size:13px;font-weight:900;letter-spacing:2px;color:#5B5470">本節得分</div>' +
        '<div class="score">' + right + "<span style='font-size:24px;color:#B9AFC9'> / " + total + "</span></div>" +
        '<div class="stars">' + "★".repeat(stars) + "<span style='color:#E2D8C8'>" + "★".repeat(5 - stars) + "</span></div>" +
        '<div class="msg">' + msg + "</div>" +
        '<div class="rewards"><span class="pill gold">+' + pts + " 分</span>" +
        '<span class="pill violet">🎟 抽卡券 ' + STORE.tickets() + " 張</span>" +
        (pct < 100 ? '<span class="pill">錯題已記錄</span>' : "") + "</div>" +
        '<div class="qfoot" style="justify-content:center">' +
        '<button class="btn" id="again">再試一次</button>' +
        (STORE.tickets() > 0 ? '<button class="btn pink" id="draw">去抽卡 🎟 ' + STORE.tickets() + "</button>" : "") +
        (opts.next ? '<button class="btn primary" id="go">' + opts.next.label + "</button>" : "") +
        "</div></div>";
      host.querySelector("#again").onclick = function () { idx = 0; right = 0; firstTime = false; render(); };
      var go = host.querySelector("#go");
      if (go) go.onclick = function () { CH.goto(opts.next.id); };
      var dr = host.querySelector("#draw");
      if (dr) dr.onclick = function () { CH.goto("gacha"); };
    }

    render();
  }

  /* =======================================================
     抽卡
     ======================================================= */
  function roll() {
    var cards = CH.CARDS, W = CH.WEIGHT, pool = [], total = 0, r, acc = 0;
    ["N", "R", "SR", "SSR"].forEach(function (k) { total += W[k]; });
    r = Math.random() * total;
    var pick = "N";
    for (var i = 0; i < 4; i++) {
      var k = ["N", "R", "SR", "SSR"][i];
      acc += W[k];
      if (r <= acc) { pick = k; break; }
    }
    pool = cards.filter(function (c) { return c.rarity === pick; });
    return pool[(Math.random() * pool.length) | 0];
  }

  function buildGacha(host) {
    var base = CH.CARDS[0];
    host.innerHTML =
      '<div class="gacha">' +
      '<div style="font-size:34px;line-height:1">🎰</div>' +
      '<div style="font-weight:900;font-size:19px;margin-top:4px">指數小精靈抽卡機</div>' +
      '<div class="wnote" style="margin-top:4px">每 50 分可換 1 張抽卡券 · 現有 <b id="gTk">' + STORE.tickets() + "</b> 張</div>" +
      '<div class="flipwrap" id="gWrap"><div class="flipcard" id="gFlip">' +
      '<div class="face back"><div class="qm">?</div><div class="txt">PUSH TO DRAW</div></div>' +
      '<div class="face front" id="gFront"></div></div></div>' +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
      '<button class="btn primary" id="gDraw">抽一張卡 🎟</button>' +
      '<button class="btn" id="gGo">看我的圖鑑</button></div>' +
      '<div class="wnote" id="gNote">答對小測就可以儲分換券，抽到重複卡會自動變成 5 分。</div>' +
      "</div>";

    var flip = host.querySelector("#gFlip"), front = host.querySelector("#gFront");
    var busy = false;

    host.querySelector("#gDraw").onclick = function () {
      if (busy) return;
      if (STORE.tickets() < 1) { toast("還未有抽卡券：答對小測儲夠 50 分就有 1 張 🎟"); return; }
      busy = true;
      STORE.useTicket();
      var card = roll();
      var isNew = STORE.addCard(card.id);
      host.querySelector("#gTk").textContent = STORE.tickets();
      front.className = "face front r-" + card.rarity;
      front.innerHTML = '<div class="rar" style="position:static;margin-bottom:2px">' + card.rarity + "</div>" +
        '<div class="art">' + critter(card.art) + "</div>" +
        '<div class="nm">' + card.name + "</div>" +
        '<div class="hp">HP ' + card.hp + " · " + card.type + "屬性</div>" +
        '<div class="sk" style="padding:0 6px">' + card.skill + "</div>";
      flip.classList.remove("flipped");
      void flip.offsetWidth;
      setTimeout(function () { flip.classList.add("flipped"); }, 80);
      setTimeout(function () {
        if (card.rarity === "SR" || card.rarity === "SSR") confetti(50);
        else confetti(16);
        host.querySelector("#gNote").innerHTML = isNew
          ? "🎉 新卡入手：<b>" + card.name + "</b>（" + card.rarity + "）！"
          : "🃏 重複的 <b>" + card.name + "</b>，已回收 +5 分。（" + card.rarity + "）";
        if (!isNew) STORE.addPts(5);
        busy = false;
        CH.refreshHud();
      }, 900);
    };
    host.querySelector("#gGo").onclick = function () { CH.goto("collection"); };
  }

  /* =======================================================
     圖鑑
     ======================================================= */
  function cardHTML(card, owned) {
    var count = STORE.s.cards[card.id] || 0;
    return '<div class="pcard r-' + card.rarity + (owned ? "" : " locked") + '">' +
      '<div class="rar">' + card.rarity + "</div>" +
      (count > 1 ? '<div class="count">×' + count + "</div>" : "") +
      '<div class="art">' + critter(card.art) + "</div>" +
      '<div class="nm">' + (owned ? card.name : "？？？") + "</div>" +
      '<div class="hp">HP ' + card.hp + " · " + card.type + "</div>" +
      '<div class="sk">' + (owned ? card.skill : "未解鎖") + "</div></div>";
  }

  function buildCollection(host) {
    var owned = Object.keys(STORE.s.cards).length;
    var total = CH.CARDS.length;
    host.innerHTML =
      '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:14px">' +
      '<span class="pill gold">收集進度 <b>' + owned + " / " + total + "</b></span>" +
      '<span class="pill violet">抽卡券 <b>' + STORE.tickets() + "</b></span>" +
      '<button class="btn small primary" id="cGo">去抽卡</button></div>' +
      '<div class="cardgrid">' + CH.CARDS.map(function (c) {
        return cardHTML(c, (STORE.s.cards[c.id] || 0) > 0);
      }).join("") + "</div>" +
      '<div class="wnote" style="margin-top:16px">全部角色都是本站原創的小精靈，收集得越多，代表你對指數律越熟 😺</div>';
    host.querySelector("#cGo").onclick = function () { CH.goto("gacha"); };
  }

  /* =======================================================
     錯題本
     ======================================================= */
  function buildWrong(host) {
    var list = STORE.s.wrong;
    if (!list.length) {
      host.innerHTML = '<div class="empty"><span class="em">🌱</span>暫時沒有錯題！<br>做小測時答錯的題目會自動收在這裡。</div>';
      return;
    }
    host.innerHTML =
      '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:14px">' +
      '<span class="pill">共 <b>' + list.length + "</b> 題</span>" +
      '<button class="btn small" id="wClear">清空錯題本</button>' +
      '<span class="wnote" style="margin:0">按「重做」再試一次，答對就會自動移除。</span></div>' +
      '<div id="wList">' + list.map(function (w, i) {
        return '<div class="wrong-item" data-id="' + w.id + '">' +
          '<div class="wq">' + w.q + "</div>" +
          '<div class="mrow"><span class="tagc">' + w.topic + "</span>" +
          '<span>你的答案：<span class="myans">' + LET[w.chosen] + ".</span></span>" +
          '<span class="corr">正確答案：' + LET[w.ans] + ". " + CH.opt(w.opts[w.ans]) + "</span></div>" +
          '<div class="wexp">💡 ' + w.exp + "</div>" +
          '<div style="margin-top:10px"><button class="btn small primary" data-retry="' + i + '">重做這題</button></div>' +
          '<div class="retrybox"></div></div>';
      }).join("") + "</div>";

    host.querySelector("#wClear").onclick = function () {
      if (confirm("確定清空所有錯題？")) { STORE.clearWrong(); buildWrong(host); toast("錯題本已清空"); }
    };

    host.querySelectorAll("[data-retry]").forEach(function (btn) {
      btn.onclick = function () {
        var w = list[+btn.dataset.retry];
        var box = btn.closest(".wrong-item").querySelector(".retrybox");
        box.innerHTML = '<div class="opts" style="margin-top:10px">' + w.opts.map(function (o, i) {
          return '<button class="opt" data-k="' + i + '"><span class="k">' + LET[i] + "</span><span>" + CH.opt(o) + "</span></button>";
        }).join("") + "</div>";
        box.querySelectorAll(".opt").forEach(function (ob) {
          ob.onclick = function () {
            var k = +ob.dataset.k;
            box.querySelectorAll(".opt").forEach(function (x, j) {
              x.disabled = true;
              if (j === w.ans) x.classList.add("right");
              if (j === k && k !== w.ans) x.classList.add("wrong");
            });
            if (k === w.ans) {
              STORE.removeWrong(w.id);
              toast("答對了！已從錯題本移除 ✅");
              confetti(12);
              setTimeout(function () { buildWrong(host); }, 700);
            } else {
              toast("再看一次解釋，然後試下一題 💪");
            }
          };
        });
      };
    });
  }

  CH.buildQuiz = buildQuiz;
  CH.buildGacha = buildGacha;
  CH.buildCollection = buildCollection;
  CH.buildWrong = buildWrong;
})();
