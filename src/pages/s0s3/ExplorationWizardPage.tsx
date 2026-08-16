/**
 * Exploration Conditions conversation (Issue #78 reframe of S2; Issue #217 Phase
 * 1 guided prototype; Issue #224 latest-Figma parity).
 *
 * The five per-trip Exploration questions render as a LINE / ChatGPT-style
 * conversation in the latest KiKi Figma order (Figma `4:2101`, `8:2436`,
 * `23:3131`, `23:3207`, `23:3262`, `8:2608`):
 *
 *   1. どんな食体験をしてみたいですか？ (experience tiles)
 *   2. どこから出発しますか？ (departure + presentation-only area search)
 *   3. 片道どのくらいまでなら移動できそうですか？ (travel time)
 *   4. どのくらいの時間で楽しみたいですか？ (trip duration)
 *   5. どんな味とモチーフを楽しみたいですか？ (taste + theme)
 *
 * The visible selections are **presentation-only fixture state**
 * (`phase1-figma-session.ts`): they drive the transcript but never the
 * recommendation result. On completion the wizard writes the fixed canonical
 * `PHASE1_DEMO_ANSWERS`, so the Okutama × Tokyo Wasabi outcome stays
 * deterministic with no real scoring, geocoder, station autocomplete, realtime
 * travel-time engine, or multi-candidate ranking (#201 / #220 / #206 deferred).
 */
