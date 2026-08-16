# TOKYO MOGU MOGU — Data & Route Review Brief

> Team review version for planning / route feasibility discussion  
> Updated: 2026-08-16  
> Audience: 企画・PM・デザイン・現地視点のレビュー担当  
> **調べた44件の一覧:** [`docs/team/data-catalog.md`](./data-catalog.md)  
> Detailed research source of truth: [`docs/data-opportunity-map.md`](../data-opportunity-map.md)

## 1. まず結論

AIを使った調査により、東京都・自治体・国・観光公式サイト等から **44件の Open Data / official public sources** を評価している。

現時点では、データをさらに広く探すことよりも、すでに確認できている情報を使って次の2つを判断する段階に入っている。

1. **8/23 Hackathon で「Open Data / official data を実際の旅行体験に使っている」と説明する材料として十分か**
2. **現在アプリ上に作っているルートが、実際の旅行者にとって無理なく成立するか**

現在の Product / demo hierarchy は次の通り。

- **Primary presentation anchor:** 奥多摩 × 東京わさび
- **Secondary playable proof:** 青梅・沢井 × 日本酒 × 文化財
- Product 全体は東京都全域 × 複数地域 × 複数食文化を対象とする

44件を一件ずつ確認したい場合は [`Data Catalog`](./data-catalog.md) を参照。この資料では、企画判断に必要な情報だけを、**「何が分かっているか → どの旅行体験に使えるか → 何がまだ分からないか」** の順に整理する。

---

## 2. なぜ23区外への旅行を提案するのか

東京都の公式調査では、外国人旅行者の訪問先は都心に大きく集中している。

| エリア | 外国人旅行者の訪問率（2023） |
|---|---:|
| 渋谷 | **67.1%** |
| 新宿・大久保 | **57.4%** |
| 銀座 | **50.1%** |
| 吉祥寺・三鷹 | **3.5%** |
| 八王子・高尾山 | **2.6%** |
| 奥多摩 | **0.7%** |
| 青梅・御岳山 | **0.6%** |

一方、奥多摩まで訪れた外国人旅行者では「自然を感じる」体験の評価が高いというデータもある。ただしサンプル数が小さいため、方向性を示す参考値として扱う。

TOKYO MOGU MOGU が試している mechanism は次の通り。

> **食への興味 → 土地・自然・人・文化を知る → その地域に行く理由ができる → 実際に訪れる・食べる・買う**

つまり、単に「奥多摩は空いているから行ってください」と誘導するのではなく、**食を入口に、旅行者自身が行きたくなる理由を作れるか**を検証している。

詳細な統計・出典・注意点は [`docs/analytics/tokyo-tourism-baseline.md`](../analytics/tokyo-tourism-baseline.md) を参照。

---

## 3. Route A — 奥多摩 × 東京わさび

### このルートで使える証拠

現在は Open Data だけではなく、次の情報を組み合わせている。

- 2026-08-09 の奥多摩 fieldwork
- 奥多摩観光協会の公式情報
- 江戸東京野菜 / 奥多摩ワサビに関する公式情報
- 東京都の観光・外国人旅行者データ
- 西東京バス等の mobility context
- JA / TOKYO GROWN 等の食・農業関連公式情報

重要な点として、**奥多摩町の Open Data は非常に少ない**。東京都 Open Data Catalog の調査では奥多摩町は3 dataset 程度で、わさび・直売所・地域食を直接カバーする Open Data は見つかっていない。

そのため、このルートは「Open Data が少ないから弱い」のではなく、**Open Data + official sources + fieldwork を組み合わせる必要がある地域**として扱っている。

### 現在の Half-day route

現在アプリでは、以下の editorial model route を設定している。

1. **奥多摩観光案内所** — 15分
2. **千島わさび園** — 45分
3. **一心亭** — 60分
4. **獅子口屋（わさび）** — 30分

移動時間を含むモデル合計は **200分（約3時間20分）**。

### 現在の 1-day route

1. **奥多摩観光案内所** — 15分
2. **千島わさび園** — 60分
3. **一心亭** — 60分
4. **大丹波川国際虹ます釣場** — 60分
5. **獅子口屋（わさび）** — 30分

移動時間を含むモデル合計は **285分（約4時間45分）**。

### 現時点で信頼できること

- 上記は実在施設を使っている
- 名称・住所等には official source がある
- わさびの産地・購入・食・地域体験を一つの journey にまとめる構造は作れている
- 8/9 fieldwork による現地感覚・写真・観察も利用できる

### まだ人間の判断が必要なこと

- この順番で実際に移動するのが自然か
- 西東京バスの本数を考えて 200分 / 285分で本当に回れるか
- 千島わさび園 → 一心亭 → 大丹波方面の移動負担は妥当か
- 外国人旅行者にとって乗換やバス利用が難しすぎないか
- 各施設を「わざわざ行く価値のある stop」として見せられるか
- 営業時間・定休日・予約・価格等の practical information は追加確認が必要

**特に route の所要時間・順番はチームが作った editorial model であり、実地検証済みの時刻表ではない。**

---

## 4. Route B — 青梅・沢井 × 日本酒 × 文化財

AIによる広域 data research では、奥多摩よりも青梅・沢井周辺の方が Open Data / official data を組み合わせやすいことが分かった。

そのため、Product が奥多摩専用ではないことを示す secondary playable route として実装している。

### このルートで使える主な資料

