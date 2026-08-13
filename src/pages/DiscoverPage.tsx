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
 * - The pilot places are the frozen journey's real Okutama facilities (Issue
 *   #127: 奥多摩観光案内所 / 千島わさび園 / 一心亭 / 獅子口屋 / 大丹波川国際虹ます釣場),
 *   `origin: 'source'` with `needs_confirmation` — addresses are source-backed,
 *   coordinates are approximate (marked in the seed). Spot Detail renders only
 *   source-backed practical info or an explicit unverified state.
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
import {
  foodCultures,
  places,
  getFoodCultureById,
  getRouteById,
  PILOT_JOURNEY,
  pilotDiscoverPlaceIds,
} from '../data';
import { foodCultureKey, placeNameKey } from '../i18n/data-content';
import { deriveVerificationStatus } from '../lib/verification';
import type { VerificationStatus } from '../data';
import './DiscoverPage.css';

/** Verification status → i18n label key (kept honest on place cards). */
const VERIFICATION_LABEL_KEY: Record<VerificationStatus, LocaleKey> = {
  verified: 'verificationVerified',
  needs_confirmation: 'verificationNeedsConfirmation',
  stale: 'verificationStale',
  conflict: 'verificationConflict',
  demo: 'verificationDemo',
};

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

  const featured = getFoodCultureById(PILOT_JOURNEY.foodCultureId);

  // Additional cultures present in the seed but outside the first-pilot story
  // (yamame, soba, konnyaku, ...). They are editorial/demo records only — they
  // do not imply a second region or a production journey. Keep this list
  // deterministic and tied to what the seed actually contains.
  const otherCultures = foodCultures.filter((fc) => fc.id !== PILOT_JOURNEY.foodCultureId);

  // The pilot places are the union of the frozen route's stops (Issue #127) —
  // Discover and Route read the same canonical journey, so the lists cannot
  // diverge. No second hard-coded place array.
  const pilotRoute = getRouteById(PILOT_JOURNEY.routeId);
  const pilotPlaceIds = pilotRoute ? pilotDiscoverPlaceIds(pilotRoute) : [];
  const pilotPlaces = pilotPlaceIds
    .map((id) => places.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

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
      {pilotPlaces.length > 0 ? (
        <section className="tmm-section" aria-label={t('discoverPlacesTitle')}>
          <h2 className="discover-section-title">{t('discoverPlacesTitle')}</h2>
          <ul className="discover-list">
            {pilotPlaces.map((place) => {
              const placeKey = placeNameKey(place.id);
              const placeName = placeKey
                ? t(placeKey)
                : locale === 'ja' ? place.nameJa : place.nameEn;
              return (
                <li key={place.id}>
                  <Link
                    to={`/spot/${place.id}?from=discover`}
                    className="discover-link"
                    aria-label={placeName}
                  >
                    <Card button className="discover-card">
                      <div className="discover-card__body">
                        <div className="discover-card__title">{placeName}</div>
                        <p className="discover-card__addr">{place.address}</p>
                        <div className="discover-card__meta">
                          <span className="discover-card__area">{t('areaOkutama')}</span>
                          <Tag tone="info">
                            {t(VERIFICATION_LABEL_KEY[deriveVerificationStatus(place.source, place.origin)])}
                          </Tag>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </li>
              );
            })}
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
