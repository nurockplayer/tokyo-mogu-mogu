import type { JourneyRecord } from '../journey-record';

export const b01HachiojiPassionFruitRecord: JourneyRecord = {
  "municipalityId": "hachioji",
  "journey": {
    "id": "b01-hachioji-passion-fruit",
    "regionId": "hachioji",
    "foodCultureId": "hachioji-passion-fruit",
    "storyId": "b01-hachioji-passion-fruit",
    "routeId": "b01-hachioji-passion-fruit-route",
    "copy": {"ja":{"title":"八王子パッションフルーツの広がり","subtitle":"八王子パッションフルーツの広がり","description":"生産者から飲み物や菓子へ。果実がつなぐ八王子をたどる。","tags":["八王子市"],"storyTitle":"八王子パッションフルーツの広がり","intro":["生産者から飲み物や菓子へ。果実がつなぐ八王子をたどる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Hachioji’s passion-fruit connections","subtitle":"Hachioji’s passion-fruit connections","description":"Follow the fruit from Hachioji growers into drinks and confectionery.","tags":["Hachioji"],"storyTitle":"Hachioji’s passion-fruit connections","intro":["Follow the fruit from Hachioji growers into drinks and confectionery.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"八王子百香果的在地連結","subtitle":"八王子百香果的在地連結","description":"從八王子果農走向飲品與糕點，認識百香果的延伸。","tags":["八王子市"],"storyTitle":"八王子百香果的在地連結","intro":["從八王子果農走向飲品與糕點，認識百香果的延伸。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"八王子パッションフルーツ","body":"市内の若手農業後継者が2013年に生産組合を設立。市の紹介は、飲食店や和洋菓子店と組む商品開発も伝えています。"},{"number":"02.","title":"八王子パッションフルーツ加工品","body":"生産組合の加工品紹介には、果汁入り飲料、プレミアムジャム、ワインがあります。"},{"number":"03.","title":"八王子パッションフルーツどら焼き・洋菓子","body":"どらやき万叶のマンゴーと合わせたどら焼き、メゾンドゥースなどの洋菓子も、生産組合が紹介する果実の使い道です。"}],"en":[{"number":"01.","title":"Hachioji Passion Fruit","body":"Young successors to local farms formed the growers’ association in 2013. The city also describes product development with restaurants and confectioners."},{"number":"02.","title":"Hachioji Passion-Fruit Drinks, Jam, and Wine","body":"The growers’ product guide includes a juice drink, premium jam and passion-fruit wine."},{"number":"03.","title":"Hachioji Passion-Fruit Dorayaki and Pastries","body":"The growers also introduce Manyo’s passion-fruit-and-mango dorayaki and pastries from confectioners including Maison Douce."}],"zh-TW":[{"number":"01.","title":"八王子百香果","body":"當地年輕農業接班人於 2013 年成立生產組合，市府也介紹其與餐飲店及和洋菓子店合作開發產品。"},{"number":"02.","title":"八王子百香果飲品、果醬與酒","body":"生產組合的加工品介紹包括果汁飲品、頂級果醬與百香果酒。"},{"number":"03.","title":"八王子百香果銅鑼燒與西式糕點","body":"生產組合也介紹萬叶的百香果芒果銅鑼燒，以及 Maison Douce 等店製作的西式糕點。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b01-hachioji-passion-fruit-fureai"},
          {"spotId":"b01-hachioji-passion-fruit-garden-center"}
        ]
      }
    ]
  },
  "routeName": {"ja":"八王子パッションフルーツの広がり","en":"Hachioji’s passion-fruit connections","zh-TW":"八王子百香果的在地連結"},
  "location": {"ja":{"area":"八王子市","station":"","access":""},"en":{"area":"Hachioji","station":"","access":""},"zh-TW":{"area":"八王子市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "下犬目", "en": "Shimo-Inume bus stop", "zh-TW": "下犬目公車站"}, "spotId": "b01-hachioji-passion-fruit-garden-center", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b01-hachioji-passion-fruit-fureai",
          "description": {"ja":"生産組合の販売所案内に、果実や飲料、ジャム、ワイン、洋菓子の関連先として掲載されています。","en":"The growers’ directory links this market with the fruit, drinks, jam, wine and pastries.","zh-TW":"生產組合的銷售地點介紹，將此市場與鮮果、飲品、果醬、酒及糕點連結。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-hachioji-passion-fruit-garden-center",
          "description": {"ja":"生産組合が果実、飲料、ジャム、ワインの関連先として紹介する施設です。","en":"The growers introduce this center in connection with the fruit, drinks, jam and wine.","zh-TW":"生產組合介紹此中心與鮮果、飲品、果醬及酒的關係。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 120 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"120","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-hachioji-passion-fruit-fureai": {
      "presentation": {
        "id": "b01-hachioji-passion-fruit-fureai",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-passion-fruit",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"JA八王子 ふれあい市場","lead":"生産組合の販売所案内に、果実や飲料、ジャム、ワイン、洋菓子の関連先として掲載されています。","description":"生産組合の販売所案内に、果実や飲料、ジャム、ワイン、洋菓子の関連先として掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"JA Hachioji Fureai Market","lead":"The growers’ directory links this market with the fruit, drinks, jam, wine and pastries.","description":"The growers’ directory links this market with the fruit, drinks, jam, wine and pastries.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"JA 八王子 Fureai 市場","lead":"生產組合的銷售地點介紹，將此市場與鮮果、飲品、果醬、酒及糕點連結。","description":"生產組合的銷售地點介紹，將此市場與鮮果、飲品、果醬、酒及糕點連結。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"生産組合の販売所案内に、果実や飲料、ジャム、ワイン、洋菓子の関連先として掲載されています。","en":"The growers’ directory links this market with the fruit, drinks, jam, wine and pastries.","zh-TW":"生產組合的銷售地點介紹，將此市場與鮮果、飲品、果醬、酒及糕點連結。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://hachioji-passion.tokyo/shop/","en":"https://hachioji-passion.tokyo/shop/","zh-TW":"https://hachioji-passion.tokyo/shop/"}
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
      "officialSource": {"name":"hachioji-passion.tokyo","url":"https://hachioji-passion.tokyo/shop/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-hachioji-passion-fruit-garden-center": {
      "presentation": {
        "id": "b01-hachioji-passion-fruit-garden-center",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-passion-fruit",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"JA八王子 園芸センター","lead":"生産組合が果実、飲料、ジャム、ワインの関連先として紹介する施設です。","description":"生産組合が果実、飲料、ジャム、ワインの関連先として紹介する施設です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"JA Hachioji Gardening Center","lead":"The growers introduce this center in connection with the fruit, drinks, jam and wine.","description":"The growers introduce this center in connection with the fruit, drinks, jam and wine.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"JA 八王子園藝中心","lead":"生產組合介紹此中心與鮮果、飲品、果醬及酒的關係。","description":"生產組合介紹此中心與鮮果、飲品、果醬及酒的關係。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"生産組合が果実、飲料、ジャム、ワインの関連先として紹介する施設です。","en":"The growers introduce this center in connection with the fruit, drinks, jam and wine.","zh-TW":"生產組合介紹此中心與鮮果、飲品、果醬及酒的關係。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://hachioji-passion.tokyo/shop/","en":"https://hachioji-passion.tokyo/shop/","zh-TW":"https://hachioji-passion.tokyo/shop/"}
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
      "officialSource": {"name":"hachioji-passion.tokyo","url":"https://hachioji-passion.tokyo/shop/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-hachioji-passion-fruit-fureai",
          "spotId": "b01-hachioji-passion-fruit-fureai",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"JA八王子 ふれあい市場","en":"JA Hachioji Fureai Market","zh-TW":"JA 八王子 Fureai 市場"},
          "description": {"ja":"生産組合の販売所案内に、果実や飲料、ジャム、ワイン、洋菓子の関連先として掲載されています。","en":"The growers’ directory links this market with the fruit, drinks, jam, wine and pastries.","zh-TW":"生產組合的銷售地點介紹，將此市場與鮮果、飲品、果醬、酒及糕點連結。"}
        },
        {
          "referenceId": "b01-hachioji-passion-fruit-garden-center",
          "spotId": "b01-hachioji-passion-fruit-garden-center",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"JA八王子 園芸センター","en":"JA Hachioji Gardening Center","zh-TW":"JA 八王子園藝中心"},
          "description": {"ja":"生産組合が果実、飲料、ジャム、ワインの関連先として紹介する施設です。","en":"The growers introduce this center in connection with the fruit, drinks, jam and wine.","zh-TW":"生產組合介紹此中心與鮮果、飲品、果醬及酒的關係。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八王子市","station":""},"en":{"region":"Hachioji","station":""},"zh-TW":{"region":"八王子市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "JA Hachioji – Garden Center", "url": "https://ja-hachioji.or.jp/store/engei/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-5": {"name":"Hachioji Passion Fruit Growers Association — 加工品のご紹介","url":"https://hachioji-passion.tokyo/kakouhin/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-6": {"name":"hachioji-passion.tokyo","url":"https://hachioji-passion.tokyo/shop/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-30": {"name":"Hachioji City — 八王子パッションフルーツ","url":"https://www.city.hachioji.tokyo.jp/kurashi/sangyo/004/001/001/p024147.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://hachioji-passion.tokyo/kakouhin/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-5",
        "source-6",
        "source-30"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-5",
        "source-6",
        "source-30"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-5",
        "source-6",
        "source-30"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-5",
        "source-6",
        "source-30"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-30"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-30"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-30"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-5"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-5"
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
        "source-6",
        "source-6"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-6",
        "source-6"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-passion-fruit-fureai.detail.description": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-passion-fruit-fureai.presentation": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-passion-fruit-garden-center.detail.description": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-passion-fruit-garden-center.presentation": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-6"
      ],
      "origin": "editorial"
    }
  }
};
