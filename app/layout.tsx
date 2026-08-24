import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider, ToastProvider } from '@the_viveksingh/vivek-ui'

// Library styles first, then ours — the library wraps its selectors in
// :where() so anything in globals.css wins without escalating specificity.
import '@the_viveksingh/vivek-ui/styles.css'
import '@the_viveksingh/vivek-ui/charts.css'
import './globals.css'

import { SiteFooter } from '@/components/site-footer'
import { SiteNavbar } from '@/components/site-navbar'
import { site } from '@/lib/site'
import { themeScript } from '@/lib/theme-script'

const sans = Geist({ variable: '--font-sans', subsets: ['latin'] })
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Free AI Chatbot UI Template (React / Next.js) — ChatterBox | VivekUI',
    template: `%s — ${site.name} | VivekUI`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: 'Vivek Kumar Singh', url: 'https://vivekkumarsingh.in/' }],
  creator: 'Vivek Kumar Singh',
  keywords: [
    'free ai chatbot ui template react nextjs',
    'ai chatbot ui template',
    'react chat ui components',
    'nextjs chat template',
    'chat ui library',
    'zero dependency react components',
    'VivekUI',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    url: site.url,
    title: 'Free AI Chatbot UI Template for React & Next.js — ChatterBox',
    description: site.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Chatbot UI Template for React & Next.js — ChatterBox',
    description: site.description,
  },
  robots: { index: true, follow: true },
  category: 'technology',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // data-theme is rendered so dark mode survives JavaScript being off; the
    // head script re-points it before first paint when a visitor has chosen
    // otherwise, which is what suppressHydrationWarning covers.
    <html
      lang="en"
      data-theme="dark"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark">
          <ToastProvider position="bottom-end">
            <a className="skip" href="#main">
              Skip to content
            </a>
            <SiteNavbar />
            <main id="main">{children}</main>
            <SiteFooter />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
