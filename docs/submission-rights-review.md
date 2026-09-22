# Submission rights review — 2026-09-22

Issue #370, executed under mission #388. Official authorities checked on
2026-09-22: [recruitment](https://odhackathon.metro.tokyo.lg.jp/recruitment/)
and [participant guide](https://odh-tokyo2026.code4japan.org/).

## Current decision

**The existing media set and final presentation are not cleared for submission
or public reuse.** This is missing permission evidence, not a finding of
infringement. Normal engineering builds and factual verification do not grant
media rights. Do not publish/submit their screenshots or recordings as cleared.

`/data-review/` separates competition rules, source reuse conditions, media
permissions, and factual verification. Source type/license comes from the
Ledger; an official website or Google Maps provider never becomes Open Data
because it has a public URL. Coordinate sources remain separate. ODbL/CC BY
labels describe recorded data terms, not rights to third-party photographs.
Source captures deliberately omitted for rights reasons remain omitted.

## Inventory and remaining evidence

The deterministic path-only inventory covers all supported visual, document,
audio and video files under `src/assets`, `public` (when present), and `docs`.
At this review it contains 246 files: 97 runtime/reference assets and 149
repository evidence/design images. No asset contents are imported by the
inventory. New files fail the filesystem coverage test until regenerated.

- 44 Netlify-reference assets: blocked for submission/public reuse. Their ledger
  records no public reuse grant, original photographer, or redistribution grant.
  Record permission from the actual rights holder or remove/replace them from
  the submission/public package. Do not infer ownership from reference access.
- 38 Figma assets: node/export provenance only. Creator, source materials,
  permission scopes, attribution, and AI declarations remain unconfirmed.
- 15 fieldwork derivatives from five selected photos: project-demo provenance
  exists; photographer and explicit submission/public authorization are absent.
  Existing exclusion of identifiable people and stripped EXIF does not supply a
  copyright grant. Optional further integration remains deferred.
- 149 evidence/design images: internal review evidence, not automatically cleared
  submission assets. Screenshots can contain the same unresolved media.
- Final external slides/PDF and demo video/audio: no final files or complete
  materials/attribution review are registered. They remain separately incomplete.

Every asset records intended scopes separately from granted scopes. Missing
owner, supporting permission record, scope, attribution decision, or AI/source
rights declaration prevents clearance. Documented data rights never change the
factual `verified` status, and factual status never clears media.

## Enforced packaging boundary

Run `pnpm submission:inventory` after adding/removing media, then review its
metadata in `src/data/submission-rights.ts`. `pnpm submission:check` exits
nonzero for an outdated inventory, any uncleared intended submission/public
asset, or unreviewed final presentation. `pnpm build:submission` deletes old
`dist-submission` output before checking and removes partial output if the build
fails. It runs the rights gate before emitting a fresh package; it currently
must fail. The standard
`pnpm build` remains the engineering validation build and is **not submission
approval**. The gate does not retroactively approve any existing deployment.

Before public presentation, obtain and record the missing evidence or replace /
exclude affected media in a separately reviewed package. Removing an image from
one page does not remove it from already captured screenshots. Do not reuse a
previous package after permissions, assets, or final presentation files change.

## Tourism-directory minimization decision

The All Rights Reserved historical directory is not Open Data and is not a
licensed submission dataset. Retain its minimal factual reference fields needed
to reproduce the existing, non-runtime-wired generated fixture. Remove all 19
unused editorial notes and 14 unused phone values. Retain the tourism-office
phone only because the current Ledger comparison reads it. Keep source URL,
retrieval, license, approximation caveats, and provenance. The ingestion artifact
must remain identical; no factual or licensing status is promoted by reduction.

A later retirement may remove the historical generated fixture and its source
together, after auditing direct consumers. That is separate from rights
clearance and does not justify copying any source photographs or expressions.
