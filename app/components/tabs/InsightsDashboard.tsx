'use client';

import React from 'react';
import { TrendingUp, Flame } from 'lucide-react';
import { Bar } from 'react-chartjs-2';

interface Props {
    frequencyData: any;
    chartOptions: any;
}

export default function InsightsDashboard({ frequencyData, chartOptions }: Props) {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-zinc-100 pb-6">
                <div className="space-y-1">
                    <div className="inline-flex items-center px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase tracking-widest mb-1">Strategy Intelligence</div>
                    <h2 className="text-2xl font-black tracking-tight text-zinc-950">데이터 통계</h2>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg text-[10px] font-black flex items-center border border-emerald-100">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                    LIVE DATA
                </div>
            </div>

            <div className="bg-white border border-zinc-200/60 rounded-[32px] p-8 shadow-sm relative overflow-hidden group">
                <h3 className="text-sm font-black mb-8 flex items-center text-zinc-950 uppercase tracking-wider">
                    <TrendingUp className="mr-3 text-indigo-600 w-4 h-4" /> 누적 출현 빈도 Top 5
                </h3>
                <div className="h-[240px] relative z-10">
                    <Bar data={frequencyData} options={chartOptions} />
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-zinc-950 rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
                    <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2">Hot Streak</p>
                    <div className="flex items-start justify-between">
                        <p className="text-5xl font-black tracking-tighter">34</p>
                        <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
                    </div>
                    <div className="mt-6 pt-6 border-t border-zinc-800">
                        <div className="flex justify-between text-[10px] font-bold mb-2"><span className="text-zinc-500">최근 10주</span><span className="text-indigo-400">40%</span></div>
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[40%]"></div></div>
                    </div>
                </div>

                <div className="bg-white border border-zinc-200/60 rounded-[32px] p-8 shadow-sm group hover:border-indigo-500/30 transition-all flex flex-col justify-between">
                    <div>
                        <p className="text-zinc-400 text-[9px] font-black uppercase tracking-widest mb-1">Golden Mean</p>
                        <p className="text-2xl font-black tracking-tight">142.5</p>
                    </div>
                    <div>
                        <div className="h-1 bg-zinc-100 rounded-full overflow-hidden mb-2"><div className="h-full bg-zinc-950 w-[72%] group-hover:bg-indigo-600 transition-colors"></div></div>
                        <p className="text-[9px] text-zinc-400 font-bold italic">합계 100~170 구간</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
