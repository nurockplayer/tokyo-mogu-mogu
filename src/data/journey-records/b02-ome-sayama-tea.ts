import type { JourneyRecord } from '../journey-record';

export const b02OmeSayamaTeaRecord: JourneyRecord = {
  "municipalityId": "ome",
  "journey": {
    "id": "b02-ome-sayama-tea",
    "regionId": "ome",
    "foodCultureId": "ome-sayama-tea",
    "storyId": "b02-ome-sayama-tea",
    "routeId": "b02-ome-sayama-tea-route",
    "copy": {
      "ja": {"title":"青梅で育つ東京狭山茶","subtitle":"青梅で育つ東京狭山茶","description":"生産者と製茶の仕事から地域のお茶を知る。","tags":["青梅市"],"storyTitle":"青梅で育つ東京狭山茶","intro":["生産者と製茶の仕事から地域のお茶を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Tokyo Sayama tea in Ome","subtitle":"Tokyo Sayama tea in Ome","description":"Discover regional tea through growers and processing.","tags":["Ome"],"storyTitle":"Tokyo Sayama tea in Ome","intro":["Discover regional tea through growers and processing.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"青梅的東京狹山茶","subtitle":"青梅的東京狹山茶","description":"從種植者與製茶工作認識地方茶。","tags":["青梅市"],"storyTitle":"青梅的東京狹山茶","intro":["從種植者與製茶工作認識地方茶。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"青梅の茶生産者","body":"JAの紹介には、青梅で東京狭山茶を作る川鍋園や中里園が掲載され、かすみ直売センターなどへの出荷が記されています。"},{"number":"02.","title":"茶葉と仕上げ","body":"杉田園は青梅丘陵の自家茶園の葉を製品に仕上げると紹介し、狭山茶の伝統的な火入れについて説明しています。"}],
      "en": [
        {"number":"01.","title":"Ome tea growers","body":"JA lists Kawanabeen and Nakazatoen as Tokyo Sayama tea growers in Ome, naming Kasumi Farmers Market among their outlets."},
        {"number":"02.","title":"Tea leaves and finishing","body":"Sugitaen describes finishing leaves from its own Ome hillside tea fields and explains Sayama tea’s traditional firing process."}
      ],
      "zh-TW": [{"number":"01.","title":"青梅的茶農","body":"JA 列川鍋園與中里園為青梅的東京狹山茶種植者，出貨據點包括霞直售中心。"},{"number":"02.","title":"茶葉與加工","body":"杉田園介紹將自家青梅丘陵茶園的茶葉加工製成產品，並說明狹山茶傳統的火入工序。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":150,"steps":[{"spotId":"b02-ome-sayama-tea-sugitaen"},{"spotId":"b02-ome-sayama-tea-kasumi-tea"}]}]
  },
  "routeName": {"ja":"青梅で育つ東京狭山茶","en":"Tokyo Sayama tea in Ome","zh-TW":"青梅的東京狹山茶"},
  "location": {"ja":{"area":"青梅市","station":"","access":""},"en":{"area":"Ome","station":"","access":""},"zh-TW":{"area":"青梅市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b02-ome-sayama-tea-sugitaen",
          "description": {"ja":"青梅の自家茶園の茶葉を仕上げる茶業者として公式サイトで紹介されています。","en":"Its official site describes a tea business processing leaves from its own Ome tea fields.","zh-TW":"官方網站介紹此茶業者加工自家青梅茶園的茶葉。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        },
        {
          "spotId": "b02-ome-sayama-tea-kasumi-tea",
          "description": {"ja":"JAが青梅の東京狭山茶生産者の出荷先として挙げています。","en":"JA identifies this market as an outlet for Ome’s Tokyo Sayama tea growers.","zh-TW":"JA 列此市場為青梅東京狹山茶農的出貨據點。"},
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
    "b02-ome-sayama-tea-sugitaen": {
      "presentation": {
        "id": "b02-ome-sayama-tea-sugitaen",
        "regionId": "ome",
        "foodCultureId": "ome-sayama-tea",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"杉田園","lead":"青梅の自家茶園の茶葉を仕上げる茶業者として公式サイトで紹介されています。","description":"青梅の自家茶園の茶葉を仕上げる茶業者として公式サイトで紹介されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Sugitaen",
            "lead": "Its official site describes a tea business processing leaves from its own Ome tea fields.",
            "description": "Its official site describes a tea business processing leaves from its own Ome tea fields.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"杉田園","lead":"官方網站介紹此茶業者加工自家青梅茶園的茶葉。","description":"官方網站介紹此茶業者加工自家青梅茶園的茶葉。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"青梅の自家茶園の茶葉を仕上げる茶業者として公式サイトで紹介されています。","en":"Its official site describes a tea business processing leaves from its own Ome tea fields.","zh-TW":"官方網站介紹此茶業者加工自家青梅茶園的茶葉。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://sugitaen.com/products/tea/","en":"https://sugitaen.com/products/tea/","zh-TW":"https://sugitaen.com/products/tea/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"Sugitaen — tea","url":"https://sugitaen.com/products/tea/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b02-ome-sayama-tea-kasumi-tea": {
      "presentation": {
        "id": "b02-ome-sayama-tea-kasumi-tea",
        "regionId": "ome",
        "foodCultureId": "ome-sayama-tea",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"JA西東京 かすみ直売センター","lead":"JAが青梅の東京狭山茶生産者の出荷先として挙げています。","description":"JAが青梅の東京狭山茶生産者の出荷先として挙げています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "JA Nishitokyo Kasumi Farmers Market",
            "lead": "JA identifies this market as an outlet for Ome’s Tokyo Sayama tea growers.",
            "description": "JA identifies this market as an outlet for Ome’s Tokyo Sayama tea growers.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"JA 西東京 霞直售中心","lead":"JA 列此市場為青梅東京狹山茶農的出貨據點。","description":"JA 列此市場為青梅東京狹山茶農的出貨據點。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"JAが青梅の東京狭山茶生産者の出荷先として挙げています。","en":"JA identifies this market as an outlet for Ome’s Tokyo Sayama tea growers.","zh-TW":"JA 列此市場為青梅東京狹山茶農的出貨據點。"},
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
        {"referenceId":"b02-ome-sayama-tea-sugitaen","spotId":"b02-ome-sayama-tea-sugitaen","badgeColor":"#E98A1C","badge":{"ja":"杉田園","en":"Sugitaen","zh-TW":"杉田園"},"description":{"ja":"青梅の自家茶園の茶葉を仕上げる茶業者として公式サイトで紹介されています。","en":"Its official site describes a tea business processing leaves from its own Ome tea fields.","zh-TW":"官方網站介紹此茶業者加工自家青梅茶園的茶葉。"}},
        {
          "referenceId": "b02-ome-sayama-tea-kasumi-tea",
          "spotId": "b02-ome-sayama-tea-kasumi-tea",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"JA西東京 かすみ直売センター","en":"JA Nishitokyo Kasumi Farmers Market","zh-TW":"JA 西東京 霞直售中心"},
          "description": {"ja":"JAが青梅の東京狭山茶生産者の出荷先として挙げています。","en":"JA identifies this market as an outlet for Ome’s Tokyo Sayama tea growers.","zh-TW":"JA 列此市場為青梅東京狹山茶農的出貨據點。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"青梅市","station":""},"en":{"region":"Ome","station":""},"zh-TW":{"region":"青梅市","station":""}}
  },
  "sources": {
    "source-20": {"name":"JA東京アグリパーク — 生産者紹介｜かすみ直売センター","url":"https://agripark.tokyo/matching/search/producer.php?id=nishi_tokyo_kasumi_fsc","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-21": {"name":"JA Nishitokyo — Kasumi Farmers Market","url":"https://www.ja-nishitokyo.or.jp/archives/store_post/shop_kasumi","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-22": {"name":"杉田園 — 狭山茶について","url":"https://sugitaen.com/sayama-tea/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-23": {"name":"Sugitaen — tea","url":"https://sugitaen.com/products/tea/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://sugitaen.com/products/tea/","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-20","source-21","source-22","source-23"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-20","source-21","source-22","source-23"],"origin":"editorial"},
    "location": {"sourceIds":["source-20","source-21","source-22","source-23"],"origin":"editorial"},
    "story": {"sourceIds":["source-20","source-21","source-22","source-23"],"origin":"editorial"},
    "spots": {"sourceIds":["source-20","source-21","source-22","source-23"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-20","source-21","source-22","source-23"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-20"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-20"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-20"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-22","source-23"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-22","source-23"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-22","source-23"],"origin":"editorial"},
    "spots.b02-ome-sayama-tea-sugitaen": {"sourceIds":["source-23"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-23"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-23"],"origin":"editorial"},
    "spots.b02-ome-sayama-tea-kasumi-tea": {"sourceIds":["source-20","source-21"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-20","source-21"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-20","source-21"],"origin":"editorial"}
  }
};
