import type { JourneyRecord } from '../journey-record';

export const b08TamaWheatUdonRecord: JourneyRecord = {
  "municipalityId": "tama",
  "journey": {
    "id": "b08-tama-wheat-udon",
    "regionId": "tama",
    "foodCultureId": "tama-wheat-udon",
    "storyId": "b08-tama-wheat-udon",
    "routeId": "b08-tama-wheat-udon-route",
    "copy": {
      "ja": {"title":"多摩の地粉とうどん","subtitle":"多摩の地粉とうどん","description":"ぽんぽこの麺から、焼きかりんとうへつながる地粉の物語。","tags":["多摩市"],"storyTitle":"多摩の地粉とうどん","intro":["ぽんぽこの麺から、焼きかりんとうへつながる地粉の物語。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Tama flour and udon","subtitle":"Tama flour and udon","description":"Follow local flour from Ponpoko noodles to baked karinto.","tags":["Tama City"],"storyTitle":"Tama flour and udon","intro":["Follow local flour from Ponpoko noodles to baked karinto.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"多摩本地麵粉與烏龍麵","subtitle":"多摩本地麵粉與烏龍麵","description":"從Ponpoko麵條到烤花林糖，認識本地麵粉的故事。","tags":["多摩市"],"storyTitle":"多摩本地麵粉與烏龍麵","intro":["從Ponpoko麵條到烤花林糖，認識本地麵粉的故事。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"多摩うどん「ぽんぽこ」","body":"ぽんぽこのメニューは生麺に多摩の地粉を10％配合し、その時の生産者を表示すると説明しています。"},
        {"number":"02.","title":"焼きかりんとう「多摩の散歩道」","body":"市は焼きかりんとう「多摩の散歩道」を、地粉入りのぽんぽこうどんの麺と原峰の味噌を使う菓子として紹介。唐辛子みそ味には市内産唐辛子を使うと説明しています。"}
      ],
      "en": [
        {"number":"01.","title":"Tama Udon Ponpoko","body":"Ponpoko’s menu describes fresh noodles blended with 10% local Tama flour and identifies the grower supplying that flour."},
        {"number":"02.","title":"Tama no Sanpomichi Baked Karinto","body":"The city describes Tama no Sanpomichi as baked karinto made from Ponpoko noodles containing local flour and Haramine miso. Its chili-miso version uses Tama-grown chili."}
      ],
      "zh-TW": [
        {"number":"01.","title":"Ponpoko烏龍麵","body":"Ponpoko菜單介紹生麵混合10%的多摩本地麵粉，並標示當時供應麵粉的生產者。"},
        {"number":"02.","title":"多摩散步道烤花林糖","body":"市府介紹「多摩散步道」烤花林糖使用含本地麵粉的Ponpoko烏龍麵與原峰味噌，辣椒味噌口味則使用市內辣椒。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b08-tama-wheat-udon-ponpoko"}
        ]
      }
    ]
  },
  "routeName": {"ja":"多摩の地粉とうどん","en":"Tama flour and udon","zh-TW":"多摩本地麵粉與烏龍麵"},
  "location": {
    "ja": {"area":"多摩市","station":"","access":""},
    "en": {"area":"Tama City","station":"","access":""},
    "zh-TW": {"area":"多摩市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b08-tama-wheat-udon-ponpoko",
          "description": {"ja":"メニューは多摩の地粉を配合した生麺を紹介しています。","en":"The menu describes fresh noodles blended with local Tama flour.","zh-TW":"菜單介紹混合多摩本地麵粉的生麵。"},
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
    "b08-tama-wheat-udon-ponpoko": {
      "presentation": {
        "id": "b08-tama-wheat-udon-ponpoko",
        "regionId": "tama",
        "foodCultureId": "tama-wheat-udon",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "多摩うどん ぽんぽこ",
            "lead": "メニューは多摩の地粉を配合した生麺を紹介しています。",
            "description": "メニューは多摩の地粉を配合した生麺を紹介しています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Tama Udon Ponpoko",
            "lead": "The menu describes fresh noodles blended with local Tama flour.",
            "description": "The menu describes fresh noodles blended with local Tama flour.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "多摩烏龍麵Ponpoko",
            "lead": "菜單介紹混合多摩本地麵粉的生麵。",
            "description": "菜單介紹混合多摩本地麵粉的生麵。",
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
        "description": {"ja":"メニューは多摩の地粉を配合した生麺を紹介しています。","en":"The menu describes fresh noodles blended with local Tama flour.","zh-TW":"菜單介紹混合多摩本地麵粉的生麵。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://tamaudonponpoko.nomaki.jp/menu.htm","en":"https://tamaudonponpoko.nomaki.jp/menu.htm","zh-TW":"https://tamaudonponpoko.nomaki.jp/menu.htm"}
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
      "officialSource": {"name":"メニュー一覧","url":"https://tamaudonponpoko.nomaki.jp/menu.htm","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-tama-wheat-udon-ponpoko",
          "spotId": "b08-tama-wheat-udon-ponpoko",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"多摩うどん ぽんぽこ","en":"Tama Udon Ponpoko","zh-TW":"多摩烏龍麵Ponpoko"},
          "description": {"ja":"メニューは多摩の地粉を配合した生麺を紹介しています。","en":"The menu describes fresh noodles blended with local Tama flour.","zh-TW":"菜單介紹混合多摩本地麵粉的生麵。"}
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {"region":"多摩市","station":""},
      "en": {"region":"Tama City","station":""},
      "zh-TW": {"region":"多摩市","station":""}
    }
  },
  "sources": {
    "source-5": {"name":"メニュー一覧","url":"https://tamaudonponpoko.nomaki.jp/menu.htm","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-8": {"name":"多摩市の特産品など","url":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1006512.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://tamaudonponpoko.nomaki.jp/menu.htm","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-5","source-8"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-5","source-8"],"origin":"editorial"},
    "location": {"sourceIds":["source-5","source-8"],"origin":"editorial"},
    "story": {"sourceIds":["source-5","source-8"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-5","source-8"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-5","source-8"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-5"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-5"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-5"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-8"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-8"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-8"],"origin":"editorial"},
    "spots.b08-tama-wheat-udon-ponpoko": {"sourceIds":["source-5"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-5"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-5"],"origin":"editorial"}
  }
};
