# Tokyo Mogu Mogu

東京を食べる。文化をつなぐ。— Eat Tokyo. Connect its culture.

Tokyo Mogu Mogu creates reasons for travelers concentrated in Tokyo's 23 wards
to discover destinations across outer Tokyo. Regional food culture, people,
nature, and experiences become a mobile-first journey from **discovery → story
→ route → support action → next regional discovery**.

Issue #85 defines this durable Product Vision. For the 2026-08-23 hackathon,
**奥多摩 × 東京わさび** is the first pilot and the only required real content;
it is not the Product's permanent geographic scope. Issue #41 and the approved
S0–S9 design continue to define the Hackathon MVP journey:

```
S0 Landing → S1 Dietary Restrictions → S2 Preference Diagnosis →
S3 Diagnosis Result → S4 Food Culture Story → S5 Model Route →
S6 Spot Detail → S7 Support Actions → S8 My Route
```

The demo is accountless, deterministic, mobile-first, Japanese-default, and
runs without geolocation. S9 Badge Collection is stretch work.

## Product contract

- See [docs/specs/product/hackathon-product-contract.md](docs/specs/product/hackathon-product-contract.md)
  for the Product Vision (#85) and Hackathon MVP contract (#41).
- See [docs/mvp-scope.md](docs/mvp-scope.md) for the boundary between durable
  Product scope and the first-pilot demo journey.
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
