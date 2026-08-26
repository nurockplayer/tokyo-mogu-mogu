# 奥多摩フィールドワーク / 8/23 デモ 掲載内容 ステークホルダー確認チェックリスト

> 対象: 現在の canonical data（`src/data/**` の app-facing seed）+ i18n Story コピー
> 生成日: 2026-08-14 時点のデータを参照（フィールドワーク実行前に配布する想定）
> 使い方: 電話 / DM / 対面で 1 項目ずつ確認 → 「反映手順」に沿って canonical data へ反映
> ラベル: 「要確認」「デモデータ」「不明（未確認）」は repo の packet 規約
> （`src/lib/stakeholder-review-packet.ts` の STATUS_JA / UNKNOWN_JA）をそのまま使用
> 関連: Issue #10 / #129 / #133 / #127、`docs/stakeholder-review-packets.md`、`docs/10-content-audit.md`
>
> **Historical snapshot:** 現在の claim-level inventory と review queue は、生成物
> [`docs/data-verification-ledger.md`](data-verification-ledger.md) を参照してください。
> このチェックリスト自体は当時の確認資料として保持します。

## 0. 前提（必ず最初に読む）

- **「verified（確認済み）」レコードは現在 0 件。** 全 source に `confirmedAt` が存在せず
  （取得日 2026-08-08 / 2026-08-12 のみ）、repo ルール「取得 ≠ 確認」
  「absence of evidence is not evidence of verified」により `verified` と導出される
  レコードはない。
- **実在施設の転記 5 件は「要確認（needs_confirmation）」。** 名前・住所は奥多摩観光協会
  ディレクトリからの転記で、座標は大部分が地区重心（approximate）。フィールドワークで
  実地確認し `confirmedAt` を付与するまで、ナビゲーション目的地にしてはならない
  （`coordinatePrecision` 契約）。
- **デモ 7 件・ルート・GTFS・推薦候補は「デモデータ」。** 実在施設を装う metadata に
  ならないよう、すべて demo と明示済み。確認の対象は「実在検証スコープ」と「デモ」で
  明確に分ける（下表で DEMO タグ付き）。
- 8/23 デモは **奥多摩 × 東京わさび = Demo Golden Path のみ**。Product 全体は
  **東京都全域 × 複数地域 × 複数食文化**（`docs/specs/product/product-scope-invariant.md`）。
  このチェックリストで確認した事実が Okutama 特化で共有 contract を狭めないこと。

## 1. 分類インベントリ（確認状態別の全レコード）

状態は `deriveVerificationStatus` / `recordVerificationStatus`
（`src/lib/verification.ts`）の導出結果。

**(a) verified = 0 件**（全 source に `confirmedAt` なし → 厳密に verified は存在しない）

### (b) sourced-but-unconfirmed = 実在ソースあり・要確認（needs_confirmation）

**FoodCulture（7 件、すべて `origin: 'editorial'`、ソースは official_web 取得 2026-08-08・確認なし）**
未確認フィールド: `facts`（事実・表現）

| id | 名称（ja） | 種別 | 出典 | 未確認フィールド |
|---|---|---|---|---|
| `wasabi-okutama` | 東京わさび | FoodCulture | 奥多摩観光協会 / 東京都産業労働局特産品情報 | facts（+ Story 全 narrative は編集記事・要確認） |
| `yamame-okutama` | 奥多摩やまめ | FoodCulture | 奥多摩観光協会 | facts |
| `kumma-hyakka-ome` | 青梅くんまひゃっか | FoodCulture | 青梅市 | facts |
| `uguisu-mochi-ome` | 多摩の和菓子 うぐいす餅 | FoodCulture | 青梅市観光協会 | facts |
| `okutama-soba` | 奥多摩そば | FoodCulture | 奥多摩観光協会 | facts |
| `okutama-konnyaku` | 奥多摩こんにゃく | FoodCulture | 奥多摩観光協会 | facts |
| `yuzu-hinode` | 日の出ゆず | FoodCulture | 日の出町 | facts |

**Place（5 件、`origin: 'source'`、奥多摩観光協会ディレクトリ転記・要確認）**
未確認フィールド: `address` / `coordinates`（全 5 件共通）

| id | 名称（ja） | 種別 | 座標精度 | 経路内ステップ |
|---|---|---|---|---|
| `okutama-tourism-office` | 奥多摩観光案内所 | info-center | precise | half-day / 1-day step 1 |
| `chishima-wasabi-garden` | 千島わさび園 | farm | approximate | step 2 |
| `soba-isshintei` | 一心亭 | restaurant | approximate | step 3 |
| `shishiguchiya` | 獅子口屋（わさび） | shop | approximate | step 4 / 1-day step 5 |
| `odanba-fishing` | 大丹波川国際虹ます釣場 | other | approximate | 1-day step 4（foodCultureIds 空 = 体験未検証） |

