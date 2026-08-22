/**
 * Presentation-only fieldwork media for the 8/23 Okutama × Tokyo Wasabi demo.
 *
 * This does not extend the durable Place / Route / FoodCulture contracts. A
 * photo is mapped only where its subject can be identified from the fieldwork
 * filename and the existing source-backed journey. Unknown venues keep their
 * honest generated visual instead of borrowing a nearby photograph.
 */
import type { Locale } from '../i18n';
import hikawaBridge from '../assets/fieldwork/okutama/hikawa-bridge.jpg';
import hikawaValley from '../assets/fieldwork/okutama/hikawa-valley.jpg';
import tourismOffice from '../assets/fieldwork/okutama/tourism-office.jpg';
import tourismOfficeStamps from '../assets/fieldwork/okutama/tourism-office-stamps.jpg';
import tourismOfficeWasapy from '../assets/fieldwork/okutama/tourism-office-wasapy.jpg';

export type LocalizedMediaText = Readonly<Record<Locale, string>>;

export interface FieldworkMedia {
  id: string;
  src: string;
  title: LocalizedMediaText;
  alt: LocalizedMediaText;
  caption: LocalizedMediaText;
  originalFilename: string;
}

const copy = (ja: string, en: string, zhTW: string): LocalizedMediaText => ({
  ja,
  en,
  'zh-TW': zhTW,
});

export function fieldworkText(text: LocalizedMediaText, locale: Locale): string {
  return text[locale];
}

export const FIELDWORK_GALLERY_COPY = {
  storyLabel: copy('奥多摩の景色', 'Scenes from Okutama', '奧多摩風景'),
  spotLabel: copy(
    '奥多摩観光案内所の写真',
    'Photos of the Okutama Tourism Office',
    '奧多摩遊客服務中心照片',
  ),
  showPhoto: copy('写真を表示', 'Show photo', '顯示照片'),
  swipeHint: copy(
    '横にスワイプして奥多摩を旅する',
    'Swipe to travel through Okutama',
    '左右滑動，走進奧多摩',
  ),
} as const;

export const OKUTAMA_STORY_MEDIA: readonly FieldworkMedia[] = [
  {
    id: 'okutama-valley',
    src: hikawaValley,
    title: copy('奥多摩の谷あい', 'Okutama valley', '奧多摩山谷'),
    alt: copy('川と山が続く奥多摩の風景', 'Okutama landscape with river and mountains', '河川與山巒延伸的奧多摩風景'),
    caption: copy('川と山が続く奥多摩の谷あい', 'A valley shaped by Okutama’s river and mountains', '河川與山巒交織的奧多摩山谷'),
    originalFilename: '川2.JPG',
  },
  {
    id: 'okutama-bridge',
    src: hikawaBridge,
    title: copy('橋と森', 'Bridge and forest', '橋與森林'),
    alt: copy('奥多摩で出会った橋と森の風景', 'A bridge and forest scene encountered in Okutama', '在奧多摩遇見的橋與森林風景'),
    caption: copy('橋を渡り、土地の風景へ', 'Crossing into the landscape', '越過橋，走進地方風景'),
    originalFilename: '橋.JPG',
  },
  {
    id: 'okutama-tourism-office',
    src: tourismOffice,
    title: copy('奥多摩観光案内所', 'Okutama Tourism Office', '奧多摩遊客服務中心'),
    alt: copy('奥多摩観光案内所の内観', 'Inside the Okutama Tourism Office', '奧多摩遊客服務中心內部'),
    caption: copy('旅の情報に出会う、奥多摩観光案内所', 'Local context for the journey at the tourism office', '在奧多摩遊客服務中心認識旅程資訊'),
    originalFilename: '案内所_様子.JPG',
  },
] as const;

export const OKUTAMA_ROUTE_MEDIA: FieldworkMedia = {
  id: 'okutama-valley',
  src: hikawaValley,
  title: copy('奥多摩の谷あい', 'Okutama valley', '奧多摩山谷'),
  alt: copy('川と山が続く奥多摩の風景', 'Okutama landscape with river and mountains', '河川與山巒延伸的奧多摩風景'),
  caption: copy('川と山のあいだを進む、奥多摩の食文化の旅', 'A food-culture journey between Okutama’s river and mountains', '在河川與山巒之間，展開奧多摩飲食文化之旅'),
  originalFilename: '川2.JPG',
};

export const OKUTAMA_TOURISM_OFFICE_MEDIA: readonly FieldworkMedia[] = [
  {
    id: 'tourism-office',
    src: tourismOffice,
    title: copy('案内所の館内', 'Inside the tourism office', '服務中心館內'),
    alt: copy('奥多摩観光案内所の内観', 'Inside the Okutama Tourism Office', '奧多摩遊客服務中心內部'),
    caption: copy('地域の情報が並ぶ奥多摩観光案内所', 'Local travel information inside the Okutama Tourism Office', '陳列在地旅遊資訊的奧多摩遊客服務中心'),
    originalFilename: '案内所_様子.JPG',
  },
  {
    id: 'tourism-office-stamps',
    src: tourismOfficeStamps,
    title: copy('わさぴースタンプ', 'Wasapy stamps', 'Wasapy印章'),
    alt: copy('案内所に並ぶわさぴーのスタンプ', 'Wasapy stamps displayed at the tourism office', '服務中心陳列的Wasapy印章'),
    caption: copy('旅の記憶を残す、案内所のわさぴースタンプ', 'Wasapy stamps at the tourism office', '在服務中心留下旅程記憶的Wasapy印章'),
    originalFilename: '案内所_わさびスタンプ.JPG',
  },
  {
    id: 'tourism-office-wasapy',
    src: tourismOfficeWasapy,
    title: copy('案内所のわさぴー', 'Wasapy at the office', '服務中心的Wasapy'),
    alt: copy('奥多摩観光案内所のわさぴー', 'Wasapy at the Okutama Tourism Office', '奧多摩遊客服務中心的Wasapy'),
    caption: copy('東京わさびをモチーフにした「わさぴー」', 'Wasapy, a character inspired by Tokyo wasabi', '以東京山葵為靈感的角色「Wasapy」'),
    originalFilename: '案内所_わさび.JPG',
  },
] as const;

/** Place-level mapping is intentionally sparse: only a directly identified venue. */
export const FIELDWORK_MEDIA_BY_PLACE_ID: Readonly<Record<string, readonly FieldworkMedia[]>> = {
  'okutama-tourism-office': OKUTAMA_TOURISM_OFFICE_MEDIA,
};
