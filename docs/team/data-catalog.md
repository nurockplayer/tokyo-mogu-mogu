# TOKYO MOGU MOGU — Data Catalog

> チーム向け「調べたデータは結局どれ？」一覧
> Updated: 2026-08-16
> Source of truth: [`docs/data-opportunity-map.md`](../data-opportunity-map.md)
> Planning brief: [`docs/team/data-review-for-planning.md`](./data-review-for-planning.md)

## まずここだけ

Issue #130 の調査で評価した **44件の Data / official public sources** を、人が一覧しやすい形にまとめたものです。

このページは「何を見つけたか」を確認するための索引です。詳細な license、format、取得方法、freshness、limitations、技術的な検証内容は [`Data Opportunity Map`](../data-opportunity-map.md) を参照してください。

| 分類 | 件数 |
|---|---:|
| 観光需要・季節性 | 4 |
| 食・農業 | 11 |
| 文化・地域資源 | 12 |
| 交通・実用情報 | 10 |
| 水辺・水産・島しょ | 7 |
| **合計** | **44** |

### 現在の扱い

- **利用候補**: route / story / discover 等への利用価値が高い
- **利用中**: すでに分析・Product の根拠として使用している
- **要検証**: 面白いが、freshness・coverage・license・意味づけ等の追加確認が必要
- **後回し**: 今すぐの優先度は低い
- **依存不可**: Hackathon では参照できても、継続 Product の依存先にはしない

---

## 1. 観光需要・季節性 — 4件

