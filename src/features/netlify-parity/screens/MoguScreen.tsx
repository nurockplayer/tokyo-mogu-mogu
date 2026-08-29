import type { Locale } from '../../../i18n';
import { BottomNavigation } from '../components/BottomNavigation';
import { currentJourneys, type JourneyPresentation, type ReferenceCopy } from '../content';
import { JourneyResultCard } from './JourneyResultCard';

const browseHeading: Record<Locale, { prefix: string; accent: string; suffix: string }> = {
  ja: { prefix: '', accent: '気になる食旅', suffix: 'をのぞいてみよう' },
  en: { prefix: 'Explore interesting ', accent: 'food journeys', suffix: '' },
  'zh-TW': { prefix: '來看看', accent: '感興趣的美食之旅', suffix: '吧！' },
};

export interface MoguScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  journeys?: JourneyPresentation[];
  onOpenJourney: (journey: JourneyPresentation) => void;
  onNavigate: (path: string) => void;
}

export function MoguScreen({
  active,
  copy,
  locale,
  journeys = currentJourneys,
  onOpenJourney,
  onNavigate,
}: MoguScreenProps) {
  const heading = browseHeading[locale];

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="mogu"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <header className="ghead">{copy.mogu.title}</header>
      <div className="scroll">
        <h1 className="res-head">
          {heading.prefix}
          <em>{heading.accent}</em>
          {heading.suffix}
        </h1>
        {journeys.map((journey) => (
          <JourneyResultCard
            active={active}
            copy={copy}
            journey={journey}
            key={journey.id}
            locale={locale}
            onOpen={onOpenJourney}
            showMatch={false}
          />
        ))}
      </div>
      <BottomNavigation active="mogu" copy={copy.nav} onNavigate={onNavigate} />
    </section>
  );
}
