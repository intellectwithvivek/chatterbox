import type { Metadata } from 'next'
import { Container, Text } from '@the_viveksingh/vivek-ui'

import { ChatApp } from '@/components/chat-app'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbSchema } from '@/lib/schema'
import { ogImage } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Live chat demo',
  description:
    'A working mock AI chat app built entirely from VivekUI: conversation sidebar, streaming-style typing indicator, code blocks with copy, and an SVG chart rendered inside a message bubble. No API key, no model, nothing leaves the browser.',
  alternates: { canonical: '/chat' },
  openGraph: {
    title: 'ChatterBox — live chat demo',
    description:
      'A working mock AI chat app built entirely from VivekUI. Type “show me a chart” to see an SVG chart render inside a message bubble.',
    url: '/chat',
    images: [ogImage],
  },
  twitter: { card: 'summary_large_image', images: [ogImage] },
}

export default function ChatPage() {
  return (
    <Container size="xl" style={{ paddingBlock: '1.25rem 2rem' }}>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Live chat demo', path: '/chat' },
        ])}
      />

      {/* The page's only h1. The shell below is the real content. */}
      <h1 className="vh">ChatterBox live chat demo</h1>

      <ChatApp />

      <Text size="sm" tone="muted" style={{ marginBlockStart: '0.875rem' }}>
        Every reply is keyword-matched from{' '}
        <code>data/replies.ts</code> — there is no model and no network request. Try{' '}
        <strong>“show me a chart”</strong>, <strong>“show me code”</strong>, or{' '}
        <strong>“what UI library is this?”</strong>
      </Text>
    </Container>
  )
}
