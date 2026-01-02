const fs = require('fs');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.lottoplay.co.kr/lottolibrary';
const TARGET_PAGES = [
    '/elementary_level/analysis_number.php', // 번호별 통계
    '/elementary_level/ranking_number.php',  // 순위별 통계
    '/intermediate_level/analysis_pattern.php', // 패턴 분석 (가상)
];

async function fetchWithEncoding(url) {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
        }
    });
    const buffer = await response.arrayBuffer();
    return iconv.decode(Buffer.from(buffer), 'euc-kr');
}

async function crawlLibrary() {
    console.log('🚀 로또플레이 라이브러리 전체 크롤링 시작...');
    const totalData = {};

    for (const path of TARGET_PAGES) {
        const url = `${BASE_URL}${path}`;
        console.log(`📡 수집 중: ${url}`);
        
        try {
            const html = await fetchWithEncoding(url);
            const $ = cheerio.load(html);
            const pageKey = path.split('/').pop().replace('.php', '');
            
            const tableData = [];
            // 사이트 내 데이터 테이블 추출 (일반적인 .table_style 클래스 기준)
            $('table tr').each((i, row) => {
                const cols = [];
                $(row).find('td, th').each((j, col) => {
                    cols.push($(col).text().trim());
                });
                if (cols.length > 0) tableData.push(cols);
            });

            totalData[pageKey] = tableData;
            // 서버 부하 방지를 위한 미세 지연
            await new Promise(r => setTimeout(r, 500));
        } catch (e) {
            console.error(`❌ ${path} 수집 실패:`, e.message);
        }
    }

    fs.writeFileSync('data/lotto_library_all.json', JSON.stringify(totalData, null, 2));
    console.log('✅ 모든 데이터 수집 완료: data/lotto_library_all.json');
}

crawlLibrary();
