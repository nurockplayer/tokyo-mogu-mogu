# Explainable Recommendation Contract / 説明可能な推薦契約

Status: **Dormant/supporting deterministic helper; not the active Result or a
durable production recommendation contract.**

The current Result renders two live-Figma journey-card presentation fixtures.
Its visible `96` / `91` indicators are presentational fixtures only, not
calculated scores, confidence, accuracy, dietary compatibility, or safety
claims. The helper documented below is retained as implementation support for
five demo candidates and must not be presented as the source of those two
cards. Durable production taxonomy, selection, reasons, and any score semantics
are explicitly deferred to Issues #206 and #207.

Historical decision / implementation context: Issue #123.

## Scope invariant / 対象範囲

The recommendation domain is **Tokyo-wide, multi-region ×
multi-food-culture**. A candidate represents one Tokyo `Region × FoodCulture`
and may point to a Journey/Route. Candidate generation is data/config supplied
by the caller; the shared filter/ranker contains no Okutama or Tokyo Wasabi
identifier.

The supporting helper has five fixture-backed demo candidates in
`src/data/demo-recommendation.ts`; its candidate list and deterministic
ordering are not active Product selection semantics. The fixed demo answers
can still exercise the helper's Okutama × Tokyo Wasabi path, but that behavior
does not select, rank, explain, or validate the two currently visible Result
cards. This is demo implementation state, not a durable selection domain or
verification claim.

推薦対象の durable domain は「東京都全域 × 複数地域 × 複数食文化」です。現在の
Result は live Figma の 2 枚の journey-card fixture を表示します。5 件の demo
candidate を扱う既存 helper は supporting implementation state であり、現在の
Result の選定・順位・理由・96 / 91 の意味を定義しません。これらの production
semantics は #206 / #207 で決定するまで保留です。

## Inputs and pipeline / 入力と処理順

```text
Food Profile (persistent)
        +
Exploration Conditions (per trip)
        +
caller-supplied helper-eligible demo Region × FoodCulture candidates
        ↓
1. hard exclusions
        ↓
2. ranking among eligible candidates
        ↓
3. stable tie-break by candidate id
        ↓
selected candidate + bounded reasons + cautions
```

`src/lib/recommendation.ts` is a pure, local, deterministic baseline. It is not
an ML model, optimization service, safety classifier, or route planner.

## Hard exclusions / 除外条件

Hard exclusions run before scoring. No ranking objective can restore an
excluded candidate.

| Exclusion | Rule |
|---|---|
| unavailable candidate | Candidate is not helper-eligible/available. |
| travel-time infeasible | A known minimum travel-time bucket exceeds the traveler's selected maximum. |
| duration infeasible | The candidate has no route/experience variant for the selected trip duration. |

### Food Profile safety boundary

The current Food Profile categories (`allergy`, `vegetarian-vegan`,
`religious`, `dislike`) and free text are too coarse to prove venue or dish
compatibility. Missing candidate metadata is **unknown**, not compatible.

- The current broad categories create **no dietary hard exclusion**. Unknown
  compatibility produces `dietary-confirmation-required`.
- Free text is never parsed into an automated safety decision.
- Result/Spot copy must continue telling the traveler to confirm details with
  the venue.

This deliberately favors honest uncertainty over pretending the system can
certify food safety.

## Ranking factors / 順位付け

Eligible candidates receive deterministic additive points:

| Factor | Points | Meaning |
|---|---:|---|
| selected taste match | 4 per matched value | Current-trip preference |
| selected experience match | 4 per matched value | Current-trip preference |
| selected interest match | 4 per matched value | Current-trip preference |
| duration fit | 3 | Feasible selected duration |
| known travel-time fit | 3 | Known estimate fits the selected maximum |
| tourism-dispersion | 1 total | Evidence-backed `under-visited` region objective |

The numbers are ordering weights, not probabilities or user-visible match
percentages. One user-preference match is intentionally stronger than the
entire tourism-dispersion bonus. Unknown travel time does not earn fit points
and stays visible as a caution.

## Tourism-dispersion role / 観光分散の役割

Tourism dispersion is a Product objective, not permission to ignore the
traveler.

1. Feasibility and known dietary conflicts are evaluated first.
2. User-selected taste, experience, interest, time, and duration dominate
   ranking.
3. An evidence-backed under-visited status can break a close tie or improve an
   otherwise comparable candidate by one point.
4. `outer Tokyo`, distance from the 23 wards, or editorial preference alone do
   not prove `under-visited`; unsupported candidates use `unknown` and receive
   no bonus.

The candidate type requires a non-empty source reference for `under-visited`
or `neutral`. Empty references do not activate an objective bonus. This is a
provenance pointer into the candidate data/verification record, not a parallel
source model. `unknown` needs no invented source reference.

The current demo candidates are `unknown` for this factor because the existing
evidence does not provide sufficiently direct region-specific comparison for
this runtime decision. Pitch/research evidence remains useful without being
silently converted into a per-candidate ranking fact.

## Explainability / 説明可能性

Each eligible evaluation exposes:

- the internal factor list and additive score;
- at most **3** positive/objective reason records;
- at most **2** caution records;
- stable reason codes plus matched values for localization.

Each excluded evaluation exposes explicit hard-exclusion codes. Cautions are
never converted into positive match reasons. The helper's internal values must
not be rendered as a percentage. It does not define active Product rank, reason,
or visible-indicator semantics; those decisions remain deferred to #206 / #207.

## Demo integration / デモ実装境界

`src/data/demo-recommendation.ts` contains the five-candidate supporting demo
list. The helper may be exercised deterministically without becoming current
Result authority. The active Result instead presents the two live-Figma cards;
it does not expose a helper-derived Top-3, score, confidence, accuracy, dietary
compatibility, or safety claim. Adding a future verified Region × FoodCulture
candidate requires a future Product decision and data/configuration, not a
region-specific branch in the helper.

## Evaluation boundary / 評価の境界

Do not claim that a recommendation proves a visit or tourism dispersion.

| Level | Examples | What can be said |
|---|---|---|
| observable product proxy | Result produced, Story viewed/completed, Route viewed/saved, directions/booking/purchase CTA clicked, next-region discovery | Product interest or intent signal |
| actual outcome | verified visit, purchase, booking, local action | Requires separate instrumentation or stakeholder/user evidence |
| long-term impact | changed regional visitor distribution, spend, repeat discovery across Tokyo | Requires longitudinal/external evaluation; not provable in the Hackathon |

Minimum hypothesis chain:

`Recommendation → regional discovery → Story/Route interest → visit intent →
local action → tourism dispersion`

Every arrow after an observable in-app event remains a hypothesis until the
corresponding evidence exists.

## Known limitations / 今後の検証

- Candidate attribute quality and region-level tourism evidence require
  provenance outside this pure helper.
- Current base-area/travel-time buckets are coarse and are not realtime route
  estimates.
- Food Profile free text is intentionally not interpreted.
- Dietary hard exclusions require future structured inputs specific enough to
  establish an actual conflict (for example a named allergen), plus sourced
  candidate metadata. They must not be inferred from today's broad categories.
- Further multi-candidate expansion needs verified candidate content and a
  product-approved localization/presentation mapping; it does not need a new
  selection contract.
- MOGU entries preserve the stable candidate id plus the current Exploration
  snapshot. Reopen resolves that identity and never silently re-ranks history
  into a different candidate. Legacy v1 records fall back to food-culture id.
  If full candidate content becomes dynamic, content snapshot/version semantics
  still need a separate decision.
