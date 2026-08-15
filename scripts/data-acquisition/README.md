# Data Acquisition Layer

Source-driven data acquisition foundation for Tokyo Mogu Mogu (Issue #175).

```
Official Source
  → Acquisition Adapter
  → Raw Artifact
  → Provenance Metadata
  → Normalized Evidence
```

This is a **thin, deliberately non-generic** layer: a small machine-readable
source registry, a uniform adapter contract, and a provenance-preserving sync
pipeline. It is not a plugin loader, CMS, remote-config platform, job
scheduler, or universal schema registry.

## Scope boundary

- Acquisition and Product editorial meaning are **separate**: normalized
  records carry provenance but are never wired into Product-visible surfaces
  by this layer. Nothing here claims that any dataset "is" a Product fact.
- The first adapter validates the layer with the
  **東京都指定文化財一覧** dataset. That does **not** mean cultural property
  is the Product domain.
- Large / full downloads go to the gitignored `.data-cache/`; only small
  license-permitted snapshots needed for reproducible tests are committed.

## Layout

```
scripts/data-acquisition/
  types.ts                            # SourceManifest / adapter / provenance contracts
  manifest.ts                         # SOURCE_MANIFESTS registry (declarative sources)
  checksum.ts                         # sha256 helper
  csv.ts                              # CP932 decode + RFC-4180-ish CSV split
  fetch.ts                            # fetch → .data-cache/ → checksum + metadata (idempotent)
  sync.ts                             # `pnpm data:sync` engine + CLI
  ckan/                               # Tokyo Open Data CKAN client (package_search/show + resource selection)
  auth/                               # authenticated-source credential seams (e-Stat)
  adapters/
    index.ts                          # ADAPTERS registry
    ods-cultural-property/
      adapter.ts                      # reusable ODS 文化財一覧 parse + normalize (#131)
      config.ts                       # per-source column mapping (東京都 + 市町村)
      snapshots/130001_cultural_property.csv   # 東京都指定文化財一覧 (CC BY 4.0)
      snapshots/132152_cultural_property.csv   # 国立市 (CC BY 4.0)
      snapshots/132012_cultural_property.xlsx  # 八王子市 (CC BY 4.0)
    barrier-free/
      adapter.ts                      # 東京都内の飲食店バリアフリー情報 (CP932 CSV)
      snapshots/barrier-free-guide.csv
    ome-food-business/
      adapter.ts                      # 青梅市飲食店一覧 (XLSX via SheetJS)
      snapshots/132055_food_business_all.xlsx
```

## Usage

```bash
pnpm data:sync
```

For each configured source the command fetches the artifact into
`.data-cache/`, computes/verifies the sha256, runs the source adapter, and
prints a concise per-source report. Behavior:

- **Idempotent**: an unchanged artifact is a no-op that keeps its previous
  `retrievedAt` (`downloaded:false` in the report).
- **Failure isolation**: one malformed / unreachable source is reported as an
  error and never poisons other sources; the command exits non-zero when any
  source fails.
- **No blind commit**: raw downloads stay in `.data-cache/` (gitignored).
- **Credential boundary**: a `credentialsRequired` source is reported as
  `[skipped]` when its `credentialEnv` var is missing — it is never fetched
  without credentials and never blocks the public sources around it. A
  skipped source is not an error (the command exits non-zero only on
  `[error]`).

## Adding a source

1. Add a `SourceManifest` entry in `manifest.ts` and include it in
   `SOURCE_MANIFESTS`. Every manifest must carry `id`, `provider`, `url`,
   `acquisitionType`, `format`, `license`, `adapterId`, and
   `credentialsRequired`.
2. Add an adapter under `adapters/<source>/` implementing `parse` (raw bytes →
   source-shaped rows) and `normalize` (rows → `NormalizedRecord[]`), keeping
   both pure where possible. Register it in `adapters/index.ts`.
3. For a **repeated ODS pattern** (e.g. 文化財一覧 across municipalities), do
   **not** fork an adapter per source. Reuse `ods-cultural-property` and add one
   column-mapping entry in `adapters/ods-cultural-property/config.ts` — the
   shared parse/normalize path stays single (Issue #131).
4. Commit a license-permitted snapshot under `adapters/<source>/snapshots/`
   only when needed for reproducible tests.
5. Add focused tests: adapter output contract, metadata completeness,
   invalid / missing source handling, and deterministic normalization.

Additional adapter shapes (ZIP archive, CKAN-driven, HTML) slot into the same
`AcquisitionAdapter` contract; the registry's `acquisitionType` field records
the intended mechanism. **Do not build a generic framework** until repeated
patterns justify it (see `docs/data-opportunity-map.md` §8 / Issue #131).

## CKAN discovery (Tokyo Open Data Catalog)

`ckan/ckan.ts` is a thin client for the Tokyo CKAN API (no key required):
`ckanPackageSearch` / `ckanPackageShow` / `ckanResourceShow` plus
`selectBestResource`, a deterministic rule (format rank → last_modified →
name → index) for picking the artifact from a dataset. It is a
discovery/probe tool, not a second acquisition path: the acquisition layer
fetches the selected artifact URL through the normal `http_file` path, and
the cultural-property source already points at the artifact this client
selects. Unit tests run fully offline against committed fixtures
(`ckan/fixtures/`).

## Authenticated sources (ODPT / e-Stat)

- ODPT (`scripts/ingest-gtfs/`, untouched): the access token is read only
  from `process.env.ODPT_ACCESS_TOKEN` and a missing token exits before any
  fetch — the acquisition layer contains no ODPT code.
- e-Stat (`auth/estat.ts`): a pure credential seam. `resolveEstatCredential`
  reads `ESTAT_APPLICATION_ID` (missing/blank → `undefined`) and
  `estatRestUrl` builds the REST v3.0 endpoint; nothing fetches live. The
  manifest entry `estat-agriculture-census-municipal` is a **declared seam**:
  without a credential `data:sync` reports it `[skipped]`, and with a
  credential it fails loudly until an `estat` adapter is registered.

## Provenance / validation rules

Every normalized record carries a `ProvenanceMetadata` with source identity,
retrieval timestamp, the exact cached-artifact reference (path + sha256),
license, and the source document's last-updated time when known. The layer:

- never invents values — fields missing or unverifiable in the source stay
  `undefined` (e.g. a malformed longitude cell is left absent, not guessed);
- treats `downloaded` ≠ `verified` and `official` ≠ `Open Data`;
- does not infer hours / price / reservation / dietary / accessibility /
  open-now state from any acquired data;
- keeps the #129 semantics (`verificationStatus`, `retrievedAt`,
  `sourceUpdatedAt`, `confirmedAt`) as the boundary for anything that later
  enters Product.

## Current sources

| Source | Format / encoding | License | Valid records | Adapter |
|---|---|---|---|---|
| 東京都指定文化財一覧 (`t000021d0000000017`) | CSV / CP932 | CC BY 4.0 | 245 | `ods-cultural-property` |
| 国立市 文化財一覧 (`t132152d0000000014`) | CSV / UTF-8 | CC BY 4.0 | 122 | `ods-cultural-property` |
| 八王子市 文化財一覧 (`t132012d3000000018`) | XLSX | CC BY 4.0 | 258 | `ods-cultural-property` |
| 東京都内の飲食店バリアフリー情報 (`t000012d0000000063`) | CSV / CP932 | CC BY 4.0 | 210 | `barrier-free` |
| 青梅市飲食店一覧 (`t132055d0000000009`) | XLSX | CC BY 4.0 | 1,593 | `ome-food-business` |
| 農林業センサス 市町村別統計表 (e-Stat, declared seam) | JSON | 政府標準利用規約 | — (skipped) | `estat` (pending) |

Data-quality notes:

- The three `ods-cultural-property` sources share **one** reusable parse +
  normalize path; per-municipality column differences (国立市 new ODS Ver1.5
  vs 八王子市 old ODS) are config entries, not parser forks (Issue #131).
- Cultural property (東京都): 245 valid records (248 lines minus 3 blank); all
  have latitude + English name except one malformed longitude cell (下宅部遺跡,
  `", 139.451301"`) left undefined; 最終確認日 2019-03-29 is the dataset's own
  confirmation date, not real-world freshness.
- Cultural property (国立市): 122 records, new ODS 標準 Ver1.5; 場所名称 is
  sometimes `非公開`; only 2 records carry an English name; no 最終確認日 column.
- Cultural property (八王子市): 258 records, old ODS 標準; the source stores
  経度 in the 緯度 column and 緯度 in the 経度 column, and the adapter config
  restores the correct hemisphere values (verified on all filled rows
  2026-08-15); no 最終確認日 column.
- Barrier-free: 210 self-reported restaurant accessibility records. Flag
  cells are `〇` or blank — **blank is unknown, not "no"**; no coordinates;
  `営業時間`/`定休日` stay raw source strings.
- Ome food business: 1,593 license records for facility identity/status
  investigation only. No menu/ingredient/hours/accessibility fields; it does
  not prove current operation or Tokyo-ingredient use; date cells stay raw
  Excel serials to avoid inventing calendar semantics.

## Verification

The layer is covered by focused Vitest suites under
`scripts/data-acquisition/` (adapter contract, manifest completeness, invalid
source handling, determinism, sync failure isolation). Run:

```bash
pnpm test:focused scripts/data-acquisition
pnpm typecheck   # scripts/data-acquisition is included in tsconfig.node.json
```
