/**
 * Render-error boundary (Issue #14).
 *
 * Class component that catches uncaught render errors anywhere below it and
 * shows a friendly ja/en fallback instead of a blank screen. Because class
 * components cannot use hooks, the boundary receives the translation function
 * from a small functional wrapper that reads the i18n context.
 */
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { useI18n, type LocaleKey } from '../i18n';

interface ErrorBoundaryProps {
  t: (key: LocaleKey) => string;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface the failure for debugging without leaking internals to the user.
    console.error('Uncaught render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      const { t } = this.props;
      return (
        <section className="page" role="alert">
          <h1 className="page-title">{t('errorTitle')}</h1>
          <p className="page-sub">{t('errorBody')}</p>
          <a href="/" className="btn btn-secondary">{t('back')}</a>
        </section>
      );
    }
    return this.props.children;
  }
}

export function ErrorBoundary({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return <ErrorBoundaryClass t={t}>{children}</ErrorBoundaryClass>;
}
