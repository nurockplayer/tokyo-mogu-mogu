import type { Locale } from '../../../i18n';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  referenceAssets,
  type JourneyPresentation,
  type ReferenceCopy,
} from '../content';

const favoritesLabels: Record<Locale, { heading: string; empty: string; emptyDetail: string }> = {
  ja: { heading: '保存した食旅', empty: '保存した食旅はまだありません。', emptyDetail: 'ルート画面の「マイルートに保存」から追加できます。' },
  en: { heading: 'Saved food journeys', empty: 'No food journeys have been saved yet.', emptyDetail: 'Add one with “Save to My Routes” on a route.' },
  'zh-TW': { heading: '已儲存的美食之旅', empty: '目前還沒有儲存的美食之旅。', emptyDetail: '可在路線頁面點選「儲存至我的路線」新增。' },
};

export interface FavoritesScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  savedJourneys: JourneyPresentation[];
  onOpenJourney: (journey: JourneyPresentation) => void;
  onNavigate: (path: string) => void;
}

export function FavoritesScreen({
  active,
  copy,
  locale,
  savedJourneys,
  onOpenJourney,
  onNavigate,
}: FavoritesScreenProps) {
  const labels = favoritesLabels[locale];

  return (
    <section
      className={`reference-screen${active ? ' on' : ''}`}
      data-screen="favorites"
      data-screen-active={active}
      aria-hidden={!active}
    >
      <header className="ghead">{copy.favorites.title}</header>
      <div className="simple-body">
        {savedJourneys.length === 0 ? (
          <div className="empty">
            <img src={referenceAssets.logoFace} alt="" />
            {labels.empty}
            <br />
            {labels.emptyDetail}
          </div>
        ) : (
          <>
            <h2>{labels.heading}</h2>
            {savedJourneys.map((journey) => {
              const localized = journey.copy[locale];
              return (
                <article
                  className="trip-card"
                  data-journey-id={journey.id}
                  key={journey.id}
                  onClick={() => onOpenJourney(journey)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onOpenJourney(journey);
                    }
                  }}
                  role="button"
                  tabIndex={active ? 0 : -1}
                >
                  <div className="ph">
                    <img src={referenceAssets[journey.imageAssetId]} alt="" />
                  </div>
                  <div className="tx">
                    <b>{localized.title}</b>
                    <p>{localized.subtitle}</p>
                  </div>
                </article>
              );
            })}
          </>
        )}
      </div>
      <BottomNavigation active="favorites" copy={copy.nav} onNavigate={onNavigate} />
    </section>
  );
}
