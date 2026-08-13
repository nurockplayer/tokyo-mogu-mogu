# Final Merge Safety / 最終マージ安全規則

This rule is mandatory for every merge into `main`.

## Review-atomic final gate

A reviewer verdict or handoff is a snapshot, not merge authorization by itself. Immediately before merge:

1. Read the PR's **current HEAD SHA** from GitHub live state.
2. Read **all current inline review threads** from GitHub live state.
3. If any thread is unresolved, **do not merge**. Reconcile each finding: fix it or reject it with concrete evidence, reply, and resolve the thread.
4. Run the final independent reviewer against the **exact current HEAD**. The accepted verdict is exactly `No blocking findings.`
5. After that reviewer completes, read **all live review threads again**. A finding that arrived after the earlier scan invalidates merge readiness.
6. Re-read the PR HEAD. It must still equal the SHA that received the final reviewer verdict.
7. Merge only through:

   `bash scripts/safe-merge.sh <pr-number> <reviewed-head-sha>`

The safe-merge helper performs another live thread scan, checks PR checks, repeats the mutable-state checks, and merges with `--match-head-commit`.

## Prohibited merge paths

- Do not run bare `gh pr merge` for `main`.
- Never use `gh pr merge --admin` or another branch-protection bypass.
- Never merge from an earlier `agent-handoff:v1` state without re-reading GitHub live state.
- Never treat an outdated/resolved-by-code thread as resolved unless GitHub's live thread state is actually resolved.

If the safe-merge helper rejects the merge, return to reconciliation/review. Do not bypass the gate.

## Server-side backstop

Repository rules for `main` should additionally require conversation resolution and required CI checks with bypass disabled. The repository-owned safe-merge command remains required even when server-side protection is enabled, because it also binds the final reviewer verdict to the exact HEAD SHA.

### 日本語要約

`No blocking findings.` はその時点のスナップショットです。マージ直前に review thread と HEAD を GitHub の live state から再確認し、最終 reviewer の後でもう一度確認してください。`main` へのマージは必ず `bash scripts/safe-merge.sh <PR> <review済みHEAD>` を使用し、`--admin` や直接の `gh pr merge` は禁止します。
