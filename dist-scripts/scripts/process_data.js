import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse'; // csv-parse is ESM
import iconv from 'iconv-lite';
import axios from 'axios';
import { StoreType } from '../types';
const KAKAO_API_KEY = '3963628c7ec36ed00dbbfc8fd990c882'; // Provided by user
async function readCsv(filePath) {
    return new Promise((resolve, reject) => {
        const records = [];
        fs.createReadStream(filePath)
            .pipe(iconv.decodeStream('euc-kr')) // Assume euc-kr encoding for Korean CSVs
            .pipe(parse({ columns: true, trim: true }))
            .on('data', (data) => records.push(data))
            .on('end', () => {
            console.log(`Finished reading ${filePath}. Total records: ${records.length}`);
            resolve(records);
        })
            .on('error', (err) => reject(err));
    });
}
async function geocodeAddress(address) {
    try {
        const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
            headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
            params: { query: address },
        });
        if (response.data.documents.length > 0) {
            const { y, x } = response.data.documents[0].address;
            return { lat: parseFloat(y), lng: parseFloat(x) };
        }
        return null;
    }
    catch (error) {
        console.error(`Error geocoding address "${address}":`, error.message);
        return null;
    }
}
async function processData() {
    const addressFilePath = path.join(__dirname, '../data/기획재정부_온라인복권 판매점 주소_20250607.csv');
    const winningFilePath = path.join(__dirname, '../data/기획재정부_온라인복권 1등 당첨 판매점 현황 정보_20250607.csv');
    console.log('Reading address data...');
    const rawAddresses = await readCsv(addressFilePath);
    console.log('Reading winning data...');
    const rawWinnings = await readCsv(winningFilePath);
    const storesMap = new Map();
    // Process address data first
    for (const rawAddress of rawAddresses) {
        const storeName = rawAddress.상호;
        const fullAddress = rawAddress.도로명주소 || rawAddress.지번주소; // Prefer road name address
        if (!storeName || !fullAddress) {
            console.warn(`Skipping store with missing name or address: ${JSON.stringify(rawAddress)}`);
            continue;
        }
        // Initialize with default values
        storesMap.set(storeName, {
            id: storeName, // Using store name as a temporary ID
            name: storeName,
            address: fullAddress,
            lat: 0, // Will be updated by geocoding
            lng: 0, // Will be updated by geocoding
            type: [StoreType.LOTTO], // Default type
            winCount1st: 0,
            winCount2nd: 0, // Not available in this dataset, default to 0
            rating: 0, // Not available in this dataset, default to 0
            description: '로또 판매점', // Default description
        });
    }
    // Merge winning data
    for (const rawWinning of rawWinnings) {
        const storeName = rawWinning.상호;
        const winCount = parseInt(rawWinning['1등 자동 당첨 횟수'], 10) || 0;
        if (storesMap.has(storeName)) {
            const store = storesMap.get(storeName);
            store.winCount1st = winCount;
            if (winCount > 0) {
                store.type.push(StoreType.HOTSPOT); // Mark as hotspot if 1st prize wins
            }
            storesMap.set(storeName, store);
        }
        else {
            // If a winning store is not in the address list, create a basic entry
            console.warn(`Winning store "${storeName}" not found in address data. Creating basic entry.`);
            storesMap.set(storeName, {
                id: storeName,
                name: storeName,
                address: rawWinning.지역, // Use region as address if full address is unknown
                lat: 0,
                lng: 0,
                type: [StoreType.LOTTO, StoreType.HOTSPOT],
                winCount1st: winCount,
                winCount2nd: 0,
                rating: 0,
                description: '로또 1등 당첨점',
            });
        }
    }
    // Geocode addresses
    const processedStores = [];
    let geocodingPromises = [];
    let counter = 0;
    for (const store of storesMap.values()) {
        geocodingPromises.push((async () => {
            const coords = await geocodeAddress(store.address);
            if (coords) {
                store.lat = coords.lat;
                store.lng = coords.lng;
            }
            else {
                console.warn(`Could not geocode address for "${store.name}" at "${store.address}". Skipping or defaulting coordinates.`);
                // Optionally, skip this store or assign default/error coordinates
            }
            processedStores.push(store); // Cast to LotteryStore
        })());
        counter++;
        // Kakao API has rate limits (e.g., 200 requests/second, 100,000 requests/day for free tier)
        // To avoid hitting rate limits, process in batches or add a delay.
        // For now, let's just push all promises and await them. If rate limit issues occur,
        // we'll need to implement a delay or batching.
        if (counter % 100 === 0) { // Process in batches of 100 to avoid too many concurrent requests
            await Promise.all(geocodingPromises);
            geocodingPromises = [];
            console.log(`Geocoded ${counter} stores...`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay per 100 requests
        }
    }
    await Promise.all(geocodingPromises); // Await any remaining promises
    console.log(`Finished geocoding. Total processed stores: ${processedStores.length}`);
    // Filter out stores that couldn't be geocoded (lat/lng are still 0)
    const finalStores = processedStores.filter(store => store.lat !== 0 && store.lng !== 0);
    // Save to JSON
    const outputFilePath = path.join(__dirname, '../data/stores.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(finalStores, null, 2), 'utf-8');
    console.log(`Processed data saved to ${outputFilePath}. Total final stores: ${finalStores.length}`);
}
processData().catch(console.error);
