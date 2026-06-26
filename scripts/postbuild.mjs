#!/usr/bin/env node
/**
 * scripts/postbuild.mjs
 *
 * Renders all statically prerendered routes by starting the Next.js server
 * briefly, fetching each page's HTML, and writing the required artifacts
 * (.meta, .html, .prefetch.rsc) that @netlify/plugin-nextjs expects.
 *
 * Root cause: Next.js 16 + @next/mdx + staticGenerationRetryCount:0 suppresses
 * the @mdx-js/react useContext(null) SSG crash but also skips emitting all
 * prerender artifacts for every route. The plugin reads these files during
 * its onBuild phase — without them the deploy fails. Without real HTML content
 * the pages render as white/blank.
 *
 * Strategy:
 *   1. Start `next start` on a free port
 *   2. Fetch each route from prerender-manifest.json
 *   3. Write the real HTML + synthetic .meta + empty .prefetch.rsc
 *   4. Kill the server
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { spawn } from 'child_process'
import { createServer } from 'net'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findFreePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer()
    srv.listen(0, '127.0.0.1', () => {
      const port = srv.address().port
      srv.close(() => resolve(port))
    })
    srv.on('error', reject)
  })
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function waitForServer(port, retries = 30, interval = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/`)
      if (res.status < 600) return true
    } catch {
      // not ready yet
    }
    await sleep(interval)
  }
  throw new Error(`Server on port ${port} did not become ready after ${retries}s`)
}

async function fetchHtml(port, route) {
  const url = `http://127.0.0.1:${port}${route}`
  const res = await fetch(url, {
    headers: { 'accept': 'text/html' },
  })
  return res.text()
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const publishDir   = join(process.cwd(), '.next')
const serverApp    = join(publishDir, 'server', 'app')
const manifestPath = join(publishDir, 'prerender-manifest.json')

if (!existsSync(manifestPath)) {
  console.error('postbuild: prerender-manifest.json not found — skipping')
  process.exit(0)
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
const routes   = Object.keys(manifest.routes ?? {})

// Routes to skip — not real pages, no HTML to render
const SKIP_ROUTES = new Set(['/_global-error'])

const port = await findFreePort()
console.log(`postbuild: starting next server on port ${port}...`)

const server = spawn(
  process.execPath,
  ['node_modules/.bin/next', 'start', '--port', String(port)],
  { stdio: 'pipe', cwd: process.cwd() }
)

server.stderr.on('data', () => {}) // suppress stderr noise
server.stdout.on('data', () => {}) // suppress stdout noise

try {
  await waitForServer(port)
  console.log(`postbuild: server ready — rendering ${routes.length} routes`)

  let created = 0

  for (const route of routes) {
    // Mirror the plugin's routeToFilePath(): "/" → "/index"
    const filePath = route === '/' ? '/index' : route
    const basePath = join(serverApp, filePath)

    const metaPath = basePath + '.meta'
    const htmlPath = basePath + '.html'
    const rscPath  = basePath + '.prefetch.rsc'

    // Ensure parent directory exists
    const parentDir = dirname(metaPath)
    if (!existsSync(parentDir)) {
      mkdirSync(parentDir, { recursive: true })
    }

    // .meta — always write (plugin requires it; content is status + empty headers)
    if (!existsSync(metaPath)) {
      const status = manifest.routes[route]?.initialStatus ?? 200
      writeFileSync(metaPath, JSON.stringify({ status, headers: {} }), 'utf-8')
      created++
    }

    // .prefetch.rsc — always empty for our static MDX pages
    if (!existsSync(rscPath)) {
      writeFileSync(rscPath, '', 'utf-8')
    }

    // .html — fetch real rendered HTML from the server
    if (!existsSync(htmlPath)) {
      if (SKIP_ROUTES.has(route)) {
        writeFileSync(htmlPath,
          '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/></head><body></body></html>',
          'utf-8')
      } else {
        try {
          const html = await fetchHtml(port, route)
          writeFileSync(htmlPath, html, 'utf-8')
          process.stdout.write(`  ✓ ${route}\n`)
        } catch (err) {
          console.warn(`  ⚠ ${route}: fetch failed (${err.message}) — writing empty HTML`)
          writeFileSync(htmlPath,
            '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/></head><body></body></html>',
            'utf-8')
        }
      }
    }
  }

  console.log(`✓ postbuild: wrote artifacts for ${routes.length} routes (${created} .meta files created)`)
} finally {
  server.kill()
}
