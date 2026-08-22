import { describe, expect, it } from 'vitest';
import {
  canAdvanceExploration,
  createExplorationState,
  explorationReducer,
  type NetlifyExplorationAnswers,
  type NetlifyExplorationState,
  toExplorationAnswers,
} from './explorationMachine';

describe('Netlify five-step exploration state', () => {
  it('starts at experience with the authoritative default departure only', () => {
    const state = createExplorationState();

    expect(state.step).toBe(0);
    expect(state.answers).toEqual({
      experience: null,
      departure: 'tokyo',
      movement: null,
      duration: null,
      tastes: [],
      themes: [],
    });
    expect(canAdvanceExploration(state)).toBe(false);
  });

  it('replaces each single-select answer and preserves it across Back/Next', () => {
    let state = createExplorationState();
    state = explorationReducer(state, { type: 'SELECT_EXPERIENCE', value: 'eat' });
    state = explorationReducer(state, { type: 'SELECT_EXPERIENCE', value: 'learn' });
    expect(state.answers.experience).toBe('learn');
    expect(canAdvanceExploration(state)).toBe(true);

    state = explorationReducer(state, { type: 'NEXT' });
    expect(state.step).toBe(1);
    expect(canAdvanceExploration(state)).toBe(true);
    state = explorationReducer(state, { type: 'SELECT_DEPARTURE', value: 'shinjuku' });
    state = explorationReducer(state, { type: 'BACK' });

    expect(state.step).toBe(0);
    expect(state.answers.departure).toBe('shinjuku');
    expect(state.answers.experience).toBe('learn');
  });

  it('reopens at step one without erasing prior Netlify wizard answers', () => {
    let state = createExplorationState();
    state = explorationReducer(state, { type: 'SELECT_EXPERIENCE', value: 'eat' });
    state = explorationReducer(state, { type: 'NEXT' });
    state = explorationReducer(state, { type: 'SELECT_DEPARTURE', value: 'okutama' });
    state = explorationReducer(state, { type: 'OPEN' });

    expect(state.step).toBe(0);
    expect(state.answers.experience).toBe('eat');
    expect(state.answers.departure).toBe('okutama');
  });

  it('does not advance a step until its required answer exists', () => {
    let state = createExplorationState();
    expect(explorationReducer(state, { type: 'NEXT' }).step).toBe(0);

    state = explorationReducer(state, { type: 'SELECT_EXPERIENCE', value: 'eat' });
    state = explorationReducer(state, { type: 'NEXT' });
    state = explorationReducer(state, { type: 'NEXT' });
    expect(state.step).toBe(2);
    expect(explorationReducer(state, { type: 'NEXT' }).step).toBe(2);
  });

  it('caps taste and theme selections at two by dropping the oldest item', () => {
    let state = createExplorationState();
    state = explorationReducer(state, { type: 'TOGGLE_TASTE', value: 'spicy' });
    state = explorationReducer(state, { type: 'TOGGLE_TASTE', value: 'rich' });
    state = explorationReducer(state, { type: 'TOGGLE_TASTE', value: 'gentle' });
    state = explorationReducer(state, { type: 'TOGGLE_THEME', value: 'tradition' });
    state = explorationReducer(state, { type: 'TOGGLE_THEME', value: 'nature' });
    state = explorationReducer(state, { type: 'TOGGLE_THEME', value: 'craft' });

    expect(state.answers.tastes).toEqual(['rich', 'gentle']);
    expect(state.answers.themes).toEqual(['nature', 'craft']);
  });

  it('requires one taste and one theme on step five', () => {
    let state: NetlifyExplorationState = {
      ...createExplorationState(),
      step: 4,
    };
    state = explorationReducer(state, { type: 'TOGGLE_TASTE', value: 'spicy' });
    expect(canAdvanceExploration(state)).toBe(false);
    state = explorationReducer(state, { type: 'TOGGLE_THEME', value: 'tradition' });
    expect(canAdvanceExploration(state)).toBe(true);
  });

  it('adapts the expanded Netlify choices to the established shared session contract', () => {
    const answers: NetlifyExplorationAnswers = {
      experience: 'visit',
      departure: 'shinjuku',
      movement: 'any',
      duration: 'undecided',
      tastes: ['spicy', 'rich'],
      themes: ['tradition', 'nature'],
    };

    expect(toExplorationAnswers(answers)).toEqual({
      tastes: ['spicy', 'rich'],
      experiences: ['meet'],
      baseArea: 'tokyo-west',
      travelTime: 'over-60',
      interests: ['tradition', 'nature'],
      duration: null,
    });
  });
});
