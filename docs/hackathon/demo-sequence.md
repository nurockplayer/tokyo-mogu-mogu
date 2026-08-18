# Deterministic Demo Sequence（決定論デモ手順）/ Play Sheet

**Status**: 2026-08-19 更新（current main `63fdbb4` 時点の runtime に一致）。実行順は
`src/pages/s0s3/phase1-parity.test.ts` と `e2e/golden-path.test.ts` の操作に一致。
production `Home / Discover / MOGU / My` nav は guided conversation には表示されない。
latest Figma の **prototype-only bottom nav** は returning Home と Route だけに表示される。
ナレーション台本は `docs/demo-script.md`、当日オペは `docs/hackathon/2026-08-23-demo-runbook.md`、
審査軸との対応は `docs/hackathon/judging-axis-evidence.md`。

**デモ前に必ず実行**:
1. Header の **demo reset control**（`DemoResetButton`）→ 確認 → `localStorage` と
   nickname をクリア（`tmm:foodProfile:v1` / `tmm:moguRecent:v1` /
   `tmm:savedRoutes` / `tmm:nickname:v1`。`tmm:locale` は残るので手動で ja へ）。
2. ロケール **ja**、ビューポート **375px**（mobile）。
3. **デモはオンラインで開始する**。一度読み込んだコア journey は一時的な回線断でも
   継続できるが、cold reload / 未読 lazy chunk / Google Fonts にはネットワークが必要。
   Spot の外部リンク CTA もネットワークが要る。`demo-fallbacks.md` と
   `docs/hackathon/2026-08-23-demo-runbook.md` §2・§5 を参照。

## Sequence（目安 85 s / 上限 90 s）

| # | Step | 操作（exact tap / click） | 確認ポイント | 時間 |
|---|---|---|---|---|
| 0 | 前準備 | DemoResetButton → 確認、ja、375px | 空状態 | 5 s |
| 1 | **Landing** | `/` で CTA `食旅をはじめる` | h1 `東京のローカルな食文化を体験しよう。`、bottom-nav なし | 5 s |
| 2 | **Food Profile 導入** | `はじめる！` | h1 `フードプロフィールをつくる`。`登録なし、自分で見てみる` は未確定（押さない） | 3 s |
| 3 | **Nickname** | 入力 `ナナミ` → `これでお願いします！`（`スキップ` 可） | `tmm:nickname:v1` は localStorage（デモリセットで消去） | 5 s |
| 4 | **Dietary Interview（4 ステップ）** | ①アレルギー `アレルギーはありません`→`送信` ②食生活 `特になし`→`送信` ③宗教 `特になし`→`送信` ④苦手 `特になし`→`送信` | ステップカウンタ `n/4`。回答は評価・保存されない | 12 s |
| 5 | **Summary** | `保存してつぎへ` | 選択内容の確認 | 5 s |
| 6 | **Post-profile fork** | `自分に合った旅をおすすめしてもらう！` | `自分で旅を探す` は未確定スタブ（`おすすめの旅へ戻る` のみ） | 3 s |
| 7 | **Exploration（5 ステップ）** | 1/5 `食べる` 2/5 `東京都` 3/5 `1時間以内` 4/5 `半日` 5/5 味 `さっぱりした味`・テーマ `自然`（1/2・2/2）→ `結果を見る` | URL → `/explore`。挨拶に `ナナミ` | 22 s |
| 8 | **Result** | カード `東京わさび`（`96%` `マッチ度`）＋ `奥多摩やまめ`（`91%`） | prototype 注記 `※ このマッチ度はデモ用のプロトタイプ表示…` | 8 s |
| 9 | **Story** | `東京わさびの物語を読む` | `/story/wasabi-okutama`、`味わうことが、継承になる` | 12 s |
| 10 | **Route** | `この食文化の観光ルートを作成する` | `/route`、h1 `奥多摩わさび紀行`、`デモ用ルート`、prototype bottom-nav | 8 s |
| 11 | **Spot** | timeline ピン `奥多摩観光案内所` → `➕ 旅程に追加する` → `旅程に追加しました` → `閉じる` | `/spot/okutama-tourism-office`、h1 `奥多摩観光案内所` | 8 s |
| 12 | **Save** | `ルートに戻る` → `🔖 この旅程を保存する` → `旅程を保存しました` | `tmm:savedRoutes` に `奥多摩わさび紀行` | 4 s |

**合計: 約 85 s**。production nav は guided conversation には表示されず、
prototype-only bottom nav は latest Figma どおり returning Home / Route のみに表示される。

### 任意（+10 s、時間が許せば）— Phase 2 面は direct URL で到達

| Step | 操作 | 確認ポイント |
|---|---|---|
| MOGU | `/mogu` を直接開く → `このおすすめを見る` → `東京わさびの物語を読む` | `/mogu` → `/explore/result` → `/story/wasabi-okutama`。戻ると MOGU 方向へ |
| Discover | `/discover` を直接開く → `東京わさび` → Story | `/discover` 閲覧では MOGU Recent が増えない |
| Discover（第2スライス #163） | `/discover` を直接開く → `青梅・沢井の日本酒` → Story → `この食文化の観光ルートを作成する` → timeline ピン `小澤酒造` → Spot | `/discover` → `/story/sake-ome` → `/route` → `/spot/sawai-ozawa-shuzo`。source-backed の playable slice（fixture ではない） |
| Badges | `/my` を直接開く → Badges entry | **Stretch**。時間があるときのみ |

## Fixture（demo-scoped）/ Deterministic fixtures

- Result: **東京わさび**（`wasabi-okutama`）＋ secondary **奥多摩やまめ**（`91%`）
- Route: **奥多摩わさび紀行**（`okutama-wasabi-journey`、half-day default）
- Spot: **奥多摩観光案内所**（`okutama-tourism-office`）
- Story tagline: `味わうことが、継承になる`

これらは **8/23 demo golden path の fixture**（#127）であり、「唯一の Product
outcome」「唯一の未来 geography」ではない。ナレーションで明示すること。

対して `sake-ome` / `ome-sawai-sake-journey`（青梅・沢井 × 日本酒、#163）は
**source-backed の playable slice** であり **demo fixture ではない**（Open Data /
official source 由来の editorial コンテンツ）。optional ビート（上表）で語る場合も、
決定論デモ結果（東京わさび）はそのまま。

## 関連

- 台本: `docs/demo-script.md`
- 当日オペ: `docs/hackathon/2026-08-23-demo-runbook.md`
- 失敗時: `docs/hackathon/demo-fallbacks.md`
- 検証: `e2e/golden-path.test.ts`（ja, 375px）、`src/pages/s0s3/phase1-parity.test.ts`
