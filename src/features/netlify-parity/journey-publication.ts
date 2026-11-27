import { checkJourneyAdmission } from '../../data/journey-admission';
import { findFact, type JourneyRecord } from '../../data/journey-record';
import { JOURNEY_RECORDS } from '../../data/journey-records';
import type { DataSource } from '../../data/model';
import type { Locale } from '../../i18n';
import { deriveVerificationStatus } from '../../lib/verification';
import { currentJourneys, type JourneyPresentation } from './content';

const records = new Map(JOURNEY_RECORDS.map((record) => [record.journey.id, record]));

export function journeyRecord(id: string) {
  return records.get(id);
}

export function publishJourney(journey: JourneyPresentation, now: Date) {
  const record = journeyRecord(journey.id);
  if (!record) return undefined;
  const { offeredVariants } = checkJourneyAdmission(record, now);
  if (!offeredVariants.length) return undefined;
  return {
    ...journey,
    routeVariants: journey.routeVariants.filter(({ id }) => offeredVariants.some((variant) => variant.id === id)),
  };
}

export function publishedJourneys(now = new Date()) {
  return currentJourneys.flatMap((journey) => publishJourney(journey, now) ?? []);
}

const retrievalLabel: Record<Locale, string> = {
  ja: '未確認・出典取得日', en: 'Unconfirmed · Retrieved', 'zh-TW': '尚未確認・出處取得日期',
};

export function retrievalNote(locale: Locale, sources: readonly DataSource[]) {
  const dates = [...new Set(sources.flatMap((source) =>
    source.retrievedAt && deriveVerificationStatus(source, 'source') !== 'verified' ? [source.retrievedAt] : [],
  ))].sort();
  return dates.length ? `${retrievalLabel[locale]} ${dates.join(' / ')} (JST)` : undefined;
}

export function factRetrievalNote(record: JourneyRecord, locale: Locale, ...paths: string[]) {
  const sources = paths.flatMap((path) => [
    findFact(record.facts, path),
    ...Object.entries(record.facts).filter(([key]) => key.startsWith(`${path}.`)).map(([, fact]) => fact),
  ].flatMap((fact) => fact?.sourceIds.map((id) => record.sources[id]) ?? []));
  return retrievalNote(locale, sources);
}
