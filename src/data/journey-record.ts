import type { Locale } from '../i18n';
import type { JourneyPresentation, ReferenceAssetId, SpotPresentation } from '../features/netlify-parity/content';
import type {
  LocalizedText, ReferenceSpotDetail, ResultLocation, RouteStats, RouteStepText,
  StorySpotReference,
} from '../features/netlify-parity/factual-presentation';
import { recordVerificationStatus } from '../lib/verification';
import type { DataOrigin, DataSource, VerificationStatus } from './model';
import type { MunicipalityId } from './municipalities';

type VariantId = JourneyPresentation['routeVariants'][number]['id'];

/** One authored, serializable browse journey. See docs/journey-records.md. */
export interface JourneyRecord {
  municipalityId: MunicipalityId;
  /** Derived from the record's food culture and story. True when an alcoholic drink is a subject. */
  alcoholThemed: boolean;
  journey: Omit<JourneyPresentation, 'sourceStatus' | 'matchPercent'>;
  routeName: LocalizedText;
  location: Record<Locale, ResultLocation>;
  variants: Partial<Record<VariantId, {
    steps: RouteStepText[];
    stats: Record<Locale, RouteStats>;
    guidance: LocalizedText;
    /** Official access evidence for publication admission. */
    arrival?: {
      kind: 'station' | 'bus-stop' | 'ferry-terminal';
      name: LocalizedText;
      spotId: string;
      sourceId: string;
    };
  }>>;
  spots: Record<string, {
    presentation: SpotPresentation;
    detail: ReferenceSpotDetail;
    officialSource?: DataSource;
    /** Dated official visitor page recorded for publication admission. */
    visitorSourceId?: string;
  }>;
  story: {
    groups: { nearby: StorySpotReference[]; nature: StorySpotReference[] };
    location: Record<Locale, { region: string; station: string }>;
    point?: Record<Locale, { title: string; body: string }>;
  };
  sources: Record<string, DataSource>;
  /** Dot paths name a fact or a group sharing evidence; narrower paths override. */
  facts: Record<string, { sourceIds: string[]; origin: DataOrigin }>;
  mediaRights?: Partial<Record<ReferenceAssetId, { sourceUrl: string; license: string }>>;
}

export interface JourneyRecordPresentation {
  currentJourneys: JourneyPresentation[];
  currentSpots: Record<string, SpotPresentation>;
  routeNames: Record<string, LocalizedText>;
  resultLocation: Record<string, Record<Locale, ResultLocation>>;
  routeStepText: Record<string, RouteStepText[]>;
  routeStats: Record<string, Record<Locale, RouteStats>>;
  routeRegionGuidance: Record<string, LocalizedText>;
  referenceSpotDetails: Record<string, ReferenceSpotDetail>;
  storySpotGroups: Record<string, JourneyRecord['story']['groups']>;
  storyLocation: Record<string, JourneyRecord['story']['location']>;
  chapterPoint: Record<string, NonNullable<JourneyRecord['story']['point']>>;
}

export function findFact<T>(facts: Record<string, T>, path: string): T | undefined {
  while (!Object.hasOwn(facts, path)) {
    const separator = path.lastIndexOf('.');
    if (separator === -1) return undefined;
    path = path.slice(0, separator);
  }
  return facts[path];
}

function factStatus(record: JourneyRecord, { sourceIds, origin }: JourneyRecord['facts'][string]): VerificationStatus {
  return recordVerificationStatus(sourceIds.map((id) => {
    const source = record.sources[id];
    if (!source) throw new Error(`Missing journey source: ${record.journey.id} / ${id}`);
    return source;
  }), origin);
}

export function resolveJourneyFact(record: JourneyRecord, path: string) {
  const fact = findFact(record.facts, path);
  if (fact) return { ...fact, status: factStatus(record, fact) };
}

export function journeyFactStatus(record: JourneyRecord, path: string): VerificationStatus {
  const fact = resolveJourneyFact(record, path);
  if (!fact) throw new Error(`Missing journey fact evidence: ${record.journey.id} / ${path}`);
  return fact.status;
}

