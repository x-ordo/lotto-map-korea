import { describe, it, expect } from 'vitest';
import { generateDailyOracle } from '../luckEngine';

describe('Luck Engine Logic', () => {
  const userId = 'test-user';

  it('점수는 항상 70점 이상 100점 이하를 유지해야 한다', () => {
    const result = generateDailyOracle(userId, 1);
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('동일한 날짜와 유저 ID에 대해 결정론적 결과를 반환해야 한다', () => {
    const result1 = generateDailyOracle(userId, 3);
    const result2 = generateDailyOracle(userId, 3);
    expect(result1.luckyNumber).toEqual(result2.luckyNumber);
    expect(result1.insights).toBe(result2.insights);
  });

  it('행운 번호는 항상 6개이며 중복이 없어야 한다', () => {
    const result = generateDailyOracle(userId, 7);
    expect(result.luckyNumber).toHaveLength(6);
    const uniqueNumbers = new Set(result.luckyNumber);
    expect(uniqueNumbers.size).toBe(6);
  });
});