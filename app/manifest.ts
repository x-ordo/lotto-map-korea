/**
 * PWA Web App Manifest
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */

import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LottoShrine - 로또 명당 지도',
    short_name: 'LottoShrine',
    description: '기획재정부 공공데이터와 AI가 분석한 전국 로또 1등 명당 지도',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#18181b',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'ko',
    categories: ['entertainment', 'lifestyle'],
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/home.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'LottoShrine 홈 화면',
      },
      {
        src: '/screenshots/mobile.png',
        sizes: '750x1334',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'LottoShrine 모바일 화면',
      },
    ],
    shortcuts: [
      {
        name: '지도 보기',
        short_name: '지도',
        description: '로또 명당 지도 열기',
        url: '/?tab=PILGRIMAGE',
        icons: [{ src: '/icons/map-icon.png', sizes: '96x96' }],
      },
      {
        name: '번호 추출',
        short_name: '추출',
        description: 'AI 번호 추출 연구소',
        url: '/?tab=LAB',
        icons: [{ src: '/icons/lab-icon.png', sizes: '96x96' }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
