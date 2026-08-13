# Judging-Axis Evidence Map（審査軸 × デモステップ対応表）

**Status**: 2026-08-14。競技戦略の source of truth は `competition-alignment.md`
（§6 審査軸 / §7 evidence matrix / §9 one-liner）。本ファイルはそれを「60–90 秒
デモの各 step」にマッピングする。新しい evidence は発明しない — すべて repo 内の
実装・データ・検証から引用する。

## Evidence legend（competition-alignment.md と同じ凡例）

| 印 | 意味 |
|---|---|
| ✅ | verified — repo 内の source（Open Data / 公開統計 / official web / 契約ドキュメント）に裏付け |
| 🧪 | demo fixture / editorial — 名前や住所は実在、narrative は team 執筆、座標は近似 |
| 👀 | field observation — 2026-08-09 fieldwork 収集済み、repo 統合は #10 待ち |
| 🔮 | future / editorial vision — 今回 MVP の範囲外の将来像 |
| ❓ | unknown — source 未取得・未検証 |

## 5つの審査軸（公式）

1. データ活用 — Data Utilization
2. アイデア力 — Originality & Innovation
3. 技術力 — Technical Excellence
4. ソーシャルインパクト — Social Impact
5. サービスデザイン — Service Design

## Step × Axis matrix

各 cell は `concrete evidence` + 印。**claim はすべて実装・データ・検証に裏付け**。

| Demo step | データ活用 | アイデア力 | 技術力 | ソーシャルインパクト | サービスデザイン |
|---|---|---|---|---|---|
| **1. Home** | 課題の入口: baseline M1（渋谷67.1% / 新宿57.4% / 銀座50.1% vs 奥多摩0.7%）✅ | 「あなたを知る→今回の旅をえらぶ→巡って応援」で、ランキングではなく**行きたい理由**を起点にする 🧪 | Landing/Home は共有 shell + lazy-loaded route（`AppRouter.tsx`）✅ | 23区集中という課題を冒頭 1 文で提示 ✅ | primary nav `Home / Discover / MOGU / My`（#92）✅ |
| **2. Food Profile** | 制限項目は source なしに safety 保証しない（safety boundary）✅ | 安定プロフィール vs 毎回の診断を分離する設計 🧪 | `food-profile*.ts` + persistence `tmm:foodProfile:v1`（テストあり）✅ | 食物アレルギー等への配慮を「保証でなく match のみ」で提示 ✅ | 初回のみ質問・再訪で再利用・`My` から編集（#92）✅ |
| **3. Exploration** | 質問結果が Result の match reason に接続 ✅ | 「今回どう体験したいか」を 5 問で掴む（永続診断でない）🧪 | `exploration*.ts` per-trip lifecycle（テストあり）✅ | — | Home と Discover の役割分担（`recommend for me` vs `I browse`）✅ |
| **4. Result** | 決定論 Result は **demo fixture**（#127）。「唯一の outcome でない」と語る ✅/🧪 | 地域×食文化を candidate として提示（#149 の多候補 contract）✅ | 決定論推薦（AI engine 不要）✅ + Result→MOGU 自動記録 ✅ | 推薦は 23区外への「行ってみたい」動機づけの起点 🔮 | Result 自動記録 → MOGU Recent（`tmm:moguRecent:v1`, max5）✅ |
| **5. Story** | Story 本文は公開観光情報（奥多摩観光協会 etc.）からの editorial ✅/🧪。#128 census（後継者・経営体）が municipality aggregate として接続可能 ✅ | 食→水・作り手・歴史・継承課題を一続きに語る `味わうことが、継承になる` 🧪。ranking でない差異化 ✅ | `storyContent` を canonical `src/i18n/data-content.ts` から解決（review packet #152 と同一 source）✅ | 継承課題の提示（census aggregate を個別生産者へ誤変換しない）✅/👀 | Story = Support CTA の分散配置（共有・理解・ルート表示）✅ |
| **6. Route** | Route の mobility は西東京バス（GTFS は fixture `origin:'demo'`、**実 GTFS 未取得** ❓）🧪/❓ | half-day/1-day の実行可能な旅程（店舗羅列でない）🧪 | `seed-routes.ts` + 決定論 pin de-overlap（375px で 44px 確保）✅。Save → `tmm:savedRoutes` ✅ | 「訪れる」への変換設計 ✅/🔮（実訪問実績は ❓ 未計測） | Route = save/plan の CTA。Saved は `My → Saved Routes` へ（#92）✅ |
| **7. Spot** | 実 Open Data 3 row（`okutama-general-1jcznma` / `okutama-general-1uxd9bs` / `okutama-sports-us0v10`、CC BY 4.0、実座標）✅。奥多摩観光協会 directory 19 row は demo 🧪 | venue 種別に応じた action（予約/購入/体験）を cultural-succession の意味で提示 🧪 | `route-spot.ts*` + `PIN_LAYOUT`、未検証 action は `準備中`（destination を偽らない）✅ | 地域事業者・生産者への消費接続（下流は仮説 🔮） | Spot = 実務情報 + 外部リンク優先 CTA。`旅程に追加する` で同一 contract ✅ |
| **8. My → Saved Routes** | — | Saved（明示保存）と Recent（自動記録）の意味論分離 🧪 | `saved-routes.ts` + reload 永続化（E2E 検証済み）✅ | — | 再訪・次地域発見への導線（Saved → Story/Spot へ戻れる）✅ |
| **MOGU（任意）** | — | system-managed history = favorites でない 🧪 | `mogu-recent.ts`（`MOGU_RECENT_MAX=5`、重複置換、reload 復元、テストあり）✅ | — | 戻り文脈（Result→Story→Route→Spot、Back→MOGU）を E2E で検証 ✅ |
| **Discover（任意）** | browse でも同一 canonical demo data を再利用 ✅/🧪 | 診断なし自由探索 = `I browse myself` ✅ | `DiscoverPage`、browse は MOGU Recent を汚染しない（E2E 検証）✅ | — | Discover から Story/Spot、Back は `/discover` へ ✅ |

