# Feature-Freeze Checklist（8/21 フィーチャーフリーズ）/

**Freeze**: 2026-08-21（#86 マイルストーン）。この日以降、release scope の拡大は
原則しない。判定は GitHub の live state + CI（#137 Quality Gates）を source of truth
にする。Status は 2026-08-14 現在。

## Core journey（P0）

- [ ] **コア journey が main で動作** — `Home → Food Profile(初回) → Exploration →
  Result → Story → Route → Spot → Save → My → Saved Routes`。実装済み（#78/#80/#81/
  #93/#94/#95 が merged）。**Freeze 前に main 上で実ブラウザ 1 本通しを確認**。
- [ ] **MOGU Recent と Saved Routes の意味論分離** — `tmm:moguRecent:v1`（自動記録、
  max5）と `tmm:savedRoutes`（明示保存）。`src/lib/mogu-recent.ts` /
  `saved-routes.ts` ✅。E2E が両者の差分（reload 復元・Discover 非汚染）を検証済み。
- [ ] **再訪フローで Food Profile を再質問しない** — E2E step 11 で検証済み ✅。

## Demo data / Content（P0）

- [ ] **8/23 demo golden path が frozen** — #127（奥多摩 × 東京わさび）が demo
  dataset として merged（#144）。provenance / verification state は #129（#141）✅。
  `canonical`/`frozen` は demo content/data に限定（#112 用語ガードレール）。
- [ ] **Story / Route / Spot / Discover が同一 demo canonical data を再利用** —
  `seed-food-cultures.ts`（`wasabi-okutama`）・`seed-routes.ts`
  （`okutama-wasabi-journey`）・`src/i18n/data-content.ts`（storyContent）✅。
- [ ] **#10 fieldwork の verified 統合**（任意・優先）— 2026-08-09 取材済み 👀、
  repo 統合は #10 待ち。統合できれば Story/Spot の一次情報へ差し替え。**必須でない**。

## i18n（P0）

- [ ] **ja / en / zh-TW が 375px で overflow なし** — `docs/ia-qa-report.md` AC-10 で
  `scrollWidth === clientWidth === 375` 確認済み。**Freeze 前にもう 1 回実ブラウザ
  で確認**（QA 更新が止まっていないこと）。
- [ ] ユーザー向け copy が新規/変更なし、または対象ロケールすべてに反映済み。

## E2E / CI（P0）

- [ ] **Golden-path E2E が green** — `e2e/golden-path.test.ts`（#120/#134）。CI
  Quality Gates（#137）が `core` 分類で E2E を実行。**Freeze 時点で main の CI が
  green であること**。
- [ ] `pnpm validate`（typecheck + lint + full Vitest + build）が local で通る
  （tiered validation #154）。

## Review packets（P0）

- [ ] **Stakeholder review packets が生成可能** — #152（`pnpm review-packet`）。対象
  canonical record（`wasabi-okutama` / `chishima-wasabi-garden` 等）の確認状態
  （`confirmedAt` / `verificationStatus`）が追跡可能であること。

## Evidence / Pitch（P1）

- [ ] **baseline M1–M3**（`docs/analytics/tokyo-tourism-baseline.md`）が pitch で使える
  状態 ✅（dataset A/B/C 出典付き）。
- [ ] **Open Data row**（`src/data/generated/okutama-places.ts` の 3 row、CC BY 4.0）
  が Product role と一緒に語れる ✅。
- [ ] **#128 municipality agriculture / succession context** が pitch で使える ✅
  （#148 merged; aggregate を個別生産者へ誤変換しない）。
- [ ] 新機能提案は「Data / Idea / Tech / Impact / Service Design のどの評価をどの
  evidence で強くするか」で判断（#100 guardrail）。

## 判定 / Gate

- [ ] **#82（App IA QA / 375px / ja・en・zh-TW / tap・focus / WCAG contrast）を
  close する** — 現時点 OPEN。Freeze のリリースゲート。WCAG contrast audit は未実施
  （`ia-qa-report.md` Non-verified）— **必須なら 8/20 までに実施**。
- [ ] #86 の Roadmap の milestone（Feature Freeze / Rehearsal / Submission）が明示
  されている ✅。

## 関連

- Roadmap: `docs/project-roadmap.md`（#86）
- QA: `docs/ia-qa-report.md`（#82）
- 判定 source: GitHub Issues + CI（#137）+ `scripts/ci/classify-changes.sh`
