import type { JourneyRecord } from '../journey-record';

export const b02OmePlumRecord: JourneyRecord = {
  "municipalityId": "ome",
  "alcoholThemed": false,
  "journey": {
    "id": "b02-ome-plum",
    "regionId": "ome",
    "foodCultureId": "ome-plum",
    "storyId": "b02-ome-plum",
    "routeId": "b02-ome-plum-route",
    "copy": {
      "ja": {"title":"青梅の梅と和菓子","subtitle":"青梅の梅と和菓子","description":"吉野梅郷の梅が、おみやげへつながる物語。","tags":["青梅市"],"storyTitle":"青梅の梅と和菓子","intro":["吉野梅郷の梅が、おみやげへつながる物語。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Ome plums and confectionery",
        "subtitle": "Ome plums and confectionery",
        "description": "Follow the connection between Yoshino Baigo plums and souvenirs.",
        "tags": ["Ome"],
        "storyTitle": "Ome plums and confectionery",
        "intro": ["Follow the connection between Yoshino Baigo plums and souvenirs.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"青梅的梅子與和菓子","subtitle":"青梅的梅子與和菓子","description":"認識吉野梅鄉梅子與伴手禮的連結。","tags":["青梅市"],"storyTitle":"青梅的梅子與和菓子","intro":["認識吉野梅鄉梅子與伴手禮的連結。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"梅の里の菓子づくり","body":"西多摩の観光案内は、青梅の梅を梅干しや加工品として紹介しています。市の紅梅苑への取材では、紅梅饅頭は1983年から販売され、吉川英治ゆかりの物語を持つこと、2025年から再び青梅の梅を使えるようになったことが語られています。"}],
      "en": [{"number":"01.","title":"Confectionery in plum country","body":"The regional guide describes Ome plums as umeboshi and other processed foods. In a city interview, Koubaien traces Koubai Manju to 1983, connects its story with author Eiji Yoshikawa, and reports returning to Ome-grown plums in 2025."}],
      "zh-TW": [{"number":"01.","title":"梅鄉的點心製作","body":"區域觀光資料介紹青梅的梅乾與加工品。市府訪談中，紅梅苑記載紅梅饅頭自 1983 年開始製作，與作家吉川英治有關，並於 2025 年重新使用青梅產梅子。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b02-ome-plum-koubaien"}]}]
  },
  "routeName": {"ja":"青梅の梅と和菓子","en":"Ome plums and confectionery","zh-TW":"青梅的梅子與和菓子"},
  "location": {"ja":{"area":"青梅市","station":"","access":""},"en":{"area":"Ome","station":"","access":""},"zh-TW":{"area":"青梅市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "日向和田駅", "en": "Hinatawada Station", "zh-TW": "日向和田站"}, "spotId": "b02-ome-plum-koubaien", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b02-ome-plum-koubaien",
          "description": {"ja":"市と観光協会が、梅郷で梅の菓子を作る店として紹介しています。","en":"The city and tourism association introduce this Baigo confectioner through its plum sweets.","zh-TW":"市府與觀光協會介紹此梅鄉店家的梅子點心。"},
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
    "b02-ome-plum-koubaien": {
      "presentation": {
        "id": "b02-ome-plum-koubaien",
        "regionId": "ome",
        "foodCultureId": "ome-plum",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"紅梅苑","lead":"市と観光協会が、梅郷で梅の菓子を作る店として紹介しています。","description":"市と観光協会が、梅郷で梅の菓子を作る店として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Koubaien",
            "lead": "The city and tourism association introduce this Baigo confectioner through its plum sweets.",
            "description": "The city and tourism association introduce this Baigo confectioner through its plum sweets.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"紅梅苑","lead":"市府與觀光協會介紹此梅鄉店家的梅子點心。","description":"市府與觀光協會介紹此梅鄉店家的梅子點心。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市と観光協会が、梅郷で梅の菓子を作る店として紹介しています。","en":"The city and tourism association introduce this Baigo confectioner through its plum sweets.","zh-TW":"市府與觀光協會介紹此梅鄉店家的梅子點心。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.city.ome.tokyo.jp/soshiki/57/119869.html","en":"https://www.city.ome.tokyo.jp/soshiki/57/119869.html","zh-TW":"https://www.city.ome.tokyo.jp/soshiki/57/119869.html"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"青梅市 — 学校給食における青梅の銘菓","url":"https://www.city.ome.tokyo.jp/soshiki/57/119869.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [{"referenceId":"b02-ome-plum-koubaien","spotId":"b02-ome-plum-koubaien","badgeColor":"#E98A1C","badge":{"ja":"紅梅苑","en":"Koubaien","zh-TW":"紅梅苑"},"description":{"ja":"市と観光協会が、梅郷で梅の菓子を作る店として紹介しています。","en":"The city and tourism association introduce this Baigo confectioner through its plum sweets.","zh-TW":"市府與觀光協會介紹此梅鄉店家的梅子點心。"}}],
      "nature": []
    },
    "location": {"ja":{"region":"青梅市","station":""},"en":{"region":"Ome","station":""},"zh-TW":{"region":"青梅市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Ōtama Tourism Federation Kōbaien access", "url": "https://www.ohtama.or.jp/member/798.html", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-14": {"name":"西多摩地域広域行政圏協議会 — 梅 東京都青梅市","url":"https://www.nishitama-kouiki.jp/%E6%A2%85-%E6%9D%B1%E4%BA%AC%E9%83%BD%E9%9D%92%E6%A2%85%E5%B8%82/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-15": {"name":"青梅市 — 学校給食における青梅の銘菓","url":"https://www.city.ome.tokyo.jp/soshiki/57/119869.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-16": {"name":"Ome Tourism Association — Koubaien","url":"https://www.omekanko.gr.jp/spot/06601/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.city.ome.tokyo.jp/soshiki/57/119869.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-14","source-15","source-16"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-14","source-15","source-16"],"origin":"editorial"},
    "location": {"sourceIds":["source-14","source-15","source-16"],"origin":"editorial"},
    "story": {"sourceIds":["source-14","source-15","source-16"],"origin":"editorial"},
    "spots": {"sourceIds":["source-14","source-15","source-16"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-14","source-15","source-16"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-14","source-15"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-14","source-15"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-14","source-15"],"origin":"editorial"},
    "spots.b02-ome-plum-koubaien": {"sourceIds":["source-15","source-16"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-15","source-16"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-15","source-16"],"origin":"editorial"}
  }
};
