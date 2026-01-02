(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lotto-map-korea/lib/luckEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeLuckLocal",
    ()=>analyzeLuckLocal
]);
// [심리전] 콜드 리딩(Cold Reading) 템플릿: 누구나 자기 얘기처럼 느끼게 하는 문구
const FORTUNE_TEMPLATES = [
    {
        text: "동쪽에서 귀인이 다가옵니다. 이번 주는 직감을 믿고 과감하게 행동하세요.",
        keywords: "귀인,직감,과감"
    },
    {
        text: "정체된 기운이 풀리고 있습니다. 소액으로 꾸준히 도전하면 큰 흐름을 탑니다.",
        keywords: "해소,흐름,꾸준함"
    },
    {
        text: "뜻밖의 횡재수가 보입니다. 평소와 다른 번호를 선택해보는 것이 좋습니다.",
        keywords: "횡재,변화,기회"
    },
    {
        text: "재물운이 상승 곡선을 그립니다. 잃을 것이 없는 가벼운 마음이 행운을 부릅니다.",
        keywords: "상승,가벼움,행운"
    },
    {
        text: "강력한 화(火)의 기운이 느껴집니다. 숫자 9나 1이 들어간 번호를 주목하세요.",
        keywords: "열정,숫자,집중"
    }
];
const analyzeLuckLocal = (store)=>{
    // [Trap] 날짜 + 가게 ID = 고정된 시드값.
    // 사용자가 "새로고침"을 해도 같은 결과가 나와야 "진짜 분석"이라고 착각한다.
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const seedString = `${store.id}-${today}-MONOPOLY`;
    // 간단한 해시 생성 (LCG 변형)
    let hash = 0;
    for(let i = 0; i < seedString.length; i++){
        hash = (hash << 5) - hash + seedString.charCodeAt(i);
        hash |= 0;
    }
    const pseudoRandom = ()=>{
        hash = (hash * 1664525 + 1013904223) % 4294967296;
        return Math.abs(hash) / 4294967296;
    };
    // 점수 후킹: 절대 80점 밑으로 주지 마라. 고객은 기분 나쁘면 앱을 지운다.
    const score = 80 + Math.floor(pseudoRandom() * 20);
    // 번호 생성: 1~45 중복 제거
    const numbers = new Set();
    // 첫 번호는 가게 이름 길이로 생성하여 '로컬 연관성' 부여 (기만)
    numbers.add(store.name.length * 7 % 45 + 1);
    while(numbers.size < 6){
        numbers.add(Math.floor(pseudoRandom() * 45) + 1);
    }
    // 멘트 선정
    const templateIdx = Math.floor(pseudoRandom() * FORTUNE_TEMPLATES.length);
    const selected = FORTUNE_TEMPLATES[templateIdx];
    return {
        score,
        recommendation: `행운 키워드: ${selected.keywords}`,
        luckyNumber: Array.from(numbers).sort((a, b)=>a - b),
        insights: `${store.name}의 지기(地氣) 분석: ${selected.text}`
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lotto-map-korea/lib/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_STORES",
    ()=>MOCK_STORES
]);
const MOCK_STORES = [
    {
        "id": "종합복권슈퍼",
        "name": "종합복권슈퍼",
        "address": "경기 시흥시 마유로 336",
        "lat": 37.3457443131004,
        "lng": 126.735588934187,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 3,
        "winCount2nd": 0
    },
    {
        "id": "부일카서비스",
        "name": "부일카서비스",
        "address": "부산 동구 자성로133번길 35",
        "lat": 35.1400559949767,
        "lng": 129.063051640925,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 3,
        "winCount2nd": 0
    },
    {
        "id": "오천억복권방",
        "name": "오천억복권방",
        "address": "광주 서구 상무대로 1087",
        "lat": 35.1530093775319,
        "lng": 126.880710968618,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 3,
        "winCount2nd": 0
    },
    {
        "id": "한꿈복권방",
        "name": "한꿈복권방",
        "address": "울산 중구 번영로 586",
        "lat": 35.5687727562348,
        "lng": 129.345871744291,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 3,
        "winCount2nd": 0
    },
    {
        "id": "로또명당해미점",
        "name": "로또명당해미점",
        "address": "충남 서산시 남문2로 108",
        "lat": 36.7134821631912,
        "lng": 126.544214492603,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "복권세상",
        "name": "복권세상",
        "address": "전남 목포시 청호로 139",
        "lat": 34.8118309400519,
        "lng": 126.392235351241,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "행운복권",
        "name": "행운복권",
        "address": "전남 무안군 영산로 1693",
        "lat": 34.909702854736,
        "lng": 126.429653605416,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "복권명당",
        "name": "복권명당",
        "address": "경북 경산시 경안로 214",
        "lat": 35.8266197549989,
        "lng": 128.736806406212,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "NG24",
        "name": "NG24",
        "address": "경북 칠곡군 석적읍 북중리3길 59",
        "lat": 36.0798023213393,
        "lng": 128.41185037286,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "로또복권-포항IC점",
        "name": "로또복권 포항IC점",
        "address": "경북 포항시 북구 새마을로 340",
        "lat": 36.0458062627399,
        "lng": 129.327560557284,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "알리바이",
        "name": "알리바이",
        "address": "광주 광산구 수등로 253",
        "lat": 35.1853841277982,
        "lng": 126.836651090564,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "대광복권방",
        "name": "대광복권방",
        "address": "전남 화순군 칠충로 55 대광로제비앙",
        "lat": 35.0554316829248,
        "lng": 126.977740365431,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "금두꺼비복권방",
        "name": "금두꺼비복권방",
        "address": "경기 고양시 일산서구 강성로 263",
        "lat": 37.6767581599566,
        "lng": 126.748054044636,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "로또명당인주점",
        "name": "로또명당인주점",
        "address": "충남 아산시 서해로 519-2",
        "lat": 36.8776246747002,
        "lng": 126.896939492238,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "NBA(엔비에이)",
        "name": "NBA(엔비에이)",
        "address": "인천 중구 신도시남로142번길 6",
        "lat": 37.4934207705586,
        "lng": 126.491489796733,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "흥양마중물",
        "name": "흥양마중물",
        "address": "강원 원주시 치악로 2335",
        "lat": 37.3836922357711,
        "lng": 127.975354200086,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "황금복권방",
        "name": "황금복권방",
        "address": "강원 원주시 봉화로 74",
        "lat": 37.3506965306473,
        "lng": 127.929296251916,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "로또복권두정점",
        "name": "로또복권두정점",
        "address": "충남 천안시 서북구 두정로 251",
        "lat": 36.8334828622531,
        "lng": 127.145014385719,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "진평양행",
        "name": "진평양행",
        "address": "강원 강릉시 임영로 107",
        "lat": 37.7512348337798,
        "lng": 128.89409118199,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "주택복권방",
        "name": "주택복권방",
        "address": "강원 원주시 우산초교길 29",
        "lat": 37.3673587552496,
        "lng": 127.937934674673,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "복권세상",
        "name": "복권세상",
        "address": "전남 목포시 영산로270번길 2",
        "lat": 34.8037837472222,
        "lng": 126.395530013633,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "베스트올수성점",
        "name": "베스트올수성점",
        "address": "전북 정읍시 수성2로 28 영화마을 VIDEO",
        "lat": 35.5817670520118,
        "lng": 126.854448910252,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "당하복권명당",
        "name": "당하복권명당",
        "address": "인천 서구 서곶로 788 홀리랜드",
        "lat": 37.5881209362767,
        "lng": 126.675351701003,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "우리로또",
        "name": "우리로또",
        "address": "경기 의정부시 새말로 7",
        "lat": 37.7481490425016,
        "lng": 127.06467174666,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "행복한사람들-(흥부네)",
        "name": "행복한사람들 (흥부네)",
        "address": "경기 광주시 경충대로 746",
        "lat": 37.3551963053282,
        "lng": 127.327489673943,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "대박천하마트",
        "name": "대박천하마트",
        "address": "인천 부평구 굴포로 48",
        "lat": 37.5115550103661,
        "lng": 126.726281656042,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "패밀리복권방",
        "name": "패밀리복권방",
        "address": "경기 남양주시 늘을1로16번길 29",
        "lat": 37.654082753503,
        "lng": 127.2433325019,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "대길복권",
        "name": "대길복권",
        "address": "경기 수원시 장안구 서부로 2129-1",
        "lat": 37.2987682920575,
        "lng": 126.971293514686,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "나눔로또한대점",
        "name": "나눔로또한대점",
        "address": "경기 안산시 상록구 중보로 57 한양대프라자",
        "lat": 37.3081120642399,
        "lng": 126.852848213793,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "일등복권",
        "name": "일등복권",
        "address": "경기 양주시 송랑로 223",
        "lat": 37.8044859572152,
        "lng": 127.085310369977,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "복권",
        "name": "복권",
        "address": "경기 의정부시 태평로 75",
        "lat": 37.7392220532447,
        "lng": 127.051327974518,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "세븐일레븐-홍익점",
        "name": "세븐일레븐 홍익점",
        "address": "경기 안성시 종합운동장로 161",
        "lat": 37.0129524615376,
        "lng": 127.325773523738,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "대전우표사",
        "name": "대전우표사",
        "address": "대전 동구 중앙로204번길 16-1",
        "lat": 36.3301419650559,
        "lng": 127.432108815301,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "롯데무역",
        "name": "롯데무역",
        "address": "부산 영도구 꿈나무길 197",
        "lat": 35.0872824268325,
        "lng": 129.04372789849,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "복권나라",
        "name": "복권나라",
        "address": "서울 관악구 남부순환로 1739-9",
        "lat": 37.4828013647636,
        "lng": 126.943500830574,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "복권나라",
        "name": "복권나라",
        "address": "서울 관악구 은천로 40-1",
        "lat": 37.4860180512095,
        "lng": 126.939843355048,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "복권나라",
        "name": "복권나라",
        "address": "서울 관악구 장군봉2길 11",
        "lat": 37.4824466875174,
        "lng": 126.939594879058,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "그랜드마트앞가판점",
        "name": "그랜드마트앞가판점",
        "address": "서울 마포구 신촌로 94",
        "lat": 37.5549939272318,
        "lng": 126.936001762116,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "제이복권방",
        "name": "제이복권방",
        "address": "서울 종로구 종로 225-1",
        "lat": 37.5712522392538,
        "lng": 127.002841251476,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0
    },
    {
        "id": "일동복권판매점",
        "name": "일동복권판매점",
        "address": "경기 포천시 화동로 1081",
        "lat": 37.9598260056124,
        "lng": 127.318776529661,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "한빛3단지-천지인",
        "name": "한빛3단지 천지인",
        "address": "경기 파주시 와석순환로 66",
        "lat": 37.7103214556785,
        "lng": 126.751759590157,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "대박행진-복권랜드",
        "name": "대박행진 복권랜드",
        "address": "경기 파주시 금빛로 22",
        "lat": 37.7516589858332,
        "lng": 126.76694335458,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "용이복권방",
        "name": "용이복권방",
        "address": "경기 평택시 현신3길 44",
        "lat": 36.9969676407264,
        "lng": 127.139664076321,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "프랜드편의점",
        "name": "프랜드편의점",
        "address": "경기 화성시 3.1만세로 1100-2",
        "lat": 37.1320054070798,
        "lng": 126.907997822239,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "성강동인",
        "name": "성강동인",
        "address": "경기 하남시 신장로 212",
        "lat": 37.543922368772,
        "lng": 127.198273083866,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "이제이",
        "name": "이제이",
        "address": "경기 화성시 동탄산척로2나길 4-12",
        "lat": 37.174658028076,
        "lng": 127.114339098286,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "스피드세븐",
        "name": "스피드세븐",
        "address": "경기 화성시 한절이길 15",
        "lat": 37.1174304771483,
        "lng": 126.915680303051,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "대소원로또",
        "name": "대소원로또",
        "address": "충북 충주시 대소원면 중원대로 4373",
        "lat": 36.9732511656846,
        "lng": 127.823593034787,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "자매점",
        "name": "자매점",
        "address": "경기 파주시 문화로 95",
        "lat": 37.762699507518,
        "lng": 126.774731570076,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "천금복권방",
        "name": "천금복권방",
        "address": "충북 청주시 상당구 쇠내로 150-1",
        "lat": 36.6207558192688,
        "lng": 127.507987132946,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "비엠복권",
        "name": "비엠복권",
        "address": "충북 청주시 흥덕구 대신로 108 청주테크노밸리",
        "lat": 36.6425894542067,
        "lng": 127.435479831019,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "썬마트",
        "name": "썬마트",
        "address": "충북 청주시 흥덕구 진재로23번길 25",
        "lat": 36.632588427906,
        "lng": 127.4281248183,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "드림복권방",
        "name": "드림복권방",
        "address": "충북 청주시 흥덕구 내수동로42번길 4",
        "lat": 36.6325807909356,
        "lng": 127.451955460861,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "오사랑복권",
        "name": "오사랑복권",
        "address": "충북 청주시 흥덕구 진재로 42",
        "lat": 36.6349625748292,
        "lng": 127.429668990184,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "행복복권방",
        "name": "행복복권방",
        "address": "충북 청주시 흥덕구 풍년로 26 명인투플러스",
        "lat": 36.6162129239555,
        "lng": 127.440839187828,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또스튜디오",
        "name": "로또스튜디오",
        "address": "충북 청주시 청원구 사뜸로 48-1 동성교회",
        "lat": 36.6665273574428,
        "lng": 127.481478010017,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "일등복권방",
        "name": "일등복권방",
        "address": "충북 청주시 서원구 매봉로 26-1",
        "lat": 36.6123061601105,
        "lng": 127.477776280815,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "복권명당",
        "name": "복권명당",
        "address": "충북 청주시 상당구 월평로 204",
        "lat": 36.6088235863008,
        "lng": 127.506272501493,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "럭키로또복권판매점",
        "name": "럭키로또복권판매점",
        "address": "충북 청주시 상당구 무농정로 10-1",
        "lat": 36.6058978778836,
        "lng": 127.50429685739,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또1등판매점",
        "name": "로또1등판매점",
        "address": "경기 화성시 병점중앙로170번길 2",
        "lat": 37.2127575701484,
        "lng": 127.037714115026,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또1등판매점",
        "name": "로또1등판매점",
        "address": "경기 화성시 초록로 20-3",
        "lat": 37.0807876810168,
        "lng": 126.947555942545,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "행운복권방",
        "name": "행운복권방",
        "address": "경남 창원시 성산구 가음로15번길 52",
        "lat": 35.2128445560312,
        "lng": 128.70325784216,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "꿈꾸는돼지",
        "name": "꿈꾸는돼지",
        "address": "경기 화성시 동탄지성로 104",
        "lat": 37.2083425557521,
        "lng": 127.063881640035,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "지에스(GS25)뉴양산혜인점",
        "name": "지에스(GS25)뉴양산혜인점",
        "address": "경남 양산시 웅상대로 955",
        "lat": 35.3848616457542,
        "lng": 129.15504959311,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "씨스페이스-경주세방매점",
        "name": "씨스페이스 경주세방매점",
        "address": "경북 경주시 산업로 4447",
        "lat": 35.8767053945528,
        "lng": 129.226487475664,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "도항로또",
        "name": "도항로또",
        "address": "경남 함안군 함마대로 1499-1",
        "lat": 35.2755925464285,
        "lng": 128.399550265554,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "씨유-창원역점",
        "name": "씨유 창원역점",
        "address": "경남 창원시 의창구 의창대로 66",
        "lat": 35.2569399700995,
        "lng": 128.6076649208,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "해수로또",
        "name": "해수로또",
        "address": "충북 청주시 상당구 산성로 22-1",
        "lat": 36.6261618044057,
        "lng": 127.499370400723,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "이마트24-마산만복점",
        "name": "이마트24 마산만복점",
        "address": "경남 창원시 마산회원구 합성옛길 152",
        "lat": 35.2382163542789,
        "lng": 128.583950985853,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "경일통신",
        "name": "경일통신",
        "address": "경남 창원시 마산회원구 북성로 340",
        "lat": 35.233816775822,
        "lng": 128.560605150507,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "똥꿈로또",
        "name": "똥꿈로또",
        "address": "경남 진주시 신안로 102",
        "lat": 35.1871878499511,
        "lng": 128.071112089783,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "수경볼트로또",
        "name": "수경볼트로또",
        "address": "경남 양산시 고연로 283",
        "lat": 35.4314666361566,
        "lng": 129.178597481871,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "양산황금나눔",
        "name": "양산황금나눔",
        "address": "경남 양산시 황산로 395",
        "lat": 35.3113665431916,
        "lng": 128.987227131692,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "천하명당",
        "name": "천하명당",
        "address": "경남 양산시 소주회야로 45-8",
        "lat": 35.4068373577616,
        "lng": 129.158303289422,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "천하명당",
        "name": "천하명당",
        "address": "경기 화성시 남양시장로 83",
        "lat": 37.2099501648004,
        "lng": 126.81829505822,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "천하명당",
        "name": "천하명당",
        "address": "경남 양산시 연호로 46",
        "lat": 35.3349920568283,
        "lng": 129.037272788805,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "스포츠복권방",
        "name": "스포츠복권방",
        "address": "경남 양산시 물금읍 황산로 675",
        "lat": 35.3308680531576,
        "lng": 129.006697099851,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "무지개로또복권",
        "name": "무지개로또복권",
        "address": "경남 양산시 덕계2길 17",
        "lat": 35.3706796693677,
        "lng": 129.146469240984,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "비휴-복권판매점",
        "name": "비휴 복권판매점",
        "address": "경남 산청군 지리산대로 3474-1",
        "lat": 35.303186178607,
        "lng": 127.971848533227,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "목화휴게소",
        "name": "목화휴게소",
        "address": "경남 사천시 사천대로 912 목화휴게소식당",
        "lat": 35.0017600909728,
        "lng": 128.054209521477,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "아리아리",
        "name": "아리아리",
        "address": "경남 김해시 김해대로2491번길 28",
        "lat": 35.2305398958906,
        "lng": 128.898715542608,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "씨유-(CU)-거창대동점",
        "name": "씨유 (CU) 거창대동점",
        "address": "경남 거창군 거창읍 거창대로 93",
        "lat": 35.6899121949729,
        "lng": 127.914732128725,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "천하명당복권방",
        "name": "천하명당복권방",
        "address": "경남 거제시 옥포성안로 60",
        "lat": 34.8917029847155,
        "lng": 128.694852511716,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "떴다GO-1등",
        "name": "떴다GO 1등",
        "address": "경기 화성시 동탄반석로 172 동탄 파라곤",
        "lat": 37.2039744437243,
        "lng": 127.072192727906,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "복권나라",
        "name": "복권나라",
        "address": "충북 청주시 상당구 상당로 9",
        "lat": 36.6291930748368,
        "lng": 127.491054146657,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또복권방",
        "name": "로또복권방",
        "address": "인천 부평구 광장로 16 부평민자역사",
        "lat": 37.4895676659869,
        "lng": 126.72335064425,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "팡팡복권방",
        "name": "팡팡복권방",
        "address": "충북 진천군 장기길 102",
        "lat": 36.9900369472003,
        "lng": 127.445326626503,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "홈돌이로또복권",
        "name": "홈돌이로또복권",
        "address": "인천 남동구 경원대로 971",
        "lat": 37.4695876807099,
        "lng": 126.689107821779,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "행운복권방",
        "name": "행운복권방",
        "address": "인천 부평구 부평대로165번길 10",
        "lat": 37.5059121713659,
        "lng": 126.720225380675,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "행운복권방",
        "name": "행운복권방",
        "address": "인천 부평구 경인로 745",
        "lat": 37.4762330969103,
        "lng": 126.709444263423,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "행운복권방",
        "name": "행운복권방",
        "address": "인천 부평구 부평문화로163번길 1",
        "lat": 37.4939593618188,
        "lng": 126.734591238834,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "충남상회",
        "name": "충남상회",
        "address": "인천 미추홀구 참외전로 268",
        "lat": 37.4676423328736,
        "lng": 126.643011577667,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "한솔복권&마트",
        "name": "한솔복권&마트",
        "address": "인천 미추홀구 경인로 384",
        "lat": 37.4580671475016,
        "lng": 126.682610297497,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "노다지천국",
        "name": "노다지천국",
        "address": "인천 미추홀구 인주대로 185",
        "lat": 37.4555669083266,
        "lng": 126.657678787343,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "동행로또복권판매",
        "name": "동행로또복권판매",
        "address": "인천 동구 화도진로 33-1",
        "lat": 37.4756828228364,
        "lng": 126.634117377661,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또생삼겹",
        "name": "로또생삼겹",
        "address": "인천 남동구 논고개로 77 에코타워",
        "lat": 37.398437607938,
        "lng": 126.726253921698,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또-명당",
        "name": "로또 명당",
        "address": "인천 남동구 구월남로 271",
        "lat": 37.4522975042472,
        "lng": 126.719881018107,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "소래복권",
        "name": "소래복권",
        "address": "인천 남동구 앵고개로934번길 5 씨티짱",
        "lat": 37.4018475807378,
        "lng": 126.73514515768,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "선경로또",
        "name": "선경로또",
        "address": "충북 제천시 용두대로 59",
        "lat": 37.1362932011936,
        "lng": 128.199344691253,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "대동슈퍼",
        "name": "대동슈퍼",
        "address": "인천 남동구 만수로 81",
        "lat": 37.462626804721,
        "lng": 126.736182083032,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "정가네-가람기정떡",
        "name": "정가네 가람기정떡",
        "address": "인천 남동구 에코중앙로156번길 5-27",
        "lat": 37.3921534074415,
        "lng": 126.726898777517,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "탑로또",
        "name": "탑로또",
        "address": "인천 남동구 서창남로 81 투엠프라자",
        "lat": 37.4262866736327,
        "lng": 126.748049342217,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "하나복권",
        "name": "하나복권",
        "address": "인천 남동구 구월로 281",
        "lat": 37.4559319808526,
        "lng": 126.721971610204,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "알파슈퍼",
        "name": "알파슈퍼",
        "address": "인천 계양구 안남로 467",
        "lat": 37.5246884647581,
        "lng": 126.710347322088,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "좋은터",
        "name": "좋은터",
        "address": "인천 계양구 효서로 204",
        "lat": 37.5278163833637,
        "lng": 126.718549686844,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "아이러브마트복권방",
        "name": "아이러브마트복권방",
        "address": "울산 중구 유곡로 19-1",
        "lat": 35.5563630715553,
        "lng": 129.307228459279,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "1등복권방",
        "name": "1등복권방",
        "address": "울산 울주군 동문길 84",
        "lat": 35.5641706135616,
        "lng": 129.124604457949,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "제이마트",
        "name": "제이마트",
        "address": "울산 울주군 방천7길 6",
        "lat": 35.5661057209038,
        "lng": 129.110980927716,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "복권왕국",
        "name": "복권왕국",
        "address": "인천 부평구 동수로 168",
        "lat": 37.4856289082754,
        "lng": 126.737157158043,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "복권왕국",
        "name": "복권왕국",
        "address": "인천 부평구 경인로 931",
        "lat": 37.4876930262483,
        "lng": 126.723000932506,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "복권왕국",
        "name": "복권왕국",
        "address": "인천 부평구 부흥로 359 우편물취급국",
        "lat": 37.4981956724086,
        "lng": 126.731943816856,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "대박운때복권방",
        "name": "대박운때복권방",
        "address": "인천 부평구 시장로 58",
        "lat": 37.4953418116106,
        "lng": 126.727914718748,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "좋은사람들로또",
        "name": "좋은사람들로또",
        "address": "전남 보성군 현충로 85",
        "lat": 34.7674235838104,
        "lng": 127.081067683896,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "토마토-남악복권방",
        "name": "토마토 남악복권방",
        "address": "전남 무안군 남악4로82번길 44",
        "lat": 34.8118847161646,
        "lng": 126.470337927821,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "청호복권방",
        "name": "청호복권방",
        "address": "전남 목포시 용당로 296",
        "lat": 34.8132100232677,
        "lng": 126.399871274778,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "명품복권방",
        "name": "명품복권방",
        "address": "전남 목포시 섶나루길 122",
        "lat": 34.8105770399452,
        "lng": 126.418961563973,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "알리바이(나주점)",
        "name": "알리바이(나주점)",
        "address": "전남 나주시 나주로 142",
        "lat": 35.0313297380285,
        "lng": 126.717157991346,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "황금알복권",
        "name": "황금알복권",
        "address": "전남 광양시 광포로 39",
        "lat": 34.9627880546384,
        "lng": 127.722743798008,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "나눔로또편의점",
        "name": "나눔로또편의점",
        "address": "전남 광양시 공영로 90",
        "lat": 34.9356585968215,
        "lng": 127.699045323039,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "이마트24녹동점1등복권방",
        "name": "이마트24녹동점1등복권방",
        "address": "전남 고흥군 녹동남촌1길 13",
        "lat": 34.5288012694915,
        "lng": 127.13846486328,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "현대설비-/-영종하늘-로또",
        "name": "현대설비 / 영종하늘 로또",
        "address": "인천 중구 하늘달빛로 70",
        "lat": 37.4858233645477,
        "lng": 126.559531789169,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "드림복권방",
        "name": "드림복권방",
        "address": "인천 연수구 아트센터대로168번길 100",
        "lat": 37.4060391141399,
        "lng": 126.62896276616,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "신흥엑스포쇼핑",
        "name": "신흥엑스포쇼핑",
        "address": "인천 서구 가석로156번길 20",
        "lat": 37.4970752346313,
        "lng": 126.677101007393,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "대박복권방",
        "name": "대박복권방",
        "address": "인천 서구 길주로 106",
        "lat": 37.5061259255711,
        "lng": 126.673573056853,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "대박복권방",
        "name": "대박복권방",
        "address": "인천 서구 북항로32번안길 35",
        "lat": 37.5090135589698,
        "lng": 126.646679590604,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "대박복권방",
        "name": "대박복권방",
        "address": "인천 서구 대평로 3",
        "lat": 37.547137936419,
        "lng": 126.676622878489,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "하영",
        "name": "하영",
        "address": "인천 서구 청라에메랄드로 65 서해그랑블",
        "lat": 37.5305354871476,
        "lng": 126.656126476124,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "노다지로또",
        "name": "노다지로또",
        "address": "인천 서구 완정로  179",
        "lat": 37.602279722333,
        "lng": 126.656519462056,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "웃는-복권방",
        "name": "웃는 복권방",
        "address": "경북 구미시 형곡로39길 3",
        "lat": 36.1084185997188,
        "lng": 128.33991969553,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또복권방",
        "name": "로또복권방",
        "address": "인천 부평구 마장로 287",
        "lat": 37.5036057779131,
        "lng": 126.700809636297,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "버스매표소",
        "name": "버스매표소",
        "address": "인천 부평구 부평대로 3",
        "lat": 37.4918294298029,
        "lng": 126.722723545346,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "CU노서점",
        "name": "CU노서점",
        "address": "경북 경주시 금성로259번길 38",
        "lat": 35.8410094421566,
        "lng": 129.203021310129,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "해피+24시편의점",
        "name": "해피+24시편의점",
        "address": "광주 북구 하서로 330",
        "lat": 35.2044670894087,
        "lng": 126.873870491169,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "행운로또",
        "name": "행운로또",
        "address": "경북 구미시 들성로 106",
        "lat": 36.1553571967929,
        "lng": 128.333654501084,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "두꺼비복권방",
        "name": "두꺼비복권방",
        "address": "충남 공주시 무령로 599-25",
        "lat": 36.4772854227115,
        "lng": 127.150349555664,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "이마트24아산도고명당점",
        "name": "이마트24아산도고명당점",
        "address": "충남 아산시 온천대로 104",
        "lat": 36.7463330298774,
        "lng": 126.86686793761,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "777천하명당",
        "name": "777천하명당",
        "address": "충남 서천군 충절로 54",
        "lat": 36.0748778973301,
        "lng": 126.68868846985,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "장미슈퍼",
        "name": "장미슈퍼",
        "address": "충남 부여군 부여읍 계백로 265",
        "lat": 36.276372384131,
        "lng": 126.909418515443,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "찬누리",
        "name": "찬누리",
        "address": "충남 부여군 사비로 61",
        "lat": 36.2779888987137,
        "lng": 126.910318076983,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "금손로또판매점",
        "name": "금손로또판매점",
        "address": "충남 당진시 서해로 5772",
        "lat": 36.8982114799918,
        "lng": 126.628771155102,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또매점",
        "name": "로또매점",
        "address": "충남 당진시 송산로 723",
        "lat": 36.9538726109827,
        "lng": 126.6893806316,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "인생역전-복권방",
        "name": "인생역전 복권방",
        "address": "충남 논산시 중앙로 168",
        "lat": 36.1838733582014,
        "lng": 127.105221634627,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "강경복권방",
        "name": "강경복권방",
        "address": "충남 논산시 강경읍 계백로 126-1",
        "lat": 36.156024121378,
        "lng": 127.014865909295,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "돈나무복권",
        "name": "돈나무복권",
        "address": "충남 논산시 중앙로479번길 3-2",
        "lat": 36.2054111826862,
        "lng": 127.083574433309,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "만복복권",
        "name": "만복복권",
        "address": "충남 계룡시 엄사중앙로 93",
        "lat": 36.2890705273856,
        "lng": 127.241659440635,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "행복로또",
        "name": "행복로또",
        "address": "충남 아산시 아산밸리남로 81",
        "lat": 36.9202800692516,
        "lng": 127.054839307851,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "씨유-제주연북로점",
        "name": "씨유 제주연북로점",
        "address": "제주 제주시 연북로 260",
        "lat": 33.4810324742219,
        "lng": 126.50891938515,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "효당복권판매점",
        "name": "효당복권판매점",
        "address": "제주 제주시 노형로 355",
        "lat": 33.4825997153179,
        "lng": 126.474238594807,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "제일복권",
        "name": "제일복권",
        "address": "제주 제주시 서광로 257",
        "lat": 33.5001115136004,
        "lng": 126.524001555609,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "본스튜디오",
        "name": "본스튜디오",
        "address": "제주 제주시 하귀로 111",
        "lat": 33.4836097363104,
        "lng": 126.407825234812,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "탐나네",
        "name": "탐나네",
        "address": "제주 제주시 노연로 138",
        "lat": 33.4855593375332,
        "lng": 126.49500004767,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "캠퍼트리-스토어",
        "name": "캠퍼트리 스토어",
        "address": "제주 제주시 해안마을서4길 100",
        "lat": 33.4505538237066,
        "lng": 126.450801244599,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "천하명당복권판매점",
        "name": "천하명당복권판매점",
        "address": "제주 제주시 서해안로 510",
        "lat": 33.5194738203287,
        "lng": 126.493386636591,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "행운&빈센트",
        "name": "행운&빈센트",
        "address": "제주 서귀포시 동문로 64",
        "lat": 33.2490218148027,
        "lng": 126.566881751223,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "네잎크로버복권방",
        "name": "네잎크로버복권방",
        "address": "제주 서귀포시 고성오조로 9",
        "lat": 33.4447331778485,
        "lng": 126.913310341669,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "대박마트복권방",
        "name": "대박마트복권방",
        "address": "충남 아산시 음봉로 844 행복한순복음교회",
        "lat": 36.8264860912374,
        "lng": 127.099250859403,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "내포복권방",
        "name": "내포복권방",
        "address": "충남 예산군 덕산온천로 387",
        "lat": 36.7010708173493,
        "lng": 126.665603556524,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "돈방석",
        "name": "돈방석",
        "address": "전북 전주시 완산구 서신로 35",
        "lat": 35.8285538687142,
        "lng": 127.115597255262,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "보은로또",
        "name": "보은로또",
        "address": "충북 보은군 보은로 140-1 학원",
        "lat": 36.4866445528628,
        "lng": 127.717935683818,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "세븐일레븐-중동현대점",
        "name": "세븐일레븐 중동현대점",
        "address": "경기 부천시 석천로183번길 35",
        "lat": 37.5039211583346,
        "lng": 126.76111300479,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "도담복권",
        "name": "도담복권",
        "address": "경기 부천시 역곡로 451 뉴월드맨션",
        "lat": 37.524999411477,
        "lng": 126.815525127642,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "풍전슈퍼",
        "name": "풍전슈퍼",
        "address": "경기 부천시 조마루로 428",
        "lat": 37.4970897523205,
        "lng": 126.79116652651,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또대박",
        "name": "로또대박",
        "address": "경기 부천시 석천로177번길 11 제이클래스중동",
        "lat": 37.5031091878246,
        "lng": 126.762102111299,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "버스매표소",
        "name": "버스매표소",
        "address": "경기 부천시 부천로 32",
        "lat": 37.4870455193904,
        "lng": 126.783704287976,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "버스매표소",
        "name": "버스매표소",
        "address": "경기 부천시 부천로 151",
        "lat": 37.4977438380463,
        "lng": 126.785460194013,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "원대박",
        "name": "원대박",
        "address": "충북 음성군 대금로 1064-20",
        "lat": 36.9793456217509,
        "lng": 127.554609796257,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "혁신대박",
        "name": "혁신대박",
        "address": "충북 음성군 원중로 1434",
        "lat": 36.9094921289489,
        "lng": 127.541077958113,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "서울로또방",
        "name": "서울로또방",
        "address": "충북 옥천군 삼금로 8",
        "lat": 36.2993896683075,
        "lng": 127.566718542394,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "천하명당복권방",
        "name": "천하명당복권방",
        "address": "충남 홍성군 조양로 180",
        "lat": 36.6007306064042,
        "lng": 126.669480865526,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "GS25예산서오점복권",
        "name": "GS25예산서오점복권",
        "address": "충남 예산군 역전로 150-2",
        "lat": 36.6924344955518,
        "lng": 126.830341842125,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "태안로또복권방",
        "name": "태안로또복권방",
        "address": "충남 태안군 독샘로 57",
        "lat": 36.7534877459013,
        "lng": 126.298530275563,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "안면대박복권방",
        "name": "안면대박복권방",
        "address": "충남 태안군 안면대로 2649",
        "lat": 36.534481358212,
        "lng": 126.351944339758,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "대박로또",
        "name": "대박로또",
        "address": "충남 천안시 서북구 성환2로 45",
        "lat": 36.9118221661841,
        "lng": 127.130134113057,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "신불당로또",
        "name": "신불당로또",
        "address": "충남 천안시 서북구 불당21로 40",
        "lat": 36.8130061408921,
        "lng": 127.1045945918,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "황금로또-양당점",
        "name": "황금로또 양당점",
        "address": "충남 천안시 서북구 상덕로 185",
        "lat": 36.8830926970296,
        "lng": 127.123686645993,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "복동희로또-불당점",
        "name": "복동희로또 불당점",
        "address": "충남 천안시 서북구 불당5길 23",
        "lat": 36.8034836718272,
        "lng": 127.109475619408,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "운수대통복권방",
        "name": "운수대통복권방",
        "address": "충남 천안시 동남구 대흥로 122",
        "lat": 36.8004888704508,
        "lng": 127.149280302734,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "대산슈퍼",
        "name": "대산슈퍼",
        "address": "충남 천안시 동남구 복구정3길 1 로단판매점",
        "lat": 36.7699366210473,
        "lng": 127.250220402203,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "신천하명당",
        "name": "신천하명당",
        "address": "충남 예산군 발연로 1",
        "lat": 36.6988327131812,
        "lng": 126.829418332044,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "터미널복권방",
        "name": "터미널복권방",
        "address": "전북 정읍시 연지8길 6",
        "lat": 35.572332165993,
        "lng": 126.844958110122,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또로복권",
        "name": "로또로복권",
        "address": "전북 전주시 완산구 모악로 4729",
        "lat": 35.7915443805975,
        "lng": 127.131296431825,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또안경콘택트",
        "name": "로또안경콘택트",
        "address": "경북 구미시 구미중앙로5길 2",
        "lat": 36.1303261938998,
        "lng": 128.328264175068,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "행복충전",
        "name": "행복충전",
        "address": "경북 포항시 북구 삼흥로 441",
        "lat": 36.0974920153343,
        "lng": 129.371159979616,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "금호동",
        "name": "금호동",
        "address": "광주 서구 화개1로 63",
        "lat": 35.1296304940286,
        "lng": 126.855006035506,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "전대복권판매점",
        "name": "전대복권판매점",
        "address": "광주 북구 서양로 28",
        "lat": 35.1705692162773,
        "lng": 126.904526365563,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "열정복권",
        "name": "열정복권",
        "address": "광주 북구 하남대로 821",
        "lat": 35.1712383102263,
        "lng": 126.882499435834,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "행운가득명당복권",
        "name": "행운가득명당복권",
        "address": "울산 울주군 점촌5길 23",
        "lat": 35.5697972757249,
        "lng": 129.240457106666,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "노다지복권방백운점",
        "name": "노다지복권방백운점",
        "address": "광주 남구 서문대로 827",
        "lat": 35.132880595537,
        "lng": 126.900119663572,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "호반할인마트",
        "name": "호반할인마트",
        "address": "광주 광산구 도산로9번길 40",
        "lat": 35.1279248882474,
        "lng": 126.790086310538,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "행운",
        "name": "행운",
        "address": "광주 광산구 신창로 56",
        "lat": 35.1902032279592,
        "lng": 126.837260815239,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "차밍플라워-로또",
        "name": "차밍플라워 로또",
        "address": "광주 광산구 풍영로 41",
        "lat": 35.1756262440133,
        "lng": 126.811578627389,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "포항오거리CU복권",
        "name": "포항오거리CU복권",
        "address": "경북 포항시 북구 죽도로 33",
        "lat": 36.0338362448701,
        "lng": 129.364675485114,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "경이네복권마트",
        "name": "경이네복권마트",
        "address": "경북 포항시 북구 장량중앙로 81",
        "lat": 36.0896963742648,
        "lng": 129.390734094165,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또복권",
        "name": "로또복권",
        "address": "대구 군위군 중앙길 32",
        "lat": 36.2313300337561,
        "lng": 128.567530116934,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "지에스GS오천두배점",
        "name": "지에스GS오천두배점",
        "address": "경북 포항시 남구 원동로 98",
        "lat": 35.9718294573579,
        "lng": 129.402752830801,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "일등복권",
        "name": "일등복권",
        "address": "경북 칠곡군 동명면 금암중앙길 42",
        "lat": 35.9825449007385,
        "lng": 128.553640893388,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "복권명당울진점",
        "name": "복권명당울진점",
        "address": "경북 울진군 울진읍 울진중앙로 79",
        "lat": 36.9892478848429,
        "lng": 129.39884022309,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "대동도기상사",
        "name": "대동도기상사",
        "address": "경북 영천시 금완로 30",
        "lat": 35.9603193034517,
        "lng": 128.931899577759,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "일등로또복권-판매점",
        "name": "일등로또복권 판매점",
        "address": "경북 영천시 완산로 23-1",
        "lat": 35.9621837453877,
        "lng": 128.938807569747,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "복권당",
        "name": "복권당",
        "address": "경북 영천시 강변로 60",
        "lat": 35.9611734895382,
        "lng": 128.929309440152,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "홈런복권방",
        "name": "홈런복권방",
        "address": "경북 영덕군 영덕읍 남석길 57",
        "lat": 36.4090827572645,
        "lng": 129.368251626366,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "왕대박복권방",
        "name": "왕대박복권방",
        "address": "경북 문경시 중앙로 15",
        "lat": 36.5881011716474,
        "lng": 128.192949198212,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "팔팔복권",
        "name": "팔팔복권",
        "address": "경북 김천시 시청로 81",
        "lat": 36.1355962434414,
        "lng": 128.117055932424,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "새상무복권",
        "name": "새상무복권",
        "address": "광주 서구 치평로 30",
        "lat": 35.1499501736118,
        "lng": 126.847669960948,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "다다복권방",
        "name": "다다복권방",
        "address": "대구 달서구 월배로 32-1",
        "lat": 35.8124821996741,
        "lng": 128.518571336467,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또편의점",
        "name": "로또편의점",
        "address": "전북 전주시 덕진구 기린대로 469",
        "lat": 35.8417330447098,
        "lng": 127.126093268867,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "알짜마트왕지점",
        "name": "알짜마트왕지점",
        "address": "전남 순천시 왕궁길 60",
        "lat": 34.9557586898028,
        "lng": 127.532623249244,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "로또편의점",
        "name": "로또편의점",
        "address": "전북 전주시 덕진구 아중로 173",
        "lat": 35.8270915319785,
        "lng": 127.168292457746,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "복조리복권방",
        "name": "복조리복권방",
        "address": "전북 장수군 장계면 장계천변길 55-4",
        "lat": 35.7310741390472,
        "lng": 127.583548482256,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "여기있었네복권방",
        "name": "여기있었네복권방",
        "address": "전북 김제시 남북로 171",
        "lat": 35.7993908406512,
        "lng": 126.884570792917,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "돈나무-복권",
        "name": "돈나무 복권",
        "address": "전북 군산시 공단대로 612",
        "lat": 35.9731729243729,
        "lng": 126.680293319284,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "씨유-군산디오션점",
        "name": "씨유 군산디오션점",
        "address": "전북 군산시 궁포1로 42",
        "lat": 35.9769490129657,
        "lng": 126.742077988876,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "터미널",
        "name": "터미널",
        "address": "전남 진도군 남문길 5",
        "lat": 34.4787024365714,
        "lng": 126.263470476221,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "영광믿음복권",
        "name": "영광믿음복권",
        "address": "전남 영광군 신남로 169",
        "lat": 35.2762184261996,
        "lng": 126.500667204269,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "복권나라",
        "name": "복권나라",
        "address": "전남 여수시 중앙로 62",
        "lat": 34.7399319441762,
        "lng": 127.73434301317,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "중앙복권",
        "name": "중앙복권",
        "address": "전남 신안군 구영2길 74",
        "lat": 34.8867705818114,
        "lng": 126.044348873894,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "이마트24-순천산단점",
        "name": "이마트24 순천산단점",
        "address": "전남 순천시 산단1길 6 중앙정밀기계,마트",
        "lat": 34.9879916741436,
        "lng": 127.508181549692,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "상인명당복권방",
        "name": "상인명당복권방",
        "address": "대구 달서구 조암남로16길 19",
        "lat": 35.8221147237798,
        "lng": 128.522024724329,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "메트로센터점",
        "name": "메트로센터점",
        "address": "대구 중구 달구벌대로 지하 2100",
        "lat": 35.8644213158621,
        "lng": 128.593340834492,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    },
    {
        "id": "홀인원복권",
        "name": "홀인원복권",
        "address": "대구 수성구 달구벌대로 3294 시지퍼스트",
        "lat": 35.8363930617329,
        "lng": 128.715888693931,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lotto-map-korea/data/dream_mapping.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"keyword":"돼지","numbers":[8,18,28],"meaning":"재물과 풍요의 상징으로 가장 대표적인 길몽입니다."},{"keyword":"조상님","numbers":[1,6,19],"meaning":"조상님이 밝은 모습으로 나타나면 행운이 찾아올 징조입니다."},{"keyword":"불","numbers":[1,4,35],"meaning":"번창과 활력을 의미하며, 큰 불일수록 더 큰 행운을 뜻합니다."},{"keyword":"물","numbers":[1,10,20],"meaning":"맑은 물이 넘치는 꿈은 재산이 불어남을 의미합니다."},{"keyword":"뱀","numbers":[4,14,44],"meaning":"지혜와 재물을 상징하며, 태몽으로도 자주 해석됩니다."},{"keyword":"대통령","numbers":[1,2,3],"meaning":"권위 있는 인물을 만나는 것은 최고의 명예와 행운입니다."},{"keyword":"똥","numbers":[7,15,37],"meaning":"불쾌할 수 있지만 로또 꿈에서는 강력한 재물운을 뜻합니다."},{"keyword":"금","numbers":[24,25,26],"meaning":"변치 않는 가치와 금전적 이득을 상징합니다."},{"keyword":"용","numbers":[5,10,21],"meaning":"승진, 합격, 대박 당첨 등 큰 경사를 의미합니다."},{"keyword":"피","numbers":[1,17,33],"meaning":"생명력과 재물의 흐름이 활발해짐을 뜻합니다."},{"keyword":"아이","numbers":[1,4,13],"meaning":"새로운 시작이나 기쁜 소식을 가져옵니다."},{"keyword":"집","numbers":[11,22,33],"meaning":"안식처이자 재산의 증식을 의미합니다."},{"keyword":"돈","numbers":[10,20,30],"meaning":"직설적인 재물운 상승의 신호입니다."},{"keyword":"물고기","numbers":[17,18,19],"meaning":"풍성한 수확과 이득을 얻게 될 징조입니다."},{"keyword":"꽃","numbers":[12,23,34],"meaning":"명예나 사랑, 아름다운 소식을 상징합니다."},{"keyword":"거북이","numbers":[4,8,12],"meaning":"장수와 안정적인 재물을 상징하는 길몽입니다."},{"keyword":"바다","numbers":[1,22,45],"meaning":"거대한 기회와 무한한 가능성을 의미합니다."},{"keyword":"호랑이","numbers":[3,7,39],"meaning":"강력한 힘과 권세, 큰 성공을 예견합니다."},{"keyword":"비행기","numbers":[14,24,44],"meaning":"지위의 상승이나 먼 곳에서 오는 행운을 뜻합니다."},{"keyword":"하늘","numbers":[1,11,21],"meaning":"소망이 이루어지고 운세가 대통할 징조입니다."}]);}),
