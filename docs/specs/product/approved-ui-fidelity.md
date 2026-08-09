# Approved UI Fidelity Contract (S0–S9)

Durable cross-Issue presentation contract that keeps the S0–S9 screens visually
coherent. This Spec owns **presentation only**; it does not redefine diagnosis
semantics, dietary safety, route semantics, persistence, data provenance, S9
priority, or the Product-wide geographic scope.

- **Presentation source of truth**: latest approved `TOKYO_MOGU_MOGU_overview`
  shared in Slack `#05_plan` on 2026-08-08; then `TOKYO MOGU MOGU デザイン仕様書
  v1.0`; then Issue #85 positioning; then
  `docs/specs/product/hackathon-product-contract.md`; then existing
  implementation where it does not conflict.
- **Status**: Current contract. Child Issues #77–#82 reference this file and
  keep their acceptance criteria atomic.

## Relationship to Product Contracts

- **Product behavior** (diagnosis semantics, dietary safety boundary, route
  semantics, persistence, provenance, S9 priority, geographic scope) stays
  owned by `docs/specs/product/hackathon-product-contract.md` and Issue #85.
  This Spec references those contracts instead of duplicating them.
- Where presentation could mislead about the Product's geography, this Spec
  applies the positioning invariants below.

## Product-positioning Presentation Invariants

TOKYO MOGU MOGU is a **regional-discovery / tourism-dispersion product for
Tokyo beyond the 23 wards**. 奥多摩 × 東京わさび is the first Hackathon MVP
pilot and the only required real content for 2026-08-23 — not the Product's
permanent geographic scope. See Issue #85 and the product contract.

- S0 / S8 / S9 presentation must never make the Product look permanently
  Okutama-only. Area labels on S8 and any landing copy may name 奥多摩 as the
  current pilot, but the Product framing (name, tagline, hero, S9
  continuation) stays region-agnostic.
- Future-region visuals / labels may appear **only as clearly future or
  editorial fixtures** (e.g. an S9 unearned badge dummy). Presentation must
  never imply that a second region is already implemented — no implemented
  routes, places, or stories outside 奥多摩.
- **S9 remains Stretch** and must not block S0–S8. Badge presentation is a
  next-region / retention layer, never the top-level Product purpose.
- Do not invent a second verified region, and do not let a fixture read as
  production data.

## Contract Scope

