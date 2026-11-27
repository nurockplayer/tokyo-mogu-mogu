import type { JourneyRecord } from '../journey-record';

export const b11OshimaSeafoodRecord: JourneyRecord = {
  "municipalityId": "oshima",
  "journey": {
    "id": "b11-oshima-seafood",
    "regionId": "oshima",
    "foodCultureId": "oshima-seafood",
    "storyId": "b11-oshima-seafood",
    "routeId": "b11-oshima-seafood-route",
    "copy": {"ja": {"title": "大島の磯の食文化","subtitle": "大島の磯の食文化","description": "伊勢エビや貝を、島の海産物紹介から読む。","tags": ["大島町"],"storyTitle": "大島の磯の食文化","intro": ["伊勢エビや貝を、島の海産物紹介から読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。"]},"en": {"title": "Oshima’s rocky-shore foods","subtitle": "Oshima’s rocky-shore foods","description": "Explore lobster and shellfish through island seafood accounts.","tags": ["Oshima Town"],"storyTitle": "Oshima’s rocky-shore foods","intro": ["Explore lobster and shellfish through island seafood accounts.","This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands."]},"zh-TW": {"title": "大島岩岸飲食文化","subtitle": "大島岩岸飲食文化","description": "透過島嶼海產介紹，認識龍蝦與貝類。","tags": ["大島町"],"storyTitle": "大島岩岸飲食文化","intro": ["透過島嶼海產介紹，認識龍蝦與貝類。","刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。"]}},
    "chapters": {"ja": [{"number": "01.","title": "食文化の記録 1","body": "観光協会は溶岩地形の岩礁と伊勢エビの関係、大きく育つサザエ、煮貝や酒蒸しにするトコブシを紹介しています。"},{"number": "02.","title": "食文化の記録 2","body": "認定ブランドの料理紹介にはセセリが登場し、東京諸島のガイドはメッカリも大島の海産物として挙げています。"}],"en": [{"number": "01.","title": "Food-culture notes 1","body": "The tourism association links lava reefs with spiny lobster habitat and describes large turban shells and simmered or steamed tokobushi."},{"number": "02.","title": "Food-culture notes 2","body": "The Geopark Brand food profiles mention seseri, while the Tokyo Islands guide also names mekkari among Oshima seafood."}],"zh-TW": [{"number": "01.","title": "飲食文化紀錄 1","body": "觀光協會記載熔岩岩礁與龍蝦棲地的關聯，也介紹大型蠑螺與煮食或酒蒸的九孔螺。"},{"number": "02.","title": "飲食文化紀錄 2","body": "地質公園品牌料理介紹提及 seseri 貝，東京諸島指南也將 mekkari 貝列為大島海產。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {
            "spotId": "b11-oshima-seafood-umi-ichiba"
          }
        ]
      }
    ]
  },
  "routeName": {"ja": "大島の磯の食文化","en": "Oshima’s rocky-shore foods","zh-TW": "大島岩岸飲食文化"},
  "location": {"ja": {"area": "大島町","station": "","access": ""},"en": {"area": "Oshima Town","station": "","access": ""},"zh-TW": {"area": "大島町","station": "","access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "元町港", "en": "Motomachi Port bus stop", "zh-TW": "元町港公車站"}, "spotId": "b11-oshima-seafood-umi-ichiba", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b11-oshima-seafood-umi-ichiba",
          "description": {"ja": "観光協会が伊勢エビやトコブシ、魚介加工品を紹介する海産物の店です。","en": "The tourism association presents this seafood shop with spiny lobster, tokobushi and processed seafood.","zh-TW": "觀光協會介紹此海產店，記載龍蝦、九孔螺及水產加工品。"},
          "note": {"ja": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described.","zh-TW": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。"}
        }
      ],
      "stats": {"ja": {"time": "約90分（編集目安）","distance": "","spots": "1 か所","station": "","minutes": "","access": "","caution": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。 来島前に海路・空路の最新の運航状況をご確認ください。"},"en": {"time": "About 90 min (editorial estimate)","distance": "","spots": "1 stops","station": "","minutes": "","access": "","caution": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described. Check current sea and air access before travelling to the islands."},"zh-TW": {"time": "約 90 分鐘（編輯估計）","distance": "","spots": "1 處","station": "","minutes": "","access": "","caution": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。 前往島嶼前，請確認最新海路與空路交通狀況。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。 来島前に海路・空路の最新の運航状況をご確認ください。","en": "This information is unconfirmed. Check the sources before visiting. Check current sea and air access before travelling to the islands.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。 前往島嶼前，請確認最新海路與空路交通狀況。"}
    }
  },
  "spots": {
    "b11-oshima-seafood-umi-ichiba": {
      "presentation": {
        "id": "b11-oshima-seafood-umi-ichiba",
        "regionId": "oshima",
        "foodCultureId": "oshima-seafood",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "海市場","lead": "観光協会が伊勢エビやトコブシ、魚介加工品を紹介する海産物の店です。","description": "観光協会が伊勢エビやトコブシ、魚介加工品を紹介する海産物の店です。","tags": [],"practicalInfo": [{"label": "確認状態","value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。"]},"en": {"name": "Umi Ichiba","lead": "The tourism association presents this seafood shop with spiny lobster, tokobushi and processed seafood.","description": "The tourism association presents this seafood shop with spiny lobster, tokobushi and processed seafood.","tags": [],"practicalInfo": [{"label": "Verification","value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],"caution": ["This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands."]},"zh-TW": {"name": "海市場","lead": "觀光協會介紹此海產店，記載龍蝦、九孔螺及水產加工品。","description": "觀光協會介紹此海產店，記載龍蝦、九孔螺及水產加工品。","tags": [],"practicalInfo": [{"label": "確認狀態","value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution": ["刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "観光協会が伊勢エビやトコブシ、魚介加工品を紹介する海産物の店です。","en": "The tourism association presents this seafood shop with spiny lobster, tokobushi and processed seafood.","zh-TW": "觀光協會介紹此海產店，記載龍蝦、九孔螺及水產加工品。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報","en": "Source information","zh-TW": "出處資訊"},
            "value": {"ja": "https://www.izu-oshima.or.jp/eat.html","en": "https://www.izu-oshima.or.jp/eat.html","zh-TW": "https://www.izu-oshima.or.jp/eat.html"}
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
        "name": "b11 — 食べる（Gourmet） | 一般社団法人大島観光協会",
        "url": "https://www.izu-oshima.or.jp/eat.html",
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
          "referenceId": "b11-oshima-seafood-umi-ichiba",
          "spotId": "b11-oshima-seafood-umi-ichiba",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "海市場","en": "Umi Ichiba","zh-TW": "海市場"},
          "description": {"ja": "観光協会が伊勢エビやトコブシ、魚介加工品を紹介する海産物の店です。","en": "The tourism association presents this seafood shop with spiny lobster, tokobushi and processed seafood.","zh-TW": "觀光協會介紹此海產店，記載龍蝦、九孔螺及水產加工品。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "大島町","station": ""},"en": {"region": "Oshima Town","station": ""},"zh-TW": {"region": "大島町","station": ""}}
  },
  "sources": {
    "admission-access": {"name": "Oshima Bus – visitor access", "url": "https://www.oshima-bus.com/sightseeing.php", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-6": {
      "name": "b11 — 認定ブランド",
      "url": "https://www.izu-oshima.or.jp/geopark/brand/member/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-10": {
      "name": "b11 — 食べる（Gourmet） | 一般社団法人大島観光協会",
      "url": "https://www.izu-oshima.or.jp/eat.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-12": {
      "name": "b11 — Izu Oshima Island Travel Guide - Things to do on Oshima Island | Tokyo Islands",
      "url": "https://stg.tokyoislands.jp/oshima",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b11 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://www.izu-oshima.or.jp/eat.html",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {"sourceIds": ["source-6","source-10","source-12"],"origin": "editorial"},
    "routeName": {"sourceIds": ["source-6","source-10","source-12"],"origin": "editorial"},
    "location": {"sourceIds": ["source-6","source-10","source-12"],"origin": "editorial"},
    "story": {"sourceIds": ["source-6","source-10","source-12"],"origin": "editorial"},
    "journey.routeVariants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "variants": {"sourceIds": ["editorial","source-6","source-10","source-12"],"origin": "editorial"},
    "spots.b11-oshima-seafood-umi-ichiba": {"sourceIds": ["source-10"],"origin": "editorial"},
    "journey.chapters.ja.0": {"sourceIds": ["source-10"],"origin": "editorial"},
    "journey.chapters.en.0": {"sourceIds": ["source-10"],"origin": "editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds": ["source-10"],"origin": "editorial"},
    "journey.chapters.ja.1": {"sourceIds": ["source-6","source-12"],"origin": "editorial"},
    "journey.chapters.en.1": {"sourceIds": ["source-6","source-12"],"origin": "editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds": ["source-6","source-12"],"origin": "editorial"}
  }
};
