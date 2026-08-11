# Tokyo Local-Food Restaurant & Accessibility Data Opportunities — 東京ローカルフード飲食店・アクセシビリティデータ機会

> Issue #132 (TAC-10) · Source-first evaluation of Tokyo local-food restaurant /
> public sources and barrier-free Open Data.
> Status: **research deliverable** (no infrastructure, no product code, no
> ingestion). Feeds the #130 opportunity map.
> Retrieval / last-verified: **2026-08-12** (all URLs live-checked; representative
> files downloaded and inspected at field/record level by the coordinator).
> Related: #19 (registry) · #112 (MVP framing) · #92 (IA) · #130 (opportunity map).

---

## 1. Executive summary / 実行要約

Tokyo's local-food and accessibility data surface is **thin, skewed to the 23
wards, and mostly *official web*, not Open Data**. The two datasets that do
exist in open form each answer only a narrow question, and neither reaches the
Tama MVP corridor in a way that supports a new product surface by itself.

- **「東京都内の飲食店のバリアフリー情報」(barrier-free guide) is the only
  true Tokyo-wide barrier-free Open Data set for restaurants — but all 210
  records are in the 23 wards; Tama has zero.** It is a store-level
  yes/no flag table (wheelchair entrance width, step height, accessible toilet,
  foreign-language menu, allergy / vegan / halal by prior request). Geographic
  coverage does not match the Tama MVP pilot.
- **The 「青梅市 飲食店一覧」 food-business license list (CC BY 4.0, 1,593 rows,
  100% lat/lng) is the only Tama-municipality restaurant dataset found** — but
  it is a *regulatory* list: it proves a license was issued and the facility
  exists, not that it is open, in business now, or serves local ingredients. It
  contains no menu, ingredient, hours, or accessibility fields.
- **The JA Tokyo direct-sale directory (`tokyo-ja.or.jp/farm/store/`) is the
  most complete Tama-relevant "eat-at-the-source" surface (西多摩・南多摩・北多摩
  across 60+ outlets) — but it is `official public web` (All Rights Reserved),
  not Open Data.** This matches #130's existing F2 finding and the established
  editorial-with-provenance pattern; it cannot be ingested as open data.
- **Recommended product conclusion**: the "eat Tokyo ingredients / barrier-free
  route" hypotheses are **not** data-supported as an ingestion-based feature
  today. They remain **editorial-with-provenance** opportunities, with the Ome
  license list usable only as an *existence/status* validation layer and the
  barrier-free set limited to a 23-ward (non-MVP) reference until Tama coverage
  exists.

No partnership or endorsement is inferred from any official listing, and no
`uses Tokyo ingredient` row is equated with `represents regional FoodCulture`.

---

## 2. Method / 方法

- Sources were discovered via the Tokyo Open Data Catalog CKAN API
  (`package_search`, no key required), provider sites (JA Tokyo Central Union,
  東京都産業労働局), and cross-referenced against #130 / #19.
- Every candidate was fetched and inspected at **field/record level** — not
  landing-page descriptions. Files downloaded 2026-08-12:
  - `barrier-free-guide.csv` (51 KB, 210 rows) — parsed with CP932 handling.
  - `132055_food_business_all.xlsx` (228 KB, 1,593 data rows, 34 columns) —
    parsed via XLSX XML extraction.
  - JA direct-sale directory (`/farm/store/`, `/farm/edomap/`) — page text
    extraction (no bulk download available).
- Classification follows AGENTS.md「Data and Sources」and #19 status values:
  `Open Data` / `official public web` / `unverified`.

---

## 3. Source records / ソースレコード

### 3.1 東京都内の飲食店のバリアフリー情報 (barrier-free guide)

| Field | Value |
|---|---|
| Provider | 東京都産業労働局 (Tokyo Metropolitan Government, Bureau of Industrial and Labor Affairs) |
| Source URL | `https://www.opendata.metro.tokyo.lg.jp/sangyouroudou/barrier-free-guide.csv` |
| Dataset ID (CKAN) | `t000012d0000000063` |
| License | **CC BY 4.0** (Open Data) |
| Format | CSV (CP932-encoded; header BOM `93 58 96` = CP932 BOM) |
| Retrieval date | 2026-08-12 (live fetch); catalog `metadata_modified` 2024-03-12 |
| Rows | **210** |

**Fields (22 columns, store-level yes/no flags with `〇` = yes, blank = no/na):**

