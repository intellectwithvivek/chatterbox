'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  Avatar,
  ChatCodeBlock,
  ChatThread,
  IconButton,
  Text,
  type ChatThreadMessage,
} from '@the_viveksingh/vivek-ui'

import { usePrefersReducedMotion } from '@/lib/client-env'

const SNIPPET = `import { ChatThread, ChatInput } from '@the_viveksingh/vivek-ui'

<ChatThread messages={messages} loading={pending} />
<ChatInput onSubmit={send} placeholder="Ask anything…" />`

interface Turn {
  role: 'user' | 'assistant'
  content: ReactNode
}

const SCRIPT: Turn[] = [
  {
    role: 'user',
    content: 'Give me the React for a chat thread with a typing indicator.',
  },
  {
    role: 'assistant',
    content: (
      <>
        <Text>Two components. The thread owns scrolling and the live region:</Text>
        {/* `wrap` rather than horizontal scroll: inside a bubble this narrow,
            a scrollbar hides the end of every line. */}
        <ChatCodeBlock
          code={SNIPPET}
          language="tsx"
          filename="components/chat.tsx"
          wrap
          style={{ marginBlockStart: '0.625rem' }}
        />
      </>
    ),
  },
  { role: 'user', content: 'Hold on — is this panel a screenshot?' },
  {
    role: 'assistant',
    content: (
      <Text>
        No. You are looking at the real components, running in the page, on a scripted loop.
        Every bubble, the dots between turns and that code block are live.
      </Text>
    ),
  },
  { role: 'user', content: 'What is it built with?' },
  {
    role: 'assistant',
    content: (
      <Text>
        VivekUI — 91 React components and 6 SVG charts, zero runtime dependencies. Ask me
        again in the full demo and I will show you a chart inside one of these bubbles.
      </Text>
    ),
  },
]

/** One rendered state of the demo: which turns are visible, and the dots. */
interface Frame {
  count: number
  typing: boolean
  hold: number
}

/**
 * Expand the script into a timeline. A user turn appears, the dots run for a
 * beat, then the reply lands and sits long enough to be read.
 */
function buildFrames(script: Turn[]): Frame[] {
  const frames: Frame[] = []
  script.forEach((turn, i) => {
    if (turn.role === 'user') {
      frames.push({ count: i + 1, typing: false, hold: 800 })
    } else {
      frames.push({ count: i, typing: true, hold: 1200 })
      frames.push({ count: i + 1, typing: false, hold: 2600 })
    }
  })
  // linger on the finished transcript before looping back to an empty thread
  const last = frames[frames.length - 1]
  if (last) last.hold = 4200
  return frames
}

const FRAMES = buildFrames(SCRIPT)

const AVATARS = {
  user: <Avatar name="You" size="sm" fallback="Y" />,
  assistant: <Avatar name="ChatterBox" size="sm" fallback="CB" />,
} as const

function toMessages(count: number): ChatThreadMessage[] {
  return SCRIPT.slice(0, count).map((turn, i) => ({
    id: `demo-${i}`,
    role: turn.role,
    content: turn.content,
    name: turn.role === 'user' ? 'You' : 'ChatterBox',
    avatar: AVATARS[turn.role],
  }))
}

/**
 * The hero *is* the product: a real `ChatThread` playing a scripted
 * conversation on a loop.
 *
 * Two accessibility obligations come with auto-updating content, and both are
 * met here. WCAG 2.2.2 wants a way to stop it, which the pause button
 * provides; and `prefers-reduced-motion` gets the finished transcript
 * immediately, with no loop and no timers ever scheduled.
 */
export function HeroDemo() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !playing) return
    const frame = FRAMES[index]
    if (!frame) return
    const timer = window.setTimeout(
      () => setIndex((i) => (i + 1) % FRAMES.length),
      frame.hold,
    )
    return () => window.clearTimeout(timer)
  }, [index, playing, reduced])

  const frame = reduced
    ? { count: SCRIPT.length, typing: false, hold: 0 }
    : (FRAMES[index] ?? FRAMES[0]!)

  const messages = useMemo(() => toMessages(frame.count), [frame.count])

  return (
    <div className="device device--accent">
      <div className="device__bar">
        <span className="device__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="device__title">chatterbox — live components, not a screenshot</span>
        {!reduced && (
          <IconButton
            size="sm"
            variant="ghost"
            aria-label={playing ? 'Pause the demo' : 'Play the demo'}
            onClick={() => setPlaying((p) => !p)}
            style={{ marginInlineStart: 'auto' }}
          >
            <span aria-hidden="true">{playing ? '❙❙' : '▶'}</span>
          </IconButton>
        )}
      </div>

      <div className="device__body">
        <ChatThread
          className="demo-thread"
          messages={messages}
          loading={frame.typing}
          loadingLabel="ChatterBox is typing"
          label="Scripted demo conversation"
        />
      </div>
    </div>
  )
}
