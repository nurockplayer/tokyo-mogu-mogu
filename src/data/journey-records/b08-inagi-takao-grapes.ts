import type { JourneyRecord } from '../journey-record';

export const b08InagiTakaoGrapesRecord: JourneyRecord = {
  "municipalityId": "inagi",
  "alcoholThemed": false,
  "journey": {
    "id": "b08-inagi-takao-grapes",
    "regionId": "inagi",
    "foodCultureId": "inagi-takao-grapes",
    "storyId": "b08-inagi-takao-grapes",
    "routeId": "b08-inagi-takao-grapes-route",
    "copy": {
      "ja": {"title":"稲城の高尾ぶどう","subtitle":"稲城の高尾ぶどう","description":"栽培の歩みと、シャーベットやどら焼きにつながる果実。","tags":["稲城市"],"storyTitle":"稲城の高尾ぶどう","intro":["栽培の歩みと、シャーベットやどら焼きにつながる果実。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Inagi’s Takao grapes","subtitle":"Inagi’s Takao grapes","description":"Explore the grape’s growing history and links to sorbet and dorayaki.","tags":["Inagi City"],"storyTitle":"Inagi’s Takao grapes","intro":["Explore the grape’s growing history and links to sorbet and dorayaki.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"稻城高尾葡萄","subtitle":"稻城高尾葡萄","description":"認識栽培歷史與延伸至雪酪、銅鑼燒的葡萄。","tags":["稻城市"],"storyTitle":"稻城高尾葡萄","intro":["認識栽培歷史與延伸至雪酪、銅鑼燒的葡萄。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"高尾ぶどう","body":"市は高尾ぶどうを巨峰を親とする大粒・種無しの品種とし、細長い粒が特徴と説明。1973〜1974年ごろに市内で栽培が始まり、1976年に研究会が発足したと記しています。"}
      ],
      "en": [
        {"number":"01.","title":"Takao Grapes","body":"The city describes Takao as a large, elongated, seedless grape descended from Kyoho. It dates local cultivation to around 1973–1974 and the growers’ study group to 1976."}
      ],
      "zh-TW": [
        {"number":"01.","title":"高尾葡萄","body":"市府介紹高尾葡萄以巨峰為親本，果粒碩大、細長且無籽；市內約於1973至1974年開始栽培，1976年成立研究會。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b08-inagi-takao-grapes-el-cielo"},
          {"spotId":"b08-inagi-takao-grapes-miyoshi"}
        ]
      }
    ]
  },
  "routeName": {"ja":"稲城の高尾ぶどう","en":"Inagi’s Takao grapes","zh-TW":"稻城高尾葡萄"},
  "location": {
    "ja": {"area":"稲城市","station":"","access":""},
    "en": {"area":"Inagi City","station":"","access":""},
    "zh-TW": {"area":"稻城市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "新百合ヶ丘駅", "en": "Shin-Yurigaoka Station", "zh-TW": "新百合丘站"}, "spotId": "b08-inagi-takao-grapes-el-cielo", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b08-inagi-takao-grapes-el-cielo",
          "description": {"ja":"市の目録に高尾ぶどうのシャーベットが載っています。","en":"The city catalogue features this maker’s Takao-grape sorbet.","zh-TW":"市府目錄介紹此生產者的高尾葡萄雪酪。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        },
        {
          "spotId": "b08-inagi-takao-grapes-miyoshi",
          "description": {"ja":"市の目録に高尾ぶどう餡のどら焼きが載っています。","en":"The city catalogue lists this maker’s Takao-grape dorayaki.","zh-TW":"市府目錄列有此生產者的高尾葡萄餡銅鑼燒。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        }
      ],
      "stats": {
        "ja": {"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。"},
        "en": {"time":"About 120 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"120","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops."},
        "zh-TW": {"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b08-inagi-takao-grapes-el-cielo": {
      "presentation": {
        "id": "b08-inagi-takao-grapes-el-cielo",
        "regionId": "inagi",
        "foodCultureId": "inagi-takao-grapes",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "手づくりアイスクリーム エル・シエロ",
            "lead": "市の目録に高尾ぶどうのシャーベットが載っています。",
            "description": "市の目録に高尾ぶどうのシャーベットが載っています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Handmade Ice Cream El Cielo",
            "lead": "The city catalogue features this maker’s Takao-grape sorbet.",
            "description": "The city catalogue features this maker’s Takao-grape sorbet.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "手工冰淇淋El Cielo",
            "lead": "市府目錄介紹此生產者的高尾葡萄雪酪。",
            "description": "市府目錄介紹此生產者的高尾葡萄雪酪。",
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
        "description": {"ja":"市の目録に高尾ぶどうのシャーベットが載っています。","en":"The city catalogue features this maker’s Takao-grape sorbet.","zh-TW":"市府目錄介紹此生產者的高尾葡萄雪酪。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-b.pdf","en":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-b.pdf","zh-TW":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-b.pdf"}
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
      "officialSource": {"name":"令和7年度 稲城の太鼓判 認証商品一覧（裏）","url":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-b.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b08-inagi-takao-grapes-miyoshi": {
      "presentation": {
        "id": "b08-inagi-takao-grapes-miyoshi",
        "regionId": "inagi",
        "foodCultureId": "inagi-takao-grapes",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "御菓子司 三好",
            "lead": "市の目録に高尾ぶどう餡のどら焼きが載っています。",
            "description": "市の目録に高尾ぶどう餡のどら焼きが載っています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Miyoshi Confectionery",
            "lead": "The city catalogue lists this maker’s Takao-grape dorayaki.",
            "description": "The city catalogue lists this maker’s Takao-grape dorayaki.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "御菓子司三好",
            "lead": "市府目錄列有此生產者的高尾葡萄餡銅鑼燒。",
            "description": "市府目錄列有此生產者的高尾葡萄餡銅鑼燒。",
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
        "description": {"ja":"市の目録に高尾ぶどう餡のどら焼きが載っています。","en":"The city catalogue lists this maker’s Takao-grape dorayaki.","zh-TW":"市府目錄列有此生產者的高尾葡萄餡銅鑼燒。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-f.pdf","en":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-f.pdf","zh-TW":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-f.pdf"}
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
      "officialSource": {"name":"令和7年度 稲城の太鼓判 認証商品一覧（表）","url":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-f.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-inagi-takao-grapes-el-cielo",
          "spotId": "b08-inagi-takao-grapes-el-cielo",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"手づくりアイスクリーム エル・シエロ","en":"Handmade Ice Cream El Cielo","zh-TW":"手工冰淇淋El Cielo"},
          "description": {"ja":"市の目録に高尾ぶどうのシャーベットが載っています。","en":"The city catalogue features this maker’s Takao-grape sorbet.","zh-TW":"市府目錄介紹此生產者的高尾葡萄雪酪。"}
        },
        {
          "referenceId": "b08-inagi-takao-grapes-miyoshi",
          "spotId": "b08-inagi-takao-grapes-miyoshi",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"御菓子司 三好","en":"Miyoshi Confectionery","zh-TW":"御菓子司三好"},
          "description": {"ja":"市の目録に高尾ぶどう餡のどら焼きが載っています。","en":"The city catalogue lists this maker’s Takao-grape dorayaki.","zh-TW":"市府目錄列有此生產者的高尾葡萄餡銅鑼燒。"}
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {"region":"稲城市","station":""},
      "en": {"region":"Inagi City","station":""},
      "zh-TW": {"region":"稻城市","station":""}
    }
  },
  "sources": {
    "admission-access": {"name": "El Cielo shop and access information", "url": "https://www.el-cielo.jp/%E5%BA%97%E9%95%B7%E7%B4%B9%E4%BB%8B-%E5%BA%97%E8%88%97%E6%83%85%E5%A0%B1/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-17": {"name":"稲城市の特産品「ぶどう」","url":"https://www.city.inagi.tokyo.jp/sangyo/nougyou/1010173/1003691.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-20": {"name":"令和7年度 稲城の太鼓判 認証商品一覧（裏）","url":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-b.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-22": {"name":"令和7年度 稲城の太鼓判 認証商品一覧（表）","url":"https://www.city.inagi.tokyo.jp/_res/projects/default_project/_page_/001/010/499/taiko-f.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://www.city.inagi.tokyo.jp/sangyo/nougyou/1010173/1003691.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-17","source-20","source-22"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-17","source-20","source-22"],"origin":"editorial"},
    "location": {"sourceIds":["source-17","source-20","source-22"],"origin":"editorial"},
    "story": {"sourceIds":["source-17","source-20","source-22"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-17","source-20","source-22"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-17","source-20","source-22"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-17"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-17"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-17"],"origin":"editorial"},
    "spots.b08-inagi-takao-grapes-el-cielo": {"sourceIds":["source-20"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-20"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-20"],"origin":"editorial"},
    "spots.b08-inagi-takao-grapes-miyoshi": {"sourceIds":["source-22"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-22"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-22"],"origin":"editorial"}
  }
};
