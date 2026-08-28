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

/**
 * Review evidence only. Entries reference #333 claim IDs and never duplicate or
 * alter canonical/displayed factual values, provenance, or verification state.
 */
export const DATA_VERIFICATION_EVIDENCE_MANIFEST: DataVerificationEvidenceManifest = {
  evidence: [
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
  ],
};
