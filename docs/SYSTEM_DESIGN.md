# 🏗️ LottoShrine System Architecture v2.7

## 1. 프론트엔드 계층 구조
- **Orchestrator**: `MapInterface.tsx` (탭 상태 및 데이터 허브)
- **Tab Components**: 
  - `CommunityWall.tsx`: 토스 스타일 소셜 피드.
  - `InsightsDashboard.tsx`: Vercel 스타일 통계 대시보드.
  - `SacredPanel`: GPS 인증 및 AI 분석 상세 패널.

## 2. 백엔드 엔진 (Data Access Layer)
- **DAO**: `lib/db.ts` - 파일 시스템 기반의 추상화된 DB 인터페이스.
- **API Routes**:
  - `GET/POST /api/community`: 게시글 조회 및 저장.
- **Dynamic Configuration**: `revalidate = 0` 및 `force-dynamic`을 통한 실시간 데이터 처리.

## 3. 보안 인프라
- **CSP**: 엄격한 콘텐츠 보안 정책으로 외부 스크립트 통제.
- **Env Separation**: 모든 API Key의 환경 변수 관리.
