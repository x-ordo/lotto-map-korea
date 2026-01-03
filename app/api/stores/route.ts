import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { checkRateLimit, createSafeErrorResponse } from '../../../lib/validation';

// 캐시 설정: 1시간
export const revalidate = 3600;

// IP 추출 헬퍼
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown';
}

// 메모리 캐시
let storesCache: unknown[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 3600000; // 1시간

export async function GET(request: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`stores-get-${clientIP}`, 30, 60000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        createSafeErrorResponse('요청 한도를 초과했습니다.'),
        { status: 429 }
      );
    }

    // URL 파라미터 파싱
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase();
    const limit = Math.min(parseInt(searchParams.get('limit') || '1000'), 1000);
    const offset = parseInt(searchParams.get('offset') || '0');

    // 캐시된 데이터 사용 또는 파일 로드
    const now = Date.now();
    if (!storesCache || now - cacheTimestamp > CACHE_TTL) {
      const filePath = path.join(process.cwd(), 'public', 'data', 'stores.json');
      const data = await fs.readFile(filePath, 'utf8');
      storesCache = JSON.parse(data);
      cacheTimestamp = now;
    }

    let result = storesCache || [];

    // 검색 필터
    if (search) {
      result = result.filter((store: any) =>
        store.name?.toLowerCase().includes(search) ||
        store.address?.toLowerCase().includes(search)
      );
    }

    // 전체 개수
    const total = result.length;

    // 페이지네이션
    result = result.slice(offset, offset + limit);

    return NextResponse.json({
      data: result,
      meta: {
        total,
        limit,
        offset,
        hasMore: offset + result.length < total,
      }
    }, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'X-RateLimit-Remaining': String(rateLimit.remaining),
      }
    });
  } catch (error) {
    console.error('Stores GET error:', error);
    return NextResponse.json(
      createSafeErrorResponse('서버 오류가 발생했습니다.'),
      { status: 500 }
    );
  }
}
