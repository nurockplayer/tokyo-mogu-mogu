/**
 * Client-side collection state store.
 *
 * Holds which food cultures are collected and which places have been visited.
 * State is persisted to localStorage (Issue #7) and restored on load.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { clearCollection, loadCollection, saveCollection } from './persistence';

export interface CollectedFoodCulture {
  foodCultureId: string;
  collectedAt: string;
}

export interface VisitedPlace {
  placeId: string;
  visitedAt: string;
}

export interface CollectionState {
  collected: CollectedFoodCulture[];
  visitedPlaces: VisitedPlace[];
}

export const emptyCollection: CollectionState = {
  collected: [],
  visitedPlaces: [],
};

interface CollectionContextValue extends CollectionState {
  /** True when the given food culture has been collected. */
  isCollected: (foodCultureId: string) => boolean;
  /** True when the given place has been visited. */
  isVisited: (placeId: string) => boolean;
  /** Adds a collection (idempotent: duplicate ids are ignored). */
  collect: (foodCultureId: string) => void;
  /** Marks a place visited (idempotent). */
  visitPlace: (placeId: string) => void;
  /** Resets all collected data (demo reset). */
  reset: () => void;
}

const CollectionContext = createContext<CollectionContextValue | null>(null);

export function CollectionProvider({ children }: { children: ReactNode }) {
  // Restore persisted progress once on first render (Issue #7).
  const [state, setState] = useState<CollectionState>(() => loadCollection() ?? emptyCollection);

  // Persist on every change (Issue #7).
  useEffect(() => {
    saveCollection(state);
  }, [state]);

  const isCollected = useCallback(
    (foodCultureId: string) =>
      state.collected.some((c) => c.foodCultureId === foodCultureId),
    [state.collected],
  );

  const isVisited = useCallback(
    (placeId: string) => state.visitedPlaces.some((v) => v.placeId === placeId),
    [state.visitedPlaces],
  );

  const collect = useCallback((foodCultureId: string) => {
    setState((prev) => {
      if (prev.collected.some((c) => c.foodCultureId === foodCultureId)) {
        return prev;
      }
      return {
        ...prev,
        collected: [
          ...prev.collected,
          { foodCultureId, collectedAt: new Date().toISOString() },
        ],
      };
    });
  }, []);

  const visitPlace = useCallback((placeId: string) => {
    setState((prev) => {
      if (prev.visitedPlaces.some((v) => v.placeId === placeId)) {
        return prev;
      }
      return {
        ...prev,
        visitedPlaces: [...prev.visitedPlaces, { placeId, visitedAt: new Date().toISOString() }],
      };
    });
  }, []);

  const reset = useCallback(() => {
    clearCollection();
    setState(emptyCollection);
  }, []);

  const value = useMemo(
    () => ({ ...state, isCollected, isVisited, collect, visitPlace, reset }),
    [state, isCollected, isVisited, collect, visitPlace, reset],
  );

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollection(): CollectionContextValue {
  const ctx = useContext(CollectionContext);
  if (!ctx) {
    throw new Error('useCollection must be used within CollectionProvider');
  }
  return ctx;
}
