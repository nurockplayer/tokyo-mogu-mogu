import tourismDirectory from '../../scripts/ingest-okutama/snapshots/okutama-tourism-directory.json';
import { foodCultures, modelRoutes, places, STORY_REGIONAL_EVIDENCE } from '../data';
import { FIELDWORK_MEDIA } from '../data/fieldwork-media';
import { SPOT_DETAILS } from '../data/seed-routes';
import { demoJourneys, demoSpots } from '../features/netlify-parity/content';
import {
  defaultRouteVariantId,
  routeNames,
  routeStats,
  routeStepText,
} from '../features/netlify-parity/screens/RouteScreen';
import { resultLocation } from '../features/netlify-parity/screens/JourneyResultCard';
import { referenceSpotDetails } from '../features/netlify-parity/screens/SpotScreen';
import {
  chapterPoint,
  storyLocation,
  storySpotGroups,
} from '../features/netlify-parity/screens/StoryScreen';
import { deriveVerificationStatus, recordVerificationStatus } from './verification';
import type { LedgerClaimInput } from './data-verification-ledger';

const TOURISM_OFFICE_ID = 'okutama-tourism-office';
const TOURISM_SNAPSHOT_FILE =
  'scripts/ingest-okutama/snapshots/okutama-tourism-directory.json';
const SPOT_PRESENTATION_FILE =
  'src/features/netlify-parity/screens/SpotScreen.tsx';

/**
 * Report-only unknown inventory for fields the current visible Spot surface
 * needs reviewers to reason about. This is claim metadata only: it does not
 * add fields to Product schemas or provide substitute factual values.
 */
const VISIBLE_SPOT_UNKNOWN_FIELDS = [
  ['address', 'Address / location'],
  ['coordinates', 'Coordinates'],
  ['phone', 'Phone / contact'],
  ['access-nearest-station', 'Access / nearest station'],
  ['opening-hours', 'Opening hours'],
  ['closed-days', 'Closed days'],
  ['price-menu-product-availability', 'Price / menu / product availability'],
  ['reservation', 'Reservation requirement'],
  ['booking-destination', 'Booking destination'],
  ['parking', 'Parking'],
  ['multilingual-support', 'Multilingual support'],
  ['dietary-allergy-halal-vegan', 'Dietary / allergy / halal / vegan claims'],
  ['accessibility', 'Accessibility'],
  ['official-current-information-url', 'Official / current-information URL'],
] as const;

interface StoryFactualAuditClaim {
  claimId: string;
  claimLabel: string;
  parentClaimId: string;
  additionalParentClaimIds?: readonly string[];
  timeSensitive?: boolean;
}

/**
 * Metadata-only inventory for factual assertions embedded in current Story
 * prose. Values stay in the presentation records until a structured,
 * source-backed claim mapping can be made safely.
 */
const STORY_FACTUAL_AUDIT_CLAIMS: Readonly<Record<string, readonly StoryFactualAuditClaim[]>> = {
  'demo-okutama-wasabi': [
    { claimId: 'story.factual.region-geography', claimLabel: 'Okutama regional geography', parentClaimId: 'story.introduction.regional-context' },
    { claimId: 'story.factual.municipality-area-ranking', claimLabel: 'Okutama municipality area ranking', parentClaimId: 'story.introduction.natural-environment' },
    { claimId: 'story.factual.wasabi-cultivation-history', claimLabel: 'Wasabi cultivation history', parentClaimId: 'story.chapter.why-wasabi' },
    { claimId: 'story.factual.cultivation-livelihood-role', claimLabel: 'Wasabi livelihood history', parentClaimId: 'story.chapter.why-wasabi' },
    { claimId: 'story.factual.successor-count', claimLabel: 'Current wasabi successor count', parentClaimId: 'story.chapter.makers', timeSensitive: true },
    { claimId: 'story.factual.named-producers', claimLabel: 'Named wasabi producers and activities', parentClaimId: 'story.chapter.makers', timeSensitive: true },
    { claimId: 'story.factual.wasabi-school-duration', claimLabel: 'Wasabi school learning duration', parentClaimId: 'story.chapter.inherited-technique', timeSensitive: true },
    { claimId: 'story.factual.production-challenges', claimLabel: 'Current wasabi production challenges', parentClaimId: 'story.chapter.current-challenges', timeSensitive: true },
    { claimId: 'story.factual.visit-economic-impact', claimLabel: 'Visitor economic and succession impact', parentClaimId: 'story.chapter.visitor-support', timeSensitive: true },
    { claimId: 'story.factual.wasabi-flavor-profile', claimLabel: 'Okutama wasabi flavor profile', parentClaimId: 'story.point' },
    { claimId: 'story.factual.grating-aroma-effect', claimLabel: 'Effect of gentle grating on wasabi aroma', parentClaimId: 'story.point' },
    { claimId: 'story.factual.optimal-eating-window', claimLabel: 'Wasabi optimal eating window', parentClaimId: 'story.point' },
    { claimId: 'story.factual.food-pairings', claimLabel: 'Wasabi food pairing claims', parentClaimId: 'story.point' },
  ],
  'demo-okutama-yamame': [
    { claimId: 'story.factual.aquaculture-history', claimLabel: 'Okutama yamame aquaculture history', parentClaimId: 'story.chapter.regional-fit' },
    { claimId: 'story.factual.research-facility-count', claimLabel: 'Aquaculture research facility count', parentClaimId: 'story.chapter.regional-fit', timeSensitive: true },
    { claimId: 'story.factual.inn-age', claimLabel: 'Akabeko inn age', parentClaimId: 'story.chapter.inheritors', timeSensitive: true },
    { claimId: 'story.factual.proprietor-generation', claimLabel: 'Akabeko proprietor generation', parentClaimId: 'story.chapter.inheritors', timeSensitive: true },
    { claimId: 'story.factual.recipe-provenance', claimLabel: 'Yamame recipe provenance', parentClaimId: 'story.chapter.inheritors' },
    { claimId: 'story.factual.aquaculture-research', claimLabel: 'Yamame aquaculture research activity', parentClaimId: 'story.chapter.inheritors', timeSensitive: true },
    { claimId: 'story.factual.fish-reproductive-characteristic', claimLabel: 'Okutama yamame reproductive characteristic', parentClaimId: 'story.chapter.fish-characteristics' },
    { claimId: 'story.factual.fish-longevity-size', claimLabel: 'Okutama yamame longevity and size', parentClaimId: 'story.chapter.fish-characteristics', additionalParentClaimIds: ['story.point'] },
    { claimId: 'story.factual.dish-availability', claimLabel: 'Okutama yamame dish availability', parentClaimId: 'story.chapter.fish-characteristics', additionalParentClaimIds: ['story.point'], timeSensitive: true },
    { claimId: 'story.factual.disease-risk', claimLabel: 'Farmed yamame disease risk', parentClaimId: 'story.chapter.current-challenges', timeSensitive: true },
    { claimId: 'story.factual.tour-hygiene-constraint', claimLabel: 'Aquaculture tour hygiene constraint', parentClaimId: 'story.chapter.current-challenges', timeSensitive: true },
    { claimId: 'story.factual.lodging-pattern', claimLabel: 'Current Okutama lodging pattern', parentClaimId: 'story.chapter.current-challenges', timeSensitive: true },
    { claimId: 'story.factual.visit-support-impact', claimLabel: 'Visitor support impact', parentClaimId: 'story.chapter.visitor-support', timeSensitive: true },
  ],
};

