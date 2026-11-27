import type { JourneyRecord } from '../journey-record';

export const b07MusashimurayamaMandarinsRecord: JourneyRecord = {
  "municipalityId": "musashimurayama",
  "journey": {
    "id": "b07-musashimurayama-mandarins",
    "regionId": "musashimurayama",
    "foodCultureId": "musashimurayama-mandarins",
    "storyId": "b07-musashimurayama-mandarins",
    "routeId": "b07-musashimurayama-mandarins-route",
    "copy": {
      "ja": {"title":"武蔵村山、みかんからワインと菓子へ","subtitle":"武蔵村山、みかんからワインと菓子へ","description":"丘陵のみかん栽培と、果実を使う地域の加工を知る。","tags":["武蔵村山市"],"storyTitle":"武蔵村山、みかんからワインと菓子へ","intro":["丘陵のみかん栽培と、果実を使う地域の加工を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Musashimurayama mandarins, wine and sweets",
        "subtitle": "Musashimurayama mandarins, wine and sweets",
        "description": "Explore hillside mandarin growing and local fruit processing.",
        "tags": ["Musashimurayama"],
        "storyTitle": "Musashimurayama mandarins, wine and sweets",
        "intro": ["Explore hillside mandarin growing and local fruit processing.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"武藏村山蜜柑、果酒與點心","subtitle":"武藏村山蜜柑、果酒與點心","description":"認識丘陵蜜柑栽培與地方水果加工。","tags":["武藏村山市"],"storyTitle":"武藏村山蜜柑、果酒與點心","intro":["認識丘陵蜜柑栽培與地方水果加工。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"武蔵村山産みかん","body":"市は狭山丘陵の南斜面をみかんの栽培地として紹介し、内野みかん園、小林農園、内武園などを掲載しています。"},
        {"number":"02.","title":"内野みかん園のみかんワイン","body":"市は内野みかん園の果実を使う発泡感のあるみかんワインと、プレミアム版を地域ブランドの記録に掲載しています。"},
        {"number":"03.","title":"たんぽぽ焼き（MMクリチーみかん）","body":"たんぽぽSWEETS工房は、第九小学校の児童と、武蔵村山産みかんとクリームチーズを使う菓子を共同開発したと市が紹介しています。"}
      ],
      "en": [
        {"number":"01.","title":"Musashimurayama Mandarins","body":"The city describes mandarin growing on the southern slopes of the Sayama Hills and lists Uchino Mandarin Orchard, Kobayashi Farm and Uchitake-en among the orchards."},
        {"number":"02.","title":"Uchino Mandarin Wine","body":"The city’s regional-brand record describes a sparkling-style wine using Uchino Mandarin Orchard fruit and a premium variation."},
        {"number":"03.","title":"Tanpopo Mandarin Cream Cheese Cake","body":"The city describes Tanpopo Sweets Kobo developing a mandarin-and-cream-cheese sweet with pupils of Ninth Elementary School."}
      ],
      "zh-TW": [{"number":"01.","title":"武藏村山蜜柑","body":"市府介紹狹山丘陵南坡的蜜柑栽培，並列有內野蜜柑園、小林農園與內武園等果園。"},{"number":"02.","title":"內野蜜柑酒","body":"市府地方品牌記錄介紹使用內野蜜柑園果實製作、帶氣泡感的蜜柑酒與進階版本。"},{"number":"03.","title":"蜜柑奶油起司甜點","body":"市府介紹蒲公英甜點工房與第九小學學生合作，以武藏村山蜜柑和奶油起司開發點心。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":120,"steps":[{"spotId":"b07-musashimurayama-mandarins-uchino-mikan"},{"spotId":"b07-musashimurayama-mandarins-tanpopo"}]}]
  },
  "routeName": {"ja":"武蔵村山、みかんからワインと菓子へ","en":"Musashimurayama mandarins, wine and sweets","zh-TW":"武藏村山蜜柑、果酒與點心"},
  "location": {"ja":{"area":"武蔵村山市","station":"","access":""},"en":{"area":"Musashimurayama","station":"","access":""},"zh-TW":{"area":"武藏村山市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "中藤", "en": "Nakato bus stop", "zh-TW": "中藤公車站"}, "spotId": "b07-musashimurayama-mandarins-uchino-mikan", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b07-musashimurayama-mandarins-uchino-mikan",
          "description": {"ja":"市は、狭山丘陵南斜面のみかん園の一つとして掲載しています。","en":"The city lists this orchard among mandarin growers on the southern slopes of the Sayama Hills.","zh-TW":"市府將此處列為狹山丘陵南坡的蜜柑園之一。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-musashimurayama-mandarins-tanpopo",
          "description": {"ja":"市は、地元のみかんとクリームチーズを使う菓子を小学生と開発した工房として紹介しています。","en":"The city describes this workshop developing a local mandarin-and-cream-cheese sweet with school pupils.","zh-TW":"市府介紹此工房與小學生合作，以在地蜜柑和奶油起司開發甜點。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。"},
        "en": {
          "time": "About 120 min (editorial estimate)",
          "distance": "",
          "spots": "2 stops",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story."
        },
        "zh-TW": {"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b07-musashimurayama-mandarins-uchino-mikan": {
      "presentation": {
        "id": "b07-musashimurayama-mandarins-uchino-mikan",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-mandarins",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"内野みかん園","lead":"市は、狭山丘陵南斜面のみかん園の一つとして掲載しています。","description":"市は、狭山丘陵南斜面のみかん園の一つとして掲載しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Uchino Mandarin Orchard",
            "lead": "The city lists this orchard among mandarin growers on the southern slopes of the Sayama Hills.",
            "description": "The city lists this orchard among mandarin growers on the southern slopes of the Sayama Hills.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"內野蜜柑園","lead":"市府將此處列為狹山丘陵南坡的蜜柑園之一。","description":"市府將此處列為狹山丘陵南坡的蜜柑園之一。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は、狭山丘陵南斜面のみかん園の一つとして掲載しています。","en":"The city lists this orchard among mandarin growers on the southern slopes of the Sayama Hills.","zh-TW":"市府將此處列為狹山丘陵南坡的蜜柑園之一。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1005150.html","en":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1005150.html","zh-TW":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1005150.html"}
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
      "officialSource": {"name":"蜜柑（みかん）｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1005150.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b07-musashimurayama-mandarins-tanpopo": {
      "presentation": {
        "id": "b07-musashimurayama-mandarins-tanpopo",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-mandarins",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "たんぽぽSWEETS工房",
            "lead": "市は、地元のみかんとクリームチーズを使う菓子を小学生と開発した工房として紹介しています。",
            "description": "市は、地元のみかんとクリームチーズを使う菓子を小学生と開発した工房として紹介しています。",
            "tags": [],
            "practicalInfo": [{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],
            "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]
          },
          "en": {
            "name": "Tanpopo Sweets Kobo",
            "lead": "The city describes this workshop developing a local mandarin-and-cream-cheese sweet with school pupils.",
            "description": "The city describes this workshop developing a local mandarin-and-cream-cheese sweet with school pupils.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"蒲公英甜點工房","lead":"市府介紹此工房與小學生合作，以在地蜜柑和奶油起司開發甜點。","description":"市府介紹此工房與小學生合作，以在地蜜柑和奶油起司開發甜點。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は、地元のみかんとクリームチーズを使う菓子を小学生と開発した工房として紹介しています。","en":"The city describes this workshop developing a local mandarin-and-cream-cheese sweet with school pupils.","zh-TW":"市府介紹此工房與小學生合作，以在地蜜柑和奶油起司開發甜點。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","en":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","zh-TW":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html"}
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
      "officialSource": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b07-musashimurayama-mandarins-uchino-mikan",
          "spotId": "b07-musashimurayama-mandarins-uchino-mikan",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"内野みかん園","en":"Uchino Mandarin Orchard","zh-TW":"內野蜜柑園"},
          "description": {"ja":"市は、狭山丘陵南斜面のみかん園の一つとして掲載しています。","en":"The city lists this orchard among mandarin growers on the southern slopes of the Sayama Hills.","zh-TW":"市府將此處列為狹山丘陵南坡的蜜柑園之一。"}
        },
        {
          "referenceId": "b07-musashimurayama-mandarins-tanpopo",
          "spotId": "b07-musashimurayama-mandarins-tanpopo",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"たんぽぽSWEETS工房","en":"Tanpopo Sweets Kobo","zh-TW":"蒲公英甜點工房"},
          "description": {"ja":"市は、地元のみかんとクリームチーズを使う菓子を小学生と開発した工房として紹介しています。","en":"The city describes this workshop developing a local mandarin-and-cream-cheese sweet with school pupils.","zh-TW":"市府介紹此工房與小學生合作，以在地蜜柑和奶油起司開發甜點。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"武蔵村山市","station":""},"en":{"region":"Musashimurayama","station":""},"zh-TW":{"region":"武藏村山市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Musashimurayama City – mandarin orchards", "url": "https://mobile.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1005150.html", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-10": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-11": {"name":"蜜柑（みかん）｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1005150.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b07 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-10","source-11"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-10","source-11"],"origin":"editorial"},
    "location": {"sourceIds":["source-10","source-11"],"origin":"editorial"},
    "story": {"sourceIds":["source-10","source-11"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-10","source-11"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-10","source-11"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-11"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-11"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-11"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.ja.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b07-musashimurayama-mandarins-uchino-mikan": {"sourceIds":["source-11"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-11"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-11"],"origin":"editorial"},
    "spots.b07-musashimurayama-mandarins-tanpopo": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-10"],"origin":"editorial"}
  }
};
