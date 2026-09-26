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

const OME_SAKE_EVIDENCE_LOCALES = ['ja', 'en', 'zh-TW'] as const;

const HACHIOJI_EVIDENCE_LOCALES = ['ja', 'en', 'zh-TW'] as const;

const FUSSA_EVIDENCE_LOCALES = ['ja', 'en', 'zh-TW'] as const;
type FussaEvidenceLocale = (typeof FUSSA_EVIDENCE_LOCALES)[number];

const FUSSA_CAPTURE_TIMES = {
  mogu: {
    ja: '10:59:15.679Z', en: '10:59:35.316Z', 'zh-TW': '10:59:57.537Z',
  },
  storyTop: {
    ja: '10:59:16.012Z', en: '10:59:35.559Z', 'zh-TW': '10:59:58.770Z',
  },
  storyChapters: {
    ja: '11:07:37.589Z', en: '11:07:40.414Z', 'zh-TW': '11:07:43.491Z',
  },
  routeUpper: {
    ja: '10:59:20.618Z', en: '10:59:40.063Z', 'zh-TW': '11:00:05.373Z',
  },
  routeHalfStats: {
    ja: '10:59:20.700Z', en: '10:59:40.129Z', 'zh-TW': '11:00:05.442Z',
  },
  routeFullStats: {
    ja: '10:59:20.964Z', en: '10:59:40.298Z', 'zh-TW': '11:00:05.643Z',
  },
  tamuraSpot: {
    ja: '10:59:22.207Z', en: '10:59:43.603Z', 'zh-TW': '11:00:07.813Z',
  },
  kurumiruSpot: {
    ja: '10:59:26.179Z', en: '10:59:49.451Z', 'zh-TW': '11:00:11.381Z',
  },
  ishikawaSpot: {
    ja: '10:59:32.037Z', en: '10:59:54.341Z', 'zh-TW': '11:00:16.203Z',
  },
  storyChapter2: {
    ja: '11:00:51.836Z', en: '11:00:55.549Z', 'zh-TW': '11:00:57.701Z',
  },
  storyChapter4: {
    ja: '11:00:52.957Z', en: '11:00:55.723Z', 'zh-TW': '11:00:57.806Z',
  },
} as const satisfies Record<string, Record<FussaEvidenceLocale, string>>;

const fussaCaptureUrl = (screen: string, frame: string): string => {
  if (screen === 'mogu') return 'http://localhost:4388/mogu';
  if (screen === 'story') {
    return frame === 'story-chapters' || frame === 'story-chapter-2' || frame === 'story-chapter-4'
      ? 'http://localhost:4388/story/sake-fussa?candidateId=demo-tokyo-west-fussa-sake'
      : 'http://localhost:4388/story/sake-fussa';
  }
  if (screen.startsWith('route')) return 'http://localhost:4388/route?candidateId=demo-tokyo-west-fussa-sake';
  return `http://localhost:4388/spot/${screen}?candidateId=demo-tokyo-west-fussa-sake`;
};

function fussaAppEvidence(input: {
  frame: string;
  screen: string;
  locale: FussaEvidenceLocale;
  capturedAt: string;
  claimIds: readonly string[];
  note: string;
}): DataVerificationAppEvidence {
  const url = fussaCaptureUrl(input.screen, input.frame);
  return {
    evidenceId: `fussa-sake-${input.frame}-${input.locale}-375`,
    claimIds: input.claimIds,
    entityId: input.screen === 'mogu' || input.screen.startsWith('route')
      ? 'fussa-sake-journey'
      : input.screen.startsWith('story')
        ? 'sake-fussa'
        : input.screen,
    kind: 'app',
    capturedAt: '2026-09-26',
    path: `docs/data-evidence/fussa-sake/${input.frame}-${input.locale}.png`,
    locale: input.locale,
    viewport: { width: 375, height: 812 },
    note: `#350 ${input.note} Captured at ${input.capturedAt} from ${url}. Ego-lite's external Shinkansen widget may appear and is not app content. Review evidence only; it does not establish source verification, media rights, or public reuse permission. No appCommit is asserted.`,
  };
}

const FUSSA_MOGU_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  FUSSA_EVIDENCE_LOCALES.map((locale) => fussaAppEvidence({
    frame: 'mogu',
    screen: 'mogu',
    locale,
    capturedAt: FUSSA_CAPTURE_TIMES.mogu[locale],
    claimIds: [
      `route:fussa-sake-journey:name:${locale}`,
      `route:fussa-sake-journey:mogu.factual.origin-access:${locale}`,
    ],
    note: `${locale} MOGU card with Fussa journey title, first-stop access, and pending-confirmation status at 375×812.`,
  }));

const FUSSA_STORY_TOP_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  FUSSA_EVIDENCE_LOCALES.map((locale) => fussaAppEvidence({
    frame: 'story-top',
    screen: 'story',
    locale,
    capturedAt: FUSSA_CAPTURE_TIMES.storyTop[locale],
    claimIds: [
      `story:sake-fussa:presentation:story_intro:${locale}`,
      ...(locale === 'en' ? [] : [`story:sake-fussa:presentation:story_title:${locale}`]),
      `story:sake-fussa:presentation:story_location:${locale}`,
    ],
    note: `${locale} Story opening view with the Fussa title, intro, and location. Chapter body claims are mapped to separate scrolled captures.`,
  }));

const FUSSA_STORY_CHAPTER_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  FUSSA_EVIDENCE_LOCALES.map((locale) => fussaAppEvidence({
    frame: 'story-chapters',
    screen: 'story',
    locale,
    capturedAt: FUSSA_CAPTURE_TIMES.storyChapters[locale],
    claimIds: [
      `story:sake-fussa:presentation:story_title:${locale}`,
      `story:sake-fussa:presentation:story_point:${locale}`,
      'story:sake-fussa:story.factual.brewery-founding-dates',
      'story:sake-fussa:story.factual.visit-conditions',
    ],
    note: `${locale} first chapter view with the fully visible section heading, founding-history point, and current-conditions caveat; the clipped second chapter is not claimed.`,
  }));

const FUSSA_STORY_CHAPTER_2_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  FUSSA_EVIDENCE_LOCALES.map((locale) => fussaAppEvidence({
    frame: 'story-chapter-2',
    screen: 'story',
    locale,
    capturedAt: FUSSA_CAPTURE_TIMES.storyChapter2[locale],
    claimIds: [
      'story:sake-fussa:story.factual.brewery-product-names',
      'story:sake-fussa:story.factual.visit-conditions',
    ],
    note: `${locale} second-chapter view with brewery product-name wording and a current operator-information caveat.`,
  }));

const FUSSA_STORY_CHAPTER_4_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  FUSSA_EVIDENCE_LOCALES.map((locale) => fussaAppEvidence({
    frame: 'story-chapter-4',
    screen: 'story',
    locale,
    capturedAt: FUSSA_CAPTURE_TIMES.storyChapter4[locale],
    claimIds: [
      'story:sake-fussa:story.factual.editorial-stop-order',
      'story:sake-fussa:story.factual.visit-conditions',
    ],
    note: `${locale} fourth-chapter view with the editorial Tamura→Kurumiru→Ishikawa sequence and a reminder to check current conditions.`,
  }));

const FUSSA_ROUTE_UPPER_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  FUSSA_EVIDENCE_LOCALES.map((locale) => {
    const visibleStops = locale === 'en'
      ? ['fussa-tamura-shuzo', 'fussa-kurumiru']
      : ['fussa-tamura-shuzo', 'fussa-kurumiru', 'fussa-ishikawa-shuzo'];
    return fussaAppEvidence({
      frame: 'route-upper',
      screen: 'route',
      locale,
      capturedAt: FUSSA_CAPTURE_TIMES.routeUpper[locale],
      claimIds: [
        `route:fussa-sake-journey:half-day:origin_travel_time_guidance:${locale}`,
        `route:fussa-sake-journey:half-day:operational_caution:${locale}`,
        ...visibleStops.flatMap((spotId) => [
          `route:fussa-sake-journey:half-day:stop:${spotId}:identity`,
          `route:fussa-sake-journey:half-day:step:${spotId}:guidance:${locale}`,
        ]),
      ],
      note: `${locale} half-day Route upper view with access/current-condition guidance and only the fully visible stop cards; the third card is excluded for English because it is clipped.`,
    });
  });

