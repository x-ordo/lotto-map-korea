'use client';

import React from 'react';
import { Heart, MessageCircle, Camera, MapPin, MoreHorizontal, Share2 } from 'lucide-react';
import { CommunityPost } from '../../../lib/types';

interface Props {
    posts: CommunityPost[];
}

export default function CommunityWall({ posts }: Props) {
    return (
        <div className="h-full overflow-y-auto bg-zinc-50/50 scrollbar-hide">
            <div className="max-w-2xl mx-auto py-12 px-6 space-y-8 pb-32">
                <header className="flex justify-between items-end mb-4">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tight text-zinc-950">성지 담벼락</h2>
                        <p className="text-zinc-400 font-bold text-sm">실시간으로 공유되는 1등 당첨의 기운</p>
                    </div>
                    <button className="bg-zinc-950 text-white p-4 rounded-2xl shadow-xl shadow-zinc-200 hover:scale-105 active:scale-95 transition-all">
                        <Camera className="w-6 h-6" />
                    </button>
                </header>

                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white border border-zinc-100 rounded-[32px] p-8 space-y-6 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center font-black text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors text-lg">
                                        {post.author[0]}
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <p className="font-black text-sm text-zinc-950">{post.author}</p>
                                            {post.wins && <span className="bg-red-50 text-red-600 text-[9px] font-black px-2 py-0.5 rounded-full border border-red-100">{post.wins}</span>}
                                        </div>
                                        <p className="text-[10px] text-zinc-300 font-bold mt-0.5">{new Date(post.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-zinc-300 hover:text-zinc-600 transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                            </div>

                            <div className="space-y-4">
                                <p className="text-zinc-700 font-bold leading-relaxed text-lg">{post.content}</p>
                                <div className="inline-flex items-center space-x-2 text-indigo-600 text-[11px] font-black bg-indigo-50/50 px-4 py-2 rounded-xl">
                                    <MapPin className="w-3.5 h-3.5" /> 
                                    <span>{post.storeName}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
                                <div className="flex items-center space-x-6">
                                    <button className="flex items-center space-x-2 text-zinc-400 hover:text-rose-500 transition-colors font-black text-sm">
                                        <Heart className="w-5 h-5" /> <span>{post.likes}</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-zinc-400 hover:text-indigo-600 transition-colors font-black text-sm">
                                        <MessageCircle className="w-5 h-5" /> <span>댓글</span>
                                    </button>
                                </div>
                                <button className="text-zinc-300 hover:text-zinc-600 transition-colors"><Share2 className="w-5 h-5" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
