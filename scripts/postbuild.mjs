#!/usr/bin/env node
/**
 * postbuild.mjs
 *
 * Synthesises the _global-error static artifacts that @netlify/plugin-nextjs
 * expects but that Next.js 16 + staticGenerationRetryCount:0 never emits.
 *
 * Root cause: @mdx-js/react injects a useContext-dependent provider into every
 * page including /_global-error. During SSG prerendering there is no React root,
 * so useContext(null) throws. staticGenerationRetryCount:0 suppresses the crash
 * but also skips emitting the .meta/.html/.prefetch.rsc artifacts.
 *
 * The plugin only reads _global-error.meta to verify the boundary exists.
 * The file content is always {"status":200,"headers":{}}.
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const appDir = join(process.cwd(), '.next', 'server', 'app')

// Ensure the _global-error directory exists (it always does after build)
const errorDir = join(appDir, '_global-error')
if (!existsSync(errorDir)) {
  mkdirSync(errorDir, { recursive: true })
}

// Synthesise the three files the plugin checks for
const meta = JSON.stringify({ status: 200, headers: {} })
const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/></head><body></body></html>'
const rsc  = ''

writeFileSync(join(appDir, '_global-error.meta'),        meta,  'utf8')
writeFileSync(join(appDir, '_global-error.html'),        html,  'utf8')
writeFileSync(join(appDir, '_global-error.prefetch.rsc'), rsc,  'utf8')

console.log('✓ postbuild: synthesised _global-error.{meta,html,prefetch.rsc}')
