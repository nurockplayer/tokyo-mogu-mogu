import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders, AppShell, AppRouter } from './app';
import './styles.css';
import './ui/tokens.css';
import './ui/ui.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <AppShell>
          <AppRouter />
        </AppShell>
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
);
