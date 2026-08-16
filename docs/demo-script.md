# Demo Script（60–90秒）/ Demo Script (60–90 s)

**Status**: 2026-08-16 更新（Issue #217 Phase 1 = KiKi 会話型ガイド prototype）。
実行 journey は `e2e/golden-path.test.ts` と `src/app/AppRouter.tsx` の実装に一致。
Product scope / demo boundary は `docs/specs/product/product-scope-invariant.md` +
#112、current App IA は #92 / KiKi。Phase 1 は production bottom-nav
（Home / Discover / MOGU / My）を demo path から隠す presentation mode であり、
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
3. **体験**（`あなたを知る → 今回の旅をえらぶ → 巡って応援` の一つのサービス体験）
4. **信頼**（Open Data / 検証済み source が mechanism の一部として使われている）

## デモ制約 / Demo constraints

- **Accountless（アカウント不要）**: どの step もサインイン不要。Google Auth は補助
  infrastructure であり pitch journey に含めない。
- **No geolocation**: 実位置情報・偽位置 override・`?at=place:` demo URL 不要。
- **Deterministic（決定論的）**: Result は決定論的に **東京わさび**
  （`wasabi-okutama`）、モデルルートは **奥多摩わさび紀行**
  （`okutama-wasabi-journey`）。これは **8/23 demo golden path の fixture** であり、
  「唯一の Product outcome」「唯一の未来 geography」ではない。
- **Local persistence**: Food Profile / MOGU Recent / Saved Routes は
  `localStorage` のみ（`tmm:foodProfile:v1` / `tmm:moguRecent:v1` /
  `tmm:savedRoutes`）。会話の nickname は **sessionStorage**（`tmm:nickname:v1`）
  のみで、アカウント / profile にならない。
- **会話型ガイド（Phase 1）**: 旅程は LINE / ChatGPT 風の逐步対話
  （MOGU のメッセージ → quick reply → 選択が履歴に残る → 次へ）。従来の
  form wizard ではない。production bottom-nav は demo path に表示されない。
- **96% は presentation-only**: Result の `96% マッチ度` は Figma の prototype
  表示で、実際の適合度・安全性の保証でも scoring 基盤でもない。

## セカンドスライス（#163）/ Second playable slice

#163 で **source-backed の第二の playable slice（青梅・沢井 × 日本酒:
`sake-ome` / `ome-sawai-sake-journey`）**が **Discover** から遊べるようになった
（data/config のみで追加。shared contract 未変更・Product scope 非縮小）。
最終デモの実行 journey は **#163 QA 後に決定**（#112 / #163）。主シーケンス
（下記 90 秒）は引き続き決定論的な 奥多摩 × 東京わさび golden path のまま。

## 主シーケンス / Primary sequence（目標 ≤90 秒）

Presented journey（#217 Phase 1 guided conversation）:

```text
Landing → Food Profile 会話（nickname + dietary）→ Exploration 会話 → Result
(96% presentation) → Story → Route → Spot → Save
```

| # | Step | 画面 / route | タイム | 話すこと（Speaker note） |
|---|---|---|---|---|
| 1 | **Home（Landing）** | `/`（`東京の食文化と出会う旅` / `わたしの食文化の旅をはじめる`） | 5 s | 「東京23区に観光は集中しています。このアプリは食を入口に、まだ知らない東京へ『行ってみたい』理由を作ります。」初回は Food Profile 会話へ。 |
| 2 | **Food Profile 会話（初回のみ）** | `/food-profile`（`MOGU MOGUへようこそ！` → nickname → 食事のご案内 → summary） | 10 s | 「LINE のような対話で、呼び名（セッション限定）を聞き、食事・アレルギーへの対応可否はこのプロトタイプでは判断しないことをお伝えします。これはおすすめのためだけに使い、安全性の保証ではありません。Phase 1 は固定ルートと整合する項目だけを出します。nickname はアカウントになりません。」 |
| 3 | **Exploration 会話（今回の旅）** | `/explore`（挨拶 + 味 → 体験 → 起点・移動 → 興味 → 半日/1日） | 20 s | 「今回は『さっぱり・爽やか』『食べる』『奥多摩まで60分』『自然・景色』『半日』。これは今回の旅行の条件で、永続の好み診断ではありません。選択肢は奥多摩 × 東京わさびの旅程と整合するように絞られています。」 |
| 4 | **Result** | `/explore/result`（`96% マッチ度` + `東京わさび` reveal） | 10 s | 「あなたの条件に合う、地域×食文化の候補が出ました。96% は Figma の prototype 表示で、実際の適合度・AI 精度の保証ではありません。東京わさびは今日のデモの fixture で、これだけが Product の結果ではありません。」 |
| 5 | **Story** | `/story/wasabi-okutama`（`味わうことが、継承になる` + support CTA） | 15 s | 「水・作り手・歴史・技と、継承の課題を一つの物語として見せます。応援 CTA はここに分散配置（共有・理解・ルートを見る）。」 |
| 6 | **Route** | `/route`（`奥多摩わさび紀行` half-day / 1-day、ピン + mobility） | 10 s | 「半日/1日の実行可能な旅程。公共交通と徒歩の移動、地図ピンが時系列に並びます。『この旅程を保存する』で保存。」 |
| 7 | **Spot Detail** | `/spot/okutama-tourism-office`（実務情報 + 旅程に追加） | 10 s | 「実在する施設の実務情報（source がある範囲）。予約・購入など未検証の行動は『準備中』と表示し、偽の導線を作りません。」 |
| 8 | **Save（検証）** | `/route` の `🔖 この旅程を保存する`（Saved Routes contract を確認） | 5 s | 「保存した旅程は `tmm:savedRoutes` に残ります。My（`/my`）は Phase 1 の demo path には出しません（direct URL で到達可能な Phase 2 面）。」 |

