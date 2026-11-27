import type { JourneyRecord } from '../journey-record';

export const b03MachidaEggPuddingRecord: JourneyRecord = {
  "municipalityId": "machida",
  "journey": {
    "id": "b03-machida-egg-pudding",
    "regionId": "machida",
    "foodCultureId": "machida-egg-pudding",
    "storyId": "b03-machida-egg-pudding",
    "routeId": "b03-machida-egg-pudding-route",
    "copy": {"ja": {"title": "町田の卵と手作りプリン","subtitle": "町田の卵と手作りプリン","description": "出典を手がかりに、町田の卵と手作りプリンを知る旅です。","tags": ["町田市"],"storyTitle": "町田の卵と手作りプリン","intro": ["出典を手がかりに、町田の卵と手作りプリンを知る旅です。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en": {"title": "Machida eggs and handmade pudding","subtitle": "Machida eggs and handmade pudding","description": "Explore Machida eggs and handmade pudding through the linked sources.","tags": ["Machida"],"storyTitle": "Machida eggs and handmade pudding","intro": ["Explore Machida eggs and handmade pudding through the linked sources.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW": {"title": "町田雞蛋與手工布丁","subtitle": "町田雞蛋與手工布丁","description": "以出處為線索，認識町田雞蛋與手工布丁。","tags": ["町田市"],"storyTitle": "町田雞蛋與手工布丁","intro": ["以出處為線索，認識町田雞蛋與手工布丁。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.","title": "かとうさんのぷりん","body": "名産品の公式案内は、カトウファームのカスタードとジャージーのプリンを、卵を使う手作りの菓子として紹介しています。"}],"en": [{"number": "01.","title": "Kato Farm Pudding","body": "The official specialty catalogue describes Kato Farm’s custard and Jersey puddings as handmade egg-based confections."}],"zh-TW": [{"number": "01.","title": "加藤先生的布丁","body": "官方特產目錄介紹加藤農場的卡士達與澤西布丁是使用雞蛋手工製作的甜點。"}]},
    "routeVariants": [{"id": "half-day","durationMinutes": 90,"steps": [{"spotId": "b03-machida-egg-pudding-kato"}]}],
  },
  "routeName": {"ja": "町田の卵と手作りプリン","en": "Machida eggs and handmade pudding","zh-TW": "町田雞蛋與手工布丁"},
  "location": {"ja": {"area": "町田市","station": "","access": ""},"en": {"area": "Machida","station": "","access": ""},"zh-TW": {"area": "町田市","station": "","access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "bus-stop", "name": {"ja": "水の口", "en": "Mizu-no-Kuchi bus stop", "zh-TW": "水之口公車站"}, "spotId": "b03-machida-egg-pudding-kato", "sourceId": "admission-access"},
      "steps": [{"spotId": "b03-machida-egg-pudding-kato","description": {"ja": "名産品の公式案内が手作りプリンの生産者と店舗を紹介しています。","en": "The official specialty catalogue identifies the handmade-pudding producer and shop.","zh-TW": "官方特產目錄介紹手工布丁生產者及店家。"},"note": {"ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。紹介した品をすべて提供するコースではありません。","en": "Timing and order are editorial estimates. Check transport and directions yourself. This itinerary does not promise every food described.","zh-TW": "時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會提供文中每種食品。"}}],"stats": {"ja": {"time": "約90分（編集目安）","distance": "","spots": "1 か所","station": "","minutes": "90","access": "","caution": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。紹介した品をすべて提供するコースではありません。"},"en": {"time": "About 90 min (editorial estimate)","distance": "","spots": "1 stops","station": "","minutes": "90","access": "","caution": "Timing and order are editorial estimates. Check transport and directions yourself. This itinerary does not promise every food described."},"zh-TW": {"time": "約90分鐘（編輯估計）","distance": "","spots": "1 處","station": "","minutes": "90","access": "","caution": "時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會提供文中每種食品。"}},"guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。","en": "This information is unconfirmed. Check the source information before visiting.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}},
  },
  "spots": {
    "b03-machida-egg-pudding-kato": {"presentation": {"id": "b03-machida-egg-pudding-kato","regionId": "machida","foodCultureId": "machida-egg-pudding","thumbnailAssetIds": [],"copy": {"ja": {"name": "カトウファーム","lead": "名産品の公式案内が手作りプリンの生産者と店舗を紹介しています。","description": "名産品の公式案内が手作りプリンの生産者と店舗を紹介しています。","tags": [],"practicalInfo": [{"label": "確認状態","value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en": {"name": "Kato Farm","lead": "The official specialty catalogue identifies the handmade-pudding producer and shop.","description": "The official specialty catalogue identifies the handmade-pudding producer and shop.","tags": [],"practicalInfo": [{"label": "Verification","value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],"caution": ["This information is unconfirmed. Check the source information before visiting."]},"zh-TW": {"name": "加藤農場","lead": "官方特產目錄介紹手工布丁生產者及店家。","description": "官方特產目錄介紹手工布丁生產者及店家。","tags": [],"practicalInfo": [{"label": "確認狀態","value": "2026年11月24日（JST）取得出處，尚待相關人員確認。"}],"caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}},"detail": {"tags": [],"description": {"ja": "名産品の公式案内が手作りプリンの生産者と店舗を紹介しています。","en": "The official specialty catalogue identifies the handmade-pudding producer and shop.","zh-TW": "官方特產目錄介紹手工布丁生產者及店家。"},"information": [{"fieldId": "official_current_url","icon": "information","label": {"ja": "出典情報","en": "Source information","zh-TW": "出處資訊"},"value": {"ja": "https://machida-meisanhin.jp/detail/kato","en": "https://machida-meisanhin.jp/detail/kato","zh-TW": "https://machida-meisanhin.jp/detail/kato"}},{"fieldId": "verification_note","icon": "information","label": {"ja": "確認状態","en": "Verification","zh-TW": "確認狀態"},"value": {"ja": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW": "2026年11月24日（JST）取得出處，尚待相關人員確認。"}}],"caution": [{"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。","en": "This information is unconfirmed. Check the source information before visiting.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}]},"officialSource": {"name": "カトウファーム | 町田市名産品（2025〜2028）-町田の優れた逸品-","url": "https://machida-meisanhin.jp/detail/kato","sourceType": "official_web","retrievedAt": "2026-11-24","verificationStatus": "needs_confirmation"}},
  },
  "story": {
    "groups": {"nearby": [{"referenceId": "b03-machida-egg-pudding-kato","spotId": "b03-machida-egg-pudding-kato","badgeColor": "#E98A1C","badge": {"ja": "カトウファーム","en": "Kato Farm","zh-TW": "加藤農場"},"description": {"ja": "名産品の公式案内が手作りプリンの生産者と店舗を紹介しています。","en": "The official specialty catalogue identifies the handmade-pudding producer and shop.","zh-TW": "官方特產目錄介紹手工布丁生產者及店家。"}}],"nature": []},
    "location": {"ja": {"region": "町田市","station": ""},"en": {"region": "Machida","station": ""},"zh-TW": {"region": "町田市","station": ""}},
  },
  "sources": {
    "admission-access": {"name": "Tokyo Grown – Kato Farm market", "url": "https://tokyogrown.jp/node/571886", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-42": {"name": "カトウファーム | 町田市名産品（2025〜2028）-町田の優れた逸品-","url": "https://machida-meisanhin.jp/detail/kato","sourceType": "official_web","retrievedAt": "2026-11-24","verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b03 editorial itinerary — timing and order estimates, not a timetable","url": "https://machida-meisanhin.jp/detail/kato","sourceType": "manual","retrievedAt": "2026-11-24","verificationStatus": "needs_confirmation"},
  },
  "facts": {
    "journey.copy": {"sourceIds": ["source-42"],"origin": "editorial"},
    "routeName": {"sourceIds": ["source-42"],"origin": "editorial"},
    "location": {"sourceIds": ["source-42"],"origin": "editorial"},
    "story.location": {"sourceIds": ["source-42"],"origin": "editorial"},
    "journey.chapters.ja.0": {"sourceIds": ["source-42"],"origin": "editorial"},
    "journey.chapters.en.0": {"sourceIds": ["source-42"],"origin": "editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds": ["source-42"],"origin": "editorial"},
    "journey.routeVariants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "variants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "spots.b03-machida-egg-pudding-kato": {"sourceIds": ["source-42"],"origin": "editorial"},
    "variants.half-day.steps.0.description": {"sourceIds": ["source-42"],"origin": "editorial"},
    "story.groups.nearby.0": {"sourceIds": ["source-42"],"origin": "editorial"},
  },
};
