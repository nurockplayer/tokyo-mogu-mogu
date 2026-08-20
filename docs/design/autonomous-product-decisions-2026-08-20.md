# Autonomous product decisions — 2026-08-20

This record captures non-obvious release-candidate decisions made while closing
Issues #257 and #255. The Issues remain the specification authority; this file
records implementation rationale and presentation impact.

## 1. First-run tutorial is session-only

Decision:

- Starting the first-use Food Profile flow activates `tmm:tutorial:v1` in
  `sessionStorage`.
- Each decision beat keeps the approved option set visible but enables exactly
  one highlighted, legitimate golden-path action.
- Food Profile completion does not end the tutorial; a valid Result does.
- Demo reset clears tutorial state. Food Profile, Exploration, MOGU Recent, and
  Saved Routes keep their existing independent contracts.
- A completed tutorial restores unrestricted setup/exploration behavior. If
  session storage is unavailable, the app fails open to normal interaction.

Rationale: session state makes the presentation deterministic without turning a
demo walkthrough into Product data or recommendation input. A static outline is
used instead of a pulsing/scale animation because movement made the touch target
unstable under real browser actionability checks and added no product meaning.

## 2. Result shows a real deterministic Top 3

Decision:

- Result shows the selected eligible evaluation first, followed by the next two
  distinct eligible evaluations from the same recommendation decision.
- A MOGU reopen supplies its recorded candidate as the preferred first card;
  the remaining cards use the original deterministic ranking. Reopen does not
  re-record or rerank history.
- All three cards use canonical Region × FoodCulture × Route data, bounded
  reason tags, and candidate-preserving Story CTAs.
- Internal additive scores remain ordering-only. The old 96%/91% display and
  Yamame fixture are not rendered.
- Only the first/newly selected recommendation is written to MOGU Recent.

Rationale: this replaces fake breadth with five release-eligible, source-backed
journeys while preserving deterministic demo reliability and the Tokyo-wide,
multi-region × multi-food-culture contract.

## 3. Figma reconciliation boundary

Issue #257 intentionally adapts the approved first-run interaction while
preserving its visible compositions. Issue #255 explicitly supersedes the
older Result fixture. These are recorded as deliberate adaptations in the Figma
implementation map and coverage audit.

The hosted Figma connector reached its Starter-plan call limit and the local
bridge had no file open. No paid-plan or external-cost change was authorized;
the audit therefore used the checked-in live-bridge inventory, implementation
map, coverage audit, current Issues, and regression gates. A human may re-run a
live visual comparison after opening the KiKi file or increasing the connector
quota.

## 日本語要約

- 初回ガイドは `sessionStorage` のみで管理し、各 beat で正当な 1 操作だけを有効化する。
- Result は架空の 96% / 91% fixture を廃止し、同一の決定論 recommendation から実在する
  Top 3 を表示する。MOGU 再表示では保存済み candidate を先頭に保つ。
- #255 / #257 は旧 Figma 表現への意図的な Product adaptation として記録する。
- Figma の有料枠変更は行わず、live visual 再確認のみ human follow-up とする。
