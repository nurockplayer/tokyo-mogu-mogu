# Rehearsal Checklist（8/22 リハーサル）/

**目的**: 8/23 提出前に、決定論デモを 60–90 秒で確実に語れる状態にする。提出前日
（8/22）に 1 回以上、できれば 2 回（午前・午後）実施する。

## 1. 環境準備 / Environment

- [ ] **デモ端末**: 375px モバイル（またはモバイル viewport の実機）。バッテリー満タン。
- [ ] **予備端末**: 同一 build で起動確認済みのものをもう 1 台（`demo-fallbacks.md`）。
- [ ] **build**: 最新 main をビルドし、実ブラウザで起動確認。`pnpm dev` or 検証済み artifact。
- [ ] **ロケール**: ja（judging 既定）、**EN / 繁中** の切替も一度確認。
- [ ] **リセット**: `DemoResetButton` で空状態に戻ることを確認。

## 2. 決定論シーケンスの通し / Run-through（目安 80 s）

- [ ] `demo-sequence.md` の step 0–8 を **タイマー計測**で通す（上限 90 s）。
- [ ] step ごとの目標時間との差分を記録:
  Home 5 s / Food Profile 5 s / Exploration 20 s / Result 10 s / Story 15 s /
  Route 10 s / Spot 10 s / My 10 s（計 ~85 s）。
- [ ] ナレーションを `demo-script.md` の Speaker note に沿って読める（棒読みでない）。
- [ ] 初回フローと再訪フロー（Food Profile を再利用）を両方一度ずつ通す。
- [ ] 任意ビート（MOGU / Discover）を通し、時間に収まるか確認。
- [ ] 実測で 90 s を超えたら、どの step を切るか決める（優先: 4–7 の本線を守る）。

## 3. フォールバック演習 / Fallback drills

- [ ] 電波を切った状態で step 1–8 を完走（`demo-fallbacks.md`）。
- [ ] `DemoResetButton` → 空状態 → 初回フロー再現。
- [ ] 「Result が出ない」→ direct URL `/explore/result` で復帰。
- [ ] 「保存が反映されない」→ Route save / Spot 追加 → `/my` 確認。
- [ ] 端末交換の流れ（予備端末へ）を一度通す。

## 4. 審査員の想定質問 / Judge Q&A prep

- [ ] **データ活用**: 「使っている Open Data は何か。Product のどこで動いているか」→
  baseline M1–M3 + 実 Open Data 3 row + #128 census（`judging-axis-evidence.md`）。
- [ ] **アイデア力**: 「人気ランキングと何が違うか」→ 食を入口に『行きたい理由』、
  Story で 食→土地・作り手・継承 をつなぐ。
- [ ] **技術力**: 「技術的に何を作ったか」→ reusable domain + provenance、別 lifecycle、
  ja/en/zh-TW、決定論 pin、Recent vs Saved、E2E。
- [ ] **ソーシャルインパクト**: 「実際にどれだけ分散に効くか」→ 入口は実データ、
  下流は仮説と明示。**実績を捏造しない**。
- [ ] **サービスデザイン**: 「なぜこの流れか」→ `Result → Story → Route → Spot →
  action` の弧 + 初回/再訪 + Recent/Saved + 分散 Support。
- [ ] **デモ範囲**: 「奥多摩 × 東京わさびだけ？」→ Product scope は東京全域 × 複数
  地域 × 複数食文化。これは 8/23 demo golden path の fixture。
- [ ] **プライバシー/安全**: 「Food Profile は何に使うか」→ match のみ、安全性の
  保証ではない（safety boundary）。

## 5. タイミングの記録 / Timing log

- [ ] 通しごとに開始・終了・オーバーした step を記録（presenter 名も）。
- [ ] 最終的に「本線 80 s + 任意 10 s」で収まるプレゼンターを確定。

## 6. 出力 / Output

- [ ] 練習中の気づき（台詞・UI・タイミング）をメモし、8/23 の最終確認に反映。
- [ ] 必要ならスクリーンショット / 操作動画を取得（submission の `Demo URL or
  1-minute operation video` 用、`submission-checklist.md` 参照）。

## 関連

- 台本: `docs/demo-script.md` / 実行順: `docs/hackathon/demo-sequence.md`
- フォールバック: `docs/hackathon/demo-fallbacks.md`
- 審査軸: `docs/hackathon/judging-axis-evidence.md`
