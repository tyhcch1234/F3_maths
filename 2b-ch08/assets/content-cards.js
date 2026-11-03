/* =========================================================
   2B Ch08 — 指數小精靈卡（原創角色）
   ========================================================= */
(function () {
  "use strict";

  var CARDS = [
    /* ---- N ---- */
    { id: "c01", name: "指數豆", rarity: "N", hp: 30, type: "草", skill: "萌芽：每次自乘，身體大一倍。",
      quote: "我只是一粒豆，但我可以×2×2×2……", art: { body: "#8FD96B", shade: "#5FB33F", eyes: "dot", ears: "leaf", extra: "none" } },
    { id: "c02", name: "底數龜", rarity: "N", hp: 45, type: "水", skill: "硬殼：底數永遠不動，只改指數。",
      quote: "慢慢爬，但我是所有數字的地基。", art: { body: "#7BD3D0", shade: "#3FA8A5", eyes: "sleepy", ears: "none", extra: "none" } },
    { id: "c03", name: "加號蟲", rarity: "N", hp: 25, type: "蟲", skill: "指數相加：同底相乘時偷偷加數。",
      quote: "兩條觸鬚，一條加左，一條加右。", art: { body: "#FFA8C8", shade: "#F06C9B", eyes: "dot", ears: "antenna", extra: "none" } },
    { id: "c04", name: "小括號", rarity: "N", hp: 35, type: "普", skill: "抱住：把整個式子包起來再上指數。",
      quote: "沒有我，指數就會走錯位置。", art: { body: "#C3B4FF", shade: "#8E77F0", eyes: "star", ears: "horn", extra: "none" } },

    /* ---- R ---- */
    { id: "c05", name: "冪次喵", rarity: "R", hp: 60, type: "火", skill: "喵之冪：一層括號，一層力量。",
      quote: "（我）的三次方，就是三隻我。", art: { body: "#FFC06B", shade: "#F0912B", eyes: "dot", ears: "cat", extra: "none" } },
    { id: "c06", name: "負號狐", rarity: "R", hp: 55, type: "暗", skill: "倒數術：把對手整個反轉。",
      quote: "我不是負數，我只是喜歡倒轉。", art: { body: "#FF9F8C", shade: "#E4624A", eyes: "sleepy", ears: "cat", extra: "none" } },
    { id: "c07", name: "零蛋鳥", rarity: "R", hp: 40, type: "風", skill: "歸一：任何數的零次方，都變成一。",
      quote: "我明明是零，但答案是一。", art: { body: "#9BD9FF", shade: "#4FA9E8", eyes: "star", ears: "none", extra: "beak" } },
    { id: "c08", name: "科學鴨", rarity: "R", hp: 65, type: "智", skill: "記數法：把小數點搬來搬去。",
      quote: "嘎！3.84 × 10⁵，搞定。", art: { body: "#FFE07A", shade: "#E0AE1F", eyes: "dot", ears: "none", extra: "cap" } },

    /* ---- SR ---- */
    { id: "c09", name: "同底雙子", rarity: "SR", hp: 90, type: "光", skill: "共底共鳴：底數相同，指數相加。",
      quote: "我們長得一樣，所以可以合體！", art: { body: "#B49CFF", shade: "#6A4CE0", eyes: "star", ears: "rabbit", extra: "none" } },
    { id: "c10", name: "除號龍", rarity: "SR", hp: 100, type: "龍", skill: "約簡吐息：一對一抵消。",
      quote: "你上面十個，我下面四個，剩六個。", art: { body: "#7BE0BF", shade: "#1FA383", eyes: "sparkle", ears: "horn", extra: "none" } },
    { id: "c11", name: "積冪熊", rarity: "SR", hp: 110, type: "地", skill: "分身鎚：每個因數都變 n 次方。",
      quote: "(2x)³？我幫你拆成 8x³。", art: { body: "#D6A87C", shade: "#A5713F", eyes: "dot", ears: "bear", extra: "glasses" } },
    { id: "c12", name: "分數兔", rarity: "SR", hp: 85, type: "冰", skill: "上下開花：分子分母各自上指數。",
      quote: "(2/3)³ = 8/27，上下都要。", art: { body: "#FFC2DE", shade: "#E86AA6", eyes: "dot", ears: "rabbit", extra: "bow" } },

    /* ---- SSR ---- */
    { id: "c13", name: "指數魔王", rarity: "SSR", hp: 160, type: "暗", skill: "無限乘方：所有指數律由他掌管。",
      quote: "想挑戰我？先把七條公式背熟。", art: { body: "#8C6BE8", shade: "#4A2C9E", eyes: "sparkle", ears: "devil", extra: "crown" } },
    { id: "c14", name: "零次女神", rarity: "SSR", hp: 150, type: "光", skill: "歸一聖光：一切歸於 1。",
      quote: "無論你多大，零次方之後都一樣。", art: { body: "#FFE3A3", shade: "#E2A72E", eyes: "star", ears: "none", extra: "wings" } },
    { id: "c15", name: "負冪黑貓", rarity: "SSR", hp: 155, type: "暗", skill: "倒數翻面：a⁻ⁿ = 1/aⁿ。",
      quote: "喵～把你自己倒過來。", art: { body: "#6B6478", shade: "#3A3446", eyes: "sparkle", ears: "cat", extra: "crown" } },
    { id: "c16", name: "十次方王", rarity: "SSR", hp: 170, type: "雷", skill: "十進王權：小數點隨他命令移動。",
      quote: "1 ≤ a < 10，這是我的法律。", art: { body: "#8FD3FF", shade: "#2F86D6", eyes: "star", ears: "fin", extra: "crown" } }
  ];

  var WEIGHT = { N: 46, R: 32, SR: 17, SSR: 5 };

  window.CH08.CARDS = CARDS;
  window.CH08.WEIGHT = WEIGHT;
})();
