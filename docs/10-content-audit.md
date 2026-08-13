# Issue #10 掲載内容監査（Verified Content / Evidence）

> 更新日: 2026-08-14（ブランチ `feat/10-content-verification`）
> 対象: App に表示される Story / Route / Spot レコードと、その verification metadata。
> 方法: 現在の canonical data（`src/data/**`）と i18n bundle（`src/i18n/**`）、
> および発行済みの stakeholder review packet を突き合わせて監査。

## 1. 目的と前提（Product Scope）

- Product 全体は**東京都全域 × 複数地域 × 複数食文化**を対象とする
  （`docs/specs/product/product-scope-invariant.md`）。
- **奥多摩 × 東京わさび** は **2026-08-23 Hackathon Demo Golden Path** のための
  demo-scoped な経路であり、共有 contract を狭めるものではない。
- 監査は「実在する事業者がいる ≠ 訪問・体験が検証済み」「取得 ≠ 確認」を
  原則とする（Issue #127 / #129）。
- `confirmedAt` は実際の確認が得られた source のみに付与する。今回の監査では
  **どの source にも `confirmedAt` は存在しない**（取得のみ）。よって
  `verified` と導出されるレコードは 0 件である。

## 2. 発行済み stakeholder review packet（変更前の主張）

`pnpm review-packet` で生成した current 表示内容の packet。すべて
**要確認（needs_confirmation）** を主張し、実務情報（営業時間・価格・予約・
多言語・写真利用許可・来訪負荷）は **不明（未確認）** と表示する。

| packet | FoodCulture × Place | 主張 |
|---|---|---|
| `docs/stakeholder-review-packets.md` + CLI | `wasabi-okutama` × `chishima-wasabi-garden` | 全項目 要確認、実務情報は 不明（未確認）、センサス節あり |
| CLI | `wasabi-okutama` × `okutama-tourism-office` | 同上（座標 precise） |
| CLI | `wasabi-okutama` × `shishiguchiya` | 同上 |
| CLI | `okutama-soba` × `soba-isshintei` | 同上（Story は未作成のため narrative 行なし） |

- 全 packet で Story narrative / Place 名・住所・座標 / Spot 紹介文は
  **要確認** と出る（`confirmedAt` なし、source は `needs_confirmation`）。
- 全 packet で「現在の App 表示内容」と canonical data は一致している
  （packet は live canonical records から生成されるため）。
- 8/23 Demo の但し書きは `--context-note` で明示的に渡しており、
  generator が demo scope を推測していない（`docs/stakeholder-review-packets.md`）。

## 3. 監査表（App 表示レコード × 状態）

状態は `deriveVerificationStatus` / `recordVerificationStatus`
（`src/lib/verification.ts`）の導出結果。**「verified」は 0 件**（`confirmedAt` なし）。
`origin: 'demo'` のレコードは常に **demo** と導出される（demo が優先）。

### 3.1 FoodCulture（7 件、すべて `origin: 'editorial'`）

| id | 状態 | 証拠・出典 | 表示面 |
|---|---|---|---|
| `wasabi-okutama` | 要確認 | 奥多摩観光協会 / 東京都産業労働局特産品情報（取得 2026-08-08、確認なし） | Pokedex・FoodCulturePage・StoryPage（全文）・Discover・Map・NextDiscovery |
| `yamame-okutama` | 要確認 | 奥多摩観光協会 | 一覧・関連施設 |
| `kumma-hyakka-ome` | 要確認 | 青梅市 | 一覧・関連施設 |
| `uguisu-mochi-ome` | 要確認 | 青梅市観光協会 | 一覧・関連施設 |
| `okutama-soba` | 要確認 | 奥多摩観光協会 | 一覧・関連施設 |
| `okutama-konnyaku` | 要確認 | 奥多摩観光協会 | 一覧・関連施設 |
| `yuzu-hinode` | 要確認 | 日の出町 | 一覧・関連施設 |

- Story（StoryPage）のフルコピーを持つのは `wasabi-okutama` のみ
  （`STORY_DATA_KEYS`）。他文化は `storyContent(...)` が `undefined` になり、
  **誤った wasabi 文言にフォールバックしない**（`data-content.test.ts`）。
- 物語コピーは編集記事（`s4EditorialNote`: 「公開された公式情報を素材に編集部が構成した編集記事です」）と明示。

### 3.2 Place（12 件）

