import type { JourneyRecord } from '../journey-record';

export const omeJourneyRecord: JourneyRecord = {
  "municipalityId": "ome",
  "journey": {
    "id": "demo-ome-sake",
    "regionId": "ome",
    "foodCultureId": "sake-ome",
    "storyId": "sake-ome",
    "routeId": "ome-sawai-sake-journey",
    "copy": {
      "ja": {"title":"沢井の酒蔵と御嶽の文化財をめぐる旅","subtitle":"青梅・沢井の日本酒","description":"青梅・沢井の小澤酒造が醸す、多摩川の清流が流れる渓谷の里の日本酒「澤乃井」。","tags":["日本酒","伝統","半日・一日"],"storyTitle":"青梅・沢井の日本酒の物語","intro":["沢井は多摩川の清流が流れる渓谷の里です。小澤酒造は自然豊かな渓谷のほとりで日本酒「澤乃井」を醸しています。","青梅・沢井の小澤酒造が醸す、多摩川の清流が流れる渓谷の里の日本酒「澤乃井」。"]},
      "en": {"title":"Sawai Sake & Mitake Heritage Journey","subtitle":"Sawai Sake of Ome","description":"Sake brewed by Ozawa Shuzo in Sawai, Ome — \"Sawanoi\", from the clear-stream valley of the Tama River.","tags":["Sake","Tradition","Half or full day"],"storyTitle":"The story of Sawai sake in Ome","intro":["Sawai is a valley town along the clear Tama River. Ozawa Shuzo brews the \"Sawanoi\" sake label on the banks of this naturally rich valley.","Sake brewed by Ozawa Shuzo in Sawai, Ome — \"Sawanoi\", from the clear-stream valley of the Tama River."]},
      "zh-TW": {"title":"沢井酒藏與御嶽文化財之旅","subtitle":"青梅・沢井的日本酒","description":"由青梅・沢井的小澤酒造釀造，多摩川清流流淌的溪谷小鎮所產的日本酒「澤乃井」。","tags":["日本酒","傳統","半日・一日"],"storyTitle":"青梅・沢井的日本酒物語","intro":["沢井是多摩川清流流經的溪谷聚落。小澤酒造在這片溪谷河畔釀造日本酒「澤乃井」。","由青梅・沢井的小澤酒造釀造，多摩川清流流淌的溪谷小鎮所產的日本酒「澤乃井」。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"沢井で受け継がれる酒蔵","body":"小澤酒造は、古文書から1702年（元禄15年）に酒造業を営んでいたことが確認されている酒蔵です。"},{"number":"02.","title":"澤乃井を醸す小澤酒造","body":"小澤酒造は沢井にある酒蔵で、日本酒「澤乃井」を醸しています。多摩川の清流が流れる渓谷のほとりに位置します。"},{"number":"03.","title":"酒蔵を訪ねる前に","body":"見学は予約制・訪問前に公式情報を確認"},{"number":"04.","title":"御嶽の文化財へ","body":"青梅市御岳にある御嶽神社。現存する旧本殿は、東京都指定有形文化財に指定されています。"}],
      "en": [{"number":"01.","title":"A brewery carried forward in Sawai","body":"Ozawa Shuzo is a brewery whose historical documents show that it was making sake in 1702 (Genroku 15)."},{"number":"02.","title":"Ozawa Shuzo, brewer of Sawanoi","body":"Ozawa Shuzo is a sake brewery in Sawai that brews the \"Sawanoi\" label, on the banks of the clear Tama River valley."},{"number":"03.","title":"Before visiting the brewery","body":"Tours require reservations · Check official information before visiting"},{"number":"04.","title":"Continue to Mitake heritage","body":"Mitake Shrine stands in Mitake, Ome; its surviving former main hall is designated as a Tokyo cultural property."}],
      "zh-TW": [{"number":"01.","title":"在沢井傳承的酒藏","body":"據小澤酒造的公司沿革，古文書顯示其在 1702 年（元祿 15 年）已從事釀酒業。"},{"number":"02.","title":"釀造澤乃井的小澤酒造","body":"小澤酒造是位於沢井的酒藏，釀造日本酒「澤乃井」，坐落在多摩川清流流淌的溪谷河畔。"},{"number":"03.","title":"造訪酒藏之前","body":"參訪需預約・造訪前請查看官方資訊"},{"number":"04.","title":"前往御嶽文化財","body":"位於青梅市御岳的御嶽神社。現存的舊本殿被指定為東京都指定有形文化財。"}]
    },
    "routeVariants": [
      {"id":"half-day","durationMinutes":215,"steps":[{"spotId":"sawai-ozawa-shuzo"},{"spotId":"sawanoien-garden"},{"spotId":"mitake-shrine"}]},
      {"id":"full-day","durationMinutes":370,"steps":[{"spotId":"sawai-ozawa-shuzo"},{"spotId":"sawanoien-garden"},{"spotId":"mitake-shrine"},{"spotId":"baba-oshijutaku"}]}
    ]
  },
  "routeName": {
    "ja": "沢井の酒蔵と御嶽の文化財をめぐる旅",
    "en": "Sawai Sake & Mitake Heritage Journey",
    "zh-TW": "沢井酒藏與御嶽文化財之旅"
  },
  "location": {
    "ja": {
      "area": "青梅・沢井 (東京西部)",
      "station": "沢井駅",
      "access": "から徒歩 約5分"
    },
    "en": {
      "area": "Ome / Sawai (Western Tokyo)",
      "station": "Sawai Station",
      "access": "About 5 min on foot"
    },
    "zh-TW": {
      "area": "青梅・沢井（東京西部）",
      "station": "沢井站",
      "access": "步行約 5 分鐘"
    }
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "沢井駅", "en": "Sawai Station", "zh-TW": "澤井站"}, "spotId": "sawai-ozawa-shuzo", "sourceId": "admission-access"},
      "steps": [{"spotId":"sawai-ozawa-shuzo","description":{"ja":"沢井駅から徒歩で、澤乃井を醸す小澤酒造へ。多摩川の清流が流れる渓谷のほとりに酒蔵があります。","en":"Walk from Sawai Station to Ozawa Shuzo, the brewery behind the Sawanoi label, on the banks of the clear Tama River valley.","zh-TW":"從沢井站步行前往釀造澤乃井的小澤酒造。酒藏就位在多摩川清流流淌的溪谷河畔。"}},{"spotId":"sawanoien-garden","walk":{"ja":"徒歩（編集部目安） 約 5 分","en":"Walk (editorial estimate) · about 5 min","zh-TW":"步行（編輯部參考）約 5 分鐘"},"description":{"ja":"蔵元直営の清流ガーデン。多摩川を見下ろすオープンガーデンで、軽食やおつまみを楽しめます。","en":"The brewery-run Clear Stream Garden — an open garden overlooking the Tama River where you can enjoy light meals and snacks.","zh-TW":"蔵元直營的「清流花園」。在俯瞰多摩川的開放庭園中，可以享用輕食與小菜。"}},{"spotId":"mitake-shrine","walk":{"ja":"JR青梅線・バス・ケーブルカー・徒歩（編集部目安） 約 45 分","en":"JR Ome Line, bus, cable car & walking (editorial estimate) · about 45 min","zh-TW":"JR青梅線・巴士・纜車・步行（編輯部參考）約 45 分鐘"},"description":{"ja":"青梅市御岳に鎮座する御嶽神社。東京都指定有形文化財「御嶽神社旧本殿」が現存します。","en":"Mitake Shrine in Mitake, Ome, preserves its former main hall — a Tokyo-designated cultural property.","zh-TW":"坐落於青梅市御岳的御嶽神社。東京都指定有形文化財「御嶽神社舊本殿」至今仍存。"}}],
      "stats": {"ja":{"time":"目安 3 時間 35 分","spots":"3 スポット","distance":"JR青梅線・バス・ケーブル・徒歩（編集部目安）","station":"","minutes":"","access":"沢井駅から小澤酒造まで徒歩約5分","source":{"name":"小澤酒造 酒蔵見学（公式）","url":"https://www.sawanoi-sake.com/service/kengaku/","sourceType":"official_web","retrievedAt":"2026-08-29","verificationStatus":"needs_confirmation","originalId":"sawanoi-brewery-tour"},"sourceValue":"JR青梅線「沢井駅」から徒歩約5分。酒蔵見学は予約制で所要約40分です。個人見学は公式予約ページから申し込み、訪問前に最新の公式情報をご確認ください。","caution":"所要時間と移動順は編集部による目安です。訪問前に交通・営業の公式情報をご確認ください。"},"en":{"time":"Est. 3 hr 35 min","spots":"3 spots","distance":"JR Ome Line / bus / cable car / walking (editorial estimate)","station":"","minutes":"","access":"About 5 minutes on foot from Sawai Station to Ozawa Shuzo","source":{"name":"小澤酒造 酒蔵見学（公式）","url":"https://www.sawanoi-sake.com/service/kengaku/","sourceType":"official_web","retrievedAt":"2026-08-29","verificationStatus":"needs_confirmation","originalId":"sawanoi-brewery-tour"},"sourceValue":"JR青梅線「沢井駅」から徒歩約5分。酒蔵見学は予約制で所要約40分です。個人見学は公式予約ページから申し込み、訪問前に最新の公式情報をご確認ください。","caution":"Route timing and order are editorial estimates. Check official transport and operating information before visiting."},"zh-TW":{"time":"參考 3 小時 35 分鐘","spots":"3 個景點","distance":"JR／巴士／纜車／步行（編輯部參考）","station":"","minutes":"","access":"從沢井站步行約 5 分鐘可抵達小澤酒造","source":{"name":"小澤酒造 酒蔵見学（公式）","url":"https://www.sawanoi-sake.com/service/kengaku/","sourceType":"official_web","retrievedAt":"2026-08-29","verificationStatus":"needs_confirmation","originalId":"sawanoi-brewery-tour"},"sourceValue":"JR青梅線「沢井駅」から徒歩約5分。酒蔵見学は予約制で所要約40分です。個人見学は公式予約ページから申し込み、訪問前に最新の公式情報をご確認ください。","caution":"所需時間與移動順序僅供參考。造訪前請確認交通與營業的官方資訊。"}},
      "guidance": {"ja":"青梅・沢井・東京都 (東京西部)","en":"Ome / Sawai, Tokyo (Western Tokyo)","zh-TW":"東京都青梅・沢井（東京西部）"}
    },
    "full-day": {
      "arrival": {"kind": "station", "name": {"ja": "沢井駅", "en": "Sawai Station", "zh-TW": "澤井站"}, "spotId": "sawai-ozawa-shuzo", "sourceId": "admission-access"},
      "steps": [{"spotId":"sawai-ozawa-shuzo","description":{"ja":"沢井駅から徒歩で、澤乃井を醸す小澤酒造へ。多摩川の清流が流れる渓谷のほとりに酒蔵があります。","en":"Walk from Sawai Station to Ozawa Shuzo, the brewery behind the Sawanoi label, on the banks of the clear Tama River valley.","zh-TW":"從沢井站步行前往釀造澤乃井的小澤酒造。酒藏就位在多摩川清流流淌的溪谷河畔。"}},{"spotId":"sawanoien-garden","walk":{"ja":"徒歩（編集部目安） 約 5 分","en":"Walk (editorial estimate) · about 5 min","zh-TW":"步行（編輯部參考）約 5 分鐘"},"description":{"ja":"蔵元直営の清流ガーデン。多摩川を見下ろすオープンガーデンで、軽食やおつまみを楽しめます。","en":"The brewery-run Clear Stream Garden — an open garden overlooking the Tama River where you can enjoy light meals and snacks.","zh-TW":"蔵元直營的「清流花園」。在俯瞰多摩川的開放庭園中，可以享用輕食與小菜。"}},{"spotId":"mitake-shrine","walk":{"ja":"JR青梅線・バス・ケーブルカー・徒歩（編集部目安） 約 45 分","en":"JR Ome Line, bus, cable car & walking (editorial estimate) · about 45 min","zh-TW":"JR青梅線・巴士・纜車・步行（編輯部參考）約 45 分鐘"},"description":{"ja":"青梅市御岳に鎮座する御嶽神社。東京都指定有形文化財「御嶽神社旧本殿」が現存します。","en":"Mitake Shrine in Mitake, Ome, preserves its former main hall — a Tokyo-designated cultural property.","zh-TW":"坐落於青梅市御岳的御嶽神社。東京都指定有形文化財「御嶽神社舊本殿」至今仍存。"}},{"spotId":"baba-oshijutaku","walk":{"ja":"徒歩（編集部目安） 約 20 分","en":"Walk (editorial estimate) · about 20 min","zh-TW":"步行（編輯部參考）約 20 分鐘"},"description":{"ja":"かつて御嶽神社への参拝者を迎えた「馬場家御師住宅」。東京都指定有形文化財に指定されています。","en":"The Baba House oshi residence, which once lodged pilgrims to Mitake Shrine — a Tokyo-designated cultural property.","zh-TW":"過去曾接待御嶽神社參拜者的「馬場家御師住宅」，被指定為東京都指定有形文化財。"}}],
      "stats": {"ja":{"time":"目安 6 時間 10 分","spots":"4 スポット","distance":"JR青梅線・バス・ケーブル・徒歩（編集部目安）","station":"","minutes":"","access":"沢井駅から小澤酒造まで徒歩約5分","source":{"name":"小澤酒造 酒蔵見学（公式）","url":"https://www.sawanoi-sake.com/service/kengaku/","sourceType":"official_web","retrievedAt":"2026-08-29","verificationStatus":"needs_confirmation","originalId":"sawanoi-brewery-tour"},"sourceValue":"JR青梅線「沢井駅」から徒歩約5分。酒蔵見学は予約制で所要約40分です。個人見学は公式予約ページから申し込み、訪問前に最新の公式情報をご確認ください。","caution":"所要時間と移動順は編集部による目安です。訪問前に交通・営業の公式情報をご確認ください。"},"en":{"time":"Est. 6 hr 10 min","spots":"4 spots","distance":"JR Ome Line / bus / cable car / walking (editorial estimate)","station":"","minutes":"","access":"About 5 minutes on foot from Sawai Station to Ozawa Shuzo","source":{"name":"小澤酒造 酒蔵見学（公式）","url":"https://www.sawanoi-sake.com/service/kengaku/","sourceType":"official_web","retrievedAt":"2026-08-29","verificationStatus":"needs_confirmation","originalId":"sawanoi-brewery-tour"},"sourceValue":"JR青梅線「沢井駅」から徒歩約5分。酒蔵見学は予約制で所要約40分です。個人見学は公式予約ページから申し込み、訪問前に最新の公式情報をご確認ください。","caution":"Route timing and order are editorial estimates. Check official transport and operating information before visiting."},"zh-TW":{"time":"參考 6 小時 10 分鐘","spots":"4 個景點","distance":"JR／巴士／纜車／步行（編輯部參考）","station":"","minutes":"","access":"從沢井站步行約 5 分鐘可抵達小澤酒造","source":{"name":"小澤酒造 酒蔵見学（公式）","url":"https://www.sawanoi-sake.com/service/kengaku/","sourceType":"official_web","retrievedAt":"2026-08-29","verificationStatus":"needs_confirmation","originalId":"sawanoi-brewery-tour"},"sourceValue":"JR青梅線「沢井駅」から徒歩約5分。酒蔵見学は予約制で所要約40分です。個人見学は公式予約ページから申し込み、訪問前に最新の公式情報をご確認ください。","caution":"所需時間與移動順序僅供參考。造訪前請確認交通與營業的官方資訊。"}},
      "guidance": {"ja":"青梅・沢井・東京都 (東京西部)","en":"Ome / Sawai, Tokyo (Western Tokyo)","zh-TW":"東京都青梅・沢井（東京西部）"}
    }
  },
  "spots": {
    "sawai-ozawa-shuzo": {
      "presentation": {"id":"sawai-ozawa-shuzo","regionId":"ome","foodCultureId":"sake-ome","thumbnailAssetIds":[],"copy":{"ja":{"name":"小澤酒造（沢井・澤乃井）","lead":"小澤酒造は沢井にある酒蔵で、日本酒「澤乃井」を醸しています。多摩川の清流が流れる渓谷のほとりに位置します。","description":"小澤酒造は沢井にある酒蔵で、日本酒「澤乃井」を醸しています。多摩川の清流が流れる渓谷のほとりに位置します。","tags":["公式情報参照","確認中"],"practicalInfo":[{"label":"所在地","value":"東京都青梅市沢井2-770"}],"caution":["掲載情報は確認中です。営業・見学・交通などは訪問前に公式情報をご確認ください。"]},"en":{"name":"Ozawa Shuzo Sawai (Sawanoi)","lead":"Ozawa Shuzo is a sake brewery in Sawai that brews the \"Sawanoi\" label, on the banks of the clear Tama River valley.","description":"Ozawa Shuzo is a sake brewery in Sawai that brews the \"Sawanoi\" label, on the banks of the clear Tama River valley.","tags":["Official source","Confirmation pending"],"practicalInfo":[{"label":"Address","value":"東京都青梅市沢井2-770"}],"caution":["This listing is still being confirmed. Check official information for current operations, tours, and access before visiting."]},"zh-TW":{"name":"小澤酒造（沢井・澤乃井）","lead":"小澤酒造是位於沢井的酒藏，釀造日本酒「澤乃井」，坐落在多摩川清流流淌的溪谷河畔。","description":"小澤酒造是位於沢井的酒藏，釀造日本酒「澤乃井」，坐落在多摩川清流流淌的溪谷河畔。","tags":["參考官方資訊","確認中"],"practicalInfo":[{"label":"地址","value":"東京都青梅市沢井2-770"}],"caution":["刊載內容仍在確認中。造訪前請查看官方資訊，確認營業、參訪與交通條件。"]}}},
      "detail": {"tags":[{"tagId":"sake-brewery","color":"#8FAE5C","label":{"ja":"酒蔵","en":"Sake brewery","zh-TW":"酒藏"}},{"tagId":"official-source","color":"#F0A24C","label":{"ja":"公式・公的情報参照","en":"Official/public source","zh-TW":"參考官方・公部門資訊"}},{"tagId":"confirmation-pending","color":"#5D9BEF","label":{"ja":"確認中","en":"Confirmation pending","zh-TW":"確認中"}}],"description":{"ja":"小澤酒造は沢井にある酒蔵で、日本酒「澤乃井」を醸しています。多摩川の清流が流れる渓谷のほとりに位置します。","en":"Ozawa Shuzo is a sake brewery in Sawai that brews the \"Sawanoi\" label, on the banks of the clear Tama River valley.","zh-TW":"小澤酒造是位於沢井的酒藏，釀造日本酒「澤乃井」，坐落在多摩川清流流淌的溪谷河畔。"},"information":[{"fieldId":"name","icon":"information","label":{"ja":"施設","en":"Place","zh-TW":"設施"},"value":{"ja":"小澤酒造（沢井・澤乃井）","en":"Ozawa Shuzo Sawai (Sawanoi)","zh-TW":"小澤酒造（沢井・澤乃井）"}},{"fieldId":"address","icon":"information","label":{"ja":"所在地","en":"Address","zh-TW":"地址"},"value":{"ja":"東京都青梅市沢井2-770","en":"東京都青梅市沢井2-770","zh-TW":"東京都青梅市沢井2-770"}},{"fieldId":"access","icon":"train","label":{"ja":"アクセス・見学","en":"Access and tour","zh-TW":"交通・參訪"},"value":{"ja":"JR青梅線「沢井駅」から徒歩約5分。酒蔵見学は予約制で所要約40分です。個人見学は公式予約ページから申し込み、訪問前に最新の公式情報をご確認ください。","en":"About 5 minutes on foot from JR Sawai Station. Brewery tours require reservations and take about 40 minutes; individual visitors use the official booking page. Check current official information before visiting.","zh-TW":"從 JR 青梅線「沢井站」步行約 5 分鐘。酒藏參訪需預約，約 40 分鐘；個人請使用官方預約頁面。造訪前請確認最新官方資訊。"}},{"fieldId":"hours","icon":"clock","label":{"ja":"営業時間・見学時間","en":"Hours and tour times","zh-TW":"營業・參訪時間"},"value":{"ja":"酒蔵見学：平日 11:00・13:00／土日祝 11:00・12:30・14:00（予約制）","en":"Brewery tours: weekdays at 11:00 and 13:00; weekends and holidays at 11:00, 12:30, and 14:00 (reservation required)","zh-TW":"酒藏參訪：平日 11:00、13:00／週末及國定假日 11:00、12:30、14:00（需預約）"}},{"fieldId":"closed_days","icon":"clock","label":{"ja":"定休日・休業","en":"Closures","zh-TW":"公休日・休園"},"value":{"ja":"月曜日（祝日の場合は翌火曜日）","en":"Mondays (Tuesday when Monday is a public holiday)","zh-TW":"週一（若逢國定假日則順延至週二）"}},{"fieldId":"price_availability","icon":"information","label":{"ja":"見学料金","en":"Tour price","zh-TW":"參訪費用"},"value":{"ja":"700円（税込）／1人","en":"¥700 per person (tax included)","zh-TW":"每人 700 日圓（含稅）"}},{"fieldId":"reservation","icon":"information","label":{"ja":"予約","en":"Reservation","zh-TW":"預約"},"value":{"ja":"予約制（個人は公式予約ページから申込み）","en":"Reservation required (individual visitors use the official booking page)","zh-TW":"需預約（個人請使用官方預約頁面）"}},{"fieldId":"official_current_url","icon":"information","label":{"ja":"公式情報","en":"Official source","zh-TW":"官方資訊"},"value":{"ja":"https://www.sawanoi-sake.com/","en":"https://www.sawanoi-sake.com/","zh-TW":"https://www.sawanoi-sake.com/"}},{"fieldId":"verification_note","icon":"information","label":{"ja":"確認状況","en":"Verification status","zh-TW":"確認狀態"},"value":{"ja":"掲載内容は現在確認中です。営業・見学・交通などは、訪問前に公式情報をご確認ください。","en":"This listing is still being confirmed. Check official information for current operations, tours, and access before visiting.","zh-TW":"刊載內容仍在確認中。造訪前請以官方資訊確認營業、參訪與交通條件。"}}],"guide":{"title":{"ja":"酒蔵見学（予約制）","en":"Brewery tour (reservation required)","zh-TW":"酒藏參訪（需預約）"},"body":{"ja":"個人見学は公式予約ページから申し込みます。時間・休業・料金は変わる場合があるため、訪問前に最新情報をご確認ください。","en":"Individual visitors book through the official reservation page. Tour times, closures, and price can change, so check current information before visiting.","zh-TW":"個人參訪請使用官方預約頁面。參訪時間、休業與費用可能變更，造訪前請確認最新資訊。"},"action":{"ja":"公式見学案内を確認する","en":"Check official tour information","zh-TW":"查看官方參訪資訊"}},"caution":[{"ja":"・営業・見学・交通の条件は変更される場合があります。訪問前に公式情報をご確認ください。","en":"• Operations, tours, and access conditions can change. Check official information before visiting.","zh-TW":"・營業、參訪與交通條件可能變更。造訪前請查看官方資訊。"}]},
      "officialSource": {"name":"小澤酒造 酒蔵見学（公式）","url":"https://www.sawanoi-sake.com/service/kengaku/","sourceType":"official_web","retrievedAt":"2026-08-29","verificationStatus":"needs_confirmation","originalId":"sawanoi-brewery-tour"}
    },
    "sawanoien-garden": {
      "presentation": {"id":"sawanoien-garden","regionId":"ome","foodCultureId":"sake-ome","thumbnailAssetIds":[],"copy":{"ja":{"name":"澤乃井園","lead":"澤乃井園は小澤酒造が営む清流ガーデンです。多摩川を見下ろすオープンガーデンで軽食やおつまみを提供し、売店では生原酒のタンク量り売りがあります。","description":"澤乃井園は小澤酒造が営む清流ガーデンです。多摩川を見下ろすオープンガーデンで軽食やおつまみを提供し、売店では生原酒のタンク量り売りがあります。","tags":["公式情報参照","確認中"],"practicalInfo":[{"label":"所在地","value":"東京都青梅市沢井2-770"}],"caution":["掲載情報は確認中です。営業・見学・交通などは訪問前に公式情報をご確認ください。"]},"en":{"name":"Sawanoien Garden","lead":"Sawanoien is the brewery-run Clear Stream Garden overlooking the Tama River. It offers light meals and snacks, and its shop sells nama genshu from a tank by volume.","description":"Sawanoien is the brewery-run Clear Stream Garden overlooking the Tama River. It offers light meals and snacks, and its shop sells nama genshu from a tank by volume.","tags":["Official source","Confirmation pending"],"practicalInfo":[{"label":"Address","value":"東京都青梅市沢井2-770"}],"caution":["This listing is still being confirmed. Check official information for current operations, tours, and access before visiting."]},"zh-TW":{"name":"澤乃井園","lead":"澤乃井園是小澤酒造經營的清流花園。開放庭園俯瞰多摩川，提供輕食與下酒菜，園內商店以現量方式販售桶裝生原酒。","description":"澤乃井園是小澤酒造經營的清流花園。開放庭園俯瞰多摩川，提供輕食與下酒菜，園內商店以現量方式販售桶裝生原酒。","tags":["參考官方資訊","確認中"],"practicalInfo":[{"label":"地址","value":"東京都青梅市沢井2-770"}],"caution":["刊載內容仍在確認中。造訪前請查看官方資訊，確認營業、參訪與交通條件。"]}}},
      "detail": {"tags":[{"tagId":"brewery-garden","color":"#8FAE5C","label":{"ja":"清流ガーデン","en":"Riverside garden","zh-TW":"清流花園"}},{"tagId":"official-source","color":"#F0A24C","label":{"ja":"公式・公的情報参照","en":"Official/public source","zh-TW":"參考官方・公部門資訊"}},{"tagId":"confirmation-pending","color":"#5D9BEF","label":{"ja":"確認中","en":"Confirmation pending","zh-TW":"確認中"}}],"description":{"ja":"澤乃井園は小澤酒造が営む清流ガーデンです。多摩川を見下ろすオープンガーデンで軽食やおつまみを提供し、売店では生原酒のタンク量り売りがあります。","en":"Sawanoien is the brewery-run Clear Stream Garden overlooking the Tama River. It offers light meals and snacks, and its shop sells nama genshu from a tank by volume.","zh-TW":"澤乃井園是小澤酒造經營的清流花園。開放庭園俯瞰多摩川，提供輕食與下酒菜，園內商店以現量方式販售桶裝生原酒。"},"information":[{"fieldId":"name","icon":"information","label":{"ja":"施設","en":"Place","zh-TW":"設施"},"value":{"ja":"澤乃井園","en":"Sawanoien Garden","zh-TW":"澤乃井園"}},{"fieldId":"address","icon":"information","label":{"ja":"所在地","en":"Address","zh-TW":"地址"},"value":{"ja":"東京都青梅市沢井2-770","en":"東京都青梅市沢井2-770","zh-TW":"東京都青梅市沢井2-770"}},{"fieldId":"hours","icon":"clock","label":{"ja":"営業時間・見学時間","en":"Hours and tour times","zh-TW":"營業・參訪時間"},"value":{"ja":"10:00〜17:00","en":"10:00 a.m.–5:00 p.m.","zh-TW":"10:00–17:00"}},{"fieldId":"closed_days","icon":"clock","label":{"ja":"定休日・休業","en":"Closures","zh-TW":"公休日・休園"},"value":{"ja":"月曜日（祝日の場合は火曜日）・年末年始、その他休業あり。訪問前に最新の公式営業カレンダーをご確認ください。","en":"Mondays (Tuesday when Monday is a holiday) and year-end/New Year; other closures may apply. Check the current official operating calendar before visiting.","zh-TW":"週一（若週一為國定假日則週二休園）、年末年初，另有其他休園日。造訪前請查看最新官方營業日曆。"}},{"fieldId":"official_current_url","icon":"information","label":{"ja":"公式情報","en":"Official source","zh-TW":"官方資訊"},"value":{"ja":"https://www.sawanoi-sake.com/service/sawanoien/","en":"https://www.sawanoi-sake.com/service/sawanoien/","zh-TW":"https://www.sawanoi-sake.com/service/sawanoien/"}},{"fieldId":"verification_note","icon":"information","label":{"ja":"確認状況","en":"Verification status","zh-TW":"確認狀態"},"value":{"ja":"掲載内容は現在確認中です。営業・見学・交通などは、訪問前に公式情報をご確認ください。","en":"This listing is still being confirmed. Check official information for current operations, tours, and access before visiting.","zh-TW":"刊載內容仍在確認中。造訪前請以官方資訊確認營業、參訪與交通條件。"}}],"caution":[{"ja":"・営業・見学・交通の条件は変更される場合があります。訪問前に公式情報をご確認ください。","en":"• Operations, tours, and access conditions can change. Check official information before visiting.","zh-TW":"・營業、參訪與交通條件可能變更。造訪前請查看官方資訊。"}]},
      "officialSource": {"name":"小澤酒造 澤乃井園（公式）","url":"https://www.sawanoi-sake.com/service/sawanoien/","sourceType":"official_web","retrievedAt":"2026-08-29","verificationStatus":"needs_confirmation","originalId":"sawanoien"}
    },
    "mitake-shrine": {
      "presentation": {"id":"mitake-shrine","regionId":"ome","foodCultureId":"sake-ome","thumbnailAssetIds":[],"copy":{"ja":{"name":"御嶽神社","lead":"青梅市御岳にある御嶽神社。現存する旧本殿は、東京都指定有形文化財に指定されています。","description":"青梅市御岳にある御嶽神社。現存する旧本殿は、東京都指定有形文化財に指定されています。","tags":["公式情報参照","確認中"],"practicalInfo":[{"label":"所在地","value":"東京都青梅市御岳山176"}],"caution":["掲載情報は確認中です。営業・見学・交通などは訪問前に公式情報をご確認ください。"]},"en":{"name":"Mitake Shrine","lead":"Mitake Shrine stands in Mitake, Ome; its surviving former main hall is designated as a Tokyo cultural property.","description":"Mitake Shrine stands in Mitake, Ome; its surviving former main hall is designated as a Tokyo cultural property.","tags":["Official source","Confirmation pending"],"practicalInfo":[{"label":"Address","value":"東京都青梅市御岳山176"}],"caution":["This listing is still being confirmed. Check official information for current operations, tours, and access before visiting."]},"zh-TW":{"name":"御嶽神社","lead":"位於青梅市御岳的御嶽神社。現存的舊本殿被指定為東京都指定有形文化財。","description":"位於青梅市御岳的御嶽神社。現存的舊本殿被指定為東京都指定有形文化財。","tags":["參考官方資訊","確認中"],"practicalInfo":[{"label":"地址","value":"東京都青梅市御岳山176"}],"caution":["刊載內容仍在確認中。造訪前請查看官方資訊，確認營業、參訪與交通條件。"]}}},
      "detail": {"tags":[{"tagId":"heritage-context","color":"#8FAE5C","label":{"ja":"文化財","en":"Heritage","zh-TW":"文化財"}},{"tagId":"official-source","color":"#F0A24C","label":{"ja":"公式・公的情報参照","en":"Official/public source","zh-TW":"參考官方・公部門資訊"}},{"tagId":"confirmation-pending","color":"#5D9BEF","label":{"ja":"確認中","en":"Confirmation pending","zh-TW":"確認中"}}],"description":{"ja":"青梅市御岳にある御嶽神社。現存する旧本殿は、東京都指定有形文化財に指定されています。","en":"Mitake Shrine stands in Mitake, Ome; its surviving former main hall is designated as a Tokyo cultural property.","zh-TW":"位於青梅市御岳的御嶽神社。現存的舊本殿被指定為東京都指定有形文化財。"},"information":[{"fieldId":"name","icon":"information","label":{"ja":"施設","en":"Place","zh-TW":"設施"},"value":{"ja":"御嶽神社","en":"Mitake Shrine","zh-TW":"御嶽神社"}},{"fieldId":"address","icon":"information","label":{"ja":"所在地","en":"Address","zh-TW":"地址"},"value":{"ja":"東京都青梅市御岳山176","en":"東京都青梅市御岳山176","zh-TW":"東京都青梅市御岳山176"}},{"fieldId":"official_current_url","icon":"information","label":{"ja":"公式情報","en":"Official source","zh-TW":"官方資訊"},"value":{"ja":"https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv","en":"https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv","zh-TW":"https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv"}},{"fieldId":"verification_note","icon":"information","label":{"ja":"確認状況","en":"Verification status","zh-TW":"確認狀態"},"value":{"ja":"掲載内容は現在確認中です。営業・見学・交通などは、訪問前に公式情報をご確認ください。","en":"This listing is still being confirmed. Check official information for current operations, tours, and access before visiting.","zh-TW":"刊載內容仍在確認中。造訪前請以官方資訊確認營業、參訪與交通條件。"}}],"caution":[{"ja":"・営業・見学・交通の条件は変更される場合があります。訪問前に公式情報をご確認ください。","en":"• Operations, tours, and access conditions can change. Check official information before visiting.","zh-TW":"・營業、參訪與交通條件可能變更。造訪前請查看官方資訊。"}]},
      "officialSource": undefined
    },
    "baba-oshijutaku": {
      "presentation": {"id":"baba-oshijutaku","regionId":"ome","foodCultureId":"sake-ome","thumbnailAssetIds":[],"copy":{"ja":{"name":"馬場家御師住宅","lead":"馬場家御師住宅は、かつて御嶽神社への参拝者を迎えた御師の住宅で、東京都指定有形文化財です。","description":"馬場家御師住宅は、かつて御嶽神社への参拝者を迎えた御師の住宅で、東京都指定有形文化財です。","tags":["公式情報参照","確認中"],"practicalInfo":[{"label":"所在地","value":"東京都青梅市御岳山54"}],"caution":["掲載情報は確認中です。営業・見学・交通などは訪問前に公式情報をご確認ください。"]},"en":{"name":"Baba House Oshi Residence","lead":"The Baba House is a former oshi (pilgrim-host) residence that once received Mitake Shrine pilgrims — a Tokyo-designated cultural property.","description":"The Baba House is a former oshi (pilgrim-host) residence that once received Mitake Shrine pilgrims — a Tokyo-designated cultural property.","tags":["Official source","Confirmation pending"],"practicalInfo":[{"label":"Address","value":"東京都青梅市御岳山54"}],"caution":["This listing is still being confirmed. Check official information for current operations, tours, and access before visiting."]},"zh-TW":{"name":"馬場家御師住宅","lead":"馬場家御師住宅是過去曾接待御嶽神社參拜者的御師宅邸，為東京都指定有形文化財。","description":"馬場家御師住宅是過去曾接待御嶽神社參拜者的御師宅邸，為東京都指定有形文化財。","tags":["參考官方資訊","確認中"],"practicalInfo":[{"label":"地址","value":"東京都青梅市御岳山54"}],"caution":["刊載內容仍在確認中。造訪前請查看官方資訊，確認營業、參訪與交通條件。"]}}},
      "detail": {"tags":[{"tagId":"heritage-context","color":"#8FAE5C","label":{"ja":"文化財","en":"Heritage","zh-TW":"文化財"}},{"tagId":"official-source","color":"#F0A24C","label":{"ja":"公式・公的情報参照","en":"Official/public source","zh-TW":"參考官方・公部門資訊"}},{"tagId":"confirmation-pending","color":"#5D9BEF","label":{"ja":"確認中","en":"Confirmation pending","zh-TW":"確認中"}}],"description":{"ja":"馬場家御師住宅は、かつて御嶽神社への参拝者を迎えた御師の住宅で、東京都指定有形文化財です。","en":"The Baba House is a former oshi (pilgrim-host) residence that once received Mitake Shrine pilgrims — a Tokyo-designated cultural property.","zh-TW":"馬場家御師住宅是過去曾接待御嶽神社參拜者的御師宅邸，為東京都指定有形文化財。"},"information":[{"fieldId":"name","icon":"information","label":{"ja":"施設","en":"Place","zh-TW":"設施"},"value":{"ja":"馬場家御師住宅","en":"Baba House Oshi Residence","zh-TW":"馬場家御師住宅"}},{"fieldId":"address","icon":"information","label":{"ja":"所在地","en":"Address","zh-TW":"地址"},"value":{"ja":"東京都青梅市御岳山54","en":"東京都青梅市御岳山54","zh-TW":"東京都青梅市御岳山54"}},{"fieldId":"official_current_url","icon":"information","label":{"ja":"公式情報","en":"Official source","zh-TW":"官方資訊"},"value":{"ja":"https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv","en":"https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv","zh-TW":"https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv"}},{"fieldId":"verification_note","icon":"information","label":{"ja":"確認状況","en":"Verification status","zh-TW":"確認狀態"},"value":{"ja":"掲載内容は現在確認中です。営業・見学・交通などは、訪問前に公式情報をご確認ください。","en":"This listing is still being confirmed. Check official information for current operations, tours, and access before visiting.","zh-TW":"刊載內容仍在確認中。造訪前請以官方資訊確認營業、參訪與交通條件。"}}],"caution":[{"ja":"・営業・見学・交通の条件は変更される場合があります。訪問前に公式情報をご確認ください。","en":"• Operations, tours, and access conditions can change. Check official information before visiting.","zh-TW":"・營業、參訪與交通條件可能變更。造訪前請查看官方資訊。"}]},
      "officialSource": undefined
    }
  },
  "story": {
    "groups": {
      "nearby": [{"referenceId":"sawai-ozawa-shuzo","spotId":"sawai-ozawa-shuzo","badgeColor":"#E98A1C","badge":{"ja":"酒蔵","en":"Sake brewery","zh-TW":"酒藏"},"description":{"ja":"小澤酒造は沢井にある酒蔵で、日本酒「澤乃井」を醸しています。多摩川の清流が流れる渓谷のほとりに位置します。","en":"Ozawa Shuzo is a sake brewery in Sawai that brews the \"Sawanoi\" label, on the banks of the clear Tama River valley.","zh-TW":"小澤酒造是位於沢井的酒藏，釀造日本酒「澤乃井」，坐落在多摩川清流流淌的溪谷河畔。"},"note":{"ja":"見学は予約制・訪問前に公式情報を確認","en":"Tours require reservations · Check official information before visiting","zh-TW":"參訪需預約・造訪前請查看官方資訊"}},{"referenceId":"sawanoien-garden","spotId":"sawanoien-garden","badgeColor":"#E98A1C","badge":{"ja":"清流ガーデン","en":"Riverside garden","zh-TW":"清流花園"},"description":{"ja":"澤乃井園は小澤酒造が営む清流ガーデンです。多摩川を見下ろすオープンガーデンで軽食やおつまみを提供し、売店では生原酒のタンク量り売りがあります。","en":"Sawanoien is the brewery-run Clear Stream Garden overlooking the Tama River. It offers light meals and snacks, and its shop sells nama genshu from a tank by volume.","zh-TW":"澤乃井園是小澤酒造經營的清流花園。開放庭園俯瞰多摩川，提供輕食與下酒菜，園內商店以現量方式販售桶裝生原酒。"},"note":{"ja":"営業日は公式カレンダーを確認","en":"Check the official operating calendar","zh-TW":"請查看官方營業日曆"}}],
      "nature": [{"referenceId":"mitake-shrine","spotId":"mitake-shrine","badgeColor":"#5E7239","badge":{"ja":"文化財","en":"Heritage","zh-TW":"文化財"},"description":{"ja":"青梅市御岳にある御嶽神社。現存する旧本殿は、東京都指定有形文化財に指定されています。","en":"Mitake Shrine stands in Mitake, Ome; its surviving former main hall is designated as a Tokyo cultural property.","zh-TW":"位於青梅市御岳的御嶽神社。現存的舊本殿被指定為東京都指定有形文化財。"}},{"referenceId":"baba-oshijutaku","spotId":"baba-oshijutaku","badgeColor":"#5E7239","badge":{"ja":"文化財","en":"Heritage","zh-TW":"文化財"},"description":{"ja":"馬場家御師住宅は、かつて御嶽神社への参拝者を迎えた御師の住宅で、東京都指定有形文化財です。","en":"The Baba House is a former oshi (pilgrim-host) residence that once received Mitake Shrine pilgrims — a Tokyo-designated cultural property.","zh-TW":"馬場家御師住宅是過去曾接待御嶽神社參拜者的御師宅邸，為東京都指定有形文化財。"}}]
    },
    "location": {
      "ja": {"region":"青梅・沢井・東京都 (東京西部)","station":"最寄駅：沢井駅"},
      "en": {"region":"Ome / Sawai, Tokyo (Western Tokyo)","station":"Nearest station: Sawai"},
      "zh-TW": {"region":"東京都青梅・沢井（東京西部）","station":"最近車站：沢井站"}
    },
    "point": {
      "ja": {"title":"訪問前に確認すること","body":"酒蔵見学や営業・交通の条件は、出発前に公式情報を確認してください。"},
      "en": {"title":"Check before setting out","body":"Before setting out, check official information for brewery tours, opening conditions, and transport details."},
      "zh-TW": {"title":"出發前請確認","body":"出發前請查看官方資訊，確認酒藏參訪、營業與交通條件。"}
    }
  },
  "sources": {
    "admission-access": {"name": "JR East Ozawa Shuzo access", "url": "https://www.jreast.co.jp/hachioji/ome-itsukaichi/spot/detail386847.html", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "culture-1": {
      "name": "小澤酒造（公式サイト）",
      "url": "https://www.sawanoi-sake.com/",
      "sourceType": "official_web",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "ozawa-shuzo"
    },
    "culture-2": {
      "name": "GO TOKYO 日本酒ガイド（東京都観光公式サイト）",
      "url": "https://www.gotokyo.org/tc/workshop/sd009/",
      "sourceType": "official_web",
      "retrievedAt": "2026-08-14",
      "verificationStatus": "needs_confirmation",
      "originalId": "gotokyo-sd009"
    },
    "culture-3": {
      "name": "東京都青梅市における観光スポット一覧（オープンデータ）",
      "url": "https://catalog.data.metro.tokyo.lg.jp/dataset/t132055d0000000027",
      "license": "CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）",
      "sourceType": "open_data",
      "sourceDatasetId": "t132055d0000000027",
      "retrievedAt": "2026-08-14",
      "verificationStatus": "needs_confirmation",
      "originalId": "t132055d0000000027"
    },
    "route-1": {
      "name": "編集部（青梅・沢井の酒蔵と御嶽の文化財）",
      "url": "https://www.sawanoi-sake.com/",
      "sourceType": "official_web",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "seed-route-ome"
    },
    "route-2": {
      "name": "編集部（青梅・沢井の酒蔵と御嶽の文化財）",
      "url": "https://www.sawanoi-sake.com/",
      "sourceType": "official_web",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "seed-route-ome"
    },
    "route-3": {
      "name": "小澤酒造 酒蔵見学（公式）",
      "url": "https://www.sawanoi-sake.com/service/kengaku/",
      "sourceType": "official_web",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "sawanoi-brewery-tour"
    },
    "route-4": {
      "name": "小澤酒造 澤乃井園（公式）",
      "url": "https://www.sawanoi-sake.com/service/sawanoien/",
      "sourceType": "official_web",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "sawanoien"
    },
    "route-5": {
      "name": "御岳登山鉄道「御岳山へのアクセス」（公式）",
      "url": "https://www.mitaketozan.co.jp/accessmap.html",
      "sourceType": "business",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "mitake-tozan-access"
    },
    "route-6": {
      "name": "東京都教育庁 文化財一覧（東京都指定文化財）",
      "url": "https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv",
      "license": "CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）",
      "sourceType": "open_data",
      "sourceDatasetId": "445ee18d-ee49-4659-9667-de8630bd0d0e",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "御嶽神社旧本殿"
    },
    "sawai-ozawa-shuzo-1": {
      "name": "小澤酒造（公式サイト）",
      "url": "https://www.sawanoi-sake.com/",
      "sourceType": "official_web",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "ozawa-shuzo"
    },
    "sawai-ozawa-shuzo-2": {
      "name": "小澤酒造 酒蔵見学（公式）",
      "url": "https://www.sawanoi-sake.com/service/kengaku/",
      "sourceType": "official_web",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "sawanoi-brewery-tour"
    },
    "sawanoien-garden-1": {
      "name": "小澤酒造 澤乃井園（公式）",
      "url": "https://www.sawanoi-sake.com/service/sawanoien/",
      "sourceType": "official_web",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "sawanoien"
    },
    "sawanoien-garden-2": {
      "name": "小澤酒造 澤乃井園（公式）",
      "url": "https://www.sawanoi-sake.com/service/sawanoien/",
      "sourceType": "official_web",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "sawanoien"
    },
    "mitake-shrine-1": {
      "name": "東京都教育庁 文化財一覧（東京都指定文化財）",
      "url": "https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv",
      "license": "CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）",
      "sourceType": "open_data",
      "sourceDatasetId": "445ee18d-ee49-4659-9667-de8630bd0d0e",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "御嶽神社旧本殿"
    },
    "mitake-shrine-2": {
      "name": "東京都教育庁 文化財一覧（東京都指定文化財）",
      "url": "https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv",
      "license": "CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）",
      "sourceType": "open_data",
      "sourceDatasetId": "445ee18d-ee49-4659-9667-de8630bd0d0e",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "御嶽神社旧本殿"
    },
    "baba-oshijutaku-1": {
      "name": "東京都教育庁 文化財一覧（東京都指定文化財）",
      "url": "https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv",
      "license": "CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）",
      "sourceType": "open_data",
      "sourceDatasetId": "445ee18d-ee49-4659-9667-de8630bd0d0e",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "馬場家御師住宅"
    },
    "baba-oshijutaku-2": {
      "name": "東京都教育庁 文化財一覧（東京都指定文化財）",
      "url": "https://www.opendata.metro.tokyo.lg.jp/suisyoudataset/130001_cultural_property.csv",
      "license": "CC BY 4.0（クリエイティブ・コモンズ 表示 4.0）",
      "sourceType": "open_data",
      "sourceDatasetId": "445ee18d-ee49-4659-9667-de8630bd0d0e",
      "retrievedAt": "2026-08-29",
      "verificationStatus": "needs_confirmation",
      "originalId": "御嶽神社旧本殿"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": ["culture-1","culture-2","culture-3","route-1","route-2","route-3","route-4","route-5","route-6"],
      "origin": "editorial"
    },
    "journey.chapters": {
      "sourceIds": ["culture-1","culture-2","culture-3","route-1","route-2","route-3","route-4","route-5","route-6"],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6"],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6"],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6"],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6"],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": ["culture-1","culture-2","culture-3","route-1","route-2","route-3","route-4","route-5","route-6"],
      "origin": "editorial"
    },
    "spots.sawai-ozawa-shuzo": {
      "sourceIds": ["sawai-ozawa-shuzo-1","sawai-ozawa-shuzo-2"],
      "origin": "source"
    },
    "spots.sawai-ozawa-shuzo.detail.information.0.value": {
      "sourceIds": ["sawai-ozawa-shuzo-1","sawai-ozawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.sawai-ozawa-shuzo.detail.information.1.value": {
      "sourceIds": ["sawai-ozawa-shuzo-1","sawai-ozawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.sawai-ozawa-shuzo.detail.information.2.value": {
      "sourceIds": ["sawai-ozawa-shuzo-1","sawai-ozawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.sawai-ozawa-shuzo.detail.information.3.value": {
      "sourceIds": ["sawai-ozawa-shuzo-1","sawai-ozawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.sawai-ozawa-shuzo.detail.information.4.value": {
      "sourceIds": ["sawai-ozawa-shuzo-1","sawai-ozawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.sawai-ozawa-shuzo.detail.information.5.value": {
      "sourceIds": ["sawai-ozawa-shuzo-1","sawai-ozawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.sawai-ozawa-shuzo.detail.information.6.value": {
      "sourceIds": ["sawai-ozawa-shuzo-1","sawai-ozawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.sawai-ozawa-shuzo.detail.information.7.value": {
      "sourceIds": ["sawai-ozawa-shuzo-1","sawai-ozawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.sawai-ozawa-shuzo.detail.information.8.value": {
      "sourceIds": ["sawai-ozawa-shuzo-1","sawai-ozawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.sawanoien-garden": {
      "sourceIds": ["sawanoien-garden-1","sawanoien-garden-2"],
      "origin": "source"
    },
    "spots.sawanoien-garden.detail.information.0.value": {
      "sourceIds": ["sawanoien-garden-1","sawanoien-garden-2"],
      "origin": "editorial"
    },
    "spots.sawanoien-garden.detail.information.1.value": {
      "sourceIds": ["sawanoien-garden-1","sawanoien-garden-2"],
      "origin": "editorial"
    },
    "spots.sawanoien-garden.detail.information.2.value": {
      "sourceIds": ["sawanoien-garden-1","sawanoien-garden-2"],
      "origin": "editorial"
    },
    "spots.sawanoien-garden.detail.information.3.value": {
      "sourceIds": ["sawanoien-garden-1","sawanoien-garden-2"],
      "origin": "editorial"
    },
    "spots.sawanoien-garden.detail.information.4.value": {
      "sourceIds": ["sawanoien-garden-1","sawanoien-garden-2"],
      "origin": "editorial"
    },
    "spots.sawanoien-garden.detail.information.5.value": {
      "sourceIds": ["sawanoien-garden-1","sawanoien-garden-2"],
      "origin": "editorial"
    },
    "spots.mitake-shrine": {
      "sourceIds": ["mitake-shrine-1","mitake-shrine-2"],
      "origin": "source"
    },
    "spots.mitake-shrine.detail.information.0.value": {
      "sourceIds": ["mitake-shrine-1","mitake-shrine-2"],
      "origin": "editorial"
    },
    "spots.mitake-shrine.detail.information.1.value": {
      "sourceIds": ["mitake-shrine-1","mitake-shrine-2"],
      "origin": "editorial"
    },
    "spots.mitake-shrine.detail.information.2.value": {
      "sourceIds": ["mitake-shrine-1","mitake-shrine-2"],
      "origin": "editorial"
    },
    "spots.mitake-shrine.detail.information.3.value": {
      "sourceIds": ["mitake-shrine-1","mitake-shrine-2"],
      "origin": "editorial"
    },
    "spots.baba-oshijutaku": {
      "sourceIds": ["baba-oshijutaku-1","baba-oshijutaku-2"],
      "origin": "source"
    },
    "spots.baba-oshijutaku.detail.information.0.value": {
      "sourceIds": ["baba-oshijutaku-1","baba-oshijutaku-2"],
      "origin": "editorial"
    },
    "spots.baba-oshijutaku.detail.information.1.value": {
      "sourceIds": ["baba-oshijutaku-1","baba-oshijutaku-2"],
      "origin": "editorial"
    },
    "spots.baba-oshijutaku.detail.information.2.value": {
      "sourceIds": ["baba-oshijutaku-1","baba-oshijutaku-2"],
      "origin": "editorial"
    },
    "spots.baba-oshijutaku.detail.information.3.value": {
      "sourceIds": ["baba-oshijutaku-1","baba-oshijutaku-2"],
      "origin": "editorial"
    }
  }
};
