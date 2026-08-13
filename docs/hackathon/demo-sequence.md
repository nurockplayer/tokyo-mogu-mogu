# Deterministic Demo Sequence（決定論デモ手順）/ Play Sheet

**Status**: 2026-08-14。実行順は `e2e/golden-path.test.ts`（#120）の操作と 1:1 対応。
ナレーション台本は `docs/demo-script.md`、審査軸との対応は
`docs/hackathon/judging-axis-evidence.md`。

**デモ前に必ず実行**:
1. Header の **demo reset control**（`DemoResetButton`）→ 確認 → `localStorage` を
   クリア（`tmm:foodProfile:v1` / `tmm:moguRecent:v1` / `tmm:savedRoutes`）。
2. ロケール **ja**、ビューポート **375px**（mobile）。
3. 端末 / ブラウザのネットワークは不必要（コア journey はすべてローカルに同梱。

   Spot の外部リンク CTA だけネットワークが要る。`demo-fallbacks.md` 参照）。

## Sequence（目安 80 s / 上限 90 s）

| # | Step | 操作（exact tap / click） | 確認ポイント | 時間 |
|---|---|---|---|---|
| 0 | 前準備 | DemoResetButton → 確認、ja、375px | 空状態 | 5 s |
| 1 | **Home** | `/` で CTA `わたしの食文化の旅をはじめる` | h1 `東京の食文化と出会う旅` | 5 s |
| 2 | **Food Profile** | `フードプロフィールをつくる` → `制限はありません` → `保存してつぎへ` | URL → `/explore` | 5 s |
| 3 | **Exploration** | ①`さっぱり・爽やか`→`次へ` ②`食べる`→`次へ` ③radio `奥多摩`+`60分以内`→`次へ` ④`自然・景色`→`次へ` ⑤radio `半日（日帰り）`→`結果を見る` | URL → `/explore/result` | 20 s |
| 4 | **Result** | カード `東京わさび` + `このおすすめを「MOGU」の最近の履歴に保存しました。` | `.tmm-result-card__title` = 東京わさび | 10 s |
| 5 | **Story** | `東京わさびの物語を読む` | `/story/wasabi-okutama`、`味わうことが、継承になる` | 15 s |
| 6 | **Route** | `モデルルートを見る` | `/route`、h1 `奥多摩わさび紀行` | 10 s |
| 7 | **Spot** | timeline ピン `奥多摩観光案内所` → `➕ 旅程に追加する` → `旅程に追加しました` → `閉じる` | `/spot/okutama-tourism-office`、h1 `奥多摩観光案内所` | 10 s |
| 8 | **My** | `ルートに戻る` → `🔖 この旅程を保存する` → `旅程を保存しました` → nav `マイ` | `/my`、`保存した旅程` に `奥多摩わさび紀行` | 10 s |

**合計: 約 85 s**。

### 任意（+10 s、時間が許せば）

| Step | 操作 | 確認ポイント |
|---|---|---|
| MOGU | nav `MOGU` → `このおすすめを見る` → `東京わさびの物語を読む` | `/mogu` → `/explore/result` → `/story/wasabi-okutama`。戻ると MOGU 方向へ |
| Discover | nav `さがす` → `東京わさび` → Story | `/discover` 閲覧では MOGU Recent が増えない |
| Badges | `マイ` → Badges entry | **Stretch**。時間があるときのみ |

## Fixture（demo-scoped）/ Deterministic fixtures

- Result: **東京わさび**（`wasabi-okutama`）
- Route: **奥多摩わさび紀行**（`okutama-wasabi-journey`、half-day default）
- Spot: **奥多摩観光案内所**（`okutama-tourism-office`）
- Story tagline: `味わうことが、継承になる`

これらは **8/23 demo golden path の fixture**（#127）であり、「唯一の Product
outcome」「唯一の未来 geography」ではない。ナレーションで明示すること。

## 関連

- 台本: `docs/demo-script.md`
- 失敗時: `docs/hackathon/demo-fallbacks.md`
- 検証: `e2e/golden-path.test.ts`（ja, 375px）、`docs/ia-qa-report.md`
