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

Entity detail の `判断が必要` は、上の検証状態とは別に算出します。表示差異、出典間の矛盾、固定店舗を持たない営業形態、Product 上の扱いに影響する stale / time-sensitive 情報だけが判断項目です。`needs_confirmation` や report-only `unknown` であることだけを理由に、判断項目へは追加しません。

time-sensitive 情報は、Ledger の `timeSensitive` と実際の Product 表示・影響画面から対象を導出します。比較対象を持たない表示済み claim (`finding: none`) は、それ自体で現在情報の caveat を作ります。表示差異がある項目は、最新情報の注意をまとめても現在の Product 表示と公式/根拠側の比較を別の判断カードに残します。単独の matching fact は判断を増やしませんが、caveat が必要な entity では同じ変更可能性を持つ情報としてまとめます。フィールド名の固定リストでは分類しません。

`変更推奨` は、比較元の claim が source-origin で、検証状態が `verified` または `needs_confirmation` であることに加え、既存の audit mapping が Product 表示の置換を明示した場合だけ表示します。Ledger の `mismatch` は正規化しない文字列比較なので、それだけでは置換根拠になりません。表記・ローカライズ差か内容差かが確定していない比較、editorial / demo の推定値、stale / conflict の値は比較を残しても `要判断` とします。

比較カードは canonical 側の実際の origin を保持し、Product 内比較、source-backed 情報、未検証の editorial 情報、demo 情報を区別します。`直接の根拠` にはその factual side を直接支える source-origin claim だけを表示します。editorial claim が参照している背景 URL などは、二次的な `根拠を見る` の traceability には残しても直接証拠として表示しません。

## チームでの使い方

1. Overview の Product 対象件数と `Spot` / `Story` / `Route` の内訳を確認し、
   `全部` / `要確認` / `矛盾` / `未確認` で確認対象を絞り込みます。
2. Entity detail の先頭で、判断件数、現在の Product 表示、比較側の実際の由来、期待する扱い、影響画面、直接の根拠を確認します。
3. 通常の source-backed facts は `現在確認できる情報`、report-only unknowns は `未確認のためProductで保証しない情報` で確認します。項目別の source role、claim graph、確認状態、影響画面は `根拠を見る` から開きます。
4. `監査上の未解決` は `要確認` + `要再確認` + `未確認` + `矛盾` の合計で、Product 判断件数とは一致しない場合があります。
5. `Slack共有用` の factual summary をコピーして通知に使います。判断カードの recommendation 文は含めません。
6. 詳細な判断や修正は canonical data、Ledger / evidence inputs、Issue / PR で行います。

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
