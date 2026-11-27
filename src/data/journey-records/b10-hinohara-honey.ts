import type { JourneyRecord } from '../journey-record';

export const b10HinoharaHoneyRecord: JourneyRecord = {
  "municipalityId": "hinohara",
  "alcoholThemed": false,
  "journey": {
    "id": "b10-hinohara-honey",
    "regionId": "hinohara",
    "foodCultureId": "hinohara-honey",
    "storyId": "b10-hinohara-honey",
    "routeId": "b10-hinohara-honey-route",
    "copy": {"ja": {"title": "檜原、養蜂家と里の蜂蜜", "subtitle": "檜原、養蜂家と里の蜂蜜", "description": "薫る養蜂園と村の取扱店を知る。", "tags": ["檜原村"], "storyTitle": "檜原、養蜂家と里の蜂蜜", "intro": ["薫る養蜂園と村の取扱店を知る。", "掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"title": "Hinohara honey and its beekeeper", "subtitle": "Hinohara honey and its beekeeper", "description": "Connect Kaoru Apiary with village outlets.", "tags": ["Hinohara Village"], "storyTitle": "Hinohara honey and its beekeeper", "intro": ["Connect Kaoru Apiary with village outlets.", "This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"title": "檜原養蜂者與蜂蜜", "subtitle": "檜原養蜂者與蜂蜜", "description": "認識薰養蜂園與村內銷售據點。", "tags": ["檜原村"], "storyTitle": "檜原養蜂者與蜂蜜", "intro": ["認識薰養蜂園與村內銷售據點。", "刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.", "title": "檜原、養蜂家と里の蜂蜜", "body": "観光協会は、薫る養蜂園を檜原村で天然はちみつを作る養蜂家として紹介しています。"}], "en": [{"number": "01.", "title": "Hinohara honey and its beekeeper", "body": "The tourism association describes Kaoru Apiary as a natural-honey producer in Hinohara."}], "zh-TW": [{"number": "01.", "title": "檜原養蜂者與蜂蜜", "body": "觀光協會介紹薰養蜂園為檜原村的天然蜂蜜生產者。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId": "b10-hinohara-honey-yamabukiya"}
        ]
      }
    ]
  },
  "routeName": {"ja": "檜原、養蜂家と里の蜂蜜", "en": "Hinohara honey and its beekeeper", "zh-TW": "檜原養蜂者與蜂蜜"},
  "location": {"ja": {"area": "檜原村", "station": "", "access": ""}, "en": {"area": "Hinohara Village", "station": "", "access": ""}, "zh-TW": {"area": "檜原村", "station": "", "access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "宮の沢", "en": "Miyanosawa bus stop", "zh-TW": "宮之澤巴士站"}, "spotId": "b10-hinohara-honey-yamabukiya", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b10-hinohara-honey-yamabukiya",
          "description": {"ja": "観光協会の薫る養蜂園紹介が、蜂蜜の取扱店として挙げる直売所です。", "en": "The tourism association’s Kaoru Apiary page names this shop as a honey outlet.", "zh-TW": "觀光協會的薰養蜂園介紹將此店列為蜂蜜銷售據點。"},
          "note": {"ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。", "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.", "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}
        }
      ],
      "stats": {"ja": {"time": "約120分（編集目安）", "distance": "", "spots": "1 か所", "station": "", "minutes": "", "access": "", "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"}, "en": {"time": "About 120 min (editorial estimate)", "distance": "", "spots": "1 stop", "station": "", "minutes": "", "access": "", "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."}, "zh-TW": {"time": "約 120 分鐘（編輯估計）", "distance": "", "spots": "1 處", "station": "", "minutes": "", "access": "", "caution": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b10-hinohara-honey-yamabukiya": {
      "visitorSourceId": "admission-access",
      "presentation": {
        "id": "b10-hinohara-honey-yamabukiya",
        "regionId": "hinohara",
        "foodCultureId": "hinohara-honey",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "特産物直売所やまぶき屋", "lead": "観光協会の薫る養蜂園紹介が、蜂蜜の取扱店として挙げる直売所です。", "description": "観光協会の薫る養蜂園紹介が、蜂蜜の取扱店として挙げる直売所です。", "tags": [], "practicalInfo": [{"label": "確認状態", "value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}], "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"name": "Yamabukiya local products shop", "lead": "The tourism association’s Kaoru Apiary page names this shop as a honey outlet.", "description": "The tourism association’s Kaoru Apiary page names this shop as a honey outlet.", "tags": [], "practicalInfo": [{"label": "Verification", "value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}], "caution": ["This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"name": "Yamabukiya 特產直售店", "lead": "觀光協會的薰養蜂園介紹將此店列為蜂蜜銷售據點。", "description": "觀光協會的薰養蜂園介紹將此店列為蜂蜜銷售據點。", "tags": [], "practicalInfo": [{"label": "確認狀態", "value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}], "caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "観光協会の薫る養蜂園紹介が、蜂蜜の取扱店として挙げる直売所です。", "en": "The tourism association’s Kaoru Apiary page names this shop as a honey outlet.", "zh-TW": "觀光協會的薰養蜂園介紹將此店列為蜂蜜銷售據點。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊"},
            "value": {"ja": "https://hinohara-kankou.jp/spot/kaoruyohoen/", "en": "https://hinohara-kankou.jp/spot/kaoruyohoen/", "zh-TW": "https://hinohara-kankou.jp/spot/kaoruyohoen/"}
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
      "officialSource": {"name": "薫る養蜂園", "url": "https://hinohara-kankou.jp/spot/kaoruyohoen/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b10-hinohara-honey-yamabukiya",
          "spotId": "b10-hinohara-honey-yamabukiya",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "特産物直売所やまぶき屋", "en": "Yamabukiya local products shop", "zh-TW": "Yamabukiya 特產直售店"},
          "description": {"ja": "観光協会の薫る養蜂園紹介が、蜂蜜の取扱店として挙げる直売所です。", "en": "The tourism association’s Kaoru Apiary page names this shop as a honey outlet.", "zh-TW": "觀光協會的薰養蜂園介紹將此店列為蜂蜜銷售據點。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "檜原村", "station": ""}, "en": {"region": "Hinohara Village", "station": ""}, "zh-TW": {"region": "檜原村", "station": ""}}
  },
  "sources": {
    "admission-access": {"name": "檜原村観光協会 特産物直売所やまぶき屋", "url": "https://hinohara-kankou.jp/spot/yamabuki-ya/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "s0": {"name": "薫る養蜂園", "url": "https://hinohara-kankou.jp/spot/kaoruyohoen/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b10 editorial itinerary: estimated timing and order, not a timetable", "url": "https://hinohara-kankou.jp/spot/kaoruyohoen/", "sourceType": "manual", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
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
    "spots.b10-hinohara-honey-yamabukiya": {
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
