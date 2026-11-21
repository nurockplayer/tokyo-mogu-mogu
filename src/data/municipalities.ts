/** Geography only: registration does not publish a journey or assert a food culture.
 * Names/list: Tokyo Metropolitan Government municipal statistics,
 * https://www.kankyo.metro.tokyo.lg.jp/documents/d/kankyo/2026-05-12-120422-452
 * Retrieved 2026-11-22 JST. English/Traditional Chinese are editorial labels.
 */
export const MUNICIPALITIES = [
  { id: 'hachioji', group: 'tama-cities', names: { ja: '八王子市', en: 'Hachioji City', 'zh-TW': '八王子市' } },
  { id: 'tachikawa', group: 'tama-cities', names: { ja: '立川市', en: 'Tachikawa City', 'zh-TW': '立川市' } },
  { id: 'musashino', group: 'tama-cities', names: { ja: '武蔵野市', en: 'Musashino City', 'zh-TW': '武藏野市' } },
  { id: 'mitaka', group: 'tama-cities', names: { ja: '三鷹市', en: 'Mitaka City', 'zh-TW': '三鷹市' } },
  { id: 'ome', group: 'tama-cities', names: { ja: '青梅市', en: 'Ome City', 'zh-TW': '青梅市' } },
  { id: 'fuchu', group: 'tama-cities', names: { ja: '府中市', en: 'Fuchu City', 'zh-TW': '府中市' } },
  { id: 'akishima', group: 'tama-cities', names: { ja: '昭島市', en: 'Akishima City', 'zh-TW': '昭島市' } },
  { id: 'chofu', group: 'tama-cities', names: { ja: '調布市', en: 'Chofu City', 'zh-TW': '調布市' } },
  { id: 'machida', group: 'tama-cities', names: { ja: '町田市', en: 'Machida City', 'zh-TW': '町田市' } },
  { id: 'koganei', group: 'tama-cities', names: { ja: '小金井市', en: 'Koganei City', 'zh-TW': '小金井市' } },
  { id: 'kodaira', group: 'tama-cities', names: { ja: '小平市', en: 'Kodaira City', 'zh-TW': '小平市' } },
  { id: 'hino', group: 'tama-cities', names: { ja: '日野市', en: 'Hino City', 'zh-TW': '日野市' } },
  { id: 'higashimurayama', group: 'tama-cities', names: { ja: '東村山市', en: 'Higashimurayama City', 'zh-TW': '東村山市' } },
  { id: 'kokubunji', group: 'tama-cities', names: { ja: '国分寺市', en: 'Kokubunji City', 'zh-TW': '國分寺市' } },
  { id: 'kunitachi', group: 'tama-cities', names: { ja: '国立市', en: 'Kunitachi City', 'zh-TW': '國立市' } },
  { id: 'fussa', group: 'tama-cities', names: { ja: '福生市', en: 'Fussa City', 'zh-TW': '福生市' } },
  { id: 'komae', group: 'tama-cities', names: { ja: '狛江市', en: 'Komae City', 'zh-TW': '狛江市' } },
  { id: 'higashiyamato', group: 'tama-cities', names: { ja: '東大和市', en: 'Higashiyamato City', 'zh-TW': '東大和市' } },
  { id: 'kiyose', group: 'tama-cities', names: { ja: '清瀬市', en: 'Kiyose City', 'zh-TW': '清瀨市' } },
  { id: 'higashikurume', group: 'tama-cities', names: { ja: '東久留米市', en: 'Higashikurume City', 'zh-TW': '東久留米市' } },
  { id: 'musashimurayama', group: 'tama-cities', names: { ja: '武蔵村山市', en: 'Musashimurayama City', 'zh-TW': '武藏村山市' } },
  { id: 'tama', group: 'tama-cities', names: { ja: '多摩市', en: 'Tama City', 'zh-TW': '多摩市' } },
  { id: 'inagi', group: 'tama-cities', names: { ja: '稲城市', en: 'Inagi City', 'zh-TW': '稻城市' } },
  { id: 'hamura', group: 'tama-cities', names: { ja: '羽村市', en: 'Hamura City', 'zh-TW': '羽村市' } },
  { id: 'akiruno', group: 'tama-cities', names: { ja: 'あきる野市', en: 'Akiruno City', 'zh-TW': '秋留野市' } },
  { id: 'nishitokyo', group: 'tama-cities', names: { ja: '西東京市', en: 'Nishitokyo City', 'zh-TW': '西東京市' } },
  { id: 'mizuho', group: 'nishitama', names: { ja: '瑞穂町', en: 'Mizuho Town', 'zh-TW': '瑞穗町' } },
  { id: 'hinode', group: 'nishitama', names: { ja: '日の出町', en: 'Hinode Town', 'zh-TW': '日之出町' } },
  { id: 'hinohara', group: 'nishitama', names: { ja: '檜原村', en: 'Hinohara Village', 'zh-TW': '檜原村' } },
  { id: 'okutama', group: 'nishitama', names: { ja: '奥多摩町', en: 'Okutama Town', 'zh-TW': '奧多摩町' } },
  { id: 'oshima', group: 'islands', names: { ja: '大島町', en: 'Oshima Town', 'zh-TW': '大島町' } },
  { id: 'toshima', group: 'islands', names: { ja: '利島村', en: 'Toshima Village', 'zh-TW': '利島村' } },
  { id: 'niijima', group: 'islands', names: { ja: '新島村', en: 'Niijima Village', 'zh-TW': '新島村' } },
  { id: 'kozushima', group: 'islands', names: { ja: '神津島村', en: 'Kozushima Village', 'zh-TW': '神津島村' } },
  { id: 'miyake', group: 'islands', names: { ja: '三宅村', en: 'Miyake Village', 'zh-TW': '三宅村' } },
  { id: 'mikurashima', group: 'islands', names: { ja: '御蔵島村', en: 'Mikurashima Village', 'zh-TW': '御藏島村' } },
  { id: 'hachijo', group: 'islands', names: { ja: '八丈町', en: 'Hachijo Town', 'zh-TW': '八丈町' } },
  { id: 'aogashima', group: 'islands', names: { ja: '青ヶ島村', en: 'Aogashima Village', 'zh-TW': '青之島村' } },
  { id: 'ogasawara', group: 'islands', names: { ja: '小笠原村', en: 'Ogasawara Village', 'zh-TW': '小笠原村' } },
] as const;

export type MunicipalityId = (typeof MUNICIPALITIES)[number]['id'];
export type MunicipalityGroup = (typeof MUNICIPALITIES)[number]['group'];
