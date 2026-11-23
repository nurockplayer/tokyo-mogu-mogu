import type { JourneyRecord } from '../journey-record';

export const b01HachiojiRamenRecord: JourneyRecord = {
  "municipalityId": "hachioji",
  "journey": {
    "id": "b01-hachioji-ramen",
    "regionId": "hachioji",
    "foodCultureId": "hachioji-ramen",
    "storyId": "b01-hachioji-ramen",
    "routeId": "b01-hachioji-ramen-route",
    "copy": {"ja":{"title":"刻み玉ねぎの八王子ラーメン","subtitle":"刻み玉ねぎの八王子ラーメン","description":"八麺会の記録を入口に、ご当地の一杯を知る。","tags":["八王子市"],"storyTitle":"刻み玉ねぎの八王子ラーメン","intro":["八麺会の記録を入口に、ご当地の一杯を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Hachioji ramen and chopped onion","subtitle":"Hachioji ramen and chopped onion","description":"Discover the local style through Hachimenkai’s account.","tags":["Hachioji"],"storyTitle":"Hachioji ramen and chopped onion","intro":["Discover the local style through Hachimenkai’s account.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"八王子拉麵與切碎洋蔥","subtitle":"八王子拉麵與切碎洋蔥","description":"從八麵會的記述認識在地拉麵。","tags":["八王子市"],"storyTitle":"八王子拉麵與切碎洋蔥","intro":["從八麵會的記述認識在地拉麵。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"八王子ラーメン","body":"八麺会の定義は醤油だれ、表面のラード、刻み玉ねぎ。歴史紹介は1959年に始まった専門店へと、その起源をたどっています。"}],"en":[{"number":"01.","title":"Hachioji Ramen","body":"Hachimenkai defines the style by soy-based seasoning, a lard-covered surface and chopped onion, tracing its origins to a specialist shop opened in 1959."}],"zh-TW":[{"number":"01.","title":"八王子拉麵","body":"八麵會以醬油醬汁、覆於湯面的豬油及切碎洋蔥定義此風格，並將起源追溯至 1959 年開設的專門店。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b01-hachioji-ramen-takiyama-ramen"}
        ]
      }
    ]
  },
  "routeName": {"ja":"刻み玉ねぎの八王子ラーメン","en":"Hachioji ramen and chopped onion","zh-TW":"八王子拉麵與切碎洋蔥"},
  "location": {"ja":{"area":"八王子市","station":"","access":""},"en":{"area":"Hachioji","station":"","access":""},"zh-TW":{"area":"八王子市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b01-hachioji-ramen-takiyama-ramen",
          "description": {"ja":"観光協会の道の駅ページは、関連グルメの八王子ラーメン欄に菜食庵を掲載しています。","en":"The tourism association’s roadside-station page lists Saishokuan under Hachioji ramen in its related dining section.","zh-TW":"觀光協會的道之驛頁面，在相關美食的八王子拉麵分類中列有菜食庵。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stops","station":"","minutes":"90","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-hachioji-ramen-takiyama-ramen": {
      "presentation": {
        "id": "b01-hachioji-ramen-takiyama-ramen",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-ramen",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"道の駅八王子滝山 菜食庵","lead":"観光協会の道の駅ページは、関連グルメの八王子ラーメン欄に菜食庵を掲載しています。","description":"観光協会の道の駅ページは、関連グルメの八王子ラーメン欄に菜食庵を掲載しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Takiyama roadside station: Saishokuan","lead":"The tourism association’s roadside-station page lists Saishokuan under Hachioji ramen in its related dining section.","description":"The tourism association’s roadside-station page lists Saishokuan under Hachioji ramen in its related dining section.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"八王子滝山道之驛 菜食庵","lead":"觀光協會的道之驛頁面，在相關美食的八王子拉麵分類中列有菜食庵。","description":"觀光協會的道之驛頁面，在相關美食的八王子拉麵分類中列有菜食庵。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会の道の駅ページは、関連グルメの八王子ラーメン欄に菜食庵を掲載しています。","en":"The tourism association’s roadside-station page lists Saishokuan under Hachioji ramen in its related dining section.","zh-TW":"觀光協會的道之驛頁面，在相關美食的八王子拉麵分類中列有菜食庵。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://hkc.or.jp/facility/detail.php?id=142","en":"https://hkc.or.jp/facility/detail.php?id=142","zh-TW":"https://hkc.or.jp/facility/detail.php?id=142"}
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
      "officialSource": {"name":"Hachioji Tourism and Convention Association — 道の駅八王子滝山","url":"https://hkc.or.jp/facility/detail.php?id=142","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-hachioji-ramen-takiyama-ramen",
          "spotId": "b01-hachioji-ramen-takiyama-ramen",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"道の駅八王子滝山 菜食庵","en":"Takiyama roadside station: Saishokuan","zh-TW":"八王子滝山道之驛 菜食庵"},
          "description": {"ja":"観光協会の道の駅ページは、関連グルメの八王子ラーメン欄に菜食庵を掲載しています。","en":"The tourism association’s roadside-station page lists Saishokuan under Hachioji ramen in its related dining section.","zh-TW":"觀光協會的道之驛頁面，在相關美食的八王子拉麵分類中列有菜食庵。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八王子市","station":""},"en":{"region":"Hachioji","station":""},"zh-TW":{"region":"八王子市","station":""}}
  },
  "sources": {
    "source-2": {"name":"Hachimenkai — 八麺会","url":"https://hachimen.org/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-3": {"name":"Hachimenkai — 八王子ラーメンとは","url":"https://hachimen.org/about/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-8": {"name":"Hachioji Tourism and Convention Association — 道の駅八王子滝山","url":"https://hkc.or.jp/facility/detail.php?id=142","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://hachimen.org/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-2",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-2",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-2",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-2",
        "source-3",
        "source-8"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-2",
        "source-3"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-2",
        "source-3"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-2",
        "source-3"
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
        "source-8"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-ramen-takiyama-ramen.detail.description": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-ramen-takiyama-ramen.presentation": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-8"
      ],
      "origin": "editorial"
    }
  }
};
