import type { JourneyRecord } from '../journey-record';

export const b08TamaSakuraSweetsRecord: JourneyRecord = {
  "municipalityId": "tama",
  "journey": {
    "id": "b08-tama-sakura-sweets",
    "regionId": "tama",
    "foodCultureId": "tama-sakura-sweets",
    "storyId": "b08-tama-sakura-sweets",
    "routeId": "b08-tama-sakura-sweets-route",
    "copy": {
      "ja": {"title":"多摩市の桜を菓子に","subtitle":"多摩市の桜を菓子に","description":"市内産の桜をあしらった、協働から生まれた手みやげ。","tags":["多摩市"],"storyTitle":"多摩市の桜を菓子に","intro":["市内産の桜をあしらった、協働から生まれた手みやげ。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Tama cherry blossoms in a sweet","subtitle":"Tama cherry blossoms in a sweet","description":"A collaborative souvenir topped with local cherry blossoms.","tags":["Tama City"],"storyTitle":"Tama cherry blossoms in a sweet","intro":["A collaborative souvenir topped with local cherry blossoms.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"多摩市櫻花的甜點故事","subtitle":"多摩市櫻花的甜點故事","description":"由在地合作誕生、點綴市內櫻花的伴手禮。","tags":["多摩市"],"storyTitle":"多摩市櫻花的甜點故事","intro":["由在地合作誕生、點綴市內櫻花的伴手禮。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"多摩市の手みやげ「桜ぽるぼろん」","body":"市内企業・大学・団体・市が関わる手みやげプロジェクトから誕生した桜ぽるぼろん。市内産の桜の塩漬けを飾り、市はPonteと市役所内売店ひまわりを取扱先として紹介しています。"}
      ],
      "en": [
        {"number":"01.","title":"Sakura Polvoron","body":"Sakura Polvoron grew from a souvenir project involving local businesses, universities, organizations and the city. It uses salt-preserved Tama cherry blossoms; the city lists Ponte and the Himawari municipal-office shop as outlets."}
      ],
      "zh-TW": [
        {"number":"01.","title":"櫻花Polvoron","body":"櫻花Polvoron源自當地企業、大學、團體與市府合作的伴手禮計畫，點綴市內鹽漬櫻花。市府列出Ponte與市役所的向日葵商店為相關店舖。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b08-tama-sakura-sweets-ponte"},
          {"spotId":"b08-tama-sakura-sweets-himawari"}
        ]
      }
    ]
  },
  "routeName": {"ja":"多摩市の桜を菓子に","en":"Tama cherry blossoms in a sweet","zh-TW":"多摩市櫻花的甜點故事"},
  "location": {
    "ja": {"area":"多摩市","station":"","access":""},
    "en": {"area":"Tama City","station":"","access":""},
    "zh-TW": {"area":"多摩市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "京王永山駅", "en": "Keiō Nagayama Station", "zh-TW": "京王永山站"}, "spotId": "b08-tama-sakura-sweets-ponte", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b08-tama-sakura-sweets-ponte",
          "description": {"ja":"市は桜ぽるぼろんの取扱先としてPonteを紹介しています。","en":"The city lists Ponte as an outlet for Sakura Polvoron.","zh-TW":"市府將Ponte列為櫻花Polvoron的相關店舖。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        },
        {
          "spotId": "b08-tama-sakura-sweets-himawari",
          "description": {"ja":"市は桜ぽるぼろんの取扱先として紹介しています。","en":"The city lists this shop as an outlet for Sakura Polvoron.","zh-TW":"市府列此店為櫻花Polvoron的相關店舖。"},
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
    "b08-tama-sakura-sweets-ponte": {
      "presentation": {
        "id": "b08-tama-sakura-sweets-ponte",
        "regionId": "tama",
        "foodCultureId": "tama-sakura-sweets",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "Ponte（ポンテ）",
            "lead": "市は桜ぽるぼろんの取扱先としてPonteを紹介しています。",
            "description": "市は桜ぽるぼろんの取扱先としてPonteを紹介しています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Ponte",
            "lead": "The city lists Ponte as an outlet for Sakura Polvoron.",
            "description": "The city lists Ponte as an outlet for Sakura Polvoron.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "Ponte",
            "lead": "市府將Ponte列為櫻花Polvoron的相關店舖。",
            "description": "市府將Ponte列為櫻花Polvoron的相關店舖。",
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
        "description": {"ja":"市は桜ぽるぼろんの取扱先としてPonteを紹介しています。","en":"The city lists Ponte as an outlet for Sakura Polvoron.","zh-TW":"市府將Ponte列為櫻花Polvoron的相關店舖。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1016146.html","en":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1016146.html","zh-TW":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1016146.html"}
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
      "officialSource": {"name":"多摩市の手土産「桜ぽるぼろん」販売中！","url":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1016146.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b08-tama-sakura-sweets-himawari": {
      "presentation": {
        "id": "b08-tama-sakura-sweets-himawari",
        "regionId": "tama",
        "foodCultureId": "tama-sakura-sweets",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "市役所内売店 ひまわり",
            "lead": "市は桜ぽるぼろんの取扱先として紹介しています。",
            "description": "市は桜ぽるぼろんの取扱先として紹介しています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Himawari Municipal Office Shop",
            "lead": "The city lists this shop as an outlet for Sakura Polvoron.",
            "description": "The city lists this shop as an outlet for Sakura Polvoron.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "市役所向日葵商店",
            "lead": "市府列此店為櫻花Polvoron的相關店舖。",
            "description": "市府列此店為櫻花Polvoron的相關店舖。",
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
        "description": {"ja":"市は桜ぽるぼろんの取扱先として紹介しています。","en":"The city lists this shop as an outlet for Sakura Polvoron.","zh-TW":"市府列此店為櫻花Polvoron的相關店舖。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1016146.html","en":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1016146.html","zh-TW":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1016146.html"}
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
      "officialSource": {"name":"多摩市の手土産「桜ぽるぼろん」販売中！","url":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1016146.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-tama-sakura-sweets-ponte",
          "spotId": "b08-tama-sakura-sweets-ponte",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"Ponte（ポンテ）","en":"Ponte","zh-TW":"Ponte"},
          "description": {"ja":"市は桜ぽるぼろんの取扱先としてPonteを紹介しています。","en":"The city lists Ponte as an outlet for Sakura Polvoron.","zh-TW":"市府將Ponte列為櫻花Polvoron的相關店舖。"}
        },
        {
          "referenceId": "b08-tama-sakura-sweets-himawari",
          "spotId": "b08-tama-sakura-sweets-himawari",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"市役所内売店 ひまわり","en":"Himawari Municipal Office Shop","zh-TW":"市役所向日葵商店"},
          "description": {"ja":"市は桜ぽるぼろんの取扱先として紹介しています。","en":"The city lists this shop as an outlet for Sakura Polvoron.","zh-TW":"市府列此店為櫻花Polvoron的相關店舖。"}
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
    "admission-access": {"name": "Greenade Nagayama – Ponte shop guide", "url": "https://www.greenade.com/shop/index.jsp?bf=1&fmt=6&shopid=15", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-8": {"name":"多摩市の特産品など","url":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1006512.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-9": {"name":"多摩市の手土産「桜ぽるぼろん」販売中！","url":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1016146.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://www.city.tama.lg.jp/kanko/1015690/1016140/1006512.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-8","source-9"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-8","source-9"],"origin":"editorial"},
    "location": {"sourceIds":["source-8","source-9"],"origin":"editorial"},
    "story": {"sourceIds":["source-8","source-9"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-8","source-9"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-8","source-9"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-8","source-9"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-8","source-9"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-8","source-9"],"origin":"editorial"},
    "spots.b08-tama-sakura-sweets-ponte": {"sourceIds":["source-9"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-9"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-9"],"origin":"editorial"},
    "spots.b08-tama-sakura-sweets-himawari": {"sourceIds":["source-9"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-9"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-9"],"origin":"editorial"}
  }
};
