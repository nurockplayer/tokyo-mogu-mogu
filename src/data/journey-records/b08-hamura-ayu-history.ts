import type { JourneyRecord } from '../journey-record';

export const b08HamuraAyuHistoryRecord: JourneyRecord = {
  "municipalityId": "hamura",
  "alcoholThemed": false,
  "journey": {
    "id": "b08-hamura-ayu-history",
    "regionId": "hamura",
    "foodCultureId": "hamura-ayu-history",
    "storyId": "b08-hamura-ayu-history",
    "routeId": "b08-hamura-ayu-history-route",
    "copy": {
      "ja": {"title":"羽村堰と鮎の記憶","subtitle":"羽村堰と鮎の記憶","description":"川と堰から、鮎漁と川辺の食の歴史を読む。","tags":["羽村市"],"storyTitle":"羽村堰と鮎の記憶","intro":["川と堰から、鮎漁と川辺の食の歴史を読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Hamura Weir and ayu history","subtitle":"Hamura Weir and ayu history","description":"Read the history of ayu fishing and riverside food through the river and weir.","tags":["Hamura City"],"storyTitle":"Hamura Weir and ayu history","intro":["Read the history of ayu fishing and riverside food through the river and weir.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"羽村堰與香魚記憶","subtitle":"羽村堰與香魚記憶","description":"從河流與堰認識香魚漁業與河畔飲食歷史。","tags":["羽村市"],"storyTitle":"羽村堰與香魚記憶","intro":["從河流與堰認識香魚漁業與河畔飲食歷史。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"羽村の鮎漁・川魚食文化","body":"市の歴史資料は、江戸時代に堰下の鮎を将軍へ献上したこと、農業と兼業する漁師や網・竿・筌による漁を記録。かつて鮎を名物とする宿や料亭があり、水質悪化による減少とその後の回復も記しています。現在の飲食店案内ではありません。"}
      ],
      "en": [
        {"number":"01.","title":"Hamura Ayu Fishing and Historic River-Fish Cuisine","body":"City historical research records Edo-period gifts of ayu from below the weir to the shogun, farmer-fishers and fishing with nets, rods and baskets. It recalls ayu inns and restaurants, environmental decline and the fish’s later return. This is historical context."}
      ],
      "zh-TW": [
        {"number":"01.","title":"香魚漁業歷史","body":"市府歷史資料記錄江戶時代將堰下香魚獻給將軍、兼業漁民及網、竿、魚筌等捕魚方式，也記載昔日香魚旅館與料亭、水質惡化造成的衰退及其後復育，此處為歷史介紹。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b08-hamura-ayu-history-weir"},
          {"spotId":"b08-hamura-ayu-history-museum"}
        ]
      }
    ]
  },
  "routeName": {"ja":"羽村堰と鮎の記憶","en":"Hamura Weir and ayu history","zh-TW":"羽村堰與香魚記憶"},
  "location": {
    "ja": {"area":"羽村市","station":"","access":""},
    "en": {"area":"Hamura City","station":"","access":""},
    "zh-TW": {"area":"羽村市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "羽村駅", "en": "Hamura Station", "zh-TW": "羽村站"}, "spotId": "b08-hamura-ayu-history-weir", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b08-hamura-ayu-history-weir",
          "description": {"ja":"市の歴史資料が鮎漁の舞台として記録する堰です。","en":"City historical research records ayu fishing below this weir.","zh-TW":"市府歷史資料記錄此堰下方的香魚漁業。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        },
        {
          "spotId": "b08-hamura-ayu-history-museum",
          "description": {"ja":"市は常設展示を「多摩川とともに」とし、川と羽村の歴史を紹介しています。","en":"The city describes its permanent exhibition as exploring Hamura’s history with the Tama River.","zh-TW":"市府介紹常設展以「與多摩川共存」為題，呈現河川與羽村歷史。"},
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
    "b08-hamura-ayu-history-weir": {
      "presentation": {
        "id": "b08-hamura-ayu-history-weir",
        "regionId": "hamura",
        "foodCultureId": "hamura-ayu-history",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "羽村取水堰",
            "lead": "市の歴史資料が鮎漁の舞台として記録する堰です。",
            "description": "市の歴史資料が鮎漁の舞台として記録する堰です。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Hamura Intake Weir",
            "lead": "City historical research records ayu fishing below this weir.",
            "description": "City historical research records ayu fishing below this weir.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "羽村取水堰",
            "lead": "市府歷史資料記錄此堰下方的香魚漁業。",
            "description": "市府歷史資料記錄此堰下方的香魚漁業。",
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
        "description": {"ja":"市の歴史資料が鮎漁の舞台として記録する堰です。","en":"City historical research records ayu fishing below this weir.","zh-TW":"市府歷史資料記錄此堰下方的香魚漁業。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.hamura.tokyo.jp/cmsfiles/contents/0000016/16562/hennsanndayori30-2.pdf","en":"https://www.city.hamura.tokyo.jp/cmsfiles/contents/0000016/16562/hennsanndayori30-2.pdf","zh-TW":"https://www.city.hamura.tokyo.jp/cmsfiles/contents/0000016/16562/hennsanndayori30-2.pdf"}
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
      "officialSource": {"name":"羽村市史編さんだより 第30号「堰下での鮎釣り」","url":"https://www.city.hamura.tokyo.jp/cmsfiles/contents/0000016/16562/hennsanndayori30-2.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b08-hamura-ayu-history-museum": {
      "presentation": {
        "id": "b08-hamura-ayu-history-museum",
        "regionId": "hamura",
        "foodCultureId": "hamura-ayu-history",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "羽村市郷土博物館",
            "lead": "市は常設展示を「多摩川とともに」とし、川と羽村の歴史を紹介しています。",
            "description": "市は常設展示を「多摩川とともに」とし、川と羽村の歴史を紹介しています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Hamura Local History Museum",
            "lead": "The city describes its permanent exhibition as exploring Hamura’s history with the Tama River.",
            "description": "The city describes its permanent exhibition as exploring Hamura’s history with the Tama River.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "羽村市鄉土博物館",
            "lead": "市府介紹常設展以「與多摩川共存」為題，呈現河川與羽村歷史。",
            "description": "市府介紹常設展以「與多摩川共存」為題，呈現河川與羽村歷史。",
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
        "description": {"ja":"市は常設展示を「多摩川とともに」とし、川と羽村の歴史を紹介しています。","en":"The city describes its permanent exhibition as exploring Hamura’s history with the Tama River.","zh-TW":"市府介紹常設展以「與多摩川共存」為題，呈現河川與羽村歷史。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.hamura.tokyo.jp/0000001520.html","en":"https://www.city.hamura.tokyo.jp/0000001520.html","zh-TW":"https://www.city.hamura.tokyo.jp/0000001520.html"}
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
      "officialSource": {"name":"Official source information","url":"https://www.city.hamura.tokyo.jp/0000001520.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-hamura-ayu-history-weir",
          "spotId": "b08-hamura-ayu-history-weir",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"羽村取水堰","en":"Hamura Intake Weir","zh-TW":"羽村取水堰"},
          "description": {"ja":"市の歴史資料が鮎漁の舞台として記録する堰です。","en":"City historical research records ayu fishing below this weir.","zh-TW":"市府歷史資料記錄此堰下方的香魚漁業。"}
        },
        {
          "referenceId": "b08-hamura-ayu-history-museum",
          "spotId": "b08-hamura-ayu-history-museum",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"羽村市郷土博物館","en":"Hamura Local History Museum","zh-TW":"羽村市鄉土博物館"},
          "description": {"ja":"市は常設展示を「多摩川とともに」とし、川と羽村の歴史を紹介しています。","en":"The city describes its permanent exhibition as exploring Hamura’s history with the Tama River.","zh-TW":"市府介紹常設展以「與多摩川共存」為題，呈現河川與羽村歷史。"}
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
    "admission-access": {"name": "GO TOKYO Hamura Weir access", "url": "https://www.gotokyo.org/jp/spot/798/index.html", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-38": {"name":"羽村市史編さんだより 第30号「堰下での鮎釣り」","url":"https://www.city.hamura.tokyo.jp/cmsfiles/contents/0000016/16562/hennsanndayori30-2.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-39": {"name":"Official source information","url":"https://www.city.hamura.tokyo.jp/0000001520.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://www.city.hamura.tokyo.jp/cmsfiles/contents/0000016/16562/hennsanndayori30-2.pdf","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-38","source-39"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-38","source-39"],"origin":"editorial"},
    "location": {"sourceIds":["source-38","source-39"],"origin":"editorial"},
    "story": {"sourceIds":["source-38","source-39"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-38","source-39"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-38","source-39"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-38"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-38"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-38"],"origin":"editorial"},
    "spots.b08-hamura-ayu-history-weir": {"sourceIds":["source-38"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-38"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-38"],"origin":"editorial"},
    "spots.b08-hamura-ayu-history-museum": {"sourceIds":["source-39"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-39"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-39"],"origin":"editorial"}
  }
};
