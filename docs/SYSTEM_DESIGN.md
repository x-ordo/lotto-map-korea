# 🏗️ LottoShrine System Architecture & Page Definitions

본 문서는 LottoShrine PRO의 프론트엔드 아키텍처와 데이터 흐름을 정의합니다.

## 1. Core Principles
- **State Driven**: 모든 UI 변화는 `activeTab`과 `selectedStore` 상태에 의해 결정론적으로 렌더링됩니다.
- **Atomic Components**: 각 탭의 비즈니스 로직은 독립된 섹션으로 분리되어 유지보수성을 극대화합니다.
- **Unidirectional Data Flow**: 데이터는 상위 `MapInterface`에서 하위 컴포넌트로 Props를 통해 단방향으로 흐릅니다.

## 2. Page Transitions (Events)
1. **Pilgrimage (성지순례)**:
   - 사용자가 검색창에 지역 입력 -> `searchTerm` 업데이트 -> `processedStores` 필터링 -> 지도 마커 동적 갱신.
2. **Destiny Unlock (기운 해제)**:
   - `selectedStore.distance` < 500m 조건 충족 -> `Unlock` 아이콘 활성화 -> 행운 번호 렌더링.
3. **Oracle Analysis (AI 점사)**:
   - 분석 버튼 클릭 -> `luckEngine.ts` 호출 -> `SHAMAN_NARRATIVES` 매핑 -> 상세 패널에 결과 게시.

## 3. Data Schema
- **LotteryStore**: id, name, address, winCount1st, lat, lng, luckIndex.
- **LuckAnalysis**: score, luckyNumber, insights, recommendation.
- **DreamInterpretation**: keyword, meaning, numbers[].

---
**Last Updated**: 2026.01.03
**Maintainer**: LottoShrine Engineering Team