import type { JourneyRecord } from '../journey-record';

export const b01MusashinoSakaiChiliRecord: JourneyRecord = {
  "municipalityId": "musashino",
  "journey": {
    "id": "b01-musashino-sakai-chili",
    "regionId": "musashino",
    "foodCultureId": "musashino-sakai-chili",
    "storyId": "b01-musashino-sakai-chili",
    "routeId": "b01-musashino-sakai-chili-route",
    "copy": {"ja":{"title":"境のとんがらしの広がり","subtitle":"境のとんがらしの広がり","description":"復活した唐辛子から辣油とソーセージへ。","tags":["武蔵野市"],"storyTitle":"境のとんがらしの広がり","intro":["復活した唐辛子から辣油とソーセージへ。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Sakai chili and its local connections","subtitle":"Sakai chili and its local connections","description":"From a revived chili to chili oil and sausage.","tags":["Musashino"],"storyTitle":"Sakai chili and its local connections","intro":["From a revived chili to chili oil and sausage.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"境之辣椒的地方延伸","subtitle":"境之辣椒的地方延伸","description":"從復育辣椒走向辣油與香腸。","tags":["武藏野市"],"storyTitle":"境之辣椒的地方延伸","intro":["從復育辣椒走向辣油與香腸。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"境のとんがらし（八つ房唐辛子）","body":"むさしのプレミアムは、昭和初期まで育てられていた八つ房唐辛子を地元の子どもたちが復活させ、一味の「境のとんがらし」へとつないだと紹介しています。"},{"number":"02.","title":"金箔入り吉祥寺辣油","body":"金箔入り吉祥寺辣油は、境のとんがらしを含む香辛料や調味料を合わせたMATSUHIROの製品として紹介されています。"},{"number":"03.","title":"武蔵境とんがらし チョリソーチーズフランク","body":"ケーニッヒのチョリソーチーズフランクも、武蔵境の唐辛子とチーズを使う製品として掲載されています。"}],"en":[{"number":"01.","title":"Sakai no Tongarashi Heritage Chili","body":"Musashino Premium describes local children reviving Yatsufusa chili, formerly grown until the early Showa period, and turning it into Sakai no Tongarashi powder."},{"number":"02.","title":"Kichijoji Chili Oil with Gold Leaf","body":"The catalogue describes Matsuhiro’s gold-leaf Kichijoji chili oil as blending seasonings including Sakai no Tongarashi."},{"number":"03.","title":"Musashisakai Chili and Cheese Sausage","body":"König’s chorizo cheese frank is also listed as a product using Musashisakai chili and cheese."}],"zh-TW":[{"number":"01.","title":"境之辣椒（八房辣椒）","body":"武藏野 Premium 介紹在地孩子復育種植至昭和初期的八房辣椒，並製成「境のとんがらし」辣椒粉。"},{"number":"02.","title":"金箔吉祥寺辣油","body":"目錄介紹 MATSUHIRO 的金箔吉祥寺辣油，混合含境之辣椒在內的香辛料與調味料。"},{"number":"03.","title":"武藏境辣椒起司香腸","body":"目錄也列有 König 使用武藏境辣椒與起司製作的辣味香腸。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 150,
        "steps": [
          {"spotId":"b01-musashino-sakai-chili-hainan"},
          {"spotId":"b01-musashino-sakai-chili-konig"},
          {"spotId":"b01-musashino-sakai-chili-mugiwara-chili"}
        ]
      }
    ]
  },
  "routeName": {"ja":"境のとんがらしの広がり","en":"Sakai chili and its local connections","zh-TW":"境之辣椒的地方延伸"},
  "location": {"ja":{"area":"武蔵野市","station":"","access":""},"en":{"area":"Musashino","station":"","access":""},"zh-TW":{"area":"武藏野市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b01-musashino-sakai-chili-hainan",
          "description": {"ja":"認定品の目録が、境のとんがらしの販売店として掲載しています。","en":"The endorsed-products catalogue lists this shop with Sakai no Tongarashi.","zh-TW":"認定品目錄將此店列為境之辣椒的店家。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-musashino-sakai-chili-konig",
          "description": {"ja":"認定品の目録が、唐辛子とチーズのフランクの店として掲載しています。","en":"The catalogue links this shop with the chili-and-cheese frank.","zh-TW":"目錄將此店與辣椒起司香腸連結。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        },
        {
          "spotId": "b01-musashino-sakai-chili-mugiwara-chili",
          "description": {"ja":"認定品の目録が、金箔入り吉祥寺辣油の販売店として掲載しています。","en":"The catalogue identifies this shop with gold-leaf Kichijoji chili oil.","zh-TW":"目錄將此店列為金箔吉祥寺辣油的店家。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約150分（編集目安）","distance":"","spots":"3 か所","station":"","minutes":"150","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 150 min (editorial estimate)","distance":"","spots":"3 stops","station":"","minutes":"150","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 150 分鐘（編輯估計）","distance":"","spots":"3 處","station":"","minutes":"150","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-musashino-sakai-chili-hainan": {
      "presentation": {
        "id": "b01-musashino-sakai-chili-hainan",
        "regionId": "musashino",
        "foodCultureId": "musashino-sakai-chili",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"ハイナン焼きショーロンポー","lead":"認定品の目録が、境のとんがらしの販売店として掲載しています。","description":"認定品の目録が、境のとんがらしの販売店として掲載しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Hainan Yaki Shoronpo","lead":"The endorsed-products catalogue lists this shop with Sakai no Tongarashi.","description":"The endorsed-products catalogue lists this shop with Sakai no Tongarashi.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"Hainan 煎小籠包","lead":"認定品目錄將此店列為境之辣椒的店家。","description":"認定品目錄將此店列為境之辣椒的店家。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"認定品の目録が、境のとんがらしの販売店として掲載しています。","en":"The endorsed-products catalogue lists this shop with Sakai no Tongarashi.","zh-TW":"認定品目錄將此店列為境之辣椒的店家。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://musashino-premium.com/standard/","en":"https://musashino-premium.com/standard/","zh-TW":"https://musashino-premium.com/standard/"}
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
      "officialSource": {"name":"Musashino Premium — 認定商品","url":"https://musashino-premium.com/standard/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-musashino-sakai-chili-konig": {
      "presentation": {
        "id": "b01-musashino-sakai-chili-konig",
        "regionId": "musashino",
        "foodCultureId": "musashino-sakai-chili",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"ケーニッヒ 吉祥寺店","lead":"認定品の目録が、唐辛子とチーズのフランクの店として掲載しています。","description":"認定品の目録が、唐辛子とチーズのフランクの店として掲載しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"König Kichijoji","lead":"The catalogue links this shop with the chili-and-cheese frank.","description":"The catalogue links this shop with the chili-and-cheese frank.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"König 吉祥寺店","lead":"目錄將此店與辣椒起司香腸連結。","description":"目錄將此店與辣椒起司香腸連結。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"認定品の目録が、唐辛子とチーズのフランクの店として掲載しています。","en":"The catalogue links this shop with the chili-and-cheese frank.","zh-TW":"目錄將此店與辣椒起司香腸連結。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://musashino-premium.com/standard/","en":"https://musashino-premium.com/standard/","zh-TW":"https://musashino-premium.com/standard/"}
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
      "officialSource": {"name":"Musashino Premium — 認定商品","url":"https://musashino-premium.com/standard/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    },
    "b01-musashino-sakai-chili-mugiwara-chili": {
      "presentation": {
        "id": "b01-musashino-sakai-chili-mugiwara-chili",
        "regionId": "musashino",
        "foodCultureId": "musashino-sakai-chili",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"アンテナショップ麦わら帽子","lead":"認定品の目録が、金箔入り吉祥寺辣油の販売店として掲載しています。","description":"認定品の目録が、金箔入り吉祥寺辣油の販売店として掲載しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Mugiwara Boshi antenna shop","lead":"The catalogue identifies this shop with gold-leaf Kichijoji chili oil.","description":"The catalogue identifies this shop with gold-leaf Kichijoji chili oil.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"麥草帽地方特產店","lead":"目錄將此店列為金箔吉祥寺辣油的店家。","description":"目錄將此店列為金箔吉祥寺辣油的店家。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"認定品の目録が、金箔入り吉祥寺辣油の販売店として掲載しています。","en":"The catalogue identifies this shop with gold-leaf Kichijoji chili oil.","zh-TW":"目錄將此店列為金箔吉祥寺辣油的店家。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://musashino-premium.com/standard/","en":"https://musashino-premium.com/standard/","zh-TW":"https://musashino-premium.com/standard/"}
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
      "officialSource": {"name":"Musashino Premium — 認定商品","url":"https://musashino-premium.com/standard/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-musashino-sakai-chili-hainan",
          "spotId": "b01-musashino-sakai-chili-hainan",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"ハイナン焼きショーロンポー","en":"Hainan Yaki Shoronpo","zh-TW":"Hainan 煎小籠包"},
          "description": {"ja":"認定品の目録が、境のとんがらしの販売店として掲載しています。","en":"The endorsed-products catalogue lists this shop with Sakai no Tongarashi.","zh-TW":"認定品目錄將此店列為境之辣椒的店家。"}
        },
        {
          "referenceId": "b01-musashino-sakai-chili-konig",
          "spotId": "b01-musashino-sakai-chili-konig",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"ケーニッヒ 吉祥寺店","en":"König Kichijoji","zh-TW":"König 吉祥寺店"},
          "description": {"ja":"認定品の目録が、唐辛子とチーズのフランクの店として掲載しています。","en":"The catalogue links this shop with the chili-and-cheese frank.","zh-TW":"目錄將此店與辣椒起司香腸連結。"}
        },
        {
          "referenceId": "b01-musashino-sakai-chili-mugiwara-chili",
          "spotId": "b01-musashino-sakai-chili-mugiwara-chili",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"アンテナショップ麦わら帽子","en":"Mugiwara Boshi antenna shop","zh-TW":"麥草帽地方特產店"},
          "description": {"ja":"認定品の目録が、金箔入り吉祥寺辣油の販売店として掲載しています。","en":"The catalogue identifies this shop with gold-leaf Kichijoji chili oil.","zh-TW":"目錄將此店列為金箔吉祥寺辣油的店家。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"武蔵野市","station":""},"en":{"region":"Musashino","station":""},"zh-TW":{"region":"武藏野市","station":""}}
  },
  "sources": {
    "source-12": {"name":"Musashino Premium — 認定商品","url":"https://musashino-premium.com/standard/","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://musashino-premium.com/standard/","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.1": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.1": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.1": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.2": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.2": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.2": {
      "sourceIds": [
        "source-12"
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
        "source-12",
        "source-12",
        "source-12"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-12",
        "source-12",
        "source-12"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-sakai-chili-hainan.detail.description": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-sakai-chili-hainan.presentation": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-sakai-chili-konig.detail.description": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-sakai-chili-konig.presentation": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.1": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.1.description": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-sakai-chili-mugiwara-chili.detail.description": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "spots.b01-musashino-sakai-chili-mugiwara-chili.presentation": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.2": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.2.description": {
      "sourceIds": [
        "source-12"
      ],
      "origin": "editorial"
    }
  }
};
