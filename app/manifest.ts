import type { MetadataRoute } from 'next'

import { site } from '@/lib/site'

/**
 * Web app manifest. Not a PWA — there is no service worker and nothing to
 * cache offline — but it gives the install prompt, Android home-screen icon
 * and browser UI a proper name, colour and description instead of guesses
 * scraped from the page.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Free AI Chatbot UI Template`,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0b',
    theme_color: '#04231a',
    categories: ['developer', 'productivity'],
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  }
}