/** Metadata-only semantic mapping for structured Route step text. */
const ROUTE_STEP_WALK_AUDIT_METADATA: Readonly<Record<string, {
  claimId: string;
  claimLabel: string;
}>> = {
  'demo-okutama-wasabi:full-day:wasabi-experience': {
    claimId: 'route.meeting-time.full-day',
    claimLabel: 'full-day meeting time',
  },
};

/** Metadata-only disambiguation for repeated Story cards with the same Spot. */
const STORY_SPOT_CLAIM_IDS: Readonly<Record<string, string>> = {
  'demo-okutama-yamame:nature:hikawa-valley:valleyBridge':
    'story.nature.hikawa-valley.stream-walk',
  'demo-okutama-yamame:nature:hikawa-valley:riverPortrait':
    'story.nature.hikawa-valley.water-culture',
};

interface UnknownSpotEntity {
  entityType: 'Place' | 'Spot';
  entityId: string;
  entityName: string;
  appSurface: string;
  relevantIssue?: string;
}

function reportOnlyUnknownSpotClaims(entity: UnknownSpotEntity): LedgerClaimInput[] {
  return VISIBLE_SPOT_UNKNOWN_FIELDS.map(([claimId, claimLabel]) => ({
    ...entity,
    claimId,
    claimLabel,
    verification: 'unknown',
    timeSensitive: true,
    timeSensitiveCaveat: 'No sufficient source-backed value is represented; do not infer one.',
    auditMetadata: true,
    nextAction: 'Add source-backed audit metadata only when the field is actually checked.',
  }));
}

function coalesceClaims(inputs: readonly LedgerClaimInput[]): LedgerClaimInput[] {
  const claimsByIdentity = new Map<string, LedgerClaimInput>();
  for (const input of inputs) {
    const key = `${input.entityId}:${input.claimId}`;
    const existing = claimsByIdentity.get(key);
    if (!existing) {
      claimsByIdentity.set(key, input);
      continue;
    }
    const inputHasCanonicalValue = input.canonicalValue !== undefined;
    const existingHasCanonicalValue = existing.canonicalValue !== undefined;
    if (existing.displayedValue !== undefined
      && input.displayedValue !== undefined
      && existing.displayedValue !== input.displayedValue) {
      throw new Error(`Duplicate presentation claim identity: ${key}.`);
    }
    const canonicalMetadata = inputHasCanonicalValue || !existingHasCanonicalValue
      ? input
      : existing;
    claimsByIdentity.set(key, {
      ...existing,
      ...input,
      canonicalValue: input.canonicalValue ?? existing.canonicalValue,
      displayedValue: input.displayedValue ?? existing.displayedValue,
      canonicalOrigin: canonicalMetadata.canonicalOrigin,
      presentationOrigin: input.presentationOrigin ?? existing.presentationOrigin,
      verification: canonicalMetadata.verification,
      primarySourceName: canonicalMetadata.primarySourceName,
      primarySourceUrl: canonicalMetadata.primarySourceUrl,
      retrievedAt: canonicalMetadata.retrievedAt,
      sourceUpdatedAt: canonicalMetadata.sourceUpdatedAt,
      confirmedAt: canonicalMetadata.confirmedAt,
      canonicalSourceFile: canonicalMetadata.canonicalSourceFile,
      presentationSourceFile: input.presentationSourceFile ?? existing.presentationSourceFile,
      timeSensitive: Boolean(existing.timeSensitive || input.timeSensitive),
      timeSensitiveCaveat: canonicalMetadata.timeSensitiveCaveat,
      nextAction: canonicalMetadata.nextAction,
      auditMetadata: Boolean(existing.auditMetadata || input.auditMetadata),
    });
  }
  return [...claimsByIdentity.values()];
}

