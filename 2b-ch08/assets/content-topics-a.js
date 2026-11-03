/* =========================================================
   2B Ch08 整數指數律 — 內容資料（上）
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 迷你數學排版：^x / ^(...) -> 上標，英文字母自動斜體 ---------- */
  function fmt(src) {
    var store = [];
    var s = src.replace(/\^\(([^()]*(?:\([^()]*\)[^()]*)*)\)|\^(-?[0-9A-Za-z]+)/g, function (m, g1, g2) {
      var inner = g1 !== undefined ? g1 : g2;
      store.push(inner);
      return "\u0001" + (store.length - 1) + "\u0002";
    });
    s = s.replace(/([A-Za-z]+)/g, "<i>$1</i>");
    s = s.replace(/\u0001(\d+)\u0002/g, function (_m, n) {
      return "<sup>" + fmt(store[+n]).replace(/-/g, "\u2212") + "</sup>";
    });
    return s;
  }
  function E(s) { return '<span class="m">' + fmt(s) + "</span>"; }
  function F(a, b) {
    return '<span class="frac"><span>' + E(a) + "</span><span>" + E(b) + "</span></span>";
  }

  /* ---------- 公式清單（累積重溫用） ---------- */
  var LAWS = [
    { no: 0, tag: "定義", name: "指數記數法", f: "a × a × … × a = a^n", e: "n 個 a 相乘", ex: "3 × 3 × 3 × 3 = 3^4 = 81", note: "a 是底數，n 是指數。a^n 不是 a × n。" },
    { no: 1, tag: "公式 1", name: "同底相乘", f: "a^m × a^n = a^(m+n)", e: "底數不變，指數相加", ex: "2^3 × 2^4 = 2^7 = 128", note: "底數必須相同才可合併；2^3 × 3^4 不能化簡。" },
    { no: 2, tag: "公式 2", name: "同底相除", f: "a^m ÷ a^n = a^(m-n)", e: "底數不變，指數相減", ex: "5^7 ÷ 5^3 = 5^4 = 625", note: "m − n 可以是 0 或負數，分別對應 a^0 與 a^-n。" },
    { no: 3, tag: "公式 3", name: "冪的冪", f: "(a^m)^n = a^(mn)", e: "括號內外的指數相乘", ex: "(3^2)^4 = 3^8", note: "與公式 1 比較：相乘是「加」，冪的冪是「乘」。" },
    { no: 4, tag: "公式 4", name: "積的冪", f: "(ab)^n = a^n b^n", e: "括號內每個因數都要 n 次方", ex: "(2x)^3 = 2^3 x^3 = 8x^3", note: "(a + b)^n ≠ a^n + b^n，加法不能這樣拆。" },
    { no: 5, tag: "公式 5", name: "商的冪", f: "(a/b)^n = a^n/b^n", e: "分子分母各自 n 次方", ex: "(2/3)^3 = 2^3/3^3 = 8/27", note: "b ≠ 0；別寫成 a^n / b。" },
    { no: 6, tag: "公式 6", name: "零指數", f: "a^0 = 1", e: "任何非零數的 0 次方都是 1", ex: "7^0 = 1，(5x)^0 = 1", note: "a ≠ 0；0^0 無定義。(-3)^0 也是 1。" },
    { no: 7, tag: "公式 7", name: "負指數", f: "a^-n = 1/a^n", e: "負指數 = 倒數", ex: "2^-3 = 1/2^3 = 1/8 = 0.125", note: "2^-3 ≠ -8；負號代表倒數，不是負數。" },
    { no: 8, tag: "定理", name: "指數方程", f: "a^m = a^n ⇒ m = n", e: "同底比較指數（a > 0，a ≠ 1）", ex: "2^x = 32 = 2^5 ⇒ x = 5", note: "先化成同底；若 a = 1 或 a = 0，不能比較指數。" },
    { no: 9, tag: "定義", name: "科學記數法", f: "x = a × 10^n，1 ≤ a < 10", e: "a 只可有一位整數位", ex: "384000 = 3.84 × 10^5", note: "12 × 10^3 不是科學記數法，因為 12 ≥ 10。" }
  ];

  /* ---------- 主題（第 1 至 5 個分頁） ---------- */
  var TOPICS = [
    {
      id: "t0", chip: "定義", title: "指數記數法", law: 0,
      kicker: "第 1 步 · 定義",
      formula: "a × a × … × a = a^n",
      lead: "同一個數不停自乘，寫起來又長又易錯。數學家發明了「指數記數法」，把一整行乘法壓縮成短短幾個符號。",
      widget: "def",
      teach: function () {
        return `
          <div class="wline" style="text-align:left">
            <div style="font-size:15px;font-weight:800;margin-bottom:8px">🔎 兩個名字要記住</div>
            <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:center;font-size:14.5px">
              <div><span style="color:#7C5CFF;font-weight:900">底數 base</span>：被乘的那個數 → 在下方 ${E("a")}</div>
              <div><span style="color:#FF5C6C;font-weight:900">指數 exponent</span>：乘了幾次 → 在右上方 ${E("n")}</div>
            </div>
          </div>
          <div class="steps">
            <div class="step">${E("3 × 3 × 3 × 3")} → 同一個數 3 重複了 <b>4</b> 次</div>
            <div class="step">寫成 ${E("3^4")}，讀作「3 的 4 次方」</div>
            <div class="step">計算：${E("3^4 = 81")}（不是 ${E("3 × 4 = 12")}！）</div>
          </div>
          <div class="warn">⚠️ 最常見錯誤：把 ${E("a^n")} 當成 ${E("a × n")}。例如 ${E("2^5 = 32")}，但 ${E("2 × 5 = 10")}，相差很遠。</div>
          <div class="ok">✅ 反過來也要識：${E("7^3")} 就是 ${E("7 × 7 × 7")}，共 3 個 7 相乘。</div>`;
      },
      tips: [
        "用「重複相乘」的語言講，不要一開始就講抽象定義。",
        "請學生指出 3⁴ 的底數與指數，並讀出來。",
        "強調 aⁿ ≠ a × n，可用 2⁵ = 32 對比 2 × 5 = 10。"
      ]
    },
    {
      id: "t1", chip: "公式 1", title: "同底相乘", law: 1,
      kicker: "第 2 步 · 指數公式 ①",
      formula: "a^m × a^n = a^(m+n)",
      lead: "底數相同時，兩堆 a 倒在一起，總數就是把兩邊的指數加起來。這條公式是整個課題的起點。",
      widget: "mul",
      teach: function () {
        return `
          <div class="steps">
            <div class="step">用定義拆開：${E("a^m")} 是 ${E("m")} 個 ${E("a")} 相乘，${E("a^n")} 是 ${E("n")} 個 ${E("a")} 相乘。</div>
            <div class="step">把它們排在一起，總共有 ${E("m + n")} 個 ${E("a")} 相乘。</div>
            <div class="step">寫回指數記數法：${E("a^(m+n)")}。所以 ${E("a^m × a^n = a^(m+n)")}。</div>
          </div>
          <div class="wline">口訣：<span class="hl">同底相乘，指數相加</span></div>
          <div class="warn">⚠️ 底數不同就不能合併：${E("2^3 × 3^4")} 已經是最簡，不等於 ${E("6^7")}。</div>
          <div class="ok">✅ 沒有寫指數即是指數 1：${E("3^2 × 3 = 3^2 × 3^1 = 3^3")}。</div>`;
      },
      tips: [
        "先用具體數字（如 2³ × 2⁴）讓學生數一數共有幾個 2。",
        "提醒係數與指數要分開處理：2x³ × 3x⁴ = 6x⁷。",
        "對比「加法」與「乘法」：aᵐ + aⁿ 不能合併。"
      ]
    },
    {
      id: "t2", chip: "公式 2", title: "同底相除", law: 2,
      kicker: "第 3 步 · 指數公式 ②",
      formula: "a^m ÷ a^n = a^(m-n)",
      lead: "除法其實是「約簡」。分子、分母各有幾個 a，可以一對一抵消，剩下多少個就寫成多少指數。",
      widget: "div",
      teach: function () {
        return `
          <div class="steps">
            <div class="step">${E("a^m ÷ a^n")} 寫成分數：${F("a × a × … × a（共 m 個）", "a × a × … × a（共 n 個）")}。</div>
            <div class="step">分子、分母可以雙雙約去 ${E("n")} 個 ${E("a")}。</div>
            <div class="step">剩下 ${E("m - n")} 個 ${E("a")}，所以答案是 ${E("a^(m-n)")}。</div>
          </div>
          <div class="wline">口訣：<span class="hl">同底相除，指數相減</span></div>
          <div class="ok">✅ 當 ${E("m = n")} 時，${E("a^n ÷ a^n = a^0")}，但實際答案是 1 — 這就是之後「零指數」的由來。</div>
          <div class="warn">⚠️ 分子指數較小時，${E("m - n")} 會是負數，例如 ${E("2^3 ÷ 2^5 = 2^-2")}，第 8 個分頁會處理。</div>`;
      },
      tips: [
        "讓學生自己把分子分母配對刪掉，看見「剩幾個」。",
        "故意問：分子分母一樣多，剩 0 個，答案是多少？（鋪路去 a⁰ = 1）",
        "提醒 aᵐ ÷ aⁿ 不是 aⁿ⁻ᵐ。"
      ]
    },
    {
      id: "t3", chip: "公式 3", title: "冪的冪", law: 3,
      kicker: "第 4 步 · 指數公式 ③",
      formula: "(a^m)^n = a^(mn)",
      lead: "括號外面再寫一個指數，代表「整個 aᵐ 再自乘 n 次」。每一份都有 m 個 a，n 份就是 m × n 個 a。",
      widget: "pow",
      teach: function () {
        return `
          <div class="steps">
            <div class="step">${E("(a^m)^n")} 的意思是：把 ${E("a^m")} 自乘 ${E("n")} 次。</div>
            <div class="step">寫開：${E("a^m × a^m × … × a^m")}（共 ${E("n")} 個）。</div>
            <div class="step">每個括號有 ${E("m")} 個 ${E("a")}，共 ${E("n")} 個括號 → 總共 ${E("mn")} 個 ${E("a")}。</div>
            <div class="step">所以 ${E("(a^m)^n = a^(mn)")}。</div>
          </div>
          <div class="wline">口訣：<span class="hl">冪的冪，指數相乘</span></div>
          <div class="warn">⚠️ 極易混淆：${E("a^m × a^n = a^(m+n)")}（加），但 ${E("(a^m)^n = a^(mn)")}（乘）。分別在於「有沒有括號」！</div>`;
      },
      tips: [
        "板書並列兩條：aᵐ × aⁿ 與 (aᵐ)ⁿ，請學生講出差別。",
        "用 (2³)² = 8² = 64 = 2⁶ 驗證。",
        "提醒 (aᵐ)ⁿ 與 a^(mⁿ) 完全不同。"
      ]
    },
    {
      id: "t4", chip: "公式 4", title: "積的冪", law: 4,
      kicker: "第 5 步 · 指數公式 ④",
      formula: "(ab)^n = a^n b^n",
      lead: "括號裡是一個「積」（乘起來的東西），外面 n 次方，等於每個因數各自 n 次方。",
      widget: "prod",
      teach: function () {
        return `
          <div class="steps">
            <div class="step">${E("(ab)^n")} = ${E("(ab)(ab)…(ab)")}（共 ${E("n")} 組）。</div>
            <div class="step">乘法可以交換次序：把所有 ${E("a")} 排在一起，所有 ${E("b")} 排在一起。</div>
            <div class="step">得到 ${E("a^n b^n")}。</div>
          </div>
          <div class="wline">口訣：<span class="hl">積的冪，逐個因數上指數</span></div>
          <div class="ok">✅ 有係數時特別好用：${E("(2x)^3 = 2^3 x^3 = 8x^3")}，記住 2 也要三次方。</div>
          <div class="warn">⚠️ 這條只適用於「乘」：${E("(a + b)^2")} 不等於 ${E("a^2 + b^2")}（取 ${E("a = b = 1")}，左邊 4、右邊 2）。</div>`;
      },
      tips: [
        "用 (2 × 3)² = 6² = 36 = 4 × 9 = 2² × 3² 建立信心。",
        "係數是最多人漏掉的部分，多練 (3x)²、(2y)⁴。",
        "強調「積」才可以拆，和不可能。"
      ]
    }
  ];

  window.CH08 = window.CH08 || {};
  window.CH08.LAWS = LAWS;
  window.CH08.TOPICS = TOPICS;
  window.CH08.E = E;
  window.CH08.F = F;
  window.CH08.fmt = fmt;
})();
