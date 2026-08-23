import type { Locale } from '../../i18n';

import akabekoNew from '../../assets/netlify-parity/akabeko_new.jpg';
import akabekoYamame from '../../assets/netlify-parity/akabeko_yamame.jpg';
import akabekoYamameDetail from '../../assets/netlify-parity/akabeko_yamame2.jpg';
import tourismOffice from '../../assets/netlify-parity/annaijo.jpg';
import appleTouchIcon from '../../assets/netlify-parity/apple-touch-icon.png';
import yamameResult from '../../assets/netlify-parity/crop_yamame_clean.png';
import okutamaKitchen from '../../assets/netlify-parity/daidokoro_new.jpg';
import okutamaKitchenDetail from '../../assets/netlify-parity/daidokoro2.jpg';
import station from '../../assets/netlify-parity/eki.jpg';
import explorationBackground from '../../assets/netlify-parity/exploration-background.png';
import wasabiExperience from '../../assets/netlify-parity/experience_new.jpg';
import favicon from '../../assets/netlify-parity/favicon.png';
import figmaRouteMap from '../../assets/netlify-parity/figma-route-map.png';
import wasabiGelato from '../../assets/netlify-parity/gelato.jpg';
import hanamaru from '../../assets/netlify-parity/hanamaru.png';
import valleyBridge from '../../assets/netlify-parity/hashi.jpg';
import homeHero from '../../assets/netlify-parity/home_hero.jpg';
import forkIllustration from '../../assets/netlify-parity/ill_fork.png';
import buyIllustration from '../../assets/netlify-parity/ill_kau.png';
import learnIllustration from '../../assets/netlify-parity/ill_manabu.png';
import originIllustration from '../../assets/netlify-parity/ill_sanchi.png';
import makerIllustration from '../../assets/netlify-parity/ill_shokunin.png';
import eatIllustration from '../../assets/netlify-parity/ill_taberu.png';
import makeIllustration from '../../assets/netlify-parity/ill_tsukuru.png';
import riverDetail from '../../assets/netlify-parity/kawa.jpg';
import riverPortrait from '../../assets/netlify-parity/kawa_new.jpg';
import valley from '../../assets/netlify-parity/keikoku.jpg';
import logoFace from '../../assets/netlify-parity/logo_face_t.png';
import logoFull from '../../assets/netlify-parity/logo_full_t.png';
import routeMap from '../../assets/netlify-parity/map.jpg';
import okuHikawaShrine from '../../assets/netlify-parity/oku-hikawa-shrine.png';
import tourismOfficeExterior from '../../assets/netlify-parity/okutama-tourism-office-exterior.png';
import tourismOfficeRoute from '../../assets/netlify-parity/okutama-tourism-office-route.png';
import openGraphImage from '../../assets/netlify-parity/og.png';
import portCafe from '../../assets/netlify-parity/port_cafe.jpg';
import port from '../../assets/netlify-parity/port.jpg';
import portDetail from '../../assets/netlify-parity/port2.jpg';
import wasabiKitchen from '../../assets/netlify-parity/shokudo_new.jpg';
import wasabiHero from '../../assets/netlify-parity/wasabi_photo.jpg';
import wasapy from '../../assets/netlify-parity/wasapy.jpg';
import welcomeCta from '../../assets/netlify-parity/welcome_cta.png';
import yamashiroyaGoods from '../../assets/netlify-parity/yamashiroya_goods.jpg';
import yamashiroya from '../../assets/netlify-parity/yamashiroya_new.jpg';
import yamashiroyaSign from '../../assets/netlify-parity/yamashiroya_sign.jpg';

export interface ReferenceCopy {
  app: {
    name: string;
    tagline: string;
    localeLabel: string;
  };
  actions: {
    start: string;
    beginProfile: string;
    skipProfile: string;
    submitName: string;
    addOther: string;
    select: string;
    send: string;
    next: string;
    previous: string;
    startExploration: string;
    openStory: string;
    createRoute: string;
    viewRoute: string;
    openSpot: string;
    saveRoute: string;
    removeSavedRoute: string;
    viewSavedRoute: string;
    shareRoute: string;
    openMogu: string;
    openFavorites: string;
    openMy: string;
    browse: string;
    recommendJourney: string;
    selfBrowse: string;
    viewAll: string;
    repeatSearch: string;
    guide: string;
    back: string;
    changeLanguage: string;
  };
  nav: {
    home: string;
    discover: string;
    mogu: string;
    favorites: string;
    my: string;
  };
  splash: {
    eyebrow: string;
    title: string;
    body: string;
    imageAlt: string;
  };
  profile: {
    title: string;
    summaryTitle: string;
    welcome: string;
    welcomeBody: string;
    startPrompt: string;
    skip: string;
    beginReply: string;
    namePrompt: string;
    nicknamePlaceholder: string;
    nameError: string;
    nameReply: { prefix: string; suffix: string };
    greetingTemplate: string;
    otherPlaceholder: string;
    add: string;
    summaryThanks: string;
    summaryRegistered: string;
    summaryUpdated: string;
    summaryDisclaimer: string;
    noRestrictions: string;
    finalPrompt: string;
    safetyNote: string;
    questions: {
      allergy: { progress: string; prompt: string; none: string; options: { egg: string; dairy: string; wheat: string; crustacean: string; nuts: string; fish: string; none: string; other: string } };
      diet: { progress: string; prompt: string; none: string; options: { vegetarian: string; vegan: string; pescatarian: string; none: string } };
      religion: { progress: string; prompt: string; none: string; options: { pork: string; beef: string; halal: string; alcohol: string; none: string; other: string } };
      dislike: { progress: string; prompt: string; none: string; other: string; options: { raw: string; spicy: string; fermented: string; bitter: string; shellfish: string; none: string; other: string } };
    };
  };
  home: {
    greeting: string;
    greetingTemplate: string;
    title: string;
    body: string;
    previousJourneys: string;
  };
  exploration: {
    title: string;
    progress: string;
    experience: string;
    departure: string;
    travelTime: string;
    duration: string;
    tasteTheme: string;
    chooseArea: string;
    departureSearchPlaceholder: string;
    departureSuggestions: string[];
    noDepartureResults: string;
    experienceCards: Record<'eat' | 'make' | 'buy' | 'meetMaker' | 'visitOrigin' | 'learn', { label: string; subtitle: string }>;
    movementOptions: string[];
    durationOptions: string[];
    tasteOptions: string[];
    themeOptions: string[];
    tasteHeading: string;
    themeHeading: string;
    multiSelect: string;
    selectionCount: string;
  };
  result: {
    title: string;
    matchLabel: string;
    intro: string;
  };
  story: {
    chapterLabel: string;
    pointLabel: string;
    nearbyTitle: string;
    natureTitle: string;
    generatingRoute: string;
  };
  route: {
    title: string;
    halfDay: string;
    fullDay: string;
    mapAlt: string;
    saved: string;
  };
  spot: {
    information: string;
    caution: string;
    guide: string;
    practicalInfo: string;
  };
  mogu: {
    title: string;
    recentTitle: string;
    empty: string;
  };
  favorites: {
    title: string;
    empty: string;
  };
  my: {
    title: string;
    savedRoutes: string;
    foodProfile: string;
    badges: string;
  };
}

export interface JourneyPresentation {
  id: string;
  regionId: string;
  foodCultureId: string;
  storyId: string;
  routeId: string;
  matchPercent: number;
  imageAssetId: ReferenceAssetId;
  heroAssetId: ReferenceAssetId;
  facts: PresentationFacts;
  copy: Record<Locale, {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    storyTitle: string;
    intro: string[];
  }>;
  chapters: Record<Locale, Array<{ number: string; title: string; body: string }>>;
  routeVariants: Array<{
    id: 'half-day' | 'full-day';
    durationMinutes: number;
    imageAssetId: ReferenceAssetId;
    steps: Array<{ spotId: string; imageAssetId: ReferenceAssetId }>;
    facts: PresentationFacts;
  }>;
}

export type PresentationLocalizedText = Record<Locale, string>;

export interface PresentationSource {
  label: PresentationLocalizedText;
  url: string;
  retrievedAt: '2026-08-24';
  verificationStatus: 'needs_confirmation' | 'demo';
}

export interface PresentationFacts {
  disclosure: PresentationLocalizedText;
  sources: readonly PresentationSource[];
}

