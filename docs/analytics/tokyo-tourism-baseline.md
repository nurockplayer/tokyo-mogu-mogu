# Tokyo Tourism Impact Baseline — 東京観光インパクト・ベースライン

Status: Research baseline (Issue #18). Backs the tourism-dispersion problem
statement (derived from historical Issue #85) and the 8/23 demo-golden-path
pitch with Tokyo Open Data. The available comparison
focuses on Tama / Okutama evidence; that evidence scope is not Tokyo Mogu
Mogu's permanent geographic boundary. This is **not** an in-app analytics
dashboard.

The figures quantify tourism concentration and one user segment (foreign
visitors). They are **evidence** for the problem statement and for multilingual /
accessibility needs, not a definition of the Product audience. Japanese and
international travelers are both first-class Product users (Issue #112 / #214).

Last retrieved / verified: 2026-08-08. All figures below are tied to dataset + year + source. Where a desired number is **not publicly available**, it is stated explicitly rather than estimated.

---

## 1. Problem statement / 問題設定

Tourism demand, spend, and visitor flows within Tokyo are heavily concentrated in the central wards (23区). In 令和5年 (2023), the single most-visited area among foreign visitors to Tokyo was 渋谷 at 67.1%, followed by 新宿・大久保 57.4% and 銀座 50.1% — while no single Tama area exceeded 3.5% (吉祥寺・三鷹), and 奥多摩 was visited by only 0.7% of foreign visitors [Source B]. The same visitors account for 38–42% of Tokyo's total tourism spend (¥2.76tn of ¥7.24tn in 2023; ¥3.96tn of ¥9.48tn in 2024) [Source A]. Regional food culture, people, nature, and experiences can create reasons to discover destinations outside the 23 wards. The 8/23 Hackathon validates the Product through a single deterministic demo journey — **Okutama × Tokyo Wasabi** — while Tama / Okutama remain the current fieldwork / evidence / demo-content context; the evidence here does not limit future discovery to Tama or to a single food culture.

---

## 2. Datasets used / 使用データセット

| # | Dataset (ja / en) | Provider | Year(s) | Source URL | License / usage notes |
|---|---|---|---|---|---|
| A | 東京都観光客数等実態調査 / Tokyo Visitor Count & Spending Fact-Finding Survey (令和5年, 令和6年) | 東京都産業労働局観光部企画課 (Bureau of Industrial and Labor Affairs) | 2023, 2024 (survey period = calendar year) | Catalog: [BODIK R5](https://odm.bodik.jp/zh_Hans_CN/dataset/t000012d0000000082), [BODIK R6](https://odm.bodik.jp/zh_Hans_CN/dataset/t000012d0000000083); source page [r5-jittai](https://www.sangyo-rodo.metro.tokyo.lg.jp/data/tourism/jittai/r5-jittai); open-data CSVs under `https://www.opendata.metro.tokyo.lg.jp/sangyouroudou/tourist_number_survey/` (e.g. `R5tourist_number_survey_3.csv`, `R6tourist_number_survey_4.csv`) | CC-BY-4.0 (per BODIK catalog). Note: the annual "別紙" summary PDF is [R5](https://www.sangyo-rodo.metro.tokyo.lg.jp/documents/d/sangyo-rodo/-_-5-), [R6](https://www.metro.tokyo.lg.jp/documents/d/tosei/20250613_08_01); 2024 press release [07_01.pdf](https://www.metro.tokyo.lg.jp/tosei/hodohappyo/press/2025/01/20/documents/07_01.pdf); dashboard [data.tourism.metro.tokyo.lg.jp](https://data.tourism.metro.tokyo.lg.jp) |
| B | 国・地域別外国人旅行者行動特性調査 / Foreign Visitor Behavior Characteristics by Country/Region Survey (令和5年) | 東京都 (Tokyo Metropolitan Government) | 2023 | Report PDF: [03_r5houkoku.pdf](https://www.sangyo-rodo.metro.tokyo.lg.jp/toukei/tourism/03_r5houkoku.pdf) (97 pp.) | Public government survey report; questionnaire at 羽田/成田 airports, n=12,020 collected, n=11,327 who visited Tokyo, weighted to JNTO arrival counts |
| C | 人流データを活用した都内訪問者の行動傾向 (「おでかけウォッチャー」) / Visitor behavior trends using foot-traffic (GPS) data — TCVB monitoring reports Vol.1–3 | 公益財団法人東京観光財団 (TCVB) + 東京都立大学 清水哲夫研究室 | Data: 2023–2024; published 2024-12-23, 2025-03-27, 2025-04-30 | [Vol.1](https://www.tcvb.or.jp/jp/project/2024_Odekakewatcher_report_w_TMU_20241223.pdf), [Vol.2](https://www.tcvb.or.jp/jp/project/2024_Odekakewatcher_reportvol2_w_TMU_1.pdf), [Vol.3](https://www.tcvb.or.jp/jp/project/2024_Odekakewatcher_reportvol3_w_TMU_20250430.pdf) | Public report. ~1,900 monitoring points in Tokyo; opt-in location data from 140+ smartphone apps (~25–30M monthly domestic residents). **Domestic residents only**; not a census; TCVB itself warns numbers must be read with care |

**Availability note — モバイルデータを活用した訪都旅行者動態調査 (candidate source in Issue #18):** a Tokyo visitor-dynamics survey using mobile/location data is named as a candidate source, but as of retrieval (2026-08-08) no public report or open-data release with quantitative figures could be located on the 東京都産業労働局 site or the Tokyo open-data catalog. It is therefore **not used** for figures here. The TCVB おでかけウォッチャー reports (C) serve as the mobile-data proxy; a table-5 economic-ripple dataset exists in dataset A but is out of scope for this baseline.

---

## 3. Central Tokyo vs Tama comparison baseline / 都心と多摩の比較ベースライン

### 3.1 Tokyo-wide aggregates (context — dataset A)

| Figure | 令和5年 / 2023 | 令和6年 / 2024 |
|---|---|---|
| 観光入込客数 (visitor count, 千人回) | 494,102 | 504,191 (+2.0% YoY) |
| — 宿泊客 | 59,554 | 60,373 |
| — 日帰り客 | 434,549 | 443,818 |
| 観光消費額 (tourism spend, 百万円) | 7,243,453 (¥7.24tn) | 9,476,193 (¥9.48tn, +30.8%) |
| — 外国在住者分 (share of total) | 2,758,617 (**38.1%**) | 3,962,487 (**41.8%**) |
| 訪都外国人 (foreign visitors, 千人) | 19,538 (+28.7% vs 2019) | 24,786 (+26.9% YoY) |

Source: dataset A — Table 3 (観光入込客数実人数推計) and Table 4 (観光消費額推計) CSVs (`R5tourist_number_survey_3.csv`/`_4.csv`, `R6tourist_number_survey_3.csv`/`_4.csv`); cross-checked against the R5/R6 annual 別紙 PDFs and the 2024 press release. Share computed as 外国在住者 ÷ 合計 (R5: 2,758,617/7,243,453 = 38.1%; R6: 3,962,487/9,476,193 = 41.8%).

### 3.2 Foreign-visitor visit rates by area — central vs Tama (dataset B, 2023)

"訪問した場所 (複数回答)" — % of foreign visitors who visited each area (multiple answers; top central areas vs all Tama areas):

| Central Tokyo area | Visit % | | Tama area | Visit % |
|---|---|---|---|---|
| 渋谷 | **67.1%** | | 吉祥寺・三鷹 | **3.5%** |
| 新宿・大久保 | **57.4%** | | 八王子・高尾山 | **2.6%** |
| 銀座 | **50.1%** | | 立川 | **1.7%** |
| 浅草 | 47.4% | | 奥多摩 | **0.7%** |
| 秋葉原 | 46.2% | | 青梅・御岳山 | **0.6%** |
| 東京駅周辺・丸の内・日本橋 | 45.2% | | *(Tama sub-total, upper bound)* | ≈9.1% |

Source: dataset B report, 図表14 訪問した場所（複数回答）, 全体 (pp. 20). The Tama sub-total (3.5+2.6+1.7+0.7+0.6 = 9.1%) is an **upper bound**: because answers are multiple-choice, it is not the exact share of visitors who visited "any Tama area", and a visitor may have visited several Tama spots. Note 蒲田 (1.9%), 亀有・柴又 (0.9%) and 伊豆諸島・小笠原諸島 (1.2%) are not Tama (they are 区部/islands) and are excluded.

**Interpretation:** the 10 most-visited areas are all central-ward clusters; each reaches 20–67% of foreign visitors. Every Tama area is in single digits, and 奥多摩 — the current fieldwork / verified-content focus of the 8/23 demo golden path — is at the bottom of the list (0.7%), on par with the islands.

### 3.3 Journey shape — where the nights and stops go (datasets A + B + C)

| Metric | 令和5年/2023 | 令和6年/2024 | Source |
|---|---|---|---|
| 1人当たり平均訪問地点数 (avg places visited/person), 宿泊客・観光目的 | 都内 2.5 / 道府県 3.1 / **外国 4.6** | 都内 2.8 / 道府県 3.3 / **外国 3.6** | dataset A, 表2 (地点パラメータ) + annual 別紙 PDFs |
| 1人当たり平均訪問地点数, 日帰り客・観光目的 | 都内 1.5 / 道府県 1.7 / 外国 3.9 | 都内 1.5 / 道府県 1.7 / 外国 4.2 | same |
| 訪都外国人 平均泊数 | **5.2 泊** | not used | dataset B, 図表44 |
| 訪都外国人 1人当たり東京滞在支出 | **¥179,154** | not used | dataset B, 図表44 |
| 訪都外国人の一番満足した場所で「自然を感じる」活動 | 奥多摩 **76.8%**, 八王子・高尾山 58.9%, 立川 24.2%, 吉祥寺・三鷹 21.2% | — | dataset B, 図表16 (活動) |

Source: dataset A 表2 (R5 `R5tourist_number_survey_2.csv`); dataset B 図表44 (pp. 46) and 図表16 (pp. 26).

> **Small-sample caveat:** the 図表16 Tama rows are based on small samples (奥多摩 n=15, 青梅・御岳山 n=11, 立川 n=18). The report's own usage note instructs treating small-sample values with care; these figures are directional, not precise.

**Interpretation — two-sided evidence:**
- Foreign visitors stay 5.2 nights and spend ¥179,154 per stay (dataset B) and account for 38–42% of Tokyo spend (dataset A), yet their visits are concentrated in central-ward areas (visit rates 45–67%; dataset B 図表14), with every Tama area under 3.6%. The biggest spenders essentially bypass Tama.
- Where foreign visitors *do* reach Tama, the experience is overwhelmingly "nature" (76.8% in 奥多摩) — i.e., Tama's draw is nature, not the food/maker/story layer Tokyo Mogu Mogu surfaces.

### 3.4 Mobile-data view of Tama's demand pattern (dataset C, domestic residents)

TCVB's GPS-based monitoring reports show Tama differs structurally from the central wards:
- Tama municipalities (青梅, あきる野, 立川, 日野, 府中…) cluster with **weekend/Sunday-peak and seasonal-peak** visitor patterns (GW, summer, autumn leaves), whereas central wards (千代田, 中央, 港…) show stable, business-driven, all-year flow (Vol.1, slides on 月変動/曜日変動クラスター).
- 高尾山 area (八王子) functions as a **Kanto-specific destination**: most visitors originate within ~100 km, and 高尾山周辺 spots' 2023→2024 change was flat-to-modest (高尾山口駅 −7.3%, TAKAO599 MUSEUM +4.4%, 高尾山駅 +9.8%, 清滝駅 +6.6%, もみじ台 −5.8%, 陣馬山 −2.7%) (Vol.2).
- Events in Tama (八王子まつり, 八王子花火大会) are classified as **近隣集客型** (nearby-catchment) events (Vol.3) — strong on the day, weak at pulling distance visitors or spilling to surrounding spots.

**Interpretation:** Tama already receives *some* domestic demand, but it is weekend/seasonal, short-distance, and single-anchor (e.g. 高尾山 alone), with weak multi-spot spillover — a pattern the 8/23 demo golden path tests by turning regional food-culture interest into a coherent reason to visit and support the region.

### 3.5 Hard 区部/多摩/島しょ split — availability note

The Tokyo-wide totals in dataset A are **not publicly broken out by 区部 / 多摩 / 島しょ** in the released open-data CSVs (Table 1 is aggregate 観光地点延べ客数 across all sites; Tables 3–4 are 都内合計 by resident-origin). No freely downloadable official 区部/多摩/島しょ visitor or spend split was found as of retrieval. The comparison baseline above therefore uses dataset B (foreign-visitor area visit rates) and dataset C (municipality-level GPS patterns) as **proxy indicators** for the central-vs-Tama skew. This is stated explicitly per AGENTS.md ("surface the uncertainty instead of silently converting it into fact").

---

## 4. Key problem metrics / 主要問題指標

Three metrics that quantify the problem, each traceable and re-checkable:

**M1 — Visit concentration (訪問集中): foreign visitors' Tama reach is ≤3.5% vs ≥45% for top central areas.**
渋谷 67.1%, 新宿・大久保 57.4%, 銀座 50.1%, 浅草 47.4% (dataset B, 2023, 図表14) vs 吉祥寺・三鷹 3.5%, 八王子・高尾山 2.6%, 立川 1.7%, 奥多摩 0.7%, 青梅・御岳山 0.6%. *Why it matters:* it quantifies one outer-Tokyo example of the geographic skew behind #112 and identifies the demand pool against which the 8/23 demo is tested (24.8M foreign visitors in 2024, dataset A).

**M2 — Spend-to-visit gap (消費と訪問の乖離): the biggest spenders barely reach Tama.**
Foreign visitors = 38.1% of Tokyo's ¥7.24tn spend (2023) and 41.8% of ¥9.48tn (2024) (dataset A) while staying 5.2 nights and spending ¥179,154/person (dataset B). Against that, every Tama visit rate is <3.6%. *Why it matters:* the gap is the commercial upside — spend exists, but its geographic distribution leaves Tama's local economy out of it.

**M3 — Fragile, single-anchor demand in Tama (多摩の需要構造): thin, weekend/seasonal, short-distance.**
TCVB GPS data show Tama peaks concentrate on weekends/holidays and specific seasons, events are 近隣集客型 (nearby-catchment), and 高尾山 dominates as a stand-alone anchor with modest YoY change (Vol.1–Vol.3, 2023–2024 data). *Why it matters:* it defines the 8/23 demo behavioral hypothesis — can a food-culture story create a reason to visit, follow a regional route, and take a support action beyond a single famous anchor?

---

## 5. Historical KPI candidates / 旧実装の KPI 候補

> **Reclassified by Issues #85 and #41:** the table below documents Issue #18's
> legacy Pokédex / geolocation-check-in measurement proposal. It is preserved
> as implementation history, not a current success contract. Current demo
> metrics live in `docs/mvp-scope.md`; Badge / next-discovery, if built,
> is stretch and motivates another region rather than making collection the
> Product goal.

Definitions reuse the Issue #18 KPI candidates. Each KPI states the external baseline (from this document) it improves on and the MVP in-app counter.

| KPI | Definition (MVP) | External baseline (from this doc) | Tokyo Mogu Mogu direction |
|---|---|---|---|
| **visited places / user** (地域周遊数) | # of distinct Places a user checks in at (in-app `visitedPlaces`) | 日帰り客 avg places visited/person = 1.5 (都内) / 1.7 (道府県) (dataset A, 2023) | Raise per-journey multi-place visits in Tama; target ≥2 Tama places per journey (vs ~1.5 baseline). Counteracts the single-anchor pattern in M3. |
| **collected food cultures / user** (食文化体験数) | # of FoodCultures unlocked via in-area check-in (`collected`) | No public "food culture visit" statistic exists; closest proxy: foreign visitors reaching any Tama area ≤3.5% (dataset B) | Grow collection completion; each unlock is a verified in-Tama visit. |
| **journey regional-stay/roaming proxy** (地域滞在・周遊 proxy) | Share of journeys containing ≥2 Tama municipalities/areas (in-app journey log) | Tama visit = weekend/seasonal, single-anchor, ≤100 km catchment (dataset C); avg places/person 1.5–4.6 (dataset A) | Shift single-spot Tama trips to multi-spot Tama journeys (e.g. 奥多摩 + 青梅). |
| **merchant / experience visits** (地域消費接点) | # of visits to local merchants/experiences (place `type` = merchant/experience) | 奥多摩 0.7% foreign visit rate; Tama events 近隣集客型 (dataset B, C) | Increase on-the-ground local-business touchpoints, converting foreign + domestic demand into Tama spend (M2 gap). |

These were legacy MVP candidates, not current production targets.

---

## 6. Pitch-ready summary / ピッチ用サマリー

**English (≈110 words):**
> Tokyo's tourism boom is geographically lopsided. In 2023 the most-visited areas among foreign visitors — Shibuya 67%, Shinjuku 57%, Ginza 50% — captured the crowds, while no single Tama area reached 3.5%; Okutama saw just 0.7%. Yet those visitors stayed 5.2 nights and spent ¥179,154 per trip in Tokyo. Tokyo Mogu Mogu creates reasons to discover destinations beyond the 23 wards through regional food culture, people, nature, and experiences. The 2026 hackathon tests that vision through a single demo golden path — **Okutama × Tokyo Wasabi** — with Tama / Okutama as its current fieldwork and demo-content context, turning an unfamiliar local culture into a story travelers understand, a route they want to take, and actions that support the region.

**日本語 (≈110字):**
> 東京の観光需要は23区の著名地域に偏っています。2023年、訪都外国人が最も訪れたのは渋谷67.1%・新宿・大久保57.4%・銀座50.1%で、多摩の各エリアは3.5%以下、奥多摩は0.7%でした。Tokyo Mogu Moguは、地域の食文化・人・自然・体験を入口に、旅行者が23区外へ「わざわざ行きたい」と思える理由をつくります。2026年のHackathonでは、その仮説を1本の決定論デモ（**奥多摩 × 東京わさび**、多摩 / 奥多摩はフィールドワーク・デモコンテンツの中心）で検証し、物語への理解を訪問ルートと地域を支える行動につなげます。

---

## 7. Method & reproducibility / 分析方法と再現性

**How the figures were gathered:**
1. Source discovery: web search for the three candidate surveys in Issue #18, favoring 東京都産業労働局 / 東京都 official pages and the BODIK / catalog.data.metro.tokyo.lg.jp open-data portals.
2. Primary figures (dataset A): the open-data CSVs `R5tourist_number_survey_3.csv` / `_4.csv` and `R6tourist_number_survey_3.csv` / `_4.csv` were downloaded and read directly; aggregate tables were cross-checked against the annual 別紙 summary PDFs and the 2024 press release to guard against transcription error.
3. Survey figures (dataset B): the 97-page 令和5年 report PDF was downloaded and parsed (text extraction); figures 図表14 (訪問した場所), 図表16 (活動), 図表44 (支出額・平均泊数) and the 調査概要 (methodology, sample) were read directly from the document.
4. Mobile-data view (dataset C): the three TCVB report PDFs were downloaded and parsed; only explicitly stated findings (cluster types, YoY %, event classification, catchment notes) were used.

**What needs re-checking before reuse:**
- Survey rounds: R6 (2024) figures are the latest available as of 2026-08-08; newer annual results (2025) will supersede them when released by 東京都産業労働局 (usually mid-year).
- License: dataset A is CC-BY-4.0 (BODIK). Datasets B and C are public government/TCVB reports with no explicit open-data license on the PDFs — attribute when reusing in public materials.
- Dataset C is opt-in mobile GPS data for **domestic residents only**; it is directional evidence, not a census. TCVB itself cautions about statistical reliability for small numbers.
- The 区部/多摩/島しょ official split of 観光入込客数 / 観光消費額 is **not publicly released** (see §3.5); if it becomes available (e.g. via the 観光統計データダッシュボード at data.tourism.metro.tokyo.lg.jp or a future annual report), replace the proxy indicators in §3.2–3.4 with the official split.
- モバイルデータを活用した訪都旅行者動態調査: no public figures found as of 2026-08-08; if released, it is the preferred direct source for journey-level central-vs-Tama flows.

**Reproduction:** all figures can be re-derived by downloading the CSVs / PDFs at the URLs in §2, re-extracting the cited tables, and re-applying the exact source/year/table references above. Every number in this document carries dataset + year + source + table/figure pointer.
