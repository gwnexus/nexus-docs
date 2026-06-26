'use client'

// Required by Next.js App Router as a root-level error boundary.
// force-dynamic prevents the SSG prerender crash (React 19 / Next.js 16
// useContext(null) bug when rendered without a React root at build time).
export const dynamic = 'force-dynamic'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ maxWidth: 400, textAlign: 'center', padding: 24 }}>
            <h1 style={{ fontSize: 20, fontWeight: 600 }}>Something went wrong</h1>
            <p style={{ marginTop: 8, color: '#6b7280', fontSize: 14 }}>
              {error?.digest ? `Error ID: ${error.digest}` : 'An unexpected error occurred.'}
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => reset()}
                style={{ padding: '8px 16px', borderRadius: 6, backgroundColor: '#111827', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14 }}
              >
                Try again
              </button>
              <a href="/" style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', color: '#374151', textDecoration: 'none', fontSize: 14 }}>
                Go home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
