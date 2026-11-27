import type { JourneyRecord } from '../journey-record';

export const b04HinoTokojiDaikonRecord: JourneyRecord = {
  "municipalityId": "hino",
  "alcoholThemed": false,
  "journey": {
    "id": "b04-hino-tokoji-daikon",
    "regionId": "hino",
    "foodCultureId": "hino-tokoji-daikon",
    "storyId": "b04-hino-tokoji-daikon",
    "routeId": "b04-hino-tokoji-daikon-route",
    "copy": {
      "ja": {"title":"日野・東光寺大根の記憶","subtitle":"日野・東光寺大根の記憶","description":"細長い大根と、干す・漬ける食の手仕事。","tags":["日野市"],"storyTitle":"日野・東光寺大根の記憶","intro":["細長い大根と、干す・漬ける食の手仕事。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Hino’s Tokoji daikon heritage",
        "subtitle": "Hino’s Tokoji daikon heritage",
        "description": "Explore a slender radish and its drying and pickling traditions.",
        "tags": ["Hino"],
        "storyTitle": "Hino’s Tokoji daikon heritage",
        "intro": ["Explore a slender radish and its drying and pickling traditions.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"日野東光寺蘿蔔的記憶","subtitle":"日野東光寺蘿蔔的記憶","description":"認識細長蘿蔔與曬製、醃漬的飲食工藝。","tags":["日野市"],"storyTitle":"日野東光寺蘿蔔的記憶","intro":["認識細長蘿蔔與曬製、醃漬的飲食工藝。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"東光寺大根","body":"市は東光寺大根を練馬大根の系統と説明。明治時代には刈田に並べて干す光景が冬の風物詩だったと紹介しています。"},{"number":"02.","title":"東光寺大根のたくあん・干し大根","body":"東光寺大根はたくあんや干し大根に加工され、庭先や市内の農産物直売所につながる作物だと紹介されています。"}],
      "en": [
        {"number":"01.","title":"Tokoji daikon","body":"The city describes Tokoji daikon as descended from Nerima daikon and recalls radishes drying across harvested fields as a winter scene in the Meiji period."},
        {"number":"02.","title":"Tokoji daikon takuan and dried radish","body":"The city connects Tokoji daikon with takuan pickles and dried radish, and with farm-front and local produce outlets."}
      ],
      "zh-TW": [{"number":"01.","title":"東光寺蘿蔔","body":"市府介紹東光寺蘿蔔源自練馬蘿蔔，並記錄明治時代收割後田野曬蘿蔔的冬季景象。"},{"number":"02.","title":"東光寺醃蘿蔔與乾蘿蔔","body":"市府介紹東光寺蘿蔔加工成澤庵醃蘿蔔與乾蘿蔔，並連結庭前及市內農產直賣所。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b04-hino-tokoji-daikon-minami"}]}]
  },
  "routeName": {"ja":"日野・東光寺大根の記憶","en":"Hino’s Tokoji daikon heritage","zh-TW":"日野東光寺蘿蔔的記憶"},
  "location": {"ja":{"area":"日野市","station":"","access":""},"en":{"area":"Hino","station":"","access":""},"zh-TW":{"area":"日野市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "万願寺駅", "en": "Manganji Station", "zh-TW": "萬願寺站"}, "spotId": "b04-hino-tokoji-daikon-minami", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b04-hino-tokoji-daikon-minami",
          "description": {"ja":"市が野菜や果実を扱う直売所として紹介しています。","en":"The city lists this market as an outlet for vegetables and fruit.","zh-TW":"市府列為販售蔬菜與水果的直賣所。"},
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
    "b04-hino-tokoji-daikon-minami": {
      "presentation": {
        "id": "b04-hino-tokoji-daikon-minami",
        "regionId": "hino",
        "foodCultureId": "hino-tokoji-daikon",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"東京みなみの恵み","lead":"市が野菜や果実を扱う直売所として紹介しています。","description":"市が野菜や果実を扱う直売所として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Tokyo Minami no Megumi",
            "lead": "The city lists this market as an outlet for vegetables and fruit.",
            "description": "The city lists this market as an outlet for vegetables and fruit.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"東京 Minami no Megumi","lead":"市府列為販售蔬菜與水果的直賣所。","description":"市府列為販售蔬菜與水果的直賣所。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市が野菜や果実を扱う直売所として紹介しています。","en":"The city lists this market as an outlet for vegetables and fruit.","zh-TW":"市府列為販售蔬菜與水果的直賣所。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.hino.lg.jp/sangyo/nogyo/nousanbutsu/1003561.html","en":"https://www.city.hino.lg.jp/sangyo/nogyo/nousanbutsu/1003561.html","zh-TW":"https://www.city.hino.lg.jp/sangyo/nogyo/nousanbutsu/1003561.html"}
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
      "officialSource": {"name":"JA直売所・即売事業｜日野市公式ホームページ","url":"https://www.city.hino.lg.jp/sangyo/nogyo/nousanbutsu/1003561.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b04-hino-tokoji-daikon-minami",
          "spotId": "b04-hino-tokoji-daikon-minami",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"東京みなみの恵み","en":"Tokyo Minami no Megumi","zh-TW":"東京 Minami no Megumi"},
          "description": {"ja":"市が野菜や果実を扱う直売所として紹介しています。","en":"The city lists this market as an outlet for vegetables and fruit.","zh-TW":"市府列為販售蔬菜與水果的直賣所。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"日野市","station":""},"en":{"region":"Hino","station":""},"zh-TW":{"region":"日野市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Tokyo Agriculture, Forestry and Fisheries Foundation – Minamitama guide", "url": "https://www.tokyo-aff.or.jp/uploaded/attachment/4110.pdf", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-27": {"name":"日野の特産農産物｜日野市公式ホームページ","url":"https://www.city.hino.lg.jp/sangyo/nogyo/1003570.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-28": {"name":"JA直売所・即売事業｜日野市公式ホームページ","url":"https://www.city.hino.lg.jp/sangyo/nogyo/nousanbutsu/1003561.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b04 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.city.hino.lg.jp/sangyo/nogyo/1003570.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-27","source-28"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-27","source-28"],"origin":"editorial"},
    "location": {"sourceIds":["source-27","source-28"],"origin":"editorial"},
    "story": {"sourceIds":["source-27","source-28"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-27","source-28"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-27","source-28"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-27"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-27"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-27"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-27"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-27"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-27"],"origin":"editorial"},
    "spots.b04-hino-tokoji-daikon-minami": {"sourceIds":["source-28"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-28"],"origin":"editorial"}
  }
};
