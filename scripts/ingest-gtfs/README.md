# GTFS Ingestion (Issue #17)

Re-runnable ingestion for the 西東京バス GTFS / GTFS-JP dataset. The goal is:
**update the dataset without changing any feature code** (`src/lib/gtfs.ts` is
read-only from the ingest side — it only reads `GtfsDataset`).

## What the committed fixture is

`src/data/gtfs-fixture/` currently contains a **demo** snapshot (see
`docs/nishi-tokyo-bus-gtfs-source.md`). It is NOT verified real timetable data.
Running the steps below with a real access token replaces it with a verified
`origin: 'source'` snapshot.

## Prerequisites

- Node.js 18+ (no npm/pnpm dependencies; scripts use built-ins only).
- An ODPT developer access token (無料) from
  https://developer.odpt.org/ (公共交通オープンデータ基本ライセンスの
  利用条件を確認のうえ取得).

## Step 1 — Fetch the real GTFS

```bash
ODPT_ACCESS_TOKEN="your-token-here" pnpm exec node scripts/ingest-gtfs/fetch-gtfs.mjs --date 20260808 --out /tmp/ntbus-gtfs
```

Downloads the official `NTBus.zip` for the given timetable date and unzips it
into `--out`. If you do not know the latest available date, omit `--date`
(uses the most recent found via the catalog page).

The real download URL is
`https://api.odpt.org/api/v4/files/odpt/NishiTokyoBus/NTBus.zip?date=YYYYMMDD&acl:consumerKey=TOKEN`.

## Step 2 — Regenerate the fixture subset

```bash
pnpm exec node scripts/ingest-gtfs/generate-fixture.mjs --in /tmp/ntbus-gtfs --out src/data/gtfs-fixture
```

Keeps the fixture small and deterministic by selecting only stops within a
bounding box around 奥多摩駅 (35.8094, 139.0995, ~3 km), then the trips /
routes / stop_times that touch those stops. It writes the four TS modules plus
`index.ts`, preserving the same `GtfsDataset` shape so feature code does not
change.

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

## Step 3 — Update the provenance doc

Refresh the retrieval date in
`docs/nishi-tokyo-bus-gtfs-source.md` and confirm the license terms still
apply. Never present unverified data as `origin: 'source'`.