export interface SpotPresentation {
  id: string;
  regionId: string;
  foodCultureId: string;
  imageAssetId: ReferenceAssetId;
  thumbnailAssetIds: ReferenceAssetId[];
  facts: PresentationFacts;
  copy: Record<Locale, {
    name: string;
    lead: string;
    tags: string[];
    description: string;
    practicalInfo: Array<{ label: string; value: string }>;
    caution: string[];
    guide?: { title: string; body: string; action: string };
  }>;
}

/** Source-relative file paths used by tests to verify the presentation manifest. */
export const referenceAssetFiles = {
  welcomeCta: '../../assets/netlify-parity/welcome_cta.png',
  homeHero: '../../assets/netlify-parity/home_hero.jpg',
  logoFull: '../../assets/netlify-parity/logo_full_t.png',
  logoFace: '../../assets/netlify-parity/logo_face_t.png',
  forkIllustration: '../../assets/netlify-parity/ill_fork.png',
  eatIllustration: '../../assets/netlify-parity/ill_taberu.png',
  makeIllustration: '../../assets/netlify-parity/ill_tsukuru.png',
  buyIllustration: '../../assets/netlify-parity/ill_kau.png',
  makerIllustration: '../../assets/netlify-parity/ill_shokunin.png',
  originIllustration: '../../assets/netlify-parity/ill_sanchi.png',
  learnIllustration: '../../assets/netlify-parity/ill_manabu.png',
  explorationBackground: '../../assets/netlify-parity/exploration-background.png',
  wasabiHero: '../../assets/netlify-parity/wasabi_photo.jpg',
  yamameResult: '../../assets/netlify-parity/crop_yamame_clean.png',
  routeMap: '../../assets/netlify-parity/map.jpg',
  figmaRouteMap: '../../assets/netlify-parity/figma-route-map.png',
  akabeko: '../../assets/netlify-parity/akabeko_new.jpg',
  akabekoYamame: '../../assets/netlify-parity/akabeko_yamame.jpg',
  akabekoYamameDetail: '../../assets/netlify-parity/akabeko_yamame2.jpg',
  yamashiroya: '../../assets/netlify-parity/yamashiroya_new.jpg',
  yamashiroyaGoods: '../../assets/netlify-parity/yamashiroya_goods.jpg',
  yamashiroyaSign: '../../assets/netlify-parity/yamashiroya_sign.jpg',
  wasabiExperience: '../../assets/netlify-parity/experience_new.jpg',
  valley: '../../assets/netlify-parity/keikoku.jpg',
  valleyBridge: '../../assets/netlify-parity/hashi.jpg',
  river: '../../assets/netlify-parity/kawa.jpg',
  riverPortrait: '../../assets/netlify-parity/kawa_new.jpg',
  station: '../../assets/netlify-parity/eki.jpg',
  tourismOffice: '../../assets/netlify-parity/annaijo.jpg',
  tourismOfficeExterior: '../../assets/netlify-parity/okutama-tourism-office-exterior.png',
  tourismOfficeRoute: '../../assets/netlify-parity/okutama-tourism-office-route.png',
  okuHikawaShrine: '../../assets/netlify-parity/oku-hikawa-shrine.png',
  wasabiKitchen: '../../assets/netlify-parity/shokudo_new.jpg',
  okutamaKitchen: '../../assets/netlify-parity/daidokoro_new.jpg',
  okutamaKitchenDetail: '../../assets/netlify-parity/daidokoro2.jpg',
  wasabiGelato: '../../assets/netlify-parity/gelato.jpg',
  portCafe: '../../assets/netlify-parity/port_cafe.jpg',
  port: '../../assets/netlify-parity/port.jpg',
  portDetail: '../../assets/netlify-parity/port2.jpg',
  wasapy: '../../assets/netlify-parity/wasapy.jpg',
  hanamaru: '../../assets/netlify-parity/hanamaru.png',
  favicon: '../../assets/netlify-parity/favicon.png',
  appleTouchIcon: '../../assets/netlify-parity/apple-touch-icon.png',
  openGraphImage: '../../assets/netlify-parity/og.png',
} as const;

export type ReferenceAssetId = keyof typeof referenceAssetFiles;

/** Vite-resolved public URLs for the same locally bundled manifest. */
export const referenceAssets: Record<ReferenceAssetId, string> = {
  welcomeCta,
  homeHero,
  logoFull,
  logoFace,
  forkIllustration,
  eatIllustration,
  makeIllustration,
  buyIllustration,
  makerIllustration,
  originIllustration,
  learnIllustration,
  explorationBackground,
  wasabiHero,
  yamameResult,
  routeMap,
  figmaRouteMap,
  akabeko: akabekoNew,
  akabekoYamame,
  akabekoYamameDetail,
  yamashiroya,
  yamashiroyaGoods,
  yamashiroyaSign,
  wasabiExperience,
  valley,
  valleyBridge,
  river: riverDetail,
  riverPortrait,
  station,
  tourismOffice,
  tourismOfficeExterior,
  tourismOfficeRoute,
  okuHikawaShrine,
  wasabiKitchen,
  okutamaKitchen,
  okutamaKitchenDetail,
  wasabiGelato,
  portCafe,
  port,
  portDetail,
  wasapy,
  hanamaru,
  favicon,
  appleTouchIcon,
  openGraphImage,
};

