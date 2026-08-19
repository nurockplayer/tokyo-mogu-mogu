import { Link } from 'react-router-dom';
import type { JourneyPresentation, JourneyPresentationPlace } from '../data';
import { foodCultureKey, placeNameKey, routeAreaKey, routeNameKey, routeTransportKey } from '../i18n/data-content';
import { formatDate } from '../i18n-format';
import { useI18n, type Locale, type LocaleKey } from '../i18n';
import { fillTemplate } from '../lib/exploration';
import { Card, Tag, type TagTone } from '../ui';
import { FoodCultureImage } from './FoodCultureImage';
import './JourneyCard.css';

const VERIFICATION_LABEL_KEY: Record<JourneyPresentation['sourceStatus'], LocaleKey> = {
  verified: 'verificationVerified',
  needs_confirmation: 'verificationNeedsConfirmation',
  stale: 'verificationStale',
  conflict: 'verificationConflict',
  demo: 'verificationDemo',
};

const ORIGIN_LABEL_KEY: Record<JourneyPresentation['origin'], LocaleKey> = {
  source: 'originSource',
  editorial: 'originEditorial',
  demo: 'originDemo',
};

function verificationTone(status: JourneyPresentation['sourceStatus']): TagTone {
  if (status === 'verified') return 'success';
  if (status === 'demo') return 'info';
  return 'warning';
}

function formatTotalMinutes(total: number, locale: Locale): string {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (hours === 0) return locale === 'ja' ? `${minutes}分` : `${minutes}min`;
  if (minutes === 0) return locale === 'ja' ? `${hours}時間` : `${hours}h`;
  return locale === 'ja' ? `${hours}時間${minutes}分` : `${hours}h ${minutes}m`;
}

function localizedPlaceName(place: JourneyPresentationPlace, locale: Locale, t: (key: LocaleKey) => string) {
  const key = placeNameKey(place.id);
  return key ? t(key) : locale === 'ja' ? place.nameJa : place.nameEn;
}

/** Shared route-backed metadata used by Discover cards and the Result card. */
export function JourneyMeta({
  presentation,
  compact = false,
}: {
  presentation: JourneyPresentation;
  compact?: boolean;
}) {
  const { locale, t } = useI18n();
  const routeName = routeNameKey(presentation.routeId)
    ? t(routeNameKey(presentation.routeId)!)
    : locale === 'ja'
      ? presentation.routeNameJa
      : presentation.routeNameEn;
  const area = routeAreaKey(presentation.routeId)
    ? t(routeAreaKey(presentation.routeId)!)
    : locale === 'ja'
      ? presentation.areaJa
      : presentation.areaEn;
  const transport = routeTransportKey(presentation.routeId)
    ? t(routeTransportKey(presentation.routeId)!)
    : locale === 'ja'
      ? presentation.transportJa
      : presentation.transportEn;
  const duration = t(
    presentation.duration === 'half-day' ? 's5DurationHalfDay' : 's5DurationFullDay',
  );
  const facts = fillTemplate(t('journeyMetaFacts'), {
    duration,
    count: String(presentation.stopCount),
    time: formatTotalMinutes(presentation.totalMinutes, locale),
  });
  const formattedSourceDate = presentation.sourceDate
    ? formatDate(presentation.sourceDate.date, locale)
    : '';

  return (
    <div className={`journey-meta${compact ? ' journey-meta--compact' : ''}`}>
      <div className="journey-meta__route">
        <span className="journey-meta__route-label">{t('journeyRouteLabel')}</span>
        <span className="journey-meta__route-name">{routeName}</span>
        <span className="journey-meta__area discover-card__area">{area}</span>
      </div>
      <p className="journey-meta__facts">{facts}</p>
      <p className="journey-meta__transport">
        <span className="journey-meta__transport-label">{t('journeyTransportLabel')}</span>
        <span>{transport}</span>
      </p>
      {presentation.representativePlaces.length > 0 ? (
        <div className="journey-meta__places">
          <span className="journey-meta__places-label">{t('journeyPlacesLabel')}</span>
          <ul className="journey-meta__place-list" aria-label={t('journeyPlacesLabel')}>
            {presentation.representativePlaces.map((place) => (
              <li key={place.id}>{localizedPlaceName(place, locale, t)}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="journey-meta__provenance">
        <Tag tone="success">{t(ORIGIN_LABEL_KEY[presentation.origin])}</Tag>
        <Tag tone={verificationTone(presentation.sourceStatus)}>
          {t(VERIFICATION_LABEL_KEY[presentation.sourceStatus])}
        </Tag>
        {formattedSourceDate ? (
          <span className="journey-meta__date">
            {t(presentation.sourceDate!.label)}: {formattedSourceDate}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** One source-backed journey choice with a consistent Story CTA. */
export function JourneyCard({
  presentation,
  href,
}: {
  presentation: JourneyPresentation;
  href: string;
}) {
  const { locale, t } = useI18n();
  const titleKey = foodCultureKey(presentation.foodCultureId, 'name');
  const descriptionKey = foodCultureKey(presentation.foodCultureId, 'description');
  const name = titleKey
    ? t(titleKey)
    : locale === 'ja'
      ? presentation.cultureNameJa
      : presentation.cultureNameEn;
  const description = descriptionKey
    ? t(descriptionKey)
    : locale === 'ja'
      ? presentation.cultureDescriptionJa
      : presentation.cultureDescriptionEn;

  return (
    <Link to={href} className="journey-card__link discover-link" aria-label={name}>
      <Card button className="journey-card journey-card--media">
        <div className="journey-card__media">
          <FoodCultureImage
            image={presentation.image}
            name={name}
            nameJa={presentation.cultureNameJa}
            category={presentation.category}
            alt={name}
          />
        </div>
        <div className="journey-card__body">
          <h3 className="journey-card__title">{name}</h3>
          <p className="journey-card__desc">{description}</p>
          <JourneyMeta presentation={presentation} />
          <span className="journey-card__cta">{t('journeyViewStory')} →</span>
        </div>
      </Card>
    </Link>
  );
}
