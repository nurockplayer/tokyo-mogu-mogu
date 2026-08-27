import type { DataOrigin, DataSource, VerificationStatus } from '../data/model';
import tourismDirectory from '../../scripts/ingest-okutama/snapshots/okutama-tourism-directory.json';
import { foodCultures, modelRoutes, places } from '../data';
import {
  PRESENTATION_ROUTE_AUDIT,
  PRESENTATION_ROUTE_MEETING_TIME_AUDIT,
  PRESENTATION_SPOT_AUDIT,
  REQUIRED_HOME_JOURNEY_FACTUAL_CLAIMS,
  REQUIRED_ROUTE_GUIDANCE_FACTUAL_CLAIMS,
  REQUIRED_STORY_SPOT_FACTUAL_CLAIMS,
  REQUIRED_VISIBLE_SPOT_FIELDS,
  REQUIRED_STORY_FACTUAL_CLAIMS,
  SOURCE_FILES,
} from '../data/data-verification-audit-manifest';
import { SPOT_DETAILS } from '../data/seed-routes';
import {
  demoJourneys,
  demoSpots,
  chapterPoint,
  homeJourneyCards,
  referenceSpotDetails,
  resultLocation,
  routeNames,
  routeRegionGuidance,
  routeStats,
  routeStepText,
  storyLocation,
  storySpotGroups,
} from '../features/netlify-parity/factual-presentation';
import {
  deriveVerificationStatus,
  listUnverifiedFields,
  recordVerificationStatus,
} from './verification';

export type LedgerVerification = VerificationStatus | 'unknown';

/** Report-only canonical/presentation comparison. Never persisted as verification. */
export type LedgerFinding =
  | 'none'
  | 'match'
  | 'mismatch'
  | 'presentation_mismatch'
  | 'canonical_missing'
  | 'presentation_missing';

export type LedgerEntityType = 'Place' | 'Spot' | 'Route' | 'FoodCulture' | 'Story';

const PRESENTATION_LOCALES = ['ja', 'en', 'zh-TW'] as const;
type PresentationLocale = (typeof PRESENTATION_LOCALES)[number];

const localizedClaimId = (baseClaimId: string, locale: PresentationLocale) =>
  `${baseClaimId}:${locale}`;

const localizedFieldId = (baseFieldId: string, locale: PresentationLocale) =>
  `${baseFieldId}:${locale}`;

type LedgerSourceMetadata = Pick<
  DataSource,
  | 'name'
  | 'url'
  | 'license'
  | 'sourceType'
  | 'retrievedAt'
  | 'lastVerified'
  | 'sourceUpdatedAt'
  | 'confirmedAt'
>;

export interface LedgerCanonicalValue {
  value: string;
  origin: DataOrigin;
  verification: VerificationStatus;
  source?: LedgerSourceMetadata;
  sourceFile: string;
}

export interface LedgerPresentationValue {
  value: string;
  origin?: DataOrigin;
  verification?: VerificationStatus;
  surface: string;
  sourceFile: string;
}

export interface LedgerRequiredUnknown {
  origin: DataOrigin;
  surface: string;
  auditSourceFile: string;
  note: string;
}

export interface LedgerComparedPresentationValue {
  claimId: string;
  value: string;
  surface: string;
  sourceFile: string;
}

/**
 * Stable, language-independent input for one factual claim.
 *
 * `claimId`, `entityId`, and `fieldId` are caller-owned identifiers. The
 * builder never derives identity from localized labels, prose, array order, or
 * Markdown rendering.
 */
export interface LedgerClaimInput {
  claimId: string;
  entityType: LedgerEntityType;
  entityId: string;
  entityName: string;
  fieldId: string;
  fieldLabel: string;
  comparisonExpected: boolean;
  canonical?: LedgerCanonicalValue;
  presentation?: LedgerPresentationValue;
  comparedPresentation?: LedgerComparedPresentationValue;
  requiredUnknown?: LedgerRequiredUnknown;
  appSurface?: string;
  timeSensitive: boolean;
  timeSensitiveNote?: string;
  issues: readonly string[];
  evidence?: string;
  note?: string;
}

export interface LedgerClaim {
  claimId: string;
  entityType: LedgerEntityType;
  entityId: string;
  entityName: string;
  fieldId: string;
  fieldLabel: string;
  canonicalValue?: string;
  displayedValue?: string;
  comparedPresentationClaimId?: string;
  comparedPresentationValue?: string;
  origin: DataOrigin;
  verification: LedgerVerification;
  finding: LedgerFinding;
  primarySource?: string;
  primarySourceUrl?: string;
  primarySourceLicense?: string;
  retrievedAt?: string;
  sourceUpdatedAt?: string;
  confirmedAt?: string;
  timeSensitive: boolean;
  timeSensitiveNote?: string;
  appSurface?: string;
  canonicalSourceFile: string;
  presentationSourceFile?: string;
  auditSourceFile?: string;
  issues: readonly string[];
  evidence?: string;
  note?: string;
}

function compareClaimIds(left: { claimId: string }, right: { claimId: string }): number {
  if (left.claimId < right.claimId) return -1;
  if (left.claimId > right.claimId) return 1;
  return 0;
}

function comparisonFinding(input: LedgerClaimInput): LedgerFinding {
  if (input.presentation && input.comparedPresentation) {
    return input.presentation.value === input.comparedPresentation.value
      ? 'none'
      : 'presentation_mismatch';
  }
  if (!input.comparisonExpected) return 'none';
  if (input.canonical && input.presentation) {
    return input.canonical.value === input.presentation.value ? 'match' : 'mismatch';
  }
  if (input.presentation) return 'canonical_missing';
  if (input.canonical) return 'presentation_missing';
  return 'none';
}

/** Build deterministic ledger rows without mutating or normalizing either side. */
export function buildLedgerClaims(inputs: readonly LedgerClaimInput[]): LedgerClaim[] {
  const seen = new Set<string>();
  const rows = inputs.map((input): LedgerClaim => {
    if (seen.has(input.claimId)) {
      throw new Error(`Duplicate ledger claimId: ${input.claimId}`);
    }
    seen.add(input.claimId);

    const origin = input.canonical?.origin
      ?? input.presentation?.origin
      ?? input.requiredUnknown?.origin;
    if (!origin) {
      throw new Error(`Ledger claim ${input.claimId} has no origin metadata.`);
    }

    const source = input.canonical?.source;
    return {
      claimId: input.claimId,
      entityType: input.entityType,
      entityId: input.entityId,
      entityName: input.entityName,
      fieldId: input.fieldId,
      fieldLabel: input.fieldLabel,
      canonicalValue: input.canonical?.value,
      displayedValue: input.presentation?.value,
      comparedPresentationClaimId: input.comparedPresentation?.claimId,
      comparedPresentationValue: input.comparedPresentation?.value,
      origin,
      verification:
        input.canonical?.verification ?? input.presentation?.verification ?? 'unknown',
      finding: comparisonFinding(input),
      primarySource: source?.name,
      primarySourceUrl: source?.url,
      primarySourceLicense: source?.license,
      retrievedAt: source?.retrievedAt ?? source?.lastVerified,
      sourceUpdatedAt: source?.sourceUpdatedAt,
      confirmedAt: source?.confirmedAt,
      timeSensitive: input.timeSensitive,
      timeSensitiveNote: input.timeSensitiveNote,
      appSurface: input.presentation?.surface ?? input.requiredUnknown?.surface ?? input.appSurface,
      canonicalSourceFile: input.canonical?.sourceFile ?? '—',
      presentationSourceFile: input.presentation?.sourceFile,
      auditSourceFile: input.requiredUnknown?.auditSourceFile,
      issues: [...input.issues],
      evidence: input.evidence,
      note: input.note ?? input.requiredUnknown?.note,
    };
  });

  return rows.sort(compareClaimIds);
}

const VERIFICATION_ORDER: readonly LedgerVerification[] = [
  'verified',
  'needs_confirmation',
  'stale',
  'conflict',
  'demo',
  'unknown',
];

const FINDING_ORDER: readonly LedgerFinding[] = [
  'mismatch',
  'presentation_mismatch',
  'canonical_missing',
  'presentation_missing',
  'match',
  'none',
];

function markdown(value: string | undefined): string {
  if (value === undefined || value === '') return '—';
  return value.replaceAll('|', '\\|').replaceAll('\n', '<br>');
}

function sourceCell(claim: LedgerClaim): string {
  if (!claim.primarySource) return '—';
  return claim.primarySourceUrl
    ? `[${markdown(claim.primarySource)}](${claim.primarySourceUrl})`
    : markdown(claim.primarySource);
}

