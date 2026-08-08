/**
 * Route-level loading boundary (Issue #14).
 *
 * Wraps lazy-loaded routes in Suspense with a simple PageLoader so route code
 * can be split per-feature without each feature writing its own loading UI.
 */
import { Suspense, type ReactNode } from 'react';
import { useI18n } from '../i18n';

/** Minimal route-level loading indicator. */
export function PageLoader() {
  const { t } = useI18n();
  return (
    <p className="page page-loader" role="status">
      {t('loading')}
    </p>
  );
}

export function LoadingBoundary({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}
