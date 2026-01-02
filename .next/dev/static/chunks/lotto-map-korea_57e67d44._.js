(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lotto-map-korea/lib/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
        "winCount2nd": 0,
        "description": "1등 당첨: 3회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 3회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 3회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 3회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
    },
    {
        "id": "복권세상",
        "name": "복권세상",
        "address": "전남 목포시 청호로 139",
        "lat": 34.8039274358966,
        "lng": 126.375817956267,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 2,
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 2회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
    },
    {
        "id": "천하명당",
        "name": "천하명당",
        "address": "경남 양산시 연호로 46",
        "lat": 35.4157062082918,
        "lng": 129.175245366936,
        "type": [
            "LOTTO"
        ],
        "winCount1st": 1,
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
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
        "winCount2nd": 0,
        "description": "1등 당첨: 1회"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lotto-map-korea/app/components/MapInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MapInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dices$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dices$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/dices.js [app-client] (ecmascript) <export default as Dices>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bike$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bike$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/bike.js [app-client] (ecmascript) <export default as Bike>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ship$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ship$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/ship.js [app-client] (ecmascript) <export default as Ship>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/lotto-map-korea/node_modules/lucide-react/dist/esm/icons/flag.js [app-client] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$luckEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/lib/luckEngine.ts [app-client] (ecmascript)"); // 가짜 AI 엔진 연동
var __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lotto-map-korea/lib/data.ts [app-client] (ecmascript)"); // 데이터 (기존 mockStores.ts 내용을 lib/data.ts로 이동 가정)
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// 아이콘 설정 (기존 코드 유지)
const TYPE_CONFIG = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StoreType"].LOTTO]: {
        label: '로또 6/45',
        color: 'bg-yellow-500',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
            className: "w-4 h-4"
        }, void 0, false, {
            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
            lineNumber: 18,
            columnNumber: 72
        }, ("TURBOPACK compile-time value", void 0))
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StoreType"].SPORTS_TOTO]: {
        label: '스포츠토토',
        color: 'bg-blue-500',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"], {
            className: "w-4 h-4"
        }, void 0, false, {
            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
            lineNumber: 19,
            columnNumber: 74
        }, ("TURBOPACK compile-time value", void 0))
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StoreType"].PENSION]: {
        label: '연금복권',
        color: 'bg-purple-500',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
            className: "w-4 h-4"
        }, void 0, false, {
            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
            lineNumber: 20,
            columnNumber: 71
        }, ("TURBOPACK compile-time value", void 0))
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StoreType"].HOTSPOT]: {
        label: '당첨명당',
        color: 'bg-red-500',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
            className: "w-4 h-4"
        }, void 0, false, {
            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
            lineNumber: 21,
            columnNumber: 68
        }, ("TURBOPACK compile-time value", void 0))
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StoreType"].CASINO]: {
        label: '카지노',
        color: 'bg-slate-800',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dices$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dices$3e$__["Dices"], {
            className: "w-4 h-4"
        }, void 0, false, {
            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
            lineNumber: 22,
            columnNumber: 68
        }, ("TURBOPACK compile-time value", void 0))
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StoreType"].HORSE_RACING]: {
        label: '경마',
        color: 'bg-green-600',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
            className: "w-4 h-4"
        }, void 0, false, {
            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
            lineNumber: 23,
            columnNumber: 73
        }, ("TURBOPACK compile-time value", void 0))
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StoreType"].BICYCLE_RACING]: {
        label: '경륜',
        color: 'bg-orange-500',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bike$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bike$3e$__["Bike"], {
            className: "w-4 h-4"
        }, void 0, false, {
            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
            lineNumber: 24,
            columnNumber: 76
        }, ("TURBOPACK compile-time value", void 0))
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StoreType"].BOAT_RACING]: {
        label: '경정',
        color: 'bg-cyan-500',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ship$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ship$3e$__["Ship"], {
            className: "w-4 h-4"
        }, void 0, false, {
            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
            lineNumber: 25,
            columnNumber: 71
        }, ("TURBOPACK compile-time value", void 0))
    }
};
function MapInterface() {
    _s();
    const [stores] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_STORES"]);
    const [selectedStore, setSelectedStore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ALL');
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [analysis, setAnalysis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAnalyzing, setIsAnalyzing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // Kakao Map 객체를 저장할 ref
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({}); // Kakao Map Marker 객체를 저장할 ref
    // 모바일/데스크탑 감지
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapInterface.useEffect": ()=>{
            setIsSidebarOpen(window.innerWidth > 768);
        }
    }["MapInterface.useEffect"], []);
    const filteredStores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MapInterface.useMemo[filteredStores]": ()=>{
            return stores.filter({
                "MapInterface.useMemo[filteredStores]": (s)=>{
                    const matchSearch = s.name.includes(searchTerm) || s.address.includes(searchTerm);
                    const matchType = activeFilter === 'ALL' || s.type.includes(activeFilter);
                    return matchSearch && matchType;
                }
            }["MapInterface.useMemo[filteredStores]"]);
        }
    }["MapInterface.useMemo[filteredStores]"], [
        stores,
        searchTerm,
        activeFilter
    ]);
    // 지도 초기화
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapInterface.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || !window.kakao || !window.kakao.maps) return;
            const mapContainer = document.getElementById('map-container');
            const mapOption = {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                level: 8
            };
            if (!mapRef.current) {
                mapRef.current = new window.kakao.maps.Map(mapContainer, mapOption);
            } else {
                // 기존 맵이 있다면 중심과 레벨만 재설정
                mapRef.current.setCenter(mapOption.center);
                mapRef.current.setLevel(mapOption.level);
            }
            // 기존 마커 제거
            Object.values(markersRef.current).forEach({
                "MapInterface.useEffect": (m)=>m.setMap(null)
            }["MapInterface.useEffect"]);
            markersRef.current = {};
            // 새로운 마커 추가
            filteredStores.forEach({
                "MapInterface.useEffect": (store)=>{
                    const markerPosition = new window.kakao.maps.LatLng(store.lat, store.lng);
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                        map: mapRef.current
                    });
                    window.kakao.maps.event.addListener(marker, 'click', {
                        "MapInterface.useEffect": ()=>{
                            setSelectedStore(store);
                        }
                    }["MapInterface.useEffect"]);
                    markersRef.current[store.id] = marker;
                }
            }["MapInterface.useEffect"]);
        }
    }["MapInterface.useEffect"], [
        filteredStores
    ]);
    // 선택 시 이동
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapInterface.useEffect": ()=>{
            if (selectedStore && mapRef.current && window.kakao && window.kakao.maps) {
                const moveLatLon = new window.kakao.maps.LatLng(selectedStore.lat, selectedStore.lng);
                mapRef.current.setCenter(moveLatLon);
                mapRef.current.setLevel(3); // 상세 보기 레벨
                setAnalysis(null);
            }
        }
    }["MapInterface.useEffect"], [
        selectedStore
    ]);
    // [핵심] 가짜 분석 실행 (딜레이를 줘서 진짜처럼 보이게 함)
    const handleAnalyze = async ()=>{
        if (!selectedStore) return;
        setIsAnalyzing(true);
        // 0.8초의 인위적인 지연 (사용자 기대감 고조)
        setTimeout(()=>{
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$lib$2f$luckEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeLuckLocal"])(selectedStore);
            setAnalysis(result);
            setIsAnalyzing(false);
        }, 800);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-slate-50 font-sans text-slate-900 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `absolute md:relative z-20 h-full bg-white border-r shadow-2xl transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-full md:w-96 translate-x-0' : '-translate-x-full md:w-0 md:translate-x-0 md:overflow-hidden'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full",
                    children: !selectedStore ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 space-y-4 border-b",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-xl font-black tracking-tight text-slate-900 flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "mr-2 text-indigo-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 29
                                                    }, this),
                                                    " LottoMap"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 123,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setIsSidebarOpen(false),
                                                className: "md:hidden p-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 99
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 126,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 122,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-3 top-3 text-slate-400 w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 129,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "지역, 가게명 검색...",
                                                className: "w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500",
                                                value: searchTerm,
                                                onChange: (e)=>setSearchTerm(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 130,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 128,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 121,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto p-4 space-y-2",
                                children: filteredStores.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>setSelectedStore(s),
                                        className: "p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-indigo-100 cursor-pointer transition-all flex items-center space-x-3 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-2 rounded-lg ${TYPE_CONFIG[s.type[0]]?.color} text-white`,
                                                children: TYPE_CONFIG[s.type[0]]?.icon
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 145,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-sm group-hover:text-indigo-600",
                                                        children: s.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-500 truncate",
                                                        children: s.address
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 33
                                                    }, this),
                                                    s.winCount1st > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] font-bold text-red-500 mt-1 flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                                className: "w-3 h-3 mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 153,
                                                                columnNumber: 41
                                                            }, this),
                                                            " 1등 당첨 ",
                                                            s.winCount1st,
                                                            "회"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 148,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "w-4 h-4 text-slate-300"
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 157,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 144,
                                        columnNumber: 25
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 142,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                        lineNumber: 120,
                        columnNumber: 16
                    }, this) : // 상세 정보 뷰
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col h-full animate-in slide-in-from-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-b flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedStore(null),
                                    className: "flex items-center text-sm font-bold text-slate-600 hover:text-indigo-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "w-4 h-4 rotate-180 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                            lineNumber: 167,
                                            columnNumber: 29
                                        }, this),
                                        " 목록으로"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                    lineNumber: 166,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 165,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 overflow-y-auto flex-1 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-md mb-2",
                                                children: "HOT PLACE"
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 173,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-black text-slate-900",
                                                children: selectedStore.name
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 174,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-500 mt-1",
                                                children: selectedStore.address
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 175,
                                                columnNumber: 29
                                            }, this),
                                            selectedStore.winCount1st > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 flex items-center space-x-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold flex items-center border border-red-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                            className: "w-3 h-3 mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 41
                                                        }, this),
                                                        " 1등 당첨 ",
                                                        selectedStore.winCount1st,
                                                        "회"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 177,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 172,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"
                                            }, void 0, false, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 187,
                                                columnNumber: 29
                                            }, this),
                                            !analysis ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center py-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                        className: "w-8 h-8 mx-auto mb-3 text-yellow-400 animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-lg mb-1",
                                                        children: "이곳의 기운이 궁금한가요?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-slate-400 text-xs mb-4",
                                                        children: "AI가 풍수지리와 당첨 데이터를 분석합니다."
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleAnalyze,
                                                        disabled: isAnalyzing,
                                                        className: "w-full bg-white text-slate-900 font-black py-3 rounded-xl hover:scale-105 transition-transform active:scale-95 disabled:opacity-70",
                                                        children: isAnalyzing ? "기운 분석중..." : "무료 분석 시작하기"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 190,
                                                columnNumber: 33
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "animate-in zoom-in space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-end border-b border-white/10 pb-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-indigo-300 text-xs font-bold uppercase",
                                                                        children: "Luck Score"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 206,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-4xl font-black text-yellow-400",
                                                                        children: [
                                                                            analysis.score,
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-base text-white",
                                                                                children: "/100"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                                lineNumber: 207,
                                                                                columnNumber: 112
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 207,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 205,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: "AI 추천"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                    lineNumber: 210,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 209,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium leading-relaxed opacity-90",
                                                        children: [
                                                            '"',
                                                            analysis.insights,
                                                            '"'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 213,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white/10 rounded-xl p-3 backdrop-blur-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-indigo-200 font-bold mb-2 uppercase",
                                                                children: "Lucky Numbers"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 216,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between gap-1",
                                                                children: analysis.luckyNumber.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-8 h-8 flex items-center justify-center bg-white text-slate-900 rounded-full font-black text-xs shadow-lg",
                                                                        children: n
                                                                    }, n, false, {
                                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                        lineNumber: 219,
                                                                        columnNumber: 49
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                                lineNumber: 203,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                        lineNumber: 186,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                                lineNumber: 171,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                        lineNumber: 164,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 relative h-full w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "map-container",
                        className: "h-full w-full z-0 bg-slate-200"
                    }, void 0, false, {
                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                        lineNumber: 234,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsSidebarOpen(!isSidebarOpen),
                        className: "absolute top-4 left-4 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-slate-50 hidden md:block",
                        children: isSidebarOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                            lineNumber: 241,
                            columnNumber: 30
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lotto$2d$map$2d$korea$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                            lineNumber: 241,
                            columnNumber: 58
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                        lineNumber: 237,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lotto-map-korea/app/components/MapInterface.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(MapInterface, "sew0wSSIv7weW1aFrSNXrvfDN2k=");
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

//# sourceMappingURL=lotto-map-korea_57e67d44._.js.map