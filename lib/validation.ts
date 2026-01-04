/**
 * 입력 검증 및 보안 유틸리티
 * Zod v4를 사용한 타입 안전한 스키마 검증
 */

import { z } from 'zod';

// ============================================
// Zod 스키마 정의
// ============================================

/**
 * 로또 번호 스키마
 * - 6개의 고유한 1-45 범위 정수
 */
export const LottoNumberSchema = z.number()
  .int('번호는 정수여야 합니다.')
  .min(1, '번호는 1 이상이어야 합니다.')
  .max(45, '번호는 45 이하여야 합니다.');

export const LottoInputSchema = z.object({
  numbers: z.array(LottoNumberSchema)
    .length(6, '로또 번호는 6개여야 합니다.')
    .refine(
      (nums) => new Set(nums).size === 6,
      '중복된 번호가 있습니다.'
    ),
  round: z.number()
    .int('round는 정수여야 합니다.')
    .min(1, 'round는 1 이상이어야 합니다.')
    .max(9999, 'round는 9999 이하여야 합니다.'),
  memo: z.string()
    .max(200, 'memo는 200자 이하여야 합니다.')
    .optional()
    .transform((val) => val ? sanitizeString(val) : undefined),
});

/**
 * 커뮤니티 포스트 스키마
 */
export const CommunityPostInputSchema = z.object({
  author: z.string()
    .min(1, 'author는 필수입니다.')
    .max(50, 'author는 50자 이하여야 합니다.')
    .transform(sanitizeString),
  storeName: z.string()
    .min(1, 'storeName은 필수입니다.')
    .max(100, 'storeName은 100자 이하여야 합니다.')
    .transform(sanitizeString),
  content: z.string()
    .min(1, 'content는 필수입니다.')
    .max(1000, 'content는 1000자 이하여야 합니다.')
    .transform(sanitizeString),
  wins: z.string()
    .max(50, 'wins는 50자 이하여야 합니다.')
    .optional()
    .transform((val) => val ? sanitizeString(val) : undefined),
  imageUrl: z.string()
    .max(500, 'imageUrl은 500자 이하여야 합니다.')
    .url('유효하지 않은 URL입니다.')
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return ['http:', 'https:'].includes(parsed.protocol);
        } catch {
          return false;
        }
      },
      'http 또는 https URL만 허용됩니다.'
    )
    .optional(),
});

/**
 * 통계 레벨 스키마
 */
const VALID_LEVELS = ['elementary_level', 'intermediate_level', 'high_level'] as const;

export const StatsLevelSchema = z.enum(VALID_LEVELS, {
  message: '유효하지 않은 레벨입니다.',
});

/**
 * 통계 API 쿼리 파라미터 스키마
 */
export const StatsQuerySchema = z.object({
  level: StatsLevelSchema.default('elementary_level'),
  page: z.coerce.number()
    .int('page는 정수여야 합니다.')
    .min(1, 'page는 1 이상이어야 합니다.')
    .max(10000, 'page는 10000 이하여야 합니다.')
    .default(1),
  limit: z.coerce.number()
    .int('limit는 정수여야 합니다.')
    .min(1, 'limit는 1 이상이어야 합니다.')
    .max(500, 'limit는 500 이하여야 합니다.')
    .default(50),
});

/**
 * 매장 검색 쿼리 파라미터 스키마
 */
export const StoresQuerySchema = z.object({
  search: z.string()
    .max(100, 'search는 100자 이하여야 합니다.')
    .optional()
    .transform((val) => val?.toLowerCase()),
  limit: z.coerce.number()
    .int('limit는 정수여야 합니다.')
    .min(1, 'limit는 1 이상이어야 합니다.')
    .max(1000, 'limit는 1000 이하여야 합니다.')
    .default(1000),
  offset: z.coerce.number()
    .int('offset은 정수여야 합니다.')
    .min(0, 'offset은 0 이상이어야 합니다.')
    .default(0),
});

