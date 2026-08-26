# Okutama Tourism Facilities — Source & Data Provenance

Documentation for the Okutama tourism-facilities seed dataset (Issue #16). This
covers where the data comes from, licenses, retrieval details, format,
limitations, and how to re-run ingestion.

## TL;DR

| Item | Value |
| --- | --- |
| Generated dataset | `src/data/generated/okutama-places.ts` (exports `OKUTAMA_PLACES: Place[]`) |
| Ingestion script | `scripts/ingest-okutama/generate.ts` |
| Normalizer | `scripts/ingest-okutama/normalize.ts` (pure, unit-tested) |
| Source snapshots | `scripts/ingest-okutama/snapshots/` (committed, immutable inputs) |
| Retrieval date | Initial snapshot: 2026-08-08; tourism-office record rechecked: 2026-08-26 |
| Real open-data rows | 3 (origin: `source`) |
| Reference/demo rows | 19 (origin: `demo`) |
| Total | 22 |

## Important: there is no dedicated 奥多摩町「観光施設一覧」open-data file

The issue asks for 奥多摩町's 観光施設一覧 as an open-data ingestion. In practice:

1. **Okutama Town does not publish a downloadable 観光施設一覧 dataset.** The
   town publishes a handful of open datasets on the Tokyo Open Data Catalog
   (スポーツ施設一覧, 公立図書館情報, 公営住宅一覧, 戸籍窓口関係証明) but no tourism
   facilities list, and the town website's tourism section (`gyosei/6/kankojoho/`)
   is HTML pages, not data files.

2. **The de-facto 観光施設一覧 is the 一般社団法人奥多摩観光協会 website**
   (`https://www.okutama.gr.jp/site/`), which lists the town's restaurants,
   shops, hot springs, accommodation, fishing ponds, and sightseeing spots.
   However it is published as HTML with **`Copyright(C) 一般社団法人奥多摩観光協会
   All Rights Reserved`** — it is NOT open data, has no license permitting reuse,
   and does not expose coordinates.

3. **The genuinely-licensed open data about Okutama facilities** lives on the
   Tokyo Open Data Catalog and carries **CC BY 4.0**:
   - 奥多摩町 スポーツ施設一覧 — `t133086d3100000004`
   - 東京都教育庁 施設関連情報_奥多摩町 — `t000021d2000000151`

### How this affects the generated dataset (data-integrity decision)

Per `AGENTS.md`'s data rules ("never silently convert uncertain data into
fact", "distinguish verified source data from demo/editorial"), the generated
dataset is **honest about provenance per row**:

- **3 real rows (`origin: 'source'`, `sourceType: 'open_data'`)** — the
  tourism-relevant Okutama facilities found in the two CC BY 4.0 open-data
  datasets above (a sports park, a museum, a forest center). Their coordinates
  are authoritative from the source.
- **19 demo rows (`origin: 'demo'`, `sourceType: 'official_web'`)** — real
  Okutama tourism facilities (wasabi farms/shops, soba restaurants, fishing
  ponds, hot springs, visitor centers) taken from the Okutama Tourism
  Association website. Their **names and addresses are real**, but:
  - the association site is `All Rights Reserved`, so these are committed as
    reference/demo rows, not licensed open data;
  - their **coordinates are APPROXIMATE** (district centroids from OpenStreetMap
    Nominatim, or precise only where OSM had an exact point) and must be
    re-verified in the field (Issue #10) before production use.

This is the reason `sourceType` is not `'open_data'` on every row (the shared
contract's phrasing is a guideline; the repo's data-traceability rules take
precedence and forbid claiming the association directory is licensed open data).

## Source files

### 1. 奥多摩町 スポーツ施設一覧 (real open data)

- Dataset page: https://catalog.data.metro.tokyo.lg.jp/dataset/t133086d3100000004
- Snapshot: `scripts/ingest-okutama/snapshots/okutama-sports-facilities.csv`
- Publisher: 奥多摩町 (via Tokyo Open Data Catalog)
- License: クリエイティブ・コモンズ 表示 4.0 (CC BY 4.0)
- Format: CSV, UTF-8, 195 columns (standard Tokyo facility schema), 4 records
- Original record id: `POIコード` (e.g. `1103`)
- Coordinates: WGS84 `緯度` / `経度`, authoritative
- Note: only the 総合運動公園 row passes the MVP filter (see below)

### 2. 東京都教育庁 施設関連情報_奥多摩町 (real open data)

- Dataset page: https://catalog.data.metro.tokyo.lg.jp/dataset/t000021d2000000151
- Resource CSV: https://www.opendata.metro.tokyo.lg.jp/kyouiku/R3/skseti_53.csv
- Snapshot: `scripts/ingest-okutama/snapshots/okutama-general-facilities.csv`
- Publisher: 東京都教育庁 (via Tokyo Open Data Catalog)
- License: クリエイティブ・コモンズ 表示 4.0 (CC BY 4.0)
- Format: CSV, **Shift-JIS** at source, 9 columns, 5 records
- Original record id: 施設名 (e.g. 奥多摩町立せせらぎの里美術館)
- Coordinates: WGS84 `緯度` / `経度`, authoritative (座標系: JGD2011)
- Note: the snapshot is committed in its original Shift-JIS encoding; the
  generator decodes it with `TextDecoder('shift_jis')`.

### 3. 一般社団法人奥多摩観光協会 directory (reference / demo)

- Directory: https://www.okutama.gr.jp/site/ (観光スポット / 食べる / 買う /
  温泉 / 泊まる / 魚釣り / 体験する pages)
- Snapshot: `scripts/ingest-okutama/snapshots/okutama-tourism-directory.json`
- Copyright: `Copyright(C) 一般社団法人奥多摩観光協会 All Rights Reserved`
- License: none (All Rights Reserved); used only as reference material
- Format: HTML pages; names/addresses/phones/URLs transcribed into JSON
- Coordinates: NOT from the source — approximate, from OpenStreetMap Nominatim
  (either an exact named point or a district centroid)

## MVP filter (deterministic)

`isMvpRelevant()` in `scripts/ingest-okutama/normalize.ts`:

- All directory (demo) rows are kept — they were curated for the MVP's
  food-culture discovery (wasabi, soba, yamame/trout, konnyaku, hot springs).
- Real open-data rows are kept only when their name matches tourism-relevant
  keywords (`美術館`, `森林館`, `総合運動公園`). Libraries and generic community /
  cultural halls are excluded because they are not part of the food-culture
  discovery experience.

The filter is a pure function of the source rows, so it is deterministic.

## Idempotency & re-runnability

- Every `Place.id` is derived deterministically: `okutama-<dataset>-<djb2hash(name)>`
  for open-data rows and `okutama-demo-<key>` for directory rows.
- Re-running `node scripts/ingest-okutama/generate.ts` with unchanged snapshots
  produces a **byte-identical** output file (no duplicate ids, stable ordering
  via `id` sort). Verified by md5 checksum.
- When a source updates, replace the committed snapshot (or drop in the updated
  CSV/JSON under `snapshots/`) and re-run the generator. New facilities get new
  deterministic ids; removed facilities simply disappear; unchanged facilities
  keep their ids — so the seed never accumulates duplicates across re-runs.

## How to re-run ingestion

Requirements: Node.js 22.6+ / 24+ (native TypeScript type-stripping; no build
step, no new dependency). The repo already runs on Node 24.

```bash
# from the repository root
node scripts/ingest-okutama/generate.ts
```

This rewrites `src/data/generated/okutama-places.ts`. Run the normalizer tests:

```bash
pnpm vitest run scripts/ingest-okutama/okutama-ingest.test.ts
```

## Limitations / residual risk

- The demo rows' coordinates are approximations, not field-verified. Some were
  geocoded to a district centroid (e.g. 丹三郎, 海沢, 日原), which can be a few
  hundred meters from the actual facility. They are fit for map display /
  demo check-in, but **not** for production location-based unlock without
  Issue #10 fieldwork.
- The tourism association directory is closed copyright; the 19 demo rows are
  not redistributable as open data. If Okutama Town later publishes an actual
  観光施設一覧 open dataset, prefer it over these demo rows.
- The general-facilities snapshot (`skseti_53.csv`) is a 2021 fiscal-year
  snapshot from the Tokyo education board; facility lists can change.
- Names/addresses in the directory snapshot were transcribed from HTML as of
  2026-08-08. The tourism-office address and phone were rechecked against the
  association site (`https://www.okutama.gr.jp/site/`) and official walking-trail
  PDF (`https://www.okutama.gr.jp/site/map/pdf/ohtama.pdf`) on 2026-08-26; other
  records retain their original retrieval date, and later closures or
  relocations are not reflected.

## Frozen pilot journey wiring (Issue #127)

The 8/23 demo's frozen wasabi journey (Result → Story → Route → Spot →
Discover) is curated in `src/data/seed-places.ts` as real-facility records
copied from this generated dataset, linked back via `originalId`:

- 奥多摩観光案内所 (`okutama-tourism-office`, origId `okutama-tourism-office`)
- 千島わさび園 (`chishima-wasabi-garden`, origId `chishima-wasabi-garden`)
- 一心亭 (`soba-isshintei`, origId `soba-isshintei`)
- 獅子口屋 (`shishiguchiya`, origId `shishiguchiya`)
- 大丹波川国際虹ます釣場 (`odanba-fishing`, origId `odanba-trout-fishing`)

These curated records use `origin: 'source'` with
`verificationStatus: 'needs_confirmation'`: names/addresses come from the
association directory (All Rights Reserved), coordinates are the approximate
OSM centroids above. They are NOT field-verified and carry no `confirmedAt`.
The generated file itself remains the raw reference dataset and is not wired
into the app's `places` export.
