const fs = require('fs');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.lottoplay.co.kr/lottolibrary/elementary_level/';
const TARGET_PAGES = [
    'analysis_number.php', 'appearance_number.php', 'ranking_number.php', 'picture_number.php',
    'lotto_nonumber.php', 'extermination_number.php', 'distribution_chart.php', 'serial_number.php',
    'statistics_sum.php', 'statistics_holzzak.php', 'statistics_pitch.php', 'statistics_acvalue.php'
];

async function fetchWithEncoding(url) {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        }
    });
    const buffer = await response.arrayBuffer();
    return iconv.decode(Buffer.from(buffer), 'euc-kr');
}

async function startFullCrawl() {
    console.log('🚀 [Elementary Level] 12개 전 페이지 크롤링 시작...');
    const db = {};

    for (const page of TARGET_PAGES) {
        const url = `${BASE_URL}${page}`;
        const pageName = page.replace('.php', '');
        console.log(`📡 수집 중: ${pageName}...`);

        try {
            const html = await fetchWithEncoding(url);
            const $ = cheerio.load(html);
            const dataRows = [];

            // 통계 테이블 추출 최적화
            $('table tr').each((i, tr) => {
                const row = [];
                $(tr).find('th, td').each((j, td) => {
                    const text = $(td).text().trim().replace(/\s+/g, ' ');
                    if (text) row.push(text);
                });
                if (row.length > 0) dataRows.push(row);
            });

            db[pageName] = {
                title: $('title').text().split('|')[0].trim(),
                url: url,
                rows: dataRows,
                updatedAt: new Date().toISOString()
            };

            // 서버 매너 지연
            await new Promise(r => setTimeout(r, 800));
        } catch (e) {
            console.error(`❌ ${pageName} 실패:`, e.message);
        }
    }

    fs.writeFileSync('data/lotto_elementary_full.json', JSON.stringify(db, null, 2));
    console.log('✅ 크롤링 완료! 저장위치: data/lotto_elementary_full.json');
}

startFullCrawl();