/**
 * 통계 카테고리 이름 스키마
 */
const VALID_CATEGORIES = [
  // Elementary
  'analysis_number', 'appearance_number', 'ranking_number', 'picture_number',
  'lotto_nonumber', 'extermination_number', 'distribution_chart', 'serial_number',
  'statistics_sum', 'statistics_holzzak', 'statistics_pitch', 'statistics_acvalue',
  // Intermediate
  'neighbor_number', 'consecutive_numbers', 'hot-cold_number', 'week_hot-cold_number',
  '9gungdo', 'overlap_number', 'interval_number', 'prime_number',
  'start_number', 'last_number', '3x_number', '5x_number',
  // High
  'return_number', 'nakcheom', 'pattern_number', 'end_number',
  'width_line', 'height_line', 'good_number_list', 'bad_number_list',
] as const;

export const StatsCategorySchema = z.enum(VALID_CATEGORIES, {
  message: '유효하지 않은 통계 카테고리입니다.',
});

// ============================================
// 타입 정의 (Zod 스키마에서 추론)
// ============================================

export type LottoInput = z.infer<typeof LottoInputSchema>;
export type CommunityPostInput = z.infer<typeof CommunityPostInputSchema>;
export type StatsQuery = z.infer<typeof StatsQuerySchema>;
export type StoresQuery = z.infer<typeof StoresQuerySchema>;
export type StatsCategory = z.infer<typeof StatsCategorySchema>;

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================
// 헬퍼 함수: Zod 에러 메시지 추출
// ============================================

function getFirstErrorMessage(error: z.ZodError): string {
  const issues = error.issues;
  if (issues && issues.length > 0) {
    return issues[0].message;
  }
  return '유효하지 않은 입력입니다.';
}

// ============================================
// 검증 함수 (기존 API 호환성 유지)
// ============================================

/**
 * 로또 번호 입력 검증
 */
export function validateLottoInput(input: unknown): ValidationResult<LottoInput> {
  const result = LottoInputSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    error: getFirstErrorMessage(result.error),
  };
}

/**
 * 커뮤니티 포스트 입력 검증
 */
export function validateCommunityPostInput(input: unknown): ValidationResult<CommunityPostInput> {
  const result = CommunityPostInputSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    error: getFirstErrorMessage(result.error),
  };
}

/**
 * 통계 API 쿼리 파라미터 검증
 */
export function validateStatsQuery(params: URLSearchParams): ValidationResult<StatsQuery> {
  const result = StatsQuerySchema.safeParse({
    level: params.get('level') || undefined,
    page: params.get('page') || undefined,
    limit: params.get('limit') || undefined,
  });
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    error: getFirstErrorMessage(result.error),
  };
}

/**
 * 통계 카테고리 검증
 */
export function validateStatsCategory(category: string): ValidationResult<StatsCategory> {
  const result = StatsCategorySchema.safeParse(category);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    error: getFirstErrorMessage(result.error),
  };
}

/**
 * 매장 검색 쿼리 파라미터 검증
 */
