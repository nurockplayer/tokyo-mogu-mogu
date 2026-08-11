# Frozen 2026-08-23 Tama Pilot Dataset — 凍結済み多摩パイロットデータセット

> Issue #127 (TAC-6) · Freeze one coherent source-backed Tama journey for the
> 2026-08-23 hackathon demo.
> Status: **frozen pilot dataset** (canonical records + provenance contract).
> Retrieval / last-verified: **2026-08-08** (all source facts retrieved on this
> date; provenance recorded in the canonical seed).
> Related: #10 (fieldwork), #19 (registry), #45/#79/#80 (Route/Spot), #92 (IA),
> #93 (Discover), #112 (MVP), #129 (verification contract).

---

## 1. What is frozen / 何を凍結したか

**One journey: 奥多摩 × 東京わさび (Okutama × Tokyo Wasabi).**

The 2026-08-23 demo runs the current #92 IA `Result → Story → Route → Spot →
Discover` on exactly one coherent Tama journey, backed by the existing
canonical records in `src/data/`. Nothing else is frozen: no second region, no
broadened discovery, no new infrastructure.

**Canonical records (single source of truth):**

| Surface | Canonical records | Files |
|---|---|---|
| Route | `okutama-wasabi-journey` (half-day + 1-day variants) | `src/data/seed-routes.ts` |
| Spots | 5 Okutama spots (tourism office, wasabi field, soba shop, roadside station, fishing center) | `src/data/seed-places.ts` + `SPOT_DETAILS` |
| Story | `wasabi-okutama` food culture (plus yamame / soba / konnyaku as supporting cultures) | `src/data/seed-food-cultures.ts` |
| Discover | Featured culture `wasabi-okutama` + the 5 pilot places | `src/data/pilot.ts` (manifest) |
| i18n | Record→bundle-key mappings for the pilot scope | `src/i18n/data-content.ts` |

**Manifest anchor (`src/data/pilot.ts`)** — the single id list all surfaces
import: `PILOT_ROUTE_ID`, `PILOT_FEATURED_CULTURE_ID`, `PILOT_PLACE_IDS`.
Discover no longer hard-codes its own id list; Route, Story, Spot and Discover
all resolve the same canonical records through `src/data/index.ts`.

## 2. Provenance / 出典

Every record carries the #129 provenance contract fields where applicable:
`sourceType`, `sourceUrl` (via `url`), `license`, `retrievedAt`,
`verificationStatus`, and a stable `originalId`. Rules honored across the
dataset:

- **`retrievedAt` is retrieval, not confirmation.** A source retrieved or
  cross-referenced but never stakeholder-confirmed stays
  `needs_confirmation`; it is never presented as verified.
- **`confirmedAt` is the only confirmation signal.** No seed record has a
  fabricated `confirmedAt`; all current sources are honestly
  `needs_confirmation`.
- **Demo ≠ verified.** Places carry demo-approximate coordinates
  (`origin: 'demo'`) and always render the demo label; the UI never shows a
  demo fixture as a verified production fact.

Sources in the pilot:
- 奥多摩観光協会 (`okutokanko.jp`) — official web, retrieval 2026-08-08.
- 東京都産業労働局 特産品情報 — official web, retrieval 2026-08-08.
- 青梅市 / 青梅市観光協会 / 日の出町 — official web (supporting cultures only,
  not part of the frozen journey scope).

## 3. Data honesty rules / データの誠実性

- **No fabricated practical fields.** No spot detail claims hours, closed days,
  price, or reservation availability — none of the sources supply them. The S6
  screen renders an explicit unverified state instead.
- **No inferred dietary/allergy/language/accessibility claims.** These tags are
  empty in the pilot; they render only when a source states them.
- **No business-specific claims from regional aggregates.** The Ome food
  license list (#132 research) is not used to imply a spot is "open" or
  "serves local food".
- **Action links are truthful.** Only the tourism office has an external
  destination (the official Okutama association site). Farm / restaurant / shop
  / fishing actions are disabled "coming soon" until fieldwork (#10) verifies
  a real booking/visit destination.
- **Images** are not shipped without provenance; current spots use the bundled
  placeholder visual path (`PlaceVisual`), no production-visible photo claims
  a reuse right the record cannot back.

## 4. Demo boundary / デモ境界

| State | What it means | Where rendered |
|---|---|---|
| `origin: 'demo'` (places) | Approximate coordinates / addresses, to be re-verified by fieldwork #10 | Verification badge "Demo data" on Spot |
| `origin: 'editorial'` (food cultures, route) | Team-authored narrative from cited public sources | "Editorial" origin tag on Story / FoodCulture |
| `needs_confirmation` (all sources) | Retrieved but not stakeholder-confirmed | Source date shows "Retrieved", never "Last verified" (#129 / #141) |

The distinction is enforced in code (`deriveVerificationStatus`,
`recordVerificationStatus`, `sourceDateLabel`) and locked by
`src/data/pilot.test.ts`.

## 5. Acceptance-criteria checkpoints / 受入条件チェック

- ✅ One coherent Tama pilot journey frozen (Okutama × wasabi, half-day + 1-day).
- ✅ Result / Story / Route / Spot reuse the same canonical records
  (`src/data/index.ts` + `pilot.ts` manifest).
- ✅ Production-visible facts traceable to provenance (`sourceType` /
  `retrievedAt` / `originalId` on every record).
- ✅ Demo / unknown / verified states distinguished (verification badges,
  retrieved-vs-verified labels).
- ✅ hours / price / reservation / compatibility never asserted without a source.
- ✅ Discover reuses the same verified Story / Spot records (imports the pilot
  manifest, no hard-coded id drift).
- ✅ No Okutama / wasabi-specific fields in the generic schema (no model
  expansion — the generic `FoodCulture` / `Place` / `ModelRoute` model suffices).
- ✅ ja / en / zh-TW structural parity (all new keys ship in three locales).
- ✅ typecheck / lint / test / build pass.

## 6. Out of scope / 対象外

Per GH #127: exhaustive Tama coverage, multi-region production, CMS,
AI-generated Story, new route optimization engine, stakeholder interviews
(#10 follow-up), and any schema/contract expansion. The generic model is
sufficient to represent this journey; if a future acceptance criterion cannot
be represented, that exact gap is escalated before any schema change.

---

## 日本語要約

8/23 デモ向けに **奥多摩 × 東京わさび** の 1 本の coherent な Tama journey を
凍結した。Result / Story / Route / Spot / Discover はすべて既存の canonical
record を再利用し、`src/data/pilot.ts` を単一のマニフェストとして共有する
(Discover のハードコード id リストを除去)。provenance は #129 契約に従い、
`retrievedAt` は確認ではなく取得日、`confirmedAt` のみが確認。座標は demo
近似、全 source は `needs_confirmation` のまま。hours / price / 予約 /
食事制限 / 言語 / アクセシビリティは source がない限り断言せず、UI は
unverified 状態を明示する。`src/data/pilot.test.ts` が integrity をロック。
schema は一切拡張しない。
