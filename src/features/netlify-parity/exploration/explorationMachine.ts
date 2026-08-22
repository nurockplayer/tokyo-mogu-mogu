import type {
  BaseArea,
  Experience,
  ExplorationAnswers,
  Interest,
  Taste,
  TravelTime,
  TripDuration,
} from '../../../lib/exploration';

export type ExplorationExperience = 'eat' | 'make' | 'buy' | 'meet' | 'visit' | 'learn';
export type ExplorationDeparture =
  | 'tokyo'
  | 'tokyo-station'
  | 'shinjuku'
  | 'shibuya'
  | 'tachikawa'
  | 'ome'
  | 'okutama';
export type ExplorationMovement = 'within-30' | 'within-60' | 'within-90' | 'within-120' | 'any';
export type ExplorationDuration = 'half-day' | 'full-day' | 'undecided';
export type ExplorationTaste =
  | 'rich'
  | 'gentle'
  | 'sweet'
  | 'fragrant'
  | 'spicy'
  | 'fermented'
  | 'refreshing'
  | 'ingredient'
  | 'surprise-me';
export type ExplorationTheme =
  | 'tradition'
  | 'food-history'
  | 'daily-life'
  | 'craft'
  | 'nature'
  | 'seasonal'
  | 'agriculture'
  | 'local-people'
  | 'no-preference';
export type ExplorationStep = 0 | 1 | 2 | 3 | 4;

export interface NetlifyExplorationAnswers {
  experience: ExplorationExperience | null;
  departure: ExplorationDeparture;
  movement: ExplorationMovement | null;
  duration: ExplorationDuration | null;
  tastes: ExplorationTaste[];
  themes: ExplorationTheme[];
}

export interface NetlifyExplorationState {
  step: ExplorationStep;
  answers: NetlifyExplorationAnswers;
  complete: boolean;
}

export type NetlifyExplorationEvent =
  | { type: 'SELECT_EXPERIENCE'; value: ExplorationExperience }
  | { type: 'SELECT_DEPARTURE'; value: ExplorationDeparture }
  | { type: 'SELECT_MOVEMENT'; value: ExplorationMovement }
  | { type: 'SELECT_DURATION'; value: ExplorationDuration }
  | { type: 'TOGGLE_TASTE'; value: ExplorationTaste }
  | { type: 'TOGGLE_THEME'; value: ExplorationTheme }
  | { type: 'OPEN' }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'RESET' };

export function createExplorationState(): NetlifyExplorationState {
  return {
    step: 0,
    answers: {
      experience: null,
      departure: 'tokyo',
      movement: null,
      duration: null,
      tastes: [],
      themes: [],
    },
    complete: false,
  };
}

export function canAdvanceExploration(state: NetlifyExplorationState): boolean {
  const { answers, step } = state;
  return [
    answers.experience !== null,
    answers.departure.length > 0,
    answers.movement !== null,
    answers.duration !== null,
    answers.tastes.length > 0 && answers.themes.length > 0,
  ][step];
}

function toggleCapped<T>(values: readonly T[], value: T): T[] {
  if (values.includes(value)) return values.filter((current) => current !== value);
  return values.length >= 2 ? [...values.slice(1), value] : [...values, value];
}

export function explorationReducer(
  state: NetlifyExplorationState,
  event: NetlifyExplorationEvent,
): NetlifyExplorationState {
  switch (event.type) {
    case 'SELECT_EXPERIENCE':
      return { ...state, answers: { ...state.answers, experience: event.value } };
    case 'SELECT_DEPARTURE':
      return { ...state, answers: { ...state.answers, departure: event.value } };
    case 'SELECT_MOVEMENT':
      return { ...state, answers: { ...state.answers, movement: event.value } };
    case 'SELECT_DURATION':
      return { ...state, answers: { ...state.answers, duration: event.value } };
    case 'TOGGLE_TASTE':
      return {
        ...state,
        answers: {
          ...state.answers,
          tastes: toggleCapped(state.answers.tastes, event.value),
        },
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        answers: {
          ...state.answers,
          themes: toggleCapped(state.answers.themes, event.value),
        },
      };
    case 'OPEN':
      return { ...state, step: 0, complete: false };
    case 'NEXT':
      if (!canAdvanceExploration(state)) return state;
      if (state.step === 4) return { ...state, complete: true };
      return { ...state, step: (state.step + 1) as ExplorationStep };
    case 'BACK':
      if (state.step === 0) return state;
      return { ...state, step: (state.step - 1) as ExplorationStep, complete: false };
    case 'RESET':
      return createExplorationState();
    default:
      return state;
  }
}

const EXPERIENCE_ADAPTER: Record<ExplorationExperience, Experience> = {
  eat: 'eat',
  make: 'make',
  buy: 'buy',
  meet: 'meet',
  visit: 'meet',
  learn: 'meet',
};

const DEPARTURE_ADAPTER: Record<ExplorationDeparture, BaseArea> = {
  tokyo: 'tokyo-west',
  'tokyo-station': 'tokyo-west',
  shinjuku: 'tokyo-west',
  shibuya: 'tokyo-west',
  tachikawa: 'tama-center',
  ome: 'tama-center',
  okutama: 'okutama',
};

const MOVEMENT_ADAPTER: Record<ExplorationMovement, TravelTime> = {
  'within-30': 'within-30',
  'within-60': 'within-60',
  'within-90': 'over-60',
  'within-120': 'over-60',
  any: 'over-60',
};

const TASTE_ADAPTER: Partial<Record<ExplorationTaste, Taste>> = {
  rich: 'rich',
  spicy: 'spicy',
  sweet: 'sweet',
  refreshing: 'refreshing',
};

const THEME_ADAPTER: Partial<Record<ExplorationTheme, Interest>> = {
  tradition: 'tradition',
  nature: 'nature',
  'daily-life': 'daily-life',
  craft: 'craft',
};

const DURATION_ADAPTER: Record<ExplorationDuration, TripDuration | null> = {
  'half-day': 'half-day',
  'full-day': 'full-day',
  undecided: null,
};

export function toExplorationAnswers(answers: NetlifyExplorationAnswers): ExplorationAnswers {
  return {
    tastes: answers.tastes.flatMap((value) => {
      const adapted = TASTE_ADAPTER[value];
      return adapted ? [adapted] : [];
    }),
    experiences: answers.experience ? [EXPERIENCE_ADAPTER[answers.experience]] : [],
    baseArea: DEPARTURE_ADAPTER[answers.departure],
    travelTime: answers.movement ? MOVEMENT_ADAPTER[answers.movement] : null,
    interests: answers.themes.flatMap((value) => {
      const adapted = THEME_ADAPTER[value];
      return adapted ? [adapted] : [];
    }),
    duration: answers.duration ? DURATION_ADAPTER[answers.duration] : null,
  };
}
