import type { JourneyRecord } from '../journey-record';

export const b02MitakaOrchardFruitRecord: JourneyRecord = {
  "municipalityId": "mitaka",
  "journey": {
    "id": "b02-mitaka-orchard-fruit",
    "regionId": "mitaka",
    "foodCultureId": "mitaka-orchard-fruit",
    "storyId": "b02-mitaka-orchard-fruit",
    "routeId": "b02-mitaka-orchard-fruit-route",
    "copy": {
      "ja": {"title":"三鷹の果樹園を知る","subtitle":"三鷹の果樹園を知る","description":"ギンナン、ぶどう、ブルーベリーの作り手をたどる。","tags":["三鷹市"],"storyTitle":"三鷹の果樹園を知る","intro":["ギンナン、ぶどう、ブルーベリーの作り手をたどる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Discover Mitaka’s orchards",
        "subtitle": "Discover Mitaka’s orchards",
        "description": "Read about growers of ginkgo nuts, grapes and blueberries.",
        "tags": ["Mitaka"],
        "storyTitle": "Discover Mitaka’s orchards",
        "intro": ["Read about growers of ginkgo nuts, grapes and blueberries.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"認識三鷹的果園","subtitle":"認識三鷹的果園","description":"走近銀杏果、葡萄與藍莓的栽培者。","tags":["三鷹市"],"storyTitle":"認識三鷹的果園","intro":["走近銀杏果、葡萄與藍莓的栽培者。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"ギンナンの作り手","body":"山本果樹園は三鷹で1992年頃からギンナンを作り、嶺南や金兵衛を栽培していると紹介しています。"},{"number":"02.","title":"野崎のブルーベリー","body":"観光協会の2026年の記事は、野崎の吉野果樹園でのブルーベリー摘み取りを紹介しています。"},{"number":"03.","title":"ぶどうを中心に","body":"ファームたかはしは、三鷹でぶどうを中心に、ブルーベリーやキウイ、柿、ギンナンも栽培する果樹農家と紹介しています。"}],
      "en": [
        {"number":"01.","title":"A ginkgo-nut grower","body":"Yamamoto Orchard describes growing ginkgo nuts in Mitaka since around 1992 and names Reinan and Kinbei varieties."},
        {"number":"02.","title":"Blueberries in Nozaki","body":"A 2026 tourism-association article recounts blueberry picking at Yoshino Orchard in Nozaki."},
        {"number":"03.","title":"An orchard centred on grapes","body":"Farm Takahashi describes itself as a Mitaka orchard centred on grapes, also growing blueberries, kiwis, persimmons and ginkgo nuts."}
      ],
      "zh-TW": [{"number":"01.","title":"銀杏果的種植者","body":"山本果樹園介紹自約 1992 年起於三鷹栽培銀杏果，品種包括嶺南與金兵衛。"},{"number":"02.","title":"野崎的藍莓","body":"觀光協會 2026 年文章記錄在野崎吉野果樹園採摘藍莓的體驗。"},{"number":"03.","title":"以葡萄為主的果園","body":"Farm Takahashi 介紹自己為三鷹以葡萄為主的果農，也栽培藍莓、奇異果、柿子與銀杏果。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":210,"steps":[{"spotId":"b02-mitaka-orchard-fruit-yamamoto"},{"spotId":"b02-mitaka-orchard-fruit-takahashi"},{"spotId":"b02-mitaka-orchard-fruit-yoshino"}]}]
  },
  "routeName": {"ja":"三鷹の果樹園を知る","en":"Discover Mitaka’s orchards","zh-TW":"認識三鷹的果園"},
  "location": {"ja":{"area":"三鷹市","station":"","access":""},"en":{"area":"Mitaka","station":"","access":""},"zh-TW":{"area":"三鷹市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "連雀通り", "en": "Renjaku-dori bus stop", "zh-TW": "連雀通公車站"}, "spotId": "b02-mitaka-orchard-fruit-takahashi", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b02-mitaka-orchard-fruit-yamamoto",
          "description": {"ja":"園の公式紹介は、三鷹でのギンナン栽培を伝えています。","en":"The orchard’s own introduction describes its ginkgo-nut cultivation in Mitaka.","zh-TW":"果園官方介紹記載其在三鷹種植銀杏果。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        },
        {
          "spotId": "b02-mitaka-orchard-fruit-takahashi",
          "description": {"ja":"公式サイトは、三鷹のぶどうとブルーベリーなどの栽培を紹介しています。","en":"The official site describes grapes, blueberries and other orchard crops grown in Mitaka.","zh-TW":"官方網站介紹於三鷹栽培的葡萄、藍莓等果樹作物。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        },
        {
          "spotId": "b02-mitaka-orchard-fruit-yoshino",
          "description": {"ja":"観光協会が野崎のブルーベリー園として取り上げています。","en":"The tourism association features this Nozaki blueberry orchard.","zh-TW":"觀光協會介紹此位於野崎的藍莓果園。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        }
      ],
      "stats": {
        "ja": {"time":"約210分（編集目安）","distance":"","spots":"3 か所","station":"","minutes":"210","access":"","caution":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。"},
        "en": {"time":"About 210 min (editorial estimate)","distance":"","spots":"3 stops","station":"","minutes":"210","access":"","caution":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described."},
        "zh-TW": {"time":"約 210 分鐘（編輯估計）","distance":"","spots":"3 處","station":"","minutes":"210","access":"","caution":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b02-mitaka-orchard-fruit-yamamoto": {
      "presentation": {
        "id": "b02-mitaka-orchard-fruit-yamamoto",
        "regionId": "mitaka",
        "foodCultureId": "mitaka-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"山本果樹園","lead":"園の公式紹介は、三鷹でのギンナン栽培を伝えています。","description":"園の公式紹介は、三鷹でのギンナン栽培を伝えています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Yamamoto Orchard",
            "lead": "The orchard’s own introduction describes its ginkgo-nut cultivation in Mitaka.",
            "description": "The orchard’s own introduction describes its ginkgo-nut cultivation in Mitaka.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"山本果樹園","lead":"果園官方介紹記載其在三鷹種植銀杏果。","description":"果園官方介紹記載其在三鷹種植銀杏果。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"園の公式紹介は、三鷹でのギンナン栽培を伝えています。","en":"The orchard’s own introduction describes its ginkgo-nut cultivation in Mitaka.","zh-TW":"果園官方介紹記載其在三鷹種植銀杏果。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://mitaka-yamamotokajuen.tokyo/","en":"https://mitaka-yamamotokajuen.tokyo/","zh-TW":"https://mitaka-yamamotokajuen.tokyo/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"Yamamoto Orchard — introduction","url":"https://mitaka-yamamotokajuen.tokyo/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b02-mitaka-orchard-fruit-takahashi": {
      "presentation": {
        "id": "b02-mitaka-orchard-fruit-takahashi",
        "regionId": "mitaka",
        "foodCultureId": "mitaka-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"ファームたかはし","lead":"公式サイトは、三鷹のぶどうとブルーベリーなどの栽培を紹介しています。","description":"公式サイトは、三鷹のぶどうとブルーベリーなどの栽培を紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Farm Takahashi",
            "lead": "The official site describes grapes, blueberries and other orchard crops grown in Mitaka.",
            "description": "The official site describes grapes, blueberries and other orchard crops grown in Mitaka.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Farm Takahashi","lead":"官方網站介紹於三鷹栽培的葡萄、藍莓等果樹作物。","description":"官方網站介紹於三鷹栽培的葡萄、藍莓等果樹作物。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"公式サイトは、三鷹のぶどうとブルーベリーなどの栽培を紹介しています。","en":"The official site describes grapes, blueberries and other orchard crops grown in Mitaka.","zh-TW":"官方網站介紹於三鷹栽培的葡萄、藍莓等果樹作物。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://farm-t.tokyo/","en":"https://farm-t.tokyo/","zh-TW":"https://farm-t.tokyo/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"Farm Takahashi — orchard introduction","url":"https://farm-t.tokyo/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b02-mitaka-orchard-fruit-yoshino": {
      "presentation": {
        "id": "b02-mitaka-orchard-fruit-yoshino",
        "regionId": "mitaka",
        "foodCultureId": "mitaka-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"吉野果樹園","lead":"観光協会が野崎のブルーベリー園として取り上げています。","description":"観光協会が野崎のブルーベリー園として取り上げています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。","過去の紹介に基づく記録です。現在の提供や訪問の可否を示すものではありません。"]},
          "en": {
            "name": "Yoshino Orchard",
            "lead": "The tourism association features this Nozaki blueberry orchard.",
            "description": "The tourism association features this Nozaki blueberry orchard.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting.","This account is based on a past publication. It does not establish current service or visitor access."]
          },
          "zh-TW": {"name":"吉野果樹園","lead":"觀光協會介紹此位於野崎的藍莓果園。","description":"觀光協會介紹此位於野崎的藍莓果園。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。","本記錄依據過去刊載資料，不代表目前仍提供相關服務或可供造訪。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会が野崎のブルーベリー園として取り上げています。","en":"The tourism association features this Nozaki blueberry orchard.","zh-TW":"觀光協會介紹此位於野崎的藍莓果園。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://kanko.mitaka.ne.jp/docs/2026070800010/","en":"https://kanko.mitaka.ne.jp/docs/2026070800010/","zh-TW":"https://kanko.mitaka.ne.jp/docs/2026070800010/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"過去の紹介に基づく記録です。現在の提供や訪問の可否を示すものではありません。","en":"This account is based on a past publication. It does not establish current service or visitor access.","zh-TW":"本記錄依據過去刊載資料，不代表目前仍提供相關服務或可供造訪。"}]
      },
      "officialSource": {"name":"みたか都市観光協会 — 吉野果樹園 ブルーベリー摘み取り","url":"https://kanko.mitaka.ne.jp/docs/2026070800010/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {"referenceId":"b02-mitaka-orchard-fruit-yamamoto","spotId":"b02-mitaka-orchard-fruit-yamamoto","badgeColor":"#E98A1C","badge":{"ja":"山本果樹園","en":"Yamamoto Orchard","zh-TW":"山本果樹園"},"description":{"ja":"園の公式紹介は、三鷹でのギンナン栽培を伝えています。","en":"The orchard’s own introduction describes its ginkgo-nut cultivation in Mitaka.","zh-TW":"果園官方介紹記載其在三鷹種植銀杏果。"}},
        {
          "referenceId": "b02-mitaka-orchard-fruit-takahashi",
          "spotId": "b02-mitaka-orchard-fruit-takahashi",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"ファームたかはし","en":"Farm Takahashi","zh-TW":"Farm Takahashi"},
          "description": {"ja":"公式サイトは、三鷹のぶどうとブルーベリーなどの栽培を紹介しています。","en":"The official site describes grapes, blueberries and other orchard crops grown in Mitaka.","zh-TW":"官方網站介紹於三鷹栽培的葡萄、藍莓等果樹作物。"}
        },
        {"referenceId":"b02-mitaka-orchard-fruit-yoshino","spotId":"b02-mitaka-orchard-fruit-yoshino","badgeColor":"#E98A1C","badge":{"ja":"吉野果樹園","en":"Yoshino Orchard","zh-TW":"吉野果樹園"},"description":{"ja":"観光協会が野崎のブルーベリー園として取り上げています。","en":"The tourism association features this Nozaki blueberry orchard.","zh-TW":"觀光協會介紹此位於野崎的藍莓果園。"}}
      ],
      "nature": []
    },
    "location": {"ja":{"region":"三鷹市","station":""},"en":{"region":"Mitaka","station":""},"zh-TW":{"region":"三鷹市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Farm Takahashi – directions", "url": "https://farm-t.tokyo/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-8": {"name":"Yamamoto Orchard — introduction","url":"https://mitaka-yamamotokajuen.tokyo/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-9": {"name":"みたか都市観光協会 — 吉野果樹園 ブルーベリー摘み取り","url":"https://kanko.mitaka.ne.jp/docs/2026070800010/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-10": {"name":"Farm Takahashi — orchard introduction","url":"https://farm-t.tokyo/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://mitaka-yamamotokajuen.tokyo/","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-8","source-9","source-10"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-8","source-9","source-10"],"origin":"editorial"},
    "location": {"sourceIds":["source-8","source-9","source-10"],"origin":"editorial"},
    "story": {"sourceIds":["source-8","source-9","source-10"],"origin":"editorial"},
    "spots": {"sourceIds":["source-8","source-9","source-10"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-8","source-9","source-10"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-8"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-8"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-8"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-9"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-9"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-9"],"origin":"editorial"},
    "journey.chapters.ja.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b02-mitaka-orchard-fruit-yamamoto": {"sourceIds":["source-8"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-8"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-8"],"origin":"editorial"},
    "spots.b02-mitaka-orchard-fruit-takahashi": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b02-mitaka-orchard-fruit-yoshino": {"sourceIds":["source-9"],"origin":"editorial"},
    "story.groups.nearby.2": {"sourceIds":["source-9"],"origin":"editorial"},
    "variants.half-day.steps.2.description": {"sourceIds":["source-9"],"origin":"editorial"}
  }
};