const fussaRouteStatsEvidence = (
  locale: FussaEvidenceLocale,
  variant: 'half-day' | 'full-day',
  capturedAt: string,
): DataVerificationAppEvidence => {
  const visibleStops = ['fussa-kurumiru', 'fussa-ishikawa-shuzo'];
  const canonicalVariant = variant === 'half-day' ? 'half-day' : '1-day';
  return fussaAppEvidence({
    frame: variant === 'half-day' ? 'route-half-stats' : 'route-full-stats',
    screen: 'route',
    locale,
    capturedAt,
    claimIds: [
      `route:fussa-sake-journey:${variant}:summary_time:${locale}`,
      `route:fussa-sake-journey:${variant}:summary_stop_count:${locale}`,
      `route:fussa-sake-journey:${canonicalVariant}:transport_summary`,
      ...visibleStops.flatMap((spotId) => [
        `route:fussa-sake-journey:${variant}:stop:${spotId}:identity`,
        `route:fussa-sake-journey:${variant}:step:${spotId}:guidance:${locale}`,
      ]),
    ],
    note: `${locale} ${variant} Route stats show the duration, three-stop count, transport estimate, and lower visible stop cards. The clipped first stop is not claimed by this frame.`,
  });
};

const FUSSA_ROUTE_STATS_APP_EVIDENCE: readonly DataVerificationAppEvidence[] = [
  ...FUSSA_EVIDENCE_LOCALES.map((locale) => fussaRouteStatsEvidence(
    locale, 'half-day', FUSSA_CAPTURE_TIMES.routeHalfStats[locale],
  )),
  ...FUSSA_EVIDENCE_LOCALES.map((locale) => fussaRouteStatsEvidence(
    locale, 'full-day', FUSSA_CAPTURE_TIMES.routeFullStats[locale],
  )),
];

const fussaSpotEvidence = (
  spotId: 'fussa-tamura-shuzo' | 'fussa-kurumiru' | 'fussa-ishikawa-shuzo',
  locale: FussaEvidenceLocale,
  capturedAt: string,
): DataVerificationAppEvidence => {
  const claimIds = [
    `spot:${spotId}:address`,
    `spot:${spotId}:access`,
    `spot:${spotId}:official_current_url`,
    `spot:${spotId}:presentation:verification_note:${locale}`,
  ];
  if (spotId === 'fussa-tamura-shuzo') claimIds.push(`spot:${spotId}:hours`);
  if (spotId === 'fussa-kurumiru') claimIds.push(`spot:${spotId}:hours`, `spot:${spotId}:closed_days`);
  return fussaAppEvidence({
    frame: `${spotId}-practical`,
    screen: spotId,
    locale,
    capturedAt,
    claimIds,
    note: spotId === 'fussa-tamura-shuzo'
      ? `${locale} Tamura practical view with canonical address/access, official URL, calendar-only hours guidance, and pending-confirmation notice.`
      : spotId === 'fussa-kurumiru'
        ? `${locale} Kurumiru practical view with address/access, 10:00–18:00 guidance, closure exceptions, source URL, and pending-confirmation notice.`
        : `${locale} Ishikawa practical view with canonical address/access, source URL, and pending-confirmation notice; no visitor hours are asserted.`,
  });
};

const FUSSA_SPOT_APP_EVIDENCE: readonly DataVerificationAppEvidence[] = [
  ...FUSSA_EVIDENCE_LOCALES.flatMap((locale) => [
    fussaSpotEvidence('fussa-tamura-shuzo', locale, FUSSA_CAPTURE_TIMES.tamuraSpot[locale]),
    fussaSpotEvidence('fussa-kurumiru', locale, FUSSA_CAPTURE_TIMES.kurumiruSpot[locale]),
    fussaSpotEvidence('fussa-ishikawa-shuzo', locale, FUSSA_CAPTURE_TIMES.ishikawaSpot[locale]),
  ]),
];

const HACHIOJI_MOGU_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  HACHIOJI_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `hachioji-ginger-mogu-${locale}-375`,
    claimIds: [
      `route:hachioji-ginger-journey:name:${locale}`,
      `route:hachioji-ginger-journey:mogu.factual.origin-access:${locale}`,
    ],
    entityId: 'hachioji-ginger-journey',
    kind: 'app',
    capturedAt: '2026-09-26',
    path: `docs/data-evidence/hachioji-ginger/mogu-app-${locale}-375.png`,
    locale,
    viewport: { width: 375, height: 812 },
    note: '#349 current MOGU Hachioji card at 375px, showing the pending-confirmation state and first-stop access sourced from the roadside station SpotDetail. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.',
  }));

const HACHIOJI_STORY_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  HACHIOJI_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `hachioji-ginger-story-${locale}-375`,
    claimIds: [
      `story:hachioji-ginger:presentation:story_intro:${locale}`,
      ...(locale === 'en' ? [] : [`story:hachioji-ginger:presentation:story_title:${locale}`]),
      `story:hachioji-ginger:presentation:story_location:${locale}`,
    ],
    entityId: 'hachioji-ginger',
    kind: 'app',
    capturedAt: '2026-09-26',
    path: `docs/data-evidence/hachioji-ginger/story-app-${locale}-375.png`,
    locale,
    viewport: { width: 375, height: 812 },
    note: `#349 current ${locale} Hachioji Story top view with intro and location at 375px; chapter body and seasonal callout are below the captured area${locale === 'en' ? ', including the English section heading, which is excluded' : ''}. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.`,
  }));

const HACHIOJI_STORY_CHAPTER_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  HACHIOJI_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `hachioji-ginger-story-chapters-${locale}-375`,
    claimIds: [`story:hachioji-ginger:presentation:story_point:${locale}`],
    entityId: 'hachioji-ginger',
    kind: 'app',
    capturedAt: '2026-09-26',
    path: `docs/data-evidence/hachioji-ginger/story-chapters-app-${locale}-375.png`,
    locale,
    viewport: { width: 375, height: 812 },
    note: `#349 ${locale} Story chapter view includes the history section and seasonal-stock callout. The aggregate ledger chapter claim covers additional content not visible in this frame, so only the visible callout claim is linked. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.`,
  }));

