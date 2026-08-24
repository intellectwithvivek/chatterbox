/** Landing-page copy, mock metrics and the /built-with component map. */

import type { Feature } from '@the_viveksingh/vivek-ui'
import type { PricingPlan, FaqItem, Testimonial } from '@the_viveksingh/vivek-ui'

/* --- Landing: features -------------------------------------------------- */

export const features: Feature[] = [
  {
    id: 'streaming',
    icon: '▶',
    title: 'Streaming-shaped rendering',
    description:
      'A typing indicator that announces itself once instead of on every token, and auto-scroll that sticks to the bottom only while the reader is already there. Push tokens onto the last message; the thread does the rest.',
  },
  {
    id: 'code',
    icon: '⌘',
    title: 'Code blocks that copy',
    description:
      'Fenced blocks with a filename header, a copy button whose accessible name never changes, and horizontal scroll a keyboard user can actually reach. Bring your own highlighter through one render prop.',
  },
  {
    id: 'charts',
    icon: '▤',
    title: 'Charts inside the bubble',
    description:
      'Six SVG chart types at a separate subpath. Drop a BarChart into a message and it renders as part of the answer — no canvas, no d3, no second package.',
  },
  {
    id: 'theming',
    icon: '◐',
    title: 'Theming by custom property',
    description:
      'Every colour, radius and font is a CSS variable. The emerald on this page is four declarations. Dark mode is one attribute on <html>, and it survives JavaScript being switched off.',
  },
  {
    id: 'a11y',
    icon: '✓',
    title: 'Accessible by construction',
    description:
      'Each turn is an <article> so screen readers can step message by message. Charts ship a hidden table of the real numbers. Nothing encodes meaning in colour alone.',
  },
  {
    id: 'zero-deps',
    icon: '○',
    title: 'Zero runtime dependencies',
    description:
      'One install, one CSS import, no config file, no CLI copying files into your repo. 27 kB gzipped for the whole library, and components render on the server without a client boundary.',
  },
]

/* --- Landing: "How it works" ------------------------------------------- */

export const steps = [
  {
    label: 'Install',
    description: 'npm i @the_viveksingh/vivek-ui — one package, no peer chain to resolve.',
  },
  {
    label: 'Import',
    description:
      "Add import '@the_viveksingh/vivek-ui/styles.css' to app/layout.tsx. That is the whole setup.",
  },
  {
    label: 'Compose',
    description:
      'Render ChatThread with your messages and ChatInput underneath. Wire onSubmit to your own backend.',
  },
]

/** The actual source of the hero demo, shown verbatim under the Stepper. */
export const heroSource = `'use client'
import { useState } from 'react'
import { ChatThread, ChatInput } from '@the_viveksingh/vivek-ui'

export function Demo() {
  const [messages, setMessages] = useState([])
  const [pending, setPending] = useState(false)

  async function send(text: string) {
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', content: text }])
    setPending(true)
    const reply = await ask(text)               // your backend
    setPending(false)
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'assistant', content: reply }])
  }

  return (
    <>
      <ChatThread messages={messages} loading={pending} />
      <ChatInput onSubmit={send} placeholder="Ask anything…" />
    </>
  )
}`

/* --- Landing: charts --------------------------------------------------- */

/** Mock growth curve for the LineChart. */
export const messagesPerWeek = [
  { x: 'W1', y: 18_400 },
  { x: 'W2', y: 24_900 },
  { x: 'W3', y: 31_200 },
  { x: 'W4', y: 29_700 },
  { x: 'W5', y: 42_100 },
  { x: 'W6', y: 55_800 },
  { x: 'W7', y: 61_300 },
  { x: 'W8', y: 78_600 },
  { x: 'W9', y: 92_400 },
  { x: 'W10', y: 88_900 },
  { x: 'W11', y: 104_200 },
  { x: 'W12', y: 126_500 },
]

/* --- Landing: pricing -------------------------------------------------- */

export const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'The template, the library, and every component on this page.',
    features: [
      'MIT licensed — commercial use included',
      'All 91 components and 6 charts',
      'Landing page + working chat shell',
      'Dark mode, theming, SEO and JSON-LD wired up',
      'Fork it, rename it, ship it',
    ],
    highlighted: true,
    badge: 'This template',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$0',
    period: 'also forever',
    description:
      'There is no Pro tier. This column exists so you can see what the Pricing component does with a second plan.',
    features: [
      'Everything in Free',
      'No seat counts, no usage caps',
      'No email capture before download',
      'A GitHub star, if you feel like it',
    ],
  },
]

/* --- Landing: testimonials -------------------------------------------- */

/**
 * `avatar` stays a bare URL here; `app/page.tsx` wraps each one in an
 * `<Avatar imgProps={{ loading: 'lazy' }}>`. These sit well below the fold,
 * and a lazy <img> also stops React from emitting a preload hint that the
 * router would then carry onto other routes.
 */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'I had a working assistant UI in front of our inference endpoint in an afternoon. The bit I had budgeted three days for — code blocks, copy buttons, scroll behaviour — was already done.',
    author: 'Priya Raghavan',
    role: 'Staff Engineer, infra tooling',
    avatar: 'https://i.pravatar.cc/128?img=45',
  },
  {
    id: 't2',
    quote:
      'A chart rendering inside a chat bubble, from the same package as the chat bubble, with no charting dependency. I did not think that was on the menu.',
    author: 'Tom Okafor',
    role: 'Founder, two-person startup',
    avatar: 'https://i.pravatar.cc/128?img=12',
  },
  {
    id: 't3',
    quote:
      'Our audit flagged nine components in the previous stack. This one came back clean — articles per turn, a real table behind every chart, focus you can actually see.',
    author: 'Lena Fischer',
    role: 'Accessibility lead',
    avatar: 'https://i.pravatar.cc/128?img=32',
  },
]

