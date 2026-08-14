/**
 * Seed data: Tama food cultures.
 *
 * NOTE ON PROVENANCE:
 * - Food culture facts (what/where) are based on publicly available tourism
 *   information from the cited official sources. The narrative fields
 *   (story/history/maker/howToEnjoy) are team-authored editorial copy
 *   (origin: 'editorial') written from those public sources.
 * - Coordinates on places are approximate (origin: 'demo') and must be
 *   re-verified during the Issue #10 Okutama fieldwork before real-world use.
 *
 * Source URLs use official top-level domains; exact deep links may need
 * updating. retrievedAt is the retrieval date of the base facts (no
 * confirmedAt / verification claim is made — everything is needs_confirmation
 * until a stakeholder confirms it, Issue #10 / #129).
 */
import type { FoodCulture } from './model';

export const FOOD_CULTURES: FoodCulture[] = [
  {
    id: 'wasabi-okutama',
    nameJa: '東京わさび',
    nameEn: 'Tokyo Wasabi',
    category: 'produce',
    area: 'okutama',
    descriptionJa: '多摩川上流域の清流で育つ、東京都の特産わさび。',
    descriptionEn: 'Tokyo\'s signature wasabi, grown in the clear streams of the Tama river headwaters.',
    storyJa:
      'わさびは清らかな冷水でしか育ちません。奥多摩のわさび田は谷の沢水を引き込んだ棚田状で、急流を利用した伝統的な「畳流し」や水掛け栽培が今も続いています。',
    storyEn:
      'Wasabi only grows in clean cold water. Okutama\'s wasabi fields are terraced paddies fed by mountain stream water, still cultivated using traditional stone-laden and water-flush methods.',
    historyJa:
      '東京都のわさび栽培は江戸時代から続き、明治期には「東京わさび」として名を馳せました。多摩地域は都内で最もわさび生産が盛んなエリアです。',
    historyEn:
      'Wasabi cultivation in Tokyo dates back to the Edo period and became famous as "Tokyo Wasabi" in the Meiji era. Tama remains Tokyo\'s leading wasabi-producing area.',
    makerJa:
      '奥多摩のわさび農家は、渓流を守りながら少量・高品質のわさびを育てています。収穫は秋から冬が中心です。',
    makerEn:
      'Okutama\'s wasabi farmers grow small-batch, high-quality wasabi while protecting the mountain streams. Harvest runs mainly from autumn to winter.',
    howToEnjoyJa: '新鮮なわさびはおろしたてを刺身やそばに。葉わさびは漬け物で楽しめます。',
    howToEnjoyEn: 'Grate fresh wasabi for sashimi or soba; enjoy leaf wasabi as a pickle.',
    image: 'wasabi-okutama',
    hintJa: '奥多摩駅からバスでわさび田へ。谷の清流を探そう。',
    hintEn: 'Take a bus from Okutama Station to the wasabi fields. Follow the mountain streams.',
    placeIds: ['okutama-tourism-office', 'chishima-wasabi-garden', 'shishiguchiya'],
    unlockMethod: 'location-checkin',
    sources: [
      {
        name: '奥多摩観光協会',
        url: 'https://www.okutokanko.jp/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
        originalId: 'seed-1'
      },
      {
        name: '東京都産業労働局 特産品情報',
        url: 'https://www.sangyo-rodo.metro.tokyo.lg.jp/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
        originalId: 'seed-2'
      },
    ],
    origin: 'editorial',
  },
  {
    id: 'yamame-okutama',
    nameJa: '奥多摩やまめ',
    nameEn: 'Okutama Yamame Trout',
    category: 'seafood',
    area: 'okutama',
    descriptionJa: '奥多摩の清流で育つ渓流魚。釣り体験と塩焼きで味わえます。',
    descriptionEn: 'River trout raised in Okutama\'s clear streams. Enjoy a catch-and-taste experience or salt-grilled trout.',
    storyJa:
      'やまめは渓流の源流部に棲む魚で、その姿から「山女」と書かれます。奥多摩では釣り堀で手軽に釣りを体験し、その場で塩焼きにできる施設があります。',
    storyEn:
      'Yamame (literally "mountain woman") trout live in upper mountain streams. In Okutama, facilities let visitors try fishing easily and grill their catch on the spot.',
    historyJa:
      '奥多摩の渓流漁は地域の暮らしと結びつき、川魚料理は古くからの名物です。',
    historyEn:
      'Mountain stream fishing is woven into Okutama\'s way of life, and river-fish dishes have long been a local specialty.',
    makerJa: 'やまめの里・奥多摩フィッシングセンターが養殖と体験を提供しています。',
    makerEn:
      'Yamame no Sato Okutama Fishing Center offers farm-raised trout and hands-on fishing experiences.',
    howToEnjoyJa: '釣ったやまめはその場で塩焼きに。秋には紅葉を眺めながら味わえます。',
    howToEnjoyEn: 'Have your catch salt-grilled on the spot — a perfect autumn treat among the fall colors.',
    image: 'yamame-okutama',
    hintJa: '奥多摩の渓流沿いにある釣り施設を目指そう。',
    hintEn: 'Head to the fishing facility along Okutama\'s river.',
    placeIds: ['okutama-fishing-center'],
    unlockMethod: 'location-checkin',
    sources: [
      {
        name: '奥多摩観光協会',
        url: 'https://www.okutokanko.jp/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
        originalId: 'seed-3'
      },
    ],
    origin: 'editorial',
  },
  {
    id: 'kumma-hyakka-ome',
    nameJa: '青梅くんまひゃっか',
    nameEn: 'Ome Kumma Hyakka (Simmered Mountain Greens)',
    category: 'processed-food',
    area: 'ome',
    descriptionJa: '青梅に伝わる、山菜や若芽を醤油で煮た保存食。',
    descriptionEn: 'A traditional Ome preserved food of mountain greens and young sprouts simmered in soy sauce.',
    storyJa:
      'くんまひゃっかは青梅に昔から伝わる加工食品で、たけのこや山菜などの若芽を甘辛く醤油で煮て作り、ご飯のお供やお茶うけに食べられてきました。',
    storyEn:
      'Kumma hyakka is a long-standing Ome preserved food: young shoots of bamboo and mountain greens simmered sweet-and-salty in soy sauce, eaten with rice or tea.',
    historyJa:
      '山の恵みを長く保存する知恵として、山間部の家庭で作られてきた保存食です。',
    historyEn:
      'Born from the wisdom of preserving mountain bounty, this is a classic pantry staple of the mountain households.',
    makerJa: '青梅市内の伝統食品店が製法を引き継いでいます。',
    makerEn: 'Traditional food shops in Ome City carry on the craft.',
    howToEnjoyJa: '温かいご飯にのせて、またはそのままお茶うけとして。',
    howToEnjoyEn: 'Serve over warm rice, or enjoy as-is with tea.',
    image: 'kumma-hyakka-ome',
    hintJa: '青梅駅周辺の伝統食品店へ足を運ぼう。',
    hintEn: 'Visit a traditional food shop around Ome Station.',
    placeIds: ['kumma-hyakka-shop'],
    unlockMethod: 'location-checkin',
    sources: [
      {
        name: '青梅市',
        url: 'https://www.city.ome.tokyo.jp/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
        originalId: 'seed-4'
      },
    ],
    origin: 'editorial',
  },
  {
    id: 'uguisu-mochi-ome',
    nameJa: '多摩の和菓子 うぐいす餅',
    nameEn: 'Tama Wagashi — Uguisu Mochi',
    category: 'sweets',
    area: 'ome',
    descriptionJa: 'うぐいす色の餅と餡が特徴の、青梅名物の和菓子。',
    descriptionEn: 'A signature Ome wagashi: pale green mochi and sweet bean paste.',
    storyJa:
      'うぐいす餅は、うぐいす色（若草色）の餅で餡を包んだ和菓子で、青梅の和菓子店で親しまれています。春の訪れを告げる味として人気です。',
    storyEn:
      'Uguisu mochi wraps sweet bean paste in uguisu-green (pale green) mochi. Loved in Ome, it tastes like the arrival of spring.',
    historyJa: '「うぐいす」は青梅の里山に響く鳥の声にちなみ、昔から春の銘菓として愛されてきました。',
    historyEn:
      'Named after the songbirds (uguisu) heard across Ome\'s hills, this has been a beloved spring sweet for generations.',
    makerJa: '青梅市内の複数の和菓子店が季節の銘菓として製造しています。',
    makerEn: 'Several wagashi shops across Ome City make it as their seasonal specialty.',
    howToEnjoyJa: '煎茶とともに、ほどよい甘さをゆっくり味わって。',
    howToEnjoyEn: 'Savor with sencha tea and enjoy its gentle sweetness slowly.',
    image: 'uguisu-mochi-ome',
    hintJa: '青梅駅前の和菓子店を訪ねてみよう。',
    hintEn: 'Look for a wagashi shop near Ome Station.',
    placeIds: ['uguisu-mochi-shop'],
    unlockMethod: 'location-checkin',
    sources: [
      {
        name: '青梅市観光協会',
        url: 'https://www.city.ome.tokyo.jp/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
        originalId: 'seed-5'
      },
    ],
    origin: 'editorial',
  },
  {
    id: 'okutama-soba',
    nameJa: '奥多摩そば',
    nameEn: 'Okutama Soba',
    category: 'processed-food',
    area: 'okutama',
    descriptionJa: '清流のまち奥多摩で味わう、風味豊かな手打ちそば。',
    descriptionEn: 'Hand-made soba with rich flavor, enjoyed in the mountain town of Okutama.',
    storyJa:
      '奥多摩そばは、山あいの風土と清らかな水で打たれる手打ちそばです。町内に点在する店を巡る「そば街道」としても知られています。',
    storyEn:
      'Okutama soba is hand-made with clear mountain water in the valley town\'s climate. The many shops form a local "soba road" for visitors.',
    historyJa: '山間の町で育まれたそば文化は、旅の味として地域に定着しています。',
    historyEn:
      'Soba culture grew out of the mountain town\'s daily life and settled in as the taste of travelers.',
    makerJa: '奥多摩そば街道を彩る各店の職人が、毎朝丁寧にそばを打ちます。',
    makerEn:
      'Craftsmen at the shops along Okutama\'s soba road hand-knead fresh soba every morning.',
    howToEnjoyJa: 'ざるそばで麺の香りを味わい、のどごしを楽しんで。',
    howToEnjoyEn: 'Try zaru soba (cold) to appreciate the noodle aroma and smooth texture.',
    image: 'okutama-soba',
    hintJa: '奥多摩駅前から続くそば屋を探そう。',
    hintEn: 'Find the soba shops near Okutama Station.',
    // okutama-soba-shop is the pre-existing demo fixture (kept for its off-path
    // consumers); soba-isshintei is the source-backed real soba restaurant on
    // the frozen journey. Both keep the Place ↔ FoodCulture relationship
    // symmetric (Issue #127).
    placeIds: ['okutama-soba-shop', 'soba-isshintei'],
    unlockMethod: 'location-checkin',
    sources: [
      {
        name: '奥多摩観光協会',
        url: 'https://www.okutokanko.jp/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
        originalId: 'seed-6'
      },
    ],
    origin: 'editorial',
  },
  {
    id: 'okutama-konnyaku',
    nameJa: '奥多摩こんにゃく',
    nameEn: 'Okutama Konnyaku',
    category: 'processed-food',
    area: 'okutama',
    descriptionJa: '奥多摩の名物、つるんとしたいもこんにゃく。',
    descriptionEn: 'A Okutama specialty: smooth, chewy konnyaku made from konnyaku potatoes.',
    storyJa:
      '奥多摩こんにゃくは、こんにゃく芋から手作りされるいもこんにゃく。田楽や煮物で親しまれ、町の名物として定着しています。',
    storyEn:
      'Okutama konnyaku is hand-made from konnyaku potatoes. Enjoyed as dengaku (miso-grilled) or simmered, it is a beloved local specialty.',
    historyJa: '山の食卓を支えてきたこんにゃくは、奥多摩では観光客にも人気の味です。',
    historyEn:
      'Long a staple of mountain meals, Okutama konnyaku is now a favorite of visitors too.',
    makerJa: '地元の加工者が昔ながらの製法で作っています。',
    makerEn: 'Local makers produce it using traditional methods.',
    howToEnjoyJa: '田楽味噌で焼いて、香ばしく熱々をどうぞ。',
    howToEnjoyEn: 'Grill it with sweet miso (dengaku) and enjoy it hot.',
    image: 'okutama-konnyaku',
    hintJa: '奥多摩の道の駅で、いもこんにゃくを探そう。',
    hintEn: 'Look for potato konnyaku at Okutama\'s roadside station.',
    placeIds: ['okutama-michi-no-eki'],
    unlockMethod: 'location-checkin',
    sources: [
      {
        name: '奥多摩観光協会',
        url: 'https://www.okutokanko.jp/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
        originalId: 'seed-7'
      },
    ],
    origin: 'editorial',
  },
  {
    id: 'yuzu-hinode',
    nameJa: '日の出ゆず',
    nameEn: 'Hinode Yuzu',
    category: 'produce',
    area: 'hinode',
    descriptionJa: '東京・日の出町で育つ、香り豊かなゆず。',
    descriptionEn: 'Fragrant yuzu citrus grown in Hinode, Tokyo.',
    storyJa:
      '日の出町は東京でも有数のゆずの産地です。冬の収穫期には町中にゆずの香りが漂います。',
    storyEn:
      'Hinode is one of Tokyo\'s leading yuzu-growing towns. In the winter harvest season the whole town smells of yuzu.',
    historyJa: '山あいの傾斜地でゆず栽培が盛んになり、加工品にも活かされるようになりました。',
    historyEn:
      'Yuzu farming thrived on the town\'s hillsides and now also feeds a range of processed products.',
    makerJa: '日の出町のゆず農家が丹精込めて育てています。',
    makerEn: 'Hinode\'s yuzu farmers cultivate their fruit with care.',
    howToEnjoyJa: 'ゆず湯にしたり、ポン酢やドレッシングにして香りを楽しんで。',
    howToEnjoyEn: 'Add to a yuzu bath, or use as ponzu or dressing to enjoy the aroma.',
    image: 'yuzu-hinode',
    hintJa: '日の出町の直売所でゆずを探そう。',
    hintEn: 'Find yuzu at a Hinode roadside stand.',
    placeIds: ['hinode-yuzu-stand'],
    unlockMethod: 'location-checkin',
    sources: [
      {
        name: '日の出町',
        url: 'https://www.town.hinode.tokyo.jp/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-08',
      verificationStatus: 'needs_confirmation',
        originalId: 'seed-8'
      },
    ],
    origin: 'editorial',
  },
  // ---- 青梅・沢井 slice (Issue #163) ---------------------------------------
  // Provenance: 小澤酒造 (sake brewery, brand 澤乃井), the brewery-run garden
  // restaurant 澤乃井園, and 御嶽神社 are all REAL facilities. Names, addresses,
  // function and setting are transcribed from the cited official / open-data
  // sources (retrieved 2026-08-14): 小澤酒造 official site (sawanoi-sake.com),
  // GO TOKYO 日本酒ガイド (東京都観光公式サイト, gotokyo.org), and the 青梅市観光スポット
  // 一覧 open data (CC BY 4.0, t132055d0000000027). The narrative fields below
  // are team-editorial copy (origin: 'editorial') grounded strictly in those
  // sources — no invented statistics, and no hours / price / reservation /
  // current-operation claims beyond what a source states. verificationStatus is
  // needs_confirmation for every source (no stakeholder confirmation yet, Issue
  // #129). The 青梅市観光スポット一覧 XLSX rows were not individually re-read; its
  // inclusion of 小澤酒造 / 澤乃井園 follows the #130 opportunity-map evidence.
  {
    id: 'sake-ome',
    nameJa: '青梅・沢井の日本酒',
    nameEn: 'Sawai Sake of Ome',
    category: 'processed-food',
    area: 'ome',
    descriptionJa: '青梅・沢井の小澤酒造が醸す、多摩川の清流が流れる渓谷の里の日本酒「澤乃井」。',
    descriptionEn:
      'Sake brewed by Ozawa Shuzo in Sawai, Ome — "Sawanoi", from the clear-stream valley of the Tama River.',
    storyJa:
      '沢井は多摩川の清流が流れる渓谷の里です。小澤酒造は自然豊かな渓谷のほとりで日本酒と豆腐を造り、酒銘「澤乃井」はこの土地の水と米から醸されます。',
    storyEn:
      'Sawai is a valley town along the clear Tama River. Ozawa Shuzo brews sake and makes tofu on the banks of this naturally rich valley, producing the "Sawanoi" label from the land\'s water and rice.',
    historyJa:
      '小澤酒造は元禄時代の創業と伝わる老舗です。創業の頃に建てられた土造りの蔵「元禄蔵」が現存し、歴史的に貴重な建造物とされています。',
    historyEn:
      'Ozawa Shuzo is a long-established brewery said to date back to the Genroku era. Its Genroku-era earthen storehouse survives and is considered historically valuable.',
    makerJa:
      '小澤酒造は、酒蔵の裏手にある井戸「蔵の井」の水を使って日本酒を醸しています。沢井駅から歩いて訪ねることができます。',
    makerEn:
      'Ozawa Shuzo brews its sake with water from the "Kura no I" well behind the brewery, a short walk from Sawai Station.',
    howToEnjoyJa:
      '酒蔵では予約制の見学と試飲があります。蔵元直営の「澤乃井園」でも、澤乃井の生原酒や甘酒を楽しめます。',
    howToEnjoyEn:
      'The brewery offers a reservation-based tour with sake tasting, and the brewery-run Sawanoien garden serves Sawanoi nama genshu and amazake.',
    image: 'sake-ome',
    hintJa: '沢井駅から川沿いを歩いて酒蔵へ。「澤乃井」の看板を目印に。',
    hintEn: 'Walk from Sawai Station along the river to the brewery — look for the "Sawanoi" sign.',
    // Sake is experienced at the brewery and its garden restaurant only; the
    // 御嶽神社 cultural-property stop on the same journey carries no sake link
    // (Issue #127: placeIds = places where the culture is experienced HERE).
    placeIds: ['sawai-ozawa-shuzo', 'sawanoien-garden'],
    unlockMethod: 'location-checkin',
    sources: [
      {
        name: '小澤酒造（公式サイト）',
        url: 'https://www.sawanoi-sake.com/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-14',
        verificationStatus: 'needs_confirmation',
        originalId: 'ozawa-shuzo',
      },
      {
        name: 'GO TOKYO 日本酒ガイド（東京都観光公式サイト）',
        url: 'https://www.gotokyo.org/tc/workshop/sd009/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-14',
        verificationStatus: 'needs_confirmation',
        originalId: 'gotokyo-sd009',
      },
      {
        name: '東京都青梅市における観光スポット一覧（オープンデータ）',
        url: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t132055d0000000027',
        license: 'CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）',
        sourceType: 'open_data',
        sourceDatasetId: 't132055d0000000027',
        retrievedAt: '2026-08-14',
        verificationStatus: 'needs_confirmation',
        originalId: 't132055d0000000027',
      },
    ],
    origin: 'editorial',
  },
];
