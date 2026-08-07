import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { useI18n } from './i18n';
import { DemoResetButton } from './components/DemoResetButton';
import { LocaleToggle } from './components/LocaleToggle';
import { HomePage } from './pages/HomePage';
import { PokedexPage } from './pages/PokedexPage';
import { MapPage } from './pages/MapPage';
import { FoodCulturePage } from './pages/FoodCulturePage';

function Shell() {
  const { t } = useI18n();
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-top">
          <Link to="/" className="app-logo">{t('appName')}</Link>
          <LocaleToggle />
        </div>
        <span className="app-tagline">{t('appTagline')}</span>
        <div className="app-header-actions">
          <DemoResetButton />
        </div>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/food-cultures/:id" element={<FoodCulturePage />} />
        </Routes>
      </main>
      <nav className="app-nav">
        <NavLink to="/" end>{t('navHome')}</NavLink>
        <NavLink to="/pokedex">{t('navPokedex')}</NavLink>
        <NavLink to="/map">{t('navMap')}</NavLink>
      </nav>
    </div>
  );
}

export default function App() {
  return <Shell />;
}
