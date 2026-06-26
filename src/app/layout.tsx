import glob from 'fast-glob'
import { type Metadata } from 'next'
import localFont from 'next/font/local'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'

import '@/styles/tailwind.css'

const switzer = localFont({
  src: [
    { path: '../../public/fonts/switzer/switzer-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/switzer/switzer-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/switzer/switzer-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/switzer/switzer-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-switzer',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s — Nexus Docs',
    default: 'Nexus Docs',
  },
  description:
    'The official documentation for Nexus — the centralized knowledge and memory platform for AI agent workflows.',
  metadataBase: new URL('https://docs.nexus.gatewarden.eu'),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang="en" className={`h-full ${switzer.variable}`} suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
