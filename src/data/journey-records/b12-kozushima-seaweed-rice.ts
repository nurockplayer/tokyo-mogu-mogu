import type { JourneyRecord } from '../journey-record';

export const b12KozushimaSeaweedRiceRecord: JourneyRecord = {
  "municipalityId": "kozushima",
  "alcoholThemed": false,
  "journey": {
    "id": "b12-kozushima-seaweed-rice",
    "regionId": "kozushima",
    "foodCultureId": "b12-kozushima-seaweed-rice",
    "storyId": "b12-kozushima-seaweed-rice",
    "routeId": "b12-kozushima-seaweed-rice-route",
    "copy": {
      "ja": {
        "title": "神津島の地海苔としょうゆめし",
        "subtitle": "神津島の地海苔としょうゆめし",
        "description": "協議会は、しょうゆめしを岩のり・醤油・油と米で炊く日常や祝い事の料理と紹介。黒潮商会は独自の焼き方の地海苔、都の美家古寿し紹介は地のり丼を掲載しています。",
        "tags": [
          "神津島村"
        ],
        "storyTitle": "神津島の地海苔としょうゆめし",
        "intro": [
          "協議会は、しょうゆめしを岩のり・醤油・油と米で炊く日常や祝い事の料理と紹介。黒潮商会は独自の焼き方の地海苔、都の美家古寿し紹介は地のり丼を掲載しています。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。",
          "来島前に船・航空の最新の運航状況をご確認ください。"
        ]
      },
      "en": {
        "title": "Kozushima seaweed and shoyumeshi",
        "subtitle": "Kozushima seaweed and shoyumeshi",
        "description": "The council describes shoyumeshi as rice cooked with rocky seaweed, soy sauce and oil for everyday meals and celebrations. Kuroshio Shokai’s account describes its own seaweed roasting, while Tokyo’s Miyako-zushi listing includes a seaweed rice bowl.",
        "tags": [
          "Kozushima Village"
        ],
        "storyTitle": "Kozushima seaweed and shoyumeshi",
        "intro": [
          "The council describes shoyumeshi as rice cooked with rocky seaweed, soy sauce and oil for everyday meals and celebrations. Kuroshio Shokai’s account describes its own seaweed roasting, while Tokyo’s Miyako-zushi listing includes a seaweed rice bowl.",
          "This information is unconfirmed. Check the source information before visiting.",
          "Check current sea and air access before visiting the island."
        ]
      },
      "zh-TW": {
        "title": "神津島海苔與醬油飯",
        "subtitle": "神津島海苔與醬油飯",
        "description": "協議會介紹醬油飯以岩海苔、醬油、油與米炊成，日常與慶典皆會食用。黑潮商會介紹自家烘製海苔，東京都的美家古壽司介紹則列有海苔蓋飯。",
        "tags": [
          "神津島村"
        ],
        "storyTitle": "神津島海苔與醬油飯",
        "intro": [
          "協議會介紹醬油飯以岩海苔、醬油、油與米炊成，日常與慶典皆會食用。黑潮商會介紹自家烘製海苔，東京都的美家古壽司介紹則列有海苔蓋飯。",
          "刊載內容尚未確認。造訪前請查看出處資訊。",
          "前往島嶼前，請確認最新海空交通狀況。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "家庭のご飯と海苔",
          "body": "協議会は、しょうゆめしを岩のり・醤油・油と米で炊く日常や祝い事の料理と紹介。黒潮商会は独自の焼き方の地海苔、都の美家古寿し紹介は地のり丼を掲載しています。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "Seaweed in home cooking",
          "body": "The council describes shoyumeshi as rice cooked with rocky seaweed, soy sauce and oil for everyday meals and celebrations. Kuroshio Shokai’s account describes its own seaweed roasting, while Tokyo’s Miyako-zushi listing includes a seaweed rice bowl."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "家常飯食中的海苔",
          "body": "協議會介紹醬油飯以岩海苔、醬油、油與米炊成，日常與慶典皆會食用。黑潮商會介紹自家烘製海苔，東京都的美家古壽司介紹則列有海苔蓋飯。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 180,
        "steps": [
          {
            "spotId": "b12-kozushima-seaweed-rice-kuroshio"
          },
          {
            "spotId": "b12-kozushima-seaweed-rice-miyako"
          }
        ]
      }
    ]
  },
  "routeName": { "ja": "神津島の地海苔としょうゆめし", "en": "Kozushima seaweed and shoyumeshi", "zh-TW": "神津島海苔與醬油飯" },
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
      "arrival": {"kind": "ferry-terminal", "name": {"ja": "前浜（神津島）港船客待合所", "en": "Maehama (Kozushima) Port passenger terminal", "zh-TW": "前濱（神津島）港旅客候船室"}, "spotId": "b12-kozushima-seaweed-rice-kuroshio", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b12-kozushima-seaweed-rice-kuroshio",
          "description": { "ja": "観光協会が独自に焼いた地海苔を紹介する店。", "en": "The tourism association describes this shop’s locally roasted seaweed.", "zh-TW": "觀光協會介紹其自行烘製海苔的店舖。" },
          "note": { "ja": "時間と順序は編集上の目安です。島内の交通と経路は各自ご確認ください。訪問先で本文の全料理を体験できることを意味しません。", "en": "Timing and order are editorial estimates. Check island transport and directions. Stops do not necessarily offer every dish described.", "zh-TW": "時間與順序為編輯估計，請自行確認島內交通及路線。停留點不一定提供文中所有菜餚。" }
        },
        {
          "spotId": "b12-kozushima-seaweed-rice-miyako",
          "description": { "ja": "都の公園案内が地のり丼や地魚料理を紹介する寿司店。", "en": "A sushi shop listed by Tokyo’s park guide for seaweed rice bowls and local fish dishes.", "zh-TW": "東京都公園指南介紹其海苔蓋飯與地魚料理的壽司店。" },
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
    "b12-kozushima-seaweed-rice-kuroshio": {
      "visitorSourceId": "admission-access",
      "presentation": {
        "id": "b12-kozushima-seaweed-rice-kuroshio",
        "regionId": "kozushima",
        "foodCultureId": "b12-kozushima-seaweed-rice",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "黒潮商会",
            "lead": "観光協会が独自に焼いた地海苔を紹介する店。",
            "description": "観光協会が独自に焼いた地海苔を紹介する店。",
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
            "lead": "The tourism association describes this shop’s locally roasted seaweed.",
            "description": "The tourism association describes this shop’s locally roasted seaweed.",
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
            "lead": "觀光協會介紹其自行烘製海苔的店舖。",
            "description": "觀光協會介紹其自行烘製海苔的店舖。",
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
        "description": { "ja": "観光協会が独自に焼いた地海苔を紹介する店。", "en": "The tourism association describes this shop’s locally roasted seaweed.", "zh-TW": "觀光協會介紹其自行烘製海苔的店舖。" },
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
    "b12-kozushima-seaweed-rice-miyako": {
      "presentation": {
        "id": "b12-kozushima-seaweed-rice-miyako",
        "regionId": "kozushima",
        "foodCultureId": "b12-kozushima-seaweed-rice",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "美家古寿し",
            "lead": "都の公園案内が地のり丼や地魚料理を紹介する寿司店。",
            "description": "都の公園案内が地のり丼や地魚料理を紹介する寿司店。",
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
            "name": "Miyako-zushi",
            "lead": "A sushi shop listed by Tokyo’s park guide for seaweed rice bowls and local fish dishes.",
            "description": "A sushi shop listed by Tokyo’s park guide for seaweed rice bowls and local fish dishes.",
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
            "name": "美家古壽司",
            "lead": "東京都公園指南介紹其海苔蓋飯與地魚料理的壽司店。",
            "description": "東京都公園指南介紹其海苔蓋飯與地魚料理的壽司店。",
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
        "description": { "ja": "都の公園案内が地のり丼や地魚料理を紹介する寿司店。", "en": "A sushi shop listed by Tokyo’s park guide for seaweed rice bowls and local fish dishes.", "zh-TW": "東京都公園指南介紹其海苔蓋飯與地魚料理的壽司店。" },
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": { "ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊" },
            "value": { "ja": "https://www.kankyo1.metro.tokyo.lg.jp/naturepark/know/park/introduction/kokuritsu/fujihakone/koudushima/tourism.html", "en": "https://www.kankyo1.metro.tokyo.lg.jp/naturepark/know/park/introduction/kokuritsu/fujihakone/koudushima/tourism.html", "zh-TW": "https://www.kankyo1.metro.tokyo.lg.jp/naturepark/know/park/introduction/kokuritsu/fujihakone/koudushima/tourism.html" }
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
        "name": "神津島の観光｜東京都環境局 東京の自然公園",
        "url": "https://www.kankyo1.metro.tokyo.lg.jp/naturepark/know/park/introduction/kokuritsu/fujihakone/koudushima/tourism.html",
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
          "referenceId": "b12-kozushima-seaweed-rice-kuroshio",
          "spotId": "b12-kozushima-seaweed-rice-kuroshio",
          "badgeColor": "#E98A1C",
          "badge": { "ja": "黒潮商会", "en": "Kuroshio Shokai", "zh-TW": "黑潮商會" },
          "description": { "ja": "観光協会が独自に焼いた地海苔を紹介する店。", "en": "The tourism association describes this shop’s locally roasted seaweed.", "zh-TW": "觀光協會介紹其自行烘製海苔的店舖。" }
        },
        {
          "referenceId": "b12-kozushima-seaweed-rice-miyako",
          "spotId": "b12-kozushima-seaweed-rice-miyako",
          "badgeColor": "#E98A1C",
          "badge": { "ja": "美家古寿し", "en": "Miyako-zushi", "zh-TW": "美家古壽司" },
          "description": { "ja": "都の公園案内が地のり丼や地魚料理を紹介する寿司店。", "en": "A sushi shop listed by Tokyo’s park guide for seaweed rice bowls and local fish dishes.", "zh-TW": "東京都公園指南介紹其海苔蓋飯與地魚料理的壽司店。" }
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
    "source-0": {
      "name": "神津島エコツーリズム推進協議会",
      "url": "https://kozushima.com/ecotourism/contents.html",
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
    "source-8": {
      "name": "神津島の観光｜東京都環境局 東京の自然公園",
      "url": "https://www.kankyo1.metro.tokyo.lg.jp/naturepark/know/park/introduction/kokuritsu/fujihakone/koudushima/tourism.html",
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
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-0",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-0",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-0",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": [
        "editorial",
        "source-0",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": [
        "editorial",
        "source-0",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-0",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-0",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-0",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "spots.b12-kozushima-seaweed-rice-kuroshio": {
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
    "spots.b12-kozushima-seaweed-rice-miyako": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    }
  }
};
