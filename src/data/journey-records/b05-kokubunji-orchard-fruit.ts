import type { JourneyRecord } from '../journey-record';

export const b05KokubunjiOrchardFruitRecord: JourneyRecord = {
  "municipalityId": "kokubunji",
  "journey": {
    "id": "b05-kokubunji-orchard-fruit",
    "regionId": "kokubunji",
    "foodCultureId": "kokubunji-orchard-fruit",
    "storyId": "b05-kokubunji-orchard-fruit",
    "routeId": "b05-kokubunji-orchard-fruit-route",
    "copy": {
      "ja": {
        "title": "国分寺の果実といちごビール",
        "subtitle": "国分寺の果実といちごビール",
        "description": "果樹と加工品から季節を読む。",
        "tags": [
          "国分寺市"
        ],
        "storyTitle": "国分寺の果実といちごビール",
        "intro": [
          "果樹と加工品から季節を読む。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
        ]
      },
      "en": {
        "title": "Kokubunji fruit and strawberry beer",
        "subtitle": "Kokubunji fruit and strawberry beer",
        "description": "Read the seasons through fruit and related products.",
        "tags": [
          "Kokubunji"
        ],
        "storyTitle": "Kokubunji fruit and strawberry beer",
        "intro": [
          "Read the seasons through fruit and related products.",
          "This information is unconfirmed. Check the source information before visiting."
        ]
      },
      "zh-TW": {
        "title": "國分寺果實與草莓啤酒",
        "subtitle": "國分寺果實與草莓啤酒",
        "description": "從果實與加工品認識季節。",
        "tags": [
          "國分寺市"
        ],
        "storyTitle": "國分寺果實與草莓啤酒",
        "intro": [
          "從果實與加工品認識季節。",
          "刊載內容尚未確認。造訪前請查看出處資訊。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "ブルーベリーとぶどう",
          "body": "市はブルーベリーを農業産出額上位の品目として紹介しています。JAのナイトウ果樹園の案内には、ピオーネ、シャインマスカットなどのぶどうとブルーベリーが載っています。"
        },
        {
          "number": "02.",
          "title": "いちごからビールへ",
          "body": "国分寺中村農園は紅ほっぺ、あまえくぼ、よつぼし、かおり野を栽培すると紹介されています。別の市の食記事には同農園のイチゴビールが登場します。"
        },
        {
          "number": "03.",
          "title": "秋の作物と季節果樹園",
          "body": "市のこくベジ紹介は、秋の作物に柿、さつまいも、ぶどうを挙げています。榎戸ファームは、ブルーベリーを含む10種類以上の季節の果実を栽培・直売すると説明しています。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "Blueberries and grapes",
          "body": "The city lists blueberries among its leading crops by output value. JA’s Naito Orchard entry names grapes including Pione and Shine Muscat, as well as blueberries."
        },
        {
          "number": "02.",
          "title": "Strawberries into beer",
          "body": "The Nakamura Farm profile lists Benihoppe, Amaekubo, Yotsuboshi and Kaorino strawberries. Another city food article features the farm’s strawberry beer."
        },
        {
          "number": "03.",
          "title": "Autumn crops and seasonal orchards",
          "body": "The city’s seasonal Kokuvege guide names persimmons, sweet potatoes and grapes for autumn. Enokido Farm describes growing and directly selling more than ten kinds of seasonal fruit, including blueberries."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "藍莓與葡萄",
          "body": "市府將藍莓列為農業產值領先的作物。JA 的 Naito 果園介紹列有 Pione、香印等葡萄與藍莓。"
        },
        {
          "number": "02.",
          "title": "草莓化為啤酒",
          "body": "中村農園介紹列有紅頰、Amaekubo、四星及馨香草莓；另一篇市府飲食報導介紹該農園的草莓啤酒。"
        },
        {
          "number": "03.",
          "title": "秋收與季節果園",
          "body": "市府 Kokuvege 季節指南將柿子、地瓜及葡萄列為秋季作物。榎戶農場說明種植並直售包含藍莓在內的十多種時令果實。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 150,
        "steps": [
          {
            "spotId": "b05-kokubunji-orchard-fruit-naito"
          },
          {
            "spotId": "b05-kokubunji-orchard-fruit-enokido"
          }
        ]
      }
    ]
  },
  "routeName": {
    "ja": "国分寺の果実といちごビール",
    "en": "Kokubunji fruit and strawberry beer",
    "zh-TW": "國分寺果實與草莓啤酒"
  },
  "location": {
    "ja": {
      "area": "国分寺市",
      "station": "",
      "access": ""
    },
    "en": {
      "area": "Kokubunji",
      "station": "",
      "access": ""
    },
    "zh-TW": {
      "area": "國分寺市",
      "station": "",
      "access": ""
    }
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "並木町", "en": "Namiki-cho bus stop", "zh-TW": "並木町公車站"}, "spotId": "b05-kokubunji-orchard-fruit-enokido", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b05-kokubunji-orchard-fruit-naito",
          "description": {
            "ja": "JAがぶどうとブルーベリーを紹介する果樹園です。",
            "en": "JA profiles this orchard for grapes and blueberries.",
            "zh-TW": "JA 介紹此果園的葡萄與藍莓。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        },
        {
          "spotId": "b05-kokubunji-orchard-fruit-enokido",
          "description": {
            "ja": "国分寺でブルーベリーなどの季節果実を栽培・直売すると紹介しています。",
            "en": "The farm describes growing and directly selling blueberries and other seasonal fruit in Kokubunji.",
            "zh-TW": "農場介紹在國分寺種植並直售藍莓等時令果實。"
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
          "time": "約150分（編集目安）",
          "distance": "",
          "spots": "2 か所",
          "station": "",
          "minutes": "150",
          "access": "",
          "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"
        },
        "en": {
          "time": "About 150 min (editorial estimate)",
          "distance": "",
          "spots": "2 stops",
          "station": "",
          "minutes": "150",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."
        },
        "zh-TW": {
          "time": "約 150 分鐘（編輯估計）",
          "distance": "",
          "spots": "2 處",
          "station": "",
          "minutes": "150",
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
    "b05-kokubunji-orchard-fruit-naito": {
      "presentation": {
        "id": "b05-kokubunji-orchard-fruit-naito",
        "regionId": "kokubunji",
        "foodCultureId": "kokubunji-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "ナイトウ果樹園",
            "lead": "JAがぶどうとブルーベリーを紹介する果樹園です。",
            "description": "JAがぶどうとブルーベリーを紹介する果樹園です。",
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
            "name": "Naito Orchard",
            "lead": "JA profiles this orchard for grapes and blueberries.",
            "description": "JA profiles this orchard for grapes and blueberries.",
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
            "name": "Naito 果園",
            "lead": "JA 介紹此果園的葡萄與藍莓。",
            "description": "JA 介紹此果園的葡萄與藍莓。",
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
          "ja": "JAがぶどうとブルーベリーを紹介する果樹園です。",
          "en": "JA profiles this orchard for grapes and blueberries.",
          "zh-TW": "JA 介紹此果園的葡萄與藍莓。"
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
              "ja": "https://www.jatm.or.jp/farming/plant/detail.php?id=89&type=grape",
              "en": "https://www.jatm.or.jp/farming/plant/detail.php?id=89&type=grape",
              "zh-TW": "https://www.jatm.or.jp/farming/plant/detail.php?id=89&type=grape"
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
        "name": "ナイトウ果樹園｜店舗一覧｜ＪＡ東京むさし",
        "url": "https://www.jatm.or.jp/farming/plant/detail.php?id=89&type=grape",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b05-kokubunji-orchard-fruit-enokido": {
      "presentation": {
        "id": "b05-kokubunji-orchard-fruit-enokido",
        "regionId": "kokubunji",
        "foodCultureId": "kokubunji-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "榎戸ファーム",
            "lead": "国分寺でブルーベリーなどの季節果実を栽培・直売すると紹介しています。",
            "description": "国分寺でブルーベリーなどの季節果実を栽培・直売すると紹介しています。",
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
            "name": "Enokido Farm",
            "lead": "The farm describes growing and directly selling blueberries and other seasonal fruit in Kokubunji.",
            "description": "The farm describes growing and directly selling blueberries and other seasonal fruit in Kokubunji.",
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
            "name": "榎戶農場",
            "lead": "農場介紹在國分寺種植並直售藍莓等時令果實。",
            "description": "農場介紹在國分寺種植並直售藍莓等時令果實。",
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
          "ja": "国分寺でブルーベリーなどの季節果実を栽培・直売すると紹介しています。",
          "en": "The farm describes growing and directly selling blueberries and other seasonal fruit in Kokubunji.",
          "zh-TW": "農場介紹在國分寺種植並直售藍莓等時令果實。"
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
              "ja": "https://www.enokido-farm.jp/",
              "en": "https://www.enokido-farm.jp/",
              "zh-TW": "https://www.enokido-farm.jp/"
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
        "name": "季節果樹園　榎戸ファーム",
        "url": "https://www.enokido-farm.jp/",
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
          "referenceId": "b05-kokubunji-orchard-fruit-naito",
          "spotId": "b05-kokubunji-orchard-fruit-naito",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "ナイトウ果樹園",
            "en": "Naito Orchard",
            "zh-TW": "Naito 果園"
          },
          "description": {
            "ja": "JAがぶどうとブルーベリーを紹介する果樹園です。",
            "en": "JA profiles this orchard for grapes and blueberries.",
            "zh-TW": "JA 介紹此果園的葡萄與藍莓。"
          }
        },
        {
          "referenceId": "b05-kokubunji-orchard-fruit-enokido",
          "spotId": "b05-kokubunji-orchard-fruit-enokido",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "榎戸ファーム",
            "en": "Enokido Farm",
            "zh-TW": "榎戶農場"
          },
          "description": {
            "ja": "国分寺でブルーベリーなどの季節果実を栽培・直売すると紹介しています。",
            "en": "The farm describes growing and directly selling blueberries and other seasonal fruit in Kokubunji.",
            "zh-TW": "農場介紹在國分寺種植並直售藍莓等時令果實。"
          }
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {
        "region": "国分寺市",
        "station": ""
      },
      "en": {
        "region": "Kokubunji",
        "station": ""
      },
      "zh-TW": {
        "region": "國分寺市",
        "station": ""
      }
    }
  },
  "sources": {
    "admission-access": {"name": "Enokido Farm access", "url": "https://www.enokido-farm.jp/map.html", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-26": {
      "name": "国分寺市の代表的な農畜産物や特産品は何ですか。｜国分寺市",
      "url": "https://www.city.kokubunji.tokyo.jp/faq/kurashi/1005239/1005297/1006217.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-28": {
      "name": "ナイトウ果樹園｜店舗一覧｜ＪＡ東京むさし",
      "url": "https://www.jatm.or.jp/farming/plant/detail.php?id=89&type=grape",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-24": {
      "name": "都市農業が盛んな国分寺で生まれた「こくベジ」の魅力とは？ | 国分寺市観光シティプロモーションサイト",
      "url": "https://kokubunji-citypro.jp/article/394/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-27": {
      "name": "人気料理家・栗原心平さんに聞く「こくベジの美味しい食べ方」～野菜たっぷり夏養生の混ぜごはん～ | 国分寺市観光シティプロモーションサイト",
      "url": "https://kokubunji-citypro.jp/article/2746/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-29": {
      "name": "季節果樹園　榎戸ファーム",
      "url": "https://www.enokido-farm.jp/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b05 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://www.city.kokubunji.tokyo.jp/faq/kurashi/1005239/1005297/1006217.html",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-26",
        "source-28",
        "source-24",
        "source-27",
        "source-29"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-26",
        "source-28",
        "source-24",
        "source-27",
        "source-29"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-26",
        "source-28",
        "source-24",
        "source-27",
        "source-29"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-26",
        "source-28",
        "source-24",
        "source-27",
        "source-29"
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
        "source-26",
        "source-28",
        "source-24",
        "source-27",
        "source-29"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-26",
        "source-28"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-26",
        "source-28"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-26",
        "source-28"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-24",
        "source-27"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-24",
        "source-27"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-24",
        "source-27"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-24",
        "source-29"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-24",
        "source-29"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-24",
        "source-29"
      ],
      "origin": "editorial"
    },
    "spots.b05-kokubunji-orchard-fruit-naito": {
      "sourceIds": [
        "source-28"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-28"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-28"
      ],
      "origin": "editorial"
    },
    "spots.b05-kokubunji-orchard-fruit-enokido": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    }
  }
};
