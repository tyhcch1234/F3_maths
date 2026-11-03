/* =========================================================
   互動教具
   ========================================================= */
(function () {
  "use strict";
  var E = window.CH08.E, F = window.CH08.F;

  function tok(ch, cls) { return '<span class="tok ' + (cls || "") + '">' + ch + "</span>"; }
  function q(host, sel) { return host.querySelector(sel); }
  function box(label, id, extra) {
    return '<div style="border:2px dashed #DCCFBD;border-radius:14px;padding:8px 10px;background:#fff;' + (extra || "") + '">' +
      '<div style="font-size:11.5px;font-weight:900;color:#5B5470;letter-spacing:.4px;margin-bottom:4px">' + label + "</div>" +
      '<div class="tokrow" id="' + id + '"></div></div>';
  }
  function rep(n, s) { var o = []; for (var i = 0; i < n; i++) o.push(s); return o.join(""); }

  var W = {};

  /* ---------------- 1. 定義 ---------------- */
  W.def = function (host) {
    host.innerHTML =
      '<div class="wtitle"><span class="dot"></span>動手試：拖一拖，看看「重複相乘」</div>' +
      '<div class="controls">' +
      '<label class="ctrl">底數 a <input id="wDB" type="range" min="2" max="9" value="3"><output id="wDBV">3</output></label>' +
      '<label class="ctrl">指數 n <input id="wDE" type="range" min="1" max="6" value="4"><output id="wDEV">4</output></label>' +
      "</div>" +
      '<div class="stage"><div class="tokrow" id="wDT"></div>' +
      '<div class="wline" id="wDL"></div>' +
      '<div class="wnote" id="wDN"></div></div>';
    var b = q(host, "#wDB"), e = q(host, "#wDE");
    function draw() {
      var a = +b.value, n = +e.value, v = Math.pow(a, n);
      q(host, "#wDBV").textContent = a; q(host, "#wDEV").textContent = n;
      q(host, "#wDT").innerHTML = rep(n, tok(a, "b"));
      q(host, "#wDL").innerHTML = E(new Array(n).fill(a).join(" × ") + " = " + a + "^" + n + " = " + v);
      q(host, "#wDN").innerHTML = "底數 <b>" + a + "</b>，指數 <b>" + n + "</b> → " + n + " 個 " + a + " 相乘，答案是 <b>" + v + "</b>。";
    }
    b.oninput = draw; e.oninput = draw; draw();
  };

  /* ---------------- 2. 同底相乘 ---------------- */
  W.mul = function (host) {
    host.innerHTML =
      '<div class="wtitle"><span class="dot"></span>動手試：兩堆 a 合併起來</div>' +
      '<div class="controls">' +
      '<label class="ctrl">指數 m <input id="wMM" type="range" min="1" max="5" value="3"><output id="wMMV">3</output></label>' +
      '<label class="ctrl">指數 n <input id="wMN" type="range" min="1" max="5" value="4"><output id="wMNV">4</output></label>' +
      '<button class="btn small primary" id="wMG">合併兩堆 →</button>' +
      "</div>" +
      '<div class="stage">' +
      '<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center" id="wMGroups">' +
      box("第一堆：a<sup>m</sup>", "wMG1") +
      '<span class="mulsign">×</span>' +
      box("第二堆：a<sup>n</sup>", "wMG2") +
      "</div>" +
      '<div class="wline" id="wML"></div>' +
      '<div class="wnote" id="wMNote"></div></div>';
    var m = q(host, "#wMM"), n = q(host, "#wMN"), merged = false;
    function draw() {
      var M = +m.value, N = +n.value;
      q(host, "#wMMV").textContent = M; q(host, "#wMNV").textContent = N;
      q(host, "#wMG1").innerHTML = rep(M, tok("a", "p"));
      q(host, "#wMG2").innerHTML = rep(N, tok("a", "b"));
      q(host, "#wMGroups").style.display = "flex";
      q(host, "#wMG").style.display = "";
      if (merged) {
        q(host, "#wMGroups").innerHTML = box(M + " + " + N + " 個 a 全部排在一起", "wMG3");
        q(host, "#wMG3").innerHTML = rep(M, tok("a", "p")) + rep(N, tok("a", "b"));
        q(host, "#wML").innerHTML = E("a^m × a^n = a^(" + M + "+" + N + ") = a^" + (M + N));
        q(host, "#wMNote").innerHTML = "底數 a 沒有變，只是把指數 <b>" + M + "</b> 和 <b>" + N + "</b> 加起來 → <b>" + (M + N) + "</b> 個 a。";
        q(host, "#wMG").style.display = "none";
      } else {
        q(host, "#wMGroups").innerHTML = box("第一堆：a<sup>m</sup>", "wMG1") + '<span class="mulsign">×</span>' + box("第二堆：a<sup>n</sup>", "wMG2");
        q(host, "#wMG1").innerHTML = rep(M, tok("a", "p"));
        q(host, "#wMG2").innerHTML = rep(N, tok("a", "b"));
        q(host, "#wML").innerHTML = E("a^m × a^n = ?");
        q(host, "#wMNote").textContent = "先數一數：左邊有 " + M + " 個 a，右邊有 " + N + " 個 a。按「合併兩堆」看看總共有多少個。";
      }
    }
    m.oninput = function () { merged = false; draw(); };
    n.oninput = function () { merged = false; draw(); };
    q(host, "#wMG").onclick = function () { merged = true; draw(); };
    draw();
  };

  /* ---------------- 3. 同底相除 ---------------- */
  W.div = function (host) {
    host.innerHTML =
      '<div class="wtitle"><span class="dot"></span>動手試：約簡（抵消）</div>' +
      '<div class="controls">' +
      '<label class="ctrl">分子 m <input id="wVM" type="range" min="2" max="7" value="6"><output id="wVMV">6</output></label>' +
      '<label class="ctrl">分母 n <input id="wVN" type="range" min="1" max="5" value="4"><output id="wVNV">4</output></label>' +
      '<button class="btn small primary" id="wVG">約簡 →</button>' +
      "</div>" +
      '<div class="stage"><div id="wVStage"></div><div class="wline" id="wVL"></div>' +
      '<div class="wnote" id="wVNote"></div></div>';
    var m = q(host, "#wVM"), n = q(host, "#wVN"), cut = false;
    function draw() {
      var M = +m.value, N = Math.min(+n.value, M - 1);
      n.value = N;
      q(host, "#wVMV").textContent = M; q(host, "#wVNV").textContent = N;
      var top = "", bot = "";
      for (var i = 0; i < M; i++) top += tok("a", i < N && cut ? "p cut" : "p");
      for (var j = 0; j < N; j++) bot += tok("a", cut ? "b cut" : "b");
      q(host, "#wVStage").innerHTML =
        '<div style="text-align:center"><div class="tokrow" style="justify-content:center">' + top + "</div>" +
        '<div style="border-top:3px solid #2E2A3B;margin:8px 4px"></div>' +
        '<div class="tokrow" style="justify-content:center">' + bot + "</div></div>";
      if (cut) {
        q(host, "#wVL").innerHTML = E("a^" + M + " ÷ a^" + N + " = a^(" + M + "-" + N + ") = a^" + (M - N));
        q(host, "#wVNote").innerHTML = "上下各抵消 <b>" + N + "</b> 個 a，剩下 <b>" + (M - N) + "</b> 個 → 指數相減：" + M + " − " + N + " = " + (M - N) + "。";
      } else {
        q(host, "#wVL").innerHTML = E("a^" + M + " ÷ a^" + N + " = ?");
        q(host, "#wVNote").textContent = "上面有 " + M + " 個 a，下面有 " + N + " 個 a。按「約簡」把可以配對的刪去。";
      }
    }
    m.oninput = function () { cut = false; draw(); };
    n.oninput = function () { cut = false; draw(); };
    q(host, "#wVG").onclick = function () { cut = true; draw(); };
    draw();
  };

  /* ---------------- 4. 冪的冪 ---------------- */
  W.pow = function (host) {
    host.innerHTML =
      '<div class="wtitle"><span class="dot"></span>動手試：一層一層數</div>' +
      '<div class="controls">' +
      '<label class="ctrl">內層 m <input id="wPM" type="range" min="1" max="4" value="3"><output id="wPMV">3</output></label>' +
      '<label class="ctrl">外層 n <input id="wPN" type="range" min="1" max="4" value="3"><output id="wPNV">3</output></label>' +
      "</div>" +
      '<div class="stage"><div id="wPGrid"></div><div class="wline" id="wPL"></div>' +
      '<div class="wnote" id="wPNote"></div></div>';
    var m = q(host, "#wPM"), n = q(host, "#wPN");
    function draw() {
      var M = +m.value, N = +n.value, html = "";
      q(host, "#wPMV").textContent = M; q(host, "#wPNV").textContent = N;
      for (var r = 0; r < N; r++) {
        html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">' +
          '<span style="font-size:11.5px;font-weight:900;color:#7C5CFF;min-width:46px">第 ' + (r + 1) + " 組</span>" +
          '<div class="tokrow">' + rep(M, tok("a", "b")) + "</div></div>";
      }
      q(host, "#wPGrid").innerHTML = html;
      q(host, "#wPL").innerHTML = E("(a^" + M + ")^" + N + " = a^(" + M + "×" + N + ") = a^" + (M * N));
      q(host, "#wPNote").innerHTML = "共 <b>" + N + "</b> 組，每組有 <b>" + M + "</b> 個 a → " + N + " × " + M + " = <b>" + (M * N) + "</b> 個 a。所以指數是 <b>相乘</b>，不是相加。";
    }
    m.oninput = draw; n.oninput = draw; draw();
  };

  /* ---------------- 5. 積的冪 ---------------- */
  W.prod = function (host) {
    host.innerHTML =
      '<div class="wtitle"><span class="dot"></span>動手試：括號裡的東西各自上指數</div>' +
      '<div class="controls">' +
      '<label class="ctrl">指數 n <input id="wRN" type="range" min="1" max="4" value="3"><output id="wRNV">3</output></label>' +
      '<button class="btn small primary" id="wRG">拆開括號 →</button>' +
      "</div>" +
      '<div class="stage"><div id="wRStage"></div><div class="wline" id="wRL"></div>' +
      '<div class="wnote" id="wRNote"></div></div>';
    var n = q(host, "#wRN"), open = false;
    function draw() {
      var N = +n.value, i, html = "";
      q(host, "#wRNV").textContent = N;
      if (!open) {
        for (i = 0; i < N; i++) {
          html += '<div class="unit" style="margin:4px"><div class="cap">(2 × 3)</div><span class="m">' + "2 × 3" + "</span></div>";
          if (i < N - 1) html += '<span class="mulsign">×</span>';
        }
        q(host, "#wRStage").innerHTML = '<div class="repeatbox" style="justify-content:center">' + html + "</div>";
        q(host, "#wRL").innerHTML = E("(2 × 3)^" + N + " = ?");
        q(host, "#wRNote").textContent = "有 " + N + " 個括號相乘，每個括號是 2 × 3。按「拆開括號」看看。";
      } else {
        q(host, "#wRStage").innerHTML =
          '<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;align-items:center">' +
          box("2 的冪：2<sup>" + N + "</sup>", "wR2") + '<span class="mulsign">×</span>' + box("3 的冪：3<sup>" + N + "</sup>", "wR3") +
          "</div>";
        q(host, "#wR2").innerHTML = rep(N, tok("2", "b"));
        q(host, "#wR3").innerHTML = rep(N, tok("3", "p"));
        q(host, "#wRL").innerHTML = E("(2 × 3)^" + N + " = 2^" + N + " × 3^" + N + " = " + Math.pow(2, N) + " × " + Math.pow(3, N) + " = " + Math.pow(6, N));
        q(host, "#wRNote").innerHTML = "所有 2 排在一起（共 " + N + " 個），所有 3 排在一起（共 " + N + " 個）。所以每個因數都要 " + N + " 次方。";
      }
    }
    n.oninput = function () { open = false; draw(); };
    q(host, "#wRG").onclick = function () { open = true; draw(); };
    draw();
  };

  /* ---------------- 6. 商的冪 ---------------- */
  W.quot = function (host) {
    host.innerHTML =
      '<div class="wtitle"><span class="dot"></span>動手試：分數的次方</div>' +
      '<div class="controls">' +
      '<label class="ctrl">指數 n <input id="wQN" type="range" min="1" max="4" value="3"><output id="wQNV">3</output></label>' +
      '<button class="btn small primary" id="wQG">合併 →</button>' +
      "</div>" +
      '<div class="stage"><div id="wQStage"></div><div class="wline" id="wQL"></div>' +
      '<div class="wnote" id="wQNote"></div></div>';
    var n = q(host, "#wQN"), merged = false;
    function frac(a, b) { return '<span class="frac"><span>' + a + "</span><span>" + b + "</span></span>"; }
    function draw() {
      var N = +n.value, i, html = "";
      q(host, "#wQNV").textContent = N;
      if (!merged) {
        for (i = 0; i < N; i++) {
          html += '<span class="m" style="font-size:1.3em">' + frac(2, 3) + "</span>";
          if (i < N - 1) html += '<span class="mulsign">×</span>';
        }
        q(host, "#wQStage").innerHTML = '<div class="repeatbox" style="justify-content:center">' + html + "</div>";
        q(host, "#wQL").innerHTML = E("(2/3)^" + N + " = ?");
        q(host, "#wQNote").textContent = "有 " + N + " 個 2/3 相乘。按「合併」看看分子分母各自變成什麼。";
      } else {
        q(host, "#wQStage").innerHTML =
          '<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">' +
          box("分子：2 自乘 " + N + " 次", "wQa") + box("分母：3 自乘 " + N + " 次", "wQb") + "</div>";
        q(host, "#wQa").innerHTML = rep(N, tok("2", "b"));
        q(host, "#wQb").innerHTML = rep(N, tok("3", "p"));
        q(host, "#wQL").innerHTML = E("(2/3)^" + N + " = 2^" + N + " / 3^" + N + " = " + Math.pow(2, N) + "/" + Math.pow(3, N));
        q(host, "#wQNote").innerHTML = "分子 " + N + " 個 2 → 2<sup>" + N + "</sup>；分母 " + N + " 個 3 → 3<sup>" + N + "</sup>。上下都要上指數。";
      }
    }
    n.oninput = function () { merged = false; draw(); };
    q(host, "#wQG").onclick = function () { merged = true; draw(); };
    draw();
  };

  /* ---------------- 7. 零指數 ---------------- */
  W.zero = function (host) {
    host.innerHTML =
      '<div class="wtitle"><span class="dot"></span>動手試：一路除下去，看到 0 次方</div>' +
      '<div class="controls">' +
      '<label class="ctrl">底數 a <input id="wZB" type="range" min="2" max="5" value="3"><output id="wZBV">3</output></label>' +
      '<button class="btn small primary" id="wZGo">÷ a 再除一次</button>' +
      '<button class="btn small" id="wZRs">重設</button>' +
      "</div>" +
      '<div class="stage"><table class="mini-table" id="wZTable"></table>' +
      '<div class="wline" id="wZL"></div><div class="wnote" id="wZNote"></div></div>';
    var b = q(host, "#wZB"), step = 0, maxStep = 4;
    function draw() {
      var a = +b.value, i, rows = "", v;
      q(host, "#wZBV").textContent = a;
      for (i = 0; i <= maxStep; i++) {
        var k = maxStep - i;
        v = Math.pow(a, k);
        var shown = i <= step;
        rows += "<tr" + (shown && i === step ? ' class="now"' : "") + ' style="' + (shown ? "" : "opacity:.35") + '">' +
          "<td>" + E(a + "^" + k) + "</td><td>" + (shown ? (i === 0 ? v : "÷ " + a + " → " + v) : "？") + "</td></tr>";
      }
      q(host, "#wZTable").innerHTML = "<tr><th>冪</th><th>值</th></tr>" + rows;
      if (step >= maxStep) {
        q(host, "#wZL").innerHTML = E("a^0 = 1") + ' <span style="font-size:14px">（a ≠ 0）</span>';
        q(host, "#wZNote").innerHTML = "每次 ÷ " + a + "，指數減 1。除到指數 0 時，數值剛好是 <b>1</b>。所以 <b>a⁰ = 1</b>，不是 0！";
      } else {
        q(host, "#wZL").innerHTML = E("a^" + (maxStep - step) + " ÷ a = a^" + (maxStep - step - 1));
        q(host, "#wZNote").innerHTML = "再除一次 " + a + "，指數就會減 1。留意數值怎樣變化。";
      }
    }
    b.oninput = function () { step = 0; draw(); };
    q(host, "#wZGo").onclick = function () { if (step < maxStep) step++; draw(); };
    q(host, "#wZRs").onclick = function () { step = 0; draw(); };
    draw();
  };

  /* ---------------- 8. 負指數 ---------------- */
  W.neg = function (host) {
    host.innerHTML =
      '<div class="wtitle"><span class="dot"></span>動手試：負指數＝倒數</div>' +
      '<div class="controls">' +
      '<label class="ctrl">底數 a <input id="wNB" type="range" min="2" max="5" value="2"><output id="wNBV">2</output></label>' +
      '<label class="ctrl">指數 −n <input id="wNN" type="range" min="1" max="5" value="3"><output id="wNNV">-3</output></label>' +
      "</div>" +
      '<div class="stage"><div class="repeatbox" style="justify-content:center;font-size:1.25em" id="wNBox"></div>' +
      '<div class="wline" id="wNL"></div><div class="wnote" id="wNNote"></div></div>';
    var b = q(host, "#wNB"), n = q(host, "#wNN");
    function draw() {
      var a = +b.value, N = +n.value, v = Math.pow(a, -N);
      q(host, "#wNBV").textContent = a; q(host, "#wNNV").textContent = "-" + N;
      q(host, "#wNBox").innerHTML =
        '<div class="unit" style="min-width:84px"><div class="cap">有負指數</div>' + E(a + "^-" + N) + "</div>" +
        '<span class="mulsign">=</span>' +
        '<div class="unit" style="min-width:84px"><div class="cap">倒數</div><span class="m" style="font-size:1.1em">' + F("1", a + "^" + N) + "</span></div>" +
        '<span class="mulsign">=</span>' +
        '<div class="unit" style="min-width:84px"><div class="cap">數值</div><span class="m">' + v + "</span></div>";
      q(host, "#wNL").innerHTML = E(a + "^-" + N + " = 1/" + a + "^" + N + " = " + v);
      q(host, "#wNNote").innerHTML = "負號只在指數上 → 變成<b>倒數</b>，指數變正。絕對不是 " + (-Math.pow(a, N)) + "！";
    }
    b.oninput = draw; n.oninput = draw; draw();
  };

  /* ---------------- 9. 指數方程 ---------------- */
  W.eq = function (host) {
    var sets = [
      { p: "2^x = 32", steps: ["把 32 寫成 2 的冪：32 = 2^5", "所以 2^x = 2^5", "底數相同 → 比較指數：x = 5"] },
      { p: "3^(x+1) = 81", steps: ["81 = 3^4", "所以 3^(x+1) = 3^4", "指數相等：x + 1 = 4", "x = 3"] },
      { p: "5^x = 1/25", steps: ["1/25 = 1/5^2 = 5^-2（負指數）", "所以 5^x = 5^-2", "x = -2"] },
      { p: "9^x = 3^4", steps: ["換底：9 = 3^2", "(3^2)^x = 3^4 → 3^(2x) = 3^4", "2x = 4", "x = 2"] }
    ];
    var cur = 0, shown = 0;
    host.innerHTML =
      '<div class="wtitle"><span class="dot"></span>動手試：一步一步解方程</div>' +
      '<div class="controls" id="wEC">' +
      sets.map(function (s, i) { return '<button class="btn small' + (i === 0 ? " primary" : "") + '" data-i="' + i + '">' + E(s.p) + "</button>"; }).join("") +
      "</div>" +
      '<div class="stage"><div class="wline" id="wEQ" style="font-size:1.2em"></div>' +
      '<div class="steps" id="wES"></div>' +
      '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn small primary" id="wEN">下一步 →</button><button class="btn small" id="wER">重頭開始</button></div></div>';
    function draw() {
      var s = sets[cur];
      q(host, "#wEQ").innerHTML = E(s.p);
      var html = "";
      for (var i = 0; i < shown; i++) html += '<div class="step reveal">' + E(s.steps[i]) + "</div>";
      q(host, "#wES").innerHTML = html || '<div class="wnote" style="margin:0">按「下一步」，看看怎樣把兩邊變成同底。</div>';
      q(host, "#wEN").disabled = shown >= s.steps.length;
    }
    host.querySelectorAll("#wEC button").forEach(function (btn) {
      btn.onclick = function () {
        host.querySelectorAll("#wEC button").forEach(function (x) { x.classList.remove("primary"); });
        btn.classList.add("primary");
        cur = +btn.dataset.i; shown = 0; draw();
      };
    });
    q(host, "#wEN").onclick = function () { if (shown < sets[cur].steps.length) shown++; draw(); };
    q(host, "#wER").onclick = function () { shown = 0; draw(); };
    draw();
  };

  /* ---------------- 10. 科學記數法 ---------------- */
  W.sci = function (host) {
    host.innerHTML =
      '<div class="wtitle"><span class="dot"></span>動手試：小數點搬家</div>' +
      '<div class="controls">' +
      '<label class="ctrl">輸入一個正數 <input id="wSIn" type="text" inputmode="decimal" value="384000" style="width:130px;border:2px solid #E0D4C2;border-radius:9px;padding:4px 8px;font-family:inherit;font-weight:800"></label>' +
      '<button class="btn small" data-p="384000">384000</button>' +
      '<button class="btn small" data-p="0.00062">0.00062</button>' +
      '<button class="btn small" data-p="70">70</button>' +
      '<button class="btn small" data-p="0.00403">0.00403</button>' +
      "</div>" +
      '<div class="stage"><div id="wSOut"></div><div class="wline" id="wSL"></div><div class="wnote" id="wSN"></div></div>';
    var inp = q(host, "#wSIn");
    function draw() {
      var raw = inp.value.replace(/,/g, "").trim();
      var x = Number(raw);
      if (!raw || !isFinite(x) || x <= 0) {
        q(host, "#wSOut").innerHTML = '<div class="wnote" style="margin:0">請輸入一個大於 0 的數。</div>';
        q(host, "#wSL").innerHTML = ""; q(host, "#wSN").innerHTML = ""; return;
      }
      var exp = Math.floor(Math.log10(x));
      var a = x / Math.pow(10, exp);
      a = parseFloat(a.toPrecision(10));
      if (a >= 10) { a = parseFloat((a / 10).toPrecision(10)); exp++; }
      if (a < 1) { a = parseFloat((a * 10).toPrecision(10)); exp--; }
      var ok = a >= 1 && a < 10;
      q(host, "#wSOut").innerHTML =
        '<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;align-items:center">' +
        '<div class="unit" style="min-width:120px"><div class="cap">原本的數</div><span class="m" style="font-size:1.15em">' + raw + "</span></div>" +
        '<span class="mulsign">=</span>' +
        '<div class="unit" style="min-width:110px"><div class="cap">a 要在 1 與 10 之間</div><span class="m" style="font-size:1.15em">' + a + "</span></div>" +
        '<span class="mulsign">×</span>' +
        '<div class="unit" style="min-width:90px"><div class="cap">10 的次方</div><span class="m" style="font-size:1.15em">10<sup>' + exp + "</sup></span></div></div>";
      q(host, "#wSL").innerHTML = E(raw + " = " + a + " × 10^" + exp);
      q(host, "#wSN").innerHTML = (exp > 0
        ? "小數點向<b>左</b>移 " + exp + " 位 → 指數是正數 " + exp + "。"
        : exp < 0 ? "小數點向<b>右</b>移 " + (-exp) + " 位 → 指數是負數 " + exp + "。"
          : "本身已是一位整數，指數是 0。") +
        (ok ? ' <span style="color:#0C7B5F;font-weight:900">✔ 符合 1 ≤ a &lt; 10</span>' : "");
    }
    inp.oninput = draw;
    host.querySelectorAll("[data-p]").forEach(function (b) {
      b.onclick = function () { inp.value = b.dataset.p; draw(); };
    });
    draw();
  };

  window.CH08.WIDGETS = W;
})();
