import type { JourneyRecord } from '../journey-record';

export const b13HachijoJerseyDairyRecord: JourneyRecord = {
  "municipalityId": "hachijo",
  "alcoholThemed": false,
  "journey": {
    "id": "b13-hachijo-jersey-dairy",
    "regionId": "hachijo",
    "foodCultureId": "hachijo-jersey-dairy",
    "storyId": "b13-hachijo-jersey-dairy",
    "routeId": "b13-hachijo-jersey-dairy-route",
    "copy": {"ja":{"title":"八丈のジャージー乳と甘味","subtitle":"八丈のジャージー乳と甘味","description":"乳製品と島素材の甘味を、二つの店の紹介から知る。","tags":["八丈町"],"storyTitle":"八丈のジャージー乳と甘味","intro":["乳製品と島素材の甘味を、二つの店の紹介から知る。","掲載内容は未確認です。訪問前に出典をご確認ください。"]},"en":{"title":"Hachijo Jersey dairy and desserts","subtitle":"Hachijo Jersey dairy and desserts","description":"Explore local dairy and island-ingredient desserts through two outlets.","tags":["Hachijo Town"],"storyTitle":"Hachijo Jersey dairy and desserts","intro":["Explore local dairy and island-ingredient desserts through two outlets.","This information is unconfirmed. Check the sources before visiting."]},"zh-TW":{"title":"八丈澤西乳品與甜點","subtitle":"八丈澤西乳品與甜點","description":"透過兩家店的介紹認識在地乳品與島產甜點。","tags":["八丈町"],"storyTitle":"八丈澤西乳品與甜點","intro":["透過兩家店的介紹認識在地乳品與島產甜點。","刊載內容尚未確認，造訪前請查看出處。"]}},
    "chapters": {"ja":[{"number":"01.","title":"八丈のジャージー乳と甘味","body":"観光協会は八丈島乳業のジャージー乳製品と直営カフェを紹介しています。ジャージーカフェにはジャージープリン、ジェラテリア365にはジャージー牛乳のソフトクリームや、明日葉・うみかぜ椎茸を使う島素材のフレーバーが紹介されています。"}],"en":[{"number":"01.","title":"Hachijo Jersey dairy and desserts","body":"The tourism association presents Hachijojima Nyugyo’s Jersey dairy products and outlets. It highlights Jersey pudding at Jersey Cafe and Jersey-milk soft serve plus ashitaba and Umikaze shiitake flavors at Gelateria 365."}],"zh-TW":[{"number":"01.","title":"八丈澤西乳品與甜點","body":"觀光協會介紹八丈島乳業的澤西乳製品與直營店，包括澤西咖啡館的布丁，以及 Gelateria 365 的澤西牛奶霜淇淋、明日葉與海風香菇風味冰品。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 180,
        "steps": [
          {
            "spotId": "b13-hachijo-jersey-dairy-jersey"
          },
          {
            "spotId": "b13-hachijo-jersey-dairy-gelato"
          }
        ]
      }
    ]
  },
  "routeName": {"ja":"八丈のジャージー乳と甘味","en":"Hachijo Jersey dairy and desserts","zh-TW":"八丈澤西乳品與甜點"},
  "location": {"ja":{"area":"八丈町","station":"","access":""},"en":{"area":"Hachijo Town","station":"","access":""},"zh-TW":{"area":"八丈町","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "ferry-terminal", "name": {"ja": "底土港", "en": "Sokodo Port", "zh-TW": "底土港"}, "spotId": "b13-hachijo-jersey-dairy-jersey", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b13-hachijo-jersey-dairy-jersey",
          "description": {"ja":"観光協会は八丈島乳業の直営カフェとジャージープリンを紹介しています。","en":"The tourism association presents this Hachijojima Nyugyo cafe and its Jersey pudding.","zh-TW":"觀光協會介紹八丈島乳業的直營咖啡館與澤西布丁。"},
          "note": {"ja":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。","en":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities.","zh-TW":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}
        },
        {
          "spotId": "b13-hachijo-jersey-dairy-gelato",
          "description": {"ja":"観光協会はジャージー牛乳や島産素材を使うアイスの店として紹介しています。","en":"The tourism association describes this shop’s Jersey-milk and island-ingredient frozen desserts.","zh-TW":"觀光協會介紹此店使用澤西牛奶與島產食材製作冰品。"},
          "note": {"ja":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。","en":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities.","zh-TW":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}
        }
      ],
      "stats": {"ja":{"time":"約180分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"},"en":{"time":"About 180 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"","access":"","caution":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."},"zh-TW":{"time":"約 180 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典をご確認ください。","en":"This information is unconfirmed. Check the sources before visiting.","zh-TW":"刊載內容尚未確認，造訪前請查看出處。"}
    }
  },
  "spots": {
    "b13-hachijo-jersey-dairy-jersey": {
      "presentation": {
        "id": "b13-hachijo-jersey-dairy-jersey",
        "regionId": "hachijo",
        "foodCultureId": "hachijo-jersey-dairy",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"八丈島ジャージーカフェ","lead":"観光協会は八丈島乳業の直営カフェとジャージープリンを紹介しています。","description":"観光協会は八丈島乳業の直営カフェとジャージープリンを紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典をご確認ください。","時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"]},"en":{"name":"Hachijojima Jersey Cafe","lead":"The tourism association presents this Hachijojima Nyugyo cafe and its Jersey pudding.","description":"The tourism association presents this Hachijojima Nyugyo cafe and its Jersey pudding.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the sources before visiting.","Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."]},"zh-TW":{"name":"八丈島澤西咖啡館","lead":"觀光協會介紹八丈島乳業的直營咖啡館與澤西布丁。","description":"觀光協會介紹八丈島乳業的直營咖啡館與澤西布丁。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 25 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認，造訪前請查看出處。","時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会は八丈島乳業の直営カフェとジャージープリンを紹介しています。","en":"The tourism association presents this Hachijojima Nyugyo cafe and its Jersey pudding.","zh-TW":"觀光協會介紹八丈島乳業的直營咖啡館與澤西布丁。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.hachijo.gr.jp/restaurant/jerseycafe/","en":"https://www.hachijo.gr.jp/restaurant/jerseycafe/","zh-TW":"https://www.hachijo.gr.jp/restaurant/jerseycafe/"}
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
        "name": "八丈島ジャージーカフェ - 八丈島観光協会",
        "url": "https://www.hachijo.gr.jp/restaurant/jerseycafe/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-25",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b13-hachijo-jersey-dairy-gelato": {
      "presentation": {
        "id": "b13-hachijo-jersey-dairy-gelato",
        "regionId": "hachijo",
        "foodCultureId": "hachijo-jersey-dairy",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"ジェラテリア365","lead":"観光協会はジャージー牛乳や島産素材を使うアイスの店として紹介しています。","description":"観光協会はジャージー牛乳や島産素材を使うアイスの店として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典をご確認ください。","時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"]},"en":{"name":"Gelateria 365","lead":"The tourism association describes this shop’s Jersey-milk and island-ingredient frozen desserts.","description":"The tourism association describes this shop’s Jersey-milk and island-ingredient frozen desserts.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the sources before visiting.","Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."]},"zh-TW":{"name":"Gelateria 365","lead":"觀光協會介紹此店使用澤西牛奶與島產食材製作冰品。","description":"觀光協會介紹此店使用澤西牛奶與島產食材製作冰品。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 25 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認，造訪前請查看出處。","時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会はジャージー牛乳や島産素材を使うアイスの店として紹介しています。","en":"The tourism association describes this shop’s Jersey-milk and island-ingredient frozen desserts.","zh-TW":"觀光協會介紹此店使用澤西牛奶與島產食材製作冰品。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.hachijo.gr.jp/restaurant/gelateria365/","en":"https://www.hachijo.gr.jp/restaurant/gelateria365/","zh-TW":"https://www.hachijo.gr.jp/restaurant/gelateria365/"}
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
        "name": "Gelateria365 - 八丈島観光協会",
        "url": "https://www.hachijo.gr.jp/restaurant/gelateria365/",
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
          "referenceId": "b13-hachijo-jersey-dairy-jersey",
          "spotId": "b13-hachijo-jersey-dairy-jersey",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"八丈島ジャージーカフェ","en":"Hachijojima Jersey Cafe","zh-TW":"八丈島澤西咖啡館"},
          "description": {"ja":"観光協会は八丈島乳業の直営カフェとジャージープリンを紹介しています。","en":"The tourism association presents this Hachijojima Nyugyo cafe and its Jersey pudding.","zh-TW":"觀光協會介紹八丈島乳業的直營咖啡館與澤西布丁。"}
        },
        {
          "referenceId": "b13-hachijo-jersey-dairy-gelato",
          "spotId": "b13-hachijo-jersey-dairy-gelato",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"ジェラテリア365","en":"Gelateria 365","zh-TW":"Gelateria 365"},
          "description": {"ja":"観光協会はジャージー牛乳や島産素材を使うアイスの店として紹介しています。","en":"The tourism association describes this shop’s Jersey-milk and island-ingredient frozen desserts.","zh-TW":"觀光協會介紹此店使用澤西牛奶與島產食材製作冰品。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八丈町","station":""},"en":{"region":"Hachijo Town","station":""},"zh-TW":{"region":"八丈町","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Hachijō tourism association – Hachijō Jersey Café", "url": "https://www.hachijo.gr.jp/restaurant/jerseycafe/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-13": {
      "name": "特産・名産品 - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/specials/specialty-products/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-9": {
      "name": "八丈島の甘味に舌鼓を - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/specials/local-sweets/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-19": {
      "name": "八丈島ジャージーカフェ - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/restaurant/jerseycafe/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-20": {
      "name": "Gelateria365 - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/restaurant/gelateria365/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b13 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://www.hachijo.gr.jp/restaurant/jerseycafe/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-13",
        "source-9"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-13",
        "source-9"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-13",
        "source-9"
      ],
      "origin": "editorial"
    },
    "spots.b13-hachijo-jersey-dairy-jersey": {
      "sourceIds": [
        "source-19"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-19"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-19"
      ],
      "origin": "editorial"
    },
    "spots.b13-hachijo-jersey-dairy-gelato": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "journey.copy": {
      "sourceIds": [
        "source-13",
        "source-9",
        "source-19",
        "source-20"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-13",
        "source-9",
        "source-19",
        "source-20"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-13",
        "source-9",
        "source-19",
        "source-20"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-13",
        "source-9",
        "source-19",
        "source-20"
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
