import type { JourneyRecord } from '../journey-record';

export const b07MusashimurayamaSayamaTeaRecord: JourneyRecord = {
  "municipalityId": "musashimurayama",
  "alcoholThemed": false,
  "journey": {
    "id": "b07-musashimurayama-sayama-tea",
    "regionId": "musashimurayama",
    "foodCultureId": "musashimurayama-sayama-tea",
    "storyId": "b07-musashimurayama-sayama-tea",
    "routeId": "b07-musashimurayama-sayama-tea-route",
    "copy": {
      "ja": {"title":"武蔵村山、東京狭山茶から菓子へ","subtitle":"武蔵村山、東京狭山茶から菓子へ","description":"茶園の仕事と、パンや菓子へ広がる茶の文化を知る。","tags":["武蔵村山市"],"storyTitle":"武蔵村山、東京狭山茶から菓子へ","intro":["茶園の仕事と、パンや菓子へ広がる茶の文化を知る。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
      "en": {
        "title": "Musashimurayama tea, bread and sweets",
        "subtitle": "Musashimurayama tea, bread and sweets",
        "description": "Explore tea growers and the use of local tea in bread and sweets.",
        "tags": ["Musashimurayama"],
        "storyTitle": "Musashimurayama tea, bread and sweets",
        "intro": ["Explore tea growers and the use of local tea in bread and sweets.","This information is unconfirmed. Check the source information before visiting."]
      },
      "zh-TW": {"title":"武藏村山東京狹山茶與點心","subtitle":"武藏村山東京狹山茶與點心","description":"認識茶農與地方茶在麵包、甜點中的運用。","tags":["武藏村山市"],"storyTitle":"武藏村山東京狹山茶與點心","intro":["認識茶農與地方茶在麵包、甜點中的運用。","刊載內容尚未確認。造訪前請查看出處資訊。"]}
    },
    "chapters": {
      "ja": [
        {"number":"01.","title":"東京狭山茶","body":"東京狭山茶は東京都内で作る狭山茶のこと。市の紹介によると、市内の茶畑では5月上旬頃から新茶の収穫が始まります。"},
        {"number":"02.","title":"村山お茶食パン","body":"市はもりのこむぎの村山お茶食パンを、地域のお茶に着目して生まれたパンとして紹介しています。"},
        {"number":"03.","title":"村山お茶フィナンシェ","body":"もりのこむぎの村山お茶フィナンシェは、武蔵村山産の東京狭山茶を使う菓子で、市は2026年の認証を記録しています。"},
        {"number":"04.","title":"手づくり村山さんクッキー","body":"のぞみ福祉園の手づくり村山さんクッキーは、お茶、小松菜、地域の縄文文化を題材にした3種類として市に紹介されています。"},
        {"number":"05.","title":"村山げんこつシュー","body":"市はラ・ブームの村山げんこつシューを、武蔵村山産狭山茶を混ぜたクリーム入りのシュー菓子として紹介しています。"}
      ],
      "en": [
        {"number":"01.","title":"Tokyo Sayama Tea","body":"Tokyo Sayama tea means Sayama tea produced in Tokyo. The city describes its tea gardens beginning the new-tea harvest around early May."},
        {"number":"02.","title":"Murayama Green Tea Bread","body":"The city describes Morino Komugi’s Murayama tea bread as a loaf developed around the area’s tea."},
        {"number":"03.","title":"Murayama Tea Financier","body":"The city records Morino Komugi’s Murayama tea financier, made with local Tokyo Sayama tea, as certified in 2026."},
        {"number":"04.","title":"Handmade Murayama-san Cookies","body":"The city presents Nozomi Welfare Facility’s Murayama-san cookies in three forms drawing on tea, komatsuna and local Jomon heritage."},
        {"number":"05.","title":"Murayama Genkotsu Cream Puff","body":"The city describes La Boom’s Murayama Genkotsu cream puff as filled with cream incorporating locally produced Sayama tea."}
      ],
      "zh-TW": [
        {"number":"01.","title":"東京狹山茶","body":"東京狹山茶是東京都內生產的狹山茶；市府介紹市內茶園約在五月上旬開始採收新茶。"},
        {"number":"02.","title":"村山茶吐司","body":"市府介紹 Morino Komugi 的村山茶吐司，記錄其以地方茶為發想的開發。"},
        {"number":"03.","title":"村山茶費南雪","body":"市府記錄 Morino Komugi 使用武藏村山東京狹山茶製作的茶費南雪，於 2026 年獲得認證。"},
        {"number":"04.","title":"村山手工餅乾","body":"市府介紹希望福利園的村山手工餅乾，以茶、小松菜與在地繩文文化為三種主題。"},
        {"number":"05.","title":"村山拳頭泡芙","body":"市府介紹 La Boom 的村山拳頭泡芙，內餡加入武藏村山產狹山茶。"}
      ]
    },
    "routeVariants": [{"id":"half-day","durationMinutes":120,"steps":[{"spotId":"b07-musashimurayama-sayama-tea-moriyaen"},{"spotId":"b07-musashimurayama-sayama-tea-morino-komugi"},{"spotId":"b07-musashimurayama-sayama-tea-la-boom"}]}]
  },
  "routeName": {"ja":"武蔵村山、東京狭山茶から菓子へ","en":"Musashimurayama tea, bread and sweets","zh-TW":"武藏村山東京狹山茶與點心"},
  "location": {"ja":{"area":"武蔵村山市","station":"","access":""},"en":{"area":"Musashimurayama","station":"","access":""},"zh-TW":{"area":"武藏村山市","station":"","access":""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "学園", "en": "Gakuen bus stop", "zh-TW": "學園公車站"}, "spotId": "b07-musashimurayama-sayama-tea-morino-komugi", "sourceId": "admission-access"},
      "steps": [
        {
          "spotId": "b07-musashimurayama-sayama-tea-moriyaen",
          "description": {"ja":"市の東京狭山茶の紹介に、中央2丁目の茶の生産者として掲載されています。","en":"The city’s Tokyo Sayama tea guide lists this tea producer in Chuo 2-chome.","zh-TW":"市府東京狹山茶指南列有位於中央二丁目的此製茶者。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-musashimurayama-sayama-tea-morino-komugi",
          "description": {"ja":"市は、お茶食パンと、武蔵村山産の東京狭山茶を使うフィナンシェを紹介しています。","en":"The city lists this maker’s tea bread and financier made with local Tokyo Sayama tea.","zh-TW":"市府列有此店的茶吐司，以及使用武藏村山東京狹山茶的費南雪。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        },
        {
          "spotId": "b07-musashimurayama-sayama-tea-la-boom",
          "description": {"ja":"市の紹介には、地元の狭山茶をクリームに使う村山げんこつシューが掲載されています。","en":"The city lists this maker’s Genkotsu cream puff with local Sayama tea in the filling.","zh-TW":"市府介紹此店的拳頭泡芙，內餡使用地方狹山茶。"},
          "note": {
            "ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。",
            "en": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story.",
            "zh-TW": "時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"
          }
        }
      ],
      "stats": {
        "ja": {"time":"約120分（編集目安）","distance":"","spots":"3 か所","station":"","minutes":"","access":"","caution":"時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。文中の品目すべてを各立ち寄り先で提供するコースではありません。"},
        "en": {
          "time": "About 120 min (editorial estimate)",
          "distance": "",
          "spots": "3 stops",
          "station": "",
          "minutes": "",
          "access": "",
          "caution": "Timing and order are editorial estimates. Check transport and directions yourself. Each stop is connected to the theme, rather than every item described in the story."
        },
        "zh-TW": {"time":"約 120 分鐘（編輯估計）","distance":"","spots":"3 處","station":"","minutes":"","access":"","caution":"時間與順序為編輯估計，請自行確認交通與路線。各據點與主題相關，並非都提供故事中提及的所有品項。"}
      },
      "guidance": {"ja":"掲載内容は未確認です。訪問前に出典情報をご確認ください。","en":"This information is unconfirmed. Check the source information before visiting.","zh-TW":"刊載內容尚未確認。造訪前請查看出處資訊。"}
    }
  },
  "spots": {
    "b07-musashimurayama-sayama-tea-moriyaen": {
      "presentation": {
        "id": "b07-musashimurayama-sayama-tea-moriyaen",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-sayama-tea",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"森谷園製茶","lead":"市の東京狭山茶の紹介に、中央2丁目の茶の生産者として掲載されています。","description":"市の東京狭山茶の紹介に、中央2丁目の茶の生産者として掲載されています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Moriyaen Tea Producer",
            "lead": "The city’s Tokyo Sayama tea guide lists this tea producer in Chuo 2-chome.",
            "description": "The city’s Tokyo Sayama tea guide lists this tea producer in Chuo 2-chome.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"森谷園製茶","lead":"市府東京狹山茶指南列有位於中央二丁目的此製茶者。","description":"市府東京狹山茶指南列有位於中央二丁目的此製茶者。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市の東京狭山茶の紹介に、中央2丁目の茶の生産者として掲載されています。","en":"The city’s Tokyo Sayama tea guide lists this tea producer in Chuo 2-chome.","zh-TW":"市府東京狹山茶指南列有位於中央二丁目的此製茶者。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {
              "ja": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005144.html",
              "en": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005144.html",
              "zh-TW": "https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005144.html"
            }
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
      "officialSource": {"name":"東京狭山茶｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005144.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b07-musashimurayama-sayama-tea-morino-komugi": {
      "presentation": {
        "id": "b07-musashimurayama-sayama-tea-morino-komugi",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-sayama-tea",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {"name":"もりのこむぎ","lead":"市は、お茶食パンと、武蔵村山産の東京狭山茶を使うフィナンシェを紹介しています。","description":"市は、お茶食パンと、武蔵村山産の東京狭山茶を使うフィナンシェを紹介しています。","tags":[],"practicalInfo":[{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution":["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},
          "en": {
            "name": "Morino Komugi",
            "lead": "The city lists this maker’s tea bread and financier made with local Tokyo Sayama tea.",
            "description": "The city lists this maker’s tea bread and financier made with local Tokyo Sayama tea.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"Morino Komugi 麵包店","lead":"市府列有此店的茶吐司，以及使用武藏村山東京狹山茶的費南雪。","description":"市府列有此店的茶吐司，以及使用武藏村山東京狹山茶的費南雪。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市は、お茶食パンと、武蔵村山産の東京狭山茶を使うフィナンシェを紹介しています。","en":"The city lists this maker’s tea bread and financier made with local Tokyo Sayama tea.","zh-TW":"市府列有此店的茶吐司，以及使用武藏村山東京狹山茶的費南雪。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","en":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","zh-TW":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html"}
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
      "officialSource": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    },
    "b07-musashimurayama-sayama-tea-la-boom": {
      "presentation": {
        "id": "b07-musashimurayama-sayama-tea-la-boom",
        "regionId": "musashimurayama",
        "foodCultureId": "musashimurayama-sayama-tea",
        "thumbnailAssetIds": [],
        "copy": {
          "ja": {
            "name": "ケーキ工房 ラ・ブーム",
            "lead": "市の紹介には、地元の狭山茶をクリームに使う村山げんこつシューが掲載されています。",
            "description": "市の紹介には、地元の狭山茶をクリームに使う村山げんこつシューが掲載されています。",
            "tags": [],
            "practicalInfo": [{"label":"確認状態","value":"2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],
            "caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]
          },
          "en": {
            "name": "Cake Kobo La Boom",
            "lead": "The city lists this maker’s Genkotsu cream puff with local Sayama tea in the filling.",
            "description": "The city lists this maker’s Genkotsu cream puff with local Sayama tea in the filling.",
            "tags": [],
            "practicalInfo": [{"label":"Verification","value":"Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],
            "caution": ["This information is unconfirmed. Check the source information before visiting."]
          },
          "zh-TW": {"name":"La Boom 蛋糕工房","lead":"市府介紹此店的拳頭泡芙，內餡使用地方狹山茶。","description":"市府介紹此店的拳頭泡芙，內餡使用地方狹山茶。","tags":[],"practicalInfo":[{"label":"確認狀態","value":"2026 年 11 月 24 日（JST）取得出處，尚待相關人員確認。"}],"caution":["刊載內容尚未確認。造訪前請查看出處資訊。"]}
        }
      },
      "detail": {
        "tags": [],
        "description": {"ja":"市の紹介には、地元の狭山茶をクリームに使う村山げんこつシューが掲載されています。","en":"The city lists this maker’s Genkotsu cream puff with local Sayama tea in the filling.","zh-TW":"市府介紹此店的拳頭泡芙，內餡使用地方狹山茶。"},
        "information": [
          {
            "fieldId": "official_current_url",
            "icon": "information",
            "label": {"ja":"出典情報","en":"Source information","zh-TW":"出處資訊"},
            "value": {"ja":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","en":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","zh-TW":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html"}
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
      "officialSource": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
    }
  },
  "story": {
    "groups": {
      "nearby": [
        {
          "referenceId": "b07-musashimurayama-sayama-tea-moriyaen",
          "spotId": "b07-musashimurayama-sayama-tea-moriyaen",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"森谷園製茶","en":"Moriyaen Tea Producer","zh-TW":"森谷園製茶"},
          "description": {"ja":"市の東京狭山茶の紹介に、中央2丁目の茶の生産者として掲載されています。","en":"The city’s Tokyo Sayama tea guide lists this tea producer in Chuo 2-chome.","zh-TW":"市府東京狹山茶指南列有位於中央二丁目的此製茶者。"}
        },
        {
          "referenceId": "b07-musashimurayama-sayama-tea-morino-komugi",
          "spotId": "b07-musashimurayama-sayama-tea-morino-komugi",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"もりのこむぎ","en":"Morino Komugi","zh-TW":"Morino Komugi 麵包店"},
          "description": {"ja":"市は、お茶食パンと、武蔵村山産の東京狭山茶を使うフィナンシェを紹介しています。","en":"The city lists this maker’s tea bread and financier made with local Tokyo Sayama tea.","zh-TW":"市府列有此店的茶吐司，以及使用武藏村山東京狹山茶的費南雪。"}
        },
        {
          "referenceId": "b07-musashimurayama-sayama-tea-la-boom",
          "spotId": "b07-musashimurayama-sayama-tea-la-boom",
          "badgeColor": "#E98A1C",
          "badge": {"ja":"ケーキ工房 ラ・ブーム","en":"Cake Kobo La Boom","zh-TW":"La Boom 蛋糕工房"},
          "description": {"ja":"市の紹介には、地元の狭山茶をクリームに使う村山げんこつシューが掲載されています。","en":"The city lists this maker’s Genkotsu cream puff with local Sayama tea in the filling.","zh-TW":"市府介紹此店的拳頭泡芙，內餡使用地方狹山茶。"}
        }
      ],
      "nature": []
    },
    "location": {"ja":{"region":"武蔵村山市","station":""},"en":{"region":"Musashimurayama","station":""},"zh-TW":{"region":"武藏村山市","station":""}}
  },
  "sources": {
    "admission-access": {"name": "Higashiyamato Tourism Bureau – Mori no Komugi", "url": "https://go-to-higashiyamato.tokyo/introduce/%E3%82%82%E3%82%8A%E3%81%AE%E3%81%93%E3%82%80%E3%81%8E/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-10": {"name":"地域ブランド認証商品｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "source-14": {"name":"東京狭山茶｜武蔵村山市　公式ホームページ","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1022409/1005144.html","sourceType":"official_web","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"},
    "editorial": {"name":"b07 editorial itinerary — estimated timing and order, not a timetable","url":"https://www.city.musashimurayama.lg.jp/kankou/tokusanbutsu/1001609.html","sourceType":"manual","retrievedAt":"2026-11-24","verificationStatus":"needs_confirmation"}
  },
  "facts": {
    "journey.copy": {"sourceIds":["source-10","source-14"],"origin":"editorial"},
    "routeName": {"sourceIds":["source-10","source-14"],"origin":"editorial"},
    "location": {"sourceIds":["source-10","source-14"],"origin":"editorial"},
    "story": {"sourceIds":["source-10","source-14"],"origin":"editorial"},
    "journey.routeVariants": {"sourceIds":["editorial","source-10","source-14"],"origin":"editorial"},
    "variants": {"sourceIds":["editorial","source-10","source-14"],"origin":"editorial"},
    "journey.chapters.ja.0": {"sourceIds":["source-14"],"origin":"editorial"},
    "journey.chapters.en.0": {"sourceIds":["source-14"],"origin":"editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds":["source-14"],"origin":"editorial"},
    "journey.chapters.ja.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.ja.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.2": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.ja.3": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.3": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.3": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.ja.4": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.en.4": {"sourceIds":["source-10"],"origin":"editorial"},
    "journey.chapters.zh-TW.4": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b07-musashimurayama-sayama-tea-moriyaen": {"sourceIds":["source-14"],"origin":"editorial"},
    "variants.half-day.steps.0.description": {"sourceIds":["source-14"],"origin":"editorial"},
    "story.groups.nearby.0": {"sourceIds":["source-14"],"origin":"editorial"},
    "spots.b07-musashimurayama-sayama-tea-morino-komugi": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.1.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.1": {"sourceIds":["source-10"],"origin":"editorial"},
    "spots.b07-musashimurayama-sayama-tea-la-boom": {"sourceIds":["source-10"],"origin":"editorial"},
    "variants.half-day.steps.2.description": {"sourceIds":["source-10"],"origin":"editorial"},
    "story.groups.nearby.2": {"sourceIds":["source-10"],"origin":"editorial"}
  }
};
