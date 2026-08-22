# 2026-08-23 デモ当日オペレーション手帳 / Demo Runbook

**対象**: 8/23 ハッカソン審査デモの当日運用。プレゼンター（エンジニア以外も可）が 60 秒で読んで回せるように作った。**この手帳は 8/23 のデモ実行だけに使う。** 永続 Product の仕様は `docs/specs/product/product-scope-invariant.md` を正とする。

**検証対象**: 2026-08-20 release candidate（#257 guided tutorial + #255 ranked Top 3）。https://tokyo-mogu-mogu.pages.dev は merge / deploy 後に exact-head を再確認する。

- 詳細なタップ手順は `docs/hackathon/demo-sequence.md`、台本（ナレーション）は `docs/demo-script.md` を参照。この手帳は手順を重複させず、**当日に必要な確定事実・境界・リカバリだけ**を載せる。
- 失敗時フローは `docs/hackathon/demo-fallbacks.md`、リハーサルは `docs/hackathon/rehearsal-checklist.md`。

---

## 0. デモ直前チェック（30 秒）

1. URL を開く → **ja** 表示になっているか（ヘッダーで `JA` をタップ）。
2. **リセット**: ヘッダーの `デモデータをリセット` をタップ → 表示が `デモデータをリセットしますか？` に変わったら **もう一度タップ**（2 段階確認）。→ 初回ランディングに戻る。
3. ビューポートは **モバイル幅（375px）** を維持（PC なら幅を狭める）。
4. リセットは `tmm:foodProfile:v1` / `tmm:moguRecent:v1` / `tmm:savedRoutes` / `tmm:nickname:v1`（localStorage）と `tmm:tutorial:v1`（sessionStorage）をクリアする。**`tmm:locale` はクリアされない**ので、ja へ戻すのは手動。

---

## 1. 当日の流れ

デモ順とタップは `docs/hackathon/demo-sequence.md` の表どおり。**初回デモでは「ガイドモード」と光っている 1 選択肢だけを操作する。**

| 画面 | 当日の文言 | 確定チェックポイント |
|---|---|---|
| Landing | CTA `食旅をはじめる` | h1 `東京のローカルな食文化を体験しよう。` |
| Food Profile 導入 | `はじめる！`（ガイド対象） | 非対象の browse 選択は初回ガイド中は disabled |
| Nickname | 入力（例: `ナナミ`）→ `これでお願いします！`（`スキップ` 可） | `tmm:nickname:v1` は localStorage |
| Dietary Interview（4 ステップ） | 各問で光っている `なし` 回答 → 光った `送信` | ステップカウンタ `n/4`。回答は recommendation-only |
| Summary | `保存してつぎへ` | 選択内容の確認表示 |
| Post-profile fork | `自分に合った旅をおすすめしてもらう！`（ガイド対象） | 通常モードの `自分で旅を探す` は `/discover` |
| 食旅診断（5 ステップ） | 1/5 体験（🍽️ などタイル）→ 2/5 出発（`東京都`/`周辺`）→ 3/5 移動（`1時間以内` など）→ 4/5 長さ（`半日`/`1日`）→ 5/5 味+テーマ（1/2 味・2/2 テーマ）→ `結果を見る` | URL → `/explore`。Dietary の会話とは別の、再実行可能な診断セッション |
| Result | `あなたへのおすすめ Top 3`：東京わさび → 秋川の旬の農産物 → 青梅・沢井の日本酒 | 3 件すべて source-backed、それぞれ Story CTA あり。パーセント表示なし |
| Story | `東京わさびの物語を読む` | `味わうことが、継承になる`、`周辺観光スポット`、`MOGUMOGU ポイント！` |
| Route | `この食文化の観光ルートを作成する` | h1 `奥多摩わさび紀行`、`デモ用ルート` ラベル、latest Figma の prototype-only bottom nav |
| Spot | timeline ピン `奥多摩観光案内所` → `➕ 旅程に追加する` | h1 `奥多摩観光案内所` |
| Save | `ルートに戻る` → `🔖 この旅程を保存する` | 保存で `tmm:savedRoutes` に書き込み |

**決定論**: ガイドの正当な入力は常に東京わさびを第 1 候補にする。Result は同じ recommendation decision から上位 3 件を安定表示し、通常モードの別回答は別の source-backed journey を第 1 候補にできる。

