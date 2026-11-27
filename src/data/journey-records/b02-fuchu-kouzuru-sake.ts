import type { JourneyRecord } from '../journey-record';

export const b02FuchuKouzuruSakeRecord: JourneyRecord = {
  "municipalityId": "fuchu",
  "journey": {
    "id": "b02-fuchu-kouzuru-sake",
    "regionId": "fuchu",
    "foodCultureId": "fuchu-kouzuru-sake",
    "storyId": "b02-fuchu-kouzuru-sake",
    "routeId": "b02-fuchu-kouzuru-sake-route",
    "copy": {
      "ja": {"title":"府中の地酒 國府鶴","subtitle":"府中の地酒 國府鶴","description":"神社との縁と、地元での醸造再開の物語。","tags":["府中市"],"storyTitle":"府中の地酒 國府鶴","intro":["神社との縁と、地元での醸造再開の物語。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Fuchu sake: Kouzuru",
        "subtitle": "Fuchu sake: Kouzuru",
        "description": "Read about shrine connections and the return of local brewing.",
        "tags": ["Fuchu"],
        "storyTitle": "Fuchu sake: Kouzuru",
        "intro": ["Read about shrine connections and the return of local brewing.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"府中地酒 國府鶴","subtitle":"府中地酒 國府鶴","description":"閱讀與神社的淵源及重啟在地釀造的故事。","tags":["府中市"],"storyTitle":"府中地酒 國府鶴","intro":["閱讀與神社的淵源及重啟在地釀造的故事。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"御神酒から復活の酒へ","body":"野口酒造店は1860年、大國魂神社の御神酒造りを依頼され創業したと紹介しています。自社蔵での休造と委託醸造を経て、2024年春に府中で手造りの酒を復活させたと伝えています。"}],
      "en": [{"number":"01.","title":"From sacred sake to revived brewing","body":"Noguchi Brewery traces its founding to a request to brew sacred sake for Okunitama Shrine in 1860. After suspending its own brewing and commissioning production elsewhere, it reports reviving handmade sake in Fuchu in spring 2024."}],
      "zh-TW": [{"number":"01.","title":"從御神酒到重啟釀造","body":"野口酒造店介紹其於 1860 年受託為大國魂神社釀造御神酒而創業，經自家停釀與委託釀造後，於 2024 年春在府中恢復手工釀酒。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b02-fuchu-kouzuru-sake-noguchi"}]}]
  },
  "routeName": {"ja":"府中の地酒 國府鶴","en":"Fuchu sake: Kouzuru","zh-TW":"府中地酒 國府鶴"},
  "location": {"ja":{"area":"府中市","station":"","access":""},"en":{"area":"Fuchu","station":"","access":""},"zh-TW":{"area":"府中市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "府中駅", "en": "Fuchu Station", "zh-TW": "府中站"}, "spotId": "b02-fuchu-kouzuru-sake-noguchi", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b02-fuchu-kouzuru-sake-noguchi",
          "description": {"ja":"公式サイトが國府鶴の醸造元と府中での醸造再開を紹介しています。","en":"The official site introduces the maker of Kouzuru and its return to brewing in Fuchu.","zh-TW":"官方網站介紹國府鶴的釀造者及其恢復在府中釀酒的故事。"},
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
    "b02-fuchu-kouzuru-sake-noguchi": {
      "presentation": {
        "id": "b02-fuchu-kouzuru-sake-noguchi",
        "regionId": "fuchu",
        "foodCultureId": "fuchu-kouzuru-sake",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"野口酒造店","lead":"公式サイトが國府鶴の醸造元と府中での醸造再開を紹介しています。","description":"公式サイトが國府鶴の醸造元と府中での醸造再開を紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Noguchi Brewery",
            "lead": "The official site introduces the maker of Kouzuru and its return to brewing in Fuchu.",
            "description": "The official site introduces the maker of Kouzuru and its return to brewing in Fuchu.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"野口酒造店","lead":"官方網站介紹國府鶴的釀造者及其恢復在府中釀酒的故事。","description":"官方網站介紹國府鶴的釀造者及其恢復在府中釀酒的故事。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"公式サイトが國府鶴の醸造元と府中での醸造再開を紹介しています。","en":"The official site introduces the maker of Kouzuru and its return to brewing in Fuchu.","zh-TW":"官方網站介紹國府鶴的釀造者及其恢復在府中釀酒的故事。"},
        "information": [
          {"fieldId":"official_current_url","icon":"information","label":{"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},"value":{"ja":"https://www.noguchi-brewery.co.jp/","en":"https://www.noguchi-brewery.co.jp/","zh-TW":"https://www.noguchi-brewery.co.jp/"}},
          {"fieldId":"verification_note","icon":"information","label":{"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},"value":{"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}}
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"野口酒造店 — 武蔵府中の地酒 國府鶴","url":"https://www.noguchi-brewery.co.jp/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b02-fuchu-kouzuru-sake-noguchi",
          "spotId": "b02-fuchu-kouzuru-sake-noguchi",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"野口酒造店","en":"Noguchi Brewery","zh-TW":"野口酒造店"},
          "description": {"ja":"公式サイトが國府鶴の醸造元と府中での醸造再開を紹介しています。","en":"The official site introduces the maker of Kouzuru and its return to brewing in Fuchu.","zh-TW":"官方網站介紹國府鶴的釀造者及其恢復在府中釀酒的故事。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"府中市","station":""},"en":{"region":"Fuchu","station":""},"zh-TW":{"region":"府中市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Fuchu Tourism Association – visitor guide", "url": "https://mitte-x-img.istsw.jp/fuchu-kankou/file/guidejap.pdf", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-49": {"name":"野口酒造店 — 武蔵府中の地酒 國府鶴","url":"https://www.noguchi-brewery.co.jp/","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b02 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.noguchi-brewery.co.jp/","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-49"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-49"],"origin":"editorial"},
    "location": {"sourceIds":["source-49"],"origin":"editorial"},
    "story": {"sourceIds":["source-49"],"origin":"editorial"},
    "spots": {"sourceIds":["source-49"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-49"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-49"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-49"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-49"],"origin":"editorial"},
    "spots.b02-fuchu-kouzuru-sake-noguchi": {"sourceIds":["source-49"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-49"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-49"],"origin":"editorial"}
  }
};
