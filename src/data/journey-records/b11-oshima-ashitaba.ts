import type { JourneyRecord } from '../journey-record';

export const b11OshimaAshitabaRecord: JourneyRecord = {
  "municipalityId": "oshima",
  "alcoholThemed": false,
  "journey": {
    "id": "b11-oshima-ashitaba",
    "regionId": "oshima",
    "foodCultureId": "oshima-ashitaba",
    "storyId": "b11-oshima-ashitaba",
    "routeId": "b11-oshima-ashitaba-route",
    "copy": {"ja": {"title": "大島の明日葉をたどる","subtitle": "大島の明日葉をたどる","description": "天ぷら、お茶、地のり炒め。島の野草が食卓につながる姿を読む。","tags": ["大島町"],"storyTitle": "大島の明日葉をたどる","intro": ["天ぷら、お茶、地のり炒め。島の野草が食卓につながる姿を読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。"]},"en": {"title": "Oshima’s ashitaba traditions","subtitle": "Oshima’s ashitaba traditions","description": "Explore an island green through tempura, tea and nori stir-fry.","tags": ["Oshima Town"],"storyTitle": "Oshima’s ashitaba traditions","intro": ["Explore an island green through tempura, tea and nori stir-fry.","This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands."]},"zh-TW": {"title": "尋訪大島明日葉","subtitle": "尋訪大島明日葉","description": "從天婦羅、茶飲到海苔炒菜，認識島上野菜的餐桌文化。","tags": ["大島町"],"storyTitle": "尋訪大島明日葉","intro": ["從天婦羅、茶飲到海苔炒菜，認識島上野菜的餐桌文化。","刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。"]}},
    "chapters": {"ja": [{"number": "01.","title": "食文化の記録 1","body": "観光協会は明日葉を島の特産品とし、天ぷらや佃煮などの食べ方を紹介しています。"},{"number": "02.","title": "食文化の記録 2","body": "みよしみやげ品店の案内には明日葉茶が並び、町の特産品一覧には大島明日葉研究所の茶や粉末が掲載されています。"},{"number": "03.","title": "食文化の記録 3","body": "寿し光の紹介には、大島の地のりと明日葉をごま油で炒める料理が登場します。"}],"en": [{"number": "01.","title": "Food-culture notes 1","body": "The tourism association presents ashitaba as an island specialty prepared as tempura and simmered preserves."},{"number": "02.","title": "Food-culture notes 2","body": "Miyoshi lists ashitaba teas; the town’s specialty catalogue also names Oshima Ashitaba Research Institute with tea and powder."},{"number": "03.","title": "Food-culture notes 3","body": "Sushikou’s profile describes stir-frying Oshima nori and ashitaba in sesame oil."}],"zh-TW": [{"number": "01.","title": "飲食文化紀錄 1","body": "觀光協會將明日葉列為島嶼特產，介紹天婦羅與佃煮等吃法。"},{"number": "02.","title": "飲食文化紀錄 2","body": "Miyoshi 店家介紹列有明日葉茶；町的特產目錄也記載大島明日葉研究所的茶與粉末。"},{"number": "03.","title": "飲食文化紀錄 3","body": "壽司光的介紹記載以芝麻油拌炒大島海苔與明日葉的料理。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 150,
        "steps": [
          {
            "spotId": "b11-oshima-ashitaba-miyoshi"
          },
          {
            "spotId": "b11-oshima-ashitaba-sushikou"
          }
        ]
      }
    ]
  },
  "routeName": {"ja": "大島の明日葉をたどる","en": "Oshima’s ashitaba traditions","zh-TW": "尋訪大島明日葉"},
  "location": {"ja": {"area": "大島町","station": "","access": ""},"en": {"area": "Oshima Town","station": "","access": ""},"zh-TW": {"area": "大島町","station": "","access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "元町港", "en": "Motomachi Port bus stop", "zh-TW": "元町港巴士站"}, "spotId": "b11-oshima-ashitaba-miyoshi", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b11-oshima-ashitaba-miyoshi",
          "description": {"ja": "店の紹介には明日葉茶、海の精の塩、青唐がらし醤油、くさや、椿油製品が掲載されています。","en": "The shop lists ashitaba tea, Umi no Sei salt, green-chili soy sauce, kusaya and camellia-oil products.","zh-TW": "店家介紹列有明日葉茶、海之精鹽、青辣椒醬油、臭魚乾及山茶油製品。"},
          "note": {"ja": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described.","zh-TW": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。"}
        },
        {
          "spotId": "b11-oshima-ashitaba-sushikou",
          "description": {"ja": "認定ブランドの紹介で、明日葉と地のりの炒め物やくさやピザを紹介する店です。","en": "The Geopark Brand profile presents this restaurant’s ashitaba-and-nori stir-fry and kusaya pizza.","zh-TW": "地質公園品牌介紹記載此店的明日葉與海苔炒菜，以及臭魚乾披薩。"},
          "note": {"ja": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described.","zh-TW": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。"}
        }
      ],
      "stats": {"ja": {"time": "約150分（編集目安）","distance": "","spots": "2 か所","station": "","minutes": "","access": "","caution": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。 来島前に海路・空路の最新の運航状況をご確認ください。"},"en": {"time": "About 150 min (editorial estimate)","distance": "","spots": "2 stops","station": "","minutes": "","access": "","caution": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described. Check current sea and air access before travelling to the islands."},"zh-TW": {"time": "約 150 分鐘（編輯估計）","distance": "","spots": "2 處","station": "","minutes": "","access": "","caution": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。 前往島嶼前，請確認最新海路與空路交通狀況。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。 来島前に海路・空路の最新の運航状況をご確認ください。","en": "This information is unconfirmed. Check the sources before visiting. Check current sea and air access before travelling to the islands.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。 前往島嶼前，請確認最新海路與空路交通狀況。"}
    }
  },
  "spots": {
    "b11-oshima-ashitaba-miyoshi": {
      "presentation": {
        "id": "b11-oshima-ashitaba-miyoshi",
        "regionId": "oshima",
        "foodCultureId": "oshima-ashitaba",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "みよしみやげ品店","lead": "店の紹介には明日葉茶、海の精の塩、青唐がらし醤油、くさや、椿油製品が掲載されています。","description": "店の紹介には明日葉茶、海の精の塩、青唐がらし醤油、くさや、椿油製品が掲載されています。","tags": [],"practicalInfo": [{"label": "確認状態","value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。"]},"en": {"name": "Miyoshi Souvenir Shop","lead": "The shop lists ashitaba tea, Umi no Sei salt, green-chili soy sauce, kusaya and camellia-oil products.","description": "The shop lists ashitaba tea, Umi no Sei salt, green-chili soy sauce, kusaya and camellia-oil products.","tags": [],"practicalInfo": [{"label": "Verification","value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],"caution": ["This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands."]},"zh-TW": {"name": "Miyoshi 伴手禮店","lead": "店家介紹列有明日葉茶、海之精鹽、青辣椒醬油、臭魚乾及山茶油製品。","description": "店家介紹列有明日葉茶、海之精鹽、青辣椒醬油、臭魚乾及山茶油製品。","tags": [],"practicalInfo": [{"label": "確認狀態","value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution": ["刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "店の紹介には明日葉茶、海の精の塩、青唐がらし醤油、くさや、椿油製品が掲載されています。","en": "The shop lists ashitaba tea, Umi no Sei salt, green-chili soy sauce, kusaya and camellia-oil products.","zh-TW": "店家介紹列有明日葉茶、海之精鹽、青辣椒醬油、臭魚乾及山茶油製品。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報","en": "Source information","zh-TW": "出處資訊"},
            "value": {"ja": "https://www.miyoshi-miyage.com/concept.html","en": "https://www.miyoshi-miyage.com/concept.html","zh-TW": "https://www.miyoshi-miyage.com/concept.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja": "確認状態","en": "Verification","zh-TW": "確認狀態"},
            "value": {"ja": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [
          {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。","en": "This information is unconfirmed. Check the sources before visiting.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"},
          {"ja": "来島前に海路・空路の最新の運航状況をご確認ください。","en": "Check current sea and air access before travelling to the islands.","zh-TW": "前往島嶼前，請確認最新海路與空路交通狀況。"}
        ]
      },
      "officialSource": {
        "name": "b11 — お土産 | みよしみやげ品店",
        "url": "https://www.miyoshi-miyage.com/concept.html",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    },
    "b11-oshima-ashitaba-sushikou": {
      "presentation": {
        "id": "b11-oshima-ashitaba-sushikou",
        "regionId": "oshima",
        "foodCultureId": "oshima-ashitaba",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "寿し光","lead": "認定ブランドの紹介で、明日葉と地のりの炒め物やくさやピザを紹介する店です。","description": "認定ブランドの紹介で、明日葉と地のりの炒め物やくさやピザを紹介する店です。","tags": [],"practicalInfo": [{"label": "確認状態","value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。"]},"en": {"name": "Sushikou","lead": "The Geopark Brand profile presents this restaurant’s ashitaba-and-nori stir-fry and kusaya pizza.","description": "The Geopark Brand profile presents this restaurant’s ashitaba-and-nori stir-fry and kusaya pizza.","tags": [],"practicalInfo": [{"label": "Verification","value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],"caution": ["This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands."]},"zh-TW": {"name": "壽司光","lead": "地質公園品牌介紹記載此店的明日葉與海苔炒菜，以及臭魚乾披薩。","description": "地質公園品牌介紹記載此店的明日葉與海苔炒菜，以及臭魚乾披薩。","tags": [],"practicalInfo": [{"label": "確認狀態","value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution": ["刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "認定ブランドの紹介で、明日葉と地のりの炒め物やくさやピザを紹介する店です。","en": "The Geopark Brand profile presents this restaurant’s ashitaba-and-nori stir-fry and kusaya pizza.","zh-TW": "地質公園品牌介紹記載此店的明日葉與海苔炒菜，以及臭魚乾披薩。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報","en": "Source information","zh-TW": "出處資訊"},
            "value": {"ja": "https://www.izu-oshima.or.jp/geopark/brand/member/","en": "https://www.izu-oshima.or.jp/geopark/brand/member/","zh-TW": "https://www.izu-oshima.or.jp/geopark/brand/member/"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja": "確認状態","en": "Verification","zh-TW": "確認狀態"},
            "value": {"ja": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [
          {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。","en": "This information is unconfirmed. Check the sources before visiting.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"},
          {"ja": "来島前に海路・空路の最新の運航状況をご確認ください。","en": "Check current sea and air access before travelling to the islands.","zh-TW": "前往島嶼前，請確認最新海路與空路交通狀況。"}
        ]
      },
      "officialSource": {
        "name": "b11 — 認定ブランド",
        "url": "https://www.izu-oshima.or.jp/geopark/brand/member/",
        "sourceType": "official_web",
        "retrievedAt": "2026-11-24",
        "verificationStatus": "needs_confirmation"
      }
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b11-oshima-ashitaba-miyoshi",
          "spotId": "b11-oshima-ashitaba-miyoshi",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "みよしみやげ品店","en": "Miyoshi Souvenir Shop","zh-TW": "Miyoshi 伴手禮店"},
          "description": {"ja": "店の紹介には明日葉茶、海の精の塩、青唐がらし醤油、くさや、椿油製品が掲載されています。","en": "The shop lists ashitaba tea, Umi no Sei salt, green-chili soy sauce, kusaya and camellia-oil products.","zh-TW": "店家介紹列有明日葉茶、海之精鹽、青辣椒醬油、臭魚乾及山茶油製品。"}
        },
        {
          "referenceId": "b11-oshima-ashitaba-sushikou",
          "spotId": "b11-oshima-ashitaba-sushikou",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "寿し光","en": "Sushikou","zh-TW": "壽司光"},
          "description": {"ja": "認定ブランドの紹介で、明日葉と地のりの炒め物やくさやピザを紹介する店です。","en": "The Geopark Brand profile presents this restaurant’s ashitaba-and-nori stir-fry and kusaya pizza.","zh-TW": "地質公園品牌介紹記載此店的明日葉與海苔炒菜，以及臭魚乾披薩。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "大島町","station": ""},"en": {"region": "Oshima Town","station": ""},"zh-TW": {"region": "大島町","station": ""}}
  },
  "sources": {
    "admission-access": {"name": "Miyoshi Souvenir Shop access", "url": "https://miyoshi-miyage.com/access.html", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-0": {
      "name": "b11 — 特産品（Specialty goods）） | 一般社団法人大島観光協会",
      "url": "https://izu-oshima.or.jp/specialty.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-4": {
      "name": "b11 — お土産 | みよしみやげ品店",
      "url": "https://www.miyoshi-miyage.com/concept.html",
      "sourceType": "business",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-5": {
      "name": "b11 — 2026 年",
      "url": "https://www.town.oshima.tokyo.jp/uploaded/attachment/8743.pdf",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-6": {
      "name": "b11 — 認定ブランド",
      "url": "https://www.izu-oshima.or.jp/geopark/brand/member/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b11 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://www.miyoshi-miyage.com/concept.html",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {"sourceIds": ["source-0","source-4","source-5","source-6"],"origin": "editorial"},
    "routeName": {"sourceIds": ["source-0","source-4","source-5","source-6"],"origin": "editorial"},
    "location": {"sourceIds": ["source-0","source-4","source-5","source-6"],"origin": "editorial"},
    "story": {"sourceIds": ["source-0","source-4","source-5","source-6"],"origin": "editorial"},
    "journey.routeVariants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "variants": {"sourceIds": ["editorial","source-0","source-4","source-5","source-6"],"origin": "editorial"},
    "spots.b11-oshima-ashitaba-miyoshi": {"sourceIds": ["source-4"],"origin": "editorial"},
    "spots.b11-oshima-ashitaba-sushikou": {"sourceIds": ["source-6"],"origin": "editorial"},
    "journey.chapters.ja.0": {"sourceIds": ["source-0"],"origin": "editorial"},
    "journey.chapters.en.0": {"sourceIds": ["source-0"],"origin": "editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds": ["source-0"],"origin": "editorial"},
    "journey.chapters.ja.1": {"sourceIds": ["source-4","source-5"],"origin": "editorial"},
    "journey.chapters.en.1": {"sourceIds": ["source-4","source-5"],"origin": "editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds": ["source-4","source-5"],"origin": "editorial"},
    "journey.chapters.ja.2": {"sourceIds": ["source-6"],"origin": "editorial"},
    "journey.chapters.en.2": {"sourceIds": ["source-6"],"origin": "editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds": ["source-6"],"origin": "editorial"}
  }
};