const copies: Record<Locale, ReferenceCopy> = {
  ja: {
    app: { name: 'TOKYO MOGU MOGU', tagline: '東京のローカルな食文化を体験しよう。', localeLabel: '言語' },
    actions: { start: 'はじめる！', beginProfile: 'はじめる！', skipProfile: '登録なし、自分で見てみる', submitName: '送信', addOther: '追加', select: '選ぶ', send: '送信', next: '次へ　⟶', previous: '⟵　戻る', startExploration: 'Let’s Go!　⟶', openStory: 'この物語を読む', createRoute: 'この食文化の観光ルートを作成する', viewRoute: 'モデルルートを見る', openSpot: 'スポットを見る', saveRoute: 'マイルートに保存', removeSavedRoute: '保存を取り消す', viewSavedRoute: 'マイルートを見る', shareRoute: 'ルートをシェア', openMogu: 'MOGUを見る', openFavorites: 'お気に入りを見る', openMy: 'マイページを見る', browse: '自由にさがす', recommendJourney: '自分に合った旅をおすすめしてもらう！', selfBrowse: '自分で旅を探す', viewAll: 'すべて見る', repeatSearch: 'もう一度食旅を見つけよう', guide: 'ガイドを見る', back: '戻る', changeLanguage: '言語を変更' },
    nav: { home: '食旅を見つけ', discover: 'さがす', mogu: 'モグモグる', favorites: 'お気に入り', my: 'マイ' },
    splash: { eyebrow: '東京のローカルな食文化を', title: 'もっと、おいしく。', body: '食べることから、地域の物語に出会う旅へ。', imageAlt: '東京のローカルな食文化を体験する TOKYO MOGU MOGU' },
    profile: { title: 'Food Profile', summaryTitle: 'あなたのFood Profile：', welcome: 'MOGU MOGUへようこそ！😊', welcomeBody: 'MOGU MOGUへようこそ！😊<br>あなたにぴったりの東京の食文化や体験を見つけるために、まずはあなたの「食」のことを少しだけ教えてください。', startPrompt: 'あなたにぴったりの東京の食文化や体験を見つけるために、まずはあなたの「食」のことを少しだけ教えてください。', skip: '登録なし、自分で見てみる', beginReply: 'はい！はじめましょう！', namePrompt: 'まず、なんてお呼びすればいいですか？', nicknamePlaceholder: 'ニックネームを入力', nameError: 'ニックネームを入力してください。', nameReply: { prefix: '私は', suffix: 'です😊' }, greetingTemplate: '{name}さん、<br>よろしくお願いします！', otherPlaceholder: '自由に入力してください', add: '追加', summaryThanks: 'ありがとうございます！🌿', summaryRegistered: '登録', summaryUpdated: '更新', summaryDisclaimer: 'この情報は、あなたに合ったおすすめを提案するためにのみ使用されます。', noRestrictions: '・特別な制限はありません', finalPrompt: 'では、今回はどんな食旅にしましょう？', safetyNote: '食の好み・制限はおすすめの参考です。安全を保証するものではありません。', questions: { allergy: { progress: '1/4', prompt: 'まず、食物アレルギーはありますか？(複数選択) (1/4)', none: 'アレルギーはありません', options: { egg: '🥚 卵', dairy: '🥛 乳製品', wheat: '🌾 小麦', crustacean: '🦐 甲殻類', nuts: '🥜 ナッツ', fish: '🐟 魚', none: 'アレルギーはありません', other: '✏️ その他' } }, diet: { progress: '2/4', prompt: '普段の食事で、当てはまるものはありますか？ (2/4)', none: '特になし', options: { vegetarian: '🥗 ベジタリアン', vegan: '🌱 ヴィーガン', pescatarian: '🐟 ペスカタリアン', none: '特になし' } }, religion: { progress: '3/4', prompt: '宗教上の理由などで、避けている食べものはありますか？(複数選択) (3/4)', none: '特になし', options: { pork: '🐖 豚肉', beef: '🐄 牛肉', halal: '☪️ ハラール対応が必要', alcohol: '🍷 アルコール', none: '特になし', other: '✏️ その他' } }, dislike: { progress: '4/4', prompt: '苦手な食材や味はありましたら、教えてください！(複数選択) (4/4)', none: '特になし', other: '✏️ その他', options: { raw: '🐟 生もの', spicy: '🌶️ 辛いもの', fermented: '🫘 発酵食品', bitter: '😖 苦いもの', shellfish: '🐚 貝類', none: '特になし', other: '✏️ その他' } } } },
    home: { greeting: 'こんにちは！', greetingTemplate: 'こんにちは！<span class="nm">{name}</span>さん<br>あなただけの食旅を見つけよう!', title: 'あなただけの食旅を見つけよう!', body: '気分や時間に合わせて、東京の食文化をたどる旅を見つけよう。', previousJourneys: '私の食旅（過去の旅）' },
    exploration: { title: '食旅を見つけ', progress: '全5問', experience: '今回は、どんな食体験をしてみたいですか？', departure: 'どこから出発しますか？', travelTime: '片道どのくらいまでなら移動できそうですか？', duration: 'どのくらいの時間で楽しみたいですか？', tasteTheme: '今日は、どんな味とモチーフを楽しみたいですか？', chooseArea: 'エリアを検索', departureSearchPlaceholder: 'エリア、場所、駅を入力', departureSuggestions: ['東京駅（東京都　千代田区）', '新宿駅（東京都　新宿区）', '渋谷駅（東京都　渋谷区）', '立川駅（東京都　立川市）', '青梅駅（東京都　青梅市）', '奥多摩駅（東京都　西多摩郡）'], noDepartureResults: '見つかりませんでした', experienceCards: { eat: { label: '食べる', subtitle: '地元の料理を味わう' }, make: { label: '作る', subtitle: '地元の料理を味わう' }, buy: { label: '買う', subtitle: '食材やお土産を買う' }, meetMaker: { label: '職人に会う', subtitle: '職人や生産者を訪ねる' }, visitOrigin: { label: '産地を訪ねる', subtitle: '農園や産地を訪ねる' }, learn: { label: '食文化を学ぶ', subtitle: '食の歴史や文化を知る' } }, movementOptions: ['30分以内', '1時間以内', '1時間30分以内', '2時間以内', '時間は気にしない'], durationOptions: ['半日', '1日', 'まだ決めていない'], tasteOptions: ['濃厚な味', 'やさしい味', '甘いもの', '香ばしいもの', '辛いもの', '発酵の味', 'さっぱりした味', '素材の味を楽しみたい', 'おまかせ'], themeOptions: ['伝統', '飲食歴史', '地域の日常', 'ものづくり', '自然', '季節・旬', '農業・生産地', '地元の人との交流', 'こだわりがない'], tasteHeading: '1.好きな味は？', themeHeading: '2.気になるテーマは？', multiSelect: '（複数選択）', selectionCount: '{count}/2' },
    result: { title: 'あなたに合う食の旅を見つけました！', matchLabel: 'マッチ度', intro: '結果:2件' },
    story: { chapterLabel: 'ストーリー', pointLabel: 'MOGUMOGU ポイント！', nearbyTitle: '周辺観光スポット', natureTitle: '自然と散策', generatingRoute: 'あなたにぴったりの\n観光ルートを生成中！' },
    route: { title: 'モデルルート', halfDay: '半日', fullDay: '一日', mapAlt: 'ルートマップ', saved: '保存済み' },
    spot: { information: 'スポット情報', caution: '訪問前のご注意', guide: 'ガイド・体験', practicalInfo: '基本情報' },
    mogu: { title: 'モグモグる', recentTitle: '最近のおすすめ', empty: 'まだおすすめの記録はありません。' },
    favorites: { title: 'お気に入り', empty: '保存したスポットはまだありません。' },
    my: { title: 'マイページ', savedRoutes: '保存した旅程', foodProfile: 'フードプロフィール', badges: 'バッジ' },
  },
  en: {
    app: { name: 'TOKYO MOGU MOGU', tagline: 'Taste Tokyo’s local food culture.', localeLabel: 'Language' },
    actions: { start: 'Start!', beginProfile: 'Start!', skipProfile: 'Browse without a profile', submitName: 'Send', addOther: 'Add', select: 'Choose', send: 'Send', next: 'Next →', previous: '← Back', startExploration: 'Let’s Go! →', openStory: 'Read this story', createRoute: 'Create this route', viewRoute: 'View model route', openSpot: 'View spot', saveRoute: 'Save to My Routes', removeSavedRoute: 'Remove saved route', viewSavedRoute: 'View My Routes', shareRoute: 'Share route', openMogu: 'Open MOGU', openFavorites: 'View favorites', openMy: 'Open My page', browse: 'Browse freely', recommendJourney: 'Recommend a journey for me!', selfBrowse: 'Find a journey myself', viewAll: 'View all', repeatSearch: 'Find another food journey', guide: 'View guide', back: 'Back', changeLanguage: 'Change language' },
    nav: { home: 'Home', discover: 'Discover', mogu: 'MOGU', favorites: 'Favorites', my: 'My' },
    splash: { eyebrow: 'Tokyo’s local food culture,', title: 'made more delicious.', body: 'Start with a taste, then meet the story of a place.', imageAlt: 'TOKYO MOGU MOGU: experience Tokyo’s local food culture' },
    profile: { title: 'Food Profile', summaryTitle: 'Your Food Profile:', welcome: 'Welcome to MOGU MOGU! 😊', welcomeBody: 'Welcome to MOGU MOGU! 😊<br>To find Tokyo food culture and experiences that suit you, please tell us a little about how you eat.', startPrompt: 'To find Tokyo food culture and experiences that suit you, please tell us a little about how you eat.', skip: 'Browse without a profile', beginReply: 'Yes! Let’s begin!', namePrompt: 'First, what should we call you?', nicknamePlaceholder: 'Enter a nickname', nameError: 'Please enter a nickname.', nameReply: { prefix: 'I’m ', suffix: ' 😊' }, greetingTemplate: '{name},<br>nice to meet you!', otherPlaceholder: 'Type your answer', add: 'Add', summaryThanks: 'Thank you! 🌿', summaryRegistered: 'saved', summaryUpdated: 'updated', summaryDisclaimer: 'This information is used only to suggest journeys that suit you.', noRestrictions: '• No particular restrictions', finalPrompt: 'What kind of food journey would you like this time?', safetyNote: 'Food preferences and restrictions guide recommendations only; they are not safety guarantees.', questions: { allergy: { progress: '1/4', prompt: 'First, do you have any food allergies? (Select all that apply) (1/4)', none: 'No food allergies', options: { egg: '🥚 Egg', dairy: '🥛 Dairy', wheat: '🌾 Wheat', crustacean: '🦐 Crustaceans', nuts: '🥜 Nuts', fish: '🐟 Fish', none: 'No food allergies', other: '✏️ Other' } }, diet: { progress: '2/4', prompt: 'Do any of these describe your usual diet? (2/4)', none: 'None', options: { vegetarian: '🥗 Vegetarian', vegan: '🌱 Vegan', pescatarian: '🐟 Pescatarian', none: 'None' } }, religion: { progress: '3/4', prompt: 'Are there foods you avoid for religious or other reasons? (Select all that apply) (3/4)', none: 'None', options: { pork: '🐖 Pork', beef: '🐄 Beef', halal: '☪️ Halal options needed', alcohol: '🍷 Alcohol', none: 'None', other: '✏️ Other' } }, dislike: { progress: '4/4', prompt: 'Please tell us about ingredients or flavors you dislike. (Select all that apply) (4/4)', none: 'None', other: '✏️ Other', options: { raw: '🐟 Raw food', spicy: '🌶️ Spicy food', fermented: '🫘 Fermented food', bitter: '😖 Bitter flavors', shellfish: '🐚 Shellfish', none: 'None', other: '✏️ Other' } } } },
    home: { greeting: 'Hello!', greetingTemplate: 'Hello! <span class="nm">{name}</span><br>Find a food journey made for you!', title: 'Find a food journey made for you!', body: 'Find a journey through Tokyo food culture that fits your mood and time.', previousJourneys: 'My food journeys (past journeys)' },
    exploration: { title: 'Find a food journey', progress: '5 questions', experience: 'What kind of food experience would you like this time?', departure: 'Where are you leaving from?', travelTime: 'How long could you travel one way?', duration: 'How much time would you like to spend?', tasteTheme: 'What flavors and themes would you like today?', chooseArea: 'Search an area', departureSearchPlaceholder: 'Enter an area, place, or station', departureSuggestions: ['Tokyo Station (Chiyoda)', 'Shinjuku Station (Shinjuku)', 'Shibuya Station (Shibuya)', 'Tachikawa Station (Tachikawa)', 'Ome Station (Ome)', 'Okutama Station (Okutama)'], noDepartureResults: 'No matches found', experienceCards: { eat: { label: 'Eat', subtitle: 'Taste local cooking' }, make: { label: 'Make', subtitle: 'Make a local dish' }, buy: { label: 'Shop', subtitle: 'Buy ingredients or gifts' }, meetMaker: { label: 'Meet makers', subtitle: 'Visit makers and producers' }, visitOrigin: { label: 'Visit the source', subtitle: 'Visit farms and origins' }, learn: { label: 'Learn food culture', subtitle: 'Discover food history and culture' } }, movementOptions: ['Within 30 minutes', 'Within 1 hour', 'Within 1.5 hours', 'Within 2 hours', 'Travel time is flexible'], durationOptions: ['Half day', 'Full day', 'Not decided yet'], tasteOptions: ['Rich flavors', 'Gentle flavors', 'Sweets', 'Toasty flavors', 'Spicy food', 'Fermented flavors', 'Refreshing flavors', 'Enjoy the ingredient itself', 'Surprise me'], themeOptions: ['Tradition', 'Food history', 'Local everyday life', 'Making things', 'Nature', 'Seasonality', 'Farming and production', 'Meeting local people', 'No preference'], tasteHeading: '1. What flavors do you like?', themeHeading: '2. What themes interest you?', multiSelect: '(Select up to two)', selectionCount: '{count}/2' },
    result: { title: 'We found food journeys that suit you!', matchLabel: 'Match', intro: '2 results' },
    story: { chapterLabel: 'Story', pointLabel: 'MOGUMOGU point!', nearbyTitle: 'Taste nearby', natureTitle: 'Meet nature', generatingRoute: 'Creating your route…' },
    route: { title: 'Model route', halfDay: 'Half day', fullDay: 'Full day', mapAlt: 'Route map', saved: 'Saved' },
    spot: { information: 'Spot information', caution: 'Before you visit', guide: 'Guide & experience', practicalInfo: 'Practical information' },
    mogu: { title: 'MOGU', recentTitle: 'Recent recommendations', empty: 'No recommendations yet.' },
    favorites: { title: 'Favorites', empty: 'No saved spots yet.' },
    my: { title: 'My', savedRoutes: 'Saved routes', foodProfile: 'Food Profile', badges: 'Badges' },
  },
  'zh-TW': {
    app: { name: 'TOKYO MOGU MOGU', tagline: '品嚐東京在地飲食文化。', localeLabel: '語言' },
    actions: { start: '開始！', beginProfile: '開始！', skipProfile: '不建立檔案，自己看看', submitName: '送出', addOther: '新增', select: '選擇', send: '送出', next: '下一步 →', previous: '← 返回', startExploration: 'Let’s Go! →', openStory: '閱讀這段故事', createRoute: '建立這條路線', viewRoute: '查看示範路線', openSpot: '查看景點', saveRoute: '儲存到我的行程', removeSavedRoute: '取消儲存', viewSavedRoute: '查看我的行程', shareRoute: '分享路線', openMogu: '開啟 MOGU', openFavorites: '查看收藏', openMy: '開啟我的頁面', browse: '自由探索', recommendJourney: '推薦適合我的旅程！', selfBrowse: '自己尋找旅程', viewAll: '查看全部', repeatSearch: '再找一次美食之旅', guide: '查看導覽', back: '返回', changeLanguage: '變更語言' },
    nav: { home: '首頁', discover: '探索', mogu: 'MOGU', favorites: '收藏', my: '我的' },
    splash: { eyebrow: '東京的在地飲食文化，', title: '更好吃地認識它。', body: '從一口美味開始，遇見地方的故事。', imageAlt: 'TOKYO MOGU MOGU：體驗東京在地飲食文化' },
    profile: { title: '飲食檔案', summaryTitle: '你的飲食檔案：', welcome: '歡迎來到 MOGU MOGU！😊', welcomeBody: '歡迎來到 MOGU MOGU！😊<br>為了找出最適合你的東京飲食文化與體驗，先告訴我們一些你的飲食習慣吧。', startPrompt: '為了找出最適合你的東京飲食文化與體驗，先告訴我們一些你的飲食習慣吧。', skip: '不建立檔案，自己看看', beginReply: '好的！開始吧！', namePrompt: '首先，我們該怎麼稱呼你？', nicknamePlaceholder: '輸入暱稱', nameError: '請輸入暱稱。', nameReply: { prefix: '我是 ', suffix: ' 😊' }, greetingTemplate: '{name}，<br>很高興認識你！', otherPlaceholder: '自由輸入', add: '新增', summaryThanks: '謝謝你！🌿', summaryRegistered: '已建立', summaryUpdated: '已更新', summaryDisclaimer: '這些資訊只用於推薦適合你的旅程。', noRestrictions: '・沒有特別限制', finalPrompt: '那麼，這次想展開什麼樣的美食之旅呢？', safetyNote: '飲食偏好與限制只用於推薦，並非安全保證。', questions: { allergy: { progress: '1/4', prompt: '首先，你有食物過敏嗎？（可複選）(1/4)', none: '沒有食物過敏', options: { egg: '🥚 蛋', dairy: '🥛 乳製品', wheat: '🌾 小麥', crustacean: '🦐 甲殼類', nuts: '🥜 堅果', fish: '🐟 魚', none: '沒有食物過敏', other: '✏️ 其他' } }, diet: { progress: '2/4', prompt: '以下哪些符合你平常的飲食習慣？(2/4)', none: '沒有', options: { vegetarian: '🥗 素食', vegan: '🌱 純素', pescatarian: '🐟 魚素', none: '沒有' } }, religion: { progress: '3/4', prompt: '你是否因宗教或其他原因避開某些食物？（可複選）(3/4)', none: '沒有', options: { pork: '🐖 豬肉', beef: '🐄 牛肉', halal: '☪️ 需要清真選項', alcohol: '🍷 酒精', none: '沒有', other: '✏️ 其他' } }, dislike: { progress: '4/4', prompt: '請告訴我們你不喜歡的食材或味道。（可複選）(4/4)', none: '沒有', other: '✏️ 其他', options: { raw: '🐟 生食', spicy: '🌶️ 辣味', fermented: '🫘 發酵食品', bitter: '😖 苦味', shellfish: '🐚 貝類', none: '沒有', other: '✏️ 其他' } } } },
    home: { greeting: '你好！', greetingTemplate: '你好！<span class="nm">{name}</span><br>尋找專屬於你的美食之旅！', title: '尋找專屬於你的美食之旅！', body: '依照你的心情與時間，尋找一段東京飲食文化之旅。', previousJourneys: '我的美食之旅（過去的旅程）' },
    exploration: { title: '尋找美食之旅', progress: '共 5 題', experience: '這次想體驗什麼樣的飲食活動？', departure: '你從哪裡出發？', travelTime: '單程大約可以移動多久？', duration: '想花多少時間享受這趟旅程？', tasteTheme: '今天想享受哪些味道與主題？', chooseArea: '搜尋區域', departureSearchPlaceholder: '輸入區域、地點或車站', departureSuggestions: ['東京站（千代田區）', '新宿站（新宿區）', '澀谷站（澀谷區）', '立川站（立川市）', '青梅站（青梅市）', '奧多摩站（奧多摩町）'], noDepartureResults: '找不到結果', experienceCards: { eat: { label: '品嚐', subtitle: '享用在地料理' }, make: { label: '製作', subtitle: '親手做在地料理' }, buy: { label: '購買', subtitle: '購買食材或伴手禮' }, meetMaker: { label: '拜訪職人', subtitle: '認識職人與生產者' }, visitOrigin: { label: '探訪產地', subtitle: '前往農園與產地' }, learn: { label: '認識飲食文化', subtitle: '了解飲食歷史與文化' } }, movementOptions: ['30 分鐘內', '1 小時內', '1.5 小時內', '2 小時內', '不在意交通時間'], durationOptions: ['半日', '一日', '還沒決定'], tasteOptions: ['濃郁風味', '溫和風味', '甜點', '焦香風味', '辣味', '發酵風味', '清爽風味', '想品味食材原味', '交給你推薦'], themeOptions: ['傳統', '飲食歷史', '地方日常', '手作工藝', '自然', '季節與當令', '農業與生產地', '與在地人交流', '沒有偏好'], tasteHeading: '1. 喜歡什麼味道？', themeHeading: '2. 對哪些主題感興趣？', multiSelect: '（最多可複選兩項）', selectionCount: '{count}/2' },
    result: { title: '我們找到適合你的美食之旅了！', matchLabel: '契合度', intro: '結果：2 筆' },
    story: { chapterLabel: '故事', pointLabel: 'MOGUMOGU 重點！', nearbyTitle: '在附近品嚐', natureTitle: '親近自然', generatingRoute: '正在建立你的行程…' },
    route: { title: '示範路線', halfDay: '半日', fullDay: '一日', mapAlt: '路線地圖', saved: '已儲存' },
    spot: { information: '景點資訊', caution: '造訪前注意事項', guide: '導覽與體驗', practicalInfo: '實用資訊' },
    mogu: { title: 'MOGU', recentTitle: '最近推薦', empty: '目前還沒有推薦紀錄。' },
    favorites: { title: '收藏', empty: '目前還沒有儲存的景點。' },
    my: { title: '我的', savedRoutes: '已儲存的行程', foodProfile: '飲食檔案', badges: '徽章' },
  },
};

