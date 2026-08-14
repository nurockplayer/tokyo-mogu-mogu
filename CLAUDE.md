# CLAUDE.md

Repository-specific instructions for Claude Code.

## Canonical Rules / 基本ルール

**Read `AGENTS.md` before doing any work.**

`AGENTS.md` is the canonical repository policy for product goals, language, workflow, data handling, validation, and Definition of Done. This file only adds Claude-specific execution rules. If the two files appear to conflict, follow `AGENTS.md` unless this file contains a more specific Claude Code instruction.

作業開始前に必ず `AGENTS.md` を読んでください。プロジェクト全体のルールは `AGENTS.md` を正とし、このファイルでは Claude Code 固有の実行ルールのみを定義します。

## Product Scope Hard Gate / プロダクト対象範囲

For any Product, Region, FoodCulture, recommendation, pilot/demo, canonical-data, or route-content task, read `docs/specs/product/product-scope-invariant.md` before editing.

Hard invariant:

- **Product scope = Tokyo-wide, multi-region × multi-food-culture.**
- **Okutama × Tokyo Wasabi = 2026-08-23 Hackathon Demo Golden Path only.**
- Tama / Okutama / Tokyo Wasabi must not become shared Product-domain assumptions.
- `canonical`, `pilot`, and `frozen` wording around Okutama × Tokyo Wasabi is demo-scoped only.
- A future Tokyo Region × FoodCulture should be addable primarily via data/content/config without redesigning shared domain, recommendation, navigation, persistence, i18n, or provenance contracts.
- This does not require implementing a second region before 8/23 or creating a generic platform/CMS.

If an Issue, PR, existing comment, or implementation plan appears to say `MVP = Okutama × Tokyo Wasabi` or `Frozen Journey = Okutama × Tokyo Wasabi`, interpret it through the current invariant rather than copying that shorthand into new normative artifacts.

## Before Editing / 編集前

1. Read the relevant issue or task description completely.
2. Inspect repository structure and nearby implementation before proposing a solution.
3. Check `git status` and preserve existing human or agent changes.
4. Look for related issues, PRs, contracts, schemas, and tests before creating new abstractions.
5. For Product/data/recommendation/demo work, read `docs/specs/product/product-scope-invariant.md` and verify the task does not confuse demo scope with Product scope.
6. Keep the requested scope narrow. Do not opportunistically refactor unrelated code.
7. For routine bounded tasks, start from the default read set in `AGENTS.md` and expand only on a concrete trigger (shared-contract impact, unresolved product/data meaning, unknown convention, dependency/open-PR ambiguity, unexpected test failure, or a reviewer finding requiring broader analysis). Do not perform repository-wide archaeology by default.

Do not guess repository conventions that can be discovered from the codebase.

## Implementation / 実装

- Implement the smallest independently verifiable vertical slice that satisfies the ticket.
- Follow the current Product/IA contract in `AGENTS.md`: `docs/specs/product/product-scope-invariant.md` + Issue #112 for Product scope/demo boundary and Issue #92 + the KiKi approved UI/UX design draft for current App IA. Older #85/#41/S0–S9 material is historical foundation only.
- When an approved KiKi Figma screen exists for a screen, implement the approved design rather than independently redesigning or reinterpreting the UX. Escalate to Product/Design only for a concrete blocker (impossible/contradictory interaction, accessibility blocker, verified data that cannot fit the design, or a broken core demo flow).
- Prefer existing patterns and dependencies over introducing new ones.
- Keep public contracts explicit: types, schemas, API shapes, localization keys, and data-source metadata should be easy to inspect.
- For user-facing features, preserve Japanese/English support described in `AGENTS.md`.
- For external data, keep source traceability and never convert uncertain information into an unqualified fact.
- Avoid speculative architecture for hypothetical post-hackathon scale unless the ticket requires it.
- Do not introduce Okutama/Wasabi-specific semantics into reusable code merely because the 8/23 demo uses that golden path.
- Keep routine implementation ownership with the default implementation agent; escalate only the consequential decision slice and return ownership after focused advice (see `AGENTS.md` → Agent Context and Escalation).

## Parallel Work / 並列実装

When using sub-agents or parallel work:

- Delegate only genuinely independent slices.
- Give each agent a bounded outcome, file area, acceptance criteria, and validation target.
- Include the Product-scope invariant in sub-agent prompts whenever their work touches Product/data/recommendation/demo semantics.
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
6. For Product/data/recommendation/demo work, explicitly verify that the 8/23 Okutama × Tokyo Wasabi golden path remains demo-scoped and no shared contract was narrowed.

