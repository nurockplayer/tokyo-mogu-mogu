# My → Badges Cross-Region Retention / Discovery Contract

Durable behavior contract for the Badge / Achievement collection as a
**Stretch retention/discovery layer** under `My → Badges`.

- **Current authority for placement and semantics**: the connected KiKi Figma,
  current `main`, then `docs/specs/product/hackathon-product-contract.md`.
- **Historical presentation reference**:
  `docs/specs/product/approved-ui-fidelity.md` preserves former S9 material but
  is not current Product/UI authority.
- **Hackathon journey contract**: `docs/specs/product/hackathon-product-contract.md`
  (current core journey, S9 stretch, geography invariants, accountless persistence).
- **Status**: Proposed contract for Issue #38. This Issue defines the contract
  only; it does **not** implement any code.

## Purpose / 目的

Badge is a **Stretch, optional retention / discovery layer** owned by the `My`
destination. Its job is to preserve the traveler's memory of a regional
food-culture connection and motivate a **next-region discovery**, so the visit
does not end when the journey closes.

Badge is **not**:

- a required top-level navigation destination;
- part of the core `Home / Discover / MOGU / My` readiness;
- a replacement for the Product goal of tourism dispersion / regional discovery.

```
訪れる → 集める → また来る   (visit → collect → come again — presentation concept)
```

## IA Placement / 配置

