import type { JourneyRecord } from '../journey-record';

export const b01MusashinoWheatUdonRecord: JourneyRecord = {
  "municipalityId": "musashino",
  "alcoholThemed": false,
  "journey": {
    "id": "b01-musashino-wheat-udon",
    "regionId": "musashino",
    "foodCultureId": "musashino-wheat-udon",
    "storyId": "b01-musashino-wheat-udon",
    "routeId": "b01-musashino-wheat-udon-route",
    "copy": {"ja":{"title":"武蔵野地粉うどんのもてなし","subtitle":"武蔵野地粉うどんのもてなし","description":"祝い事の手打ち麺から、復刻した郷土の味へ。","tags":["武蔵野市"],"storyTitle":"武蔵野地粉うどんのもてなし","intro":["祝い事の手打ち麺から、復刻した郷土の味へ。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Hospitality through Musashino wheat udon","subtitle":"Hospitality through Musashino wheat udon","description":"From hand-cut noodles for gatherings to a revived local food.","tags":["Musashino"],"storyTitle":"Hospitality through Musashino wheat udon","intro":["From hand-cut noodles for gatherings to a revived local food.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"武藏野地粉烏龍麵的待客文化","subtitle":"武藏野地粉烏龍麵的待客文化","description":"從聚會手作麵走向復興的在地滋味。","tags":["武藏野市"],"storyTitle":"武藏野地粉烏龍麵的待客文化","intro":["從聚會手作麵走向復興的在地滋味。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"武蔵野地粉うどん","body":"観光機構は、地元の小麦でうどんを打って冠婚葬祭などの客をもてなした習慣を紹介。2008年のごちそうフェスタで武蔵野地粉うどんが再び登場したと伝えています。"}],"en":[{"number":"01.","title":"Musashino Local-Wheat Udon","body":"The tourism organization recounts making local-wheat udon for wedding, funeral and other guests, and its reappearance at the 2008 Gochiso Festa."}],"zh-TW":[{"number":"01.","title":"武藏野地粉烏龍麵","body":"觀光機構記述以在地小麥手作烏龍麵招待婚喪等聚會賓客的習慣，以及 2008 年美食祭讓武藏野地粉烏龍麵再度登場。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b01-musashino-wheat-udon-shinsenkan-udon"}
        ]
      }
    ]
  },
  "routeName": {"ja":"武蔵野地粉うどんのもてなし","en":"Hospitality through Musashino wheat udon","zh-TW":"武藏野地粉烏龍麵的待客文化"},
  "location": {"ja":{"area":"武蔵野市","station":"","access":""},"en":{"area":"Musashino","station":"","access":""},"zh-TW":{"area":"武藏野市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "三鷹駅北口", "en": "Mitaka Station North Exit", "zh-TW": "三鷹站北口"}, "spotId": "b01-musashino-wheat-udon-shinsenkan-udon", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b01-musashino-wheat-udon-shinsenkan-udon",
          "description": {"ja":"観光機構の地粉うどん紹介は、冷凍うどんの販売先として新鮮館を掲載しています。","en":"The tourism organization’s udon article lists Shinsenkan in connection with the frozen noodle product.","zh-TW":"觀光機構的地粉烏龍麵文章將新鮮館列為冷凍麵產品的銷售地點。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stops","station":"","minutes":"90","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-musashino-wheat-udon-shinsenkan-udon": {
      "presentation": {
        "id": "b01-musashino-wheat-udon-shinsenkan-udon",
        "regionId": "musashino",
        "foodCultureId": "musashino-wheat-udon",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"JA東京むさし 武蔵野新鮮館","lead":"観光機構の地粉うどん紹介は、冷凍うどんの販売先として新鮮館を掲載しています。","description":"観光機構の地粉うどん紹介は、冷凍うどんの販売先として新鮮館を掲載しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"JA Tokyo Musashi Musashino Shinsenkan","lead":"The tourism organization’s udon article lists Shinsenkan in connection with the frozen noodle product.","description":"The tourism organization’s udon article lists Shinsenkan in connection with the frozen noodle product.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"JA 東京武藏 武藏野新鮮館","lead":"觀光機構的地粉烏龍麵文章將新鮮館列為冷凍麵產品的銷售地點。","description":"觀光機構的地粉烏龍麵文章將新鮮館列為冷凍麵產品的銷售地點。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光機構の地粉うどん紹介は、冷凍うどんの販売先として新鮮館を掲載しています。","en":"The tourism organization’s udon article lists Shinsenkan in connection with the frozen noodle product.","zh-TW":"觀光機構的地粉烏龍麵文章將新鮮館列為冷凍麵產品的銷售地點。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://musashino-kanko.com/udon/","en":"https://musashino-kanko.com/udon/","zh-TW":"https://musashino-kanko.com/udon/"}
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
      "officialSource": {"name":"Musashino Tourism Organization — 武蔵野地粉うどん","url":"https://musashino-kanko.com/udon/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-musashino-wheat-udon-shinsenkan-udon",
          "spotId": "b01-musashino-wheat-udon-shinsenkan-udon",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"JA東京むさし 武蔵野新鮮館","en":"JA Tokyo Musashi Musashino Shinsenkan","zh-TW":"JA 東京武藏 武藏野新鮮館"},
          "description": {"ja":"観光機構の地粉うどん紹介は、冷凍うどんの販売先として新鮮館を掲載しています。","en":"The tourism organization’s udon article lists Shinsenkan in connection with the frozen noodle product.","zh-TW":"觀光機構的地粉烏龍麵文章將新鮮館列為冷凍麵產品的銷售地點。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"武蔵野市","station":""},"en":{"region":"Musashino","station":""},"zh-TW":{"region":"武藏野市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "JA Tokyo Musashi – Musashino Shinsenkan", "url": "https://www.jatm.or.jp/economy/musashino.php", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-11": {"name":"Musashino Tourism Organization — 武蔵野地粉うどん","url":"https://musashino-kanko.com/udon/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://musashino-kanko.com/udon/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-11"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-11"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-11"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-11"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-11"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-11"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-11"
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
        "source-11"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-11"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-wheat-udon-shinsenkan-udon.detail.description": {
      "sourceIds": [
        "source-11"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-wheat-udon-shinsenkan-udon.presentation": {
      "sourceIds": [
        "source-11"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-11"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-11"
      ],
      "origin": "editorial"
    }
  }
};
