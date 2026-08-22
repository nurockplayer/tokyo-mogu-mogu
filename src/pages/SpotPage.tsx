/**
 * S6 Spot Detail page (Issue #45).
 *
 * Shows one place on a food-culture route: stylized photo, local name +
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
import { useParams, Link, useLocation } from 'react-router-dom';
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
import {
  getPlaceById,
  getRelatedFoodCultures,
  getSpotDetail,
} from '../data';
import {
  FIELDWORK_GALLERY_COPY,
  FIELDWORK_MEDIA_BY_PLACE_ID,
  fieldworkText,
} from '../data/fieldwork-media';
import type { DataSource, PlaceType } from '../data';
import { useI18n, type LocaleKey } from '../i18n';
import {
  placeNameKey,
  spotAccessKey,
  spotDemoNoteKey,
  spotRoleKey,
  foodCultureKey,
} from '../i18n/data-content';
import { googleMapsDirectionsUrl, appleMapsDirectionsUrl, type DirectionsPlace } from '../lib/map-links';
import { isRouteSaved, saveRoute, unsaveRoute } from '../lib/saved-routes';
import { deriveVerificationStatus, sourceDateLabel } from '../lib/verification';
import { routeBackTarget, resolveSpotRouteId, spotBackHref } from './route-context';
import './route-spot.css';
import { journeyScrollRestoreState } from '../app/JourneyScrollManager';

/** Maps a place type to its i18n label key. */
const PLACE_TYPE_LABEL: Record<PlaceType, LocaleKey> = {
  shop: 's6CategoryShop',
  restaurant: 's6CategoryRestaurant',
  farm: 's6CategoryFarm',
  brewery: 's6CategoryBrewery',
  'info-center': 's6CategoryInfoCenter',
  other: 's6CategoryOther',
};

/** Maps a verification status to its i18n label key (Issue #129). */
const VERIFICATION_LABEL_KEY: Record<
  'verified' | 'needs_confirmation' | 'stale' | 'conflict' | 'demo',
  LocaleKey
> = {
  verified: 'verificationVerified',
  needs_confirmation: 'verificationNeedsConfirmation',
  stale: 'verificationStale',
  conflict: 'verificationConflict',
  demo: 'verificationDemo',
};

const SOURCE_TYPE_LABEL: Record<NonNullable<DataSource['sourceType']>, LocaleKey> = {
  official_web: 'sourceTypeOfficialWeb',
  open_data: 'sourceTypeOpenData',
  fieldwork: 'sourceTypeFieldwork',
  business: 'sourceTypeBusiness',
  manual: 'sourceTypeManual',
  demo: 'sourceTypeDemo',
};

/**
 * Caller-aware back navigation for the Spot page (#80, #92, #93). Spots are
 * reached from the Route map/timeline by default (the immediate parent in the
 * Story → Route → Spot journey), so their Back returns to the Route and the
 * caller context is forwarded. The one exception is a Spot opened directly from
 * Discover (?from=discover), which returns straight to Discover (Issue #93).
 * The origin query survives when the Route itself came from the personalized
 * Story.
 */
/** The spot primary action's label/impact i18n keys per action type (#80). */
const ACTION_LABEL_KEY: Record<SpotActionType, LocaleKey> = {
  restaurant: 's6ActionRestaurant',
  workshop: 's6ActionWorkshop',
  shop: 's6ActionShop',
  farm: 's6ActionFarm',
  visit: 's6ActionVisit',
};

const ACTION_IMPACT_KEY: Record<SpotActionType, LocaleKey> = {
  restaurant: 's6ImpactRestaurant',
  workshop: 's6ImpactWorkshop',
  shop: 's6ImpactShop',
  farm: 's6ImpactFarm',
  visit: 's6ImpactVisit',
};

type SpotActionKind = 'external' | 'disabled';

/** The kind of real-world action a spot's primary CTA drives (#80). */
type SpotActionType = 'restaurant' | 'workshop' | 'shop' | 'farm' | 'visit';

interface SpotAction {
  kind: SpotActionKind;
  /** Verified external destination when `kind === 'external'`; omitted for the
   *  disabled/coming-soon fallback (never fake success). */
  url?: string;
  type: SpotActionType;
}