- Primary navigation stays `Home / Discover / MOGU / My` (see
  `src/app/AppShell.tsx`, Issue #95 / #92).
- Badge collection is reached through **`My → Badges`**, not a standalone
  primary nav item.
- `My` must ship and work **even when Badge is not implemented**. The current
  `src/pages/MyPage.tsx` is a scaffold; Issue #81 implements Saved Routes +
  Food Profile + Badge entry there, and Issue #39 implements the `My → Badges`
  collection screen as Stretch.

## Priority / Stretch / 優先度

- **Stretch / 時間があれば** (see `docs/project-roadmap.md`, #86: Stretch path
  `#38 → #39`).
- Badge must never block the core App IA, the core journey, or the
  `Home / Discover / MOGU / My` navigation.
- 2026-08-23 demo content may use Tokyo Wasabi only as a deterministic
  presentation fixture. Its seed records remain `needs_confirmation`; Badge
  must not expand the MVP content contract or imply verified/visitable content.

## Product Role / 役割

Badge supports:

- **Trip memory** — a persistent trace of what the traveler learned and
  experienced;
- **Continued connection** to regional food culture after the core visit
  journey;
- **Next-region motivation** — an explicit bridge to "discover another Tokyo
  region";
- **Optional retention** — a reason to return without making collection the
  primary purpose.

Badge collection must not replace the Product goal of tourism dispersion /
regional discovery (Issue #112). It is a continuation mechanism, never the
top-level purpose (product contract, "Badge / Next Discovery Boundary").

## Digital Badge Contract / デジタルバッジ契約

A Badge represents a **food-culture / regional experience achievement**. It has
an **earned / unearned** state. It is a `My`-owned, accountless, locally
persisted record — the same persistence model as MOGU Recent and Saved Routes
(product contract, "Account / Persistence"). No server-side profile or
cross-device sync is introduced.

### Badge state shape (suggested)

| Field | Type | Required | Meaning |
|---|---|---|---|
| `id` | `string` | yes | Stable identifier, e.g. `badge-wasabi-okutama`. |
| `name` | i18n key / text | yes | Display name (ja / en / zh-TW). |
| `description` | i18n key / text | yes | What the badge represents. |
| `icon` / `artwork` | asset / image key | yes | Resolved by the UI; follows the placeholder rule in `approved-ui-fidelity.md` when no approved asset exists. |
| `status` | `'earned' \| 'unearned'` | yes | Achievement state. |
| `earnedAt?` | ISO 8601 `string` | no | Set when `status === 'earned'`. |
| `regionId?` | `string` | no | Region the badge is tied to, when the durable `Region` domain can identify it. **Does not imply that region is implemented.** |
| `foodCultureId?` | `string` | no | Food-culture id, e.g. `wasabi-okutama` (`src/data/seed-food-cultures.ts`). |
| `qualifyingAction?` | `string` | no | Which qualifying-action candidate the badge is associated with. **Metadata / display only — never proof of real-world verification.** |

Notes:

- `regionId` and `foodCultureId` are optional and used only where a durable,
  resolvable identifier exists. For the pilot, `foodCultureId: 'wasabi-okutama'`
  is the concrete reference; a future `regionId` may reference a future region
  without implying any implemented routes, places, or stories for it.
- `qualifyingAction` records a *candidate category* for display (see
  [Qualifying Actions](#qualifying-actions--達成アクション候補)); it must not
  be treated as evidence that a real purchase / visit / participation was
  verified.
- Persistence follows the existing accountless local pattern
  (`localStorage`, e.g. the `tmm:*` key namespaces used by
  `src/lib/mogu-recent.ts` and `src/lib/saved-routes.ts`). No schema or storage
  key is fixed by this contract beyond the requirement to keep Badge state in
  its own namespace, distinct from MOGU Recent and Saved Routes.

### Earned / unearned

- `earned` requires an explicit award (product-approved qualifying action or a
  clearly labeled deterministic demo trigger — see below).
- `unearned` badges render as locked / future slots and never imply that their
  Story / Route / Spot content is implemented.

### Demo fixture: 東京わさび

- 東京わさび is a deterministic demo badge fixture for the Okutama × Tokyo
  Wasabi golden path. It is not the only allowed Product content contract and
  does not make that pair an immutable scope boundary.
- The Tokyo Wasabi fixture and its seed records are `needs_confirmation`.
  They are **not** verified or visitable claims, and a badge must not imply a
  verified place, purchase, visit, participation, or operational availability.
- All other badge slots may be **future-region / future-culture dummy or locked
  presentation**.

### Future-region dummy / locked slots

- Future slots must be clearly labeled as **dummy / future / locked fixtures**.
- They must **not** imply that full Story / Route / Spot implementations exist
  for those regions.
- Presentation must follow current Figma/current-main authority: future-region
  visuals / labels appear only as clearly future or editorial fixtures, never
  as production data, and never make the Product look permanently Okutama-only
  or as if a second region is already implemented.
- Dummy badges are not a spec for a second implemented region; a second
  verified region stays out of Hackathon MVP scope (product contract,
  "Architecture / Data Boundary").

## Qualifying Actions / 達成アクション候補

The categories a future earning rule may draw from:

- **visit a participating place**;
- **purchase a target product**;
- **participate in an experience**.

These are **candidate categories for a future product decision**. Listing them
here does not approve any of them as the durable earning rule.

### Demo trigger rules (Hackathon)

- The Hackathon demo may use a **deterministic / simulated demo trigger**
  (e.g. a pre-set earned state for 東京わさび, or a clearly labeled demo-only
  "earn" action).
- A demo trigger **must never claim real purchase / visit / participation
  verification** when none exists. No backend evidence, no real-world check-in,
  no purchase verification is implied.
- A demo trigger must be visually / textually marked as demo or simulated and
  must not be silently promoted to the production earning rule.

### No fake verification / 実証の偽装禁止

- Badge presentation must never state or imply that a real-world
  purchase/visit was verified unless there is actual evidence for it.
- This mirrors the product contract's data-integrity principles: distinguish
  verified source data, editorial content, and demo fixtures; never convert
  uncertain information into an unqualified fact.

## Earning Condition Decision Status / 達成条件の決定状態

**The exact earning condition is a product decision and stays explicitly TBD
until product-approved.**

- **Reading a Story or merely saving a Route must not silently become the
  durable earning rule.** These are visible in the current journey
  (`src/pages/story-reading.ts` provides no persistence; `src/lib/saved-routes.ts`
  persists only explicit user saves), but neither constitutes an approved
  qualifying action.
- Until a rule is approved:
  - `unearned` badges stay unearned, or
  - a **clearly labeled deterministic demo state** may mark 東京わさび earned,
    with no claim of real-world verification.
- Issue #39 must follow the same rule: if the exact earning condition remains
  unresolved, implement only the labeled demo state rather than silently
  choosing read / save / check-in as the production rule.

## Relationship to MOGU Recent / Saved Routes / Badges

These three are **separate semantics** and must **not** be merged into one
collection model:

| State | Meaning | Persistence reference |
|---|---|---|
| **MOGU Recent** | Automatically recorded recommendation history, newest first, capped at 5. | `src/lib/mogu-recent.ts` (`tmm:moguRecent:v1`, Issue #78 → #94) |
| **Saved Routes** | Explicit, permanent user save of a model route. | `src/lib/saved-routes.ts` (`tmm:savedRoutes`, Issue #45/#46/#47) |
| **Badges** | Earned / unearned achievement state. | Badge contract (this file); own namespace, no merge into Recent or Saved. |

- MOGU Recent is system-managed and auto-recorded; Badges are not auto-earned
  by a recommendation.
- Saved Routes are explicit user saves; Badges are awards, not saves.
- A badge `foodCultureId` may reference the same food culture as a saved route
  or recent result, but the records live in different collections with
  different lifecycle rules.

## Physical Reward Boundary / 物理報酬の境界

- **Digital Badge state and Physical Reward / Redemption are separate
  domains.**
- Physical-reward threshold / messaging is **prototype / research only**,
  owned by Issue #40. It does not define a production redemption flow.
- No **redemption backend, inventory, QR/redemption-code system, or
  physical-badge manufacturing** is implied by this contract or by the digital
  badge state.
- A digital badge may *display* reward concept copy (per the approved
  presentation concept `訪れる → 集める → また来る`), but the digital record
  must not encode or depend on redemption state.

## Acceptance Criteria Mapping / 受入基準の対応

The contract above satisfies Issue #38's acceptance criteria:

- [ ] Badge location is `My → Badges`, not required top-level nav — [IA Placement](#ia-placement--配置).
- [ ] Badge remains Stretch and cannot block core App IA — [Priority / Stretch](#priority--stretch--優先度).
- [ ] Badge role in next-region retention is explicit — [Product Role](#product-role--役割).
- [ ] MOGU Recent / Saved Routes / Badge state remain distinct — [Relationship to MOGU Recent / Saved Routes / Badges](#relationship-to-mogu-recent--saved-routes--badges).
- [ ] Tokyo Wasabi demo fixture vs future dummy badges boundary is clear — [Demo fixture: 東京わさび](#demo-fixture-東京わさび) and [Future-region dummy / locked slots](#future-region-dummy--locked-slots).
- [ ] future badges do not imply implemented second regions — [Future-region dummy / locked slots](#future-region-dummy--locked-slots).
- [ ] qualifying-action categories are represented without fake real-world verification — [Qualifying Actions](#qualifying-actions--達成アクション候補) and [No fake verification](#no-fake-verification--実証の偽装禁止).
- [ ] exact earning condition remains explicit/TBD until product-approved — [Earning Condition Decision Status](#earning-condition-decision-status--達成条件の決定状態).
- [ ] physical reward remains separate from digital badge state — [Physical Reward Boundary](#physical-reward-boundary--物理報酬の境界).

## Out of Scope / スコープ外

- Core recommendation / navigation implementation.
- Top-level Badge navigation requirement.
- Production purchase / check-in / participation verification.
- Physical badge manufacturing, redemption backend, inventory.
- Ranking / social graph.
- A second implemented region or unverified production content for 2026-08-23.

## References / 参照

- Issue #38 — this contract (define My → Badges cross-region retention/discovery).
- Issue #39 — `My → Badges` UI implementation (Stretch).
- Issue #40 — physical reward redemption research (prototype/research only).
- Issue #92 — current App IA (Home / Discover / MOGU / My; My holds Saved Routes + Food Profile + Badges).
- Issue #112 — historical Product / MVP framing (tourism dispersion, Tama first
  pilot, Okutama fieldwork / demo-content context, evidence-driven food content).
- Issue #85 — historical Product Vision / MVP boundary foundation (tourism dispersion, Okutama as first pilot). Historical only where it does not conflict with #112 / #92.
- Issue #41 — historical approved S0–S9 UI / Design Spec v1.0 (historical Hackathon UX source).
- `docs/specs/product/hackathon-product-contract.md` — durable behavior contract.
- `docs/specs/product/approved-ui-fidelity.md` — historical S9 presentation
  record; not current authority.
- `docs/project-roadmap.md` — #86 roadmap (Badge is Stretch path `#38 → #39`).
- `src/app/AppShell.tsx` — primary nav `Home / Discover / MOGU / My`.
- `src/pages/MyPage.tsx` — `My` scaffold; Issue #81 adds Saved Routes + Food Profile + Badge entry.
- `src/lib/mogu-recent.ts` — MOGU Recent persistence (`tmm:moguRecent:v1`).
- `src/lib/saved-routes.ts` — Saved Route persistence (`tmm:savedRoutes`).
- `src/data/model.ts`, `src/data/seed-food-cultures.ts` — data model and the `wasabi-okutama` fixture.
