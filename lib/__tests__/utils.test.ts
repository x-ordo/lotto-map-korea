import { describe, it, expect } from 'vitest';

// 테스트할 거리 계산 로직 (MapInterface 내부 로직을 유틸리티화 할 수 있도록 검증)
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const a = Math.sin((lat2 - lat1) * Math.PI / 360) ** 2 + 
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin((lon2 - lon1) * Math.PI / 360) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

describe('Distance Utility', () => {
  it('서울시청에서 강남역까지의 거리가 약 8-10km 사이여야 한다', () => {
    const cityHall = { lat: 37.5665, lng: 126.9780 };
    const gangnamStation = { lat: 37.4979, lng: 127.0276 };
    const distance = getDistance(cityHall.lat, cityHall.lng, gangnamStation.lat, gangnamStation.lng);
    
    // 미터 단위이므로 8000m ~ 10000m 사이인지 확인
    expect(distance).toBeGreaterThan(8000);
    expect(distance).toBeLessThan(10000);
  });

  it('동일 좌표 간의 거리는 0이어야 한다', () => {
    const dist = getDistance(37.5, 127.0, 37.5, 127.0);
    expect(dist).toBe(0);
  });
});
