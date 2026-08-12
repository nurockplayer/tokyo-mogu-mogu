# Tokyo-Wide Open Data Registry — 東京広域 Open Data レジストリ

Status: research index / registry (Issue #19). Tracking Issue: #19.

This is a **research index**, not an ingestion Epic and not a blocking dependency
for any child feature. It records the Open Data the team knows about, what role
each dataset plays in the current Product, and its verified adoption state. When
a dataset is promoted to implementation, it is cut out into its own Issue and
its `Status` / `Related Issue` fields here are updated.

- Product Vision / MVP boundary source of truth: Issue #112 +
  `docs/specs/product/hackathon-product-contract.md`.
- Current App IA source of truth: Issue #92 (`Home / Discover / MOGU / My`).
- Data provenance rules: `AGENTS.md`「Data and Sources / データと出典」.

---

## 1. Purpose & scope / 目的と範囲

**Purpose.** Maintain a single place to answer, for every dataset the team
considers: *what it is, who provides it, where it is from, under what license,
which #112 Product mechanism and #92 IA surface it supports, how urgent it is for
the 2026-08-23 demo, and whether the repository actually integrates it.*

**Scope.**

- Tokyo-wide regional discovery / mobility / practical / impact data — **not
  Okutama-only**. The registry is structured so a future outer-Tokyo region can
  be added without reshaping the schema (a `Region scope` field carries the
  geographic coverage; no field is Okutama-specific).
- Everything recorded here must be **verifiable inside this repository** (a
  `docs/` source doc, a seed/generated data file, an ingestion script, or a
  test). No dataset is added on an internet search alone; a field that cannot be
  verified is marked `unverified` rather than guessed.

**Out of scope** (per Issue #19):

- Dataset ingestion / feature implementation (independent Issues).
- Adopting every candidate dataset for the MVP.
- Multi-region production implementation before 2026-08-23.
- Features whose only justification is "we have Open Data".

---

## 2. Evaluation axes / 評価軸

Every dataset is evaluated against these axes. "Current Product Role" must map
to a concrete #112 mechanism and #92 surface — never to "we could stuff this data
into a store".

| Axis | Meaning | Values (examples) |
|---|---|---|
| Dataset / Provider / Source URL | Identity and origin | — |
| License | Reuse terms; `unverified` when not confirmed in repo | CC BY 4.0 / 公共交通オープンデータ基本ライセンス / All Rights Reserved / unverified |
| Format / Update frequency | Data shape and freshness | CSV / GTFS / PDF report / JSON; annual / quarterly / static |
| Geographic coverage | Region scope; must stay extensible to future outer-Tokyo regions | 奥多摩 / Tama / 東京全域 / 23区 |
| Key fields | What columns/attributes the data carries | lat/lng, hours, 観光入込客数 … |
| Product Vision use | Which #112 mechanism it supports | tourism dispersion / regional discovery / mobility / story / practical UX / impact evidence |
| Current IA use | Which #92 surface it supports | Home / Discover / Story / Route / Spot / Pitch (and MOGU / My only as explicitly excluded user-state) |
| Hackathon MVP use | Whether the 2026-08-23 Okutama pilot actually uses it | yes / no / data-layer-only |
| Future region portability | Can a future outer-Tokyo region reuse it | high / medium / low |
| Known limitations | Honest caveats | approximate coordinates, small samples, closed copyright, token-gated fetch |
| Related Issue / PR | Where the work is tracked | #16 / #17 / #18 / #80 / #93 … |
| Retrieval / last-verified date | When the info was checked | ISO date (all current entries: 2026-08-08) |

**Status values** used in the registry table:

- `Integrated` — used by a shipping repository artifact (a generated file
  consumed by the data layer, or a baseline doc used in the pitch). A note says
  exactly how it is wired.
- `Available` — a real dataset identified with source + license recorded in
  this repo; fetching or wiring may still be pending (e.g. token-gated GTFS).
- `Candidate` — team-identified future option; source / license not verified in
  this repo (`unverified`), not part of the 2026-08-23 core path.

---

## 3. Dataset registry / データセット一覧

### 3.1 Main registry table

Based on the Issue #19 draft table, with the **verified** status per this repo
(read on 2026-08-10, branch `docs/19-open-data-registry` @ `df0acf7`).

| Dataset | Provider | Current Product Role | Priority | Status | Related Issue |
|---|---|---|---|---|---|
| 奥多摩町 観光施設一覧 | 奥多摩町 / 東京都教育庁 (Tokyo Open Data Catalog) | Route / Spot / Discover | P0 | **Integrated — generated, not app-wired** (see §3.2.1) | #16 (closed), #80 (closed), #93 (open) |
| 西東京バス GTFS | 西東京バス / 公共交通オープンデータセンター (ODPT) | First-pilot mobility enrichment (route context) | P1 | **Available — data layer built, demo fixture only** (see §3.2.2) | #17 (closed), #80 (closed) |
| 東京都観光客数等実態調査 | 東京都産業労働局 | Pitch impact evidence / tourism-distribution problem statement | P0 | Integrated (baseline doc, dataset A) | #18 (closed), #85 |
| モバイルデータを活用した訪都旅行者動態調査 | 東京都 | 23区 vs outer-Tokyo movement / tourism distribution / Impact | P0 (as drafted) | **Candidate — not located** (TCVB proxy used; see §3.2.4) | #18, #85 |
| 国・地域別外国人旅行者行動特性調査 | 東京都 | Persona / travel behavior / Marketing / Impact | P1 | Integrated (baseline doc, dataset B) | #18 |
| 東京都指定文化財一覧 | 東京都 | Future regional Story / Discover enrichment | P2 | Candidate — unverified in repo | — |
| 緑のオープンデータ GIS | 東京都 | Future geography / nature discovery | P2 | Candidate — unverified in repo | — |
| 区市町村別の観光・地域資源 dataset | 東京都 / 各自治体 | Future region expansion / Discover candidate | P2 | Candidate — unverified in repo | — |
| 公共交通 Open Data / GTFS（多摩地域ほか） | 各交通事業者 | Future region accessibility / route feasibility | P2 | Candidate — unverified in repo | — |
| 奥多摩町 公衆（観光）トイレ一覧 | 奥多摩町 | Route/Spot practical UX | P2 | Candidate — unverified in repo | — |
| だれでも東京 | 東京都 | Spot / future-region accessibility | P2 | Candidate — unverified in repo | — |
| 東京都内の飲食店バリアフリー情報 | 東京都 | Spot / future-region accessibility | P2 | Candidate — unverified in repo | — |
| 農林業センサス 市町村別統計表（2020年, 東京都分） | 農林水産省 / e-Stat | Regional producer / succession context | P3 | Integrated (#128 — `src/data/municipality-agriculture.ts`) | #128 |

> **Verified-in-repo rows carry an evidence file** in §3.2. Candidate rows that
> are not backed by a repo artifact are marked `unverified`; their Source URL /
> License cells are intentionally left blank rather than guessed.

### 3.2 Per-dataset evidence & detail

Evidence column = the repository file(s) this entry was verified against on
2026-08-10.

#### 3.2.1 奥多摩町 観光施設一覧 — the "facilities list" is **not** one open dataset

- **Evidence**: `docs/okutama-facilities-source.md`, `src/data/generated/okutama-places.ts`, `scripts/ingest-okutama/`, `src/data/index.ts`.
- **Verified facts**:
  - Okutama Town publishes **no** downloadable 観光施設一覧 open dataset. The
    genuinely-licensed open data about Okutama facilities is two CC BY 4.0
    Tokyo Open Data Catalog datasets:
    - 奥多摩町 スポーツ施設一覧 — `t133086d3100000004` (CSV, 195 cols)
    - 東京都教育庁 施設関連情報_奥多摩町 — `t000021d2000000151` (CSV, Shift-JIS)
  - The de-facto 観光施設一覧 is the 一般社団法人奥多摩観光協会 directory
    (`https://www.okutama.gr.jp/site/`), which is **All Rights Reserved** — not
    open data.
  - `src/data/generated/okutama-places.ts` exports `OKUTAMA_PLACES`:
    **3 real rows** (`origin: 'source'`, CC BY 4.0 — 奥多摩町立せせらぎの里美術館,
    奥多摩町森林館, 奥多摩総合運動公園) and **19 demo rows** (`origin: 'demo'`,
    `sourceType: 'official_web'`, from the closed-copyright association
    directory; coordinates approximate via OSM Nominatim).
  - Retrieval date: **2026-08-08**. Idempotent re-runnable ingestion exists
    (`node scripts/ingest-okutama/generate.ts`).
- **Status nuance (important)**:
  - The ingestion **pipeline and generated file exist** (Issue #16 closed), but
    `src/data/index.ts` does **not** import `OKUTAMA_PLACES`. The app's runtime
    `places` / `foodCultures` come from `src/data/seed-places.ts` (8 places, all
    `origin: 'demo'`, source 奥多摩観光協会) and `src/data/seed-routes.ts`
    (editorial route, `SOURCE_OKUTAMA`).
  - So the current Route/Spot (Issues #45/#80) are **not** backed by the open
    data rows; they are editorial/demo seed content. Wiring `OKUTAMA_PLACES`
    into the data layer is an open follow-up, not done state.
  - License: `CC BY 4.0` for the 3 real rows; `All Rights Reserved` for the 19
    demo rows (not redistributable as open data).
  - `Hackathon MVP use`: intended P0 Spot/Discover source, but app-wiring pending.

#### 3.2.2 西東京バス GTFS

- **Evidence**: `docs/nishi-tokyo-bus-gtfs-source.md`, `scripts/ingest-gtfs/README.md`, `src/data/gtfs-fixture/`, `src/lib/gtfs.ts`, consumer grep.
- **Verified facts**:
  - Real dataset: 西東京バス GTFS/GTFS-JP, ODPT catalog
    `nishi_tokyo_bus_nt_bus` (`https://ckan.odpt.org/dataset/nishi_tokyo_bus_nt_bus`),
    license **公共交通オープンデータ基本ライセンス**.
  - **Real data was never fetched** (ODPT access token unavailable in the #17
    implementation environment, retrieved 2026-08-08). The committed
    `src/data/gtfs-fixture/` is a **demo** snapshot (`origin: 'demo'`,
    `sourceLabel: '西東京バス（奥多摩エリア・デモ）'`) — approximate
    coordinates, illustrative times. Not verified timetable data.
  - Data layer (`src/lib/gtfs.ts`: `findNearbyStops`, `getNextDepartures`,
    `GtfsDataset`) is pure and built; optional/missing-GTFS degrades safely.
  - **Consumer state**: the transit-aware consumer `src/components/NextDiscovery.tsx`
    (+ `src/lib/progression.ts`) exists but is **not mounted** in any page
    (checked 2026-08-10); it is legacy "next discovery" infra. The current S5
    Route uses editorial mobility segments (e.g. `JR青梅線・西東京バス` labels),
    not GTFS data. GTFS fixture is consumed only by tests today.
  - `Hackathon MVP use`: **data-layer only / optional**. Per #112/#92, GTFS is
    route-mobility **enrichment**; realtime/next-departure is **not** core demo
    UX. No fares / no realtime / no route planning by scope.

#### 3.2.3 東京都観光客数等実態調査 (baseline dataset A)

- **Evidence**: `docs/analytics/tokyo-tourism-baseline.md` §2 (dataset A).
- **Verified facts**: 東京都産業労働局観光部企画課, survey years 2023 (令和5年)
  & 2024 (令和6年). Catalog BODIK R5/R6; open-data CSVs under
  `https://www.opendata.metro.tokyo.lg.jp/sangyouroudou/tourist_number_survey/`.
  License **CC-BY-4.0** (per BODIK). Figures used: 観光入込客数, 観光消費額,
  share 外国在住者 38.1% (2023) / 41.8% (2024), avg places visited per person.
- **Status**: Integrated — the baseline doc is the #112/#18 pitch artifact.
- **MVP use**: pitch impact evidence (P0), not in-app.

#### 3.2.4 モバイルデータを活用した訪都旅行者動態調査

- **Evidence**: `docs/analytics/tokyo-tourism-baseline.md` §2 availability note
  and §7 "What needs re-checking".
- **Verified fact**: as of retrieval **2026-08-08**, **no public report or
  open-data release with quantitative figures could be located** for this named
  candidate on the 東京都産業労働局 site or the Tokyo open-data catalog. It is
  **not used** for any baseline figure.
- **Proxy**: TCVB おでかけウォッチャー reports (dataset C, Vol.1–3, 2023–2024)
  serve as the mobile-data proxy; they are opt-in GPS data for **domestic
  residents only** (directional, not a census).
- **Status**: Candidate (as drafted, P0), but honestly **not located**. If a
  release appears, it is the preferred direct source for journey-level
  central-vs-Tama flows — update this row and the baseline when it does.

#### 3.2.5 国・地域別外国人旅行者行動特性調査 (baseline dataset B)

- **Evidence**: `docs/analytics/tokyo-tourism-baseline.md` §2 (dataset B), §3.2–3.3.
- **Verified facts**: 東京都, 2023 (令和5年) report PDF
  (`https://www.sangyo-rodo.metro.tokyo.lg.jp/toukei/tourism/03_r5houkoku.pdf`),
  airport questionnaire n=12,020. Used figures: 訪問した場所 visit rates
  (渋谷 67.1% … 奥多摩 0.7%), 図表16 activity (奥多摩 自然を感じる 76.8%,
  small sample n=15 — directional), 図表44 (5.2泊, ¥179,154).
- **License**: public government survey report; **no explicit open-data license
  on the PDF** — attribute when reused publicly.
- **Status**: Integrated (baseline doc).

#### 3.2.6–3.2.13 Candidate datasets (not present in this repo)

All of the following appear in the Issue #19 draft table but have **no repo
artifact** on 2026-08-10 (no source doc, no seed, no ingestion script). Their
`Source URL`, `License`, `Format`, and `Retrieval date` are therefore marked
**unverified** and intentionally left blank — they must not be treated as
verified open data:

- **東京都指定文化財一覧** (東京都) — future Story / Discover enrichment (P2).
- **緑のオープンデータ GIS** (東京都) — future geography / nature discovery (P2).
- **区市町村別の観光・地域資源 dataset** (東京都 / 各自治体) — future region
  expansion / Discover (P2).
- **公共交通 Open Data / GTFS（多摩地域ほか）** (各交通事業者) — future region
  accessibility / route feasibility (P2). Related to the Nishi Tokyo GTFS
  pattern (§3.2.2) — same ODPT 基本ライセンス family, per-operator catalog.
- **奥多摩町 公衆（観光）トイレ一覧** (奥多摩町) — Route/Spot practical UX (P2).
- **だれでも東京** (東京都) — Spot / future-region accessibility (P2).
- **東京都内の飲食店バリアフリー情報** (東京都) — Spot / future-region
  accessibility (P2).

> A candidate becomes `Available` only after a repo doc records its real source
> URL, license, format, and retrieval date. Until then it is explicitly
> `unverified`.

#### 3.2.x 農林業センサス 市町村別統計表（2020年, 東京都分）— integrated (#128)

- **Dataset**: 農林水産省「2020年農林業センサス 市町村別統計表」（都道府県別、
  東京都分は 62 市町村）。Survey base date **2020-02-01**。2025 census 確報
  （2026-08-07 公表）は全国／都道府県級のみで、市町村級は retrieval
  （2026-08-12）時点で未公表 → 2020 が現行唯一の公式市町村級結果。
- **License**: 政府標準利用規約（第2.0版）準拠・出典表示が必要（e-Stat）。
- **Evidence file**: `src/data/municipality-agriculture.ts`（reusable
  municipality-generic profile + 奥多摩町 demo/evidence record）。
  数値は同 2020 census を編纂する 西多摩地域統計年鑑（西多摩地域広域行政圏
  協議会, 2021, PDF）で照合。
- **Verified Okutama values**: 農業経営体数 1（経営耕地面積規模別の計）、
  経営耕地面積は統計法開示制限により非公表（x）、林家数 192戸・保有山林面積
  1,946ha。
- **Interpretation boundary**: 市町村単位の集計であり、個別生産者・わさび農家
  の状態や後継者の有無を推測できない。2020年時点のデータであり現在状況では
  ない。奥多摩単独の evidence を東京全体へ一般化しない。

### 3.3 Additional traceable sources currently wired into the demo (not open data)

These are the sources that **actually back the app's runtime content** today.
They are not Open Data and must not be labeled as such, but they are the
traceable origins of the demo seed and belong in the registry for honesty:

| Source | Used for | License / status | Verified in |
|---|---|---|---|
| 一般社団法人奥多摩観光協会 (`okutama.gr.jp`, `okutokanko.jp`) | 8 seed places, 19 generated demo places, food-culture sources, editorial route `SOURCE_OKUTAMA` | `All Rights Reserved`; reference only | `src/data/seed-places.ts`, `src/data/generated/okutama-places.ts`, `src/data/seed-routes.ts`, `src/data/seed-food-cultures.ts` |
| 青梅市 / 青梅市観光協会 (`city.ome.tokyo.jp`) | くんまひゃっか / うぐいす餅 places & sources | official website | `src/data/seed-places.ts`, `src/data/seed-food-cultures.ts` |
| 日の出町 (`town.hinode.tokyo.jp`) | 日の出ゆず place & source | official website | `src/data/seed-places.ts`, `src/data/seed-food-cultures.ts` |
| 東京都産業労働局 特産品情報 (`sangyo-rodo.metro.tokyo.lg.jp`) | 東京わさび food-culture source | official website | `src/data/seed-food-cultures.ts` |
| TCVB おでかけウォッチャー (Vol.1–3) | mobile-data proxy for tourism distribution evidence | public report, no explicit open-data license on PDF | `docs/analytics/tokyo-tourism-baseline.md` (dataset C) |

All were retrieved / last-verified **2026-08-08**.

---

## 4. Product-role mapping (#92 surfaces ↔ datasets)

Each #92 surface is listed with the Open Data that supports it. MOGU Recent /
My Saved / Food Profile are **user-state** surfaces and are listed only to
record that they must **not** be used to justify dataset adoption.

| #92 Surface | What Open Data supports | Dataset(s) | Current state |
|---|---|---|---|
| **Home** (recommendation) | none — the recommendation is driven by user-state (Food Profile + Exploration Conditions), not by datasets | — | out of data scope |
| **Discover** (#93, free exploration) | content / discovery candidates | 奥多摩観光施設一覧 (candidate), 区市町村別観光資源, 東京都指定文化財一覧, 緑のGIS | Discover is a placeholder shell today (`src/pages/DiscoverPage.tsx`); datasets are future candidates |
| **Story enrichment** | factual grounding for editorial stories | 奥多摩観光協会 (current, editorial), 文化財一覧 / 観光資源 (future) | current story = editorial seed; candidates future |
| **Route mobility / context** | mobility segments, access, feasibility | 西東京バス GTFS (data layer), 公共交通 Open Data (future) | data layer built; demo fixture only; not in core journey; realtime/next-departure not core UX |
| **Spot practical data** | hours / access / price / reservation / accessibility | 奥多摩観光施設一覧 (candidate), 公衆トイレ, だれでも東京, バリアフリー情報 | practical info rendered only when source-verified (`SpotDetail.practical`), else explicit unverified state |
| **Pitch impact evidence** (#18/#112) | tourism-concentration → dispersion metrics | 東京都観光客数等実態調査 (A), 国・地域別外国人旅行者行動特性調査 (B), モバイル動態調査 (future, proxy C today) | integrated in `docs/analytics/tokyo-tourism-baseline.md` |
| **MOGU** (recent results) | — user-state (auto-recorded Results, max 5) | none | **do not use as adoption justification** |
| **My** (saved / food profile) | — user-state (Saved Routes, Food Profile, Badges) | none | **do not use as adoption justification** |

Mapping rule (from Issue #19): a dataset earns priority by supporting a
concrete mechanism in this table — **not** by being loadable into a user-state
store, and **not** by being "interesting Open Data".

---

## 5. Adoption principles / 採用原則

1. **Evaluate against #112 + #92, not dataset volume.** Ask *which tourism-
   dispersion mechanism and which IA surface does this dataset actually
   support?* If the honest answer is "only a slide", it is pitch evidence at
   best — not a core feature driver.
2. **GTFS = route-mobility enrichment.** GTFS may enrich route mobility
   context. **Realtime / next-departure is not core demo UX** (matches the
   #112/#92 contract and `docs/data-contract-wave4.md`). Never let GTFS dictate
   a screen flow.
3. **User-state stores are off-limits as justification.** MOGU Recent / My
   Saved / Food Profile are user-state concerns. Adopting a dataset *because it
   can be pushed into those stores* is explicitly disallowed.
4. **Data must matter beyond slides** (AGENTS.md principle #4): Open Data should
   support the product itself (story grounding, practical spot info, route
   context), not exist only for presentation.
5. **No fabrication, no silent upgrading of uncertainty.** Every dataset row
   distinguishes `verified source data` / `editorial` / `demo fixture` (the
   `DataOrigin` values in `src/data/model.ts`). Never convert an unverified
   source into a fact (`unverified` is a legal value).
6. **Traceability first**: name + URL/dataset id + license + retrieval date for
   every external dataset (`DataSource` fields: `sourceType`,
   `sourceDatasetId`, `retrievedAt`, `originalId`).
7. **Smallest reversible adoption.** Integrate the smallest independently
   verifiable slice; promote datasets to Issues only when a surface needs them.
8. **Keep region-agnostic.** The registry and the data model must represent a
   future outer-Tokyo region without an Okutama-specific platform. Okutama
   specifics belong in fixtures/seed only.

---

## 6. 2026-08-23 MVP boundary / MVP 境界

The MVP pilot geography is **Tama (多摩地域)**, with Okutama as the current
fieldwork / verified-content focus and an evidence-driven food boundary (Issue
#112; Tokyo Wasabi is a possible strong deterministic fixture, not the
exclusive product contract). Integration priority for data is confined to the
Tama / Okutama pilot; other regions are future.

| Boundary | Decision |
|---|---|
| In MVP scope (integrate/verify) | Okutama spot/facilities data (app-wiring of `OKUTAMA_PLACES` is an **open follow-up**); Nishi Tokyo GTFS **data layer** (optional enrichment, demo fixture acceptable); tourism baseline for the **pitch** (datasets A/B/C). |
| Not core demo UX | GTFS realtime / next-departure; multi-region data; any dataset whose only use is MOGU/My/Food-Profile stores. |
| Future (P2/P3) | All candidate rows in §3.1 — they must **not** block the current core demo path. |
| Evidence gap to close before/at demo | Fieldwork (Issue #10) to re-verify approximate demo coordinates; real GTFS fetch (ODPT token) if route data is promoted; app-wiring of the 3 real CC BY 4.0 Okutama rows. |

---

## 7. Source traceability guidance / 出典追跡ガイド

- Follow `AGENTS.md`「Data and Sources / データと出典」: record source name,
  source URL / dataset id, license, and retrieval / last-verified date.
- Model-level provenance lives in `src/data/model.ts` (`DataSource` +
  `DataOrigin`); keep it additive.
- **Source freshness & verification (Issue #129)**: each `DataSource` may carry
  `sourceUpdatedAt` (the source document's own last-updated date),
  `confirmedAt` (stakeholder / team confirmation date), and
  `verificationStatus` (`verified` / `needs_confirmation` / `stale` /
  `conflict` / `demo`). The official catalog `modified` date must not be treated
  as the record's real-world freshness date. `src/lib/verification.ts` derives a
  safe default (never `verified`) and can generate a machine-readable
  `needs_confirmation` list for stakeholder review.
- Example source docs to imitate:
  - `docs/okutama-facilities-source.md` (per-row provenance honesty: 3 real vs
    19 demo; explains why `sourceType` is not `'open_data'` on every row).
  - `docs/nishi-tokyo-bus-gtfs-source.md` (verified-source vs committed-fixture
    distinction; re-run instructions).
  - `docs/analytics/tokyo-tourism-baseline.md` (every figure tied to
    dataset+year+source; explicit availability notes for missing data).
- **Adding a dataset**: (1) confirm the source/license/format in a repo doc;
  (2) add a row here with evidence file + `Retrieval date`; (3) set Status
  `Available` only when the repo doc records the real URL/license; (4) promote to
  an implementation Issue and update `Status` / `Related Issue`. Do **not** mark
  `unverified` fields as verified, and do **not** claim a dataset is `Integrated`
  while `src/data/index.ts` does not consume it.

---

## 8. Maintenance / メンテナンス

- This registry is intentionally **not a blocking dependency** for child
  features. Datasets promoted to implementation get their own Issue and update
  their row here.
- Re-verify `Retrieval / last-verified date` when a source doc is refreshed
  (e.g. a GTFS fetch, a new tourism-survey round, a field-trip correction).
- Review cadence: on any data-related Issue, or when a candidate is proposed.

### 日本語要約

このファイルは Issue #19 の東京広域 Open Data レジストリ（研究インデックス）。
各データセットの provider / source / license / #112 と #92 への接続点 / 優先度 /
採用状態を追跡する。要点：

- 奥多摩観光施設は「観光施設一覧」の公式 Open Data は存在せず、実際に
  ライセンスがあるのは Tokyo Open Data Catalog の 2 件（CC BY 4.0）で、
  生成済み `OKUTAMA_PLACES` はまだアプリ未配線（`src/data/index.ts` 非参照）。
- 西東京バス GTFS はデータ層のみ構築、実データ未取得（ODPT トークン未取得）、
  fixture はデモ。realtime / next-departure は core demo UX ではない。
- 観光客数等実態調査・国別行動特性調査・TCVB は `docs/analytics/tokyo-tourism-baseline.md`
  に統合済み（pitch 用）。モバイル動態調査は 2026-08-08 時点で未公表 → Candidate。
- MOGU Recent / My Saved / Food Profile は user-state であり、dataset 採用の
  正当化に使わない。
- repo に存在しない candidate は `unverified` として明示し、Source URL /
  license は空欄にしてある。
