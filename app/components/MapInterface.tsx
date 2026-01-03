'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ChevronRight, MapPin, Sparkles, Trophy, ListOrdered, Moon, MessageCircle, Download, Share2, Lock, Unlock, LocateFixed, Fingerprint, Cpu, Users, Star, Camera, LayoutDashboard, Info, Activity, Map as MapIcon, Coins } from 'lucide-react';
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
    // Real DB Fetching
    fetch('/api/community')
      .then(res => res.ok ? res.json() : [])
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]));
  }, []);

  const processedStores = useMemo(() => {
    return MOCK_STORES.map(s => {
        const dist = 1000; // Mock dist
        return { ...s, luckIndex: 75 + (s.winCount1st * 3), distance: dist, isEnergized: dist < 500 };
    }).filter(s => s.name.includes(searchTerm) || s.address.includes(searchTerm));
  }, [searchTerm]);

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
            <h1 className="text-xl font-black tracking-tight">LottoShrine <span className="text-indigo-600 font-black italic">PRO</span></h1>
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
                    {/* Sidebar Logic integrated */}
                </div>
            )}

            {activeTab === 'COMMUNITY' && <CommunityWall posts={posts} />}
            
            {activeTab === 'STATS' && <InsightsDashboard frequencyData={frequencyData} chartOptions={chartOptions} />}

            {activeTab === 'PRO' && (
                <div className="h-full overflow-y-auto p-12 bg-white animate-in slide-in-from-bottom duration-700">
                    <div className="max-w-4xl mx-auto space-y-16 pb-32">
                        <header className="text-center space-y-6">
                            <div className="inline-flex items-center px-4 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-4 shadow-xl">Premium Access</div>
                            <h2 className="text-6xl font-black tracking-tighter">운명을 넘어서는<br/>데이터의 힘.</h2>
                        </header>
                        {/* Subscription Cards... */}
                    </div>
                </div>
            )}
        </main>

        {/* Selected Store Side Panel (Refactored) */}
        {selectedStore && (
            <aside className="absolute inset-0 md:relative md:w-[500px] bg-white z-[60] animate-in slide-in-from-right duration-400 shadow-2xl flex flex-col border-l border-zinc-100">
                {/* Store Details Panel... */}
            </aside>
        )}
      </div>

      <div className="absolute bottom-10 right-10 z-50">
          <button onClick={() => { setActiveTab('CORE'); }} className="bg-zinc-950 w-16 h-16 rounded-2xl shadow-xl flex items-center justify-center text-indigo-400 border border-zinc-800 transition-all hover:scale-110 active:scale-90"><Cpu className="w-8 h-8" /></button>
      </div>
    </div>
  );
}
