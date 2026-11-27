import type { JourneyRecord } from '../journey-record';

export const b01MusashinoFarmFruitRecord: JourneyRecord = {
  "municipalityId": "musashino",
  "alcoholThemed": false,
  "journey": {
    "id": "b01-musashino-farm-fruit",
    "regionId": "musashino",
    "foodCultureId": "musashino-farm-fruit",
    "storyId": "b01-musashino-farm-fruit",
    "routeId": "b01-musashino-farm-fruit-route",
    "copy": {"ja":{"title":"武蔵野の畑と果実をたどる","subtitle":"武蔵野の畑と果実をたどる","description":"果樹園、直売所、ジャムがつなぐ都市の農。","tags":["武蔵野市"],"storyTitle":"武蔵野の畑と果実をたどる","intro":["果樹園、直売所、ジャムがつなぐ都市の農。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Musashino fields and fruit","subtitle":"Musashino fields and fruit","description":"Orchards, a farm market and jam connect the city’s agriculture.","tags":["Musashino"],"storyTitle":"Musashino fields and fruit","intro":["Orchards, a farm market and jam connect the city’s agriculture.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"走訪武藏野的田地與水果","subtitle":"走訪武藏野的田地與水果","description":"果園、直賣所與果醬連結都市農業。","tags":["武藏野市"],"storyTitle":"走訪武藏野的田地與水果","intro":["果園、直賣所與果醬連結都市農業。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"武蔵野市産ブルーベリー","body":"市は関前の生産者がブルーベリーと野菜を育てると紹介しています。"},{"number":"02.","title":"武蔵野市産梨・ブドウ・柿","body":"JAの果樹園案内は、武蔵野市の竹内果樹園の作物にブドウ、ナシ、柿を挙げています。"},{"number":"03.","title":"武蔵野市産キャベツ・ブロッコリー・コマツナ","body":"市の関前の生産者紹介にはキャベツ、ブロッコリー、小松菜、枝豆があり、給食への提供も記されています。市の直売所案内は新鮮館と麦わら帽子も紹介しています。"},{"number":"04.","title":"むさしのくだもののジャム","body":"Miジャムは市内の果実を加工する作り手として掲載されています。柑橘のマーマレード、柿と生姜、梅やすもものジャムが紹介されています。"},{"number":"05.","title":"おいしいムーちゃん餃子","body":"ムーちゃん餃子は、武蔵野市を含むJA東京むさし管内の農家が育てたキャベツを使う冷凍餃子として紹介されています。"}],"en":[{"number":"01.","title":"Musashino Blueberries","body":"The city introduces Sekimae growers of blueberries and vegetables."},{"number":"02.","title":"Musashino Pears, Grapes, and Persimmons","body":"JA’s orchard directory lists grapes, pears and persimmons at Takeuchi Orchard in Musashino."},{"number":"03.","title":"Musashino Urban-Farm Vegetables","body":"The city’s Sekimae grower profiles list cabbage, broccoli, komatsuna and edamame, including supply to school meals. Its market guide also names Shinsenkan and Mugiwara Boshi."},{"number":"04.","title":"Musashino Fruit Jam","body":"The catalogue presents Mi Jam as using city-grown fruit, including citrus marmalade, persimmon with ginger, and Japanese-apricot or plum jams."},{"number":"05.","title":"Oishii Mu-chan Gyoza","body":"Mu-chan Gyoza is described as frozen dumplings made with cabbage from farmers across JA Tokyo Musashi’s area, which includes Musashino."}],"zh-TW":[{"number":"01.","title":"武藏野產藍莓","body":"市府介紹關前種植藍莓與蔬菜的農家。"},{"number":"02.","title":"武藏野產梨、葡萄與柿子","body":"JA 果園介紹列出武藏野竹內果樹園的葡萄、梨與柿子。"},{"number":"03.","title":"武藏野產高麗菜、青花菜與小松菜","body":"市府關前農家介紹列有高麗菜、青花菜、小松菜與毛豆，也記述供應學校餐點；直賣所介紹並列出新鮮館與麥草帽。"},{"number":"04.","title":"武藏野水果果醬","body":"目錄介紹 Mi Jam 使用市內水果，包含柑橘瑪瑪醬、柿子薑、梅子與李子果醬。"},{"number":"05.","title":"Mu-chan 餃子","body":"Mu-chan 餃子被介紹為使用 JA 東京武藏管內農家高麗菜的冷凍餃子，管內包含武藏野等地。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 150,
        "steps": [
          {"spotId":"b01-musashino-farm-fruit-sekimae"},
          {"spotId":"b01-musashino-farm-fruit-takeuchi"},
          {"spotId":"b01-musashino-farm-fruit-shinsenkan-farm"}
        ]
      }
    ]
  },
  "routeName": {"ja":"武蔵野の畑と果実をたどる","en":"Musashino fields and fruit","zh-TW":"走訪武藏野的田地與水果"},
  "location": {"ja":{"area":"武蔵野市","station":"","access":""},"en":{"area":"Musashino","station":"","access":""},"zh-TW":{"area":"武藏野市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "三鷹駅北口", "en": "Mitaka Station North Exit", "zh-TW": "三鷹站北口"}, "spotId": "b01-musashino-farm-fruit-shinsenkan-farm", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b01-musashino-farm-fruit-sekimae",
          "description": {"ja":"市は関前2-1の直売所を、ブルーベリーと野菜を育てる生産者の場所として紹介しています。","en":"The city identifies the farm stand at Sekimae 2-1 with a grower of blueberries and vegetables.","zh-TW":"市府介紹關前 2-1 的直賣所為種植藍莓與蔬菜的農家地點。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-musashino-farm-fruit-takeuchi",
          "description": {"ja":"JAがブドウ、ナシ、柿の果樹園として紹介しています。","en":"JA lists this orchard with grapes, pears and persimmons.","zh-TW":"JA 介紹種植葡萄、梨與柿子的果園。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-musashino-farm-fruit-shinsenkan-farm",
          "description": {"ja":"市の直売所案内に、市内産農産物の販売先として載る施設です。","en":"The city’s market guide lists this facility in connection with city-grown produce.","zh-TW":"市府直賣所介紹列為市內農產銷售地點的設施。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約150分（編集目安）","distance":"","spots":"3 か所","station":"","minutes":"150","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 150 min (editorial estimate)","distance":"","spots":"3 stops","station":"","minutes":"150","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 150 分鐘（編輯估計）","distance":"","spots":"3 處","station":"","minutes":"150","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-musashino-farm-fruit-sekimae": {
      "presentation": {
        "id": "b01-musashino-farm-fruit-sekimae",
        "regionId": "musashino",
        "foodCultureId": "musashino-farm-fruit",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"関前2丁目の直売所","lead":"市は関前2-1の直売所を、ブルーベリーと野菜を育てる生産者の場所として紹介しています。","description":"市は関前2-1の直売所を、ブルーベリーと野菜を育てる生産者の場所として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Sekimae 2-chome farm stand","lead":"The city identifies the farm stand at Sekimae 2-1 with a grower of blueberries and vegetables.","description":"The city identifies the farm stand at Sekimae 2-1 with a grower of blueberries and vegetables.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"關前二丁目的直賣所","lead":"市府介紹關前 2-1 的直賣所為種植藍莓與蔬菜的農家地點。","description":"市府介紹關前 2-1 的直賣所為種植藍莓與蔬菜的農家地點。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は関前2-1の直売所を、ブルーベリーと野菜を育てる生産者の場所として紹介しています。","en":"The city identifies the farm stand at Sekimae 2-1 with a grower of blueberries and vegetables.","zh-TW":"市府介紹關前 2-1 的直賣所為種植藍莓與蔬菜的農家地點。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.musashino.lg.jp/kenko_fukushi/kenko_hoken/syokuiku/seisanshashokai/1030723.html","en":"https://www.city.musashino.lg.jp/kenko_fukushi/kenko_hoken/syokuiku/seisanshashokai/1030723.html","zh-TW":"https://www.city.musashino.lg.jp/kenko_fukushi/kenko_hoken/syokuiku/seisanshashokai/1030723.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"Musashino City — 関前2丁目の生産者紹介","url":"https://www.city.musashino.lg.jp/kenko_fukushi/kenko_hoken/syokuiku/seisanshashokai/1030723.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-musashino-farm-fruit-takeuchi": {
      "presentation": {
        "id": "b01-musashino-farm-fruit-takeuchi",
        "regionId": "musashino",
        "foodCultureId": "musashino-farm-fruit",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"竹内果樹園","lead":"JAがブドウ、ナシ、柿の果樹園として紹介しています。","description":"JAがブドウ、ナシ、柿の果樹園として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Takeuchi Orchard","lead":"JA lists this orchard with grapes, pears and persimmons.","description":"JA lists this orchard with grapes, pears and persimmons.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"竹內果樹園","lead":"JA 介紹種植葡萄、梨與柿子的果園。","description":"JA 介紹種植葡萄、梨與柿子的果園。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"JAがブドウ、ナシ、柿の果樹園として紹介しています。","en":"JA lists this orchard with grapes, pears and persimmons.","zh-TW":"JA 介紹種植葡萄、梨與柿子的果園。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.jatm.or.jp/farming/garden.php","en":"https://www.jatm.or.jp/farming/garden.php","zh-TW":"https://www.jatm.or.jp/farming/garden.php"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"JA Tokyo Musashi — 庭先直売所","url":"https://www.jatm.or.jp/farming/garden.php","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-musashino-farm-fruit-shinsenkan-farm": {
      "presentation": {
        "id": "b01-musashino-farm-fruit-shinsenkan-farm",
        "regionId": "musashino",
        "foodCultureId": "musashino-farm-fruit",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"JA東京むさし 武蔵野新鮮館","lead":"市の直売所案内に、市内産農産物の販売先として載る施設です。","description":"市の直売所案内に、市内産農産物の販売先として載る施設です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"JA Tokyo Musashi Musashino Shinsenkan","lead":"The city’s market guide lists this facility in connection with city-grown produce.","description":"The city’s market guide lists this facility in connection with city-grown produce.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"JA 東京武藏 武藏野新鮮館","lead":"市府直賣所介紹列為市內農產銷售地點的設施。","description":"市府直賣所介紹列為市內農產銷售地點的設施。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市の直売所案内に、市内産農産物の販売先として載る施設です。","en":"The city’s market guide lists this facility in connection with city-grown produce.","zh-TW":"市府直賣所介紹列為市內農產銷售地點的設施。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.musashino.lg.jp/kurashi_tetsuzuki/shigoto_sangyo/nosei/1034430.html","en":"https://www.city.musashino.lg.jp/kurashi_tetsuzuki/shigoto_sangyo/nosei/1034430.html","zh-TW":"https://www.city.musashino.lg.jp/kurashi_tetsuzuki/shigoto_sangyo/nosei/1034430.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"Musashino City — 武蔵野市農産物直売所マップ","url":"https://www.city.musashino.lg.jp/kurashi_tetsuzuki/shigoto_sangyo/nosei/1034430.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-musashino-farm-fruit-sekimae",
          "spotId": "b01-musashino-farm-fruit-sekimae",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"関前2丁目の直売所","en":"Sekimae 2-chome farm stand","zh-TW":"關前二丁目的直賣所"},
          "description": {"ja":"市は関前2-1の直売所を、ブルーベリーと野菜を育てる生産者の場所として紹介しています。","en":"The city identifies the farm stand at Sekimae 2-1 with a grower of blueberries and vegetables.","zh-TW":"市府介紹關前 2-1 的直賣所為種植藍莓與蔬菜的農家地點。"}
        },
        {
          "referenceId": "b01-musashino-farm-fruit-takeuchi",
          "spotId": "b01-musashino-farm-fruit-takeuchi",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"竹内果樹園","en":"Takeuchi Orchard","zh-TW":"竹內果樹園"},
          "description": {"ja":"JAがブドウ、ナシ、柿の果樹園として紹介しています。","en":"JA lists this orchard with grapes, pears and persimmons.","zh-TW":"JA 介紹種植葡萄、梨與柿子的果園。"}
        },
        {
          "referenceId": "b01-musashino-farm-fruit-shinsenkan-farm",
          "spotId": "b01-musashino-farm-fruit-shinsenkan-farm",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"JA東京むさし 武蔵野新鮮館","en":"JA Tokyo Musashi Musashino Shinsenkan","zh-TW":"JA 東京武藏 武藏野新鮮館"},
          "description": {"ja":"市の直売所案内に、市内産農産物の販売先として載る施設です。","en":"The city’s market guide lists this facility in connection with city-grown produce.","zh-TW":"市府直賣所介紹列為市內農產銷售地點的設施。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"武蔵野市","station":""},"en":{"region":"Musashino","station":""},"zh-TW":{"region":"武藏野市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "JA Tokyo Musashi – Musashino Shinsenkan", "url": "https://www.jatm.or.jp/economy/musashino.php", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-12": {"name":"Musashino Premium — 認定商品","url":"https://musashino-premium.com/standard/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-32": {"name":"Musashino City — 関前2丁目の生産者紹介","url":"https://www.city.musashino.lg.jp/kenko_fukushi/kenko_hoken/syokuiku/seisanshashokai/1030723.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-33": {"name":"Musashino City — 武蔵野市農産物直売所マップ","url":"https://www.city.musashino.lg.jp/kurashi_tetsuzuki/shigoto_sangyo/nosei/1034430.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-37": {"name":"JA Tokyo Musashi — 庭先直売所","url":"https://www.jatm.or.jp/farming/garden.php","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://musashino-premium.com/standard/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-12",
        "source-32",
        "source-33",
        "source-37"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-12",
        "source-32",
        "source-33",
        "source-37"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-12",
        "source-32",
        "source-33",
        "source-37"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-12",
        "source-32",
        "source-33",
        "source-37"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-32"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-32"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-32"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-32",
        "source-33"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-32",
        "source-33"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-32",
        "source-33"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.3": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.3": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.3": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.4": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.4": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.4": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": [
        "editorial"
      ],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": [
        "editorial",
        "source-32",
        "source-37",
        "source-33"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-32",
        "source-37",
        "source-33"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-farm-fruit-sekimae.detail.description": {
      "sourceIds": [
        "source-32"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-farm-fruit-sekimae.presentation": {
      "sourceIds": [
        "source-32"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-32"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-32"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-farm-fruit-takeuchi.detail.description": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-farm-fruit-takeuchi.presentation": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-farm-fruit-shinsenkan-farm.detail.description": {
      "sourceIds": [
        "source-33"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-farm-fruit-shinsenkan-farm.presentation": {
      "sourceIds": [
        "source-33"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.2": {
      "sourceIds": [
        "source-33"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.2.description": {
      "sourceIds": [
        "source-33"
      ],
      "origin": "editorial"
    }
  }
};
