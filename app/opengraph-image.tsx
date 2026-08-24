import { ImageResponse } from 'next/og'

/**
 * The site's only real image, generated at build time.
 *
 * An abstract emerald gradient card rather than a stock photo: it is rendered
 * from this file, so it cannot 404 on a third-party host the day someone
 * shares the link, and it stays on-brand with the accent used site-wide.
 */
export const alt =
  'ChatterBox — a free AI chatbot UI template for React and Next.js, built with VivekUI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'radial-gradient(circle at 22% 8%, #0b4f3a 0%, #06231b 42%, #0a0a0b 100%)',
          color: '#f5f5f7',
          fontFamily: 'sans-serif',
        }}
      >
        {/* wordmark: the three signal bars, then the name */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 42 }}>
            <div style={{ width: 9, height: 18, borderRadius: 4, background: '#34d399' }} />
            <div style={{ width: 9, height: 42, borderRadius: 4, background: '#34d399' }} />
            <div style={{ width: 9, height: 27, borderRadius: 4, background: '#34d399' }} />
          </div>
          <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: -0.5 }}>ChatterBox</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2.5,
              maxWidth: 940,
            }}
          >
            Ship a chat UI before lunch
          </div>
          <div style={{ display: 'flex', fontSize: 31, color: '#a9b4b0', maxWidth: 900 }}>
            Free AI chatbot UI template for React &amp; Next.js — chat thread, typing
            indicator, code blocks, and charts inside the bubble.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              padding: '11px 22px',
              borderRadius: 999,
              background: '#34d399',
              color: '#04231a',
              fontSize: 25,
              fontWeight: 700,
            }}
          >
            Built with VivekUI
          </div>
          <div style={{ display: 'flex', fontSize: 25, color: '#8e8e93' }}>
            91 components · 6 SVG charts · zero runtime dependencies
          </div>
        </div>
      </div>
    ),
    size,
  )
}
