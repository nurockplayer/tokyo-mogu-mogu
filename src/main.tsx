import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders, AppRouter } from './app';
import './styles.css';
import './ui/tokens.css';
import './ui/ui.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        {/* Phase 1 (PrototypeShell) and Phase 2 (AppShell) are layout routes
            selected inside AppRouter (Issue #217). */}
        <AppRouter />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
);
