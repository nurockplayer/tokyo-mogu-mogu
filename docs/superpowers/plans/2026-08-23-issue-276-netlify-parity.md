# Issue #276 Netlify Parity Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current frontend with a 375px-first implementation that reproduces the authoritative Netlify reference, including its complete Food Profile conversation choreography and the Okutama × Tokyo Wasabi Result → Story → Route → Spot golden path.

**Architecture:** Keep the existing React/Vite providers, locale contract, domain data, and local persistence boundaries, but replace the visible route layer with a dedicated `netlify-parity` feature. A pure reducer models the timed Food Profile conversation so the UI and Playwright tests observe the same deterministic state progression; presentation records remain data-driven so the Okutama × Tokyo Wasabi content is demo data rather than a shared product-domain restriction.

**Tech Stack:** React 19, TypeScript, React Router 7, CSS, Vitest/Testing Library, Playwright, pnpm 11.

**Spec:** GitHub Issue `nurockplayer/tokyo-mogu-mogu#276`; durable scope guard: `docs/specs/product/product-scope-invariant.md`; visible reference: `https://mogu-mogu-5525da.netlify.app/`; ambiguity reference: connected Hopp `figma-bridge` file `tokyo-mogu-mogu`.

## Global Constraints

- Visible source priority is strict: Netlify, then the connected Hopp Figma bridge, then the repository implementation.
- Primary viewport is exactly 375px wide; `ja`, `en`, and `zh-TW` must have no horizontal overflow, clipped primary action, or broken navigation.
- Reproduce the observable conversation state order, 450ms/400ms/500ms/700ms delays, 280ms bubble entrance animation, quick-reply semantics, history retention, selection feedback, focus behavior, and auto-scroll from the Netlify source; the Story route-generation overlay lasts exactly 2200ms.
- Preserve `tmm:foodProfile:v1`, `tmm:moguRecent:v1`, and `tmm:savedRoutes` compatibility through the existing persistence modules.
- Okutama × Tokyo Wasabi is demo content only; shared route, region, food-culture, locale, and persistence contracts remain reusable.
- Use authentic fieldwork photography when it fits the authoritative composition; retain source URL, file ID, and verified date.
- Do not add authentication, backend work, new recommendation infrastructure, or unrelated refactors.
- Use `rtk` for every git/gh shell command and pnpm for project commands.

---

## File Structure

- `src/features/netlify-parity/ReferenceApp.tsx`: route-aware screen coordinator and shared state wiring.
- `src/features/netlify-parity/reference.css`: faithful Netlify geometry, tokens, responsive rules, and motion.
- `src/features/netlify-parity/content.ts`: locale-complete presentation copy and data-driven demo journey/spot records.
- `src/features/netlify-parity/components/BottomNavigation.tsx`: Netlify tab bar mapped to stable application URLs.
- `src/features/netlify-parity/components/LocaleControl.tsx`: compact accessible locale control required for all three locales.
- `src/features/netlify-parity/chat/foodProfileMachine.ts`: pure onboarding/chat state transitions and normalized profile output.
- `src/features/netlify-parity/chat/useFoodProfileConversation.ts`: timeout scheduling, focus, and progression orchestration.
- `src/features/netlify-parity/chat/FoodProfileConversation.tsx`: observable Netlify conversation UI.
- `src/features/netlify-parity/exploration/explorationMachine.ts`: pure five-step answer and selection transitions.
- `src/features/netlify-parity/exploration/ExplorationFlow.tsx`: five-step diagnosis wizard and area modal.
- `src/features/netlify-parity/screens/*.tsx`: Splash, Home, Results, Story, Route, Spot, MOGU, Favorites, and My screens.
- `src/assets/netlify-parity/**`: reference-compatible illustrations/photography plus provenance README.
- `src/app/AppRouter.tsx`: stable URLs rendered through the replacement visible layer.
- `src/index.css`: only global reset/viewport hosting needed by the replacement layer.
- `src/features/netlify-parity/**/*.test.ts`: pure reducer, locale, and presentation behavior tests; Playwright covers real rendered interactions because the repository intentionally has no DOM-unit-test dependency.
- `e2e/issue-276-netlify-parity.spec.ts`: real Golden Path choreography, routing, locale overflow, screenshots, and trace assertions.
- `docs/evidence/issue-276/**`: final 375px screenshot evidence used by the PR.

### Task 1: Reference assets and locale-complete presentation records

