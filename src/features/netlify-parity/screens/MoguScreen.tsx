import type { Locale } from '../../../i18n';
import { BottomNavigation } from '../components/BottomNavigation';
import type { JourneyPresentation, ReferenceCopy } from '../content';
import { JourneyResultCard } from './JourneyResultCard';
import { factRetrievalNote, journeyRecord, publishedJourneys } from '../journey-publication';

const browseHeading: Record<Locale, { prefix: string; accent: string; suffix: string }> = {
  ja: { prefix: '', accent: '気になる食旅', suffix: 'をのぞいてみよう' },
  en: { prefix: 'Explore interesting ', accent: 'food journeys', suffix: '' },
  'zh-TW': { prefix: '來看看', accent: '感興趣的美食之旅', suffix: '吧！' },
};

const empty: Record<Locale, string> = {
  ja: '現在公開中の食旅はありません。', en: 'No food journeys are available right now.', 'zh-TW': '目前沒有已公開的美食之旅。',
};

export interface MoguScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  onOpenJourney: (journey: JourneyPresentation) => void;
  onNavigate: (path: string) => void;
}

export function MoguScreen({
  active,
  copy,
  locale,
  onOpenJourney,
  onNavigate,
}: MoguScreenProps) {
  const heading = browseHeading[locale];
  const journeys = active ? publishedJourneys() : [];

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
        {!journeys.length && <div className="empty">{empty[locale]}</div>}
        {journeys.map((journey) => {
          const record = journeyRecord(journey.id)!;
          return <JourneyResultCard
            active={active}
            copy={copy}
            journey={journey}
            key={journey.id}
            locale={locale}
            onOpen={onOpenJourney}
            sourceNote={factRetrievalNote(record, locale, `journey.copy.${locale}`, `location.${locale}`)}
          />;
        })}
      </div>
      <BottomNavigation active="mogu" copy={copy.nav} onNavigate={onNavigate} />
    </section>
  );
}
