import type { JourneyRecord } from '../journey-record';

export const b02OmeKonnyakuRecord: JourneyRecord = {
  "municipalityId": "ome",
  "journey": {
    "id": "b02-ome-konnyaku",
    "regionId": "ome",
    "foodCultureId": "ome-konnyaku",
    "storyId": "b02-ome-konnyaku",
    "routeId": "b02-ome-konnyaku-route",
    "copy": {
      "ja": {"title":"青梅のこんにゃくを知る","subtitle":"青梅のこんにゃくを知る","description":"地域の作り手を記した観光資料をたどる。","tags":["青梅市"],"storyTitle":"青梅のこんにゃくを知る","intro":["地域の作り手を記した観光資料をたどる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Discover Ome konnyaku","subtitle":"Discover Ome konnyaku","description":"Follow tourism records of local konnyaku businesses.","tags":["Ome"],"storyTitle":"Discover Ome konnyaku","intro":["Follow tourism records of local konnyaku businesses.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"認識青梅蒟蒻","subtitle":"認識青梅蒟蒻","description":"循著觀光資料認識地方蒟蒻業者。","tags":["青梅市"],"storyTitle":"認識青梅蒟蒻","intro":["循著觀光資料認識地方蒟蒻業者。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"地域のこんにゃく店","body":"JAPAN 47 GOは青梅のこんにゃくを紹介し、のしこん本舗、向山食品、伊藤薗を販売店として挙げています。"}],
      "en": [{"number":"01.","title":"Local konnyaku businesses","body":"JAPAN 47 GO introduces Ome konnyaku and names Noshikon Honpo, Mukoyama Foods and Itoen as sellers."}],
      "zh-TW": [{"number":"01.","title":"地方蒟蒻店","body":"JAPAN 47 GO 介紹青梅蒟蒻，並列 Noshikon 本舖、向山食品與伊藤薗為店家。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b02-ome-konnyaku-noshikon"}]}]
  },
  "routeName": {"ja":"青梅のこんにゃくを知る","en":"Discover Ome konnyaku","zh-TW":"認識青梅蒟蒻"},
  "location": {"ja":{"area":"青梅市","station":"","access":""},"en":{"area":"Ome","station":"","access":""},"zh-TW":{"area":"青梅市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b02-ome-konnyaku-noshikon",
          "description": {"ja":"観光資料が御岳本町のこんにゃく店として挙げています。","en":"The tourism directory lists this Mitake Honcho konnyaku business.","zh-TW":"觀光資料列有此御岳本町的蒟蒻店家。"},
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
    "b02-ome-konnyaku-noshikon": {
      "presentation": {
        "id": "b02-ome-konnyaku-noshikon",
        "regionId": "ome",
        "foodCultureId": "ome-konnyaku",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"のしこん本舗","lead":"観光資料が御岳本町のこんにゃく店として挙げています。","description":"観光資料が御岳本町のこんにゃく店として挙げています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Noshikon Honpo",
            "lead": "The tourism directory lists this Mitake Honcho konnyaku business.",
            "description": "The tourism directory lists this Mitake Honcho konnyaku business.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Noshikon 本舖","lead":"觀光資料列有此御岳本町的蒟蒻店家。","description":"觀光資料列有此御岳本町的蒟蒻店家。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光資料が御岳本町のこんにゃく店として挙げています。","en":"The tourism directory lists this Mitake Honcho konnyaku business.","zh-TW":"觀光資料列有此御岳本町的蒟蒻店家。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.japan47go.travel/ja/detail/a769f2f6-017d-4683-9c83-c8b9f353f414","en":"https://www.japan47go.travel/ja/detail/a769f2f6-017d-4683-9c83-c8b9f353f414","zh-TW":"https://www.japan47go.travel/ja/detail/a769f2f6-017d-4683-9c83-c8b9f353f414"}
          },
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      }
    }
  },
  "story": {
    "groups": {"nearby":[{"referenceId":"b02-ome-konnyaku-noshikon","spotId":"b02-ome-konnyaku-noshikon","badgeColor":"#E98A1C","badge":{"ja":"のしこん本舗","en":"Noshikon Honpo","zh-TW":"Noshikon 本舖"},"description":{"ja":"観光資料が御岳本町のこんにゃく店として挙げています。","en":"The tourism directory lists this Mitake Honcho konnyaku business.","zh-TW":"觀光資料列有此御岳本町的蒟蒻店家。"}}],"nature":[]},
    "location": {"ja":{"region":"青梅市","station":""},"en":{"region":"Ome","station":""},"zh-TW":{"region":"青梅市","station":""}}
  },
  "sources": {
    "source-28": {"name":"日本観光振興協会 — 青梅市のこんにゃく","url":"https://www.japan47go.travel/ja/detail/a769f2f6-017d-4683-9c83-c8b9f353f414","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.japan47go.travel/ja/detail/a769f2f6-017d-4683-9c83-c8b9f353f414","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-28"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-28"],"origin":"editorial"},
    "location": {"sourceIds":["source-28"],"origin":"editorial"},
    "story": {"sourceIds":["source-28"],"origin":"editorial"},
    "spots": {"sourceIds":["source-28"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-28"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-28"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-28"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-28"],"origin":"editorial"},
    "spots.b02-ome-konnyaku-noshikon": {"sourceIds":["source-28"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-28"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-28"],"origin":"editorial"}
  }
};
