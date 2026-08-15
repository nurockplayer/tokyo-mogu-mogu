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
  adapters/
    index.ts                          # ADAPTERS registry
    cultural-property/
      adapter.ts                      # parse + normalize (pure, unit-tested)
      snapshots/130001_cultural_property.csv   # committed raw artifact (CC BY 4.0)
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

## Adding a source

1. Add a `SourceManifest` entry in `manifest.ts` and include it in
   `SOURCE_MANIFESTS`. Every manifest must carry `id`, `provider`, `url`,
   `acquisitionType`, `format`, `license`, `adapterId`, and
   `credentialsRequired`.
2. Add an adapter under `adapters/<source>/` implementing `parse` (raw bytes →
   source-shaped rows) and `normalize` (rows → `NormalizedRecord[]`), keeping
   both pure where possible. Register it in `adapters/index.ts`.
3. Commit a license-permitted snapshot under `adapters/<source>/snapshots/`
   only when needed for reproducible tests.
4. Add focused tests: adapter output contract, metadata completeness,
   invalid / missing source handling, and deterministic normalization.

Future adapter shapes (CSV, XLSX, ZIP archive, CKAN API) slot into the same
`AcquisitionAdapter` contract; the registry's `acquisitionType` field records
the intended mechanism. **Do not build a generic framework** until repeated
patterns justify it (see `docs/data-opportunity-map.md` §8 / Issue #131).

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
| 東京都指定文化財一覧 (`t000021d0000000017`) | CSV / CP932 | CC BY 4.0 | 245 | `cultural-property` |

Data-quality notes for the cultural-property snapshot:

- The artifact carries 248 record lines; 3 are blank trailing rows (filtered).
- All 245 records have latitude + an English name; **one record (下宅部遺跡)
  has a malformed longitude cell (", 139.451301")** and is normalized with
  longitude left undefined rather than inferred.
- The records' 最終確認日 is 2019-03-29 — the dataset's own confirmation date,
  not a statement about real-world freshness today.

## Verification

The layer is covered by focused Vitest suites under
`scripts/data-acquisition/` (adapter contract, manifest completeness, invalid
source handling, determinism, sync failure isolation). Run:

```bash
pnpm test:focused scripts/data-acquisition
pnpm typecheck   # scripts/data-acquisition is included in tsconfig.node.json
```
