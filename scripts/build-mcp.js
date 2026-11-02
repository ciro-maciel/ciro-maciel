/**
 * The MCP connectors of /mcp, copied from the catalog of mcp.myagents.click.
 *
 * The connectors live in the `agents` repository (agents/mcp), and their
 * directory serves /catalog.json with each one's page content. This writes a
 * copy into src/data/mcp-catalog.js before dev and build, so the site
 * renders the same words as each connector's own page.
 *
 * The copy is committed: a build with the catalog out of reach keeps the last
 * one instead of failing or shipping an empty page.
 */

import { readFileSync, writeFileSync } from 'node:fs'

const CATALOG_URL = process.env.MCP_CATALOG_URL || 'https://mcp.myagents.click/catalog.json'
// A JS module, not JSON: node (generate-sitemap.js) refuses a JSON import
// without an import attribute, and vite and bun read a module as is.
const OUT = new URL('../src/data/mcp-catalog.js', import.meta.url)

try {
    const response = await fetch(CATALOG_URL, { signal: AbortSignal.timeout(15_000) })
    if (!response.ok) throw new Error(`respondeu ${response.status}`)
    const catalog = await response.json()
    const items = (catalog.items || []).filter(item => item.details)
    if (!items.length) throw new Error('veio sem conectores')
    const next = `// Written by scripts/build-mcp.js from ${CATALOG_URL}. Do not edit.\nexport default ${JSON.stringify({ categories: catalog.categories, items }, null, 4)}\n`
    let current = ''
    try {
        current = readFileSync(OUT, 'utf8')
    } catch {}
    if (next !== current) writeFileSync(OUT, next)
    console.log(`[mcp] ${items.length} conectores${next === current ? ' (sem mudança)' : ''}`)
} catch (error) {
    console.warn(`[mcp] catálogo indisponível (${error.message}); fica a cópia de antes`)
}
