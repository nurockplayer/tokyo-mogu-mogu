import type { JourneyRecord } from '../journey-record';

export const b02FuchuFarmTableRecord: JourneyRecord = {
  "municipalityId": "fuchu",
  "journey": {
    "id": "b02-fuchu-farm-table",
    "regionId": "fuchu",
    "foodCultureId": "fuchu-farm-table",
    "storyId": "b02-fuchu-farm-table",
    "routeId": "b02-fuchu-farm-table-route",
    "copy": {
      "ja": {"title":"府中の畑と直売所","subtitle":"府中の畑と直売所","description":"御用ウリ、青菜、果実から都市農業を知る。","tags":["府中市"],"storyTitle":"府中の畑と直売所","intro":["御用ウリ、青菜、果実から都市農業を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Fuchu fields and farm markets",
        "subtitle": "Fuchu fields and farm markets",
        "description": "Explore urban farming through heritage melons, greens and fruit.",
        "tags": ["Fuchu"],
        "storyTitle": "Fuchu fields and farm markets",
        "intro": ["Explore urban farming through heritage melons, greens and fruit.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"府中的田地與農產直售","subtitle":"府中的田地與農產直售","description":"從御用瓜、青菜與果實認識都市農業。","tags":["府中市"],"storyTitle":"府中的田地與農產直售","intro":["從御用瓜、青菜與果實認識都市農業。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"府中御用ウリの記憶","body":"JAは、美濃から招かれた農夫が府中で御用のマクワウリを栽培したと紹介しています。市立図書館の冊子も府中御用ウリを取り上げ、2013年に江戸東京野菜へ登録されたと記しています。"},
        {"number":"02.","title":"小松菜と畑の作物","body":"図書館の冊子は小松菜を押立町中心に育つ代表的な作物とし、分葱や椎茸も特産品に挙げています。JAの直売所案内にも小松菜やシイタケが掲載されています。"},
        {"number":"03.","title":"多摩川梨と藤稔","body":"冊子は藤稔ぶどうを特産品として紹介し、多摩川梨は日新町や南町を中心に栽培されると記しています。"},
        {"number":"04.","title":"作り手が届ける直売所","body":"JAマインズは、府中特産品直売所に市内の生産者が季節の野菜や、自ら加工したジャム・乾燥食品などを出荷していると紹介しています。"}
      ],
      "en": [
        {"number":"01.","title":"Fuchu Goyo Uri heritage","body":"JA recounts growers invited from Mino to cultivate makuwa melons for official supply in Fuchu. The municipal library booklet also describes Fuchu Goyo Uri and its 2013 registration as an Edo-Tokyo heritage vegetable."},
        {"number":"02.","title":"Komatsuna and field crops","body":"The library booklet presents komatsuna, grown especially in Oshitate, as a leading crop and lists wakegi onions and shiitake as specialties. JA’s market guide also lists komatsuna and shiitake."},
        {"number":"03.","title":"Tamagawa pears and Fujiminori grapes","body":"The booklet names Fujiminori grapes as a specialty and describes Tamagawa pears grown especially in Nisshincho and Minamicho."},
        {"number":"04.","title":"A market supplied by growers","body":"JA Minds describes Fuchu Specialty Farmers Market as supplied by city growers with seasonal vegetables and farmer-made jams and dried foods."}
      ],
      "zh-TW": [
        {"number":"01.","title":"府中御用瓜的歷史","body":"JA 記載從美濃聘請農人到府中栽培御用真桑瓜。市立圖書館冊子亦介紹府中御用瓜，記載其於 2013 年登錄為江戶東京蔬菜。"},
        {"number":"02.","title":"小松菜與田地作物","body":"圖書館冊子將主要種於押立町的小松菜列為代表作物，並列分蔥與香菇為特產。JA 直售指南亦列有小松菜與香菇。"},
        {"number":"03.","title":"多摩川梨與藤稔葡萄","body":"冊子將藤稔葡萄列為特產，並記載多摩川梨主要種植於日新町與南町。"},
        {"number":"04.","title":"由農友供貨的直售所","body":"JA Minds 介紹府中特產品直售所由市內農友供應季節蔬菜及自製果醬、乾燥食品等。"}
      ]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":150,"steps":[{"spotId":"b02-fuchu-farm-table-fuchu-market"},{"spotId":"b02-fuchu-farm-table-kyodo-market"}]}]
  },
  "routeName": {"ja":"府中の畑と直売所","en":"Fuchu fields and farm markets","zh-TW":"府中的田地與農產直售"},
  "location": {"ja":{"area":"府中市","station":"","access":""},"en":{"area":"Fuchu","station":"","access":""},"zh-TW":{"area":"府中市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b02-fuchu-farm-table-fuchu-market",
          "description": {"ja":"JAマインズが市内の生産者による野菜と加工品の出荷先として紹介しています。","en":"JA Minds describes this outlet for city growers’ vegetables and processed foods.","zh-TW":"JA Minds 介紹此處為市內農友供應蔬菜與加工品的據點。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        },
        {
          "spotId": "b02-fuchu-farm-table-kyodo-market",
          "description": {"ja":"図書館の冊子と直売所案内が、府中の農産物と加工品を紹介する拠点として掲載しています。","en":"The library booklet and farm-market directory describe this outlet for Fuchu produce and processed foods.","zh-TW":"圖書館冊子與直售所指南介紹此處為府中農產與加工品據點。"},
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
    "b02-fuchu-farm-table-fuchu-market": {
      "presentation": {
        "id": "b02-fuchu-farm-table-fuchu-market",
        "regionId": "fuchu",
        "foodCultureId": "fuchu-farm-table",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"府中特産品直売所","lead":"JAマインズが市内の生産者による野菜と加工品の出荷先として紹介しています。","description":"JAマインズが市内の生産者による野菜と加工品の出荷先として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Fuchu Specialty Farmers Market",
            "lead": "JA Minds describes this outlet for city growers’ vegetables and processed foods.",
            "description": "JA Minds describes this outlet for city growers’ vegetables and processed foods.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"府中特產品直售所","lead":"JA Minds 介紹此處為市內農友供應蔬菜與加工品的據點。","description":"JA Minds 介紹此處為市內農友供應蔬菜與加工品的據點。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"JAマインズが市内の生産者による野菜と加工品の出荷先として紹介しています。","en":"JA Minds describes this outlet for city growers’ vegetables and processed foods.","zh-TW":"JA Minds 介紹此處為市內農友供應蔬菜與加工品的據點。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.ja-minds.or.jp/farmstand/fuchu_fm.php","en":"https://www.ja-minds.or.jp/farmstand/fuchu_fm.php","zh-TW":"https://www.ja-minds.or.jp/farmstand/fuchu_fm.php"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"JAマインズ — 府中特産品直売所","url":"https://www.ja-minds.or.jp/farmstand/fuchu_fm.php","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b02-fuchu-farm-table-kyodo-market": {
      "presentation": {
        "id": "b02-fuchu-farm-table-kyodo-market",
        "regionId": "fuchu",
        "foodCultureId": "fuchu-farm-table",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"府中市郷土の森観光物産館","lead":"図書館の冊子と直売所案内が、府中の農産物と加工品を紹介する拠点として掲載しています。","description":"図書館の冊子と直売所案内が、府中の農産物と加工品を紹介する拠点として掲載しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Fuchu Kyodo no Mori Tourism Products Hall",
            "lead": "The library booklet and farm-market directory describe this outlet for Fuchu produce and processed foods.",
            "description": "The library booklet and farm-market directory describe this outlet for Fuchu produce and processed foods.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"府中市鄉土之森觀光物產館","lead":"圖書館冊子與直售所指南介紹此處為府中農產與加工品據點。","description":"圖書館冊子與直售所指南介紹此處為府中農產與加工品據點。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"図書館の冊子と直売所案内が、府中の農産物と加工品を紹介する拠点として掲載しています。","en":"The library booklet and farm-market directory describe this outlet for Fuchu produce and processed foods.","zh-TW":"圖書館冊子與直售所指南介紹此處為府中農產與加工品據點。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://library.city.fuchu.tokyo.jp/kids/pdf/fuchuhakase13.pdf","en":"https://library.city.fuchu.tokyo.jp/kids/pdf/fuchuhakase13.pdf","zh-TW":"https://library.city.fuchu.tokyo.jp/kids/pdf/fuchuhakase13.pdf"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"府中市立図書館 — きみはいくつ知っている？ 府中市の特産品","url":"https://library.city.fuchu.tokyo.jp/kids/pdf/fuchuhakase13.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b02-fuchu-farm-table-fuchu-market",
          "spotId": "b02-fuchu-farm-table-fuchu-market",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"府中特産品直売所","en":"Fuchu Specialty Farmers Market","zh-TW":"府中特產品直售所"},
          "description": {"ja":"JAマインズが市内の生産者による野菜と加工品の出荷先として紹介しています。","en":"JA Minds describes this outlet for city growers’ vegetables and processed foods.","zh-TW":"JA Minds 介紹此處為市內農友供應蔬菜與加工品的據點。"}
        },
        {
          "referenceId": "b02-fuchu-farm-table-kyodo-market",
          "spotId": "b02-fuchu-farm-table-kyodo-market",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"府中市郷土の森観光物産館","en":"Fuchu Kyodo no Mori Tourism Products Hall","zh-TW":"府中市鄉土之森觀光物產館"},
          "description": {"ja":"図書館の冊子と直売所案内が、府中の農産物と加工品を紹介する拠点として掲載しています。","en":"The library booklet and farm-market directory describe this outlet for Fuchu produce and processed foods.","zh-TW":"圖書館冊子與直售所指南介紹此處為府中農產與加工品據點。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"府中市","station":""},"en":{"region":"Fuchu","station":""},"zh-TW":{"region":"府中市","station":""}}
  },
  "sources": {
    "source-41": {"name":"JA東京中央会 — 鳴子ウリ・府中御用ウリ","url":"https://www.tokyo-ja.or.jp/farm/edo/31.php","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-42": {"name":"府中市立図書館 — きみはいくつ知っている？ 府中市の特産品","url":"https://library.city.fuchu.tokyo.jp/kids/pdf/fuchuhakase13.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-43": {"name":"JAマインズ — 府中特産品直売所","url":"https://www.ja-minds.or.jp/farmstand/fuchu_fm.php","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-44": {"name":"Sato no Monogatari — Fuchu Kyodo no Mori Tourism Products Hall","url":"https://satomono.jp/market/13206/2791/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.ja-minds.or.jp/farmstand/fuchu_fm.php","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-41","source-42","source-43","source-44"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-41","source-42","source-43","source-44"],"origin":"editorial"},
    "location": {"sourceIds":["source-41","source-42","source-43","source-44"],"origin":"editorial"},
    "story": {"sourceIds":["source-41","source-42","source-43","source-44"],"origin":"editorial"},
    "spots": {"sourceIds":["source-41","source-42","source-43","source-44"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-41","source-42","source-43","source-44"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-41","source-42"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-41","source-42"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-41","source-42"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-42","source-43"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-42","source-43"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-42","source-43"],"origin":"editorial"},
    "journey.chapters.ja.2": {"sourceIds":["source-42"],"origin":"editorial"},
    "journey.chapters.en.2": {"sourceIds":["source-42"],"origin":"editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds":["source-42"],"origin":"editorial"},
    "journey.chapters.ja.3": {"sourceIds":["source-43"],"origin":"editorial"},
    "journey.chapters.en.3": {"sourceIds":["source-43"],"origin":"editorial"},
    "journey.chapters.zh-TW.3": {"sourceIds":["source-43"],"origin":"editorial"},
    "spots.b02-fuchu-farm-table-fuchu-market": {"sourceIds":["source-43"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-43"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-43"],"origin":"editorial"},
    "spots.b02-fuchu-farm-table-kyodo-market": {"sourceIds":["source-42","source-44"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-42","source-44"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-42","source-44"],"origin":"editorial"}
  }
};
