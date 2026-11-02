/**
 * What an agent reads from this site, written into dist/ after everything else.
 *
 *   bun scripts/agent-files.js     (the last step of `postbuild`)
 *
 * The Hoster (infrastructure/hoster/worker/src/serve.js) does two things for
 * a static site, and both depend on files this script writes:
 *
 *   1. A `404.html` at the root turns off the SPA fallback: an address with no
 *      file answers 404 with that page, instead of 200 with the home. Agents
 *      probing a path no longer conclude that every path exists. Since every
 *      real page must now be a file, the routes the app draws with no
 *      prerendered page (/branding, /design-system, the redirects) get the
 *      shell, as the fallback used to give them. The build fails if a sitemap
 *      address is left without a file.
 *   2. `Accept: text/markdown` gets the `.md` twin of the page, at the same
 *      address. Every prerendered page gets one, converted from the text the
 *      prerender already put in its HTML — one source for the two readers.
 *
 * It also publishes the MCP server card at /.well-known/mcp.json (and the
 * older SEP-1649 path), pointing at the tools' MCP server, and the Agent
 * Skills index at /.well-known/agent-skills/index.json.
 */
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { SITE } from '../src/data/site.js'
import { MCP_URL } from '../src/data/trust.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

/**
 * Routes of the app with no prerendered page of their own: they get the
 * shell, and React draws them. The /solutions slugs that lived on this domain
 * are redirect pages now (scripts/redirect-pages.js); a slug that never lived
 * here is a real 404.
 */
export const SHELL_ROUTES = [
    '/branding',
    '/design-system',
    '/search',
    '/legal/security',
    '/politica-de-privacidade',
    '/kit/escritorio',
]

// ─── HTML → Markdown ───
//
// Only for the markup the prerender scripts write (prerender.js,
// prerender-legal.js): headings, paragraphs, lists, links, emphasis and <pre>.
// It is not a general converter, and does not need to be.

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' }
const decode = text => text.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, entity => ENTITIES[entity])

const absolute = href => (href.startsWith('/') ? `${SITE.url}${href}` : href)

/** Inline markup: links, bold, italics. Tags it does not know are dropped. */
function inline(html) {
    return decode(
        html
            .replace(/<a\s[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gs, (_, href, text) => `[${inline(text)}](${absolute(decode(href))})`)
            .replace(/<(strong|b)>(.*?)<\/\1>/gs, '**$2**')
            .replace(/<(em|i)>(.*?)<\/\1>/gs, '*$2*')
            .replace(/<br\s*\/?>/g, '  \n')
            .replace(/<[^>]+>/g, '')
    ).trim()
}

function list(html, ordered) {
    const items = [...html.matchAll(/<li[^>]*>(.*?)<\/li>/gs)].map(m => m[1])
    return items.map((item, i) => `${ordered ? `${i + 1}.` : '-'} ${inline(item)}`).join('\n')
}

export function htmlToMarkdown(html) {
    const blocks = []
    const pattern = /<(h[1-6]|p|ul|ol|pre)[^>]*>(.*?)<\/\1>/gs
    for (const [, tag, content] of html.matchAll(pattern)) {
        if (tag[0] === 'h') blocks.push(`${'#'.repeat(Number(tag[1]))} ${inline(content)}`)
        else if (tag === 'p') blocks.push(inline(content))
        else if (tag === 'ul' || tag === 'ol') blocks.push(list(content, tag === 'ol'))
        else blocks.push(`\`\`\`\n${decode(content.replace(/<[^>]+>/g, ''))}\n\`\`\``)
    }
    return blocks.filter(Boolean).join('\n\n')
}

/** The prerendered text of a page (`<main>` inside #root), or null. */
export function pageBody(html) {
    return html.match(/<div id="root">(<main[\s\S]*?<\/main>)<\/div>/)?.[1] ?? null
}

/** The address a file in dist/ answers to: dist/books/x/index.html → /books/x. */
export function addressOf(file) {
    const path = `/${relative(DIST, dirname(file))}`.replace(/\/$/, '')
    return path || '/'
}

/** What the page's <head> says about it: title, description, canonical. */
export function pageMeta(html) {
    const pick = pattern => decode(html.match(pattern)?.[1] ?? '')
    return {
        title: pick(/<title>([^<]*)<\/title>/),
        description: pick(/<meta\s+name="description"\s+content="([^"]*)"/),
        canonical: pick(/<link rel="canonical" href="([^"]*)"/),
    }
}

