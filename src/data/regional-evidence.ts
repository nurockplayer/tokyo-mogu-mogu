/**
 * Small, source-backed regional context notes for the Story surface (#264).
 *
 * This is deliberately a content/config slice, not an analytics framework:
 * each entry belongs to one existing food-culture identity and carries the
 * exact regional context, metric, localized display keys, and source needed
 * to explain that journey. The selector returns only stakeholder-confirmed
 * evidence so an unverified or stale number cannot reach the UI.
 */
import type { LocaleKey } from '../i18n/resources';
import { deriveVerificationStatus } from '../lib/verification';
import type { DataSource, RegionId } from './model';

export interface StoryRegionalEvidence {
  /** Existing food-culture identity used by the Story / candidate journey. */
  foodCultureId: string;
  /** Region identity kept independent from the localized display name. */
  regionId: RegionId;
  /** Localized name of the region measured by the source. */
  regionName: LocaleKey;
  /** Safe, localized explanation of what the metric does and does not show. */
  summary: LocaleKey;
  /** Localized label for the displayed metric. */
  metricLabel: LocaleKey;
  /** Localized survey / metric context. */
  context: LocaleKey;
  /** Numeric value from the official survey, displayed with `unit`. */
  value: number;
  unit: '%';
  /** Survey year, distinct from the source retrieval / confirmation date. */
  sourceYear: number;
  source: DataSource;
}

const TOKYO_FOREIGN_VISITOR_SURVEY_SOURCE: DataSource = {
  name: '東京都「令和7年 国・地域別外国人旅行者行動特性調査」結果概要 (9)',
  url: 'https://www.sangyo-rodo.metro.tokyo.lg.jp/documents/d/sangyo-rodo/01_r7kekka',
  sourceType: 'official_web',
  sourceDatasetId: '令和7年 国・地域別外国人旅行者行動特性調査 (9)',
  sourceUpdatedAt: '2026-06-30',
  retrievedAt: '2026-08-22',
  confirmedAt: '2026-08-22',
  verificationStatus: 'verified',
  originalId: 'tokyo-r7-foreign-visitor-survey-9',
};

/** Evidence attached only to existing Story cultures with a matching source. */
export const STORY_REGIONAL_EVIDENCE: Readonly<Record<string, StoryRegionalEvidence>> = {
  'wasabi-okutama': {
    foodCultureId: 'wasabi-okutama',
    regionId: 'okutama',
    regionName: 'dataRegionalEvidenceOkutama',
    summary: 'dataRegionalEvidenceSummary',
    metricLabel: 'dataRegionalEvidenceVisitRate',
    context: 'dataRegionalEvidenceContext',
    value: 1.1,
    unit: '%',
    sourceYear: 2025,
    source: TOKYO_FOREIGN_VISITOR_SURVEY_SOURCE,
  },
  'sake-ome': {
    foodCultureId: 'sake-ome',
    regionId: 'ome',
    regionName: 'dataRegionalEvidenceOmeMitake',
    summary: 'dataRegionalEvidenceSummary',
    metricLabel: 'dataRegionalEvidenceVisitRate',
    context: 'dataRegionalEvidenceContext',
    value: 0.8,
    unit: '%',
    sourceYear: 2025,
    source: TOKYO_FOREIGN_VISITOR_SURVEY_SOURCE,
  },
};

/** Return configured evidence for a Story culture, without verification filtering. */
export function getStoryRegionalEvidence(foodCultureId: string): StoryRegionalEvidence | undefined {
  return STORY_REGIONAL_EVIDENCE[foodCultureId];
}

/**
 * Return evidence safe for user-facing rendering.
 *
 * `deriveVerificationStatus` also catches a source that becomes stale after
 * confirmation, so the UI fails closed if the source metadata is changed.
 */
export function getVerifiedStoryRegionalEvidence(
  foodCultureId: string,
): StoryRegionalEvidence | undefined {
  const evidence = getStoryRegionalEvidence(foodCultureId);
  if (!evidence) return undefined;
  return deriveVerificationStatus(evidence.source, 'source') === 'verified'
    ? evidence
    : undefined;
}