## 軸ごとのサマリ / Per-axis summary

- **データ活用** — ✅ の中心は `docs/analytics/tokyo-tourism-baseline.md`（M1–M3,
  dataset A/B/C）と実 Open Data 3 row（CC BY 4.0）。#128 農林業センサスが後継者
  context を追加。**未検証を隠さない**: GTFS は fixture（実データ ❓）と明示。
- **アイデア力** — 「人気ランキングでなく、食を入口に知らない東京へ行きたい理由を
  作る」。Story が 食→土地・作り手・継承 を一続きにする。🧪 中心だが差異化の
  claim は実装で示せる。
- **技術力** — ✅ 全て実装・テスト・E2E 確認済み: reusable domain と provenance 型、
  Food Profile / Exploration の別 lifecycle、ja/en/zh-TW i18n、決定論 pin layout、
  Recent vs Saved の persistence、E2E golden path（#120）、tiered validation（#154）。
  **judging point のための技術追加はしない**（#86 ガードレール）。
- **ソーシャルインパクト** — 入口は ✅ 実データ（23区集中・多摩低訪問）。
  下流（実訪問・地域消費・継承）は **仮説 🔮 / 実績 ❓ 未計測**。contribution
  metrics は捏造しない。継承 context は #128 の municipality aggregate に限定。
- **サービスデザイン** — 60–90 秒デモで `Result → Story → Route → Spot → action` の
  弧を説明（#92 App IA）。初回/再訪・Recent/Saved・分散 Support を E2E で検証済み ✅。

## Honesty guardrails

- 下流の Impact は「仮説」と明記し、検証済み数値と分ける。
- GTFS / 座標 / 営業情報の未検証部分は demo/unverified 表示のまま語る。
- デモ fixture（東京わさび result・奥多摩わさび紀行 route）は「8/23 demo golden
  path の fixture」であり、唯一の Product outcome ではないと明示する。

## 関連

- 競技戦略: `docs/hackathon/competition-alignment.md`（§6 / §7 / §9）
- 台本: `docs/demo-script.md`
- 実行順: `docs/hackathon/demo-sequence.md`
- 出典記録: `docs/analytics/tokyo-tourism-baseline.md`、`docs/okutama-facilities-source.md`、
  `docs/nishi-tokyo-bus-gtfs-source.md`
