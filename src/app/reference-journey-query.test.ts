import { describe, expect, it } from 'vitest';
import {
  classifyJourneyQuery,
  type JourneyQueryIdentity,
} from './reference-journey-query';

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

  it.each([
    ['queryless entry', '', 'reference'],
    ['context-only entry', '?from=mogu&backTo=%2Fdiscover', 'reference'],
    ['wasabi candidate-only entry', '?candidateId=demo-okutama-wasabi', 'reference'],
    ['wasabi result-only entry', '?resultId=wasabi-okutama', 'reference'],
    ['wasabi route-only entry', '?routeId=okutama-wasabi-journey', 'reference'],
    ['yamame candidate-only entry', '?candidateId=demo-okutama-yamame', 'reference'],
    ['yamame result-only entry', '?resultId=yamame-okutama', 'reference'],
    ['yamame route-only entry', '?routeId=okutama-yamame-journey', 'reference'],
    ['yamame complete tuple', '?candidateId=demo-okutama-yamame&resultId=yamame-okutama&routeId=okutama-yamame-journey', 'reference'],
    ['legacy MOGU result-only entry', '?from=mogu&resultId=wasabi-okutama', 'reference'],
    ['legacy MOGU candidate and result entry', '?from=mogu&candidateId=demo-okutama-wasabi&resultId=wasabi-okutama', 'reference'],
    ['mismatched reference tuple', '?candidateId=demo-okutama-wasabi&resultId=yamame-okutama', 'invalid'],
    ['mismatched known current and model fields', '?candidateId=demo-okutama-wasabi&resultId=sake-ome', 'invalid'],
    ['unknown candidate', '?candidateId=unknown-candidate', 'invalid'],
    ['unknown result', '?resultId=unknown-result', 'invalid'],
    ['empty candidate', '?candidateId=', 'invalid'],
    ['empty result', '?resultId=', 'invalid'],
    ['explicit stale route', '?routeId=stale-route', 'invalid'],
    ['Ome model candidate', '?candidateId=demo-ome-sake', 'legacy'],
    ['Ome model result', '?resultId=sake-ome', 'legacy'],
    ['Ome model route', '?routeId=ome-sawai-sake-journey', 'legacy'],
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
