# Pitch / Presentation Alignment Audit — 実装可能な修正リスト

> 作成日: 2026-08-14
> 目的: 現行 hackathon 簡報/展示材料が Product source of truth に正しく対齊しているか監査し、
> 過時・誤導の宣稱を正確に列挙して修正リストを提供する。**アプリの再設計はしない。**
> 本リストは「修正指示」。優先ファイル（competition-alignment.md / tokyo-tourism-baseline.md /
> approved-ui-fidelity.md）への適用は本 PR で実施済み。残る NICE-TO-HAVE
> （okutama-facilities-source.md / 10-content-audit.md）は follow-up として残す。

## Source of truth（本監査の基準）

- `docs/specs/product/product-scope-invariant.md` + Issue #112（Product scope / demo boundary）
- Issue #92 + KiKi UI/UX draft（current App IA）
- `docs/specs/product/hackathon-product-contract.md`

**Core invariant**: Product = **東京都全域 × 複数地域 × 複数食文化**。
**奥多摩 × 東京わさび = 8/23 Hackathon Demo Golden Path のみ**（demo content / data freeze / deterministic E2E）。
多摩 / 奥多摩 は research / fieldwork / demo-content context であり恒久の Product geography ではない。
`MVP = Okutama × Tokyo Wasabi`、`Frozen Journey = Okutama × Tokyo Wasabi`（demo 修飾なし）、
`Tama is the Product scope` は #112 用語守則の avoid リスト。

## (A) 五軸ストーリー総評

監査対象（`docs/hackathon/*`、`docs/demo-script.md`、`docs/10-content-audit.md`、
`docs/mvp-scope.md`、`README.md`、`docs/analytics/tokyo-tourism-baseline.md`）は
五軸をほぼ正しく・誠実に語っている：

1. **23区観光集中（top problem）** — 充分、框架正確。全材料で最上位に置かれ、入口データは
   検証済み・下流成效は仮説という honesty guardrail が機能している。
2. **food を区域発見の entry point に** — 充分、框架正確。collection-first / Pokédex / GET!
   はどこも現行 journey として扱っていない（legacy reclassified）。
3. **personalized recommendation（Food Profile + 毎 trip の Exploration → Result、AI 不要）** —
   充分、框架正確。決定論 Result・AI 未使用の明記が一致。
4. **Story / Route / 分散 CTA（standalone Support Hub なし）** — 充分、框架正確。
   S7 は distributed CTA、S8 → `My → Saved Routes`、S9 → Stretch で一致。
5. **tourism dispersion** — 框架正確。Impact 下流は 🔮/❓、contribution metrics 捏造禁止が明記。

**systemic な欠陥は scope 語彙のみ。** durable Product scope を「23区外」と表記する箇所と、
8/23 を「Tama first MVP pilot」と表記する箇所が、invariant と直接矛盾している
（下記 MUST-FIX / SHOULD-FIX）。

## (B) 修正リスト（must-fix → should-fix → nice-to-have）

### `docs/hackathon/competition-alignment.md`

#### MUST-FIX 1 — §4「Hackathon MVP Boundary」(L120–123)
- **現行文**: `**Product scope（durable）**：東京都23区外の複数地域へ将来展開可能。`Region / FoodCulture / Place / Route` は future outer-Tokyo region を表現できる durable domain（✅ ...）`
- **問題**: durable Product scope を「23区外の複数地域」（outer-Tokyo-only）と誤表記。
  invariant「The Product is not an … outer-Tokyo-only … service」・#112「Product domain 自体を
  outer-Tokyo-only に狭めない」と矛盾。judge/reviewer に durable domain の誤解を与える。
- **修正**:
  ```
  **Product scope（durable）**：**東京都全域 × 複数地域 × 複数食文化**。`Region /
  FoodCulture / Place / Route` は複数の東京 Region × FoodCulture を表現できる durable
  domain（✅ `docs/specs/product/product-scope-invariant.md` +
  `docs/specs/product/hackathon-product-contract.md` Architecture / Data Boundary）。
  将来の検証済み旅程（例: 青梅 × 日本酒、八王子 × 地域野菜）は主に data/content/config で追加可能。
  ```

#### MUST-FIX 2 — §4「Hackathon MVP Boundary」(L124–125)
- **現行文**: `**2026-08-23 first MVP pilot**：**多摩地域（Tama）**。奥多摩 は current fieldwork / verified-content focus。`
- **問題**: 8/23 の範囲を「多摩地域の first MVP pilot」と誤表記。承認済み demo boundary は
  「Hackathon Demo Golden Path: Okutama × Tokyo Wasabi」（単一 deterministic journey）であり、
  「MVP pilot」は #112 用語守則で地理に綁定する避けたい措辭。judge に「多摩 pilot を出す」と誤認させる。
- **修正**:
  ```
  **2026-08-23 Hackathon Demo Golden Path**：**奥多摩 × 東京わさび**（単一の
  deterministic demo journey）。多摩 / 奥多摩 は current fieldwork / evidence /
  demo-content context であり、恒久の Product scope ではない。
  ```

