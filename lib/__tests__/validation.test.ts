import { describe, it, expect, beforeEach } from 'vitest';
import {
  validateLottoInput,
  validateCommunityPostInput,
  validateStatsQuery,
  validateStatsCategory,
  validateStoresQuery,
  sanitizeString,
  isValidUrl,
  checkRateLimit,
  cleanupRateLimitMap,
  getRateLimitMapSize,
} from '../validation';

describe('Lotto Input Validation', () => {
  it('유효한 로또 입력을 수락해야 한다', () => {
    const input = {
      numbers: [1, 7, 15, 22, 33, 45],
      round: 1205,
    };
    const result = validateLottoInput(input);
    expect(result.success).toBe(true);
    expect(result.data?.numbers).toEqual([1, 7, 15, 22, 33, 45]);
  });

  it('6개 미만의 번호는 거부해야 한다', () => {
    const input = {
      numbers: [1, 2, 3, 4, 5],
      round: 1205,
    };
    const result = validateLottoInput(input);
    expect(result.success).toBe(false);
    expect(result.error).toContain('6개');
  });

  it('중복 번호는 거부해야 한다', () => {
    const input = {
      numbers: [1, 1, 3, 4, 5, 6],
      round: 1205,
    };
    const result = validateLottoInput(input);
    expect(result.success).toBe(false);
    expect(result.error).toContain('중복');
  });

  it('범위를 벗어난 번호는 거부해야 한다', () => {
    const input = {
      numbers: [0, 7, 15, 22, 33, 45],
      round: 1205,
    };
    const result = validateLottoInput(input);
    expect(result.success).toBe(false);
    expect(result.error).toContain('1 이상');
  });

  it('46 이상의 번호는 거부해야 한다', () => {
    const input = {
      numbers: [1, 7, 15, 22, 33, 46],
      round: 1205,
    };
    const result = validateLottoInput(input);
    expect(result.success).toBe(false);
    expect(result.error).toContain('45 이하');
  });

  it('memo가 있는 경우 sanitize 되어야 한다', () => {
    const input = {
      numbers: [1, 7, 15, 22, 33, 45],
      round: 1205,
      memo: '<script>alert("xss")</script>',
    };
    const result = validateLottoInput(input);
    expect(result.success).toBe(true);
    expect(result.data?.memo).not.toContain('<script>');
    expect(result.data?.memo).toContain('&lt;script&gt;');
  });
});

describe('Community Post Validation', () => {
  it('유효한 커뮤니티 포스트를 수락해야 한다', () => {
    const input = {
      author: '행운이',
      storeName: '서울복권방',
      content: '여기서 1등 당첨됐어요!',
    };
    const result = validateCommunityPostInput(input);
    expect(result.success).toBe(true);
  });

  it('빈 author는 거부해야 한다', () => {
    const input = {
      author: '',
      storeName: '서울복권방',
      content: '테스트',
    };
    const result = validateCommunityPostInput(input);
    expect(result.success).toBe(false);
  });

  it('1000자 초과 content는 거부해야 한다', () => {
    const input = {
      author: '사용자',
      storeName: '가게',
      content: 'a'.repeat(1001),
    };
    const result = validateCommunityPostInput(input);
    expect(result.success).toBe(false);
    expect(result.error).toContain('1000자');
  });

  it('유효하지 않은 imageUrl은 거부해야 한다', () => {
    const input = {
      author: '사용자',
      storeName: '가게',
      content: '테스트',
      imageUrl: 'not-a-valid-url',
    };
    const result = validateCommunityPostInput(input);
    expect(result.success).toBe(false);
    expect(result.error).toContain('URL');
  });

  it('ftp URL은 거부해야 한다', () => {
    const input = {
      author: '사용자',
      storeName: '가게',
      content: '테스트',
      imageUrl: 'ftp://example.com/image.jpg',
    };
    const result = validateCommunityPostInput(input);
    expect(result.success).toBe(false);
  });
});

