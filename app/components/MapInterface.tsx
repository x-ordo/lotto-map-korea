'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Navigation, Menu, X, ChevronRight, MapPin, Sparkles, Trophy, Star, Award, Dices, TrendingUp, Bike, Ship, Flag, PhoneCall, Map as MapIcon, Filter, LocateFixed, AlertTriangle, QrCode, BarChart3, ListOrdered, Info, ExternalLink, CheckCircle2, FileText, PieChart, Zap, Timer, Flame, CloudMoon, Moon, MessageCircle, Download, ShieldCheck, Wallet, Newspaper, HelpCircle, ArrowUpRight, ZapOff, Activity, LayoutDashboard, Share2, Lock, Unlock } from 'lucide-react';
import { LotteryStore, StoreType, LuckAnalysis, DreamInterpretation, TabType } from '../../lib/types';
import { analyzeLuckLocal } from '../../lib/luckEngine';
import { MOCK_STORES } from '../../lib/data';
import DREAM_DATA from '../../data/dream_mapping.json';
import KNOWLEDGE_DATA from '../../data/lotto_knowledge.json';
import EXPERT_REPORT from '../../data/expert_report.json';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler);

declare global { interface Window { kakao: any; } }

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const a = Math.sin((lat2 - lat1) * Math.PI / 360) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin((lon2 - lon1) * Math.PI / 360) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export default function MapInterface() {
  const [activeTab, setActiveTab] = useState<TabType>('MAP');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [selectedStore, setSelectedStore] = useState<LotteryStore | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dreamSearch, setDreamSearch] = useState('');
  const [sortBy, setSortBy] = useState<'WIN' | 'DISTANCE'>('WIN');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [analysis, setAnalysis] = useState<LuckAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        null, { enableHighAccuracy: true }
      );
    }
  }, []);

  const processedStores = useMemo(() => {
    return MOCK_STORES.map(s => {
        const dist = userLocation ? getDistance(userLocation.lat, userLocation.lng, s.lat, s.lng) : 100000;
        return {
            ...s,
            luckIndex: 75 + (s.winCount1st * 3) + Math.floor(Math.random() * 5),
            distance: dist,
            // 500m 이내 접근 시 기운 활성화 (Market Eater 전략)
            isEnergized: dist < 500,
            isLive: Math.random() > 0.8
        };
    }).filter(s => s.name.includes(searchTerm) || s.address.includes(searchTerm))
    .sort((a, b) => {
      if (sortBy === 'DISTANCE') return (a.distance || 0) - (b.distance || 0);
      return b.winCount1st - a.winCount1st;
    });
  }, [searchTerm, sortBy, userLocation]);

  const filteredDreams = useMemo(() => {
    return (DREAM_DATA as DreamInterpretation[]).filter(d => d.keyword.includes(dreamSearch));
  }, [dreamSearch]);

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

  const openNaverMap = (store: LotteryStore) => {
    window.open(`https://map.naver.com/v5/search/${encodeURIComponent(store.address)}`, 'naver_map_window');
  };

  const handleAnalyze = async () => {
    if (!selectedStore) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(analyzeLuckLocal(selectedStore));
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-slate-900 overflow-hidden antialiased">
      {/* Predator Style Header (Toss/Zenly Inspiration) */}
      <nav className="bg-white border-b px-6 flex justify-between items-center h-24 shrink-0 z-50">
        <div className="flex items-center space-x-4">
            <div className="bg-black p-3 rounded-[24px] shadow-2xl shadow-indigo-500/40 animate-pulse transition-transform hover:scale-110"><Zap className="text-yellow-400 w-7 h-7 fill-yellow-400" /></div>
            <div>
                <h1 className="text-2xl font-black tracking-tighter leading-none">LottoShrine <span className="text-indigo-600">.</span></h1>
                <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase mt-1">Digital Destiny Guide</p>
            </div>
        </div>
        <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-[24px]">
            {[
                { id: 'MAP', icon: MapIcon, label: '성지순례' },
                { id: 'RANK', icon: ListOrdered, label: '명예의전당' },
                { id: 'DREAM', icon: Moon, label: '꿈의계시' },
                { id: 'HELP', icon: HelpCircle, label: '이용안내' },
            ].map(tab => (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id as TabType); setSelectedStore(null); }} className={`px-5 py-2.5 rounded-[20px] flex items-center space-x-2 transition-all duration-500 ${activeTab === tab.id ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-400 hover:text-slate-600'}`}>
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-indigo-600' : ''}`} />
                    <span className="text-xs font-black whitespace-nowrap">{tab.label}</span>
                </button>
            ))}
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 relative h-full">
            {activeTab === 'MAP' && (
                <div className="h-full w-full relative">
                    <div id="map-container" className="h-full w-full bg-slate-100"></div>
                    {!selectedStore && (
                        <aside className={`absolute top-6 left-6 z-20 h-[calc(100%-3rem)] bg-white/90 backdrop-blur-3xl border border-white/20 rounded-[48px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] transition-all duration-700 ease-in-out ${isSidebarOpen ? 'w-full md:w-[420px]' : 'w-0 overflow-hidden opacity-0'}`}>
                           <div className="flex flex-col h-full p-10">
                              <div className="space-y-8 mb-10">
                                <div className="flex justify-between items-center"><h2 className="text-3xl font-black tracking-tighter text-slate-900">영험한 매장 찾기</h2><button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-all"><X className="w-6 h-6" /></button></div>
                                <div className="relative group"><Search className="absolute left-6 top-5 text-slate-400 w-6 h-6 group-focus-within:text-indigo-600 transition-colors" /><input type="text" placeholder="기운이 흐르는 지역 검색..." className="w-full pl-16 pr-6 py-5 bg-slate-100 border-none rounded-[32px] text-base focus:ring-4 focus:ring-indigo-500/10 font-black placeholder:text-slate-300 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                              </div>
                              <div className="flex-1 overflow-y-auto space-y-5 pr-2 scrollbar-hide pb-10">
                                 {processedStores.map(s => (
                                    <div key={`${s.id}-${s.address}`} onClick={() => setSelectedStore(s as any)} className="p-8 rounded-[48px] bg-white border border-slate-100 hover:border-indigo-500 hover:shadow-[0_24px_48px_-12px_rgba(79,70,229,0.15)] cursor-pointer transition-all duration-500 flex items-center space-x-5 group relative">
                                        {(s as any).isEnergized && <div className="absolute top-4 right-8"><span className="bg-red-500 text-white text-[8px] px-2 py-1 rounded-full animate-pulse font-black">기운 감지</span></div>}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-black text-lg group-hover:text-indigo-600 truncate mb-1">{s.name}</h3>
                                            <p className="text-xs text-slate-400 truncate font-bold">{s.address}</p>
                                            <div className="flex items-center space-x-3 mt-5">
                                                <span className={`text-[10px] font-black px-4 py-1.5 rounded-full flex items-center transition-colors ${(s as any).isEnergized ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}><Zap className="w-3 h-3 mr-1.5" /> LUCK {(s as any).luckIndex}</span>
                                                <span className="text-[10px] font-black text-slate-400">{(s.distance!/1000).toFixed(1)}km</span>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-[20px] group-hover:bg-indigo-600 group-hover:text-white transition-all"><ChevronRight className="w-6 h-6" /></div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </aside>
                    )}
                </div>
            )}

            {/* 나머지 탭 로직 (RANK, DREAM, HELP) - v2.6 구조 유지하되 마케팅 문구만 수정 */}
            {activeTab === 'DREAM' && (
                <div className="h-full overflow-y-auto p-12 bg-black text-white animate-in slide-in-from-right duration-700">
                    <div className="max-w-2xl mx-auto space-y-12 py-10">
                        <header className="text-center space-y-6">
                            <div className="w-32 h-32 bg-indigo-600/20 rounded-[60px] flex items-center justify-center mx-auto border border-white/10 shadow-[0_0_80px_-10px_rgba(79,70,229,0.4)]"><Moon className="w-16 h-12 text-yellow-400 animate-pulse fill-yellow-400" /></div>
                            <div className="space-y-3"><h2 className="text-6xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Dream Oracle</h2><p className="text-indigo-300 font-black text-lg tracking-widest uppercase">무의식의 암호를 해독하십시오.</p></div>
                        </header>
                        <div className="relative group"><Search className="absolute left-10 top-8 text-slate-600 w-8 h-8" /><input type="text" placeholder="어젯밤의 꿈 키워드..." className="w-full pl-24 pr-10 py-8 bg-white/5 border border-white/10 rounded-[60px] text-3xl focus:ring-4 focus:ring-indigo-500/20 font-black outline-none transition-all placeholder:text-slate-800" value={dreamSearch} onChange={(e) => setDreamSearch(e.target.value)} /></div>
                        <div className="grid grid-cols-1 gap-10">
                            {filteredDreams.map((d, i) => (
                                <div key={`dream-${i}`} className="p-12 bg-white/5 border border-white/5 rounded-[80px] hover:bg-white/10 transition-all group border-l-[20px] border-l-yellow-400/50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.02]"><Sparkles className="w-48 h-48" /></div>
                                    <div className="flex justify-between items-start mb-10"><h3 className="text-4xl font-black text-yellow-400 tracking-tighter">#{d.keyword}</h3><div className="flex space-x-3">{d.numbers.map(n => (<span key={`${d.keyword}-${n}`} className="w-14 h-14 flex items-center justify-center bg-indigo-600 rounded-full text-xl font-black shadow-[0_8px_32px_rgba(0,0,0,0.4)]">{n}</span>))}</div></div>
                                    <p className="text-2xl text-slate-300 leading-relaxed font-bold italic">"{d.meaning}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>

        {/* Intelligence Side Panel - The Shrine Narrative */}
        {selectedStore && (
            <aside className="absolute inset-0 md:relative md:w-[550px] bg-white z-[60] animate-in slide-in-from-right duration-500 shadow-[0_0_100px_rgba(0,0,0,0.2)] flex flex-col border-l border-slate-100">
                <div className="p-10 border-b flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10"><button onClick={() => setSelectedStore(null)} className="p-5 hover:bg-slate-100 rounded-[32px] transition-all active:scale-90"><X className="w-10 h-10" /></button><div className="flex flex-col items-center"><h3 className="font-black text-[10px] tracking-[0.5em] uppercase text-indigo-600">Sacred Profile</h3><div className="w-8 h-1 bg-indigo-600 mt-1 rounded-full"></div></div><button className="p-5 hover:bg-slate-100 rounded-[32px] text-indigo-600 transition-all"><Share2 className="w-8 h-8" /></button></div>
                <div className="p-12 overflow-y-auto flex-1 space-y-12 scrollbar-hide pb-32">
                    <section className="space-y-8">
                        <div className="flex items-center space-x-3">
                            <span className="px-5 py-2 bg-black text-white text-[10px] font-black rounded-full shadow-2xl">LEVEL 1 SHRINE</span>
                            <span className={`px-5 py-2 text-[10px] font-black rounded-full border flex items-center ${(selectedStore as any).isEnergized ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                {(selectedStore as any).isEnergized ? <Unlock className="w-3 h-3 mr-2 fill-white" /> : <Lock className="w-3 h-3 mr-2" />}
                                {(selectedStore as any).isEnergized ? '기운 활성화됨' : '500m 이내 접근 필요'}
                            </span>
                        </div>
                        <h2 className="text-6xl font-black text-slate-900 leading-[1] tracking-tighter">{selectedStore.name}</h2>
                        <p className="text-xl text-slate-400 font-bold leading-relaxed flex items-start"><MapPin className="w-7 h-7 mr-4 shrink-0 text-indigo-500 mt-1" />{selectedStore.address}</p>
                    </section>

                    {/* Besuch Reward Logic (Hyper-Local Destiny) */}
                    <div className={`p-1 w-full rounded-[60px] transition-all duration-1000 ${(selectedStore as any).isEnergized ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[0_32px_64px_-12px_rgba(79,70,229,0.5)]' : 'bg-slate-200'}`}>
                        <div className="bg-white rounded-[59px] p-12 text-center space-y-8">
                            {!(selectedStore as any).isEnergized ? (
                                <>
                                    <div className="w-24 h-24 bg-slate-100 rounded-[40px] flex items-center justify-center mx-auto"><Lock className="w-10 h-10 text-slate-300" /></div>
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-black tracking-tight text-slate-900">현장 방문시 번호 공개</h3>
                                        <p className="text-slate-400 font-bold text-sm leading-relaxed">이 매장은 현재 비활성 상태입니다.<br/>반경 500m 이내로 접근하여 기운을 깨우세요.</p>
                                    </div>
                                    <button onClick={() => alert('GPS 인증을 시도합니다.')} className="w-full bg-slate-900 text-white font-black py-6 rounded-[32px] flex items-center justify-center space-x-3 active:scale-95 transition-all shadow-xl shadow-slate-200"><LocateFixed className="w-5 h-5" /> <span>현장 기운 인증하기</span></button>
                                </>
                            ) : (
                                <div className="animate-in zoom-in duration-1000 space-y-8">
                                    <div className="w-24 h-24 bg-indigo-600 rounded-[40px] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-200"><Unlock className="w-10 h-10 text-white" /></div>
                                    <div className="space-y-3">
                                        <h3 className="text-3xl font-black tracking-tighter text-indigo-600 italic">Destiny Unlocked !</h3>
                                        <p className="text-slate-500 font-black text-xs uppercase tracking-widest">방문 인증 성공: 전용 행운 번호가 활성화되었습니다.</p>
                                    </div>
                                    <div className="flex justify-between px-4">
                                        {[7, 14, 22, 33, 39, 45].map(n => (
                                            <span key={n} className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full font-black text-sm shadow-xl hover:scale-125 transition-transform cursor-pointer">{n}</span>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-indigo-400 font-black italic">"오늘 당신의 발걸음이 행운의 시작점이 될 것입니다."</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Narrative Analysis Card */}
                    <div className="bg-slate-900 rounded-[64px] p-12 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-10 opacity-10"><Sparkles className="w-48 h-48 text-yellow-400" /></div>
                        {!analysis ? (
                            <div className="text-center relative z-10 space-y-10 py-6">
                                <h3 className="text-4xl font-black tracking-tighter">오늘의 기운을<br/>점지하시겠습니까?</h3>
                                <button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full bg-yellow-400 text-black font-black py-7 rounded-[36px] shadow-[0_20px_40px_-10px_rgba(250,204,21,0.4)] active:scale-95 transition-all text-xl uppercase tracking-tighter">기운 확인하기</button>
                            </div>
                        ) : (
                            <div className="space-y-12 relative z-10 animate-in zoom-in duration-700">
                                <div><p className="text-indigo-300 text-[11px] font-black uppercase tracking-[0.5em] mb-4">Oracle Score</p><p className="text-9xl font-black text-yellow-400 tracking-tighter leading-none">{analysis.score}<span className="text-4xl text-white/20 ml-2">/100</span></p></div>
                                <p className="text-3xl font-black leading-[1.2] text-white">"{analysis.insights}"</p>
                                <div className="grid grid-cols-2 gap-4"><button className="bg-white text-black font-black py-6 rounded-[32px] text-xs flex flex-col items-center justify-center shadow-2xl active:scale-90 transition-all"><MessageCircle className="w-6 h-6 mb-2" /> 행운 전달</button><button className="bg-white/10 text-white font-black py-6 rounded-[32px] text-xs flex flex-col items-center justify-center border border-white/20 active:scale-90 transition-all"><Download className="w-6 h-6 mb-2" /> 기운 저장</button></div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        )}
      </div>

      <div className="absolute bottom-12 right-12 z-50 flex flex-col space-y-6">
          <button onClick={() => setActiveTab('HELP')} className="bg-white w-20 h-20 rounded-[36px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)] flex items-center justify-center text-indigo-600 border border-slate-50 transition-all hover:scale-110 active:scale-90"><Info className="w-10 h-10" /></button>
          {activeTab === 'MAP' && (
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden bg-black w-20 h-20 rounded-[36px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)] flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90">{isSidebarOpen ? <X className="w-10 h-10" /> : <Search className="w-10 h-10" />}</button>
          )}
      </div>
    </div>
  );
}
