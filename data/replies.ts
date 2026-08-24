/**
 * Canned replies for the ChatterBox demo. No LLM, no network, no API key —
 * every answer below is matched from the user's text by keyword.
 *
 * A reply is a list of *blocks* rather than a string, so a single answer can
 * mix prose, a bullet list, a code block and a chart. Blocks are plain data;
 * the mapping from block to component lives in `components/reply-blocks.tsx`,
 * which keeps this file serializable and free of JSX.
 */

export type ReplyBlock =
  | { kind: 'text'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'code'; language: string; filename?: string; code: string }
  | {
      kind: 'chart'
      chartTitle: string
      description: string
      caption: string
      xLabel: string
      yLabel: string
      data: { x: string; y: number }[]
    }
  | { kind: 'link'; label: string; href: string }

export interface Reply {
  id: string
  /** Lowercase needles. A phrase matches only when the whole phrase appears. */
  keywords: string[]
  blocks: ReplyBlock[]
}

/** The code sample the assistant hands back for "show me code". */
const THREAD_SNIPPET = `import { ChatThread, ChatInput } from '@the_viveksingh/vivek-ui'

export function Chat({ messages, pending, onSend }) {
  return (
    <>
      <ChatThread messages={messages} loading={pending} />
      <ChatInput onSubmit={onSend} placeholder="Ask anything…" />
    </>
  )
}`

export const replies: Reply[] = [
  {
    id: 'code',
    keywords: ['show me code', 'show code', 'code', 'snippet', 'example', 'how do i render'],
    blocks: [
      {
        kind: 'text',
        text: 'Here is the whole thing. `ChatThread` takes an array of messages and owns the scroll behaviour; `ChatInput` grows with the draft and sends on Enter.',
      },
      {
        kind: 'code',
        language: 'tsx',
        filename: 'components/chat.tsx',
        code: THREAD_SNIPPET,
      },
      {
        kind: 'text',
        text: 'That is the complete integration. Point `onSend` at your own endpoint and you have a working assistant.',
      },
    ],
  },
  {
    id: 'chart',
    keywords: [
      'show me a chart',
      'usage stats',
      'chart',
      'graph',
      'stats',
      'analytics',
      'metrics',
      'usage',
    ],
    blocks: [
      {
        kind: 'text',
        text: 'Sure — here are your top channels for the last seven days.',
      },
      {
        kind: 'chart',
        chartTitle: 'Your top channels this week',
        description:
          'Messages handled per channel over the last seven days, highest first.',
        caption: 'BarChart, rendered inside the message bubble',
        xLabel: 'Channel',
        yLabel: 'Messages',
        data: [
          { x: 'Web', y: 4820 },
          { x: 'Slack', y: 3140 },
          { x: 'Email', y: 1960 },
          { x: 'iOS', y: 1240 },
          { x: 'API', y: 780 },
        ],
      },
      {
        kind: 'text',
        text: 'That is a real SVG chart living in a chat bubble — same package as the thread around it, still zero runtime dependencies.',
      },
    ],
  },
  {
    // The easter egg. People screenshot this one.
    id: 'library',
    keywords: [
      'what ui library is this',
      'ui library',
      'which library',
      'what library',
      'vivekui',
      'vivek ui',
      'built with',
      'what are you built with',
      'component library',
    ],
    blocks: [
      {
        kind: 'text',
        text: 'VivekUI — 91 React components and 6 SVG charts with **zero** runtime dependencies. No Tailwind, no config file, no CLI that copies files into your repo. This entire chat, the typing dots, the code blocks and the chart above all come from it.',
      },
      {
        kind: 'code',
        language: 'bash',
        code: 'npm i @the_viveksingh/vivek-ui',
      },
      {
        kind: 'text',
        text: 'One install, one CSS import, and you are done:',
      },
      {
        kind: 'code',
        language: 'tsx',
        filename: 'app/layout.tsx',
        code: "import '@the_viveksingh/vivek-ui/styles.css'",
      },
      { kind: 'link', label: 'Read the VivekUI docs →', href: 'https://ui.vivekkumarsingh.in/docs' },
    ],
  },
  {
    id: 'backend',
    keywords: [
      'llm',
      'openai',
      'anthropic',
      'claude',
      'gpt',
      'api',
      'backend',
      'model',
      'wire',
      'real ai',
    ],
    blocks: [
      {
        kind: 'text',
        text: 'This demo has no model behind it — the replies are keyword-matched from a local file. The components are UI only, which is the point: they take messages in and render them, so they sit in front of whatever you already run.',
      },
      { kind: 'list', items: [
        'Any provider — Anthropic, OpenAI, Mistral, an open-weights model on your own hardware.',
        'Any transport — server actions, route handlers, SSE, WebSockets.',
        'Append tokens to the last message as they arrive and the thread renders the stream.',
      ] },
      {
        kind: 'code',
        language: 'tsx',
        filename: 'app/chat/actions.ts',
        code: `'use server'

export async function send(text: string) {
  const res = await fetch(process.env.LLM_URL!, {
    method: 'POST',
    body: JSON.stringify({ prompt: text }),
  })
  return res.json()
}`,
      },
    ],
  },
  {
    id: 'streaming',
    keywords: ['streaming', 'stream', 'token', 'typing indicator', 'typing'],
    blocks: [
      {
        kind: 'text',
        text: 'Streaming is a rendering concern, so it is handled without any streaming machinery in the library.',
      },
      { kind: 'list', items: [
        '`TypingIndicator` covers the gap before the first token lands.',
        'Push tokens onto the last message and `ChatThread` re-renders it in place.',
        'Auto-scroll sticks to the bottom only while the reader is already there — scrolling up to re-read an earlier answer is never yanked back.',
        'Under `prefers-reduced-motion` the dots stop animating and settle into a static row.',
      ] },
    ],
  },
  {
    id: 'theming',
    keywords: ['theme', 'theming', 'dark mode', 'dark', 'light mode', 'colour', 'color', 'brand'],
    blocks: [
      {
        kind: 'text',
        text: 'Everything is a CSS custom property, so re-branding is a stylesheet edit rather than a config rewrite. The emerald you are looking at is four lines:',
      },
      {
        kind: 'code',
        language: 'css',
        filename: 'app/globals.css',
        code: `:root {
  --vk-color-primary: #047857;
}

[data-theme='dark'] {
  --vk-color-primary: #34d399;
}`,
      },
      {
        kind: 'text',
        text: 'Dark mode is one attribute on `<html>`, and it works with JavaScript disabled. Try the toggle in the header.',
      },
    ],
  },
  {
    id: 'a11y',
    keywords: ['accessible', 'accessibility', 'a11y', 'screen reader', 'wcag', 'keyboard'],
    blocks: [
      {
        kind: 'text',
        text: 'Accessibility is built into the components rather than bolted on afterwards:',
      },
      { kind: 'list', items: [
        'Each turn is an `<article>`, so screen readers can step message by message instead of arrowing through one undifferentiated blob.',
        'The typing indicator sits outside the transcript live region — otherwise a streaming reply would announce "assistant is typing" over and over.',
        'Every chart ships a visually hidden `<table>` of the real numbers, and never encodes a series by colour alone.',
        'Enter sends, Shift+Enter adds a newline, and a keypress during IME composition never submits.',
      ] },
    ],
  },
  {
    id: 'getting-started',
    keywords: ['get started', 'getting started', 'install', 'setup', 'how do i start', 'quick start'],
    blocks: [
      { kind: 'text', text: 'Three steps, and none of them is a config file.' },
      { kind: 'list', items: [
        'Install: `npm i @the_viveksingh/vivek-ui`',
        "Import the stylesheet once, in `app/layout.tsx`: `import '@the_viveksingh/vivek-ui/styles.css'`",
        'Compose `ChatThread` + `ChatInput` and pass your own messages.',
      ] },
      {
        kind: 'text',
        text: 'Charts live at a separate subpath with their own stylesheet, so apps with no charts pay nothing for them.',
      },
    ],
  },
  {
    id: 'license',
    keywords: ['license', 'licence', 'free', 'cost', 'price', 'pricing', 'commercial', 'mit'],
    blocks: [
      {
        kind: 'text',
        text: 'MIT, both of them. VivekUI and this template are free for commercial work, with no attribution requirement and no seat count.',
      },
      {
        kind: 'text',
        text: 'The footer credit is there because it helps the project — delete it if you would rather not ship it. A star on GitHub is genuinely appreciated either way.',
      },
    ],
  },
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'sup'],
    blocks: [
      {
        kind: 'text',
        text: 'Hey. I am a mock assistant — every reply here is keyword-matched from a local file, so nothing you type leaves your browser.',
      },
      {
        kind: 'text',
        text: 'Try one of the chips below the box. "show me a chart" is the one worth seeing: it renders a real SVG chart inside this bubble.',
      },
    ],
  },
]

