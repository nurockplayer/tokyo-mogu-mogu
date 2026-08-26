/**
 * Serializable factual records currently rendered by the reference MVP.
 *
 * This module is shared by browser presentation code and the repository-only
 * verification-ledger adapter. Keep it free of React, assets, DOM state,
 * filesystem/process APIs, and generator code.
 */
import type { Locale } from '../../i18n';
import type {
  JourneyPresentation,
  ReferenceAssetId,
  SpotPresentation,
} from './content';

export interface LocalizedText {
  ja: string;
  en: string;
  'zh-TW': string;
}

const localized = (ja: string, en: string, zhTW: string): LocalizedText => ({
  ja,
  en,
  'zh-TW': zhTW,
});

const editorialReferenceNotes: Record<Locale, string> = {
  ja: '掲載内容は参考情報で、未確認の場合があります。訪問前に各施設の公式情報をご確認ください。',
  en: 'This listing is reference information and may not be verified. Check the venue’s official information before visiting.',
  'zh-TW': '此處刊載的內容為參考資訊，可能尚未經確認。造訪前請以各場所的官方資訊為準。',
};

export const demoJourneys: JourneyPresentation[] = [
  {
    id: 'demo-okutama-wasabi', regionId: 'okutama', foodCultureId: 'wasabi-okutama', storyId: 'wasabi-okutama', routeId: 'okutama-wasabi-journey', matchPercent: 96, imageAssetId: 'wasabiHero', heroAssetId: 'wasabiHero',
    copy: {
      ja: { title: '水がつなぐ、江戸から続く辛味', subtitle: '奥多摩のわさび文化をたどる', description: '自然に触れたい／作り手に会いたい／伝統に興味がある人へ。江戸時代から続く奥多摩わさびの文化を、食べて・買って・歩いてたどる旅。', tags: ['自然', '伝統', '半日巡り'], storyTitle: '奥多摩わさびのストーリー', intro: ['奥多摩町は、東京都多摩地域の北西部に位置する、山と水に囲まれた町です。東京都にありながら町の大部分を山林が占め、日本百名山のひとつである雲取山や、多摩川の源流、奥多摩湖など、豊かな自然が広がっています。', '東京都の自治体の中で最も広い面積を持ち、急峻な山々と冷たく澄んだ水に恵まれていることも、奥多摩ならではの特徴です。そんな自然環境の中で、江戸時代から人々の暮らしを支えてきた食文化があります。それが、奥多摩わさびです。'] },
      en: { title: 'A pungent taste carried by water since Edo', subtitle: 'Follow Okutama’s wasabi culture', description: 'For people who want to meet nature, makers, and tradition. Taste, shop, and walk through the story.', tags: ['Nature', 'Tradition', 'Half day'], storyTitle: 'The story of Okutama wasabi', intro: ['Okutama is surrounded by mountains and water, where food culture has grown beside clear, cold streams.', 'Follow water, makers, and taste to meet the story of the place.'] },
      'zh-TW': { title: '由水串起、延續自江戶的辛香', subtitle: '走讀奧多摩的山葵文化', description: '適合想親近自然、遇見職人與認識傳統的人。透過品嚐、購買與步行來認識這段故事。', tags: ['自然', '傳統', '半日'], storyTitle: '奧多摩山葵的故事', intro: ['被山與水環繞的奧多摩，孕育出與清澈冷水相伴的飲食文化。', '跟著水、職人與味道，認識地方的故事。'] },
    },
    chapters: {
      ja: [{ number: '01.', title: 'なぜ、わさびなのか', body: '奥多摩のわさび栽培は、江戸時代から続いています。かつては、わさびを売った収入で塩や醤油などの生活必需品を買い、人々の暮らしを支えていました。その栽培を可能にしたのが、多摩川源流の冷たく澄んだ水です。' }, { number: '02.', title: '誰が作っているのか', body: 'いま奥多摩では、30代を含む約10人の後継者が技術の継承に取り組みます。神奈川出身の角井仁さん・竜也さん兄弟「わさびブラザーズ」、放置わさび田の再生に挑むオーストラリア出身のデイビッド・ヒュームさん。' }, { number: '03.', title: '受け継がれてきた技術', body: '渓流沿いの石積みの田、湧き水の管理、約1年半かけて学ぶ「わさび塾」。土地の知恵は人から人へ手渡しで受け継がれてきました。' }, { number: '04.', title: 'いま直面している課題', body: '生産者の高齢化、人手不足、そして台風被害。放置されるわさび田も増えている。――だからこそ、あなたの一口に意味がある。' }, { number: '05.', title: 'あなたにできること', body: 'ここで食べる・買う・体験することが、そのまま生産者の収入と技術の継承につながる。' }],
      en: [{ number: '01.', title: 'Why wasabi?', body: 'Clear, cold water shapes its aroma and heat.' }, { number: '02.', title: 'Who makes it?', body: 'Care and local knowledge sustain both fields and flavor.' }, { number: '03.', title: 'Knowledge passed on', body: 'Methods suited to this landscape move hand to hand.' }, { number: '04.', title: 'Challenges today', body: 'Changing environments and fewer successors challenge continuity.' }, { number: '05.', title: 'What you can do', body: 'Tasting and visiting can support the next generation.' }],
      'zh-TW': [{ number: '01.', title: '為什麼是山葵？', body: '清澈冰冷的水孕育出香氣與辛味。' }, { number: '02.', title: '誰在製作？', body: '職人的照料與地方智慧守護著田地和味道。' }, { number: '03.', title: '傳承的技術', body: '適合這片土地的方法，一代一代地傳下來。' }, { number: '04.', title: '當前的課題', body: '環境變化與接班人不足，讓傳承面臨挑戰。' }, { number: '05.', title: '你能做什麼', body: '在這裡品嚐與造訪，可以支持下一代。' }],
    },
    routeVariants: [
      { id: 'half-day', durationMinutes: 150, imageAssetId: 'figmaRouteMap', steps: [{ spotId: 'okutama-station', imageAssetId: 'station' }, { spotId: 'okutama-tourism-office', imageAssetId: 'tourismOfficeRoute' }, { spotId: 'wasabi-kitchen', imageAssetId: 'wasabiKitchen' }, { spotId: 'okutama-kitchen', imageAssetId: 'wasabiGelato' }, { spotId: 'hikawa-valley', imageAssetId: 'valley' }, { spotId: 'oku-hikawa-shrine', imageAssetId: 'okuHikawaShrine' }, { spotId: 'port-okutama', imageAssetId: 'port' }] },
      { id: 'full-day', durationMinutes: 420, imageAssetId: 'figmaRouteMap', steps: [{ spotId: 'mitake-station', imageAssetId: 'station' }, { spotId: 'wasabi-experience', imageAssetId: 'wasabiExperience' }, { spotId: 'okutama-station', imageAssetId: 'station' }, { spotId: 'akabeko', imageAssetId: 'akabekoYamame' }, { spotId: 'yamashiroya', imageAssetId: 'yamashiroyaGoods' }, { spotId: 'port-okutama', imageAssetId: 'portDetail' }] },
    ],
  },
  {
    id: 'demo-okutama-yamame', regionId: 'okutama', foodCultureId: 'yamame-okutama', storyId: 'yamame-okutama', routeId: 'okutama-yamame-journey', matchPercent: 91, imageAssetId: 'yamameResult', heroAssetId: 'akabekoYamame',
    copy: {
      ja: { title: '水が育てる、幻の川魚', subtitle: '奥多摩やまめの食文化', description: '地域の日常が好き／川魚・魚料理が好き／のんびり歩きたい人へ。多摩川の水が育てる「奥多摩やまめ」を味わう旅。', tags: ['自然', '伝統', '半日巡り'], storyTitle: '奥多摩やまめのストーリー', intro: ['奥多摩では、多摩川のきれいな水を生かしたヤマメの養殖が続けられてきました。東京都の養殖研究施設が2か所あり、技術の研究と普及を担っています。冷たく澄んだ水こそが、この食文化のはじまりです。'] },
      en: { title: 'A rare river fish raised by water', subtitle: 'Okutama yamame food culture', description: 'For people who enjoy river fish and local everyday life. Meet a taste raised by the Tama River.', tags: ['Nature', 'River fish', 'Half day'], storyTitle: 'The story of Okutama yamame', intro: ['Food work and local flavors continue alongside clear water.', 'Trace river-fish culture while feeling the gift of water.'] },
      'zh-TW': { title: '由水孕育的珍稀河魚', subtitle: '奧多摩山女魚飲食文化', description: '適合喜歡河魚與地方日常的人。遇見由多摩川之水孕育的味道。', tags: ['自然', '河魚', '半日'], storyTitle: '奧多摩山女魚的故事', intro: ['在清澈水流旁，地方的飲食工作與風味持續延續。', '感受水的恩惠，走讀河魚飲食文化。'] },
    },
    chapters: {
      ja: [{ number: '01.', title: 'なぜこの地域で', body: '奥多摩では、多摩川のきれいな水を生かしたヤマメの養殖が続けられてきました。東京都の養殖研究施設が2か所あり、技術の研究と普及を担う。冷たく澄んだ水こそが、この食文化のはじまりです。' }, { number: '02.', title: '誰が受け継いでいるのか', body: '約120年の旅館を受け継ぐ「炉ばた あかべこ」の4代目。味噌と山椒を合わせるやまめの食べ方は、山梨出身のご親戚から受け継いだもの。病気に弱いヤマメを育てる研究者たちの存在も。' }, { number: '03.', title: '奥多摩やまめの秘密', body: '「奥多摩やまめ」は卵を産まない性質を持つ。だから通常より長く生き、大きく育つ。塩焼きだけでなく、刺身や切り身でも味わえる希少な川魚。' }, { number: '04.', title: 'いま直面している課題', body: '養殖魚は病気になりやすく、かつての養殖場見学を再開するには衛生管理の壁がある。日帰り中心で宿泊客が少ないことも地域の課題。――だから、訪れて味わうことに意味がある。' }, { number: '05.', title: 'あなたにできること', body: 'ここで食べ、泊まり、語ること。それが多摩川の水の文化を未来へつなぐ力になる。' }],
      en: [{ number: '01.', title: 'A taste raised by water', body: 'Clear water supports this river-fish food culture.' }],
      'zh-TW': [{ number: '01.', title: '由水孕育的味道', body: '清澈的水支撐著這份河魚飲食文化。' }],
    },
    routeVariants: [{ id: 'half-day', durationMinutes: 240, imageAssetId: 'routeMap', steps: [{ spotId: 'okutama-station', imageAssetId: 'station' }, { spotId: 'okutama-tourism-office', imageAssetId: 'tourismOffice' }, { spotId: 'hikawa-valley', imageAssetId: 'valley' }, { spotId: 'akabeko', imageAssetId: 'akabekoYamame' }] }],
  },
];

