import type { MetadataRoute } from 'next'

import { site } from '@/lib/site'

/** Three routes, so the sitemap is hand-listed rather than generated. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-08-24')

  return [
    { url: site.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/chat`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/built-with`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
