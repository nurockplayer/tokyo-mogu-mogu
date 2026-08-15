# Product Scope Invariant / プロダクト対象範囲の不変条件

Status: **Current durable Product scope contract**

Tracking decision: Issue #112

## The invariant / 最重要

> **TOKYO MOGU MOGU is a Tokyo-wide, multi-region × multi-food-culture product.**
>
> **TOKYO MOGU MOGU の Product scope は「東京都全域 × 複数地域 × 複数食文化」です。**

The Product is not an Okutama-only, Tama-only, outer-Tokyo-only, or Tokyo-Wasabi-only service. The current tourism-dispersion objective may prioritize under-visited areas of Tokyo, but that objective does not redefine the durable Product domain.

Product は奥多摩専用、多摩専用、23区外専用、東京わさび専用のサービスではありません。現在の Product objective として 23 区への観光集中を緩和し、まだ知られていない地域への `行きたい理由` を作ることを重視しますが、その優先課題によって Product domain 自体を狭めません。

## 2026-08-23 Hackathon demo boundary / デモ境界

For delivery stability, the 2026-08-23 Hackathon submission may use exactly one small deterministic demo journey:

> **Hackathon Demo Golden Path: Okutama × Tokyo Wasabi**
>
> **ハッカソン Demo Golden Path: 奥多摩 × 東京わさび**

This is only:

- demo content selection
- demo data/content freeze
- deterministic E2E golden path
- deadline-driven delivery optimization

It is **not**:

- the Product geographic scope
- the Product FoodCulture scope
- the only valid recommendation outcome
- a shared schema or architecture boundary
- the only future roadmap geography

`canonical`, `pilot`, or `frozen` wording must be explicitly scoped to the **demo data/content/golden path** when it refers to Okutama × Tokyo Wasabi.

## Product model / プロダクトモデル

The durable model assumes multiple Tokyo regions and multiple food cultures:

```text
TOKYO MOGU MOGU
├─ Region A
│  ├─ FoodCulture A
│  └─ FoodCulture B
├─ Region B
│  ├─ FoodCulture C
│  └─ FoodCulture D
└─ ... across Tokyo

2026-08-23 demo
└─ Okutama × Tokyo Wasabi
```

Food is the entry point that can connect a traveler to a region's land, water, people, history, culture, and experiences. The current Product objective is to turn that connection into a reason to visit parts of Tokyo that receive less tourism attention.

## Architecture invariant / アーキテクチャ不変条件

Shared contracts must not encode Okutama or Tokyo Wasabi as Product-wide semantics.

This applies to:

- `Region`
- `FoodCulture`
- `Place`
- `Route`
- recommendation candidate selection / ranking
- routing and navigation
- persistence
- i18n
- data provenance / verification
- shared UI components

Practical architecture test:

> If a future verified journey such as `青梅 × 日本酒`, `八王子 × 地域野菜`, or another Tokyo Region × FoodCulture is added, shared Product contracts should not require redesign. The new journey should be representable primarily by adding data/content/configuration.

This invariant does **not** require implementing a second region before 2026-08-23 and does not authorize premature generic-platform, CMS, marketplace, or nationwide-route-engine work.

## Recommendation invariant / 推薦ロジック

The durable recommendation contract selects among Region × FoodCulture / journey candidates. It must not assume Tokyo Wasabi is the only possible result.

The Hackathon demo ships two production-ready candidates (Okutama × Tokyo Wasabi primary, Ome/Sawai × sake secondary); the fixed golden-path answers match only the wasabi profile, so it returns Okutama × Tokyo Wasabi deterministically. That deterministic result is a **demo behavior**, not a Product-domain rule.

## Terminology guardrail / 用語ルール

Preferred:

- `Hackathon Demo Golden Path: Okutama × Tokyo Wasabi`
- `8/23 Demo Content Freeze`
- `demo canonical dataset`
- `Okutama fieldwork / demo-content focus`

Avoid as current normative wording:

- `Frozen Journey = Okutama × Tokyo Wasabi`
- `MVP = Okutama × Tokyo Wasabi`
- `Tama / Okutama is the Product scope`
- `Tokyo Wasabi is the canonical Product journey`
- `outer Tokyo is the permanent Product domain`

## Source priority

For geographic / FoodCulture scope questions:

1. This Spec + Issue #112
2. `docs/specs/product/hackathon-product-contract.md`
3. Issue #92 / KiKi current App IA for navigation and interaction behavior
4. current Hackathon demo/data Issues such as #127
5. historical #85 / #41 / S0-S9 material only as history or visual foundation

A narrow demo Issue can constrain **what ships by 8/23**, but cannot silently narrow this durable Product scope.
