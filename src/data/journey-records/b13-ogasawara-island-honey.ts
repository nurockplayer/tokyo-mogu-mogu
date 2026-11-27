import type { JourneyRecord } from '../journey-record';

export const b13OgasawaraIslandHoneyRecord: JourneyRecord = {
  "municipalityId": "ogasawara",
  "alcoholThemed": false,
  "journey": {
    "id": "b13-ogasawara-island-honey",
    "regionId": "ogasawara",
    "foodCultureId": "ogasawara-island-honey",
    "storyId": "b13-ogasawara-island-honey",
    "routeId": "b13-ogasawara-island-honey-route",
    "copy": {"ja":{"title":"小笠原の島はちみつ","subtitle":"小笠原の島はちみつ","description":"島の養蜂と、カフェでの使い方を知る。","tags":["小笠原村"],"storyTitle":"小笠原の島はちみつ","intro":["島の養蜂と、カフェでの使い方を知る。","掲載内容は未確認です。訪問前に出典をご確認ください。"]},"en":{"title":"Ogasawara island honey","subtitle":"Ogasawara island honey","description":"Explore island beekeeping and honey’s cafe connections.","tags":["Ogasawara Village"],"storyTitle":"Ogasawara island honey","intro":["Explore island beekeeping and honey’s cafe connections.","This information is unconfirmed. Check the sources before visiting."]},"zh-TW":{"title":"小笠原島蜂蜜","subtitle":"小笠原島蜂蜜","description":"認識島上養蜂及蜂蜜在咖啡館的用途。","tags":["小笠原村"],"storyTitle":"小笠原島蜂蜜","intro":["認識島上養蜂及蜂蜜在咖啡館的用途。","刊載內容尚未確認，造訪前請查看出處。"]}},
    "chapters": {"ja":[{"number":"01.","title":"小笠原の島はちみつ","body":"都の案内は、温暖な小笠原ではミツバチが冬も活動し、はちみつが島の畜産物の一つだと紹介しています。"}],"en":[{"number":"01.","title":"Ogasawara island honey","body":"Tokyo describes honey as an island livestock product and notes that the warm climate lets bees remain active in winter."}],"zh-TW":[{"number":"01.","title":"小笠原島蜂蜜","body":"東京都介紹蜂蜜為島上畜產品，並記錄溫暖氣候讓蜜蜂在冬季也持續活動。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {
            "spotId": "b13-ogasawara-island-honey-cafe"
          }
        ]
      }
    ]
  },
  "routeName": {"ja":"小笠原の島はちみつ","en":"Ogasawara island honey","zh-TW":"小笠原島蜂蜜"},
  "location": {"ja":{"area":"小笠原村","station":"","access":""},"en":{"area":"Ogasawara Village","station":"","access":""},"zh-TW":{"area":"小笠原村","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "ferry-terminal", "name": {"ja": "二見港船客待合所", "en": "Futami Port passenger terminal", "zh-TW": "二見港旅客候船室"}, "spotId": "b13-ogasawara-island-honey-cafe", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b13-ogasawara-island-honey-cafe",
          "description": {"ja":"農協は直売所併設のカフェで島バナナシェイクや、島はちみつを使ったソフトクリームとアイスコーヒーを紹介しています。","en":"The cooperative’s adjoining cafe listing describes island-banana shakes and soft serve with island honey and iced coffee.","zh-TW":"農協介紹直賣所附設咖啡館的島香蕉奶昔，以及搭配島蜂蜜、霜淇淋與冰咖啡的飲品。"},
          "note": {"ja":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。","en":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities.","zh-TW":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}
        }
      ],
      "stats": {"ja":{"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"},"en":{"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stop","station":"","minutes":"","access":"","caution":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."},"zh-TW":{"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典をご確認ください。","en":"This information is unconfirmed. Check the sources before visiting.","zh-TW":"刊載內容尚未確認，造訪前請查看出處。"}
    }
  },
  "spots": {
    "b13-ogasawara-island-honey-cafe": {
      "visitorSourceId": "admission-visitor",
      "presentation": {
        "id": "b13-ogasawara-island-honey-cafe",
        "regionId": "ogasawara",
        "foodCultureId": "ogasawara-island-honey",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"Farm Stand Cafe","lead":"農協は直売所併設のカフェで島バナナシェイクや、島はちみつを使ったソフトクリームとアイスコーヒーを紹介しています。","description":"農協は直売所併設のカフェで島バナナシェイクや、島はちみつを使ったソフトクリームとアイスコーヒーを紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典をご確認ください。","時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"]},"en":{"name":"Farm Stand Cafe","lead":"The cooperative’s adjoining cafe listing describes island-banana shakes and soft serve with island honey and iced coffee.","description":"The cooperative’s adjoining cafe listing describes island-banana shakes and soft serve with island honey and iced coffee.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the sources before visiting.","Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."]},"zh-TW":{"name":"Farm Stand Cafe","lead":"農協介紹直賣所附設咖啡館的島香蕉奶昔，以及搭配島蜂蜜、霜淇淋與冰咖啡的飲品。","description":"農協介紹直賣所附設咖啡館的島香蕉奶昔，以及搭配島蜂蜜、霜淇淋與冰咖啡的飲品。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 25 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認，造訪前請查看出處。","時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"農協は直売所併設のカフェで島バナナシェイクや、島はちみつを使ったソフトクリームとアイスコーヒーを紹介しています。","en":"The cooperative’s adjoining cafe listing describes island-banana shakes and soft serve with island honey and iced coffee.","zh-TW":"農協介紹直賣所附設咖啡館的島香蕉奶昔，以及搭配島蜂蜜、霜淇淋與冰咖啡的飲品。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://ogasawara-islands.or.jp/store/","en":"https://ogasawara-islands.or.jp/store/","zh-TW":"https://ogasawara-islands.or.jp/store/"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 25 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [
          {"ja":"掲載内容は未確認です。訪問前に出典をご確認ください。","en":"This information is unconfirmed. Check the sources before visiting.","zh-TW":"刊載內容尚未確認，造訪前請查看出處。"},
          {"ja":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。","en":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities.","zh-TW":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}
        ]
      },
      "officialSource": {
        "name": "店舗紹介 | 小笠原アイランズ農業協同組合 公式サイト",
        "url": "https://ogasawara-islands.or.jp/store/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-25",
        "verificationStatus": "needs_confirmation"
      }
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b13-ogasawara-island-honey-cafe",
          "spotId": "b13-ogasawara-island-honey-cafe",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"Farm Stand Cafe","en":"Farm Stand Cafe","zh-TW":"Farm Stand Cafe"},
          "description": {"ja":"農協は直売所併設のカフェで島バナナシェイクや、島はちみつを使ったソフトクリームとアイスコーヒーを紹介しています。","en":"The cooperative’s adjoining cafe listing describes island-banana shakes and soft serve with island honey and iced coffee.","zh-TW":"農協介紹直賣所附設咖啡館的島香蕉奶昔，以及搭配島蜂蜜、霜淇淋與冰咖啡的飲品。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"小笠原村","station":""},"en":{"region":"Ogasawara Village","station":""},"zh-TW":{"region":"小笠原村","station":""}}
  },
  "sources": {
    "admission-access": {"name": "東京観光財団 父島ガイドブック・大村マップ", "url": "https://www.gotokyo.org/book/wp-content/uploads/2026/03/AO2_2603_chichijima-guidebook_low_JP.pdf", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "admission-visitor": {"name": "小笠原アイランズ農業協同組合 店舗紹介", "url": "https://ogasawara-islands.or.jp/store/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-34": {
      "name": "小笠原の農作物|小笠原の農水産物|東京都小笠原支庁",
      "url": "https://www.soumu.metro.tokyo.lg.jp/07ogasawara/farmfish/crops",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-35": {
      "name": "店舗紹介 | 小笠原アイランズ農業協同組合 公式サイト",
      "url": "https://ogasawara-islands.or.jp/store/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b13 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://ogasawara-islands.or.jp/store/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-34"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-34"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-34"
      ],
      "origin": "editorial"
    },
    "spots.b13-ogasawara-island-honey-cafe": {
      "sourceIds": [
        "source-35"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-35"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-35"
      ],
      "origin": "editorial"
    },
    "journey.copy": {
      "sourceIds": [
        "source-34",
        "source-35"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-34",
        "source-35"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-34",
        "source-35"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-34",
        "source-35"
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
        "editorial"
      ],
      "origin": "editorial"
    }
  }
};
