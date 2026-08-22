import type { Locale } from '../i18n/resources';
import type { RegionId } from './model';

import office640 from '../assets/fieldwork/okutama/office-640.webp';
import office960 from '../assets/fieldwork/okutama/office-960.webp';
import office1440 from '../assets/fieldwork/okutama/office-1440.webp';
import officeStamps640 from '../assets/fieldwork/okutama/office-stamps-640.webp';
import officeStamps960 from '../assets/fieldwork/okutama/office-stamps-960.webp';
import officeStamps1440 from '../assets/fieldwork/okutama/office-stamps-1440.webp';
import officeWasapi640 from '../assets/fieldwork/okutama/office-wasapi-640.webp';
import officeWasapi960 from '../assets/fieldwork/okutama/office-wasapi-960.webp';
import officeWasapi1440 from '../assets/fieldwork/okutama/office-wasapi-1440.webp';
import okutamaBridge640 from '../assets/fieldwork/okutama/okutama-bridge-640.webp';
import okutamaBridge960 from '../assets/fieldwork/okutama/okutama-bridge-960.webp';
import okutamaBridge1440 from '../assets/fieldwork/okutama/okutama-bridge-1440.webp';
import okutamaValley640 from '../assets/fieldwork/okutama/okutama-valley-640.webp';
import okutamaValley960 from '../assets/fieldwork/okutama/okutama-valley-960.webp';
import okutamaValley1440 from '../assets/fieldwork/okutama/okutama-valley-1440.webp';

export interface FieldworkMediaText {
  alt: string;
  title: string;
  caption: string;
}

export interface FieldworkMediaVariant {
  src: string;
  width: number;
  height: number;
}

export interface FieldworkMedia {
  variants: readonly FieldworkMediaVariant[];
  fallbackSrc: string;
  width: number;
  height: number;
  text: Readonly<Record<Locale, FieldworkMediaText>>;
  provenance: {
    sourceFolderUrl: string;
    driveFileId: string;
    originalFileName: string;
    originalSha256: string;
    reviewedAt: string;
    authorizationBasis: string;
    publicLicense: string | null;
  };
  mapping:
    | {
        scope: 'place';
        placeId: string;
        constraint: string;
      }
    | {
        scope: 'region-scenery';
        regionId: RegionId;
        constraint: string;
      };
}

const SOURCE_FOLDER_URL =
  'https://drive.google.com/drive/folders/1p4seRQO1FgJ_KIym38skBnHLcsQUfp8a';

