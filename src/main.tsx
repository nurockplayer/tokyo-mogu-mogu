import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { CollectionProvider } from './store/collection';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <CollectionProvider>
          <App />
        </CollectionProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
);