| id | origin | 状態 | 座標精度 | 証拠・出典 | 表示面 |
|---|---|---|---|---|---|
| `okutama-tourism-office` | source | 要確認 | precise | 奥多摩観光案内所 directory（All Rights Reserved、取得 2026-08-08） | 凍結経路 step 1・Map |
| `chishima-wasabi-garden` | source | 要確認 | approximate | 同上 | 凍結経路 step 2・Map |
| `soba-isshintei` | source | 要確認 | approximate | 同上（soba 店。wasabi 関連は未出典のため未掲載） | 凍結経路 step 3・Map |
| `shishiguchiya` | source | 要確認 | approximate | 同上（わさび店） | 凍結経路 step 4/5・Map |
| `odanba-fishing` | source | 要確認 | approximate | 同上（虹ます釣場。foodCultureIds は空 = 体験が未検証） | 凍結経路（1day）step 4・Map |
| `okutama-wasabi-field` | demo | demo | approximate | demo フィクスチャ（どの culture の placeIds にも含まれない） | Map（origin demo 表示） |
| `okutama-fishing-center` | demo | demo | approximate | demo フィクスチャ | `yamame-okutama` 関連施設・Map |
| `okutama-soba-shop` | demo | demo | approximate | demo フィクスチャ | `okutama-soba` 関連施設・Map |
| `okutama-michi-no-eki` | demo | demo | approximate | demo フィクスチャ | `okutama-konnyaku` 関連施設・Map |
| `kumma-hyakka-shop` | demo | demo | approximate | demo フィクスチャ | `kumma-hyakka-ome` 関連施設・Map |
| `uguisu-mochi-shop` | demo | demo | approximate | demo フィクスチャ | `uguisu-mochi-ome` 関連施設・Map |
| `hinode-yuzu-stand` | demo | demo | approximate | demo フィクスチャ | `yuzu-hinode` 関連施設・Map |

- source 5 件は実在施設の転記だが **座標は approximate（地区重心）**、
  **`confirmedAt` なし**。Issue #10 現地調査で再確認が必要（フィールドワーク前は
  ナビゲーション目的地にしない — `model.ts` `coordinatePrecision` 契約）。
- demo 7 件は location check-in / GTFS scaffolding 用フィクスチャ。
  FoodCulturePage の関連施設一覧では **origin demo バッジ**が表示される。

### 3.3 Route / Spot（凍結経路）

| レコード | origin | 状態 | 内容 |
|---|---|---|---|
| `okutama-wasabi-journey`（half-day / 1-day 2 変種） | editorial（`isDemo: true`） | 要確認 | 構造・停留順・滞在時間・移動はチーム編集。実在 5 施設を停留に使用 |
| `SPOT_DETAILS`（5 件の役割文） | editorial | 要確認 | 施設の実体・住所・カテゴリ・小売機能までに限定。**訪問・体験・メニュー未検証の主張なし**（`seed-honesty.test.ts` で固定） |
| `SPOT_DETAILS[].practical` | — | **未設定** | 営業時間・定休日・価格・予約は一切 invent しない（undefined ⇒ 不明表示） |
| `SPOT_DETAILS[].tags` | — | **空** | 多言語・アレルギー・アクセシビリティは source が裏付けない限り主張しない |

- ルート advisory（週末朝の混雑）は **2026-08-09 現地観察ノート** 由来で
  「統計的事実ではない」とヘッジ（`docs/okutama-weekend-crowding-fieldnote.md`、
  `s5CrowdingSource`）。

### 3.4 市町村センサス（Issue #128、奥多摩町 133086）

- 2020 農林業センサス（e-Stat、取得 2026-08-12、`open_data`、要確認）。
- 表示は「市町村単位の集計」であり「個別の生産者・わさび農家・後継者を
  示すものではない」旨の解釈の範囲を表示（`dataStoryChallengeEvidence` /
  `municipality-agriculture.ts` `interpretationNoteJa`）。
- 農業経営体 1、経営耕地面積は開示制限で非公表、林家 192 戸、保有山林 1946ha。
- **市町村集計を生産者・後継者の主張に変換していない**（正）。

### 3.5 状態別カウント（導出）

| 状態 | FoodCulture | Place | Route | Spot |
|---|---|---|---|---|
| verified | 0 | 0 | 0 | 0 |
| needs_confirmation | 7 | 5 | 1 | 5 |
| stale | 0 | 0 | 0 | 0 |
| conflict | 0 | 0 | 0 | 0 |
| demo | 0 | 7 | （`isDemo: true`） | 0 |
| 計 | 7 | 12 | 1 | 5 |

- **overreach は表示面では検出されなかった**：実務情報は未設定（不明表示）、
  物語は編集記事と明示、センサスは解釈の範囲付き、確認済みと主張する文言は皆無。
