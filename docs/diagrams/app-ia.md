# TOKYO MOGU MOGU — Current App IA（現行アプリ情報設計）

## 概要 / Overview

この文書は GitHub ネイティブの Mermaid で、TOKYO MOGU MOGU の **current App IA** を図示する canonical ドキュメントです。

Source of truth：

- Issue #92（reusable `Home / Discover / MOGU / My` の current App IA）
- `docs/specs/product/hackathon-product-contract.md`（Current App IA / S0–S9 mapping / Architecture・Data Boundary）
- `docs/specs/product/approved-ui-fidelity.md`（S0–S9 → App IA mapping）
- `docs/specs/product/product-scope-invariant.md`（Product scope / architecture invariant）
- `src/app/AppShell.tsx`（常設ボトムナビ / persistent bottom nav）
- `src/app/AppRouter.tsx`（ルートテーブル / route table）

図と prose は上記が述べている内容のみを表現し、新しい UX / Product 挙動を発明しません。日本語をデフォルトとし、Product 用語は英語表記を併記します。

---

## 1. Persistent Primary Navigation / 常設プライマリーナビゲーション

Persistent primary navigation は **`Home / Discover / MOGU / My`**（`src/app/AppShell.tsx` の `tmm-nav`）。各タブは 1 つの separation of user information を所有します。

```mermaid
flowchart TB
    HOME["ホーム / Home"]
    DISCOVER["さがす / Discover"]
    MOGU["MOGU"]
    MY["マイ / My"]

    HOME --> H["新しいパーソナライズ推薦の開始地点<br/>Home = recommend for me<br/>primary CTA が current-trip の Exploration を開始<br/>初回: Food Profile → Exploration<br/>リピーター: 保存済み Food Profile を再利用"]
    DISCOVER --> D["診断なしの自由探索<br/>Discover = I browse myself<br/>source-backed な Region × FoodCulture / Story / Route を閲覧<br/>default release は奥多摩 + #163 青梅・沢井 secondary slice を表示<br/>#171 release config で secondary の露出を外せる<br/>breadth のための fake candidate は追加しない"]
    MOGU --> M["system-managed の最近のおすすめ / MOGU Recent（favorites ではない）<br/>最大 5 件・自動記録（MOGU_RECENT_MAX = 5）<br/>Result → Story → Route → Spot の文脈を再オープン<br/>Saved / Favorites とは別 semantic・別 persistence"]
    MY --> Y["ユーザー管理の永続コンテンツ / 設定<br/>Saved Routes + Food Profile（編集可）+ Badges（Stretch のみ）<br/>保存した Route は Story / Spot へ戻る<br/>Saved Story / Saved Spot コレクションは MVP に存在しない"]
```

**Support は分散 CTA、Legacy nav は superseded**：S7 Support Hub は単独の primary page を持たず、Story / Route / Spot に分散した support CTA として実装されます。`/support` は direct URL のみで到達可能です。旧ナビ `Home / Diagnosis / Support / My Route` は superseded で、履歴 / 互換性のため direct URL のみ保持されます。

---

## 2. S0–S9 → Current App IA Mapping / 履歴画面の現在配置

S0–S9 は履歴的な journey framing です。Issue #92 はこれらを current App IA へ以下のように再配置します（authoritative mapping table）。

```mermaid
flowchart LR
    S0["S0 Landing"] --> H["Home 初回状態 / first-time state"]
    S1["S1 Dietary"] --> FP["初回 Food Profile<br/>以降は My から編集"]
    S2["S2 Preference"] --> EC["探索条件 / per-trip Exploration Conditions"]
    S3["S3 Result"] --> R["即時 Result<br/>+ MOGU に自動追加"]
    S4["S4 Story"] --> STORY["Result の content layer<br/>Discover からも到達可能"]
    S5["S5 Route"] --> ROUTE["推薦ルート / recommended journey<br/>My に保存可能"]
    S6["S6 Spot"] --> SPOT["実用情報 + 外部アクション<br/>Route / Discover から到達可能"]
    S7["S7 Support"] --> SUP["Story / Route / Spot に分散 CTA<br/>単独の primary page なし"]
    S8["S8 My Route"] --> SAVED["My → Saved Routes"]
    S9["S9 Badge"] --> BADGE["My → Badges（Stretch のみ）"]
```

---

