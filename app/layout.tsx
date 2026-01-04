import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import ErrorBoundary from './components/ErrorBoundary';
import ServiceWorkerProvider from './components/ServiceWorkerProvider';

export const metadata: Metadata = {
  // PWA
  applicationName: 'LottoShrine',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LottoShrine',
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL('https://lotto-shrine.pages.dev'),
  title: {
    default: 'LottoShrine - AI 로또 명당 성지순례 및 1등 당첨 분석',
    template: '%s | LottoShrine'
  },
  description: '기획재정부 공공데이터와 AI가 분석한 전국 로또 1등 명당 지도. 내 주변 스피또 잔여 수량 확인 및 AI 꿈해몽으로 이번 주 행운의 번호를 점지받으세요.',
  keywords: ['로또 명당', '로또 1등 지역', '스피또 1등 잔여수량', '로또 당첨번호 조회', 'AI 로또 분석', '꿈해몽 번호', '성지순례'],
  authors: [{ name: 'LottoShrine Team' }],
  creator: 'LottoShrine',
  publisher: 'LottoShrine',
  alternates: {
    canonical: 'https://lotto-shrine.pages.dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: '지금 내 주변에 1등 기운이 흐르는 성지는 어디?',
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
  verification: {
    // Add verification tokens when available
    // google: 'your-google-verification-token',
    // naver: 'your-naver-verification-token',
  },
  category: 'entertainment',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
         {/* Security */}
         <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.kakao.com *.daumcdn.net; img-src 'self' data: *.kakao.com *.daumcdn.net *.lottoplay.co.kr; style-src 'self' 'unsafe-inline'; connect-src 'self' *.kakao.com *.daumcdn.net;" />

         {/* PWA - Apple */}
         <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
         <meta name="apple-mobile-web-app-capable" content="yes" />
         <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

         {/* PWA - Microsoft */}
         <meta name="msapplication-TileColor" content="#18181b" />
         <meta name="msapplication-config" content="/browserconfig.xml" />

      </head>
      <body className="bg-slate-50 overflow-hidden antialiased">
        {/* Kakao Maps SDK - loaded after page is interactive */}
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_APP_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="afterInteractive"
        />
        <ErrorBoundary>
          <ServiceWorkerProvider>
            {children}
          </ServiceWorkerProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
