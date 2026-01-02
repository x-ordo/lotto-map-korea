const fs = require('fs');
const path = require('path');

// [심리전] 콜드 리딩(Cold Reading) 템플릿
const FORTUNE_TEMPLATES = [
  { text: "동쪽에서 귀인이 다가옵니다. 이번 주는 직감을 믿고 과감하게 행동하세요.", keywords: "귀인,직감,과감" },
  { text: "정체된 기운이 풀리고 있습니다. 소액으로 꾸준히 도전하면 큰 흐름을 탑니다.", keywords: "해소,흐름,꾸준함" },
  { text: "뜻밖의 횡재수가 보입니다. 평소와 다른 번호를 선택해보는 것이 좋습니다.", keywords: "횡재,변화,기회" },
  { text: "재물운이 상승 곡선을 그립니다. 잃을 것이 없는 가벼운 마음이 행운을 부릅니다.", keywords: "상승,가벼움,행운" },
  { text: "강력한 화(火)의 기운이 느껴집니다. 숫자 9나 1이 들어간 번호를 주목하세요.", keywords: "열정,숫자,집중" }
];

const analyzeLuckLocal = (store) => {
  const today = new Date().toISOString().slice(0, 10);
  const seedString = `${store.id}-${today}-MONOPOLY`; 
  
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = ((hash << 5) - hash) + seedString.charCodeAt(i);
    hash |= 0;
  }
  
  const pseudoRandom = () => {
    hash = (hash * 1664525 + 1013904223) % 4294967296;
    return Math.abs(hash) / 4294967296;
  };

  const score = 80 + Math.floor(pseudoRandom() * 20); 

  const numbers = new Set();
  numbers.add((store.name.length * 7) % 45 + 1);
  
  while(numbers.size < 6) {
    numbers.add(Math.floor(pseudoRandom() * 45) + 1);
  }

  const templateIdx = Math.floor(pseudoRandom() * FORTUNE_TEMPLATES.length);
  const selected = FORTUNE_TEMPLATES[templateIdx];

  return {
    score,
    recommendation: `행운 키워드: ${selected.keywords}`,
    luckyNumber: Array.from(numbers).sort((a, b) => a - b),
    insights: `${store.name}의 지기(地氣) 분석: ${selected.text}`
  };
};

async function main() {
    // Read the generated stores from lib/data.ts
    // Since it's a TS file with export, we'll extract the JSON part
    const dataTs = fs.readFileSync('lib/data.ts', 'utf8');
    const jsonMatch = dataTs.match(/export const MOCK_STORES: LotteryStore\[\] = (\[[\s\S]*?\]);/);
    if (!jsonMatch) {
        console.error('Could not find stores in lib/data.ts');
        return;
    }
    const stores = JSON.parse(jsonMatch[1]);

    const results = {};
    for (const store of stores) {
        results[store.id] = analyzeLuckLocal(store);
    }

    fs.writeFileSync('data/analysisResults.json', JSON.stringify(results, null, 2));
    console.log('Successfully saved analysis results to data/analysisResults.json');
}

main().catch(console.error);
