/**
 * Serializable factual records currently rendered by the reference MVP.
 *
 * This module is shared by browser presentation code and the repository-only
 * verification-ledger adapter. Keep it free of React, assets, DOM state,
 * filesystem/process APIs, and generator code.
 */
import type { Locale } from '../../i18n';
import { PLACES } from '../../data/seed-places';
import type {
  Place,
  PlaceParkingInformation,
  PlacePhoneSourceStatement,
  PlaceSourceConflictStatement,
  PlaceVisitorInformation,
  PlaceWeekday,
} from '../../data/model';
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

function canonicalPlace(id: string): Place {
  const place = PLACES.find((candidate) => candidate.id === id);
  if (!place) throw new Error(`Missing canonical Place for presentation: ${id}`);
  return place;
}

function canonicalVisitorInformation(place: Place): PlaceVisitorInformation {
  if (!place.visitorInformation) {
    throw new Error(`Missing canonical visitor information for presentation: ${place.id}`);
  }
  return place.visitorInformation;
}

const yamashiroyaPlace = canonicalPlace('yamashiroya');
const yamashiroyaVisitor = canonicalVisitorInformation(yamashiroyaPlace);

const yamashiroyaName = localized(
  yamashiroyaPlace.nameJa,
  yamashiroyaPlace.nameEn,
  yamashiroyaPlace.nameJa,
);

const productCategoryCopy: Record<string, LocalizedText> = {
  'pickled-wasabi': localized('わさび漬', 'pickled wasabi', '山葵漬'),
  'fresh-wasabi': localized('生わさび', 'fresh wasabi', '新鮮山葵'),
  'okutama-yamame-sashimi': localized('奥多摩ヤマメの刺身', 'Okutama yamame sashimi', '奧多摩山女魚生魚片'),
  'okutama-yamame-charcoal-grill': localized('奥多摩ヤマメの炭火焼', 'charcoal-grilled Okutama yamame', '炭火烤奧多摩山女魚'),
  'handmade-konnyaku-sashimi': localized('手作りこんにゃくの刺身', 'handmade konnyaku sashimi', '手作蒟蒻刺身'),
  'wasabi-gelato': localized('わさびジェラート', 'wasabi gelato', '山葵義式冰淇淋'),
};

export function localizePlaceProductCategories(
  categoryIds: readonly string[],
): LocalizedText {
  const categories = categoryIds.map((categoryId) => {
    const copy = productCategoryCopy[categoryId];
    if (!copy) throw new Error(`Missing product-category presentation: ${categoryId}`);
    return copy;
  });
  return localized(
    categories.map((category) => category.ja).join('・'),
    categories.map((category) => category.en).join(' and '),
    categories.map((category) => category['zh-TW']).join('・'),
  );
}

export function localizePlaceClosureConflict(
  statements: readonly PlaceSourceConflictStatement[],
): LocalizedText {
  if (statements.length < 2) {
    throw new Error('Closure conflict presentation requires at least two source statements.');
  }
  const sourceValues = statements.map((statement) => statement.value);
  const localizedValues = sourceValues.map((value) => {
    const match = /^(\d+)月(\d+)日～(\d+)月(\d+)日$/.exec(value);
    if (!match) return localized(value, value, value);
    const [, startMonth, startDay, endMonth, endDay] = match;
    const englishMonths: Record<string, string> = {
      '1': 'Jan', '2': 'Feb', '3': 'Mar', '4': 'Apr',
      '5': 'May', '6': 'Jun', '7': 'Jul', '8': 'Aug',
      '9': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
    };
    return localized(
      value,
      `${englishMonths[startMonth]} ${startDay}–${englishMonths[endMonth]} ${endDay}`,
      `${startMonth} 月 ${startDay} 日～${endMonth} 月 ${endDay} 日`,
    );
  });
  return localized(
    `年末年始（公式情報の「${sourceValues.join('」／「')}」が不一致。最新情報を確認）`,
    `Year-end/New Year closure (official sources conflict: ${localizedValues.map((value) => value.en).join(' / ')}; check current information)`,
    `年末年初休業（官方資訊記載不一致：${localizedValues.map((value) => value['zh-TW']).join('／')}；請確認最新資訊）`,
  );
}

export function localizePlacePhoneConflict(
  statements: readonly PlacePhoneSourceStatement[],
): LocalizedText {
  const explicitPlaceRouting = statements.find(
    (statement) => statement.placeRoutingStatus === 'explicit',
  );
  const unresolvedRouting = statements.find(
    (statement) => statement.placeRoutingStatus === 'unresolved'
      && statement.number !== explicitPlaceRouting?.number,
  );
  if (!explicitPlaceRouting || !unresolvedRouting) {
    throw new Error('Phone conflict presentation requires explicit and unresolved routing statements.');
  }
  return localized(
    `${explicitPlaceRouting.number}（店舗予約窓口）／${unresolvedRouting.number}（関連事業者の予約・問合せ。店舗への取次は未確認）`,
    `${explicitPlaceRouting.number} (venue reservation desk) / ${unresolvedRouting.number} (related-business reservations & inquiries; venue routing unconfirmed)`,
    `${explicitPlaceRouting.number}（店家預約窗口）／${unresolvedRouting.number}（關聯業者預約與洽詢；轉接至店家尚未確認）`,
  );
}

const weekdayCopy: Record<PlaceWeekday, LocalizedText> = {
  monday: localized('月曜日', 'Monday', '週一'),
  tuesday: localized('火曜日', 'Tuesday', '週二'),
  wednesday: localized('水曜日', 'Wednesday', '週三'),
  thursday: localized('木曜日', 'Thursday', '週四'),
  friday: localized('金曜日', 'Friday', '週五'),
  saturday: localized('土曜日', 'Saturday', '週六'),
  sunday: localized('日曜日', 'Sunday', '週日'),
};

export function localizePlaceClosedDays(
  closedDays: readonly PlaceWeekday[],
): LocalizedText {
  const days = closedDays.map((day) => weekdayCopy[day]);
  return localized(
    days.map((day) => day.ja).join('・'),
    days.map((day) => day.en).join(', '),
    days.map((day) => day['zh-TW']).join('、'),
  );
}

export function localizePlaceParking(
  parking: PlaceParkingInformation,
): LocalizedText {
  if (!parking.available) {
    return localized(
      `駐車場なし${parking.nearbyPaidParking ? '（近隣コインパーキングあり）' : ''}`,
      `No on-site parking${parking.nearbyPaidParking ? ' (nearby paid parking is available)' : ''}`,
      `無店內停車場${parking.nearbyPaidParking ? '（附近有付費停車場）' : ''}`,
    );
  }
  const spaceCount = parking.spaces === undefined ? '' : `${parking.spaces}`;
  return localized(
    `駐車場あり${spaceCount ? `（${spaceCount}台${parking.largeVehicles ? '・大型車可' : ''}）` : ''}`,
    `On-site parking available${spaceCount ? ` (${spaceCount} spaces${parking.largeVehicles ? '; large vehicles accepted' : ''})` : ''}`,
    `設有店內停車場${spaceCount ? `（${spaceCount}個車位${parking.largeVehicles ? '・可停大型車' : ''}）` : ''}`,
  );
}

