# Deterministic Demo Sequence（決定論デモ手順）/ Play Sheet

**Status**: 2026-08-16 更新（Issue #217 Phase 1 会話型ガイド）。実行順は
`e2e/golden-path.test.ts` の操作と 1:1 対応。production bottom-nav は demo path
に表示されない（My / MOGU / Discover は direct URL で到達する Phase 2 面）。
ナレーション台本は `docs/demo-script.md`、審査軸との対応は
`docs/hackathon/judging-axis-evidence.md`。

**デモ前に必ず実行**:
1. Header の **demo reset control**（`DemoResetButton`）→ 確認 → `localStorage` と
   session nickname をクリア（`tmm:foodProfile:v1` / `tmm:moguRecent:v1` /
   `tmm:savedRoutes` / `tmm:nickname:v1`）。
2. ロケール **ja**、ビューポート **375px**（mobile）。
3. 端末 / ブラウザのネットワークは不必要（コア journey はすべてローカルに同梱。

   Spot の外部リンク CTA だけネットワークが要る。`demo-fallbacks.md` 参照）。

## Sequence（目安 80 s / 上限 90 s）

| # | Step | 操作（exact tap / click） | 確認ポイント | 時間 |
|---|---|---|---|---|
| 0 | 前準備 | DemoResetButton → 確認、ja、375px | 空状態 | 5 s |
| 1 | **Landing** | `/` で CTA `わたしの食文化の旅をはじめる` | h1 `東京の食文化と出会う旅`、bottom-nav なし | 5 s |
| 2 | **Food Profile 会話** | `MOGU MOGUへようこそ！` → `はじめる！` → nickname `ナナミ` → `これでお願いします！` → 苦手な食材 `いいえ` → `次へ` → `次へ`（任意入力）→ `保存してつぎへ` | URL → `/explore`、`tmm:nickname:v1` は sessionStorage のみ | 12 s |
| 3 | **Exploration 会話** | 挨拶確認 → ①`さっぱり・爽やか`→`次へ` ②`食べる`→`次へ` ③`奥多摩`+`60分以内`→`次へ` ④`自然・景色`→`次へ` ⑤`半日（日帰り）`→`結果を見る` | URL → `/explore/result`、挨拶に `ナナミ` | 20 s |
| 4 | **Result** | カード `東京わさび` + `.tmm-result-match` = `96%` `マッチ度` + prototype 注記 | `.tmm-result-card__title` = 東京わさび | 10 s |
| 5 | **Story** | `東京わさびの物語を読む` | `/story/wasabi-okutama`、`味わうことが、継承になる` | 15 s |
| 6 | **Route** | `モデルルートを見る` | `/route`、h1 `奥多摩わさび紀行` | 10 s |
| 7 | **Spot** | timeline ピン `奥多摩観光案内所` → `➕ 旅程に追加する` → `旅程に追加しました` → `閉じる` | `/spot/okutama-tourism-office`、h1 `奥多摩観光案内所` | 10 s |
| 8 | **Save** | `ルートに戻る` → `🔖 この旅程を保存する` → `旅程を保存しました` | `tmm:savedRoutes` に `奥多摩わさび紀行` | 5 s |

**合計: 約 85 s**。production bottom-nav は Phase 1 の demo path に表示されない。

### 任意（+10 s、時間が許せば）— Phase 2 面は direct URL で到達

| Step | 操作 | 確認ポイント |
|---|---|---|
| MOGU | `/mogu` を直接開く → `このおすすめを見る` → `東京わさびの物語を読む` | `/mogu` → `/explore/result` → `/story/wasabi-okutama`。戻ると MOGU 方向へ |
| Discover | `/discover` を直接開く → `東京わさび` → Story | `/discover` 閲覧では MOGU Recent が増えない |
| Discover（第2スライス #163） | `/discover` を直接開く → `青梅・沢井の日本酒` → Story → `モデルルートを見る` → timeline ピン `小澤酒造` → Spot | `/discover` → `/story/sake-ome` → `/route` → `/spot/sawai-ozawa-shuzo`。source-backed の playable slice（fixture ではない） |
| Badges | `/my` を直接開く → Badges entry | **Stretch**。時間があるときのみ |

## Fixture（demo-scoped）/ Deterministic fixtures

- Result: **東京わさび**（`wasabi-okutama`）
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
- 失敗時: `docs/hackathon/demo-fallbacks.md`
- 検証: `e2e/golden-path.test.ts`（ja, 375px）、`docs/ia-qa-report.md`
