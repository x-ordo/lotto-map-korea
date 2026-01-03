import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export const revalidate = 0;

export async function GET() {
    try {
        const posts = await db.community.list();
        return NextResponse.json(posts);
    } catch (error: any) {
        // 모든 에러 정보를 상세히 기록
        return NextResponse.json({ 
            error: 'Server Engine Failure', 
            message: error.message,
            stack: error.stack 
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newPost = await db.community.create(body);
        return NextResponse.json({ success: true, data: newPost });
    } catch (error: any) {
        return NextResponse.json({ 
            error: 'Post Creation Failure', 
            message: error.message 
        }, { status: 500 });
    }
}