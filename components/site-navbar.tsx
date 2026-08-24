'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge, Button, Navbar, ThemeToggle } from '@the_viveksingh/vivek-ui'

import { Brand } from '@/components/brand'
import { utm, vivekui } from '@/lib/site'

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
      </Navbar.Links>

      <Navbar.Actions>
        <a
          className="hide-sm"
          href={utm(vivekui.docs, 'navbar')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Badge variant="soft" tone="primary" pill>
            ⚡ Built with VivekUI
          </Badge>
        </a>
        <ThemeToggle mode="toggle" variant="ghost" />
        <Button asChild size="sm">
          <Link href="/chat">Try the demo</Link>
        </Button>
        <Navbar.Toggle />
      </Navbar.Actions>
    </Navbar>
  )
}
