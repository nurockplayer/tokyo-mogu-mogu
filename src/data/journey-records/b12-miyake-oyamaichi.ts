import type { JourneyRecord } from '../journey-record';

export const b12MiyakeOyamaichiRecord: JourneyRecord = {
  "municipalityId": "miyake",
  "journey": {
    "id": "b12-miyake-oyamaichi",
    "regionId": "miyake",
    "foodCultureId": "b12-miyake-oyamaichi",
    "storyId": "b12-miyake-oyamaichi",
    "routeId": "b12-miyake-oyamaichi-route",
    "copy": {
      "ja": {
        "title": "三宅島の焼酎・雄山一",
        "subtitle": "三宅島の焼酎・雄山一",
        "description": "東京七島酒造組合の蔵元一覧は、三宅島酒造とその焼酎「雄山一」を紹介しています。",
        "tags": [
          "三宅村"
        ],
        "storyTitle": "三宅島の焼酎・雄山一",
        "intro": [
          "東京七島酒造組合の蔵元一覧は、三宅島酒造とその焼酎「雄山一」を紹介しています。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。",
          "来島前に船・航空の最新の運航状況をご確認ください。"
        ]
      },
      "en": {
        "title": "Oyamaichi shochu of Miyakejima",
        "subtitle": "Oyamaichi shochu of Miyakejima",
        "description": "The Tokyo Seven Islands distillers’ directory introduces Miyakejima Shuzo and its Oyamaichi shochu.",
        "tags": [
          "Miyake Village"
        ],
        "storyTitle": "Oyamaichi shochu of Miyakejima",
        "intro": [
          "The Tokyo Seven Islands distillers’ directory introduces Miyakejima Shuzo and its Oyamaichi shochu.",
          "This information is unconfirmed. Check the source information before visiting.",
          "Check current sea and air access before visiting the island."
        ]
      },
      "zh-TW": {
        "title": "三宅島燒酎雄山一",
        "subtitle": "三宅島燒酎雄山一",
        "description": "東京七島酒造組合酒廠名錄介紹三宅島酒造及其燒酎「雄山一」。",
        "tags": [
          "三宅村"
        ],
        "storyTitle": "三宅島燒酎雄山一",
        "intro": [
          "東京七島酒造組合酒廠名錄介紹三宅島酒造及其燒酎「雄山一」。",
          "刊載內容尚未確認。造訪前請查看出處資訊。",
          "前往島嶼前，請確認最新海空交通狀況。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "蔵元の記録",
          "body": "東京七島酒造組合の蔵元一覧は、三宅島酒造とその焼酎「雄山一」を紹介しています。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "A producer’s account",
          "body": "The Tokyo Seven Islands distillers’ directory introduces Miyakejima Shuzo and its Oyamaichi shochu."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "酒廠記錄",
          "body": "東京七島酒造組合酒廠名錄介紹三宅島酒造及其燒酎「雄山一」。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {
            "spotId": "b12-miyake-oyamaichi-shuzo"
          }
        ]
      }
    ]
  },
  "routeName": { "ja": "三宅島の焼酎・雄山一", "en": "Oyamaichi shochu of Miyakejima", "zh-TW": "三宅島燒酎雄山一" },
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
      "arrival": {"kind": "bus-stop", "name": {"ja": "三ノ輪", "en": "Minowa bus stop", "zh-TW": "三之輪公車站"}, "spotId": "b12-miyake-oyamaichi-shuzo", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b12-miyake-oyamaichi-shuzo",
          "description": { "ja": "酒造組合が雄山一の蔵元として掲載する事業所。見学体験の案内ではありません。", "en": "The distillers’ directory lists this Oyamaichi producer; this is not an offer of a brewery tour.", "zh-TW": "酒造組合列載的雄山一製造業者；此介紹不代表提供酒廠參觀。" },
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
    "b12-miyake-oyamaichi-shuzo": {
      "presentation": {
        "id": "b12-miyake-oyamaichi-shuzo",
        "regionId": "miyake",
        "foodCultureId": "b12-miyake-oyamaichi",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "三宅島酒造",
            "lead": "酒造組合が雄山一の蔵元として掲載する事業所。見学体験の案内ではありません。",
            "description": "酒造組合が雄山一の蔵元として掲載する事業所。見学体験の案内ではありません。",
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
            "name": "Miyakejima Shuzo",
            "lead": "The distillers’ directory lists this Oyamaichi producer; this is not an offer of a brewery tour.",
            "description": "The distillers’ directory lists this Oyamaichi producer; this is not an offer of a brewery tour.",
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
            "name": "三宅島酒造",
            "lead": "酒造組合列載的雄山一製造業者；此介紹不代表提供酒廠參觀。",
            "description": "酒造組合列載的雄山一製造業者；此介紹不代表提供酒廠參觀。",
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
        "description": { "ja": "酒造組合が雄山一の蔵元として掲載する事業所。見学体験の案内ではありません。", "en": "The distillers’ directory lists this Oyamaichi producer; this is not an offer of a brewery tour.", "zh-TW": "酒造組合列載的雄山一製造業者；此介紹不代表提供酒廠參觀。" },
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": { "ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊" },
            "value": { "ja": "https://shimazake.com/kuramotolist/miyakejima/", "en": "https://shimazake.com/kuramotolist/miyakejima/", "zh-TW": "https://shimazake.com/kuramotolist/miyakejima/" }
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
        "name": "三宅島酒造株式会社 | 蔵元一覧 | 東京七島酒造組合",
        "url": "https://shimazake.com/kuramotolist/miyakejima/",
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
          "referenceId": "b12-miyake-oyamaichi-shuzo",
          "spotId": "b12-miyake-oyamaichi-shuzo",
          "badgeColor": "#E98A1C",
          "badge": { "ja": "三宅島酒造", "en": "Miyakejima Shuzo", "zh-TW": "三宅島酒造" },
          "description": { "ja": "酒造組合が雄山一の蔵元として掲載する事業所。見学体験の案内ではありません。", "en": "The distillers’ directory lists this Oyamaichi producer; this is not an offer of a brewery tour.", "zh-TW": "酒造組合列載的雄山一製造業者；此介紹不代表提供酒廠參觀。" }
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
    "admission-access": {"name": "Tokyo Grown Miyakejima visitor guide", "url": "https://assets.tokyogrown.jp/library/img/rurubu_shima_P8-9.pdf", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-25": {
      "name": "三宅島酒造株式会社 | 蔵元一覧 | 東京七島酒造組合",
      "url": "https://shimazake.com/kuramotolist/miyakejima/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b12 editorial itinerary — timing and order are estimates",
      "url": "https://shimazake.com/kuramotolist/miyakejima/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-25"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-25"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-25"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-25"
      ],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": [
        "editorial",
        "source-25"
      ],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": [
        "editorial",
        "source-25"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-25"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-25"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-25"
      ],
      "origin": "editorial"
    },
    "spots.b12-miyake-oyamaichi-shuzo": {
      "sourceIds": [
        "source-25"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-25"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-25"
      ],
      "origin": "editorial"
    }
  }
};
