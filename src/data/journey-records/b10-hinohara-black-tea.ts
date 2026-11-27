import type { JourneyRecord } from '../journey-record';

export const b10HinoharaBlackTeaRecord: JourneyRecord = {
  "municipalityId": "hinohara",
  "journey": {
    "id": "b10-hinohara-black-tea",
    "regionId": "hinohara",
    "foodCultureId": "hinohara-black-tea",
    "storyId": "b10-hinohara-black-tea",
    "routeId": "b10-hinohara-black-tea-route",
    "copy": {"ja": {"title": "檜原、斜面の畑から紅茶へ", "subtitle": "檜原、斜面の畑から紅茶へ", "description": "再び育てられた茶畑の物語。", "tags": ["檜原村"], "storyTitle": "檜原、斜面の畑から紅茶へ", "intro": ["再び育てられた茶畑の物語。", "掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"title": "Hinohara black tea from hillside fields", "subtitle": "Hinohara black tea from hillside fields", "description": "Discover the story of a restored tea field.", "tags": ["Hinohara Village"], "storyTitle": "Hinohara black tea from hillside fields", "intro": ["Discover the story of a restored tea field.", "This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"title": "檜原山坡茶田的紅茶", "subtitle": "檜原山坡茶田的紅茶", "description": "認識重新耕作的茶田故事。", "tags": ["檜原村"], "storyTitle": "檜原山坡茶田的紅茶", "intro": ["認識重新耕作的茶田故事。", "刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.", "title": "檜原、斜面の畑から紅茶へ", "body": "観光協会によると、戸田雅子さんらが放棄されかけた斜面の茶畑を復活させ、ひのはら紅茶を生産しています。"}, {"number": "02.", "title": "檜原、斜面の畑から紅茶へ", "body": "やまぶき屋の商品紹介は、ひのはら紅茶を挙げています。"}], "en": [{"number": "01.", "title": "Hinohara black tea from hillside fields", "body": "The tourism association describes Masako Toda and collaborators restoring a nearly abandoned hillside tea field to produce Hinohara black tea."}, {"number": "02.", "title": "Hinohara black tea from hillside fields", "body": "Yamabukiya’s product listing includes Hinohara black tea."}], "zh-TW": [{"number": "01.", "title": "檜原山坡茶田的紅茶", "body": "觀光協會介紹戶田雅子與協作者恢復瀕臨荒廢的山坡茶田，生產檜原紅茶。"}, {"number": "02.", "title": "檜原山坡茶田的紅茶", "body": "Yamabukiya 的商品介紹列有檜原紅茶。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId": "b10-hinohara-black-tea-yamabukiya"}
        ]
      }
    ]
  },
  "routeName": {"ja": "檜原、斜面の畑から紅茶へ", "en": "Hinohara black tea from hillside fields", "zh-TW": "檜原山坡茶田的紅茶"},
  "location": {"ja": {"area": "檜原村", "station": "", "access": ""}, "en": {"area": "Hinohara Village", "station": "", "access": ""}, "zh-TW": {"area": "檜原村", "station": "", "access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "宮の沢", "en": "Miyanosawa bus stop", "zh-TW": "宮之澤巴士站"}, "spotId": "b10-hinohara-black-tea-yamabukiya", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b10-hinohara-black-tea-yamabukiya",
          "description": {"ja": "観光協会が村の野菜や加工食品を紹介する直売所です。", "en": "The tourism association lists this outlet for village vegetables and processed foods.", "zh-TW": "觀光協會介紹的村內蔬菜與加工食品直售店。"},
          "note": {"ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。", "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.", "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}
        }
      ],
      "stats": {"ja": {"time": "約120分（編集目安）", "distance": "", "spots": "1 か所", "station": "", "minutes": "", "access": "", "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"}, "en": {"time": "About 120 min (editorial estimate)", "distance": "", "spots": "1 stop", "station": "", "minutes": "", "access": "", "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."}, "zh-TW": {"time": "約 120 分鐘（編輯估計）", "distance": "", "spots": "1 處", "station": "", "minutes": "", "access": "", "caution": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b10-hinohara-black-tea-yamabukiya": {
      "visitorSourceId": "admission-access",
      "presentation": {
        "id": "b10-hinohara-black-tea-yamabukiya",
        "regionId": "hinohara",
        "foodCultureId": "hinohara-black-tea",
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
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b10-hinohara-black-tea-yamabukiya",
          "spotId": "b10-hinohara-black-tea-yamabukiya",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "特産物直売所やまぶき屋", "en": "Yamabukiya local products shop", "zh-TW": "Yamabukiya 特產直售店"},
          "description": {"ja": "観光協会が村の野菜や加工食品を紹介する直売所です。", "en": "The tourism association lists this outlet for village vegetables and processed foods.", "zh-TW": "觀光協會介紹的村內蔬菜與加工食品直售店。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "檜原村", "station": ""}, "en": {"region": "Hinohara Village", "station": ""}, "zh-TW": {"region": "檜原村", "station": ""}}
  },
  "sources": {
    "admission-access": {"name": "檜原村観光協会 特産物直売所やまぶき屋", "url": "https://hinohara-kankou.jp/spot/yamabuki-ya/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "s0": {"name": "檜原雅子（紅茶製茶工房）", "url": "https://hinohara-kankou.jp/spot/hinoharamasako/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "s1": {"name": "特産物直売所やまぶき屋", "url": "https://hinohara-kankou.jp/spot/yamabuki-ya/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b10 editorial itinerary: estimated timing and order, not a timetable", "url": "https://hinohara-kankou.jp/spot/hinoharamasako/", "sourceType": "manual", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "s0",
        "s1"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "s0",
        "s1"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "s0",
        "s1"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "s0",
        "s1"
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
    "spots.b10-hinohara-black-tea-yamabukiya": {
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
    }
  }
};
