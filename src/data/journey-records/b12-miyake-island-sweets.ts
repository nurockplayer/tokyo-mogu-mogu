import type { JourneyRecord } from '../journey-record';

export const b12MiyakeIslandSweetsRecord: JourneyRecord = {
  "municipalityId": "miyake",
  "alcoholThemed": false,
  "journey": {
    "id": "b12-miyake-island-sweets",
    "regionId": "miyake",
    "foodCultureId": "b12-miyake-island-sweets",
    "storyId": "b12-miyake-island-sweets",
    "routeId": "b12-miyake-island-sweets-route",
    "copy": {
      "ja": {
        "title": "三宅島の牛乳せんべいとアイス",
        "subtitle": "三宅島の牛乳せんべいとアイス",
        "description": "村は牛乳せんべいを特産品に挙げ、観光協会は岡太楼本舗を製造販売店として紹介。協会の「三宅島の恵み愛す」には明日葉、塩、レモン、パッションフルーツの味が掲載されています。",
        "tags": [
          "三宅村"
        ],
        "storyTitle": "三宅島の牛乳せんべいとアイス",
        "intro": [
          "村は牛乳せんべいを特産品に挙げ、観光協会は岡太楼本舗を製造販売店として紹介。協会の「三宅島の恵み愛す」には明日葉、塩、レモン、パッションフルーツの味が掲載されています。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。",
          "来島前に船・航空の最新の運航状況をご確認ください。"
        ]
      },
      "en": {
        "title": "Miyakejima milk crackers and ice cream",
        "subtitle": "Miyakejima milk crackers and ice cream",
        "description": "The village lists milk crackers as a specialty, and the tourism association identifies Okataro Honpo as a maker and seller. The association’s Miyakejima no Megumi Ice range lists ashitaba, salt, lemon and passion-fruit flavors.",
        "tags": [
          "Miyake Village"
        ],
        "storyTitle": "Miyakejima milk crackers and ice cream",
        "intro": [
          "The village lists milk crackers as a specialty, and the tourism association identifies Okataro Honpo as a maker and seller. The association’s Miyakejima no Megumi Ice range lists ashitaba, salt, lemon and passion-fruit flavors.",
          "This information is unconfirmed. Check the source information before visiting.",
          "Check current sea and air access before visiting the island."
        ]
      },
      "zh-TW": {
        "title": "三宅島牛奶煎餅與冰淇淋",
        "subtitle": "三宅島牛奶煎餅與冰淇淋",
        "description": "村方列牛奶煎餅為特產，觀光協會介紹岡太樓本舖為製造販售店。協會的「三宅島の恵み愛す」系列列有明日葉、鹽、檸檬及百香果口味。",
        "tags": [
          "三宅村"
        ],
        "storyTitle": "三宅島牛奶煎餅與冰淇淋",
        "intro": [
          "村方列牛奶煎餅為特產，觀光協會介紹岡太樓本舖為製造販售店。協會的「三宅島の恵み愛す」系列列有明日葉、鹽、檸檬及百香果口味。",
          "刊載內容尚未確認。造訪前請查看出處資訊。",
          "前往島嶼前，請確認最新海空交通狀況。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "島のおやつをたどる",
          "body": "村は牛乳せんべいを特産品に挙げ、観光協会は岡太楼本舗を製造販売店として紹介。協会の「三宅島の恵み愛す」には明日葉、塩、レモン、パッションフルーツの味が掲載されています。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "Following island snacks",
          "body": "The village lists milk crackers as a specialty, and the tourism association identifies Okataro Honpo as a maker and seller. The association’s Miyakejima no Megumi Ice range lists ashitaba, salt, lemon and passion-fruit flavors."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "尋訪島上點心",
          "body": "村方列牛奶煎餅為特產，觀光協會介紹岡太樓本舖為製造販售店。協會的「三宅島の恵み愛す」系列列有明日葉、鹽、檸檬及百香果口味。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 180,
        "steps": [
          {
            "spotId": "b12-miyake-island-sweets-okataro"
          },
          {
            "spotId": "b12-miyake-island-sweets-tourism"
          }
        ]
      }
    ]
  },
  "routeName": { "ja": "三宅島の牛乳せんべいとアイス", "en": "Miyakejima milk crackers and ice cream", "zh-TW": "三宅島牛奶煎餅與冰淇淋" },
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
      "arrival": {"kind": "bus-stop", "name": {"ja": "ナダードバス停", "en": "Nadādo bus stop", "zh-TW": "Nadādo 公車站"}, "spotId": "b12-miyake-island-sweets-okataro", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b12-miyake-island-sweets-okataro",
          "description": { "ja": "観光協会が牛乳せんべいの製造販売店として紹介しています。", "en": "The tourism association describes this as a milk-cracker maker and shop.", "zh-TW": "觀光協會介紹的牛奶煎餅製造販售店。" },
          "note": { "ja": "時間と順序は編集上の目安です。島内の交通と経路は各自ご確認ください。訪問先で本文の全料理を体験できることを意味しません。", "en": "Timing and order are editorial estimates. Check island transport and directions. Stops do not necessarily offer every dish described.", "zh-TW": "時間與順序為編輯估計，請自行確認島內交通及路線。停留點不一定提供文中所有菜餚。" }
        },
        {
          "spotId": "b12-miyake-island-sweets-tourism",
          "description": { "ja": "協会の特産品紹介にカップアイス「三宅島の恵み愛す」が載っています。", "en": "The association’s specialty listing includes Miyakejima no Megumi cup ice cream.", "zh-TW": "協會特產介紹列有「三宅島の恵み愛す」杯裝冰淇淋。" },
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
    "b12-miyake-island-sweets-okataro": {
      "presentation": {
        "id": "b12-miyake-island-sweets-okataro",
        "regionId": "miyake",
        "foodCultureId": "b12-miyake-island-sweets",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "岡太楼本舗",
            "lead": "観光協会が牛乳せんべいの製造販売店として紹介しています。",
            "description": "観光協会が牛乳せんべいの製造販売店として紹介しています。",
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
            "name": "Okataro Honpo",
            "lead": "The tourism association describes this as a milk-cracker maker and shop.",
            "description": "The tourism association describes this as a milk-cracker maker and shop.",
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
            "name": "岡太樓本舖",
            "lead": "觀光協會介紹的牛奶煎餅製造販售店。",
            "description": "觀光協會介紹的牛奶煎餅製造販售店。",
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
        "description": { "ja": "観光協会が牛乳せんべいの製造販売店として紹介しています。", "en": "The tourism association describes this as a milk-cracker maker and shop.", "zh-TW": "觀光協會介紹的牛奶煎餅製造販售店。" },
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": { "ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊" },
            "value": { "ja": "https://www.miyakejima.gr.jp/eatbuy/okatarou-honten/", "en": "https://www.miyakejima.gr.jp/eatbuy/okatarou-honten/", "zh-TW": "https://www.miyakejima.gr.jp/eatbuy/okatarou-honten/" }
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
        "name": "岡太楼本舗：食べる、買う：三宅島観光協会",
        "url": "https://www.miyakejima.gr.jp/eatbuy/okatarou-honten/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-25",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b12-miyake-island-sweets-tourism": {
      "presentation": {
        "id": "b12-miyake-island-sweets-tourism",
        "regionId": "miyake",
        "foodCultureId": "b12-miyake-island-sweets",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "三宅島観光協会",
            "lead": "協会の特産品紹介にカップアイス「三宅島の恵み愛す」が載っています。",
            "description": "協会の特産品紹介にカップアイス「三宅島の恵み愛す」が載っています。",
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
            "name": "Miyakejima Tourism Association",
            "lead": "The association’s specialty listing includes Miyakejima no Megumi cup ice cream.",
            "description": "The association’s specialty listing includes Miyakejima no Megumi cup ice cream.",
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
            "name": "三宅島觀光協會",
            "lead": "協會特產介紹列有「三宅島の恵み愛す」杯裝冰淇淋。",
            "description": "協會特產介紹列有「三宅島の恵み愛す」杯裝冰淇淋。",
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
        "description": { "ja": "協会の特産品紹介にカップアイス「三宅島の恵み愛す」が載っています。", "en": "The association’s specialty listing includes Miyakejima no Megumi cup ice cream.", "zh-TW": "協會特產介紹列有「三宅島の恵み愛す」杯裝冰淇淋。" },
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": { "ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊" },
            "value": { "ja": "https://www.miyakejima.gr.jp/eatbuy/shop/", "en": "https://www.miyakejima.gr.jp/eatbuy/shop/", "zh-TW": "https://www.miyakejima.gr.jp/eatbuy/shop/" }
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
        "name": "三宅島観光協会オリジナル特産品：食べる、買う：三宅島観光協会",
        "url": "https://www.miyakejima.gr.jp/eatbuy/shop/",
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
          "referenceId": "b12-miyake-island-sweets-okataro",
          "spotId": "b12-miyake-island-sweets-okataro",
          "badgeColor": "#E98A1C",
          "badge": { "ja": "岡太楼本舗", "en": "Okataro Honpo", "zh-TW": "岡太樓本舖" },
          "description": { "ja": "観光協会が牛乳せんべいの製造販売店として紹介しています。", "en": "The tourism association describes this as a milk-cracker maker and shop.", "zh-TW": "觀光協會介紹的牛奶煎餅製造販售店。" }
        },
        {
          "referenceId": "b12-miyake-island-sweets-tourism",
          "spotId": "b12-miyake-island-sweets-tourism",
          "badgeColor": "#E98A1C",
          "badge": { "ja": "三宅島観光協会", "en": "Miyakejima Tourism Association", "zh-TW": "三宅島觀光協會" },
          "description": { "ja": "協会の特産品紹介にカップアイス「三宅島の恵み愛す」が載っています。", "en": "The association’s specialty listing includes Miyakejima no Megumi cup ice cream.", "zh-TW": "協會特產介紹列有「三宅島の恵み愛す」杯裝冰淇淋。" }
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
    "admission-access": {"name": "Miyakejima tourism association – Okatarō main shop", "url": "https://www.miyakejima.gr.jp/eatbuy/okatarou-honten/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-14": {
      "name": "主要特産品の紹介｜観光情報｜三宅村役場ホームページ",
      "url": "https://www.vill.miyake.tokyo.jp/kankou/tokusanhin.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-16": {
      "name": "三宅島観光協会オリジナル特産品：食べる、買う：三宅島観光協会",
      "url": "https://www.miyakejima.gr.jp/eatbuy/shop/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-24": {
      "name": "岡太楼本舗：食べる、買う：三宅島観光協会",
      "url": "https://www.miyakejima.gr.jp/eatbuy/okatarou-honten/",
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
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-14",
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-14",
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-14",
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": [
        "editorial",
        "source-14",
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": [
        "editorial",
        "source-14",
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-14",
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-14",
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-14",
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "spots.b12-miyake-island-sweets-okataro": {
      "sourceIds": [
        "source-24"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-24"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-24"
      ],
      "origin": "editorial"
    },
    "spots.b12-miyake-island-sweets-tourism": {
      "sourceIds": [
        "source-16"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-16"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-16"
      ],
      "origin": "editorial"
    }
  }
};
