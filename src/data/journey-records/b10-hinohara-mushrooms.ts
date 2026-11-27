import type { JourneyRecord } from '../journey-record';

export const b10HinoharaMushroomsRecord: JourneyRecord = {
  "municipalityId": "hinohara",
  "journey": {
    "id": "b10-hinohara-mushrooms",
    "regionId": "hinohara",
    "foodCultureId": "hinohara-mushrooms",
    "storyId": "b10-hinohara-mushrooms",
    "routeId": "b10-hinohara-mushrooms-route",
    "copy": {"ja": {"title": "檜原、山で育つきのこ", "subtitle": "檜原、山で育つきのこ", "description": "舞茸とあわび茸の作り手を知る。", "tags": ["檜原村"], "storyTitle": "檜原、山で育つきのこ", "intro": ["舞茸とあわび茸の作り手を知る。", "掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"title": "Hinohara mountain-grown mushrooms", "subtitle": "Hinohara mountain-grown mushrooms", "description": "Discover the grower of maitake and abalone mushrooms.", "tags": ["Hinohara Village"], "storyTitle": "Hinohara mountain-grown mushrooms", "intro": ["Discover the grower of maitake and abalone mushrooms.", "This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"title": "檜原山地栽培菇類", "subtitle": "檜原山地栽培菇類", "description": "認識舞茸與鮑魚菇的栽培者。", "tags": ["檜原村"], "storyTitle": "檜原山地栽培菇類", "intro": ["認識舞茸與鮑魚菇的栽培者。", "刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.", "title": "檜原、山で育つきのこ", "body": "観光協会によると、桧原きのこセンターは標高850メートルの場所で舞茸を栽培しています。"}, {"number": "02.", "title": "檜原、山で育つきのこ", "body": "観光協会は桧原きのこセンターの商品にあわび茸も挙げています。"}], "en": [{"number": "01.", "title": "Hinohara mountain-grown mushrooms", "body": "The tourism association describes Hinohara Kinoko Center growing maitake at an elevation of 850 meters."}, {"number": "02.", "title": "Hinohara mountain-grown mushrooms", "body": "The tourism association also lists abalone mushrooms among Hinohara Kinoko Center’s products."}], "zh-TW": [{"number": "01.", "title": "檜原山地栽培菇類", "body": "觀光協會介紹檜原菇類中心在海拔 850 公尺處栽培舞茸。"}, {"number": "02.", "title": "檜原山地栽培菇類", "body": "觀光協會也將鮑魚菇列為檜原菇類中心的產品。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId": "b10-hinohara-mushrooms-kinoko"}
        ]
      }
    ]
  },
  "routeName": {"ja": "檜原、山で育つきのこ", "en": "Hinohara mountain-grown mushrooms", "zh-TW": "檜原山地栽培菇類"},
  "location": {"ja": {"area": "檜原村", "station": "", "access": ""}, "en": {"area": "Hinohara Village", "station": "", "access": ""}, "zh-TW": {"area": "檜原村", "station": "", "access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "藤倉", "en": "Fujikura bus stop", "zh-TW": "藤倉巴士站"}, "spotId": "b10-hinohara-mushrooms-kinoko", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b10-hinohara-mushrooms-kinoko",
          "description": {"ja": "観光協会が舞茸とあわび茸を紹介する生産者です。", "en": "The producer the tourism association associates with maitake and abalone mushrooms.", "zh-TW": "觀光協會介紹舞茸與鮑魚菇的生產者。"},
          "note": {"ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。", "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.", "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}
        }
      ],
      "stats": {"ja": {"time": "約120分（編集目安）", "distance": "", "spots": "1 か所", "station": "", "minutes": "", "access": "", "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"}, "en": {"time": "About 120 min (editorial estimate)", "distance": "", "spots": "1 stop", "station": "", "minutes": "", "access": "", "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."}, "zh-TW": {"time": "約 120 分鐘（編輯估計）", "distance": "", "spots": "1 處", "station": "", "minutes": "", "access": "", "caution": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b10-hinohara-mushrooms-kinoko": {
      "presentation": {
        "id": "b10-hinohara-mushrooms-kinoko",
        "regionId": "hinohara",
        "foodCultureId": "hinohara-mushrooms",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "桧原きのこセンター", "lead": "観光協会が舞茸とあわび茸を紹介する生産者です。", "description": "観光協会が舞茸とあわび茸を紹介する生産者です。", "tags": [], "practicalInfo": [{"label": "確認状態", "value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}], "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"name": "Hinohara Kinoko Center", "lead": "The producer the tourism association associates with maitake and abalone mushrooms.", "description": "The producer the tourism association associates with maitake and abalone mushrooms.", "tags": [], "practicalInfo": [{"label": "Verification", "value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}], "caution": ["This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"name": "檜原菇類中心", "lead": "觀光協會介紹舞茸與鮑魚菇的生產者。", "description": "觀光協會介紹舞茸與鮑魚菇的生產者。", "tags": [], "practicalInfo": [{"label": "確認狀態", "value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}], "caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "観光協会が舞茸とあわび茸を紹介する生産者です。", "en": "The producer the tourism association associates with maitake and abalone mushrooms.", "zh-TW": "觀光協會介紹舞茸與鮑魚菇的生產者。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊"},
            "value": {"ja": "https://hinohara-kankou.jp/spot/hinoharakinokocenter/", "en": "https://hinohara-kankou.jp/spot/hinoharakinokocenter/", "zh-TW": "https://hinohara-kankou.jp/spot/hinoharakinokocenter/"}
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
      "officialSource": {"name": "（株）桧原きのこセンター", "url": "https://hinohara-kankou.jp/spot/hinoharakinokocenter/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b10-hinohara-mushrooms-kinoko",
          "spotId": "b10-hinohara-mushrooms-kinoko",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "桧原きのこセンター", "en": "Hinohara Kinoko Center", "zh-TW": "檜原菇類中心"},
          "description": {"ja": "観光協会が舞茸とあわび茸を紹介する生産者です。", "en": "The producer the tourism association associates with maitake and abalone mushrooms.", "zh-TW": "觀光協會介紹舞茸與鮑魚菇的生產者。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "檜原村", "station": ""}, "en": {"region": "Hinohara Village", "station": ""}, "zh-TW": {"region": "檜原村", "station": ""}}
  },
  "sources": {
    "admission-access": {"name": "Hinohara Village Tourism Association Kinoko Center access", "url": "https://hinohara-kankou.jp/spot/hinoharakinokocenter/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "s0": {"name": "（株）桧原きのこセンター", "url": "https://hinohara-kankou.jp/spot/hinoharakinokocenter/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b10 editorial itinerary: estimated timing and order, not a timetable", "url": "https://hinohara-kankou.jp/spot/hinoharakinokocenter/", "sourceType": "manual", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "s0"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "s0"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "s0"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "s0"
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
        "s0"
      ],
      "origin": "source"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "s0"
      ],
      "origin": "source"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "s0"
      ],
      "origin": "source"
    },
    "spots.b10-hinohara-mushrooms-kinoko": {
      "sourceIds": [
        "s0"
      ],
      "origin": "source"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "s0"
      ],
      "origin": "source"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "s0"
      ],
      "origin": "source"
    }
  }
};
