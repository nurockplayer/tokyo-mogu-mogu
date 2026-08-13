# Submission Checklist（8/23 提出）/ 

**Deadline**: 2026-08-23 **17:00 JST**（#86 マイルストーン）。公式の work submission
window は 2026-07-10 〜 08-23（公式 recruitment ページ、2026-08-14 取得）。
余裕を持ち、**提出締切の 2 時間前までに完了**する（15:00 JST 目標）。

> 提出物の正確な形（フォーム項目・ファイル形式）は公式ページの最新版を 8/23 に再確認
> する。以下は 2026-08-14 時点の公式英語 recruitment ページ情報（`competition-alignment.md`
> §5 も参照）。確認後、差分があれば本チェックリストを更新する。

## 1. Repo / main の状態

- [ ] **main が green**（CI #137 Quality Gates: docs→diff check / normal→typecheck+
  lint+test+build / core→+Golden-path E2E）。
- [ ] `git status` が clean、未 push の変更なし。
- [ ] 提出時点の HEAD SHA を記録（pitch で「この commit で動いています」と語れる）。
- [ ] **Repo URL** を控える: `https://github.com/nurockplayer/tokyo-mogu-mogu`

## 2. Demo video（公式: 全エントリー必須）

- [ ] **約2分のプレゼンテーション動画**（事前録画・時間枠予約）— 公式要項に必須と
  記載あり。内容: 課題（23区集中）→ デモ journey（60–90 s）→ 5審査軸の evidence →
  Product scope と demo の境界。
- [ ] 録画は `demo-script.md` の台本 + `demo-sequence.md` の実行順 + `judging-axis-evidence.md`
  の evidence に一致させる。
- [ ] 録画前に local で 1 回通し、後で `git diff --check` 相当の最終チェック。

## 3. Demo URL / 操作動画（公式: 任意 / hardware は必須）

- [ ] **Demo URL**（optional）: ホスティング先を用意（vercel 等の preview、または
  repo の README 起動手順）。**未着手の場合は「無し」でも可**（optional）。
- [ ] **1-minute operation video**（optional、hardware 作品のみ必須）: 必要なら
  `rehearsal-checklist.md` の録画を使う。

## 4. 提出フォーム（entry items 1–6、各 ~300 字）

- [ ] **Team Information** — チーム構成・ロール（member composition）。
- [ ] **Service Overview** — 特定した課題/背景（23区集中）+ サービス詳細
  （`competition-alignment.md` §2 / §9 の one-liner）。
- [ ] **Product & Technical Details** — tech 選択・generative AI 使用有無・Demo URL
  （`judging-axis-evidence.md` 技術力の ✅ 一覧。AI は推薦に使っていない、と明記）。
- [ ] **Team Capability** — メンバー構成と役割（team info と重複に注意）。
- [ ] **Open Data Usage** — **最大10の代表 dataset**。候補:
  dataset A/B/C（baseline）、実 Open Data 3 row（CC BY 4.0）、#128 census、西東京バス
  GTFS（未取得は「fixture/未取得」と明記）。`competition-alignment.md` §7 参照。
- [ ] **Presentation Materials** — **2-min slides**（PowerPoint/PDF）+ **最大3枚の
  screen capture**（デモの決定論 journey の画面）。

## 5. 提出フロー（当日）

- [ ] 08:00 最終リハーサル（`rehearsal-checklist.md`）。
- [ ] 13:00 提出物一式の final check（video / slides / screen captures / form 下書き）。
- [ ] 15:00 提出フォーム送信完了（締切 17:00 の 2 時間前）。
- [ ] 17:00 JST 前に送信確認メール / 受領を確認。

## 6. 提出後の残務（post-submission）

- [ ] 提出後の変更は demo/pitch に影響しないものに限定（Product scope 不変）。
- [ ] 必要なら「demo golden path は 8/23 提出用の fixture」という但し書きを提出物で
  明示したことを確認。

## 関連

- 公式: https://odhackathon.metro.tokyo.lg.jp/（募集要項 / English recruitment）
- 戦略: `docs/hackathon/competition-alignment.md`（§5 公式テーマ、§9 one-liner）
- リハーサル: `docs/hackathon/rehearsal-checklist.md`
- Roadmap: `docs/project-roadmap.md`（#86）
