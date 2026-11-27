import type { JourneyRecord } from '../journey-record';

export const b01HachiojiAsakawaAyuRecord: JourneyRecord = {
  "municipalityId": "hachioji",
  "journey": {
    "id": "b01-hachioji-asakawa-ayu",
    "regionId": "hachioji",
    "foodCultureId": "hachioji-asakawa-ayu",
    "storyId": "b01-hachioji-asakawa-ayu",
    "routeId": "b01-hachioji-asakawa-ayu-route",
    "copy": {"ja":{"title":"浅川とアユの地域文化","subtitle":"浅川とアユの地域文化","description":"市の記録から、アユと川のつながりを読む。","tags":["八王子市"],"storyTitle":"浅川とアユの地域文化","intro":["市の記録から、アユと川のつながりを読む。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"title":"Asakawa and local ayu culture","subtitle":"Asakawa and local ayu culture","description":"Read the connection between ayu and the river through city documentation.","tags":["Hachioji"],"storyTitle":"Asakawa and local ayu culture","intro":["Read the connection between ayu and the river through city documentation.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"title":"淺川與香魚的地方文化","subtitle":"淺川與香魚的地方文化","description":"從市府記錄認識香魚與河川的關係。","tags":["八王子市"],"storyTitle":"淺川與香魚的地方文化","intro":["從市府記錄認識香魚與河川的關係。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja":[{"number":"01.","title":"浅川のアユ釣り","body":"八王子市は、浅川本流と一部の支流に設定された漁場でのアユ釣りを案内しています。"}],"en":[{"number":"01.","title":"Asakawa River Ayu Fishing","body":"Hachioji City documents ayu fishing in designated reaches of the Asakawa main river and some tributaries."}],"zh-TW":[{"number":"01.","title":"淺川香魚垂釣文化","body":"八王子市介紹淺川主流及部分支流劃定河段的香魚垂釣。"}]},
    "routeVariants": [
      {
        "id": "half-day",
        "durationMinutes": 90,
        "steps": [
          {"spotId":"b01-hachioji-asakawa-ayu-asakawa"}
        ]
      }
    ]
  },
  "routeName": {"ja":"浅川とアユの地域文化","en":"Asakawa and local ayu culture","zh-TW":"淺川與香魚的地方文化"},
  "location": {"ja":{"area":"八王子市","station":"","access":""},"en":{"area":"Hachioji","station":"","access":""},"zh-TW":{"area":"八王子市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "八王子駅", "en": "Hachioji Station", "zh-TW": "八王子站"}, "spotId": "b01-hachioji-asakawa-ayu-asakawa", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b01-hachioji-asakawa-ayu-asakawa",
          "description": {"ja":"市がアユ釣りの漁場範囲を記す河川。川と食文化の背景を読むための立ち寄り先です。","en":"The city documents ayu fishing reaches here; this stop offers context for the river’s food culture.","zh-TW":"市府記錄香魚漁場範圍的河川，此停靠點用來認識河川飲食文化背景。"},
          "note": {"ja":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。","en":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described.","zh-TW":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}
        }
      ],
      "stats": {"ja":{"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載料理をすべて提供するコースではありません。"},"en":{"time":"About 90 min (editorial estimate)","distance":"","spots":"1 stops","station":"","minutes":"90","access":"","caution":"Timing and order are editorial estimates. Check transport and directions yourself. This is not a menu serving every dish described."},"zh-TW":{"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會供應文中每道料理。"}},
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b01-hachioji-asakawa-ayu-asakawa": {
      "presentation": {
        "id": "b01-hachioji-asakawa-ayu-asakawa",
        "regionId": "hachioji",
        "foodCultureId": "hachioji-asakawa-ayu",
        "thumbnailAssetIds": [],
        "copy": {"ja":{"name":"浅川","lead":"市がアユ釣りの漁場範囲を記す河川。川と食文化の背景を読むための立ち寄り先です。","description":"市がアユ釣りの漁場範囲を記す河川。川と食文化の背景を読むための立ち寄り先です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月22日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en":{"name":"Asakawa River","lead":"The city documents ayu fishing reaches here; this stop offers context for the river’s food culture.","description":"The city documents ayu fishing reaches here; this stop offers context for the river’s food culture.","tags":[],"practicalInfo":[{"label":"Verification","value":"Sources retrieved 2026-11-22 JST; stakeholder confirmation is pending."}],"caution":["This information is unconfirmed. Check the source information before visiting."]},"zh-TW":{"name":"淺川","lead":"市府記錄香魚漁場範圍的河川，此停靠點用來認識河川飲食文化背景。","description":"市府記錄香魚漁場範圍的河川，此停靠點用來認識河川飲食文化背景。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 22 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}}
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市がアユ釣りの漁場範囲を記す河川。川と食文化の背景を読むための立ち寄り先です。","en":"The city documents ayu fishing reaches here; this stop offers context for the river’s food culture.","zh-TW":"市府記錄香魚漁場範圍的河川，此停靠點用來認識河川飲食文化背景。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.hachioji.tokyo.jp/kurashi/sangyo/004/001/001/p006540.html","en":"https://www.city.hachioji.tokyo.jp/kurashi/sangyo/004/001/001/p006540.html","zh-TW":"https://www.city.hachioji.tokyo.jp/kurashi/sangyo/004/001/001/p006540.html"}
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
      "officialSource": {"name":"Hachioji City — アユ釣りの解禁","url":"https://www.city.hachioji.tokyo.jp/kurashi/sangyo/004/001/001/p006540.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b01-hachioji-asakawa-ayu-asakawa",
          "spotId": "b01-hachioji-asakawa-ayu-asakawa",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"浅川","en":"Asakawa River","zh-TW":"淺川"},
          "description": {"ja":"市がアユ釣りの漁場範囲を記す河川。川と食文化の背景を読むための立ち寄り先です。","en":"The city documents ayu fishing reaches here; this stop offers context for the river’s food culture.","zh-TW":"市府記錄香魚漁場範圍的河川，此停靠點用來認識河川飲食文化背景。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"八王子市","station":""},"en":{"region":"Hachioji","station":""},"zh-TW":{"region":"八王子市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Hachioji City Asakawa riverbank park access", "url": "https://www.city.hachioji.tokyo.jp/shisetsu/109/p023781.html", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-29": {"name":"Hachioji City — アユ釣りの解禁","url":"https://www.city.hachioji.tokyo.jp/kurashi/sangyo/004/001/001/p006540.html","sourceType":"official_web","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b01 editorial itinerary — timing and order estimates, not a timetable","url":"https://www.city.hachioji.tokyo.jp/kurashi/sangyo/004/001/001/p006540.html","sourceType":"manual","retrievedAt":"2026-11-22","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "routeName": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "location": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "story": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "journey.chapters.ja.0": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "journey.chapters.en.0": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "journey.chapters.zh-TW.0": {
      "sourceIds": [
        "source-29"
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
        "source-29"
      ],
      "origin": "editorial"
    },
    "spots": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-asakawa-ayu-asakawa.detail.description": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "spots.b01-hachioji-asakawa-ayu-asakawa.presentation": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "story.groups.nearby.0": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    },
    "variants.half-day.steps.0.description": {
      "sourceIds": [
        "source-29"
      ],
      "origin": "editorial"
    }
  }
};
