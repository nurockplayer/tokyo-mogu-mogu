import type { JourneyRecord } from '../journey-record';

export const b01HachiojiNapolitanRecord: JourneyRecord = {
  "municipalityId": "hachioji",
  "journey": {
    "id": "b01-hachioji-napolitan",
    "regionId": "hachioji",
    "foodCultureId": "hachioji-napolitan",
    "storyId": "b01-hachioji-napolitan",
    "routeId": "b01-hachioji-napolitan-route",
    "copy": {"ja":{"title":"八王子ナポリタンの玉ねぎをたどる","subtitle":"八王子ナポリタンの玉ねぎをたどる","description":"刻み玉ねぎと地元食材がつなぐ街のスパゲティ。","tags":["八王子市"],"storyTitle":"八王子ナポリタンの玉ねぎをたどる","intro":["刻み玉ねぎと地元食材がつなぐ街のスパゲティ。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"The onion in Hachioji Napolitan","subtitle":"The onion in Hachioji Napolitan","description":"A local spaghetti style linked by chopped onion and Hachioji ingredients.","tags":["Hachioji"],"storyTitle":"The onion in Hachioji Napolitan","intro":["A local spaghetti style linked by chopped onion and Hachioji ingredients.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"認識八王子拿坡里義大利麵的洋蔥","subtitle":"認識八王子拿坡里義大利麵的洋蔥","description":"以切碎洋蔥與八王子食材連結地方的義大利麵。","tags":["八王子市"],"storyTitle":"認識八王子拿坡里義大利麵的洋蔥","intro":["以切碎洋蔥與八王子食材連結地方的義大利麵。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"八王子ナポリタン","body":"市の食文化資料は八王子ナポリタンを新しい名物として紹介。市の紹介は、刻み玉ねぎと八王子産食材を使うスタイルと説明しています。"}],"en":[{"number":"01.","title":"Hachioji Napolitan","body":"The municipal food-history survey introduces Hachioji Napolitan as a newer specialty. The city’s introduction describes chopped onion and Hachioji-grown ingredients as its features."}],"zh-TW":[{"number":"01.","title":"八王子拿坡里義大利麵","body":"市府飲食文化資料介紹八王子拿坡里義大利麵為較新的名物；市府介紹說明其使用切碎洋蔥與八王子食材。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b01-hachioji-napolitan-rocco"}
        ]
      }
    ]
  },
  "routeName": {"ja":"八王子ナポリタンの玉ねぎをたどる","en":"The onion in Hachioji Napolitan","zh-TW":"認識八王子拿坡里義大利麵的洋蔥"},
  "location": {"ja":{"area":"八王子市","station":"","access":""},"en":{"area":"Hachioji","station":"","access":""},"zh-TW":{"area":"八王子市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "八王子駅", "en": "Hachiōji Station", "zh-TW": "八王子站"}, "spotId": "b01-hachioji-napolitan-rocco", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b01-hachioji-napolitan-rocco",
          "description": {"ja":"八王子経済新聞は、子安町3のKitchen ROCCOを八王子ナポリタン提供店として紹介しています。","en":"Hachioji Keizai Shimbun identifies Kitchen ROCCO in Koyasumachi 3 as a Hachioji Napolitan venue.","zh-TW":"八王子經濟新聞介紹子安町三丁目的 Kitchen ROCCO 為八王子拿坡里義大利麵店家。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stops","station":"","minutes":"90","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-hachioji-napolitan-rocco": {
      "visitorSourceId": "admission-access",
      "presentation": {
        "id": "b01-hachioji-napolitan-rocco",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-napolitan",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"Kitchen ROCCO","lead":"八王子経済新聞は、子安町3のKitchen ROCCOを八王子ナポリタン提供店として紹介しています。","description":"八王子経済新聞は、子安町3のKitchen ROCCOを八王子ナポリタン提供店として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Kitchen ROCCO","lead":"Hachioji Keizai Shimbun identifies Kitchen ROCCO in Koyasumachi 3 as a Hachioji Napolitan venue.","description":"Hachioji Keizai Shimbun identifies Kitchen ROCCO in Koyasumachi 3 as a Hachioji Napolitan venue.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"Kitchen ROCCO","lead":"八王子經濟新聞介紹子安町三丁目的 Kitchen ROCCO 為八王子拿坡里義大利麵店家。","description":"八王子經濟新聞介紹子安町三丁目的 Kitchen ROCCO 為八王子拿坡里義大利麵店家。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"八王子経済新聞は、子安町3のKitchen ROCCOを八王子ナポリタン提供店として紹介しています。","en":"Hachioji Keizai Shimbun identifies Kitchen ROCCO in Koyasumachi 3 as a Hachioji Napolitan venue.","zh-TW":"八王子經濟新聞介紹子安町三丁目的 Kitchen ROCCO 為八王子拿坡里義大利麵店家。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://hachioji.keizai.biz/index.php/headline/4352/","en":"https://hachioji.keizai.biz/index.php/headline/4352/","zh-TW":"https://hachioji.keizai.biz/index.php/headline/4352/"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      }
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-hachioji-napolitan-rocco",
          "spotId": "b01-hachioji-napolitan-rocco",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"Kitchen ROCCO","en":"Kitchen ROCCO","zh-TW":"Kitchen ROCCO"},
          "description": {"ja":"八王子経済新聞は、子安町3のKitchen ROCCOを八王子ナポリタン提供店として紹介しています。","en":"Hachioji Keizai Shimbun identifies Kitchen ROCCO in Koyasumachi 3 as a Hachioji Napolitan venue.","zh-TW":"八王子經濟新聞介紹子安町三丁目的 Kitchen ROCCO 為八王子拿坡里義大利麵店家。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八王子市","station":""},"en":{"region":"Hachioji","station":""},"zh-TW":{"region":"八王子市","station":""}}
  },
  "sources": {
    "admission-story": {"name": "Hachioji City: Hachioji Napolitan and Kitchen Rocco", "url": "https://www.city.hachioji.tokyo.jp/shisei/003/005/cp-movie.html", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "admission-access": {"name": "Kitchen Rocco official visitor page", "url": "https://kitchenrocco.owst.jp/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-7": {"name":"Hachioji Keizai Shimbun — 「八王子ナポリタン」をカプセルトイ化、期間限定販売　法政大生と協働","url":"https://hachioji.keizai.biz/index.php/headline/4352/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-28": {"name":"Hachioji City — 第3章 食をめぐる現状","url":"https://www.city.hachioji.tokyo.jp/kurashi/hoken/007/az003/p002723_d/fil/3-2.pdf","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://hachioji.keizai.biz/index.php/headline/4352/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "admission-story",
        "source-28"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-7",
        "source-28"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-7",
        "source-28"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "admission-story",
        "source-28"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-28",
        "admission-story"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-28",
        "admission-story"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-28",
        "admission-story"
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
        "source-7"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-7"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-napolitan-rocco.detail.description": {
      "sourceIds": [
        "source-7"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-napolitan-rocco.presentation": {
      "sourceIds": [
        "source-7"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "admission-story"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-7"
      ],
      "origin": "editorial"
    }
  }
};
