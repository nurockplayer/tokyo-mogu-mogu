# CLAUDE.md

Repository-specific instructions for Claude Code.

## Start here

Read `AGENTS.md` before doing any work. It is the canonical repository policy;
this file only adds concise Claude Code execution guidance.

For Product, UI, interaction, and runtime behavior, use:

1. the currently connected KiKi Figma inspected directly through the local
   Hopp `figma-bridge`;
2. current merged `main` after PR #279;
3. `docs/specs/product/hackathon-product-contract.md`.

Pre-#279 UI/IA/flow documents, static Figma maps, old screenshots, the former
Netlify reference, closed Issues, and legacy browser suites are historical and
non-authoritative. Tests validate the current Product; they do not define it.

## Before editing

1. Read the current Issue completely.
2. Check current `origin/main`, open PRs, and `git status`.
3. Inspect only the affected implementation, direct consumers, current smoke
   test, and current contract.
4. Keep the requested scope narrow; do not perform repository archaeology.
5. Preserve unrelated changes and never force-push or merge without authority.

## Implementation

- Implement the smallest independently verifiable vertical slice.
- Inspect live Figma directly before changing a visible surface.
- Match current-main typography, spacing, color, imagery, geometry, motion,
  reveal rhythm, feedback, scrolling, and transitions.
- Preserve the current Food Profile → 食旅を見つけ → Result → Story → Route →
  Spot journey and the 食旅を見つけ / モグモグる / お気に入り / マイ Dock.
- Keep ja/en/zh-TW structurally complete for user-facing changes.
- Keep accountless local persistence unless a current Issue explicitly changes
  that boundary.
- Preserve source provenance, verification caveats, licensing, research, and
  fieldwork evidence. Never promote uncertain venue facts to verified data.
- Keep the Tokyo-wide multi-region × multi-food-culture Product boundary;
  Okutama × Tokyo Wasabi remains a demo path only.

Do not restore old Discover-first IA, ranked Top-3 semantics, tutorial
choreography, Netlify-era selectors, or legacy screen composition.

## Validation

For a visible change, manually inspect the affected flow at 375px. Before
finishing, run the current repository checks:

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm exec playwright test e2e/current-mvp-smoke.spec.ts
```

Set `PLAYWRIGHT_PORT=<free-port>` when necessary. Do not modify obsolete tests
to make a current behavior change pass.

Review the final diff for unrelated changes, stale authority language, debug
code, secrets, and regressions. The reviewer verdict is exactly
`No blocking findings.` or a concrete list of blocking findings.

## Handoff

Keep the final handoff concise:

- summary and linked Issue/PR;
- current-main/open-PR preflight;
- validation actually run;
- reviewer verdict;
- material follow-ups only.
