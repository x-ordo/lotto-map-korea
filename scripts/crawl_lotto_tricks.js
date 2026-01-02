const fs = require('fs');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

async function crawlAndRefineTricks() {
    console.log('📡 로또 구입 요령 정밀 정제 중...');
    const url = 'https://www.lottoplay.co.kr/lottolibrary/lotto_buy_trick.php';
    
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
        });
        const buffer = await response.arrayBuffer();
        const html = iconv.decode(Buffer.from(buffer), 'euc-kr');
        const $ = cheerio.load(html);

        const bodyText = $('body').text();
        const refinedTricks = [];

        // 1번부터 15번까지의 패턴을 안전하게 추출
        for (let i = 1; i <= 15; i++) {
            const currentMarker = `${i}. `;
            const nextMarker = `${i + 1}. `;
            
            let startIdx = bodyText.indexOf(currentMarker);
            if (startIdx === -1) continue;
            
            let endIdx = bodyText.indexOf(nextMarker, startIdx + currentMarker.length);
            if (endIdx === -1) {
                // 마지막 아이템 처리 (15번)
                endIdx = bodyText.indexOf('이용약관', startIdx);
            }

            const block = bodyText.substring(startIdx + currentMarker.length, endIdx).trim();
            const lines = block.split('\n').map(l => l.trim()).filter(l => l);
            
            if (lines.length > 0) {
                refinedTricks.push({
                    id: i,
                    title: lines[0],
                    content: lines.slice(1).join(' ').replace(/\s+/g, ' '),
                    category: '구입요령'
                });
            }
        }

        fs.writeFileSync('data/lotto_knowledge.json', JSON.stringify(refinedTricks, null, 2));
        console.log(`✅ 정제 완료: ${refinedTricks.length}개의 상식 아이템 저장됨.`);
        
    } catch (e) {
        console.error('❌ 실패:', e.message);
    }
}

crawlAndRefineTricks();
