# 📊 로또 통계 수집 및 심층 분석 보고서

본 문서는 `lottoplay.co.kr`의 전문 통계 라이브러리 전수 조사 및 분석 결과를 기록한 문서입니다. 수집된 데이터는 AI 기운 분석 및 전략 대시보드의 기초 자산으로 활용됩니다.

---

## 1. 데이터 수집 개요 (Crawling Summary)

### 1.1 수집 대상 및 규모
- **출처**: 로또플레이 라이브러리 (Elementary, Intermediate, High Level)
- **범위**: 1회차부터 최신 회차(1205회)까지의 누적 통계
- **규모**: 총 32개 엔드포인트, 약 25,000행(Rows) 이상의 데이터셋

### 1.2 기술 스택 (Technical Stack)
- **Engine**: Node.js + Cheerio (정밀 테이블 파싱)
- **Encoding**: iconv-lite (EUC-KR 한글 처리)
- **Automation**: Master Scraper (`scripts/final_library_crawler.js`)
- **Storage**: CSV (Raw), JSON (Structured Master DB)

---

## 2. 통계 카테고리별 상세 내역

| 분류 | 수집 항목 (32개 페이지) | 핵심 분석 지표 |
|:---:|:---|:---|
| **기초 (Elementary)** | 당첨번호 분석, 빈도, 순위, 그림, 미출현기간, 분포도, 총합, 홀짝, 고저, AC값 등 | 번호별 당첨 확률, 정규 분포도 |
| **중급 (Intermediate)** | 이웃수, 연번, 핫/콜드수, 9궁도, 중복현황, 간격, 소수, 스타트/라스트 번호, 3/5배수 등 | 출현 패턴 및 구간별 흐름 |
| **고급 (High)** | 회귀설(주기), 낙첨값, 가로/세로라인 분석, 좋은궁합/나쁜궁합 번호 리스트 등 | 번호 간 상관관계 및 회귀 확률 |

---

## 3. 데이터 분석 및 시각화 결과 (Python/Pandas)

### 3.1 분석 엔진 로직 (`scripts/analyze_lotto_v4.py`)
- **데이터 정제**: 비정형 텍스트에서 로또 번호(1-45)와 출현 빈도(회)를 정규식으로 자동 추출.
- **통계 모델링**: 
    - **Frequency Analysis**: 번호별 누적 빈도 산출 및 랭킹화.
    - **Distribution Analysis**: 번호대별(10 단위) 점유율 계산을 통한 균형도 검증.

### 3.2 주요 시각화 자산
- **최다 출현 TOP 10 (`python_top10.png`)**: 상위 빈도 번호의 시각적 비교.
- **번호대별 비중 (`python_group_pie.png`)**: 각 구간별(1~45) 출현 균일도 확인.

---

## 4. 인사이트 및 제품 반영 (Actionable Insights)

1.  **AI 기운 분석 가중치**: '낙첨값'이 높은(오래 안 나온) 번호가 '회귀설' 주기에 해당할 경우 높은 추천 점수 부여.
2.  **전략적 필터링**: 사용자가 고른 번호가 '나쁜궁합 리스트'에 해당할 경우 경고 알림 및 대체 번호 제안.
3.  **실시간성**: 매주 토요일 수집 엔진 가동을 통해 '이번 주 핫 넘버'를 대시보드에 실시간 반영.

---
**최종 업데이트**: 2026년 1월 3일
**데이터 위치**: `data/lotto_library_final/master_data.json`
**보고서 작성자**: LottoMap Data Pipeline Team
