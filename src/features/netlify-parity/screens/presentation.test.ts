import { describe, expect, it } from 'vitest';
import { demoJourneys } from '../content';
import { createDefaultExplorationAnswers } from '../../../lib/exploration';
import {
  bottomNavigationPaths,
  journeyStoryPath,
  journeyToMoguRecent,
  routeSpotPath,
} from './presentation';

describe('Issue #276 presentation adapters', () => {
  it('keeps the authoritative primary result on the wasabi Story path', () => {
    const primary = demoJourneys[0];
    expect(primary.id).toBe('demo-okutama-wasabi');
    expect(journeyStoryPath(primary)).toBe('/story/wasabi-okutama');
  });

  it('maps a route stop to its stable Spot URL', () => {
    expect(routeSpotPath('okutama-tourism-office')).toBe('/spot/okutama-tourism-office');
  });

  it('maps the Netlify tab labels to stable product URLs', () => {
    expect(bottomNavigationPaths).toEqual({
      home: '/home',
      mogu: '/mogu',
      favorites: '/my-route',
      my: '/my',
    });
  });

  it('builds the established MOGU Recent boundary from presentation data', () => {
    const journey = demoJourneys[0];
    expect(
      journeyToMoguRecent(journey, createDefaultExplorationAnswers(), true),
    ).toEqual({
      candidateId: 'demo-okutama-wasabi',
      resultId: 'wasabi-okutama',
      titleKey: 'reference.demo-okutama-wasabi.title',
      summary: ['自然', '伝統', '半日巡り'],
      exploration: createDefaultExplorationAnswers(),
      hasDietaryConsiderations: true,
    });
  });
});
