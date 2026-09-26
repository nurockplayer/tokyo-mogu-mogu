# Test portfolio

This inventory classifies the 85 Vitest files (902 cases) and all 11 retained
Playwright suites (89 cases) at base `78dde6284de254fcb1357a3d0ad8d7b9e56eae4b`.
The one deletion below leaves 84 Vitest files and 899 cases. These are
inventory-derived before/expected-after counts; the final PR validation receipt
records the measured final-head counts and runtimes. The prior measured local
times were 6.6 seconds for `pnpm test` and 33.8 seconds for the canonical smoke,
on reviewed `15131dfe`; its entire tree was verified byte-identical to this
base. Treat timing as directional, not as a runtime-improvement claim.

Product authority remains current live KiKi Figma, merged `main`, and the
current Product contract. Tests validate behavior and risk; they do not define
Product behavior. Classification uses risk and unique coverage rather than a
coverage target. Vitest remains the full non-doc CI gate. The shell classifier
and safe-merge self-tests also remain in CI outside the Vitest inventory.

## Vitest inventory

Every current Vitest file is listed below. `KEEP` means its covered behavior
protects a current contract, data/evidence integrity, reusable logic, internal
workflow, or still-plausible regression. The rationale names that risk; it is
not an assertion that every individual assertion is ideal.

