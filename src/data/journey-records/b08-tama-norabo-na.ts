import type { JourneyRecord } from '../journey-record';

export const b08TamaNoraboNaRecord: JourneyRecord = {
  "municipalityId": "tama",
  "journey": {
    "id": "b08-tama-norabo-na",
    "regionId": "tama",
    "foodCultureId": "tama-norabo-na",
    "storyId": "b08-tama-norabo-na",
    "routeId": "b08-tama-norabo-na-route",
    "copy": {
      "ja": {"title":"多摩市・春ののらぼう菜","subtitle":"多摩市・春ののらぼう菜","description":"育てる人と農家の直売所から、春の葉物を知る。","tags":["多摩市"],"storyTitle":"多摩市・春ののらぼう菜","intro":["育てる人と農家の直売所から、春の葉物を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {"title":"Tama’s spring norabo-na","subtitle":"Tama’s spring norabo-na","description":"Meet a spring green through its growers and farmer-run market.","tags":["Tama City"],"storyTitle":"Tama’s spring norabo-na","intro":["Meet a spring green through its growers and farmer-run market.","This information is unconfirmed. Check the source information before visiting."]},
      "zh-TW": {"title":"多摩市的春季野良坊菜","subtitle":"多摩市的春季野良坊菜","description":"從生產者與農家市集認識春季葉菜。","tags":["多摩市"],"storyTitle":"多摩市的春季野良坊菜","intro":["從生產者與農家市集認識春季葉菜。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"のらぼう菜","body":"JAはいきいき市の春の品目にのらぼう菜を掲載。農家紹介には大松誠二さん・幸代さんの栽培が記され、きりり農園は多摩地域の春の伝統野菜として紹介しています。"}
      ],
      "en": [
        {"number":"01.","title":"Norabo-na Traditional Greens","body":"JA lists norabo-na among Ikiiki-ichi’s spring crops. The local grower directory names Seiji and Sachiyo Omatsu, while Kiriri Farm describes it as a traditional spring vegetable of the Tama region."}
      ],
      "zh-TW": [
        {"number":"01.","title":"野良坊菜","body":"JA將野良坊菜列為 Ikiiki-ichi 的春季作物。農家名錄記載大松誠二與幸代種植此菜，Kiriri農園則介紹它為多摩地區的春季傳統蔬菜。"}
      ]
    },
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b08-tama-norabo-na-ikiiki"}
        ]
      }
    ]
  },
  "routeName": {"ja":"多摩市・春ののらぼう菜","en":"Tama’s spring norabo-na","zh-TW":"多摩市的春季野良坊菜"},
  "location": {
    "ja": {"area":"多摩市","station":"","access":""},
    "en": {"area":"Tama City","station":"","access":""},
    "zh-TW": {"area":"多摩市","station":"","access":""}
  },
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b08-tama-norabo-na-ikiiki",
          "description": {"ja":"JAは農家が自主運営する直売所として紹介しています。","en":"JA describes this as a farmer-run produce market.","zh-TW":"JA介紹此處為農家自主營運的農產市集。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops.","zh-TW":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
        }
      ],
      "stats": {
        "ja": {"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通手段と経路は各自ご確認ください。掲載先で文中の全品目を体験できることを意味しません。"},
        "en": {"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stop","station":"","minutes":"90","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply that every item described can be experienced at its stops."},
        "zh-TW": {"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表各停留點提供文中全部品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b08-tama-norabo-na-ikiiki": {
      "presentation": {
        "id": "b08-tama-norabo-na-ikiiki",
        "regionId": "tama",
        "foodCultureId": "tama-norabo-na",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "いきいき市",
            "lead": "JAは農家が自主運営する直売所として紹介しています。",
            "description": "JAは農家が自主運営する直売所として紹介しています。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}
            ],
            "caution": [
              "掲載内容は未確認です。訪問前に出典情報をご確認ください。"
            ]
          },
          "en": {
            "name": "Ikiiki-ichi Farmers’ Market",
            "lead": "JA describes this as a farmer-run produce market.",
            "description": "JA describes this as a farmer-run produce market.",
            "tags": [],
            "practicalInfo": [
              {"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}
            ],
            "caution": [
              "This information is unconfirmed. Check the source information before visiting."
            ]
          },
          "zh-TW": {
            "name": "Ikiiki-ichi農夫市集",
            "lead": "JA介紹此處為農家自主營運的農產市集。",
            "description": "JA介紹此處為農家自主營運的農產市集。",
            "tags": [],
            "practicalInfo": [
              {"label":"確認狀態","value":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
            ],
            "caution": [
              "刊載內容尚未確認。造訪前請查看出處資訊。"
            ]
          }
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"JAは農家が自主運営する直売所として紹介しています。","en":"JA describes this as a farmer-run produce market.","zh-TW":"JA介紹此處為農家自主營運的農產市集。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://agripark.tokyo/matching/search/store.php?id=ikikiiti_nousanbututyokubaizyo","en":"https://agripark.tokyo/matching/search/store.php?id=ikikiiti_nousanbututyokubaizyo","zh-TW":"https://agripark.tokyo/matching/search/store.php?id=ikikiiti_nousanbututyokubaizyo"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026年11月24日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"多摩市内農産物直売所 いきいき市","url":"https://agripark.tokyo/matching/search/store.php?id=ikikiiti_nousanbututyokubaizyo","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b08-tama-norabo-na-ikiiki",
          "spotId": "b08-tama-norabo-na-ikiiki",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"いきいき市","en":"Ikiiki-ichi Farmers’ Market","zh-TW":"Ikiiki-ichi農夫市集"},
          "description": {"ja":"JAは農家が自主運営する直売所として紹介しています。","en":"JA describes this as a farmer-run produce market.","zh-TW":"JA介紹此處為農家自主營運的農產市集。"}
        }
      ],
      "nature": []
    },
    "location": {
      "ja": {"region":"多摩市","station":""},
      "en": {"region":"Tama City","station":""},
      "zh-TW": {"region":"多摩市","station":""}
    }
  },
  "sources": {
    "source-1": {"name":"多摩市内農産物直売所 いきいき市","url":"https://agripark.tokyo/matching/search/store.php?id=ikikiiti_nousanbututyokubaizyo","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-3": {"name":"農家紹介","url":"https://agriagri.net/nouka-2/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-4": {"name":"限定 のらぼう菜たっぷりBOX","url":"https://www.biogartenkiriri.com/blank-10/%E3%81%AE%E3%82%89%E3%81%BC%E3%81%86%E8%8F%9C%E3%81%9F%E3%81%A3%E3%81%B7%E3%82%8Abox","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b08 editorial itinerary — timing and order are estimates","url":"https://agripark.tokyo/matching/search/store.php?id=ikikiiti_nousanbututyokubaizyo","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-1","source-3","source-4"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-1","source-3","source-4"],"origin":"editorial"},
    "location": {"sourceIds":["source-1","source-3","source-4"],"origin":"editorial"},
    "story": {"sourceIds":["source-1","source-3","source-4"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-1","source-3","source-4"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-1","source-3","source-4"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-1","source-3","source-4"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-1","source-3","source-4"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-1","source-3","source-4"],"origin":"editorial"},
    "spots.b08-tama-norabo-na-ikiiki": {"sourceIds":["source-1"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-1"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-1"],"origin":"editorial"}
  }
};