type SpotCopy = Pick<SpotPresentation['copy'][Locale], 'name' | 'lead' | 'description'>;

const spot = (
  id: string,
  imageAssetId: ReferenceAssetId,
  thumbnailAssetIds: ReferenceAssetId[],
  copy: Record<Locale, SpotCopy>,
): SpotPresentation => ({
  id,
  regionId: 'okutama',
  foodCultureId: 'wasabi-okutama',
  imageAssetId,
  thumbnailAssetIds,
  copy: {
    ja: { ...copy.ja, tags: ['参考情報'], practicalInfo: [{ label: '情報の確認', value: editorialReferenceNotes.ja }], caution: ['営業・予約・価格・アクセスなどは、訪問前に公式情報をご確認ください。'] },
    en: { ...copy.en, tags: ['Reference information'], practicalInfo: [{ label: 'Verification', value: editorialReferenceNotes.en }], caution: ['Please confirm hours, booking, prices, and access with official sources before visiting.'] },
    'zh-TW': { ...copy['zh-TW'], tags: ['參考資訊'], practicalInfo: [{ label: '資訊確認', value: editorialReferenceNotes['zh-TW'] }], caution: ['造訪前請以官方資訊確認營業時間、預約、價格與交通。'] },
  },
});

export const demoSpots: Record<string, SpotPresentation> = {
  'okutama-tourism-office': spot('okutama-tourism-office', 'tourismOfficeExterior', ['tourismOffice', 'wasapy', 'station', 'valley'], { ja: { name: '奥多摩観光案内所', lead: '旅の情報を確認する立ち寄り先', description: '奥多摩の観光情報に出会う、旅の最初の立ち寄り先です。' }, en: { name: 'Okutama Tourist Information Center', lead: 'A stop for checking visitor information', description: 'A first stop for discovering Okutama visitor information.' }, 'zh-TW': { name: '奧多摩觀光案內所', lead: '確認旅遊資訊的停靠點', description: '認識奧多摩旅遊資訊的第一個停靠點。' } }),
  akabeko: spot('akabeko', 'akabeko', ['akabekoYamame', 'akabekoYamameDetail', 'wasabiGelato', 'okutamaKitchenDetail'], { ja: { name: '炉ばた あかべこ', lead: '地域の味に出会う炉ばた料理店', description: '地域の食材を味わうための、参考スポットです。' }, en: { name: 'Robata Akabeko', lead: 'A hearth-grill restaurant for local flavors', description: 'A reference stop for tasting ingredients from the area.' }, 'zh-TW': { name: '爐端燒 AKABEKO', lead: '遇見在地風味的爐端料理店', description: '品嚐在地食材的參考景點。' } }),
  yamashiroya: spot('yamashiroya', 'yamashiroya', ['yamashiroyaGoods', 'yamashiroyaSign'], { ja: { name: '山城屋', lead: 'わさび加工の店を訪ねる', description: 'わさびにまつわる品を探すための、参考スポットです。' }, en: { name: 'Yamashiroya', lead: 'Visit a wasabi-specialty shop', description: 'A reference stop for finding wasabi-related goods.' }, 'zh-TW': { name: '山城屋', lead: '造訪山葵加工專門店', description: '尋找山葵相關商品的參考景點。' } }),
  'wasabi-kitchen': spot('wasabi-kitchen', 'wasabiKitchen', ['station', 'wasabiGelato'], { ja: { name: 'わさび食堂', lead: '駅前で味わうわさびの一皿', description: 'わさびの味を試すための、参考スポットです。' }, en: { name: 'Wasabi Shokudo', lead: 'A wasabi dish near the station', description: 'A reference stop for trying a wasabi flavor.' }, 'zh-TW': { name: '山葵食堂', lead: '在車站前品嚐一道山葵料理', description: '嘗試山葵風味的參考景點。' } }),
  'okutama-kitchen': spot('okutama-kitchen', 'okutamaKitchen', ['wasabiGelato', 'okutamaKitchenDetail'], { ja: { name: '奥多摩の台所', lead: '歩き旅の途中でひと休み', description: '地域の味わいに出会うための、参考スポットです。' }, en: { name: 'Okutama no Daidokoro', lead: 'A pause along a walking journey', description: 'A reference stop for meeting local flavors.' }, 'zh-TW': { name: '奧多摩的廚房', lead: '步行旅途中的小歇', description: '遇見地方風味的參考景點。' } }),
  'hikawa-valley': spot('hikawa-valley', 'valley', ['river', 'valleyBridge'], { ja: { name: '氷川渓谷', lead: '水と土地に触れる散策', description: '食文化を支える水辺の風景に出会う、参考スポットです。' }, en: { name: 'Hikawa Valley', lead: 'A walk that meets water and landscape', description: 'A reference stop for waterside scenery behind the food culture.' }, 'zh-TW': { name: '冰川溪谷', lead: '親近水與土地的散步', description: '遇見支撐飲食文化的水岸風景之參考景點。' } }),
  'port-okutama': spot('port-okutama', 'portCafe', ['port', 'portDetail'], { ja: { name: 'PORT OKUTAMA', lead: '旅の締めのコーヒーと土産探しに', description: '旅の最後に立ち寄るための、参考スポットです。' }, en: { name: 'PORT OKUTAMA', lead: 'Coffee and gifts to close the journey', description: 'A reference stop for the final part of the journey.' }, 'zh-TW': { name: 'PORT OKUTAMA', lead: '以咖啡與伴手禮為旅程收尾', description: '在旅程最後停靠的參考景點。' } }),
  'wasabi-experience': spot('wasabi-experience', 'wasabiExperience', ['river'], { ja: { name: 'Wasabi Experience', lead: 'わさび田の体験を知る', description: 'わさびの生産風景に触れるための、参考スポットです。' }, en: { name: 'Wasabi Experience', lead: 'Learn about a wasabi-field experience', description: 'A reference stop for meeting wasabi growing landscapes.' }, 'zh-TW': { name: 'Wasabi Experience', lead: '認識山葵田體驗', description: '親近山葵生產景觀的參考景點。' } }),
  'oku-hikawa-shrine': spot('oku-hikawa-shrine', 'okuHikawaShrine', ['valley', 'station'], { ja: { name: '奥氷川神社', lead: '奥多摩駅近くで地域の歴史にふれる', description: '地域の歴史と自然を感じられる静かな神社です。' }, en: { name: 'Oku-Hikawa Shrine', lead: 'Meet local history near Okutama Station', description: 'A quiet shrine where the area’s history and nature meet.' }, 'zh-TW': { name: '奧冰川神社', lead: '在奧多摩站附近感受地方歷史', description: '能感受地方歷史與自然的寧靜神社。' } }),
  'okutama-station': spot('okutama-station', 'station', ['tourismOffice'], { ja: { name: '奥多摩駅', lead: '旅のスタート地点', description: '旅程の起点として示す、参考スポットです。' }, en: { name: 'Okutama Station', lead: 'The journey’s starting point', description: 'A reference stop shown as the route’s starting point.' }, 'zh-TW': { name: '奧多摩站', lead: '旅程的起點', description: '作為行程起點顯示的參考景點。' } }),
  'mitake-station': spot('mitake-station', 'station', ['wasabiExperience'], { ja: { name: '御岳駅', lead: 'わさび体験へ向かう起点', description: '体験ルートの起点として示す、参考スポットです。' }, en: { name: 'Mitake Station', lead: 'A starting point for the wasabi experience', description: 'A reference stop shown as the experience route’s starting point.' }, 'zh-TW': { name: '御嶽站', lead: '前往山葵體驗的起點', description: '作為體驗路線起點顯示的參考景點。' } }),
};

