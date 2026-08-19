import { describe, expect, it } from 'vitest';
import { resolveKey } from '../i18n/fallback';
import {
  FOOD_CULTURE_DATA_KEYS,
  ROUTE_DATA_KEYS,
  STORY_DATA_KEYS,
  mobilityLabelKey,
  placeNameKey,
  routeAreaKey,
  routeNameKey,
  routeTransportKey,
  spotRoleKey,
  stepRoleKey,
  storyContent,
} from '../i18n/data-content';
import { strings } from '../i18n/resources';
import { createDefaultExplorationAnswers } from '../lib/exploration';
import { createDefaultFoodProfile } from '../lib/food-profile';
import { recommendCandidates } from '../lib/recommendation';
import {
  DEMO_AKIRUNO_PRODUCE_CANDIDATE_ID,
  DEMO_FUSSA_SAKE_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATES,
  demoRecommendationMatchTags,
} from './demo-recommendation';
import { getFoodCultureById, getPlaceById, getRouteById, getRouteIdForPlace } from './index';
import { getSpotDetail } from './seed-routes';
import {
  discoverableCandidates,
  isCandidateDiscoverable,
  isCandidateRecommendable,
  recommendableCandidates,
} from './slice-manifest';

const LOCALES = ['ja', 'en', 'zh-TW'] as const;

const LANES = [
  {
    cultureId: 'sake-fussa',
    routeId: 'fussa-sake-journey',
    candidateId: DEMO_FUSSA_SAKE_CANDIDATE_ID,
    expectedPlaceIds: ['fussa-tamura-shuzo', 'fussa-ishikawa-shuzo'],
  },
  {
    cultureId: 'produce-akiruno',
    routeId: 'akiruno-seasonal-produce-journey',
    candidateId: DEMO_AKIRUNO_PRODUCE_CANDIDATE_ID,
    expectedPlaceIds: ['akiruno-farmers-center', 'akiruno-seoto-no-yu'],
  },
] as const;

