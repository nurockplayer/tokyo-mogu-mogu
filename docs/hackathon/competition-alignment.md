# Competition Alignment / 競技戦略

**Status**: Durable strategy source of truth for the 2026 Tokyo Open Data
Hackathon (都知事杯オープンデータ・ハッカソン) submission. Issue #100.
**Tracking issue**: #100 ([Competition alignment and judging strategy](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/100))
**Deadline**: 2026-08-23 17:00 JST (Feature Freeze 2026-08-21 — see `docs/project-roadmap.md`)

本文件是把 `#85`（Product Vision）、`#92`（current App IA）、`#19`（Open Data
registry）、`#86`（execution roadmap）串成同一競技戰略的 durable source of
truth。Pitch / Demo / README / Data 選定都從這裡共用同一套敘述。

> 本 Issue は新機能を増やすものではない。8/23 前に新しい feature を提案するときは
> 「**Data / Idea / Tech / Impact / Service Design のどの評価を、どの concrete
> evidence で強くするのか？**」を問い、どの評価にも実質的に寄与しない scope
> expansion は原則 8/23 後へ送る。

---

## Evidence legend / 証拠の凡例

本文件のすべての statement は以下で区別する（`AGENTS.md` Data and Sources /
Product Principles rule #7 に従う）。

| 印 | 意味 | 例 |
|---|---|---|
| ✅ | **verified** — repo 内の source（Open Data / 公開統計 / official web / 契約ドキュメント）に裏付け。 | 観光統計の数値、Open Data の施設 row |
| 🧪 | **demo fixture / editorial** — 名前や住所は実在するが、coordinate は近似、narrative は team 執筆。 | `seed-places.ts` の `origin: 'demo'`、`seed-routes.ts` の `origin: 'editorial'` |
| 👀 | **field observation** — #10 fieldwork で取得予定。**8/23 前は大部分未取得**。 | 生産者の生の声、店舗の実営業情報 |
| 🔮 | **future / editorial vision** — 今回 MVP の範囲外だが、Product の将来像。 | multi-region 展開、Badge による next-discovery |
| ❓ | **unknown** — source が見つからない、または取得・検証できていない。 | 訪都旅行者動態の公式データ、実測の contribution metrics |

---

## 1. Competition Positioning / 競技ポジショニング

### Primary category — 観光・国際交流

TOKYO MOGU MOGU は、訪日旅行者に東京の地域文化・作り手・食・体験を
多言語で伝え、本人の興味や条件に合わせて**実際の地域訪問につなげる**。

- この position は Product 側で選択した alignment（#85）であり、公式テーマの
  分類にそのまま掲載されているわけではない（Section 5 参照）。✅
- 主 persona は訪日旅行者（rep. persona: Taiwanese, 30s, Shinjuku base）✅
  — `docs/specs/product/hackathon-product-contract.md`「Primary Persona」。

### Secondary relationship — 交通・移動

半日 / 1日の Route、公共交通・徒歩等の practical mobility 情報を通じ、
**23区外への移動障壁を下げる**。

- この mobility は Product の中心機能ではなく、`Understand → Visit` の
  接続役。次の evidence で説明できる：
  - モデルルート `okutama-wasabi-journey` は JR青梅線 + 西東京バス + 徒歩を
    含む（`src/data/seed-routes.ts`，mobility は 🧪 editorial 見積もり）。✅/🧪
  - GTFS レイヤーは `src/data/gtfs-fixture/` に demo fixture として存在 ✅/🧪；
    **実データは未取得・未検証**（`docs/nishi-tokyo-bus-gtfs-source.md`）❓。

### Product-specific social theme — 観光消費の地域分散 × 地域文化継承

- 食文化継承は重要な価値だが、**#85 に従い Product の最上位 problem statement
  は tourism dispersion / regional discovery**。継承はその先につながる価値。✅

---

## 2. Problem / 課題

1. 東京観光・観光消費が **23区内の著名観光地へ集中**しやすい。
2. outer Tokyo には食文化・生産者・自然・体験等、`わざわざ行く理由` になり得る
   地域資源がある。
3. しかし**旅行者との接点が弱く**、地域資源が実際の visit motivation に変換
   されていない。

Product は旅行者を強制的に分散させるのではなく、旅行者自身に **「行きたい
理由」** を生み出す。✅/🔮（これは #85 の宣言。分散の実効性は実測待ち — 下記
Evidence Matrix / Section 6-Impact 参照）

