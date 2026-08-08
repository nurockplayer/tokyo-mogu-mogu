# AGENTS.md

## Purpose / 目的

Tokyo Mogu Mogu is a discovery and collection experience for Tokyo's Tama area, starting with local food, products, makers, and regional culture such as wasabi and sweets.

The product should make exploring Tama feel like building a field guide or collecting goshuin: users discover places, learn the story behind them, visit or purchase locally, and gradually complete their collection.

Tokyo Mogu Mogu は、多摩地域の食・特産品・作り手・地域文化を「集めながら発見する」体験にするプロジェクトです。わさびやお菓子などを入口に、図鑑や御朱印集めのように現地を巡りたくなるサービスを目指します。

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

1. **Collection before recommendation.** The core experience is discovering and completing a collection, not building another generic tourism search app.
2. **Local story before catalog size.** A smaller set of meaningful places, foods, makers, and stories is better than a large shallow directory.
3. **Drive real-world action.** Features should encourage users to visit, learn, taste, buy, or explore in Tama.
4. **Data must matter.** Open data and other legitimate data sources should support the product itself, not exist only for presentation slides.
5. **Start narrow, design to expand.** MVP content may focus on Okutama or selected Tama areas, while the data model should allow future expansion across Tama.
6. **Japanese residents and international visitors are both valid users.** Do not design the product as foreign-tourist-only unless a ticket explicitly requires it.
7. **Never invent local facts.** Shops, products, stories, opening hours, access information, and public data must be traceable to a source or clearly marked as demo/editorial data.

## MVP Priorities / MVP優先順位

For the hackathon MVP, prioritize work in this order unless an issue states otherwise:

1. A clear discover → visit/experience → collect loop.
2. A simple, reliable data model for places, items, stories, routes, and collection state.
3. A small set of high-quality Tama/Okutama demo content backed by real sources.
4. Mobile-first Japanese/English UX.
5. A convincing end-to-end demo that can be explained with real user and regional value.

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
- Do not implement behavior that contradicts the Spec.
- Do not fill in unresolved product behavior on your own; surface it instead.
- If a Spec change is needed, call it out explicitly as its own change rather than mixing it into implementation scope.