export function referenceCopy(locale: Locale): ReferenceCopy {
  return copies[locale];
}

const presentationText = (ja: string, en: string, zhTW: string): PresentationLocalizedText => ({
  ja,
  en,
  'zh-TW': zhTW,
});

const presentationSource = (
  label: PresentationLocalizedText,
  url: string,
): PresentationSource => ({
  label,
  url,
  retrievedAt: '2026-08-24',
  verificationStatus: 'needs_confirmation',
});

export const presentationSources = {
  okutamaTourismAssociation: presentationSource(
    presentationText('奥多摩観光協会', 'Okutama Tourism Association', '奧多摩觀光協會'),
    'https://www.okutama.gr.jp/site/about/',
  ),
  okutamaTown: presentationSource(
    presentationText('奥多摩町', 'Okutama Town', '奧多摩町'),
    'https://www.town.okutama.tokyo.jp/1/kankosangyoka/shisetsuosagasu/2/1108.html',
  ),
  okutamaTownProfile: presentationSource(
    presentationText('奥多摩町 町勢紹介', 'Okutama Town profile', '奧多摩町概況'),
    'https://www.town.okutama.tokyo.jp/gyosei/8/chochonoheya/1827.html',
  ),
  okutamaEnvironmentPlan: presentationSource(
    presentationText('奥多摩町 環境基本計画', 'Okutama Town environmental plan', '奧多摩町環境基本計畫'),
    'https://www.town.okutama.tokyo.jp/material/files/group/9/2024kankyokeikaku.pdf',
  ),
  tokyoRegionalWasabi: presentationSource(
    presentationText('東京都 奥多摩わさび', 'Tokyo regional resource: Okutama wasabi', '東京都地方資源：奧多摩山葵'),
    'https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_107.html',
  ),
  tokyoMokuWasabi: presentationSource(
    presentationText('東京都 奥多摩わさび田再生', 'Tokyo Moku-Navi: restoring wasabi fields', '東京都木材導覽：修復山葵田'),
    'https://tokyomokunavi.metro.tokyo.lg.jp/activities/activities03/',
  ),
  tokyoWasabiAbout: presentationSource(
    presentationText('TOKYO WASABI 私たちについて', 'About TOKYO WASABI', 'TOKYO WASABI 團隊介紹'),
    'https://tokyowasabi.com/about-us/',
  ),
  tokyoWasabiGuide: presentationSource(
    presentationText('TOKYO WASABI わさびガイド', 'TOKYO WASABI guide', 'TOKYO WASABI 山葵指南'),
    'https://tokyowasabi.com/about-wasabi-en/',
  ),
  wasabiExperience: presentationSource(
    presentationText('TOKYO WASABI わさび体験', 'TOKYO WASABI Experience', 'TOKYO WASABI 山葵體驗'),
    'https://tokyowasabi.com/wasabi-experience/',
  ),
  wasabiFoodTruck: presentationSource(
    presentationText('TOKYO WASABI わさび食堂', 'TOKYO WASABI Food Truck', 'TOKYO WASABI 山葵餐車'),
    'https://tokyowasabi.com/foodtruck/',
  ),
  wasabiFoodTruckSchedule: presentationSource(
    presentationText('TOKYO WASABI 2026年8月出店予定', 'TOKYO WASABI August 2026 schedule', 'TOKYO WASABI 2026 年 8 月行程'),
    'https://tokyowasabi.com/information/2751/260728/',
  ),
  yamashiroya: presentationSource(
    presentationText('山城屋 店舗案内', 'Yamashiroya shop information', '山城屋店舖資訊'),
    'https://www.yamasiroya.co.jp/shop.html',
  ),
  jrEastOkutamaTimetable: presentationSource(
    presentationText('JR東日本 奥多摩駅時刻表', 'JR East Okutama Station timetable', 'JR 東日本奧多摩站時刻表'),
    'https://timetables.jreast.co.jp/timetable/list0368.html',
  ),
  tokyoRegionalYamame: presentationSource(
    presentationText('東京都 奥多摩やまめ', 'Tokyo regional resource: Okutama Yamame', '東京都地方資源：奧多摩山女魚'),
    'https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_36.html',
  ),
  okutamaFishFarmingCenter: presentationSource(
    presentationText('奥多摩さかな養殖センター', 'Okutama Fish Farming Center', '奧多摩魚類養殖中心'),
    'https://www.tokyo-aff.or.jp/site/aboutus/1141.html',
  ),
  okutamaYamameNamingReport: presentationSource(
    presentationText('東京都水産試験場 奥多摩やまめ普及報告', 'Tokyo fisheries report: naming Okutama Yamame', '東京都水產試驗場：奧多摩山女魚命名報告'),
    'https://www.ifarc.metro.tokyo.lg.jp/archive/resources/content/3355/20130904-170755.pdf',
  ),
  okutamaYamameBiologyReport: presentationSource(
    presentationText('東京都水産試験場 全雌三倍体ヤマメ研究', 'Tokyo fisheries report: all-female triploid yamame', '東京都水產試驗場：全雌三倍體山女魚研究'),
    'https://www.ifarc.metro.tokyo.lg.jp/archive/resources/content/3355/20130904-170001.pdf',
  ),
  okutamaTownYamame: presentationSource(
    presentationText('奥多摩町 奥多摩やまめ', 'Okutama Town: Okutama Yamame', '奧多摩町：奧多摩山女魚'),
    'https://www.town.okutama.tokyo.jp/gyosei/7/sangyoshinko/norinsuisangyo/2/1736.html',
  ),
} satisfies Record<string, PresentationSource>;

