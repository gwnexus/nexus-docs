import nextMDX from '@next/mdx'
import { shouldUseReactServerCondition } from 'next/dist/build/utils.js'
import { WEBPACK_LAYERS } from 'next/dist/lib/constants.js'

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

// @next/mdx compiles .mdx with `defaultLoaders.babel`, an SWC loader without a
// bundle layer. Since Next.js 16.3 SWC then treats every MDX page as a client
// module and rejects `export const metadata`. Give the MDX rule the same
// per-layer SWC loaders Next.js uses for .tsx files in the app directory.
function layerMdxRule(config, { defaultLoaders }) {
  let swc = defaultLoaders.babel
  let rule = config.module.rules.find(
    (r) => Array.isArray(r?.use) && r.use[0] === swc && r.test?.test?.('.mdx'),
  )
  if (!rule || swc?.loader !== 'next-swc-loader') return config

  let [, ...mdxLoaders] = rule.use
  let withLayer = (bundleLayer) => [
    { ...swc, options: { ...swc.options, bundleLayer, esm: true } },
    ...mdxLoaders,
  ]

  rule.oneOf = [
    {
      issuerLayer: shouldUseReactServerCondition,
      use: withLayer(WEBPACK_LAYERS.reactServerComponents),
    },
    {
      issuerLayer: WEBPACK_LAYERS.serverSideRendering,
      use: withLayer(WEBPACK_LAYERS.serverSideRendering),
    },
    {
      issuerLayer: WEBPACK_LAYERS.appPagesBrowser,
      use: withLayer(WEBPACK_LAYERS.appPagesBrowser),
    },
    { use: rule.use },
  ]
  delete rule.use
  return config
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: layerMdxRule,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/**/*': ['./src/app/**/*.mdx'],
  },
}

export default withSearch(withMDX(nextConfig))
