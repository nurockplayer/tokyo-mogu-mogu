/**
 * Discover — free exploration without diagnosis (Issue #93).
 *
 * Home = "recommend for me"; Discover = "I browse myself". Users can open
 * playable food-culture content and its real visit destinations without
 * completing a Food Profile or the per-trip Exploration.
 *
 * Content honesty (product contract / #93 / #163):
 * - 東京わさび (wasabi-okutama) is the verified first-pilot story: `origin:
 *   'editorial'` written from the recorded public sources.
 * - 青梅・沢井の日本酒 (sake-ome, Issue #163) is the source-backed second slice:
 *   `origin: 'editorial'` written from the recorded official/Open Data sources.
 * - Playable journeys are DERIVED from the ready recommendation candidates
 *   (the same config Result reads), so Discover and Result can never diverge on
 *   what is playable. A culture/place whose record is missing is skipped
 *   gracefully (honest partial state, never a dead link).
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
import { FoodCultureImage } from '../components/FoodCultureImage';
import { useI18n, type LocaleKey } from '../i18n';
import {
  foodCultures,
  places,
  getFoodCultureById,
  getRouteById,
  DEMO_RECOMMENDATION_CANDIDATES,
  discoverableCandidates,
  hiddenManagedFoodCultureIds,
  pilotDiscoverPlaceIds,
} from '../data';
import { foodCultureKey, placeNameKey } from '../i18n/data-content';
import { deriveVerificationStatus } from '../lib/verification';
import type { FoodCulture, ModelRoute, VerificationStatus, TamaArea } from '../data';
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
 * Area label key per seed area. Only areas with a three-locale bundle key are
 * mapped; an unmapped area falls back to the culture's canonical name.
 */
const AREA_LABEL_KEY: Partial<Record<TamaArea, LocaleKey>> = {
  okutama: 'areaOkutama',
  ome: 'areaOme',
};

/**
 * Localized area label for a playable culture's card. An unmapped area falls
 * back to the culture's canonical name so a future verified Region × FoodCulture
 * never inherits another region's label.
 */
function areaLabel(
  fc: { area: TamaArea; nameJa: string; nameEn: string },
  locale: string,
  t: (key: LocaleKey) => string,
): string {
  const key = AREA_LABEL_KEY[fc.area];
  return key ? t(key) : locale === 'ja' ? fc.nameJa : fc.nameEn;
}

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

/**
 * The editorial "other cultures" section: seed cultures that are neither on a
 * playable journey nor a release-managed slice currently hidden from Discover
 * (disabled / non-discoverable). A hidden managed slice must not resurface here
 * as a future card (#171); ordinary editorial cultures stay.
 */
/** Exported for unit tests. */
export function discoverOtherCultures(
  allCultures: readonly FoodCulture[],
  playableCultureIds: ReadonlySet<string>,
  hiddenManagedIds: ReadonlySet<string>,
): FoodCulture[] {
  return allCultures.filter(
    (fc) => !playableCultureIds.has(fc.id) && !hiddenManagedIds.has(fc.id),
  );
}

export function DiscoverPage() {
  const { locale, t } = useI18n();

  // Playable journeys are derived from the ready recommendation candidates —
  // the same config Result reads, gated by the #171 release boundary
  // (discoverable) so a disabled slice drops out of the production Discover
  // playable journeys without touching its canonical data. A journey whose
  // culture or route record is missing is skipped gracefully (honest partial
  // state, never a dead link).
  const playableJourneys = discoverableCandidates(DEMO_RECOMMENDATION_CANDIDATES).filter(
    (c) => c.availability === 'ready' && c.journeyId,
  )
    .map((c) => {
      const culture = getFoodCultureById(c.foodCultureId);
      const route = c.journeyId ? getRouteById(c.journeyId) : undefined;
      return culture && route ? { culture, route } : undefined;
    })
    .filter((j): j is { culture: FoodCulture; route: ModelRoute } => j !== undefined);

  // Additional cultures present in the seed but outside the playable journeys
  // (yamame, soba, konnyaku, ...). They are editorial/demo records only — they
  // do not imply another region or a production journey. Release-managed slices
  // that are hidden from Discover (disabled, #171) are excluded here too, so a
  // disabled slice never resurfaces as a future card. Keep this list
  // deterministic and tied to what the seed actually contains.
  const playableCultureIds = new Set(playableJourneys.map((j) => j.culture.id));
  const otherCultures = discoverOtherCultures(
    foodCultures,
    playableCultureIds,
    hiddenManagedFoodCultureIds(DEMO_RECOMMENDATION_CANDIDATES),
  );

  // The playable places are the union of every ready journey's route stops —
  // Discover and Route read the same canonical journeys, so the lists cannot
  // diverge. No second hard-coded place array. Each entry carries the area of
  // the journey it belongs to (a place shared by two journeys dedups, keeping
  // the first journey's area).
  const seenPlaceIds = new Set<string>();
  const playablePlaces = playableJourneys.flatMap((j) => {
    const area = areaLabel(j.culture, locale, t);
    return pilotDiscoverPlaceIds(j.route)
      .map((id) => places.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .filter((p) => {
        if (seenPlaceIds.has(p.id)) return false;
        seenPlaceIds.add(p.id);
        return true;
      })
      .map((place) => ({ place, area }));
  });

  return (
    <div className="tmm-page discover-page">
      <h1 className="page-title">{t('discoverPageTitle')}</h1>
      <p className="page-sub">{t('discoverPageBody')}</p>
      <p className="discover-intro">{t('discoverIntro')}</p>

      {/* Playable stories — the verified entry points (first = demo golden path) */}
      {playableJourneys.length > 0 ? (
        <section className="tmm-section" aria-label={t('discoverStoriesTitle')}>
          <h2 className="discover-section-title">{t('discoverStoriesTitle')}</h2>
          <ul className="discover-list">
            {playableJourneys.map(({ culture }) => {
              const name = cultureName(culture, locale, t);
              const descKey = foodCultureKey(culture.id, 'description');
              const desc = descKey
                ? t(descKey)
                : locale === 'ja' ? culture.descriptionJa : culture.descriptionEn;
              return (
                <li key={culture.id}>
                  <Link
                    to={`/story/${culture.id}?backTo=/discover`}
                    className="discover-link"
                    aria-label={name}
                  >
                    <Card button className="discover-card discover-card--media">
                      <div className="discover-card__media">
                        <FoodCultureImage
                          image={culture.image}
                          name={name}
                          nameJa={culture.nameJa}
                          category={culture.category}
                          alt={name}
                        />
                      </div>
                      <div className="discover-card__body">
                        <div className="discover-card__title">{name}</div>
                        <p className="discover-card__desc">{desc}</p>
                        <div className="discover-card__meta">
                          <span className="discover-card__area">{areaLabel(culture, locale, t)}</span>
                          <Tag tone="success">{t('originEditorial')}</Tag>
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

      {/* Visit destinations on the playable journeys */}
      {playablePlaces.length > 0 ? (
        <section className="tmm-section" aria-label={t('discoverPlacesTitle')}>
          <h2 className="discover-section-title">{t('discoverPlacesTitle')}</h2>
          <ul className="discover-list">
            {playablePlaces.map(({ place, area }) => {
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
                          <span className="discover-card__area">{area}</span>
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
