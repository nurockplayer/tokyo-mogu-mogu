import { describe, expect, it } from 'vitest';
import {
  DEMO_FUSSA_SAKE_CANDIDATE_ID,
  DEMO_RECOMMENDATION_CANDIDATES,
  getFoodCultureById,
  getRouteById,
  places,
} from './index';
import { buildJourneyPresentation } from './journey-presentation';

describe('buildJourneyPresentation', () => {
  it('projects route-backed choice metadata without changing candidate semantics', () => {
    const candidate = DEMO_RECOMMENDATION_CANDIDATES.find(
      (item) => item.id === DEMO_FUSSA_SAKE_CANDIDATE_ID,
    );
    const culture = candidate ? getFoodCultureById(candidate.foodCultureId) : undefined;
    const route = candidate?.journeyId ? getRouteById(candidate.journeyId) : undefined;

    expect(candidate && culture && route).toBeTruthy();
    const presentation = buildJourneyPresentation(candidate!, culture!, route!, places);

    expect(presentation).toMatchObject({
      candidateId: DEMO_FUSSA_SAKE_CANDIDATE_ID,
      foodCultureId: 'sake-fussa',
      routeId: 'fussa-sake-journey',
      duration: 'half-day',
      totalMinutes: 195,
      stopCount: 3,
      representativePlaces: [
        { id: 'fussa-tamura-shuzo' },
        { id: 'fussa-kurumiru' },
        { id: 'fussa-ishikawa-shuzo' },
      ],
      origin: 'editorial',
      sourceStatus: 'needs_confirmation',
      sourceDate: { label: 'detailRetrieved', date: '2026-08-19' },
    });
  });

  it('keeps unresolved route stops absent instead of inventing a destination', () => {
    const candidate = DEMO_RECOMMENDATION_CANDIDATES.find(
      (item) => item.id === DEMO_FUSSA_SAKE_CANDIDATE_ID,
    )!;
    const culture = getFoodCultureById(candidate.foodCultureId)!;
    const route = getRouteById(candidate.journeyId!)!;
    const routePlaces = places.filter((place) => place.id !== 'fussa-kurumiru');

    const presentation = buildJourneyPresentation(candidate, culture, route, routePlaces);

    expect(presentation?.stopCount).toBe(3);
    expect(presentation?.representativePlaces.map((place) => place.id)).toEqual([
      'fussa-tamura-shuzo',
      'fussa-ishikawa-shuzo',
    ]);
  });

  it('projects all five enabled journeys from their own route records', () => {
    const presentations = DEMO_RECOMMENDATION_CANDIDATES.flatMap((candidate) => {
      const culture = getFoodCultureById(candidate.foodCultureId);
      const route = candidate.journeyId ? getRouteById(candidate.journeyId) : undefined;
      const presentation = culture && route
        ? buildJourneyPresentation(candidate, culture, route, places)
        : undefined;
      return presentation ? [presentation] : [];
    });

    expect(presentations.map((presentation) => presentation.routeId)).toEqual([
      'okutama-wasabi-journey',
      'ome-sawai-sake-journey',
      'hachioji-ginger-journey',
      'fussa-sake-journey',
      'akiruno-seasonal-produce-journey',
    ]);
    expect(presentations.every((presentation) => presentation.stopCount > 0)).toBe(true);
    expect(presentations.every((presentation) => presentation.sourceDate !== undefined)).toBe(true);
  });

  it('does not project unavailable or mismatched candidate data', () => {
    const candidate = DEMO_RECOMMENDATION_CANDIDATES.find(
      (item) => item.id === DEMO_FUSSA_SAKE_CANDIDATE_ID,
    )!;
    const culture = getFoodCultureById(candidate.foodCultureId)!;
    const route = getRouteById(candidate.journeyId!)!;

    expect(
      buildJourneyPresentation({ ...candidate, availability: 'unavailable' }, culture, route, places),
    ).toBeUndefined();
    expect(
      buildJourneyPresentation({ ...candidate, journeyId: 'other-route' }, culture, route, places),
    ).toBeUndefined();
  });
});
