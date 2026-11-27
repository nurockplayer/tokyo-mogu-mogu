import type { JourneyRecord } from '../journey-record';

export const b10HinodeTroutRecord: JourneyRecord = {
  "municipalityId": "hinode",
  "alcoholThemed": false,
  "journey": {
    "id": "b10-hinode-trout",
    "regionId": "hinode",
    "foodCultureId": "hinode-trout",
    "storyId": "b10-hinode-trout",
    "routeId": "b10-hinode-trout-route",
    "copy": {"ja": {"title": "日の出、マスをめぐる川辺", "subtitle": "日の出、マスをめぐる川辺", "description": "さかな園と川魚の食体験を知る。", "tags": ["日の出町"], "storyTitle": "日の出、マスをめぐる川辺", "intro": ["さかな園と川魚の食体験を知る。", "掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"title": "Hinode trout by the river", "subtitle": "Hinode trout by the river", "description": "Discover Sakana-en and its freshwater-food experience.", "tags": ["Hinode"], "storyTitle": "Hinode trout by the river", "intro": ["Discover Sakana-en and its freshwater-food experience.", "This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"title": "日出町的河畔鱒魚", "subtitle": "日出町的河畔鱒魚", "description": "認識 Sakana-en 與淡水魚飲食體驗。", "tags": ["日出町"], "storyTitle": "日出町的河畔鱒魚", "intro": ["認識 Sakana-en 與淡水魚飲食體驗。", "刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.", "title": "日の出、マスをめぐる川辺", "body": "町は、さかな園で渓流釣りやマスのつかみ取り、釣ったマスを焼いて食べる体験を紹介しています。"}], "en": [{"number": "01.", "title": "Hinode trout by the river", "body": "Hinode Town describes stream fishing, catching trout by hand, and grilling the catch at Sakana-en."}], "zh-TW": [{"number": "01.", "title": "日出町的河畔鱒魚", "body": "日出町介紹在 Sakana-en 溪釣、徒手捉鱒魚及烤食漁獲的體驗。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId": "b10-hinode-trout-sakanaen"}
        ]
      }
    ]
  },
  "routeName": {"ja": "日の出、マスをめぐる川辺", "en": "Hinode trout by the river", "zh-TW": "日出町的河畔鱒魚"},
  "location": {"ja": {"area": "日の出町", "station": "", "access": ""}, "en": {"area": "Hinode", "station": "", "access": ""}, "zh-TW": {"area": "日出町", "station": "", "access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "さかな園", "en": "Sakanaen bus stop", "zh-TW": "魚園巴士站"}, "spotId": "b10-hinode-trout-sakanaen", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b10-hinode-trout-sakanaen",
          "description": {"ja": "町は、さかな園でマス釣りと釣ったマスを焼いて食べる体験を紹介しています。", "en": "The town describes trout fishing and cooking the catch at Sakana-en.", "zh-TW": "町方介紹在 Sakana-en 釣鱒魚並烤食漁獲的體驗。"},
          "note": {"ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。", "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.", "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}
        }
      ],
      "stats": {"ja": {"time": "約120分（編集目安）", "distance": "", "spots": "1 か所", "station": "", "minutes": "", "access": "", "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"}, "en": {"time": "About 120 min (editorial estimate)", "distance": "", "spots": "1 stop", "station": "", "minutes": "", "access": "", "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."}, "zh-TW": {"time": "約 120 分鐘（編輯估計）", "distance": "", "spots": "1 處", "station": "", "minutes": "", "access": "", "caution": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b10-hinode-trout-sakanaen": {
      "presentation": {
        "id": "b10-hinode-trout-sakanaen",
        "regionId": "hinode",
        "foodCultureId": "hinode-trout",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "自然休養村さかな園", "lead": "町は、さかな園でマス釣りと釣ったマスを焼いて食べる体験を紹介しています。", "description": "町は、さかな園でマス釣りと釣ったマスを焼いて食べる体験を紹介しています。", "tags": [], "practicalInfo": [{"label": "確認状態", "value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}], "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"name": "Sakana-en", "lead": "The town describes trout fishing and cooking the catch at Sakana-en.", "description": "The town describes trout fishing and cooking the catch at Sakana-en.", "tags": [], "practicalInfo": [{"label": "Verification", "value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}], "caution": ["This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"name": "Sakana-en 自然休養村", "lead": "町方介紹在 Sakana-en 釣鱒魚並烤食漁獲的體驗。", "description": "町方介紹在 Sakana-en 釣鱒魚並烤食漁獲的體驗。", "tags": [], "practicalInfo": [{"label": "確認狀態", "value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}], "caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "町は、さかな園でマス釣りと釣ったマスを焼いて食べる体験を紹介しています。", "en": "The town describes trout fishing and cooking the catch at Sakana-en.", "zh-TW": "町方介紹在 Sakana-en 釣鱒魚並烤食漁獲的體驗。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊"},
            "value": {"ja": "https://www.town.hinode.tokyo.jp/0000000413.html", "en": "https://www.town.hinode.tokyo.jp/0000000413.html", "zh-TW": "https://www.town.hinode.tokyo.jp/0000000413.html"}
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
      "officialSource": {"name": "さかな園", "url": "https://www.town.hinode.tokyo.jp/0000000413.html", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b10-hinode-trout-sakanaen",
          "spotId": "b10-hinode-trout-sakanaen",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "自然休養村さかな園", "en": "Sakana-en", "zh-TW": "Sakana-en 自然休養村"},
          "description": {"ja": "町は、さかな園でマス釣りと釣ったマスを焼いて食べる体験を紹介しています。", "en": "The town describes trout fishing and cooking the catch at Sakana-en.", "zh-TW": "町方介紹在 Sakana-en 釣鱒魚並烤食漁獲的體驗。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "日の出町", "station": ""}, "en": {"region": "Hinode", "station": ""}, "zh-TW": {"region": "日出町", "station": ""}}
  },
  "sources": {
    "admission-access": {"name": "Hinode Tourism Association Sakanaen access", "url": "https://www.hinodekanko.jp/%E8%A6%8B%E3%82%8B-%E9%81%8A%E3%81%B6-%E6%A5%BD%E3%81%97%E3%82%80/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "s0": {"name": "さかな園", "url": "https://www.town.hinode.tokyo.jp/0000000413.html", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b10 editorial itinerary: estimated timing and order, not a timetable", "url": "https://www.town.hinode.tokyo.jp/0000000413.html", "sourceType": "manual", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
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
    "spots.b10-hinode-trout-sakanaen": {
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
