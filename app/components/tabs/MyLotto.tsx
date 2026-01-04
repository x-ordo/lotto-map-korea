'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Trash2, Save } from 'lucide-react';
import { SavedLotto } from '../../../lib/types';

export default function MyLotto() {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [savedLottos, setSavedLottos] = useState<SavedLotto[]>([]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            const res = await fetch('/api/lotto');
            if (res.ok && isMounted) {
                setSavedLottos(await res.json());
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, []);

    const fetchSaved = async () => {
        const res = await fetch('/api/lotto');
        if (res.ok) setSavedLottos(await res.json());
    };

    const toggleNumber = (num: number) => {
        if (numbers.includes(num)) {
            setNumbers(numbers.filter(n => n !== num));
        } else if (numbers.length < 6) {
            setNumbers([...numbers, num].sort((a, b) => a - b));
        }
    };

    const handleSave = async () => {
        if (numbers.length !== 6) return;
        const res = await fetch('/api/lotto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numbers, round: 1205 })
        });
        if (res.ok) {
            setNumbers([]);
            fetchSaved();
        }
    };

    const generateQRValue = (nums: number[]) => {
        const formattedNums = nums.map(n => n.toString().padStart(2, '0')).join('');
        return `http://m.dhlottery.co.kr/?v=081628303144q${formattedNums}1234567890`; 
    };

    return (
        <div className="space-y-8">
            <header className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight">QR 번호 금고</h2>
                <p className="text-zinc-400 text-xs font-bold">구매한 번호를 디지털로 안전하게 보관하세요</p>
            </header>

            <section className="bg-white border border-zinc-200 rounded-[32px] p-8 space-y-8 shadow-sm">
                <div className="flex justify-between items-center">
                    <h3 className="font-black text-[10px] uppercase text-zinc-400 tracking-widest">수동 번호 등록</h3>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{numbers.length} / 6</span>
                </div>
                
                <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 45 }, (_, i) => i + 1).map(n => (
                        <button
                            key={n}
                            onClick={() => toggleNumber(n)}
                            className={`h-8 rounded-lg font-black text-[10px] transition-all ${numbers.includes(n) ? 'bg-zinc-950 text-white shadow-md scale-105' : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100'}`}
                        >
                            {n}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={handleSave}
                    disabled={numbers.length !== 6}
                    className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center space-x-2 transition-all ${numbers.length === 6 ? 'bg-zinc-950 text-white shadow-xl shadow-zinc-200' : 'bg-zinc-100 text-zinc-300'}`}
                >
                    <Save className="w-4 h-4" /> <span>금고에 저장</span>
                </button>
            </section>

            <section className="space-y-4">
                <h3 className="font-black text-[10px] uppercase text-zinc-400 tracking-widest ml-4">최근 저장 기록</h3>
                <div className="grid grid-cols-1 gap-4">
                    {savedLottos.map((lotto) => (
                        <div key={lotto.id} className="bg-white border border-zinc-100 rounded-[24px] p-5 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-zinc-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                                    <QRCodeSVG value={generateQRValue(lotto.numbers)} size={48} level="L" />
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex space-x-1">
                                        {lotto.numbers.map(n => (
                                            <span key={n} className="w-6 h-6 flex items-center justify-center bg-zinc-900 text-white rounded-md text-[9px] font-black">{n}</span>
                                        ))}
                                    </div>
                                    <p className="text-[9px] text-zinc-400 font-bold uppercase">{new Date(lotto.createdAt).toLocaleDateString()} SECURED</p>
                                </div>
                            </div>
                            <button className="p-2 text-zinc-200 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
