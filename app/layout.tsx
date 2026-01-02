import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '로또명당 v2.5 - AI 실시간 명당 분석 및 1등 당첨 통계',
  description: '기획재정부 공공데이터 기반 전국 로또 1등 명당 지도. AI 기운 분석, 스피또 잔여 수량, 당첨 번호 통계를 실시간으로 확인하세요.',
  keywords: ['로또 명당', '로또 1등', '로또 당첨번호 조회', '스피또 잔여수량', '로또 분석', '이번주 로또 예상번호'],
  openGraph: {
    title: '💰 이번 주 1등 기운이 흐르는 명당은 어디?',
    description: '지금 내 주변 1등 배출 판매점과 AI가 분석한 행운 번호를 확인하세요.',
    url: 'https://lotto-map-korea.vercel.app',
    siteName: '로또명당',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '로또명당 - 실시간 데이터 분석',
    description: '공공데이터로 증명된 1등 명당을 지도로 확인하세요.',
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
         <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d924cfb41cb41e34c93dab696d6a779b&libraries=services,clusterer"></script>
      </head>
      <body className="bg-slate-50 overflow-hidden antialiased">{children}</body>
    </html>
  );
}
