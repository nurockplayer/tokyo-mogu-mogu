# 2026-08-23 デモ当日オペレーション手帳 / Demo Runbook

**対象**: 8/23 ハッカソン審査デモの当日運用。プレゼンター（エンジニア以外も可）が 60 秒で読んで回せるように作った。**この手帳は 8/23 のデモ実行だけに使う。** 永続 Product の仕様は `docs/specs/product/product-scope-invariant.md` を正とする。

**検証対象ビルド**: https://tokyo-mogu-mogu.pages.dev （current main commit `63fdbb4`、2026-08-19 時点）

- 詳細なタップ手順は `docs/hackathon/demo-sequence.md`、台本（ナレーション）は `docs/demo-script.md` を参照。この手帳は手順を重複させず、**当日に必要な確定事実・境界・リカバリだけ**を載せる。
- 失敗時フローは `docs/hackathon/demo-fallbacks.md`、リハーサルは `docs/hackathon/rehearsal-checklist.md`。

---

## 0. デモ直前チェック（30 秒）

1. URL を開く → **ja** 表示になっているか（ヘッダーで `JA` をタップ）。
2. **リセット**: ヘッダーの `デモデータをリセット` をタップ → 表示が `デモデータをリセットしますか？` に変わったら **もう一度タップ**（2 段階確認）。→ 初回ランディングに戻る。
3. ビューポートは **モバイル幅（375px）** を維持（PC なら幅を狭める）。
4. リセットでクリアされるのは `tmm:foodProfile:v1` / `tmm:moguRecent:v1` / `tmm:savedRoutes` / `tmm:nickname:v1` の 4 キー（localStorage）。**`tmm:locale` はクリアされない**ので、ja へ戻すのは手動。

---

## 1. 当日の流れ

デモ順とタップは `docs/hackathon/demo-sequence.md` の表どおり。**当日の実際のボタン文言は下記が正**（2026-08-19 時点、current main `63fdbb4`）。

| 画面 | 当日の文言 | 確定チェックポイント |
|---|---|---|
| Landing | CTA `食旅をはじめる` | h1 `東京のローカルな食文化を体験しよう。` |
| Food Profile 導入 | `はじめる！` / `登録なし、自分で見てみる` | h1 `フードプロフィールをつくる` |
| Nickname | 入力（例: `ナナミ`）→ `これでお願いします！`（`スキップ` 可） | `tmm:nickname:v1` は localStorage |
| Dietary Interview（4 ステップ） | 1/4 アレルギー → 2/4 食生活・スタイル → 3/4 宗教 → 4/4 苦手（各ステップでチップ選択 → `送信`） | ステップカウンタ `n/4`。回答は**評価・保存されない** |
| Summary | `保存してつぎへ` | 選択内容の確認表示 |
| Post-profile fork | `自分に合った旅をおすすめしてもらう！` / `自分で旅を探す` | `自分で旅を探す` は**未確定 destination**（`おすすめの旅へ戻る` のみ） |
| Exploration（5 ステップ） | 1/5 体験（🍽️ などタイル）→ 2/5 出発（`東京都`/`周辺`）→ 3/5 移動（`1時間以内` など）→ 4/5 長さ（`半日`/`1日`）→ 5/5 味+テーマ（1/2 味・2/2 テーマ）→ `結果を見る` | URL → `/explore` |
| Result | `96%マッチ度` カード（primary・東京わさび）＋ `91%` カード（secondary・奥多摩やまめ） | `※ このマッチ度はデモ用のプロトタイプ表示…` の注記あり |
| Story | `東京わさびの物語を読む` | `味わうことが、継承になる`、`周辺観光スポット`、`MOGUMOGU ポイント！` |
| Route | `この食文化の観光ルートを作成する` | h1 `奥多摩わさび紀行`、`デモ用ルート` ラベル、latest Figma の prototype-only bottom nav |
| Spot | timeline ピン `奥多摩観光案内所` → `➕ 旅程に追加する` | h1 `奥多摩観光案内所` |
| Save | `ルートに戻る` → `🔖 この旅程を保存する` | 保存で `tmm:savedRoutes` に書き込み |

