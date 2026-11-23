import type { JourneyRecord } from '../journey-record';

export const b02OmeFarmTableRecord: JourneyRecord = {
  "municipalityId": "ome",
  "journey": {
    "id": "b02-ome-farm-table",
    "regionId": "ome",
    "foodCultureId": "ome-farm-table",
    "storyId": "b02-ome-farm-table",
    "routeId": "b02-ome-farm-table-route",
    "copy": {
      "ja": {"title":"青梅の畑と直売の物語","subtitle":"青梅の畑と直売の物語","description":"のらぼう菜と、さつまいもの加工の記録を読む。","tags":["青梅市"],"storyTitle":"青梅の畑と直売の物語","intro":["のらぼう菜と、さつまいもの加工の記録を読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Ome fields and farm-market stories",
        "subtitle": "Ome fields and farm-market stories",
        "description": "Read about norabouna and sweet-potato products.",
        "tags": ["Ome"],
        "storyTitle": "Ome fields and farm-market stories",
        "intro": ["Read about norabouna and sweet-potato products.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"青梅田地與農產直售的故事","subtitle":"青梅田地與農產直售的故事","description":"認識野良坊菜與地瓜加工品的記錄。","tags":["青梅市"],"storyTitle":"青梅田地與農產直售的故事","intro":["認識野良坊菜與地瓜加工品的記錄。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"のらぼう菜の作り手","body":"東京都の資料は、のらぼう菜を青梅など西多摩で育つ江戸東京野菜と紹介しています。JAの生産者一覧では、青梅の須田智之さんがのらぼう菜を育て、かすみ直売センターへ出荷しています。"},{"number":"02.","title":"さつまいもの加工を試す","body":"こーよ青梅は2026年11月の告知で、青梅産さつまいもの干し芋と干し芋茶を、JAかすみ直売センターの農業祭で紹介する予定を伝えました。これは当時の催事の記録です。"}],
      "en": [
        {"number":"01.","title":"Norabouna growers","body":"Tokyo’s guide identifies norabouna as an Edo-Tokyo heritage vegetable grown in Ome and other Nishitama areas. JA lists Ome grower Tomoyuki Suda with norabouna and Kasumi Farmers Market as an outlet."},
        {"number":"02.","title":"Exploring sweet-potato products","body":"In a November 2026 notice, Koyo Ome announced plans to present dried Ome-grown sweet potatoes and dried-sweet-potato tea at a farm festival at Kasumi Farmers Market. This is a record of that announcement."}
      ],
      "zh-TW": [{"number":"01.","title":"野良坊菜的栽培者","body":"東京都資料將野良坊菜列為青梅等西多摩地區種植的江戶東京蔬菜。JA 列出青梅農友須田智之種植野良坊菜，並出貨至霞直售中心。"},{"number":"02.","title":"探索地瓜加工品","body":"Koyo Ome 於 2026 年 11 月公告，計畫在霞直售中心農業祭介紹青梅地瓜製成的地瓜乾與地瓜乾茶。此為當時活動公告的記錄。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b02-ome-farm-table-kasumi"}]}]
  },
  "routeName": {"ja":"青梅の畑と直売の物語","en":"Ome fields and farm-market stories","zh-TW":"青梅田地與農產直售的故事"},
  "location": {"ja":{"area":"青梅市","station":"","access":""},"en":{"area":"Ome","station":"","access":""},"zh-TW":{"area":"青梅市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b02-ome-farm-table-kasumi",
          "description": {"ja":"JAの生産者紹介はのらぼう菜の出荷先としてこの直売所を挙げ、こーよ青梅も農業祭の会場として案内しています。","en":"JA names this market as an outlet for norabouna; Koyo Ome also named it as the farm-festival venue.","zh-TW":"JA 列此市場為野良坊菜的出貨據點，Koyo Ome 亦將此處列為農業祭會場。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        }
      ],
      "stats": {
        "ja": {"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。"},
        "en": {"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stop","station":"","minutes":"90","access":"","caution":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described."},
        "zh-TW": {"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b02-ome-farm-table-kasumi": {
      "presentation": {
        "id": "b02-ome-farm-table-kasumi",
        "regionId": "ome",
        "foodCultureId": "ome-farm-table",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"JA西東京 かすみ直売センター","lead":"JAの生産者紹介はのらぼう菜の出荷先としてこの直売所を挙げ、こーよ青梅も農業祭の会場として案内しています。","description":"JAの生産者紹介はのらぼう菜の出荷先としてこの直売所を挙げ、こーよ青梅も農業祭の会場として案内しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "JA Nishitokyo Kasumi Farmers Market",
            "lead": "JA names this market as an outlet for norabouna; Koyo Ome also named it as the farm-festival venue.",
            "description": "JA names this market as an outlet for norabouna; Koyo Ome also named it as the farm-festival venue.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"JA 西東京 霞直售中心","lead":"JA 列此市場為野良坊菜的出貨據點，Koyo Ome 亦將此處列為農業祭會場。","description":"JA 列此市場為野良坊菜的出貨據點，Koyo Ome 亦將此處列為農業祭會場。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"JAの生産者紹介はのらぼう菜の出荷先としてこの直売所を挙げ、こーよ青梅も農業祭の会場として案内しています。","en":"JA names this market as an outlet for norabouna; Koyo Ome also named it as the farm-festival venue.","zh-TW":"JA 列此市場為野良坊菜的出貨據點，Koyo Ome 亦將此處列為農業祭會場。"},
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
          "referenceId": "b02-ome-farm-table-kasumi",
          "spotId": "b02-ome-farm-table-kasumi",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"JA西東京 かすみ直売センター","en":"JA Nishitokyo Kasumi Farmers Market","zh-TW":"JA 西東京 霞直售中心"},
          "description": {"ja":"JAの生産者紹介はのらぼう菜の出荷先としてこの直売所を挙げ、こーよ青梅も農業祭の会場として案内しています。","en":"JA names this market as an outlet for norabouna; Koyo Ome also named it as the farm-festival venue.","zh-TW":"JA 列此市場為野良坊菜的出貨據點，Koyo Ome 亦將此處列為農業祭會場。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"青梅市","station":""},"en":{"region":"Ome","station":""},"zh-TW":{"region":"青梅市","station":""}}
  },
  "sources": {
    "source-19": {"name":"東京都地域資源 — のらぼう菜","url":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_143.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-20": {"name":"JA東京アグリパーク — 生産者紹介｜かすみ直売センター","url":"https://agripark.tokyo/matching/search/producer.php?id=nishi_tokyo_kasumi_fsc","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-21": {"name":"JA Nishitokyo — Kasumi Farmers Market","url":"https://www.ja-nishitokyo.or.jp/archives/store_post/shop_kasumi","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-40": {
      "name": "こーよ青梅 — 11月23日 JA西東京 農業祭へ出店します",
      "url": "https://life-ome.com/news/11%E6%9C%8823%E6%97%A5%E6%9C%88%EF%BD%A5%E7%A5%9D-ja%E8%A5%BF%E6%9D%B1%E4%BA%AC-%E8%BE%B2%E6%A5%AD%E7%A5%AD%E3%81%B8%E5%87%BA%E5%BA%97%E3%81%97%E3%81%BE%E3%81%99%EF%BC%81%EF%BC%81/",
      "sourceType": "official_web",
      "retrievedAt": "2026-11-24",
      "verificationStatus": "needs_confirmation"
    },
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://agripark.tokyo/matching/search/producer.php?id=nishi_tokyo_kasumi_fsc","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-19","source-20","source-21","source-40"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-19","source-20","source-21","source-40"],"origin":"editorial"},
    "location": {"sourceIds":["source-19","source-20","source-21","source-40"],"origin":"editorial"},
    "story": {"sourceIds":["source-19","source-20","source-21","source-40"],"origin":"editorial"},
    "spots": {"sourceIds":["source-19","source-20","source-21","source-40"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-19","source-20","source-21","source-40"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-19","source-20"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-19","source-20"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-19","source-20"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-40"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-40"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-40"],"origin":"editorial"},
    "spots.b02-ome-farm-table-kasumi": {"sourceIds":["source-20","source-21","source-40"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-20","source-21","source-40"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-20","source-21","source-40"],"origin":"editorial"}
  }
};
