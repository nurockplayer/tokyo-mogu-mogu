import type { JourneyRecord } from '../journey-record';

export const b07KiyoseBlueberryRecord: JourneyRecord = {
  "municipalityId": "kiyose",
  "journey": {
    "id": "b07-kiyose-blueberry",
    "regionId": "kiyose",
    "foodCultureId": "kiyose-blueberry",
    "storyId": "b07-kiyose-blueberry",
    "routeId": "b07-kiyose-blueberry-route",
    "copy": {
      "ja": {"title":"清瀬のブルーベリーと農園","subtitle":"清瀬のブルーベリーと農園","description":"坂間園芸の紹介から、ブルーベリーと直売の関係をたどる。","tags":["清瀬市"],"storyTitle":"清瀬のブルーベリーと農園","intro":["坂間園芸の紹介から、ブルーベリーと直売の関係をたどる。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Kiyose blueberries and their grower",
        "subtitle": "Kiyose blueberries and their grower",
        "description": "Follow the connection between blueberry growing and direct sales at Sakama Engei.",
        "tags": ["Kiyose"],
        "storyTitle": "Kiyose blueberries and their grower",
        "intro": ["Follow the connection between blueberry growing and direct sales at Sakama Engei.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"清瀨藍莓與農園","subtitle":"清瀨藍莓與農園","description":"從坂間園藝認識藍莓栽培與農園直賣的關係。","tags":["清瀨市"],"storyTitle":"清瀨藍莓與農園","intro":["從坂間園藝認識藍莓栽培與農園直賣的關係。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [{"number":"01.","title":"清瀬のブルーベリー","body":"坂間園芸は、観光協会の農園案内に掲載されている清瀬のブルーベリー農園です。摘み取りと量り売りの取り組みも紹介されています。"}],
      "en": [{"number":"01.","title":"Kiyose Blueberries","body":"Sakama Engei appears in the tourism association’s directory as a Kiyose blueberry grower, with picking and sales by weight described."}],
      "zh-TW": [{"number":"01.","title":"清瀨藍莓","body":"坂間園藝是觀光協會名錄中的清瀨藍莓農園，介紹中也提到採果與秤重販售。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":120,"steps":[{"spotId":"b07-kiyose-blueberry-sakama"}]}]
  },
  "routeName": {"ja":"清瀬のブルーベリーと農園","en":"Kiyose blueberries and their grower","zh-TW":"清瀨藍莓與農園"},
  "location": {"ja":{"area":"清瀬市","station":"","access":""},"en":{"area":"Kiyose","station":"","access":""},"zh-TW":{"area":"清瀨市","station":"","access":""}},
  "variants": {
    "half-day": {
      "steps": [
        {
          "spotId": "b07-kiyose-blueberry-sakama",
          "description": {"ja":"観光協会の名簿に、ブルーベリーの栽培と摘み取りを行う農園として掲載されています。","en":"The association’s directory identifies this blueberry grower and describes fruit picking.","zh-TW":"觀光協會名錄將此處介紹為栽培藍莓並提供採果的農園。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約120分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"120","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。"},
        "en": {
          "time": "About 120 min (editorial estimate)",
          "distance": "",
          "spots": "1 stops",
          "station": "",
          "minutes": "120",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story."
        },
        "zh-TW": {"time":"約 120 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"120","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b07-kiyose-blueberry-sakama": {
      "presentation": {
        "id": "b07-kiyose-blueberry-sakama",
        "regionId": "kiyose",
        "foodCultureId": "kiyose-blueberry",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"坂間園芸","lead":"観光協会の名簿に、ブルーベリーの栽培と摘み取りを行う農園として掲載されています。","description":"観光協会の名簿に、ブルーベリーの栽培と摘み取りを行う農園として掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Sakama Engei",
            "lead": "The association’s directory identifies this blueberry grower and describes fruit picking.",
            "description": "The association’s directory identifies this blueberry grower and describes fruit picking.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"坂間園藝","lead":"觀光協會名錄將此處介紹為栽培藍莓並提供採果的農園。","description":"觀光協會名錄將此處介紹為栽培藍莓並提供採果的農園。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"観光協会の名簿に、ブルーベリーの栽培と摘み取りを行う農園として掲載されています。","en":"The association’s directory identifies this blueberry grower and describes fruit picking.","zh-TW":"觀光協會名錄將此處介紹為栽培藍莓並提供採果的農園。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.kiyosekanko.tokyo/useful/agri","en":"https://www.kiyosekanko.tokyo/useful/agri","zh-TW":"https://www.kiyosekanko.tokyo/useful/agri"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": [{"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}]
      },
      "officialSource": {"name":"農作物直売所 マップ＆検索｜清瀬市観光協会公式サイト｜その先の、感動へ。","url":"https://www.kiyosekanko.tokyo/useful/agri","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b07-kiyose-blueberry-sakama",
          "spotId": "b07-kiyose-blueberry-sakama",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"坂間園芸","en":"Sakama Engei","zh-TW":"坂間園藝"},
          "description": {"ja":"観光協会の名簿に、ブルーベリーの栽培と摘み取りを行う農園として掲載されています。","en":"The association’s directory identifies this blueberry grower and describes fruit picking.","zh-TW":"觀光協會名錄將此處介紹為栽培藍莓並提供採果的農園。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"清瀬市","station":""},"en":{"region":"Kiyose","station":""},"zh-TW":{"region":"清瀨市","station":""}}
  },
  "sources": {
    "source-22": {"name":"農作物直売所 マップ＆検索｜清瀬市観光協会公式サイト｜その先の、感動へ。","url":"https://www.kiyosekanko.tokyo/useful/agri","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b07 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.kiyosekanko.tokyo/useful/agri","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-22"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-22"],"origin":"editorial"},
    "location": {"sourceIds":["source-22"],"origin":"editorial"},
    "story": {"sourceIds":["source-22"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-22"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-22"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-22"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-22"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-22"],"origin":"editorial"},
    "spots.b07-kiyose-blueberry-sakama": {"sourceIds":["source-22"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-22"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-22"],"origin":"editorial"}
  }
};
