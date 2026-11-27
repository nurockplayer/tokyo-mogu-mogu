import type { JourneyRecord } from '../journey-record';

export const b04KodairaSouvenirSweetsRecord: JourneyRecord = {
  "municipalityId": "kodaira",
  "journey": {
    "id": "b04-kodaira-souvenir-sweets",
    "regionId": "kodaira",
    "foodCultureId": "kodaira-souvenir-sweets",
    "storyId": "b04-kodaira-souvenir-sweets",
    "routeId": "b04-kodaira-souvenir-sweets-route",
    "copy": {
      "ja": {"title":"小平の鳥と街を映す菓子","subtitle":"小平の鳥と街を映す菓子","description":"コゲラと丸ポスト、地名を菓子に映す作り手。","tags":["小平市"],"storyTitle":"小平の鳥と街を映す菓子","intro":["コゲラと丸ポスト、地名を菓子に映す作り手。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Kodaira sweets inspired by birds and town",
        "subtitle": "Kodaira sweets inspired by birds and town",
        "description": "Meet confectioners interpreting the city’s bird, postboxes and name.",
        "tags": ["Kodaira"],
        "storyTitle": "Kodaira sweets inspired by birds and town",
        "intro": ["Meet confectioners interpreting the city’s bird, postboxes and name.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"映照小平鳥與街景的糕點","subtitle":"映照小平鳥與街景的糕點","description":"認識將市鳥、圓筒郵筒與地名融入糕點的職人。","tags":["小平市"],"storyTitle":"映照小平鳥與街景的糕點","intro":["認識將市鳥、圓筒郵筒與地名融入糕點的職人。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"こげらまんじゅう","body":"こげらまんじゅうは市の鳥を描く和菓子。市は立花家、青柳、亀屋菓子店、玉川屋を組合加盟店として紹介しています。"},
        {"number":"02.","title":"小平の夢ちゃん","body":"エトアールの焼き菓子一覧には「小平の夢ちゃん」が掲載されています。"},
        {"number":"03.","title":"菓夢果夢","body":"エトアールは「菓夢果夢（カムカム）」という焼き菓子も紹介しています。"},
        {"number":"04.","title":"小平丸ポストサブレ","body":"市が観光の題材にする丸型ポスト。エトアールの菓子一覧には「小平丸ポストサブレ」があります。"}
      ],
      "en": [
        {"number":"01.","title":"Kogera manju","body":"Kogera manju depicts the city’s bird. The city names Tachibanaya, Aoyagi, Kameya and Tamagawaya as wagashi association members."},
        {"number":"02.","title":"Kodaira no Yume-chan","body":"Etoile lists Kodaira no Yume-chan among its baked sweets."},
        {"number":"03.","title":"Kamukamu","body":"Etoile also lists a baked confection called Kamukamu."},
        {"number":"04.","title":"Kodaira round-postbox sablé","body":"The city highlights historic round postboxes as an attraction. Etoile lists a Kodaira Maru Post Sablé."}
      ],
      "zh-TW": [
        {"number":"01.","title":"小啄木鳥饅頭","body":"小啄木鳥饅頭描繪小平市鳥；市府列出立花家、青柳、龜屋與玉川屋等和菓子組合加盟店。"},
        {"number":"02.","title":"小平夢醬","body":"Etoile 的烘焙點心介紹列有「小平夢醬」。"},
        {"number":"03.","title":"菓夢果夢","body":"Etoile 也介紹名為「菓夢果夢」的烘焙點心。"},
        {"number":"04.","title":"小平圓筒郵筒沙布列","body":"市府將懷舊圓筒郵筒列為觀光特色；Etoile 的糕點介紹有「小平圓筒郵筒沙布列」。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 210,
        "steps": [{"spotId":"b04-kodaira-souvenir-sweets-tachibanaya"},{"spotId":"b04-kodaira-souvenir-sweets-aoyagi"},{"spotId":"b04-kodaira-souvenir-sweets-kameya"},{"spotId":"b04-kodaira-souvenir-sweets-tamagawaya"},{"spotId":"b04-kodaira-souvenir-sweets-etoile"}]
      }
    ]
  },
  "routeName": {"ja":"小平の鳥と街を映す菓子","en":"Kodaira sweets inspired by birds and town","zh-TW":"映照小平鳥與街景的糕點"},
  "location": {"ja":{"area":"小平市","station":"","access":""},"en":{"area":"Kodaira","station":"","access":""},"zh-TW":{"area":"小平市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "一橋学園駅", "en": "Hitotsubashi-Gakuen Station", "zh-TW": "一橋學園站"}, "spotId": "b04-kodaira-souvenir-sweets-etoile", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b04-kodaira-souvenir-sweets-tachibanaya",
          "description": {"ja":"市がこげらまんじゅうの紹介で挙げる和菓子組合加盟店です。","en":"The city lists this wagashi association shop in its Kogera manju guide.","zh-TW":"市府在小啄木鳥饅頭介紹中列出的和菓子組合加盟店。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"
          }
        },
        {
          "spotId": "b04-kodaira-souvenir-sweets-aoyagi",
          "description": {"ja":"市のこげらまんじゅう案内に掲載される店です。","en":"The shop appears in the city’s Kogera manju guide.","zh-TW":"市府小啄木鳥饅頭介紹所列的店家。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"
          }
        },
        {
          "spotId": "b04-kodaira-souvenir-sweets-kameya",
          "description": {"ja":"市がこげらまんじゅうに関連して紹介しています。","en":"The city introduces this shop in connection with Kogera manju.","zh-TW":"市府將此店與小啄木鳥饅頭連結介紹。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"
          }
        },
        {
          "spotId": "b04-kodaira-souvenir-sweets-tamagawaya",
          "description": {"ja":"市のこげらまんじゅう案内にある和菓子組合加盟店です。","en":"A wagashi association member listed in the city’s Kogera manju guide.","zh-TW":"市府小啄木鳥饅頭介紹所列的和菓子組合加盟店。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"
          }
        },
        {
          "spotId": "b04-kodaira-souvenir-sweets-etoile",
          "description": {"ja":"店の案内にはブルーベリーのケーキや、小平の名を冠する焼き菓子が掲載されています。","en":"The shop listing includes blueberry cake and baked sweets named for Kodaira.","zh-TW":"店家介紹列有藍莓蛋糕與以小平命名的烘焙點心。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約210分（編集目安）","distance":"","spots":"5 か所","station":"","minutes":"210","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。"},
        "en": {
          "time": "About 210 min (editorial estimate)",
          "distance": "",
          "spots": "5 stops",
          "station": "",
          "minutes": "210",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing."
        },
        "zh-TW": {"time":"約 210 分鐘（編輯估計）","distance":"","spots":"5 處","station":"","minutes":"210","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b04-kodaira-souvenir-sweets-tachibanaya": {
      "presentation": {
        "id": "b04-kodaira-souvenir-sweets-tachibanaya",
        "regionId": "kodaira",
        "foodCultureId": "kodaira-souvenir-sweets",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"旬彩游菓 立花家","lead":"市がこげらまんじゅうの紹介で挙げる和菓子組合加盟店です。","description":"市がこげらまんじゅうの紹介で挙げる和菓子組合加盟店です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Tachibanaya",
            "lead": "The city lists this wagashi association shop in its Kogera manju guide.",
            "description": "The city lists this wagashi association shop in its Kogera manju guide.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"立花家","lead":"市府在小啄木鳥饅頭介紹中列出的和菓子組合加盟店。","description":"市府在小啄木鳥饅頭介紹中列出的和菓子組合加盟店。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市がこげらまんじゅうの紹介で挙げる和菓子組合加盟店です。","en":"The city lists this wagashi association shop in its Kogera manju guide.","zh-TW":"市府在小啄木鳥饅頭介紹中列出的和菓子組合加盟店。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","en":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","zh-TW":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html"}
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
      "officialSource": {"name":"市の鳥をイラストした和菓子｜東京都小平市公式ホームページ","url":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b04-kodaira-souvenir-sweets-aoyagi": {
      "presentation": {
        "id": "b04-kodaira-souvenir-sweets-aoyagi",
        "regionId": "kodaira",
        "foodCultureId": "kodaira-souvenir-sweets",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"菓子舗 青柳","lead":"市のこげらまんじゅう案内に掲載される店です。","description":"市のこげらまんじゅう案内に掲載される店です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Aoyagi Confectionery",
            "lead": "The shop appears in the city’s Kogera manju guide.",
            "description": "The shop appears in the city’s Kogera manju guide.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"青柳菓子店","lead":"市府小啄木鳥饅頭介紹所列的店家。","description":"市府小啄木鳥饅頭介紹所列的店家。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市のこげらまんじゅう案内に掲載される店です。","en":"The shop appears in the city’s Kogera manju guide.","zh-TW":"市府小啄木鳥饅頭介紹所列的店家。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","en":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","zh-TW":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html"}
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
      "officialSource": {"name":"市の鳥をイラストした和菓子｜東京都小平市公式ホームページ","url":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b04-kodaira-souvenir-sweets-kameya": {
      "presentation": {
        "id": "b04-kodaira-souvenir-sweets-kameya",
        "regionId": "kodaira",
        "foodCultureId": "kodaira-souvenir-sweets",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"亀屋菓子店","lead":"市がこげらまんじゅうに関連して紹介しています。","description":"市がこげらまんじゅうに関連して紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Kameya Confectionery",
            "lead": "The city introduces this shop in connection with Kogera manju.",
            "description": "The city introduces this shop in connection with Kogera manju.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"龜屋菓子店","lead":"市府將此店與小啄木鳥饅頭連結介紹。","description":"市府將此店與小啄木鳥饅頭連結介紹。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市がこげらまんじゅうに関連して紹介しています。","en":"The city introduces this shop in connection with Kogera manju.","zh-TW":"市府將此店與小啄木鳥饅頭連結介紹。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","en":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","zh-TW":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html"}
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
      "officialSource": {"name":"市の鳥をイラストした和菓子｜東京都小平市公式ホームページ","url":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b04-kodaira-souvenir-sweets-tamagawaya": {
      "presentation": {
        "id": "b04-kodaira-souvenir-sweets-tamagawaya",
        "regionId": "kodaira",
        "foodCultureId": "kodaira-souvenir-sweets",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"和菓子 玉川屋","lead":"市のこげらまんじゅう案内にある和菓子組合加盟店です。","description":"市のこげらまんじゅう案内にある和菓子組合加盟店です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Tamagawaya",
            "lead": "A wagashi association member listed in the city’s Kogera manju guide.",
            "description": "A wagashi association member listed in the city’s Kogera manju guide.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"玉川屋和菓子","lead":"市府小啄木鳥饅頭介紹所列的和菓子組合加盟店。","description":"市府小啄木鳥饅頭介紹所列的和菓子組合加盟店。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市のこげらまんじゅう案内にある和菓子組合加盟店です。","en":"A wagashi association member listed in the city’s Kogera manju guide.","zh-TW":"市府小啄木鳥饅頭介紹所列的和菓子組合加盟店。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","en":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","zh-TW":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html"}
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
      "officialSource": {"name":"市の鳥をイラストした和菓子｜東京都小平市公式ホームページ","url":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b04-kodaira-souvenir-sweets-etoile": {
      "presentation": {
        "id": "b04-kodaira-souvenir-sweets-etoile",
        "regionId": "kodaira",
        "foodCultureId": "kodaira-souvenir-sweets",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"洋菓子の店 エトアール","lead":"店の案内にはブルーベリーのケーキや、小平の名を冠する焼き菓子が掲載されています。","description":"店の案内にはブルーベリーのケーキや、小平の名を冠する焼き菓子が掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Etoile Patisserie",
            "lead": "The shop listing includes blueberry cake and baked sweets named for Kodaira.",
            "description": "The shop listing includes blueberry cake and baked sweets named for Kodaira.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Etoile 洋菓子店","lead":"店家介紹列有藍莓蛋糕與以小平命名的烘焙點心。","description":"店家介紹列有藍莓蛋糕與以小平命名的烘焙點心。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"店の案内にはブルーベリーのケーキや、小平の名を冠する焼き菓子が掲載されています。","en":"The shop listing includes blueberry cake and baked sweets named for Kodaira.","zh-TW":"店家介紹列有藍莓蛋糕與以小平命名的烘焙點心。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.kodaira-net.jp/etoile/","en":"https://www.kodaira-net.jp/etoile/","zh-TW":"https://www.kodaira-net.jp/etoile/"}},
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"洋菓子の店　エトアール | こだいらネット","url":"https://www.kodaira-net.jp/etoile/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b04-kodaira-souvenir-sweets-tachibanaya",
          "spotId": "b04-kodaira-souvenir-sweets-tachibanaya",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"旬彩游菓 立花家","en":"Tachibanaya","zh-TW":"立花家"},
          "description": {"ja":"市がこげらまんじゅうの紹介で挙げる和菓子組合加盟店です。","en":"The city lists this wagashi association shop in its Kogera manju guide.","zh-TW":"市府在小啄木鳥饅頭介紹中列出的和菓子組合加盟店。"}
        },
        {
          "referenceId": "b04-kodaira-souvenir-sweets-aoyagi",
          "spotId": "b04-kodaira-souvenir-sweets-aoyagi",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"菓子舗 青柳","en":"Aoyagi Confectionery","zh-TW":"青柳菓子店"},
          "description": {"ja":"市のこげらまんじゅう案内に掲載される店です。","en":"The shop appears in the city’s Kogera manju guide.","zh-TW":"市府小啄木鳥饅頭介紹所列的店家。"}
        },
        {
          "referenceId": "b04-kodaira-souvenir-sweets-kameya",
          "spotId": "b04-kodaira-souvenir-sweets-kameya",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"亀屋菓子店","en":"Kameya Confectionery","zh-TW":"龜屋菓子店"},
          "description": {"ja":"市がこげらまんじゅうに関連して紹介しています。","en":"The city introduces this shop in connection with Kogera manju.","zh-TW":"市府將此店與小啄木鳥饅頭連結介紹。"}
        },
        {
          "referenceId": "b04-kodaira-souvenir-sweets-tamagawaya",
          "spotId": "b04-kodaira-souvenir-sweets-tamagawaya",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"和菓子 玉川屋","en":"Tamagawaya","zh-TW":"玉川屋和菓子"},
          "description": {"ja":"市のこげらまんじゅう案内にある和菓子組合加盟店です。","en":"A wagashi association member listed in the city’s Kogera manju guide.","zh-TW":"市府小啄木鳥饅頭介紹所列的和菓子組合加盟店。"}
        },
        {
          "referenceId": "b04-kodaira-souvenir-sweets-etoile",
          "spotId": "b04-kodaira-souvenir-sweets-etoile",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"洋菓子の店 エトアール","en":"Etoile Patisserie","zh-TW":"Etoile 洋菓子店"},
          "description": {"ja":"店の案内にはブルーベリーのケーキや、小平の名を冠する焼き菓子が掲載されています。","en":"The shop listing includes blueberry cake and baked sweets named for Kodaira.","zh-TW":"店家介紹列有藍莓蛋糕與以小平命名的烘焙點心。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"小平市","station":""},"en":{"region":"Kodaira","station":""},"zh-TW":{"region":"小平市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Kodaira Chamber of Commerce – Etoile shop listing", "url": "https://www.kodaira-net.jp/etoile/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-18": {"name":"洋菓子の店　エトアール | こだいらネット","url":"https://www.kodaira-net.jp/etoile/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-25": {"name":"市の鳥をイラストした和菓子｜東京都小平市公式ホームページ","url":"https://www.city.kodaira.tokyo.jp/kurashi/060/060834.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-26": {"name":"小平の観光 | 東京都小平市公式ホームページ","url":"https://www.city.kodaira.tokyo.jp/charm/charm.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b04 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.kodaira-net.jp/etoile/","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-18","source-25","source-26"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-18","source-25","source-26"],"origin":"editorial"},
    "location": {"sourceIds":["source-18","source-25","source-26"],"origin":"editorial"},
    "story": {"sourceIds":["source-18","source-25","source-26"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-18","source-25","source-26"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-18","source-25","source-26"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-25"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-25"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-25"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.chapters.ja.2": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.chapters.en.2": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds":["source-18"],"origin":"editorial"},
    "journey.chapters.ja.3": {"sourceIds":["source-18","source-26"],"origin":"editorial"},
    "journey.chapters.en.3": {"sourceIds":["source-18","source-26"],"origin":"editorial"},
    "journey.chapters.zh-TW.3": {"sourceIds":["source-18","source-26"],"origin":"editorial"},
    "spots.b04-kodaira-souvenir-sweets-tachibanaya": {"sourceIds":["source-25"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-25"],"origin":"editorial"},
    "spots.b04-kodaira-souvenir-sweets-aoyagi": {"sourceIds":["source-25"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-25"],"origin":"editorial"},
    "spots.b04-kodaira-souvenir-sweets-kameya": {"sourceIds":["source-25"],"origin":"editorial"},
    "variants.half-day.steps.2.description": {"sourceIds":["source-25"],"origin":"editorial"},
    "spots.b04-kodaira-souvenir-sweets-tamagawaya": {"sourceIds":["source-25"],"origin":"editorial"},
    "variants.half-day.steps.3.description": {"sourceIds":["source-25"],"origin":"editorial"},
    "spots.b04-kodaira-souvenir-sweets-etoile": {"sourceIds":["source-18"],"origin":"editorial"},
    "variants.half-day.steps.4.description": {"sourceIds":["source-18"],"origin":"editorial"}
  }
};
