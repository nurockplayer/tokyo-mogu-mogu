# Tokyo Mogu Mogu

Discover and experience Tokyo's Tama food culture through open data — a collection ("goshuin-style") journey through the food, makers, and stories of Tama / Okutama.

## MVP

The MVP is a mobile-first web app: browse the food culture Pokédex, read the story behind each collectible, find where to experience it on a map, check in by location to unlock it, and keep collecting.

- See [docs/mvp-scope.md](docs/mvp-scope.md) for the product scope, personas, demo journey, and success metrics.
- See `AGENTS.md` for the repository policy.

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
