import { checkJourneyAdmission } from '../src/data/journey-admission';
import { JOURNEY_RECORDS } from '../src/data/journey-records';

const now = new Date();
const decisions = JOURNEY_RECORDS.map((record) => ({
  id: record.journey.id,
  ...checkJourneyAdmission(record, now),
}));
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(decisions.map(({ id, admitted }) => ({ id, admitted }))));
  process.exit(0);
}

let admittedCount = 0;
for (const { id, admitted, storyFailures, variants } of decisions) {
  if (admitted) admittedCount++;
  const reasons = [
    ...storyFailures,
    ...variants.filter(({ failures }) => failures.length).map(({ id, failures }) => `${id}: ${failures.join(', ')}`),
    ...(variants.length ? [] : ['missing route variant']),
  ];
  const detail = reasons.length ? ` — ${reasons.join('; ')}` : '';
  console.log(`${id} ${admitted ? 'admitted' : 'excluded'}${detail}`);
}
console.log(`Admitted ${admittedCount}/${JOURNEY_RECORDS.length}, excluded ${JOURNEY_RECORDS.length - admittedCount}`);
