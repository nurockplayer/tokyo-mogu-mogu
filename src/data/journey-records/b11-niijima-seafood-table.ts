import type { JourneyRecord } from '../journey-record';

export const b11NiijimaSeafoodTableRecord: JourneyRecord = {
  "municipalityId": "niijima",
  "journey": {
    "id": "b11-niijima-seafood-table",
    "regionId": "niijima",
    "foodCultureId": "niijima-seafood-table",
    "storyId": "b11-niijima-seafood-table",
    "routeId": "b11-niijima-seafood-table-route",
    "copy": {"ja": {"title": "新島村の赤いかと海の食卓","subtitle": "新島村の赤いかと海の食卓","description": "新島と式根島の海産物を読み、式根島の店を訪ねる編集ルート。","tags": ["新島村"],"storyTitle": "新島村の赤いかと海の食卓","intro": ["新島と式根島の海産物を読み、式根島の店を訪ねる編集ルート。","掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。"]},"en": {"title": "Red squid and Niijima Village seafood","subtitle": "Red squid and Niijima Village seafood","description": "Read about both islands’ seafood, with an editorial stop on Shikinejima.","tags": ["Niijima Village"],"storyTitle": "Red squid and Niijima Village seafood","intro": ["Read about both islands’ seafood, with an editorial stop on Shikinejima.","This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands."]},"zh-TW": {"title": "新島村紅魷與海鮮餐桌","subtitle": "新島村紅魷與海鮮餐桌","description": "認識新島與式根島海產，編排行程以式根島店家為景點。","tags": ["新島村"],"storyTitle": "新島村紅魷與海鮮餐桌","intro": ["認識新島與式根島海產，編排行程以式根島店家為景點。","刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。"]}},
    "chapters": {"ja": [{"number": "01.","title": "食文化の記録 1","body": "村は春から初夏の赤いかを紹介しています。認定目録には式根島おさかなサービスの赤いか煮と一夜干し、寛永丸の烏賊野郎シリーズ、赤いか焼きそばがあります。旅行案内もみやとらの赤いか焼きそばを紹介しています。"},{"number": "02.","title": "食文化の記録 2","body": "村の案内は贈答に使う伊勢エビ、煮付けにするキンメダイ、夏の魚タカベを紹介しています。サザエ、トコブシ、カメノテも村の海の食材に挙げられています。"},{"number": "03.","title": "食文化の記録 3","body": "認定目録は式根島のおくやまの島づけ丼を、旬の地魚を醤油だれに漬けて酢飯にのせる丼として紹介しています。"}],"en": [{"number": "01.","title": "Food-culture notes 1","body": "The village describes spring-to-early-summer red squid. The catalogue lists Shikinejima Osakana Service’s simmered and overnight-dried squid, Kan’eimaru’s Ika Yaro range and red-squid yakisoba; the travel guide links yakisoba with Miyatora."},{"number": "02.","title": "Food-culture notes 2","body": "The village guide describes spiny lobster as a gift, kinmedai in simmered dishes and takabe as a summer fish. It also lists turban shells, tokobushi and kamenote among local marine foods."},{"number": "03.","title": "Food-culture notes 3","body": "The catalogue describes Okuyama’s Shikinejima shima-zuke bowl with seasonal local fish marinated in soy sauce over vinegared rice."}],"zh-TW": [{"number": "01.","title": "飲食文化紀錄 1","body": "村政府介紹春至初夏的紅魷；認定目錄列有式根島魚服務的煮紅魷與一夜干、寬永丸的烏賊野郎系列及紅魷炒麵，旅遊指南也介紹 Miyatora 的紅魷炒麵。"},{"number": "02.","title": "飲食文化紀錄 2","body": "村政府指南介紹贈禮用龍蝦、適合煮食的金目鯛及夏季魚雞魚，也列有蠑螺、九孔螺與龜足等海產。"},{"number": "03.","title": "飲食文化紀錄 3","body": "目錄介紹式根島奧山的島漬丼，以醬油醃時令地魚，鋪在醋飯上。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {
            "spotId": "b11-niijima-seafood-table-miyatora"
          }
        ]
      }
    ]
  },
  "routeName": {"ja": "新島村の赤いかと海の食卓","en": "Red squid and Niijima Village seafood","zh-TW": "新島村紅魷與海鮮餐桌"},
  "location": {"ja": {"area": "新島村","station": "","access": ""},"en": {"area": "Niijima Village","station": "","access": ""},"zh-TW": {"area": "新島村","station": "","access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "ferry-terminal", "name": {"ja": "野伏港", "en": "Nobushi Port", "zh-TW": "野伏港"}, "spotId": "b11-niijima-seafood-table-miyatora", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b11-niijima-seafood-table-miyatora",
          "description": {"ja": "旅行案内はこの式根島の店の赤いか焼きそばを紹介し、観光協会は弁当・惣菜の店として掲載しています。","en": "A travel guide describes this Shikinejima shop’s red-squid yakisoba; the tourism association lists its bento and prepared foods.","zh-TW": "旅遊指南介紹這間式根島商店的紅魷炒麵，觀光協會將其列為便當與熟食店。"},
          "note": {"ja": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described.","zh-TW": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。"}
        }
      ],
      "stats": {"ja": {"time": "約90分（編集目安）","distance": "","spots": "1 か所","station": "","minutes": "","access": "","caution": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。 来島前に海路・空路の最新の運航状況をご確認ください。"},"en": {"time": "About 90 min (editorial estimate)","distance": "","spots": "1 stops","station": "","minutes": "","access": "","caution": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described. Check current sea and air access before travelling to the islands."},"zh-TW": {"time": "約 90 分鐘（編輯估計）","distance": "","spots": "1 處","station": "","minutes": "","access": "","caution": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。 前往島嶼前，請確認最新海路與空路交通狀況。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。 来島前に海路・空路の最新の運航状況をご確認ください。","en": "This information is unconfirmed. Check the sources before visiting. Check current sea and air access before travelling to the islands.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。 前往島嶼前，請確認最新海路與空路交通狀況。"}
    }
  },
  "spots": {
    "b11-niijima-seafood-table-miyatora": {
      "presentation": {
        "id": "b11-niijima-seafood-table-miyatora",
        "regionId": "niijima",
        "foodCultureId": "niijima-seafood-table",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "ファミリーストア みやとら（式根島）","lead": "旅行案内はこの式根島の店の赤いか焼きそばを紹介し、観光協会は弁当・惣菜の店として掲載しています。","description": "旅行案内はこの式根島の店の赤いか焼きそばを紹介し、観光協会は弁当・惣菜の店として掲載しています。","tags": [],"practicalInfo": [{"label": "確認状態","value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。"]},"en": {"name": "Family Store Miyatora (Shikinejima)","lead": "A travel guide describes this Shikinejima shop’s red-squid yakisoba; the tourism association lists its bento and prepared foods.","description": "A travel guide describes this Shikinejima shop’s red-squid yakisoba; the tourism association lists its bento and prepared foods.","tags": [],"practicalInfo": [{"label": "Verification","value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],"caution": ["This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands."]},"zh-TW": {"name": "Miyatora 商店（式根島）","lead": "旅遊指南介紹這間式根島商店的紅魷炒麵，觀光協會將其列為便當與熟食店。","description": "旅遊指南介紹這間式根島商店的紅魷炒麵，觀光協會將其列為便當與熟食店。","tags": [],"practicalInfo": [{"label": "確認狀態","value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution": ["刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "旅行案内はこの式根島の店の赤いか焼きそばを紹介し、観光協会は弁当・惣菜の店として掲載しています。","en": "A travel guide describes this Shikinejima shop’s red-squid yakisoba; the tourism association lists its bento and prepared foods.","zh-TW": "旅遊指南介紹這間式根島商店的紅魷炒麵，觀光協會將其列為便當與熟食店。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報","en": "Source information","zh-TW": "出處資訊"},
            "value": {"ja": "https://travelroad.co.jp/izu-tour/spot/miyatora/","en": "https://travelroad.co.jp/izu-tour/spot/miyatora/","zh-TW": "https://travelroad.co.jp/izu-tour/spot/miyatora/"}
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
        "name": "b11 — ファミリーストア みやとら | 伊豆ツアー・伊豆諸島旅行予約【公式】東海汽船・飛行機で行くプラン｜トラベルロード",
        "url": "https://travelroad.co.jp/izu-tour/spot/miyatora/",
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
          "referenceId": "b11-niijima-seafood-table-miyatora",
          "spotId": "b11-niijima-seafood-table-miyatora",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "ファミリーストア みやとら（式根島）","en": "Family Store Miyatora (Shikinejima)","zh-TW": "Miyatora 商店（式根島）"},
          "description": {"ja": "旅行案内はこの式根島の店の赤いか焼きそばを紹介し、観光協会は弁当・惣菜の店として掲載しています。","en": "A travel guide describes this Shikinejima shop’s red-squid yakisoba; the tourism association lists its bento and prepared foods.","zh-TW": "旅遊指南介紹這間式根島商店的紅魷炒麵，觀光協會將其列為便當與熟食店。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "新島村","station": ""},"en": {"region": "Niijima Village","station": ""},"zh-TW": {"region": "新島村","station": ""}}
  },
  "sources": {
    "admission-access": {"name": "Shikinejima Tourism Association – access point map", "url": "https://shikinejima.tokyo/cms/wp-content/uploads/2020/09/wifi.pdf", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-26": {
      "name": "b11 — 目的から探す 人気のグルメ｜観光情報｜東京都新島村",
      "url": "https://niijima.com/kankou/purposemenu/gourmet_index.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-30": {
      "name": "b11 — 新島村商工会｜認定ブランド事業",
      "url": "https://niijima.or.jp/shokokai/mission/%E8%AA%8D%E5%AE%9A%E3%83%96%E3%83%A9%E3%83%B3%E3%83%89%E4%BA%8B%E6%A5%AD/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-31": {
      "name": "b11 — ファミリーストア みやとら | 伊豆ツアー・伊豆諸島旅行予約【公式】東海汽船・飛行機で行くプラン｜トラベルロード",
      "url": "https://travelroad.co.jp/izu-tour/spot/miyatora/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-32": {
      "name": "b11 — 式根島観光協会 | ファミリーストア みやとら",
      "url": "https://shikinejima.tokyo/gourmet/bento/378/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b11 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://travelroad.co.jp/izu-tour/spot/miyatora/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {"sourceIds": ["source-26","source-30","source-31","source-32"],"origin": "editorial"},
    "routeName": {"sourceIds": ["source-26","source-30","source-31","source-32"],"origin": "editorial"},
    "location": {"sourceIds": ["source-26","source-30","source-31","source-32"],"origin": "editorial"},
    "story": {"sourceIds": ["source-26","source-30","source-31","source-32"],"origin": "editorial"},
    "journey.routeVariants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "variants": {"sourceIds": ["editorial","source-26","source-30","source-31","source-32"],"origin": "editorial"},
    "spots.b11-niijima-seafood-table-miyatora": {"sourceIds": ["source-31","source-32"],"origin": "editorial"},
    "journey.chapters.ja.0": {"sourceIds": ["source-26","source-30","source-31"],"origin": "editorial"},
    "journey.chapters.en.0": {"sourceIds": ["source-26","source-30","source-31"],"origin": "editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds": ["source-26","source-30","source-31"],"origin": "editorial"},
    "journey.chapters.ja.1": {"sourceIds": ["source-26"],"origin": "editorial"},
    "journey.chapters.en.1": {"sourceIds": ["source-26"],"origin": "editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds": ["source-26"],"origin": "editorial"},
    "journey.chapters.ja.2": {"sourceIds": ["source-30"],"origin": "editorial"},
    "journey.chapters.en.2": {"sourceIds": ["source-30"],"origin": "editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds": ["source-30"],"origin": "editorial"}
  }
};
