/**
 * Food Profile page (Issue #78 reframe of S1; Issue #181 Figma conversation).
 *
 * The stable, accountless, locally persisted record of the user's dietary
 * restrictions — asked on first use (before the first Exploration) and editable
 * later from My → Food Profile (#81). It is NOT part of the per-trip
 * Exploration answers.
 *
 * Routes:
 *   /food-profile      → first-use setup when no profile exists, else summary
 *   /food-profile/edit → edit an existing profile (mode="edit")
 *
 * Presentation follows the Figma Food Profile conversation (handoff #187):
 * an assistant-led chat rhythm — assistant bubble with an embedded 46px-scale
 * choice row, a user confirmation bubble once an answer is picked, one category
 * per step, then an optional free-text step and a summary with the
 * recommendation-only trust copy. The canonical FoodProfile schema, the
 * save/edit/no-restriction behavior, and the safety boundary are unchanged.
 * Input is recommendation-only, never a safety guarantee (product contract
 * "Safety Boundary").
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { Button, Chip, StepDots } from '../../ui';
import {
  createDefaultFoodProfile,
  type DietaryRestriction,
  type FoodProfile,
} from '../../lib/food-profile';
import { loadFoodProfile, saveFoodProfile } from '../../lib/food-profile-storage';
import { fillTemplate } from '../../lib/exploration';
import { beginNewExploration } from './exploration-session';
import './onboarding.css';
import './FoodProfilePage.css';

interface Choice {
  value: DietaryRestriction;
  label: string;
}

function isSelected(values: DietaryRestriction[], value: DietaryRestriction): boolean {
  return values.includes(value);
}

/** Build the next profile draft from the current one + a field change. */
function draft(profile: FoodProfile, patch: Partial<FoodProfile>): FoodProfile {
  return { ...profile, ...patch };
}

/**
 * Whether the page should render first-use setup, edit mode, or the summary.
 * Derived directly from the persisted-profile presence and the route `mode`
 * (Issue #78 P1 fix) — never from duplicated local state.
 */
export function foodProfileView(mode: 'view' | 'edit', hasExisting: boolean) {
  if (!hasExisting) return 'setup';
  return mode === 'edit' ? 'edit' : 'summary';
}

/** Wizard step index constants for the conversation. */
const STEP_INTRO = 0;
const STEP_Q1 = 1;
const STEP_Q4 = 4;
const STEP_OTHER = 5;
const STEP_SUMMARY = 6;
const CATEGORY_STEP_COUNT = 4;

