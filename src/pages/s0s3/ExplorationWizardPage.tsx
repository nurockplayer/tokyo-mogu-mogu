/**
 * Exploration Conditions conversation (Issue #78 reframe of S2; Issue #217
 * Phase 1 guided prototype; Issue #226 Figma fixture options).
 *
 * The five per-trip Exploration questions render as a LINE / ChatGPT-style
 * conversation: MOGU greets the user (reusing the local nickname when present)
 * and each question appears as an assistant bubble with embedded quick replies;
 * the user's selection appends as a confirmation bubble and stays in the
 * transcript.
 *
 * Phase 1 shows the **full option set from the latest KiKi Figma** (taste
 * chips, experience tiles, departure + travel-time, theme chips, duration) as
 * prototype-only fixture presentation. Visual selection is local state; the
 * internal `ExplorationAnswers` is derived by mapping each Figma option onto an
 * existing canonical value — no canonical taxonomy is expanded. The default
 * refreshing / nature path remains the deterministic Okutama × Tokyo Wasabi
 * golden path, while the reusable Result can route distinct preference sets to
 * other enabled source-backed journeys. Departure and travel remain
 * presentation-only inputs until source-backed matrices exist.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useI18n, type LocaleKey } from '../../i18n';
import { Button, Chip, StepDots } from '../../ui';
import { fillTemplate } from '../../lib/exploration';
import {
  WIZARD_STEP_COUNT,
  type BaseArea,
  type ExplorationAnswers,
  type Experience,
  type Interest,
  type Taste,
  type TravelTime,
  type TripDuration,
} from '../../lib/exploration';
import { loadExplorationAnswers, saveExplorationAnswers } from './exploration-session';
import { hasFoodProfile } from '../../lib/food-profile-storage';
import { loadNickname } from '../../lib/nickname';
import { ChatTranscript, AssistantQuestion, scrollTurnIntoView, type ChatItem } from './conversation';
import { isGuidedTutorialActive } from './tutorial-session';
import { tutorialControlProps } from './tutorial-controls';
import { TutorialGuide } from './tutorial-ui';
import expEat from '../../assets/figma/exp-eat.png';
import expMake from '../../assets/figma/exp-make.png';
import expBuy from '../../assets/figma/exp-buy.png';
import expMeet from '../../assets/figma/exp-meet.png';
import expVisit from '../../assets/figma/exp-visit.png';
import expLearn from '../../assets/figma/exp-learn.png';
import './onboarding.css';

/** Figma experience-tile imagery (`4:2101`), keyed by the FpOption id. */
const EXP_IMAGES: Record<string, string> = {
  eat: expEat,
  make: expMake,
  buy: expBuy,
  meet: expMeet,
  'visit-origin': expVisit,
  learn: expLearn,
};

/** One selectable option: a Figma fixture identity + a canonical internal value. */
interface FpOption<V extends string> {
  id: string;
  labelKey: LocaleKey;
  subKey?: LocaleKey;
  icon?: string;
  internal: V;
}

/** A selectable option that only needs a visible label (fixture presentation). */
interface LabelOption {
  id: string;
  labelKey: LocaleKey;
}

/** Visual selection state — Figma option ids, kept separate from canonical answers. */
interface VisualAnswers {
  tastes: string[];
  experiences: string[];
  departure: string | null;
  travel: string | null;
  themes: string[];
  duration: string | null;
}

/** The full option set shown in the current KiKi Figma (fixture presentation). */
const TASTE_OPTIONS: readonly FpOption<Taste>[] = [
  { id: 'rich', labelKey: 'exFpTasteRich', internal: 'rich' },
  { id: 'gentle', labelKey: 'exFpTasteGentle', internal: 'refreshing' },
  { id: 'sweet', labelKey: 'exFpTasteSweet', internal: 'sweet' },
  { id: 'savory', labelKey: 'exFpTasteSavory', internal: 'spicy' },
  { id: 'spicy', labelKey: 'exFpTasteSpicy', internal: 'spicy' },
  { id: 'fermented', labelKey: 'exFpTasteFermented', internal: 'refreshing' },
  { id: 'refreshing', labelKey: 'exFpTasteRefreshing', internal: 'refreshing' },
  { id: 'material', labelKey: 'exFpTasteMaterial', internal: 'refreshing' },
  { id: 'omakase', labelKey: 'exFpTasteOmakase', internal: 'refreshing' },
];

