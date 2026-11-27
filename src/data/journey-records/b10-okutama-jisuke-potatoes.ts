import type { JourneyRecord } from '../journey-record';

export const b10OkutamaJisukePotatoesRecord: JourneyRecord = {
  "municipalityId": "okutama",
  "alcoholThemed": false,
  "journey": {
    "id": "b10-okutama-jisuke-potatoes",
    "regionId": "okutama",
    "foodCultureId": "okutama-jisuke-potatoes",
    "storyId": "b10-okutama-jisuke-potatoes",
    "routeId": "b10-okutama-jisuke-potatoes-route",
    "copy": {"ja": {"title": "奥多摩、治助イモと山のカレー", "subtitle": "奥多摩、治助イモと山のカレー", "description": "受け継ぐ芋と鹿肉の料理を知る。", "tags": ["奥多摩町"], "storyTitle": "奥多摩、治助イモと山のカレー", "intro": ["受け継ぐ芋と鹿肉の料理を知る。", "掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"title": "Okutama Jisuke potatoes and mountain curry", "subtitle": "Okutama Jisuke potatoes and mountain curry", "description": "Discover inherited potatoes and venison cooking.", "tags": ["Okutama"], "storyTitle": "Okutama Jisuke potatoes and mountain curry", "intro": ["Discover inherited potatoes and venison cooking.", "This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"title": "奧多摩治助芋與山間咖哩", "subtitle": "奧多摩治助芋與山間咖哩", "description": "認識傳承馬鈴薯與鹿肉料理。", "tags": ["奧多摩町"], "storyTitle": "奧多摩治助芋與山間咖哩", "intro": ["認識傳承馬鈴薯與鹿肉料理。", "刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.", "title": "奥多摩、治助イモと山のカレー", "body": "JA東京中央会は、明治時代に檜原村から持ち帰った種芋が峰谷で受け継がれたと治助イモを紹介しています。"}, {"number": "02.", "title": "奥多摩、治助イモと山のカレー", "body": "農林水産省は、治助芋にネギ味噌を添える料理を東京の郷土料理として紹介しています。"}, {"number": "03.", "title": "奥多摩、治助イモと山のカレー", "body": "カフェクアラは、奥多摩産のじゃがいもと鹿肉を使うカレーを紹介しています。"}, {"number": "04.", "title": "奥多摩、治助イモと山のカレー", "body": "奥多摩観光協会は、カフェクアラで治助イモのカレーを紹介しています。"}, {"number": "05.", "title": "奥多摩、治助イモと山のカレー", "body": "カフェクアラの紹介には、地元の食材として奥多摩産の鹿肉が挙げられています。"}], "en": [{"number": "01.", "title": "Okutama Jisuke potatoes and mountain curry", "body": "JA Tokyo describes Jisuke potatoes as descended from seed potatoes brought from Hinohara in the Meiji period and preserved in Mineya."}, {"number": "02.", "title": "Okutama Jisuke potatoes and mountain curry", "body": "MAFF documents Jisuke potatoes served with scallion miso as a Tokyo regional dish."}, {"number": "03.", "title": "Okutama Jisuke potatoes and mountain curry", "body": "Café Kuala describes curry made with Okutama potatoes and venison."}, {"number": "04.", "title": "Okutama Jisuke potatoes and mountain curry", "body": "The Okutama Tourism Association describes Jisuke-potato curry at Café Kuala."}, {"number": "05.", "title": "Okutama Jisuke potatoes and mountain curry", "body": "Café Kuala names Okutama venison among the local ingredients in its cooking."}], "zh-TW": [{"number": "01.", "title": "奧多摩治助芋與山間咖哩", "body": "JA 東京中央會介紹治助芋源於明治時代從檜原村帶回的種薯，並在峰谷傳承。"}, {"number": "02.", "title": "奧多摩治助芋與山間咖哩", "body": "農林水產省將搭配蔥味噌的治助芋列為東京鄉土料理。"}, {"number": "03.", "title": "奧多摩治助芋與山間咖哩", "body": "Café Kuala 介紹使用奧多摩馬鈴薯與鹿肉製作的咖哩。"}, {"number": "04.", "title": "奧多摩治助芋與山間咖哩", "body": "奧多摩觀光協會介紹 Café Kuala 的治助芋咖哩。"}, {"number": "05.", "title": "奧多摩治助芋與山間咖哩", "body": "Café Kuala 的介紹將奧多摩鹿肉列為料理使用的當地食材。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId": "b10-okutama-jisuke-potatoes-kuala"}
        ]
      }
    ]
  },
  "routeName": {"ja": "奥多摩、治助イモと山のカレー", "en": "Okutama Jisuke potatoes and mountain curry", "zh-TW": "奧多摩治助芋與山間咖哩"},
  "location": {"ja": {"area": "奥多摩町", "station": "", "access": ""}, "en": {"area": "Okutama", "station": "", "access": ""}, "zh-TW": {"area": "奧多摩町", "station": "", "access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "奥多摩駅", "en": "Okutama Station", "zh-TW": "奧多摩站"}, "spotId": "b10-okutama-jisuke-potatoes-kuala", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b10-okutama-jisuke-potatoes-kuala",
          "description": {"ja": "観光協会は治助イモのカレーを、店のサイトは奥多摩産のじゃがいもと鹿肉のカレーを紹介しています。", "en": "The tourism association describes Jisuke-potato curry here; the café describes curry with Okutama potatoes and venison.", "zh-TW": "觀光協會介紹這裡的治助芋咖哩，店家則介紹使用奧多摩馬鈴薯與鹿肉的咖哩。"},
          "note": {"ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。", "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.", "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}
        }
      ],
      "stats": {"ja": {"time": "約120分（編集目安）", "distance": "", "spots": "1 か所", "station": "", "minutes": "", "access": "", "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"}, "en": {"time": "About 120 min (editorial estimate)", "distance": "", "spots": "1 stop", "station": "", "minutes": "", "access": "", "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."}, "zh-TW": {"time": "約 120 分鐘（編輯估計）", "distance": "", "spots": "1 處", "station": "", "minutes": "", "access": "", "caution": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b10-okutama-jisuke-potatoes-kuala": {
      "visitorSourceId": "admission-access",
      "presentation": {
        "id": "b10-okutama-jisuke-potatoes-kuala",
        "regionId": "okutama",
        "foodCultureId": "okutama-jisuke-potatoes",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "カフェクアラ", "lead": "観光協会は治助イモのカレーを、店のサイトは奥多摩産のじゃがいもと鹿肉のカレーを紹介しています。", "description": "観光協会は治助イモのカレーを、店のサイトは奥多摩産のじゃがいもと鹿肉のカレーを紹介しています。", "tags": [], "practicalInfo": [{"label": "確認状態", "value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}], "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"name": "Café Kuala", "lead": "The tourism association describes Jisuke-potato curry here; the café describes curry with Okutama potatoes and venison.", "description": "The tourism association describes Jisuke-potato curry here; the café describes curry with Okutama potatoes and venison.", "tags": [], "practicalInfo": [{"label": "Verification", "value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}], "caution": ["This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"name": "Café Kuala", "lead": "觀光協會介紹這裡的治助芋咖哩，店家則介紹使用奧多摩馬鈴薯與鹿肉的咖哩。", "description": "觀光協會介紹這裡的治助芋咖哩，店家則介紹使用奧多摩馬鈴薯與鹿肉的咖哩。", "tags": [], "practicalInfo": [{"label": "確認狀態", "value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}], "caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "観光協会は治助イモのカレーを、店のサイトは奥多摩産のじゃがいもと鹿肉のカレーを紹介しています。", "en": "The tourism association describes Jisuke-potato curry here; the café describes curry with Okutama potatoes and venison.", "zh-TW": "觀光協會介紹這裡的治助芋咖哩，店家則介紹使用奧多摩馬鈴薯與鹿肉的咖哩。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報", "en": "Source information", "zh-TW": "出處資訊"},
            "value": {"ja": "https://www.okutama.gr.jp/site/shopping/", "en": "https://www.okutama.gr.jp/site/shopping/", "zh-TW": "https://www.okutama.gr.jp/site/shopping/"}
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
      "officialSource": {"name": "奥多摩のショップリスト", "url": "https://www.okutama.gr.jp/site/shopping/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b10-okutama-jisuke-potatoes-kuala",
          "spotId": "b10-okutama-jisuke-potatoes-kuala",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "カフェクアラ", "en": "Café Kuala", "zh-TW": "Café Kuala"},
          "description": {"ja": "観光協会は治助イモのカレーを、店のサイトは奥多摩産のじゃがいもと鹿肉のカレーを紹介しています。", "en": "The tourism association describes Jisuke-potato curry here; the café describes curry with Okutama potatoes and venison.", "zh-TW": "觀光協會介紹這裡的治助芋咖哩，店家則介紹使用奧多摩馬鈴薯與鹿肉的咖哩。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "奥多摩町", "station": ""}, "en": {"region": "Okutama", "station": ""}, "zh-TW": {"region": "奧多摩町", "station": ""}}
  },
  "sources": {
    "admission-access": {"name": "森のカフェ クアラ アクセス", "url": "https://www.cafekuala.jp/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "s0": {"name": "治助イモ（ジャガイモ）：江戸東京野菜について", "url": "https://www.tokyo-ja.or.jp/farm/edo/56.php", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "s1": {"name": "治助芋のネギ味噌：東京都の郷土料理", "url": "https://www.maff.go.jp/j/keikaku/syokubunka/k_ryouri/search_menu/menu/34_14_tokyo.html", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "s2": {"name": "奥多摩 森のカフェ クアラ", "url": "https://www.cafekuala.jp/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "s3": {"name": "奥多摩のショップリスト", "url": "https://www.okutama.gr.jp/site/shopping/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b10 editorial itinerary: estimated timing and order, not a timetable", "url": "https://www.tokyo-ja.or.jp/farm/edo/56.php", "sourceType": "manual", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
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
        "s2"
      ],
      "origin": "source"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "s2"
      ],
      "origin": "source"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "s2"
      ],
      "origin": "source"
    },
    "journey.chapters.ja.3": {
      "sourceIds": [
        "s3"
      ],
      "origin": "source"
    },
    "journey.chapters.en.3": {
      "sourceIds": [
        "s3"
      ],
      "origin": "source"
    },
    "journey.chapters.zh-TW.3": {
      "sourceIds": [
        "s3"
      ],
      "origin": "source"
    },
    "journey.chapters.ja.4": {
      "sourceIds": [
        "s2"
      ],
      "origin": "source"
    },
    "journey.chapters.en.4": {
      "sourceIds": [
        "s2"
      ],
      "origin": "source"
    },
    "journey.chapters.zh-TW.4": {
      "sourceIds": [
        "s2"
      ],
      "origin": "source"
    },
    "spots.b10-okutama-jisuke-potatoes-kuala": {
      "sourceIds": [
        "s3",
        "s2"
      ],
      "origin": "source"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "s3",
        "s2"
      ],
      "origin": "source"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "s3",
        "s2"
      ],
      "origin": "source"
    }
  }
};