### Quantitative evidence（✅ 出典あり — `docs/analytics/tokyo-tourism-baseline.md`）

| 指標 | 数値 | 出典 |
|---|---|---|
| M1 訪問集中 | 訪都外国人の訪問率: 渋谷 67.1% / 新宿・大久保 57.4% / 銀座 50.1% / 浅草 47.4%（2023） vs 多摩エリアはすべて 3.5% 以下（吉祥寺・三鷹 3.5%, 八王子・高尾山 2.6%, 立川 1.7%, **奥多摩 0.7%**, 青梅・御岳山 0.6%） | 国・地域別外国人旅行者行動特性調査（令和5年, dataset B, 図表14）— baseline §3.2 |
| M2 消費と訪問の乖離 | 訪都外国人 = 東京観光消費の 38.1%（¥7.24tn 中, 2023）/ 41.8%（¥9.48tn 中, 2024）。平均泊数 5.2 泊、1人当たり東京滞在支出 ¥179,154 | 東京都観光客数等実態調査（dataset A）+ 行動特性調査（dataset B, 図表44）— baseline §3.1 / §3.3 |
| M3 多摩の需要構造 | 多摩は週末・季節ピーク、近隣集客型イベント、単一アンカー（高尾山）に依存 | TCVB おでかけウォッチャー reports（dataset C, 国内居住者 GPS）— baseline §3.4 |

> ⚠️ 出典上の注意（baseline §3.2 / §3.5 より）：dataset B の訪問率は複数回答で、
> 多摩 sub-total ≈9.1% は**上限値**（厳密な「いずれかの多摩訪問者」割合ではない）。
> 区部/多摩/島しょの公式分割（観光入込客数・消費額）は公開されていないため、
> 都心 vs 多摩の比較は proxy 指標。dataset C は国内居住者の opt-in データで、
> **訪問外国人そのものではない**。Pitch で再使用する際はこの但し書きを保つ。

---

## 3. Product Mechanism / プロダクトメカニズム

```
Discover → Understand → Visit → Act → Discover next region
```

| 段階 | 内容 | 対応する S0–S9 / App IA（✅） | Demo surface |
|---|---|---|---|
| 1. Discover | Food Profile + Exploration Conditions から、自分に合う地域文化との出会いを作る | S0–S3 / `Food Profile` + Exploration | `Home → /explore → /explore/result` |
| 2. Understand | 食・作り手・歴史・自然を Story として理解する | S4 / Story | `/story/:id`（東京わさび story, 🧪 editorial） |
| 3. Visit | 半日 / 1日の Route に変換して実際の訪問へつなげる | S5–S6 / Route + Spot | `/route` の `okutama-wasabi-journey`（half-day / 1-day, 🧪） |
| 4. Act | 食べる / 買う / 体験する / 共有する等の行動を地域消費・文化継承へ接続する | S7 / Support | `/support`（買う・訪れる・予約・寄付・共有・保存, 🧪 demo CTA） |
| 5. Discover next region | 継続機能を使う場合は次の地域発見の動機につなげる | S8 / S9（stretch）+ `Discover` | `/my` 保存ルート、Badge（stretch, 🔮） |

App の behavioral journey（#92）として語る（Section 6-5 参照）：

```
Home → Food Profile (first time) → Exploration → Result → Story → Route → Spot → Action
```

---

## 4. Hackathon MVP Boundary / ハッカソン MVP 境界

- **Product scope（durable）**：東京都23区外の複数地域へ将来展開可能。`Region /
  FoodCulture / Place / Route` は future outer-Tokyo region を表現できる durable
  domain（✅ `docs/specs/product/hackathon-product-contract.md` Architecture /
  Data Boundary）。
- **2026-08-23 first pilot**：**奥多摩 × 東京わさび**。
- **奥多摩は Product の恒久的 geographic scope ではなく**、`23区外へ行きたい
  理由を作れるか` を検証する **first MVP pilot**。✅
- 8/23 までに複数地域を production implementation する必要はない。✅
- 他の食文化（青梅・日の出等）は S9 Badge dummy / future expansion としてのみ
  登場し、core-demo の前提にしない。✅

### Scope guardrails（#86 critical path を守る）

- Feature freeze 2026-08-21 までに P0（#85/#76/#77/#78/#79/#80/#81/#82/#10）を
  優先。✅
