'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ChevronRight, MapPin, Sparkles, Trophy, ListOrdered, Moon, MessageCircle, Download, Share2, Lock, Unlock, LocateFixed, Fingerprint, Cpu, Users, Star, Camera, LayoutDashboard, Info, Activity, Map as MapIcon, Coins, CheckCircle2 } from 'lucide-react';
import { LotteryStore, LuckAnalysis, DreamInterpretation, TabType, CommunityPost, UserSubscription } from '../../lib/types';
import { analyzeLuckLocal } from '../../lib/luckEngine';
import { MOCK_STORES } from '../../lib/data';
import DREAM_DATA from '../../data/dream_mapping.json';
import KNOWLEDGE_DATA from '../../data/lotto_knowledge.json';

// Import Polished Tabs
import CommunityWall from './tabs/CommunityWall';
import InsightsDashboard from './tabs/InsightsDashboard';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler);

declare global { interface Window { kakao: any; } }

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const a = Math.sin((lat2 - lat1) * Math.PI / 360) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin((lon2 - lon1) * Math.PI / 360) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export default function MapInterface() {
  const [activeTab, setActiveTab] = useState<TabType | 'CORE'>('MAP');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [selectedStore, setSelectedStore] = useState<LotteryStore | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dreamSearch, setDreamSearch] = useState('');
  const [sortBy, setSortBy] = useState<'WIN' | 'DISTANCE'>('WIN');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [analysis, setAnalysis] = useState<LuckAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [subInfo] = useState<UserSubscription>({ isPro: false, tier: 'FREE' });

  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        null, { enableHighAccuracy: true }
      );
    }
    fetch('/api/community').then(res => res.ok ? res.json() : []).then(data => setPosts(data)).catch(() => setPosts([]));
  }, []);

  const processedStores = useMemo(() => {
    return MOCK_STORES.map(s => {
        const dist = userLocation ? getDistance(userLocation.lat, userLocation.lng, s.lat, s.lng) : 100000;
        return { ...s, luckIndex: 75 + (s.winCount1st * 3), distance: dist, isEnergized: dist < 500 };
    }).filter(s => s.name.includes(searchTerm) || s.address.includes(searchTerm))
    .sort((a, b) => sortBy === 'DISTANCE' ? (a.distance! - b.distance!) : (b.winCount1st - a.winCount1st));
  }, [searchTerm, sortBy, userLocation]);

  const filteredDreams = useMemo(() => (DREAM_DATA as DreamInterpretation[]).filter(d => d.keyword.includes(dreamSearch)), [dreamSearch]);

  // 🗺️ 지도 초기화 로직
  useEffect(() => {
    if (activeTab === 'MAP' && typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
            const container = document.getElementById('map-container');
            if (container && !mapRef.current) {
                mapRef.current = new window.kakao.maps.Map(container, { 
                    center: new window.kakao.maps.LatLng(userLocation?.lat || 37.5665, userLocation?.lng || 126.9780), 
                    level: 8 
                });
            }
        });
    }
  }, [activeTab, userLocation]);

  // 📍 마커 동기화 로직
  useEffect(() => {
    if (activeTab !== 'MAP' || !mapRef.current) return;
    window.kakao.maps.load(() => {
        Object.values(markersRef.current).forEach(m => m.setMap(null));
        markersRef.current = {};
        processedStores.forEach(store => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(store.lat, store.lng),
            map: mapRef.current,
          });
          window.kakao.maps.event.addListener(marker, 'click', () => setSelectedStore(store as any));
          markersRef.current[store.id] = marker;
        });
    });
  }, [processedStores, activeTab]);

  const frequencyData = {
    labels: ['34', '18', '27', '1', '43', '12', '5', '39'],
    datasets: [{ label: 'Frequency', data: [152, 148, 145, 142, 140, 138, 135, 132], backgroundColor: '#4F46E5', borderRadius: 10 }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false }, ticks: { font: { weight: 'bold' as const } } }, y: { display: false } }
  };

  const handleAnalyze = async () => {
    if (!selectedStore) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(analyzeLuckLocal(selectedStore));
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-zinc-950 overflow-hidden antialiased">
      <nav className="bg-white/80 backdrop-blur-md border-b border-zinc-100 px-8 flex justify-between items-center h-20 shrink-0 z-50">
        <div className="flex items-center space-x-4">
            <div className="bg-zinc-950 p-2.5 rounded-xl"><Fingerprint className="text-white w-6 h-6" /></div>
            <h1 className="text-xl font-black tracking-tight leading-none">LottoShrine <span className="text-indigo-600 font-black italic">PRO</span></h1>
        </div>
        <div className="flex space-x-1 bg-zinc-100/50 p-1 rounded-xl">
            {[
                { id: 'MAP', icon: MapIcon, label: '성지' },
                { id: 'COMMUNITY', icon: Users, label: '담벼락' },
                { id: 'STATS', icon: LayoutDashboard, label: '인사이트' },
                { id: 'DREAM', icon: Moon, label: '계시' },
                { id: 'PRO', icon: Star, label: 'PRO' },
            ].map(tab => (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id as any); setSelectedStore(null); }} className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${activeTab === tab.id ? 'bg-white text-zinc-950 shadow-sm font-black scale-105' : 'text-zinc-400 hover:text-zinc-600'}`}>
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-indigo-600' : ''}`} />
                    <span className="text-xs whitespace-nowrap">{tab.label}</span>
                </button>
            ))}
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 relative h-full">
            {activeTab === 'MAP' && (
                <div className="h-full w-full relative bg-zinc-50">
                    <div id="map-container" className="h-full w-full grayscale-[0.2]"></div>
                    {!selectedStore && (
                        <aside className={`absolute top-6 left-6 z-20 h-[calc(100%-3rem)] bg-white border border-zinc-200/60 rounded-2xl shadow-2xl shadow-zinc-200/50 transition-all duration-500 ease-out ${isSidebarOpen ? 'w-full md:w-[400px]' : 'w-0 overflow-hidden opacity-0'}`}>
                           <div className="flex flex-col h-full">
                              <div className="p-8 pb-4">
                                <div className="flex justify-between items-center mb-8"><h2 className="text-2xl font-black tracking-tight">성지 탐색</h2><button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"><X className="w-5 h-5 text-zinc-400" /></button></div>
                                <div className="relative group"><Search className="absolute left-4 top-4 text-zinc-300 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" /><input type="text" placeholder="지역이나 매장명 검색" className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 font-bold transition-all outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                              </div>
                              <div className="flex-1 overflow-y-auto space-y-px p-4 scrollbar-hide pb-10">
                                 {processedStores.map(s => (
                                    <div key={`${s.id}-${s.address}`} onClick={() => setSelectedStore(s as any)} className="p-5 rounded-xl hover:bg-zinc-50 cursor-pointer transition-all flex items-center space-x-4 group border border-transparent hover:border-zinc-100">
                                        <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 font-black group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">{s.winCount1st}</div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-sm truncate mb-0.5">{s.name}</h3>
                                            <p className="text-[11px] text-zinc-400 truncate font-medium">{s.address}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mb-1 italic">LUCK {(s as any).luckIndex}</div>
                                            <p className="text-[10px] text-zinc-300 font-bold">{(s.distance!/1000).toFixed(1)}km</p>
                                        </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </aside>
                    )}
                </div>
            )}

            {activeTab === 'COMMUNITY' && <CommunityWall posts={posts} />}
            {activeTab === 'STATS' && <InsightsDashboard frequencyData={frequencyData} chartOptions={chartOptions} />}
            {activeTab === 'DREAM' && (
                <div className="h-full overflow-y-auto p-12 bg-white animate-in slide-in-from-bottom duration-500">
                    <div className="max-w-2xl mx-auto space-y-12">
                        <div className="text-center py-10 space-y-4"><div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto text-indigo-600 shadow-inner"><Moon className="w-10 h-10 fill-indigo-600" /></div><h2 className="text-4xl font-black tracking-tight">어젯밤 꿈의 암호</h2><p className="text-zinc-400 font-bold">무의식이 보내는 신호를 데이터로 치환합니다.</p></div>
                        <div className="relative"><Search className="absolute left-5 top-5 text-zinc-300 w-6 h-6" /><input type="text" placeholder="돼지, 똥, 조상님..." className="w-full pl-16 pr-6 py-5 bg-zinc-100/50 border-none rounded-2xl text-xl focus:ring-4 focus:ring-indigo-500/10 font-black outline-none transition-all placeholder:text-zinc-300" value={dreamSearch} onChange={(e) => setDreamSearch(e.target.value)} /></div>
                        <div className="grid grid-cols-1 gap-4">
                            {filteredDreams.map((d, i) => (
                                <div key={`dream-${i}`} className="p-8 bg-white border border-zinc-100 rounded-2xl hover:border-indigo-200 transition-all group"><div className="flex justify-between items-start mb-6"><h3 className="text-2xl font-black text-zinc-950">#{d.keyword}</h3><div className="flex space-x-2">{d.numbers.map(n => (<span key={n} className="w-10 h-10 flex items-center justify-center bg-zinc-950 text-white rounded-lg text-sm font-black shadow-lg">{n}</span>))}</div></div><p className="text-zinc-500 leading-relaxed font-bold italic">"{d.meaning}"</p></div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {activeTab === 'PRO' && (
                <div className="h-full overflow-y-auto p-12 bg-white animate-in slide-in-from-bottom duration-700">
                    <div className="max-w-4xl mx-auto space-y-16 pb-32">
                        <header className="text-center space-y-6"><div className="inline-flex items-center px-4 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-4 shadow-xl">Premium Access</div><h2 className="text-6xl font-black tracking-tighter text-zinc-950 leading-tight">운명을 넘어서는<br/>데이터의 힘.</h2></header>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-zinc-50 border border-zinc-100 rounded-[40px] p-12 space-y-10">
                                <h3 className="text-3xl font-black text-zinc-950">Free Plan</h3>
                                <ul className="space-y-6">
                                    {['전국 1등 명당 지도', '기초 당첨 통계', '일반 꿈해몽'].map(f => (
                                        <li key={f} className="flex items-center text-zinc-500 font-bold"><CheckCircle2 className="w-5 h-5 mr-3 text-zinc-300" /> {f}</li>
                                    ))}
                                </ul>
                                <div className="text-4xl font-black pt-10 border-t border-zinc-200 text-zinc-950">₩0 <span className="text-sm text-zinc-400">/ forever</span></div>
                                <button className="w-full py-5 bg-white border border-zinc-200 text-zinc-400 font-black rounded-3xl cursor-not-allowed">현재 이용 중</button>
                            </div>
                            <div className="bg-zinc-950 text-white rounded-[40px] p-12 space-y-10 relative overflow-hidden shadow-2xl shadow-indigo-200">
                                <div className="absolute -top-10 -right-10 opacity-20"><Zap className="w-64 h-64 text-indigo-500 fill-indigo-500" /></div>
                                <h3 className="text-3xl font-black relative z-10 flex items-center">LottoShrine PRO <Star className="ml-3 fill-yellow-400 text-yellow-400 w-6 h-6" /></h3>
                                <ul className="space-y-6 relative z-10">
                                    {['1/16,000 압축 전문가 리포트', '실시간 성지 알림 (Push)', '스피또 1등 재고 실시간 추적', '모든 광고 원천 차단'].map(f => (
                                        <li key={f} className="flex items-center font-bold text-indigo-100"><Sparkles className="w-5 h-5 mr-3 text-yellow-400" /> {f}</li>
                                    ))}
                                </ul>
                                <div className="text-4xl font-black pt-10 border-t border-zinc-800 relative z-10 text-white">₩9,900 <span className="text-sm text-zinc-500">/ month</span></div>
                                <button className="w-full py-6 bg-indigo-600 text-white font-black rounded-3xl shadow-xl shadow-indigo-500/40 active:scale-95 transition-all relative z-10">지금 구독하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>

        {selectedStore && (
            <aside className="absolute inset-0 md:relative md:w-[500px] bg-white z-[60] animate-in slide-in-from-right duration-400 shadow-2xl flex flex-col border-l border-zinc-100">
                <div className="p-6 border-b border-zinc-50 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10"><button onClick={() => setSelectedStore(null)} className="p-3 hover:bg-zinc-100 rounded-xl transition-all"><X className="w-6 h-6 text-zinc-400" /></button><span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Store Intelligence</span><button className="p-3 hover:bg-zinc-100 rounded-xl text-indigo-600"><Share2 className="w-6 h-6" /></button></div>
                <div className="p-10 overflow-y-auto flex-1 space-y-12 scrollbar-hide pb-32">
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2"><span className="px-3 py-1 bg-zinc-950 text-white text-[9px] font-black rounded-md">ELITE HOTSPOT</span><span className={`px-3 py-1 text-[9px] font-black rounded-md border flex items-center ${(selectedStore as any).isEnergized ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-zinc-50 text-zinc-400 border-zinc-100'}`}>{(selectedStore as any).isEnergized ? <Unlock className="w-2.5 h-2.5 mr-1.5 fill-white" /> : <Lock className="w-2.5 h-2.5 mr-1.5" />}{(selectedStore as any).isEnergized ? '기운 활성화됨' : '방문 필요'}</span></div>
                        <h2 className="text-5xl font-black tracking-tighter leading-none">{selectedStore.name}</h2>
                        <p className="text-zinc-400 font-bold leading-relaxed flex items-start"><MapPin className="w-5 h-5 mr-3 shrink-0 text-indigo-500 mt-1" />{selectedStore.address}</p>
                    </section>
                    <div className="bg-zinc-50 rounded-3xl p-10 text-center border border-zinc-100/50">
                        {!(selectedStore as any).isEnergized ? (
                            <div className="space-y-6">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-zinc-100"><Lock className="w-8 h-8 text-zinc-200" /></div>
                                <div className="space-y-2"><h3 className="text-xl font-black text-zinc-950">현장에서 기운을 깨우세요</h3><p className="text-zinc-400 font-bold text-xs">반경 500m 이내에서 인증 시<br/>이 매장만의 전용 번호 5세트를 드립니다.</p></div>
                                <button className="w-full bg-zinc-950 text-white font-black py-5 rounded-2xl flex items-center justify-center space-x-2 active:scale-95 transition-all shadow-xl shadow-zinc-200"><LocateFixed className="w-5 h-5" /> <span>현장 인증하기</span></button>
                            </div>
                        ) : (
                            <div className="animate-in zoom-in duration-500 space-y-8">
                                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-indigo-100"><Unlock className="w-8 h-8 text-white" /></div>
                                <h3 className="text-2xl font-black text-indigo-600">인증 성공! 행운 번호 활성</h3>
                                <div className="flex justify-center space-x-2">{[7, 14, 22, 33, 39, 45].map(n => (<span key={n} className="w-10 h-10 flex items-center justify-center bg-zinc-950 text-white rounded-lg font-black text-xs">{n}</span>))}</div>
                            </div>
                        )}
                    </div>
                    <div className="bg-indigo-600 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
                        <div className="absolute top-0 right-0 p-6 opacity-10"><Sparkles className="w-32 h-32" /></div>
                        {!analysis ? (
                            <div className="space-y-8 relative z-10"><h3 className="text-3xl font-black tracking-tight leading-tight">오늘 이 매장의<br/>점사를 확인하시겠습니까?</h3><button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full bg-white text-indigo-600 font-black py-5 rounded-2xl active:scale-95 transition-all text-lg uppercase tracking-tight">{isAnalyzing ? "암호 해독 중..." : "점사 점지받기"}</button></div>
                        ) : (
                            <div className="space-y-10 relative z-10 animate-in zoom-in duration-500">
                                <div><p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest mb-2 text-white">Oracle Intelligence Score</p><p className="text-8xl font-black tracking-tighter text-white">{analysis.score}<span className="text-3xl text-indigo-200 ml-1">/100</span></p></div>
                                <p className="text-2xl font-bold leading-snug italic text-white">"{analysis.insights}"</p>
                                <div className="grid grid-cols-2 gap-3"><button className="bg-white text-zinc-950 font-black py-5 rounded-2xl text-xs flex flex-col items-center justify-center shadow-lg active:scale-90 transition-all"><MessageCircle className="w-5 h-5 mb-2 text-zinc-950" /> 카톡 전달</button><button className="bg-indigo-500/50 text-white font-black py-5 rounded-2xl text-xs flex flex-col items-center justify-center border border-white/20 active:scale-90 transition-all"><Download className="w-5 h-5 mb-2 text-white" /> 기운 저장</button></div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        )}
      </div>

      <div className="absolute bottom-10 right-10 z-50 flex flex-col space-y-4">
          <button onClick={() => { setActiveTab('CORE'); setSelectedStore(null); }} className="bg-zinc-950 w-16 h-16 rounded-2xl shadow-xl flex items-center justify-center text-indigo-400 border border-zinc-800 transition-all hover:scale-110 active:scale-90"><Cpu className="w-8 h-8" /></button>
          {activeTab === 'MAP' && (
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden bg-indigo-600 w-16 h-16 rounded-2xl shadow-xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90">{isSidebarOpen ? <X className="w-8 h-8" /> : <Search className="w-8 h-8" />}</button>
          )}
      </div>
    </div>
  );
}