| Classification | Files and audited purpose |
| --- | --- |
| KEEP | `scripts/ci/playwright-harness.test.ts` — protects free-port/preview isolation and Golden Path workflow command parsing; `scripts/ci/validation-commands.test.ts` — protects focused/related command boundaries and the complete failure-propagating local validation command. |
| KEEP | `scripts/data-acquisition/adapters/barrier-free/adapter.test.ts` — source row mapping, provenance, unknown flags, raw hours, deterministic output, and malformed-input handling; `scripts/data-acquisition/adapters/ods-cultural-property/adapter.test.ts` — multi-source config mapping, provenance, absent-vs-invented values, stable IDs, and invalid input; `scripts/data-acquisition/adapters/ome-food-business/adapter.test.ts` — business/source identity, license honesty, deterministic output, and invalid workbook handling. |
| KEEP | `scripts/data-acquisition/auth/estat.test.ts` — credential trimming/presence and pure URL construction without live requests; `scripts/data-acquisition/checksum.test.ts` — stable content identity for acquired artifacts; `scripts/data-acquisition/ckan/ckan.test.ts` — metadata identity, deterministic resource choice, and failed-response handling; `scripts/data-acquisition/csv.test.ts` — quoted/encoded source parsing and required-column failures; `scripts/data-acquisition/manifest.test.ts` — registered acquisition source metadata and adapter traceability; `scripts/data-acquisition/sync.test.ts` — idempotent acquisition, per-source failure isolation, and credential boundaries. |
| KEEP | `scripts/figma-drift/compare.test.ts`, `scripts/figma-drift/hash.test.ts`, `scripts/figma-drift/map.test.ts`, `scripts/figma-drift/run-check.test.ts`, `scripts/figma-drift/run-checkpoint.test.ts`, `scripts/figma-drift/run-gate.test.ts`, `scripts/figma-drift/state.test.ts` — protect drift-tool hashing, watchlist mapping, checkpoint state, and gate behavior. These unit tests validate the tool only; mocks and fixtures are not proof of current KiKi Figma fidelity. |
| KEEP | `scripts/generate-data-verification-ledger.test.ts` — protects the repository command that emits the verification ledger; `scripts/ingest-okutama/okutama-ingest.test.ts` — protects imported record normalization and relevance/type selection; `scripts/submission-package.test.ts` — protects submission package lifecycle behavior and its delivery boundary. |
| KEEP | `src/app/AppShell.test.ts` — protects an auxiliary AppShell authentication-control placement regression; `src/auth/identity.test.ts` — stable local identity and idempotent first/repeat login; `src/auth/session.test.ts` — identity/session continuity over reload; `src/auth/signout.test.ts` — clears auth and handles cancellation/provider failure without partial identity or tokens; `src/config/validate.test.ts` — public config validation and secret-boundary helpers. These auth suites cover retained legacy/auxiliary implementation surfaces; the current Product contract is accountless and does not make them current MVP auth behavior. They remain because the implementation/callers are present and identity/config boundaries have distinct risk. |
| KEEP | `src/data-review/evidence-assets.test.ts` — evidence asset registry integrity; `src/data-review/semantic-icons.test.ts` — semantic labels used by the review board; `src/lib/data-review-handoff.test.ts` — review handoff and confirmation progress; `src/lib/human-data-review-board.test.ts` — Board projection and source reuse metadata; `src/lib/verification-access.test.ts` — access coverage for the review queue. These cover a separate internal workflow and are not substituted for Product release tests. |
| KEEP | `src/data/demo-recommendation.test.ts` — enabled candidate/journey alignment and deterministic demo selection; `src/data/journey-presentation.test.ts` — route-backed presentation projection, missing stops, and availability/identity checks; `src/data/journey.test.ts` — selected journey identity and resolution across URL/story contexts; `src/lib/recommendation.test.ts` — explainable candidate eligibility and recommendation semantics. Together with current two-card smoke coverage, these preserve current data/domain behavior without preserving the old Top-3 presentation ordering. |
| KEEP | `src/data/fieldwork-media.test.ts` — stable fieldwork media mapping; `src/data/municipality-agriculture.test.ts` — evidence-backed regional agriculture context; `src/data/regional-evidence.test.ts` — Story regional evidence links; `src/data/seed-honesty.test.ts` — prevents demo copy from overstating source certainty; `src/data/seed-routes.test.ts` — route/Spot relationships and map pin projections; `src/data/seed.test.ts` — canonical seed identity and geography helpers; `src/data/slice-manifest.test.ts` — registered data-slice and release-boundary contract; `src/data/spot-official-link.test.ts` — source-backed Spot destinations; `src/data/wave2-slices.test.ts` — explicit selected journey slice identities. These protect data integrity and content relationships that the smoke cannot establish. |
| KEEP | `src/features/netlify-parity/chat/foodProfileMachine.test.ts` — Food Profile state transitions consumed by the current conversation; `src/features/netlify-parity/exploration/explorationMachine.test.ts` — reusable five-step exploration transitions; `src/features/netlify-parity/journey-location.test.ts` — journey location resolution used by current callers; `src/features/netlify-parity/screens/presentation.test.ts` — shared presentation adapters with current consumers. Their directory name is historical, but their logic has live consumers, so the path alone is not deletion evidence. |
| KEEP | `src/features/netlify-parity/content.test.ts` — content adapter invariants consumed by current journey surfaces; this test area includes presentation data that overlaps some page rendering, but still protects content mapping/caveats at a lower layer. Static copy assertions are not treated as live-Figma or Product authority. |
| KEEP | `src/i18n.test.ts` — locale fallback, localized data access, and formatting; `src/i18n/data-content.test.ts` — required Story content availability; `src/i18n/persistence.test.ts` — locale persistence. The canonical browser smoke is Japanese, so unit coverage retains language/runtime contracts beyond that browser path. |
| KEEP | `src/lib/badges.test.ts` — badge state persistence; `src/lib/checkin.test.ts` — check-in and demo location override parsing; `src/lib/current-product-factual-inventory.test.ts` — current Product factual inventory; `src/lib/exploration.test.ts` — exploration defaults, answer validation, and matched-tag derivation; `src/lib/food-profile.test.ts` — profile defaults, dietary state, shape, and persistence; `src/lib/gtfs.test.ts` — transit stop/departure selection; `src/lib/map-links.test.ts` — directions links and approximate-coordinate disclosures; `src/lib/mogu-recent.test.ts` — legacy MOGU Recent storage identity, deduplication, and dietary-context snapshot; `src/lib/nickname.test.ts` — local nickname continuity; `src/lib/progression.test.ts` — progression and transit-aware next discovery; `src/lib/saved-routes.test.ts` — locally saved route persistence. The MOGU Recent helper has separate legacy/auxiliary callers and does not define the current ReferenceApp MOGU surface. |
| KEEP | `src/lib/data-verification-evidence.test.ts` — source manifest shape and provenance references; `src/lib/data-verification-ledger.test.ts` — claim identity, status, and generated repository ledger; `src/lib/verification.test.ts` — verification/freshness/conflict semantics and machine-readable needs-confirmation records. These protect data honesty where invalid behavior can mislead users or reviewers. |
| KEEP | `src/lib/stakeholder-review-packet.test.ts` — source-bound stakeholder review packet; `src/lib/submission-rights.test.ts` — media/submission rights checks. Both have distinct provenance or rights risks beyond visual/runtime coverage. |
| KEEP | `src/pages/DiscoverPage.test.ts` — auxiliary Discover selection and its release boundary; `src/pages/MoguPage.test.ts` — legacy MoguPage Recent helper behavior; `src/pages/MyPage.test.ts` — legacy My profile CTA and summary states; `src/pages/MyRoutePage.test.ts` — legacy saved-route page helpers; `src/components/saved-routes.test.ts` — saved-route component behavior; `src/components/support-actions.test.ts` — support actions and user-facing truthfulness boundary. These legacy/auxiliary implementations remain in the tree but do not define the current ReferenceApp Discover, MOGU, My, or Favorites surfaces. They retain distinct helper/state-projection coverage; page/component overlap alone does not show duplicate risk. |
| KEEP | `src/pages/route-spot.test.ts` — current Route/Spot back-targets, identity, actions, truthfulness, estimates, and verification badges; `src/pages/story-reading.test.ts` — reading duration and story/route/back navigation contracts. The browser smoke validates a demo journey, while these checks preserve alternate navigation and domain edge cases. |
| KEEP | `src/pages/s0s3/ExplorationWizardPage.test.ts` — finder interaction mode and departure overlay state; `src/pages/s0s3/FoodProfilePage.test.ts` — route-mode transitions and summary freshness; `src/pages/s0s3/exploration-session.test.ts` — exploration session persistence; `src/pages/s0s3/phase1-exploration.test.ts` — multi-region inputs, departure/travel allow-list, and deterministic outcomes; `src/pages/s0s3/phase1-parity.test.ts` — interview answer constraints, summary safety, and profile conversion; `src/pages/s0s3/tutorial-session.test.ts` — guided tutorial state. These are not duplicates of the current browser path because they cover alternate inputs and state transitions. |
| KEEP | `src/store/persistence.test.ts` — generic local collection persistence and serialization boundary; `src/ui/ui.test.ts` — shared control/tap-target contract and reusable UI surface. Token/class assertions here are implementation-sensitive, but the shared component contract has broad current consumers and the interactive target check protects usability; neither test is treated as visual authority. |
| DELETE | `src/pages/s0s3/result-ranking.test.ts` (3 cases) — removed because all three assertions require the superseded ranked Top-3 Result helper: (1) selected plus next two ranked candidates; (2) a historical MOGU candidate promoted ahead of the decision; (3) preferred-candidate deduplication and short-list padding behavior. `docs/specs/product/hackathon-product-contract.md` defines two presentation fixtures and no ranked Top-3 Product contract. `src/app/AppRouter.tsx` returns `ReferenceApp` for valid/default `/explore/result` states and `NotFoundPage` for invalid identity before entering the legacy route table, so the old `ResultPage` route is bypassed for every Result state. Current `src/features/netlify-parity/content.test.ts` pins the two fixture IDs, `e2e/current-mvp-smoke.spec.ts` checks the two cards within the full journey, and `src/lib/recommendation.test.ts` plus journey identity/history/persistence coverage retain domain eligibility and identity risks. The obsolete Top-3 ordering assertion is intentionally not preserved. No production helper or runtime code is removed. |

