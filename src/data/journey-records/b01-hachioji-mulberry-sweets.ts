import type { JourneyRecord } from '../journey-record';

export const b01HachiojiMulberrySweetsRecord: JourneyRecord = {
  "municipalityId": "hachioji",
  "journey": {
    "id": "b01-hachioji-mulberry-sweets",
    "regionId": "hachioji",
    "foodCultureId": "hachioji-mulberry-sweets",
    "storyId": "b01-hachioji-mulberry-sweets",
    "routeId": "b01-hachioji-mulberry-sweets-route",
    "copy": {"ja":{"title":"桑都の桑と菓子を訪ねる","subtitle":"桑都の桑と菓子を訪ねる","description":"桑の葉の菓子から松姫もなかへ、八王子の甘い物語。","tags":["八王子市"],"storyTitle":"桑都の桑と菓子を訪ねる","intro":["桑の葉の菓子から松姫もなかへ、八王子の甘い物語。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Mulberry and sweets in the silk city","subtitle":"Mulberry and sweets in the silk city","description":"Explore Hachioji’s sweet stories, from mulberry-leaf confections to Matsuhime monaka.","tags":["Hachioji"],"storyTitle":"Mulberry and sweets in the silk city","intro":["Explore Hachioji’s sweet stories, from mulberry-leaf confections to Matsuhime monaka.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"走訪桑都的桑與糕點","subtitle":"走訪桑都的桑與糕點","description":"從桑葉糕點到松姬最中，認識八王子的甜味故事。","tags":["八王子市"],"storyTitle":"走訪桑都的桑與糕點","intro":["從桑葉糕點到松姬最中，認識八王子的甜味故事。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"桑・桑の葉茶・桑の実加工品","body":"養蚕と織物で栄えた八王子は桑都とも呼ばれます。東京都は桑の葉の茶や食用利用、桑の実のジャム、サイダー、ワインへの加工を紹介しています。"},{"number":"02.","title":"桑の葉ろーる・桑の葉まんじゅう","body":"松姫の店舗案内には、桑の葉ろーると桑の葉まんじゅうが掲載されています。"},{"number":"03.","title":"松姫もなか","body":"松姫は、松姫もなかを製造・販売する八王子の和菓子店として自らを紹介しています。"}],"en":[{"number":"01.","title":"Mulberry, Mulberry-Leaf Tea, and Mulberry Products","body":"Hachioji’s sericulture and textile history gave it the name Soto, the mulberry city. Tokyo’s resource guide describes mulberry-leaf tea and food uses, and berry jam, cider and wine."},{"number":"02.","title":"Mulberry-Leaf Roll Cake and Manju","body":"Matsuhime’s shop directory lists mulberry-leaf roll cake and manju."},{"number":"03.","title":"Matsuhime Monaka","body":"Matsuhime introduces itself as a Hachioji confectioner making and selling Matsuhime monaka."}],"zh-TW":[{"number":"01.","title":"桑葉茶與桑葚加工品","body":"八王子因養蠶與紡織而有桑都之稱。東京都資源介紹記述桑葉茶及食用用途，還有桑葚果醬、汽水與酒。"},{"number":"02.","title":"桑葉蛋糕捲與桑葉饅頭","body":"松姬店舖介紹列有桑葉蛋糕捲與桑葉饅頭。"},{"number":"03.","title":"松姬最中","body":"松姬自述為製作及販售松姬最中的八王子和菓子店。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 120,
        "steps": [
          {"spotId":"b01-hachioji-mulberry-sweets-takiyama-sweets"},
          {"spotId":"b01-hachioji-mulberry-sweets-matsuhime"}
        ]
      }
    ]
  },
  "routeName": {"ja":"桑都の桑と菓子を訪ねる","en":"Mulberry and sweets in the silk city","zh-TW":"走訪桑都的桑與糕點"},
  "location": {"ja":{"area":"八王子市","station":"","access":""},"en":{"area":"Hachioji","station":"","access":""},"zh-TW":{"area":"八王子市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b01-hachioji-mulberry-sweets-takiyama-sweets",
          "description": {"ja":"東京都の桑の紹介記事で、桑の葉の菓子の撮影協力先になっています。","en":"Tokyo’s mulberry article credits this roadside station for its photograph of mulberry-leaf confectionery.","zh-TW":"東京都的桑介紹文章，將此道之驛列為桑葉糕點的攝影協力地點。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-hachioji-mulberry-sweets-matsuhime",
          "description": {"ja":"松姫の公式店舗案内に掲載される本店。菓子を通して桑都の話をたどる編集上の立ち寄り先です。","en":"The main shop appears in Matsuhime’s official directory, selected here as a stop for exploring the city through confectionery.","zh-TW":"松姬官方店舖介紹刊載的本店；此行選作透過糕點認識桑都的停靠點。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約120分（編集目安）","distance":"","spots":"2 か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 120 min (editorial estimate)","distance":"","spots":"2 stops","station":"","minutes":"120","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 120 分鐘（編輯估計）","distance":"","spots":"2 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-hachioji-mulberry-sweets-takiyama-sweets": {
      "presentation": {
        "id": "b01-hachioji-mulberry-sweets-takiyama-sweets",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-mulberry-sweets",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"道の駅八王子滝山","lead":"東京都の桑の紹介記事で、桑の葉の菓子の撮影協力先になっています。","description":"東京都の桑の紹介記事で、桑の葉の菓子の撮影協力先になっています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Michi-no-Eki Hachioji Takiyama","lead":"Tokyo’s mulberry article credits this roadside station for its photograph of mulberry-leaf confectionery.","description":"Tokyo’s mulberry article credits this roadside station for its photograph of mulberry-leaf confectionery.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"道之驛八王子滝山","lead":"東京都的桑介紹文章，將此道之驛列為桑葉糕點的攝影協力地點。","description":"東京都的桑介紹文章，將此道之驛列為桑葉糕點的攝影協力地點。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"東京都の桑の紹介記事で、桑の葉の菓子の撮影協力先になっています。","en":"Tokyo’s mulberry article credits this roadside station for its photograph of mulberry-leaf confectionery.","zh-TW":"東京都的桑介紹文章，將此道之驛列為桑葉糕點的攝影協力地點。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_69.html","en":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_69.html","zh-TW":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_69.html"}
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
      "officialSource": {"name":"Tokyo Metropolitan Government — 桑","url":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_69.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-hachioji-mulberry-sweets-matsuhime": {
      "presentation": {
        "id": "b01-hachioji-mulberry-sweets-matsuhime",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-mulberry-sweets",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"松姫本店","lead":"松姫の公式店舗案内に掲載される本店。菓子を通して桑都の話をたどる編集上の立ち寄り先です。","description":"松姫の公式店舗案内に掲載される本店。菓子を通して桑都の話をたどる編集上の立ち寄り先です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Matsuhime main shop","lead":"The main shop appears in Matsuhime’s official directory, selected here as a stop for exploring the city through confectionery.","description":"The main shop appears in Matsuhime’s official directory, selected here as a stop for exploring the city through confectionery.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"松姬本店","lead":"松姬官方店舖介紹刊載的本店；此行選作透過糕點認識桑都的停靠點。","description":"松姬官方店舖介紹刊載的本店；此行選作透過糕點認識桑都的停靠點。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"松姫の公式店舗案内に掲載される本店。菓子を通して桑都の話をたどる編集上の立ち寄り先です。","en":"The main shop appears in Matsuhime’s official directory, selected here as a stop for exploring the city through confectionery.","zh-TW":"松姬官方店舖介紹刊載的本店；此行選作透過糕點認識桑都的停靠點。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.matuhime.co.jp/tennpo.html","en":"https://www.matuhime.co.jp/tennpo.html","zh-TW":"https://www.matuhime.co.jp/tennpo.html"}
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
      "officialSource": {"name":"Matsuhime — 松姫 店舗情報","url":"https://www.matuhime.co.jp/tennpo.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-hachioji-mulberry-sweets-takiyama-sweets",
          "spotId": "b01-hachioji-mulberry-sweets-takiyama-sweets",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"道の駅八王子滝山","en":"Michi-no-Eki Hachioji Takiyama","zh-TW":"道之驛八王子滝山"},
          "description": {"ja":"東京都の桑の紹介記事で、桑の葉の菓子の撮影協力先になっています。","en":"Tokyo’s mulberry article credits this roadside station for its photograph of mulberry-leaf confectionery.","zh-TW":"東京都的桑介紹文章，將此道之驛列為桑葉糕點的攝影協力地點。"}
        },
        {
          "referenceId": "b01-hachioji-mulberry-sweets-matsuhime",
          "spotId": "b01-hachioji-mulberry-sweets-matsuhime",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"松姫本店","en":"Matsuhime main shop","zh-TW":"松姬本店"},
          "description": {"ja":"松姫の公式店舗案内に掲載される本店。菓子を通して桑都の話をたどる編集上の立ち寄り先です。","en":"The main shop appears in Matsuhime’s official directory, selected here as a stop for exploring the city through confectionery.","zh-TW":"松姬官方店舖介紹刊載的本店；此行選作透過糕點認識桑都的停靠點。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八王子市","station":""},"en":{"region":"Hachioji","station":""},"zh-TW":{"region":"八王子市","station":""}}
  },
  "sources": {
    "source-10": {"name":"Matsuhime — 八王子松姫～松姫もなか","url":"https://matuhime.co.jp/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-26": {"name":"Tokyo Metropolitan Government — 桑","url":"https://www.chiikishigen.metro.tokyo.lg.jp/introduction/details/introduction_69.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "source-42": {"name":"Matsuhime — 松姫 店舗情報","url":"https://www.matuhime.co.jp/tennpo.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://matuhime.co.jp/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-10",
        "source-26",
        "source-42"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-10",
        "source-26",
        "source-42"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-10",
        "source-26",
        "source-42"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-10",
        "source-26",
        "source-42"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-26"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-26"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-26"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-42"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-42"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-42"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-10"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-10"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-10"
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
        "source-26",
        "source-42"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-26",
        "source-42"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-mulberry-sweets-takiyama-sweets.detail.description": {
      "sourceIds": [
        "source-26"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-mulberry-sweets-takiyama-sweets.presentation": {
      "sourceIds": [
        "source-26"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-26"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-26"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-mulberry-sweets-matsuhime.detail.description": {
      "sourceIds": [
        "source-42"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-mulberry-sweets-matsuhime.presentation": {
      "sourceIds": [
        "source-42"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-42"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-42"
      ],
      "origin": "editorial"
    }
  }
};
