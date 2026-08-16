/**
 * Public entry for the app shell (Issue #14).
 *
 * Re-exports the shell, router, and provider mount point so features integrate
 * through one consistent structure without creating their own root/router.
 */
export { AppShell } from './AppShell';
export { PrototypeShell } from './PrototypeShell';
export { AppRouter } from './AppRouter';
export { AppProviders } from './AppProviders';
export { ErrorBoundary } from './ErrorBoundary';
export { LoadingBoundary, PageLoader } from './LoadingBoundary';
