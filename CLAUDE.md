# CLAUDE.md

Repository-specific instructions for Claude Code.

## Canonical Rules / 基本ルール

**Read `AGENTS.md` before doing any work.**

`AGENTS.md` is the canonical repository policy for product goals, language, workflow, data handling, validation, and Definition of Done. This file only adds Claude-specific execution rules. If the two files appear to conflict, follow `AGENTS.md` unless this file contains a more specific Claude Code instruction.

作業開始前に必ず `AGENTS.md` を読んでください。プロジェクト全体のルールは `AGENTS.md` を正とし、このファイルでは Claude Code 固有の実行ルールのみを定義します。

## Before Editing / 編集前

1. Read the relevant issue or task description completely.
2. Inspect repository structure and nearby implementation before proposing a solution.
3. Check `git status` and preserve existing human or agent changes.
4. Look for related issues, PRs, contracts, schemas, and tests before creating new abstractions.
5. Keep the requested scope narrow. Do not opportunistically refactor unrelated code.

Do not guess repository conventions that can be discovered from the codebase.

## Implementation / 実装

- Implement the smallest independently verifiable vertical slice that satisfies the ticket.
- Prefer existing patterns and dependencies over introducing new ones.
- Keep public contracts explicit: types, schemas, API shapes, localization keys, and data-source metadata should be easy to inspect.
- For user-facing features, preserve Japanese/English support described in `AGENTS.md`.
- For external data, keep source traceability and never convert uncertain information into an unqualified fact.
- Avoid speculative architecture for hypothetical post-hackathon scale unless the ticket requires it.

## Parallel Work / 並列実装

When using sub-agents or parallel work:

- Delegate only genuinely independent slices.
- Give each agent a bounded outcome, file area, acceptance criteria, and validation target.
- Avoid overlapping edits across agents where possible.
- Assign one owner for integration when contracts or files overlap.
- Do not split a coherent vertical slice into tiny tasks that repeatedly reload the same repository context.

Parallelism is useful only when it increases merge throughput without multiplying integration risk.

## Git Safety / Git安全性

- Never force-push shared branches.
- Never use destructive reset/checkout commands to discard work you did not create.
- Never rewrite unrelated commits.
- Do not commit secrets, credentials, local environment files, or private personal data.
- Do not silently remove human-authored changes to make a task easier.

If the working tree contains unrelated changes, work around them rather than deleting them.

## Validation / 検証

Before finishing:

1. Run the most relevant available tests.
2. Run type checks, lint, and build commands when applicable.
3. Verify the actual changed flow, not only unit-level behavior.
4. Check Japanese and English output when UI copy changed.
5. Review the final diff for unrelated changes, debug code, placeholders, and secrets.

Do not claim a check passed if it was not executed. If something cannot be verified, state it explicitly.

## Handoff / 引き継ぎ

Keep the final handoff concise and concrete. Include:

- **Summary**: what changed and why.
- **Validation**: commands/checks actually run and their result.
- **Risks / Follow-up**: only unresolved items that materially matter.
- **日本語要約**: a short Japanese summary when the handoff is meant for the shared team.

Avoid long implementation diaries. The diff, tests, and linked issue should carry the detail.

## Decision Rule / 判断ルール

If a requirement is ambiguous but implementation can proceed safely, choose the smallest reversible assumption consistent with `AGENTS.md`, document it, and continue.

If ambiguity could change the product contract, data meaning, security/privacy behavior, or create significant rework, stop implementation and surface the decision clearly instead of inventing a requirement.

## Spec-aware Execution / Spec準拠の実行

When an Issue references a Spec under `docs/specs/`:

- Read the referenced Spec before implementing.
- The current hackathon product contract is
  `docs/specs/product/hackathon-product-contract.md` (Issue #85 Product
  positioning + Issue #41 Hackathon UX). Child Issues #42–#49 and any S0–S9
  work reference it as the current contract.
- Do not implement behavior that contradicts the Spec.
- Do not fill in unresolved product behavior on your own; surface it instead.
- If a Spec change is needed, call it out explicitly as its own change rather than mixing it into implementation scope.
