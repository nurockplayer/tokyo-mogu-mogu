/**
 * Route-level scroll and focus continuity for the accountless journey.
 *
 * React Router deliberately leaves scroll restoration to the application. The
 * Golden Path contains long editorial pages, so carrying a deep scroll offset
 * into the next page is disorienting, while losing it on Back is equally
 * frustrating. This coordinator keeps those two behaviors distinct:
 *
 * - new destinations start at the top;
 * - browser Back/Forward restores the matching history entry;
 * - explicit in-product Back links can request restoration by destination URL;
 * - the destination h1 receives programmatic focus after lazy content mounts.
 */
import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const RESTORE_JOURNEY_SCROLL_STATE = 'restoreJourneyScroll';

interface JourneyLocationState {
  [RESTORE_JOURNEY_SCROLL_STATE]?: boolean;
}

function locationHref(pathname: string, search: string, hash: string): string {
  return `${pathname}${search}${hash}`;
}

function focusPageHeading(): boolean {
  const heading = document.querySelector<HTMLElement>(
    'main [data-route-focus-target], main h1',
  );
  if (!heading) return false;

  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
  heading.classList.add('tmm-route-focus-target');
  heading.addEventListener(
    'blur',
    () => heading.classList.remove('tmm-route-focus-target'),
    { once: true },
  );
  heading.focus({ preventScroll: true });
  return true;
}

export function JourneyNavigationManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const entryPositions = useRef(new Map<string, number>());
  const hrefPositions = useRef(new Map<string, number>());
  const previousPathname = useRef<string | null>(null);

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const positionsByEntry = entryPositions.current;
    const positionsByHref = hrefPositions.current;
    const href = locationHref(location.pathname, location.search, location.hash);
    const state = (location.state ?? {}) as JourneyLocationState;
    const restoreByHref = state[RESTORE_JOURNEY_SCROLL_STATE] === true;
    const isDestinationChange = previousPathname.current !== location.pathname;
    previousPathname.current = location.pathname;
    const restorePosition =
      navigationType === 'POP'
        ? positionsByEntry.get(location.key) ?? positionsByHref.get(href)
        : restoreByHref
          ? positionsByHref.get(href)
          : undefined;
    const destinationY = restorePosition ?? 0;

    let cancelled = false;
    let frame = 0;
    let observer: MutationObserver | null = null;

    const settleDestination = () => {
      if (cancelled) return;
      window.scrollTo({ top: destinationY, behavior: 'auto' });
      if (focusPageHeading()) observer?.disconnect();
    };

    if (isDestinationChange) {
      // Reset synchronously so the old page's offset never flashes underneath
      // a newly selected route. Query-only URL state (for example a selected
      // map marker) remains in place and keeps its current focus.
      window.scrollTo({ top: destinationY, behavior: 'auto' });

      frame = window.requestAnimationFrame(() => {
        settleDestination();
        if (!document.querySelector('main h1, main [data-route-focus-target]')) {
          observer = new MutationObserver(settleDestination);
          const main = document.querySelector('main');
          if (main) observer.observe(main, { childList: true, subtree: true });
        }
      });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      const y = window.scrollY;
      positionsByEntry.set(location.key, y);
      positionsByHref.set(href, y);
    };
  }, [location, navigationType]);

  return null;
}
