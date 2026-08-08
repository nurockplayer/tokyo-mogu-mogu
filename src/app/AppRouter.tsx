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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
