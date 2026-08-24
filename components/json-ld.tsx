/**
 * Emits one JSON-LD graph. Server-rendered, so crawlers see it in the
 * initial HTML rather than after hydration.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output, with the one sequence that could break out of
      // a <script> element escaped.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