// A YAML string in double quotes: only the backslash and the quote need it.
const yaml = text => `"${String(text).replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`

/**
 * The twin: frontmatter (title, description, canonical — what an agent reads
 * as the document's metadata), the page's text, and the way back.
 */
export function markdownPage(body, address, meta = {}) {
    const url = address === '/' ? `${SITE.url}/` : `${SITE.url}${address}`
    const front = [
        '---',
        `title: ${yaml(meta.title || SITE.name)}`,
        meta.description ? `description: ${yaml(meta.description)}` : null,
        `canonical: ${yaml(meta.canonical || url)}`,
        '---',
    ].filter(Boolean)
    return `${front.join('\n')}\n\n${htmlToMarkdown(body)}\n\n---\n\nPágina: ${url} · O site inteiro em texto: ${SITE.url}/llms.txt\n`
}

// ─── 404 ───

// No frontmatter here, unlike the twins: an error body opens with what
// happened, which is what an agent probing a missing path reads first.
export const NOT_FOUND_MARKDOWN = `# Página não encontrada (404)

**404 Not Found:** this page does not exist. Start from the [llms.txt](${SITE.url}/llms.txt) or the [sitemap](${SITE.url}/sitemap.xml).

Não existe página neste endereço de ${SITE.url.replace('https://', '')}. O endereço está errado ou a página saiu do ar.

- Comece pela home: [${SITE.url.replace('https://', '')}](${SITE.url}/)
- O site inteiro, em texto, para agentes: [llms.txt](${SITE.url}/llms.txt)
- Todos os endereços que existem: [sitemap.xml](${SITE.url}/sitemap.xml)
- As ferramentas, também por MCP: [ferramentas](${SITE.url}/tools)
`

export function notFoundHtml(shell) {
    const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    const body = [
        '<main class="prerender-static" style="max-width:960px;margin:0 auto;padding:48px 20px;font-family:Montserrat,sans-serif;line-height:1.6;color:#4B5563">',
        '<p>Erro 404</p>',
        '<h1>Esta página não existe</h1>',
        '<p>O endereço está errado ou a página saiu do ar. O conteúdo do site está todo na home.</p>',
        `<ul><li><a href="/">Voltar para a home</a></li><li><a href="/llms.txt">O site inteiro em texto (llms.txt)</a></li><li><a href="/sitemap.xml">Todos os endereços (sitemap)</a></li></ul>`,
        '</main>',
    ].join('')
    const html = shell
        .replace(/<title>[^<]*<\/title>/, `<title>${escape(`Página não encontrada — ${SITE.name}`)}</title>`)
        .replace('</head>', '<meta name="robots" content="noindex" />\n</head>')
        .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    if (!html.includes('Esta página não existe')) throw new Error('agent-files: #root not found in the shell')
    return html
}

// ─── MCP server card ───
//
// The shape of the MCP Registry's server.json (the base SEP-2127 builds on):
// reverse-DNS `name`, `remotes[]` with the Streamable HTTP endpoint. The same
// card is published at the SEP-1649 path for clients that still look there.
export const MCP_CARD = {
    $schema: 'https://static.modelcontextprotocol.io/schemas/2025-10-17/server.schema.json',
    name: 'click.ciromaciel/tools',
    title: `Ferramentas de ${SITE.name}`,
    description: 'Ferramentas gratuitas de Ciro Cesar Maciel para assistentes de IA, sem login.',
    version: '0.2.0',
    websiteUrl: `${SITE.url}/tools`,
    icons: [{ src: `${SITE.url}/icon.png`, mimeType: 'image/png', sizes: ['512x512'] }],
    remotes: [{ type: 'streamable-http', url: MCP_URL }],
}

// ─── Agent Skills ───
//
// The Agent Skills Discovery index (Cloudflare's RFC, schema 0.2.0): one
// skill that tells an agent WHEN to reach for this site and how to call it.
// The tool list is the MCP server's own (tools/list), with its WHEN TO USE.

export const SKILL_NAME = 'ciro-cesar-maciel-tools'