**Files:**
- Create: `src/assets/netlify-parity/README.md`
- Create: `src/assets/netlify-parity/**`
- Create: `src/features/netlify-parity/content.ts`
- Test: `src/features/netlify-parity/content.test.ts`

**Interfaces:**
- Consumes: Netlify `/assets/*`, existing `src/assets/fieldwork/okutama/**`, Drive folder `1p4seRQO1FgJ_KIym38skBnHLcsQUfp8a`, and `Locale` from `src/i18n`.
- Produces: `referenceCopy(locale: Locale): ReferenceCopy`, `demoJourneys: JourneyPresentation[]`, and `demoSpots: Record<string, SpotPresentation>`.

- [ ] **Step 1: Write the failing content contract test**

```ts
it.each(['ja', 'en', 'zh-TW'] as const)('%s exposes every primary action', (locale) => {
  const copy = referenceCopy(locale)
  expect(copy.actions).toMatchObject({
    start: expect.any(String),
    beginProfile: expect.any(String),
    next: expect.any(String),
    openStory: expect.any(String),
    createRoute: expect.any(String),
    openSpot: expect.any(String),
  })
  expect(Object.values(copy.actions).every((label) => label.trim().length > 0)).toBe(true)
})
```

- [ ] **Step 2: Run the test and confirm it fails because `content.ts` does not exist**

Run: `pnpm vitest run src/features/netlify-parity/content.test.ts`

- [ ] **Step 3: Import, optimize, and document the exact reference assets plus compatible fieldwork photos**

Record for every asset: filename, source URL or Drive file ID, role, license/ownership note, and `2026-08-23` verification date. Use image formatting tools only for crop/format optimization; do not retouch facts or replace authentic fieldwork imagery with stock.

- [ ] **Step 4: Implement all three locale records and generic journey/spot presentation types**

Use a `Record<Locale, ReferenceCopy>` with structurally identical keys. Keep `regionId`, `foodCultureId`, route steps, and spot IDs in presentation data rather than conditional logic.

- [ ] **Step 5: Run the content test and asset integrity checks**

Run: `pnpm vitest run src/features/netlify-parity/content.test.ts`

### Task 2: Exact Food Profile conversation state machine and choreography

**Files:**
- Create: `src/features/netlify-parity/chat/foodProfileMachine.ts`
- Create: `src/features/netlify-parity/chat/useFoodProfileConversation.ts`
- Create: `src/features/netlify-parity/chat/FoodProfileConversation.tsx`
- Create: `src/features/netlify-parity/chat/foodProfileMachine.test.ts`
- Modify: `src/features/netlify-parity/reference.css`

**Interfaces:**
- Consumes: `referenceCopy(locale)`, `saveFoodProfile`, `loadFoodProfile`, and `navigate(path)`.
- Produces: `FoodProfileConversation`, `foodProfileReducer(state, event)`, `FOOD_PROFILE_QUESTIONS`, and `CHAT_DELAYS = { askName: 450, greetThenQuestion: 400, nextQuestion: 500, finishChoice: 700 }`.

- [ ] **Step 1: Write failing pure state-machine tests for the observable progression**

```ts
it('keeps history and schedules the name prompt for 450ms', () => {
  const started = foodProfileReducer(createFoodProfileState('ja'), { type: 'BEGIN' })
  expect(started.entries.map((entry) => entry.kind)).toEqual(['welcome', 'user'])
  expect(started.pending).toEqual({ event: { type: 'SHOW_NAME_PROMPT' }, delayMs: 450 })

  const prompted = foodProfileReducer(started, started.pending.event)
  expect(prompted.entries.map((entry) => entry.kind)).toEqual(['welcome', 'user', 'name-prompt'])
  expect(prompted.phase).toBe('name')
})
```

Add separate failing tests for multi-select feedback, `その他` insertion/sanitization, default-none submission, retained history, the 450ms + 400ms name sequence, each 500ms next-question delay, the final 700ms CTA delay, and persistence normalization. Empty-name focus/rejection is covered by Playwright because it is a rendered form behavior.

- [ ] **Step 2: Run the focused test and confirm the missing implementation fails**

Run: `pnpm vitest run src/features/netlify-parity/chat/foodProfileMachine.test.ts`

- [ ] **Step 3: Implement the reducer with the exact Netlify question order**

