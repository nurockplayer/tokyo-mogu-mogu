# b12 browser validation

Browser pass: 2026-11-25 JST, Ego Lite, viewport 375 × 812 CSS pixels.

- MOGU contained all 18 localized journey titles in ja, en and zh-TW.
- Opened each journey's Story, half-day Route and every Spot in each locale; checked nonempty copy, no `undefined` text, and no horizontal overflow.
- Result: `54 locale/journey flows PASS at 375px; all 84 localized Spot views PASS.`
- Exercised Story's route-generation button and Route's Spot button on the Kozushima sweet-potato journey; inspected the rendered pending/no-photo treatment, source information and island-access caution.
- Closed the browser task and stopped the development server after inspection.

The initial container typecheck used a snapshot taken before corrections to the municipality ID and recipe-source types; it exited 2. Both corrections are included in commit 0e0979c. The full typecheck/lint/test/build and prescribed smoke run follow through detached job-run; final results belong in the PR.
