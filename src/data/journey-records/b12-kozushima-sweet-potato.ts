import type { JourneyRecord } from '../journey-record';

export const b12KozushimaSweetPotatoRecord: JourneyRecord = {
  "municipalityId": "kozushima",
  "alcoholThemed": false,
  "journey": {
    "id": "b12-kozushima-sweet-potato",
    "regionId": "kozushima",
    "foodCultureId": "b12-kozushima-sweet-potato",
    "storyId": "b12-kozushima-sweet-potato",
    "routeId": "b12-kozushima-sweet-potato-route",
    "copy": {
      "ja": {
        "title": "神津島の芋と祝い餅",
        "subtitle": "神津島の芋と祝い餅",
        "description": "協議会の食文化紹介は、かつて主食だったさつま芋から、日常のおやつ「あぶらき」と祝い事の切り干し餅が生まれたと伝えます。切り干し餅は干した芋の粉ともち米を使います。",
        "tags": [
          "神津島村"
        ],
        "storyTitle": "神津島の芋と祝い餅",
        "intro": [
          "協議会の食文化紹介は、かつて主食だったさつま芋から、日常のおやつ「あぶらき」と祝い事の切り干し餅が生まれたと伝えます。切り干し餅は干した芋の粉ともち米を使います。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。",
          "来島前に船・航空の最新の運航状況をご確認ください。"
        ]
      },
      "en": {
        "title": "Kozushima sweet potatoes and celebration mochi",
        "subtitle": "Kozushima sweet potatoes and celebration mochi",
        "description": "The ecotourism council describes sweet potatoes as a former staple, with aburaki fritters as an everyday snack and kiriboshi mochi for celebrations. The mochi combines dried sweet-potato flour with glutinous rice.",
        "tags": [
          "Kozushima Village"
        ],
        "storyTitle": "Kozushima sweet potatoes and celebration mochi",
        "intro": [
          "The ecotourism council describes sweet potatoes as a former staple, with aburaki fritters as an everyday snack and kiriboshi mochi for celebrations. The mochi combines dried sweet-potato flour with glutinous rice.",
          "This information is unconfirmed. Check the source information before visiting.",
          "Check current sea and air access before visiting the island."
        ]
      },
      "zh-TW": {
        "title": "神津島的甘藷與慶典麻糬",
        "subtitle": "神津島的甘藷與慶典麻糬",
        "description": "生態旅遊協議會介紹甘藷曾是主食，並記載日常點心 aburaki 炸甘藷與慶典用切乾麻糬，後者使用乾甘藷粉與糯米。",
        "tags": [
          "神津島村"
        ],
        "storyTitle": "神津島的甘藷與慶典麻糬",
        "intro": [
          "生態旅遊協議會介紹甘藷曾是主食，並記載日常點心 aburaki 炸甘藷與慶典用切乾麻糬，後者使用乾甘藷粉與糯米。",
          "刊載內容尚未確認。造訪前請查看出處資訊。",
          "前往島嶼前，請確認最新海空交通狀況。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "芋から生まれたおやつ",
          "body": "協議会の食文化紹介は、かつて主食だったさつま芋から、日常のおやつ「あぶらき」と祝い事の切り干し餅が生まれたと伝えます。切り干し餅は干した芋の粉ともち米を使います。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "Snacks from a staple crop",
          "body": "The ecotourism council describes sweet potatoes as a former staple, with aburaki fritters as an everyday snack and kiriboshi mochi for celebrations. The mochi combines dried sweet-potato flour with glutinous rice."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "從主食到點心",
          "body": "生態旅遊協議會介紹甘藷曾是主食，並記載日常點心 aburaki 炸甘藷與慶典用切乾麻糬，後者使用乾甘藷粉與糯米。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {
            "spotId": "b12-kozushima-sweet-potato-yocchare"
          }
        ]
      }
    ]
  },
  "routeName": { "ja": "神津島の芋と祝い餅", "en": "Kozushima sweet potatoes and celebration mochi", "zh-TW": "神津島的甘藷與慶典麻糬" },
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
      "arrival": {"kind": "ferry-terminal", "name": {"ja": "前浜（神津島）港船客待合所", "en": "Maehama (Kozushima) Port passenger terminal", "zh-TW": "前濱（神津島）港旅客候船室"}, "spotId": "b12-kozushima-sweet-potato-yocchare", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b12-kozushima-sweet-potato-yocchare",
          "description": { "ja": "観光協会の紹介に切干餅が載る海産物販売センター。", "en": "The tourism association lists sweet-potato mochi at this seafood sales center.", "zh-TW": "觀光協會介紹這座海產販售中心時列有甘藷麻糬。" },
          "note": { "ja": "時間と順序は編集上の目安です。島内の交通と経路は各自ご確認ください。訪問先で本文の全料理を体験できることを意味しません。", "en": "Timing and order are editorial estimates. Check island transport and directions. Stops do not necessarily offer every dish described.", "zh-TW": "時間與順序為編輯估計，請自行確認島內交通及路線。停留點不一定提供文中所有菜餚。" }
        }
      ],
      "stats": {
        "ja": {
          "time": "約90分（編集目安）",
          "distance": "",
          "spots": "1 か所",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "来島前に船・航空の最新の運航状況をご確認ください。 時間と順序は編集上の目安です。島内の交通と経路は各自ご確認ください。訪問先で本文の全料理を体験できることを意味しません。"
        },
        "en": {
          "time": "About 90 min (editorial estimate)",
          "distance": "",
          "spots": "1 stop",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "Check current sea and air access before visiting the island. Timing and order are editorial estimates. Check island transport and directions. Stops do not necessarily offer every dish described."
        },
        "zh-TW": {
          "time": "約 90 分鐘（編輯估計）",
          "distance": "",
          "spots": "1 處",
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
    "b12-kozushima-sweet-potato-yocchare": {
      "visitorSourceId": "admission-access",
      "presentation": {
        "id": "b12-kozushima-sweet-potato-yocchare",
        "regionId": "kozushima",
        "foodCultureId": "b12-kozushima-sweet-potato",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "よっちゃーれセンター 1F",
            "lead": "観光協会の紹介に切干餅が載る海産物販売センター。",
            "description": "観光協会の紹介に切干餅が載る海産物販売センター。",
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
            "name": "Yocchare Center 1F",
            "lead": "The tourism association lists sweet-potato mochi at this seafood sales center.",
            "description": "The tourism association lists sweet-potato mochi at this seafood sales center.",
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
            "name": "Yocchare 中心 1 樓",
            "lead": "觀光協會介紹這座海產販售中心時列有甘藷麻糬。",
            "description": "觀光協會介紹這座海產販售中心時列有甘藷麻糬。",
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
        "description": { "ja": "観光協会の紹介に切干餅が載る海産物販売センター。", "en": "The tourism association lists sweet-potato mochi at this seafood sales center.", "zh-TW": "觀光協會介紹這座海產販售中心時列有甘藷麻糬。" },
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": { "ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊" },
            "value": { "ja": "https://kozushima.com/shop/kau/miyage/897/", "en": "https://kozushima.com/shop/kau/miyage/897/", "zh-TW": "https://kozushima.com/shop/kau/miyage/897/" }
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
        "name": "よっちゃーれセンター 1F｜神津島観光ガイド公式サイト",
        "url": "https://kozushima.com/shop/kau/miyage/897/",
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
          "referenceId": "b12-kozushima-sweet-potato-yocchare",
          "spotId": "b12-kozushima-sweet-potato-yocchare",
          "badgeColor": "#E98A1C",
          "badge": { "ja": "よっちゃーれセンター 1F", "en": "Yocchare Center 1F", "zh-TW": "Yocchare 中心 1 樓" },
          "description": { "ja": "観光協会の紹介に切干餅が載る海産物販売センター。", "en": "The tourism association lists sweet-potato mochi at this seafood sales center.", "zh-TW": "觀光協會介紹這座海產販售中心時列有甘藷麻糬。" }
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
    "admission-access": {"name": "東京都 前浜（神津島）港", "url": "https://www.islandaccess.metro.tokyo.lg.jp/stations/maehama_port/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-0": {
      "name": "神津島エコツーリズム推進協議会",
      "url": "https://kozushima.com/ecotourism/contents.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-1": {
      "name": "よっちゃーれセンター 1F｜神津島観光ガイド公式サイト",
      "url": "https://kozushima.com/shop/kau/miyage/897/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b12 editorial itinerary — timing and order are estimates",
      "url": "https://kozushima.com/ecotourism/contents.html",
      "sourceType": "manual",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-0",
        "source-1"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-0",
        "source-1"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-0",
        "source-1"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-0",
        "source-1"
      ],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": [
        "editorial",
        "source-0",
        "source-1"
      ],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": [
        "editorial",
        "source-0",
        "source-1"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-0"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-0"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-0"
      ],
      "origin": "editorial"
    },
    "spots.b12-kozushima-sweet-potato-yocchare": {
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
    }
  }
};