- 一方、**表示されない latent な overreach** を bundle key に検出（下記 4.3）。

## 4. 修正（record → old → new → evidence）

### 4.1 demo フィクスチャ Place の source を demo として明示

- **対象**: `src/data/seed-places.ts` の demo 7 件
  （`okutama-wasabi-field` / `okutama-fishing-center` / `okutama-soba-shop` /
  `okutama-michi-no-eki` / `kumma-hyakka-shop` / `uguisu-mochi-shop` / `hinode-yuzu-stand`）
- **old**: `sourceType: 'official_web'`、`verificationStatus: 'needs_confirmation'`
  （あたかも「実在施設の公式サイトから取得し未確認」に見える）
- **new**: `sourceType: 'demo'`、`verificationStatus: 'demo'`
- **evidence**: `origin: 'demo'`（フィクスチャ）と source の
  `official_web + needs_confirmation` が矛盾。`deriveVerificationStatus` は origin から
  demo を導出しており実害はないが、metadata 単体ではフィクスチャであることが
  読み取れない。`origin: 'demo'` + `sourceType: 'demo'` + `verificationStatus: 'demo'`
  で self-describing になる。

### 4.2 冗長な `lastVerified` を seed から除去

- **対象**: `src/data/seed-places.ts`（demo 7 件）/ `src/data/seed-routes.ts`
  （`SOURCE_OKUTAMA`）/ `src/data/seed-food-cultures.ts`（全 8 source）
- **old**: `lastVerified: '2026-08-08'`（取得日を「確認」と誤解させうる名前の field）
- **new**: （除去。`retrievedAt: '2026-08-08'` が常に存在し、全レコードで同値）
- **evidence**: `model.ts` は `lastVerified` を「Retrieval or last-verified date」、
  `verification.ts` を「legacy field ... 決して stakeholder confirmation に
  ならない」と文書化。全 seed で `retrievedAt` と同値で冗長。除去しても
  `deriveVerificationStatus` / `isSourceDocumentStale` の結果は不変
  （fallback は `retrievedAt ?? lastVerified`）。field 型自体は legacy 互換のため
  残す（`src/lib/**` の挙動は変更しない — 共有 contract の変更は別途調整）。

### 4.3 未使用・誠実性に反する bundle key（data.*）を除去

- **対象**: `src/i18n/resources.ts` の 9 key × 3 locale、および
  `src/i18n.test.ts` の当該 key を「visible」として固定した 2 アサーション
- **old / new**: 下記 key を除去（ja / en / zh-TW すべて）

| key | old（ja 例） | 問題 |
|---|---|---|
| `dataRouteStopRoleWasabiField` | 「…栽培現場を見学します。」 | 見学体験を主張（#127 禁止） |
| `dataRouteStopRoleWasabiFieldFullDay` | 「…ゆっくり見学。」 | 同上 |
| `dataRouteStopRoleSobaLunch` | 「おろしたてのわさびをのせた手打ちそばで昼食を。」 | 手打ち・おろしたてを主張（#127 禁止） |
| `dataRouteStopRoleFishingCenter` | 「渓流魚やまめの釣り体験。…」 | 釣り体験を主張 |
| `dataRouteStopRoleMichiNoEki` | 「わさび加工品やこんにゃくなど、お土産を選びます。」 | 未検証の体験を主張 |
| `dataWasabiFieldRole` | 「…自分の目で確かめられます。」 | 見学体験を主張（#127 禁止） |
| `dataFishingCenterRole` | 「…やまめを釣り、その場で味わえる施設です。」 | 体験を主張 |
| `dataSobaShopRole` | 「おろしたてのわさびをのせた手打ちそば。…」 | 手打ち・おろしたてを主張 |
| `dataMichiNoEkiRole` | 「…地域の恵みを土産に選べます。…」 | 未検証の体験を主張 |

- **evidence**: これらの key は `src/i18n/data-content.ts`（マッピング層）と
  どの page / component からも参照されない（grep で確認）。`SPOT_ROLE_KEYS` /
  `ROUTE_STEP_ROLE_KEYS` / `PLACE_DATA_KEYS` に含まれない。
  すなわち **表示されない死にコード** であり、将来マッピングし直した瞬間に
  Issue #127 の誠実性テストが禁止した文言が復活しうる。i18n.test.ts はこれらを
  「visible S3–S8 content keys」と固定していたが、実体は非表示。表示される
  key（`dataRouteStopRoleChishima` 等）は誠実性テストが引き続き検証するため、
  誠実性の保証は弱まらない。

