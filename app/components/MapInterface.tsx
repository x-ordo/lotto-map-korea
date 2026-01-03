'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ChevronRight, MapPin, Sparkles, Trophy, ListOrdered, Moon, MessageCircle, Download, Share2, Lock, Unlock, LocateFixed, Fingerprint, Cpu, Users, Star, Camera, LayoutDashboard, Info, Activity, Map as MapIcon, Coins, CheckCircle2, Package, Zap, Settings, User } from 'lucide-react';
import { LotteryStore, LuckAnalysis, DreamInterpretation, TabType, CommunityPost, UserSubscription } from '../../lib/types';
import { generateDailyOracle } from '../../lib/luckEngine';
import DREAM_DATA from '../../data/dream_mapping.json';

// Import Refactored Tabs
import CommunityWall from './tabs/CommunityWall';
import InsightsDashboard from './tabs/InsightsDashboard';
import OracleVault from './tabs/OracleVault';
import MyLotto from './tabs/MyLotto';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler);

declare global { interface Window { kakao: any; } }

export default function MapInterface() {
  // 🎯 Refactored Navigation: 3 Main Tabs
  const [activeTab, setActiveTab] = useState<'PILGRIMAGE' | 'LAB' | 'WALL'>('PILGRIMAGE');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [selectedStore, setSelectedStore] = useState<LotteryStore | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [dailyOracle, setDailyOracle] = useState<LuckAnalysis | null>(null);
  const [continuity] = useState(3);
  const [stores, setStores] = useState<LotteryStore[]>([]);
  const [storesLoading, setStoresLoading] = useState(true);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        null, { enableHighAccuracy: true }
      );
    }
    // 커뮤니티 포스트 로드
    fetch('/api/community').then(res => res.ok ? res.json() : []).then(data => setPosts(data));

    // 매장 데이터 로드 (API 또는 정적 파일)
    fetch('/data/stores.json')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setStores(data);
        setStoresLoading(false);
      })
      .catch(() => setStoresLoading(false));
  }, []);

  const processedStores = useMemo(() => {
    return stores.map(s => ({ ...s, luckIndex: 75 + (s.winCount1st * 3) }))
    .filter(s => s.name.includes(searchTerm) || s.address.includes(searchTerm));
  }, [stores, searchTerm]);

  // Kakao Map Initialization
  useEffect(() => {
    if (activeTab === 'PILGRIMAGE' && typeof window !== 'undefined' && window.kakao) {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map-container');
        if (!container) return;
        
        const options = {
          center: new window.kakao.maps.LatLng(userLocation?.lat || 37.5665, userLocation?.lng || 126.9780),
          level: 4
        };
        
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        // Custom Overlay logic for markers
        processedStores.forEach(store => {
          const markerPosition = new window.kakao.maps.LatLng(store.lat, store.lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            setSelectedStore(store as any);
          });
        });
      });
    }
  }, [activeTab, processedStores, userLocation]);

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-zinc-950 overflow-hidden antialiased">
      {/* 🔴 Persistent Results Hub */}
      <div className="bg-zinc-950 text-white px-8 py-3 flex justify-between items-center z-[60] shrink-0 shadow-2xl">
        <div className="flex items-center space-x-4">
            <span className="text-[10px] font-black bg-indigo-600 px-2 py-0.5 rounded tracking-tighter">1205회</span>
            <div className="flex space-x-1.5 font-mono">
                {[8, 16, 28, 30, 31, 44].map(n => (
                    <span key={n} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-lg text-[10px] font-black">{n}</span>
                ))}
                <span className="text-white/30 px-0.5">+</span>
                <span className="w-6 h-6 flex items-center justify-center bg-indigo-500/30 text-indigo-400 rounded-lg text-[10px] font-black">27</span>
            </div>
        </div>
        <div className="flex items-center space-x-6">
            <p className="hidden md:block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Next Jackpot <span className="text-zinc-100 ml-2">2d 14:22:05</span></p>
            <div className="h-4 w-px bg-white/10"></div>
            <button className="p-1 hover:text-indigo-400 transition-colors"><User className="w-5 h-5" /></button>
        </div>
      </div>

      <nav className="bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-8 flex justify-between items-center h-24 shrink-0 z-50">
        <div className="flex items-center space-x-4">
            <div className="bg-zinc-950 p-2.5 rounded-2xl shadow-xl shadow-zinc-200"><Fingerprint className="text-white w-7 h-7" /></div>
            <h1 className="text-2xl font-black tracking-tighter">LottoShrine</h1>
        </div>

        {/* 🎯 Diet Navigation (Action Oriented) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex space-x-2 bg-zinc-100/50 p-1.5 rounded-[24px]">
            {[
                { id: 'PILGRIMAGE', icon: MapIcon, label: '성지순례' },
                { id: 'LAB', icon: Cpu, label: '추출연구소' },
                { id: 'WALL', icon: Users, label: '담벼락' },
            ].map(tab => (
                <button 
                    key={tab.id} 
                    onClick={() => { setActiveTab(tab.id as any); setSelectedStore(null); }} 
                    className={`px-8 py-3 rounded-[20px] flex items-center space-x-3 transition-all duration-300 ${activeTab === tab.id ? 'bg-white text-zinc-950 shadow-[0_8px_16px_rgba(0,0,0,0.08)] scale-105 font-black' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-indigo-600' : ''}`} />
                    <span className="text-sm tracking-tight">{tab.label}</span>
                </button>
            ))}
        </div>

        <div className="flex space-x-3">
            <button onClick={() => setActiveTab('LAB')} className="hidden md:flex items-center space-x-2 px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-xs hover:bg-indigo-100 transition-all">
                <Star className="w-4 h-4 fill-current" />
                <span>Premium</span>
            </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 relative h-full">
            {activeTab === 'PILGRIMAGE' && (
                <div className="h-full w-full relative bg-zinc-50 animate-in fade-in duration-700">
                    <div id="map-container" className="h-full w-full opacity-90 grayscale-[0.1]"></div>
                    {/* Simplified Sidebar */}
                    {!selectedStore && (
                        <aside className={`absolute top-6 left-6 z-20 h-[calc(100%-3rem)] bg-white border border-zinc-200/60 rounded-[32px] shadow-2xl transition-all duration-500 ease-out ${isSidebarOpen ? 'w-full md:w-[420px]' : 'w-0 overflow-hidden'}`}>
                           <div className="flex flex-col h-full">
                              <div className="p-10 pb-6">
                                <div className="flex justify-between items-center mb-8"><h2 className="text-3xl font-black tracking-tight">성지 탐색</h2><button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-zinc-50 rounded-full hover:bg-zinc-100 transition-colors"><X className="w-6 h-6 text-zinc-400" /></button></div>
                                <div className="relative group"><Search className="absolute left-5 top-5 text-zinc-300 w-6 h-6 group-focus-within:text-indigo-600 transition-colors" /><input type="text" placeholder="지역이나 매장 검색" className="w-full pl-14 pr-6 py-5 bg-zinc-50 border border-zinc-100 rounded-3xl text-lg focus:ring-4 focus:ring-indigo-500/10 font-black transition-all outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                              </div>
                              <div className="flex-1 overflow-y-auto px-6 space-y-px scrollbar-hide pb-10">
                                 {processedStores.map(s => (
                                    <div key={`${s.id}-${s.address}`} onClick={() => setSelectedStore(s as any)} className="p-6 rounded-3xl hover:bg-zinc-50 cursor-pointer transition-all flex items-center space-x-5 group border border-transparent hover:border-zinc-100">
                                        <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400 font-black group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors text-xl">{s.winCount1st}</div>
                                        <div className="flex-1 min-w-0"><h3 className="font-black text-lg truncate mb-1">{s.name}</h3><p className="text-xs text-zinc-400 truncate font-bold uppercase">{s.address}</p></div>
                                        <ChevronRight className="w-6 h-6 text-zinc-200" />
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </aside>
                    )}
                </div>
            )}

            {/* 🧪 New: 'LAB' (Integrated Extraction + Stats + Vault) */}
            {activeTab === 'LAB' && (
                <div className="h-full overflow-y-auto bg-zinc-50 scrollbar-hide animate-in slide-in-from-bottom duration-700">
                    <div className="max-w-7xl mx-auto py-16 px-10 space-y-16">
                        <header className="text-center space-y-4">
                            <h2 className="text-6xl font-black tracking-tighter text-zinc-950">STRATEGY LAB</h2>
                            <p className="text-zinc-400 text-xl font-bold uppercase tracking-widest">통계 기반 AI 추출 및 디지털 금고</p>
                        </header>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                            {/* 1. Extraction Tool */}
                            <section className="bg-white/50 backdrop-blur-sm p-2 rounded-[48px] border border-white">
                                <OracleVault dailyOracle={dailyOracle} continuity={continuity} onGenerate={() => setDailyOracle(generateDailyOracle("user-123", continuity))} />
                            </section>
                            
                            {/* 2. Real-time Insights */}
                            <section className="bg-white/50 backdrop-blur-sm p-2 rounded-[48px] border border-white">
                                <InsightsDashboard 
                                    frequencyData={{
                                        labels:['34', '18', '27', '1', '43'], 
                                        datasets:[{
                                            data:[152, 148, 145, 142, 140], 
                                            backgroundColor:'#4F46E5', 
                                            borderRadius:12,
                                            barThickness: 24
                                        }]
                                    }} 
                                    chartOptions={{
                                        responsive:true, 
                                        maintainAspectRatio: false,
                                        plugins:{legend:{display:false}}, 
                                        scales:{
                                            x:{grid:{display:false}, ticks:{font:{weight:'900'}}},
                                            y:{display:false}
                                        }
                                    }} 
                                />
                                <div className="mt-8 bg-zinc-950 text-white rounded-[32px] p-8 space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">Expert Filtering</h4>
                                    <ul className="space-y-3">
                                        {['홀짝 비율 3:3 유지', '최근 5주 미출현수 2개 포함', '번호 총합 130-160 구간'].map(f => (
                                            <li key={f} className="flex items-center font-bold text-[11px] text-zinc-300">
                                                <CheckCircle2 className="w-4 h-4 mr-3 text-indigo-500" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* 3. QR Vault */}
                            <section className="bg-white/50 backdrop-blur-sm p-2 rounded-[48px] border border-white">
                                <MyLotto />
                            </section>
                        </div>
                    </div>
                </div>
            )}


            {activeTab === 'WALL' && <CommunityWall posts={posts} />}
        </main>
      </div>

      {/* Floating Action for Lab Mobile */}
      <div className="fixed bottom-10 right-10 z-50 md:hidden">
          <button onClick={() => setActiveTab('LAB')} className="bg-indigo-600 text-white w-20 h-20 rounded-[32px] shadow-2xl flex items-center justify-center animate-bounce hover:scale-110 active:scale-95 transition-all"><Zap className="w-10 h-10 fill-current" /></button>
      </div>
    </div>
  );
}