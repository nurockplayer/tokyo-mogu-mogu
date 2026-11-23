import type { JourneyRecord } from '../journey-record';

export const b04KoganeiCraftBeerRecord: JourneyRecord = {
  "municipalityId": "koganei",
  "journey": {
    "id": "b04-koganei-craft-beer",
    "regionId": "koganei",
    "foodCultureId": "koganei-craft-beer",
    "storyId": "b04-koganei-craft-beer",
    "routeId": "b04-koganei-craft-beer-route",
    "copy": {
      "ja": {"title":"小金井・中央線から生まれたビール","subtitle":"小金井・中央線から生まれたビール","description":"沿線のホップ栽培から醸造所へつながる物語。","tags":["小金井市"],"storyTitle":"小金井・中央線から生まれたビール","intro":["沿線のホップ栽培から醸造所へつながる物語。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Koganei beer born along the Chuo Line",
        "subtitle": "Koganei beer born along the Chuo Line",
        "description": "Follow the connection from community hop growing to a brewery.",
        "tags": ["Koganei"],
        "storyTitle": "Koganei beer born along the Chuo Line",
        "intro": ["Follow the connection from community hop growing to a brewery.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"小金井：中央線孕育的啤酒","subtitle":"小金井：中央線孕育的啤酒","description":"認識沿線社群栽培啤酒花與釀酒廠的連結。","tags":["小金井市"],"storyTitle":"小金井：中央線孕育的啤酒","intro":["認識沿線社群栽培啤酒花與釀酒廠的連結。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"中央線ビアワークス","body":"市によると中央線ビアワークスは2025年に誕生した市内初のクラフト醸造所。運営会社は沿線住民と駅員のホップ栽培が出発点だったと説明しています。"}],
      "en": [{"number":"01.","title":"Chuo Line Beer Works","body":"The city identifies Chuo Line Beer Works as Koganei’s first craft brewery, established in 2025. Its operator traces the project to hop growing by residents and railway staff."}],
      "zh-TW": [{"number":"01.","title":"中央線啤酒工坊","body":"市府介紹中央線啤酒工坊為 2025 年成立的小金井首間精釀啤酒廠；營運公司說明計畫始於沿線居民與站務員的啤酒花栽培。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b04-koganei-craft-beer-beer-works"}]}]
  },
  "routeName": {"ja":"小金井・中央線から生まれたビール","en":"Koganei beer born along the Chuo Line","zh-TW":"小金井：中央線孕育的啤酒"},
  "location": {"ja":{"area":"小金井市","station":"","access":""},"en":{"area":"Koganei","station":"","access":""},"zh-TW":{"area":"小金井市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b04-koganei-craft-beer-beer-works",
          "description": {"ja":"運営会社は醸造所併設のタップルームを紹介しています。","en":"The operator describes a taproom adjoining the brewery.","zh-TW":"營運公司介紹釀酒廠附設的 Taproom。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。"},
        "en": {
          "time": "About 90 min (editorial estimate)",
          "distance": "",
          "spots": "1 stops",
          "station": "",
          "minutes": "90",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing."
        },
        "zh-TW": {"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b04-koganei-craft-beer-beer-works": {
      "presentation": {
        "id": "b04-koganei-craft-beer-beer-works",
        "regionId": "koganei",
        "foodCultureId": "koganei-craft-beer",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"中央線ビアワークス","lead":"運営会社は醸造所併設のタップルームを紹介しています。","description":"運営会社は醸造所併設のタップルームを紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Chuo Line Beer Works",
            "lead": "The operator describes a taproom adjoining the brewery.",
            "description": "The operator describes a taproom adjoining the brewery.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"中央線啤酒工坊","lead":"營運公司介紹釀酒廠附設的 Taproom。","description":"營運公司介紹釀酒廠附設的 Taproom。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"運営会社は醸造所併設のタップルームを紹介しています。","en":"The operator describes a taproom adjoining the brewery.","zh-TW":"營運公司介紹釀酒廠附設的 Taproom。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.jrccd.co.jp/chuolinebeerworks/","en":"https://www.jrccd.co.jp/chuolinebeerworks/","zh-TW":"https://www.jrccd.co.jp/chuolinebeerworks/"}
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
      "officialSource": {"name":"中央線ビアワークス　CHŪŌ LINE BEER WORKS｜株式会社JR中央線コミュニティデザイン","url":"https://www.jrccd.co.jp/chuolinebeerworks/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b04-koganei-craft-beer-beer-works",
          "spotId": "b04-koganei-craft-beer-beer-works",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"中央線ビアワークス","en":"Chuo Line Beer Works","zh-TW":"中央線啤酒工坊"},
          "description": {"ja":"運営会社は醸造所併設のタップルームを紹介しています。","en":"The operator describes a taproom adjoining the brewery.","zh-TW":"營運公司介紹釀酒廠附設的 Taproom。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"小金井市","station":""},"en":{"region":"Koganei","station":""},"zh-TW":{"region":"小金井市","station":""}}
  },
  "sources": {
    "source-11": {"name":"小金井市ふるさと納税における新たな返礼品について　令和8年5月11日報道発表：小金井市公式WEBへようこそ","url":"https://www.city.koganei.lg.jp/shisei/461/pressrelease/r8/press20260511.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-12": {"name":"中央線ビアワークス　CHŪŌ LINE BEER WORKS｜株式会社JR中央線コミュニティデザイン","url":"https://www.jrccd.co.jp/chuolinebeerworks/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b04 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.city.koganei.lg.jp/shisei/461/pressrelease/r8/press20260511.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-11","source-12"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-11","source-12"],"origin":"editorial"},
    "location": {"sourceIds":["source-11","source-12"],"origin":"editorial"},
    "story": {"sourceIds":["source-11","source-12"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-11","source-12"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-11","source-12"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-11","source-12"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-11","source-12"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-11","source-12"],"origin":"editorial"},
    "spots.b04-koganei-craft-beer-beer-works": {"sourceIds":["source-12"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-12"],"origin":"editorial"}
  }
};
