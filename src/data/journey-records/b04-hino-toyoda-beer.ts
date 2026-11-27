import type { JourneyRecord } from '../journey-record';

export const b04HinoToyodaBeerRecord: JourneyRecord = {
  "municipalityId": "hino",
  "alcoholThemed": true,
  "journey": {
    "id": "b04-hino-toyoda-beer",
    "regionId": "hino",
    "foodCultureId": "hino-toyoda-beer",
    "storyId": "b04-hino-toyoda-beer",
    "routeId": "b04-hino-toyoda-beer-route",
    "copy": {
      "ja": {"title":"日野・豊田ビールと大麦の物語","subtitle":"日野・豊田ビールと大麦の物語","description":"かつての醸造と、地域がつなぐ復刻の取り組み。","tags":["日野市"],"storyTitle":"日野・豊田ビールと大麦の物語","intro":["かつての醸造と、地域がつなぐ復刻の取り組み。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Hino’s Toyoda Beer and barley",
        "subtitle": "Hino’s Toyoda Beer and barley",
        "description": "Explore historical brewing and a community revival project.",
        "tags": ["Hino"],
        "storyTitle": "Hino’s Toyoda Beer and barley",
        "intro": ["Explore historical brewing and a community revival project.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"日野豐田啤酒與大麥的故事","subtitle":"日野豐田啤酒與大麥的故事","description":"認識昔日釀造與地方共同推動的復刻計畫。","tags":["日野市"],"storyTitle":"日野豐田啤酒與大麥的故事","intro":["認識昔日釀造與地方共同推動的復刻計畫。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"TOYODA BEER（豊田ビール）","body":"市は豊田で1886年から少なくとも1894年までビールが造られたと記録。復刻の取り組みには、醸造家同士の縁がある福生の石川酒造が協力しています。"},
        {"number":"02.","title":"日野産大麦100％ビール","body":"実行委員会は2014年に日野産大麦の栽培を始め、2018年から2022年にそれを100％使うプレミアムビールを製造したと説明。終了後も地元農家や団体による大麦ビールづくりが続くと記しています。"}
      ],
      "en": [
        {"number":"01.","title":"Toyoda Beer","body":"The city records brewing in Toyoda from 1886 until at least 1894. The revival project describes cooperation with Fussa’s Ishikawa Shuzo and historical ties between the brewing families."},
        {
          "number": "02.",
          "title": "Beer made entirely with Hino-grown barley",
          "body": "The project describes local barley growing from 2014 and Premium Toyoda Beer made with entirely Hino-grown barley from 2018 to 2022. It reports continued local barley-beer production by growers and community groups afterward."
        }
      ],
      "zh-TW": [{"number":"01.","title":"TOYODA BEER（豐田啤酒）","body":"市府記錄豐田自 1886 年至至少 1894 年釀造啤酒；復刻計畫介紹福生石川酒造的協助，以及釀造家族之間的歷史關係。"},{"number":"02.","title":"日野大麥百分之百啤酒","body":"計畫資料介紹 2014 年開始種植日野大麥，2018 至 2022 年製作全數使用日野大麥的 Premium Toyoda Beer，並記錄其後農家與地方團體延續大麥啤酒製作。"}]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":90,"steps":[{"spotId":"b04-hino-toyoda-beer-minami"}]}]
  },
  "routeName": {"ja":"日野・豊田ビールと大麦の物語","en":"Hino’s Toyoda Beer and barley","zh-TW":"日野豐田啤酒與大麥的故事"},
  "location": {"ja":{"area":"日野市","station":"","access":""},"en":{"area":"Hino","station":"","access":""},"zh-TW":{"area":"日野市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "万願寺駅", "en": "Manganji Station", "zh-TW": "萬願寺站"}, "spotId": "b04-hino-toyoda-beer-minami", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b04-hino-toyoda-beer-minami",
          "description": {"ja":"ビールの実行委員会の取扱店一覧に掲載される直売所です。","en":"This farm market appears in the beer project’s retailer directory.","zh-TW":"啤酒計畫的販售據點名單列有此農產直賣所。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約90分（編集目安）","distance":"","spots":"1 か所","station":"","minutes":"90","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。掲載内容はすべてを提供するコースや現在の商品案内を意味しません。"},
        "en": {
          "time": "About 90 min (editorial estimate)",
          "distance": "",
          "spots": "1 stops",
          "station": "",
          "minutes": "90",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. The itinerary does not imply a menu serving every item or a current product listing."
        },
        "zh-TW": {"time":"約 90 分鐘（編輯估計）","distance":"","spots":"1 處","station":"","minutes":"90","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。行程不代表供應文中所有品項或現行商品目錄。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b04-hino-toyoda-beer-minami": {
      "presentation": {
        "id": "b04-hino-toyoda-beer-minami",
        "regionId": "hino",
        "foodCultureId": "hino-toyoda-beer",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"東京みなみの恵み","lead":"ビールの実行委員会の取扱店一覧に掲載される直売所です。","description":"ビールの実行委員会の取扱店一覧に掲載される直売所です。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Tokyo Minami no Megumi",
            "lead": "This farm market appears in the beer project’s retailer directory.",
            "description": "This farm market appears in the beer project’s retailer directory.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"東京 Minami no Megumi","lead":"啤酒計畫的販售據點名單列有此農產直賣所。","description":"啤酒計畫的販售據點名單列有此農產直賣所。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"ビールの実行委員会の取扱店一覧に掲載される直売所です。","en":"This farm market appears in the beer project’s retailer directory.","zh-TW":"啤酒計畫的販售據點名單列有此農產直賣所。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.hino.lg.jp/sangyo/nogyo/nousanbutsu/1003561.html","en":"https://www.city.hino.lg.jp/sangyo/nogyo/nousanbutsu/1003561.html","zh-TW":"https://www.city.hino.lg.jp/sangyo/nogyo/nousanbutsu/1003561.html"}
          },
          {
            "fieldId": "verification_note",
            "icon": "information",
            "label": {"ja":"確認状態","en":"Verification","zh-TW":"確認狀態"},
            "value": {"ja":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}
          }
        ],
        "caution": []
      },
      "officialSource": {"name":"JA直売所・即売事業｜日野市公式ホームページ","url":"https://www.city.hino.lg.jp/sangyo/nogyo/nousanbutsu/1003561.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b04-hino-toyoda-beer-minami",
          "spotId": "b04-hino-toyoda-beer-minami",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"東京みなみの恵み","en":"Tokyo Minami no Megumi","zh-TW":"東京 Minami no Megumi"},
          "description": {"ja":"ビールの実行委員会の取扱店一覧に掲載される直売所です。","en":"This farm market appears in the beer project’s retailer directory.","zh-TW":"啤酒計畫的販售據點名單列有此農產直賣所。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"日野市","station":""},"en":{"region":"Hino","station":""},"zh-TW":{"region":"日野市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Tokyo Agriculture, Forestry and Fisheries Foundation – Minamitama guide", "url": "https://www.tokyo-aff.or.jp/uploaded/attachment/4110.pdf", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-28": {"name":"JA直売所・即売事業｜日野市公式ホームページ","url":"https://www.city.hino.lg.jp/sangyo/nogyo/nousanbutsu/1003561.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-30": {"name":"TOYODA BEER プロジェクト｜日野市公式ホームページ","url":"https://www.city.hino.lg.jp/bunka/bunka/beer/index.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-31": {"name":"復刻への取り組み - TOYODA BEER","url":"https://toyoda-beer.tokyo/approach.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-43": {"name":"取扱店一覧 - TOYODA BEER","url":"https://toyoda-beer.tokyo/shop02.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b04 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.city.hino.lg.jp/sangyo/nogyo/nousanbutsu/1003561.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-28","source-30","source-31","source-43"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-28","source-30","source-31","source-43"],"origin":"editorial"},
    "location": {"sourceIds":["source-28","source-30","source-31","source-43"],"origin":"editorial"},
    "story": {"sourceIds":["source-28","source-30","source-31","source-43"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-28","source-30","source-31","source-43"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-28","source-30","source-31","source-43"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-30","source-31"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-30","source-31"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-30","source-31"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-31"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-31"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-31"],"origin":"editorial"},
    "spots.b04-hino-toyoda-beer-minami": {"sourceIds":["source-28","source-43"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-28","source-43"],"origin":"editorial"}
  }
};