**決定論**: どの選択肢の組み合わせでも 96% 東京わさび（primary）＋ 91% 奥多摩やまめ（secondary）の 2 件表示に収束する（Result は固定 2 件の fixture。`63fdbb4` の e2e で検証）。

**補足（実測）**:
- nickname は `tmm:nickname:v1`（localStorage）に保存（デモリセットで消去）。再訪時は Landing が `こんにちは、ナナミさん！ あなただけの食旅を見つけよう!` ＋ `私の食旅（過去の旅）` になる（回帰確認済み）。
- Dietary Interview は **4 ステップ連続**（アレルギー → 食生活・スタイル → 宗教上の制約 → 苦手なもの）。回答は **presentation-only fixture 状態**（durable Food Profile には書き込まれず、安全性の判定は一切しない）。
- **`自分で旅を探す`（browse）の遷移先は未確定**。`登録なし、自分で見てみる`（Food Profile 導入画面）も含め、latest Figma 上で destination が定義されていない。runtime では `おすすめの旅へ戻る` だけが出るスタブ。presentation で完成済みフローとして説明しないこと（第 6 節参照）。

---

## 2. 失敗時リカバリ（要点）

詳細は `docs/hackathon/demo-fallbacks.md`。当日はこの 3 つだけ覚える:

1. **ネットワークが切れてもコア journey は継続できる**（実測済み）。ただし**一度開いたページ内で**戻る/進む操作をする。ページを丸ごと再読込（reload）はネットワークが必要なことがあるので避ける。
2. **状態が汚れたら**: ヘッダー `デモデータをリセット` → もう一度タップ → 初回フローからやり直す。壊れた `tmm:*` JSON が入っていてもクラッシュせず復旧 journey が動く（実測）。
3. **Result が出ない**: `/explore/result` を直接開いても、保存状態がなければ `/food-profile` に自動で戻る（実測）。その場合は **Food Profile から正規フローをやり直す**（Result は決定論なので同じ 2 件に収束）。

---

## 3. トゥルース境界 チートシート（「言わないこと」）

審査で誇張しない。**画面に表示される文言をそのまま読めば安全。**

| 項目 | 画面に表示される文言 | 言ってはいけないこと |
|---|---|---|
| **マッチ度 96% / 91%** | `※ このマッチ度はデモ用のプロトタイプ表示です。実際の適合度や安全性を保証するものではありません。` | 「96%の人が合う」、本物のレコメンドアルゴリズム、AI の信頼度 |
| **食事制限（Dietary Interview）** | 4 ステップの申告・確認。「このプロトタイプでは、アレルギーや食事制限への対応可否は判断しません。詳細は現地・店舗に直接ご確認ください。」 | 「アレルギー対応を判定する」「制限を考慮しておすすめしている」 |
| **出発エリア・移動時間** | `東京都` / `周辺` の固定選択（移動時間も固定選択のみ） | 「住所から検索した」「リアルタイムの交通ルートを計算した」 |
| **ルート** | `デモ用ルート`、`※ バスの時刻はデモ用データです` | 「あなたの回答を反映して旅程を自動生成した」 |
| **混雑** | `リアルタイムの混雑情報ではありません。` | 「リアルタイムに混雑を反映している」 |
| **自分で旅を探す / 登録なし、自分で見てみる** | 遷移先は未確定（`おすすめの旅へ戻る` のみ） | 「このボタンで一覧や Home に繋がる」 |

**プロダクト境界（審査で語る場合）**: 奥多摩 × 東京わさびは **8/23 デモの golden path** であり、「唯一の Product outcome」でも「唯一の未来 geography」でもない。durable Product は Tokyo-wide の multi-region × multi-food-culture。`青梅・沢井 × 日本酒` は source-backed の playable slice で、デモ fixture ではない。