export const FIELDWORK_MEDIA = {
  'okutama-tourism-office-interior': {
    variants: [
      { src: office640, width: 640, height: 480 },
      { src: office960, width: 960, height: 720 },
      { src: office1440, width: 1440, height: 1080 },
    ],
    fallbackSrc: office960,
    width: 960,
    height: 720,
    text: {
      ja: {
        alt: '観光パンフレットや地図、スタンプが並ぶ奥多摩観光案内所の情報コーナー',
        title: '奥多摩観光案内所の情報コーナー',
        caption: '2026年8月の奥多摩フィールドワークで撮影した案内所内。',
      },
      en: {
        alt: 'Tourism leaflets, maps, and a stamp arranged in the Okutama visitor information office',
        title: 'Visitor information in Okutama',
        caption: 'Inside the visitor information office during fieldwork in Okutama in August 2026.',
      },
      'zh-TW': {
        alt: '奧多摩觀光服務處內，桌上與木架陳列著觀光手冊、地圖和印章',
        title: '奧多摩觀光服務處的資訊區',
        caption: '2026 年 8 月於奧多摩田野調查期間拍攝的服務處內部。',
      },
    },
    provenance: {
      sourceFolderUrl: SOURCE_FOLDER_URL,
      driveFileId: '1HCruQaj5y5FDCAEyM9RRKfGyMhemi9hc',
      originalFileName: '案内所_様子.JPG',
      originalSha256: 'd3d591c6591c291d73ebbf5fb57cb2625627000d3a3b91dfdaad4d09d417c205',
      reviewedAt: '2026-08-23',
      authorizationBasis: 'project-demo-issues-258-270',
      publicLicense: null,
    },
    mapping: {
      scope: 'place',
      placeId: 'okutama-tourism-office',
      constraint: 'Pictured interior only; do not infer current leaflet or service availability.',
    },
  },
  'okutama-tourism-office-stamps': {
    variants: [
      { src: officeStamps640, width: 640, height: 480 },
      { src: officeStamps960, width: 960, height: 720 },
      { src: officeStamps1440, width: 1440, height: 1080 },
    ],
    fallbackSrc: officeStamps960,
    width: 960,
    height: 720,
    text: {
      ja: {
        alt: '案内カードの前に四つ並んだ、わさびをモチーフにしたスタンプ',
        title: '案内所のわさびスタンプ',
        caption: '奥多摩観光案内所でフィールドワーク時に確認したスタンプ展示。',
      },
      en: {
        alt: 'Four wasabi-themed stamps arranged in front of an information card',
        title: 'Wasabi-themed stamps at the information office',
        caption: 'Stamp display observed during fieldwork at the Okutama visitor information office.',
      },
      'zh-TW': {
        alt: '資訊卡前整齊放著四枚山葵主題印章',
        title: '觀光服務處的山葵主題印章',
        caption: '田野調查期間於奧多摩觀光服務處看見的印章展示。',
      },
    },
    provenance: {
      sourceFolderUrl: SOURCE_FOLDER_URL,
      driveFileId: '1p1OeuAItfUNA18IiM-j5Is42S5M9HByj',
      originalFileName: '案内所_わさびスタンプ.JPG',
      originalSha256: 'b8561a12eafb5c7355b6bb3207abfe737f5e911a545b1870e073c4ebd88fb527',
      reviewedAt: '2026-08-23',
      authorizationBasis: 'project-demo-issues-258-270',
      publicLicense: null,
    },
    mapping: {
      scope: 'place',
      placeId: 'okutama-tourism-office',
      constraint: 'Pictured display only; do not promise that stamping is currently available.',
    },
  },
  'okutama-tourism-office-character': {
    variants: [
      { src: officeWasapi640, width: 640, height: 853 },
      { src: officeWasapi960, width: 960, height: 1280 },
      { src: officeWasapi1440, width: 1440, height: 1920 },
    ],
    fallbackSrc: officeWasapi960,
    width: 960,
    height: 1280,
    text: {
      ja: {
        alt: '奥多摩観光案内所に飾られた、緑色のわさびをモチーフにしたキャラクターのぬいぐるみ',
        title: '案内所のわさびキャラクター',
        caption: '奥多摩の食文化を身近に伝える、案内所内のわさびモチーフ。',
      },
      en: {
        alt: 'Green wasabi-inspired character plush displayed in the Okutama visitor information office',
        title: 'Wasabi character at the information office',
        caption: 'A wasabi-themed detail inside the visitor information office in Okutama.',
      },
      'zh-TW': {
        alt: '奧多摩觀光服務處內陳列的綠色山葵造型吉祥物玩偶',
        title: '觀光服務處的山葵造型角色',
        caption: '在奧多摩觀光服務處內，以山葵為主題呈現地方飲食文化的展示。',
      },
    },
    provenance: {
      sourceFolderUrl: SOURCE_FOLDER_URL,
      driveFileId: '1G_8f16s4uBAtMpW3et9WGk6vDT9AjI4t',
      originalFileName: '案内所_わさび.JPG',
      originalSha256: '984d68ca50b9ff16a15f8b7468493c4d49258f8d6e96c31d8ecfb498f614ae3b',
      reviewedAt: '2026-08-23',
      authorizationBasis: 'project-demo-issues-258-270',
      publicLicense: null,
    },
    mapping: {
      scope: 'place',
      placeId: 'okutama-tourism-office',
      constraint: 'Pictured display only; do not infer merchandise or current availability.',
    },
  },
  'okutama-forest-bridge': {
    variants: [
      { src: okutamaBridge640, width: 640, height: 853 },
      { src: okutamaBridge960, width: 960, height: 1280 },
      { src: okutamaBridge1440, width: 1440, height: 1920 },
    ],
    fallbackSrc: okutamaBridge960,
    width: 960,
    height: 1280,
    text: {
      ja: {
        alt: '奥多摩の深い緑に囲まれ、森の中へ延びる木板の吊り橋',
        title: '奥多摩の森の吊り橋',
        caption: '奥多摩でのフィールドワーク中に撮影した地域風景。特定の橋や通行状況を示すものではありません。',
      },
      en: {
        alt: 'Wooden suspension footbridge extending into dense green forest in Okutama',
        title: 'Forest footbridge in Okutama',
        caption: 'Generic Okutama scenery photographed during fieldwork; it does not identify a bridge or its current access conditions.',
      },
      'zh-TW': {
        alt: '奧多摩綠意茂密的森林裡，一座木板吊橋向前延伸',
        title: '奧多摩森林中的吊橋',
        caption: '田野調查期間拍攝的奧多摩地區風景；不代表特定橋梁或目前的通行狀況。',
      },
    },
    provenance: {
      sourceFolderUrl: SOURCE_FOLDER_URL,
      driveFileId: '1GOi-aYB04qb7fWiFidHWwm0vBmW63VLG',
      originalFileName: '橋.JPG',
      originalSha256: '67c04cc6a9b220d61a501a01c67d0cec323c1c98196677750ca2e216bdda6447',
      reviewedAt: '2026-08-23',
      authorizationBasis: 'project-demo-issues-258-270',
      publicLicense: null,
    },
    mapping: {
      scope: 'region-scenery',
      regionId: 'okutama',
      constraint: 'Do not name the bridge or infer its location, ownership, safety, or access.',
    },
  },
  'okutama-forest-valley': {
    variants: [
      { src: okutamaValley640, width: 640, height: 853 },
      { src: okutamaValley960, width: 960, height: 1280 },
      { src: okutamaValley1440, width: 1440, height: 1920 },
    ],
    fallbackSrc: okutamaValley960,
    width: 960,
    height: 1280,
    text: {
      ja: {
        alt: '雲の広がる空の下、奥多摩の山あいを流れる川と両岸の深い緑',
        title: '奥多摩の山と川',
        caption: '奥多摩でのフィールドワーク中に撮影した地域風景。特定の川や展望地点を示すものではありません。',
      },
      en: {
        alt: 'River running through a deeply wooded Okutama valley beneath a cloud-filled sky',
        title: 'Mountain valley and river in Okutama',
        caption: 'Generic Okutama scenery photographed during fieldwork; it does not identify a river or viewpoint.',
      },
      'zh-TW': {
        alt: '雲層下的河流穿過奧多摩山谷，兩側覆滿深綠色樹林',
        title: '奧多摩的山谷與河流',
        caption: '田野調查期間拍攝的奧多摩地區風景；不代表特定河川或觀景地點。',
      },
    },
    provenance: {
      sourceFolderUrl: SOURCE_FOLDER_URL,
      driveFileId: '1zdelt-RC4GcI4Qph4XJBUyooJ17LdTFE',
      originalFileName: '川2.JPG',
      originalSha256: '04674514f445ba02ded1344996637b2a9d5ae48ab04152fc6c795f0fb9624b4b',
      reviewedAt: '2026-08-23',
      authorizationBasis: 'project-demo-issues-258-270',
      publicLicense: null,
    },
    mapping: {
      scope: 'region-scenery',
      regionId: 'okutama',
      constraint: 'Do not name the river or viewpoint or infer access, water, weather, or safety conditions.',
    },
  },
} as const satisfies Record<string, FieldworkMedia>;

export type FieldworkMediaId = keyof typeof FIELDWORK_MEDIA;

/** Build a responsive `srcset` value without making page components know asset paths. */
export function fieldworkMediaSrcSet(media: FieldworkMedia): string {
  return media.variants.map(({ src, width }) => `${src} ${width}w`).join(', ');
}

/** Resolve complete, human-reviewed copy for the active product locale. */
export function fieldworkMediaText(
  media: FieldworkMedia,
  locale: Locale,
): FieldworkMediaText {
  return media.text[locale];
}
