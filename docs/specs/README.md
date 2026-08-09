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

## Spec list / 仕様一覧

- `docs/specs/product/hackathon-product-contract.md` — current hackathon product
  contract: durable Product positioning per Issue #85 plus the S0–S9 first
  pilot (奥多摩 × 東京わさび), accountless demo, and dietary safety boundary
  per Issue #41. Child Issues #42–#49 reference this.
- `docs/specs/product/approved-ui-fidelity.md` — approved S0–S9 UI fidelity
  contract: durable cross-Issue presentation rules (reference canvas, shared
  header/locale, visual language, component/state hierarchy, per-screen
  presentation, placeholder policy, accessibility). Owns presentation only;
  behavior stays with the hackathon product contract. Child Issues #77–#82
  reference this.
- `docs/specs/authentication/google-login.md` — Google authentication and user
  identity contract (SDD foundation for #11, reusable infrastructure).
