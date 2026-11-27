import type { JourneyRecord } from '../journey-record';

export const b07MusashimurayamaWheatKateUdonRecord: JourneyRecord = {
  "municipalityId": "musashimurayama",
  "alcoholThemed": false,
  "journey": {
    "id": "b07-musashimurayama-wheat-kate-udon",
    "regionId": "musashimurayama",
    "foodCultureId": "musashimurayama-wheat-kate-udon",
    "storyId": "b07-musashimurayama-wheat-kate-udon",
    "routeId": "b07-musashimurayama-wheat-kate-udon-route",
    "copy": {
      "ja": {"title":"武蔵村山、地粉とうどんの食文化","subtitle":"武蔵村山、地粉とうどんの食文化","description":"かてうどん、ゆでまんじゅう、ロール菓子に続く地粉のつながり。","tags":["武蔵村山市"],"storyTitle":"武蔵村山、地粉とうどんの食文化","intro":["かてうどん、ゆでまんじゅう、ロール菓子に続く地粉のつながり。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Musashimurayama wheat and kate udon",
        "subtitle": "Musashimurayama wheat and kate udon",
        "description": "Follow local flour through kate udon, boiled manju and roll cake.",
        "tags": ["Musashimurayama"],
        "storyTitle": "Musashimurayama wheat and kate udon",
        "intro": ["Follow local flour through kate udon, boiled manju and roll cake.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"武藏村山地粉與糧烏龍麵","subtitle":"武藏村山地粉與糧烏龍麵","description":"從糧烏龍麵、水煮饅頭到蛋糕捲，認識地方麵粉的連結。","tags":["武藏村山市"],"storyTitle":"武藏村山地粉與糧烏龍麵","intro":["從糧烏龍麵、水煮饅頭到蛋糕捲，認識地方麵粉的連結。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"村山かてうどん","body":"市は、村山かてうどんを冠婚葬祭などで食べ継がれてきた代表的な食文化として紹介。冷水で締めた地粉麺を温かいつゆと野菜の添え物で食べると説明しています。"},
        {"number":"02.","title":"村山ゆでまんじゅう","body":"市は、うどん粉で作ってゆでる村山ゆでまんじゅうを地域の食として紹介し、田舎屋の手作り品を掲載しています。"},
        {"number":"03.","title":"むらやまロール","body":"シャトー洋菓子店のむらやまロールは、武蔵村山産うどん粉をスポンジ生地に加える菓子として紹介されています。"}
      ],
      "en": [
        {"number":"01.","title":"Murayama Kate Udon","body":"The city presents Murayama kate udon as a food tradition at family ceremonies, describing chilled local-flour noodles with warm dipping broth and vegetable accompaniments."},
        {"number":"02.","title":"Murayama Boiled Manju","body":"The city describes Murayama boiled manju as a local food made with udon flour and lists Inakaya’s handmade version."},
        {"number":"03.","title":"Murayama Roll Cake","body":"The city describes Chateau’s Murayama roll cake as using Musashimurayama udon flour in its sponge."}
      ],
      "zh-TW": [{"number":"01.","title":"村山糧烏龍麵","body":"市府將村山糧烏龍麵介紹為家庭儀式中傳承的飲食，並說明以冷水收緊的地粉麵配溫熱沾汁及蔬菜配料食用。"},{"number":"02.","title":"村山水煮饅頭","body":"市府介紹以烏龍麵粉製作並水煮的村山饅頭，並列有田舍屋的手工作品。"},{"number":"03.","title":"村山蛋糕捲","body":"市府介紹 Chateau 洋菓子店的村山蛋糕捲，將武藏村山烏龍麵粉加入海綿蛋糕。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":120,"steps":[{"spotId":"b07-musashimurayama-wheat-kate-udon-mangetsu"},{"spotId":"b07-musashimurayama-wheat-kate-udon-inakaya"},{"spotId":"b07-musashimurayama-wheat-kate-udon-chateau"}]}]
  },
  "routeName": {"ja":"武蔵村山、地粉とうどんの食文化","en":"Musashimurayama wheat and kate udon","zh-TW":"武藏村山地粉與糧烏龍麵"},
  "location": {"ja":{"area":"武蔵村山市","station":"","access":""},"en":{"area":"Musashimurayama","station":"","access":""},"zh-TW":{"area":"武藏村山市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "三ツ木", "en": "Mitsugi bus stop", "zh-TW": "三木公車站"}, "spotId": "b07-musashimurayama-wheat-kate-udon-mangetsu", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b07-musashimurayama-wheat-kate-udon-mangetsu",
          "description": {"ja":"市は、村山かてうどんを伝える村山うどんの会の会員店として掲載しています。","en":"The city lists this restaurant as a member of the Murayama Udon Association.","zh-TW":"市府將此餐廳列為傳承村山糧烏龍麵的村山烏龍麵協會會員店。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-musashimurayama-wheat-kate-udon-inakaya",
          "description": {"ja":"市のブランド紹介には、うどん粉で作る手作り村山ゆでまんじゅうが掲載されています。","en":"The city’s brand guide lists this maker’s handmade Murayama boiled manju made with udon flour.","zh-TW":"市府品牌指南列有此店以烏龍麵粉製作的手工村山水煮饅頭。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-musashimurayama-wheat-kate-udon-chateau",
          "description": {"ja":"市は、武蔵村山産うどん粉入りのむらやまロールの作り手として紹介しています。","en":"The city identifies this shop as the maker of Murayama Roll with local udon flour.","zh-TW":"市府將此店介紹為加入在地烏龍麵粉的村山蛋糕捲製作者。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約120分（編集目安）","distance":"","spots":"3 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。"},
        "en": {
          "time": "About 120 min (editorial estimate)",
          "distance": "",
          "spots": "3 stops",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story."
        },
        "zh-TW": {"time":"約 120 分鐘（編輯估計）","distance":"","spots":"3 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b07-musashimurayama-wheat-kate-udon-mangetsu": {
      "presentation": {
        "id": "b07-musashimurayama-wheat-kate-udon-mangetsu",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-wheat-kate-udon",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"村山満月うどん","lead":"市は、村山かてうどんを伝える村山うどんの会の会員店として掲載しています。","description":"市は、村山かてうどんを伝える村山うどんの会の会員店として掲載しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Murayama Mangetsu Udon",
            "lead": "The city lists this restaurant as a member of the Murayama Udon Association.",
            "description": "The city lists this restaurant as a member of the Murayama Udon Association.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"村山滿月烏龍麵","lead":"市府將此餐廳列為傳承村山糧烏龍麵的村山烏龍麵協會會員店。","description":"市府將此餐廳列為傳承村山糧烏龍麵的村山烏龍麵協會會員店。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は、村山かてうどんを伝える村山うどんの会の会員店として掲載しています。","en":"The city lists this restaurant as a member of the Murayama Udon Association.","zh-TW":"市府將此餐廳列為傳承村山糧烏龍麵的村山烏龍麵協會會員店。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","en":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","zh-TW":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b07-musashimurayama-wheat-kate-udon-inakaya": {
      "presentation": {
        "id": "b07-musashimurayama-wheat-kate-udon-inakaya",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-wheat-kate-udon",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"田舎屋","lead":"市のブランド紹介には、うどん粉で作る手作り村山ゆでまんじゅうが掲載されています。","description":"市のブランド紹介には、うどん粉で作る手作り村山ゆでまんじゅうが掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Inakaya",
            "lead": "The city’s brand guide lists this maker’s handmade Murayama boiled manju made with udon flour.",
            "description": "The city’s brand guide lists this maker’s handmade Murayama boiled manju made with udon flour.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"田舍屋","lead":"市府品牌指南列有此店以烏龍麵粉製作的手工村山水煮饅頭。","description":"市府品牌指南列有此店以烏龍麵粉製作的手工村山水煮饅頭。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市のブランド紹介には、うどん粉で作る手作り村山ゆでまんじゅうが掲載されています。","en":"The city’s brand guide lists this maker’s handmade Murayama boiled manju made with udon flour.","zh-TW":"市府品牌指南列有此店以烏龍麵粉製作的手工村山水煮饅頭。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","en":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","zh-TW":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b07-musashimurayama-wheat-kate-udon-chateau": {
      "presentation": {
        "id": "b07-musashimurayama-wheat-kate-udon-chateau",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-wheat-kate-udon",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"シャトー洋菓子店","lead":"市は、武蔵村山産うどん粉入りのむらやまロールの作り手として紹介しています。","description":"市は、武蔵村山産うどん粉入りのむらやまロールの作り手として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Chateau Confectionery",
            "lead": "The city identifies this shop as the maker of Murayama Roll with local udon flour.",
            "description": "The city identifies this shop as the maker of Murayama Roll with local udon flour.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Chateau 洋菓子店","lead":"市府將此店介紹為加入在地烏龍麵粉的村山蛋糕捲製作者。","description":"市府將此店介紹為加入在地烏龍麵粉的村山蛋糕捲製作者。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は、武蔵村山産うどん粉入りのむらやまロールの作り手として紹介しています。","en":"The city identifies this shop as the maker of Murayama Roll with local udon flour.","zh-TW":"市府將此店介紹為加入在地烏龍麵粉的村山蛋糕捲製作者。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","en":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","zh-TW":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b07-musashimurayama-wheat-kate-udon-mangetsu",
          "spotId": "b07-musashimurayama-wheat-kate-udon-mangetsu",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"村山満月うどん","en":"Murayama Mangetsu Udon","zh-TW":"村山滿月烏龍麵"},
          "description": {"ja":"市は、村山かてうどんを伝える村山うどんの会の会員店として掲載しています。","en":"The city lists this restaurant as a member of the Murayama Udon Association.","zh-TW":"市府將此餐廳列為傳承村山糧烏龍麵的村山烏龍麵協會會員店。"}
        },
        {
          "referenceId": "b07-musashimurayama-wheat-kate-udon-inakaya",
          "spotId": "b07-musashimurayama-wheat-kate-udon-inakaya",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"田舎屋","en":"Inakaya","zh-TW":"田舍屋"},
          "description": {"ja":"市のブランド紹介には、うどん粉で作る手作り村山ゆでまんじゅうが掲載されています。","en":"The city’s brand guide lists this maker’s handmade Murayama boiled manju made with udon flour.","zh-TW":"市府品牌指南列有此店以烏龍麵粉製作的手工村山水煮饅頭。"}
        },
        {
          "referenceId": "b07-musashimurayama-wheat-kate-udon-chateau",
          "spotId": "b07-musashimurayama-wheat-kate-udon-chateau",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"シャトー洋菓子店","en":"Chateau Confectionery","zh-TW":"Chateau 洋菓子店"},
          "description": {"ja":"市は、武蔵村山産うどん粉入りのむらやまロールの作り手として紹介しています。","en":"The city identifies this shop as the maker of Murayama Roll with local udon flour.","zh-TW":"市府將此店介紹為加入在地烏龍麵粉的村山蛋糕捲製作者。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"武蔵村山市","station":""},"en":{"region":"Musashimurayama","station":""},"zh-TW":{"region":"武藏村山市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Another Tokyo Tama – Musashino udon visitor guide", "url": "https://at-tama.tokyo/theme_files/digitalstamprally.pdf", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-10": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-12": {"name":"村山かてうどん｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1005152.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b07 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-10","source-12"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-10","source-12"],"origin":"editorial"},
    "location": {"sourceIds":["source-10","source-12"],"origin":"editorial"},
    "story": {"sourceIds":["source-10","source-12"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-10","source-12"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-10","source-12"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-12"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-12"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-12"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.ja.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b07-musashimurayama-wheat-kate-udon-mangetsu": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b07-musashimurayama-wheat-kate-udon-inakaya": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b07-musashimurayama-wheat-kate-udon-chateau": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.2.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.2": {"sourceIds":["source-10"],"origin":"editorial"}
  }
};
