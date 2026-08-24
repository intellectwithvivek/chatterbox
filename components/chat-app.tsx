'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  ChatInput,
  ChatThread,
  EmptyState,
  IconButton,
  Input,
  Kbd,
  RelativeTime,
  Sidebar,
  Text,
  ThemeToggle,
  Tooltip,
  useToast,
  type ChatThreadMessage,
} from '@the_viveksingh/vivek-ui'

import { ReplyBlocks } from '@/components/reply-blocks'
import { useHydrated } from '@/lib/client-env'
import { SSR_ANCHOR, conversations, type SeedTurn } from '@/data/conversations'
import { matchReply, type ReplyBlock } from '@/data/replies'

/** How long the dots run before a reply lands. */
const TYPING_MS = 1200

const SUGGESTIONS = [
  { text: 'show me code', hot: false },
  { text: 'show me a chart', hot: true },
  { text: 'what UI library is this?', hot: false },
] as const

/** Locale-pinned, so a bubble's time never differs between renders. */
const clock = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
})

interface Msg {
  id: string
  role: 'user' | 'assistant'
  /** User turns carry text; assistant turns carry blocks. */
  text?: string
  blocks?: ReplyBlock[]
  time?: string
}

const AVATARS = {
  user: <Avatar name="You" size="sm" fallback="Y" />,
  assistant: <Avatar name="ChatterBox" size="sm" fallback="CB" />,
} as const

/** Seed turns are deterministic, so they are safe to render on the server. */
function seedToMessages(seed: SeedTurn[], conversationId: string): Msg[] {
  return seed.map((turn, i) => ({
    id: `${conversationId}-${i}`,
    role: turn.role,
    text: turn.text,
    blocks: turn.blocks,
  }))
}

