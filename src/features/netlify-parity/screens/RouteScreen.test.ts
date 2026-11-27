import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { referenceCopy } from '../content';
import { currentJourneys, routeStats } from '../factual-presentation';
import { RouteScreen } from './RouteScreen';

describe('Route station access', () => {
  it.each(['ja', 'en', 'zh-TW'] as const)('shows only known access in %s', (locale) => {
    const render = (id: string) => renderToStaticMarkup(createElement(RouteScreen, {
      active: true, copy: referenceCopy(locale), locale,
      journey: currentJourneys.find((journey) => journey.id === id)!,
      onShare: async () => undefined,
      onBack: () => {}, onOpenSpot: () => {}, onSaveRoute: () => {}, onViewSavedRoutes: () => {},
    }));
    const stage = render('b01-hachioji-ramen');
    const stageInfo = stage.split('<div class="route-info">')[1].split('<button')[0];
    const stats = routeStats['b01-hachioji-ramen:half-day'][locale];
    expect(stageInfo.match(/<svg/g)).toHaveLength(1);
    expect(stageInfo).not.toContain(stats.minutes);
    expect(stageInfo).toContain(stats.caution);
    expect(stage.split(stats.time)).toHaveLength(2);

    const demo = render('demo-okutama-wasabi');
    const demoInfo = demo.split('<div class="route-info">')[1].split('<button')[0];
    const demoStats = routeStats['demo-okutama-wasabi:half-day'][locale];
    expect(demoInfo.match(/<svg/g)).toHaveLength(2);
    expect(demoInfo).toContain(demoStats.station);
    expect(demoInfo).toContain(demoStats.minutes);
  });
});
