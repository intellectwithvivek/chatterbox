import { ChatCodeBlock, Stack } from '@the_viveksingh/vivek-ui'

/**
 * A labelled, copyable shell command.
 *
 * `ChatCodeBlock` rather than an inline `Code` + `CopyButton`: it gives the
 * command a header with a stable copy button whose success is announced once,
 * and it does not fight for horizontal room the way an inline row does.
 */
export function CommandBlock({
  label,
  command,
  copyLabel,
}: {
  label: string
  command: string
  copyLabel: string
}) {
  return (
    <Stack gap={2}>
      <span className="eyebrow">{label}</span>
      {/* No `filename`: the eyebrow above already names the command, and a
          filename plus a descriptive copy label wrapped the header onto two
          lines in the footer's narrow columns. */}
      <ChatCodeBlock
        code={command}
        language="bash"
        copyLabel={copyLabel}
        copiedLabel="Copied"
        wrap
      />
    </Stack>
  )
}
