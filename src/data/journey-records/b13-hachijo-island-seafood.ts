import type { JourneyRecord } from '../journey-record';

export const b13HachijoIslandSeafoodRecord: JourneyRecord = {
  "municipalityId": "hachijo",
  "journey": {
    "id": "b13-hachijo-island-seafood",
    "regionId": "hachijo",
    "foodCultureId": "hachijo-island-seafood",
    "storyId": "b13-hachijo-island-seafood",
    "routeId": "b13-hachijo-island-seafood-route",
    "copy": {"ja":{"title":"八丈の島寿司と海の食卓","subtitle":"八丈の島寿司と海の食卓","description":"島寿司から家庭の海藻料理まで、海の食文化をたどる。","tags":["八丈町"],"storyTitle":"八丈の島寿司と海の食卓","intro":["島寿司から家庭の海藻料理まで、海の食文化をたどる。","掲載内容は未確認です。訪問前に出典をご確認ください。"]},"en":{"title":"Hachijo sushi and island seafood","subtitle":"Hachijo sushi and island seafood","description":"Explore island sushi and the wider seafood traditions around it.","tags":["Hachijo Town"],"storyTitle":"Hachijo sushi and island seafood","intro":["Explore island sushi and the wider seafood traditions around it.","This information is unconfirmed. Check the sources before visiting."]},"zh-TW":{"title":"八丈島壽司與海味餐桌","subtitle":"八丈島壽司與海味餐桌","description":"從島壽司認識島上海味與家常料理。","tags":["八丈町"],"storyTitle":"八丈島壽司與海味餐桌","intro":["從島壽司認識島上海味與家常料理。","刊載內容尚未確認，造訪前請查看出處。"]}},
    "chapters": {"ja":[{"number":"01.","title":"島寿司","body":"島寿司は、メダイやトビウオを醤油に漬け、わさびの代わりにからしを合わせる料理です。海藻を煮固めるブドは家庭ごとに具が異なります。都の紹介ではトビウオを刺身、島寿司、揚げ物などに使い、漁連はキンメダイやメダイの漁、血抜きしたカツオを青い樽に入れる「樽カツオ」を伝えています。"},{"number":"02.","title":"トビウオのさつま揚げ","body":"都の保健所資料には、トビウオのさつま揚げも八丈島の料理として載っています。"}],"en":[{"number":"01.","title":"Hachijojima island sushi","body":"The tourism association describes island sushi with soy-marinated medai or flying fish and mustard, and budo as a seaweed jelly with household variations. Tokyo documents flying fish in sashimi, sushi and fried dishes. The fisheries federation lists kinmedai and medai catches and describes taru-katsuo as individually caught, bled bonito placed in blue barrels."},{"number":"02.","title":"Flying-fish fishcakes","body":"Tokyo’s health-office guide also includes flying-fish satsuma-age fishcakes among Hachijo preparations."}],"zh-TW":[{"number":"01.","title":"八丈島壽司與海味餐桌","body":"觀光協會介紹以醬油醃漬鯛類或飛魚、搭配芥末的島壽司，以及各家配料不同的海藻凝凍布多。東京都記錄飛魚用於生魚片、壽司及炸物；漁聯則介紹金目鯛、鯛類漁獲，以及逐尾捕獲、放血後裝入藍桶的「樽鰹」。"},{"number":"02.","title":"八丈島壽司與海味餐桌","body":"東京都保健所資料也將飛魚炸魚餅列入八丈島料理。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 180,
        "steps": [
          {
            "spotId": "b13-hachijo-island-seafood-han"
          },
          {
            "spotId": "b13-hachijo-island-seafood-uohachiya"
          }
        ]
      }
    ]
  },
  "routeName": {"ja":"八丈の島寿司と海の食卓","en":"Hachijo sushi and island seafood","zh-TW":"八丈島壽司與海味餐桌"},
  "location": {"ja":{"area":"八丈町","station":"","access":""},"en":{"area":"Hachijo Town","station":"","access":""},"zh-TW":{"area":"八丈町","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "ferry-terminal", "name": {"ja": "底土港", "en": "Sokodo Port", "zh-TW": "底土港"}, "spotId": "b13-hachijo-island-seafood-han", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b13-hachijo-island-seafood-han",
          "description": {"ja":"観光協会の店案内に島寿司が載っています。","en":"The tourism association’s restaurant entry lists island sushi.","zh-TW":"觀光協會店家資料列有島壽司。"},
          "note": {"ja":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。","en":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities.","zh-TW":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}
        },
        {
          "spotId": "b13-hachijo-island-seafood-uohachiya",
          "description": {"ja":"観光協会は島寿司や明日葉天ぷらを紹介しています。","en":"The tourism association lists island sushi and ashitaba tempura here.","zh-TW":"觀光協會介紹此處的島壽司與明日葉天婦羅。"},
          "note": {"ja":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。","en":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities.","zh-TW":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}
        }
      ],
      "stats": {"ja":{"time":"約180分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"},"en":{"time":"About 180 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"","access":"","caution":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."},"zh-TW":{"time":"約 180 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典をご確認ください。","en":"This information is unconfirmed. Check the sources before visiting.","zh-TW":"刊載內容尚未確認，造訪前請查看出處。"}
    }
  },
  "spots": {
    "b13-hachijo-island-seafood-han": {
      "presentation": {
        "id": "b13-hachijo-island-seafood-han",
        "regionId": "hachijo",
        "foodCultureId": "hachijo-island-seafood",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"郷土・家庭料理のお店 繁","lead":"観光協会の店案内に島寿司が載っています。","description":"観光協会の店案内に島寿司が載っています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典をご確認ください。","時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"]},"en":{"name":"Han Traditional Home Cooking","lead":"The tourism association’s restaurant entry lists island sushi.","description":"The tourism association’s restaurant entry lists island sushi.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the sources before visiting.","Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."]},"zh-TW":{"name":"鄉土家庭料理 繁","lead":"觀光協會店家資料列有島壽司。","description":"觀光協會店家資料列有島壽司。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 25 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認，造訪前請查看出處。","時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会の店案内に島寿司が載っています。","en":"The tourism association’s restaurant entry lists island sushi.","zh-TW":"觀光協會店家資料列有島壽司。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.hachijo.gr.jp/restaurant/han/","en":"https://www.hachijo.gr.jp/restaurant/han/","zh-TW":"https://www.hachijo.gr.jp/restaurant/han/"}
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
        "name": "郷土・家庭料理のお店 繁【はん】 - 八丈島観光協会",
        "url": "https://www.hachijo.gr.jp/restaurant/han/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-25",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b13-hachijo-island-seafood-uohachiya": {
      "presentation": {
        "id": "b13-hachijo-island-seafood-uohachiya",
        "regionId": "hachijo",
        "foodCultureId": "hachijo-island-seafood",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"地魚処 魚八家","lead":"観光協会は島寿司や明日葉天ぷらを紹介しています。","description":"観光協会は島寿司や明日葉天ぷらを紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典をご確認ください。","時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"]},"en":{"name":"Uohachiya","lead":"The tourism association lists island sushi and ashitaba tempura here.","description":"The tourism association lists island sushi and ashitaba tempura here.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the sources before visiting.","Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."]},"zh-TW":{"name":"地魚處 魚八家","lead":"觀光協會介紹此處的島壽司與明日葉天婦羅。","description":"觀光協會介紹此處的島壽司與明日葉天婦羅。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 25 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認，造訪前請查看出處。","時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会は島寿司や明日葉天ぷらを紹介しています。","en":"The tourism association lists island sushi and ashitaba tempura here.","zh-TW":"觀光協會介紹此處的島壽司與明日葉天婦羅。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.hachijo.gr.jp/restaurant/uohachiya/","en":"https://www.hachijo.gr.jp/restaurant/uohachiya/","zh-TW":"https://www.hachijo.gr.jp/restaurant/uohachiya/"}
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
        "name": "地魚処 魚八家 - 八丈島観光協会",
        "url": "https://www.hachijo.gr.jp/restaurant/uohachiya/",
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
          "referenceId": "b13-hachijo-island-seafood-han",
          "spotId": "b13-hachijo-island-seafood-han",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"郷土・家庭料理のお店 繁","en":"Han Traditional Home Cooking","zh-TW":"鄉土家庭料理 繁"},
          "description": {"ja":"観光協会の店案内に島寿司が載っています。","en":"The tourism association’s restaurant entry lists island sushi.","zh-TW":"觀光協會店家資料列有島壽司。"}
        },
        {
          "referenceId": "b13-hachijo-island-seafood-uohachiya",
          "spotId": "b13-hachijo-island-seafood-uohachiya",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"地魚処 魚八家","en":"Uohachiya","zh-TW":"地魚處 魚八家"},
          "description": {"ja":"観光協会は島寿司や明日葉天ぷらを紹介しています。","en":"The tourism association lists island sushi and ashitaba tempura here.","zh-TW":"觀光協會介紹此處的島壽司與明日葉天婦羅。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八丈町","station":""},"en":{"region":"Hachijo Town","station":""},"zh-TW":{"region":"八丈町","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Hachijojima Tourism Association – Han", "url": "https://www.hachijo.gr.jp/restaurant/han/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-0": {
      "name": "ひとクセある、だからこそ箸が止まらない逸品たち - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/specials/local-dishes/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-16": {
      "name": "東京食材紹介２ | 島のくらし　栄養士用",
      "url": "https://sakana.metro.tokyo.lg.jp/shima_no_kurashi/eiyo/shokuzai-2.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-17": {
      "name": "島しょの漁業 - 東京都漁連水産物流通センター",
      "url": "https://www.tokyo-gyoren.or.jp/island/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-15": {
      "name": "保健所活動報告（八丈島版　食事バランスガイド）|トピックス|東京都島しょ保健所",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/shisetsu/jigyosyo/hokenjyo/tousyo/hachijou/katsudou/balanceguide",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-1": {
      "name": "郷土・家庭料理のお店 繁【はん】 - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/restaurant/han/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-2": {
      "name": "地魚処 魚八家 - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/restaurant/uohachiya/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b13 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://www.hachijo.gr.jp/restaurant/han/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-0",
        "source-16",
        "source-17"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-0",
        "source-16",
        "source-17"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-0",
        "source-16",
        "source-17"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-15"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-15"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-15"
      ],
      "origin": "editorial"
    },
    "spots.b13-hachijo-island-seafood-han": {
      "sourceIds": [
        "source-1"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-1"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-1"
      ],
      "origin": "editorial"
    },
    "spots.b13-hachijo-island-seafood-uohachiya": {
      "sourceIds": [
        "source-2"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-2"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-2"
      ],
      "origin": "editorial"
    },
    "journey.copy": {
      "sourceIds": [
        "source-0",
        "source-16",
        "source-17",
        "source-15",
        "source-1",
        "source-2"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-0",
        "source-16",
        "source-17",
        "source-15",
        "source-1",
        "source-2"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-0",
        "source-16",
        "source-17",
        "source-15",
        "source-1",
        "source-2"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-0",
        "source-16",
        "source-17",
        "source-15",
        "source-1",
        "source-2"
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
