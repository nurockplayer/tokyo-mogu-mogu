#!/usr/bin/env node
/**
 * Regenerate the committed GTFS fixture modules from an unzipped real GTFS
 * snapshot (see scripts/ingest-gtfs/fetch-gtfs.mjs and README.md).
 *
 * Usage:
 *   node scripts/ingest-gtfs/generate-fixture.mjs --in /tmp/ntbus-gtfs --out src/data/gtfs-fixture
 *
 * Selection rule: keep stops within ~3 km of 奥多摩駅 (35.8094, 139.0995),
 * then the trips / routes / stop_times that touch those stops. The output
 * matches the same GtfsDataset shape that `src/lib/gtfs.ts` reads, so feature
 * code does not change when the dataset is refreshed.
 *
 * Built-ins only — no dependencies.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const args = process.argv.slice(2);
const inDir = readArg(args, '--in') ?? '.';
const outDir = readArg(args, '--out') ?? './src/data/gtfs-fixture';

// 奥多摩駅 reference + 3 km selection radius.
const CENTER_LAT = 35.8094;
const CENTER_LNG = 139.0995;
const RADIUS_METERS = 3000;

const EARTH_RADIUS = 6371000;
function toRad(d) {
  return (d * Math.PI) / 180;
}
function distanceMeters(lat1, lng1, lat2, lng2) {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS * Math.asin(Math.sqrt(a));
}

// ---------------------------------------------------------------------------
// CSV parsing (GTFS-JP files are UTF-8 with a BOM; delimiter comma or tab).
// ---------------------------------------------------------------------------
function parseCsv(text) {
  // Strip a UTF-8 BOM (U+FEFF) if present, then split lines.
  const cleaned = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
  const lines = cleaned.split(/\r?\n/).filter((l) => l.trim() !== '');
  if (lines.length === 0) return { header: [], records: [] };
  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const header = splitLine(lines[0], delimiter).map((h) => h.trim());
  const records = lines.slice(1).map((line) => {
    const cells = splitLine(line, delimiter);
    const rec = {};
    header.forEach((h, i) => {
      rec[h] = (cells[i] ?? '').trim();
    });
    return rec;
  });
  return { header, records };
}

function splitLine(line, delimiter) {
  // Handles quoted fields (commas inside quotes). Good enough for GTFS files.
  const out = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === delimiter) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

// ---------------------------------------------------------------------------
// Load and normalize the four required tables.
// ---------------------------------------------------------------------------
async function readRecords(name) {
  const text = await readFile(join(inDir, name), 'utf8');
  return parseCsv(text).records;
}

const stops = (await readRecords('stops.txt')).map((r) => ({
  stopId: r.stop_id,
  stopName: r.stop_name,
  latitude: Number(r.stop_lat),
  longitude: Number(r.stop_lon),
}));
const routes = (await readRecords('routes.txt')).map((r) => ({
  routeId: r.route_id,
  routeShortName: r.route_short_name ?? '',
  routeLongName: r.route_long_name ?? '',
}));
const trips = (await readRecords('trips.txt')).map((r) => ({
  tripId: r.trip_id,
  routeId: r.route_id,
  serviceId: r.service_id,
  tripHeadsign: r.trip_headsign || undefined,
}));
const stopTimes = (await readRecords('stop_times.txt')).map((r) => ({
  tripId: r.trip_id,
  stopId: r.stop_id,
  arrivalMin: toMinutes(r.arrival_time),
  departureMin: toMinutes(r.departure_time),
  stopSequence: Number(r.stop_sequence),
}));

function toMinutes(gtfsTime) {
  const [h, m, s] = gtfsTime.split(':').map(Number);
  const minutes = (h || 0) * 60 + (m || 0) + ((s || 0) / 60);
  return Math.round(minutes);
}

// ---------------------------------------------------------------------------
// Select the subset around 奥多摩駅.
// ---------------------------------------------------------------------------
const nearbyStopIds = new Set(
  stops
    .filter((s) => distanceMeters(CENTER_LAT, CENTER_LNG, s.latitude, s.longitude) <= RADIUS_METERS)
    .map((s) => s.stopId),
);
const tripIds = new Set(stopTimes.filter((st) => nearbyStopIds.has(st.stopId)).map((st) => st.tripId));
const routeIds = new Set(trips.filter((t) => tripIds.has(t.tripId)).map((t) => t.routeId));

const stopsOut = stops.filter((s) => nearbyStopIds.has(s.stopId));
const tripsOut = trips.filter((t) => tripIds.has(t.tripId));
const routesOut = routes.filter((r) => routeIds.has(r.routeId));
const stopTimesOut = stopTimes.filter((st) => tripIds.has(st.tripId) && nearbyStopIds.has(st.stopId));

console.log(`Stops: ${stops.length} -> ${stopsOut.length}`);
console.log(`Routes: ${routes.length} -> ${routesOut.length}`);
console.log(`Trips: ${trips.length} -> ${tripsOut.length}`);
console.log(`Stop times: ${stopTimes.length} -> ${stopTimesOut.length}`);

// ---------------------------------------------------------------------------
// Write the TS modules (same GtfsDataset shape as src/lib/gtfs.ts).
// ---------------------------------------------------------------------------
await mkdir(outDir, { recursive: true });

await writeFile(
  join(outDir, 'stops.ts'),
  header('stops', 'GTFS `stops.txt` subset')
    + `import type { GtfsStop } from '../../lib/gtfs';\n\n`
    + `export const GTFS_FIXTURE_STOPS: GtfsStop[] = ${ts(stopsOut)};\n`,
);

await writeFile(
  join(outDir, 'routes.ts'),
  header('routes', 'GTFS `routes.txt` subset')
    + `import type { GtfsRoute } from '../../lib/gtfs';\n\n`
    + `export const GTFS_FIXTURE_ROUTES: GtfsRoute[] = ${ts(routesOut)};\n`,
);

await writeFile(
  join(outDir, 'trips.ts'),
  header('trips', 'GTFS `trips.txt` subset')
    + `import type { GtfsTrip } from '../../lib/gtfs';\n\n`
    + `export const GTFS_FIXTURE_TRIPS: GtfsTrip[] = ${ts(tripsOut)};\n`,
);

await writeFile(
  join(outDir, 'stop_times.ts'),
  header('stop_times', 'GTFS `stop_times.txt` subset')
    + `import type { GtfsStopTime } from '../../lib/gtfs';\n\n`
    + `export const GTFS_FIXTURE_STOP_TIMES: GtfsStopTime[] = ${ts(stopTimesOut)};\n`,
);

await writeFile(
  join(outDir, 'index.ts'),
  header('index', 'fixture assembler')
    + `import type { GtfsDataset } from '../../lib/gtfs';\n`
    + `import { GTFS_FIXTURE_STOPS } from './stops';\n`
    + `import { GTFS_FIXTURE_ROUTES } from './routes';\n`
    + `import { GTFS_FIXTURE_TRIPS } from './trips';\n`
    + `import { GTFS_FIXTURE_STOP_TIMES } from './stop_times';\n\n`
    + `/** Verified GTFS snapshot around 奥多摩駅 (regenerated by scripts/ingest-gtfs). */\n`
    + `export const GTFS_FIXTURE: GtfsDataset = {\n`
    + `  stops: GTFS_FIXTURE_STOPS,\n`
    + `  routes: GTFS_FIXTURE_ROUTES,\n`
    + `  trips: GTFS_FIXTURE_TRIPS,\n`
    + `  stopTimes: GTFS_FIXTURE_STOP_TIMES,\n`
    + `  origin: 'source',\n`
    + `  sourceLabel: '西東京バス（公共交通オープンデータセンター）',\n`
    + `  retrievedAt: '${new Date().toISOString().slice(0, 10)}',\n`
    + `};\n`,
);

console.log(`Wrote fixture to ${outDir}`);
console.log('Reminder: update docs/nishi-tokyo-bus-gtfs-source.md with the retrieval date.');

function header(name, desc) {
  return (
    '/**\n'
    + ` * GTFS fixture — ${name} (${desc}).\n`
    + ' *\n'
    + ' * Generated by scripts/ingest-gtfs/generate-fixture.mjs from the real\n'
    + ' * 西東京バス GTFS (公共交通オープンデータセンター, dataset nishi_tokyo_bus_nt_bus).\n'
    + ' * See docs/nishi-tokyo-bus-gtfs-source.md for source and license.\n'
    + ' */\n'
  );
}

function ts(value) {
  return JSON.stringify(value, null, 2);
}

function readArg(argv, flag) {
  const i = argv.indexOf(flag);
  return i >= 0 ? argv[i + 1] : undefined;
}
