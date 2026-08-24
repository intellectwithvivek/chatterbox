import { Divider, Footer, Stack, Text } from '@the_viveksingh/vivek-ui'

import { Brand } from '@/components/brand'
import { CommandBlock } from '@/components/command-block'
import { GitHubIcon } from '@/components/icons'
import { site, utm, vivekui } from '@/lib/site'

const columns = [
  {
    title: 'Template',
    links: [
      { label: 'Live demo', href: '/chat' },
      { label: 'Built with VivekUI', href: '/built-with' },
      { label: 'Clone on GitHub', href: site.repoUrl, target: '_blank' as const },
      { label: 'Use this template', href: site.templateUrl, target: '_blank' as const },
      { label: 'Report an issue', href: site.issuesUrl, target: '_blank' as const },
    ],
  },
  {
    title: 'VivekUI',
    links: [
      { label: 'Documentation', href: utm(vivekui.docs, 'footer'), target: '_blank' as const },
      {
        label: 'Component reference',
        href: utm(vivekui.components, 'footer'),
        target: '_blank' as const,
      },
      { label: 'npm package', href: vivekui.npm, target: '_blank' as const },
      { label: 'GitHub repository', href: vivekui.github, target: '_blank' as const },
    ],
  },
  {
    title: 'Author',
    links: [
      { label: vivekui.authorName, href: utm(vivekui.author, 'footer'), target: '_blank' as const },
      { label: 'MIT license', href: site.licenseUrl, target: '_blank' as const },
    ],
  },
]

export function SiteFooter() {
  return (
    <Footer
      columns={columns}
      navLabel="Footer"
      brand={
        <Stack gap={3}>
          <Brand />
          <Text size="sm" tone="muted">
            {vivekui.blurb}
          </Text>
        </Stack>
      }
      social={
        <a
          className="footer-repo"
          href={site.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon /> {site.repoSlug}
        </a>
      }
      /*
       * Both commands live in the bottom bar rather than the brand slot: the
       * library caps `.vk-footer__brand` at 24rem, which is too narrow for
       * `git clone …` and was wrapping it across three lines. Down here they
       * get the full container width.
       */
      copyright={
        <Stack gap={6} className="footer-bottom">
          <div className="footer-cmds">
            <CommandBlock
              label="Add the library"
              command={vivekui.install}
              copyLabel="Copy install command"
            />
            <CommandBlock
              label="Clone this template"
              command={site.cloneCommand}
              copyLabel="Copy clone command"
            />
          </div>

          <Divider />

          <Text size="sm" tone="muted">
            {site.name} is a free, open-source template built to showcase VivekUI. MIT
            licensed — the credit above is removable, though a{' '}
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
