import type { JourneyRecord } from '../journey-record';

export const b01HachiojiTakaoSobaRecord: JourneyRecord = {
  "municipalityId": "hachioji",
  "journey": {
    "id": "b01-hachioji-takao-soba",
    "regionId": "hachioji",
    "foodCultureId": "hachioji-takao-soba",
    "storyId": "b01-hachioji-takao-soba",
    "routeId": "b01-hachioji-takao-soba-route",
    "copy": {"ja":{"title":"高尾山のとろろそばを訪ねる","subtitle":"高尾山のとろろそばを訪ねる","description":"参道の蕎麦店から、山の名物を知る。","tags":["八王子市"],"storyTitle":"高尾山のとろろそばを訪ねる","intro":["参道の蕎麦店から、山の名物を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Mount Takao’s tororo soba","subtitle":"Mount Takao’s tororo soba","description":"Meet a mountain specialty through its soba shops.","tags":["Hachioji"],"storyTitle":"Mount Takao’s tororo soba","intro":["Meet a mountain specialty through its soba shops.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"走訪高尾山山藥泥蕎麥麵","subtitle":"走訪高尾山山藥泥蕎麥麵","description":"從參道蕎麥麵店認識山中名物。","tags":["八王子市"],"storyTitle":"走訪高尾山山藥泥蕎麥麵","intro":["從參道蕎麥麵店認識山中名物。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"高尾山のとろろそば","body":"東京都はとろろそばを登山者の栄養補給にもなる高尾山の名物として紹介。観光協会は紅葉屋本店と髙橋家を、とろろそばの店として掲載しています。"}],"en":[{"number":"01.","title":"Mount Takao Tororo Soba","body":"Tokyo’s guide describes tororo soba as a Mount Takao specialty associated with nourishment for walkers. The tourism association lists Momijiya Honten and Takahashiya as tororo soba businesses."}],"zh-TW":[{"number":"01.","title":"高尾山山藥泥蕎麥麵","body":"東京都介紹山藥泥蕎麥麵為高尾山名物，也與登山者補充營養相連；觀光協會列有紅葉屋本店與髙橋家。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b01-hachioji-takao-soba-momijiya"},
          {"spotId":"b01-hachioji-takao-soba-takahashiya"}
        ]
      }
    ]
  },
  "routeName": {"ja":"高尾山のとろろそばを訪ねる","en":"Mount Takao’s tororo soba","zh-TW":"走訪高尾山山藥泥蕎麥麵"},
  "location": {"ja":{"area":"八王子市","station":"","access":""},"en":{"area":"Hachioji","station":"","access":""},"zh-TW":{"area":"八王子市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b01-hachioji-takao-soba-momijiya",
          "description": {"ja":"観光協会は、古くからとろろそばを看板にしてきた店と紹介しています。","en":"The tourism association describes a shop long associated with tororo soba.","zh-TW":"觀光協會介紹此店長年以山藥泥蕎麥麵為招牌。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-hachioji-takao-soba-takahashiya",
          "description": {"ja":"観光協会は、大和芋と長芋を合わせるとろろの蕎麦店として紹介しています。","en":"The tourism association describes its soba with a grated-yam blend of yamatoimo and nagaimo.","zh-TW":"觀光協會介紹其使用大和芋與長芋調製山藥泥的蕎麥麵。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 120 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"120","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-hachioji-takao-soba-momijiya": {
      "presentation": {
        "id": "b01-hachioji-takao-soba-momijiya",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-takao-soba",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"紅葉屋本店","lead":"観光協会は、古くからとろろそばを看板にしてきた店と紹介しています。","description":"観光協会は、古くからとろろそばを看板にしてきた店と紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Momijiya Honten","lead":"The tourism association describes a shop long associated with tororo soba.","description":"The tourism association describes a shop long associated with tororo soba.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"紅葉屋本店","lead":"觀光協會介紹此店長年以山藥泥蕎麥麵為招牌。","description":"觀光協會介紹此店長年以山藥泥蕎麥麵為招牌。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会は、古くからとろろそばを看板にしてきた店と紹介しています。","en":"The tourism association describes a shop long associated with tororo soba.","zh-TW":"觀光協會介紹此店長年以山藥泥蕎麥麵為招牌。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.hkc.or.jp/takaosan/feature.php","en":"https://www.hkc.or.jp/takaosan/feature.php","zh-TW":"https://www.hkc.or.jp/takaosan/feature.php"}
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
      "officialSource": {"name":"Hachioji Tourism and Convention Association — 高尾山の見どころ","url":"https://www.hkc.or.jp/takaosan/feature.php","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-hachioji-takao-soba-takahashiya": {
      "presentation": {
        "id": "b01-hachioji-takao-soba-takahashiya",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-takao-soba",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"髙橋家","lead":"観光協会は、大和芋と長芋を合わせるとろろの蕎麦店として紹介しています。","description":"観光協会は、大和芋と長芋を合わせるとろろの蕎麦店として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Takahashiya","lead":"The tourism association describes its soba with a grated-yam blend of yamatoimo and nagaimo.","description":"The tourism association describes its soba with a grated-yam blend of yamatoimo and nagaimo.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"髙橋家","lead":"觀光協會介紹其使用大和芋與長芋調製山藥泥的蕎麥麵。","description":"觀光協會介紹其使用大和芋與長芋調製山藥泥的蕎麥麵。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会は、大和芋と長芋を合わせるとろろの蕎麦店として紹介しています。","en":"The tourism association describes its soba with a grated-yam blend of yamatoimo and nagaimo.","zh-TW":"觀光協會介紹其使用大和芋與長芋調製山藥泥的蕎麥麵。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.hkc.or.jp/takaosan/feature.php","en":"https://www.hkc.or.jp/takaosan/feature.php","zh-TW":"https://www.hkc.or.jp/takaosan/feature.php"}
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
      "officialSource": {"name":"Hachioji Tourism and Convention Association — 高尾山の見どころ","url":"https://www.hkc.or.jp/takaosan/feature.php","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-hachioji-takao-soba-momijiya",
          "spotId": "b01-hachioji-takao-soba-momijiya",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"紅葉屋本店","en":"Momijiya Honten","zh-TW":"紅葉屋本店"},
          "description": {"ja":"観光協会は、古くからとろろそばを看板にしてきた店と紹介しています。","en":"The tourism association describes a shop long associated with tororo soba.","zh-TW":"觀光協會介紹此店長年以山藥泥蕎麥麵為招牌。"}
        },
        {
          "referenceId": "b01-hachioji-takao-soba-takahashiya",
          "spotId": "b01-hachioji-takao-soba-takahashiya",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"髙橋家","en":"Takahashiya","zh-TW":"髙橋家"},
          "description": {"ja":"観光協会は、大和芋と長芋を合わせるとろろの蕎麦店として紹介しています。","en":"The tourism association describes its soba with a grated-yam blend of yamatoimo and nagaimo.","zh-TW":"觀光協會介紹其使用大和芋與長芋調製山藥泥的蕎麥麵。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八王子市","station":""},"en":{"region":"Hachioji","station":""},"zh-TW":{"region":"八王子市","station":""}}
  },
  "sources": {
    "source-36": {"name":"Hachioji Tourism and Convention Association — 高尾山の見どころ","url":"https://www.hkc.or.jp/takaosan/feature.php","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-39": {"name":"Tokyo Metropolitan Government Bureau of Environment — 明治の森高尾の観光","url":"https://www.kankyo1.metro.tokyo.lg.jp/naturepark/know/park/introduction/toritu/meiji/tourism.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.hkc.or.jp/takaosan/feature.php","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-36",
        "source-39"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-36",
        "source-39"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-36",
        "source-39"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-36",
        "source-39"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-36",
        "source-39"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-36",
        "source-39"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-36",
        "source-39"
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
        "source-36",
        "source-36"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-36",
        "source-36"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-takao-soba-momijiya.detail.description": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-takao-soba-momijiya.presentation": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-takao-soba-takahashiya.detail.description": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-takao-soba-takahashiya.presentation": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-36"
      ],
      "origin": "editorial"
    }
  }
};
