import { LotteryStore, LuckAnalysis } from "./types";

// [심리전] 콜드 리딩(Cold Reading) 템플릿: 누구나 자기 얘기처럼 느끼게 하는 문구
const FORTUNE_TEMPLATES = [
  { text: "동쪽에서 귀인이 다가옵니다. 이번 주는 직감을 믿고 과감하게 행동하세요.", keywords: "귀인,직감,과감" },
  { text: "정체된 기운이 풀리고 있습니다. 소액으로 꾸준히 도전하면 큰 흐름을 탑니다.", keywords: "해소,흐름,꾸준함" },
  { text: "뜻밖의 횡재수가 보입니다. 평소와 다른 번호를 선택해보는 것이 좋습니다.", keywords: "횡재,변화,기회" },
  { text: "재물운이 상승 곡선을 그립니다. 잃을 것이 없는 가벼운 마음이 행운을 부릅니다.", keywords: "상승,가벼움,행운" },
  { text: "강력한 화(火)의 기운이 느껴집니다. 숫자 9나 1이 들어간 번호를 주목하세요.", keywords: "열정,숫자,집중" }
];

export const analyzeLuckLocal = (store: LotteryStore): LuckAnalysis => {
  // [Trap] 날짜 + 가게 ID = 고정된 시드값.
  // 사용자가 "새로고침"을 해도 같은 결과가 나와야 "진짜 분석"이라고 착각한다.
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const seedString = `${store.id}-${today}-MONOPOLY`; 
  
  // 간단한 해시 생성 (LCG 변형)
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = ((hash << 5) - hash) + seedString.charCodeAt(i);
    hash |= 0;
  }
  
  const pseudoRandom = () => {
    hash = (hash * 1664525 + 1013904223) % 4294967296;
    return Math.abs(hash) / 4294967296;
  };

  // 점수 후킹: 절대 80점 밑으로 주지 마라. 고객은 기분 나쁘면 앱을 지운다.
  const score = 80 + Math.floor(pseudoRandom() * 20); 

  // 번호 생성: 1~45 중복 제거
  const numbers = new Set<number>();
  // 첫 번호는 가게 이름 길이로 생성하여 '로컬 연관성' 부여 (기만)
  numbers.add((store.name.length * 7) % 45 + 1);
  
  while(numbers.size < 6) {
    numbers.add(Math.floor(pseudoRandom() * 45) + 1);
  }

  // 멘트 선정
  const templateIdx = Math.floor(pseudoRandom() * FORTUNE_TEMPLATES.length);
  const selected = FORTUNE_TEMPLATES[templateIdx];

  return {
    score,
    recommendation: `행운 키워드: ${selected.keywords}`,
    luckyNumber: Array.from(numbers).sort((a, b) => a - b),
    insights: `${store.name}의 지기(地氣) 분석: ${selected.text}`
  };
};