店名 / 店舗電話番号 / 住所 / 営業時間 / 定休日 / アクセス / **入口幅 80cm 以上** /
**入口の移動経路 平坦 or 段差 2cm 以下** / **店舗内の椅子移動可能** / **店舗内 車椅子移動可能** /
**テーブル下スペース** / **店内 トイレ** / **車椅子トイレ or オストメイト** / **写真メニュー** /
**英語等外国語メニュー** / **点字メニュー** / **筆談** / **手話スタッフ** / **事前申請 アレルギー** /
**事前申請 ベジ・ヴィーガン** / **事前申請 ハラール** / 店舗URL

**What the data reliably says**
- Store-level *self-/staff-reported* availability flags for 12 accessibility and
  4 communication/allergy capabilities, plus contact URL.
- All 210 rows carry a concrete address, phone, hours, and access text.

**What it does not say**
- **Geographic coverage is 23-ward-only (Tama = 0 records).** Distinct city/ward
  count = 42; top are 台東(19) 港(15) 中央(14) 千代田(10) 墨田(10) 江東(10) —
  all 23-ward. The Tama MVP corridor (青梅・奥多摩・あきる野・日の出・瑞穂…) has
  **zero** entries.
- No coordinates (address text only), no floor-level elevator details, no
  audited/verified flags (self-reported), no ingredient or menu content.
- **Freshness is unclear**: catalog metadata_modified is 2024-03-12; there is no
  per-row updated timestamp. Treat as a snapshot, not a live feed.
- Missing `〇` is ambiguous between "no" and "not surveyed".

**Observed field statistics (210 rows)**

| Field | 〇 (yes) | blank |
|---|---|---|
| 入口幅 80cm 以上 | 192 | 18 |
| 車椅子トイレ or オストメイト | 110 | 100 |
| 写真メニュー | 136 | 74 |
| 英語等外国語メニュー | 32 | 178 |
| 点字メニュー | 0 | 210 |
| 手話スタッフ | 1 | 209 |
| 事前申請 アレルギー | 1 | 209 |
| 事前申請 ベジ・ヴィーガン | 19 | 191 |
| 事前申請 ハラール | 1 | 209 |

**Classification**: `Open Data` (CC BY 4.0).

**Traveler value / product fit**
- Directly answers "can I eat here with a wheelchair / allergy / English menu?"
  for 23-ward spots — practical `Spot` chip data **where coverage exists**.
- **Not MVP-aligned**: the MVP pilot is Tama; 0 Tama rows make this a
  reference/optional layer, not a Tama feature.

**Verification needs before any use**: confirm the 2024-03-12 date is not the
only revision; check whether a per-ward CP932 decode rule is needed; treat
blank as "unconfirmed" not "no".

**Recommendation**: `later` for the Tama MVP; `experiment` for a 23-ward
accessibility reference layer. **Do not use for Tama claims.**

---

### 3.2 青梅市 飲食店一覧 (Ome food-business license list)

| Field | Value |
|---|---|
| Provider | 青梅市 (Ome City) |
| Source URL | `https://www.opendata.metro.tokyo.lg.jp/ome/132055_food_business_all.xlsx` |
| Dataset ID (CKAN) | `t132055d0000000009` |
| License | **CC BY 4.0** (Open Data) |
| Format | XLSX, 1 sheet, 1,593 data rows, 34 columns |
| Retrieval date | 2026-08-12 (live fetch); resource last_modified 2024-03-21 |
| Rows | **1,593** |

**Fields (34 columns, representative):** 全国地方公共団体コード / ID / 地方公共団体名 /
施設名称 / 施設名称_英字 / 営業の種類 / 所在地_連結表記 / 施設所在地_都道府県・市区町村・町字・番地 / 施設方書 /
**緯度** / **経度** / 施設電話番号 / 法人名 / 法人番号 / 許可番号 / 初回許可年月日 / 許可年月日 / 許可開始日 / 許可満了日 /
**廃業年月日** / 申請区分 (新規/更新)

**What the data reliably says**
- Every licensed food facility in Ome City exists per the regulatory record, with
  **100% lat/lng coverage (1,593/1,593)** and precise address + phone.
- License *category* breakdown (representative): 飲食店営業(一般飲食店) 632,
  菓子製造業(その他) 73, その他の食料・飲料販売業(店舗) 61, コンビニ 50,
  飲食店営業(集団給食) 49, そば屋 32, 弁当屋 28, **野菜果物販売業 14**,
  豆腐製造業 5, 酒類製造業 1, 食料品等販売業(店舗) 33 …
- `廃業年月日` is **empty for all 1,593 rows** → the file reflects license
  *issuance history*, not current operating status.

**What it does not say**
- **No menu, no ingredients, no local-ingredient linkage, no hours, no
  accessibility, no English.** It cannot tell you whether a shop uses Tokyo
  produce or is even currently open for business.
- `申請区分` values are 新規/更新 — an "updated" license is not an "open now"
  guarantee.
