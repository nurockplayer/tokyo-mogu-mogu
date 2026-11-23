import type { JourneyRecord } from '../journey-record';

export const b02OmeLocalSweetsRecord: JourneyRecord = {
  "municipalityId": "ome",
  "journey": {
    "id": "b02-ome-local-sweets",
    "regionId": "ome",
    "foodCultureId": "ome-local-sweets",
    "storyId": "b02-ome-local-sweets",
    "routeId": "b02-ome-local-sweets-route",
    "copy": {
      "ja": {"title":"青梅のせんべいとまんじゅう","subtitle":"青梅のせんべいとまんじゅう","description":"形や作り方に地域の物語を感じる。","tags":["青梅市"],"storyTitle":"青梅のせんべいとまんじゅう","intro":["形や作り方に地域の物語を感じる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Ome crackers and sweet buns",
        "subtitle": "Ome crackers and sweet buns",
        "description": "Explore local stories through shapes and preparations.",
        "tags": ["Ome"],
        "storyTitle": "Ome crackers and sweet buns",
        "intro": ["Explore local stories through shapes and preparations.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"青梅煎餅與饅頭","subtitle":"青梅煎餅與饅頭","description":"從形狀與製法認識地方故事。","tags":["青梅市"],"storyTitle":"青梅煎餅與饅頭","intro":["從形狀與製法認識地方故事。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"梅花型のせんべい","body":"西多摩の資料は青梅せんべいを各店が工夫する菓子と紹介しています。観光協会は柳丸を1945年創業の店として挙げ、梅花型の青梅せんべいを紹介しています。"},{"number":"02.","title":"まんじゅうの二つの姿","body":"観光協会はへそまんじゅうを、へその形で粒餡入りの饅頭と紹介しています。別に、西多摩の資料には、昭和の織物産業の時代に生まれた、餡入り酒まんを焼いてたれを絡める焼きまんじゅうの記録があります。"}],
      "en": [
        {"number":"01.","title":"Plum-blossom-shaped crackers","body":"The regional guide describes Ome senbei as a confection made differently by local shops. The tourism association dates Yanagimaru to 1945 and describes its plum-blossom-shaped crackers."},
        {"number":"02.","title":"Two forms of sweet bun","body":"The tourism association describes Heso Manju as a navel-shaped bun with chunky bean filling. Separately, the regional guide links grilled, sauce-coated bean-filled fermented buns with Ome’s Showa-era textile industry."}
      ],
      "zh-TW": [{"number":"01.","title":"梅花造型煎餅","body":"區域指南介紹各家店以不同特色製作青梅煎餅；觀光協會介紹柳丸創業於 1945 年，製作梅花造型的青梅煎餅。"},{"number":"02.","title":"饅頭的兩種面貌","body":"觀光協會介紹肚臍饅頭為肚臍造型、包有顆粒紅豆餡的饅頭。另有區域資料記載昭和織業時期誕生的烤饅頭，將包餡酒饅頭烤後裹上醬汁。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":150,"steps":[{"spotId":"b02-ome-local-sweets-yanagimaru"},{"spotId":"b02-ome-local-sweets-hesomanju"}]}]
  },
  "routeName": {"ja":"青梅のせんべいとまんじゅう","en":"Ome crackers and sweet buns","zh-TW":"青梅煎餅與饅頭"},
  "location": {"ja":{"area":"青梅市","station":"","access":""},"en":{"area":"Ome","station":"","access":""},"zh-TW":{"area":"青梅市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b02-ome-local-sweets-yanagimaru",
          "description": {"ja":"観光協会が梅花型の青梅せんべいを紹介する店です。","en":"The tourism association features this maker’s plum-blossom-shaped Ome crackers.","zh-TW":"觀光協會介紹此店的梅花造型青梅煎餅。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        },
        {
          "spotId": "b02-ome-local-sweets-hesomanju",
          "description": {"ja":"観光協会がへその形の餡入り饅頭を紹介しています。焼きまんじゅうの提供店とは記載されていません。","en":"The tourism association links this shop with navel-shaped bean-filled buns. It is not identified as a seller of the separate grilled-bun dish.","zh-TW":"觀光協會介紹此店的肚臍造型豆餡饅頭；資料未將其列為另一種烤饅頭的供應店。"},
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
    "b02-ome-local-sweets-yanagimaru": {
      "presentation": {
        "id": "b02-ome-local-sweets-yanagimaru",
        "regionId": "ome",
        "foodCultureId": "ome-local-sweets",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"青梅せんべい 柳丸","lead":"観光協会が梅花型の青梅せんべいを紹介する店です。","description":"観光協会が梅花型の青梅せんべいを紹介する店です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Ome Senbei Yanagimaru",
            "lead": "The tourism association features this maker’s plum-blossom-shaped Ome crackers.",
            "description": "The tourism association features this maker’s plum-blossom-shaped Ome crackers.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"青梅煎餅 柳丸","lead":"觀光協會介紹此店的梅花造型青梅煎餅。","description":"觀光協會介紹此店的梅花造型青梅煎餅。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会が梅花型の青梅せんべいを紹介する店です。","en":"The tourism association features this maker’s plum-blossom-shaped Ome crackers.","zh-TW":"觀光協會介紹此店的梅花造型青梅煎餅。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.omekanko.gr.jp/spot/04301/","en":"https://www.omekanko.gr.jp/spot/04301/","zh-TW":"https://www.omekanko.gr.jp/spot/04301/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"青梅市観光協会 — 青梅せんべい 柳丸","url":"https://www.omekanko.gr.jp/spot/04301/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b02-ome-local-sweets-hesomanju": {
      "presentation": {
        "id": "b02-ome-local-sweets-hesomanju",
        "regionId": "ome",
        "foodCultureId": "ome-local-sweets",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"へそまんじゅう総本舗","lead":"観光協会がへその形の餡入り饅頭を紹介しています。焼きまんじゅうの提供店とは記載されていません。","description":"観光協会がへその形の餡入り饅頭を紹介しています。焼きまんじゅうの提供店とは記載されていません。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Heso Manju Sohonpo",
            "lead": "The tourism association links this shop with navel-shaped bean-filled buns. It is not identified as a seller of the separate grilled-bun dish.",
            "description": "The tourism association links this shop with navel-shaped bean-filled buns. It is not identified as a seller of the separate grilled-bun dish.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"肚臍饅頭總本舖","lead":"觀光協會介紹此店的肚臍造型豆餡饅頭；資料未將其列為另一種烤饅頭的供應店。","description":"觀光協會介紹此店的肚臍造型豆餡饅頭；資料未將其列為另一種烤饅頭的供應店。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会がへその形の餡入り饅頭を紹介しています。焼きまんじゅうの提供店とは記載されていません。","en":"The tourism association links this shop with navel-shaped bean-filled buns. It is not identified as a seller of the separate grilled-bun dish.","zh-TW":"觀光協會介紹此店的肚臍造型豆餡饅頭；資料未將其列為另一種烤饅頭的供應店。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.omekanko.gr.jp/spot/07801/","en":"https://www.omekanko.gr.jp/spot/07801/","zh-TW":"https://www.omekanko.gr.jp/spot/07801/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"青梅市観光協会 — へそまんじゅう総本舗","url":"https://www.omekanko.gr.jp/spot/07801/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b02-ome-local-sweets-yanagimaru",
          "spotId": "b02-ome-local-sweets-yanagimaru",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"青梅せんべい 柳丸","en":"Ome Senbei Yanagimaru","zh-TW":"青梅煎餅 柳丸"},
          "description": {"ja":"観光協会が梅花型の青梅せんべいを紹介する店です。","en":"The tourism association features this maker’s plum-blossom-shaped Ome crackers.","zh-TW":"觀光協會介紹此店的梅花造型青梅煎餅。"}
        },
        {
          "referenceId": "b02-ome-local-sweets-hesomanju",
          "spotId": "b02-ome-local-sweets-hesomanju",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"へそまんじゅう総本舗","en":"Heso Manju Sohonpo","zh-TW":"肚臍饅頭總本舖"},
          "description": {"ja":"観光協会がへその形の餡入り饅頭を紹介しています。焼きまんじゅうの提供店とは記載されていません。","en":"The tourism association links this shop with navel-shaped bean-filled buns. It is not identified as a seller of the separate grilled-bun dish.","zh-TW":"觀光協會介紹此店的肚臍造型豆餡饅頭；資料未將其列為另一種烤饅頭的供應店。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"青梅市","station":""},"en":{"region":"Ome","station":""},"zh-TW":{"region":"青梅市","station":""}}
  },
  "sources": {
    "source-34": {"name":"青梅市観光協会 — 青梅せんべい 柳丸","url":"https://www.omekanko.gr.jp/spot/04301/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-35": {"name":"西多摩地域広域行政圏協議会 — 青梅せんべい 東京都青梅市","url":"https://www.nishitama-kouiki.jp/%E9%9D%92%E6%A2%85%E3%81%9B%E3%82%93%E3%81%B9%E3%81%84-%E6%9D%B1%E4%BA%AC%E9%83%BD%E9%9D%92%E6%A2%85%E5%B8%82/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-36": {"name":"青梅市観光協会 — へそまんじゅう総本舗","url":"https://www.omekanko.gr.jp/spot/07801/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-37": {"name":"西多摩地域広域行政圏協議会 — 焼きまんじゅう 東京都青梅市","url":"https://www.nishitama-kouiki.jp/%E7%84%BC%E3%81%8D%E3%81%BE%E3%82%93%E3%81%98%E3%82%85%E3%81%86-%E6%9D%B1%E4%BA%AC%E9%83%BD%E9%9D%92%E6%A2%85%E5%B8%82/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.omekanko.gr.jp/spot/04301/","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-34","source-35","source-36","source-37"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-34","source-35","source-36","source-37"],"origin":"editorial"},
    "location": {"sourceIds":["source-34","source-35","source-36","source-37"],"origin":"editorial"},
    "story": {"sourceIds":["source-34","source-35","source-36","source-37"],"origin":"editorial"},
    "spots": {"sourceIds":["source-34","source-35","source-36","source-37"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-34","source-35","source-36","source-37"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-34","source-35"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-34","source-35"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-34","source-35"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-36","source-37"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-36","source-37"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-36","source-37"],"origin":"editorial"},
    "spots.b02-ome-local-sweets-yanagimaru": {"sourceIds":["source-34"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-34"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-34"],"origin":"editorial"},
    "spots.b02-ome-local-sweets-hesomanju": {"sourceIds":["source-36"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-36"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-36"],"origin":"editorial"}
  }
};
