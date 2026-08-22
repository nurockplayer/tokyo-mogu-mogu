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
import wasabiExperience from '../../assets/netlify-parity/experience_new.jpg';
import favicon from '../../assets/netlify-parity/favicon.png';
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
  }>;
}

export interface SpotPresentation {
  id: string;
  regionId: string;
  foodCultureId: string;
  imageAssetId: ReferenceAssetId;
  thumbnailAssetIds: ReferenceAssetId[];
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
  wasabiHero: '../../assets/netlify-parity/wasabi_photo.jpg',
  yamameResult: '../../assets/netlify-parity/crop_yamame_clean.png',
  routeMap: '../../assets/netlify-parity/map.jpg',
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
  wasabiHero,
  yamameResult,
  routeMap,
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

const demoSourceNotes: Record<Locale, string> = {
  ja: 'Netlify の参照画面をもとにしたデモ用編集情報です。訪問前に施設の最新情報をご確認ください。',
  en: 'Demo editorial presentation transcribed from the authoritative Netlify reference; verify current venue details before travel.',
  'zh-TW': '此為依 Netlify 參考畫面整理的示範編輯資訊；造訪前請確認場所的最新資料。',
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
      { id: 'half-day', durationMinutes: 150, imageAssetId: 'routeMap', steps: [{ spotId: 'okutama-station', imageAssetId: 'station' }, { spotId: 'okutama-tourism-office', imageAssetId: 'tourismOffice' }, { spotId: 'wasabi-kitchen', imageAssetId: 'wasabiKitchen' }, { spotId: 'okutama-kitchen', imageAssetId: 'wasabiGelato' }, { spotId: 'hikawa-valley', imageAssetId: 'valley' }, { spotId: 'port-okutama', imageAssetId: 'port' }] },
      { id: 'full-day', durationMinutes: 420, imageAssetId: 'routeMap', steps: [{ spotId: 'mitake-station', imageAssetId: 'station' }, { spotId: 'wasabi-experience', imageAssetId: 'wasabiExperience' }, { spotId: 'okutama-station', imageAssetId: 'station' }, { spotId: 'akabeko', imageAssetId: 'akabekoYamame' }, { spotId: 'yamashiroya', imageAssetId: 'yamashiroyaGoods' }, { spotId: 'port-okutama', imageAssetId: 'portDetail' }] },
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

const spot = (id: string, imageAssetId: ReferenceAssetId, thumbnailAssetIds: ReferenceAssetId[], localized: Record<Locale, SpotCopy>): SpotPresentation => ({
  id, regionId: 'okutama', foodCultureId: 'wasabi-okutama', imageAssetId, thumbnailAssetIds,
  copy: {
    ja: { ...localized.ja, tags: ['デモ参考情報'], practicalInfo: [{ label: '情報の扱い', value: demoSourceNotes.ja }], caution: ['営業・予約・価格・アクセスなどは、訪問前に公式情報をご確認ください。'] },
    en: { ...localized.en, tags: ['Demo reference'], practicalInfo: [{ label: 'Information handling', value: demoSourceNotes.en }], caution: ['Please confirm hours, booking, prices, and access with official sources before visiting.'] },
    'zh-TW': { ...localized['zh-TW'], tags: ['示範參考資訊'], practicalInfo: [{ label: '資訊說明', value: demoSourceNotes['zh-TW'] }], caution: ['造訪前請以官方資訊確認營業時間、預約、價格與交通。'] },
  },
});

export const demoSpots: Record<string, SpotPresentation> = {
  'okutama-tourism-office': spot('okutama-tourism-office', 'tourismOffice', ['wasapy', 'station', 'valley', 'port'], { ja: { name: '奥多摩観光案内所', lead: 'わさぴーが迎えてくれる、旅のはじまりスポット', description: '奥多摩の観光情報に出会う、旅の最初の立ち寄り先です。' }, en: { name: 'Okutama Tourist Information Center', lead: 'A welcoming first stop for the journey', description: 'A first stop for discovering Okutama visitor information.' }, 'zh-TW': { name: '奧多摩觀光案內所', lead: '迎接旅程開始的第一站', description: '認識奧多摩旅遊資訊的第一個停靠點。' } }),
  akabeko: spot('akabeko', 'akabeko', ['akabekoYamame', 'akabekoYamameDetail', 'wasabiGelato', 'okutamaKitchenDetail'], { ja: { name: '炉ばた あかべこ', lead: '地域の味に出会う炉ばた料理店', description: '地域の食材を味わうための、参考スポットです。' }, en: { name: 'Robata Akabeko', lead: 'A hearth-grill restaurant for local flavors', description: 'A reference stop for tasting ingredients from the area.' }, 'zh-TW': { name: '爐端燒 AKABEKO', lead: '遇見在地風味的爐端料理店', description: '品嚐在地食材的參考景點。' } }),
  yamashiroya: spot('yamashiroya', 'yamashiroya', ['yamashiroyaGoods', 'yamashiroyaSign'], { ja: { name: '山城屋', lead: 'わさび加工の店を訪ねる', description: 'わさびにまつわる品を探すための、参考スポットです。' }, en: { name: 'Yamashiroya', lead: 'Visit a wasabi-specialty shop', description: 'A reference stop for finding wasabi-related goods.' }, 'zh-TW': { name: '山城屋', lead: '造訪山葵加工專門店', description: '尋找山葵相關商品的參考景點。' } }),
  'wasabi-kitchen': spot('wasabi-kitchen', 'wasabiKitchen', ['station', 'wasabiGelato'], { ja: { name: 'わさび食堂', lead: '駅前で味わうわさびの一皿', description: 'わさびの味を試すための、参考スポットです。' }, en: { name: 'Wasabi Shokudo', lead: 'A wasabi dish near the station', description: 'A reference stop for trying a wasabi flavor.' }, 'zh-TW': { name: '山葵食堂', lead: '在車站前品嚐一道山葵料理', description: '嘗試山葵風味的參考景點。' } }),
  'okutama-kitchen': spot('okutama-kitchen', 'okutamaKitchen', ['wasabiGelato', 'okutamaKitchenDetail'], { ja: { name: '奥多摩の台所', lead: '歩き旅の途中でひと休み', description: '地域の味わいに出会うための、参考スポットです。' }, en: { name: 'Okutama no Daidokoro', lead: 'A pause along a walking journey', description: 'A reference stop for meeting local flavors.' }, 'zh-TW': { name: '奧多摩的廚房', lead: '步行旅途中的小歇', description: '遇見地方風味的參考景點。' } }),
  'hikawa-valley': spot('hikawa-valley', 'valley', ['river', 'valleyBridge'], { ja: { name: '氷川渓谷', lead: '水と土地に触れる散策', description: '食文化を支える水辺の風景に出会う、参考スポットです。' }, en: { name: 'Hikawa Valley', lead: 'A walk that meets water and landscape', description: 'A reference stop for waterside scenery behind the food culture.' }, 'zh-TW': { name: '冰川溪谷', lead: '親近水與土地的散步', description: '遇見支撐飲食文化的水岸風景之參考景點。' } }),
  'port-okutama': spot('port-okutama', 'portCafe', ['port', 'portDetail'], { ja: { name: 'PORT OKUTAMA', lead: '旅の締めのコーヒーと土産探しに', description: '旅の最後に立ち寄るための、参考スポットです。' }, en: { name: 'PORT OKUTAMA', lead: 'Coffee and gifts to close the journey', description: 'A reference stop for the final part of the journey.' }, 'zh-TW': { name: 'PORT OKUTAMA', lead: '以咖啡與伴手禮為旅程收尾', description: '在旅程最後停靠的參考景點。' } }),
  'wasabi-experience': spot('wasabi-experience', 'wasabiExperience', ['river'], { ja: { name: 'Wasabi Experience', lead: 'わさび田の体験を知る', description: 'わさびの生産風景に触れるための、参考スポットです。' }, en: { name: 'Wasabi Experience', lead: 'Learn about a wasabi-field experience', description: 'A reference stop for meeting wasabi growing landscapes.' }, 'zh-TW': { name: 'Wasabi Experience', lead: '認識山葵田體驗', description: '親近山葵生產景觀的參考景點。' } }),
  'okutama-station': spot('okutama-station', 'station', ['tourismOffice'], { ja: { name: '奥多摩駅', lead: '旅のスタート地点', description: '旅程の起点として示す、参考スポットです。' }, en: { name: 'Okutama Station', lead: 'The journey’s starting point', description: 'A reference stop shown as the route’s starting point.' }, 'zh-TW': { name: '奧多摩站', lead: '旅程的起點', description: '作為行程起點顯示的參考景點。' } }),
  'mitake-station': spot('mitake-station', 'station', ['wasabiExperience'], { ja: { name: '御岳駅', lead: 'わさび体験へ向かう起点', description: '体験ルートの起点として示す、参考スポットです。' }, en: { name: 'Mitake Station', lead: 'A starting point for the wasabi experience', description: 'A reference stop shown as the experience route’s starting point.' }, 'zh-TW': { name: '御嶽站', lead: '前往山葵體驗的起點', description: '作為體驗路線起點顯示的參考景點。' } }),
};