- **青梅市 観光スポット Open Data**
- **東京都教育庁 指定文化財 Open Data**（CC BY 4.0）
- **小澤酒造 公式サイト**
- **澤乃井園 公式情報**
- **GO TOKYO 日本酒ガイド**
- 市町村別文化財データ
- 東京の名湧水等、水と地域文化を補強できる official sources

東京都指定文化財 Open Data は調査時点で **248件、そのうち108件が多摩地域、245件に緯度経度と英語名**が確認できた。

### 現在の Half-day route

1. **小澤酒造** — 45分
2. **澤乃井園** — 60分
3. **御嶽神社** — 60分

モデル合計は **215分（約3時間35分）**。

### 現在の 1-day route

1. **小澤酒造** — 60分
2. **澤乃井園** — 90分
3. **御嶽神社** — 120分
4. **馬場家御師住宅** — 30分

モデル合計は **370分（約6時間10分）**。

### この route の強み

- 酒蔵という明確な food/drink anchor がある
- 小澤酒造・澤乃井園は official source が充実している
- 東京都指定文化財を旅の stop / Story として接続できる
- 「酒を飲む」だけで終わらず、**水・渓谷・酒造・御岳の信仰文化**まで地域理解を広げられる
- Open Data が実際の Story / Route / Spot にどう変わるかを審査員に見せやすい

### まだ人間の判断が必要なこと

- 酒蔵 → 御岳山の組み合わせを旅行者が一つの旅として自然に感じるか
- 沢井から御岳への移動と、御岳登山鉄道ケーブルを含めた所要時間が妥当か
- 酒蔵で飲酒した後に御岳山方面へ移動する itinerary として問題がないか
- 御嶽神社 60分 / 120分、馬場家御師住宅 30分の滞在時間は適切か
- Half-day を本当に「Half-day」と呼べるか
- 一日版を外国人旅行者が無理なく完走できるか
- 営業時間・酒蔵見学・料金・予約等の practical information をどこまで current data で保証できるか

この route も、**Stop 自体は source-backed だが、route 順序・滞在時間・移動時間は editorial model** である。

---

## 5. AIで確認したその他のデータ

**調査した44件を一件ずつ見たい場合は [`Data Catalog`](./data-catalog.md) を参照。** ここでは企画判断に使いやすいカテゴリだけを簡単にまとめる。

### A. 観光需要・分散

旅行者が「どこに集中していて、どこに来ていないか」を説明するための data。

- 東京都観光客数等実態調査
- 国・地域別外国人旅行者行動特性調査
- モバイルデータを活用した訪都旅行者動態調査
- 観光庁 宿泊旅行統計
- 駅別乗降客数

**使い道:** Pitch / Home / Result で「なぜこの地域を紹介するのか」を説明。

### B. 食・農業

地域へ行く理由になる「食」を見つける data / official sources。

- 江戸東京野菜
- 都内JA直売所
- TOKYO GROWN
- GO TOKYO 日本酒情報
- 東京都卸売市場日報
- 農林業センサス
- 学校給食献立 Open Data
- 食品営業許可・届出施設
- 東京の名湧水

**使い道:** Story / Discover / Spot / 新しい Region × FoodCulture 候補。

### C. 文化・地域資源

食だけで終わらず、その土地の歴史・文化へ接続する data。

- 東京都指定文化財
- 各市町村の文化財一覧
- 青梅市 観光スポット
- あきる野市 観光施設
- 各自治体のみどころ・歴史資源

**使い道:** Story / Route / Spot で「ここまで行く意味」を強くする。

### D. 移動

「実際に行けるか」を考えるための data。

- 多摩都市モノレール GTFS / fares / ridership
- 自治体 community bus GTFS
- 西東京バス関連情報
- 駅別乗降客数
- walking course

注意：JR青梅線など一部データには Hackathon / Challenge 用の利用条件があり、Product の恒久 dependency にはできない。

**使い道:** Route feasibility / access / travel friction の確認。

### E. 実用情報

旅行者が現地で困らないための data。

- バリアフリー情報
- 公共トイレ
- 観光施設 practical information
- 食品営業許可情報（施設 identity の確認補助）

**使い道:** Spot / Route の practical UX。

### F. 水辺・水産・島しょ

東京の島や水辺を旅行体験にするための data / official sources。

- 東京都卸売市場日報（水産）
- 伊豆・小笠原諸島ライブカメラ位置情報
- 東京おさかな図鑑 / 島の特産農産物図鑑
- UMISORA / 東海汽船ダイヤ
- アユ遡上・水質データ
- 漁業センサス
- 八丈島観光スポット

**使い道:** 島の Food Story、Live preview、船の運航を含む route feasibility。

---

## 6. この資料と詳細資料の使い分け

- [`docs/team/data-catalog.md`](./data-catalog.md): **調査した44件を人が一件ずつ確認する一覧**
- **この Brief:** チームが5分程度で全体を理解し、企画・route検討に必要な情報を確認するための資料
- [`docs/data-opportunity-map.md`](../data-opportunity-map.md): AI / engineering / PM が dataset、license、format、制約まで追跡する研究 source of truth
- [`docs/analytics/tokyo-tourism-baseline.md`](../analytics/tokyo-tourism-baseline.md): 観光集中に関する quantitative evidence の詳細
- [Issue #211](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/211): 既に見つけた source-backed data を Web App の Story / Route / Spot に反映する current P0 work

> **この Brief は、現在確認できているデータ・ルート・未確認事項を、チームが短時間で把握できるように整理した資料。**