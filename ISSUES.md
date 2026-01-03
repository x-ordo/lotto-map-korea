# 🚀 Project Backlog & Strategic Issues (v2.8)

## 🔴 High Priority: Infrastructure & Architecture Hardening
- [ ] **DB Migration (Critical)**: 현재의 `fs` 기반 JSON DB를 **Supabase(PostgreSQL)**로 전환하여 데이터 동시성 및 유실 문제 해결.
- [ ] **Authentication**: NextAuth.js를 연동하여 '내 로또 금고'의 개인화 보안 강화.
- [ ] **GPS Server-side Validation**: 클라이언트 `alert`를 제거하고, 서버 측에서 사용자의 실제 좌표와 매장 위치를 대조하는 실검증 로직 구현 (조작 방지).
- [ ] **UI Component Centralization**: 분리된 탭 간의 아이콘 및 유틸리티 참조 누락 방지를 위해 `components/ui` 라이브러리 구축 및 TS Strict 모드 강화.

## 🟡 Medium Priority: Business & Viral Loop
- [ ] **Payment Integration**: PRO 멤버십 활성화를 위한 **Portone(포트원) API** 연동.
- [ ] **KakaoTalk SDK Integration**: "자식에게 공유", "행운 카드 전송" 기능을 단순 링크가 아닌 실제 카카오톡 커스텀 템플릿으로 구현.
- [ ] **Image Storage**: 커뮤니티 성지순례 인증샷을 저장하기 위한 **Cloudinary** 또는 **AWS S3** 스토리지 연동.

## 🟢 Low Priority: Experience & Optimization
- [ ] **PWA Push Notifications**: 토요일 저녁 20:45 당첨 번호 실시간 푸시 알림 엔진 가동.
- [ ] **Marker Clustering**: 매장 데이터 증가 시 지도 렌더링 성능을 보존하기 위한 마커 클러스터링 최적화.
- [ ] **SEO Dynamic Routing**: `/pilgrimage/[region]` 형태의 지역별 명당 검색 최적화 페이지 자동 생성기.

---
### 🏗️ Architecture Feedback Summary
- 현재 `lib/db.ts` 추상화는 훌륭하나, 동시 접속 환경에서의 안정성을 위해 RDBMS로의 전환이 시급함.
- Toss UX의 '행동 유도'와 Geist UI의 '시각적 권위'가 충돌 없이 조화를 이루도록 UI 가이드라인 엄격 준수 필요.