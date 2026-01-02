import MapLoader from './components/MapLoader';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'LottoShrine AI Analysis',
    'description': '전국 로또 1등 명당 실시간 분석 및 지도 서비스',
    'provider': {
      '@type': 'Organization',
      'name': 'LottoShrine Team'
    },
    'areaServed': 'KR',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Lotto Services',
      'itemListElement': [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'AI Luck Analysis' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Real-time Store Map' } }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MapLoader />
    </>
  );
}
