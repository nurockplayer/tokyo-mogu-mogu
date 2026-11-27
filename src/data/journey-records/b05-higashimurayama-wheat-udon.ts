import type { JourneyRecord } from '../journey-record';

export const b05HigashimurayamaWheatUdonRecord: JourneyRecord = {
  "municipalityId": "higashimurayama",
  "alcoholThemed": false,
  "journey": {
    "id": "b05-higashimurayama-wheat-udon",
    "regionId": "higashimurayama",
    "foodCultureId": "higashimurayama-wheat-udon",
    "storyId": "b05-higashimurayama-wheat-udon",
    "routeId": "b05-higashimurayama-wheat-udon-route",
    "copy": {
      "ja": {
        "title": "東村山の地粉とうどん",
        "subtitle": "東村山の地粉とうどん",
        "description": "地粉の麺とお菓子をたどる。",
        "tags": [
          "東村山市"
        ],
        "storyTitle": "東村山の地粉とうどん",
        "intro": [
          "地粉の麺とお菓子をたどる。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
        ]
      },
      "en": {
        "title": "Higashimurayama wheat and udon",
        "subtitle": "Higashimurayama wheat and udon",
        "description": "Follow local flour into noodles and sweets.",
        "tags": [
          "Higashimurayama"
        ],
        "storyTitle": "Higashimurayama wheat and udon",
        "intro": [
          "Follow local flour into noodles and sweets.",
          "This information is unconfirmed. Check the source information before visiting."
        ]
      },
      "zh-TW": {
        "title": "東村山的在地小麥與烏龍麵",
        "subtitle": "東村山的在地小麥與烏龍麵",
        "description": "從在地麵粉認識麵食與點心。",
        "tags": [
          "東村山市"
        ],
        "storyTitle": "東村山的在地小麥與烏龍麵",
        "intro": [
          "從在地麵粉認識麵食與點心。",
          "刊載內容尚未確認。造訪前請查看出處資訊。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "集まりの麺",
          "body": "商工会は、家族や近所の集まりで地粉の手打ちうどんを振る舞った習慣を紹介しています。小島屋の肉汁うどんには、糧と呼ぶ旬の野菜を添えます。"
        },
        {
          "number": "02.",
          "title": "小麦を麺と甘味に",
          "body": "野口製麺所の地粉肉汁うどんは、近隣の契約農家が育てる東村山産小麦のみを使用。同じ小麦で黒糖のサーターアンダギーも作ると紹介されています。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "Noodles for gatherings",
          "body": "The chamber describes a custom of sharing handmade local-flour udon at family and neighborhood gatherings. Kojimaya pairs meat-broth udon with seasonal vegetables called kate."
        },
        {
          "number": "02.",
          "title": "One wheat, two forms",
          "body": "Noguchi Seimenjo’s local-flour meat-broth udon uses only Higashimurayama wheat from nearby contract growers. The same wheat also becomes brown-sugar sata andagi."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "相聚時的麵食",
          "body": "商工會介紹家人與鄰里聚會時分享在地麵粉手打烏龍麵的習慣。小島屋的肉汁烏龍麵搭配稱為「糧」的時令蔬菜。"
        },
        {
          "number": "02.",
          "title": "小麥的兩種風貌",
          "body": "野口製麵所以鄰近契作農家種植的東村山小麥製作地粉肉汁烏龍麵，也以相同小麥製作黑糖沙翁。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 150,
        "steps": [
          {
            "spotId": "b05-higashimurayama-wheat-udon-kojimaya"
          },
          {
            "spotId": "b05-higashimurayama-wheat-udon-noguchi"
          }
        ]
      }
    ]
  },
  "routeName": {
    "ja": "東村山の地粉とうどん",
    "en": "Higashimurayama wheat and udon",
    "zh-TW": "東村山的在地小麥與烏龍麵"
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
      "arrival": {"kind": "station", "name": {"ja": "東村山駅", "en": "Higashi-Murayama Station", "zh-TW": "東村山站"}, "spotId": "b05-higashimurayama-wheat-udon-noguchi", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b05-higashimurayama-wheat-udon-kojimaya",
          "description": {
            "ja": "商工会が肉汁うどんと糧を紹介する店です。",
            "en": "The chamber introduces this shop’s meat-broth udon and kate vegetables.",
            "zh-TW": "商工會介紹此店的肉汁烏龍麵與時令配菜「糧」。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        },
        {
          "spotId": "b05-higashimurayama-wheat-udon-noguchi",
          "description": {
            "ja": "東村山産小麦のうどんとサーターアンダギーの作り手です。",
            "en": "A maker of udon and sata andagi using Higashimurayama wheat.",
            "zh-TW": "以東村山小麥製作烏龍麵與沙翁的店家。"
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
    "b05-higashimurayama-wheat-udon-kojimaya": {
      "presentation": {
        "id": "b05-higashimurayama-wheat-udon-kojimaya",
        "regionId": "higashimurayama",
        "foodCultureId": "higashimurayama-wheat-udon",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "手打ちうどん 小島屋",
            "lead": "商工会が肉汁うどんと糧を紹介する店です。",
            "description": "商工会が肉汁うどんと糧を紹介する店です。",
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
            "name": "Kojimaya Handmade Udon",
            "lead": "The chamber introduces this shop’s meat-broth udon and kate vegetables.",
            "description": "The chamber introduces this shop’s meat-broth udon and kate vegetables.",
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
            "name": "小島屋手打烏龍麵",
            "lead": "商工會介紹此店的肉汁烏龍麵與時令配菜「糧」。",
            "description": "商工會介紹此店的肉汁烏龍麵與時令配菜「糧」。",
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
          "ja": "商工会が肉汁うどんと糧を紹介する店です。",
          "en": "The chamber introduces this shop’s meat-broth udon and kate vegetables.",
          "zh-TW": "商工會介紹此店的肉汁烏龍麵與時令配菜「糧」。"
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
              "ja": "https://www.shoukoukai.or.jp/satohachi/shops/shop_01/",
              "en": "https://www.shoukoukai.or.jp/satohachi/shops/shop_01/",
              "zh-TW": "https://www.shoukoukai.or.jp/satohachi/shops/shop_01/"
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
        "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_01/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b05-higashimurayama-wheat-udon-noguchi": {
      "presentation": {
        "id": "b05-higashimurayama-wheat-udon-noguchi",
        "regionId": "higashimurayama",
        "foodCultureId": "higashimurayama-wheat-udon",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "野口製麺所",
            "lead": "東村山産小麦のうどんとサーターアンダギーの作り手です。",
            "description": "東村山産小麦のうどんとサーターアンダギーの作り手です。",
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
            "name": "Noguchi Seimenjo",
            "lead": "A maker of udon and sata andagi using Higashimurayama wheat.",
            "description": "A maker of udon and sata andagi using Higashimurayama wheat.",
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
            "name": "野口製麵所",
            "lead": "以東村山小麥製作烏龍麵與沙翁的店家。",
            "description": "以東村山小麥製作烏龍麵與沙翁的店家。",
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
          "ja": "東村山産小麦のうどんとサーターアンダギーの作り手です。",
          "en": "A maker of udon and sata andagi using Higashimurayama wheat.",
          "zh-TW": "以東村山小麥製作烏龍麵與沙翁的店家。"
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
              "ja": "https://www.shoukoukai.or.jp/satohachi/shops/shop_05/",
              "en": "https://www.shoukoukai.or.jp/satohachi/shops/shop_05/",
              "zh-TW": "https://www.shoukoukai.or.jp/satohachi/shops/shop_05/"
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
        "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_05/",
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
          "referenceId": "b05-higashimurayama-wheat-udon-kojimaya",
          "spotId": "b05-higashimurayama-wheat-udon-kojimaya",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "手打ちうどん 小島屋",
            "en": "Kojimaya Handmade Udon",
            "zh-TW": "小島屋手打烏龍麵"
          },
          "description": {
            "ja": "商工会が肉汁うどんと糧を紹介する店です。",
            "en": "The chamber introduces this shop’s meat-broth udon and kate vegetables.",
            "zh-TW": "商工會介紹此店的肉汁烏龍麵與時令配菜「糧」。"
          }
        },
        {
          "referenceId": "b05-higashimurayama-wheat-udon-noguchi",
          "spotId": "b05-higashimurayama-wheat-udon-noguchi",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "野口製麺所",
            "en": "Noguchi Seimenjo",
            "zh-TW": "野口製麵所"
          },
          "description": {
            "ja": "東村山産小麦のうどんとサーターアンダギーの作り手です。",
            "en": "A maker of udon and sata andagi using Higashimurayama wheat.",
            "zh-TW": "以東村山小麥製作烏龍麵與沙翁的店家。"
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
    "admission-access": {"name": "Higashimurayama Chamber of Commerce Noguchi Seimen listing", "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_05/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-1": {
      "name": "東村山ブランド里に八国 | 認定商品取扱い店一覧",
      "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_01/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-2": {
      "name": "東村山市の特産品 – 東村山市商工会",
      "url": "https://shoukoukai.or.jp/city_info/specialty_goods/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-3": {
      "name": "東村山ブランド里に八国 | 認定商品取扱い店一覧",
      "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_05/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b05 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://www.shoukoukai.or.jp/satohachi/shops/shop_01/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-1",
        "source-2",
        "source-3"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-1",
        "source-2",
        "source-3"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-1",
        "source-2",
        "source-3"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-1",
        "source-2",
        "source-3"
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
        "source-1",
        "source-2",
        "source-3"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-1",
        "source-2"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-1",
        "source-2"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-1",
        "source-2"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-3"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-3"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-3"
      ],
      "origin": "editorial"
    },
    "spots.b05-higashimurayama-wheat-udon-kojimaya": {
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
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-1"
      ],
      "origin": "editorial"
    },
    "spots.b05-higashimurayama-wheat-udon-noguchi": {
      "sourceIds": [
        "source-3"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-3"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-3"
      ],
      "origin": "editorial"
    }
  }
};