**Route / Spot（`okutama-wasabi-journey` = 1 ルート 2 変種 + Spot 5 件、すべて `origin: 'editorial'`、ソース要確認）**
- Spot の未確認フィールド: `hours` / `closedDays` / `price` / `reservation` /
  `bookingDestination` / `access` / `multilingualSupport` / `dietaryAllergy` /
  `accessibility` / `storyWording` / `makerWording` / `photoReusePermission`
  （全 5 件で `practical` 未設定・`tags` 空 → 全フィールドが「不明（未確認）」として自動抽出対象）
- Route の構造・停留順・滞在時間・移動時間はチーム編集（`isDemo: true` のデモ経路）であり要確認。
- Story のフルコピーを持つのは `wasabi-okutama` のみ。物語は編集記事と明示
  （`s4EditorialNote` / `s4MakerNote`）。作り手の説明は「特定個人ではなく編集上のプロフィール」。
- 市町村センサス（農林水産省 2020 農林業センサス、e-Stat、`open_data`、取得 2026-08-12、
  要確認）が Story に補足表示。市町村集計であり個別生産者・後継者を示すものではない旨の
  解釈注記付き。

### (c) demo = デモフィクスチャ（origin 'demo' / sourceType 'demo' / ルート isDemo）

**Place（7 件）** — `okutama-wasabi-field`（孤児）/ `okutama-fishing-center` /
`okutama-soba-shop` / `okutama-michi-no-eki` / `kumma-hyakka-shop` /
`uguisu-mochi-shop` / `hinode-yuzu-stand`
→ check-in / GTFS scaffolding。座標・住所はデモ用。**実在施設として確認依頼しない。**

- 参考: 生成データ `src/data/generated/okutama-places.ts` の demo 19 行（実名・実住所だが
  All Rights Reserved・座標 approximate）と open_data 3 行（総合運動公園・せせらぎの里美術館・
  森林館）は **app の `places` export に配線されていない**（生データ参照のみ）。
- ルート `okutama-wasabi-journey`（`isDemo: true`）、推薦候補 `demo-okutama-wasabi`
  （`availability: 'ready'`、base 別 travel time 空・dispersion unknown）、
  GTFS フィクスチャ（西東京バス・デモ）はすべてデモデータ。

### (d) unknown = ソース不在のため未確定のまま（後述 §5 に列挙）

## 2. 確認チェックリスト（電話 / DM / 対面用・1 行 1 問）

タグ: `[要確認]` = 実在検証スコープの事実確認 / `[DEMO]` = デモ専用（実地調査で置換するまで確認対象外）。
括弧内は対応する canonical フィールド。

### 2.1 千島わさび園（farm / `chishima-wasabi-garden` / 経路 step 2）
- [要確認] 住所は「奥多摩町丹三郎8-2」で合っていますか？（`address` / `coordinates`）
- [要確認] 営業時間と定休日は？（冬季・シーズンで変わりますか？）（`hours` / `closedDays`）
- [要確認] 見学・購入に予約は必要？方法は？（`reservation` / `bookingDestination`）
- [要確認] 現在の販売商品・価格帯は？（わさび・加工品）（`price`）
- [要確認] 英語・多言語対応はありますか？（`multilingualSupport`）
- [要確認] ベジタリアン/アレルギー対応の情報はありますか？（`dietaryAllergy`）
- [要確認] バリアフリー・駐車場は？（`accessibility`）
- [要確認] 施設・商品の写真を App に掲載してもよいですか？（`photoReusePermission`）
- [要確認] わさびの栽培方法・歴史の紹介文（Story/Spot 紹介文）で間違いはありませんか？（`storyWording` / `facts`）
- [要確認] 公式サイト/問い合わせ先 URL は？（`bookingDestination`）
- [要確認] 来てほしい時間帯・季節は？（来訪適切時間帯・季節）
- [要確認] 来訪が増えて困ること・避けたい負荷はありますか？（来訪増加で避けたい負荷）

