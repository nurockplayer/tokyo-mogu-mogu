# Human Data Review Board

Human Data Review Board は、TOKYO MOGU MOGU の現在のデータ確認状況を、非エンジニアを含むチームが短時間で把握するための読み取り専用画面です。

Cloudflare preview / production build の次のパスで開きます。

```text
/data-review/
```

この画面は consumer Product のナビゲーション、Figma、Story / Route / Spot の体験には接続しません。検索エンジン向けには `noindex,nofollow` を設定しています。

## 正本との関係

Board は事実の保存場所ではありません。次の既存の構造化された正本から、その時点のレビュー用表示を組み立てます。

```text
current Product factual presentation inventory
+ canonical/source records + presentation records + audit metadata + evidence manifest
→ Data Verification Ledger claims
→ Human Data Review Board
```

- Board の確認対象は、現在公開されている 2 つの journey の Route / Story と、
  そこから到達できる Spot の構造化された presentation identity から決まります。
- #321 の担当 Issue がまだ付いていない current Product entity も、`unknown` / `demo`
  や出典・証拠なしの状態を保ったまま表示します。
- Ledger に claim があるだけの休止中・過去の entity は確認対象に含めません。
- canonical / presentation の値は Board 専用ファイルへコピーしません。
- `docs/data-verification-ledger.md` をデータとして読み戻しません。
- 画像や Issue / PR の文章から事実を推定しません。
- evidence screenshot はレビュー証拠であり、検証状態や canonical value を変更しません。
- source screenshot を保存できない場合は、evidence manifest の省略理由を表示し、代替画像を作りません。
- 位置情報の提供元は、施設・事業者の出典と分けて表示します。

## 状態の読み方

| 表示 | 意味 |
|---|---|
| ✅ 確認済み | 構造化された状態が `verified` |
| 🟡 出典あり・要確認 | 出典はあるが、ステークホルダー確認や現地確認は未完了 |
| 🟠 要再確認 | 構造化された状態が `stale` |
| ⚠️ 情報に矛盾あり | 構造化された状態が `conflict` |
| ❓ 未確認 | Ledger の report-only `unknown`。値を補完していない |
| 🧪 デモ情報 | 構造化された状態が `demo` |

`出典あり・要確認` は「公式確認済み」や「掲載許可取得済み」を意味しません。

## チームでの使い方

1. Overview の Product 対象件数と `Spot` / `Story` / `Route` の内訳を確認し、
   `全部` / `要確認` / `矛盾` / `未確認` で確認対象を絞り込みます。
   Entity ごとの `未解決` は `要確認` + `要再確認` + `未確認` + `矛盾` の合計です。
2. Entity detail で、現在値、unknown、出典と確認日、アプリ証拠、証拠省略、関連 Issue / PR を確認します。
3. `Slack共有用` のサマリーをコピーして通知に使います。
4. 詳細な判断や修正は canonical data、Ledger / evidence inputs、Issue / PR で行います。

Slack サマリーは現在の Board projection から都度生成します。Webhook、Bot、認証情報、自動投稿はありません。

## ローカル確認

```sh
pnpm build
pnpm preview
```

`http://127.0.0.1:4173/data-review/` を開きます。Board の focused browser smoke は次で実行します。

```sh
pnpm test:data-review
```

別の worktree が port 4174 を使用している場合は、空いている port を指定します。

```sh
PLAYWRIGHT_PORT=42140 pnpm test:data-review
```