/* --- FAQ (also emitted as FAQPage JSON-LD) ----------------------------- */

/** Plain-text answers, so the JSON-LD and the rendered accordion never drift. */
export const faqs: { question: string; answer: string }[] = [
  {
    question: 'Does this work with any LLM API?',
    answer:
      'Yes. ChatterBox is UI only — there is no model, no SDK and no API key anywhere in it. The components take messages in and render them, so they sit in front of whatever you already run: Anthropic, OpenAI, Mistral, or an open-weights model on your own hardware. Wire ChatInput’s onSubmit to a server action or a route handler and append tokens to the last message as they arrive.',
  },
  {
    question: 'Is it really zero-dependency?',
    answer:
      'Yes. VivekUI declares no runtime dependencies at all — only React as a peer. No Tailwind, no styled-components, no icon package, no charting library, no CLI that copies files into your repository. The whole library is 27 kB gzipped of CSS plus the components you actually import, and most of them render on the server with no client boundary.',
  },
  {
    question: 'Can charts render inside chat messages?',
    answer:
      'Yes, and it is worth seeing. Open the demo and type “show me a chart”: the assistant answers with a real SVG BarChart inside the message bubble. Because a message’s content is a React node rather than a markdown string, any component can live inside a turn — and the chart comes from the same zero-dependency package as the thread around it.',
  },
  {
    question: 'Is it free for commercial use?',
    answer:
      'Yes. Both the template and VivekUI are MIT licensed, with no attribution requirement, no seat limits and nothing to buy. The footer credit is there because it helps the project; you are free to remove it. A star on GitHub is appreciated.',
  },
]

export const faqItems: FaqItem[] = faqs.map((f, i) => ({ id: i, ...f }))

/* --- /built-with: section -> component map ---------------------------- */

export interface BuiltWithRow {
  section: string
  components: string[]
  note: string
}

export const builtWith: BuiltWithRow[] = [
  {
    section: 'Site header',
    components: ['Navbar', 'Badge', 'Button', 'ThemeToggle'],
    note: 'Collapses to a mobile sheet on its own; the theme toggle writes one attribute on <html>.',
  },
  {
    section: 'Hero — the live demo',
    components: ['Hero', 'ChatThread', 'ChatMessage', 'TypingIndicator', 'ChatCodeBlock', 'Avatar'],
    note: 'Not a screenshot. The same components the chat app uses, driven by a scripted loop.',
  },
  {
    section: 'Feature grid',
    components: ['FeatureGrid', 'Section'],
    note: 'Auto-fitting grid that responds to its own width rather than the viewport.',
  },
  {
    section: 'How it works',
    components: ['Stepper', 'ChatCodeBlock', 'CopyButton'],
    note: 'The code block under the stepper is the real source of the hero demo.',
  },
  {
    section: 'By the numbers',
    components: ['LineChart', 'ProgressRing', 'AnimatedCounter', 'Divider'],
    note: 'Pure SVG, server-rendered, with a hidden data table behind every chart.',
  },
  {
    section: 'Pricing',
    components: ['Pricing', 'Button', 'Badge'],
    note: 'Two plans, both free — the second one is there to show the layout.',
  },
  {
    section: 'Testimonials',
    components: ['Testimonials', 'Avatar'],
    note: 'Avatars fall back to initials when the image fails to load.',
  },
  {
    section: 'FAQ',
    components: ['FAQ', 'Accordion'],
    note: 'The same four answers are emitted as FAQPage JSON-LD, from one array.',
  },
  {
    section: 'Closing call to action',
    components: ['CTA', 'Button'],
    note: 'The primary variant re-points the palette for the whole block.',
  },
  {
    section: 'Footer, every page',
    components: ['Footer', 'Code', 'CopyButton'],
    note: 'Install command with a copy button whose success is announced once.',
  },
  {
    section: 'Chat app — shell',
    components: ['Sidebar', 'Input', 'Button', 'RelativeTime', 'EmptyState'],
    note: 'Conversation rows are Sidebar.Item rendered asChild over real buttons.',
  },
  {
    section: 'Chat app — transcript',
    components: ['ChatThread', 'ChatMessage', 'TypingIndicator', 'ChatCodeBlock', 'BarChart'],
    note: 'The BarChart renders inside a ChatMessage bubble. Type “show me a chart”.',
  },
  {
    section: 'Chat app — composer',
    components: ['ChatInput', 'IconButton', 'Tooltip', 'Toast', 'Kbd'],
    note: 'Enter sends, Shift+Enter adds a newline, and IME composition never submits.',
  },
  {
    section: 'This page',
    components: ['Table', 'Breadcrumb', 'Heading', 'Text', 'Stack', 'Container'],
    note: 'Every component name in the table deep-links to its own docs page.',
  },
]
