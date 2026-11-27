import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useI18n, type Locale } from '../../i18n';
import type { FoodProfile } from '../../lib/food-profile';
import { loadNickname, saveNickname } from '../../lib/nickname';
import { FoodProfileConversation } from './chat/FoodProfileConversation';
import { BottomNavigation } from './components/BottomNavigation';
import {
  currentJourneys,
  currentSpots,
  referenceCopy,
  resultJourneys,
  type JourneyPresentation,
  type SpotPresentation,
} from './content';
import { ExplorationFlow } from './exploration/ExplorationFlow';
import {
  discoveryJourney,
  discoveryOptions,
  emptyDiscoveryFilters,
  loadDiscoveryFilters,
  saveDiscoveryFilters,
  type DiscoveryFilters,
} from './discovery';
import { DiscoveryFields } from './exploration/DiscoveryFields';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { BadgesScreen } from './screens/BadgesScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MoguScreen } from './screens/MoguScreen';
import { MyScreen } from './screens/MyScreen';
import { ResultScreen } from './screens/ResultScreen';
import { RouteScreen } from './screens/RouteScreen';
import { SplashScreen } from './screens/SplashScreen';
import { SpotScreen } from './screens/SpotScreen';
import { StoryScreen } from './screens/StoryScreen';
import { resolvePublishedJourneyLocation, type CurrentJourneyLocationResolution } from './journey-location';
import { journeyRecord, publishedJourneys, publishJourney } from './journey-publication';
import { loadLocalSaves, resetLocalData, writeLocalSaves, type SpotSave } from './local-saves';

const storageCopy = {
  ja: { saveFailed: '保存できませんでした。', removeFailed: '保存を解除できませんでした。', resetFailed: 'このブラウザのデータをリセットできませんでした。' },
  en: { saveFailed: 'Could not save in this browser.', removeFailed: 'Could not remove the save.', resetFailed: 'Could not reset data in this browser.' },
  'zh-TW': { saveFailed: '無法在此瀏覽器儲存。', removeFailed: '無法取消儲存。', resetFailed: '無法重設此瀏覽器的資料。' },
};

function savedSpotLocation({ id, journeyId }: SpotSave) {
  const pathname = `/spot/${encodeURIComponent(id)}`;
  const search = journeyId ? `?candidateId=${encodeURIComponent(journeyId)}` : '';
  return { pathname, search };
}