const neutralDemoDisclosure = presentationText(
  'デモ用に編集した参考情報です。訪問前に各施設の公式情報をご確認ください。',
  'Demo editorial reference information. Verify current venue details with official sources before travel.',
  '此為示範用途的編輯參考資訊；造訪前請向各場所官方來源確認最新資料。',
);

const routeEstimateDisclosure = presentationText(
  'デモ用のモデル推定です。所要時間・距離・乗換・営業状況は、交通機関と各運営者の最新情報をご確認ください。',
  'Demo/model estimates. Check current transit, operator schedules, and venue availability before travel.',
  '此為示範／模型估算。造訪前請向交通機構與各營運者確認最新時間、轉乘與營業狀況。',
);

const tourismOfficeDisclosure = presentationText(
  '公式情報を2026-08-24に取得しました。営業時間・連絡先・アクセス・現在のガイドや体験は、訪問前に再確認してください。',
  'Official information retrieved 2026-08-24. Recheck hours, contact details, access, and current guide or experience options before travel.',
  '官方資訊擷取於 2026-08-24。造訪前請重新確認營業時間、聯絡方式、交通與最新導覽／體驗選項。',
);

const storyEditorialDisclosure = presentationText(
  '2026年8月24日に取得した公式情報をもとに編集したデモ記事です。未確認の人物・数値・因果関係は掲載していません。最新情報は各公式サイトをご確認ください。',
  'Demo editorial story based on official sources retrieved 24 Aug 2026. Unverified biographies, figures, and causal claims are not presented as facts.',
  '本示範編輯故事依據 2026 年 8 月 24 日取得的官方資料整理；未確認的人物經歷、數字與因果關係不作為事實呈現。',
);

