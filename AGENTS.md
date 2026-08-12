# AGENTS.md

## Purpose / 目的

Tokyo Mogu Mogu は、東京の食文化を「おいしい」を入口に、旅行者と未来に残したい食文化をつなぐ mobile-first なプロジェクトです。

## Product Scope Invariant / 最重要・誤解禁止

**Read this before interpreting any MVP, pilot, canonical, frozen, Tama, Okutama, or Tokyo-Wasabi wording.**

> **TOKYO MOGU MOGU is a Tokyo-wide, multi-region × multi-food-culture product.**
>
> **TOKYO MOGU MOGU の Product scope は「東京都全域 × 複数地域 × 複数食文化」です。**

The Product is **not** permanently limited to outer Tokyo, Tama, Okutama, or Tokyo Wasabi. The current tourism-dispersion objective prioritizes creating reasons to visit less-visited Tokyo regions, but that objective does not narrow the durable Product domain.

For the 2026-08-23 Hackathon, implementation may deliberately converge on exactly one small deterministic demo:

> **Hackathon Demo Golden Path: Okutama × Tokyo Wasabi**
>
> **ハッカソン Demo Golden Path: 奥多摩 × 東京わさび**

This is only a **demo content/data freeze and E2E golden path**. It is not the Product geographic scope, Product FoodCulture scope, recommendation domain, shared schema boundary, or future roadmap boundary. When `canonical`, `pilot`, or `frozen` is used for Okutama × Tokyo Wasabi, it must be explicitly scoped to the **demo data/content/golden path**.

Shared `Region`, `FoodCulture`, `Place`, `Route`, recommendation logic, routing, persistence, i18n, provenance, and shared UI must remain reusable for another Tokyo Region × FoodCulture without redesigning the shared contract. A future verified example such as `青梅 × 日本酒` or `八王子 × 地域野菜` should be representable primarily by adding data/content/configuration. This does **not** require implementing another region before 8/23 or building a premature generic platform/CMS.

