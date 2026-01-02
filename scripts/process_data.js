import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';
import iconv from 'iconv-lite';
import axios from 'axios';

// Manually define StoreType as a plain JavaScript object
const StoreType = {
  LOTTO: 'LOTTO',
  SPORTS_TOTO: 'SPORTS_TOTO',
  PENSION: 'PENSION',
  HOTSPOT: 'HOTSPOT',
  CASINO: 'CASINO',
  HORSE_RACING: 'HORSE_RACING',
  BICYCLE_RACING: 'BICYCLE_RACING',
  BOAT_RACING: 'BOAT_RACING',
};

// LotteryStore is an interface, so it's only for type checking and doesn't exist at runtime.
// We will treat the data as a generic object.

const KAKAO_API_KEY = '3963628c7ec36ed00dbbfc8fd990c882'; // Provided by user
