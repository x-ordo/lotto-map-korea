/**
 * Static Sitemap Generation
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { MetadataRoute } from 'next';

// Required for static export
export const dynamic = 'force-static';

const BASE_URL = 'https://lotto-shrine.pages.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages only for static export
  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];
}
