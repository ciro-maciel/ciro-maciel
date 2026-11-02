/**
 * Gera o sitemap.xml.
 *
 * A lista abaixo é a fonte da verdade — não há varredura de arquivos, porque
 * as rotas são poucas e escritas à mão em `main.jsx`. Ao criar uma rota nova
 * lá, acrescente-a aqui.
 *
 * `/politica-de-privacidade` NÃO entra: a rota ainda existe, mas só para
 * redirecionar para `/legal/privacy`. Uma URL que redireciona não pertence a
 * um sitemap — ela pede ao buscador que indexe um salto.
 *
 * `/links` não entra porque não existe mais: a página de bio foi removida em
 * 19/09/2026 e o endereço responde 404.
 *
 * As rotas de spec do design system (`/design-system.txt`, `.json` e
 * `/llms-design.txt`) também ficam de fora: são para agentes, estão anunciadas
 * no robots.txt, e um sitemap é para páginas.
 */
import { writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'

import ESC from '../src/data/kit-ia-no-escritorio.js'
import EMP from '../src/data/kit-ia-no-primeiro-trabalho.js'
import ATD from '../src/data/kit-ia-no-atendimento-e-nas-vendas.js'
import SAL from '../src/data/kit-ia-na-sala-de-aula.js'
import CTB from '../src/data/kit-ia-na-contabilidade.js'
import ADV from '../src/data/kit-ia-na-advocacia.js'
import NEG from '../src/data/kit-ia-no-pequeno-negocio.js'
import CCI from '../src/data/kit-construir-com-ia.js'
import FPA from '../src/data/kit-feito-para-agentes.js'
import { standInBook } from '../src/data/kit-book.js'
import { PROMPTS } from '../src/data/prompts.js'
import { RULES } from '../src/data/rules.js'
import { AGENTS } from '../src/data/agents.js'
import { ALTERNATIVES } from '../src/data/alternatives.js'
import { MCP } from '../src/data/mcp.js'

// The task kits, by book (pages/BookKit.jsx keeps the same map).
const KITS = { 'ia-no-escritorio': ESC, 'ia-no-primeiro-trabalho': EMP, 'ia-no-pequeno-negocio': NEG, 'ia-no-atendimento-e-nas-vendas': ATD, 'ia-na-sala-de-aula': SAL, 'ia-na-contabilidade': CTB, 'ia-na-advocacia': ADV, 'construir-com-ia': CCI, 'feito-para-agentes': FPA }

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const BASE_URL = 'https://ciromaciel.click'

const ROUTES = [
    { path: '/', changefreq: 'monthly', priority: '1.0' },
    { path: '/branding', changefreq: 'yearly', priority: '0.5' },
    { path: '/design-system', changefreq: 'yearly', priority: '0.5' },
    { path: '/about', changefreq: 'yearly', priority: '0.5' },
    { path: '/contact', changefreq: 'yearly', priority: '0.5' },
    { path: '/legal/terms', changefreq: 'yearly', priority: '0.3' },
    { path: '/legal/privacy', changefreq: 'yearly', priority: '0.3' },
    { path: '/legal/security', changefreq: 'yearly', priority: '0.3' },
    { path: '/tools', changefreq: 'weekly', priority: '0.8' },
]

// AS FERRAMENTAS NÃO SÃO ESCRITAS À MÃO, ao contrário das rotas acima: elas
// vêm do `public/tools.json` que `build-tools.js registry` acabou de gerar a
// partir do repositório tools. Sem ele (o outro repositório não está
// clonado), o sitemap sai só com as páginas do site.
// The books and their online kits (src/data/books.json, from sync-books.js).
const books = await readFile(join(ROOT, 'src', 'data', 'books.json'), 'utf-8')
    .then(JSON.parse)
    .catch(() => [])
ROUTES.push({ path: '/books', changefreq: 'monthly', priority: '0.8' })
for (const book of books) {
    // The cover rides with the page, as an image entry: it is what the book
    // looks like in the store, and image search shows it.
    ROUTES.push({ path: `/books/${book.slug}`, changefreq: 'monthly', priority: '0.8', image: { loc: book.cover, title: `${book.title}: ${book.subtitle}` } })
    if (book.kit) ROUTES.push({ path: book.kit.path, changefreq: 'monthly', priority: '0.6' })
    // One page per task of the kit (pages/KitItem.jsx). books.json has only
    // the books on sale, so a kit still in development never enters.
    for (const task of book.kit ? (KITS[book.slug]?.TASKS ?? []) : []) {
        ROUTES.push({ path: `${book.kit.path}/${task.id}`, changefreq: 'monthly', priority: '0.6' })
    }
}

// The kits open by their address before their book is on sale (data/kit-book.js):
// the kit and its tasks, never a book page.
for (const [slug, kit] of Object.entries(KITS)) {
    const book = !books.some(onSale => onSale.slug === slug) && kit.open && standInBook(slug, kit)
    if (!book) continue
    ROUTES.push({ path: book.kit.path, changefreq: 'monthly', priority: '0.6' })
    for (const task of kit.TASKS) ROUTES.push({ path: `${book.kit.path}/${task.id}`, changefreq: 'monthly', priority: '0.6' })
}

// The micro-leads: /prompts, /rules and /agents, an index and one page each.
for (const collection of [PROMPTS, RULES, AGENTS]) {
    ROUTES.push({ path: collection.path, changefreq: 'monthly', priority: '0.7' })
    for (const item of collection.items) ROUTES.push({ path: `${collection.path}/${item.slug}`, changefreq: 'monthly', priority: '0.6' })
}

// The alternatives: /alternatives and one page per paid Mac app.
ROUTES.push({ path: ALTERNATIVES.path, changefreq: 'monthly', priority: '0.7' })
for (const item of ALTERNATIVES.items) ROUTES.push({ path: `${ALTERNATIVES.path}/${item.slug}`, changefreq: 'monthly', priority: '0.6' })

// The MCP connectors: /mcp and one page per connector.
ROUTES.push({ path: MCP.path, changefreq: 'weekly', priority: '0.7' })
for (const item of MCP.items) ROUTES.push({ path: `${MCP.path}/${item.id}`, changefreq: 'monthly', priority: '0.6' })

const registry = await readFile(join(ROOT, 'public', 'tools.json'), 'utf-8')
    .then(JSON.parse)
    .catch(() => ({ tools: [] }))
for (const tool of registry.tools) {
    // A tool's gallery images (pages.json `images`) ride with their page, as
    // image entries: image search reads them from here.
    const gallery = images => images?.map(image => ({ loc: image.src, title: image.alt }))
    ROUTES.push({ path: `/tools/${tool.id}`, changefreq: 'monthly', priority: '0.7', images: gallery(tool.images) })
    // As páginas de busca (`apps/<id>/pages.json` no repositório tools).
    for (const page of tool.pages ?? []) {
        ROUTES.push({ path: new URL(page.url).pathname, changefreq: 'monthly', priority: '0.5', images: gallery(page.images) })
    }
}

const today = new Date().toISOString().split('T')[0]

const urls = ROUTES.map(
    route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${[...(route.image ? [route.image] : []), ...(route.images ?? [])]
        .map(
            image => `
    <image:image>
      <image:loc>${BASE_URL}${image.loc}</image:loc>
      <image:title>${image.title.replaceAll('&', '&amp;')}</image:title>
    </image:image>`
        )
        .join('')}
  </url>`
).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`

await writeFile(join(ROOT, 'public', 'sitemap.xml'), sitemap, 'utf-8')
console.log(`sitemap.xml gerado com ${ROUTES.length} URLs`)
