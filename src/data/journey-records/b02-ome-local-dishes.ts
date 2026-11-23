import type { JourneyRecord } from '../journey-record';

export const b02OmeLocalDishesRecord: JourneyRecord = {
  "municipalityId": "ome",
  "journey": {
    "id": "b02-ome-local-dishes",
    "regionId": "ome",
    "foodCultureId": "ome-local-dishes",
    "storyId": "b02-ome-local-dishes",
    "routeId": "b02-ome-local-dishes-route",
    "copy": {
      "ja": {"title":"青梅の肉うどんと郷土の工夫","subtitle":"青梅の肉うどんと郷土の工夫","description":"TOKYO Xと、地域が生み出した料理の記録を読む。","tags":["青梅市"],"storyTitle":"青梅の肉うどんと郷土の工夫","intro":["TOKYO Xと、地域が生み出した料理の記録を読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Ome pork udon and local creations",
        "subtitle": "Ome pork udon and local creations",
        "description": "Read about TOKYO X and dishes created in the region.",
        "tags": ["Ome"],
        "storyTitle": "Ome pork udon and local creations",
        "intro": ["Read about TOKYO X and dishes created in the region.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"青梅肉烏龍麵與地方創作","subtitle":"青梅肉烏龍麵與地方創作","description":"閱讀 TOKYO X 與地方創作料理的故事。","tags":["青梅市"],"storyTitle":"青梅肉烏龍麵與地方創作","intro":["閱讀 TOKYO X 與地方創作料理的故事。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"青梅生まれの肉うどん","body":"西多摩の紹介は、青梅畜産センターで開発されたTOKYO Xの豚肉を、地域で食べられてきたうどんと組み合わせた料理を取り上げています。"},{"number":"02.","title":"米とチーズのメンチ","body":"西多摩の資料はKINGめし・ライスメンチを、地元産豚肉に米とチーズを合わせたメンチとして紹介しています。"}],
      "en": [
        {"number":"01.","title":"Pork udon born in Ome","body":"The regional guide describes a dish combining TOKYO X pork, developed at Ome’s livestock centre, with udon traditionally eaten in the area."},
        {"number":"02.","title":"Rice and cheese in a pork croquette","body":"The regional guide describes KING Meshi / Rice Menchi as a creation combining local pork, rice and cheese."}
      ],
      "zh-TW": [{"number":"01.","title":"誕生於青梅的肉烏龍麵","body":"區域指南介紹將青梅畜產中心開發的 TOKYO X 豬肉與當地原有烏龍麵結合的料理。"},{"number":"02.","title":"米飯與起司的豬肉餅","body":"區域資料介紹 KING Meshi／Rice Menchi 為結合在地豬肉、米飯與起司的肉餅。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b02-ome-local-dishes-negishiya"}]}]
  },
  "routeName": {"ja":"青梅の肉うどんと郷土の工夫","en":"Ome pork udon and local creations","zh-TW":"青梅肉烏龍麵與地方創作"},
  "location": {"ja":{"area":"青梅市","station":"","access":""},"en":{"area":"Ome","station":"","access":""},"zh-TW":{"area":"青梅市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b02-ome-local-dishes-negishiya",
          "description": {"ja":"市の観光案内がTOKYO Xを使うカレー南ばんうどんを紹介する店です。KINGめしの提供店とは記載されていません。","en":"The city guide features this restaurant’s TOKYO X curry udon. It does not identify it as a seller of KING Meshi.","zh-TW":"市府觀光指南介紹此店的 TOKYO X 咖哩烏龍麵，未將其列為 KING Meshi 供應店。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        }
      ],
      "stats": {
        "ja": {"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。"},
        "en": {"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stop","station":"","minutes":"90","access":"","caution":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described."},
        "zh-TW": {"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b02-ome-local-dishes-negishiya": {
      "presentation": {
        "id": "b02-ome-local-dishes-negishiya",
        "regionId": "ome",
        "foodCultureId": "ome-local-dishes",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"根岸屋","lead":"市の観光案内がTOKYO Xを使うカレー南ばんうどんを紹介する店です。KINGめしの提供店とは記載されていません。","description":"市の観光案内がTOKYO Xを使うカレー南ばんうどんを紹介する店です。KINGめしの提供店とは記載されていません。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Negishiya",
            "lead": "The city guide features this restaurant’s TOKYO X curry udon. It does not identify it as a seller of KING Meshi.",
            "description": "The city guide features this restaurant’s TOKYO X curry udon. It does not identify it as a seller of KING Meshi.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"根岸屋","lead":"市府觀光指南介紹此店的 TOKYO X 咖哩烏龍麵，未將其列為 KING Meshi 供應店。","description":"市府觀光指南介紹此店的 TOKYO X 咖哩烏龍麵，未將其列為 KING Meshi 供應店。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市の観光案内がTOKYO Xを使うカレー南ばんうどんを紹介する店です。KINGめしの提供店とは記載されていません。","en":"The city guide features this restaurant’s TOKYO X curry udon. It does not identify it as a seller of KING Meshi.","zh-TW":"市府觀光指南介紹此店的 TOKYO X 咖哩烏龍麵，未將其列為 KING Meshi 供應店。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.city.ome.tokyo.jp/site/omekanko/20292.html","en":"https://www.city.ome.tokyo.jp/site/omekanko/20292.html","zh-TW":"https://www.city.ome.tokyo.jp/site/omekanko/20292.html"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"青梅市 — お子様の自由研究に！いろいろ体験ドライブコース","url":"https://www.city.ome.tokyo.jp/site/omekanko/20292.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b02-ome-local-dishes-negishiya",
          "spotId": "b02-ome-local-dishes-negishiya",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"根岸屋","en":"Negishiya","zh-TW":"根岸屋"},
          "description": {"ja":"市の観光案内がTOKYO Xを使うカレー南ばんうどんを紹介する店です。KINGめしの提供店とは記載されていません。","en":"The city guide features this restaurant’s TOKYO X curry udon. It does not identify it as a seller of KING Meshi.","zh-TW":"市府觀光指南介紹此店的 TOKYO X 咖哩烏龍麵，未將其列為 KING Meshi 供應店。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"青梅市","station":""},"en":{"region":"Ome","station":""},"zh-TW":{"region":"青梅市","station":""}}
  },
  "sources": {
    "source-26": {"name":"青梅市 — お子様の自由研究に！いろいろ体験ドライブコース","url":"https://www.city.ome.tokyo.jp/site/omekanko/20292.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-38": {
      "name": "西多摩地域広域行政圏協議会 — 青梅生まれトウキョウX肉うどん",
      "url": "https://www.nishitama-kouiki.jp/%E9%9D%92%E6%A2%85%E7%94%9F%E3%81%BE%E3%82%8C%E3%83%88%E3%82%A6%E3%82%AD%E3%83%A7%E3%82%A6%EF%BD%98%E8%82%89%E3%81%86%E3%81%A9%E3%82%93-%E6%9D%B1%E4%BA%AC%E9%83%BD%E9%9D%92/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-39": {
      "name": "西多摩地域広域行政圏協議会 — KINGめし・ライスメンチ 東京都青梅市",
      "url": "https://www.nishitama-kouiki.jp/%EF%BD%8B%EF%BD%89%EF%BD%8E%EF%BD%87%E3%82%81%E3%81%97%E3%83%BB%E3%83%A9%E3%82%A4%E3%82%B9%E3%83%A1%E3%83%B3%E3%83%81-%E6%9D%B1%E4%BA%AC%E9%83%BD%E9%9D%92%E6%A2%85%E5%B8%82/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.city.ome.tokyo.jp/site/omekanko/20292.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-26","source-38","source-39"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-26","source-38","source-39"],"origin":"editorial"},
    "location": {"sourceIds":["source-26","source-38","source-39"],"origin":"editorial"},
    "story": {"sourceIds":["source-26","source-38","source-39"],"origin":"editorial"},
    "spots": {"sourceIds":["source-26","source-38","source-39"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-26","source-38","source-39"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-38"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-38"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-38"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-39"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-39"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-39"],"origin":"editorial"},
    "spots.b02-ome-local-dishes-negishiya": {"sourceIds":["source-26"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-26"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-26"],"origin":"editorial"}
  }
};
