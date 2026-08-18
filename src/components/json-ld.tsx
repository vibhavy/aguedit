/** Renders a JSON-LD structured-data object as a script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Server-controlled data; JSON.stringify escapes it safely.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
