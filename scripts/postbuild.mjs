#!/usr/bin/env node
/**
 * scripts/postbuild.mjs
 *
 * Synthesises the static prerender artifacts (.meta, .html, .prefetch.rsc)
 * that @netlify/plugin-nextjs expects for every statically prerendered route.
 *
 * Root cause: Next.js 16 with @next/mdx + staticGenerationRetryCount:0
 * suppresses the /_global-error SSG crash (React 19 useContext(null) bug
 * in @mdx-js/react), but as a side-effect skips emitting all prerender
 * artifacts (.meta, .html, .prefetch.rsc) for every route in the app.
 *
 * The plugin reads prerender-manifest.json to enumerate routes, then
 * opens `${route}.meta` for each one. This script synthesises the minimal
 * valid content for each file so the plugin can proceed.
 *
 * Content format verified against a working nexus-hub build (Next.js 16,
 * same plugin version, no MDX pipeline).
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { join, dirname } from 'path'

const publishDir  = join(process.cwd(), '.next')
const serverApp   = join(publishDir, 'server', 'app')
const manifestPath = join(publishDir, 'prerender-manifest.json')

if (!existsSync(manifestPath)) {
  console.error('postbuild: prerender-manifest.json not found — skipping')
  process.exit(0)
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
const routes   = Object.keys(manifest.routes ?? {})

let created = 0

for (const route of routes) {
  // route is e.g. "/adrs", "/", "/_global-error"
  // The plugin looks for .next/server/app${route}.meta
  // For "/" the path is .next/server/app.meta (which maps to page.meta at root)
  const routePath = route === '/' ? '' : route
  const basePath  = join(serverApp, routePath)

  const metaPath  = basePath + '.meta'
  const htmlPath  = basePath + '.html'
  const rscPath   = basePath + '.prefetch.rsc'

  // Ensure parent directory exists
  const parentDir = dirname(metaPath)
  if (!existsSync(parentDir)) {
    mkdirSync(parentDir, { recursive: true })
  }

  // Only write if not already present (don't overwrite real artifacts)
  if (!existsSync(metaPath)) {
    const status = manifest.routes[route]?.initialStatus ?? 200
    writeFileSync(metaPath, JSON.stringify({ status, headers: {} }), 'utf-8')
    created++
  }

  if (!existsSync(htmlPath)) {
    writeFileSync(htmlPath,
      '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/></head><body></body></html>',
      'utf-8')
  }

  if (!existsSync(rscPath)) {
    writeFileSync(rscPath, '', 'utf-8')
  }
}

console.log(`✓ postbuild: synthesised prerender artifacts for ${routes.length} routes (${created} .meta files created)`)
