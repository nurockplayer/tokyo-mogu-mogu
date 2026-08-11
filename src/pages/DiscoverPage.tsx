/**
 * Discover — free exploration without diagnosis (Issue #93).
 *
 * Home = "recommend for me"; Discover = "I browse myself". Users can open
 * first-pilot food-culture content and its real visit destinations without
 * completing a Food Profile or the per-trip Exploration.
 *
 * Content honesty (product contract / #93):
 * - 東京わさび (wasabi-okutama) is the verified first-pilot story: `origin:
 *   'editorial'` written from the recorded public sources.
 * - The five Okutama places reference real facilities (address / coordinates
 *   are demo-approximate and marked as such in the seed), and Spot Detail
 *   renders only source-backed practical info or an explicit unverified state.
 * - No future/second region is presented as implemented. Browse-only use never
 *   writes MOGU Recent history (only a generated Result does).
 *
 * Back navigation preserves the Discover context: Story is reached with
 * `?backTo=/discover` (StoryPage allowlists it) and Spots with `?from=discover`
 * (route-context carries it through Route → Spot → back).
 */
import { Link } from 'react-router-dom';
import { Card, Tag } from '../ui';
import { useI18n, type LocaleKey } from '../i18n';
import { foodCultures } from '../data';
import { getFoodCultureById } from '../data';
import {
  PILOT_FEATURED_CULTURE_ID,
  pilotPlaces,
} from '../data/pilot';
import { foodCultureKey, placeNameKey } from '../i18n/data-content';
import './DiscoverPage.css';

/**
 * Display name for a non-featured culture card. Cultures with an i18n name key
 * (yamame, soba, konnyaku) resolve through the bundle; the remaining editorial
 * seed records (kumma, uguisu-mochi, yuzu) have no bundle key yet, so their
 * canonical seed `nameJa` / `nameEn` is shown directly — never the featured
 * story's name.
 */
/** Exported for unit tests. */
export function cultureName(
  fc: { id: string; nameJa: string; nameEn: string },
  locale: string,
  t: (key: LocaleKey) => string,
): string {
  const key = foodCultureKey(fc.id, 'name');
  if (key) return t(key);
  return locale === 'ja' ? fc.nameJa : fc.nameEn;
}

export function DiscoverPage() {
  const { locale, t } = useI18n();

  const featured = getFoodCultureById(PILOT_FEATURED_CULTURE_ID);

  // Additional cultures present in the seed but outside the first-pilot story
  // (yamame, soba, konnyaku, ...). They are editorial/demo records only — they
  // do not imply a second region or a production journey. Keep this list
  // deterministic and tied to what the seed actually contains.
  const otherCultures = foodCultures.filter((fc) => fc.id !== PILOT_FEATURED_CULTURE_ID);

  const pilotSpots = pilotPlaces();

  return (
    <div className="tmm-page">
      <h1 className="page-title">{t('discoverPageTitle')}</h1>
      <p className="page-sub">{t('discoverPageBody')}</p>
      <p className="discover-intro">{t('discoverIntro')}</p>

      {/* First-pilot story — the verified entry point */}
      {featured ? (
        <section className="tmm-section" aria-label={t('discoverStoriesTitle')}>
          <h2 className="discover-section-title">{t('discoverStoriesTitle')}</h2>
          <ul className="discover-list">
            <li>
              <Link
                to={`/story/${featured.id}?backTo=/discover`}
                className="discover-link"
                aria-label={t(foodCultureKey(featured.id, 'name') ?? 'dataWasabiName')}
              >
                <Card button className="discover-card">
                  <div className="discover-card__body">
                    <div className="discover-card__title">
                      {t(foodCultureKey(featured.id, 'name') ?? 'dataWasabiName')}
                    </div>
                    <p className="discover-card__desc">
                      {t(foodCultureKey(featured.id, 'description') ?? 'dataWasabiDescription')}
                    </p>
                    <div className="discover-card__meta">
                      <span className="discover-card__area">{t('areaOkutama')}</span>
                      <Tag tone="success">{t('originEditorial')}</Tag>
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
          </ul>
        </section>
      ) : null}

      {/* Visit destinations on the first-pilot route */}
      {pilotSpots.length > 0 ? (
        <section className="tmm-section" aria-label={t('discoverPlacesTitle')}>
          <h2 className="discover-section-title">{t('discoverPlacesTitle')}</h2>
          <ul className="discover-list">
            {pilotSpots.map((place) => (
              <li key={place.id}>
                <Link
                  to={`/spot/${place.id}?from=discover`}
                  className="discover-link"
                  aria-label={t(placeNameKey(place.id))}
                >
                  <Card button className="discover-card">
                    <div className="discover-card__body">
                      <div className="discover-card__title">{t(placeNameKey(place.id))}</div>
                      <p className="discover-card__addr">{place.address}</p>
                      <div className="discover-card__meta">
                        <span className="discover-card__area">{t('areaOkutama')}</span>
                        <Tag tone="info">{t('originDemo')}</Tag>
                      </div>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Editorial/demo cultures outside the first-pilot story — clearly not a
          second production region. */}
      {otherCultures.length > 0 ? (
        <section className="tmm-section" aria-label={t('discoverMoreTitle')}>
          <h2 className="discover-section-title">{t('discoverMoreTitle')}</h2>
          <ul className="discover-list">
            {otherCultures.map((fc) => (
              <li key={fc.id}>
                <Card flat className="discover-card">
                  <div className="discover-card__body">
                    <div className="discover-card__title">
                      {cultureName(fc, locale, t)}
                    </div>
                    <div className="discover-card__meta">
                      <Tag tone="warning">{t('discoverFutureTag')}</Tag>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
