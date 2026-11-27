import type { JourneyRecord } from '../journey-record';

export const b01MusashinoUdoRecord: JourneyRecord = {
  "municipalityId": "musashino",
  "journey": {
    "id": "b01-musashino-udo",
    "regionId": "musashino",
    "foodCultureId": "musashino-udo",
    "storyId": "b01-musashino-udo",
    "routeId": "b01-musashino-udo-route",
    "copy": {"ja":{"title":"江戸から続く武蔵野うど","subtitle":"江戸から続く武蔵野うど","description":"受け継がれる野菜を、新鮮館の紹介から知る。","tags":["武蔵野市"],"storyTitle":"江戸から続く武蔵野うど","intro":["受け継がれる野菜を、新鮮館の紹介から知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Musashino udo since the Edo period","subtitle":"Musashino udo since the Edo period","description":"Meet a heritage vegetable through Shinsenkan’s catalogue entry.","tags":["Musashino"],"storyTitle":"Musashino udo since the Edo period","intro":["Meet a heritage vegetable through Shinsenkan’s catalogue entry.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"延續自江戶的武藏野獨活","subtitle":"延續自江戶的武藏野獨活","description":"透過新鮮館的介紹認識傳統蔬菜。","tags":["武藏野市"],"storyTitle":"延續自江戶的武藏野獨活","intro":["透過新鮮館的介紹認識傳統蔬菜。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"武蔵野うど","body":"むさしのプレミアムは、武蔵野うどを江戸時代後期から栽培される伝統野菜として掲載。市の紹介も、うどを地域の特産として挙げています。"}],"en":[{"number":"01.","title":"Musashino Udo","body":"Musashino Premium describes local udo as a heritage vegetable cultivated since the late Edo period. The city also identifies it as a local specialty."}],"zh-TW":[{"number":"01.","title":"武藏野獨活","body":"武藏野 Premium 介紹武藏野獨活為自江戶後期種植的傳統蔬菜，市府也將它列為特產。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b01-musashino-udo-shinsenkan-udo"}
        ]
      }
    ]
  },
  "routeName": {"ja":"江戸から続く武蔵野うど","en":"Musashino udo since the Edo period","zh-TW":"延續自江戶的武藏野獨活"},
  "location": {"ja":{"area":"武蔵野市","station":"","access":""},"en":{"area":"Musashino","station":"","access":""},"zh-TW":{"area":"武藏野市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "三鷹駅北口", "en": "Mitaka Station North Exit", "zh-TW": "三鷹站北口"}, "spotId": "b01-musashino-udo-shinsenkan-udo", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b01-musashino-udo-shinsenkan-udo",
          "description": {"ja":"むさしのプレミアムの武蔵野うどの項目に、生産・販売に関係する施設として載っています。","en":"Musashino Premium’s udo entry identifies Shinsenkan in connection with the crop.","zh-TW":"武藏野 Premium 的獨活條目介紹此設施與作物的關係。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stops","station":"","minutes":"90","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-musashino-udo-shinsenkan-udo": {
      "presentation": {
        "id": "b01-musashino-udo-shinsenkan-udo",
        "regionId": "musashino",
        "foodCultureId": "musashino-udo",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"JA東京むさし 武蔵野新鮮館","lead":"むさしのプレミアムの武蔵野うどの項目に、生産・販売に関係する施設として載っています。","description":"むさしのプレミアムの武蔵野うどの項目に、生産・販売に関係する施設として載っています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"JA Tokyo Musashi Musashino Shinsenkan","lead":"Musashino Premium’s udo entry identifies Shinsenkan in connection with the crop.","description":"Musashino Premium’s udo entry identifies Shinsenkan in connection with the crop.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"JA 東京武藏 武藏野新鮮館","lead":"武藏野 Premium 的獨活條目介紹此設施與作物的關係。","description":"武藏野 Premium 的獨活條目介紹此設施與作物的關係。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"むさしのプレミアムの武蔵野うどの項目に、生産・販売に関係する施設として載っています。","en":"Musashino Premium’s udo entry identifies Shinsenkan in connection with the crop.","zh-TW":"武藏野 Premium 的獨活條目介紹此設施與作物的關係。"},
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
          "referenceId": "b01-musashino-udo-shinsenkan-udo",
          "spotId": "b01-musashino-udo-shinsenkan-udo",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"JA東京むさし 武蔵野新鮮館","en":"JA Tokyo Musashi Musashino Shinsenkan","zh-TW":"JA 東京武藏 武藏野新鮮館"},
          "description": {"ja":"むさしのプレミアムの武蔵野うどの項目に、生産・販売に関係する施設として載っています。","en":"Musashino Premium’s udo entry identifies Shinsenkan in connection with the crop.","zh-TW":"武藏野 Premium 的獨活條目介紹此設施與作物的關係。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"武蔵野市","station":""},"en":{"region":"Musashino","station":""},"zh-TW":{"region":"武藏野市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "JA Tokyo Musashi – Musashino Shinsenkan", "url": "https://www.jatm.or.jp/economy/musashino.php", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-12": {"name":"Musashino Premium — 認定商品","url":"https://musashino-premium.com/standard/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-31": {"name":"Musashino City — 武蔵野市の特産品やイベントなど","url":"https://www.city.musashino.lg.jp/citypromotion_75/folder/city_profile.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://musashino-premium.com/standard/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-12",
        "source-31"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-12",
        "source-31"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-12",
        "source-31"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-12",
        "source-31"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-12",
        "source-31"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-12",
        "source-31"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-12",
        "source-31"
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
    "spots.b01-musashino-udo-shinsenkan-udo.detail.description": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-udo-shinsenkan-udo.presentation": {
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
