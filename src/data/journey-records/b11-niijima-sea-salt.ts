import type { JourneyRecord } from '../journey-record';

export const b11NiijimaSeaSaltRecord: JourneyRecord = {
  "municipalityId": "niijima",
  "journey": {
    "id": "b11-niijima-sea-salt",
    "regionId": "niijima",
    "foodCultureId": "niijima-sea-salt",
    "storyId": "b11-niijima-sea-salt",
    "routeId": "b11-niijima-sea-salt-route",
    "copy": {"ja": {"title": "新島のコーガ石と海塩","subtitle": "新島のコーガ石と海塩","description": "島の石の釜で海水を炊く製法を知る。","tags": ["新島村"],"storyTitle": "新島のコーガ石と海塩","intro": ["島の石の釜で海水を炊く製法を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。"]},"en": {"title": "Niijima koga stone and sea salt","subtitle": "Niijima koga stone and sea salt","description": "Read about seawater cooked in an island-stone kiln.","tags": ["Niijima Village"],"storyTitle": "Niijima koga stone and sea salt","intro": ["Read about seawater cooked in an island-stone kiln.","This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands."]},"zh-TW": {"title": "新島抗火石與海鹽","subtitle": "新島抗火石與海鹽","description": "認識以島石鹽釜熬煮海水的製法。","tags": ["新島村"],"storyTitle": "新島抗火石與海鹽","intro": ["認識以島石鹽釜熬煮海水的製法。","刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。"]}},
    "chapters": {"ja": [{"number": "01.","title": "食文化の記録 1","body": "認定目録はサンシャインのしおさいの塩を、新島の海水をコーガ石造りの塩釜で薪を使って炊く塩として紹介しています。"}],"en": [{"number": "01.","title": "Food-culture notes 1","body": "The catalogue describes Sunshine’s Shiosai salt as Niijima seawater cooked over firewood in a koga-stone kiln."}],"zh-TW": [{"number": "01.","title": "飲食文化紀錄 1","body": "認定目錄介紹 Sunshine 的潮騷之鹽，以新島海水在抗火石鹽釜中用柴火熬製。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {
            "spotId": "b11-niijima-sea-salt-sunshine"
          }
        ]
      }
    ]
  },
  "routeName": {"ja": "新島のコーガ石と海塩","en": "Niijima koga stone and sea salt","zh-TW": "新島抗火石與海鹽"},
  "location": {"ja": {"area": "新島村","station": "","access": ""},"en": {"area": "Niijima Village","station": "","access": ""},"zh-TW": {"area": "新島村","station": "","access": ""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b11-niijima-sea-salt-sunshine",
          "description": {"ja": "認定目録がしおさいの塩の製造者として掲載しています。","en": "The certified catalogue names Sunshine as the maker of Shiosai salt.","zh-TW": "認定目錄將 Sunshine 列為潮騷之鹽製造者。"},
          "note": {"ja": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described.","zh-TW": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。"}
        }
      ],
      "stats": {"ja": {"time": "約90分（編集目安）","distance": "","spots": "1 か所","station": "","minutes": "90","access": "","caution": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。 来島前に海路・空路の最新の運航状況をご確認ください。"},"en": {"time": "About 90 min (editorial estimate)","distance": "","spots": "1 stops","station": "","minutes": "90","access": "","caution": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described. Check current sea and air access before travelling to the islands."},"zh-TW": {"time": "約 90 分鐘（編輯估計）","distance": "","spots": "1 處","station": "","minutes": "90","access": "","caution": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。 前往島嶼前，請確認最新海路與空路交通狀況。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。 来島前に海路・空路の最新の運航状況をご確認ください。","en": "This information is unconfirmed. Check the sources before visiting. Check current sea and air access before travelling to the islands.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。 前往島嶼前，請確認最新海路與空路交通狀況。"}
    }
  },
  "spots": {
    "b11-niijima-sea-salt-sunshine": {
      "presentation": {
        "id": "b11-niijima-sea-salt-sunshine",
        "regionId": "niijima",
        "foodCultureId": "niijima-sea-salt",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "サンシャイン","lead": "認定目録がしおさいの塩の製造者として掲載しています。","description": "認定目録がしおさいの塩の製造者として掲載しています。","tags": [],"practicalInfo": [{"label": "確認状態","value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。","出典に記載された生産者です。訪問者の立ち入り可否は確認できていません。"]},"en": {"name": "Sunshine","lead": "The certified catalogue names Sunshine as the maker of Shiosai salt.","description": "The certified catalogue names Sunshine as the maker of Shiosai salt.","tags": [],"practicalInfo": [{"label": "Verification","value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],"caution": ["This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands.","This is a documented producer. Public visitor access has not been established."]},"zh-TW": {"name": "Sunshine","lead": "認定目錄將 Sunshine 列為潮騷之鹽製造者。","description": "認定目錄將 Sunshine 列為潮騷之鹽製造者。","tags": [],"practicalInfo": [{"label": "確認狀態","value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution": ["刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。","此為出處記載的生產者，尚未確認是否開放訪客進入。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "認定目録がしおさいの塩の製造者として掲載しています。","en": "The certified catalogue names Sunshine as the maker of Shiosai salt.","zh-TW": "認定目錄將 Sunshine 列為潮騷之鹽製造者。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報","en": "Source information","zh-TW": "出處資訊"},
            "value": {"ja": "https://niijima.or.jp/shokokai/mission/%E8%AA%8D%E5%AE%9A%E3%83%96%E3%83%A9%E3%83%B3%E3%83%89%E4%BA%8B%E6%A5%AD/","en": "https://niijima.or.jp/shokokai/mission/%E8%AA%8D%E5%AE%9A%E3%83%96%E3%83%A9%E3%83%B3%E3%83%89%E4%BA%8B%E6%A5%AD/","zh-TW": "https://niijima.or.jp/shokokai/mission/%E8%AA%8D%E5%AE%9A%E3%83%96%E3%83%A9%E3%83%B3%E3%83%89%E4%BA%8B%E6%A5%AD/"}
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
          {"ja": "来島前に海路・空路の最新の運航状況をご確認ください。","en": "Check current sea and air access before travelling to the islands.","zh-TW": "前往島嶼前，請確認最新海路與空路交通狀況。"},
          {"ja": "出典に記載された生産者です。訪問者の立ち入り可否は確認できていません。","en": "This is a documented producer. Public visitor access has not been established.","zh-TW": "此為出處記載的生產者，尚未確認是否開放訪客進入。"}
        ]
      },
      "officialSource": {
        "name": "b11 — 新島村商工会｜認定ブランド事業",
        "url": "https://niijima.or.jp/shokokai/mission/%E8%AA%8D%E5%AE%9A%E3%83%96%E3%83%A9%E3%83%B3%E3%83%89%E4%BA%8B%E6%A5%AD/",
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
          "referenceId": "b11-niijima-sea-salt-sunshine",
          "spotId": "b11-niijima-sea-salt-sunshine",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "サンシャイン","en": "Sunshine","zh-TW": "Sunshine"},
          "description": {"ja": "認定目録がしおさいの塩の製造者として掲載しています。","en": "The certified catalogue names Sunshine as the maker of Shiosai salt.","zh-TW": "認定目錄將 Sunshine 列為潮騷之鹽製造者。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "新島村","station": ""},"en": {"region": "Niijima Village","station": ""},"zh-TW": {"region": "新島村","station": ""}}
  },
  "sources": {
    "source-30": {
      "name": "b11 — 新島村商工会｜認定ブランド事業",
      "url": "https://niijima.or.jp/shokokai/mission/%E8%AA%8D%E5%AE%9A%E3%83%96%E3%83%A9%E3%83%B3%E3%83%89%E4%BA%8B%E6%A5%AD/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b11 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://niijima.or.jp/shokokai/mission/%E8%AA%8D%E5%AE%9A%E3%83%96%E3%83%A9%E3%83%B3%E3%83%89%E4%BA%8B%E6%A5%AD/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {"sourceIds": ["source-30"],"origin": "editorial"},
    "routeName": {"sourceIds": ["source-30"],"origin": "editorial"},
    "location": {"sourceIds": ["source-30"],"origin": "editorial"},
    "story": {"sourceIds": ["source-30"],"origin": "editorial"},
    "journey.routeVariants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "variants": {"sourceIds": ["editorial","source-30"],"origin": "editorial"},
    "spots.b11-niijima-sea-salt-sunshine": {"sourceIds": ["source-30"],"origin": "editorial"},
    "journey.chapters.ja.0": {"sourceIds": ["source-30"],"origin": "editorial"},
    "journey.chapters.en.0": {"sourceIds": ["source-30"],"origin": "editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds": ["source-30"],"origin": "editorial"}
  }
};
