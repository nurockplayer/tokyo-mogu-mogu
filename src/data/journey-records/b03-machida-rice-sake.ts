import type { JourneyRecord } from '../journey-record';

export const b03MachidaRiceSakeRecord: JourneyRecord = {
  "municipalityId": "machida",
  "alcoholThemed": true,
  "journey": {
    "id": "b03-machida-rice-sake",
    "regionId": "machida",
    "foodCultureId": "machida-rice-sake",
    "storyId": "b03-machida-rice-sake",
    "routeId": "b03-machida-rice-sake-route",
    "copy": {"ja": {"title": "町田の米から尾根桜へ","subtitle": "町田の米から尾根桜へ","description": "出典を手がかりに、町田の米から尾根桜へを知る旅です。","tags": ["町田市"],"storyTitle": "町田の米から尾根桜へ","intro": ["出典を手がかりに、町田の米から尾根桜へを知る旅です。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en": {"title": "Machida rice and Onezakura sake","subtitle": "Machida rice and Onezakura sake","description": "Explore Machida rice and Onezakura sake through the linked sources.","tags": ["Machida"],"storyTitle": "Machida rice and Onezakura sake","intro": ["Explore Machida rice and Onezakura sake through the linked sources.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW": {"title": "從町田稻米到尾根櫻清酒","subtitle": "從町田稻米到尾根櫻清酒","description": "以出處為線索，認識從町田稻米到尾根櫻清酒。","tags": ["町田市"],"storyTitle": "從町田稻米到尾根櫻清酒","intro": ["以出處為線索，認識從町田稻米到尾根櫻清酒。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.","title": "純米酒 尾根桜","body": "同じ案内は、町田産の米で作る純米酒「尾根桜」も紹介しています。"}],"en": [{"number": "01.","title": "Onezakura Junmai Sake","body": "The same listing describes Onezakura junmai sake as made from Machida-grown rice."}],"zh-TW": [{"number": "01.","title": "純米酒尾根櫻","body": "同一介紹也記載純米酒尾根櫻使用町田產稻米製作。"}]},
    "routeVariants": [{"id": "half-day","durationMinutes": 90,"steps": [{"spotId": "b03-machida-rice-sake-liquor"}]}],
  },
  "routeName": {"ja": "町田の米から尾根桜へ","en": "Machida rice and Onezakura sake","zh-TW": "從町田稻米到尾根櫻清酒"},
  "location": {"ja": {"area": "町田市","station": "","access": ""},"en": {"area": "Machida","station": "","access": ""},"zh-TW": {"area": "町田市","station": "","access": ""}},
  "variants": {
    "half-day": {"arrival": {"kind": "bus-stop", "name": {"ja": "町田郵便局前バス停", "en": "Machida Yūbinkyoku-mae bus stop", "zh-TW": "町田郵局前公車站"}, "spotId": "b03-machida-rice-sake-liquor", "sourceId": "admission-access"}, "steps": [{"spotId": "b03-machida-rice-sake-liquor","description": {"ja": "観光協会の紹介が禅寺丸柿ワインと尾根桜との関わりを伝えています。","en": "The tourism listing connects this cooperative with Zenjimaru wine and Onezakura sake.","zh-TW": "觀光介紹記載此組合與禪寺丸柿酒及尾根櫻清酒的關係。"},"note": {"ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。紹介した品をすべて提供するコースではありません。","en": "Timing and order are editorial estimates. Check transport and directions yourself. This itinerary does not promise every food described.","zh-TW": "時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會提供文中每種食品。"}}],"stats": {"ja": {"time": "約90分（編集目安）","distance": "","spots": "1 か所","station": "","minutes": "90","access": "","caution": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。紹介した品をすべて提供するコースではありません。"},"en": {"time": "About 90 min (editorial estimate)","distance": "","spots": "1 stops","station": "","minutes": "90","access": "","caution": "Timing and order are editorial estimates. Check transport and directions yourself. This itinerary does not promise every food described."},"zh-TW": {"time": "約90分鐘（編輯估計）","distance": "","spots": "1 處","station": "","minutes": "90","access": "","caution": "時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會提供文中每種食品。"}},"guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。","en": "This information is unconfirmed. Check the source information before visiting.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}},
  },
  "spots": {
    "b03-machida-rice-sake-liquor": {"presentation": {"id": "b03-machida-rice-sake-liquor","regionId": "machida","foodCultureId": "machida-rice-sake","thumbnailAssetIds": [],"copy": {"ja": {"name": "町田酒販協同組合","lead": "観光協会の紹介が禅寺丸柿ワインと尾根桜との関わりを伝えています。","description": "観光協会の紹介が禅寺丸柿ワインと尾根桜との関わりを伝えています。","tags": [],"practicalInfo": [{"label": "確認状態","value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en": {"name": "Machida Liquor Retailers Cooperative","lead": "The tourism listing connects this cooperative with Zenjimaru wine and Onezakura sake.","description": "The tourism listing connects this cooperative with Zenjimaru wine and Onezakura sake.","tags": [],"practicalInfo": [{"label": "Verification","value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],"caution": ["This information is unconfirmed. Check the source information before visiting."]},"zh-TW": {"name": "町田酒販協同組合","lead": "觀光介紹記載此組合與禪寺丸柿酒及尾根櫻清酒的關係。","description": "觀光介紹記載此組合與禪寺丸柿酒及尾根櫻清酒的關係。","tags": [],"practicalInfo": [{"label": "確認狀態","value": "2026年11月24日（JST）取得出處，尚待相關人員確認。"}],"caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}},"detail": {"tags": [],"description": {"ja": "観光協会の紹介が禅寺丸柿ワインと尾根桜との関わりを伝えています。","en": "The tourism listing connects this cooperative with Zenjimaru wine and Onezakura sake.","zh-TW": "觀光介紹記載此組合與禪寺丸柿酒及尾根櫻清酒的關係。"},"information": [{"fieldId": "official_current_url","icon": "information","label": {"ja": "出典情報","en": "Source information","zh-TW": "出處資訊"},"value": {"ja": "https://machida-guide.or.jp/post-1142/","en": "https://machida-guide.or.jp/post-1142/","zh-TW": "https://machida-guide.or.jp/post-1142/"}},{"fieldId": "verification_note","icon": "information","label": {"ja": "確認状態","en": "Verification","zh-TW": "確認狀態"},"value": {"ja": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW": "2026年11月24日（JST）取得出處，尚待相關人員確認。"}}],"caution": [{"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。","en": "This information is unconfirmed. Check the source information before visiting.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}]},"officialSource": {"name": "町田酒販協同組合 – 町田市観光ガイド","url": "https://machida-guide.or.jp/post-1142/","sourceType": "official_web","retrievedAt": "2026-11-24","verificationStatus": "needs_confirmation"}},
  },
  "story": {
    "groups": {"nearby": [{"referenceId": "b03-machida-rice-sake-liquor","spotId": "b03-machida-rice-sake-liquor","badgeColor": "#E98A1C","badge": {"ja": "町田酒販協同組合","en": "Machida Liquor Retailers Cooperative","zh-TW": "町田酒販協同組合"},"description": {"ja": "観光協会の紹介が禅寺丸柿ワインと尾根桜との関わりを伝えています。","en": "The tourism listing connects this cooperative with Zenjimaru wine and Onezakura sake.","zh-TW": "觀光介紹記載此組合與禪寺丸柿酒及尾根櫻清酒的關係。"}}],"nature": []},
    "location": {"ja": {"region": "町田市","station": ""},"en": {"region": "Machida","station": ""},"zh-TW": {"region": "町田市","station": ""}},
  },
  "sources": {
    "admission-access": {"name": "Machida tourism association – liquor cooperative", "url": "https://machida-guide.or.jp/post-1142/", "sourceType": "official_web", "retrievedAt": "2026-11-27", "verificationStatus": "needs_confirmation"},
    "source-28": {"name": "町田酒販協同組合 – 町田市観光ガイド","url": "https://machida-guide.or.jp/post-1142/","sourceType": "official_web","retrievedAt": "2026-11-24","verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b03 editorial itinerary — timing and order estimates, not a timetable","url": "https://machida-guide.or.jp/post-1142/","sourceType": "manual","retrievedAt": "2026-11-24","verificationStatus": "needs_confirmation"},
  },
  "facts": {
    "journey.copy": {"sourceIds": ["source-28"],"origin": "editorial"},
    "routeName": {"sourceIds": ["source-28"],"origin": "editorial"},
    "location": {"sourceIds": ["source-28"],"origin": "editorial"},
    "story.location": {"sourceIds": ["source-28"],"origin": "editorial"},
    "journey.chapters.ja.0": {"sourceIds": ["source-28"],"origin": "editorial"},
    "journey.chapters.en.0": {"sourceIds": ["source-28"],"origin": "editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds": ["source-28"],"origin": "editorial"},
    "journey.routeVariants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "variants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "spots.b03-machida-rice-sake-liquor": {"sourceIds": ["source-28"],"origin": "editorial"},
    "variants.half-day.steps.0.description": {"sourceIds": ["source-28"],"origin": "editorial"},
    "story.groups.nearby.0": {"sourceIds": ["source-28"],"origin": "editorial"},
  },
};