const EXP_OPTIONS: readonly FpOption<Experience>[] = [
  { id: 'eat', labelKey: 'exFpExpEat', subKey: 'exFpExpEatSub', icon: '🍽️', internal: 'eat' },
  { id: 'make', labelKey: 'exFpExpMake', subKey: 'exFpExpMakeSub', icon: '🛠️', internal: 'make' },
  { id: 'buy', labelKey: 'exFpExpBuy', subKey: 'exFpExpBuySub', icon: '🛍️', internal: 'buy' },
  { id: 'meet', labelKey: 'exFpExpMeet', subKey: 'exFpExpMeetSub', icon: '🤝', internal: 'meet' },
  { id: 'visit-origin', labelKey: 'exFpExpVisitOrigin', subKey: 'exFpExpVisitOriginSub', icon: '🏞️', internal: 'eat' },
  { id: 'learn', labelKey: 'exFpExpLearn', subKey: 'exFpExpLearnSub', icon: '📖', internal: 'eat' },
];

/** Departure is a fixture control; the demo route starts from Okutama. */
const DEPARTURE_OPTIONS: readonly { id: string; labelKey: LocaleKey }[] = [
  { id: 'tokyo', labelKey: 'exFpDepartureTokyo' },
  { id: 'nearby', labelKey: 'exFpDepartureNearby' },
];

/** Travel time clamps to the Okutama-compatible values the demo supports. */
const TRAVEL_OPTIONS: readonly FpOption<TravelTime>[] = [
  { id: 'within30', labelKey: 'exFpTravelWithin30', internal: 'within-30' },
  { id: 'within60', labelKey: 'exFpTravelWithin60', internal: 'within-60' },
  { id: 'within90', labelKey: 'exFpTravelWithin90', internal: 'within-60' },
  { id: 'within120', labelKey: 'exFpTravelWithin120', internal: 'within-60' },
  { id: 'nolimit', labelKey: 'exFpTravelNoLimit', internal: 'within-60' },
];

const THEME_OPTIONS: readonly FpOption<Interest>[] = [
  { id: 'tradition', labelKey: 'exFpThemeTradition', internal: 'tradition' },
  { id: 'food-history', labelKey: 'exFpThemeFoodHistory', internal: 'nature' },
  { id: 'daily', labelKey: 'exFpThemeDaily', internal: 'daily-life' },
  { id: 'craft', labelKey: 'exFpThemeCraft', internal: 'craft' },
  { id: 'nature', labelKey: 'exFpThemeNature', internal: 'nature' },
  { id: 'season', labelKey: 'exFpThemeSeason', internal: 'nature' },
  { id: 'agriculture', labelKey: 'exFpThemeAgriculture', internal: 'nature' },
  { id: 'local-people', labelKey: 'exFpThemeLocalPeople', internal: 'nature' },
  { id: 'any', labelKey: 'exFpThemeAny', internal: 'nature' },
];

const DURATION_OPTIONS: readonly FpOption<TripDuration>[] = [
  { id: 'half', labelKey: 'exFpDurationHalf', internal: 'half-day' },
  { id: 'full', labelKey: 'exFpDurationFull', internal: 'full-day' },
  { id: 'undecided', labelKey: 'exFpDurationUndecided', internal: 'half-day' },
];

/** Legitimate golden-path inputs highlighted by the first-run tutorial. */
const TUTORIAL_TARGETS = {
  experience: 'eat',
  departure: 'tokyo',
  travel: 'within60',
  duration: 'half',
  taste: 'refreshing',
  theme: 'nature',
} as const;

function optionBy<V extends string>(options: readonly FpOption<V>[], id: string): FpOption<V> | undefined {
  return options.find((o) => o.id === id);
}

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function emptyVisual(): VisualAnswers {
  return { tastes: [], experiences: [], departure: null, travel: null, themes: [], duration: null };
}

