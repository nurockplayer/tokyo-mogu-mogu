import type { JourneyRecord } from '../journey-record';

export const b02OmeOrchardFruitRecord: JourneyRecord = {
  "municipalityId": "ome",
  "alcoholThemed": false,
  "journey": {
    "id": "b02-ome-orchard-fruit",
    "regionId": "ome",
    "foodCultureId": "ome-orchard-fruit",
    "storyId": "b02-ome-orchard-fruit",
    "routeId": "b02-ome-orchard-fruit-route",
    "copy": {
      "ja": {"title":"青梅の果実とベリー","subtitle":"青梅の果実とベリー","description":"柿、キウイ、ベリーの栽培から加工までを知る。","tags":["青梅市"],"storyTitle":"青梅の果実とベリー","intro":["柿、キウイ、ベリーの栽培から加工までを知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Ome orchard fruit and berries",
        "subtitle": "Ome orchard fruit and berries",
        "description": "Read about persimmons, kiwis, berries and fruit products.",
        "tags": ["Ome"],
        "storyTitle": "Ome orchard fruit and berries",
        "intro": ["Read about persimmons, kiwis, berries and fruit products.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"青梅的果實與莓果","subtitle":"青梅的果實與莓果","description":"認識柿子、奇異果、莓果的栽培與加工。","tags":["青梅市"],"storyTitle":"青梅的果實與莓果","intro":["認識柿子、奇異果、莓果的栽培與加工。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"柿とキウイの作り手","body":"JAは青梅の野村直さんを柿の生産者として紹介し、東京都育成の東京紅にも触れています。梅田幸次さんは多品種のキウイを栽培し、かすみ直売センターへ出荷しています。"},{"number":"02.","title":"ベリーの加工","body":"観光協会はベリーコテージでのブルーベリーとラズベリーの栽培・摘み取りを紹介し、自園の果実を使うジュースや菓子、ジャムにも触れています。"}],
      "en": [
        {"number":"01.","title":"Persimmon and kiwi growers","body":"JA introduces Ome persimmon grower Nao Nomura and the Tokyo-bred Tokyo Beni variety. It also describes Koji Umeda growing several kiwi varieties for Kasumi Farmers Market."},
        {"number":"02.","title":"Berries and fruit products","body":"The tourism association describes blueberries and raspberries at Berry Cottage, along with drinks, sweets and jam using the farm’s fruit."}
      ],
      "zh-TW": [{"number":"01.","title":"柿子與奇異果農","body":"JA 介紹青梅柿農野村直與東京都培育的東京紅品種，也介紹梅田幸次種植多種奇異果並出貨至霞直售中心。"},{"number":"02.","title":"莓果與果實加工","body":"觀光協會介紹 Berry Cottage 的藍莓與覆盆子栽培採摘，並提及使用自家果實製作的飲品、甜點與果醬。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":150,"steps":[{"spotId":"b02-ome-orchard-fruit-berry-cottage"},{"spotId":"b02-ome-orchard-fruit-kasumi-fruit"}]}]
  },
  "routeName": {"ja":"青梅の果実とベリー","en":"Ome orchard fruit and berries","zh-TW":"青梅的果實與莓果"},
  "location": {"ja":{"area":"青梅市","station":"","access":""},"en":{"area":"Ome","station":"","access":""},"zh-TW":{"area":"青梅市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "小作駅", "en": "Ozaku Station", "zh-TW": "小作站"}, "spotId": "b02-ome-orchard-fruit-berry-cottage", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b02-ome-orchard-fruit-berry-cottage",
          "description": {"ja":"観光協会が自園のベリーや果実の加工を紹介する農園です。","en":"The tourism association features this farm’s berries and fruit products.","zh-TW":"觀光協會介紹此農園的莓果與果實加工品。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        },
        {
          "spotId": "b02-ome-orchard-fruit-kasumi-fruit",
          "description": {"ja":"JAは柿やキウイの生産者の出荷先としてこの直売所を掲載しています。","en":"JA lists this market among the outlets for its featured persimmon and kiwi growers.","zh-TW":"JA 列此市場為所介紹柿子與奇異果農的出貨據點。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        }
      ],
      "stats": {
        "ja": {"time":"約150分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"150","access":"","caution":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。"},
        "en": {"time":"About 150 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"150","access":"","caution":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described."},
        "zh-TW": {"time":"約 150 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"150","access":"","caution":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b02-ome-orchard-fruit-berry-cottage": {
      "presentation": {
        "id": "b02-ome-orchard-fruit-berry-cottage",
        "regionId": "ome",
        "foodCultureId": "ome-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"ベリーコテージ","lead":"観光協会が自園のベリーや果実の加工を紹介する農園です。","description":"観光協会が自園のベリーや果実の加工を紹介する農園です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Berry Cottage",
            "lead": "The tourism association features this farm’s berries and fruit products.",
            "description": "The tourism association features this farm’s berries and fruit products.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Berry Cottage","lead":"觀光協會介紹此農園的莓果與果實加工品。","description":"觀光協會介紹此農園的莓果與果實加工品。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会が自園のベリーや果実の加工を紹介する農園です。","en":"The tourism association features this farm’s berries and fruit products.","zh-TW":"觀光協會介紹此農園的莓果與果實加工品。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.omekanko.gr.jp/spot/19501/","en":"https://www.omekanko.gr.jp/spot/19501/","zh-TW":"https://www.omekanko.gr.jp/spot/19501/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"青梅市観光協会 — ベリーコテージ","url":"https://www.omekanko.gr.jp/spot/19501/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b02-ome-orchard-fruit-kasumi-fruit": {
      "presentation": {
        "id": "b02-ome-orchard-fruit-kasumi-fruit",
        "regionId": "ome",
        "foodCultureId": "ome-orchard-fruit",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"JA西東京 かすみ直売センター","lead":"JAは柿やキウイの生産者の出荷先としてこの直売所を掲載しています。","description":"JAは柿やキウイの生産者の出荷先としてこの直売所を掲載しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "JA Nishitokyo Kasumi Farmers Market",
            "lead": "JA lists this market among the outlets for its featured persimmon and kiwi growers.",
            "description": "JA lists this market among the outlets for its featured persimmon and kiwi growers.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"JA 西東京 霞直售中心","lead":"JA 列此市場為所介紹柿子與奇異果農的出貨據點。","description":"JA 列此市場為所介紹柿子與奇異果農的出貨據點。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"JAは柿やキウイの生産者の出荷先としてこの直売所を掲載しています。","en":"JA lists this market among the outlets for its featured persimmon and kiwi growers.","zh-TW":"JA 列此市場為所介紹柿子與奇異果農的出貨據點。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://agripark.tokyo/matching/search/producer.php?id=nishi_tokyo_kasumi_fsc","en":"https://agripark.tokyo/matching/search/producer.php?id=nishi_tokyo_kasumi_fsc","zh-TW":"https://agripark.tokyo/matching/search/producer.php?id=nishi_tokyo_kasumi_fsc"}
          },
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"JA東京アグリパーク — 生産者紹介｜かすみ直売センター","url":"https://agripark.tokyo/matching/search/producer.php?id=nishi_tokyo_kasumi_fsc","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b02-ome-orchard-fruit-berry-cottage",
          "spotId": "b02-ome-orchard-fruit-berry-cottage",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"ベリーコテージ","en":"Berry Cottage","zh-TW":"Berry Cottage"},
          "description": {"ja":"観光協会が自園のベリーや果実の加工を紹介する農園です。","en":"The tourism association features this farm’s berries and fruit products.","zh-TW":"觀光協會介紹此農園的莓果與果實加工品。"}
        },
        {
          "referenceId": "b02-ome-orchard-fruit-kasumi-fruit",
          "spotId": "b02-ome-orchard-fruit-kasumi-fruit",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"JA西東京 かすみ直売センター","en":"JA Nishitokyo Kasumi Farmers Market","zh-TW":"JA 西東京 霞直售中心"},
          "description": {"ja":"JAは柿やキウイの生産者の出荷先としてこの直売所を掲載しています。","en":"JA lists this market among the outlets for its featured persimmon and kiwi growers.","zh-TW":"JA 列此市場為所介紹柿子與奇異果農的出貨據點。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"青梅市","station":""},"en":{"region":"Ome","station":""},"zh-TW":{"region":"青梅市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Berry Cottage – access", "url": "https://www.berry-cottage.com/access.html", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-20": {"name":"JA東京アグリパーク — 生産者紹介｜かすみ直売センター","url":"https://agripark.tokyo/matching/search/producer.php?id=nishi_tokyo_kasumi_fsc","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-21": {"name":"JA Nishitokyo — Kasumi Farmers Market","url":"https://www.ja-nishitokyo.or.jp/archives/store_post/shop_kasumi","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-24": {"name":"青梅市観光協会 — ベリーコテージ","url":"https://www.omekanko.gr.jp/spot/19501/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-25": {"name":"Berry Cottage — official site","url":"https://berry-cottage.com/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.omekanko.gr.jp/spot/19501/","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-20","source-21","source-24","source-25"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-20","source-21","source-24","source-25"],"origin":"editorial"},
    "location": {"sourceIds":["source-20","source-21","source-24","source-25"],"origin":"editorial"},
    "story": {"sourceIds":["source-20","source-21","source-24","source-25"],"origin":"editorial"},
    "spots": {"sourceIds":["source-20","source-21","source-24","source-25"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-20","source-21","source-24","source-25"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-20"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-20"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-20"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-24"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-24"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-24"],"origin":"editorial"},
    "spots.b02-ome-orchard-fruit-berry-cottage": {"sourceIds":["source-24","source-25"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-24","source-25"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-24","source-25"],"origin":"editorial"},
    "spots.b02-ome-orchard-fruit-kasumi-fruit": {"sourceIds":["source-20","source-21"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-20","source-21"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-20","source-21"],"origin":"editorial"}
  }
};
