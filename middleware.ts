import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Edge Middleware
 * - CSRF 보호
 * - 보안 헤더 추가
 */

// 허용된 origin 목록
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://lotto-shrine.pages.dev',
  'https://lotto-map-korea.pages.dev',
];

// CSRF 보호가 필요한 경로
const PROTECTED_PATHS = ['/api/lotto', '/api/community'];

// 안전한 HTTP 메서드 (CSRF 검사 불필요)
const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS'];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname, origin } = request.nextUrl;
  const method = request.method;

  // 1. 보안 헤더 추가
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 2. API 경로에 대한 CSRF 보호
  const isProtectedPath = PROTECTED_PATHS.some(p => pathname.startsWith(p));
  const isSafeMethod = SAFE_METHODS.includes(method);

  if (isProtectedPath && !isSafeMethod) {
    // Origin 헤더 검사
    const requestOrigin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    // Origin 또는 Referer가 있어야 함
    if (!requestOrigin && !referer) {
      return NextResponse.json(
        { error: 'CSRF 검증 실패: Origin 헤더가 없습니다.' },
        { status: 403 }
      );
    }

    // Origin 검증
    if (requestOrigin) {
      const isAllowed = ALLOWED_ORIGINS.includes(requestOrigin) ||
        requestOrigin === origin;

      if (!isAllowed) {
        console.warn(`CSRF 차단: ${requestOrigin} from ${pathname}`);
        return NextResponse.json(
          { error: 'CSRF 검증 실패: 허용되지 않은 origin입니다.' },
          { status: 403 }
        );
      }
    }

    // Referer 검증 (Origin이 없는 경우)
    if (!requestOrigin && referer) {
      try {
        const refererUrl = new URL(referer);
        const isAllowed = ALLOWED_ORIGINS.includes(refererUrl.origin) ||
          refererUrl.origin === origin;

        if (!isAllowed) {
          console.warn(`CSRF 차단 (Referer): ${referer} from ${pathname}`);
          return NextResponse.json(
            { error: 'CSRF 검증 실패: 허용되지 않은 referer입니다.' },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: 'CSRF 검증 실패: 유효하지 않은 referer입니다.' },
          { status: 403 }
        );
      }
    }

    // Content-Type 검증 (JSON 요청만 허용)
    const contentType = request.headers.get('content-type');
    if (contentType && !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type은 application/json이어야 합니다.' },
        { status: 415 }
      );
    }
  }

  // 3. CORS preflight 처리
  if (method === 'OPTIONS') {
    const requestOrigin = request.headers.get('origin');
    if (requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)) {
      response.headers.set('Access-Control-Allow-Origin', requestOrigin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      response.headers.set('Access-Control-Max-Age', '86400');
    }
  }

  return response;
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
