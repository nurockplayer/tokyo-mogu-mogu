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
  ],
};
