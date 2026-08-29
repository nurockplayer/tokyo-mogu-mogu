import {
  currentJourneys,
  currentSpots,
  type JourneyPresentation,
  type SpotPresentation,
} from './content';

export type CurrentJourneyLocationResolution =
  | { status: 'default' }
  | { status: 'resolved'; journey: JourneyPresentation }
  | { status: 'invalid' }
  | { status: 'not-current' };

type JourneyConstraint = JourneyPresentation[];

function journeysForQueryIdentity(
  key: 'candidateId' | 'routeId' | 'resultId',
  value: string,
): JourneyConstraint {
  return currentJourneys.filter((journey) => {
    if (key === 'candidateId') return journey.id === value;
    if (key === 'routeId') return journey.routeId === value;
    return journey.foodCultureId === value || journey.storyId === value;
  });
}

function journeysForSpot(spot: SpotPresentation): JourneyConstraint {
  return currentJourneys.filter((journey) =>
    journey.routeVariants.some((variant) =>
      variant.steps.some((step) => step.spotId === spot.id),
    ),
  );
}

function preferredJourneyForSpot(
  spot: SpotPresentation,
  owners: JourneyConstraint,
): JourneyPresentation | undefined {
  return owners.find((journey) => journey.foodCultureId === spot.foodCultureId) ?? owners[0];
}

export function resolveCurrentJourneyLocation(
  pathname: string,
  search: string,
): CurrentJourneyLocationResolution {
  const constraints: JourneyConstraint[] = [];
  let spotDefault: JourneyPresentation | undefined;

  if (pathname.startsWith('/story/')) {
    const storyId = decodeURIComponent(pathname.slice('/story/'.length));
    const storyJourney = currentJourneys.find((journey) => journey.storyId === storyId);
    if (!storyJourney) return { status: 'not-current' };
    constraints.push([storyJourney]);
  } else if (pathname.startsWith('/spot/')) {
    const spotId = decodeURIComponent(pathname.slice('/spot/'.length));
    const spot = currentSpots[spotId];
    if (!spot) return { status: 'not-current' };
    const owners = journeysForSpot(spot);
    if (owners.length > 0) {
      constraints.push(owners);
      spotDefault = preferredJourneyForSpot(spot, owners);
    }
  }

  const params = new URLSearchParams(search);
  let hasUnknownQueryIdentity = false;
  for (const key of ['candidateId', 'routeId', 'resultId'] as const) {
    for (const value of params.getAll(key).filter(Boolean)) {
      const matches = journeysForQueryIdentity(key, value);
      if (matches.length === 0) hasUnknownQueryIdentity = true;
      else constraints.push(matches);
    }
  }

  if (hasUnknownQueryIdentity) {
    return constraints.length > 0 ? { status: 'invalid' } : { status: 'not-current' };
  }
  if (constraints.length === 0) return { status: 'default' };

  const matchingJourneys = currentJourneys.filter((journey) =>
    constraints.every((constraint) => constraint.includes(journey)),
  );
  if (matchingJourneys.length === 0) return { status: 'invalid' };
  if (matchingJourneys.length === 1) {
    return { status: 'resolved', journey: matchingJourneys[0] };
  }
  if (spotDefault && matchingJourneys.includes(spotDefault)) {
    return { status: 'resolved', journey: spotDefault };
  }
  return { status: 'invalid' };
}