describe('Stats Query Validation', () => {
  it('기본값으로 유효한 쿼리를 생성해야 한다', () => {
    const params = new URLSearchParams();
    const result = validateStatsQuery(params);
    expect(result.success).toBe(true);
    expect(result.data?.level).toBe('elementary_level');
    expect(result.data?.page).toBe(1);
    expect(result.data?.limit).toBe(50);
  });

  it('문자열 숫자를 올바르게 변환해야 한다', () => {
    const params = new URLSearchParams({ page: '5', limit: '100' });
    const result = validateStatsQuery(params);
    expect(result.success).toBe(true);
    expect(result.data?.page).toBe(5);
    expect(result.data?.limit).toBe(100);
  });

  it('유효하지 않은 level은 거부해야 한다', () => {
    const params = new URLSearchParams({ level: 'invalid_level' });
    const result = validateStatsQuery(params);
    expect(result.success).toBe(false);
  });

  it('limit 초과는 거부해야 한다', () => {
    const params = new URLSearchParams({ limit: '501' });
    const result = validateStatsQuery(params);
    expect(result.success).toBe(false);
    expect(result.error).toContain('500');
  });
});

describe('Stats Category Validation', () => {
  it('유효한 카테고리를 수락해야 한다', () => {
    expect(validateStatsCategory('analysis_number').success).toBe(true);
    expect(validateStatsCategory('hot-cold_number').success).toBe(true);
    expect(validateStatsCategory('good_number_list').success).toBe(true);
  });

  it('유효하지 않은 카테고리는 거부해야 한다', () => {
    expect(validateStatsCategory('invalid_category').success).toBe(false);
    expect(validateStatsCategory('').success).toBe(false);
  });
});

describe('Stores Query Validation', () => {
  it('기본값으로 유효한 쿼리를 생성해야 한다', () => {
    const params = new URLSearchParams();
    const result = validateStoresQuery(params);
    expect(result.success).toBe(true);
    expect(result.data?.limit).toBe(1000);
    expect(result.data?.offset).toBe(0);
  });

  it('검색어를 소문자로 변환해야 한다', () => {
    const params = new URLSearchParams({ search: 'SEOUL' });
    const result = validateStoresQuery(params);
    expect(result.success).toBe(true);
    expect(result.data?.search).toBe('seoul');
  });
});

describe('Sanitize String', () => {
  it('HTML 태그를 이스케이프해야 한다', () => {
    expect(sanitizeString('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  it('앰퍼샌드를 이스케이프해야 한다', () => {
    expect(sanitizeString('A & B')).toBe('A &amp; B');
  });

  it('공백을 트림해야 한다', () => {
    expect(sanitizeString('  hello world  ')).toBe('hello world');
  });
});

describe('URL Validation', () => {
  it('유효한 http URL을 수락해야 한다', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('https://example.com/path?query=1')).toBe(true);
  });

  it('유효하지 않은 URL은 거부해야 한다', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('ftp://example.com')).toBe(false);
    expect(isValidUrl('javascript:alert(1)')).toBe(false);
  });
});

describe('Rate Limiting', () => {
  beforeEach(() => {
    // 각 테스트 전에 rate limit map 정리
    cleanupRateLimitMap();
  });

  it('첫 요청은 허용되어야 한다', () => {
    const result = checkRateLimit('test-ip-1', 10, 60000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(9);
  });

  it('제한 초과 시 요청을 거부해야 한다', () => {
    const ip = 'test-ip-limit';
    // 10번 요청
    for (let i = 0; i < 10; i++) {
      checkRateLimit(ip, 10, 60000);
    }
    // 11번째 요청은 거부되어야 함
    const result = checkRateLimit(ip, 10, 60000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('버스트 제한이 동작해야 한다', () => {
    const ip = 'test-ip-burst';
    // 버스트 제한 5로 설정하고 5번 요청
    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip, 100, 60000, 5);
    }
    // 6번째 요청은 버스트로 인해 거부
    const result = checkRateLimit(ip, 100, 60000, 5);
    expect(result.allowed).toBe(false);
  });

  it('getRateLimitMapSize가 올바른 크기를 반환해야 한다', () => {
    checkRateLimit('size-test-1', 10, 60000);
    checkRateLimit('size-test-2', 10, 60000);
    expect(getRateLimitMapSize()).toBeGreaterThanOrEqual(2);
  });
});