function queueTable(claims: readonly LedgerClaim[]): string {
  if (claims.length === 0) return '_None._';
  const header = '| Claim ID | Entity | Field | Canonical | Displayed | Verification | Comparison | Next action / note |\n|---|---|---|---|---|---|---|---|';
  const rows = claims.map((claim) =>
    `| \`${claim.claimId}\` | ${markdown(`${claim.entityType} ${claim.entityId}`)} | ${markdown(claim.fieldLabel)} | ${markdown(claim.canonicalValue)} | ${markdown(claim.displayedValue)} | \`${claim.verification}\` | \`${claim.finding}\` | ${markdown(claim.note)} |`,
  );
  return [header, ...rows].join('\n');
}

function presentationComparisonQueueTable(claims: readonly LedgerClaim[]): string {
  if (claims.length === 0) return '_None._';
  const header = '| Claim ID | Entity | Displayed | Compared presentation claim | Compared value | Verification | Comparison | Next action / note |\n|---|---|---|---|---|---|---|---|';
  const rows = claims.map((claim) =>
    `| \`${claim.claimId}\` | ${markdown(`${claim.entityType} ${claim.entityId}`)} | ${markdown(claim.displayedValue)} | \`${markdown(claim.comparedPresentationClaimId)}\` | ${markdown(claim.comparedPresentationValue)} | \`${claim.verification}\` | \`${claim.finding}\` | ${markdown(claim.note)} |`,
  );
  return [header, ...rows].join('\n');
}

/** Render byte-stable Markdown. No wall-clock value participates in output. */
export function renderDataVerificationLedger(inputClaims: readonly LedgerClaim[]): string {
  const claims = [...inputClaims].sort(compareClaimIds);
  const verificationCounts = new Map(
    VERIFICATION_ORDER.map((status) => [
      status,
      claims.filter((claim) => claim.verification === status).length,
    ]),
  );
  const findingCounts = new Map(
    FINDING_ORDER.map((finding) => [
      finding,
      claims.filter((claim) => claim.finding === finding).length,
    ]),
  );

  const detailsHeader = [
    '| Claim ID | Entity type / ID / name | Field / claim | Canonical value | Displayed value | Compared presentation claim | Compared presentation value | Origin | Verification | Comparison | Primary source | Source license | Checked / retrieved | Source updated | Confirmed | Time-sensitive | App surface | Canonical source file | Presentation source file | Audit source file | Relevant Issue / PR | Evidence | Next action / note |',
    '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|',
  ];
  const detailRows = claims.map((claim) => {
    const timeSensitive = claim.timeSensitive
      ? `yes${claim.timeSensitiveNote ? ` — ${claim.timeSensitiveNote}` : ''}`
      : 'no';
    return `| \`${claim.claimId}\` | ${markdown(`${claim.entityType} / ${claim.entityId} / ${claim.entityName}`)} | \`${claim.fieldId}\` — ${markdown(claim.fieldLabel)} | ${markdown(claim.canonicalValue)} | ${markdown(claim.displayedValue)} | ${claim.comparedPresentationClaimId ? `\`${markdown(claim.comparedPresentationClaimId)}\`` : '—'} | ${markdown(claim.comparedPresentationValue)} | \`${claim.origin}\` | \`${claim.verification}\` | \`${claim.finding}\` | ${sourceCell(claim)} | ${markdown(claim.primarySourceLicense)} | ${markdown(claim.retrievedAt)} | ${markdown(claim.sourceUpdatedAt)} | ${markdown(claim.confirmedAt)} | ${markdown(timeSensitive)} | ${markdown(claim.appSurface)} | \`${markdown(claim.canonicalSourceFile)}\` | ${claim.presentationSourceFile ? `\`${markdown(claim.presentationSourceFile)}\`` : '—'} | ${claim.auditSourceFile ? `\`${markdown(claim.auditSourceFile)}\`` : '—'} | ${markdown(claim.issues.join(', '))} | ${markdown(claim.evidence ?? 'Deferred to #334')} | ${markdown(claim.note)} |`;
  });

  const sections = [
    '# Data Verification Ledger',
    '> Generated deterministically from repository-owned structured inputs. Do not edit this file by hand.\n> Regenerate: `pnpm data:verification-ledger` · Check: `pnpm data:verification-ledger --check`',
    'This ledger is a review surface, not a second verification system. `origin`, the existing verification enum, `retrievedAt`, `sourceUpdatedAt`, and `confirmedAt` remain separate. `unknown` is report-only. Comparison results such as `mismatch`, `presentation_mismatch`, and `canonical_missing` are findings only and never verification states.',
    '## Inputs and audit boundary',
    [
      '- Canonical records: `src/data/seed-food-cultures.ts`, `src/data/seed-places.ts`, and `src/data/seed-routes.ts`.',
      '- Current fact-bearing presentation records: `src/features/netlify-parity/factual-presentation.ts` (browser-safe serializable data used by the Product and this report).',
      '- Localized presentation claims cover `ja`, `en`, and `zh-TW`; locale codes are part of their stable claim IDs.',
      '- Explicit audit metadata: `src/data/data-verification-audit-manifest.ts` contains stable mappings, surface ownership, time-sensitivity, traceability, and required report-only fields only. It does not duplicate factual values.',
      '- Verification and unknown queues reuse the #129/#133 `deriveVerificationStatus`, `recordVerificationStatus`, and `listUnverifiedFields` machinery.',
      '- Source licenses remain visible per claim/source row so reuse and attribution restrictions are not lost.',
      '- The generator does not parse arbitrary prose, screenshots, or third-party map/review content. Screenshot evidence is intentionally deferred to #334.',
      '- Staleness is not inferred from the wall clock. Only the repository\'s explicit verification status and deterministic source-date policy are used.',
    ].join('\n'),
    '## Summary by verification',
    '| Verification | Claims |\n|---|---:|\n' + VERIFICATION_ORDER.map(
      (status) => `| \`${status}\` | ${verificationCounts.get(status) ?? 0} |`,
    ).join('\n'),
    '## Summary by comparison',
    '| Comparison | Claims |\n|---|---:|\n' + FINDING_ORDER.map(
      (finding) => `| \`${finding}\` | ${findingCounts.get(finding) ?? 0} |`,
    ).join('\n'),
    '## Conflicts',
    queueTable(claims.filter((claim) => claim.verification === 'conflict')),
    '## Stale time-sensitive facts',
    queueTable(
      claims.filter((claim) => claim.verification === 'stale' && claim.timeSensitive),
    ),
    '## Unknown facts required by visible surfaces',
    queueTable(claims.filter((claim) => claim.verification === 'unknown')),
    '## Canonical ↔ presentation mismatches',
    queueTable(claims.filter((claim) => claim.finding === 'mismatch')),
    '## Presentation ↔ presentation mismatches',
    presentationComparisonQueueTable(
      claims.filter((claim) => claim.finding === 'presentation_mismatch'),
    ),
    '## Canonical-missing presentation claims',
    queueTable(claims.filter((claim) => claim.finding === 'canonical_missing')),
    '## Presentation-missing canonical claims',
    queueTable(claims.filter((claim) => claim.finding === 'presentation_missing')),
    '## Claim details',
    [...detailsHeader, ...detailRows].join('\n'),
  ];

  return `${sections.join('\n\n')}\n`;
}

