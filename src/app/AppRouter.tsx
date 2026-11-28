import { lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadingBoundary } from './LoadingBoundary';
import { NotFoundPage } from './NotFoundPage';
import { ReferenceApp } from '../features/netlify-parity/ReferenceApp';
import { resolvePublishedJourneyLocation } from '../features/netlify-parity/journey-location';

const LegacyRoutes = import.meta.env.DEV || import.meta.env.MODE === 'data-review'
  ? lazy(() => import('./LegacyRoutes'))
  : null;

export function AppRouter() {
  const { pathname, search } = useLocation();
  const journeyLocation = resolvePublishedJourneyLocation(pathname, search);
  const referenceJourneyQuery =
    journeyLocation.status === 'default' || journeyLocation.status === 'resolved';
  const journeyIdentityPath =
    pathname === '/explore/result' ||
    pathname === '/route' ||
    pathname === '/story' ||
    pathname.startsWith('/story/') || pathname.startsWith('/spot/');
  if (journeyLocation.status === 'invalid' && journeyIdentityPath) {
    return <NotFoundPage />;
  }
  if (journeyIdentityPath && (journeyLocation.status === 'unavailable' ||
    (!LegacyRoutes && journeyLocation.status === 'not-current'))) {
    return <ReferenceApp journeyLocation={journeyLocation} unavailableJourney />;
  }
  const referencePath =
    pathname === '/' ||
    pathname === '/food-profile' ||
    pathname === '/food-profile/edit' ||
    pathname === '/home' ||
    pathname === '/explore' ||
    pathname === '/explore/result' ||
    journeyLocation.isReferenceStoryPath ||
    (pathname === '/route' && referenceJourneyQuery) ||
    journeyLocation.spot !== undefined ||
    pathname === '/discover' ||
    pathname === '/mogu' ||
    pathname === '/my-route' ||
    pathname === '/my' ||
    pathname === '/badges';

  if (referencePath) return <ReferenceApp journeyLocation={journeyLocation} />;

  return LegacyRoutes ? <LoadingBoundary><LegacyRoutes /></LoadingBoundary> : <NotFoundPage />;
}
