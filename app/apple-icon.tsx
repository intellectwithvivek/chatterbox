import { ImageResponse } from 'next/og'

/**
 * iOS home-screen icon, generated at build time. iOS ignores SVG favicons and
 * has no transparency, so this is a real 180px PNG on a solid tile.
 */
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  const bar = (height: number) => (
    <div style={{ width: 22, height, borderRadius: 11, background: '#34d399' }} />
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 12,
          paddingBottom: 52,
          background: '#04231a',
        }}
      >
        {bar(44)}
        {bar(96)}
        {bar(66)}
      </div>
    ),
    size,
  )
}
