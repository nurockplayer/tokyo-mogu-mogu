# Tokyo Mogu Mogu

東京を食べる。文化をつなぐ。— Eat Tokyo. Connect its culture.

## Product scope / プロダクト対象範囲

**Tokyo Mogu Mogu is a Tokyo-wide, multi-region × multi-food-culture product.**

**TOKYO MOGU MOGU の Product scope は「東京都全域 × 複数地域 × 複数食文化」です。**

The Product is not permanently limited to Tama, Okutama, outer Tokyo, or Tokyo Wasabi. The current Product objective is to create personal reasons for travelers concentrated in Tokyo's 23 wards to discover less-visited parts of Tokyo. Regional food culture, people, nature, and experiences become a mobile-first journey from **discovery → story → route → support action → next regional discovery**.

## Audience / 対象ユーザー

**Tokyo Mogu Mogu is for both Japanese and international travelers.**

**日本人・訪日外国人を問わず、東京のまだ知らない地域や食文化と出会い、「行ってみたい理由」を見つけたい旅行者を対象とします。**

The audience is defined by travel/discovery need, not nationality. Japanese travelers are not a secondary/future audience, and inbound travelers are not the sole/primary Product persona. Foreign-visitor statistics may be used as evidence for tourism concentration and multilingual needs without defining the Product as inbound-only. Japanese is the judging/demo primary copy and default locale; multilingual support remains a core capability for international users.

See Issue #112 and Issue #214 for the current audience decision.

For the **2026-08-23 Hackathon only**, delivery is deliberately narrowed to a small deterministic demo:

> **Hackathon Demo Golden Path: Okutama × Tokyo Wasabi**
>
> **ハッカソン Demo Golden Path: 奥多摩 × 東京わさび**

This is a demo content/data freeze, not the Product scope, recommendation domain, or shared architecture boundary. `canonical`, `pilot`, and `frozen` wording for Okutama × Tokyo Wasabi must be understood as demo-only.

See [docs/specs/product/product-scope-invariant.md](docs/specs/product/product-scope-invariant.md) for the durable scope and audience contract and Issue #112 for the decision record.

The current visible Product baseline is the Figma-complete mobile MVP merged in
PR #279. Product/UI decisions come from the currently connected KiKi Figma
first, then current merged `main`.

The primary journey is **Food Profile → 食旅を見つけ → Result → Story → Route
→ Spot**. The visible Dock destinations are:

- **食旅を見つけ** — the Home hub and entry to the current five-step exploration flow.
- **モグモグる** — free browsing of the current food-journey content.
- **お気に入り** — locally saved journeys/routes and Spots.
- **マイ** — Food Profile editing, saved routes, and current personal states.

Home, search, empty/saved states, route loading/regeneration, Spot gallery and
favorite interactions, and ja/en/zh-TW switching are part of the current MVP.
The demo is accountless, deterministic, 375px-first, Japanese-default, and runs
without geolocation.

Pre-#279 UI/IA/flow documents, static Figma maps, the former Netlify reference,
and legacy browser suites are historical and non-authoritative. Tests validate
the current Product; they do not define it.

## Product contract

- See [docs/specs/product/product-scope-invariant.md](docs/specs/product/product-scope-invariant.md) for the durable Tokyo-wide multi-region × multi-food-culture scope, Japanese + international traveler audience invariant, and strict 8/23 demo boundary.
- See [docs/specs/product/hackathon-product-contract.md](docs/specs/product/hackathon-product-contract.md) for the concise current visible-MVP behavior and runtime contract.
- See [docs/mvp-scope.md](docs/mvp-scope.md) for the release/demo boundary.
- See `AGENTS.md` for the repository policy.

The legacy Pokédex / geolocation check-in / next-collectible journey (closed Issues #1–#9) is reusable infrastructure, not the current primary journey. See the product contract for the reclassification.

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
