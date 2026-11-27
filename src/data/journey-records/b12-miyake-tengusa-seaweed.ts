import type { JourneyRecord } from '../journey-record';

export const b12MiyakeTengusaSeaweedRecord: JourneyRecord = {
  "municipalityId": "miyake",
  "alcoholThemed": false,
  "journey": {
    "id": "b12-miyake-tengusa-seaweed",
    "regionId": "miyake",
    "foodCultureId": "b12-miyake-tengusa-seaweed",
    "storyId": "b12-miyake-tengusa-seaweed",
    "routeId": "b12-miyake-tengusa-seaweed-route",
    "copy": {
      "ja": {
        "title": "三宅島の天草と海藻料理",
        "subtitle": "三宅島の天草と海藻料理",
        "description": "村はオオブサ天草を噴火前に知られた特産品と紹介し、現在の生産量は少ないと記載。観光協会はカフェ カノンのところてんと平野食堂の岩のりラーメンを紹介します。カフェの天草の産地は断定しません。",
        "tags": [
          "三宅村"
        ],
        "storyTitle": "三宅島の天草と海藻料理",
        "intro": [
          "村はオオブサ天草を噴火前に知られた特産品と紹介し、現在の生産量は少ないと記載。観光協会はカフェ カノンのところてんと平野食堂の岩のりラーメンを紹介します。カフェの天草の産地は断定しません。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。",
          "来島前に船・航空の最新の運航状況をご確認ください。"
        ]
      },
      "en": {
        "title": "Miyakejima tengusa and seaweed dishes",
        "subtitle": "Miyakejima tengusa and seaweed dishes",
        "description": "The village describes oobusa tengusa as a specialty known before the eruption, with limited current production. Tourism listings introduce Café Canon’s tokoroten and Hirano Shokudo’s rocky-seaweed ramen. They do not establish the origin of the café’s tengusa.",
        "tags": [
          "Miyake Village"
        ],
        "storyTitle": "Miyakejima tengusa and seaweed dishes",
        "intro": [
          "The village describes oobusa tengusa as a specialty known before the eruption, with limited current production. Tourism listings introduce Café Canon’s tokoroten and Hirano Shokudo’s rocky-seaweed ramen. They do not establish the origin of the café’s tengusa.",
          "This information is unconfirmed. Check the source information before visiting.",
          "Check current sea and air access before visiting the island."
        ]
      },
      "zh-TW": {
        "title": "三宅島天草與海藻料理",
        "subtitle": "三宅島天草與海藻料理",
        "description": "村方將大房天草介紹為噴發前知名、目前產量仍少的特產。觀光資料介紹 Café Canon 的寒天麵及平野食堂的岩海苔拉麵，未據此斷定咖啡館天草的產地。",
        "tags": [
          "三宅村"
        ],
        "storyTitle": "三宅島天草與海藻料理",
        "intro": [
          "村方將大房天草介紹為噴發前知名、目前產量仍少的特產。觀光資料介紹 Café Canon 的寒天麵及平野食堂的岩海苔拉麵，未據此斷定咖啡館天草的產地。",
          "刊載內容尚未確認。造訪前請查看出處資訊。",
          "前往島嶼前，請確認最新海空交通狀況。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "海藻の二つの食べ方",
          "body": "村はオオブサ天草を噴火前に知られた特産品と紹介し、現在の生産量は少ないと記載。観光協会はカフェ カノンのところてんと平野食堂の岩のりラーメンを紹介します。カフェの天草の産地は断定しません。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "Two ways with seaweed",
          "body": "The village describes oobusa tengusa as a specialty known before the eruption, with limited current production. Tourism listings introduce Café Canon’s tokoroten and Hirano Shokudo’s rocky-seaweed ramen. They do not establish the origin of the café’s tengusa."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "海藻的兩種滋味",
          "body": "村方將大房天草介紹為噴發前知名、目前產量仍少的特產。觀光資料介紹 Café Canon 的寒天麵及平野食堂的岩海苔拉麵，未據此斷定咖啡館天草的產地。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 180,
        "steps": [
          {
            "spotId": "b12-miyake-tengusa-seaweed-canon"
          },
          {
            "spotId": "b12-miyake-tengusa-seaweed-hirano"
          }
        ]
      }
    ]
  },
  "routeName": { "ja": "三宅島の天草と海藻料理", "en": "Miyakejima tengusa and seaweed dishes", "zh-TW": "三宅島天草與海藻料理" },
  "location": {
    "ja": {
      "area": "三宅村",
      "station": "",
      "access": ""
    },
    "en": {
      "area": "Miyake Village",
      "station": "",
      "access": ""
    },
    "zh-TW": {
      "area": "三宅村",
      "station": "",
      "access": ""
    }
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "伊豆岬入口バス停", "en": "Izu Misaki Iriguchi bus stop", "zh-TW": "伊豆岬入口公車站"}, "spotId": "b12-miyake-tengusa-seaweed-canon", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b12-miyake-tengusa-seaweed-canon",
          "description": { "ja": "観光協会のカフェ紹介にはところてんも載っています。", "en": "The tourism association’s café listing also includes tokoroten.", "zh-TW": "觀光協會的咖啡館介紹亦列有寒天麵。" },
          "note": { "ja": "時間と順序は編集上の目安です。島内の交通と経路は各自ご確認ください。訪問先で本文の全料理を体験できることを意味しません。", "en": "Timing and order are editorial estimates. Check island transport and directions. Stops do not necessarily offer every dish described.", "zh-TW": "時間與順序為編輯估計，請自行確認島內交通及路線。停留點不一定提供文中所有菜餚。" }
        },
        {
          "spotId": "b12-miyake-tengusa-seaweed-hirano",
          "description": { "ja": "観光協会が岩のりラーメンを名物として紹介する食堂。", "en": "The tourism association identifies rocky-seaweed ramen as a specialty here.", "zh-TW": "觀光協會將岩海苔拉麵列為其名物的食堂。" },
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
    "b12-miyake-tengusa-seaweed-canon": {
      "presentation": {
        "id": "b12-miyake-tengusa-seaweed-canon",
        "regionId": "miyake",
        "foodCultureId": "b12-miyake-tengusa-seaweed",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "ギャラリー カフェ カノン",
            "lead": "観光協会のカフェ紹介にはところてんも載っています。",
            "description": "観光協会のカフェ紹介にはところてんも載っています。",
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
            "name": "Gallery Cafe Canon",
            "lead": "The tourism association’s café listing also includes tokoroten.",
            "description": "The tourism association’s café listing also includes tokoroten.",
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
            "name": "Gallery Cafe Canon",
            "lead": "觀光協會的咖啡館介紹亦列有寒天麵。",
            "description": "觀光協會的咖啡館介紹亦列有寒天麵。",
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
        "description": { "ja": "観光協会のカフェ紹介にはところてんも載っています。", "en": "The tourism association’s café listing also includes tokoroten.", "zh-TW": "觀光協會的咖啡館介紹亦列有寒天麵。" },
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": { "ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊" },
            "value": { "ja": "https://www.miyakejima.gr.jp/eatbuy/cafecanon/", "en": "https://www.miyakejima.gr.jp/eatbuy/cafecanon/", "zh-TW": "https://www.miyakejima.gr.jp/eatbuy/cafecanon/" }
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
        "name": "ギャラリー カフェ カノン：食べる、買う：三宅島観光協会",
        "url": "https://www.miyakejima.gr.jp/eatbuy/cafecanon/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-25",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b12-miyake-tengusa-seaweed-hirano": {
      "presentation": {
        "id": "b12-miyake-tengusa-seaweed-hirano",
        "regionId": "miyake",
        "foodCultureId": "b12-miyake-tengusa-seaweed",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "平野食堂",
            "lead": "観光協会が岩のりラーメンを名物として紹介する食堂。",
            "description": "観光協会が岩のりラーメンを名物として紹介する食堂。",
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
            "name": "Hirano Shokudo",
            "lead": "The tourism association identifies rocky-seaweed ramen as a specialty here.",
            "description": "The tourism association identifies rocky-seaweed ramen as a specialty here.",
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
            "name": "平野食堂",
            "lead": "觀光協會將岩海苔拉麵列為其名物的食堂。",
            "description": "觀光協會將岩海苔拉麵列為其名物的食堂。",
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
        "description": { "ja": "観光協会が岩のりラーメンを名物として紹介する食堂。", "en": "The tourism association identifies rocky-seaweed ramen as a specialty here.", "zh-TW": "觀光協會將岩海苔拉麵列為其名物的食堂。" },
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": { "ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊" },
            "value": { "ja": "https://www.miyakejima.gr.jp/eatbuy/hiranosyokudou/", "en": "https://www.miyakejima.gr.jp/eatbuy/hiranosyokudou/", "zh-TW": "https://www.miyakejima.gr.jp/eatbuy/hiranosyokudou/" }
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
        "name": "平野食堂：食べる、買う：三宅島観光協会",
        "url": "https://www.miyakejima.gr.jp/eatbuy/hiranosyokudou/",
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
          "referenceId": "b12-miyake-tengusa-seaweed-canon",
          "spotId": "b12-miyake-tengusa-seaweed-canon",
          "badgeColor": "#E98A1C",
          "badge": { "ja": "ギャラリー カフェ カノン", "en": "Gallery Cafe Canon", "zh-TW": "Gallery Cafe Canon" },
          "description": { "ja": "観光協会のカフェ紹介にはところてんも載っています。", "en": "The tourism association’s café listing also includes tokoroten.", "zh-TW": "觀光協會的咖啡館介紹亦列有寒天麵。" }
        },
        {
          "referenceId": "b12-miyake-tengusa-seaweed-hirano",
          "spotId": "b12-miyake-tengusa-seaweed-hirano",
          "badgeColor": "#E98A1C",
          "badge": { "ja": "平野食堂", "en": "Hirano Shokudo", "zh-TW": "平野食堂" },
          "description": { "ja": "観光協会が岩のりラーメンを名物として紹介する食堂。", "en": "The tourism association identifies rocky-seaweed ramen as a specialty here.", "zh-TW": "觀光協會將岩海苔拉麵列為其名物的食堂。" }
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {
        "region": "三宅村",
        "station": ""
      },
      "en": {
        "region": "Miyake Village",
        "station": ""
      },
      "zh-TW": {
        "region": "三宅村",
        "station": ""
      }
    }
  },
  "sources": {
    "admission-access": {"name": "Miyakejima tourism association – Café Canon", "url": "https://www.miyakejima.gr.jp/eatbuy/cafecanon/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-14": {
      "name": "主要特産品の紹介｜観光情報｜三宅村役場ホームページ",
      "url": "https://www.vill.miyake.tokyo.jp/kankou/tokusanhin.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-18": {
      "name": "ギャラリー カフェ カノン：食べる、買う：三宅島観光協会",
      "url": "https://www.miyakejima.gr.jp/eatbuy/cafecanon/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-22": {
      "name": "三宅島 - 東京宝島 11の島々の魅力を発信",
      "url": "https://www.t-treasureislands.metro.tokyo.lg.jp/miyakejima/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-66": {
      "name": "平野食堂：食べる、買う：三宅島観光協会",
      "url": "https://www.miyakejima.gr.jp/eatbuy/hiranosyokudou/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b12 editorial itinerary — timing and order are estimates",
      "url": "https://www.vill.miyake.tokyo.jp/kankou/tokusanhin.html",
      "sourceType": "manual",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-14",
        "source-18",
        "source-22",
        "source-66"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-14",
        "source-18",
        "source-22",
        "source-66"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-14",
        "source-18",
        "source-22",
        "source-66"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-14",
        "source-18",
        "source-22",
        "source-66"
      ],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": [
        "editorial",
        "source-14",
        "source-18",
        "source-22",
        "source-66"
      ],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": [
        "editorial",
        "source-14",
        "source-18",
        "source-22",
        "source-66"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-14",
        "source-18",
        "source-22",
        "source-66"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-14",
        "source-18",
        "source-22",
        "source-66"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-14",
        "source-18",
        "source-22",
        "source-66"
      ],
      "origin": "editorial"
    },
    "spots.b12-miyake-tengusa-seaweed-canon": {
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
    "spots.b12-miyake-tengusa-seaweed-hirano": {
      "sourceIds": [
        "source-66"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-66"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-66"
      ],
      "origin": "editorial"
    }
  }
};
