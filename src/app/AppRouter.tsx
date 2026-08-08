/**
 * Application route table (Issue #14).
 *
 * All feature routes live under one router. Features add their routes here and
 * never create their own root/router. Pages are lazy-loaded so Suspense-based
 * route-level loading (LoadingBoundary) is meaningful.
 */
import { lazy, type ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingBoundary } from './LoadingBoundary';
import { NotFoundPage } from './NotFoundPage';

const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const PokedexPage = lazy(() =>
  import('../pages/PokedexPage').then((m) => ({ default: m.PokedexPage })),
);
const MapPage = lazy(() => import('../pages/MapPage').then((m) => ({ default: m.MapPage })));
const FoodCulturePage = lazy(() =>
  import('../pages/FoodCulturePage').then((m) => ({ default: m.FoodCulturePage })),
);
const StoryPage = lazy(() => import('../pages/StoryPage').then((m) => ({ default: m.StoryPage })));
// Dev-only route: renders the shared UI foundation showcase. Not bundled in
// production builds (import.meta.env.DEV is statically replaced by Vite).
const UiShowcasePage = import.meta.env.DEV
  ? lazy(() => import('../pages/UiShowcasePage').then((m) => ({ default: m.UiShowcasePage })))
  : null;

function withBoundary(element: ReactNode) {
  return <LoadingBoundary>{element}</LoadingBoundary>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={withBoundary(<HomePage />)} />
      <Route path="/pokedex" element={withBoundary(<PokedexPage />)} />
      <Route path="/map" element={withBoundary(<MapPage />)} />
      <Route path="/food-cultures/:id" element={withBoundary(<FoodCulturePage />)} />
      <Route path="/story/:foodCultureId" element={withBoundary(<StoryPage />)} />
      <Route path="/story" element={withBoundary(<StoryPage />)} />
      {UiShowcasePage ? (
        <Route path="/_ui" element={withBoundary(<UiShowcasePage />)} />
      ) : null}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
