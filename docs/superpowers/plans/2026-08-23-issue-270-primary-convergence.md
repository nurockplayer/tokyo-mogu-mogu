# Issue #270 Primary Convergence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to execute this plan task-by-task.

**Goal:** Converge the 375px Golden Path on the approved Product/Figma contract while adopting only safe, materially useful interaction patterns from the Netlify reference and integrating truthfully mapped Okutama fieldwork media.

**Architecture:** Keep the existing routes, content contracts, and storage boundaries. Add one router-level scroll/focus coordinator, one reusable journey-progress component, and one reusable native-scroll gallery. Store media metadata and provenance separately from Product content so demo-authorized fieldwork assets do not become venue or rights claims.

**Tech Stack:** React 19, TypeScript, React Router, CSS, Vitest, Playwright, Vite.

---

### Task 1: Establish failing convergence gates

**Files:**
- Create: `e2e/issue-270-convergence.test.ts`
- Modify only if shared fixtures are needed: `e2e/helpers/*`

Cover forward-navigation scroll/focus, browser-back restoration, six-stage progress semantics, localized repeat-diagnosis copy, gallery keyboard/pagination behavior, and reduced-motion behavior. Run the focused Playwright file and confirm the new expectations fail for the intended missing behavior.

### Task 2: Add router-level scroll and focus continuity

**Files:**
- Create: `src/app/JourneyNavigationManager.tsx`
- Modify: `src/app/AppRouter.tsx`
- Modify: journey Back links in `src/pages/s0s3/StoryPage.tsx`, `src/pages/RoutePage.tsx`, and `src/pages/SpotPage.tsx`

Save scroll positions by history entry, move forward destinations to the top, restore POP/back context, and focus the destination heading without visible focus jumps. Respect explicit in-product Back links. Avoid time-based waiting; support lazy routes through bounded DOM observation.

### Task 3: Implement measured journey and sticky-action feedback

**Files:**
- Create: `src/components/JourneyProgress.tsx`
- Create: `src/components/JourneyProgress.css`
- Modify: `src/pages/s0s3/ExplorationWizardPage.tsx`
- Modify: `src/pages/s0s3/ResultPage.tsx`
- Modify: `src/pages/s0s3/onboarding.css`
- Modify: `src/pages/s0s3/StoryPage.tsx`
- Modify: `src/pages/s0s3/story.css`
- Modify: `src/pages/RoutePage.tsx`
- Modify: `src/pages/route.css`
- Modify: `src/i18n/resources.ts`

Implement the six-stage Figma tracker without fake loading, align the Story and Route fixed surfaces with measured safe-area geometry, preserve double-activation prevention and live save confirmation, and add only restrained motion with a complete reduced-motion fallback.

### Task 4: Derive and register safe fieldwork media

**Files:**
- Create: `src/assets/fieldwork/okutama/*.{webp}`
- Create: `src/assets/fieldwork/okutama/README.md`
- Create: `src/data/fieldwork-media.ts`

Generate stripped responsive WebP derivatives for the tourism-office display, stamps, Wasapi figure, generic Okutama bridge, and generic Okutama valley. Do not ship originals or GPS EXIF. Record Drive IDs, original hashes, mapping constraints, exclusions, verification date, and the narrow project/demo authorization basis.

### Task 5: Add an accessible reusable gallery and truthful media placements

**Files:**
- Create: `src/components/MediaGallery.tsx`
- Create: `src/components/MediaGallery.css`
- Create: `src/components/MediaGallery.test.tsx`
- Modify: `src/pages/SpotPage.tsx`
- Modify: `src/pages/spot.css`
- Modify: `src/pages/s0s3/StoryPage.tsx`
- Modify: `src/pages/s0s3/story.css`
- Modify: `src/pages/RoutePage.tsx`
- Modify: `src/pages/route.css`

Use native horizontal overflow, touch scrolling, snapping, controls, pagination, Arrow/Home/End keyboard navigation, localized alt/caption text, and reduced-motion-safe scrolling. Restrict tourism-office images to the matching Spot/stop; label bridge/valley images as generic Okutama scenery rather than specific venues.

### Task 6: Resolve copy and evidence deltas

**Files:**
- Modify: `src/pages/s0s3/FoodProfilePage.tsx`
- Modify: `src/i18n/resources.ts`
- Create: `docs/evidence/issue-270/final-reconciliation-2026-08-23.md`

Remove the duplicate Food Profile confirmation, rename the repeat action naturally in ja/en/zh-TW, and record the Figma ledger, Netlify ledger, media mapping/provenance, gallery result, validation evidence, and explicit remaining limitations.

### Task 7: Validate, independently review, and converge main

Run focused tests, `pnpm validate`, full Playwright/E2E, Golden Path plus repeat diagnosis, 375px locale QA, keyboard/focus/reduced-motion/gallery checks, and an interactive final comparison to Netlify. Obtain independent focused review, fix blocking findings, commit and push with `rtk`, open the primary PR, wait for CI, merge only when green, update the single Issue handoff with final SHA/evidence, and close #270 only if every acceptance criterion is met.
