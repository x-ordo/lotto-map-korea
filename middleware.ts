import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Edge Middleware
 * - CSRF 보호 (Origin/Referer 검증)
 * - 보안 헤더 추가
 * - SameSite 쿠키 강제
 */

// 환경변수 기반 허용 origin (배포 환경에 따라 설정)
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  // 프로덕션 도메인
  'https://lotto-shrine.pages.dev',
  'https://lotto-map-korea.pages.dev',
  // 환경변수로 추가 도메인 허용
  ...(process.env.ALLOWED_ORIGINS?.split(',').filter(Boolean) || []),
];

// CSRF 보호가 필요한 경로 (상태 변경 API)
const PROTECTED_PATHS = ['/api/lotto', '/api/community'];

// 안전한 HTTP 메서드 (CSRF 검사 불필요)
const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS'];

// 에러 응답 생성 (스택 트레이스 숨김)
function createErrorResponse(message: string, status: number) {
  return NextResponse.json(
    {
      error: message,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname, origin } = request.nextUrl;
  const method = request.method;

  // 1. 보안 헤더 추가
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(self), camera=(), microphone=()');

  // 2. 쿠키 SameSite 강제 (CSRF 방어 강화)
  // Set-Cookie 헤더에 SameSite=Strict 추가
  const existingCookies = response.headers.get('Set-Cookie');
  if (existingCookies && !existingCookies.includes('SameSite')) {
    response.headers.set('Set-Cookie', `${existingCookies}; SameSite=Strict; Secure`);
  }

  // 3. API 경로에 대한 CSRF 보호
  const isProtectedPath = PROTECTED_PATHS.some(p => pathname.startsWith(p));
  const isSafeMethod = SAFE_METHODS.includes(method);

  if (isProtectedPath && !isSafeMethod) {
    // Origin 헤더 검사
    const requestOrigin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    // Origin 또는 Referer가 있어야 함 (브라우저 요청 검증)
    if (!requestOrigin && !referer) {
      console.warn(`CSRF 차단: Origin/Referer 없음 - ${pathname}`);
      return createErrorResponse('CSRF 검증 실패: Origin 헤더가 없습니다.', 403);
    }

    // Origin 검증
    if (requestOrigin) {
      const isAllowed = ALLOWED_ORIGINS.includes(requestOrigin) ||
        requestOrigin === origin;

      if (!isAllowed) {
        console.warn(`CSRF 차단: 허용되지 않은 origin ${requestOrigin} - ${pathname}`);
        return createErrorResponse('CSRF 검증 실패: 허용되지 않은 origin입니다.', 403);
      }
    }

    // Referer 검증 (Origin이 없는 경우 fallback)
    if (!requestOrigin && referer) {
      try {
        const refererUrl = new URL(referer);
        const isAllowed = ALLOWED_ORIGINS.includes(refererUrl.origin) ||
          refererUrl.origin === origin;

        if (!isAllowed) {
          console.warn(`CSRF 차단: 허용되지 않은 referer ${referer} - ${pathname}`);
          return createErrorResponse('CSRF 검증 실패: 허용되지 않은 referer입니다.', 403);
        }
      } catch {
        return createErrorResponse('CSRF 검증 실패: 유효하지 않은 referer입니다.', 403);
      }
    }

    // Content-Type 검증 (JSON 요청만 허용)
    const contentType = request.headers.get('content-type');
    if (contentType && !contentType.includes('application/json')) {
      return createErrorResponse('Content-Type은 application/json이어야 합니다.', 415);
    }

    // 추가: X-Requested-With 헤더 권장 (AJAX 요청 검증)
    const xRequestedWith = request.headers.get('x-requested-with');
    if (!xRequestedWith) {
      // 경고만 출력 (호환성을 위해 차단하지 않음)
      console.debug(`CSRF 경고: X-Requested-With 헤더 없음 - ${pathname}`);
    }
  }

  // 4. CORS preflight 처리
  if (method === 'OPTIONS') {
    const requestOrigin = request.headers.get('origin');
    if (requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)) {
      response.headers.set('Access-Control-Allow-Origin', requestOrigin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
      response.headers.set('Access-Control-Max-Age', '86400');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
  }

  return response;
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|data/).*)',
  ],
};
