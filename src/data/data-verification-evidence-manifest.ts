export type DataVerificationEvidenceKind = 'source' | 'app' | 'fieldwork';
export type DataVerificationEvidenceLocale = 'ja' | 'en' | 'zh-TW';

interface DataVerificationEvidenceBase {
  evidenceId: string;
  claimIds: readonly string[];
  entityId: string;
  capturedAt: string;
  path: string;
  note?: string;
}

export interface DataVerificationSourceEvidence extends DataVerificationEvidenceBase {
  kind: 'source';
  sourceUrl: string;
}

export interface DataVerificationAppEvidence extends DataVerificationEvidenceBase {
  kind: 'app';
  locale: DataVerificationEvidenceLocale;
  viewport: {
    width: number;
    height?: number;
  };
  appCommit?: string;
}

export interface DataVerificationFieldworkEvidence extends DataVerificationEvidenceBase {
  kind: 'fieldwork';
}

export type DataVerificationEvidence =
  | DataVerificationSourceEvidence
  | DataVerificationAppEvidence
  | DataVerificationFieldworkEvidence;

export interface DataVerificationEvidenceOmission {
  omissionId: string;
  claimIds: readonly string[];
  entityId: string;
  kind: 'source';
  sourceUrl: string;
  recordedAt: string;
  reason: string;
}

export interface DataVerificationEvidenceManifest {
  evidence: readonly DataVerificationEvidence[];
  omissions: readonly DataVerificationEvidenceOmission[];
}

const AKABEKO_EVIDENCE_LOCALES = ['ja', 'en', 'zh-TW'] as const;

const AKABEKO_SPOT_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  AKABEKO_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `akabeko-app-${locale}-375`,
    claimIds: [
      `place:akabeko:name:${locale}`,
      `place:akabeko:address:${locale}`,
      `place:akabeko:phone:${locale}`,
      locale === 'ja' ? 'spot:akabeko:hours' : `place:akabeko:hours:${locale}`,
      locale === 'ja' ? 'spot:akabeko:closed_days' : `place:akabeko:closed_days:${locale}`,
      locale === 'ja' ? 'spot:akabeko:reservation' : `place:akabeko:reservation:${locale}`,
      locale === 'ja' ? 'spot:akabeko:price_availability' : `place:akabeko:price_availability:${locale}`,
      locale === 'ja' ? 'spot:akabeko:official_current_url' : `place:akabeko:official_current_url:${locale}`,
      `spot:akabeko:presentation:verification_note:${locale}`,
    ],
    entityId: 'akabeko',
    kind: 'app',
    capturedAt: '2026-08-29',
    path: `docs/data-evidence/akabeko/app-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 1800 },
    note: `Final #326 ${locale} Spot state showing both first-party phone values, their unresolved routing semantics, hours, closures, reservation guidance, menu examples, and current-information caveats.`,
  }));

const AKABEKO_RELATED_SURFACES = [
  {
    surface: 'route-wasabi',
    entityId: 'okutama-wasabi-journey',
    claimId: 'route:okutama-wasabi-journey:full-day:step:akabeko:factual:last-order-time',
    localizedClaimId: 'route:okutama-wasabi-journey:full-day:step:akabeko:guidance',
  },
  {
    surface: 'route-yamame',
    entityId: 'okutama-yamame-journey',
    claimId: 'route:okutama-yamame-journey:half-day:step:akabeko:factual:dish-availability',
    localizedClaimId: 'route:okutama-yamame-journey:half-day:step:akabeko:guidance',
  },
  {
    surface: 'story-wasabi',
    entityId: 'wasabi-okutama',
    claimId: 'story:wasabi-okutama:story.spot.akabeko.menu-availability',
    localizedClaimId: 'story:wasabi-okutama:presentation:spot_group:nearby',
  },
  {
    surface: 'story-yamame',
    entityId: 'yamame-okutama',
    claimId: 'story:yamame-okutama:story.spot.akabeko.dish-availability',
    localizedClaimId: 'story:yamame-okutama:presentation:spot_group:nearby',
  },
] as const;

const AKABEKO_RELATED_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  AKABEKO_RELATED_SURFACES.flatMap((surface) =>
    AKABEKO_EVIDENCE_LOCALES.map((locale) => ({
      evidenceId: `akabeko-${surface.surface}-${locale}-375`,
      claimIds: [surface.claimId, `${surface.localizedClaimId}:${locale}`],
      entityId: surface.entityId,
      kind: 'app' as const,
      capturedAt: '2026-08-29',
      path: `docs/data-evidence/akabeko/${surface.surface}-${locale}-375.webp`,
      locale,
      viewport: { width: 375, height: 812 },
      note: `Final #326 ${locale} ${surface.surface} state retained for human review of canonical-derived meaning and 375px wrapping.`,
    })),
  );

