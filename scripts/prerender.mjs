// Post-build static prerender. Spawns `vite preview`, walks every URL in
// dist/sitemap.xml with headless Chromium, writes the rendered HTML to
// dist/<route>/index.html. Cloudflare Pages serves the static file in
// preference to the SPA fallback in `_redirects`, so bots get real HTML.
//
// Notes:
// - Captures all routes in memory, THEN writes to disk. Otherwise the SPA
//   fallback (Vite preview returning dist/index.html for unknown paths)
//   would start serving prerendered HTML mid-run, contaminating later pages.
// - 200ms idle delay after networkidle0 so SEOHead's useEffect has flushed
//   its meta-tag mutations before we snapshot.

import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')
const SITEMAP = resolve(DIST, 'sitemap.xml')
const PORT = Number(process.env.PRERENDER_PORT || 4173)

// Auth-walled or dynamic-only routes. We never want static HTML for these.
const SKIP_PREFIXES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/auth/callback',
  '/dashboard',
  '/diagnostic/results',
  '/admin',
  '/settings',
]

function loadRoutes() {
  const xml = readFileSync(SITEMAP, 'utf8')
  const seen = new Set()
  const out = []
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    let p = m[1].replace(/^https?:\/\/[^/]+/, '') || '/'
    // Normalize trailing slash (except root)
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
    if (SKIP_PREFIXES.some((s) => p === s || p.startsWith(s + '/'))) continue
    if (seen.has(p)) continue
    seen.add(p)
    out.push(p)
  }
  return out
}

function startPreview() {
  // Invoke vite's JS entry directly. Node 24 on Windows blocks spawning
  // `.cmd` shims (like node_modules/.bin/vite.cmd) without shell: true, so
  // we bypass the shim entirely.
  const viteBin = resolve(ROOT, 'node_modules/vite/bin/vite.js')
  const proc = spawn(process.execPath, [viteBin, 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  return new Promise((res, rej) => {
    let buf = ''
    // Strip ANSI color codes vite emits; the "Local:" label can be padded
    // with escape sequences that defeat a naive substring/regex match.
    const stripAnsi = (s) => s.replace(/\u001b\[[0-9;]*m/g, '')
    const onData = (d) => {
      buf += d.toString()
      const clean = stripAnsi(buf)
      if (clean.includes(`localhost:${PORT}`)) res(proc)
    }
    proc.stdout.on('data', onData)
    proc.stderr.on('data', onData)
    proc.on('error', rej)
    proc.on('exit', (code) => {
      if (code !== null && code !== 0) rej(new Error(`vite preview exited early (code ${code}):\n${buf}`))
    })
    setTimeout(() => rej(new Error(`vite preview did not announce ready in 30s. Output:\n${buf}`)), 30000)
  })
}

async function main() {
  if (!existsSync(SITEMAP)) {
    console.error(`[prerender] sitemap missing at ${SITEMAP}. Run \`npm run build\` first (prebuild generates it).`)
    process.exit(1)
  }
  const routes = loadRoutes()
  console.log(`[prerender] ${routes.length} routes`)

  const preview = await startPreview()
  console.log(`[prerender] vite preview ready on :${PORT}`)

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const captures = new Map()
  let failures = 0

  try {
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(30000)
    // Quiet console noise from the page so the build log stays clean.
    page.on('pageerror', (err) => console.warn(`[prerender] pageerror: ${err.message}`))

    for (const route of routes) {
      const url = `http://localhost:${PORT}${route}`
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
        // Let any post-render useEffect (SEOHead) finish mutating <head>.
        await new Promise((r) => setTimeout(r, 200))
        const html = await page.content()
        captures.set(route, html)
        console.log(`[prerender] captured ${route}`)
      } catch (err) {
        failures++
        console.warn(`[prerender] FAILED ${route}: ${err.message}`)
      }
    }
  } finally {
    await browser.close()
    preview.kill()
  }

  // All captures done; safe to write to disk now.
  // For non-root routes, write `<route>.html` (file form) rather than
  // `<route>/index.html` (folder form). Cloudflare Pages 308-redirects
  // `/foo` → `/foo/` when only the folder form exists, which creates a
  // sitemap/canonical mismatch. File form is served at the exact URL.
  for (const [route, html] of captures) {
    if (route === '/') {
      writeFileSync(join(DIST, 'index.html'), html)
    } else {
      const filePath = join(DIST, route + '.html')
      mkdirSync(dirname(filePath), { recursive: true })
      writeFileSync(filePath, html)
    }
  }

  console.log(`[prerender] wrote ${captures.size}/${routes.length} routes (${failures} failed)`)
  if (failures > 0 && process.env.PRERENDER_STRICT === '1') process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