const HACHIOJI_HALF_DAY_DETAIL_APP_EVIDENCE: readonly DataVerificationAppEvidence[] = [
  {
    evidenceId: 'hachioji-route-half-day-stops-ja-375',
    claimIds: [
      'route:hachioji-ginger-journey:half-day:summary_time:ja',
      'route:hachioji-ginger-journey:half-day:summary_stop_count:ja',
      'route:hachioji-ginger-journey:half-day:stop_sequence',
      'route:hachioji-ginger-journey:half-day:stop:hachioji-takiyama-roadside-station:identity',
      'route:hachioji-ginger-journey:half-day:stop:hachioji-takiyama-castle:identity',
      'route:hachioji-ginger-journey:half-day:step:hachioji-takiyama-roadside-station:guidance:ja',
      'route:hachioji-ginger-journey:half-day:step:hachioji-takiyama-castle:guidance:ja',
      'route:hachioji-ginger-journey:half-day:transport_summary',
    ],
    entityId: 'hachioji-ginger-journey',
    kind: 'app',
    capturedAt: '2026-09-26',
    path: 'docs/data-evidence/hachioji-ginger/route-half-day-stops-app-ja-375.png',
    locale: 'ja',
    viewport: { width: 375, height: 812 },
    note: '#349 half-day Route detail at 375px shows both canonical stops, 145-minute editorial estimate, stop count, and displayed transport guidance. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.',
  },
  {
    evidenceId: 'hachioji-route-half-day-stats-ja-375',
    claimIds: [
      'route:hachioji-ginger-journey:half-day:summary_time:ja',
      'route:hachioji-ginger-journey:half-day:summary_stop_count:ja',
      'route:hachioji-ginger-journey:half-day:distance_guidance:ja',
    ],
    entityId: 'hachioji-ginger-journey',
    kind: 'app',
    capturedAt: '2026-09-26',
    path: 'docs/data-evidence/hachioji-ginger/route-half-day-stats-app-ja-375.png',
    locale: 'ja',
    viewport: { width: 375, height: 812 },
    note: '#349 half-day Route stats view at 375px documents the 145-minute editorial estimate and current travel-condition caveat. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.',
  },
  {
    evidenceId: 'hachioji-route-half-day-stops-en-375',
    claimIds: [
      'route:hachioji-ginger-journey:half-day:stop_sequence',
      'route:hachioji-ginger-journey:half-day:stop:hachioji-takiyama-roadside-station:identity',
      'route:hachioji-ginger-journey:half-day:stop:hachioji-takiyama-castle:identity',
      'route:hachioji-ginger-journey:half-day:step:hachioji-takiyama-roadside-station:guidance:en',
    ],
    entityId: 'hachioji-ginger-journey',
    kind: 'app',
    capturedAt: '2026-09-26',
    path: 'docs/data-evidence/hachioji-ginger/route-half-day-stops-app-en-375.png',
    locale: 'en',
    viewport: { width: 375, height: 812 },
    note: '#349 English half-day Route view shows both stop identities and the roadside-market guidance with Agency for Cultural Affairs attribution; lower summary stats are clipped. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.',
  },
  {
    evidenceId: 'hachioji-route-half-day-stops-zh-TW-375',
    claimIds: [
      'route:hachioji-ginger-journey:half-day:summary_time:zh-TW',
      'route:hachioji-ginger-journey:half-day:summary_stop_count:zh-TW',
      'route:hachioji-ginger-journey:half-day:stop_sequence',
      'route:hachioji-ginger-journey:half-day:stop:hachioji-takiyama-roadside-station:identity',
      'route:hachioji-ginger-journey:half-day:stop:hachioji-takiyama-castle:identity',
      'route:hachioji-ginger-journey:half-day:step:hachioji-takiyama-roadside-station:guidance:zh-TW',
      'route:hachioji-ginger-journey:half-day:step:hachioji-takiyama-castle:guidance:zh-TW',
    ],
    entityId: 'hachioji-ginger-journey',
    kind: 'app',
    capturedAt: '2026-09-26',
    path: 'docs/data-evidence/hachioji-ginger/route-half-day-stops-app-zh-TW-375.png',
    locale: 'zh-TW',
    viewport: { width: 375, height: 812 },
    note: '#349 Traditional Chinese half-day Route view shows both stops, the editorial duration/count, and both localized stop descriptions with cultural-agency attribution. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.',
  },
];

const HACHIOJI_FULL_DAY_DETAIL_APP_EVIDENCE: readonly DataVerificationAppEvidence[] = [
  {
    evidenceId: 'hachioji-route-full-day-stops-ja-375',
    claimIds: [
      'route:hachioji-ginger-journey:full-day:summary_time:ja',
      'route:hachioji-ginger-journey:full-day:summary_stop_count:ja',
      'route:hachioji-ginger-journey:full-day:stop_sequence',
      'route:hachioji-ginger-journey:full-day:stop:hachioji-takiyama-roadside-station:identity',
      'route:hachioji-ginger-journey:full-day:stop:hachioji-takiyama-castle:identity',
      'route:hachioji-ginger-journey:full-day:step:hachioji-takiyama-roadside-station:guidance:ja',
      'route:hachioji-ginger-journey:full-day:step:hachioji-takiyama-castle:guidance:ja',
      'route:hachioji-ginger-journey:1-day:transport_summary',
    ],
    entityId: 'hachioji-ginger-journey',
    kind: 'app',
    capturedAt: '2026-09-26',
    path: 'docs/data-evidence/hachioji-ginger/route-full-day-stops-app-ja-375.png',
    locale: 'ja',
    viewport: { width: 375, height: 812 },
    note: '#349 full-day Route detail at 375px shows both canonical stops, 220-minute editorial estimate, stop count, and displayed transport guidance. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.',
  },
  {
    evidenceId: 'hachioji-route-full-day-stats-ja-375',
    claimIds: [
      'route:hachioji-ginger-journey:full-day:summary_time:ja',
      'route:hachioji-ginger-journey:full-day:summary_stop_count:ja',
      'route:hachioji-ginger-journey:full-day:distance_guidance:ja',
    ],
    entityId: 'hachioji-ginger-journey',
    kind: 'app',
    capturedAt: '2026-09-26',
    path: 'docs/data-evidence/hachioji-ginger/route-full-day-stats-app-ja-375.png',
    locale: 'ja',
    viewport: { width: 375, height: 812 },
    note: '#349 full-day Route stats view at 375px documents the 220-minute editorial estimate and current travel-condition caveat. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.',
  },
];

const HACHIOJI_CASTLE_PRACTICAL_APP_EVIDENCE: DataVerificationAppEvidence = {
  evidenceId: 'hachioji-castle-practical-ja-375',
  claimIds: [
    'place:hachioji-takiyama-castle:name:ja',
    'spot:hachioji-takiyama-castle:address',
    'spot:hachioji-takiyama-castle:official_current_url',
    'spot:hachioji-takiyama-castle:presentation:verification_note:ja',
  ],
  entityId: 'hachioji-takiyama-castle',
  kind: 'app',
  capturedAt: '2026-09-26',
  path: 'docs/data-evidence/hachioji-ginger/castle-practical-app-ja-375.png',
  locale: 'ja',
  viewport: { width: 375, height: 812 },
  note: '#349 castle practical-information state shows published municipal area, catalog URL, and that the source row contains no coordinates. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.',
};

const HACHIOJI_ROUTE_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  HACHIOJI_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `hachioji-ginger-route-${locale}-375`,
    claimIds: [
      `route:hachioji-ginger-journey:name:${locale}`,
      ...(locale === 'ja' ? [
        'route:hachioji-ginger-journey:half-day:origin_travel_time_guidance:ja',
        'route:hachioji-ginger-journey:half-day:operational_caution:ja',
      ] : []),
    ],
    entityId: 'hachioji-ginger-journey',
    kind: 'app',
    capturedAt: '2026-09-26',
    path: `docs/data-evidence/hachioji-ginger/route-app-${locale}-375.png`,
    locale,
    viewport: { width: 375, height: 812 },
    note: `#349 current ${locale} Hachioji half-day Route first-stop view at 375px; screenshot evidence is limited to the visible roadside-market stop. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.`,
  }));

