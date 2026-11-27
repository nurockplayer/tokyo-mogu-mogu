import type { Locale } from '../../../i18n';
import { BottomNavigation } from '../components/BottomNavigation';
import { PresentationMedia } from '../components/PresentationMedia';
import {
  referenceAssets,
  type JourneyPresentation,
  type ReferenceCopy,
  type SpotPresentation,
} from '../content';

const favoritesLabels = {
  ja: { journeyHeading: '保存した食旅・ルート', spotHeading: '保存したスポット', empty: 'お気に入りはまだありません。',
    emptyDetail: 'ルートやスポットから追加できます。', unavailable: '現在ご覧いただけません', removeJourney: '食旅の保存を解除', removeSpot: 'スポットの保存を解除' },
  en: { journeyHeading: 'Saved journeys and routes', spotHeading: 'Saved spots', empty: 'No favorites yet.',
    emptyDetail: 'Save a route or spot to find it here.', unavailable: 'Currently unavailable', removeJourney: 'Remove saved journey', removeSpot: 'Remove saved spot' },
  'zh-TW': { journeyHeading: '已儲存的美食之旅與路線', spotHeading: '已儲存的景點', empty: '目前還沒有收藏。',
    emptyDetail: '可從路線或景點頁面加入收藏。', unavailable: '目前無法瀏覽', removeJourney: '移除已儲存的美食之旅', removeSpot: '移除已儲存的景點' },
};

interface SavedItem<T> {
  id: string;
  content?: T;
}

export interface FavoritesScreenProps {
  active: boolean;
  copy: ReferenceCopy;
  locale: Locale;
  savedJourneys: SavedItem<JourneyPresentation>[];
  savedSpots: SavedItem<SpotPresentation>[];
  onOpenJourney: (journey: JourneyPresentation) => void;
  onOpenSpot: (id: string) => void;
  onRemoveJourney: (id: string) => void;
  onRemoveSpot: (id: string) => void;
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
  onRemoveJourney,
  onRemoveSpot,
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
                {savedJourneys.map(({ id, content: journey }) => (
                  <article className="trip-card" data-journey-id={id} key={id}>
                    {journey ? (
                      <button className="trip-card-open" type="button" onClick={() => onOpenJourney(journey)}>
                        <div className="ph">
                          <PresentationMedia assetId={journey.imageAssetId} locale={locale} />
                        </div>
                        <div className="tx">
                          <b>{journey.copy[locale].title}</b>
                          <p>{journey.copy[locale].subtitle}</p>
                        </div>
                      </button>
                    ) : <p className="tx">{labels.unavailable}</p>}
                    <button className="favorite-remove" type="button" onClick={() => onRemoveJourney(id)}>
                      {labels.removeJourney}
                    </button>
                  </article>
                ))}
              </section>
            ) : null}
            {savedSpots.length > 0 ? (
              <section className="favorite-group">
                <h2>{labels.spotHeading}</h2>
                {savedSpots.map(({ id, content: spot }) => (
                  <article data-spot-id={id} key={id}>
                    {spot ? (
                      <button className="my-route" type="button" onClick={() => onOpenSpot(id)}>
                        <PresentationMedia assetId={spot.imageAssetId} locale={locale} />
                        <div className="tx">
                          <b>{spot.copy[locale].name}</b>
                          <p>{spot.copy[locale].lead}</p>
                        </div>
                        <span className="arw" aria-hidden="true">›</span>
                      </button>
                    ) : <p className="my-route">{labels.unavailable}</p>}
                    <button className="favorite-remove" type="button" onClick={() => onRemoveSpot(id)}>
                      {labels.removeSpot}
                    </button>
                  </article>
                ))}
              </section>
            ) : null}
          </>
        )}
      </div>
      <BottomNavigation active="favorites" copy={copy.nav} onNavigate={onNavigate} />
    </section>
  );
}
