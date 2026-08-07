/**
 * Seed data: Tama places.
 *
 * NOTE ON PROVENANCE:
 * - Coordinates are APPROXIMATE (origin: 'demo') so the check-in radius can be
 *   tested safely during development. They must be re-verified against real
 *   GPS during the Issue #10 Okutama fieldwork before production use.
 * - Addresses reference the real establishments; names use the publicly known
 *   names of the area/facilities.
 */
import type { Place } from './model';

export const PLACES: Place[] = [
  {
    id: 'okutama-wasabi-field',
    nameJa: '奥多摩わさび田',
    nameEn: 'Okutama Wasabi Field',
    address: '東京都西多摩郡奥多摩町（沢沿いのわさび田）',
    latitude: 35.8015,
    longitude: 139.0831,
    foodCultureIds: ['wasabi-okutama'],
    type: 'farm',
    source: {
      name: '奥多摩観光協会',
      url: 'https://www.okutokanko.jp/',
      lastVerified: '2026-08-08',
    },
    origin: 'demo',
  },
  {
    id: 'okutama-tourism-office',
    nameJa: '奥多摩観光案内所',
    nameEn: 'Okutama Tourist Information Center',
    address: '東京都西多摩郡奥多摩町氷川',
    latitude: 35.8065,
    longitude: 139.0916,
    foodCultureIds: ['wasabi-okutama', 'okutama-soba', 'okutama-konnyaku'],
    type: 'info-center',
    source: {
      name: '奥多摩観光協会',
      url: 'https://www.okutokanko.jp/',
      lastVerified: '2026-08-08',
    },
    origin: 'demo',
  },
  {
    id: 'okutama-fishing-center',
    nameJa: '奥多摩フィッシングセンター',
    nameEn: 'Okutama Fishing Center',
    address: '東京都西多摩郡奥多摩町（多摩川沿い）',
    latitude: 35.8042,
    longitude: 139.0972,
    foodCultureIds: ['yamame-okutama'],
    type: 'other',
    source: {
      name: '奥多摩観光協会',
      url: 'https://www.okutokanko.jp/',
      lastVerified: '2026-08-08',
    },
    origin: 'demo',
  },
  {
    id: 'okutama-soba-shop',
    nameJa: '奥多摩そば処',
    nameEn: 'Okutama Soba Shop',
    address: '東京都西多摩郡奥多摩町氷川（奥多摩駅周辺）',
    latitude: 35.8092,
    longitude: 139.0986,
    foodCultureIds: ['okutama-soba'],
    type: 'restaurant',
    source: {
      name: '奥多摩観光協会',
      url: 'https://www.okutokanko.jp/',
      lastVerified: '2026-08-08',
    },
    origin: 'demo',
  },
  {
    id: 'okutama-michi-no-eki',
    nameJa: '奥多摩駅前 道の駅',
    nameEn: 'Okutama Station Roadside Station',
    address: '東京都西多摩郡奥多摩町氷川（奥多摩駅前）',
    latitude: 35.8095,
    longitude: 139.0994,
    foodCultureIds: ['okutama-konnyaku', 'okutama-soba'],
    type: 'shop',
    source: {
      name: '奥多摩観光協会',
      url: 'https://www.okutokanko.jp/',
      lastVerified: '2026-08-08',
    },
    origin: 'demo',
  },
  {
    id: 'kumma-hyakka-shop',
    nameJa: '青梅 くんまひゃっか店',
    nameEn: 'Ome Kumma Hyakka Shop',
    address: '東京都青梅市（青梅駅周辺）',
    latitude: 35.7881,
    longitude: 139.2757,
    foodCultureIds: ['kumma-hyakka-ome'],
    type: 'shop',
    source: {
      name: '青梅市',
      url: 'https://www.city.ome.tokyo.jp/',
      lastVerified: '2026-08-08',
    },
    origin: 'demo',
  },
  {
    id: 'uguisu-mochi-shop',
    nameJa: '青梅 和菓子店',
    nameEn: 'Ome Wagashi Shop',
    address: '東京都青梅市（青梅駅周辺）',
    latitude: 35.7874,
    longitude: 139.2745,
    foodCultureIds: ['uguisu-mochi-ome'],
    type: 'shop',
    source: {
      name: '青梅市観光協会',
      url: 'https://www.city.ome.tokyo.jp/',
      lastVerified: '2026-08-08',
    },
    origin: 'demo',
  },
  {
    id: 'hinode-yuzu-stand',
    nameJa: '日の出 ゆず直売所',
    nameEn: 'Hinode Yuzu Stand',
    address: '東京都西多摩郡日の出町（ゆず園周辺）',
    latitude: 35.7422,
    longitude: 139.2717,
    foodCultureIds: ['yuzu-hinode'],
    type: 'farm',
    source: {
      name: '日の出町',
      url: 'https://www.town.hinode.tokyo.jp/',
      lastVerified: '2026-08-08',
    },
    origin: 'demo',
  },
];
