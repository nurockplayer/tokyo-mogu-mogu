/**
 * S6 Spot Detail page (Issue #45).
 *
 * Shows one place on the wasabi route: stylized photo, local name +
 * romanization, category, an editorial story excerpt, practical info
 * (address / access / hours / closed days / price / reservation) ONLY where
 * source data exists — otherwise an explicit unknown/unverified state — tags,
 * and CTAs (directions via the shared map-links helpers, reserve where the
 * data supports it, add to itinerary).
 *
 * Includes the dietary disclaimer equivalent to
 * 「詳細は現地・店舗に直接確認してください」 and clearly marks demo/editorial
 * data. Accountless and geolocation-free.
 */
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  Button,
  ButtonLink,
  Card,
  InfoList,
  StorySection,
  Tag,
  Toast,
} from '../ui';
import { PlaceVisual } from '../components/PlaceVisual';
import { getPlaceById, getRelatedFoodCultures, getRouteIdForPlace, getSpotDetail } from '../data';
import type { PlaceType } from '../data';
import { useI18n, type LocaleKey } from '../i18n';
import {
  placeNameKey,
  spotAccessKey,
  spotDemoNoteKey,
  spotRoleKey,
  foodCultureKey,
} from '../i18n/data-content';
import { googleMapsDirectionsUrl, appleMapsDirectionsUrl } from '../lib/map-links';
import { isRouteSaved, saveRoute, unsaveRoute } from '../lib/saved-routes';

/** Maps a place type to its i18n label key. */
const PLACE_TYPE_LABEL: Record<PlaceType, LocaleKey> = {
  shop: 's6CategoryShop',
  restaurant: 's6CategoryRestaurant',
  farm: 's6CategoryFarm',
  brewery: 's6CategoryBrewery',
  'info-center': 's6CategoryInfoCenter',
  other: 's6CategoryOther',
};