export function FoodProfilePage({ mode = 'view' }: { mode?: 'view' | 'edit' }) {
  const { t } = useI18n();
  const navigate = useNavigate();

  // `existing` is re-read whenever the route/mode changes so navigating
  // between /food-profile and /food-profile/edit always reflects the latest
  // persisted profile (Issue #78 P1 fix). Edit mode is derived directly from
  // the `mode` prop, never duplicated in local state.
  const [existing, setExisting] = useState<FoodProfile | null>(() => loadFoodProfile());
  const [draftState, setDraftState] = useState<FoodProfile>(
    () => existing ?? createDefaultFoodProfile(),
  );

  const editing = mode === 'edit';

  useEffect(() => {
    // Route navigation (view ⇄ edit) can reuse the same component instance, so
    // the `mode` prop changes without remounting. Re-read storage so the
    // summary/edit draft always reflect the current persisted profile.
    setExisting(loadFoodProfile());
  }, [mode]);

  // The conversation restarts from the saved profile whenever the route/mode
  // changes so edit always reflects the latest persisted state. The same
  // component instance is reused when React Router swaps `/food-profile` ⇄
  // `/food-profile/edit` (only the `mode` prop changes), so `step`/`answered`
  // must be reset too — otherwise edit would open on a stale conversation step
  // (Issue #181 reviewer finding).
  useEffect(() => {
    setDraftState(loadFoodProfile() ?? createDefaultFoodProfile());
    setStep(mode === 'edit' ? STEP_Q1 : STEP_INTRO);
    setAnswered(new Set());
  }, [mode]);

  const choices: Choice[] = [
    { value: 'allergy', label: t('fpAllergy') },
    { value: 'vegetarian-vegan', label: t('fpVegan') },
    { value: 'religious', label: t('fpReligious') },
    { value: 'dislike', label: t('fpDislike') },
  ];

  // Category step titles in order (allergy → vegan → religious → dislike).
  const categoryTitles = [
    t('fpQ1Title'),
    t('fpQ2Title'),
    t('fpQ3Title'),
    t('fpQ4Title'),
  ] as const;

  const [step, setStep] = useState(editing ? STEP_Q1 : STEP_INTRO);
  const [answered, setAnswered] = useState<Set<number>>(new Set());

  /** Mark the current category step as explicitly answered by the user. */
  function markAnswered(currentStep: number) {
    setAnswered((prev) => new Set(prev).add(currentStep));
  }

  /** Set whether a category restriction is present in the draft. */
  function setCategory(value: DietaryRestriction, present: boolean) {
    setDraftState((prev) => {
      const presentNow = isSelected(prev.dietary, value);
      if (present === presentNow) return prev;
      return draft(prev, {
        dietary: present
          ? [...prev.dietary, value]
          : prev.dietary.filter((v) => v !== value),
        hasNoRestrictions: false,
      });
    });
  }

  function setNoRestrictions() {
    setDraftState((prev) =>
      draft(prev, { hasNoRestrictions: true, dietary: [], dietaryOther: '' }),
    );
  }

  function setDietaryOther(value: string) {
    const trimmed = value.trim();
    setDraftState((prev) =>
      draft(prev, {
        dietaryOther: value,
        hasNoRestrictions: trimmed.length === 0 && prev.dietary.length === 0,
      }),
    );
  }

  /** Normalize the "no restrictions" invariant at save time. */
  function normalizedProfile(profile: FoodProfile): FoodProfile {
    const noRestrictions = profile.dietary.length === 0 && profile.dietaryOther.trim().length === 0;
    return noRestrictions ? draft(profile, { hasNoRestrictions: true }) : profile;
  }

  function handleSave() {
    const profile = normalizedProfile(draft(draftState, { savedAt: new Date().toISOString() }));
    saveFoodProfile(profile);
    // Keep the summary fresh with the just-saved profile so returning to the
    // summary route never renders a stale profile (Issue #78 P1 fix).
    setExisting(profile);
    // First-use setup → continue straight into the current Exploration; edit →
    // return to the profile summary.
    if (existing) {
      navigate('/food-profile');
    } else {
      beginNewExploration();
      navigate('/explore');
    }
  }

  function handleCancel() {
    if (editing) {
      // Cancel from edit mode: discard the draft and return to the summary,
      // re-reading the persisted profile (which is unchanged by cancel).
      setExisting(loadFoodProfile());
      setDraftState(loadFoodProfile() ?? createDefaultFoodProfile());
      navigate('/food-profile');
    } else {
      navigate('/');
    }
  }

  function goBack() {
    if (step > 0) {
      if (step === STEP_Q1 && editing) {
        // Edit back from the first category step → profile summary.
        navigate('/food-profile');
        return;
      }
      setStep(step - 1);
    } else {
      handleCancel();
    }
  }

  function goNext() {
    if (step === STEP_SUMMARY) {
      handleSave();
      return;
    }
    if (step === STEP_OTHER) {
      setStep(STEP_SUMMARY);
      return;
    }
    if (step < STEP_Q4) {
      setStep(step + 1);
      return;
    }
    // After the last category step → optional free-text step.
    setStep(STEP_OTHER);
  }

  // Single source of truth for which view renders (Issue #78 P1 fix): derived
  // from the route `mode` + persisted-profile presence, never duplicated state.
  const view = foodProfileView(mode, existing !== null);

  // First-use setup: no profile exists yet.
  if (view === 'setup') {
    return (
      <div className="tmm-page tmm-food-profile">
        <ConversationHeader editing={false} onBack={goBack} />
        {step === STEP_INTRO ? (
          <IntroCard
            onStart={() => setStep(STEP_Q1)}
            onNoRestrictions={() => {
              setNoRestrictions();
              setStep(STEP_SUMMARY);
            }}
            onBrowse={() => navigate('/discover')}
          />
        ) : null}

        {step >= STEP_Q1 && step <= STEP_Q4 ? (
          <>
            <ProgressHeader step={step} />
            <CategoryStep
              title={categoryTitles[step - STEP_Q1]}
              choice={choices[step - STEP_Q1]}
              present={isSelected(draftState.dietary, choices[step - STEP_Q1].value)}
              answered={answered.has(step)}
              onAnswer={(present) => {
                setCategory(choices[step - STEP_Q1].value, present);
                markAnswered(step);
              }}
              yesLabel={t('fpYes')}
              noLabel={t('fpNo')}
            />
            <WizardActions onNext={goNext} nextLabel={t('exNext')} />
          </>
        ) : null}

        {step === STEP_OTHER ? (
          <>
            <OtherStep
              value={draftState.dietaryOther}
              note={t('fpOtherNote')}
              label={t('fpOtherLabel')}
              placeholder={t('fpOtherPlaceholder')}
              onChange={setDietaryOther}
              disabled={draftState.hasNoRestrictions}
            />
            <WizardActions onNext={goNext} nextLabel={t('exNext')} />
          </>
        ) : null}

        {step === STEP_SUMMARY ? (
          <>
            <SummaryStep profile={draftState} choices={choices} />
            <WizardActions onNext={handleSave} nextLabel={t('fpSave')} />
          </>
        ) : null}
      </div>
    );
  }

  // Edit mode (My → Food Profile → edit).
  if (view === 'edit') {
    return (
      <div className="tmm-page tmm-food-profile">
        <ConversationHeader editing onBack={goBack} />
        {step >= STEP_Q1 && step <= STEP_Q4 ? (
          <>
            <ProgressHeader step={step} />
            <CategoryStep
              title={categoryTitles[step - STEP_Q1]}
              choice={choices[step - STEP_Q1]}
              present={isSelected(draftState.dietary, choices[step - STEP_Q1].value)}
              answered={answered.has(step)}
              onAnswer={(present) => {
                setCategory(choices[step - STEP_Q1].value, present);
                markAnswered(step);
              }}
              yesLabel={t('fpYes')}
              noLabel={t('fpNo')}
            />
            <WizardActions onNext={goNext} nextLabel={t('exNext')} />
          </>
        ) : null}

        {step === STEP_OTHER ? (
          <>
            <OtherStep
              value={draftState.dietaryOther}
              note={t('fpOtherNote')}
              label={t('fpOtherLabel')}
              placeholder={t('fpOtherPlaceholder')}
              onChange={setDietaryOther}
              disabled={draftState.hasNoRestrictions}
            />
            <WizardActions onNext={goNext} nextLabel={t('exNext')} />
          </>
        ) : null}

        {step === STEP_SUMMARY ? (
          <>
            <SummaryStep profile={draftState} choices={choices} />
            <WizardActions onNext={handleSave} nextLabel={t('fpSave')} />
          </>
        ) : null}
      </div>
    );
  }

  // Display mode: show the current durable profile with an edit entry.
  // `view === 'summary'` only when a profile exists; the guard satisfies TS.
  if (!existing) {
    return null;
  }
  return (
    <div className="tmm-page tmm-food-profile">
      <h1 className="page-title">{t('fpTitle')}</h1>
      <p className="page-sub">{t('fpSub')}</p>

      <div className="tmm-profile-summary">
        {existing.hasNoRestrictions ? (
          <p className="tmm-profile-summary__line">{t('fpNoRestrictions')}</p>
        ) : (
          <ul className="tmm-profile-summary__list">
            {existing.dietary.map((value) => (
              <li key={value} className="tmm-profile-summary__item">
                {choices.find((c) => c.value === value)?.label ?? value}
              </li>
            ))}
            {existing.dietaryOther.trim().length > 0 ? (
              <li className="tmm-profile-summary__item">{existing.dietaryOther}</li>
            ) : null}
          </ul>
        )}
      </div>

      <div className="tmm-result__actions">
        <Link to="/food-profile/edit" className="tmm-btn tmm-btn--secondary tmm-btn--block">
          {t('fpEditCta')}
        </Link>
        <Link
          to="/explore"
          className="tmm-btn tmm-btn--primary tmm-btn--block"
          onClick={beginNewExploration}
        >
          {t('fpStartExplorationCta')}
        </Link>
      </div>
    </div>
  );
}