export function currentDataVerificationClaims(): LedgerClaimInput[] {
  const place = places.find((candidate) => candidate.id === TOURISM_OFFICE_ID);
  const sourceRecord = tourismDirectory.records.find(
    (candidate) => candidate.key === TOURISM_OFFICE_ID,
  );
  const presentation = referenceSpotDetails[TOURISM_OFFICE_ID];
  if (!place || !sourceRecord || !presentation) {
    throw new Error('The current tourism-office verification boundary is incomplete.');
  }

  const displayedValue = (claimId: 'address' | 'phone' | 'verification-status') =>
    presentation.information.find((row) => row.claimId === claimId)?.value.ja;
  const verification = deriveVerificationStatus(place.source, place.origin);
  const shared = {
    entityType: 'Place' as const,
    entityId: place.id,
    entityName: place.nameJa,
    canonicalOrigin: place.origin,
    presentationOrigin: 'source' as const,
    verification,
    primarySourceName: place.source.name,
    primarySourceUrl: place.source.url,
    retrievedAt: sourceRecord.retrievedAt ?? place.source.retrievedAt,
    sourceUpdatedAt: place.source.sourceUpdatedAt,
    confirmedAt: place.source.confirmedAt,
    appSurface: 'Spot',
    presentationSourceFile: SPOT_PRESENTATION_FILE,
    timeSensitive: true,
    relevantIssue: '#322 / #333',
  };

  const claims: LedgerClaimInput[] = [
    {
      ...shared,
      claimId: 'address',
      claimLabel: 'Address / location',
      canonicalValue: place.address,
      displayedValue: displayedValue('address'),
      canonicalSourceFile: 'src/data/seed-places.ts',
      timeSensitiveCaveat: 'Addresses and visitability can change; recheck before travel.',
    },
    {
      ...shared,
      claimId: 'phone',
      claimLabel: 'Phone / contact',
      canonicalValue: sourceRecord.phone,
      displayedValue: displayedValue('phone'),
      canonicalSourceFile: TOURISM_SNAPSHOT_FILE,
      timeSensitiveCaveat: 'Contact details can change; recheck the official source.',
      auditMetadata: true,
      nextAction: 'Keep the source-snapshot mapping explicit; the Place schema has no phone field.',
    },
    {
      ...shared,
      claimId: 'verification-status',
      claimLabel: 'Displayed verification status',
      canonicalValue: undefined,
      displayedValue: displayedValue('verification-status'),
      canonicalOrigin: undefined,
      presentationOrigin: 'editorial',
      verification: 'needs_confirmation',
      primarySourceName: undefined,
      primarySourceUrl: undefined,
      retrievedAt: undefined,
      sourceUpdatedAt: undefined,
      confirmedAt: undefined,
      canonicalSourceFile: undefined,
      presentationSourceFile: SPOT_PRESENTATION_FILE,
      timeSensitiveCaveat: 'Presentation copy describes review state; it is not stakeholder confirmation.',
      auditMetadata: true,
    },
  ];

  claims.push(...reportOnlyUnknownSpotClaims({
    entityType: 'Place',
    entityId: place.id,
    entityName: place.nameJa,
    appSurface: 'Spot',
    relevantIssue: '#322 / #333',
  }));

  for (const spot of Object.values(demoSpots)) {
    const canonicalPlace = places.find((candidate) => candidate.id === spot.id);
    const detail = referenceSpotDetails[spot.id];
    const status = canonicalPlace
      ? deriveVerificationStatus(canonicalPlace.source, canonicalPlace.origin)
      : 'demo';
    const canonicalOrigin = canonicalPlace?.origin;
    const entityName = canonicalPlace?.nameJa ?? spot.copy.ja.name;
    const source = canonicalPlace?.source;
    const canonicalCommon = {
      entityType: 'Spot' as const,
      entityId: spot.id,
      entityName,
      canonicalOrigin,
      verification: status,
      primarySourceName: source?.name,
      primarySourceUrl: source?.url,
      retrievedAt: source?.retrievedAt ?? source?.lastVerified,
      sourceUpdatedAt: source?.sourceUpdatedAt,
      confirmedAt: source?.confirmedAt,
      appSurface: 'Spot',
      canonicalSourceFile: canonicalPlace ? 'src/data/seed-places.ts' : undefined,
      presentationSourceFile: 'src/features/netlify-parity/content.ts',
      timeSensitive: false,
      relevantIssue: '#333',
    };
    const demoPresentation = {
      entityType: 'Spot' as const,
      entityId: spot.id,
      entityName,
      canonicalOrigin: undefined,
      presentationOrigin: 'demo' as const,
      verification: 'demo' as const,
      primarySourceName: undefined,
      primarySourceUrl: undefined,
      retrievedAt: undefined,
      sourceUpdatedAt: undefined,
      confirmedAt: undefined,
      appSurface: 'Spot',
      canonicalSourceFile: undefined,
      presentationSourceFile: 'src/features/netlify-parity/content.ts',
      timeSensitive: false,
      relevantIssue: '#333',
      auditMetadata: true,
    };
    const referencePresentation = {
      ...demoPresentation,
      presentationOrigin: 'editorial' as const,
      verification: 'needs_confirmation' as const,
      presentationSourceFile: SPOT_PRESENTATION_FILE,
    };

    claims.push(
      {
        ...canonicalCommon,
        claimId: 'name',
        claimLabel: 'Spot name',
        canonicalValue: canonicalPlace?.nameJa,
        displayedValue: spot.copy.ja.name,
        presentationOrigin: 'demo',
      },
      {
        ...demoPresentation,
        claimId: 'spot.lead',
        claimLabel: 'Spot lead',
        displayedValue: spot.copy.ja.lead,
      },
      {
        ...(detail ? referencePresentation : demoPresentation),
        claimId: 'spot.description',
        claimLabel: 'Spot description',
        claimKind: 'editorial-narrative',
        displayedValue: detail?.description.ja ?? spot.copy.ja.description,
      },
      {
        ...(detail ? referencePresentation : demoPresentation),
        claimId: 'safety-guidance',
        claimLabel: 'Safety / visit guidance',
        displayedValue: (detail?.caution.map((item) => item.ja) ?? spot.copy.ja.caution).join('\n'),
        timeSensitive: true,
        timeSensitiveCaveat: 'Visit guidance must be checked against current official information.',
      },
    );

    if (detail) {
      const displayedInformationName = detail.information.find(
        (row) => row.claimId === 'name',
      )?.value.ja;
      if (displayedInformationName) {
        claims.push({
          ...canonicalCommon,
          claimId: 'spot.information.name',
          claimLabel: 'Spot information facility name',
          canonicalValue: canonicalPlace?.nameJa,
          displayedValue: displayedInformationName,
          presentationOrigin: 'source',
          presentationSourceFile: SPOT_PRESENTATION_FILE,
          auditMetadata: true,
        });
      }
    }

    if (spot.id !== TOURISM_OFFICE_ID) {
      claims.push(...reportOnlyUnknownSpotClaims({
        entityType: 'Spot',
        entityId: spot.id,
        entityName,
        appSurface: 'Spot',
        relevantIssue: '#333',
      }));
    }
  }

  for (const journey of demoJourneys) {
    const canonicalRoute = modelRoutes.find((route) => route.id === journey.routeId);
    const routeVerification = canonicalRoute
      ? deriveVerificationStatus(canonicalRoute.source, 'editorial')
      : 'demo';
    const routeCommon = {
      entityType: 'Route' as const,
      entityId: journey.routeId,
      entityName: canonicalRoute?.nameJa ?? journey.copy.ja.title,
      canonicalOrigin: canonicalRoute ? 'editorial' as const : undefined,
      presentationOrigin: 'demo' as const,
      verification: routeVerification,
      primarySourceName: canonicalRoute?.source.name,
      primarySourceUrl: canonicalRoute?.source.url,
      retrievedAt: canonicalRoute?.source.retrievedAt ?? canonicalRoute?.source.lastVerified,
      sourceUpdatedAt: canonicalRoute?.source.sourceUpdatedAt,
      confirmedAt: canonicalRoute?.source.confirmedAt,
      appSurface: 'Route',
      canonicalSourceFile: canonicalRoute ? 'src/data/seed-routes.ts' : undefined,
      presentationSourceFile: 'src/features/netlify-parity/content.ts',
      timeSensitive: true,
      relevantIssue: '#333',
    };

    claims.push({
      ...routeCommon,
      claimId: 'route.name',
      claimLabel: 'Route name',
      canonicalValue: canonicalRoute?.nameJa,
      displayedValue: routeNames[journey.id]?.ja ?? journey.copy.ja.title,
      presentationSourceFile: 'src/features/netlify-parity/screens/RouteScreen.tsx',
      auditMetadata: true,
    });

    const resultCopy = journey.copy.ja;
    const resultLocationValue = resultLocation[journey.id]?.ja;
    const defaultRouteStats = routeStats[`${journey.id}:${defaultRouteVariantId}`]?.ja;
    const resultCommon = {
      entityType: 'Route' as const,
      entityId: journey.routeId,
      entityName: canonicalRoute?.nameJa ?? resultCopy.title,
      presentationOrigin: 'demo' as const,
      verification: 'demo' as const,
      appSurface: 'Result / MOGU',
      presentationSourceFile: 'src/features/netlify-parity/content.ts',
      timeSensitive: false,
      relevantIssue: '#333',
      auditMetadata: true,
    };
    claims.push(
      {
        ...resultCommon,
        claimId: 'result.title',
        claimLabel: 'Result card title',
        claimKind: 'editorial-narrative',
        displayedValue: resultCopy.title,
      },
      {
        ...resultCommon,
        claimId: 'result.subtitle',
        claimLabel: 'Result card subtitle',
        claimKind: 'editorial-narrative',
        displayedValue: resultCopy.subtitle,
      },
      {
        ...resultCommon,
        claimId: 'result.description',
        claimLabel: 'Result card description',
        claimKind: 'editorial-narrative',
        displayedValue: resultCopy.description,
      },
      {
        ...resultCommon,
        claimId: 'result.tags',
        claimLabel: 'Result card tags',
        claimKind: 'editorial-narrative',
        displayedValue: resultCopy.tags.join(', '),
      },
      {
        ...resultCommon,
        claimId: 'result.match-percent',
        claimLabel: 'Displayed match percent',
        claimKind: 'editorial-narrative',
        displayedValue: String(journey.matchPercent),
      },
    );

    if (resultLocationValue) {
      const locationCommon = {
        ...resultCommon,
        presentationSourceFile:
          'src/features/netlify-parity/screens/JourneyResultCard.tsx',
      };
      const travelTimeConflict = defaultRouteStats !== undefined
        && resultLocationValue.travelMinutes !== defaultRouteStats.travelMinutes;
      claims.push(
        {
          ...locationCommon,
          claimId: 'result.area',
          claimLabel: 'Result card area',
          claimKind: 'factual',
          displayedValue: resultLocationValue.area,
        },
        {
          ...locationCommon,
          claimId: 'result.origin-station',
          claimLabel: 'Result card origin station',
          claimKind: 'factual',
          displayedValue: resultLocationValue.station,
          timeSensitive: true,
          timeSensitiveCaveat: 'Travel origin guidance can change; check current transport information.',
        },
        {
          ...locationCommon,
          claimId: 'result.origin-travel-time',
          claimLabel: 'Result card origin travel time (minutes)',
          claimKind: 'factual',
          displayedValue: String(resultLocationValue.travelMinutes),
          verification: 'demo',
          timeSensitive: true,
          timeSensitiveCaveat: 'Displayed travel time is not live transit guidance.',
          comparedPresentationClaimId: defaultRouteStats
            ? `route.origin-travel-time.${defaultRouteVariantId}`
            : undefined,
          nextAction: travelTimeConflict
            ? `Review against route.origin-travel-time.${defaultRouteVariantId}; do not rewrite either presentation value in this report.`
            : undefined,
        },
      );
    }

    for (const presentationVariant of journey.routeVariants) {
      const canonicalVariantId = presentationVariant.id === 'full-day' ? '1-day' : 'half-day';
      const canonicalVariant = canonicalRoute?.variants[canonicalVariantId];
      const variantSuffix = presentationVariant.id;
      claims.push(
        {
          ...routeCommon,
          claimId: `route.duration.${variantSuffix}`,
          claimLabel: `${variantSuffix} duration (minutes)`,
          canonicalValue: canonicalVariant ? String(canonicalVariant.totalMinutes) : undefined,
          displayedValue: String(presentationVariant.durationMinutes),
        },
        {
          ...routeCommon,
          claimId: `route.stop-count.${variantSuffix}`,
          claimLabel: `${variantSuffix} physical stop count`,
          canonicalValue: canonicalVariant ? String(canonicalVariant.steps.length) : undefined,
          displayedValue: String(presentationVariant.steps.length),
        },
      );

      const canonicalStopIds = canonicalVariant?.steps.map((step) => step.placeId) ?? [];
      const presentationStopIds = presentationVariant.steps.map((step) => step.spotId);
      if (new Set(canonicalStopIds).size !== canonicalStopIds.length
        || new Set(presentationStopIds).size !== presentationStopIds.length) {
        throw new Error(`Route ${journey.routeId} has duplicate stop identities in ${variantSuffix}.`);
      }
      const stopIds = [...new Set([...canonicalStopIds, ...presentationStopIds])].sort();
      for (const stopId of stopIds) {
        const canonicalIndex = canonicalStopIds.indexOf(stopId);
        const presentationIndex = presentationStopIds.indexOf(stopId);
        claims.push({
          ...routeCommon,
          claimId: `route.stop.${stopId}.membership.${variantSuffix}`,
          claimLabel: `${variantSuffix} membership for ${stopId}`,
          canonicalValue: canonicalIndex >= 0 ? 'included' : 'not included',
          displayedValue: presentationIndex >= 0 ? 'included' : 'not included',
        });
        if (canonicalIndex >= 0 && presentationIndex >= 0) {
          claims.push({
            ...routeCommon,
            claimId: `route.stop.${stopId}.position.${variantSuffix}`,
            claimLabel: `${variantSuffix} position for ${stopId}`,
            canonicalValue: String(canonicalIndex + 1),
            displayedValue: String(presentationIndex + 1),
          });
        }
      }

      const presentationKey = `${journey.id}:${presentationVariant.id}`;
      const stats = routeStats[presentationKey]?.ja;
      if (stats) {
        const statisticClaims = [
          ['route.duration-label', 'Displayed duration label', stats.time],
          ['route.distance', 'Duration / distance guidance', stats.distance],
          ['route.stop-count-label', 'Displayed stop-count label', stats.spots],
          ['route.origin-station', 'Origin station', stats.station],
          ['route.origin-travel-time', 'Origin travel-time guidance (minutes)', String(stats.travelMinutes)],
        ] as const;
        claims.push(...statisticClaims.map(([claimPrefix, claimLabel, displayedValue]) => ({
          ...routeCommon,
          claimId: `${claimPrefix}.${variantSuffix}`,
          claimLabel: `${variantSuffix} ${claimLabel}`,
          canonicalValue: undefined,
          displayedValue,
          canonicalOrigin: undefined,
          verification: 'demo' as const,
          primarySourceName: undefined,
          primarySourceUrl: undefined,
          retrievedAt: undefined,
          sourceUpdatedAt: undefined,
          confirmedAt: undefined,
          canonicalSourceFile: undefined,
          presentationSourceFile: 'src/features/netlify-parity/screens/RouteScreen.tsx',
          auditMetadata: true,
          timeSensitiveCaveat: 'Presentation-only route guidance has no safely comparable canonical field.',
        })));
      }

      const displayedSteps = routeStepText[presentationKey] ?? [];
      displayedSteps.forEach((step, index) => {
        const spotId = presentationVariant.steps[index]?.spotId;
        if (!spotId) return;
        if (step.walk) {
          const auditMetadata = ROUTE_STEP_WALK_AUDIT_METADATA[
            `${journey.id}:${presentationVariant.id}:${spotId}`
          ];
          claims.push({
            ...routeCommon,
            claimId: auditMetadata?.claimId
              ?? `route.stop.${spotId}.travel-guidance.${variantSuffix}`,
            claimLabel: auditMetadata?.claimLabel
              ?? `${variantSuffix} travel guidance before ${spotId}`,
            canonicalValue: undefined,
            displayedValue: step.walk.ja,
            canonicalOrigin: undefined,
            verification: 'demo',
            primarySourceName: undefined,
            primarySourceUrl: undefined,
            retrievedAt: undefined,
            sourceUpdatedAt: undefined,
            confirmedAt: undefined,
            canonicalSourceFile: undefined,
            presentationSourceFile: 'src/features/netlify-parity/screens/RouteScreen.tsx',
            auditMetadata: true,
          });
        }
        claims.push({
          ...routeCommon,
          claimId: `route.stop.${spotId}.guidance.${variantSuffix}`,
          claimLabel: `${variantSuffix} guidance for ${spotId}`,
          canonicalValue: undefined,
          displayedValue: [step.description.ja, step.note?.ja].filter(Boolean).join('\n'),
          canonicalOrigin: undefined,
          verification: 'demo',
          primarySourceName: undefined,
          primarySourceUrl: undefined,
          retrievedAt: undefined,
          sourceUpdatedAt: undefined,
          confirmedAt: undefined,
          canonicalSourceFile: undefined,
          presentationSourceFile: 'src/features/netlify-parity/screens/RouteScreen.tsx',
          auditMetadata: true,
        });
      });
    }
  }

  for (const route of modelRoutes) {
    const status = deriveVerificationStatus(route.source, 'editorial');
    const common = {
      entityType: 'Route' as const,
      entityId: route.id,
      entityName: route.nameJa,
      canonicalOrigin: 'editorial' as const,
      verification: status,
      primarySourceName: route.source.name,
      primarySourceUrl: route.source.url,
      retrievedAt: route.source.retrievedAt ?? route.source.lastVerified,
      sourceUpdatedAt: route.source.sourceUpdatedAt,
      confirmedAt: route.source.confirmedAt,
      appSurface: 'Route / Result',
      canonicalSourceFile: 'src/data/seed-routes.ts',
      timeSensitive: true,
      relevantIssue: '#129 / #333',
    };
    claims.push({
      ...common,
      claimId: 'route.name',
      claimLabel: 'Route name',
      claimKind: 'factual',
      canonicalValue: route.nameJa,
    });

    for (const [canonicalVariantId, variant] of Object.entries(route.variants)) {
      const variantSuffix = canonicalVariantId === '1-day' ? 'full-day' : 'half-day';
      claims.push(
        {
          ...common,
          claimId: `route.duration.${variantSuffix}`,
          claimLabel: `${variantSuffix} duration (minutes)`,
          claimKind: 'factual',
          canonicalValue: String(variant.totalMinutes),
          timeSensitiveCaveat: 'Authored duration is an estimate, not live travel time.',
        },
        {
          ...common,
          claimId: `route.stop-count.${variantSuffix}`,
          claimLabel: `${variantSuffix} physical stop count`,
          claimKind: 'factual',
          canonicalValue: String(variant.steps.length),
        },
        {
          ...common,
          claimId: `route.transport.${variantSuffix}`,
          claimLabel: `${variantSuffix} transport summary`,
          claimKind: 'factual',
          canonicalValue: variant.transportJa,
          timeSensitiveCaveat: 'Transport guidance is authored and must not be treated as a live schedule.',
        },
      );

      for (const step of variant.steps) {
        claims.push(
          {
            ...common,
            claimId: `route.stop.${step.placeId}.membership.${variantSuffix}`,
            claimLabel: `${variantSuffix} membership for ${step.placeId}`,
            claimKind: 'factual',
            canonicalValue: 'included',
          },
          {
            ...common,
            claimId: `route.stop.${step.placeId}.position.${variantSuffix}`,
            claimLabel: `${variantSuffix} position for ${step.placeId}`,
            claimKind: 'factual',
            canonicalValue: String(step.stepNumber),
          },
          {
            ...common,
            claimId: `route.stop.${step.placeId}.stay-minutes.${variantSuffix}`,
            claimLabel: `${variantSuffix} stay at ${step.placeId} (minutes)`,
            claimKind: 'factual',
            canonicalValue: String(step.stayMinutes),
            timeSensitiveCaveat: 'Stay duration is an editorial estimate.',
          },
          {
            ...common,
            claimId: `route.stop.${step.placeId}.role.${variantSuffix}`,
            claimLabel: `${variantSuffix} role for ${step.placeId}`,
            claimKind: 'editorial-narrative',
            canonicalValue: step.roleJa,
          },
        );
      }

      for (const mobility of variant.mobility) {
        const fromPlaceId = variant.steps.find(
          (step) => step.stepNumber === mobility.fromStep,
        )?.placeId;
        const toPlaceId = variant.steps.find(
          (step) => step.stepNumber === mobility.toStep,
        )?.placeId;
        if (!fromPlaceId || !toPlaceId) {
          throw new Error(`Route ${route.id} has mobility without stable stop identities.`);
        }
        const segment = `${fromPlaceId}-to-${toPlaceId}`;
        claims.push(
          {
            ...common,
            claimId: `route.mobility.${segment}.mode.${variantSuffix}`,
            claimLabel: `${variantSuffix} mobility ${segment} mode`,
            claimKind: 'factual',
            canonicalValue: mobility.mode,
            timeSensitiveCaveat: 'Transport mode is authored guidance, not a live itinerary.',
          },
          {
            ...common,
            claimId: `route.mobility.${segment}.duration.${variantSuffix}`,
            claimLabel: `${variantSuffix} mobility ${segment} duration (minutes)`,
            claimKind: 'factual',
            canonicalValue: String(mobility.durationMinutes),
            timeSensitiveCaveat: 'Travel duration is an editorial estimate, not live transit data.',
          },
          {
            ...common,
            claimId: `route.mobility.${segment}.label.${variantSuffix}`,
            claimLabel: `${variantSuffix} mobility ${segment} label`,
            claimKind: 'factual',
            canonicalValue: mobility.labelJa,
            timeSensitiveCaveat: 'Line and route labels can change; recheck current operator information.',
          },
        );
      }
    }
  }

  for (const canonicalPlace of places) {
    const status = deriveVerificationStatus(canonicalPlace.source, canonicalPlace.origin);
    const common = {
      entityType: 'Place' as const,
      entityId: canonicalPlace.id,
      entityName: canonicalPlace.nameJa,
      canonicalOrigin: canonicalPlace.origin,
      verification: status,
      primarySourceName: canonicalPlace.source.name,
      primarySourceUrl: canonicalPlace.source.url,
      retrievedAt: canonicalPlace.source.retrievedAt ?? canonicalPlace.source.lastVerified,
      sourceUpdatedAt: canonicalPlace.source.sourceUpdatedAt,
      confirmedAt: canonicalPlace.source.confirmedAt,
      appSurface: 'Route / Spot / Story',
      canonicalSourceFile: 'src/data/seed-places.ts',
      timeSensitive: true,
      relevantIssue: '#129 / #333',
    };
    if (!demoSpots[canonicalPlace.id]) {
      claims.push({
        ...common,
        claimId: 'name',
        claimLabel: 'Place / Spot name',
        claimKind: 'factual',
        canonicalValue: canonicalPlace.nameJa,
      });
    }
    if (canonicalPlace.id !== TOURISM_OFFICE_ID) {
      claims.push({
        ...common,
        claimId: 'address',
        claimLabel: 'Address / location',
        claimKind: 'factual',
        canonicalValue: canonicalPlace.address,
        timeSensitiveCaveat: 'Addresses and visitability can change; recheck before travel.',
      });
    }
    claims.push(
      {
        ...common,
        claimId: 'coordinates',
        claimLabel: 'Coordinates',
        claimKind: 'factual',
        canonicalValue: `${canonicalPlace.latitude}, ${canonicalPlace.longitude} (${canonicalPlace.coordinatePrecision ?? 'unspecified'})`,
        timeSensitiveCaveat: 'Coordinate precision is not a stakeholder confirmation or visitability guarantee.',
      },
      {
        ...common,
        claimId: 'official-current-information-url',
        claimLabel: 'Official / current-information URL',
        claimKind: 'factual',
        canonicalValue: canonicalPlace.source.url,
        timeSensitiveCaveat: 'A URL can be current while the facts behind it remain unconfirmed.',
      },
    );
  }

  for (const detail of Object.values(SPOT_DETAILS)) {
    const canonicalPlace = places.find((candidate) => candidate.id === detail.placeId);
    const status = deriveVerificationStatus(detail.source, detail.origin);
    const common = {
      entityType: 'Spot' as const,
      entityId: detail.placeId,
      entityName: canonicalPlace?.nameJa ?? detail.placeId,
      canonicalOrigin: detail.origin,
      verification: status,
      primarySourceName: detail.source.name,
      primarySourceUrl: detail.source.url,
      retrievedAt: detail.source.retrievedAt ?? detail.source.lastVerified,
      sourceUpdatedAt: detail.source.sourceUpdatedAt,
      confirmedAt: detail.source.confirmedAt,
      appSurface: 'Spot',
      canonicalSourceFile: 'src/data/seed-routes.ts',
      timeSensitive: false,
      relevantIssue: '#129 / #333',
    };
    claims.push({
      ...common,
      claimId: 'spot.description',
      claimLabel: 'Spot description / role',
      claimKind: 'editorial-narrative',
      canonicalValue: detail.roleJa,
    });

    const practicalClaims = [
      ['access-nearest-station', 'Access / nearest station', detail.practical?.accessJa],
      ['opening-hours', 'Opening hours', detail.practical?.hoursJa],
      ['closed-days', 'Closed days', detail.practical?.closedDaysJa],
      ['price-menu-product-availability', 'Price / menu / product availability', detail.practical?.priceJa],
      [
        'reservation',
        'Reservation requirement',
        detail.practical?.reservationAvailable === undefined
          ? undefined
          : String(detail.practical.reservationAvailable),
      ],
    ] as const;
    for (const [claimId, claimLabel, canonicalValue] of practicalClaims) {
      if (canonicalValue === undefined) continue;
      claims.push({
        ...common,
        claimId,
        claimLabel,
        claimKind: 'factual',
        canonicalValue,
        timeSensitive: true,
        timeSensitiveCaveat: 'Operational details can change; recheck the official source.',
      });
    }

    const languages = detail.tags.language?.join(', ');
    if (languages) {
      claims.push({
        ...common,
        claimId: 'multilingual-support',
        claimLabel: 'Multilingual support',
        claimKind: 'factual',
        canonicalValue: languages,
        timeSensitive: true,
      });
    }
    const dietary = [
      detail.tags.vegetarian === undefined ? undefined : `vegetarian: ${detail.tags.vegetarian}`,
      detail.tags.allergyNotice === undefined ? undefined : `allergy notice: ${detail.tags.allergyNotice}`,
    ].filter(Boolean).join(' / ');
    if (dietary) {
      claims.push({
        ...common,
        claimId: 'dietary-allergy-halal-vegan',
        claimLabel: 'Dietary / allergy / halal / vegan claims',
        claimKind: 'factual',
        canonicalValue: dietary,
        timeSensitive: true,
      });
    }
    if (detail.tags.accessibility !== undefined) {
      claims.push({
        ...common,
        claimId: 'accessibility',
        claimLabel: 'Accessibility',
        claimKind: 'factual',
        canonicalValue: String(detail.tags.accessibility),
        timeSensitive: true,
      });
    }
  }

  for (const culture of foodCultures) {
    const status = recordVerificationStatus(culture.sources, culture.origin);
    const primarySource = culture.sources.length === 1 ? culture.sources[0] : undefined;
    const needsClaimSourceMapping = culture.sources.length > 1;
    const common = {
      entityType: 'FoodCulture' as const,
      entityId: culture.id,
      entityName: culture.nameJa,
      canonicalOrigin: culture.origin,
      verification: status,
      primarySourceName: primarySource?.name,
      primarySourceUrl: primarySource?.url,
      retrievedAt: primarySource?.retrievedAt ?? primarySource?.lastVerified,
      sourceUpdatedAt: primarySource?.sourceUpdatedAt,
      confirmedAt: primarySource?.confirmedAt,
      appSurface: 'Story / MOGU / Result',
      canonicalSourceFile: 'src/data/seed-food-cultures.ts',
      timeSensitive: false,
      relevantIssue: '#129 / #333',
      auditMetadata: needsClaimSourceMapping,
      nextAction: needsClaimSourceMapping
        ? 'Add claim-level source mapping metadata; do not infer provenance from source-array order.'
        : undefined,
    };
    const fields = [
      ['name', 'Food culture name', culture.nameJa, 'factual'],
      ['description', 'Food culture description', culture.descriptionJa, 'editorial-narrative'],
      ['story', 'Food culture story', culture.storyJa, 'editorial-narrative'],
      ['history', 'Food culture history', culture.historyJa, 'editorial-narrative'],
      ['maker', 'Maker / producer narrative', culture.makerJa, 'editorial-narrative'],
      ['how-to-enjoy', 'How to enjoy', culture.howToEnjoyJa, 'editorial-narrative'],
    ] as const;
    claims.push(...fields.map(([claimId, claimLabel, canonicalValue, claimKind]) => ({
      ...common,
      claimId,
      claimLabel,
      claimKind,
      canonicalValue,
    })));
  }

  for (const evidence of Object.values(STORY_REGIONAL_EVIDENCE)) {
    const culture = foodCultures.find((candidate) => candidate.id === evidence.foodCultureId);
    const status = deriveVerificationStatus(evidence.source, 'source');
    const common = {
      entityType: 'Story' as const,
      entityId: evidence.foodCultureId,
      entityName: culture?.nameJa ?? evidence.foodCultureId,
      canonicalOrigin: 'source' as const,
      verification: status,
      primarySourceName: evidence.source.name,
      primarySourceUrl: evidence.source.url,
      retrievedAt: evidence.source.retrievedAt ?? evidence.source.lastVerified,
      sourceUpdatedAt: evidence.source.sourceUpdatedAt,
      confirmedAt: evidence.source.confirmedAt,
      appSurface: 'Story',
      canonicalSourceFile: 'src/data/regional-evidence.ts',
      timeSensitive: true,
      timeSensitiveCaveat: `Survey evidence describes ${evidence.sourceYear}, not current visitor behavior.`,
      relevantIssue: '#264 / #333',
    };
    claims.push(
      {
        ...common,
        claimId: 'story.regional-evidence.visit-rate',
        claimLabel: `${evidence.sourceYear} regional visit rate`,
        claimKind: 'factual',
        canonicalValue: `${evidence.value}${evidence.unit}`,
      },
      {
        ...common,
        claimId: 'story.regional-evidence.source-year',
        claimLabel: 'Regional evidence survey year',
        claimKind: 'factual',
        canonicalValue: String(evidence.sourceYear),
      },
    );
  }

  for (const journey of demoJourneys) {
    const culture = foodCultures.find((candidate) => candidate.id === journey.foodCultureId);
    const common = {
      entityType: 'Story' as const,
      entityId: journey.foodCultureId,
      entityName: culture?.nameJa ?? journey.copy.ja.storyTitle,
      presentationOrigin: 'demo' as const,
      verification: 'demo' as const,
      appSurface: 'Story',
      presentationSourceFile: 'src/features/netlify-parity/content.ts',
      timeSensitive: false,
      relevantIssue: '#333',
      auditMetadata: true,
    };
    claims.push(
      {
        ...common,
        claimId: 'story.title',
        claimLabel: 'Story title',
        claimKind: 'editorial-narrative',
        displayedValue: journey.copy.ja.storyTitle,
      },
      {
        ...common,
        claimId: 'story.journey-title',
        claimLabel: 'Story journey title',
        claimKind: 'editorial-narrative',
        displayedValue: journey.copy.ja.title,
      },
      {
        ...common,
        claimId: 'story.subtitle',
        claimLabel: 'Story subtitle',
        claimKind: 'editorial-narrative',
        displayedValue: journey.copy.ja.subtitle,
      },
    );

    journey.copy.ja.intro.forEach((intro) => {
      claims.push({
        ...common,
        claimId: `story.introduction.${intro.claimId}`,
        claimLabel: `Story introduction: ${intro.claimId}`,
        claimKind: 'editorial-narrative',
        displayedValue: intro.text,
      });
    });

    journey.chapters.ja.forEach((chapter) => {
      claims.push({
        ...common,
        claimId: `story.chapter.${chapter.claimId}`,
        claimLabel: `Story chapter: ${chapter.claimId}`,
        claimKind: 'editorial-narrative',
        displayedValue: `${chapter.title}\n${chapter.body}`,
      });
    });

    for (const auditClaim of STORY_FACTUAL_AUDIT_CLAIMS[journey.id] ?? []) {
      const parentClaimIds = [
        auditClaim.parentClaimId,
        ...(auditClaim.additionalParentClaimIds ?? []),
      ];
      claims.push({
        entityType: 'Story',
        entityId: journey.foodCultureId,
        entityName: culture?.nameJa ?? journey.copy.ja.storyTitle,
        claimId: auditClaim.claimId,
        claimLabel: auditClaim.claimLabel,
        claimKind: 'factual',
        canonicalValue: undefined,
        displayedValue: undefined,
        verification: 'unknown',
        appSurface: 'Story',
        timeSensitive: Boolean(auditClaim.timeSensitive),
        timeSensitiveCaveat: auditClaim.timeSensitive
          ? 'The current presentation assertion can change and has no safe claim-level source mapping.'
          : undefined,
        relevantIssue: '#333',
        nextAction: `Map ${parentClaimIds.join(' and ')} to structured source-backed claim metadata; do not parse or duplicate their prose values.`,
        auditMetadata: true,
      });
    }

    const point = chapterPoint[journey.id]?.ja;
    if (point) {
      claims.push({
        ...common,
        claimId: 'story.point',
        claimLabel: 'Story MOGUMOGU point',
        claimKind: 'editorial-narrative',
        displayedValue: `${point.title}\n${point.body}`,
        presentationSourceFile: 'src/features/netlify-parity/screens/StoryScreen.tsx',
      });
    }

    const location = storyLocation[journey.id]?.ja;
    if (location) {
      claims.push(
        {
          ...common,
          claimId: 'story.region',
          claimLabel: 'Story region',
          claimKind: 'factual',
          displayedValue: location.region,
          presentationSourceFile: 'src/features/netlify-parity/screens/StoryScreen.tsx',
        },
        {
          ...common,
          claimId: 'story.nearest-station',
          claimLabel: 'Story nearest-station guidance',
          claimKind: 'factual',
          displayedValue: location.station,
          presentationSourceFile: 'src/features/netlify-parity/screens/StoryScreen.tsx',
          timeSensitive: true,
          timeSensitiveCaveat: 'Nearest-station guidance is presentation-only and needs source checking.',
        },
      );
    }

    const groups = storySpotGroups[journey.id];
    for (const [groupName, entries] of Object.entries(groups ?? {})) {
      for (const entry of entries) {
        const displayedValue = [entry.description?.ja, entry.note?.ja].filter(Boolean).join('\n');
        if (!displayedValue) continue;
        const claimId = STORY_SPOT_CLAIM_IDS[
          `${journey.id}:${groupName}:${entry.spotId}:${entry.imageAssetId}`
        ] ?? `story.${groupName}.${entry.spotId}.description`;
        claims.push({
          ...common,
          claimId,
          claimLabel: `${groupName} Spot claim: ${entry.spotId}`,
          claimKind: 'factual',
          displayedValue,
          presentationSourceFile: 'src/features/netlify-parity/screens/StoryScreen.tsx',
          timeSensitive: true,
          timeSensitiveCaveat: 'Venue and availability claims can change and need explicit sourcing.',
        });
      }
    }
  }

  for (const [mediaId, media] of Object.entries(FIELDWORK_MEDIA)) {
    const mapping = media.mapping;
    const placeId = mapping.scope === 'place' ? mapping.placeId : undefined;
    const entityId = mapping.scope === 'place'
      ? mapping.placeId
      : `region:${mapping.regionId}`;
    const canonicalPlace = placeId
      ? places.find((candidate) => candidate.id === placeId)
      : undefined;
    claims.push({
      entityType: mapping.scope === 'place' ? 'Place' : 'Story',
      entityId,
      entityName: canonicalPlace?.nameJa ?? entityId,
      claimId: `fieldwork.observation.${mediaId}`,
      claimLabel: `Fieldwork observation: ${media.text.ja.title}`,
      claimKind: 'fieldwork-observation',
      canonicalValue: `${media.text.ja.title}\n${media.text.ja.caption}`,
      canonicalOrigin: 'source',
      verification: 'needs_confirmation',
      primarySourceName: `Fieldwork media: ${media.provenance.originalFileName}`,
      primarySourceUrl: media.provenance.sourceFolderUrl,
      retrievedAt: media.provenance.reviewedAt,
      confirmedAt: undefined,
      appSurface: 'Story / Route / Spot',
      canonicalSourceFile: 'src/data/fieldwork-media.ts',
      timeSensitive: false,
      relevantIssue: '#258–#270 / #333',
      nextAction: mapping.constraint,
      auditMetadata: true,
    });
  }

  return coalesceClaims(claims);
}
