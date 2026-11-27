import type { JourneyRecord } from '../journey-record';

export const b08HamuraFarmTableRecord: JourneyRecord = {
  "municipalityId": "hamura",
  "alcoholThemed": false,
  "journey": {
    "id": "b08-hamura-farm-table",
    "regionId": "hamura",
    "foodCultureId": "hamura-farm-table",
    "storyId": "b08-hamura-farm-table",
    "routeId": "b08-hamura-farm-table-route",
    "copy": {
      "ja": {"title":"羽村の農家と直売所","subtitle":"羽村の農家と直売所","description":"生産者の名前から地場野菜をたどる。","tags":["羽村市"],"storyTitle":"羽村の農家と直売所","intro":["生産者の名前から地場野菜をたどる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Hamura farmers and their market","subtitle":"Hamura farmers and their market","description":"Explore local vegetables through the names of their growers.","tags":["Hamura City"],"storyTitle":"Hamura farmers and their market","intro":["Explore local vegetables through the names of their growers.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"羽村農家與直賣所","subtitle":"羽村農家與直賣所","description":"從生產者姓名認識當地蔬菜。","tags":["羽村市"],"storyTitle":"羽村農家與直賣所","intro":["從生產者姓名認識當地蔬菜。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"羽村市の地場野菜直売文化","body":"市は農産物直売所を市内農家の野菜を扱う場所として紹介。生産者名の表示や、クッキー・ウコンなどの加工品にも触れています。"}
      ],
      "en": [
        {"number":"01.","title":"Hamura Farm-Direct Vegetable Culture","body":"The city describes its farm-direct market as an outlet for local farmers’ vegetables, with grower names on products and processed foods including cookies and turmeric products."}
      ],
      "zh-TW": [
        {"number":"01.","title":"羽村農產直賣","body":"市府介紹農產直賣所販售市內農家蔬菜，商品標示生產者姓名，也列有餅乾、薑黃等加工品。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b08-hamura-farm-table-market"}
        ]
      }
    ]
  },
  "routeName": {"ja":"羽村の農家と直売所","en":"Hamura farmers and their market","zh-TW":"羽村農家與直賣所"},
  "location": {
    "ja": {"area":"羽村市","station":"","access":""},
    "en": {"area":"Hamura City","station":"","access":""},
    "zh-TW": {"area":"羽村市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "羽村駅", "en": "Hamura Station", "zh-TW": "羽村站"}, "spotId": "b08-hamura-farm-table-market", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b08-hamura-farm-table-market",
          "description": {"ja":"市は地元農家の野菜と生産者名の表示を紹介しています。","en":"The city describes local vegetables labelled with their growers’ names.","zh-TW":"市府介紹當地蔬菜與商品上的生產者姓名標示。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        }
      ],
      "stats": {
        "ja": {"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。"},
        "en": {"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stop","station":"","minutes":"90","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops."},
        "zh-TW": {"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b08-hamura-farm-table-market": {
      "presentation": {
        "id": "b08-hamura-farm-table-market",
        "regionId": "hamura",
        "foodCultureId": "hamura-farm-table",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "羽村市農産物直売所",
            "lead": "市は地元農家の野菜と生産者名の表示を紹介しています。",
            "description": "市は地元農家の野菜と生産者名の表示を紹介しています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Hamura Farm-Direct Market",
            "lead": "The city describes local vegetables labelled with their growers’ names.",
            "description": "The city describes local vegetables labelled with their growers’ names.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "羽村市農產直賣所",
            "lead": "市府介紹當地蔬菜與商品上的生產者姓名標示。",
            "description": "市府介紹當地蔬菜與商品上的生產者姓名標示。",
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
        "description": {"ja":"市は地元農家の野菜と生産者名の表示を紹介しています。","en":"The city describes local vegetables labelled with their growers’ names.","zh-TW":"市府介紹當地蔬菜與商品上的生產者姓名標示。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.hamura.tokyo.jp/0000001912.html","en":"https://www.city.hamura.tokyo.jp/0000001912.html","zh-TW":"https://www.city.hamura.tokyo.jp/0000001912.html"}
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
      "officialSource": {"name":"羽村市農産物直売所","url":"https://www.city.hamura.tokyo.jp/0000001912.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-hamura-farm-table-market",
          "spotId": "b08-hamura-farm-table-market",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"羽村市農産物直売所","en":"Hamura Farm-Direct Market","zh-TW":"羽村市農產直賣所"},
          "description": {"ja":"市は地元農家の野菜と生産者名の表示を紹介しています。","en":"The city describes local vegetables labelled with their growers’ names.","zh-TW":"市府介紹當地蔬菜與商品上的生產者姓名標示。"}
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {"region":"羽村市","station":""},
      "en": {"region":"Hamura City","station":""},
      "zh-TW": {"region":"羽村市","station":""}
    }
  },
  "sources": {
    "admission-access": {"name": "Hamura City – agricultural market", "url": "https://www.city.hamura.tokyo.jp/0000001912.html", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-40": {"name":"羽村市農産物直売所","url":"https://www.city.hamura.tokyo.jp/0000001912.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://www.city.hamura.tokyo.jp/0000001912.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-40"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-40"],"origin":"editorial"},
    "location": {"sourceIds":["source-40"],"origin":"editorial"},
    "story": {"sourceIds":["source-40"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-40"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-40"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-40"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-40"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-40"],"origin":"editorial"},
    "spots.b08-hamura-farm-table-market": {"sourceIds":["source-40"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-40"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-40"],"origin":"editorial"}
  }
};
