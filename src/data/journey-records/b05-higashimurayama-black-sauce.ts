import type { JourneyRecord } from '../journey-record';

export const b05HigashimurayamaBlackSauceRecord: JourneyRecord = {
  "municipalityId": "higashimurayama",
  "alcoholThemed": false,
  "journey": {
    "id": "b05-higashimurayama-black-sauce",
    "regionId": "higashimurayama",
    "foodCultureId": "higashimurayama-black-sauce",
    "storyId": "b05-higashimurayama-black-sauce",
    "routeId": "b05-higashimurayama-black-sauce-route",
    "copy": {
      "ja": {
        "title": "東村山の黒ソース文化",
        "subtitle": "東村山の黒ソース文化",
        "description": "黒焼そばからつけめん、うどんへ。",
        "tags": [
          "東村山市"
        ],
        "storyTitle": "東村山の黒ソース文化",
        "intro": [
          "黒焼そばからつけめん、うどんへ。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
        ]
      },
      "en": {
        "title": "Higashimurayama’s black-sauce culture",
        "subtitle": "Higashimurayama’s black-sauce culture",
        "description": "Explore black yakisoba sauce and its noodle variations.",
        "tags": [
          "Higashimurayama"
        ],
        "storyTitle": "Higashimurayama’s black-sauce culture",
        "intro": [
          "Explore black yakisoba sauce and its noodle variations.",
          "This information is unconfirmed. Check the source information before visiting."
        ]
      },
      "zh-TW": {
        "title": "東村山的黑醬文化",
        "subtitle": "東村山的黑醬文化",
        "description": "從黑炒麵延伸至沾麵與烏龍麵。",
        "tags": [
          "東村山市"
        ],
        "storyTitle": "東村山的黑醬文化",
        "intro": [
          "從黑炒麵延伸至沾麵與烏龍麵。",
          "刊載內容尚未確認。造訪前請查看出處資訊。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "黒いソースの物語",
          "body": "東京都は、ポールスタアが開発した黒ソースにイカスミ、鹿児島の黒酒、スパイスを使うと紹介しています。同社の始まりは1850年の醤油店。黒色の着想は、1333年の久米川の戦い前に兵が夜食へ炭をかけたという伝説に結びつけられています。"
        },
        {
          "number": "02.",
          "title": "地名を冠する調味料",
          "body": "商工会の紹介には、メイドイン東村山ソース、千体地蔵ソース、これぞ東村山うどんつゆ、東村山黒焼そばソースの4本が並びます。"
        },
        {
          "number": "03.",
          "title": "麺を変えて広がる味",
          "body": "まるみは豚骨ベースのつけ汁に黒ソースと東村山ワインを加えます。東村山に本社を置く一休は、黒ソースを使った黒焼うどんを紹介されています。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "The story behind the sauce",
          "body": "Tokyo’s guide describes Pole Star’s black sauce as a blend of squid ink, Kagoshima kuroshu and spices, and traces the business to an 1850 soy-sauce shop. It links the color’s inspiration to a legend of soldiers covering a night meal with charcoal before the 1333 Kumegawa battle."
        },
        {
          "number": "02.",
          "title": "Condiments named for the city",
          "body": "The chamber lists Made in Higashimurayama Sauce, Sentai Jizo Sauce, Higashimurayama Udon Tsuyu and Black Yakisoba Sauce."
        },
        {
          "number": "03.",
          "title": "Different noodles, shared sauce",
          "body": "Marumi combines black sauce and Higashimurayama wine in a pork-bone dipping broth. The Higashimurayama-based Ikkyu group is listed with black-sauce stir-fried udon."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "黑醬背後的故事",
          "body": "東京都資料介紹黑醬由 Pole Star 開發，混合墨魚汁、鹿兒島黑酒與香料，公司源自 1850 年的醬油店。黑色靈感連結到一則傳說：1333 年久米川之戰前，士兵在宵夜上撒炭。"
        },
        {
          "number": "02.",
          "title": "以地方命名的調味料",
          "body": "商工會列出 Made in 東村山醬、千體地藏醬、東村山烏龍麵汁及東村山黑炒麵醬四款產品。"
        },
        {
          "number": "03.",
          "title": "不同麵條，同樣黑醬",
          "body": "Marumi 在豚骨沾汁加入黑醬與東村山葡萄酒。總部位於東村山的一休集團則有使用黑醬的炒烏龍麵介紹。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 150,
        "steps": [
          {
            "spotId": "b05-higashimurayama-black-sauce-pole-star"
          },
          {
            "spotId": "b05-higashimurayama-black-sauce-marumi"
          },
          {
            "spotId": "b05-higashimurayama-black-sauce-ikkyu"
          }
        ]
      }
    ]
  },
  "routeName": {
    "ja": "東村山の黒ソース文化",
    "en": "Higashimurayama’s black-sauce culture",
    "zh-TW": "東村山的黑醬文化"
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
      "arrival": {"kind": "station", "name": {"ja": "東村山駅", "en": "Higashi-Murayama Station", "zh-TW": "東村山站"}, "spotId": "b05-higashimurayama-black-sauce-pole-star", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b05-higashimurayama-black-sauce-pole-star",
          "description": {
            "ja": "商工会が東村山シリーズの調味料とショップを掲載しています。",
            "en": "The chamber lists the shop with the Higashimurayama condiment series.",
            "zh-TW": "商工會介紹此商店及東村山系列調味料。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        },
        {
          "spotId": "b05-higashimurayama-black-sauce-marumi",
          "description": {
            "ja": "黒ソースつけめんの紹介先です。",
            "en": "Listed for black-sauce tsukemen.",
            "zh-TW": "黑醬沾麵的介紹店家。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        },
        {
          "spotId": "b05-higashimurayama-black-sauce-ikkyu",
          "description": {
            "ja": "黒焼うどんの紹介ページに載る店舗です。",
            "en": "An outlet listed on the black stir-fried udon page.",
            "zh-TW": "黑炒烏龍麵介紹頁所列的分店。"
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
          "spots": "3 か所",
          "station": "",
          "minutes": "150",
          "access": "",
          "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"
        },
        "en": {
          "time": "About 150 min (editorial estimate)",
          "distance": "",
          "spots": "3 stops",
          "station": "",
          "minutes": "150",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."
        },
        "zh-TW": {
          "time": "約 150 分鐘（編輯估計）",
          "distance": "",
          "spots": "3 處",
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
    "b05-higashimurayama-black-sauce-pole-star": {
      "presentation": {
        "id": "b05-higashimurayama-black-sauce-pole-star",
        "regionId": "higashimurayama",
        "foodCultureId": "higashimurayama-black-sauce",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "ポールスタア ショップ",
            "lead": "商工会が東村山シリーズの調味料とショップを掲載しています。",
            "description": "商工会が東村山シリーズの調味料とショップを掲載しています。",
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
            "name": "Pole Star Shop",
            "lead": "The chamber lists the shop with the Higashimurayama condiment series.",
            "description": "The chamber lists the shop with the Higashimurayama condiment series.",
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
            "name": "Pole Star 商店",
            "lead": "商工會介紹此商店及東村山系列調味料。",
            "description": "商工會介紹此商店及東村山系列調味料。",
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
          "ja": "商工会が東村山シリーズの調味料とショップを掲載しています。",
          "en": "The chamber lists the shop with the Higashimurayama condiment series.",
          "zh-TW": "商工會介紹此商店及東村山系列調味料。"
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
              "ja": "https://www.shoukoukai.or.jp/satohachi/shops/shop_08/",
              "en": "https://www.shoukoukai.or.jp/satohachi/shops/shop_08/",
              "zh-TW": "https://www.shoukoukai.or.jp/satohachi/shops/shop_08/"
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
        "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_08/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b05-higashimurayama-black-sauce-marumi": {
      "presentation": {
        "id": "b05-higashimurayama-black-sauce-marumi",
        "regionId": "higashimurayama",
        "foodCultureId": "higashimurayama-black-sauce",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "ラーメン本舗 まるみ",
            "lead": "黒ソースつけめんの紹介先です。",
            "description": "黒ソースつけめんの紹介先です。",
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
            "name": "Ramen Honpo Marumi",
            "lead": "Listed for black-sauce tsukemen.",
            "description": "Listed for black-sauce tsukemen.",
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
            "name": "拉麵本舖 Marumi",
            "lead": "黑醬沾麵的介紹店家。",
            "description": "黑醬沾麵的介紹店家。",
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
          "ja": "黒ソースつけめんの紹介先です。",
          "en": "Listed for black-sauce tsukemen.",
          "zh-TW": "黑醬沾麵的介紹店家。"
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
              "ja": "https://www.shoukoukai.or.jp/satohachi/shops/shop_06/",
              "en": "https://www.shoukoukai.or.jp/satohachi/shops/shop_06/",
              "zh-TW": "https://www.shoukoukai.or.jp/satohachi/shops/shop_06/"
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
        "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_06/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b05-higashimurayama-black-sauce-ikkyu": {
      "presentation": {
        "id": "b05-higashimurayama-black-sauce-ikkyu",
        "regionId": "higashimurayama",
        "foodCultureId": "higashimurayama-black-sauce",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "焼鳥一休 久米川店",
            "lead": "黒焼うどんの紹介ページに載る店舗です。",
            "description": "黒焼うどんの紹介ページに載る店舗です。",
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
            "name": "Yakitori Ikkyu Kumegawa",
            "lead": "An outlet listed on the black stir-fried udon page.",
            "description": "An outlet listed on the black stir-fried udon page.",
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
            "name": "燒鳥一休久米川店",
            "lead": "黑炒烏龍麵介紹頁所列的分店。",
            "description": "黑炒烏龍麵介紹頁所列的分店。",
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
          "ja": "黒焼うどんの紹介ページに載る店舗です。",
          "en": "An outlet listed on the black stir-fried udon page.",
          "zh-TW": "黑炒烏龍麵介紹頁所列的分店。"
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
              "ja": "https://www.shoukoukai.or.jp/satohachi/shops/shop_21/",
              "en": "https://www.shoukoukai.or.jp/satohachi/shops/shop_21/",
              "zh-TW": "https://www.shoukoukai.or.jp/satohachi/shops/shop_21/"
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
        "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_21/",
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
          "referenceId": "b05-higashimurayama-black-sauce-pole-star",
          "spotId": "b05-higashimurayama-black-sauce-pole-star",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "ポールスタア ショップ",
            "en": "Pole Star Shop",
            "zh-TW": "Pole Star 商店"
          },
          "description": {
            "ja": "商工会が東村山シリーズの調味料とショップを掲載しています。",
            "en": "The chamber lists the shop with the Higashimurayama condiment series.",
            "zh-TW": "商工會介紹此商店及東村山系列調味料。"
          }
        },
        {
          "referenceId": "b05-higashimurayama-black-sauce-marumi",
          "spotId": "b05-higashimurayama-black-sauce-marumi",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "ラーメン本舗 まるみ",
            "en": "Ramen Honpo Marumi",
            "zh-TW": "拉麵本舖 Marumi"
          },
          "description": {
            "ja": "黒ソースつけめんの紹介先です。",
            "en": "Listed for black-sauce tsukemen.",
            "zh-TW": "黑醬沾麵的介紹店家。"
          }
        },
        {
          "referenceId": "b05-higashimurayama-black-sauce-ikkyu",
          "spotId": "b05-higashimurayama-black-sauce-ikkyu",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "焼鳥一休 久米川店",
            "en": "Yakitori Ikkyu Kumegawa",
            "zh-TW": "燒鳥一休久米川店"
          },
          "description": {
            "ja": "黒焼うどんの紹介ページに載る店舗です。",
            "en": "An outlet listed on the black stir-fried udon page.",
            "zh-TW": "黑炒烏龍麵介紹頁所列的分店。"
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
    "admission-access": {"name": "Seibu Railway Pole Star visitor listing", "url": "https://www.seiburailway.jp/railways/fillute/food/202304-01/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-4": {
      "name": "東村山黒焼そば ｜地域資源紹介記事 ｜ 東京都　地域資源（TOKYOイチオシナビ）",
      "url": "https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_114.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-5": {
      "name": "東村山ブランド里に八国 | 認定商品取扱い店一覧",
      "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_08/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-6": {
      "name": "東村山ブランド里に八国 | 認定商品取扱い店一覧",
      "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_06/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-7": {
      "name": "東村山ブランド里に八国 | 認定商品取扱い店一覧",
      "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_21/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b05 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_114.html",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-4",
        "source-5",
        "source-6",
        "source-7"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-4",
        "source-5",
        "source-6",
        "source-7"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-4",
        "source-5",
        "source-6",
        "source-7"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-4",
        "source-5",
        "source-6",
        "source-7"
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
        "source-4",
        "source-5",
        "source-6",
        "source-7"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-4"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-4"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-4"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-6",
        "source-7"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-6",
        "source-7"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-6",
        "source-7"
      ],
      "origin": "editorial"
    },
    "spots.b05-higashimurayama-black-sauce-pole-star": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "spots.b05-higashimurayama-black-sauce-marumi": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "spots.b05-higashimurayama-black-sauce-ikkyu": {
      "sourceIds": [
        "source-7"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.2": {
      "sourceIds": [
        "source-7"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.2.description": {
      "sourceIds": [
        "source-7"
      ],
      "origin": "editorial"
    }
  }
};
