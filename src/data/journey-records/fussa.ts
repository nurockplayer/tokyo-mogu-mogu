import type { JourneyRecord } from '../journey-record';

export const fussaJourneyRecord: JourneyRecord = {
  "municipalityId": "fussa",
  "alcoholThemed": true,
  "journey": {
    "id": "demo-tokyo-west-fussa-sake",
    "regionId": "fussa",
    "foodCultureId": "sake-fussa",
    "storyId": "sake-fussa",
    "routeId": "fussa-sake-journey",
    "copy": {
      "ja": {"title":"福生の2つの酒蔵と水のまちをめぐる旅","subtitle":"福生の日本酒","description":"田村酒造場と石川酒造。多摩川と水の記憶をたどりながら、福生の日本酒文化に出会う。","tags":["福生の日本酒","水のまち","半日・一日"],"storyTitle":"福生の日本酒の物語","intro":["福生には、江戸時代から続く田村酒造場と石川酒造という2つの酒蔵があります。酒蔵の歴史と多摩川・玉川上水の水の記憶を、歩いてたどる食文化の旅です。","田村酒造場と石川酒造。多摩川と水の記憶をたどりながら、福生の日本酒文化に出会う。"]},
      "en": {"title":"Fussa Two Breweries & Water Heritage Journey","subtitle":"Fussa Sake","description":"Meet Fussa sake through Tamura Shuzojo and Ishikawa Brewery, following the city’s water and brewing heritage.","tags":["Fussa sake","Water heritage","Half or full day"],"storyTitle":"The Story of Fussa Sake","intro":["Fussa is home to two breweries with Edo-period roots: Tamura Shuzojo and Ishikawa Brewery. This food-culture journey follows their history and the city’s relationship with Tama River water and canals.","Meet Fussa sake through Tamura Shuzojo and Ishikawa Brewery, following the city’s water and brewing heritage."]},
      "zh-TW": {"title":"福生兩座酒藏與水之城之旅","subtitle":"福生的日本酒","description":"透過田村酒造場與石川酒造，沿著福生的水與釀酒歷史認識當地日本酒文化。","tags":["福生日本酒","水之歷史","半日・一日"],"storyTitle":"福生日本酒的故事","intro":["福生有兩座可追溯至江戶時代的酒藏：田村酒造場與石川酒造。這趟飲食文化旅程，將沿著酒藏歷史與多摩川、水道所形塑的城市記憶前進。","透過田村酒造場與石川酒造，沿著福生的水與釀酒歷史認識當地日本酒文化。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"福生に続く酒造り","body":"福生市の公式案内では、田村酒造場は文政5年（1822年）、石川酒造は文久3年（1863年）の創業と紹介されています。"},{"number":"02.","title":"田村酒造場と石川酒造","body":"田村酒造場は「嘉泉」、石川酒造は「多満自慢」などを醸す、福生の2つの酒蔵です。見学・販売の条件は各公式サイトで確認します。"},{"number":"03.","title":"訪問前に確認すること","body":"酒蔵の営業内容や見学条件、商品の在庫は時期や施設ごとに変わります。古い案内をそのまま旅程にせず、出発前と当日に公式情報を確認することが大切です。"},{"number":"04.","title":"福生の酒蔵を訪ねる","body":"田村酒造場からくるみる ふっさを経て石川酒造へ。順路は編集部の提案です。見学・飲食・販売の条件や交通は、訪問前と当日に各公式情報で確認してください。"}],
      "en": [{"number":"01.","title":"Brewing in Fussa","body":"Fussa City identifies Tamura Shuzojo as founded in 1822 and Ishikawa Brewery as founded in 1863."},{"number":"02.","title":"Tamura Shuzojo and Ishikawa Brewery","body":"Fussa’s two breweries include Tamura Shuzojo, maker of Kasen, and Ishikawa Brewery, maker of Tamajiman. Check each operator’s current site for visits and sales."},{"number":"03.","title":"Before visiting","body":"Opening details, tour conditions, and stock vary by season and facility. Instead of treating an old guide as a promise, check official information before and during the trip."},{"number":"04.","title":"Follow Fussa’s brewery route","body":"Follow an editorial sequence from Tamura Shuzojo through Kurumiru Fussa to Ishikawa Brewery. Check current tour, dining, sales, and transport information with official sources before and during the visit."}],
      "zh-TW": [{"number":"01.","title":"福生延續的釀酒文化","body":"福生市官方介紹指出，田村酒造場創業於1822年，石川酒造創業於1863年。"},{"number":"02.","title":"田村酒造場與石川酒造","body":"福生的兩座酒藏包括釀造「嘉泉」的田村酒造場，以及釀造「多満自慢」的石川酒造。參訪與販售條件請查看各經營者的最新網站。"},{"number":"03.","title":"造訪前請確認","body":"營業內容、見學條件與商品庫存會因季節與設施而變動。不要把舊資訊當成保證，請在出發前與旅途中確認官方資訊。"},{"number":"04.","title":"走訪福生酒藏","body":"這是編輯部建議的順序：從田村酒造場出發，經過くるみる ふっさ，再前往石川酒造。造訪前與當天請向官方資訊確認參訪、餐飲、販售及交通安排。"}]
    },
    "routeVariants": [
      {"id":"half-day","durationMinutes":195,"steps":[{"spotId":"fussa-tamura-shuzo"},{"spotId":"fussa-kurumiru"},{"spotId":"fussa-ishikawa-shuzo"}]},
      {"id":"full-day","durationMinutes":265,"steps":[{"spotId":"fussa-tamura-shuzo"},{"spotId":"fussa-kurumiru"},{"spotId":"fussa-ishikawa-shuzo"}]}
    ]
  },
  "routeName": {
    "ja": "福生の2つの酒蔵と水のまちをめぐる旅",
    "en": "Fussa Two Breweries & Water Heritage Journey",
    "zh-TW": "福生兩座酒藏與水之城之旅"
  },
  "location": {
    "ja": {
      "area": "福生・東京",
      "station": "",
      "access": "JR青梅線「福生駅」から徒歩約10分（公式案内）。",
      "source": {"name":"田村酒造場（公式）","url":"https://www.tamurashuzojo.com/page/kura","sourceType":"business","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"tamura-shuzojo-kura"},
      "sourceValue": "JR青梅線「福生駅」から徒歩約10分（公式案内）。"
    },
    "en": {
      "area": "Fussa, Tokyo",
      "station": "",
      "access": "About a 10-minute walk from JR Ome Line Fussa Station (official guidance).",
      "source": {"name":"田村酒造場（公式）","url":"https://www.tamurashuzojo.com/page/kura","sourceType":"business","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"tamura-shuzojo-kura"},
      "sourceValue": "About a 10-minute walk from JR Ome Line Fussa Station (official guidance)."
    },
    "zh-TW": {
      "area": "東京都福生",
      "station": "",
      "access": "從JR青梅線福生站步行約10分鐘（官方指引）。",
      "source": {"name":"田村酒造場（公式）","url":"https://www.tamurashuzojo.com/page/kura","sourceType":"business","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"tamura-shuzojo-kura"},
      "sourceValue": "JR青梅線「福生駅」から徒歩約10分（公式案内）。"
    }
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "福生駅西口", "en": "Fussa Station West Exit", "zh-TW": "福生站西口"}, "spotId": "fussa-kurumiru", "sourceId": "route-7"},
      "steps": [{"spotId":"fussa-tamura-shuzo","description":{"ja":"福生駅から田村酒造場へ。文政5年（1822年）創業と紹介される酒蔵の物語をたどり、見学や販売の条件は公式情報で確認します。","en":"Walk from Fussa Station to Tamura Shuzojo. Follow the story of a brewery founded in 1822, and check the official site for current visit and sales conditions.","zh-TW":"從福生站步行前往田村酒造場。追尋一座官方介紹為1822年創業的酒藏故事，參訪與販售條件請查看官方網站。"}},{"spotId":"fussa-kurumiru","description":{"ja":"くるみる ふっさで市内の観光情報や名産品の情報を集め、次に訪ねる酒蔵の最新案内を確認しましょう。","en":"Use Kurumiru Fussa to gather current sightseeing and local-product information before continuing to the second brewery.","zh-TW":"在くるみる ふっさ收集最新觀光與在地名產資訊，並確認接下來酒藏的最新安排。"}},{"spotId":"fussa-ishikawa-shuzo","description":{"ja":"石川酒造で、福生に続く酒造りのもう一つの系譜をたどります。施設ごとの営業・見学条件は公式サイトで確認してください。","en":"Trace Fussa’s other brewing lineage at Ishikawa Brewery. Check the operator site for current conditions by facility and visit type.","zh-TW":"在石川酒造追尋福生另一條釀酒脈絡。各設施與參訪形式的最新條件請查看經營者網站。"}}],
      "stats": {"ja":{"time":"目安 3 時間 15 分","spots":"3 スポット","distance":"徒歩・JR青梅線（目安、現地の案内を確認）","station":"","minutes":"","access":"JR青梅線「福生駅」から徒歩約10分（公式案内）。","source":{"name":"田村酒造場（公式）","url":"https://www.tamurashuzojo.com/page/kura","sourceType":"business","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"tamura-shuzojo-kura"},"sourceValue":"JR青梅線「福生駅」から徒歩約10分（公式案内）。","caution":"所要時間・滞在時間・移動時間は編集部の目安です。見学・営業・交通の最新情報を確認してください。"},"en":{"time":"Est. 3 hr 15 min","spots":"3 spots","distance":"Walking & JR Ome Line (estimate; check local guidance)","station":"","minutes":"","access":"About a 10-minute walk from JR Ome Line Fussa Station (official guidance).","source":{"name":"田村酒造場（公式）","url":"https://www.tamurashuzojo.com/page/kura","sourceType":"business","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"tamura-shuzojo-kura"},"sourceValue":"JR青梅線「福生駅」から徒歩約10分（公式案内）。","caution":"Total, stay, and travel times are editorial estimates; check current tour, opening, and transport information."},"zh-TW":{"time":"參考 3 小時 15 分鐘","spots":"3 個景點","distance":"步行・JR青梅線（估算，請確認現地指引）","station":"","minutes":"","access":"從JR青梅線福生站步行約10分鐘（官方指引）。","source":{"name":"田村酒造場（公式）","url":"https://www.tamurashuzojo.com/page/kura","sourceType":"business","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"tamura-shuzojo-kura"},"sourceValue":"JR青梅線「福生駅」から徒歩約10分（公式案内）。","caution":"總時間、停留時間與移動時間為編輯部估算；請確認最新的見學、營業與交通資訊。"}},
      "guidance": {"ja":"福生・東京","en":"Fussa, Tokyo","zh-TW":"東京都福生"}
    },
    "full-day": {
      "arrival": {"kind": "station", "name": {"ja": "福生駅西口", "en": "Fussa Station West Exit", "zh-TW": "福生站西口"}, "spotId": "fussa-kurumiru", "sourceId": "route-7"},
      "steps": [{"spotId":"fussa-tamura-shuzo","description":{"ja":"田村酒造場で、福生の水と酒造りの歴史を知ります。見学・予約・販売の条件は当日の公式情報を確認してください。","en":"Spend time with Fussa’s water and brewing history at Tamura Shuzojo. Confirm tours, reservations, and sales conditions from the current official information.","zh-TW":"從福生站步行前往田村酒造場。追尋一座官方介紹為1822年創業的酒藏故事，參訪與販售條件請查看官方網站。"}},{"spotId":"fussa-kurumiru","description":{"ja":"観光案内所で、酒蔵や水のまちに関する最新情報と、当日立ち寄れる場所を確認します。","en":"At the tourist information center, check current options for the breweries and Fussa’s water heritage.","zh-TW":"在くるみる ふっさ收集最新觀光與在地名產資訊，並確認接下來酒藏的最新安排。"}},{"spotId":"fussa-ishikawa-shuzo","description":{"ja":"石川酒造の酒造りと地域に根づく施設を訪ねます。食事・売店・見学の営業条件は施設ごとに異なるため、公式サイトで確認します。","en":"Explore Ishikawa Brewery and its place in the local area. Dining, retail, and tour conditions vary by facility, so check the current official site.","zh-TW":"在石川酒造追尋福生另一條釀酒脈絡。各設施與參訪形式的最新條件請查看經營者網站。"}}],
      "stats": {"ja":{"time":"目安 4 時間 25 分","spots":"3 スポット","distance":"徒歩・JR青梅線（目安、現地の案内を確認）","station":"","minutes":"","access":"JR青梅線「福生駅」から徒歩約10分（公式案内）。","source":{"name":"田村酒造場（公式）","url":"https://www.tamurashuzojo.com/page/kura","sourceType":"business","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"tamura-shuzojo-kura"},"sourceValue":"JR青梅線「福生駅」から徒歩約10分（公式案内）。","caution":"所要時間・滞在時間・移動時間は編集部の目安です。見学・営業・交通の最新情報を確認してください。"},"en":{"time":"Est. 4 hr 25 min","spots":"3 spots","distance":"Walking & JR Ome Line (estimate; check local guidance)","station":"","minutes":"","access":"About a 10-minute walk from JR Ome Line Fussa Station (official guidance).","source":{"name":"田村酒造場（公式）","url":"https://www.tamurashuzojo.com/page/kura","sourceType":"business","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"tamura-shuzojo-kura"},"sourceValue":"JR青梅線「福生駅」から徒歩約10分（公式案内）。","caution":"Total, stay, and travel times are editorial estimates; check current tour, opening, and transport information."},"zh-TW":{"time":"參考 4 小時 25 分鐘","spots":"3 個景點","distance":"步行・JR青梅線（估算，請確認現地指引）","station":"","minutes":"","access":"從JR青梅線福生站步行約10分鐘（官方指引）。","source":{"name":"田村酒造場（公式）","url":"https://www.tamurashuzojo.com/page/kura","sourceType":"business","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"tamura-shuzojo-kura"},"sourceValue":"JR青梅線「福生駅」から徒歩約10分（公式案内）。","caution":"總時間、停留時間與移動時間為編輯部估算；請確認最新的見學、營業與交通資訊。"}},
      "guidance": {"ja":"福生・東京","en":"Fussa, Tokyo","zh-TW":"東京都福生"}
    }
  },
  "spots": {
    "fussa-tamura-shuzo": {
      "presentation": {"id":"fussa-tamura-shuzo","regionId":"fussa","foodCultureId":"sake-fussa","thumbnailAssetIds":[],"copy":{"ja":{"name":"田村酒造場","lead":"田村酒造場は福生で酒造りを続ける酒蔵です。見学・販売・営業日の条件は、当日の公式情報を確認してください。","description":"田村酒造場は福生で酒造りを続ける酒蔵です。見学・販売・営業日の条件は、当日の公式情報を確認してください。","tags":["公的・公式情報参照","確認中"],"practicalInfo":[{"label":"所在地","value":"東京都福生市福生626"},{"label":"アクセス","value":"JR青梅線「福生駅」から徒歩約10分（公式案内）。"},{"label":"営業時間","value":"営業時間は公式案内の営業カレンダーを確認してください。"}],"caution":["営業・見学・販売・交通などの条件は変わる場合があります。訪問前に各公式情報をご確認ください。"]},"en":{"name":"Tamura Shuzojo","lead":"Tamura Shuzojo is a Fussa brewery with a long brewing history. Check the current official information for tours, sales, and opening conditions.","description":"Tamura Shuzojo is a Fussa brewery with a long brewing history. Check the current official information for tours, sales, and opening conditions.","tags":["Official/public information","Confirmation pending"],"practicalInfo":[{"label":"Address","value":"東京都福生市福生626"},{"label":"Access","value":"About a 10-minute walk from JR Ome Line Fussa Station (official guidance)."},{"label":"Hours","value":"Check the operator’s calendar for current opening hours."}],"caution":["Operations, visits, sales, and transport conditions can change. Check each official source before visiting."]},"zh-TW":{"name":"田村酒造場","lead":"田村酒造場是在福生延續釀酒歷史的酒藏。見學、販售與營業日條件請確認當天的官方資訊。","description":"田村酒造場是在福生延續釀酒歷史的酒藏。見學、販售與營業日條件請確認當天的官方資訊。","tags":["參考官方／公部門資訊","確認中"],"practicalInfo":[{"label":"地址","value":"東京都福生市福生626"},{"label":"交通","value":"從JR青梅線福生站步行約10分鐘（官方指引）。"},{"label":"營業時間","value":"請查看經營者日曆以確認最新營業時間。"}],"caution":["營業、參訪、販售與交通條件可能變更。造訪前請查看各官方資訊。"]}}},
      "detail": {"tags":[{"tagId":"official-source","color":"#F0A24C","label":{"ja":"公式・公的情報参照","en":"Official/public information","zh-TW":"參考官方／公部門資訊"}},{"tagId":"confirmation-pending","color":"#5D9BEF","label":{"ja":"確認中","en":"Confirmation pending","zh-TW":"確認中"}}],"description":{"ja":"田村酒造場は福生で酒造りを続ける酒蔵です。見学・販売・営業日の条件は、当日の公式情報を確認してください。","en":"Tamura Shuzojo is a Fussa brewery with a long brewing history. Check the current official information for tours, sales, and opening conditions.","zh-TW":"田村酒造場是在福生延續釀酒歷史的酒藏。見學、販售與營業日條件請確認當天的官方資訊。"},"information":[{"fieldId":"name","icon":"information","label":{"ja":"施設","en":"Place","zh-TW":"設施"},"value":{"ja":"田村酒造場","en":"Tamura Shuzojo","zh-TW":"田村酒造場"}},{"fieldId":"address","icon":"information","label":{"ja":"所在地","en":"Address","zh-TW":"地址"},"value":{"ja":"東京都福生市福生626","en":"東京都福生市福生626","zh-TW":"東京都福生市福生626"}},{"fieldId":"access","icon":"train","label":{"ja":"アクセス","en":"Access","zh-TW":"交通"},"value":{"ja":"JR青梅線「福生駅」から徒歩約10分（公式案内）。","en":"About a 10-minute walk from JR Ome Line Fussa Station (official guidance).","zh-TW":"從JR青梅線福生站步行約10分鐘（官方指引）。"}},{"fieldId":"hours","icon":"clock","label":{"ja":"営業時間・案内","en":"Hours and guidance","zh-TW":"營業時間與指引"},"value":{"ja":"営業時間は公式案内の営業カレンダーを確認してください。","en":"Check the operator’s calendar for current opening hours.","zh-TW":"請查看經營者日曆以確認最新營業時間。"}},{"fieldId":"official_current_url","icon":"information","label":{"ja":"公式情報","en":"Official information","zh-TW":"官方資訊"},"value":{"ja":"https://www.tamurashuzojo.com/page/kura","en":"https://www.tamurashuzojo.com/page/kura","zh-TW":"https://www.tamurashuzojo.com/page/kura"}},{"fieldId":"verification_note","icon":"information","label":{"ja":"確認状況","en":"Verification status","zh-TW":"確認狀態"},"value":{"ja":"該当する公式・市の情報を2026年9月26日に取得。掲載内容は確認中です。訪問前に営業・見学・施設ごとの条件を確認してください。","en":"Matching official or city information was retrieved Sep 26, 2026. This listing is still being confirmed; check current hours, visits, and facility-specific conditions before going.","zh-TW":"對應的官方或市政府資訊於 2026 年 9 月 26 日取得。刊載內容仍在確認中；造訪前請確認營業、參訪與各設施條件。"}}],"caution":[{"ja":"・見学、営業、販売、交通などの条件は変更される場合があります。訪問前に各公式情報をご確認ください。","en":"• Tour, operating, sales, and transport conditions can change. Check each official source before visiting.","zh-TW":"・參訪、營業、販售與交通條件可能變更。造訪前請查看各官方資訊。"}]},
      "officialSource": undefined
    },
    "fussa-kurumiru": {
      "visitorSourceId": "fussa-kurumiru-2",
      "presentation": {"id":"fussa-kurumiru","regionId":"fussa","foodCultureId":"sake-fussa","thumbnailAssetIds":[],"copy":{"ja":{"name":"くるみる ふっさ","lead":"くるみる ふっさは、福生の観光情報や名産品の情報を集める案内所です。酒蔵めぐりの最新情報を確認する中継点にします。","description":"くるみる ふっさは、福生の観光情報や名産品の情報を集める案内所です。酒蔵めぐりの最新情報を確認する中継点にします。","tags":["公的・公式情報参照","確認中"],"practicalInfo":[{"label":"所在地","value":"東京都福生市本町23"},{"label":"アクセス","value":"JR青梅線「福生駅」西口から徒歩約5分（市の案内）。"},{"label":"営業時間","value":"10:00〜18:00（訪問前に最新情報を確認してください）。"},{"label":"休業日","value":"月曜・木曜（祝日の場合は翌平日）、年末年始（12月29日〜1月3日）。最新情報を確認してください。"}],"caution":["営業・見学・販売・交通などの条件は変わる場合があります。訪問前に各公式情報をご確認ください。"]},"en":{"name":"Kurumiru Fussa Tourist Information Center","lead":"Kurumiru Fussa is a visitor center for local sightseeing information and products — a useful checkpoint for current brewery-visit details.","description":"Kurumiru Fussa is a visitor center for local sightseeing information and products — a useful checkpoint for current brewery-visit details.","tags":["Official/public information","Confirmation pending"],"practicalInfo":[{"label":"Address","value":"東京都福生市本町23"},{"label":"Access","value":"About a 5-minute walk from the west exit of JR Ome Line Fussa Station (city guidance)."},{"label":"Hours","value":"10:00 a.m.–6:00 p.m. (check current information before visiting)."},{"label":"Closures","value":"Monday and Thursday (when a holiday, the following business day); Dec 29–Jan 3. Check current information."}],"caution":["Operations, visits, sales, and transport conditions can change. Check each official source before visiting."]},"zh-TW":{"name":"くるみる ふっさ","lead":"くるみる ふっさ是收集福生觀光與名產資訊的服務中心，也可作為確認酒藏最新資訊的中繼點。","description":"くるみる ふっさ是收集福生觀光與名產資訊的服務中心，也可作為確認酒藏最新資訊的中繼點。","tags":["參考官方／公部門資訊","確認中"],"practicalInfo":[{"label":"地址","value":"東京都福生市本町23"},{"label":"交通","value":"從 JR 青梅線福生站西口步行約 5 分鐘（市政府指引）。"},{"label":"營業時間","value":"10:00–18:00（造訪前請確認最新資訊）。"},{"label":"休息日","value":"週一、週四（遇國定假日則順延至下一個工作日）；12 月 29 日至 1 月 3 日。請確認最新資訊。"}],"caution":["營業、參訪、販售與交通條件可能變更。造訪前請查看各官方資訊。"]}}},
      "detail": {"tags":[{"tagId":"official-source","color":"#F0A24C","label":{"ja":"公式・公的情報参照","en":"Official/public information","zh-TW":"參考官方／公部門資訊"}},{"tagId":"confirmation-pending","color":"#5D9BEF","label":{"ja":"確認中","en":"Confirmation pending","zh-TW":"確認中"}}],"description":{"ja":"くるみる ふっさは、福生の観光情報や名産品の情報を集める案内所です。酒蔵めぐりの最新情報を確認する中継点にします。","en":"Kurumiru Fussa is a visitor center for local sightseeing information and products — a useful checkpoint for current brewery-visit details.","zh-TW":"くるみる ふっさ是收集福生觀光與名產資訊的服務中心，也可作為確認酒藏最新資訊的中繼點。"},"information":[{"fieldId":"name","icon":"information","label":{"ja":"施設","en":"Place","zh-TW":"設施"},"value":{"ja":"くるみる ふっさ","en":"Kurumiru Fussa Tourist Information Center","zh-TW":"くるみる ふっさ"}},{"fieldId":"address","icon":"information","label":{"ja":"所在地","en":"Address","zh-TW":"地址"},"value":{"ja":"東京都福生市本町23","en":"東京都福生市本町23","zh-TW":"東京都福生市本町23"}},{"fieldId":"access","icon":"train","label":{"ja":"アクセス","en":"Access","zh-TW":"交通"},"value":{"ja":"JR青梅線「福生駅」西口から徒歩約5分（市の案内）。","en":"About a 5-minute walk from the west exit of JR Ome Line Fussa Station (city guidance).","zh-TW":"從 JR 青梅線福生站西口步行約 5 分鐘（市政府指引）。"}},{"fieldId":"hours","icon":"clock","label":{"ja":"営業時間・案内","en":"Hours and guidance","zh-TW":"營業時間與指引"},"value":{"ja":"10:00〜18:00（訪問前に最新情報を確認してください）。","en":"10:00 a.m.–6:00 p.m. (check current information before visiting).","zh-TW":"10:00–18:00（造訪前請確認最新資訊）。"}},{"fieldId":"closed_days","icon":"clock","label":{"ja":"休業日","en":"Closures","zh-TW":"休息日"},"value":{"ja":"月曜・木曜（祝日の場合は翌平日）、年末年始（12月29日〜1月3日）。最新情報を確認してください。","en":"Monday and Thursday (when a holiday, the following business day); Dec 29–Jan 3. Check current information.","zh-TW":"週一、週四（遇國定假日則順延至下一個工作日）；12 月 29 日至 1 月 3 日。請確認最新資訊。"}},{"fieldId":"official_current_url","icon":"information","label":{"ja":"公式情報","en":"Official information","zh-TW":"官方資訊"},"value":{"ja":"https://www.city.fussa.tokyo.jp/map/shiyakusho/1001605.html","en":"https://www.city.fussa.tokyo.jp/map/shiyakusho/1001605.html","zh-TW":"https://www.city.fussa.tokyo.jp/map/shiyakusho/1001605.html"}},{"fieldId":"verification_note","icon":"information","label":{"ja":"確認状況","en":"Verification status","zh-TW":"確認狀態"},"value":{"ja":"該当する公式・市の情報を2026年9月26日に取得。掲載内容は確認中です。訪問前に営業・見学・施設ごとの条件を確認してください。","en":"Matching official or city information was retrieved Sep 26, 2026. This listing is still being confirmed; check current hours, visits, and facility-specific conditions before going.","zh-TW":"對應的官方或市政府資訊於 2026 年 9 月 26 日取得。刊載內容仍在確認中；造訪前請確認營業、參訪與各設施條件。"}}],"caution":[{"ja":"・見学、営業、販売、交通などの条件は変更される場合があります。訪問前に各公式情報をご確認ください。","en":"• Tour, operating, sales, and transport conditions can change. Check each official source before visiting.","zh-TW":"・參訪、營業、販售與交通條件可能變更。造訪前請查看各官方資訊。"}]},
      "officialSource": {"name":"福生市「くるみる ふっさ」","url":"https://www.city.fussa.tokyo.jp/map/shiyakusho/1001605.html","sourceType":"official_web","sourceUpdatedAt":"2021-06-16","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"kurumiru-fussa-1001605"}
    },
    "fussa-ishikawa-shuzo": {
      "presentation": {"id":"fussa-ishikawa-shuzo","regionId":"fussa","foodCultureId":"sake-fussa","thumbnailAssetIds":[],"copy":{"ja":{"name":"石川酒造","lead":"石川酒造は福生・熊川にある酒蔵です。日本酒を軸にした施設や飲食・販売の条件は、公式サイトで確認してください。","description":"石川酒造は福生・熊川にある酒蔵です。日本酒を軸にした施設や飲食・販売の条件は、公式サイトで確認してください。","tags":["公的・公式情報参照","確認中"],"practicalInfo":[{"label":"所在地","value":"東京都福生市熊川1番地"},{"label":"アクセス","value":"東京都福生市熊川1番地。施設ごとの営業条件は公式アクセスページを確認してください。"}],"caution":["営業・見学・販売・交通などの条件は変わる場合があります。訪問前に各公式情報をご確認ください。"]},"en":{"name":"Ishikawa Brewery","lead":"Ishikawa Brewery is a Fussa brewery in Kumagawa. Check the official site for current conditions across its sake, dining, and retail facilities.","description":"Ishikawa Brewery is a Fussa brewery in Kumagawa. Check the official site for current conditions across its sake, dining, and retail facilities.","tags":["Official/public information","Confirmation pending"],"practicalInfo":[{"label":"Address","value":"東京都福生市熊川1番地"},{"label":"Access","value":"Kumagawa 1, Fussa. Check the official access page for current conditions by facility."}],"caution":["Operations, visits, sales, and transport conditions can change. Check each official source before visiting."]},"zh-TW":{"name":"石川酒造","lead":"石川酒造位於福生熊川。以日本酒為主的設施、餐飲與販售條件請查看官方網站。","description":"石川酒造位於福生熊川。以日本酒為主的設施、餐飲與販售條件請查看官方網站。","tags":["參考官方／公部門資訊","確認中"],"practicalInfo":[{"label":"地址","value":"東京都福生市熊川1番地"},{"label":"交通","value":"東京都福生市熊川1番地。各設施的營業條件請查看官方交通頁面。"}],"caution":["營業、參訪、販售與交通條件可能變更。造訪前請查看各官方資訊。"]}}},
      "detail": {"tags":[{"tagId":"official-source","color":"#F0A24C","label":{"ja":"公式・公的情報参照","en":"Official/public information","zh-TW":"參考官方／公部門資訊"}},{"tagId":"confirmation-pending","color":"#5D9BEF","label":{"ja":"確認中","en":"Confirmation pending","zh-TW":"確認中"}}],"description":{"ja":"石川酒造は福生・熊川にある酒蔵です。日本酒を軸にした施設や飲食・販売の条件は、公式サイトで確認してください。","en":"Ishikawa Brewery is a Fussa brewery in Kumagawa. Check the official site for current conditions across its sake, dining, and retail facilities.","zh-TW":"石川酒造位於福生熊川。以日本酒為主的設施、餐飲與販售條件請查看官方網站。"},"information":[{"fieldId":"name","icon":"information","label":{"ja":"施設","en":"Place","zh-TW":"設施"},"value":{"ja":"石川酒造","en":"Ishikawa Brewery","zh-TW":"石川酒造"}},{"fieldId":"address","icon":"information","label":{"ja":"所在地","en":"Address","zh-TW":"地址"},"value":{"ja":"東京都福生市熊川1番地","en":"東京都福生市熊川1番地","zh-TW":"東京都福生市熊川1番地"}},{"fieldId":"access","icon":"train","label":{"ja":"アクセス","en":"Access","zh-TW":"交通"},"value":{"ja":"東京都福生市熊川1番地。施設ごとの営業条件は公式アクセスページを確認してください。","en":"Kumagawa 1, Fussa. Check the official access page for current conditions by facility.","zh-TW":"東京都福生市熊川1番地。各設施的營業條件請查看官方交通頁面。"}},{"fieldId":"official_current_url","icon":"information","label":{"ja":"公式情報","en":"Official information","zh-TW":"官方資訊"},"value":{"ja":"https://www.tamajiman.co.jp/access/","en":"https://www.tamajiman.co.jp/access/","zh-TW":"https://www.tamajiman.co.jp/access/"}},{"fieldId":"verification_note","icon":"information","label":{"ja":"確認状況","en":"Verification status","zh-TW":"確認狀態"},"value":{"ja":"該当する公式・市の情報を2026年9月26日に取得。掲載内容は確認中です。訪問前に営業・見学・施設ごとの条件を確認してください。","en":"Matching official or city information was retrieved Sep 26, 2026. This listing is still being confirmed; check current hours, visits, and facility-specific conditions before going.","zh-TW":"對應的官方或市政府資訊於 2026 年 9 月 26 日取得。刊載內容仍在確認中；造訪前請確認營業、參訪與各設施條件。"}}],"caution":[{"ja":"・見学、営業、販売、交通などの条件は変更される場合があります。訪問前に各公式情報をご確認ください。","en":"• Tour, operating, sales, and transport conditions can change. Check each official source before visiting.","zh-TW":"・參訪、營業、販售與交通條件可能變更。造訪前請查看各官方資訊。"}]},
      "officialSource": undefined
    }
  },
  "story": {
    "groups": {
      "nearby": [{"referenceId":"fussa-tamura-shuzo","spotId":"fussa-tamura-shuzo","badgeColor":"#E98A1C","badge":{"ja":"立ち寄り先","en":"Route stop","zh-TW":"行程停靠點"},"description":{"ja":"田村酒造場は福生で酒造りを続ける酒蔵です。見学・販売・営業日の条件は、当日の公式情報を確認してください。","en":"Tamura Shuzojo is a Fussa brewery with a long brewing history. Check the current official information for tours, sales, and opening conditions.","zh-TW":"田村酒造場是在福生延續釀酒歷史的酒藏。見學、販售與營業日條件請確認當天的官方資訊。"}},{"referenceId":"fussa-kurumiru","spotId":"fussa-kurumiru","badgeColor":"#E98A1C","badge":{"ja":"立ち寄り先","en":"Route stop","zh-TW":"行程停靠點"},"description":{"ja":"くるみる ふっさは、福生の観光情報や名産品の情報を集める案内所です。酒蔵めぐりの最新情報を確認する中継点にします。","en":"Kurumiru Fussa is a visitor center for local sightseeing information and products — a useful checkpoint for current brewery-visit details.","zh-TW":"くるみる ふっさ是收集福生觀光與名產資訊的服務中心，也可作為確認酒藏最新資訊的中繼點。"}},{"referenceId":"fussa-ishikawa-shuzo","spotId":"fussa-ishikawa-shuzo","badgeColor":"#E98A1C","badge":{"ja":"立ち寄り先","en":"Route stop","zh-TW":"行程停靠點"},"description":{"ja":"石川酒造は福生・熊川にある酒蔵です。日本酒を軸にした施設や飲食・販売の条件は、公式サイトで確認してください。","en":"Ishikawa Brewery is a Fussa brewery in Kumagawa. Check the official site for current conditions across its sake, dining, and retail facilities.","zh-TW":"石川酒造位於福生熊川。以日本酒為主的設施、餐飲與販售條件請查看官方網站。"}}],
      "nature": []
    },
    "location": {
      "ja": {"region":"福生・東京都","station":"駅・経路は各立ち寄り先の公式案内で確認"},
      "en": {"region":"Fussa, Tokyo","station":"Check current station and route guidance for each stop"},
      "zh-TW": {"region":"東京都福生","station":"各停靠點的車站與路線請查看官方指引"}
    },
    "point": {
      "ja": {"title":"訪問前に確認すること","body":"見学・営業・交通の最新情報を確認してください。"},
      "en": {"title":"Check before visiting","body":"Check current tour, opening, and transport information."},
      "zh-TW": {"title":"造訪前請確認","body":"請確認最新的見學、營業與交通資訊。"}
    }
  },
  "sources": {
    "culture-1": {
      "name": "福生市「Tokyo SAKE Brewery」",
      "url": "https://www.city.fussa.tokyo.jp/sightseeing/amuse/1005934.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2017-01-10",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "fussa-tokyo-sake-brewery-1005934"
    },
    "culture-2": {
      "name": "福生市「福生の名刹（寺院）と分水、水と緑の味わいコース」",
      "url": "https://www.city.fussa.tokyo.jp/sightseeing/jousui/1004236.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2016-07-28",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "fussa-water-heritage-course-1004236"
    },
    "culture-3": {
      "name": "田村酒造場（公式）",
      "url": "https://www.tamurashuzojo.com/page/kura",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "tamura-shuzojo-kura"
    },
    "culture-4": {
      "name": "石川酒造（公式アクセス）",
      "url": "https://www.tamajiman.co.jp/access/",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "ishikawa-shuzo-access"
    },
    "culture-5": {
      "name": "福生市「くるみる ふっさ」",
      "url": "https://www.city.fussa.tokyo.jp/map/shiyakusho/1001605.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2021-06-16",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "kurumiru-fussa-1001605"
    },
    "route-1": {
      "name": "編集部（福生の2つの酒蔵と水のまち）",
      "url": "https://www.city.fussa.tokyo.jp/sightseeing/amuse/1005934.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "seed-route-fussa-sake"
    },
    "route-2": {
      "name": "編集部（福生の2つの酒蔵と水のまち）",
      "url": "https://www.city.fussa.tokyo.jp/sightseeing/amuse/1005934.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "seed-route-fussa-sake"
    },
    "route-3": {
      "name": "福生市「Tokyo SAKE Brewery」",
      "url": "https://www.city.fussa.tokyo.jp/sightseeing/amuse/1005934.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2017-01-10",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "fussa-tokyo-sake-brewery-1005934"
    },
    "route-4": {
      "name": "福生市「水と緑の味わいコース」",
      "url": "https://www.city.fussa.tokyo.jp/sightseeing/jousui/1004236.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2016-07-28",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "fussa-water-heritage-course-1004236"
    },
    "route-5": {
      "name": "田村酒造場（公式）",
      "url": "https://www.tamurashuzojo.com/page/kura",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "tamura-shuzojo-kura"
    },
    "route-6": {
      "name": "石川酒造（公式アクセス）",
      "url": "https://www.tamajiman.co.jp/access/",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "ishikawa-shuzo-access"
    },
    "route-7": {
      "name": "福生市「くるみる ふっさ」",
      "url": "https://www.city.fussa.tokyo.jp/map/shiyakusho/1001605.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2021-06-16",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "kurumiru-fussa-1001605"
    },
    "route-8": {
      "name": "MapFan（福生駅周辺の概略座標）",
      "url": "https://mapfan.com/spots/SCH%2CJ%2CSN",
      "sourceType": "business",
      "retrievedAt": "2026-08-19",
      "verificationStatus": "needs_confirmation",
      "originalId": "geocoded-fussa-station-area"
    },
    "route-9": {
      "name": "OpenStreetMap（石川酒造）",
      "url": "https://www.openstreetmap.org/node/2365654277",
      "license": "ODbL 1.0",
      "sourceType": "open_data",
      "retrievedAt": "2026-08-19",
      "verificationStatus": "needs_confirmation",
      "originalId": "geocoded-fussa-ishikawa-shuzo"
    },
    "fussa-tamura-shuzo-1": {
      "name": "田村酒造場（公式）",
      "url": "https://www.tamurashuzojo.com/page/kura",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "tamura-shuzojo-fussa626"
    },
    "fussa-tamura-shuzo-2": {
      "name": "田村酒造場（公式）",
      "url": "https://www.tamurashuzojo.com/page/kura",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "tamura-shuzojo-kura"
    },
    "fussa-kurumiru-1": {
      "name": "福生市「くるみる ふっさ」",
      "url": "https://www.city.fussa.tokyo.jp/map/shiyakusho/1001605.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-09-26",
      "sourceUpdatedAt": "2021-06-16",
      "verificationStatus": "needs_confirmation",
      "originalId": "kurumiru-fussa-honcho23"
    },
    "fussa-kurumiru-2": {
      "name": "福生市「くるみる ふっさ」",
      "url": "https://www.city.fussa.tokyo.jp/map/shiyakusho/1001605.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2021-06-16",
      "retrievedAt": "2026-11-28",
      "verificationStatus": "needs_confirmation",
      "originalId": "kurumiru-fussa-1001605"
    },
    "fussa-ishikawa-shuzo-1": {
      "name": "石川酒造（公式）",
      "url": "https://www.tamajiman.co.jp/access/",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "ishikawa-shuzo-fussa-kumagawa1"
    },
    "fussa-ishikawa-shuzo-2": {
      "name": "石川酒造（公式アクセス）",
      "url": "https://www.tamajiman.co.jp/access/",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "ishikawa-shuzo-access"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": ["culture-1","culture-2","culture-3","culture-4","culture-5","route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8","route-9"],
      "origin": "editorial"
    },
    "journey.chapters": {
      "sourceIds": ["culture-1","culture-2","culture-3","culture-4","culture-5","route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8","route-9"],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8","route-9"],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8","route-9"],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8","route-9"],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8","route-9"],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": ["culture-1","culture-2","culture-3","culture-4","culture-5","route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8","route-9"],
      "origin": "editorial"
    },
    "spots.fussa-tamura-shuzo": {
      "sourceIds": ["fussa-tamura-shuzo-1","fussa-tamura-shuzo-2"],
      "origin": "source"
    },
    "spots.fussa-tamura-shuzo.detail.information.0.value": {
      "sourceIds": ["fussa-tamura-shuzo-1","fussa-tamura-shuzo-2"],
      "origin": "editorial"
    },
    "spots.fussa-tamura-shuzo.detail.information.1.value": {
      "sourceIds": ["fussa-tamura-shuzo-1","fussa-tamura-shuzo-2"],
      "origin": "editorial"
    },
    "spots.fussa-tamura-shuzo.detail.information.2.value": {
      "sourceIds": ["fussa-tamura-shuzo-1","fussa-tamura-shuzo-2"],
      "origin": "editorial"
    },
    "spots.fussa-tamura-shuzo.detail.information.3.value": {
      "sourceIds": ["fussa-tamura-shuzo-1","fussa-tamura-shuzo-2"],
      "origin": "editorial"
    },
    "spots.fussa-tamura-shuzo.detail.information.4.value": {
      "sourceIds": ["fussa-tamura-shuzo-1","fussa-tamura-shuzo-2"],
      "origin": "editorial"
    },
    "spots.fussa-tamura-shuzo.detail.information.5.value": {
      "sourceIds": ["fussa-tamura-shuzo-1","fussa-tamura-shuzo-2"],
      "origin": "editorial"
    },
    "spots.fussa-kurumiru": {
      "sourceIds": ["fussa-kurumiru-1","fussa-kurumiru-2"],
      "origin": "source"
    },
    "spots.fussa-kurumiru.detail.information.0.value": {
      "sourceIds": ["fussa-kurumiru-1","fussa-kurumiru-2"],
      "origin": "editorial"
    },
    "spots.fussa-kurumiru.detail.information.1.value": {
      "sourceIds": ["fussa-kurumiru-1","fussa-kurumiru-2"],
      "origin": "editorial"
    },
    "spots.fussa-kurumiru.detail.information.2.value": {
      "sourceIds": ["fussa-kurumiru-1","fussa-kurumiru-2"],
      "origin": "editorial"
    },
    "spots.fussa-kurumiru.detail.information.3.value": {
      "sourceIds": ["fussa-kurumiru-1","fussa-kurumiru-2"],
      "origin": "editorial"
    },
    "spots.fussa-kurumiru.detail.information.4.value": {
      "sourceIds": ["fussa-kurumiru-1","fussa-kurumiru-2"],
      "origin": "editorial"
    },
    "spots.fussa-kurumiru.detail.information.5.value": {
      "sourceIds": ["fussa-kurumiru-1","fussa-kurumiru-2"],
      "origin": "editorial"
    },
    "spots.fussa-kurumiru.detail.information.6.value": {
      "sourceIds": ["fussa-kurumiru-1","fussa-kurumiru-2"],
      "origin": "editorial"
    },
    "spots.fussa-ishikawa-shuzo": {
      "sourceIds": ["fussa-ishikawa-shuzo-1","fussa-ishikawa-shuzo-2"],
      "origin": "source"
    },
    "spots.fussa-ishikawa-shuzo.detail.information.0.value": {
      "sourceIds": ["fussa-ishikawa-shuzo-1","fussa-ishikawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.fussa-ishikawa-shuzo.detail.information.1.value": {
      "sourceIds": ["fussa-ishikawa-shuzo-1","fussa-ishikawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.fussa-ishikawa-shuzo.detail.information.2.value": {
      "sourceIds": ["fussa-ishikawa-shuzo-1","fussa-ishikawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.fussa-ishikawa-shuzo.detail.information.3.value": {
      "sourceIds": ["fussa-ishikawa-shuzo-1","fussa-ishikawa-shuzo-2"],
      "origin": "editorial"
    },
    "spots.fussa-ishikawa-shuzo.detail.information.4.value": {
      "sourceIds": ["fussa-ishikawa-shuzo-1","fussa-ishikawa-shuzo-2"],
      "origin": "editorial"
    }
  }
};
