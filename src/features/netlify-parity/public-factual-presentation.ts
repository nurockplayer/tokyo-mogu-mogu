import { adaptJourneyRecords } from '../../data/journey-record';
import { JOURNEY_RECORDS } from '../../data/journey-records';

export {
  currentJourneys, currentSpots, routeNames, resultLocation, routeStepText,
  routeStats, routeRegionGuidance, referenceSpotDetails, storySpotGroups,
  storyLocation, chapterPoint,
};

const {
  currentJourneys, currentSpots, routeNames, resultLocation, routeStepText,
  routeStats, routeRegionGuidance, referenceSpotDetails, storySpotGroups,
  storyLocation, chapterPoint,
} = adaptJourneyRecords(JOURNEY_RECORDS);