- 新機能提案は「Data / Idea / Tech / Impact / Service Design のどの評価をどの
  evidence で強くするか」で判断。どれにも寄与しない scope expansion は 8/23 後へ。
- Out of scope：#19 の全カテゴリを Product に取り込むこと、judging point のため
  だけの技術追加、final slide のデザイン自体。✅

---

## 5. Official Theme Alignment / 公式テーマとの整合

### 公式募集の事実（✅ — official pages, retrieved 2026-08-10）

- 都知事杯オープンデータ・ハッカソン 2026 公式サイト
  （[odhackathon.metro.tokyo.lg.jp](https://odhackathon.metro.tokyo.lg.jp/)）より：
  - **審査基準は5軸**（[募集要項](https://odhackathon.metro.tokyo.lg.jp/recruitment/)、
    [英文 recruitment](https://odhackathon.metro.tokyo.lg.jp/en/recruitment/)、
    [#awards](https://odhackathon.metro.tokyo.lg.jp/en/recruitment/#awards)）：
      1. データ活用 — Data Utilization
      2. アイデア力 — Originality & Innovation
      3. 技術力 — Technical Excellence
      4. ソーシャルインパクト — Social Impact
      5. サービスデザイン — Service Design
  - **固定のテーマ分野（観光・国際交流、交通・移動等）は公式に列挙されていない。**
    テーマは「都民の皆様から寄せられたテーマ」+「自由提案」。対象条件は
    「東京都の社会課題の解決に資するサービス案」「オープンデータや民間データを
    活用していること」。
- 賞：都知事杯（最優秀賞）+ データ活用賞 / アイデア賞 / 技術賞 /
  ソーシャルインパクト賞 / サービスデザイン賞 / 学生賞 / オーディエンス賞
  （計8賞）。— ✅/🔮（賞名称は公式。獲得可能性は当然未知）

### 本プロダクトの整合

| 公式側 | 本プロダクト側 |
|---|---|
| 東京都の社会課題の解決に資する | 23区集中という観光課題へ（Section 2）✅ |
| オープンデータ/民間データの活用 | 観光統計・施設 Open Data・GTFS（Section 6-1 / 7）✅ |
| 5審査軸 | Section 6 の五軸戦略。公式軸名（データ活用 / アイデア力 / 技術力 / ソーシャルインパクト / サービスデザイン）と本文件の日本語軸名は同一。✅ |

**Alignment の扱い**：`観光・国際交流` は本チームが選ぶ競技ポジショニング
（#85）であり、**公式分類への申請ではない**。公式が今後公開するテーマ一覧
（募集回答から選定・公開される予定）を確認し、本文件の用語と齟齬があれば
更新する。❓（テーマ一覧の公開状況は 8/10 時点で未確認）。

---

## 6. Five Judging Axes / 5つの審査軸

各軸について `claim → evidence → product/demo surface` を整理する。

### 6-1. データ活用 — Data Utilization

> **claim**: Open Data は decoration ではなく mechanism の一部。課題発見 →
> regional discovery → Route / practical UX → Impact evaluation の各段階で使う。

- **evidence**:
  - 課題発見（✅）: `docs/analytics/tokyo-tourism-baseline.md` の M1–M3 は観光統計
    Open Data / 公式調査（dataset A/B/C, baseline §3）から導出。
  - regional discovery（✅/🧪）: `src/data/generated/okutama-places.ts` の
    **3 row が実 Open Data**（`origin: 'source'`, `sourceType: 'open_data'`,
    CC BY 4.0）— `okutama-general-1jcznma` 奥多摩町立せせらぎの里美術館 /
    `okutama-general-1uxd9bs` 奥多摩町森林館（東京都教育庁 施設関連情報,
    `t000021d2000000151`）、`okutama-sports-us0v10` 奥多摩総合運動公園（奥多摩町
    スポーツ施設一覧, `t133086d3100000004`）。coordinate は source の権威座標。出典記録
    は `docs/okutama-facilities-source.md`。
  - Route / practical UX（🧪）: モデルルートの mobility は西東京バス（GTFS は
    `src/data/gtfs-fixture/`, origin `'demo'`）。**実 GTFS は未取得・未検証** ❓ —
    `docs/nishi-tokyo-bus-gtfs-source.md`。
  - Impact evaluation（❓/🔮）: post-demo の contribution metrics は実測なし（後述）。
- **product/demo surface**: データの出典表示 / provenance（verified vs demo）
  を S6 Spot や Story で見せる。GTFS fixture で「実データ置換可能なレイヤー」
  をデモで説明。
- **dataset adoption / priority は #19 で追跡** ✅（registry は OPEN, Product
  role / priority は #85 + #92 基準）。
- **未取得の候補**: モバイルデータを活用した訪都旅行者動態調査 — 公開データは
  8/8 時点で見つからず未使用 ❓（baseline §2 Availability note）。

### 6-2. アイデア力 — Originality & Innovation

> **claim**: 人気店・有名観光地をランキングするのではなく、旅行者の興味から
> **まだ知らない東京へ行きたくなる理由**を作る。

- **evidence**:
  - 食文化を入口にする（✅/🧪）: `src/data/seed-food-cultures.ts` の東京わさび
    story/history/maker/howToEnjoy は公開観光情報（奥多摩観光協会,
    東京都産業労働局 特産品情報）からの editorial 記述（`origin: 'editorial'`）。
  - 店舗・料理・生産者・生産地を一つの Story として扱う（🧪）: `seed-routes.ts`
    の SPOT_DETAILS は wasabi 生産 → そば → 道の駅購入を一続きの物語に接続
    （「production から consumption までの水の物語」等）。
  - `行くこと/食べること/買うこと` の地域的意味を見せる（🧪/🔮）: S7 Support の
    各 action に文化継承の意味付け。実績の裏付けは fieldwork 待ち 👀。
- **product/demo surface**: S4 Story（wasabi の地理・歴史・作り手）+ S5 Route の
  「奥多摩わさび紀行」half-day / 1-day + S7 の行動。
- **差異化の核心**: 「知らない地域に、理由のある初めての訪問を作る」こと自体が
  claim。ランキング系（23区内の評価）と対比して説明する。

### 6-3. 技術力 — Technical Excellence

> **claim**: 評価対象として説明できる実装が揃っており、誇張なしに語れる。

- **evidence**（すべて ✅ 実装・テスト確認済み）:
  - reusable `Region / FoodCulture / Place / Route` domain — `src/data/model.ts`
    （`DataSource` / `DataOrigin` の provenance 型を含む）。
  - Food Profile + per-trip Exploration lifecycle — `src/lib/food-profile*.ts`,
    `src/lib/exploration*.ts`（テストあり）。
  - multilingual architecture — `src/i18n/`（ja / en / zh-TW, `LocaleToggle`,
    `resources.ts`, `data-content.ts`, `fallback.ts`）。
  - Route / Map / Spot practical UX — `src/pages/RoutePage.tsx`,
    `SpotPage.tsx`, `MapPage.tsx`, `src/pages/route-spot.ts*` + `PIN_LAYOUT` /
    `projectRoutePins`（375px でピンを 44px 以上離す決定論的 de-overlap,
    `seed-routes.ts`）。
  - local persistence / recent vs saved state — `src/lib/saved-routes.ts`,
    `src/lib/mogu-recent.ts`（テストあり）。
  - data provenance / verified vs editorial vs demo fixture boundary —
    `src/data/model.ts` + seed / generated / gtfs-fixture の `origin` / `sourceType`。
  - responsive mobile-first Web App — React 19 + TypeScript (strict) + Vite 7,
    375px baseline（`docs/specs/product/hackathon-product-contract.md`）。
- **judging point のための技術追加はしない**（#86 critical path 優先）。GTFS は
  fixture 段階であることを隠さず、「実データ置換可能」と説明する。
- **product/demo surface**: アーキテクチャは demo 時に口頭説明 + provenance UI。
  S5 ルートマップは決定論的レイアウトを実演。

### 6-4. ソーシャルインパクト — Social Impact

> **claim**（Impact chain）:
> `23区への観光集中` → `outer Tokyo の新しい目的地を発見` → `実際の地域訪問`
> → `地域での飲食・購入・体験` → `地域事業者/生産者との接点` → `地域文化の認知・継承`
> → `次の地域発見`

- **evidence**:
  - chain の入口（23区集中 / 多摩の低訪問）は ✅ 実データ（baseline M1–M3）。
  - chain の中間以降（実際の訪問・地域消費・事業者接点・継承）は **8/23 時点で
    実測の contribution metrics なし**。以下で区別する：
    - 仮説としての chain: ✅/🔮（#85 の Product Vision）。
    - 実績: ❓ 未取得 — #10 fieldwork と demo 後の定性的フィードバックで補う。
  - **Demos で contribution metrics を捏造しない**。成果は source-backed に
    限定する。✅
- **product/demo surface**: 未来像（multi-region 展開、文化継承）は 🔮 として
  Pitch で提示し、検証済みの数値と分ける。実測値が無い限り「どの程度分散した
  か」を数値で語らない。
- **次への課題（Section 8 Evidence Needed に反映）**: 地域側/生産者側の一次情報 👀、
  実訪問への転換実績 ❓。

### 6-5. サービスデザイン — Service Design

> **claim**: 「知らない」から「行ってみたい」、そして「実際に行動する」までを
> 一つのサービス体験として設計している。

- **evidence**（✅ current App IA, #92 + `src/app/AppRouter.tsx`）:
  - 一次ジャーニー:
    `Home` → `Food Profile`（初回）→ `Exploration` → `Result` → `Story` →
    `Route` → `Spot` → `Action`。
  - 補助導線:
    - `Discover` = 診断なしで browse（`/discover`）。
    - `MOGU` = recent recommendations（`/mogu`）。
    - `My` = Saved Routes / Food Profile / optional Badges（`/my`）。
  - 実装上の route 表と対応: `AppRouter.tsx` の `/home /explore /explore/result
    /food-profile /story/:id /route /spot/:placeId /support /my-route /discover
    /mogu /my` ✅。
- **product/demo surface**: 60–90 秒デモで S0–S3 完走 → story → route → support
  の弧を説明（`docs/mvp-scope.md` §5）。アカウントレス・決定論的・
  geolocation 不要で再現可能。✅
- **維持可能性の主張**: 初回診断で終わらず、Discover / MOGU / My で再訪と
  次地域発見へつなぐ。これは service design claim（🔮 実績は未計測）。

---

## 7. Evidence Matrix / エビデンスマトリクス

用いた Open Data・fieldwork evidence・実在の Route / Spot destination を
verified / assumption / future vision で整理する。

### 7-1. 観光統計（verified Open Data / 公式調査）— ✅

| Source | 使う数値 | 役割 | 出典記録 |
|---|---|---|---|
| 東京都観光客数等実態調査（2023, 2024） | 観光消費額・外国在住者割合（38.1% / 41.8%）、訪都外国人（19.5M / 24.8M） | Problem / M2 | `docs/analytics/tokyo-tourism-baseline.md` dataset A |
| 国・地域別外国人旅行者行動特性調査（令和5年） | 訪問率（渋谷 67.1% … 奥多摩 0.7%）、平均泊 5.2、支出 ¥179,154、自然満足 76.8% | Problem / M1, M2 | 同上 dataset B |
| TCVB おでかけウォッチャー（2023–24） | 多摩は週末・季節ピーク、近隣集客、単一アンカー | Problem / M3（国内居住者 proxy） | 同上 dataset C |

注意：baseline 自体は research baseline（Issue #18）であり、**in-app analytics
dashboard ではない**。区部/多摩公式分割は非公開（proxy 使用）❓。

### 7-2. 施設 Open Data（verified）— ✅/🧪

| Source | 状態 | 役割 |
|---|---|---|
| 東京都教育庁 施設関連情報_奥多摩町 (`t000021d2000000151`, CC BY 4.0) | ✅ `origin: 'source'` | せせらぎの里美術館・奥多摩町森林館（実座標） |
| 奥多摩町 スポーツ施設一覧 (`t133086d3100000004`, CC BY 4.0) | ✅ `origin: 'source'` | 奥多摩総合運動公園（実座標） |
| 奥多摩観光協会 directory（19 row） | 🧪 `origin: 'demo'`（名前・住所は実在、座標は近似、c) All Rights Reserved） | wasabi / そば / 釣り / 温泉等の demo 施設 |

出典記録: `docs/okutama-facilities-source.md`。demo row の座標は fieldwork（#10）
で再検証が必要 👀。

### 7-3. GTFS（交通・移動）— 🧪/❓

| Source | 状態 | 役割 |
|---|---|---|
| 西東京バス GTFS（公共交通オープンデータセンター, `nishi_tokyo_bus_nt_bus`） | ❓ **未取得・未検証**（アクセストークン未取得, 8/8 時点） | 実データ置換予定 |
| コミット済み GTFS fixture (`src/data/gtfs-fixture/`, `origin: 'demo'`) | 🧪 | Route mobility の demo レイヤー |

出典記録: `docs/nishi-tokyo-bus-gtfs-source.md`。**検証済みの運行ダイヤとして
扱わない。**

### 7-4. Seed 食文化・場所・Route（editorial / demo）— 🧪

- 食文化（`src/data/seed-food-cultures.ts`; narrative は editorial, 事実は公開
  観光情報, 取得日 2026-08-08）:
  - `wasabi-okutama`（東京わさび）/ `yamame-okutama`（奥多摩やまめ）/
    `okutama-soba`（奥多摩そば）/ `okutama-konnyaku`（奥多摩こんにゃく）—
    Okutama-area
  - `kumma-hyakka-ome`（青梅くんまひゃっか）/ `uguisu-mochi-ome`（多摩の和菓子
    うぐいす餅）/ `yuzu-hinode`（日の出ゆず）— future expansion（8/23 の
    core-demo 前提ではない）
- Places（`src/data/seed-places.ts`; `origin: 'demo'`, 座標は近似）:
  `okutama-wasabi-field` / `okutama-tourism-office` / `okutama-fishing-center` /
  `okutama-soba-shop` / `okutama-michi-no-eki` / `kumma-hyakka-shop` /
  `uguisu-mochi-shop` / `hinode-yuzu-stand`
- Model route（`src/data/seed-routes.ts`; `origin: 'editorial'`）:
  `okutama-wasabi-journey`（half-day / 1-day）。mobility は編集上の見積もり。
  実在 store の営業情報等は source が裏付けない限り S6 は未検証表示 ❓。

### 7-5. Fieldwork（未取得 — assumption / pending）— 👀/❓

| 項目 | 状態 |
|---|---|
| #10 Okutama fieldwork（一次情報・素材） | **8/10 時点で完了確認なし**（Issue #10 は OPEN）。取得後、Story/Route/Spot/support の一次情報に差し替える |
| 生産者・地域側の課題 / 機会の一次情報 | ❓ 未取得 — 得られたら source 付きで追記 |
| 店舗の実営業情報（時間・料金・予約可否・言語対応等） | ❓ 未取得 — S6 は未検証 state を表示 |
| 実訪問・地域消費への転換実績 | ❓ 未取得 — demo では contribution metrics を捏造しない |

### 7-6. Future / Editorial Vision — 🔮

- multi-region 展開（Product scope は 23 区外全体、奥多摩は first pilot）。
- S9 Badge / next-discovery（stretch, 8/23 後）。
- 観光消費の分散が実際に「地域分散」へ効く、という因果の実証（Pitch では
  検証済み数値と分けて提示）。

---

## 8. Evidence Needed Before Submission / 提出までに必要

8/23 の Pitch / Demo までに、少なくとも以下を source-backed にする
（Issue #100「Evidence Needed Before Submission」より。✅ = 現時点で充足 /
未完 = 作業中・未取得）。

- [x] 23区への観光集中 / outer Tokyo との差を示す quantitative evidence
  （baseline M1–M3 ✅）
- [x] 使用した Open Data と、その Product role（7-1 / 7-2 / 7-3 ✅/🧪）
- [ ] 奥多摩 first-pilot fieldwork evidence（#10, 👀 未完了）
- [x] 実在する Route / Spot / action destination（🧪 実在の店舗・施設名、
  route は editorial; 座標・営業情報は要再検証）
- [ ] 地域側 / 生産者側の課題または機会についての一次情報（👀 未取得）
- [x] Product が `行きたい理由` を作る mechanism の説明（Section 3 ✅）
- [x] MVP と future multi-region vision の境界（Section 4 ✅）
- [ ] five judging axes 各1つ以上の concrete evidence（Section 6 — Data / Idea /
  Tech / Service Design は✅、**Impact は entry-point のみ実データで、下流は
  assumption**）
- [ ] 公式テーマ一覧の確認（公開され次第、Section 5 用語を更新 ❓）

**Honesty guardrail**: fieldwork・interview・stakeholder feedback・統計・訪談の
捏造禁止。evidence が無い軸は「evidence 尚未取得、需 #10 fieldwork 補充」と
明記する。観光分散の実効性は仮説（✅ 数値は入口、🔮/❓ 実績は未計測）。

---

## 9. Pitch One-liner / ピッチ・ワンライナー

> 東京23区に集中する観光客に、地域ならではの「行きたい理由」を届け、
> 東京全体へ観光の流れを広げる。

- 説明の核（60–90 秒 demo）: 「知らない」地域文化 → Story で「わかる」 →
  Route で「行ける」 → Support で「支える」。`docs/mvp-scope.md` §5 の demo
  journey と整合。✅
- 統計の最短表現（baseline §6 より）: 渋谷 67% / 新宿 57% / 銀座 50% vs 多摩は
  3.5% 未満、奥多摩 0.7%。✅
- 注意: ワンライナーの後段（「東京全体へ観光の流れを広げる」）は **未来像
  （vision, 🔮）** であり、実績値ではない。Pitch で数値を伴わせる場合は検証済み
  source に限定する。

---

## 10. Integration / 再利用方法

本文件は以下で参照する source of truth とする：

- **README / Product overview** — 競技ポジショニングと MVP 境界。
- **#19 Open Data priority decisions** — dataset の Product role / priority 判断。
- **#86 roadmap / scope decisions** — 新機能の採用判断（Section 4 guardrail）。
- **Demo script** — `docs/demo-script.md` の narrative と審査軸の対応。
- **Final presentation / pitch** — ワンライナー、Impact chain、Evidence Matrix。

新機能提案時は必ず以下を問う：

> `Data / Idea / Tech / Impact / Service Design` のどの評価を、どの concrete
> evidence で強くするのか？

どの評価にも実質的に寄与しない scope expansion は原則 8/23 後へ送る。

---

## 11. Acceptance Criteria Check / 完了条件チェック

- [x] `docs/hackathon/competition-alignment.md` exists
- [x] #85 Product Vision と矛盾しない（奥多摩を first pilot と明記）
- [x] 奥多摩を permanent scope とせず first pilot と明記（Section 4）
- [x] 観光・国際交流を primary alignment として説明（Section 1）
- [x] 交通・移動との secondary relationship を説明（Section 1）
- [x] five judging axes ごとに `claim → evidence → product/demo surface`
  （Section 6）
- [x] #19 の Open Data と接続（Section 6-1, 7, 10）
- [x] #86 の scope / critical path を不用意に拡大しない（Section 4）
- [x] Pitch / Demo で使う statements が verified / assumption / future vision に
  区別される（Evidence legend + Section 7）
- [x] README / demo script / presentation 更新時に参照できる source of truth になる

---

## Sources / 出典

**Official（外部）**
- 都知事杯オープンデータ・ハッカソン2026 公式サイト:
  https://odhackathon.metro.tokyo.lg.jp/
  - 募集要項（日本語審査基準5軸）: https://odhackathon.metro.tokyo.lg.jp/recruitment/
  - English recruitment（5 axes）: https://odhackathon.metro.tokyo.lg.jp/en/recruitment/
  - Awards: https://odhackathon.metro.tokyo.lg.jp/en/recruitment/#awards
  - Retrieved 2026-08-10.

**Repository（本文件が依拠する repo 内 source）**
- `AGENTS.md`
- `docs/specs/product/hackathon-product-contract.md`（#85 Product Vision + #41 Hackathon UX）
- `docs/project-roadmap.md`（#86）
- `docs/analytics/tokyo-tourism-baseline.md`（#18; dataset A/B/C の出典を含む）
- `docs/okutama-facilities-source.md`（#16）
- `docs/nishi-tokyo-bus-gtfs-source.md`（#17）
- `docs/mvp-scope.md`, `docs/demo-script.md`
- `src/data/model.ts`, `seed-food-cultures.ts`, `seed-places.ts`, `seed-routes.ts`,
  `src/data/generated/okutama-places.ts`, `src/data/gtfs-fixture/`
- `src/app/AppRouter.tsx`, `src/lib/*`（food-profile / exploration / saved-routes /
  mogu-recent / gtfs）, `src/i18n/`

**Open Data dataset ids（repo 内で使用）**
- `t133086d3100000004` — 奥多摩町 スポーツ施設一覧（CC BY 4.0）
- `t000021d2000000151` — 東京都教育庁 施設関連情報_奥多摩町（CC BY 4.0）
- `nishi_tokyo_bus_nt_bus` — 西東京バス GTFS（未取得）❓
- dataset A / B / C — `docs/analytics/tokyo-tourism-baseline.md` §2
