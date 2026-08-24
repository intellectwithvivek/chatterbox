/**
 * Mock conversation list for the /chat sidebar.
 *
 * Timestamps are stored as an offset in minutes rather than a date. The
 * sidebar resolves them against `SSR_ANCHOR` on the first render — which the
 * server and the client agree on, so hydration matches — and then against
 * the real clock once mounted, so a forked copy of this template never shows
 * conversations from the month it was published.
 */

import type { ReplyBlock } from './replies'

/** Fixed instant used for the server render. Any stable value works. */
export const SSR_ANCHOR = Date.parse('2026-08-24T09:00:00.000Z')

export interface SeedTurn {
  role: 'user' | 'assistant'
  /** User turns carry plain text. */
  text?: string
  /** Assistant turns carry blocks, same shape the reply engine produces. */
  blocks?: ReplyBlock[]
}

export interface Conversation {
  id: string
  title: string
  /** How long ago the conversation was last touched. */
  offsetMinutes: number
  seed: SeedTurn[]
}

export const conversations: Conversation[] = [
  {
    id: 'new',
    title: 'New chat',
    offsetMinutes: 0,
    seed: [],
  },
  {
    id: 'onboarding',
    title: 'Rendering a thread',
    offsetMinutes: 14,
    seed: [
      { role: 'user', text: 'How much code does a working thread actually take?' },
      {
        role: 'assistant',
        blocks: [
          {
            kind: 'text',
            text: 'Two components and a state array. `ChatThread` owns the scroll behaviour and the live region; `ChatInput` owns the keyboard contract.',
          },
          {
            kind: 'code',
            language: 'tsx',
            filename: 'components/chat.tsx',
            code: `<ChatThread messages={messages} loading={pending} />
<ChatInput onSubmit={send} placeholder="Ask anything…" />`,
          },
        ],
      },
    ],
  },
  {
    id: 'usage',
    title: 'Channel usage this week',
    offsetMinutes: 95,
    seed: [
      { role: 'user', text: 'usage stats' },
      {
        role: 'assistant',
        blocks: [
          { kind: 'text', text: 'Here are your top channels for the last seven days.' },
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
        ],
      },
    ],
  },
  {
    id: 'theming',
    title: 'Emerald accent + dark mode',
    offsetMinutes: 26 * 60,
    seed: [
      { role: 'user', text: 'How do I change the accent colour?' },
      {
        role: 'assistant',
        blocks: [
          {
            kind: 'text',
            text: 'One custom property per theme. This site sets exactly these two:',
          },
          {
            kind: 'code',
            language: 'css',
            filename: 'app/globals.css',
            code: `:root            { --vk-color-primary: #047857; }
[data-theme='dark'] { --vk-color-primary: #34d399; }`,
          },
        ],
      },
    ],
  },
  {
    id: 'a11y',
    title: 'Screen reader review',
    offsetMinutes: 3 * 24 * 60,
    seed: [
      { role: 'user', text: 'Will a screen reader cope with a streaming reply?' },
      {
        role: 'assistant',
        blocks: [
          {
            kind: 'text',
            text: 'That is the case the typing indicator is designed around. It lives *outside* the transcript live region, so a reply that toggles it on and off dozens of times announces "assistant is typing" once, politely, instead of talking over the answer.',
          },
          {
            kind: 'list',
            items: [
              'Transcript is role="log" with aria-relevant="additions".',
              'Each turn is an <article>, so turns are navigable one by one.',
              'The indicator is role="status" — never role="alert".',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'backend',
    title: 'Wiring our own endpoint',
    offsetMinutes: 9 * 24 * 60,
    seed: [
      { role: 'user', text: 'Can we point this at our own model?' },
      {
        role: 'assistant',
        blocks: [
          {
            kind: 'text',
            text: 'Yes — the components never talk to a network. Give `onSubmit` a server action and append the response.',
          },
        ],
      },
    ],
  },
]
