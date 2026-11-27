import type { JourneyRecord } from '../journey-record';

export const b01TachikawaEggsRecord: JourneyRecord = {
  "municipalityId": "tachikawa",
  "journey": {
    "id": "b01-tachikawa-eggs",
    "regionId": "tachikawa",
    "foodCultureId": "tachikawa-eggs",
    "storyId": "b01-tachikawa-eggs",
    "routeId": "b01-tachikawa-eggs-route",
    "copy": {"ja":{"title":"立川の卵と菓子のつながり","subtitle":"立川の卵と菓子のつながり","description":"伊藤養鶏場の卵から、街のプリンへ。","tags":["立川市"],"storyTitle":"立川の卵と菓子のつながり","intro":["伊藤養鶏場の卵から、街のプリンへ。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Tachikawa eggs and confectionery","subtitle":"Tachikawa eggs and confectionery","description":"From Ito Poultry Farm’s eggs to a city pudding.","tags":["Tachikawa"],"storyTitle":"Tachikawa eggs and confectionery","intro":["From Ito Poultry Farm’s eggs to a city pudding.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"立川雞蛋與糕點的連結","subtitle":"立川雞蛋與糕點的連結","description":"從伊藤養雞場的雞蛋走向市區布丁。","tags":["立川市"],"storyTitle":"立川雞蛋與糕點的連結","intro":["從伊藤養雞場的雞蛋走向市區布丁。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"たまごころ","body":"観光協会は「たまごころ」を、伊藤養鶏場がもみじという鶏から生産する卵として紹介しています。"},{"number":"02.","title":"叶烏プレミアム 東京うこっけい卵","body":"同協会は、伊藤養鶏場が育てる東京うこっけいと、配合飼料に工夫する叶烏プレミアムの卵を紹介しています。"},{"number":"03.","title":"立川卵プリン","body":"立川卵プリンは、伊藤養鶏場のもみじの卵「たまごころ」を使う菓子だと観光協会は説明しています。"}],"en":[{"number":"01.","title":"Tamagokoro Local Eggs","body":"The tourism association describes Tamagokoro as eggs from Momiji chickens raised by Ito Poultry Farm in Tachikawa."},{"number":"02.","title":"Kanau Premium Tokyo Silkie Eggs","body":"The association also describes Ito’s Tokyo silkie chickens and Kanau Premium eggs produced with a specially blended feed."},{"number":"03.","title":"Tachikawa Egg Pudding","body":"The tourism association describes Tachikawa Egg Pudding as made with Ito’s Tamagokoro eggs from Momiji chickens."}],"zh-TW":[{"number":"01.","title":"Tamagokoro 雞蛋","body":"觀光協會介紹 Tamagokoro 為立川伊藤養雞場飼養的 Momiji 雞所產雞蛋。"},{"number":"02.","title":"叶烏 Premium 東京烏骨雞蛋","body":"觀光協會也介紹伊藤養雞場飼養的東京烏骨雞，以及採用特調飼料的叶烏 Premium 雞蛋。"},{"number":"03.","title":"立川雞蛋布丁","body":"觀光協會介紹立川雞蛋布丁使用伊藤養雞場 Momiji 雞的 Tamagokoro 雞蛋。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b01-tachikawa-eggs-ito"},
          {"spotId":"b01-tachikawa-eggs-nikko-eggs"}
        ]
      }
    ]
  },
  "routeName": {"ja":"立川の卵と菓子のつながり","en":"Tachikawa eggs and confectionery","zh-TW":"立川雞蛋與糕點的連結"},
  "location": {"ja":{"area":"立川市","station":"","access":""},"en":{"area":"Tachikawa","station":"","access":""},"zh-TW":{"area":"立川市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "立川駅", "en": "Tachikawa Station", "zh-TW": "立川站"}, "spotId": "b01-tachikawa-eggs-nikko-eggs", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b01-tachikawa-eggs-ito",
          "description": {"ja":"観光協会の東京うこっけい卵の案内に掲載される生産者・販売店です。","en":"The tourism association’s Tokyo silkie-egg guide identifies this producer and shop.","zh-TW":"觀光協會東京烏骨雞蛋介紹所列的生產者與店家。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-tachikawa-eggs-nikko-eggs",
          "description": {"ja":"観光協会が立川卵プリンの店として紹介しています。","en":"The tourism association identifies the hotel with Tachikawa Egg Pudding.","zh-TW":"觀光協會介紹此飯店與立川雞蛋布丁的關係。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 120 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"120","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-tachikawa-eggs-ito": {
      "presentation": {
        "id": "b01-tachikawa-eggs-ito",
        "regionId": "tachikawa",
        "foodCultureId": "tachikawa-eggs",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"伊藤養鶏場","lead":"観光協会の東京うこっけい卵の案内に掲載される生産者・販売店です。","description":"観光協会の東京うこっけい卵の案内に掲載される生産者・販売店です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Ito Poultry Farm","lead":"The tourism association’s Tokyo silkie-egg guide identifies this producer and shop.","description":"The tourism association’s Tokyo silkie-egg guide identifies this producer and shop.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"伊藤養雞場","lead":"觀光協會東京烏骨雞蛋介紹所列的生產者與店家。","description":"觀光協會東京烏骨雞蛋介紹所列的生產者與店家。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会の東京うこっけい卵の案内に掲載される生産者・販売店です。","en":"The tourism association’s Tokyo silkie-egg guide identifies this producer and shop.","zh-TW":"觀光協會東京烏骨雞蛋介紹所列的生產者與店家。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://tokyo-tachikawa.org/tourism/tourism-4265/","en":"https://tokyo-tachikawa.org/tourism/tourism-4265/","zh-TW":"https://tokyo-tachikawa.org/tourism/tourism-4265/"}
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
      "officialSource": {"name":"Tachikawa Tourism and Convention Association — 叶烏プレミアム 東京うこっけい卵","url":"https://tokyo-tachikawa.org/tourism/tourism-4265/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-tachikawa-eggs-nikko-eggs": {
      "presentation": {
        "id": "b01-tachikawa-eggs-nikko-eggs",
        "regionId": "tachikawa",
        "foodCultureId": "tachikawa-eggs",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"ホテル日航立川 東京","lead":"観光協会が立川卵プリンの店として紹介しています。","description":"観光協会が立川卵プリンの店として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Hotel Nikko Tachikawa Tokyo","lead":"The tourism association identifies the hotel with Tachikawa Egg Pudding.","description":"The tourism association identifies the hotel with Tachikawa Egg Pudding.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"立川日航飯店 東京","lead":"觀光協會介紹此飯店與立川雞蛋布丁的關係。","description":"觀光協會介紹此飯店與立川雞蛋布丁的關係。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会が立川卵プリンの店として紹介しています。","en":"The tourism association identifies the hotel with Tachikawa Egg Pudding.","zh-TW":"觀光協會介紹此飯店與立川雞蛋布丁的關係。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://tokyo-tachikawa.org/tourism/tourism-4247/","en":"https://tokyo-tachikawa.org/tourism/tourism-4247/","zh-TW":"https://tokyo-tachikawa.org/tourism/tourism-4247/"}
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
      "officialSource": {"name":"Tachikawa Tourism and Convention Association — 立川卵プリン","url":"https://tokyo-tachikawa.org/tourism/tourism-4247/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-tachikawa-eggs-ito",
          "spotId": "b01-tachikawa-eggs-ito",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"伊藤養鶏場","en":"Ito Poultry Farm","zh-TW":"伊藤養雞場"},
          "description": {"ja":"観光協会の東京うこっけい卵の案内に掲載される生産者・販売店です。","en":"The tourism association’s Tokyo silkie-egg guide identifies this producer and shop.","zh-TW":"觀光協會東京烏骨雞蛋介紹所列的生產者與店家。"}
        },
        {
          "referenceId": "b01-tachikawa-eggs-nikko-eggs",
          "spotId": "b01-tachikawa-eggs-nikko-eggs",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"ホテル日航立川 東京","en":"Hotel Nikko Tachikawa Tokyo","zh-TW":"立川日航飯店 東京"},
          "description": {"ja":"観光協会が立川卵プリンの店として紹介しています。","en":"The tourism association identifies the hotel with Tachikawa Egg Pudding.","zh-TW":"觀光協會介紹此飯店與立川雞蛋布丁的關係。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"立川市","station":""},"en":{"region":"Tachikawa","station":""},"zh-TW":{"region":"立川市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Hotel Nikko Tachikawa Tokyo – access", "url": "https://hotelnikko-tachikawatokyo.jp/access/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-21": {"name":"Tachikawa Tourism and Convention Association — 立川卵プリン","url":"https://tokyo-tachikawa.org/tourism/tourism-4247/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-22": {"name":"Tachikawa Tourism and Convention Association — 叶烏プレミアム 東京うこっけい卵","url":"https://tokyo-tachikawa.org/tourism/tourism-4265/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://tokyo-tachikawa.org/tourism/tourism-4247/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-21",
        "source-22"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-21",
        "source-22"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-21",
        "source-22"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-21",
        "source-22"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-21"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-21"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-21"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-22"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-22"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-22"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-21"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-21"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-21"
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
        "source-22",
        "source-21"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-22",
        "source-21"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-eggs-ito.detail.description": {
      "sourceIds": [
        "source-22"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-eggs-ito.presentation": {
      "sourceIds": [
        "source-22"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-22"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-22"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-eggs-nikko-eggs.detail.description": {
      "sourceIds": [
        "source-21"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-eggs-nikko-eggs.presentation": {
      "sourceIds": [
        "source-21"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-21"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-21"
      ],
      "origin": "editorial"
    }
  }
};
