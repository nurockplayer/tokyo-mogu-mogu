# Demo Script（60–90秒）/ Demo Script (60–90 s)

**Status**: 2026-08-19 更新（current main `63fdbb4` 時点の runtime に一致）。
実行 journey は `src/pages/s0s3/*`（FoodProfilePage / ExplorationWizardPage / ResultPage）
と `e2e/golden-path.test.ts` の実装に一致。Product scope / demo boundary は
`docs/specs/product/product-scope-invariant.md` + #112、current App IA は #92 / KiKi。
production `Home / Discover / MOGU / My` nav は guided conversation には表示されない。
latest Figma の prototype-only bottom nav は returning Home と Route のみに表示される。
Phase 2 の既存 code / data / 契約は保持される（direct URL で到達可能）。

> **Product scope = 東京都全域 × 複数地域 × 複数食文化。**
>
> **2026-08-23 Hackathon Demo Golden Path = 奥多摩 × 東京わさび。**

Tama / Okutama は current fieldwork / evidence / demo-content context であり、Product
の恒久 geography ではない。本スクリプトの `canonical` / `frozen` / 決定論的な
fixture（東京わさび result・奥多摩わさび紀行 route）は **8/23 demo golden path の
中でのみ** canonical / frozen であり、Product domain を狭めない。

## ゴール / Goal

審査員に 60–90 秒で以下を伝える：

1. **課題**（23区への観光集中 → まだ知られていない東京へ `行きたい理由` を作る）
2. **入口**（身近な「食」を地域・作り手・歴史・自然への entry point にする）
3. **体験**（対話で条件を整理し、地域×食文化の候補 → Story → Route → Spot まで一つの体験）
4. **信頼**（Open Data / 検証済み source がコンテンツの根拠として使われている）

## デモ制約 / Demo constraints

- **Accountless（アカウント不要）**: どの step もサインイン不要。Google Auth は補助
  infrastructure であり pitch journey に含めない。
- **No geolocation**: 実位置情報・偽位置 override・`?at=place:` demo URL 不要。
- **Deterministic（決定論的）**: Result は決定論的に **東京わさび**
  （`wasabi-okutama`）を primary として表示（secondary は 奥多摩やまめ `91%`）。
  これは **8/23 demo golden path の fixture** であり、「唯一の Product outcome」
  「唯一の未来 geography」ではない。
- **Local persistence**: Food Profile（neutral）/ MOGU Recent / Saved Routes は
  `localStorage` のみ（`tmm:foodProfile:v1` / `tmm:moguRecent:v1` /
  `tmm:savedRoutes`）。会話の nickname は **`localStorage`**（`tmm:nickname:v1`、
  #201 で許可、デモリセット時に消去）。アカウント / durable profile にならない。
- **会話型ガイド（Phase 1）**: 旅程は LINE / ChatGPT 風の逐步対話
  （MOGU のメッセージ → チップ / タイル選択で進行。ページ単位の「次へ」はなく、
  選択 / 送信で進む）。従来の form wizard ではない。
  production nav は conversation screens に表示されず、prototype-only bottom nav は
  latest Figma どおり returning Home / Route のみに表示される。
- **96% / 91% は presentation-only**: Result のマッチ度は Figma の prototype
  表示であり、実際の適合度・安全性の保証でも AI の信頼度でもない。
- **Dietary は申告・確認**: Dietary Interview は希望・制約の capture。
  安全性の判定・保証をしない。

## 主シーケンス / Primary sequence（目標 ≤90 秒）

Presented journey（Phase 1 guided conversation、Final Content Package の canonical
journey と一致）:

```text
Landing → FP 導入 → Nickname → Dietary Interview(4) → Summary → Post-profile fork
→ Exploration(5) → Result(96% + 91%) → Story → Route → Spot → Save
```

