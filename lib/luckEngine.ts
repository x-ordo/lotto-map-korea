import { LuckAnalysis } from "./types";

// [Market Eater] 테크-샤머니즘 서사 및 상징 템플릿
const LUCK_SYMBOLS = [
  { icon: "🐖", name: "황금 돼지", text: "재물운이 뿌리 깊게 박혀 있는 형상입니다.", color: "text-yellow-500" },
  { icon: "🐉", name: "청룡", text: "명예와 큰 돈이 한꺼번에 들어올 강력한 기류입니다.", color: "text-indigo-500" },
  { icon: "💎", name: "다이아몬드", text: "결정적인 순간에 빛을 발할 날카로운 운입니다.", color: "text-cyan-400" },
  { icon: "🔥", name: "불사조", text: "꺼지지 않는 당첨의 기운이 당신을 감싸고 있습니다.", color: "text-orange-600" }
];

export const generateDailyOracle = (userId: string, continuityDays: number = 1): LuckAnalysis => {
  const today = new Date().toISOString().slice(0, 10);
  const seedString = `${userId}-${today}`;
  
  // 결정론적 해시 생성
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = ((hash << 5) - hash) + seedString.charCodeAt(i);
    hash |= 0;
  }
  
  const pseudoRandom = () => {
    hash = (hash * 1664525 + 1013904223) % 4294967296;
    return Math.abs(hash) / 4294967296;
  };

  const symbol = LUCK_SYMBOLS[Math.floor(pseudoRandom() * LUCK_SYMBOLS.length)];
  
  // 연속 접속일에 따른 가중치 (Bind 전략)
  const baseScore = 70;
  const continuityBonus = Math.min(continuityDays * 5, 25);
  const randomBonus = Math.floor(pseudoRandom() * 5);
  const score = baseScore + continuityBonus + randomBonus;

  const numbers = new Set<number>();
  while(numbers.size < 6) {
    numbers.add(Math.floor(pseudoRandom() * 45) + 1);
  }

  return {
    score,
    recommendation: `연속 ${continuityDays}일째 기운 축적 중`,
    luckyNumber: Array.from(numbers).sort((a, b) => a - b),
    insights: `${symbol.icon} [${symbol.name}] 기운: ${symbol.text}`
  };
};