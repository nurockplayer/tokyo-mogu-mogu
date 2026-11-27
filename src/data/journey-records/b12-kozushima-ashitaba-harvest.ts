import type { JourneyRecord } from '../journey-record';

export const b12KozushimaAshitabaHarvestRecord: JourneyRecord = {
  "municipalityId": "kozushima",
  "alcoholThemed": false,
  "journey": {
    "id": "b12-kozushima-ashitaba-harvest",
    "regionId": "kozushima",
    "foodCultureId": "b12-kozushima-ashitaba-harvest",
    "storyId": "b12-kozushima-ashitaba-harvest",
    "routeId": "b12-kozushima-ashitaba-harvest-route",
    "copy": {
      "ja": {
        "title": "神津島の明日葉と畑の味",
        "subtitle": "神津島の明日葉と畑の味",
        "description": "村は明日葉の吸い物、天ぷら、おひたしを紹介。黒潮商会には明日葉そば、都の紹介には浜の家の明日葉シフォンケーキと美家古寿しのあしたば巻きが登場します。",
        "tags": [
          "神津島村"
        ],
        "storyTitle": "神津島の明日葉と畑の味",
        "intro": [
          "村は明日葉の吸い物、天ぷら、おひたしを紹介。黒潮商会には明日葉そば、都の紹介には浜の家の明日葉シフォンケーキと美家古寿しのあしたば巻きが登場します。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。",
          "来島前に船・航空の最新の運航状況をご確認ください。"
        ]
      },
      "en": {
        "title": "Kozushima ashitaba and field flavors",
        "subtitle": "Kozushima ashitaba and field flavors",
        "description": "The village describes ashitaba in soup, tempura and dressed greens. Other accounts introduce Kuroshio Shokai’s ashitaba soba, Hamanoie’s ashitaba chiffon cake and Miyako-zushi’s ashitaba rolls.",
        "tags": [
          "Kozushima Village"
        ],
        "storyTitle": "Kozushima ashitaba and field flavors",
        "intro": [
          "The village describes ashitaba in soup, tempura and dressed greens. Other accounts introduce Kuroshio Shokai’s ashitaba soba, Hamanoie’s ashitaba chiffon cake and Miyako-zushi’s ashitaba rolls.",
          "This information is unconfirmed. Check the source information before visiting.",
          "Check current sea and air access before visiting the island."
        ]
      },
      "zh-TW": {
        "title": "神津島明日葉與田間滋味",
        "subtitle": "神津島明日葉與田間滋味",
        "description": "村方介紹明日葉清湯、天婦羅與涼拌菜。其他資料記載黑潮商會的明日葉蕎麥麵、濱之家明日葉戚風蛋糕，以及美家古壽司的明日葉卷。",
        "tags": [
          "神津島村"
        ],
        "storyTitle": "神津島明日葉與田間滋味",
        "intro": [
          "村方介紹明日葉清湯、天婦羅與涼拌菜。其他資料記載黑潮商會的明日葉蕎麥麵、濱之家明日葉戚風蛋糕，以及美家古壽司的明日葉卷。",
          "刊載內容尚未確認。造訪前請查看出處資訊。",
          "前往島嶼前，請確認最新海空交通狀況。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "葉を料理へ",
          "body": "村は明日葉の吸い物、天ぷら、おひたしを紹介。黒潮商会には明日葉そば、都の紹介には浜の家の明日葉シフォンケーキと美家古寿しのあしたば巻きが登場します。"
        },
        {
          "number": "02.",
          "title": "畑の辛み",
          "body": "村の2024年特産品イベント記録には、島とうがらしと島とーおいるが登場します。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "Greens in island cooking",
          "body": "The village describes ashitaba in soup, tempura and dressed greens. Other accounts introduce Kuroshio Shokai’s ashitaba soba, Hamanoie’s ashitaba chiffon cake and Miyako-zushi’s ashitaba rolls."
        },
        {
          "number": "02.",
          "title": "A field-grown accent",
          "body": "The village’s 2024 specialty-event record includes island chili peppers and Shima To Oil."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "島嶼料理中的綠葉",
          "body": "村方介紹明日葉清湯、天婦羅與涼拌菜。其他資料記載黑潮商會的明日葉蕎麥麵、濱之家明日葉戚風蛋糕，以及美家古壽司的明日葉卷。"
        },
        {
          "number": "02.",
          "title": "田間的辛香",
          "body": "村方的 2024 年特產活動記錄列有島辣椒與 Shima To Oil。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 180,
        "steps": [
          {
            "spotId": "b12-kozushima-ashitaba-harvest-kuroshio"
          },
          {
            "spotId": "b12-kozushima-ashitaba-harvest-hamanoie"
          }
        ]
      }
    ]
  },
  "routeName": { "ja": "神津島の明日葉と畑の味", "en": "Kozushima ashitaba and field flavors", "zh-TW": "神津島明日葉與田間滋味" },
  "location": {
    "ja": {
      "area": "神津島村",
      "station": "",
      "access": ""
    },
    "en": {
      "area": "Kozushima Village",
      "station": "",
      "access": ""
    },
    "zh-TW": {
      "area": "神津島村",
      "station": "",
      "access": ""
    }
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "ferry-terminal", "name": {"ja": "前浜（神津島）港船客待合所", "en": "Maehama (Kozushima) Port passenger terminal", "zh-TW": "前濱（神津島）港旅客候船室"}, "spotId": "b12-kozushima-ashitaba-harvest-kuroshio", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b12-kozushima-ashitaba-harvest-kuroshio",
          "description": { "ja": "観光協会が明日葉そばを紹介する土産店。", "en": "A souvenir shop whose tourism listing includes ashitaba soba.", "zh-TW": "觀光協會介紹中列有明日葉蕎麥麵的伴手禮店。" },
          "note": { "ja": "時間と順序は編集上の目安です。島内の交通と経路は各自ご確認ください。訪問先で本文の全料理を体験できることを意味しません。", "en": "Timing and order are editorial estimates. Check island transport and directions. Stops do not necessarily offer every dish described.", "zh-TW": "時間與順序為編輯估計，請自行確認島內交通及路線。停留點不一定提供文中所有菜餚。" }
        },
        {
          "spotId": "b12-kozushima-ashitaba-harvest-hamanoie",
          "description": { "ja": "都の特集で明日葉シフォンケーキが紹介された宿。", "en": "An inn featured with ashitaba chiffon cake in Tokyo’s island guide.", "zh-TW": "東京都特輯介紹其明日葉戚風蛋糕的旅宿。" },
          "note": { "ja": "時間と順序は編集上の目安です。島内の交通と経路は各自ご確認ください。訪問先で本文の全料理を体験できることを意味しません。", "en": "Timing and order are editorial estimates. Check island transport and directions. Stops do not necessarily offer every dish described.", "zh-TW": "時間與順序為編輯估計，請自行確認島內交通及路線。停留點不一定提供文中所有菜餚。" }
        }
      ],
      "stats": {
        "ja": {
          "time": "約180分（編集目安）",
          "distance": "",
          "spots": "2 か所",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "来島前に船・航空の最新の運航状況をご確認ください。 時間と順序は編集上の目安です。島内の交通と経路は各自ご確認ください。訪問先で本文の全料理を体験できることを意味しません。"
        },
        "en": {
          "time": "About 180 min (editorial estimate)",
          "distance": "",
          "spots": "2 stops",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "Check current sea and air access before visiting the island. Timing and order are editorial estimates. Check island transport and directions. Stops do not necessarily offer every dish described."
        },
        "zh-TW": {
          "time": "約 180 分鐘（編輯估計）",
          "distance": "",
          "spots": "2 處",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "前往島嶼前，請確認最新海空交通狀況。 時間與順序為編輯估計，請自行確認島內交通及路線。停留點不一定提供文中所有菜餚。"
        }
      },
      "guidance": { "ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。 来島前に船・航空の最新の運航状況をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting. Check current sea and air access before visiting the island.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。 前往島嶼前，請確認最新海空交通狀況。" }
    }
  },
  "spots": {
    "b12-kozushima-ashitaba-harvest-kuroshio": {
      "visitorSourceId": "admission-access",
      "presentation": {
        "id": "b12-kozushima-ashitaba-harvest-kuroshio",
        "regionId": "kozushima",
        "foodCultureId": "b12-kozushima-ashitaba-harvest",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "黒潮商会",
            "lead": "観光協会が明日葉そばを紹介する土産店。",
            "description": "観光協会が明日葉そばを紹介する土産店。",
            "tags": [],
            "practicalInfo": [
              {
                "label": "確認状態",
                "value": "2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。"
              }
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。",
              "来島前に船・航空の最新の運航状況をご確認ください。"
            ]
          },
          "en": {
            "name": "Kuroshio Shokai",
            "lead": "A souvenir shop whose tourism listing includes ashitaba soba.",
            "description": "A souvenir shop whose tourism listing includes ashitaba soba.",
            "tags": [],
            "practicalInfo": [
              {
                "label": "Verification",
                "value": "Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending."
              }
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting.",
              "Check current sea and air access before visiting the island."
            ]
          },
          "zh-TW": {
            "name": "黑潮商會",
            "lead": "觀光協會介紹中列有明日葉蕎麥麵的伴手禮店。",
            "description": "觀光協會介紹中列有明日葉蕎麥麵的伴手禮店。",
            "tags": [],
            "practicalInfo": [
              {
                "label": "確認狀態",
                "value": "2026年11月25日（JST）取得出處，尚待相關人員確認。"
              }
            ],
            "caution": [
              "刊載內容尚未確認。造訪前請查看出處資訊。",
              "前往島嶼前，請確認最新海空交通狀況。"
            ]
          }
        }
      },
      "detail": {
        "tags": [],
        "description": { "ja": "観光協会が明日葉そばを紹介する土産店。", "en": "A souvenir shop whose tourism listing includes ashitaba soba.", "zh-TW": "觀光協會介紹中列有明日葉蕎麥麵的伴手禮店。" },
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": { "ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊" },
            "value": { "ja": "https://kozushima.com/shop/kau/miyage/889/", "en": "https://kozushima.com/shop/kau/miyage/889/", "zh-TW": "https://kozushima.com/shop/kau/miyage/889/" }
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": { "ja": "確認状態", "en": "Verification", "zh-TW": "確認狀態" },
            "value": { "ja": "2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。", "en": "Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending.", "zh-TW": "2026年11月25日（JST）取得出處，尚待相關人員確認。" }
          }
        ],
        "caution": [
          { "ja": "来島前に船・航空の最新の運航状況をご確認ください。", "en": "Check current sea and air access before visiting the island.", "zh-TW": "前往島嶼前，請確認最新海空交通狀況。" }
        ]
      },
      "officialSource": {
        "name": "黒潮商会｜神津島観光ガイド公式サイト",
        "url": "https://kozushima.com/shop/kau/miyage/889/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-25",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b12-kozushima-ashitaba-harvest-hamanoie": {
      "presentation": {
        "id": "b12-kozushima-ashitaba-harvest-hamanoie",
        "regionId": "kozushima",
        "foodCultureId": "b12-kozushima-ashitaba-harvest",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "島宿 浜の家",
            "lead": "都の特集で明日葉シフォンケーキが紹介された宿。",
            "description": "都の特集で明日葉シフォンケーキが紹介された宿。",
            "tags": [],
            "practicalInfo": [
              {
                "label": "確認状態",
                "value": "2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。"
              }
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。",
              "来島前に船・航空の最新の運航状況をご確認ください。"
            ]
          },
          "en": {
            "name": "Hamanoie Island Inn",
            "lead": "An inn featured with ashitaba chiffon cake in Tokyo’s island guide.",
            "description": "An inn featured with ashitaba chiffon cake in Tokyo’s island guide.",
            "tags": [],
            "practicalInfo": [
              {
                "label": "Verification",
                "value": "Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending."
              }
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting.",
              "Check current sea and air access before visiting the island."
            ]
          },
          "zh-TW": {
            "name": "島宿濱之家",
            "lead": "東京都特輯介紹其明日葉戚風蛋糕的旅宿。",
            "description": "東京都特輯介紹其明日葉戚風蛋糕的旅宿。",
            "tags": [],
            "practicalInfo": [
              {
                "label": "確認狀態",
                "value": "2026年11月25日（JST）取得出處，尚待相關人員確認。"
              }
            ],
            "caution": [
              "刊載內容尚未確認。造訪前請查看出處資訊。",
              "前往島嶼前，請確認最新海空交通狀況。"
            ]
          }
        }
      },
      "detail": {
        "tags": [],
        "description": { "ja": "都の特集で明日葉シフォンケーキが紹介された宿。", "en": "An inn featured with ashitaba chiffon cake in Tokyo’s island guide.", "zh-TW": "東京都特輯介紹其明日葉戚風蛋糕的旅宿。" },
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": { "ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊" },
            "value": { "ja": "https://shima.metro.tokyo.lg.jp/post/kozushima03/", "en": "https://shima.metro.tokyo.lg.jp/post/kozushima03/", "zh-TW": "https://shima.metro.tokyo.lg.jp/post/kozushima03/" }
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": { "ja": "確認状態", "en": "Verification", "zh-TW": "確認狀態" },
            "value": { "ja": "2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。", "en": "Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending.", "zh-TW": "2026年11月25日（JST）取得出處，尚待相關人員確認。" }
          }
        ],
        "caution": [
          { "ja": "来島前に船・航空の最新の運航状況をご確認ください。", "en": "Check current sea and air access before visiting the island.", "zh-TW": "前往島嶼前，請確認最新海空交通狀況。" }
        ]
      },
      "officialSource": {
        "name": "東京湾をクルーズして満天の星きらめく神津島へ。「しまぽ通貨」で賢くお得な週末旅｜言葉にあまる出会いを、島で。",
        "url": "https://shima.metro.tokyo.lg.jp/post/kozushima03/",
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
          "referenceId": "b12-kozushima-ashitaba-harvest-kuroshio",
          "spotId": "b12-kozushima-ashitaba-harvest-kuroshio",
          "badgeColor": "#E98A1C",
          "badge": { "ja": "黒潮商会", "en": "Kuroshio Shokai", "zh-TW": "黑潮商會" },
          "description": { "ja": "観光協会が明日葉そばを紹介する土産店。", "en": "A souvenir shop whose tourism listing includes ashitaba soba.", "zh-TW": "觀光協會介紹中列有明日葉蕎麥麵的伴手禮店。" }
        },
        {
          "referenceId": "b12-kozushima-ashitaba-harvest-hamanoie",
          "spotId": "b12-kozushima-ashitaba-harvest-hamanoie",
          "badgeColor": "#E98A1C",
          "badge": { "ja": "島宿 浜の家", "en": "Hamanoie Island Inn", "zh-TW": "島宿濱之家" },
          "description": { "ja": "都の特集で明日葉シフォンケーキが紹介された宿。", "en": "An inn featured with ashitaba chiffon cake in Tokyo’s island guide.", "zh-TW": "東京都特輯介紹其明日葉戚風蛋糕的旅宿。" }
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {
        "region": "神津島村",
        "station": ""
      },
      "en": {
        "region": "Kozushima Village",
        "station": ""
      },
      "zh-TW": {
        "region": "神津島村",
        "station": ""
      }
    }
  },
  "sources": {
    "admission-access": {"name": "神津島観光協会 黒潮商会", "url": "https://kozushima.com/shop/kau/miyage/889/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-2": {
      "name": "おみやげ | 神津島村",
      "url": "https://www.vill.kouzushima.tokyo.jp/goods/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-3": {
      "name": "黒潮商会｜神津島観光ガイド公式サイト",
      "url": "https://kozushima.com/shop/kau/miyage/889/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-5": {
      "name": "東京湾をクルーズして満天の星きらめく神津島へ。「しまぽ通貨」で賢くお得な週末旅｜言葉にあまる出会いを、島で。",
      "url": "https://shima.metro.tokyo.lg.jp/post/kozushima03/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-6": {
      "name": "「星空保護区®神津島フェア２０２４」を開催します | 神津島村",
      "url": "https://www.vill.kouzushima.tokyo.jp/2024-1024/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-8": {
      "name": "神津島の観光｜東京都環境局 東京の自然公園",
      "url": "https://www.kankyo1.metro.tokyo.lg.jp/naturepark/know/park/introduction/kokuritsu/fujihakone/koudushima/tourism.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b12 editorial itinerary — timing and order are estimates",
      "url": "https://www.vill.kouzushima.tokyo.jp/goods/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-2",
        "source-3",
        "source-5",
        "source-6",
        "source-8"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-2",
        "source-3",
        "source-5",
        "source-6",
        "source-8"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-2",
        "source-3",
        "source-5",
        "source-6",
        "source-8"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-2",
        "source-3",
        "source-5",
        "source-6",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": [
        "editorial",
        "source-2",
        "source-3",
        "source-5",
        "source-6",
        "source-8"
      ],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": [
        "editorial",
        "source-2",
        "source-3",
        "source-5",
        "source-6",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-2",
        "source-3",
        "source-5",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-2",
        "source-3",
        "source-5",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-2",
        "source-3",
        "source-5",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "spots.b12-kozushima-ashitaba-harvest-kuroshio": {
      "sourceIds": [
        "source-3"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-3"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-3"
      ],
      "origin": "editorial"
    },
    "spots.b12-kozushima-ashitaba-harvest-hamanoie": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    }
  }
};
