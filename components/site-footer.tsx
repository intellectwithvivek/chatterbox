import { Divider, Footer, Stack, Text } from '@the_viveksingh/vivek-ui'

import { Brand } from '@/components/brand'
import { InstallCommand } from '@/components/install-command'
import { site, utm, vivekui } from '@/lib/site'

const columns = [
  {
    title: 'Template',
    links: [
      { label: 'Live demo', href: '/chat' },
      { label: 'Built with VivekUI', href: '/built-with' },
      { label: 'Source on GitHub', href: site.repoUrl, target: '_blank' as const },
    ],
  },
  {
    title: 'VivekUI',
    links: [
      { label: 'Documentation', href: utm(vivekui.docs, 'footer'), target: '_blank' as const },
      { label: 'Component reference', href: utm(vivekui.components, 'footer'), target: '_blank' as const },
      { label: 'npm package', href: vivekui.npm, target: '_blank' as const },
      { label: 'GitHub repository', href: vivekui.github, target: '_blank' as const },
    ],
  },
  {
    title: 'Author',
    links: [
      { label: vivekui.authorName, href: utm(vivekui.author, 'footer'), target: '_blank' as const },
      { label: 'MIT license', href: `${site.repoUrl}/blob/main/LICENSE`, target: '_blank' as const },
    ],
  },
]

export function SiteFooter() {
  return (
    <Footer
      columns={columns}
      navLabel="Footer"
      brand={
        <Stack gap={3} style={{ maxInlineSize: '34rem' }}>
          <Brand />
          <Text size="sm" tone="muted">
            {vivekui.blurb}
          </Text>
          <InstallCommand />
        </Stack>
      }
      copyright={
        <Stack gap={2}>
          <Divider />
          <Text size="sm" tone="muted">
            {site.name} is a free, open-source template. MIT licensed — the credit above is
            removable, though a{' '}
            <a href={vivekui.github} target="_blank" rel="noopener noreferrer">
              star on GitHub
            </a>{' '}
            is appreciated.
          </Text>
        </Stack>
      }
    />
  )
}
