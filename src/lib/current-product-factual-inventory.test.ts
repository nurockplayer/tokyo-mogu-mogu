import { describe, expect, it } from 'vitest';
import { buildCurrentProductFactualInventory } from './current-product-factual-inventory';

describe('current Product factual inventory (#343)', () => {
  it('derives the current journeys, their Stories, Routes, and reachable Spots', () => {
    expect(buildCurrentProductFactualInventory()).toEqual([
      { id: 'akabeko', type: 'Spot' },
      { id: 'baba-oshijutaku', type: 'Spot' },
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
      { id: 'sake-ome', type: 'Story' },
      { id: 'wasabi-okutama', type: 'Story' },
      { id: 'yamame-okutama', type: 'Story' },
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
    expect(ids).not.toContain('hachioji-takiyama-roadside-station');
    expect(ids).not.toContain('hachioji-ginger-journey');
  });

  it('is deterministic', () => {
    expect(JSON.stringify(buildCurrentProductFactualInventory()))
      .toBe(JSON.stringify(buildCurrentProductFactualInventory()));
  });
});
