
import { LotteryStore, StoreType } from '../types';

export const MOCK_STORES: LotteryStore[] = [
  {
    id: '1',
    name: '상계동 스파',
    address: '서울특별시 노원구 동일로 1493',
    lat: 37.6692,
    lng: 127.0543,
    type: [StoreType.LOTTO, StoreType.HOTSPOT],
    winCount1st: 48,
    winCount2nd: 132,
    description: '전국 부동의 1위 로또 명당. 토요일이면 줄이 끝이 보이지 않습니다.',
    rating: 4.9
  },
  {
    id: '2',
    name: '강원랜드 카지노',
    address: '강원특별자치도 정선군 사북읍 하이원길 265',
    lat: 37.2081,
    lng: 128.8322,
    type: [StoreType.CASINO],
    winCount1st: 0,
    winCount2nd: 0,
    description: '대한민국 유일의 내국인 출입 가능 카지노.',
    rating: 4.2
  },
  {
    id: '3',
    name: '렛츠런파크 서울',
    address: '경기도 과천시 경마공원대로 107',
    lat: 37.4503,
    lng: 127.0135,
    type: [StoreType.HORSE_RACING],
    winCount1st: 0,
    winCount2nd: 0,
    description: '박진감 넘치는 경마를 즐길 수 있는 가족 공원 테마의 경마장.',
    rating: 4.5
  },
  {
    id: '4',
    name: '광명 스피돔',
    address: '경기도 광명시 광명로 721',
    lat: 37.4764,
    lng: 126.8524,
    type: [StoreType.BICYCLE_RACING],
    winCount1st: 0,
    winCount2nd: 0,
    description: '세계 최대 규모의 돔 경륜장.',
    rating: 4.1
  },
  {
    id: '5',
    name: '미사리 경정공원',
    address: '경기도 하남시 미사동로 505',
    lat: 37.5583,
    lng: 127.2033,
    type: [StoreType.BOAT_RACING],
    winCount1st: 0,
    winCount2nd: 0,
    description: '시원한 물살을 가르는 경정 경기가 열리는 곳.',
    rating: 4.3
  },
  {
    id: '6',
    name: '부일카서비스',
    address: '부산광역시 동구 자성로133번길 35',
    lat: 35.1385,
    lng: 129.0621,
    type: [StoreType.LOTTO, StoreType.HOTSPOT],
    winCount1st: 39,
    winCount2nd: 105,
    description: '부산 지역 로또 당첨의 자부심.',
    rating: 4.8
  }
];