The rest of this Spec defines **only cross-Issue presentation invariants**
needed to keep S0–S9 visually coherent. Exact values are pinned only where an
approved source (see priority list above) or the repository implementation
defines them; everything else is listed under
[Unresolved / Must Not Be Invented](#unresolved--must-not-be-invented).

## Reference Canvas and Layout

- **Mobile-first, 375px reference canvas** (per product contract, "Mobile-first,
  375px baseline"). All screens are designed and verified at 375px width first.
- Page content is centered in `--tmm-content-max` (480px, raised to 520px at
  ≥1024px), with a `--tmm-gutter` of 16px on each side.
- Spacing follows the shared scale `--tmm-space-1..6` (4 / 8 / 12 / 16 / 20 /
  28px). Section rhythm uses `--tmm-space-6`; cards and lists use `--tmm-space-3..4`.
- A persistent bottom nav (Home / Diagnosis / Support / My Route) and the
  shared header are shown on every screen via the app shell. Feature screens
  render inside `<main>` and never build their own app root.

## Shared Header / Logo / Locale Switch

- Every screen shares the header: the app **logo/name** (left) and the
  **locale switch** (right) in the `app-header-top` row, plus the tagline and
  the demo controls row below.
- The logo is the wordmark text (display typeface) — **not** a final logo
  asset. The approved final character / logo / image assets are unresolved
  (see below) and must not be invented.
- The **locale switch** toggles ja / en / zh-TW. Japanese is the demo default;
  en and zh-TW must not break the header layout when selected.
- Auth controls (Google Auth) stay reusable infrastructure only; the approved
  header must not force an auth control into the core demo journey (product
  contract "Account / Persistence").

## Visual Language

- **Deep-green / warm-neutral / orange-accent** palette. The approved token set
  is `--tmm-*` in `src/ui/tokens.css`:
  - forest `#2f6f4f`, forest-deep `#1f4f38`, leaf `#9fb83f` (deep green /
    leaf-green accent);
  - warm `#f6f1e6`, warm-deep `#ece3d0`, card `#fffdf6`, ink `#2c2a24`,
    ink-soft `#5b5749`, ink-faint `#8d876f` (warm neutral);
  - orange `#c44a2c`, orange-deep `#a03a22` (accent / primary action on dark
    surfaces only);
  - line `#dcd3bd`, line-strong `#b9ad8f`.
- Status tones success / warning / danger / info are semantic; they are always
  paired with an icon or label, never color alone (warning/danger/success tags
  carry a glyph).
- Orange is used as an **accent and primary-action surface** (with white text),
  never as body text.
- **Typography hierarchy**: display typeface (Shippori Mincho + CJK fallbacks)
  for titles / hero / story headings; body typeface (Zen Kaku Gothic New + CJK
  fallbacks) for body, UI, and labels. Type scale:
  `--tmm-text-display-lg` 2rem / `--tmm-text-display` 1.6rem / `--tmm-text-title`
  1.3rem / `--tmm-text-body` 0.98rem / `--tmm-text-caption` 0.82rem. The exact
  approved font family is unresolved where the design source is not available;
  the shipped Google-font pair is the current implementation, not a permanent
  approval.
- **Radius**: sm 8px / md 14px / lg 20px / pill 999px. **Shadow**: card and
  lift. Exact token values remain the approved source's decision where not
  explicitly confirmed.

## Shared Component Hierarchy

The single visual system for S0–S9 is the `tmm-*` foundation
(`src/ui/tokens.css`, `src/ui/ui.css`, `src/ui/index.tsx`, Issue #42). Child
screens import these primitives instead of building their own visual system.

- **Buttons** `.tmm-btn`: pill, min-height 44px, variants primary (forest
  fill) / secondary (outline) / orange (accent fill); `--block` stretches full
  width; `--sm` is a compact 38px variant.
- **Selection chips** `.tmm-chip`: pill, min-height 44px; selected state is
  forest fill with `aria-pressed="true"`; disabled is 55% opacity.
- **Cards** `.tmm-card`: card surface with `--tmm-border`, radius-md, shadow;
  variants flat / feature (4px leaf left border) / button (clickable, lifts on
  hover/focus).
- **Status / compatibility tags** `.tmm-tag`: pill, tones success / warning /
  danger / info, each with an icon glyph so state never relies on color alone.
- **Progress**: `.tmm-progress` bar (leaf→forest gradient fill) and
  `.tmm-steps` step dots (done / current states).
- **State hierarchy** (selected / unselected / disabled / warning) is
  consistent across chips, cards, buttons, and tags: selected = forest fill,
  unselected = card + strong border, disabled = 55% opacity, warning = icon +
  warning tone.

## S0 Landing

- Hero: eyebrow → display title → tagline → primary CTA → small note.
- Primary CTA is a block primary button (診断へ); the 3-step value explanation
  uses numbered circular step markers with display-type titles and caption
  descriptions.
- Media: the hero uses no final photo asset by default; if a hero image is
  used it follows the placeholder rule below and must not imply a region
  outside the pilot.

## S1 / S2 Diagnosis

- **S1 dietary** is a multi-select chip list (skippable) plus a free-text
  input, wrapped by trust copy stating input is recommendation-only.
- **S2** is one question per screen with back / progress header, `StepDots`,
  chip options (radio for single-select, toggle for multi-select), and a
  primary Next/Done button. Progress never implies a safety guarantee.
- The approved overview's **large diagnosis choice-card pattern** is not
  matched by the current chip-based implementation. The exact card size,
  border, and selected treatment are unresolved (see below); the chip option is
  the smallest reversible assumption until the approved source is available.

## S3 Diagnosis Result

- Result is a **feature card**: title, description, match-reason `Tag`s derived
  from the S2 answers, and a dietary-consideration tag. It carries the
  dietary disclaimer equivalent to 「詳細は現地・店舗に直接確認してください」
  (product contract "Safety Boundary").
- Primary CTA → S4 story; secondary CTA → re-edit diagnosis.
- The meaning of the S3 match score is unresolved (see below); do not display a
  score whose semantics are not defined. The S3 secondary candidate card
  interactivity is unresolved.

## S4 Food Culture Story

- **Numbered editorial sections** in the approved rhythm: hero (kicker, title,
  lead, read-time, origin tag, media) → why (geography/history) → maker →
  craft & wisdom → challenge today → tasting-is-succession → support actions →
  route CTA.
- Sections use the shared `StorySection` primitive: uppercase kicker, display
  title, body paragraphs at relaxed line-height (1.8).
- The maker block uses a **feature card with media + name + role**.
- Support actions are embedded after the succession beat (shared `SupportPanel`,
  see S7). Provenance is preserved in a compact `details/summary` Sources block;
  editorial composition is clearly marked, never asserted as verified fact.
- Long-copy tolerance applies throughout (see below).

## S5 Model Route

- Course header: kicker, display title, and meta pills (duration / transport /
  total time), all wrapping.
- **Half-day ⇄ 1-day segmented control**: a two-option segmented control built
  from `tmm-chip` primitives (each option flex: 1, selected = forest fill).
- **Numbered map / timeline**: a stylized map with **numbered pins
  (pin number == timeline step number)**; pin 1 is the orange "current" marker,
  other pins forest. A legend explains the dots. The vertical timeline lists the
  same numbered steps (shared `RouteStep`: numbered circle + name + role +
  stay time) with mobility segments (train / bus / walk) between them.
- Warning / reservation info uses a warning `Tag` (icon + tone, never color
  alone).
- Primary CTA saves the itinerary and writes the shared `tmm:savedRoutes`
  contract; the saved state is shown by the button's `aria-pressed` +
  secondary/primary swap and a toast.

## S6 Spot Detail

- **Practical-information hierarchy**: a visual placeholder hero (16:9) → title
  row (name + romanization + category tag) → story excerpt → `InfoList`
  (address / access / hours / closed days / price) → demo/unverified notes →
  CTAs (directions / add to itinerary / reserve) → dietary disclaimer.
- `InfoList` shows **only data that actually exists**; missing fields render an
  explicit unverified state (「営業時間・料金などは現地でご確認ください」), never a
  fabricated claim.
- Reserve CTA is disabled unless reservation data exists. The add-to-itinerary
  CTA writes the same `tmm:savedRoutes` contract as S5 / S7.

## S7 Support Actions

- **Two-column support-action cards** on the standalone `/support` page (and
  the shared `SupportPanel` embedded in S4). The six actions are
  買う / 訪れる / 予約する / 寄付する / 共有する / 保存する. At 375px the grid is a
  single-column stack of full-width cards (current implementation). A
  two-column layout is the approved overview's pattern for wide screens; adopt
  it only on screens ≥768px and only where the approved source confirms it —
  do not treat the two-column layout as an approved rule before then.
- Each card: icon badge + title + cultural-succession meaning + action button.
  Unverified actions render a clearly-marked 準備中 / coming-soon tag and never
  fake a destination; the save action writes the shared saved-route contract.
- The **contribution summary** is the panel's framing ("興味を、力に変える。"
  + lead) plus the save-status footer — it states what each action means for
  cultural succession, not a reward count.

## S8 My Route

- **Saved-route list**: each saved model route renders as a **continuation
  card** — title, duration / area meta, and actions (open route / remove) —
  navigating back to S5. Newest first.
- Empty state uses the shared `EmptyState` with a diagnosis CTA.
- Area meta may name 奥多摩 as the current pilot but must not make the page
  read as an Okutama-only product.

## S9 Badge Collection (Stretch Only)

- S9 badge presentation is **Strictly Stretch**: it is optional, time-permitting
  work, and must never block or gate S0–S8.
- If shown, badges are a **next-region / retention layer** — motivation to
  discover another Tokyo region — not the Product's primary collection goal.
- Unearned badge dummies / future-region slots must be clearly labeled as
  locked or future fixtures and must not imply implemented routes, places, or
  stories for those regions.
- The exact initial earned-badge count is unresolved (see below); do not invent
  one.

## Placeholder and Media Rules

- **Placeholder/demo imagery** (gradient + display-type mark, e.g. the
  `pv-visual` and `FoodCultureImage` placeholders) is the current implementation
  and is **distinct from approved production / reuse assets**.
- Placeholder media must render a readable name / mark and carry an accessible
  alt; it never presents a fabricated photograph as real.
- Approved production imagery (final character, logo, photos) is unresolved
  (see below); placeholder text must not silently become an approved asset.

## Responsive, Long-copy Tolerance, Accessibility

- **Responsive**: verified at 375px first; at ≥768px the page / card padding
  grows; at ≥1024px content max-width rises to 520px.
- **Long-copy tolerance**: ja / en / zh-TW copy must not break layout. Display
  titles and route/spot names use `overflow-wrap: anywhere`; cards and grids
  wrap; the wizard's step dots and header must survive long en / zh-TW strings.
  Japanese is the demo default; en / zh-TW are structurally equivalent with
  natural wording, not word-for-word translation (AGENTS.md).
- **WCAG AA** contrast and **≥44px interactive targets** remain the minimum
  quality bar (product contract). Interactive targets default to 44px
  (`--tmm-tap-min`). The shared foundation's compact `--sm` (38px) button
  variant exists for non-primary actions; primary tap targets stay 44px. Focus
  is always visible (3px orange outline). `prefers-reduced-motion` disables
  motion.

## Unresolved / Must Not Be Invented

The following are **not yet decided by an approved source** and must stay
explicitly open rather than be fabricated by an implementation Issue:

1. **Final character / logo / image source assets and reuse permissions** — no
   production asset is approved; placeholder imagery and the wordmark header
   are the current implementation, not final assets.
2. **Exact font family** — the shipped Google-font pair (Shippori Mincho / Zen
   Kaku Gothic New) is the implementation default; the approved font family
   remains open where the design source is not available.
3. **Exact colors / radii / token values** — `--tmm-*` values in `src/ui` are
   the current implementation; values not confirmed by an approved design
   source are not permanent approvals.
4. **Meaning of the S3 "92%" match score** — whether it is a fixed demo value,
   a deterministic score, or presentation-only copy is undecided. Do not
   display a score whose semantics are undefined.
5. **S3 secondary candidate interaction** — whether the secondary
   (江戸東京野菜) card is interactive is undecided.
6. **Verification status of S4–S6 maker/spot content** — whether UI-labelled
   makers / spots are real verified data or mock / editorial placeholders is
   undecided; keep provenance labels until confirmed.
7. **Initial S9 earned count** — the exact starting count where overview and
   real MVP content differ is undecided.
8. **Future-region teaser content** — exact teaser copy / visuals for
   future-region slots, if any, are undecided.
9. **S2 large diagnosis choice-card pattern** — whether S2 options render as
   the approved overview's large choice-cards or the current chips is
   undecided; the chip is the current implementation and smallest reversible
   assumption.

## Out of Scope

- S0–S9 page implementation (child Issues #77–#82)
- Asset creation and Figma recreation
- Visual regression infrastructure
- Product behavior changes (diagnosis, route, persistence, dietary safety,
  provenance, S9 reward/redemption)

## References

- `docs/specs/product/hackathon-product-contract.md` — durable behavior
  contract (product positioning, MVP boundary, safety boundary, account /
  persistence, determinism).
- Issue #85 — Product Vision: tourism dispersion beyond Tokyo 23 wards,
  Okutama as first MVP pilot.
- Issue #41 — approved S0–S9 UI / Design Spec v1.0 as Hackathon UX source.
- `src/ui/` (tokens.css, ui.css, index.tsx) — the shared `tmm-*` presentation
  foundation (Issue #42) this contract describes.