function isSelected(values: string[], value: string): boolean {
  return values.includes(value);
}

function toggleValue(values: string[], value: string): string[] {
  return isSelected(values, value) ? values.filter((v) => v !== value) : [...values, value];
}

/** Reverse-map a canonical answer value onto a visible Figma option id. */
function optionIdFor<V extends string>(options: readonly FpOption<V>[], value: V): string | null {
  return options.find((o) => o.internal === value)?.id ?? null;
}

function travelIdFor(time: TravelTime): string | null {
  if (time === 'within-30') return 'within30';
  if (time === 'within-60') return 'within60';
  return 'within120';
}

function durationIdFor(duration: TripDuration): string | null {
  return duration === 'full-day' ? 'full' : 'half';
}

/** Rebuild the visual selection from any persisted canonical answers. */
function initialVisual(): VisualAnswers {
  const saved = loadExplorationAnswers();
  if (!saved) return emptyVisual();
  return {
    tastes: saved.tastes.map((v) => optionIdFor(TASTE_OPTIONS, v)).filter((x): x is string => x !== null),
    experiences: saved.experiences
      .map((v) => optionIdFor(EXP_OPTIONS, v))
      .filter((x): x is string => x !== null),
    departure: saved.baseArea !== null ? 'tokyo' : null,
    travel: saved.travelTime !== null ? travelIdFor(saved.travelTime) : null,
    themes: saved.interests
      .map((v) => optionIdFor(THEME_OPTIONS, v))
      .filter((x): x is string => x !== null),
    duration: saved.duration !== null ? durationIdFor(saved.duration) : null,
  };
}

/**
 * Derive the canonical internal answers from the visual selection. Every option
 * maps onto an existing canonical value; the current departure control remains
 * the conservative Okutama presentation value and travel choices remain
 * within the existing canonical buckets.
 */
function deriveAnswers(visual: VisualAnswers): ExplorationAnswers {
  return {
    tastes: unique(
      visual.tastes
        .map((id) => optionBy(TASTE_OPTIONS, id)?.internal)
        .filter((x): x is Taste => x !== undefined),
    ),
    experiences: unique(
      visual.experiences
        .map((id) => optionBy(EXP_OPTIONS, id)?.internal)
        .filter((x): x is Experience => x !== undefined),
    ),
    baseArea: visual.departure !== null ? ('okutama' as BaseArea) : null,
    travelTime: visual.travel !== null ? (optionBy(TRAVEL_OPTIONS, visual.travel)?.internal ?? null) : null,
    interests: unique(
      visual.themes
        .map((id) => optionBy(THEME_OPTIONS, id)?.internal)
        .filter((x): x is Interest => x !== undefined),
    ),
    duration: visual.duration !== null ? (optionBy(DURATION_OPTIONS, visual.duration)?.internal ?? null) : null,
  };
}

export function ExplorationWizardPage() {
  if (!hasFoodProfile()) {
    return <Navigate to="/food-profile" replace />;
  }
  return <ExplorationWizardInner />;
}