export function SpotPage() {
  const { placeId } = useParams<{ placeId: string }>();
  const { locale, t } = useI18n();

  const place = placeId ? getPlaceById(placeId) : undefined;
  const detail = placeId ? getSpotDetail(placeId) : undefined;

  // The S6 "add to itinerary" CTA saves the spot's parent model route into the
  // shared `tmm:savedRoutes` contract — the same itinerary the S5 save button
  // writes and S8 My Route reads (Issue #69). The route is derived from the
  // place id, so the saved entry always matches what the route map links to.
  const routeId = placeId ? getRouteIdForPlace(placeId) : undefined;
  const [saved, setSaved] = useState<boolean>(() =>
    routeId !== undefined ? isRouteSaved(routeId) : false,
  );
  const [toast, setToast] = useState<string | null>(null);

  if (!place) {
    return (
      <div className="tmm-page">
        <Card>
          <h2>{t('s6NotFoundTitle')}</h2>
          <p>{t('s6NotFoundBody')}</p>
          <ButtonLink variant="secondary" href="#/route">
            {t('back')}
          </ButtonLink>
        </Card>
      </div>
    );
  }

  // Reserved for record fields that are never populated in the current demo
  // seed (hours / closed days / price). Only the `ja` variant exists as data;
  // non-Japanese locales keep the record's English variant when present. The
  // callers guard on the `ja` value, so the fallback string is never rendered.
  const recordField = (ja?: string, en?: string): string =>
    locale === 'ja' ? ja ?? '' : en ?? ja ?? '';

  const practical = detail?.practical;
  const relatedCultures = getRelatedFoodCultures(place);

  // Direction CTAs (external map apps) — safe to offer for any place.
  const googleUrl = googleMapsDirectionsUrl(place.latitude, place.longitude);
  const appleUrl = appleMapsDirectionsUrl(place.latitude, place.longitude);

  // Info list built only from data that actually exists.
  const infoItems: { label: string; value: string }[] = [];
  infoItems.push({ label: t('s6InfoAddress'), value: place.address });
  const accessKey = spotAccessKey(place.id);
  if (practical?.accessJa && accessKey) {
    infoItems.push({ label: t('s6InfoAccess'), value: t(accessKey) });
  }
  if (practical?.hoursJa) {
    infoItems.push({ label: t('s6InfoHours'), value: recordField(practical.hoursJa, practical.hoursEn) });
  }
  if (practical?.closedDaysJa) {
    infoItems.push({ label: t('s6InfoClosedDays'), value: recordField(practical.closedDaysJa, practical.closedDaysEn) });
  }
  if (practical?.priceJa) {
    infoItems.push({ label: t('s6InfoPrice'), value: recordField(practical.priceJa, practical.priceEn) });
  }

  // Tags — only rendered when the source data supports them.
  const tags: ReactNode[] = [];
  if (detail?.tags.language?.includes('en')) {
    tags.push(<Tag key="lang" tone="info">🗣 {t('s6TagEnglish')}</Tag>);
  }
  if (detail?.tags.vegetarian) {
    tags.push(<Tag key="veg" tone="success">🌿 {t('s6TagVegetarian')}</Tag>);
  }
  if (detail?.tags.allergyNotice) {
    tags.push(<Tag key="allergy" tone="warning">⚠ {t('s6TagAllergy')}</Tag>);
  }
  if (detail?.tags.accessibility) {
    tags.push(<Tag key="access" tone="info">♿ {t('s6TagAccessibility')}</Tag>);
  }

  // Open / closed / reservation-needed state — only when reliable data exists.
  // Today no spot detail carries verified hours/closed-day data, so an
  // explicit unverified state is shown instead (never a fabricated claim).

  const handleToggleItinerary = () => {
    if (routeId === undefined) {
      return;
    }
    if (saved) {
      unsaveRoute(routeId);
      setSaved(false);
      setToast(t('s6AddToItineraryRemovedToast'));
    } else {
      saveRoute(routeId);
      setSaved(true);
      setToast(t('s6AddToItineraryToast'));
    }
  };

  return (
    <div className="tmm-page">
      {/* Hero: photo placeholder + local name + romanization + category */}
      <div className="s6-visual-wrap">
        <PlaceVisual
          name={t(placeNameKey(place.id))}
          nameJa={place.nameJa}
          type={place.type}
          alt={t(placeNameKey(place.id))}
        />
      </div>
      <div className="s6-title-row">
        <h1>{t(placeNameKey(place.id))}</h1>
        {place.nameEn !== t(placeNameKey(place.id)) ? (
          <span className="s6-roman">{place.nameEn}</span>
        ) : null}
        <span className="tmm-tag tmm-tag--info">{t(PLACE_TYPE_LABEL[place.type])}</span>
      </div>

      {/* Tags where data exists */}
      {tags.length > 0 ? <div className="s6-tags">{tags}</div> : null}

      {/* Story excerpt — the spot's role in the wasabi journey (editorial) */}
      <StorySection kicker={t('s6StoryKicker')} title={t('s6StoryTitle')}>
        {detail?.roleJa ? (
          <p>{t(spotRoleKey(place.id) ?? 'dataWasabiFieldRole')}</p>
        ) : (
          <p>{t('s6StoryUnavailable')}</p>
        )}
        <p className="s6-provenance">{t('s6EditorialNote')}</p>
      </StorySection>

      {/* Practical info */}
      <StorySection kicker={t('s6InfoKicker')} title={t('s6InfoTitle')}>
        <InfoList items={infoItems} />
        {practical ? null : (
          <p className="s6-info-unverified">{t('s6InfoUnverified')}</p>
        )}
      </StorySection>

      {/* Demo note (clearly marked) when the spot carries one */}
      {detail?.demoNote ? (
        <div className="tmm-section">
          <Tag tone={detail.demoNote.tone === 'warning' ? 'warning' : 'info'}>
            {t(spotDemoNoteKey(place.id) ?? 'dataWasabiFieldDemoNote')}
          </Tag>
        </div>
      ) : null}

      {/* Related food cultures (provenance of why this spot matters) */}
      {relatedCultures.length > 0 ? (
        <StorySection kicker={t('s6RelatedKicker')} title={t('s6RelatedTitle')}>
          <ul className="tmm-info-list">
            {relatedCultures.map((fc) => (
              <li key={fc.id} className="tmm-info-list__item">
                <span className="tmm-info-list__label">{t('s6RelatedFoodCulture')}</span>
                <span className="tmm-info-list__value">
                  {t(foodCultureKey(fc.id, 'name') ?? 'dataWasabiName')}
                </span>
              </li>
            ))}
          </ul>
        </StorySection>
      ) : null}

      {/* CTAs: directions / add to itinerary / reserve (where supported) */}
      <div className="s6-actions">
        <ButtonLink
          variant="primary"
          href={googleUrl}
          target="_blank"
          rel="noreferrer"
          className="tmm-btn--block"
        >
          🧭 {t('s6DirectionsGoogle')}
        </ButtonLink>
        <ButtonLink
          variant="secondary"
          href={appleUrl}
          target="_blank"
          rel="noreferrer"
          className="tmm-btn--block"
        >
          🧭 {t('s6DirectionsApple')}
        </ButtonLink>
        {routeId !== undefined ? (
          <>
            <Button
              variant={saved ? 'secondary' : 'primary'}
              className="tmm-btn--block"
              onClick={handleToggleItinerary}
              aria-pressed={saved}
            >
              {saved ? `✓ ${t('s6AddToItinerarySaved')}` : `➕ ${t('s6AddToItinerary')}`}
            </Button>
            <p className="s6-info-unverified">{t('s6AddToItineraryHint')}</p>
          </>
        ) : null}
        {detail?.practical?.reservationAvailable ? (
          <Button variant="secondary" className="tmm-btn--block">
            📅 {t('s6ReserveCta')}
          </Button>
        ) : (
          <Button variant="secondary" className="tmm-btn--block" disabled>
            📅 {t('s6ReserveDisabled')}
          </Button>
        )}
      </div>

      {/* Dietary safety disclaimer (product contract) */}
      <p className="s6-info-unverified">{t('s6DietaryDisclaimer')}</p>

      <Link to="/route" className="tmm-btn tmm-btn--secondary s6-back">
        ← {t('s6BackToRoute')}
      </Link>

      {toast ? (
        <Toast message={toast} onClose={() => setToast(null)} closeLabel={t('close')} />
      ) : null}
    </div>
  );
}
