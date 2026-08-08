# Tokyo Mogu Mogu

東京を食べる。文化をつなぐ。— Eat Tokyo. Connect its culture.

Discover and experience Tokyo's food culture through story — a mobile-first
journey from **diagnosis → story → route → support action** around one region ×
one food culture: **奥多摩 × 東京わさび**.

The current product direction is defined by Issue #41 and the approved S0–S9
design. The core journey is:

```
S0 Landing → S1 Dietary Restrictions → S2 Preference Diagnosis →
S3 Diagnosis Result → S4 Food Culture Story → S5 Model Route →
S6 Spot Detail → S7 Support Actions → S8 My Route
```

The demo is accountless, deterministic, mobile-first, Japanese-default, and
runs without geolocation. S9 Badge Collection is stretch work.

## Product contract

- See [docs/specs/product/hackathon-product-contract.md](docs/specs/product/hackathon-product-contract.md)
  for the current product contract (source of truth, Issue #41).
- See [docs/mvp-scope.md](docs/mvp-scope.md) for product scope and the demo journey.
- See `AGENTS.md` for the repository policy.

The legacy Pokédex / geolocation check-in / next-collectible journey
(closed Issues #1–#9) is reusable infrastructure, not the current primary
journey. See the product contract for the reclassification.

## Tech stack

- React 19 + TypeScript (strict) + Vite 7
- React Router 7
- Vitest for unit tests
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command           | Purpose                         |
| ----------------- | ------------------------------- |
| `pnpm dev`        | Start the Vite dev server       |
| `pnpm build`      | Type-check and production build |
| `pnpm typecheck`  | TypeScript type-check           |
| `pnpm lint`       | ESLint                          |
| `pnpm test`       | Vitest unit tests               |
