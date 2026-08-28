import {
  demoJourneys,
  demoSpots,
  storySpotGroups,
} from '../features/netlify-parity/factual-presentation';

export type CurrentProductFactualEntityType = 'Spot' | 'Story' | 'Route';

export interface CurrentProductFactualEntity {
  id: string;
  type: CurrentProductFactualEntityType;
}

const TYPE_ORDER: Readonly<Record<CurrentProductFactualEntityType, number>> = {
  Spot: 1,
  Story: 2,
  Route: 3,
};

/**
 * Derive the factual review boundary from the two journeys currently exposed
 * by Product presentation records. This projection carries identity only; it
 * never copies displayed or canonical facts into Board metadata.
 */
export function buildCurrentProductFactualInventory(): CurrentProductFactualEntity[] {
  const spotIds = new Set<string>();

  for (const journey of demoJourneys) {
    for (const variant of journey.routeVariants) {
      for (const step of variant.steps) spotIds.add(step.spotId);
    }
    const groups = storySpotGroups[journey.id];
    for (const reference of [...(groups?.nearby ?? []), ...(groups?.nature ?? [])]) {
      spotIds.add(reference.spotId);
    }
  }

  const entities: CurrentProductFactualEntity[] = [...spotIds].map((id) => {
    if (!demoSpots[id]) {
      throw new Error(`Missing current Spot presentation record: ${id}`);
    }
    return { id, type: 'Spot' };
  });

  for (const journey of demoJourneys) {
    entities.push(
      { id: journey.storyId, type: 'Story' },
      { id: journey.routeId, type: 'Route' },
    );
  }

  const entitiesById = new Map<string, CurrentProductFactualEntity>();
  for (const entity of entities) {
    const current = entitiesById.get(entity.id);
    if (current && current.type !== entity.type) {
      throw new Error(`Current Product entity ${entity.id} has multiple review types.`);
    }
    entitiesById.set(entity.id, entity);
  }

  return [...entitiesById.values()].sort((left, right) =>
    TYPE_ORDER[left.type] - TYPE_ORDER[right.type]
    || left.id.localeCompare(right.id));
}

export const CURRENT_PRODUCT_FACTUAL_INVENTORY = buildCurrentProductFactualInventory();
