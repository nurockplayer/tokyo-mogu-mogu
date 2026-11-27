import type { JourneyRecord } from '../journey-record';

export const b08HamuraRiceSakeRecord: JourneyRecord = {
  "municipalityId": "hamura",
  "alcoholThemed": true,
  "journey": {
    "id": "b08-hamura-rice-sake",
    "regionId": "hamura",
    "foodCultureId": "hamura-rice-sake",
    "storyId": "b08-hamura-rice-sake",
    "routeId": "b08-hamura-rice-sake-route",
    "copy": {
      "ja": {"title":"羽村の水田と酒","subtitle":"羽村の水田と酒","description":"根がらみ前の米と、羽村の水がつなぐ酒造り。","tags":["羽村市"],"storyTitle":"羽村の水田と酒","intro":["根がらみ前の米と、羽村の水がつなぐ酒造り。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Hamura’s rice fields and sake","subtitle":"Hamura’s rice fields and sake","description":"Rice from Negaramimae and sake connected by Hamura water.","tags":["Hamura City"],"storyTitle":"Hamura’s rice fields and sake","intro":["Rice from Negaramimae and sake connected by Hamura water.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"羽村稻田與清酒","subtitle":"羽村稻田與清酒","description":"由根搦前稻米與羽村水串起的釀酒故事。","tags":["羽村市"],"storyTitle":"羽村稻田與清酒","intro":["由根搦前稻米與羽村水串起的釀酒故事。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"羽村米","body":"市内唯一の水田である根がらみ前水田が羽村米の産地。市は多摩川の用水で育つ米と説明し、この水田の米を使う「はむりん羽村米」も紹介しています。"},
        {"number":"02.","title":"日本酒「はむら」","body":"石川酒造は2025年の「はむら」に羽村産コシヒカリと羽村の水を使い、都立産業技術研究センターの酵母を採用したと説明。市の資料には観光協会と市内酒店とのつながりが記されています。"},
        {"number":"03.","title":"羽衣の堰","body":"東京都の羽村紹介には、生貯蔵酒「羽衣の堰」も地域の特産品として挙げられています。"}
      ],
      "en": [
        {"number":"01.","title":"Hamura Rice","body":"The city identifies Negaramimae as its only paddy-field area and the origin of Hamura Rice, grown with Tama River irrigation. Its mascot-labelled Hamurin rice also comes from these fields."},
        {"number":"02.","title":"Hamura Local Sake","body":"Ishikawa Brewery describes its 2025 Hamura sake as using Hamura Koshihikari rice, Hamura water and yeast from the Tokyo Metropolitan Industrial Technology Research Institute. City material links the sake with the tourism association and local liquor shops."},
        {"number":"03.","title":"Hagoromo no Seki Sake","body":"Tokyo’s Hamura profile also lists Hagoromo no Seki, a nama-chozo sake, as a local specialty."}
      ],
      "zh-TW": [
        {"number":"01.","title":"羽村米","body":"市府介紹根搦前水田為市內唯一稻田區，也是羽村米產地，利用多摩川灌溉水種植；吉祥物包裝的Hamurin羽村米也來自此處。"},
        {"number":"02.","title":"Hamura清酒","body":"石川酒造介紹2025年的「Hamura」使用羽村越光米、羽村水與東京都立產業技術研究中心的酵母。市府資料記載與觀光協會及市內酒舖的連結。"},
        {"number":"03.","title":"羽衣之堰","body":"東京都的羽村介紹也將生貯藏酒「羽衣之堰」列為當地特產。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 150,
        "steps": [
          {"spotId":"b08-hamura-rice-sake-negaramimae"},
          {"spotId":"b08-hamura-rice-sake-nakamura"},
          {"spotId":"b08-hamura-rice-sake-tourism"}
        ]
      }
    ]
  },
  "routeName": {"ja":"羽村の水田と酒","en":"Hamura’s rice fields and sake","zh-TW":"羽村稻田與清酒"},
  "location": {
    "ja": {"area":"羽村市","station":"","access":""},
    "en": {"area":"Hamura City","station":"","access":""},
    "zh-TW": {"area":"羽村市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "羽村駅", "en": "Hamura Station", "zh-TW": "羽村站"}, "spotId": "b08-hamura-rice-sake-negaramimae", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b08-hamura-rice-sake-negaramimae",
          "description": {"ja":"市が羽村米の産地として紹介する水田です。","en":"The city identifies these fields as the origin of Hamura Rice.","zh-TW":"市府介紹此稻田為羽村米產地。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        },
        {
          "spotId": "b08-hamura-rice-sake-nakamura",
          "description": {"ja":"市が羽村米の販売先として紹介しています。","en":"The city names this outlet in its Hamura Rice guide.","zh-TW":"市府在羽村米指南中列有此販賣所。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        },
        {
          "spotId": "b08-hamura-rice-sake-tourism",
          "description": {"ja":"市の記念商品資料は日本酒はむらの取扱先として紹介しています。","en":"The city’s commemorative-product guide lists this association as an outlet for Hamura sake.","zh-TW":"市府紀念商品資料列出此協會為Hamura清酒的相關場所。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        }
      ],
      "stats": {
        "ja": {"time":"約150分（編集目安）","distance":"","spots":"3 か所","station":"","minutes":"150","access":"","caution":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。"},
        "en": {"time":"About 150 min (editorial estimate)","distance":"","spots":"3 stops","station":"","minutes":"150","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops."},
        "zh-TW": {"time":"約 150 分鐘（編輯估計）","distance":"","spots":"3 處","station":"","minutes":"150","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b08-hamura-rice-sake-negaramimae": {
      "presentation": {
        "id": "b08-hamura-rice-sake-negaramimae",
        "regionId": "hamura",
        "foodCultureId": "hamura-rice-sake",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "根がらみ前水田",
            "lead": "市が羽村米の産地として紹介する水田です。",
            "description": "市が羽村米の産地として紹介する水田です。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Negaramimae Rice Fields",
            "lead": "The city identifies these fields as the origin of Hamura Rice.",
            "description": "The city identifies these fields as the origin of Hamura Rice.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "根搦前水田",
            "lead": "市府介紹此稻田為羽村米產地。",
            "description": "市府介紹此稻田為羽村米產地。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認狀態","value":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
            ],
            "caution": [
              "刊載內容尚未確認。造訪前請查看出處資訊。"
            ]
          }
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市が羽村米の産地として紹介する水田です。","en":"The city identifies these fields as the origin of Hamura Rice.","zh-TW":"市府介紹此稻田為羽村米產地。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.hamura.tokyo.jp/0000005260.html","en":"https://www.city.hamura.tokyo.jp/0000005260.html","zh-TW":"https://www.city.hamura.tokyo.jp/0000005260.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"羽村市内唯一の水田で収穫した「羽村米」","url":"https://www.city.hamura.tokyo.jp/0000005260.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b08-hamura-rice-sake-nakamura": {
      "presentation": {
        "id": "b08-hamura-rice-sake-nakamura",
        "regionId": "hamura",
        "foodCultureId": "hamura-rice-sake",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "中村販売所",
            "lead": "市が羽村米の販売先として紹介しています。",
            "description": "市が羽村米の販売先として紹介しています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Nakamura Rice Outlet",
            "lead": "The city names this outlet in its Hamura Rice guide.",
            "description": "The city names this outlet in its Hamura Rice guide.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "中村販賣所",
            "lead": "市府在羽村米指南中列有此販賣所。",
            "description": "市府在羽村米指南中列有此販賣所。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認狀態","value":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
            ],
            "caution": [
              "刊載內容尚未確認。造訪前請查看出處資訊。"
            ]
          }
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市が羽村米の販売先として紹介しています。","en":"The city names this outlet in its Hamura Rice guide.","zh-TW":"市府在羽村米指南中列有此販賣所。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.hamura.tokyo.jp/0000005260.html","en":"https://www.city.hamura.tokyo.jp/0000005260.html","zh-TW":"https://www.city.hamura.tokyo.jp/0000005260.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"羽村市内唯一の水田で収穫した「羽村米」","url":"https://www.city.hamura.tokyo.jp/0000005260.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b08-hamura-rice-sake-tourism": {
      "presentation": {
        "id": "b08-hamura-rice-sake-tourism",
        "regionId": "hamura",
        "foodCultureId": "hamura-rice-sake",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "羽村市観光協会",
            "lead": "市の記念商品資料は日本酒はむらの取扱先として紹介しています。",
            "description": "市の記念商品資料は日本酒はむらの取扱先として紹介しています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Hamura Tourism Association",
            "lead": "The city’s commemorative-product guide lists this association as an outlet for Hamura sake.",
            "description": "The city’s commemorative-product guide lists this association as an outlet for Hamura sake.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "羽村市觀光協會",
            "lead": "市府紀念商品資料列出此協會為Hamura清酒的相關場所。",
            "description": "市府紀念商品資料列出此協會為Hamura清酒的相關場所。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認狀態","value":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
            ],
            "caution": [
              "刊載內容尚未確認。造訪前請查看出處資訊。"
            ]
          }
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市の記念商品資料は日本酒はむらの取扱先として紹介しています。","en":"The city’s commemorative-product guide lists this association as an outlet for Hamura sake.","zh-TW":"市府紀念商品資料列出此協會為Hamura清酒的相關場所。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.hamura.tokyo.jp/0000015311.html","en":"https://www.city.hamura.tokyo.jp/0000015311.html","zh-TW":"https://www.city.hamura.tokyo.jp/0000015311.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"市民・市内事業者が行う市制施行30周年記念事業・商品","url":"https://www.city.hamura.tokyo.jp/0000015311.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-hamura-rice-sake-negaramimae",
          "spotId": "b08-hamura-rice-sake-negaramimae",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"根がらみ前水田","en":"Negaramimae Rice Fields","zh-TW":"根搦前水田"},
          "description": {"ja":"市が羽村米の産地として紹介する水田です。","en":"The city identifies these fields as the origin of Hamura Rice.","zh-TW":"市府介紹此稻田為羽村米產地。"}
        },
        {
          "referenceId": "b08-hamura-rice-sake-nakamura",
          "spotId": "b08-hamura-rice-sake-nakamura",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"中村販売所","en":"Nakamura Rice Outlet","zh-TW":"中村販賣所"},
          "description": {"ja":"市が羽村米の販売先として紹介しています。","en":"The city names this outlet in its Hamura Rice guide.","zh-TW":"市府在羽村米指南中列有此販賣所。"}
        },
        {
          "referenceId": "b08-hamura-rice-sake-tourism",
          "spotId": "b08-hamura-rice-sake-tourism",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"羽村市観光協会","en":"Hamura Tourism Association","zh-TW":"羽村市觀光協會"},
          "description": {"ja":"市の記念商品資料は日本酒はむらの取扱先として紹介しています。","en":"The city’s commemorative-product guide lists this association as an outlet for Hamura sake.","zh-TW":"市府紀念商品資料列出此協會為Hamura清酒的相關場所。"}
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {"region":"羽村市","station":""},
      "en": {"region":"Hamura City","station":""},
      "zh-TW": {"region":"羽村市","station":""}
    }
  },
  "sources": {
    "admission-access": {"name": "Hamura City – Negaramimae paddies", "url": "https://www.city.hamura.tokyo.jp/0000015860.html", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-23": {"name":"羽村市内唯一の水田で収穫した「羽村米」","url":"https://www.city.hamura.tokyo.jp/0000005260.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-24": {"name":"はむりん羽村米","url":"https://www.city.hamura.tokyo.jp/0000006547.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-25": {"name":"東京都立産業技術研究センターと共同開発した「はむら」発売","url":"https://www.tamajiman.co.jp/info/451","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-26": {"name":"市民・市内事業者が行う市制施行30周年記念事業・商品","url":"https://www.city.hamura.tokyo.jp/0000015311.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-27": {"name":"羽村市｜多摩島しょ地域とは","url":"https://tokyo-tamashima-iju.metro.tokyo.lg.jp/introduction/hamura/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://www.city.hamura.tokyo.jp/0000005260.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-23","source-24","source-25","source-26","source-27"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-23","source-24","source-25","source-26","source-27"],"origin":"editorial"},
    "location": {"sourceIds":["source-23","source-24","source-25","source-26","source-27"],"origin":"editorial"},
    "story": {"sourceIds":["source-23","source-24","source-25","source-26","source-27"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-23","source-24","source-25","source-26","source-27"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-23","source-24","source-25","source-26","source-27"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-23","source-24"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-23","source-24"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-23","source-24"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-25","source-26"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-25","source-26"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-25","source-26"],"origin":"editorial"},
    "journey.chapters.ja.2": {"sourceIds":["source-27"],"origin":"editorial"},
    "journey.chapters.en.2": {"sourceIds":["source-27"],"origin":"editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds":["source-27"],"origin":"editorial"},
    "spots.b08-hamura-rice-sake-negaramimae": {"sourceIds":["source-23"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-23"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-23"],"origin":"editorial"},
    "spots.b08-hamura-rice-sake-nakamura": {"sourceIds":["source-23"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-23"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-23"],"origin":"editorial"},
    "spots.b08-hamura-rice-sake-tourism": {"sourceIds":["source-26"],"origin":"editorial"},
    "variants.half-day.steps.2.description": {"sourceIds":["source-26"],"origin":"editorial"},
    "story.groups.nearby.2": {"sourceIds":["source-26"],"origin":"editorial"}
  }
};
