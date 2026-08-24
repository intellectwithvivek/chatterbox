/**
 * The ChatterBox wordmark: three signal bars, then the name. Pure CSS —
 * no icon package, since the library ships no runtime dependencies and
 * neither does this template.
 */
export function Brand({ label = 'ChatterBox' }: { label?: string }) {
  return (
    <span className="brand">
      <span className="bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {label}
    </span>
  )
}
