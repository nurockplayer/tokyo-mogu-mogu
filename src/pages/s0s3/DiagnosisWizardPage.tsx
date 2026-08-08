/**
 * S1 Dietary Restrictions + S2 Preference Diagnosis wizard (Issue #43).
 *
 * One screen / one question. The whole flow keeps a single `DiagnosisAnswers`
 * object in state (seeded from sessionStorage) and writes it back on every
 * change, so Back/Next never lose prior answers and `/diagnosis/result` can
 * read the same payload. The final step navigates to `/diagnosis/result`.
 *
 * S1 dietary input is used only for recommendation / match reasons — the
 * trust copy on this screen states that explicitly and no safety claim is
 * ever derived from it.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { Button, Chip, ProgressBar, StepDots } from '../../ui';
import {
  S2_FIRST_STEP,
  WIZARD_STEP_COUNT,
  createDefaultAnswers,
  fillTemplate,
  type BaseArea,
  type DiagnosisAnswers,
  type DietaryRestriction,
  type Experience,
  type Interest,
  type Taste,
  type TravelTime,
  type TripDuration,
} from '../../lib/diagnosis';
import { loadDiagnosisAnswers, saveDiagnosisAnswers } from './session';
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

/** S2 copy keys for the current step's question title / hint. */
const S2_TITLES = ['s2Q1Title', 's2Q2Title', 's2Q3Title', 's2Q4Title', 's2Q5Title'] as const;
const S2_HINTS = ['s2Q1Hint', 's2Q2Hint', 's2Q3Hint', 's2Q4Hint', 's2Q5Hint'] as const;