- Ome City only — no other Tama municipality publishes a comparable dataset in
  the Tokyo catalog at field-checkable level.

**Classification**: `Open Data` (CC BY 4.0).

**Traveler value / product fit**
- A **facility existence / status validation layer**: confirm a Spot in the demo
  seed is a real licensed facility (identity check), or detect new/closed
  licenses over time.
- **Not** a discovery source for "where to eat local food" — no ingredient or
  quality signal.

**Verification needs before any use**: reconcile 廃業年月日 emptiness against the
city's operational list; confirm refresh cadence (last_modified 2024-03-21);
map license category → #92 surface conservatively (do not label as "open" or
"serves local").

**Recommendation**: `experiment` — keep as a validation/detection layer, not a
content source.

---

### 3.3 JA 東京中央会 都内JA直売所マップ (direct-sale directory)

| Field | Value |
|---|---|
| Provider | JA東京中央会 (JA Tokyo Central Union) |
| Source URL | `https://www.tokyo-ja.or.jp/farm/store/` (directory), `/farm/edomap/` (history map) |
| License | **All Rights Reserved — `official public web`, not Open Data** |
| Format | HTML directory (no bulk download) |
| Retrieval date | 2026-08-12 (live fetch) |
| Coverage | 西多摩 / 南多摩 / 北多摩 / 区内 / 島しょ |

**What the data reliably says**
- A complete **regional directory** of JA direct-sale outlets across all five
  Tokyo subregions. Tama-relevant examples (verbatim from page):
  - **西多摩**: JA西東京 (かすみ直売センター, グリーンセンター, 古里経済店舗, 小曽木経済店舗),
    JAにしたま (瑞穂町農畜産物直売所, 羽村市農産物直売所, 福生支店直売所, ベジ・ベジ),
    **JAあきがわ (秋川ファーマーズセンター, 五日市ファーマーズセンター)**,
    **日の出町ふれあい農産物直売所**, 経済センターマイム
  - **南多摩**: JA八王子 (ふれあい市場, 園芸センター), JA東京みなみ (グリーンライフ七生, 多摩),
    JA町田市 (アグリハウス ×5)
  - **北多摩**: JAマインズ (西府/多磨/調布/狛江/神代), JA東京みどり (国立, 武蔵村山, 昭島,
    **みのーれ立川**, 仲原店)
- This matches and extends #130 F2 (60+ outlets).

**What it does not say**
- No per-outlet structured data (address/lat-lng/hours/stock) in bulk; each
  outlet is a manual directory entry. No ingredient-level claims, no license for
  reuse, no coordinates, no freshness timestamps.
- Listing in the directory implies nothing about current opening status, stock,
  or seasonal produce.

**Classification**: `official public web` (All Rights Reserved) — **cannot be
ingested as Open Data**.

