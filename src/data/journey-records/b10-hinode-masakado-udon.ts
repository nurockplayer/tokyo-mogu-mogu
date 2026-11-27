import type { JourneyRecord } from '../journey-record';

export const b10HinodeMasakadoUdonRecord: JourneyRecord = {
  "municipalityId": "hinode",
  "alcoholThemed": false,
  "journey": {
    "id": "b10-hinode-masakado-udon",
    "regionId": "hinode",
    "foodCultureId": "hinode-masakado-udon",
    "storyId": "b10-hinode-masakado-udon",
    "routeId": "b10-hinode-masakado-udon-route",
    "copy": {"ja": {"title": "日の出、将門うどんを知る", "subtitle": "日の出、将門うどんを知る", "description": "観光連盟が紹介する一杯を手がかりに。", "tags": ["日の出町"], "storyTitle": "日の出、将門うどんを知る", "intro": ["観光連盟が紹介する一杯を手がかりに。", "掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"title": "Discover Hinode Masakado udon", "subtitle": "Discover Hinode Masakado udon", "description": "Follow a named udon dish in the regional tourism guide.", "tags": ["Hinode"], "storyTitle": "Discover Hinode Masakado udon", "intro": ["Follow a named udon dish in the regional tourism guide.", "This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"title": "認識日出町將門烏龍麵", "subtitle": "認識日出町將門烏龍麵", "description": "從區域觀光指南介紹的烏龍麵認識當地。", "tags": ["日出町"], "storyTitle": "認識日出町將門烏龍麵", "intro": ["從區域觀光指南介紹的烏龍麵認識當地。", "刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.", "title": "日の出、将門うどんを知る", "body": "大多摩観光連盟は、さかな園の名物として将門うどんを挙げています。"}], "en": [{"number": "01.", "title": "Discover Hinode Masakado udon", "body": "The Ohtama Tourism Federation names Masakado udon as a Sakana-en specialty."}], "zh-TW": [{"number": "01.", "title": "認識日出町將門烏龍麵", "body": "大多摩觀光聯盟將將門烏龍麵列為 Sakana-en 的特色料理。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId": "b10-hinode-masakado-udon-sakanaen"}
        ]
      }
    ]
  },
  "routeName": {"ja": "日の出、将門うどんを知る", "en": "Discover Hinode Masakado udon", "zh-TW": "認識日出町將門烏龍麵"},
  "location": {"ja": {"area": "日の出町", "station": "", "access": ""}, "en": {"area": "Hinode", "station": "", "access": ""}, "zh-TW": {"area": "日出町", "station": "", "access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "さかな園", "en": "Sakanaen bus stop", "zh-TW": "魚園巴士站"}, "spotId": "b10-hinode-masakado-udon-sakanaen", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b10-hinode-masakado-udon-sakanaen",
          "description": {"ja": "大多摩観光連盟が将門うどんとともに紹介する施設です。", "en": "The facility the Ohtama Tourism Federation associates with Masakado udon.", "zh-TW": "大多摩觀光聯盟在將門烏龍麵介紹中列出的設施。"},
          "note": {"ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。", "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.", "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}
        }
      ],
      "stats": {"ja": {"time": "約90分（編集目安）", "distance": "", "spots": "1 か所", "station": "", "minutes": "", "access": "", "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"}, "en": {"time": "About 90 min (editorial estimate)", "distance": "", "spots": "1 stop", "station": "", "minutes": "", "access": "", "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."}, "zh-TW": {"time": "約 90 分鐘（編輯估計）", "distance": "", "spots": "1 處", "station": "", "minutes": "", "access": "", "caution": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b10-hinode-masakado-udon-sakanaen": {
      "presentation": {
        "id": "b10-hinode-masakado-udon-sakanaen",
        "regionId": "hinode",
        "foodCultureId": "hinode-masakado-udon",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "自然休養村さかな園", "lead": "大多摩観光連盟が将門うどんとともに紹介する施設です。", "description": "大多摩観光連盟が将門うどんとともに紹介する施設です。", "tags": [], "practicalInfo": [{"label": "確認状態", "value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}], "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"name": "Sakana-en", "lead": "The facility the Ohtama Tourism Federation associates with Masakado udon.", "description": "The facility the Ohtama Tourism Federation associates with Masakado udon.", "tags": [], "practicalInfo": [{"label": "Verification", "value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}], "caution": ["This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"name": "Sakana-en 自然休養村", "lead": "大多摩觀光聯盟在將門烏龍麵介紹中列出的設施。", "description": "大多摩觀光聯盟在將門烏龍麵介紹中列出的設施。", "tags": [], "practicalInfo": [{"label": "確認狀態", "value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}], "caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "大多摩観光連盟が将門うどんとともに紹介する施設です。", "en": "The facility the Ohtama Tourism Federation associates with Masakado udon.", "zh-TW": "大多摩觀光聯盟在將門烏龍麵介紹中列出的設施。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊"},
            "value": {"ja": "https://www.ohtama.or.jp/sightseeing/239.html", "en": "https://www.ohtama.or.jp/sightseeing/239.html", "zh-TW": "https://www.ohtama.or.jp/sightseeing/239.html"}
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
      "officialSource": {"name": "さかな園", "url": "https://www.ohtama.or.jp/sightseeing/239.html", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b10-hinode-masakado-udon-sakanaen",
          "spotId": "b10-hinode-masakado-udon-sakanaen",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "自然休養村さかな園", "en": "Sakana-en", "zh-TW": "Sakana-en 自然休養村"},
          "description": {"ja": "大多摩観光連盟が将門うどんとともに紹介する施設です。", "en": "The facility the Ohtama Tourism Federation associates with Masakado udon.", "zh-TW": "大多摩觀光聯盟在將門烏龍麵介紹中列出的設施。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "日の出町", "station": ""}, "en": {"region": "Hinode", "station": ""}, "zh-TW": {"region": "日出町", "station": ""}}
  },
  "sources": {
    "admission-access": {"name": "Hinode Tourism Association Sakanaen access", "url": "https://www.hinodekanko.jp/%E8%A6%8B%E3%82%8B-%E9%81%8A%E3%81%B6-%E6%A5%BD%E3%81%97%E3%82%80/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "s0": {"name": "さかな園", "url": "https://www.ohtama.or.jp/sightseeing/239.html", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b10 editorial itinerary: estimated timing and order, not a timetable", "url": "https://www.ohtama.or.jp/sightseeing/239.html", "sourceType": "manual", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
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
    "spots.b10-hinode-masakado-udon-sakanaen": {
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