Do not claim a check passed if it was not executed. If something cannot be verified, state it explicitly.

Validation is risk-based (Issue #137): the CI `Quality Gates` job classifies each change with `scripts/ci/classify-changes.sh` into docs/policy-only, normal runtime, or core-risk. Docs/policy-only changes skip dependency install, unit tests, build, and Playwright; normal runtime changes run typecheck/lint/test/build; core-risk changes additionally run the 375px Japanese Golden-path Playwright E2E (which never reruns the TypeScript typecheck owned by Quality Gates). Do not weaken or delete existing test assertions; the tiers only change when the gates run, not what they assert.

## Local Validation Tiers / ローカル検証の段階

Issue #153 adds a local/agent tier below the CI gate. Follow the loop below while editing instead of running `pnpm test` / `pnpm build` after every small change; CI (#137) remains the authoritative merge gate.

```
edit → T0 focused → … → slice complete → T1 → focused review → fix + focused regression → T2 once → PR → CI (T3)
```

- **T0 — focused edit loop** — after a small edit or review fix. Run `pnpm test:related <src-file>` (native `vitest related --run`) or `pnpm test:focused <test-file>` (native `vitest run`). Pass file paths positionally, without `--` — pnpm 11 drops args after `--`, so `pnpm test:related -- <src-file>` finds zero tests and `pnpm test:focused -- <test-file>` runs the full suite. Always pass a path: with no path, `test:focused` runs the full suite and `test:related` exits 0 with zero tests. Never treat `0 related tests` as proof of safety: dynamic imports, generated data, and global config are invisible to related-test discovery; use an explicit focused test or escalate to T1/T2.
- **T1 — vertical-slice checkpoint** — focused/related tests for the slice + `pnpm typecheck` (when TS/runtime code changed) + any new deterministic regression test, before reviewer handoff. Record what was run. No Playwright unless the change needs browser verification here.
- **T2 — pre-PR runtime validation** — `pnpm validate` (typecheck + lint + full Vitest + build), run once when the branch is ready. After a review fix, rerun the focused regression first; repeat T2 only for a material surface change or immediately before delivery.
- **T3 — CI / merge gate** — the existing #137 classifier (`docs / normal / core`), unchanged.

Do not repeatedly run the full suite after every edit or review fix.

## Handoff / 引き継ぎ

Keep the final handoff concise and concrete. Include:

- **Summary**: what changed and why.
- **Dependency / preflight status**: current Issue/spec/dependency/open-PR state checked, and any dependency reported as blocked.
- **Shared-impact checks**: downstream consumers/invariants searched for any shared contract change.
- **Product-scope check**: for Product/data/recommendation/demo work, confirm `Tokyo-wide multi-region × multi-food-culture` was preserved and Okutama × Tokyo Wasabi remained demo-only.
- **Validation**: commands/checks actually run and their result.
- **Reviewer verdict**: exactly `No blocking findings.` or the blocking findings.
- **Risks / Follow-up**: only unresolved items that materially matter.
- **日本語要約**: a short Japanese summary when the handoff is meant for the shared team.

Avoid long implementation diaries. The diff, tests, and linked issue should carry the detail.

## Decision Rule / 判断ルール

If a requirement is ambiguous but implementation can proceed safely, choose the smallest reversible assumption consistent with `AGENTS.md`, document it, and continue.

If ambiguity could change the product contract, data meaning, security/privacy behavior, or create significant rework, stop implementation and surface the decision clearly instead of inventing a requirement.

A narrow Hackathon demo is not permission to narrow the durable Product scope.

## Spec-aware Execution / Spec準拠の実行

When an Issue references a Spec under `docs/specs/`:

- Read the referenced Spec before implementing.
- For Product scope, Region/FoodCulture boundaries, recommendation candidates, demo/pilot semantics, or data extensibility, `docs/specs/product/product-scope-invariant.md` is the first scope reference.
- The current hackathon behavior contract is `docs/specs/product/hackathon-product-contract.md`, aligned with Issue #112 (Product scope/demo boundary) and Issue #92 / the KiKi approved UI/UX design draft (current App IA). Issue #85 / #41 and S0–S9 are historical foundation, not the current execution contract.
- Do not implement behavior that contradicts the Spec.
- Do not fill in unresolved product behavior on your own; surface it instead.
- If a Spec change is needed, call it out explicitly as its own change rather than mixing it into implementation scope.
