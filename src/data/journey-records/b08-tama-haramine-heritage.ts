import type { JourneyRecord } from '../journey-record';

export const b08TamaHaramineHeritageRecord: JourneyRecord = {
  "municipalityId": "tama",
  "journey": {
    "id": "b08-tama-haramine-heritage",
    "regionId": "tama",
    "foodCultureId": "tama-haramine-heritage",
    "storyId": "b08-tama-haramine-heritage",
    "routeId": "b08-tama-haramine-heritage-route",
    "copy": {
      "ja": {"title":"原峰の発酵と加工の記憶","subtitle":"原峰の発酵と加工の記憶","description":"生産を終えた味噌・地酒・梅酒を、地域の食の歴史として読む。","tags":["多摩市"],"storyTitle":"原峰の発酵と加工の記憶","intro":["生産を終えた味噌・地酒・梅酒を、地域の食の歴史として読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Haramine’s fermentation heritage","subtitle":"Haramine’s fermentation heritage","description":"Read the history of local miso, sake and plum liqueur whose production ended.","tags":["Tama City"],"storyTitle":"Haramine’s fermentation heritage","intro":["Read the history of local miso, sake and plum liqueur whose production ended.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"原峰的發酵與加工記憶","subtitle":"原峰的發酵與加工記憶","description":"認識已結束生產的本地味噌、清酒與梅酒歷史。","tags":["多摩市"],"storyTitle":"原峰的發酵與加工記憶","intro":["認識已結束生產的本地味噌、清酒與梅酒歷史。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"手作り多摩の味噌「原峰のかおり」","body":"都の紹介では、原峰のかおりは1998年に試作し2001年に一般販売を開始。米味噌・たっぷり麹味噌・麦味噌がありました。市の計画は2023年を最後に生産していないと記録しています。現在の製造品としての紹介ではありません。"},
        {"number":"02.","title":"多摩の地酒「原峰のいずみ」","body":"原峰のいずみは市内4戸の米作農家の米を使い、福生の石川酒造が醸した酒として都が紹介。市の計画は2023年を最後に生産していないと記録しています。"},
        {"number":"03.","title":"多摩産梅酒「白加賀」","body":"市の計画は、多摩市で採れた白加賀梅を使う梅酒が2013年に始まり、2022年に生産を終えたと記録しています。ここでは地域の加工品の歴史として扱います。"}
      ],
      "en": [
        {"number":"01.","title":"Haramine no Kaori Handmade Miso","body":"Tokyo’s account dates Haramine no Kaori’s trial batch to 1998 and public launch to 2001, with rice, extra-koji and barley miso varieties. The city plan records no production after 2023. This is production history."},
        {"number":"02.","title":"Haramine no Izumi Local Sake","body":"Tokyo describes Haramine no Izumi as sake made with rice from four Tama farmers and brewed by Ishikawa Brewery in Fussa. The city plan records no production after 2023."},
        {"number":"03.","title":"Shirakaga Plum Liqueur","body":"The city plan records a liqueur using Tama-grown Shirakaga plums, launched in 2013 with production ending in 2022. It appears here as local food-processing history."}
      ],
      "zh-TW": [
        {"number":"01.","title":"原峰之香味噌","body":"東京都介紹原峰之香於1998年試作、2001年開始一般販售，曾有米味噌、多麴味噌與麥味噌。市府計畫記載2023年後未再生產，此處介紹製作歷史。"},
        {"number":"02.","title":"原峰之泉清酒","body":"東京都介紹原峰之泉使用多摩市四戶農家的米，由福生的石川酒造釀製。市府計畫記載2023年後未再生產。"},
        {"number":"03.","title":"白加賀梅酒","body":"市府計畫記載，使用多摩市白加賀梅的梅酒於2013年推出、2022年結束生產，此處作為當地食品加工歷史介紹。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b08-tama-haramine-heritage-haramine-park"}
        ]
      }
    ]
  },
  "routeName": {"ja":"原峰の発酵と加工の記憶","en":"Haramine’s fermentation heritage","zh-TW":"原峰的發酵與加工記憶"},
  "location": {
    "ja": {"area":"多摩市","station":"","access":""},
    "en": {"area":"Tama City","station":"","access":""},
    "zh-TW": {"area":"多摩市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "桜ヶ丘4丁目", "en": "Sakuragaoka 4-chōme bus stop", "zh-TW": "櫻丘四丁目巴士站"}, "spotId": "b08-tama-haramine-heritage-haramine-park", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b08-tama-haramine-heritage-haramine-park",
          "description": {"ja":"都の味噌紹介は生産工場近くの公園として挙げています。試食施設の案内ではありません。","en":"Tokyo’s miso article names the park near the former production setting. This is a landscape stop for historical context.","zh-TW":"東京都味噌介紹將此公園列為原製造地附近的公園，是了解歷史背景的景觀停留點。"},
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
    "b08-tama-haramine-heritage-haramine-park": {
      "presentation": {
        "id": "b08-tama-haramine-heritage-haramine-park",
        "regionId": "tama",
        "foodCultureId": "tama-haramine-heritage",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "原峰公園",
            "lead": "都の味噌紹介は生産工場近くの公園として挙げています。試食施設の案内ではありません。",
            "description": "都の味噌紹介は生産工場近くの公園として挙げています。試食施設の案内ではありません。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Haramine Park",
            "lead": "Tokyo’s miso article names the park near the former production setting. This is a landscape stop for historical context.",
            "description": "Tokyo’s miso article names the park near the former production setting. This is a landscape stop for historical context.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "原峰公園",
            "lead": "東京都味噌介紹將此公園列為原製造地附近的公園，是了解歷史背景的景觀停留點。",
            "description": "東京都味噌介紹將此公園列為原製造地附近的公園，是了解歷史背景的景觀停留點。",
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
        "description": {"ja":"都の味噌紹介は生産工場近くの公園として挙げています。試食施設の案内ではありません。","en":"Tokyo’s miso article names the park near the former production setting. This is a landscape stop for historical context.","zh-TW":"東京都味噌介紹將此公園列為原製造地附近的公園，是了解歷史背景的景觀停留點。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_119.html","en":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_119.html","zh-TW":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_119.html"}
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
      "officialSource": {"name":"手作り多摩の味噌 原峰のかおり","url":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_119.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-tama-haramine-heritage-haramine-park",
          "spotId": "b08-tama-haramine-heritage-haramine-park",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"原峰公園","en":"Haramine Park","zh-TW":"原峰公園"},
          "description": {"ja":"都の味噌紹介は生産工場近くの公園として挙げています。試食施設の案内ではありません。","en":"Tokyo’s miso article names the park near the former production setting. This is a landscape stop for historical context.","zh-TW":"東京都味噌介紹將此公園列為原製造地附近的公園，是了解歷史背景的景觀停留點。"}
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
    "admission-access": {"name": "Tama City Haramine Park access", "url": "https://www.city.tama.lg.jp/map/kouen/1002506.html", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-7": {"name":"多摩市の農業・特産品開発","url":"https://www.city.tama.lg.jp/_res/projects/default_project/_page_/001/015/079/kaitei_03.pdf","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-10": {"name":"手作り多摩の味噌 原峰のかおり","url":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_119.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-11": {"name":"原峰のいずみ","url":"https://www.sangyo-rodo1.metro.tokyo.lg.jp/tourism/tokyogifts62/product/53/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://www.city.tama.lg.jp/_res/projects/default_project/_page_/001/015/079/kaitei_03.pdf","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-7","source-10","source-11"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-7","source-10","source-11"],"origin":"editorial"},
    "location": {"sourceIds":["source-7","source-10","source-11"],"origin":"editorial"},
    "story": {"sourceIds":["source-7","source-10","source-11"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-7","source-10","source-11"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-7","source-10","source-11"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-7","source-10"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-7","source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-7","source-10"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-7","source-10","source-11"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-7","source-10","source-11"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-7","source-10","source-11"],"origin":"editorial"},
    "journey.chapters.ja.2": {"sourceIds":["source-7"],"origin":"editorial"},
    "journey.chapters.en.2": {"sourceIds":["source-7"],"origin":"editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds":["source-7"],"origin":"editorial"},
    "spots.b08-tama-haramine-heritage-haramine-park": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-10"],"origin":"editorial"}
  }
};
