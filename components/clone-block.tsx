import { Button, ChatCodeBlock, Stack, Text } from '@the_viveksingh/vivek-ui'

import { GitHubIcon } from '@/components/icons'
import { site } from '@/lib/site'

/**
 * "Clone this template" — the repository's front door.
 *
 * The `git clone` line is a `ChatCodeBlock` so it carries a real copy button
 * whose success is announced once, rather than a snippet the reader has to
 * select by hand.
 */
export function CloneBlock({
  heading = 'Clone the repository',
  compact = false,
}: {
  heading?: string
  /** Drop the buttons and the lede — for the footer, where space is tight. */
  compact?: boolean
}) {
  return (
    <Stack gap={compact ? 2 : 4}>
      <Stack gap={1}>
        <span className="eyebrow">{heading}</span>
        {!compact && (
          <Text tone="muted" className="lede">
            Public, MIT licensed, and yours to rename. No build step to configure and no
            environment variables to set.
          </Text>
        )}
      </Stack>

      <ChatCodeBlock
        code={site.cloneCommand}
        language="bash"
        filename={site.repoSlug}
        copyLabel="Copy the clone command"
        copiedLabel="Copied"
        wrap
      />

      {!compact && (
        <Stack direction="horizontal" gap={3} wrap>
          <Button asChild>
            <a href={site.repoUrl} target="_blank" rel="noopener noreferrer">
              <GitHubIcon /> View on GitHub
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={site.templateUrl} target="_blank" rel="noopener noreferrer">
              Use this template
            </a>
          </Button>
        </Stack>
      )}
    </Stack>
  )
}