/** Shown when nothing matches. Points the visitor at something that will. */
export const fallbackReply: Reply = {
  id: 'fallback',
  keywords: [],
  blocks: [
    {
      kind: 'text',
      text: 'There is no model behind this demo, so I only know a handful of answers. Here is everything I can actually talk about:',
    },
    { kind: 'list', items: [
      '"show me code" — the ~8 lines that build a working thread',
      '"show me a chart" — an SVG chart rendered inside this bubble',
      '"what UI library is this?" — the honest sales pitch',
      'streaming, theming, accessibility, or licensing',
    ] },
  ],
}

/**
 * Pick a reply for a user turn.
 *
 * Longer needles win, so "show me a chart" beats the bare "chart" and
 * "what ui library is this" is never swallowed by "what". Ties fall back to
 * declaration order.
 */
export function matchReply(input: string): Reply {
  const text = input.toLowerCase().replace(/\s+/g, ' ').trim()
  if (!text) return fallbackReply

  let best: Reply | null = null
  let bestScore = 0

  for (const reply of replies) {
    for (const keyword of reply.keywords) {
      if (!text.includes(keyword)) continue
      // whole-word check for short needles, so "api" does not fire on "rapid"
      if (keyword.length <= 4 && !new RegExp(`\\b${keyword}\\b`).test(text)) continue
      if (keyword.length > bestScore) {
        bestScore = keyword.length
        best = reply
      }
    }
  }

  return best ?? fallbackReply
}