### 4.4 `docs/open-data-registry.md` §3.2.1 の stale 記述を修正

- **old**: 「`src/data/seed-places.ts`（8 places, all `origin: 'demo'`, source
  奥多摩観光協会）」
- **new**: 「`src/data/seed-places.ts`（12 places — 凍結経路の実在 5 施設は
  `origin: 'source'`（`needs_confirmation`、座標 approximate）、残り 7 件は
  `origin: 'demo'` フィクスチャ）」＋ `seed-routes.ts` の `SOURCE_OKUTAMA` を追記
- **evidence**: 現在の `seed-places.ts` は 12 件（source 5 / demo 7）。
  Issue #127 の凍結経路で実在施設が source 化された後、この文書が更新されて
  いなかった（stale）。`src/data/generated/okutama-places.ts`（3 real + 19 demo）の
  記述は現状のまま正しい。

## 5. 修正後の packet 再生成（regeneration evidence）

修正後に `pnpm review-packet` を再実行し、live canonical data と一致すること、
および変更前と同様に**全項目 要確認・実務情報は 不明（未確認）** であることを
確認した（下記参照）。

```text
# 例: wasabi-okutama × chishima-wasabi-garden（再生成後）
- 施設・事業者名 | 千島わさび園 | 要確認 |
- 住所 | 東京都西多摩郡奥多摩町丹三郎8-2 | 要確認 |
- 営業時間 | 不明（未確認） | 要確認 |
- 出典 | …取得日: 2026-08-08; 確認日: 不明（未確認）; 状態: 要確認
```

packet 生成は canonical records を直接読み、`sourceLine` は
`deriveVerificationStatus` を経由するため、4.1 / 4.2 の変更が packets の
**要確認** 主張を変えないことを確認した。

## 6. 検証

- `pnpm test:related` / `pnpm test:focused`（data・i18n・honesty・verification）
- `pnpm typecheck`
- `pnpm validate`（typecheck + lint + full Vitest + build）
- 375px 日本語 Golden Path E2E（`pnpm test:e2e`）— src/** 変更は core-risk に分類
  → 実施
- `src/data/seed-honesty.test.ts` は**弱めていない**（むしろ latent な
  誠実性違反 key を除去して唯一の保証源として機能を明確化）。

## 7. Deferred（今回の修正対象外、関係 Lane へ）

| # | 項目 | 内容 | 担当 |
|---|---|---|---|
| 1 | `lastVerified` 型の改名 | `DataSource.lastVerified` は「確認」と誤読されうる命名。型を共有 contract から外す場合は `model.ts`（全 feature 共有）と `verification.ts` を横断調整が必要。今回 seed からは除去済み | coordinator / 全 Lane |
| 2 | 中立・demo ラベル付きの未使用 key | `dataWasabiFieldAccess`・`dataFishingCenterAccess`・`dataWasabiFieldDemoNote`・`dataFishingCenterDemoNote`・`dataRouteMobilityWalkStream`・`dataRouteMobilityWalk`・`dataPlaceWasabiFieldName` は未使用だが「デモ」表記・中立なので保持（optional cleanup） | Lane B（resources.ts chrome 隣接） |
| 3 | `okutama-wasabi-field` Place 本体 | どの culture にも属さない孤児フィクスチャ。Map に demo ピンとして表示継続。削除する場合は check-in / GTFS scaffolding の代替を検討 | coordinator |
| 4 | source 5 件の座標・実務情報 | Issue #10 現地調査（fieldwork）で再確認し `confirmedAt` を付与する。調査前は approximate・不明表示を維持 | Issue #10 現地調査 / 管理者 |
| 5 | `i18n.test.ts` の key 一覧 | 表示されない key を「visible」と称するアサーションを削除した。今後 bundle key を追加する際は `data-content.ts` マッピングと合わせること | Lane B |

## 8. 結語

- App に表示される Story / Route / Spot は、**現状のデータだけでも誠実**：
  未確認は未確認と表示し、実務情報を invent せず、センサスを生産者主張に
  変換せず、確認済みと装わない。
- 修正したのは (1) demo フィクスチャの source を demo と明示、(2) 冗長な
  `lastVerified` の除去、(3) 未使用で誠実性に反する bundle key の除去、
  (4) stale な registry 文書の修正。いずれも表示・契約・テストの弱体化なし。
- Product Scope は不変：奥多摩 × 東京わさびは 8/23 Demo の golden path のまま
  demo-scoped。今後別の Region × FoodCulture を追加しても、共有 data 契約・
  i18n 機構・verification 契約は狭めていない。
