# 🛡️ LottoShrine Security Policy & Guidelines

LottoShrine은 사용자의 데이터 안전과 서비스 무결성을 최우선으로 합니다. 본 문서는 프로젝트에 적용된 보안 조치와 향후 준수해야 할 정책을 정의합니다.

---

## 1. 데이터 및 키 관리 (Key Management)
- **Zero Hardcoding**: 모든 API Key(Kakao, etc.)는 소스 코드에 직접 노출하지 않으며, `.env.local` 파일과 서버 환경 변수를 통해서만 관리합니다.
- **Git Safety**: `.gitignore`를 통해 환경 변수 파일 및 개인 설정 파일이 원격 저장소에 업로드되는 것을 원천 차단합니다.

## 2. 클라이언트 보안 (Client-side Security)
- **Content Security Policy (CSP)**: 신뢰할 수 없는 도메인으로부터의 스크립트 실행을 차단하기 위해 엄격한 CSP 정책을 적용합니다. 
    - 허용된 도메인: `*.kakao.com`, `*.daumcdn.net` (지도 서비스용)
- **XSS Prevention**: `dangerouslySetInnerHTML` 사용을 최소화하며, 부득이하게 사용할 경우(JSON-LD 등)에는 철저히 정적 데이터로만 한정합니다.

## 3. 의존성 및 빌드 보안 (Supply Chain Security)
- **Periodic Audit**: 매월 1회 `npm audit`을 실행하여 취약점이 발견된 패키지를 즉시 업데이트합니다.
- **Static Export Advantage**: 서버 사이드 로직을 최소화한 **Static Export** 방식을 채택하여, 서버 취약점을 통한 공격 표면(Attack Surface)을 원천적으로 제거했습니다.

## 4. 장애 대응 및 모니터링
- **Error Boundary**: 런타임 에러 발생 시 사용자 정보 유출이나 앱 중단을 방지하기 위해 전역 에러 핸들러를 가동합니다.
- **Integrity Check**: `scripts/deploy.sh`의 유닛 테스트를 통해 코드 변조나 로직 결함을 배포 전 사전 검증합니다.

---
**최종 업데이트**: 2026년 1월 3일
**보안 책임**: LottoShrine Core Team
