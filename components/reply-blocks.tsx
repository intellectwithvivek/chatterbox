import type { ReactNode } from 'react'
import { ChatCodeBlock, Code, Text } from '@the_viveksingh/vivek-ui'
import { BarChart } from '@the_viveksingh/vivek-ui/charts'

import type { ReplyBlock } from '@/data/replies'

/**
 * Inline formatting for canned copy: `code` spans and **bold** runs.
 *
 * This is a string split into React elements, not a markdown parser and not
 * HTML — there is nothing here that could turn model output into markup.
 */
function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <Code key={i} size="sm">
          {part.slice(1, -1)}
        </Code>
      )
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

/** Locale-pinned so the server and the client format identically. */
const count = (n: number) => n.toLocaleString('en-US')

export interface ReplyBlocksProps {
  blocks: ReplyBlock[]
  /** Fired after a code block is copied — used to raise a Toast in /chat. */
  onCopy?: (code: string) => void
}

/**
 * Renders one assistant turn's blocks.
 *
 * A `ChatMessage`'s content is a `ReactNode`, which is what makes the chart
 * case possible: a real SVG chart is just another child of the bubble.
 */
export function ReplyBlocks({ blocks, onCopy }: ReplyBlocksProps) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'text':
            return <Text key={i}>{inline(block.text)}</Text>

          case 'list':
            return (
              <ul className="msg-list" key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{inline(item)}</li>
                ))}
              </ul>
            )

          case 'code':
            return (
              <ChatCodeBlock
                key={i}
                code={block.code}
                language={block.language}
                filename={block.filename}
                onCopy={onCopy}
                style={{ marginBlockStart: '0.625rem' }}
              />
            )

          case 'chart':
            return (
              <figure className="in-chat-chart" key={i}>
                <BarChart
                  data={block.data}
                  title={block.chartTitle}
                  description={block.description}
                  xLabel={block.xLabel}
                  yLabel={block.yLabel}
                  height={200}
                  barRadius={4}
                  categoryPadding={0.35}
                  showValues
                  formatValue={count}
                />
                <figcaption className="in-chat-chart__cap">{block.caption}</figcaption>
              </figure>
            )

          case 'link':
            return (
              <Text key={i} style={{ marginBlockStart: '0.5rem' }}>
                <a href={block.href} target="_blank" rel="noopener noreferrer">
                  {block.label}
                </a>
              </Text>
            )
        }
      })}
    </>
  )
}
