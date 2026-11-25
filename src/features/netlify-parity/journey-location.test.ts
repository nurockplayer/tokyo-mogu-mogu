import { describe, expect, it } from 'vitest';
import { resolveCurrentJourneyLocation } from './journey-location';

describe('current journey location resolution', () => {
  it('resolves Hachioji Story, Route, and both Spots to the recovered journey', () => {
    for (const resolution of [
      resolveCurrentJourneyLocation('/story/hachioji-ginger', ''),
      resolveCurrentJourneyLocation('/route', '?candidateId=demo-tokyo-hachioji-ginger'),
      resolveCurrentJourneyLocation('/route', '?routeId=hachioji-ginger-journey'),
      resolveCurrentJourneyLocation('/spot/hachioji-takiyama-roadside-station', ''),
      resolveCurrentJourneyLocation('/spot/hachioji-takiyama-castle', ''),
    ]) {
      expect(resolution).toMatchObject({ status: 'resolved', journey: { id: 'demo-tokyo-hachioji-ginger' } });
    }
  });

  it('fails closed for Hachioji identities paired with a different or unknown journey', () => {
    expect(resolveCurrentJourneyLocation(
      '/story/hachioji-ginger',
      '?candidateId=demo-okutama-wasabi',
    )).toMatchObject({ status: 'invalid', isReferenceStoryPath: true, hasJourneyQuery: true });
    expect(resolveCurrentJourneyLocation(
      '/spot/hachioji-takiyama-roadside-station',
      '?routeId=not-a-current-route',
    )).toMatchObject({ status: 'invalid', spot: { id: 'hachioji-takiyama-roadside-station' }, hasJourneyQuery: true });
    expect(resolveCurrentJourneyLocation('/story/not-current', '')).toMatchObject({ status: 'not-current', isReferenceStoryPath: false });
  });

  it.each([
    '/story/%E0%A4%A',
    '/spot/%E0%A4%A',
  ])('fails closed for a malformed encoded path identity: %s', (pathname) => {
    expect(resolveCurrentJourneyLocation(pathname, '').status).toBe('invalid');
  });
});
