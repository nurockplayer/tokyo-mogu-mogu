# TOKYO MOGU MOGU — Blind Figma Reconciliation

Audit date: 2026-08-22 (Asia/Tokyo)

Mode: audit only; no runtime, test, baseline, GitHub, PR, or deployment mutation

Repository: `nurockplayer/tokyo-mogu-mogu`

## Verified repository and evidence boundary

- `origin/main` was fetched with `rtk git fetch origin main --prune` and verified at
  2026-08-22T19:39:14+09:00.
- Verified `origin/main` and audit `HEAD`:
  `2a1b9d37cba58cd64b29ad577c110cbe9a060de1`.
- Commit subject: `Fix #268: separate Food Profile from repeatable trip diagnosis (#269)`.
- The worktree was clean before this audit. This report is the only intended
  repository change.
- The requested blind baseline is not present in that fetched commit or in the
  repository's reachable Git history. The immutable supplied artifact was read
  completely from the sibling checkout at
  `docs/design/figma-blind-flow-baseline-2026-08-22.md` and was not copied or
  edited. Its SHA-256 is
  `5cbc2318178bb14be47a060c667476c9a94eccc96fb23afc958a6aa11c296432`.
- Baseline Figma evidence: file key `fHqhA3d26OdXqm0cQxfK31`, live-file update
  timestamp `2026-08-15T18:11:17.262Z`, one page, 45 top-level layers, and 43
  presentation frames. The baseline explicitly says the stepper is an inventory,
  not a wired prototype flow; all transitions below are therefore compared as
  visible/candidate interaction intent, not confirmed Figma reactions.
- Older repository Figma audits, maps, watcher state, and screenshots were used
  only as historical implementation evidence. They were not used to override the
  blind baseline.

## Authority used in this reconciliation

1. The blind baseline owns visible Figma UX, hierarchy, copy, states, and node
   evidence.
2. Current accepted GitHub decisions own Product and Engineering semantics.
3. Current code at the verified SHA owns what ships.
4. Current tests own what is protected today; a passing test is not parity proof.

The current decision spine is:

| Decision | Current authority | Consequence for this audit |
|---|---|---|
| Product scope and audience | [#112](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/112), `docs/specs/product/product-scope-invariant.md:7-58` | Product remains Tokyo-wide, multi-region × multi-food-culture for Japanese and international travelers. Okutama × Wasabi is the demo path only. |
| Durable IA and persistence | [#92](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/92), `docs/specs/product/hackathon-product-contract.md:112-138,191-197` | `Home / Discover / MOGU / My`; MOGU Recent, Saved Routes, and Food Profile remain distinct. |
| Visible proposal authority | [#201](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/201) and its [2026-08-22 clarification](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/201#issuecomment-5378988607); [#270](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/270) | Latest Figma owns presentation except where a newer explicit Product decision overrides it. #270 owns final parity sign-off. |
| Food Profile lifecycle | [#268](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/268), merged [PR #269](https://github.com/nurockplayer/tokyo-mogu-mogu/pull/269) | Dietary conversation is persistent setup/edit; `食旅を見つけ` is a separate repeatable per-trip function. |
| Result | [#255](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/255), merged [PR #260](https://github.com/nurockplayer/tokyo-mogu-mogu/pull/260) | Real deterministic score-free Top 3 supersedes the Figma 96%/91% two-card fixture. |
| Guided first run | [#257](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/257), merged [PR #259](https://github.com/nurockplayer/tokyo-mogu-mogu/pull/259) | Exactly one legitimate highlighted action per first-run beat; normal/repeat use restores the full option set. |
| Repeat-finder interaction history | Closed [#230](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/230), merged [PR #231](https://github.com/nurockplayer/tokyo-mogu-mogu/pull/231) and [PR #232](https://github.com/nurockplayer/tokyo-mogu-mogu/pull/232); later [PR #266](https://github.com/nurockplayer/tokyo-mogu-mogu/pull/266) and #268/PR #269 | Tap-to-advance with no page-level Next was an explicit accepted deviation under the older continuous-chat model. The later design contract restores the visible Next/Back stack, and #268 explicitly rejects carrying the dietary-chat presentation into the repeatable finder. #257 preserves tap-to-advance only for the constrained guided path. |
| Story → Route | [#242 decision](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/242#issuecomment-5345695279) | Route is source-backed and pre-authored. Navigate directly; no fake generation delay, optimizer, async job, or new persistence. |
| Story regional evidence | [#264](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/264), merged [PR #265](https://github.com/nurockplayer/tokyo-mogu-mogu/pull/265) | Source-backed, scoring-neutral Story evidence must remain. |
| Prototype departure controls | [#206](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/206) | Visible Figma structure may be implemented as a prototype affordance; no provider, geocoder, canonical station identity, realtime travel time, or new scoring is authorized. |
| 390px → 375px | [#208](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/208), `docs/specs/product/approved-ui-fidelity.md:107-128` | Preserve design intent by fluid 375px reflow, multilingual growth, semantics, focus, ≥44px targets, and bounded accessibility corrections. |

## Figma versus current IA and flow

| Area | Blind Figma evidence | Current shipping behavior | Reconciliation |
|---|---|---|---|
| First entry | `1:95` → Food Profile family `2:245`–`3:1702` → fork `3:1835` | `/` → `/food-profile`; the four dietary turns persist a Food Profile; fork routes recommend to `/explore` and browse to `/discover` (`src/pages/s0s3/FoodProfilePage.tsx:470-494,739-744`) | Lifecycle and visible fork align. Fork destinations are `UNSPECIFIED_BY_FIGMA`; #92/#268 supply the current destinations. |
| Returning entry | Home/re-entry `3:1952`, `Let's Go!`, journey cards, `すべて見る` | A saved profile makes `/` render Returning Home; `Let's Go!` starts a fresh `/explore`; cards read MOGU Recent (`src/pages/s0s3/LandingPage.tsx:28-36,84-117`; `src/pages/s0s3/history-section.tsx:34-89`) | Main re-entry flow aligns. “Past journeys” is presentation over Recent, not a new visited-history store. |
| Repeat finder | `4:2101 → 8:2436 → 23:3131 → 23:3207 → 23:3262 → 23:3380` | The same five-stage order and full option sets ship in `/explore` (`src/pages/s0s3/ExplorationWizardPage.tsx:78-131,411-567`) | Order aligns; normal/repeat interaction controls do not. See P1-01/P1-05. |
| Departure sub-flow | Base `8:2436`; empty overlay `8:2608`; query/results/keyboard `8:2903` | Two chips and an inline no-op text field; no overlay, close state, or populated results (`src/pages/s0s3/ExplorationWizardPage.tsx:435-465`) | Material state coverage is missing. See P1-02. |
| Result | `23:3380`: two cards, 96%/91%, only first detail represented | Real ranked Top 3 from five enabled candidates; scores are ordering-only; every card has a Story (`src/pages/s0s3/ResultPage.tsx:96-143,177-239,243-345`) | Figma is stale relative to #255. Do not restore its fixture semantics. |
| Story | `52:3995`: long story, five content modules, food/shop and nature/experience groups | Long hero + five numbered sections + source-backed evidence + one combined nearby list + distributed support/provenance (`src/pages/StoryPage.tsx:190-390`) | Core reading hierarchy aligns; the two nearby groups are collapsed. See P2-01. |
| Story → Route | CTA `23:3620` → loading `119:254` → route `119:681` | CTA resolves the current pre-authored Route directly; no authored loading state (`src/pages/StoryPage.tsx:380-390,471-478`) | Explicit #242 Product override. See P2-04. |
| Route and save | `119:681`: long route, toggle/map/timeline/stops; save → two-action saved bar `122:889` with `マイルートを見る` | Source-backed route toggle/map/timeline and save persistence ship; saved state is one pressed button + toast, with no adjacent My link (`src/pages/RoutePage.tsx:144-340`) | Route structure broadly aligns; save-to-My closure is incomplete. See P1-03. |
| Spot | `125:1752`: gallery, tags, practical info, guide/reservation, bookmark | Source-honest placeholder hero, sourced details/provenance, external/disabled actions, maps, route save, disclaimer (`src/pages/SpotPage.tsx:338-535`) | Route → Spot hierarchy aligns. Gallery/media and some Figma facts are not reusable without provenance. See P2-06/P2-07. |
| Bottom navigation | Result/Story/Spot show `食旅を見つけ / モグモグる / お気に入り / マイ`; board `23:3623` proposes browse and generic favorite domains | Result/Story/Route/Spot/returning Home show `ホーム / さがす / MOGU / マイ` to `/`, `/discover`, `/mogu`, `/my` (`src/app/PrototypeShell.tsx:30-56`; `src/app/PrimaryNav.tsx:4-25`) | Intentional #92/#203/#204 Product override. See P1-09. |
| My | Figma references My/profile and saved/favorite concepts but draws no My screen | `/my` contains Saved Routes, Food Profile, and Stretch Badges (`src/pages/MyPage.tsx:51-149`) | My composition is `UNSPECIFIED_BY_FIGMA`; #92 supplies it. One Food Profile state is wrong. See P1-04. |
| Long-screen behavior | `23:3262`, `23:3380`, `52:3995`, `119:681`, `125:1752` exceed the device viewport; scrolling is implied | Content-driven document height and normal scroll; 375×812 browser gates cover overflow on core long screens | `INTENTIONALLY_DIFFERENT` 390→375 adaptation under #208; captured Figma heights must not become fixed CSS heights. |

## Prioritized findings

Severity means: P0 = blocks the core demo/contract now; P1 = high-impact parity or
semantic regression; P2 = material localized defect or follow-up; P3 = evidence,
documentation, or hardening issue. No P0 finding was established.

### P1

#### P1-01 — `FLOW_MISMATCH`: normal/repeat finder skips Figma's selected state and Next/Back controls

- Figma: each finder state `4:2101`, `8:2436`, `23:3131`, `23:3207`, and
  `23:3262` presents a selection followed by `次へ`; steps 2–5 also present
  `戻る`. The extracted current visual contract independently records the
  centered vertical Next-then-Back stack at
  `docs/design/figma-design-system.md:245-255,369-382`.
- Runtime: experience, departure, travel, and duration call `advance` as soon as
  a card/chip is tapped
  (`src/pages/s0s3/ExplorationWizardPage.tsx:279-294,411-508`). Only the header
  back control exists (`:576-600`); the only local confirmation is on Taste +
  Theme (`:547-565`).
- Decision history: #230 and merged PRs #231/#232 explicitly introduced
  tap-to-advance and documented no page-level Next as an intentional Figma
  deviation under a continuous LINE/ChatGPT-style Exploration model. That was
  valid authority then; this is not accidental drift.
- Supersession: merged PR #266 later canonicalized the live Figma vertical
  Next/Back stack. More importantly, #268 says the repeatable diagnosis must
  follow live Figma instead of inheriting the dietary-chat presentation, and its
  [owner clarification](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/268#issuecomment-5379004784)
  makes that later authority over older continuous-conversation assumptions. PR
  #269 repaired lifecycle/state while recording live visual parity as follow-up
  because Figma reads were quota-blocked. The supplied blind baseline now
  resolves that missing visual evidence.
- Current decision check: #257 still justifies one-tap progression in the
  constrained guided first run and restores the full option set afterward. It
  does not preserve #230's no-Next contract for normal/repeat use.
- Required parity: branch by tutorial state. Preserve #257 one-action progression
  for first run; in free/repeat mode retain the selected state, render the Figma
  Next/Back stack, and advance only on Next.

#### P1-02 — `IMPLEMENTATION_MISSING`: departure overlay states `8:2608` and `8:2903`

- Figma: `8:2436` opens an empty overlay `8:2608` with close/input; typing
  `東京駅` produces `8:2903`, with one meaningful result, placeholder-like rows,
  and a software keyboard. A selected-result frame is not drawn.
- Runtime: the base step renders an inline controlled text input, but the value is
  not queried, resolved, or used and there is no dialog/close/result state
  (`src/pages/s0s3/ExplorationWizardPage.tsx:435-465`).
- Decision check: #206 defers real provider/schema/scoring semantics, but its
  current body says the visible prototype should follow Figma and explicitly
  allows presentation-only controls. It is not authority to omit the visible
  states.
- Required parity: add local, keyboard-accessible empty and populated overlay
  presentation. Do not add a geocoder, GPS, live station provider, travel-time
  calculation, durable station identity, or ranking effect. Do not present the
  repeated Figma placeholder rows as verified locations.

#### P1-03 — `NAVIGATION_MISMATCH`: saved Route does not expose the Figma My Route handoff

- Figma: Route `119:681` saves into `122:889`, whose saved bar contains
  `保存済み` and `マイルートを見る`.
- Runtime: save changes one button to `旅程を保存済み ✓` and shows a toast; no
  post-save link is rendered (`src/pages/RoutePage.tsx:329-348`). My already renders the
  persisted route and can reopen it (`src/pages/MyPage.tsx:56-116`).
- Decision check: Figma leaves the destination unresolved, but #92 resolves it:
  “My Route” is `My → Saved Routes`, i.e. `/my`, not the legacy `/my-route`.
- Required parity: make the saved state a two-action bar using current Product
  language and link the second action to `/my`. Keep the existing
  `tmm:savedRoutes` contract. Do not revive a primary My Route tab.

#### P1-04 — `STATE_MISMATCH`: My reports an existing guided Food Profile as absent

- Current three-state contract distinguishes `restrictions-recorded`,
  `no-restrictions`, and `not-evaluated`
  (`src/lib/food-profile.ts:42-56`). Guided first use intentionally persists empty
  restrictions with `hasNoRestrictions: false`; current E2E locks that truth
  (`e2e/guided-tutorial.test.ts:79-89,111-118`).
- Food Profile and Result render that as `fpNotEvaluated`
  (`src/pages/s0s3/FoodProfilePage.tsx:810-817`;
  `src/pages/s0s3/ResultPage.tsx:151-155,314-324`).
- My instead falls through to `まだフードプロフィールがありません` when the
  same valid profile has empty fields (`src/pages/MyPage.tsx:154-172`). This contradicts
  the Figma completion state `3:1702`, the My edit promise in `2:623`, and #268's
  persistent-profile contract.
- Required fix: reuse `foodProfileDietaryState` in My and render the localized
  not-evaluated state. Add a state-level test; `src/pages/MyPage.test.ts:1-28` currently
  checks only the edit link's source text.

#### P1-05 — `TEST_PROTECTS_STALE_BEHAVIOR`: E2E forbids the normal Figma Next/Back interaction

- `e2e/exploration-sequential.test.ts:1-9` declares that page-level `次へ` is
  never normal progression.
- Its free-exploration cases assert tap-to-advance (`:96-166`) and explicitly
  require `次へ` count zero throughout (`:168-198`). Golden-path and departure
  tests also encode tap-to-advance (`e2e/golden-path.test.ts:125-136`;
  `e2e/phase1-contracts.test.ts:245-283`).
- These assertions correctly protected #230/PR #231/PR #232 when introduced.
  They became stale for normal/repeat use when #268 explicitly rejected the
  continuous dietary-chat presentation and returned the repeat finder to live
  Figma; PR #269 left fresh visual parity as follow-up only because Figma access
  was blocked. They remain valid for the #257 guided exception.
- Required fix: replace the global “no Next” assertion with two contracts:
  guided one-action progression remains; free/repeat mode selects, exposes
  Next/Back, and preserves answers when moving backward.

#### P1-06 — `DOCUMENTATION_STALE`: historical maps claim full coverage for current mismatches

- `docs/design/figma-implementation-map.md:8-15` is based on main
  `68ba4d4b...`, not the audited SHA. It marks all five finder nodes `MATCH`, both
  search overlays `INTENTIONALLY_DIFFERENT`, Story groups `MATCH`, saved Route
  state `MATCH`, and concludes `FULL_COVERAGE` (`:49-72,105-119`).
- `docs/design/figma-coverage-audit-2026-08-20.md:18-32,101-116` says zero missing
  states and `FULL_COVERAGE` on the same older implementation.
- `scripts/figma-drift/map.ts:208-257,301-359,405-447` carries those historical
  classifications forward. `map.test.ts` proves map/state/Markdown
  self-consistency; it does not compare Figma or runtime.
- #270 explicitly prohibits using these stale maps as current parity proof.
- Required documentation action: preserve them as history, add a prominent
  superseded/current-SHA notice linking to this reconciliation, and update the
  machine map only after the corresponding parity PRs merge. Do not rewrite the
  blind baseline.

#### P1-07 — `DOCUMENTATION_STALE`: canonical Result candidate counts disagree with runtime

- Runtime exposes five enabled, playable, recommendation-eligible journeys
  (`src/data/slice-manifest.ts:83-133`), and Result says it ranks over that set
  (`src/pages/s0s3/ResultPage.tsx:96-143`).
- `docs/specs/product/hackathon-product-contract.md:167-171` and
  `docs/specs/product/recommendation-contract.md:14-30` still say three current
  candidates, while the latter correctly says five at `:135-144`.
- This is not a Figma parity defect, but it makes the current Product/Result
  reconciliation internally contradictory.
- Required documentation action: choose one current runtime-derived count and
  reconcile all normative occurrences without changing the Tokyo-wide scope or
  the Top 3 presentation rule.

#### P1-08 — `FIGMA_STALE_RELATIVE_TO_ACCEPTED_DECISION`: 96%/91%, two-card Result, and Yamame fixture

- Figma `23:3380` visibly contains two cards, `96%`/`91%`, and a second Yamame
  fixture with no designed detail.
- #255 explicitly supersedes that state with a real deterministic, score-free
  Top 3; internal additive scores are not probability, confidence, safety, or a
  user-visible match percentage. Runtime and tests implement that contract
  (`src/pages/s0s3/ResultPage.tsx:1-15,194-239`;
  `src/pages/s0s3/result-ranking.test.ts:33-61`;
  `e2e/golden-path.test.ts:139-160`).
- Required action: none against runtime. Figma may retain the frame as historical
  visual-language evidence, but parity work must not restore its data semantics.

#### P1-09 — `INTENTIONALLY_DIFFERENT`: Figma bottom navigation is not the accepted Product IA

- Figma Result/Story/Spot show
  `食旅を見つけ / モグモグる / お気に入り / マイ`; board `23:3623`
  describes content exploration under `モグモグる` and generic saved content
  under `お気に入り`.
- Current #92 and merged #252/#253 lock `Home / Discover / MOGU / My`, with
  Discover owning free browse, MOGU owning automatic Recent, and My owning
  explicit Saved Routes + Food Profile. Runtime implements exactly those routes
  (`src/app/PrimaryNav.tsx:4-25`;
  `docs/specs/product/hackathon-product-contract.md:112-138`).
- [#203](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/203) and
  [#204](https://github.com/nurockplayer/tokyo-mogu-mogu/issues/204) remain open
  for future durable labels/ownership. They do not authorize a parity rename now.
- Required action: keep current labels, destinations, and persistence boundaries.
  Geometry may converge to Figma. Do not create generic Favorites, rebind MOGU,
  or merge Recent with Saved Routes.

### P2

#### P2-01 — `SCREEN_HIERARCHY_MISMATCH`: Story collapses two Figma discovery groups into one text list

- Figma `52:3995` is supplemented by separate food/shop and nature/experience
  groups: `62:4615`, `62:4830` (`周辺観光スポット`) and `62:4616`,
  `62:4983` (`自然と散策`), with media-card treatment.
- Runtime renders one `周辺観光スポット` list of name-only links
  (`src/pages/StoryPage.tsx:350-370`). The five numbered story sections themselves are
  present (`:235-335`).
- No current Product decision explicitly collapses the two visual groups. #224
  requires source-backed places, which governs content truth, not removal of the
  hierarchy.
- Required parity: restore two labeled, horizontally contained card groups using
  only source-backed, correctly categorized current places. Do not copy Figma
  place names or imagery whose provenance is not available.

#### P2-02 — `COPY_MISMATCH`: Food Profile summary thanks/registers the user twice

- Figma `3:1702` contains one completion sentence followed by
  `あなたのFood Profile：` and the summary.
- Runtime renders `fpIvSummaryTitle` and then a second
  `fpSummaryConfirm{Name}` sentence before the summary
  (`src/pages/s0s3/FoodProfilePage.tsx:1357-1380`; Japanese strings at
  `src/i18n/resources.ts:409,423-425`). The fresh 375px evidence
  `docs/evidence/issue-268/04-food-profile-summary-ja-375.png` visibly shows both.
- Required fix: retain one localized completion statement, nickname treatment if
  desired, then the summary/trust/edit copy. Keep the persisted answers and #257
  not-evaluated semantics unchanged.

#### P2-03 — `COPY_MISMATCH`: Result retry still says `今回の探索をもう一度`

- Figma `23:3380` says `もう一度食旅を見つけよう`, reinforcing the repeatable
  product-function name.
- Runtime uses `今回の探索をもう一度` in all locales
  (`src/i18n/resources.ts:536,1360,2188`), although the finder header already uses
  `食旅を見つけ` (`src/pages/s0s3/ExplorationWizardPage.tsx:589`).
- #268 explicitly places repeat diagnosis under `食旅を見つけ`; no accepted
  decision preserves “探索” as the visible function name.
- Required fix: align the retry CTA across ja/en/zh-TW and update the accessible-
  name assertions in `e2e/issue-268-lifecycle.test.ts:78-105` and
  `e2e/issue-268-evidence.test.ts`. Preserve its current behavior of clearing
  only per-trip answers.

#### P2-04 — `INTENTIONALLY_DIFFERENT`: no fake Story loading or Route generation/regeneration

- Figma depicts CTA `23:3620`, blocking loading overlay `119:254`, a “generated”
  route `119:681`, and `ルートを再生成する`.
- #242's current Product decision says the route is existing, source-backed, and
  pre-authored; navigation is direct and no artificial delay, async job,
  optimizer, error/cancel lifecycle, generation service, or new persistence is
  authorized.
- Runtime correctly links Story directly to Route and omits regenerate semantics.
- Required action: none. Visual polish may communicate the handoff only when it
  does not delay or misrepresent route generation.

#### P2-05 — `INTENTIONALLY_DIFFERENT`: Route facts and stop count follow source-backed runtime data

- Figma `119:681` shows a fixture route of about 2.5 hours, 6 km, and six spots.
- Runtime's resolved Okutama route currently renders its own pre-authored
  variants, transport, times, map pins, and source-honest operational notes
  (`src/pages/RoutePage.tsx:98-295`).
- #242 explicitly selects the existing source-backed route; #10 and Product data
  rules forbid filling missing facts with design fixtures.
- Required action: preserve current route identities/facts unless a separately
  verified content update changes them. Reuse Figma hierarchy and visual rhythm,
  not unsupported times, distances, or stops.

#### P2-06 — `UNVERIFIABLE`: Spot gallery/photo parity lacks reusable asset provenance

- Figma `125:1752` contains a photo hero/gallery. Runtime has no venue photo
  asset and uses `PlaceVisual` (`src/components/PlaceVisual.tsx:1-7,33-58`). The current tourism
  office source is `All Rights Reserved（参考情報としてのみ利用）`
  (`src/data/seed-places.ts:109-128`).
- #10 closed additional pre-demo fieldwork and requires unknown/permission gaps
  to remain unknown. The design contract also states that Figma presence alone
  is not reuse authorization (`docs/design/figma-design-system.md:347-367`).
- Required action: keep the honest placeholder until Design/Data supplies an
  approved file, source, license/permission, alt text, and crop. This does not
  block other Spot hierarchy work.

#### P2-07 — `INTENTIONALLY_DIFFERENT`: Spot actions/bookmark do not create unsupported facts or a Saved Spot domain

- Figma `125:1752` shows guide/reservation copy and a bookmark, but its URL,
  verification, persistence owner, and return destination are unresolved.
- Current Spot renders source-backed actions where available, disables
  unverified reservation actions, saves the containing Route rather than the
  Spot, and exposes provenance and the dietary disclaimer
  (`src/pages/SpotPage.tsx:118-186,319-336,338-535`).
- #92/#204 do not authorize Saved Story/Spot or generic Favorites; #10 forbids
  invented booking/practical facts.
- Required action: keep this boundary. A verified venue-specific action may be
  added through the existing source workflow, not by copying Figma copy alone.

#### P2-08 — `INTENTIONALLY_DIFFERENT`: first-run selection behavior and sample answers

- Figma shows ordinary selectable controls and sample dietary/result content.
- #257 requires one enabled highlighted target per guided beat, then full option
  availability after completion. PR #269 further prevents tutorial-forced
  “none” choices from becoming a durable no-restrictions claim.
- Required action: keep the guided overlay and honest `not-evaluated` state.
  Only the normal/repeat finder receives the P1-01 Next/Back correction.

#### P2-09 — `INTENTIONALLY_DIFFERENT`: Home history is MOGU Recent, not proof of completed travel

- Figma `3:1952` labels the section `私の食旅 (過去の旅)` but does not define
  persistence or wire cards/`すべて見る`.
- #92 and #226 explicitly use system-managed MOGU Recent for the prototype cards;
  runtime reads at most three entries and leaves `すべて見る` presentational
  (`src/pages/s0s3/history-section.tsx:1-8,32-89`).
- Required action: do not invent actual visit history or merge it with Saved
  Routes for parity. The final `すべて見る` destination remains a #204 decision.

#### P2-10 — `DOCUMENTATION_STALE`: current demo guidance names and describes the old visible flow

- `docs/demo-script.md:42-47,67-75,79-83` calls the repeatable function
  `食旅診断`, says the departure is not an address search without distinguishing
  the missing presentation overlay, and says the prototype nav appears only on
  returning Home/Route even though runtime shows it on Result/Story/Route/Spot
  and the baseline shows it on Result/Story/Spot.
- `docs/hackathon/judging-axis-evidence.md:35,67-70` still describes only two
  ready candidates.
- Required documentation action: after the runtime parity PRs, use
  `食旅を見つけ`, describe departure as presentation-only/no provider, state the
  actual nav visibility, and reconcile the five-candidate/Top-3 wording.

### P3

#### P3-01 — `DOCUMENTATION_STALE`: inline comments still describe discarded Food Profile behavior

- `src/pages/s0s3/FoodProfilePage.tsx:410-416` says first use collects no dietary conditions,
  while `handleSave` now persists interview answers at `:470-494`.
- `src/i18n/resources.ts:374-376,1196-1198,2027-2029` says those answers are fixture-only
  and never persisted, also superseded by #268/#269.
- Runtime behavior is correct; update comments with the next Food Profile change
  so future work does not reintroduce the old lifecycle.

#### P3-02 — `UNVERIFIABLE`: the automated Figma watcher has no acknowledged checkpoint

- `docs/design/figma-sync-state.json:1-46` has `checkpoint: null` and every node
  hash is `null`.
- `pnpm figma:check` can validate file/map mechanics but cannot prove present
  visual parity from this state.
- Do not create a checkpoint merely to clear the finding. Establish it only after
  the P1/P2 parity work and human Design sign-off.

#### P3-03 — `UNSPECIFIED_BY_FIGMA`: fork destinations, selected departure, collection empties, and failure states

- The blind baseline leaves the two `3:1835` destinations, the selected search
  result state, many Back destinations, empty/failure states, and collection
  ownership unwired or absent.
- Current `/explore` and `/discover` fork targets follow #92/#268. Runtime
  not-found, empty, error-boundary, focus, and safe missing-data behavior fill
  other gaps.
- Do not remove safe runtime states because Figma does not draw them, and do not
  infer new persistence/provider semantics from the omitted states.

#### P3-04 — `INTENTIONALLY_DIFFERENT`: 375px, i18n/a11y, locale, and demo-operability adaptations

- Figma frames are 390px; runtime tokens explicitly record a 390px reference and
  375px production baseline (`src/ui/tokens.css:106-114`). Playwright runs at 375×812
  (`playwright.config.ts:22-34`) and checks multi-locale overflow/focus/touch
  constraints (`e2e/presentation-overflow.test.ts:43-145`).
- Figma modals omit cancel/focus states; runtime adds Escape/backdrop cancel and
  focus mechanics under #208. Figma omits locale/reset controls; current specs and
  the 8/23 runbook require locale switching and deterministic demo reset.
- Required action: retain fluid reflow, content-driven heights, ja/en/zh-TW,
  semantic focus, ≥44px targets, safe-area handling, locale switch, and demo
  reset. Do not transform-scale the 390px artboard or reproduce the iOS status
  bar.

## Stale documents and tests: disposition

| Artifact | Status | Required disposition |
|---|---|---|
| `docs/design/figma-implementation-map.md` | Historical at `68ba4d4...`; current `MATCH/FULL_COVERAGE` claims are stale | Preserve history, add supersession notice, then update current statuses after parity PRs. |
| `docs/design/figma-coverage-audit-2026-08-20.md` | Historical, not proof at current main | Add an explicit historical/superseded banner; do not rewrite its old result as if it were current. |
| `scripts/figma-drift/map.ts` + `scripts/figma-drift/map.test.ts` | Self-consistent but semantically stale for finder/search/Story/save | Update after implementation; add assertions for real status meaning rather than only node counts/mirror presence. |
| `docs/design/figma-sync-state.json` | No checkpoint/hashes; parity unverifiable | Leave unacknowledged until human sign-off; never checkpoint around unresolved deltas. |
| `e2e/exploration-sequential.test.ts` | Correctly protected #230, but that global normal-flow contract is superseded; the guided subset remains current | Split guided and normal/repeat expectations in the first finder parity PR. |
| `e2e/issue-268-lifecycle.test.ts`, `e2e/issue-268-evidence.test.ts` | Correct lifecycle, stale retry accessible name | Update only the localized retry label; preserve the session-reset assertion. |
| `docs/demo-script.md` | Stale finder name/nav/search description | Update after runtime parity to reflect what will actually be demonstrated. |
| `docs/hackathon/judging-axis-evidence.md` and normative candidate-count paragraphs | Stale 2/3-candidate claims against five enabled runtime candidates | Reconcile from the Slice Manifest; keep Result display at Top 3. |
| `docs/evidence/issue-262/README.md`, `docs/evidence/issue-268/README.md` | Valid historical runtime evidence; explicitly not live parity proof | Keep immutable/history-labeled. Do not “fix” old screenshots to match new runtime. |

## Explicit intentional differences and stale Figma

These differences have the required current explicit authority:

| Difference | Classification | Authority |
|---|---|---|
| Score-free real Top 3 instead of 96%/91% two-card fixture | `FIGMA_STALE_RELATIVE_TO_ACCEPTED_DECISION` | #255 / PR #260 |
| `Home / Discover / MOGU / My`; no generic Favorites domain | `INTENTIONALLY_DIFFERENT` | #92, #203/#204 deferred, #252/#253 |
| One highlighted action per first-run beat | `INTENTIONALLY_DIFFERENT` | #257 / PR #259 |
| Direct Story → pre-authored Route; no fake loading/generation/regeneration | `INTENTIONALLY_DIFFERENT` | #242 decision |
| Source-backed Story evidence/provenance beyond Figma | `INTENTIONALLY_DIFFERENT` | #264 / PR #265 and Product data rules |
| Source-honest Route/Spot facts and disabled unknown actions | `INTENTIONALLY_DIFFERENT` | #10, #92, #242, approved UI fidelity |
| Fluid 375px, multilingual growth, focus/contrast/touch adaptations | `INTENTIONALLY_DIFFERENT` | #208 and current Product specs |
| Post-profile recommend → `/explore`, browse → `/discover` | `UNSPECIFIED_BY_FIGMA` | Figma target absent; #92/#268 supplies current behavior |

## Genuine remaining human decisions

None blocks starting the sequence or the P1 fixes. Items 4 and 5 gate only their
corresponding conditional visual follow-ups:

1. **Durable navigation labels and feature ownership** — #203/#204 must decide
   whether future Product labels ever adopt `食旅を見つけ / モグモグる /
   お気に入り`, what `すべて見る` opens, and whether a generic favorite domain
   exists. Until then, keep #92.
2. **Production departure and recommendation taxonomy** — #206 must decide
   provider/source, canonical identity, ambiguity/no-result behavior,
   travel-time source/failure behavior, and which inputs affect ranking. The
   presentation-only overlay does not answer these questions.
3. **Future match indicator** — #207 must decide whether any non-numeric
   qualitative indicator is useful. #255 continues to prohibit percentages.
4. **Spot media permission** — Design/Data must supply the actual approved image
   files, source, license/permission, attribution, alt text, and crop before the
   Figma Spot gallery can replace the placeholder.
5. **Story rail membership** — editorial/data review must confirm which existing
   source-backed places legitimately belong under `周辺観光スポット` versus
   `自然と散策`; the container hierarchy may be built first, but a populated
   rail must not invent membership.
6. **Final visual sign-off** — after the sequence below, KiKi/Product should do
   the #270 side-by-side 375px review. The blind baseline resolves audit evidence;
   it is not approval of the resulting pixels.

## Exact recommended PR sequence

All implementation PRs should target #270, remain bounded, and preserve the
Product overrides above. PRs 1 and 2 must be serialized because they share the
finder component and tests.

1. **Finder normal/repeat interaction parity** — in
   `src/pages/s0s3/ExplorationWizardPage.tsx` and scoped CSS, add selected-state
   + vertical Next/Back behavior only outside #257 guided mode; update the
   exploration-sequential, guided, golden-path, and lifecycle E2E contracts.
2. **Departure overlay state parity** — on the reconciled finder, implement local
   `8:2608`/`8:2903` dialog states, keyboard/focus/close behavior, and explicit
   presentation-only fixture treatment; add no provider/schema/scoring work.
3. **Save/Profile state closure** — implement the `122:889` two-action saved bar
   with `/my` handoff, fix My's `not-evaluated` Food Profile rendering, and add
   Route-save → My plus three-state profile tests.
4. **Visible copy cleanup** — remove the duplicate `3:1702` completion sentence;
   rename Result retry to the localized `食旅を見つけ` vocabulary; update only
   affected copy assertions and locale bundles.
5. **Story long-form hierarchy parity** — after the item 5 editorial/data
   decision, split the current nearby section into the two Figma groups with
   contained media-card rails, using only verified current records/placeholders
   and preserving #265 evidence/support/provenance. The empty/container
   structure may land earlier if it does not imply unsupported membership.
6. **Current-contract documentation reconciliation** — after runtime PRs merge,
   reconcile the five-candidate count, demo script, current Figma map/machine
   statuses, and add historical/superseded notices to the 2026-08-20 audit/map.
   Do not edit the blind baseline or historical screenshots.
7. **Conditional media-only follow-up** — only after the human permission package
   exists, add Spot gallery assets/crops/attribution and a visual regression
   capture. If no approved assets exist, close this as an evidenced non-change,
   not with borrowed or fabricated imagery.
8. **#270 sign-off** — capture fresh 375×812 ja/en/zh-TW screens from the exact
   final SHA, compare each against the blind node inventory plus explicit Product
   overrides, run the relevant unit/type/lint/build/E2E gates, and obtain human
   Design/Product approval before acknowledging a Figma checkpoint.

## Things that must not be changed merely for visual parity

- Do not merge Food Profile setup/edit back into repeatable `食旅を見つけ`.
- Do not restore 96%/91%, a two-card limit, Yamame filler, fake confidence, or a
  dietary-safety implication.
- Do not rename/rebind the accepted primary IA, create generic Favorites, or
  merge MOGU Recent with Saved Routes while #203/#204 remain undecided.
- Do not add route generation, regeneration, an optimizer, artificial loading
  delay, async job, or new transition persistence.
- Do not add real geocoding, autocomplete, GPS, realtime travel-time claims, or
  new ranking semantics to reproduce the departure mockup.
- Do not copy placeholder search rows, unverified venue facts, booking promises,
  route times/distances/stops, or Figma imagery without source/permission.
- Do not remove #265 Story evidence, provenance, distributed support actions,
  dietary disclaimers, disabled unknown actions, safe empty/error states, or
  candidate identity continuity.
- Do not hard-code shared Product contracts to Okutama/Wasabi or to one
  nationality/audience.
- Do not transform-scale 390px, freeze Figma frame heights, reproduce iOS status
  chrome, shrink touch targets, or remove focus/i18n/locale/reset safeguards.
- Do not weaken #257 guided one-action determinism when restoring normal/repeat
  Next/Back controls.
- Do not rewrite the immutable blind baseline or historical evidence to make a
  future implementation look compliant.

READY_FOR_PARITY_IMPLEMENTATION
