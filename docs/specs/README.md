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

- **Slack / discussion**: exploration, questions, ideas, and team conversation.
  Decisions that affect implementation must not live only in a Slack thread.
- **Decision Issue**: records a product / IA / architecture decision while it is
  being discussed. After the decision is accepted, update the durable Spec and
  keep the Issue as decision history rather than the permanent canonical contract.
- **Spec** (`docs/specs/...`): the current durable behavior contract for a feature
  area. Reviewed when created and when it changes.
- **Implementation Issue**: one atomic execution slice of behavior already
  defined by the current contract. It references the Spec instead of duplicating it.
- **PR**: the implementation of one Issue, reviewed against both the Issue's
  acceptance criteria and the referenced Spec.

## Progressive specification / 段階的な仕様確定

Product, IA, and design can still be evolving while implementation proceeds.
Do not force a false choice between "wait for every decision" and "pretend every
current assumption is final". Record the current maturity explicitly:

- **Stable**: low-regret behavior or foundation that is unlikely to be invalidated
  by normal product changes. Normal implementation may proceed.
- **Provisional**: the current best assumption is good enough to implement, but
  may still change. Implementation must be **bounded, reversible, and low-rework**,
  and the assumption must be stated explicitly in the Issue / PR.
- **Frozen**: agreed for the current release / Hackathon submission. Do not
  reinterpret it during implementation unless a blocker or explicit product
  decision reopens the contract.

Under uncertainty, prefer the **smallest reversible vertical slice**. Do not
build irreversible architecture, schema, safety, privacy, or shared-API choices
from a Provisional assumption.

A Provisional slice is appropriate only when:

1. most of the implementation remains useful if the assumption changes,
2. the assumption and fallback boundary can be named clearly, and
3. the likely rework cost is acceptable relative to the deadline.

If those conditions are not true, surface the decision instead of coding around
it.

## Decision lifecycle / 意思決定の流れ

Use this lifecycle for material Product / IA decisions:

`Slack discussion → Decision Issue → team decision → update durable Spec → implementation Issues → PR`

Decision Issues preserve the history of why a choice was made. Once accepted,
the durable result should be written into the relevant Spec so agents and
humans do not need to reconstruct the current contract from a chain of old
Issues.

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
- If a Provisional assumption changes, update the current Spec / implementation
  Issue rather than rewriting closed Issue or PR history.
- Optimize for **merged throughput**, not the number of parallel branches or PRs.
  When Review / integration is backing up, finish or merge active work before
  opening more overlapping work.
- For a canonical current-contract document, prefer at most one active PR that
  materially rewrites that document at a time.

## Current source priority / 現行優先順位

For current product and UX decisions, use the following precedence:

1. **Issue #112** — current Product / MVP framing: tourism dispersion, Tama as
   the first MVP pilot geography, Okutama as the current fieldwork / verified-content
   focus, and evidence-driven food content rather than a permanent Tokyo-Wasabi-only contract.
2. **Issue #92 + KiKi UI/UX IA draft** (`TOKYO_MOGU_MOGU_UIUX仕様案_日本語版.pdf`,
   shared in Slack `#05_plan` on 2026-08-09) — current reusable App IA and repeat-use UX:
   `Home / Discover / MOGU / My`, Food Profile vs per-trip Exploration,
   Recent vs Saved, and distributed Support CTA.
3. **Latest approved KiKi Figma for each screen** — when one exists, it is the
   highest-priority visual / interaction implementation source for that screen.
   Engineering agents implement the approved design rather than independently
   redesigning or reinterpreting the UX.
4. `docs/specs/product/approved-ui-fidelity.md` and the current design spec —
   fallback visual / presentation guidance where an approved Figma for a screen
   is not yet available.
5. Older S0–S9 / #85 / #41 material — historical foundation only where it does
   not conflict with #112, #92, or an approved Figma.

The current priority above is transitional while #112 / #92 decisions are being
fully reflected into durable Specs. After that alignment lands, implementation
Issues should prefer the canonical Spec path over reconstructing behavior from
the decision-Issue chain.

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
