# Final Merge Safety / 最終マージ安全規則

An independent reviewer must review the exact PR HEAD before merging. After the reviewer returns `No blocking findings.`, run:

```sh
bash scripts/merge-reviewed.sh <pr-number> <reviewed-head-sha>
```

The command reads the live HEAD, review threads, reviews and `Merge Gate` status. It refuses a moved HEAD, unresolved thread, live `CHANGES_REQUESTED`, or missing, pending or failing `Merge Gate`. It posts a COMMENT review with body exactly `No blocking findings.` on the reviewed SHA only if that attestation is absent, then merges with `--match-head-commit`. The command does not perform the independent review.

A later `APPROVED` from the same reviewer clears a `CHANGES_REQUESTED`; a `COMMENTED` review does not. Server-side branch protection remains the backstop for review and thread changes after the live reads. Reconcile blockers before trying again. Never use `--admin` or bare `gh pr merge` for `main`.

### 日本語要約

独立 reviewer が PR の exact HEAD をレビューし、`No blocking findings.` と裁定した後、`bash scripts/merge-reviewed.sh <PR> <review済みHEAD>` を実行します。コマンドは live HEAD、review thread、review、`Merge Gate` を確認し、必要なら同じ SHA に attestation を投稿してから `--match-head-commit` でマージします。HEAD の変更、未解決 thread、解除されていない `CHANGES_REQUESTED`、未完了または失敗した `Merge Gate` があれば拒否します。`--admin` と直接の `gh pr merge` は禁止します。