"[project]/lotto-map-korea/data/lotto_knowledge.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"id":1,"title":"한번호대에 4개이상은 피하라.","content":"한번호대에서 4개이상 출현한 빈도는 5%미만이고 5개출현은 2%미만입니다. 예) 3.11.13.15.16.39또는 3.30.31.33.35.37같은 4개이상말입니다.","category":"구입요령"},{"id":2,"title":"4연번은피하라.","content":"연속해서 4연번이 나온경우는 전세계적으로도 드문 일입니다. 또한 우리나라에선 3연번이 5번정도 나왔는데 우리나라만 제외하고 전세계적으론 2%도 안된다고합니다. 예) 4.11.12.13.14.35이런 조합말입니다.","category":"구입요령"},{"id":3,"title":"같은 끝수 3개이상은 피하라.","content":"같은끝수가 3개이상이 20%밖에 안된다고합니다. 그러니 같은끝수는 2개정도가 적당합니다. 예) 3.13.23.35.36.40 이렇게 끝수가 3이3번들어간경우 말입니다.","category":"구입요령"},{"id":4,"title":"2개의 쌍연번은 피하라.","content":"그냥 일반적인 연번의 출현빈도는 80%정도로 추천할만하나 쌍연번의 출현빈도는 낮다고합니다. 예) 3.4.15.18.33.34 이렇게 3.4와 33.34같은경우 말입니다.","category":"구입요령"},{"id":5,"title":"낮은수조합또는 높은수조합은피하라.","content":"낮은수라함은 23을 기준으로 예) 2.5.16.17.20.22.또는 25.27.29.34.37.44이렇게 높거나 낮은경우를말함. 6.연번호를 활용하라. 연번으로 나올확률이 그렇지않을 확률보다 높다고합니다. 예) 33.34.11.15.00.41. 7. 가장 중요한대목입니다. 로또에 많은돈 투자하지마세요. 로또에 가능조합은 1/8145060의 입니다.이걸 금액으로 환산하면 약 81억원어치의 복권을 구입해야한다는 이론적 계산이나옵니다. 즉. 여러분이 1만원어치를하든 10만원어치를하든 또는 100만원 1000만원어치를해도 81억원에 비하면 매우 미미한 차이입니다. 100만원어치면 여러가지숫자로 할만큼 했다고 생각할수있으나 그건 위험한 생각입니다. 다시말해 1만원이든 1000만원이든 새발에 피란말입니다. 1000원 1게임을해도 1등에 당첨되려면 되고 1000만원어치를 해도 5등 10개하는 사람도있습니다.(TV보도인용자료) 그러니 1~2만원정도가 적당하지 않을까 생각합니다. 8. 되도록 많은 번호를 선택하라. 로또 초보분들의 숫자선택을보면 1만원 1게임에 최대.30개의 숫자를 넣을수있는데 대게 15~20개의 숫자를 선택하여 중복되게 고르는 경향이 있습니다. 숫자는 되도록 골고루 사용하는편이 그렇지 않은편보다 확률상 높습니다. 고수분들은 어떤 믿음을가지고 고정수를 활용하나 이는 위험합니다. 모 아니면 도이기 때문입니다. 고정수란? 예) 2.13.15.22.26.38 / 2.14.15.22.27.39 /2.11.15.22.28.40 ..그럼 2.15.22가 고정수입니다. 9. 마킹용지에 일정한 도형이나 라인은 피하라. 마킹용지에 마킹을할때 일정한 도형이나 동일한 라인에 마킹을하는건 바람직하지 않습니다. 실제로 이렇게 일정한 모양이나 라인이되게 번호를 선택하는사람이 많다고하니 당첨이되어도 당첨금은 매우 낮아집니다. 10. 당연한 얘기입니다만 1.2.3.4.5.6.이런 엽기적인 번호선택은 절대금물. 당연한 얘기지만 어처구니 없게도 이런 번호를 선택한 사람이 한회차에도 수만장씩 나온다고합니다. (국민은행 발표자료인용) 11. 근거없는 믿음에 많은 투자하지말자. 꿈을 잘꾸었다...누가 추첨할땐 몇번이 꼭나온다...이런식으로 근거없는 믿음을 믿고 많은돈 투자하지맙시다. 12. 되도록 2홀4짝,4홀2짝,3홀3짝이되게 하라. 당첨숫자들의 홀,짝수 분포를보면 위와같이 3가지의 홀짝 배열이 80%이상이라고 합니다.그러니 올 짝수나 올홀수는 확률이 매우낮죠.예) 3.9.11.15.23.33(올 홀수) 2.14.16.22.26.38(올 짝수) 피하라.. 13. 사람마다 선호하는 번호가있고 선호하는 패턴이있어서 무의식중에 반복되고 중복된다고합니다.물론 특정한 번호나 패턴을 꾸준히 밀고나가는것도 좋지만...가끔은 자동선택도 활용하여 행운을 잡을수도있다. 14. 이전 회차에서 중복되는 3개이상의 숫자는 피하라. 확률적으로 낮다고합니다.예) 49회차 1.2.3.4.5.6.이 당첨이였다면 이중 3개이상은 가져가지말자.. 1~2개정도가 적당하다고보나 안나올수도있음. 15. 일정한 규칙을가진 숫자는 절대피하라. 예) 5.10.15.20.25.30. 또는 1.11.21.31.41...또는 5.0.8.16.32..(확률이 낮고 당첨되어도 배당금이 매우낮아진다함.)","category":"구입요령"},{"id":7,"title":"가장 중요한대목입니다. 로또에 많은돈 투자하지마세요.","content":"로또에 가능조합은 1/8145060의 입니다.이걸 금액으로 환산하면 약 81억원어치의 복권을 구입해야한다는 이론적 계산이나옵니다. 즉. 여러분이 1만원어치를하든 10만원어치를하든 또는 100만원 1000만원어치를해도 81억원에 비하면 매우 미미한 차이입니다. 100만원어치면 여러가지숫자로 할만큼 했다고 생각할수있으나 그건 위험한 생각입니다. 다시말해 1만원이든 1000만원이든 새발에 피란말입니다. 1000원 1게임을해도 1등에 당첨되려면 되고 1000만원어치를 해도 5등 10개하는 사람도있습니다.(TV보도인용자료) 그러니 1~2만원정도가 적당하지 않을까 생각합니다.","category":"구입요령"},{"id":8,"title":"되도록 많은 번호를 선택하라.","content":"로또 초보분들의 숫자선택을보면 1만원 1게임에 최대.30개의 숫자를 넣을수있는데 대게 15~20개의 숫자를 선택하여 중복되게 고르는 경향이 있습니다. 숫자는 되도록 골고루 사용하는편이 그렇지 않은편보다 확률상 높습니다. 고수분들은 어떤 믿음을가지고 고정수를 활용하나 이는 위험합니다. 모 아니면 도이기 때문입니다. 고정수란? 예) 2.13.15.22.26.38 / 2.14.15.22.27.39 /2.11.15.22.28.40 ..그럼 2.15.22가 고정수입니다.","category":"구입요령"},{"id":9,"title":"마킹용지에 일정한 도형이나 라인은 피하라.","content":"마킹용지에 마킹을할때 일정한 도형이나 동일한 라인에 마킹을하는건 바람직하지 않습니다. 실제로 이렇게 일정한 모양이나 라인이되게 번호를 선택하는사람이 많다고하니 당첨이되어도 당첨금은 매우 낮아집니다.","category":"구입요령"},{"id":10,"title":"당연한 얘기입니다만 1.2.3.4.5.6.이런 엽기적인 번호선택은 절대금물.","content":"당연한 얘기지만 어처구니 없게도 이런 번호를 선택한 사람이 한회차에도 수만장씩 나온다고합니다. (국민은행 발표자료인용)","category":"구입요령"},{"id":11,"title":"근거없는 믿음에 많은 투자하지말자.","content":"꿈을 잘꾸었다...누가 추첨할땐 몇번이 꼭나온다...이런식으로 근거없는 믿음을 믿고 많은돈 투자하지맙시다.","category":"구입요령"},{"id":12,"title":"되도록 2홀4짝,4홀2짝,3홀3짝이되게 하라.","content":"당첨숫자들의 홀,짝수 분포를보면 위와같이 3가지의 홀짝 배열이 80%이상이라고 합니다.그러니 올 짝수나 올홀수는 확률이 매우낮죠.예) 3.9.11.15.23.33(올 홀수) 2.14.16.22.26.38(올 짝수) 피하라..","category":"구입요령"},{"id":13,"title":"사람마다 선호하는 번호가있고 선호하는 패턴이있어서 무의식중에 반복되고 중복된다고합니다.물론 특정한 번호나 패턴을 꾸준히 밀고나가는것도 좋지만...가끔은 자동선택도 활용하여 행운을 잡을수도있다.","content":"","category":"구입요령"},{"id":14,"title":"이전 회차에서 중복되는 3개이상의 숫자는 피하라.","content":"확률적으로 낮다고합니다.예) 49회차 1.2.3.4.5.6.이 당첨이였다면 이중 3개이상은 가져가지말자.. 1~2개정도가 적당하다고보나 안나올수도있음.","category":"구입요령"},{"id":15,"title":"일정한 규칙을가진 숫자는 절대피하라.","content":"예) 5.10.15.20.25.30. 또는 1.11.21.31.41...또는 5.0.8.16.32..(확률이 낮고 당첨되어도 배당금이 매우낮아진다함.)","category":"구입요령"}]);}),
"[project]/lotto-map-korea/app/components/MapInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MapInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dices$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dices$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/dices.js [app-client] (ecmascript) <export default as Dices>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/map.js [app-client] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/list-ordered.js [app-client] (ecmascript) <export default as ListOrdered>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudMoon$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/cloud-moon.js [app-client] (ecmascript) <export default as CloudMoon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$newspaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Newspaper$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/newspaper.js [app-client] (ecmascript) <export default as Newspaper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZapOff$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/zap-off.js [app-client] (ecmascript) <export default as ZapOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$luckEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/lib/luckEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/lib/data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$data$2f$dream_mapping$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/data/dream_mapping.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$data$2f$lotto_knowledge$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/data/lotto_knowledge.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/chart.js/dist/chart.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/react-chartjs-2/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Chart"].register(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CategoryScale"], __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LinearScale"], __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BarElement"], __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Title"], __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tooltip"], __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Legend"], __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ArcElement"], __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PointElement"], __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LineElement"], __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Filler"]);
const getDistance = (lat1, lon1, lat2, lon2)=>{
    const R = 6371e3;
    const a = Math.sin((lat2 - lat1) * Math.PI / 360) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin((lon2 - lon1) * Math.PI / 360) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};