#### MUST-FIX 3 — §7-6「Future / Editorial Vision」(L375)
- **現行文**: `- multi-region 展開（Product scope は 23 区外全体、多摩地域が first MVP pilot）。`
- **問題**: 1 行に 2 つの誤り。「Product scope は 23 区外全体」は durable scope を outer-Tokyo-only に、
  「多摩地域が first MVP pilot」は Tama-pilot 措辭。future-vision 節でも invariant の Tokyo-wide と矛盾。
- **修正**:
  ```
  - multi-region 展開（Product scope は 東京都全域 × 複数地域 × 複数食文化。8/23 の
    demo golden path は 奥多摩 × 東京わさび のみ）。
  ```

#### SHOULD-FIX 4 — §8「Evidence Needed Before Submission」(L391)
- **現行文**: `- [ ] 多摩 first-pilot fieldwork evidence（#10, 👀 取材済み・verified 統合待ち）`
- **問題**: 「Tama first-pilot」措辭。該 fieldwork は demo golden path（奥多摩 × 東京わさび）に
  服務するもので、「Tama pilot」ではない。
- **修正**: `- [ ] 8/23 demo golden path（奥多摩 × 東京わさび）の fieldwork evidence（#10, 👀 取材済み・verified 統合待ち）`

#### SHOULD-FIX 5 — §11「Acceptance Criteria Check」(L448)
- **現行文**: `- [x] #112 current Product / MVP framing と矛盾しない（Tama を first pilot と明記）`
- **問題**: 「Tama を first pilot と明記」を以て #112 と一致と主張しているが、#112 の demo boundary は
  奥多摩 × 東京わさび単一 journey であり Tama pilot ではない。MUST-FIX 2 と合わせて修正しないと自己矛盾。
- **修正**: `- [x] #112 current Product / MVP framing と矛盾しない（8/23 demo golden path = 奥多摩 × 東京わさび、多摩 / 奥多摩 は fieldwork / demo-content context と明記）`

#### NICE-TO-HAVE 6 — §9「Pitch One-liner」(L418–419)
- **現行文**: `統計の最短表現（baseline §6 より）: 渋谷 67% / 新宿 57% / 銀座 50% vs 多摩は 3.5% 未満、奥多摩 0.7%。`
- **問題**: 「3.5% 未満」は「厳密に 3.5% より小さい」の意味。実際は 吉祥寺・三鷹 = **3.5%**
  （baseline §3.2 / M1 は "≤3.5%"）。最も引用される pitch 統計のため精度が重要。
- **修正**: `... vs 多摩は 3.5% 以下（どの多摩エリアも 3.5% 以下）、奥多摩 0.7%。`

### `docs/analytics/tokyo-tourism-baseline.md`

（以下「Tama pilot / first pilot」措辭群は 8/23 demo boundary と不一致。baseline 自体は Product scope を
Tokyo-wide と正しく宣言しているため SHOULD-FIX 群。）

#### SHOULD-FIX 1 — §1 (L15)
- **現行文**: `The first MVP pilot tests that Product Vision in Tama (多摩地域), with Okutama as the current fieldwork / verified-content focus; the evidence here does not limit future discovery to Tama or to a single food culture.`
- **修正**:
  ```
  The 8/23 Hackathon validates the Product through a single deterministic demo
  journey — **Okutama × Tokyo Wasabi** — while Tama / Okutama remain the current
  fieldwork / evidence / demo-content context; the evidence here does not limit
  future discovery to Tama or to a single food culture.
  ```

#### SHOULD-FIX 2 — §3.2 (L61)
- **現行文**: `... 奥多摩 — the current fieldwork / verified-content focus of the Tama pilot — is at the bottom of the list (0.7%), on par with the islands.`
- **修正**: `... 奥多摩 — the current fieldwork / verified-content focus of the 8/23 demo golden path — is at the bottom of the list (0.7%), on par with the islands.`

#### SHOULD-FIX 3 — §3.4 (L88)
- **現行文**: `... a pattern the first pilot tests by turning regional food-culture interest into a coherent reason to visit and support the region.`
- **修正**: `... a pattern the 8/23 demo golden path tests by turning regional food-culture interest into a coherent reason to visit and support the region.`

#### SHOULD-FIX 4 — §4 M1 (L101)
- **現行文**: `... identifies the demand pool against which the first pilot is tested (24.8M foreign visitors in 2024, dataset A).`
- **修正**: `... identifies the demand pool against which the 8/23 demo is tested (24.8M foreign visitors in 2024, dataset A).`

#### SHOULD-FIX 5 — §4 M3 (L107)
- **現行文**: `... it defines the first-pilot behavioral hypothesis — can a food-culture story create a reason to visit, follow a regional route, and take a support action beyond a single famous anchor?`
- **修正**: `... it defines the 8/23 demo behavioral hypothesis — can a food-culture story create a reason to visit, follow a regional route, and take a support action beyond a single famous anchor?`

