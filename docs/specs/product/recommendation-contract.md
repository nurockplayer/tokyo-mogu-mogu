# Explainable Recommendation Contract / 説明可能な推薦契約

Status: **Current durable recommendation contract**
Decision / implementation: Issue #123

## Scope invariant / 対象範囲

The recommendation domain is **Tokyo-wide, multi-region ×
multi-food-culture**. A candidate represents one Tokyo `Region × FoodCulture`
and may point to a Journey/Route. Candidate generation is data/config supplied
by the caller; the shared filter/ranker contains no Okutama or Tokyo Wasabi
identifier.

The current release ships three production-ready candidates — **Okutama ×
Tokyo Wasabi** (primary), **Ome/Sawai × sake** (secondary), and **Hachioji ×
ginger** (secondary) — registered in `src/data/slice-manifest.ts` as enabled
and recommendation-eligible. The shared engine selects deterministically
among them: the fixed golden-path answers match only the wasabi profile, so
the demo Result returns **Okutama × Tokyo Wasabi**, while rich/sweet,
tradition-focused answers reach the sake journey and rich, daily-life,
market-focused answers reach the Hachioji journey through the same engine.
This is a release data choice, not the durable selection domain.

推薦対象は「東京都全域 × 複数地域 × 複数食文化」です。現行リリースには本番候補が
3 件（奥多摩 × 東京わさび＝primary / 青梅・沢井 × 日本酒＝secondary /
八王子 × ショウガ＝secondary）あり、`src/data/slice-manifest.ts` で enabled かつ
recommendation-eligible です。golden path の固定回答はわさび profile のみに
マッチするため Result は決定的に奥多摩 × 東京わさびが選ばれますが、rich /
sweet・伝統志向の回答では青梅・沢井 × 日本酒、rich・日常志向・買い物の回答では
八王子 × ショウガに同じエンジンで到達できます。これはリリースデータの選択であり、
共有ロジックの制約ではありません。

## Inputs and pipeline / 入力と処理順

```text
Food Profile (persistent)
        +
Exploration Conditions (per trip)
        +
caller-supplied production-ready Region × FoodCulture candidates
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
| unavailable candidate | Candidate is not production-ready/available. |
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
never converted into positive match reasons. Scores must not be rendered as a
percentage; the approved meaning of a match percentage remains unresolved.

## Demo integration / デモ実装境界

`src/data/demo-recommendation.ts` contains the Hackathon demo candidate list
(Okutama × Tokyo Wasabi primary + Ome/Sawai × sake secondary). `ResultPage`
sends Food Profile + Exploration Conditions + that candidate list through the
shared contract. Adding a future verified `青梅 × 日本酒` or
`八王子 × 地域野菜` candidate requires data/config, not new region-specific
branches in the ranker.

The existing Result tags remain localized presentation for the approved S3
screen, but are now derived only from the selected candidate's bounded reason
records. An answer the candidate does not support cannot appear as a match tag.

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