export function buildRepositoryLedgerClaims(): LedgerClaim[] {
  const inputs: LedgerClaimInput[] = [];

  const canonicalValue = (
    value: string,
    origin: DataOrigin,
    source: DataSource | undefined,
    verification: VerificationStatus,
    sourceFile: string,
  ): LedgerCanonicalValue => ({
    value,
    origin,
    verification,
    source,
    sourceFile,
  });

  const presentationValue = (
    value: string,
    surface: string,
    origin: DataOrigin = 'demo',
    verification: VerificationStatus = 'demo',
  ): LedgerPresentationValue => ({
    value,
    origin,
    verification,
    surface,
    sourceFile: SOURCE_FILES.presentation,
  });

  const addCanonicalClaim = (input: Omit<LedgerClaimInput, 'comparisonExpected'>) => {
    inputs.push({ ...input, comparisonExpected: false });
  };

  for (const place of places) {
    const status = deriveVerificationStatus(place.source, place.origin);
    const base = {
      entityType: 'Place' as const,
      entityId: place.id,
      entityName: place.nameJa,
      appSurface: 'Spot / Route / Map',
      timeSensitive: false,
      issues: ['#129', '#133', '#333'],
    };
    const values = [
      ['name', 'Name', place.nameJa, false],
      ['address', 'Address', place.address, true],
      ['coordinates', 'Coordinates', `${place.latitude}, ${place.longitude}${place.coordinatePrecision ? ` (${place.coordinatePrecision})` : ''}`, true],
      ['place_type', 'Place type', place.type, false],
      ['food_culture_ids', 'Related FoodCulture IDs', place.foodCultureIds.join(', ') || 'none', false],
      ['official_current_url', 'Official / current-information URL', place.source.url, true],
    ] as const;

    for (const [fieldId, fieldLabel, value, timeSensitive] of values) {
      if (value === undefined) continue;
      const comparedByPresentation = PRESENTATION_SPOT_AUDIT.some(
        (audit) => audit.canonicalPlaceId === place.id
          && (fieldId === 'name' || fieldId === 'address' || fieldId === 'official_current_url'),
      );
      if (comparedByPresentation) continue;
      const source = fieldId === 'coordinates' && place.coordinateSource
        ? place.coordinateSource
        : place.source;
      addCanonicalClaim({
        claimId: `place:${place.id}:${fieldId}`,
        ...base,
        fieldId,
        fieldLabel,
        canonical: canonicalValue(
          value,
          place.origin,
          source,
          deriveVerificationStatus(source, place.origin),
          SOURCE_FILES.places,
        ),
        timeSensitive,
        timeSensitiveNote: timeSensitive ? 'Recheck against the named source before operational use.' : undefined,
        note: status === 'verified' ? undefined : 'Canonical value remains subject to its recorded verification status.',
      });
    }
  }

  for (const culture of foodCultures) {
    const status = recordVerificationStatus(culture.sources, culture.origin);
    const primarySource = culture.sources[0];
    if (!primarySource) {
      throw new Error(`FoodCulture ${culture.id} has no provenance source.`);
    }
    const claimLevelSource = culture.sources.length === 1 ? primarySource : undefined;
    const facts = [
      ['name', 'Name', culture.nameJa, 'FoodCulture'],
      ['description', 'Summary', culture.descriptionJa, 'FoodCulture'],
      ['story', 'Story narrative', culture.storyJa, 'Story'],
      ['history', 'History narrative', culture.historyJa, 'Story'],
      ['maker', 'Maker narrative', culture.makerJa, 'Story'],
      ['how_to_enjoy', 'How to enjoy', culture.howToEnjoyJa, 'Story'],
      ['hint', 'Exploration hint', culture.hintJa, 'FoodCulture'],
      ['place_ids', 'Related Place IDs', culture.placeIds.join(', ') || 'none', 'FoodCulture'],
    ] as const;

    for (const [fieldId, fieldLabel, value, surface] of facts) {
      addCanonicalClaim({
        claimId: `${fieldId === 'story' || fieldId === 'history' || fieldId === 'maker' || fieldId === 'how_to_enjoy' ? 'story' : 'food-culture'}:${culture.id}:${fieldId}`,
        entityType: fieldId === 'story' || fieldId === 'history' || fieldId === 'maker' || fieldId === 'how_to_enjoy' ? 'Story' : 'FoodCulture',
        entityId: culture.id,
        entityName: culture.nameJa,
        fieldId,
        fieldLabel,
        canonical: canonicalValue(value, culture.origin, claimLevelSource, status, SOURCE_FILES.foodCultures),
        timeSensitive: false,
        appSurface: surface,
        issues: ['#129', '#133', '#333'],
        note: culture.sources.length === 1
          ? `${surface} copy is editorially authored from the listed source; it is not automatically verified.`
          : `${surface} copy has multiple record-level sources but no claim-level source mapping; source-array order is not treated as provenance.`,
      });
    }

    for (const source of culture.sources) {
      if (!source.originalId) {
        throw new Error(`FoodCulture ${culture.id} has a source without a stable originalId.`);
      }
      addCanonicalClaim({
        claimId: `food-culture:${culture.id}:source:${source.originalId}`,
        entityType: 'FoodCulture',
        entityId: culture.id,
        entityName: culture.nameJa,
        fieldId: `source:${source.originalId}`,
        fieldLabel: 'Provenance source',
        canonical: canonicalValue(
          source.url ? `${source.name} — ${source.url}` : source.name,
          culture.origin,
          source,
          deriveVerificationStatus(source, culture.origin),
          SOURCE_FILES.foodCultures,
        ),
        timeSensitive: false,
        appSurface: 'Data provenance',
        issues: ['#129', '#333'],
        note: 'Source metadata row; retrieval, source update, and confirmation dates remain separate.',
      });
    }
  }

  for (const route of modelRoutes) {
    const status = deriveVerificationStatus(route.source, 'editorial');
    const routeBase = {
      entityType: 'Route' as const,
      entityId: route.id,
      entityName: route.nameJa,
      appSurface: 'Route',
      issues: ['#129', '#133', '#333'],
    };
    const routeFacts = [
      ['name', 'Route name', route.nameJa],
      ['area', 'Area', route.areaJa],
      ['default_duration', 'Default duration variant', route.defaultDuration],
    ] as const;
    for (const [fieldId, fieldLabel, value] of routeFacts) {
      if (fieldId === 'name' && PRESENTATION_ROUTE_AUDIT.some((audit) => audit.canonicalRouteId === route.id)) {
        continue;
      }
      addCanonicalClaim({
        claimId: `route:${route.id}:${fieldId}`,
        ...routeBase,
        fieldId,
        fieldLabel,
        canonical: canonicalValue(value, 'editorial', route.source, status, SOURCE_FILES.routes),
        timeSensitive: false,
        note: 'Route structure is editorial guidance, not a verified schedule.',
      });
    }

    for (const [variantId, variant] of Object.entries(route.variants)) {
      const variantBase = `route:${route.id}:${variantId}`;
      const variantFacts = [
        ['duration_minutes', 'Total duration (minutes)', String(variant.totalMinutes), true],
        ['stop_count', 'Stop count', String(variant.steps.length), false],
        ['stop_sequence', 'Physical stop sequence', variant.steps.map((step) => step.placeId).join(' → '), false],
        ['transport_summary', 'Transport summary', variant.transportJa, true],
      ] as const;
      for (const [fieldId, fieldLabel, value, timeSensitive] of variantFacts) {
        const comparedByPresentation = PRESENTATION_ROUTE_AUDIT.some((audit) => {
          if (audit.canonicalRouteId !== route.id) return false;
          const variantMap = audit.variants as Readonly<Record<string, string>>;
          return Object.values(variantMap).includes(variantId)
            && (fieldId === 'duration_minutes' || fieldId === 'stop_count' || fieldId === 'stop_sequence');
        });
        if (comparedByPresentation) continue;
        addCanonicalClaim({
          claimId: `${variantBase}:${fieldId}`,
          ...routeBase,
          fieldId,
          fieldLabel,
          canonical: canonicalValue(value, 'editorial', route.source, status, SOURCE_FILES.routes),
          timeSensitive,
          timeSensitiveNote: timeSensitive ? 'Editorial estimate; confirm current transport conditions.' : undefined,
          note: 'Route structure is editorial guidance, not a verified schedule.',
        });
      }

      for (const step of variant.steps) {
        addCanonicalClaim({
          claimId: `${variantBase}:step:${step.placeId}:role`,
          ...routeBase,
          fieldId: `step:${step.placeId}:role`,
          fieldLabel: `Stop role (${step.placeId})`,
          canonical: canonicalValue(step.roleJa, 'editorial', route.source, status, SOURCE_FILES.routes),
          timeSensitive: false,
          note: 'Editorial itinerary wording.',
        });
      }

      for (const segment of variant.mobility) {
        const from = variant.steps.find((step) => step.stepNumber === segment.fromStep);
        const to = variant.steps.find((step) => step.stepNumber === segment.toStep);
        if (!from || !to) {
          throw new Error(`Route ${route.id}/${variantId} has a mobility segment without stable stops.`);
        }
        addCanonicalClaim({
          claimId: `${variantBase}:mobility:${from.placeId}:to:${to.placeId}`,
          ...routeBase,
          fieldId: `mobility:${from.placeId}:to:${to.placeId}`,
          fieldLabel: `Transport guidance (${from.placeId} → ${to.placeId})`,
          canonical: canonicalValue(
            `${segment.labelJa} / ${segment.durationMinutes} minutes`,
            'editorial',
            route.source,
            status,
            SOURCE_FILES.routes,
          ),
          timeSensitive: true,
          timeSensitiveNote: 'Editorial estimate; confirm current transport conditions.',
          note: 'No wall-clock age threshold is applied.',
        });
      }
    }

    const routeSources = new Map<string, DataSource>();
    for (const source of [route.source, ...(route.sources ?? [])]) {
      if (!source.originalId) {
        throw new Error(`Route ${route.id} has a source without a stable originalId.`);
      }
      routeSources.set(source.originalId, source);
    }
    for (const [sourceId, source] of routeSources) {
      addCanonicalClaim({
        claimId: `route:${route.id}:source:${sourceId}`,
        ...routeBase,
        fieldId: `source:${sourceId}`,
        fieldLabel: 'Provenance source',
        canonical: canonicalValue(
          source.url ? `${source.name} — ${source.url}` : source.name,
          'editorial',
          source,
          deriveVerificationStatus(source, 'editorial'),
          SOURCE_FILES.routes,
        ),
        timeSensitive: false,
        appSurface: 'Data provenance',
        note: 'Source metadata row; retrieval, source update, and confirmation dates remain separate.',
      });
    }
  }

  const reviewEntries = listUnverifiedFields({
    places,
    foodCultures,
    spots: Object.values(SPOT_DETAILS),
  });
  const spotFieldValue = (
    detail: (typeof SPOT_DETAILS)[string],
    field: (typeof reviewEntries)[number]['field'],
  ): string | undefined => {
    switch (field) {
      case 'hours': return detail.practical?.hoursJa;
      case 'closedDays': return detail.practical?.closedDaysJa;
      case 'price': return detail.practical?.priceJa;
      case 'reservation': return detail.practical?.reservationAvailable === undefined
        ? undefined
        : String(detail.practical.reservationAvailable);
      case 'access': return detail.practical?.accessJa;
      case 'multilingualSupport': return detail.tags.language?.join(', ');
      case 'dietaryAllergy': {
        const values = [
          detail.tags.vegetarian === undefined ? undefined : `vegetarian=${detail.tags.vegetarian}`,
          detail.tags.allergyNotice === undefined ? undefined : `allergyNotice=${detail.tags.allergyNotice}`,
        ].filter((value): value is string => value !== undefined);
        return values.length > 0 ? values.join(', ') : undefined;
      }
      case 'accessibility': return detail.tags.accessibility === undefined
        ? undefined
        : String(detail.tags.accessibility);
      case 'storyWording': return detail.roleJa;
      case 'bookingDestination':
      case 'makerWording':
      case 'photoReusePermission':
      case 'address':
      case 'coordinates':
      case 'facts':
        return undefined;
    }
  };
  const reviewFieldId = (field: (typeof reviewEntries)[number]['field']) =>
    field.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

  for (const entry of reviewEntries.filter((candidate) => candidate.recordType === 'spot')) {
    const detail = SPOT_DETAILS[entry.recordId];
    if (!detail) continue;
    const fieldId = reviewFieldId(entry.field);
    const value = spotFieldValue(detail, entry.field);
    const base = {
      claimId: `spot:${detail.placeId}:${fieldId}`,
      entityType: 'Spot' as const,
      entityId: detail.placeId,
      entityName: places.find((place) => place.id === detail.placeId)?.nameJa ?? detail.placeId,
      fieldId,
      fieldLabel: entry.field,
      appSurface: 'Spot',
      timeSensitive: ['hours', 'closedDays', 'price', 'reservation', 'bookingDestination', 'access'].includes(entry.field),
      timeSensitiveNote: 'Operational information can change; no wall-clock threshold is inferred.',
      issues: ['#129', '#133', '#333'],
      note: value === undefined
        ? 'No repository-owned source-backed value exists; keep this report-only unknown.'
        : 'Populated canonical value remains in the #129/#133 review queue.',
    };
    if (value === undefined) {
      inputs.push({
        ...base,
        comparisonExpected: false,
        requiredUnknown: {
          origin: detail.origin,
          surface: 'Spot',
          auditSourceFile: SOURCE_FILES.routes,
          note: base.note,
        },
      });
    } else {
      addCanonicalClaim({
        ...base,
        canonical: canonicalValue(value, detail.origin, detail.source, entry.status, SOURCE_FILES.routes),
      });
    }
  }

  for (const journey of demoJourneys) {
    const audit = PRESENTATION_ROUTE_AUDIT.find(
      (candidate) => candidate.presentationJourneyId === journey.id,
    );
    if (!audit) {
      throw new Error(`Presentation journey ${journey.id} has no stable ledger mapping.`);
    }
    const canonicalRoute = modelRoutes.find((route) => route.id === audit.canonicalRouteId);
    const routeStatus = canonicalRoute
      ? deriveVerificationStatus(canonicalRoute.source, 'editorial')
      : undefined;
    const entityName = routeNames[journey.id]?.ja ?? journey.copy.ja.title;
    const presentationEntityName = journey.copy.ja.storyTitle;
    const resultComparisonVariantId = audit.resultComparisonVariantId;

    inputs.push({
      claimId: `food-culture:${journey.storyId}:presentation:result_match_percent`,
      entityType: 'FoodCulture',
      entityId: journey.storyId,
      entityName: presentationEntityName,
      fieldId: 'presentation:result_match_percent',
      fieldLabel: 'Result match percent',
      comparisonExpected: false,
      presentation: presentationValue(String(journey.matchPercent), 'Result'),
      timeSensitive: false,
      issues: [...audit.issues],
      note: 'Locale-neutral structured Result presentation value.',
    });

    for (const locale of PRESENTATION_LOCALES) {
      const routeName = routeNames[journey.id]?.[locale] ?? journey.copy[locale].title;
      const homeCard = homeJourneyCards[journey.id]?.[locale];
      if (homeCard) {
        inputs.push({
          claimId: localizedClaimId(
            `route:${journey.routeId}:presentation:home_card_title`,
            locale,
          ),
          entityType: 'Route',
          entityId: journey.routeId,
          entityName,
          fieldId: localizedFieldId('presentation:home_card_title', locale),
          fieldLabel: `Home journey-card title (${locale})`,
          comparisonExpected: false,
          presentation: presentationValue(homeCard.title, 'Home'),
          timeSensitive: false,
          issues: [...audit.issues],
          note: 'Structured localized Home presentation value; factual truth is not inferred.',
        });
        inputs.push({
          claimId: localizedClaimId(
            `route:${journey.routeId}:presentation:home_card_description`,
            locale,
          ),
          entityType: 'Route',
          entityId: journey.routeId,
          entityName,
          fieldId: localizedFieldId('presentation:home_card_description', locale),
          fieldLabel: `Home journey-card description (${locale})`,
          comparisonExpected: false,
          presentation: presentationValue(homeCard.description, 'Home'),
          timeSensitive: true,
          timeSensitiveNote: 'Duration and named-stop guidance require source-backed review; no wall-clock threshold is inferred.',
          issues: [...audit.issues],
          note: 'Structured localized Home presentation value; no facts are parsed from the copy.',
        });
      }
      inputs.push({
        claimId: localizedClaimId(`route:${journey.routeId}:name`, locale),
        entityType: 'Route',
        entityId: journey.routeId,
        entityName,
        fieldId: localizedFieldId('name', locale),
        fieldLabel: `Route name (${locale})`,
        comparisonExpected: locale === 'ja',
        canonical: locale === 'ja' && canonicalRoute && routeStatus
          ? canonicalValue(canonicalRoute.nameJa, 'editorial', canonicalRoute.source, routeStatus, SOURCE_FILES.routes)
          : undefined,
        presentation: presentationValue(routeName, 'Route'),
        timeSensitive: false,
        issues: [...audit.issues],
        note: locale === 'ja'
          ? canonicalRoute
            ? 'Raw canonical/presentation comparison; no normalization is applied.'
            : 'Visible route has no canonical ModelRoute record.'
          : 'Localized presentation is inventoried without inferring a canonical translation.',
      });

      const presentationStory = journey.copy[locale];
      inputs.push({
        claimId: localizedClaimId(
          `food-culture:${journey.storyId}:presentation:result_tags`,
          locale,
        ),
        entityType: 'FoodCulture',
        entityId: journey.storyId,
        entityName: presentationEntityName,
        fieldId: localizedFieldId('presentation:result_tags', locale),
        fieldLabel: `Result tags (${locale})`,
        comparisonExpected: false,
        presentation: presentationValue(presentationStory.tags.join(', '), 'Result'),
        timeSensitive: false,
        issues: [...audit.issues],
        note: 'Structured localized Result presentation value; factual truth is not inferred from display copy.',
      });

      const result = resultLocation[journey.id]?.[locale];
      const resultComparisonClaimId = localizedClaimId(
        `route:${journey.routeId}:${resultComparisonVariantId}:origin_travel_time_guidance`,
        locale,
      );
      const resultComparisonStats = routeStats[
        `${journey.id}:${resultComparisonVariantId}`
      ]?.[locale];
      if (result) {
        inputs.push({
          claimId: localizedClaimId(
            `route:${journey.routeId}:presentation:result_area`,
            locale,
          ),
          entityType: 'Route',
          entityId: journey.routeId,
          entityName,
          fieldId: localizedFieldId('presentation:result_area', locale),
          fieldLabel: `Result area guidance (${locale})`,
          comparisonExpected: false,
          presentation: presentationValue(result.area, 'Result'),
          timeSensitive: false,
          issues: [...audit.issues],
          note: 'Structured localized Result presentation value; no canonical equivalence is inferred.',
        });
        const resultTravel = `${result.station} / ${result.access}`;
        const routeTravel = resultComparisonStats
          ? `${resultComparisonStats.station} / ${resultComparisonStats.minutes}`
          : undefined;
        inputs.push({
          claimId: localizedClaimId(
            `route:${journey.routeId}:presentation:result_origin_travel_time`,
            locale,
          ),
          entityType: 'Route',
          entityId: journey.routeId,
          entityName,
          fieldId: localizedFieldId('presentation:result_origin_travel_time', locale),
          fieldLabel: `Result origin travel-time guidance (${locale})`,
          comparisonExpected: false,
          presentation: presentationValue(resultTravel, 'Result'),
          comparedPresentation: routeTravel
            ? {
                claimId: resultComparisonClaimId,
                value: routeTravel,
                surface: 'Route',
                sourceFile: SOURCE_FILES.presentation,
              }
            : undefined,
          timeSensitive: true,
          timeSensitiveNote: 'Raw cross-surface display comparison; no duration is parsed from prose.',
          issues: [...audit.issues],
          note: 'Localized Result and Route presentation values are compared byte-for-byte without normalization or factual inference.',
        });
      }

      const location = storyLocation[journey.id]?.[locale];
      const point = chapterPoint[journey.id]?.[locale];
      const storyFacts = [
        ['result_title', 'Result title', presentationStory.title, 'Result', 'FoodCulture'],
        ['result_subtitle', 'Result subtitle', presentationStory.subtitle, 'Result', 'FoodCulture'],
        ['result_description', 'Result description', presentationStory.description, 'Result', 'FoodCulture'],
        ['story_title', 'Story title', presentationStory.storyTitle, 'Story', 'Story'],
        ['story_intro', 'Story introduction', presentationStory.intro.join('\n\n'), 'Story', 'Story'],
        ['story_chapters', 'Story chapters', journey.chapters[locale].map((chapter) => `${chapter.number} ${chapter.title} — ${chapter.body}`).join('\n'), 'Story', 'Story'],
        ['story_point', 'Story factual callout', point ? `${point.title} — ${point.body}` : '', 'Story', 'Story'],
      ] as const;
      for (const [fieldId, fieldLabel, value, surface, entityType] of storyFacts) {
        if (!value) continue;
        inputs.push({
          claimId: localizedClaimId(
            `${entityType === 'Story' ? 'story' : 'food-culture'}:${journey.storyId}:presentation:${fieldId}`,
            locale,
          ),
          entityType,
          entityId: journey.storyId,
          entityName: presentationEntityName,
          fieldId: localizedFieldId(`presentation:${fieldId}`, locale),
          fieldLabel: `${fieldLabel} (${locale})`,
          comparisonExpected: false,
          presentation: presentationValue(value, surface),
          timeSensitive: false,
          issues: [...audit.issues],
          note: 'Localized demo presentation copy; factual truth is not inferred from the prose.',
        });
      }
      if (location) {
        inputs.push({
          claimId: localizedClaimId(
            `story:${journey.storyId}:presentation:story_location`,
            locale,
          ),
          entityType: 'Story',
          entityId: journey.storyId,
          entityName: presentationEntityName,
          fieldId: localizedFieldId('presentation:story_location', locale),
          fieldLabel: `Story location / nearest station (${locale})`,
          comparisonExpected: false,
          presentation: presentationValue(`${location.region} / ${location.station}`, 'Story'),
          timeSensitive: true,
          timeSensitiveNote: 'Nearest-station guidance requires source-backed review; no wall-clock threshold is inferred.',
          issues: [...audit.issues],
          note: 'Localized structured Story presentation value; factual truth is not inferred.',
        });
      }
    }
    const homeFactualClaims = REQUIRED_HOME_JOURNEY_FACTUAL_CLAIMS.filter(
      (claim) => claim.presentationJourneyId === journey.id,
    );
    for (const factualClaim of homeFactualClaims) {
      inputs.push({
        claimId: `route:${journey.routeId}:${factualClaim.claimId}`,
        entityType: 'Route',
        entityId: journey.routeId,
        entityName,
        fieldId: factualClaim.claimId,
        fieldLabel: factualClaim.fieldLabel,
        comparisonExpected: false,
        requiredUnknown: {
          origin: 'demo',
          surface: 'Home',
          auditSourceFile: SOURCE_FILES.auditManifest,
          note: `Factual assertion is embedded in ${factualClaim.parentFieldId}; no claim-level source mapping exists.`,
        },
        timeSensitive: factualClaim.timeSensitive,
        timeSensitiveNote: 'Recheck only after a source-backed claim mapping exists; no wall-clock threshold is inferred.',
        issues: [...audit.issues],
        note: 'Report-only unknown; the generator does not parse or copy the factual value from Home presentation text.',
      });
    }
    const presentationStory = journey.copy.ja;
    const storyFactualClaims = REQUIRED_STORY_FACTUAL_CLAIMS[
      journey.id as keyof typeof REQUIRED_STORY_FACTUAL_CLAIMS
    ] ?? [];
    for (const factualClaim of storyFactualClaims) {
      inputs.push({
        claimId: `story:${journey.storyId}:${factualClaim.claimId}`,
        entityType: 'Story',
        entityId: journey.storyId,
        entityName: presentationStory.storyTitle,
        fieldId: factualClaim.claimId,
        fieldLabel: factualClaim.fieldLabel,
        comparisonExpected: false,
        requiredUnknown: {
          origin: 'demo',
          surface: 'Story',
          auditSourceFile: SOURCE_FILES.auditManifest,
          note: `Factual assertion is embedded in ${factualClaim.parentFieldId}; no claim-level source mapping exists.`,
        },
        timeSensitive: factualClaim.timeSensitive,
        timeSensitiveNote: factualClaim.timeSensitive
          ? 'Recheck only after a source-backed claim mapping exists; no wall-clock threshold is inferred.'
          : undefined,
        issues: [...audit.issues],
        note: 'Report-only unknown; the generator does not parse or copy the factual value from Story prose.',
      });
    }
    const spotGroups = storySpotGroups[journey.id];
    if (spotGroups) {
      for (const [groupId, references] of Object.entries(spotGroups)) {
        for (const locale of PRESENTATION_LOCALES) {
          const value = references.map((reference) => {
            const description = reference.description?.[locale] ?? reference.badge[locale];
            return `${reference.spotId}: ${description}${reference.note ? ` (${reference.note[locale]})` : ''}`;
          }).join('\n');
          inputs.push({
            claimId: localizedClaimId(
              `story:${journey.storyId}:presentation:spot_group:${groupId}`,
              locale,
            ),
            entityType: 'Story',
            entityId: journey.storyId,
            entityName: presentationEntityName,
            fieldId: localizedFieldId(`presentation:spot_group:${groupId}`, locale),
            fieldLabel: `Story ${groupId} spot claims (${locale})`,
            comparisonExpected: false,
            presentation: presentationValue(value, 'Story'),
            timeSensitive: references.some((reference) => reference.note !== undefined),
            timeSensitiveNote: references.some((reference) => reference.note !== undefined)
              ? 'Reservation/availability notes can change.'
              : undefined,
            issues: [...audit.issues],
            note: 'Stable localized group claim; item order or localized copy does not define claim identity.',
          });
          for (const reference of references) {
            inputs.push({
              claimId: localizedClaimId(
                `story:${journey.storyId}:presentation:spot_group:${groupId}:reference:${reference.referenceId}:badge`,
                locale,
              ),
              entityType: 'Story',
              entityId: journey.storyId,
              entityName: presentationEntityName,
              fieldId: localizedFieldId(
                `presentation:spot_group:${groupId}:reference:${reference.referenceId}:badge`,
                locale,
              ),
              fieldLabel: `Story ${groupId} spot badge (${locale})`,
              comparisonExpected: false,
              presentation: presentationValue(reference.badge[locale], 'Story'),
              timeSensitive: false,
              issues: [...audit.issues],
              note: `Stable localized badge claim for spot ${reference.spotId}; identity comes from group and explicit reference IDs, not copy or array order.`,
            });
          }
        }
      }
    }
    const storySpotFactualClaims = REQUIRED_STORY_SPOT_FACTUAL_CLAIMS.filter(
      (candidate) => candidate.presentationJourneyId === journey.id,
    );
    for (const factualClaim of storySpotFactualClaims) {
      const referencedSpotExists = spotGroups
        ? Object.values(spotGroups).flat().some(
            (reference) => reference.spotId === factualClaim.spotId,
          )
        : false;
      if (!referencedSpotExists) {
        throw new Error(
          `Story factual claim ${factualClaim.claimId} has no stable presentation spot.`,
        );
      }
      inputs.push({
        claimId: `story:${journey.storyId}:${factualClaim.claimId}`,
        entityType: 'Story',
        entityId: journey.storyId,
        entityName: presentationStory.storyTitle,
        fieldId: factualClaim.claimId,
        fieldLabel: factualClaim.fieldLabel,
        comparisonExpected: false,
        requiredUnknown: {
          origin: 'demo',
          surface: 'Story',
          auditSourceFile: SOURCE_FILES.auditManifest,
          note: `Factual assertion for ${factualClaim.spotId} is embedded in ${factualClaim.parentFieldId}; no claim-level source mapping exists.`,
        },
        timeSensitive: factualClaim.timeSensitive,
        timeSensitiveNote: factualClaim.timeSensitive
          ? 'Operational Story-card claim can change; no wall-clock threshold is inferred.'
          : undefined,
        issues: [...audit.issues],
        note: 'Report-only unknown; the generator does not parse or copy the factual value from Story card prose.',
      });
    }

    for (const variant of journey.routeVariants) {
      const variantMap = audit.variants as Readonly<Record<string, string>>;
      const canonicalVariantId = variantMap[variant.id];
      const canonicalVariant = canonicalRoute && canonicalVariantId
        ? canonicalRoute.variants[canonicalVariantId as keyof typeof canonicalRoute.variants]
        : undefined;
      const variantPrefix = `route:${journey.routeId}:${variant.id}`;
      inputs.push({
        claimId: `${variantPrefix}:route_identity`,
        entityType: 'Route',
        entityId: journey.routeId,
        entityName,
        fieldId: 'route_identity',
        fieldLabel: 'Route identity',
        comparisonExpected: true,
        canonical: canonicalRoute && canonicalVariant && routeStatus
          ? canonicalValue(canonicalRoute.id, 'editorial', canonicalRoute.source, routeStatus, SOURCE_FILES.routes)
          : undefined,
        presentation: presentationValue(journey.routeId, 'Route'),
        timeSensitive: false,
        issues: [...audit.issues],
        note: canonicalRoute
          ? 'Stable route ID mapping.'
          : 'Visible route has no canonical ModelRoute record; do not fabricate one.',
      });
      const comparisonFacts = [
        ['duration_minutes', 'Total duration (minutes)', canonicalVariant?.totalMinutes, variant.durationMinutes],
        ['stop_count', 'Stop count', canonicalVariant?.steps.length, variant.steps.length],
        ['stop_sequence', 'Physical stop sequence', canonicalVariant?.steps.map((step) => step.placeId).join(' → '), variant.steps.map((step) => step.spotId).join(' → ')],
      ] as const;
      for (const [fieldId, fieldLabel, canonicalRaw, displayedRaw] of comparisonFacts) {
        inputs.push({
          claimId: `${variantPrefix}:${fieldId}`,
          entityType: 'Route',
          entityId: journey.routeId,
          entityName,
          fieldId,
          fieldLabel,
          comparisonExpected: true,
          canonical: canonicalRoute && canonicalVariant && routeStatus && canonicalRaw !== undefined
            ? canonicalValue(String(canonicalRaw), 'editorial', canonicalRoute.source, routeStatus, SOURCE_FILES.routes)
            : undefined,
          presentation: presentationValue(String(displayedRaw), 'Route'),
          timeSensitive: fieldId === 'duration_minutes',
          timeSensitiveNote: fieldId === 'duration_minutes' ? 'Editorial estimate; confirm current transport conditions.' : undefined,
          issues: [...audit.issues],
          note: canonicalRoute ? 'Raw canonical/presentation comparison; values are not silently normalized.' : 'Visible route has no canonical ModelRoute record.',
        });
      }

      const routeKey = `${journey.id}:${variant.id}`;
      const stepFacts = routeStepText[routeKey] ?? [];
      if (stepFacts.length !== variant.steps.length || variant.steps.some((step) => !stepFacts.some((fact) => fact.spotId === step.spotId))) {
        throw new Error(`Route presentation ${routeKey} lacks stable per-stop factual records.`);
      }
      for (const locale of PRESENTATION_LOCALES) {
        const stats = routeStats[routeKey]?.[locale];
        if (!stats) continue;
        inputs.push({
          claimId: localizedClaimId(`${variantPrefix}:region_guidance`, locale),
          entityType: 'Route',
          entityId: journey.routeId,
          entityName,
          fieldId: localizedFieldId('region_guidance', locale),
          fieldLabel: `Region guidance (${locale})`,
          comparisonExpected: true,
          presentation: presentationValue(routeRegionGuidance[locale], 'Route'),
          timeSensitive: false,
          issues: [...audit.issues],
          note: 'No corresponding canonical localized field exists; report canonical_missing rather than inventing one.',
        });
        for (const [fieldId, fieldLabel, value] of [
          ['origin_travel_time_guidance', 'Origin travel-time guidance', `${stats.station} / ${stats.minutes}`],
          ['distance_guidance', 'Distance guidance', stats.distance],
        ] as const) {
          inputs.push({
            claimId: localizedClaimId(`${variantPrefix}:${fieldId}`, locale),
            entityType: 'Route',
            entityId: journey.routeId,
            entityName,
            fieldId: localizedFieldId(fieldId, locale),
            fieldLabel: `${fieldLabel} (${locale})`,
            comparisonExpected: true,
            presentation: presentationValue(value, 'Route'),
            timeSensitive: true,
            timeSensitiveNote: 'Presentation guidance; confirm current travel conditions.',
            issues: [...audit.issues],
            note: 'No corresponding canonical localized field exists; report canonical_missing rather than inventing one.',
          });
        }
        for (const [fieldId, fieldLabel, value, timeSensitive] of [
          ['summary_time', 'Visible Route duration summary', stats.time, true],
          ['summary_stop_count', 'Visible Route spot-count summary', stats.spots, false],
        ] as const) {
          inputs.push({
            claimId: localizedClaimId(`${variantPrefix}:${fieldId}`, locale),
            entityType: 'Route',
            entityId: journey.routeId,
            entityName,
            fieldId: localizedFieldId(fieldId, locale),
            fieldLabel: `${fieldLabel} (${locale})`,
            comparisonExpected: false,
            presentation: presentationValue(value, 'Route'),
            timeSensitive,
            timeSensitiveNote: timeSensitive
              ? 'Visible presentation summary; confirm current travel conditions.'
              : undefined,
            issues: [...audit.issues],
            note: 'Visible localized summary label is inventoried separately from structural duration and rendered-step claims; no value is parsed and no semantic equivalence is inferred.',
          });
        }
      }

      for (const step of variant.steps) {
        const stepFact = stepFacts.find((candidate) => candidate.spotId === step.spotId);
        if (!stepFact) continue;
        const canonicalStep = canonicalVariant?.steps.find((candidate) => candidate.placeId === step.spotId);
        inputs.push({
          claimId: `${variantPrefix}:stop:${step.spotId}:identity`,
          entityType: 'Route',
          entityId: journey.routeId,
          entityName,
          fieldId: `stop:${step.spotId}:identity`,
          fieldLabel: `Physical stop identity (${step.spotId})`,
          comparisonExpected: true,
          canonical: canonicalRoute && canonicalStep && routeStatus
            ? canonicalValue(canonicalStep.placeId, 'editorial', canonicalRoute.source, routeStatus, SOURCE_FILES.routes)
            : undefined,
          presentation: presentationValue(step.spotId, 'Route'),
          timeSensitive: false,
          issues: [...audit.issues],
          note: canonicalStep ? 'Stable stop-ID comparison.' : 'No matching canonical stop exists in this route variant.',
        });
        const routeGuidanceFacts = REQUIRED_ROUTE_GUIDANCE_FACTUAL_CLAIMS.filter(
          (candidate) => candidate.presentationJourneyId === journey.id
            && candidate.variantId === variant.id
            && candidate.spotId === step.spotId,
        );
        for (const locale of PRESENTATION_LOCALES) {
          inputs.push({
            claimId: localizedClaimId(
              `${variantPrefix}:step:${step.spotId}:guidance`,
              locale,
            ),
            entityType: 'Route',
            entityId: journey.routeId,
            entityName,
            fieldId: localizedFieldId(`step:${step.spotId}:guidance`, locale),
            fieldLabel: `Per-step guidance (${step.spotId}, ${locale})`,
            comparisonExpected: locale === 'ja' && canonicalStep !== undefined,
            canonical: locale === 'ja' && canonicalRoute && canonicalStep && routeStatus
              ? canonicalValue(canonicalStep.roleJa, 'editorial', canonicalRoute.source, routeStatus, SOURCE_FILES.routes)
              : undefined,
            presentation: presentationValue(stepFact.description[locale], 'Route'),
            timeSensitive: routeGuidanceFacts.some((fact) => fact.timeSensitive),
            timeSensitiveNote: routeGuidanceFacts.length > 0
              ? 'Embedded operational assertions are identified by metadata-only audit claims.'
              : undefined,
            issues: [...audit.issues],
            note: locale === 'ja' && canonicalStep
              ? 'Raw wording comparison only.'
              : 'Localized presentation guidance is inventoried without inferring factual truth or a canonical translation.',
          });
        }
        for (const factualClaim of routeGuidanceFacts) {
          inputs.push({
            claimId: `${variantPrefix}:step:${step.spotId}:factual:${factualClaim.claimId}`,
            entityType: 'Route',
            entityId: journey.routeId,
            entityName,
            fieldId: `step:${step.spotId}:factual:${factualClaim.claimId}`,
            fieldLabel: factualClaim.fieldLabel,
            comparisonExpected: false,
            requiredUnknown: {
              origin: 'demo',
              surface: 'Route',
              auditSourceFile: SOURCE_FILES.auditManifest,
              note: `Factual assertion is embedded in step:${step.spotId}:guidance; no claim-level source mapping exists.`,
            },
            timeSensitive: factualClaim.timeSensitive,
            timeSensitiveNote: factualClaim.timeSensitive
              ? 'Operational fact can change; no wall-clock staleness threshold is inferred.'
              : undefined,
            issues: [...audit.issues],
            note: 'Report-only unknown; the generator does not parse or copy the factual value from Route guidance.',
          });
        }
        if (stepFact.note) {
          for (const locale of PRESENTATION_LOCALES) {
            inputs.push({
              claimId: localizedClaimId(
                `${variantPrefix}:step:${step.spotId}:note`,
                locale,
              ),
              entityType: 'Route',
              entityId: journey.routeId,
              entityName,
              fieldId: localizedFieldId(`step:${step.spotId}:note`, locale),
              fieldLabel: `Operational route note (${step.spotId}, ${locale})`,
              comparisonExpected: true,
              presentation: presentationValue(stepFact.note[locale], 'Route'),
              timeSensitive: true,
              timeSensitiveNote: 'Operational recommendation can change; confirm before relying on it.',
              issues: [...audit.issues],
              note: 'Visible localized structured note has no corresponding canonical field; no value is inferred or fabricated.',
            });
          }
        }
        if (stepFact.walk) {
          const isMeetingTime = PRESENTATION_ROUTE_MEETING_TIME_AUDIT.some(
            (candidate) => candidate.presentationJourneyId === journey.id
              && candidate.variantId === variant.id
              && candidate.spotId === step.spotId,
          );
          const canonicalMobility = canonicalStep && canonicalVariant
            ? canonicalVariant.mobility.find((segment) => segment.toStep === canonicalStep.stepNumber)
            : undefined;
          const walkFieldId = isMeetingTime ? 'meeting_time' : 'transport_guidance';
          for (const locale of PRESENTATION_LOCALES) {
            inputs.push({
              claimId: localizedClaimId(
                `${variantPrefix}:step:${step.spotId}:${walkFieldId}`,
                locale,
              ),
              entityType: 'Route',
              entityId: journey.routeId,
              entityName,
              fieldId: localizedFieldId(`step:${step.spotId}:${walkFieldId}`, locale),
              fieldLabel: `${isMeetingTime ? 'Meeting time' : 'Walking / transport guidance'} (${step.spotId}, ${locale})`,
              comparisonExpected: locale === 'ja',
              canonical: locale === 'ja' && canonicalRoute && canonicalMobility && routeStatus
                ? canonicalValue(
                    `${canonicalMobility.labelJa} / ${canonicalMobility.durationMinutes} minutes`,
                    'editorial',
                    canonicalRoute.source,
                    routeStatus,
                    SOURCE_FILES.routes,
                  )
                : undefined,
              presentation: presentationValue(stepFact.walk[locale], 'Route'),
              timeSensitive: true,
              timeSensitiveNote: 'Presentation guidance; confirm current travel conditions.',
              issues: [...audit.issues],
              note: isMeetingTime
                ? 'Meeting-time field is identified by the audit manifest; its localized value comes from the presentation record.'
                : 'Stable stop IDs and locale identify the comparison; array position is not claim identity.',
            });
          }
        }
      }
    }
  }

  const tourismOfficeSourceRecord = tourismDirectory.records.find(
    (record) => record.key === 'okutama-tourism-office',
  );

  for (const spot of Object.values(demoSpots)) {
    const audit = PRESENTATION_SPOT_AUDIT.find(
      (candidate) => candidate.presentationSpotId === spot.id,
    );
    const place = audit
      ? places.find((candidate) => candidate.id === audit.canonicalPlaceId)
      : undefined;
    const status = place ? deriveVerificationStatus(place.source, place.origin) : undefined;
    const reference = referenceSpotDetails[spot.id];
    const referenceName = reference?.information.find(
      (row) => row.fieldId === 'name',
    );
    const displayedName = spot.copy.ja.name;
    const snapshotPhone = spot.id === 'okutama-tourism-office'
      ? tourismOfficeSourceRecord?.phone
      : undefined;
    const snapshotSource = tourismOfficeSourceRecord && place
      ? {
          ...place.source,
          retrievedAt: tourismOfficeSourceRecord.retrievedAt
            ?? place.source.retrievedAt,
        }
      : undefined;

    for (const locale of PRESENTATION_LOCALES) {
      const localizedName = spot.copy[locale].name;
      inputs.push({
        claimId: localizedClaimId(`place:${spot.id}:name`, locale),
        entityType: 'Place',
        entityId: spot.id,
        entityName: displayedName,
        fieldId: localizedFieldId('name', locale),
        fieldLabel: `Spot heading name (${locale})`,
        comparisonExpected: locale === 'ja',
        canonical: locale === 'ja' && place && status
          ? canonicalValue(place.nameJa, place.origin, place.source, status, SOURCE_FILES.places)
          : undefined,
        presentation: place && status
          ? presentationValue(localizedName, 'Spot', place.origin, status)
          : presentationValue(localizedName, 'Spot'),
        timeSensitive: false,
        issues: audit ? [...audit.issues] : ['#333'],
        note: locale === 'ja'
          ? place
            ? 'Raw canonical/presentation mismatch only; repository authority does not establish a factual conflict.'
            : 'Visible presentation place has no explicit canonical mapping.'
          : 'Localized presentation is inventoried without inferring a canonical translation.',
      });

      if (referenceName) {
        inputs.push({
          claimId: localizedClaimId(`place:${spot.id}:information_name`, locale),
          entityType: 'Place',
          entityId: spot.id,
          entityName: displayedName,
          fieldId: localizedFieldId('information_name', locale),
          fieldLabel: `Spot information-row name (${locale})`,
          comparisonExpected: locale === 'ja',
          canonical: locale === 'ja' && place && status
            ? canonicalValue(place.nameJa, place.origin, place.source, status, SOURCE_FILES.places)
            : undefined,
          presentation: place && status
            ? presentationValue(referenceName.value[locale], 'Spot', place.origin, status)
            : presentationValue(referenceName.value[locale], 'Spot'),
          timeSensitive: false,
          issues: audit ? [...audit.issues] : ['#333'],
          note: locale === 'ja'
            ? place
              ? 'Raw canonical/presentation mismatch only; repository authority does not establish a factual conflict.'
              : 'Visible presentation place has no explicit canonical mapping.'
            : 'Localized presentation is inventoried without inferring a canonical translation.',
        });
      }

      const safetyGuidance = reference
        ? reference.caution.map((item) => item[locale]).join('\n')
        : spot.copy[locale].caution.join('\n');
      for (const [fieldId, fieldLabel, value] of [
        ['lead', 'Spot lead', spot.copy[locale].lead],
        ['description', 'Spot description', reference?.description[locale] ?? spot.copy[locale].description],
        ['safety_guidance', 'Safety guidance', safetyGuidance],
      ] as const) {
        inputs.push({
          claimId: localizedClaimId(
            `spot:${spot.id}:presentation:${fieldId}`,
            locale,
          ),
          entityType: 'Spot',
          entityId: spot.id,
          entityName: displayedName,
          fieldId: localizedFieldId(`presentation:${fieldId}`, locale),
          fieldLabel: `${fieldLabel} (${locale})`,
          comparisonExpected: false,
          presentation: presentationValue(value, 'Spot'),
          timeSensitive: fieldId === 'safety_guidance',
          timeSensitiveNote: fieldId === 'safety_guidance' ? 'Recheck operational guidance before visiting.' : undefined,
          issues: audit ? [...audit.issues] : ['#333'],
          note: 'Localized demo presentation copy; factual truth is not inferred from prose.',
        });
      }

      if (!reference) {
        inputs.push({
          claimId: localizedClaimId(
            `spot:${spot.id}:presentation:tags`,
            locale,
          ),
          entityType: 'Spot',
          entityId: spot.id,
          entityName: displayedName,
          fieldId: localizedFieldId('presentation:tags', locale),
          fieldLabel: `Fallback reference tags (${locale})`,
          comparisonExpected: false,
          presentation: presentationValue(spot.copy[locale].tags.join(', '), 'Spot'),
          timeSensitive: true,
          timeSensitiveNote: 'The reference-information tag must remain visible while these Spot facts are unverified.',
          issues: audit ? [...audit.issues] : ['#333'],
          note: 'One stable field claim inventories the localized tag group; array position and label text do not define identity.',
        });
        const practicalInformation = spot.copy[locale].practicalInfo
          .map((row) => `${row.label}: ${row.value}`)
          .join('\n');
        inputs.push({
          claimId: localizedClaimId(
            `spot:${spot.id}:presentation:practical_information`,
            locale,
          ),
          entityType: 'Spot',
          entityId: spot.id,
          entityName: displayedName,
          fieldId: localizedFieldId('presentation:practical_information', locale),
          fieldLabel: `Fallback practical information (${locale})`,
          comparisonExpected: false,
          presentation: presentationValue(practicalInformation, 'Spot'),
          timeSensitive: true,
          timeSensitiveNote: 'The fallback verification notice must remain visible while these Spot facts are unverified.',
          issues: audit ? [...audit.issues] : ['#333'],
          note: 'One stable field claim inventories the structured practical-information group; array position and localized prose do not define identity.',
        });
      }

      if (reference && place && status) {
        for (const row of reference.information) {
          inputs.push({
            claimId: localizedClaimId(
              `spot:${spot.id}:presentation:information:${row.fieldId}:label`,
              locale,
            ),
            entityType: 'Spot',
            entityId: spot.id,
            entityName: displayedName,
            fieldId: localizedFieldId(
              `presentation:information:${row.fieldId}:label`,
              locale,
            ),
            fieldLabel: `Displayed ${row.fieldId} information label (${locale})`,
            comparisonExpected: false,
            presentation: presentationValue(
              row.label[locale],
              'Spot',
              place.origin,
              status,
            ),
            timeSensitive: true,
            timeSensitiveNote: 'The visible information label must stay aligned with the structured verification state; no wall-clock threshold is inferred.',
            issues: audit ? [...audit.issues] : ['#333'],
            note: 'Stable information fieldId identifies the localized label; array position and label text do not define claim identity.',
          });
        }

        for (const tag of reference.tags) {
          const isVerificationCaveat = tag.tagId === 'confirmation-pending';
          inputs.push({
            claimId: localizedClaimId(
              `spot:${spot.id}:presentation:tag:${tag.tagId}`,
              locale,
            ),
            entityType: 'Spot',
            entityId: spot.id,
            entityName: displayedName,
            fieldId: localizedFieldId(`presentation:tag:${tag.tagId}`, locale),
            fieldLabel: `Displayed reference tag ${tag.tagId} (${locale})`,
            comparisonExpected: false,
            presentation: presentationValue(
              tag.label[locale],
              'Spot',
              place.origin,
              status,
            ),
            timeSensitive: isVerificationCaveat,
            timeSensitiveNote: isVerificationCaveat
              ? 'The visible pending-confirmation tag must stay aligned with structured verification state.'
              : undefined,
            issues: audit ? [...audit.issues] : ['#333'],
            note: 'Stable tagId identifies this localized presentation claim; array position, color, and label do not define identity.',
          });
        }

        if (reference.guide) {
          for (const [fieldId, fieldLabel, value] of [
            ['title', 'Official-information guide title', reference.guide.title[locale]],
            ['body', 'Official-information guide body', reference.guide.body[locale]],
            ['action', 'Official-information guide action', reference.guide.action[locale]],
          ] as const) {
            inputs.push({
              claimId: localizedClaimId(
                `spot:${spot.id}:presentation:guide:${fieldId}`,
                locale,
              ),
              entityType: 'Spot',
              entityId: spot.id,
              entityName: displayedName,
              fieldId: localizedFieldId(`presentation:guide:${fieldId}`, locale),
              fieldLabel: `${fieldLabel} (${locale})`,
              comparisonExpected: false,
              presentation: presentationValue(value, 'Spot', place.origin, status),
              timeSensitive: true,
              timeSensitiveNote: 'The verification guide must stay aligned with structured verification state; no wall-clock threshold is inferred.',
              issues: audit ? [...audit.issues] : ['#333'],
              note: 'Visible localized verification guide content is preserved as presentation data, not canonical truth.',
            });
          }
        }

        for (const fieldId of ['address', 'phone'] as const) {
          const row = reference.information.find((candidate) => candidate.fieldId === fieldId);
          if (!row) continue;
          inputs.push({
            claimId: localizedClaimId(`place:${spot.id}:${fieldId}`, locale),
            entityType: 'Place',
            entityId: spot.id,
            entityName: displayedName,
            fieldId: localizedFieldId(fieldId, locale),
            fieldLabel: `${fieldId === 'address' ? 'Address' : 'Phone / contact'} (${locale})`,
            comparisonExpected: locale === 'ja',
            canonical: locale === 'ja'
              ? fieldId === 'address'
                ? canonicalValue(place.address, place.origin, place.source, status, SOURCE_FILES.places)
                : snapshotPhone && snapshotSource
                  ? canonicalValue(
                      snapshotPhone,
                      place.origin,
                      snapshotSource,
                      status,
                      SOURCE_FILES.tourismSnapshot,
                    )
                  : undefined
              : undefined,
            presentation: presentationValue(row.value[locale], 'Spot', place.origin, status),
            timeSensitive: true,
            timeSensitiveNote: 'Contact and location details can change; check the official source.',
            issues: audit ? [...audit.issues] : ['#333'],
            note: locale === 'ja'
              ? fieldId === 'phone'
                ? 'Phone is represented in the source snapshot and presentation but remains absent from the canonical Place schema.'
                : 'Merged #322/#332 canonical/display comparison.'
              : 'Localized source-backed presentation is inventoried without inferring a canonical translation.',
          });
        }

        const verificationNote = reference.information.find(
          (candidate) => candidate.fieldId === 'verification_note',
        );
        if (verificationNote) {
          inputs.push({
            claimId: localizedClaimId(
              `spot:${spot.id}:presentation:verification_note`,
              locale,
            ),
            entityType: 'Spot',
            entityId: spot.id,
            entityName: displayedName,
            fieldId: localizedFieldId('presentation:verification_note', locale),
            fieldLabel: `Displayed verification note (${locale})`,
            comparisonExpected: false,
            presentation: presentationValue(
              verificationNote.value[locale],
              'Spot',
              place.origin,
              status,
            ),
            timeSensitive: true,
            timeSensitiveNote: 'The caveat must stay aligned with the structured verification state; no wall-clock threshold is inferred.',
            issues: audit ? [...audit.issues] : ['#333'],
            note: 'Visible pending-confirmation caveat is preserved as presentation data, not promoted to canonical truth.',
          });
        }
      }
    }

    for (const field of REQUIRED_VISIBLE_SPOT_FIELDS) {
      if (field.fieldId === 'safety_guidance') continue;
      const canonicalSpotClaimIds = new Set([
        'access',
        'hours',
        'closed_days',
        'reservation',
        'booking_destination',
        'multilingual_support',
        'dietary_allergy',
        'accessibility',
      ]);
      if (SPOT_DETAILS[spot.id] && canonicalSpotClaimIds.has(field.fieldId)) continue;
      if (field.fieldId === 'official_current_url' && place?.source.url) {
        inputs.push({
          claimId: `spot:${spot.id}:official_current_url`,
          entityType: 'Spot',
          entityId: spot.id,
          entityName: displayedName,
          fieldId: field.fieldId,
          fieldLabel: field.fieldLabel,
          comparisonExpected: true,
          canonical: status
            ? canonicalValue(place.source.url, place.origin, place.source, status, SOURCE_FILES.places)
            : undefined,
          timeSensitive: field.timeSensitive,
          timeSensitiveNote: 'Recheck the destination before visiting.',
          issues: audit ? [...audit.issues] : ['#333'],
          note: 'Canonical source URL exists, but no URL value is represented in the visible Spot record.',
        });
        continue;
      }
      inputs.push({
        claimId: `spot:${spot.id}:${field.fieldId}`,
        entityType: 'Spot',
        entityId: spot.id,
        entityName: displayedName,
        fieldId: field.fieldId,
        fieldLabel: field.fieldLabel,
        comparisonExpected: false,
        requiredUnknown: {
          origin: place?.origin ?? 'demo',
          surface: 'Spot',
          auditSourceFile: SOURCE_FILES.auditManifest,
          note: 'Required by the visible Spot review surface; no repository-owned source-backed value is structured for this presentation record.',
        },
        timeSensitive: field.timeSensitive,
        timeSensitiveNote: 'No age threshold is inferred; this field is absent.',
        issues: audit ? [...audit.issues] : ['#333'],
        note: 'Report-only unknown; do not write a fabricated value into canonical data.',
      });
    }
  }

  return buildLedgerClaims(inputs);
}

export function generateRepositoryDataVerificationLedger(): string {
  return renderDataVerificationLedger(buildRepositoryLedgerClaims());
}