#### SHOULD-FIX 6 — §6 Pitch-ready summary, English (L136)
- **現行文**: `The 2026 hackathon tests that vision first in Tama, with Okutama as its current fieldwork focus and Tokyo Wasabi as a fixed demo content candidate — turning an unfamiliar local culture into a story travelers understand, a route they want to take, and actions that support the region.`
- **問題**: pitch に複製される段落。「tests that vision first in Tama」が検証範囲を多摩区域と誤表記。
- **修正**:
  ```
  The 2026 hackathon tests that vision through a single demo golden path —
  **Okutama × Tokyo Wasabi** — with Tama / Okutama as its current fieldwork and
  demo-content context, turning an unfamiliar local culture into a story
  travelers understand, a route they want to take, and actions that support
  the region.
  ```

#### SHOULD-FIX 7 — §6 Pitch-ready summary, 日本語 (L139)
- **現行文**: `2026年のHackathonでは、その仮説を多摩地域（奥多摩をフィールドワークの中心、東京わさびをデモ用の固定コンテンツ候補として）から検証し、物語への理解を訪問ルートと地域を支える行動につなげます。`
- **修正**:
  ```
  2026年のHackathonでは、その仮説を1本の決定論デモ（**奥多摩 × 東京わさび**、
  多摩 / 奥多摩はフィールドワーク・デモコンテンツの中心）で検証し、物語への理解を
  訪問ルートと地域を支える行動につなげます。
  ```

#### NICE-TO-HAVE 8 — §6 日本語 (L139、同一段落内)
- **現行文**: `多摩の各エリアは3.5%未満、奥多摩は0.7%でした。`
- **問題**: 「3.5%未満」は不精確（吉祥寺・三鷹 = 3.5%）。
- **修正**: `多摩の各エリアは3.5%以下、奥多摩は0.7%でした。`

#### NICE-TO-HAVE 9 — L4
- **現行文**: `Backs the #85 tourism-dispersion problem statement and first-pilot pitch with Tokyo Open Data.`
- **問題**: 「first-pilot pitch」措辭。また #85 は source priority 上 historical foundation（derivation として残してよいが pilot 措辭は除去）。
- **修正**: `Backs the tourism-dispersion problem statement (derived from historical Issue #85) and the 8/23 demo-golden-path pitch with Tokyo Open Data.`

### `docs/okutama-facilities-source.md`

#### NICE-TO-HAVE — L159
- **現行文**: `## Frozen pilot journey wiring (Issue #127)`
- **問題**: 「Frozen pilot journey」は #112 の avoid 措辭「Frozen Journey = Okutama × Tokyo Wasabi」に呼应。
- **修正**: `## 8/23 demo golden-path wiring (Issue #127)`

### `docs/10-content-audit.md`

#### NICE-TO-HAVE — §3.1 (L50)
- **現行文**: `| wasabi-okutama | 要確認 | ... | Pokedex・FoodCulturePage・StoryPage（全文）・Discover・Map・NextDiscovery |`
- **問題**: 「Pokedex」「NextDiscovery」を現行表示面として列挙。いずれも legacy / reclassified。
  この表が pitch/evidence の文脈に複製されると collection-first journey が現行と誤認され得る
  （本ファイルは data audit のため NICE-TO-HAVE）。
- **修正**: 表示面を現行名に変更し legacy を註記、例: `FoodCulturePage（一覧）・StoryPage（全文）・Discover・Map・関連施設一覧`、または `（うち Pokedex / NextDiscovery は legacy surface）` を追加。

## (C) 措辭の伝播源 — 本 PR で一括対齊済み

`docs/specs/product/approved-ui-fidelity.md` は「Tama as first MVP pilot geography」
（旧 L23–25 / L68–69 / L377–378）と「Area meta may name 奥多摩 as the current pilot」
（旧 L285）という Tama-pilot 措辭の最も有力な伝播源だった。**本 PR の doc alignment で
これらの箇所を invariant 措辭（Product scope = Tokyo-wide / 8/23 demo = Okutama ×
Tokyo Wasabi golden path / 多摩・奥多摩 = fieldwork / demo-content context）へ一括対齊した。**
以後の pitch docs 更新で同措辭を再継承しないための対策でもある。明示的に historical な
Issue #85 の記述（"Okutama as first pilot"）のみ意図的に残している（historical reference）。

## 適用方法メモ

- MUST-FIX / SHOULD-FIX は検証済みの現行文（2026-08-14 時点）に対する正確な修正文。
- 適用後は、`docs/specs/product/product-scope-invariant.md`・#112・#92 と突き合わせて
  「Product scope = Tokyo-wide」「8/23 demo = Okutama × Tokyo Wasabi golden path」が
  全材料で崩れていないことを確認する。
- アプリの runtime code・UI は本監査の対象外（変更しない）。
