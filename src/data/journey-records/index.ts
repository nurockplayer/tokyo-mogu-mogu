import type { JourneyRecord } from '../journey-record';
import { omeJourneyRecord } from './ome';
import { hachiojiJourneyRecord } from './hachioji';
import { fussaJourneyRecord } from './fussa';
import { akirunoJourneyRecord } from './akiruno';

import { b01HachiojiFarmTableRecord } from './b01-hachioji-farm-table';
import { b01HachiojiPassionFruitRecord } from './b01-hachioji-passion-fruit';
import { b01HachiojiMulberrySweetsRecord } from './b01-hachioji-mulberry-sweets';
import { b01HachiojiRiceSakeRecord } from './b01-hachioji-rice-sake';
import { b01HachiojiRamenRecord } from './b01-hachioji-ramen';
import { b01HachiojiNapolitanRecord } from './b01-hachioji-napolitan';
import { b01HachiojiTakaoSobaRecord } from './b01-hachioji-takao-soba';
import { b01HachiojiTakaoShojinRecord } from './b01-hachioji-takao-shojin';
import { b01HachiojiTakaoSweetsRecord } from './b01-hachioji-takao-sweets';
import { b01HachiojiCraftBeerRecord } from './b01-hachioji-craft-beer';
import { b01HachiojiAsakawaAyuRecord } from './b01-hachioji-asakawa-ayu';
import { b01TachikawaTokyoUdoRecord } from './b01-tachikawa-tokyo-udo';
import { b01TachikawaUrbanFarmTableRecord } from './b01-tachikawa-urban-farm-table';
import { b01TachikawaOrchardSweetsRecord } from './b01-tachikawa-orchard-sweets';
import { b01TachikawaEggsRecord } from './b01-tachikawa-eggs';
import { b01TachikawaCraftBeerRecord } from './b01-tachikawa-craft-beer';
import { b01MusashinoWheatUdonRecord } from './b01-musashino-wheat-udon';
import { b01MusashinoUdoRecord } from './b01-musashino-udo';
import { b01MusashinoSakaiChiliRecord } from './b01-musashino-sakai-chili';
import { b01MusashinoFarmFruitRecord } from './b01-musashino-farm-fruit';
import { b01MusashinoHopsBeerRecord } from './b01-musashino-hops-beer';
import { b01MusashinoMeadRecord } from './b01-musashino-mead';
import { b01MusashinoSouvenirSweetsRecord } from './b01-musashino-souvenir-sweets';

import { b02MitakaOsawaWasabiRecord } from './b02-mitaka-osawa-wasabi';
import { b02MitakaKiwiRecord } from './b02-mitaka-kiwi';
import { b02MitakaOrchardFruitRecord } from './b02-mitaka-orchard-fruit';
import { b02MitakaWheatBeerRecord } from './b02-mitaka-wheat-beer';
import { b02MitakaLiterarySweetsRecord } from './b02-mitaka-literary-sweets';
import { b02OmePlumRecord } from './b02-ome-plum';
import { b02OmeSawaiYuzuRecord } from './b02-ome-sawai-yuzu';
import { b02OmeFarmTableRecord } from './b02-ome-farm-table';
import { b02OmeSayamaTeaRecord } from './b02-ome-sayama-tea';
import { b02OmeOrchardFruitRecord } from './b02-ome-orchard-fruit';
import { b02OmeLogMushroomsRecord } from './b02-ome-log-mushrooms';
import { b02OmeMitakeFoodsRecord } from './b02-ome-mitake-foods';
import { b02OmeKonnyakuRecord } from './b02-ome-konnyaku';
import { b02OmeCraftBeerRecord } from './b02-ome-craft-beer';
import { b02OmeLocalSweetsRecord } from './b02-ome-local-sweets';
import { b02OmeLocalDishesRecord } from './b02-ome-local-dishes';
import { b02FuchuFarmTableRecord } from './b02-fuchu-farm-table';
import { b02FuchuBlackRiceRecord } from './b02-fuchu-black-rice';
import { b02FuchuChestnutFestivalRecord } from './b02-fuchu-chestnut-festival';
import { b02FuchuKouzuruSakeRecord } from './b02-fuchu-kouzuru-sake';
import { b02FuchuShrineSweetsRecord } from './b02-fuchu-shrine-sweets';

/** Browse publication order; municipality registration alone publishes nothing. */
export const JOURNEY_RECORDS: JourneyRecord[] = [
  omeJourneyRecord, hachiojiJourneyRecord, fussaJourneyRecord, akirunoJourneyRecord,
  b01HachiojiFarmTableRecord,
  b01HachiojiPassionFruitRecord,
  b01HachiojiMulberrySweetsRecord,
  b01HachiojiRiceSakeRecord,
  b01HachiojiRamenRecord,
  b01HachiojiNapolitanRecord,
  b01HachiojiTakaoSobaRecord,
  b01HachiojiTakaoShojinRecord,
  b01HachiojiTakaoSweetsRecord,
  b01HachiojiCraftBeerRecord,
  b01HachiojiAsakawaAyuRecord,
  b01TachikawaTokyoUdoRecord,
  b01TachikawaUrbanFarmTableRecord,
  b01TachikawaOrchardSweetsRecord,
  b01TachikawaEggsRecord,
  b01TachikawaCraftBeerRecord,
  b01MusashinoWheatUdonRecord,
  b01MusashinoUdoRecord,
  b01MusashinoSakaiChiliRecord,
  b01MusashinoFarmFruitRecord,
  b01MusashinoHopsBeerRecord,
  b01MusashinoMeadRecord,
  b01MusashinoSouvenirSweetsRecord,
  b02MitakaOsawaWasabiRecord,
  b02MitakaKiwiRecord,
  b02MitakaOrchardFruitRecord,
  b02MitakaWheatBeerRecord,
  b02MitakaLiterarySweetsRecord,
  b02OmePlumRecord,
  b02OmeSawaiYuzuRecord,
  b02OmeFarmTableRecord,
  b02OmeSayamaTeaRecord,
  b02OmeOrchardFruitRecord,
  b02OmeLogMushroomsRecord,
  b02OmeMitakeFoodsRecord,
  b02OmeKonnyakuRecord,
  b02OmeCraftBeerRecord,
  b02OmeLocalSweetsRecord,
  b02OmeLocalDishesRecord,
  b02FuchuFarmTableRecord,
  b02FuchuBlackRiceRecord,
  b02FuchuChestnutFestivalRecord,
  b02FuchuKouzuruSakeRecord,
  b02FuchuShrineSweetsRecord,
];
