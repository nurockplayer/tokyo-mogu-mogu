import { describe, expect, it } from 'vitest';
import {
  classifyJourneyQuery,
  referenceJourneyQueryIdentities,
  type JourneyQueryIdentity,
} from './reference-journey-query';
import { demoJourneys } from '../features/netlify-parity/content';

const referenceJourneys: readonly JourneyQueryIdentity[] = [
  {
    candidateId: 'demo-okutama-wasabi',
    resultId: 'wasabi-okutama',
    routeId: 'okutama-wasabi-journey',
  },
  {
    candidateId: 'demo-okutama-yamame',
    resultId: 'yamame-okutama',
    routeId: 'okutama-yamame-journey',
  },
];

const legacyJourneys: readonly JourneyQueryIdentity[] = [
  {
    candidateId: 'demo-ome-sake',
    resultId: 'sake-ome',
    routeId: 'ome-sawai-sake-journey',
  },
  {
    candidateId: 'demo-tokyo-hachioji-ginger',
    resultId: 'hachioji-ginger',
    routeId: 'hachioji-ginger-journey',
  },
  {
    candidateId: 'demo-tokyo-west-fussa-sake',
    resultId: 'sake-fussa',
    routeId: 'fussa-sake-journey',
  },
  {
    candidateId: 'demo-tokyo-west-akiruno-produce',
    resultId: 'produce-akiruno',
    routeId: 'akiruno-seasonal-produce-journey',
  },
];

function historicalIndependentReferenceAllowlist(search: string): boolean {
  const params = new URLSearchParams(search);
  const candidateId = params.get('candidateId');
  const resultId = params.get('resultId');
  const routeId = params.get('routeId');

  return (
    (!candidateId || referenceJourneys.some((journey) => journey.candidateId === candidateId)) &&
    (!resultId || referenceJourneys.some((journey) => journey.resultId === resultId)) &&
    (!routeId || referenceJourneys.some((journey) => journey.routeId === routeId))
  );
}

