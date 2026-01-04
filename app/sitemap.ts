/**
 * Dynamic Sitemap Generation
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { MetadataRoute } from 'next';
import type { LotteryStore } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://lotto-shrine.pages.dev';

// Load stores data for sitemap
async function getStores(): Promise<LotteryStore[]> {
  const fs = await import('fs/promises');
  const path = await import('path');

  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'stores.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Dynamic store pages
  const stores = await getStores();
  const storePages: MetadataRoute.Sitemap = stores.map((store) => ({
    url: `${BASE_URL}/stores/${encodeURIComponent(store.id)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...storePages];
}
