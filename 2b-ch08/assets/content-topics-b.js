/* =========================================================
   2B Ch08 整數指數律 — 內容資料（下）
   ========================================================= */
(function () {
  "use strict";
  var E = window.CH08.E, F = window.CH08.F;

  window.CH08.TOPICS = window.CH08.TOPICS.concat([
    {
      id: "t5", chip: "公式 5", title: "商的冪", law: 5,
      kicker: "第 6 步 · 指數公式 ⑤",
      formula: "(a/b)^n = a^n / b^n",
      lead: "分數的 n 次方，就是分子、分母各自 n 次方。跟「積的冪」是同一家人。",
      widget: "quot",
      teach: function () {
        return `
          <div class="steps">
            <div class="step">${E("(a/b)^n")} 表示 ${E("n")} 個 ${F("a", "b")} 相乘。</div>
            <div class="step">分數相乘：分子乘分子、分母乘分母。</div>
            <div class="step">分子共有 ${E("n")} 個 ${E("a")}，分母共有 ${E("n")} 個 ${E("b")} → ${E("a^n / b^n")}。</div>
          </div>
          <div class="wline">口訣：<span class="hl">商的冪，上下各自上指數</span></div>
          <div class="ok">✅ 例：${E("(2/3)^3 = 2^3/3^3 = 8/27")}。</div>
          <div class="warn">⚠️ 別只對分子取冪：${E("(2/3)^3 ≠ 8/3")}。另外 ${E("b ≠ 0")}，否則分母無意義。</div>`;
      },
      tips: [
        "與公式 4 一起講：積與商都是「逐件上指數」。",
        "用 (3/4)² = 9/16 讓學生自行計算分子分母。",
        "提醒答案要約至最簡。"
      ]
    },
    {
      id: "t6", chip: "公式 6", title: "零指數", law: 6,
      kicker: "第 7 步 · 指數公式 ⑥",
      formula: "a^0 = 1",
      lead: "為什麼 0 次方會等於 1 而不是 0？答案藏在「同底相除」裡 —— 不用背，可以推出來。",
      widget: "zero",
      teach: function () {
        return `
          <div class="steps">
            <div class="step">任何數除以自己等於 1：${E("a^3 ÷ a^3 = 1")}。</div>
            <div class="step">用公式 2：${E("a^3 ÷ a^3 = a^(3-3) = a^0")}。</div>
            <div class="step">同一個算式，兩個答案 → ${E("a^0 = 1")}（只要 ${E("a ≠ 0")}）。</div>
          </div>
          <div class="wline">口訣：<span class="hl">零次方 = 1（底數不可為 0）</span></div>
          <div class="ok">✅ 有係數也一樣：${E("(5x)^0 = 1")}，${E("(2/7)^0 = 1")}，${E("(-3)^0 = 1")}。</div>
          <div class="warn">⚠️ ${E("0^0")} 無定義；而 ${E("-3^0")}（沒有括號）是 ${E("-(3^0) = -1")}，要小心。</div>`;
      },
      tips: [
        "不要叫學生死背，用除法推導一次。",
        "用數列觀察：a³=8, a²=4, a¹=2, a⁰=? 每次 ÷2。",
        "強調 0⁰ 無定義，(−3)⁰ = 1。"
      ]
    },
    {
      id: "t7", chip: "公式 7", title: "負指數", law: 7,
      kicker: "第 8 步 · 指數公式 ⑦",
      formula: "a^-n = 1/a^n",
      lead: "把除法一路做下去，指數會變成負數。負指數不是「負數」，而是「倒數」。",
      widget: "neg",
      teach: function () {
        return `
          <div class="steps">
            <div class="step">由公式 2：${E("a^0 ÷ a^n = a^(0-n) = a^-n")}。</div>
            <div class="step">另一方面 ${E("a^0 ÷ a^n = 1 ÷ a^n")} ${E("= 1/a^n")}。</div>
            <div class="step">所以 ${E("a^-n = 1/a^n")}（${E("a ≠ 0")}）。</div>
          </div>
          <div class="wline">口訣：<span class="hl">負指數 = 倒數，指數變正</span></div>
          <div class="ok">✅ ${E("2^-3 = 1/2^3 = 1/8")}；${E("(2/3)^-2 = (3/2)^2 = 9/4")}（整個分數倒轉）。</div>
          <div class="warn">⚠️ ${E("2^-3 ≠ -8")}，亦不等於 ${E("-2^3")}。負號在指數位置，代表「倒數」，不是「負數」。</div>`;
      },
      tips: [
        "先示範數列：2³=8, 2²=4, 2¹=2, 2⁰=1, 2⁻¹=?, 2⁻²=?（每次 ÷2）。",
        "用「倒數」的生活語言：負指數就是把數「反轉」。",
        "提醒分數的負指數要整個倒轉：(2/3)⁻² = (3/2)²。"
      ]
    },
    {
      id: "t8", chip: "定理", title: "解指數方程", law: 8,
      kicker: "第 9 步 · 定理",
      formula: "a^m = a^n ⇒ m = n",
      lead: "如果兩個同底的冪相等，指數就一定相等。解題時，先想辦法把兩邊變成同一個底。",
      widget: "eq",
      teach: function () {
        return `
          <div class="steps">
            <div class="step"><b>第一步</b>：把兩邊化成同一個底數（用公式 1–7 幫忙）。</div>
            <div class="step"><b>第二步</b>：比較指數，寫出方程。</div>
            <div class="step"><b>第三步</b>：解方程，驗算。</div>
          </div>
          <div class="wline" style="text-align:left">
            <div style="font-size:14px">例：${E("2^x = 32")}</div>
            <div style="font-size:14px">→ ${E("2^x = 2^5")}（因為 ${E("32 = 2^5")}）</div>
            <div style="font-size:14px">→ ${E("x = 5")}</div>
          </div>
          <div class="ok">✅ 有時要先換底：${E("9^x = 3^4")} → ${E("(3^2)^x = 3^4")} → ${E("3^(2x) = 3^4")} → ${E("x = 2")}。</div>
          <div class="warn">⚠️ 條件是 ${E("a > 0")} 且 ${E("a ≠ 1")}。例如 ${E("1^3 = 1^7")}，但明顯 ${E("3 ≠ 7")}，所以底數是 1 時不能比較指數。</div>`;
      },
      tips: [
        "養成「先問：兩邊底數一樣嗎？」的習慣。",
        "常見要換底：4 = 2²、8 = 2³、9 = 3²、25 = 5²、1/8 = 2⁻³。",
        "提醒最後要驗算，並留意指數是負數或分數的情況。"
      ]
    },
    {
      id: "t9", chip: "定義", title: "科學記數法", law: 9,
      kicker: "第 10 步 · 定義",
      formula: "x = a × 10^n，1 ≤ a < 10",
      lead: "很大或很小的數（地球質量、細菌長度）用科學記數法最方便：一個 1 至 10 之間的數，乘上 10 的整數次方。",
      widget: "sci",
      teach: function () {
        return `
          <div class="steps">
            <div class="step">把數寫成 ${E("a × 10^n")}，其中 ${E("1 ≤ a < 10")}，${E("n")} 是整數。</div>
            <div class="step">大於 10 的數：小數點向左移，${E("n")} 為正。${E("384000 = 3.84 × 10^5")}。</div>
            <div class="step">小於 1 的數：小數點向右移，${E("n")} 為負。${E("0.00062 = 6.2 × 10^-4")}。</div>
          </div>
          <div class="wline">檢查口訣：<span class="hl">a 只可有一位整數位（1 至 9.999…）</span></div>
          <div class="ok">✅ ${E("5.02 × 10^3 = 5020")}；${E("7 × 10^-2 = 0.07")}。</div>
          <div class="warn">⚠️ ${E("34 × 10^3")}、${E("0.5 × 10^6")} 都<b>不是</b>科學記數法，因為 ${E("a")} 不在 1 與 10 之間。</div>`;
      },
      tips: [
        "用小數點「跳位」的動畫幫助理解 n 的正負。",
        "提醒 1 ≤ a < 10 不包括 10；a 可以是 1。",
        "與負指數連結：10⁻⁴ 就是 1/10⁴。"
      ]
    }
  ]);
})();