---

## 4. 検証済み事実（エビデンス）

2026-08-17、本番ビルド https://tokyo-mogu-mogu.pages.dev（commit `9c0d404`、#228 マージ後）に Playwright（chromium、375px）で実測し、正規パス各ステップ PASS、console / page error 0。2026-08-19 時点の current main `63fdbb4` では clean exact-head validation と Playwright **43/43** が PASS し、以下の文言・挙動を再確認済み。

- ✅ **正規パス**（ja/375px）: Landing → Food Profile 導入（`はじめる！`/`登録なし、自分で見てみる`）→ nickname → Dietary Interview 4 ステップ（ステップカウンタ 1/4–4/4、各 `送信`）→ Summary（`保存してつぎへ`）→ Post-profile fork（`自分に合った旅をおすすめしてもらう！`）→ Exploration 5 ステップ（体験 → 出発 → 移動 → 長さ → 味+テーマ）→ Result（96% primary ＋ 91% secondary、prototype 注記）→ Story → Route（`デモ用ルート` ＋ `リアルタイムの混雑情報ではありません`）→ Spot → 旅程保存。全て PASS。
- ✅ **Dietary 順序**: アレルギー → 食生活・スタイル → 宗教 → 苦手（実測）。
- ✅ **fork**: `自分で旅を探す` は `おすすめの旅へ戻る` のみ（destination 未確定のまま、発明していない）。
- ✅ **決定論**: Result は固定 2 件 fixture（96% 東京わさび primary ＋ 91% 奥多摩やまめ secondary）。どの選択でも同じ 2 件表示に収束。
- ✅ **デモリセット**: 2 段階確認 → 4 キー消去 → クリーン初回表示。
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

8/23 の台本・Design Spec・Judge Q&A は **Final Content Package を content authority** とする。current main `63fdbb4`（2026-08-19 時点）では **runtime の journey が Package の canonical 記述と一致**している。

**一致している（画面表示が Package と整合）**:

| Package | runtime での確認 |
|---|---|
| FREEZE-04 journey（Landing → nickname → dietary → summary → fork → Experience → Departure → Travel → Duration → Taste+Theme → Result → Story → Route → Spot） | 14 ステップ・順序・粒度が一致。Dietary は 4 ステップ（アレルギー → 食生活 → 宗教 → 苦手）、Exploration は 5 ステップ（体験 → 出発 → 移動 → 長さ → 味+テーマ） |
| FREEZE-05 fork 未確定（`登録なし、自分で見てみる`） | destination 未確定。runtime は `自分で旅を探す` が `おすすめの旅へ戻る` のみのスタブ。destination を発明していない |
| FREEZE-06 Result は複数候補を表示可能 | 96%（東京わさび）primary ＋ 91%（奥多摩やまめ）secondary |
| FREEZE-07 match 値は presentation fixture | `※ このマッチ度はデモ用のプロトタイプ表示です…` |
| FREEZE-09 Dietary は希望・制約の確認 | 4 ステップの申告・確認。安全性判定なし（「対応可否は判断しません」） |
| FREEZE-10 Route はモデル提示 | `デモ用ルート`、`バスの時刻はデモ用データです`、`リアルタイムの混雑情報ではありません` |

**presentation で語る際のニュアンス**:

1. Dietary 4 ステップの回答は **durable には保存されない**（presentation-only fixture 状態）。Summary では選択内容を確認できる。
2. browse 分岐のラベルは runtime では **`自分で旅を探す`**（Food Profile 導入画面では **`登録なし、自分で見てみる`**）。いずれも destination 未確定。**完成済みフローとして語らない**。
3. 96% / 91% は fixture。AI の信頼度・推薦精度・ranking score として語らない。

---

## 7. 残タスク（当日ブロッカーではない）

- フォントのローカル同梱（オフライン完全対応）は未対応（デモはオンライン前提）。