export function validateStoresQuery(params: URLSearchParams): ValidationResult<StoresQuery> {
  const result = StoresQuerySchema.safeParse({
    search: params.get('search') || undefined,
    limit: params.get('limit') || undefined,
    offset: params.get('offset') || undefined,
  });
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    error: getFirstErrorMessage(result.error),
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
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

/**
 * 에러 응답 생성 (스택 트레이스 숨김)
 */
export function createSafeErrorResponse(message: string, _status: number = 400) {
  return {
    error: message,
    timestamp: new Date().toISOString(),
  };
}

// ============================================
// Rate Limiting 헬퍼
// ============================================

/**
 * ⚠️ 인메모리 Rate Limiter (Sliding Window Counter 알고리즘)
 *
 * 제한 사항:
 * - 서버리스/분산 환경에서는 인스턴스별로 독립 동작
 * - 프로덕션에서는 Redis, Cloudflare KV, 또는 Upstash 사용 권장
 *
 * 기능:
 * - Sliding window counter: 더 정확한 속도 제한
 * - 자동 메모리 정리: 만료된 레코드 자동 삭제
 * - Burst 보호: 짧은 시간 내 대량 요청 방지
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
  previousCount: number;
  previousResetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// 메모리 정리 간격 (5분)
const CLEANUP_INTERVAL_MS = 300000;
let lastCleanupTime = Date.now();

/**
 * IP 주소 정규화 (IPv6 축약, 프록시 처리)
 */
function normalizeIP(ip: string): string {
  // 빈 값 처리
  if (!ip || ip === 'unknown') return 'unknown';

  // ::ffff: IPv4-mapped IPv6 주소 처리
  if (ip.startsWith('::ffff:')) {
    return ip.substring(7);
  }

  // 기본 정규화
  return ip.toLowerCase().trim();
}

/**
 * Sliding Window Counter Rate Limiter
 *
 * @param identifier IP 또는 사용자 ID
 * @param maxRequests 윈도우당 최대 요청 수
 * @param windowMs 윈도우 시간 (밀리초)
 * @param burstLimit 순간 버스트 제한 (선택적)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000,
  burstLimit?: number
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();

  // 주기적 메모리 정리
  if (now - lastCleanupTime > CLEANUP_INTERVAL_MS) {
    cleanupRateLimitMap();
    lastCleanupTime = now;
  }

  // IP 정규화
  const normalizedId = normalizeIP(identifier);

  const record = rateLimitMap.get(normalizedId);

  // 새 레코드
  if (!record) {
    rateLimitMap.set(normalizedId, {
      count: 1,
      resetTime: now + windowMs,
      previousCount: 0,
      previousResetTime: 0,
    });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  // 윈도우 만료 시 이전 윈도우로 이동
  if (now > record.resetTime) {
    record.previousCount = record.count;
    record.previousResetTime = record.resetTime;
    record.count = 1;
    record.resetTime = now + windowMs;
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  // Sliding window 계산
  // 현재 윈도우에서 경과한 비율 계산
  const windowStart = record.resetTime - windowMs;
  const windowProgress = (now - windowStart) / windowMs;

  // 이전 윈도우의 가중치 적용 (남은 비율만큼)
  let estimatedCount = record.count;
  if (record.previousResetTime > 0 && now - record.previousResetTime < windowMs) {
    const previousWeight = 1 - windowProgress;
    estimatedCount += Math.floor(record.previousCount * previousWeight);
  }

  // 제한 초과 체크
  if (estimatedCount >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: record.resetTime - now,
    };
  }

  // 버스트 제한 체크 (선택적)
  if (burstLimit && record.count >= burstLimit) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.min(5000, record.resetTime - now), // 버스트는 5초 대기
    };
  }

  // 카운트 증가
  record.count++;
  const remaining = Math.max(0, maxRequests - estimatedCount - 1);

  return {
    allowed: true,
    remaining,
    resetIn: record.resetTime - now,
  };
}

/**
 * Rate limit 맵 정리 (메모리 누수 방지)
 * 만료된 레코드 자동 삭제
 */
export function cleanupRateLimitMap(): void {
  const now = Date.now();
  const expiredKeys: string[] = [];

  for (const [key, value] of rateLimitMap.entries()) {
    // 현재 윈도우와 이전 윈도우 모두 만료된 경우 삭제
    if (now > value.resetTime && now - value.previousResetTime > 60000) {
      expiredKeys.push(key);
    }
  }

  for (const key of expiredKeys) {
    rateLimitMap.delete(key);
  }

  // 메모리 사용량 로깅 (디버그용)
  if (rateLimitMap.size > 10000) {
    console.warn(`Rate limit map size: ${rateLimitMap.size} entries`);
  }
}

/**
 * Rate limit 맵 크기 반환 (모니터링용)
 */
export function getRateLimitMapSize(): number {
  return rateLimitMap.size;
}
