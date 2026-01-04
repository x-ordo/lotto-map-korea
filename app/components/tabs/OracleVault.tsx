'use client';

import React from 'react';
import { ShieldCheck, Calendar, Zap, Lock, Unlock, Share2, Award, History, Activity } from 'lucide-react';
import { LuckAnalysis } from '../../../lib/types';

interface Props {
    dailyOracle: LuckAnalysis | null;
    continuity: number;
    onGenerate: () => void;
}

export default function OracleVault({ dailyOracle, continuity, onGenerate }: Props) {
    return (
        <div className="space-y-8">
            {/* 1. 기능 중심 헤더 (Small version for grid) */}
            <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight">AI 맞춤 추천</h2>
                <p className="text-zinc-400 text-xs font-bold">알고리즘이 점지하는 최적의 조합 전략</p>
            </div>

            {/* 2. 통계 기반 전략 요약 */}
            <div className="bg-white border border-zinc-200 rounded-[32px] p-8 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="font-black text-[10px] uppercase tracking-widest text-zinc-400">이번 주 추출 분석</h3>
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded">High Probability</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <p className="text-[10px] font-bold text-zinc-400 mb-1">추천 홀짝</p>
                        <p className="text-xl font-black text-zinc-950">3 : 3</p>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <p className="text-[10px] font-bold text-zinc-400 mb-1">추천 합계</p>
                        <p className="text-xl font-black text-zinc-950">130 ~ 165</p>
                    </div>
                </div>
            </div>

            {/* 3. 정성 지수 -> 분석 정밀도 */}
            <div className="bg-zinc-950 text-white rounded-[32px] p-8 space-y-6 relative overflow-hidden shadow-xl shadow-zinc-200">
                <div className="flex justify-between items-end relative z-10">
                    <div>
                        <p className="text-zinc-500 text-[10px] font-black uppercase mb-1">Data Precision</p>
                        <p className="text-3xl font-black text-indigo-400">{continuity * 14}% <span className="text-sm text-zinc-500 font-bold">정밀도</span></p>
                    </div>
                    <Activity className="text-indigo-500 animate-pulse w-6 h-6" />
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${(continuity/7)*100}%` }}></div>
                </div>
            </div>

            {/* 4. 번호 추출 버튼 */}
            {!dailyOracle ? (
                <button onClick={onGenerate} className="w-full py-12 bg-white border border-zinc-200 rounded-[40px] flex flex-col items-center justify-center space-y-4 hover:border-indigo-600 hover:shadow-xl transition-all group">
                    <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                        <Zap className="w-8 h-8 fill-current" />
                    </div>
                    <p className="text-lg font-black text-zinc-950">AI 행운 조합 생성</p>
                </button>
            ) : (
                <div className="bg-white border-2 border-indigo-600 rounded-[40px] p-8 space-y-8 shadow-2xl animate-in zoom-in duration-500">
                    <div className="space-y-1">
                        <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">Strategy Optimized</p>
                        <h3 className="text-xl font-black">오늘의 정밀 추천 조합</h3>
                    </div>
                    <div className="flex justify-between px-2">
                        {dailyOracle.luckyNumber.map(n => (
                            <span key={n} className="w-9 h-9 flex items-center justify-center bg-zinc-950 text-white rounded-xl font-black text-xs shadow-lg">{n}</span>
                        ))}
                    </div>
                    <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <p className="text-[11px] text-zinc-600 font-bold leading-relaxed italic">&ldquo;{dailyOracle.insights.split(': ')[1]}&rdquo;</p>
                    </div>
                </div>
            )}
        </div>
    );
}