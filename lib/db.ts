import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { CommunityPost, SavedLotto } from './types';

// 절대 경로를 사용하여 경로 오인 방지
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_PATH = path.resolve(DATA_DIR, 'live_community.json');
const LOTTO_DB_PATH = path.resolve(DATA_DIR, 'saved_lotto.json');

export const db = {
    lotto: {
        async list(): Promise<SavedLotto[]> {
            if (!existsSync(LOTTO_DB_PATH)) return [];
            const data = await fs.readFile(LOTTO_DB_PATH, 'utf8');
            return JSON.parse(data || '[]');
        },
        async save(numbers: number[], round: number, memo?: string): Promise<SavedLotto> {
            const list = await this.list();
            const newItem: SavedLotto = {
                id: Math.random().toString(36).substr(2, 9),
                numbers: numbers.sort((a,b) => a-b),
                round,
                createdAt: new Date().toISOString(),
                ...(memo && { memo })
            };
            list.unshift(newItem);
            await fs.writeFile(LOTTO_DB_PATH, JSON.stringify(list, null, 2), 'utf8');
            return newItem;
        }
    },
    community: {
        async list(): Promise<CommunityPost[]> {
            // 1. 디렉토리 확인 및 생성
            if (!existsSync(DATA_DIR)) {
                mkdirSync(DATA_DIR, { recursive: true });
            }

            // 2. 파일 확인 및 초기화
            if (!existsSync(DB_PATH)) {
                const seed: CommunityPost[] = [
                    { id: 'seed-1', author: 'LottoShrine', storeName: '운영팀', content: '성지순례 담벼락에 오신 것을 환영합니다.', likes: 777, createdAt: new Date().toISOString() }
                ];
                await fs.writeFile(DB_PATH, JSON.stringify(seed, null, 2), 'utf8');
                return seed;
            }

            // 3. 파일 읽기
            try {
                const data = await fs.readFile(DB_PATH, 'utf8');
                return JSON.parse(data || '[]');
            } catch (e) {
                console.error('File Read/Parse Error:', e);
                return [];
            }
        },
        async create(post: Omit<CommunityPost, 'id' | 'createdAt' | 'likes'>): Promise<CommunityPost> {
            const posts = await this.list();
            const newPost: CommunityPost = {
                ...post,
                id: Math.random().toString(36).substr(2, 9),
                createdAt: new Date().toISOString(),
                likes: 0
            };
            posts.unshift(newPost);
            await fs.writeFile(DB_PATH, JSON.stringify(posts, null, 2), 'utf8');
            return newPost;
        }
    }
};
