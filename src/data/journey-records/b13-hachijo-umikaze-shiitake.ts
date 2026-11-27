import type { JourneyRecord } from '../journey-record';

export const b13HachijoUmikazeShiitakeRecord: JourneyRecord = {
  "municipalityId": "hachijo",
  "journey": {
    "id": "b13-hachijo-umikaze-shiitake",
    "regionId": "hachijo",
    "foodCultureId": "hachijo-umikaze-shiitake",
    "storyId": "b13-hachijo-umikaze-shiitake",
    "routeId": "b13-hachijo-umikaze-shiitake-route",
    "copy": {"ja":{"title":"八丈のうみかぜ椎茸","subtitle":"八丈のうみかぜ椎茸","description":"大竜ファームの紹介から、島の椎茸づくりを知る。","tags":["八丈町"],"storyTitle":"八丈のうみかぜ椎茸","intro":["大竜ファームの紹介から、島の椎茸づくりを知る。","掲載内容は未確認です。訪問前に出典をご確認ください。"]},"en":{"title":"Hachijo Umikaze shiitake","subtitle":"Hachijo Umikaze shiitake","description":"Meet island mushroom growing through Dairyu Farm’s introduction.","tags":["Hachijo Town"],"storyTitle":"Hachijo Umikaze shiitake","intro":["Meet island mushroom growing through Dairyu Farm’s introduction.","This information is unconfirmed. Check the sources before visiting."]},"zh-TW":{"title":"八丈海風香菇","subtitle":"八丈海風香菇","description":"從大龍農園的介紹認識島上香菇栽培。","tags":["八丈町"],"storyTitle":"八丈海風香菇","intro":["從大龍農園的介紹認識島上香菇栽培。","刊載內容尚未確認，造訪前請查看出處。"]}},
    "chapters": {"ja":[{"number":"01.","title":"八丈のうみかぜ椎茸","body":"観光協会は大竜ファームを「うみかぜ椎茸」の生産農園として紹介し、国産菌床を使う栽培や農園での収穫体験について説明しています。"}],"en":[{"number":"01.","title":"Hachijo Umikaze shiitake","body":"The tourism association identifies Dairyu Farm as the producer of Umikaze shiitake, describing Japanese growing blocks and a farm-based harvesting experience."}],"zh-TW":[{"number":"01.","title":"八丈海風香菇","body":"觀光協會介紹大龍農園為「海風香菇」生產者，記錄其使用日本產菌床，並介紹農園的採菇體驗。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {
            "spotId": "b13-hachijo-umikaze-shiitake-dairyu"
          }
        ]
      }
    ]
  },
  "routeName": {"ja":"八丈のうみかぜ椎茸","en":"Hachijo Umikaze shiitake","zh-TW":"八丈海風香菇"},
  "location": {"ja":{"area":"八丈町","station":"","access":""},"en":{"area":"Hachijo Town","station":"","access":""},"zh-TW":{"area":"八丈町","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "ferry-terminal", "name": {"ja": "底土港", "en": "Sokodo Port", "zh-TW": "底土港"}, "spotId": "b13-hachijo-umikaze-shiitake-dairyu", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b13-hachijo-umikaze-shiitake-dairyu",
          "description": {"ja":"観光協会がうみかぜ椎茸の生産農園として紹介しています。","en":"The tourism association identifies this farm as the producer of Umikaze shiitake.","zh-TW":"觀光協會介紹此農園生產海風香菇。"},
          "note": {"ja":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。","en":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities.","zh-TW":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}
        }
      ],
      "stats": {"ja":{"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"},"en":{"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stop","station":"","minutes":"","access":"","caution":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."},"zh-TW":{"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典をご確認ください。","en":"This information is unconfirmed. Check the sources before visiting.","zh-TW":"刊載內容尚未確認，造訪前請查看出處。"}
    }
  },
  "spots": {
    "b13-hachijo-umikaze-shiitake-dairyu": {
      "presentation": {
        "id": "b13-hachijo-umikaze-shiitake-dairyu",
        "regionId": "hachijo",
        "foodCultureId": "hachijo-umikaze-shiitake",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"大竜ファーム","lead":"観光協会がうみかぜ椎茸の生産農園として紹介しています。","description":"観光協会がうみかぜ椎茸の生産農園として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典をご確認ください。","時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"]},"en":{"name":"Dairyu Farm","lead":"The tourism association identifies this farm as the producer of Umikaze shiitake.","description":"The tourism association identifies this farm as the producer of Umikaze shiitake.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the sources before visiting.","Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."]},"zh-TW":{"name":"大龍農園","lead":"觀光協會介紹此農園生產海風香菇。","description":"觀光協會介紹此農園生產海風香菇。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 25 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認，造訪前請查看出處。","時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会がうみかぜ椎茸の生産農園として紹介しています。","en":"The tourism association identifies this farm as the producer of Umikaze shiitake.","zh-TW":"觀光協會介紹此農園生產海風香菇。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.hachijo.gr.jp/goods/dairyufarm/","en":"https://www.hachijo.gr.jp/goods/dairyufarm/","zh-TW":"https://www.hachijo.gr.jp/goods/dairyufarm/"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 25 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [
          {"ja":"掲載内容は未確認です。訪問前に出典をご確認ください。","en":"This information is unconfirmed. Check the sources before visiting.","zh-TW":"刊載內容尚未確認，造訪前請查看出處。"},
          {"ja":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。","en":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities.","zh-TW":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}
        ]
      },
      "officialSource": {
        "name": "大竜ファーム - 八丈島観光協会",
        "url": "https://www.hachijo.gr.jp/goods/dairyufarm/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-25",
        "verificationStatus": "needs_confirmation"
      }
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b13-hachijo-umikaze-shiitake-dairyu",
          "spotId": "b13-hachijo-umikaze-shiitake-dairyu",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"大竜ファーム","en":"Dairyu Farm","zh-TW":"大龍農園"},
          "description": {"ja":"観光協会がうみかぜ椎茸の生産農園として紹介しています。","en":"The tourism association identifies this farm as the producer of Umikaze shiitake.","zh-TW":"觀光協會介紹此農園生產海風香菇。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八丈町","station":""},"en":{"region":"Hachijo Town","station":""},"zh-TW":{"region":"八丈町","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Hachijō tourism association – Dairyu Farm", "url": "https://www.hachijo.gr.jp/?p=5366", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-18": {
      "name": "大竜ファーム - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/goods/dairyufarm/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b13 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://www.hachijo.gr.jp/goods/dairyufarm/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-18"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-18"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-18"
      ],
      "origin": "editorial"
    },
    "spots.b13-hachijo-umikaze-shiitake-dairyu": {
      "sourceIds": [
        "source-18"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-18"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-18"
      ],
      "origin": "editorial"
    },
    "journey.copy": {
      "sourceIds": [
        "source-18"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-18"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-18"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-18"
      ],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": [
        "editorial"
      ],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": [
        "editorial"
      ],
      "origin": "editorial"
    }
  }
};
