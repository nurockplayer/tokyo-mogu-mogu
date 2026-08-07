import { Link, useParams } from 'react-router-dom';
import { FoodCultureImage } from '../components/FoodCultureImage';
import { CheckInPanel } from '../components/CheckInPanel';
import { getFoodCultureById, getRelatedPlaces } from '../data';
import type { DataOrigin, FoodCultureCategory } from '../data';
import { useI18n, type LocaleKey } from '../i18n';
import { useCollection } from '../store/collection';
import './FoodCulturePage.css';

/** Maps a food culture category to its i18n label key. */
const CATEGORY_LABEL_KEY: Record<FoodCultureCategory, LocaleKey> = {
  produce: 'categoryProduce',
  seafood: 'categorySeafood',
  sweets: 'categorySweets',
  'processed-food': 'categoryProcessedFood',
  craft: 'categoryCraft',
};

/** Maps a data origin to its i18n label key, keeping provenance explicit. */
const ORIGIN_LABEL_KEY: Record<DataOrigin, LocaleKey> = {
  source: 'originSource',
  editorial: 'originEditorial',
  demo: 'originDemo',
};

/**
 * Food culture detail page (Issue #4).
 *
 * Locked items show the overview, a locked notice, and the places that lead to
 * discovery. Unlocked items additionally reveal story / history / maker /
 * how-to-enjoy content and the provenance (sources) behind the entry.
 * Check-in itself lives in Issue #6 and is intentionally not implemented here.
 */
export function FoodCulturePage() {
  const { id } = useParams<{ id: string }>();
  const { locale, t } = useI18n();
  const { isCollected } = useCollection();

  const foodCulture = id ? getFoodCultureById(id) : undefined;

  if (!foodCulture) {
    return (
      <section className="page">
        <h1 className="page-title">{t('detailNotFoundTitle')}</h1>
        <p className="page-sub">{t('detailNotFoundBody')}</p>
        <Link to="/pokedex" className="btn btn-secondary">{t('navPokedex')}</Link>
      </section>
    );
  }

  const unlocked = isCollected(foodCulture.id);
  const relatedPlaces = getRelatedPlaces(foodCulture);
  const pick = (ja: string, en: string) => (locale === 'ja' ? ja : en);

  return (
    <section className="page">
      <div className={unlocked ? 'detail-hero' : 'detail-hero fcp-hero--locked'}>
        <div className="fcp-hero-media">
          <FoodCultureImage
            image={foodCulture.image}
            nameJa={foodCulture.nameJa}
            category={foodCulture.category}
            alt={pick(foodCulture.nameJa, foodCulture.nameEn)}
          />
          {unlocked && <span className="get-seal">{t('unlocked')}</span>}
        </div>
        <div className="fcp-hero-meta">
          <span className="badge">{t(CATEGORY_LABEL_KEY[foodCulture.category])}</span>
          <span className="badge">{t(ORIGIN_LABEL_KEY[foodCulture.origin])}</span>
        </div>
        <h1>{pick(foodCulture.nameJa, foodCulture.nameEn)}</h1>
        <p className="detail-sub">{pick(foodCulture.descriptionJa, foodCulture.descriptionEn)}</p>
      </div>

      {unlocked ? (
        <>
          <div className="detail-section">
            <h2>{t('detailStory')}</h2>
            <p>{pick(foodCulture.storyJa, foodCulture.storyEn)}</p>
          </div>
          <div className="detail-section">
            <h2>{t('detailHistory')}</h2>
            <p>{pick(foodCulture.historyJa, foodCulture.historyEn)}</p>
          </div>
          <div className="detail-section">
            <h2>{t('detailMaker')}</h2>
            <p>{pick(foodCulture.makerJa, foodCulture.makerEn)}</p>
          </div>
          <div className="detail-section">
            <h2>{t('detailHowToEnjoy')}</h2>
            <p>{pick(foodCulture.howToEnjoyJa, foodCulture.howToEnjoyEn)}</p>
          </div>
        </>
      ) : (
        <div className="detail-section fcp-locked-notice">
          <h2>{t('locked')}</h2>
          <p>{t('detailLockedNoticeBody')}</p>
        </div>
      )}

      <div className="detail-section">
        <h2>{t('detailRelatedPlaces')}</h2>
        {relatedPlaces.length === 0 ? (
          <p className="muted">{t('noRelatedPlaces')}</p>
        ) : (
          <div className="fcp-places">
            {relatedPlaces.map((place) => (
              <div key={place.id} className="fcp-place">
                <Link to={`/map?place=${place.id}`} className="place-row fcp-place-row">
                  <div className="fcp-place-main">
                    <span className="place-name">{pick(place.nameJa, place.nameEn)}</span>
                    <span className="place-address">{place.address}</span>
                    <span className={`badge fcp-origin fcp-origin--${place.origin}`}>
                      {t(ORIGIN_LABEL_KEY[place.origin])}
                    </span>
                  </div>
                  <span className="btn btn-secondary fcp-place-cta">{t('detailVisitOnMap')}</span>
                </Link>
                <CheckInPanel place={place} />
              </div>
            ))}
          </div>
        )}
      </div>

      {unlocked && foodCulture.sources.length > 0 && (
        <div className="detail-section">
          <div className="fcp-sources-header">
            <h2>{t('sources')}</h2>
            <span className={`badge fcp-origin fcp-origin--${foodCulture.origin}`}>
              {t(ORIGIN_LABEL_KEY[foodCulture.origin])}
            </span>
          </div>
          <ul className="source-list">
            {foodCulture.sources.map((source, index) => (
              <li key={index}>
                <span className="fcp-source-name">{source.name}</span>
                {source.url && (
                  <a href={source.url} target="_blank" rel="noreferrer">{t('sourceLink')}</a>
                )}
                {source.license && (
                  <span className="fcp-source-meta">{t('detailLicense')}: {source.license}</span>
                )}
                {source.lastVerified && (
                  <span className="fcp-source-meta">
                    {t('detailLastVerified')}: {source.lastVerified}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/pokedex" className="btn btn-secondary fcp-back">{t('back')}</Link>
    </section>
  );
}
