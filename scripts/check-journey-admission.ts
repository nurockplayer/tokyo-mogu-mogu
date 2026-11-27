import { checkJourneyAdmission } from '../src/data/journey-admission';
import { JOURNEY_RECORDS } from '../src/data/journey-records';

let admittedCount = 0;
for (const record of JOURNEY_RECORDS) {
  const { admitted, storyFailures, variants } = checkJourneyAdmission(record);
  if (admitted) admittedCount++;
  const reasons = [
    ...storyFailures,
    ...variants.filter(({ failures }) => failures.length).map(({ id, failures }) => `${id}: ${failures.join(', ')}`),
    ...(variants.length ? [] : ['missing route variant']),
  ];
  const detail = reasons.length ? ` — ${reasons.join('; ')}` : '';
  console.log(`${record.journey.id} ${admitted ? 'admitted' : 'excluded'}${detail}`);
}
console.log(`Admitted ${admittedCount}/${JOURNEY_RECORDS.length}, excluded ${JOURNEY_RECORDS.length - admittedCount}`);
