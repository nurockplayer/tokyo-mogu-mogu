import { getPlaceById } from '../../data';
import {
  currentJourneys,
  currentSpots,
  type JourneyPresentation,
  type SpotPresentation,
} from './content';
import { journeyRecord, publishJourney } from './journey-publication';

interface JourneyLocationContext {
  isReferenceStoryPath: boolean;
  spot?: SpotPresentation;
  hasJourneyQuery: boolean;
  fromMy: boolean;
}

export type CurrentJourneyLocationResolution = JourneyLocationContext & (
  | { status: 'default' }
  | { status: 'resolved'; journey: JourneyPresentation }
  | { status: 'invalid' }
  | { status: 'not-current' }
  | { status: 'unavailable' }
);

type JourneyConstraint = JourneyPresentation[];

export function decodeJourneyPathIdentity(encodedIdentity: string): string | undefined {
  try {
    return decodeURIComponent(encodedIdentity);
  } catch {
    return undefined;
  }
}

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
  const params = new URLSearchParams(search);
  const context: JourneyLocationContext = {
    isReferenceStoryPath: pathname === '/story',
    hasJourneyQuery: false,
    fromMy: params.get('from') === 'my',
  };
  const constraints: JourneyConstraint[] = [];
  let spotDefault: JourneyPresentation | undefined;

  if (pathname.startsWith('/story/')) {
    const storyId = decodeJourneyPathIdentity(pathname.slice('/story/'.length));
    if (storyId === undefined) return { ...context, status: 'invalid' };
    const storyJourney = currentJourneys.find((journey) => journey.storyId === storyId);
    if (!storyJourney) return { ...context, status: 'not-current' };
    context.isReferenceStoryPath = pathname === `/story/${storyJourney.storyId}`;
    constraints.push([storyJourney]);
  } else if (pathname.startsWith('/spot/')) {
    const spotId = decodeJourneyPathIdentity(pathname.slice('/spot/'.length));
    if (spotId === undefined) return { ...context, status: 'invalid' };
    const spot = currentSpots[spotId];
    if (!spot) return { ...context, status: 'not-current' };
    if (Object.hasOwn(currentSpots, spotId)) context.spot = spot;
    const owners = journeysForSpot(spot);
    if (owners.length > 0) {
      constraints.push(owners);
      spotDefault = preferredJourneyForSpot(spot, owners);
    }
  }

  let hasUnknownQueryIdentity = false;
  for (const key of ['candidateId', 'routeId', 'resultId'] as const) {
    for (const value of params.getAll(key).filter(Boolean)) {
      context.hasJourneyQuery = true;
      const matches = journeysForQueryIdentity(key, value);
      if (matches.length === 0) hasUnknownQueryIdentity = true;
      else constraints.push(matches);
    }
  }

  if (hasUnknownQueryIdentity) {
    return { ...context, status: constraints.length > 0 ? 'invalid' : 'not-current' };
  }
  if (constraints.length === 0) return { ...context, status: 'default' };

  const matchingJourneys = currentJourneys.filter((journey) =>
    constraints.every((constraint) => constraint.includes(journey)),
  );
  if (matchingJourneys.length === 1) {
    return { ...context, status: 'resolved', journey: matchingJourneys[0] };
  }
  if (spotDefault && matchingJourneys.includes(spotDefault)) {
    return { ...context, status: 'resolved', journey: spotDefault };
  }
  return { ...context, status: 'invalid' };
}

export function resolvePublishedJourneyLocation(pathname: string, search: string, now = new Date()): CurrentJourneyLocationResolution {
  const location = resolveCurrentJourneyLocation(pathname, search);
  const spotId = location.spot?.id;
  if (location.status !== 'resolved' && !(location.status === 'default' && spotId)) return location;
  const journey = location.status === 'resolved' ? location.journey : currentJourneys.find((candidate) =>
    spotId && journeyRecord(candidate.id)?.spots[spotId],
  );
  const record = journey && journeyRecord(journey.id);
  if (!journey || !record) return location;
  const published = publishJourney(journey, now);
  if (!published) {
    // A standalone canonical Spot can also appear on an excluded journey.
    if (spotId && !location.hasJourneyQuery && getPlaceById(spotId)) {
      return { ...location, status: 'default' };
    }
    return { ...location, status: 'unavailable' };
  }
  if (spotId && !published.routeVariants.some(({ steps }) => steps.some((step) => step.spotId === spotId)) &&
    !Object.values(record.story.groups).some((group) => group.some((spot) => spot.spotId === spotId))) {
    return { ...location, status: 'unavailable' };
  }
  return { ...location, status: 'resolved', journey: published };
}
