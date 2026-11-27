import type { JourneyRecord } from '../journey-record';

export const b03MachidaCraftBeerRecord: JourneyRecord = {
  "municipalityId": "machida",
  "alcoholThemed": true,
  "journey": {
    "id": "b03-machida-craft-beer",
    "regionId": "machida",
    "foodCultureId": "machida-craft-beer",
    "storyId": "b03-machida-craft-beer",
    "routeId": "b03-machida-craft-beer-route",
    "copy": {"ja": {"title": "町田の畑とクラフトビール","subtitle": "町田の畑とクラフトビール","description": "出典を手がかりに、町田の畑とクラフトビールを知る旅です。","tags": ["町田市"],"storyTitle": "町田の畑とクラフトビール","intro": ["出典を手がかりに、町田の畑とクラフトビールを知る旅です。","掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en": {"title": "Machida fields and craft beer","subtitle": "Machida fields and craft beer","description": "Explore Machida fields and craft beer through the linked sources.","tags": ["Machida"],"storyTitle": "Machida fields and craft beer","intro": ["Explore Machida fields and craft beer through the linked sources.","This information is unconfirmed. Check the source information before visiting."]},"zh-TW": {"title": "町田田野與精釀啤酒","subtitle": "町田田野與精釀啤酒","description": "以出處為線索，認識町田田野與精釀啤酒。","tags": ["町田市"],"storyTitle": "町田田野與精釀啤酒","intro": ["以出處為線索，認識町田田野與精釀啤酒。","刊載內容尚未確認。造訪前請查看出處資訊。"]}},
    "chapters": {"ja": [{"number": "01.","title": "武相ブリュワリーの町田産ホップ・大麦ビール","body": "武相ブリュワリーの事業紹介によると、地元企業と農家が連携し、2023年に町田産のホップや大麦を一部使うビール事業を立ち上げました。"}],"en": [{"number": "01.","title": "Buso Brewery Beer Using Machida Hops and Barley","body": "Buso Brewery’s project account describes local businesses and farmers launching a beer initiative in 2023 using some Machida-grown hops and barley."}],"zh-TW": [{"number": "01.","title": "武相精釀啤酒的啤酒花與大麥","body": "武相釀酒廠的事業介紹記載，地方企業與農家於2023年合作，展開部分使用町田產啤酒花及大麥的啤酒事業。"}]},
    "routeVariants": [{"id": "half-day","durationMinutes": 90,"steps": [{"spotId": "b03-machida-craft-beer-buso"}]}],
  },
  "routeName": {"ja": "町田の畑とクラフトビール","en": "Machida fields and craft beer","zh-TW": "町田田野與精釀啤酒"},
  "location": {"ja": {"area": "町田市","station": "","access": ""},"en": {"area": "Machida","station": "","access": ""},"zh-TW": {"area": "町田市","station": "","access": ""}},
  "variants": {
    "half-day": {
      "arrival": {"kind": "station", "name": {"ja": "町田駅", "en": "Machida Station", "zh-TW": "町田站"}, "spotId": "b03-machida-craft-beer-buso", "sourceId": "admission-access"},
      "steps": [{"spotId": "b03-machida-craft-beer-buso","description": {"ja": "公式サイトが町田のフラッグシップ店として掲載しています。","en": "The brewery’s official site identifies its Machida flagship shop.","zh-TW": "釀酒廠官網列出的町田旗艦店。"},"note": {"ja": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。紹介した品をすべて提供するコースではありません。","en": "Timing and order are editorial estimates. Check transport and directions yourself. This itinerary does not promise every food described.","zh-TW": "時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會提供文中每種食品。"}}],"stats": {"ja": {"time": "約90分（編集目安）","distance": "","spots": "1 か所","station": "","minutes": "90","access": "","caution": "時間と順序は編集上の目安です。交通手段・経路は各自ご確認ください。紹介した品をすべて提供するコースではありません。"},"en": {"time": "About 90 min (editorial estimate)","distance": "","spots": "1 stops","station": "","minutes": "90","access": "","caution": "Timing and order are editorial estimates. Check transport and directions yourself. This itinerary does not promise every food described."},"zh-TW": {"time": "約90分鐘（編輯估計）","distance": "","spots": "1 處","station": "","minutes": "90","access": "","caution": "時間與順序為編輯估計，請自行確認交通及路線。本行程不代表會提供文中每種食品。"}},"guidance": {"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。","en": "This information is unconfirmed. Check the source information before visiting.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}},
  },
  "spots": {
    "b03-machida-craft-beer-buso": {"presentation": {"id": "b03-machida-craft-beer-buso","regionId": "machida","foodCultureId": "machida-craft-beer","thumbnailAssetIds": [],"copy": {"ja": {"name": "武相ブリュワリー町田駅前店","lead": "公式サイトが町田のフラッグシップ店として掲載しています。","description": "公式サイトが町田のフラッグシップ店として掲載しています。","tags": [],"practicalInfo": [{"label": "確認状態","value": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。"}],"caution": ["掲載内容は未確認です。訪問前に出典情報をご確認ください。"]},"en": {"name": "Buso Brewery Machida station shop","lead": "The brewery’s official site identifies its Machida flagship shop.","description": "The brewery’s official site identifies its Machida flagship shop.","tags": [],"practicalInfo": [{"label": "Verification","value": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending."}],"caution": ["This information is unconfirmed. Check the source information before visiting."]},"zh-TW": {"name": "武相釀酒廠町田站前店","lead": "釀酒廠官網列出的町田旗艦店。","description": "釀酒廠官網列出的町田旗艦店。","tags": [],"practicalInfo": [{"label": "確認狀態","value": "2026年11月24日（JST）取得出處，尚待相關人員確認。"}],"caution": ["刊載內容尚未確認。造訪前請查看出處資訊。"]}}},"detail": {"tags": [],"description": {"ja": "公式サイトが町田のフラッグシップ店として掲載しています。","en": "The brewery’s official site identifies its Machida flagship shop.","zh-TW": "釀酒廠官網列出的町田旗艦店。"},"information": [{"fieldId": "official_current_url","icon": "information","label": {"ja": "出典情報","en": "Source information","zh-TW": "出處資訊"},"value": {"ja": "https://www.buso-brewery.com/","en": "https://www.buso-brewery.com/","zh-TW": "https://www.buso-brewery.com/"}},{"fieldId": "verification_note","icon": "information","label": {"ja": "確認状態","en": "Verification","zh-TW": "確認狀態"},"value": {"ja": "2026年11月24日（JST）に出典を取得。関係者による確認は未実施です。","en": "Sources retrieved 2026-11-24 JST; stakeholder confirmation is pending.","zh-TW": "2026年11月24日（JST）取得出處，尚待相關人員確認。"}}],"caution": [{"ja": "掲載内容は未確認です。訪問前に出典情報をご確認ください。","en": "This information is unconfirmed. Check the source information before visiting.","zh-TW": "刊載內容尚未確認。造訪前請查看出處資訊。"}]},"officialSource": {"name": "BUSO BREWERY by Kawasemi Brew | カワセミブリュー","url": "https://www.buso-brewery.com/","sourceType": "official_web","retrievedAt": "2026-11-24","verificationStatus": "needs_confirmation"}},
  },
  "story": {
    "groups": {"nearby": [{"referenceId": "b03-machida-craft-beer-buso","spotId": "b03-machida-craft-beer-buso","badgeColor": "#E98A1C","badge": {"ja": "武相ブリュワリー町田駅前店","en": "Buso Brewery Machida station shop","zh-TW": "武相釀酒廠町田站前店"},"description": {"ja": "公式サイトが町田のフラッグシップ店として掲載しています。","en": "The brewery’s official site identifies its Machida flagship shop.","zh-TW": "釀酒廠官網列出的町田旗艦店。"}}],"nature": []},
    "location": {"ja": {"region": "町田市","station": ""},"en": {"region": "Machida","station": ""},"zh-TW": {"region": "町田市","station": ""}},
  },
  "sources": {
    "admission-access": {"name": "BUSO Brewery – Machida Station shop", "url": "https://www.buso-brewery.com/", "sourceType": "official_web", "retrievedAt": "2026-11-28", "verificationStatus": "needs_confirmation"},
    "source-40": {"name": "Kawasemi Brew | カワセミブリュー","url": "https://www.buso-brewery.com/kawasemi-brew-bc","sourceType": "official_web","retrievedAt": "2026-11-24","verificationStatus": "needs_confirmation"},
    "source-43": {"name": "BUSO BREWERY by Kawasemi Brew | カワセミブリュー","url": "https://www.buso-brewery.com/","sourceType": "official_web","retrievedAt": "2026-11-24","verificationStatus": "needs_confirmation"},
    "editorial": {"name": "b03 editorial itinerary — timing and order estimates, not a timetable","url": "https://www.buso-brewery.com/kawasemi-brew-bc","sourceType": "manual","retrievedAt": "2026-11-24","verificationStatus": "needs_confirmation"},
  },
  "facts": {
    "journey.copy": {"sourceIds": ["source-40","source-43"],"origin": "editorial"},
    "routeName": {"sourceIds": ["source-40","source-43"],"origin": "editorial"},
    "location": {"sourceIds": ["source-40","source-43"],"origin": "editorial"},
    "story.location": {"sourceIds": ["source-40","source-43"],"origin": "editorial"},
    "journey.chapters.ja.0": {"sourceIds": ["source-40"],"origin": "editorial"},
    "journey.chapters.en.0": {"sourceIds": ["source-40"],"origin": "editorial"},
    "journey.chapters.zh-TW.0": {"sourceIds": ["source-40"],"origin": "editorial"},
    "journey.routeVariants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "variants": {"sourceIds": ["editorial"],"origin": "editorial"},
    "spots.b03-machida-craft-beer-buso": {"sourceIds": ["source-43"],"origin": "editorial"},
    "variants.half-day.steps.0.description": {"sourceIds": ["source-43"],"origin": "editorial"},
    "story.groups.nearby.0": {"sourceIds": ["source-43"],"origin": "editorial"},
  },
};
