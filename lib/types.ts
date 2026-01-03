export type StoreType = 
  | 'LOTTO'
  | 'SPORTS_TOTO'
  | 'PENSION'
  | 'HOTSPOT'
  | 'CASINO'
  | 'HORSE_RACING'
  | 'BICYCLE_RACING'
  | 'BOAT_RACING';

export interface SpeettoInfo {
  gameType: '2000' | '1000' | '500';
  remaining1stPrize: number; // 해당 회차 남은 1등 수
  currentSeries: string;    // 현재 유통 중인 회차 (예: 54회)
}

export interface DreamInterpretation {
  keyword: string;
  numbers: number[];
  meaning: string;
}

export type TabType = 'MAP' | 'RANK' | 'STATS' | 'DREAM' | 'HELP' | 'COMMUNITY' | 'PRO';

export interface CommunityPost {
    id: string;
    author: string;
    storeName: string;
    content: string;
    wins?: string; // 예: "5등 당첨", "1등 전조"
    imageUrl?: string;
    likes: number;
    createdAt: string;
}

export interface UserSubscription {
    isPro: boolean;
    tier: 'FREE' | 'PRO' | 'ELITE';
    expiresAt?: string;
}

export interface LotteryStore {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: StoreType[];
  winCount1st: number;
  winCount2nd: number;
  isRecent?: boolean;
  phone?: string;
  distance?: number;
  lastWinDate?: string;
  luckIndex?: number;
  speetto?: SpeettoInfo[]; // 스피또 판매 정보
  isLive?: boolean;        // 실시간 업데이트 여부
}

export interface LuckAnalysis {
  score: number;
  recommendation: string;
  luckyNumber: number[];
  insights: string;
}
