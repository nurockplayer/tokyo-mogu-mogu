/**
 * Food Profile page (Issue #78 reframe of S1; Issue #181 Figma conversation →
 * Issue #217 Phase 1).
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
 * Phase 1 presents the Figma Food Profile as a LINE / ChatGPT-style
 * conversation: the assistant welcome, an optional session-only nickname step,
 * a dietary acknowledgement, and a summary with the recommendation-only trust
 * copy. Phase 1 first-use setup (the demo path) does not collect dietary
 * conditions — it explains that dietary/allergy compatibility is not evaluated
 * in this prototype and offers a single continue acknowledgement, so no
 * contradiction with the fixed Okutama × Tokyo Wasabi route is possible
 * (Issue #220). The durable model and the edit surface keep all four categories
 * plus free text for Phase 2. Selected choices append to the transcript as user
 * confirmation bubbles so the history stays visible. The canonical FoodProfile
 * schema, the save/edit/no-restriction behavior, and the safety boundary are
 * unchanged. Input is recommendation-only, never a safety guarantee (product
 * contract "Safety Boundary"). No option implies an allergy / vegan / religious
 * safety guarantee and no option contradicts the fixed Okutama × Tokyo Wasabi
 * demo route.
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
import { loadNickname, saveNickname } from '../../lib/nickname';
import { beginNewExploration } from './exploration-session';
import {
  ChatTranscript,
  AssistantMessage,
  AssistantQuestion,
  type ChatItem,
} from './conversation';
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
const STEP_NICKNAME = 1;
/** First dietary category step (always the step right after nickname). */
const FIRST_CATEGORY_STEP = STEP_NICKNAME + 1;

