import type { JourneyRecord } from '../journey-record';

export const b02OmeSawaiYuzuRecord: JourneyRecord = {
  "municipalityId": "ome",
  "alcoholThemed": false,
  "journey": {
    "id": "b02-ome-sawai-yuzu",
    "regionId": "ome",
    "foodCultureId": "ome-sawai-yuzu",
    "storyId": "b02-ome-sawai-yuzu",
    "routeId": "b02-ome-sawai-yuzu-route",
    "copy": {
      "ja": {"title":"沢井ゆずのようかん","subtitle":"沢井ゆずのようかん","description":"地域の柚子を使う和菓子の紹介をたどる。","tags":["青梅市"],"storyTitle":"沢井ゆずのようかん","intro":["地域の柚子を使う和菓子の紹介をたどる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Sawai yuzu in yokan","subtitle":"Sawai yuzu in yokan","description":"Explore a confection linked to local yuzu.","tags":["Ome"],"storyTitle":"Sawai yuzu in yokan","intro":["Explore a confection linked to local yuzu.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"澤井柚子的羊羹","subtitle":"澤井柚子的羊羹","description":"認識使用地方柚子的和菓子。","tags":["青梅市"],"storyTitle":"澤井柚子的羊羹","intro":["認識使用地方柚子的和菓子。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"沢井柚子を生かす","body":"青梅市観光協会は、みたけ歩楽里道の沢井ゆずようかんを紹介し、使用する柚子は沢井柚子100％と記載しています。"}],
      "en": [{"number":"01.","title":"A confection using Sawai yuzu","body":"Ome’s tourism association features Mitake Burarido’s yokan and states that its yuzu is entirely Sawai yuzu."}],
      "zh-TW": [{"number":"01.","title":"運用澤井柚子的點心","body":"青梅市觀光協會介紹 Mitake Burarido 的羊羹，並記載所用柚子全為澤井柚子。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b02-ome-sawai-yuzu-burarido"}]}]
  },
  "routeName": {"ja":"沢井ゆずのようかん","en":"Sawai yuzu in yokan","zh-TW":"澤井柚子的羊羹"},
  "location": {"ja":{"area":"青梅市","station":"","access":""},"en":{"area":"Ome","station":"","access":""},"zh-TW":{"area":"青梅市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "御嶽駅", "en": "Mitake Station", "zh-TW": "御嶽站"}, "spotId": "b02-ome-sawai-yuzu-burarido", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b02-ome-sawai-yuzu-burarido",
          "description": {"ja":"観光協会が沢井ゆずようかんを紹介する店です。","en":"The tourism association links this shop with Sawai yuzu yokan.","zh-TW":"觀光協會將此店與澤井柚子羊羹連結介紹。"},
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
    "b02-ome-sawai-yuzu-burarido": {
      "presentation": {
        "id": "b02-ome-sawai-yuzu-burarido",
        "regionId": "ome",
        "foodCultureId": "ome-sawai-yuzu",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"みたけ歩楽里道","lead":"観光協会が沢井ゆずようかんを紹介する店です。","description":"観光協会が沢井ゆずようかんを紹介する店です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Mitake Burarido",
            "lead": "The tourism association links this shop with Sawai yuzu yokan.",
            "description": "The tourism association links this shop with Sawai yuzu yokan.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Mitake Burarido","lead":"觀光協會將此店與澤井柚子羊羹連結介紹。","description":"觀光協會將此店與澤井柚子羊羹連結介紹。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会が沢井ゆずようかんを紹介する店です。","en":"The tourism association links this shop with Sawai yuzu yokan.","zh-TW":"觀光協會將此店與澤井柚子羊羹連結介紹。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.omekanko.gr.jp/spot/12401/","en":"https://www.omekanko.gr.jp/spot/12401/","zh-TW":"https://www.omekanko.gr.jp/spot/12401/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"青梅市観光協会 — みたけ歩楽里道（ぶらりどう）","url":"https://www.omekanko.gr.jp/spot/12401/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [{"referenceId":"b02-ome-sawai-yuzu-burarido","spotId":"b02-ome-sawai-yuzu-burarido","badgeColor":"#E98A1C","badge":{"ja":"みたけ歩楽里道","en":"Mitake Burarido","zh-TW":"Mitake Burarido"},"description":{"ja":"観光協会が沢井ゆずようかんを紹介する店です。","en":"The tourism association links this shop with Sawai yuzu yokan.","zh-TW":"觀光協會將此店與澤井柚子羊羹連結介紹。"}}],
      "nature": []
    },
    "location": {"ja":{"region":"青梅市","station":""},"en":{"region":"Ome","station":""},"zh-TW":{"region":"青梅市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Ōme Tourism Association Buraridō access", "url": "https://www.omekanko.gr.jp/spot/12401/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-18": {"name":"青梅市観光協会 — みたけ歩楽里道（ぶらりどう）","url":"https://www.omekanko.gr.jp/spot/12401/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.omekanko.gr.jp/spot/12401/","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-18"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-18"],"origin":"editorial"},
    "location": {"sourceIds":["source-18"],"origin":"editorial"},
    "story": {"sourceIds":["source-18"],"origin":"editorial"},
    "spots": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-18"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-18"],"origin":"editorial"},
    "spots.b02-ome-sawai-yuzu-burarido": {"sourceIds":["source-18"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-18"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-18"],"origin":"editorial"}
  }
};