const presentationFacts = (
  disclosure: PresentationLocalizedText,
  sources: readonly PresentationSource[] = [],
): PresentationFacts => ({ disclosure, sources });

const demoPresentationFacts = presentationFacts(neutralDemoDisclosure);
const tourismOfficeFacts = presentationFacts(tourismOfficeDisclosure, [
  presentationSources.okutamaTourismAssociation,
  presentationSources.okutamaTown,
]);

const routeFacts = {
  wasabiHalfDay: presentationFacts(routeEstimateDisclosure, [
    presentationSources.okutamaTourismAssociation,
    presentationSources.okutamaTown,
    presentationSources.wasabiFoodTruck,
    presentationSources.wasabiFoodTruckSchedule,
    presentationSources.jrEastOkutamaTimetable,
  ]),
  wasabiFullDay: presentationFacts(routeEstimateDisclosure, [
    presentationSources.wasabiExperience,
    presentationSources.yamashiroya,
    presentationSources.jrEastOkutamaTimetable,
  ]),
  yamameHalfDay: presentationFacts(routeEstimateDisclosure, [
    presentationSources.okutamaTourismAssociation,
    presentationSources.okutamaTown,
    presentationSources.jrEastOkutamaTimetable,
  ]),
};

const storyFacts = {
  wasabi: presentationFacts(storyEditorialDisclosure, [
    presentationSources.okutamaTownProfile,
    presentationSources.okutamaEnvironmentPlan,
    presentationSources.tokyoRegionalWasabi,
    presentationSources.tokyoMokuWasabi,
    presentationSources.tokyoWasabiAbout,
    presentationSources.tokyoWasabiGuide,
  ]),
  yamame: presentationFacts(storyEditorialDisclosure, [
    presentationSources.tokyoRegionalYamame,
    presentationSources.okutamaFishFarmingCenter,
    presentationSources.okutamaYamameNamingReport,
    presentationSources.okutamaYamameBiologyReport,
    presentationSources.okutamaTownYamame,
  ]),
};

