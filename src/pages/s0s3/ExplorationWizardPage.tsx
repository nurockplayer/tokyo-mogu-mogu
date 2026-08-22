/**
 * Repeatable trip diagnosis (Issue #78 reframe of S2; Issue #217 guided
 * prototype; Issue #226 Figma fixture options; Issue #268 lifecycle fix).
 *
 * The five per-trip questions are a standalone diagnosis session. They are not
 * a continuation of the persistent dietary Food Profile conversation: only the
 * current question renders, and returning users can start it again without
 * repeating dietary onboarding.
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
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
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
import { scrollTurnIntoView } from './conversation';
import { isGuidedTutorialActive } from './tutorial-session';
import { tutorialControlProps } from './tutorial-controls';
import { TutorialGuide } from './tutorial-ui';
import {
  applySingleSelection,
  departurePresentationState,
  type VisualAnswers,
} from './exploration-navigation';
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
  const [settling, setSettling] = useState(false);
  const [tutorialActive] = useState(isGuidedTutorialActive);
  // Presentation-only departure search text (Figma 8:2608); never a geocoder /
  // station API and never persisted as canonical data.
  const [departureSearch, setDepartureSearch] = useState('');
  const [departureOverlayOpen, setDepartureOverlayOpen] = useState(false);
  const [departurePresentationSelection, setDeparturePresentationSelection] = useState<string | null>(null);
  const departureOpenRef = useRef<HTMLButtonElement>(null);
  const departureDialogRef = useRef<HTMLDivElement>(null);
  const departureInputRef = useRef<HTMLInputElement>(null);

  // Latest committed step, used to reject stale activations (rapid/double tap)
  // so one reply can never commit twice or skip a turn.
  const stepRef = useRef(step);
  const advancingRef = useRef(false);
  const settleTimerRef = useRef<number | null>(null);
  stepRef.current = step;

  useEffect(() => () => {
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
    }
  }, []);

  // Auto-scroll target for the newly revealed diagnosis screen. The first
  // render is skipped so the initial question remains at the page top.
  const activeTurnRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  // Route transitions preserve the Food Profile page's scroll position. Start
  // diagnosis at its own top so the fixed 44px demo reset cannot cover the
  // first actionable screen.
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
    const screen = node.querySelector<HTMLElement>('.tmm-diagnosis__screen');
    if (!screen) return;
    // Each keyed screen is newly mounted. Moving focus to its named region
    // announces the replacement to keyboard and screen-reader users.
    screen.focus({ preventScroll: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scrollTurnIntoView(screen, reduce ? 'auto' : 'smooth');
  }, [step]);

  // Persist the derived canonical answers whenever the visual selection changes.
  useEffect(() => {
    saveExplorationAnswers(deriveAnswers(visual));
  }, [visual]);

  useEffect(() => {
    if (departureOverlayOpen) departureInputRef.current?.focus();
  }, [departureOverlayOpen]);

  /** Commit an answer and reveal exactly the next screen (stale taps are ignored). */
  function advance(toStep: number, next: VisualAnswers) {
    if (toStep !== stepRef.current + 1 || advancingRef.current) return;
    advancingRef.current = true;
    setVisual(next);
    setSettling(true);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    settleTimerRef.current = window.setTimeout(() => {
      stepRef.current = toStep;
      setStep(toStep);
      setSettling(false);
      advancingRef.current = false;
      settleTimerRef.current = null;
    }, reduce ? 0 : 180);
  }

  /** Single-choice quick reply: guided taps advance; repeat taps only select. */
  function chooseSingle(key: 'departure' | 'travel' | 'duration', id: string) {
    const next = applySingleSelection({ step, visual }, { key, id }, tutorialActive);
    if (tutorialActive) {
      advance(next.step, next.visual);
    } else {
      setVisual(next.visual);
    }
  }

  function chooseDeparture(id: string) {
    setDeparturePresentationSelection(null);
    chooseSingle('departure', id);
  }

  function closeDepartureOverlay() {
    setDepartureOverlayOpen(false);
    window.requestAnimationFrame(() => departureOpenRef.current?.focus());
  }

  function trapDepartureOverlayFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDepartureOverlay();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = departureDialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled)',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function useDepartureSearchPresentation() {
    const query = departureSearch.trim();
    if (!query) return;
    setDeparturePresentationSelection(query);
    // The Figma search result has no accepted provider/canonical identity yet.
    // Keep it visible for this diagnosis without mapping it onto a real answer
    // or changing recommendation behavior.
    setVisual((previous) => ({ ...previous, departure: null }));
    closeDepartureOverlay();
  }

  /** Experience tile follows the same guided versus repeat selection contract. */
  function chooseExperience(id: string) {
    const next = applySingleSelection(
      { step, visual },
      { key: 'experiences', id },
      tutorialActive,
    );
    if (tutorialActive) {
      advance(next.step, next.visual);
    } else {
      setVisual(next.visual);
    }
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

  const canAdvanceCurrentStep = (() => {
    if (step === 0) return visual.experiences.length > 0;
    if (step === 1) return visual.departure !== null || departurePresentationSelection !== null;
    if (step === 2) return visual.travel !== null;
    if (step === 3) return visual.duration !== null;
    return canConfirmTasteTheme;
  })();

  function advanceFromNext() {
    if (tutorialActive || !canAdvanceCurrentStep) return;
    if (step === WIZARD_STEP_COUNT - 1) {
      navigate('/explore/result');
      return;
    }
    advance(step + 1, visual);
  }

  function goBack() {
    if (settling) return;
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate('/');
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
      <div className="tmm-diagnosis__choices">
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
      <div className="tmm-diagnosis__choices">
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

  function renderDiagnosisScreen() {
    switch (step) {
      case 0:
        // Experience tiles (Figma 4:2101): repeat use selects before Next;
        // guided first use keeps the #257 tap-to-advance exception.
        return (
          <section
            key="experience"
            className="tmm-diagnosis__screen"
            aria-labelledby="diagnosis-question"
            tabIndex={-1}
          >
            <h1 id="diagnosis-question" className="tmm-diagnosis__question">
              {t(S2_TITLES[0])}
            </h1>
            <p className="tmm-diagnosis__hint">{t(S2_HINTS[0])}</p>
            {renderTiles(
              EXP_OPTIONS,
              visual.experiences,
              chooseExperience,
              TUTORIAL_TARGETS.experience,
            )}
          </section>
        );
      case 1:
        // Departure (Figma 8:2436 / 8:2608) — search input is presentation-only.
        return (
          <section
            key="departure"
            className="tmm-diagnosis__screen"
            aria-labelledby="diagnosis-question"
            tabIndex={-1}
          >
            <h1 id="diagnosis-question" className="tmm-diagnosis__question">
              {t(S2_TITLES[1])}
            </h1>
            <p className="tmm-diagnosis__hint">{t(S2_HINTS[1])}</p>
            {renderSingle(
              DEPARTURE_OPTIONS,
              visual.departure,
              chooseDeparture,
              TUTORIAL_TARGETS.departure,
            )}
            {tutorialActive ? (
              <input
                className="tmm-wizard__text"
                type="text"
                aria-label={t('exAreaSearchLabel')}
                placeholder={t('exAreaSearchPlaceholder')}
                disabled
              />
            ) : (
              <>
                <button
                  ref={departureOpenRef}
                  type="button"
                  className="tmm-departure-search__trigger"
                  aria-label={t('exAreaSearchLabel')}
                  onClick={() => setDepartureOverlayOpen(true)}
                >
                  <span>{departurePresentationSelection ?? t('exAreaSearchPlaceholder')}</span>
                  <span aria-hidden="true">⌕</span>
                </button>
                {departurePresentationSelection ? (
                  <p className="tmm-departure-search__selection" role="status">
                    {fillTemplate(t('exAreaSearchSelected'), { query: departurePresentationSelection })}
                  </p>
                ) : null}
              </>
            )}
            {departureOverlayOpen ? (
              <div
                className="tmm-departure-search__backdrop"
                role="presentation"
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) closeDepartureOverlay();
                }}
              >
                <div
                  ref={departureDialogRef}
                  className="tmm-departure-search__dialog"
                  role="dialog"
                  aria-modal="true"
                  aria-label={t('exAreaSearchLabel')}
                  data-state={departurePresentationState(departureSearch)}
                  onKeyDown={trapDepartureOverlayFocus}
                >
                  <div className="tmm-departure-search__header">
                    <button
                      type="button"
                      className="tmm-departure-search__close"
                      aria-label={t('exAreaSearchClose')}
                      onClick={closeDepartureOverlay}
                    >
                      ×
                    </button>
                    <h2>{t('exAreaSearchLabel')}</h2>
                  </div>
                  <label htmlFor="fp-departure-search" className="tmm-diagnosis__label">
                    {t('exAreaSearchLabel')}
                  </label>
                  <input
                    ref={departureInputRef}
                    id="fp-departure-search"
                    className="tmm-wizard__text"
                    type="text"
                    value={departureSearch}
                    onChange={(event) => setDepartureSearch(event.target.value)}
                    placeholder={t('exAreaSearchPlaceholder')}
                  />
                  {departurePresentationState(departureSearch) === 'empty' ? (
                    <p className="tmm-departure-search__empty">{t('exAreaSearchEmpty')}</p>
                  ) : (
                    <button
                      type="button"
                      className="tmm-departure-search__result"
                      onClick={useDepartureSearchPresentation}
                    >
                      {fillTemplate(t('exAreaSearchUseQuery'), { query: departureSearch.trim() })}
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </section>
        );
      case 2:
        // Travel time (Figma 23:3131).
        return (
          <section
            key="travel"
            className="tmm-diagnosis__screen"
            aria-labelledby="diagnosis-question"
            tabIndex={-1}
          >
            <h1 id="diagnosis-question" className="tmm-diagnosis__question">
              {t(S2_TITLES[2])}
            </h1>
            <p className="tmm-diagnosis__hint">{t(S2_HINTS[2])}</p>
            {renderSingle(
              TRAVEL_OPTIONS,
              visual.travel,
              (id) => chooseSingle('travel', id),
              TUTORIAL_TARGETS.travel,
            )}
          </section>
        );
      case 3:
        // Duration (Figma 23:3207).
        return (
          <section
            key="duration"
            className="tmm-diagnosis__screen"
            aria-labelledby="diagnosis-question"
            tabIndex={-1}
          >
            <h1 id="diagnosis-question" className="tmm-diagnosis__question">
              {t(S2_TITLES[3])}
            </h1>
            <p className="tmm-diagnosis__hint">{t(S2_HINTS[3])}</p>
            {renderSingle(
              DURATION_OPTIONS,
              visual.duration,
              (id) => chooseSingle('duration', id),
              TUTORIAL_TARGETS.duration,
            )}
          </section>
        );
      case 4:
        // Taste + theme (Figma 23:3262): one diagnosis screen contains the 2/2
        // multi-select sub-steps, then a local confirm moves to the Result.
        return (
          <section
            key="taste-theme"
            className="tmm-diagnosis__screen"
            aria-labelledby="diagnosis-question"
            tabIndex={-1}
          >
            <h1 id="diagnosis-question" className="tmm-diagnosis__question">
              {t(S2_TITLES[4])}
            </h1>
            <p className="tmm-diagnosis__hint">{t(S2_HINTS[4])}</p>
            <div className="tmm-diagnosis__group">
              <h2 className="tmm-diagnosis__group-title">
                {`${t('exQ5TasteLabel')} ${fillTemplate(t('exSubStep'), { n: '1', total: '2' })}`}
              </h2>
              {renderMulti(
                TASTE_OPTIONS,
                visual.tastes,
                (id) => toggleMulti('tastes', id),
                TUTORIAL_TARGETS.taste,
                !tutorialTasteSelected,
              )}
            </div>
            <div className="tmm-diagnosis__group">
              <h2 className="tmm-diagnosis__group-title">
                {`${t('exQ5ThemeLabel')} ${fillTemplate(t('exSubStep'), { n: '2', total: '2' })}`}
              </h2>
              {renderMulti(
                THEME_OPTIONS,
                visual.themes,
                (id) => toggleMulti('themes', id),
                TUTORIAL_TARGETS.theme,
                tutorialTasteSelected && !tutorialThemeSelected,
              )}
            </div>
            {tutorialActive ? <div className="tmm-diagnosis__confirm">
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
            </div> : null}
          </section>
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
            disabled={tutorialActive || settling}
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

        <div className="tmm-diagnosis" data-testid="diagnosis-session">
          <div
            ref={activeTurnRef}
            className="tmm-diagnosis__active"
            data-settling={settling ? 'true' : 'false'}
            aria-busy={settling}
          >
            {renderDiagnosisScreen()}
            {!tutorialActive ? (
              <div
                className="tmm-diagnosis__actions"
                role="group"
                aria-label={ariaProgress}
              >
                <Button
                  variant="orange"
                  className="tmm-diagnosis__next"
                  onClick={advanceFromNext}
                  disabled={!canAdvanceCurrentStep}
                >
                  {t('exNext')}
                </Button>
                {step > 0 ? (
                  <Button
                    variant="primary"
                    className="tmm-diagnosis__previous"
                    onClick={goBack}
                  >
                    {t('back')}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Exploration copy keys for the current step's question title / hint. */
const S2_TITLES = ['exQ1Title', 'exQ2Title', 'exQ3Title', 'exQ4Title', 'exQ5Title'] as const;
const S2_HINTS = ['exQ1Hint', 'exQ2Hint', 'exQ3Hint', 'exQ4Hint', 'exQ5Hint'] as const;
