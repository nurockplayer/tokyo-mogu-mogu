/**
 * Global provider mount point (Issue #14).
 *
 * All cross-cutting providers are mounted in ONE place so feature code never
 * has to create its own root or provider nesting. Mount order matters:
 * providers listed first wrap those listed after.
 *
 * - I18nProvider       (from src/i18n — the i18n public entry)
 * - CollectionProvider (client collection state, persisted to localStorage)
 * - AuthProvider       (future — Issue #11; intentionally not implemented here)
 *
 * Additional providers (e.g. config from src/config when #13 merges) should be
 * added here rather than in main.tsx or feature code.
 */
import type { ReactNode } from 'react';
import { I18nProvider } from '../i18n';
import { CollectionProvider } from '../store/collection';

/**
 * Placeholder for the future AuthProvider (Issue #11).
 *
 * When auth lands, replace this identity wrapper with the real provider inside
 * AppProviders. Kept here as a clearly-marked slot so the mount point contract
 * is explicit without implementing any authentication logic.
 */
function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <CollectionProvider>
        <AuthProvider>{children}</AuthProvider>
      </CollectionProvider>
    </I18nProvider>
  );
}
