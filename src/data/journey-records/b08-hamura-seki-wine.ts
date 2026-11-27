import type { JourneyRecord } from '../journey-record';

export const b08HamuraSekiWineRecord: JourneyRecord = {
  "municipalityId": "hamura",
  "journey": {
    "id": "b08-hamura-seki-wine",
    "regionId": "hamura",
    "foodCultureId": "hamura-seki-wine",
    "storyId": "b08-hamura-seki-wine",
    "routeId": "b08-hamura-seki-wine-route",
    "copy": {
      "ja": {"title":"羽村のぶどうと堰ワイン","subtitle":"羽村のぶどうと堰ワイン","description":"市の特産品紹介から、羽村産ぶどうのワインを知る。","tags":["羽村市"],"storyTitle":"羽村のぶどうと堰ワイン","intro":["市の特産品紹介から、羽村産ぶどうのワインを知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Hamura grapes and Seki Wine","subtitle":"Hamura grapes and Seki Wine","description":"Discover wine made with Hamura grapes through local product accounts.","tags":["Hamura City"],"storyTitle":"Hamura grapes and Seki Wine","intro":["Discover wine made with Hamura grapes through local product accounts.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"羽村葡萄與堰葡萄酒","subtitle":"羽村葡萄與堰葡萄酒","description":"從地方特產介紹認識使用羽村葡萄的酒。","tags":["羽村市"],"storyTitle":"羽村葡萄與堰葡萄酒","intro":["從地方特產介紹認識使用羽村葡萄的酒。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"堰ワイン","body":"東京都は堰ワインを羽村の特産品として掲載。市の記念商品紹介は羽村産ぶどうを使うワインと説明し、観光協会も取扱先として挙げています。"}
      ],
      "en": [
        {"number":"01.","title":"Seki Wine","body":"Tokyo lists Seki Wine among Hamura specialties. The city’s commemorative-product guide describes wine made with Hamura grapes and lists the tourism association among its outlets."}
      ],
      "zh-TW": [
        {"number":"01.","title":"堰葡萄酒","body":"東京都將堰葡萄酒列為羽村特產。市府紀念商品介紹記載它使用羽村葡萄，並將觀光協會列為相關店舖。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b08-hamura-seki-wine-tourism"}
        ]
      }
    ]
  },
  "routeName": {"ja":"羽村のぶどうと堰ワイン","en":"Hamura grapes and Seki Wine","zh-TW":"羽村葡萄與堰葡萄酒"},
  "location": {
    "ja": {"area":"羽村市","station":"","access":""},
    "en": {"area":"Hamura City","station":"","access":""},
    "zh-TW": {"area":"羽村市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "羽村駅", "en": "Hamura Station", "zh-TW": "羽村站"}, "spotId": "b08-hamura-seki-wine-tourism", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b08-hamura-seki-wine-tourism",
          "description": {"ja":"市の記念商品資料は堰ワインの取扱先に観光協会を挙げています。","en":"The city’s commemorative-product guide lists the tourism association among Seki Wine outlets.","zh-TW":"市府紀念商品資料將觀光協會列為堰葡萄酒的相關場所。"},
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
    "b08-hamura-seki-wine-tourism": {
      "presentation": {
        "id": "b08-hamura-seki-wine-tourism",
        "regionId": "hamura",
        "foodCultureId": "hamura-seki-wine",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "羽村市観光協会",
            "lead": "市の記念商品資料は堰ワインの取扱先に観光協会を挙げています。",
            "description": "市の記念商品資料は堰ワインの取扱先に観光協会を挙げています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Hamura Tourism Association",
            "lead": "The city’s commemorative-product guide lists the tourism association among Seki Wine outlets.",
            "description": "The city’s commemorative-product guide lists the tourism association among Seki Wine outlets.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "羽村市觀光協會",
            "lead": "市府紀念商品資料將觀光協會列為堰葡萄酒的相關場所。",
            "description": "市府紀念商品資料將觀光協會列為堰葡萄酒的相關場所。",
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
        "description": {"ja":"市の記念商品資料は堰ワインの取扱先に観光協会を挙げています。","en":"The city’s commemorative-product guide lists the tourism association among Seki Wine outlets.","zh-TW":"市府紀念商品資料將觀光協會列為堰葡萄酒的相關場所。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.hamura.tokyo.jp/0000015311.html","en":"https://www.city.hamura.tokyo.jp/0000015311.html","zh-TW":"https://www.city.hamura.tokyo.jp/0000015311.html"}
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
      "officialSource": {"name":"市民・市内事業者が行う市制施行30周年記念事業・商品","url":"https://www.city.hamura.tokyo.jp/0000015311.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-hamura-seki-wine-tourism",
          "spotId": "b08-hamura-seki-wine-tourism",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"羽村市観光協会","en":"Hamura Tourism Association","zh-TW":"羽村市觀光協會"},
          "description": {"ja":"市の記念商品資料は堰ワインの取扱先に観光協会を挙げています。","en":"The city’s commemorative-product guide lists the tourism association among Seki Wine outlets.","zh-TW":"市府紀念商品資料將觀光協會列為堰葡萄酒的相關場所。"}
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
    "admission-access": {"name": "Hamura City – tourist information center", "url": "https://www.city.hamura.tokyo.jp/0000005553.html", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-26": {"name":"市民・市内事業者が行う市制施行30周年記念事業・商品","url":"https://www.city.hamura.tokyo.jp/0000015311.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-27": {"name":"羽村市｜多摩島しょ地域とは","url":"https://tokyo-tamashima-iju.metro.tokyo.lg.jp/introduction/hamura/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://www.city.hamura.tokyo.jp/0000015311.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-26","source-27"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-26","source-27"],"origin":"editorial"},
    "location": {"sourceIds":["source-26","source-27"],"origin":"editorial"},
    "story": {"sourceIds":["source-26","source-27"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-26","source-27"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-26","source-27"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-26","source-27"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-26","source-27"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-26","source-27"],"origin":"editorial"},
    "spots.b08-hamura-seki-wine-tourism": {"sourceIds":["source-26"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-26"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-26"],"origin":"editorial"}
  }
};
