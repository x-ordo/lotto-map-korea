'use client';

import React, { useState } from 'react';
import { BarChart3, Database, TrendingUp, Zap, Activity, Construction } from 'lucide-react';

type StatsLevel = 'elementary_level' | 'intermediate_level' | 'high_level';

interface Category {
  name: string;
  title: string;
  description: string;
}

const LEVEL_INFO = {
  elementary_level: { title: '초급 통계', icon: BarChart3, color: 'emerald' },
  intermediate_level: { title: '중급 통계', icon: TrendingUp, color: 'blue' },
  high_level: { title: '고급 통계', icon: Zap, color: 'purple' },
};

// Static category data (previously fetched from API)
const STATIC_CATEGORIES: Record<StatsLevel, Category[]> = {
  elementary_level: [
    { name: 'analysis_number', title: '당첨번호 분석', description: '회차별 당첨번호 분석' },
    { name: 'appearance_number', title: '번호별 출현현황', description: '각 번호의 출현 빈도' },
    { name: 'ranking_number', title: '출현순위', description: '번호별 출현 순위' },
    { name: 'statistics_sum', title: '총합 통계', description: '당첨번호 합계 분석' },
    { name: 'statistics_holzzak', title: '홀짝 통계', description: '홀수/짝수 비율 분석' },
    { name: 'statistics_pitch', title: '고저 통계', description: '고저 비율 분석' },
  ],
  intermediate_level: [
    { name: 'consecutive_numbers', title: '연속번호', description: '연속 번호 출현 패턴' },
    { name: 'hot-cold_number', title: '핫/콜드 번호', description: '최근 출현 빈도 분석' },
    { name: 'neighbor_number', title: '인접번호', description: '인접 번호 패턴 분석' },
    { name: 'prime_number', title: '소수 패턴', description: '소수 번호 출현 분석' },
  ],
  high_level: [
    { name: 'pattern_number', title: '패턴 분석', description: '복합 패턴 분석' },
    { name: 'good_number_list', title: '궁합 좋은 번호', description: '함께 출현하는 번호' },
    { name: 'bad_number_list', title: '궁합 나쁜 번호', description: '함께 출현하지 않는 번호' },
  ],
};

export default function StatisticsLibrary() {
  const [activeLevel, setActiveLevel] = useState<StatsLevel>('elementary_level');

  const currentCategories = STATIC_CATEGORIES[activeLevel] || [];

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
            통계 라이브러리
          </h2>
          <p className="text-zinc-400 text-lg font-bold">
            1,204회 분석 데이터 · 32개 통계 항목
          </p>
        </header>

        {/* Level Tabs */}
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
                    {STATIC_CATEGORIES[level].length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentCategories.map(category => (
            <div
              key={category.name}
              className="bg-white/80 backdrop-blur-sm border border-zinc-100 rounded-[24px] p-6 text-left hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group relative"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <Activity className="w-6 h-6 text-zinc-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <span className="text-[10px] font-black bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">
                  준비중
                </span>
              </div>
              <h3 className="font-black text-lg text-zinc-950 mb-1">{category.title}</h3>
              <p className="text-sm text-zinc-400 font-medium">{category.description}</p>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[32px] p-8 text-center border border-indigo-100">
          <Construction className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h3 className="text-xl font-black text-zinc-950 mb-2">통계 데이터 준비중</h3>
          <p className="text-zinc-500 max-w-md mx-auto">
            1,204회차 로또 당첨 데이터 분석 결과를 곧 제공할 예정입니다.
            다양한 통계 분석을 통해 번호 선택에 도움을 드리겠습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
