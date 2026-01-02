'use client';

import dynamic from 'next/dynamic';

const MapInterface = dynamic(() => import('./MapInterface'), { 
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 text-slate-400">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="font-bold text-sm">명당을 찾는 중...</p>
      </div>
    </div>
  )
});

export default function MapLoader() {
  return <MapInterface />;
}
