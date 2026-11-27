import type { JourneyRecord } from '../journey-record';

export const b05KunitachiBeerRecord: JourneyRecord = {
  "municipalityId": "kunitachi",
  "journey": {
    "id": "b05-kunitachi-beer",
    "regionId": "kunitachi",
    "foodCultureId": "kunitachi-beer",
    "storyId": "b05-kunitachi-beer",
    "routeId": "b05-kunitachi-beer-route",
    "copy": {
      "ja": {
        "title": "くにたちのビールと米のつながり",
        "subtitle": "くにたちのビールと米のつながり",
        "description": "醸造所と街のビールを知る。",
        "tags": [
          "国立市"
        ],
        "storyTitle": "くにたちのビールと米のつながり",
        "intro": [
          "醸造所と街のビールを知る。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
        ]
      },
      "en": {
        "title": "Kunitachi beer and its rice connection",
        "subtitle": "Kunitachi beer and its rice connection",
        "description": "Discover a brewery and beers associated with the city.",
        "tags": [
          "Kunitachi"
        ],
        "storyTitle": "Kunitachi beer and its rice connection",
        "intro": [
          "Discover a brewery and beers associated with the city.",
          "This information is unconfirmed. Check the source information before visiting."
        ]
      },
      "zh-TW": {
        "title": "國立啤酒與在地米的連結",
        "subtitle": "國立啤酒與在地米的連結",
        "description": "認識釀造所與地方啤酒。",
        "tags": [
          "國立市"
        ],
        "storyTitle": "國立啤酒與在地米的連結",
        "intro": [
          "認識釀造所與地方啤酒。",
          "刊載內容尚未確認。造訪前請查看出處資訊。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "せきやから醸造所へ",
          "body": "商工会はKUNITACHI BREWERYを、せきやが2020年に設立した国立初のクラフトビール醸造所として紹介しています。"
        },
        {
          "number": "02.",
          "title": "国立産の米を使う一杯",
          "body": "醸造所は2026 take.2を、国立駅開業100周年を記念し、国立産米、栃木県産麦芽、国産ホップを使うビールとして説明しています。"
        },
        {
          "number": "03.",
          "title": "鳥と木をラベルに",
          "body": "広島屋のくにたちビールにはオリジナルとプレミアムがあり、ラベルは市の鳥シジュウカラと市の木イチョウを描くと紹介されています。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "From Sekiya to a brewery",
          "body": "The chamber describes KUNITACHI BREWERY as the city’s first craft brewery, established by Sekiya in 2020."
        },
        {
          "number": "02.",
          "title": "A beer with Kunitachi rice",
          "body": "The brewery describes 2026 take.2 as marking the station’s centenary with Kunitachi-grown rice, Tochigi malt and Japanese hops."
        },
        {
          "number": "03.",
          "title": "A bird and a tree on the label",
          "body": "Hiroshima-ya’s Kunitachi Beer is listed in original and premium versions, with labels depicting the city’s great tit and ginkgo tree."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "從 Sekiya 到釀造所",
          "body": "商工會將 KUNITACHI BREWERY 介紹為 Sekiya 於 2020 年設立的市內首家精釀啤酒釀造所。"
        },
        {
          "number": "02.",
          "title": "使用國立米的啤酒",
          "body": "釀造所說明 2026 take.2 為國立站開業百年紀念酒，使用國立產米、栃木麥芽及日本啤酒花。"
        },
        {
          "number": "03.",
          "title": "酒標上的鳥與樹",
          "body": "廣島屋的國立啤酒介紹有原味與頂級款，酒標描繪市鳥大山雀與市樹銀杏。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 150,
        "steps": [
          {
            "spotId": "b05-kunitachi-beer-tap-stand"
          },
          {
            "spotId": "b05-kunitachi-beer-kasugai"
          },
          {
            "spotId": "b05-kunitachi-beer-hiroshimaya"
          }
        ]
      }
    ]
  },
  "routeName": {
    "ja": "くにたちのビールと米のつながり",
    "en": "Kunitachi beer and its rice connection",
    "zh-TW": "國立啤酒與在地米的連結"
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
      "arrival": {"kind": "station", "name": {"ja": "国立駅南口", "en": "Kunitachi Station South Exit", "zh-TW": "國立站南口"}, "spotId": "b05-kunitachi-beer-tap-stand", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b05-kunitachi-beer-tap-stand",
          "description": {
            "ja": "商工会がKUNITACHI BREWERYの量り売り先として紹介しています。",
            "en": "Listed by the chamber as a tap outlet for KUNITACHI BREWERY.",
            "zh-TW": "商工會列為 KUNITACHI BREWERY 的量售啤酒據點。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        },
        {
          "spotId": "b05-kunitachi-beer-kasugai",
          "description": {
            "ja": "商工会が醸造所に隣接する食事の店として紹介しています。",
            "en": "The chamber describes this restaurant as adjoining the brewery.",
            "zh-TW": "商工會介紹為鄰接釀造所的餐廳。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        },
        {
          "spotId": "b05-kunitachi-beer-hiroshimaya",
          "description": {
            "ja": "くにたちビールの企画と販売の店として紹介されています。",
            "en": "Profiled as the shop behind Kunitachi Beer.",
            "zh-TW": "介紹為企劃與販售國立啤酒的店家。"
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
    "b05-kunitachi-beer-tap-stand": {
      "presentation": {
        "id": "b05-kunitachi-beer-tap-stand",
        "regionId": "kunitachi",
        "foodCultureId": "kunitachi-beer",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "SEKIYA TAP STAND",
            "lead": "商工会がKUNITACHI BREWERYの量り売り先として紹介しています。",
            "description": "商工会がKUNITACHI BREWERYの量り売り先として紹介しています。",
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
            "name": "SEKIYA TAP STAND",
            "lead": "Listed by the chamber as a tap outlet for KUNITACHI BREWERY.",
            "description": "Listed by the chamber as a tap outlet for KUNITACHI BREWERY.",
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
            "name": "SEKIYA TAP STAND",
            "lead": "商工會列為 KUNITACHI BREWERY 的量售啤酒據點。",
            "description": "商工會列為 KUNITACHI BREWERY 的量售啤酒據點。",
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
          "ja": "商工会がKUNITACHI BREWERYの量り売り先として紹介しています。",
          "en": "Listed by the chamber as a tap outlet for KUNITACHI BREWERY.",
          "zh-TW": "商工會列為 KUNITACHI BREWERY 的量售啤酒據點。"
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
              "ja": "https://kunitachi-shokokai.jp/item/kunitachi-brewery-beer/",
              "en": "https://kunitachi-shokokai.jp/item/kunitachi-brewery-beer/",
              "zh-TW": "https://kunitachi-shokokai.jp/item/kunitachi-brewery-beer/"
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
        "name": "醸造所KUNITACHI BREWERY BEER | 国立市商工会",
        "url": "https://kunitachi-shokokai.jp/item/kunitachi-brewery-beer/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b05-kunitachi-beer-kasugai": {
      "presentation": {
        "id": "b05-kunitachi-beer-kasugai",
        "regionId": "kunitachi",
        "foodCultureId": "kunitachi-beer",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "麦酒堂かすがい",
            "lead": "商工会が醸造所に隣接する食事の店として紹介しています。",
            "description": "商工会が醸造所に隣接する食事の店として紹介しています。",
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
            "name": "Bakushudo Kasugai",
            "lead": "The chamber describes this restaurant as adjoining the brewery.",
            "description": "The chamber describes this restaurant as adjoining the brewery.",
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
            "name": "麥酒堂 Kasugai",
            "lead": "商工會介紹為鄰接釀造所的餐廳。",
            "description": "商工會介紹為鄰接釀造所的餐廳。",
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
          "ja": "商工会が醸造所に隣接する食事の店として紹介しています。",
          "en": "The chamber describes this restaurant as adjoining the brewery.",
          "zh-TW": "商工會介紹為鄰接釀造所的餐廳。"
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
              "ja": "https://kunitachi-shokokai.jp/item/kunitachi-brewery-beer/",
              "en": "https://kunitachi-shokokai.jp/item/kunitachi-brewery-beer/",
              "zh-TW": "https://kunitachi-shokokai.jp/item/kunitachi-brewery-beer/"
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
        "name": "醸造所KUNITACHI BREWERY BEER | 国立市商工会",
        "url": "https://kunitachi-shokokai.jp/item/kunitachi-brewery-beer/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b05-kunitachi-beer-hiroshimaya": {
      "presentation": {
        "id": "b05-kunitachi-beer-hiroshimaya",
        "regionId": "kunitachi",
        "foodCultureId": "kunitachi-beer",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "広島屋",
            "lead": "くにたちビールの企画と販売の店として紹介されています。",
            "description": "くにたちビールの企画と販売の店として紹介されています。",
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
            "name": "Hiroshima-ya",
            "lead": "Profiled as the shop behind Kunitachi Beer.",
            "description": "Profiled as the shop behind Kunitachi Beer.",
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
            "name": "廣島屋",
            "lead": "介紹為企劃與販售國立啤酒的店家。",
            "description": "介紹為企劃與販售國立啤酒的店家。",
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
          "ja": "くにたちビールの企画と販売の店として紹介されています。",
          "en": "Profiled as the shop behind Kunitachi Beer.",
          "zh-TW": "介紹為企劃與販售國立啤酒的店家。"
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
              "ja": "https://kunitachi-shokokai.jp/item/kunitachi_beer/",
              "en": "https://kunitachi-shokokai.jp/item/kunitachi_beer/",
              "zh-TW": "https://kunitachi-shokokai.jp/item/kunitachi_beer/"
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
        "name": "くにたちビール | 国立市商工会",
        "url": "https://kunitachi-shokokai.jp/item/kunitachi_beer/",
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
          "referenceId": "b05-kunitachi-beer-tap-stand",
          "spotId": "b05-kunitachi-beer-tap-stand",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "SEKIYA TAP STAND",
            "en": "SEKIYA TAP STAND",
            "zh-TW": "SEKIYA TAP STAND"
          },
          "description": {
            "ja": "商工会がKUNITACHI BREWERYの量り売り先として紹介しています。",
            "en": "Listed by the chamber as a tap outlet for KUNITACHI BREWERY.",
            "zh-TW": "商工會列為 KUNITACHI BREWERY 的量售啤酒據點。"
          }
        },
        {
          "referenceId": "b05-kunitachi-beer-kasugai",
          "spotId": "b05-kunitachi-beer-kasugai",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "麦酒堂かすがい",
            "en": "Bakushudo Kasugai",
            "zh-TW": "麥酒堂 Kasugai"
          },
          "description": {
            "ja": "商工会が醸造所に隣接する食事の店として紹介しています。",
            "en": "The chamber describes this restaurant as adjoining the brewery.",
            "zh-TW": "商工會介紹為鄰接釀造所的餐廳。"
          }
        },
        {
          "referenceId": "b05-kunitachi-beer-hiroshimaya",
          "spotId": "b05-kunitachi-beer-hiroshimaya",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "広島屋",
            "en": "Hiroshima-ya",
            "zh-TW": "廣島屋"
          },
          "description": {
            "ja": "くにたちビールの企画と販売の店として紹介されています。",
            "en": "Profiled as the shop behind Kunitachi Beer.",
            "zh-TW": "介紹為企劃與販售國立啤酒的店家。"
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
    "admission-access": {"name": "Kunitachi tourism and community guide – Kunitachi Brewery", "url": "https://kunimachi.jp/spot/kunitachibrewery/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-43": {
      "name": "醸造所KUNITACHI BREWERY BEER | 国立市商工会",
      "url": "https://kunitachi-shokokai.jp/item/kunitachi-brewery-beer/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-44": {
      "name": "2026 take.2 | kunitachibrewery",
      "url": "https://kunitachibrewery.com/kuniburu-beer/2026-take-2/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-45": {
      "name": "くにたちビール | 国立市商工会",
      "url": "https://kunitachi-shokokai.jp/item/kunitachi_beer/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b05 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://kunitachi-shokokai.jp/item/kunitachi-brewery-beer/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-43",
        "source-44",
        "source-45"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-43",
        "source-44",
        "source-45"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-43",
        "source-44",
        "source-45"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-43",
        "source-44",
        "source-45"
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
        "source-43",
        "source-44",
        "source-45"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-43"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-43"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-43"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-44"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-44"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-44"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-45"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-45"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-45"
      ],
      "origin": "editorial"
    },
    "spots.b05-kunitachi-beer-tap-stand": {
      "sourceIds": [
        "source-43"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-43"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-43"
      ],
      "origin": "editorial"
    },
    "spots.b05-kunitachi-beer-kasugai": {
      "sourceIds": [
        "source-43"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-43"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-43"
      ],
      "origin": "editorial"
    },
    "spots.b05-kunitachi-beer-hiroshimaya": {
      "sourceIds": [
        "source-45"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.2": {
      "sourceIds": [
        "source-45"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.2.description": {
      "sourceIds": [
        "source-45"
      ],
      "origin": "editorial"
    }
  }
};