export function ReferenceApp({ journeyLocation, unavailableJourney = false }: {
  journeyLocation: CurrentJourneyLocationResolution;
  unavailableJourney?: boolean;
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { locale, setLocale, t } = useI18n();
  const copy = referenceCopy(locale);
  const [nickname, setNickname] = useState(() => loadNickname() ?? '');
  const [foodProfile, setFoodProfile] = useState<FoodProfile | null>(null);
  const [preferences, setPreferences] = useState(loadDiscoveryFilters);
  const [tripFilters, setTripFilters] = useState<DiscoveryFilters | null>(null);
  const [explorationStep, setExplorationStep] = useState(0);
  const catalog = useMemo(() =>
    ['/food-profile', '/food-profile/edit', '/explore', '/explore/result'].includes(pathname)
      ? publishedJourneys().map((journey) => discoveryJourney(journey, journeyRecord(journey.id)!))
      : [],
    [pathname],
  );
  const options = useMemo(() => discoveryOptions(catalog), [catalog]);
  const filters = tripFilters ?? preferences;
  const [currentJourney, setCurrentJourney] = useState<JourneyPresentation>(() => resultJourneys[0]);
  const [editSessionId, setEditSessionId] = useState(0);
  const [storyBack, setStoryBack] = useState('/explore/result');
  const [routeBack, setRouteBack] = useState('/story/wasabi-okutama');
  const [spotBack, setSpotBack] = useState('/mogu');
  const [saves, setSaves] = useState(loadLocalSaves);
  const [toast, setToast] = useState('');
  const locationJourney = journeyLocation.status === 'resolved'
    ? journeyLocation.journey
    : undefined;
  const { hasJourneyQuery, fromMy } = journeyLocation;
  // Inactive screens stay mounted for the current transition model; this value
  // is never used to resolve a valid /spot/:id path.
  const currentSpot = journeyLocation.spot ?? currentSpots['okutama-tourism-office'];
  const shownJourney = locationJourney ?? currentJourney;
  const routeJourney = locationJourney ?? currentJourney;
  const publicationRecord = locationJourney && journeyRecord(locationJourney.id);
  const isFavorites = pathname === '/my-route';
  const now = new Date();
  const savedJourneys = isFavorites ? saves.journeys.map(({ id }) => {
    const journey = currentJourneys.find((item) => item.id === id);
    return { id, content: journey && publishJourney(journey, now) };
  }) : [];
  const savedSpots = isFavorites ? saves.spots.map((save) => {
    const { pathname, search } = savedSpotLocation(save);
    const resolved = resolvePublishedJourneyLocation(pathname, search, now);
    const available = resolved.status === 'resolved' || resolved.status === 'default';
    return { id: save.id, content: available ? resolved.spot : undefined };
  }) : [];
  const routeSaved = saves.journeys.some(({ id }) => id === routeJourney.id);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (locationJourney && locationJourney.id !== currentJourney.id) {
      setCurrentJourney(locationJourney);
    }
  }, [currentJourney.id, locationJourney]);

  useEffect(() => {
    const activeScroll = document.querySelector<HTMLElement>('.reference-screen[data-screen-active="true"] .scroll');
    if (activeScroll) activeScroll.scrollTop = 0;
  }, [location.pathname]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 1_800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const openJourney = (journey: JourneyPresentation) => {
    setCurrentJourney(journey);
    setStoryBack(location.pathname);
    navigate(`/story/${journey.storyId}`);
  };

  const openSpot = (spot: SpotPresentation) => {
    setSpotBack(`${location.pathname}${location.search}`);
    const routeIdentity = location.pathname === '/route'
      ? location.search || `?candidateId=${encodeURIComponent(routeJourney.id)}`
      : '';
    navigate(`/spot/${spot.id}${routeIdentity}`);
  };

  const updatePreferences = (value: DiscoveryFilters) => {
    setPreferences(value);
    if (!saveDiscoveryFilters(value)) setToast(storageCopy[locale].saveFailed);
  };

  const completeProfile = (name: string, profile: FoodProfile) => {
    setFoodProfile(profile);
    if (name && name !== nickname) {
      setNickname(name);
      if (!saveNickname(name)) setToast(storageCopy[locale].saveFailed);
    }
  };

  const changeLocale = (value: Locale) => {
    if (!setLocale(value)) setToast(storageCopy[value].saveFailed);
  };

  const openExploration = () => {
    setExplorationStep(0);
    navigate('/explore');
  };

  const persistCurrentRoute = () => {
    const latest = loadLocalSaves();
    if (!latest.journeys.some(({ id }) => id === routeJourney.id)) {
      latest.journeys.push({ id: routeJourney.id, routeId: routeJourney.routeId, savedAt: new Date().toISOString() });
      if (!writeLocalSaves(latest)) {
        setToast(storageCopy[locale].saveFailed);
        return false;
      }
    }
    setSaves(latest);
    setToast(locale === 'ja' ? 'マイルートに保存しました！' : locale === 'zh-TW' ? '已儲存到我的路線！' : 'Saved to My Routes!');
    return true;
  };

  const removeSave = (group: 'journeys' | 'spots', id: string) => {
    const latest = loadLocalSaves();
    const next = { ...latest, [group]: latest[group].filter((item) => item.id !== id) };
    if (!writeLocalSaves(next)) {
      setToast(storageCopy[locale].removeFailed);
      return false;
    }
    setSaves(next);
    return true;
  };

  const toggleSpotFavorite = (spot: SpotPresentation) => {
    if (saves.spots.some(({ id }) => id === spot.id)) {
      if (removeSave('spots', spot.id)) {
        setToast(locale === 'ja' ? 'スポットをお気に入りから削除しました' : locale === 'zh-TW' ? '已從收藏移除景點' : 'Spot removed from favorites');
      }
      return;
    }
    const latest = loadLocalSaves();
    if (!latest.spots.some(({ id }) => id === spot.id)) {
      latest.spots.push({ id: spot.id, journeyId: locationJourney?.id });
      if (!writeLocalSaves(latest)) {
        setToast(storageCopy[locale].saveFailed);
        return;
      }
    }
    setSaves(latest);
    setToast(locale === 'ja' ? 'スポットをお気に入りに保存しました！' : locale === 'zh-TW' ? '已將景點儲存至收藏！' : 'Spot saved to favorites!');
  };

  const shareCurrentRoute = async (variant: JourneyPresentation['routeVariants'][number]) => {
    const localized = routeJourney.copy[locale];
    const url = new URL('/route', window.location.origin);
    url.searchParams.set('candidateId', routeJourney.id);
    url.searchParams.set('variant', variant.id);
    const shareData = {
      title: 'TOKYO MOGU MOGU',
      text: `「${localized.title}」 ${copy.app.tagline}`,
      url: url.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        setToast(locale === 'ja' ? 'リンクをコピーしました！' : locale === 'zh-TW' ? '已複製連結！' : 'Link copied!');
        return;
      }
    } catch {
      return shareData.url;
    }
    return shareData.url;
  };

  const isSplash = pathname === '/';
  const isProfileOnboarding = pathname === '/food-profile';
  const isProfileEdit = pathname === '/food-profile/edit';
  const isHome = pathname === '/home';
  const isExplore = pathname === '/explore';
  const isResult = !unavailableJourney && pathname === '/explore/result';
  const isStory = !unavailableJourney && (pathname === '/story' || pathname.startsWith('/story/'));
  const isRoute = !unavailableJourney && pathname === '/route';
  const isSpot = !unavailableJourney && pathname.startsWith('/spot/');
  const isMogu = pathname === '/mogu' || pathname === '/discover';
  const isMy = pathname === '/my';
  const isBadges = pathname === '/badges';
  const profilePreferences = (
    <DiscoveryFields locale={locale} options={options} value={preferences} onChange={updatePreferences} />
  );

  return (
    <main className="reference-app" data-locale={locale} data-pathname={pathname}>
      <div className="reference-phone">
        <SplashScreen
          active={isSplash}
          copy={copy}
          onStart={() => navigate('/food-profile')}
        />
        <FoodProfileConversation
          active={isProfileOnboarding}
          copy={copy}
          locale={locale}
          preferences={isProfileOnboarding ? profilePreferences : null}
          onProfileCompleted={completeProfile}
          onRecommend={() => navigate('/home')}
          onSkipProfile={() => navigate('/mogu')}
          onBrowse={() => navigate('/mogu')}
        />
        <FoodProfileConversation
          active={isProfileEdit}
          copy={copy}
          initialName={nickname}
          key={`profile-edit-${nickname}-${editSessionId}`}
          locale={locale}
          mode="edit"
          preferences={isProfileEdit ? profilePreferences : null}
          onProfileCompleted={completeProfile}
          onRecommend={() => navigate('/home')}
          onSkipProfile={() => navigate('/my')}
          onBrowse={() => navigate('/mogu')}
          onFinishEdit={() => navigate('/my')}
        />
        <HomeScreen
          active={isHome}
          copy={copy}
          locale={locale}
          nickname={nickname}
          onNavigate={navigate}
          onStartExploration={() => {
            setTripFilters(null);
            openExploration();
          }}
        />
        <ExplorationFlow
          active={isExplore}
          copy={copy}
          locale={locale}
          options={options}
          filters={filters}
          step={explorationStep}
          onChange={setTripFilters}
          onStep={setExplorationStep}
          onBackFromFirst={() => navigate(-1)}
          onComplete={() => navigate('/explore/result')}
        />
        <ResultScreen
          active={isResult}
          copy={copy}
          locale={locale}
          catalog={catalog}
          options={options}
          filters={filters}
          foodProfile={foodProfile}
          onRepeatSearch={openExploration}
          onClear={() => setTripFilters(emptyDiscoveryFilters)}
          onBrowse={() => navigate('/mogu')}
          onOpenJourney={openJourney}
        />
        <StoryScreen
          active={isStory}
          copy={copy}
          locale={locale}
          journey={shownJourney}
          record={publicationRecord}
          onBack={() => navigate(storyBack)}
          onCreateRoute={(journey) => {
            setCurrentJourney(journey);
            setRouteBack(`/story/${journey.storyId}`);
            navigate(`/route?candidateId=${encodeURIComponent(journey.id)}`);
          }}
          onOpenSpot={openSpot}
        />
        <RouteScreen
          active={isRoute}
          copy={copy}
          locale={locale}
          journey={routeJourney}
          record={publicationRecord}
          key={routeJourney.id}
          initialVariantId={journeyLocation.status === 'resolved' ? journeyLocation.variantId : undefined}
          saved={routeSaved}
          onBack={() => {
            navigate(
              fromMy
                ? '/my'
                : hasJourneyQuery && locationJourney
                  ? `/story/${locationJourney.storyId}`
                  : routeBack,
            );
          }}
          onShare={shareCurrentRoute}
          onRegenerate={() => setToast(locale === 'ja' ? 'ルートを再生成しました！' : locale === 'zh-TW' ? '已重新建立路線！' : 'Route regenerated!')}
          onOpenSpot={openSpot}
          onSaveRoute={persistCurrentRoute}
          onViewSavedRoutes={() => {
            if (routeSaved || persistCurrentRoute()) navigate('/my-route');
          }}
        />
        <SpotScreen
          active={isSpot}
          copy={copy}
          locale={locale}
          spot={currentSpot}
          record={publicationRecord}
          foodProfile={foodProfile}
          saved={saves.spots.some(({ id }) => id === currentSpot.id)}
          onBack={() => navigate(
            spotBack === '/my-route'
              ? spotBack
              : hasJourneyQuery && locationJourney
              ? `/route${location.search}`
              : spotBack === '/route' && locationJourney
                ? `/route?candidateId=${encodeURIComponent(locationJourney.id)}`
                : spotBack,
          )}
          onOpenGuide={() => setToast(locale === 'ja' ? 'このスポットの公式最新情報リンクは現在用意されていません。' : locale === 'zh-TW' ? '目前尚未提供此景點的官方最新資訊連結。' : 'An official current-information link is not available for this spot yet.')}
          onToggleSaved={toggleSpotFavorite}
          onNavigate={navigate}
        />
        <MoguScreen
          active={isMogu}
          copy={copy}
          locale={locale}
          onOpenJourney={openJourney}
          onNavigate={navigate}
        />
        <FavoritesScreen
          active={isFavorites}
          copy={copy}
          locale={locale}
          savedJourneys={savedJourneys}
          savedSpots={savedSpots}
          onOpenJourney={openJourney}
          onOpenSpot={(id) => {
            const save = saves.spots.find((spot) => spot.id === id)!;
            setSpotBack(pathname);
            navigate(savedSpotLocation(save));
          }}
          onRemoveJourney={(id) => removeSave('journeys', id)}
          onRemoveSpot={(id) => removeSave('spots', id)}
          onNavigate={navigate}
        />
        <MyScreen
          active={isMy}
          copy={copy}
          locale={locale}
          nickname={nickname}
          onEditProfile={() => {
            setEditSessionId((sessionId) => sessionId + 1);
            navigate('/food-profile/edit');
          }}
          onChangeLocale={changeLocale}
          onReset={() => {
            if (resetLocalData()) window.location.reload();
            else setToast(storageCopy[locale].resetFailed);
          }}
          onNavigate={navigate}
          onNotify={setToast}
        />
        <BadgesScreen active={isBadges} locale={locale} onBack={() => navigate('/my')} />

        {unavailableJourney ? (
          <section className="reference-screen on" data-screen="journey-unavailable" data-screen-active="true">
            <header className="ghead">
              <button className="back" onClick={() => navigate('/mogu')} type="button" aria-label={copy.actions.back}>‹</button>
              <span>{copy.mogu.title}</span>
            </header>
            <div className="scroll simple-body">
              <div className="guide-box">
                <h1>{t('journeyUnavailableTitle')}</h1>
                <p>{t('journeyUnavailableBody')}</p>
                <Link to="/mogu" className="book">{t('journeyUnavailableBack')}</Link>
              </div>
            </div>
            <BottomNavigation active="mogu" copy={copy.nav} onNavigate={navigate} />
          </section>
        ) : null}

        {toast ? <div className="reference-toast" role="status">{toast}</div> : null}
      </div>
    </main>
  );
}
