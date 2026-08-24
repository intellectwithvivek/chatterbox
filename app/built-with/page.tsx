import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Badge,
  Breadcrumb,
  Button,
  Heading,
  Section,
  Stack,
  Table,
  Text,
} from '@the_viveksingh/vivek-ui'

import { CloneBlock } from '@/components/clone-block'
import { InstallCommand } from '@/components/install-command'
import { JsonLd } from '@/components/json-ld'
import { builtWith } from '@/data/content'
import { breadcrumbSchema } from '@/lib/schema'
import { componentDocs, ogImage, site, utm, vivekui } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Built with VivekUI',
  description:
    'Every section of ChatterBox mapped to the VivekUI component that renders it — chat thread, typing indicator, code blocks and the in-chat charts, all from one zero-dependency package.',
  alternates: { canonical: '/built-with' },
  openGraph: {
    title: 'Built with VivekUI — ChatterBox',
    description:
      'Every section of this site mapped to the VivekUI component that renders it.',
    url: '/built-with',
    images: [ogImage],
  },
  twitter: { card: 'summary_large_image', images: [ogImage] },
}

/** Distinct component names, for the count in the intro. */
const uniqueComponents = Array.from(
  new Set(builtWith.flatMap((row) => row.components)),
).sort()

export default function BuiltWithPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Built with VivekUI', path: '/built-with' },
        ])}
      />

      <Section size="lg" padding="lg">
        <Stack gap={6}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Built with VivekUI' },
            ]}
          />

          <Stack gap={4}>
            <Heading level={1} size="2xl">
              Built with VivekUI
            </Heading>
            <Text size="lg">
              This entire website is built with VivekUI, a free React component library with
              zero runtime dependencies.
            </Text>
            <Text tone="muted">
              No Tailwind, no shadcn, no MUI, no chat SDK and no charting library. Every
              element on every page — the navbar, the live hero conversation, the working chat
              app, the pricing table, the charts — comes from{' '}
              <code>{vivekui.pkg}</code>. That is{' '}
              <strong>{uniqueComponents.length} distinct components</strong> across{' '}
              {builtWith.length} sections, from one install.
            </Text>
            <InstallCommand size="md" />
          </Stack>

          <Stack gap={3}>
            <Badge variant="soft" tone="primary" pill>
              The part worth noticing
            </Badge>
            <Text size="lg">
              The chat thread, typing indicator, code blocks <strong>and</strong> the in-chat
              charts all come from one zero-dependency package.
            </Text>
            <Text tone="muted" className="lede">
              Most libraries make you bolt a chart package onto a chat package onto a code
              highlighter. Here a <code>BarChart</code> is simply another child of a{' '}
              <code>ChatMessage</code>, because a message&rsquo;s content is a React node
              rather than a markdown string.
            </Text>
          </Stack>
        </Stack>
      </Section>

      <Section size="lg" padding="md" background="muted">
        <Stack gap={4}>
          <Heading level={2} size="lg">
            Section by section
          </Heading>
          <Text tone="muted">
            Every component name links to its own documentation page.
          </Text>

          <Table striped hoverable size="sm" containerProps={{ className: 'wide-scroll' }}>
            <Table.Caption visuallyHidden>
              ChatterBox sections mapped to the VivekUI components that render them
            </Table.Caption>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell scope="col">Section</Table.HeaderCell>
                <Table.HeaderCell scope="col">Components</Table.HeaderCell>
                <Table.HeaderCell scope="col">Notes</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {builtWith.map((row) => (
                <Table.Row key={row.section}>
                  <Table.HeaderCell scope="row">{row.section}</Table.HeaderCell>
                  <Table.Cell>
                    <span
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.375rem 0.5rem',
                      }}
                    >
                      {row.components.map((name) => (
                        <a
                          key={name}
                          className="comp-link"
                          href={componentDocs(name)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <code>{name}</code>
                        </a>
                      ))}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="sm" tone="muted">
                      {row.note}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Stack>
      </Section>

      <Section size="lg" padding="lg">
        <Stack gap={6}>
          <Stack gap={2}>
            <span className="eyebrow">Take it</span>
            <Heading level={2} size="xl">
              Use this as your starting point
            </Heading>
            <Text tone="muted" className="lede">
              MIT licensed. Clone it, rename it, delete the sections you do not want, and
              point <code>onSubmit</code> at your own endpoint.
            </Text>
          </Stack>

          <Stack direction="horizontal" gap={3} wrap>
            <Button asChild size="lg">
              <a href={utm(vivekui.docs, 'builtwith')} target="_blank" rel="noopener noreferrer">
                Read the Docs
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={vivekui.github} target="_blank" rel="noopener noreferrer">
                Star on GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={site.templateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Use this template
              </a>
            </Button>
          </Stack>

          <CloneBlock heading="Clone this template" />

          <Text size="sm" tone="muted">
            Template repository: <code>{site.repoSlug}</code> · Library:{' '}
            <a href={vivekui.npm} target="_blank" rel="noopener noreferrer">
              {vivekui.pkg} on npm
            </a>{' '}
            · Author:{' '}
            <a
              href={utm(vivekui.author, 'builtwith')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {vivekui.authorName}
            </a>
          </Text>

          <Text size="sm" tone="muted">
            Prefer to browse the running components instead? <Link href="/chat">Open the chat demo</Link>.
          </Text>
        </Stack>
      </Section>
    </>
  )
}
