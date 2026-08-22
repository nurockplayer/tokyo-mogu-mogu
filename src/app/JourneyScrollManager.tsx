import { useEffect, useLayoutEffect, useRef } from 'react';
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

  // Capture the position while the current page is still mounted. Waiting for
  // the next location's layout effect is too late when a shorter destination
  // has already clamped a deep article offset.
  useEffect(() => {
    const saveCurrentPosition = () => {
      const current = previous.current;
      positionsByKey.set(current.key, window.scrollY);
      positionsByHref.set(current.href, window.scrollY);
    };
    saveCurrentPosition();
    window.addEventListener('scroll', saveCurrentPosition, { passive: true });
    return () => window.removeEventListener('scroll', saveCurrentPosition);
  }, []);

  useLayoutEffect(() => {
    const current = { key: location.key, href: hrefFor(location) };
    const last = previous.current;
    if (last.key === current.key) return;

    // The passive scroll listener normally owns this snapshot. Only seed a
    // route that never scrolled; never overwrite a saved deep position with a
    // value already clamped by the incoming page's shorter layout.
    if (!positionsByKey.has(last.key) && !positionsByHref.has(last.href)) {
      positionsByKey.set(last.key, window.scrollY);
      positionsByHref.set(last.href, window.scrollY);
    }

    const shouldRestore = navigationType === 'POP' || restoreRequested(location.state);
    const nextY = shouldRestore
      ? positionsByKey.get(current.key) ?? positionsByHref.get(current.href) ?? 0
      : 0;

    // Route elements are lazy-loaded. On an explicit Back, the destination
    // article can mount after this shell-level layout effect; an early scroll
    // is then clamped to the outgoing page's shorter height. Re-apply when the
    // document grows, with one bounded timeout fallback. Forward/top
    // navigation keeps the original single follow-up frame only.
    const applyScroll = () => {
      window.scrollTo({ top: nextY, left: 0, behavior: 'auto' });
    };
    applyScroll();
    const frame = window.requestAnimationFrame(applyScroll);

    let resizeObserver: ResizeObserver | undefined;
    let mutationObserver: MutationObserver | undefined;
    let settleTimer: number | undefined;
    if (shouldRestore && nextY > 0) {
      const stopObservingWhenRestored = () => {
        applyScroll();
        if (Math.abs(window.scrollY - nextY) <= 1) {
          resizeObserver?.disconnect();
          mutationObserver?.disconnect();
        }
      };
      resizeObserver = new ResizeObserver(stopObservingWhenRestored);
      // The root element's border box stays viewport-sized while a lazy route
      // changes scroll height; the body box reflects the mounted page height.
      resizeObserver.observe(document.body);
      mutationObserver = new MutationObserver(stopObservingWhenRestored);
      mutationObserver.observe(document.body, { childList: true, subtree: true });
      settleTimer = window.setTimeout(() => {
        applyScroll();
        resizeObserver?.disconnect();
        mutationObserver?.disconnect();
      }, 1500);
    }
    previous.current = current;

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      if (settleTimer !== undefined) window.clearTimeout(settleTimer);
    };
  }, [location, navigationType]);

  return null;
}