**補足（実測）**:
- nickname は `tmm:nickname:v1`（localStorage）に保存（デモリセットで消去）。再訪時は Landing が `こんにちは、ナナミさん！ あなただけの食旅を見つけよう!` ＋ `私の食旅（過去の旅）` になる（回帰確認済み）。
- Dietary Interview は **4 ステップ連続**（アレルギー → 食生活・スタイル → 宗教上の制約 → 苦手なもの）。回答は既存の coarse category と free-text note に変換して **durable Food Profile に保存**する。recommendation-only であり、安全性の判定は一切しない。
- Result の `今回の探索をもう一度` は食旅診断だけをリセットする。durable Food Profile は保持され、Dietary Interview は明示的な編集時以外は繰り返さない。
- `登録なし、自分で見てみる` / `自分で旅を探す` は通常モードで `/discover` へ遷移する。初回ガイド中はゴールデンパスに集中させるため disabled。

---

## 2. 失敗時リカバリ（要点）

詳細は `docs/hackathon/demo-fallbacks.md`。当日はこの 3 つだけ覚える:

1. **ネットワークが切れてもコア journey は継続できる**（実測済み）。ただし**一度開いたページ内で**戻る/進む操作をする。ページを丸ごと再読込（reload）はネットワークが必要なことがあるので避ける。
2. **状態が汚れたら**: ヘッダー `デモデータをリセット` → もう一度タップ → 初回フローからやり直す。壊れた `tmm:*` JSON が入っていてもクラッシュせず復旧 journey が動く（実測）。
3. **Result が出ない**: `/explore/result` を直接開いても保存状態がなければ `/food-profile` へ戻る。Food Profile からガイドをやり直すと同じ Top 3 に復帰する。

---

## 3. トゥルース境界 チートシート（「言わないこと」）

審査で誇張しない。**画面に表示される文言をそのまま読めば安全。**

| 項目 | 画面に表示される文言 | 言ってはいけないこと |
|---|---|---|
| **Result 順位** | `第1候補` 〜 `第3候補`。理由タグと source-backed journey を表示 | 内部加算 score を確率・AI 信頼度・適合率と説明すること |
| **食事制限（Dietary Interview）** | 4 ステップの申告・確認。「このプロトタイプでは、アレルギーや食事制限への対応可否は判断しません。詳細は現地・店舗に直接ご確認ください。」 | 「アレルギー対応を判定する」「制限を考慮しておすすめしている」 |
| **出発エリア・移動時間** | `東京都` / `周辺` の固定選択（移動時間も固定選択のみ） | 「住所から検索した」「リアルタイムの交通ルートを計算した」 |
| **ルート** | `デモ用ルート`、`※ バスの時刻はデモ用データです` | 「あなたの回答を反映して旅程を自動生成した」 |
| **混雑** | `リアルタイムの混雑情報ではありません。` | 「リアルタイムに混雑を反映している」 |
| **自分で旅を探す / 登録なし、自分で見てみる** | 通常モードで `/discover` | 初回ガイド中も自由選択できると説明すること |

**プロダクト境界（審査で語る場合）**: 奥多摩 × 東京わさびは **8/23 デモの golden path** であり、「唯一の Product outcome」でも「唯一の未来 geography」でもない。durable Product は Tokyo-wide の multi-region × multi-food-culture。`青梅・沢井 × 日本酒` は source-backed の playable slice で、デモ fixture ではない。

---

## 4. 検証済み事実（エビデンス）

2026-08-20 release candidate で Playwright（chromium、375px）**74/74**、Vitest **651/651**、typecheck、production build が PASS。root-scoped ESLint は error 0（既存 warning 25）。merge / deploy 後は本番 URL で exact-head smoke を再実行する。