| # | Step | 画面 / route | タイム | 話すこと（Speaker note） |
|---|---|---|---|---|
| 1 | **Home（Landing）** | `/`（`東京のローカルな食文化を体験しよう。` / `食旅をはじめる`） | 5 s | 「東京23区に観光は集中しています。このアプリは食を入口に、まだ知らない東京へ『行ってみたい』理由を作ります。」初回は Food Profile 会話へ。 |
| 2 | **Food Profile 会話（初回のみ）** | `/food-profile`（`はじめる！` → nickname `ナナミ` → `これでお願いします！` → Dietary 4 ステップ［アレルギー→食生活・スタイル→宗教→苦手、各 `送信`］→ Summary `保存してつぎへ` → fork `自分に合った旅をおすすめしてもらう！`） | 15 s | 「LINE のような対話で、呼び名（prototype 内のみ、localStorage。デモリセットで消去）を聞き、食事の希望・制約を 4 ステップで確認します。これはおすすめの条件の確認であり、アレルギー対応や安全性を判定するものではありません。選択は保存されません。」 |
| 3 | **Exploration 会話（今回の旅）** | `/explore`（1/5 体験 `食べる` → 2/5 出発 `東京都` → 3/5 移動 `1時間以内` → 4/5 長さ `半日` → 5/5 味 `さっぱりした味` ＋ テーマ `自然` → `結果を見る`） | 20 s | 「今回は『食べる』『東京都から出発』『1時間以内』『半日』『さっぱりした味・自然』。これは今回の旅行の条件で、永続の好み診断ではありません。出発地はデモ用の固定選択で、住所検索ではありません。」 |
| 4 | **Result** | `/explore/result`（`96% マッチ度` 東京わさび ＋ `91%` 奥多摩やまめ） | 8 s | 「あなたの条件に合う地域×食文化の候補が複数出ました。96%・91% は Figma の prototype 表示で、実際の適合度・AI 精度の保証ではありません。東京わさびは今日のデモの代表例で、これだけが Product の結果ではありません。」 |
| 5 | **Story** | `/story/wasabi-okutama`（`味わうことが、継承になる` ＋ 周辺観光スポット ＋ MOGUMOGU ポイント） | 12 s | 「水・作り手・歴史・技と、継承の課題を一つの物語として見せます。」 |
| 6 | **Route** | `/route`（`奥多摩わさび紀行`、`デモ用ルート`） | 8 s | 「半日/1日のモデル旅程です。公共交通と徒歩の移動、地図ピンが時系列に並びます。これはデモ用ルートで、リアルタイムの交通・混雑ではありません。」 |
| 7 | **Spot Detail** | `/spot/okutama-tourism-office`（実務情報 + 旅程に追加） | 8 s | 「実在する施設の実務情報（source がある範囲）。予約・購入など未検証の行動は『準備中』と表示し、偽の導線を作りません。」 |
| 8 | **Save（検証）** | `/route` の `🔖 この旅程を保存する` | 5 s | 「保存した旅程は `tmm:savedRoutes` に残ります。My は Phase 1 の guided conversation には出しません。」 |

**計: 約 85 秒**（presenter time）。production nav は guided conversation に
表示されず、prototype-only bottom nav は returning Home / Route のみに表示される。

## 初回 / 再訪の違い / First-time vs returning

- **初回**: `Landing → FP 導入 → nickname → Dietary 4 ステップ → Summary → fork → Exploration → Result → …`（上記の通り）
- **再訪**: `Landing → Exploration 会話 → Result → …`（保存済み neutral Food Profile を
  再利用。nickname は `localStorage` で保持され、Landing は `こんにちは、ナナミさん！`
  ＋ `私の食旅（過去の旅）` を表示する。E2E が reload 後・再訪時に Food Profile を
  再質問しないことを検証済み）

## 任意の締めのビート（時間が許せば +10 秒）/ Optional closing beats

Phase 1 の guided conversation には出さないが、**direct URL で到達可能**（Phase 2 面は
preserved / 非削除）。時間と文脈が許せば直接遷移で見せられる：

- **MOGU**（`/mogu`）— 自動記録された「最近のおすすめ」（最大5件）が **Saved と
  別物**であることを示す。
- **Discover**（`/discover`）— 診断なしで browse。Story / Spot へ入り、戻ると
  Discover へ。Ome/Sawai × 日本酒（#163）もここで直接確認できる。
- **Badges**（`/my` → Badges）— **Stretch**。block してはいけない。

## リセット / Reset

Header の **demo reset control**（`src/components/DemoResetButton.tsx`、確認付き）を
タップするか、private window / 新しいブラウザプロファイルを開く。Food Profile /
MOGU Recent / Saved Routes / nickname は `localStorage` のみに保存。

## 言語 / Languages

デモ既定は日本語（judging language）。Header の **EN** / **繁中** で切り替え、
同じ journey が動作する（375px で ja / en / zh-TW すべて `scrollWidth ===
clientWidth` を確認済み、`docs/hackathon/2026-08-23-demo-runbook.md` §4）。

## 未確定設計項目 / Unresolved presentation/design question

- **`登録なし、自分で見てみる`**（Food Profile 導入画面）と **`自分で旅を探す`**
  （Post-profile fork）の遷移先は latest Figma 上で未定義。**完成済みフローとして
  説明しない**。runtime では `おすすめの旅へ戻る` のみのスタブ（destination を発明しない）。

## Route data（pitch 用）/ Route data for the pitch

- Course: **奥多摩わさび紀行**（`okutama-wasabi-journey`）、既定 half-day（約3h20m）、
  1-day に toggle 可。
- half-day の stop: 奥多摩観光案内所 → 千島わさび園 → 一心亭 → 獅子口屋。
  1-day は 大丹波川国際虹ます釣場 を追加。西東京バス / 徒歩で接続。
- 実在の奥多摩施設（Issue #127 の demo golden path）: 名前・住所は 奥多摩観光協会
  directory 由来、座標は近似（`needs_confirmation`）、route 構造は deterministic
  editorial demo コンテンツ（検証済みダイヤではない）。未検証の実務情報は
  unverified として表示。

## 整合 / Alignment

- 当日オペ: `docs/hackathon/2026-08-23-demo-runbook.md`
- 決定論シーケンスの実行順: `docs/hackathon/demo-sequence.md`
- 失敗時フォールバック: `docs/hackathon/demo-fallbacks.md`
- 審査軸との対応: `docs/hackathon/judging-axis-evidence.md` / `competition-alignment.md`
- 納期チェックリスト: `docs/hackathon/feature-freeze-checklist.md` /
  `rehearsal-checklist.md` / `submission-checklist.md`
