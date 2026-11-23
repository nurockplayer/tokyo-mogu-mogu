import type { JourneyRecord } from '../journey-record';

export const b02MitakaWheatBeerRecord: JourneyRecord = {
  "municipalityId": "mitaka",
  "journey": {
    "id": "b02-mitaka-wheat-beer",
    "regionId": "mitaka",
    "foodCultureId": "mitaka-wheat-beer",
    "storyId": "b02-mitaka-wheat-beer",
    "routeId": "b02-mitaka-wheat-beer-route",
    "copy": {
      "ja": {"title":"三鷹産小麦とクラフトビール","subtitle":"三鷹産小麦とクラフトビール","description":"農産物と醸造を結ぶOGA BREWINGの記録。","tags":["三鷹市"],"storyTitle":"三鷹産小麦とクラフトビール","intro":["農産物と醸造を結ぶOGA BREWINGの記録。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Mitaka wheat and craft beer",
        "subtitle": "Mitaka wheat and craft beer",
        "description": "Read about OGA BREWING’s link between local crops and brewing.",
        "tags": ["Mitaka"],
        "storyTitle": "Mitaka wheat and craft beer",
        "intro": ["Read about OGA BREWING’s link between local crops and brewing.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"三鷹小麥與精釀啤酒","subtitle":"三鷹小麥與精釀啤酒","description":"從 OGA BREWING 認識農作物與釀造的連結。","tags":["三鷹市"],"storyTitle":"三鷹小麥與精釀啤酒","intro":["從 OGA BREWING 認識農作物與釀造的連結。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"小麦から生まれたビール","body":"市の発表では、OGA BREWINGは2019年に市内初のクラフトビール醸造所として開業し、三鷹産小麦を50％使うM.C MITAKAさんを製造してきました。"}],
      "en": [{"number":"01.","title":"A beer made with local wheat","body":"The city reports that OGA BREWING opened in 2019 as Mitaka’s first craft brewery and developed M.C MITAKA-san using 50 percent Mitaka-grown wheat."}],
      "zh-TW": [{"number":"01.","title":"以在地小麥製成的啤酒","body":"市府資料記載 OGA BREWING 於 2019 年成為市內首家精釀啤酒廠，並製作使用 50% 三鷹小麥的 M.C MITAKA-san。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b02-mitaka-wheat-beer-oga"}]}]
  },
  "routeName": {"ja":"三鷹産小麦とクラフトビール","en":"Mitaka wheat and craft beer","zh-TW":"三鷹小麥與精釀啤酒"},
  "location": {"ja":{"area":"三鷹市","station":"","access":""},"en":{"area":"Mitaka","station":"","access":""},"zh-TW":{"area":"三鷹市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b02-mitaka-wheat-beer-oga",
          "description": {"ja":"市が三鷹産小麦のビールの作り手として紹介する醸造所です。","en":"The city identifies this brewer with beer made using Mitaka-grown wheat.","zh-TW":"市府介紹此釀酒業者使用三鷹種植的小麥製作啤酒。"},
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
    "b02-mitaka-wheat-beer-oga": {
      "presentation": {
        "id": "b02-mitaka-wheat-beer-oga",
        "regionId": "mitaka",
        "foodCultureId": "mitaka-wheat-beer",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"OGA BREWING","lead":"市が三鷹産小麦のビールの作り手として紹介する醸造所です。","description":"市が三鷹産小麦のビールの作り手として紹介する醸造所です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "OGA BREWING",
            "lead": "The city identifies this brewer with beer made using Mitaka-grown wheat.",
            "description": "The city identifies this brewer with beer made using Mitaka-grown wheat.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"OGA BREWING","lead":"市府介紹此釀酒業者使用三鷹種植的小麥製作啤酒。","description":"市府介紹此釀酒業者使用三鷹種植的小麥製作啤酒。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市が三鷹産小麦のビールの作り手として紹介する醸造所です。","en":"The city identifies this brewer with beer made using Mitaka-grown wheat.","zh-TW":"市府介紹此釀酒業者使用三鷹種植的小麥製作啤酒。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.city.mitaka.lg.jp/c_press/107/107987.html","en":"https://www.city.mitaka.lg.jp/c_press/107/107987.html","zh-TW":"https://www.city.mitaka.lg.jp/c_press/107/107987.html"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"三鷹市 — 三鷹のクラフトビール「M.C KIWI」を新発売！","url":"https://www.city.mitaka.lg.jp/c_press/107/107987.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [{"referenceId":"b02-mitaka-wheat-beer-oga","spotId":"b02-mitaka-wheat-beer-oga","badgeColor":"#E98A1C","badge":{"ja":"OGA BREWING","en":"OGA BREWING","zh-TW":"OGA BREWING"},"description":{"ja":"市が三鷹産小麦のビールの作り手として紹介する醸造所です。","en":"The city identifies this brewer with beer made using Mitaka-grown wheat.","zh-TW":"市府介紹此釀酒業者使用三鷹種植的小麥製作啤酒。"}}],
      "nature": []
    },
    "location": {"ja":{"region":"三鷹市","station":""},"en":{"region":"Mitaka","station":""},"zh-TW":{"region":"三鷹市","station":""}}
  },
  "sources": {
    "source-11": {"name":"三鷹市 — 三鷹のクラフトビール「M.C KIWI」を新発売！","url":"https://www.city.mitaka.lg.jp/c_press/107/107987.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.city.mitaka.lg.jp/c_press/107/107987.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-11"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-11"],"origin":"editorial"},
    "location": {"sourceIds":["source-11"],"origin":"editorial"},
    "story": {"sourceIds":["source-11"],"origin":"editorial"},
    "spots": {"sourceIds":["source-11"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-11"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-11"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-11"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-11"],"origin":"editorial"},
    "spots.b02-mitaka-wheat-beer-oga": {"sourceIds":["source-11"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-11"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-11"],"origin":"editorial"}
  }
};
