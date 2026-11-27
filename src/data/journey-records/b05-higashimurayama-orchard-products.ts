import type { JourneyRecord } from '../journey-record';

export const b05HigashimurayamaOrchardProductsRecord: JourneyRecord = {
  "municipalityId": "higashimurayama",
  "journey": {
    "id": "b05-higashimurayama-orchard-products",
    "regionId": "higashimurayama",
    "foodCultureId": "higashimurayama-orchard-products",
    "storyId": "b05-higashimurayama-orchard-products",
    "routeId": "b05-higashimurayama-orchard-products-route",
    "copy": {
      "ja": {
        "title": "多摩湖梨と東村山の果実",
        "subtitle": "多摩湖梨と東村山の果実",
        "description": "果樹園と果実の加工品を知る。",
        "tags": [
          "東村山市"
        ],
        "storyTitle": "多摩湖梨と東村山の果実",
        "intro": [
          "果樹園と果実の加工品を知る。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
        ]
      },
      "en": {
        "title": "Tamako pears and Higashimurayama fruit",
        "subtitle": "Tamako pears and Higashimurayama fruit",
        "description": "Connect orchards with fruit condiments and sweets.",
        "tags": [
          "Higashimurayama"
        ],
        "storyTitle": "Tamako pears and Higashimurayama fruit",
        "intro": [
          "Connect orchards with fruit condiments and sweets.",
          "This information is unconfirmed. Check the source information before visiting."
        ]
      },
      "zh-TW": {
        "title": "多摩湖梨與東村山果實",
        "subtitle": "多摩湖梨與東村山果實",
        "description": "認識果園、果實調味料與點心。",
        "tags": [
          "東村山市"
        ],
        "storyTitle": "多摩湖梨與東村山果實",
        "intro": [
          "認識果園、果實調味料與點心。",
          "刊載內容尚未確認。造訪前請查看出處資訊。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "果樹園のある街",
          "body": "商工会は多摩湖梨、ぶどう、りんご、キウイの果樹園と、季節のもぎ取りや販売を紹介しています。JAの一覧では、恩多町の金弘園に梨と野菜、秋津町の小俣農園にキウイ、柿、フェイジョアが載っています。"
        },
        {
          "number": "02.",
          "title": "梨を調味料に",
          "body": "竹田商店は多摩湖梨のソースや梨酢を作り、地元農家の旬の野菜や果物も調味料に生かすと紹介されています。"
        },
        {
          "number": "03.",
          "title": "ブルーベリーをお菓子に",
          "body": "清水屋の八國山ブルーベリー饅頭とゼリーは、東村山で収穫した果実を使うと紹介されています。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "A city of orchards",
          "body": "The chamber describes orchards of Tamako pears, grapes, apples and kiwis, with seasonal picking and sales. JA lists pears and vegetables at Kinko-en in Ontacho, and kiwis, persimmons and feijoa at Omata Farm in Akitsucho."
        },
        {
          "number": "02.",
          "title": "Pears as condiments",
          "body": "Takeda Shoten is described as making Tamako pear sauce and pear vinegar, alongside condiments from local growers’ seasonal fruit and vegetables."
        },
        {
          "number": "03.",
          "title": "Blueberries in sweets",
          "body": "Shimizuya’s Hakkokuyama blueberry manju and jelly are described as using fruit harvested in Higashimurayama."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "果園所在的城市",
          "body": "商工會介紹多摩湖梨、葡萄、蘋果及奇異果果園與季節採果、直售。JA 列有恩多町金弘園的梨與蔬菜，以及秋津町小俣農園的奇異果、柿子及費約果。"
        },
        {
          "number": "02.",
          "title": "梨的調味用途",
          "body": "竹田商店以多摩湖梨製作醬汁與梨醋，也將在地農家的時令蔬果製成調味料。"
        },
        {
          "number": "03.",
          "title": "藍莓入點心",
          "body": "清水屋的八國山藍莓饅頭與果凍，介紹為使用東村山收成的藍莓。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 240,
        "steps": [
          {
            "spotId": "b05-higashimurayama-orchard-products-kinko-en"
          },
          {
            "spotId": "b05-higashimurayama-orchard-products-omata"
          },
          {
            "spotId": "b05-higashimurayama-orchard-products-takeda"
          },
          {
            "spotId": "b05-higashimurayama-orchard-products-shimizuya"
          }
        ]
      }
    ]
  },
  "routeName": {
    "ja": "多摩湖梨と東村山の果実",
    "en": "Tamako pears and Higashimurayama fruit",
    "zh-TW": "多摩湖梨與東村山果實"
  },
  "location": {
    "ja": {
      "area": "東村山市",
      "station": "",
      "access": ""
    },
    "en": {
      "area": "Higashimurayama",
      "station": "",
      "access": ""
    },
    "zh-TW": {
      "area": "東村山市",
      "station": "",
      "access": ""
    }
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "東村山駅", "en": "Higashi-Murayama Station", "zh-TW": "東村山站"}, "spotId": "b05-higashimurayama-orchard-products-shimizuya", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b05-higashimurayama-orchard-products-kinko-en",
          "description": {
            "ja": "JAが恩多町の梨と野菜の生産者として掲載しています。",
            "en": "JA lists this Ontacho grower for pears and vegetables.",
            "zh-TW": "JA 列為恩多町的梨與蔬菜生產者。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        },
        {
          "spotId": "b05-higashimurayama-orchard-products-omata",
          "description": {
            "ja": "JAがキウイ、柿、フェイジョアを掲載する農園です。",
            "en": "JA lists this farm with kiwis, persimmons and feijoa.",
            "zh-TW": "JA 列有此農園的奇異果、柿子與費約果。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        },
        {
          "spotId": "b05-higashimurayama-orchard-products-takeda",
          "description": {
            "ja": "多摩湖梨を調味料に加工する作り手です。",
            "en": "A producer turning Tamako pears into condiments.",
            "zh-TW": "將多摩湖梨加工為調味料的業者。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        },
        {
          "spotId": "b05-higashimurayama-orchard-products-shimizuya",
          "description": {
            "ja": "地元産ブルーベリーの饅頭とゼリーが紹介されています。",
            "en": "Listed with manju and jelly made from locally grown blueberries.",
            "zh-TW": "介紹有使用當地藍莓的饅頭與果凍。"
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
          "time": "約240分（編集目安）",
          "distance": "",
          "spots": "4 か所",
          "station": "",
          "minutes": "240",
          "access": "",
          "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"
        },
        "en": {
          "time": "About 240 min (editorial estimate)",
          "distance": "",
          "spots": "4 stops",
          "station": "",
          "minutes": "240",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."
        },
        "zh-TW": {
          "time": "約 240 分鐘（編輯估計）",
          "distance": "",
          "spots": "4 處",
          "station": "",
          "minutes": "240",
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
    "b05-higashimurayama-orchard-products-kinko-en": {
      "presentation": {
        "id": "b05-higashimurayama-orchard-products-kinko-en",
        "regionId": "higashimurayama",
        "foodCultureId": "higashimurayama-orchard-products",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "金弘園",
            "lead": "JAが恩多町の梨と野菜の生産者として掲載しています。",
            "description": "JAが恩多町の梨と野菜の生産者として掲載しています。",
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
            "name": "Kinko-en Farm",
            "lead": "JA lists this Ontacho grower for pears and vegetables.",
            "description": "JA lists this Ontacho grower for pears and vegetables.",
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
            "name": "金弘園",
            "lead": "JA 列為恩多町的梨與蔬菜生產者。",
            "description": "JA 列為恩多町的梨與蔬菜生產者。",
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
          "ja": "JAが恩多町の梨と野菜の生産者として掲載しています。",
          "en": "JA lists this Ontacho grower for pears and vegetables.",
          "zh-TW": "JA 列為恩多町的梨與蔬菜生產者。"
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
              "ja": "https://www.ja-tokyomirai.or.jp/agriculture/niwasaki/",
              "en": "https://www.ja-tokyomirai.or.jp/agriculture/niwasaki/",
              "zh-TW": "https://www.ja-tokyomirai.or.jp/agriculture/niwasaki/"
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
        "name": "庭先直売所｜農業のこと｜ＪＡ東京みらい",
        "url": "https://www.ja-tokyomirai.or.jp/agriculture/niwasaki/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b05-higashimurayama-orchard-products-omata": {
      "presentation": {
        "id": "b05-higashimurayama-orchard-products-omata",
        "regionId": "higashimurayama",
        "foodCultureId": "higashimurayama-orchard-products",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "小俣農園",
            "lead": "JAがキウイ、柿、フェイジョアを掲載する農園です。",
            "description": "JAがキウイ、柿、フェイジョアを掲載する農園です。",
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
            "name": "Omata Farm",
            "lead": "JA lists this farm with kiwis, persimmons and feijoa.",
            "description": "JA lists this farm with kiwis, persimmons and feijoa.",
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
            "name": "小俣農園",
            "lead": "JA 列有此農園的奇異果、柿子與費約果。",
            "description": "JA 列有此農園的奇異果、柿子與費約果。",
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
          "ja": "JAがキウイ、柿、フェイジョアを掲載する農園です。",
          "en": "JA lists this farm with kiwis, persimmons and feijoa.",
          "zh-TW": "JA 列有此農園的奇異果、柿子與費約果。"
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
              "ja": "https://www.ja-tokyomirai.or.jp/agriculture/niwasaki/",
              "en": "https://www.ja-tokyomirai.or.jp/agriculture/niwasaki/",
              "zh-TW": "https://www.ja-tokyomirai.or.jp/agriculture/niwasaki/"
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
        "name": "庭先直売所｜農業のこと｜ＪＡ東京みらい",
        "url": "https://www.ja-tokyomirai.or.jp/agriculture/niwasaki/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b05-higashimurayama-orchard-products-takeda": {
      "presentation": {
        "id": "b05-higashimurayama-orchard-products-takeda",
        "regionId": "higashimurayama",
        "foodCultureId": "higashimurayama-orchard-products",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "竹田商店",
            "lead": "多摩湖梨を調味料に加工する作り手です。",
            "description": "多摩湖梨を調味料に加工する作り手です。",
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
            "name": "Takeda Shoten",
            "lead": "A producer turning Tamako pears into condiments.",
            "description": "A producer turning Tamako pears into condiments.",
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
            "name": "竹田商店",
            "lead": "將多摩湖梨加工為調味料的業者。",
            "description": "將多摩湖梨加工為調味料的業者。",
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
          "ja": "多摩湖梨を調味料に加工する作り手です。",
          "en": "A producer turning Tamako pears into condiments.",
          "zh-TW": "將多摩湖梨加工為調味料的業者。"
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
              "ja": "https://www.shoukoukai.or.jp/satohachi/shops/shop_09/",
              "en": "https://www.shoukoukai.or.jp/satohachi/shops/shop_09/",
              "zh-TW": "https://www.shoukoukai.or.jp/satohachi/shops/shop_09/"
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
        "name": "東村山の新鮮な味がたっぷり入ってま",
        "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_09/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b05-higashimurayama-orchard-products-shimizuya": {
      "presentation": {
        "id": "b05-higashimurayama-orchard-products-shimizuya",
        "regionId": "higashimurayama",
        "foodCultureId": "higashimurayama-orchard-products",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "御菓子司 清水屋",
            "lead": "地元産ブルーベリーの饅頭とゼリーが紹介されています。",
            "description": "地元産ブルーベリーの饅頭とゼリーが紹介されています。",
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
            "name": "Shimizuya Confectionery",
            "lead": "Listed with manju and jelly made from locally grown blueberries.",
            "description": "Listed with manju and jelly made from locally grown blueberries.",
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
            "name": "御菓子司清水屋",
            "lead": "介紹有使用當地藍莓的饅頭與果凍。",
            "description": "介紹有使用當地藍莓的饅頭與果凍。",
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
          "ja": "地元産ブルーベリーの饅頭とゼリーが紹介されています。",
          "en": "Listed with manju and jelly made from locally grown blueberries.",
          "zh-TW": "介紹有使用當地藍莓的饅頭與果凍。"
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
              "ja": "https://www.shoukoukai.or.jp/satohachi/shops/shop_19/",
              "en": "https://www.shoukoukai.or.jp/satohachi/shops/shop_19/",
              "zh-TW": "https://www.shoukoukai.or.jp/satohachi/shops/shop_19/"
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
        "name": "東村山ブランド里に八国 | 認定商品取扱い店一覧",
        "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_19/",
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
          "referenceId": "b05-higashimurayama-orchard-products-kinko-en",
          "spotId": "b05-higashimurayama-orchard-products-kinko-en",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "金弘園",
            "en": "Kinko-en Farm",
            "zh-TW": "金弘園"
          },
          "description": {
            "ja": "JAが恩多町の梨と野菜の生産者として掲載しています。",
            "en": "JA lists this Ontacho grower for pears and vegetables.",
            "zh-TW": "JA 列為恩多町的梨與蔬菜生產者。"
          }
        },
        {
          "referenceId": "b05-higashimurayama-orchard-products-omata",
          "spotId": "b05-higashimurayama-orchard-products-omata",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "小俣農園",
            "en": "Omata Farm",
            "zh-TW": "小俣農園"
          },
          "description": {
            "ja": "JAがキウイ、柿、フェイジョアを掲載する農園です。",
            "en": "JA lists this farm with kiwis, persimmons and feijoa.",
            "zh-TW": "JA 列有此農園的奇異果、柿子與費約果。"
          }
        },
        {
          "referenceId": "b05-higashimurayama-orchard-products-takeda",
          "spotId": "b05-higashimurayama-orchard-products-takeda",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "竹田商店",
            "en": "Takeda Shoten",
            "zh-TW": "竹田商店"
          },
          "description": {
            "ja": "多摩湖梨を調味料に加工する作り手です。",
            "en": "A producer turning Tamako pears into condiments.",
            "zh-TW": "將多摩湖梨加工為調味料的業者。"
          }
        },
        {
          "referenceId": "b05-higashimurayama-orchard-products-shimizuya",
          "spotId": "b05-higashimurayama-orchard-products-shimizuya",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "御菓子司 清水屋",
            "en": "Shimizuya Confectionery",
            "zh-TW": "御菓子司清水屋"
          },
          "description": {
            "ja": "地元産ブルーベリーの饅頭とゼリーが紹介されています。",
            "en": "Listed with manju and jelly made from locally grown blueberries.",
            "zh-TW": "介紹有使用當地藍莓的饅頭與果凍。"
          }
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {
        "region": "東村山市",
        "station": ""
      },
      "en": {
        "region": "Higashimurayama",
        "station": ""
      },
      "zh-TW": {
        "region": "東村山市",
        "station": ""
      }
    }
  },
  "sources": {
    "admission-access": {"name": "Tokyo Grown Shimizuya listing", "url": "https://tokyogrown.jp/node/597277", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-2": {
      "name": "東村山市の特産品 – 東村山市商工会",
      "url": "https://shoukoukai.or.jp/city_info/specialty_goods/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-8": {
      "name": "庭先直売所｜農業のこと｜ＪＡ東京みらい",
      "url": "https://www.ja-tokyomirai.or.jp/agriculture/niwasaki/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-9": {
      "name": "東村山の新鮮な味がたっぷり入ってま",
      "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_09/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-20": {
      "name": "東村山ブランド里に八国 | 認定商品取扱い店一覧",
      "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_19/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b05 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://shoukoukai.or.jp/city_info/specialty_goods/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-2",
        "source-8",
        "source-9",
        "source-20"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-2",
        "source-8",
        "source-9",
        "source-20"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-2",
        "source-8",
        "source-9",
        "source-20"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-2",
        "source-8",
        "source-9",
        "source-20"
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
        "source-2",
        "source-8",
        "source-9",
        "source-20"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-2",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-2",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-2",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-9"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-9"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-9"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "spots.b05-higashimurayama-orchard-products-kinko-en": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    },
    "spots.b05-higashimurayama-orchard-products-omata": {
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
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    },
    "spots.b05-higashimurayama-orchard-products-takeda": {
      "sourceIds": [
        "source-9"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.2": {
      "sourceIds": [
        "source-9"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.2.description": {
      "sourceIds": [
        "source-9"
      ],
      "origin": "editorial"
    },
    "spots.b05-higashimurayama-orchard-products-shimizuya": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.3": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.3.description": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    }
  }
};
