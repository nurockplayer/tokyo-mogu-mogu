import type { DietaryRestriction, FoodProfile } from '../../../lib/food-profile';

export const CHAT_DELAYS = {
  namePrompt: 450,
  greeting: 450,
  firstQuestion: 400,
  nextQuestion: 500,
  finalChoice: 700,
} as const;

export type FoodProfileQuestionKey = 'allergy' | 'diet' | 'religion' | 'dislike';

export interface FoodProfileQuestion {
  key: FoodProfileQuestionKey;
  optionValues: readonly string[];
  noneValue: string;
  allowOther: boolean;
  recommendedValues: readonly string[];
}

export const FOOD_PROFILE_QUESTIONS: readonly FoodProfileQuestion[] = [
  {
    key: 'allergy',
    optionValues: ['egg', 'dairy', 'wheat', 'crustacean', 'nuts', 'fish', 'none-allergy'],
    noneValue: 'none-allergy',
    allowOther: true,
    recommendedValues: ['egg', 'nuts'],
  },
  {
    key: 'diet',
    optionValues: ['vegetarian', 'vegan', 'pescatarian', 'none'],
    noneValue: 'none',
    allowOther: false,
    recommendedValues: ['none'],
  },
  {
    key: 'religion',
    optionValues: ['pork', 'beef', 'halal', 'alcohol', 'none'],
    noneValue: 'none',
    allowOther: true,
    recommendedValues: ['pork', 'halal'],
  },
  {
    key: 'dislike',
    optionValues: ['raw', 'spicy', 'fermented', 'bitter', 'shellfish', 'none'],
    noneValue: 'none',
    allowOther: true,
    recommendedValues: ['raw'],
  },
];

export type FoodProfilePhase =
  | 'start'
  | 'waiting-name-prompt'
  | 'name'
  | 'waiting-greeting'
  | 'waiting-question'
  | 'question'
  | 'waiting-summary'
  | 'summary'
  | 'complete';

export type ConversationEntryKind =
  | 'welcome'
  | 'user'
  | 'name-prompt'
  | 'greeting'
  | 'question'
  | 'summary'
  | 'final-choice';

export interface ConversationEntry {
  id: number;
  kind: ConversationEntryKind;
  questionIndex?: number;
  values?: readonly string[];
  frozen?: boolean;
}

export type FoodProfileConversationEvent =
  | { type: 'BEGIN' }
  | { type: 'SHOW_NAME_PROMPT' }
  | { type: 'SUBMIT_NAME'; name: string }
  | { type: 'SHOW_GREETING' }
  | { type: 'SHOW_QUESTION'; questionIndex: number }
  | { type: 'TOGGLE_OPTION'; value: string }
  | { type: 'TOGGLE_OTHER' }
  | { type: 'ADD_OTHER'; value: string }
  | { type: 'SUBMIT_QUESTION' }
  | { type: 'SHOW_SUMMARY' }
  | { type: 'SHOW_FINAL_CHOICE' };

export interface PendingConversationEvent {
  event: FoodProfileConversationEvent;
  delayMs: number;
}

export type ProfileAnswerMap = Record<FoodProfileQuestionKey, string[]>;

export interface FoodProfileConversationState {
  phase: FoodProfilePhase;
  name: string;
  questionIndex: number | null;
  entries: ConversationEntry[];
  answers: ProfileAnswerMap;
  customAnswers: ProfileAnswerMap;
  otherInputOpen: boolean;
  pending: PendingConversationEvent | null;
  nextEntryId: number;
}

function emptyAnswerMap(): ProfileAnswerMap {
  return { allergy: [], diet: [], religion: [], dislike: [] };
}

export function createFoodProfileState(): FoodProfileConversationState {
  return {
    phase: 'start',
    name: '',
    questionIndex: null,
    entries: [{ id: 0, kind: 'welcome' }],
    answers: emptyAnswerMap(),
    customAnswers: emptyAnswerMap(),
    otherInputOpen: false,
    pending: null,
    nextEntryId: 1,
  };
}

function appendEntry(
  state: FoodProfileConversationState,
  entry: Omit<ConversationEntry, 'id'>,
): FoodProfileConversationState {
  return {
    ...state,
    entries: [...state.entries, { ...entry, id: state.nextEntryId }],
    nextEntryId: state.nextEntryId + 1,
  };
}

function withPending(
  state: FoodProfileConversationState,
  phase: FoodProfilePhase,
  event: FoodProfileConversationEvent,
  delayMs: number,
): FoodProfileConversationState {
  return { ...state, phase, pending: { event, delayMs } };
}

function currentQuestion(state: FoodProfileConversationState): FoodProfileQuestion | undefined {
  if (state.questionIndex === null) return undefined;
  return FOOD_PROFILE_QUESTIONS[state.questionIndex];
}

function sanitizeOtherAnswer(value: string): string {
  return value.trim().replace(/[<>]/g, '');
}

