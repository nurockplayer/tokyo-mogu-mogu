# Tokyo Mogu Mogu

東京を食べる。文化をつなぐ。— Eat Tokyo. Connect its culture.

Tokyo Mogu Mogu creates reasons for travelers concentrated in Tokyo's 23 wards
to discover destinations across outer Tokyo. Regional food culture, people,
nature, and experiences become a mobile-first journey from **discovery → story
→ route → support action → next regional discovery**.

The current Product / MVP framing is Issue #112: tourism is over-concentrated
in Tokyo's 23 wards, and the product creates a personal "reason to go" for
outer-Tokyo regions. Food culture is the direct entry point that connects a
traveler to the land, people, and culture of a region. For the 2026-08-23
hackathon, the **Tama area** is the first MVP pilot geography; **Okutama** is
the current fieldwork / verified-content focus, not the permanent Product
scope. MVP food content is evidence-driven — Tokyo Wasabi may be a strong
deterministic demo fixture, but it is not the only allowed content contract.

The current App IA is Issue #92 / the KiKi UI/UX draft. The persistent primary
navigation is **Home / Discover / MOGU / My**:

- **Home** — start a new personalized recommendation (first-time users may pass
  through Food Profile; returning users reuse it and answer only per-trip
  Exploration).
- **Discover** — free exploration without diagnosis.
- **MOGU** — system-managed recent recommendation results (not favorites).
- **My** — Saved Routes + Food Profile + optional Badges.

The demo is accountless, deterministic, mobile-first, Japanese-default, and
runs without geolocation. The approved S0–S9 screens are preserved as the
historical screen mapping / visual foundation only; current navigation and
behavior are owned by #112 + #92.

## Product contract

- See [docs/specs/product/hackathon-product-contract.md](docs/specs/product/hackathon-product-contract.md)
  for the current Product / MVP framing (#112) and App IA contract (#92 /
  KiKi), with the S0–S9 material kept as historical mapping.
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
