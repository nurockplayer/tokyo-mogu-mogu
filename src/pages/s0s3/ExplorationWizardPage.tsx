/**
 * Exploration Conditions conversation (Issue #78 reframe of S2; Issue #217
 * Phase 1 guided prototype).
 *
 * The five per-trip Exploration questions ("今回どう体験したいか") render as a
 * LINE / ChatGPT-style conversation: MOGU greets the user (reusing the
 * session-only nickname when present) and each question appears as an assistant
 * bubble with embedded quick replies; the user's selection appends as a
 * confirmation bubble and stays in the transcript. The whole flow keeps a
 * single `ExplorationAnswers` object in state (seeded from sessionStorage) and
 * writes it back on every change, so Back/Next never lose prior answers and the
 * Result can read the same payload.
 *
 * Phase 1 deliberately offers only the values the fixed Okutama × Tokyo Wasabi
 * demo journey supports (see phase1-exploration.ts), so every allowed path
 * deterministically reaches the wasabi Result with believable match reasons —
 * no selectable option contradicts the final route. Exploration state is
 * current-session / per-trip data — it is NOT the durable Food Profile.
 */
import { useMemo, useState, type ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { Button, Chip, ProgressBar, StepDots } from '../../ui';
import {
  WIZARD_STEP_COUNT,
  createDefaultExplorationAnswers,
  fillTemplate,
  type ExplorationAnswers,
  type Experience,
  type Interest,
  type Taste,
  type TravelTime,
  type TripDuration,
  type BaseArea,
} from '../../lib/exploration';
import { loadExplorationAnswers, saveExplorationAnswers } from './exploration-session';
import { hasFoodProfile } from '../../lib/food-profile-storage';
import { loadNickname } from '../../lib/nickname';
import { PHASE1_EXPERIENCES, PHASE1_INTERESTS, PHASE1_TASTES } from './phase1-exploration';
import { ChatTranscript, AssistantQuestion, type ChatItem } from './conversation';
import './onboarding.css';

/** A chip option rendered for a conversation step. */
interface Choice<V extends string> {
  value: V;
  label: string;
}

/** A large image-forward tile (experience choices, Figma `4:2101` parity). */
interface ExperienceTile<V extends string> {
  value: V;
  label: string;
  sub: string;
  icon: string;
}

function isSelected(values: string[], value: string): boolean {
  return values.includes(value);
}

function toggleValue<V extends string>(values: V[], value: V): V[] {
  return isSelected(values, value)
    ? values.filter((v) => v !== value)
    : [...values, value];
}

function labelFor<V extends string>(choices: Choice<V>[], value: V): string {
  return choices.find((c) => c.value === value)?.label ?? value;
}

/** Compact bubble text for a multi-selection (comma-joined labels). */
function joinedLabels<V extends string>(choices: Choice<V>[], values: readonly V[]): string {
  return values.map((v) => labelFor(choices, v)).join(', ');
}

/** Exploration copy keys for the current step's question title / hint. */
const S2_TITLES = ['exQ1Title', 'exQ2Title', 'exQ3Title', 'exQ4Title', 'exQ5Title'] as const;
const S2_HINTS = ['exQ1Hint', 'exQ2Hint', 'exQ3Hint', 'exQ4Hint', 'exQ5Hint'] as const;

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

  const [answers, setAnswers] = useState<ExplorationAnswers>(() => {
    const saved = loadExplorationAnswers();
    if (!saved) return createDefaultExplorationAnswers();
    // A stale session may carry values the Phase 1 conversation no longer
    // offers (e.g. rich/sweet from a pre-Phase-1 session). Narrow them so the
    // conversation and the Result stay coherent after a reload.
    return {
      ...createDefaultExplorationAnswers(),
      ...saved,
      tastes: saved.tastes.filter((v) => PHASE1_TASTES.includes(v)),
      experiences: saved.experiences.filter((v) => PHASE1_EXPERIENCES.includes(v)),
      interests: saved.interests.filter((v) => PHASE1_INTERESTS.includes(v)),
    };
  });
  const [step, setStep] = useState(0);

  /** Update answers and mirror them to sessionStorage for the Result screen. */
  function persist(next: ExplorationAnswers) {
    setAnswers(next);
    saveExplorationAnswers(next);
  }

  // Phase 1 constrained choice sets (Issue #217): only the values the fixed
  // Okutama × Tokyo Wasabi journey supports, so the Result is deterministic.
  const tasteChoices: Choice<Taste>[] = PHASE1_TASTES.map((value) => ({
    value,
    label: t(value === 'refreshing' ? 'exTasteRefreshing' : 'exTasteSpicy'),
  }));

  // Large image-forward experience tiles (Figma `4:2101`): icon + label +
  // sublabel in a 2-column grid. Values stay canonical; icons are visual
  // guidance, not new answer taxonomy.
  const experienceTiles: ExperienceTile<Experience>[] = PHASE1_EXPERIENCES.map((value) => {
    if (value === 'eat') {
      return { value, label: t('exExpEat'), sub: t('exExpEatSub'), icon: '🍽️' };
    }
    if (value === 'buy') {
      return { value, label: t('exExpBuy'), sub: t('exExpBuySub'), icon: '🛍️' };
    }
    return { value, label: t('exExpMeet'), sub: t('exExpMeetSub'), icon: '🤝' };
  });

  const areaChoices: Choice<BaseArea>[] = [
    { value: 'okutama', label: t('exAreaOkutama') },
    { value: 'tama-center', label: t('exAreaTama') },
    { value: 'tokyo-west', label: t('exAreaTokyoWest') },
  ];

  const travelChoices: Choice<TravelTime>[] = [
    { value: 'within-30', label: t('exTravelWithin30') },
    { value: 'within-60', label: t('exTravelWithin60') },
    { value: 'over-60', label: t('exTravelOver60') },
  ];

  const interestChoices: Choice<Interest>[] = PHASE1_INTERESTS.map((value) => ({
    value,
    label: t(
      value === 'nature'
        ? 'exInterestNature'
        : value === 'tradition'
          ? 'exInterestTradition'
          : 'exInterestCraft',
    ),
  }));

  const durationChoices: Choice<TripDuration>[] = [
    { value: 'half-day', label: t('exDurationHalf') },
    { value: 'full-day', label: t('exDurationFull') },
  ];

  const stepCount = WIZARD_STEP_COUNT;

  /** Whether the current step has enough input to continue. */
  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return answers.tastes.length > 0;
      case 1:
        return true; // multi-select, optional
      case 2:
        return answers.baseArea !== null && answers.travelTime !== null;
      case 3:
        return answers.interests.length > 0;
      case 4:
        return answers.duration !== null;
      default:
        return true;
    }
  }, [step, answers]);

  // --- Field mutations (each persists immediately so Back never loses input) ---

  function toggleTaste(value: Taste) {
    persist({ ...answers, tastes: toggleValue(answers.tastes, value) });
  }

  function toggleExperience(value: Experience) {
    persist({ ...answers, experiences: toggleValue(answers.experiences, value) });
  }

  function setBaseArea(value: BaseArea) {
    persist({ ...answers, baseArea: value });
  }

  function setTravelTime(value: TravelTime) {
    persist({ ...answers, travelTime: value });
  }

  function toggleInterest(value: Interest) {
    persist({ ...answers, interests: toggleValue(answers.interests, value) });
  }

  function setDuration(value: TripDuration) {
    persist({ ...answers, duration: value });
  }

  // --- Navigation ---

  function goBack() {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  }

  function goNext() {
    if (step < stepCount - 1) {
      setStep(step + 1);
    } else {
      navigate('/explore/result');
    }
  }

  // --- Conversation transcript (Issue #217): greeting + every completed turn ---

  const nickname = loadNickname();
  const greeting = nickname
    ? fillTemplate(t('exIntroName'), { name: nickname })
    : t('exIntro');

  const transcript: ChatItem[] = [
    { id: 'intro', role: 'assistant', children: <p className="fp-convo__body">{greeting}</p> },
  ];

  for (let i = 0; i < step && i < stepCount; i += 1) {
    transcript.push({
      id: `q${i}`,
      role: 'assistant',
      children: <AssistantQuestion title={t(S2_TITLES[i] ?? 'exQ1Title')} />,
    });
    if (i === 0) {
      transcript.push({
        id: `a${i}`,
        role: 'user',
        children: joinedLabels(tasteChoices, answers.tastes),
      });
    } else if (i === 1) {
      if (answers.experiences.length > 0) {
        transcript.push({
          id: `a${i}`,
          role: 'user',
          children: joinedLabels(experienceTiles, answers.experiences),
        });
      }
    } else if (i === 2) {
      if (answers.baseArea !== null) {
        transcript.push({
          id: 'a2a',
          role: 'user',
          children: labelFor(areaChoices, answers.baseArea),
        });
      }
      if (answers.travelTime !== null) {
        transcript.push({
          id: 'a2b',
          role: 'user',
          children: labelFor(travelChoices, answers.travelTime),
        });
      }
    } else if (i === 3) {
      transcript.push({
        id: `a${i}`,
        role: 'user',
        children: joinedLabels(interestChoices, answers.interests),
      });
    } else if (i === 4 && answers.duration !== null) {
      transcript.push({
        id: `a${i}`,
        role: 'user',
        children: labelFor(durationChoices, answers.duration),
      });
    }
  }

  // --- Renderers ---

  function renderSingle<V extends string>(
    choices: Choice<V>[],
    value: V | null,
    onChange: (v: V) => void,
  ) {
    return (
      <div className="fp-convo__choices">
        {choices.map((choice) => (
          <Chip
            key={choice.value}
            selected={value === choice.value}
            onClick={() => onChange(choice.value)}
          >
            {choice.label}
          </Chip>
        ))}
      </div>
    );
  }

  function renderMulti<V extends string>(
    choices: Choice<V>[],
    values: V[],
    onToggle: (v: V) => void,
  ) {
    return (
      <div className="fp-convo__choices">
        {choices.map((choice) => (
          <Chip
            key={choice.value}
            selected={isSelected(values, choice.value)}
            onClick={() => onToggle(choice.value)}
          >
            {choice.label}
          </Chip>
        ))}
      </div>
    );
  }

  /** Large 2-column experience tiles (Figma `4:2101` parity). */
  function renderTiles<V extends string>(
    tiles: ExperienceTile<V>[],
    values: V[],
    onToggle: (v: V) => void,
  ) {
    return (
      <div className="tmm-wizard__tiles">
        {tiles.map((tile) => {
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
              <span className="tmm-wizard__tile-label">{tile.label}</span>
              <span className="tmm-wizard__tile-sub">{tile.sub}</span>
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

  /** Current step assistant + replies + hint. */
  function renderStepConversation() {
    switch (step) {
      case 0:
        return (
          <>
            <ChatQuestion title={t(S2_TITLES[0])}>
              {renderMulti(tasteChoices, answers.tastes, toggleTaste)}
            </ChatQuestion>
            {answers.tastes.length > 0 ? (
              <ChatReply>{joinedLabels(tasteChoices, answers.tastes)}</ChatReply>
            ) : null}
            <p className="fp-convo__hint">{t(S2_HINTS[0])}</p>
          </>
        );
      case 1:
        return (
          <>
            <ChatQuestion title={t(S2_TITLES[1])}>
              {renderTiles(experienceTiles, answers.experiences, toggleExperience)}
            </ChatQuestion>
            {answers.experiences.length > 0 ? (
              <ChatReply>{joinedLabels(experienceTiles, answers.experiences)}</ChatReply>
            ) : null}
            <p className="fp-convo__hint">{t(S2_HINTS[1])}</p>
          </>
        );
      case 2:
        return (
          <>
            {answers.baseArea === null ? (
              <ChatQuestion title={t('exQ3AreaLabel')}>
                {renderSingle(areaChoices, answers.baseArea, setBaseArea)}
              </ChatQuestion>
            ) : (
              <>
                <ChatReply>{labelFor(areaChoices, answers.baseArea)}</ChatReply>
                <ChatQuestion title={t('exQ3TravelLabel')}>
                  {renderSingle(travelChoices, answers.travelTime, setTravelTime)}
                </ChatQuestion>
              </>
            )}
            {answers.travelTime !== null ? (
              <ChatReply>{labelFor(travelChoices, answers.travelTime)}</ChatReply>
            ) : null}
            <p className="fp-convo__hint">{t(S2_HINTS[2])}</p>
          </>
        );
      case 3:
        return (
          <>
            <ChatQuestion title={t(S2_TITLES[3])}>
              {renderMulti(interestChoices, answers.interests, toggleInterest)}
            </ChatQuestion>
            {answers.interests.length > 0 ? (
              <ChatReply>{joinedLabels(interestChoices, answers.interests)}</ChatReply>
            ) : null}
            <p className="fp-convo__hint">{t(S2_HINTS[3])}</p>
          </>
        );
      case 4:
        return (
          <>
            <ChatQuestion title={t(S2_TITLES[4])}>
              {renderSingle(durationChoices, answers.duration, setDuration)}
            </ChatQuestion>
            {answers.duration !== null ? (
              <ChatReply>{labelFor(durationChoices, answers.duration)}</ChatReply>
            ) : null}
            <p className="fp-convo__hint">{t(S2_HINTS[4])}</p>
          </>
        );
      default:
        return null;
    }
  }

  const progressLabel = fillTemplate(t('explorationStepOf'), {
    n: String(step + 1),
    total: String(stepCount),
  });

  const ariaProgress = fillTemplate(t('explorationProgressAria'), {
    n: String(step + 1),
    total: String(stepCount),
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
            <ProgressBar value={step + 1} max={stepCount} />
          </div>
        </div>

        <p className="tmm-wizard__step" aria-hidden="true">
          {progressLabel}
        </p>

        <StepDots total={stepCount} current={step} label={ariaProgress} />

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
            {step === stepCount - 1 ? t('exDone') : t('exNext')}
          </Button>
        </div>
      </div>
    </div>
  );
}
