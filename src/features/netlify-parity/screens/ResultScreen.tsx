import type { Locale } from '../../../i18n';
import {
  demoJourneys,
  referenceAssets,
  type JourneyPresentation,
  type ReferenceCopy,
} from '../content';
import { JourneyResultCard } from './JourneyResultCard';

const resultHeading: Record<Locale, { prefix: string; accent: string; suffix: string }> = {
  ja: { prefix: '', accent: 'あなたに合う食の旅', suffix: 'を見つけました！' },
  en: { prefix: 'We found ', accent: 'a food journey for you', suffix: '!' },
  'zh-TW': { prefix: '我們找到', accent: '適合你的美食之旅', suffix: '了！' },
};

export interface ResultScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  journeys?: JourneyPresentation[];
  onBack: () => void;
  onRepeatSearch: () => void;
  onOpenJourney: (journey: JourneyPresentation) => void;
}

export function ResultScreen({
  active,
  copy,
  locale,
  journeys = demoJourneys,
  onBack,
  onRepeatSearch,
  onOpenJourney,
}: ResultScreenProps) {
  const heading = resultHeading[locale];

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="result"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <header className="ghead">
        <button className="back" onClick={onBack} type="button" aria-label={copy.actions.back}>
          ‹
        </button>
        {copy.exploration.title}
      </header>
      <div className="scroll">
        <h1 className="res-head">
          {heading.prefix}
          <em>{heading.accent}</em>
          {heading.suffix}
        </h1>
        <div className="res-sub">
          <b>{copy.result.intro}</b>
          <button onClick={onRepeatSearch} type="button">
            {copy.actions.repeatSearch}
          </button>
        </div>
        <div>
          {journeys.map((journey) => (
            <JourneyResultCard
              active={active}
              copy={copy}
              journey={journey}
              key={journey.id}
              locale={locale}
              onOpen={onOpenJourney}
            />
          ))}
        </div>
      </div>
      <div className="progress result-progress" aria-label="5 / 5">
        <div className="rail">
          {[0, 1, 2, 3, 4].map((index) => <i className="dot" key={index} />)}
        </div>
        <div className="plateware">
          <div className="plate" />
          <img
            className="fork"
            src={referenceAssets.forkIllustration}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