function ExplorationWizardInner() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [visual, setVisual] = useState<VisualAnswers>(initialVisual);
  const [step, setStep] = useState(0);
  const [tutorialActive] = useState(isGuidedTutorialActive);
  // Presentation-only departure search text (Figma 8:2608); never a geocoder /
  // station API and never persisted as canonical data.
  const [departureSearch, setDepartureSearch] = useState('');

  // Latest committed step, used to reject stale activations (rapid/double tap)
  // so one reply can never commit twice or skip a turn.
  const stepRef = useRef(step);
  stepRef.current = step;

  // Auto-scroll target for the newly revealed turn (Issue #230). The first
  // render is skipped so the initial question does not scroll past the greeting.
  const activeTurnRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  // Route transitions preserve the Food Profile transcript's scroll position.
  // Start Exploration at its own top so the fixed 44px demo reset cannot cover
  // the first actionable turn.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const node = activeTurnRef.current;
    if (!node) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scrollTurnIntoView(node, reduce ? 'auto' : 'smooth');
  }, [step]);

  // Persist the derived canonical answers whenever the visual selection changes.
  useEffect(() => {
    saveExplorationAnswers(deriveAnswers(visual));
  }, [visual]);

  /** Commit an answer and reveal exactly the next turn (stale taps are ignored). */
  function advance(toStep: number, next: VisualAnswers) {
    if (toStep !== stepRef.current + 1) return;
    setVisual(next);
    setStep(toStep);
  }

  /** Single-choice quick reply: selecting it is the answer and advances. */
  function chooseSingle(key: 'departure' | 'travel' | 'duration', id: string) {
    advance(step + 1, { ...visual, [key]: id });
  }

  /** Experience tile: the tapped tile is the answer and advances. */
  function chooseExperience(id: string) {
    advance(1, { ...visual, experiences: [id] });
  }

  /**
   * Taste / theme remain multi-select; toggles use the functional update so a
   * rapid sequence of activations can never drop an earlier selection.
   */
  function toggleMulti(key: 'tastes' | 'themes', id: string) {
    setVisual((prev) => ({ ...prev, [key]: toggleValue(prev[key], id) }));
  }

  const tutorialTasteSelected = visual.tastes.includes(TUTORIAL_TARGETS.taste);
  const tutorialThemeSelected = visual.themes.includes(TUTORIAL_TARGETS.theme);
  const canConfirmTasteTheme = tutorialActive
    ? tutorialTasteSelected && tutorialThemeSelected
    : visual.tastes.length > 0 || visual.themes.length > 0;

  function confirmTasteTheme() {
    if (!canConfirmTasteTheme) return;
    navigate('/explore/result');
  }

  function goBack() {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  }

  // --- Conversation transcript (greeting + every completed turn) ---

  const nickname = loadNickname();
  const greeting = nickname
    ? t('exIntroName').replace('{name}', nickname)
    : t('exIntro');

  const labelFor = (id: string, options: readonly LabelOption[]): string =>
    t(options.find((o) => o.id === id)?.labelKey ?? ('exIntro' as LocaleKey));

  const labelsFor = (ids: string[], options: readonly LabelOption[]): string =>
    ids.map((id) => labelFor(id, options)).join(', ');

  const transcript: ChatItem[] = [
    { id: 'intro', role: 'assistant', children: <p className="fp-convo__body">{greeting}</p> },
  ];

  for (let i = 0; i < step && i < WIZARD_STEP_COUNT; i += 1) {
    transcript.push({
      id: `q${i}`,
      role: 'assistant',
      children: <AssistantQuestion title={t(S2_TITLES[i] ?? 'exQ1Title')} />,
    });
    if (i === 0) {
      // Experience tiles.
      if (visual.experiences.length > 0) {
        transcript.push({ id: `a${i}`, role: 'user', children: labelsFor(visual.experiences, EXP_OPTIONS) });
      }
    } else if (i === 1) {
      // Departure.
      if (visual.departure !== null) {
        transcript.push({ id: `a${i}`, role: 'user', children: labelFor(visual.departure, DEPARTURE_OPTIONS) });
      }
    } else if (i === 2) {
      // Travel time.
      if (visual.travel !== null) {
        transcript.push({ id: `a${i}`, role: 'user', children: labelFor(visual.travel, TRAVEL_OPTIONS) });
      }
    } else if (i === 3) {
      // Duration.
      if (visual.duration !== null) {
        transcript.push({ id: `a${i}`, role: 'user', children: labelFor(visual.duration, DURATION_OPTIONS) });
      }
    } else if (i === 4) {
      // Taste + theme (combined step).
      const picks = [
        ...visual.tastes.map((id) => labelFor(id, TASTE_OPTIONS)),
        ...visual.themes.map((id) => labelFor(id, THEME_OPTIONS)),
      ];
      if (picks.length > 0) {
        transcript.push({ id: `a${i}`, role: 'user', children: picks.join('、') });
      }
    }
  }

  // --- Renderers ---

  function renderSingle(
    options: readonly { id: string; labelKey: LocaleKey }[],
    selected: string | null,
    onSelect: (id: string) => void,
    tutorialTargetId: string,
  ) {
    return (
      <div className="fp-convo__choices">
        {options.map((option) => (
          <Chip
            {...tutorialControlProps(tutorialActive, option.id === tutorialTargetId)}
            key={option.id}
            selected={selected === option.id}
            onClick={() => onSelect(option.id)}
          >
            {t(option.labelKey)}
          </Chip>
        ))}
      </div>
    );
  }

  function renderMulti(
    options: readonly FpOption<string>[],
    selected: string[],
    onToggle: (id: string) => void,
    tutorialTargetId: string,
    tutorialBeatActive: boolean,
  ) {
    return (
      <div className="fp-convo__choices">
        {options.map((option) => (
          <Chip
            {...tutorialControlProps(
              tutorialActive,
              tutorialBeatActive && option.id === tutorialTargetId,
            )}
            key={option.id}
            selected={isSelected(selected, option.id)}
            onClick={() => onToggle(option.id)}
          >
            {t(option.labelKey)}
          </Chip>
        ))}
      </div>
    );
  }

  /** Large 2-column image-forward experience tiles (Figma `4:2101`); tapping
   *  one is the answer. The Figma tile media renders the exported imagery with
   *  the localized label below. */
  function renderTiles(
    options: readonly FpOption<string>[],
    selected: string[],
    onSelect: (id: string) => void,
    tutorialTargetId: string,
  ) {
    return (
      <div className="tmm-wizard__tiles">
        {options.map((option) => {
          const isSel = isSelected(selected, option.id);
          const tutorialProps = tutorialControlProps(
            tutorialActive,
            option.id === tutorialTargetId,
          );
          return (
            <button
              {...tutorialProps}
              key={option.id}
              type="button"
              aria-pressed={isSel}
              className={`tmm-wizard__tile ${isSel ? 'tmm-wizard__tile--selected' : ''} ${tutorialProps.className ?? ''}`.trim()}
              onClick={() => onSelect(option.id)}
            >
              <img src={EXP_IMAGES[option.id]} alt="" className="tmm-wizard__tile-img" />
              <span className="tmm-wizard__tile-caption">
                <span className="tmm-wizard__tile-label">{t(option.labelKey)}</span>
                {option.subKey ? <span className="tmm-wizard__tile-sub">{t(option.subKey)}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  function ChatQuestion({ title, children }: { title: string; children?: ReactNode }) {
    return (
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__q">{title}</p>
          {children}
        </div>
      </div>
    );
  }

  function renderStepConversation() {
    switch (step) {
      case 0:
        // Experience tiles (Figma 4:2101): tapping one commits it and advances.
        return (
          <>
            <ChatQuestion title={t(S2_TITLES[0])}>
              {renderTiles(
                EXP_OPTIONS,
                visual.experiences,
                chooseExperience,
                TUTORIAL_TARGETS.experience,
              )}
            </ChatQuestion>
            <p className="fp-convo__hint">{t(S2_HINTS[0])}</p>
          </>
        );
      case 1:
        // Departure (Figma 8:2436 / 8:2608) — search input is presentation-only.
        return (
          <>
            <ChatQuestion title={t(S2_TITLES[1])}>
              {renderSingle(
                DEPARTURE_OPTIONS,
                visual.departure,
                (id) => chooseSingle('departure', id),
                TUTORIAL_TARGETS.departure,
              )}
              <label htmlFor="fp-departure-search" className="fp-convo__label">
                {t('exAreaSearchLabel')}
              </label>
              <input
                id="fp-departure-search"
                className="tmm-wizard__text"
                type="text"
                value={departureSearch}
                onChange={(e) => setDepartureSearch(e.target.value)}
                placeholder={t('exAreaSearchPlaceholder')}
                disabled={tutorialActive}
              />
            </ChatQuestion>
            <p className="fp-convo__hint">{t(S2_HINTS[1])}</p>
          </>
        );
      case 2:
        // Travel time (Figma 23:3131).
        return (
          <>
            <ChatQuestion title={t(S2_TITLES[2])}>
              {renderSingle(
                TRAVEL_OPTIONS,
                visual.travel,
                (id) => chooseSingle('travel', id),
                TUTORIAL_TARGETS.travel,
              )}
            </ChatQuestion>
            <p className="fp-convo__hint">{t(S2_HINTS[2])}</p>
          </>
        );
      case 3:
        // Duration (Figma 23:3207).
        return (
          <>
            <ChatQuestion title={t(S2_TITLES[3])}>
              {renderSingle(
                DURATION_OPTIONS,
                visual.duration,
                (id) => chooseSingle('duration', id),
                TUTORIAL_TARGETS.duration,
              )}
            </ChatQuestion>
            <p className="fp-convo__hint">{t(S2_HINTS[3])}</p>
          </>
        );
      case 4:
        // Taste + theme (Figma 23:3262): the turn opens with the main question,
        // then the 2/2 multi-select sub-steps, then a local confirm that commits
        // the turn and moves to the Result (not a persistent page-level CTA).
        return (
          <>
            <ChatQuestion title={t(S2_TITLES[4])} />
            <ChatQuestion title={`${t('exQ5TasteLabel')} ${fillTemplate(t('exSubStep'), { n: '1', total: '2' })}`}>
              {renderMulti(
                TASTE_OPTIONS,
                visual.tastes,
                (id) => toggleMulti('tastes', id),
                TUTORIAL_TARGETS.taste,
                !tutorialTasteSelected,
              )}
            </ChatQuestion>
            <ChatQuestion title={`${t('exQ5ThemeLabel')} ${fillTemplate(t('exSubStep'), { n: '2', total: '2' })}`}>
              {renderMulti(
                THEME_OPTIONS,
                visual.themes,
                (id) => toggleMulti('themes', id),
                TUTORIAL_TARGETS.theme,
                tutorialTasteSelected && !tutorialThemeSelected,
              )}
            </ChatQuestion>
            <div className="fp-convo__confirm">
              {(() => {
                const confirmProps = tutorialControlProps(
                  tutorialActive,
                  tutorialTasteSelected && tutorialThemeSelected,
                );
                return (
                  <Button
                    {...confirmProps}
                    variant="primary"
                    className={confirmProps.className}
                    onClick={confirmTasteTheme}
                    disabled={!canConfirmTasteTheme || Boolean(confirmProps.disabled)}
                  >
                    {t('exDone')}
                  </Button>
                );
              })()}
            </div>
            <p className="fp-convo__hint">{t(S2_HINTS[4])}</p>
          </>
        );
      default:
        return null;
    }
  }

  const progressLabel = t('explorationStepOf').replace('{n}', String(step + 1)).replace('{total}', String(WIZARD_STEP_COUNT));
  const ariaProgress = t('explorationProgressAria').replace('{n}', String(step + 1)).replace('{total}', String(WIZARD_STEP_COUNT));

  return (
    <div className="tmm-page">
      <div className="tmm-wizard">
        <div className="tmm-wizard__header">
          <button
            type="button"
            className="tmm-wizard__back"
            onClick={goBack}
            aria-label={t('back')}
            disabled={tutorialActive}
          >
            ‹
          </button>
          <h2 className="tmm-wizard__title">{t('protoNavDiscover')}</h2>
          <span className="tmm-wizard__header-spacer" aria-hidden="true" />
        </div>

        {tutorialActive ? <TutorialGuide /> : null}

        <p className="tmm-wizard__step" aria-hidden="true">
          {progressLabel}
        </p>

        <StepDots total={WIZARD_STEP_COUNT} current={step} label={ariaProgress} />

        <div className="fp-convo">
          <ChatTranscript items={transcript} />
          <div ref={activeTurnRef} className="fp-convo__active">
            {renderStepConversation()}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Exploration copy keys for the current step's question title / hint. */
const S2_TITLES = ['exQ1Title', 'exQ2Title', 'exQ3Title', 'exQ4Title', 'exQ5Title'] as const;
const S2_HINTS = ['exQ1Hint', 'exQ2Hint', 'exQ3Hint', 'exQ4Hint', 'exQ5Hint'] as const;
