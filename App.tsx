
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  Navigation, 
  Star, 
  Info, 
  Award, 
  ChevronRight,
  TrendingUp,
  X,
  Sparkles,
  MapPin,
  Trophy,
  Dices,
  Flag,
  Ship,
  Bike,
  Menu,
  ChevronUp
} from 'lucide-react';
import L from 'leaflet';
import { MOCK_STORES } from './data/mockStores';
import { LotteryStore, StoreType, LuckAnalysis } from './types';
import { analyzeLuck } from './services/geminiService';

const TYPE_CONFIG: Record<StoreType, { label: string, color: string, icon: React.ReactNode }> = {
  [StoreType.LOTTO]: { label: '로또 6/45', color: 'bg-yellow-500', icon: <Trophy className="w-4 h-4" /> },
  [StoreType.SPORTS_TOTO]: { label: '스포츠토토', color: 'bg-blue-500', icon: <Flag className="w-4 h-4" /> },
  [StoreType.PENSION]: { label: '연금복권', color: 'bg-purple-500', icon: <Star className="w-4 h-4" /> },
  [StoreType.HOTSPOT]: { label: '당첨명당', color: 'bg-red-500', icon: <Award className="w-4 h-4" /> },
  [StoreType.CASINO]: { label: '카지노', color: 'bg-slate-800', icon: <Dices className="w-4 h-4" /> },
  [StoreType.HORSE_RACING]: { label: '경마', color: 'bg-green-600', icon: <TrendingUp className="w-4 h-4" /> },
  [StoreType.BICYCLE_RACING]: { label: '경륜', color: 'bg-orange-500', icon: <Bike className="w-4 h-4" /> },
  [StoreType.BOAT_RACING]: { label: '경정', color: 'bg-cyan-500', icon: <Ship className="w-4 h-4" /> },
};

