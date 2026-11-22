import type { Locale } from '../i18n';
import type { JourneyPresentation, ReferenceAssetId, SpotPresentation } from '../features/netlify-parity/content';
import type {
  LocalizedText, ReferenceSpotDetail, ResultLocation, RouteStats, RouteStepText,
  StorySpotReference,
} from '../features/netlify-parity/factual-presentation';
import { recordVerificationStatus } from '../lib/verification';
import type { DataOrigin, DataSource, VerificationStatus } from './model';
import { MUNICIPALITIES, type MunicipalityId } from './municipalities';

type VariantId = JourneyPresentation['routeVariants'][number]['id'];

/** One authored, serializable browse journey. See docs/journey-records.md. */
export interface JourneyRecord {
  municipalityId: MunicipalityId;
  journey: Omit<JourneyPresentation, 'sourceStatus' | 'matchPercent'>;
  routeName: LocalizedText;
  location: Record<Locale, ResultLocation>;
  variants: Partial<Record<VariantId, {
    steps: RouteStepText[];
    stats: Record<Locale, RouteStats>;
    guidance: LocalizedText;
  }>>;
  spots: Record<string, {
    presentation: SpotPresentation;
    detail: ReferenceSpotDetail;
    officialSource?: DataSource;
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

export function journeyFactStatus(record: JourneyRecord, path: string): VerificationStatus {
  const entry = Object.entries(record.facts)
    .filter(([key]) => path === key || path.startsWith(`${key}.`))
    .sort(([a], [b]) => b.length - a.length)[0];
  if (!entry) throw new Error(`Missing journey fact evidence: ${record.journey.id} / ${path}`);
  const { sourceIds, origin } = entry[1];
  return recordVerificationStatus(sourceIds.map((id) => {
    const source = record.sources[id];
    if (!source) throw new Error(`Missing journey source: ${record.journey.id} / ${id}`);
    return source;
  }), origin);
}

const pending: LocalizedText = { ja: '確認中', en: 'Confirmation pending', 'zh-TW': '確認中' };
const caution: LocalizedText = {
  ja: '掲載内容は未確認です。訪問前に出典の公式情報をご確認ください。',
  en: 'This information is unconfirmed. Check the official sources before visiting.',
  'zh-TW': '刊載內容尚未確認。造訪前請查看官方出處資訊。',
};

/** Use the existing no-photo state unless the record carries explicit media rights. */
function licensedMedia<T>(value: T, rights: JourneyRecord['mediaRights']): T {
  if (Array.isArray(value)) return value.map((item) => licensedMedia(item, rights)) as T;
  if (value === null || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).flatMap(([key, item]) => {
    const licensed = (id: ReferenceAssetId) => Boolean(rights?.[id]?.sourceUrl && rights[id]?.license);
    if (key === 'imageAssetId' || key === 'heroAssetId') return licensed(item) ? [[key, item]] : [];
    if (key === 'thumbnailAssetIds') return [[key, item.filter(licensed)]];
    return [[key, licensedMedia(item, rights)]];
  })) as T;
}

/** The only adapter: registration populates every map consumed by MOGU/Story/Route/Spot. */
export function adaptJourneyRecords(records: readonly JourneyRecord[]): JourneyRecordPresentation {
  const output: JourneyRecordPresentation = {
    currentJourneys: [], currentSpots: {}, routeNames: {}, resultLocation: {},
    routeStepText: {}, routeStats: {}, routeRegionGuidance: {}, referenceSpotDetails: {},
    storySpotGroups: {}, storyLocation: {}, chapterPoint: {},
  };
  for (const authored of records) {
    if (!MUNICIPALITIES.some(({ id }) => id === authored.municipalityId)) {
      throw new Error(`Unknown journey municipality: ${authored.municipalityId}`);
    }
    const record = licensedMedia(authored, authored.mediaRights);
    const id = record.journey.id;
    const statuses = Object.keys(record.facts).map((path) => journeyFactStatus(record, path));
    // The existing browse card has one unverified treatment for all non-verified facts.
    const sourceStatus = statuses.length > 0 && statuses.every((status) => status === 'verified')
      ? 'verified' : 'needs_confirmation';
    output.currentJourneys.push({ ...record.journey, sourceStatus });
    output.routeNames[id] = record.routeName;
    output.resultLocation[id] = record.location;
    output.storySpotGroups[id] = record.story.groups;
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
      const unconfirmed = Object.keys(record.facts)
        .filter((path) => path === spotPath || path.startsWith(`${spotPath}.`) || spotPath.startsWith(`${path}.`))
        .some((path) => journeyFactStatus(record, path) !== 'verified');
      if (unconfirmed) {
        if (!detail.tags.some((tag) => tag.tagId === 'confirmation-pending')) {
          detail.tags.push({ tagId: 'confirmation-pending', color: '#5D9BEF', label: pending });
        }
        if (detail.caution.length === 0) detail.caution.push(caution);
      }
      output.currentSpots[spotId] = presentation;
      output.referenceSpotDetails[spotId] = detail;
    }
  }
  return output;
}
