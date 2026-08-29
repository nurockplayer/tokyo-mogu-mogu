import type { Locale } from '../../../i18n';
import { BottomNavigation } from '../components/BottomNavigation';
import { PresentationMedia } from '../components/PresentationMedia';
import {
  referenceAssets,
  type JourneyPresentation,
  type ReferenceCopy,
  type SpotPresentation,
} from '../content';

const favoritesLabels: Record<Locale, { journeyHeading: string; spotHeading: string; empty: string; emptyDetail: string }> = {
  ja: { journeyHeading: '保存した食旅・ルート', spotHeading: '保存したスポット', empty: 'お気に入りはまだありません。', emptyDetail: '食旅カードやスポットのしおりから追加できます。' },
  en: { journeyHeading: 'Saved journeys and routes', spotHeading: 'Saved spots', empty: 'No favorites yet.', emptyDetail: 'Use the bookmark on a journey card or spot to add one.' },
  'zh-TW': { journeyHeading: '已儲存的美食之旅與路線', spotHeading: '已儲存的景點', empty: '目前還沒有收藏。', emptyDetail: '可使用美食之旅卡片或景點上的書籤新增。' },
};

export interface FavoritesScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  savedJourneys: JourneyPresentation[];
  savedSpots: SpotPresentation[];
  onOpenJourney: (journey: JourneyPresentation) => void;
  onOpenSpot: (spot: SpotPresentation) => void;
  onNavigate: (path: string) => void;
}

export function FavoritesScreen({
  active,
  copy,
  locale,
  savedJourneys,
  savedSpots,
  onOpenJourney,
  onOpenSpot,
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
        {savedJourneys.length === 0 && savedSpots.length === 0 ? (
          <div className="empty">
            <img src={referenceAssets.logoFace} alt="" />
            {labels.empty}
            <br />
            {labels.emptyDetail}
          </div>
        ) : (
          <>
            {savedJourneys.length > 0 ? (
              <section className="favorite-group">
                <h2>{labels.journeyHeading}</h2>
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
                        <PresentationMedia assetId={journey.imageAssetId} locale={locale} />
                      </div>
                      <div className="tx">
                        <b>{localized.title}</b>
                        <p>{localized.subtitle}</p>
                      </div>
                    </article>
                  );
                })}
              </section>
            ) : null}
            {savedSpots.length > 0 ? (
              <section className="favorite-group">
                <h2>{labels.spotHeading}</h2>
                {savedSpots.map((spot) => {
                  const localized = spot.copy[locale];
                  return (
                    <article
                      className="my-route"
                      data-spot-id={spot.id}
                      key={spot.id}
                      onClick={() => onOpenSpot(spot)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          onOpenSpot(spot);
                        }
                      }}
                      role="button"
                      tabIndex={active ? 0 : -1}
                    >
                      <PresentationMedia assetId={spot.imageAssetId} locale={locale} />
                      <div className="tx">
                        <b>{localized.name}</b>
                        <p>{localized.lead}</p>
                      </div>
                      <span className="arw" aria-hidden="true">›</span>
                    </article>
                  );
                })}
              </section>
            ) : null}
          </>
        )}
      </div>
      <BottomNavigation active="favorites" copy={copy.nav} onNavigate={onNavigate} />
    </section>
  );
}