export const SKILL_MD = `---
name: ${SKILL_NAME}
description: Free tools by Ciro Cesar Maciel over MCP, no login - generate passwords and favicons, compare time zones, draw charts from CSV, text to speech (MP3), and read any web page as Markdown. Also the books "O Novo Básico" on using AI at work, in Portuguese.
---

# Ciro Cesar Maciel: tools and books

Use this when the user needs one of the jobs below and you can call an MCP
server, or when they ask about learning to use AI at work in Portuguese.

## When to use

| The user wants | Call (MCP tool) |
|---|---|
| A strong password or random key | \`generate_password\` |
| The same moment in several time zones, a meeting across cities | \`compare_timezones\` |
| A chart image from a CSV table | \`data_to_chart\` |
| A text read aloud, as an MP3 | \`text_to_speech\` |
| A favicon set from initials or one emoji | \`generate_favicon\` |
| The content of a public web page, as clean Markdown | \`web_to_markdown\` |

Every tool also has a page that runs in the browser: ${SITE.url}/tools

## How to call

- MCP endpoint: ${MCP_URL} (Streamable HTTP, no authentication).
- Server card: ${SITE.url}/.well-known/mcp.json
- Add it to Claude, ChatGPT or any MCP client as a remote server with that URL.

## When NOT to use

- Paid plans, carts or prices: nothing is sold on ${SITE.url.replace('https://', '')}. The
  books are sold on Amazon; the extensions are in the Chrome Web Store and Open VSX.
- Backend infrastructure (login, payments, storage, hosting) is another product:
  https://myinfrastructure.click/llms.txt

## More

- Everything on the site, as text: ${SITE.url}/llms.txt
- Any page as Markdown: request it with \`Accept: text/markdown\`.
- Who he is and how to reach him: ${SITE.url}/about · ${SITE.url}/contact
`

export function skillsIndex(skillMd) {
    const digest = createHash('sha256').update(skillMd).digest('hex')
    return {
        $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
        skills: [
            {
                name: SKILL_NAME,
                type: 'skill-md',
                description: skillMd.match(/^description: (.*)$/m)[1],
                url: `/.well-known/agent-skills/${SKILL_NAME}/SKILL.md`,
                digest: `sha256:${digest}`,
            },
        ],
    }
}

// ─── The build step ───

async function listIndexFiles(dir) {
    const found = []
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) found.push(...(await listIndexFiles(path)))
        else if (entry.name === 'index.html') found.push(path)
    }
    return found
}

async function write(path, content) {
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, content)
}

export async function buildAgentFiles() {
    // The shell with an empty #root, which prerender-legal.js also starts from.
    // dist/index.html carries the home's text by now, so it is emptied here.
    const home = await readFile(join(DIST, 'index.html'), 'utf8')
    const shell = home.replace(/<div id="root">(<main[\s\S]*?<\/main>)<\/div>/, '<div id="root"></div>')

    for (const route of SHELL_ROUTES) {
        const file = join(DIST, route, 'index.html')
        if (!existsSync(file)) await write(file, shell)
    }

    await write(join(DIST, '404.html'), notFoundHtml(shell))
    await write(join(DIST, '404.md'), NOT_FOUND_MARKDOWN)

    let twins = 0
    for (const file of await listIndexFiles(DIST)) {
        const html = await readFile(file, 'utf8')
        const body = pageBody(html)
        if (!body) continue
        await write(file.replace(/\.html$/, '.md'), markdownPage(body, addressOf(file), pageMeta(html)))
        twins++
    }

    const card = `${JSON.stringify(MCP_CARD, null, 4)}\n`
    await write(join(DIST, '.well-known', 'mcp.json'), card)
    await write(join(DIST, '.well-known', 'mcp', 'server-card.json'), card)

    await write(join(DIST, '.well-known', 'agent-skills', SKILL_NAME, 'SKILL.md'), SKILL_MD)
    await write(join(DIST, '.well-known', 'agent-skills', 'index.json'), `${JSON.stringify(skillsIndex(SKILL_MD), null, 4)}\n`)

    // With the SPA fallback gone, an address in the sitemap with no file is a
    // 404 in production. Fail here, where it is cheap.
    const sitemap = await readFile(join(DIST, 'sitemap.xml'), 'utf8')
    const missing = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map(m => m[1].replace(SITE.url, '').replace(/\/$/, ''))
        .filter(path => !existsSync(join(DIST, path, 'index.html')))
    if (missing.length) throw new Error(`agent-files: sitemap addresses without a file (they would answer 404): ${missing.join(', ')}`)

    console.log(`[agent-files] 404.html + 404.md, ${twins} Markdown twins, ${SHELL_ROUTES.length} shell routes, MCP card, Agent Skills index`)
}

if (import.meta.main) await buildAgentFiles()
