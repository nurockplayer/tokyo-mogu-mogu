import type { JourneyRecord } from '../journey-record';

export const b08InagiWaterFieldsRecord: JourneyRecord = {
  "municipalityId": "inagi",
  "journey": {
    "id": "b08-inagi-water-fields",
    "regionId": "inagi",
    "foodCultureId": "inagi-water-fields",
    "storyId": "b08-inagi-water-fields",
    "routeId": "b08-inagi-water-fields-route",
    "copy": {
      "ja": {"title":"大丸用水と稲城の畑","subtitle":"大丸用水と稲城の畑","description":"果樹園と水田を支える用水から、地場野菜の料理へ。","tags":["稲城市"],"storyTitle":"大丸用水と稲城の畑","intro":["果樹園と水田を支える用水から、地場野菜の料理へ。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Daimaru water and Inagi’s fields","subtitle":"Daimaru water and Inagi’s fields","description":"From irrigation for orchards and paddies to local vegetable cooking.","tags":["Inagi City"],"storyTitle":"Daimaru water and Inagi’s fields","intro":["From irrigation for orchards and paddies to local vegetable cooking.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"大丸用水與稻城田野","subtitle":"大丸用水與稻城田野","description":"從灌溉果園與稻田的水路，到當地蔬菜料理。","tags":["稻城市"],"storyTitle":"大丸用水與稻城田野","intro":["從灌溉果園與稻田的水路，到當地蔬菜料理。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"大丸用水と稲城の果樹・稲作文化","body":"大丸用水は多摩川から果樹園や水田へ水を届け、川崎市まで枝分かれする用水路。市は江戸時代初めの開削と考えられることや、親水空間としての整備も紹介しています。"},
        {"number":"02.","title":"稲城の地場野菜料理","body":"市の目録には、ORTOLANAの稲城野菜を使うナポリタンなど、地場野菜を料理につなぐ例が載っています。"}
      ],
      "en": [
        {"number":"01.","title":"Daimaru Irrigation Canal and Historic Orchard Farming","body":"Daimaru Yosui carries Tama River water to orchards and rice fields, branching toward Kawasaki. The city places its likely origins in the early Edo period and also describes waterside public spaces along it."},
        {"number":"02.","title":"Inagi Local-Vegetable Cuisine","body":"The city catalogue connects local vegetables with cooking, including ORTOLANA’s Napolitan pasta using Inagi vegetables."}
      ],
      "zh-TW": [
        {"number":"01.","title":"大丸用水與農業","body":"大丸用水將多摩川水引至果園與稻田，分支延伸至川崎。市府認為開鑿時間約為江戶初期，也介紹沿線親水空間的整備。"},
        {"number":"02.","title":"稻城蔬菜料理","body":"市府目錄記載當地蔬菜與料理的連結，例如ORTOLANA使用稻城蔬菜製作的拿坡里義大利麵。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b08-inagi-water-fields-daimaru"},
          {"spotId":"b08-inagi-water-fields-ortolana"}
        ]
      }
    ]
  },
  "routeName": {"ja":"大丸用水と稲城の畑","en":"Daimaru water and Inagi’s fields","zh-TW":"大丸用水與稻城田野"},
  "location": {
    "ja": {"area":"稲城市","station":"","access":""},
    "en": {"area":"Inagi City","station":"","access":""},
    "zh-TW": {"area":"稻城市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b08-inagi-water-fields-daimaru",
          "description": {"ja":"市は果樹園や水田を潤し、親水空間もある用水として紹介しています。","en":"The city describes irrigation for orchards and paddies, with waterside public spaces.","zh-TW":"市府介紹此水路灌溉果園與稻田，並設有親水空間。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        },
        {
          "spotId": "b08-inagi-water-fields-ortolana",
          "description": {"ja":"市の目録は稲城野菜のナポリタンを紹介しています。","en":"The city catalogue describes Napolitan pasta using Inagi vegetables here.","zh-TW":"市府目錄介紹此處使用稻城蔬菜的拿坡里義大利麵。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        }
      ],
      "stats": {
        "ja": {"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。"},
        "en": {"time":"About 120 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"120","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops."},
        "zh-TW": {"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b08-inagi-water-fields-daimaru": {
      "presentation": {
        "id": "b08-inagi-water-fields-daimaru",
        "regionId": "inagi",
        "foodCultureId": "inagi-water-fields",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "大丸用水",
            "lead": "市は果樹園や水田を潤し、親水空間もある用水として紹介しています。",
            "description": "市は果樹園や水田を潤し、親水空間もある用水として紹介しています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Daimaru Irrigation Canal",
            "lead": "The city describes irrigation for orchards and paddies, with waterside public spaces.",
            "description": "The city describes irrigation for orchards and paddies, with waterside public spaces.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "大丸用水",
            "lead": "市府介紹此水路灌溉果園與稻田，並設有親水空間。",
            "description": "市府介紹此水路灌溉果園與稻田，並設有親水空間。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認狀態","value":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
            ],
            "caution": [
              "刊載內容尚未確認。造訪前請查看出處資訊。"
            ]
          }
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は果樹園や水田を潤し、親水空間もある用水として紹介しています。","en":"The city describes irrigation for orchards and paddies, with waterside public spaces.","zh-TW":"市府介紹此水路灌溉果園與稻田，並設有親水空間。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.inagi.tokyo.jp/sangyo/nougyou/1005414.html","en":"https://www.city.inagi.tokyo.jp/sangyo/nougyou/1005414.html","zh-TW":"https://www.city.inagi.tokyo.jp/sangyo/nougyou/1005414.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"大丸用水","url":"https://www.city.inagi.tokyo.jp/sangyo/nougyou/1005414.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b08-inagi-water-fields-ortolana": {
      "presentation": {
        "id": "b08-inagi-water-fields-ortolana",
        "regionId": "inagi",
        "foodCultureId": "inagi-water-fields",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "ORTOLANA",
            "lead": "市の目録は稲城野菜のナポリタンを紹介しています。",
            "description": "市の目録は稲城野菜のナポリタンを紹介しています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "ORTOLANA",
            "lead": "The city catalogue describes Napolitan pasta using Inagi vegetables here.",
            "description": "The city catalogue describes Napolitan pasta using Inagi vegetables here.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "ORTOLANA",
            "lead": "市府目錄介紹此處使用稻城蔬菜的拿坡里義大利麵。",
            "description": "市府目錄介紹此處使用稻城蔬菜的拿坡里義大利麵。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認狀態","value":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
            ],
            "caution": [
              "刊載內容尚未確認。造訪前請查看出處資訊。"
            ]
          }
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市の目録は稲城野菜のナポリタンを紹介しています。","en":"The city catalogue describes Napolitan pasta using Inagi vegetables here.","zh-TW":"市府目錄介紹此處使用稻城蔬菜的拿坡里義大利麵。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-f.pdf","en":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-f.pdf","zh-TW":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-f.pdf"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"令和7年度 稲城の太鼓判 認証商品一覧（表）","url":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-f.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-inagi-water-fields-daimaru",
          "spotId": "b08-inagi-water-fields-daimaru",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"大丸用水","en":"Daimaru Irrigation Canal","zh-TW":"大丸用水"},
          "description": {"ja":"市は果樹園や水田を潤し、親水空間もある用水として紹介しています。","en":"The city describes irrigation for orchards and paddies, with waterside public spaces.","zh-TW":"市府介紹此水路灌溉果園與稻田，並設有親水空間。"}
        },
        {
          "referenceId": "b08-inagi-water-fields-ortolana",
          "spotId": "b08-inagi-water-fields-ortolana",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"ORTOLANA","en":"ORTOLANA","zh-TW":"ORTOLANA"},
          "description": {"ja":"市の目録は稲城野菜のナポリタンを紹介しています。","en":"The city catalogue describes Napolitan pasta using Inagi vegetables here.","zh-TW":"市府目錄介紹此處使用稻城蔬菜的拿坡里義大利麵。"}
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {"region":"稲城市","station":""},
      "en": {"region":"Inagi City","station":""},
      "zh-TW": {"region":"稻城市","station":""}
    }
  },
  "sources": {
    "source-18": {"name":"大丸用水","url":"https://www.city.inagi.tokyo.jp/sangyo/nougyou/1005414.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-22": {"name":"令和7年度 稲城の太鼓判 認証商品一覧（表）","url":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-f.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://www.city.inagi.tokyo.jp/sangyo/nougyou/1005414.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-18","source-22"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-18","source-22"],"origin":"editorial"},
    "location": {"sourceIds":["source-18","source-22"],"origin":"editorial"},
    "story": {"sourceIds":["source-18","source-22"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-18","source-22"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-18","source-22"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-22"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-22"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-22"],"origin":"editorial"},
    "spots.b08-inagi-water-fields-daimaru": {"sourceIds":["source-18"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-18"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-18"],"origin":"editorial"},
    "spots.b08-inagi-water-fields-ortolana": {"sourceIds":["source-22"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-22"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-22"],"origin":"editorial"}
  }
};
