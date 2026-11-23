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
import { b03AkishimaHaijimaNegiRecord } from './b03-akishima-haijima-negi';
import { b03AkishimaFarmPearsRecord } from './b03-akishima-farm-pears';
import { b03AkishimaEggsSweetsRecord } from './b03-akishima-eggs-sweets';
import { b03AkishimaGroundwaterRecord } from './b03-akishima-groundwater';
import { b03AkishimaBeerRecord } from './b03-akishima-beer';
import { b03AkishimaLocalSweetsRecord } from './b03-akishima-local-sweets';
import { b03AkishimaWhaleCuisineRecord } from './b03-akishima-whale-cuisine';
import { b03ChofuJindaijiSobaRecord } from './b03-chofu-jindaiji-soba';
import { b03ChofuBeerRecord } from './b03-chofu-beer';
import { b03ChofuOrchardsRecord } from './b03-chofu-orchards';
import { b03ChofuVegetablesRecord } from './b03-chofu-vegetables';
import { b03ChofuLocalWagashiRecord } from './b03-chofu-local-wagashi';
import { b03ChofuYokaiSweetsRecord } from './b03-chofu-yokai-sweets';
import { b03ChofuTamaAyuRecord } from './b03-chofu-tama-ayu';
import { b03MachidaFarmTableRecord } from './b03-machida-farm-table';
import { b03MachidaZenjimaruRecord } from './b03-machida-zenjimaru';
import { b03MachidaRiceSakeRecord } from './b03-machida-rice-sake';
import { b03MachidaSilkMelonRecord } from './b03-machida-silk-melon';
import { b03MachidaNanakuniyamaRecord } from './b03-machida-nanakuniyama';
import { b03MachidaHanaYuzuRecord } from './b03-machida-hana-yuzu';
import { b03MachidaHoneyRecord } from './b03-machida-honey';
import { b03MachidaFermentationRecord } from './b03-machida-fermentation';
import { b03MachidaCraftBeerRecord } from './b03-machida-craft-beer';
import { b03MachidaGyozaRecord } from './b03-machida-gyoza';
import { b03MachidaLocalWagashiRecord } from './b03-machida-local-wagashi';
import { b03MachidaEggPuddingRecord } from './b03-machida-egg-pudding';
import { b03MachidaSausagesRecord } from './b03-machida-sausages';
import { b03MachidaCoffeeRecord } from './b03-machida-coffee';
import { b04KoganeiHeritageVegetablesRecord } from './b04-koganei-heritage-vegetables';
import { b04KoganeiRhubarbRecord } from './b04-koganei-rhubarb';
import { b04KoganeiKiwiRecord } from './b04-koganei-kiwi';
import { b04KoganeiShojinRecord } from './b04-koganei-shojin';
import { b04KoganeiConfectioneryRecord } from './b04-koganei-confectionery';
import { b04KoganeiCraftBeerRecord } from './b04-koganei-craft-beer';
import { b04KodairaBlueberryRecord } from './b04-kodaira-blueberry';
import { b04KodairaTokyoGoldRecord } from './b04-kodaira-tokyo-gold';
import { b04KodairaTokyoUdoRecord } from './b04-kodaira-tokyo-udo';
import { b04KodairaFarmTableRecord } from './b04-kodaira-farm-table';
import { b04KodairaWheatUdonRecord } from './b04-kodaira-wheat-udon';
import { b04KodairaSouvenirSweetsRecord } from './b04-kodaira-souvenir-sweets';
import { b04HinoTokojiDaikonRecord } from './b04-hino-tokoji-daikon';
import { b04HinoFarmOrchardRecord } from './b04-hino-farm-orchard';
import { b04HinoToyodaBeerRecord } from './b04-hino-toyoda-beer';
import { b04HinoSouvenirFoodsRecord } from './b04-hino-souvenir-foods';

