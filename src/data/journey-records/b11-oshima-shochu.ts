import type { JourneyRecord } from '../journey-record';

export const b11OshimaShochuRecord: JourneyRecord = {
  "municipalityId": "oshima",
  "journey": {
    "id": "b11-oshima-shochu",
    "regionId": "oshima",
    "foodCultureId": "oshima-shochu",
    "storyId": "b11-oshima-shochu",
    "routeId": "b11-oshima-shochu-route",
    "copy": {"ja": {"title": "大島の御神火と島焼酎","subtitle": "大島の御神火と島焼酎","description": "島の蔵元と明日葉焼酎を出典から知る。","tags": ["大島町"],"storyTitle": "大島の御神火と島焼酎","intro": ["島の蔵元と明日葉焼酎を出典から知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。"]},"en": {"title": "Gojinka and Oshima shochu","subtitle": "Gojinka and Oshima shochu","description": "Read about an island distiller and ashitaba shochu.","tags": ["Oshima Town"],"storyTitle": "Gojinka and Oshima shochu","intro": ["Read about an island distiller and ashitaba shochu.","This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands."]},"zh-TW": {"title": "大島御神火與島燒酎","subtitle": "大島御神火與島燒酎","description": "從出處認識島上酒藏與明日葉燒酎。","tags": ["大島町"],"storyTitle": "大島御神火與島燒酎","intro": ["從出處認識島上酒藏與明日葉燒酎。","刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。"]}},
    "chapters": {"ja": [{"number": "01.","title": "食文化の記録 1","body": "東京七島酒造組合は大島の谷口酒造を紹介し、昭和12年の創業と御神火の銘柄を記録しています。"},{"number": "02.","title": "食文化の記録 2","body": "観光協会は、大島の特産である明日葉から作る焼酎も紹介しています。谷口酒造の製品であるとは断定していません。"}],"en": [{"number": "01.","title": "Food-culture notes 1","body": "The Tokyo Seven Islands distillers’ association introduces Oshima’s Taniguchi Distillery, its 1937 founding and Gojinka range."},{"number": "02.","title": "Food-culture notes 2","body": "The tourism association also describes shochu made with Oshima ashitaba, without attributing it to Taniguchi."}],"zh-TW": [{"number": "01.","title": "飲食文化紀錄 1","body": "東京七島酒造組合介紹大島谷口酒造，記載其 1937 年創業及御神火系列。"},{"number": "02.","title": "飲食文化紀錄 2","body": "觀光協會也介紹使用大島明日葉製作的燒酎，並未將其歸為谷口酒造產品。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {
            "spotId": "b11-oshima-shochu-taniguchi"
          }
        ]
      }
    ]
  },
  "routeName": {"ja": "大島の御神火と島焼酎","en": "Gojinka and Oshima shochu","zh-TW": "大島御神火與島燒酎"},
  "location": {"ja": {"area": "大島町","station": "","access": ""},"en": {"area": "Oshima Town","station": "","access": ""},"zh-TW": {"area": "大島町","station": "","access": ""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b11-oshima-shochu-taniguchi",
          "description": {"ja": "東京七島酒造組合が、大島の御神火の蔵元として紹介しています。","en": "The distillers’ association identifies this Oshima producer with Gojinka shochu.","zh-TW": "酒造組合將此大島酒藏與御神火燒酎相連介紹。"},
          "note": {"ja": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described.","zh-TW": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。"}
        }
      ],
      "stats": {"ja": {"time": "約90分（編集目安）","distance": "","spots": "1 か所","station": "","minutes": "90","access": "","caution": "時間と順序は編集上の目安です。移動経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。 来島前に海路・空路の最新の運航状況をご確認ください。"},"en": {"time": "About 90 min (editorial estimate)","distance": "","spots": "1 stops","station": "","minutes": "90","access": "","caution": "Timing and order are editorial estimates. Check your own directions. Stops do not necessarily offer every food described. Check current sea and air access before travelling to the islands."},"zh-TW": {"time": "約 90 分鐘（編輯估計）","distance": "","spots": "1 處","station": "","minutes": "90","access": "","caution": "時間與順序為編輯估計，請自行確認移動路線。景點不代表供應文中所有料理。 前往島嶼前，請確認最新海路與空路交通狀況。"}},
      "guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。 来島前に海路・空路の最新の運航状況をご確認ください。","en": "This information is unconfirmed. Check the sources before visiting. Check current sea and air access before travelling to the islands.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。 前往島嶼前，請確認最新海路與空路交通狀況。"}
    }
  },
  "spots": {
    "b11-oshima-shochu-taniguchi": {
      "presentation": {
        "id": "b11-oshima-shochu-taniguchi",
        "regionId": "oshima",
        "foodCultureId": "oshima-shochu",
        "thumbnailAssetIds": [],
        "copy": {"ja": {"name": "谷口酒造","lead": "東京七島酒造組合が、大島の御神火の蔵元として紹介しています。","description": "東京七島酒造組合が、大島の御神火の蔵元として紹介しています。","tags": [],"practicalInfo": [{"label": "確認状態","value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。","来島前に海路・空路の最新の運航状況をご確認ください。","出典に記載された生産者です。訪問者の立ち入り可否は確認できていません。"]},"en": {"name": "Taniguchi Distillery","lead": "The distillers’ association identifies this Oshima producer with Gojinka shochu.","description": "The distillers’ association identifies this Oshima producer with Gojinka shochu.","tags": [],"practicalInfo": [{"label": "Verification","value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],"caution": ["This information is unconfirmed. Check the sources before visiting.","Check current sea and air access before travelling to the islands.","This is a documented producer. Public visitor access has not been established."]},"zh-TW": {"name": "谷口酒造","lead": "酒造組合將此大島酒藏與御神火燒酎相連介紹。","description": "酒造組合將此大島酒藏與御神火燒酎相連介紹。","tags": [],"practicalInfo": [{"label": "確認狀態","value": "2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution": ["刊載內容尚未確認。造訪前請查看出處資訊。","前往島嶼前，請確認最新海路與空路交通狀況。","此為出處記載的生產者，尚未確認是否開放訪客進入。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja": "東京七島酒造組合が、大島の御神火の蔵元として紹介しています。","en": "The distillers’ association identifies this Oshima producer with Gojinka shochu.","zh-TW": "酒造組合將此大島酒藏與御神火燒酎相連介紹。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja": "出典情報","en": "Source information","zh-TW": "出處資訊"},
            "value": {"ja": "https://shimazake.com/kuramotolist/taniguchi/","en": "https://shimazake.com/kuramotolist/taniguchi/","zh-TW": "https://shimazake.com/kuramotolist/taniguchi/"}
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
        "name": "b11 — 有限会社谷口酒造 | 蔵元一覧 | 東京七島酒造組合",
        "url": "https://shimazake.com/kuramotolist/taniguchi/",
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
          "referenceId": "b11-oshima-shochu-taniguchi",
          "spotId": "b11-oshima-shochu-taniguchi",
          "badgeColor": "#E98A1C",
          "badge": {"ja": "谷口酒造","en": "Taniguchi Distillery","zh-TW": "谷口酒造"},
          "description": {"ja": "東京七島酒造組合が、大島の御神火の蔵元として紹介しています。","en": "The distillers’ association identifies this Oshima producer with Gojinka shochu.","zh-TW": "酒造組合將此大島酒藏與御神火燒酎相連介紹。"}
        }
      ],
      "nature": []
    },
    "location": {"ja": {"region": "大島町","station": ""},"en": {"region": "Oshima Town","station": ""},"zh-TW": {"region": "大島町","station": ""}}
  },
  "sources": {
    "source-0": {
      "name": "b11 — 特産品（Specialty goods）） | 一般社団法人大島観光協会",
      "url": "https://izu-oshima.or.jp/specialty.html",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "source-11": {
      "name": "b11 — 有限会社谷口酒造 | 蔵元一覧 | 東京七島酒造組合",
      "url": "https://shimazake.com/kuramotolist/taniguchi/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {
      "name": "b11 editorial itinerary — timing and order estimates, not a timetable",
      "url": "https://shimazake.com/kuramotolist/taniguchi/",
      "sourceType": "manual",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    }
  },
  "facts": {
    "journey.copy": {"sourceIds": ["source-0","source-11"],"origin": "editorial"},
    "routeName": {"sourceIds": ["source-0","source-11"],"origin": "editorial"},
    "location": {"sourceIds": ["source-0","source-11"],"origin": "editorial"},
    "story": {"sourceIds": ["source-0","source-11"],"origin": "editorial"},
    "journey.routeVariants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "variants": {"sourceIds": ["editorial","source-0","source-11"],"origin": "editorial"},
    "spots.b11-oshima-shochu-taniguchi": {"sourceIds": ["source-11"],"origin": "editorial"},
    "journey.chapters.ja.0": {"sourceIds": ["source-11"],"origin": "editorial"},
    "journey.chapters.en.0": {"sourceIds": ["source-11"],"origin": "editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds": ["source-11"],"origin": "editorial"},
    "journey.chapters.ja.1": {"sourceIds": ["source-0"],"origin": "editorial"},
    "journey.chapters.en.1": {"sourceIds": ["source-0"],"origin": "editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds": ["source-0"],"origin": "editorial"}
  }
};
