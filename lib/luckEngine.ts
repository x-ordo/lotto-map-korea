import { LotteryStore, LuckAnalysis } from "./types";

// [Market Eater] 테크-샤머니즘 서사 템플릿
const SHAMAN_NARRATIVES = [
  { text: "청룡의 기운이 승천하는 혈자리입니다. 동쪽에서 불어오는 재물운이 이 매장에 응축되어 있습니다.", keywords: "청룡,승천,혈자리" },
  { text: "조상의 음덕이 머무는 명당입니다. 오늘 당신의 관상과 이 매장의 지기가 공명하여 잭팟의 전조를 보입니다.", keywords: "조상,공명,전조" },
  { text: "화(火)의 에너지가 폭발적으로 타오르는 곳입니다. 붉은색 아이템을 소지하고 방문하면 당첨 확률이 극대화됩니다.", keywords: "화기,폭발,레드" },
  { text: "정체된 액운을 씻어내고 황금의 흐름을 불러오는 수(水)의 명당입니다. 오후 4시에서 6시 사이가 골든타임입니다.", keywords: "황금흐름,세척,골든타임" },
  { text: "땅의 기운이 겹치는 '쌍룡'의 형국입니다. 한 번의 선택이 인생의 거대한 변곡점을 만들 강력한 기류가 감지됩니다.", keywords: "쌍룡,변곡점,강력기류" }
];

export const analyzeLuckLocal = (store: LotteryStore): LuckAnalysis => {
  const today = new Date().toISOString().slice(0, 10);
  const seedString = `${store.id}-${today}-MARKET-EATER`; 
  
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = ((hash << 5) - hash) + seedString.charCodeAt(i);
    hash |= 0;
  }
  
  const pseudoRandom = () => {
    hash = (hash * 1664525 + 1013904223) % 4294967296;
    return Math.abs(hash) / 4294967296;
  };

  // 점수 하한선을 85점으로 상향 (더 강한 확신 부여)
  const score = 85 + Math.floor(pseudoRandom() * 15); 

  const numbers = new Set<number>();
  numbers.add((store.name.length * 13) % 45 + 1);
  
  while(numbers.size < 6) {
    numbers.add(Math.floor(pseudoRandom() * 45) + 1);
  }

  const templateIdx = Math.floor(pseudoRandom() * SHAMAN_NARRATIVES.length);
  const selected = SHAMAN_NARRATIVES[templateIdx];

  return {
    score,
    recommendation: `영험한 키워드: ${selected.keywords}`,
    luckyNumber: Array.from(numbers).sort((a, b) => a - b),
    insights: `${store.name}의 영험한 기운: ${selected.text}`
  };
};