export interface RouteStepText {
  /** Stable presentation stop identity; never derived from array position. */
  spotId: string;
  walk?: LocalizedText;
  description: LocalizedText;
  note?: LocalizedText;
}

export const routeNames: Record<string, LocalizedText> = {
  'demo-okutama-wasabi': localized('東京わさび文化を巡る旅', 'A journey through Tokyo wasabi culture', '走訪東京山葵文化之旅'),
  'demo-okutama-yamame': localized('新宿から約90分、奥多摩やまめを味わう旅', 'Taste Okutama yamame, 90 minutes from Shinjuku', '從新宿約 90 分鐘，品嚐奧多摩山女魚'),
};

export interface ResultLocation {
  area: string;
  station: string;
  access: string;
}

export const resultLocation: Record<string, Record<Locale, ResultLocation>> = {
  'demo-okutama-wasabi': {
    ja: { area: '奥多摩地区 (東京西部)', station: '東京駅', access: 'から電車で　約120分' },
    en: { area: 'Okutama area (Western Tokyo)', station: 'Tokyo Station', access: 'About 120 min by train' },
    'zh-TW': { area: '奧多摩地區（東京西部）', station: '東京站', access: '搭乘電車約 120 分鐘' },
  },
  'demo-okutama-yamame': {
    ja: { area: '奥多摩地区 (東京西部)', station: '新宿駅', access: 'から電車で　約90分' },
    en: { area: 'Okutama area (Western Tokyo)', station: 'Shinjuku Station', access: 'About 90 min by train' },
    'zh-TW': { area: '奧多摩地區（東京西部）', station: '新宿站', access: '搭乘電車約 90 分鐘' },
  },
};

