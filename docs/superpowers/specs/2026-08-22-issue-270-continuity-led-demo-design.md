# Issue #270 — Continuity-led demo design

## Outcome

Ship a stable 375px judged Golden Path that keeps KiKi's approved hierarchy and visual identity while adding production-quality continuity, truthful fieldwork photography, accessible image browsing, and restrained tactile motion.

## Evidence boundary

- Visual authority: today's checked-in exact-node KiKi extraction and screenshots in `docs/design/figma-design-system.md` and `docs/evidence/issue-262` / `issue-268`.
- Fresh Figma MCP access was attempted through both prescribed read paths and is unavailable because the connected Starter account reached its call limit. Do not claim a fresh live-Figma sign-off.
- Interaction reference: the Netlify prototype was exercised at 375px. Adopt its immediate selection feedback, conversational anchoring, peeking rails, and reveal rhythm; do not copy its scores, inaccessible controls, decorative gallery, or abrupt route changes.
- Photography: the team Drive folder and Issue #258 authorize Golden Path fieldwork assets. Only use an image where its subject truthfully matches the existing content; preserve source filename/folder/retrieval traceability.

## Locked behavior

- Preserve Product scope, audience, Food Profile lifecycle, recommendation meaning, Top 3 ordering, dietary/safety language, Golden Path outcome, routing identities, persistence, and provenance.
- Keep `Home / Discover / MOGU / My` and all current caller-aware back targets.
- No new animation dependency, CMS, business records, travel claims, or fake loading/AI states.

## Presentation and interaction decisions

- Forward content navigation starts at the new screen's top; browser/back navigation restores the prior position when available.
- Selected options respond immediately, settle briefly, and then advance once. Reduced-motion users advance without decorative delay.
- Result reveals greeting/title and then the primary recommendation without exposing internal scores.
- Result → Story preserves hero continuity. Story uses a contained snap rail and truthful regional fieldwork images while keeping source/safety disclosures.
- Route keeps the approved map/timeline contract and adds matched station/tourism-office imagery plus honest fallbacks for unmatched stops.
- The tourism-office Spot uses a real hero/gallery with button semantics, selected state, captions, and a crossfade. Unmatched places retain explicit non-photo fallbacks.
- Rails must never create document-level horizontal overflow. Sticky CTAs must clear the persistent nav and safe area.
- Motion target: 140–240ms tactile/state changes and 220–420ms content reveals, using the existing easing system and a complete `prefers-reduced-motion` fallback.

## Validation

- Test the complete accountless Golden Path at 375px in ja/en/zh-TW.
- Add regression coverage for forward scroll reset, restored back context, one-step-per-action, interactive gallery state, and reduced motion.
- Run typecheck, lint, unit tests, build, focused Playwright, then the full relevant E2E suite.
