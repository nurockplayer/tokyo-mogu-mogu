import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import type { Locale } from '../../../i18n';
import { referenceAssets, type ReferenceCopy } from '../content';
import {
  canAdvanceExploration,
  type ExplorationDeparture,
  type ExplorationDuration,
  type ExplorationExperience,
  type ExplorationMovement,
  type ExplorationTaste,
  type ExplorationTheme,
  type NetlifyExplorationAnswers,
  type NetlifyExplorationEvent,
  type NetlifyExplorationState,
} from './explorationMachine';

interface ExplorationFlowProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  state: NetlifyExplorationState;
  dispatch: (event: NetlifyExplorationEvent) => void;
  onBackFromFirst: () => void;
  onComplete: (answers: NetlifyExplorationAnswers) => void;
}

const experienceCards: Array<{
  id: ExplorationExperience;
  copyKey: keyof ReferenceCopy['exploration']['experienceCards'];
  image: keyof Pick<
    typeof referenceAssets,
    | 'eatIllustration'
    | 'makeIllustration'
    | 'buyIllustration'
    | 'makerIllustration'
    | 'originIllustration'
    | 'learnIllustration'
  >;
}> = [
  { id: 'eat', copyKey: 'eat', image: 'eatIllustration' },
  { id: 'make', copyKey: 'make', image: 'makeIllustration' },
  { id: 'buy', copyKey: 'buy', image: 'buyIllustration' },
  { id: 'meet', copyKey: 'meetMaker', image: 'makerIllustration' },
  { id: 'visit', copyKey: 'visitOrigin', image: 'originIllustration' },
  { id: 'learn', copyKey: 'learn', image: 'learnIllustration' },
];

const movementIds: ExplorationMovement[] = [
  'within-30',
  'within-60',
  'within-90',
  'within-120',
  'any',
];
const durationIds: ExplorationDuration[] = ['half-day', 'full-day', 'undecided'];
const tasteIds: ExplorationTaste[] = [
  'rich',
  'gentle',
  'sweet',
  'fragrant',
  'spicy',
  'fermented',
  'refreshing',
  'ingredient',
  'surprise-me',
];
const themeIds: ExplorationTheme[] = [
  'tradition',
  'food-history',
  'daily-life',
  'craft',
  'nature',
  'seasonal',
  'agriculture',
  'local-people',
  'no-preference',
];
const departureIds: ExplorationDeparture[] = [
  'tokyo-station',
  'shinjuku',
  'shibuya',
  'tachikawa',
  'ome',
  'okutama',
];

const guide = {
  experience: 'eat' as ExplorationExperience,
  movement: 'any' as ExplorationMovement,
  duration: 'half-day' as ExplorationDuration,
  tastes: ['spicy', 'rich'] as ExplorationTaste[],
  themes: ['tradition', 'nature'] as ExplorationTheme[],
};

function PinIcon({ muted = false }: { muted?: boolean }) {
  return (
    <svg className="ic" viewBox="0 0 24 24" style={{ color: muted ? '#9AA0A6' : '#F05B5B' }} aria-hidden="true">
      <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="ic" viewBox="0 0 24 24" style={{ color: '#BDB9A8' }} aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" d="M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm5 11.5L20 20" />
    </svg>
  );
}

function QuestionHeading({ locale, step, copy }: { locale: Locale; step: number; copy: ReferenceCopy }) {
  if (locale !== 'ja') return <div className="wiz-q"><em>{[copy.exploration.experience, copy.exploration.departure, copy.exploration.travelTime, copy.exploration.duration, copy.exploration.tasteTheme][step]}</em></div>;
  if (step === 0) return <div className="wiz-q">今回は、<em>どんな食体験</em>を<br />してみたいですか？</div>;
  if (step === 1) return <div className="wiz-q"><em>どこから出発</em>しますか？</div>;
  if (step === 2) return <div className="wiz-q"><em>片道</em>どのくらいまでなら<br />移動できそうですか？</div>;
  if (step === 3) return <div className="wiz-q">どのくらいの<em>時間で<br />楽しみたい</em>ですか？</div>;
  return <div className="wiz-q">今日は、<em>どんな味とモチーフ</em>を<br />楽しみたいですか？</div>;
}

