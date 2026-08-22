import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType, type Location } from 'react-router-dom';

/** Link state for an explicit in-product Back control that should restore context. */
export const journeyScrollRestoreState = { tmmRestoreScroll: true } as const;

const positionsByKey = new Map<string, number>();
const positionsByHref = new Map<string, number>();

function hrefFor(location: Pick<Location, 'pathname' | 'search' | 'hash'>): string {
  return `${location.pathname}${location.search}${location.hash}`;
}

function restoreRequested(state: unknown): boolean {
  return Boolean(
    state &&
      typeof state === 'object' &&
      'tmmRestoreScroll' in state &&
      state.tmmRestoreScroll === true,
  );
}

/**
 * Owns document scroll across the focused PrototypeShell journey.
 *
 * React Router keeps the document scroll offset when Links replace one long
 * page with another. That previously opened Result, Story, and Spot halfway
 * through their content. Forward navigation now starts at the new hero, while
 * browser Back and the explicit journey Back links restore the prior context.
 */
export function JourneyScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previous = useRef({ key: location.key, href: hrefFor(location) });

  useLayoutEffect(() => {
    const original = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = original;
    };
  }, []);

  useLayoutEffect(() => {
    const current = { key: location.key, href: hrefFor(location) };
    const last = previous.current;
    if (last.key === current.key) return;

    positionsByKey.set(last.key, window.scrollY);
    positionsByHref.set(last.href, window.scrollY);

    const shouldRestore = navigationType === 'POP' || restoreRequested(location.state);
    const nextY = shouldRestore
      ? positionsByKey.get(current.key) ?? positionsByHref.get(current.href) ?? 0
      : 0;

    window.scrollTo({ top: nextY, left: 0, behavior: 'auto' });
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: nextY, left: 0, behavior: 'auto' });
    });
    previous.current = current;

    return () => window.cancelAnimationFrame(frame);
  }, [location, navigationType]);

  return null;
}
