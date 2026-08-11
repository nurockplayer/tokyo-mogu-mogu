# Shared Data Contract — Tokyo Mogu Mogu MVP

> **Status note (Issue #41, superseded by #112 / #92)**: This contract documents
> the **legacy MVP (Pokédex / check-in) implementation**, which is now
> classified as reusable infrastructure. The current hackathon product contract
> (Issue #112 Product/MVP framing + Issue #92 App IA) lives at
> `docs/specs/product/hackathon-product-contract.md`; the S0–S9 child Issues
> (#43–#49) are the historical linear screen framing that #92 re-maps onto
> `Home / Discover / MOGU / My`. The modules below remain valid shared
> infrastructure and may be reused where compatible. Its `TamaArea` enum and
> Okutama fixtures describe the legacy implementation, not the durable
> geographic boundary; future `Region` / `FoodCulture` / `Place` / `Route` work
> must remain extensible without requiring a multi-region platform for the
> 2026-08-23 pilot.

This is the contract for the parallel implementation of Issues #3, #4, #5, and #6.
Sub-agents MUST read this file and the modules it references before writing code.

## Modules (read-only unless you own them)

| Path | Exports | Notes |
|---|---|---|
| `src/data/model.ts` | `FoodCulture`, `Place`, `DataSource`, `DataOrigin`, `UnlockMethod`, `FoodCultureCategory`, `TamaArea`, `PlaceType`, `UNLOCK_RADIUS_METERS` | Core types. Do not modify. |
| `src/data/index.ts` | `foodCultures`, `places`, `getFoodCultureById(id)`, `getPlaceById(id)`, `getRelatedPlaces(fc)`, `getRelatedFoodCultures(place)` | Data access. Do not modify. |
| `src/store/collection.tsx` | `CollectionProvider`, `useCollection()` → `{ collected, visitedPlaces, isCollected(id), isVisited(id), collect(id), visitPlace(id), reset() }` | Collection state. `collect`/`visitPlace` are idempotent (duplicates ignored). Do not modify (persistence lands in #7). |
| `src/i18n.tsx` | `I18nProvider`, `useI18n()` → `{ locale, setLocale, t(key) }`, `strings` | Append-only for new keys. See i18n rule below. |
| `src/lib/geo.ts` | `distanceInMeters(lat1,lon1,lat2,lon2)`, `isWithinRadius(lat1,lon1,lat2,lon2,radiusMeters)` | Use for check-in distance logic. Do not modify. |
| `src/components/FoodCultureImage.tsx` | `FoodCultureImage` — props `{ image, nameJa, category, alt? }` | Renders a stylized demo image (no real photos yet). |
| `src/styles.css` | Global design tokens and shared component classes | Do NOT edit. Create feature-specific CSS and import it from your component. |

### Key type shapes (summary — see model.ts for full)

```ts
interface FoodCulture {
  id: string; nameJa: string; nameEn: string;
  category: 'produce'|'seafood'|'sweets'|'processed-food'|'craft';
  area: 'okutama'|'ome'|'hamura'|'akiruno'|'hinode';
  descriptionJa/En; storyJa/En; historyJa/En; makerJa/En; howToEnjoyJa/En;
  image: string; hintJa: string; hintEn: string;
  placeIds: string[];
  unlockMethod: 'location-checkin';
  sources: DataSource[]; origin: 'source'|'editorial'|'demo';
}
interface Place {
  id: string; nameJa: string; nameEn: string; address: string;
  latitude: number; longitude: number;
  foodCultureIds: string[];
  type: PlaceType; source: DataSource; origin: DataOrigin;
}
```

### Locale fields on data
Every bilingual data field is `{Name}Ja` / `{Name}En`. Select the field by `useI18n().locale`.

## File ownership (parallel-safe)

| Issue | Owned files (you create/modify) | Never touch |
|---|---|---|
| #3 Pokédex | `src/pages/PokedexPage.tsx`, `src/pages/PokedexPage.css`, `src/components/FoodCultureCard.tsx`, `src/components/FoodCultureCard.css` | All other `src/pages/*`, `src/styles.css`, `src/App.tsx`, `src/main.tsx`, data, store |
| #4 Detail | `src/pages/FoodCulturePage.tsx`, `src/pages/FoodCulturePage.css`, `src/pages/FoodCulturePage.test.ts` (optional) | Same as above |
| #5 Map | `src/pages/MapPage.tsx`, `src/pages/MapPage.css`, `src/components/MapView.tsx`, `src/components/MapView.css`, `package.json`/`pnpm-lock.yaml` (add `leaflet`, `@types/leaflet` only) | Same as above |
| #6 Check-in | `src/lib/checkin.ts`, `src/lib/checkin.test.ts`, `src/components/CheckInPanel.tsx`, `src/components/CheckInPanel.css` | Same as above |

Append-only shared file (parallel-safe): `src/i18n.tsx` — append new keys only, never rename/change existing ones.

## Style strategy

- Reuse existing classes from `src/styles.css` first: `.fc-card`, `.fc-card-media`, `.badge`, `.get-seal`, `.btn`, `.detail-section`, `.checkin-card`, `.progress-bar`, `.page-title`, etc.
- New styles → create `<feature>.css` and `import './<feature>.css'` from your own component. Never edit `src/styles.css`.
- Mobile-first: max-width container is 480px; bottom nav is fixed at `--nav-h`. Keep main interactions within phone width.
- Aesthetic: washi-paper background, deep green primary (`--forest`), wasabi accent, vermilion GET seal. Use CSS variables from `:root`.

## i18n rule

- All user-visible copy needs ja + en.
- To add a string: append `key: { ja: '…', en: '…' }` inside the matching language object in `src/i18n.tsx` (add to BOTH the `ja` and `en` blocks), then use `t('key')`.
- Never change an existing key's name or value — another feature may use it.

## Validation (required before finishing)

Run all of these and include the output tail in your report:

```bash
pnpm install --frozen-lockfile   # fresh worktree has no node_modules
pnpm typecheck
pnpm lint
pnpm test                        # existing 11 tests must stay green
pnpm build
```

Do not claim a check passed unless you ran it.

## Git

- Work in your own worktree on a branch named `feat/<n>-<short-name>` (harness usually sets it; verify with `git branch --show-current`).
- Commit your work with a message referencing the issue (e.g. `feat: implement food culture Pokédex (#3)`), then `git push -u origin <branch>`.
- Never force-push. Never touch `main`.

## Report back

Report: branch name, files changed, validation output summary (tail of each command), and any residual risks or assumptions.
