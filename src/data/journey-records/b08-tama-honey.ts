import type { JourneyRecord } from '../journey-record';

export const b08TamaHoneyRecord: JourneyRecord = {
  "municipalityId": "tama",
  "journey": {
    "id": "b08-tama-honey",
    "regionId": "tama",
    "foodCultureId": "tama-honey",
    "storyId": "b08-tama-honey",
    "routeId": "b08-tama-honey-route",
    "copy": {
      "ja": {"title":"聖蹟桜ヶ丘の丘と蜂蜜","subtitle":"聖蹟桜ヶ丘の丘と蜂蜜","description":"はちみつレコードの養蜂と、季節の花の蜜をたどる。","tags":["多摩市"],"storyTitle":"聖蹟桜ヶ丘の丘と蜂蜜","intro":["はちみつレコードの養蜂と、季節の花の蜜をたどる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Honey from the Seiseki hills","subtitle":"Honey from the Seiseki hills","description":"Explore Hachimitsu Record’s beekeeping and seasonal flower honey.","tags":["Tama City"],"storyTitle":"Honey from the Seiseki hills","intro":["Explore Hachimitsu Record’s beekeeping and seasonal flower honey.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"聖蹟櫻丘丘陵與蜂蜜","subtitle":"聖蹟櫻丘丘陵與蜂蜜","description":"認識Hachimitsu Record的養蜂與季節花蜜。","tags":["多摩市"],"storyTitle":"聖蹟櫻丘丘陵與蜂蜜","intro":["認識Hachimitsu Record的養蜂與季節花蜜。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"はちみつレコード","body":"生産者紹介では、はちみつレコードは聖蹟桜ヶ丘の丘陵で養蜂し、春・初夏・夏の東京の花の蜜を紹介。多摩市の取扱先にはPonteが挙げられています。"}
      ],
      "en": [
        {"number":"01.","title":"Hachimitsu Record Local Honey","body":"The producer profile describes Hachimitsu Record keeping bees in the Seiseki-Sakuragaoka hills and distinguishing honey from Tokyo flowers in spring, early summer and summer. It names Ponte as a Tama outlet."}
      ],
      "zh-TW": [
        {"number":"01.","title":"Hachimitsu Record蜂蜜","body":"生產者介紹記載Hachimitsu Record於聖蹟櫻丘丘陵養蜂，區分春、初夏與夏季東京花蜜，並列出多摩市的Ponte為相關店舖。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b08-tama-honey-ponte"}
        ]
      }
    ]
  },
  "routeName": {"ja":"聖蹟桜ヶ丘の丘と蜂蜜","en":"Honey from the Seiseki hills","zh-TW":"聖蹟櫻丘丘陵與蜂蜜"},
  "location": {
    "ja": {"area":"多摩市","station":"","access":""},
    "en": {"area":"Tama City","station":"","access":""},
    "zh-TW": {"area":"多摩市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b08-tama-honey-ponte",
          "description": {"ja":"生産者紹介は、はちみつレコードの取扱先としてPonteを挙げています。","en":"The producer profile names Ponte as an outlet for Hachimitsu Record.","zh-TW":"生產者介紹列出Ponte為Hachimitsu Record的相關店舖。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        }
      ],
      "stats": {
        "ja": {"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。"},
        "en": {"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stop","station":"","minutes":"90","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops."},
        "zh-TW": {"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b08-tama-honey-ponte": {
      "presentation": {
        "id": "b08-tama-honey-ponte",
        "regionId": "tama",
        "foodCultureId": "tama-honey",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "Ponte（ポンテ）",
            "lead": "生産者紹介は、はちみつレコードの取扱先としてPonteを挙げています。",
            "description": "生産者紹介は、はちみつレコードの取扱先としてPonteを挙げています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Ponte",
            "lead": "The producer profile names Ponte as an outlet for Hachimitsu Record.",
            "description": "The producer profile names Ponte as an outlet for Hachimitsu Record.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "Ponte",
            "lead": "生產者介紹列出Ponte為Hachimitsu Record的相關店舖。",
            "description": "生產者介紹列出Ponte為Hachimitsu Record的相關店舖。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認狀態","value":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
            ],
            "caution": [
              "刊載內容尚未確認。造訪前請查看出處資訊。"
            ]
          }
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"生産者紹介は、はちみつレコードの取扱先としてPonteを挙げています。","en":"The producer profile names Ponte as an outlet for Hachimitsu Record.","zh-TW":"生產者介紹列出Ponte為Hachimitsu Record的相關店舖。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.tokyo-aff-fc.jp/interview/detail/id=1165","en":"https://www.tokyo-aff-fc.jp/interview/detail/id=1165","zh-TW":"https://www.tokyo-aff-fc.jp/interview/detail/id=1165"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"生産者インタビュー詳細：はちみつレコード","url":"https://www.tokyo-aff-fc.jp/interview/detail/id=1165","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-tama-honey-ponte",
          "spotId": "b08-tama-honey-ponte",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"Ponte（ポンテ）","en":"Ponte","zh-TW":"Ponte"},
          "description": {"ja":"生産者紹介は、はちみつレコードの取扱先としてPonteを挙げています。","en":"The producer profile names Ponte as an outlet for Hachimitsu Record.","zh-TW":"生產者介紹列出Ponte為Hachimitsu Record的相關店舖。"}
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {"region":"多摩市","station":""},
      "en": {"region":"Tama City","station":""},
      "zh-TW": {"region":"多摩市","station":""}
    }
  },
  "sources": {
    "source-12": {"name":"生産者インタビュー詳細：はちみつレコード","url":"https://www.tokyo-aff-fc.jp/interview/detail/id=1165","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://www.tokyo-aff-fc.jp/interview/detail/id=1165","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-12"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-12"],"origin":"editorial"},
    "location": {"sourceIds":["source-12"],"origin":"editorial"},
    "story": {"sourceIds":["source-12"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-12"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-12"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-12"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-12"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-12"],"origin":"editorial"},
    "spots.b08-tama-honey-ponte": {"sourceIds":["source-12"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-12"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-12"],"origin":"editorial"}
  }
};
