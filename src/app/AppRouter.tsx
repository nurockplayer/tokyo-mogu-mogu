/**
 * Application route table (Issue #14).
 *
 * All feature routes live under one router. Features add their routes here and
 * never create their own root/router. Pages are lazy-loaded so Suspense-based
 * route-level loading (LoadingBoundary) is meaningful.
 *
 * The guided journey renders inside the compact PrototypeShell; Issue #252
 * exposes the established primary IA once the traveler reaches product
 * content. Directory/history/settings surfaces stay under AppShell.
 */
import { lazy, type ReactNode } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { AppShell, PrototypeShell } from './index';
import { LoadingBoundary } from './LoadingBoundary';
import { NotFoundPage } from './NotFoundPage';
import { JourneyNavigationManager } from './JourneyNavigationManager';
import { ReferenceApp } from '../features/netlify-parity/ReferenceApp';
import { demoJourneys, demoSpots } from '../features/netlify-parity/content';
import { DEMO_RECOMMENDATION_CANDIDATES } from '../data/demo-recommendation';
import {
  classifyJourneyQuery,
  referenceJourneyQueryIdentities,
  type JourneyQueryIdentity,
} from './reference-journey-query';

const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const LandingPage = lazy(() =>
  import('../pages/s0s3/LandingPage').then((m) => ({ default: m.LandingPage })),
);
const ExplorationWizardPage = lazy(() =>
  import('../pages/s0s3/ExplorationWizardPage').then((m) => ({ default: m.ExplorationWizardPage })),
);
const ResultPage = lazy(() =>
  import('../pages/s0s3/ResultPage').then((m) => ({ default: m.ResultPage })),
);
const FoodProfilePage = lazy(() =>
  import('../pages/s0s3/FoodProfilePage').then((m) => ({ default: m.FoodProfilePage })),
);
const PokedexPage = lazy(() =>
  import('../pages/PokedexPage').then((m) => ({ default: m.PokedexPage })),
);
const MapPage = lazy(() => import('../pages/MapPage').then((m) => ({ default: m.MapPage })));
const FoodCulturePage = lazy(() =>
  import('../pages/FoodCulturePage').then((m) => ({ default: m.FoodCulturePage })),
);
const RoutePage = lazy(() =>
  import('../pages/RoutePage').then((m) => ({ default: m.RoutePage })),
);
const SpotPage = lazy(() =>
  import('../pages/SpotPage').then((m) => ({ default: m.SpotPage })),
);
const StoryPage = lazy(() => import('../pages/StoryPage').then((m) => ({ default: m.StoryPage })));
// S7 support actions demo page (Issue #46). Other feature pages register their
// routes here; keep the `*` NotFound catch-all last.
const SupportPage = lazy(() =>
  import('../pages/SupportPage').then((m) => ({ default: m.SupportPage })),
);
const MyRoutePage = lazy(() =>
  import('../pages/MyRoutePage').then((m) => ({ default: m.MyRoutePage })),
);
// #95 primary-nav destination shells. Placeholder scaffolds only; the content
// is owned by #93 (Discover) / #94 (MOGU) / #81 (My).
const DiscoverPage = lazy(() =>
  import('../pages/DiscoverPage').then((m) => ({ default: m.DiscoverPage })),
);
const MoguPage = lazy(() =>
  import('../pages/MoguPage').then((m) => ({ default: m.MoguPage })),
);
const MyPage = lazy(() =>
  import('../pages/MyPage').then((m) => ({ default: m.MyPage })),
);
// #39 Stretch: My → Badges collection (not a primary-nav item).
const BadgesPage = lazy(() =>
  import('../pages/BadgesPage').then((m) => ({ default: m.BadgesPage })),
);
// Dev-only route: renders the shared UI foundation showcase. Not bundled in
// production builds (import.meta.env.DEV is statically replaced by Vite).
const UiShowcasePage = import.meta.env.DEV
  ? lazy(() => import('../pages/UiShowcasePage').then((m) => ({ default: m.UiShowcasePage })))
  : null;

function withBoundary(element: ReactNode) {
  return <LoadingBoundary>{element}</LoadingBoundary>;
}

