# F3 數學學習站

中三數學互動學習網站（純靜態，GitHub Pages 托管）。

網址：<https://tyhcch1234.github.io/F3_maths/>

## 現有課題

| 課題 | 路徑 |
| --- | --- |
| 2B Ch08 整數指數律 | [`2b-ch08/`](2b-ch08/index.html) |

## 目錄結構

```
index.html                 首頁（課題列表）
assets/hub.css             首頁樣式
2b-ch08/
  index.html               章節頁
  assets/
    ch08.css               章節樣式
    content-topics-a.js    分頁 1–5（定義、公式 1–4）教學內容
    content-topics-b.js    分頁 6–10（公式 5–7、指數方程、科學記數法）
    content-quiz.js        題庫（每分頁 新學 + 累積，另有綜合測驗）
    content-cards.js       抽卡角色資料
    app-store.js           localStorage 進度儲存
    app-widgets.js         10 個互動教具
    app-quiz.js            小測引擎、抽卡、圖鑑、錯題本
    app-shell.js           分頁、版面、初始化
```

## 每個分頁的結構

1. **互動教學** — 先動手操作（滑桿／動畫），再列出推導步驟與口訣
2. **累積重溫** — 由第 1 條公式開始的所有舊公式卡（可展開例子）
3. **互動小測** — 題目順序：本節新學 → 之前累積

## 學生功能

- 每題 10 分（綜合測驗 15 分），全對有額外獎勵；成績存於瀏覽器 `localStorage`
- 每 50 分可換 1 張抽卡券，抽原創「指數小精靈」卡（N / R / SR / SSR）
- 答錯自動存入錯題本，重做答對即移除

## 新增下一個課題

1. 建立新資料夾，例如 `2b-ch09/`，複製 `2b-ch08/` 的結構再改內容
2. 在 `index.html` 的 `.grid` 內加一張 `.tcard` 連到新資料夾
3. 推送後 GitHub Pages 會自動更新，網址不變

## 備註

頁面上的「小精靈卡」全部是本站原創角色與插畫（以 SVG 生成），並非任何商業卡牌遊戲的角色。
