const fs = require('fs');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.lottoplay.co.kr/lottolibrary/';
const TARGET_PAGES = [
    'lotto_infomation.php', // 로또 소개
    'lotto_term.php',       // 로또 용어정리
    'probability_johab.php',// 확률 및 조합
    'lotto_buy_trick.php',  // 로또 구입요령
    'lotto_history.php'     // 로또 History
];

async function fetchPage(url) {
    const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    });
    const buffer = await response.arrayBuffer();
    return iconv.decode(Buffer.from(buffer), 'euc-kr');
}

async function scrapeInfoPages() {
    console.log('📡 로또 정보 라이브러리(5개 페이지) 수집 시작...');
    const infoDB = {};

    for (const pageName of TARGET_PAGES) {
        const url = `${BASE_URL}${pageName}`;
        const key = pageName.replace('.php', '');
        console.log(`📡 수집 중: ${key}...`);

        try {
            const html = await fetchPage(url);
            const $ = cheerio.load(html);
            const content = {
                title: $('title').text().split('|')[0].trim(),
                sections: []
            };

            // 1. 테이블 데이터 추출 (확률 및 조합 등에 포함됨)
            $('table').each((i, table) => {
                if ($(table).hasClass('library')) return;
                const tableData = [];
                $(table).find('tr').each((j, tr) => {
                    const row = [];
                    $(tr).find('th, td').each((k, cell) => row.push($(cell).text().trim().replace(/\s+/g, ' ')));
                    if (row.length > 0) tableData.push(row);
                });
                if (tableData.length > 0) {
                    content.sections.push({ type: 'table', data: tableData });
                }
            });

            // 2. 텍스트 단락 추출 (용어 정리, 요령 등)
            // 주요 제목(strong, h3)과 내용(p, div) 쌍 추출 시도
            $('div.content, .box, .lotto_info').each((i, el) => {
                const text = $(el).text().trim().replace(/\s+/g, ' ');
                if (text.length > 50) {
                    content.sections.push({ type: 'text', data: text });
                }
            });

            infoDB[key] = content;
            await new Promise(r => setTimeout(r, 800));
        } catch (e) {
            console.error(`❌ ${key} 실패:`, e.message);
        }
    }

    fs.writeFileSync('data/lotto_info_master.json', JSON.stringify(infoDB, null, 2));
    console.log('✅ 로또 정보 마스터 데이터 저장 완료: data/lotto_info_master.json');
}

scrapeInfoPages();