### 2.2 一心亭（restaurant / `soba-isshintei` / 経路 step 3・昼食）
- [要確認] 住所は「奥多摩町丹三郎41-1」で合っていますか？（`address` / `coordinates`）
- [要確認] 営業時間・定休日は？（ランチのみ？）（`hours` / `closedDays`）
- [要確認] 予約は必要？方法は？（`reservation` / `bookingDestination`）
- [要確認] 現在の提供メニュー・価格帯は？（`price`）
- [要確認] メニューにわさびはありますか？（データ上はわさび提供なしと掲載 — 正しい？）（`facts` / `makerWording`）
- [要確認] 英語メニュー・多言語対応は？（`multilingualSupport`）
- [要確認] ベジタリアン/アレルギー対応の情報は？（`dietaryAllergy`）
- [要確認] バリアフリー・駐車場は？（`accessibility`）
- [要確認] 店の写真・紹介文の掲載はよいですか？（`photoReusePermission` / `storyWording`）
- [要確認] 来てほしい時間帯・来訪増加で困ることは？（来訪適切時間帯 / 避けたい負荷）

### 2.3 獅子口屋（shop / `shishiguchiya` / 経路 step 4・5・お土産）
- [要確認] 住所は「奥多摩町大丹波190」で合っていますか？（`address` / `coordinates`）
- [要確認] 営業時間・定休日は？（`hours` / `closedDays`）
- [要確認] 取扱商品・価格帯は？（わさび・加工品）（`price`）
- [要確認] 予約・通販・取寄せはありますか？（`reservation` / `bookingDestination`）
- [要確認] 英語・多言語対応は？（`multilingualSupport`）
- [要確認] 写真・店名・紹介文の掲載はよいですか？（`photoReusePermission` / `storyWording`）
- [要確認] 来てほしい時間帯・来訪増加で困ることは？（来訪適切時間帯 / 避けたい負荷）

### 2.4 大丹波川国際虹ます釣場（other / `odanba-fishing` / 1-day step 4）
- [要確認] 住所は「奥多摩町大丹波114」で合っていますか？（`address` / `coordinates`）
- [要確認] 営業時間・定休日・シーズンは？（`hours` / `closedDays`）
- [要確認] 料金・体験内容は？（データ上は「体験」を未掲載 — 釣り体験の可否・内容は？）（`price` / `facts`）
- [要確認] 予約要否・方法は？（`reservation` / `bookingDestination`）
- [要確認] 写真・紹介文の掲載はよいですか？（`photoReusePermission` / `storyWording`）
- [要確認] 来訪増加で困ることはありますか？（避けたい負荷）

### 2.5 奥多摩観光案内所（info-center / `okutama-tourism-office` / 経路 step 1）
- [要確認] 所在地（奥多摩町氷川）・地図上の位置は合っていますか？（座標は precise ですが要確認）（`address` / `coordinates`）
- [要確認] 営業時間・定休日（季節で変わる？）は？（`hours` / `closedDays`）
- [要確認] 対応言語（英語パンフレット等）は？（`multilingualSupport`）
- [要確認] わさび田への行き方などの案内内容・紹介文で修正点は？（`storyWording` / `facts`）
- [要確認] 写真掲載の許可是否は？（`photoReusePermission`）

### 2.6 東京わさび Story（FoodCulture `wasabi-okutama` の物語コピー）※編集記事と明示済み
- [要確認] 作り手の説明（「奥多摩のわさび農家」・収穫は秋冬）は、実際の生産者像と合っていますか？（特定個人ではなく編集上のプロフィール）（`makerWording` / `facts`）
- [要確認] 歴史・栽培方法（江戸時代から・明治「東京わさび」・「畳流し」「水掛け栽培」）は正しいですか？（`facts` / `storyWording`）
- [要確認] 現在の課題（担い手・後継者減少）は現地の認識と合いますか？（`facts`）
- [要確認] センサス参考情報（「農業経営体 1 経営体」＝市町村集計）の表示の仕方は適切ですか？（市町村集計であること・生産者/後継者を示さないことの明記が前提）（`facts`）

### 2.7 その他の FoodCulture（`yamame-okutama` / `kumma-hyakka-ome` / `uguisu-mochi-ome` / `okutama-soba` / `okutama-konnyaku` / `yuzu-hinode`）
- [要確認] 概要・歴史・楽しみ方の説明文（編集記事）に、現地と食い違う記述はありますか？（`facts`）
- [要確認] 関連施設として案内している店・施設の名前は合っていますか？（※現状、関連施設は全てデモフィクスチャ — 下記 DEMO 参照）

