# AGENTS.md

## Purpose / 目的

Tokyo Mogu Mogu は、東京の食文化を「おいしい」を入口に、旅行者と未来に残したい食文化をつなぐ mobile-first なプロジェクトです。

**Current Product positioning (Issue #85)**: create reasons for travelers
concentrated in Tokyo's 23 wards to discover outer-Tokyo regions. Regional food
culture is the primary entry point for `Discover → Understand → Visit → Act →
Discover next region`. This durable positioning does not make Okutama or Tama
the Product's permanent geographic scope.

**Current Hackathon contract (Issue #41, approved S0-S9 UI)**: the core journey
is S0 Landing → S1 Dietary Restrictions → S2 Preference Diagnosis → S3
Diagnosis Result → S4 Food Culture Story → S5 Model Route → S6 Spot Detail →
S7 Support Actions → S8 My Route. **奥多摩 × 東京わさび** is the first pilot
and only required real content for 2026-08-23, with inbound international
travelers as the primary persona and an accountless, deterministic,
Japanese-default demo. See `docs/specs/product/hackathon-product-contract.md`.

**Legacy framing**: the earlier "discovery and collection / field guide /
goshuin" framing (collection-first Pokédex, geolocation check-in, `GET!`) is
reusable infrastructure, not the current product direction.

## Language / 言語

This repository is developed with Japanese and international collaborators.

- Code identifiers, APIs, schemas, configuration keys, code comments, and commit messages: **English**.
- GitHub Issues, Pull Requests, and technical documentation: **English or Japanese**.
- Important architecture decisions, cross-team rules, and major handoffs: prefer **English plus a short Japanese summary**.
- User-facing product copy: prepare **Japanese and English** unless the issue explicitly limits scope to one language.
- Chinese may be used for private notes, but it must not be the only language used for shared repository artifacts.
- Keep Japanese natural and concise. Do not ship literal machine-translated copy without review.

このリポジトリでは、英語を技術上の共通言語としつつ、日本語でのチーム協働を前提とします。重要な仕様・判断は、日本語話者と英語話者のどちらにも伝わる状態を維持してください。

## Product Principles / プロダクト原則

> Issue #85 governs durable Product positioning. Issue #41 and the approved
> S0-S9 UI govern the Hackathon journey. The product contract records both
> layers and wins where older repository material conflicts.

1. **Story and support before collection.** The core experience is leading
   users from knowing a food culture to acting on it (eat / buy / visit /
   reserve / share); collection (S9 Badge) is stretch work, not the primary
   journey.
2. **Local story before catalog size.** A smaller set of meaningful places, foods, makers, and stories is better than a large shallow directory.
3. **Drive real-world action.** Features should encourage users to visit,
   learn, taste, buy, or explore outer-Tokyo regions.
4. **Data must matter.** Open data and other legitimate data sources should support the product itself, not exist only for presentation slides.
5. **Start narrow, design to expand.** MVP content focuses on 奥多摩 × 東京わさび,
   while `Region`, `FoodCulture`, `Place`, and `Route` remain able to represent
   future outer-Tokyo regions without premature platform abstractions.
6. **Primary persona is the inbound traveler.** The hackathon UI targets the
   inbound international traveler (rep. persona: Taiwanese, 30s, Shinjuku
   base). Japanese deep-travel users are a secondary / future audience and do
   not replace the primary persona.
7. **Never invent local facts.** Shops, products, stories, opening hours, access information, and public data must be traceable to a source or clearly marked as demo/editorial data.
8. **Dietary input is recommendation-only.** S1 dietary-restriction input is
   used only for recommendation / match reasons and must never be presented as
   a verified safety guarantee (see the product contract's safety boundary).

## MVP Priorities / MVP優先順位

For the hackathon MVP, prioritize work in this order unless an issue states otherwise:

1. The S0-S8 core journey: diagnosis → story → model route → support action →
   saved route (奥多摩 × 東京わさび).
2. A simple, reliable data model for places, items, stories, routes, and (local)
   saved-itinerary state.
3. A small set of high-quality 奥多摩 × 東京わさび demo content backed by real
   sources or clearly marked as demo/editorial.
4. Mobile-first UX with Japanese primary copy and a ja/en/zh-TW i18n
   architecture.
5. A convincing end-to-end demo that can be explained with real user and
   regional value — accountless, deterministic, and geolocation-independent.

Avoid adding authentication, payments, social graphs, complex recommendation systems, or infrastructure that is not required for the end-to-end MVP.

## Engineering Principles / 開発原則

- Prefer the **smallest independently verifiable vertical slice**, not the smallest possible code diff.
- Optimize for merged value and parallel progress. Do not over-split work into tickets that repeatedly require the same repository context.
- Keep solutions simple and reversible. Hackathon speed does not justify opaque or fragile code.
- Follow existing project conventions before introducing new frameworks, libraries, folders, or abstractions.
- Do not perform unrelated refactors while implementing a ticket.
- Do not commit secrets, private credentials, personal data, or generated local environment files.
- Never force-push shared branches.
- Do not delete or overwrite human work unless the task explicitly requires it.

## Issue and Branch Workflow / Issue・Branch運用

Before implementation:

1. Read this file and the relevant issue.
2. Inspect related code, data, docs, and open PRs before changing anything.
3. Confirm the ticket is independently implementable and not already covered elsewhere.
4. Identify dependencies and potential file overlap before parallelizing work.

Recommended branch naming:

- `feat/<issue>-<short-name>`
- `fix/<issue>-<short-name>`
- `docs/<issue>-<short-name>`
- `chore/<issue>-<short-name>`

Keep one clear implementation concern per PR. Link the issue and include validation evidence.

## Parallel Agent Work / 並列Agent作業

Parallel work is encouraged only when tasks are genuinely independent.

- Give each agent a clearly bounded outcome and acceptance criteria.
- Avoid assigning multiple agents to overlapping files unless one agent owns integration.
- Prefer vertical slices that can be tested and merged independently.
- Do not create sub-tasks only to make work look parallel.
- The integrating agent is responsible for resolving contract mismatches between parallel changes.

## Data and Sources / データと出典

When adding external or open data, preserve traceability where practical:

- source name
- source URL or dataset identifier
- license or usage constraints when relevant
- retrieval or last-verified date when the information can change

Distinguish clearly between:

- verified source data
- team-authored editorial content
- temporary demo fixtures or placeholders

If data quality is uncertain, surface the uncertainty instead of silently converting it into fact.

## UX and i18n / UX・多言語

- Design mobile-first unless a ticket explicitly targets another form factor.
- Keep Japanese and English content structurally equivalent, but allow natural wording rather than word-for-word translation.
- Do not hard-code translatable UI copy deep inside business logic.
- Consider text expansion, Japanese line wrapping, and accessibility when building layouts.
- User-visible dates, locations, and transport information must be unambiguous.

## Validation / 検証

Before declaring work complete:

- Run the relevant tests, type checks, linting, and build commands available in the repository.
- Test the changed user flow, not only isolated functions.
- Verify Japanese and English UI when user-facing copy changed.
- Confirm external data still points to a traceable source.
- Check that no unrelated files, secrets, debug output, or local artifacts were included.

If a validation step cannot be run, state exactly what was not verified and why.

## Definition of Done / 完了条件

A ticket is done when:

- its acceptance criteria are satisfied,
- the implementation is independently verifiable,
- relevant validation passes,
- user-facing copy is handled in the required languages,
- source-backed data remains traceable,
- documentation is updated when behavior or contracts changed,
- and the PR contains no unrelated scope.

## Decision Rule / 判断基準

When requirements are incomplete, choose the **smallest reversible assumption that preserves the product goal**, document the assumption, and avoid creating unnecessary infrastructure.

When product intent conflicts with implementation convenience, protect the product intent first.

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
