import type { Metadata } from 'next';
import './globals.css';
import ErrorBoundary from './components/ErrorBoundary';

export const metadata: Metadata = {
  metadataBase: new URL('https://lotto-shrine.pages.dev'), 
  title: {
    default: 'LottoShrine - AI 로또 명당 성지순례 및 1등 당첨 분석',
    template: '%s | LottoShrine'
  },
  description: '기획재정부 공공데이터와 AI가 분석한 전국 로또 1등 명당 지도. 내 주변 스피또 잔여 수량 확인 및 AI 꿈해몽으로 이번 주 행운의 번호를 점지받으세요.',
  keywords: ['로또 명당', '로또 1등 지역', '스피또 1등 잔여수량', '로또 당첨번호 조회', 'AI 로또 분석', '꿈해몽 번호', '성지순례'],
  openGraph: {
    title: '💰 지금 내 주변에 1등 기운이 흐르는 성지는 어디?',
    description: '공공데이터로 증명된 실시간 로또 명당 지도. 방문 인증 시 AI 전용 번호 무료 증정.',
    url: 'https://lotto-shrine.pages.dev',
    siteName: 'LottoShrine',
    images: [
      {
        url: '/og-shrine.png',
        width: 1200,
        height: 630,
        alt: 'LottoShrine AI Analysis'
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LottoShrine - 초지역적 운명론 가이드',
    description: '당신의 위치와 기운에 맞는 명당을 추천합니다.',
  },
};

export const viewport = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
         <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.kakao.com *.daumcdn.net; img-src 'self' data: *.kakao.com *.daumcdn.net *.lottoplay.co.kr; style-src 'self' 'unsafe-inline'; connect-src 'self' *.kakao.com *.daumcdn.net;" />
         <script 
           type="text/javascript" 
           src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_APP_KEY}&libraries=services,clusterer&autoload=false`}
         ></script>
      </head>
      <body className="bg-slate-50 overflow-hidden antialiased">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
