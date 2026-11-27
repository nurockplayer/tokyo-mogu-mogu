import type { JourneyRecord } from '../journey-record';

export const b02OmeMitakeFoodsRecord: JourneyRecord = {
  "municipalityId": "ome",
  "journey": {
    "id": "b02-ome-mitake-foods",
    "regionId": "ome",
    "foodCultureId": "ome-mitake-foods",
    "storyId": "b02-ome-mitake-foods",
    "routeId": "b02-ome-mitake-foods-route",
    "copy": {
      "ja": {"title":"御岳の玄関口の食","subtitle":"御岳の玄関口の食","description":"わさびときび大福の紹介から山の入口を知る。","tags":["青梅市"],"storyTitle":"御岳の玄関口の食","intro":["わさびときび大福の紹介から山の入口を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Foods at the Mitake gateway",
        "subtitle": "Foods at the Mitake gateway",
        "description": "Read about wasabi and millet daifuku at a mountain gateway.",
        "tags": ["Ome"],
        "storyTitle": "Foods at the Mitake gateway",
        "intro": ["Read about wasabi and millet daifuku at a mountain gateway.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"御岳入口的地方飲食","subtitle":"御岳入口的地方飲食","description":"透過山葵與黍大福認識山區入口。","tags":["青梅市"],"storyTitle":"御岳入口的地方飲食","intro":["透過山葵與黍大福認識山區入口。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"売店が伝える名産","body":"観光協会は御岳山の入口にある滝本駅売店を紹介し、生わさび、わさび漬け、きび大福などを挙げています。"}],
      "en": [{"number":"01.","title":"Specialties in a gateway shop","body":"The tourism association introduces the shop at Takimoto Station, the Mitake gateway, naming fresh wasabi, wasabi pickles and millet daifuku."}],
      "zh-TW": [{"number":"01.","title":"入口商店介紹的名產","body":"觀光協會介紹御岳入口瀧本站的商店，列有生山葵、山葵漬與黍大福等。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b02-ome-mitake-foods-takimoto"}]}]
  },
  "routeName": {"ja":"御岳の玄関口の食","en":"Foods at the Mitake gateway","zh-TW":"御岳入口的地方飲食"},
  "location": {"ja":{"area":"青梅市","station":"","access":""},"en":{"area":"Ome","station":"","access":""},"zh-TW":{"area":"青梅市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "滝本駅", "en": "Takimoto Station", "zh-TW": "瀧本站"}, "spotId": "b02-ome-mitake-foods-takimoto", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b02-ome-mitake-foods-takimoto",
          "description": {"ja":"観光協会がわさびときび大福などを紹介する駅売店です。","en":"The tourism association links this station shop with wasabi and millet daifuku.","zh-TW":"觀光協會將此車站商店與山葵、黍大福等連結介紹。"},
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
    "b02-ome-mitake-foods-takimoto": {
      "presentation": {
        "id": "b02-ome-mitake-foods-takimoto",
        "regionId": "ome",
        "foodCultureId": "ome-mitake-foods",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"御岳登山鉄道 滝本駅売店","lead":"観光協会がわさびときび大福などを紹介する駅売店です。","description":"観光協会がわさびときび大福などを紹介する駅売店です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Mitake Cable Car Takimoto Station shop",
            "lead": "The tourism association links this station shop with wasabi and millet daifuku.",
            "description": "The tourism association links this station shop with wasabi and millet daifuku.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"御岳登山鐵道 瀧本站商店","lead":"觀光協會將此車站商店與山葵、黍大福等連結介紹。","description":"觀光協會將此車站商店與山葵、黍大福等連結介紹。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会がわさびときび大福などを紹介する駅売店です。","en":"The tourism association links this station shop with wasabi and millet daifuku.","zh-TW":"觀光協會將此車站商店與山葵、黍大福等連結介紹。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.omekanko.gr.jp/spot/11901/","en":"https://www.omekanko.gr.jp/spot/11901/","zh-TW":"https://www.omekanko.gr.jp/spot/11901/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"青梅市観光協会 — ケーブルカー滝本駅","url":"https://www.omekanko.gr.jp/spot/11901/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b02-ome-mitake-foods-takimoto",
          "spotId": "b02-ome-mitake-foods-takimoto",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"御岳登山鉄道 滝本駅売店","en":"Mitake Cable Car Takimoto Station shop","zh-TW":"御岳登山鐵道 瀧本站商店"},
          "description": {"ja":"観光協会がわさびときび大福などを紹介する駅売店です。","en":"The tourism association links this station shop with wasabi and millet daifuku.","zh-TW":"觀光協會將此車站商店與山葵、黍大福等連結介紹。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"青梅市","station":""},"en":{"region":"Ome","station":""},"zh-TW":{"region":"青梅市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Tokyo Tourist Information Takimoto Station", "url": "https://www.tokyotouristinfo.com/detail/M0072", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-27": {"name":"青梅市観光協会 — ケーブルカー滝本駅","url":"https://www.omekanko.gr.jp/spot/11901/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.omekanko.gr.jp/spot/11901/","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-27"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-27"],"origin":"editorial"},
    "location": {"sourceIds":["source-27"],"origin":"editorial"},
    "story": {"sourceIds":["source-27"],"origin":"editorial"},
    "spots": {"sourceIds":["source-27"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-27"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-27"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-27"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-27"],"origin":"editorial"},
    "spots.b02-ome-mitake-foods-takimoto": {"sourceIds":["source-27"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-27"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-27"],"origin":"editorial"}
  }
};
