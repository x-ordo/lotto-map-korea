const fs = require('fs');

async function fetchWinningNumbers() {
    // 실제로는 API나 크롤링이 필요하지만, 여기서는 시뮬레이션 데이터를 생성합니다.
    // 1회부터 최근까지의 가상 통계 데이터를 만듭니다.
    const stats = {
        mostFrequent: [34, 18, 27, 1, 43, 12], // 가장 많이 나온 번호들
        leastFrequent: [9, 22, 31, 5, 15, 38], // 가장 적게 나온 번호들
        lastNumbers: [4, 11, 28, 39, 42, 45, 6], // 최근 회차 번호
        frequency: {} // 전체 빈도수
    };

    for (let i = 1; i <= 45; i++) {
        stats.frequency[i] = Math.floor(Math.random() * 100) + 120;
    }

    fs.writeFileSync('data/lottoStats.json', JSON.stringify(stats, null, 2));
    console.log('Successfully saved lotto statistics to data/lottoStats.json');
}

fetchWinningNumbers().catch(console.error);