**計: 約 85 秒**（presenter time）。production bottom-nav は demo path に
表示されない（`/my` / `/mogu` / `/discover` は direct URL でのみ到達）。

## 初回 / 再訪の違い / First-time vs returning

- **初回**: `Landing → Food Profile 会話（nickname + dietary）→ Exploration 会話
  → Result → …`（上記の通り）
- **再訪**: `Landing → Exploration 会話 → Result → …`（保存済み Food Profile を
  再利用。E2E が `reload` 後・再訪時に Food Profile を再質問しないことを検証済み。
  nickname は session-only なので、新しい session ではもう一度聞かれる）

## 任意の締めのビート（時間が許せば +10 秒）/ Optional closing beats

Phase 1 の demo path には出さないが、**direct URL で到達可能**（Phase 2 面は
preserved / 非削除）。時間と文脈が許せば直接遷移で見せられる：

- **MOGU**（`/mogu`）— 自動記録された「最近のおすすめ」（最大5件）が **Saved と
  別物**であることを示す。再オープンすると `Result → Story → Route → Spot` の
  文脈に戻る（戻ると MOGU へ）。
- **Discover**（`/discover`）— 診断なしで browse。Story / Spot へ入り、戻ると
  Discover へ。Discover 閲覧は MOGU Recent を汚染しない。Ome/Sawai × 日本酒
  （#163）もここで直接確認できる。
- **Badges**（`/my` → Badges）— **Stretch**。block してはいけない。時間が
  あるときだけ触る。

## リセット / Reset

Header の **demo reset control**（`src/components/DemoResetButton.tsx`、確認付き）を
タップするか、private window / 新しいブラウザプロファイルを開く。Food Profile /
MOGU Recent / Saved Routes は `localStorage` のみに保存。

## 言語 / Languages

デモ既定は日本語（judging language）。Header の **EN** / **繁中** で切り替え、
同じ journey が動作する（375px で ja / en / zh-TW すべて `scrollWidth ===
clientWidth` を QA で確認済み、`docs/ia-qa-report.md`）。

## Route data（pitch 用）/ Route data for the pitch

- Course: **奥多摩わさび紀行**（`okutama-wasabi-journey`）、既定 half-day（約3h20m）、
  1-day に toggle 可。
- half-day の stop: 奥多摩観光案内所 → 千島わさび園 → 一心亭 → 獅子口屋。
  1-day は 大丹波川国際虹ます釣場 を追加。西東京バス / 徒歩で接続。
- 実在の奥多摩施設（Issue #127 の demo golden path）: 名前・住所は 奥多摩観光協会
  directory 由来、座標は近似（`needs_confirmation`）、route 構造は deterministic
  editorial demo コンテンツ（検証済みダイヤではない）。未検証の実務情報は
  unverified として表示。

## Support actions（分散モデル）/ Distributed support

Support CTA は cross-screen パターンであり **standalone ページではない**：

- **Story** — 共有 / 地域の意味を理解 / ルートを見る（`味わうことが、継承になる`
  の直後）
- **Route** — 旅程を保存 / 訪問を計画（`My → Saved Routes` に書く）
- **Spot Detail** — venue 種別に応じた action（店=予約/行く、shop=オンライン購入/
  現地購入、workshop=体験予約）。未検証 action は `準備中` を表示し、destination を
  偽らない。

standalone の応援 (`/support`) bottom-nav や top-level My Route tab はない。
Saved Route は **My** 配下。

## Save → Saved Routes（My）

Route の保存（および Spot の `旅程に追加する`）は共有 `tmm:savedRoutes` の
localStorage contract に書く。Story の support は共有・理解・ルート表示であり、
すべてが save action ではない。**MOGU Recent（自動記録）と Saved Routes（明示保存）
は別の意味論**。demo reset は両方に加えて Food Profile / Badge state を消す。

## 整合 / Alignment

- Pitch one-liner・審査軸との対応: `docs/hackathon/judging-axis-evidence.md`
- 競技戦略: `docs/hackathon/competition-alignment.md`（§6 審査軸 / §7 evidence
  matrix / §9 one-liner）
- 決定論シーケンスの実行順: `docs/hackathon/demo-sequence.md`
- 失敗時フォールバック: `docs/hackathon/demo-fallbacks.md`
- 納期チェックリスト: `docs/hackathon/feature-freeze-checklist.md` /
  `rehearsal-checklist.md` / `submission-checklist.md`
