import { findFact, selectRouteStop, type JourneyRecord } from './journey-record';
import { journeyWithdrawals } from './journey-withdrawals';
import type { DataSource } from './model';

const locales = ['ja', 'en', 'zh-TW'] as const;
const arrivalKinds = ['station', 'bus-stop', 'ferry-terminal'];

function webUrl(value: string | undefined) {
  if (!value) return undefined;
  const url = URL.parse(value);
  return url && ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password
    ? url : undefined;
}

function retrieved(source: DataSource): source is DataSource & { retrievedAt: string } {
  const date = source.retrievedAt;
  return Boolean(date && /^\d{4}-\d{2}-\d{2}$/.test(date)
    && Number.isFinite(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date);
}

function official(source: DataSource | undefined) {
  return source?.sourceType === 'official_web'
    && !['stale', 'conflict', 'demo'].includes(source.verificationStatus ?? '')
    && webUrl(source.url)?.protocol === 'https:';
}

function factSources(record: JourneyRecord, path: string) {
  const fact = findFact(record.facts, path);
  return fact && fact.origin !== 'demo' ? fact.sourceIds.map((id) => record.sources[id]) : [];
}

const jstDate = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo', dateStyle: 'short' });

function currentDestination(source: DataSource | undefined, now: Date): source is DataSource & { url: string; retrievedAt: string } {
  if (!source || !official(source) || !retrieved(source)) return false;
  const age = Date.parse(jstDate.format(now)) - Date.parse(source.retrievedAt);
  return age >= 0 && age < 30 * 86_400_000;
}

export function resolveJourneyVisitorSource(record: JourneyRecord, spotId: string, now = new Date()) {
  const spot = record.spots[spotId];
  if (!spot) return undefined;
  if (spot.visitorSourceId) {
    const source = record.sources[spot.visitorSourceId];
    return currentDestination(source, now) ? source : undefined;
  }
  const source = spot.officialSource;
  return currentDestination(source, now)
    && factSources(record, `spots.${spotId}.officialSource`).some((evidence) =>
      evidence && official(evidence) && evidence.url === source.url && evidence.retrievedAt === source.retrievedAt)
    ? source : undefined;
}

export function checkJourneyAdmission(record: JourneyRecord, now = new Date()) {
  const storyFailures = new Set<string>();
  if (Object.hasOwn(journeyWithdrawals, record.journey.id)) storyFailures.add('withdrawn');
  function checkClaim(path: string, value: string) {
    const sources = factSources(record, path);
    if (!value.trim() || sources.length === 0 || sources.some((source) =>
      !source || !webUrl(source.url) || ['demo', 'manual'].includes(source.sourceType ?? '')
      || ['stale', 'conflict', 'demo'].includes(source.verificationStatus ?? ''))) {
      storyFailures.add('sourced story claims');
    }
    if (sources.some((source) => source && !retrieved(source))) storyFailures.add('dated story retrieval');
  }
  for (const locale of locales) {
    const copy = record.journey.copy[locale];
    for (const field of ['title', 'subtitle', 'description', 'storyTitle'] as const) {
      checkClaim(`journey.copy.${locale}.${field}`, copy[field]);
    }
    copy.intro.forEach((text, index) => checkClaim(`journey.copy.${locale}.intro.${index}`, text));
    const chapters = record.journey.chapters[locale];
    if (!copy.intro.length || !chapters.length) storyFailures.add('sourced story claims');
    chapters.forEach((chapter, index) => {
      const path = `journey.chapters.${locale}.${index}`;
      checkClaim(`${path}.title`, chapter.title);
      checkClaim(`${path}.body`, chapter.body);
    });
    if (record.story.point) {
      checkClaim(`story.point.${locale}.title`, record.story.point[locale].title);
      checkClaim(`story.point.${locale}.body`, record.story.point[locale].body);
    }
  }
  for (const [group, spots] of Object.entries(record.story.groups)) {
    spots.forEach((spot, index) => {
      if (spot.description) {
        for (const locale of locales) {
          checkClaim(`story.groups.${group}.${index}.description.${locale}`, spot.description[locale]);
        }
      }
    });
  }

  const variants = record.journey.routeVariants.map((variant, index) => {
    const failures: string[] = [];
    const route = record.variants[variant.id];
    const estimate = factSources(record, `journey.routeVariants.${index}.durationMinutes`);
    if (!Number.isFinite(variant.durationMinutes) || variant.durationMinutes <= 0 ||
      !estimate.some((source) => source && webUrl(source.url) && retrieved(source)
        && !['stale', 'conflict', 'demo'].includes(source.verificationStatus ?? ''))) {
      failures.push('sourced on-site estimate');
    }
    if (!route || variant.steps.length === 0 || variant.steps.length !== route.steps.length ||
      variant.steps.some(({ spotId }, step) => !record.spots[spotId] || route.steps[step].spotId !== spotId) ||
      locales.some((locale) => !record.routeName[locale].trim() || !route.stats[locale].time.trim() ||
        !route.guidance[locale].trim() ||
        route.steps.some((step) => !step.description[locale].trim()))) {
      failures.push('localized route with resolvable ordered stops');
    }
    const arrival = route?.arrival;
    const accessSource = arrival && record.sources[arrival.sourceId];
    if (!arrival || !arrivalKinds.includes(arrival.kind) ||
      !locales.every((locale) => arrival.name[locale].trim()) ||
      !variant.steps.some(({ spotId }) => spotId === arrival.spotId) ||
      !accessSource || !official(accessSource) || !retrieved(accessSource)) {
      failures.push('sourced arrival point');
    }
    const primarySpotId = variant.steps
      .map(({ spotId }) => selectRouteStop(record, spotId))
      .find((spotId) => spotId !== undefined && resolveJourneyVisitorSource(record, spotId, now));
    if (!primarySpotId) failures.push('official destination for primary Spot');
    return { id: variant.id, failures, primarySpotId };
  });

  const offeredVariants = storyFailures.size === 0 ? variants.filter(({ failures }) => failures.length === 0) : [];
  const defaultVariant = offeredVariants.find(({ id }) => id === 'half-day') ?? offeredVariants[0];
  return { admitted: defaultVariant !== undefined, defaultVariant, offeredVariants, storyFailures: [...storyFailures], variants };
}
