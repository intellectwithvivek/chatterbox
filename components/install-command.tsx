import { Code, CopyButton } from '@the_viveksingh/vivek-ui'

import { vivekui } from '@/lib/site'

/** `npm i @the_viveksingh/vivek-ui` with a copy button beside it. */
export function InstallCommand({
  size = 'sm',
}: {
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <div className="install-row">
      <Code>{vivekui.install}</Code>
      <CopyButton value={vivekui.install} variant="ghost" size={size} />
    </div>
  )
}
