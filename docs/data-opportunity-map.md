# Tokyo Data Opportunity Map — 東京データ機会マップ

> Issue #130 · Data discovery research → Product opportunities.
> Status: **research deliverable** (no infrastructure, no product code). The
> universal adapter / index decision is deliberately deferred until repeated
> patterns justify it (see §8 and conditional follow-up #131).
> Retrieval / last-verified date: **2026-08-11** (all URLs live-checked; key
> rows re-verified by the coordinator on 2026-08-11). The restaurant /
> accessibility rows added from #132 were field-checked on **2026-08-12**.
> Lane artifacts (raw, per-worker): six lane files written by parallel research
> workers; this document is the deduplicated synthesis.

---

## 1. Executive summary / 実行要約

Tokyo's public-data surface is real, large, and unevenly distributed, and the
**license split — not data availability — is the single biggest constraint** on
what the product can legally build.

- **The Tokyo Open Data Catalog is a live CKAN instance with ~9,648 catalog
  datasets (80,104 rows across Tokyo + all municipalities in the master CSV),
  and its CKAN API needs no key.** Web pages 403, but
  `/api/3/action/package_search` works unauthenticated. This is the reliable
  acquisition base.
- **The biggest surprise:** the《モバイルデータを活用した訪都旅行者動態調査》
  (mobile visitor-dynamics survey), which the existing registry (§3.2.4 of
  `docs/open-data-registry.md`) marks as "not published", **was released
  2025-12-24 and its R3–R6 raw data is directly downloadable** —
  municipality × month × stay-type × foreign-resident-region, for all 62
  Tokyo municipalities including 奥多摩町. This upgrades the #112
  central-vs-Tama narrative from proxy estimation to official evidence.
- **Mobility is a two-tier license story.** JR 青梅線 (Okutama access) and
  京王線 (Takao access) — the two rail spines the MVP food journey depends on —
  are published only under チャレンジ2026限定ライセンス (not freely reusable).
  Freely-reusable mobility (Tama Monorail incl. fares+ridership+realtime,
  municipal community buses under CC0/CC BY 4.0, Toei GTFS+GTFS-RT under
  CC BY 4.0 for the Toei network / interchange context) models the
  **Tama interior loop** — not the Okutama corridor, and not end-to-end
  Shinjuku→Tama (west of Shinjuku depends on Keio, see M7).
- **The MVP corridor (奥多摩) is the least-open corner of Tokyo open data**
  (奥多摩町 publishes only 3 datasets; 檜原村 2; no wasabi/direct-sale/道の駅
  dataset was found in this catalog scan). This confirms the existing
  fieldwork / editorial content route is correct and not a data gap to close
  by plumbing.
- **Genuinely surprising opportunities outside the current FoodCulture/Place/
  Route model**: school-lunch menus (学校給食献立) with ingredients/allergens,
  food-business license lists (食品営業許可) as official regulatory/listing
  evidence for facility identity/status validation, and daily wholesale-market
  reports (卸売市場日報, CC BY 4.0, daily) as daily arrivals/transactions data
  (origin and price; not freshness/catch-date evidence).

---

## 2. Method / 方法

- Six parallel research lanes (food/agri · culture/local · tourism/nature ·
  mobility/UX · waterfront/islands · catalog-miner) each inspected official
  sources, downloaded representative CSV/JSON resources, and wrote a separate
  artifact under `/tmp/tmm-130/lane-*.md` (not committed).
- The coordinator re-verified the three strongest claims on 2026-08-11:
  the mobile-dynamics download, the 文化財 CSV row/coordinate counts, and the
  wholesale-market daily CSV.
- Every record below carries `Open Data` / `official public web` /
  `other verifiable` / `unverified` classification, per AGENTS.md Data and
  Sources rules. Status values follow `docs/open-data-registry.md`:
  `promising` / `experiment` / `later` / `reject`.

---

## 3. Catalog terrain / カタログ地形図

| Catalog / source | Scale | Format | API |
|---|---|---|---|
| 東京都オープンデータカタログ (`portal.data.metro.tokyo.lg.jp` / `catalog.data.metro.tokyo.lg.jp`) | **CKAN ~9,648 datasets** (master CSV 80,104 rows incl. all municipalities) | CSV/XLS/GeoJSON/KML/cityGML | **CKAN API, no key required** (package_search / group_list verified) |
| 23 wards | Most publish via the Tokyo portal (港区 is the only self-hosted CKAN, 560 datasets) | CSV | via portal |
| Tama (30 municipalities) | Very uneven: 調布 1,914 / 八王子 994 / 町田 741 / 多摩 681 thick; **奥多摩 3 / 檜原 2 nearly empty** | CSV/XLSX | none independent |
| e-Stat (総務省統計局) | Municipality-level statistics; 2025 Agriculture Census 確報 published 2026-08-07 | EXCEL/PDF/API | API (account required) |
| 国土数値情報 (MLIT) | Nationwide GIS points (道の駅 P35, 観光資源 P12, 駅別乗降 S12) | Shapefile/GML; **S12 is CC BY 4.0**, P35/P12 non-commercial | download |
| RESAS | **API terminated 2025-03-24** (web survives) | — | ✗ |
| ODPT (公共交通オープンデータ協議会) | Toei / Tokyo Metro / Tama Monorail / community buses GTFS+GTFS-RT | GTFS/JSON | ○ (registration + access token) |
| DATA.GO.JP → e-Gov data catalog | Migrated to `data.e-gov.go.jp`; unstable fetch on 2026-08-11 | — | `unverified` |

Key terrain facts:

1. **The Tokyo catalog is a large municipal open-data accumulation
   (9,648 catalog datasets observed on 2026-08-11)**, but tourism (206) and
   culture (471) are a small slice of that total; 行財政 (3,848) dominates.
2. **Tama is thin where the MVP is.** The western-Tama corridor that the
   product cares about (青梅・あきる野・日の出・瑞穂・奥多摩・檜原) has the least
   open data. The product therefore relies on fieldwork/editorial there — a
   confirmed strategy, not an accident.
3. **Directly relevant gaps are real**: no wasabi / direct-sale / marché /
   道の駅 / local-specialty dataset was found in this scan of the Tokyo
   catalog. These product anchors must be editorial with traceable official
   sources (JA, 観光協会, municipal pages).

---

## 4. Opportunity records / オポチュニティ一覧

Status legend: **promising** (deep-dive suggested) · *experiment* (needs work)
· later · reject.

### 4.1 Demand & seasonality (demand-side evidence)

| # | Dataset | Provider | Class | Status | Traveler value | Surface |
|---|---|---|---|---|---|---|
| D1 | モバイルデータを活用した訪都旅行者動態調査 (`data.tourism.metro.tokyo.lg.jp/data/mobile/files/mobile-jp.zip`, 2025-12-24) | 東京都産業労働局 | Open Data (download; 出典表示) | **promising** | Municipality × month × stay-type visitor counts incl. 奥多摩 — monthly seasonality / relative demand signal (municipality-level, not per-station crowding), official #112 evidence | Discover, Spot, Pitch |
| D2 | 観光庁宿泊旅行統計 広域市町村別 (`mlit.go.jp/kankocho/content/002015008.xlsx`) | 観光庁 | official public web | **promising** | Official "40 東京都多摩地域" accommodation grouping — Tama as an official destination | Spot, Pitch |
| D3 | 東京都観光客数等実態調査 (R5/R6 CSV) | 東京都産業労働局 | Open Data (CC BY 4.0) | integrated in `docs/analytics/tokyo-tourism-baseline.md` | visitor count + spend concentration | Pitch |
| D4 | 駅別乗降客数 国土数値情報 S12 (`nlftp.mlit.go.jp/ksj`) | 国土交通省 | Open Data (**CC BY 4.0**) | *experiment* | Historical per-station usage → relative usage proxy (not per-station crowding proof); evidence-backed #112 dispersion | Result, Route, Discover |

### 4.2 Food & agriculture

| # | Dataset | Provider | Class | Status | Traveler value | Surface |
|---|---|---|---|---|---|---|
| F1 | 江戸東京野菜 登録品目一覧 (52+ cultivars, 64 detail pages; 奥多摩ワサビ = #16, harvest 周年, JA西東京) | JA東京中央会 | official public web (All Rights Reserved) | **promising** | "What Tokyo traditional vegetable is in season now, and where" — season × place | Story, Discover, Result |
| F2 | 都内JA直売所マップ (60+ direct-sale outlets across five Tokyo subregions) | JA東京中央会 | official public web (reuse restricted; not Open Data) | **promising editorial source** | "Buy from the farmer at the source" — direct-sale as the simplest visit action; outlet details need manual verification | Spot, Route, Discover |
| F3 | 東京都卸売市場日報 (daily produce/fish/meat/flower CSV, CC BY 4.0, ~358k produce rows/yr, daily) | 東京都中央卸売市場 | Open Data (CC BY 4.0) | *experiment* (product feed) | Daily market arrivals/transactions, origin and price data (prefecture-level provenance; not freshness/catch-date evidence) | Story, Discover, Result |
| F4 | TOKYO GROWN (`tokyogrown.jp`, ja/en/zh-TW) | 東京の食料品振興財団 | official public web (reuse application) | **promising** | Official multilingual (incl. zh-TW) food/agri portal — ready-made i18n & story source | Story, Spot, Discover |
| F5 | GO TOKYO 日本酒ガイド (小澤酒造 沢井 / 石川酒造 福生, both on 青梅線) | 東京都観光公式サイト | official public web | **promising** | Real sake-brewery day-trip on the 青梅線 rail | Route, Story, Spot |
| F6 | 農林業センサス 市町村データ (e-Stat, 2025 確報 2026-08-07) | 総務省統計局 | Open Data | **promising** (**overlap-with-#128**) | Municipality agriculture-vitality profile — "towns where farming is still alive" | Discover, Story, Pitch |
| F7 | 学校給食献立 (東村山 `…/20240910school_lunch.csv` 5,363 rows; 青梅) | 東村山市・青梅市 | Open Data (CC BY 4.0) | **promising** | Published/planned school-lunch menus with ingredients/allergens — a window on planned everyday food culture (no claim about actual consumption) | Story, 地域タブ (new) |
| F8 | 食品営業許可・届出施設一覧 (自治体標準データセット; #132 inspected 青梅 1,593-row XLSX) | 各区市 / 青梅市 | Open Data (CC BY 4.0) | **experiment (validation only)** | Regulatory/listing evidence for facility identity/status investigation. The Ome file has no menu, ingredient, hours, or accessibility fields and does not prove current operation or local-food use. | Spot (verify) |
| F9 | 東京の名湧水57選 | 東京都環境局 | official public web | *experiment* | Water → sake/wasabi/cuisine link (水系 as a new relation) | Story, Route, Spot |
| F10 | 町田市名産品 CSV (lat/lon) | 町田市 | Open Data (CC BY 4.0) | *experiment* | Municipality-level "specialty × coordinates" exemplar (2018 snapshot) | Spot, Discover |
| F11 | 東京都農業振興事務所 管内農業概要 PDF | 東京都 | official public web | *experiment* | Official region agriculture profile for Story/Pitch backing | Story, Pitch |

### 4.3 Culture & local life

| # | Dataset | Provider | Class | Status | Traveler value | Surface |
|---|---|---|---|---|---|---|
| C1 | 東京都指定文化財一覧 (`…/suisyoudataset/130001_cultural_property.csv`, **248 items, 108 in Tama, 245 with lat/lon + English name**, CC BY 4.0) | 東京都教育庁 | Open Data (CC BY 4.0) | **promising** — registry candidate (pending registry verification) | "What is officially old / designated here" near food — story anchors (御嶽神社旧本殿, 薬王院, 水車経営農家) | Story, Spot, Route, Discover |
| C2 | 市町村別 文化財一覧 (28+ municipalities, 標準フォーマット 自治体 high quality) | 青梅・八王子・武蔵野・府中・国分寺 ほか | Open Data (CC BY 4.0, XLSX mix) | **promising** | Municipal self-definition; 3–5× density when combined with C1 | Discover, Spot, Story |
| C3 | 三鷹市みどころマップ (`attach_74215_1.csv`, 77 spots with hours/fees/文化財解説) | 三鷹市 | Open Data (CC BY 4.0) | **promising** | Cultural-spot practical info with 食・生業 explanations baked in (わさび田・養蚕) | Spot, Story, Route |
| C4 | あきる野市 観光施設一覧 (`132284_tourism2022.csv`, 8 facilities, 6/8 lat/lon, 説明_英語) | あきる野市 | Open Data (CC BY 4.0) | **promising** (2022, verify freshness) | 秋川渓谷 / 五日市線 day-trip Route spine + 日帰り温泉 | Route, Spot, Discover |
| C5 | 青梅市 観光スポット一覧 (feature_point / tourist_attraction XLSX, incl. 小澤酒造, 澤乃井園) | 青梅市 | Open Data (CC BY 4.0) | **promising** (coords need fill) | 御岳 + sake brewery + river Route official spine | Spot, Route |
| C6 | 東京都指定史跡一覧 (`…/kyouiku/130001culturalproperty.csv`, 19 in Tama) | 東京都教育庁 | Open Data (CC BY 4.0) | promising (with C1) | Jomon–medieval ruins → 遺跡公園/郷土資料館 connectors | Discover, Story |
| C7 | NDL デジタルコレクション (OpenSearch API; 青梅街道 1,181 hits, 武蔵国絵図 93) | 国立国会図書館 | official public web; **rights are item-specific — each work must be checked for reuse/publication rights before use** | *experiment* | Then-now story layer from Meiji 街道絵図 (rights-check-required per work) | Story (new "今昔" type) |
| C8 | 東京の伝統工芸品・東京手仕事 (42 items: 村山大島紬, 多摩織) | 東京都産業労働局 | official public web | *experiment* | Craft layer parallel to food culture | Story, Spot |
| C9 | TOKYO WALKING MAP (KML courses incl. Tama) | 東京都保健医療局 | Open Data (CC BY 4.0) | *experiment* | Walkable short courses from stations | Route |
| C10 | 小金井市 観光施設/ポイント (58-col format, en/ja) | 小金井市 | Open Data (CC BY 4.0) | *experiment* | Format exemplar; 江戸東京たてもの園 adjacency | Spot, Discover |
| C11 | 台東区伝統工芸職人一覧 (48 active artisans, lat/lon) | 台東区 | Open Data (CC BY 4.0) | later (23-ward) | Meet-the-artisan workshops | Spot |
| C12 | 文化遺産オンライン | 文化庁 | official public web (no bulk/API) | later | Reference-links only | Story |

### 4.4 Mobility & practical UX

| # | Dataset | Provider | Class | Status | Traveler value | Surface |
|---|---|---|---|---|---|---|
| M1 | 多摩都市モノレール GTFS + fares + ridership + GTFS-RT (`ckan.odpt.org/dataset/train-tamamonorail` + 8 siblings) | 多摩都市モノレール / ODPT | Open Data (基本ライセンス) | **promising** | Only Tama-native rail with fares+ridership+realtime open — deterministic "Tama loop" route building | Route, Result, Spot |
| M2 | Tama community-bus GTFS cluster (町田 CC0, 東村山/稲城/国立/東大和/杉並 CC BY 4.0) | 各市 / ODPT | Open Data (CC0/CC BY 4.0) | **promising** | "Local bus reaches the food/spot" last-mile credibility (2–3 town slice) | Route, Discover |
| M3 | 都営 GTFS + GTFS-RT (bus/train, CC BY 4.0) | 東京都交通局 | Open Data (CC BY 4.0) | **promising** | Free-licensed Toei network + interchange context (Shinjuku Line interchanges with Keio, but travel west of Shinjuku depends on Keio — see M7) | Route, Result |
| M4 | 道の駅 国土数値情報 P35 (nationwide, amenity flags) | 国土交通省 | Open Data (**non-commercial**) | **promising demo / experiment prod** | Practical rest-stop layer (toilet/EV/restaurant flags) — 2018 snapshot | Discover, Spot, Route |
| M5 | 公衆トイレ一覧 (自治体標準データセット, per-city; 八王子 `t131105d0000000040`, 都 `t131024d0000000036`) | 各区市 | Open Data (CC BY 4.0) | *experiment* | "Restroom near the rural food stop" practical chip | Spot, Route |
| M6 | 高尾山/御岳山 ケーブルカー運行 (official web only) | 高尾登山電鉄 / 御岳ケーブル | official public web | later / editorial-only | Access guides with hedged "check official site" | Spot, Story |
| M7 | JR東日本 / 京王 rail GTFS (青梅線, 京王線) | JR・京王 | **チャレンジ2026限定** — not freely reusable | **reject as product dependency** | The MVP access spines are off-limits for real reuse | — |
| M8 | TOKYO CRUISE 水上バス GTFS (CC BY 4.0) | 東京都観光汽船 | Open Data (CC BY 4.0) | later (pitch contrast) | Fully-open water-bus GTFS sample; 水辺ライン suspended 2026-01 | Pitch |
| M9 | だれでも東京 (accessibility portal) | 東京都 | official public web (no confirmed API) | later | Barrier-free concept valuable; data not open yet | Spot |
| M10 | 東京都内の飲食店のバリアフリー情報 (`t000012d0000000063`, 210 rows) | 東京都産業労働局 | Open Data (CC BY; CP932 CSV) | **experiment / coverage-limited** | Partial self-reported accessibility reference: 165 ward / 42 Tama / 3 island; western-Tama corridor has 4 rows (青梅 2 + あきる野 2), and blanks are unknown | Spot |

### 4.5 Waterfront, fisheries & islands

| # | Dataset | Provider | Class | Status | Traveler value | Surface |
|---|---|---|---|---|---|---|
| W1 | 東京都卸売市場日報 — 水産 CSV (`…/shijyou/2025/result_price_fish.csv`, CC BY 4.0, daily, 産地 per-prefecture) | 東京都中央卸売市場 | Open Data (CC BY 4.0) | **promising** | Daily market arrivals/transactions with origin and price (prefecture-level; not catch/freshness evidence) | Discover, Story, Spot |
| W2 | 伊豆・小笠原諸島 ライブカメラ位置情報 (1 CSV: lat/lon + YouTube live per port) | 東京都港湾局 | Open Data (CC BY 4.0) | **promising** | "Island now" live visual before a 24h ferry — trip-anxiety relief | Spot, Route |
| W3 | 東京おさかな図鑑 + 島の特産農産物図鑑 (49 Izu/Ogasawara + 8 Bay species) | 島しょ農林水産総合センター (IFARC) | official public web (HTML archive, no license) | **promising** (seed corpus) | Authoritative species/season/eat guide to seed FoodCulture | FoodCulture, Story |
| W4 | 島アクセス UMISORA + 東海汽船ダイヤ | 東京都 + operators | official public web (no API) | **promising (integration)** | The real island blocker is 1-boat-a-day logistics — must pair food story with 運航 risk layer | Route, Result |
| W5 | アユ遡上調査 CSV / 内湾水質 CSV (2003–2026) | 東京都 / IFARC | Open Data (CC BY 4.0) | *experiment* | Real sea/river data → season/activity calendar (swim, アユ釣り) | Discover, Story |
| W6 | 2023年漁業センサス 東京都分 (399 経営体, 842 workers) | 東京都 | Open Data (CC BY 4.0) | *experiment* | "東京の海は小さい・老いる" verifiable support-fishery narrative | Story, Pitch |
| W7 | 八丈島観光スポット一覧 | 八丈町 | Open Data (CC BY, stale 2017, broken URL) | later | Island-municipality POI pattern; needs fresh equivalents | Spot |

### 4.6 Rejected / noted (not opportunities for the product)

- 高尾山年間入山者数 ~300万 — press-origin, primary source untracked → `unverified`.
- RESAS API — terminated 2025-03-24 (use e-Stat / 国土交通 DPF instead).
- 港湾調査月報, 統計年鑑 海区別 — heavy PDF/Excel, weak food-travel signal → later.
- PLATEAU 3D, 防災・避難所, エコロジカル・ネットワーク PDF — non-goal for the MVP.

---

## 5. Product opportunities / プロダクト機会

Six+ distinct product opportunities synthesized from the records above,
mapped to current #92 surfaces and to the #112 dispersion goal.

| # | Opportunity | Data basis | Current surface | New capability suggested | Regions made interesting |
|---|---|---|---|---|---|
| P1 | **旬×産地×直売所「當季東京食材」** — season-to-source-to-sale loop | F1+F2+W1/F3 (+F4 i18n) | Discover, Story, Result | `harvestSeason` field; cultivar/season → candidate outlets to check/visit (item availability at a specific outlet requires separate evidence/confirmation) | 青梅・あきる野・日の出・町田・立川 (みのーれ) |
| P2 | **文化財×食 geo-pairing** — food spot + official cultural-property context within reach | C1+C2+C3+C4 | Story, Spot, Route, Discover | cultural-property layer; near-food geo query | 青梅・奥多摩・八王子(高尾)・府中・武蔵野 |
| P3 | **多摩內陸 Mobility Loop** — deterministic fares + local-bus last-mile on free licenses | M1+M2+M3 (+M8 contrast) | Route, Result, Spot | deterministic fare/feasibility **within the free-licensed Tama-interior network** (not end-to-end Shinjuku→Tama; west-of-Shinjuku depends on Keio, see M7); reachability-by-community-bus | 立川・多摩センター・東大和・東村山・町田 |
| P4 | **Historical usage proxy（駅/月別相対利用）** — calmness/season as a relative usage signal, not a crowding measurement | D4+D1 (+D2) | Result, Discover, Route | relative usage score; monthly seasonality layer | 青梅線・奥多摩 corridor; all Tama stations |
| P5 | **島しょ Access & Live window** — logistics-first island trips | W4+W2+W3 | Route, Spot, Result | 運航-risk layer; live island window | 大島・三宅島・八丈島・父島 |
| P6 | **日常食資料窗「這個地方計畫吃什麼」** — school menus + licensed-restaurant listings | F7+F8 | Story, 地域タブ (new), Discover | planned everyday-food layer; new permit/listing detection; facility status validation | 東村山・青梅 (西多摩食) |
| P7 | **道の駅/實用休息層** — practical rest-stop profiling | M4+M5 | Discover, Spot, Route | practical-rest-stop profile | あきる野(あきがわ)・八王子(滝山) |

The #132 accessibility hypothesis does **not** qualify as a western-Tama Route
slice: M10 has only 4 records across the established six-area corridor
(青梅 2 + あきる野 2; 日の出・瑞穂・奥多摩・檜原 zero). It remains a partial Spot
reference experiment, never a completeness or safety guarantee.

Also preserved as surprising opportunities that do not fit the current model
(not forced into FoodCulture/Place/Route):

- **Then-now story type** from NDL 青梅街道/武蔵国絵図 (C7) — a new content
  dimension, not a data-model extension.
- **Water-system relation** (名湧水→sake→wasabi→cuisine, F9) — a relation the
  current model has no slot for; record only, do not implement.
- **Food-culture taxonomy seeding** from おさかな図鑑 (W3) — a curated corpus to
  bootstrap FoodCulture with authoritative species/season names.

---

## 6. Region / theme vertical-slice ranking / 縦断スライス候補

Ranked candidates for a playable vertical-slice experiment (per #130:
identify 3–6 region/theme candidates worth a slice; the coordinator selects
2–3 for near-term experiments). Ranking weighs: source availability/license,
distinctness from existing Okutama content, traveler value, demo feasibility
before 8/23.

| Rank | Vertical slice | Why now | Open-data backbone | Feasibility | Fit with MVP |
|---|---|---|---|---|---|
| 1 | **青梅線・御岳/沢井 酒蔵×文化財 day-trip** (Okutama-adjacent west Tama) | Extends the current Okutama fieldnote into a coherent second stop; sake + shrine + wasabi on one rail line; source-backed | C1 (青梅22), C5 (青梅観光スポット), F5 (GO TOKYO酒蔵), F1 (奥多摩ワサビ=第16號) | High — 青梅 open data is the thickest in the corridor; content mostly editorial-backed | High — same visitor, adjacent region, real rail |
| 2 | **當季東京野菜 Discover（直売所×收穫季）** | Seasonal loop is the simplest demo of "data makes the story": today's season → outlets to check → go (item availability confirmed separately) | F1+F2 (JA, editorial), F4 (TOKYO GROWN zh-TW), W1/F3 (market) | High — pure data plumbing + editorial copy | Medium-High — food-led, directly #112 |
| 3 | **青梅線駅 相對利用 proxy** (S12 + mobile-dynamics) | Puts the #112 concentration problem on an evidence-backed, per-station *relative-usage* surface in the MVP corridor | D4 (S12 CC BY), D1 (mobile dynamics incl. 奥多摩) | Medium — S12 snapshot easy; D1 license wording must be confirmed | Medium — supports Result/Discover, strengthens pitch |
| 4 | **Tama 內陸 Mobility Loop demo** (立川–多摩センター–上北台) | The only fully open mobility layer; proves "Tama as a connected destination" beyond Okutama | M1 (fares+ridership), M2 (CC0 buses) | Medium — needs an ODPT token for live files; static snapshot doable | Medium — route feasibility, not food-core |
| 5 | **島しょ「島の今」preview** | Cheap, distinctive, high emotional value | W2 (live cams), W4 (UMISORA), W3 (fish zukan) | Medium — scraping needed; license of zukan unclear | Low-Medium — outside Tama MVP pilot |

---

## 7. Recommended near-term vertical-slice experiments (2–3)

1. **青梅線・御岳/沢井 酒蔵×文化財 day-trip** — highest overlap with current
   Okutama fieldwork, thickest open data in the corridor, real rail access.
   Build a Route + Story + 2–3 Spots using C1/C5/F5/F1 as sources.
2. **當季東京野菜 Discover** — pure data story: JA 江戸東京野菜 收穫季 × 直売所
   → "this season, buy at the source". Editorial-ize JA pages with provenance,
   pair with TOKYO GROWN for zh-TW/en.
3. **青梅線駅 相對利用 proxy** — cheapest evidence play: snapshot S12 + confirm
   mobile-dynamics license, render a historical per-station usage comparison
   (relative usage proxy, not per-station crowding) on Result.
   This also directly strengthens the 8/23 pitch.

These are the strongest because they (a) are playable as a small vertical slice
before 8/23, (b) use genuinely source-backed data, and (c) each extends rather
than competes with the Okutama fieldwork.

---

## 8. Repeated patterns (infrastructure justification — not built here) / 繰り返しパターン

Observed repeated needs that **may** justify future reusable infrastructure.
Per #130 and conditional follow-up #131, **no adapter/index/platform is
implemented in this Issue**. These are recorded so the decision is
evidence-based, not architecture preference.

1. **自治体標準データセット schema repetition** — 観光施設 / 観光ポイント /
   文化財 / 公衆トイレ CSVs share the national-standard schema across
   2+ municipalities (武蔵野・青梅・府中・小金井…). This is the strongest
   candidate for a #131 adapter (trigger: same ODS type needed by 2+ slices).
2. **Encoding churn (CP932 vs UTF-8-sig) recurs** across every catalog fetch —
   a shared decoding helper would save repeated effort (小 infrastructure).
3. **CKAN API access without key** is the uniform acquisition path (Tokyo
   catalog); a thin catalog-search client would be reused.
4. **ODPT access token** is the single cross-cutting blocker for all ODPT GTFS
   (Issue #17). Obtain one shared token; it unlocks M1–M3 live files.
5. **Editorial-with-provenance pattern** recurs for the closed sources that are
   product-critical (JA 江戸東京野菜, 観光協会, 酒蔵 guides): the team already
   has this pattern in `docs/okutama-facilities-source.md`; reuse it rather than
   building new machinery.

---

## 9. Registry updates suggested / レジストリ更新提案

Changes to `docs/open-data-registry.md` that this research supports (not yet
applied — pending Issue owner review):

| Registry row | Suggested change | Evidence |
|---|---|---|
| §3.2.4 モバイルデータ動態調査 | `unverified/Candidate` → **candidate / pending registry verification** (released 2025-12-24, download reachable; durable source/license/format/retrieval evidence to be recorded in the registry) | this doc §4.1 D1 |
| §3.2.6 東京都指定文化財一覧 | `unverified/Candidate` → **candidate / pending registry verification** (CC BY 4.0, 248 items, 108 Tama, 245 lat/lon+EN; durable evidence to be recorded in the registry) | this doc §4.3 C1 |
| §3.2.7 緑のオープンデータ GIS | `unverified` → **candidate / pending registry verification** (17 layers incl. 自然公園 polygon; browser fetch needed; durable evidence to be recorded in the registry) | this doc §3 catalog terrain (lane 3) |
| New | 学校給食献立 (東村山・青梅) | — | §4.2 F7 |
| New | 食品営業許可・届出施設一覧 | — | §4.2 F8 |
| New | 東京都卸売市場日報 (青果/水産) | — | §4.2 F3 / §4.5 W1 |
| New | 多摩都市モノレール GTFS+fares+ridership | — | §4.4 M1 |
| New | 観光庁宿泊統計 広域市町村 (40 多摩) | — | §4.1 D2 |

---

## 10. Data limitations / honesty notes / データの限界

- **産地 granularity**: wholesale-market provenance is prefecture-level
  ("各地" dominates) — it cannot name an island or a Tama town. Island-specific
  stories must come from the encyclopedia + 特産 sources (W3), not the market.
- **Mobile-dynamics license wording** is not an explicit open-license mark —
  it requires 出典表示 and processing notes. Confirm the terms before in-app use.
- **Culture CSV encoding is CP932** (not UTF-8) despite some lane notes; the
  coordinator verified this. Any ingestion must detect encoding per-file.
- **Community-bus GTFS has a hard gap**: 青梅・あきる野・日の出・瑞穂 publish
  none. The Okutama corridor's last mile is editorial, not GTFS.
- **道の駅 P35 is non-commercial + 2018**; fine for the hackathon demo, not a
  commercial promise. S12 (CC BY 4.0) is the clean exception.
- **#123 is untouched.** This research records recommendation-relevant findings
  only as independent opportunities; nothing here changes #123's scope or
  decisions.

---

## 日本語要約

東京都・区市町村の Open Data を 6 レーンで広域調査し、Data Opportunity Map に
統合した（Issue #130、研究のみ・コードなし・#123 は不変）。

- **最大の発見**: これまで「未公表」だった《モバイルデータを活用した訪都旅行者
  動態調査》が 2025-12-24 に公開され、奥多摩を含む全市町村×月別旅行者数を直接
  ダウンロード可能（#112 の 23区 vs 多摩 論証を公式データに昇格）。
- **文化財一覧**（都教育庁、CC BY 4.0）は 248 件・多摩 108 件・245 件が緯度経度と
  英名を持つ。既存 registry の「未検証」から昇格する場合は、registry 規則の
  durable な source/license/format/retrieval 記録を満たした上で
  **candidate → Available** を検討する。
- **モビリティは二層のライセンス構造**: JR 青梅線・京王線はチャレンジ2026限定で
  再利用不可、自由に使えるのは多摩都市モノレール＋コミュニティバス＋都営。奥多摩
  回廊はオープンデータ最貧区で、フィールドワーク/編集が正しい。
- **驚きの機会**: 学校給食献立（青梅・東村山）、食品営業許可一覧（施設の実在・
  ステータス検証の公式規制/リスト情報）、卸売市場日報（日次の市場入荷・取引・
  産地・価格データ。鮮度・漁獲日の証拠ではない）。
- **垂直スライス候補**: ①青梅線・御岳/沢井 酒蔵×文化財日帰り、②当季東京野菜
  Discover、③青梅線駅の相対利用 proxy（混雑の実測ではなく歴史的利用の
  相対指標）。**既存 8/23 デモと競合せず、source-backed
  で実装可能**な 2–3 本を推奨。
- インフラ（adapter/index）は実装せず、繰り返しパターンとして記録のみ（#131 の
  conditional 判断材料）。