export function foodProfileReducer(
  state: FoodProfileConversationState,
  event: FoodProfileConversationEvent,
): FoodProfileConversationState {
  switch (event.type) {
    case 'BEGIN': {
      if (state.phase !== 'start') return state;
      const next = appendEntry(state, { kind: 'user' });
      return withPending(next, 'waiting-name-prompt', { type: 'SHOW_NAME_PROMPT' }, CHAT_DELAYS.namePrompt);
    }
    case 'SHOW_NAME_PROMPT': {
      if (state.phase !== 'waiting-name-prompt') return state;
      return appendEntry({ ...state, phase: 'name', pending: null }, { kind: 'name-prompt' });
    }
    case 'SUBMIT_NAME': {
      if (state.phase !== 'name') return state;
      const name = event.name.trim();
      if (!name) return state;
      const next = appendEntry({ ...state, name, pending: null }, { kind: 'user' });
      return withPending(next, 'waiting-greeting', { type: 'SHOW_GREETING' }, CHAT_DELAYS.greeting);
    }
    case 'SHOW_GREETING': {
      if (state.phase !== 'waiting-greeting') return state;
      const next = appendEntry({ ...state, pending: null }, { kind: 'greeting' });
      return withPending(
        next,
        'waiting-question',
        { type: 'SHOW_QUESTION', questionIndex: 0 },
        CHAT_DELAYS.firstQuestion,
      );
    }
    case 'SHOW_QUESTION': {
      if (
        state.phase !== 'waiting-question' ||
        event.questionIndex < 0 ||
        event.questionIndex >= FOOD_PROFILE_QUESTIONS.length
      ) {
        return state;
      }
      return appendEntry(
        {
          ...state,
          phase: 'question',
          questionIndex: event.questionIndex,
          pending: null,
          otherInputOpen: false,
        },
        { kind: 'question', questionIndex: event.questionIndex, frozen: false },
      );
    }
    case 'TOGGLE_OPTION': {
      const question = currentQuestion(state);
      const isCustomValue = event.value.startsWith('custom:');
      if (
        state.phase !== 'question' ||
        !question ||
        (!question.optionValues.includes(event.value) && !isCustomValue)
      ) {
        return state;
      }
      const current = state.answers[question.key];
      const answers = current.includes(event.value)
        ? current.filter((value) => value !== event.value)
        : [...current, event.value];
      return { ...state, answers: { ...state.answers, [question.key]: answers } };
    }
    case 'TOGGLE_OTHER': {
      const question = currentQuestion(state);
      if (state.phase !== 'question' || !question?.allowOther) return state;
      return { ...state, otherInputOpen: !state.otherInputOpen };
    }
    case 'ADD_OTHER': {
      const question = currentQuestion(state);
      if (state.phase !== 'question' || !question?.allowOther || !state.otherInputOpen) return state;
      const custom = sanitizeOtherAnswer(event.value);
      if (!custom) return state;
      const value = `custom:${custom}`;
      const selected = state.answers[question.key];
      const customValues = state.customAnswers[question.key];
      return {
        ...state,
        answers: {
          ...state.answers,
          [question.key]: selected.includes(value) ? selected : [...selected, value],
        },
        customAnswers: {
          ...state.customAnswers,
          [question.key]: customValues.includes(custom) ? customValues : [...customValues, custom],
        },
        otherInputOpen: false,
      };
    }
    case 'SUBMIT_QUESTION': {
      const question = currentQuestion(state);
      if (state.phase !== 'question' || !question || state.questionIndex === null) return state;
      const selected = state.answers[question.key];
      const values = selected.length > 0 ? selected : [question.noneValue];
      const entries = state.entries.map((entry) =>
        entry.kind === 'question' && entry.questionIndex === state.questionIndex
          ? { ...entry, values, frozen: true }
          : entry,
      );
      const answered = appendEntry(
        {
          ...state,
          entries,
          answers: { ...state.answers, [question.key]: [...values] },
          otherInputOpen: false,
          pending: null,
        },
        { kind: 'user', questionIndex: state.questionIndex, values },
      );
      const nextIndex = state.questionIndex + 1;
      const nextEvent: FoodProfileConversationEvent =
        nextIndex < FOOD_PROFILE_QUESTIONS.length
          ? { type: 'SHOW_QUESTION', questionIndex: nextIndex }
          : { type: 'SHOW_SUMMARY' };
      return withPending(
        answered,
        nextIndex < FOOD_PROFILE_QUESTIONS.length ? 'waiting-question' : 'waiting-summary',
        nextEvent,
        CHAT_DELAYS.nextQuestion,
      );
    }
    case 'SHOW_SUMMARY': {
      if (state.phase !== 'waiting-summary') return state;
      const next = appendEntry(
        { ...state, phase: 'summary', questionIndex: null, pending: null },
        { kind: 'summary' },
      );
      return withPending(
        next,
        'summary',
        { type: 'SHOW_FINAL_CHOICE' },
        CHAT_DELAYS.finalChoice,
      );
    }
    case 'SHOW_FINAL_CHOICE': {
      if (state.phase !== 'summary') return state;
      return appendEntry(
        { ...state, phase: 'complete', pending: null },
        { kind: 'final-choice' },
      );
    }
    default:
      return state;
  }
}

const CATEGORY_BY_QUESTION: Record<FoodProfileQuestionKey, DietaryRestriction> = {
  allergy: 'allergy',
  diet: 'vegetarian-vegan',
  religion: 'religious',
  dislike: 'dislike',
};

export function foodProfileToDurableProfile(
  state: Pick<FoodProfileConversationState, 'answers' | 'customAnswers'>,
  savedAt = new Date().toISOString(),
): FoodProfile {
  const dietary = FOOD_PROFILE_QUESTIONS.filter((question) =>
    state.answers[question.key].some((value) => value !== question.noneValue),
  ).map((question) => CATEGORY_BY_QUESTION[question.key]);
  const dietaryOther = FOOD_PROFILE_QUESTIONS.flatMap(
    (question) => state.customAnswers[question.key],
  ).join(' / ');
  const hasNoRestrictions = FOOD_PROFILE_QUESTIONS.every(
    (question) =>
      state.answers[question.key].length === 1 &&
      state.answers[question.key][0] === question.noneValue &&
      state.customAnswers[question.key].length === 0,
  );

  return {
    dietary,
    dietaryOther,
    hasNoRestrictions,
    savedAt,
    version: 1,
  };
}
