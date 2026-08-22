# Issue #270 — Execution plan

1. **Lock the lane and baseline**
   - Open the Draft PR, boot at 375px, and keep its checklist current.
   - Add focused failing Playwright coverage for the reproduced Result → Story → Route → Spot scroll-position regressions.

2. **Fix navigation continuity first**
   - Add the smallest shared PrototypeShell scroll/route-transition policy.
   - Preserve caller-aware back targets and prevent double-step progression.
   - Verify the complete Golden Path before visual restructuring.

3. **Polish Result → Story → Route → Spot**
   - Compact Result's first viewport and add its reveal hierarchy.
   - Add Story's contained chapter/photo rail and sticky CTA refinements.
   - Add truthful Route thumbnails and Spot gallery behavior without changing route/place data.

4. **Integrate fieldwork media**
   - Copy only matched Drive assets, optimize them without a runtime dependency, and record source metadata.
   - Add responsive loading/crop behavior and honest alt/caption copy.

5. **Tactile motion and hardening**
   - Add press/selected/settle feedback, progress continuity, reduced-motion behavior, and safe-area/overflow fixes.
   - Exercise 375px ja/en/zh-TW, refine from screenshots, and fix only regressions introduced or exposed in the Golden Path.

6. **Validate and sign off**
   - Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build:bundle`, and focused/full Playwright.
   - Save 375px evidence, update the Draft PR after each checkpoint, and mark `READY_TO_DEMO` only after the full flow passes.

