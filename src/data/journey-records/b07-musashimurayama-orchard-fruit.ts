import type { JourneyRecord } from '../journey-record';

export const b07MusashimurayamaOrchardFruitRecord: JourneyRecord = {
  "municipalityId": "musashimurayama",
  "alcoholThemed": false,
  "journey": {
    "id": "b07-musashimurayama-orchard-fruit",
    "regionId": "musashimurayama",
    "foodCultureId": "musashimurayama-orchard-fruit",
    "storyId": "b07-musashimurayama-orchard-fruit",
    "routeId": "b07-musashimurayama-orchard-fruit-route",
    "copy": {
      "ja": {"title":"武蔵村山の梨、ぶどう、りんご","subtitle":"武蔵村山の梨、ぶどう、りんご","description":"果樹園の直売と、季節の果物を使う冷菓をたどる。","tags":["武蔵村山市"],"storyTitle":"武蔵村山の梨、ぶどう、りんご","intro":["果樹園の直売と、季節の果物を使う冷菓をたどる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Musashimurayama pears, grapes and apples",
        "subtitle": "Musashimurayama pears, grapes and apples",
        "description": "Explore orchard direct sales and frozen desserts using seasonal local fruit.",
        "tags": ["Musashimurayama"],
        "storyTitle": "Musashimurayama pears, grapes and apples",
        "intro": ["Explore orchard direct sales and frozen desserts using seasonal local fruit.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"武藏村山梨、葡萄與蘋果","subtitle":"武藏村山梨、葡萄與蘋果","description":"認識果園直賣與運用在地當季水果的冰糕。","tags":["武藏村山市"],"storyTitle":"武藏村山梨、葡萄與蘋果","intro":["認識果園直賣與運用在地當季水果的冰糕。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"武蔵村山の梨","body":"市は豊水、幸水、新高、長十郎などの梨と、野﨑園や東京ひるま農園などの栽培農園を紹介しています。"},
        {"number":"02.","title":"武蔵村山のぶどう","body":"市のぶどう園案内は、高尾、巨峰、シャインマスカットなどの栽培と、小林農園での直売を紹介しています。"},
        {"number":"03.","title":"武蔵村山のりんご","body":"市は武蔵村山のりんご栽培を紹介し、内野園を津軽などのりんごの直売農園として掲載しています。"},
        {"number":"04.","title":"旬のカッサータ","body":"SU COFFEEの旬のカッサータは、武蔵村山産の季節の果物を使う冷菓として紹介され、市は2026年の認証を記録しています。"}
      ],
      "en": [
        {"number":"01.","title":"Musashimurayama Pears","body":"The city lists Hosui, Kosui, Niitaka and Chojuro pears and growers including Nozakien and Tokyo Hiruma Farm."},
        {"number":"02.","title":"Musashimurayama Grapes","body":"The city’s grape guide lists cultivars including Takao, Kyoho and Shine Muscat and describes direct sales at Kobayashi Farm."},
        {"number":"03.","title":"Musashimurayama Apples","body":"The city describes local apple growing and lists Uchinoen as a direct-sales grower of apples including Tsugaru."},
        {"number":"04.","title":"Seasonal Local-Fruit Cassata","body":"The city describes SU COFFEE’s seasonal cassata as a frozen dessert using Musashimurayama fruit and records its certification in 2026."}
      ],
      "zh-TW": [
        {"number":"01.","title":"武藏村山梨","body":"市府介紹豐水、幸水、新高與長十郎等梨，以及野崎園和東京 Hiruma 農園等栽培者。"},
        {"number":"02.","title":"武藏村山葡萄","body":"市府葡萄園指南列出高尾、巨峰與晴王等品種，並介紹小林農園的直賣。"},
        {"number":"03.","title":"武藏村山蘋果","body":"市府介紹武藏村山的蘋果栽培，並將內野園列為津輕等蘋果品種的直賣農園。"},
        {"number":"04.","title":"當季卡薩塔冰糕","body":"市府介紹 SU COFFEE 的當季卡薩塔冰糕，使用武藏村山水果，並記錄其於 2026 年獲得認證。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [{"spotId":"b07-musashimurayama-orchard-fruit-nozakien"},{"spotId":"b07-musashimurayama-orchard-fruit-kobayashi"},{"spotId":"b07-musashimurayama-orchard-fruit-uchinoen"},{"spotId":"b07-musashimurayama-orchard-fruit-su-coffee"}]
      }
    ]
  },
  "routeName": {"ja":"武蔵村山の梨、ぶどう、りんご","en":"Musashimurayama pears, grapes and apples","zh-TW":"武藏村山梨、葡萄與蘋果"},
  "location": {"ja":{"area":"武蔵村山市","station":"","access":""},"en":{"area":"Musashimurayama","station":"","access":""},"zh-TW":{"area":"武藏村山市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "中藤", "en": "Nakato bus stop", "zh-TW": "中藤巴士站"}, "spotId": "b07-musashimurayama-orchard-fruit-kobayashi", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b07-musashimurayama-orchard-fruit-nozakien",
          "description": {"ja":"市の梨園案内に、幸水、豊水、新高などを栽培する農園として掲載されています。","en":"The city’s pear guide lists this grower for cultivars including Kosui, Hosui and Niitaka.","zh-TW":"市府梨園指南列有此農園的幸水、豐水與新高等品種。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-musashimurayama-orchard-fruit-kobayashi",
          "description": {"ja":"市のぶどう園案内に、高尾や藤稔などのぶどうを直売する農園として掲載されています。","en":"The city’s grape guide lists this farm for direct sales of grapes including Takao and Fujiminori.","zh-TW":"市府葡萄園指南介紹此農園直賣高尾、藤稔等葡萄。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-musashimurayama-orchard-fruit-uchinoen",
          "description": {"ja":"市は学園1丁目の内野園を、津軽などのりんごを扱う農園として紹介しています。","en":"The city identifies Uchinoen in Gakuen 1-chome as a grower of apples including Tsugaru.","zh-TW":"市府將學園一丁目的內野園介紹為栽培津輕等蘋果的農園。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-musashimurayama-orchard-fruit-su-coffee",
          "description": {"ja":"市は、武蔵村山産の果物を使う旬のカッサータの作り手として紹介しています。","en":"The city lists this cafe as the maker of seasonal cassata with Musashimurayama fruit.","zh-TW":"市府將此咖啡店介紹為使用武藏村山水果製作當季卡薩塔冰糕的店家。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約120分（編集目安）","distance":"","spots":"4 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。"},
        "en": {
          "time": "About 120 min (editorial estimate)",
          "distance": "",
          "spots": "4 stops",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story."
        },
        "zh-TW": {"time":"約 120 分鐘（編輯估計）","distance":"","spots":"4 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b07-musashimurayama-orchard-fruit-nozakien": {
      "presentation": {
        "id": "b07-musashimurayama-orchard-fruit-nozakien",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"野﨑園","lead":"市の梨園案内に、幸水、豊水、新高などを栽培する農園として掲載されています。","description":"市の梨園案内に、幸水、豊水、新高などを栽培する農園として掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Nozakien",
            "lead": "The city’s pear guide lists this grower for cultivars including Kosui, Hosui and Niitaka.",
            "description": "The city’s pear guide lists this grower for cultivars including Kosui, Hosui and Niitaka.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"野崎園","lead":"市府梨園指南列有此農園的幸水、豐水與新高等品種。","description":"市府梨園指南列有此農園的幸水、豐水與新高等品種。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市の梨園案内に、幸水、豊水、新高などを栽培する農園として掲載されています。","en":"The city’s pear guide lists this grower for cultivars including Kosui, Hosui and Niitaka.","zh-TW":"市府梨園指南列有此農園的幸水、豐水與新高等品種。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {
              "ja": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005155.html",
              "en": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005155.html",
              "zh-TW": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005155.html"
            }
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"梨（なし）｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005155.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b07-musashimurayama-orchard-fruit-kobayashi": {
      "presentation": {
        "id": "b07-musashimurayama-orchard-fruit-kobayashi",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"小林農園","lead":"市のぶどう園案内に、高尾や藤稔などのぶどうを直売する農園として掲載されています。","description":"市のぶどう園案内に、高尾や藤稔などのぶどうを直売する農園として掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Kobayashi Farm",
            "lead": "The city’s grape guide lists this farm for direct sales of grapes including Takao and Fujiminori.",
            "description": "The city’s grape guide lists this farm for direct sales of grapes including Takao and Fujiminori.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"小林農園","lead":"市府葡萄園指南介紹此農園直賣高尾、藤稔等葡萄。","description":"市府葡萄園指南介紹此農園直賣高尾、藤稔等葡萄。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市のぶどう園案内に、高尾や藤稔などのぶどうを直売する農園として掲載されています。","en":"The city’s grape guide lists this farm for direct sales of grapes including Takao and Fujiminori.","zh-TW":"市府葡萄園指南介紹此農園直賣高尾、藤稔等葡萄。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {
              "ja": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005153.html",
              "en": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005153.html",
              "zh-TW": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005153.html"
            }
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"葡萄（ぶどう）｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005153.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b07-musashimurayama-orchard-fruit-uchinoen": {
      "presentation": {
        "id": "b07-musashimurayama-orchard-fruit-uchinoen",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"内野園（学園1丁目）","lead":"市は学園1丁目の内野園を、津軽などのりんごを扱う農園として紹介しています。","description":"市は学園1丁目の内野園を、津軽などのりんごを扱う農園として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Uchinoen, Gakuen 1-chome",
            "lead": "The city identifies Uchinoen in Gakuen 1-chome as a grower of apples including Tsugaru.",
            "description": "The city identifies Uchinoen in Gakuen 1-chome as a grower of apples including Tsugaru.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"內野園（學園一丁目）","lead":"市府將學園一丁目的內野園介紹為栽培津輕等蘋果的農園。","description":"市府將學園一丁目的內野園介紹為栽培津輕等蘋果的農園。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は学園1丁目の内野園を、津軽などのりんごを扱う農園として紹介しています。","en":"The city identifies Uchinoen in Gakuen 1-chome as a grower of apples including Tsugaru.","zh-TW":"市府將學園一丁目的內野園介紹為栽培津輕等蘋果的農園。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {
              "ja": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005154.html",
              "en": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005154.html",
              "zh-TW": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005154.html"
            }
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"林檎（りんご）｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005154.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b07-musashimurayama-orchard-fruit-su-coffee": {
      "presentation": {
        "id": "b07-musashimurayama-orchard-fruit-su-coffee",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"SU COFFEE","lead":"市は、武蔵村山産の果物を使う旬のカッサータの作り手として紹介しています。","description":"市は、武蔵村山産の果物を使う旬のカッサータの作り手として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "SU COFFEE",
            "lead": "The city lists this cafe as the maker of seasonal cassata with Musashimurayama fruit.",
            "description": "The city lists this cafe as the maker of seasonal cassata with Musashimurayama fruit.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"SU COFFEE","lead":"市府將此咖啡店介紹為使用武藏村山水果製作當季卡薩塔冰糕的店家。","description":"市府將此咖啡店介紹為使用武藏村山水果製作當季卡薩塔冰糕的店家。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は、武蔵村山産の果物を使う旬のカッサータの作り手として紹介しています。","en":"The city lists this cafe as the maker of seasonal cassata with Musashimurayama fruit.","zh-TW":"市府將此咖啡店介紹為使用武藏村山水果製作當季卡薩塔冰糕的店家。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","en":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","zh-TW":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b07-musashimurayama-orchard-fruit-nozakien",
          "spotId": "b07-musashimurayama-orchard-fruit-nozakien",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"野﨑園","en":"Nozakien","zh-TW":"野崎園"},
          "description": {"ja":"市の梨園案内に、幸水、豊水、新高などを栽培する農園として掲載されています。","en":"The city’s pear guide lists this grower for cultivars including Kosui, Hosui and Niitaka.","zh-TW":"市府梨園指南列有此農園的幸水、豐水與新高等品種。"}
        },
        {
          "referenceId": "b07-musashimurayama-orchard-fruit-kobayashi",
          "spotId": "b07-musashimurayama-orchard-fruit-kobayashi",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"小林農園","en":"Kobayashi Farm","zh-TW":"小林農園"},
          "description": {"ja":"市のぶどう園案内に、高尾や藤稔などのぶどうを直売する農園として掲載されています。","en":"The city’s grape guide lists this farm for direct sales of grapes including Takao and Fujiminori.","zh-TW":"市府葡萄園指南介紹此農園直賣高尾、藤稔等葡萄。"}
        },
        {
          "referenceId": "b07-musashimurayama-orchard-fruit-uchinoen",
          "spotId": "b07-musashimurayama-orchard-fruit-uchinoen",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"内野園（学園1丁目）","en":"Uchinoen, Gakuen 1-chome","zh-TW":"內野園（學園一丁目）"},
          "description": {"ja":"市は学園1丁目の内野園を、津軽などのりんごを扱う農園として紹介しています。","en":"The city identifies Uchinoen in Gakuen 1-chome as a grower of apples including Tsugaru.","zh-TW":"市府將學園一丁目的內野園介紹為栽培津輕等蘋果的農園。"}
        },
        {
          "referenceId": "b07-musashimurayama-orchard-fruit-su-coffee",
          "spotId": "b07-musashimurayama-orchard-fruit-su-coffee",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"SU COFFEE","en":"SU COFFEE","zh-TW":"SU COFFEE"},
          "description": {"ja":"市は、武蔵村山産の果物を使う旬のカッサータの作り手として紹介しています。","en":"The city lists this cafe as the maker of seasonal cassata with Musashimurayama fruit.","zh-TW":"市府將此咖啡店介紹為使用武藏村山水果製作當季卡薩塔冰糕的店家。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"武蔵村山市","station":""},"en":{"region":"Musashimurayama","station":""},"zh-TW":{"region":"武藏村山市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Kobayashi Farm access", "url": "https://kobayashifarm.tokyo/access/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-10": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-15": {"name":"葡萄（ぶどう）｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005153.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-16": {"name":"林檎（りんご）｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005154.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-17": {"name":"梨（なし）｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005155.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b07 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-10","source-15","source-16","source-17"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-10","source-15","source-16","source-17"],"origin":"editorial"},
    "location": {"sourceIds":["source-10","source-15","source-16","source-17"],"origin":"editorial"},
    "story": {"sourceIds":["source-10","source-15","source-16","source-17"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-10","source-15","source-16","source-17"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-10","source-15","source-16","source-17"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-17"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-17"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-17"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-15"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-15"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-15"],"origin":"editorial"},
    "journey.chapters.ja.2": {"sourceIds":["source-16"],"origin":"editorial"},
    "journey.chapters.en.2": {"sourceIds":["source-16"],"origin":"editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds":["source-16"],"origin":"editorial"},
    "journey.chapters.ja.3": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.3": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.3": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b07-musashimurayama-orchard-fruit-nozakien": {"sourceIds":["source-17"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-17"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-17"],"origin":"editorial"},
    "spots.b07-musashimurayama-orchard-fruit-kobayashi": {"sourceIds":["source-15"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-15"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-15"],"origin":"editorial"},
    "spots.b07-musashimurayama-orchard-fruit-uchinoen": {"sourceIds":["source-16"],"origin":"editorial"},
    "variants.half-day.steps.2.description": {"sourceIds":["source-16"],"origin":"editorial"},
    "story.groups.nearby.2": {"sourceIds":["source-16"],"origin":"editorial"},
    "spots.b07-musashimurayama-orchard-fruit-su-coffee": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.3.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.3": {"sourceIds":["source-10"],"origin":"editorial"}
  }
};
