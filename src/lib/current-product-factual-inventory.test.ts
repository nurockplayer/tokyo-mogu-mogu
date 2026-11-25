import { describe, expect, it, vi } from 'vitest';
import { buildCurrentProductFactualInventory } from './current-product-factual-inventory';

describe('current Product factual inventory (#343)', () => {
  it('includes every route and Story reference, deduplicates shared Spots, and orders by type and ID', async () => {
    vi.resetModules();
    vi.doMock('../features/netlify-parity/factual-presentation', () => ({
      currentJourneys: [
        {
          id: 'z', storyId: 'z-story', routeId: 'z-route',
          routeVariants: [
            { steps: [{ spotId: 'shared' }] },
            { steps: [{ spotId: 'variant-only' }] },
          ],
        },
        {
          id: 'a', storyId: 'a-story', routeId: 'a-route',
          routeVariants: [{ steps: [{ spotId: 'shared' }] }],
        },
      ],
      currentSpots: { shared: {}, 'variant-only': {}, nearby: {}, nature: {}, dormant: {} },
      storySpotGroups: {
        z: {
          nearby: [{ spotId: 'nearby' }, { spotId: 'shared' }],
          nature: [{ spotId: 'nature' }],
        },
      },
    }));

    try {
      const { buildCurrentProductFactualInventory: buildFixtureInventory } =
        await import('./current-product-factual-inventory');
      expect(buildFixtureInventory()).toEqual([
        { id: 'nature', type: 'Spot' },
        { id: 'nearby', type: 'Spot' },
        { id: 'shared', type: 'Spot' },
        { id: 'variant-only', type: 'Spot' },
        { id: 'a-story', type: 'Story' },
        { id: 'z-story', type: 'Story' },
        { id: 'a-route', type: 'Route' },
        { id: 'z-route', type: 'Route' },
      ]);
    } finally {
      vi.doUnmock('../features/netlify-parity/factual-presentation');
      vi.resetModules();
    }
  });

  it('includes published and excludes dormant repository identities', () => {
    const inventory = buildCurrentProductFactualInventory();

    expect(inventory).toEqual(expect.arrayContaining([
      { id: 'sawai-ozawa-shuzo', type: 'Spot' },
      { id: 'sake-ome', type: 'Story' },
      { id: 'ome-sawai-sake-journey', type: 'Route' },
    ]));
    const ids = inventory.map(({ id }) => id);
    expect(ids).not.toContain('fussa-water-heritage-course');
    expect(ids).not.toContain('demo-tokyo-west-akiruno-produce');
  });
});
