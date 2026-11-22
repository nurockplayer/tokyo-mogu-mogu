import type { JourneyRecord } from '../journey-record';

export const akirunoJourneyRecord: JourneyRecord = {
  "municipalityId": "akiruno",
  "journey": {
    "id": "demo-tokyo-west-akiruno-produce",
    "regionId": "akiruno",
    "foodCultureId": "produce-akiruno",
    "storyId": "produce-akiruno",
    "routeId": "akiruno-seasonal-produce-journey",
    "copy": {
      "ja": {"title":"あきる野の旬と秋川渓谷をめぐる旅","subtitle":"秋川の旬の農産物","description":"のらぼう菜や旬の農産物を入口に、あきる野の直売所と秋川渓谷を訪ねる食文化。","tags":["旬の農産物","直売所","秋川渓谷"],"storyTitle":"秋川の旬の農産物の物語","intro":["あきる野の五日市地区では、江戸時代からのらぼう菜の栽培が続いてきました。とうもろこしや梨など季節ごとの農産物を、直売所と秋川渓谷の食の場からたどります。","のらぼう菜や旬の農産物を入口に、あきる野の直売所と秋川渓谷を訪ねる食文化。"]},
      "en": {"title":"Akiruno Seasonal Produce & Akigawa Valley Journey","subtitle":"Akikawa Seasonal Produce","description":"Discover Akiruno through seasonal produce such as norabō greens, direct sales, and the Akigawa Valley.","tags":["Seasonal produce","Direct sales","Akigawa Valley"],"storyTitle":"The Story of Akikawa Seasonal Produce","intro":["In Akiruno’s Itsukaichi area, norabō greens have been cultivated since the Edo period. Follow seasonal produce such as corn and pears through direct-sale and local-food places in the Akigawa Valley.","Discover Akiruno through seasonal produce such as norabō greens, direct sales, and the Akigawa Valley."]},
      "zh-TW": {"title":"秋留野當季農產與秋川溪谷之旅","subtitle":"秋川當季農產","description":"以野良坊菜等當季農產為入口，走訪秋留野的直賣所與秋川溪谷飲食場景。","tags":["當季農產","直賣所","秋川溪谷"],"storyTitle":"秋川當季農產的故事","intro":["秋留野五日市地區自江戶時代起持續栽培野良坊菜。從直賣所與秋川溪谷的飲食場景，追尋玉米、梨等隨季節而變的農產。","以野良坊菜等當季農產為入口，走訪秋留野的直賣所與秋川溪谷飲食場景。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"五日市に続くのらぼう菜","body":"あきる野市の公式案内は、のらぼう菜を江戸時代から五日市地区で栽培されてきた野菜として紹介しています。とうもろこしの収穫期は初夏、梨は夏から秋が目安です。"},{"number":"02.","title":"生産者と秋川ファーマーズセンター","body":"秋川ファーマーズセンターでは、生産者が自ら育てた農畜産物を持ち寄り、季節の品を販売しています。入荷は日や季節で変わります。"},{"number":"03.","title":"季節と当日の入荷","body":"旬の農産物は、季節や当日の入荷で出会えるものが変わります。確実な在庫を約束するのではなく、現地で旬を探すこと自体を旅の一部にします。"},{"number":"04.","title":"直売所から秋川渓谷へ","body":"直売所で当日の旬を探し、瀬音の湯の地元食材の料理や物産販売につなげます。季節・営業・在庫は出発前と現地で確認してください。"}],
      "en": [{"number":"01.","title":"Norabō greens in Itsukaichi","body":"Akiruno City describes norabō greens as a vegetable cultivated in the Itsukaichi area since the Edo period. The city’s seasonal guide places corn in early summer and pears in summer to autumn."},{"number":"02.","title":"Producers and the farm market","body":"At Akikawa Farmers Center, producers bring their own farm products for seasonal direct sale. What is available changes by day and season."},{"number":"03.","title":"Season and daily stock","body":"The produce available changes with the season and the day’s deliveries. Instead of promising stock, make the search for what is in season part of the trip."},{"number":"04.","title":"From the market to Akigawa Valley","body":"Look for what is in season at the farmers center, then connect it with local-food dining and specialty sales at Seoto-no-Yu. Confirm season, operations, and stock before and during the trip."}],
      "zh-TW": [{"number":"01.","title":"五日市的野良坊菜","body":"秋留野市官方將野良坊菜介紹為自江戶時代起在五日市地區栽培的蔬菜。市方季節指南將玉米的採收期放在初夏，梨則約為夏季至秋季。"},{"number":"02.","title":"生產者與農產直賣所","body":"秋川 Farmers Center 由生產者帶來自己栽培的農畜產品，販售當季商品。可買到的品項會隨日期與季節變動。"},{"number":"03.","title":"季節與每日庫存","body":"直賣所能遇到的農產會受季節與當日進貨影響。與其保證庫存，不如把尋找當季品本身當成旅程的一部分。"},{"number":"04.","title":"從直賣所前往秋川溪谷","body":"先在直賣所尋找當日當季的品項，再連結到瀨音之湯的在地食材料理與物產販售。季節、營業與庫存請在出發前及現場確認。"}]
    },
    "routeVariants": [
      {"id":"half-day","durationMinutes":195,"steps":[{"spotId":"akiruno-farmers-center"},{"spotId":"akiruno-seoto-no-yu"}]},
      {"id":"full-day","durationMinutes":285,"steps":[{"spotId":"akiruno-farmers-center"},{"spotId":"akiruno-seoto-no-yu"}]}
    ]
  },
  "routeName": {
    "ja": "あきる野の旬と秋川渓谷をめぐる旅",
    "en": "Akiruno Seasonal Produce & Akigawa Valley Journey",
    "zh-TW": "秋留野當季農產與秋川溪谷之旅"
  },
  "location": {
    "ja": {
      "area": "あきる野・秋川渓谷",
      "station": "",
      "access": "JR五日市線「東秋留駅」から徒歩約8分（公式案内）。",
      "source": {"name":"あきる野市「秋川ファーマーズセンター」","url":"https://www.city.akiruno.tokyo.jp/0000003556.html","sourceType":"official_web","sourceUpdatedAt":"2026-04-02","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"akiruno-farmers-center-3556"},
      "sourceValue": "JR五日市線「東秋留駅」から徒歩約8分（公式案内）。"
    },
    "en": {
      "area": "Akiruno, Akigawa Valley",
      "station": "",
      "access": "About an 8-minute walk from JR Itsukaichi Line Higashi-Akiru Station (official guidance).",
      "source": {"name":"あきる野市「秋川ファーマーズセンター」","url":"https://www.city.akiruno.tokyo.jp/0000003556.html","sourceType":"official_web","sourceUpdatedAt":"2026-04-02","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"akiruno-farmers-center-3556"},
      "sourceValue": "About an 8-minute walk from JR Itsukaichi Line Higashi-Akiru Station (official guidance)."
    },
    "zh-TW": {
      "area": "東京都秋留野・秋川溪谷",
      "station": "",
      "access": "從JR五日市線東秋留站步行約8分鐘（官方指引）。",
      "source": {"name":"あきる野市「秋川ファーマーズセンター」","url":"https://www.city.akiruno.tokyo.jp/0000003556.html","sourceType":"official_web","sourceUpdatedAt":"2026-04-02","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"akiruno-farmers-center-3556"},
      "sourceValue": "JR五日市線「東秋留駅」から徒歩約8分（公式案内）。"
    }
  },
  "variants": {
    "half-day": {
      "steps": [{"spotId":"akiruno-farmers-center","description":{"ja":"秋川ファーマーズセンターで、生産者が持ち寄る農産物と季節の直売に出会います。のらぼう菜や旬の品は時期と当日の入荷を確認します。","en":"Meet seasonal direct sales from local producers at Akikawa Farmers Center. Check the season and day’s stock for norabō greens and other produce.","zh-TW":"在秋川 Farmers Center 遇見生產者帶來的農產與當季直賣。野良坊菜等品項請確認季節與當日進貨。"}},{"spotId":"akiruno-seoto-no-yu","description":{"ja":"瀬音の湯で、秋川渓谷の自然と、地元食材の料理・物産販売につながる食の場を訪ねます。営業内容は公式サイトで確認してください。","en":"Continue to Seoto-no-Yu, where the Akigawa Valley setting meets local-food dining and specialty sales. Check the official site for current operations.","zh-TW":"在瀨音之湯走進秋川溪谷的自然，連結地元食材料理與物產販售。最新營業內容請查看官方網站。"}}],
      "stats": {"ja":{"time":"目安 3 時間 15 分","spots":"2 スポット","distance":"JR五日市線・西東京バス（目安、現地の案内を確認）","station":"","minutes":"","access":"JR五日市線「東秋留駅」から徒歩約8分（公式案内）。","source":{"name":"あきる野市「秋川ファーマーズセンター」","url":"https://www.city.akiruno.tokyo.jp/0000003556.html","sourceType":"official_web","sourceUpdatedAt":"2026-04-02","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"akiruno-farmers-center-3556"},"sourceValue":"JR五日市線「東秋留駅」から徒歩約8分（公式案内）。","caution":"所要時間・滞在時間・移動時間は編集部の目安です。季節・営業・交通の最新情報を確認してください。"},"en":{"time":"Est. 3 hr 15 min","spots":"2 spots","distance":"JR Itsukaichi Line & Nishi Tokyo Bus (estimate; check local guidance)","station":"","minutes":"","access":"About an 8-minute walk from JR Itsukaichi Line Higashi-Akiru Station (official guidance).","source":{"name":"あきる野市「秋川ファーマーズセンター」","url":"https://www.city.akiruno.tokyo.jp/0000003556.html","sourceType":"official_web","sourceUpdatedAt":"2026-04-02","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"akiruno-farmers-center-3556"},"sourceValue":"JR五日市線「東秋留駅」から徒歩約8分（公式案内）。","caution":"Total, stay, and travel times are editorial estimates; check current seasonal, opening, and transport information."},"zh-TW":{"time":"參考 3 小時 15 分鐘","spots":"2 個景點","distance":"JR五日市線・西東京巴士（估算，請確認現地指引）","station":"","minutes":"","access":"從JR五日市線東秋留站步行約8分鐘（官方指引）。","source":{"name":"あきる野市「秋川ファーマーズセンター」","url":"https://www.city.akiruno.tokyo.jp/0000003556.html","sourceType":"official_web","sourceUpdatedAt":"2026-04-02","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"akiruno-farmers-center-3556"},"sourceValue":"JR五日市線「東秋留駅」から徒歩約8分（公式案内）。","caution":"總時間、停留時間與移動時間為編輯部估算；請確認最新的季節、營業與交通資訊。"}},
      "guidance": {"ja":"あきる野・秋川渓谷","en":"Akiruno, Akigawa Valley","zh-TW":"東京都秋留野・秋川溪谷"}
    },
    "full-day": {
      "steps": [{"spotId":"akiruno-farmers-center","description":{"ja":"直売所で、のらぼう菜やとうもろこし、梨など、季節に応じた秋川の農産物を探します。品揃えは季節と当日の入荷で変わります。","en":"Take time with Akikawa’s seasonal produce, from norabō greens to corn and pears when in season. Stock changes with the season and day.","zh-TW":"慢慢尋找野良坊菜、玉米、梨等隨季節而變的秋川農產。品項會隨季節與當日進貨變動。"}},{"spotId":"akiruno-seoto-no-yu","description":{"ja":"秋川渓谷の景色と、地元食材を使う料理・物産販売の情報をつなげます。最新の営業・交通情報を出発前に確認してください。","en":"Connect the Akigawa Valley landscape with local-food dining and specialty sales. Check current operations and transport before setting out.","zh-TW":"將秋川溪谷景色與在地食材料理、物產販售的資訊連結起來。出發前請確認最新營業與交通資訊。"}}],
      "stats": {"ja":{"time":"目安 4 時間 45 分","spots":"2 スポット","distance":"JR五日市線・西東京バス（目安、現地の案内を確認）","station":"","minutes":"","access":"JR五日市線「東秋留駅」から徒歩約8分（公式案内）。","source":{"name":"あきる野市「秋川ファーマーズセンター」","url":"https://www.city.akiruno.tokyo.jp/0000003556.html","sourceType":"official_web","sourceUpdatedAt":"2026-04-02","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"akiruno-farmers-center-3556"},"sourceValue":"JR五日市線「東秋留駅」から徒歩約8分（公式案内）。","caution":"所要時間・滞在時間・移動時間は編集部の目安です。季節・営業・交通の最新情報を確認してください。"},"en":{"time":"Est. 4 hr 45 min","spots":"2 spots","distance":"JR Itsukaichi Line & Nishi Tokyo Bus (estimate; check local guidance)","station":"","minutes":"","access":"About an 8-minute walk from JR Itsukaichi Line Higashi-Akiru Station (official guidance).","source":{"name":"あきる野市「秋川ファーマーズセンター」","url":"https://www.city.akiruno.tokyo.jp/0000003556.html","sourceType":"official_web","sourceUpdatedAt":"2026-04-02","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"akiruno-farmers-center-3556"},"sourceValue":"JR五日市線「東秋留駅」から徒歩約8分（公式案内）。","caution":"Total, stay, and travel times are editorial estimates; check current seasonal, opening, and transport information."},"zh-TW":{"time":"參考 4 小時 45 分鐘","spots":"2 個景點","distance":"JR五日市線・西東京巴士（估算，請確認現地指引）","station":"","minutes":"","access":"從JR五日市線東秋留站步行約8分鐘（官方指引）。","source":{"name":"あきる野市「秋川ファーマーズセンター」","url":"https://www.city.akiruno.tokyo.jp/0000003556.html","sourceType":"official_web","sourceUpdatedAt":"2026-04-02","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"akiruno-farmers-center-3556"},"sourceValue":"JR五日市線「東秋留駅」から徒歩約8分（公式案内）。","caution":"總時間、停留時間與移動時間為編輯部估算；請確認最新的季節、營業與交通資訊。"}},
      "guidance": {"ja":"あきる野・秋川渓谷","en":"Akiruno, Akigawa Valley","zh-TW":"東京都秋留野・秋川溪谷"}
    }
  },
  "spots": {
    "akiruno-farmers-center": {
      "presentation": {"id":"akiruno-farmers-center","regionId":"akiruno","foodCultureId":"produce-akiruno","thumbnailAssetIds":[],"copy":{"ja":{"name":"秋川ファーマーズセンター","lead":"秋川ファーマーズセンターは、生産者の農産物を季節ごとに買える直売所です。品揃えと不定休の有無は当日に確認します。","description":"秋川ファーマーズセンターは、生産者の農産物を季節ごとに買える直売所です。品揃えと不定休の有無は当日に確認します。","tags":["公的・公式情報参照","確認中"],"practicalInfo":[{"label":"所在地","value":"東京都あきる野市二宮811"},{"label":"アクセス","value":"JR五日市線「東秋留駅」から徒歩約8分（公式案内）。"},{"label":"営業時間","value":"9:00〜17:00（12月30日は15:00まで。訪問前に最新情報をご確認ください）。"},{"label":"休業日","value":"12月31日〜1月4日。不定休あり。訪問前に最新情報をご確認ください。"}],"caution":["季節の品・在庫、営業、交通は変わる場合があります。訪問前に各公式情報をご確認ください。"]},"en":{"name":"Akikawa Farmers Center","lead":"Akikawa Farmers Center is a direct-sale market for producers’ seasonal farm products. Check stock and any irregular closure on the day.","description":"Akikawa Farmers Center is a direct-sale market for producers’ seasonal farm products. Check stock and any irregular closure on the day.","tags":["Official/public information","Confirmation pending"],"practicalInfo":[{"label":"Address","value":"東京都あきる野市二宮811"},{"label":"Access","value":"About an 8-minute walk from JR Itsukaichi Line Higashi-Akiru Station (official guidance)."},{"label":"Hours","value":"9:00 a.m.–5:00 p.m. (closes at 3:00 p.m. on Dec 30; check current information before visiting)."},{"label":"Closures","value":"Closed December 31–January 4; irregular closures may apply. Check current information before visiting."}],"caution":["Seasonal stock, operations, and transport can change. Check each official source before visiting."]},"zh-TW":{"name":"秋川 Farmers Center","lead":"秋川 Farmers Center 是可按季節購買生產者農產的直賣所。庫存與臨時休業請在當天確認。","description":"秋川 Farmers Center 是可按季節購買生產者農產的直賣所。庫存與臨時休業請在當天確認。","tags":["參考官方／公部門資訊","確認中"],"practicalInfo":[{"label":"地址","value":"東京都あきる野市二宮811"},{"label":"交通","value":"從JR五日市線東秋留站步行約8分鐘（官方指引）。"},{"label":"營業時間","value":"09:00–17:00（12月30日營業至15:00；造訪前請確認最新資訊）。"},{"label":"休息日","value":"12月31日至1月4日休業；另可能不定期休業。造訪前請確認最新資訊。"}],"caution":["季節品庫存、營業與交通可能變動。造訪前請確認各官方資訊。"]}}},
      "detail": {"tags":[{"tagId":"local-produce","color":"#8FAE5C","label":{"ja":"地場農産物","en":"Local produce","zh-TW":"在地農產品"}},{"tagId":"official-source","color":"#F0A24C","label":{"ja":"公式・公的情報参照","en":"Official/public information","zh-TW":"參考官方／公部門資訊"}},{"tagId":"confirmation-pending","color":"#5D9BEF","label":{"ja":"確認中","en":"Confirmation pending","zh-TW":"確認中"}}],"description":{"ja":"秋川ファーマーズセンターは、生産者の農産物を季節ごとに買える直売所です。品揃えと不定休の有無は当日に確認します。","en":"Akikawa Farmers Center is a direct-sale market for producers’ seasonal farm products. Check stock and any irregular closure on the day.","zh-TW":"秋川 Farmers Center 是可按季節購買生產者農產的直賣所。庫存與臨時休業請在當天確認。"},"information":[{"fieldId":"name","icon":"information","label":{"ja":"施設","en":"Place","zh-TW":"設施"},"value":{"ja":"秋川ファーマーズセンター","en":"Akikawa Farmers Center","zh-TW":"秋川 Farmers Center"}},{"fieldId":"address","icon":"information","label":{"ja":"所在地","en":"Address","zh-TW":"地址"},"value":{"ja":"東京都あきる野市二宮811","en":"東京都あきる野市二宮811","zh-TW":"東京都あきる野市二宮811"}},{"fieldId":"access","icon":"train","label":{"ja":"アクセス","en":"Access","zh-TW":"交通"},"value":{"ja":"JR五日市線「東秋留駅」から徒歩約8分（公式案内）。","en":"About an 8-minute walk from JR Itsukaichi Line Higashi-Akiru Station (official guidance).","zh-TW":"從JR五日市線東秋留站步行約8分鐘（官方指引）。"}},{"fieldId":"hours","icon":"clock","label":{"ja":"営業時間","en":"Hours","zh-TW":"營業時間"},"value":{"ja":"9:00〜17:00（12月30日は15:00まで。訪問前に最新情報をご確認ください）。","en":"9:00 a.m.–5:00 p.m. (closes at 3:00 p.m. on Dec 30; check current information before visiting).","zh-TW":"09:00–17:00（12月30日營業至15:00；造訪前請確認最新資訊）。"}},{"fieldId":"closed_days","icon":"clock","label":{"ja":"休業日","en":"Closures","zh-TW":"休息日"},"value":{"ja":"12月31日〜1月4日。不定休あり。訪問前に最新情報をご確認ください。","en":"Closed December 31–January 4; irregular closures may apply. Check current information before visiting.","zh-TW":"12月31日至1月4日休業；另可能不定期休業。造訪前請確認最新資訊。"}},{"fieldId":"official_current_url","icon":"information","label":{"ja":"公式情報","en":"Official information","zh-TW":"官方資訊"},"value":{"ja":"https://www.city.akiruno.tokyo.jp/0000003556.html","en":"https://www.city.akiruno.tokyo.jp/0000003556.html","zh-TW":"https://www.city.akiruno.tokyo.jp/0000003556.html"}},{"fieldId":"verification_note","icon":"information","label":{"ja":"確認状況","en":"Verification status","zh-TW":"確認狀態"},"value":{"ja":"該当する公式・市の情報を2026年9月26日に取得。掲載内容は確認中です。季節品の在庫、営業、休業、交通を訪問前に確認してください。","en":"Matching official or city information was retrieved Sep 26, 2026. This listing is still being confirmed; check seasonal stock, operations, closures, and transport before visiting.","zh-TW":"對應的官方或市政府資訊於2026年9月26日取得。刊載內容仍在確認中；造訪前請確認季節品庫存、營業、休業與交通。"}}],"caution":[{"ja":"・季節品・営業・交通などの条件は変更される場合があります。訪問前に公式情報をご確認ください。","en":"• Seasonal products, operations, and transport conditions can change. Check official information before visiting.","zh-TW":"・季節品、營業與交通條件可能變更。造訪前請確認官方資訊。"}]},
      "officialSource": {"name":"あきる野市「秋川ファーマーズセンター」","url":"https://www.city.akiruno.tokyo.jp/0000003556.html","sourceType":"official_web","sourceUpdatedAt":"2026-04-02","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"akiruno-farmers-center-3556"}
    },
    "akiruno-seoto-no-yu": {
      "presentation": {"id":"akiruno-seoto-no-yu","regionId":"akiruno","foodCultureId":"produce-akiruno","thumbnailAssetIds":[],"copy":{"ja":{"name":"秋川渓谷 瀬音の湯","lead":"瀬音の湯は、秋川渓谷の自然の中で地元食材の料理や地域の物産販売につながる施設です。最新の営業内容と交通を公式サイトで確認します。","description":"瀬音の湯は、秋川渓谷の自然の中で地元食材の料理や地域の物産販売につながる施設です。最新の営業内容と交通を公式サイトで確認します。","tags":["公的・公式情報参照","確認中"],"practicalInfo":[{"label":"所在地","value":"東京都あきる野市乙津565"},{"label":"アクセス","value":"JR五日市線「武蔵五日市駅」から西東京バス「瀬音の湯経由上養沢行き」で約17分、「瀬音の湯」下車すぐ。時刻は変更される場合があるため事前に確認してください（送迎バスなし）。"}],"caution":["季節の品・在庫、営業、交通は変わる場合があります。訪問前に各公式情報をご確認ください。"]},"en":{"name":"Akikawa Keikoku Seoto-no-Yu","lead":"Seoto-no-Yu sits in the Akigawa Valley and connects the landscape with local-food dining and regional products. Check the official site for current operations and transport.","description":"Seoto-no-Yu sits in the Akigawa Valley and connects the landscape with local-food dining and regional products. Check the official site for current operations and transport.","tags":["Official/public information","Confirmation pending"],"practicalInfo":[{"label":"Address","value":"東京都あきる野市乙津565"},{"label":"Access","value":"From JR Musashi-Itsukaichi Station, take the Nishi Tokyo Bus for Kami-Yozawa via Seoto-no-Yu (about 17 minutes) to the stop by the facility. Timetables can change; check before travel. No shuttle bus."}],"caution":["Seasonal stock, operations, and transport can change. Check each official source before visiting."]},"zh-TW":{"name":"秋川溪谷 瀨音之湯","lead":"瀨音之湯位於秋川溪谷自然中，連結在地食材料理與地區物產販售。最新營業內容與交通請查看官方網站。","description":"瀨音之湯位於秋川溪谷自然中，連結在地食材料理與地區物產販售。最新營業內容與交通請查看官方網站。","tags":["參考官方／公部門資訊","確認中"],"practicalInfo":[{"label":"地址","value":"東京都あきる野市乙津565"},{"label":"交通","value":"從JR武藏五日市站搭乘西東京巴士「經瀨音之湯往上養澤」路線，約17分鐘於「瀨音之湯」站下車即達。班次可能變更，請事先確認（無接駁巴士）。"}],"caution":["季節品庫存、營業與交通可能變動。造訪前請確認各官方資訊。"]}}},
      "detail": {"tags":[{"tagId":"local-produce","color":"#8FAE5C","label":{"ja":"地場農産物","en":"Local produce","zh-TW":"在地農產品"}},{"tagId":"official-source","color":"#F0A24C","label":{"ja":"公式・公的情報参照","en":"Official/public information","zh-TW":"參考官方／公部門資訊"}},{"tagId":"confirmation-pending","color":"#5D9BEF","label":{"ja":"確認中","en":"Confirmation pending","zh-TW":"確認中"}}],"description":{"ja":"瀬音の湯は、秋川渓谷の自然の中で地元食材の料理や地域の物産販売につながる施設です。最新の営業内容と交通を公式サイトで確認します。","en":"Seoto-no-Yu sits in the Akigawa Valley and connects the landscape with local-food dining and regional products. Check the official site for current operations and transport.","zh-TW":"瀨音之湯位於秋川溪谷自然中，連結在地食材料理與地區物產販售。最新營業內容與交通請查看官方網站。"},"information":[{"fieldId":"name","icon":"information","label":{"ja":"施設","en":"Place","zh-TW":"設施"},"value":{"ja":"秋川渓谷 瀬音の湯","en":"Akikawa Keikoku Seoto-no-Yu","zh-TW":"秋川溪谷 瀨音之湯"}},{"fieldId":"address","icon":"information","label":{"ja":"所在地","en":"Address","zh-TW":"地址"},"value":{"ja":"東京都あきる野市乙津565","en":"東京都あきる野市乙津565","zh-TW":"東京都あきる野市乙津565"}},{"fieldId":"access","icon":"train","label":{"ja":"アクセス","en":"Access","zh-TW":"交通"},"value":{"ja":"JR五日市線「武蔵五日市駅」から西東京バス「瀬音の湯経由上養沢行き」で約17分、「瀬音の湯」下車すぐ。時刻は変更される場合があるため事前に確認してください（送迎バスなし）。","en":"From JR Musashi-Itsukaichi Station, take the Nishi Tokyo Bus for Kami-Yozawa via Seoto-no-Yu (about 17 minutes) to the stop by the facility. Timetables can change; check before travel. No shuttle bus.","zh-TW":"從JR武藏五日市站搭乘西東京巴士「經瀨音之湯往上養澤」路線，約17分鐘於「瀨音之湯」站下車即達。班次可能變更，請事先確認（無接駁巴士）。"}},{"fieldId":"official_current_url","icon":"information","label":{"ja":"公式情報","en":"Official information","zh-TW":"官方資訊"},"value":{"ja":"http://www.seotonoyu.jp/access","en":"http://www.seotonoyu.jp/access","zh-TW":"http://www.seotonoyu.jp/access"}},{"fieldId":"verification_note","icon":"information","label":{"ja":"確認状況","en":"Verification status","zh-TW":"確認狀態"},"value":{"ja":"該当する公式・市の情報を2026年9月26日に取得。掲載内容は確認中です。季節品の在庫、営業、休業、交通を訪問前に確認してください。","en":"Matching official or city information was retrieved Sep 26, 2026. This listing is still being confirmed; check seasonal stock, operations, closures, and transport before visiting.","zh-TW":"對應的官方或市政府資訊於2026年9月26日取得。刊載內容仍在確認中；造訪前請確認季節品庫存、營業、休業與交通。"}}],"caution":[{"ja":"・季節品・営業・交通などの条件は変更される場合があります。訪問前に公式情報をご確認ください。","en":"• Seasonal products, operations, and transport conditions can change. Check official information before visiting.","zh-TW":"・季節品、營業與交通條件可能變更。造訪前請確認官方資訊。"}]},
      "officialSource": undefined
    }
  },
  "story": {
    "groups": {
      "nearby": [{"referenceId":"akiruno-farmers-center","spotId":"akiruno-farmers-center","badgeColor":"#E98A1C","badge":{"ja":"立ち寄り先","en":"Route stop","zh-TW":"行程停靠點"},"description":{"ja":"秋川ファーマーズセンターは、生産者の農産物を季節ごとに買える直売所です。品揃えと不定休の有無は当日に確認します。","en":"Akikawa Farmers Center is a direct-sale market for producers’ seasonal farm products. Check stock and any irregular closure on the day.","zh-TW":"秋川 Farmers Center 是可按季節購買生產者農產的直賣所。庫存與臨時休業請在當天確認。"}},{"referenceId":"akiruno-seoto-no-yu","spotId":"akiruno-seoto-no-yu","badgeColor":"#E98A1C","badge":{"ja":"立ち寄り先","en":"Route stop","zh-TW":"行程停靠點"},"description":{"ja":"瀬音の湯は、秋川渓谷の自然の中で地元食材の料理や地域の物産販売につながる施設です。最新の営業内容と交通を公式サイトで確認します。","en":"Seoto-no-Yu sits in the Akigawa Valley and connects the landscape with local-food dining and regional products. Check the official site for current operations and transport.","zh-TW":"瀨音之湯位於秋川溪谷自然中，連結在地食材料理與地區物產販售。最新營業內容與交通請查看官方網站。"}}],
      "nature": []
    },
    "location": {
      "ja": {"region":"あきる野・秋川渓谷","station":"駅・路線は各立ち寄り先の公式案内で確認"},
      "en": {"region":"Akiruno, Akigawa Valley","station":"Check each stop’s official station and route guidance"},
      "zh-TW": {"region":"東京都秋留野・秋川溪谷","station":"各停靠點的車站與路線請查看官方指引"}
    },
    "point": {
      "ja": {"title":"季節と当日の品揃え","body":"季節・営業・交通の最新情報を確認してください。"},
      "en": {"title":"Season and daily stock","body":"Check current seasonal, opening, and transport information."},
      "zh-TW": {"title":"季節與當日品項","body":"請確認最新的季節、營業與交通資訊。"}
    }
  },
  "sources": {
    "culture-1": {
      "name": "あきる野市「特産品」",
      "url": "https://www.city.akiruno.tokyo.jp/kanko/0000001109.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2024-04-09",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "akiruno-specialty-foods-1109"
    },
    "culture-2": {
      "name": "あきる野市「秋川ファーマーズセンター」",
      "url": "https://www.city.akiruno.tokyo.jp/0000003556.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2026-04-02",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "akiruno-farmers-center-3556"
    },
    "culture-3": {
      "name": "秋川渓谷 瀬音の湯（公式アクセス）",
      "url": "http://www.seotonoyu.jp/access",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "seoto-no-yu-access"
    },
    "culture-4": {
      "name": "東京の観光公式サイト GO TOKYO「秋川渓谷 瀬音の湯」",
      "url": "https://www.gotokyo.org/jp/spot/397/index.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2025-10-31",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "gotokyo-seoto-no-yu-397"
    },
    "route-1": {
      "name": "編集部（秋川の旬の農産物）",
      "url": "https://www.city.akiruno.tokyo.jp/kanko/0000001109.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2024-04-09",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "seed-route-akiruno-seasonal-produce"
    },
    "route-2": {
      "name": "編集部（秋川の旬の農産物）",
      "url": "https://www.city.akiruno.tokyo.jp/kanko/0000001109.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2024-04-09",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "seed-route-akiruno-seasonal-produce"
    },
    "route-3": {
      "name": "あきる野市「特産品」",
      "url": "https://www.city.akiruno.tokyo.jp/kanko/0000001109.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2024-04-09",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "akiruno-specialty-foods-1109"
    },
    "route-4": {
      "name": "あきる野市「秋川ファーマーズセンター」",
      "url": "https://www.city.akiruno.tokyo.jp/0000003556.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2026-04-02",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "akiruno-farmers-center-3556"
    },
    "route-5": {
      "name": "秋川渓谷 瀬音の湯（公式アクセス）",
      "url": "http://www.seotonoyu.jp/access",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "seoto-no-yu-access"
    },
    "route-6": {
      "name": "東京の観光公式サイト GO TOKYO「秋川渓谷 瀬音の湯」",
      "url": "https://www.gotokyo.org/jp/spot/397/index.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2025-10-31",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "gotokyo-seoto-no-yu-397"
    },
    "route-7": {
      "name": "OpenStreetMap（秋川ファーマーズセンター）",
      "url": "https://www.openstreetmap.org/node/1668525947",
      "license": "ODbL 1.0",
      "sourceType": "open_data",
      "retrievedAt": "2026-08-19",
      "verificationStatus": "needs_confirmation",
      "originalId": "geocoded-akiruno-farmers-center"
    },
    "route-8": {
      "name": "NAVITIME（瀬音の湯の概略座標）",
      "url": "https://www.navitime.co.jp/poi?spot=02301-3000011",
      "sourceType": "business",
      "retrievedAt": "2026-08-19",
      "verificationStatus": "needs_confirmation",
      "originalId": "geocoded-akiruno-seoto-no-yu"
    },
    "akiruno-farmers-center-1": {
      "name": "あきる野市「秋川ファーマーズセンター」",
      "url": "https://www.city.akiruno.tokyo.jp/0000003556.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-09-26",
      "sourceUpdatedAt": "2026-04-02",
      "verificationStatus": "needs_confirmation",
      "originalId": "akiruno-farmers-center-3556"
    },
    "akiruno-farmers-center-2": {
      "name": "あきる野市「秋川ファーマーズセンター」",
      "url": "https://www.city.akiruno.tokyo.jp/0000003556.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2026-04-02",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "akiruno-farmers-center-3556"
    },
    "akiruno-seoto-no-yu-1": {
      "name": "秋川渓谷 瀬音の湯（公式）",
      "url": "http://www.seotonoyu.jp/access",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "seoto-no-yu-otsu565"
    },
    "akiruno-seoto-no-yu-2": {
      "name": "秋川渓谷 瀬音の湯（公式アクセス）",
      "url": "http://www.seotonoyu.jp/access",
      "sourceType": "business",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "seoto-no-yu-access"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": ["culture-1","culture-2","culture-3","culture-4","route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8"],
      "origin": "editorial"
    },
    "journey.chapters": {
      "sourceIds": ["culture-1","culture-2","culture-3","culture-4","route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8"],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8"],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8"],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8"],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8"],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": ["culture-1","culture-2","culture-3","culture-4","route-1","route-2","route-3","route-4","route-5","route-6","route-7","route-8"],
      "origin": "editorial"
    },
    "spots.akiruno-farmers-center": {
      "sourceIds": ["akiruno-farmers-center-1","akiruno-farmers-center-2"],
      "origin": "source"
    },
    "spots.akiruno-farmers-center.detail.information.0.value": {
      "sourceIds": ["akiruno-farmers-center-1","akiruno-farmers-center-2"],
      "origin": "editorial"
    },
    "spots.akiruno-farmers-center.detail.information.1.value": {
      "sourceIds": ["akiruno-farmers-center-1","akiruno-farmers-center-2"],
      "origin": "editorial"
    },
    "spots.akiruno-farmers-center.detail.information.2.value": {
      "sourceIds": ["akiruno-farmers-center-1","akiruno-farmers-center-2"],
      "origin": "editorial"
    },
    "spots.akiruno-farmers-center.detail.information.3.value": {
      "sourceIds": ["akiruno-farmers-center-1","akiruno-farmers-center-2"],
      "origin": "editorial"
    },
    "spots.akiruno-farmers-center.detail.information.4.value": {
      "sourceIds": ["akiruno-farmers-center-1","akiruno-farmers-center-2"],
      "origin": "editorial"
    },
    "spots.akiruno-farmers-center.detail.information.5.value": {
      "sourceIds": ["akiruno-farmers-center-1","akiruno-farmers-center-2"],
      "origin": "editorial"
    },
    "spots.akiruno-farmers-center.detail.information.6.value": {
      "sourceIds": ["akiruno-farmers-center-1","akiruno-farmers-center-2"],
      "origin": "editorial"
    },
    "spots.akiruno-seoto-no-yu": {
      "sourceIds": ["akiruno-seoto-no-yu-1","akiruno-seoto-no-yu-2"],
      "origin": "source"
    },
    "spots.akiruno-seoto-no-yu.detail.information.0.value": {
      "sourceIds": ["akiruno-seoto-no-yu-1","akiruno-seoto-no-yu-2"],
      "origin": "editorial"
    },
    "spots.akiruno-seoto-no-yu.detail.information.1.value": {
      "sourceIds": ["akiruno-seoto-no-yu-1","akiruno-seoto-no-yu-2"],
      "origin": "editorial"
    },
    "spots.akiruno-seoto-no-yu.detail.information.2.value": {
      "sourceIds": ["akiruno-seoto-no-yu-1","akiruno-seoto-no-yu-2"],
      "origin": "editorial"
    },
    "spots.akiruno-seoto-no-yu.detail.information.3.value": {
      "sourceIds": ["akiruno-seoto-no-yu-1","akiruno-seoto-no-yu-2"],
      "origin": "editorial"
    },
    "spots.akiruno-seoto-no-yu.detail.information.4.value": {
      "sourceIds": ["akiruno-seoto-no-yu-1","akiruno-seoto-no-yu-2"],
      "origin": "editorial"
    }
  }
};
