import type { JourneyRecord } from '../journey-record';

export const b04KoganeiKiwiRecord: JourneyRecord = {
  "municipalityId": "koganei",
  "journey": {
    "id": "b04-koganei-kiwi",
    "regionId": "koganei",
    "foodCultureId": "koganei-kiwi",
    "storyId": "b04-koganei-kiwi",
    "routeId": "b04-koganei-kiwi-route",
    "copy": {
      "ja": {"title":"小金井のキウイ果樹園","subtitle":"小金井のキウイ果樹園","description":"JAの果樹園案内から、品種と加工の工夫を知る。","tags":["小金井市"],"storyTitle":"小金井のキウイ果樹園","intro":["JAの果樹園案内から、品種と加工の工夫を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Koganei’s kiwi orchards",
        "subtitle": "Koganei’s kiwi orchards",
        "description": "Meet kiwi varieties and preserves through JA’s orchard guide.",
        "tags": ["Koganei"],
        "storyTitle": "Koganei’s kiwi orchards",
        "intro": ["Meet kiwi varieties and preserves through JA’s orchard guide.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"小金井奇異果果園","subtitle":"小金井奇異果果園","description":"從 JA 果園介紹認識奇異果品種與加工方式。","tags":["小金井市"],"storyTitle":"小金井奇異果果園","intro":["從 JA 果園介紹認識奇異果品種與加工方式。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"小金井産キウイフルーツ","body":"JAの2021年の案内では、はけの道果樹園にヘイワードとレインボーレッド、もとはし果樹園に東京ゴールドなどの品種とキウイジャムが紹介されています。"}],
      "en": [{"number":"01.","title":"Koganei-grown kiwifruit","body":"JA’s 2021 listings name Hayward and Rainbow Red at Hake-no-Michi Orchard, and varieties including Tokyo Gold plus kiwi jam at Motohashi Orchard."}],
      "zh-TW": [{"number":"01.","title":"小金井產奇異果","body":"JA 的 2021 年介紹記載 Hake-no-Michi 果園的海沃德與彩虹紅心，以及 Motohashi 果園的東京黃金等品種與奇異果果醬。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":120,"steps":[{"spotId":"b04-koganei-kiwi-hake"},{"spotId":"b04-koganei-kiwi-motohashi"}]}]
  },
  "routeName": {"ja":"小金井のキウイ果樹園","en":"Koganei’s kiwi orchards","zh-TW":"小金井奇異果果園"},
  "location": {"ja":{"area":"小金井市","station":"","access":""},"en":{"area":"Koganei","station":"","access":""},"zh-TW":{"area":"小金井市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "武蔵小金井駅", "en": "Musashi-Koganei Station", "zh-TW": "武藏小金井站"}, "spotId": "b04-koganei-kiwi-motohashi", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b04-koganei-kiwi-hake",
          "description": {"ja":"JAの2021年の案内にキウイの直売農園として掲載されています。","en":"JA’s 2021 directory lists this kiwi orchard for direct sales.","zh-TW":"JA 的 2021 年資料將此果園列為奇異果直賣農園。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"
          }
        },
        {
          "spotId": "b04-koganei-kiwi-motohashi",
          "description": {"ja":"JAの2021年の案内にキウイとキウイジャムが掲載されています。","en":"JA’s 2021 directory lists this orchard with kiwi fruit and kiwi jam.","zh-TW":"JA 的 2021 年資料介紹此果園的奇異果與奇異果果醬。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。"},
        "en": {
          "time": "About 120 min (editorial estimate)",
          "distance": "",
          "spots": "2 stops",
          "station": "",
          "minutes": "120",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing."
        },
        "zh-TW": {"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b04-koganei-kiwi-hake": {
      "presentation": {
        "id": "b04-koganei-kiwi-hake",
        "regionId": "koganei",
        "foodCultureId": "koganei-kiwi",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"はけの道果樹園","lead":"JAの2021年の案内にキウイの直売農園として掲載されています。","description":"JAの2021年の案内にキウイの直売農園として掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Hake-no-Michi Orchard",
            "lead": "JA’s 2021 directory lists this kiwi orchard for direct sales.",
            "description": "JA’s 2021 directory lists this kiwi orchard for direct sales.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Hake-no-Michi 果園","lead":"JA 的 2021 年資料將此果園列為奇異果直賣農園。","description":"JA 的 2021 年資料將此果園列為奇異果直賣農園。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"JAの2021年の案内にキウイの直売農園として掲載されています。","en":"JA’s 2021 directory lists this kiwi orchard for direct sales.","zh-TW":"JA 的 2021 年資料將此果園列為奇異果直賣農園。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.jatm.or.jp/farming/plant/detail.php?id=38&type=kiwi","en":"https://www.jatm.or.jp/farming/plant/detail.php?id=38&type=kiwi","zh-TW":"https://www.jatm.or.jp/farming/plant/detail.php?id=38&type=kiwi"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"はけの道果樹園｜店舗一覧｜ＪＡ東京むさし","url":"https://www.jatm.or.jp/farming/plant/detail.php?id=38&type=kiwi","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b04-koganei-kiwi-motohashi": {
      "presentation": {
        "id": "b04-koganei-kiwi-motohashi",
        "regionId": "koganei",
        "foodCultureId": "koganei-kiwi",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"もとはし果樹園","lead":"JAの2021年の案内にキウイとキウイジャムが掲載されています。","description":"JAの2021年の案内にキウイとキウイジャムが掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Motohashi Orchard",
            "lead": "JA’s 2021 directory lists this orchard with kiwi fruit and kiwi jam.",
            "description": "JA’s 2021 directory lists this orchard with kiwi fruit and kiwi jam.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Motohashi 果園","lead":"JA 的 2021 年資料介紹此果園的奇異果與奇異果果醬。","description":"JA 的 2021 年資料介紹此果園的奇異果與奇異果果醬。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"JAの2021年の案内にキウイとキウイジャムが掲載されています。","en":"JA’s 2021 directory lists this orchard with kiwi fruit and kiwi jam.","zh-TW":"JA 的 2021 年資料介紹此果園的奇異果與奇異果果醬。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.jatm.or.jp/farming/plant/detail.php?id=42&type=kiwi","en":"https://www.jatm.or.jp/farming/plant/detail.php?id=42&type=kiwi","zh-TW":"https://www.jatm.or.jp/farming/plant/detail.php?id=42&type=kiwi"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"もとはし果樹園｜店舗一覧｜ＪＡ東京むさし","url":"https://www.jatm.or.jp/farming/plant/detail.php?id=42&type=kiwi","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b04-koganei-kiwi-hake",
          "spotId": "b04-koganei-kiwi-hake",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"はけの道果樹園","en":"Hake-no-Michi Orchard","zh-TW":"Hake-no-Michi 果園"},
          "description": {"ja":"JAの2021年の案内にキウイの直売農園として掲載されています。","en":"JA’s 2021 directory lists this kiwi orchard for direct sales.","zh-TW":"JA 的 2021 年資料將此果園列為奇異果直賣農園。"}
        },
        {
          "referenceId": "b04-koganei-kiwi-motohashi",
          "spotId": "b04-koganei-kiwi-motohashi",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"もとはし果樹園","en":"Motohashi Orchard","zh-TW":"Motohashi 果園"},
          "description": {"ja":"JAの2021年の案内にキウイとキウイジャムが掲載されています。","en":"JA’s 2021 directory lists this orchard with kiwi fruit and kiwi jam.","zh-TW":"JA 的 2021 年資料介紹此果園的奇異果與奇異果果醬。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"小金井市","station":""},"en":{"region":"Koganei","station":""},"zh-TW":{"region":"小金井市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Motohashi Kiwi Orchard access", "url": "https://kajul.akibare.ne.jp/access", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-5": {"name":"はけの道果樹園｜店舗一覧｜ＪＡ東京むさし","url":"https://www.jatm.or.jp/farming/plant/detail.php?id=38&type=kiwi","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-6": {"name":"もとはし果樹園｜店舗一覧｜ＪＡ東京むさし","url":"https://www.jatm.or.jp/farming/plant/detail.php?id=42&type=kiwi","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b04 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.jatm.or.jp/farming/plant/detail.php?id=38&type=kiwi","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-5","source-6"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-5","source-6"],"origin":"editorial"},
    "location": {"sourceIds":["source-5","source-6"],"origin":"editorial"},
    "story": {"sourceIds":["source-5","source-6"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-5","source-6"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-5","source-6"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-5","source-6"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-5","source-6"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-5","source-6"],"origin":"editorial"},
    "spots.b04-koganei-kiwi-hake": {"sourceIds":["source-5"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-5"],"origin":"editorial"},
    "spots.b04-koganei-kiwi-motohashi": {"sourceIds":["source-6"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-6"],"origin":"editorial"}
  }
};
