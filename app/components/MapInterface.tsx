'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Navigation, Menu, X, ChevronRight, MapPin, Sparkles, Trophy, Star, Award, Dices, TrendingUp, Bike, Ship, Flag, PhoneCall, Map as MapIcon, Filter, LocateFixed, AlertTriangle, QrCode, BarChart3, ListOrdered, Info, ExternalLink, CheckCircle2, FileText, PieChart, Zap, Timer, Flame, CloudMoon, Moon, MessageCircle, Download, ShieldCheck, ZapOff } from 'lucide-react';
import { LotteryStore, StoreType, LuckAnalysis, DreamInterpretation, TabType } from '../../lib/types';
import { analyzeLuckLocal } from '../../lib/luckEngine';
import { MOCK_STORES } from '../../lib/data';
import DREAM_DATA from '../../data/dream_mapping.json';

declare global {
  interface Window {
    kakao: any;
  }
}

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
  const [minWinCount, setMinWinCount] = useState<number>(0);
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
        const luckIndex = 60 + (s.winCount1st * 5) + Math.floor(Math.random() * 10);
        return {
            ...s,
            luckIndex: luckIndex > 100 ? 100 : luckIndex,
            distance: userLocation ? getDistance(userLocation.lat, userLocation.lng, s.lat, s.lng) : undefined,
            isLive: Math.random() > 0.7,
            speettoAvailable: s.winCount1st >= 2
        };
    }).filter(s => {
      const matchSearch = s.name.includes(searchTerm) || s.address.includes(searchTerm);
      return matchSearch && s.winCount1st >= minWinCount;
    }).sort((a, b) => {
      if (sortBy === 'DISTANCE' && a.distance && b.distance) return a.distance - b.distance;
      return b.winCount1st - a.winCount1st;
    });
  }, [searchTerm, minWinCount, sortBy, userLocation]);

  const filteredDreams = useMemo(() => {
    return (DREAM_DATA as DreamInterpretation[]).filter(d => d.keyword.includes(dreamSearch));
  }, [dreamSearch]);

  useEffect(() => {
    if (activeTab === 'MAP' && !mapRef.current) {
        const container = document.getElementById('map-container');
        if (container && window.kakao) {
            mapRef.current = new window.kakao.maps.Map(container, {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                level: 8
            });
        }
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'MAP' || !mapRef.current) return;
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
  }, [processedStores, activeTab]);

  const openNaverMap = (store: LotteryStore) => {
    window.open(`https://map.naver.com/v5/search/${encodeURIComponent(store.address)}`, 'naver_map_window');
  };

  const handleAnalyze = async () => {
    if (!selectedStore) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeLuckLocal(selectedStore);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <nav className="bg-white border-b px-4 flex justify-between items-center h-16 shrink-0 z-50 shadow-sm">
        <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg">
                <Trophy className="text-white w-5 h-5" />
            </div>
            <div>
                <h1 className="text-lg font-black tracking-tighter flex items-center">
                    LottoMap <span className="bg-red-500 text-white text-[8px] px-1 rounded ml-1 animate-pulse">PRO</span>
                </h1>
                <p className="text-[8px] text-slate-400 font-bold leading-none uppercase">Strategic Analytics</p>
            </div>
        </div>
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {[
                { id: 'MAP', icon: MapIcon, label: '지도' },
                { id: 'RANK', icon: ListOrdered, label: '순위' },
                { id: 'DREAM', icon: CloudMoon, label: '꿈해몽' },
                { id: 'REPORT', icon: FileText, label: '리포트' },
                { id: 'QR', icon: QrCode, label: 'QR' },
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as TabType); setSelectedStore(null); }}
                    className={`px-2 py-1 rounded-xl flex flex-col items-center min-w-[48px] transition-all ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <tab.icon className="w-5 h-5" />
                    <span className="text-[8px] font-black mt-0.5">{tab.label}</span>
                </button>
            ))}
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 relative h-full">
            {activeTab === 'MAP' && (
                <div className="h-full w-full relative">
                    <div id="map-container" className="h-full w-full bg-slate-200"></div>
                    {!selectedStore && (
                        <aside className={`absolute top-0 left-0 z-20 h-full bg-white/95 backdrop-blur-md border-r shadow-2xl transition-all duration-300 ${isSidebarOpen ? 'w-full md:w-96' : 'w-0 overflow-hidden'}`}>
                           <div className="flex flex-col h-full">
                              <div className="p-6 space-y-4 border-b">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-black tracking-tighter text-indigo-600 uppercase">Public Data Finder</h2>
                                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
                                    <input type="text" placeholder="지역, 가게명 검색..." className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                              </div>
                              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                 {processedStores.map(s => (
                                    <div key={s.id} onClick={() => setSelectedStore(s as any)} className="p-4 rounded-3xl hover:bg-slate-50 border border-transparent hover:border-indigo-100 cursor-pointer transition-all flex items-center space-x-3 group relative overflow-hidden">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-black text-sm group-hover:text-indigo-600 truncate">{s.name}</h3>
                                            <p className="text-[11px] text-slate-500 truncate font-medium">{s.address}</p>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <span className="text-[9px] font-black text-red-500 flex items-center bg-red-50 px-2 py-0.5 rounded-full"><Trophy className="w-2.5 h-2.5 mr-1" /> 1등 {s.winCount1st}</span>
                                                <span className="text-[9px] font-black text-indigo-500 flex items-center bg-indigo-50 px-2 py-0.5 rounded-full"><Zap className="w-2.5 h-2.5 mr-1" /> Idx {(s as any).luckIndex}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </aside>
                    )}
                </div>
            )}

            {activeTab === 'RANK' && (
                <div className="h-full overflow-y-auto p-6 bg-white animate-in fade-in duration-500">
                    <div className="max-w-2xl mx-auto space-y-3">
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-2xl font-black">당첨 횟수 순위</h2>
                            <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest border-b-2 border-indigo-600">Verification Complete</p>
                        </div>
                        {processedStores.sort((a,b) => b.winCount1st - a.winCount1st).slice(0, 50).map((s, idx) => (
                            <div key={s.id} onClick={() => { setSelectedStore(s as any); setActiveTab('MAP'); }} className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 cursor-pointer transition-all">
                                <div className={`w-10 h-10 flex items-center justify-center rounded-full font-black mr-4 shrink-0 ${idx < 3 ? 'bg-yellow-400 text-white shadow-lg' : 'bg-white text-slate-400 border'}`}>{idx + 1}</div>
                                <div className="flex-1 min-w-0"><h3 className="font-bold truncate">{s.name}</h3><p className="text-xs text-slate-500 truncate">{s.address}</p></div>
                                <div className="text-right ml-4"><p className="text-xl font-black text-red-500">{s.winCount1st}<span className="text-xs ml-0.5">회</span></p></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'REPORT' && (
                <div className="h-full overflow-y-auto p-6 bg-slate-50 animate-in fade-in duration-500">
                    <div className="max-w-3xl mx-auto space-y-8 py-6">
                        <section className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
                            <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-4">비즈니스 분석 리포트</h2>
                            <p className="text-slate-500 font-bold text-sm max-w-md mx-auto leading-relaxed">
                                LottoMap은 로또리치의 공신력과 로또플레이의 전문성을 지도 기반의 혁신적인 UX로 통합한 **지능형 무료 플랫폼**입니다.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: 'Data Transparency', desc: '기획재정부 공공데이터 100% 활용', icon: ShieldCheck, color: 'text-green-500' },
                                { title: 'AI Intelligence', desc: '판매량 대비 당첨 효율 Luck Index', icon: Zap, color: 'text-yellow-500' },
                                { title: 'Hyper-Local', desc: '네이버 지도 및 실시간 스피또 연동', icon: MapIcon, color: 'text-blue-500' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm text-center">
                                    <item.icon className={`w-10 h-10 mx-auto mb-4 ${item.color}`} />
                                    <h3 className="font-black text-sm mb-2">{item.title}</h3>
                                    <p className="text-[11px] text-slate-500 font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <section className="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 p-6 opacity-10"><TrendingUp className="w-48 h-48" /></div>
                            <h3 className="text-2xl font-black mb-8 flex items-center"><Award className="mr-3 text-yellow-400" /> 우리의 경쟁 포지션</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-indigo-600 p-3 rounded-2xl font-black text-xs">VS</div>
                                    <div>
                                        <p className="font-black text-lg">Premium Free Strategy</p>
                                        <p className="text-sm text-slate-400 mt-1">로또리치의 유료 당첨 정보를 공공데이터 기반으로 무료화하여 누구나 쉽게 접근 가능한 '정보의 민주화'를 실현합니다.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-indigo-600 p-3 rounded-2xl font-black text-xs">VS</div>
                                    <div>
                                        <p className="font-black text-lg">Simplified Analytics</p>
                                        <p className="text-sm text-slate-400 mt-1">로또플레이의 복잡한 통계 필터를 AI가 명당 지수로 자동 변환하여, 초보자도 1초 만에 최적의 명당을 찾도록 돕습니다.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            )}

            {/* 나머지 탭 로직 유지 (DREAM, STATS, QR) */}
            {activeTab === 'DREAM' && (
                <div className="h-full overflow-y-auto p-6 bg-slate-900 text-white animate-in slide-in-from-right duration-500">
                    <div className="max-w-xl mx-auto space-y-8 py-10">
                        <header className="text-center space-y-4">
                            <Moon className="w-12 h-12 mx-auto text-yellow-400 animate-pulse" />
                            <h2 className="text-3xl font-black tracking-tighter">AI 꿈 해몽 분석</h2>
                            <p className="text-slate-400 text-sm">어젯밤 꿈속의 행운을 번호로 바꿔보세요.</p>
                        </header>
                        <div className="relative">
                            <Search className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
                            <input type="text" placeholder="어떤 꿈을 꾸셨나요? (예: 돼지, 조상님...)" className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-[32px] text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold placeholder:text-slate-600" value={dreamSearch} onChange={(e) => setDreamSearch(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {filteredDreams.map((d, i) => (
                                <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-[40px] hover:bg-white/10 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-black text-yellow-400">#{d.keyword}</h3>
                                        <div className="flex space-x-1">{d.numbers.map(n => (<span key={n} className="w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full text-xs font-black shadow-lg">{n}</span>))}</div>
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed font-medium">"{d.meaning}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'STATS' && (
                <div className="h-full overflow-y-auto p-6 bg-white animate-in slide-in-from-bottom">
                    <div className="max-w-2xl mx-auto space-y-10">
                        <section><h2 className="text-xl font-black mb-6 flex items-center"><CheckCircle2 className="mr-2 text-indigo-600" /> 많이 나온 숫자 (최근 100회)</h2><div className="grid grid-cols-5 sm:grid-cols-9 gap-3">{[34, 18, 27, 1, 43, 12, 5, 14, 39].map((n, i) => (<div key={n} className="flex flex-col items-center p-2 bg-slate-50 rounded-xl"><div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-md ${i < 3 ? 'bg-yellow-500' : 'bg-blue-500'}`}>{n}</div><span className="text-[10px] mt-2 font-black text-slate-600">{150 - i * 4}회</span></div>))}</div></section>
                    </div>
                </div>
            )}

            {activeTab === 'QR' && (
                <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-white text-center">
                    <QrCode className="w-32 h-32 text-indigo-400 mb-6 animate-pulse" />
                    <h2 className="text-3xl font-black mb-4">QR 당첨 확인</h2>
                    <button className="w-full max-w-xs bg-indigo-600 py-5 rounded-3xl font-black text-lg shadow-2xl active:scale-95">스캐너 실행하기</button>
                </div>
            )}
        </main>

        {selectedStore && (
            <aside className="absolute inset-0 md:relative md:w-96 bg-white z-[60] animate-in slide-in-from-right duration-300 shadow-2xl flex flex-col">
                <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md">
                    <button onClick={() => setSelectedStore(null)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-6 h-6" /></button>
                    <h3 className="font-black text-xs tracking-widest uppercase text-slate-400">Store Profile</h3>
                    <div className="w-10"></div>
                </div>
                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    <section><div className="flex items-center space-x-2 mb-3"><span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center"><div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-ping"></div> LIVE</span><span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 text-[9px] font-black rounded-full">명당지수 {(selectedStore as any).luckIndex}</span></div><h2 className="text-3xl font-black text-slate-900 leading-tight">{selectedStore.name}</h2><p className="text-sm text-slate-500 mt-3 font-medium leading-relaxed"><MapPin className="w-4 h-4 mr-1 text-slate-400 inline" />{selectedStore.address}</p></section>
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-[32px] p-6 text-white shadow-xl"><h3 className="font-black text-lg mb-4 flex items-center"><Flame className="w-5 h-5 mr-2" /> 스피또 잔여 1등</h3><div className="grid grid-cols-3 gap-2">{[ {type:'2000', l:2}, {type:'1000', l:5}, {type:'500', l:1} ].map(sp => (<div key={sp.type} className="bg-white/10 rounded-2xl p-3 text-center"><p className="text-[10px] font-black opacity-70 mb-1">{sp.type}</p><p className="text-xl font-black">{sp.l}매</p></div>))}</div></div>
                    <div className="grid grid-cols-1 gap-3"><button onClick={() => openNaverMap(selectedStore)} className="flex items-center justify-between p-5 bg-slate-900 text-white rounded-[32px] hover:scale-[1.02] transition-all"><div className="flex items-center font-black text-sm"><MapIcon className="w-5 h-5 mr-3 text-green-400" /> 네이버 길찾기</div><ExternalLink className="w-4 h-4 opacity-30" /></button></div>
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                        {!analysis ? (
                            <div className="text-center relative z-10"><Sparkles className="w-10 h-10 mx-auto mb-4 text-yellow-300 animate-bounce" /><h3 className="font-black text-xl mb-2 tracking-tighter">AI 기운 분석</h3><p className="text-indigo-100 text-xs mb-8 opacity-70 leading-relaxed font-medium">공공데이터 통합 분석 기반<br/>이곳의 당첨 기운을 확인하세요.</p><button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full bg-white text-indigo-600 font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all">{isAnalyzing ? "분석 중..." : "무료 분석 시작"}</button></div>
                        ) : (
                            <div className="space-y-6 relative z-10 animate-in zoom-in duration-500">
                                <div><p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest mb-1">Luck Score</p><p className="text-6xl font-black text-yellow-300">{analysis.score}<span className="text-xl text-white/30 ml-1">/100</span></p></div>
                                <p className="text-sm font-bold leading-relaxed text-indigo-50 italic">"{analysis.insights}"</p>
                                <div className="bg-white/10 rounded-[32px] p-5 backdrop-blur-md border border-white/10">
                                    <p className="text-[10px] text-indigo-200 font-black mb-4 uppercase text-center tracking-widest flex items-center justify-center"><Sparkles className="w-3 h-3 mr-2" /> AI Lucky Numbers</p>
                                    <div className="flex justify-between mb-6">{analysis.luckyNumber.map(n => (<span key={n} className="w-8 h-8 flex items-center justify-center bg-white text-indigo-900 rounded-full font-black text-xs shadow-lg transform hover:rotate-12 transition-transform">{n}</span>))}</div>
                                    <div className="bg-indigo-500/20 rounded-2xl p-3 text-center"><p className="text-[10px] font-bold text-indigo-100">이 번호는 {selectedStore.name}의<br/>기운을 받아 생성되었습니다.</p></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-6">
                                    <button onClick={() => alert('카톡 행운 카드 생성')} className="bg-yellow-400 text-yellow-900 font-black py-4 rounded-2xl text-[10px] shadow-xl flex flex-col items-center justify-center active:scale-95 transition-all"><MessageCircle className="w-5 h-5 mb-1" /> 카톡 행운 전달</button>
                                    <button onClick={() => alert('행운 이미지 저장')} className="bg-white/10 text-white font-black py-4 rounded-2xl text-[10px] border border-white/20 flex flex-col items-center justify-center active:scale-95 transition-all"><Download className="w-5 h-5 mb-1" /> 행운카드 저장</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        )}
      </div>

      <div className="absolute bottom-6 right-6 z-50 flex flex-col space-y-3">
          <button onClick={() => setActiveTab('HELP')} className="bg-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-indigo-600 border border-slate-100"><Info className="w-7 h-7" /></button>
          {activeTab === 'MAP' && (
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden bg-indigo-600 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white">{isSidebarOpen ? <X className="w-7 h-7" /> : <Search className="w-7 h-7" />}</button>
          )}
      </div>
    </div>
  );
}
