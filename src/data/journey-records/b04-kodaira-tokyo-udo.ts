import type { JourneyRecord } from '../journey-record';

export const b04KodairaTokyoUdoRecord: JourneyRecord = {
  "municipalityId": "kodaira",
  "journey": {
    "id": "b04-kodaira-tokyo-udo",
    "regionId": "kodaira",
    "foodCultureId": "kodaira-tokyo-udo",
    "storyId": "b04-kodaira-tokyo-udo",
    "routeId": "b04-kodaira-tokyo-udo-route",
    "copy": {
      "ja": {"title":"小平の東京うどを知る","subtitle":"小平の東京うどを知る","description":"畑と直売の文脈で、地域の特産野菜に触れる。","tags":["小平市"],"storyTitle":"小平の東京うどを知る","intro":["畑と直売の文脈で、地域の特産野菜に触れる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Discover Kodaira’s Tokyo udo",
        "subtitle": "Discover Kodaira’s Tokyo udo",
        "description": "Meet a local specialty vegetable through farming and direct sales.",
        "tags": ["Kodaira"],
        "storyTitle": "Discover Kodaira’s Tokyo udo",
        "intro": ["Meet a local specialty vegetable through farming and direct sales.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"認識小平的東京獨活","subtitle":"認識小平的東京獨活","description":"從農業與直賣文化認識地方特色蔬菜。","tags":["小平市"],"storyTitle":"認識小平的東京獨活","intro":["從農業與直賣文化認識地方特色蔬菜。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"東京うど","body":"市はうどを特産物の一つに挙げ、東京では江戸時代から育てられてきた野菜だと紹介しています。"}],
      "en": [{"number":"01.","title":"Tokyo udo","body":"The city identifies udo as a Kodaira specialty and describes its cultivation in Tokyo since the Edo period."}],
      "zh-TW": [{"number":"01.","title":"東京獨活","body":"市府將獨活列為小平特產，並介紹東京自江戶時代便開始栽培。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b04-kodaira-tokyo-udo-mu-chan"}]}]
  },
  "routeName": {"ja":"小平の東京うどを知る","en":"Discover Kodaira’s Tokyo udo","zh-TW":"認識小平的東京獨活"},
  "location": {"ja":{"area":"小平市","station":"","access":""},"en":{"area":"Kodaira","station":"","access":""},"zh-TW":{"area":"小平市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b04-kodaira-tokyo-udo-mu-chan",
          "description": {"ja":"市の農業案内に載る直売所。うどの特産地を知るための立ち寄り先です。","en":"The city’s agriculture guide lists this market, an editorial stop for exploring its udo-growing area.","zh-TW":"市府農業介紹所列的直賣所，為認識獨活產區而安排的編輯停留點。"},
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
    "b04-kodaira-tokyo-udo-mu-chan": {
      "presentation": {
        "id": "b04-kodaira-tokyo-udo-mu-chan",
        "regionId": "kodaira",
        "foodCultureId": "kodaira-tokyo-udo",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"小平ファーマーズ・マーケット ムーちゃん広場","lead":"市の農業案内に載る直売所。うどの特産地を知るための立ち寄り先です。","description":"市の農業案内に載る直売所。うどの特産地を知るための立ち寄り先です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Kodaira Farmers’ Market Mu-chan Plaza",
            "lead": "The city’s agriculture guide lists this market, an editorial stop for exploring its udo-growing area.",
            "description": "The city’s agriculture guide lists this market, an editorial stop for exploring its udo-growing area.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"小平農夫市集 Mu-chan 廣場","lead":"市府農業介紹所列的直賣所，為認識獨活產區而安排的編輯停留點。","description":"市府農業介紹所列的直賣所，為認識獨活產區而安排的編輯停留點。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市の農業案内に載る直売所。うどの特産地を知るための立ち寄り先です。","en":"The city’s agriculture guide lists this market, an editorial stop for exploring its udo-growing area.","zh-TW":"市府農業介紹所列的直賣所，為認識獨活產區而安排的編輯停留點。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://life.ja-group.jp/farm/market/detail/?id=621","en":"https://life.ja-group.jp/farm/market/detail/?id=621","zh-TW":"https://life.ja-group.jp/farm/market/detail/?id=621"}
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
      "officialSource": {"name":"小平ファーマーズ・マーケット ムーちゃん広場（東京都）の詳細情報｜東京都の直売所一覧｜JAファーマーズマーケット(直売所)検索｜JAファーマーズマーケット（直売所） ｜JAグループ","url":"https://life.ja-group.jp/farm/market/detail/?id=621","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b04-kodaira-tokyo-udo-mu-chan",
          "spotId": "b04-kodaira-tokyo-udo-mu-chan",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"小平ファーマーズ・マーケット ムーちゃん広場","en":"Kodaira Farmers’ Market Mu-chan Plaza","zh-TW":"小平農夫市集 Mu-chan 廣場"},
          "description": {"ja":"市の農業案内に載る直売所。うどの特産地を知るための立ち寄り先です。","en":"The city’s agriculture guide lists this market, an editorial stop for exploring its udo-growing area.","zh-TW":"市府農業介紹所列的直賣所，為認識獨活產區而安排的編輯停留點。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"小平市","station":""},"en":{"region":"Kodaira","station":""},"zh-TW":{"region":"小平市","station":""}}
  },
  "sources": {
    "source-16": {"name":"小平ファーマーズ・マーケット ムーちゃん広場（東京都）の詳細情報｜東京都の直売所一覧｜JAファーマーズマーケット(直売所)検索｜JAファーマーズマーケット（直売所） ｜JAグループ","url":"https://life.ja-group.jp/farm/market/detail/?id=621","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-21": {"name":"畑からまっしぐら｜東京都小平市公式ホームページ","url":"https://www.city.kodaira.tokyo.jp/kurashi/001/001143.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b04 editorial itinerary — estimated timing and order, not a timetable","url":"https://life.ja-group.jp/farm/market/detail/?id=621","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-16","source-21"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-16","source-21"],"origin":"editorial"},
    "location": {"sourceIds":["source-16","source-21"],"origin":"editorial"},
    "story": {"sourceIds":["source-16","source-21"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-16","source-21"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-16","source-21"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-21"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-21"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-21"],"origin":"editorial"},
    "spots.b04-kodaira-tokyo-udo-mu-chan": {"sourceIds":["source-16","source-21"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-16","source-21"],"origin":"editorial"}
  }
};
