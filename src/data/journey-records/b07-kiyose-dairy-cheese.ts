import type { JourneyRecord } from '../journey-record';

export const b07KiyoseDairyCheeseRecord: JourneyRecord = {
  "municipalityId": "kiyose",
  "alcoholThemed": false,
  "journey": {
    "id": "b07-kiyose-dairy-cheese",
    "regionId": "kiyose",
    "foodCultureId": "kiyose-dairy-cheese",
    "storyId": "b07-kiyose-dairy-cheese",
    "routeId": "b07-kiyose-dairy-cheese-route",
    "copy": {
      "ja": {"title":"清瀬の生乳からフレッシュチーズへ","subtitle":"清瀬の生乳からフレッシュチーズへ","description":"牧場の生乳と、街を越えて作られるフレッシュチーズのつながり。","tags":["清瀬市"],"storyTitle":"清瀬の生乳からフレッシュチーズへ","intro":["牧場の生乳と、街を越えて作られるフレッシュチーズのつながり。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Kiyose milk becomes fresh cheese",
        "subtitle": "Kiyose milk becomes fresh cheese",
        "description": "Explore the connection between Kiyose dairy milk and fresh-cheese processing.",
        "tags": ["Kiyose"],
        "storyTitle": "Kiyose milk becomes fresh cheese",
        "intro": ["Explore the connection between Kiyose dairy milk and fresh-cheese processing.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"從清瀨生乳到新鮮起司","subtitle":"從清瀨生乳到新鮮起司","description":"認識清瀨牧場生乳與跨地區新鮮起司製作的連結。","tags":["清瀨市"],"storyTitle":"從清瀨生乳到新鮮起司","intro":["認識清瀨牧場生乳與跨地區新鮮起司製作的連結。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"清瀬産生乳とフレッシュチーズ","body":"観光協会は清瀬の5軒の牧場と、清瀬の生乳をフレッシュチーズに加工するGOOD CHEESE LABORATORYを紹介しています。"}],
      "en": [{"number":"01.","title":"Kiyose Dairy Milk and Fresh Cheese","body":"The tourism association describes five Kiyose dairy farms and GOOD CHEESE LABORATORY’s processing of Kiyose milk into fresh cheese."}],
      "zh-TW": [{"number":"01.","title":"清瀨生乳與起司","body":"觀光協會介紹清瀨的五家牧場，以及將清瀨生乳製成新鮮起司的 GOOD CHEESE LABORATORY。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":120,"steps":[{"spotId":"b07-kiyose-dairy-cheese-cheese-city-hall"}]}]
  },
  "routeName": {"ja":"清瀬の生乳からフレッシュチーズへ","en":"Kiyose milk becomes fresh cheese","zh-TW":"從清瀨生乳到新鮮起司"},
  "location": {"ja":{"area":"清瀬市","station":"","access":""},"en":{"area":"Kiyose","station":"","access":""},"zh-TW":{"area":"清瀨市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "清瀬市役所", "en": "Kiyose City Hall bus stop", "zh-TW": "清瀨市公所巴士站"}, "spotId": "b07-kiyose-dairy-cheese-cheese-city-hall", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b07-kiyose-dairy-cheese-cheese-city-hall",
          "description": {"ja":"観光協会は、清瀬の生乳から作るチーズの取扱先としてこの売店を紹介しています。","en":"The association identifies this shop in its account of cheese made from Kiyose milk.","zh-TW":"觀光協會在清瀨生乳起司的介紹中列有此商店。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約120分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。"},
        "en": {
          "time": "About 120 min (editorial estimate)",
          "distance": "",
          "spots": "1 stops",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story."
        },
        "zh-TW": {"time":"約 120 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b07-kiyose-dairy-cheese-cheese-city-hall": {
      "presentation": {
        "id": "b07-kiyose-dairy-cheese-cheese-city-hall",
        "regionId": "kiyose",
        "foodCultureId": "kiyose-dairy-cheese",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "清瀬市役所本庁舎1階売店",
            "lead": "観光協会は、清瀬の生乳から作るチーズの取扱先としてこの売店を紹介しています。",
            "description": "観光協会は、清瀬の生乳から作るチーズの取扱先としてこの売店を紹介しています。",
            "tags": [],
            "practicalInfo": [{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],
            "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]
          },
          "en": {
            "name": "Kiyose City Hall Main-building Shop",
            "lead": "The association identifies this shop in its account of cheese made from Kiyose milk.",
            "description": "The association identifies this shop in its account of cheese made from Kiyose milk.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"清瀨市役所本廳舍一樓商店","lead":"觀光協會在清瀨生乳起司的介紹中列有此商店。","description":"觀光協會在清瀨生乳起司的介紹中列有此商店。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会は、清瀬の生乳から作るチーズの取扱先としてこの売店を紹介しています。","en":"The association identifies this shop in its account of cheese made from Kiyose milk.","zh-TW":"觀光協會在清瀨生乳起司的介紹中列有此商店。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.kiyosekanko.tokyo/information/souvenir/tourism","en":"https://www.kiyosekanko.tokyo/information/souvenir/tourism","zh-TW":"https://www.kiyosekanko.tokyo/information/souvenir/tourism"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"お土産・地域産品｜清瀬市観光協会公式サイト｜その先の、感動へ。","url":"https://www.kiyosekanko.tokyo/information/souvenir/tourism","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b07-kiyose-dairy-cheese-cheese-city-hall",
          "spotId": "b07-kiyose-dairy-cheese-cheese-city-hall",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"清瀬市役所本庁舎1階売店","en":"Kiyose City Hall Main-building Shop","zh-TW":"清瀨市役所本廳舍一樓商店"},
          "description": {"ja":"観光協会は、清瀬の生乳から作るチーズの取扱先としてこの売店を紹介しています。","en":"The association identifies this shop in its account of cheese made from Kiyose milk.","zh-TW":"觀光協會在清瀨生乳起司的介紹中列有此商店。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"清瀬市","station":""},"en":{"region":"Kiyose","station":""},"zh-TW":{"region":"清瀨市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Kiyose City Hall access", "url": "https://mobile.city.kiyose.lg.jp/shisetsu/sisetu/1001180.html", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-21": {"name":"お土産・地域産品｜清瀬市観光協会公式サイト｜その先の、感動へ。","url":"https://www.kiyosekanko.tokyo/information/souvenir/tourism","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b07 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.kiyosekanko.tokyo/information/souvenir/tourism","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-21"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-21"],"origin":"editorial"},
    "location": {"sourceIds":["source-21"],"origin":"editorial"},
    "story": {"sourceIds":["source-21"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-21"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-21"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-21"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-21"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-21"],"origin":"editorial"},
    "spots.b07-kiyose-dairy-cheese-cheese-city-hall": {"sourceIds":["source-21"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-21"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-21"],"origin":"editorial"}
  }
};
