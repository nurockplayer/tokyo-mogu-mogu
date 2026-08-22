# Netlify Reference Implementation — 2026-08-22

Status: **implementation-quality reference for P0 UX convergence**

Reference URL: `https://mogu-mogu-5525da.netlify.app`

Related authority:
- Issue #270
- `docs/design/figma-design-system.md`
- `docs/specs/product/approved-ui-fidelity.md`
- Product / IA / safety contracts including #92, #112, #255, #257, #265, #268

## 1. Purpose

This reference build demonstrates a noticeably stronger implementation of TOKYO MOGU MOGU's interaction feel than the current runtime baseline in several areas, especially motion, transition rhythm, conversational continuity, press feedback, scroll behavior, and perceived responsiveness.

It is **not** a Product, data, safety, or visual source of truth. It must never override the latest approved KiKi Figma or current Product contracts.

Use it to answer one narrow engineering question:

> When the approved TOKYO MOGU MOGU experience is implemented well, how should the interaction execution feel?

## 2. Authority order

When sources disagree, use this order:

1. Product / data / safety / IA contracts
2. latest approved live KiKi Figma for visible design and interaction intent
3. `docs/design/figma-design-system.md` as the extracted engineering design contract
4. this Netlify reference for implementation-quality / motion / interaction execution
5. current runtime implementation

Interpretation:

- **Figma defines what the experience should look and feel like.**
- **This reference demonstrates how well that interaction can be executed.**
- **Current runtime is implementation state, not design authority.**

If the Netlify build conflicts with Figma or Product semantics, do not copy the conflicting behavior.

## 3. Required comparison model

For every meaningful interaction-quality difference between current `main` and the reference, classify it as:

- `ADOPT` — clearly improves UX and is compatible with Figma/Product authority
- `ADAPT` — useful idea, but must be translated for current architecture, 375px, i18n, accessibility, or Product contracts
- `DO_NOT_COPY` — implementation-specific, obsolete, unsupported, or conflicting behavior

Do not use screenshot similarity alone. Interact with the reference and compare the complete progression.

## 4. Motion and interaction focus

Study at minimum:

- screen-to-screen continuity
- tap / press feedback
- button active-state movement
- card / tile active-state movement
- conversational reveal rhythm
- scroll positioning when a new turn appears
- active-question positioning in the viewport
- Result / success / reward reveal
- progress transitions
- sticky / fixed UI continuity
- feedback timing and visual hierarchy
- accidental double-progression prevention
- reduced-motion behavior

The goal is continuity and responsiveness, not decorative animation.

## 5. Engineering motion baseline

These values are the default P0 baseline unless fresh Figma/reference inspection gives a stronger component-specific reason.

### Timing

| Role | Baseline |
|---|---:|
| Press feedback | ~150ms |
| Ordinary state transition | ~200ms |
| Toast / short feedback | ~300ms |
| Page / reward reveal | ~400–450ms |
| Progress transition | ~500ms |
| Location pulse, when applicable | ~2000ms |

### Easing

Preferred shared easing:

```css
cubic-bezier(0.22, 0.61, 0.36, 1)
```

### Interaction language

- Page entrance may use `opacity: 0 → 1` with `translateY(8px) → 0`.
- Button press may use approximately `scale(0.97)`.
- Card / tile press may use approximately `scale(0.98)`.
- Tactile hard-shadow buttons may move down approximately `2px` on active state while reducing the hard shadow.
- Progress motion should visually connect the previous and next state rather than snap without context.
- Strong completion motion is reserved for meaningful success/reward moments.

## 6. Conversational reveal and scrolling

The better implementation preserves conversational continuity by positioning newly revealed content instead of abruptly replacing the user's viewport context.

Engineering baseline:

- Newly revealed short turns settle near the viewport bottom with approximately `16px` breathing space.
- Tall turns open from their top with approximately `72px` header clearance.
- Around `60%` of viewport height is a reasonable short/tall turn boundary.
- Smooth scrolling is allowed only when `prefers-reduced-motion` is not active.
- Diagnosis screen replacement should move focus to the newly active named region without causing a duplicate scroll.
- Route transitions must reset or preserve scroll intentionally; inherited browser scroll position must not accidentally hide the next primary action.

The user should understand where the next content came from and where to look next.

## 7. Progression safety

Motion and rapid rendering must not create accidental progression.

Required behavior:

- retain stale-activation protection
- use a short approximately `150ms` transition / double-tap guard where a newly rendered next control could receive the second tap
- never let one activation skip two questions
- do not introduce artificial waiting for normal deliberate use
- disabled / transition-lock state must remain accessible and semantically correct

## 8. Motion principles

### Continuity first
Transitions preserve spatial and narrative context. Motion should explain state change.

### Tactile, not flashy
Buttons and cards react to touch. The whole interface should not bounce simply because animation is available.

### Feedback hierarchy
Ordinary state changes remain quiet. Meaningful completion may receive stronger motion.

### No artificial waiting
Never add fake loading solely to make a prototype appear more intelligent or dramatic.

### Accessible by default
Motion is supplementary. Meaning, progress, selection, success, warning, and failure must remain understandable without animation.

## 9. Avoid

Do not introduce:

- gratuitous bounce / spring effects
- decorative parallax
- full-screen slide transitions without a navigation reason
- long stagger chains
- fake AI / recommendation loading
- motion that shifts the primary target away from the user's expected tap location
- animation-dependent meaning
- continuous motion with no user benefit

## 10. Reduced motion

Honor `prefers-reduced-motion: reduce`.

When active:

- replace smooth scrolling with immediate positioning
- remove nonessential entrance transforms
- reduce or remove decorative pulses and repeated motion
- preserve all state, focus, progress, and success information through static UI

No essential action or confirmation may depend on animation finishing.

## 11. Product overrides that must survive

The reference must never be used to restore or invent obsolete Product behavior.

Preserve:

- Food Profile = persistent one-time / explicit-edit dietary setup
- `食旅を見つけ` = repeatable per-trip diagnosis
- deterministic guided Golden Path (#257)
- real deterministic score-free Top 3 (#255)
- Story → Route → Spot identity and source provenance (#265)
- Tokyo-wide × multi-region × multi-food-culture Product scope
- Japanese and international travelers as first-class users
- ja / en / zh-TW
- 375px engineering baseline
- accessibility adaptations
- no dietary-safety guarantee
- no fake local/business facts
- no realtime routing/geocoder claims unless separately authorized
- no fabricated recommendation-confidence semantics

A behavior does not become Product authority merely because it feels better in the reference build.

## 12. Verification contract

A P0 interaction-quality reconciliation should include:

1. direct interaction with the reference build
2. direct interaction with current `main`
3. fresh 375px screenshots where static comparison is meaningful
4. live Figma comparison when access is available
5. ja/en/zh-TW checks
6. keyboard/focus checks
7. `prefers-reduced-motion` checks
8. Playwright/E2E validation

The final report must list:

- adopted interaction ideas
- adapted interaction ideas
- rejected / `DO_NOT_COPY` ideas
- the authority or technical reason for each decision

## 13. Relationship to the human-facing design specification

The human-facing `TOKYO MOGU MOGU デザイン仕様書 v1.1` records the same motion direction in document form. This Markdown file is the repository-native engineering reference for agents and implementation work.

Do not require an agent to parse the DOCX before it can understand the motion contract.

## 14. Definition of done

The current 375px app should read as the same Product and visual system as the approved KiKi Figma, while reaching the strongest safe interaction-quality bar demonstrated by the Netlify reference.

Every remaining difference should be either:

- fixed,
- adapted for Product/accessibility/responsive constraints, or
- explicitly rejected with a documented reason.
