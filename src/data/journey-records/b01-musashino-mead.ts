import type { JourneyRecord } from '../journey-record';

export const b01MusashinoMeadRecord: JourneyRecord = {
  "municipalityId": "musashino",
  "journey": {
    "id": "b01-musashino-mead",
    "regionId": "musashino",
    "foodCultureId": "musashino-mead",
    "storyId": "b01-musashino-mead",
    "routeId": "b01-musashino-mead-route",
    "copy": {"ja":{"title":"吉祥寺の蜂蜜酒を知る","subtitle":"吉祥寺の蜂蜜酒を知る","description":"蜂蜜から生まれる酒を、地域の認定品から読む。","tags":["武蔵野市"],"storyTitle":"吉祥寺の蜂蜜酒を知る","intro":["蜂蜜から生まれる酒を、地域の認定品から読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Discover Kichijoji mead","subtitle":"Discover Kichijoji mead","description":"Read about honey-based drinks through the local endorsed-products catalogue.","tags":["Musashino"],"storyTitle":"Discover Kichijoji mead","intro":["Read about honey-based drinks through the local endorsed-products catalogue.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"認識吉祥寺蜂蜜酒","subtitle":"認識吉祥寺蜂蜜酒","description":"透過地方認定品目錄認識蜂蜜釀酒。","tags":["武藏野市"],"storyTitle":"認識吉祥寺蜂蜜酒","intro":["透過地方認定品目錄認識蜂蜜釀酒。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"吉祥寺蜂蜜ミードプロジェクト","body":"むさしのプレミアムは吉祥寺蜂蜜ミードプロジェクトの蜂蜜酒を掲載し、井の頭公園の日本蜜蜂にも触れています。"}],"en":[{"number":"01.","title":"Kichijoji Honey Mead Project","body":"Musashino Premium lists the Kichijoji Honey Mead Project and links its story with Japanese honeybees in Inokashira Park."}],"zh-TW":[{"number":"01.","title":"吉祥寺蜂蜜ミードプロジェクト","body":"武藏野 Premium 列有吉祥寺蜂蜜 Mead 計畫的蜂蜜酒，並提及井之頭公園的日本蜜蜂。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b01-musashino-mead-miuraya"}
        ]
      }
    ]
  },
  "routeName": {"ja":"吉祥寺の蜂蜜酒を知る","en":"Discover Kichijoji mead","zh-TW":"認識吉祥寺蜂蜜酒"},
  "location": {"ja":{"area":"武蔵野市","station":"","access":""},"en":{"area":"Musashino","station":"","access":""},"zh-TW":{"area":"武藏野市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b01-musashino-mead-miuraya",
          "description": {"ja":"むさしのプレミアムの蜂蜜酒の紹介に、販売店として掲載されています。","en":"Musashino Premium’s mead entry lists this shop.","zh-TW":"武藏野 Premium 的蜂蜜酒介紹列此處為店家。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約90分（編集目安）","distance":"","spots":"1か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stops","station":"","minutes":"90","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-musashino-mead-miuraya": {
      "presentation": {
        "id": "b01-musashino-mead-miuraya",
        "regionId": "musashino",
        "foodCultureId": "musashino-mead",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"三浦屋 コピス吉祥寺店","lead":"むさしのプレミアムの蜂蜜酒の紹介に、販売店として掲載されています。","description":"むさしのプレミアムの蜂蜜酒の紹介に、販売店として掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Miuraya coppice Kichijoji","lead":"Musashino Premium’s mead entry lists this shop.","description":"Musashino Premium’s mead entry lists this shop.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"三浦屋 coppice 吉祥寺店","lead":"武藏野 Premium 的蜂蜜酒介紹列此處為店家。","description":"武藏野 Premium 的蜂蜜酒介紹列此處為店家。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"むさしのプレミアムの蜂蜜酒の紹介に、販売店として掲載されています。","en":"Musashino Premium’s mead entry lists this shop.","zh-TW":"武藏野 Premium 的蜂蜜酒介紹列此處為店家。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://musashino-premium.com/standard/","en":"https://musashino-premium.com/standard/","zh-TW":"https://musashino-premium.com/standard/"}
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
      "officialSource": {"name":"Musashino Premium — 認定商品","url":"https://musashino-premium.com/standard/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-musashino-mead-miuraya",
          "spotId": "b01-musashino-mead-miuraya",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"三浦屋 コピス吉祥寺店","en":"Miuraya coppice Kichijoji","zh-TW":"三浦屋 coppice 吉祥寺店"},
          "description": {"ja":"むさしのプレミアムの蜂蜜酒の紹介に、販売店として掲載されています。","en":"Musashino Premium’s mead entry lists this shop.","zh-TW":"武藏野 Premium 的蜂蜜酒介紹列此處為店家。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"武蔵野市","station":""},"en":{"region":"Musashino","station":""},"zh-TW":{"region":"武藏野市","station":""}}
  },
  "sources": {
    "source-12": {"name":"Musashino Premium — 認定商品","url":"https://musashino-premium.com/standard/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://musashino-premium.com/standard/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-12"
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
        "source-12"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-mead-miuraya.detail.description": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-mead-miuraya.presentation": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    }
  }
};