/** Which intro action the user chose (drives the intro transcript bubble). */
type IntroChoice = 'start' | 'no-restrictions';

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

  const [step, setStep] = useState(editing ? FIRST_CATEGORY_STEP : STEP_INTRO);
  const [answered, setAnswered] = useState<Set<number>>(new Set());
  const [introChoice, setIntroChoice] = useState<IntroChoice | null>(null);
  const [nicknameInput, setNicknameInput] = useState(() => loadNickname() ?? '');

  // The conversation restarts from the saved profile whenever the route/mode
  // changes so edit always reflects the latest persisted state. The same
  // component instance is reused when React Router swaps `/food-profile` ⇄
  // `/food-profile/edit` (only the `mode` prop changes), so step/answered/
  // introChoice must be reset too — otherwise edit would open on a stale
  // conversation step (Issue #181 reviewer finding). Nickname is session-only
  // and edit starts at the first category question.
  useEffect(() => {
    setDraftState(loadFoodProfile() ?? createDefaultFoodProfile());
    setStep(mode === 'edit' ? FIRST_CATEGORY_STEP : STEP_INTRO);
    setAnswered(new Set());
    setIntroChoice(null);
    setNicknameInput(loadNickname() ?? '');
  }, [mode]);

  const choices: Choice[] = [
    { value: 'allergy', label: t('fpAllergy') },
    { value: 'vegetarian-vegan', label: t('fpVegan') },
    { value: 'religious', label: t('fpReligious') },
    { value: 'dislike', label: t('fpDislike') },
  ];

  // Phase 1 first-use setup collects no dietary conditions (Issue #220): instead
  // of yes/no categories or free text it shows a dietary acknowledgement, so no
  // allergy / vegan / religious / dislike / free-text condition can contradict
  // the fixed demo route. The durable Food Profile model and the edit surface
  // keep all four categories plus free text for Phase 2.
  const phase1Choices: Choice[] = [];
  const categoryChoices = editing ? choices : phase1Choices;
  const categoryCount = categoryChoices.length;
  const lastCategoryStep = FIRST_CATEGORY_STEP + categoryCount - 1;
  // The step right after the last category: the free-text "other" step in edit
  // mode, and the dietary acknowledgement in Phase 1 first-use setup.
  const postCategoryStep = lastCategoryStep + 1;
  const summaryStep = postCategoryStep + 1;

  // Category step titles, in the order the current mode offers them.
  const categoryTitles = categoryChoices.map((choice) =>
    choice.value === 'allergy'
      ? t('fpQ1Title')
      : choice.value === 'vegetarian-vegan'
        ? t('fpQ2Title')
        : choice.value === 'religious'
          ? t('fpQ3Title')
          : t('fpQ4Title'),
  );

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
    if (step > STEP_INTRO) {
      if (step === FIRST_CATEGORY_STEP && editing) {
        // Edit back from the first category step → profile summary.
        navigate('/food-profile');
        return;
      }
      setStep(step - 1);
    } else {
      handleCancel();
    }
  }

  /** Advance past the current step. Category steps require an explicit answer. */
  function canProceed(): boolean {
    if (step >= FIRST_CATEGORY_STEP && step <= lastCategoryStep) return answered.has(step);
    return true;
  }

  function goNext() {
    if (step === summaryStep) {
      handleSave();
      return;
    }
    if (step === postCategoryStep) {
      // Edit: free-text "other" → summary. First-use: dietary acknowledgement → summary.
      setStep(summaryStep);
      return;
    }
    if (step >= FIRST_CATEGORY_STEP && step < lastCategoryStep) {
      setStep(step + 1);
      return;
    }
    // After the last category step → the post-category step.
    setStep(postCategoryStep);
  }

  /** Save the session nickname (blank = skip) and continue to the first question. */
  function submitNickname() {
    if (nicknameInput.trim().length > 0) {
      saveNickname(nicknameInput);
    }
    setStep(FIRST_CATEGORY_STEP);
  }

  // Single source of truth for which view renders (Issue #78 P1 fix): derived
  // from the route `mode` + persisted-profile presence, never duplicated state.
  const view = foodProfileView(mode, existing !== null);

  // The nickname is session-only and never part of the durable profile.
  const nickname = loadNickname();

  // Accumulated conversation history: every completed turn stays visible so the
  // journey reads as a conversation, not a form (Issue #217).
  const transcript: ChatItem[] = [];
  if (introChoice) {
    transcript.push({
      id: 'intro',
      role: 'assistant',
      children: <AssistantMessage title={t('fpIntroTitle')} body={t('fpIntroBody')} />,
    });
    transcript.push({
      id: 'intro-user',
      role: 'user',
      children: introChoice === 'start' ? t('fpStartCta') : t('fpNoRestrictions'),
    });
  }
  if (introChoice === 'start' && step > STEP_NICKNAME) {
    transcript.push({
      id: 'nickname',
      role: 'assistant',
      children: <AssistantQuestion title={t('fpNicknameTitle')} />,
    });
    transcript.push({
      id: 'nickname-user',
      role: 'user',
      children: nickname ?? t('fpNicknameSkip'),
    });
  }
  for (let i = FIRST_CATEGORY_STEP; i < step && i <= lastCategoryStep; i += 1) {
    const value = categoryChoices[i - FIRST_CATEGORY_STEP].value;
    transcript.push({
      id: `q${i}`,
      role: 'assistant',
      children: <AssistantQuestion title={categoryTitles[i - FIRST_CATEGORY_STEP]} />,
    });
    if (answered.has(i)) {
      transcript.push({
        id: `q${i}-user`,
        role: 'user',
        children: isSelected(draftState.dietary, value) ? t('fpYes') : t('fpNo'),
      });
    }
  }
  if (step > postCategoryStep) {
    if (editing) {
      transcript.push({
        id: 'other',
        role: 'assistant',
        children: <AssistantQuestion title={t('fpOtherNote')} />,
      });
      if (draftState.dietaryOther.trim().length > 0) {
        transcript.push({
          id: 'other-user',
          role: 'user',
          children: draftState.dietaryOther,
        });
      }
    } else if (introChoice === 'start') {
      transcript.push({
        id: 'dietary-ack',
        role: 'assistant',
        children: <AssistantMessage title={t('fpDietaryAckTitle')} body={t('fpDietaryAckBody')} />,
      });
      transcript.push({
        id: 'dietary-ack-user',
        role: 'user',
        children: t('fpDietaryAckCta'),
      });
    }
  }

  // First-use setup: no profile exists yet.
  if (view === 'setup') {
    return (
      <div className="tmm-page tmm-food-profile">
        <ConversationHeader editing={false} onBack={goBack} />
        <ChatTranscript items={transcript} />

        {step === STEP_INTRO ? (
          <IntroCard
            onStart={() => {
              setIntroChoice('start');
              setStep(STEP_NICKNAME);
            }}
            onNoRestrictions={() => {
              setNoRestrictions();
              setIntroChoice('no-restrictions');
              setStep(summaryStep);
            }}
          />
        ) : null}

        {step === STEP_NICKNAME ? (
          <>
            <NicknameStep
              value={nicknameInput}
              onChange={setNicknameInput}
              onConfirm={submitNickname}
              onSkip={() => setStep(FIRST_CATEGORY_STEP)}
            />
          </>
        ) : null}

        {step >= FIRST_CATEGORY_STEP && step <= lastCategoryStep ? (
          <>
            <ProgressHeader step={step} categoryCount={categoryCount} />
            <CategoryStep
              title={categoryTitles[step - FIRST_CATEGORY_STEP]}
              choice={categoryChoices[step - FIRST_CATEGORY_STEP]}
              present={isSelected(draftState.dietary, categoryChoices[step - FIRST_CATEGORY_STEP].value)}
              answered={answered.has(step)}
              onAnswer={(present) => {
                setCategory(categoryChoices[step - FIRST_CATEGORY_STEP].value, present);
                markAnswered(step);
              }}
              yesLabel={t('fpYes')}
              noLabel={t('fpNo')}
            />
            <WizardActions onNext={goNext} nextLabel={t('exNext')} disabled={!canProceed()} />
          </>
        ) : null}

        {step === postCategoryStep ? (
          editing ? (
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
          ) : (
            <DietaryAckStep onContinue={() => setStep(summaryStep)} />
          )
        ) : null}

        {step === summaryStep ? (
          <>
            <SummaryStep profile={draftState} choices={choices} nickname={nickname} />
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
        <ChatTranscript items={transcript} />

        {step >= FIRST_CATEGORY_STEP && step <= lastCategoryStep ? (
          <>
            <ProgressHeader step={step} categoryCount={categoryCount} />
            <CategoryStep
              title={categoryTitles[step - FIRST_CATEGORY_STEP]}
              choice={categoryChoices[step - FIRST_CATEGORY_STEP]}
              present={isSelected(draftState.dietary, categoryChoices[step - FIRST_CATEGORY_STEP].value)}
              answered={answered.has(step)}
              onAnswer={(present) => {
                setCategory(categoryChoices[step - FIRST_CATEGORY_STEP].value, present);
                markAnswered(step);
              }}
              yesLabel={t('fpYes')}
              noLabel={t('fpNo')}
            />
            <WizardActions onNext={goNext} nextLabel={t('exNext')} disabled={!canProceed()} />
          </>
        ) : null}

        {step === postCategoryStep ? (
          editing ? (
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
          ) : (
            <DietaryAckStep onContinue={() => setStep(summaryStep)} />
          )
        ) : null}

        {step === summaryStep ? (
          <>
            <SummaryStep profile={draftState} choices={choices} nickname={loadNickname()} />
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

/** Progress bar + step dots shown during the category steps. */
function ProgressHeader({ step, categoryCount }: { step: number; categoryCount: number }) {
  const { t } = useI18n();
  const n = step - FIRST_CATEGORY_STEP + 1;
  const label = fillTemplate(t('fpStepOf'), { n: String(n), total: String(categoryCount) });
  return (
    <>
      <div className="tmm-wizard__progress fp-convo-progress">
        <span className="tmm-progress__label">{label}</span>
      </div>
      <StepDots total={categoryCount} current={n - 1} label={label} />
    </>
  );
}

/** Intro message with the primary start CTA and the no-restrictions quick path. */
function IntroCard({
  onStart,
  onNoRestrictions,
}: {
  onStart: () => void;
  onNoRestrictions: () => void;
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
    </div>
  );
}

/** Session-only nickname step: input + confirm / skip (both continue to Q1). */
function NicknameStep({
  value,
  onChange,
  onConfirm,
  onSkip,
}: {
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onSkip: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="fp-convo">
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__q">{t('fpNicknameTitle')}</p>
          <label htmlFor="fp-nickname" className="fp-convo__label">
            {t('fpNicknameLabel')}
          </label>
          <input
            id="fp-nickname"
            className="tmm-wizard__text"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t('fpNicknamePlaceholder')}
            maxLength={32}
          />
          <div className="fp-convo__choices">
            <Chip selected onClick={onConfirm}>
              {t('fpNicknameConfirm')}
            </Chip>
            <Chip onClick={onSkip}>{t('fpNicknameSkip')}</Chip>
          </div>
        </div>
      </div>
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
            <Chip selected={answered && present} onClick={() => onAnswer(true)}>
              {yesLabel}
            </Chip>
            <Chip selected={answered && !present} onClick={() => onAnswer(false)}>
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

/**
 * Phase 1 first-use dietary acknowledgement (Issue #220).
 *
 * This prototype does not evaluate dietary/allergy compatibility with the fixed
 * demo route, so first-use setup does not collect restrictions or free text.
 * Instead MOGU states that limitation and offers a single continue action; no
 * allergy / vegan / religious / dislike / free-text condition can be submitted.
 */
function DietaryAckStep({ onContinue }: { onContinue: () => void }) {
  const { t } = useI18n();
  return (
    <div className="fp-convo">
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__title">{t('fpDietaryAckTitle')}</p>
          <p className="fp-convo__body">{t('fpDietaryAckBody')}</p>
          <div className="fp-convo__choices">
            <Button variant="primary" className="tmm-btn--block" onClick={onContinue}>
              {t('fpDietaryAckCta')}
            </Button>
          </div>
        </div>
      </div>
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
function SummaryStep({
  profile,
  choices,
  nickname,
}: {
  profile: FoodProfile;
  choices: Choice[];
  nickname: string | null;
}) {
  const { t } = useI18n();
  const items = profile.dietary.map(
    (value) => choices.find((c) => c.value === value)?.label ?? value,
  );
  if (profile.dietaryOther.trim().length > 0) {
    items.push(profile.dietaryOther);
  }
  const confirm = nickname
    ? fillTemplate(t('fpSummaryConfirmName'), { name: nickname })
    : t('fpSummaryConfirm');
  return (
    <div className="fp-convo">
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__title">{confirm}</p>
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
  disabled = false,
}: {
  onNext: () => void;
  nextLabel: string;
  disabled?: boolean;
}) {
  return (
    <div className="tmm-wizard__actions fp-convo-actions">
      <Button variant="primary" className="tmm-btn--block" onClick={onNext} disabled={disabled}>
        {nextLabel}
      </Button>
    </div>
  );
}
