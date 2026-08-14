# Demo Fallback Sequence（デモ失敗時のリカバリ）/ Failure Fallback

**Status**: 2026-08-14。コア journey は全データをローカルに同梱（accountless・
geolocation 不要・決定論）。以下は step 単位の deterministic な rescue path。

## 原則 / Principles

1. **慌てない・隠さない** — 失敗した step の意図を 1 文で語りながら次の導線へ。
2. **コア journey は server 依存なし** — 結果・ストーリー・ルート・保存はすべて
   ローカル。ネットワークは Spot の外部リンク CTA だけが必要。
3. **何度でもリセットできる** — `DemoResetButton` または private window。

## フォールバック表 / Fallback matrix

| 症状 | 原因 | リカバリ（deterministic） |
|---|---|---|
| **ネットワークなし** | 会場 Wi-Fi 不通 | コア journey は継続可能（ローカル同梱）。Spot の外部リンク CTA は「リンクで外部サイトへ」と口頭で説明し、クリックしない。実測のオフライン動作はリハーサルで確認（`rehearsal-checklist.md`）。 |
| **保存状態がない / 再訪フローが違う** | 以前のデモの残骸、または最初から状態が入っている | `DemoResetButton`（header）→ 確認。無ければ private window。`localStorage` の `tmm:foodProfile:v1` / `tmm:moguRecent:v1` / `tmm:savedRoutes` を手動で消してもよい。 |
| **ロケールが日本語でない / 表示が崩れている** | LocaleToggle の切り替え忘れ、キャッシュ | header の **ja** に戻す。375px で ja/en/zh-TW すべて `scrollWidth === clientWidth`（`ia-qa-report.md` AC-10 で確認済み）— 見た目の崩れはロケールではなく build の可能性。 |
| **Playwright / build が起動しない** | dev server、ビルド、依存の不整合 | 最新の検証済み build artifact を開く。無ければ `pnpm dev`。リハーサル時に 1 台は「既知 good の状態」を確保しておく。 |
| **Result が出ない** | Exploration 途中で離脱、URL が違う | `/explore` から 5 問を再実行（決定論なので必ず同じ Result）。最速は直接 `/explore/result`。 |
| **Story / Route のリンクがない** | step 4–5 の遷移ミス | direct URL: `/story/wasabi-okutama` → `味わうことが、継承になる` → `モデルルートを見る` → `/route`。 |
| **保存が反映されない / My にない** | 保存 action を踏んでいない、誤って解除 | Route の `🔖 この旅程を保存する`（または Spot の `➕ 旅程に追加する`）→ `/my` の `保存した旅程` を確認。保存は `tmm:savedRoutes` のみに書かれる。 |
| **MOGU 再オープンが迷子になる** | 戻り文脈の破損 | `MOGU` → `このおすすめを見る` → `/explore/result` → Story → Route の順で再開。 |
| **端末が落ちる / 画面が固まる** | メモリ、バッテリー | 予備端末に切替（デモ前に同一 build で起動確認済みのものを用意）。 |
| **最悪ケース** | 複数 step が連鎖失敗 | 冒頭の「課題・入口・体験・信頼」を口頭で 1 分語り、スクリーンショット / E2E 録画（`e2e/golden-path.test.ts` が green の画面）を表示して代替デモにする。捏造した実績は語らない。 |

## リハーサルで必ず試す 3 つの fallback

1. 電波を切った状態で step 1→8 を完走できること。
2. `DemoResetButton` で空状態に戻り、初回フローが再現できること。
3. 「Result が空」から direct URL で `/explore/result` → Story → Route に復帰できること。

## 関連

- 台本: `docs/demo-script.md`
- 実行順: `docs/hackathon/demo-sequence.md`
- リハーサル: `docs/hackathon/rehearsal-checklist.md`
