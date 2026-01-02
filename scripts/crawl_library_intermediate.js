const fs = require('fs');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.lottoplay.co.kr/lottolibrary/intermediate_level/';
const TARGET_PAGES = [
    'neighbor_number.php', 'consecutive_numbers.php', 'hot-cold_number.php', 'week_hot-cold_number.php',
    '9gungdo.php', 'overlap_number.php', 'interval_number.php', 'prime_number.php',
    'start_number.php', 'last_number.php', '3x_number.php', '5x_number.php'
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

async function startIntermediateCrawl() {
    console.log('🚀 [Intermediate Level] 12개 페이지 크롤링 시작...');
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

            await new Promise(r => setTimeout(r, 800));
        } catch (e) {
            console.error(`❌ ${pageName} 실패:`, e.message);
        }
    }

    fs.writeFileSync('data/lotto_intermediate_full.json', JSON.stringify(db, null, 2));
    console.log('✅ 중급 데이터 수집 완료! 저장위치: data/lotto_intermediate_full.json');
}

startIntermediateCrawl();