const pending: LocalizedText = { ja: '確認中', en: 'Confirmation pending', 'zh-TW': '確認中' };
const caution: LocalizedText = {
  ja: '掲載内容は未確認です。訪問前に出典の公式情報をご確認ください。',
  en: 'This information is unconfirmed. Check the official sources before visiting.',
  'zh-TW': '刊載內容尚未確認。造訪前請查看官方出處資訊。',
};

/** The only adapter: registration populates every map consumed by MOGU/Story/Route/Spot. */
export function adaptJourneyRecords(records: readonly JourneyRecord[]): JourneyRecordPresentation {
  const output: JourneyRecordPresentation = {
    currentJourneys: [], currentSpots: {}, routeNames: {}, resultLocation: {},
    routeStepText: {}, routeStats: {}, routeRegionGuidance: {}, referenceSpotDetails: {},
    storySpotGroups: {}, storyLocation: {}, chapterPoint: {},
  };
  for (const record of records) {
    const licensed = (assetId: ReferenceAssetId | undefined) => {
      const rights = assetId && record.mediaRights?.[assetId];
      return Boolean(rights?.sourceUrl && rights.license);
    };
    const filterImage = <T extends { imageAssetId?: ReferenceAssetId }>(value: T): T => {
      const filtered = { ...value };
      if (!licensed(filtered.imageAssetId)) delete filtered.imageAssetId;
      return filtered;
    };
    const journey = filterImage(record.journey);
    if (!licensed(journey.heroAssetId)) delete journey.heroAssetId;
    const id = journey.id;
    const factStatuses = Object.entries(record.facts).map(([path, fact]) => [path, factStatus(record, fact)] as const);
    const statusByPath = Object.fromEntries(factStatuses);
    // The existing browse card has one unverified treatment for all non-verified facts.
    const sourceStatus = factStatuses.length > 0 && factStatuses.every(([, status]) => status === 'verified')
      ? 'verified' : 'needs_confirmation';
    output.currentJourneys.push({
      ...journey,
      sourceStatus,
      routeVariants: journey.routeVariants.map((variant) => ({
        ...filterImage(variant), steps: variant.steps.map(filterImage),
      })),
    });
    output.routeNames[id] = record.routeName;
    output.resultLocation[id] = record.location;
    output.storySpotGroups[id] = {
      nearby: record.story.groups.nearby.map(filterImage),
      nature: record.story.groups.nature.map(filterImage),
    };
    output.storyLocation[id] = record.story.location;
    if (record.story.point) output.chapterPoint[id] = record.story.point;
    for (const variant of record.journey.routeVariants) {
      const metadata = record.variants[variant.id];
      if (!metadata) throw new Error(`Missing journey route variant: ${id} / ${variant.id}`);
      const key = `${id}:${variant.id}`;
      output.routeStepText[key] = metadata.steps;
      output.routeStats[key] = metadata.stats;
      output.routeRegionGuidance[key] = metadata.guidance;
    }
    for (const [spotId, { presentation, detail }] of Object.entries(record.spots)) {
      const spotPath = `spots.${spotId}`;
      const spotStatus = findFact(statusByPath, spotPath);
      const unconfirmed = (spotStatus !== undefined && spotStatus !== 'verified')
        || factStatuses.some(([path, status]) => path.startsWith(`${spotPath}.`) && status !== 'verified');
      output.currentSpots[spotId] = {
        ...filterImage(presentation), thumbnailAssetIds: presentation.thumbnailAssetIds.filter(licensed),
      };
      output.referenceSpotDetails[spotId] = unconfirmed ? {
        ...detail,
        tags: detail.tags.some((tag) => tag.tagId === 'confirmation-pending')
          ? detail.tags : [...detail.tags, { tagId: 'confirmation-pending', color: '#5D9BEF', label: pending }],
        caution: detail.caution.length > 0 ? detail.caution : [caution],
      } : detail;
    }
  }
  return output;
}
