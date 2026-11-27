import type { JourneyRecord } from '../journey-record';

export const b01TachikawaOrchardSweetsRecord: JourneyRecord = {
  "municipalityId": "tachikawa",
  "alcoholThemed": false,
  "journey": {
    "id": "b01-tachikawa-orchard-sweets",
    "regionId": "tachikawa",
    "foodCultureId": "tachikawa-orchard-sweets",
    "storyId": "b01-tachikawa-orchard-sweets",
    "routeId": "b01-tachikawa-orchard-sweets-route",
    "copy": {"ja":{"title":"立川の果実とブルーベリーシフォン","subtitle":"立川の果実とブルーベリーシフォン","description":"果樹のまちを、直売所と地元の菓子から知る。","tags":["立川市"],"storyTitle":"立川の果実とブルーベリーシフォン","intro":["果樹のまちを、直売所と地元の菓子から知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Tachikawa fruit and blueberry chiffon","subtitle":"Tachikawa fruit and blueberry chiffon","description":"Meet the city’s fruit-growing through a market and local confectionery.","tags":["Tachikawa"],"storyTitle":"Tachikawa fruit and blueberry chiffon","intro":["Meet the city’s fruit-growing through a market and local confectionery.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"立川水果與藍莓戚風","subtitle":"立川水果與藍莓戚風","description":"從直賣所與在地糕點認識果樹種植。","tags":["立川市"],"storyTitle":"立川水果與藍莓戚風","intro":["從直賣所與在地糕點認識果樹種植。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"立川産ブルーベリー","body":"農研会は立川の果樹にブルーベリーを挙げています。観光協会は、砂川町のブルーベリーの郷の果実を使うシフォンケーキを紹介しています。"},{"number":"02.","title":"立川産梨・柿・キウイフルーツ","body":"農研会は、梨、柿、キウイフルーツを市内で栽培される果実として紹介しています。"},{"number":"03.","title":"立川産イチジク・ブドウ","body":"農研会の紹介では、イチジクとブドウの生産も増えています。"},{"number":"04.","title":"立川ブルーベリーシフォン","body":"立川ブルーベリーシフォンには、ブルーベリーの郷の果実と伊藤養鶏場のもみじの卵を使うと観光協会は説明しています。"}],"en":[{"number":"01.","title":"Tachikawa Blueberries","body":"The growers’ group lists blueberries among Tachikawa’s fruits. The tourism association introduces a chiffon cake using fruit from Blueberry no Sato in Sunagawa."},{"number":"02.","title":"Tachikawa Pears, Persimmons, and Kiwifruit","body":"The growers’ group lists pears, persimmons and kiwifruit among the city’s fruit crops."},{"number":"03.","title":"Tachikawa Figs and Grapes","body":"The growers’ account also describes increasing fig and grape production."},{"number":"04.","title":"Tachikawa Blueberry Chiffon Cake","body":"The tourism association describes Tachikawa Blueberry Chiffon as using Blueberry no Sato fruit and Momiji chicken eggs from Ito Poultry Farm."}],"zh-TW":[{"number":"01.","title":"立川產藍莓","body":"農研會將藍莓列為立川果樹。觀光協會介紹使用砂川町「藍莓之鄉」果實的戚風蛋糕。"},{"number":"02.","title":"立川產梨、柿子與奇異果","body":"農研會介紹市內種植的梨、柿子與奇異果。"},{"number":"03.","title":"立川產無花果與葡萄","body":"農研會也記述無花果與葡萄的生產增加。"},{"number":"04.","title":"立川藍莓戚風","body":"觀光協會介紹立川藍莓戚風使用藍莓之鄉的果實與伊藤養雞場的 Momiji 雞蛋。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b01-tachikawa-orchard-sweets-minore-fruit"},
          {"spotId":"b01-tachikawa-orchard-sweets-nikko-fruit"}
        ]
      }
    ]
  },
  "routeName": {"ja":"立川の果実とブルーベリーシフォン","en":"Tachikawa fruit and blueberry chiffon","zh-TW":"立川水果與藍莓戚風"},
  "location": {"ja":{"area":"立川市","station":"","access":""},"en":{"area":"Tachikawa","station":"","access":""},"zh-TW":{"area":"立川市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "砂川五差路", "en": "Sunagawa Gosaro bus stop", "zh-TW": "砂川五岔路巴士站"}, "spotId": "b01-tachikawa-orchard-sweets-minore-fruit", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b01-tachikawa-orchard-sweets-minore-fruit",
          "description": {"ja":"JAの紹介では、ブルーベリー、梨、柿、キウイフルーツなどの果実に関係する直売所です。","en":"JA’s guide connects the market with fruits including blueberries, pears, persimmons and kiwifruit.","zh-TW":"JA 介紹此直賣所與藍莓、梨、柿子及奇異果等水果的連結。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-tachikawa-orchard-sweets-nikko-fruit",
          "description": {"ja":"観光協会が立川ブルーベリーシフォンの販売店として掲載しています。","en":"The tourism association lists the hotel as the shop associated with Tachikawa Blueberry Chiffon.","zh-TW":"觀光協會列此飯店為立川藍莓戚風的店家。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 120 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"120","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-tachikawa-orchard-sweets-minore-fruit": {
      "visitorSourceId": "admission-access",
      "presentation": {
        "id": "b01-tachikawa-orchard-sweets-minore-fruit",
        "regionId": "tachikawa",
        "foodCultureId": "tachikawa-orchard-sweets",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"ファーマーズセンターみのーれ立川","lead":"JAの紹介では、ブルーベリー、梨、柿、キウイフルーツなどの果実に関係する直売所です。","description":"JAの紹介では、ブルーベリー、梨、柿、キウイフルーツなどの果実に関係する直売所です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Farmers Center Minore Tachikawa","lead":"JA’s guide connects the market with fruits including blueberries, pears, persimmons and kiwifruit.","description":"JA’s guide connects the market with fruits including blueberries, pears, persimmons and kiwifruit.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"Minore 立川農夫中心","lead":"JA 介紹此直賣所與藍莓、梨、柿子及奇異果等水果的連結。","description":"JA 介紹此直賣所與藍莓、梨、柿子及奇異果等水果的連結。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"JAの紹介では、ブルーベリー、梨、柿、キウイフルーツなどの果実に関係する直売所です。","en":"JA’s guide connects the market with fruits including blueberries, pears, persimmons and kiwifruit.","zh-TW":"JA 介紹此直賣所與藍莓、梨、柿子及奇異果等水果的連結。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://agripark.tokyo/matching/search/store.php?id=tokyo_midori_minole_tachikawa","en":"https://agripark.tokyo/matching/search/store.php?id=tokyo_midori_minole_tachikawa","zh-TW":"https://agripark.tokyo/matching/search/store.php?id=tokyo_midori_minole_tachikawa"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"JA Tokyo Agripark — ファーマーズセンターみのーれ立川","url":"https://agripark.tokyo/matching/search/store.php?id=tokyo_midori_minole_tachikawa","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-tachikawa-orchard-sweets-nikko-fruit": {
      "presentation": {
        "id": "b01-tachikawa-orchard-sweets-nikko-fruit",
        "regionId": "tachikawa",
        "foodCultureId": "tachikawa-orchard-sweets",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"ホテル日航立川 東京","lead":"観光協会が立川ブルーベリーシフォンの販売店として掲載しています。","description":"観光協会が立川ブルーベリーシフォンの販売店として掲載しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Hotel Nikko Tachikawa Tokyo","lead":"The tourism association lists the hotel as the shop associated with Tachikawa Blueberry Chiffon.","description":"The tourism association lists the hotel as the shop associated with Tachikawa Blueberry Chiffon.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"立川日航飯店 東京","lead":"觀光協會列此飯店為立川藍莓戚風的店家。","description":"觀光協會列此飯店為立川藍莓戚風的店家。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会が立川ブルーベリーシフォンの販売店として掲載しています。","en":"The tourism association lists the hotel as the shop associated with Tachikawa Blueberry Chiffon.","zh-TW":"觀光協會列此飯店為立川藍莓戚風的店家。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://tokyo-tachikawa.org/tourism/tourism-4242/","en":"https://tokyo-tachikawa.org/tourism/tourism-4242/","zh-TW":"https://tokyo-tachikawa.org/tourism/tourism-4242/"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"Tachikawa Tourism and Convention Association — 立川ブルーベリーシフォン","url":"https://tokyo-tachikawa.org/tourism/tourism-4242/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-tachikawa-orchard-sweets-minore-fruit",
          "spotId": "b01-tachikawa-orchard-sweets-minore-fruit",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"ファーマーズセンターみのーれ立川","en":"Farmers Center Minore Tachikawa","zh-TW":"Minore 立川農夫中心"},
          "description": {"ja":"JAの紹介では、ブルーベリー、梨、柿、キウイフルーツなどの果実に関係する直売所です。","en":"JA’s guide connects the market with fruits including blueberries, pears, persimmons and kiwifruit.","zh-TW":"JA 介紹此直賣所與藍莓、梨、柿子及奇異果等水果的連結。"}
        },
        {
          "referenceId": "b01-tachikawa-orchard-sweets-nikko-fruit",
          "spotId": "b01-tachikawa-orchard-sweets-nikko-fruit",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"ホテル日航立川 東京","en":"Hotel Nikko Tachikawa Tokyo","zh-TW":"立川日航飯店 東京"},
          "description": {"ja":"観光協会が立川ブルーベリーシフォンの販売店として掲載しています。","en":"The tourism association lists the hotel as the shop associated with Tachikawa Blueberry Chiffon.","zh-TW":"觀光協會列此飯店為立川藍莓戚風的店家。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"立川市","station":""},"en":{"region":"Tachikawa","station":""},"zh-TW":{"region":"立川市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "JA東京みどり みのーれ立川 アクセス", "url": "https://ja-tokyomidori.or.jp/minore/access/index.html", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-1": {"name":"JA Tokyo Agripark — ファーマーズセンターみのーれ立川","url":"https://agripark.tokyo/matching/search/store.php?id=tokyo_midori_minole_tachikawa","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-14": {"name":"Tachikawa Agricultural Research Group — 立川市の農産物","url":"https://tachikawashi-noukenkai.com/harvests/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-20": {"name":"Tachikawa Tourism and Convention Association — 立川ブルーベリーシフォン","url":"https://tokyo-tachikawa.org/tourism/tourism-4242/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://agripark.tokyo/matching/search/store.php?id=tokyo_midori_minole_tachikawa","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-1",
        "source-14",
        "source-20"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-1",
        "source-14",
        "source-20"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-1",
        "source-14",
        "source-20"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-1",
        "source-14",
        "source-20"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-14",
        "source-20"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-14",
        "source-20"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-14",
        "source-20"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-14"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-14"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-14"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-14"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-14"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-14"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.3": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.3": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.3": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "journey.routeVariants": {
      "sourceIds": [
        "editorial"
      ],
      "origin": "editorial"
    },
    "variants": {
      "sourceIds": [
        "editorial",
        "source-1",
        "source-20"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-1",
        "source-20"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-orchard-sweets-minore-fruit.detail.description": {
      "sourceIds": [
        "source-1"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-orchard-sweets-minore-fruit.presentation": {
      "sourceIds": [
        "source-1"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-1"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-1"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-orchard-sweets-nikko-fruit.detail.description": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "spots.b01-tachikawa-orchard-sweets-nikko-fruit.presentation": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-20"
      ],
      "origin": "editorial"
    }
  }
};