### 2.8 デモデータ（確認依頼ではなく「置換判断」のみ） — 全て [DEMO]
- [DEMO] デモ 7 施設（やまめ・そば処・道の駅・くんまひゃっか店・和菓子店・ゆず直売所・わさび田）は「デモデータ」表示のまま。**実在施設として誰かに確認を依頼しない。**
- [DEMO] 実地調査（Issue #10）で実在施設に置き換える場合のみ、§2.1–2.5 と同様の項目で再確認してから source 化する。
- [DEMO] バス所要時間・ルートの移動時間はデモ GTFS・編集見積のまま。実際のダイヤ（西東京バス / JR 東日本）を確認する場合のみ、実データ取り込み対象。
- [DEMO] 週末朝の混雑注意文は「2026-08-09 の 1 回の現地観察」に基づく注意表示。**統計的事実・リアルタイム情報として表示しない**（要ヘッジ文言）。

## 3. 確認対象者候補（データに存在する名前・ソースのみから導出）

| 候補 | 根拠（データ上の出典/名称） | 確認対象 |
|---|---|---|
| 一般社団法人奥多摩観光協会（奥多摩町観光案内所） `https://www.okutama.gr.jp/site/` | 実在 5 施設・ルート・Spot の全ソース名 | 施設情報の一括照会・施設紹介経由の連絡先 |
| 千島わさび園（丹三郎） | `chishima-wasabi-garden` 施設名 | §2.1 |
| 一心亭（丹三郎） | `soba-isshintei` 施設名 | §2.2 |
| 獅子口屋（大丹波） | `shishiguchiya` 施設名 | §2.3 |
| 大丹波川国際虹ます釣場 | `odanba-fishing` 施設名・公式 URL `ohtabaturiba.com` | §2.4 |
| 奥多摩観光案内所（現地施設） | `okutama-tourism-office` 施設名 | §2.5 |
| 東京都産業労働局 特産品情報 `sangyo-rodo.metro.tokyo.lg.jp` | `wasabi-okutama` ソース 2 件目 | Story のわさび産地情報 |
| 青梅市 / 青梅市観光協会 | `kumma-hyakka-ome` / `uguisu-mochi-ome` ソース | 青梅の食品・和菓子の説明 |
| 日の出町 | `yuzu-hinode` ソース | ゆず産地の説明 |
| 農林水産省 2020 農林業センサス（e-Stat） | `municipality-agriculture.ts` ソース | センサス数値の読み方・表示（数値の「確認」ではなく表示の妥当性） |
| 西東京バス / JR 東日本（青梅線） | ルート mobility `labelJa: '西東京バス'` / `transportJa: 'JR青梅線・西東京バス'` | 実ダイヤを実データ化する場合のみ |

※上記以外の連絡先（電話番号など）はデータに存在しないため、本チェックリストでは記載しない。
観光協会を通じて各施設の連絡先を取得するのが現実的な経路。

## 4. 確認後の反映手順（既存の packet 規約に準拠・新規プロセスを発明しない）

`src/lib/stakeholder-review-packet.ts` の「反映手順」をそのまま適用する：

1. 修正内容と **確認者・確認日** を記録する。
2. `{foodCultureId}` / `{placeId}` の **canonical data record を修正**し、資料（packet・チャット）だけに事実を残さない。
3. 確認できた source に `confirmedAt: YYYY-MM-DD` を追加する。**source 全体の表示項目を確認できた場合のみ** `verificationStatus: 'verified'` にする。一部の項目だけなら `needs_confirmation` を維持する（一部確認で source 全体を verified に昇格させない）。
4. アプリで表示・出典・unknown 表示を再確認する。

補足（`docs/10-content-audit.md` §7 Deferred #4 に整合）:
- 実在 5 施設の座標（approximate → precise）と実務情報は、**Issue #10 現地調査**で確認してから `confirmedAt` を付与する。調査前は approximate・不明（未確認）表示を維持。
- 反映後は `pnpm review-packet --food-culture <id> --place <id>` を再実行し、live canonical data と packet の一致を確認する。デモ但し書きが必要な場合は `--context-note` で明示する。
- ルート（`isDemo: true`）を実データ化する場合のみ、別途 Product 判断が必要（デモ scope を広げない）。

## 5. 不明（未確認）のままにする項目 — ソースがないため埋めてはいけない