const HACHIOJI_MARKET_SPOT_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  HACHIOJI_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `hachioji-market-spot-${locale}-375`,
    claimIds: [
      `place:hachioji-takiyama-roadside-station:name:${locale}`,
      `place:hachioji-takiyama-roadside-station:address:${locale}`,
      locale === 'ja' ? 'spot:hachioji-takiyama-roadside-station:access' : `place:hachioji-takiyama-roadside-station:access:${locale}`,
      locale === 'ja' ? 'spot:hachioji-takiyama-roadside-station:hours' : `place:hachioji-takiyama-roadside-station:hours:${locale}`,
      locale === 'ja' ? 'spot:hachioji-takiyama-roadside-station:closed_days' : `place:hachioji-takiyama-roadside-station:closed_days:${locale}`,
      locale === 'ja' ? 'spot:hachioji-takiyama-roadside-station:official_current_url' : `place:hachioji-takiyama-roadside-station:official_current_url:${locale}`,
      `spot:hachioji-takiyama-roadside-station:presentation:verification_note:${locale}`,
    ],
    entityId: 'hachioji-takiyama-roadside-station',
    kind: 'app',
    capturedAt: '2026-09-26',
    path: `docs/data-evidence/hachioji-ginger/spot-app-${locale}-375.png`,
    locale,
    viewport: { width: 375, height: 812 },
    note: `#349 current ${locale} roadside-station Spot with source-backed access and practical details, seasonal-stock caveat, and pending-confirmation state at 375px. Captured through Ego-lite; its external browser widget may remain visible and is not app UI.`,
  }));

const OME_SAKE_STORY_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  OME_SAKE_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `ome-sake-story-${locale}-375`,
    claimIds: [
      'story:sake-ome:story.factual.nearest-station',
      'story:sake-ome:story.factual.tama-river-valley-context',
      `story:sake-ome:presentation:story_intro:${locale}`,
      `story:sake-ome:presentation:story_location:${locale}`,
    ],
    entityId: 'sake-ome',
    kind: 'app',
    capturedAt: '2026-08-29',
    path: `docs/data-evidence/ome-sake/story-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 812 },
    note: `Final #348 ${locale} Story state showing the current Sawai valley context, location, and nearest-station guidance at the 375px baseline.`,
  }));

const OME_SAKE_ROUTE_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  OME_SAKE_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `ome-sake-route-${locale}-375`,
    claimIds: [
      `route:ome-sawai-sake-journey:half-day:region_guidance:${locale}`,
      `route:ome-sawai-sake-journey:half-day:origin_travel_time_guidance:${locale}`,
      `route:ome-sawai-sake-journey:half-day:operational_caution:${locale}`,
      `route:ome-sawai-sake-journey:half-day:step:sawai-ozawa-shuzo:guidance:${locale}`,
      `route:ome-sawai-sake-journey:half-day:step:sawanoien-garden:transport_guidance:${locale}`,
    ],
    entityId: 'ome-sawai-sake-journey',
    kind: 'app',
    capturedAt: '2026-08-29',
    path: `docs/data-evidence/ome-sake/route-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 812 },
    note: `Final #348 ${locale} half-day Route state showing the current region, origin guidance, Ozawa Shuzo step, and editorial walk estimate at the 375px baseline.`,
  }));

const OME_SAKE_OZAWA_SPOT_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  OME_SAKE_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `ome-sake-spot-ozawa-${locale}-375`,
    claimIds: [
      `place:sawai-ozawa-shuzo:name:${locale}`,
      `spot:sawai-ozawa-shuzo:presentation:lead:${locale}`,
      `spot:sawai-ozawa-shuzo:presentation:description:${locale}`,
      `spot:sawai-ozawa-shuzo:presentation:tag:sake-brewery:${locale}`,
      `spot:sawai-ozawa-shuzo:presentation:tag:official-source:${locale}`,
      `spot:sawai-ozawa-shuzo:presentation:tag:confirmation-pending:${locale}`,
      `place:sawai-ozawa-shuzo:information_name:${locale}`,
      `place:sawai-ozawa-shuzo:address:${locale}`,
      locale === 'ja'
        ? 'spot:sawai-ozawa-shuzo:access'
        : `place:sawai-ozawa-shuzo:access:${locale}`,
    ],
    entityId: 'sawai-ozawa-shuzo',
    kind: 'app',
    capturedAt: '2026-08-29',
    path: `docs/data-evidence/ome-sake/spot-ozawa-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 812 },
    note: `Final #348 ${locale} Ozawa Shuzo Spot state showing the source-backed identity, address, access/tour guidance, and pending-confirmation presentation at the 375px baseline.`,
  }));

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

const WASABI_EXPERIENCE_EVIDENCE_LOCALES = ['ja', 'en', 'zh-TW'] as const;

const HIKAWA_LOCATION_SAFETY_EVIDENCE_LOCALES = ['ja', 'en', 'zh-TW'] as const;

const HIKAWA_VALLEY_SPOT_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  HIKAWA_LOCATION_SAFETY_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `hikawa-valley-app-${locale}-375`,
    claimIds: [
      `place:hikawa-valley:name:${locale}`,
      locale === 'ja' ? 'spot:hikawa-valley:water_safety' : `place:hikawa-valley:water_safety:${locale}`,
      locale === 'ja' ? 'spot:hikawa-valley:trail_duration' : `place:hikawa-valley:trail_duration:${locale}`,
      locale === 'ja'
        ? 'spot:hikawa-valley:current_safety_information_url'
        : `place:hikawa-valley:current_safety_information_url:${locale}`,
      `spot:hikawa-valley:presentation:safety_guidance:${locale}`,
      `spot:hikawa-valley:presentation:verification_note:${locale}`,
    ],
    entityId: 'hikawa-valley',
    kind: 'app',
    capturedAt: '2026-09-12',
    path: `docs/data-evidence/hikawa-location-safety/hikawa-valley-app-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 2300 },
    note: `Final #329 ${locale} Hikawa Valley Spot state showing natural-area semantics, no-swimming guidance, the current town-information path, and 375px wrapping.`,
  }));

const OKU_HIKAWA_SHRINE_SPOT_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  HIKAWA_LOCATION_SAFETY_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `oku-hikawa-shrine-app-${locale}-375`,
    claimIds: [
      `place:oku-hikawa-shrine:name:${locale}`,
      locale === 'ja'
        ? 'spot:oku-hikawa-shrine:address'
        : `place:oku-hikawa-shrine:address:${locale}`,
      locale === 'ja'
        ? 'spot:oku-hikawa-shrine:official_current_url'
        : `place:oku-hikawa-shrine:official_current_url:${locale}`,
      `spot:oku-hikawa-shrine:presentation:verification_note:${locale}`,
    ],
    entityId: 'oku-hikawa-shrine',
    kind: 'app',
    capturedAt: '2026-09-12',
    path: `docs/data-evidence/hikawa-location-safety/oku-hikawa-shrine-app-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 1800 },
    note: `Final #329 ${locale} Oku-Hikawa Shrine Spot state showing the institutional address provenance without an invented coordinate and 375px wrapping.`,
  }));

