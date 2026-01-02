#!/bin/bash

# LottoMap PRO 배포 자동화 스크립트
echo "🚀 배포 프로세스 시작..."

# 1. 의존성 설치
echo "📦 의존성 설치 중..."
npm install --legacy-peer-deps

# 2. 데이터 최신화 (ETL 파이프라인 가동)
echo "📡 실시간 데이터 동기화 중..."
node scripts/sync_live_data.js
python3 scripts/process_to_dashboard.py

# 3. 테스트 실행
echo "🧪 유닛 테스트 실행 중..."
npx vitest run

# 4. 정적 빌드 수행
echo "🏗️ Next.js 정적 빌드 중..."
npm run build

# 5. Cloudflare Pages 업로드 (Wrangler 사용 시)
# npx wrangler pages deploy out --project-name lotto-map-korea

echo "✅ 모든 배포 준비 완료! 'out/' 디렉토리를 배포하세요."
