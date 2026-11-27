import type { JourneyRecord } from '../journey-record';

export const b13HachijoFarmTableRecord: JourneyRecord = {
  "municipalityId": "hachijo",
  "alcoholThemed": false,
  "journey": {
    "id": "b13-hachijo-farm-table",
    "regionId": "hachijo",
    "foodCultureId": "hachijo-farm-table",
    "storyId": "b13-hachijo-farm-table",
    "routeId": "b13-hachijo-farm-table-route",
    "copy": {"ja":{"title":"八丈の畑と家庭の味","subtitle":"八丈の畑と家庭の味","description":"レモン、ネリ、里芋と麦の料理を、農産物の案内からたどる。","tags":["八丈町"],"storyTitle":"八丈の畑と家庭の味","intro":["レモン、ネリ、里芋と麦の料理を、農産物の案内からたどる。","掲載内容は未確認です。訪問前に出典をご確認ください。"]},"en":{"title":"Hachijo fields and home cooking","subtitle":"Hachijo fields and home cooking","description":"Read the island’s lemon, okra, taro and barley food stories.","tags":["Hachijo Town"],"storyTitle":"Hachijo fields and home cooking","intro":["Read the island’s lemon, okra, taro and barley food stories.","This information is unconfirmed. Check the sources before visiting."]},"zh-TW":{"title":"八丈田園與家常滋味","subtitle":"八丈田園與家常滋味","description":"認識島上檸檬、秋葵、芋頭與麥的食文化。","tags":["八丈町"],"storyTitle":"八丈田園與家常滋味","intro":["認識島上檸檬、秋葵、芋頭與麥的食文化。","刊載內容尚未確認，造訪前請查看出處。"]}},
    "chapters": {"ja":[{"number":"01.","title":"八丈フルーツレモン","body":"観光協会は、樹上で熟して皮の苦味が少なくなる大きな八丈フルーツレモンと、丸いさやを持つ夏野菜の八丈オクラ（ネリ）を紹介しています。JAの農産物案内には秋に収穫する早生芋、赤芽芋、南京芋が載り、観光協会は茹でた里芋に鰹の酒盗を添える食べ方も説明しています。"},{"number":"02.","title":"麦雑炊（麦ぞうすい）","body":"町のレシピは、麦や明日葉などの野菜を使う麦ぞうすいを郷土料理として紹介しています。都の保健所資料には「芋つき」も載っています。"}],"en":[{"number":"01.","title":"Hachijo fruit lemon","body":"The tourism association describes large, tree-ripened Hachijo fruit lemons with less bitter peel and round-podded summer okra called neri. JA lists autumn taro types waseimo, akameimo and nankinimo; the tourism association also describes boiled taro served with bonito shuto."},{"number":"02.","title":"Hachijo barley porridge","body":"The town’s recipe introduces barley porridge with vegetables including ashitaba as a local dish. Tokyo’s health-office guide also names imotsuki among island preparations."}],"zh-TW":[{"number":"01.","title":"八丈田園與家常滋味","body":"觀光協會介紹果皮苦味較低、在樹上熟成的大型八丈水果檸檬，以及圓莢夏蔬八丈秋葵（Neri）。農協列出秋收的早生芋、赤芽芋、南京芋；觀光協會也記錄水煮芋頭配鰹魚酒盜的吃法。"},{"number":"02.","title":"八丈田園與家常滋味","body":"町公所食譜介紹以麥及明日葉等蔬菜製作的鄉土雜炊；東京都保健所資料也列有「芋つき」。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {
            "spotId": "b13-hachijo-farm-table-ja"
          }
        ]
      }
    ]
  },
  "routeName": {"ja":"八丈の畑と家庭の味","en":"Hachijo fields and home cooking","zh-TW":"八丈田園與家常滋味"},
  "location": {"ja":{"area":"八丈町","station":"","access":""},"en":{"area":"Hachijo Town","station":"","access":""},"zh-TW":{"area":"八丈町","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "ferry-terminal", "name": {"ja": "底土港", "en": "Sokodo Port", "zh-TW": "底土港"}, "spotId": "b13-hachijo-farm-table-ja", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b13-hachijo-farm-table-ja",
          "description": {"ja":"観光協会は、島内の野菜や果物を扱う農協の店として紹介しています。","en":"The tourism association identifies this cooperative shop with island-grown vegetables and fruit.","zh-TW":"觀光協會介紹此農協店販售島產蔬菜及水果。"},
          "note": {"ja":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。","en":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities.","zh-TW":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}
        }
      ],
      "stats": {"ja":{"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"},"en":{"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stop","station":"","minutes":"","access":"","caution":"Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."},"zh-TW":{"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典をご確認ください。","en":"This information is unconfirmed. Check the sources before visiting.","zh-TW":"刊載內容尚未確認，造訪前請查看出處。"}
    }
  },
  "spots": {
    "b13-hachijo-farm-table-ja": {
      "presentation": {
        "id": "b13-hachijo-farm-table-ja",
        "regionId": "hachijo",
        "foodCultureId": "hachijo-farm-table",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"八丈島農業協同組合 坂上店","lead":"観光協会は、島内の野菜や果物を扱う農協の店として紹介しています。","description":"観光協会は、島内の野菜や果物を扱う農協の店として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月25日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典をご確認ください。","時間と順序は編集上の目安です。来島前に最新の海路・空路の利用可否と島内の移動手段を確認してください。掲載料理すべての提供や施設への入場を保証する旅程ではありません。"]},"en":{"name":"JA Hachijo Sakagami Shop","lead":"The tourism association identifies this cooperative shop with island-grown vegetables and fruit.","description":"The tourism association identifies this cooperative shop with island-grown vegetables and fruit.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-25 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the sources before visiting.","Timing and order are editorial estimates. Check current sea/air access and on-island transport before visiting. This itinerary does not promise every described dish or entry to facilities."]},"zh-TW":{"name":"八丈島農協 坂上店","lead":"觀光協會介紹此農協店販售島產蔬菜及水果。","description":"觀光協會介紹此農協店販售島產蔬菜及水果。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 25 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認，造訪前請查看出處。","時間與順序為編輯估計。出發前請確認最新海空交通可行性與島內交通。本行程不保證供應所有介紹料理或可入內參觀設施。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会は、島内の野菜や果物を扱う農協の店として紹介しています。","en":"The tourism association identifies this cooperative shop with island-grown vegetables and fruit.","zh-TW":"觀光協會介紹此農協店販售島產蔬菜及水果。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.hachijo.gr.jp/goods/ja-nakanogo/","en":"https://www.hachijo.gr.jp/goods/ja-nakanogo/","zh-TW":"https://www.hachijo.gr.jp/goods/ja-nakanogo/"}
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
        "name": "八丈島農業協同組合 坂上店 - 八丈島観光協会",
        "url": "https://www.hachijo.gr.jp/goods/ja-nakanogo/",
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
          "referenceId": "b13-hachijo-farm-table-ja",
          "spotId": "b13-hachijo-farm-table-ja",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"八丈島農業協同組合 坂上店","en":"JA Hachijo Sakagami Shop","zh-TW":"八丈島農協 坂上店"},
          "description": {"ja":"観光協会は、島内の野菜や果物を扱う農協の店として紹介しています。","en":"The tourism association identifies this cooperative shop with island-grown vegetables and fruit.","zh-TW":"觀光協會介紹此農協店販售島產蔬菜及水果。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八丈町","station":""},"en":{"region":"Hachijo Town","station":""},"zh-TW":{"region":"八丈町","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Hachijojima Tourism Association – JA Sakaue shop", "url": "https://www.hachijo.gr.jp/goods/ja-nakanogo/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-13": {
      "name": "特産・名産品 - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/specials/specialty-products/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-6": {
      "name": "JA八丈島農協 | 特産品の農産物 |",
      "url": "https://www.jahachijo.jp/information/tokusan.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-14": {
      "name": "麦ぞうすい♪八丈島の郷土料理NO.14 – 八丈町公式サイト",
      "url": "https://www.town.hachijo.tokyo.jp/kenko-fukushi/kenkou/shokuiku/kantanrecipe/recipe14/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-15": {
      "name": "保健所活動報告（八丈島版　食事バランスガイド）|トピックス|東京都島しょ保健所",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/shisetsu/jigyosyo/hokenjyo/tousyo/hachijou/katsudou/balanceguide",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "source-7": {
      "name": "八丈島農業協同組合 坂上店 - 八丈島観光協会",
      "url": "https://www.hachijo.gr.jp/goods/ja-nakanogo/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b13 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://www.hachijo.gr.jp/goods/ja-nakanogo/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-25",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-13",
        "source-6"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-13",
        "source-6"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-13",
        "source-6"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-14",
        "source-15"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-14",
        "source-15"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-14",
        "source-15"
      ],
      "origin": "editorial"
    },
    "spots.b13-hachijo-farm-table-ja": {
      "sourceIds": [
        "source-7",
        "source-13"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-7",
        "source-13"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-7",
        "source-13"
      ],
      "origin": "editorial"
    },
    "journey.copy": {
      "sourceIds": [
        "source-13",
        "source-6",
        "source-14",
        "source-15",
        "source-7"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-13",
        "source-6",
        "source-14",
        "source-15",
        "source-7"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-13",
        "source-6",
        "source-14",
        "source-15",
        "source-7"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-13",
        "source-6",
        "source-14",
        "source-15",
        "source-7"
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