function MapInterface() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('MAP');
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedStore, setSelectedStore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [dreamSearch, setDreamSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('WIN');
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [analysis, setAnalysis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAnalyzing, setIsAnalyzing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    // 1. 초기 위치 및 트래킹
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapInterface.useEffect": ()=>{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition({
                    "MapInterface.useEffect": (pos)=>setUserLocation({
                            lat: pos.coords.latitude,
                            lng: pos.coords.longitude
                        })
                }["MapInterface.useEffect"], null, {
                    enableHighAccuracy: true
                });
            }
        }
    }["MapInterface.useEffect"], []);
    // 2. 데이터 프로세싱 파이프라인 (Luck Index 기반)
    const processedStores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MapInterface.useMemo[processedStores]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_STORES"].map({
                "MapInterface.useMemo[processedStores]": (s)=>({
                        ...s,
                        luckIndex: 65 + s.winCount1st * 4 + Math.floor(Math.random() * 8),
                        distance: userLocation ? getDistance(userLocation.lat, userLocation.lng, s.lat, s.lng) : undefined,
                        isLive: Math.random() > 0.8
                    })
            }["MapInterface.useMemo[processedStores]"]).filter({
                "MapInterface.useMemo[processedStores]": (s)=>s.name.includes(searchTerm) || s.address.includes(searchTerm)
            }["MapInterface.useMemo[processedStores]"]).sort({
                "MapInterface.useMemo[processedStores]": (a, b)=>{
                    if (sortBy === 'DISTANCE' && a.distance && b.distance) return a.distance - b.distance;
                    return b.winCount1st - a.winCount1st;
                }
            }["MapInterface.useMemo[processedStores]"]);
        }
    }["MapInterface.useMemo[processedStores]"], [
        searchTerm,
        sortBy,
        userLocation
    ]);
    const filteredDreams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MapInterface.useMemo[filteredDreams]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$data$2f$dream_mapping$2e$json__$28$json$29$__["default"].filter({
                "MapInterface.useMemo[filteredDreams]": (d)=>d.keyword.includes(dreamSearch)
            }["MapInterface.useMemo[filteredDreams]"]);
        }
    }["MapInterface.useMemo[filteredDreams]"], [
        dreamSearch
    ]);
    // 3. 지도 렌더링 및 동기화
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapInterface.useEffect": ()=>{
            if (activeTab === 'MAP' && ("TURBOPACK compile-time value", "object") !== 'undefined' && window.kakao && window.kakao.maps) {
                window.kakao.maps.load({
                    "MapInterface.useEffect": ()=>{
                        const container = document.getElementById('map-container');
                        if (container && !mapRef.current) {
                            mapRef.current = new window.kakao.maps.Map(container, {
                                center: new window.kakao.maps.LatLng(userLocation?.lat || 37.5665, userLocation?.lng || 126.9780),
                                level: 8
                            });
                        }
                    }
                }["MapInterface.useEffect"]);
            }
        }
    }["MapInterface.useEffect"], [
        activeTab,
        userLocation
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapInterface.useEffect": ()=>{
            if (activeTab !== 'MAP' || !mapRef.current) return;
            window.kakao.maps.load({
                "MapInterface.useEffect": ()=>{
                    Object.values(markersRef.current).forEach({
                        "MapInterface.useEffect": (m)=>m.setMap(null)
                    }["MapInterface.useEffect"]);
                    markersRef.current = {};
                    processedStores.forEach({
                        "MapInterface.useEffect": (store)=>{
                            const marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(store.lat, store.lng),
                                map: mapRef.current
                            });
                            window.kakao.maps.event.addListener(marker, 'click', {
                                "MapInterface.useEffect": ()=>setSelectedStore(store)
                            }["MapInterface.useEffect"]);
                            markersRef.current[store.id] = marker;
                        }
                    }["MapInterface.useEffect"]);
                }
            }["MapInterface.useEffect"]);
        }
    }["MapInterface.useEffect"], [
        processedStores,
        activeTab
    ]);
    // 4. 차트 데이터 (실시간 통계 반영)
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        weight: 'bold'
                    }
                }
            },
            y: {
                grid: {
                    display: false
                },
                beginAtZero: true
            }
        }
    };
    const frequencyData = {
        labels: [
            '34',
            '18',
            '27',
            '1',
            '43',
            '12',
            '5',
            '39'
        ],
        datasets: [
            {
                label: 'Frequency',
                data: [
                    152,
                    148,
                    145,
                    142,
                    140,
                    138,
                    135,
                    132
                ],
                backgroundColor: '#4F46E5',
                borderRadius: 10
            }
        ]
    };
    const trendData = {
        labels: [
            '1141회',
            '1142회',
            '1143회',
            '1144회',
            '1145회'
        ],
        datasets: [
            {
                label: 'Winning Amt',
                data: [
                    22.4,
                    15.8,
                    25.1,
                    18.2,
                    30.5
                ],
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };
    const handleAnalyze = async ()=>{
        if (!selectedStore) return;
        setIsAnalyzing(true);
        setTimeout(()=>{
            setAnalysis((0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$luckEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeLuckLocal"])(selectedStore));
            setIsAnalyzing(false);
        }, 1000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-screen bg-white font-sans text-slate-900 overflow-hidden antialiased",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "bg-white border-b px-6 flex justify-between items-center h-20 shrink-0 z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-indigo-600 p-2.5 rounded-[18px] shadow-indigo-100 shadow-2xl animate-in zoom-in",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                    className: "text-white w-6 h-6"
                                }, void 0, false, {
                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                    lineNumber: 130,
                                    columnNumber: 113
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-black tracking-tighter flex items-center",
                                        children: [
                                            "LottoInsights ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full ml-2 animate-pulse font-black",
                                                children: "PRO"
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 132,
                                                columnNumber: 101
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 132,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[9px] text-slate-400 font-bold tracking-[0.2em] uppercase",
                                        children: "Intelligence Engine v2.6"
                                    }, void 0, false, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 133,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex space-x-1.5 overflow-x-auto scrollbar-hide",
                        children: [
                            {
                                id: 'MAP',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"],
                                label: '인사이트 지도'
                            },
                            {
                                id: 'RANK',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__["ListOrdered"],
                                label: '당첨 명당'
                            },
                            {
                                id: 'STATS',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
                                label: '전략 보드'
                            },
                            {
                                id: 'DREAM',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudMoon$3e$__["CloudMoon"],
                                label: 'AI 꿈해몽'
                            },
                            {
                                id: 'HELP',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"],
                                label: '정보 센터'
                            }
                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setActiveTab(tab.id);
                                    setSelectedStore(null);
                                },
                                className: `px-4 py-2.5 rounded-[20px] flex items-center space-x-2 transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-indigo-200 shadow-2xl scale-105' : 'text-slate-400 hover:bg-slate-50'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(tab.icon, {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 145,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-black whitespace-nowrap",
                                        children: tab.label
                                    }, void 0, false, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 146,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, tab.id, true, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 144,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 relative h-full",
                        children: [
                            activeTab === 'MAP' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full w-full relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        id: "map-container",
                                        className: "h-full w-full bg-slate-100 transition-opacity duration-1000"
                                    }, void 0, false, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 157,
                                        columnNumber: 21
                                    }, this),
                                    !selectedStore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                        className: `absolute top-4 left-4 z-20 h-[calc(100%-2rem)] bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[40px] shadow-2xl transition-all duration-500 ${isSidebarOpen ? 'w-full md:w-[400px]' : 'w-0 overflow-hidden opacity-0'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col h-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-8 space-y-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "text-2xl font-black tracking-tight text-slate-900",
                                                                    children: "명당 실시간 탐색"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 162,
                                                                    columnNumber: 84
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setIsSidebarOpen(false),
                                                                    className: "p-2 hover:bg-slate-100 rounded-full transition-all",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                        className: "w-6 h-6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 162,
                                                                        columnNumber: 275
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 162,
                                                                    columnNumber: 164
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                                    className: "absolute left-5 top-4.5 text-slate-400 w-5 h-5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 163,
                                                                    columnNumber: 59
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    placeholder: "지역, 가게명 검색...",
                                                                    className: "w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-[24px] text-sm focus:ring-2 focus:ring-indigo-500 font-bold placeholder:text-slate-300",
                                                                    value: searchTerm,
                                                                    onChange: (e)=>setSearchTerm(e.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 163,
                                                                    columnNumber: 128
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 31
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 overflow-y-auto px-6 space-y-4 pb-10 scrollbar-hide",
                                                    children: processedStores.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            onClick: ()=>setSelectedStore(s),
                                                            className: "p-6 rounded-[36px] bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 cursor-pointer transition-all flex items-center space-x-4 group relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1 min-w-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "font-black text-base group-hover:text-indigo-600 truncate mb-1",
                                                                            children: s.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                            lineNumber: 169,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-slate-400 truncate font-medium",
                                                                            children: s.address
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                            lineNumber: 170,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center space-x-2 mt-4",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[10px] font-black text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100",
                                                                                    children: [
                                                                                        "1등 ",
                                                                                        s.winCount1st,
                                                                                        "회"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                                    lineNumber: 172,
                                                                                    columnNumber: 49
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100",
                                                                                    children: [
                                                                                        "지수 ",
                                                                                        s.luckIndex
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                                    lineNumber: 173,
                                                                                    columnNumber: 49
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                            lineNumber: 171,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 168,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "bg-slate-50 p-2 rounded-2xl group-hover:bg-indigo-50 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                        className: "w-5 h-5 text-slate-300 group-hover:text-indigo-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 176,
                                                                        columnNumber: 129
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 176,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, `${s.id}-${s.address}`, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 37
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 160,
                                            columnNumber: 28
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 159,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 156,
                                columnNumber: 17
                            }, this),
                            activeTab === 'RANK' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full overflow-y-auto p-10 bg-white animate-in fade-in slide-in-from-bottom-4 duration-700",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-3xl mx-auto space-y-4 pb-20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-end mb-12",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-4xl font-black tracking-tighter",
                                                    children: "당첨 명당 순위"
                                                }, void 0, false, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 79
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-black text-indigo-600 tracking-[0.3em] uppercase",
                                                    children: "National Top 50"
                                                }, void 0, false, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 145
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 190,
                                            columnNumber: 25
                                        }, this),
                                        processedStores.sort((a, b)=>b.winCount1st - a.winCount1st).slice(0, 50).map((s, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>{
                                                    setSelectedStore(s);
                                                    setActiveTab('MAP');
                                                },
                                                className: "flex items-center p-6 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-2xl transition-all cursor-pointer group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-14 h-14 flex items-center justify-center rounded-[20px] font-black mr-6 shrink-0 text-xl ${idx < 3 ? 'bg-yellow-400 text-white shadow-xl shadow-yellow-100' : 'bg-white text-slate-300 border'}`,
                                                        children: idx + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-black truncate text-lg group-hover:text-indigo-600",
                                                                children: s.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 194,
                                                                columnNumber: 65
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-400 truncate font-bold mt-1",
                                                                children: s.address
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 194,
                                                                columnNumber: 150
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-right ml-6",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-3xl font-black text-red-500 tracking-tighter",
                                                            children: [
                                                                s.winCount1st,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm ml-1 opacity-40",
                                                                    children: "회"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 195,
                                                                    columnNumber: 146
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 195,
                                                            columnNumber: 66
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, `rank-${s.id}-${s.address}`, true, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 192,
                                                columnNumber: 29
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                    lineNumber: 189,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 188,
                                columnNumber: 17
                            }, this),
                            activeTab === 'STATS' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full overflow-y-auto p-12 bg-slate-50 animate-in fade-in duration-1000",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-6xl mx-auto space-y-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                            className: "flex justify-between items-end",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-5xl font-black tracking-tighter text-slate-900",
                                                            children: "전략 대시보드"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 34
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-500 font-bold text-lg mt-3",
                                                            children: "로또플레이 32개 전문 라이브러리 통합 통계 엔진"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 114
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white px-6 py-3 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center space-x-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-3 h-3 bg-green-500 rounded-full animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 159
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-black text-slate-700 tracking-widest",
                                                            children: "LIVE DATA SYNC"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 230
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 206,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 lg:grid-cols-3 gap-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "lg:col-span-2 bg-white p-12 rounded-[60px] shadow-sm border border-slate-100 relative overflow-hidden",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute top-0 right-0 p-10 opacity-[0.03]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                                className: "w-64 h-64"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 213,
                                                                columnNumber: 93
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-2xl font-black mb-10 flex items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                                    className: "mr-4 text-indigo-600 w-8 h-8"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 214,
                                                                    columnNumber: 93
                                                                }, this),
                                                                " 번호별 출현 빈도 Analysis"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-[350px]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                                data: frequencyData,
                                                                options: chartOptions
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 215,
                                                                columnNumber: 60
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 215,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-slate-900 p-10 rounded-[60px] text-white shadow-2xl relative overflow-hidden group",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute -top-20 -right-20 w-60 h-60 bg-indigo-600 rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 219,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-black text-xl mb-8 text-indigo-300",
                                                                    children: "최근 당첨금 추이"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 220,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-[180px]",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                                        data: trendData,
                                                                        options: chartOptions
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 221,
                                                                        columnNumber: 64
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 221,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-8 flex justify-between items-end border-t border-white/10 pt-8",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1",
                                                                                    children: "Max Payout"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                                    lineNumber: 222,
                                                                                    columnNumber: 125
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-4xl font-black text-yellow-400",
                                                                                    children: [
                                                                                        "30.5",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-sm ml-1 opacity-50 text-white",
                                                                                            children: "억"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                                            lineNumber: 222,
                                                                                            columnNumber: 278
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                                    lineNumber: 222,
                                                                                    columnNumber: 223
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                            lineNumber: 222,
                                                                            columnNumber: 120
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                                            className: "w-10 h-10 text-white/10"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                            lineNumber: 222,
                                                                            columnNumber: 349
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 222,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 218,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-white p-10 rounded-[60px] shadow-sm border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-all",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2",
                                                                            children: "가장 뜨거운 번호"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                            lineNumber: 225,
                                                                            columnNumber: 42
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-5xl font-black text-red-500 group-hover:scale-110 transition-transform origin-left",
                                                                            children: "34"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                            lineNumber: 225,
                                                                            columnNumber: 139
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 225,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center text-red-500",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                        className: "w-8 h-8"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 226,
                                                                        columnNumber: 132
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 226,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 211,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                                            children: [
                                                {
                                                    label: '홀짝 균형',
                                                    val: '3:3 (표준)',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dices$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dices$3e$__["Dices"],
                                                    color: 'text-orange-500',
                                                    bg: 'bg-orange-50'
                                                },
                                                {
                                                    label: '평균 고저차',
                                                    val: '28.4',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"],
                                                    color: 'text-green-500',
                                                    bg: 'bg-green-50'
                                                },
                                                {
                                                    label: '연번 출현율',
                                                    val: '42.1%',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"],
                                                    color: 'text-indigo-500',
                                                    bg: 'bg-indigo-50'
                                                },
                                                {
                                                    label: '장기 미출현',
                                                    val: '12회 이상',
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZapOff$3e$__["ZapOff"],
                                                    color: 'text-slate-400',
                                                    bg: 'bg-slate-100'
                                                }
                                            ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center space-x-5 hover:shadow-xl transition-all",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `p-4 rounded-[24px] ${item.bg} ${item.color}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                                                className: "w-6 h-6"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 239,
                                                                columnNumber: 100
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[11px] font-black text-slate-400 uppercase tracking-tighter mb-1",
                                                                    children: item.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 240,
                                                                    columnNumber: 42
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xl font-black text-slate-900",
                                                                    children: item.val
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 240,
                                                                    columnNumber: 143
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 33
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 231,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                    lineNumber: 205,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 204,
                                columnNumber: 17
                            }, this),
                            activeTab === 'DREAM' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full overflow-y-auto p-12 bg-slate-900 text-white animate-in slide-in-from-right duration-700",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-2xl mx-auto space-y-12 py-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                            className: "text-center space-y-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center mx-auto border border-white/10 shadow-2xl shadow-indigo-500/10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                                        className: "w-12 h-12 text-yellow-400 animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 178
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-5xl font-black tracking-tighter uppercase italic",
                                                            children: "Dream Decoder"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 56
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-400 font-bold text-lg",
                                                            children: "당신의 무의식이 보내는 당첨 시그널을 해석합니다."
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 144
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 252,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                    className: "absolute left-8 top-7 text-slate-600 w-7 h-7 group-focus-within:text-indigo-500 transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 57
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "꿈속의 키워드를 입력하세요 (예: 돼지, 조상님)...",
                                                    className: "w-full pl-20 pr-8 py-7 bg-white/5 border border-white/10 rounded-[48px] text-2xl focus:ring-4 focus:ring-indigo-500/30 font-black placeholder:text-slate-800 transition-all outline-none",
                                                    value: dreamSearch,
                                                    onChange: (e)=>setDreamSearch(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 177
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 256,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 gap-8",
                                            children: filteredDreams.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-10 bg-white/5 border border-white/5 rounded-[60px] hover:bg-white/10 transition-all group border-l-[12px] border-l-yellow-400 shadow-2xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-start mb-8",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-3xl font-black text-yellow-400",
                                                                    children: [
                                                                        "#",
                                                                        d.keyword
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 260,
                                                                    columnNumber: 92
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex space-x-3",
                                                                    children: d.numbers.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "w-12 h-12 flex items-center justify-center bg-indigo-600 rounded-full text-base font-black shadow-2xl shadow-indigo-900",
                                                                            children: n
                                                                        }, `${d.keyword}-${n}`, false, {
                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                            lineNumber: 260,
                                                                            columnNumber: 214
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 260,
                                                                    columnNumber: 161
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 260,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xl text-slate-300 leading-relaxed font-medium italic",
                                                            children: [
                                                                '"',
                                                                d.meaning,
                                                                '"'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>alert('AI 조합 가중치에 반영되었습니다.'),
                                                            className: "mt-10 w-full py-5 bg-white text-slate-900 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-yellow-400 transition-colors active:scale-95",
                                                            children: "Analyze this dream"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, `dream-${i}`, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 33
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 257,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                    lineNumber: 251,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 250,
                                columnNumber: 17
                            }, this),
                            activeTab === 'HELP' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full overflow-y-auto p-12 bg-white animate-in slide-in-from-right duration-700",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-5xl mx-auto space-y-16",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-4xl font-black tracking-tighter flex items-center text-slate-900",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$newspaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Newspaper$3e$__["Newspaper"], {
                                                                    className: "mr-4 text-indigo-600 w-10 h-10"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 274,
                                                                    columnNumber: 192
                                                                }, this),
                                                                " 로또 지식 백과"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 106
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-500 font-bold text-lg",
                                                            children: "초보부터 전문가까지, 데이터로 이해하는 로또의 모든 것"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 262
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 79
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-black text-slate-400 uppercase mb-1",
                                                            children: "Updated At"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 431
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-black text-slate-900",
                                                            children: "2026.01.03"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 513
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 350
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 274,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                    className: "bg-indigo-50 p-12 rounded-[60px] border border-indigo-100 shadow-sm relative overflow-hidden",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute -top-10 -right-10 opacity-5",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                                className: "w-40 h-40"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 197
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 143
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-black text-2xl mb-10 flex items-center text-indigo-900",
                                                            children: "당첨금 수령 프로세스"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 235
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                            className: "space-y-8 text-indigo-900/70 font-black",
                                                            children: [
                                                                '1등: 농협은행 본점 (서울 서대문)',
                                                                '2/3등: 농협은행 전국 각 지점',
                                                                '4/5등: 로또 판매점 및 편의점'
                                                            ].map((text, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    className: "flex items-center text-lg",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                                            className: "w-6 h-6 mr-4 text-indigo-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                            lineNumber: 276,
                                                                            columnNumber: 521
                                                                        }, this),
                                                                        " ",
                                                                        text
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 276,
                                                                    columnNumber: 471
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 327
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                    className: "bg-slate-50 p-12 rounded-[60px] border border-slate-100 shadow-sm relative overflow-hidden",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute -top-10 -right-10 opacity-5",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                                                className: "w-40 h-40"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 277,
                                                                columnNumber: 195
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 141
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-black text-2xl mb-10 flex items-center text-slate-900",
                                                            children: "구매 시 필수 주의사항"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 237
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                            className: "space-y-8 text-slate-600 font-black",
                                                            children: [
                                                                '판매시간: 06:00 ~ 24:00 (매일)',
                                                                '토요일 판매 마감: 20:00 (추첨일)',
                                                                '구매한도: 1인 1회 10만원 한도'
                                                            ].map((text, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    className: "flex items-center text-lg",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                            className: "w-6 h-6 mr-4 text-green-500"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                            lineNumber: 277,
                                                                            columnNumber: 528
                                                                        }, this),
                                                                        " ",
                                                                        text
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 277,
                                                                    columnNumber: 478
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 329
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 275,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                            className: "bg-white border-4 border-dashed border-slate-100 p-12 rounded-[60px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-black text-2xl mb-10 text-slate-900",
                                                    children: "전문가 구입 요령 (FAQ)"
                                                }, void 0, false, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 115
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 gap-10",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$data$2f$lotto_knowledge$2e$json__$28$json$29$__["default"].slice(0, 4).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4 group cursor-help",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                            className: "w-5 h-5 mr-3 text-yellow-500"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                            lineNumber: 279,
                                                                            columnNumber: 454
                                                                        }, this),
                                                                        " ",
                                                                        item.title
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 279,
                                                                    columnNumber: 340
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-lg text-slate-500 leading-relaxed font-medium",
                                                                    children: item.content
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 279,
                                                                    columnNumber: 520
                                                                }, this)
                                                            ]
                                                        }, item.id, true, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 281
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 192
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 279,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                    lineNumber: 273,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 272,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    selectedStore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "absolute inset-0 md:relative md:w-[500px] bg-white z-[60] animate-in slide-in-from-right duration-500 shadow-2xl flex flex-col border-l",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-8 border-b flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedStore(null),
                                        className: "p-4 hover:bg-slate-100 rounded-[24px] transition-all active:scale-90",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-8 h-8"
                                        }, void 0, false, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 288,
                                            columnNumber: 256
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 288,
                                        columnNumber: 128
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-black text-[10px] tracking-[0.4em] uppercase text-slate-300",
                                        children: "Intelligence Profile"
                                    }, void 0, false, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 288,
                                        columnNumber: 290
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>alert('링크가 복사되었습니다.'),
                                        className: "p-4 hover:bg-slate-100 rounded-[24px] text-indigo-600 transition-all",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                            className: "w-6 h-6"
                                        }, void 0, false, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 288,
                                            columnNumber: 523
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 288,
                                        columnNumber: 396
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 288,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-10 overflow-y-auto flex-1 space-y-10 scrollbar-hide pb-20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-4 py-1.5 bg-red-500 text-white text-[10px] font-black rounded-full shadow-2xl shadow-red-200",
                                                        children: "ELITE HOTSPOT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 97
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full border border-indigo-100 flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                className: "w-3 h-3 mr-1.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 290,
                                                                columnNumber: 369
                                                            }, this),
                                                            " LUCK IDX ",
                                                            selectedStore.luckIndex
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 231
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 290,
                                                columnNumber: 52
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter",
                                                children: selectedStore.name
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 290,
                                                columnNumber: 460
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg text-slate-400 font-bold leading-relaxed flex items-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "w-6 h-6 mr-3 shrink-0 text-indigo-500 mt-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 648
                                                    }, this),
                                                    selectedStore.address
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 290,
                                                columnNumber: 567
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 290,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gradient-to-br from-orange-400 to-red-600 rounded-[50px] p-10 text-white shadow-2xl relative overflow-hidden group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-1000",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                    className: "w-32 h-32"
                                                }, void 0, false, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 268
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 291,
                                                columnNumber: 156
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-black text-2xl mb-8 flex items-center",
                                                children: "스피또 실시간 1등 재고"
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 291,
                                                columnNumber: 305
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-4",
                                                children: [
                                                    {
                                                        type: '2000',
                                                        l: 2
                                                    },
                                                    {
                                                        type: '1000',
                                                        l: 5
                                                    },
                                                    {
                                                        type: '500',
                                                        l: 1
                                                    }
                                                ].map((sp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white/10 rounded-[32px] p-6 text-center border border-white/10 backdrop-blur-md hover:bg-white/20 transition-all",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[11px] font-black opacity-60 mb-2",
                                                                children: sp.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 291,
                                                                columnNumber: 643
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-3xl font-black",
                                                                children: [
                                                                    sp.l,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm ml-1",
                                                                        children: "매"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 291,
                                                                        columnNumber: 751
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 291,
                                                                columnNumber: 710
                                                            }, this)
                                                        ]
                                                    }, sp.type, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 496
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 291,
                                                columnNumber: 382
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] mt-8 text-center font-black opacity-40 uppercase tracking-widest italic",
                                                children: "Live Inventory Tracking Active"
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 291,
                                                columnNumber: 809
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 291,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 gap-5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>openNaverMap(selectedStore),
                                            className: "flex items-center justify-between p-7 bg-slate-900 text-white rounded-[40px] hover:shadow-2xl hover:shadow-indigo-200 transition-all group font-black text-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"], {
                                                            className: "w-7 h-7 mr-5 text-green-400 transition-transform group-hover:scale-110"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 292,
                                                            columnNumber: 318
                                                        }, this),
                                                        " 네이버 길찾기"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 283
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                    className: "w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity"
                                                }, void 0, false, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 426
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 292,
                                            columnNumber: 61
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 292,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gradient-to-br from-indigo-600 to-violet-800 rounded-[60px] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 294,
                                                columnNumber: 25
                                            }, this),
                                            !analysis ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center relative z-10 space-y-8 py-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-24 h-24 bg-white/10 rounded-[40px] flex items-center justify-center mx-auto border border-white/10 backdrop-blur-md",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            className: "w-12 h-12 text-yellow-300 animate-bounce"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 222
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 87
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-black text-3xl tracking-tighter",
                                                                children: "AI 행운 분석"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 296,
                                                                columnNumber: 320
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-indigo-100 text-sm opacity-70 leading-relaxed font-bold",
                                                                children: [
                                                                    "이 매장의 지형적 기운과 공공데이터",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 296,
                                                                        columnNumber: 481
                                                                    }, this),
                                                                    "당첨 패턴을 정밀 분석합니다."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 296,
                                                                columnNumber: 386
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 293
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleAnalyze,
                                                        disabled: isAnalyzing,
                                                        className: "w-full bg-white text-indigo-600 font-black py-6 rounded-[32px] shadow-2xl active:scale-95 transition-all text-xl",
                                                        children: isAnalyzing ? "Analyzing Core..." : "분석 엔진 가동"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 512
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 296,
                                                columnNumber: 29
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-10 relative z-10 animate-in zoom-in duration-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-indigo-200 text-[11px] font-black uppercase tracking-[0.4em] mb-3",
                                                                children: "Algorithm Score"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 299,
                                                                columnNumber: 38
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-8xl font-black text-yellow-300 tracking-tighter",
                                                                children: [
                                                                    analysis.score,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-3xl text-white/30 ml-2",
                                                                        children: "/100"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 299,
                                                                        columnNumber: 227
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 299,
                                                                columnNumber: 143
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-2xl font-bold leading-tight italic text-indigo-50",
                                                        children: [
                                                            '"',
                                                            analysis.insights,
                                                            '"'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white/10 rounded-[48px] p-10 backdrop-blur-xl border border-white/10 shadow-inner",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[11px] text-indigo-200 font-black mb-8 uppercase text-center tracking-[0.5em]",
                                                                children: "AI Suggested Sequence"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 302,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: analysis.luckyNumber.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-12 h-12 flex items-center justify-center bg-white text-indigo-900 rounded-full font-black text-lg shadow-2xl shadow-indigo-900/50 transform hover:scale-125 transition-all hover:rotate-12 cursor-pointer",
                                                                        children: n
                                                                    }, n, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 303,
                                                                        columnNumber: 107
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 303,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex space-x-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>alert('카톡 행운 카드 전송'),
                                                                className: "flex-1 bg-yellow-400 text-yellow-900 font-black py-5 rounded-[28px] text-xs flex flex-col items-center justify-center shadow-2xl active:scale-90 transition-all",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                                        className: "w-6 h-6 mb-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 305,
                                                                        columnNumber: 282
                                                                    }, this),
                                                                    " 카톡 전달"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 65
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>alert('고화질 이미지 저장'),
                                                                className: "flex-1 bg-white/10 text-white font-black py-5 rounded-[28px] text-xs flex flex-col items-center justify-center border border-white/20 hover:bg-white/20 transition-all active:scale-90",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                        className: "w-6 h-6 mb-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 305,
                                                                        columnNumber: 578
                                                                    }, this),
                                                                    " 이미지 저장"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 339
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center space-x-2 opacity-40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 306,
                                                                columnNumber: 104
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] font-black uppercase tracking-widest text-center",
                                                                children: "Certified Data Intelligence"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 306,
                                                                columnNumber: 139
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 298,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 293,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 289,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                        lineNumber: 287,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-10 right-10 z-50 flex flex-col space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('HELP'),
                        className: "bg-white w-20 h-20 rounded-[32px] shadow-2xl flex items-center justify-center text-indigo-600 border border-slate-100 transition-all hover:scale-110 hover:rotate-12 active:scale-90",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                            className: "w-10 h-10"
                        }, void 0, false, {
                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                            lineNumber: 316,
                            columnNumber: 249
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                        lineNumber: 316,
                        columnNumber: 11
                    }, this),
                    activeTab === 'MAP' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsSidebarOpen(!isSidebarOpen),
                        className: "md:hidden bg-indigo-600 w-20 h-20 rounded-[32px] shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90",
                        children: isSidebarOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-10 h-10"
                        }, void 0, false, {
                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                            lineNumber: 318,
                            columnNumber: 252
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "w-10 h-10"
                        }, void 0, false, {
                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                            lineNumber: 318,
                            columnNumber: 282
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                        lineNumber: 318,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                lineNumber: 315,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_s(MapInterface, "szSf6uiBIg68d9PpC7kn9QQHn2o=");
_c = MapInterface;
var _c;
__turbopack_context__.k.register(_c, "MapInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lotto-map-korea/app/components/MapInterface.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/lotto-map-korea/app/components/MapInterface.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=lotto-map-korea_60a5da90._.js.map