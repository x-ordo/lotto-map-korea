# 🏗️ LottoMap PRO 시스템 설계서 (v2.7)

## 1. API 엔드포인트 정의 (RESTful)

| Method | Endpoint | Description | 파라미터 |
|:---:|:---|:---|:---|
| **GET** | `/api/stores` | 전국 판매점 목록 조회 | `lat, lng, radius, minWin` |
| **GET** | `/api/stores/:id` | 특정 판매점 상세 정보 | `id` |
| **GET** | `/api/stats/summary` | 통합 통계 데이터 (빈도, 비율) | - |
| **GET** | `/api/dreams?q=keyword` | 꿈 해몽 검색 및 번호 추출 | `q` |
| **POST** | `/api/analyze/luck` | AI 기운 분석 요청 (Rate-limited) | `storeId, userId` |
| **POST** | `/api/report/error` | 정보 오류 제보 접수 | `storeId, content` |

## 2. 데이터 모델 설계 (TypeScript)

### LotteryStore (판매점)
```ts
{
  id: string;           // 고유 식별자 (PK)
  name: string;         // 점포명
  address: string;      // 정제된 도로명 주소
  location: {           // 공간 인덱싱용
    lat: number;
    lng: number;
  };
  winCount: {
    first: number;      // 1등 당첨 횟수
    second: number;     // 2등 당첨 횟수
  };
  metrics: {
    luckIndex: number;  // AI 산출 명당 지수
    efficiency: number; // 판매량 대비 당첨 효율
  };
  liveData: {
    isLive: boolean;    // 실시간 동기화 여부
    speettoStock: any;  // 스피또 잔여량
  };
}
```

### StatsRecord (통계)
```ts
{
  round: number;        // 회차
  numbers: number[];    // 당첨 번호
  bonus: number;        // 보너스 번호
  metrics: {
    sum: number;        // 합계
    oddEven: string;    // 홀짝 비율 (예: "3:3")
    highLow: string;    // 고저 비율
  };
}
```
