import type { JourneyRecord } from '../journey-record';

export const b05KunitachiHoneyRecord: JourneyRecord = {
  "municipalityId": "kunitachi",
  "alcoholThemed": false,
  "journey": {
    "id": "b05-kunitachi-honey",
    "regionId": "kunitachi",
    "foodCultureId": "kunitachi-honey",
    "storyId": "b05-kunitachi-honey",
    "routeId": "b05-kunitachi-honey-route",
    "copy": {
      "ja": {
        "title": "くにたち、花の蜜を飴に",
        "subtitle": "くにたち、花の蜜を飴に",
        "description": "地元の蜂蜜と直売所のつながりを知る。",
        "tags": [
          "国立市"
        ],
        "storyTitle": "くにたち、花の蜜を飴に",
        "intro": [
          "地元の蜂蜜と直売所のつながりを知る。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
        ]
      },
      "en": {
        "title": "Kunitachi wildflower honey in candy",
        "subtitle": "Kunitachi wildflower honey in candy",
        "description": "Discover the link between local honey and a produce shop.",
        "tags": [
          "Kunitachi"
        ],
        "storyTitle": "Kunitachi wildflower honey in candy",
        "intro": [
          "Discover the link between local honey and a produce shop.",
          "This information is unconfirmed. Check the source information before visiting."
        ]
      },
      "zh-TW": {
        "title": "國立百花蜜化為糖果",
        "subtitle": "國立百花蜜化為糖果",
        "description": "認識當地蜂蜜與直售店的連結。",
        "tags": [
          "國立市"
        ],
        "storyTitle": "國立百花蜜化為糖果",
        "intro": [
          "認識當地蜂蜜與直售店的連結。",
          "刊載內容尚未確認。造訪前請查看出處資訊。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "街で採れた百花蜜",
          "body": "くにたちはちみつ飴は、国立市内で採取した百花蜜を使う品として紹介されています。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "Wildflower honey from the city",
          "body": "Kunitachi Honey Candy is described as using wildflower honey harvested within the city."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "市內採收的百花蜜",
          "body": "國立蜂蜜糖介紹為使用市內採收的百花蜜。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {
            "spotId": "b05-kunitachi-honey-shunka"
          }
        ]
      }
    ]
  },
  "routeName": {
    "ja": "くにたち、花の蜜を飴に",
    "en": "Kunitachi wildflower honey in candy",
    "zh-TW": "國立百花蜜化為糖果"
  },
  "location": {
    "ja": {
      "area": "国立市",
      "station": "",
      "access": ""
    },
    "en": {
      "area": "Kunitachi",
      "station": "",
      "access": ""
    },
    "zh-TW": {
      "area": "國立市",
      "station": "",
      "access": ""
    }
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "国立駅南口", "en": "Kunitachi Station South Exit", "zh-TW": "國立站南口"}, "spotId": "b05-kunitachi-honey-shunka", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b05-kunitachi-honey-shunka",
          "description": {
            "ja": "商工会がくにたちはちみつ飴とともに紹介する直売所です。",
            "en": "The produce shop introduced by the chamber with Kunitachi Honey Candy.",
            "zh-TW": "商工會在國立蜂蜜糖介紹中所列的農產直售店。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        }
      ],
      "stats": {
        "ja": {
          "time": "約90分（編集目安）",
          "distance": "",
          "spots": "1 か所",
          "station": "",
          "minutes": "90",
          "access": "",
          "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"
        },
        "en": {
          "time": "About 90 min (editorial estimate)",
          "distance": "",
          "spots": "1 stop",
          "station": "",
          "minutes": "90",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."
        },
        "zh-TW": {
          "time": "約 90 分鐘（編輯估計）",
          "distance": "",
          "spots": "1 處",
          "station": "",
          "minutes": "90",
          "access": "",
          "caution": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
        }
      },
      "guidance": {
        "ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。",
        "en": "This information is unconfirmed. Check the source information before visiting.",
        "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"
      }
    }
  },
  "spots": {
    "b05-kunitachi-honey-shunka": {
      "presentation": {
        "id": "b05-kunitachi-honey-shunka",
        "regionId": "kunitachi",
        "foodCultureId": "kunitachi-honey",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "くにたち野菜 しゅんかしゅんか",
            "lead": "商工会がくにたちはちみつ飴とともに紹介する直売所です。",
            "description": "商工会がくにたちはちみつ飴とともに紹介する直売所です。",
            "tags": [],
            "practicalInfo": [
              {
                "label": "確認状態",
                "value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"
              }
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Kunitachi Yasai Shunka Shunka",
            "lead": "The produce shop introduced by the chamber with Kunitachi Honey Candy.",
            "description": "The produce shop introduced by the chamber with Kunitachi Honey Candy.",
            "tags": [],
            "practicalInfo": [
              {
                "label": "Verification",
                "value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."
              }
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "國立蔬菜 Shunka Shunka",
            "lead": "商工會在國立蜂蜜糖介紹中所列的農產直售店。",
            "description": "商工會在國立蜂蜜糖介紹中所列的農產直售店。",
            "tags": [],
            "practicalInfo": [
              {
                "label": "確認狀態",
                "value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"
              }
            ],
            "caution": [
              "刊載內容尚未確認。造訪前請查看出處資訊。"
            ]
          }
        }
      },
      "detail": {
        "tags": [],
        "description": {
          "ja": "商工会がくにたちはちみつ飴とともに紹介する直売所です。",
          "en": "The produce shop introduced by the chamber with Kunitachi Honey Candy.",
          "zh-TW": "商工會在國立蜂蜜糖介紹中所列的農產直售店。"
        },
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {
              "ja": "出典情報",
              "en": "Source information",
              "zh-TW": "出處資訊"
            },
            "value": {
              "ja": "https://kunitachi-shokokai.jp/item/honey-candy/",
              "en": "https://kunitachi-shokokai.jp/item/honey-candy/",
              "zh-TW": "https://kunitachi-shokokai.jp/item/honey-candy/"
            }
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {
              "ja": "確認状態",
              "en": "Verification",
              "zh-TW": "確認狀態"
            },
            "value": {
              "ja": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。",
              "en": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.",
              "zh-TW": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"
            }
          }
        ],
        "caution": [
          {
            "ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。",
            "en": "This information is unconfirmed. Check the source information before visiting.",
            "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"
          }
        ]
      },
      "officialSource": {
        "name": "くにたち はちみつ飴 | 国立市商工会",
        "url": "https://kunitachi-shokokai.jp/item/honey-candy/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b05-kunitachi-honey-shunka",
          "spotId": "b05-kunitachi-honey-shunka",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "くにたち野菜 しゅんかしゅんか",
            "en": "Kunitachi Yasai Shunka Shunka",
            "zh-TW": "國立蔬菜 Shunka Shunka"
          },
          "description": {
            "ja": "商工会がくにたちはちみつ飴とともに紹介する直売所です。",
            "en": "The produce shop introduced by the chamber with Kunitachi Honey Candy.",
            "zh-TW": "商工會在國立蜂蜜糖介紹中所列的農產直售店。"
          }
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {
        "region": "国立市",
        "station": ""
      },
      "en": {
        "region": "Kunitachi",
        "station": ""
      },
      "zh-TW": {
        "region": "國立市",
        "station": ""
      }
    }
  },
  "sources": {
    "admission-access": {"name": "Kunitachi tourism and community guide – Shunka Shunka", "url": "https://kunimachi.jp/spot/%E3%81%97%E3%82%85%E3%82%93%E3%81%8B%E3%81%97%E3%82%85%E3%82%93%E3%81%8B%E5%9B%BD%E7%AB%8B%E6%9C%AC%E5%BA%97/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-37": {
      "name": "くにたち はちみつ飴 | 国立市商工会",
      "url": "https://kunitachi-shokokai.jp/item/honey-candy/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b05 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://kunitachi-shokokai.jp/item/honey-candy/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-37"
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
        "editorial",
        "source-37"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "spots.b05-kunitachi-honey-shunka": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-37"
      ],
      "origin": "editorial"
    }
  }
};
