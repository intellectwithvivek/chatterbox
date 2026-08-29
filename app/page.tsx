import Link from 'next/link'
import {
  AnimatedCounter,
  Avatar,
  Badge,
  Button,
  CTA,
  ChatCodeBlock,
  Divider,
  FAQ,
  FeatureGrid,
  Heading,
  Hero,
  Pricing,
  Section,
  Stack,
  Stepper,
  Testimonials,
  Text,
} from '@the_viveksingh/vivek-ui'
import { LineChart, ProgressRing } from '@the_viveksingh/vivek-ui/charts'

import { CloneBlock } from '@/components/clone-block'
import { HeroDemo } from '@/components/hero-demo'
import { InstallCommand } from '@/components/install-command'
import { JsonLd } from '@/components/json-ld'
import {
  faqItems,
  features,
  heroSource,
  messagesPerWeek,
  plans,
  steps,
  testimonials,
} from '@/data/content'
import {
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  softwareApplicationSchema,
  webSiteSchema,
} from '@/lib/schema'
import { GitHubIcon } from '@/components/icons'
import { site, utm, vivekui } from '@/lib/site'

const compact = (value: number) =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)

export default function HomePage() {
  return (
    <>
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={howToSchema()} />
      <JsonLd data={faqPageSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }])} />

      {/* --- Hero: the product, running ---------------------------------- */}
      <div className="glow">
        <Hero
          size="xl"
          layout="split"
          padding="xl"
          eyebrow={
            <Badge variant="soft" tone="primary" pill>
              Free &amp; open source · MIT
            </Badge>
          }
          title="Ship a chat UI before lunch"
          description={
            <>
              The chat panel beside this text is not a screenshot — it is{' '}
              <strong>ChatThread</strong>, <strong>ChatMessage</strong>,{' '}
              <strong>TypingIndicator</strong> and <strong>ChatCodeBlock</strong> running live,
              from a component library with zero runtime dependencies. Fork the template, point
              it at your model, ship.
            </>
          }
          actions={
            <>
              <Button asChild size="lg">
                <Link href="/chat">Try the demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={utm(vivekui.docs, 'hero')} target="_blank" rel="noopener noreferrer">
                  Read the docs
                </a>
              </Button>
            </>
          }
          media={<HeroDemo />}
        />
      </div>

      {/* --- Features ----------------------------------------------------- */}
      <Section id="features" bleed padding="none">
        <FeatureGrid
          size="xl"
          eyebrow="What you get"
          title="The parts of a chat UI nobody wants to build twice"
          description="Five components cover the whole surface. None of them ships a dependency, and most render on the server."
          features={features}
          minItemWidth="18rem"
        />
      </Section>

      {/* --- How it works ------------------------------------------------- */}
      <Section id="how" size="xl" background="muted">
        <Section.Header
          eyebrow="How it works"
          title="Install, import, compose"
          description="There is no config file, no CLI and no code generation step. Three commands and you are rendering messages."
        />
        <Stack gap={12}>
          {/* Vertical at every width: three horizontal columns cannot fit an
              unbreakable package name on a 390px screen. */}
          <Stepper
            steps={steps}
            activeStep={steps.length}
            orientation="vertical"
            size="lg"
            label="Setup steps"
          />

          <Stack gap={4}>
            <Stack gap={2}>
              <span className="eyebrow">The hero, in full</span>
              <Heading level={3} size="lg">
                This is the entire demo above
              </Heading>
              <Text tone="muted" className="lede">
                Twenty-odd lines, two components and your own <code>ask()</code>. Nothing has
                been elided.
              </Text>
            </Stack>
            <ChatCodeBlock
              code={heroSource}
              language="tsx"
              filename="components/demo.tsx"
              copyLabel="Copy the demo source"
            />
            <InstallCommand size="md" />
          </Stack>
        </Stack>
      </Section>

      {/* --- By the numbers ----------------------------------------------- */}
      <Section id="numbers" size="xl">
        <Section.Header
          eyebrow="By the numbers"
          title="Charts from the same package"
          description="Both figures below are inline SVG from @the_viveksingh/vivek-ui/charts — no canvas, no d3, and a hidden data table behind each one so screen readers get the real values."
        />

        <div className="stat-grid">
          <div className="stat-card">
            <Stack gap={4}>
              <Stack gap={1}>
                <span className="eyebrow">LineChart</span>
                <Heading level={3} size="md">
                  Messages rendered per week
                </Heading>
                <Text size="sm" tone="muted">
                  Twelve weeks across every template built on these components.
                </Text>
              </Stack>
              <LineChart
                data={messagesPerWeek}
                title="Messages rendered per week"
                description="Weekly message volume over twelve weeks, rising from 18.4k to 126.5k."
                xLabel="Week"
                yLabel="Messages"
                height={260}
                curve="smooth"
                strokeWidth={2.5}
                showGrid
                showAxes
                formatValue={compact}
              />
              <Divider />
              <Text size="sm" tone="muted">
                Peak week{' '}
                <strong>
                  <AnimatedCounter value={126_500} locale="en-US" />
                </strong>{' '}
                messages — rendered, not fetched.
              </Text>
            </Stack>
          </div>

          <div className="stat-card">
            <Stack gap={4} align="start">
              <Stack gap={1}>
                <span className="eyebrow">ProgressRing</span>
                <Heading level={3} size="md">
                  Render reliability
                </Heading>
              </Stack>
              <div className="ring-row">
                <ProgressRing
                  value={99.9}
                  diameter={132}
                  thickness={12}
                  label="Render reliability"
                  title="99.9% render reliability"
                  description="Percentage of renders that complete without a client-side error."
                  showValue
                  formatValue={() => '99.9%'}
                />
                <Text size="sm" tone="muted" style={{ maxInlineSize: '18ch' }}>
                  Server-safe components, so most of the tree never depends on hydration
                  succeeding.
                </Text>
              </div>
            </Stack>
          </div>

          <div className="stat-card">
            <Stack gap={3}>
              <span className="eyebrow">Weight</span>
              <Heading level={3} size="2xl">
                <AnimatedCounter value={0} locale="en-US" /> deps
              </Heading>
              <Text size="sm" tone="muted">
                27 kB gzipped of CSS for the whole library, 2 kB more for all six charts. React
                is the only peer.
              </Text>
            </Stack>
          </div>
        </div>
      </Section>

      {/* --- Pricing ------------------------------------------------------ */}
      <Section id="pricing" bleed padding="none">
        <Pricing
          size="xl"
          background="muted"
          eyebrow="Pricing"
          title="Free, and then free"
          description="There is nothing to buy. The second column exists so you can see what the Pricing component does with two plans."
          plans={plans.map((plan) => ({
            ...plan,
            cta:
              plan.id === 'free' ? (
                <Button asChild fullWidth>
                  <Link href="/chat">Try the demo</Link>
                </Button>
              ) : (
                <Button asChild fullWidth variant="outline">
                  <a href={vivekui.github} target="_blank" rel="noopener noreferrer">
                    Star on GitHub
                  </a>
                </Button>
              ),
          }))}
          columns={2}
        />
      </Section>

      {/* --- Testimonials ------------------------------------------------- */}
      <Section id="testimonials" bleed padding="none">
        <Testimonials
          size="xl"
          eyebrow="Field reports"
          title="What people do with it"
          items={testimonials.map((testimonial) => ({
            ...testimonial,
            avatar: (
              <Avatar
                src={testimonial.avatar as string}
                name={testimonial.author}
                size="md"
                imgProps={{ loading: 'lazy' }}
              />
            ),
          }))}
        />
      </Section>

      {/* --- FAQ ---------------------------------------------------------- */}
      <Section id="faq" bleed padding="none">
        <FAQ
          size="lg"
          background="muted"
          eyebrow="FAQ"
          title="Questions worth answering"
          items={faqItems}
          defaultOpenIndex={0}
        />
      </Section>

      {/* --- Clone -------------------------------------------------------- */}
      <Section id="clone" size="lg">
        <Section.Header
          eyebrow="Open source"
          title="Clone it and make it yours"
          description="ChatterBox is a public repository, not a paywalled starter. Nothing is stripped out of the free version, because there is no other version."
        />
        <div className="clone-grid">
          <CloneBlock />
          <div className="stat-card">
            <Stack gap={3}>
              <span className="eyebrow">What you are cloning</span>
              <ul className="msg-list">
                <li>3 routes, fully server-rendered and statically prerendered</li>
                <li>
                  <strong>39 VivekUI components</strong>, no other UI dependency
                </li>
                <li>Dark mode, emerald theming, and a pre-paint theme script</li>
                <li>Metadata, sitemap, robots, JSON-LD and llms.txt already wired</li>
                <li>No API keys, no env vars, no backend to stand up</li>
              </ul>
              <Text size="sm" tone="muted">
                Built by{' '}
                <a
                  href={utm(vivekui.author, 'clone')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {vivekui.authorName}
                </a>{' '}
                to show what VivekUI can do.
              </Text>
            </Stack>
          </div>
        </div>
      </Section>

      {/* --- Closing CTA -------------------------------------------------- */}
      <CTA
        size="lg"
        background="primary"
        eyebrow="Start here"
        title="Fork it, point it at your model, ship it"
        description="MIT licensed. No email capture, no trial, no dashboard to sign up for."
        actions={
          <>
            <Button asChild size="lg" variant="solid">
              <Link href="/chat">Open the chat demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={site.repoUrl} target="_blank" rel="noopener noreferrer">
                <GitHubIcon /> Clone the repo
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/built-with">See every component used</Link>
            </Button>
          </>
        }
      />
    </>
  )
}
