import type { JourneyRecord } from '../journey-record';

export const b01TachikawaCraftBeerRecord: JourneyRecord = {
  "municipalityId": "tachikawa",
  "journey": {
    "id": "b01-tachikawa-craft-beer",
    "regionId": "tachikawa",
    "foodCultureId": "tachikawa-craft-beer",
    "storyId": "b01-tachikawa-craft-beer",
    "routeId": "b01-tachikawa-craft-beer-route",
    "copy": {"ja":{"title":"立川のクラフトビールを訪ねる","subtitle":"立川のクラフトビールを訪ねる","description":"立飛とSAKAMICHI、二つの醸造所をつなぐ。","tags":["立川市"],"storyTitle":"立川のクラフトビールを訪ねる","intro":["立飛とSAKAMICHI、二つの醸造所をつなぐ。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Explore Tachikawa craft beer","subtitle":"Explore Tachikawa craft beer","description":"Connect Tachihi and Sakamichi, two local breweries.","tags":["Tachikawa"],"storyTitle":"Explore Tachikawa craft beer","intro":["Connect Tachihi and Sakamichi, two local breweries.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"走訪立川精釀啤酒","subtitle":"走訪立川精釀啤酒","description":"串起立飛與 Sakamichi 兩間在地酒廠。","tags":["立川市"],"storyTitle":"走訪立川精釀啤酒","intro":["串起立飛與 Sakamichi 兩間在地酒廠。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"立飛麦酒醸造所","body":"観光協会は、立川飛行場跡地に2021年に開設された立飛麦酒醸造所と、併設のタップルームを紹介しています。"},{"number":"02.","title":"SAKAMICHI BREWING","body":"SAKAMICHI BREWINGは、タップルームも兼ねる立川産クラフトビールの醸造所として観光協会に紹介されています。"}],"en":[{"number":"01.","title":"Tachihi Brewery","body":"The tourism association describes Tachihi Brewery as opened on the former Tachikawa airfield site in 2021, with an adjoining taproom."},{"number":"02.","title":"Sakamichi Brewing","body":"The tourism association presents Sakamichi Brewing as a Tachikawa craft brewery with an on-site taproom."}],"zh-TW":[{"number":"01.","title":"立飛麥酒釀造所","body":"觀光協會介紹立飛麥酒釀造所於 2021 年設立於立川飛行場舊址，並附設 Taproom。"},{"number":"02.","title":"Sakamichi Brewing","body":"觀光協會介紹 Sakamichi Brewing 為附設 Taproom 的立川精釀酒廠。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b01-tachikawa-craft-beer-tachihi"},
          {"spotId":"b01-tachikawa-craft-beer-sakamichi"}
        ]
      }
    ]
  },
  "routeName": {"ja":"立川のクラフトビールを訪ねる","en":"Explore Tachikawa craft beer","zh-TW":"走訪立川精釀啤酒"},
  "location": {"ja":{"area":"立川市","station":"","access":""},"en":{"area":"Tachikawa","station":"","access":""},"zh-TW":{"area":"立川市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b01-tachikawa-craft-beer-tachihi",
          "description": {"ja":"観光協会は、タンクを眺められるタップルームを備えた醸造所として紹介しています。","en":"The tourism association describes a brewery taproom with a view of the tanks.","zh-TW":"觀光協會介紹酒廠附設可看見釀造槽的 Taproom。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-tachikawa-craft-beer-sakamichi",
          "description": {"ja":"観光協会の案内にある、柴崎町の醸造所・タップルームです。","en":"The tourism guide identifies a brewery and taproom in Shibasakicho.","zh-TW":"觀光協會介紹位於柴崎町的酒廠兼 Taproom。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約120分（編集目安）","distance":"","spots":"2か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 120 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"120","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-tachikawa-craft-beer-tachihi": {
      "presentation": {
        "id": "b01-tachikawa-craft-beer-tachihi",
        "regionId": "tachikawa",
        "foodCultureId": "tachikawa-craft-beer",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"立飛麦酒醸造所","lead":"観光協会は、タンクを眺められるタップルームを備えた醸造所として紹介しています。","description":"観光協会は、タンクを眺められるタップルームを備えた醸造所として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Tachihi Brewery","lead":"The tourism association describes a brewery taproom with a view of the tanks.","description":"The tourism association describes a brewery taproom with a view of the tanks.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"立飛麥酒釀造所","lead":"觀光協會介紹酒廠附設可看見釀造槽的 Taproom。","description":"觀光協會介紹酒廠附設可看見釀造槽的 Taproom。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会は、タンクを眺められるタップルームを備えた醸造所として紹介しています。","en":"The tourism association describes a brewery taproom with a view of the tanks.","zh-TW":"觀光協會介紹酒廠附設可看見釀造槽的 Taproom。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://tokyo-tachikawa.org/walking-spot/walking-spot-11573","en":"https://tokyo-tachikawa.org/walking-spot/walking-spot-11573","zh-TW":"https://tokyo-tachikawa.org/walking-spot/walking-spot-11573"}
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
      "officialSource": {"name":"Tachikawa Tourism and Convention Association — 立飛麦酒醸造所","url":"https://tokyo-tachikawa.org/walking-spot/walking-spot-11573","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-tachikawa-craft-beer-sakamichi": {
      "presentation": {
        "id": "b01-tachikawa-craft-beer-sakamichi",
        "regionId": "tachikawa",
        "foodCultureId": "tachikawa-craft-beer",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"SAKAMICHI BREWING","lead":"観光協会の案内にある、柴崎町の醸造所・タップルームです。","description":"観光協会の案内にある、柴崎町の醸造所・タップルームです。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Sakamichi Brewing","lead":"The tourism guide identifies a brewery and taproom in Shibasakicho.","description":"The tourism guide identifies a brewery and taproom in Shibasakicho.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"Sakamichi Brewing","lead":"觀光協會介紹位於柴崎町的酒廠兼 Taproom。","description":"觀光協會介紹位於柴崎町的酒廠兼 Taproom。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会の案内にある、柴崎町の醸造所・タップルームです。","en":"The tourism guide identifies a brewery and taproom in Shibasakicho.","zh-TW":"觀光協會介紹位於柴崎町的酒廠兼 Taproom。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://tokyo-tachikawa.org/spot/8442/","en":"https://tokyo-tachikawa.org/spot/8442/","zh-TW":"https://tokyo-tachikawa.org/spot/8442/"}
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
      "officialSource": {"name":"Tachikawa Tourism and Convention Association — SAKAMICHI BREWING","url":"https://tokyo-tachikawa.org/spot/8442/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-tachikawa-craft-beer-tachihi",
          "spotId": "b01-tachikawa-craft-beer-tachihi",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"立飛麦酒醸造所","en":"Tachihi Brewery","zh-TW":"立飛麥酒釀造所"},
          "description": {"ja":"観光協会は、タンクを眺められるタップルームを備えた醸造所として紹介しています。","en":"The tourism association describes a brewery taproom with a view of the tanks.","zh-TW":"觀光協會介紹酒廠附設可看見釀造槽的 Taproom。"}
        },
        {
          "referenceId": "b01-tachikawa-craft-beer-sakamichi",
          "spotId": "b01-tachikawa-craft-beer-sakamichi",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"SAKAMICHI BREWING","en":"Sakamichi Brewing","zh-TW":"Sakamichi Brewing"},
          "description": {"ja":"観光協会の案内にある、柴崎町の醸造所・タップルームです。","en":"The tourism guide identifies a brewery and taproom in Shibasakicho.","zh-TW":"觀光協會介紹位於柴崎町的酒廠兼 Taproom。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"立川市","station":""},"en":{"region":"Tachikawa","station":""},"zh-TW":{"region":"立川市","station":""}}
  },
  "sources": {
    "source-16": {"name":"Tachikawa Tourism and Convention Association — SAKAMICHI BREWING","url":"https://tokyo-tachikawa.org/spot/8442/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-24": {"name":"Tachikawa Tourism and Convention Association — 立飛麦酒醸造所","url":"https://tokyo-tachikawa.org/walking-spot/walking-spot-11573","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://tokyo-tachikawa.org/spot/8442/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-16",
        "source-24"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-24"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-24"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-24"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-16"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-16"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-16"
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
        "source-24",
        "source-16"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-24",
        "source-16"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-craft-beer-tachihi.detail.description": {
      "sourceIds": [
        "source-24"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-craft-beer-tachihi.presentation": {
      "sourceIds": [
        "source-24"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-24"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-24"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-craft-beer-sakamichi.detail.description": {
      "sourceIds": [
        "source-16"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-craft-beer-sakamichi.presentation": {
      "sourceIds": [
        "source-16"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-16"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-16"
      ],
      "origin": "editorial"
    }
  }
};
