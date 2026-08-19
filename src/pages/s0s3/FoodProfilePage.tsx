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
 * the latest-Figma four-question dietary interview (allergy / diet / religion /
 * dislikes with emoji quick-reply chips + free input), an interview summary,
 * and the post-profile recommend-vs-browse fork. The interview answers are
 * presentation-only fixture state — they are never written into the durable
 * Food Profile, never claim dietary safety, and never drive the recommendation
 * engine (#201 / #220 / #224). The durable profile is saved as a neutral
 * non-claiming record (`hasNoRestrictions: false`, empty dietary = "not
 * evaluated") so a visibly declared restriction is never stored as its
 * opposite. The edit surface keeps all four categories plus free text for
 * Phase 2. Input is recommendation-only, never a safety guarantee (product
 * contract "Safety Boundary").
 */
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { type LocaleKey } from '../../i18n/resources';
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
  scrollTurnIntoView,
  type ChatItem,
} from './conversation';
import './onboarding.css';
import './FoodProfilePage.css';

interface Choice {
  value: DietaryRestriction;
  label: string;
}

/**
 * Phase 1 presentation-only dietary interview (Issue #224 — Figma 2:623, 3:959,
 * 3:1203, 3:1500). Answers are local/presentation fixture state only: they never
 * join the durable Food Profile, never claim dietary safety, and never drive
 * the recommendation engine. The demo outcome stays the fixed Okutama × Tokyo
 * Wasabi golden path (#201 / #220).
 */
export interface InterviewOption {
  value: string;
  labelKey: LocaleKey;
}

export interface InterviewQuestion {
  titleKey: LocaleKey;
  /** Emoji quick-reply chips, plus an implicit "other" free-input option. */
  options: InterviewOption[];
  /** Whether the ✏️ その他 free-input affordance is shown (Figma Q2 has none). */
  allowOther: boolean;
}

export const PHASE1_INTERVIEW: readonly InterviewQuestion[] = [
  {
    titleKey: 'fpIvQ1Title',
    allowOther: true,
    options: [
      { value: 'egg', labelKey: 'fpIvEgg' },
      { value: 'dairy', labelKey: 'fpIvDairy' },
      { value: 'wheat', labelKey: 'fpIvWheat' },
      { value: 'shellfish', labelKey: 'fpIvShellfish' },
      { value: 'nuts', labelKey: 'fpIvNuts' },
      { value: 'fish', labelKey: 'fpIvFish' },
      { value: 'none', labelKey: 'fpIvNoAllergy' },
    ],
  },
  {
    titleKey: 'fpIvQ2Title',
    allowOther: false,
    options: [
      { value: 'vegetarian', labelKey: 'fpIvVeg' },
      { value: 'vegan', labelKey: 'fpIvVegan' },
      { value: 'pescatarian', labelKey: 'fpIvPescatarian' },
      { value: 'none', labelKey: 'fpIvNoDiet' },
    ],
  },
  {
    titleKey: 'fpIvQ3Title',
    allowOther: true,
    options: [
      { value: 'pork', labelKey: 'fpIvPork' },
      { value: 'beef', labelKey: 'fpIvBeef' },
      { value: 'halal', labelKey: 'fpIvHalal' },
      { value: 'alcohol', labelKey: 'fpIvAlcohol' },
      { value: 'none', labelKey: 'fpIvNoReligious' },
    ],
  },
  {
    titleKey: 'fpIvQ4Title',
    allowOther: true,
    options: [
      { value: 'raw', labelKey: 'fpIvRaw' },
      { value: 'spicy', labelKey: 'fpIvSpicy' },
      { value: 'fermented', labelKey: 'fpIvFermented' },
      { value: 'bitter', labelKey: 'fpIvBitter' },
      { value: 'shellfish', labelKey: 'fpIvDislikeShellfish' },
      { value: 'none', labelKey: 'fpIvNoDislike' },
    ],
  },
];

/** One question's presentation-only answer set. */
export interface InterviewAnswers {
  [questionIndex: number]: string[];
  /** Free-input "other" text per question, keyed by question index. */
  other: Record<number, string>;
}

export function createEmptyInterviewAnswers(): InterviewAnswers {
  return { other: {} };
}

/** Selection labels for a question index (used in the summary). */
export function interviewSelectionLabels(
  answers: InterviewAnswers,
  questionIndex: number,
  t: (key: LocaleKey) => string,
): string[] {
  const q = PHASE1_INTERVIEW[questionIndex];
  if (!q) return [];
  const picked = (answers[questionIndex] ?? [])
    .map((v) => q.options.find((o) => o.value === v)?.labelKey)
    .filter((k): k is LocaleKey => Boolean(k))
    .map((k) => t(k));
  const other = answers.other[questionIndex];
  if (other?.trim()) picked.push(t('fpIvOther'));
  return picked;
}

/**
 * Resolved lines for the setup interview summary (Issue #224). Zero selections
 * render the neutral "not evaluated" copy — never "no restrictions": the
 * presentation interview is not persisted and the durable profile is always
 * saved as a non-claiming "not evaluated" record, so a skipped interview must
 * not be converted into a no-restrictions claim.
 */
export function interviewSummaryLines(
  interviewAnswers: InterviewAnswers,
  t: (key: LocaleKey) => string,
): string[] {
  const selections = PHASE1_INTERVIEW.map((_, index) =>
    interviewSelectionLabels(interviewAnswers, index, t),
  ).filter((labels) => labels.length > 0);
  if (selections.length === 0) return [t('fpNotEvaluated')];
  return selections.map((labels) => labels.join('、'));
}

/**
 * Mutually-exclusive "none" toggle for one presentation interview question.
 * Selecting `none` clears every substantive choice; selecting a substantive
 * choice clears `none`.
 */
export function toggleInterviewAnswer(current: readonly string[], value: string): string[] {
  const isNone = value === 'none';
  const toggledOn = !current.includes(value);
  if (isNone) return toggledOn ? ['none'] : [];
  if (toggledOn) return [...current.filter((v) => v !== 'none'), value];
  return current.filter((v) => v !== value);
}

/**
 * Phase 1 neutral, non-claiming durable profile (Issue #224).
 *
 * The prototype dietary interview is presentation-only and is never mapped into
 * production dietary semantics. Because the prototype does not evaluate
 * restrictions, the durable profile must NOT claim "no restrictions" — that
 * would store the opposite of a visibly declared allergy/restriction. This
 * profile (`hasNoRestrictions: false`, empty dietary) means "not evaluated".
 */
export function createPhase1NeutralProfile(now = new Date().toISOString()): FoodProfile {
  return {
    dietary: [],
    dietaryOther: '',
    hasNoRestrictions: false,
    savedAt: now,
    version: 1,
  };
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
/** Phase 1 setup flow: four presentation interview steps → summary → fork. */
const SETUP_INTERVIEW_FIRST = STEP_NICKNAME + 1;
const SETUP_INTERVIEW_LAST = SETUP_INTERVIEW_FIRST + PHASE1_INTERVIEW.length - 1;
const SETUP_SUMMARY = SETUP_INTERVIEW_LAST + 1;
const SETUP_FORK = SETUP_SUMMARY + 1;

/** Which intro action the user chose (drives the intro transcript bubble). */
type IntroChoice = 'start' | 'browse';

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
  // Latest committed step — mirrors `step` so rapid/double activation can never
  // skip a question (same stale-activation protection as the Exploration).
  const stepRef = useRef(step);
  stepRef.current = step;
  // Transition lock: a realistic accidental second tap (50–120ms) lands on the
  // *newly rendered* live `送信` button whose fresh closure already passes the
  // stale-step guard — so the stale guard alone cannot stop it. While the lock
  // is held the reveal button is disabled, so a second tap is inert. Playwright
  // (and a deliberate user reading the next question) waits for the short
  // window to pass, so no legitimate progression is blocked. Deliberate reading
  // always exceeds this window, so no real delay is introduced.
  const [advanceLocked, setAdvanceLocked] = useState(false);
  const unlockTimerRef = useRef<number | null>(null);
  const ADVANCE_COOLDOWN_MS = 150;
  useEffect(
    () => () => {
      if (unlockTimerRef.current !== null) window.clearTimeout(unlockTimerRef.current);
    },
    [],
  );
  const [answered, setAnswered] = useState<Set<number>>(new Set());
  const [introChoice, setIntroChoice] = useState<IntroChoice | null>(null);
  const [nicknameInput, setNicknameInput] = useState(() => loadNickname() ?? '');
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
  // Phase 1 presentation-only interview answers (Issue #224): local fixture
  // state only — never the durable profile, never a safety claim.
  const [interviewAnswers, setInterviewAnswers] = useState<InterviewAnswers>(() =>
    createEmptyInterviewAnswers(),
  );
  // Presentation-only browse note ("自分で見てみる" / "自分で旅を探す" has no
  // demo branch yet — Figma defines no browse frame, so no destination is
  // invented; D4 stays a KiKi question).
  const [browseNote, setBrowseNote] = useState(false);

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
    setNicknameModalOpen(false);
    setInterviewAnswers(createEmptyInterviewAnswers());
    setBrowseNote(false);
  }, [mode]);

  // LINE-like reveal (Issue #230 motion): keep the newly revealed setup step
  // near the viewport bottom as the conversation grows — same motion as the
  // Exploration. The edit surface keeps its own header flow and is left alone.
  const stepScrollRef = useRef<HTMLDivElement>(null);
  const stepScrollFirst = useRef(true);
  useEffect(() => {
    if (editing) return;
    if (stepScrollFirst.current) {
      stepScrollFirst.current = false;
      return;
    }
    const container = stepScrollRef.current;
    if (!container) return;
    // The current setup step is the last `.fp-convo` in the container (the
    // transcript renders `.fp-chat`, not `.fp-convo`), so the step stays a
    // direct child of `.tmm-food-profile` and the pinned conversation selectors
    // keep matching.
    const steps = Array.from(container.querySelectorAll<HTMLElement>('.fp-convo'));
    const node = steps[steps.length - 1] ?? (container.lastElementChild as HTMLElement | null);
    if (!node) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scrollTurnIntoView(node, reduce ? 'auto' : 'smooth');
  }, [step, editing]);

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

  function setDietaryOther(value: string) {
    const trimmed = value.trim();
    setDraftState((prev) =>
      draft(prev, {
        dietaryOther: value,
        hasNoRestrictions: trimmed.length === 0 && prev.dietary.length === 0,
      }),
    );
  }

  /** Normalize the "no restrictions" invariant at save time (edit path only). */
  function normalizedProfile(profile: FoodProfile): FoodProfile {
    const noRestrictions = profile.dietary.length === 0 && profile.dietaryOther.trim().length === 0;
    return noRestrictions ? draft(profile, { hasNoRestrictions: true }) : profile;
  }

  function handleSave() {
    if (existing) {
      // Edit: persist the edited durable profile (Phase 2 behavior unchanged).
      const profile = normalizedProfile(draft(draftState, { savedAt: new Date().toISOString() }));
      saveFoodProfile(profile);
      // Keep the summary fresh with the just-saved profile so returning to the
      // summary route never renders a stale profile (Issue #78 P1 fix).
      setExisting(profile);
      navigate('/food-profile');
      return;
    }
    // Phase 1 setup: the dietary interview is presentation-only (never mapped
    // into production dietary semantics). The durable profile must NOT claim
    // "no restrictions" (that would contradict a visibly declared restriction),
    // so we persist a neutral, non-claiming profile — `hasNoRestrictions: false`
    // with empty dietary — then continue to the latest-Figma post-profile fork
    // (Figma Talk12 3:1835). A later visit re-reads the persisted profile and
    // shows the summary.
    saveFoodProfile(createPhase1NeutralProfile());
    beginNewExploration();
    setStep(SETUP_FORK);
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
    if (view === 'setup') {
      // Phase 1 setup: intro → nickname → interview 1–4 → summary → fork.
      if (step === SETUP_SUMMARY) {
        handleSave();
      } else {
        const next = step + 1;
        // One activation advances exactly one turn; a stale/double activation
        // is rejected so it cannot skip a question (Issue #230 protection).
        if (next !== stepRef.current + 1) return;
        lockAdvance();
        setStep(next);
      }
      return;
    }
    if (step === summaryStep) {
      handleSave();
      return;
    }
    if (step === postCategoryStep) {
      // Edit: free-text "other" → summary.
      setStep(summaryStep);
      return;
    }
    if (step >= FIRST_CATEGORY_STEP && step < lastCategoryStep) {
      const next = step + 1;
      if (next !== stepRef.current + 1) return;
      lockAdvance();
      setStep(next);
      return;
    }
    // After the last category step → the post-category step.
    setStep(postCategoryStep);
  }

  /** Hold the transition lock so the freshly revealed next-turn control is
   *  inert against a rapid accidental second activation, then release it after
   *  the short window. */
  function lockAdvance() {
    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current);
    }
    setAdvanceLocked(true);
    unlockTimerRef.current = window.setTimeout(() => {
      setAdvanceLocked(false);
      unlockTimerRef.current = null;
    }, ADVANCE_COOLDOWN_MS);
  }

  /** Save the session nickname (blank = skip) and continue to the first question. */
  function submitNickname() {
    if (nicknameInput.trim().length > 0) {
      saveNickname(nicknameInput);
    }
    // Setup → first interview question; edit → first category question.
    setNicknameModalOpen(false);
    setStep(editing ? FIRST_CATEGORY_STEP : SETUP_INTERVIEW_FIRST);
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
      children: introChoice === 'start' ? t('fpStartCta') : t('fpBrowseCta'),
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

  if (view === 'setup') {
    // Phase 1 presentation-only interview turns (Issue #224).
    for (let i = SETUP_INTERVIEW_FIRST; i < step && i <= SETUP_INTERVIEW_LAST; i += 1) {
      const q = PHASE1_INTERVIEW[i - SETUP_INTERVIEW_FIRST];
      transcript.push({
        id: `iv${i}`,
        role: 'assistant',
        children: <AssistantQuestion title={t(q.titleKey)} />,
      });
      const picks = interviewSelectionLabels(interviewAnswers, i - SETUP_INTERVIEW_FIRST, t);
      if (picks.length > 0) {
        transcript.push({ id: `iv${i}-user`, role: 'user', children: picks.join('、') });
      }
    }
  } else {
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
    if (step > postCategoryStep && editing) {
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
    }
  }

  // First-use setup: no profile exists yet.
  if (view === 'setup') {
    return (
      <div ref={stepScrollRef} className="tmm-page tmm-food-profile">
        <ConversationHeader editing={false} onBack={goBack} />
        <ChatTranscript items={transcript} />

        {step === STEP_INTRO && browseNote ? (
          <DemoNote message={t('fpBrowseComingSoon')} onBack={() => setBrowseNote(false)} />
        ) : null}

        {step === STEP_INTRO && !browseNote ? (
          <IntroCard
            onStart={() => {
              setIntroChoice('start');
              setStep(STEP_NICKNAME);
              setNicknameModalOpen(true);
            }}
            onBrowse={() => {
              setIntroChoice('browse');
              setBrowseNote(true);
            }}
          />
        ) : null}

        {step === STEP_NICKNAME ? (
          <NicknameStep
            value={nicknameInput}
            onChange={setNicknameInput}
            onConfirm={submitNickname}
            onSkip={() => {
              setNicknameModalOpen(false);
              setStep(SETUP_INTERVIEW_FIRST);
            }}
            open={nicknameModalOpen}
            onOpen={() => setNicknameModalOpen(true)}
            onCancel={() => {
              setNicknameInput(loadNickname() ?? '');
              setNicknameModalOpen(false);
            }}
          />
        ) : null}

        {step >= SETUP_INTERVIEW_FIRST && step <= SETUP_INTERVIEW_LAST ? (
          <InterviewStep
            question={PHASE1_INTERVIEW[step - SETUP_INTERVIEW_FIRST]}
            stepNumber={step - SETUP_INTERVIEW_FIRST}
            total={PHASE1_INTERVIEW.length}
            selected={interviewAnswers[step - SETUP_INTERVIEW_FIRST] ?? []}
            other={interviewAnswers.other[step - SETUP_INTERVIEW_FIRST] ?? ''}
            onToggle={(value) => {
              setInterviewAnswers((prev) => {
                const idx = step - SETUP_INTERVIEW_FIRST;
                const cur = prev[idx] ?? [];
                return { ...prev, [idx]: toggleInterviewAnswer(cur, value) };
              });
            }}
            onOtherChange={(value) => {
              setInterviewAnswers((prev) => ({
                ...prev,
                other: { ...prev.other, [step - SETUP_INTERVIEW_FIRST]: value },
              }));
            }}
            onSend={goNext}
            disabled={advanceLocked}
          />
        ) : null}

        {step === SETUP_SUMMARY ? (
          <SetupSummaryStep interviewAnswers={interviewAnswers} nickname={nickname} onSave={handleSave} />
        ) : null}

        {step === SETUP_FORK ? <ForkStep onRecommend={() => navigate('/explore')} /> : null}
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
        ) : existing.dietary.length === 0 && existing.dietaryOther.trim().length === 0 ? (
          // Phase 1 neutral profile: the interview is presentation-only, so the
          // durable record explicitly means "not evaluated", never "no
          // restrictions" (Issue #224).
          <p className="tmm-profile-summary__line">{t('fpNotEvaluated')}</p>
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
  onBrowse,
}: {
  onStart: () => void;
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
            <Chip onClick={onBrowse}>{t('fpBrowseCta')}</Chip>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Session-only nickname step: the current Figma input modal plus a safe reopen state. */
function NicknameStep({
  value,
  onChange,
  onConfirm,
  onSkip,
  open,
  onOpen,
  onCancel,
}: {
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onSkip: () => void;
  open: boolean;
  onOpen: () => void;
  onCancel: () => void;
}) {
  const { t } = useI18n();
  if (open) {
    return (
      <FigmaInputModal
        inputId="fp-nickname"
        title={t('fpNicknameModalTitle')}
        label={t('fpNicknameLabel')}
        value={value}
        onChange={onChange}
        placeholder={t('fpNicknamePlaceholder')}
        suffix={t('fpNicknameModalSuffix')}
        maxLength={32}
        submitLabel={t('fpNicknameModalSubmit')}
        returnFocusSelector='[data-testid="fp-nickname-reopen"], [data-testid="fp-interview-step-0"] button'
        onSubmit={onConfirm}
        onCancel={onCancel}
      />
    );
  }

  return (
    <div className="fp-convo" data-testid="fp-nickname-step">
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__q">{t('fpNicknameTitle')}</p>
          <div className="fp-convo__choices">
            <Button variant="secondary" onClick={onOpen} data-testid="fp-nickname-reopen">
              {t('fpNicknameReopen')}
            </Button>
            <Chip onClick={onSkip}>{t('fpNicknameSkip')}</Chip>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The two current Food Profile Figma modal states share one presentation shell.
 * The component owns only transient input/focus mechanics; callers retain the
 * nickname and interview contracts and decide when a deliberate submit advances.
 */
function FigmaInputModal({
  inputId,
  title,
  label,
  value,
  onChange,
  placeholder,
  suffix,
  maxLength,
  submitLabel,
  returnFocusSelector,
  onSubmit,
  onCancel,
}: {
  inputId: string;
  title: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  suffix?: string;
  maxLength?: number;
  submitLabel: string;
  returnFocusSelector?: string;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const submitGuardRef = useRef(false);
  const submitHandlerRef = useRef(onSubmit);
  const cancelHandlerRef = useRef(onCancel);
  submitHandlerRef.current = onSubmit;
  cancelHandlerRef.current = onCancel;

  useEffect(() => {
    submitGuardRef.current = false;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();

    const focusables = () =>
      [inputRef.current, submitRef.current].filter(
        (element): element is HTMLInputElement | HTMLButtonElement =>
          element !== null && !element.disabled,
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        cancelHandlerRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const elements = focusables();
      if (elements.length === 0) return;
      const current = document.activeElement;
      const currentIndex = elements.indexOf(current as HTMLInputElement | HTMLButtonElement);
      const nextIndex = event.shiftKey
        ? currentIndex <= 0 ? elements.length - 1 : currentIndex - 1
        : currentIndex === elements.length - 1 ? 0 : currentIndex + 1;
      event.preventDefault();
      elements[nextIndex]?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (
        previousFocus?.isConnected &&
        previousFocus !== document.body &&
        previousFocus !== document.documentElement
      ) {
        previousFocus.focus();
      } else if (returnFocusSelector) {
        // The nickname launcher is intentionally replaced by the modal while
        // it is open, so the original active element may be detached before
        // cleanup. Let the next render expose the logical return target first.
        window.setTimeout(() => {
          document.querySelector<HTMLElement>(returnFocusSelector)?.focus();
        }, 0);
      }
    };
  }, [returnFocusSelector]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitGuardRef.current) return;
    submitGuardRef.current = true;
    submitHandlerRef.current();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onCancel();
  }

  return (
    <div className="fp-modal__backdrop" role="presentation" onClick={handleBackdropClick}>
      <form
        className="fp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${inputId}-title`}
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        data-testid="fp-modal"
      >
        <div className="fp-modal__body">
          <h2 id={`${inputId}-title`} className="fp-modal__title">
            {title}
          </h2>
          <div className="fp-modal__input">
            <label htmlFor={inputId} className="fp-modal__label">
              {label}
            </label>
            <input
              ref={inputRef}
              id={inputId}
              data-testid="fp-modal-input"
              className="fp-modal__field"
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder={placeholder}
              maxLength={maxLength}
            />
            {suffix ? (
              <span className="fp-modal__suffix" aria-hidden="true">
                {suffix}
              </span>
            ) : null}
          </div>
        </div>
        <button
          ref={submitRef}
          type="submit"
          className="fp-modal__submit"
          data-testid="fp-modal-submit"
        >
          {submitLabel}
        </button>
      </form>
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
 * Phase 1 presentation-only interview question (Issue #224 / Figma 2:623,
 * 3:959, 3:1203, 3:1500). Emoji quick-reply chips + a "other" free-input
 * affordance + a send button. Answers are local fixture state and never claim
 * dietary safety (#201 / #220).
 */
function InterviewStep({
  question,
  stepNumber,
  total,
  selected,
  other,
  onToggle,
  onOtherChange,
  onSend,
  disabled = false,
}: {
  question: InterviewQuestion;
  stepNumber: number;
  total: number;
  selected: string[];
  other: string;
  onToggle: (value: string) => void;
  onOtherChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}) {
  const { t } = useI18n();
  const [showOther, setShowOther] = useState(other.length > 0);
  const [otherModalOpen, setOtherModalOpen] = useState(false);
  const [otherDraft, setOtherDraft] = useState(other);

  useEffect(() => {
    setShowOther(other.length > 0);
    setOtherModalOpen(false);
    setOtherDraft(other);
  }, [stepNumber, other]);

  return (
    <div className="fp-convo" data-testid={`fp-interview-step-${stepNumber}`}>
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__q">
            {t(question.titleKey)}{' '}
            <span className="fp-convo__step">
              {fillTemplate(t('fpIvStep'), { n: String(stepNumber + 1), total: String(total) })}
            </span>
          </p>
          <div className="fp-convo__choices">
            {question.options.map((opt) => (
              <Chip
                key={opt.value}
                selected={selected.includes(opt.value)}
                onClick={() => onToggle(opt.value)}
              >
                {t(opt.labelKey)}
              </Chip>
            ))}
            {question.allowOther ? (
              <Chip
                selected={showOther}
                onClick={() => {
                  if (!showOther) {
                    setShowOther(true);
                    setOtherDraft(other);
                    setOtherModalOpen(true);
                    return;
                  }
                  setShowOther(false);
                  setOtherDraft('');
                  // Closing the "other" input must not leave a hidden stale value
                  // that would still surface in the summary.
                  onOtherChange('');
                }}
              >
                {t('fpIvOther')}
              </Chip>
            ) : null}
          </div>
          <div className="fp-convo__choices">
            <Button variant="primary" className="tmm-btn--block" onClick={onSend} disabled={disabled}>
              {t('fpIvSend')}
            </Button>
          </div>
        </div>
      </div>
      {otherModalOpen ? (
        <FigmaInputModal
          inputId={`fp-iv-other-${stepNumber}`}
          title={t('fpIvFreeTextLabel')}
          label={t('fpIvFreeTextLabel')}
          value={otherDraft}
          onChange={setOtherDraft}
          placeholder={t('fpIvFreeTextPlaceholder')}
          submitLabel={t('fpIvModalSubmit')}
          returnFocusSelector={`[data-testid="fp-interview-step-${stepNumber}"] button, [data-testid="fp-interview-step-${stepNumber + 1}"] button`}
          onSubmit={() => {
            onOtherChange(otherDraft);
            setOtherModalOpen(false);
            onSend();
          }}
          onCancel={() => {
            setOtherDraft(other);
            setOtherModalOpen(false);
            if (other.trim().length === 0) setShowOther(false);
          }}
        />
      ) : null}
    </div>
  );
}

/**
 * Phase 1 setup summary (Figma Talk11 3:1702): the registered-profile
 * confirmation with the presentation-only interview selections + the
 * recommendation-only trust copy. Saving persists the durable neutral profile
 * (interview is presentation-only) before the fork step.
 */
function SetupSummaryStep({
  interviewAnswers,
  nickname,
  onSave,
}: {
  interviewAnswers: InterviewAnswers;
  nickname: string | null;
  onSave: () => void;
}) {
  const { t } = useI18n();
  const confirm = nickname
    ? fillTemplate(t('fpSummaryConfirmName'), { name: nickname })
    : t('fpSummaryConfirm');
  const lines = interviewSummaryLines(interviewAnswers, t);
  return (
    <div className="fp-convo">
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__title">{t('fpIvSummaryTitle')}</p>
          <p className="fp-convo__body">{confirm}</p>
          <p className="fp-convo__body">{t('fpSummaryTitle')}</p>
          <div className="tmm-profile-summary">
            {lines.map((line, index) => (
              <p key={index} className="tmm-profile-summary__line">
                {line}
              </p>
            ))}
          </div>
          <p className="fp-convo__trust">{t('fpSummaryTrust')}</p>
          <p className="fp-convo__note">{t('fpEditNote')}</p>
        </div>
      </div>
      <WizardActions onNext={onSave} nextLabel={t('fpSave')} />
    </div>
  );
}

/**
 * Post-profile fork (Figma Talk12 3:1835): recommend-for-me vs browse-myself.
 * "Browse myself" has no demo branch in the live Figma (no browse frame /
 * prototype connection exists), so it stays a presentation-only note rather
 * than routing to a Phase 2 surface (#201 / #204 deferred; D4 stays a KiKi
 * question — no destination is invented).
 */
function ForkStep({ onRecommend }: { onRecommend: () => void }) {
  const { t } = useI18n();
  const [browseNote, setBrowseNote] = useState(false);
  if (browseNote) {
    return <DemoNote message={t('fpBrowseComingSoon')} onBack={() => setBrowseNote(false)} />;
  }
  return (
    <div className="fp-convo">
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__q">{t('fpForkTitle')}</p>
          <div className="fp-convo__choices fp-convo__choices--stack">
            <Button variant="primary" className="tmm-btn--block" onClick={onRecommend}>
              {t('fpForkRecommend')}
            </Button>
            <Button variant="secondary" className="tmm-btn--block" onClick={() => setBrowseNote(true)}>
              {t('fpForkBrowse')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Presentation-only "not in this demo yet" note with a back action. */
function DemoNote({ message, onBack }: { message: string; onBack: () => void }) {
  const { t } = useI18n();
  return (
    <div className="fp-convo">
      <div className="fp-convo__msg fp-convo__msg--assistant">
        <span className="fp-convo__avatar" aria-hidden="true">
          🌿
        </span>
        <div className="fp-convo__bubble">
          <p className="fp-convo__body">{message}</p>
          <div className="fp-convo__choices">
            <Button variant="secondary" className="tmm-btn--block" onClick={onBack}>
              {t('fpBrowseBack')}
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
