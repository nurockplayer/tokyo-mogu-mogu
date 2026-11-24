import type { JourneyRecord } from '../journey-record';

export const b10OkutamaEggsRecord: JourneyRecord = {
  "municipalityId": "okutama",
  "journey": {
    "id": "b10-okutama-eggs",
    "regionId": "okutama",
    "foodCultureId": "okutama-eggs",
    "storyId": "b10-okutama-eggs",
    "routeId": "b10-okutama-eggs-route",
    "copy": {"ja": {"title": "奥多摩、しろまるたまご", "subtitle": "奥多摩、しろまるたまご", "description": "養鶏場の直売を紹介する観光案内。", "tags": ["奥多摩町"], "storyTitle": "奥多摩、しろまるたまご", "intro": ["養鶏場の直売を紹介する観光案内。", "掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"title": "Okutama Shiromaru eggs", "subtitle": "Okutama Shiromaru eggs", "description": "Discover a farm-direct egg producer in the tourism guide.", "tags": ["Okutama"], "storyTitle": "Okutama Shiromaru eggs", "intro": ["Discover a farm-direct egg producer in the tourism guide.", "This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"title": "奧多摩白丸雞蛋", "subtitle": "奧多摩白丸雞蛋", "description": "認識觀光指南介紹的養雞場直售。", "tags": ["奧多摩町"], "storyTitle": "奧多摩白丸雞蛋", "intro": ["認識觀光指南介紹的養雞場直售。", "刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.", "title": "奥多摩、しろまるたまご", "body": "観光協会は、しろまるたまごを養鶏場直売の店として紹介し、鶏は平飼いだと説明しています。"}], "en": [{"number": "01.", "title": "Okutama Shiromaru eggs", "body": "The tourism association describes Shiromaru Tamago as a farm-direct egg producer with floor-reared hens."}], "zh-TW": [{"number": "01.", "title": "奧多摩白丸雞蛋", "body": "觀光協會介紹白丸雞蛋為養雞場直售據點，並說明採用平飼方式。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId": "b10-okutama-eggs-shiromaru"}
        ]
      }
    ]
  },
  "routeName": {"ja": "奥多摩、しろまるたまご", "en": "Okutama Shiromaru eggs", "zh-TW": "奧多摩白丸雞蛋"},
  "location": {"ja": {"area": "奥多摩町", "station": "", "access": ""}, "en": {"area": "Okutama", "station": "", "access": ""}, "zh-TW": {"area": "奧多摩町", "station": "", "access": ""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b10-okutama-eggs-shiromaru",
          "description": {"ja": "観光協会のショップ一覧に載る養鶏場直売の店です。所在地と訪問の可否は出典情報から各自ご確認ください。", "en": "A farm-direct egg outlet in the tourism association’s shop list. Check its location and visitor access through the source.", "zh-TW": "觀光協會商店名錄介紹的養雞場直售店。請透過出處自行確認地點與能否造訪。"},
          "note": {"ja": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。", "en": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described.", "zh-TW": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}
        }
      ],
      "stats": {"ja": {"time": "約90分（編集目安）", "distance": "", "spots": "1 か所", "station": "", "minutes": "90", "access": "", "caution": "時間と順序は編集上の目安です。交通と訪問の可否は各自ご確認ください。各地点が紹介した食品すべてを扱うとは限りません。"}, "en": {"time": "About 90 min (editorial estimate)", "distance": "", "spots": "1 stop", "station": "", "minutes": "90", "access": "", "caution": "Timing and order are editorial estimates. Check transport and visitor access yourself. A stop is not assumed to offer every food described."}, "zh-TW": {"time": "約 90 分鐘（編輯估計）", "distance": "", "spots": "1 處", "station": "", "minutes": "90", "access": "", "caution": "時間與順序為編輯估計。請自行確認交通與能否造訪；各據點不代表供應文中所有食品。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。", "en": "This information is unconfirmed. Check the source information before visiting.", "zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b10-okutama-eggs-shiromaru": {
      "presentation": {
        "id": "b10-okutama-eggs-shiromaru",
        "regionId": "okutama",
        "foodCultureId": "okutama-eggs",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "しろまるたまご", "lead": "観光協会のショップ一覧に載る養鶏場直売の店です。所在地と訪問の可否は出典情報から各自ご確認ください。", "description": "観光協会のショップ一覧に載る養鶏場直売の店です。所在地と訪問の可否は出典情報から各自ご確認ください。", "tags": [], "practicalInfo": [{"label": "確認状態", "value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}], "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]}, "en": {"name": "Shiromaru Tamago", "lead": "A farm-direct egg outlet in the tourism association’s shop list. Check its location and visitor access through the source.", "description": "A farm-direct egg outlet in the tourism association’s shop list. Check its location and visitor access through the source.", "tags": [], "practicalInfo": [{"label": "Verification", "value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}], "caution": ["This information is unconfirmed. Check the source information before visiting."]}, "zh-TW": {"name": "白丸雞蛋", "lead": "觀光協會商店名錄介紹的養雞場直售店。請透過出處自行確認地點與能否造訪。", "description": "觀光協會商店名錄介紹的養雞場直售店。請透過出處自行確認地點與能否造訪。", "tags": [], "practicalInfo": [{"label": "確認狀態", "value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}], "caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "観光協会のショップ一覧に載る養鶏場直売の店です。所在地と訪問の可否は出典情報から各自ご確認ください。", "en": "A farm-direct egg outlet in the tourism association’s shop list. Check its location and visitor access through the source.", "zh-TW": "觀光協會商店名錄介紹的養雞場直售店。請透過出處自行確認地點與能否造訪。"},
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
          "referenceId": "b10-okutama-eggs-shiromaru",
          "spotId": "b10-okutama-eggs-shiromaru",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "しろまるたまご", "en": "Shiromaru Tamago", "zh-TW": "白丸雞蛋"},
          "description": {"ja": "観光協会のショップ一覧に載る養鶏場直売の店です。所在地と訪問の可否は出典情報から各自ご確認ください。", "en": "A farm-direct egg outlet in the tourism association’s shop list. Check its location and visitor access through the source.", "zh-TW": "觀光協會商店名錄介紹的養雞場直售店。請透過出處自行確認地點與能否造訪。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "奥多摩町", "station": ""}, "en": {"region": "Okutama", "station": ""}, "zh-TW": {"region": "奧多摩町", "station": ""}}
  },
  "sources": {
    "s0": {"name": "奥多摩のショップリスト", "url": "https://www.okutama.gr.jp/site/shopping/", "sourceType": "official_web", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b10 editorial itinerary: estimated timing and order, not a timetable", "url": "https://www.okutama.gr.jp/site/shopping/", "sourceType": "manual", "retrievedAt": "2026-11-24", "verificationStatus": "needs_confirmation"}
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
    "spots.b10-okutama-eggs-shiromaru": {
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
