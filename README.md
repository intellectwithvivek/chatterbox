<div align="center">

<img src="./public/icon-readme.svg" alt="" width="72" height="72">

# ChatterBox

### A free, open-source AI chatbot UI template for React &amp; Next.js

Built entirely with **[VivekUI](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=aichat&utm_medium=readme)** — 91 React components, 6 SVG charts, **zero runtime dependencies**.

[![Live site](https://img.shields.io/badge/live-chatterbox.vivekkumarsingh.in-10b981?style=flat-square)](https://chatterbox.vivekkumarsingh.in)
[![MIT License](https://img.shields.io/badge/license-MIT-10b981?style=flat-square)](./LICENSE)
[![VivekUI](https://img.shields.io/npm/v/@the_viveksingh/vivek-ui?label=VivekUI&color=10b981&style=flat-square)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
[![Runtime deps](https://img.shields.io/badge/runtime%20deps-0-10b981?style=flat-square)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
<br>
[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-087ea4?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Stars](https://img.shields.io/github/stars/intellectwithvivek/chatterbox?style=flat-square&color=10b981)](https://github.com/intellectwithvivek/chatterbox/stargazers)

**[🌐 Live site](https://chatterbox.vivekkumarsingh.in)** · **[💬 Chat demo](https://chatterbox.vivekkumarsingh.in/chat)** · **[🧩 Every component used](https://chatterbox.vivekkumarsingh.in/built-with)** · **[📚 VivekUI docs](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=aichat&utm_medium=readme)**

</div>

---

## Clone it

```bash
git clone https://github.com/intellectwithvivek/chatterbox.git
cd chatterbox
npm install
npm run dev
```

Open <http://localhost:3000>. There is **nothing else to configure** — no environment
variables, no API keys, no database.

Prefer a fresh repository with no history?
**[Use this template ↗](https://github.com/intellectwithvivek/chatterbox/generate)**

---

![ChatterBox landing page: the headline "Ship a chat UI before lunch" beside a live chat panel answering with a code block](./public/screenshot.png)

<div align="center"><sub>The panel on the right is <b>not an image</b> in the app — that is <code>ChatThread</code> running. The screenshot above is a capture of it mid-loop.</sub></div>

---

## Why this template exists

I built [**VivekUI**](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=aichat&utm_medium=readme),
a free React component library with zero runtime dependencies. ChatterBox is the
showcase for its **AI chat component family** — `ChatThread`, `ChatMessage`, `ChatInput`,
`TypingIndicator`, `ChatCodeBlock` — which almost no free UI library ships.

It is released as a **public, MIT-licensed template** so you can clone it, rename it, and
ship your own assistant UI. There is no paid tier and nothing held back.

The part worth seeing:

> **The chat thread, typing indicator, code blocks _and_ the in-chat charts all come from
> one zero-dependency package.**

Open [the demo](https://chatterbox.vivekkumarsingh.in/chat) and type **"show me a chart"** —
the assistant answers with a real SVG `BarChart` rendered *inside the message bubble*. No
canvas, no d3, no second package.

## What you get

| | |
|---|---|
| 🎬 **A live hero, not a screenshot** | A real `ChatThread` plays a scripted conversation on a timed loop, with a `TypingIndicator` between turns and a working `ChatCodeBlock` answer. It has a pause control, and `prefers-reduced-motion` gets the finished transcript with no timers ever scheduled. |
| 💬 **A working chat app** | `/chat` — conversation sidebar with relative timestamps and search, suggestion chips, `EmptyState`, Enter-to-send, and copy-to-clipboard with a `Toast`. |
| 📊 **Charts inside chat bubbles** | A `ChatMessage`'s content is a React node, not a markdown string, so a chart is simply another child of the bubble. |
| 🔌 **No model, no API key, no network** | Replies are keyword-matched from [`data/replies.ts`](./data/replies.ts). Nothing a visitor types leaves the browser. |
| 🌗 **Dark by default** | Emerald accent, theming through CSS custom properties, and a pre-paint script so the first frame is never the wrong theme. Dark mode survives JavaScript being switched off. |
| 🔍 **SEO + AEO wired up** | Metadata API per route, `sitemap.ts`, `robots.ts`, `manifest.ts`, `llms.txt`, and `WebSite` / `SoftwareApplication`+`Offer` / `HowTo` / `FAQPage` / `BreadcrumbList` JSON-LD. |
| ♿ **Accessible** | One `h1` per page, WCAG AA contrast in both themes, visible focus, skip link, reduced-motion support, and zero console errors or warnings. |
| 📱 **Responsive end to end** | Verified from 320px to 1920px with no horizontal overflow, including the chat shell. |

## Stack

| | |
|---|---|
| Framework | Next.js 16.3 — App Router, Turbopack |
| UI | `@the_viveksingh/vivek-ui` 0.5.x — **the only UI dependency** |
| Language | TypeScript 5 · React 19 |
| Runtime | Node.js 20.9+ (22 LTS recommended) |
| Styling | Plain CSS custom properties. No Tailwind, no CSS-in-JS, no config file. |

Adding VivekUI to a project of your own is two lines:

```bash
npm i @the_viveksingh/vivek-ui
```

```tsx
// app/layout.tsx
import '@the_viveksingh/vivek-ui/styles.css'
import '@the_viveksingh/vivek-ui/charts.css'  // only if you use charts
```

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fintellectwithvivek%2Fchatterbox&project-name=chatterbox&repository-name=chatterbox)

Every route prerenders as static content, so it runs on any host that serves a Next.js
build. No environment variables are required.

After deploying to your own domain, change **one** value:

```ts
// lib/site.ts
export const site = {
  url: 'https://your-domain.com',   // ← metadataBase, canonicals, sitemap, JSON-LD
  ...
}
```

## Wiring it to a real model

The components never touch the network, which is the whole point — they sit in front of
whatever you already run. Replace the keyword matcher with a call of your own:

```tsx
// components/chat-app.tsx — replace matchReply(text) with:
const res = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message: text }),
})
const { reply } = await res.json()
```

Append tokens to the last message as they arrive and `ChatThread` renders the stream. Any
provider works — Anthropic, OpenAI, Mistral, or an open-weights model on your own
hardware.

## Project layout

```
app/
  layout.tsx            root layout: ThemeProvider, ToastProvider, navbar, footer
  page.tsx              landing page
  chat/page.tsx         the mock chat app
  built-with/page.tsx   component attribution table
  opengraph-image.tsx   1200×630 OG card, generated at build time
  apple-icon.tsx        180px iOS icon, generated at build time
  icon.svg              favicon
  sitemap.ts            SEO routes
  robots.ts
  manifest.ts
  globals.css           emerald accent + site identity
components/
  hero-demo.tsx         the auto-playing hero conversation
  chat-app.tsx          the /chat shell
  reply-blocks.tsx      maps a reply block to a component (incl. the in-chat chart)
  clone-block.tsx       the "git clone" affordance used in the header, footer and pages
  site-navbar.tsx       header: nav, clone button, repo link, theme toggle
  site-footer.tsx       footer: install + clone commands, every promotion link
  icons.tsx             hand-written SVG marks (no icon package)
data/
  replies.ts            canned replies, keyword-matched
  conversations.ts      mock sidebar conversations
  content.ts            landing copy, chart data, /built-with map
lib/
  site.ts               URLs, repo, clone command, UTM helper
  schema.ts             JSON-LD builders
  theme-script.ts       the pre-paint theme snippet
  client-env.ts         reduced-motion + hydration hooks
public/llms.txt         AEO
```

## Customising

| Want to change | Edit |
|---|---|
| Site URL, repo, clone command | [`lib/site.ts`](./lib/site.ts) |
| Accent colour | `--vk-color-primary` in [`app/globals.css`](./app/globals.css) |
| What the bot says | [`data/replies.ts`](./data/replies.ts) |
| Sidebar conversations | [`data/conversations.ts`](./data/conversations.ts) |
| Landing copy, charts, pricing, FAQ | [`data/content.ts`](./data/content.ts) |
| Structured data | [`lib/schema.ts`](./lib/schema.ts) |
| Default theme | `defaultTheme` in `app/layout.tsx` **and** `DEFAULT_THEME` in `lib/theme-script.ts` |

## Scripts

```bash
npm run dev      # Turbopack dev server
npm run build    # production build + type check
npm start        # serve the production build
npm run lint     # ESLint
```

## VivekUI components used

**39 components, one package.** Every one of them is deep-linked to its documentation on
[the /built-with page](https://chatterbox.vivekkumarsingh.in/built-with).

<table>
<tr><td><b>Chat family</b></td><td><code>ChatThread</code> <code>ChatMessage</code> <code>ChatInput</code> <code>TypingIndicator</code> <code>ChatCodeBlock</code></td></tr>
<tr><td><b>Charts</b></td><td><code>BarChart</code> (in-bubble) <code>LineChart</code> <code>ProgressRing</code></td></tr>
<tr><td><b>Page sections</b></td><td><code>Hero</code> <code>FeatureGrid</code> <code>Pricing</code> <code>Testimonials</code> <code>FAQ</code> <code>CTA</code> <code>Footer</code> <code>Section</code></td></tr>
<tr><td><b>Layout</b></td><td><code>Container</code> <code>Stack</code> <code>Divider</code> <code>Heading</code> <code>Text</code></td></tr>
<tr><td><b>Navigation</b></td><td><code>Navbar</code> <code>Sidebar</code> <code>Breadcrumb</code> <code>Stepper</code></td></tr>
<tr><td><b>Controls</b></td><td><code>Button</code> <code>IconButton</code> <code>Input</code> <code>CopyButton</code> <code>ThemeToggle</code> <code>Tooltip</code> <code>Kbd</code></td></tr>
<tr><td><b>Display</b></td><td><code>Badge</code> <code>Avatar</code> <code>Code</code> <code>Table</code> <code>EmptyState</code> <code>RelativeTime</code> <code>AnimatedCounter</code></td></tr>
<tr><td><b>Providers</b></td><td><code>ThemeProvider</code> <code>ToastProvider</code> <code>useToast</code></td></tr>
</table>

Plus `Accordion` (rendered by `FAQ`) and `Toast` (rendered by `ToastProvider`).

## Contributing

Issues and pull requests are welcome — [open an issue](https://github.com/intellectwithvivek/chatterbox/issues).
If you ship something with this template, I would genuinely like to see it.

## Powered by VivekUI

**[VivekUI](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=aichat&utm_medium=readme)** — 91 React components · 6 SVG charts · zero runtime dependencies.
One install, one CSS import, no config.

- 📚 [Documentation](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=aichat&utm_medium=readme)
- 🧩 [Component reference](https://ui.vivekkumarsingh.in/docs/components?utm_source=vivekui-template&utm_campaign=aichat&utm_medium=readme)
- 📦 [npm](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
- ⭐ [GitHub](https://github.com/intellectwithvivek/vivek_UI)
- 👤 [Vivek Kumar Singh](https://vivekkumarsingh.in/?utm_source=vivekui-template&utm_campaign=aichat&utm_medium=readme)

## License

[MIT](./LICENSE) — free for commercial use, no attribution required.

The "Built with VivekUI" credit in the footer is **removable**; it is there because it
helps the project. A ⭐ on [the library](https://github.com/intellectwithvivek/vivek_UI)
is genuinely appreciated.

<div align="center"><sub>Built by <a href="https://vivekkumarsingh.in/?utm_source=vivekui-template&utm_campaign=aichat&utm_medium=readme">Vivek Kumar Singh</a></sub></div>
