import type { JourneyRecord } from '../journey-record';

export const b08HamuraCraftBeerRecord: JourneyRecord = {
  "municipalityId": "hamura",
  "alcoholThemed": true,
  "journey": {
    "id": "b08-hamura-craft-beer",
    "regionId": "hamura",
    "foodCultureId": "hamura-craft-beer",
    "storyId": "b08-hamura-craft-beer",
    "routeId": "b08-hamura-craft-beer-route",
    "copy": {
      "ja": {"title":"羽村のホップとビール","subtitle":"羽村のホップとビール","description":"羽中のホップと、羽村の水を使う醸造の記録。","tags":["羽村市"],"storyTitle":"羽村のホップとビール","intro":["羽中のホップと、羽村の水を使う醸造の記録。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Hamura hops and beer","subtitle":"Hamura hops and beer","description":"Stories of Hanaka hops and brewing with Hamura water.","tags":["Hamura City"],"storyTitle":"Hamura hops and beer","intro":["Stories of Hanaka hops and brewing with Hamura water.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"羽村啤酒花與啤酒","subtitle":"羽村啤酒花與啤酒","description":"認識羽中啤酒花與使用羽村水釀造的紀錄。","tags":["羽村市"],"storyTitle":"羽村啤酒花與啤酒","intro":["認識羽中啤酒花與使用羽村水釀造的紀錄。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"羽村産ホップのクラフトビール「ペルツェン」","body":"西多摩経済新聞は2024年10月、石川酒造が羽村産ホップのビール「ペルツェン」を発売したと報道。ホップの生産者は羽中の清水亮一さんと紹介されています。"},
        {"number":"02.","title":"羽村の地ビール・ASHFORD","body":"市の2021年の取材は、森慶太郎さんが羽村の水でビールを醸し、小作のパブASHFORDを営む姿を紹介しています。"}
      ],
      "en": [
        {"number":"01.","title":"Hamura-Hop Craft Beer, Perutzen","body":"Nishitama Keizai Shimbun reported Ishikawa Brewery’s October 2024 release of Perutzen beer using Hamura hops grown by Ryoichi Shimizu in Hanaka."},
        {"number":"02.","title":"Hamura Craft Beer and ASHFORD","body":"A 2021 city interview profiles Keitaro Mori brewing beer with Hamura water and running ASHFORD, a pub in Ozaku."}
      ],
      "zh-TW": [
        {"number":"01.","title":"羽村啤酒花","body":"西多摩經濟新聞報導，石川酒造於2024年10月推出使用羽村啤酒花的Perutzen啤酒，生產者為羽中的清水亮一。"},
        {"number":"02.","title":"ASHFORD啤酒","body":"市府2021年的訪談介紹森慶太郎使用羽村水釀啤酒，並在小作經營ASHFORD酒館。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b08-hamura-craft-beer-ashford"}
        ]
      }
    ]
  },
  "routeName": {"ja":"羽村のホップとビール","en":"Hamura hops and beer","zh-TW":"羽村啤酒花與啤酒"},
  "location": {
    "ja": {"area":"羽村市","station":"","access":""},
    "en": {"area":"Hamura City","station":"","access":""},
    "zh-TW": {"area":"羽村市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "小作駅", "en": "Ozaku Station", "zh-TW": "小作站"}, "spotId": "b08-hamura-craft-beer-ashford", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b08-hamura-craft-beer-ashford",
          "description": {"ja":"市の2021年の取材が森慶太郎さんのパブと羽村のビールを紹介しています。","en":"A 2021 city interview connects Keitaro Mori’s pub with Hamura-brewed beer.","zh-TW":"市府2021年的訪談將森慶太郎的酒館與羽村釀造啤酒連結。"},
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
    "b08-hamura-craft-beer-ashford": {
      "presentation": {
        "id": "b08-hamura-craft-beer-ashford",
        "regionId": "hamura",
        "foodCultureId": "hamura-craft-beer",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "ASHFORD",
            "lead": "市の2021年の取材が森慶太郎さんのパブと羽村のビールを紹介しています。",
            "description": "市の2021年の取材が森慶太郎さんのパブと羽村のビールを紹介しています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "ASHFORD",
            "lead": "A 2021 city interview connects Keitaro Mori’s pub with Hamura-brewed beer.",
            "description": "A 2021 city interview connects Keitaro Mori’s pub with Hamura-brewed beer.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "ASHFORD",
            "lead": "市府2021年的訪談將森慶太郎的酒館與羽村釀造啤酒連結。",
            "description": "市府2021年的訪談將森慶太郎的酒館與羽村釀造啤酒連結。",
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
        "description": {"ja":"市の2021年の取材が森慶太郎さんのパブと羽村のビールを紹介しています。","en":"A 2021 city interview connects Keitaro Mori’s pub with Hamura-brewed beer.","zh-TW":"市府2021年的訪談將森慶太郎的酒館與羽村釀造啤酒連結。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.hamura.tokyo.jp/prsite/0000017739.html","en":"https://www.city.hamura.tokyo.jp/prsite/0000017739.html","zh-TW":"https://www.city.hamura.tokyo.jp/prsite/0000017739.html"}
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
      "officialSource": {"name":"羽村で味わうロンドンの雰囲気 クラフトビールを楽しめる「たまり場」ASHFORD","url":"https://www.city.hamura.tokyo.jp/prsite/0000017739.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-hamura-craft-beer-ashford",
          "spotId": "b08-hamura-craft-beer-ashford",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"ASHFORD","en":"ASHFORD","zh-TW":"ASHFORD"},
          "description": {"ja":"市の2021年の取材が森慶太郎さんのパブと羽村のビールを紹介しています。","en":"A 2021 city interview connects Keitaro Mori’s pub with Hamura-brewed beer.","zh-TW":"市府2021年的訪談將森慶太郎的酒館與羽村釀造啤酒連結。"}
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
    "admission-access": {"name": "Hamura City – Ashford profile", "url": "https://www.city.hamura.tokyo.jp/prsite/0000017739.html", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-28": {"name":"羽村産のホップで「ペルツェン」醸造 石川酒造が発売","url":"https://nishitama.keizai.biz/headline/1669/","sourceType":"business","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-29": {"name":"羽村で味わうロンドンの雰囲気 クラフトビールを楽しめる「たまり場」ASHFORD","url":"https://www.city.hamura.tokyo.jp/prsite/0000017739.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://nishitama.keizai.biz/headline/1669/","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-28","source-29"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-28","source-29"],"origin":"editorial"},
    "location": {"sourceIds":["source-28","source-29"],"origin":"editorial"},
    "story": {"sourceIds":["source-28","source-29"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-28","source-29"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-28","source-29"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-28"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-28"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-28"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-29"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-29"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-29"],"origin":"editorial"},
    "spots.b08-hamura-craft-beer-ashford": {"sourceIds":["source-29"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-29"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-29"],"origin":"editorial"}
  }
};
