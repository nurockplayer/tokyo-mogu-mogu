# Specs / 仕様書

Lightweight Spec-driven development (SDD) foundation for Tokyo Mogu Mogu.

## What a Spec is / Spec とは何か

A Spec is a **durable behavior contract** that spans multiple Issues. It owns
the long-lived "what" and "why" of a feature area. GitHub Issues stay atomic
execution units; a Spec is not a planning artifact and is not tied to one PR.

## When a Spec is required / Spec が必要な条件

Write a Spec when a feature:

- has durable product or system behavior that several future Issues must agree on, or
- introduces a contract that is expensive or risky to change later (identity, data ownership, cross-module APIs, security/privacy behavior), or
- will be implemented across two or more child Issues.

Do **not** require a Spec for simple maintenance, isolated bug fixes, dependency
updates, or CI / tooling tickets.

Keep the rule set lightweight. Do not expand it into a heavy SDD pipeline that
generates requirements / design / tasks artifacts.

## Roles / 役割分担

- **Spec** (`docs/specs/...`): the durable behavior contract for a feature area.
  Reviewed when created and when it changes.
- **Issue**: one atomic execution slice of the behavior the referenced Spec
  already defines. **References the Spec by path; never duplicates it.**
- **PR**: the implementation of one Issue, reviewed against both the Issue's
  acceptance criteria and the referenced Spec.

## Rules / ルール

- An Issue that depends on durable behavior references the Spec path and does
  not restate the Spec's rules.
- Reviewers check **both** the Issue acceptance criteria **and** the referenced
  Spec.
- If implementation reveals a Spec gap, the Spec change is called out
  explicitly and kept out of the implementation's scope (see the spec-aware
  rules appended to `AGENTS.md` / `CLAUDE.md`).
- Do not invent product behavior that the Spec leaves unresolved; surface it
  instead.

## Current source priority / 現行優先順位

For current product and UX decisions, use the following precedence:

1. **Issue #112** — current Product / MVP framing: tourism dispersion, Tama as
   the first MVP pilot geography, Okutama as the current fieldwork / verified-content
   focus, and evidence-driven food content rather than a permanent Tokyo-Wasabi-only contract.
2. **Issue #92 + KiKi UI/UX IA draft** (`TOKYO_MOGU_MOGU_UIUX仕様案_日本語版.pdf`,
   shared in Slack `#05_plan` on 2026-08-09) — current reusable App IA and repeat-use UX:
   `Home / Discover / MOGU / My`, Food Profile vs per-trip Exploration,
   Recent vs Saved, and distributed Support CTA.
3. `docs/specs/product/approved-ui-fidelity.md` — visual/presentation contract.
4. Older S0–S9 / #85 / #41 material — historical foundation only where it does
   not conflict with #112 or #92.

## Spec list / 仕様一覧

- `docs/specs/product/hackathon-product-contract.md` — current hackathon product
  behavior contract. It must follow #112 for Product/MVP framing and #92 / KiKi
  UI/UX for current App IA. Older `奥多摩 × 東京わさび` and linear S0–S9 wording
  is historical context, not the current exclusive contract.
- `docs/specs/product/approved-ui-fidelity.md` — approved S0–S9 UI fidelity
  contract: durable cross-Issue presentation rules (reference canvas, shared
  header/locale, visual language, component/state hierarchy, per-screen
  presentation, placeholder policy, accessibility). Owns presentation only;
  current behavior/IA stays with #92 and current Product/MVP framing with #112.
- `docs/specs/authentication/google-login.md` — Google authentication and user
  identity contract (SDD foundation for #11, reusable infrastructure).
- `docs/specs/product/badge-contract.md` — `My → Badges` cross-region
  retention/discovery contract: Stretch placement under `My`, digital badge
  state shape, qualifying-action categories, explicit-TBD earning condition,
  MOGU Recent / Saved Routes / Badges semantic separation, and the
  physical-reward boundary. Child Issues #39/#40 reference this.
