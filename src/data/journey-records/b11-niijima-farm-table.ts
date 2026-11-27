import type { JourneyRecord } from '../journey-record';

export const b11NiijimaFarmTableRecord: JourneyRecord = {
  "municipalityId": "niijima",
  "journey": {
    "id": "b11-niijima-farm-table",
    "regionId": "niijima",
    "foodCultureId": "niijima-farm-table",
    "storyId": "b11-niijima-farm-table",
    "routeId": "b11-niijima-farm-table-route",
    "copy": {"ja": {"title": "新島の畑と山の食","subtitle": "新島の畑と山の食","description": "らっきょうや玉ねぎを、島の山の幸とともに読む。","tags": ["新島村"],"storyTitle": "新島の畑と山の食","intro": ["らっきょうや玉ねぎを、島の山の幸とともに読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。"]},"en": {"title": "Niijima’s fields and woodland foods","subtitle": "Niijima’s fields and woodland foods","description": "Read about rakkyo and onions alongside island woodland foods.","tags": ["Niijima Village"],"storyTitle": "Niijima’s fields and woodland foods","intro": ["Read about rakkyo and onions alongside island woodland foods.","This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands."]},"zh-TW": {"title": "新島田野與山林飲食","subtitle": "新島田野與山林飲食","description": "將蕗蕎與洋蔥和島上山林食材一同認識。","tags": ["新島村"],"storyTitle": "新島田野與山林飲食","intro": ["將蕗蕎與洋蔥和島上山林食材一同認識。","刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。"]}},
    "chapters": {"ja": [{"number": "01.","title": "食文化の記録 1","body": "農協は甘く柔らかいらっきょうのため早めに収穫すると説明し、砂質の土と冬の西ん風の中で育つ玉ねぎを紹介しています。認定目録には農協の新らっきょう塩漬けもあります。"},{"number": "02.","title": "食文化の記録 2","body": "村の案内は自然薯の生食や揚げ物を紹介し、ツワブキを「ふきんとう」と呼んで柔らかな茎を食べると説明しています。"}],"en": [{"number": "01.","title": "Food-culture notes 1","body": "JA explains harvesting rakkyo early for tenderness and sweetness, and describes onions grown in sandy soil through winter winds. The certified catalogue also lists JA’s salt-pickled young rakkyo."},{"number": "02.","title": "Food-culture notes 2","body": "The village guide describes raw and fried jinenjo yam, and calls tsuwabuki fukinto, whose tender stems are eaten."}],"zh-TW": [{"number": "01.","title": "飲食文化紀錄 1","body": "農協記載為了柔嫩甜味而提早收成蕗蕎，並介紹在砂質土壤與冬季西風中成長的洋蔥；認定目錄也列有農協鹽漬嫩蕗蕎。"},{"number": "02.","title": "飲食文化紀錄 2","body": "村政府指南介紹日本山藥的生食與油炸吃法，並將石蕗稱為 fukinto，食用其柔嫩莖部。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {
            "spotId": "b11-niijima-farm-table-ja"
          }
        ]
      }
    ]
  },
  "routeName": {"ja": "新島の畑と山の食","en": "Niijima’s fields and woodland foods","zh-TW": "新島田野與山林飲食"},
  "location": {"ja": {"area": "新島村","station": "","access": ""},"en": {"area": "Niijima Village","station": "","access": ""},"zh-TW": {"area": "新島村","station": "","access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "ferry-terminal", "name": {"ja": "新島港（黒根港）", "en": "Niijima Port (Kurone)", "zh-TW": "新島港（黑根港）"}, "spotId": "b11-niijima-farm-table-ja", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b11-niijima-farm-table-ja",
          "description": {"ja": "農協は直売所と、新島のあめりか芋、明日葉、島とうがらしを使った加工品を紹介しています。","en": "The cooperative describes its farm shop and processed foods using Niijima America-imo, ashitaba and island chilies.","zh-TW": "農協介紹其直銷所，以及使用新島美國芋、明日葉與島辣椒製作的加工品。"},
          "note": {"ja": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described.","zh-TW": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。"}
        }
      ],
      "stats": {"ja": {"time": "約90分（編集目安）","distance": "","spots": "1 か所","station": "","minutes": "","access": "","caution": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。 来島前に海路・空路の最新の運航状況をご確認ください。"},"en": {"time": "About 90 min (editorial estimate)","distance": "","spots": "1 stops","station": "","minutes": "","access": "","caution": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described. Check current sea and air access before travelling to the islands."},"zh-TW": {"time": "約 90 分鐘（編輯估計）","distance": "","spots": "1 處","station": "","minutes": "","access": "","caution": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。 前往島嶼前，請確認最新海路與空路交通狀況。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。 来島前に海路・空路の最新の運航状況をご確認ください。","en": "This information is unconfirmed. Check the sources before visiting. Check current sea and air access before travelling to the islands.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。 前往島嶼前，請確認最新海路與空路交通狀況。"}
    }
  },
  "spots": {
    "b11-niijima-farm-table-ja": {
      "visitorSourceId": "admission-access",
      "presentation": {
        "id": "b11-niijima-farm-table-ja",
        "regionId": "niijima",
        "foodCultureId": "niijima-farm-table",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "新島村農業協同組合","lead": "農協は直売所と、新島のあめりか芋、明日葉、島とうがらしを使った加工品を紹介しています。","description": "農協は直売所と、新島のあめりか芋、明日葉、島とうがらしを使った加工品を紹介しています。","tags": [],"practicalInfo": [{"label": "確認状態","value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。"]},"en": {"name": "JA Niijima","lead": "The cooperative describes its farm shop and processed foods using Niijima America-imo, ashitaba and island chilies.","description": "The cooperative describes its farm shop and processed foods using Niijima America-imo, ashitaba and island chilies.","tags": [],"practicalInfo": [{"label": "Verification","value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],"caution": ["This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands."]},"zh-TW": {"name": "新島村農業協同組合","lead": "農協介紹其直銷所，以及使用新島美國芋、明日葉與島辣椒製作的加工品。","description": "農協介紹其直銷所，以及使用新島美國芋、明日葉與島辣椒製作的加工品。","tags": [],"practicalInfo": [{"label": "確認狀態","value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution": ["刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "農協は直売所と、新島のあめりか芋、明日葉、島とうがらしを使った加工品を紹介しています。","en": "The cooperative describes its farm shop and processed foods using Niijima America-imo, ashitaba and island chilies.","zh-TW": "農協介紹其直銷所，以及使用新島美國芋、明日葉與島辣椒製作的加工品。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報","en": "Source information","zh-TW": "出處資訊"},
            "value": {"ja": "https://niijima-noukyo.or.jp/","en": "https://niijima-noukyo.or.jp/","zh-TW": "https://niijima-noukyo.or.jp/"}
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
        "name": "b11 — 新島村農業協同組合（新島村農協） | 新島村農業協同組合（新島農協）では東京新島村の農業のことを発信。Uターン・Iターンで農業を始めたい方々の支援もおこなっています。",
        "url": "https://niijima-noukyo.or.jp/",
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
          "referenceId": "b11-niijima-farm-table-ja",
          "spotId": "b11-niijima-farm-table-ja",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "新島村農業協同組合","en": "JA Niijima","zh-TW": "新島村農業協同組合"},
          "description": {"ja": "農協は直売所と、新島のあめりか芋、明日葉、島とうがらしを使った加工品を紹介しています。","en": "The cooperative describes its farm shop and processed foods using Niijima America-imo, ashitaba and island chilies.","zh-TW": "農協介紹其直銷所，以及使用新島美國芋、明日葉與島辣椒製作的加工品。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "新島村","station": ""},"en": {"region": "Niijima Village","station": ""},"zh-TW": {"region": "新島村","station": ""}}
  },
  "sources": {
    "admission-access": {"name": "Niijima Village visitor map", "url": "https://niijima-info.jp/cms24/wp-content/uploads/2026/06/niijimaA3MAP.pdf", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-26": {
      "name": "b11 — 目的から探す 人気のグルメ｜観光情報｜東京都新島村",
      "url": "https://niijima.com/kankou/purposemenu/gourmet_index.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-27": {
      "name": "b11 — 新島村農業協同組合（新島村農協） | 新島村農業協同組合（新島農協）では東京新島村の農業のことを発信。Uターン・Iターンで農業を始めたい方々の支援もおこなっています。",
      "url": "https://niijima-noukyo.or.jp/",
      "sourceType": "business",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-28": {
      "name": "b11 — 新島野菜の加工品 | 新島村農業協同組合（新島村農協）",
      "url": "https://niijima-noukyo.or.jp/processfood",
      "sourceType": "business",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-29": {
      "name": "b11 — 新島の農作物 | 新島村農業協同組合（新島村農協）",
      "url": "https://niijima-noukyo.or.jp/product",
      "sourceType": "business",
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
    "editorial": {
      "name": "b11 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://niijima-noukyo.or.jp/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {"sourceIds": ["source-26","source-27","source-28","source-29","source-30"],"origin": "editorial"},
    "routeName": {"sourceIds": ["source-26","source-27","source-28","source-29","source-30"],"origin": "editorial"},
    "location": {"sourceIds": ["source-26","source-27","source-28","source-29","source-30"],"origin": "editorial"},
    "story": {"sourceIds": ["source-26","source-27","source-28","source-29","source-30"],"origin": "editorial"},
    "journey.routeVariants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "variants": {"sourceIds": ["editorial","source-26","source-27","source-28","source-29","source-30"],"origin": "editorial"},
    "spots.b11-niijima-farm-table-ja": {"sourceIds": ["source-27","source-28"],"origin": "editorial"},
    "journey.chapters.ja.0": {"sourceIds": ["source-29","source-30"],"origin": "editorial"},
    "journey.chapters.en.0": {"sourceIds": ["source-29","source-30"],"origin": "editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds": ["source-29","source-30"],"origin": "editorial"},
    "journey.chapters.ja.1": {"sourceIds": ["source-26"],"origin": "editorial"},
    "journey.chapters.en.1": {"sourceIds": ["source-26"],"origin": "editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds": ["source-26"],"origin": "editorial"}
  }
};