The order is allergy `(1/4)`, diet `(2/4)`, religion `(3/4)`, dislike `(4/4)`. Sending without a selection uses the question's explicit none value; submitting freezes old chips, appends a user bubble, and schedules only the next authoritative event.

- [ ] **Step 4: Implement timing, auto-scroll, focus, and motion**

Append each row to the existing log, scroll the chat container to `scrollHeight`, focus the nickname/other input after insertion, and use `animation: pop 280ms ease` from `opacity: 0; transform: translateY(8px)`. Do not add a typing indicator because the Netlify reference exposes delay without one.

- [ ] **Step 5: Integrate existing Food Profile persistence without changing its safety semantics**

Map selected values to the established version-1 structure and keep dietary/profile statements recommendation-only; do not render them as verified safety guarantees.

- [ ] **Step 6: Run the focused test until every intermediate state passes**

Run: `pnpm vitest run src/features/netlify-parity/chat/foodProfileMachine.test.ts`

### Task 3: Five-step exploration diagnosis and Result transition

**Files:**
- Create: `src/features/netlify-parity/exploration/ExplorationFlow.tsx`
- Create: `src/features/netlify-parity/exploration/explorationMachine.ts`
- Create: `src/features/netlify-parity/exploration/explorationMachine.test.ts`
- Modify: `src/features/netlify-parity/reference.css`
- Modify: `src/features/netlify-parity/ReferenceApp.tsx`

**Interfaces:**
- Consumes: `referenceCopy(locale)`, six experience illustrations, and stable `/explore/result` navigation.
- Produces: exact five-step selection flow with `ExplorationAnswers` compatible with `src/lib/exploration.ts`.

- [ ] **Step 1: Write failing behavioral tests**

Test the pure exploration transitions for disabled Next before a required selection, single-select replacement for experience/move/time, departure selection, two-item FIFO caps for taste/theme, and Back preserving answers. Playwright verifies the rendered disabled state and final `/explore/result` navigation.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `pnpm vitest run src/features/netlify-parity/exploration/explorationMachine.test.ts`

- [ ] **Step 3: Implement the exact Netlify five-step composition**

Use experience → departure → one-way travel time → trip duration → taste/theme. Match the two-column illustration cards, green/orange selection states, area modal, Back/Next order, and bottom fork/plate progress rail.

- [ ] **Step 4: Preserve the selected answers while moving backward and forward**

Only reset the wizard when entering through the Home CTA or explicit repeat-search action; browser Back uses stable URLs/history and must not corrupt selected values.

- [ ] **Step 5: Run the focused test and typecheck**

Run: `pnpm vitest run src/features/netlify-parity/exploration/explorationMachine.test.ts && pnpm typecheck`

### Task 4: Visible screen replacement and coherent Golden Path

