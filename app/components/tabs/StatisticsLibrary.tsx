'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { BarChart3, Database, TrendingUp, Layers, ChevronRight, ChevronLeft, Activity, Zap, ArrowUpDown, Hash, Grid3X3, Flame, Heart, X } from 'lucide-react';
import { Bar, Pie, Line } from 'react-chartjs-2';

type StatsLevel = 'elementary_level' | 'intermediate_level' | 'high_level';

interface Category {
  name: string;
  title: string;
  description: string;
  icon: string;
}

interface StatsData {
  title: string;
  description: string;
  method: string;
  headers: string[];
  data: Record<string, unknown>[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const LEVEL_INFO = {
  elementary_level: { title: '초급 통계', icon: BarChart3, color: 'emerald' },
  intermediate_level: { title: '중급 통계', icon: TrendingUp, color: 'blue' },
  high_level: { title: '고급 통계', icon: Zap, color: 'purple' },
};

export default function StatisticsLibrary() {
  const [activeLevel, setActiveLevel] = useState<StatsLevel>('elementary_level');
  const [categories, setCategories] = useState<Record<string, Category[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Fetch categories on mount
  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(console.error);
  }, []);

  // Fetch category data when selected
  const fetchCategoryData = useCallback(async (category: Category, level: StatsLevel, pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/stats/${category.name}?level=${level}&page=${pageNum}&limit=50`);
      if (res.ok) {
        const data = await res.json();
        setStatsData(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryData(selectedCategory, activeLevel, page);
    }
  }, [selectedCategory, activeLevel, page, fetchCategoryData]);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setStatsData(null);
    setPage(1);
  };

  const currentCategories = categories[activeLevel] || [];

  return (
    <div className="h-full overflow-y-auto bg-zinc-50 scrollbar-hide animate-in slide-in-from-bottom duration-700">
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-10 space-y-10">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black rounded-full uppercase tracking-widest">
            <Database className="w-4 h-4 mr-2" />
            Statistics Library
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-zinc-950">
            {selectedCategory ? selectedCategory.title : '통계 라이브러리'}
          </h2>
          <p className="text-zinc-400 text-lg font-bold">
            {selectedCategory ? selectedCategory.description : '1,204회 분석 데이터 · 32개 통계 항목'}
          </p>
        </header>

        {/* Back Button (when viewing detail) */}
        {selectedCategory && (
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-2xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-bold text-sm">목록으로</span>
          </button>
        )}

        {/* Level Tabs (only show when not viewing detail) */}
        {!selectedCategory && (
          <div className="flex justify-center">
            <div className="inline-flex bg-zinc-100/50 p-1.5 rounded-[20px] space-x-1">
              {(Object.keys(LEVEL_INFO) as StatsLevel[]).map(level => {
                const info = LEVEL_INFO[level];
                const Icon = info.icon;
                return (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className={`px-6 py-3 rounded-[16px] flex items-center space-x-2 transition-all duration-300 ${
                      activeLevel === level
                        ? 'bg-white text-zinc-950 shadow-lg font-black'
                        : 'text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${activeLevel === level ? 'text-indigo-600' : ''}`} />
                    <span className="text-sm">{info.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      activeLevel === level ? 'bg-indigo-100 text-indigo-600' : 'bg-zinc-200 text-zinc-500'
                    }`}>
                      {(categories[level] || []).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Category Grid (when no selection) */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentCategories.map(category => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category)}
                className="bg-white/80 backdrop-blur-sm border border-zinc-100 rounded-[24px] p-6 text-left hover:shadow-xl hover:border-indigo-200 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <Activity className="w-6 h-6 text-zinc-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-indigo-500 transition-colors" />
                </div>
                <h3 className="font-black text-lg text-zinc-950 mb-1">{category.title}</h3>
                <p className="text-sm text-zinc-400 font-medium">{category.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* Detail View */}
        {selectedCategory && statsData && (
          <div className="space-y-8">
            {/* Stats Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-[24px] p-6 border border-zinc-100">
                <p className="text-zinc-400 text-xs font-black uppercase tracking-widest mb-2">총 데이터</p>
                <p className="text-3xl font-black text-zinc-950">{statsData.pagination.total.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-[24px] p-6 border border-zinc-100">
                <p className="text-zinc-400 text-xs font-black uppercase tracking-widest mb-2">컬럼 수</p>
                <p className="text-3xl font-black text-zinc-950">{statsData.headers?.length || 0}</p>
              </div>
              <div className="bg-white rounded-[24px] p-6 border border-zinc-100">
                <p className="text-zinc-400 text-xs font-black uppercase tracking-widest mb-2">현재 페이지</p>
                <p className="text-3xl font-black text-zinc-950">{page} / {statsData.pagination.totalPages}</p>
              </div>
              <div className="bg-indigo-600 rounded-[24px] p-6 text-white">
                <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">레벨</p>
                <p className="text-3xl font-black">{LEVEL_INFO[activeLevel].title}</p>
              </div>
            </div>

            {/* Chart (if applicable) */}
            {statsData.data.length > 0 && renderChart(statsData, selectedCategory.name)}

            {/* Data Table */}
            <div className="bg-white rounded-[24px] border border-zinc-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
                <h3 className="font-black text-lg">데이터 테이블</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={!statsData.pagination.hasPrev || loading}
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-zinc-500">
                    {page} / {statsData.pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={!statsData.pagination.hasNext || loading}
                    className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-50">
                    <tr>
                      {statsData.headers?.slice(0, 10).map((header, idx) => (
                        <th key={idx} className="px-4 py-3 text-left text-xs font-black text-zinc-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {loading ? (
                      // Skeleton rows
                      Array.from({ length: 10 }).map((_, idx) => (
                        <tr key={idx}>
                          {Array.from({ length: Math.min(10, statsData.headers?.length || 5) }).map((_, colIdx) => (
                            <td key={colIdx} className="px-4 py-3">
                              <div className="h-4 bg-zinc-100 rounded animate-pulse w-16"></div>
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      statsData.data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                          {statsData.headers?.slice(0, 10).map((header, colIdx) => (
                            <td key={colIdx} className="px-4 py-3 text-sm text-zinc-700 font-medium">
                              {formatCellValue(row[header])}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Loading State (initial) */}
        {selectedCategory && !statsData && loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return '-';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function renderChart(data: StatsData, categoryName: string): React.ReactNode {
  // Determine chart type based on category
  const isFrequencyChart = categoryName.includes('appearance') || categoryName.includes('ranking');
  const isHolzzakChart = categoryName.includes('holzzak') || categoryName.includes('pitch');

  if (!data.data.length) return null;

  // For frequency-based charts
  if (isFrequencyChart && data.headers?.includes('번호')) {
    const labels = data.data.slice(0, 20).map(row => String(row['번호'] || row[data.headers[0]]));
    const values = data.data.slice(0, 20).map(row => {
      const val = row['출현횟수'] || row['횟수'] || row[data.headers[1]];
      return typeof val === 'number' ? val : parseInt(String(val)) || 0;
    });

    return (
      <div className="bg-white rounded-[24px] border border-zinc-100 p-6">
        <h3 className="font-black text-lg mb-6 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
          시각화
        </h3>
        <div className="h-[300px]">
          <Bar
            data={{
              labels,
              datasets: [{
                label: '출현 횟수',
                data: values,
                backgroundColor: '#4F46E5',
                borderRadius: 8,
                barThickness: 24,
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false }, ticks: { font: { weight: 'bold' } } },
                y: { grid: { color: '#f4f4f5' }, ticks: { font: { weight: 'bold' } } },
              },
            }}
          />
        </div>
      </div>
    );
  }

  // For holzzak (odd/even) pie charts
  if (isHolzzakChart) {
    const labels = ['홀수', '짝수'];
    const values = [52, 48]; // Default placeholder

    return (
      <div className="bg-white rounded-[24px] border border-zinc-100 p-6">
        <h3 className="font-black text-lg mb-6 flex items-center">
          <ArrowUpDown className="w-5 h-5 mr-2 text-indigo-600" />
          비율 분석
        </h3>
        <div className="h-[300px] flex justify-center">
          <Pie
            data={{
              labels,
              datasets: [{
                data: values,
                backgroundColor: ['#4F46E5', '#10B981'],
                borderWidth: 0,
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom' },
              },
            }}
          />
        </div>
      </div>
    );
  }

  return null;
}
