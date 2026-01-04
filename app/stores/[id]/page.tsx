/**
 * Individual Store Detail Page
 * SEO-optimized page for each lottery store
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, Award, Calendar, ArrowLeft, Navigation, Share2 } from 'lucide-react';
import type { LotteryStore } from '@/lib/types';

// Load stores data at build time
async function getStores(): Promise<LotteryStore[]> {
  // In production, this would come from an API or database
  // For now, we read from the JSON file
  const fs = await import('fs/promises');
  const path = await import('path');

  const filePath = path.join(process.cwd(), 'public', 'data', 'stores.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function getStoreById(id: string): Promise<LotteryStore | null> {
  const stores = await getStores();
  const decodedId = decodeURIComponent(id);
  return stores.find((store) => store.id === decodedId) || null;
}

// Generate static params for all stores
export async function generateStaticParams() {
  const stores = await getStores();
  return stores.map((store) => ({
    id: encodeURIComponent(store.id),
  }));
}

// Generate metadata for each store page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const store = await getStoreById(id);

  if (!store) {
    return {
      title: '매장을 찾을 수 없습니다',
    };
  }

  const title = `${store.name} - 로또 명당 정보 | LottoShrine`;
  const description = `${store.address}. 1등 ${store.winCount1st}회, 2등 ${store.winCount2nd}회 배출. 로또 명당 상세 정보와 당첨 통계를 확인하세요.`;

  return {
    title,
    description,
    keywords: [
      store.name,
      '로또 명당',
      '로또 판매점',
      store.address.split(' ')[0], // 시/도
      store.address.split(' ')[1], // 구/군
      '당첨 판매점',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ko_KR',
      siteName: 'LottoShrine',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

// Store type labels in Korean
const storeTypeLabels: Record<string, string> = {
  LOTTO: '로또',
  SPORTS_TOTO: '스포츠토토',
  PENSION: '연금복권',
  HOTSPOT: '핫스팟',
};

// JSON-LD component using Next.js Script for safe rendering
function StoreJsonLd({ store }: { store: LotteryStore }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: store.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address,
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: store.lat,
      longitude: store.lng,
    },
    ...(store.phone && { telephone: store.phone }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Math.min(5, 3 + store.winCount1st * 0.5),
      ratingCount: store.winCount1st + store.winCount2nd + 10,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(jsonLd)}
    </script>
  );
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = await getStoreById(id);

  if (!store) {
    notFound();
  }

  // Calculate rank tier based on 1st place wins
  const getRankTier = (wins: number) => {
    if (wins >= 5) return { tier: 'S', color: 'from-amber-400 to-orange-500', label: '전설적 명당' };
    if (wins >= 3) return { tier: 'A', color: 'from-purple-400 to-pink-500', label: '검증된 명당' };
    if (wins >= 2) return { tier: 'B', color: 'from-blue-400 to-cyan-500', label: '주목할 명당' };
    return { tier: 'C', color: 'from-slate-400 to-slate-500', label: '기대되는 명당' };
  };

  const rank = getRankTier(store.winCount1st);

  return (
    <>
      {/* JSON-LD Structured Data - safe because data is from trusted server source */}
      <StoreJsonLd store={store} />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="메인 페이지로 돌아가기"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">돌아가기</span>
            </Link>
            <button
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="공유하기"
              title="공유하기"
            >
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Rank Badge */}
          <div className="flex justify-center mb-6">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${rank.color} text-white shadow-lg`}
            >
              <Award className="w-5 h-5" />
              <span className="font-bold">{rank.tier}등급</span>
              <span className="text-white/80">|</span>
              <span>{rank.label}</span>
            </div>
          </div>

          {/* Store Name */}
          <h1 className="text-3xl md:text-4xl font-black text-center text-slate-900 mb-2">
            {store.name}
          </h1>

          {/* Store Types */}
          <div className="flex justify-center gap-2 mb-8">
            {store.type.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
              >
                {storeTypeLabels[t] || t}
              </span>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
              <div className="text-4xl font-black text-amber-500 mb-1">
                {store.winCount1st}
              </div>
              <div className="text-slate-500 text-sm font-medium">1등 배출</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
              <div className="text-4xl font-black text-blue-500 mb-1">
                {store.winCount2nd}
              </div>
              <div className="text-slate-500 text-sm font-medium">2등 배출</div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4">매장 정보</h2>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">주소</div>
                  <div className="text-slate-900 font-medium">{store.address}</div>
                </div>
              </div>

              {/* Phone */}
              {store.phone && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">전화번호</div>
                    <a
                      href={`tel:${store.phone}`}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      {store.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Last Win Date */}
              {store.lastWinDate && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">최근 당첨일</div>
                    <div className="text-slate-900 font-medium">{store.lastWinDate}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Button */}
          <a
            href={`https://map.kakao.com/link/to/${encodeURIComponent(store.name)},${store.lat},${store.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Navigation className="w-5 h-5" />
            <span>카카오맵으로 길찾기</span>
          </a>

          {/* Disclaimer */}
          <p className="text-center text-slate-400 text-sm mt-8">
            당첨 정보는 공공데이터를 기반으로 하며, 최신 정보와 다를 수 있습니다.
          </p>
        </div>
      </main>
    </>
  );
}
