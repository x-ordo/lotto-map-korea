import { describe, it, expect } from 'vitest';
import { analyzeLuckLocal } from '../luckEngine';
import { LotteryStore, StoreType } from '../types';

describe('Luck Engine Logic', () => {
  const mockStore: LotteryStore = {
    id: 'test-store',
    name: '행운복권방',
    address: '서울시 강남구',
    lat: 37.5,
    lng: 127.0,
    type: ['LOTTO'],
    winCount1st: 5,
    winCount2nd: 10
  };

  it('점수는 항상 80점 이상 100점 이하를 유지해야 한다', () => {
    const result = analyzeLuckLocal(mockStore);
    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('동일한 날짜와 가게 ID에 대해 결정론적 결과를 반환해야 한다', () => {
    const result1 = analyzeLuckLocal(mockStore);
    const result2 = analyzeLuckLocal(mockStore);
    expect(result1.luckyNumber).toEqual(result2.luckyNumber);
    expect(result1.score).toBe(result2.score);
  });

  it('행운 번호는 항상 6개이며 중복이 없어야 한다', () => {
    const result = analyzeLuckLocal(mockStore);
    expect(result.luckyNumber).toHaveLength(6);
    const uniqueNumbers = new Set(result.luckyNumber);
    expect(uniqueNumbers.size).toBe(6);
  });
});
