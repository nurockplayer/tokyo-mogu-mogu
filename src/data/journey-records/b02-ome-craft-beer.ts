import type { JourneyRecord } from '../journey-record';

export const b02OmeCraftBeerRecord: JourneyRecord = {
  "municipalityId": "ome",
  "alcoholThemed": true,
  "journey": {
    "id": "b02-ome-craft-beer",
    "regionId": "ome",
    "foodCultureId": "ome-craft-beer",
    "storyId": "b02-ome-craft-beer",
    "routeId": "b02-ome-craft-beer-route",
    "copy": {
      "ja": {"title":"青梅のクラフトビール VEPAR","subtitle":"青梅のクラフトビール VEPAR","description":"地元の新しい名物を目指した酒販店の記録。","tags":["青梅市"],"storyTitle":"青梅のクラフトビール VEPAR","intro":["地元の新しい名物を目指した酒販店の記録。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Ome’s VEPAR craft beer",
        "subtitle": "Ome’s VEPAR craft beer",
        "description": "Read about a liquor shop’s effort to create a new local specialty.",
        "tags": ["Ome"],
        "storyTitle": "Ome’s VEPAR craft beer",
        "intro": ["Read about a liquor shop’s effort to create a new local specialty.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"青梅 VEPAR 精釀啤酒","subtitle":"青梅 VEPAR 精釀啤酒","description":"認識酒販店開發新地方名產的記錄。","tags":["青梅市"],"storyTitle":"青梅 VEPAR 精釀啤酒","intro":["認識酒販店開發新地方名產的記錄。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"武藤治作酒店の試み","body":"青梅商工会議所の2024年の記事は、武藤治作酒店が同年3月にVEPARの製造を始めたと紹介しています。"}],
      "en": [{"number":"01.","title":"Muto Jisaku Saketen’s project","body":"A 2024 Ome Chamber of Commerce article reports that Muto Jisaku Saketen began producing VEPAR that March."}],
      "zh-TW": [{"number":"01.","title":"武藤治作酒店的嘗試","body":"青梅商工會議所 2024 年文章記載武藤治作酒店於同年 3 月開始製作 VEPAR。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b02-ome-craft-beer-muto"}]}]
  },
  "routeName": {"ja":"青梅のクラフトビール VEPAR","en":"Ome’s VEPAR craft beer","zh-TW":"青梅 VEPAR 精釀啤酒"},
  "location": {"ja":{"area":"青梅市","station":"","access":""},"en":{"area":"Ome","station":"","access":""},"zh-TW":{"area":"青梅市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "河辺駅", "en": "Kabe Station", "zh-TW": "河邊站"}, "spotId": "b02-ome-craft-beer-muto", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b02-ome-craft-beer-muto",
          "description": {"ja":"商工会議所がVEPARの作り手として紹介しています。訪問を受け入れているかは資料では確認できません。","en":"The chamber identifies this business as VEPAR’s maker. The source does not establish visitor access.","zh-TW":"商工會議所介紹此業者為 VEPAR 製作者；資料未能確認是否接待訪客。"},
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
    "b02-ome-craft-beer-muto": {
      "officialSource": {"name": "Ōme Tourism Association Mutō Jisaku Saketen access", "url": "https://www.omekanko.gr.jp/spot/05501/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
      "presentation": {
        "id": "b02-ome-craft-beer-muto",
        "regionId": "ome",
        "foodCultureId": "ome-craft-beer",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"武藤治作酒店","lead":"商工会議所がVEPARの作り手として紹介しています。訪問を受け入れているかは資料では確認できません。","description":"商工会議所がVEPARの作り手として紹介しています。訪問を受け入れているかは資料では確認できません。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。","過去の紹介に基づく記録です。現在の提供や訪問の可否を示すものではありません。"]},
          "en": {
            "name": "Muto Jisaku Saketen",
            "lead": "The chamber identifies this business as VEPAR’s maker. The source does not establish visitor access.",
            "description": "The chamber identifies this business as VEPAR’s maker. The source does not establish visitor access.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting.","This account is based on a past publication. It does not establish current service or visitor access."]
          },
          "zh-TW": {"name":"武藤治作酒店","lead":"商工會議所介紹此業者為 VEPAR 製作者；資料未能確認是否接待訪客。","description":"商工會議所介紹此業者為 VEPAR 製作者；資料未能確認是否接待訪客。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。","本記錄依據過去刊載資料，不代表目前仍提供相關服務或可供造訪。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"商工会議所がVEPARの作り手として紹介しています。訪問を受け入れているかは資料では確認できません。","en":"The chamber identifies this business as VEPAR’s maker. The source does not establish visitor access.","zh-TW":"商工會議所介紹此業者為 VEPAR 製作者；資料未能確認是否接待訪客。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.omekanko.gr.jp/spot/05501/","en":"https://www.omekanko.gr.jp/spot/05501/","zh-TW":"https://www.omekanko.gr.jp/spot/05501/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"過去の紹介に基づく記録です。現在の提供や訪問の可否を示すものではありません。","en":"This account is based on a past publication. It does not establish current service or visitor access.","zh-TW":"本記錄依據過去刊載資料，不代表目前仍提供相關服務或可供造訪。"}]
      }
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b02-ome-craft-beer-muto",
          "spotId": "b02-ome-craft-beer-muto",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"武藤治作酒店","en":"Muto Jisaku Saketen","zh-TW":"武藤治作酒店"},
          "description": {"ja":"商工会議所がVEPARの作り手として紹介しています。訪問を受け入れているかは資料では確認できません。","en":"The chamber identifies this business as VEPAR’s maker. The source does not establish visitor access.","zh-TW":"商工會議所介紹此業者為 VEPAR 製作者；資料未能確認是否接待訪客。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"青梅市","station":""},"en":{"region":"Ome","station":""},"zh-TW":{"region":"青梅市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Ōme Tourism Association Mutō Jisaku Saketen access", "url": "https://www.omekanko.gr.jp/spot/05501/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-33": {"name":"青梅商工会議所 — 武藤治作酒店 青梅初のクラフトビールを製造","url":"https://www.omecci.jp/member_activity/24997.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.omecci.jp/member_activity/24997.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "spots.b02-ome-craft-beer-muto.officialSource": {"sourceIds": ["admission-access"], "origin": "editorial"},
    "journey.copy": {"sourceIds":["source-33"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-33"],"origin":"editorial"},
    "location": {"sourceIds":["source-33"],"origin":"editorial"},
    "story": {"sourceIds":["source-33"],"origin":"editorial"},
    "spots": {"sourceIds":["source-33"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-33"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-33"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-33"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-33"],"origin":"editorial"},
    "spots.b02-ome-craft-beer-muto": {"sourceIds":["source-33"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-33"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-33"],"origin":"editorial"}
  }
};