**Files:**
- Create: `src/features/netlify-parity/components/BottomNavigation.tsx`
- Create: `src/features/netlify-parity/components/LocaleControl.tsx`
- Create: `src/features/netlify-parity/screens/SplashScreen.tsx`
- Create: `src/features/netlify-parity/screens/HomeScreen.tsx`
- Create: `src/features/netlify-parity/screens/ResultsScreen.tsx`
- Create: `src/features/netlify-parity/screens/StoryScreen.tsx`
- Create: `src/features/netlify-parity/screens/RouteScreen.tsx`
- Create: `src/features/netlify-parity/screens/SpotScreen.tsx`
- Create: `src/features/netlify-parity/screens/SupportingScreens.tsx`
- Create: `src/features/netlify-parity/screens/presentation.test.ts`
- Create: `src/features/netlify-parity/ReferenceApp.tsx`
- Create: `src/features/netlify-parity/reference.css`
- Modify: `src/app/AppRouter.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: Tasks 1–3 exports plus existing MOGU Recent/saved-route persistence functions.
- Produces: stable routes `/`, `/food-profile`, `/home`, `/explore`, `/explore/result`, `/story/:id`, `/route`, `/spot/:id`, `/discover`, `/mogu`, `/my-route`, and `/my`.

- [ ] **Step 1: Write failing presentation and persistence adapter tests**

Assert pure presentation adapters resolve Result primary card → wasabi Story, route step → Spot, stable bottom-navigation URLs, saved-route input, and MOGU Recent input. Playwright verifies the rendered Story CTA overlay/navigation and route interactions.

- [ ] **Step 2: Run the screen tests and confirm failure**

Run: `pnpm vitest run src/features/netlify-parity/screens/presentation.test.ts`

- [ ] **Step 3: Implement Splash and Home at the authoritative geometry**

Use the full-bleed welcome art/hotspot, 420px Home hero, greeting, green CTA, previous-journey cards, and fixed bottom navigation.

- [ ] **Step 4: Implement Results and Story screen-by-screen**

Results renders 96% wasabi then 91% yamame cards. Story renders the hero/back control, source-backed prose, chapter carousel, MOGUMOGU point, nearby/nature cards, sticky orange CTA, and its route-generation scrim for exactly 2200ms before navigation.

- [ ] **Step 5: Implement Route and Spot screen-by-screen**

Route renders half-day/day tabs, map, numbered timeline, transport segments, summary, save/view actions, and bottom navigation. Spot renders hero/back/bookmark, thumbnail rail, tags, practical information, guide CTA, caution, and bottom navigation.

- [ ] **Step 6: Implement MOGU, Favorites, My, locale control, and stable direct URLs**

Visible tab labels follow Netlify. The compact locale control is the only deliberate visible addition and must stay outside primary controls, have a 44px target, and immediately rerender all primary copy for `ja`, `en`, or `zh-TW`.

- [ ] **Step 7: Run focused tests, typecheck, and build**

Run: `pnpm vitest run src/features/netlify-parity && pnpm typecheck && pnpm build:bundle`

### Task 5: Playwright choreography, visual parity, and locale resilience

**Files:**
- Create: `e2e/issue-276-netlify-parity.spec.ts`
- Modify or remove: only e2e assertions that encode superseded Issue #276 visual/navigation behavior.
- Create: `docs/evidence/issue-276/*.png`

**Interfaces:**
- Consumes: production routes and controls from Tasks 2–4.
- Produces: browser-verifiable Golden Path evidence and regression coverage.

- [ ] **Step 1: Write the Playwright test before closing remaining visual gaps**

The test uses a 375×812 viewport, clears local storage, performs every Food Profile reply, asserts the prompt remains absent before each authoritative delay and visible after it, completes all five diagnosis steps, and traverses Result → Story → Route → Spot.

- [ ] **Step 2: Capture sequential chat evidence and major-screen screenshots**

Use `page.screenshot` after welcome, name response, each multi-select response, profile completion, Result, Story, Route, and Spot. Enable a trace or video for the choreography test so auto-scroll and transitions remain inspectable.

- [ ] **Step 3: Compare 375px screenshots against Netlify and Hopp exports**

Correct meaningful typography, spacing, crop, radius, shadow, navigation, sticky-action, and transition deviations visible in the comparison. Do not reinterpret the design.

- [ ] **Step 4: Exercise every locale for overflow and reachable primary actions**

For each locale set 375×812, assert `document.documentElement.scrollWidth <= 375`, every fixed header/tab bar fits, and the next primary action has a non-empty visible bounding box inside the viewport.

- [ ] **Step 5: Run focused and full browser validation**

Run: `pnpm test:e2e -- e2e/issue-276-netlify-parity.spec.ts`

### Task 6: Final validation, independent review, and PR

**Files:**
- Modify: implementation/tests only for concrete validation or reviewer findings.
- Create/update: `.superpowers/sdd/2026-08-23-issue-276-netlify-parity/progress.md` (git-ignored execution ledger).

**Interfaces:**
- Consumes: all prior tasks.
- Produces: reviewed branch and unmerged PR referencing `#276` with evidence and known gaps.

- [ ] **Step 1: Run the full relevant validation suite**

Run: `pnpm lint && pnpm typecheck && pnpm test && pnpm build:bundle && pnpm test:e2e`

- [ ] **Step 2: Re-run the 375px Golden Path manually and inspect screenshots for generic UI artifacts**

Confirm no invented gradients/glass/pills/cards, no broken sticky controls, and no stale legacy route behavior.

- [ ] **Step 3: Dispatch independent focused code review and resolve blocking findings**

Review only Issue #276 acceptance criteria, its visible references, the diff, and plausible regressions. The verdict must be blocking findings or exactly `No blocking findings.`

- [ ] **Step 4: Commit the final coherent implementation**

Use atomic English commit messages and `rtk git`.

- [ ] **Step 5: Push and open the unmerged PR**

The PR body links `#276`, embeds/links major screenshot evidence, lists validation commands and results, records Hopp bridge usage, and explicitly enumerates any remaining parity gaps. Do not merge.
