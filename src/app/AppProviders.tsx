/**
 * Global provider mount point (Issue #14).
 *
 * All cross-cutting providers are mounted in ONE place so feature code never
 * has to create its own root or provider nesting. Mount order matters:
 * providers listed first wrap those listed after.
 *
 * - I18nProvider       (from src/i18n — the i18n public entry)
 * - CollectionProvider (client collection state, persisted to localStorage)
 * - AuthProvider       (shared auth state — session restore + useAuth, Issue #22)
 *
 * Additional providers (e.g. config from src/config when #13 merges) should be
 * added here rather than in main.tsx or feature code.
 */
import type { ReactNode } from 'react';
import { I18nProvider } from '../i18n';
import { CollectionProvider } from '../store/collection';
import { AuthProvider } from '../auth/AuthProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <CollectionProvider>
        <AuthProvider>{children}</AuthProvider>
      </CollectionProvider>
    </I18nProvider>
  );
}
