# Historical / Superseded UI Fidelity Record (S0–S9)

> **Historical record — not current Product or UI authority.** This document
> preserves the former S0–S9 presentation specification, including its former
> Top-3 Result direction, for provenance. Do not implement, restore, or infer
> current behavior from it. For current authority, inspect the connected KiKi
> Figma, then current `main`, then
> `docs/specs/product/hackathon-product-contract.md`.

The historical preamble is preserved verbatim below. It remains historical and
does not override the authority boundary above.

Durable cross-Issue presentation contract that keeps the S0–S9 screens visually
coherent when no approved KiKi Figma exists for a screen. This Spec is the
**fallback presentation contract**: once an approved KiKi Figma screen is
available, that Figma is the highest-priority visual / interaction
implementation source for the screen, and this Spec applies only where the
Figma does not cover presentation. This Spec owns **presentation only**; it
does not redefine diagnosis semantics, dietary safety, route semantics,
persistence, data provenance, S9 priority, or the Product-wide geographic
scope.

For the live journey inspected by Issue #263, use
`docs/design/figma-design-system.md` as the canonical extracted engineering
baseline. It records the inspected nodes, shared values, deliberate variants,
drift, Product overrides, and #208 accessibility adaptations. Neither this
fallback Spec nor old `MATCH` / `FULL_COVERAGE` records prove live-Figma parity.

- **Presentation source of truth**: the **latest approved KiKi Figma for each
  screen** wins for that screen when available. Where an approved Figma is not
  yet available, use this Spec. For inspected live nodes, the extraction in
  `docs/design/figma-design-system.md` translates their repeated values into
  reusable rules. Remaining fallback content is informed by the latest approved
  `TOKYO_MOGU_MOGU_overview` shared in Slack `#05_plan` on 2026-08-08, then
  `TOKYO MOGU MOGU デザイン仕様書 v1.0`, then
  `docs/specs/product/hackathon-product-contract.md`, then existing
  implementation where it does not conflict.
- **App IA source of truth**: Issue #92 (reusable `Home / Discover / MOGU / My`).
  The S0–S9 screen names below are the historical framing; their placement in
  the current primary navigation follows the #92 App IA mapping.
- **Product / MVP framing source of truth**: Issue #112 (Product scope =
  Tokyo-wide, multi-region × multi-food-culture; 8/23 demo golden path =
  Okutama × Tokyo Wasabi; Tama / Okutama as current fieldwork /
  demo-content context; evidence-driven food content).
- **Status**: Fallback-only where live Figma and the Issue #263 extraction are
  silent. Child Issues #77–#82 reference this file and keep their acceptance
  criteria atomic.

## Current App IA (Issue #92)

The persistent bottom nav is **`Home / Discover / MOGU / My`** (see
`src/app/AppShell.tsx`); the S0–S9 screens are mapped into these four
destinations as described in the product contract:

| Existing | Current IA role |
|---|---|
| S0 Landing | First-service introduction / Home first-time state |
| S1 Dietary Restrictions | First-time `Food Profile`; later editable from My |
| S2 Preference Diagnosis | Per-trip `Exploration Conditions` |
| S3 Result | Immediate result + auto-add to MOGU |
| S4 Story | Result content layer; also reachable from Discover |
| S5 Route | Recommended journey; can be saved to My |
| S6 Spot Detail | Practical details + external actions; reachable from Route/Discover |
| S7 Support Hub | No standalone primary page; support CTAs are distributed into Story/Route/Spot |
| S8 My Route | Integrated into `My → Saved Routes` |
| S9 Badge | Integrated into `My → Badges`; remains Stretch |

The old bottom nav `Home / Diagnosis / Support / My Route` is **superseded**;
those screens stay reachable by direct URL for history/compatibility but are no
longer primary-nav destinations. The per-screen presentation rules below
continue to apply to the corresponding screens wherever they appear in the
current App IA (e.g. the Saved Routes list now renders under My).

## Relationship to Product Contracts

- **Product behavior** (diagnosis semantics, dietary safety boundary, route
  semantics, persistence, provenance, S9 priority, geographic scope) stays
  owned by `docs/specs/product/hackathon-product-contract.md` and the current
  Product / MVP framing in Issue #112.
  This Spec references those contracts instead of duplicating them.
- **App IA / navigation behavior** stays owned by Issue #92.
- Where presentation could mislead about the Product's geography, this Spec
  applies the positioning invariants below.

