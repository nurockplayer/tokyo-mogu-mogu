import type { JourneyRecord } from '../journey-record';

export const b04KoganeiRhubarbRecord: JourneyRecord = {
  "municipalityId": "koganei",
  "journey": {
    "id": "b04-koganei-rhubarb",
    "regionId": "koganei",
    "foodCultureId": "koganei-rhubarb",
    "storyId": "b04-koganei-rhubarb",
    "routeId": "b04-koganei-rhubarb-route",
    "copy": {
      "ja": {"title":"小金井のルバーブとジャム","subtitle":"小金井のルバーブとジャム","description":"地域の新しい作物と、給食や料理教室への広がり。","tags":["小金井市"],"storyTitle":"小金井のルバーブとジャム","intro":["地域の新しい作物と、給食や料理教室への広がり。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Koganei rhubarb and jam",
        "subtitle": "Koganei rhubarb and jam",
        "description": "A local crop connects school meals, cooking classes and preserves.",
        "tags": ["Koganei"],
        "storyTitle": "Koganei rhubarb and jam",
        "intro": ["A local crop connects school meals, cooking classes and preserves.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"小金井食用大黃與果醬","subtitle":"小金井食用大黃與果醬","description":"從地方作物認識學校餐點、料理教室與果醬。","tags":["小金井市"],"storyTitle":"小金井食用大黃與果醬","intro":["從地方作物認識學校餐點、料理教室與果醬。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"小金井産ルバーブ","body":"小金井市はルバーブを特産物として育てる取り組みを進め、学校給食にはジャムやマドレーヌが登場。JAの女性部による料理教室でも使い方が紹介されました。"}],
      "en": [{"number":"01.","title":"Koganei rhubarb","body":"Tokyo’s guide describes Koganei’s promotion of rhubarb, its use in school-meal jam and madeleines, and cooking classes led by JA’s local women’s group."}],
      "zh-TW": [{"number":"01.","title":"小金井產食用大黃","body":"東京都資料介紹小金井推廣食用大黃，學校餐點使用其製成果醬與瑪德蓮，JA 當地女性團體也透過料理教室介紹用途。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b04-koganei-rhubarb-mu-chan"}]}]
  },
  "routeName": {"ja":"小金井のルバーブとジャム","en":"Koganei rhubarb and jam","zh-TW":"小金井食用大黃與果醬"},
  "location": {"ja":{"area":"小金井市","station":"","access":""},"en":{"area":"Koganei","station":"","access":""},"zh-TW":{"area":"小金井市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "武蔵小金井駅", "en": "Musashi-Koganei Station", "zh-TW": "武藏小金井站"}, "spotId": "b04-koganei-rhubarb-mu-chan", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b04-koganei-rhubarb-mu-chan",
          "description": {"ja":"東京都はこの直売所をルバーブジャムに関連して紹介しています。","en":"Tokyo’s rhubarb guide identifies this farmers’ market in connection with rhubarb jam.","zh-TW":"東京都的食用大黃介紹將此農夫市集與大黃果醬連結。"},
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
    "b04-koganei-rhubarb-mu-chan": {
      "presentation": {
        "id": "b04-koganei-rhubarb-mu-chan",
        "regionId": "koganei",
        "foodCultureId": "koganei-rhubarb",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"小金井ファーマーズ・マーケット ムーちゃん広場","lead":"東京都はこの直売所をルバーブジャムに関連して紹介しています。","description":"東京都はこの直売所をルバーブジャムに関連して紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Koganei Farmers’ Market Mu-chan Plaza",
            "lead": "Tokyo’s rhubarb guide identifies this farmers’ market in connection with rhubarb jam.",
            "description": "Tokyo’s rhubarb guide identifies this farmers’ market in connection with rhubarb jam.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"小金井農夫市集 Mu-chan 廣場","lead":"東京都的食用大黃介紹將此農夫市集與大黃果醬連結。","description":"東京都的食用大黃介紹將此農夫市集與大黃果醬連結。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"東京都はこの直売所をルバーブジャムに関連して紹介しています。","en":"Tokyo’s rhubarb guide identifies this farmers’ market in connection with rhubarb jam.","zh-TW":"東京都的食用大黃介紹將此農夫市集與大黃果醬連結。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://life.ja-group.jp/farm/market/detail?id=622","en":"https://life.ja-group.jp/farm/market/detail?id=622","zh-TW":"https://life.ja-group.jp/farm/market/detail?id=622"}
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
      "officialSource": {"name":"小金井ファーマーズ・マーケット ムーちゃん広場（東京都）の詳細情報｜東京都の直売所一覧｜JAファーマーズマーケット(直売所)検索｜JAファーマーズマーケット（直売所） ｜JAグループ","url":"https://life.ja-group.jp/farm/market/detail?id=622","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b04-koganei-rhubarb-mu-chan",
          "spotId": "b04-koganei-rhubarb-mu-chan",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"小金井ファーマーズ・マーケット ムーちゃん広場","en":"Koganei Farmers’ Market Mu-chan Plaza","zh-TW":"小金井農夫市集 Mu-chan 廣場"},
          "description": {"ja":"東京都はこの直売所をルバーブジャムに関連して紹介しています。","en":"Tokyo’s rhubarb guide identifies this farmers’ market in connection with rhubarb jam.","zh-TW":"東京都的食用大黃介紹將此農夫市集與大黃果醬連結。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"小金井市","station":""},"en":{"region":"Koganei","station":""},"zh-TW":{"region":"小金井市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "JA Tokyo Musashi farmers’ market access", "url": "https://www.jatm.or.jp/magazine/pdf/kawasemi_09.pdf?dl=true", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-2": {"name":"小金井ファーマーズ・マーケット ムーちゃん広場（東京都）の詳細情報｜東京都の直売所一覧｜JAファーマーズマーケット(直売所)検索｜JAファーマーズマーケット（直売所） ｜JAグループ","url":"https://life.ja-group.jp/farm/market/detail?id=622","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-4": {"name":"ルバーブ ｜地域資源紹介記事 ｜ 東京都　地域資源（TOKYOイチオシナビ）","url":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_41.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b04 editorial itinerary — estimated timing and order, not a timetable","url":"https://life.ja-group.jp/farm/market/detail?id=622","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-2","source-4"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-2","source-4"],"origin":"editorial"},
    "location": {"sourceIds":["source-2","source-4"],"origin":"editorial"},
    "story": {"sourceIds":["source-2","source-4"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-2","source-4"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-2","source-4"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-4"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-4"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-4"],"origin":"editorial"},
    "spots.b04-koganei-rhubarb-mu-chan": {"sourceIds":["source-2","source-4"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-2","source-4"],"origin":"editorial"}
  }
};
