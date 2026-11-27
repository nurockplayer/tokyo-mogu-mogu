import type { JourneyRecord } from '../journey-record';

export const b05KunitachiFarmTableRecord: JourneyRecord = {
  "municipalityId": "kunitachi",
  "alcoholThemed": false,
  "journey": {
    "id": "b05-kunitachi-farm-table",
    "regionId": "kunitachi",
    "foodCultureId": "kunitachi-farm-table",
    "storyId": "b05-kunitachi-farm-table",
    "routeId": "b05-kunitachi-farm-table-route",
    "copy": {
      "ja": {
        "title": "くにたち、南の畑と野菜料理",
        "subtitle": "くにたち、南の畑と野菜料理",
        "description": "野菜が麺やお菓子、料理になる道を知る。",
        "tags": [
          "国立市"
        ],
        "storyTitle": "くにたち、南の畑と野菜料理",
        "intro": [
          "野菜が麺やお菓子、料理になる道を知る。",
          "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
        ]
      },
      "en": {
        "title": "Kunitachi’s southern fields and vegetable dishes",
        "subtitle": "Kunitachi’s southern fields and vegetable dishes",
        "description": "Explore vegetables in noodles, cakes and local cooking.",
        "tags": [
          "Kunitachi"
        ],
        "storyTitle": "Kunitachi’s southern fields and vegetable dishes",
        "intro": [
          "Explore vegetables in noodles, cakes and local cooking.",
          "This information is unconfirmed. Check the source information before visiting."
        ]
      },
      "zh-TW": {
        "title": "國立南部田地與蔬菜料理",
        "subtitle": "國立南部田地與蔬菜料理",
        "description": "認識蔬菜化為麵食、糕點與料理的方式。",
        "tags": [
          "國立市"
        ],
        "storyTitle": "國立南部田地與蔬菜料理",
        "intro": [
          "認識蔬菜化為麵食、糕點與料理的方式。",
          "刊載內容尚未確認。造訪前請查看出處資訊。"
        ]
      }
    },
    "chapters": {
      "ja": [
        {
          "number": "01.",
          "title": "水に支えられる農地",
          "body": "観光協会は、府中用水や湧水に恵まれた南部に農地が集まると紹介しています。ほうれん草、小松菜、なすのほか、梨、ぶどう、桃なども育てられています。"
        },
        {
          "number": "02.",
          "title": "葉物を麺と菓子に",
          "body": "市の2017年農業計画は、ほうれん草を使う「谷保村のほうれん草うどん」を東京都認証の特産品として記録しています。1955年創業の白十字は、国産ほうれん草の粉末入りカステラと、小松菜の粉末入りマドレーヌを作ると紹介されています。"
        },
        {
          "number": "03.",
          "title": "旬野菜を料理に",
          "body": "くにたち村酒場のバーニャカウダは、地元農家から届く旬の野菜を使う料理として紹介されています。"
        }
      ],
      "en": [
        {
          "number": "01.",
          "title": "Fields supported by water",
          "body": "The tourism association describes farmland concentrated in the south, supported by the Fuchu irrigation canal and springs. It names spinach, komatsuna and eggplants, as well as pears, grapes and peaches."
        },
        {
          "number": "02.",
          "title": "Leafy greens in noodles and cakes",
          "body": "The city’s 2017 farming plan records Yaho Village Spinach Udon as a Tokyo-recognized regional specialty. Hakujuji, founded in 1955, is described as making castella with Japanese spinach powder and madeleines with komatsuna powder."
        },
        {
          "number": "03.",
          "title": "Seasonal vegetables at the table",
          "body": "Kunitachi Mura Sakaba’s bagna cauda is described as using seasonal vegetables from local farmers."
        }
      ],
      "zh-TW": [
        {
          "number": "01.",
          "title": "水源滋養的農地",
          "body": "觀光協會介紹農田多集中在南部，受府中用水與湧泉滋養；作物包括菠菜、小松菜、茄子，以及梨、葡萄與桃。"
        },
        {
          "number": "02.",
          "title": "葉菜入麵與糕點",
          "body": "市府 2017 年農業計畫記載「谷保村菠菜烏龍麵」為東京都認證特產。創立於 1955 年的白十字，介紹有加入日本菠菜粉的長崎蛋糕與小松菜粉瑪德蓮。"
        },
        {
          "number": "03.",
          "title": "時令蔬菜上餐桌",
          "body": "國立村酒場的義式熱沾醬蔬菜，介紹為使用當地農家的時令蔬菜。"
        }
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 150,
        "steps": [
          {
            "spotId": "b05-kunitachi-farm-table-satonoie"
          },
          {
            "spotId": "b05-kunitachi-farm-table-hakujuji"
          },
          {
            "spotId": "b05-kunitachi-farm-table-mura-sakaba"
          }
        ]
      }
    ]
  },
  "routeName": {
    "ja": "くにたち、南の畑と野菜料理",
    "en": "Kunitachi’s southern fields and vegetable dishes",
    "zh-TW": "國立南部田地與蔬菜料理"
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
      "arrival": {"kind": "station", "name": {"ja": "谷保駅", "en": "Yaho Station", "zh-TW": "谷保站"}, "spotId": "b05-kunitachi-farm-table-satonoie", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b05-kunitachi-farm-table-satonoie",
          "description": {
            "ja": "観光協会が農業情報を発信し、地域と農家をつなぐ拠点として紹介しています。",
            "en": "The tourism association describes this center as sharing farming information and connecting residents with growers.",
            "zh-TW": "觀光協會介紹為傳遞農業資訊、連結居民與農家的據點。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        },
        {
          "spotId": "b05-kunitachi-farm-table-hakujuji",
          "description": {
            "ja": "ほうれんそうカステラと小松菜マドレーヌの作り手です。",
            "en": "The maker listed for spinach castella and komatsuna madeleines.",
            "zh-TW": "菠菜長崎蛋糕與小松菜瑪德蓮的製作者。"
          },
          "note": {
            "ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。",
            "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.",
            "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"
          }
        },
        {
          "spotId": "b05-kunitachi-farm-table-mura-sakaba",
          "description": {
            "ja": "地元の旬野菜のバーニャカウダが紹介されています。",
            "en": "Listed for bagna cauda using local seasonal vegetables.",
            "zh-TW": "介紹有使用當地時令蔬菜的義式熱沾醬料理。"
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
    "b05-kunitachi-farm-table-satonoie": {
      "presentation": {
        "id": "b05-kunitachi-farm-table-satonoie",
        "regionId": "kunitachi",
        "foodCultureId": "kunitachi-farm-table",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "国立市城山さとのいえ",
            "lead": "観光協会が農業情報を発信し、地域と農家をつなぐ拠点として紹介しています。",
            "description": "観光協会が農業情報を発信し、地域と農家をつなぐ拠点として紹介しています。",
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
            "name": "Kunitachi Shiroyama Sato no Ie",
            "lead": "The tourism association describes this center as sharing farming information and connecting residents with growers.",
            "description": "The tourism association describes this center as sharing farming information and connecting residents with growers.",
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
            "name": "國立市城山里之家",
            "lead": "觀光協會介紹為傳遞農業資訊、連結居民與農家的據點。",
            "description": "觀光協會介紹為傳遞農業資訊、連結居民與農家的據點。",
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
          "ja": "観光協会が農業情報を発信し、地域と農家をつなぐ拠点として紹介しています。",
          "en": "The tourism association describes this center as sharing farming information and connecting residents with growers.",
          "zh-TW": "觀光協會介紹為傳遞農業資訊、連結居民與農家的據點。"
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
              "ja": "https://kunimachi.jp/spot/chokubaijo/",
              "en": "https://kunimachi.jp/spot/chokubaijo/",
              "zh-TW": "https://kunimachi.jp/spot/chokubaijo/"
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
        "name": "行ってみよう！直売所案内マップ | くにたちNAVI",
        "url": "https://kunimachi.jp/spot/chokubaijo/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b05-kunitachi-farm-table-hakujuji": {
      "presentation": {
        "id": "b05-kunitachi-farm-table-hakujuji",
        "regionId": "kunitachi",
        "foodCultureId": "kunitachi-farm-table",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "白十字",
            "lead": "ほうれんそうカステラと小松菜マドレーヌの作り手です。",
            "description": "ほうれんそうカステラと小松菜マドレーヌの作り手です。",
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
            "name": "Hakujuji",
            "lead": "The maker listed for spinach castella and komatsuna madeleines.",
            "description": "The maker listed for spinach castella and komatsuna madeleines.",
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
            "name": "白十字",
            "lead": "菠菜長崎蛋糕與小松菜瑪德蓮的製作者。",
            "description": "菠菜長崎蛋糕與小松菜瑪德蓮的製作者。",
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
          "ja": "ほうれんそうカステラと小松菜マドレーヌの作り手です。",
          "en": "The maker listed for spinach castella and komatsuna madeleines.",
          "zh-TW": "菠菜長崎蛋糕與小松菜瑪德蓮的製作者。"
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
              "ja": "https://kunitachi-shokokai.jp/item/sponge-cake-and-madeleine/",
              "en": "https://kunitachi-shokokai.jp/item/sponge-cake-and-madeleine/",
              "zh-TW": "https://kunitachi-shokokai.jp/item/sponge-cake-and-madeleine/"
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
        "name": "くにたちほうれんそうカステラ・小松菜マドレーヌ | 国立市商工会",
        "url": "https://kunitachi-shokokai.jp/item/sponge-cake-and-madeleine/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b05-kunitachi-farm-table-mura-sakaba": {
      "presentation": {
        "id": "b05-kunitachi-farm-table-mura-sakaba",
        "regionId": "kunitachi",
        "foodCultureId": "kunitachi-farm-table",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "くにたち村酒場",
            "lead": "地元の旬野菜のバーニャカウダが紹介されています。",
            "description": "地元の旬野菜のバーニャカウダが紹介されています。",
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
            "name": "Kunitachi Mura Sakaba",
            "lead": "Listed for bagna cauda using local seasonal vegetables.",
            "description": "Listed for bagna cauda using local seasonal vegetables.",
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
            "name": "國立村酒場",
            "lead": "介紹有使用當地時令蔬菜的義式熱沾醬料理。",
            "description": "介紹有使用當地時令蔬菜的義式熱沾醬料理。",
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
          "ja": "地元の旬野菜のバーニャカウダが紹介されています。",
          "en": "Listed for bagna cauda using local seasonal vegetables.",
          "zh-TW": "介紹有使用當地時令蔬菜的義式熱沾醬料理。"
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
              "ja": "https://kunitachi-shokokai.jp/item/murasakababagnacauda/",
              "en": "https://kunitachi-shokokai.jp/item/murasakababagnacauda/",
              "zh-TW": "https://kunitachi-shokokai.jp/item/murasakababagnacauda/"
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
        "name": "地元野菜のどか盛りバーニャカウダ | 国立市商工会",
        "url": "https://kunitachi-shokokai.jp/item/murasakababagnacauda/",
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
          "referenceId": "b05-kunitachi-farm-table-satonoie",
          "spotId": "b05-kunitachi-farm-table-satonoie",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "国立市城山さとのいえ",
            "en": "Kunitachi Shiroyama Sato no Ie",
            "zh-TW": "國立市城山里之家"
          },
          "description": {
            "ja": "観光協会が農業情報を発信し、地域と農家をつなぐ拠点として紹介しています。",
            "en": "The tourism association describes this center as sharing farming information and connecting residents with growers.",
            "zh-TW": "觀光協會介紹為傳遞農業資訊、連結居民與農家的據點。"
          }
        },
        {
          "referenceId": "b05-kunitachi-farm-table-hakujuji",
          "spotId": "b05-kunitachi-farm-table-hakujuji",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "白十字",
            "en": "Hakujuji",
            "zh-TW": "白十字"
          },
          "description": {
            "ja": "ほうれんそうカステラと小松菜マドレーヌの作り手です。",
            "en": "The maker listed for spinach castella and komatsuna madeleines.",
            "zh-TW": "菠菜長崎蛋糕與小松菜瑪德蓮的製作者。"
          }
        },
        {
          "referenceId": "b05-kunitachi-farm-table-mura-sakaba",
          "spotId": "b05-kunitachi-farm-table-mura-sakaba",
          "badgeColor": "#E98A1C",
          "badge": {
            "ja": "くにたち村酒場",
            "en": "Kunitachi Mura Sakaba",
            "zh-TW": "國立村酒場"
          },
          "description": {
            "ja": "地元の旬野菜のバーニャカウダが紹介されています。",
            "en": "Listed for bagna cauda using local seasonal vegetables.",
            "zh-TW": "介紹有使用當地時令蔬菜的義式熱沾醬料理。"
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
    "admission-access": {"name": "Kunitachi City Shiroyama Satonoie access", "url": "https://www.city.kunitachi.tokyo.jp/soshiki/Dept06/Div06/Sec03/gyomu/0486/ie/1464591730071.html", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-36": {
      "name": "行ってみよう！直売所案内マップ | くにたちNAVI",
      "url": "https://kunimachi.jp/spot/chokubaijo/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-38": {
      "name": "国立市第 3 次農業振興計画",
      "url": "https://www.city.kunitachi.tokyo.jp/material/files/group/50/46519045.pdf",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-40": {
      "name": "くにたちほうれんそうカステラ・小松菜マドレーヌ | 国立市商工会",
      "url": "https://kunitachi-shokokai.jp/item/sponge-cake-and-madeleine/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-52": {
      "name": "地元野菜のどか盛りバーニャカウダ | 国立市商工会",
      "url": "https://kunitachi-shokokai.jp/item/murasakababagnacauda/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b05 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://kunimachi.jp/spot/chokubaijo/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-36",
        "source-38",
        "source-40",
        "source-52"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-36",
        "source-38",
        "source-40",
        "source-52"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-36",
        "source-38",
        "source-40",
        "source-52"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-36",
        "source-38",
        "source-40",
        "source-52"
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
        "source-36",
        "source-38",
        "source-40",
        "source-52"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-38",
        "source-40"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-38",
        "source-40"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-38",
        "source-40"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-52"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-52"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-52"
      ],
      "origin": "editorial"
    },
    "spots.b05-kunitachi-farm-table-satonoie": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "spots.b05-kunitachi-farm-table-hakujuji": {
      "sourceIds": [
        "source-40"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-40"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-40"
      ],
      "origin": "editorial"
    },
    "spots.b05-kunitachi-farm-table-mura-sakaba": {
      "sourceIds": [
        "source-52"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.2": {
      "sourceIds": [
        "source-52"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.2.description": {
      "sourceIds": [
        "source-52"
      ],
      "origin": "editorial"
    }
  }
};
