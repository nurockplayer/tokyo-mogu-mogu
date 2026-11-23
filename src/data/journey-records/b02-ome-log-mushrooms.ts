import type { JourneyRecord } from '../journey-record';

export const b02OmeLogMushroomsRecord: JourneyRecord = {
  "municipalityId": "ome",
  "journey": {
    "id": "b02-ome-log-mushrooms",
    "regionId": "ome",
    "foodCultureId": "ome-log-mushrooms",
    "storyId": "b02-ome-log-mushrooms",
    "routeId": "b02-ome-log-mushrooms-route",
    "copy": {
      "ja": {"title":"青梅の原木きのこ","subtitle":"青梅の原木きのこ","description":"森の食材を育てる農園の紹介を読む。","tags":["青梅市"],"storyTitle":"青梅の原木きのこ","intro":["森の食材を育てる農園の紹介を読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Ome’s log-grown mushrooms","subtitle":"Ome’s log-grown mushrooms","description":"Explore an account of a farm growing forest foods.","tags":["Ome"],"storyTitle":"Ome’s log-grown mushrooms","intro":["Explore an account of a farm growing forest foods.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"青梅的段木菇類","subtitle":"青梅的段木菇類","description":"閱讀栽培森林食材的農園故事。","tags":["青梅市"],"storyTitle":"青梅的段木菇類","intro":["閱讀栽培森林食材的農園故事。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"原木から育つきのこ","body":"市の観光案内は内沼きのこ園を自然原木栽培の農園として紹介し、シイタケやマイタケ、クリ茸、ヒラタケ、ナメコなどを挙げています。"}],
      "en": [{"number":"01.","title":"Mushrooms grown on logs","body":"The city guide describes Uchinuma Mushroom Farm’s natural-log cultivation and names shiitake, maitake, kuritake, oyster mushrooms and nameko."}],
      "zh-TW": [{"number":"01.","title":"生長於段木的菇類","body":"市府觀光指南介紹內沼菇園以天然段木栽培香菇、舞菇、栗菇、平菇與滑菇等。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b02-ome-log-mushrooms-uchinuma"}]}]
  },
  "routeName": {"ja":"青梅の原木きのこ","en":"Ome’s log-grown mushrooms","zh-TW":"青梅的段木菇類"},
  "location": {"ja":{"area":"青梅市","station":"","access":""},"en":{"area":"Ome","station":"","access":""},"zh-TW":{"area":"青梅市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b02-ome-log-mushrooms-uchinuma",
          "description": {"ja":"市がシイタケやマイタケなどを育てる原木きのこ農園として紹介しています。","en":"The city introduces this farm through its log-grown shiitake, maitake and other mushrooms.","zh-TW":"市府介紹此農園以段木栽培香菇、舞菇等菇類。"},
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
    "b02-ome-log-mushrooms-uchinuma": {
      "presentation": {
        "id": "b02-ome-log-mushrooms-uchinuma",
        "regionId": "ome",
        "foodCultureId": "ome-log-mushrooms",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"内沼きのこ園","lead":"市がシイタケやマイタケなどを育てる原木きのこ農園として紹介しています。","description":"市がシイタケやマイタケなどを育てる原木きのこ農園として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Uchinuma Mushroom Farm",
            "lead": "The city introduces this farm through its log-grown shiitake, maitake and other mushrooms.",
            "description": "The city introduces this farm through its log-grown shiitake, maitake and other mushrooms.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"內沼菇園","lead":"市府介紹此農園以段木栽培香菇、舞菇等菇類。","description":"市府介紹此農園以段木栽培香菇、舞菇等菇類。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市がシイタケやマイタケなどを育てる原木きのこ農園として紹介しています。","en":"The city introduces this farm through its log-grown shiitake, maitake and other mushrooms.","zh-TW":"市府介紹此農園以段木栽培香菇、舞菇等菇類。"},
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
          "referenceId": "b02-ome-log-mushrooms-uchinuma",
          "spotId": "b02-ome-log-mushrooms-uchinuma",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"内沼きのこ園","en":"Uchinuma Mushroom Farm","zh-TW":"內沼菇園"},
          "description": {"ja":"市がシイタケやマイタケなどを育てる原木きのこ農園として紹介しています。","en":"The city introduces this farm through its log-grown shiitake, maitake and other mushrooms.","zh-TW":"市府介紹此農園以段木栽培香菇、舞菇等菇類。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"青梅市","station":""},"en":{"region":"Ome","station":""},"zh-TW":{"region":"青梅市","station":""}}
  },
  "sources": {
    "source-26": {"name":"青梅市 — お子様の自由研究に！いろいろ体験ドライブコース","url":"https://www.city.ome.tokyo.jp/site/omekanko/20292.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.city.ome.tokyo.jp/site/omekanko/20292.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-26"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-26"],"origin":"editorial"},
    "location": {"sourceIds":["source-26"],"origin":"editorial"},
    "story": {"sourceIds":["source-26"],"origin":"editorial"},
    "spots": {"sourceIds":["source-26"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-26"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-26"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-26"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-26"],"origin":"editorial"},
    "spots.b02-ome-log-mushrooms-uchinuma": {"sourceIds":["source-26"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-26"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-26"],"origin":"editorial"}
  }
};
