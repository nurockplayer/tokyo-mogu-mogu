import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AppProviders, AppRouter, NotFoundPage } from './app';
import { decodeJourneyPathIdentity } from './features/netlify-parity/journey-location';
import './styles.css';
import './ui/tokens.css';
import './ui/ui.css';
import './pages/s0s3/figma-conversation-parity.css';
import './features/netlify-parity/reference.css';
import './features/netlify-parity/issue-296.css';

const malformedJourneyIdentity = ['/story/', '/spot/'].some(
  (prefix) => window.location.pathname.startsWith(prefix)
    && decodeJourneyPathIdentity(window.location.pathname.slice(prefix.length)) === undefined,
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {malformedJourneyIdentity ? (
      <MemoryRouter>
        <AppProviders>
          <NotFoundPage hardNavigation />
        </AppProviders>
      </MemoryRouter>
    ) : (
      <BrowserRouter>
        <AppProviders>
          {/* Phase 1 (PrototypeShell) and Phase 2 (AppShell) are layout routes
              selected inside AppRouter (Issue #217). */}
          <AppRouter />
        </AppProviders>
      </BrowserRouter>
    )}
  </StrictMode>,
);
