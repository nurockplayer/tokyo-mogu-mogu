import type { JourneyRecord } from '../journey-record';

export const b07KiyoseOrchardFruitRecord: JourneyRecord = {
  "municipalityId": "kiyose",
  "journey": {
    "id": "b07-kiyose-orchard-fruit",
    "regionId": "kiyose",
    "foodCultureId": "kiyose-orchard-fruit",
    "storyId": "b07-kiyose-orchard-fruit",
    "routeId": "b07-kiyose-orchard-fruit-route",
    "copy": {
      "ja": {"title":"清瀬、果樹の直売をたどる","subtitle":"清瀬、果樹の直売をたどる","description":"ぶどう、梨、栗や柿。農園案内を通して季節の果樹を知る。","tags":["清瀬市"],"storyTitle":"清瀬、果樹の直売をたどる","intro":["ぶどう、梨、栗や柿。農園案内を通して季節の果樹を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Kiyose orchard fruit and farm sales",
        "subtitle": "Kiyose orchard fruit and farm sales",
        "description": "Explore grapes, pears, chestnuts and persimmons through local farm listings.",
        "tags": ["Kiyose"],
        "storyTitle": "Kiyose orchard fruit and farm sales",
        "intro": ["Explore grapes, pears, chestnuts and persimmons through local farm listings.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"清瀨果樹與農園直賣","subtitle":"清瀨果樹與農園直賣","description":"透過農園介紹認識葡萄、梨、栗子與柿子。","tags":["清瀨市"],"storyTitle":"清瀨果樹與農園直賣","intro":["透過農園介紹認識葡萄、梨、栗子與柿子。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"清瀬のぶどう・梨・季節果樹","body":"金信園はぶどうと梨、セキ園芸はぶどう、柿、栗、ぎんなんなどを扱う直売所として紹介されています。"}],
      "en": [{"number":"01.","title":"Kiyose Orchard Fruits","body":"The directory presents Kaneshinen for grapes and pears, and Seki Engei for grapes, persimmons, chestnuts and ginkgo nuts."}],
      "zh-TW": [{"number":"01.","title":"清瀨果樹","body":"名錄介紹金信園的葡萄與梨，以及 Seki 園藝的葡萄、柿子、栗子和銀杏等直賣農產。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":120,"steps":[{"spotId":"b07-kiyose-orchard-fruit-kaneshinen"},{"spotId":"b07-kiyose-orchard-fruit-seki"}]}]
  },
  "routeName": {"ja":"清瀬、果樹の直売をたどる","en":"Kiyose orchard fruit and farm sales","zh-TW":"清瀨果樹與農園直賣"},
  "location": {"ja":{"area":"清瀬市","station":"","access":""},"en":{"area":"Kiyose","station":"","access":""},"zh-TW":{"area":"清瀨市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "旭が丘二丁目", "en": "Asahigaoka 2-chome bus stop", "zh-TW": "旭丘二丁目公車站"}, "spotId": "b07-kiyose-orchard-fruit-kaneshinen", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b07-kiyose-orchard-fruit-kaneshinen",
          "description": {"ja":"観光協会は、下宿1丁目の金信園をぶどうと梨の直売所として紹介しています。","en":"The association lists Kaneshinen in Shitajuku 1-chome for direct sales of grapes and pears.","zh-TW":"觀光協會介紹下宿一丁目的金信園，列有葡萄與梨的農園直賣。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-kiyose-orchard-fruit-seki",
          "description": {"ja":"農園案内には、ぶどう、栗、ぎんなん、柿などが掲載されています。","en":"The directory lists grapes, chestnuts, ginkgo nuts and persimmons at this outlet.","zh-TW":"農園名錄列有此直賣所的葡萄、栗子、銀杏與柿子等農產。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。"},
        "en": {
          "time": "About 120 min (editorial estimate)",
          "distance": "",
          "spots": "2 stops",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story."
        },
        "zh-TW": {"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b07-kiyose-orchard-fruit-kaneshinen": {
      "presentation": {
        "id": "b07-kiyose-orchard-fruit-kaneshinen",
        "regionId": "kiyose",
        "foodCultureId": "kiyose-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"金信園（下宿1丁目）","lead":"観光協会は、下宿1丁目の金信園をぶどうと梨の直売所として紹介しています。","description":"観光協会は、下宿1丁目の金信園をぶどうと梨の直売所として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Kaneshinen, Shitajuku 1-chome",
            "lead": "The association lists Kaneshinen in Shitajuku 1-chome for direct sales of grapes and pears.",
            "description": "The association lists Kaneshinen in Shitajuku 1-chome for direct sales of grapes and pears.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"金信園（下宿一丁目）","lead":"觀光協會介紹下宿一丁目的金信園，列有葡萄與梨的農園直賣。","description":"觀光協會介紹下宿一丁目的金信園，列有葡萄與梨的農園直賣。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会は、下宿1丁目の金信園をぶどうと梨の直売所として紹介しています。","en":"The association lists Kaneshinen in Shitajuku 1-chome for direct sales of grapes and pears.","zh-TW":"觀光協會介紹下宿一丁目的金信園，列有葡萄與梨的農園直賣。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.kiyosekanko.tokyo/useful/agri","en":"https://www.kiyosekanko.tokyo/useful/agri","zh-TW":"https://www.kiyosekanko.tokyo/useful/agri"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"農作物直売所 マップ＆検索｜清瀬市観光協会公式サイト｜その先の、感動へ。","url":"https://www.kiyosekanko.tokyo/useful/agri","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b07-kiyose-orchard-fruit-seki": {
      "presentation": {
        "id": "b07-kiyose-orchard-fruit-seki",
        "regionId": "kiyose",
        "foodCultureId": "kiyose-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"セキ園芸直売所","lead":"農園案内には、ぶどう、栗、ぎんなん、柿などが掲載されています。","description":"農園案内には、ぶどう、栗、ぎんなん、柿などが掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Seki Engei Farm Outlet",
            "lead": "The directory lists grapes, chestnuts, ginkgo nuts and persimmons at this outlet.",
            "description": "The directory lists grapes, chestnuts, ginkgo nuts and persimmons at this outlet.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Seki 園藝直賣所","lead":"農園名錄列有此直賣所的葡萄、栗子、銀杏與柿子等農產。","description":"農園名錄列有此直賣所的葡萄、栗子、銀杏與柿子等農產。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"農園案内には、ぶどう、栗、ぎんなん、柿などが掲載されています。","en":"The directory lists grapes, chestnuts, ginkgo nuts and persimmons at this outlet.","zh-TW":"農園名錄列有此直賣所的葡萄、栗子、銀杏與柿子等農產。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.kiyosekanko.tokyo/useful/agri","en":"https://www.kiyosekanko.tokyo/useful/agri","zh-TW":"https://www.kiyosekanko.tokyo/useful/agri"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"農作物直売所 マップ＆検索｜清瀬市観光協会公式サイト｜その先の、感動へ。","url":"https://www.kiyosekanko.tokyo/useful/agri","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b07-kiyose-orchard-fruit-kaneshinen",
          "spotId": "b07-kiyose-orchard-fruit-kaneshinen",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"金信園（下宿1丁目）","en":"Kaneshinen, Shitajuku 1-chome","zh-TW":"金信園（下宿一丁目）"},
          "description": {"ja":"観光協会は、下宿1丁目の金信園をぶどうと梨の直売所として紹介しています。","en":"The association lists Kaneshinen in Shitajuku 1-chome for direct sales of grapes and pears.","zh-TW":"觀光協會介紹下宿一丁目的金信園，列有葡萄與梨的農園直賣。"}
        },
        {
          "referenceId": "b07-kiyose-orchard-fruit-seki",
          "spotId": "b07-kiyose-orchard-fruit-seki",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"セキ園芸直売所","en":"Seki Engei Farm Outlet","zh-TW":"Seki 園藝直賣所"},
          "description": {"ja":"農園案内には、ぶどう、栗、ぎんなん、柿などが掲載されています。","en":"The directory lists grapes, chestnuts, ginkgo nuts and persimmons at this outlet.","zh-TW":"農園名錄列有此直賣所的葡萄、栗子、銀杏與柿子等農產。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"清瀬市","station":""},"en":{"region":"Kiyose","station":""},"zh-TW":{"region":"清瀨市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Kiyose City walking and farm-stand map", "url": "https://www.city.kiyose.lg.jp/_res/projects/default_project/_page_/001/004/763/chokubaimap202102.pdf", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-22": {"name":"農作物直売所 マップ＆検索｜清瀬市観光協会公式サイト｜その先の、感動へ。","url":"https://www.kiyosekanko.tokyo/useful/agri","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b07 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.kiyosekanko.tokyo/useful/agri","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-22"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-22"],"origin":"editorial"},
    "location": {"sourceIds":["source-22"],"origin":"editorial"},
    "story": {"sourceIds":["source-22"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-22"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-22"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-22"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-22"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-22"],"origin":"editorial"},
    "spots.b07-kiyose-orchard-fruit-kaneshinen": {"sourceIds":["source-22"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-22"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-22"],"origin":"editorial"},
    "spots.b07-kiyose-orchard-fruit-seki": {"sourceIds":["source-22"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-22"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-22"],"origin":"editorial"}
  }
};