const yamashiroyaProducts = localizePlaceProductCategories(
  yamashiroyaVisitor.productCategories ?? [],
);

const yamashiroyaClosureConflict = localizePlaceClosureConflict(
  yamashiroyaVisitor.yearEndClosure?.statements ?? [],
);

const yamashiroyaLead = localized(
  `${yamashiroyaProducts.ja}を扱う直売店`,
  `A direct shop for ${yamashiroyaProducts.en}`,
  `販售${yamashiroyaProducts['zh-TW']}的直營店`,
);

const yamashiroyaStoryDescription = localized(
  `${yamashiroyaPlace.nameJa}の直売店。${yamashiroyaProducts.ja}を扱う`,
  `The ${yamashiroyaPlace.nameEn} shop carries ${yamashiroyaProducts.en.toLowerCase()}`,
  `${yamashiroyaPlace.nameJa}直營店，販售${yamashiroyaProducts['zh-TW']}`,
);

const akabekoPlace = canonicalPlace('akabeko');
const akabekoVisitor = canonicalVisitorInformation(akabekoPlace);
const akabekoPhoneConflict = localizePlacePhoneConflict(
  akabekoVisitor.phoneConflict?.statements ?? [],
);
const akabekoProducts = localizePlaceProductCategories(
  akabekoVisitor.productCategories ?? [],
);
const akabekoLunchHours = akabekoVisitor.mealHourSchedules?.find(
  (schedule) => schedule.id === 'lunch',
);
const akabekoDinnerHours = akabekoVisitor.mealHourSchedules?.find(
  (schedule) => schedule.id === 'dinner',
);
if (!akabekoLunchHours || !akabekoDinnerHours) {
  throw new Error('Missing canonical Akabeko meal hours.');
}
const akabekoHours = localized(
  `ランチ ${akabekoLunchHours.opens}〜L.O. ${akabekoLunchHours.lastOrder}／ディナー ${akabekoDinnerHours.opens}〜L.O. ${akabekoDinnerHours.lastOrder}`,
  `Lunch ${akabekoLunchHours.opens}–L.O. ${akabekoLunchHours.lastOrder} / Dinner ${akabekoDinnerHours.opens}–L.O. ${akabekoDinnerHours.lastOrder}`,
  `午餐 ${akabekoLunchHours.opens}–最後點餐 ${akabekoLunchHours.lastOrder}／晚餐 ${akabekoDinnerHours.opens}–最後點餐 ${akabekoDinnerHours.lastOrder}`,
);
const akabekoReservation = localized(
  '予約推奨（席数に限りがあり、混雑時は入店できない場合あり）',
  'Reservations recommended (seating is limited and the venue may be full)',
  '建議預約（座位有限，客滿時可能無法入店）',
);
const akabekoWasabiStoryDescription = localized(
  '奥多摩ヤマメ、手作りこんにゃく、わさびジェラートなどの公式掲載メニュー例',
  'Official menu examples include Okutama yamame, handmade konnyaku, and wasabi gelato',
  '官方菜單範例包含奧多摩山女魚、手作蒟蒻與山葵義式冰淇淋',
);
const akabekoYamameStoryDescription = localized(
  '公式掲載メニュー例の奥多摩ヤマメの刺身と炭火焼',
  'Official menu examples list Okutama yamame sashimi and charcoal-grilled yamame',
  '官方菜單範例刊載奧多摩山女魚生魚片與炭火烤山女魚',
);
const akabekoWasabiRouteDescription = localized(
  `昼食・L.O. ${akabekoLunchHours.lastOrder}（公式情報を確認）`,
  `Lunch · L.O. ${akabekoLunchHours.lastOrder} (check official information)`,
  `午餐・最後點餐 ${akabekoLunchHours.lastOrder}（請確認官方資訊）`,
);
const akabekoYamameRouteDescription = localized(
  '奥多摩ヤマメの昼食 60分',
  'Okutama yamame lunch · 60 min',
  '奧多摩山女魚午餐・60 分鐘',
);

const okutamaKitchenPlace = canonicalPlace('okutama-kitchen');
const okutamaKitchenVisitor = canonicalVisitorInformation(okutamaKitchenPlace);
const okutamaKitchenMenuListing = okutamaKitchenVisitor.menuListings?.find(
  (listing) => listing.id === 'special-soft-gelato',
);
if (!okutamaKitchenMenuListing) {
  throw new Error('Missing canonical special soft gelato listing: okutama-kitchen');
}

const okutamaKitchenName = localized(
  okutamaKitchenPlace.nameJa,
  okutamaKitchenPlace.nameEn,
  '手作便當與熟食專門店 奧多摩的廚房',
);

const okutamaKitchenClosedDays = localizePlaceClosedDays(
  okutamaKitchenVisitor.regularClosedDays ?? [],
);

if (!okutamaKitchenVisitor.parking) {
  throw new Error('Missing canonical parking information: okutama-kitchen');
}
const okutamaKitchenParking = localizePlaceParking(okutamaKitchenVisitor.parking);

const okutamaKitchenProductAvailability = localized(
  `${okutamaKitchenMenuListing.nameJa}（わさび味を含む・提供状況は要確認）`,
  'Special soft gelato (wasabi is a listed flavor; check current availability)',
  '特選霜淇淋（山葵為刊載口味之一；請確認當日供應狀況）',
);

const okutamaKitchenPriceAvailability = localized(
  `${okutamaKitchenMenuListing.nameJa}：わさび味を含む${okutamaKitchenMenuListing.flavorIds?.length ?? 0}種類／${okutamaKitchenMenuListing.listedPriceYen}円（サイト掲載価格・提供状況は要確認）`,
  `Special soft gelato: ${okutamaKitchenMenuListing.flavorIds?.length ?? 0} listed flavors including wasabi / ¥${okutamaKitchenMenuListing.listedPriceYen} (website-listed price; check current availability)`,
  `特選霜淇淋：刊載${okutamaKitchenMenuListing.flavorIds?.length ?? 0}種口味，包含山葵／${okutamaKitchenMenuListing.listedPriceYen}日圓（官網刊載價格；請確認當日供應狀況）`,
);

