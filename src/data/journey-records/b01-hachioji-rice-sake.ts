import type { JourneyRecord } from '../journey-record';

export const b01HachiojiRiceSakeRecord: JourneyRecord = {
  "municipalityId": "hachioji",
  "alcoholThemed": true,
  "journey": {
    "id": "b01-hachioji-rice-sake",
    "regionId": "hachioji",
    "foodCultureId": "hachioji-rice-sake",
    "storyId": "b01-hachioji-rice-sake",
    "routeId": "b01-hachioji-rice-sake-route",
    "copy": {"ja":{"title":"八王子の米と酒を結ぶ旅","subtitle":"八王子の米と酒を結ぶ旅","description":"米づくりと街の酒蔵から、地域のつながりを読む。","tags":["八王子市"],"storyTitle":"八王子の米と酒を結ぶ旅","intro":["米づくりと街の酒蔵から、地域のつながりを読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Hachioji rice and sake connections","subtitle":"Hachioji rice and sake connections","description":"Read local connections through rice cultivation and city breweries.","tags":["Hachioji"],"storyTitle":"Hachioji rice and sake connections","intro":["Read local connections through rice cultivation and city breweries.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"串起八王子稻米與日本酒","subtitle":"串起八王子稻米與日本酒","description":"透過稻作與市區酒藏認識地方連結。","tags":["八王子市"],"storyTitle":"串起八王子稻米與日本酒","intro":["透過稻作與市區酒藏認識地方連結。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"八王子産米・高月清流米","body":"市は加住地区の作物に米を挙げています。舞姫は髙尾の天狗に、八王子の契約農家による酒米と高月清流米を使うと紹介しています。"},{"number":"02.","title":"髙尾の天狗","body":"髙尾の天狗は八王子産の米を使う酒。舞姫は薬王院の貫首による題字と、2014年に始まった市民参加のはちぷろも紹介しています。"},{"number":"03.","title":"桑乃都","body":"東京都酒造組合は八王子の小澤酒造場と銘柄・桑乃都を掲載。蔵元自身のサイトも桑乃都を紹介しています。"},{"number":"04.","title":"東京八王子酒造","body":"東京八王子酒造は黒塀通りの都市型の小さな酒蔵で、地元の農家や地域の人々と酒米づくりに取り組むと紹介しています。"}],"en":[{"number":"01.","title":"Hachioji Rice and Takatsuki Seiryumai","body":"The city lists rice among Kazumi’s crops. Maihime describes Takao no Tengu as using sake rice from contracted Hachioji farmers and Takatsuki Seiryumai rice."},{"number":"02.","title":"Takao no Tengu Sake","body":"Takao no Tengu uses Hachioji-grown rice. Maihime also describes its Yakuoin temple calligraphy and the community Hachi-Project begun in 2014."},{"number":"03.","title":"Kuwa no Miyako Sake","body":"The Tokyo brewers’ association lists Hachioji’s Ozawa Shuzojo and its Kuwa no Miyako label, also presented on the producer’s own site."},{"number":"04.","title":"Tokyo Hachioji Craft Sake","body":"Tokyo Hachioji Shuzo describes an urban microbrewery on Kurobei Street and sake-rice cultivation with local farmers and community members."}],"zh-TW":[{"number":"01.","title":"八王子產米與高月清流米","body":"市府將稻米列為加住作物。舞姬介紹髙尾之天狗使用八王子契作農家的酒米與高月清流米。"},{"number":"02.","title":"髙尾之天狗","body":"髙尾之天狗使用八王子米。舞姬也介紹藥王院貫首的題字，以及 2014 年開始的市民參與 Hachi-Project。"},{"number":"03.","title":"桑乃都","body":"東京都酒造組合列有八王子的小澤酒造場與桑乃都品牌，酒藏官網也介紹桑乃都。"},{"number":"04.","title":"東京八王子酒造","body":"東京八王子酒造自述為黑塀通的小型都市酒藏，與農家及居民共同種植酒米。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b01-hachioji-rice-sake-ozawa"},
          {"spotId":"b01-hachioji-rice-sake-city-brewery"}
        ]
      }
    ]
  },
  "routeName": {"ja":"八王子の米と酒を結ぶ旅","en":"Hachioji rice and sake connections","zh-TW":"串起八王子稻米與日本酒"},
  "location": {"ja":{"area":"八王子市","station":"","access":""},"en":{"area":"Hachioji","station":"","access":""},"zh-TW":{"area":"八王子市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "八王子駅", "en": "Hachioji Station", "zh-TW": "八王子站"}, "spotId": "b01-hachioji-rice-sake-city-brewery", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b01-hachioji-rice-sake-ozawa",
          "description": {"ja":"東京都酒造組合が八王子の桑乃都の蔵元として紹介しています。","en":"The Tokyo brewers’ association identifies this Hachioji brewery with Kuwa no Miyako.","zh-TW":"東京都酒造組合將此八王子酒藏與桑乃都連結。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-hachioji-rice-sake-city-brewery",
          "description": {"ja":"黒塀通りに醸造所とショップを構えると公式サイトが紹介しています。","en":"Its official site describes a brewery and shop on Kurobei Street.","zh-TW":"官網介紹其位於黑塀通的酒藏與商店。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 120 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"120","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-hachioji-rice-sake-ozawa": {
      "presentation": {
        "id": "b01-hachioji-rice-sake-ozawa",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-rice-sake",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"小澤酒造場","lead":"東京都酒造組合が八王子の桑乃都の蔵元として紹介しています。","description":"東京都酒造組合が八王子の桑乃都の蔵元として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Ozawa Shuzojo","lead":"The Tokyo brewers’ association identifies this Hachioji brewery with Kuwa no Miyako.","description":"The Tokyo brewers’ association identifies this Hachioji brewery with Kuwa no Miyako.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"小澤酒造場","lead":"東京都酒造組合將此八王子酒藏與桑乃都連結。","description":"東京都酒造組合將此八王子酒藏與桑乃都連結。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"東京都酒造組合が八王子の桑乃都の蔵元として紹介しています。","en":"The Tokyo brewers’ association identifies this Hachioji brewery with Kuwa no Miyako.","zh-TW":"東京都酒造組合將此八王子酒藏與桑乃都連結。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.tokyosake.or.jp/brewery/","en":"https://www.tokyosake.or.jp/brewery/","zh-TW":"https://www.tokyosake.or.jp/brewery/"}
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
      "officialSource": {"name":"Tokyo Sake Brewers Association — 蔵元一覧","url":"https://www.tokyosake.or.jp/brewery/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-hachioji-rice-sake-city-brewery": {
      "presentation": {
        "id": "b01-hachioji-rice-sake-city-brewery",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-rice-sake",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"東京八王子酒造","lead":"黒塀通りに醸造所とショップを構えると公式サイトが紹介しています。","description":"黒塀通りに醸造所とショップを構えると公式サイトが紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Tokyo Hachioji Shuzo","lead":"Its official site describes a brewery and shop on Kurobei Street.","description":"Its official site describes a brewery and shop on Kurobei Street.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"東京八王子酒造","lead":"官網介紹其位於黑塀通的酒藏與商店。","description":"官網介紹其位於黑塀通的酒藏與商店。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"黒塀通りに醸造所とショップを構えると公式サイトが紹介しています。","en":"Its official site describes a brewery and shop on Kurobei Street.","zh-TW":"官網介紹其位於黑塀通的酒藏與商店。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.tokyo-hachioji-shuzo.jp/","en":"https://www.tokyo-hachioji-shuzo.jp/","zh-TW":"https://www.tokyo-hachioji-shuzo.jp/"}
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
      "officialSource": {"name":"Tokyo Hachioji Shuzo — 東京八王子酒造","url":"https://www.tokyo-hachioji-shuzo.jp/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-hachioji-rice-sake-ozawa",
          "spotId": "b01-hachioji-rice-sake-ozawa",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"小澤酒造場","en":"Ozawa Shuzojo","zh-TW":"小澤酒造場"},
          "description": {"ja":"東京都酒造組合が八王子の桑乃都の蔵元として紹介しています。","en":"The Tokyo brewers’ association identifies this Hachioji brewery with Kuwa no Miyako.","zh-TW":"東京都酒造組合將此八王子酒藏與桑乃都連結。"}
        },
        {
          "referenceId": "b01-hachioji-rice-sake-city-brewery",
          "spotId": "b01-hachioji-rice-sake-city-brewery",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"東京八王子酒造","en":"Tokyo Hachioji Shuzo","zh-TW":"東京八王子酒造"},
          "description": {"ja":"黒塀通りに醸造所とショップを構えると公式サイトが紹介しています。","en":"Its official site describes a brewery and shop on Kurobei Street.","zh-TW":"官網介紹其位於黑塀通的酒藏與商店。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八王子市","station":""},"en":{"region":"Hachioji","station":""},"zh-TW":{"region":"八王子市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Tokyo Hachioji Shuzo – brewery and shop", "url": "https://www.tokyo-hachioji-shuzo.jp/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-9": {"name":"Maihime — 髙尾の天狗","url":"https://maihime.co.jp/products/takao/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-27": {"name":"Hachioji City — 八王子産の農作物","url":"https://www.city.hachioji.tokyo.jp/hachioji-kids/004/005/p020557.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-41": {"name":"Ozawa Shuzōjō — 小澤酒造場","url":"https://www.kuwanomiyako.jp/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-46": {"name":"Tokyo Hachioji Shuzo — 東京八王子酒造","url":"https://www.tokyo-hachioji-shuzo.jp/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-50": {"name":"Tokyo Sake Brewers Association — 蔵元一覧","url":"https://www.tokyosake.or.jp/brewery/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://maihime.co.jp/products/takao/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-9",
        "source-27",
        "source-41",
        "source-46",
        "source-50"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-9",
        "source-27",
        "source-41",
        "source-46",
        "source-50"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-9",
        "source-27",
        "source-41",
        "source-46",
        "source-50"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-9",
        "source-27",
        "source-41",
        "source-46",
        "source-50"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-27",
        "source-9"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-27",
        "source-9"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-27",
        "source-9"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-9"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-9"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-9"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-41",
        "source-50"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-41",
        "source-50"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-41",
        "source-50"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.3": {
      "sourceIds": [
        "source-46"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.3": {
      "sourceIds": [
        "source-46"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.3": {
      "sourceIds": [
        "source-46"
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
        "source-50",
        "source-46"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-50",
        "source-46"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-rice-sake-ozawa.detail.description": {
      "sourceIds": [
        "source-50"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-rice-sake-ozawa.presentation": {
      "sourceIds": [
        "source-50"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-50"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-50"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-rice-sake-city-brewery.detail.description": {
      "sourceIds": [
        "source-46"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-rice-sake-city-brewery.presentation": {
      "sourceIds": [
        "source-46"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-46"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-46"
      ],
      "origin": "editorial"
    }
  }
};