const App: React.FC = () => {
  const [stores] = useState<LotteryStore[]>(MOCK_STORES);
  const [selectedStore, setSelectedStore] = useState<LotteryStore | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<StoreType | 'ALL'>('ALL');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobileSheetExpanded, setIsMobileSheetExpanded] = useState(false);
  const [analysis, setAnalysis] = useState<LuckAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const filteredStores = useMemo(() => {
    return stores.filter(s => {
      const matchSearch = s.name.includes(searchTerm) || s.address.includes(searchTerm);
      const matchType = activeFilter === 'ALL' || s.type.includes(activeFilter as StoreType);
      return matchSearch && matchType;
    });
  }, [stores, searchTerm, activeFilter]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map-container', { zoomControl: false }).setView([37.5665, 126.9780], 11);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO'
      }).addTo(mapRef.current);
    }

    Object.values(markersRef.current).forEach((m: L.Marker) => m.remove());
    markersRef.current = {};

    filteredStores.forEach(store => {
      const marker = L.circleMarker([store.lat, store.lng], {
        radius: 8,
        fillColor: '#6366f1',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(mapRef.current!);
      
      marker.on('click', () => {
        setSelectedStore(store);
        if (window.innerWidth < 768) setIsMobileSheetExpanded(true);
      });
      markersRef.current[store.id] = marker;
    });
  }, [filteredStores]);

  useEffect(() => {
    if (selectedStore && mapRef.current) {
      mapRef.current.flyTo([selectedStore.lat, selectedStore.lng], 15, { duration: 1 });
      setAnalysis(null);
    }
  }, [selectedStore]);

  const handleAnalyze = async () => {
    if (!selectedStore) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeLuck(selectedStore);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col z-50 bg-white border-r shadow-xl transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-96' : 'w-0 overflow-hidden border-none'}`}>
        <SidebarContent 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filteredStores={filteredStores}
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
          analysis={analysis}
          isAnalyzing={isAnalyzing}
          handleAnalyze={handleAnalyze}
        />
      </aside>

      {/* Main Map Area */}
      <main className="flex-1 relative">
        <div id="map-container" className="h-full w-full z-0"></div>

        {/* Floating Toggle for Desktop Sidebar */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden md:flex absolute top-6 left-6 z-40 bg-white p-3 rounded-full shadow-lg border hover:bg-slate-50 transition-all"
        >
          {isSidebarOpen ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-indigo-600" />}
        </button>

        {/* Top Search Bar (Mobile Only) */}
        <div className="md:hidden absolute top-4 left-4 right-4 z-40">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-2 flex items-center space-x-2">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input 
              type="text" 
              placeholder="명당 탐색..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Floating Actions */}
        <div className="absolute right-6 top-6 z-40 flex flex-col space-y-3">
          <button onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(p => mapRef.current?.flyTo([p.coords.latitude, p.coords.longitude], 14));
            }
          }} className="bg-white p-3 rounded-full shadow-lg border hover:scale-105 transition-transform">
            <Navigation className="w-5 h-5 text-indigo-600" />
          </button>
        </div>

        {/* Mobile Bottom Sheet */}
        <div className={`md:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out ${isMobileSheetExpanded ? 'h-[85vh]' : 'h-24'}`}>
          <div className="w-full flex justify-center py-4 cursor-pointer" onClick={() => setIsMobileSheetExpanded(!isMobileSheetExpanded)}>
            <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
          </div>
          <div className="px-6 h-full overflow-y-auto pb-20">
            {selectedStore && !isMobileSheetExpanded ? (
              <div onClick={() => setIsMobileSheetExpanded(true)} className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{selectedStore.name}</h3>
                  <p className="text-xs text-slate-500 truncate w-60">{selectedStore.address}</p>
                </div>
                <div className="bg-indigo-600 text-white p-3 rounded-2xl">
                  <ChevronUp className="w-5 h-5" />
                </div>
              </div>
            ) : (
              <SidebarContent 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                filteredStores={filteredStores}
                selectedStore={selectedStore}
                setSelectedStore={setSelectedStore}
                analysis={analysis}
                isAnalyzing={isAnalyzing}
                handleAnalyze={handleAnalyze}
                isMobile
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const SidebarContent = ({ 
  searchTerm, setSearchTerm, activeFilter, setActiveFilter, filteredStores, selectedStore, setSelectedStore, analysis, isAnalyzing, handleAnalyze, isMobile = false 
}: any) => {
  return (
    <div className="flex flex-col h-full">
      {!selectedStore ? (
        <>
          <div className="p-6 space-y-6">
            {!isMobile && (
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-600 p-2 rounded-xl">
                  <MapPin className="text-white w-6 h-6" />
                </div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">LottoMap Korea</h1>
              </div>
            )}
            
            {!isMobile && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="지역, 가게명 검색..." 
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <FilterChip active={activeFilter === 'ALL'} onClick={() => setActiveFilter('ALL')} label="전체" />
              {Object.entries(TYPE_CONFIG).map(([type, config]) => (
                <FilterChip 
                  key={type}
                  active={activeFilter === type} 
                  onClick={() => setActiveFilter(type as any)} 
                  label={config.label}
                  icon={config.icon}
                  color={config.color}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-10">
            <p className="px-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">검색 결과 ({filteredStores.length})</p>
            {filteredStores.map((s: LotteryStore) => (
              <div 
                key={s.id} 
                onClick={() => setSelectedStore(s)}
                className="p-4 rounded-3xl hover:bg-slate-100 cursor-pointer transition-all border border-transparent hover:border-slate-200 group flex items-start space-x-4"
              >
                <div className={`p-3 rounded-2xl ${TYPE_CONFIG[s.type[0]]?.color || 'bg-slate-200'} text-white shadow-lg`}>
                  {TYPE_CONFIG[s.type[0]]?.icon || <MapPin className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center">
                    {s.name}
                    {s.type.includes(StoreType.HOTSPOT) && <span className="ml-2 bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full font-black">명당</span>}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">{s.address}</p>
                  {s.winCount1st > 0 && (
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">1등 {s.winCount1st}회</span>
                    </div>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 self-center" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b flex items-center justify-between">
            <button onClick={() => setSelectedStore(null)} className="text-indigo-600 font-bold text-sm flex items-center">
              <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> 돌아가기
            </button>
            <div className="flex gap-2">
               {selectedStore.type.map((t: StoreType) => (
                 <span key={t} className={`text-[10px] font-black px-2 py-1 rounded-full text-white ${TYPE_CONFIG[t]?.color || 'bg-slate-500'}`}>
                   {TYPE_CONFIG[t]?.label}
                 </span>
               ))}
            </div>
          </div>

          <div className="p-8 space-y-8 flex-1 overflow-y-auto">
            <div>
              <h2 className="text-3xl font-black text-slate-900 leading-tight mb-2">{selectedStore.name}</h2>
              <p className="text-slate-500 text-sm flex items-start"><MapPin className="w-4 h-4 mr-1 mt-0.5 shrink-0" /> {selectedStore.address}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <StatCard label="1등 당첨" value={`${selectedStore.winCount1st}회`} sub="Lotto 6/45" color="text-indigo-600" bg="bg-indigo-50" />
               <StatCard label="평점" value={selectedStore.rating?.toString() || '0.0'} sub="사용자 리뷰" color="text-amber-500" bg="bg-amber-50" />
            </div>

            <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center"><Info className="w-4 h-4 mr-2 text-indigo-600" /> 상세 정보</h4>
              <p className="text-sm text-slate-600 leading-relaxed italic">"{selectedStore.description}"</p>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <h4 className="font-bold text-slate-900 text-lg flex items-center">
                   <Sparkles className="w-5 h-5 mr-2 text-indigo-600 animate-pulse" /> AI 기운 분석
                 </h4>
               </div>
               
               {!analysis ? (
                 <button 
                  disabled={isAnalyzing}
                  onClick={handleAnalyze}
                  className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2 overflow-hidden relative"
                 >
                   {isAnalyzing ? (
                     <div className="flex items-center space-x-2">
                       <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                       <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-75"></div>
                       <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
                     </div>
                   ) : (
                     <>
                       <span>운세 및 번호 분석하기</span>
                       <ChevronRight className="w-5 h-5" />
                     </>
                   )}
                 </button>
               ) : (
                 <div className="bg-indigo-600 p-6 rounded-[2.5rem] text-white shadow-2xl space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-black uppercase tracking-widest text-indigo-200">Luck Score</span>
                       <span className="text-4xl font-black">{analysis.score}</span>
                    </div>
                    <div>
                      <p className="text-xl font-bold mb-2">"{analysis.recommendation}"</p>
                      <p className="text-sm text-indigo-100 leading-relaxed">{analysis.insights}</p>
                    </div>
                    <div className="pt-4 border-t border-indigo-500/50">
                       <span className="text-xs font-black text-indigo-200 uppercase mb-3 block">추천 행운 번호</span>
                       <div className="flex justify-between">
                         {analysis.luckyNumber.map((n: number, i: number) => (
                           <div key={i} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center font-black text-sm border border-white/30 shadow-inner">
                             {n}
                           </div>
                         ))}
                       </div>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterChip = ({ active, onClick, label, icon, color }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all border whitespace-nowrap ${active ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'}`}
  >
    {icon && <span className={active ? 'text-white' : color?.replace('bg-', 'text-')}>{icon}</span>}
    <span>{label}</span>
  </button>
);

const StatCard = ({ label, value, sub, color, bg }: any) => (
  <div className={`${bg} p-5 rounded-[2rem] border border-white shadow-sm flex flex-col justify-center`}>
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
    <span className={`text-2xl font-black ${color}`}>{value}</span>
    <span className="text-[10px] text-slate-500 mt-1 font-medium">{sub}</span>
  </div>
);

export default App;
