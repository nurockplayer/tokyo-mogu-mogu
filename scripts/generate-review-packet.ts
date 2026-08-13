import { getFoodCultureById, getPlaceById, getSpotDetail } from '../src/data';
import { generateStakeholderReviewPacket } from '../src/lib/stakeholder-review-packet';

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const foodCultureId = argument('--food-culture');
const placeId = argument('--place');
if (!foodCultureId || !placeId) {
  console.error('Usage: pnpm review-packet --food-culture <id> --place <id> [--context-note <ja text>]');
  process.exit(1);
}

const foodCulture = getFoodCultureById(foodCultureId);
const place = getPlaceById(placeId);
if (!foodCulture || !place || !place.foodCultureIds.includes(foodCulture.id)) {
  console.error('FoodCulture / Place pair was not found in live canonical data.');
  process.exit(1);
}

// Story narrative and municipality census evidence resolve through the same
// canonical `storyContent` / municipality data contract StoryPage renders
// (see `resolveStoryEvidence`). The generator never infers demo scope from
// record identity: any demo-scoped disclaimer is caller-supplied via
// `--context-note`.
process.stdout.write(generateStakeholderReviewPacket({
  foodCulture,
  place,
  spot: getSpotDetail(place.id),
  generatedAt: new Date().toISOString().slice(0, 10),
  contextNoteJa: argument('--context-note'),
}));