/** Back button + page title row shared by every conversation step. */
function ConversationHeader({
  editing,
  onBack,
}: {
  editing: boolean;
  onBack: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="tmm-wizard__header fp-convo-header">
      <button
        type="button"
        className="tmm-wizard__back"
        onClick={onBack}
        aria-label={t('back')}
      >
        ‹
      </button>
      <h1 className="fp-convo-header__label">
        {editing ? t('fpEditTitle') : t('fpSetupTitle')}
      </h1>
      <span className="fp-convo-header__spacer" />
    </div>
  );
}

/** Progress bar + step dots shown during the four category steps. */
function ProgressHeader({ step }: { step: number }) {
  const { t } = useI18n();
  const n = step - STEP_Q1 + 1;
  const label = fillTemplate(t('fpStepOf'), { n: String(n), total: String(CATEGORY_STEP_COUNT) });
  return (
    <>
      <div className="tmm-wizard__progress fp-convo-progress">
        <span className="tmm-progress__label">{label}</span>
      </div>
      <StepDots total={CATEGORY_STEP_COUNT} current={n - 1} label={label} />
    </>
  );
}

/** Intro message with the primary start CTA and the browse escape hatch. */
function IntroCard({
  onStart,
  onNoRestrictions,
  onBrowse,
}: {
  onStart: () => void;
  onNoRestrictions: () => void;
  onBrowse: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="fp-convo">
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__title">{t('fpIntroTitle')}</p>
          <p className="fp-convo__body">{t('fpIntroBody')}</p>
          <div className="fp-convo__choices fp-convo__choices--stack">
            <Button variant="primary" className="tmm-btn--block" onClick={onStart}>
              {t('fpStartCta')}
            </Button>
            <Chip onClick={onNoRestrictions}>{t('fpNoRestrictions')}</Chip>
          </div>
        </div>
      </div>
      <button type="button" className="fp-convo__browse" onClick={onBrowse}>
        {t('fpBrowseCta')}
      </button>
    </div>
  );
}

