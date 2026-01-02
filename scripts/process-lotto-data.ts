import { readFileSync } from 'fs';
import { parse } from 'csv-parse';
import iconv from 'iconv-lite';
import fetch from 'node-fetch';

// Define the LotteryStore interface (assuming it's similar to the one in lib/types.ts)
interface LotteryStore {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: 'LOTTO' | 'HOTSPOT' | 'SPORTS_TOTO' | 'PENSION' | 'SPEEDO' | 'OTHER';
  winCount1st: number;
  winCount2nd: number;
  description?: string;
  rating?: number;
}

const REST_API_KEY = '90f3ce472a76ab6818ab595b7c1c5b55'; // Kakao Local API REST API Key

async function geocodeAddress(address: string, retries = 3, delay = 1000): Promise<{ lat: number; lng: number } | null> {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;
  try {
    console.error(`Geocoding address: ${address} (Attempt: ${4 - retries})`);
    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    });
    const data: any = await response.json();
    console.error(`Kakao API response for ${address}:`, JSON.stringify(data, null, 2));

    if (data.documents && data.documents.length > 0) {
      const { y, x } = data.documents[0].address;
      return { lat: parseFloat(y), lng: parseFloat(x) };
    } else if (data.errorType === "RequestThrottled" && retries > 0) {
      console.error(`Rate limit hit for ${address}. Retrying in ${delay}ms...`);
      await new Promise(res => setTimeout(res, delay));
      return geocodeAddress(address, retries - 1, delay * 2); // Exponential backoff
    }
    return null;
  } catch (error) {
    console.error(`Error geocoding address "${address}":`, error);
    return null;
  }
}

async function processLottoData() {
  const winCountCsvPath = './data/기획재정부_온라인복권 1등 당첨 판매점 현황 정보_20250607.csv';
  const addressCsvPath = './data/기획재정부_온라인복권 판매점 주소_20250607.csv';

  // Read and decode CSV files
  const winCountBuffer = readFileSync(winCountCsvPath);
  const addressBuffer = readFileSync(addressCsvPath);

  let winCountContent = iconv.decode(winCountBuffer, 'euc-kr');
  let addressContent = iconv.decode(addressBuffer, 'euc-kr');

  // Filter out problematic lines before parsing
  const filterCsvContent = (content: string): string => {
    return content.split('\n')
      .filter(line => line.trim() !== '' && !line.includes('[This file was truncated]'))
      .join('\n');
  };

  winCountContent = filterCsvContent(winCountContent);
  addressContent = filterCsvContent(addressContent);

  const parseCsv = (data: string, columns: string[]): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      parse(data, {
        columns: columns, // Use explicit column names
        skip_empty_lines: true,
        from_line: 1, // Start from the first data line after filtering
      }, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });
  };

  const winCounts = await parseCsv(winCountContent, ['순번', '점포명', '지역', '1등 배출 횟수']);
  const addresses = await parseCsv(addressContent, ['순번', '점포명', '구주소', '신주소']);

  const storeMap = new Map<string, Partial<LotteryStore>>();

  // Process win counts
  for (const record of winCounts) {
    const name = record['점포명']?.trim();
    const winCount1st = parseInt(record['1등 배출 횟수'], 10) || 0;
    if (name) {
      storeMap.set(name, { name, winCount1st, type: 'LOTTO' });
    }
  }

  // Process addresses and merge
  for (const record of addresses) {
    const name = record['점포명']?.trim();
    const newAddress = record['신주소']?.trim();
    if (name && newAddress) {
      const store = storeMap.get(name) || { name, type: 'LOTTO', winCount1st: 0, winCount2nd: 0, address: undefined };
      store.address = newAddress;
      storeMap.set(name, store);
    }
  }

  const lotteryStores: LotteryStore[] = [];
  for (const [id, store] of storeMap.entries()) {
    if (store.address) {
      const geo = await geocodeAddress(store.address);
      if (geo) {
        lotteryStores.push({
          id: id,
          name: store.name!,
          address: store.address,
          lat: geo.lat,
          lng: geo.lng,
          type: store.type || 'LOTTO',
          winCount1st: store.winCount1st || 0,
          winCount2nd: 0,
          description: undefined,
          rating: undefined,
        });
      } else {
        console.warn(`Could not geocode address for store: ${store.name}, Address: ${store.address}`);
      }
    } else {
      console.warn(`Store ${store.name} has no address.`);
    }
    // Add a small delay between requests to avoid hitting rate limits
    await new Promise(resolve => setTimeout(resolve, 100)); // Initial small delay
  }

  const outputContent = `
import { LotteryStore } from './types';

export const MOCK_STORES: LotteryStore[] = ${JSON.stringify(lotteryStores, null, 2)};
`;

  console.log(outputContent);
}

processLottoData();