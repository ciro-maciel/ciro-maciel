/**
 * The sitemap's dates, made true, and the same addresses in the other formats
 * Google and Bing read. Runs last in postbuild, over the final HTML in dist/.
 *
 * WHY (21/10/2026). Every address in the sitemap carried the build's date, and
 * the site builds almost every day: to Google, all 319 pages changed today,
 * every day. Google ignores a lastmod that is not consistently accurate, so the
 * sitemap told it nothing about what was new — and a young domain waits for
 * the crawler to stumble on each page by itself. Months of pages "unknown to
 * Google" were that.
 *
 * HOW A DATE STAYS TRUE. Each page gets a fingerprint of its text (the body,
 * without scripts, styles and asset names, which change every build). The
 * fingerprints and dates of the published site are at /lastmod.json: a page
 * whose fingerprint did not change keeps its date; one that changed, or is new,
 * takes today's. No commit and no CI cache: the live site is the memory. When
 * the live manifest cannot be read, every page takes today's date, once.
 *
 * WHAT IT WRITES, in dist/:
 *   sitemap.xml   the same file, with each page's real date
 *   sitemap.txt   one address per line (Google's text sitemap)
 *   feed.xml      RSS 2.0 with the 50 most recently changed pages
 *   atom.xml      the same in Atom 1.0
 *   lastmod.json  the fingerprints and dates, for the next build
 */

import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = join(import.meta.dir, '..', 'dist')
const SITE_URL = 'https://ciromaciel.click'
const FEED_SIZE = 50
const today = new Date().toISOString().slice(0, 10)

const escapeXml = text => String(text ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const unescapeHtml = text =>
    String(text ?? '')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')

function htmlOf(path) {
    const file = path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html')
    return existsSync(file) ? readFileSync(file, 'utf8') : null
}

/**
 * The page's own text, without what changes on every build. Only <main> when
 * there is one: the header and the footer are on every page, and a new menu
 * entry must not date all of them today (the very fault this fixes). The tool
 * pages, built elsewhere, have no <main>; their whole body counts.
 */
function fingerprint(html) {
    const body = (html.match(/<main[^>]*>([\s\S]*)<\/main>/i)?.[1] ?? html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html)
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<link[^>]*>/gi, '')
        .replace(/\/assets\/[\w.-]+/g, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    return createHash('sha1').update(body).digest('hex')
}

const titleOf = html => unescapeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '').replace(/\s+—\s+Ciro Cesar Maciel$/, '')
const descriptionOf = html => unescapeHtml(html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? '')

async function previousManifest() {
    try {
        const response = await fetch(`${SITE_URL}/lastmod.json`, { signal: AbortSignal.timeout(10_000) })
        if (!response.ok) throw new Error(`respondeu ${response.status}`)
        return (await response.json()).pages ?? {}
    } catch (error) {
        console.warn(`[sitemap-dates] sem o manifesto publicado (${error.message}); toda página fica com a data de hoje`)
        return {}
    }
}

const sitemapFile = join(DIST, 'sitemap.xml')
const sitemap = readFileSync(sitemapFile, 'utf8')
const previous = await previousManifest()
const pages = {}
const entries = []

const dated = sitemap.replace(/<url>([\s\S]*?)<\/url>/g, (block, inner) => {
    const loc = inner.match(/<loc>([^<]+)<\/loc>/)?.[1]
    if (!loc) return block
    const path = new URL(loc).pathname
    const html = htmlOf(path)
    if (!html) return block
    const hash = fingerprint(html)
    const lastmod = previous[path]?.hash === hash ? previous[path].lastmod : today
    pages[path] = { hash, lastmod }
    entries.push({ loc, path, lastmod, title: titleOf(html), description: descriptionOf(html) })
    return block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${lastmod}</lastmod>`)
})

writeFileSync(sitemapFile, dated)
writeFileSync(join(DIST, 'lastmod.json'), `${JSON.stringify({ updated: today, pages }, null, 1)}\n`)
writeFileSync(join(DIST, 'sitemap.txt'), `${entries.map(entry => entry.loc).join('\n')}\n`)

// The feeds: the pages that changed most recently, the newest first.
const recent = [...entries].sort((a, b) => b.lastmod.localeCompare(a.lastmod) || a.path.localeCompare(b.path)).slice(0, FEED_SIZE)
const rfc822 = date => new Date(`${date}T12:00:00Z`).toUTCString()
const newest = recent[0]?.lastmod ?? today

writeFileSync(
    join(DIST, 'feed.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Ciro Cesar Maciel — o que mudou no site</title>
<link>${SITE_URL}/</link>
<atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
<description>As páginas novas e alteradas de ciromaciel.click: livros, kits, ferramentas, conectores MCP e alternativas.</description>
<language>pt-BR</language>
<lastBuildDate>${rfc822(newest)}</lastBuildDate>
${recent
    .map(
        entry => `<item>
<title>${escapeXml(entry.title)}</title>
<link>${entry.loc}</link>
<guid isPermaLink="false">${entry.loc}#${entry.lastmod}</guid>
<pubDate>${rfc822(entry.lastmod)}</pubDate>
<description>${escapeXml(entry.description)}</description>
</item>`
    )
    .join('\n')}
</channel>
</rss>
`
)

writeFileSync(
    join(DIST, 'atom.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="pt-BR">
<title>Ciro Cesar Maciel — o que mudou no site</title>
<id>${SITE_URL}/</id>
<link href="${SITE_URL}/"/>
<link href="${SITE_URL}/atom.xml" rel="self"/>
<updated>${newest}T12:00:00Z</updated>
<author><name>Ciro Cesar Maciel</name></author>
${recent
    .map(
        entry => `<entry>
<title>${escapeXml(entry.title)}</title>
<link href="${entry.loc}"/>
<id>${entry.loc}#${entry.lastmod}</id>
<updated>${entry.lastmod}T12:00:00Z</updated>
<summary>${escapeXml(entry.description)}</summary>
</entry>`
    )
    .join('\n')}
</feed>
`
)

const changed = entries.filter(entry => entry.lastmod === today).length
console.log(`[sitemap-dates] ${entries.length} páginas, ${changed} com a data de hoje; sitemap.txt, feed.xml e atom.xml escritos`)
