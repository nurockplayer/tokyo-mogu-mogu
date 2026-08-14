# Final Merge Safety / 最終マージ安全規則

This rule is mandatory for every merge into `main`.

## Review-atomic final gate

A reviewer verdict or handoff is a snapshot, not merge authorization by itself. Immediately before merge:

1. Read the PR's **current HEAD SHA** from GitHub live state.
2. Read **all current inline review threads** from GitHub live state.
3. If any thread is unresolved, **do not merge**. Reconcile each finding: fix it or reject it with concrete evidence, reply, and resolve the thread.
4. Run the final independent reviewer against the **exact current HEAD**, and submit its verdict as a GitHub review on that exact HEAD with the body exactly `No blocking findings.` This review is the machine-verifiable attestation that the reviewed SHA carries the mandated final verdict.
5. After that reviewer completes, read **all live review threads again**. A finding that arrived after the earlier scan invalidates merge readiness.
6. Re-read the PR HEAD. It must still equal the SHA that received the final reviewer verdict.
7. Merge only through:

   `bash scripts/safe-merge.sh <pr-number> <reviewed-head-sha>`

The safe-merge helper performs another live thread scan, checks PR checks, repeats the mutable-state checks, and merges with `--match-head-commit`.

## Merge-authoritative blockers

The safe-merge helper refuses to merge when any of these **server-visible** conditions holds at merge time:

1. The PR HEAD differs from the reviewed HEAD.
2. The exact HEAD carries no non-dismissed review whose body is exactly `No blocking findings.` (the mandated final-verdict attestation).
3. A live `CHANGES_REQUESTED` review exists on the exact HEAD (per reviewer, not superseded by a later `APPROVED`; `COMMENTED` never clears it, mirroring GitHub).
4. Any inline review thread is unresolved.
5. Any required CI check, including `Merge Gate`, is pending or failing.
6. The target branch lacks the required server-side protections (conversation resolution, pull-request review protection with **zero** required approvals, required `Merge Gate`, enforce-admins / no bypass).

A `COMMENTED` review — bot or human — is **advisory, not merge-authoritative**. A client-side helper cannot make an arbitrary future COMMENTED review transactionally atomic with GitHub's merge API, so a blocking finding must materialize as one of the states above — an unresolved inline review thread, a `CHANGES_REQUESTED`, or a required-status failure — to block a merge. A body-only `COMMENTED` review, or a `COMMENTED` review whose inline findings have been reconciled and resolved, does not permanently block a SHA. Resolving a thread is trust-based reconciliation, not proof of a fix.

A native GitHub `APPROVED` review is **not required** for merge. The owner/agent workflow cannot reliably produce one (a PR author cannot approve their own PR, and trusted bots are quota/availability-limited), and Issue #159 does not require it. The server-side protection therefore requires **zero** approving reviews.

## Prohibited merge paths

- Do not run bare `gh pr merge` for `main`.
- Never use `gh pr merge --admin` or another branch-protection bypass.
- Never merge from an earlier `agent-handoff:v1` state without re-reading GitHub live state.
- Never treat an outdated/resolved-by-code thread as resolved unless GitHub's live thread state is actually resolved.

If the safe-merge helper rejects the merge, return to reconciliation/review. Do not bypass the gate.

## Server-side backstop

Repository rules for `main` require conversation resolution and required CI checks (`Merge Gate`) with bypass disabled and admin enforcement. Pull-request review protection is retained with `required_approving_review_count: 0` so the server still enforces a live `CHANGES_REQUESTED` at merge time and dismisses stale reviews, without requiring any approval. The repository-owned safe-merge command remains required even when server-side protection is enabled, because it binds the exact HEAD SHA and enforces the merge-authoritative blockers above.

### 日本語要約

`No blocking findings.` はその時点のスナップショットです。マージ直前に review thread と HEAD を GitHub の live state から再確認し、最終 reviewer の後でもう一度確認してください。最終 reviewer の裁定は exact HEAD 上に GitHub review（body が `No blocking findings.`）として submit し、attestation にしてください。`main` へのマージは必ず `bash scripts/safe-merge.sh <PR> <review済みHEAD>` を使用し、`--admin` や直接の `gh pr merge` は禁止します。
