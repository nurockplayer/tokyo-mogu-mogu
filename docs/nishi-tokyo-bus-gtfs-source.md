# 西東京バス GTFS データソース

Issue #17 の GTFS データレイヤーの出典記録。データの取り扱い規則
(`AGENTS.md`「Data and Sources / データと出典」) に従い、実データと
デモデータを明確に区別する。

## 実データ (verified source)

| 項目 | 値 |
|---|---|
| 事業者 | 西東京バス株式会社 |
| データセット | 西東京バス GTFS / GTFS-JP（`stops` / `routes` / `trips` / `stop_times` など） |
| データカタログ | 公共交通オープンデータセンター データカタログ |
| カタログ URL | https://ckan.odpt.org/dataset/nishi_tokyo_bus_nt_bus |
| カタログ ID | `nishi_tokyo_bus_nt_bus` |
| ライセンス | 公共交通オープンデータ基本ライセンス（公共交通オープンデータ協議会） |
| ライセンス詳細 | https://developer.odpt.org/en/terms/data_basic_license （開発者サイトの利用規約・FAQ を必ず確認） |
| 取得日 | 2026-08-08（本 issue 時点で未取得 — 下記参照） |
| 取得方法 | ODPT 開発者サイトでアクセストークンを発行し、リソースの配信 URL からダウンロード |

### 取得手順のメモ (2026-08-08 時点)

- カタログのリソース配信 URL は
  `https://api.odpt.org/api/v4/files/odpt/NishiTokyoBus/NTBus.zip?date=YYYYMMDD&acl:consumerKey=[アクセストークン]`
  の形式。
- 配信には ODPT 開発者サイト
  (https://developer.odpt.org/) で取得するアクセストークンが必要。
- 本 issue 実装環境ではアクセストークンを利用できなかったため、**実データの
  取得・検証は未実施**。コミット済み fixture はデモデータ (下記) であり、
  検証済みの実データではない。

## コミット済み fixture (demo data)

- 場所: `src/data/gtfs-fixture/`
- 内容: 奥多摩駅周辺の数バス停・1–2 路線・トリップ・stop_times の TS モジュール。
- 座標は公開地理情報に基づく近似値、運行時刻・路線名は説明用の例示。
- `GtfsDataset.origin` は `'demo'`。実データで置き換えるまで、これを
  「検証済みの運行ダイヤ」として扱わないこと。

## 再実行方法 (dataset 更新)

実データを取得して fixture を再生成する手順は
`scripts/ingest-gtfs/README.md` と `scripts/ingest-gtfs/` 内のスクリプトを参照。
feature code を変更せずに dataset を更新できる構造を保つこと。