## 3. First-time / Returning Journey + MOGU Recent / 初回・リピーターの流れ

Issue #92 の First-time / Returning flow です。Result 作成時は MOGU Recent に自動追加され、MOGU からはその `Result → Story → Route → Spot` の文脈を再オープンできます（Back nav は MOGU へ戻り、新しい診断には向かいません）。

```mermaid
flowchart LR
    START(["Home"]) --> NEXT{"保存済み Food Profile はある？"}
    NEXT -->|"初回 / first-time（なし）"| FP["Food Profile（S1）"]
    NEXT -->|"リピーター / returning（あり）"| EX
    FP --> EX["Exploration / 探索条件（S2）"]
    EX --> RES["Result（S3）"]
    RES --> RM["MOGU Recent に自動記録（最大 5）"]
    RES --> STORY["Story（S4）"]
    STORY --> ROUTE["Route（S5）"]
    ROUTE --> SPOT["Spot（S6）"]
    ROUTE --> SAVED["My → Saved Routes に保存（明示操作のみ）"]
    MOGU["MOGU"] --> REOPEN["Result → Story → Route → Spot を再オープン"]
```

> Implementation detail（`src/pages/HomePage.tsx`）：Home の primary CTA は、保存済み Food Profile が存在しない場合 `/food-profile` へ、存在する場合 `/explore` へ遷移します。Recent 履歴（MOGU）は Home には重複表示されません。

---

## 4. Architecture Invariant / アーキテクチャ不変条件

- 本 IA は **Okutama / Wasabi 専用ではありません**。shared IA / routing / persistence / i18n / provenance は geography-independent で、複数の Tokyo Region × FoodCulture を扱えます。
- 奥多摩 / 東京わさび の hard-code は demo fixtures / demo canonical content / demo tests にのみ存在します。
- 新しい検証済み Region × FoodCulture（例：青梅 × 日本酒、八王子 × 地域野菜）は主に data / content / configuration の追加で表現可能で、shared contract の redesign を必要としません。
- Okutama × Tokyo Wasabi は **2026-08-23 Hackathon Demo Golden Path のみ**であり、Product domain を狭めません。

---

## 5. Route Table（参考）/ ルートテーブル

`src/app/AppRouter.tsx` のルートテーブルと、current App IA 上の役割（primary-nav destination / direct URL のみ / legacy）。

| Route | Page | App IA 上の役割 |
|---|---|---|
| `/` | LandingPage | Home 初回状態（S0、primary nav） |
| `/home` | HomePage | Home 開始地点（legacy route / fallback） |
| `/discover` | DiscoverPage | Discover（primary nav） |
| `/mogu` | MoguPage | MOGU（primary nav） |
| `/my` | MyPage | My（primary nav） |
| `/explore` | ExplorationWizardPage | Exploration / 探索条件（S2） |
| `/explore/result` | ResultPage | Result（S3） |
| `/food-profile`・`/food-profile/edit` | FoodProfilePage | Food Profile（S1、My から編集可） |
| `/story/:foodCultureId`・`/story` | StoryPage | Story（S4） |
| `/route` | RoutePage | Route（S5） |
| `/spot/:placeId` | SpotPage | Spot（S6） |
| `/support` | SupportPage | Support（S7、direct URL のみ） |
| `/my-route` | MyRoutePage | 旧 My Route（S8、direct URL のみ） |
| `/badges` | BadgesPage | Badges（S9、Stretch） |
| `/pokedex`・`/map`・`/food-cultures/:id` | PokedexPage / MapPage / FoodCulturePage | legacy（superseded） |

---

## 6. Sources / 参照元

- GitHub Issue #92 — current App IA（`Home / Discover / MOGU / My`）と S0–S9 mapping
- `docs/specs/product/hackathon-product-contract.md` — Current App IA / S0–S9 mapping / Architecture・Data Boundary / Account・Persistence
- `docs/specs/product/approved-ui-fidelity.md` — S0–S9 → App IA mapping / fallback presentation
- `docs/specs/product/product-scope-invariant.md` — Product scope / architecture invariant
- `src/app/AppShell.tsx` — persistent bottom nav（Home / Discover / MOGU / My）
- `src/app/AppRouter.tsx` — route table
- `src/pages/HomePage.tsx` — Home の primary CTA 遷移先（Food Profile / Exploration）
