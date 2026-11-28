import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createServer } from 'vite';
import { JOURNEY_RECORDS } from '../src/data/journey-records';
import type { JourneyRecord } from '../src/data/journey-record';
import { MUNICIPALITIES } from '../src/data/municipalities';
import type { JourneyPresentation, ReferenceAssetId } from '../src/features/netlify-parity/content';

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]);
}

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => [key, ...strings(child)]);
  }
  return [];
}

function identities(journey: JourneyPresentation) {
  return [journey.id, journey.storyId, journey.routeId, journey.foodCultureId];
}

function spotIds(record: JourneyRecord) {
  return [
    ...Object.keys(record.spots),
    ...Object.values(record.story.groups).flatMap((group) => group.map(({ spotId }) => spotId)),
  ];
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalize(value: string) {
  return value
    .replace(/(?:%[\da-f]{2})+/gi, (encoded) => {
      try { return decodeURIComponent(encoded); } catch { return encoded; }
    })
    .replace(/\\u\{([\da-f]{1,6})\}|\\u([\da-f]{4})|\\x([\da-f]{2})/gi,
      (match, point, unit, byte) => {
        const code = parseInt(point ?? unit ?? byte, 16);
        return code <= 0x10ffff ? String.fromCodePoint(code) : match;
      })
    .replace(/&amp;/g, '&')
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&apos;|&#39;|\\'/g, "'")
    .replace(/\\(["/])/g, '$1');
}

function hash(content: Buffer | string) {
  return createHash('sha256').update(content).digest('hex');
}

function svgHash(svg: string) {
  return hash(svg.trim().replace(/\s+/g, ' ').replace(/"/g, "'"));
}

const dist = resolve(process.argv[2] ?? 'dist');
const artifactFiles = files(dist);
if (!artifactFiles.includes(join(dist, 'index.html'))) {
  throw new Error(`Missing ${dist}/index.html. Run pnpm build first.`);
}

const decisions = JSON.parse(execFileSync('pnpm', ['--silent', 'data:journey-admission', '--json'], {
  encoding: 'utf8',
})) as { id: string; admitted: boolean }[];
const admittedIds = new Set(decisions.filter(({ admitted }) => admitted).map(({ id }) => id));
const admitted = JOURNEY_RECORDS.filter(({ journey }) => admittedIds.has(journey.id));
const excluded = JOURNEY_RECORDS.filter(({ journey }) => !admittedIds.has(journey.id));

const loader = await createServer({ configFile: false, server: { middlewareMode: true, watch: null, ws: false } });
const { demoJourneys, demoSpots, demoData, referenceAssetFiles } = await (async () => {
  try {
    const factual = await loader.ssrLoadModule('/src/features/netlify-parity/factual-presentation.ts') as
      typeof import('../src/features/netlify-parity/factual-presentation');
    const { referenceAssetFiles } = await loader.ssrLoadModule('/src/features/netlify-parity/content.ts') as
      typeof import('../src/features/netlify-parity/content');
    const { FIELDWORK_MEDIA } = await loader.ssrLoadModule('/src/data/fieldwork-media.ts') as
      typeof import('../src/data/fieldwork-media');
    const {
      demoJourneys, demoSpots, homeJourneyCards, resultLocation, storySpotGroups, storyLocation,
      routeNames, routeStepText, routeStats, routeRegionGuidance, chapterPoint, referenceSpotDetails,
    } = factual;
    const demoData = [
      ...demoJourneys.flatMap(({ id, routeVariants }) => [
        homeJourneyCards[id], resultLocation[id], storySpotGroups[id], storyLocation[id], routeNames[id], chapterPoint[id],
        ...routeVariants.flatMap((variant) => {
          const key = `${id}:${variant.id}`;
          return [routeStepText[key], routeStats[key], routeRegionGuidance[key]];
        }),
      ]),
      Object.keys(demoSpots).map((id) => referenceSpotDetails[id]),
      Object.values(FIELDWORK_MEDIA).map(({ text }) => text),
    ];
    return { demoJourneys, demoSpots, demoData, referenceAssetFiles };
  } finally {
    await loader.close();
  }
})();

const admittedAliases = new Set(admitted.flatMap(({ journey }) => identities(journey)));
const admittedStories = new Set(admitted.map(({ journey }) => journey.storyId));
const admittedSpots = new Set(admitted.flatMap(spotIds));
const shared = new Set([...strings(admitted), ...admittedAliases, ...admittedSpots].map(normalize));
const deniedIds = new Set([
  ...excluded.flatMap((record) => [...identities(record.journey), ...spotIds(record)]),
  ...demoJourneys.flatMap(identities), ...Object.keys(demoSpots),
].filter((id) => !admittedAliases.has(id) && !admittedSpots.has(id)));
const deniedText = new Set(strings([excluded, demoJourneys, demoSpots, demoData])
  .map(normalize).filter((value) => value.length >= 12 && /\s|[^\x00-\x7f]/.test(value) && !shared.has(value)));
function markerPattern(markers: Set<string>) {
  const alternatives = [...markers].sort((a, b) => b.length - a.length).map(escapeRegex);
  return new RegExp(`(?<![\\p{L}\\p{N}_-])(?:${alternatives.join('|') || '(?!)'})(?![\\p{L}\\p{N}_-])`, 'gu');
}
const identityPattern = markerPattern(deniedIds);
const copyPattern = markerPattern(deniedText);

// Shell illustrations and branding are independent of journey admission.
const shell: ReferenceAssetId[] = [
  'welcomeCta', 'homeHero', 'logoFull', 'logoFace', 'forkIllustration', 'eatIllustration',
  'makeIllustration', 'buyIllustration', 'makerIllustration', 'originIllustration', 'learnIllustration',
  'explorationBackground', 'favicon', 'appleTouchIcon', 'openGraphImage',
];
const approvedAssets = new Set(shell);
for (const record of admitted) {
  const referenced = new Set(strings([record.journey, record.spots, record.story]));
  for (const [id, rights] of Object.entries(record.mediaRights ?? {})) {
    if (rights.sourceUrl && rights.license && referenced.has(id)) approvedAssets.add(id as ReferenceAssetId);
  }
}
const images = /\.(?:png|jpe?g|webp|svg|gif|avif|ico)$/i;
const imageSources = [
  ...[...approvedAssets].map((id) => resolve('src/features/netlify-parity', referenceAssetFiles[id])),
  ...files('src/assets/figma-296').filter((path) => images.test(path) && !/badge-(?:earned|store-card)\.png$/.test(path)),
  ...files('src/assets/figma-360').filter((path) => images.test(path) && !path.endsWith('/badge-yamame.png')),
  ...files('src/assets/figma').filter((path) => images.test(path) && !/(?:result-|story-hero)/.test(path)),
];
const approvedImages = new Set(imageSources.map((path) => hash(readFileSync(path))));
const approvedSvg = new Set(imageSources.filter((path) => path.endsWith('.svg'))
  .map((path) => svgHash(readFileSync(path, 'utf8'))));

const found = new Set<string>();
const findings = new Map<string, string[]>();
function flag(kind: string, path: string, detail = '') {
  const entries = findings.get(kind) ?? [];
  entries.push(detail ? `${path} (${detail})` : path);
  findings.set(kind, entries);
}

const contentFiles = /\.(?:[cm]?js|css|html?|xml|txt|json|svg|webmanifest)$/i;
for (const file of artifactFiles) {
  const path = file.slice(dist.length + 1);
  const bytes = readFileSync(file);
  const image = images.test(path);
  if (image && !approvedImages.has(hash(bytes))) flag('Image without admitted media or shell provenance', path);
  if (path.startsWith('data-review/')) flag('Editorial review output', path);
  const textual = contentFiles.test(path) || /(?:^|\/)_(?:redirects|headers)$/.test(path);
  if (!textual && !image && !/\.(?:woff2?|ttf|otf)$/i.test(path)) flag('Unexpected artifact file type', path);
  if (/\.json$/i.test(path)) flag('Unexpected standalone catalog data file', path);

  const raw = textual ? bytes.toString('utf8') : '';
  const body = normalize(raw);
  const contents = normalize(path) + '\n' + body;
  const ids = [...new Set(contents.match(identityPattern) ?? [])];
  const copy = [...new Set(contents.match(copyPattern) ?? [])];
  if (ids.length) flag('Excluded or demo identities', path, ids.slice(0, 8).join(', '));
  if (copy.length) flag('Excluded or demo text', path, `${copy.length} strings, e.g. ${JSON.stringify(copy[0].slice(0, 100))}`);
  if (!textual) continue;
  for (const [, token] of body.matchAll(/["'`]([a-z0-9-]+)["'`]/g)) {
    if (admittedIds.has(token)) found.add(token);
  }
  for (const [, route, id] of (path + '\n' + body).matchAll(/\/(story|spot)\/([a-z0-9-]+)/g)) {
    if (!(route === 'story' ? admittedStories : admittedSpots).has(id)) {
      flag('Alias outside admission', path, `/${route}/${id}`);
    }
  }
  for (const [, id] of body.matchAll(/[?&](?:candidateId|routeId|resultId)=([a-z0-9-]+)/g)) {
    if (!admittedAliases.has(id)) flag('Alias outside admission', path, id);
  }
  for (const [, key, id] of body.matchAll(/\b(storyId|routeId|foodCultureId|spotId)["']?\s*:\s*["']([a-z0-9-]+)["']/g)) {
    if (!(key === 'spotId' ? admittedSpots : admittedAliases).has(id)) {
      flag('Bundled identity outside admission', path, `${key}=${id}`);
    }
  }
  for (const [, base64] of body.matchAll(/data:image\/[\w.+-]+;base64,([\w+/=]+)/g)) {
    if (!approvedImages.has(hash(Buffer.from(base64, 'base64')))) flag('Unapproved inline image', path);
  }
  for (const [, , svg] of raw.matchAll(/(["'`])data:image\/svg\+xml,([^\n]*?)\1/g)) {
    if (!approvedSvg.has(svgHash(normalize(svg)))) flag('Unapproved inline SVG', path);
  }
}
for (const id of admittedIds) {
  if (!found.has(id)) flag('Admitted journey missing from artifact', id);
}

function coverage(key: (record: JourneyRecord) => string) {
  const counts = new Map<string, { admitted: number; total: number }>();
  for (const record of JOURNEY_RECORDS) {
    const id = key(record);
    const count = counts.get(id) ?? { admitted: 0, total: 0 };
    count.total++;
    if (admittedIds.has(record.journey.id)) count.admitted++;
    counts.set(id, count);
  }
  return counts;
}

const municipalities = coverage(({ municipalityId }) => municipalityId);
const cultures = coverage(({ journey }) => journey.foodCultureId);
console.log(`Admission: ${admitted.length}/${JOURNEY_RECORDS.length}; IDs found in artifact: ${found.size}.`);
console.log('Municipality coverage (admitted/reviewed):');
console.log(MUNICIPALITIES.map(({ id }) => {
  const count = municipalities.get(id);
  return `${id} ${count?.admitted ?? 0}/${count?.total ?? 0}`;
}).join(', '));
console.log('Food culture coverage (admitted/reviewed):');
for (const [status, ids] of Object.entries(Object.groupBy(
  [...cultures.keys()].sort(),
  (id) => `${cultures.get(id)!.admitted}/${cultures.get(id)!.total}`,
))) {
  console.log(`${status} (${ids.length}): ${ids.join(', ')}`);
}
for (const [kind, entries] of findings) {
  const unique = [...new Set(entries)];
  console.error(`${kind} [${unique.length}]\n  ${unique.slice(0, 6).join('\n  ')}`);
}
console.log(`Release artifact ${findings.size ? 'FAIL' : 'PASS'} (${artifactFiles.length} files inspected).`);
process.exitCode = findings.size ? 1 : 0;
