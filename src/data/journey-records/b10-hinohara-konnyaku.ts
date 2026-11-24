import type { JourneyRecord } from '../journey-record';

export const b10HinoharaKonnyakuRecord: JourneyRecord = {
  "municipalityId": "hinohara",
  "journey": {
    "id": "b10-hinohara-konnyaku",
    "regionId": "hinohara",
    "foodCultureId": "hinohara-konnyaku",
    "storyId": "b10-hinohara-konnyaku",
    "routeId": "b10-hinohara-konnyaku-route",
    "copy": {"ja": {"title": "檜原、手づくりこんにゃく", "subtitle": "檜原、手づくりこんにゃく", "description": "井上食品から村の直売所へ。", "tags": ["檜原村"], "storyTitle": "檜原、手づくりこんにゃく", "intro": ["井上食品から村の直売所へ。", "掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"title": "Hinohara handmade konnyaku", "subtitle": "Hinohara handmade konnyaku", "description": "Follow Inoue Foods and village direct sales.", "tags": ["Hinohara Village"], "storyTitle": "Hinohara handmade konnyaku", "intro": ["Follow Inoue Foods and village direct sales.", "This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"title": "檜原手製蒟蒻", "subtitle": "檜原手製蒟蒻", "description": "認識井上食品與村內直售據點。", "tags": ["檜原村"], "storyTitle": "檜原手製蒟蒻", "intro": ["認識井上食品與村內直售據點。", "刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.", "title": "檜原、手づくりこんにゃく", "body": "観光協会は、井上食品が刺身用、煮込み用、そうめん状などのこんにゃくを作ると紹介しています。"}], "en": [{"number": "01.", "title": "Hinohara handmade konnyaku", "body": "The tourism association describes Inoue Foods making sashimi-style, simmering and noodle-shaped konnyaku."}], "zh-TW": [{"number": "01.", "title": "檜原手製蒟蒻", "body": "觀光協會介紹井上食品製作刺身用、燉煮用及麵條狀蒟蒻。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId": "b10-hinohara-konnyaku-inoue"}
        ]
      }
    ]
  },
  "routeName": {"ja": "檜原、手づくりこんにゃく", "en": "Hinohara handmade konnyaku", "zh-TW": "檜原手製蒟蒻"},
  "location": {"ja": {"area": "檜原村", "station": "", "access": ""}, "en": {"area": "Hinohara Village", "station": "", "access": ""}, "zh-TW": {"area": "檜原村", "station": "", "access": ""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b10-hinohara-konnyaku-inoue",
          "description": {"ja": "観光協会が井上食品のこんにゃくの取扱先として工場直売所を挙げています。", "en": "The tourism association lists a factory shop among outlets for Inoue Foods konnyaku.", "zh-TW": "觀光協會將工廠直售店列為井上食品蒟蒻的銷售據點。"},
          "note": {"ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。", "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.", "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}
        }
      ],
      "stats": {"ja": {"time": "約120分（編集目安）", "distance": "", "spots": "1 か所", "station": "", "minutes": "120", "access": "", "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"}, "en": {"time": "About 120 min (editorial estimate)", "distance": "", "spots": "1 stop", "station": "", "minutes": "120", "access": "", "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."}, "zh-TW": {"time": "約 120 分鐘（編輯估計）", "distance": "", "spots": "1 處", "station": "", "minutes": "120", "access": "", "caution": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b10-hinohara-konnyaku-inoue": {
      "presentation": {
        "id": "b10-hinohara-konnyaku-inoue",
        "regionId": "hinohara",
        "foodCultureId": "hinohara-konnyaku",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "井上食品 工場直売所", "lead": "観光協会が井上食品のこんにゃくの取扱先として工場直売所を挙げています。", "description": "観光協会が井上食品のこんにゃくの取扱先として工場直売所を挙げています。", "tags": [], "practicalInfo": [{"label": "確認状態", "value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}], "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"name": "Inoue Foods factory shop", "lead": "The tourism association lists a factory shop among outlets for Inoue Foods konnyaku.", "description": "The tourism association lists a factory shop among outlets for Inoue Foods konnyaku.", "tags": [], "practicalInfo": [{"label": "Verification", "value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}], "caution": ["This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"name": "井上食品工廠直售店", "lead": "觀光協會將工廠直售店列為井上食品蒟蒻的銷售據點。", "description": "觀光協會將工廠直售店列為井上食品蒟蒻的銷售據點。", "tags": [], "practicalInfo": [{"label": "確認狀態", "value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}], "caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "観光協会が井上食品のこんにゃくの取扱先として工場直売所を挙げています。", "en": "The tourism association lists a factory shop among outlets for Inoue Foods konnyaku.", "zh-TW": "觀光協會將工廠直售店列為井上食品蒟蒻的銷售據點。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊"},
            "value": {"ja": "https://hinohara-kankou.jp/spot/inoueshokuhin/", "en": "https://hinohara-kankou.jp/spot/inoueshokuhin/", "zh-TW": "https://hinohara-kankou.jp/spot/inoueshokuhin/"}
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
      "officialSource": {"name": "（株）井上食品", "url": "https://hinohara-kankou.jp/spot/inoueshokuhin/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b10-hinohara-konnyaku-inoue",
          "spotId": "b10-hinohara-konnyaku-inoue",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "井上食品 工場直売所", "en": "Inoue Foods factory shop", "zh-TW": "井上食品工廠直售店"},
          "description": {"ja": "観光協会が井上食品のこんにゃくの取扱先として工場直売所を挙げています。", "en": "The tourism association lists a factory shop among outlets for Inoue Foods konnyaku.", "zh-TW": "觀光協會將工廠直售店列為井上食品蒟蒻的銷售據點。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "檜原村", "station": ""}, "en": {"region": "Hinohara Village", "station": ""}, "zh-TW": {"region": "檜原村", "station": ""}}
  },
  "sources": {
    "s0": {"name": "（株）井上食品", "url": "https://hinohara-kankou.jp/spot/inoueshokuhin/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b10 editorial itinerary: estimated timing and order, not a timetable", "url": "https://hinohara-kankou.jp/spot/inoueshokuhin/", "sourceType": "manual", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
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
    "spots.b10-hinohara-konnyaku-inoue": {
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
