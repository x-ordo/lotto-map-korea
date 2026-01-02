const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.lottoplay.co.kr/lottolibrary/';
const OUTPUT_DIR = 'data/lotto_library_final/';

const SITE_MAP = {
    elementary_level: [
        'analysis_number', 'appearance_number', 'ranking_number', 'picture_number',
        'lotto_nonumber', 'extermination_number', 'distribution_chart', 'serial_number',
        'statistics_sum', 'statistics_holzzak', 'statistics_pitch', 'statistics_acvalue'
    ],
    intermediate_level: [
        'neighbor_number', 'consecutive_numbers', 'hot-cold_number', 'week_hot-cold_number',
        '9gungdo', 'overlap_number', 'interval_number', 'prime_number',
        'start_number', 'last_number', '3x_number', '5x_number'
    ],
    high_level: [
        'return_number', 'nakcheom', 'pattern_number', 'end_number',
        'width_line', 'height_line', 'good_number_list', 'bad_number_list'
    ]
};

async function fetchPage(url) {
    const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    });
    const buffer = await response.arrayBuffer();
    return iconv.decode(Buffer.from(buffer), 'euc-kr');
}

async function scrapeEverything() {
    console.log('🚀 [Master Crawler] 32개 전 페이지 정밀 수집 시작...');
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const finalMasterDB = {};

    for (const [level, pages] of Object.entries(SITE_MAP)) {
        finalMasterDB[level] = {};
        console.log(`\n📦 [${level}] 수집 중...`);

        for (const pageName of pages) {
            const url = `${BASE_URL}${level}/${pageName}.php`;
            try {
                const html = await fetchPage(url);
                const $ = cheerio.load(html);
                const pageData = {
                    title: $('title').text().split('|')[0].trim(),
                    headers: [],
                    rows: []
                };

                // 통계용 메인 테이블 탐색 (library 클래스 테이블 제외)
                $('table').each((i, table) => {
                    const $table = $(table);
                    if ($table.hasClass('library')) return; // 내비게이션 테이블 스킵

                    $table.find('tr').each((j, tr) => {
                        const rowData = [];
                        $(tr).find('th, td').each((k, cell) => {
                            rowData.push($(cell).text().trim().replace(/\s+/g, ' '));
                        });
                        
                        if (rowData.length > 0) {
                            if ($(tr).find('th').length > 0 && pageData.headers.length === 0) {
                                pageData.headers = rowData;
                            } else {
                                pageData.rows.push(rowData);
                            }
                        }
                    });
                });

                finalMasterDB[level][pageName] = pageData;
                console.log(`✅ ${pageName} 완료 (${pageData.rows.length} rows)`);
                
                // 서버 부하 조절
                await new Promise(r => setTimeout(r, 600));
            } catch (e) {
                console.error(`❌ ${pageName} 실패:`, e.message);
            }
        }
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, 'master_data.json'), JSON.stringify(finalMasterDB, null, 2));
    console.log('\n✨ [Mission Complete] 모든 데이터가 data/lotto_library_final/master_data.json 에 통합되었습니다.');
}

scrapeEverything();