describe('reference journey query classification', () => {
  it('documents that the previous independent allowlist admitted a mismatched reference tuple', () => {
    expect(
      historicalIndependentReferenceAllowlist(
        '?candidateId=demo-okutama-wasabi&resultId=yamame-okutama',
      ),
    ).toBe(true);
  });

  it('derives every current result alias from the demo journey inventory', () => {
    const identities = referenceJourneyQueryIdentities(demoJourneys);

    for (const journey of demoJourneys) {
      expect(classifyJourneyQuery(`?resultId=${journey.foodCultureId}`, identities, [])).toBe(
        'reference',
      );
      expect(classifyJourneyQuery(`?resultId=${journey.storyId}`, identities, [])).toBe(
        'reference',
      );
    }

    const storyAlias = 'wasabi-story-alias';
    const mutatedInventory = [{ ...demoJourneys[0], storyId: storyAlias }];
    expect(
      classifyJourneyQuery(
        `?resultId=${storyAlias}`,
        referenceJourneyQueryIdentities(mutatedInventory),
        [],
      ),
    ).toBe('reference');
  });

  it.each([
    ['queryless entry', '', 'reference'],
    ['context-only entry', '?from=mogu&backTo=%2Fdiscover', 'reference'],
    ['wasabi candidate-only entry', '?candidateId=demo-okutama-wasabi', 'reference'],
    ['wasabi result-only entry', '?resultId=wasabi-okutama', 'reference'],
    ['wasabi route-only entry', '?routeId=okutama-wasabi-journey', 'reference'],
    ['wasabi complete tuple', '?candidateId=demo-okutama-wasabi&resultId=wasabi-okutama&routeId=okutama-wasabi-journey', 'reference'],
    ['yamame candidate-only entry', '?candidateId=demo-okutama-yamame', 'reference'],
    ['yamame result-only entry', '?resultId=yamame-okutama', 'reference'],
    ['yamame route-only entry', '?routeId=okutama-yamame-journey', 'reference'],
    ['yamame complete tuple', '?candidateId=demo-okutama-yamame&resultId=yamame-okutama&routeId=okutama-yamame-journey', 'reference'],
    ['identical current candidate values', '?candidateId=demo-okutama-wasabi&candidateId=demo-okutama-wasabi&routeId=okutama-wasabi-journey', 'reference'],
    ['identical current result values', '?candidateId=demo-okutama-wasabi&resultId=wasabi-okutama&resultId=wasabi-okutama&routeId=okutama-wasabi-journey', 'reference'],
    ['identical current route values', '?candidateId=demo-okutama-wasabi&routeId=okutama-wasabi-journey&routeId=okutama-wasabi-journey', 'reference'],
    ['contradictory current candidate values', '?candidateId=demo-okutama-wasabi&candidateId=demo-okutama-yamame&routeId=okutama-wasabi-journey', 'duplicate-conflict'],
    ['reverse contradictory current candidate values', '?candidateId=demo-okutama-yamame&candidateId=demo-okutama-wasabi&routeId=okutama-wasabi-journey', 'duplicate-conflict'],
    ['contradictory current result values', '?candidateId=demo-okutama-wasabi&resultId=wasabi-okutama&resultId=yamame-okutama&routeId=okutama-wasabi-journey', 'duplicate-conflict'],
    ['contradictory current route values', '?candidateId=demo-okutama-wasabi&routeId=okutama-wasabi-journey&routeId=okutama-yamame-journey', 'duplicate-conflict'],
    ['legacy MOGU result-only entry', '?from=mogu&resultId=wasabi-okutama', 'reference'],
    ['legacy MOGU candidate and result entry', '?from=mogu&candidateId=demo-okutama-wasabi&resultId=wasabi-okutama', 'reference'],
    ['mismatched reference tuple', '?candidateId=demo-okutama-wasabi&resultId=yamame-okutama', 'reference-conflict'],
    ['mismatched current candidate and route', '?candidateId=demo-okutama-yamame&routeId=okutama-wasabi-journey', 'reference-conflict'],
    ['inverse mismatched current candidate and route', '?candidateId=demo-okutama-wasabi&routeId=okutama-yamame-journey', 'reference-conflict'],
    ['mismatched complete current tuple', '?candidateId=demo-okutama-yamame&resultId=yamame-okutama&routeId=okutama-wasabi-journey', 'reference-conflict'],
    ['mismatched known current and model fields', '?candidateId=demo-okutama-wasabi&resultId=sake-ome', 'invalid'],
    ['mismatched current candidate and legacy route', '?candidateId=demo-okutama-yamame&routeId=ome-sawai-sake-journey', 'invalid'],
    ['unknown candidate', '?candidateId=unknown-candidate', 'invalid'],
    ['unknown result', '?resultId=unknown-result', 'invalid'],
    ['empty candidate', '?candidateId=', 'invalid'],
    ['empty result', '?resultId=', 'invalid'],
    ['empty route', '?routeId=', 'invalid'],
    ['identical empty candidate values', '?candidateId=&candidateId=', 'invalid'],
    ['empty and current candidate values', '?candidateId=&candidateId=demo-okutama-wasabi&routeId=okutama-wasabi-journey', 'duplicate-conflict'],
    ['explicit stale route', '?routeId=stale-route', 'invalid'],
    ['identical explicit stale route values', '?routeId=stale-route&routeId=stale-route', 'invalid'],
    ['contradictory explicit stale route values', '?routeId=stale-route&routeId=other-stale-route', 'duplicate-conflict'],
    ['Ome model candidate', '?candidateId=demo-ome-sake', 'legacy'],
    ['Ome model result', '?resultId=sake-ome', 'legacy'],
    ['Ome model route', '?routeId=ome-sawai-sake-journey', 'legacy'],
    ['identical Ome model candidate values', '?candidateId=demo-ome-sake&candidateId=demo-ome-sake&routeId=ome-sawai-sake-journey', 'legacy'],
    ['contradictory legacy model candidate values', '?candidateId=demo-ome-sake&candidateId=demo-tokyo-hachioji-ginger&routeId=ome-sawai-sake-journey', 'duplicate-conflict'],
    ['mismatched legacy model tuple', '?candidateId=demo-ome-sake&resultId=hachioji-ginger', 'invalid'],
    ['Hachioji model candidate', '?candidateId=demo-tokyo-hachioji-ginger', 'legacy'],
    ['Hachioji model result', '?resultId=hachioji-ginger', 'legacy'],
    ['Hachioji model route', '?routeId=hachioji-ginger-journey', 'legacy'],
    ['Hachioji model tuple', '?candidateId=demo-tokyo-hachioji-ginger&resultId=hachioji-ginger&routeId=hachioji-ginger-journey', 'legacy'],
    ['Fussa model candidate', '?candidateId=demo-tokyo-west-fussa-sake', 'legacy'],
    ['Fussa model result', '?resultId=sake-fussa', 'legacy'],
    ['Fussa model route', '?routeId=fussa-sake-journey', 'legacy'],
    ['Fussa model tuple', '?candidateId=demo-tokyo-west-fussa-sake&resultId=sake-fussa&routeId=fussa-sake-journey', 'legacy'],
    ['Akiruno model candidate', '?candidateId=demo-tokyo-west-akiruno-produce', 'legacy'],
    ['Akiruno model result', '?resultId=produce-akiruno', 'legacy'],
    ['Akiruno model route', '?routeId=akiruno-seasonal-produce-journey', 'legacy'],
    ['Akiruno model tuple', '?candidateId=demo-tokyo-west-akiruno-produce&resultId=produce-akiruno&routeId=akiruno-seasonal-produce-journey', 'legacy'],
  ])('%s is %s', (_description, search, expected) => {
    expect(classifyJourneyQuery(search, referenceJourneys, legacyJourneys)).toBe(expected);
  });
});
