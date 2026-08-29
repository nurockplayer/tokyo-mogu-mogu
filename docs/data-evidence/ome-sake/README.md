# Issue #348 Ome / Sawai sake evidence

Current production-bundle captures for the recovered `demo-ome-sake` journey,
recorded on 2026-08-29 at the 375px mobile baseline.

The Japanese set covers the MOGU card and representative Story, Route, and
Ozawa Shuzo Spot factual surfaces. English and Traditional Chinese captures
cover the newly localized Story, Route, and Spot information for durable human
review. These app screenshots document presentation only; they do not promote
verification status or replace the canonical sources recorded in the Ledger.

No source-site screenshot or venue photograph is included. The current Ozawa
Shuzo and Sawanoien pages were rechecked immediately before exposure, but their
pages do not support repository screenshot or photography reuse. Exact source
URLs and omission reasons are recorded in the structured evidence manifest.

Recreate the bounded evidence from a fresh production build with:

```sh
pnpm build
pnpm preview --host 127.0.0.1 --port 4384 --strictPort
ISSUE_348_PREVIEW_URL=http://127.0.0.1:4384 node scripts/capture-issue-348-evidence.mjs
```
