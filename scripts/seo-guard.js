/**
 * THE SEO GUARD (31/10/2026), the last step of `postbuild`.
 *
 *   bun scripts/seo-guard.js
 *
 * Every HTML file in dist comes from one of several writers: prerender.js, prerender-legal.js,
 * prerender-tools.js (the tools, whose head is written in the applications repository) and
 * redirect-pages.js. An audit of the 568 pages of the six sites on 31/10/2026 found heads that
 * broke the house's standard here and nowhere else: titles of up to 109 characters, descriptions
 * of up to 227, pages with no share card, no Twitter card or no JSON-LD. This step applies the
 * standard to every page once, whoever wrote it:
 *
 *   title         under 65 characters: the " — Ciro Cesar Maciel" suffix goes when it would pass
 *   description   160 characters at most, cut at a word (also og: and twitter:)
 *   share card    the default 1200x630 card where a page has none; twitter:card summary_large_image
 *   JSON-LD       a WebPage with the page's name, description and address where a page has none
 *
 * A redirect page (meta refresh) is left alone. Prints what it changed.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = new URL('../dist', import.meta.url).pathname
const SITE = 'https://ciromaciel.click'
const SUFFIX = ' — Ciro Cesar Maciel'
const CARD = `${SITE}/opengraph.webp`

const walk = dir => readdirSync(dir).flatMap(name => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : name.endsWith('.html') ? [path] : []
})

const unescape = text => text.replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&')
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

/** 160 characters at most, cut at a word, with an ellipsis when cut. */
function clip(text, max = 158) {
    if (text.length <= 160) return text
    const cut = text.slice(0, max)
    return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.—-]$/, '').trim()}…`
}

/** The content of a meta tag, by name or property, in either attribute order. */
const metaRe = key => new RegExp(`<meta\\s+(?:(?:name|property)="${key}"\\s+content="([^"]*)"|content="([^"]*)"\\s+(?:name|property)="${key}")\\s*/?>`)
const getMeta = (html, key) => { const m = html.match(metaRe(key)); return m ? unescape(m[1] ?? m[2]) : null }
const setMeta = (html, key, value) => html.replace(metaRe(key), match => match.replace(/content="[^"]*"/, `content="${escape(value)}"`))

const changed = { title: 0, description: 0, card: 0, twitter: 0, jsonld: 0 }
for (const file of walk(DIST)) {
    let html = readFileSync(file, 'utf8')
    if (!html.includes('<head') || /http-equiv="refresh"/.test(html)) continue
    const before = html
    const rel = file.slice(DIST.length).replace(/index\.html$/, '').replace(/\.html$/, '') || '/'

    const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
    if (title && unescape(title).length > 65 && unescape(title).endsWith(SUFFIX)) {
        const short = unescape(title).slice(0, -SUFFIX.length)
        html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(short)}</title>`)
        for (const key of ['og:title', 'twitter:title']) if (getMeta(html, key)) html = setMeta(html, key, short)
        changed.title++
    }

    const description = getMeta(html, 'description')
    if (description && description.length > 160) {
        const short = clip(description)
        for (const key of ['description', 'og:description', 'twitter:description']) if (getMeta(html, key)) html = setMeta(html, key, short)
        changed.description++
    }

    const head = []
    if (!getMeta(html, 'og:image')) {
        head.push(`<meta property="og:image" content="${CARD}" />`, '<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />')
        changed.card++
    }
    if (!getMeta(html, 'twitter:card')) {
        head.push('<meta name="twitter:card" content="summary_large_image" />')
        if (!getMeta(html, 'twitter:image')) head.push(`<meta name="twitter:image" content="${getMeta(html, 'og:image') ?? CARD}" />`)
        changed.twitter++
    }
    if (!html.includes('application/ld+json')) {
        const name = unescape(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '')
        const url = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? `${SITE}${rel}`
        head.push(`<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name, description: getMeta(html, 'description') ?? undefined, url, inLanguage: 'pt-BR', author: { '@type': 'Person', name: 'Ciro Cesar Maciel', url: SITE } })}</script>`)
        changed.jsonld++
    }
    if (head.length) html = html.replace('</head>', `${head.join('\n')}\n</head>`)
    if (html !== before) writeFileSync(file, html)
}
console.log(`  seo-guard: ${Object.entries(changed).map(([k, v]) => `${k} ${v}`).join(', ')}`)
