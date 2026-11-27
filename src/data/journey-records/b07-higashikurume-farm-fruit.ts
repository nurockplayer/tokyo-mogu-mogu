import type { JourneyRecord } from '../journey-record';

export const b07HigashikurumeFarmFruitRecord: JourneyRecord = {
  "municipalityId": "higashikurume",
  "journey": {
    "id": "b07-higashikurume-farm-fruit",
    "regionId": "higashikurume",
    "foodCultureId": "higashikurume-farm-fruit",
    "storyId": "b07-higashikurume-farm-fruit",
    "routeId": "b07-higashikurume-farm-fruit-route",
    "copy": {
      "ja": {"title":"東久留米の果樹と畑の食","subtitle":"東久留米の果樹と畑の食","description":"ブルーベリー、キウイ、梅や野菜。農園直売と赤しその飲料を知る。","tags":["東久留米市"],"storyTitle":"東久留米の果樹と畑の食","intro":["ブルーベリー、キウイ、梅や野菜。農園直売と赤しその飲料を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Higashikurume orchard and field foods",
        "subtitle": "Higashikurume orchard and field foods",
        "description": "Explore blueberries, kiwi fruit, plums, vegetables and a locally named perilla drink.",
        "tags": ["Higashikurume"],
        "storyTitle": "Higashikurume orchard and field foods",
        "intro": ["Explore blueberries, kiwi fruit, plums, vegetables and a locally named perilla drink.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"東久留米果樹與田野飲食","subtitle":"東久留米果樹與田野飲食","description":"認識藍莓、奇異果、梅子、蔬菜與在地紫蘇飲品。","tags":["東久留米市"],"storyTitle":"東久留米果樹與田野飲食","intro":["認識藍莓、奇異果、梅子、蔬菜與在地紫蘇飲品。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"赤しそ濃縮ジュース「しそすっきり」","body":"市は「しそすっきり」を、東久留米産の赤しそを使う濃縮飲料として紹介しています。"},
        {"number":"02.","title":"東久留米のブルーベリー・キウイ・梅","body":"東京都の生産者紹介は、奈良山園のブルーベリー、キウイ、梅を挙げ、自家製堆肥を使う農業の取り組みを紹介しています。"},
        {"number":"03.","title":"東久留米の地場野菜","body":"東京都の奈良山園の紹介には、大根、枝豆、ミニトマト、ナスなども掲載。農園の案内は直売所と野崎書林マルシェを紹介しています。"}
      ],
      "en": [
        {"number":"01.","title":"Shiso Sukkiri Red Perilla Drink","body":"The city describes Shiso Sukkiri as a concentrated drink made with red perilla grown in Higashikurume."},
        {"number":"02.","title":"Higashikurume Blueberries, Kiwi and Plums","body":"Tokyo’s producer directory lists Narayama Farm’s blueberries, kiwi fruit and plums and describes its use of homemade compost."},
        {"number":"03.","title":"Higashikurume Seasonal Farm Vegetables","body":"Tokyo’s Narayama Farm listing also includes daikon, edamame, cherry tomatoes and eggplants. The farm’s guide describes its outlets and Nozaki Shorin Marche."}
      ],
      "zh-TW": [{"number":"01.","title":"紅紫蘇飲品","body":"市府將「Shiso Sukkiri」介紹為使用東久留米紅紫蘇製作的濃縮飲品。"},{"number":"02.","title":"東久留米果樹","body":"東京都生產者名錄列出奈良山園的藍莓、奇異果與梅子，並介紹使用自製堆肥的農業作法。"},{"number":"03.","title":"東久留米蔬菜","body":"東京都的奈良山園介紹也列有白蘿蔔、毛豆、小番茄與茄子；農園指南介紹其直賣據點與野崎書林市集。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":120,"steps":[{"spotId":"b07-higashikurume-farm-fruit-hatake-terrace"},{"spotId":"b07-higashikurume-farm-fruit-nozaki"}]}]
  },
  "routeName": {"ja":"東久留米の果樹と畑の食","en":"Higashikurume orchard and field foods","zh-TW":"東久留米果樹與田野飲食"},
  "location": {"ja":{"area":"東久留米市","station":"","access":""},"en":{"area":"Higashikurume","station":"","access":""},"zh-TW":{"area":"東久留米市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "東久留米駅", "en": "Higashi-Kurume Station", "zh-TW": "東久留米站"}, "spotId": "b07-higashikurume-farm-fruit-hatake-terrace", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b07-higashikurume-farm-fruit-hatake-terrace",
          "description": {"ja":"奈良山園の案内は、畑のそばで農産物を直売する場所として紹介しています。","en":"Narayama Farm’s guide describes this outlet beside the fields for direct farm-produce sales.","zh-TW":"奈良山園指南介紹此處為田旁的農產直賣據點。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-higashikurume-farm-fruit-nozaki",
          "description": {"ja":"農園の案内では、地域の野菜、柳久保小麦製品や特産品を集める書店内のマルシェとして紹介されています。","en":"The farm’s guide describes a market inside a bookshop gathering local vegetables, Yanagikubo wheat products and regional specialties.","zh-TW":"農園指南將此處介紹為書店內的市集，匯集在地蔬菜、柳久保小麥製品與地方特產。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。 市の認定一覧は過去の記録です。現在の事業・商品情報は出典先でご確認ください。"},
        "en": {
          "time": "About 120 min (editorial estimate)",
          "distance": "",
          "spots": "2 stops",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story. The municipal certification list is a historical record. Check the source for current business and product information."
        },
        "zh-TW": {"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。 市府認證名錄是過去的記錄。請透過出處確認現行業者與商品資訊。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b07-higashikurume-farm-fruit-hatake-terrace": {
      "presentation": {
        "id": "b07-higashikurume-farm-fruit-hatake-terrace",
        "regionId": "higashikurume",
        "foodCultureId": "higashikurume-farm-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"畑テラス","lead":"奈良山園の案内は、畑のそばで農産物を直売する場所として紹介しています。","description":"奈良山園の案内は、畑のそばで農産物を直売する場所として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Hatake Terrace",
            "lead": "Narayama Farm’s guide describes this outlet beside the fields for direct farm-produce sales.",
            "description": "Narayama Farm’s guide describes this outlet beside the fields for direct farm-produce sales.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Hatake Terrace 農田直賣所","lead":"奈良山園指南介紹此處為田旁的農產直賣據點。","description":"奈良山園指南介紹此處為田旁的農產直賣據點。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"奈良山園の案内は、畑のそばで農産物を直売する場所として紹介しています。","en":"Narayama Farm’s guide describes this outlet beside the fields for direct farm-produce sales.","zh-TW":"奈良山園指南介紹此處為田旁的農產直賣據點。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://nonosachi.com/access","en":"https://nonosachi.com/access","zh-TW":"https://nonosachi.com/access"}},
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"アクセス – 奈良山園 NARAYAMA FARM","url":"https://nonosachi.com/access","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b07-higashikurume-farm-fruit-nozaki": {
      "presentation": {
        "id": "b07-higashikurume-farm-fruit-nozaki",
        "regionId": "higashikurume",
        "foodCultureId": "higashikurume-farm-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "野崎書林マルシェ",
            "lead": "農園の案内では、地域の野菜、柳久保小麦製品や特産品を集める書店内のマルシェとして紹介されています。",
            "description": "農園の案内では、地域の野菜、柳久保小麦製品や特産品を集める書店内のマルシェとして紹介されています。",
            "tags": [],
            "practicalInfo": [{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],
            "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]
          },
          "en": {
            "name": "Nozaki Shorin Marche",
            "lead": "The farm’s guide describes a market inside a bookshop gathering local vegetables, Yanagikubo wheat products and regional specialties.",
            "description": "The farm’s guide describes a market inside a bookshop gathering local vegetables, Yanagikubo wheat products and regional specialties.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"野崎書林市集","lead":"農園指南將此處介紹為書店內的市集，匯集在地蔬菜、柳久保小麥製品與地方特產。","description":"農園指南將此處介紹為書店內的市集，匯集在地蔬菜、柳久保小麥製品與地方特產。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"農園の案内では、地域の野菜、柳久保小麦製品や特産品を集める書店内のマルシェとして紹介されています。","en":"The farm’s guide describes a market inside a bookshop gathering local vegetables, Yanagikubo wheat products and regional specialties.","zh-TW":"農園指南將此處介紹為書店內的市集，匯集在地蔬菜、柳久保小麥製品與地方特產。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://nonosachi.com/access","en":"https://nonosachi.com/access","zh-TW":"https://nonosachi.com/access"}},
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"アクセス – 奈良山園 NARAYAMA FARM","url":"https://nonosachi.com/access","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b07-higashikurume-farm-fruit-hatake-terrace",
          "spotId": "b07-higashikurume-farm-fruit-hatake-terrace",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"畑テラス","en":"Hatake Terrace","zh-TW":"Hatake Terrace 農田直賣所"},
          "description": {"ja":"奈良山園の案内は、畑のそばで農産物を直売する場所として紹介しています。","en":"Narayama Farm’s guide describes this outlet beside the fields for direct farm-produce sales.","zh-TW":"奈良山園指南介紹此處為田旁的農產直賣據點。"}
        },
        {
          "referenceId": "b07-higashikurume-farm-fruit-nozaki",
          "spotId": "b07-higashikurume-farm-fruit-nozaki",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"野崎書林マルシェ","en":"Nozaki Shorin Marche","zh-TW":"野崎書林市集"},
          "description": {"ja":"農園の案内では、地域の野菜、柳久保小麦製品や特産品を集める書店内のマルシェとして紹介されています。","en":"The farm’s guide describes a market inside a bookshop gathering local vegetables, Yanagikubo wheat products and regional specialties.","zh-TW":"農園指南將此處介紹為書店內的市集，匯集在地蔬菜、柳久保小麥製品與地方特產。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"東久留米市","station":""},"en":{"region":"Higashikurume","station":""},"zh-TW":{"region":"東久留米市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Narayama Farm Hatake Terrace access", "url": "https://nonosachi.com/access", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-4": {"name":"アクセス – 奈良山園 NARAYAMA FARM","url":"https://nonosachi.com/access","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-7": {"name":"特産品一覧（「東久留米大好きっ！」掲載品）｜東久留米市ホームページ","url":"https://www.city.higashikurume.lg.jp/shisei/profile/tokusan/tokusan/1003816.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-23": {"name":"﻿","url":"https://www.sangyo-rodo1.metro.tokyo.lg.jp/norin/syoku/econosanbutu/seisansya/222039.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b07 editorial itinerary — estimated timing and order, not a timetable","url":"https://nonosachi.com/access","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-4","source-7","source-23"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-4","source-7","source-23"],"origin":"editorial"},
    "location": {"sourceIds":["source-4","source-7","source-23"],"origin":"editorial"},
    "story": {"sourceIds":["source-4","source-7","source-23"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-4","source-7","source-23"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-4","source-7","source-23"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-7"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-7"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-7"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-23"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-23"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-23"],"origin":"editorial"},
    "journey.chapters.ja.2": {"sourceIds":["source-23","source-4"],"origin":"editorial"},
    "journey.chapters.en.2": {"sourceIds":["source-23","source-4"],"origin":"editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds":["source-23","source-4"],"origin":"editorial"},
    "spots.b07-higashikurume-farm-fruit-hatake-terrace": {"sourceIds":["source-4"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-4"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-4"],"origin":"editorial"},
    "spots.b07-higashikurume-farm-fruit-nozaki": {"sourceIds":["source-4"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-4"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-4"],"origin":"editorial"}
  }
};
