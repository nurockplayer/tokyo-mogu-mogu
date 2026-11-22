import type { JourneyRecord } from '../journey-record';

export const b01HachiojiCraftBeerRecord: JourneyRecord = {
  "municipalityId": "hachioji",
  "journey": {
    "id": "b01-hachioji-craft-beer",
    "regionId": "hachioji",
    "foodCultureId": "hachioji-craft-beer",
    "storyId": "b01-hachioji-craft-beer",
    "routeId": "b01-hachioji-craft-beer-route",
    "copy": {"ja":{"title":"高尾の暮らしとクラフトビール","subtitle":"高尾の暮らしとクラフトビール","description":"高尾ビールとTAKAO 36 BEER、二つの造り手をたどる。","tags":["八王子市"],"storyTitle":"高尾の暮らしとクラフトビール","intro":["高尾ビールとTAKAO 36 BEER、二つの造り手をたどる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Craft beer and life around Takao","subtitle":"Craft beer and life around Takao","description":"Explore two makers: Takao Beer and TAKAO 36 BEER.","tags":["Hachioji"],"storyTitle":"Craft beer and life around Takao","intro":["Explore two makers: Takao Beer and TAKAO 36 BEER.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"高尾生活與精釀啤酒","subtitle":"高尾生活與精釀啤酒","description":"走訪高尾啤酒與 TAKAO 36 BEER 兩個釀造者。","tags":["八王子市"],"storyTitle":"高尾生活與精釀啤酒","intro":["走訪高尾啤酒與 TAKAO 36 BEER 兩個釀造者。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"高尾ビール","body":"高尾ビールは2017年にふもとの住民が始めたメーカー。公式案内はKO52の醸造所・タップルームと、下恩方の製造施設を区別しています。"},{"number":"02.","title":"TAKAO 36 BEER","body":"T.M.B.は、高尾山麓のCRAFTROCK BREWING TAKAOでTAKAO 36 BEERを造ると紹介しています。"}],"en":[{"number":"01.","title":"Takao Beer","body":"Takao Beer began with foothill residents in 2017. Its official guide distinguishes the KO52 brewery and taproom from the production facility in Shimoongata."},{"number":"02.","title":"Takao 36 Beer","body":"T.M.B. describes TAKAO 36 BEER as brewed at CRAFTROCK BREWING TAKAO at the foot of Mount Takao."}],"zh-TW":[{"number":"01.","title":"高尾ビール","body":"高尾啤酒由山麓居民於 2017 年創立。官方介紹區分 KO52 酒廠兼 Taproom 與下恩方的生產設施。"},{"number":"02.","title":"TAKAO 36 BEER","body":"T.M.B. 介紹 TAKAO 36 BEER 於高尾山麓的 CRAFTROCK BREWING TAKAO 釀造。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b01-hachioji-craft-beer-ko52"},
          {"spotId":"b01-hachioji-craft-beer-craftrock"}
        ]
      }
    ]
  },
  "routeName": {"ja":"高尾の暮らしとクラフトビール","en":"Craft beer and life around Takao","zh-TW":"高尾生活與精釀啤酒"},
  "location": {"ja":{"area":"八王子市","station":"","access":""},"en":{"area":"Hachioji","station":"","access":""},"zh-TW":{"area":"八王子市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b01-hachioji-craft-beer-ko52",
          "description": {"ja":"高尾ビールが公式に紹介するKO52 TAKAO内の醸造所とタップルームです。","en":"Takao Beer’s official guide identifies its brewery and taproom inside KO52 TAKAO.","zh-TW":"高尾啤酒官方介紹位於 KO52 TAKAO 的酒廠與 Taproom。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-hachioji-craft-beer-craftrock",
          "description": {"ja":"T.M.B.は、醸造所にCRAFTROCK TAP ROOMが併設されていると紹介しています。","en":"T.M.B. describes CRAFTROCK TAP ROOM as adjoining the brewery.","zh-TW":"T.M.B. 介紹酒廠附設 CRAFTROCK TAP ROOM。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約120分（編集目安）","distance":"","spots":"2か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 120 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"120","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-hachioji-craft-beer-ko52": {
      "presentation": {
        "id": "b01-hachioji-craft-beer-ko52",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-craft-beer",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"高尾ビール KO52ブルワリー＆タップルーム","lead":"高尾ビールが公式に紹介するKO52 TAKAO内の醸造所とタップルームです。","description":"高尾ビールが公式に紹介するKO52 TAKAO内の醸造所とタップルームです。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Takao Beer KO52 Brewery & Taproom","lead":"Takao Beer’s official guide identifies its brewery and taproom inside KO52 TAKAO.","description":"Takao Beer’s official guide identifies its brewery and taproom inside KO52 TAKAO.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"高尾啤酒 KO52 酒廠與 Taproom","lead":"高尾啤酒官方介紹位於 KO52 TAKAO 的酒廠與 Taproom。","description":"高尾啤酒官方介紹位於 KO52 TAKAO 的酒廠與 Taproom。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"高尾ビールが公式に紹介するKO52 TAKAO内の醸造所とタップルームです。","en":"Takao Beer’s official guide identifies its brewery and taproom inside KO52 TAKAO.","zh-TW":"高尾啤酒官方介紹位於 KO52 TAKAO 的酒廠與 Taproom。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.takaobeer.com/contact/","en":"https://www.takaobeer.com/contact/","zh-TW":"https://www.takaobeer.com/contact/"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"Takao Beer — Contact – TAKAO BEER","url":"https://www.takaobeer.com/contact/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-hachioji-craft-beer-craftrock": {
      "presentation": {
        "id": "b01-hachioji-craft-beer-craftrock",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-craft-beer",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"CRAFTROCK BREWING TAKAO","lead":"T.M.B.は、醸造所にCRAFTROCK TAP ROOMが併設されていると紹介しています。","description":"T.M.B.は、醸造所にCRAFTROCK TAP ROOMが併設されていると紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"CRAFTROCK BREWING TAKAO","lead":"T.M.B. describes CRAFTROCK TAP ROOM as adjoining the brewery.","description":"T.M.B. describes CRAFTROCK TAP ROOM as adjoining the brewery.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"CRAFTROCK BREWING TAKAO","lead":"T.M.B. 介紹酒廠附設 CRAFTROCK TAP ROOM。","description":"T.M.B. 介紹酒廠附設 CRAFTROCK TAP ROOM。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"T.M.B.は、醸造所にCRAFTROCK TAP ROOMが併設されていると紹介しています。","en":"T.M.B. describes CRAFTROCK TAP ROOM as adjoining the brewery.","zh-TW":"T.M.B. 介紹酒廠附設 CRAFTROCK TAP ROOM。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://t-m-b.co.jp/business/","en":"https://t-m-b.co.jp/business/","zh-TW":"https://t-m-b.co.jp/business/"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"T.M.B. — 事業案内","url":"https://t-m-b.co.jp/business/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-hachioji-craft-beer-ko52",
          "spotId": "b01-hachioji-craft-beer-ko52",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"高尾ビール KO52ブルワリー＆タップルーム","en":"Takao Beer KO52 Brewery & Taproom","zh-TW":"高尾啤酒 KO52 酒廠與 Taproom"},
          "description": {"ja":"高尾ビールが公式に紹介するKO52 TAKAO内の醸造所とタップルームです。","en":"Takao Beer’s official guide identifies its brewery and taproom inside KO52 TAKAO.","zh-TW":"高尾啤酒官方介紹位於 KO52 TAKAO 的酒廠與 Taproom。"}
        },
        {
          "referenceId": "b01-hachioji-craft-beer-craftrock",
          "spotId": "b01-hachioji-craft-beer-craftrock",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"CRAFTROCK BREWING TAKAO","en":"CRAFTROCK BREWING TAKAO","zh-TW":"CRAFTROCK BREWING TAKAO"},
          "description": {"ja":"T.M.B.は、醸造所にCRAFTROCK TAP ROOMが併設されていると紹介しています。","en":"T.M.B. describes CRAFTROCK TAP ROOM as adjoining the brewery.","zh-TW":"T.M.B. 介紹酒廠附設 CRAFTROCK TAP ROOM。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八王子市","station":""},"en":{"region":"Hachioji","station":""},"zh-TW":{"region":"八王子市","station":""}}
  },
  "sources": {
    "source-13": {"name":"T.M.B. — 事業案内","url":"https://t-m-b.co.jp/business/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-44": {"name":"Takao Beer — Contact – TAKAO BEER","url":"https://www.takaobeer.com/contact/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://t-m-b.co.jp/business/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-13",
        "source-44"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-13",
        "source-44"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-13",
        "source-44"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-13",
        "source-44"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-44"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-44"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-44"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-13"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-13"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-13"
      ],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": [
        "editorial"
      ],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": [
        "editorial",
        "source-44",
        "source-13"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-44",
        "source-13"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-craft-beer-ko52.detail.description": {
      "sourceIds": [
        "source-44"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-craft-beer-ko52.presentation": {
      "sourceIds": [
        "source-44"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-44"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-44"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-craft-beer-craftrock.detail.description": {
      "sourceIds": [
        "source-13"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-craft-beer-craftrock.presentation": {
      "sourceIds": [
        "source-13"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-13"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-13"
      ],
      "origin": "editorial"
    }
  }
};