## Product-positioning Presentation Invariants

TOKYO MOGU MOGU is a **regional-discovery / tourism-dispersion product for
Tokyo beyond the 23 wards** (Issue #112). The 8/23 demo golden path is
**Okutama × Tokyo Wasabi**; **Tama / Okutama are the current fieldwork /
evidence / demo-content context**; food content is **evidence-driven** — Tokyo Wasabi is a possible
strong demo fixture, not the exclusive MVP content contract. These are not the
Product's permanent geographic or content scope. See Issue #112 and the product
contract.

- S0 / S8 / S9 presentation must never make the Product look permanently
  Okutama-only. Area labels on S8 and any landing copy may name 奥多摩 as the
  current fieldwork / verified-content focus, but the Product framing (name,
  tagline, hero, S9 continuation) stays region-agnostic. Under the #92 App IA
  the landing copy is the Home first-time state.
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

- The inspected live Figma uses **390px source frames**. Engineering still
  verifies **375px first** under the Product contract and #208. Translation is
  fluid reflow with stable tokens, never a 375/390 transform scale.
- The base shell gutter is 16px. Measured content insets of 14/18/20/22px are
  intentional surface compositions documented in the extracted design system,
  not replacement global gutters.
- Spacing follows 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40px plus the named 10px
  chip gap. Page height is content-driven; Figma heights are captured scroll
  states.
- The current 480/520px centered wide-screen shell is a fallback. The live file
  does not establish tablet/desktop rearrangement.
- Persistent navigation follows `Home / Discover / MOGU / My`, but focused
  onboarding screens may omit it. Header mode is surface-specific rather than
  one shared logo toolbar on every screen.

## Shared Header / Logo / Locale Switch

- Exploration, Result, and Route use the measured 53px green app-header mode.
  Story and Spot use a hero-overlay back-control mode. Food Profile uses focused
  conversation chrome. Exact geometry is in the Issue #263 extraction.
- The generic logo/locale/reset toolbar in the shared shell is demo/fallback
  infrastructure; it is not proof of the live Product header on every screen.
- The Figma wordmark/character is visible design evidence, not automatic reuse
  authorization. Asset permission and provenance remain required.
- The **locale switch** toggles ja / en / zh-TW. Japanese is the demo default;
  en and zh-TW must not break whichever header/demo-chrome mode contains it.
- Auth controls (Google Auth) stay reusable infrastructure only; the approved
  header must not force an auth control into the core demo journey (product
  contract "Account / Persistence").

## Visual Language

- Canonical source and accessible engineering roles are defined in
  `docs/design/figma-design-system.md` and `src/ui/tokens.css`: warm `#FFF4E4`,
  white surfaces, ink `#222222`, live forest `#667A47`, selection `#667F37`,
  leaf `#9DBC64`, multi-select-panel `#B1CF7A`, experience field `#B2D083`,
  Taste/Theme panel `#F5EEDB` at 80%, and the documented orange family. These
  greens are component roles, not completed/current conversation states.
  Semantic text-bearing roles remain AA-hardened where the raw prototype
  combination fails.
- Status tones success / warning / danger / info are semantic; they are always
  paired with an icon or label, never color alone (warning/danger/success tags
  carry a glyph).
- Orange is used as an **accent and primary-action surface**, never as body
  text. Preserve the live orange fill with dark ink where that is sufficient
  for AA; the darker `#C44A2C` is a compatibility fallback for existing
  white-text controls, not an extracted KiKi action color.
- **Typography hierarchy**: Roboto is the dominant live family, with CJK
  fallbacks. Shared sizes are 12 / 14 / 16 / 18 / 20 / 22 / 24px. M PLUS
  Rounded is a limited Landing/experience accent; SF Pro is device chrome.
  Shippori Mincho is a legacy abstraction, not a live-Figma standard.
- **Radius**: 8px utility / 12px standard / 18px feature / pill. Shadows are
  component roles (hard tactile action, selected choice, modal, map overlay),
  not one universal card/lift scale.

## Shared Component Hierarchy

The single visual system for S0–S9 is the `tmm-*` foundation
(`src/ui/tokens.css`, `src/ui/ui.css`, `src/ui/index.tsx`, Issue #42). Child
screens import these primitives instead of building their own visual system.
The primitives retain behavior and accessible states, but their generic visual
defaults are implementation state. The live per-component contract in
`docs/design/figma-design-system.md` wins during #262 convergence.

- **Buttons** `.tmm-btn`: min-height 44px; pill and 12px-radius shapes are both
  intentional by context. `--block` stretches full width; `--sm` preserves a
  compact visual treatment without reducing the hit target below 44px.
- **Selection chips** `.tmm-chip`: pill, min-height 44px; selected state is
  forest fill with `aria-pressed="true"`; disabled is 55% opacity.
- **Cards** `.tmm-card`: reusable behavior wrapper. Live standard cards are
  white/radius-12 and predominantly flat; border/elevation is applied only by
  the measured component role.
- **Status / compatibility tags** `.tmm-tag`: pill, tones success / warning /
  danger / info, each with an icon glyph so state never relies on color alone.
- **Progress**: `.tmm-progress` and `.tmm-steps` remain generic fallback
  primitives. The inspected journey instead uses a measured 390 × 84
  leaf/forest tracker; #262 must implement that role explicitly rather than
  treating the generic bar as live-Figma proof.
- **Sticky actions**: Story and the saved state use measured 390 × 73 leaf
  footers; Route uses a 390 × 155 summary/action footer. Their shared upward
  separator shadow is distinct from bottom-nav elevation and is canonicalized
  by #263; implementation remains #262 scope.
- **State hierarchy** (selected / unselected / disabled / warning) is
  consistent across chips, cards, buttons, and tags: selected = forest fill,
  unselected = card + strong border, disabled = 55% opacity, warning = icon +
  warning tone.

## S0 Landing

- Live node `1:95` is a full-bleed illustrated landing composition with centered
  brand artwork and a 180 × 54 forest pill CTA using a hard 4px shadow.
- The old eyebrow/title/three-step fallback applies only if a future screen has
  no approved live design. It is not evidence for convergence of `1:95`.

## S1 / S2 Diagnosis

- Food Profile is a conversation transcript with completed/current assistant
  bubbles, right-aligned user replies, chip/action bubbles, and a measured
  307px modal/input state. Dietary input remains recommendation-only.
- Exploration uses one question per state plus measured experience cards,
  centered 280px choices, Taste + Theme chips, a centered vertical Next-then-
  Back action stack, and the shared journey tracker. The component geometry is
  resolved in the Issue #263 extraction.
- #257 overlays exactly one actionable highlighted target on first run;
  returning/free exploration restores normal controls. Progress never implies
  a safety guarantee.

## S3 Diagnosis Result

- Result is a **ranked Top 3** (#255): the selected source-backed journey first,
  followed by the next two distinct eligible evaluations from the same
  deterministic recommendation decision. Every card carries title,
  description, bounded match-reason `Tag`s, route metadata, and its own S4 Story
  CTA with canonical candidate identity.
- The first card carries the dietary-consideration tag and the Safety Boundary
  disclaimer equivalent to 「詳細は現地・店舗に直接確認してください」。The page-level
  secondary CTA re-runs Exploration.
- Internal additive scores are ordering-only. Do not render them as percentages,
  probability, confidence, safety, or recommendation-accuracy claims.

## S4 Food Culture Story

- **Numbered editorial sections** in the approved rhythm: hero (kicker, title,
  lead, read-time, origin tag, media) → why (geography/history) → maker →
  craft & wisdom → challenge today → tasting-is-succession → support actions →
  route CTA.
- Sections use the shared `StorySection` primitive: a letter-spaced kicker
  (the English copy is authored in all-caps, e.g. `GEOGRAPHY & HISTORY`),
  display title, and body paragraphs at relaxed line-height (1.8).
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

## S7 Support Actions (distributed CTA, no standalone primary page)

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
- Under the #92 App IA, **Support is a cross-screen action pattern, not a
  primary destination**: the same cards embed in Story (share / understand
  contribution / view route), Route (save route / plan visit), and Spot
  (reserve / buy / book + regional impact). Purchase/booking remains
  external-link-first for the MVP; no internal commerce backend is implied.
  The standalone `/support` page remains reachable by direct URL but is not a
  primary-nav destination.

## S8 My Route (now `My → Saved Routes`)

- **Saved-route list**: each saved model route renders as a **continuation
  card** — title, duration / area meta, and actions (open route / remove) —
  navigating back to S5. Newest first.
- Empty state uses the shared `EmptyState` with a CTA that starts the current
  exploration journey. The current implementation links that CTA to the landing
  screen (copy: 「探索から始める」); confirm the intended target in the S8
  child issue.
- Area meta may name 奥多摩 as the current demo / fieldwork focus but must not
  make the page read as an Okutama-only product.
- Under the #92 App IA, this list renders under **My → Saved Routes** (the My
  destination also holds Food Profile and the Stretch-only Badges entry). The
  old standalone My Route primary destination is superseded; the screen remains
  reachable by direct URL.

## S9 Badge Collection (Stretch Only; `My → Badges`)

- S9 badge presentation is **Strictly Stretch**: it is optional, time-permitting
  work, and must never block or gate S0–S8.
- If shown, badges are a **next-region / retention layer** — motivation to
  discover another Tokyo region — not the Product's primary collection goal.
- Under the #92 App IA, Badges are not a primary-nav destination; if
  implemented they live under `My → Badges`.
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

- **Responsive**: live source frames are 390px; engineering is verified at
  375px first by fluid reflow. At wider widths, current 480/520px centering is
  fallback behavior only because no live tablet/desktop composition was found.
- **Long-copy tolerance**: ja / en / zh-TW copy must not break layout. Display
  titles and route/spot names use `overflow-wrap: anywhere`; cards and grids
  wrap; the wizard's step dots and header must survive long en / zh-TW strings.
  Japanese is the demo default; en / zh-TW are structurally equivalent with
  natural wording, not word-for-word translation (AGENTS.md).
- **WCAG AA** contrast and **≥44px interactive targets** remain the minimum
  quality bar (product contract). Interactive targets default to 44px
  (`--tmm-tap-min`), including Figma's visually 34px hero-back control. Small
  informational tags may remain noninteractive. Raw leaf/multi-select/orange/
  route-secondary/nav combinations are adapted as documented by #263. Focus is
  always visible (3px orange outline). `prefers-reduced-motion` disables motion.

## Unresolved / Must Not Be Invented

The following remain open after the live-Figma extraction and must stay
explicit rather than be fabricated by an implementation Issue:

1. **Final character / logo / image source assets and reuse permissions** — no
   production asset is approved; placeholder imagery and the wordmark header
   are the current implementation, not final assets.
2. **Hover / loading / validation-error design details** — the live file does
   not publish a complete interactive-state matrix. Use shared accessible
   behavior until Design explicitly replaces it.
3. **Tablet / desktop composition** — no approved wide live frames were found;
   retain the centered mobile fallback without inventing rearrangements.
4. **Replacement Result-image focal points** — #255 supersedes the old fixture
   content, but exact crops for every real Top 3 candidate are not authored.
5. **Verification status of S4–S6 maker/spot content** — whether UI-labelled
   makers / spots are real verified data or mock / editorial placeholders is
   undecided; keep provenance labels until confirmed.
6. **Initial S9 earned count** — the exact starting count where overview and
   real MVP content differ is undecided.
7. **Future-region teaser content** — exact teaser copy / visuals for
   future-region slots, if any, are undecided.

## Out of Scope

- S0–S9 page implementation (child Issues #77–#82)
- Asset creation and Figma recreation
- Visual regression infrastructure
- Product behavior changes (diagnosis, route, persistence, dietary safety,
  provenance, S9 reward/redemption)
- Changes to the current App IA navigation contract (owned by Issue #92)

## References

- `docs/design/figma-design-system.md` — canonical engineering extraction of
  the inspected live KiKi journey, including the inconsistency ledger and #208
  adaptations.
- `docs/specs/product/hackathon-product-contract.md` — durable behavior
  contract (product positioning, MVP boundary, safety boundary, account /
  persistence, determinism, and the #92 App IA mapping).
- Issue #112 — current Product / MVP framing (tourism dispersion, Product scope =
  Tokyo-wide multi-region × multi-food-culture, 8/23 demo golden path =
  Okutama × Tokyo Wasabi, Tama / Okutama as current fieldwork / demo-content
  context, evidence-driven food content).
- Issue #92 — current App IA (`Home / Discover / MOGU / My`) and the
  S0–S9 → App IA screen mapping.
- Issue #85 — historical Product Vision foundation: tourism dispersion beyond
  Tokyo 23 wards, Okutama as first pilot. Historical only where it does not
  conflict with #112 / #92 / an approved Figma.
- Issue #41 — historical approved S0–S9 UI / Design Spec v1.0 (historical
  Hackathon UX source; presentation foundation only).
- `src/ui/` (tokens.css, ui.css, index.tsx) — the shared `tmm-*` presentation
  foundation (Issue #42) this contract describes.
