import { describe, expect, it } from 'vitest';
import {
  applySingleSelection,
  departurePresentationState,
  type VisualAnswers,
} from './exploration-navigation';

const emptyVisual: VisualAnswers = {
  tastes: [],
  experiences: [],
  departure: null,
  travel: null,
  themes: [],
  duration: null,
};

describe('Exploration finder interaction mode (P1-01)', () => {
  it('keeps a repeat-mode selection on the current step', () => {
    expect(
      applySingleSelection(
        { step: 0, visual: emptyVisual },
        { key: 'experiences', id: 'eat' },
        false,
      ),
    ).toEqual({
      step: 0,
      visual: { ...emptyVisual, experiences: ['eat'] },
    });
  });

  it('preserves guided tap-to-advance for the same selection', () => {
    expect(
      applySingleSelection(
        { step: 1, visual: emptyVisual },
        { key: 'departure', id: 'tokyo' },
        true,
      ),
    ).toEqual({
      step: 2,
      visual: { ...emptyVisual, departure: 'tokyo' },
    });
  });
});

describe('Departure overlay presentation state (P1-02)', () => {
  it('distinguishes empty and populated input without resolving a place', () => {
    expect(departurePresentationState('   ')).toBe('empty');
    expect(departurePresentationState('東京駅')).toBe('populated');
  });
});