const HIKAWA_ROUTE_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  HIKAWA_LOCATION_SAFETY_EVIDENCE_LOCALES.flatMap((locale) => [
    {
      evidenceId: `hikawa-route-wasabi-${locale}-375`,
      claimIds: [
        `route:okutama-wasabi-journey:half-day:step:hikawa-valley:guidance:${locale}`,
        'route:okutama-wasabi-journey:half-day:step:hikawa-valley:factual:river-safety',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'app' as const,
      capturedAt: '2026-09-12',
      path: `docs/data-evidence/hikawa-location-safety/route-wasabi-${locale}-375.webp`,
      locale,
      viewport: { width: 375, height: 2400 },
      note: `Final #329 ${locale} half-day wasabi Route state showing the Hikawa Valley promenade instruction without an unsupported leg-time claim at the 375px baseline.`,
    },
    {
      evidenceId: `hikawa-route-yamame-${locale}-375`,
      claimIds: [
        `route:okutama-yamame-journey:half-day:step:hikawa-valley:guidance:${locale}`,
        'route:okutama-yamame-journey:half-day:step:hikawa-valley:factual:walk-duration',
        'route:okutama-yamame-journey:half-day:step:hikawa-valley:factual:river-safety',
      ],
      entityId: 'okutama-yamame-journey',
      kind: 'app' as const,
      capturedAt: '2026-09-12',
      path: `docs/data-evidence/hikawa-location-safety/route-yamame-${locale}-375.webp`,
      locale,
      viewport: { width: 375, height: 2200 },
      note: `Final #329 ${locale} half-day yamame Route state showing the 40–50 minute promenade guidance, swimming prohibition, and high-water/increased-flow water-entry caution at the 375px baseline.`,
    },
  ]);

const WASABI_EXPERIENCE_SPOT_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  WASABI_EXPERIENCE_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `wasabi-experience-app-${locale}-375`,
    claimIds: [
      'spot:wasabi-experience:region_grouping',
      `place:wasabi-experience:address:${locale}`,
      locale === 'ja' ? 'spot:wasabi-experience:access' : `place:wasabi-experience:access:${locale}`,
      locale === 'ja' ? 'spot:wasabi-experience:seasonal_meeting_times' : `place:wasabi-experience:seasonal_meeting_times:${locale}`,
      locale === 'ja' ? 'spot:wasabi-experience:tour_duration' : `place:wasabi-experience:tour_duration:${locale}`,
      locale === 'ja' ? 'spot:wasabi-experience:private_group_limit' : `place:wasabi-experience:private_group_limit:${locale}`,
      locale === 'ja' ? 'spot:wasabi-experience:reservation' : `place:wasabi-experience:reservation:${locale}`,
      locale === 'ja' ? 'spot:wasabi-experience:booking_destination' : `place:wasabi-experience:booking_destination:${locale}`,
      locale === 'ja' ? 'spot:wasabi-experience:tour_availability' : `place:wasabi-experience:tour_availability:${locale}`,
      locale === 'ja' ? 'spot:wasabi-experience:price_availability' : `place:wasabi-experience:price_availability:${locale}`,
      `spot:wasabi-experience:presentation:verification_note:${locale}`,
    ],
    entityId: 'wasabi-experience',
    kind: 'app',
    capturedAt: '2026-08-30',
    path: `docs/data-evidence/wasabi-experience/app-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 2600 },
    note: `Final #328 ${locale} tall 375px Spot state showing every mapped practical-information row, including the JP/EN duration conflict, booking semantics, dated price, availability, verification note, and cautions.`,
  }));

const WASABI_EXPERIENCE_ROUTE_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  WASABI_EXPERIENCE_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `wasabi-experience-route-app-${locale}-375`,
    claimIds: [
      `route:okutama-wasabi-journey:full-day:region_guidance:${locale}`,
      `route:okutama-wasabi-journey:full-day:step:mitake-station:guidance:${locale}`,
      `route:okutama-wasabi-journey:full-day:step:wasabi-experience:meeting_time:${locale}`,
      `route:okutama-wasabi-journey:full-day:step:wasabi-experience:guidance:${locale}`,
      'route:okutama-wasabi-journey:full-day:step:wasabi-experience:factual:tour-duration',
      'route:okutama-wasabi-journey:full-day:step:wasabi-experience:factual:daily-group-limit',
      'route:okutama-wasabi-journey:full-day:step:wasabi-experience:factual:tour-availability',
    ],
    entityId: 'okutama-wasabi-journey',
    kind: 'app',
    capturedAt: '2026-08-30',
    path: `docs/data-evidence/wasabi-experience/route-app-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 1600 },
    note: `Final #328 ${locale} tall 375px full-day Route state showing the complete Mitake and WASABI EXPERIENCE cards, including seasonal times, the JP/EN duration conflict, daily group limit, and availability caveat.`,
  }));

const WASABI_EXPERIENCE_STORY_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  WASABI_EXPERIENCE_EVIDENCE_LOCALES.map((locale) => ({
    evidenceId: `wasabi-experience-story-app-${locale}-375`,
    claimIds: [
      `story:wasabi-okutama:presentation:spot_group:nature:${locale}`,
      'story:wasabi-okutama:story.spot.wasabi-experience.reservation-requirement',
      'story:wasabi-okutama:story.spot.wasabi-experience.daily-group-limit',
    ],
    entityId: 'wasabi-okutama',
    kind: 'app',
    capturedAt: '2026-08-30',
    path: `docs/data-evidence/wasabi-experience/story-app-${locale}-375.webp`,
    locale,
    viewport: { width: 375, height: 812 },
    note: `Final #328 ${locale} Story card showing the Ome / Mitake meeting-place relationship to Okutama wasabi culture with booking and availability caveats.`,
  }));

/**
 * Review evidence only. Entries reference #333 claim IDs and never duplicate or
 * alter canonical/displayed factual values, provenance, or verification state.
 */
const ROUTE_AGGREGATE_APP_EVIDENCE: readonly DataVerificationAppEvidence[] =
  (['ja', 'en', 'zh-TW'] as const).flatMap((locale) => [
    ...([
      ['wasabi', 'okutama-wasabi-journey', 'half-day'],
      ['wasabi', 'okutama-wasabi-journey', 'full-day'],
      ['yamame', 'okutama-yamame-journey', 'half-day'],
    ] as const).flatMap(([name, entityId, variant]) =>
      (['access', 'summary'] as const).map((position) => ({
        evidenceId: `route-aggregate-${name}-${variant}-${locale}-${position}-375`,
        claimIds: (position === 'access'
          ? ['origin_travel_time_guidance', 'operational_caution']
          : ['summary_time', 'summary_stop_count', 'distance_guidance'])
          .map((field) => `route:${entityId}:${variant}:${field}:${locale}`),
        entityId,
        kind: 'app' as const,
        capturedAt: '2026-09-22',
        path: `docs/data-evidence/route-aggregates/${name}-${variant}-${locale}-${position}-375.webp`,
        locale,
        viewport: { width: 375, height: 812 },
        note: '#330 current production-bundle presentation. Counts include the start; timing is editorial. Capture does not verify route feasibility or grant media rights.',
      }))),
    ...(['wasabi', 'yamame'] as const).map((name) => ({
      evidenceId: `route-aggregate-result-${name}-${locale}-375`,
      claimIds: [`route:okutama-${name}-journey:presentation:result_origin_travel_time:${locale}`],
      entityId: `okutama-${name}-journey`,
      kind: 'app' as const,
      capturedAt: '2026-09-22',
      path: `docs/data-evidence/route-aggregates/result-${name}-${locale}-375.webp`,
      locale,
      viewport: { width: 375, height: 812 },
      note: '#330 shared approximate station-access guidance on Result, not a live timetable.',
    })),
  ]);