Canonical durable scope Spec: `docs/specs/product/product-scope-invariant.md` (Issue #112 decision record).

**Current Product / MVP framing (Issue #112)**: create reasons for travelers concentrated in Tokyo's 23 wards to discover under-visited Tokyo regions. Regional food culture is the primary entry point for `Discover → Understand → Visit → Act → Discover next region`. The top current problem is tourism concentration in the 23 wards. Tama / Okutama are current research, fieldwork, and demo-content contexts; they are not the permanent Product domain. Tokyo Wasabi is the 8/23 demo golden-path content, not the exclusive Product contract.

**Current App IA / UX behavior (Issue #92 + KiKi approved UI/UX design draft)**: the persistent primary navigation is `Home / Discover / MOGU / My`. Food Profile is stable / persistent user data; Exploration Conditions are per-trip; MOGU Recent is system-managed recommendation history and is **not** My Saved; Support is distributed as Story / Route / Spot CTAs (no standalone primary page); `My Route` is `My → Saved Routes`; Badge is `My → Badges` and remains Stretch. The latest approved KiKi Figma for a screen is the highest-priority visual / interaction implementation source; when one exists, implement it rather than redesigning or reinterpreting the UX. See `docs/specs/product/product-scope-invariant.md`, `docs/specs/product/hackathon-product-contract.md`, and `docs/specs/README.md` for the current source priority.

**Legacy framing**: the earlier "discovery and collection / field guide / goshuin" framing (collection-first Pokédex, geolocation check-in, `GET!`) is reusable infrastructure, not the current product direction.

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

> `docs/specs/product/product-scope-invariant.md` + Issue #112 govern durable Product scope and the 8/23 demo boundary. Issue #92 + the KiKi approved UI/UX design draft govern current App IA / UX behavior. The latest approved KiKi Figma for a screen is the visual / interaction implementation source for that screen; where Figma is not yet available, `docs/specs/product/approved-ui-fidelity.md` is the fallback presentation reference. Older #85 / #41 / S0-S9 material is historical foundation and wins only where it does not conflict with the sources above.

1. **Story and support before collection.** The core experience is leading users from knowing a food culture to acting on it (eat / buy / visit / reserve / share); collection (Badge, Stretch) is stretch work, not the primary journey.
2. **Local story before catalog size.** A smaller set of meaningful places, foods, makers, and stories is better than a large shallow directory.
3. **Drive real-world action.** Features should encourage users to visit, learn, taste, buy, or explore Tokyo regions, with the current tourism-dispersion objective prioritizing less-visited areas.
4. **Data must matter.** Open data and other legitimate data sources should support the product itself, not exist only for presentation slides.
5. **Demo narrow, Product broad.** The durable Product scope is Tokyo-wide, multi-region × multi-food-culture. The 8/23 demo may ship only Okutama × Tokyo Wasabi. Demo content may be frozen without freezing Product scope. `Region`, `FoodCulture`, `Place`, and `Route` remain able to represent other Tokyo regions and cultures without premature platform abstractions.
6. **Primary persona is the inbound traveler.** The hackathon UI targets the inbound international traveler (rep. persona: Taiwanese, 30s, Shinjuku base). Japanese deep-travel users are a secondary / future audience and do not replace the primary persona.
7. **Never invent local facts.** Shops, products, stories, opening hours, access information, and public data must be traceable to a source or clearly marked as demo/editorial data.
8. **Dietary input is recommendation-only.** Dietary-restriction input (the Food Profile) is used only for recommendation / match reasons and must never be presented as a verified safety guarantee (see the product contract's safety boundary).

## MVP Priorities / MVP優先順位

For the hackathon MVP, prioritize work in this order unless an issue states otherwise. The current journey and navigation follow #92: persistent primary nav is `Home / Discover / MOGU / My`; the core release path is `Home → Food Profile (first use) → Exploration → Result → Story → Route → Spot → Save → My`; Discover (free exploration) and MOGU Recent are supporting core surfaces; Badge and other Stretch work are non-blocking.

1. Keep the core demo runnable on `main`, then review / merge completed core work before opening more parallel work.
2. Integrate verified fieldwork content and approved KiKi Figma deltas, and fix release-blocking UX / QA defects, before starting non-blocking work.
3. A simple, reliable data model for places, items, stories, routes, and (local) saved-itinerary state.
4. A small, high-quality **8/23 demo content set**. Okutama × Tokyo Wasabi may be the only real demo journey, but must remain demo-scoped rather than a Product-domain rule.
5. Mobile-first UX with Japanese primary copy and a ja/en/zh-TW i18n architecture.
6. A convincing end-to-end demo that can be explained with real user and regional value — accountless, deterministic, and geolocation-independent.

A deterministic, coherent prototype is preferred over a more general but unfinished implementation.

Avoid adding authentication, payments, social graphs, complex recommendation systems, or infrastructure that is not required for the end-to-end MVP.

## Hackathon Delivery Mode / ハッカソン納期モード

Until the 2026-08-23 submission, optimize for **merged demo readiness**, not issue count or architectural completeness.

Priority order:

1. Keep the core demo runnable on `main`.
2. Review / merge completed core work before starting more parallel work.
3. Integrate verified fieldwork content and approved KiKi Figma deltas.
4. Fix release-blocking UX / QA defects.
5. Only then start non-blocking / Stretch implementation (e.g. Badge, physical reward, speculative research-driven features, new infrastructure not required for the demo).

Once an approved KiKi Figma screen exists for a screen, engineering agents **implement the approved design**; they do not independently redesign or reinterpret the UX. Escalate back to Product / Design only for a concrete blocker: an impossible or contradictory interaction, an accessibility blocker, verified data that cannot fit the design, or a broken core demo flow. Otherwise choose the smallest reversible implementation and keep delivery moving.

Hackathon Delivery Mode may narrow **what ships**, but must never be interpreted as narrowing the durable Product scope. The single Okutama × Tokyo Wasabi golden path is a delivery constraint, not a Product-domain decision.

## Engineering Principles / 開発原則

- Prefer the **smallest independently verifiable vertical slice**, not the smallest possible code diff.
- Optimize for merged value and parallel progress. Do not over-split work into tickets that repeatedly require the same repository context.
- Keep solutions simple and reversible. Hackathon speed does not justify opaque or fragile code.
- Follow existing project conventions before introducing new frameworks, libraries, folders, or abstractions.
- **Shared-contract impact check**: before changing shared shell/layout, global CSS/tokens, common primitives, routing, persistence, schemas/types, geometry constants, or shared APIs, identify downstream assumptions — search relevant consumers, tests, duplicated constants/magic numbers, calculations, and documented contracts. Principle: before changing a shared assumption, identify who depends on it.
- **Demo-scope impact check**: before introducing `Okutama`, `Tama`, `Wasabi`, `pilot`, `canonical`, or `frozen` semantics into shared code/contracts, verify the wording/logic is demo-scoped and does not narrow `docs/specs/product/product-scope-invariant.md`.
- Do not perform unrelated refactors while implementing a ticket.
- Do not commit secrets, private credentials, personal data, or generated local environment files.
- Never force-push shared branches.
- Do not delete or overwrite human work unless the task explicitly requires it.

## Issue and Branch Workflow / Issue・Branch運用

Before implementation:

1. Read this file and the relevant issue.
2. Read `docs/specs/product/product-scope-invariant.md` for any Product, Region, FoodCulture, recommendation, pilot/demo, or data-model work.
3. **Live-state preflight**: verify the current Issue/spec/dependency/open-PR state and `origin/main`. Route execution based on the CURRENT contract state, not the Issue title or an earlier session's assumption.
4. Inspect related code, data, docs, and open PRs before changing anything.
5. Confirm the ticket is independently implementable and not already covered elsewhere.
6. **Dependency hard gate**: if a required dependency is not yet present on the intended base branch, STOP before implementation and report the task as blocked. Do NOT merge a prerequisite PR merely to unblock your own task unless this task explicitly grants merge authority.
7. Identify dependencies and potential file overlap before parallelizing work.

A bounded implementation whose contract is established can use the routine implementation path. Escalate when the contract is unresolved or the task requires a materially irreversible architecture / schema / security / privacy / shared-API decision.

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

Demo data may be canonical **for the 8/23 golden path** without becoming canonical for the Product domain.

## UX and i18n / UX・多言語

- Design mobile-first unless a ticket explicitly targets another form factor.
- Keep Japanese and English content structurally equivalent, but allow natural wording rather than word-for-word translation.
- Do not hard-code translatable UI copy deep inside business logic.
- Consider text expansion, Japanese line wrapping, and accessibility when building layouts.
- User-visible dates, locations, and transport information must be unambiguous.
- Do not use Okutama/Wasabi-specific labels as reusable component names when the component represents a Product-wide concept.

## Validation / 検証

Before declaring work complete:

- Run the relevant tests, type checks, linting, and build commands available in the repository.
- Test the changed user flow, not only isolated functions.
- Verify Japanese and English UI when user-facing copy changed.
- Confirm external data still points to a traceable source.
- Check that no unrelated files, secrets, debug output, or local artifacts were included.
- For Product/data/recommendation work, check that Okutama × Tokyo Wasabi remains demo-scoped and that another Tokyo Region × FoodCulture would not require redesigning shared contracts.

If a validation step cannot be run, state exactly what was not verified and why.

Validation is risk-based (Issue #137). The CI `Quality Gates` job classifies each change with the repository-owned classifier (`scripts/ci/classify-changes.sh`) instead of running every gate on every PR:

- **docs / policy-only** — documentation, issue/PR templates, CI workflows, and agent guidance: `git diff --check` plus a focused review of the changed docs and the referenced contract. No dependency install, unit tests, build, or Playwright.
- **normal runtime** — `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build`.
- **core-risk** — core journey / routing / persistence / shared interaction changes, including the E2E contract itself: the normal runtime gates plus the 375px Japanese Golden-path Playwright E2E.

The classifier is conservative: unknown paths are treated as runtime, and one core-risk path makes the whole change core-risk. The Golden-path E2E never reruns the TypeScript typecheck that Quality Gates already owns.

## Focused Review / レビュー範囲

Review only the diff, the Issue acceptance criteria, referenced contracts/specs, and regressions plausibly introduced by the diff. Do not perform a broad unrelated repository audit. Blocking findings require concrete evidence. The final verdict must be either blocking findings or exactly `No blocking findings.` Do not spend review budget investigating unrelated pre-existing issues.

A blocking finding must be release-, contract-, security/privacy-, data-semantics-, persistence-, accessibility-, or concrete regression-relevant. Unrelated historical wording or low-risk cleanup is a follow-up, not a reason to widen every PR.

A Product-scope regression is contract-relevant: shared runtime or current normative docs must not turn the 8/23 demo golden path into the durable Product domain.

## Definition of Done / 完了条件

A ticket is done when:

- its acceptance criteria are satisfied,
- the implementation is independently verifiable,
- relevant validation passes,
- user-facing copy is handled in the required languages,
- source-backed data remains traceable,
- documentation is updated when behavior or contracts changed,
- Product/data/recommendation changes preserve the Tokyo-wide multi-region × multi-food-culture invariant,
- and the PR contains no unrelated scope.

## Decision Rule / 判断基準

When requirements are incomplete, choose the **smallest reversible assumption that preserves the product goal**, document the assumption, and avoid creating unnecessary infrastructure.

When product intent conflicts with implementation convenience, protect the product intent first.

A deadline may justify a narrower demo implementation, but never silently converts that demo into the durable Product scope.

## Spec-aware Execution / Spec準拠の実行

When an Issue references a Spec under `docs/specs/`:

- Read the referenced Spec before implementing.
- For Product scope, Region/FoodCulture boundaries, recommendation candidates, pilot/demo semantics, or data-model extensibility, read `docs/specs/product/product-scope-invariant.md` first.
- The current hackathon behavior contract is `docs/specs/product/hackathon-product-contract.md`, aligned with Issue #112 (Product scope/demo boundary) and Issue #92 / the KiKi approved UI/UX design draft (current App IA). Issue #85 / #41 and S0–S9 are historical foundation, not the current execution contract.
- Do not implement behavior that contradicts the Spec.
- Do not fill in unresolved product behavior on your own; surface it instead.
- If a Spec change is needed, call it out explicitly as its own change rather than mixing it into implementation scope.
