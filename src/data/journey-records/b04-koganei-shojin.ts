import type { JourneyRecord } from '../journey-record';

export const b04KoganeiShojinRecord: JourneyRecord = {
  "municipalityId": "koganei",
  "alcoholThemed": false,
  "journey": {
    "id": "b04-koganei-shojin",
    "regionId": "koganei",
    "foodCultureId": "koganei-shojin",
    "storyId": "b04-koganei-shojin",
    "routeId": "b04-koganei-shojin-route",
    "copy": {
      "ja": {"title":"小金井・三光院の精進料理","subtitle":"小金井・三光院の精進料理","description":"尼寺が受け継ぐ、御所料理につながる食の伝統。","tags":["小金井市"],"storyTitle":"小金井・三光院の精進料理","intro":["尼寺が受け継ぐ、御所料理につながる食の伝統。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Shojin cuisine at Koganei’s Sankoin",
        "subtitle": "Shojin cuisine at Koganei’s Sankoin",
        "description": "A nunnery’s culinary tradition connects with court cuisine.",
        "tags": ["Koganei"],
        "storyTitle": "Shojin cuisine at Koganei’s Sankoin",
        "intro": ["A nunnery’s culinary tradition connects with court cuisine.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"小金井三光院的精進料理","subtitle":"小金井三光院的精進料理","description":"認識尼寺傳承、連結御所料理的飲食傳統。","tags":["小金井市"],"storyTitle":"小金井三光院的精進料理","intro":["認識尼寺傳承、連結御所料理的飲食傳統。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"竹之御所流精進料理","body":"商工会の紹介によると、三光院は1934年創建の尼寺。室町時代の御所料理につながる竹之御所流精進料理を受け継いでいます。"}],
      "en": [{"number":"01.","title":"Takenogosho-style Buddhist vegetarian cuisine","body":"The chamber of commerce describes Sankoin as a nunnery founded in 1934, preserving Takenogosho-style shojin cuisine with roots in Muromachi-period court cooking."}],
      "zh-TW": [{"number":"01.","title":"竹之御所流精進料理","body":"商工會介紹三光院為創建於 1934 年的尼寺，傳承源於室町時代御所料理的竹之御所流精進料理。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b04-koganei-shojin-sankoin"}]}]
  },
  "routeName": {"ja":"小金井・三光院の精進料理","en":"Shojin cuisine at Koganei’s Sankoin","zh-TW":"小金井三光院的精進料理"},
  "location": {"ja":{"area":"小金井市","station":"","access":""},"en":{"area":"Koganei","station":"","access":""},"zh-TW":{"area":"小金井市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "武蔵小金井駅", "en": "Musashi-Koganei Station", "zh-TW": "武藏小金井站"}, "spotId": "b04-koganei-shojin-sankoin", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b04-koganei-shojin-sankoin",
          "description": {"ja":"商工会は竹之御所流精進料理を伝える尼寺として紹介しています。","en":"The chamber of commerce describes this nunnery as preserving Takenogosho-style shojin cuisine.","zh-TW":"商工會介紹此尼寺傳承竹之御所流精進料理。"},
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
    "b04-koganei-shojin-sankoin": {
      "presentation": {
        "id": "b04-koganei-shojin-sankoin",
        "regionId": "koganei",
        "foodCultureId": "koganei-shojin",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"三光院","lead":"商工会は竹之御所流精進料理を伝える尼寺として紹介しています。","description":"商工会は竹之御所流精進料理を伝える尼寺として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Sankoin",
            "lead": "The chamber of commerce describes this nunnery as preserving Takenogosho-style shojin cuisine.",
            "description": "The chamber of commerce describes this nunnery as preserving Takenogosho-style shojin cuisine.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"三光院","lead":"商工會介紹此尼寺傳承竹之御所流精進料理。","description":"商工會介紹此尼寺傳承竹之御所流精進料理。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"商工会は竹之御所流精進料理を伝える尼寺として紹介しています。","en":"The chamber of commerce describes this nunnery as preserving Takenogosho-style shojin cuisine.","zh-TW":"商工會介紹此尼寺傳承竹之御所流精進料理。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://koganei-s.or.jp/hyakuten-isshu/feature/tatemono/","en":"https://koganei-s.or.jp/hyakuten-isshu/feature/tatemono/","zh-TW":"https://koganei-s.or.jp/hyakuten-isshu/feature/tatemono/"}
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
      "officialSource": {"name":"江⼾東京な たてもの探訪｜特集コンテンツ｜小金井百店一首〜江戸東京こがねい浪漫〜","url":"https://koganei-s.or.jp/hyakuten-isshu/feature/tatemono/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b04-koganei-shojin-sankoin",
          "spotId": "b04-koganei-shojin-sankoin",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"三光院","en":"Sankoin","zh-TW":"三光院"},
          "description": {"ja":"商工会は竹之御所流精進料理を伝える尼寺として紹介しています。","en":"The chamber of commerce describes this nunnery as preserving Takenogosho-style shojin cuisine.","zh-TW":"商工會介紹此尼寺傳承竹之御所流精進料理。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"小金井市","station":""},"en":{"region":"Koganei","station":""},"zh-TW":{"region":"小金井市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Sankō-in access", "url": "https://www.sankou-in.com/info_260604_01.html", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-7": {"name":"江⼾東京な たてもの探訪｜特集コンテンツ｜小金井百店一首〜江戸東京こがねい浪漫〜","url":"https://koganei-s.or.jp/hyakuten-isshu/feature/tatemono/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b04 editorial itinerary — estimated timing and order, not a timetable","url":"https://koganei-s.or.jp/hyakuten-isshu/feature/tatemono/","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-7"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-7"],"origin":"editorial"},
    "location": {"sourceIds":["source-7"],"origin":"editorial"},
    "story": {"sourceIds":["source-7"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-7"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-7"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-7"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-7"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-7"],"origin":"editorial"},
    "spots.b04-koganei-shojin-sankoin": {"sourceIds":["source-7"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-7"],"origin":"editorial"}
  }
};