- ✅ **正規パス**（ja/375px）: ガイドモードで毎回 1 つのみ操作可 → Food Profile → Exploration → Result Top 3 → Story → Route → Spot → 旅程保存。
- ✅ **Dietary 順序**: アレルギー → 食生活・スタイル → 宗教 → 苦手（実測）。
- ✅ **fork**: 通常モードの browse は `/discover`。初回ガイドでは recommendation 分岐のみ操作可。
- ✅ **決定論**: ガイドは東京わさびを第 1 候補にし、同一 decision の real Top 3 を表示。MOGU reopen は履歴 candidate を先頭に保つ。
- ✅ **デモリセット**: 2 段階確認 → durable data + tutorial session 消去 → クリーン初回表示。
- ✅ **nickname 永続化 / 再訪**: `tmm:nickname:v1`（localStorage）。再訪で `こんにちは、ナナミさん！` ＋ `私の食旅（過去の旅）`。
- ✅ **ブラウザ back / reload**: 状態保持・クラッシュなし。
- ✅ **オーバーフロー**: ja/en/zh-TW とも `scrollWidth === clientWidth`（375px）。
- ✅ **ロケール**: ja/en/zh-TW で切替動作。
- ⚠️ **オフライン**（ページ読み込み済み / プリウォーム）: コンテンツは正しく描画。ただし**フォント（Google Fonts `.woff2`）はローカル同梱でなくネットワーク失敗が発生**（console に `net::ERR_INTERNET_DISCONNECTED`、非致命でフォールバック表示）。詳細は第 5 節。

---

## 5. 既知の注意（当日ブロッカーではない）

- ヘッダーの `デモデータをリセット` ボタンのタップ領域が 26px と小さい（推奨 44px 未満）。**押せるので運用は問題なし**。当日は「タップ位置が少し小さい」ことだけ留意。
- **オフライン時のページ再読込（cold reload）は想定外**: index.html が HTTP キャッシュ不可で、lazy-load チャンクも初回読み込みにネットワークが必要。当日は**開いたまま**進める。`demo-fallbacks.md` の「Spot 外部リンク CTA はネットワークが必要」も同じ理由。
- **オフライン時はフォントがフォールバックに変わる**（`net::ERR_INTERNET_DISCONNECTED` が console に出るが、アプリは動く）。**デモはオンラインで実施**し、オフラインは「ネットワークが切れても止まらない」という resilience の説明にのみ使う。
- 極端に速い連打（前画面の描画完了前に次のリンクをタップ）で Route 画面が稀にエラー画面を一瞬挟むことがある。通常操作では発生しない。当日は**各画面の表示を確認してから次のタップ**を行う。

---

## 6. Final Content Package 対応（presentation 用の一致・差異）

8/23 の台本・Design Spec・Judge Q&A は **Final Content Package を content authority** とする。#255 / #257 の明示 Product decision が古い Result fixture / 自由操作記述を上書きする。

**一致している（画面表示が Package と整合）**:

| Package | runtime での確認 |
|---|---|
| FREEZE-04 journey（Landing → nickname → dietary → summary → fork → Experience → Departure → Travel → Duration → Taste+Theme → Result → Story → Route → Spot） | 14 ステップ・順序・粒度が一致。Dietary は 4 ステップ（アレルギー → 食生活 → 宗教 → 苦手）、Exploration は 5 ステップ（体験 → 出発 → 移動 → 長さ → 味+テーマ） |
| FREEZE-05 fork | 通常モードは `/discover`。初回 tutorial は recommend に限定 |
| FREEZE-06 Result は複数候補を表示可能 | recommendation decision 由来の source-backed Top 3 |
| FREEZE-07 match 値 | 虚構のパーセントを廃止。順位と実在する理由タグのみ |
| FREEZE-09 Dietary は希望・制約の確認 | 4 ステップの申告・確認。安全性判定なし（「対応可否は判断しません」） |
| FREEZE-10 Route はモデル提示 | `デモ用ルート`、`バスの時刻はデモ用データです`、`リアルタイムの混雑情報ではありません` |

**presentation で語る際のニュアンス**:

1. Dietary 4 ステップの回答は既存の coarse category と free-text note に変換して **durable Food Profile に保存**する。Summary では選択内容を確認でき、再診断時も保持される。
2. browse 分岐は `/discover` に接続済み。ガイド中は意図的に disabled。
3. 順位は deterministic recommendation の並びであり、確率・AI 信頼度・安全性保証ではない。

---

## 7. 残タスク（当日ブロッカーではない）

- フォントのローカル同梱（オフライン完全対応）は未対応（デモはオンライン前提）。
