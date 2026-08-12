import { getFoodCultureById, getPlaceById, getSpotDetail, PILOT_JOURNEY } from '../src/data';
import { strings } from '../src/i18n/resources';
import { generateStakeholderReviewPacket } from '../src/lib/stakeholder-review-packet';

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const foodCultureId = argument('--food-culture');
const placeId = argument('--place');
if (!foodCultureId || !placeId) {
  console.error('Usage: pnpm review-packet --food-culture <id> --place <id>');
  process.exit(1);
}

const foodCulture = getFoodCultureById(foodCultureId);
const place = getPlaceById(placeId);
if (!foodCulture || !place || !place.foodCultureIds.includes(foodCulture.id)) {
  console.error('FoodCulture / Place pair was not found in live canonical data.');
  process.exit(1);
}

process.stdout.write(generateStakeholderReviewPacket({
  foodCulture,
  place,
  spot: getSpotDetail(place.id),
  generatedAt: new Date().toISOString().slice(0, 10),
  contextNoteJa: foodCulture.id === PILOT_JOURNEY.foodCultureId
    ? '奥多摩 × 東京わさびは 2026-08-23 Hackathon Demo Golden Path の確認対象です。Product scope を限定しません。'
    : undefined,
  storyVisibleCopy: foodCulture.id === PILOT_JOURNEY.foodCultureId
    ? [
        ['Story リード', strings.ja.dataStoryLead],
        ['作り手名', strings.ja.dataStoryMakerName],
        ['作り手の役割', strings.ja.dataStoryMakerRole],
        ['作り手注記', strings.ja.s4MakerNote],
        ['技・知恵', strings.ja.dataStoryCraft],
        ['現在の課題', strings.ja.dataStoryChallenge],
        ['編集注記', strings.ja.s4EditorialNote],
        ['応援の説明', strings.ja.dataStorySupport],
        ['Story CTA 補足', strings.ja.s4CtaSub],
      ].map(([label, value]) => ({ label, value }))
    : undefined,
}));