describe('Issue #241 selected journey slices', () => {
  it.each(LANES)('$cultureId has a complete source-backed journey contract', (lane) => {
    const culture = getFoodCultureById(lane.cultureId);
    const route = getRouteById(lane.routeId);

    expect(culture).toMatchObject({ area: expect.any(String), origin: 'editorial' });
    expect(culture?.placeIds).toEqual(expect.arrayContaining(Array.from(lane.expectedPlaceIds)));
    expect(culture?.sources.length).toBeGreaterThanOrEqual(3);
    expect(culture?.sources.every((source) => source.retrievedAt)).toBe(true);

    expect(route).toMatchObject({
      id: lane.routeId,
      source: { verificationStatus: 'needs_confirmation' },
    });
    expect(route).not.toHaveProperty('isDemo');
    expect(route?.sources?.length).toBeGreaterThanOrEqual(3);

    for (const duration of ['half-day', '1-day'] as const) {
      const variant = route!.variants[duration];
      expect(variant.steps.length).toBeGreaterThanOrEqual(2);
      expect(variant.mobility.length).toBe(variant.steps.length - 1);
      expect(variant.totalMinutes).toBeGreaterThan(0);
      expect(variant.steps.map((step) => step.stepNumber)).toEqual(
        Array.from({ length: variant.steps.length }, (_, index) => index + 1),
      );
      for (const step of variant.steps) {
        expect(getPlaceById(step.placeId), `missing place ${step.placeId}`).toBeDefined();
        expect(getSpotDetail(step.placeId), `missing spot ${step.placeId}`).toBeDefined();
        expect(getRouteIdForPlace(step.placeId)).toBe(lane.routeId);
        expect(stepRoleKey(lane.routeId, step.placeId, duration)).toBeTypeOf('string');
        expect(spotRoleKey(step.placeId)).toBeTypeOf('string');
        expect(placeNameKey(step.placeId)).toBeTypeOf('string');
      }
      for (const segment of variant.mobility) {
        expect(segment.toStep).toBe(segment.fromStep + 1);
        expect(mobilityLabelKey(lane.routeId, segment.fromStep, segment.toStep)).toBeTypeOf('string');
      }
    }

    const cultureKeys = Object.values(FOOD_CULTURE_DATA_KEYS[lane.cultureId] ?? {});
    const storyKeys = Object.values(STORY_DATA_KEYS[lane.cultureId] ?? {});
    expect(storyContent(lane.cultureId)).toBeDefined();
    for (const key of [...cultureKeys, ...storyKeys]) {
      if (typeof key !== 'string' || key === lane.cultureId) continue;
      for (const locale of LOCALES) {
        expect(resolveKey(strings, locale, key as keyof typeof strings.ja)).not.toMatch(/^missing:/);
      }
    }

    expect(routeNameKey(lane.routeId)).toBe(ROUTE_DATA_KEYS[lane.routeId as keyof typeof ROUTE_DATA_KEYS].name);
    expect(routeAreaKey(lane.routeId)).toBeTypeOf('string');
    expect(routeTransportKey(lane.routeId)).toBeTypeOf('string');
  });

  it('exposes both selected lanes on Discover and recommendation surfaces', () => {
    for (const lane of LANES) {
      expect(isCandidateDiscoverable(lane.candidateId)).toBe(true);
      expect(isCandidateRecommendable(lane.candidateId)).toBe(true);
    }
    expect(recommendableCandidates(DEMO_RECOMMENDATION_CANDIDATES).map((candidate) => candidate.id)).toEqual(
      DEMO_RECOMMENDATION_CANDIDATES.map((candidate) => candidate.id),
    );
    expect(discoverableCandidates(DEMO_RECOMMENDATION_CANDIDATES).map((candidate) => candidate.id)).toEqual(
      DEMO_RECOMMENDATION_CANDIDATES.map((candidate) => candidate.id),
    );
  });

  it('selects Fussa for a maker/water-town sake trip without borrowing wasabi tags', () => {
    const decision = recommendCandidates(
      createDefaultFoodProfile('2026-08-19T00:00:00.000Z'),
      {
        ...createDefaultExplorationAnswers(),
        tastes: ['sweet'],
        experiences: ['meet'],
        interests: ['daily-life'],
        duration: 'half-day',
      },
      DEMO_RECOMMENDATION_CANDIDATES,
    );

    expect(decision.selected?.candidate.id).toBe(DEMO_FUSSA_SAKE_CANDIDATE_ID);
    expect(demoRecommendationMatchTags(decision.selected!.candidate.id, decision.selected!.explanation.reasons)).toEqual(
      expect.arrayContaining(['meet-maker', 'daily-life']),
    );
    expect(demoRecommendationMatchTags(decision.selected!.candidate.id, decision.selected!.explanation.reasons)).not.toContain(
      'grate-fresh',
    );
  });

  it('selects Akiruno for a seasonal produce trip with an explicit direct-sale action', () => {
    const decision = recommendCandidates(
      createDefaultFoodProfile('2026-08-19T00:00:00.000Z'),
      {
        ...createDefaultExplorationAnswers(),
        tastes: ['sweet'],
        experiences: ['buy'],
        interests: ['nature'],
        duration: 'half-day',
      },
      DEMO_RECOMMENDATION_CANDIDATES,
    );

    expect(decision.selected?.candidate.id).toBe(DEMO_AKIRUNO_PRODUCE_CANDIDATE_ID);
    expect(demoRecommendationMatchTags(decision.selected!.candidate.id, decision.selected!.explanation.reasons)).toEqual(
      expect.arrayContaining(['buy-gift', 'nature-valley']),
    );
    expect(demoRecommendationMatchTags(decision.selected!.candidate.id, decision.selected!.explanation.reasons)).not.toContain(
      'grate-fresh',
    );
  });
});
