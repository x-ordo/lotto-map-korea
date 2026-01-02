
export enum StoreType {
  LOTTO = 'LOTTO',
  SPORTS_TOTO = 'SPORTS_TOTO',
  PENSION = 'PENSION',
  HOTSPOT = 'HOTSPOT',
  CASINO = 'CASINO',
  HORSE_RACING = 'HORSE_RACING',
  BICYCLE_RACING = 'BICYCLE_RACING',
  BOAT_RACING = 'BOAT_RACING'
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
  phoneNumber?: string;
  description?: string;
  rating?: number;
}

export interface LuckAnalysis {
  score: number;
  recommendation: string;
  luckyNumber: number[];
  insights: string;
}