The result-ranking helper still has a legacy page consumer; only its tests are
removed here. Legacy page, static-copy, class/token, and other auxiliary-route
tests remain KEEP where current callers or shared behavior make unique coverage
plausible. In particular, `src/components/saved-routes.test.ts` and
`src/lib/saved-routes.test.ts` cover different component and persistence
implementations/callers; their similar names do not establish duplication.

## Playwright suites and execution

All 11 retained browser suites and their owner, purpose, and status are listed
in [the browser validation inventory](../../e2e/README.md). The current counts
are 17 canonical Product smoke cases, 16 internal Board cases, and 56 focused
non-gating regression cases across nine suites. No browser suite is removed or
reclassified by this change. `pnpm test:regressions` is a local alias to the
existing regression config; `pnpm test:related` and `pnpm test:focused` are
also local conveniences and never replace full `pnpm test` in CI or as a
merge-confidence claim.

### #374 Route-spacing assertions

The three #374 cases remain focused, non-gating checks at **375px in ja, en,
and zh-TW**. Four obsolete exact-copy/count assertions per locale were removed:
the asserted one-minute visitor-center text, five-minute following-stop text,
global uniqueness of the visitor-center text, and exactly five route segments.
They are replaced by four structural checks per locale: the visitor-center
step has exactly one direct `.seg` and nonempty text, and the following-kitchen
step has exactly one direct `.seg` and nonempty text. The Wasabi step still has
zero direct `.seg` elements.

The cases retain the locale-specific mission badge, at-least-16px card gap,
mission badge placement after the preceding card, following-segment placement
after the Wasabi card, following-card placement after its segment, and exact
375px document/phone overflow checks. The observed current route has four
guidance segments; the test does not assert a route-wide segment total. Existing
source/content honesty checks remain unchanged, and no source duration or new
exact factual copy is introduced. Case counts remain 3 for #374 and 56 across
all nine focused suites (89 browser cases total); the 84-file/899-case Vitest
inventory is unchanged.

Build once before running direct browser commands because they reuse the
production bundle:

```sh
pnpm build
pnpm exec playwright test e2e/current-mvp-smoke.spec.ts
pnpm test:regressions
pnpm test:data-review
```

`pnpm test:e2e` builds and runs the canonical smoke through the root Playwright
config. CI continues to run the full Vitest suite and its classifier/safe-merge
shell self-tests, and runs the canonical smoke for `core` changes. No coverage percentage, test-count
target, or CI runtime shortcut is introduced.