import { b05HigashimurayamaWheatUdonRecord } from './b05-higashimurayama-wheat-udon';
import { b05HigashimurayamaBlackSauceRecord } from './b05-higashimurayama-black-sauce';
import { b05HigashimurayamaOrchardProductsRecord } from './b05-higashimurayama-orchard-products';
import { b05HigashimurayamaGrilledDangoRecord } from './b05-higashimurayama-grilled-dango';
import { b05HigashimurayamaSakeLeesRecord } from './b05-higashimurayama-sake-lees';
import { b05HigashimurayamaNattoRecord } from './b05-higashimurayama-natto';
import { b05HigashimurayamaYubaRecord } from './b05-higashimurayama-yuba';
import { b05HigashimurayamaLocalSweetsRecord } from './b05-higashimurayama-local-sweets';
import { b05HigashimurayamaEightGrainsRecord } from './b05-higashimurayama-eight-grains';
import { b05KokubunjiKokuvegeTableRecord } from './b05-kokubunji-kokuvege-table';
import { b05KokubunjiTokyoUdoRecord } from './b05-kokubunji-tokyo-udo';
import { b05KokubunjiOrchardFruitRecord } from './b05-kokubunji-orchard-fruit';
import { b05KokubunjiTeaRecord } from './b05-kokubunji-tea';
import { b05KokubunjiHeritageSweetsRecord } from './b05-kokubunji-heritage-sweets';
import { b05KunitachiFarmTableRecord } from './b05-kunitachi-farm-table';
import { b05KunitachiYahoRiceRecord } from './b05-kunitachi-yaho-rice';
import { b05KunitachiHoneyRecord } from './b05-kunitachi-honey';
import { b05KunitachiBeerRecord } from './b05-kunitachi-beer';
import { b05KunitachiStyleSweetsRecord } from './b05-kunitachi-style-sweets';
import { b05KunitachiTekutekuTeaRecord } from './b05-kunitachi-tekuteku-tea';
import { b05KunitachiYakuzenCurryRecord } from './b05-kunitachi-yakuzen-curry';

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
  b03AkishimaHaijimaNegiRecord,
  b03AkishimaFarmPearsRecord,
  b03AkishimaEggsSweetsRecord,
  b03AkishimaGroundwaterRecord,
  b03AkishimaBeerRecord,
  b03AkishimaLocalSweetsRecord,
  b03AkishimaWhaleCuisineRecord,
  b03ChofuJindaijiSobaRecord,
  b03ChofuBeerRecord,
  b03ChofuOrchardsRecord,
  b03ChofuVegetablesRecord,
  b03ChofuLocalWagashiRecord,
  b03ChofuYokaiSweetsRecord,
  b03ChofuTamaAyuRecord,
  b03MachidaFarmTableRecord,
  b03MachidaZenjimaruRecord,
  b03MachidaRiceSakeRecord,
  b03MachidaSilkMelonRecord,
  b03MachidaNanakuniyamaRecord,
  b03MachidaHanaYuzuRecord,
  b03MachidaHoneyRecord,
  b03MachidaFermentationRecord,
  b03MachidaCraftBeerRecord,
  b03MachidaGyozaRecord,
  b03MachidaLocalWagashiRecord,
  b03MachidaEggPuddingRecord,
  b03MachidaSausagesRecord,
  b03MachidaCoffeeRecord,
  b04KoganeiHeritageVegetablesRecord,
  b04KoganeiRhubarbRecord,
  b04KoganeiKiwiRecord,
  b04KoganeiShojinRecord,
  b04KoganeiConfectioneryRecord,
  b04KoganeiCraftBeerRecord,
  b04KodairaBlueberryRecord,
  b04KodairaTokyoGoldRecord,
  b04KodairaTokyoUdoRecord,
  b04KodairaFarmTableRecord,
  b04KodairaWheatUdonRecord,
  b04KodairaSouvenirSweetsRecord,
  b04HinoTokojiDaikonRecord,
  b04HinoFarmOrchardRecord,
  b04HinoToyodaBeerRecord,
  b04HinoSouvenirFoodsRecord,
  b05HigashimurayamaWheatUdonRecord,
  b05HigashimurayamaBlackSauceRecord,
  b05HigashimurayamaOrchardProductsRecord,
  b05HigashimurayamaGrilledDangoRecord,
  b05HigashimurayamaSakeLeesRecord,
  b05HigashimurayamaNattoRecord,
  b05HigashimurayamaYubaRecord,
  b05HigashimurayamaLocalSweetsRecord,
  b05HigashimurayamaEightGrainsRecord,
  b05KokubunjiKokuvegeTableRecord,
  b05KokubunjiTokyoUdoRecord,
  b05KokubunjiOrchardFruitRecord,
  b05KokubunjiTeaRecord,
  b05KokubunjiHeritageSweetsRecord,
  b05KunitachiFarmTableRecord,
  b05KunitachiYahoRiceRecord,
  b05KunitachiHoneyRecord,
  b05KunitachiBeerRecord,
  b05KunitachiStyleSweetsRecord,
  b05KunitachiTekutekuTeaRecord,
  b05KunitachiYakuzenCurryRecord,
];
