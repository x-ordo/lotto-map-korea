import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import {
  validateLottoInput,
  checkRateLimit,
  createSafeErrorResponse
} from '../../../lib/validation';

export const revalidate = 0;

// IP 추출 헬퍼
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown';
}

export async function GET(request: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`lotto-get-${clientIP}`, 60, 60000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        createSafeErrorResponse('요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.'),
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetIn / 1000)),
          }
        }
      );
    }

    const list = await db.lotto.list();
    return NextResponse.json(list, {
      headers: {
        'X-RateLimit-Remaining': String(rateLimit.remaining),
      }
    });
  } catch (e) {
    // 에러 스택 노출 방지
    console.error('Lotto GET error:', e);
    return NextResponse.json(
      createSafeErrorResponse('서버 오류가 발생했습니다.'),
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Rate limiting (POST는 더 엄격하게)
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`lotto-post-${clientIP}`, 20, 60000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        createSafeErrorResponse('요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.'),
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetIn / 1000)),
          }
        }
      );
    }

    // 요청 본문 파싱
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        createSafeErrorResponse('유효하지 않은 JSON 형식입니다.'),
        { status: 400 }
      );
    }

    // 입력 검증
    const validation = validateLottoInput(body);
    if (!validation.success) {
      return NextResponse.json(
        createSafeErrorResponse(validation.error || '검증 실패'),
        { status: 400 }
      );
    }

    const { numbers, round, memo } = validation.data!;
    const newItem = await db.lotto.save(numbers, round, memo);

    return NextResponse.json(newItem, {
      status: 201,
      headers: {
        'X-RateLimit-Remaining': String(rateLimit.remaining),
      }
    });
  } catch (e) {
    console.error('Lotto POST error:', e);
    return NextResponse.json(
      createSafeErrorResponse('서버 오류가 발생했습니다.'),
      { status: 500 }
    );
  }
}