| # | 項目 | 対象 | 理由（根拠） |
|---|---|---|---|
| 1 | 営業時間・定休日・価格・予約要否・予約方法/URL・アクセス（Spot `practical`） | 実在 5 スポット全部 | `practical` 未設定。ソースが裏付けない限り invent しない（`seed-routes.ts` / honesty test 固定） |
| 2 | 英語・多言語対応 / ベジタリアン・アレルギー / バリアフリー（Spot `tags`） | 実在 5 スポット全部 | `tags` 空。source が主張しない限り掲載しない |
| 3 | 写真利用許可（`photoReusePermission`） | 全施設 | 出典に許諾記録なし。確認前に「掲載可」としない |
| 4 | 来訪に適した時間帯・季節 / 来訪増加で避けたい負荷 | 実在 5 スポット | いずれの source にも記録なし |
| 5 | 混雑の「統計的事実」 | ルート advisory | 単一の現地観察（2026-08-09）由来。リアルタイム・統計と称さない（`docs/okutama-weekend-crowding-fieldnote.md`） |
| 6 | 未確認の体験主張（見学・栽培現場・手打ち・おろしたて・釣り体験・わさび提供） | Story/Spot 文言 | 誠実性テストで禁止。確認後でなければ復活させない |
| 7 | センサスの非公表値（経営耕地面積）と、市町村集計からの生産者・後継者推論 | Story センサス節 | 統計法による開示制限。集計を個別生産者の主張に変換しない |
| 8 | 基地別の所要時間（`travelTimeByBaseArea {}`）と観光分散（`tourismDispersion: unknown`） | 推薦候補 `demo-okutama-wasabi` | ソースが未整備。未知のまま caution 表示 |
| 9 | デモ 7 施設の住所・座標・実在性 | デモ Place 7 件 | フィクスチャ。実地調査で実在施設に置き換えるまで「実在」と扱わない |
| 10 | 生成データ 19 demo 行の座標・再利用可否 | `src/data/generated/okutama-places.ts` | All Rights Reserved・座標 approximate。app の `places` には未配線 |
| 11 | Story がない 6 文化の物語（lead/story/maker 等） | wasabi 以外の FoodCulture | `storyContent` が `undefined` → 誤った wasabi 文言へ fallback しない（`src/i18n/data-content.test.ts`） |

## Evidence basis（本チェックリストの導出根拠）

- **§1 状態導出**: `src/data/model.ts`（DataSource/VerificationStatus/DataOrigin 契約）、
  `src/lib/verification.ts`（`deriveVerificationStatus` / `recordVerificationStatus` /
  `listUnverifiedFields`）、`src/lib/verification.test.ts`（導出規則の固定）。状態は各レコードの
  source の `sourceType` / `verificationStatus` / `confirmedAt` 有無 / `origin` から導出。
  grep で `src/**` に `confirmedAt` 付き実データが 0 件であることを確認（テストフィクスチャのみ）。
- **§1 各レコード**: `src/data/seed-food-cultures.ts`（FC 7 件・placeIds・source）、
  `src/data/seed-places.ts`（Place 12 件・座標精度・source）、`src/data/seed-routes.ts`
  （ルート 1 件・Spot 5 件・`practical` 未設定・`tags` 空）、
  `src/data/municipality-agriculture.ts`（センサス・needs_confirmation・解釈注記）、
  `src/data/pilot-journey.ts` / `src/data/journey.ts` / `src/data/demo-recommendation.ts`
  （デモ経路・デモ候補の provenance マーカー）、
  `src/data/generated/okutama-places.ts`（3 source + 19 demo、未配線）。
- **§2 Story 文言の確認項目**: `src/i18n/data-content.ts`（`STORY_DATA_KEYS` = wasabi のみ・
  `municipalityId`）、`src/i18n/resources.ts`（s4MakerNote / s4EditorialNote /
  dataStoryChallenge / dataStoryChallengeEvidence / s5CrowdingSource）。
- **§2 ラベル・§4 反映手順**: `src/lib/stakeholder-review-packet.ts`
  （STATUS_JA / UNKNOWN_JA / REVIEW_FIELD_JA / 反映手順）、`docs/stakeholder-review-packets.md`。
- **§3 確認対象者候補**: 各レコードの `source.name` / `url` と施設名（`seed-*.ts`、
  `okutama-places.ts`）。
- **§5 unknown 固定**: `src/data/seed-honesty.test.ts`（体験主張の禁止）、
  `docs/10-content-audit.md`（監査表・Deferred #4）、`docs/okutama-weekend-crowding-fieldnote.md`
  （観察のヘッジ）、`src/data/gtfs-fixture/index.ts`（デモ GTFS）、
  `docs/okutama-facilities-source.md`（生成データのライセンス・未配線）。

**検証の限界**: `listUnverifiedFields` の実際の実行出力は未実施（既存のフルダンプ用 script がなく、
依存の install / build / test を禁じられたため）。ただし同関数のロジックを全 seed レコードへ手動
適用した結果と、`docs/10-content-audit.md` §3 の監査表（状態別カウント: verified 0 /
needs_confirmation FC7・Place5・Route1・Spot5 / demo Place7）は完全に一致している。