**Traveler value / product fit**
- The "buy at the source / 當季東京食材" opportunity (P1 in #130) remains
  strongest here, but only via **editorial-with-provenance** (the established
  pattern in `docs/okutama-facilities-source.md`): manual curated rows with
  source attribution, not an ingestion pipeline.

**Verification needs before any use**: per-outlet confirmation of address/hours
by a human or a small manual curation step; do not auto-ingest.

**Recommendation**: `experiment` (editorial) — the single most Tama-relevant
local-food surface, but closed.

---

### 3.4 Other probes (negative / confirming results)

- CKAN `package_search?q=restaurant` → **0 hits** (no English-titled restaurant
  open dataset).
- CKAN `package_search?q=農産物直売所` → 958 hits but top results are unrelated
  (美容所/クリーニング/理容所/施術所/避難所); no municipal produce-direct-sale
  dataset surfaced in the Tokyo catalog scan.
- `sangyo-rodo.metro.tokyo.lg.jp` direct-sale paths probed → 404 (page moved or
  removed); direct-sale info now lives under the JA directory (3.3).
- `だれでも東京` (barrier-free portal) remains `official public web` with no
  confirmed API (#19 candidate; not re-verified here).

---

## 4. Product-experience hypothesis testing / 体験仮説の検証

GH #132 asks to test (not assume) four opportunity shapes. Results:

| Hypothesis | Tested against | Verdict |
|---|---|---|
| "この東京食材を食べられる店 → その産地へ行く" | Ome license list (no ingredient field) + JA directory (no ingredient claims) | **Not data-supported.** No open dataset links ingredients → restaurants. Editorial only. |
| "今日は東京産を食べる" Discover collection | JA directory (official web, closed) | **Editorial-feasible**, not open-data-feasible. P1 (#130) stands but needs provenance curation. |
| barrier-free 条件から安心して巡れる regional route | barrier-free guide (23-ward only, Tama=0) | **Not Tama-feasible.** Zero Tama coverage blocks a Tama barrier-free route; 23-ward route possible but outside MVP. |
| local ingredient × restaurant × producer / area Story | Ome list (no ingredient) + #130 C1/C5 cultural anchors | **Partly editorial.** Story grounding via cultural anchors yes; ingredient→restaurant linkage no. |

**Acceptance-criteria checkpoints (GH #132):**
- ✅ restaurant/public-source vs Open Data types clearly distinguished (3.1/3.2
  Open Data vs 3.3 official web).
- ✅ several real sources inspected at field/record level (3.1, 3.2 parsed at
  column/row granularity).
- ✅ at least one product-experience hypothesis tested against actual fields
  (§4).
- ✅ no partnership/endorsement inferred from official listings.
- ✅ `uses Tokyo ingredient` not equated with `represents regional FoodCulture`.
- ✅ dietary/allergy/language/accessibility claims not inferred when missing
  (barrier-free blanks treated as unconfirmed).
- ⏳ feeds #130 opportunity map — this doc is the feed (suggested registry updates
  in §5).
- ✅ implementation/enrichment split to follow-up only where data proved useful
  (it did not prove ingestion-useful; recorded, not built).

---

## 5. Registry / opportunity-map updates suggested / レジストリ更新提案

Changes suggested to `docs/open-data-registry.md` / `docs/data-opportunity-map.md`
(not applied in this Issue; pending Issue owner review):

| Doc | Row | Suggested change | Evidence |
|---|---|---|---|
| registry §3.1 | 東京都内の飲食店バリアフリー情報 | `Candidate — unverified` → **Available (Open Data, CC BY 4.0, 210 rows, 23-ward-only; Tama=0 limitation)** | §3.1 |
| registry §3.1 | 青梅市 飲食店一覧 | **New** `Available` (Open Data, CC BY 4.0, 1,593 rows, 100% lat/lng, license-history only) | §3.2 |
| registry §3.3 | 都内JA直売所マップ | **New** row under official-web sources; `All Rights Reserved`, editorial-only | §3.3 |
| opportunity map §4.2 | (F2 extension) JA直売所 | Confirm 60+ outlets, five subregions; editorial pattern | §3.3 |
| opportunity map §4.5/§5 | accessibility | Add explicit limitation: barrier-free set is 23-ward-only → not a Tama route basis | §3.1, §4 |

---

## 6. Data limitations / honesty notes / データの限界

- **Tama has essentially no local-food *restaurant* open data.** Only Ome
  publishes a field-level license list; no ingredient/accessibility/menu open
  data exists for the corridor. Fieldwork/editorial remains the correct strategy
  (consistent with #130 §3).
- **Barrier-free guide covers the 23 wards only.** Any accessibility-driven
  feature for the Tama MVP cannot be sourced from it.
- **`廃業年月日` empty everywhere** — license lists are historical; "listed" ≠
  "open now".
- **Barrier-free blanks are ambiguous** (no vs not surveyed) — never render as a
  negative claim.
- **JA directory is closed** (All Rights Reserved) — reuse requires editorial
  curation with provenance, not ingestion.
- **Ome license `last_modified` 2024-03-21** — freshness must be reconfirmed
  before any production reliance.

---

## 日本語要約

東京都のローカルフード飲食店・アクセシビリティの Open Data は**少なく、23区に偏り、
大半が official web で Open Data ではない**。

- 唯一の都域バリアフリー Open Data「飲食店のバリアフリー情報」(CC BY 4.0, 210件) は
  **全件 23区**、多摩は 0 件。店舗単位の有無フラグ表で、アクセス経路・車椅子トイレ・
  英語メニュー・アレルギー/ヴィーガン/ハラール(事前申請)等を確認できるが、座標なし・
  自己申告・2024-03 snapshot。
- 多摩の自治体で飲食店 open data があるのは**青梅市の営業許可一覧**(CC BY 4.0,
  1,593件、緯度経度100%)のみ。ただし許可の歴史で、営業中か・地元食材かは言えない
  (メニュー・食材・営業時間・バリアフリー欄なし、廃業年月日は全件空)。
- 多摩で最も使える「その場で食べる」面は **JA東京中央会の直売所ディレクトリ**
  (西多摩/南多摩/北多摩、60+店舗) だが **All Rights Reserved の official web** —
  Open Data ではなく、編集+出典の editorial 運用が正しい。
- 結論: 「東京食材を食べられる店」「バリアフリーで巡れる多摩ルート」は**データで
  支えられない**ので、今回の Issue では ingestion しない。青梅リストは存在/ステータス
  検証層、バリアフリー表は 23区参照層としてのみ可能。registry への更新提案を §5 に
  記録(本 Issue では適用せず)。