export const routeStepText: Record<string, RouteStepText[]> = {
  'demo-okutama-wasabi:half-day': [
    { spotId: 'okutama-station', description: localized('旅のスタート地点', 'Starting point', '旅程起點') },
    { spotId: 'okutama-tourism-office', walk: localized('徒歩 約1分', 'About 1 min on foot', '步行約 1 分鐘'), description: localized('わさぴーと観光案内で情報をチェック！', 'Check maps and local tips with Wasapy!', '和 Wasapy 一起確認觀光資訊！') },
    { spotId: 'wasabi-kitchen', walk: localized('徒歩 約 1 分', 'About 1 min on foot', '步行約 1 分鐘'), description: localized('・土日のみ営業\n・¥900〜', 'Weekends only · From ¥900', '僅週末營業・¥900 起'), note: localized('※平日はあかべこ推奨', 'Akabeko is recommended on weekdays', '平日建議前往 AKABEKO') },
    { spotId: 'okutama-kitchen', walk: localized('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: localized('・わさびジェラート', 'Wasabi gelato', '山葵義式冰淇淋') },
    { spotId: 'hikawa-valley', walk: localized('徒歩 約 10 分', 'About 10 min on foot', '步行約 10 分鐘'), description: localized('川辺で涼む', 'Cool off beside the river', '在河畔納涼') },
    { spotId: 'oku-hikawa-shrine', walk: localized('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: localized('お参り！', 'Visit the shrine', '參拜神社！') },
    { spotId: 'port-okutama', walk: localized('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: localized('カフェ・雑貨でゆったり！', 'Relax with coffee and local goods', '在咖啡與雜貨中悠閒休息！') },
  ],
  'demo-okutama-wasabi:full-day': [
    { spotId: 'mitake-station', description: localized('JR青梅線・旅のスタート地点', 'JR Ome Line · Starting point', 'JR 青梅線・旅程起點') },
    { spotId: 'wasabi-experience', walk: localized('集合 8:30', 'Meet at 8:30', '8:30 集合'), description: localized('わさび田プライベートツアー\n・2〜2.5時間・1日1組', 'Private wasabi-field tour · 2–2.5 hours · One group daily', '山葵田私人導覽・2～2.5 小時・每日一組') },
    { spotId: 'okutama-station', walk: localized('御岳駅から電車', 'Train from Mitake Station', '從御嶽站搭電車'), description: localized('青梅線 約20分', 'About 20 min on the Ome Line', '青梅線約 20 分鐘') },
    { spotId: 'akabeko', walk: localized('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: localized('昼食・13:30 L.O.注意', 'Lunch · Last order 13:30', '午餐・13:30 最後點餐') },
    { spotId: 'yamashiroya', walk: localized('徒歩 約 3 分', 'About 3 min on foot', '步行約 3 分鐘'), description: localized('わさび漬・チーズわさび', 'Pickled and cheese wasabi', '山葵漬・起司山葵') },
    { spotId: 'port-okutama', walk: localized('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: localized('締めのコーヒー', 'Coffee to close the journey', '以咖啡為旅程收尾') },
  ],
  'demo-okutama-yamame:half-day': [
    { spotId: 'okutama-station', description: localized('旅のスタート地点', 'Starting point', '旅程起點') },
    { spotId: 'okutama-tourism-office', walk: localized('徒歩 約 1 分', 'About 1 min on foot', '步行約 1 分鐘'), description: localized('情報収集 30分', 'Gather information · 30 min', '蒐集資訊・30 分鐘') },
    { spotId: 'hikawa-valley', walk: localized('徒歩 約 10 分', 'About 10 min on foot', '步行約 10 分鐘'), description: localized('渓流さんぽ 60分', 'Streamside walk · 60 min', '溪流散步・60 分鐘') },
    { spotId: 'akabeko', walk: localized('徒歩 約 15 分', 'About 15 min on foot', '步行約 15 分鐘'), description: localized('やまめの昼食 60分', 'Yamame lunch · 60 min', '山女魚午餐・60 分鐘') },
  ],
};

export interface RouteStats {
  time: string;
  distance: string;
  spots: string;
  station: string;
  minutes: string;
}

export const routeStats: Record<string, Record<Locale, RouteStats>> = {
  'demo-okutama-wasabi:half-day': {
    ja: { time: '約 2.5 時間', distance: '徒歩約 6 km', spots: '6 スポット', station: '東京駅', minutes: '60 分' },
    en: { time: 'About 2.5 hr', distance: 'Walk about 6 km', spots: '6 spots', station: 'Tokyo Station', minutes: '60 min' },
    'zh-TW': { time: '約 2.5 小時', distance: '步行約 6 km', spots: '6 個景點', station: '東京站', minutes: '60 分鐘' },
  },
  'demo-okutama-wasabi:full-day': {
    ja: { time: '約 7 時間', distance: '電車 + 徒歩', spots: '6 スポット', station: '東京駅', minutes: '90 分' },
    en: { time: 'About 7 hr', distance: 'Train + walking', spots: '6 spots', station: 'Tokyo Station', minutes: '90 min' },
    'zh-TW': { time: '約 7 小時', distance: '電車＋步行', spots: '6 個景點', station: '東京站', minutes: '90 分鐘' },
  },
  'demo-okutama-yamame:half-day': {
    ja: { time: '約 4 時間', distance: '徒歩約 4 km', spots: '3 スポット', station: '新宿駅', minutes: '90 分' },
    en: { time: 'About 4 hr', distance: 'Walk about 4 km', spots: '3 spots', station: 'Shinjuku Station', minutes: '90 min' },
    'zh-TW': { time: '約 4 小時', distance: '步行約 4 km', spots: '3 個景點', station: '新宿站', minutes: '90 分鐘' },
  },
};

export interface ReferenceSpotDetail {
  tags: Array<{ color: string; label: LocalizedText }>;
  description: LocalizedText;
  information: Array<{
    fieldId: 'name' | 'address' | 'phone' | 'verification_note';
    icon: 'clock' | 'train' | 'information';
    label: LocalizedText;
    value: LocalizedText;
  }>;
  guide?: { title: LocalizedText; body: LocalizedText; action: LocalizedText };
  caution: LocalizedText[];
}

export const referenceSpotDetails: Partial<Record<string, ReferenceSpotDetail>> = {
  'okutama-tourism-office': {
    tags: [
      { color: '#8FAE5C', label: localized('観光案内', 'Visitor information', '觀光案內') },
      { color: '#F0A24C', label: localized('参考情報', 'Reference information', '參考資訊') },
      { color: '#5D9BEF', label: localized('確認中', 'Confirmation pending', '確認中') },
    ],
    description: localized(
      '奥多摩町観光案内所として掲載している参考情報です。所在地・電話番号を含む内容は現在確認中です。',
      'Reference information for the Okutama Town Tourist Information Center. The listed details are still being confirmed.',
      '此處為奧多摩町觀光服務處的參考資訊，包含地址與電話號碼在內的刊載內容仍在確認中。',
    ),
    information: [
      {
        fieldId: 'name',
        icon: 'information',
        label: localized('施設', 'Place', '設施'),
        value: localized('奥多摩町観光案内所', 'Okutama Town Tourist Information Center', '奧多摩町觀光服務處'),
      },
      {
        fieldId: 'address',
        icon: 'information',
        label: localized('所在地', 'Address', '地址'),
        value: localized('東京都西多摩郡奥多摩町氷川210', '210 Hikawa, Okutama, Nishitama, Tokyo', '東京都西多摩郡奧多摩町冰川 210'),
      },
      {
        fieldId: 'phone',
        icon: 'information',
        label: localized('電話', 'Phone', '電話'),
        value: localized('0428-83-2152', '0428-83-2152', '0428-83-2152'),
      },
      {
        fieldId: 'verification_note',
        icon: 'information',
        label: localized('確認状況', 'Verification status', '確認狀態'),
        value: localized(
          '施設名・所在地・電話番号を含む掲載内容は現在確認中です。訪問前に奥多摩観光協会の公式情報をご確認ください。',
          'The listed place name, address, and phone number are still being confirmed. Check the Okutama Tourism Association’s official information before visiting.',
          '刊載的設施名稱、地址與電話號碼仍在確認中。造訪前請以奧多摩觀光協會的官方資訊為準。',
        ),
      },
    ],
    guide: {
      title: localized('公式情報', 'Official information', '官方資訊'),
      body: localized(
        '掲載内容は現在確認中です。訪問前に奥多摩観光協会の公式情報をご確認ください。',
        'This listing is still being confirmed. Check current details with the Okutama Tourism Association’s official information before visiting.',
        '此刊載內容仍在確認中。造訪前請以奧多摩觀光協會的官方資訊確認最新內容。',
      ),
      action: localized('公式情報を確認する', 'Check official information', '查看官方資訊'),
    },
    caution: [localized(
      '・営業時間・サービス内容・アクセスは、訪問前に奥多摩観光協会の公式情報をご確認ください。',
      '• Confirm hours, services, and access with the Okutama Tourism Association’s official information before visiting.',
      '・營業時間、服務內容與交通方式，請於造訪前以奧多摩觀光協會的官方資訊為準。',
    )],
  },
};

export interface StorySpotReference {
  spotId: string;
  imageAssetId: ReferenceAssetId;
  badge: LocalizedText;
  badgeColor: string;
  description?: LocalizedText;
  note?: LocalizedText;
}

export const storySpotGroups: Record<string, {
  nearby: StorySpotReference[];
  nature: StorySpotReference[];
}> = {
  'demo-okutama-wasabi': {
    nearby: [
      {
        spotId: 'akabeko', imageAssetId: 'akabeko', badgeColor: '#E98A1C',
        badge: { ja: '飲食店', en: 'Restaurant', 'zh-TW': '餐廳' },
        description: {
          ja: '奥多摩ヤマメや手作りこんにゃく、わさびジェラートなど、地元の味',
          en: 'Local flavors including Okutama yamame, handmade konnyaku, and wasabi gelato',
          'zh-TW': '奧多摩山女魚、手作蒟蒻與山葵義式冰淇淋等在地滋味',
        },
      },
      {
        spotId: 'yamashiroya', imageAssetId: 'yamashiroya', badgeColor: '#E98A1C',
        badge: { ja: 'ショップ・雑貨', en: 'Shop', 'zh-TW': '商店・雜貨' },
        description: {
          ja: 'ショップ・わさび加工の老舗。創業172年、6代目が受け継ぐ',
          en: 'A 172-year-old wasabi shop now carried on by its sixth generation',
          'zh-TW': '創業 172 年、傳承至第六代的山葵加工老店',
        },
      },
      {
        spotId: 'wasabi-kitchen', imageAssetId: 'wasabiKitchen', badgeColor: '#E98A1C',
        badge: { ja: '飲食店', en: 'Restaurant', 'zh-TW': '餐廳' },
        description: {
          ja: '飲食・キッチンカー／土日中心',
          en: 'Food and a mobile kitchen, mainly on weekends',
          'zh-TW': '餐飲與行動餐車／主要於週末營業',
        },
      },
      {
        spotId: 'okutama-kitchen', imageAssetId: 'okutamaKitchen', badgeColor: '#E98A1C',
        badge: { ja: 'カフェ', en: 'Café', 'zh-TW': '咖啡廳' },
        description: {
          ja: 'わさびジェラートが名物',
          en: 'Known for its wasabi gelato',
          'zh-TW': '以山葵義式冰淇淋聞名',
        },
      },
      {
        spotId: 'port-okutama', imageAssetId: 'portCafe', badgeColor: '#E98A1C',
        badge: { ja: 'カフェ', en: 'Café', 'zh-TW': '咖啡廳' },
        description: {
          ja: 'カフェと雑貨の複合スポット',
          en: 'A combined café and lifestyle-goods spot',
          'zh-TW': '結合咖啡與生活雜貨的複合空間',
        },
      },
    ],
    nature: [
      {
        spotId: 'wasabi-experience', imageAssetId: 'wasabiExperience', badgeColor: '#E05B5B',
        badge: { ja: '体験', en: 'Experience', 'zh-TW': '體驗' },
        description: { ja: '体験・わさび田', en: 'Visit and experience a wasabi field', 'zh-TW': '山葵田參訪體驗' },
        note: { ja: '要予約・1日1組', en: 'Booking required · One group daily', 'zh-TW': '需預約・每日一組' },
      },
      {
        spotId: 'hikawa-valley', imageAssetId: 'valley', badgeColor: '#5E7239',
        badge: { ja: '自然', en: 'Nature', 'zh-TW': '自然' },
        description: {
          ja: '多摩川と日原川が合流する、奥多摩駅近くの自然豊かな渓谷',
          en: 'A lush valley near Okutama Station where the Tama and Nippara rivers meet',
          'zh-TW': '多摩川與日原川交會、鄰近奧多摩站的自然溪谷',
        },
      },
      {
        spotId: 'oku-hikawa-shrine', imageAssetId: 'okuHikawaShrine', badgeColor: '#5E7239',
        badge: { ja: '神社', en: 'Shrine', 'zh-TW': '神社' },
        description: {
          ja: '奥多摩駅近くに佇む、地域の歴史と自然を感じられる静かな神社',
          en: 'A quiet shrine near Okutama Station, alive with the area’s history and nature',
          'zh-TW': '靜靜坐落於奧多摩站附近，能感受地方歷史與自然的神社',
        },
      },
    ],
  },
  'demo-okutama-yamame': {
    nearby: [
      {
        spotId: 'akabeko', imageAssetId: 'akabekoYamame', badgeColor: '#E98A1C',
        badge: { ja: '飲食店', en: 'Restaurant', 'zh-TW': '餐廳' },
        description: {
          ja: '奥多摩やまめの刺身、味噌と山椒を合わせた焼き物',
          en: 'Okutama yamame sashimi and grilled fish with miso and sansho',
          'zh-TW': '奧多摩山女魚生魚片與味噌山椒烤魚',
        },
      },
      {
        spotId: 'yamashiroya', imageAssetId: 'yamashiroyaGoods', badgeColor: '#E98A1C',
        badge: { ja: 'ショップ・雑貨', en: 'Shop', 'zh-TW': '商店・雜貨' },
        description: {
          ja: 'わさび漬・生わさび・チーズわさびの老舗',
          en: 'A long-running shop for pickled, fresh, and cheese wasabi',
          'zh-TW': '販售山葵漬、生山葵與起司山葵的老店',
        },
      },
    ],
    nature: [
      {
        spotId: 'hikawa-valley', imageAssetId: 'valleyBridge', badgeColor: '#5E7239',
        badge: { ja: '自然', en: 'Nature', 'zh-TW': '自然' },
        description: {
          ja: '冷たく澄んだ流れと吊り橋を歩く渓流さんぽ',
          en: 'A streamside walk over clear, cold water and a suspension bridge',
          'zh-TW': '沿著冰涼清澈溪流與吊橋散步',
        },
      },
      {
        spotId: 'hikawa-valley', imageAssetId: 'riverPortrait', badgeColor: '#5E7239',
        badge: { ja: '自然', en: 'Nature', 'zh-TW': '自然' },
        description: {
          ja: 'やまめも、わさびも、はじまりは多摩川の水',
          en: 'Both yamame and wasabi begin with the Tama River’s water',
          'zh-TW': '山女魚與山葵，都源自多摩川的水',
        },
      },
    ],
  },
};

export const storyLocation: Record<string, Record<Locale, {
  region: string;
  station: string;
}>> = {
  'demo-okutama-wasabi': {
    ja: { region: '奥多摩・東京都 (東京西部)', station: '最寄駅：奥多摩駅、御岳駅' },
    en: { region: 'Okutama, Tokyo (Western Tokyo)', station: 'Nearest stations: Okutama and Mitake' },
    'zh-TW': { region: '東京都奧多摩（東京西部）', station: '最近車站：奧多摩站、御嶽站' },
  },
  'demo-okutama-yamame': {
    ja: { region: '奥多摩・東京都 (東京西部)', station: '最寄駅：奥多摩駅' },
    en: { region: 'Okutama, Tokyo (Western Tokyo)', station: 'Nearest station: Okutama' },
    'zh-TW': { region: '東京都奧多摩（東京西部）', station: '最近車站：奧多摩站' },
  },
};

export const chapterPoint: Record<string, Record<Locale, {
  title: string;
  body: string;
}>> = {
  'demo-okutama-wasabi': {
    ja: { title: '奥多摩わさびは、どんな味？', body: '奥多摩わさびは、強い辛味とキレ、豊かな風味が特徴。やさしくすりおろすと香りが引き立ち、3〜5分ほどが食べごろです。寿司や蕎麦はもちろん、ステーキやアボカドとも相性抜群です。' },
    en: { title: 'What does Okutama wasabi taste like?', body: 'It is known for vivid heat and a rich aroma. Gently grating it brings the fragrance forward.' },
    'zh-TW': { title: '奧多摩山葵是什麼味道？', body: '特色是鮮明辛味與豐富香氣。輕柔研磨能讓香氣更加突出。' },
  },
  'demo-okutama-yamame': {
    ja: { title: '奥多摩やまめは、どんな魚？', body: '通常より長く生き、大きく育つ希少な川魚。塩焼きだけでなく、刺身や切り身でも味わえます。' },
    en: { title: 'What kind of fish is Okutama yamame?', body: 'A rare river fish that grows larger over a longer life, served grilled, sliced, or as sashimi.' },
    'zh-TW': { title: '奧多摩山女魚是什麼魚？', body: '壽命較長、體型較大的珍稀河魚，可鹽烤、切片或作為生魚片品嚐。' },
  },
};