export const demoJourneys: JourneyPresentation[] = [
  {
    id: 'demo-okutama-wasabi', regionId: 'okutama', foodCultureId: 'wasabi-okutama', storyId: 'wasabi-okutama', routeId: 'okutama-wasabi-journey', matchPercent: 96, imageAssetId: 'wasabiHero', heroAssetId: 'wasabiHero', facts: storyFacts.wasabi,
    copy: {
      ja: { title: '水がつなぐ、江戸から続く辛味', subtitle: '奥多摩のわさび文化をたどる', description: '自然に触れたい／作り手に会いたい／伝統に興味がある人へ。江戸時代から続く奥多摩わさびの文化を、食べて・買って・歩いてたどる旅。', tags: ['自然', '伝統', '半日巡り'], storyTitle: '奥多摩わさびのストーリー', intro: ['奥多摩町は東京都の北西端にあり、町域225.53平方キロメートルは都内の区市町村で最も広く、94％が山林です。東京都最高峰で日本百名山のひとつ、雲取山をはじめ、町を流れる多摩川や奥多摩湖など、山と水に囲まれています。', '奥多摩のきれいな水が流れる渓流では、奥多摩わさびが栽培されています。江戸後期の史料には、地域の特産品で、幕府へ献上されたことが記されています。'] },
      en: { title: 'A pungent taste carried by water since Edo', subtitle: 'Follow Okutama’s wasabi culture', description: 'For people who want to meet nature, makers, and tradition. Taste, shop, and walk through the story.', tags: ['Nature', 'Tradition', 'Half day'], storyTitle: 'The story of Okutama wasabi', intro: ['Okutama lies at Tokyo’s northwestern edge. At 225.53 km², it is Tokyo’s largest municipality by area, and 94% of the town is forest. Mount Kumotori—Tokyo’s highest peak and one of Japan’s 100 Famous Mountains—the Tama River, and Lake Okutama shape this mountain-and-water landscape.', 'Okutama wasabi is cultivated in clean-flowing mountain streams. Late-Edo records describe it as a local specialty presented to the shogunate.'] },
      'zh-TW': { title: '由水串起、延續自江戶的辛香', subtitle: '走讀奧多摩的山葵文化', description: '適合想親近自然、遇見職人與認識傳統的人。透過品嚐、購買與步行來認識這段故事。', tags: ['自然', '傳統', '半日'], storyTitle: '奧多摩山葵的故事', intro: ['奧多摩町位於東京都西北端，面積225.53平方公里，為東京都各區市町村之最，其中94%為山林。東京都最高峰、亦為日本百名山之一的雲取山，以及多摩川與奧多摩湖，共同構成山水環繞的景觀。', '奧多摩山葵栽培於清澈流動的山間溪流。江戶後期史料記載，它是當地特產，並曾進獻幕府。'] },
    },
    chapters: {
      ja: [{ number: '01.', title: 'なぜ、わさびなのか', body: '奥多摩わさびは、江戸後期の史料に地域の特産品・幕府への献上品として登場します。その栽培を支えるのが、わさび田を流れ続けるきれいな水です。' }, { number: '02.', title: '誰が作っているのか', body: '生産者の一例が、TOKYO WASABIの「わさびブラザーズ」角井仁さん・竜也さんです。二人は台風で被災したわさび田の復旧、栽培、体験に取り組んでいます。' }, { number: '03.', title: '受け継がれてきた技術', body: '「奥多摩式」は、田の表面に細かな石を敷き、作と畝で水量を調整する、奥多摩の地形と冬の寒さに合わせた栽培方法です。植え付けから収穫までは約2年かかります。' }, { number: '04.', title: 'いま直面している課題', body: '生産者の高齢化と後継者不足で生産量が減り、2019年の台風ではわさび田も被災しました。東京都は、奥多摩わさび塾や田の貸し出しなどの後継者育成を紹介しています。' }, { number: '05.', title: 'あなたにできること', body: 'TOKYO WASABIは、わさび田の復旧・栽培や体験を行っています。訪問・購入・体験を選ぶときは、最新の実施情報を公式サイトで確認してください。' }],
      en: [{ number: '01.', title: 'Why wasabi?', body: 'Late-Edo records describe Okutama wasabi as a local specialty presented to the shogunate. Its cultivation depends on clean water flowing continuously through the wasabi beds.' }, { number: '02.', title: 'Who makes it?', body: 'At TOKYO WASABI, the “Wasabi Brothers,” Hitoshi and Tacchan, restore storm-damaged beds, cultivate wasabi, and offer visitor experiences.' }, { number: '03.', title: 'Knowledge passed on', body: 'The Okutama method uses small stones on the bed surface and ridges and furrows to manage water for the local terrain and cold winters. Planting to harvest takes about two years.' }, { number: '04.', title: 'Challenges today', body: 'Production declined as growers aged and successors became scarce, and the 2019 typhoon damaged wasabi beds. Tokyo’s official resource also describes successor training through the Okutama Wasabi School and field lending.' }, { number: '05.', title: 'What you can do', body: 'TOKYO WASABI restores and cultivates wasabi beds and offers visitor experiences. Check its official site for current visit, sales, and experience details.' }],
      'zh-TW': [{ number: '01.', title: '為什麼是山葵？', body: '江戶後期史料記載，奧多摩山葵是當地特產，並曾進獻幕府；其栽培仰賴山葵田中持續流動的潔淨水源。' }, { number: '02.', title: '誰在製作？', body: 'TOKYO WASABI的「山葵兄弟」角井仁與角井竜也是在地生產者之一；兩人修復受颱風損害的山葵田，也從事栽培與體驗活動。' }, { number: '03.', title: '傳承的技術', body: '「奧多摩式」在田面鋪設細石，並以畦與溝調節水量，以適應當地地形與寒冷冬季；從種植到收成約需兩年。' }, { number: '04.', title: '當前的課題', body: '生產者高齡化與接班人不足曾使產量下降，2019年颱風也造成山葵田受損。東京都官方資料亦介紹透過奧多摩山葵塾與山葵田租借培育接班人的做法。' }, { number: '05.', title: '你能做什麼', body: 'TOKYO WASABI從事山葵田修復、栽培與體驗活動。造訪、購買或參加體驗前，請先至官網確認最新資訊。' }],
    },
    routeVariants: [
      { id: 'half-day', durationMinutes: 150, imageAssetId: 'figmaRouteMap', facts: routeFacts.wasabiHalfDay, steps: [{ spotId: 'okutama-station', imageAssetId: 'station' }, { spotId: 'okutama-tourism-office', imageAssetId: 'tourismOfficeRoute' }, { spotId: 'wasabi-kitchen', imageAssetId: 'wasabiKitchen' }, { spotId: 'okutama-kitchen', imageAssetId: 'wasabiGelato' }, { spotId: 'hikawa-valley', imageAssetId: 'valley' }, { spotId: 'oku-hikawa-shrine', imageAssetId: 'okuHikawaShrine' }, { spotId: 'port-okutama', imageAssetId: 'port' }] },
      { id: 'full-day', durationMinutes: 420, imageAssetId: 'figmaRouteMap', facts: routeFacts.wasabiFullDay, steps: [{ spotId: 'mitake-station', imageAssetId: 'station' }, { spotId: 'wasabi-experience', imageAssetId: 'wasabiExperience' }, { spotId: 'okutama-station', imageAssetId: 'station' }, { spotId: 'akabeko', imageAssetId: 'akabekoYamame' }, { spotId: 'yamashiroya', imageAssetId: 'yamashiroyaGoods' }, { spotId: 'port-okutama', imageAssetId: 'portDetail' }] },
    ],
  },
  {
    id: 'demo-okutama-yamame', regionId: 'okutama', foodCultureId: 'yamame-okutama', storyId: 'yamame-okutama', routeId: 'okutama-yamame-journey', matchPercent: 91, imageAssetId: 'yamameResult', heroAssetId: 'akabekoYamame', facts: storyFacts.yamame,
    copy: {
      ja: { title: '研究から生まれた、大型のヤマメ', subtitle: '奥多摩やまめの開発と食文化', description: '東京都の養殖研究から生まれた「奥多摩やまめ」の特徴と、地域での味わい方を知る旅。', tags: ['養殖技術', '地域の特産', '半日巡り'], storyTitle: '奥多摩やまめのストーリー', intro: ['「奥多摩やまめ」は、東京都水産試験場奥多摩分場が研究・作出した全雌三倍体の養殖ヤマメです。', '現在は、奥多摩さかな養殖センターが入川と海沢の2か所の飼育池を運営し、種苗の生産・配付や試験研究を行っています。'] },
      en: { title: 'A large yamame born from research', subtitle: 'The development and food culture of Okutama Yamame', description: 'Discover the traits of Okutama Yamame, born from Tokyo’s aquaculture research, and how it is served locally.', tags: ['Aquaculture', 'Local specialty', 'Half day'], storyTitle: 'The story of Okutama Yamame', intro: ['Okutama Yamame is an all-female triploid farmed yamame created through research at the Tokyo Metropolitan Fisheries Experiment Station’s Okutama Branch.', 'Today, the Okutama Fish Farming Center operates two pond sites, Irikawa and Unazawa, and produces and supplies eggs and fry while conducting research.'] },
      'zh-TW': { title: '從研究中誕生的大型山女魚', subtitle: '奧多摩山女魚的研發與飲食文化', description: '認識從東京都養殖研究中誕生的「奧多摩山女魚」，以及地方如何品嚐它。', tags: ['養殖技術', '地方特產', '半日'], storyTitle: '奧多摩山女魚的故事', intro: ['「奧多摩山女魚」是東京都水產試驗場奧多摩分場經研究培育出的全雌三倍體養殖山女魚。', '現在由奧多摩魚類養殖中心營運入川與海澤兩處養殖池，生產、供應魚卵與魚苗，並進行試驗研究。'] },
    },
    chapters: {
      ja: [{ number: '01.', title: '「奥多摩やまめ」という名前', body: '全雌三倍体ヤマメの商品名は1998年7月に選定され、同年11月に奥多摩町で新ブランドとして発表されました。' }, { number: '02.', title: '一つのセンター、二つの飼育池', body: '奥多摩さかな養殖センターは、入川と海沢の2か所の飼育池を運営しています。マス類の卵や稚魚を生産・配付し、養殖研究や魚病対策、技術指導に取り組んでいます。' }, { number: '03.', title: '全雌三倍体という特徴', body: '奥多摩やまめは、すべて雌で、染色体を3組持ちます。成長しても性的に成熟せず、卵を作りません。' }, { number: '04.', title: '長く生き、大型になる', body: '成熟しないため、通常のヤマメより寿命が長く、大型になります。その大きさが、幅広い食材利用につながっています。' }, { number: '05.', title: '大型魚ならではの味わい方', body: '刺身、寿司、ムニエル、フライのほか、燻製や干物などにも利用されています。提供状況は変わるため、訪問前に各店の最新情報をご確認ください。' }],
      en: [{ number: '01.', title: 'The name “Okutama Yamame”', body: 'The product name for the all-female triploid yamame was selected in July 1998 and presented as a new brand in Okutama that November.' }, { number: '02.', title: 'One center, two pond sites', body: 'The Okutama Fish Farming Center operates pond sites at Irikawa and Unazawa. It produces and supplies trout eggs and fry and works on aquaculture research, fish-disease countermeasures, and technical guidance.' }, { number: '03.', title: 'An all-female triploid', body: 'Every Okutama Yamame is female and has three sets of chromosomes. It does not become sexually mature or produce eggs.' }, { number: '04.', title: 'A longer life and larger size', body: 'Because it does not mature sexually, it lives longer and grows larger than ordinary yamame. Its size allows a wider range of culinary uses.' }, { number: '05.', title: 'Ways to serve a larger fish', body: 'It is used for sashimi, sushi, meunière, fried dishes, smoked products, and dried fish. Check each venue’s latest information before visiting, as availability can change.' }],
      'zh-TW': [{ number: '01.', title: '「奧多摩山女魚」之名', body: '這款全雌三倍體山女魚的商品名稱於1998年7月選定，並於同年11月在奧多摩以新品牌對外發表。' }, { number: '02.', title: '一個中心，兩處養殖池', body: '奧多摩魚類養殖中心營運入川與海澤兩處養殖池，生產並供應鱒魚類的魚卵與魚苗，也投入養殖研究、魚病對策與技術指導。' }, { number: '03.', title: '全雌三倍體的特徵', body: '奧多摩山女魚全為雌魚，並具有三組染色體；即使成長也不會性成熟或產卵。' }, { number: '04.', title: '壽命較長，體型較大', body: '因為不會性成熟，它比一般山女魚壽命更長、體型也更大，因此可運用於更多料理。' }, { number: '05.', title: '大型魚的多元料理', body: '可用於生魚片、壽司、法式奶油煎魚、油炸料理，也有煙燻製品與魚乾。地方供應情況可能變動，造訪前請確認各店最新資訊。' }],
    },
    routeVariants: [{ id: 'half-day', durationMinutes: 240, imageAssetId: 'routeMap', facts: routeFacts.yamameHalfDay, steps: [{ spotId: 'okutama-station', imageAssetId: 'station' }, { spotId: 'okutama-tourism-office', imageAssetId: 'tourismOffice' }, { spotId: 'hikawa-valley', imageAssetId: 'valley' }, { spotId: 'akabeko', imageAssetId: 'akabekoYamame' }] }],
  },
];

