import type { JourneyRecord } from '../journey-record';

export const b04KoganeiConfectioneryRecord: JourneyRecord = {
  "municipalityId": "koganei",
  "alcoholThemed": false,
  "journey": {
    "id": "b04-koganei-confectionery",
    "regionId": "koganei",
    "foodCultureId": "koganei-confectionery",
    "storyId": "b04-koganei-confectionery",
    "routeId": "b04-koganei-confectionery-route",
    "copy": {
      "ja": {"title":"小金井の麩まんじゅうと野菜菓子","subtitle":"小金井の麩まんじゅうと野菜菓子","description":"菓子職人の継承と、地元農家との試みを読む。","tags":["小金井市"],"storyTitle":"小金井の麩まんじゅうと野菜菓子","intro":["菓子職人の継承と、地元農家との試みを読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Koganei’s fu-manju and vegetable sweets",
        "subtitle": "Koganei’s fu-manju and vegetable sweets",
        "description": "Explore confectioners’ inherited skills and links with local growers.",
        "tags": ["Koganei"],
        "storyTitle": "Koganei’s fu-manju and vegetable sweets",
        "intro": ["Explore confectioners’ inherited skills and links with local growers.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"小金井麩饅頭與蔬菜和菓子","subtitle":"小金井麩饅頭與蔬菜和菓子","description":"認識和菓子職人的傳承與當地農家的合作。","tags":["小金井市"],"storyTitle":"小金井麩饅頭與蔬菜和菓子","intro":["認識和菓子職人的傳承與當地農家的合作。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"御菓子司 三陽の麩まんじゅう","body":"三陽の麩まんじゅうは、京都の懐石料理に由来する製法を受け継ぐ地域の菓子として紹介されています。"},{"number":"02.","title":"小金井産トマトの大福・羊羹","body":"2013年の取材では、亀屋が地元農家のトマトを使い、大福と羊かんを開発した経緯が紹介されています。現在の商品案内ではありません。"}],
      "en": [
        {"number":"01.","title":"Sanyo's fu-manju","body":"The chamber of commerce describes Sanyo’s fu-manju as a local sweet whose method comes from Kyoto kaiseki cooking."},
        {"number":"02.","title":"Koganei tomato daifuku and yokan","body":"A 2013 report recounts how Kameya developed daifuku and yokan using tomatoes supplied by a Koganei grower. This is a historical account, not a current product listing."}
      ],
      "zh-TW": [{"number":"01.","title":"三陽的麩饅頭","body":"商工會介紹三陽的麩饅頭為承襲京都懷石料理製法的地方和菓子。"},{"number":"02.","title":"小金井番茄大福與羊羹","body":"2013 年報導記錄龜屋使用小金井農家供應的番茄開發大福與羊羹的經過；這是歷史記錄，並非現行商品目錄。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":120,"steps":[{"spotId":"b04-koganei-confectionery-sanyo"},{"spotId":"b04-koganei-confectionery-kameya"}]}]
  },
  "routeName": {"ja":"小金井の麩まんじゅうと野菜菓子","en":"Koganei’s fu-manju and vegetable sweets","zh-TW":"小金井麩饅頭與蔬菜和菓子"},
  "location": {"ja":{"area":"小金井市","station":"","access":""},"en":{"area":"Koganei","station":"","access":""},"zh-TW":{"area":"小金井市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "武蔵小金井駅", "en": "Musashi-Koganei Station", "zh-TW": "武藏小金井站"}, "spotId": "b04-koganei-confectionery-kameya", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b04-koganei-confectionery-sanyo",
          "description": {"ja":"商工会が麩まんじゅうの店として紹介しています。","en":"The chamber of commerce introduces Sanyo for its fu-manju.","zh-TW":"商工會以麩饅頭介紹三陽。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"
          }
        },
        {
          "spotId": "b04-koganei-confectionery-kameya",
          "description": {"ja":"2013年の取材でトマト菓子を作った店。市の江戸東京野菜使用店にも掲載されています。","en":"A 2013 report links this shop to tomato sweets; the city also lists it among Edo-Tokyo vegetable establishments.","zh-TW":"2013 年報導記錄此店製作番茄和菓子，市府也列其為江戶東京蔬菜使用店。"},
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
    "b04-koganei-confectionery-sanyo": {
      "presentation": {
        "id": "b04-koganei-confectionery-sanyo",
        "regionId": "koganei",
        "foodCultureId": "koganei-confectionery",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"御菓子司 三陽","lead":"商工会が麩まんじゅうの店として紹介しています。","description":"商工会が麩まんじゅうの店として紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Sanyo Confectionery",
            "lead": "The chamber of commerce introduces Sanyo for its fu-manju.",
            "description": "The chamber of commerce introduces Sanyo for its fu-manju.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"三陽和菓子店","lead":"商工會以麩饅頭介紹三陽。","description":"商工會以麩饅頭介紹三陽。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"商工会が麩まんじゅうの店として紹介しています。","en":"The chamber of commerce introduces Sanyo for its fu-manju.","zh-TW":"商工會以麩饅頭介紹三陽。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://koganei-s.or.jp/hyakuten-isshu/theme/nostalgia/sanyo/","en":"https://koganei-s.or.jp/hyakuten-isshu/theme/nostalgia/sanyo/","zh-TW":"https://koganei-s.or.jp/hyakuten-isshu/theme/nostalgia/sanyo/"}
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
      "officialSource": {"name":"御菓子司 三陽｜心ときめく口福おもたせ｜小金井百店一首〜江戸東京こがねい浪漫〜","url":"https://koganei-s.or.jp/hyakuten-isshu/theme/nostalgia/sanyo/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b04-koganei-confectionery-kameya": {
      "presentation": {
        "id": "b04-koganei-confectionery-kameya",
        "regionId": "koganei",
        "foodCultureId": "koganei-confectionery",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"御菓子司 亀屋","lead":"2013年の取材でトマト菓子を作った店。市の江戸東京野菜使用店にも掲載されています。","description":"2013年の取材でトマト菓子を作った店。市の江戸東京野菜使用店にも掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Kameya Confectionery",
            "lead": "A 2013 report links this shop to tomato sweets; the city also lists it among Edo-Tokyo vegetable establishments.",
            "description": "A 2013 report links this shop to tomato sweets; the city also lists it among Edo-Tokyo vegetable establishments.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"龜屋和菓子店","lead":"2013 年報導記錄此店製作番茄和菓子，市府也列其為江戶東京蔬菜使用店。","description":"2013 年報導記錄此店製作番茄和菓子，市府也列其為江戶東京蔬菜使用店。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"2013年の取材でトマト菓子を作った店。市の江戸東京野菜使用店にも掲載されています。","en":"A 2013 report links this shop to tomato sweets; the city also lists it among Edo-Tokyo vegetable establishments.","zh-TW":"2013 年報導記錄此店製作番茄和菓子，市府也列其為江戶東京蔬菜使用店。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {
              "ja": "https://www.city.koganei.lg.jp/kankobunka/kankobunka_oshirase/edoyasaishiyoten.html",
              "en": "https://www.city.koganei.lg.jp/kankobunka/kankobunka_oshirase/edoyasaishiyoten.html",
              "zh-TW": "https://www.city.koganei.lg.jp/kankobunka/kankobunka_oshirase/edoyasaishiyoten.html"
            }
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
      "officialSource": {"name":"小金井市認定　江戸東京野菜使用店：小金井市公式WEBへようこそ","url":"https://www.city.koganei.lg.jp/kankobunka/kankobunka_oshirase/edoyasaishiyoten.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b04-koganei-confectionery-sanyo",
          "spotId": "b04-koganei-confectionery-sanyo",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"御菓子司 三陽","en":"Sanyo Confectionery","zh-TW":"三陽和菓子店"},
          "description": {"ja":"商工会が麩まんじゅうの店として紹介しています。","en":"The chamber of commerce introduces Sanyo for its fu-manju.","zh-TW":"商工會以麩饅頭介紹三陽。"}
        },
        {
          "referenceId": "b04-koganei-confectionery-kameya",
          "spotId": "b04-koganei-confectionery-kameya",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"御菓子司 亀屋","en":"Kameya Confectionery","zh-TW":"龜屋和菓子店"},
          "description": {"ja":"2013年の取材でトマト菓子を作った店。市の江戸東京野菜使用店にも掲載されています。","en":"A 2013 report links this shop to tomato sweets; the city also lists it among Edo-Tokyo vegetable establishments.","zh-TW":"2013 年報導記錄此店製作番茄和菓子，市府也列其為江戶東京蔬菜使用店。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"小金井市","station":""},"en":{"region":"Koganei","station":""},"zh-TW":{"region":"小金井市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Koganei Tourism Association – Kameya", "url": "https://koganei-kanko.jp/maron/archives/70408", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-1": {"name":"小金井市認定　江戸東京野菜使用店：小金井市公式WEBへようこそ","url":"https://www.city.koganei.lg.jp/kankobunka/kankobunka_oshirase/edoyasaishiyoten.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-9": {"name":"御菓子司 三陽｜心ときめく口福おもたせ｜小金井百店一首〜江戸東京こがねい浪漫〜","url":"https://koganei-s.or.jp/hyakuten-isshu/theme/nostalgia/sanyo/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-10": {"name":"地元産野菜使って　トマト大福　トマト羊かん（2013年9月16日 第1085号）","url":"https://www.nouminren.ne.jp/old/shinbun/201309/2013091609.htm","sourceType":"business","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b04 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.city.koganei.lg.jp/kankobunka/kankobunka_oshirase/edoyasaishiyoten.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-1","source-9","source-10"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-1","source-9","source-10"],"origin":"editorial"},
    "location": {"sourceIds":["source-1","source-9","source-10"],"origin":"editorial"},
    "story": {"sourceIds":["source-1","source-9","source-10"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-1","source-9","source-10"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-1","source-9","source-10"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-9"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-9"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-9"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b04-koganei-confectionery-sanyo": {"sourceIds":["source-9"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-9"],"origin":"editorial"},
    "spots.b04-koganei-confectionery-kameya": {"sourceIds":["source-1","source-10"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-1","source-10"],"origin":"editorial"}
  }
};
