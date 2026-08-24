'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Badge,
  Button,
  CopyButton,
  Navbar,
  ThemeToggle,
  Tooltip,
} from '@the_viveksingh/vivek-ui'

import { Brand } from '@/components/brand'
import { GitHubIcon, TerminalIcon } from '@/components/icons'
import { site, utm, vivekui } from '@/lib/site'

const links = [
  { href: '/#features', label: 'Features' },
  { href: '/#how', label: 'How it works' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/chat', label: 'Chat demo' },
  { href: '/built-with', label: 'Built with' },
]

export function SiteNavbar() {
  const pathname = usePathname()

  return (
    <Navbar sticky container="xl" aria-label="Main">
      <Navbar.Brand asChild>
        <Link href="/">
          <Brand />
        </Link>
      </Navbar.Brand>

      <Navbar.Links>
        {links.map((link) => (
          <Navbar.Link key={link.href} asChild active={pathname === link.href}>
            <Link href={link.href}>{link.label}</Link>
          </Navbar.Link>
        ))}

        {/* Repo actions live in Navbar.Actions on desktop; inside the mobile
            sheet these give them a full-width, thumb-sized target. */}
        <Navbar.Link asChild className="sheet-only">
          <a href={site.repoUrl} target="_blank" rel="noopener noreferrer">
            Clone on GitHub ↗
          </a>
        </Navbar.Link>
        <Navbar.Link asChild className="sheet-only">
          <a
            href={utm(vivekui.docs, 'navbar')}
            target="_blank"
            rel="noopener noreferrer"
          >
            VivekUI docs ↗
          </a>
        </Navbar.Link>
      </Navbar.Links>

      <Navbar.Actions>
        <a
          className="nav-badge"
          href={utm(vivekui.docs, 'navbar')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Badge variant="soft" tone="primary" pill>
            ⚡ Built with VivekUI
          </Badge>
        </a>

        {/* One click puts `git clone …` on the clipboard. */}
        <CopyButton
          className="nav-clone"
          value={site.cloneCommand}
          label={
            <>
              <TerminalIcon /> Clone
            </>
          }
          copiedLabel="Copied"
          copiedAnnouncement="Clone command copied to clipboard"
          variant="outline"
          size="sm"
          aria-label={`Copy the clone command for ${site.repoSlug}`}
        />

        <Tooltip content={`Star or fork ${site.repoSlug}`}>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="nav-icon"
            aria-label="Open the GitHub repository"
          >
            <a href={site.repoUrl} target="_blank" rel="noopener noreferrer">
              <GitHubIcon size="1.15em" />
            </a>
          </Button>
        </Tooltip>

        <ThemeToggle mode="toggle" variant="ghost" size="sm" />

        <Button asChild size="sm" className="nav-cta">
          <Link href="/chat">Try the demo</Link>
        </Button>

        <Navbar.Toggle />
      </Navbar.Actions>
    </Navbar>
  )
}