import { useMemo, useState, type ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { Button, Chip, ProgressBar, StepDots } from '../../ui';
import { type LocaleKey } from '../../i18n/resources';
import { fillTemplate } from '../../lib/exploration';
import { hasFoodProfile } from '../../lib/food-profile-storage';
import { loadNickname } from '../../lib/nickname';
import { saveExplorationAnswers } from './exploration-session';import { PHASE1_DEMO_ANSWERS } from './phase1-exploration';
import {
  createEmptyFigmaExplorationAnswers,
  loadFigmaExplorationAnswers,
  saveFigmaExplorationAnswers,
  type FigmaExplorationAnswers,
} from './phase1-figma-session';
import { ChatTranscript, AssistantQuestion, type ChatItem } from './conversation';
import './onboarding.css';

/** A presentation-only option: value + label key + optional emoji icon. */
interface Option {
  value: string;
  labelKey: LocaleKey;
  icon?: string;
}

/** A large image-forward experience tile (Figma `4:2101` parity). */
interface ExperienceTile {
  value: string;
  labelKey: LocaleKey;
  subKey: LocaleKey;
  icon: string;
}

const EXPERIENCE_TILES: readonly ExperienceTile[] = [
  { value: 'eat', labelKey: 'exExpEat', subKey: 'exExpEatSub', icon: '🍽️' },
  { value: 'make', labelKey: 'exExpMake', subKey: 'exExpMakeSub', icon: '👨‍🍳' },
  { value: 'buy', labelKey: 'exExpBuy', subKey: 'exExpBuySub', icon: '🛍️' },
  { value: 'meet', labelKey: 'exExpMeet', subKey: 'exExpMeetSub', icon: '🤝' },
  { value: 'visit', labelKey: 'exExpVisit', subKey: 'exExpVisitSub', icon: '🌾' },
  { value: 'learn', labelKey: 'exExpLearn', subKey: 'exExpLearnSub', icon: '📖' },
];

const DEPARTURE_OPTIONS: readonly Option[] = [
  { value: 'tokyo', labelKey: 'exAreaTokyo' },
  { value: 'periphery', labelKey: 'exAreaPeriphery' },
];

const TRAVEL_OPTIONS: readonly Option[] = [
  { value: 'within-30', labelKey: 'exTravelWithin30' },
  { value: 'within-60', labelKey: 'exTravelWithin60' },
  { value: 'within-90', labelKey: 'exTravel90' },
  { value: 'within-2h', labelKey: 'exTravel2h' },
  { value: 'any', labelKey: 'exTravelAny' },
];

const DURATION_OPTIONS: readonly Option[] = [
  { value: 'half-day', labelKey: 'exDurationHalf' },
  { value: 'full-day', labelKey: 'exDurationFull' },
  { value: 'undecided', labelKey: 'exDurationUndecided' },
];

const TASTE_OPTIONS: readonly Option[] = [
  { value: 'rich', labelKey: 'exTasteRich' },
  { value: 'mild', labelKey: 'exTasteMild' },
  { value: 'sweet', labelKey: 'exTasteSweet' },
  { value: 'savory', labelKey: 'exTasteSavory' },
  { value: 'spicy', labelKey: 'exTasteSpicy' },
  { value: 'fermented', labelKey: 'exTasteFermented' },
  { value: 'refreshing', labelKey: 'exTasteRefreshing' },
  { value: 'natural', labelKey: 'exTasteNatural' },
  { value: 'any', labelKey: 'exTasteAny' },
];

const THEME_OPTIONS: readonly Option[] = [
  { value: 'tradition', labelKey: 'exThemeTradition' },
  { value: 'food-history', labelKey: 'exThemeFoodHistory' },
  { value: 'daily', labelKey: 'exThemeDaily' },
  { value: 'craft', labelKey: 'exThemeCraft' },
  { value: 'nature', labelKey: 'exThemeNature' },
  { value: 'season', labelKey: 'exThemeSeason' },
  { value: 'farm', labelKey: 'exThemeFarm' },
  { value: 'people', labelKey: 'exThemePeople' },
  { value: 'any', labelKey: 'exThemeAny' },
];

const WIZARD_STEP_COUNT = 5;

function isSelected(values: string[], value: string): boolean {
  return values.includes(value);
}

function toggleValue(values: string[], value: string): string[] {
  return isSelected(values, value) ? values.filter((v) => v !== value) : [...values, value];
}

function labelFor(options: readonly Option[], value: string | null, t: (key: LocaleKey) => string): string {
  if (value === null) return '';
  return options.find((o) => o.value === value)?.labelKey
    ? t(options.find((o) => o.value === value)!.labelKey)
    : value;
}

function joinedLabels(options: readonly Option[], values: readonly string[], t: (key: LocaleKey) => string): string {
  return values.map((v) => labelFor(options, v, t)).join('、');
}

export function ExplorationWizardPage() {
  // First-time flow asks for the Food Profile before Exploration. Any entry
  // point is routed to profile setup when no durable profile exists; returning
  // users skip it entirely.
  if (!hasFoodProfile()) {
    return <Navigate to="/food-profile" replace />;
  }
  return <ExplorationWizardInner />;
}

function ExplorationWizardInner() {
  const { t } = useI18n();
  const navigate = useNavigate();

  // Presentation-only Figma selections (fixture state; see phase1-figma-session).
  const [answers, setAnswers] = useState<FigmaExplorationAnswers>(() => {
    const saved = loadFigmaExplorationAnswers();
    return saved ?? createEmptyFigmaExplorationAnswers();
  });
  const [step, setStep] = useState(0);

  function persist(next: FigmaExplorationAnswers) {
    setAnswers(next);
    saveFigmaExplorationAnswers(next);
  }

  // --- Field mutations (each persists immediately so Back never loses input) ---

  function toggleExperience(value: string) {
    persist({ ...answers, experiences: toggleValue(answers.experiences, value) });
  }

  function setDeparture(value: string) {
    persist({ ...answers, departure: value });
  }

  function setDepartureSearch(value: string) {
    persist({ ...answers, departureSearch: value });
  }

  function setTravelTime(value: string) {
    persist({ ...answers, travelTime: value });
  }

  function setDuration(value: string) {
    persist({ ...answers, duration: value });
  }

  function toggleTaste(value: string) {
    persist({ ...answers, tastes: toggleValue(answers.tastes, value) });
  }

  function toggleTheme(value: string) {
    persist({ ...answers, themes: toggleValue(answers.themes, value) });
  }

  // --- Navigation ---

  function goBack() {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  }

  /** Completion: write the fixed deterministic canonical answers, then Result. */
  function complete() {
    saveExplorationAnswers(PHASE1_DEMO_ANSWERS);
    navigate('/explore/result');
  }

  function goNext() {
    if (step < WIZARD_STEP_COUNT - 1) {
      setStep(step + 1);
    } else {
      complete();
    }
  }

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return answers.experiences.length > 0;
      case 1:
        return answers.departure !== null;
      case 2:
        return answers.travelTime !== null;
      case 3:
        return answers.duration !== null;
      case 4:
        return answers.tastes.length > 0 || answers.themes.length > 0;
      default:
        return true;
    }
  }, [step, answers]);

  // --- Conversation transcript (Issue #217): greeting + every completed turn ---

  const nickname = loadNickname();
  const greeting = nickname
    ? fillTemplate(t('exIntroName'), { name: nickname })
    : t('exIntro');

  const transcript: ChatItem[] = [
    { id: 'intro', role: 'assistant', children: <p className="fp-convo__body">{greeting}</p> },
  ];

  for (let i = 0; i < step && i < WIZARD_STEP_COUNT; i += 1) {
    if (i === 0) {
      transcript.push({
        id: 'q0',
        role: 'assistant',
        children: <AssistantQuestion title={t('exQ1Title')} />,
      });
      if (answers.experiences.length > 0) {
        transcript.push({
          id: 'a0',
          role: 'user',
          children: joinedLabels(EXPERIENCE_TILES, answers.experiences, t),
        });
      }
    } else if (i === 1) {
      transcript.push({
        id: 'q1',
        role: 'assistant',
        children: <AssistantQuestion title={t('exQ2Title')} />,
      });
      if (answers.departure !== null) {
        transcript.push({
          id: 'a1',
          role: 'user',
          children: labelFor(DEPARTURE_OPTIONS, answers.departure, t),
        });
      }
    } else if (i === 2) {
      transcript.push({
        id: 'q2',
        role: 'assistant',
        children: <AssistantQuestion title={t('exQ3Title')} />,
      });
      if (answers.travelTime !== null) {
        transcript.push({
          id: 'a2',
          role: 'user',
          children: labelFor(TRAVEL_OPTIONS, answers.travelTime, t),
        });
      }
    } else if (i === 3) {
      transcript.push({
        id: 'q3',
        role: 'assistant',
        children: <AssistantQuestion title={t('exQ4Title')} />,
      });
      if (answers.duration !== null) {
        transcript.push({
          id: 'a3',
          role: 'user',
          children: labelFor(DURATION_OPTIONS, answers.duration, t),
        });
      }
    } else if (i === 4) {
      transcript.push({
        id: 'q4',
        role: 'assistant',
        children: <AssistantQuestion title={t('exQ5Title')} />,
      });
      const picks = [
        ...answers.tastes.map((v) => labelFor(TASTE_OPTIONS, v, t)),
        ...answers.themes.map((v) => labelFor(THEME_OPTIONS, v, t)),
      ];
      if (picks.length > 0) {
        transcript.push({ id: 'a4', role: 'user', children: picks.join('、') });
      }
    }
  }

  // --- Renderers ---

  function renderMulti(options: readonly Option[], values: string[], onToggle: (v: string) => void) {
    return (
      <div className="fp-convo__choices">
        {options.map((option) => (
          <Chip
            key={option.value}
            selected={isSelected(values, option.value)}
            onClick={() => onToggle(option.value)}
          >
            {option.icon ? `${option.icon} ` : ''}
            {t(option.labelKey)}
          </Chip>
        ))}
      </div>
    );
  }

  function renderSingle(options: readonly Option[], value: string | null, onChange: (v: string) => void) {
    return (
      <div className="fp-convo__choices">
        {options.map((option) => (
          <Chip
            key={option.value}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.icon ? `${option.icon} ` : ''}
            {t(option.labelKey)}
          </Chip>
        ))}
      </div>
    );
  }

  /** Large 2-column experience tiles (Figma `4:2101` parity). */
  function renderTiles(values: string[], onToggle: (v: string) => void) {
    return (
      <div className="tmm-wizard__tiles">
        {EXPERIENCE_TILES.map((tile) => {
          const selected = isSelected(values, tile.value);
          return (
            <button
              key={tile.value}
              type="button"
              aria-pressed={selected}
              className={`tmm-wizard__tile ${selected ? 'tmm-wizard__tile--selected' : ''}`.trim()}
              onClick={() => onToggle(tile.value)}
            >
              <span className="tmm-wizard__tile-icon" aria-hidden="true">
                {tile.icon}
              </span>
              <span className="tmm-wizard__tile-label">{t(tile.labelKey)}</span>
              <span className="tmm-wizard__tile-sub">{t(tile.subKey)}</span>
            </button>
          );
        })}
      </div>
    );
  }

  /** One assistant question bubble with embedded quick replies. */
  function ChatQuestion({ title, children }: { title: string; children: ReactNode }) {
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

  /** User confirmation bubble for the current step's selection. */
  function ChatReply({ children }: { children: ReactNode }) {
    return (
      <div className="fp-convo__msg fp-convo__msg--user" aria-hidden="true">
        <div className="fp-convo__bubble">{children}</div>
      </div>
    );
  }

  function renderStepConversation() {
    switch (step) {
      case 0:
        return (
          <>
            <ChatQuestion title={t('exQ1Title')}>
              {renderTiles(answers.experiences, toggleExperience)}
            </ChatQuestion>
            {answers.experiences.length > 0 ? (
              <ChatReply>{joinedLabels(EXPERIENCE_TILES, answers.experiences, t)}</ChatReply>
            ) : null}
            <p className="fp-convo__hint">{t('exQ1Hint')}</p>
          </>
        );
      case 1:
        return (
          <>
            <ChatQuestion title={t('exQ2Title')}>
              {renderSingle(DEPARTURE_OPTIONS, answers.departure, setDeparture)}
              <label htmlFor="fp-departure-search" className="fp-convo__label">
                {t('exAreaSearchLabel')}
              </label>
              <input
                id="fp-departure-search"
                className="tmm-wizard__text"
                type="text"
                value={answers.departureSearch}
                onChange={(e) => setDepartureSearch(e.target.value)}
                placeholder={t('exAreaSearchPlaceholder')}
              />
            </ChatQuestion>
            {answers.departure !== null ? (
              <ChatReply>{labelFor(DEPARTURE_OPTIONS, answers.departure, t)}</ChatReply>
            ) : null}
            <p className="fp-convo__hint">{t('exQ2Hint')}</p>
          </>
        );
      case 2:
        return (
          <>
            <ChatQuestion title={t('exQ3Title')}>
              {renderSingle(TRAVEL_OPTIONS, answers.travelTime, setTravelTime)}
            </ChatQuestion>
            {answers.travelTime !== null ? (
              <ChatReply>{labelFor(TRAVEL_OPTIONS, answers.travelTime, t)}</ChatReply>
            ) : null}
            <p className="fp-convo__hint">{t('exQ3Hint')}</p>
          </>
        );
      case 3:
        return (
          <>
            <ChatQuestion title={t('exQ4Title')}>
              {renderSingle(DURATION_OPTIONS, answers.duration, setDuration)}
            </ChatQuestion>
            {answers.duration !== null ? (
              <ChatReply>{labelFor(DURATION_OPTIONS, answers.duration, t)}</ChatReply>
            ) : null}
            <p className="fp-convo__hint">{t('exQ4Hint')}</p>
          </>
        );
      case 4:
        return (
          <>
            <ChatQuestion title={`${t('exQ5TasteLabel')} ${fillTemplate(t('exSubStep'), { n: '1', total: '2' })}`}>
              {renderMulti(TASTE_OPTIONS, answers.tastes, toggleTaste)}
            </ChatQuestion>
            <ChatQuestion title={`${t('exQ5ThemeLabel')} ${fillTemplate(t('exSubStep'), { n: '2', total: '2' })}`}>
              {renderMulti(THEME_OPTIONS, answers.themes, toggleTheme)}
            </ChatQuestion>
            {answers.tastes.length > 0 || answers.themes.length > 0 ? (
              <ChatReply>
                {[...answers.tastes.map((v) => labelFor(TASTE_OPTIONS, v, t)), ...answers.themes.map((v) => labelFor(THEME_OPTIONS, v, t))].join('、')}
              </ChatReply>
            ) : null}
            <p className="fp-convo__hint">{t('exQ5Hint')}</p>
          </>
        );
      default:
        return null;
    }
  }

  const progressLabel = fillTemplate(t('explorationStepOf'), {
    n: String(step + 1),
    total: String(WIZARD_STEP_COUNT),
  });

  const ariaProgress = fillTemplate(t('explorationProgressAria'), {
    n: String(step + 1),
    total: String(WIZARD_STEP_COUNT),
  });

  return (
    <div className="tmm-page">
      <div className="tmm-wizard">
        <div className="tmm-wizard__header">
          <button
            type="button"
            className="tmm-wizard__back"
            onClick={goBack}
            aria-label={t('back')}
          >
            ‹
          </button>
          <div className="tmm-wizard__progress">
            <ProgressBar value={step + 1} max={WIZARD_STEP_COUNT} />
          </div>
        </div>

        <p className="tmm-wizard__step" aria-hidden="true">
          {progressLabel}
        </p>

        <StepDots total={WIZARD_STEP_COUNT} current={step} label={ariaProgress} />

        <div className="fp-convo">
          <ChatTranscript items={transcript} />
          {renderStepConversation()}
        </div>

        <div className="tmm-wizard__actions fp-convo-actions">
          <Button
            variant="primary"
            className="tmm-btn--block"
            onClick={goNext}
            disabled={!canProceed}
          >
            {step === WIZARD_STEP_COUNT - 1 ? t('exDone') : t('exNext')}
          </Button>
        </div>
      </div>
    </div>
  );
}