export function ChatApp() {
  const { toast } = useToast()

  const [activeId, setActiveId] = useState('new')
  const [messages, setMessages] = useState<Msg[]>([])
  const [pending, setPending] = useState(false)
  const [query, setQuery] = useState('')

  /**
   * The sidebar's relative timestamps are offsets from an anchor. The server
   * render and the hydration render both use the fixed SSR anchor so the
   * markup matches; afterwards the real clock takes over, so a fork of this
   * template never shows conversations dated to the month it was published.
   */
  const hydrated = useHydrated()
  const [clientAnchor] = useState(() => Date.now())
  const anchor = hydrated ? clientAnchor : SSR_ANCHOR

  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const recent = useMemo(() => {
    const list = conversations.filter((c) => c.id !== 'new')
    const needle = query.trim().toLowerCase()
    if (!needle) return list
    return list.filter((c) => c.title.toLowerCase().includes(needle))
  }, [query])

  const openConversation = useCallback((id: string) => {
    window.clearTimeout(timer.current)
    setPending(false)
    setActiveId(id)
    const conversation = conversations.find((c) => c.id === id)
    setMessages(conversation ? seedToMessages(conversation.seed, id) : [])
  }, [])

  const send = useCallback(
    (value: string) => {
      const text = value.trim()
      if (!text) return

      const now = clock.format(new Date())
      setMessages((prev) => [
        ...prev,
        { id: `u-${crypto.randomUUID()}`, role: 'user', text, time: now },
      ])
      setPending(true)

      const reply = matchReply(text)
      timer.current = window.setTimeout(() => {
        setPending(false)
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${crypto.randomUUID()}`,
            role: 'assistant',
            blocks: reply.blocks,
            time: clock.format(new Date()),
          },
        ])
      }, TYPING_MS)
    },
    [],
  )

  const onCopy = useCallback(() => {
    toast({
      title: 'Copied to clipboard',
      description: 'Paste it straight into your project.',
      tone: 'success',
    })
  }, [toast])

  const thread: ChatThreadMessage[] = useMemo(
    () =>
      messages.map((message) => ({
        id: message.id,
        role: message.role,
        name: message.role === 'user' ? 'You' : 'ChatterBox',
        avatar: AVATARS[message.role],
        timestamp: message.time,
        content: message.blocks ? (
          <ReplyBlocks blocks={message.blocks} onCopy={onCopy} />
        ) : (
          message.text
        ),
      })),
    [messages, onCopy],
  )

  const activeTitle =
    conversations.find((c) => c.id === activeId)?.title ?? 'New chat'

  return (
    <div className="chat-shell">
      <Sidebar
        className="chat-shell__side"
        label="Conversations"
        collapsible={false}
        width="100%"
      >
        <div className="side-pad">
          <Button fullWidth onClick={() => openConversation('new')}>
            + New chat
          </Button>
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search conversations"
            aria-label="Search conversations"
            size="sm"
          />
        </div>

        <Sidebar.Section title={query ? `Results (${recent.length})` : 'Recent'}>
          {recent.map((conversation) => (
            <Sidebar.Item
              key={conversation.id}
              asChild
              active={conversation.id === activeId}
              icon={<span aria-hidden="true">◈</span>}
            >
              {/* Title and timestamp stack, rather than the timestamp riding
                  in the badge slot and squeezing every title to an ellipsis. */}
              <button
                type="button"
                className="convo"
                onClick={() => openConversation(conversation.id)}
              >
                <span className="convo__title">{conversation.title}</span>
                <RelativeTime
                  className="convo__meta"
                  date={anchor - conversation.offsetMinutes * 60_000}
                  locale="en-US"
                  timeZone="UTC"
                />
              </button>
            </Sidebar.Item>
          ))}
        </Sidebar.Section>

        {recent.length === 0 && (
          <Text size="sm" tone="muted" style={{ padding: '0 0.875rem' }}>
            No conversation matches “{query}”.
          </Text>
        )}
      </Sidebar>

      <div className="chat-shell__main">
        <header className="chat-shell__head">
          <div style={{ minInlineSize: 0 }}>
            <Text weight="semibold" truncate>
              {activeTitle}
            </Text>
            <Text size="sm" tone="muted">
              Mock assistant · replies matched locally
            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Badge variant="soft" tone="success" size="sm" pill>
              No API key
            </Badge>
            <ThemeToggle mode="toggle" variant="ghost" size="sm" />
          </div>
        </header>

        <div className="chat-shell__body">
          <ChatThread
            messages={thread}
            loading={pending}
            loadingLabel="ChatterBox is typing"
            label={`Conversation: ${activeTitle}`}
            emptyState={
              <EmptyState
                icon={<span aria-hidden="true">◈</span>}
                title="Ask ChatterBox anything"
                description="Nothing you type leaves the browser — every reply is keyword-matched from a local file. Try “show me a chart” to see an SVG chart render inside a message bubble."
                actions={
                  <Button size="sm" onClick={() => send('show me a chart')}>
                    Show me a chart
                  </Button>
                }
              />
            }
          />
        </div>

        <div className="chat-shell__foot">
          <ChatInput
            onSubmit={send}
            busy={pending}
            placeholder="Ask anything…"
            label="Message ChatterBox"
            maxRows={6}
            hint={
              <>
                <Kbd size="sm">Enter</Kbd> to send · <Kbd size="sm">Shift</Kbd>+
                <Kbd size="sm">Enter</Kbd> for a new line
              </>
            }
            /* ChatInput's `attachments` slot renders above the box, so the
               attach control and the suggestion chips share one row there
               instead of stacking into two thin strips. */
            attachments={
              <>
                <Tooltip content="Attachments are not part of this demo">
                  <IconButton
                    className="soft-disabled"
                    aria-label="Attach a file (disabled in this demo)"
                    aria-disabled="true"
                    variant="outline"
                    size="sm"
                    onClick={(event) => event.preventDefault()}
                  >
                    <span aria-hidden="true">＋</span>
                  </IconButton>
                </Tooltip>

                <span className="chips" role="group" aria-label="Suggested prompts">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion.text}
                      type="button"
                      className={suggestion.hot ? 'chip chip--hot' : 'chip'}
                      disabled={pending}
                      onClick={() => send(suggestion.text)}
                    >
                      {suggestion.hot && <span aria-hidden="true">⚡</span>}
                      {suggestion.text}
                    </button>
                  ))}
                </span>
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}
