import type { JourneyRecord } from '../journey-record';

export const b10HinoharaRiverFishRecord: JourneyRecord = {
  "municipalityId": "hinohara",
  "journey": {
    "id": "b10-hinohara-river-fish",
    "regionId": "hinohara",
    "foodCultureId": "hinohara-river-fish",
    "storyId": "b10-hinohara-river-fish",
    "routeId": "b10-hinohara-river-fish-route",
    "copy": {"ja": {"title": "檜原、直売所と川魚", "subtitle": "檜原、直売所と川魚", "description": "ばんば特産物直売所の紹介を読む。", "tags": ["檜原村"], "storyTitle": "檜原、直売所と川魚", "intro": ["ばんば特産物直売所の紹介を読む。", "掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"title": "Hinohara freshwater fish at a local outlet", "subtitle": "Hinohara freshwater fish at a local outlet", "description": "Explore the Banba local-products listing.", "tags": ["Hinohara Village"], "storyTitle": "Hinohara freshwater fish at a local outlet", "intro": ["Explore the Banba local-products listing.", "This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"title": "檜原直售店的淡水魚", "subtitle": "檜原直售店的淡水魚", "description": "認識 Banba 特產直售店的介紹。", "tags": ["檜原村"], "storyTitle": "檜原直售店的淡水魚", "intro": ["認識 Banba 特產直售店的介紹。", "刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.", "title": "檜原、直売所と川魚", "body": "観光協会は、ばんば特産物直売所の商品に鮎とヤマメを挙げています。"}], "en": [{"number": "01.", "title": "Hinohara freshwater fish at a local outlet", "body": "The tourism association lists ayu and yamame among Banba Local Products Market’s foods."}], "zh-TW": [{"number": "01.", "title": "檜原直售店的淡水魚", "body": "觀光協會將香魚與山女魚列為 Banba 特產直售店的食品。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId": "b10-hinohara-river-fish-banba"}
        ]
      }
    ]
  },
  "routeName": {"ja": "檜原、直売所と川魚", "en": "Hinohara freshwater fish at a local outlet", "zh-TW": "檜原直售店的淡水魚"},
  "location": {"ja": {"area": "檜原村", "station": "", "access": ""}, "en": {"area": "Hinohara Village", "station": "", "access": ""}, "zh-TW": {"area": "檜原村", "station": "", "access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "馬場", "en": "Banba bus stop", "zh-TW": "馬場巴士站"}, "spotId": "b10-hinohara-river-fish-banba", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b10-hinohara-river-fish-banba",
          "description": {"ja": "観光協会が鮎とヤマメを紹介する直売所です。", "en": "The local outlet whose tourism listing includes ayu and yamame.", "zh-TW": "觀光協會介紹列有香魚與山女魚的直售店。"},
          "note": {"ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。", "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.", "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}
        }
      ],
      "stats": {"ja": {"time": "約120分（編集目安）", "distance": "", "spots": "1 か所", "station": "", "minutes": "", "access": "", "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"}, "en": {"time": "About 120 min (editorial estimate)", "distance": "", "spots": "1 stop", "station": "", "minutes": "", "access": "", "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."}, "zh-TW": {"time": "約 120 分鐘（編輯估計）", "distance": "", "spots": "1 處", "station": "", "minutes": "", "access": "", "caution": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b10-hinohara-river-fish-banba": {
      "presentation": {
        "id": "b10-hinohara-river-fish-banba",
        "regionId": "hinohara",
        "foodCultureId": "hinohara-river-fish",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "ばんば特産物直売所", "lead": "観光協会が鮎とヤマメを紹介する直売所です。", "description": "観光協会が鮎とヤマメを紹介する直売所です。", "tags": [], "practicalInfo": [{"label": "確認状態", "value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}], "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"name": "Banba Local Products Market", "lead": "The local outlet whose tourism listing includes ayu and yamame.", "description": "The local outlet whose tourism listing includes ayu and yamame.", "tags": [], "practicalInfo": [{"label": "Verification", "value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}], "caution": ["This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"name": "Banba 特產直售店", "lead": "觀光協會介紹列有香魚與山女魚的直售店。", "description": "觀光協會介紹列有香魚與山女魚的直售店。", "tags": [], "practicalInfo": [{"label": "確認狀態", "value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}], "caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "観光協会が鮎とヤマメを紹介する直売所です。", "en": "The local outlet whose tourism listing includes ayu and yamame.", "zh-TW": "觀光協會介紹列有香魚與山女魚的直售店。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊"},
            "value": {"ja": "https://hinohara-kankou.jp/spot/banbatokusanbutsucyokubaijo/", "en": "https://hinohara-kankou.jp/spot/banbatokusanbutsucyokubaijo/", "zh-TW": "https://hinohara-kankou.jp/spot/banbatokusanbutsucyokubaijo/"}
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
      "officialSource": {"name": "ばんば特産物直売所", "url": "https://hinohara-kankou.jp/spot/banbatokusanbutsucyokubaijo/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b10-hinohara-river-fish-banba",
          "spotId": "b10-hinohara-river-fish-banba",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "ばんば特産物直売所", "en": "Banba Local Products Market", "zh-TW": "Banba 特產直售店"},
          "description": {"ja": "観光協会が鮎とヤマメを紹介する直売所です。", "en": "The local outlet whose tourism listing includes ayu and yamame.", "zh-TW": "觀光協會介紹列有香魚與山女魚的直售店。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "檜原村", "station": ""}, "en": {"region": "Hinohara Village", "station": ""}, "zh-TW": {"region": "檜原村", "station": ""}}
  },
  "sources": {
    "admission-access": {"name": "Hinohara Village Tourism Association Banba access", "url": "https://hinohara-kankou.jp/spot/banbatokusanbutsucyokubaijo/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "s0": {"name": "ばんば特産物直売所", "url": "https://hinohara-kankou.jp/spot/banbatokusanbutsucyokubaijo/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b10 editorial itinerary: estimated timing and order, not a timetable", "url": "https://hinohara-kankou.jp/spot/banbatokusanbutsucyokubaijo/", "sourceType": "manual", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
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
    "spots.b10-hinohara-river-fish-banba": {
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
