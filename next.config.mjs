import nextMDX from '@next/mdx'

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/**/*': ['./src/app/**/*.mdx'],
  },
  experimental: {
    // Prevents the SSG prerender crash for /_global-error caused by the
    // React 19 / Next.js 16 useContext(null) bug in @mdx-js/react context.
    // The _global-error.meta file is expected by @netlify/plugin-nextjs >=5.15.x —
    // we pin the plugin to 5.14.7 in netlify.toml to avoid this requirement.
    staticGenerationRetryCount: 0,
  },
}

export default withSearch(withMDX(nextConfig))
