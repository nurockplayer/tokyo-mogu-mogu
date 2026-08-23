/** Query identity needed to decide whether the current Reference flow owns a URL. */
export interface JourneyQueryIdentity {
  candidateId: string;
  resultId: string;
  /** All current Result aliases accepted for this journey. */
  resultAliases?: readonly string[];
  routeId: string;
}

/** The current Reference journey fields needed for query identity derivation. */
export interface ReferenceJourneyQuerySource {
  id: string;
  foodCultureId: string;
  storyId: string;
  routeId: string;
}

export type JourneyQueryClassification =
  | 'reference'
  | 'legacy'
  | 'reference-conflict'
  | 'duplicate-conflict'
  | 'invalid';

const IDENTITY_FIELDS = ['candidateId', 'resultId', 'routeId'] as const;

/** Derive Reference Result aliases directly from the current demo inventory. */
export function referenceJourneyQueryIdentities(
  journeys: readonly ReferenceJourneyQuerySource[],
): JourneyQueryIdentity[] {
  return journeys.map((journey) => ({
    candidateId: journey.id,
    resultId: journey.foodCultureId,
    resultAliases: [...new Set([journey.foodCultureId, journey.storyId])],
    routeId: journey.routeId,
  }));
}

/**
 * Classify the optional Result/Route identity fields as one coherent journey.
 * Identical repeated identity values normalize to one value. Divergent values
 * fail closed only when every value is a known current identity; non-current
 * repetitions retain their historical first-value classification.
 * Context parameters (for example `from` and `backTo`) deliberately do not
 * participate, so historical navigation context stays compatible.
 */
export function classifyJourneyQuery(
  search: string,
  referenceJourneys: readonly JourneyQueryIdentity[],
  legacyJourneys: readonly JourneyQueryIdentity[],
): JourneyQueryClassification {
  const params = new URLSearchParams(search);
  const supplied: Array<readonly [(typeof IDENTITY_FIELDS)[number], string]> = [];
  const valueMatches = (
    journey: JourneyQueryIdentity,
    field: (typeof IDENTITY_FIELDS)[number],
    value: string,
  ) => {
    if (field === 'resultId') {
      return (journey.resultAliases ?? [journey.resultId]).includes(value);
    }
    return journey[field] === value;
  };

  for (const field of IDENTITY_FIELDS) {
    const values = [...new Set(params.getAll(field))];
    if (
      values.length > 1 &&
      values.every((value) =>
        referenceJourneys.some((journey) => valueMatches(journey, field, value)),
      )
    ) {
      return 'duplicate-conflict';
    }
    if (values.length === 0) continue;
    if (!values[0]) return 'invalid';
    supplied.push([field, values[0]]);
  }

  if (supplied.length === 0) return 'reference';

  const fieldMatches = (
    journey: JourneyQueryIdentity,
    [field, value]: (typeof supplied)[number],
  ) => valueMatches(journey, field, value);
  const matches = (journeys: readonly JourneyQueryIdentity[]) =>
    journeys.some((journey) =>
      supplied.every((field) => fieldMatches(journey, field)),
    );

  if (matches(referenceJourneys)) return 'reference';
  if (matches(legacyJourneys)) return 'legacy';
  if (
    supplied.every((field) =>
      referenceJourneys.some((journey) => fieldMatches(journey, field)),
    )
  ) {
    return 'reference-conflict';
  }
  return 'invalid';
}