const okutamaKitchenStoryDescription = localized(
  `${okutamaKitchenPlace.nameJa}の公式メニューに${okutamaKitchenProductAvailability.ja}が掲載`,
  `${okutamaKitchenPlace.nameEn}'s official menu lists ${okutamaKitchenProductAvailability.en.toLowerCase()}`,
  `${okutamaKitchenPlace.nameJa}官方菜單刊載${okutamaKitchenProductAvailability['zh-TW']}`,
);

const portOkutamaPlace = canonicalPlace('port-okutama');
const portOkutamaVisitor = canonicalVisitorInformation(portOkutamaPlace);
const portOkutamaName = localized(
  portOkutamaPlace.nameJa,
  portOkutamaPlace.nameEn,
  portOkutamaPlace.nameJa,
);
const portOkutamaWeekdayHours = portOkutamaVisitor.shopHourSchedules?.find(
  (schedule) => schedule.id === 'weekday',
);
const portOkutamaWeekendHours = portOkutamaVisitor.shopHourSchedules?.find(
  (schedule) => schedule.id === 'weekend-holiday',
);
if (!portOkutamaWeekdayHours || !portOkutamaWeekendHours) {
  throw new Error('Missing canonical weekday/weekend hours: port-okutama');
}
if (!portOkutamaVisitor.serviceCategories?.includes('specialty-coffee')) {
  throw new Error('Missing canonical specialty-coffee service: port-okutama');
}

const portOkutamaHours = localized(
  `平日 ${portOkutamaWeekdayHours.opens}〜${portOkutamaWeekdayHours.closes}（L.O. ${portOkutamaWeekdayHours.lastOrder}）／土日祝 ${portOkutamaWeekendHours.opens}〜${portOkutamaWeekendHours.closes}（L.O. ${portOkutamaWeekendHours.lastOrder}）`,
  `Weekdays ${portOkutamaWeekdayHours.opens}–${portOkutamaWeekdayHours.closes} (L.O. ${portOkutamaWeekdayHours.lastOrder}) / Weekends & holidays ${portOkutamaWeekendHours.opens}–${portOkutamaWeekendHours.closes} (L.O. ${portOkutamaWeekendHours.lastOrder})`,
  `平日 ${portOkutamaWeekdayHours.opens}–${portOkutamaWeekdayHours.closes}（最後點餐 ${portOkutamaWeekdayHours.lastOrder}）／週末及國定假日 ${portOkutamaWeekendHours.opens}–${portOkutamaWeekendHours.closes}（最後點餐 ${portOkutamaWeekendHours.lastOrder}）`,
);

const portOkutamaServices = localized(
  '食事・スペシャルティコーヒー・クラフトビール・中古アウトドア用品・土産',
  'Food, specialty coffee, craft beer, used outdoor goods, and souvenirs',
  '餐飲、精品咖啡、精釀啤酒、二手戶外用品與伴手禮',
);

const portOkutamaRouteServices = localized(
  '食事・コーヒー・土産（営業内容は要確認）',
  'Food, coffee, and souvenirs (check current services)',
  '餐飲、咖啡與伴手禮（請確認目前服務）',
);

const portOkutamaCoffeeAvailability = localized(
  'スペシャルティコーヒー（提供状況は要確認）',
  'Specialty coffee (check current availability)',
  '精品咖啡（請確認當日供應狀況）',
);

const portOkutamaStoryDescription = localized(
  `奥多摩駅2階の複合ショップ。${portOkutamaRouteServices.ja}`,
  `A combined shop on the second floor of JR Okutama Station. ${portOkutamaRouteServices.en}`,
  `位於 JR 奧多摩站 2 樓的複合商店。${portOkutamaRouteServices['zh-TW']}`,
);

const editorialReferenceNotes: Record<Locale, string> = {
  ja: '掲載内容は参考情報で、未確認の場合があります。訪問前に各施設の公式情報をご確認ください。',
  en: 'This listing is reference information and may not be verified. Check the venue’s official information before visiting.',
  'zh-TW': '此處刊載的內容為參考資訊，可能尚未經確認。造訪前請以各場所的官方資訊為準。',
};

export interface HomeJourneyCardCopy {
  title: string;
  description: string;
}

