const fs = require('fs');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.lottoplay.co.kr/lottolibrary/high_level/';
const TARGET_PAGES = [
    'return_number.php', 'nakcheom.php', 'pattern_number.php', 'end_number.php',
    'width_line.php', 'height_line.php', 'good_number_list.php', 'bad_number_list.php'
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

async function startHighLevelCrawl() {
    console.log('🚀 [High Level] 8개 고급 분석 페이지 수집 시작...');
    const db = {};

    for (const page of TARGET_PAGES) {
        const url = `${BASE_URL}${page}`;
        const pageName = page.replace('.php', '');
        console.log(`📡 수집 중: ${pageName}...`);

        try {
            const html = await fetchWithEncoding(url);
            const $ = cheerio.load(html);
            const dataRows = [];

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

            await new Promise(r => setTimeout(r, 1000)); // 고급 분석은 데이터가 많으므로 지연시간 증가
        } catch (e) {
            console.error(`❌ ${pageName} 수집 실패:`, e.message);
        }
    }

    fs.writeFileSync('data/lotto_high_full.json', JSON.stringify(db, null, 2));
    console.log('✅ 고급 데이터 수집 완료! 저장위치: data/lotto_high_full.json');
}

startHighLevelCrawl();