export function DiagnosisWizardPage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<DiagnosisAnswers>(() => {
    const saved = loadDiagnosisAnswers();
    return saved ? { ...createDefaultAnswers(), ...saved } : createDefaultAnswers();
  });
  const [step, setStep] = useState(0);

  /** Update answers and mirror them to sessionStorage for the result screen. */
  function persist(next: DiagnosisAnswers) {
    setAnswers(next);
    saveDiagnosisAnswers(next);
  }

  const dietaryChoices: Choice<DietaryRestriction>[] = [
    { value: 'allergy', label: t('s1Allergy') },
    { value: 'vegetarian-vegan', label: t('s1Vegan') },
    { value: 'religious', label: t('s1Religious') },
    { value: 'dislike', label: t('s1Dislike') },
  ];

  const tasteChoices: Choice<Taste>[] = [
    { value: 'refreshing', label: t('s2TasteRefreshing') },
    { value: 'rich', label: t('s2TasteRich') },
    { value: 'spicy', label: t('s2TasteSpicy') },
    { value: 'sweet', label: t('s2TasteSweet') },
  ];

  const experienceChoices: Choice<Experience>[] = [
    { value: 'eat', label: t('s2ExpEat') },
    { value: 'make', label: t('s2ExpMake') },
    { value: 'buy', label: t('s2ExpBuy') },
    { value: 'meet', label: t('s2ExpMeet') },
  ];

  const areaChoices: Choice<BaseArea>[] = [
    { value: 'okutama', label: t('s2AreaOkutama') },
    { value: 'tama-center', label: t('s2AreaTama') },
    { value: 'tokyo-west', label: t('s2AreaTokyoWest') },
  ];

  const travelChoices: Choice<TravelTime>[] = [
    { value: 'within-30', label: t('s2TravelWithin30') },
    { value: 'within-60', label: t('s2TravelWithin60') },
    { value: 'over-60', label: t('s2TravelOver60') },
  ];

  const interestChoices: Choice<Interest>[] = [
    { value: 'tradition', label: t('s2InterestTradition') },
    { value: 'nature', label: t('s2InterestNature') },
    { value: 'daily-life', label: t('s2InterestDaily') },
  ];

  const durationChoices: Choice<TripDuration>[] = [
    { value: 'half-day', label: t('s2DurationHalf') },
    { value: 'full-day', label: t('s2DurationFull') },
  ];

  const isS1 = step === 0;
  const s2Index = step - S2_FIRST_STEP;
  const stepCount = WIZARD_STEP_COUNT;

  /** Whether the current step has enough input to continue. */
  const canProceed = useMemo(() => {
    if (isS1) return true; // dietary input is optional / skippable
    switch (step) {
      case 1:
        return answers.tastes.length > 0;
      case 2:
        return true; // multi-select, optional
      case 3:
        return answers.baseArea !== null && answers.travelTime !== null;
      case 4:
        return answers.interests.length > 0;
      case 5:
        return answers.duration !== null;
      default:
        return true;
    }
  }, [isS1, step, answers]);

  // --- Field mutations (each persists immediately so Back never loses input) ---

  function toggleDietary(value: DietaryRestriction) {
    persist({
      ...answers,
      hasNoRestrictions: false,
      dietary: toggleValue(answers.dietary, value),
    });
  }

  function toggleNoRestrictions() {
    persist({ ...answers, hasNoRestrictions: true, dietary: [], dietaryOther: '' });
  }

  function setDietaryOther(value: string) {
    const trimmed = value.trim();
    persist({
      ...answers,
      dietaryOther: value,
      hasNoRestrictions: trimmed.length === 0 && answers.dietary.length === 0,
    });
  }

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
      navigate('/diagnosis/result');
    }
  }

  // --- Renderers ---

  function renderSingle<V extends string>(
    choices: Choice<V>[],
    value: V | null,
    onChange: (v: V) => void,
  ) {
    return (
      <div className="tmm-wizard__options" role="radiogroup">
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
      case 1:
        return renderMulti(tasteChoices, answers.tastes, toggleTaste);
      case 2:
        return renderMulti(experienceChoices, answers.experiences, toggleExperience);
      case 3:
        return (
          <>
            <p className="tmm-wizard__hint">{t('s2Q3AreaLabel')}</p>
            {renderSingle(areaChoices, answers.baseArea, setBaseArea)}
            <p className="tmm-wizard__hint">{t('s2Q3TravelLabel')}</p>
            {renderSingle(travelChoices, answers.travelTime, setTravelTime)}
          </>
        );
      case 4:
        return renderMulti(interestChoices, answers.interests, toggleInterest);
      case 5:
        return renderSingle(durationChoices, answers.duration, setDuration);
      default:
        return null;
    }
  }

  const progressLabel = fillTemplate(t('wizardStepOf'), {
    n: String(step + 1),
    total: String(stepCount),
  });

  const ariaProgress = fillTemplate(t('wizardProgressAria'), {
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
            <ProgressBar value={step + 1} max={stepCount} label={progressLabel} />
          </div>
        </div>

        <StepDots total={stepCount} current={step} label={ariaProgress} />

        {isS1 ? (
          <>
            <h1 className="tmm-wizard__question">{t('s1Title')}</h1>
            <p className="tmm-wizard__hint">{t('s1Hint')}</p>

            {renderMulti(dietaryChoices, answers.dietary, toggleDietary)}

            <div className="tmm-wizard__options">
              <Chip selected={answers.hasNoRestrictions} onClick={toggleNoRestrictions}>
                {t('s1Skip')}
              </Chip>
            </div>

            <label htmlFor="s1-other" className="tmm-wizard__hint">
              {t('s1OtherLabel')}
            </label>
            <input
              id="s1-other"
              className="tmm-wizard__text"
              type="text"
              value={answers.dietaryOther}
              onChange={(e) => setDietaryOther(e.target.value)}
              placeholder={t('s1OtherPlaceholder')}
              disabled={answers.hasNoRestrictions}
            />

            <p className="tmm-wizard__trust">{t('s1Trust')}</p>
          </>
        ) : (
          <>
            <h1 className="tmm-wizard__question">{t(S2_TITLES[s2Index] ?? 's2Q1Title')}</h1>
            <p className="tmm-wizard__hint">{t(S2_HINTS[s2Index] ?? 's2Q1Hint')}</p>
            {renderStepBody()}
          </>
        )}

        <div className="tmm-wizard__actions">
          <Button
            variant="primary"
            className="tmm-btn--block"
            onClick={goNext}
            disabled={!canProceed}
          >
            {step === stepCount - 1 ? t('s2Done') : t('s2Next')}
          </Button>
        </div>
      </div>
    </div>
  );
}
