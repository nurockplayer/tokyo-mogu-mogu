/** Query identity needed to decide whether the current Reference flow owns a URL. */
export interface JourneyQueryIdentity {
  candidateId: string;
  resultId: string;
  routeId: string;
}

export type JourneyQueryClassification = 'reference' | 'legacy' | 'invalid';

const IDENTITY_FIELDS = ['candidateId', 'resultId', 'routeId'] as const;

/**
 * Classify the optional Result/Route identity fields as one coherent journey.
 * Context parameters (for example `from` and `backTo`) deliberately do not
 * participate, so historical navigation context stays compatible.
 */
export function classifyJourneyQuery(
  search: string,
  referenceJourneys: readonly JourneyQueryIdentity[],
  legacyJourneys: readonly JourneyQueryIdentity[],
): JourneyQueryClassification {
  const params = new URLSearchParams(search);
  const supplied = IDENTITY_FIELDS.flatMap((field) => {
    if (!params.has(field)) return [];
    const value = params.get(field);
    return value ? [[field, value] as const] : [];
  });

  if (supplied.length !== IDENTITY_FIELDS.filter((field) => params.has(field)).length) {
    return 'invalid';
  }

  if (supplied.length === 0) return 'reference';

  const matches = (journeys: readonly JourneyQueryIdentity[]) =>
    journeys.some((journey) => supplied.every(([field, value]) => journey[field] === value));

  if (matches(referenceJourneys)) return 'reference';
  if (matches(legacyJourneys)) return 'legacy';
  return 'invalid';
}
