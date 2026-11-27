import type { JourneyRecord } from '../journey-record';

export const b13HachijoAshitabaRecord: JourneyRecord = {
  "municipalityId": "hachijo",
  "journey": {
    "id": "b13-hachijo-ashitaba",
    "regionId": "hachijo",
    "foodCultureId": "hachijo-ashitaba",
    "storyId": "b13-hachijo-ashitaba",
    "routeId": "b13-hachijo-ashitaba-route",
    "copy": {"ja":{"title":"八丈の明日葉、料理からお菓子へ","subtitle":"八丈の明日葉、料理からお菓子へ","description":"葉の食文化と、茶や菓子への広がりを知る。","tags":["八丈町"],"storyTitle":"八丈の明日葉、料理からお菓子へ","intro":["葉の食文化と、茶や菓子への広がりを知る。","掲載内容は未確認です。訪問前に出典をご確認ください。"]},"en":{"title":"Hachijo ashitaba from dishes to sweets","subtitle":"Hachijo ashitaba from dishes to sweets","description":"Follow ashitaba through household dishes, drinks and sweets.","tags":["Hachijo Town"],"storyTitle":"Hachijo ashitaba from dishes to sweets","intro":["Follow ashitaba through household dishes, drinks and sweets.","This information is unconfirmed. Check the sources before visiting."]},"zh-TW":{"title":"八丈明日葉，從料理到甜點","subtitle":"八丈明日葉，從料理到甜點","description":"認識明日葉在家常菜、飲品與甜點的變化。","tags":["八丈町"],"storyTitle":"八丈明日葉，從料理到甜點","intro":["認識明日葉在家常菜、飲品與甜點的變化。","刊載內容尚未確認，造訪前請查看出處。"]}},
    "chapters": {"ja":[{"number":"01.","title":"明日葉","body":"JAは、昔から食べられてきた明日葉が市場にも流通し、お茶や青汁にも使われると説明しています。東京都の紹介には、天ぷら、おひたし、ごま和え、煮物という調理法が載っています。"},{"number":"02.","title":"明日葉チーズケーキ","body":"観光協会は空間舎の明日葉チーズケーキや、明日葉を使う土産菓子を紹介しています。保健所の資料には、明日葉とくさやをマヨネーズで和える料理も記録されています。"}],"en":[{"number":"01.","title":"Ashitaba","body":"JA describes ashitaba as a long-used island food now distributed to markets and processed into tea and green drinks. Tokyo lists tempura, blanched greens, sesame dressing and simmered dishes among its preparations."},{"number":"02.","title":"Ashitaba cheesecake","body":"The tourism association introduces Kukansha’s ashitaba cheesecake and packaged ashitaba sweets. The health office records another combination: ashitaba and kusaya dressed with mayonnaise."}],"zh-TW":[{"number":"01.","title":"八丈明日葉，從料理到甜點","body":"農協介紹明日葉原為島上長期食用的蔬菜，現也供應市場、製成茶與青汁。東京都列出的吃法包括天婦羅、汆燙、芝麻拌菜及燉煮。"},{"number":"02.","title":"八丈明日葉，從料理到甜點","body":"觀光協會介紹空間舍的明日葉起司蛋糕及明日葉伴手禮；保健所也記錄以美乃滋拌明日葉與臭魚乾的料理。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 180,
        "steps": [
          {
            "spotId": "b13-hachijo-ashitaba-uohachiya"
          },
          {
            "spotId": "b13-hachijo-ashitaba-kukansha"
          }
        ]
      }
    ]
  },
  "routeName": {"ja":"八丈の明日葉、料理からお菓子へ","en":"Hachijo ashitaba from dishes to sweets","zh-TW":"八丈明日葉，從料理到甜點"},
  "location": {"ja":{"area":"八丈町","station":"","access":""},"en":{"area":"Hachijo Town","station":"","access":""},"zh-TW":{"area":"八丈町","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "ferry-terminal", "name": {"ja": "底土港", "en": "Sokodo Port", "zh-TW": "底土港"}, "spotId": "b13-hachijo-ashitaba-uohachiya", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b13-hachijo-ashitaba-uohachiya",
          "description": {"ja":"観光協会は島寿司や明日葉天ぷらを紹介しています。","en":"The tourism association lists island sushi and ashitaba tempura here.","zh-TW":"觀光協會介紹此處的島壽司與明日葉天婦羅。"},
          "note": {"ja":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。","en":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities.","zh-TW":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}
        },
        {
          "spotId": "b13-hachijo-ashitaba-kukansha",
          "description": {"ja":"観光協会は明日葉チーズケーキと生パッションフルーツのかき氷を紹介しています。","en":"The tourism association describes ashitaba cheesecake and fresh passion-fruit shaved ice here.","zh-TW":"觀光協會介紹此處的明日葉起司蛋糕與鮮百香果刨冰。"},
          "note": {"ja":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。","en":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities.","zh-TW":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}
        }
      ],
      "stats": {"ja":{"time":"約180分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"},"en":{"time":"About 180 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"","access":"","caution":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."},"zh-TW":{"time":"約 180 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典をご確認ください。","en":"This information is unconfirmed. Check the sources before visiting.","zh-TW":"刊載內容尚未確認，造訪前請查看出處。"}
    }
  },
  "spots": {
    "b13-hachijo-ashitaba-uohachiya": {
      "presentation": {
        "id": "b13-hachijo-ashitaba-uohachiya",
        "regionId": "hachijo",
        "foodCultureId": "hachijo-ashitaba",
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
    },
    "b13-hachijo-ashitaba-kukansha": {
      "presentation": {
        "id": "b13-hachijo-ashitaba-kukansha",
        "regionId": "hachijo",
        "foodCultureId": "hachijo-ashitaba",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"空間舎 in Long Beach 1983","lead":"観光協会は明日葉チーズケーキと生パッションフルーツのかき氷を紹介しています。","description":"観光協会は明日葉チーズケーキと生パッションフルーツのかき氷を紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典をご確認ください。","時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"]},"en":{"name":"Kukansha in Long Beach 1983","lead":"The tourism association describes ashitaba cheesecake and fresh passion-fruit shaved ice here.","description":"The tourism association describes ashitaba cheesecake and fresh passion-fruit shaved ice here.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the sources before visiting.","Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."]},"zh-TW":{"name":"空間舍 in Long Beach 1983","lead":"觀光協會介紹此處的明日葉起司蛋糕與鮮百香果刨冰。","description":"觀光協會介紹此處的明日葉起司蛋糕與鮮百香果刨冰。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 25 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認，造訪前請查看出處。","時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会は明日葉チーズケーキと生パッションフルーツのかき氷を紹介しています。","en":"The tourism association describes ashitaba cheesecake and fresh passion-fruit shaved ice here.","zh-TW":"觀光協會介紹此處的明日葉起司蛋糕與鮮百香果刨冰。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.hachijo.gr.jp/restaurant/kukansya/","en":"https://www.hachijo.gr.jp/restaurant/kukansya/","zh-TW":"https://www.hachijo.gr.jp/restaurant/kukansya/"}
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
        "name": "空間舎 in Long Beach 1983 - 八丈島観光協会",
        "url": "https://www.hachijo.gr.jp/restaurant/kukansya/",
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
          "referenceId": "b13-hachijo-ashitaba-uohachiya",
          "spotId": "b13-hachijo-ashitaba-uohachiya",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"地魚処 魚八家","en":"Uohachiya","zh-TW":"地魚處 魚八家"},
          "description": {"ja":"観光協会は島寿司や明日葉天ぷらを紹介しています。","en":"The tourism association lists island sushi and ashitaba tempura here.","zh-TW":"觀光協會介紹此處的島壽司與明日葉天婦羅。"}
        },
        {
          "referenceId": "b13-hachijo-ashitaba-kukansha",
          "spotId": "b13-hachijo-ashitaba-kukansha",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"空間舎 in Long Beach 1983","en":"Kukansha in Long Beach 1983","zh-TW":"空間舍 in Long Beach 1983"},
          "description": {"ja":"観光協会は明日葉チーズケーキと生パッションフルーツのかき氷を紹介しています。","en":"The tourism association describes ashitaba cheesecake and fresh passion-fruit shaved ice here.","zh-TW":"觀光協會介紹此處的明日葉起司蛋糕與鮮百香果刨冰。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八丈町","station":""},"en":{"region":"Hachijo Town","station":""},"zh-TW":{"region":"八丈町","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Hachijojima Tourism Association – Uohachiya", "url": "https://www.hachijo.gr.jp/restaurant/uohachiya/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-6": {
      "name": "JA八丈島農協 | 特産品の農産物 |",
      "url": "https://www.jahachijo.jp/information/tokusan.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-8": {
      "name": "八丈島の観光｜東京都環境局 東京の自然公園",
      "url": "https://www.kankyo1.metro.tokyo.lg.jp/naturepark/know/park/introduction/kokuritsu/fujihakone/hatijojima/tourism.html",
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
    "source-11": {
      "name": "グルメも喜ぶ八丈島特産品をお土産に - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/specials/souvenir/",
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
    "source-2": {
      "name": "地魚処 魚八家 - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/restaurant/uohachiya/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-10": {
      "name": "空間舎 in Long Beach 1983 - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/restaurant/kukansya/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b13 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://www.hachijo.gr.jp/restaurant/uohachiya/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-6",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-6",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-6",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-9",
        "source-11",
        "source-15"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-9",
        "source-11",
        "source-15"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-9",
        "source-11",
        "source-15"
      ],
      "origin": "editorial"
    },
    "spots.b13-hachijo-ashitaba-uohachiya": {
      "sourceIds": [
        "source-2"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-2"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-2"
      ],
      "origin": "editorial"
    },
    "spots.b13-hachijo-ashitaba-kukansha": {
      "sourceIds": [
        "source-10"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-10"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-10"
      ],
      "origin": "editorial"
    },
    "journey.copy": {
      "sourceIds": [
        "source-6",
        "source-8",
        "source-9",
        "source-11",
        "source-15",
        "source-2",
        "source-10"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-6",
        "source-8",
        "source-9",
        "source-11",
        "source-15",
        "source-2",
        "source-10"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-6",
        "source-8",
        "source-9",
        "source-11",
        "source-15",
        "source-2",
        "source-10"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-6",
        "source-8",
        "source-9",
        "source-11",
        "source-15",
        "source-2",
        "source-10"
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