export const DATA_VERIFICATION_EVIDENCE_MANIFEST: DataVerificationEvidenceManifest = {
  evidence: [
    ...FUSSA_MOGU_APP_EVIDENCE,
    ...FUSSA_STORY_TOP_APP_EVIDENCE,
    ...FUSSA_STORY_CHAPTER_APP_EVIDENCE,
    ...FUSSA_STORY_CHAPTER_2_APP_EVIDENCE,
    ...FUSSA_STORY_CHAPTER_4_APP_EVIDENCE,
    ...FUSSA_ROUTE_UPPER_APP_EVIDENCE,
    ...FUSSA_ROUTE_STATS_APP_EVIDENCE,
    ...FUSSA_SPOT_APP_EVIDENCE,
    ...HACHIOJI_MOGU_APP_EVIDENCE,
    ...HACHIOJI_STORY_APP_EVIDENCE,
    ...HACHIOJI_STORY_CHAPTER_APP_EVIDENCE,
    ...HACHIOJI_ROUTE_APP_EVIDENCE,
    ...HACHIOJI_HALF_DAY_DETAIL_APP_EVIDENCE,
    ...HACHIOJI_FULL_DAY_DETAIL_APP_EVIDENCE,
    ...HACHIOJI_MARKET_SPOT_APP_EVIDENCE,
    HACHIOJI_CASTLE_PRACTICAL_APP_EVIDENCE,
    ...ROUTE_AGGREGATE_APP_EVIDENCE,
    ...HIKAWA_VALLEY_SPOT_APP_EVIDENCE,
    ...OKU_HIKAWA_SHRINE_SPOT_APP_EVIDENCE,
    ...HIKAWA_ROUTE_APP_EVIDENCE,
    ...WASABI_EXPERIENCE_SPOT_APP_EVIDENCE,
    ...WASABI_EXPERIENCE_ROUTE_APP_EVIDENCE,
    ...WASABI_EXPERIENCE_STORY_APP_EVIDENCE,
    ...WASABI_KITCHEN_SPOT_APP_EVIDENCE,
    ...WASABI_KITCHEN_ROUTE_APP_EVIDENCE,
    ...WASABI_KITCHEN_STORY_APP_EVIDENCE,
    {
      evidenceId: 'ome-sake-mogu-ja-375',
      claimIds: [
        'route:ome-sawai-sake-journey:name:ja',
        'route:ome-sawai-sake-journey:mogu.factual.origin-access:ja',
      ],
      entityId: 'ome-sawai-sake-journey',
      kind: 'app',
      capturedAt: '2026-08-29',
      path: 'docs/data-evidence/ome-sake/mogu-ja-375.webp',
      locale: 'ja',
      viewport: { width: 375, height: 812 },
      note: 'Final #348 Japanese MOGU card state showing the current canonical Ome / Sawai journey title, source-backed access, and visible pending-confirmation caveat at the 375px baseline.',
    },
    ...OME_SAKE_STORY_APP_EVIDENCE,
    ...OME_SAKE_ROUTE_APP_EVIDENCE,
    ...OME_SAKE_OZAWA_SPOT_APP_EVIDENCE,
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
      omissionId: 'hachioji-ja-source-page-capture-omitted',
      claimIds: [
        'food-culture:hachioji-ginger:source:edo-tokyo-vegetable-hachioji-ginger',
        'story:hachioji-ginger:presentation:story_chapters:ja',
      ],
      entityId: 'hachioji-ginger',
      kind: 'source',
      sourceUrl: 'https://www.tokyo-ja.or.jp/farm/edo/41.php',
      recordedAt: '2026-09-26',
      reason: 'The factual copy was rechecked and paraphrased from the JA source; no source-page screenshot or source photography is copied because reproduction rights are not established.',
    },
    {
      omissionId: 'hachioji-city-source-page-capture-omitted',
      claimIds: [
        'food-culture:hachioji-ginger:source:hachioji-food-culture-museum-p035222',
        'story:hachioji-ginger:presentation:story_chapters:en',
      ],
      entityId: 'hachioji-ginger',
      kind: 'source',
      sourceUrl: 'https://www.city.hachioji.tokyo.jp/kurashi/sangyo/004/003/p035222.html',
      recordedAt: '2026-09-26',
      reason: 'The city notice was rechecked and its facts paraphrased; no source-page screenshot or source photography is copied because reproduction rights are not established.',
    },
    {
      omissionId: 'hachioji-station-source-page-capture-omitted',
      claimIds: [
        'route:hachioji-ginger-journey:mogu.factual.origin-access:ja',
      ],
      entityId: 'hachioji-ginger-journey',
      kind: 'source',
      sourceUrl: 'https://www.michinoeki-hachioji.net/',
      recordedAt: '2026-09-26',
      reason: 'The station site was rechecked for access and practical details; no source-page screenshot or station photography is copied because reproduction rights are not established.',
    },
    {
      omissionId: 'hachioji-station-image-rights-unconfirmed',
      claimIds: ['spot:hachioji-takiyama-roadside-station:photo_reuse_permission'],
      entityId: 'hachioji-takiyama-roadside-station',
      kind: 'source',
      sourceUrl: 'https://www.michinoeki-hachioji.net/',
      recordedAt: '2026-09-26',
      reason: 'No permission to reproduce station photographs has been established; the app uses the current unavailable-media state and does not copy source photography.',
    },
    ...(['wasabi', 'yamame'] as const).map((name) => ({
      omissionId: `route-aggregate-${name}-go-tokyo-source-rights`,
      claimIds: (['ja', 'en', 'zh-TW'] as const).flatMap((locale) => [
        `route:okutama-${name}-journey:presentation:result_origin_travel_time:${locale}`,
        `route:okutama-${name}-journey:half-day:origin_travel_time_guidance:${locale}`,
      ]),
      entityId: `okutama-${name}-journey`,
      kind: 'source' as const,
      sourceUrl: 'https://www.gotokyo.org/en/destinations/outlying-area/okutama-and-around/index.html',
      recordedAt: '2026-09-22',
      reason: 'GO TOKYO planning guidance rechecked: Tokyo Station approximately 2h15 and Shinjuku approximately 2h to Okutama Station; page updated 2025-12-19. All Rights Reserved; source screenshot omitted. These are approximate rail estimates, not live departure-specific times.',
    })),
    {
      omissionId: 'route-aggregate-mitake-access-source-rights',
      claimIds: (['ja', 'en', 'zh-TW'] as const).map((locale) =>
        `route:okutama-wasabi-journey:full-day:origin_travel_time_guidance:${locale}`),
      entityId: 'okutama-wasabi-journey',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/wasabi-experience-en/',
      recordedAt: '2026-09-22',
      reason: 'Existing canonical meeting-place access source retained from #328; its source retrieval dates are unchanged. No reproduction permission is established, so no source screenshot is committed.',
    },
    {
      omissionId: 'route-aggregate-mitake-timetable-source-rights',
      claimIds: (['ja', 'en', 'zh-TW'] as const).map((locale) =>
        `route:okutama-wasabi-journey:full-day:origin_travel_time_guidance:${locale}`),
      entityId: 'okutama-wasabi-journey',
      kind: 'source',
      sourceUrl: 'https://timetables.jreast.co.jp/timetable/list1464.html',
      recordedAt: '2026-09-22',
      reason: 'JR station index rechecked: this is Mitake, not Okutama (list0368). Used only to identify the correct station; no fixed journey duration derived. Reproduction permission is unestablished, so no source screenshot is included.',
    },
    {
      omissionId: 'hikawa-valley-tourism-site-rights-restricted',
      claimIds: ['place:hikawa-valley:name:ja'],
      entityId: 'hikawa-valley',
      kind: 'source',
      sourceUrl: 'https://www.okutama.gr.jp/site/',
      recordedAt: '2026-09-12',
      reason: 'The Tourism Association site returned HTTP 200 when rechecked as publisher context for the named walking material; the place claim remains anchored to the PDF, and no homepage capture is committed because reuse rights are not stated.',
    },
    {
      omissionId: 'hikawa-valley-trail-source-rights-restricted',
      claimIds: [
        'place:hikawa-valley:location_area',
        'place:hikawa-valley:access',
        'spot:hikawa-valley:trail_duration',
      ],
      entityId: 'hikawa-valley',
      kind: 'source',
      sourceUrl: 'https://www.okutama.gr.jp/site/walking/pdf/hikawa.pdf',
      recordedAt: '2026-09-12',
      reason: 'The tourism-association PDF is All Rights Reserved; its trail location, station guidance, and 40–50 minute duration were rechecked without committing a source capture.',
    },
    {
      omissionId: 'hikawa-valley-safety-source-rights-restricted',
      claimIds: [
        'spot:hikawa-valley:water_safety',
        'place:hikawa-valley:current_safety_information_url',
      ],
      entityId: 'hikawa-valley',
      kind: 'source',
      sourceUrl: 'https://www.town.okutama.tokyo.jp/1/kankosangyoka/kankojoho/3/436.html',
      recordedAt: '2026-09-12',
      reason: 'Rechecked 2026-09-12: the municipal page’s 2026-09-11 notice reports an entrance closure from 16:00 due to increased flow. This is dated audit evidence only, not permanent Product closure truth; no source screenshot is committed because reuse rights are not stated.',
    },
    {
      omissionId: 'hikawa-route-yamame-trail-source-rights-restricted',
      claimIds: ['route:okutama-yamame-journey:half-day:step:hikawa-valley:factual:walk-duration'],
      entityId: 'okutama-yamame-journey',
      kind: 'source',
      sourceUrl: 'https://www.okutama.gr.jp/site/walking/pdf/hikawa.pdf',
      recordedAt: '2026-09-12',
      reason: 'The tourism-association PDF is All Rights Reserved; the source-backed 40–50 minute promenade duration is retained in the Route ledger without committing a source capture.',
    },
    {
      omissionId: 'hikawa-route-wasabi-safety-source-rights-restricted',
      claimIds: ['route:okutama-wasabi-journey:half-day:step:hikawa-valley:factual:river-safety'],
      entityId: 'okutama-wasabi-journey',
      kind: 'source',
      sourceUrl: 'https://www.town.okutama.tokyo.jp/1/kankosangyoka/kankojoho/3/436.html',
      recordedAt: '2026-09-12',
      reason: 'Rechecked 2026-09-12: the municipal page’s 2026-09-11 notice reports an entrance closure from 16:00 due to increased flow. This is dated audit evidence only, not permanent Product closure truth; no source screenshot is committed because reuse rights are not stated.',
    },
    {
      omissionId: 'hikawa-route-yamame-safety-source-rights-restricted',
      claimIds: ['route:okutama-yamame-journey:half-day:step:hikawa-valley:factual:river-safety'],
      entityId: 'okutama-yamame-journey',
      kind: 'source',
      sourceUrl: 'https://www.town.okutama.tokyo.jp/1/kankosangyoka/kankojoho/3/436.html',
      recordedAt: '2026-09-12',
      reason: 'Rechecked 2026-09-12: the municipal page’s 2026-09-11 notice reports an entrance closure from 16:00 due to increased flow. This is dated audit evidence only, not permanent Product closure truth; no source screenshot is committed because reuse rights are not stated.',
    },
    {
      omissionId: 'oku-hikawa-shrine-report-source-rights-restricted',
      claimIds: [
        'spot:oku-hikawa-shrine:address',
        'spot:oku-hikawa-shrine:official_current_url',
      ],
      entityId: 'oku-hikawa-shrine',
      kind: 'source',
      sourceUrl: 'https://musashiichinomiya-hikawa.or.jp/report/report_img/report21.pdf',
      recordedAt: '2026-09-12',
      reason: 'The shrine report is All Rights Reserved; its published 氷川一七八番地 address was rechecked without copying a PDF page or photography into the repository.',
    },
    {
      omissionId: 'wasabi-experience-source-rights-restricted',
      claimIds: [
        'place:wasabi-experience:address:ja',
        'spot:wasabi-experience:seasonal_meeting_times',
        'spot:wasabi-experience:tour_duration',
        'place:wasabi-experience:tour_duration:source:japanese-page',
        'spot:wasabi-experience:private_group_limit',
        'spot:wasabi-experience:reservation',
        'spot:wasabi-experience:booking_destination',
        'spot:wasabi-experience:tour_availability',
        'spot:wasabi-experience:price_availability',
        'spot:wasabi-experience:official_current_url',
      ],
      entityId: 'wasabi-experience',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/wasabi-experience/',
      recordedAt: '2026-08-30',
      reason: 'TOKYO WASABI prohibits unauthorized reproduction of site text and images; the first-party page was rechecked and paraphrased without copying its photographs, map, or page capture.',
    },
    {
      omissionId: 'wasabi-experience-route-source-rights-restricted',
      claimIds: [
        'route:okutama-wasabi-journey:full-day:step:wasabi-experience:factual:tour-duration',
        'route:okutama-wasabi-journey:full-day:step:wasabi-experience:factual:daily-group-limit',
        'route:okutama-wasabi-journey:full-day:step:wasabi-experience:factual:tour-availability',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/wasabi-experience/',
      recordedAt: '2026-08-30',
      reason: 'The Route claims trace to the TOKYO WASABI page, whose text and images may not be reproduced without permission; no source capture is committed.',
    },
    {
      omissionId: 'wasabi-experience-story-source-rights-restricted',
      claimIds: [
        'story:wasabi-okutama:story.spot.wasabi-experience.reservation-requirement',
        'story:wasabi-okutama:story.spot.wasabi-experience.daily-group-limit',
      ],
      entityId: 'wasabi-okutama',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/wasabi-experience/',
      recordedAt: '2026-08-30',
      reason: 'The Story claims trace to the TOKYO WASABI page, whose text and images may not be reproduced without permission; no source capture is committed.',
    },
    {
      omissionId: 'wasabi-experience-access-source-rights-restricted',
      claimIds: [
        'spot:wasabi-experience:access',
        'spot:wasabi-experience:tour_duration',
        'place:wasabi-experience:tour_duration:source:english-page',
      ],
      entityId: 'wasabi-experience',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/wasabi-experience-en/',
      recordedAt: '2026-08-30',
      reason: 'The official English page supports the station/walking-time summary and its conflicting two-hour duration statement but prohibits unauthorized reproduction; no source screenshot or photograph is committed.',
    },
    {
      omissionId: 'wasabi-experience-route-en-source-rights-restricted',
      claimIds: [
        'route:okutama-wasabi-journey:full-day:step:wasabi-experience:factual:tour-duration',
      ],
      entityId: 'okutama-wasabi-journey',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/wasabi-experience-en/',
      recordedAt: '2026-08-30',
      reason: 'The official English page carries the conflicting two-hour Route-duration statement but prohibits unauthorized reproduction; no source screenshot or photograph is committed.',
    },
    {
      omissionId: 'wasabi-experience-coordinate-source-rights-restricted',
      claimIds: ['place:wasabi-experience:coordinates'],
      entityId: 'wasabi-experience',
      kind: 'source',
      sourceUrl: 'https://www.google.com/maps/search/?api=1&query=35.798697%2C139.177867',
      recordedAt: '2026-08-30',
      reason: 'The coordinate is a Google Maps provider point from the operator page embed, not reusable open data or a field-verified point; no map-provider screenshot, photo, or review is committed.',
    },
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
      omissionId: 'wasabi-kitchen-august-schedule-source-rights-restricted',
      claimIds: [
        'spot:wasabi-kitchen:schedule_guidance',
        'spot:wasabi-kitchen:schedule_conflict',
        'place:wasabi-kitchen:schedule_conflict:source:august-schedule-event-dates',
      ],
      entityId: 'wasabi-kitchen',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/information/2751/260728/',
      recordedAt: '2026-08-29',
      reason: 'TOKYO WASABI prohibits unauthorized reproduction and direct image linking; the dated August 2026 schedule and calendar were retained as provenance without copying or rehosting the page, calendar image, or photographs.',
    },
    {
      omissionId: 'wasabi-kitchen-schedule-directory-source-rights-restricted',
      claimIds: ['spot:wasabi-kitchen:schedule_url'],
      entityId: 'wasabi-kitchen',
      kind: 'source',
      sourceUrl: 'https://tokyowasabi.com/category/information/',
      recordedAt: '2026-08-29',
      reason: 'TOKYO WASABI prohibits unauthorized reproduction and direct image linking; the durable official announcements directory is linked for the latest schedule without copying or rehosting its page thumbnails.',
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
      omissionId: 'ome-sake-ozawa-home-source-reuse-unsupported',
      claimIds: [
        'place:sawai-ozawa-shuzo:name:ja',
        'place:sawai-ozawa-shuzo:address:ja',
        'spot:sawai-ozawa-shuzo:access',
        'spot:sawai-ozawa-shuzo:official_current_url',
      ],
      entityId: 'sawai-ozawa-shuzo',
      kind: 'source',
      sourceUrl: 'https://www.sawanoi-sake.com/',
      recordedAt: '2026-08-29',
      reason: 'The official Ozawa Shuzo site provides no support for repository screenshot or image reuse; its current identity, address, and Sawai Station access text was rechecked without copying a page capture or photography.',
    },
    {
      omissionId: 'ome-sake-ozawa-tour-source-reuse-unsupported',
      claimIds: [
        'spot:sawai-ozawa-shuzo:hours',
        'spot:sawai-ozawa-shuzo:closed_days',
        'spot:sawai-ozawa-shuzo:price_availability',
        'spot:sawai-ozawa-shuzo:reservation',
        'spot:sawai-ozawa-shuzo:story_wording',
      ],
      entityId: 'sawai-ozawa-shuzo',
      kind: 'source',
      sourceUrl: 'https://www.sawanoi-sake.com/service/kengaku/',
      recordedAt: '2026-08-29',
      reason: 'The official Ozawa Shuzo brewery-tour page provides no support for repository screenshot or image reuse; its current tour text was rechecked without copying a page capture or photography.',
    },
    {
      omissionId: 'ome-sake-sawanoien-source-reuse-unsupported',
      claimIds: [
        'spot:sawanoien-garden:hours',
        'spot:sawanoien-garden:closed_days',
        'spot:sawanoien-garden:official_current_url',
        'spot:sawanoien-garden:story_wording',
      ],
      entityId: 'sawanoien-garden',
      kind: 'source',
      sourceUrl: 'https://www.sawanoi-sake.com/service/sawanoien/',
      recordedAt: '2026-08-29',
      reason: 'The official Sawanoien page provides no support for repository screenshot or image reuse; its current operations and service text was rechecked without copying a page capture or photography.',
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
    {
      omissionId: 'fussa-tamura-overview-source-not-captured',
      claimIds: ['spot:fussa-tamura-shuzo:access', 'spot:fussa-tamura-shuzo:hours', 'spot:fussa-tamura-shuzo:official_current_url'],
      entityId: 'fussa-tamura-shuzo',
      kind: 'source',
      sourceUrl: 'https://www.tamurashuzojo.com/page/kura',
      recordedAt: '2026-09-26',
      reason: 'The operator page was rechecked for the displayed access and calendar guidance. No screenshot or photography is copied because repository reuse permission is not recorded.',
    },
    {
      omissionId: 'fussa-tamura-tour-source-not-captured',
      claimIds: ['spot:fussa-tamura-shuzo:access', 'spot:fussa-tamura-shuzo:hours'],
      entityId: 'fussa-tamura-shuzo',
      kind: 'source',
      sourceUrl: 'https://www.tamurashuzojo.com/page/tour',
      recordedAt: '2026-09-26',
      reason: 'The operator tour page confirms that tour conditions vary; no tour promise or screenshot is copied, and repository reuse permission is not recorded.',
    },
    {
      omissionId: 'fussa-city-brewery-context-source-not-captured',
      claimIds: ['food-culture:sake-fussa:source:fussa-tokyo-sake-brewery-1005934'],
      entityId: 'sake-fussa',
      kind: 'source',
      sourceUrl: 'https://www.city.fussa.tokyo.jp/sightseeing/amuse/1005934.html',
      recordedAt: '2026-09-26',
      reason: 'The municipal history page was rechecked for brewery context. Its text is paraphrased, publisher date remains 2017-01-10, and no screenshot is copied because repository reuse permission is not recorded.',
    },
    {
      omissionId: 'fussa-water-course-source-not-captured',
      claimIds: ['route:fussa-sake-journey:source:fussa-water-heritage-course-1004236'],
      entityId: 'fussa-sake-journey',
      kind: 'source',
      sourceUrl: 'https://www.city.fussa.tokyo.jp/sightseeing/jousui/1004236.html',
      recordedAt: '2026-09-26',
      reason: 'The municipal water/heritage course was rechecked for local context. The combined three-stop route remains editorial and is not represented as that official course; no screenshot is copied because repository reuse permission is not recorded.',
    },
    {
      omissionId: 'fussa-kurumiru-city-source-not-captured',
      claimIds: [
        'spot:fussa-kurumiru:address',
        'spot:fussa-kurumiru:access',
        'spot:fussa-kurumiru:hours',
        'spot:fussa-kurumiru:closed_days',
        'spot:fussa-kurumiru:official_current_url',
      ],
      entityId: 'fussa-kurumiru',
      kind: 'source',
      sourceUrl: 'https://www.city.fussa.tokyo.jp/map/shiyakusho/1001605.html',
      recordedAt: '2026-09-26',
      reason: 'The municipal place page was rechecked for address, access, hours, and closure guidance; its publisher date remains 2021-06-16. No screenshot is copied because repository reuse permission is not recorded.',
    },
    {
      omissionId: 'fussa-ishikawa-access-source-not-captured',
      claimIds: ['spot:fussa-ishikawa-shuzo:address', 'spot:fussa-ishikawa-shuzo:access', 'spot:fussa-ishikawa-shuzo:official_current_url'],
      entityId: 'fussa-ishikawa-shuzo',
      kind: 'source',
      sourceUrl: 'https://www.tamajiman.co.jp/access/',
      recordedAt: '2026-09-26',
      reason: 'The operator access page was rechecked for address and facility-specific guidance. No visitor hours are inferred and no screenshot is copied because repository reuse permission is not recorded.',
    },
    {
      omissionId: 'akiruno-seasonal-municipal-source-not-captured',
      claimIds: [
        'story:produce-akiruno:story.factual.norabō-itsukaichi-history',
        'story:produce-akiruno:story.factual.corn-and-pear-seasonality',
      ],
      entityId: 'produce-akiruno',
      kind: 'source',
      sourceUrl: 'https://www.city.akiruno.tokyo.jp/kanko/0000001109.html',
      recordedAt: '2026-09-26',
      reason: 'The municipal seasonal-food page was rechecked for the displayed crop history and season windows. No page capture is copied because repository reuse permission is not recorded.',
    },
    {
      omissionId: 'akiruno-farmers-municipal-source-not-captured',
      claimIds: [
        'spot:akiruno-farmers-center:hours',
        'spot:akiruno-farmers-center:closed_days',
        'spot:akiruno-farmers-center:access',
      ],
      entityId: 'akiruno-farmers-center',
      kind: 'source',
      sourceUrl: 'https://www.city.akiruno.tokyo.jp/0000003556.html',
      recordedAt: '2026-09-26',
      reason: 'The municipal Farmers Center page was rechecked for address, access, hours, and closure guidance. No page capture is copied because repository reuse permission is not recorded.',
    },
    {
      omissionId: 'akiruno-seoto-operator-source-not-captured',
      claimIds: [
        'spot:akiruno-seoto-no-yu:access',
        'spot:akiruno-seoto-no-yu:official_current_url',
      ],
      entityId: 'akiruno-seoto-no-yu',
      kind: 'source',
      sourceUrl: 'http://www.seotonoyu.jp/access',
      recordedAt: '2026-09-26',
      reason: 'The operator access page was rechecked for address and bus guidance. No page capture is copied because repository reuse permission is not recorded.',
    },
    {
      omissionId: 'akiruno-gotokyo-source-not-captured',
      claimIds: ['spot:akiruno-seoto-no-yu:official_current_url'],
      entityId: 'akiruno-seoto-no-yu',
      kind: 'source',
      sourceUrl: 'https://www.gotokyo.org/jp/spot/397/index.html',
      recordedAt: '2026-09-26',
      reason: 'The Tokyo tourism page was rechecked as a cross-reference for Seoto-no-Yu. No page capture is copied because repository reuse permission is not recorded.',
    },
  ],
};
