import type { JourneyRecord } from '../journey-record';

export const b10HinoharaYuzuRecord: JourneyRecord = {
  "municipalityId": "hinohara",
  "journey": {
    "id": "b10-hinohara-yuzu",
    "regionId": "hinohara",
    "foodCultureId": "hinohara-yuzu",
    "storyId": "b10-hinohara-yuzu",
    "routeId": "b10-hinohara-yuzu-route",
    "copy": {"ja": {"title": "檜原、柚子の加工をめぐる", "subtitle": "檜原、柚子の加工をめぐる", "description": "ジャム、味噌、ワイン、柚子胡椒を知る。", "tags": ["檜原村"], "storyTitle": "檜原、柚子の加工をめぐる", "intro": ["ジャム、味噌、ワイン、柚子胡椒を知る。", "掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"title": "Hinohara yuzu in many forms", "subtitle": "Hinohara yuzu in many forms", "description": "Explore jam, miso, wine and yuzu pepper.", "tags": ["Hinohara Village"], "storyTitle": "Hinohara yuzu in many forms", "intro": ["Explore jam, miso, wine and yuzu pepper.", "This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"title": "檜原柚子的多種樣貌", "subtitle": "檜原柚子的多種樣貌", "description": "認識果醬、味噌、酒與柚子胡椒。", "tags": ["檜原村"], "storyTitle": "檜原柚子的多種樣貌", "intro": ["認識果醬、味噌、酒與柚子胡椒。", "刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.", "title": "檜原、柚子の加工をめぐる", "body": "観光協会は村の特産品に柚子と柚子ワインを挙げています。"}, {"number": "02.", "title": "檜原、柚子の加工をめぐる", "body": "やまぶき屋の商品紹介には、ゆずジャムとゆず味噌が載っています。"}, {"number": "03.", "title": "檜原、柚子の加工をめぐる", "body": "観光協会のやまぶき屋紹介には、ゆずワインも載っています。"}, {"number": "04.", "title": "檜原、柚子の加工をめぐる", "body": "観光協会によると、ともすびは村の蔬果を使う柚子胡椒やとうがらし味噌などを作っています。"}], "en": [{"number": "01.", "title": "Hinohara yuzu in many forms", "body": "The tourism association names yuzu and yuzu wine among village specialties."}, {"number": "02.", "title": "Hinohara yuzu in many forms", "body": "Yamabukiya’s product listing includes yuzu jam and yuzu miso."}, {"number": "03.", "title": "Hinohara yuzu in many forms", "body": "The tourism association’s Yamabukiya listing also includes yuzu wine."}, {"number": "04.", "title": "Hinohara yuzu in many forms", "body": "The tourism association describes Tomosubi making yuzu pepper and chili miso using village fruit and vegetables."}], "zh-TW": [{"number": "01.", "title": "檜原柚子的多種樣貌", "body": "觀光協會將柚子與柚子酒列為村內特產。"}, {"number": "02.", "title": "檜原柚子的多種樣貌", "body": "Yamabukiya 的商品介紹列有柚子果醬與柚子味噌。"}, {"number": "03.", "title": "檜原柚子的多種樣貌", "body": "觀光協會的 Yamabukiya 介紹也列有柚子酒。"}, {"number": "04.", "title": "檜原柚子的多種樣貌", "body": "觀光協會介紹 Tomosubi 使用村內蔬果製作柚子胡椒及辣椒味噌。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 180,
        "steps": [
          {"spotId": "b10-hinohara-yuzu-yamabukiya"},
          {"spotId": "b10-hinohara-yuzu-yamanomise"}
        ]
      }
    ]
  },
  "routeName": {"ja": "檜原、柚子の加工をめぐる", "en": "Hinohara yuzu in many forms", "zh-TW": "檜原柚子的多種樣貌"},
  "location": {"ja": {"area": "檜原村", "station": "", "access": ""}, "en": {"area": "Hinohara Village", "station": "", "access": ""}, "zh-TW": {"area": "檜原村", "station": "", "access": ""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b10-hinohara-yuzu-yamabukiya",
          "description": {"ja": "観光協会が村の野菜や加工食品を紹介する直売所です。", "en": "The tourism association lists this outlet for village vegetables and processed foods.", "zh-TW": "觀光協會介紹的村內蔬菜與加工食品直售店。"},
          "note": {"ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。", "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.", "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}
        },
        {
          "spotId": "b10-hinohara-yuzu-yamanomise",
          "description": {"ja": "観光協会が野菜や村の手作り加工食品を紹介する店です。", "en": "The tourism association describes a shop for vegetables and foods handmade by villagers.", "zh-TW": "觀光協會介紹的蔬菜與村民手製食品商店。"},
          "note": {"ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。", "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.", "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}
        }
      ],
      "stats": {"ja": {"time": "約180分（編集目安）", "distance": "", "spots": "2 か所", "station": "", "minutes": "180", "access": "", "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"}, "en": {"time": "About 180 min (editorial estimate)", "distance": "", "spots": "2 stops", "station": "", "minutes": "180", "access": "", "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."}, "zh-TW": {"time": "約 180 分鐘（編輯估計）", "distance": "", "spots": "2 處", "station": "", "minutes": "180", "access": "", "caution": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b10-hinohara-yuzu-yamabukiya": {
      "presentation": {
        "id": "b10-hinohara-yuzu-yamabukiya",
        "regionId": "hinohara",
        "foodCultureId": "hinohara-yuzu",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "特産物直売所やまぶき屋", "lead": "観光協会が村の野菜や加工食品を紹介する直売所です。", "description": "観光協会が村の野菜や加工食品を紹介する直売所です。", "tags": [], "practicalInfo": [{"label": "確認状態", "value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}], "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"name": "Yamabukiya local products shop", "lead": "The tourism association lists this outlet for village vegetables and processed foods.", "description": "The tourism association lists this outlet for village vegetables and processed foods.", "tags": [], "practicalInfo": [{"label": "Verification", "value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}], "caution": ["This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"name": "Yamabukiya 特產直售店", "lead": "觀光協會介紹的村內蔬菜與加工食品直售店。", "description": "觀光協會介紹的村內蔬菜與加工食品直售店。", "tags": [], "practicalInfo": [{"label": "確認狀態", "value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}], "caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "観光協会が村の野菜や加工食品を紹介する直売所です。", "en": "The tourism association lists this outlet for village vegetables and processed foods.", "zh-TW": "觀光協會介紹的村內蔬菜與加工食品直售店。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊"},
            "value": {"ja": "https://hinohara-kankou.jp/spot/yamabuki-ya/", "en": "https://hinohara-kankou.jp/spot/yamabuki-ya/", "zh-TW": "https://hinohara-kankou.jp/spot/yamabuki-ya/"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja": "確認状態", "en": "Verification", "zh-TW": "確認狀態"},
            "value": {"ja": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。", "en": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.", "zh-TW": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [
          {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
        ]
      },
      "officialSource": {"name": "特産物直売所やまぶき屋", "url": "https://hinohara-kankou.jp/spot/yamabuki-ya/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
    },
    "b10-hinohara-yuzu-yamanomise": {
      "presentation": {
        "id": "b10-hinohara-yuzu-yamanomise",
        "regionId": "hinohara",
        "foodCultureId": "hinohara-yuzu",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "山の店", "lead": "観光協会が野菜や村の手作り加工食品を紹介する店です。", "description": "観光協会が野菜や村の手作り加工食品を紹介する店です。", "tags": [], "practicalInfo": [{"label": "確認状態", "value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}], "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"name": "Yama no Mise", "lead": "The tourism association describes a shop for vegetables and foods handmade by villagers.", "description": "The tourism association describes a shop for vegetables and foods handmade by villagers.", "tags": [], "practicalInfo": [{"label": "Verification", "value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}], "caution": ["This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"name": "山之店", "lead": "觀光協會介紹的蔬菜與村民手製食品商店。", "description": "觀光協會介紹的蔬菜與村民手製食品商店。", "tags": [], "practicalInfo": [{"label": "確認狀態", "value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}], "caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "観光協会が野菜や村の手作り加工食品を紹介する店です。", "en": "The tourism association describes a shop for vegetables and foods handmade by villagers.", "zh-TW": "觀光協會介紹的蔬菜與村民手製食品商店。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊"},
            "value": {"ja": "https://hinohara-kankou.jp/spot/yamanomise/", "en": "https://hinohara-kankou.jp/spot/yamanomise/", "zh-TW": "https://hinohara-kankou.jp/spot/yamanomise/"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja": "確認状態", "en": "Verification", "zh-TW": "確認狀態"},
            "value": {"ja": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。", "en": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.", "zh-TW": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [
          {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
        ]
      },
      "officialSource": {"name": "Hinohara tourism association: yamanomise", "url": "https://hinohara-kankou.jp/spot/yamanomise/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b10-hinohara-yuzu-yamabukiya",
          "spotId": "b10-hinohara-yuzu-yamabukiya",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "特産物直売所やまぶき屋", "en": "Yamabukiya local products shop", "zh-TW": "Yamabukiya 特產直售店"},
          "description": {"ja": "観光協会が村の野菜や加工食品を紹介する直売所です。", "en": "The tourism association lists this outlet for village vegetables and processed foods.", "zh-TW": "觀光協會介紹的村內蔬菜與加工食品直售店。"}
        },
        {
          "referenceId": "b10-hinohara-yuzu-yamanomise",
          "spotId": "b10-hinohara-yuzu-yamanomise",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "山の店", "en": "Yama no Mise", "zh-TW": "山之店"},
          "description": {"ja": "観光協会が野菜や村の手作り加工食品を紹介する店です。", "en": "The tourism association describes a shop for vegetables and foods handmade by villagers.", "zh-TW": "觀光協會介紹的蔬菜與村民手製食品商店。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "檜原村", "station": ""}, "en": {"region": "Hinohara Village", "station": ""}, "zh-TW": {"region": "檜原村", "station": ""}}
  },
  "sources": {
    "s0": {"name": "檜原村エコツーリズム", "url": "https://hinohara-kankou.jp/ecotourism/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "s1": {"name": "特産物直売所やまぶき屋", "url": "https://hinohara-kankou.jp/spot/yamabuki-ya/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "s2": {"name": "合同会社ともすび", "url": "https://hinohara-kankou.jp/spot/tomosubi/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "s3": {"name": "Hinohara tourism association: yamanomise", "url": "https://hinohara-kankou.jp/spot/yamanomise/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b10 editorial itinerary: estimated timing and order, not a timetable", "url": "https://hinohara-kankou.jp/ecotourism/", "sourceType": "manual", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "s0",
        "s1",
        "s2",
        "s3"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "s0",
        "s1",
        "s2",
        "s3"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "s0",
        "s1",
        "s2",
        "s3"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "s0",
        "s1",
        "s2",
        "s3"
      ],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": [
        "editorial"
      ],
      "origin": "editorial"
    },
    "variants.half-day": {
      "sourceIds": [
        "editorial"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "s0"
      ],
      "origin": "source"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "s0"
      ],
      "origin": "source"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "s0"
      ],
      "origin": "source"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "s1"
      ],
      "origin": "source"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "s1"
      ],
      "origin": "source"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "s1"
      ],
      "origin": "source"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "s1"
      ],
      "origin": "source"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "s1"
      ],
      "origin": "source"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "s1"
      ],
      "origin": "source"
    },
    "journey.chapters.ja.3": {
      "sourceIds": [
        "s2"
      ],
      "origin": "source"
    },
    "journey.chapters.en.3": {
      "sourceIds": [
        "s2"
      ],
      "origin": "source"
    },
    "journey.chapters.zh-TW.3": {
      "sourceIds": [
        "s2"
      ],
      "origin": "source"
    },
    "spots.b10-hinohara-yuzu-yamabukiya": {
      "sourceIds": [
        "s1"
      ],
      "origin": "source"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "s1"
      ],
      "origin": "source"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "s1"
      ],
      "origin": "source"
    },
    "spots.b10-hinohara-yuzu-yamanomise": {
      "sourceIds": [
        "s3"
      ],
      "origin": "source"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "s3"
      ],
      "origin": "source"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "s3"
      ],
      "origin": "source"
    }
  }
};
