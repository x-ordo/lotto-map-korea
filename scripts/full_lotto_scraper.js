const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const { stringify } = require('csv-stringify/sync');

const CONFIG = {
    base_url: 'https://www.lottoplay.co.kr/lottolibrary/',
    output_dir: 'data/scraped_csv/',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

const PAGES = {
    elementary: [
        'analysis_number', 'appearance_number', 'ranking_number', 'picture_number',
        'lotto_nonumber', 'extermination_number', 'distribution_chart', 'serial_number',
        'statistics_sum', 'statistics_holzzak', 'statistics_pitch', 'statistics_acvalue'
    ],
    intermediate: [
        'neighbor_number', 'consecutive_numbers', 'hot-cold_number', 'week_hot-cold_number',
        '9gungdo', 'overlap_number', 'interval_number', 'prime_number',
        'start_number', 'last_number', '3x_number', '5x_number'
    ],
    high: [
        'return_number', 'nakcheom', 'pattern_number', 'end_number',
        'width_line', 'height_line', 'good_number_list', 'bad_number_list'
    ]
};

async function fetchPage(url) {
    const response = await fetch(url, { headers: { 'User-Agent': CONFIG.user_agent } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const buffer = await response.arrayBuffer();
    return iconv.decode(Buffer.from(buffer), 'euc-kr');
}

async function scrapeAll() {
    console.log('🚀 로또플레이 전체 통계 수집 시스템 가동...');
    if (!fs.existsSync(CONFIG.output_dir)) fs.mkdirSync(CONFIG.output_dir, { recursive: true });

    const logStream = fs.createWriteStream('docs/scraping_log.txt', { flags: 'a' });

    for (const [level, links] of Object.entries(PAGES)) {
        console.log(`
--- [${level.toUpperCase()}] 단계 수집 시작 ---`);
        
        for (const link of links) {
            const url = `${CONFIG.base_url}${level}_level/${link}.php`;
            const fileName = `${level}_${link}.csv`;
            const filePath = path.join(CONFIG.output_dir, fileName);

            try {
                console.log(`📡 수집 중: ${link}...`);
                const html = await fetchPage(url);
                const $ = cheerio.load(html);
                const csvData = [];

                // 1. 테이블 구조 분석 및 추출
                $('table').each((tableIdx, table) => {
                    $(table).find('tr').each((trIdx, tr) => {
                        const row = [];
                        $(tr).find('th, td').each((tdIdx, td) => {
                            // 데이터 정제: 공백 제거 및 특수문자 처리
                            let text = $(td).text().trim().replace(/\s+/g, ' ');
                            row.push(text);
                        });
                        if (row.length > 0) csvData.push(row);
                    });
                    csvData.push([]); // 테이블 간 공백 한 줄 추가
                });

                // 2. CSV 저장
                if (csvData.length > 0) {
                    const output = stringify(csvData);
                    fs.writeFileSync(filePath, output);
                    console.log(`✅ 저장 완료: ${fileName}`);
                } else {
                    throw new Error('No table data found');
                }

                // 서버 부하 방지를 위한 지연
                await new Promise(r => setTimeout(r, 700));

            } catch (err) {
                const errMsg = `[${new Date().toISOString()}] Error scraping ${url}: ${err.message}\n`;
                logStream.write(errMsg);
                console.error(`❌ 실패: ${link} (${err.message})`);
            }
        }
    }
    console.log('\n✨ 모든 데이터 수집 및 CSV 변환 완료!');
    logStream.end();
}

scrapeAll();
