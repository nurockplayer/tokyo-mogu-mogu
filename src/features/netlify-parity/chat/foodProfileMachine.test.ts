import { describe, expect, it } from 'vitest';
import {
  CHAT_DELAYS,
  FOOD_PROFILE_QUESTIONS,
  createFoodProfileState,
  foodProfileReducer,
  foodProfileToDurableProfile,
} from './foodProfileMachine';

function dispatchPending(state: ReturnType<typeof createFoodProfileState>) {
  if (!state.pending) throw new Error('Expected a pending conversation event');
  return foodProfileReducer(state, state.pending.event);
}

describe('Netlify Food Profile conversation choreography', () => {
  it('keeps the welcome in history and schedules the name prompt for exactly 450ms', () => {
    const started = foodProfileReducer(createFoodProfileState(), { type: 'BEGIN' });

    expect(started.entries.map((entry) => entry.kind)).toEqual(['welcome', 'user']);
    expect(started.phase).toBe('waiting-name-prompt');
    expect(started.pending).toEqual({
      event: { type: 'SHOW_NAME_PROMPT' },
      delayMs: 450,
    });

    const prompted = dispatchPending(started);
    expect(prompted.entries.map((entry) => entry.kind)).toEqual([
      'welcome',
      'user',
      'name-prompt',
    ]);
    expect(prompted.phase).toBe('name');
  });

  it('uses the exact 450ms greeting then 400ms first-question sequence', () => {
    const prompted = dispatchPending(
      foodProfileReducer(createFoodProfileState(), { type: 'BEGIN' }),
    );
    const named = foodProfileReducer(prompted, { type: 'SUBMIT_NAME', name: ' ナナ ' });

    expect(named.name).toBe('ナナ');
    expect(named.pending).toEqual({
      event: { type: 'SHOW_GREETING' },
      delayMs: CHAT_DELAYS.greeting,
    });

    const greeted = dispatchPending(named);
    expect(greeted.entries.map((entry) => entry.kind)).toEqual([
      'welcome',
      'user',
      'name-prompt',
      'user',
      'greeting',
    ]);
    expect(greeted.pending).toEqual({
      event: { type: 'SHOW_QUESTION', questionIndex: 0 },
      delayMs: CHAT_DELAYS.firstQuestion,
    });

    const firstQuestion = dispatchPending(greeted);
    expect(firstQuestion.phase).toBe('question');
    expect(firstQuestion.questionIndex).toBe(0);
    expect(firstQuestion.entries.at(-1)).toMatchObject({ kind: 'question', questionIndex: 0 });
  });

  it('matches the authoritative allergy → diet → religion → dislike order', () => {
    expect(FOOD_PROFILE_QUESTIONS.map((question) => question.key)).toEqual([
      'allergy',
      'diet',
      'religion',
      'dislike',
    ]);
    expect(FOOD_PROFILE_QUESTIONS.map((question) => question.noneValue)).toEqual([
      'none-allergy',
      'none',
      'none',
      'none',
    ]);
  });

  it('preserves Netlify multi-select semantics, including none plus another choice', () => {
    let state = dispatchPending(
      dispatchPending(
        foodProfileReducer(
          dispatchPending(foodProfileReducer(createFoodProfileState(), { type: 'BEGIN' })),
          { type: 'SUBMIT_NAME', name: 'ナナ' },
        ),
      ),
    );

    state = foodProfileReducer(state, { type: 'TOGGLE_OPTION', value: 'none-allergy' });
    state = foodProfileReducer(state, { type: 'TOGGLE_OPTION', value: 'egg' });

    expect(state.answers.allergy).toEqual(['none-allergy', 'egg']);
  });

  it('toggles Other, sanitizes angle brackets, and inserts a selected custom answer', () => {
    let state = dispatchPending(
      dispatchPending(
        foodProfileReducer(
          dispatchPending(foodProfileReducer(createFoodProfileState(), { type: 'BEGIN' })),
          { type: 'SUBMIT_NAME', name: 'ナナ' },
        ),
      ),
    );

    state = foodProfileReducer(state, { type: 'TOGGLE_OTHER' });
    expect(state.otherInputOpen).toBe(true);
    state = foodProfileReducer(state, { type: 'ADD_OTHER', value: '  <そば>  ' });

    expect(state.otherInputOpen).toBe(false);
    expect(state.customAnswers.allergy).toEqual(['そば']);
    expect(state.answers.allergy).toEqual(['custom:そば']);

    state = foodProfileReducer(state, { type: 'TOGGLE_OPTION', value: 'custom:そば' });
    expect(state.answers.allergy).toEqual([]);

    state = foodProfileReducer(state, { type: 'TOGGLE_OPTION', value: 'custom:そば' });
    expect(state.answers.allergy).toEqual(['custom:そば']);
  });

  it('uses the explicit none answer when Send is pressed empty and waits 500ms', () => {
    let state = dispatchPending(
      dispatchPending(
        foodProfileReducer(
          dispatchPending(foodProfileReducer(createFoodProfileState(), { type: 'BEGIN' })),
          { type: 'SUBMIT_NAME', name: 'ナナ' },
        ),
      ),
    );

    state = foodProfileReducer(state, { type: 'SUBMIT_QUESTION' });

    expect(state.answers.allergy).toEqual(['none-allergy']);
    expect(state.entries.at(-2)).toMatchObject({
      kind: 'question',
      questionIndex: 0,
      frozen: true,
    });
    expect(state.entries.at(-1)).toMatchObject({ kind: 'user', questionIndex: 0 });
    expect(state.pending).toEqual({
      event: { type: 'SHOW_QUESTION', questionIndex: 1 },
      delayMs: CHAT_DELAYS.nextQuestion,
    });
  });

  it('reveals the summary 500ms after Q4 and the recommendation choice 700ms later', () => {
    let state = createFoodProfileState();
    state = foodProfileReducer(state, { type: 'BEGIN' });
    state = dispatchPending(state);
    state = foodProfileReducer(state, { type: 'SUBMIT_NAME', name: 'ナナ' });
    state = dispatchPending(state);
    state = dispatchPending(state);

    for (let questionIndex = 0; questionIndex < FOOD_PROFILE_QUESTIONS.length; questionIndex += 1) {
      state = foodProfileReducer(state, { type: 'SUBMIT_QUESTION' });
      expect(state.pending?.delayMs).toBe(CHAT_DELAYS.nextQuestion);
      state = dispatchPending(state);
    }

    expect(state.phase).toBe('summary');
    expect(state.entries.at(-1)?.kind).toBe('summary');
    expect(state.pending).toEqual({
      event: { type: 'SHOW_FINAL_CHOICE' },
      delayMs: CHAT_DELAYS.finalChoice,
    });

    state = dispatchPending(state);
    expect(state.phase).toBe('complete');
    expect(state.entries.at(-1)?.kind).toBe('final-choice');
  });

  it('normalizes semantic answers into the existing durable Food Profile contract', () => {
    let state = createFoodProfileState();
    state = {
      ...state,
      answers: {
        allergy: ['egg'],
        diet: ['none'],
        religion: ['halal'],
        dislike: ['custom:八角'],
      },
      customAnswers: {
        allergy: [],
        diet: [],
        religion: [],
        dislike: ['八角'],
      },
    };

    expect(foodProfileToDurableProfile(state, '2026-08-23T00:00:00.000Z')).toEqual({
      dietary: ['allergy', 'religious', 'dislike'],
      dietaryOther: '八角',
      hasNoRestrictions: false,
      savedAt: '2026-08-23T00:00:00.000Z',
      version: 1,
    });
  });
});
