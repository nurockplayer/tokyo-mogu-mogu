# Stakeholder review packets / 掲載内容確認シート

Issue #133 の workflow は、現在の canonical `FoodCulture` / `Place` /
`SpotDetail` と #129 verification metadata から、日本語優先の Markdown を
標準出力へ生成します。管理画面や CRM は作りません。

```bash
pnpm review-packet --food-culture wasabi-okutama --place chishima-wasabi-garden \
  > /tmp/chishima-review.md
```

generator は ID を引数で受け取り、奥多摩・東京わさびを共有 contract に
埋め込みません。別の `Region × FoodCulture` でも同じ canonical records を追加すれば
同じ command を使えます。unknown は `不明（未確認）` と出力し、空欄を事実に
変換しません。

Feedback は packet のみへ保存せず、出力内の「反映手順」に従って対象 canonical
record と `confirmedAt` / `verificationStatus` へ戻します。一部の項目だけ確認できた
場合、source 全体を `verified` に昇格させません。
