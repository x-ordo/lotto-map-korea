/**
 * 입력 검증 및 보안 유틸리티
 * 순수 TypeScript로 구현 (외부 의존성 없음)
 */

// ============================================
// 타입 정의
// ============================================

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LottoInput {
  numbers: number[];
  round: number;
  memo?: string;
}

export interface CommunityPostInput {
  author: string;
  storeName: string;
  content: string;
  wins?: string;
  imageUrl?: string;
}

// ============================================
// 검증 함수
// ============================================

/**
 * 로또 번호 입력 검증
 */
export function validateLottoInput(input: unknown): ValidationResult<LottoInput> {
  // 1. null/undefined 체크
  if (!input || typeof input !== 'object') {
    return { success: false, error: '유효하지 않은 입력입니다.' };
  }

  const data = input as Record<string, unknown>;

  // 2. numbers 필드 검증
  if (!Array.isArray(data.numbers)) {
    return { success: false, error: 'numbers는 배열이어야 합니다.' };
  }

  if (data.numbers.length !== 6) {
    return { success: false, error: '로또 번호는 6개여야 합니다.' };
  }

  // 3. 각 번호 검증 (1-45 범위, 정수)
  for (const num of data.numbers) {
    if (typeof num !== 'number' || !Number.isInteger(num)) {
      return { success: false, error: '모든 번호는 정수여야 합니다.' };
    }
    if (num < 1 || num > 45) {
      return { success: false, error: '번호는 1-45 범위여야 합니다.' };
    }
  }

  // 4. 중복 번호 체크
  const uniqueNumbers = new Set(data.numbers);
  if (uniqueNumbers.size !== 6) {
    return { success: false, error: '중복된 번호가 있습니다.' };
  }

  // 5. round 필드 검증
  if (typeof data.round !== 'number' || !Number.isInteger(data.round)) {
    return { success: false, error: 'round는 정수여야 합니다.' };
  }

  if (data.round < 1 || data.round > 9999) {
    return { success: false, error: 'round는 1-9999 범위여야 합니다.' };
  }

  // 6. memo 필드 검증 (선택적)
  let memo: string | undefined;
  if (data.memo !== undefined) {
    if (typeof data.memo !== 'string') {
      return { success: false, error: 'memo는 문자열이어야 합니다.' };
    }
    if (data.memo.length > 200) {
      return { success: false, error: 'memo는 200자 이하여야 합니다.' };
    }
    memo = sanitizeString(data.memo);
  }

  return {
    success: true,
    data: {
      numbers: data.numbers as number[],
      round: data.round as number,
      memo,
    },
  };
}

/**
 * 커뮤니티 포스트 입력 검증
 */
export function validateCommunityPostInput(input: unknown): ValidationResult<CommunityPostInput> {
  // 1. null/undefined 체크
  if (!input || typeof input !== 'object') {
    return { success: false, error: '유효하지 않은 입력입니다.' };
  }

  const data = input as Record<string, unknown>;

  // 2. author 필드 검증 (필수)
  if (typeof data.author !== 'string' || data.author.trim().length === 0) {
    return { success: false, error: 'author는 필수 문자열입니다.' };
  }
  if (data.author.length > 50) {
    return { success: false, error: 'author는 50자 이하여야 합니다.' };
  }

  // 3. storeName 필드 검증 (필수)
  if (typeof data.storeName !== 'string' || data.storeName.trim().length === 0) {
    return { success: false, error: 'storeName은 필수 문자열입니다.' };
  }
  if (data.storeName.length > 100) {
    return { success: false, error: 'storeName은 100자 이하여야 합니다.' };
  }

  // 4. content 필드 검증 (필수)
  if (typeof data.content !== 'string' || data.content.trim().length === 0) {
    return { success: false, error: 'content는 필수 문자열입니다.' };
  }
  if (data.content.length > 1000) {
    return { success: false, error: 'content는 1000자 이하여야 합니다.' };
  }

  // 5. wins 필드 검증 (선택적)
  let wins: string | undefined;
  if (data.wins !== undefined) {
    if (typeof data.wins !== 'string') {
      return { success: false, error: 'wins는 문자열이어야 합니다.' };
    }
    if (data.wins.length > 50) {
      return { success: false, error: 'wins는 50자 이하여야 합니다.' };
    }
    wins = sanitizeString(data.wins);
  }

  // 6. imageUrl 필드 검증 (선택적)
  let imageUrl: string | undefined;
  if (data.imageUrl !== undefined) {
    if (typeof data.imageUrl !== 'string') {
      return { success: false, error: 'imageUrl은 문자열이어야 합니다.' };
    }
    if (!isValidUrl(data.imageUrl)) {
      return { success: false, error: '유효하지 않은 이미지 URL입니다.' };
    }
    if (data.imageUrl.length > 500) {
      return { success: false, error: 'imageUrl은 500자 이하여야 합니다.' };
    }
    imageUrl = data.imageUrl;
  }

  return {
    success: true,
    data: {
      author: sanitizeString(data.author as string),
      storeName: sanitizeString(data.storeName as string),
      content: sanitizeString(data.content as string),
      wins,
      imageUrl,
    },
  };
}

// ============================================
// 보안 유틸리티
// ============================================

/**
 * XSS 방지를 위한 문자열 살균
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * URL 유효성 검사
 */
export function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    // 허용된 프로토콜만 허용
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

/**
 * 에러 응답 생성 (스택 트레이스 숨김)
 */
export function createSafeErrorResponse(message: string, status: number = 400) {
  return {
    error: message,
    timestamp: new Date().toISOString(),
  };
}

// ============================================
// Rate Limiting 헬퍼 (인메모리 - 프로덕션에서는 Redis 권장)
// ============================================

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * 간단한 인메모리 Rate Limiter
 * @param identifier IP 또는 사용자 ID
 * @param maxRequests 윈도우당 최대 요청 수
 * @param windowMs 윈도우 시간 (밀리초)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // 새 레코드 또는 윈도우 만료
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  // 제한 초과
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: record.resetTime - now,
    };
  }

  // 카운트 증가
  record.count++;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetIn: record.resetTime - now,
  };
}

/**
 * Rate limit 맵 정리 (메모리 누수 방지)
 */
export function cleanupRateLimitMap(): void {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}