function shortDepartureLabel(value: string) {
  return value.split(/[（(]/)[0]?.trim() ?? value;
}

function cappedGuideGlow<T>(selected: readonly T[], recommendations: readonly T[], value: T) {
  return (
    recommendations.includes(value) &&
    !selected.includes(value) &&
    selected.length < 2 &&
    selected.every((current) => recommendations.includes(current))
  );
}

export function ExplorationFlow({
  active,
  copy,
  locale,
  state,
  dispatch,
  onBackFromFirst,
  onComplete,
}: ExplorationFlowProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const departureButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dialogId = useId();
  const dialogTitleId = `${dialogId}-title`;
  const valid = canAdvanceExploration(state);
  const departures = useMemo(
    () => departureIds.map((id, index) => ({ id, label: copy.exploration.departureSuggestions[index] ?? id })),
    [copy],
  );
  const normalizedSearch = search.trim().toLocaleLowerCase(locale);
  const filteredDepartures = departures.filter(({ label }) =>
    normalizedSearch && label.toLocaleLowerCase(locale).includes(normalizedSearch),
  );
  const defaultDeparture = locale === 'ja' ? '東京都' : locale === 'zh-TW' ? '東京都' : 'Tokyo';
  const selectedDeparture = state.answers.departure === 'tokyo'
    ? defaultDeparture
    : shortDepartureLabel(departures.find(({ id }) => id === state.answers.departure)?.label ?? defaultDeparture);

  useEffect(() => {
    if (!modalOpen) return undefined;

    const frame = window.requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [modalOpen]);

  const closeDepartureDialog = () => {
    setModalOpen(false);
    setSearch('');
    window.requestAnimationFrame(() => departureButtonRef.current?.focus());
  };

  const handleDepartureDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeDepartureDialog();
      return;
    }

    if (event.key !== 'Tab') return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = focusable.at(0);
    const last = focusable.at(-1);
    if (!first || !last) {
      event.preventDefault();
      return;
    }

    const activeElement = document.activeElement;
    if (event.shiftKey && (activeElement === first || !dialog.contains(activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (activeElement === last || !dialog.contains(activeElement))) {
      event.preventDefault();
      first.focus();
    }
  };

  const goNext = () => {
    if (!valid) return;
    if (state.step === 4) onComplete(state.answers);
    dispatch({ type: 'NEXT' });
  };

  const renderStep = () => {
    if (state.step === 0) {
      return (
        <>
          <QuestionHeading locale={locale} step={state.step} copy={copy} />
          <div className="exp-grid">
            {experienceCards.map((card) => {
              const text = copy.exploration.experienceCards[card.copyKey];
              const selected = state.answers.experience === card.id;
              return (
                <button
                  className={`exp-card${selected ? ' sel' : ''}${!state.answers.experience && card.id === guide.experience ? ' glow' : ''}`}
                  key={card.id}
                  onClick={() => dispatch({ type: 'SELECT_EXPERIENCE', value: card.id })}
                  type="button"
                  aria-pressed={selected}
                >
                  <b>{text.label}</b>
                  <p>{text.subtitle}</p>
                  <div className="pic">
                    <span className="band" />
                    <img src={referenceAssets[card.image]} alt="" />
                  </div>
                </button>
              );
            })}
          </div>
        </>
      );
    }
    if (state.step === 1) {
      return (
        <>
          <QuestionHeading locale={locale} step={state.step} copy={copy} />
          <button
            className="searchbar"
            ref={departureButtonRef}
            onClick={() => setModalOpen(true)}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={modalOpen}
            aria-controls={dialogId}
          >
            <PinIcon />
            <span className="val">{selectedDeparture}</span>
            <span className="sub">{locale === 'ja' ? '周辺' : locale === 'zh-TW' ? '周邊' : 'area'}</span>
            <SearchIcon />
          </button>
        </>
      );
    }
    if (state.step === 2) {
      return (
        <>
          <QuestionHeading locale={locale} step={state.step} copy={copy} />
          {movementIds.map((id, index) => {
            const selected = state.answers.movement === id;
            return (
              <button
                className={`opt${selected ? ' sel' : ''}${!state.answers.movement && id === guide.movement ? ' glow' : ''}`}
                key={id}
                onClick={() => dispatch({ type: 'SELECT_MOVEMENT', value: id })}
                type="button"
                aria-pressed={selected}
              >
                {copy.exploration.movementOptions[index]}
              </button>
            );
          })}
        </>
      );
    }
    if (state.step === 3) {
      return (
        <>
          <QuestionHeading locale={locale} step={state.step} copy={copy} />
          {durationIds.map((id, index) => {
            const selected = state.answers.duration === id;
            return (
              <button
                className={`opt${selected ? ' sel' : ''}${!state.answers.duration && id === guide.duration ? ' glow' : ''}`}
                key={id}
                onClick={() => dispatch({ type: 'SELECT_DURATION', value: id })}
                type="button"
                aria-pressed={selected}
              >
                {copy.exploration.durationOptions[index]}
              </button>
            );
          })}
        </>
      );
    }
    return (
      <>
        <QuestionHeading locale={locale} step={state.step} copy={copy} />
        <div className="chip-group">
          <h3>
            {copy.exploration.tasteHeading} <span>{copy.exploration.multiSelect}</span>
            <span className="count">{copy.exploration.selectionCount.replace('{count}', String(state.answers.tastes.length))}</span>
          </h3>
          <div className="chips">
            {tasteIds.map((id, index) => {
              const selected = state.answers.tastes.includes(id);
              return (
                <button
                  className={`chip${selected ? ' sel' : ''}${cappedGuideGlow(state.answers.tastes, guide.tastes, id) ? ' glow' : ''}`}
                  key={id}
                  onClick={() => dispatch({ type: 'TOGGLE_TASTE', value: id })}
                  type="button"
                  aria-pressed={selected}
                >
                  {copy.exploration.tasteOptions[index]}
                </button>
              );
            })}
          </div>
        </div>
        <div className="chip-group">
          <h3>
            {copy.exploration.themeHeading} <span>{copy.exploration.multiSelect}</span>
            <span className="count">{copy.exploration.selectionCount.replace('{count}', String(state.answers.themes.length))}</span>
          </h3>
          <div className="chips">
            {themeIds.map((id, index) => {
              const selected = state.answers.themes.includes(id);
              return (
                <button
                  className={`chip${selected ? ' sel' : ''}${cappedGuideGlow(state.answers.themes, guide.themes, id) ? ' glow' : ''}`}
                  key={id}
                  onClick={() => dispatch({ type: 'TOGGLE_THEME', value: id })}
                  type="button"
                  aria-pressed={selected}
                >
                  {copy.exploration.themeOptions[index]}
                </button>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}${modalOpen ? ' departure-modal-open' : ''}`}
      data-screen="explore"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <div className="ghead">
        <button
          className="back"
          onClick={() => state.step === 0 ? onBackFromFirst() : dispatch({ type: 'BACK' })}
          type="button"
          aria-label={copy.actions.back}
        >
          ‹
        </button>
        {copy.exploration.title}
      </div>
      <div className="wiz-body">
        <div data-exploration-step={state.step}>
          {renderStep()}
          <div className="wiz-nav">
            <button
              className={`next${valid ? ' glow' : ''}`}
              id="wiz-next"
              onClick={goNext}
              type="button"
              disabled={!valid}
              aria-label={copy.actions.next.replace(/[\s\u3000]*⟶$/, '')}
            >
              {copy.actions.next}
            </button>
            {state.step > 0 ? (
              <button className="prev" onClick={() => dispatch({ type: 'BACK' })} type="button">
                {copy.actions.previous}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="progress" aria-label={`${state.step + 1} / 5`}>
        <div className="rail">
          {[0, 1, 2, 3, 4].map((index) => (
            <i className={`dot${index === state.step ? ' hide' : ''}`} key={index} />
          ))}
          <img
            className="fork"
            src={referenceAssets.forkIllustration}
            alt=""
            style={{ left: `${state.step * 25}%` }}
          />
        </div>
        <div className="plate" />
      </div>

      <div className="reference-modal" data-open={modalOpen} aria-hidden={!modalOpen}>
        <div
          className="sheet"
          id={dialogId}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          onKeyDown={handleDepartureDialogKeyDown}
        >
          <h3 id={dialogTitleId}>{copy.exploration.chooseArea}</h3>
          <button className="x" onClick={closeDepartureDialog} type="button" aria-label={copy.actions.back}>✕</button>
          <div className="field">
            <PinIcon />
            <input
              ref={searchInputRef}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.exploration.departureSearchPlaceholder}
            />
          </div>
          <ul className="sug">
            {normalizedSearch ? (
              filteredDepartures.length > 0 ? filteredDepartures.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => {
                      dispatch({ type: 'SELECT_DEPARTURE', value: id });
                      closeDepartureDialog();
                    }}
                    type="button"
                  >
                    <span className="gpin"><PinIcon muted /></span>
                    <span>{label}</span>
                  </button>
                </li>
              )) : <li>{copy.exploration.noDepartureResults}</li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  );
}
