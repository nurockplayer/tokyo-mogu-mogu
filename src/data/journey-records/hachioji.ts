import type { JourneyRecord } from '../journey-record';

export const hachiojiJourneyRecord: JourneyRecord = {
  "municipalityId": "hachioji",
  "journey": {
    "id": "demo-tokyo-hachioji-ginger",
    "regionId": "hachioji",
    "foodCultureId": "hachioji-ginger",
    "storyId": "hachioji-ginger",
    "routeId": "hachioji-ginger-journey",
    "copy": {
      "ja": {"title":"八王子ショウガと滝山の食文化をたどる旅","subtitle":"八王子ショウガと八王子野菜","description":"八王子で受け継がれてきたショウガと、旬の八王子野菜を訪ねる食文化。","tags":["八王子ショウガ","旬の農産物","八王子"],"storyTitle":"八王子ショウガと八王子野菜の物語","intro":["八王子ショウガは加住町などで生産が続く江戸東京野菜です。道の駅八王子滝山では、市内の生産者が届ける野菜や地域の食文化に出会えます。","八王子で受け継がれてきたショウガと、旬の八王子野菜を訪ねる食文化。"]},
      "en": {"title":"Hachioji Ginger & Takiyama Food Culture Journey","subtitle":"Hachioji Ginger & Local Produce","description":"A journey into Hachioji ginger and the city’s seasonal local produce.","tags":["Hachioji ginger","Seasonal produce","Hachioji"],"storyTitle":"The Story of Hachioji Ginger & Local Produce","intro":["Hachioji ginger is an Edo-Tokyo vegetable still grown around Kazumi and other parts of the city. Michi-no-Eki Hachioji Takiyama connects visitors with local produce and food traditions.","A journey into Hachioji ginger and the city’s seasonal local produce."]},
      "zh-TW": {"title":"八王子薑與滝山飲食文化之旅","subtitle":"八王子薑與八王子在地蔬菜","description":"探訪八王子流傳至今的薑，以及當季八王子在地蔬菜的飲食文化。","tags":["八王子薑","當季農產品","八王子"],"storyTitle":"八王子薑與八王子在地蔬菜的故事","intro":["八王子薑是持續在加住町等地生產的江戶東京蔬菜。在道之驛八王子滝山，可以遇見市內生產者送來的蔬菜與地方飲食文化。","探訪八王子流傳至今的薑，以及當季八王子在地蔬菜的飲食文化。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"八王子ショウガの歩み","body":"JA東京中央会によると、八王子ショウガは昭和初期に伝わって以来80年以上途切れず生産され、しょうが祭にも奉納されてきました。"},{"number":"02.","title":"生産者と直売所","body":"八王子市内の生産者たち。八王子市の公式案内は、道の駅の直売所に市内各地の生産者が農産物を持ち寄ると紹介しています。"},{"number":"03.","title":"季節と当日の入荷","body":"農産物の品揃えは季節と当日の入荷に左右されます。だからこそ、直売所で旬を選び、地域の生産者や食文化に関心を向けることが、営みを知る入口になります。"},{"number":"04.","title":"旬の八王子を楽しむ","body":"旬の時期に八王子ショウガを探し、直売所や地場食材の料理を選んでみよう。品揃えは季節や当日の入荷で変わります。"}],
      "en": [{"number":"01.","title":"Hachioji ginger through time","body":"JA Tokyo Central Union records that Hachioji ginger has been grown continuously for more than 80 years since it arrived in the early Showa period, and is offered at the local ginger festival."},{"number":"02.","title":"Growers and the farm market","body":"Hachioji producers bring seasonal crops to the roadside station’s farm market, according to the city’s official guide."},{"number":"03.","title":"Season and daily deliveries","body":"What the farm market carries depends on the season and the day’s deliveries. Choosing what is in season and paying attention to local producers is a small way into the living food culture behind the shelves."},{"number":"04.","title":"Enjoy Hachioji in season","body":"In season, look for Hachioji ginger and choose local produce or a dish made with it. Availability changes with the season and the day’s deliveries."}],
      "zh-TW": [{"number":"01.","title":"八王子薑的歷史","body":"根據 JA 東京中央會的介紹，八王子薑自昭和初期傳入後，已持續生產超過80年，也會在當地的薑祭中供奉。"},{"number":"02.","title":"生產者與農產直賣所","body":"在市內各地種植蔬菜、再送到直賣所的生產者們。這是根據八王子市官方說明所整理的介紹。"},{"number":"03.","title":"季節與每日進貨","body":"直賣所的品項會受到季節與當日進貨影響。選擇當季食材、留意在地生產者，是理解貨架背後活生生飲食文化的一個入口。"},{"number":"04.","title":"品味當季八王子","body":"在當季尋找八王子薑，挑選直賣所的在地農產或使用在地食材的料理。品項會隨季節與當日進貨變動。"}]
    },
    "routeVariants": [
      {"id":"half-day","durationMinutes":145,"steps":[{"spotId":"hachioji-takiyama-roadside-station"},{"spotId":"hachioji-takiyama-castle"}]},
      {"id":"full-day","durationMinutes":220,"steps":[{"spotId":"hachioji-takiyama-roadside-station"},{"spotId":"hachioji-takiyama-castle"}]}
    ]
  },
  "routeName": {
    "ja": "八王子ショウガと滝山の食文化をたどる旅",
    "en": "Hachioji Ginger & Takiyama Food Culture Journey",
    "zh-TW": "八王子薑與滝山飲食文化之旅"
  },
  "location": {
    "ja": {
      "area": "八王子・東京",
      "station": "",
      "access": "JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。",
      "source": {"name":"道の駅八王子滝山（公式）","url":"https://www.michinoeki-hachioji.net/","sourceType":"official_web","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"michi-no-eki-hachioji-takiyama"},
      "sourceValue": "JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。"
    },
    "en": {
      "area": "Hachioji, Tokyo",
      "station": "",
      "access": "From JR or Keio Hachioji Station, take a bus via the Hiyodoriyama Tunnel toward Tobuki, get off at Michi-no-Eki Hachioji Takiyama Iriguchi, then walk about 3 minutes. Check current bus times before travel.",
      "source": {"name":"道の駅八王子滝山（公式）","url":"https://www.michinoeki-hachioji.net/","sourceType":"official_web","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"michi-no-eki-hachioji-takiyama"},
      "sourceValue": "From JR or Keio Hachioji Station, take a bus via the Hiyodoriyama Tunnel toward Tobuki, get off at Michi-no-Eki Hachioji Takiyama Iriguchi, then walk about 3 minutes. Check current bus times before travel."
    },
    "zh-TW": {
      "area": "東京都八王子",
      "station": "",
      "access": "從 JR／京王八王子站搭乘經由ひよどり山隧道、往戸吹方向的巴士，在「道の駅八王子滝山入口」下車後步行約 3 分鐘。搭車前請確認最新班次。",
      "source": {"name":"道の駅八王子滝山（公式）","url":"https://www.michinoeki-hachioji.net/","sourceType":"official_web","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"michi-no-eki-hachioji-takiyama"},
      "sourceValue": "JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。"
    }
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "道の駅八王子滝山入口", "en": "Michi-no-Eki Hachiōji Takiyama Iriguchi bus stop", "zh-TW": "八王子瀧山道路休息站入口巴士站"}, "spotId": "hachioji-takiyama-roadside-station", "sourceId": "admission-access"},
      "steps": [{"spotId":"hachioji-takiyama-roadside-station","description":{"ja":"文化庁の「食文化ミュージアム」に認定された道の駅。市内の生産者が届ける野菜や、旬の八王子ショウガを探します。品揃えは季節と当日の入荷で変わります。","en":"Start at the farm market of a roadside station recognized under the Agency for Cultural Affairs' Food Culture Museum program. Look for Hachioji produce and seasonal ginger; stock changes with the season and day.","zh-TW":"從獲日本文化廳「食文化博物館」計畫認可的道之驛開始，尋找八王子農產與當季八王子薑；品項會隨季節與當日進貨變動。"}},{"spotId":"hachioji-takiyama-castle","description":{"ja":"滝山城跡で加住・滝山の文化景観をたどります。食材の販売場所ではなく、八王子の土地の背景を知るための文化財ストップです。","en":"Trace the cultural landscape of Kazumi and Takiyama at the castle ruins. This is a heritage context stop, not a place to buy food.","zh-TW":"在滝山城跡追尋加住・滝山的文化景觀。這裡不是購買食材的地方，而是理解八王子土地背景的文化財景點。"}}],
      "stats": {"ja":{"time":"目安 2 時間 25 分","spots":"2 スポット","distance":"徒歩（現地の案内を確認）","station":"","minutes":"","access":"JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。","source":{"name":"道の駅八王子滝山（公式）","url":"https://www.michinoeki-hachioji.net/","sourceType":"official_web","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"michi-no-eki-hachioji-takiyama"},"sourceValue":"JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。","caution":"所要時間・滞在時間・徒歩時間は編集部の目安です。現地の案内と当日の状況を確認してください。"},"en":{"time":"Est. 2 hr 25 min","spots":"2 spots","distance":"Walking (check local guidance)","station":"","minutes":"","access":"From JR or Keio Hachioji Station, take a bus via the Hiyodoriyama Tunnel toward Tobuki, get off at Michi-no-Eki Hachioji Takiyama Iriguchi, then walk about 3 minutes. Check current bus times before travel.","source":{"name":"道の駅八王子滝山（公式）","url":"https://www.michinoeki-hachioji.net/","sourceType":"official_web","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"michi-no-eki-hachioji-takiyama"},"sourceValue":"JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。","caution":"Total, stay, and walking times are editorial estimates; check local guidance and conditions on the day."},"zh-TW":{"time":"參考 2 小時 25 分鐘","spots":"2 個景點","distance":"步行（請確認現地指引）","station":"","minutes":"","access":"從 JR／京王八王子站搭乘經由ひよどり山隧道、往戸吹方向的巴士，在「道の駅八王子滝山入口」下車後步行約 3 分鐘。搭車前請確認最新班次。","source":{"name":"道の駅八王子滝山（公式）","url":"https://www.michinoeki-hachioji.net/","sourceType":"official_web","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"michi-no-eki-hachioji-takiyama"},"sourceValue":"JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。","caution":"總時間、停留時間與步行時間為編輯部估算；請確認現地指引與當日狀況。"}},
      "guidance": {"ja":"八王子・東京都","en":"Hachioji, Tokyo","zh-TW":"東京都八王子"}
    },
    "full-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "道の駅八王子滝山入口", "en": "Michi-no-Eki Hachiōji Takiyama Iriguchi bus stop", "zh-TW": "八王子瀧山道路休息站入口巴士站"}, "spotId": "hachioji-takiyama-roadside-station", "sourceId": "admission-access"},
      "steps": [{"spotId":"hachioji-takiyama-roadside-station","description":{"ja":"直売所と地場食材の料理をゆっくり見て、八王子ショウガが入荷しているか現地で確認します。品揃えは季節と当日の入荷で変わります。","en":"Take time with the farm market and local-food options, then check on site whether Hachioji ginger has arrived. Stock changes with the season and day.","zh-TW":"慢慢逛直賣所與在地食材料理，並在現場確認八王子薑是否到貨。品項會隨季節與當日進貨變動。"}},{"spotId":"hachioji-takiyama-castle","description":{"ja":"滝山城跡を歩き、加住地域の文化景観をたどります。城跡は食材の販売場所ではないため、食文化を支える土地の背景として訪ねます。","en":"Walk through the castle ruins and the Kazumi landscape. The site is not a food venue; visit it as context for the land behind the food culture.","zh-TW":"漫步滝山城跡，追尋加住地區的文化景觀。城跡不是食材販售場所，請把它當成支撐飲食文化的土地背景來造訪。"}}],
      "stats": {"ja":{"time":"目安 3 時間 40 分","spots":"2 スポット","distance":"徒歩（現地の案内を確認）","station":"","minutes":"","access":"JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。","source":{"name":"道の駅八王子滝山（公式）","url":"https://www.michinoeki-hachioji.net/","sourceType":"official_web","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"michi-no-eki-hachioji-takiyama"},"sourceValue":"JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。","caution":"所要時間・滞在時間・徒歩時間は編集部の目安です。現地の案内と当日の状況を確認してください。"},"en":{"time":"Est. 3 hr 40 min","spots":"2 spots","distance":"Walking (check local guidance)","station":"","minutes":"","access":"From JR or Keio Hachioji Station, take a bus via the Hiyodoriyama Tunnel toward Tobuki, get off at Michi-no-Eki Hachioji Takiyama Iriguchi, then walk about 3 minutes. Check current bus times before travel.","source":{"name":"道の駅八王子滝山（公式）","url":"https://www.michinoeki-hachioji.net/","sourceType":"official_web","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"michi-no-eki-hachioji-takiyama"},"sourceValue":"JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。","caution":"Total, stay, and walking times are editorial estimates; check local guidance and conditions on the day."},"zh-TW":{"time":"參考 3 小時 40 分鐘","spots":"2 個景點","distance":"步行（請確認現地指引）","station":"","minutes":"","access":"從 JR／京王八王子站搭乘經由ひよどり山隧道、往戸吹方向的巴士，在「道の駅八王子滝山入口」下車後步行約 3 分鐘。搭車前請確認最新班次。","source":{"name":"道の駅八王子滝山（公式）","url":"https://www.michinoeki-hachioji.net/","sourceType":"official_web","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"michi-no-eki-hachioji-takiyama"},"sourceValue":"JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。","caution":"總時間、停留時間與步行時間為編輯部估算；請確認現地指引與當日狀況。"}},
      "guidance": {"ja":"八王子・東京都","en":"Hachioji, Tokyo","zh-TW":"東京都八王子"}
    }
  },
  "spots": {
    "hachioji-takiyama-roadside-station": {
      "presentation": {"id":"hachioji-takiyama-roadside-station","regionId":"hachioji","foodCultureId":"hachioji-ginger","thumbnailAssetIds":[],"copy":{"ja":{"name":"道の駅八王子滝山","lead":"市内の農産物や地域の食文化に出会える道の駅です。八王子ショウガは季節商品として扱われるため、当日の入荷は現地で確認します。","description":"市内の農産物や地域の食文化に出会える道の駅です。八王子ショウガは季節商品として扱われるため、当日の入荷は現地で確認します。","tags":["公式・公的情報参照","確認中"],"practicalInfo":[{"label":"所在地","value":"東京都八王子市滝山町1-592-2"},{"label":"アクセス","value":"JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。"},{"label":"営業時間","value":"8:00〜19:00（施設内一部店舗を除く）"},{"label":"営業日","value":"年中無休（施設内一部店舗を除く）"}],"caution":["掲載内容は確認中です。営業時間・バス時刻・当日の入荷は訪問前・現地でご確認ください。"]},"en":{"name":"Michi-no-Eki Hachioji Takiyama","lead":"A roadside station where visitors can meet Hachioji produce and local food culture. Hachioji ginger is seasonal, so check the day’s stock on site.","description":"A roadside station where visitors can meet Hachioji produce and local food culture. Hachioji ginger is seasonal, so check the day’s stock on site.","tags":["Official/public information","Confirmation pending"],"practicalInfo":[{"label":"Address","value":"東京都八王子市滝山町1-592-2"},{"label":"Access","value":"From JR or Keio Hachioji Station, take a bus via the Hiyodoriyama Tunnel toward Tobuki, get off at Michi-no-Eki Hachioji Takiyama Iriguchi, then walk about 3 minutes. Check current bus times before travel."},{"label":"Hours","value":"8:00 a.m.–7:00 p.m. (some facilities have separate hours)"},{"label":"Opening days","value":"Open year-round (some facilities have separate schedules)"}],"caution":["This listing is still being confirmed. Check current hours, bus times, and day-of stock before or during your visit."]},"zh-TW":{"name":"道之驛八王子滝山","lead":"可以遇見市內農產品與地方飲食文化的道之驛。八王子薑是季節商品，當日是否進貨請在現場確認。","description":"可以遇見市內農產品與地方飲食文化的道之驛。八王子薑是季節商品，當日是否進貨請在現場確認。","tags":["參考官方／公部門資訊","確認中"],"practicalInfo":[{"label":"地址","value":"東京都八王子市滝山町1-592-2"},{"label":"交通","value":"從 JR／京王八王子站搭乘經由ひよどり山隧道、往戸吹方向的巴士，在「道の駅八王子滝山入口」下車後步行約 3 分鐘。搭車前請確認最新班次。"},{"label":"營業時間","value":"08:00–19:00（設施內部分店鋪除外）"},{"label":"營業日","value":"全年營業（設施內部分店鋪另有安排）"}],"caution":["刊載內容仍在確認中。造訪前或現場請確認最新營業時間、巴士班次與當日進貨。"]}}},
      "detail": {"tags":[{"tagId":"local-produce-market","color":"#8FAE5C","label":{"ja":"地場農産物","en":"Local produce","zh-TW":"在地農產品"}},{"tagId":"official-source","color":"#F0A24C","label":{"ja":"公式情報参照","en":"Official source","zh-TW":"參考官方資訊"}},{"tagId":"confirmation-pending","color":"#5D9BEF","label":{"ja":"確認中","en":"Confirmation pending","zh-TW":"確認中"}}],"description":{"ja":"八王子市内の農産物と食文化に出会う道の駅です。八王子ショウガは季節商品として扱われるため、当日の入荷は現地でご確認ください。","en":"A roadside station for Hachioji produce and food culture. Hachioji ginger is seasonal, so check day-of stock on site.","zh-TW":"可認識八王子市農產品與飲食文化的道之驛。八王子薑為季節商品，當日進貨請於現場確認。"},"information":[{"fieldId":"name","icon":"information","label":{"ja":"名称","en":"Name","zh-TW":"名稱"},"value":{"ja":"道の駅八王子滝山","en":"Michi-no-Eki Hachioji Takiyama","zh-TW":"道之驛八王子滝山"}},{"fieldId":"address","icon":"information","label":{"ja":"所在地","en":"Address","zh-TW":"地址"},"value":{"ja":"東京都八王子市滝山町1-592-2","en":"東京都八王子市滝山町1-592-2","zh-TW":"東京都八王子市滝山町1-592-2"}},{"fieldId":"access","icon":"train","label":{"ja":"アクセス","en":"Access","zh-TW":"交通"},"value":{"ja":"JR・京王八王子駅からひよどり山トンネル経由の戸吹方面行きバスに乗り、「道の駅八王子滝山入口」下車、徒歩約3分。バス時刻は利用前に確認してください。","en":"From JR or Keio Hachioji Station, take a bus via the Hiyodoriyama Tunnel toward Tobuki, get off at Michi-no-Eki Hachioji Takiyama Iriguchi, then walk about 3 minutes. Check current bus times before travel.","zh-TW":"從 JR／京王八王子站搭乘經由ひよどり山隧道、往戸吹方向的巴士，在「道の駅八王子滝山入口」下車後步行約 3 分鐘。搭車前請確認最新班次。"}},{"fieldId":"hours","icon":"clock","label":{"ja":"営業時間","en":"Hours","zh-TW":"營業時間"},"value":{"ja":"8:00〜19:00（施設内一部店舗を除く）","en":"8:00 a.m.–7:00 p.m. (some facilities have separate hours)","zh-TW":"08:00–19:00（設施內部分店鋪除外）"}},{"fieldId":"closed_days","icon":"information","label":{"ja":"営業日","en":"Opening days","zh-TW":"營業日"},"value":{"ja":"年中無休（施設内一部店舗を除く）","en":"Open year-round (some facilities have separate schedules)","zh-TW":"全年營業（設施內部分店鋪另有安排）"}},{"fieldId":"official_current_url","icon":"information","label":{"ja":"公式案内","en":"Official information","zh-TW":"官方資訊"},"value":{"ja":"https://www.michinoeki-hachioji.net/","en":"https://www.michinoeki-hachioji.net/","zh-TW":"https://www.michinoeki-hachioji.net/"}},{"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"公式情報を2026年9月26日に再取得。営業時間・バス時刻・当日の入荷は訪問前・現地でご確認ください。","en":"Official information retrieved Sep 26, 2026. Check current hours, bus times, and day-of stock before or during your visit.","zh-TW":"官方資訊於 2026 年 9 月 26 日重新取得。造訪前或現場請確認最新營業時間、巴士班次與當日進貨。"}}],"caution":[{"ja":"・八王子ショウガは季節商品です。入荷・営業時間・交通は変わる場合があるため、訪問前に公式情報をご確認ください。","en":"• Hachioji ginger is seasonal. Stock, hours, and transport can change; check official information before visiting.","zh-TW":"・八王子薑為季節商品。進貨、營業時間與交通可能變動，造訪前請查看官方資訊。"}]},
      "officialSource": {"name":"道の駅八王子滝山（公式）","url":"https://www.michinoeki-hachioji.net/","sourceType":"official_web","retrievedAt":"2026-09-26","verificationStatus":"needs_confirmation","originalId":"michi-no-eki-hachioji-takiyama"}
    },
    "hachioji-takiyama-castle": {
      "presentation": {"id":"hachioji-takiyama-castle","regionId":"hachioji","foodCultureId":"hachioji-ginger","thumbnailAssetIds":[],"copy":{"ja":{"name":"滝山城跡","lead":"八王子市の文化財一覧に掲載される滝山城跡。食材を買う場所ではなく、八王子ショウガを育ててきた加住・滝山の土地の背景をたどる文化財ストップです。","description":"八王子市の文化財一覧に掲載される滝山城跡。食材を買う場所ではなく、八王子ショウガを育ててきた加住・滝山の土地の背景をたどる文化財ストップです。","tags":["公式・公的情報参照","確認中"],"practicalInfo":[{"label":"所在地","value":"東京都八王子市丹木町2丁目・丹木町3丁目・高月町・加住町1丁目"}],"caution":["掲載内容は確認中です。営業時間・バス時刻・当日の入荷は訪問前・現地でご確認ください。"]},"en":{"name":"Takiyama Castle Ruins","lead":"Listed in Hachioji’s cultural-property data, Takiyama Castle Ruins provide heritage context for the Kazumi and Takiyama land behind Hachioji ginger; they are not a food venue.","description":"Listed in Hachioji’s cultural-property data, Takiyama Castle Ruins provide heritage context for the Kazumi and Takiyama land behind Hachioji ginger; they are not a food venue.","tags":["Official/public information","Confirmation pending"],"practicalInfo":[{"label":"Address","value":"東京都八王子市丹木町2丁目・丹木町3丁目・高月町・加住町1丁目"}],"caution":["This listing is still being confirmed. Check current hours, bus times, and day-of stock before or during your visit."]},"zh-TW":{"name":"滝山城跡","lead":"滝山城跡登載於八王子市文化財資料。這裡不是購買食材的地方，而是追尋孕育八王子薑的加住・滝山土地背景的文化財景點。","description":"滝山城跡登載於八王子市文化財資料。這裡不是購買食材的地方，而是追尋孕育八王子薑的加住・滝山土地背景的文化財景點。","tags":["參考官方／公部門資訊","確認中"],"practicalInfo":[{"label":"地址","value":"東京都八王子市丹木町2丁目・丹木町3丁目・高月町・加住町1丁目"}],"caution":["刊載內容仍在確認中。造訪前或現場請確認最新營業時間、巴士班次與當日進貨。"]}}},
      "detail": {"tags":[{"tagId":"heritage-context","color":"#8FAE5C","label":{"ja":"文化財","en":"Heritage","zh-TW":"文化財"}},{"tagId":"open-data-source","color":"#F0A24C","label":{"ja":"東京都オープンデータ","en":"Tokyo open data","zh-TW":"東京都開放資料"}},{"tagId":"confirmation-pending","color":"#5D9BEF","label":{"ja":"確認中","en":"Confirmation pending","zh-TW":"確認中"}}],"description":{"ja":"東京都のオープンデータに掲載される国指定史跡・滝山城跡です。食材を購入する場所ではなく、八王子ショウガの土地の背景を知る文化財ストップです。","en":"Takiyama Castle Ruins, a national historic site listed in Tokyo open data. This is heritage context for Hachioji ginger, not a place to buy food.","zh-TW":"東京都開放資料所載的國指定史跡・滝山城跡。這是了解八王子薑產地背景的文化財停靠點，並非購買食材的場所。"},"information":[{"fieldId":"name","icon":"information","label":{"ja":"名称","en":"Name","zh-TW":"名稱"},"value":{"ja":"滝山城跡","en":"Takiyama Castle Ruins","zh-TW":"滝山城跡"}},{"fieldId":"address","icon":"information","label":{"ja":"所在地","en":"Published area","zh-TW":"所在地"},"value":{"ja":"東京都八王子市丹木町2丁目・丹木町3丁目・高月町・加住町1丁目","en":"東京都八王子市丹木町2丁目・丹木町3丁目・高月町・加住町1丁目","zh-TW":"東京都八王子市丹木町2丁目・丹木町3丁目・高月町・加住町1丁目"}},{"fieldId":"official_current_url","icon":"information","label":{"ja":"文化財一覧","en":"Cultural-property data","zh-TW":"文化財列表"},"value":{"ja":"https://catalog.data.metro.tokyo.lg.jp/dataset/t132012d3000000018","en":"https://catalog.data.metro.tokyo.lg.jp/dataset/t132012d3000000018","zh-TW":"https://catalog.data.metro.tokyo.lg.jp/dataset/t132012d3000000018"}},{"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"東京都オープンデータの掲載行を2026年9月26日に取得。原資料に座標はありません。現地の見学・入口情報は訪問前にご確認ください。","en":"The Tokyo open-data record was retrieved Sep 26, 2026; the source row contains no coordinates. Check current access and entrance information before visiting.","zh-TW":"東京都開放資料於 2026 年 9 月 26 日取得；原始資料列未提供座標。造訪前請確認現地參觀與入口資訊。"}}],"caution":[{"ja":"・滝山城跡は文化財の背景紹介です。見学可能範囲・入口・現地状況は訪問前に公的情報をご確認ください。","en":"• Takiyama Castle Ruins are included as heritage context. Check official information for current visiting areas, entrances, and conditions.","zh-TW":"・滝山城跡作為文化財背景介紹。造訪前請查看公部門資訊，確認可參觀範圍、入口與現場狀況。"}]},
      "officialSource": undefined
    }
  },
  "story": {
    "groups": {
      "nearby": [{"referenceId":"hachioji-takiyama-roadside-station","spotId":"hachioji-takiyama-roadside-station","badgeColor":"#E98A1C","badge":{"ja":"道の駅・直売所","en":"Roadside station & farm market","zh-TW":"道之驛・農產直賣所"},"description":{"ja":"市内の農産物や地域の食文化に出会える道の駅です。八王子ショウガは季節商品として扱われるため、当日の入荷は現地で確認します。","en":"A roadside station where visitors can meet Hachioji produce and local food culture. Hachioji ginger is seasonal, so check the day’s stock on site.","zh-TW":"可以遇見市內農產品與地方飲食文化的道之驛。八王子薑是季節商品，當日是否進貨請在現場確認。"},"note":{"ja":"八王子ショウガは季節商品です。当日の入荷は現地で確認してください。","en":"Hachioji ginger is seasonal. Check current stock on site.","zh-TW":"八王子薑為季節商品，當日進貨請在現場確認。"}},{"referenceId":"hachioji-takiyama-castle","spotId":"hachioji-takiyama-castle","badgeColor":"#5E7239","badge":{"ja":"文化財","en":"Heritage","zh-TW":"文化財"},"description":{"ja":"八王子市の文化財一覧に掲載される滝山城跡。食材を買う場所ではなく、八王子ショウガを育ててきた加住・滝山の土地の背景をたどる文化財ストップです。","en":"Listed in Hachioji’s cultural-property data, Takiyama Castle Ruins provide heritage context for the Kazumi and Takiyama land behind Hachioji ginger; they are not a food venue.","zh-TW":"滝山城跡登載於八王子市文化財資料。這裡不是購買食材的地方，而是追尋孕育八王子薑的加住・滝山土地背景的文化財景點。"},"note":{"ja":"食材の販売場所ではなく、土地の背景を知るための文化財です。","en":"This is heritage context for the landscape, not a place to buy food.","zh-TW":"此處是認識土地背景的文化財，並非食材販售地點。"}}],
      "nature": []
    },
    "location": {
      "ja": {"region":"八王子・東京都","station":"JR・京王八王子駅からバス（時刻は要確認）"},
      "en": {"region":"Hachioji, Tokyo","station":"Bus from JR or Keio Hachioji Station (check current times)"},
      "zh-TW": {"region":"東京都八王子","station":"從 JR／京王八王子站搭乘巴士（請確認最新班次）"}
    },
    "point": {
      "ja": {"title":"季節と当日の入荷","body":"品揃えは季節と当日の入荷で変わります。現地の案内を確認してください。"},
      "en": {"title":"Season and daily stock","body":"Stock changes by season and day; check current local guidance."},
      "zh-TW": {"title":"季節與每日進貨","body":"品項會隨季節與當日進貨變動；請確認現地指引。"}
    }
  },
  "sources": {
    "admission-access": {"name": "Hachioji City Takiyama roadside station access", "url": "https://www.city.hachioji.tokyo.jp/kurashi/sangyo/004/003/p006476.html", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "culture-1": {
      "name": "JA東京中央会「江戸東京野菜」八王子ショウガ",
      "url": "https://www.tokyo-ja.or.jp/farm/edo/41.php",
      "sourceType": "official_web",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "edo-tokyo-vegetable-hachioji-ginger"
    },
    "culture-2": {
      "name": "八王子市「道の駅八王子滝山が『食文化ミュージアム』に認定」",
      "url": "https://www.city.hachioji.tokyo.jp/kurashi/sangyo/004/003/p035222.html",
      "sourceType": "official_web",
      "sourceUpdatedAt": "2025-05-27",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "hachioji-food-culture-museum-p035222"
    },
    "culture-3": {
      "name": "道の駅八王子滝山（公式）",
      "url": "https://www.michinoeki-hachioji.net/",
      "sourceType": "official_web",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "michi-no-eki-hachioji-takiyama"
    },
    "route-1": {
      "name": "編集部（八王子ショウガと滝山の食文化）",
      "url": "https://www.tokyo-ja.or.jp/farm/edo/41.php",
      "sourceType": "official_web",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "seed-route-hachioji-ginger"
    },
    "route-2": {
      "name": "編集部（八王子ショウガと滝山の食文化）",
      "url": "https://www.tokyo-ja.or.jp/farm/edo/41.php",
      "sourceType": "official_web",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "seed-route-hachioji-ginger"
    },
    "route-3": {
      "name": "道の駅八王子滝山（公式）",
      "url": "https://www.michinoeki-hachioji.net/",
      "sourceType": "official_web",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "michi-no-eki-hachioji-takiyama"
    },
    "route-4": {
      "name": "八王子市文化財一覧（オープンデータ）",
      "url": "https://catalog.data.metro.tokyo.lg.jp/dataset/t132012d3000000018",
      "license": "CC BY 4.0",
      "sourceType": "open_data",
      "sourceDatasetId": "t132012d3000000018",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "cp-t132012d3000000018-0000000003"
    },
    "route-5": {
      "name": "OpenStreetMap（八王子滝山・滝山城跡の概略座標）",
      "url": "https://www.openstreetmap.org/?mlat=35.6864699&mlon=139.3414479#map=13/35.692/139.333",
      "license": "ODbL 1.0",
      "sourceType": "open_data",
      "retrievedAt": "2026-08-19",
      "verificationStatus": "needs_confirmation",
      "originalId": "geocoded-hachioji-places"
    },
    "hachioji-takiyama-roadside-station-1": {
      "name": "道の駅八王子滝山（公式）／OpenStreetMap",
      "url": "https://www.michinoeki-hachioji.net/",
      "sourceType": "official_web",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "michi-no-eki-hachioji-takiyama"
    },
    "hachioji-takiyama-roadside-station-2": {
      "name": "道の駅八王子滝山（公式）",
      "url": "https://www.michinoeki-hachioji.net/",
      "sourceType": "official_web",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "michi-no-eki-hachioji-takiyama"
    },
    "hachioji-takiyama-castle-1": {
      "name": "八王子市文化財一覧（オープンデータ）／OpenStreetMap",
      "url": "https://catalog.data.metro.tokyo.lg.jp/dataset/t132012d3000000018",
      "license": "CC BY 4.0",
      "sourceType": "open_data",
      "sourceDatasetId": "t132012d3000000018",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "cp-t132012d3000000018-0000000003"
    },
    "hachioji-takiyama-castle-2": {
      "name": "八王子市文化財一覧（オープンデータ）",
      "url": "https://catalog.data.metro.tokyo.lg.jp/dataset/t132012d3000000018",
      "license": "CC BY 4.0",
      "sourceType": "open_data",
      "sourceDatasetId": "t132012d3000000018",
      "retrievedAt": "2026-09-26",
      "verificationStatus": "needs_confirmation",
      "originalId": "cp-t132012d3000000018-0000000003"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": ["culture-1","culture-2","culture-3","route-1","route-2","route-3","route-4","route-5"],
      "origin": "editorial"
    },
    "journey.chapters": {
      "sourceIds": ["culture-1","culture-2","culture-3","route-1","route-2","route-3","route-4","route-5"],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5"],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5"],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5"],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": ["route-1","route-2","route-3","route-4","route-5"],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": ["culture-1","culture-2","culture-3","route-1","route-2","route-3","route-4","route-5"],
      "origin": "editorial"
    },
    "spots.hachioji-takiyama-roadside-station": {
      "sourceIds": ["hachioji-takiyama-roadside-station-1","hachioji-takiyama-roadside-station-2"],
      "origin": "source"
    },
    "spots.hachioji-takiyama-roadside-station.detail.information.0.value": {
      "sourceIds": ["hachioji-takiyama-roadside-station-1","hachioji-takiyama-roadside-station-2"],
      "origin": "editorial"
    },
    "spots.hachioji-takiyama-roadside-station.detail.information.1.value": {
      "sourceIds": ["hachioji-takiyama-roadside-station-1","hachioji-takiyama-roadside-station-2"],
      "origin": "editorial"
    },
    "spots.hachioji-takiyama-roadside-station.detail.information.2.value": {
      "sourceIds": ["hachioji-takiyama-roadside-station-1","hachioji-takiyama-roadside-station-2"],
      "origin": "editorial"
    },
    "spots.hachioji-takiyama-roadside-station.detail.information.3.value": {
      "sourceIds": ["hachioji-takiyama-roadside-station-1","hachioji-takiyama-roadside-station-2"],
      "origin": "editorial"
    },
    "spots.hachioji-takiyama-roadside-station.detail.information.4.value": {
      "sourceIds": ["hachioji-takiyama-roadside-station-1","hachioji-takiyama-roadside-station-2"],
      "origin": "editorial"
    },
    "spots.hachioji-takiyama-roadside-station.detail.information.5.value": {
      "sourceIds": ["hachioji-takiyama-roadside-station-1","hachioji-takiyama-roadside-station-2"],
      "origin": "editorial"
    },
    "spots.hachioji-takiyama-roadside-station.detail.information.6.value": {
      "sourceIds": ["hachioji-takiyama-roadside-station-1","hachioji-takiyama-roadside-station-2"],
      "origin": "editorial"
    },
    "spots.hachioji-takiyama-castle": {
      "sourceIds": ["hachioji-takiyama-castle-1","hachioji-takiyama-castle-2"],
      "origin": "source"
    },
    "spots.hachioji-takiyama-castle.detail.information.0.value": {
      "sourceIds": ["hachioji-takiyama-castle-1","hachioji-takiyama-castle-2"],
      "origin": "editorial"
    },
    "spots.hachioji-takiyama-castle.detail.information.1.value": {
      "sourceIds": ["hachioji-takiyama-castle-1","hachioji-takiyama-castle-2"],
      "origin": "editorial"
    },
    "spots.hachioji-takiyama-castle.detail.information.2.value": {
      "sourceIds": ["hachioji-takiyama-castle-1","hachioji-takiyama-castle-2"],
      "origin": "editorial"
    },
    "spots.hachioji-takiyama-castle.detail.information.3.value": {
      "sourceIds": ["hachioji-takiyama-castle-1","hachioji-takiyama-castle-2"],
      "origin": "editorial"
    }
  }
};