| # | データ / 公式情報 | 提供元・対象 | 種別 | 何に使えるか | 現在の扱い |
|---|---|---|---|---|---|
| D1 | [モバイルデータを活用した訪都旅行者動態調査](https://data.tourism.metro.tokyo.lg.jp/data/mobile/files/mobile-jp.zip) | 東京都産業労働局・東京都62区市町村 | Open Data / 出典表示 | 市町村 × 月 × 滞在形態などの訪問者数。地域ごとの季節性・相対需要を見る | **利用候補**。駅単位の混雑データではない |
| D2 | [宿泊旅行統計調査・広域市町村別](https://www.mlit.go.jp/kankocho/content/002015008.xlsx) | 観光庁・東京都多摩地域 | 公式公開資料 | 「東京都多摩地域」を宿泊先・Destination として捉える根拠 | **利用候補** |
| D3 | 東京都観光客数等実態調査 R5 / R6 | 東京都産業労働局・東京都 | Open Data / CC BY 4.0 | 観光客数・消費額・都心集中の説明 | **利用中**。[`tourism baseline`](../analytics/tokyo-tourism-baseline.md) に反映済み |
| D4 | [駅別乗降客数 国土数値情報 S12](https://nlftp.mlit.go.jp/ksj/) | 国土交通省・全国 / 東京 | Open Data / CC BY 4.0 | 駅ごとの過去の利用規模を比較し、「相対利用」の proxy にする | **要検証**。リアルタイム混雑とは言わない |

---

## 2. 食・農業 — 11件

| # | データ / 公式情報 | 提供元・対象 | 種別 | 何に使えるか | 現在の扱い |
|---|---|---|---|---|---|
| F1 | 江戸東京野菜 登録品目一覧 | JA東京中央会・東京都 | 公式Web | 52+品目の伝統野菜、収穫季、産地。旬 × 地域の Food Story | **利用候補**。奥多摩ワサビも登録品目 |
| F2 | 都内JA直売所マップ | JA東京中央会・東京都 | 公式Web / reuse restricted | 「産地で買う」行動につなげる直売所候補 | **利用候補（editorial）**。個別商品の在庫は別確認 |
| F3 | 東京都卸売市場日報 | 東京都中央卸売市場 | Open Data / CC BY 4.0 | 日々の入荷・取引、産地、価格を Food Story に使う | **要検証**。鮮度・収穫日・漁獲日の証拠ではない |
| F4 | [TOKYO GROWN](https://tokyogrown.jp/) | 東京の食料品振興財団・東京都 | 公式Web | 東京の農産物・生産者情報。日本語 / 英語 / 繁中の Story source | **利用候補** |
| F5 | GO TOKYO 日本酒ガイド | 東京観光財団 / GO TOKYO・沢井 / 福生 | 公式Web | 小澤酒造・石川酒造などを使った酒蔵 day-trip | **利用候補**。青梅・沢井 route で活用 |
| F6 | 農林業センサス 市町村データ | 総務省統計局 / e-Stat・全国 / 東京 | Open Data | 市町村ごとの農業規模・農業が残る地域を説明 | **利用候補** |
| F7 | 学校給食献立 | 東村山市・青梅市 | Open Data / CC BY 4.0 | 献立・食材・アレルゲンから「地域の日常食」を見る | **利用候補**。実際の喫食を証明するものではない |
| F8 | 食品営業許可・届出施設一覧 | 各自治体 / 青梅市など | Open Data / CC BY 4.0 | 店舗・施設の identity / listing を調べる補助資料 | **要検証・validation only**。営業中・menu・地産食材使用は証明しない |
| F9 | 東京の名湧水57選 | 東京都環境局・東京都 | 公式Web | 水 → 日本酒 / わさび / 食文化という Story relation | **要検証** |
| F10 | 町田市名産品 CSV | 町田市 | Open Data / CC BY 4.0 | 名産品 × 緯度経度の地域探索 | **要検証**。2018 snapshot |
| F11 | 東京都農業振興事務所 管内農業概要 | 東京都 | 公式公開資料 / PDF | 地域の農業背景を Story / Pitch の根拠にする | **要検証** |

---

## 3. 文化・地域資源 — 12件

| # | データ / 公式情報 | 提供元・対象 | 種別 | 何に使えるか | 現在の扱い |
|---|---|---|---|---|---|
| C1 | 東京都指定文化財一覧 | 東京都教育庁・東京都 | Open Data / CC BY 4.0 | 文化財を Food Spot / Route の近くに重ねる。248件、うち多摩108件 | **利用候補**。青梅・沢井 route で活用 |
| C2 | 市町村別 文化財一覧 | 青梅・八王子・武蔵野・府中・国分寺ほか 28+自治体 | Open Data / CC BY 4.0 等 | 都指定だけでは拾えない地域の文化財を補完 | **利用候補** |
| C3 | 三鷹市みどころマップ | 三鷹市 | Open Data / CC BY 4.0 | 77 spot、営業時間・料金・文化解説など、実用情報付き Route 素材 | **利用候補** |
| C4 | あきる野市 観光施設一覧 | あきる野市 | Open Data / CC BY 4.0 | 秋川渓谷・五日市線・日帰り温泉を組み合わせる Route spine | **利用候補**。2022 data の freshness 要確認 |
| C5 | 青梅市 観光スポット一覧 | 青梅市 | Open Data / CC BY 4.0 | 小澤酒造・澤乃井園など、青梅・御岳周辺 route の公式 spot backbone | **利用候補**。一部座標補完が必要 |
| C6 | 東京都指定史跡一覧 | 東京都教育庁・東京都 / 多摩 | Open Data / CC BY 4.0 | 遺跡・歴史公園・郷土資料館など歴史 Story の接続 | **利用候補**。C1 と組み合わせる |
| C7 | 国立国会図書館デジタルコレクション / OpenSearch | 国立国会図書館・全国 | 公式Web / itemごとにrights確認 | 青梅街道・古地図などの「今昔」Story | **要検証**。公開・再利用権は作品ごとに確認 |
| C8 | 東京の伝統工芸品・東京手仕事 | 東京都産業労働局・東京都 | 公式Web | 村山大島紬・多摩織など、食以外の地域文化 Story | **要検証** |
| C9 | TOKYO WALKING MAP | 東京都保健医療局・東京都 / 多摩 | Open Data / CC BY 4.0 | 駅から歩ける短い walking course を Route に組み込む | **要検証** |
| C10 | 小金井市 観光施設 / 観光ポイント | 小金井市 | Open Data / CC BY 4.0 | 観光 spot / Discover。江戸東京たてもの園周辺など | **要検証** |
| C11 | 台東区伝統工芸職人一覧 | 台東区 | Open Data / CC BY 4.0 | 職人・工房・体験 spot の可能性 | **後回し**。23区側の候補 |
| C12 | 文化遺産オンライン | 文化庁・全国 | 公式Web | 文化財 Story の reference link | **後回し**。bulk/APIなし |

---

## 4. 交通・実用情報 — 10件

| # | データ / 公式情報 | 提供元・対象 | 種別 | 何に使えるか | 現在の扱い |
|---|---|---|---|---|---|
| M1 | [多摩都市モノレール GTFS + fares + ridership + GTFS-RT](https://ckan.odpt.org/dataset/train-tamamonorail) | 多摩都市モノレール / ODPT・多摩 | Open Data / 基本ライセンス | 運賃・利用量・Realtimeを使った Tama interior route | **利用候補** |
| M2 | Tama community-bus GTFS cluster | 町田・東村山・稲城・国立・東大和・杉並など | Open Data / CC0・CC BY 4.0 | 最寄り駅から Food / Spot までの last-mile を説明 | **利用候補** |
| M3 | 都営 GTFS + GTFS-RT | 東京都交通局 | Open Data / CC BY 4.0 | 都営 network と乗換 context | **利用候補**。西側 end-to-end route の代替ではない |
| M4 | 道の駅 国土数値情報 P35 | 国土交通省・全国 / 東京 | Open Data / non-commercial | トイレ・EV・restaurant 等の rest-stop layer | **要検証**。2018 snapshot、commercial Product には注意 |
| M5 | 公衆トイレ一覧（自治体標準データセット） | 各区市 | Open Data / CC BY 4.0 | rural route で「近くにトイレがあるか」を補助 | **要検証** |
| M6 | 高尾山 / 御岳山 ケーブルカー運行情報 | 高尾登山電鉄 / 御岳登山鉄道 | 公式Web | 山側 spot への access guide | **後回し / editorial only**。運行は公式サイト確認へ誘導 |
| M7 | JR東日本 / 京王 rail GTFS（青梅線・京王線） | JR東日本 / 京王 | チャレンジ2026限定 | Hackathon 中の route 検討補助 | **依存不可**。継続 Product の reusable dependency にしない |
| M8 | TOKYO CRUISE 水上バス GTFS | 東京都観光汽船 | Open Data / CC BY 4.0 | Open mobility の比較例、水辺 route | **後回し** |
| M9 | だれでも東京 | 東京都 | 公式Web / API未確認 | Barrier-free 情報の考え方・reference | **後回し**。Open Data としては未確認 |
| M10 | 東京都内の飲食店のバリアフリー情報 | 東京都産業労働局・東京都 | Open Data / CC BY | 飲食店の accessibility の部分的 reference | **要検証・coverage限定**。西多摩6地域で確認できたのは4件 |

---

## 5. 水辺・水産・島しょ — 7件

| # | データ / 公式情報 | 提供元・対象 | 種別 | 何に使えるか | 現在の扱い |
|---|---|---|---|---|---|
| W1 | 東京都卸売市場日報 — 水産 CSV | 東京都中央卸売市場・東京都 | Open Data / CC BY 4.0 | 日々の水産物の入荷・取引、都道府県単位の産地、価格 | **利用候補**。漁獲日・鮮度の証拠ではない |
| W2 | 伊豆・小笠原諸島 ライブカメラ位置情報 | 東京都港湾局・伊豆 / 小笠原 | Open Data / CC BY 4.0 | 緯度経度 + YouTube Live で「島の今」を見せる | **利用候補** |
| W3 | 東京おさかな図鑑 + 島の特産農産物図鑑 | 島しょ農林水産総合センター・島しょ / 東京湾 | 公式Web / license未確認 | 魚種・旬・食べ方から島の FoodCulture を作る seed corpus | **利用候補**。再利用条件確認が必要 |
| W4 | 島アクセス UMISORA + 東海汽船ダイヤ | 東京都 + 交通事業者・島しょ | 公式Web | 船の本数・運航リスクを Food Story と一緒に見せる | **利用候補（integration）** |
| W5 | アユ遡上調査 CSV / 内湾水質 CSV | 東京都 / 島しょ農林水産総合センター | Open Data / CC BY 4.0 | 川・海の season / activity calendar の材料 | **要検証** |
| W6 | 2023年漁業センサス 東京都分 | 東京都 | Open Data / CC BY 4.0 | 東京の漁業規模・担い手を支援 Story / Pitch の根拠にする | **要検証** |
| W7 | 八丈島観光スポット一覧 | 八丈町 | Open Data / CC BY | 島の観光POI data pattern | **後回し**。2017で古く、元URLもbroken |

---

## 6. この44件から見えている旅行体験

データそのものを並べるだけでなく、組み合わせると次のような企画が見えている。

1. **青梅線・御岳 / 沢井 — 酒蔵 × 文化財 day-trip**
   C1 + C5 + F5 を中心に、小澤酒造・澤乃井園・御嶽周辺を組み合わせる。
2. **旬 × 産地 × 直売所 — 当季東京食材**
   F1 + F2 + F4 + F3 / W1 から「今の旬 → 産地 → 買いに行く」を作る。
3. **青梅線の相対利用 signal**
   D4 + D1 から、混雑断定ではなく「歴史的・月別の相対利用」を見せる。
4. **多摩内陸 Mobility Loop**
   M1 + M2 + M3 から、自由に再利用できる交通データで多摩内陸をつなぐ。
5. **島しょ『島の今』**
   W2 + W3 + W4 から、食と船のアクセス、Live情報を組み合わせる。
6. **文化財 × 食 geo-pairing**
   C1 + C2 + C3 + C4 から、Food Spot の近くにある文化・歴史を旅の理由にする。
7. **地域の日常食**
   F7 + F8 から、学校給食や公式施設 listing を地域理解の補助情報にする。

詳しい Product opportunity と vertical-slice ranking は [`Data Opportunity Map §5–7`](../data-opportunity-map.md#5-product-opportunities--プロダクト機会) を参照。

---

## 7. 読む順番

- **「何のデータを調べた？」** → この `Data Catalog`
- **「そのデータで何を作れそう？」** → [`Data & Route Review Brief`](./data-review-for-planning.md)
- **「license / format / limitations / research evidence まで確認したい」** → [`Data Opportunity Map`](../data-opportunity-map.md)

この3段階を分けることで、チームメンバーは研究資料を最初から全部読む必要がなく、必要な深さまでだけ辿れる。