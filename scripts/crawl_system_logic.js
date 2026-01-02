const fs = require('fs');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.lottoplay.co.kr/system/';
const TARGET_PAGES = [
    'system_17.php', 'system_11.php', 'system_15.php', 'system_12.php',
    'system_13.php', 'system_14.php', 'number_analysis.php'
];

async function fetchPage(url) {
    const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    });
    const buffer = await response.arrayBuffer();
    return iconv.decode(Buffer.from(buffer), 'euc-kr');
}

async function scrapeSystemLogic() {
    console.log('📡 로또조합 시스템 알고리즘 분석 시작...');
    const systemDB = {};

    for (const pageName of TARGET_PAGES) {
        const url = `${BASE_URL}${pageName}`;
        console.log(`📡 분석 중: ${pageName}...`);

        try {
            const html = await fetchPage(url);
            const $ = cheerio.load(html);
            
            // 핵심 로직: 폼 필드 및 설명 텍스트 추출
            const filters = [];
            $('input[type="checkbox"], select, input[type="text"]').each((i, el) => {
                const label = $(el).parent().text().trim().replace(/\s+/g, ' ');
                if (label) filters.push(label);
            });

            const description = $('.system_info, .box, .content').text().trim().replace(/\s+/g, ' ');

            systemDB[pageName] = {
                title: $('title').text().split('|')[0].trim(),
                summary: description.slice(0, 300), // 요약문 추출
                detectedFilters: [...new Set(filters)].slice(0, 15) // 주요 필터 항목
            };

            await new Promise(r => setTimeout(r, 800));
        } catch (e) {
            console.error(`❌ ${pageName} 실패:`, e.message);
        }
    }

    fs.writeFileSync('data/lotto_system_algorithms.json', JSON.stringify(systemDB, null, 2));
    console.log('✅ 시스템 알고리즘 데이터 저장 완료: data/lotto_system_algorithms.json');
}

scrapeSystemLogic();