const WASABI_KITCHEN_EVIDENCE_LOCALES = ['ja', 'en', 'zh-TW'] as const;

const WASABI_KITCHEN_SPOT_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  WASABI_KITCHEN_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `wasabi-kitchen-app-${locale}-375`,
    claimIds: [
      locale === 'ja' ? 'spot:wasabi-kitchen:venue_model' : `place:wasabi-kitchen:venue_model:${locale}`,
      locale === 'ja' ? 'spot:wasabi-kitchen:operating_area' : `place:wasabi-kitchen:operating_area:${locale}`,
      locale === 'ja' ? 'spot:wasabi-kitchen:schedule_guidance' : `place:wasabi-kitchen:schedule_guidance:${locale}`,
      locale === 'ja' ? 'spot:wasabi-kitchen:schedule_url' : `place:wasabi-kitchen:schedule_url:${locale}`,
      locale === 'ja' ? 'spot:wasabi-kitchen:schedule_conflict' : `place:wasabi-kitchen:schedule_conflict:${locale}`,
      locale === 'ja' ? 'spot:wasabi-kitchen:price_availability' : `place:wasabi-kitchen:price_availability:${locale}`,
      locale === 'ja' ? 'spot:wasabi-kitchen:official_current_url' : `place:wasabi-kitchen:official_current_url:${locale}`,
      `spot:wasabi-kitchen:presentation:verification_note:${locale}`,
    ],
    entityId: 'wasabi-kitchen',
    kind: 'app',
    capturedAt: '2026-08-29',
    path: `docs/data-evidence/wasabi-kitchen/app-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 1372 },
    note: `Final #324 ${locale} Spot state showing mobile/no-fixed-storefront semantics, primary operating area, current-schedule guidance, dated price, and unresolved schedule conflict at 375px.`,
  }));

const WASABI_KITCHEN_ROUTE_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  WASABI_KITCHEN_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `wasabi-kitchen-route-app-${locale}-375`,
    claimIds: [
      `route:okutama-wasabi-journey:half-day:step:wasabi-kitchen:guidance:${locale}`,
      'route:okutama-wasabi-journey:half-day:step:wasabi-kitchen:factual:venue-model',
      'route:okutama-wasabi-journey:half-day:step:wasabi-kitchen:factual:weekend-operation',
      'route:okutama-wasabi-journey:half-day:step:wasabi-kitchen:factual:wasabi-don-reference-price',
    ],
    entityId: 'okutama-wasabi-journey',
    kind: 'app',
    capturedAt: '2026-08-29',
    path: `docs/data-evidence/wasabi-kitchen/route-app-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 812 },
    note: `Final #324 ${locale} half-day Route card showing source-derived mobile, current-schedule, and dated-price guidance without fixed walking geometry or weekday fallback.`,
  }));

const WASABI_KITCHEN_STORY_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  WASABI_KITCHEN_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `wasabi-kitchen-story-app-${locale}-375`,
    claimIds: [
      'story:wasabi-okutama:story.spot.wasabi-kitchen.venue-model',
      'story:wasabi-okutama:story.spot.wasabi-kitchen.weekend-operation',
      `story:wasabi-okutama:presentation:spot_group:nearby:reference:wasabi-kitchen:badge:${locale}`,
    ],
    entityId: 'wasabi-okutama',
    kind: 'app',
    capturedAt: '2026-08-29',
    path: `docs/data-evidence/wasabi-kitchen/story-app-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 812 },
    note: `Final #324 ${locale} Story card showing the FOOD TRUCK identity, no-fixed-storefront semantics, and current-schedule caveat at 375px.`,
  }));

/**
 * Review evidence only. Entries reference #333 claim IDs and never duplicate or
 * alter canonical/displayed factual values, provenance, or verification state.
 */