/** One category question: assistant bubble + 46px yes/no choice row. */
function CategoryStep({
  title,
  choice,
  present,
  answered,
  onAnswer,
  yesLabel,
  noLabel,
}: {
  title: string;
  choice: Choice;
  present: boolean;
  answered: boolean;
  onAnswer: (present: boolean) => void;
  yesLabel: string;
  noLabel: string;
}) {
  return (
    <div className="fp-convo">
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__q">{title}</p>
          <div className="fp-convo__choices">
            <Chip selected={present} onClick={() => onAnswer(true)}>
              {yesLabel}
            </Chip>
            <Chip selected={!present} onClick={() => onAnswer(false)}>
              {noLabel}
            </Chip>
          </div>
        </div>
      </div>
      {answered ? (
        <div className="fp-convo__msg fp-convo__msg--user" aria-hidden="true">
          <div className="fp-convo__bubble">{present ? yesLabel : noLabel}</div>
        </div>
      ) : null}
      <p className="fp-convo__hint">{choice.label}</p>
    </div>
  );
}

/** Optional free-text step for other restrictions. */
function OtherStep({
  value,
  note,
  label,
  placeholder,
  onChange,
  disabled,
}: {
  value: string;
  note: string;
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="fp-convo">
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__q">{note}</p>
          <label htmlFor="fp-other" className="fp-convo__label">
            {label}
          </label>
          <input
            id="fp-other"
            className="tmm-wizard__text"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

/** Summary: assistant confirmation + profile summary + trust copy. */
function SummaryStep({ profile, choices }: { profile: FoodProfile; choices: Choice[] }) {
  const { t } = useI18n();
  const items = profile.dietary.map(
    (value) => choices.find((c) => c.value === value)?.label ?? value,
  );
  if (profile.dietaryOther.trim().length > 0) {
    items.push(profile.dietaryOther);
  }
  return (
    <div className="fp-convo">
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__title">{t('fpSummaryConfirm')}</p>
          <p className="fp-convo__body">{t('fpSummaryTitle')}</p>
          <div className="tmm-profile-summary">
            {profile.hasNoRestrictions || items.length === 0 ? (
              <p className="tmm-profile-summary__line">{t('fpNoRestrictions')}</p>
            ) : (
              <ul className="tmm-profile-summary__list">
                {items.map((item, index) => (
                  <li key={`${item}-${index}`} className="tmm-profile-summary__item">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="fp-convo__trust">{t('fpSummaryTrust')}</p>
          <p className="fp-convo__note">{t('fpEditNote')}</p>
        </div>
      </div>
    </div>
  );
}

/** Primary action row pinned to the bottom of the conversation. */
function WizardActions({
  onNext,
  nextLabel,
}: {
  onNext: () => void;
  nextLabel: string;
}) {
  return (
    <div className="tmm-wizard__actions fp-convo-actions">
      <Button variant="primary" className="tmm-btn--block" onClick={onNext}>
        {nextLabel}
      </Button>
    </div>
  );
}