export function AppRouter() {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const referenceJourneys = referenceJourneyQueryIdentities(demoJourneys);
  const legacyJourneys: JourneyQueryIdentity[] = DEMO_RECOMMENDATION_CANDIDATES
    .filter((candidate) => !referenceJourneys.some((journey) => journey.candidateId === candidate.id))
    .map((candidate) => ({
      candidateId: candidate.id,
      resultId: candidate.foodCultureId,
      routeId: candidate.journeyId ?? '',
    }))
    .filter((journey) => journey.routeId.length > 0);
  const journeyQuery = classifyJourneyQuery(search, referenceJourneys, legacyJourneys);
  const candidateId = searchParams.get('candidateId');
  const hasExplicitRouteId = Boolean(searchParams.get('routeId'));
  const hasUnknownCandidate =
    Boolean(candidateId) &&
    ![...referenceJourneys, ...legacyJourneys].some(
      (journey) => journey.candidateId === candidateId,
    );
  const failClosedJourneyQuery =
    journeyQuery === 'reference-conflict' || journeyQuery === 'duplicate-conflict';
  const invalidResultIdentity =
    pathname === '/explore/result' &&
    (journeyQuery === 'invalid' || failClosedJourneyQuery);
  const invalidRouteIdentity =
    pathname === '/route' &&
    (failClosedJourneyQuery ||
      (journeyQuery === 'invalid' && !hasExplicitRouteId && !hasUnknownCandidate));
  const referenceJourneyQuery = journeyQuery === 'reference';
  const referenceStoryPath =
    pathname === '/story' ||
    demoJourneys.some((journey) => pathname === `/story/${journey.storyId}`);
  const referenceSpotPath =
    pathname.startsWith('/spot/') &&
    Object.hasOwn(demoSpots, decodeURIComponent(pathname.slice('/spot/'.length)));
  const invalidSpotIdentity = referenceSpotPath && failClosedJourneyQuery;
  const referencePath =
    pathname === '/' ||
    pathname === '/food-profile' ||
    pathname === '/food-profile/edit' ||
    pathname === '/home' ||
    pathname === '/explore' ||
    (pathname === '/explore/result' && referenceJourneyQuery) ||
    referenceStoryPath ||
    (pathname === '/route' && referenceJourneyQuery) ||
    referenceSpotPath ||
    pathname === '/discover' ||
    pathname === '/mogu' ||
    pathname === '/my-route' ||
    pathname === '/my' ||
    pathname === '/badges';

  if (invalidResultIdentity) return <Navigate to="/explore/result" replace />;
  if (invalidRouteIdentity) return <Navigate to="/route" replace />;
  if (invalidSpotIdentity) return <Navigate to={pathname} replace />;

  if (referencePath) return <ReferenceApp />;

  return (
    <>
      <JourneyNavigationManager />
      <Routes>
      {/* Guided conversation + journey content (Issues #217 / #252). */}
      <Route element={<PrototypeShell />}>
        <Route path="/" element={withBoundary(<LandingPage />)} />
        <Route path="/food-profile" element={withBoundary(<FoodProfilePage mode="view" />)} />
        <Route path="/food-profile/edit" element={withBoundary(<FoodProfilePage mode="edit" />)} />
        <Route path="/explore" element={withBoundary(<ExplorationWizardPage />)} />
        <Route path="/explore/result" element={withBoundary(<ResultPage />)} />
        <Route path="/story/:foodCultureId" element={withBoundary(<StoryPage />)} />
        <Route path="/story" element={withBoundary(<StoryPage />)} />
        <Route path="/route" element={withBoundary(<RoutePage />)} />
        <Route path="/spot/:placeId" element={withBoundary(<SpotPage />)} />
      </Route>

      {/* Product directory, history, and settings surfaces. */}
      <Route element={<AppShell />}>
        <Route path="/home" element={withBoundary(<HomePage />)} />
        <Route path="/pokedex" element={withBoundary(<PokedexPage />)} />
        <Route path="/map" element={withBoundary(<MapPage />)} />
        <Route path="/food-cultures/:id" element={withBoundary(<FoodCulturePage />)} />
        <Route path="/support" element={withBoundary(<SupportPage />)} />
        <Route path="/my-route" element={withBoundary(<MyRoutePage />)} />
        {/* #95 primary-nav destination shells (content owned by #93 / #94 / #81) */}
        <Route path="/discover" element={withBoundary(<DiscoverPage />)} />
        <Route path="/mogu" element={withBoundary(<MoguPage />)} />
        <Route path="/my" element={withBoundary(<MyPage />)} />
        {/* #39 Stretch: My → Badges collection */}
        <Route path="/badges" element={withBoundary(<BadgesPage />)} />
        {UiShowcasePage ? (
          <Route path="/_ui" element={withBoundary(<UiShowcasePage />)} />
        ) : null}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      </Routes>
    </>
  );
}
