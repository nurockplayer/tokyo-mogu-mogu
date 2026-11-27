import type { JourneyRecord } from '../journey-record';

export const b02FuchuChestnutFestivalRecord: JourneyRecord = {
  "municipalityId": "fuchu",
  "journey": {
    "id": "b02-fuchu-chestnut-festival",
    "regionId": "fuchu",
    "foodCultureId": "fuchu-chestnut-festival",
    "storyId": "b02-fuchu-chestnut-festival",
    "routeId": "b02-fuchu-chestnut-festival-route",
    "copy": {
      "ja": {"title":"武蔵野の栗とくり祭","subtitle":"武蔵野の栗とくり祭","description":"収穫の記憶と、祭の名を持つ菓子をたどる。","tags":["府中市"],"storyTitle":"武蔵野の栗とくり祭","intro":["収穫の記憶と、祭の名を持つ菓子をたどる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Musashino chestnuts and Kurimatsuri",
        "subtitle": "Musashino chestnuts and Kurimatsuri",
        "description": "Connect a harvest story with a confection bearing the festival’s name.",
        "tags": ["Fuchu"],
        "storyTitle": "Musashino chestnuts and Kurimatsuri",
        "intro": ["Connect a harvest story with a confection bearing the festival’s name.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"武藏野栗子與栗祭","subtitle":"武藏野栗子與栗祭","description":"從收穫的記憶認識以祭典命名的點心。","tags":["府中市"],"storyTitle":"武藏野栗子與栗祭","intro":["從收穫的記憶認識以祭典命名的點心。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"収穫と祭","body":"東京の公式観光案内は、武蔵野の栗が保存食や献納品として重んじられたと紹介しています。栗の収穫期と神楽の時期が重なり、大國魂神社の秋季祭がくり祭と呼ばれるようになったと説明しています。"},{"number":"02.","title":"祭の名を持つ菓子","body":"フォーリスの青木屋の店舗案内には、「栗まつり」という菓子が掲載されています。名称の紹介であり、祭との公式な提携を示すものではありません。"}],
      "en": [
        {"number":"01.","title":"Harvest and festival","body":"Tokyo’s official tourism guide describes Musashino chestnuts as valued preserved food and offerings. It links the name Kurimatsuri at Okunitama Shrine with the overlap of chestnut harvest and kagura celebrations."},
        {"number":"02.","title":"A sweet named Kurimatsuri","body":"Foris’s Aokiya shop listing includes a confection named Kurimatsuri. The listing establishes the name, not an official partnership with the festival."}
      ],
      "zh-TW": [{"number":"01.","title":"收穫與祭典","body":"東京官方觀光指南記載武藏野栗子曾作為保存食與進獻品，並說明栗子收穫期與神樂時期重合，使大國魂神社秋季祭逐漸稱為栗祭。"},{"number":"02.","title":"名為栗祭的點心","body":"Foris 的青木屋店家資料列有名為「栗まつり」的點心；此記載支持品名，不代表與祭典有正式合作。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":150,"steps":[{"spotId":"b02-fuchu-chestnut-festival-okunitama"},{"spotId":"b02-fuchu-chestnut-festival-aokiya-chestnut"}]}]
  },
  "routeName": {"ja":"武蔵野の栗とくり祭","en":"Musashino chestnuts and Kurimatsuri","zh-TW":"武藏野栗子與栗祭"},
  "location": {"ja":{"area":"府中市","station":"","access":""},"en":{"area":"Fuchu","station":"","access":""},"zh-TW":{"area":"府中市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "府中本町駅", "en": "Fuchū-Hommachi Station", "zh-TW": "府中本町站"}, "spotId": "b02-fuchu-chestnut-festival-okunitama", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b02-fuchu-chestnut-festival-okunitama",
          "description": {"ja":"東京の公式観光案内がくり祭の会場として紹介しています。催事の日程を示す行程ではありません。","en":"Tokyo’s official tourism guide identifies the shrine with Kurimatsuri. This itinerary does not specify an event schedule.","zh-TW":"東京官方觀光指南介紹此神社的栗祭；本行程未指定活動日期。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通・訪問の可否は各自ご確認ください。紹介した食品すべてを各立ち寄り先で提供する行程ではありません。","en":"Timing and order are editorial estimates. Check transport and visitor access yourself. Each stop is not assumed to offer every food described.","zh-TW":"時間與順序為編輯估計，請自行確認交通與能否造訪。各停靠點不代表供應文中所有食品。"}
        },
        {
          "spotId": "b02-fuchu-chestnut-festival-aokiya-chestnut",
          "description": {"ja":"商業施設の店舗案内が「栗まつり」を商品名として掲載しています。","en":"The shopping-centre listing includes Kurimatsuri among this shop’s confection names.","zh-TW":"商場店家介紹將「栗まつり」列為此店點心品名之一。"},
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
    "b02-fuchu-chestnut-festival-okunitama": {
      "presentation": {
        "id": "b02-fuchu-chestnut-festival-okunitama",
        "regionId": "fuchu",
        "foodCultureId": "fuchu-chestnut-festival",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"大國魂神社","lead":"東京の公式観光案内がくり祭の会場として紹介しています。催事の日程を示す行程ではありません。","description":"東京の公式観光案内がくり祭の会場として紹介しています。催事の日程を示す行程ではありません。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Okunitama Shrine",
            "lead": "Tokyo’s official tourism guide identifies the shrine with Kurimatsuri. This itinerary does not specify an event schedule.",
            "description": "Tokyo’s official tourism guide identifies the shrine with Kurimatsuri. This itinerary does not specify an event schedule.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"大國魂神社","lead":"東京官方觀光指南介紹此神社的栗祭；本行程未指定活動日期。","description":"東京官方觀光指南介紹此神社的栗祭；本行程未指定活動日期。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"東京の公式観光案内がくり祭の会場として紹介しています。催事の日程を示す行程ではありません。","en":"Tokyo’s official tourism guide identifies the shrine with Kurimatsuri. This itinerary does not specify an event schedule.","zh-TW":"東京官方觀光指南介紹此神社的栗祭；本行程未指定活動日期。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.gotokyo.org/jp/spot/ev010/index.html","en":"https://www.gotokyo.org/jp/spot/ev010/index.html","zh-TW":"https://www.gotokyo.org/jp/spot/ev010/index.html"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"東京観光財団 GO TOKYO — 大國魂神社―秋季祭・くり祭―","url":"https://www.gotokyo.org/jp/spot/ev010/index.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b02-fuchu-chestnut-festival-aokiya-chestnut": {
      "presentation": {
        "id": "b02-fuchu-chestnut-festival-aokiya-chestnut",
        "regionId": "fuchu",
        "foodCultureId": "fuchu-chestnut-festival",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"青木屋 府中けやき並木通り店","lead":"商業施設の店舗案内が「栗まつり」を商品名として掲載しています。","description":"商業施設の店舗案内が「栗まつり」を商品名として掲載しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Aokiya Fuchu Keyaki Namiki-dori",
            "lead": "The shopping-centre listing includes Kurimatsuri among this shop’s confection names.",
            "description": "The shopping-centre listing includes Kurimatsuri among this shop’s confection names.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"青木屋 府中櫸樹並木通店","lead":"商場店家介紹將「栗まつり」列為此店點心品名之一。","description":"商場店家介紹將「栗まつり」列為此店點心品名之一。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"商業施設の店舗案内が「栗まつり」を商品名として掲載しています。","en":"The shopping-centre listing includes Kurimatsuri among this shop’s confection names.","zh-TW":"商場店家介紹將「栗まつり」列為此店點心品名之一。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://mitten-foris.jp/shop/index.jsp?bf=1&fmt=6&shopid=2102","en":"https://mitten-foris.jp/shop/index.jsp?bf=1&fmt=6&shopid=2102","zh-TW":"https://mitten-foris.jp/shop/index.jsp?bf=1&fmt=6&shopid=2102"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"Foris — Aokiya shop guide","url":"https://mitten-foris.jp/shop/index.jsp?bf=1&fmt=6&shopid=2102","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b02-fuchu-chestnut-festival-okunitama",
          "spotId": "b02-fuchu-chestnut-festival-okunitama",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"大國魂神社","en":"Okunitama Shrine","zh-TW":"大國魂神社"},
          "description": {"ja":"東京の公式観光案内がくり祭の会場として紹介しています。催事の日程を示す行程ではありません。","en":"Tokyo’s official tourism guide identifies the shrine with Kurimatsuri. This itinerary does not specify an event schedule.","zh-TW":"東京官方觀光指南介紹此神社的栗祭；本行程未指定活動日期。"}
        },
        {
          "referenceId": "b02-fuchu-chestnut-festival-aokiya-chestnut",
          "spotId": "b02-fuchu-chestnut-festival-aokiya-chestnut",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"青木屋 府中けやき並木通り店","en":"Aokiya Fuchu Keyaki Namiki-dori","zh-TW":"青木屋 府中櫸樹並木通店"},
          "description": {"ja":"商業施設の店舗案内が「栗まつり」を商品名として掲載しています。","en":"The shopping-centre listing includes Kurimatsuri among this shop’s confection names.","zh-TW":"商場店家介紹將「栗まつり」列為此店點心品名之一。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"府中市","station":""},"en":{"region":"Fuchu","station":""},"zh-TW":{"region":"府中市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Ōkunitama Shrine access", "url": "https://www.ookunitamajinja.or.jp/access/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-47": {"name":"東京観光財団 GO TOKYO — 大國魂神社―秋季祭・くり祭―","url":"https://www.gotokyo.org/jp/spot/ev010/index.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-51": {"name":"Foris — Aokiya shop guide","url":"https://mitten-foris.jp/shop/index.jsp?bf=1&fmt=6&shopid=2102","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.gotokyo.org/jp/spot/ev010/index.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-47","source-51"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-47","source-51"],"origin":"editorial"},
    "location": {"sourceIds":["source-47","source-51"],"origin":"editorial"},
    "story": {"sourceIds":["source-47","source-51"],"origin":"editorial"},
    "spots": {"sourceIds":["source-47","source-51"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-47","source-51"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-47"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-47"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-47"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-51"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-51"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-51"],"origin":"editorial"},
    "spots.b02-fuchu-chestnut-festival-okunitama": {"sourceIds":["source-47"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-47"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-47"],"origin":"editorial"},
    "spots.b02-fuchu-chestnut-festival-aokiya-chestnut": {"sourceIds":["source-51"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-51"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-51"],"origin":"editorial"}
  }
};
