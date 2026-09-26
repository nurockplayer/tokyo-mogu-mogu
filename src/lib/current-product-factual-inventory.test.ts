import { describe, expect, it } from 'vitest';
import { buildCurrentProductFactualInventory } from './current-product-factual-inventory';

describe('current Product factual inventory (#343)', () => {
  it('derives the current journeys, their Stories, Routes, and reachable Spots', () => {
    expect(buildCurrentProductFactualInventory()).toEqual([
      { id: 'akabeko', type: 'Spot' },
      { id: 'akiruno-farmers-center', type: 'Spot' },
      { id: 'akiruno-seoto-no-yu', type: 'Spot' },
      { id: 'baba-oshijutaku', type: 'Spot' },
      { id: 'fussa-ishikawa-shuzo', type: 'Spot' },
      { id: 'fussa-kurumiru', type: 'Spot' },
      { id: 'fussa-tamura-shuzo', type: 'Spot' },
      { id: 'hachioji-takiyama-castle', type: 'Spot' },
      { id: 'hachioji-takiyama-roadside-station', type: 'Spot' },
      { id: 'hikawa-valley', type: 'Spot' },
      { id: 'mitake-shrine', type: 'Spot' },
      { id: 'mitake-station', type: 'Spot' },
      { id: 'oku-hikawa-shrine', type: 'Spot' },
      { id: 'okutama-kitchen', type: 'Spot' },
      { id: 'okutama-station', type: 'Spot' },
      { id: 'okutama-tourism-office', type: 'Spot' },
      { id: 'port-okutama', type: 'Spot' },
      { id: 'sawai-ozawa-shuzo', type: 'Spot' },
      { id: 'sawanoien-garden', type: 'Spot' },
      { id: 'wasabi-experience', type: 'Spot' },
      { id: 'wasabi-kitchen', type: 'Spot' },
      { id: 'yamashiroya', type: 'Spot' },
      { id: 'hachioji-ginger', type: 'Story' },
      { id: 'produce-akiruno', type: 'Story' },
      { id: 'sake-fussa', type: 'Story' },
      { id: 'sake-ome', type: 'Story' },
      { id: 'wasabi-okutama', type: 'Story' },
      { id: 'yamame-okutama', type: 'Story' },
      { id: 'akiruno-seasonal-produce-journey', type: 'Route' },
      { id: 'fussa-sake-journey', type: 'Route' },
      { id: 'hachioji-ginger-journey', type: 'Route' },
      { id: 'okutama-wasabi-journey', type: 'Route' },
      { id: 'okutama-yamame-journey', type: 'Route' },
      { id: 'ome-sawai-sake-journey', type: 'Route' },
    ]);
  });

  it('does not admit dormant Ledger entities outside current presentation journeys', () => {
    const ids = buildCurrentProductFactualInventory().map((entity) => entity.id);

    expect(ids).toContain('sawai-ozawa-shuzo');
    expect(ids).toContain('ome-sawai-sake-journey');
    expect(ids).toContain('sake-ome');
    expect(ids).toContain('hachioji-takiyama-roadside-station');
    expect(ids).toContain('hachioji-ginger-journey');
    expect(ids).toContain('fussa-tamura-shuzo');
    expect(ids).toContain('fussa-sake-journey');
    expect(ids).not.toContain('fussa-water-heritage-course');
    expect(ids).toContain('akiruno-seasonal-produce-journey');
    expect(ids).not.toContain('demo-tokyo-west-akiruno-produce');
  });

  it('is deterministic', () => {
    expect(JSON.stringify(buildCurrentProductFactualInventory()))
      .toBe(JSON.stringify(buildCurrentProductFactualInventory()));
  });
});