/** Stable journey-keyed records rendered by Home; never identified by array position. */
export const homeJourneyCards: Record<string, Record<Locale, HomeJourneyCardCopy>> = {
  'demo-okutama-wasabi': {
    ja: { title: '東京わさび文化を巡る旅', description: '奥多摩・半日巡り／わさび食堂・氷川渓谷など' },
    en: { title: 'A journey through Tokyo wasabi culture', description: 'Okutama · Half day / Wasabi Shokudo, Hikawa Valley, and more' },
    'zh-TW': { title: '走訪東京山葵文化之旅', description: '奧多摩・半日／山葵食堂、冰川溪谷等' },
  },
  'demo-okutama-yamame': {
    ja: { title: '水が育てる、幻の川魚', description: '奥多摩やまめの食文化／炉ばた あかべこ・渓流さんぽ' },
    en: { title: 'A rare river fish raised by water', description: 'Okutama yamame / Robata Akabeko and a streamside walk' },
    'zh-TW': { title: '由水孕育的珍稀河魚', description: '奧多摩山女魚／爐端燒 AKABEKO、溪流散步' },
  },
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
  akabeko: spot('akabeko', 'akabeko', ['akabekoYamame', 'akabekoYamameDetail', 'wasabiGelato', 'okutamaKitchenDetail'], {
    ja: { name: akabekoPlace.nameJa, lead: '公式掲載の奥多摩ヤマメなどを味わう炉ばた料理店', description: `${akabekoPlace.nameJa}の公式情報に基づく参考情報です。` },
    en: { name: akabekoPlace.nameEn, lead: 'A hearth-grill restaurant whose official menu lists Okutama yamame', description: `Reference information based on ${akabekoPlace.nameEn}'s official site.` },
    'zh-TW': { name: '爐端燒 AKABEKO', lead: '官方菜單刊載奧多摩山女魚的爐端料理店', description: `依據${akabekoPlace.nameJa}官方資訊整理的參考內容。` },
  }),
  yamashiroya: spot('yamashiroya', 'yamashiroya', ['yamashiroyaGoods', 'yamashiroyaSign'], {
    ja: { name: yamashiroyaName.ja, lead: yamashiroyaLead.ja, description: `${yamashiroyaPlace.nameJa}の公式店舗案内に基づく参考情報です。` },
    en: { name: yamashiroyaName.en, lead: yamashiroyaLead.en, description: `Reference information based on ${yamashiroyaPlace.nameEn}’s official shop guide.` },
    'zh-TW': { name: yamashiroyaName['zh-TW'], lead: yamashiroyaLead['zh-TW'], description: `依據${yamashiroyaPlace.nameJa}官方店鋪資訊整理的參考內容。` },
  }),
  'wasabi-kitchen': spot('wasabi-kitchen', 'wasabiKitchen', ['station', 'wasabiGelato'], { ja: { name: 'わさび食堂', lead: '駅前で味わうわさびの一皿', description: 'わさびの味を試すための、参考スポットです。' }, en: { name: 'Wasabi Shokudo', lead: 'A wasabi dish near the station', description: 'A reference stop for trying a wasabi flavor.' }, 'zh-TW': { name: '山葵食堂', lead: '在車站前品嚐一道山葵料理', description: '嘗試山葵風味的參考景點。' } }),
  'okutama-kitchen': spot('okutama-kitchen', 'okutamaKitchen', ['wasabiGelato', 'okutamaKitchenDetail'], {
    ja: { name: okutamaKitchenName.ja, lead: `${okutamaKitchenProductAvailability.ja}を掲載する弁当・惣菜店`, description: `${okutamaKitchenPlace.nameJa}の公式情報に基づく参考情報です。` },
    en: { name: okutamaKitchenName.en, lead: 'A bento and deli shop with special soft gelato on its menu', description: `Reference information based on ${okutamaKitchenPlace.nameEn}'s official site.` },
    'zh-TW': { name: okutamaKitchenName['zh-TW'], lead: '官方菜單刊載特選霜淇淋的便當熟食店', description: `依據${okutamaKitchenPlace.nameJa}官方資訊整理的參考內容。` },
  }),
  'hikawa-valley': spot('hikawa-valley', 'valley', ['river', 'valleyBridge'], { ja: { name: '氷川渓谷', lead: '水と土地に触れる散策', description: '食文化を支える水辺の風景に出会う、参考スポットです。' }, en: { name: 'Hikawa Valley', lead: 'A walk that meets water and landscape', description: 'A reference stop for waterside scenery behind the food culture.' }, 'zh-TW': { name: '冰川溪谷', lead: '親近水與土地的散步', description: '遇見支撐飲食文化的水岸風景之參考景點。' } }),
  'port-okutama': spot('port-okutama', 'portCafe', ['port', 'portDetail'], {
    ja: { name: portOkutamaName.ja, lead: '奥多摩駅2階で食事・コーヒー・土産に立ち寄る', description: `${portOkutamaPlace.nameJa}の公式情報とJR東日本の所在地情報に基づく参考情報です。` },
    en: { name: portOkutamaName.en, lead: 'Food, coffee, and souvenirs on the second floor of Okutama Station', description: `Reference information based on ${portOkutamaPlace.nameEn}'s official site and JR East location information.` },
    'zh-TW': { name: portOkutamaName['zh-TW'], lead: '在奧多摩站2樓享用餐飲、咖啡並選購伴手禮', description: `依據${portOkutamaPlace.nameJa}官網與JR東日本所在地資訊整理的參考內容。` },
  }),
  'wasabi-experience': spot('wasabi-experience', 'wasabiExperience', ['river'], { ja: { name: 'わさび田体験', lead: 'わさび田の体験を知る', description: 'わさびの生産風景に触れるための、参考スポットです。' }, en: { name: 'Wasabi Experience', lead: 'Learn about a wasabi-field experience', description: 'A reference stop for meeting wasabi growing landscapes.' }, 'zh-TW': { name: '山葵田體驗', lead: '認識山葵田體驗', description: '親近山葵生產景觀的參考景點。' } }),
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
    { spotId: 'okutama-kitchen', walk: localized('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: okutamaKitchenProductAvailability },
    { spotId: 'hikawa-valley', walk: localized('徒歩 約 10 分', 'About 10 min on foot', '步行約 10 分鐘'), description: localized('川辺で涼む', 'Cool off beside the river', '在河畔納涼') },
    { spotId: 'oku-hikawa-shrine', walk: localized('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: localized('お参り！', 'Visit the shrine', '參拜神社！') },
    { spotId: 'port-okutama', walk: localized('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: portOkutamaRouteServices },
  ],
  'demo-okutama-wasabi:full-day': [
    { spotId: 'mitake-station', description: localized('JR青梅線・旅のスタート地点', 'JR Ome Line · Starting point', 'JR 青梅線・旅程起點') },
    { spotId: 'wasabi-experience', walk: localized('集合 8:30', 'Meet at 8:30', '8:30 集合'), description: localized('わさび田プライベートツアー\n・2〜2.5時間・1日1組', 'Private wasabi-field tour · 2–2.5 hours · One group daily', '山葵田私人導覽・2～2.5 小時・每日一組') },
    { spotId: 'okutama-station', walk: localized('御岳駅から電車', 'Train from Mitake Station', '從御嶽站搭電車'), description: localized('青梅線 約20分', 'About 20 min on the Ome Line', '青梅線約 20 分鐘') },
    { spotId: 'akabeko', walk: localized('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: akabekoWasabiRouteDescription },
    { spotId: 'yamashiroya', description: yamashiroyaProducts },
    { spotId: 'port-okutama', walk: localized('徒歩 約 5 分', 'About 5 min on foot', '步行約 5 分鐘'), description: portOkutamaCoffeeAvailability },
  ],
  'demo-okutama-yamame:half-day': [
    { spotId: 'okutama-station', description: localized('旅のスタート地点', 'Starting point', '旅程起點') },
    { spotId: 'okutama-tourism-office', walk: localized('徒歩 約 1 分', 'About 1 min on foot', '步行約 1 分鐘'), description: localized('情報収集 30分', 'Gather information · 30 min', '蒐集資訊・30 分鐘') },
    { spotId: 'hikawa-valley', walk: localized('徒歩 約 10 分', 'About 10 min on foot', '步行約 10 分鐘'), description: localized('渓流さんぽ 60分', 'Streamside walk · 60 min', '溪流散步・60 分鐘') },
    { spotId: 'akabeko', walk: localized('徒歩 約 15 分', 'About 15 min on foot', '步行約 15 分鐘'), description: akabekoYamameRouteDescription },
  ],
};

export interface RouteStats {
  time: string;
  distance: string;
  spots: string;
  station: string;
  minutes: string;
}

export const routeRegionGuidance: Record<Locale, string> = {
  ja: '奥多摩・東京都 (東京西部)',
  en: 'Okutama, Tokyo (Western Tokyo)',
  'zh-TW': '東京都奧多摩（東京西部）',
};

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
  tags: Array<{
    /** Stable presentation identity; never derived from locale, color, or array order. */
    tagId: string;
    color: string;
    label: LocalizedText;
  }>;
  description: LocalizedText;
  information: Array<{
    fieldId:
      | 'name'
      | 'address'
      | 'phone'
      | 'hours'
      | 'phone_hours'
      | 'access'
      | 'parking'
      | 'price_availability'
      | 'reservation'
      | 'service_availability'
      | 'closed_days'
      | 'official_current_url'
      | 'verification_note';
    icon: 'clock' | 'train' | 'information';
    label: LocalizedText;
    value: LocalizedText;
  }>;
  guide?: { title: LocalizedText; body: LocalizedText; action: LocalizedText };
  caution: LocalizedText[];
}

export const referenceSpotDetails: Partial<Record<string, ReferenceSpotDetail>> = {
  akabeko: {
    tags: [
      { tagId: 'robata-restaurant', color: '#8FAE5C', label: localized('炉ばた料理店', 'Hearth-grill restaurant', '爐端料理店') },
      { tagId: 'official-source', color: '#F0A24C', label: localized('公式情報参照', 'Official source', '參考官方資訊') },
      { tagId: 'source-conflict', color: '#E05B5B', label: localized('電話情報に不一致', 'Phone sources conflict', '電話資訊不一致') },
    ],
    description: localized(
      `${akabekoPlace.nameJa}と民話の宿 荒澤屋の公式情報に基づく参考情報です。公式情報には2つの電話番号が掲載され、用途の一部を確認中です。`,
      `Reference information based on official pages from ${akabekoPlace.nameEn} and Arasawaya. The official sources publish two phone numbers, and part of their routing remains unconfirmed.`,
      `依據${akabekoPlace.nameJa}與民話之宿荒澤屋官方資訊整理。官方資訊刊載兩個電話號碼，部分轉接用途仍在確認中。`,
    ),
    information: [
      {
        fieldId: 'name',
        icon: 'information',
        label: localized('店舗', 'Place', '店家'),
        value: localized(akabekoPlace.nameJa, akabekoPlace.nameEn, '爐端燒 AKABEKO'),
      },
      {
        fieldId: 'address',
        icon: 'information',
        label: localized('所在地', 'Address', '地址'),
        value: localized(
          akabekoPlace.address,
          '1446 Hikawa, Okutama, Nishitama, Tokyo 198-0212',
          '〒198-0212 東京都西多摩郡奧多摩町冰川 1446',
        ),
      },
      {
        fieldId: 'phone',
        icon: 'information',
        label: localized('公式掲載の電話', 'Phones published by official sources', '官方資訊刊載電話'),
        value: akabekoPhoneConflict,
      },
      {
        fieldId: 'hours',
        icon: 'clock',
        label: localized('営業時間', 'Hours', '營業時間'),
        value: akabekoHours,
      },
      {
        fieldId: 'closed_days',
        icon: 'clock',
        label: localized('定休日', 'Closures', '公休日'),
        value: localized(
          '不定休（公式カレンダー参照）',
          'Irregular closures (see the official calendar)',
          '不定期休息（請查看官方日曆）',
        ),
      },
      {
        fieldId: 'reservation',
        icon: 'information',
        label: localized('予約', 'Reservations', '預約'),
        value: akabekoReservation,
      },
      {
        fieldId: 'price_availability',
        icon: 'information',
        label: localized('公式掲載メニュー例', 'Official menu examples', '官方菜單範例'),
        value: localized(
          `${akabekoProducts.ja}（提供状況は要確認）`,
          `${akabekoProducts.en} (confirm availability)`,
          `${akabekoProducts['zh-TW']}（供應狀況需確認）`,
        ),
      },
      {
        fieldId: 'official_current_url',
        icon: 'information',
        label: localized('公式情報', 'Official source', '官方資訊'),
        value: localized(
          akabekoPlace.source.url ?? '',
          akabekoPlace.source.url ?? '',
          akabekoPlace.source.url ?? '',
        ),
      },
      {
        fieldId: 'verification_note',
        icon: 'information',
        label: localized('確認状況', 'Verification status', '確認狀態'),
        value: localized(
          '掲載内容は現在確認中です。電話番号・営業時間・休業・予約・メニュー提供状況は、訪問前に公式情報をご確認ください。',
          'This listing is still being confirmed. Check official information for phone routing, hours, closures, reservations, and menu availability before visiting.',
          '刊載內容仍在確認中。造訪前請以官方資訊確認電話轉接、營業時間、休息日、預約與菜單供應狀況。',
        ),
      },
    ],
    guide: {
      title: localized('公式情報', 'Official information', '官方資訊'),
      body: localized(
        '電話番号を含む最新情報は、訪問前に炉ばた あかべこの公式サイトでご確認ください。',
        `Check ${akabekoPlace.nameEn}'s official site for current details, including phone information, before visiting.`,
        '造訪前請查看爐端燒 AKABEKO 官方網站，確認包含電話資訊在內的最新內容。',
      ),
      action: localized('公式情報を確認する', 'Check official information', '查看官方資訊'),
    },
    caution: [
      localized(
        '・公式情報には2つの電話番号があります。050番号はあかべこ予約窓口（荒澤屋共通表記）、0428番号は荒澤屋の予約・問合せとして掲載され、あかべこへの取次は未確認です。',
        '• Official sources publish two phone numbers. The 050 number is the Akabeko reservation desk and is also labeled shared with Arasawaya; the 0428 number is published for Arasawaya reservations and inquiries, with Akabeko routing unconfirmed.',
        '・官方資訊刊載兩個電話號碼。050 號碼為 AKABEKO 預約窗口，並標示與荒澤屋共用；0428 號碼刊載為荒澤屋預約與洽詢，轉接至 AKABEKO 尚未確認。',
      ),
      localized(
        '・営業時間、休業、予約受付、メニューの提供状況は変更される場合があります。訪問前に公式情報をご確認ください。',
        '• Hours, closures, reservation availability, and menu availability can change. Check official information before visiting.',
        '・營業時間、休息日、預約受理與菜單供應狀況可能變更。造訪前請查看官方資訊。',
      ),
    ],
  },
  'okutama-tourism-office': {
    tags: [
      { tagId: 'visitor-information', color: '#8FAE5C', label: localized('観光案内', 'Visitor information', '觀光案內') },
      { tagId: 'reference-information', color: '#F0A24C', label: localized('参考情報', 'Reference information', '參考資訊') },
      { tagId: 'confirmation-pending', color: '#5D9BEF', label: localized('確認中', 'Confirmation pending', '確認中') },
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
  yamashiroya: {
    tags: [
      { tagId: 'wasabi-specialty-shop', color: '#8FAE5C', label: localized('わさび専門店', 'Wasabi specialty shop', '山葵專門店') },
      { tagId: 'official-source', color: '#F0A24C', label: localized('公式情報参照', 'Official source', '參考官方資訊') },
      { tagId: 'confirmation-pending', color: '#5D9BEF', label: localized('確認中', 'Confirmation pending', '確認中') },
    ],
    description: localized(
      `${yamashiroyaPlace.nameJa}の公式店舗案内に基づく参考情報です。${yamashiroyaProducts.ja}を扱う直売店です。`,
      `Reference information based on ${yamashiroyaPlace.nameEn}’s official shop guide. The direct shop carries ${yamashiroyaProducts.en.toLowerCase()}.`,
      `依據${yamashiroyaPlace.nameJa}官方店鋪資訊整理的參考內容。直營店販售${yamashiroyaProducts['zh-TW']}。`,
    ),
    information: [
      {
        fieldId: 'name',
        icon: 'information',
        label: localized('店舗', 'Place', '店鋪'),
        value: yamashiroyaName,
      },
      {
        fieldId: 'address',
        icon: 'information',
        label: localized('所在地', 'Address', '地址'),
        value: localized(yamashiroyaPlace.address, yamashiroyaPlace.address, yamashiroyaPlace.address),
      },
      {
        fieldId: 'phone',
        icon: 'information',
        label: localized('電話', 'Phone', '電話'),
        value: localized(yamashiroyaVisitor.phone ?? '', yamashiroyaVisitor.phone ?? '', yamashiroyaVisitor.phone ?? ''),
      },
      {
        fieldId: 'hours',
        icon: 'clock',
        label: localized('直売店', 'Shop hours', '直營店'),
        value: localized(
          `${Number(yamashiroyaVisitor.shopHours?.opens.slice(0, 2))}:00〜${yamashiroyaVisitor.shopHours?.closes}`,
          `${yamashiroyaVisitor.shopHours?.opens}–${yamashiroyaVisitor.shopHours?.closes}`,
          `${yamashiroyaVisitor.shopHours?.opens}–${yamashiroyaVisitor.shopHours?.closes}`,
        ),
      },
      {
        fieldId: 'phone_hours',
        icon: 'clock',
        label: localized('電話受付', 'Phone hours', '電話受理'),
        value: localized(
          `日・祝日を除く ${Number(yamashiroyaVisitor.phoneHours?.opens.slice(0, 2))}:00〜${yamashiroyaVisitor.phoneHours?.closes}`,
          `${yamashiroyaVisitor.phoneHours?.opens}–${yamashiroyaVisitor.phoneHours?.closes}, except Sundays and public holidays`,
          `${yamashiroyaVisitor.phoneHours?.opens}–${yamashiroyaVisitor.phoneHours?.closes}，週日及國定假日除外`,
        ),
      },
      {
        fieldId: 'access',
        icon: 'train',
        label: localized('アクセス', 'Access', '交通'),
        value: localized(
          `${yamashiroyaVisitor.access?.stationJa}より徒歩${yamashiroyaVisitor.access?.walkMinutes}分`,
          `${yamashiroyaVisitor.access?.walkMinutes} min on foot from JR Okutama Station`,
          `從 JR 奧多摩站步行${yamashiroyaVisitor.access?.walkMinutes}分鐘`,
        ),
      },
      {
        fieldId: 'parking',
        icon: 'information',
        label: localized('駐車場', 'Parking', '停車場'),
        value: localized(
          `あり（${yamashiroyaVisitor.parking?.spaces}台・大型車可）`,
          `${yamashiroyaVisitor.parking?.spaces} spaces; large vehicles accepted`,
          `有（${yamashiroyaVisitor.parking?.spaces}個車位・大型車可）`,
        ),
      },
      {
        fieldId: 'price_availability',
        icon: 'information',
        label: localized('取扱', 'Products', '販售商品'),
        value: yamashiroyaProducts,
      },
      {
        fieldId: 'closed_days',
        icon: 'clock',
        label: localized('休業', 'Closure', '休業'),
        value: yamashiroyaClosureConflict,
      },
      {
        fieldId: 'official_current_url',
        icon: 'information',
        label: localized('公式情報', 'Official source', '官方資訊'),
        value: localized(yamashiroyaPlace.source.url ?? '', yamashiroyaPlace.source.url ?? '', yamashiroyaPlace.source.url ?? ''),
      },
      {
        fieldId: 'verification_note',
        icon: 'information',
        label: localized('確認状況', 'Verification status', '確認狀態'),
        value: localized(
          '掲載内容は現在確認中です。営業時間・電話受付・アクセス・駐車場・休業日は、訪問前に公式情報をご確認ください。',
          'This listing is still being confirmed. Check current official information for hours, phone availability, access, parking, and closures before visiting.',
          '刊載內容仍在確認中。造訪前請以官方資訊確認營業時間、電話受理時間、交通、停車與休業日。',
        ),
      },
    ],
    guide: {
      title: localized('公式店舗案内', 'Official shop guide', '官方店鋪資訊'),
      body: localized(
        '掲載内容は現在確認中です。訪問前に山城屋の公式店舗案内で最新情報をご確認ください。',
        'This listing is still being confirmed. Check Yamashiroya’s official shop guide before visiting.',
        '刊載內容仍在確認中。造訪前請查看山城屋官方店鋪資訊。',
      ),
      action: localized('公式店舗案内を確認する', 'Check official shop guide', '查看官方店鋪資訊'),
    },
    caution: [
      localized(
        '・直売店営業時間、電話受付、アクセス、駐車場は変更される場合があります。訪問前に公式情報をご確認ください。',
        '• Shop hours, phone availability, access, and parking can change. Check official information before visiting.',
        '・直營店營業時間、電話受理時間、交通與停車資訊可能變更。造訪前請查看官方資訊。',
      ),
      localized(
        `・${yamashiroyaClosureConflict.ja}`,
        `• ${yamashiroyaClosureConflict.en}`,
        `・${yamashiroyaClosureConflict['zh-TW']}`,
      ),
    ],
  },
  'okutama-kitchen': {
    tags: [
      { tagId: 'bento-deli-shop', color: '#8FAE5C', label: localized('弁当・惣菜', 'Bento & deli', '便當・熟食') },
      { tagId: 'official-source', color: '#F0A24C', label: localized('公式情報参照', 'Official source', '參考官方資訊') },
      { tagId: 'confirmation-pending', color: '#5D9BEF', label: localized('確認中', 'Confirmation pending', '確認中') },
    ],
    description: localized(
      `${okutamaKitchenPlace.nameJa}の公式情報に基づく参考情報です。${okutamaKitchenProductAvailability.ja}が公式メニューに掲載されています。`,
      `Reference information based on ${okutamaKitchenPlace.nameEn}'s official site. Its official menu lists ${okutamaKitchenProductAvailability.en.toLowerCase()}.`,
      `依據${okutamaKitchenPlace.nameJa}官方資訊整理的參考內容。官方菜單刊載${okutamaKitchenProductAvailability['zh-TW']}。`,
    ),
    information: [
      {
        fieldId: 'name',
        icon: 'information',
        label: localized('店舗', 'Place', '店鋪'),
        value: okutamaKitchenName,
      },
      {
        fieldId: 'address',
        icon: 'information',
        label: localized('所在地', 'Address', '地址'),
        value: localized(okutamaKitchenPlace.address, okutamaKitchenPlace.address, okutamaKitchenPlace.address),
      },
      {
        fieldId: 'phone',
        icon: 'information',
        label: localized('電話', 'Phone', '電話'),
        value: localized(okutamaKitchenVisitor.phone ?? '', okutamaKitchenVisitor.phone ?? '', okutamaKitchenVisitor.phone ?? ''),
      },
      {
        fieldId: 'hours',
        icon: 'clock',
        label: localized('営業時間', 'Hours', '營業時間'),
        value: localized(
          `${Number(okutamaKitchenVisitor.shopHours?.opens.slice(0, 2))}:00〜${okutamaKitchenVisitor.shopHours?.closes}（L.O. ${okutamaKitchenVisitor.shopHours?.lastOrder}）`,
          `${okutamaKitchenVisitor.shopHours?.opens}–${okutamaKitchenVisitor.shopHours?.closes} (L.O. ${okutamaKitchenVisitor.shopHours?.lastOrder})`,
          `${okutamaKitchenVisitor.shopHours?.opens}–${okutamaKitchenVisitor.shopHours?.closes}（最後點餐 ${okutamaKitchenVisitor.shopHours?.lastOrder}）`,
        ),
      },
      {
        fieldId: 'access',
        icon: 'train',
        label: localized('アクセス', 'Access', '交通'),
        value: localized(
          `${okutamaKitchenVisitor.access?.stationJa}より徒歩${okutamaKitchenVisitor.access?.walkMinutes}分`,
          `${okutamaKitchenVisitor.access?.walkMinutes} min on foot from JR Ome Line Okutama Station`,
          `從 JR 青梅線奧多摩站步行${okutamaKitchenVisitor.access?.walkMinutes}分鐘`,
        ),
      },
      {
        fieldId: 'closed_days',
        icon: 'clock',
        label: localized('定休日', 'Closed', '公休日'),
        value: okutamaKitchenClosedDays,
      },
      {
        fieldId: 'parking',
        icon: 'information',
        label: localized('駐車場', 'Parking', '停車場'),
        value: okutamaKitchenParking,
      },
      {
        fieldId: 'price_availability',
        icon: 'information',
        label: localized('メニュー', 'Menu listing', '菜單刊載'),
        value: okutamaKitchenPriceAvailability,
      },
      {
        fieldId: 'official_current_url',
        icon: 'information',
        label: localized('公式情報', 'Official source', '官方資訊'),
        value: localized(okutamaKitchenPlace.source.url ?? '', okutamaKitchenPlace.source.url ?? '', okutamaKitchenPlace.source.url ?? ''),
      },
      {
        fieldId: 'verification_note',
        icon: 'information',
        label: localized('確認状況', 'Verification status', '確認狀態'),
        value: localized(
          '掲載内容は現在確認中です。営業時間・定休日・メニュー・価格・提供状況は、訪問前に公式情報をご確認ください。',
          'This listing is still being confirmed. Check official information for current hours, closures, menu, prices, and availability before visiting.',
          '刊載內容仍在確認中。造訪前請以官方資訊確認營業時間、公休日、菜單、價格與供應狀況。',
        ),
      },
    ],
    guide: {
      title: localized('公式情報', 'Official information', '官方資訊'),
      body: localized(
        '掲載内容は現在確認中です。訪問前に奥多摩の台所の公式サイトで最新情報をご確認ください。',
        `This listing is still being confirmed. Check ${okutamaKitchenPlace.nameEn}'s official site before visiting.`,
        '刊載內容仍在確認中。造訪前請查看奧多摩的廚房官方網站。',
      ),
      action: localized('公式情報を確認する', 'Check official information', '查看官方資訊'),
    },
    caution: [localized(
      '・営業時間、定休日、駐車場、価格、わさび味の提供状況は変更される場合があります。訪問前に公式情報をご確認ください。',
      '• Hours, closures, parking, prices, and wasabi-flavor availability can change. Check official information before visiting.',
      '・營業時間、公休日、停車、價格與山葵口味供應狀況可能變更。造訪前請查看官方資訊。',
    )],
  },
  'port-okutama': {
    tags: [
      { tagId: 'station-complex-shop', color: '#8FAE5C', label: localized('駅上複合ショップ', 'Station complex shop', '車站複合商店') },
      { tagId: 'official-source', color: '#F0A24C', label: localized('公式情報参照', 'Official source', '參考官方資訊') },
      { tagId: 'confirmation-pending', color: '#5D9BEF', label: localized('確認中', 'Confirmation pending', '確認中') },
    ],
    description: localized(
      `${portOkutamaPlace.nameJa}の公式情報とJR東日本の所在地情報に基づく参考情報です。奥多摩駅2階で${portOkutamaServices.ja}を扱う複合ショップです。`,
      `Reference information based on ${portOkutamaPlace.nameEn}'s official site and JR East location information. It is a combined shop on the second floor of JR Okutama Station offering ${portOkutamaServices.en.toLowerCase()}.`,
      `依據${portOkutamaPlace.nameJa}官網與JR東日本所在地資訊整理的參考內容。這是位於JR奧多摩站2樓的複合商店，提供${portOkutamaServices['zh-TW']}。`,
    ),
    information: [
      {
        fieldId: 'name',
        icon: 'information',
        label: localized('施設', 'Place', '設施'),
        value: portOkutamaName,
      },
      {
        fieldId: 'address',
        icon: 'train',
        label: localized('所在地', 'Address', '地址'),
        value: localized(
          portOkutamaPlace.address,
          '210 Hikawa, Okutama, Nishitama, Tokyo (2F, JR Okutama Station)',
          '東京都西多摩郡奧多摩町冰川210（JR奧多摩站2樓）',
        ),
      },
      {
        fieldId: 'phone',
        icon: 'information',
        label: localized('電話', 'Phone', '電話'),
        value: localized(portOkutamaVisitor.phone ?? '', portOkutamaVisitor.phone ?? '', portOkutamaVisitor.phone ?? ''),
      },
      {
        fieldId: 'hours',
        icon: 'clock',
        label: localized('営業時間', 'Hours', '營業時間'),
        value: portOkutamaHours,
      },
      {
        fieldId: 'closed_days',
        icon: 'clock',
        label: localized('休業', 'Closures', '休業'),
        value: localized(
          '無休（不定休あり・最新情報を確認）',
          'Open daily; irregular closures may occur (check current information)',
          '全年無固定休（可能臨時休業，請確認最新資訊）',
        ),
      },
      {
        fieldId: 'service_availability',
        icon: 'information',
        label: localized('取扱・サービス', 'Services', '服務項目'),
        value: portOkutamaServices,
      },
      {
        fieldId: 'official_current_url',
        icon: 'information',
        label: localized('公式情報', 'Official source', '官方資訊'),
        value: localized(portOkutamaPlace.source.url ?? '', portOkutamaPlace.source.url ?? '', portOkutamaPlace.source.url ?? ''),
      },
      {
        fieldId: 'verification_note',
        icon: 'information',
        label: localized('確認状況', 'Verification status', '確認狀態'),
        value: localized(
          '掲載内容は現在確認中です。営業時間・休業・メニュー・商品の取扱・提供状況は、訪問前に公式情報をご確認ください。',
          'This listing is still being confirmed. Check official information for current hours, closures, menus, products, and service availability before visiting.',
          '刊載內容仍在確認中。造訪前請以官方資訊確認營業時間、休業、菜單、商品與服務供應狀況。',
        ),
      },
    ],
    guide: {
      title: localized('公式情報', 'Official information', '官方資訊'),
      body: localized(
        '掲載内容は現在確認中です。訪問前にPORT OKUTAMAの公式サイトで最新情報をご確認ください。',
        `This listing is still being confirmed. Check ${portOkutamaPlace.nameEn}'s official site before visiting.`,
        '刊載內容仍在確認中。造訪前請查看PORT OKUTAMA官方網站。',
      ),
      action: localized('公式情報を確認する', 'Check official information', '查看官方資訊'),
    },
    caution: [localized(
      '・営業時間、休業、メニュー、商品の取扱・提供状況は変更される場合があります。訪問前に公式情報をご確認ください。',
      '• Hours, closures, menus, products, and service availability can change. Check official information before visiting.',
      '・營業時間、休業、菜單、商品與服務供應狀況可能變更。造訪前請查看官方資訊。',
    )],
  },
};

export interface StorySpotReference {
  /** Stable card identity; never derived from localized copy, asset, or array order. */
  referenceId: string;
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
        referenceId: 'akabeko', spotId: 'akabeko', imageAssetId: 'akabeko', badgeColor: '#E98A1C',
        badge: { ja: '飲食店', en: 'Restaurant', 'zh-TW': '餐廳' },
        description: akabekoWasabiStoryDescription,
      },
      {
        referenceId: 'yamashiroya', spotId: 'yamashiroya', imageAssetId: 'yamashiroya', badgeColor: '#E98A1C',
        badge: { ja: 'ショップ・雑貨', en: 'Shop', 'zh-TW': '商店・雜貨' },
        description: yamashiroyaStoryDescription,
      },
      {
        referenceId: 'wasabi-kitchen', spotId: 'wasabi-kitchen', imageAssetId: 'wasabiKitchen', badgeColor: '#E98A1C',
        badge: { ja: '飲食店', en: 'Restaurant', 'zh-TW': '餐廳' },
        description: {
          ja: '飲食・キッチンカー／土日中心',
          en: 'Food and a mobile kitchen, mainly on weekends',
          'zh-TW': '餐飲與行動餐車／主要於週末營業',
        },
      },
      {
        referenceId: 'okutama-kitchen', spotId: 'okutama-kitchen', imageAssetId: 'okutamaKitchen', badgeColor: '#E98A1C',
        badge: { ja: '弁当・惣菜', en: 'Bento & deli', 'zh-TW': '便當・熟食' },
        description: okutamaKitchenStoryDescription,
      },
      {
        referenceId: 'port-okutama', spotId: 'port-okutama', imageAssetId: 'portCafe', badgeColor: '#E98A1C',
        badge: { ja: 'カフェ・ショップ', en: 'Café & shop', 'zh-TW': '咖啡・商店' },
        description: portOkutamaStoryDescription,
      },
    ],
    nature: [
      {
        referenceId: 'wasabi-experience', spotId: 'wasabi-experience', imageAssetId: 'wasabiExperience', badgeColor: '#E05B5B',
        badge: { ja: '体験', en: 'Experience', 'zh-TW': '體驗' },
        description: { ja: '体験・わさび田', en: 'Visit and experience a wasabi field', 'zh-TW': '山葵田參訪體驗' },
        note: { ja: '要予約・1日1組', en: 'Booking required · One group daily', 'zh-TW': '需預約・每日一組' },
      },
      {
        referenceId: 'hikawa-valley', spotId: 'hikawa-valley', imageAssetId: 'valley', badgeColor: '#5E7239',
        badge: { ja: '自然', en: 'Nature', 'zh-TW': '自然' },
        description: {
          ja: '多摩川と日原川が合流する、奥多摩駅近くの自然豊かな渓谷',
          en: 'A lush valley near Okutama Station where the Tama and Nippara rivers meet',
          'zh-TW': '多摩川與日原川交會、鄰近奧多摩站的自然溪谷',
        },
      },
      {
        referenceId: 'oku-hikawa-shrine', spotId: 'oku-hikawa-shrine', imageAssetId: 'okuHikawaShrine', badgeColor: '#5E7239',
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
        referenceId: 'akabeko', spotId: 'akabeko', imageAssetId: 'akabekoYamame', badgeColor: '#E98A1C',
        badge: { ja: '飲食店', en: 'Restaurant', 'zh-TW': '餐廳' },
        description: akabekoYamameStoryDescription,
      },
      {
        referenceId: 'yamashiroya', spotId: 'yamashiroya', imageAssetId: 'yamashiroyaGoods', badgeColor: '#E98A1C',
        badge: { ja: 'ショップ・雑貨', en: 'Shop', 'zh-TW': '商店・雜貨' },
        description: yamashiroyaStoryDescription,
      },
    ],
    nature: [
      {
        referenceId: 'hikawa-valley-bridge', spotId: 'hikawa-valley', imageAssetId: 'valleyBridge', badgeColor: '#5E7239',
        badge: { ja: '自然', en: 'Nature', 'zh-TW': '自然' },
        description: {
          ja: '冷たく澄んだ流れと吊り橋を歩く渓流さんぽ',
          en: 'A streamside walk over clear, cold water and a suspension bridge',
          'zh-TW': '沿著冰涼清澈溪流與吊橋散步',
        },
      },
      {
        referenceId: 'hikawa-valley-river-portrait', spotId: 'hikawa-valley', imageAssetId: 'riverPortrait', badgeColor: '#5E7239',
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
