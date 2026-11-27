import type { JourneyRecord } from '../journey-record';

export const b07MusashimurayamaFarmTableRecord: JourneyRecord = {
  "municipalityId": "musashimurayama",
  "alcoholThemed": false,
  "journey": {
    "id": "b07-musashimurayama-farm-table",
    "regionId": "musashimurayama",
    "foodCultureId": "musashimurayama-farm-table",
    "storyId": "b07-musashimurayama-farm-table",
    "routeId": "b07-musashimurayama-farm-table-route",
    "copy": {
      "ja": {"title":"武蔵村山、牛乳と野菜の食卓","subtitle":"武蔵村山、牛乳と野菜の食卓","description":"牛乳のアイス、地粉のシフォン、地元野菜のバインミーを知る。","tags":["武蔵村山市"],"storyTitle":"武蔵村山、牛乳と野菜の食卓","intro":["牛乳のアイス、地粉のシフォン、地元野菜のバインミーを知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Musashimurayama milk and vegetable foods",
        "subtitle": "Musashimurayama milk and vegetable foods",
        "description": "Explore milk ice cream, local-flour chiffon cake and vegetable banh mi.",
        "tags": ["Musashimurayama"],
        "storyTitle": "Musashimurayama milk and vegetable foods",
        "intro": ["Explore milk ice cream, local-flour chiffon cake and vegetable banh mi.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"武藏村山牛奶與蔬菜餐桌","subtitle":"武藏村山牛奶與蔬菜餐桌","description":"認識牛奶冰淇淋、在地麵粉戚風與蔬菜越式三明治。","tags":["武藏村山市"],"storyTitle":"武藏村山牛奶與蔬菜餐桌","intro":["認識牛奶冰淇淋、在地麵粉戚風與蔬菜越式三明治。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"アイス工房ヴェルデの自家製アイスクリーム","body":"アイス工房ヴェルデは、自家牧場の牛乳と地元の果物などを使うアイスクリームの作り手として市に紹介されています。"},
        {"number":"02.","title":"むさし村山四季彩シフォン","body":"むさし村山四季彩シフォンは、市内産小麦粉、豆乳、おからを使い、茶、みかん、ゆず、小松菜などを取り入れる菓子として紹介されています。"},
        {"number":"03.","title":"むさむら野菜のバインミー","body":"ohanaのむさむら野菜のバインミーは、糀酵母とじゃがいもを使う自家製パンに武蔵村山産の野菜や果物を合わせるサンドイッチとして紹介されています。"}
      ],
      "en": [
        {"number":"01.","title":"Verde Farmhouse Ice Cream","body":"The city presents Ice Kobo Verde as making ice cream with milk from its own farm and ingredients such as local fruit."},
        {"number":"02.","title":"Musashi Murayama Seasonal Chiffon Cake","body":"The city describes Musashi Murayama seasonal chiffon cake as using local wheat flour, soy milk and okara, with ingredients such as tea, mandarins, yuzu and komatsuna."},
        {"number":"03.","title":"Musamura Vegetable Banh Mi","body":"The city describes Ohana’s Musamura vegetable banh mi as combining local vegetables and fruit with house-made bread using koji yeast and potato."}
      ],
      "zh-TW": [
        {"number":"01.","title":"牛奶冰淇淋","body":"市府介紹 Verde 冰淇淋工房，使用自家牧場牛奶及在地水果等原料製作冰淇淋。"},
        {"number":"02.","title":"四季彩戚風蛋糕","body":"市府介紹武藏村山四季彩戚風蛋糕，使用在地麵粉、豆漿與豆渣，並搭配茶、蜜柑、柚子、小松菜等原料。"},
        {"number":"03.","title":"蔬菜越式三明治","body":"市府介紹 Ohana 的武藏村山蔬菜越式三明治，將在地蔬果搭配使用麴酵母與馬鈴薯的自製麵包。"}
      ]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":120,"steps":[{"spotId":"b07-musashimurayama-farm-table-verde"},{"spotId":"b07-musashimurayama-farm-table-anne"},{"spotId":"b07-musashimurayama-farm-table-ohana"}]}]
  },
  "routeName": {"ja":"武蔵村山、牛乳と野菜の食卓","en":"Musashimurayama milk and vegetable foods","zh-TW":"武藏村山牛奶與蔬菜餐桌"},
  "location": {"ja":{"area":"武蔵村山市","station":"","access":""},"en":{"area":"Musashimurayama","station":"","access":""},"zh-TW":{"area":"武藏村山市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "東京西街道", "en": "Tokyo Nishi-kaido bus stop", "zh-TW": "東京西街道公車站"}, "spotId": "b07-musashimurayama-farm-table-ohana", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b07-musashimurayama-farm-table-verde",
          "description": {"ja":"市は、自家牧場の牛乳と地元の果物などを使うアイスの作り手として紹介しています。","en":"The city describes this maker’s ice cream using milk from its own farm and local fruit.","zh-TW":"市府介紹此店使用自家牧場牛奶與在地水果等製作冰淇淋。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-musashimurayama-farm-table-anne",
          "description": {"ja":"市は、市内産小麦粉を使うむさし村山四季彩シフォンの取扱先として掲載しています。","en":"The city lists this shop in connection with Musashi Murayama seasonal chiffon cake made with local flour.","zh-TW":"市府將此店列於使用市內麵粉的武藏村山四季彩戚風蛋糕相關名單。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-musashimurayama-farm-table-ohana",
          "description": {"ja":"市は、地元の野菜や果物を使うむさむら野菜のバインミーを紹介しています。","en":"The city lists this maker’s Musamura vegetable banh mi using local vegetables and fruit.","zh-TW":"市府介紹此店使用在地蔬果製作的武藏村山蔬菜越式三明治。"},
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
    "b07-musashimurayama-farm-table-verde": {
      "presentation": {
        "id": "b07-musashimurayama-farm-table-verde",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-farm-table",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "アイス工房ヴェルデ",
            "lead": "市は、自家牧場の牛乳と地元の果物などを使うアイスの作り手として紹介しています。",
            "description": "市は、自家牧場の牛乳と地元の果物などを使うアイスの作り手として紹介しています。",
            "tags": [],
            "practicalInfo": [{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],
            "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]
          },
          "en": {
            "name": "Ice Kobo Verde",
            "lead": "The city describes this maker’s ice cream using milk from its own farm and local fruit.",
            "description": "The city describes this maker’s ice cream using milk from its own farm and local fruit.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Verde 冰淇淋工房","lead":"市府介紹此店使用自家牧場牛奶與在地水果等製作冰淇淋。","description":"市府介紹此店使用自家牧場牛奶與在地水果等製作冰淇淋。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は、自家牧場の牛乳と地元の果物などを使うアイスの作り手として紹介しています。","en":"The city describes this maker’s ice cream using milk from its own farm and local fruit.","zh-TW":"市府介紹此店使用自家牧場牛奶與在地水果等製作冰淇淋。"},
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
    "b07-musashimurayama-farm-table-anne": {
      "presentation": {
        "id": "b07-musashimurayama-farm-table-anne",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-farm-table",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "SHOP ANNE",
            "lead": "市は、市内産小麦粉を使うむさし村山四季彩シフォンの取扱先として掲載しています。",
            "description": "市は、市内産小麦粉を使うむさし村山四季彩シフォンの取扱先として掲載しています。",
            "tags": [],
            "practicalInfo": [{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],
            "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]
          },
          "en": {
            "name": "SHOP ANNE",
            "lead": "The city lists this shop in connection with Musashi Murayama seasonal chiffon cake made with local flour.",
            "description": "The city lists this shop in connection with Musashi Murayama seasonal chiffon cake made with local flour.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"SHOP ANNE","lead":"市府將此店列於使用市內麵粉的武藏村山四季彩戚風蛋糕相關名單。","description":"市府將此店列於使用市內麵粉的武藏村山四季彩戚風蛋糕相關名單。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は、市内産小麦粉を使うむさし村山四季彩シフォンの取扱先として掲載しています。","en":"The city lists this shop in connection with Musashi Murayama seasonal chiffon cake made with local flour.","zh-TW":"市府將此店列於使用市內麵粉的武藏村山四季彩戚風蛋糕相關名單。"},
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
    "b07-musashimurayama-farm-table-ohana": {
      "presentation": {
        "id": "b07-musashimurayama-farm-table-ohana",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-farm-table",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"パンとおやつに糀 ohana","lead":"市は、地元の野菜や果物を使うむさむら野菜のバインミーを紹介しています。","description":"市は、地元の野菜や果物を使うむさむら野菜のバインミーを紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Pan to Oyatsu ni Koji Ohana",
            "lead": "The city lists this maker’s Musamura vegetable banh mi using local vegetables and fruit.",
            "description": "The city lists this maker’s Musamura vegetable banh mi using local vegetables and fruit.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"麴麵包與點心 Ohana","lead":"市府介紹此店使用在地蔬果製作的武藏村山蔬菜越式三明治。","description":"市府介紹此店使用在地蔬果製作的武藏村山蔬菜越式三明治。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は、地元の野菜や果物を使うむさむら野菜のバインミーを紹介しています。","en":"The city lists this maker’s Musamura vegetable banh mi using local vegetables and fruit.","zh-TW":"市府介紹此店使用在地蔬果製作的武藏村山蔬菜越式三明治。"},
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
          "referenceId": "b07-musashimurayama-farm-table-verde",
          "spotId": "b07-musashimurayama-farm-table-verde",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"アイス工房ヴェルデ","en":"Ice Kobo Verde","zh-TW":"Verde 冰淇淋工房"},
          "description": {"ja":"市は、自家牧場の牛乳と地元の果物などを使うアイスの作り手として紹介しています。","en":"The city describes this maker’s ice cream using milk from its own farm and local fruit.","zh-TW":"市府介紹此店使用自家牧場牛奶與在地水果等製作冰淇淋。"}
        },
        {
          "referenceId": "b07-musashimurayama-farm-table-anne",
          "spotId": "b07-musashimurayama-farm-table-anne",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"SHOP ANNE","en":"SHOP ANNE","zh-TW":"SHOP ANNE"},
          "description": {"ja":"市は、市内産小麦粉を使うむさし村山四季彩シフォンの取扱先として掲載しています。","en":"The city lists this shop in connection with Musashi Murayama seasonal chiffon cake made with local flour.","zh-TW":"市府將此店列於使用市內麵粉的武藏村山四季彩戚風蛋糕相關名單。"}
        },
        {
          "referenceId": "b07-musashimurayama-farm-table-ohana",
          "spotId": "b07-musashimurayama-farm-table-ohana",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"パンとおやつに糀 ohana","en":"Pan to Oyatsu ni Koji Ohana","zh-TW":"麴麵包與點心 Ohana"},
          "description": {"ja":"市は、地元の野菜や果物を使うむさむら野菜のバインミーを紹介しています。","en":"The city lists this maker’s Musamura vegetable banh mi using local vegetables and fruit.","zh-TW":"市府介紹此店使用在地蔬果製作的武藏村山蔬菜越式三明治。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"武蔵村山市","station":""},"en":{"region":"Musashimurayama","station":""},"zh-TW":{"region":"武藏村山市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Pankoji Ohana – bakery access", "url": "https://pankoji.com/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-10": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b07 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-10"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-10"],"origin":"editorial"},
    "location": {"sourceIds":["source-10"],"origin":"editorial"},
    "story": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-10"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-10"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.ja.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b07-musashimurayama-farm-table-verde": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b07-musashimurayama-farm-table-anne": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b07-musashimurayama-farm-table-ohana": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.2.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.2": {"sourceIds":["source-10"],"origin":"editorial"}
  }
};
