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
import { deriveVerificationStatus } from '../lib/verification';
import { routeBackTarget, spotBackHref } from './route-context';

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
 * No fieldwork booking/EC/farm-visit URLs exist yet. The generic official
 * Okutama Tourism Association site is a truthful destination for the tourism
 * information office only; it must not masquerade as spot-specific farm or
 * booking information. Every unverified action uses the disabled fallback.
 * The frozen-journey spots (Issue #127) are the real Okutama facilities.
 */
const CONFIRMED_VISIT_URL = 'https://www.okutokanko.jp/';

export const SPOT_ACTIONS: Record<string, SpotAction> = {
  'okutama-tourism-office': { kind: 'external', url: CONFIRMED_VISIT_URL, type: 'visit' },
  'chishima-wasabi-garden': { kind: 'disabled', type: 'farm' },
  'soba-isshintei': { kind: 'disabled', type: 'restaurant' },
  'shishiguchiya': { kind: 'disabled', type: 'shop' },
  'odanba-fishing': { kind: 'disabled', type: 'visit' },
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
        {/* Provenance / verification badge (Issue #129): a place is never shown
            as verified without a source that says so. Demo-origin spots render
            the demo label even when practical data is absent. */}
        <span className="tmm-tag tmm-tag--info">
          {t(VERIFICATION_LABEL_KEY[deriveVerificationStatus(place.source, place.origin)])}
        </span>
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

      <Link
        to={spotBackHref(location.search)}
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
