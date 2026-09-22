import { describe, expect, it } from 'vitest';
import {
  foodCultures,
  places,
  getFoodCultureById,
  getPlaceById,
  getRelatedPlaces,
  getRelatedFoodCultures,
} from './index';
import { isWithinRadius, distanceInMeters } from '../lib/geo';
import {
  deriveVerificationStatus,
  recordVerificationStatus,
} from '../lib/verification';
import type { VerificationStatus } from './model';

const VERIFICATION_STATUSES: VerificationStatus[] = [
  'verified',
  'needs_confirmation',
  'stale',
  'conflict',
  'demo',
];

describe('seed data contract (#2)', () => {
  it('has at least 5 food cultures', () => {
    expect(foodCultures.length).toBeGreaterThanOrEqual(5);
  });

  it('has at least 5 places', () => {
    expect(places.length).toBeGreaterThanOrEqual(5);
  });

  it('every food culture id is unique', () => {
    const ids = foodCultures.map((fc) => fc.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every place id is unique', () => {
    const ids = places.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('food culture placeIds resolve to existing places', () => {
    for (const fc of foodCultures) {
      for (const placeId of fc.placeIds) {
        expect(getPlaceById(placeId), `missing place ${placeId} for ${fc.id}`).toBeDefined();
      }
    }
  });

  it('place foodCultureIds resolve to existing food cultures', () => {
    for (const p of places) {
      for (const fcId of p.foodCultureIds) {
        expect(getFoodCultureById(fcId), `missing food culture ${fcId} for ${p.id}`).toBeDefined();
      }
    }
  });

  it('every food culture and place carries provenance', () => {
    for (const fc of foodCultures) {
      expect(fc.sources.length, `${fc.id} has no sources`).toBeGreaterThan(0);
    }
    for (const p of places) {
      expect(p.source.name.length, `${p.id} has no source`).toBeGreaterThan(0);
    }
  });

  it('every seed record tracks sourceType / retrievedAt / originalId (#2 provenance AC)', () => {
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        expect(s.sourceType, `${fc.id} source missing sourceType`).toBeDefined();
        expect(s.retrievedAt, `${fc.id} source missing retrievedAt`).toBeDefined();
        expect(s.originalId, `${fc.id} source missing originalId`).toBeDefined();
      }
    }
    for (const p of places) {
      expect(p.source.sourceType, `${p.id} source missing sourceType`).toBeDefined();
      expect(p.source.retrievedAt, `${p.id} source missing retrievedAt`).toBeDefined();
      expect(p.source.originalId, `${p.id} source missing originalId`).toBeDefined();
      if (p.coordinateSource) {
        expect(p.coordinateSource.sourceType, `${p.id} coordinate source missing sourceType`).toBeDefined();
        expect(p.coordinateSource.retrievedAt, `${p.id} coordinate source missing retrievedAt`).toBeDefined();
        expect(p.coordinateSource.originalId, `${p.id} coordinate source missing originalId`).toBeDefined();
      }
      if (p.addressSource) {
        expect(p.addressSource.sourceType, `${p.id} address source missing sourceType`).toBeDefined();
        expect(p.addressSource.retrievedAt, `${p.id} address source missing retrievedAt`).toBeDefined();
        expect(p.addressSource.originalId, `${p.id} address source missing originalId`).toBeDefined();
      }
      for (const listing of p.visitorInformation?.menuListings ?? []) {
        expect(listing.source.sourceType, `${p.id} menu source missing sourceType`).toBeDefined();
        expect(listing.source.retrievedAt, `${p.id} menu source missing retrievedAt`).toBeDefined();
        expect(listing.source.originalId, `${p.id} menu source missing originalId`).toBeDefined();
      }
      for (const statement of p.visitorInformation?.yearEndClosure?.statements ?? []) {
        expect(statement.source.sourceType, `${p.id} conflict source missing sourceType`).toBeDefined();
        expect(statement.source.retrievedAt, `${p.id} conflict source missing retrievedAt`).toBeDefined();
        expect(statement.source.originalId, `${p.id} conflict source missing originalId`).toBeDefined();
      }
      for (const statement of p.visitorInformation?.phoneConflict?.statements ?? []) {
        expect(statement.source.sourceType, `${p.id} phone-conflict source missing sourceType`).toBeDefined();
        expect(statement.source.retrievedAt, `${p.id} phone-conflict source missing retrievedAt`).toBeDefined();
        expect(statement.source.originalId, `${p.id} phone-conflict source missing originalId`).toBeDefined();
      }
    }
  });

  it('keeps the tourism-office seed aligned with its checked source facts (#322)', () => {
    const tourismOffice = getPlaceById('okutama-tourism-office');

    expect(tourismOffice).toMatchObject({
      address: '東京都西多摩郡奥多摩町氷川210',
      source: {
        url: 'https://www.okutama.gr.jp/site/',
        retrievedAt: '2026-08-26',
        verificationStatus: 'needs_confirmation',
        originalId: 'okutama-tourism-office',
      },
    });
    expect(tourismOffice?.source).not.toHaveProperty('confirmedAt');
  });

  it('keeps Hikawa Valley and Oku-Hikawa Shrine source-backed without fabricating map precision (#329)', () => {
    const hikawaValley = getPlaceById('hikawa-valley');
    const shrine = getPlaceById('oku-hikawa-shrine');

    expect(hikawaValley).toMatchObject({
      locationKind: 'area',
      foodCultureIds: [],
      naturalArea: {
        locationDescriptionJa: '多摩川と日原川の合流地点を中心とする氷川渓谷遊歩道周辺',
        access: { stationJa: 'JR青梅線「奥多摩駅」', walkMinutes: 5 },
        trailDurationMinutes: { min: 40, max: 50 },
        safety: {
          noSwimmingInTamaRiver: true,
          avoidEnteringWaterDuringHighWater: true,
          currentInformationUrl: 'https://www.town.okutama.tokyo.jp/1/kankosangyoka/kankojoho/3/436.html',
        },
      },
      source: { originalId: 'hikawa-walking-map', retrievedAt: '2026-08-31' },
    });
    expect(hikawaValley).not.toHaveProperty('address');
    expect(hikawaValley).not.toHaveProperty('latitude');
    expect(hikawaValley).not.toHaveProperty('longitude');
    expect(getFoodCultureById('wasabi-okutama')?.placeIds).not.toContain('hikawa-valley');

    expect(shrine).toMatchObject({
      locationKind: 'address-only',
      address: '東京都西多摩郡奥多摩町氷川178番地',
      addressSource: {
        originalId: 'report-21-oku-hikawa-shrine',
        retrievedAt: '2026-08-31',
      },
    });
    expect(shrine).not.toHaveProperty('latitude');
    expect(shrine).not.toHaveProperty('longitude');
    expect(shrine).not.toHaveProperty('coordinateSource');
    expect(getFoodCultureById('wasabi-okutama')?.placeIds).not.toContain('oku-hikawa-shrine');
  });

  it('keeps Yamashiroya facts and the unresolved closure conflict in one canonical Place (#323)', () => {
    const yamashiroya = getPlaceById('yamashiroya');

    expect(yamashiroya).toMatchObject({
      nameJa: '奥多摩わさび本舗 山城屋',
      nameEn: 'Okutama Wasabi Honpo Yamashiroya',
      address: '東京都西多摩郡奥多摩町氷川717-3',
      latitude: 35.80679970833439,
      longitude: 139.0969139801638,
      coordinatePrecision: 'approximate',
      coordinateSource: {
        name: 'Google Maps（山城屋公式店舗案内の埋め込み地図）',
        url: 'https://www.google.com/maps/search/?api=1&query=35.80679970833439%2C139.0969139801638',
        sourceType: 'business',
        retrievedAt: '2026-08-28',
        verificationStatus: 'needs_confirmation',
        originalId: 'google-maps-0xdbddbe4d41df1fb8',
      },
      foodCultureIds: ['wasabi-okutama'],
      type: 'shop',
      origin: 'source',
      source: {
        name: '奥多摩わさび本舗 山城屋（公式店舗案内）',
        url: 'https://www.yamasiroya.co.jp/shop.html',
        sourceType: 'official_web',
        retrievedAt: '2026-08-28',
        verificationStatus: 'needs_confirmation',
        originalId: 'yamashiroya',
      },
      visitorInformation: {
        phone: '0428-83-2368',
        shopHours: { opens: '09:00', closes: '17:00' },
        phoneHours: {
          opens: '09:00',
          closes: '16:30',
          unavailableOn: ['sunday', 'public_holiday'],
        },
        access: { stationJa: 'JR「奥多摩駅」', walkMinutes: 3 },
        parking: { spaces: 12, largeVehicles: true },
        productCategories: ['pickled-wasabi', 'fresh-wasabi'],
        yearEndClosure: {
          verificationStatus: 'conflict',
          statements: [
            {
              value: '12月30日～1月4日',
              source: { url: 'https://www.yamasiroya.co.jp/shop.html' },
            },
            {
              value: '12月30日～1月5日',
              source: { url: 'https://www.yamasiroya.co.jp/' },
            },
          ],
        },
      },
    });
    expect(yamashiroya?.source.license).toContain('All Rights Reserved');
    expect(yamashiroya?.source).not.toHaveProperty('confirmedAt');
    expect(yamashiroya?.coordinateSource?.license).toContain('not open data');
    expect(yamashiroya?.coordinateSource?.license).toContain('not field-verified');
    expect(yamashiroya?.visitorInformation?.yearEndClosure?.statements).toHaveLength(2);
    expect(getFoodCultureById('wasabi-okutama')?.placeIds).toContain('yamashiroya');
  });

  it('keeps Okutama no Daidokoro facts in one canonical source-backed Place (#325)', () => {
    const kitchen = getPlaceById('okutama-kitchen');

    expect(kitchen).toMatchObject({
      nameJa: '手作りお弁当・お惣菜の専門店 奥多摩の台所',
      nameEn: 'Okutama no Daidokoro Handmade Bento & Deli',
      address: '〒198-0212 東京都西多摩郡奥多摩町氷川199-7',
      latitude: 35.8085659,
      longitude: 139.0971665,
      coordinatePrecision: 'approximate',
      coordinateSource: {
        sourceType: 'business',
        retrievedAt: '2026-08-28',
        verificationStatus: 'needs_confirmation',
      },
      foodCultureIds: ['wasabi-okutama'],
      type: 'shop',
      origin: 'source',
      source: {
        name: '奥多摩の台所（公式サイト）',
        url: 'https://www.okutamanodaidokoro.com/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-28',
        verificationStatus: 'needs_confirmation',
        originalId: 'okutama-kitchen-home',
      },
      visitorInformation: {
        phone: '0428-83-2401',
        shopHours: { opens: '09:00', closes: '18:00', lastOrder: '16:00' },
        access: { stationJa: 'JR青梅線「奥多摩駅」', walkMinutes: 1 },
        regularClosedDays: ['thursday'],
        parking: { available: false, nearbyPaidParking: true },
        menuListings: [
          {
            id: 'special-soft-gelato',
            nameJa: '特選ソフトジェラート',
            listedPriceYen: 500,
            flavorIds: [
              'caramelized-caramel',
              'vanilla-milk',
              'strawberry-milk',
              'black-sesame',
              'kyoto-matcha',
              'wasabi',
            ],
            source: {
              url: 'https://www.okutamanodaidokoro.com/menu.html',
              sourceType: 'official_web',
              retrievedAt: '2026-08-28',
              verificationStatus: 'needs_confirmation',
              originalId: 'okutama-kitchen-menu',
            },
          },
        ],
      },
    });
    expect(kitchen?.source.license).toContain('All Rights Reserved');
    expect(kitchen?.source).not.toHaveProperty('confirmedAt');
    expect(kitchen?.coordinateSource?.license).toContain('not field-verified');
    expect(kitchen?.visitorInformation?.menuListings?.[0].source.license).toContain(
      'All Rights Reserved',
    );
    expect(getFoodCultureById('wasabi-okutama')?.placeIds).toContain('okutama-kitchen');
  });

  it('keeps PORT OKUTAMA facts and per-field provenance in one canonical Place (#327)', () => {
    const portOkutama = getPlaceById('port-okutama');

    expect(portOkutama).toMatchObject({
      nameJa: 'PORT OKUTAMA',
      nameEn: 'PORT OKUTAMA',
      address: '東京都西多摩郡奥多摩町氷川210（JR奥多摩駅2階）',
      latitude: 35.8091498,
      longitude: 139.0967189,
      coordinatePrecision: 'precise',
      coordinateSource: {
        name: 'OpenStreetMap（PORT OKUTAMA）',
        url: 'https://www.openstreetmap.org/node/6552267871',
        sourceType: 'open_data',
        retrievedAt: '2026-08-29',
        verificationStatus: 'needs_confirmation',
        originalId: 'node/6552267871',
      },
      addressSource: {
        name: 'JR東日本（PORT OKUTAMA）',
        url: 'https://www.jreast.co.jp/hachioji/ome-itsukaichi/spot/detail382787.html',
        sourceType: 'official_web',
        retrievedAt: '2026-08-29',
        verificationStatus: 'needs_confirmation',
        originalId: 'detail382787',
      },
      foodCultureIds: [],
      type: 'shop',
      origin: 'source',
      source: {
        name: 'PORT OKUTAMA（公式サイト）',
        url: 'https://www.okutama.ne.jp/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-29',
        verificationStatus: 'needs_confirmation',
        originalId: 'port-okutama-home',
      },
      visitorInformation: {
        phone: '0428-85-8630',
        shopHourSchedules: [
          { id: 'weekday', opens: '11:00', closes: '17:00', lastOrder: '16:30' },
          { id: 'weekend-holiday', opens: '11:00', closes: '17:30', lastOrder: '17:00' },
        ],
        irregularClosures: true,
        openDaily: true,
        serviceCategories: [
          'food-and-drink',
          'specialty-coffee',
          'craft-beer',
          'used-outdoor-goods',
          'souvenirs',
        ],
      },
    });
    expect(portOkutama?.source.license).toContain('reuse rights not stated');
    expect(portOkutama?.source).not.toHaveProperty('confirmedAt');
    expect(portOkutama?.addressSource?.license).toContain('reuse rights not stated');
    expect(portOkutama?.coordinateSource?.license).toContain('ODbL 1.0');
  });

  it('keeps Akabeko facts and both first-party phone lineages in one canonical Place (#326)', () => {
    const akabeko = getPlaceById('akabeko');

    expect(akabeko).toMatchObject({
      nameJa: '炉ばた あかべこ',
      nameEn: 'Robata Akabeko',
      address: '〒198-0212 東京都西多摩郡奥多摩町氷川1446',
      latitude: 35.8080949,
      longitude: 139.0955012,
      coordinatePrecision: 'precise',
      coordinateSource: {
        name: 'OpenStreetMap（旅館 荒澤屋）',
        url: 'https://www.openstreetmap.org/node/4916080538',
        sourceType: 'open_data',
        retrievedAt: '2026-08-29',
        verificationStatus: 'needs_confirmation',
        originalId: 'node/4916080538',
      },
      foodCultureIds: [],
      type: 'restaurant',
      origin: 'source',
      source: {
        name: '炉ばた あかべこ（公式サイト）',
        url: 'https://akabeko.tokyo/',
        sourceType: 'official_web',
        retrievedAt: '2026-08-29',
        verificationStatus: 'needs_confirmation',
        originalId: 'akabeko-home',
      },
      visitorInformation: {
        mealHourSchedules: [
          { id: 'lunch', opens: '11:30', lastOrder: '13:30' },
          { id: 'dinner', opens: '18:00', lastOrder: '20:00' },
        ],
        irregularClosures: true,
        reservationPolicy: {
          requirement: 'recommended',
          reasonIds: ['limited-seating', 'busy-periods-may-fill'],
        },
        productCategories: [
          'okutama-yamame-sashimi',
          'okutama-yamame-charcoal-grill',
          'handmade-konnyaku-sashimi',
          'wasabi-gelato',
        ],
        phoneConflict: {
          verificationStatus: 'conflict',
          statements: [
            {
              id: 'akabeko-home-shared-contact',
              number: '050-5304-3644',
              role: 'reservation_inquiry',
              scope: 'shared_business_group',
              placeRoutingStatus: 'unresolved',
              source: { url: 'https://akabeko.tokyo/' },
            },
            {
              id: 'akabeko-news-shared-contact',
              number: '0428-83-2365',
              role: 'reservation_inquiry',
              scope: 'shared_business_group',
              placeRoutingStatus: 'unresolved',
              source: { url: 'https://akabeko.tokyo/news' },
            },
            {
              id: 'arasawaya-reservation-inquiry',
              number: '0428-83-2365',
              role: 'reservation_inquiry',
              scope: 'related_business',
              placeRoutingStatus: 'unresolved',
              source: { url: 'https://arasawaya.co.jp/contact/' },
            },
          ],
        },
      },
    });
    expect(akabeko?.source.license).toContain('All Rights Reserved');
    expect(akabeko?.source).not.toHaveProperty('confirmedAt');
    expect(akabeko?.visitorInformation).not.toHaveProperty('phone');
    expect(akabeko?.coordinateSource?.license).toContain('ODbL 1.0');
  });

  it('models Wasabi Shokudo as a mobile food truck without fixed-location fields (#324)', () => {
    const wasabiKitchen = getPlaceById('wasabi-kitchen');

    expect(wasabiKitchen).toMatchObject({
      nameJa: 'わさび食堂',
      nameEn: 'Wasabi Shokudo',
      locationKind: 'mobile',
      type: 'food-truck',
      foodCultureIds: ['wasabi-okutama'],
      origin: 'source',
      source: {
        url: 'https://tokyowasabi.com/foodtruck/',
        retrievedAt: '2026-08-29',
        verificationStatus: 'needs_confirmation',
      },
      mobileVenue: {
        noFixedStorefront: true,
        primaryOperatingAreaJa: 'JR青梅線「奥多摩駅」前を中心',
        primaryOperatingAreaEn: 'Mainly around the front of JR Okutama Station',
        primaryOperatingAreaZhTw: '主要在 JR 奧多摩站前一帶出攤',
        operatingPattern: 'mainly-weekends',
        scheduleVariability: ['published-schedule', 'weather', 'sell-out'],
        scheduleDirectorySource: {
          url: 'https://tokyowasabi.com/category/information/',
          retrievedAt: '2026-08-29',
        },
        datedScheduleSource: {
          url: 'https://tokyowasabi.com/information/2751/260728/',
          sourceUpdatedAt: '2026-07-28',
          retrievedAt: '2026-08-29',
        },
        scheduleConflict: {
          verificationStatus: 'conflict',
          statements: [
            {
              id: 'august-schedule-event-dates',
              value: '2026-08-07〜2026-08-09',
              source: { url: 'https://tokyowasabi.com/information/2751/260728/' },
            },
            {
              id: 'hitoshi-event-dates',
              value: '2026-08-08〜2026-08-10',
              source: { url: 'https://tokyowasabi.com/hitoshi/2573/fussa-tanabata-challenge/' },
            },
          ],
        },
      },
      visitorInformation: {
        menuListings: [
          {
            id: 'wasabi-don',
            nameJa: 'わさび丼',
            listedPriceYen: 900,
            source: {
              url: 'https://tokyowasabi.com/wasabi-don/',
              sourceUpdatedAt: '2026-07-30',
              retrievedAt: '2026-08-29',
            },
          },
        ],
      },
    });
    expect(wasabiKitchen).not.toHaveProperty('address');
    expect(wasabiKitchen).not.toHaveProperty('latitude');
    expect(wasabiKitchen).not.toHaveProperty('longitude');
  });

  it('keeps the refreshed Ome/Sawai facts on the canonical public seed seam (#348)', () => {
    const culture = getFoodCultureById('sake-ome');
    const ozawa = getPlaceById('sawai-ozawa-shuzo');
    const sawanoien = getPlaceById('sawanoien-garden');

    expect(`${culture?.storyJa} ${culture?.storyEn}`).not.toMatch(
      /(?:この土地|地元|local|land(?:'s)?)の?(?:水と)?米|local rice/i,
    );
    expect(`${culture?.makerJa} ${culture?.makerEn}`).not.toMatch(/蔵の井|Kura no I/i);
    expect(culture?.sources.find((source) => source.originalId === 'ozawa-shuzo')).toMatchObject({
      retrievedAt: '2026-08-29',
      verificationStatus: 'needs_confirmation',
    });
    expect(ozawa).toMatchObject({
      address: '東京都青梅市沢井2-770',
      source: {
        retrievedAt: '2026-08-29',
        verificationStatus: 'needs_confirmation',
      },
      visitorInformation: {
        access: { stationJa: 'JR青梅線「沢井駅」', walkMinutes: 5 },
      },
    });
    expect(ozawa?.visitorInformation).not.toHaveProperty('phone');
    expect(sawanoien).toMatchObject({
      source: {
        retrievedAt: '2026-08-29',
        verificationStatus: 'needs_confirmation',
      },
      visitorInformation: {
        shopHours: { opens: '10:00', closes: '17:00' },
        regularClosedDays: ['monday'],
        irregularClosures: true,
      },
    });
    expect(sawanoien?.visitorInformation).not.toHaveProperty('phone');
  });

  it('models WASABI EXPERIENCE physical meeting details separately from culture grouping (#328)', () => {
    const experience = getPlaceById('wasabi-experience');

    expect(experience).toMatchObject({
      address: '〒198-0147 東京都青梅市御岳1-192-4',
      coordinatePrecision: 'approximate',
      foodCultureIds: ['wasabi-okutama'],
      source: {
        url: 'https://tokyowasabi.com/wasabi-experience/',
        retrievedAt: '2026-08-30',
        verificationStatus: 'needs_confirmation',
      },
      visitorInformation: {
        access: {
          stationJa: 'JR青梅線「御嶽駅」',
          walkMinutes: 7,
        },
        experienceTour: {
          seasonalMeetingTimes: [
            { season: 'may-september', time: '08:30' },
            { season: 'october-april', time: '11:00' },
          ],
          meetingTimeMayChange: true,
          confirmationEmailProvidesExactMeetingTime: true,
          durationConflict: {
            verificationStatus: 'conflict',
            statements: [
              expect.objectContaining({
                id: 'japanese-page',
                durationMinutes: { min: 120, max: 150 },
                source: expect.objectContaining({
                  url: 'https://tokyowasabi.com/wasabi-experience/',
                }),
              }),
              expect.objectContaining({
                id: 'english-page',
                durationMinutes: { min: 120, max: 120 },
                source: expect.objectContaining({
                  url: 'https://tokyowasabi.com/wasabi-experience-en/',
                }),
              }),
            ],
          },
          privateGroupsPerDay: 1,
          reservationRequired: true,
          bookingUrl: 'https://tokyowasabi.com/wasabi-experience/#booking-form',
          listedPrice: {
            amountYen: 19500,
            taxIncluded: true,
            conditionalPrice: {
              amountYen: 14500,
              eligibility: 'japan-resident-and-japanese-conversation',
            },
            surcharge: {
              amountYen: 5000,
              appliesOn: expect.arrayContaining(['weekends', 'public-holidays']),
            },
          },
          weekendHolidayAvailability: 'request-only',
          weatherMayCancelOrPostpone: true,
        },
      },
    });
    expect(experience?.coordinateSource?.url).toContain('google.com/maps/search/');
    expect(getFoodCultureById('wasabi-okutama')?.placeIds).toContain('wasabi-experience');
  });

  it('relation helpers return the linked records', () => {
    const wasabi = getFoodCultureById('wasabi-okutama');
    expect(wasabi).toBeDefined();
    expect(getRelatedPlaces(wasabi!).length).toBeGreaterThan(0);

    const firstPlace = getPlaceById(wasabi!.placeIds[0]);
    expect(firstPlace).toBeDefined();
    expect(getRelatedFoodCultures(firstPlace!)).toContain(wasabi);
  });

  it('keeps every Place ↔ FoodCulture relationship symmetric (#127)', () => {
    // Shared consumers traverse from FoodCulture.placeIds (FoodCulturePage,
    // map) AND from Place.foodCultureIds (SpotPage, check-in). A one-way link
    // makes one side invisible, so every pair must agree:
    //   place.foodCultureIds includes culture.id  ⟺  culture.placeIds includes place.id
    // The canonical seed is intentionally fully symmetric, including the
    // retained demo fixtures (okutama-soba-shop ↔ okutama-soba etc.). Any
    // future intentional asymmetric demo fixture must be documented at its
    // definition site rather than silently accepted here.
    for (const fc of foodCultures) {
      for (const placeId of fc.placeIds) {
        const place = getPlaceById(placeId);
        expect(place, `${fc.id} → missing place ${placeId}`).toBeDefined();
        expect(place!.foodCultureIds, `${fc.id} → ${placeId} missing back-ref`).toContain(fc.id);
      }
    }
    for (const place of places) {
      for (const fcId of place.foodCultureIds) {
        const fc = getFoodCultureById(fcId);
        expect(fc, `${place.id} → missing culture ${fcId}`).toBeDefined();
        expect(fc!.placeIds, `${place.id} → ${fcId} missing back-ref`).toContain(place.id);
      }
    }
  });

  it('registers the Hachioji ginger slice as source-backed Tokyo-wide data (#238)', () => {
    const culture = getFoodCultureById('hachioji-ginger');
    expect(culture).toMatchObject({
      area: 'hachioji',
      category: 'produce',
      origin: 'editorial',
      placeIds: ['hachioji-takiyama-roadside-station'],
    });
    expect(culture?.sources.map((source) => source.sourceType)).toContain('official_web');

    const market = getPlaceById('hachioji-takiyama-roadside-station');
    expect(market).toMatchObject({
      type: 'shop',
      origin: 'source',
      foodCultureIds: ['hachioji-ginger'],
      coordinatePrecision: 'approximate',
    });
    expect(market?.source.url).toMatch(/^https:\/\//);
    expect(market?.source.verificationStatus).toBe('needs_confirmation');
    expect(market?.coordinateSource).toMatchObject({
      name: 'OpenStreetMap',
      license: 'ODbL 1.0',
      originalId: 'geocoded-hachioji-takiyama-roadside-station',
    });
    expect(market?.coordinateSource).toMatchObject({
      name: 'OpenStreetMap',
      sourceType: 'open_data',
      license: 'ODbL 1.0',
      retrievedAt: '2026-08-19',
    });
    expect(market?.coordinateSource?.url).toContain('openstreetmap.org');

    const heritage = getPlaceById('hachioji-takiyama-castle');
    expect(heritage).toMatchObject({
      foodCultureIds: [],
      origin: 'source',
      coordinatePrecision: 'approximate',
    });
    expect(heritage?.source.sourceDatasetId).toBe('t132012d3000000018');
    expect(heritage?.source.license).toBe('CC BY 4.0');
    expect(heritage?.coordinateSource?.license).toBe('ODbL 1.0');
    expect(heritage?.coordinateSource?.url).toContain('openstreetmap.org');
  });

  it('every source timestamp is a parseable ISO date (#129)', () => {
    const dates: string[] = [];
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        if (s.sourceUpdatedAt) dates.push(s.sourceUpdatedAt);
        if (s.confirmedAt) dates.push(s.confirmedAt);
        if (s.retrievedAt) dates.push(s.retrievedAt);
      }
    }
    for (const p of places) {
      if (p.source.sourceUpdatedAt) dates.push(p.source.sourceUpdatedAt);
      if (p.source.confirmedAt) dates.push(p.source.confirmedAt);
      if (p.source.retrievedAt) dates.push(p.source.retrievedAt);
      if (p.coordinateSource?.sourceUpdatedAt) dates.push(p.coordinateSource.sourceUpdatedAt);
      if (p.coordinateSource?.confirmedAt) dates.push(p.coordinateSource.confirmedAt);
      if (p.coordinateSource?.retrievedAt) dates.push(p.coordinateSource.retrievedAt);
      for (const listing of p.visitorInformation?.menuListings ?? []) {
        if (listing.source.sourceUpdatedAt) dates.push(listing.source.sourceUpdatedAt);
        if (listing.source.confirmedAt) dates.push(listing.source.confirmedAt);
        if (listing.source.retrievedAt) dates.push(listing.source.retrievedAt);
      }
      for (const statement of p.visitorInformation?.yearEndClosure?.statements ?? []) {
        if (statement.source.sourceUpdatedAt) dates.push(statement.source.sourceUpdatedAt);
        if (statement.source.confirmedAt) dates.push(statement.source.confirmedAt);
        if (statement.source.retrievedAt) dates.push(statement.source.retrievedAt);
      }
      for (const statement of p.visitorInformation?.phoneConflict?.statements ?? []) {
        if (statement.source.sourceUpdatedAt) dates.push(statement.source.sourceUpdatedAt);
        if (statement.source.confirmedAt) dates.push(statement.source.confirmedAt);
        if (statement.source.retrievedAt) dates.push(statement.source.retrievedAt);
      }
    }
    for (const d of dates) {
      expect(Number.isNaN(Date.parse(d)), `${d} is not parseable`).toBe(false);
      // Date-only ISO strings are stable to compare lexicographically.
      expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('sourceUpdatedAt is absent from seed records unless the publisher supplies it (#129)', () => {
    // sourceUpdatedAt means the source document's own update date. Keep an
    // explicit allow-list for publisher markers observed on current sources;
    // do not infer or copy dates for other records.
    const publisherSuppliedSourceIds = new Set([
      'fussa-tokyo-sake-brewery-1005934',
      'fussa-water-heritage-course-1004236',
      'kurumiru-fussa-1001605',
      'akiruno-specialty-foods-1109',
      'akiruno-farmers-center-3556',
      'gotokyo-seoto-no-yu-397',
      'kurumiru-fussa-honcho23',
      'wasabi-experience-page-1343',
      'hikawa-walking-map',
      '436',
      'report-21-oku-hikawa-shrine',
    ]);
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        if (s.sourceUpdatedAt) {
          expect(
            publisherSuppliedSourceIds.has(s.originalId ?? ''),
            `${fc.id} source has an unsupported sourceUpdatedAt`,
          ).toBe(true);
        }
      }
    }
    for (const p of places) {
      if (p.source.sourceUpdatedAt) {
        expect(
          publisherSuppliedSourceIds.has(p.source.originalId ?? ''),
          `${p.id} source has an unsupported sourceUpdatedAt`,
        ).toBe(true);
      }
      if (p.coordinateSource?.sourceUpdatedAt) {
        expect(
          publisherSuppliedSourceIds.has(p.coordinateSource.originalId ?? ''),
          `${p.id} coordinate source has an unsupported sourceUpdatedAt`,
        ).toBe(true);
      }
    }
  });

  it('retrievedAt is never equaled to sourceUpdatedAt by copying (#129)', () => {
    // Where sourceUpdatedAt exists it must be a real publisher update date,
    // not a copy of retrievedAt (see the absent test above for current seed).
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        if (s.sourceUpdatedAt && s.retrievedAt) {
          expect(
            s.sourceUpdatedAt === s.retrievedAt,
            `${fc.id} sourceUpdatedAt copies retrievedAt`,
          ).toBe(false);
        }
      }
    }
    for (const p of places) {
      const s = p.source;
      if (s.sourceUpdatedAt && s.retrievedAt) {
        expect(s.sourceUpdatedAt === s.retrievedAt, `${p.id} sourceUpdatedAt copies retrievedAt`).toBe(
          false,
        );
      }
      const coordinateSource = p.coordinateSource;
      if (coordinateSource?.sourceUpdatedAt && coordinateSource.retrievedAt) {
        expect(
          coordinateSource.sourceUpdatedAt === coordinateSource.retrievedAt,
          `${p.id} coordinate sourceUpdatedAt copies retrievedAt`,
        ).toBe(false);
      }
    }
  });

  it('confirmedAt never precedes the source update (#129)', () => {
    for (const fc of foodCultures) {
      for (const s of fc.sources) {
        if (s.confirmedAt && s.sourceUpdatedAt) {
          expect(
            s.confirmedAt >= s.sourceUpdatedAt,
            `${fc.id}: confirmedAt ${s.confirmedAt} < sourceUpdatedAt ${s.sourceUpdatedAt}`,
          ).toBe(true);
        }
      }
    }
    for (const p of places) {
      const s = p.source;
      if (s.confirmedAt && s.sourceUpdatedAt) {
        expect(s.confirmedAt >= s.sourceUpdatedAt, `${p.id} confirmedAt precedes source update`).toBe(
          true,
        );
      }
    }
  });

  it('verification status derives to a closed, safe union for every record (#129)', () => {
    for (const fc of foodCultures) {
      const status = recordVerificationStatus(fc.sources, fc.origin);
      expect(VERIFICATION_STATUSES, `${fc.id} → ${status}`).toContain(status);
    }
    for (const p of places) {
      const status = deriveVerificationStatus(p.source, p.origin);
      expect(VERIFICATION_STATUSES, `${p.id} → ${status}`).toContain(status);
    }
  });

  it('demo fixtures are never derived as verified production facts (#129)', () => {
    for (const p of places) {
      if (p.origin === 'demo') {
        expect(
          deriveVerificationStatus(p.source, p.origin),
          `${p.id} demo place must not be verified`,
        ).toBe('demo');
      }
    }
  });
});

describe('geo helpers', () => {
  it('distance between identical coordinates is 0', () => {
    expect(distanceInMeters(35.8, 139.1, 35.8, 139.1)).toBe(0);
  });

  it('approximately 1 degree of latitude is ~111 km', () => {
    const d = distanceInMeters(35.8, 139.1, 36.8, 139.1);
    expect(d).toBeGreaterThan(110000);
    expect(d).toBeLessThan(112000);
  });

  it('isWithinRadius is true inside and false outside', () => {
    expect(isWithinRadius(35.8, 139.1, 35.8005, 139.1, 500)).toBe(true);
    expect(isWithinRadius(35.8, 139.1, 35.82, 139.1, 500)).toBe(false);
  });
});
