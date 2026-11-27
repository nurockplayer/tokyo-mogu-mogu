import type { JourneyRecord } from '../journey-record';

export const b02FuchuBlackRiceRecord: JourneyRecord = {
  "municipalityId": "fuchu",
  "journey": {
    "id": "b02-fuchu-black-rice",
    "regionId": "fuchu",
    "foodCultureId": "fuchu-black-rice",
    "storyId": "b02-fuchu-black-rice",
    "routeId": "b02-fuchu-black-rice-route",
    "copy": {
      "ja": {"title":"府中の黒米と加工の知恵","subtitle":"府中の黒米と加工の知恵","description":"米、うどん、パン、稲わらの活用を読む。","tags":["府中市"],"storyTitle":"府中の黒米と加工の知恵","intro":["米、うどん、パン、稲わらの活用を読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Fuchu black rice and food-making",
        "subtitle": "Fuchu black rice and food-making",
        "description": "Read about rice, udon, bread and the use of rice straw.",
        "tags": ["Fuchu"],
        "storyTitle": "Fuchu black rice and food-making",
        "intro": ["Read about rice, udon, bread and the use of rice straw.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"府中黑米與加工智慧","subtitle":"府中黑米與加工智慧","description":"閱讀黑米、烏龍麵、麵包與稻草運用的故事。","tags":["府中市"],"storyTitle":"府中黑米與加工智慧","intro":["閱讀黑米、烏龍麵、麵包與稻草運用的故事。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"黒米から広がる食品","body":"図書館の冊子は、黒米を育てる農家が府中市古代米研究会を作り加工にも取り組んだと伝えています。黒米と黒米うどんは観光協会推奨品に挙げられ、黒米パンや黒米の稲わらを使う納豆も紹介されています。"}],
      "en": [
        {"number":"01.","title":"Foods connected with black rice","body":"The library booklet describes black-rice growers forming the Fuchu Ancient Rice Research Association and developing processed foods. It lists black rice and black-rice udon as tourism-association endorsed products, alongside black-rice bread and natto made using black-rice straw."}
      ],
      "zh-TW": [{"number":"01.","title":"由黑米延伸的食品","body":"圖書館冊子記載黑米農友組成府中市古代米研究會並投入食品加工，將黑米與黑米烏龍麵列為觀光協會推薦品，亦介紹黑米麵包及使用黑米稻草製作的納豆。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":150,"steps":[{"spotId":"b02-fuchu-black-rice-rice-market"},{"spotId":"b02-fuchu-black-rice-rice-hall"}]}]
  },
  "routeName": {"ja":"府中の黒米と加工の知恵","en":"Fuchu black rice and food-making","zh-TW":"府中黑米與加工智慧"},
  "location": {"ja":{"area":"府中市","station":"","access":""},"en":{"area":"Fuchu","station":"","access":""},"zh-TW":{"area":"府中市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "郷土の森正門前", "en": "Kyodo-no-Mori Seimon-mae bus stop", "zh-TW": "鄉土之森正門前公車站"}, "spotId": "b02-fuchu-black-rice-rice-hall", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b02-fuchu-black-rice-rice-market",
          "description": {"ja":"図書館の冊子は、この直売所の紹介で古代米（黒米）を挙げています。","en":"The library booklet names ancient rice (black rice) in its description of this market.","zh-TW":"圖書館冊子介紹此直售所時列有古代米（黑米）。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        },
        {
          "spotId": "b02-fuchu-black-rice-rice-hall",
          "description": {"ja":"直売所案内は、館内の飲食施設で古代米研究会の黒米うどんを使う料理を紹介しています。","en":"The market directory describes dishes using the Ancient Rice Research Association’s black-rice udon at the hall’s dining facility.","zh-TW":"直售所指南介紹館內餐飲設施有使用古代米研究會黑米烏龍麵的料理。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        }
      ],
      "stats": {
        "ja": {"time":"約150分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"150","access":"","caution":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。"},
        "en": {"time":"About 150 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"150","access":"","caution":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described."},
        "zh-TW": {"time":"約 150 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"150","access":"","caution":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b02-fuchu-black-rice-rice-market": {
      "presentation": {
        "id": "b02-fuchu-black-rice-rice-market",
        "regionId": "fuchu",
        "foodCultureId": "fuchu-black-rice",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"府中特産品直売所","lead":"図書館の冊子は、この直売所の紹介で古代米（黒米）を挙げています。","description":"図書館の冊子は、この直売所の紹介で古代米（黒米）を挙げています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Fuchu Specialty Farmers Market",
            "lead": "The library booklet names ancient rice (black rice) in its description of this market.",
            "description": "The library booklet names ancient rice (black rice) in its description of this market.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"府中特產品直售所","lead":"圖書館冊子介紹此直售所時列有古代米（黑米）。","description":"圖書館冊子介紹此直售所時列有古代米（黑米）。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"図書館の冊子は、この直売所の紹介で古代米（黒米）を挙げています。","en":"The library booklet names ancient rice (black rice) in its description of this market.","zh-TW":"圖書館冊子介紹此直售所時列有古代米（黑米）。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://library.city.fuchu.tokyo.jp/kids/pdf/fuchuhakase13.pdf","en":"https://library.city.fuchu.tokyo.jp/kids/pdf/fuchuhakase13.pdf","zh-TW":"https://library.city.fuchu.tokyo.jp/kids/pdf/fuchuhakase13.pdf"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"府中市立図書館 — きみはいくつ知っている？ 府中市の特産品","url":"https://library.city.fuchu.tokyo.jp/kids/pdf/fuchuhakase13.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b02-fuchu-black-rice-rice-hall": {
      "presentation": {
        "id": "b02-fuchu-black-rice-rice-hall",
        "regionId": "fuchu",
        "foodCultureId": "fuchu-black-rice",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"府中市郷土の森観光物産館","lead":"直売所案内は、館内の飲食施設で古代米研究会の黒米うどんを使う料理を紹介しています。","description":"直売所案内は、館内の飲食施設で古代米研究会の黒米うどんを使う料理を紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Fuchu Kyodo no Mori Tourism Products Hall",
            "lead": "The market directory describes dishes using the Ancient Rice Research Association’s black-rice udon at the hall’s dining facility.",
            "description": "The market directory describes dishes using the Ancient Rice Research Association’s black-rice udon at the hall’s dining facility.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"府中市鄉土之森觀光物產館","lead":"直售所指南介紹館內餐飲設施有使用古代米研究會黑米烏龍麵的料理。","description":"直售所指南介紹館內餐飲設施有使用古代米研究會黑米烏龍麵的料理。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"直売所案内は、館内の飲食施設で古代米研究会の黒米うどんを使う料理を紹介しています。","en":"The market directory describes dishes using the Ancient Rice Research Association’s black-rice udon at the hall’s dining facility.","zh-TW":"直售所指南介紹館內餐飲設施有使用古代米研究會黑米烏龍麵的料理。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://satomono.jp/market/13206/2791/","en":"https://satomono.jp/market/13206/2791/","zh-TW":"https://satomono.jp/market/13206/2791/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      }
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b02-fuchu-black-rice-rice-market",
          "spotId": "b02-fuchu-black-rice-rice-market",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"府中特産品直売所","en":"Fuchu Specialty Farmers Market","zh-TW":"府中特產品直售所"},
          "description": {"ja":"図書館の冊子は、この直売所の紹介で古代米（黒米）を挙げています。","en":"The library booklet names ancient rice (black rice) in its description of this market.","zh-TW":"圖書館冊子介紹此直售所時列有古代米（黑米）。"}
        },
        {
          "referenceId": "b02-fuchu-black-rice-rice-hall",
          "spotId": "b02-fuchu-black-rice-rice-hall",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"府中市郷土の森観光物産館","en":"Fuchu Kyodo no Mori Tourism Products Hall","zh-TW":"府中市鄉土之森觀光物產館"},
          "description": {"ja":"直売所案内は、館内の飲食施設で古代米研究会の黒米うどんを使う料理を紹介しています。","en":"The market directory describes dishes using the Ancient Rice Research Association’s black-rice udon at the hall’s dining facility.","zh-TW":"直售所指南介紹館內餐飲設施有使用古代米研究會黑米烏龍麵的料理。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"府中市","station":""},"en":{"region":"Fuchu","station":""},"zh-TW":{"region":"府中市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Fuchu City – Kyodo-no-Mori visitor market", "url": "https://www.city.fuchu.tokyo.jp/kanko/shisetsu/kankoubussankan.html", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-42": {"name":"府中市立図書館 — きみはいくつ知っている？ 府中市の特産品","url":"https://library.city.fuchu.tokyo.jp/kids/pdf/fuchuhakase13.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-44": {"name":"Sato no Monogatari — Fuchu Kyodo no Mori Tourism Products Hall","url":"https://satomono.jp/market/13206/2791/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://library.city.fuchu.tokyo.jp/kids/pdf/fuchuhakase13.pdf","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-42","source-44"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-42","source-44"],"origin":"editorial"},
    "location": {"sourceIds":["source-42","source-44"],"origin":"editorial"},
    "story": {"sourceIds":["source-42","source-44"],"origin":"editorial"},
    "spots": {"sourceIds":["source-42","source-44"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-42","source-44"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-42"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-42"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-42"],"origin":"editorial"},
    "spots.b02-fuchu-black-rice-rice-market": {"sourceIds":["source-42"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-42"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-42"],"origin":"editorial"},
    "spots.b02-fuchu-black-rice-rice-hall": {"sourceIds":["source-44"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-44"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-44"],"origin":"editorial"}
  }
};
