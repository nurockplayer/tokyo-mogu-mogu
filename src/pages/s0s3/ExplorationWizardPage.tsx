/**
 * Exploration Conditions wizard (Issue #78 reframe of S2).
 *
 * Five questions about how the user wants to experience this trip
 * (「今回どう体験したいか」), one screen / one question. The whole flow keeps a
 * single `ExplorationAnswers` object in state (seeded from sessionStorage) and
 * writes it back on every change, so Back/Next never lose prior answers and the
 * Result can read the same payload. The final step navigates to the Result.
 *
 * Exploration state is current-session / per-trip data — it is NOT the durable
 * Food Profile (which holds the stable dietary data separately and is asked
 * only on first use). Visual choice-card treatment from the approved UI remains
 * applicable via the shared `tmm-chip` foundation.
 */
import { useMemo, useState } from 'react';
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
import './onboarding.css';

/** A chip option rendered for a wizard step. */
interface Choice<V extends string> {
  value: V;
  label: string;
}

function isSelected(values: string[], value: string): boolean {
  return values.includes(value);
}

function toggleValue<V extends string>(values: V[], value: V): V[] {
  return isSelected(values, value)
    ? values.filter((v) => v !== value)
    : [...values, value];
}

/** Exploration copy keys for the current step's question title / hint. */
const S2_TITLES = ['exQ1Title', 'exQ2Title', 'exQ3Title', 'exQ4Title', 'exQ5Title'] as const;
const S2_HINTS = ['exQ1Hint', 'exQ2Hint', 'exQ3Hint', 'exQ4Hint', 'exQ5Hint'] as const;

export function ExplorationWizardPage() {
  // First-time flow asks for the Food Profile before Exploration. Any entry
  // point (Landing, Home, bottom-nav Explore) is routed to profile setup when
  // no durable profile exists; returning users skip it entirely.
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
    return saved
      ? { ...createDefaultExplorationAnswers(), ...saved }
      : createDefaultExplorationAnswers();
  });
  const [step, setStep] = useState(0);

  /** Update answers and mirror them to sessionStorage for the Result screen. */
  function persist(next: ExplorationAnswers) {
    setAnswers(next);
    saveExplorationAnswers(next);
  }

  const tasteChoices: Choice<Taste>[] = [
    { value: 'refreshing', label: t('exTasteRefreshing') },
    { value: 'rich', label: t('exTasteRich') },
    { value: 'spicy', label: t('exTasteSpicy') },
    { value: 'sweet', label: t('exTasteSweet') },
  ];

  const experienceChoices: Choice<Experience>[] = [
    { value: 'eat', label: t('exExpEat') },
    { value: 'make', label: t('exExpMake') },
    { value: 'buy', label: t('exExpBuy') },
    { value: 'meet', label: t('exExpMeet') },
  ];

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

  const interestChoices: Choice<Interest>[] = [
    { value: 'nature', label: t('exInterestNature') },
    { value: 'tradition', label: t('exInterestTradition') },
    { value: 'craft', label: t('exInterestCraft') },
    { value: 'daily-life', label: t('exInterestDaily') },
  ];

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

  // --- Renderers ---

  function renderSingle<V extends string>(
    choices: Choice<V>[],
    value: V | null,
    onChange: (v: V) => void,
  ) {
    return (
      <div className="tmm-wizard__options tmm-wizard__options--stack" role="radiogroup">
        {choices.map((choice) => (
          <Chip
            key={choice.value}
            selected={value === choice.value}
            role="radio"
            aria-checked={value === choice.value}
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
      <div className="tmm-wizard__options">
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

  function renderStepBody() {
    switch (step) {
      case 0:
        return renderMulti(tasteChoices, answers.tastes, toggleTaste);
      case 1:
        return renderMulti(experienceChoices, answers.experiences, toggleExperience);
      case 2:
        return (
          <>
            <p className="tmm-wizard__field-label">{t('exQ3AreaLabel')}</p>
            {renderSingle(areaChoices, answers.baseArea, setBaseArea)}
            <p className="tmm-wizard__field-label">{t('exQ3TravelLabel')}</p>
            {renderSingle(travelChoices, answers.travelTime, setTravelTime)}
          </>
        );
      case 3:
        return renderMulti(interestChoices, answers.interests, toggleInterest);
      case 4:
        return renderSingle(durationChoices, answers.duration, setDuration);
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

        <h1 className="tmm-wizard__question">{t(S2_TITLES[step] ?? 'exQ1Title')}</h1>
        <p className="tmm-wizard__hint">{t(S2_HINTS[step] ?? 'exQ1Hint')}</p>
        {renderStepBody()}

        <div className="tmm-wizard__actions">
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