export const DATA_VERIFICATION_EVIDENCE_MANIFEST: DataVerificationEvidenceManifest = {
  evidence: [
    ...WASABI_KITCHEN_SPOT_APP_EVIDENCE,
    ...WASABI_KITCHEN_ROUTE_APP_EVIDENCE,
    ...WASABI_KITCHEN_STORY_APP_EVIDENCE,
    ...AKABEKO_SPOT_APP_EVIDENCE,
    ...AKABEKO_RELATED_APP_EVIDENCE,
    {
      evidenceId: 'okutama-tourism-office-app-ja-375',
      claimIds: [
        'place:okutama-tourism-office:information_name:ja',
        'place:okutama-tourism-office:address:ja',
        'place:okutama-tourism-office:phone:ja',
        'spot:okutama-tourism-office:presentation:verification_note:ja',
      ],
      entityId: 'okutama-tourism-office',
      kind: 'app',
      capturedAt: '2026-08-27',
      path: 'docs/data-evidence/okutama-tourism-office/app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      appCommit: 'e79899dd600cbd6c56e287207f8223970e62a528',
      note: 'Current post-PR #335 Spot practical-information state at the 375px baseline.',
    },
    {
      evidenceId: 'yamashiroya-app-ja-375',
      claimIds: [
        'place:yamashiroya:name:ja',
        'place:yamashiroya:information_name:ja',
        'place:yamashiroya:address:ja',
        'place:yamashiroya:phone:ja',
        'place:yamashiroya:hours:ja',
        'place:yamashiroya:phone_hours:ja',
        'place:yamashiroya:access:ja',
        'place:yamashiroya:parking:ja',
        'place:yamashiroya:price_availability:ja',
        'place:yamashiroya:closed_days:ja',
        'place:yamashiroya:official_current_url:ja',
      ],
      entityId: 'yamashiroya',
      kind: 'app',
      capturedAt: '2026-08-28',
      path: 'docs/data-evidence/yamashiroya/app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 1100 },
      note: 'Final #323 Japanese Spot practical-information state reached through the full-day Route after the shared canonical and presentation data changes.',
    },
    {
      evidenceId: 'yamashiroya-route-app-ja-375',
      claimIds: [
        'route:okutama-wasabi-journey:full-day:step:yamashiroya:guidance:ja',
        'route:okutama-wasabi-journey:full-day:step:yamashiroya:factual:product-availability',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'app',
      capturedAt: '2026-08-28',
      path: 'docs/data-evidence/yamashiroya/route-app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      note: 'Final #323 Japanese full-day Route card showing the canonical-derived Yamashiroya product presentation.',
    },
    {
      evidenceId: 'yamashiroya-story-wasabi-app-ja-375',
      claimIds: [
        'story:wasabi-okutama:story.spot.yamashiroya.product-availability',
      ],
      entityId: 'wasabi-okutama',
      kind: 'app',
      capturedAt: '2026-08-28',
      path: 'docs/data-evidence/yamashiroya/story-wasabi-app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      note: 'Final #323 Japanese wasabi Story card showing the canonical-derived Yamashiroya identity and products.',
    },
    {
      evidenceId: 'yamashiroya-story-yamame-app-ja-375',
      claimIds: [
        'story:yamame-okutama:story.spot.yamashiroya.product-availability',
      ],
      entityId: 'yamame-okutama',
      kind: 'app',
      capturedAt: '2026-08-28',
      path: 'docs/data-evidence/yamashiroya/story-yamame-app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      note: 'Final #323 Japanese yamame Story card showing the canonical-derived Yamashiroya identity and products.',
    },
    {
      evidenceId: 'okutama-kitchen-app-ja-375',
      claimIds: [
        'place:okutama-kitchen:name:ja',
        'place:okutama-kitchen:information_name:ja',
        'place:okutama-kitchen:address:ja',
        'place:okutama-kitchen:phone:ja',
        'spot:okutama-kitchen:hours',
        'spot:okutama-kitchen:access',
        'spot:okutama-kitchen:closed_days',
        'spot:okutama-kitchen:parking',
        'spot:okutama-kitchen:price_availability',
        'spot:okutama-kitchen:official_current_url',
      ],
      entityId: 'okutama-kitchen',
      kind: 'app',
      capturedAt: '2026-08-28',
      path: 'docs/data-evidence/okutama-kitchen/app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 1500 },
      note: 'Final #325 Japanese Spot practical-information state reached through the half-day Route after shared canonical and presentation data changes.',
    },
    {
      evidenceId: 'okutama-kitchen-route-app-ja-375',
      claimIds: [
        'route:okutama-wasabi-journey:half-day:step:okutama-kitchen:guidance:ja',
        'route:okutama-wasabi-journey:half-day:step:okutama-kitchen:factual:product-availability',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'app',
      capturedAt: '2026-08-28',
      path: 'docs/data-evidence/okutama-kitchen/route-app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      note: 'Final #325 Japanese half-day Route card showing the canonical-derived special soft gelato / wasabi-flavor presentation.',
    },
    {
      evidenceId: 'okutama-kitchen-story-wasabi-app-ja-375',
      claimIds: [
        'story:wasabi-okutama:story.spot.okutama-kitchen.product-availability',
      ],
      entityId: 'wasabi-okutama',
      kind: 'app',
      capturedAt: '2026-08-28',
      path: 'docs/data-evidence/okutama-kitchen/story-wasabi-app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      note: 'Final #325 Japanese wasabi Story card showing the canonical-derived special soft gelato / wasabi-flavor presentation.',
    },
    {
      evidenceId: 'port-okutama-app-ja-375',
      claimIds: [
        'place:port-okutama:name:ja',
        'place:port-okutama:address:ja',
        'place:port-okutama:phone:ja',
        'spot:port-okutama:hours',
        'spot:port-okutama:closed_days',
        'spot:port-okutama:service_availability',
        'spot:port-okutama:official_current_url',
      ],
      entityId: 'port-okutama',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 1500 },
      note: 'Final #327 Japanese Spot state showing source-backed identity, station-level address, split hours, irregular-closure caveat, services, and official reference URL.',
    },
    {
      evidenceId: 'port-okutama-app-en-375',
      claimIds: [
        'place:port-okutama:name:en',
        'place:port-okutama:address:en',
        'place:port-okutama:phone:en',
        'place:port-okutama:hours:en',
        'place:port-okutama:closed_days:en',
        'place:port-okutama:service_availability:en',
        'place:port-okutama:official_current_url:en',
      ],
      entityId: 'port-okutama',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/app-en-375.webp',
      locale: 'en',
      viewport: { width: 375, height: 1500 },
      note: 'Final #327 English Spot state retained for human review of localized meaning and 375px wrapping.',
    },
    {
      evidenceId: 'port-okutama-app-zh-TW-375',
      claimIds: [
        'place:port-okutama:name:zh-TW',
        'place:port-okutama:address:zh-TW',
        'place:port-okutama:phone:zh-TW',
        'place:port-okutama:hours:zh-TW',
        'place:port-okutama:closed_days:zh-TW',
        'place:port-okutama:service_availability:zh-TW',
        'place:port-okutama:official_current_url:zh-TW',
      ],
      entityId: 'port-okutama',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/app-zh-TW-375.webp',
      locale: 'zh-TW',
      viewport: { width: 375, height: 1500 },
      note: 'Final #327 Traditional Chinese Spot state retained for human review of localized meaning and 375px wrapping.',
    },
    {
      evidenceId: 'port-okutama-route-half-day-app-ja-375',
      claimIds: [
        'route:okutama-wasabi-journey:half-day:step:port-okutama:factual:service-availability',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/route-half-day-app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      note: 'Final #327 Japanese half-day Route card showing the canonical-derived PORT OKUTAMA service presentation.',
    },
    {
      evidenceId: 'port-okutama-route-half-day-app-en-375',
      claimIds: [
        'route:okutama-wasabi-journey:half-day:step:port-okutama:factual:service-availability',
        'route:okutama-wasabi-journey:half-day:step:port-okutama:guidance:en',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/route-half-day-app-en-375.webp',
      locale: 'en',
      viewport: { width: 375, height: 812 },
      note: 'Final #327 English half-day Route card retained for human review of localized meaning and 375px wrapping.',
    },
    {
      evidenceId: 'port-okutama-route-half-day-app-zh-TW-375',
      claimIds: [
        'route:okutama-wasabi-journey:half-day:step:port-okutama:factual:service-availability',
        'route:okutama-wasabi-journey:half-day:step:port-okutama:guidance:zh-TW',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/route-half-day-app-zh-TW-375.webp',
      locale: 'zh-TW',
      viewport: { width: 375, height: 812 },
      note: 'Final #327 Traditional Chinese half-day Route card retained for human review of localized meaning and 375px wrapping.',
    },
    {
      evidenceId: 'port-okutama-route-full-day-app-ja-375',
      claimIds: [
        'route:okutama-wasabi-journey:full-day:step:port-okutama:factual:coffee-availability',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/route-full-day-app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      note: 'Final #327 Japanese full-day Route card showing the canonical-derived specialty-coffee presentation.',
    },
    {
      evidenceId: 'port-okutama-route-full-day-app-en-375',
      claimIds: [
        'route:okutama-wasabi-journey:full-day:step:port-okutama:factual:coffee-availability',
        'route:okutama-wasabi-journey:full-day:step:port-okutama:guidance:en',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/route-full-day-app-en-375.webp',
      locale: 'en',
      viewport: { width: 375, height: 812 },
      note: 'Final #327 English full-day Route card retained for human review of localized meaning and 375px wrapping.',
    },
    {
      evidenceId: 'port-okutama-route-full-day-app-zh-TW-375',
      claimIds: [
        'route:okutama-wasabi-journey:full-day:step:port-okutama:factual:coffee-availability',
        'route:okutama-wasabi-journey:full-day:step:port-okutama:guidance:zh-TW',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/route-full-day-app-zh-TW-375.webp',
      locale: 'zh-TW',
      viewport: { width: 375, height: 812 },
      note: 'Final #327 Traditional Chinese full-day Route card retained for human review of localized meaning and 375px wrapping.',
    },
    {
      evidenceId: 'port-okutama-story-wasabi-app-ja-375',
      claimIds: [
        'story:wasabi-okutama:story.spot.port-okutama.service-availability',
      ],
      entityId: 'wasabi-okutama',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/story-wasabi-app-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      note: 'Final #327 Japanese wasabi Story card showing the canonical-derived station-complex services.',
    },
    {
      evidenceId: 'port-okutama-story-wasabi-app-en-375',
      claimIds: [
        'story:wasabi-okutama:story.spot.port-okutama.service-availability',
        'story:wasabi-okutama:presentation:spot_group:nearby:reference:port-okutama:badge:en',
      ],
      entityId: 'wasabi-okutama',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/story-wasabi-app-en-375.webp',
      locale: 'en',
      viewport: { width: 375, height: 812 },
      note: 'Final #327 English wasabi Story card retained for human review of localized meaning and 375px wrapping.',
    },
    {
      evidenceId: 'port-okutama-story-wasabi-app-zh-TW-375',
      claimIds: [
        'story:wasabi-okutama:story.spot.port-okutama.service-availability',
        'story:wasabi-okutama:presentation:spot_group:nearby:reference:port-okutama:badge:zh-TW',
      ],
      entityId: 'wasabi-okutama',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/port-okutama/story-wasabi-app-zh-TW-375.webp',
      locale: 'zh-TW',
      viewport: { width: 375, height: 812 },
      note: 'Final #327 Traditional Chinese wasabi Story card retained for human review of localized meaning and 375px wrapping.',
    },
  ],
  omissions: [
    {
      omissionId: 'wasabi-kitchen-foodtruck-source-rights-restricted',
      claimIds: [
        'spot:wasabi-kitchen:venue_model',
        'spot:wasabi-kitchen:operating_area',
        'spot:wasabi-kitchen:official_current_url',
      ],
      entityId: 'wasabi-kitchen',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/foodtruck/',
      recordedAt: '2026-08-29',
      reason: 'TOKYO WASABI prohibits unauthorized reproduction and direct image linking; the first-party FOOD TRUCK page was rechecked without copying its text, photographs, logo, or screenshot.',
    },
    {
      omissionId: 'wasabi-kitchen-route-foodtruck-source-rights-restricted',
      claimIds: ['route:okutama-wasabi-journey:half-day:step:wasabi-kitchen:factual:venue-model'],
      entityId: 'okutama-wasabi-journey',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/foodtruck/',
      recordedAt: '2026-08-29',
      reason: 'The Route venue-model claim traces to the TOKYO WASABI page that prohibits unauthorized reproduction; no official-site capture is committed.',
    },
    {
      omissionId: 'wasabi-kitchen-story-foodtruck-source-rights-restricted',
      claimIds: ['story:wasabi-okutama:story.spot.wasabi-kitchen.venue-model'],
      entityId: 'wasabi-okutama',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/foodtruck/',
      recordedAt: '2026-08-29',
      reason: 'The Story venue-model claim traces to the TOKYO WASABI page that prohibits unauthorized reproduction; no official-site capture is committed.',
    },
    {
      omissionId: 'wasabi-kitchen-current-schedule-source-rights-restricted',
      claimIds: [
        'spot:wasabi-kitchen:schedule_guidance',
        'spot:wasabi-kitchen:schedule_url',
        'spot:wasabi-kitchen:schedule_conflict',
        'place:wasabi-kitchen:schedule_conflict:source:august-schedule-event-dates',
      ],
      entityId: 'wasabi-kitchen',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/information/2751/260728/',
      recordedAt: '2026-08-29',
      reason: 'TOKYO WASABI prohibits unauthorized reproduction and direct image linking; the current schedule and calendar were checked without copying or rehosting the page, calendar image, or photographs.',
    },
    {
      omissionId: 'wasabi-kitchen-route-schedule-source-rights-restricted',
      claimIds: ['route:okutama-wasabi-journey:half-day:step:wasabi-kitchen:factual:weekend-operation'],
      entityId: 'okutama-wasabi-journey',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/information/2751/260728/',
      recordedAt: '2026-08-29',
      reason: 'The Route schedule-guidance claim traces to the TOKYO WASABI schedule page that prohibits unauthorized reproduction; no page or calendar capture is committed.',
    },
    {
      omissionId: 'wasabi-kitchen-story-schedule-source-rights-restricted',
      claimIds: ['story:wasabi-okutama:story.spot.wasabi-kitchen.weekend-operation'],
      entityId: 'wasabi-okutama',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/information/2751/260728/',
      recordedAt: '2026-08-29',
      reason: 'The Story schedule-guidance claim traces to the TOKYO WASABI schedule page that prohibits unauthorized reproduction; no page or calendar capture is committed.',
    },
    {
      omissionId: 'wasabi-kitchen-wasabi-don-source-rights-restricted',
      claimIds: [
        'spot:wasabi-kitchen:price_availability',
      ],
      entityId: 'wasabi-kitchen',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/wasabi-don/',
      recordedAt: '2026-08-29',
      reason: 'TOKYO WASABI prohibits unauthorized reproduction; the July 2026 official reference price was recorded as provenance without copying page text, photography, or screenshots.',
    },
    {
      omissionId: 'wasabi-kitchen-route-wasabi-don-source-rights-restricted',
      claimIds: ['route:okutama-wasabi-journey:half-day:step:wasabi-kitchen:factual:wasabi-don-reference-price'],
      entityId: 'okutama-wasabi-journey',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/wasabi-don/',
      recordedAt: '2026-08-29',
      reason: 'The Route dated-price claim traces to the TOKYO WASABI page that prohibits unauthorized reproduction; no page or photograph is copied.',
    },
    {
      omissionId: 'wasabi-kitchen-hitoshi-event-source-rights-restricted',
      claimIds: [
        'spot:wasabi-kitchen:schedule_conflict',
        'place:wasabi-kitchen:schedule_conflict:source:hitoshi-event-dates',
      ],
      entityId: 'wasabi-kitchen',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/hitoshi/2573/fussa-tanabata-challenge/',
      recordedAt: '2026-08-29',
      reason: 'TOKYO WASABI prohibits unauthorized reproduction; the conflicting first-party event dates were retained as structured provenance without copying the page or its images.',
    },
    {
      omissionId: 'okutama-tourism-office-source-rights-restricted',
      claimIds: [
        'place:okutama-tourism-office:address:ja',
        'place:okutama-tourism-office:phone:ja',
      ],
      entityId: 'okutama-tourism-office',
      kind: 'source',
      sourceUrl: 'https://www.okutama.gr.jp/site/',
      recordedAt: '2026-08-27',
      reason: 'The repository source record is All Rights Reserved and permits reference use only; copying an official-site screenshot into the repository is not reasonably supportable.',
    },
    {
      omissionId: 'yamashiroya-source-rights-restricted',
      claimIds: [
        'place:yamashiroya:name:ja',
        'place:yamashiroya:address:ja',
        'place:yamashiroya:phone:ja',
        'place:yamashiroya:hours:ja',
        'place:yamashiroya:phone_hours:ja',
        'place:yamashiroya:access:ja',
        'place:yamashiroya:parking:ja',
        'place:yamashiroya:price_availability:ja',
        'place:yamashiroya:closed_days:ja',
        'place:yamashiroya:closed_days:source:shop',
        'place:yamashiroya:official_current_url:ja',
      ],
      entityId: 'yamashiroya',
      kind: 'source',
      sourceUrl: 'https://www.yamasiroya.co.jp/shop.html',
      recordedAt: '2026-08-28',
      reason: 'The official site states All Rights Reserved and provides no support for repository reuse; the first-party page was rechecked without copying its screenshot.',
    },
    {
      omissionId: 'yamashiroya-coordinate-source-rights-restricted',
      claimIds: ['place:yamashiroya:coordinates'],
      entityId: 'yamashiroya',
      kind: 'source',
      sourceUrl: 'https://www.google.com/maps/search/?api=1&query=35.80679970833439%2C139.0969139801638',
      recordedAt: '2026-08-28',
      reason: 'The coordinate is a Google Maps provider point from the operator page embed, not reusable open data or a field-verified location; no map-provider screenshot is committed.',
    },
    {
      omissionId: 'yamashiroya-homepage-source-rights-restricted',
      claimIds: [
        'place:yamashiroya:closed_days:ja',
        'place:yamashiroya:closed_days:source:homepage-footer',
      ],
      entityId: 'yamashiroya',
      kind: 'source',
      sourceUrl: 'https://www.yamasiroya.co.jp/',
      recordedAt: '2026-08-28',
      reason: 'The official homepage states All Rights Reserved and provides no support for repository reuse; its conflicting January 5 closure endpoint was recorded without copying a screenshot.',
    },
    {
      omissionId: 'okutama-kitchen-home-source-rights-restricted',
      claimIds: [
        'place:okutama-kitchen:name:ja',
        'place:okutama-kitchen:address:ja',
        'place:okutama-kitchen:phone:ja',
        'spot:okutama-kitchen:hours',
        'spot:okutama-kitchen:access',
        'spot:okutama-kitchen:closed_days',
        'spot:okutama-kitchen:parking',
        'spot:okutama-kitchen:official_current_url',
      ],
      entityId: 'okutama-kitchen',
      kind: 'source',
      sourceUrl: 'https://www.okutamanodaidokoro.com/',
      recordedAt: '2026-08-28',
      reason: 'The official site states All Rights Reserved and provides no support for repository screenshot reuse; the first-party operations page was rechecked without copying its screenshot.',
    },
    {
      omissionId: 'okutama-kitchen-menu-source-rights-restricted',
      claimIds: [
        'spot:okutama-kitchen:price_availability',
      ],
      entityId: 'okutama-kitchen',
      kind: 'source',
      sourceUrl: 'https://www.okutamanodaidokoro.com/menu.html',
      recordedAt: '2026-08-28',
      reason: 'The official menu states All Rights Reserved and provides no support for repository screenshot reuse; the menu page was rechecked without copying its screenshot or photographs.',
    },
    {
      omissionId: 'okutama-kitchen-route-menu-source-rights-restricted',
      claimIds: [
        'route:okutama-wasabi-journey:half-day:step:okutama-kitchen:factual:product-availability',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'source',
      sourceUrl: 'https://www.okutamanodaidokoro.com/menu.html',
      recordedAt: '2026-08-28',
      reason: 'The Route claim traces to the All Rights Reserved official menu; no official-menu screenshot or photograph is copied into the repository.',
    },
    {
      omissionId: 'okutama-kitchen-story-menu-source-rights-restricted',
      claimIds: [
        'story:wasabi-okutama:story.spot.okutama-kitchen.product-availability',
      ],
      entityId: 'wasabi-okutama',
      kind: 'source',
      sourceUrl: 'https://www.okutamanodaidokoro.com/menu.html',
      recordedAt: '2026-08-28',
      reason: 'The Story claim traces to the All Rights Reserved official menu; no official-menu screenshot or photograph is copied into the repository.',
    },
    {
      omissionId: 'okutama-kitchen-coordinate-source-rights-restricted',
      claimIds: ['place:okutama-kitchen:coordinates'],
      entityId: 'okutama-kitchen',
      kind: 'source',
      sourceUrl: 'https://www.google.com/maps/search/?api=1&query=35.8085659%2C139.0971665',
      recordedAt: '2026-08-28',
      reason: 'The coordinate is a Google Maps provider point resolved from the operator site map link, not reusable open data or a field-verified location; no map-provider screenshot is committed.',
    },
    {
      omissionId: 'port-okutama-operator-source-reuse-unconfirmed',
      claimIds: [
        'place:port-okutama:name:ja',
        'place:port-okutama:phone:ja',
        'spot:port-okutama:hours',
        'spot:port-okutama:closed_days',
        'spot:port-okutama:service_availability',
        'spot:port-okutama:official_current_url',
      ],
      entityId: 'port-okutama',
      kind: 'source',
      sourceUrl: 'https://www.okutama.ne.jp/',
      recordedAt: '2026-08-29',
      reason: 'The operator page provides no support for repository screenshot reuse; the first-party identity, operations, and service text was rechecked without copying its photographs or page capture.',
    },
    {
      omissionId: 'port-okutama-address-source-reuse-unconfirmed',
      claimIds: ['place:port-okutama:address:ja'],
      entityId: 'port-okutama',
      kind: 'source',
      sourceUrl: 'https://www.jreast.co.jp/hachioji/ome-itsukaichi/spot/detail382787.html',
      recordedAt: '2026-08-29',
      reason: 'The JR East page provides the textual station-level address but no support for repository screenshot reuse; it was rechecked without copying a page capture.',
    },
    {
      omissionId: 'port-okutama-coordinate-source-not-captured',
      claimIds: ['place:port-okutama:coordinates'],
      entityId: 'port-okutama',
      kind: 'source',
      sourceUrl: 'https://www.openstreetmap.org/node/6552267871',
      recordedAt: '2026-08-29',
      reason: 'The ODbL provider node and attribution are recorded in canonical provenance; a provider screenshot would not field-verify the location or add factual authority, so none is committed.',
    },
    {
      omissionId: 'port-okutama-route-source-reuse-unconfirmed',
      claimIds: [
        'route:okutama-wasabi-journey:half-day:step:port-okutama:factual:service-availability',
        'route:okutama-wasabi-journey:full-day:step:port-okutama:factual:coffee-availability',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'source',
      sourceUrl: 'https://www.okutama.ne.jp/',
      recordedAt: '2026-08-29',
      reason: 'The Route claims trace to the operator page, which provides no support for repository screenshot reuse; no official-site photograph or page capture is copied.',
    },
    {
      omissionId: 'port-okutama-story-source-reuse-unconfirmed',
      claimIds: [
        'story:wasabi-okutama:story.spot.port-okutama.service-availability',
      ],
      entityId: 'wasabi-okutama',
      kind: 'source',
      sourceUrl: 'https://www.okutama.ne.jp/',
      recordedAt: '2026-08-29',
      reason: 'The Story claim traces to the operator page, which provides no support for repository screenshot reuse; no official-site photograph or page capture is copied.',
    },
    {
      omissionId: 'akabeko-home-source-rights-restricted',
      claimIds: [
        'place:akabeko:name:ja',
        'place:akabeko:address:ja',
        'place:akabeko:phone:ja',
        'place:akabeko:phone:source:akabeko-home-shared-contact',
        'spot:akabeko:hours',
        'spot:akabeko:closed_days',
        'spot:akabeko:reservation',
        'spot:akabeko:price_availability',
        'spot:akabeko:official_current_url',
      ],
      entityId: 'akabeko',
      kind: 'source',
      sourceUrl: 'https://akabeko.tokyo/',
      recordedAt: '2026-08-29',
      reason: 'The official Akabeko site states All Rights Reserved and provides no support for repository screenshot or photography reuse; its current identity, operation, reservation, and menu text was rechecked without copying source media.',
    },
    {
      omissionId: 'akabeko-wasabi-route-source-rights-restricted',
      claimIds: ['route:okutama-wasabi-journey:full-day:step:akabeko:factual:last-order-time'],
      entityId: 'okutama-wasabi-journey',
      kind: 'source',
      sourceUrl: 'https://akabeko.tokyo/',
      recordedAt: '2026-08-29',
      reason: 'The Route last-order claim traces to the All Rights Reserved official Akabeko page; no official-site capture or photography is copied.',
    },
    {
      omissionId: 'akabeko-yamame-route-source-rights-restricted',
      claimIds: ['route:okutama-yamame-journey:half-day:step:akabeko:factual:dish-availability'],
      entityId: 'okutama-yamame-journey',
      kind: 'source',
      sourceUrl: 'https://akabeko.tokyo/',
      recordedAt: '2026-08-29',
      reason: 'The Route menu-availability claim traces to the All Rights Reserved official Akabeko page; no official-site capture or photography is copied.',
    },
    {
      omissionId: 'akabeko-wasabi-story-source-rights-restricted',
      claimIds: ['story:wasabi-okutama:story.spot.akabeko.menu-availability'],
      entityId: 'wasabi-okutama',
      kind: 'source',
      sourceUrl: 'https://akabeko.tokyo/',
      recordedAt: '2026-08-29',
      reason: 'The Story menu-availability claim traces to the All Rights Reserved official Akabeko page; no official-site capture or photography is copied.',
    },
    {
      omissionId: 'akabeko-yamame-story-source-rights-restricted',
      claimIds: ['story:yamame-okutama:story.spot.akabeko.dish-availability'],
      entityId: 'yamame-okutama',
      kind: 'source',
      sourceUrl: 'https://akabeko.tokyo/',
      recordedAt: '2026-08-29',
      reason: 'The Story dish-availability claim traces to the All Rights Reserved official Akabeko page; no official-site capture or photography is copied.',
    },
    {
      omissionId: 'akabeko-news-source-rights-restricted',
      claimIds: [
        'place:akabeko:phone:ja',
        'place:akabeko:phone:source:akabeko-news-shared-contact',
      ],
      entityId: 'akabeko',
      kind: 'source',
      sourceUrl: 'https://akabeko.tokyo/news',
      recordedAt: '2026-08-29',
      reason: 'The official news page states All Rights Reserved; its separately published 0428 shared-contact statement is retained as structured conflict provenance without copying a page capture.',
    },
    {
      omissionId: 'arasawaya-contact-source-rights-restricted',
      claimIds: [
        'place:akabeko:phone:ja',
        'place:akabeko:phone:source:arasawaya-reservation-inquiry',
      ],
      entityId: 'akabeko',
      kind: 'source',
      sourceUrl: 'https://arasawaya.co.jp/contact/',
      recordedAt: '2026-08-29',
      reason: 'The official Arasawaya site states All Rights Reserved; its reservation/inquiry number is retained as a separately traceable statement without copying a page capture or photographs.',
    },
    {
      omissionId: 'akabeko-coordinate-source-not-captured',
      claimIds: ['place:akabeko:coordinates'],
      entityId: 'akabeko',
      kind: 'source',
      sourceUrl: 'https://www.openstreetmap.org/node/4916080538',
      recordedAt: '2026-08-29',
      reason: 'The ODbL provider node identifies the co-located Arasawaya building and attribution is preserved canonically; a provider screenshot would not field-verify the first-floor restaurant, so none is committed.',
    },
  ],
};