type SpotCopy = Pick<SpotPresentation['copy'][Locale], 'name' | 'lead' | 'description'>;

const spot = (
  id: string,
  imageAssetId: ReferenceAssetId,
  thumbnailAssetIds: ReferenceAssetId[],
  localized: Record<Locale, SpotCopy>,
  facts: PresentationFacts = demoPresentationFacts,
): SpotPresentation => ({
  id, regionId: 'okutama', foodCultureId: 'wasabi-okutama', imageAssetId, thumbnailAssetIds, facts,
  copy: {
    ja: { ...localized.ja, tags: ['デモ参考情報'], practicalInfo: [], caution: ['営業・予約・価格・アクセスなどは、訪問前に公式情報をご確認ください。'] },
    en: { ...localized.en, tags: ['Demo reference'], practicalInfo: [], caution: ['Please confirm hours, booking, prices, and access with official sources before visiting.'] },
    'zh-TW': { ...localized['zh-TW'], tags: ['示範參考資訊'], practicalInfo: [], caution: ['造訪前請以官方資訊確認營業時間、預約、價格與交通。'] },
  },
});

export const demoSpots: Record<string, SpotPresentation> = {
  'okutama-tourism-office': spot('okutama-tourism-office', 'tourismOfficeExterior', ['tourismOffice', 'wasapy', 'station', 'valley'], { ja: { name: '奥多摩観光案内所', lead: '旅のはじまりに立ち寄る観光案内所', description: '奥多摩の観光情報に出会う、旅の最初の立ち寄り先です。' }, en: { name: 'Okutama Tourist Information Center', lead: 'A visitor-information stop at the start of the journey', description: 'A first stop for discovering Okutama visitor information.' }, 'zh-TW': { name: '奧多摩觀光案內所', lead: '旅程開始時造訪的觀光案內所', description: '認識奧多摩旅遊資訊的第一個停靠點。' } }, tourismOfficeFacts),
  akabeko: spot('akabeko', 'akabeko', ['akabekoYamame', 'akabekoYamameDetail', 'wasabiGelato', 'okutamaKitchenDetail'], { ja: { name: '炉ばた あかべこ', lead: '地域の味に出会う炉ばた料理店', description: '地域の食材を味わうための、参考スポットです。' }, en: { name: 'Robata Akabeko', lead: 'A hearth-grill restaurant for local flavors', description: 'A reference stop for tasting ingredients from the area.' }, 'zh-TW': { name: '爐端燒 AKABEKO', lead: '遇見在地風味的爐端料理店', description: '品嚐在地食材的參考景點。' } }),
  yamashiroya: spot('yamashiroya', 'yamashiroya', ['yamashiroyaGoods', 'yamashiroyaSign'], { ja: { name: '山城屋', lead: 'わさび加工の店を訪ねる', description: 'わさびにまつわる品を探すための、参考スポットです。' }, en: { name: 'Yamashiroya', lead: 'Visit a wasabi-specialty shop', description: 'A reference stop for finding wasabi-related goods.' }, 'zh-TW': { name: '山城屋', lead: '造訪山葵加工專門店', description: '尋找山葵相關商品的參考景點。' } }, presentationFacts(neutralDemoDisclosure, [presentationSources.yamashiroya])),
  'wasabi-kitchen': spot('wasabi-kitchen', 'wasabiKitchen', ['station', 'wasabiGelato'], { ja: { name: 'わさび食堂', lead: '駅前でわさびの味を知る', description: 'わさびの味を知るための、参考スポットです。' }, en: { name: 'Wasabi Shokudo', lead: 'Explore wasabi flavors near the station', description: 'A reference stop for exploring wasabi flavors.' }, 'zh-TW': { name: '山葵食堂', lead: '在車站前認識山葵風味', description: '認識山葵風味的參考景點。' } }, presentationFacts(neutralDemoDisclosure, [presentationSources.wasabiFoodTruck, presentationSources.wasabiFoodTruckSchedule])),
  'okutama-kitchen': spot('okutama-kitchen', 'okutamaKitchen', ['wasabiGelato', 'okutamaKitchenDetail'], { ja: { name: '奥多摩の台所', lead: '歩き旅の途中でひと休み', description: '地域の味わいに出会うための、参考スポットです。' }, en: { name: 'Okutama no Daidokoro', lead: 'A pause along a walking journey', description: 'A reference stop for meeting local flavors.' }, 'zh-TW': { name: '奧多摩的廚房', lead: '步行旅途中的小歇', description: '遇見地方風味的參考景點。' } }),
  'hikawa-valley': spot('hikawa-valley', 'valley', ['river', 'valleyBridge'], { ja: { name: '氷川渓谷', lead: '水と土地に触れる散策', description: '食文化を支える水辺の風景に出会う、参考スポットです。' }, en: { name: 'Hikawa Valley', lead: 'A walk that meets water and landscape', description: 'A reference stop for waterside scenery behind the food culture.' }, 'zh-TW': { name: '冰川溪谷', lead: '親近水與土地的散步', description: '遇見支撐飲食文化的水岸風景之參考景點。' } }),
  'port-okutama': spot('port-okutama', 'portCafe', ['port', 'portDetail'], { ja: { name: 'PORT OKUTAMA', lead: '旅の締めのコーヒーと土産探しに', description: '旅の最後に立ち寄るための、参考スポットです。' }, en: { name: 'PORT OKUTAMA', lead: 'Coffee and gifts to close the journey', description: 'A reference stop for the final part of the journey.' }, 'zh-TW': { name: 'PORT OKUTAMA', lead: '以咖啡與伴手禮為旅程收尾', description: '在旅程最後停靠的參考景點。' } }),
  'wasabi-experience': spot('wasabi-experience', 'wasabiExperience', ['river'], { ja: { name: 'Wasabi Experience', lead: 'わさび田の体験を知る', description: 'わさびの生産風景に触れるための、参考スポットです。' }, en: { name: 'Wasabi Experience', lead: 'Learn about a wasabi-field experience', description: 'A reference stop for meeting wasabi growing landscapes.' }, 'zh-TW': { name: 'Wasabi Experience', lead: '認識山葵田體驗', description: '親近山葵生產景觀的參考景點。' } }, presentationFacts(neutralDemoDisclosure, [presentationSources.wasabiExperience])),
  'oku-hikawa-shrine': spot('oku-hikawa-shrine', 'okuHikawaShrine', ['valley', 'station'], { ja: { name: '奥氷川神社', lead: '奥多摩駅近くで地域の歴史にふれる', description: '地域の歴史と自然を感じられる静かな神社です。' }, en: { name: 'Oku-Hikawa Shrine', lead: 'Meet local history near Okutama Station', description: 'A quiet shrine where the area’s history and nature meet.' }, 'zh-TW': { name: '奧冰川神社', lead: '在奧多摩站附近感受地方歷史', description: '能感受地方歷史與自然的寧靜神社。' } }),
  'okutama-station': spot('okutama-station', 'station', ['tourismOffice'], { ja: { name: '奥多摩駅', lead: '旅のスタート地点', description: '旅程の起点として示す、参考スポットです。' }, en: { name: 'Okutama Station', lead: 'The journey’s starting point', description: 'A reference stop shown as the route’s starting point.' }, 'zh-TW': { name: '奧多摩站', lead: '旅程的起點', description: '作為行程起點顯示的參考景點。' } }),
  'mitake-station': spot('mitake-station', 'station', ['wasabiExperience'], { ja: { name: '御岳駅', lead: 'わさび体験へ向かう起点', description: '体験ルートの起点として示す、参考スポットです。' }, en: { name: 'Mitake Station', lead: 'A starting point for the wasabi experience', description: 'A reference stop shown as the experience route’s starting point.' }, 'zh-TW': { name: '御嶽站', lead: '前往山葵體驗的起點', description: '作為體驗路線起點顯示的參考景點。' } }),
};