/**
 * Verified external destinations for spot primary actions (#80, #10).
 *
 * The generic official Okutama Tourism Association site is a truthful
 * destination for the tourism information office only; it must not masquerade
 * as spot-specific farm or booking information. Source-backed Ome/Sawai and
 * Hachioji, Fussa, and Akiruno destinations use their own official information
 * pages. These are visit/shop information exits, not booking guarantees;
 * every remaining unverified action uses the disabled fallback.
 */
const CONFIRMED_VISIT_URL = 'https://www.okutokanko.jp/';

export const SPOT_ACTIONS: Record<string, SpotAction> = {
  'okutama-tourism-office': { kind: 'external', url: CONFIRMED_VISIT_URL, type: 'visit' },
  'chishima-wasabi-garden': { kind: 'disabled', type: 'farm' },
  'soba-isshintei': { kind: 'disabled', type: 'restaurant' },
  'shishiguchiya': { kind: 'disabled', type: 'shop' },
  'odanba-fishing': { kind: 'disabled', type: 'visit' },
  'sawai-ozawa-shuzo': {
    kind: 'external',
    url: 'https://www.sawanoi-sake.com/service/kengaku/',
    type: 'workshop',
  },
  'sawanoien-garden': {
    kind: 'external',
    url: 'https://www.sawanoi-sake.com/service/sawanoien/',
    type: 'restaurant',
  },
  // Hachioji slice: the roadside station's own site is a truthful destination
  // for current stock and facility information; the contextual heritage stop
  // has no invented booking/visit URL.
  'hachioji-takiyama-roadside-station': {
    kind: 'external',
    url: 'https://www.michinoeki-hachioji.net/',
    type: 'shop',
  },
  'hachioji-takiyama-castle': { kind: 'disabled', type: 'visit' },
  // Fussa slice: existing operator/city source URLs are truthful information
  // destinations. Do not imply that a tour or reservation is available.
  'fussa-tamura-shuzo': {
    kind: 'external',
    url: 'https://www.tamurashuzojo.com/page/kura',
    type: 'visit',
  },
  'fussa-kurumiru': {
    kind: 'external',
    url: 'https://www.city.fussa.tokyo.jp/map/shiyakusho/1001605.html',
    type: 'visit',
  },
  'fussa-ishikawa-shuzo': {
    kind: 'external',
    url: 'https://www.tamajiman.co.jp/access/',
    type: 'visit',
  },
  // Akiruno slice: the city direct-sale page and the facility's official
  // access page support the action while current stock/operations stay unknown.
  'akiruno-farmers-center': {
    kind: 'external',
    url: 'https://www.city.akiruno.tokyo.jp/0000003556.html',
    type: 'shop',
  },
  'akiruno-seoto-no-yu': {
    kind: 'external',
    // The recorded GO TOKYO source is used because the facility access URL
    // currently fails a clean TLS request; this page was rechecked 2026-08-20.
    url: 'https://www.gotokyo.org/jp/spot/397/index.html',
    type: 'visit',
  },
};

/** Default action type for a place category when no per-spot action exists. */
const TYPE_DEFAULT_ACTION: Record<PlaceType, SpotActionType> = {
  restaurant: 'restaurant',
  shop: 'shop',
  farm: 'farm',
  brewery: 'workshop',
  'info-center': 'visit',
  other: 'visit',
};

