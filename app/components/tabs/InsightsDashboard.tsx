'use client';

import React from 'react';
import { TrendingUp, Flame, Activity, Zap, Coins, BarChart3, Binary, Dices } from 'lucide-react';
import { Bar } from 'react-chartjs-2';

interface Props {
    frequencyData: any;
    chartOptions: any;
}

export default function InsightsDashboard({ frequencyData, chartOptions }: Props) {
    return (
        <div className="h-full overflow-y-auto bg-white scrollbar-hide">
            <div className="max-w-6xl mx-auto py-16 px-10 space-y-12 pb-32">
                <header className="flex justify-between items-end border-b border-zinc-100 pb-12">
                    <div className="space-y-2">
                        <div className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-md uppercase tracking-widest mb-2">Strategy Intelligence</div>
                        <h2 className="text-5xl font-black tracking-tight text-zinc-950">전략 대시보드</h2>
                        <p className="text-zinc-400 font-bold text-lg mt-2">1205회차 누적 데이터를 관통하는 핵심 알고리즘 인사이트</p>
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-xl text-xs font-black flex items-center border border-emerald-100 shadow-sm">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                        DATA SYNCED
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 bg-white border border-zinc-200/60 rounded-3xl p-12 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000"><BarChart3 className="w-64 h-64" /></div>
                        <h3 className="text-xl font-black mb-12 flex items-center text-zinc-950">
                            <TrendingUp className="mr-4 text-indigo-600 w-6 h-6" /> 번호별 누적 출현 빈도 (Top Group)
                        </h3>
                        <div className="h-[350px] relative z-10"><Bar data={frequencyData} options={chartOptions} /></div>
                    </div>
                    
                    <div className="space-y-10">
                        <div className="bg-zinc-950 rounded-3xl p-10 text-white shadow-2xl shadow-zinc-300 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl"></div>
                            <p className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.2em] mb-3">Hot Streak</p>
                            <div className="flex items-start justify-between">
                                <p className="text-8xl font-black tracking-tighter">34</p>
                                <Flame className="w-12 h-12 text-orange-500 fill-orange-500" />
                            </div>
                            <div className="mt-10 pt-10 border-t border-zinc-800 space-y-4">
                                <div className="flex justify-between text-xs font-bold"><span className="text-zinc-500">최근 10주 출현</span><span className="text-indigo-400">4회 (40%)</span></div>
                                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[40%]"></div></div>
                            </div>
                        </div>

                        <div className="bg-white border border-zinc-200/60 rounded-3xl p-10 shadow-sm group hover:border-indigo-500/30 transition-all">
                            <p className="text-zinc-400 text-[11px] font-black uppercase tracking-widest mb-6">Equilibrium Ratio</p>
                            <div className="flex items-end justify-between mb-4">
                                <p className="text-4xl font-black tracking-tight">142.5</p>
                                <p className="text-zinc-400 text-[10px] font-black uppercase mb-1">Golden Mean</p>
                            </div>
                            <div className="h-2 bg-zinc-100 rounded-full overflow-hidden"><div className="h-full bg-zinc-950 w-[72%] group-hover:bg-indigo-600 transition-colors"></div></div>
                            <p className="text-[10px] text-zinc-400 font-bold mt-4 italic">당첨 번호 합계의 82%가 100~170 사이에서 결정됨</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { label: '홀짝 밸런스', val: '3:3 (표준)', icon: Dices, color: 'text-zinc-950', bg: 'bg-zinc-50' },
                        { label: '평균 고저차', val: '28.4', icon: Activity, color: 'text-zinc-950', bg: 'bg-zinc-50' },
                        { label: '미출현 구간', val: '12회 이상', icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: '최대 잭팟', val: '30.5억', icon: Coins, color: 'text-zinc-950', bg: 'bg-zinc-50' }
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-zinc-100 rounded-[24px] p-8 hover:shadow-xl hover:translate-y-[-4px] transition-all">
                            <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-6`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-tighter mb-1">{item.label}</p>
                            <p className="text-xl font-black text-zinc-950">{item.val}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
