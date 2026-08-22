import {
  foodProfileDietaryState,
  type FoodProfile,
  type FoodProfileDietaryState,
} from '../lib/food-profile';

export type MyFoodProfileSummaryState = FoodProfileDietaryState | 'missing';

/** Keep My aligned with the durable profile's accepted three-state truth model. */
export function foodProfileSummaryState(
  profile: FoodProfile | null,
): MyFoodProfileSummaryState {
  return profile === null ? 'missing' : foodProfileDietaryState(profile);
}