export function SpotPage() {
  const { placeId } = useParams<{ placeId: string }>();
  const { locale, t } = useI18n();
  const location = useLocation();

  const place = placeId ? getPlaceById(placeId) : undefined;
  const detail = placeId ? getSpotDetail(placeId) : undefined;
  const gallery = placeId ? FIELDWORK_MEDIA_BY_PLACE_ID[placeId] : undefined;

  // The S6 "add to itinerary" CTA saves the itinerary the traveler is on into
  // the shared `tmm:savedRoutes` contract (the same entry the S5 save button
  // writes and S8 My Route reads, Issue #69). The forwarded route/candidate
  // context wins when present; otherwise the place's unambiguous parent route
  // is used, and an ambiguous place (no context, multiple routes) stays
  // unavailable rather than guessing.
  const routeId = resolveSpotRouteId(location.search, placeId);
  const [saved, setSaved] = useState<boolean>(() =>
    routeId !== undefined ? isRouteSaved(routeId) : false,
  );
  const [toast, setToast] = useState<string | null>(null);
  const [selectedMediaId, setSelectedMediaId] = useState<string | undefined>(
    () => gallery?.[0]?.id,
  );

  if (!place) {
    return (
      <div className="tmm-page">
        <Card>
          <h2>{t('s6NotFoundTitle')}</h2>
          <p>{t('s6NotFoundBody')}</p>
          <Link
            to={spotBackHref(location.search)}
            className="tmm-btn tmm-btn--secondary"
          >
            {t('back')}
          </Link>
        </Card>
      </div>
    );
  }

  // Only source-backed fields are populated in the seed. The `ja` value is
  // the presence guard; non-Japanese locales use the English variant when
  // present and otherwise fall back to Japanese rather than inventing copy.
  const recordField = (ja?: string, en?: string): string =>
    locale === 'ja' ? ja ?? '' : en ?? ja ?? '';

  // Localized place name / role with the record's canonical {Ja,En} fields as
  // the honest fallback — never another culture's name (no silent wasabi/Okutama
  // copy for unknown/new ids).
  const placeNameKeyValue = placeNameKey(place.id);
  const placeName = placeNameKeyValue
    ? t(placeNameKeyValue)
    : recordField(place.nameJa, place.nameEn);
  const spotRoleKeyValue = spotRoleKey(place.id);
  const spotRole = spotRoleKeyValue
    ? t(spotRoleKeyValue)
    : recordField(detail?.roleJa, detail?.roleEn);

  const practical = detail?.practical;
  const relatedCultures = getRelatedFoodCultures(place);
  const reservationAction = SPOT_ACTIONS[place.id];
  const selectedMedia = gallery?.find((media) => media.id === selectedMediaId) ?? gallery?.[0];
  const reservationUrl = practical?.reservationAvailable && reservationAction?.kind === 'external'
    ? reservationAction.url
    : undefined;
  const sourceRecords = [
    { source: place.source, origin: place.origin },
    ...(place.coordinateSource ? [{ source: place.coordinateSource, origin: place.origin }] : []),
    ...(detail?.source ? [{ source: detail.source, origin: detail.origin }] : []),
  ].filter((entry, index, entries) => {
    const identity = `${entry.source.url ?? entry.source.name}|${entry.source.originalId ?? ''}`;
    return entries.findIndex((candidate) => {
      const candidateIdentity = `${candidate.source.url ?? candidate.source.name}|${candidate.source.originalId ?? ''}`;
      return candidateIdentity === identity;
    }) === index;
  });

  // Direction CTAs (external map apps). Approximate places (district-centroid
  // coordinates) navigate by the sourced name/address, not the centroid (Issue
  // #127); precise places keep coordinate-based directions.
  const directionsPlace: DirectionsPlace = {
    latitude: place.latitude,
    longitude: place.longitude,
    coordinatePrecision: place.coordinatePrecision,
    name: place.nameJa,
    address: place.address,
  };
  const googleUrl = googleMapsDirectionsUrl(directionsPlace);
  const appleUrl = appleMapsDirectionsUrl(directionsPlace);

  // Info list built only from data that actually exists.
  const infoItems: { label: string; value: string }[] = [];
  infoItems.push({ label: t('s6InfoAddress'), value: place.address });
  const accessKey = spotAccessKey(place.id);
  if (practical?.accessJa) {
    infoItems.push({
      label: t('s6InfoAccess'),
      value: accessKey ? t(accessKey) : recordField(practical.accessJa, practical.accessEn),
    });
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

  // Open / closed / reservation-needed state — only when source-backed data
  // exists. The verification badge still exposes `needs_confirmation` until
  // a stakeholder confirms the current practical details.

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
    <div className="tmm-page s6-page">
      {/* Hero: source-matched fieldwork gallery where available; otherwise the
          honest generated place visual remains. */}
      <div className="s6-visual-wrap">
        {selectedMedia ? (
          <figure className="s6-gallery__hero">
            <img
              key={selectedMedia.id}
              className="s6-gallery__hero-image"
              src={selectedMedia.src}
              alt={fieldworkText(selectedMedia.alt, locale)}
              loading="eager"
              decoding="async"
            />
            <figcaption className="s6-gallery__caption">
              {fieldworkText(selectedMedia.caption, locale)}
            </figcaption>
          </figure>
        ) : (
          <PlaceVisual
            name={placeName}
            nameJa={place.nameJa}
            type={place.type}
            alt={placeName}
          />
        )}
        <Link
          to={spotBackHref(location.search)}
          state={journeyScrollRestoreState}
          className="s6-hero-back"
          aria-label={t('back')}
        >
          ‹
        </Link>
      </div>

      {gallery && selectedMedia ? (
        <section
          className="s6-gallery"
          aria-label={fieldworkText(FIELDWORK_GALLERY_COPY.spotLabel, locale)}
        >
          <div className="s6-gallery__rail">
            {gallery.map((media) => {
              const selected = media.id === selectedMedia.id;
              return (
                <button
                  key={media.id}
                  type="button"
                  className="s6-gallery__thumb"
                  aria-label={`${fieldworkText(FIELDWORK_GALLERY_COPY.showPhoto, locale)}: ${fieldworkText(media.title, locale)}`}
                  aria-pressed={selected}
                  onClick={() => setSelectedMediaId(media.id)}
                >
                  <img src={media.src} alt="" aria-hidden="true" loading="eager" decoding="async" />
                </button>
              );
            })}
          </div>
        </section>
      ) : null}
      <div className="s6-title-row">
        <h1>{placeName}</h1>
        {place.nameEn !== placeName ? (
          <span className="s6-roman">{place.nameEn}</span>
        ) : null}
        <span className="tmm-tag tmm-tag--info s6-type-tag">{t(PLACE_TYPE_LABEL[place.type])}</span>
        {/* Provenance / verification badge (Issue #129): a place is never shown
            as verified without a source that says so. Demo-origin spots render
            the demo label even when practical data is absent. */}
        <span className="tmm-tag tmm-tag--info">
          {t(VERIFICATION_LABEL_KEY[deriveVerificationStatus(place.source, place.origin)])}
        </span>
      </div>

      {/* Tags where data exists */}
      {tags.length > 0 ? <div className="s6-tags">{tags}</div> : null}

      {/* Story excerpt — the spot's role in its food-culture journey (editorial) */}
      <StorySection kicker={t('s6StoryKicker')} title={t('s6StoryTitle')}>
        {detail?.roleJa ? (
          <p>{spotRole}</p>
        ) : (
          <p>{t('s6StoryUnavailable')}</p>
        )}
        <p className="s6-provenance">{t('s6EditorialNote')}</p>
      </StorySection>

      {/* Compact provenance disclosure: source type, link, retrieval date,
          license and verification state stay visible without implying that
          editorial copy or approximate coordinates are stakeholder-verified. */}
      <details className="s6-sources">
        <summary className="s6-sources__summary">
          <span>{t('sources')}</span>
          <Tag tone="warning">
            {t(VERIFICATION_LABEL_KEY[deriveVerificationStatus(place.source, place.origin)])}
          </Tag>
        </summary>
        <ul className="s6-sources__list">
          {sourceRecords.map(({ source, origin }, index) => {
            const status = deriveVerificationStatus(source, origin);
            const date = sourceDateLabel(source, origin);
            return (
              <li key={`${source.originalId ?? source.name}-${index}`} className="s6-sources__item">
                <span className="s6-sources__name">{source.name}</span>
                {source.sourceType ? (
                  <span className="s6-sources__meta">{t(SOURCE_TYPE_LABEL[source.sourceType])}</span>
                ) : null}
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noreferrer" className="s6-sources__link">
                    {t('sourceLink')}
                  </a>
                ) : null}
                <Tag tone={status === 'verified' ? 'success' : 'warning'}>
                  {t(VERIFICATION_LABEL_KEY[status])}
                </Tag>
                {source.license ? (
                  <span className="s6-sources__meta">
                    {t('detailLicense')}: {source.license}
                  </span>
                ) : null}
                {date ? (
                  <span className="s6-sources__meta">
                    {t(date.label)}: {date.date}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </details>

      {/* Practical info */}
      <StorySection kicker={t('s6InfoKicker')} title={t('s6InfoTitle')}>
        <div className="s6-info">
          <InfoList items={infoItems} />
          {practical ? null : (
            <p className="s6-unverified-note">{t('s6InfoUnverified')}</p>
          )}
        </div>
      </StorySection>

      {/* Demo note (clearly marked) when the spot carries one */}
      {detail?.demoNote ? (
        <div className="tmm-section">
          <Tag tone={detail.demoNote.tone === 'warning' ? 'warning' : 'info'}>
            {(() => {
              const demoKey = spotDemoNoteKey(place.id);
              return demoKey ? t(demoKey) : recordField(detail.demoNote.noteJa, detail.demoNote.noteEn);
            })()}
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
                  {(() => {
                    const nameKey = foodCultureKey(fc.id, 'name');
                    return nameKey ? t(nameKey) : recordField(fc.nameJa, fc.nameEn);
                  })()}
                </span>
              </li>
            ))}
          </ul>
        </StorySection>
      ) : null}

      {/* CTAs: spot-type primary action (external-link-first) + directions +
          add to itinerary (#80). No internal cart/payment/booking backend. */}
      <div className="s6-actions">
        <SpotPrimaryAction
          action={SPOT_ACTIONS[place.id] ?? {
            kind: 'disabled',
            type: TYPE_DEFAULT_ACTION[place.type],
          }}
          comingSoonLabel={t('s6ActionComingSoon')}
        />
        <p className="s6-action-impact">{t(ACTION_IMPACT_KEY[spotActionType(place)])}</p>
        <ButtonLink
          variant="secondary"
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
        {reservationUrl ? (
          <ButtonLink
            variant="secondary"
            href={reservationUrl}
            target="_blank"
            rel="noreferrer"
            className="tmm-btn--block"
          >
            📅 {t('s6ReserveCta')}
          </ButtonLink>
        ) : (
          <Button variant="secondary" className="tmm-btn--block" disabled>
            📅 {t('s6ReserveDisabled')}
          </Button>
        )}
      </div>

      {/* Dietary safety disclaimer (product contract) */}
      <p className="s6-info-unverified">{t('s6DietaryDisclaimer')}</p>

      <Link
        to={spotBackHref(location.search)}
        state={journeyScrollRestoreState}
        className="tmm-btn tmm-btn--secondary s6-back"
      >
        ← {routeBackTarget(location.search) === 'discover' ? t('back') : t('s6BackToRoute')}
      </Link>

      {toast ? (
        <Toast message={toast} onClose={() => setToast(null)} closeLabel={t('close')} />
      ) : null}
    </div>
  );
}

/**
 * The primary real-world action for a spot, driven by its place type (#80):
 * - Restaurant → external booking / official site when verified
 * - Workshop   → external experience booking/ticket page
 * - Shop       → external EC / local purchase guidance
 * - Farm/visit → official visit/reservation info
 * - Directions → map/navigation destination
 *
 * When the destination is unverified the action renders a disabled
 * coming-soon fallback (`s6ActionComingSoonDesc`) — never fake success.
 */
function SpotPrimaryAction({
  action,
  comingSoonLabel,
}: {
  action: SpotAction;
  comingSoonLabel: string;
}) {
  const { t } = useI18n();
  const label = t(ACTION_LABEL_KEY[action.type]);
  if (action.kind === 'external' && action.url) {
    return (
      <ButtonLink
        variant="primary"
        href={action.url}
        target="_blank"
        rel="noreferrer"
        className="tmm-btn--block"
      >
        ↗ {label}
      </ButtonLink>
    );
  }
  return (
    <div className="s6-action-disabled">
      <Button variant="primary" className="tmm-btn--block" disabled aria-disabled="true">
        {label}
      </Button>
      <p className="s6-info-unverified">
        {comingSoonLabel} — {t('s6ActionComingSoonDesc')}
      </p>
    </div>
  );
}

/** Resolve the action type shown for a spot (per-spot action or category default). */
export function spotActionType(place: { id: string; type: PlaceType }): SpotActionType {
  return SPOT_ACTIONS[place.id]?.type ?? TYPE_DEFAULT_ACTION[place.type];
}
