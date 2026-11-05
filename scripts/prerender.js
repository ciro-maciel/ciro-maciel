/**
 * The pages that bring people from search, each written as its own HTML.
 *
 *   bun scripts/prerender.js        (run by `postbuild`, after prerender-legal)
 *
 * The site is a single-page app: without JavaScript, every address is the
 * same shell, with the home's title and an empty <div id="root">. A crawler
 * that does not run JavaScript, or the preview of a link shared in a chat,
 * sees nothing of the book it was sent to. So, after the build, each page
 * below is written to dist/<path>/index.html: the shell with that page's
 * title, description, canonical, Open Graph and Twitter tags, its JSON-LD,
 * and its text inside #root. The Hoster serves that file for the address, and
 * React replaces the text with the page as soon as it loads — the same
 * pattern as scripts/prerender-legal.js.
 *
 * The words come from the same modules the pages read (src/data/seo.js,
 * books.json, book-extras.js, the kit data, public/tools.json), so the HTML a
 * crawler reads and the page a reader sees say the same thing.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import BOOKS from '../src/data/books.json'
import { BOOK_EXTRAS, SERIES, amazonSearch } from '../src/data/book-extras.js'
import { AUTHOR, SITE_URL, bookLd, bookSeo, booksSeo, breadcrumbLd, clip, kitLd, kitSeo, kitTaskSeo, seriesLd, snippetIndexSeo, snippetLd, snippetSeo, alternativeSeo, alternativesIndexSeo, appLd, faqLd, mcpIndexSeo, mcpSeo, mcpLd } from '../src/data/seo.js'
import ESC from '../src/data/kit-ia-no-escritorio.js'
import EMP from '../src/data/kit-ia-no-primeiro-trabalho.js'
import ATD from '../src/data/kit-ia-no-atendimento-e-nas-vendas.js'
import SAL from '../src/data/kit-ia-na-sala-de-aula.js'
import CTB from '../src/data/kit-ia-na-contabilidade.js'
import ADV from '../src/data/kit-ia-na-advocacia.js'
import NEG from '../src/data/kit-ia-no-pequeno-negocio.js'
import CCI from '../src/data/kit-construir-com-ia.js'
import FPA from '../src/data/kit-feito-para-agentes.js'
import { bookHome, standInBook } from '../src/data/kit-book.js'
import { PROMPTS } from '../src/data/prompts.js'
import { RULES } from '../src/data/rules.js'
import { AGENTS } from '../src/data/agents.js'
import { ALTERNATIVES, alternativesByApp } from '../src/data/alternatives.js'
import { LINE_TOOLS } from '../src/data/line-tools.js'
import { MCP, mcpSiblings } from '../src/data/mcp.js'
import { HERO, LINES, MCP_HOME, SHIFT, TOOLS } from '../src/data/site.js'

// The task kits, by book (pages/BookKit.jsx keeps the same map).
const KITS = { 'ia-no-escritorio': ESC, 'ia-no-primeiro-trabalho': EMP, 'ia-no-pequeno-negocio': NEG, 'ia-no-atendimento-e-nas-vendas': ATD, 'ia-na-sala-de-aula': SAL, 'ia-na-contabilidade': CTB, 'ia-na-advocacia': ADV, 'construir-com-ia': CCI, 'feito-para-agentes': FPA }

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

const escape = text =>
    String(text ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')

const STYLE = 'max-width:960px;margin:0 auto;padding:48px 20px;font-family:Montserrat,sans-serif;line-height:1.6;color:#4B5563'
const main = body => `<main class="prerender-static" style="${STYLE}">${body}</main>`
const link = (href, text) => `<a href="${escape(href)}">${escape(text)}</a>`
const list = items => `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`

const HOME_CRUMB = { name: AUTHOR, path: '/' }
const BOOKS_CRUMB = { name: 'Livros', path: '/books' }

/** The shell with one page's head and body. */
function render(shell, { seo, ld = [], body }) {
    const url = `${SITE_URL}${seo.url}`
    const title = `${seo.title} — ${AUTHOR}`
    const image = seo.image ?? `${SITE_URL}/opengraph.webp`
    const meta = (attr, key, value) => [new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`), `$1${escape(value)}$2`]

    const replacements = [
        [/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`],
        meta('name', 'description', seo.description),
        [/(<link rel="canonical" href=")[^"]*(")/, `$1${escape(seo.canonical ?? url)}$2`],
        meta('property', 'og:type', seo.type ?? 'website'),
        meta('property', 'og:url', url),
        meta('property', 'og:title', title),
        meta('property', 'og:description', seo.description),
        meta('property', 'og:image', image),
        meta('name', 'twitter:url', url),
        meta('name', 'twitter:title', title),
        meta('name', 'twitter:description', seo.description),
        meta('name', 'twitter:image', image),
    ]

    let html = shell
    for (const [pattern, value] of replacements) {
        if (!pattern.test(html)) throw new Error(`prerender: ${pattern} not found in dist/index.html`)
        html = html.replace(pattern, value)
    }
    // A cover is portrait, not the 1200 × 630 of the default card: drop the
    // fixed size so no network reads it wrong.
    if (seo.image && !seo.image.includes('/og/')) html = html.replace(/\s*<meta property="og:image:width" content="1200" \/>\s*<meta property="og:image:height" content="630" \/>/, '')

    const scripts = ld.map(data => `<script type="application/ld+json">${JSON.stringify(data)}</script>`).join('\n')
    html = html.replace('</head>', `${scripts}\n</head>`)
    if (!html.includes('<div id="root"></div>')) throw new Error('prerender: <div id="root"></div> not found')
    return html.replace('<div id="root"></div>', `<div id="root">${main(body)}</div>`)
}

async function write(path, html) {
    const file = path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html')
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, html)
    console.log(`[prerender] ${file.replace(DIST, 'dist')}`)
}

// ─── The pages ────────────────────────────────────────────────────────────

const storeOf = book => BOOK_EXTRAS[book.slug]?.amazon ?? amazonSearch(book)

function booksPage() {
    return {
        seo: booksSeo(),
        ld: [seriesLd(), breadcrumbLd([HOME_CRUMB, BOOKS_CRUMB])],
        body: [
            `<p>Livros · ${escape(SERIES.name)}</p>`,
            `<h1>${escape(SERIES.title)}</h1>`,
            `<p>${escape(SERIES.description)}</p>`,
            ...SERIES.levels.map(({ level, text }) => {
                const books = BOOKS.filter(book => book.level === level)
                return `<section><h2>Nível ${level}</h2><p>${escape(text)}</p>${books.length ? list(books.map(book => `${link(`/books/${book.slug}`, book.title)}: ${escape(book.subtitle)}`)) : ''}</section>`
            }),
            `<p>${escape(SERIES.aiNote)}</p>`,
        ].join(''),
    }
}

function bookPage(book) {
    const others = BOOKS.filter(other => other.slug !== book.slug)
    return {
        seo: bookSeo(book),
        ld: [bookLd(book), breadcrumbLd([HOME_CRUMB, BOOKS_CRUMB, { name: book.title, path: `/books/${book.slug}` }])],
        body: [
            `<p>${escape(SERIES.name)} · Volume ${book.volume} · Nível ${book.level}, ${escape(book.levelName)}</p>`,
            `<h1>${escape(book.title)}</h1>`,
            `<p><em>${escape(book.subtitle)}</em></p>`,
            `<p><strong>${escape(book.hook)}</strong></p>`,
            `<p>${escape(book.summary)}</p>`,
            `<p>${link(storeOf(book), 'Ver na Amazon')}${book.kit ? ` · ${link(book.kit.path, 'Abrir o kit online')}` : ''}</p>`,
            `<h2>Para quem é</h2><p>${escape(book.audience)}</p>`,
            `<h2>O que você leva</h2>${list(book.bullets.map(escape))}`,
            `<h2>O que tem dentro</h2><p>${escape(book.thisVolume)}</p><ol>${book.chapters.map(chapter => `<li>${escape(chapter)}</li>`).join('')}</ol>`,
            `<h2>Como foi feito</h2>${list(SERIES.promises.map(escape))}<p>${escape(SERIES.aiNote)}</p>`,
            `<h2>Na série ${escape(SERIES.name)}</h2>${list(others.map(other => `${link(`/books/${other.slug}`, other.title)}: ${escape(other.subtitle)}`))}`,
        ].join(''),
    }
}

// The crumbs down to a kit: the book's page, or only /books while the book is
// not on sale (data/kit-book.js).
const kitCrumbs = book => [HOME_CRUMB, BOOKS_CRUMB, ...(book.isOnSale === false ? [] : [{ name: book.title, path: `/books/${book.slug}` }])]

function kitPage(book) {
    const { TASKS, TEMPLATES, TRAIL, thing = 'sistema' } = KITS[book.slug] ?? ESC
    const home = bookHome(book)
    return {
        seo: kitSeo(book),
        ld: [kitLd(book), breadcrumbLd([...kitCrumbs(book), { name: 'Kit online', path: `/books/${book.slug}/kit` }])],
        body: [
            `<p>${link(home, `${book.kit.label} · ${book.title} · Volume ${book.volume}`)}</p>`,
            `<h1>O kit do ${escape(book.title)}</h1>`,
            TRAIL
                ? `<p>O seu ${thing} preenchido uma vez, e os prompts do livro saem prontos para ele; a trilha dos passos, com o que conferir em cada um.</p><h2>A trilha</h2>${list(TRAIL.map((step, index) => `${escape(step.title)}: ${escape(step.step)}${list(TASKS.filter(task => task.group === index + 1).map(task => link(`/books/${book.slug}/kit/${task.id}`, task.name)))}`))}`
                : `<p>Os pedidos do livro para preencher e copiar, os checklists de conferência, os modelos de planilha e de texto, e o que muda mais rápido do que um livro.</p><h2>Os pedidos, um por tarefa</h2>${list(TASKS.map(task => `${link(`/books/${book.slug}/kit/${task.id}`, task.name)} (${escape(task.chap)}): ${escape(clip(task.result, 200))}`))}`,
            TEMPLATES.length ? `<h2>Modelos para colar</h2>${list(TEMPLATES.map(template => `${escape(template.title)} (${escape(template.chap)})`))}` : '',
            `<p>Este kit acompanha o livro ${link(home, book.title)}, de ${escape(AUTHOR)}.</p>`,
        ].join(''),
    }
}

// One task of a kit on its own page (pages/KitItem.jsx).
function kitTaskPage(book, task) {
    const { TASKS, testedNote, TRAIL, noun = 'pedido' } = KITS[book.slug]
    const seo = kitTaskSeo(book, task)
    const kitPath = `/books/${book.slug}/kit`
    // A build kit (TRAIL) has no test result and lists the prompts of the same step.
    const others = TASKS.filter(other => other.id !== task.id && (!TRAIL || other.group === task.group))
    return {
        seo,
        ld: [snippetLd(seo), breadcrumbLd([...kitCrumbs(book), { name: 'Kit online', path: kitPath }, { name: task.name, path: seo.url }])],
        body: [
            `<p>${link(kitPath, `Kit online · ${book.title}`)}</p>`,
            `<h1>${escape(seo.title)}</h1>`,
            `<p>O ${noun} do livro ${escape(book.title)} para esta tarefa, pronto para preencher e copiar.</p>`,
            task.result ? `<h2>No teste do livro</h2><p>${escape(task.result)}</p><p>${escape(testedNote)}</p>` : '',
            `<h2>O ${noun}</h2><pre>${escape(task.add ? `${task.tpl}\n\n${task.add}` : task.tpl)}</pre>`,
            task.fields.length ? `<h2>O que preencher</h2>${list(task.fields.map(field => `${escape(field.label)}${field.hint ? `: ${escape(field.hint)}` : ''}`))}` : '',
            task.checks.length ? `<h2>Confira</h2>${list(task.checks.map(escape))}` : '',
            task.privacy ? `<h2>Atenção</h2><p>${escape(task.privacy)}</p>` : '',
            others.length ? `<h2>${TRAIL ? `Os outros ${noun}s deste passo` : `Os outros ${noun}s do kit`}</h2>${list(others.map(other => link(`${kitPath}/${other.id}`, other.name)))}` : '',
            `<p>Este ${noun} vem do livro ${link(bookHome(book), book.title)}, de ${escape(AUTHOR)}.</p>`,
        ].join(''),
    }
}

// /prompts, /rules and /agents (pages/Snippet.jsx).
function snippetIndexPage(collection) {
    const seo = snippetIndexSeo(collection)
    return {
        seo,
        ld: [snippetLd(seo), breadcrumbLd([HOME_CRUMB, { name: collection.eyebrow, path: collection.path }])],
        body: [
            `<p>${escape(collection.eyebrow)}</p>`,
            `<h1>${escape(collection.title)}</h1>`,
            `<p>${escape(collection.description)}</p>`,
            list(collection.items.map(item => `${link(`${collection.path}/${item.slug}`, item.label)}: ${escape(item.lead)}`)),
        ].join(''),
    }
}

function snippetPage(collection, item) {
    const seo = snippetSeo(collection, item)
    const others = collection.items.filter(entry => entry.slug !== item.slug)
    return {
        seo,
        ld: [snippetLd(seo), breadcrumbLd([HOME_CRUMB, { name: collection.eyebrow, path: collection.path }, { name: item.label, path: seo.url }])],
        body: [
            `<p>${link(collection.path, collection.eyebrow)}</p>`,
            `<h1>${escape(item.title)}</h1>`,
            `<p>${escape(item.lead)}</p>`,
            `<h2>${escape(collection.codeLabel)}</h2><pre>${escape(item.code)}</pre>`,
            item.never ? `<h2>O que ele nunca faz sozinho</h2>${list(item.never.map(escape))}` : `<h2>Confira</h2>${list(item.checks.map(escape))}`,
            `<h2>${item.test ? 'No teste' : 'De onde veio'}</h2><p>${escape(item.test ?? item.story)}</p>`,
            item.source ? `<p>${escape(item.source)}</p>` : '',
            `<h2>${escape(collection.more)}</h2>${list(others.map(entry => link(`${collection.path}/${entry.slug}`, entry.label)))}`,
        ].join(''),
    }
}

// /alternatives and /alternatives/<slug> (pages/Alternatives.jsx).
const ALTERNATIVES_CRUMB = { name: ALTERNATIVES.eyebrow, path: ALTERNATIVES.path }

function alternativesIndexPage() {
    const seo = alternativesIndexSeo()
    return {
        seo,
        ld: [snippetLd(seo), breadcrumbLd([HOME_CRUMB, ALTERNATIVES_CRUMB])],
        body: [
            `<p>${escape(ALTERNATIVES.eyebrow)}</p>`,
            `<h1>${escape(ALTERNATIVES.title)}</h1>`,
            `<p>${escape(ALTERNATIVES.description)}</p>`,
            ...alternativesByApp().map(({ app, items }) => `<h2>${escape(app.name)}</h2><p>${escape(app.line)}</p>${list(items.map(item => `${link(`${ALTERNATIVES.path}/${item.slug}`, `Alternativa ao ${item.competitor}`)}: ${escape(item.card)}`))}`),
            `<p>${escape(ALTERNATIVES.note)}</p>`,
        ].join(''),
    }
}

// /mcp and /mcp/<id> (pages/Mcp.jsx).
const MCP_CRUMB = { name: 'Conectores MCP', path: MCP.path }

function mcpIndexPage() {
    const seo = mcpIndexSeo()
    return {
        seo,
        ld: [snippetLd(seo), breadcrumbLd([HOME_CRUMB, MCP_CRUMB]), faqLd(MCP)],
        body: [
            `<p>${escape(MCP.eyebrow)} · ${MCP.count} conectores</p>`,
            `<h1>${escape(MCP.title)}</h1>`,
            `<p>${escape(MCP.lead)}</p>`,
            `<h2>${escape(MCP.explain.title)}</h2>${list(MCP.explain.steps.map(step => `<strong>${escape(step.title)}</strong>: ${escape(step.text)}`))}`,
            ...MCP.groups.map(group => `<h2>${escape(group.title)}</h2><p>${escape(group.text)}</p>${list(group.items.map(item => `${link(`${MCP.path}/${item.id}`, item.title)}: ${escape(item.description)}`))}`),
            `<h2>Você no controle</h2>${list(MCP.trust.map(cell => `<strong>${escape(cell.title)}</strong>: ${escape(cell.text)}`))}`,
            `<h2>Perguntas</h2>${MCP.faq.map(entry => `<h3>${escape(entry.question)}</h3><p>${escape(entry.answer)}</p>`).join('')}`,
            `<p>${link(MCP.directory, 'Todos os conectores em mcp.myagents.click')}</p>`,
        ].join(''),
    }
}

function mcpPage(item) {
    const seo = mcpSeo(item)
    const { details } = item
    const siblings = mcpSiblings(item)
    return {
        seo,
        ld: [snippetLd(seo), mcpLd(item), breadcrumbLd([HOME_CRUMB, MCP_CRUMB, { name: item.title, path: seo.url }])],
        body: [
            `<p>${link(MCP.path, 'Conectores MCP')}</p>`,
            `<p>${escape(item.title)} · ${escape(item.line === 'Agents' ? 'Serviço' : item.line)}</p>`,
            `<h1>${escape(details.headline)}</h1>`,
            `<p>${escape(details.lede)}</p>`,
            `<p>Endereço MCP: <code>${escape(item.address)}</code> · ${escape(details.signIn.label)} · ${item.toolCount} ferramentas</p>`,
            details.asks.length ? `<h2>O que perguntar</h2>${list(details.asks.map(ask => escape(ask)))}` : '',
            `<h2>Ferramentas</h2>${list(details.tools.map(tool => `<code>${escape(tool.name)}</code> <strong>${escape(tool.title)}</strong>: ${escape(tool.text)}`))}`,
            `<h2>Os seus dados</h2>${list(details.data.map(cell => `<strong>${escape(cell.title)}</strong>: ${escape(cell.text)}`))}`,
            `<p>${link(item.homepage, 'Página do conector')} · ${link(`${item.homepage}/privacy`, 'Privacidade')} · ${link(`${item.homepage}/terms`, 'Termos')}</p>`,
            siblings.length ? `<h2>Conecte também</h2>${list(siblings.map(other => `${link(`${MCP.path}/${other.id}`, other.title)}: ${escape(other.description)}`))}` : '',
        ].join(''),
    }
}

function alternativePage(item) {
    const seo = alternativeSeo(item)
    const app = ALTERNATIVES.apps[item.app]
    const others = ALTERNATIVES.items.filter(entry => entry.slug !== item.slug && entry.app === item.app)
    const rows = item.compare.map(row => `<li><strong>${escape(row.name)}</strong>: ${escape(app.name)}, ${escape(row.ours)} ${escape(item.competitor)}, ${escape(row.theirs)}</li>`).join('')
    return {
        seo,
        ld: [snippetLd(seo), appLd(app), faqLd(item), breadcrumbLd([HOME_CRUMB, ALTERNATIVES_CRUMB, { name: `Alternativa ao ${item.competitor}`, path: seo.url }])],
        body: [
            `<p>${link(ALTERNATIVES.path, ALTERNATIVES.eyebrow)}</p>`,
            `<h1>${escape(item.title)}</h1>`,
            `<p>${escape(item.lead)}</p>`,
            `<h2>Para quem é</h2><p>${escape(item.forWhom)}</p>`,
            `<h2>O ${escape(app.name)}, em poucas linhas</h2><p>${escape(item.ourApp)}</p>`,
            `<p>${link(`${app.toolPath}#baixar`, `Baixar o ${app.name}`)} · ${link(app.repo, 'Ver o código no GitHub')}</p>`,
            `<p>${escape(app.requirements)}</p>`,
            `<h2>${escape(app.name)} e ${escape(item.competitor)}, lado a lado</h2><ul>${rows}</ul>`,
            `<h2>Onde o ${escape(item.competitor)} é melhor</h2><p>${escape(item.better)}</p>`,
            `<h2>Perguntas</h2>${item.faq.map(entry => `<h3>${escape(entry.question)}</h3><p>${escape(entry.answer)}</p>`).join('')}`,
            `<p>Fonte e data: ${escape(item.sources.note)} ${item.sources.links.map(source => link(source.href, source.label)).join(' · ')}</p>`,
            others.length ? `<h2>O ${escape(app.name)} também substitui</h2>${list(others.map(entry => link(`${ALTERNATIVES.path}/${entry.slug}`, `Alternativa ao ${entry.competitor}`)))}` : '',
            `<p>${link(ALTERNATIVES.path, 'Ver todas as alternativas para Mac')}</p>`,
        ].join(''),
    }
}

async function toolsPage() {
    const registry = await readFile(join(ROOT, 'public', 'tools.json'), 'utf-8')
        .then(JSON.parse)
        .catch(() => ({ tools: [] }))
    const tools = registry.tools ?? []
    const pt = value => (typeof value === 'string' ? value : value?.['pt-BR'] ?? '')
    return {
        seo: { title: TOOLS.subtitle, description: clip(`${TOOLS.title} ${TOOLS.description}`), url: '/tools' },
        ld: [
            {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: TOOLS.title,
                itemListElement: tools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: pt(tool.title), url: `${SITE_URL}/tools/${tool.id}` })),
            },
            breadcrumbLd([HOME_CRUMB, { name: TOOLS.subtitle, path: '/tools' }]),
        ],
        body: [
            `<p>${escape(TOOLS.subtitle)}</p>`,
            `<h1>${escape(TOOLS.title)}</h1>`,
            `<p>${escape(TOOLS.description)}</p>`,
            list(tools.map(tool => `${link(`/tools/${tool.id}`, pt(tool.title))}: ${escape(pt(tool.description))}`)),
            // The lines' free tools (data/line-tools.js), in the HTML a crawler reads before any script.
            `<h2>Nas linhas</h2>`,
            ...LINE_TOOLS.map(group => `<h3>${escape(group.line)}</h3>` + list(group.tools.map(tool => `${link(tool.url, tool.name)}: ${escape(tool.text)}`))),
        ].join(''),
    }
}

// The home keeps the head written in index.html (its title and description
// are the founder's): only the text and the series JSON-LD go in.
function homePage(shell) {
    const page = {
        ld: [seriesLd()],
        body: [
            `<h1>${HERO.titleLines.map(escape).join(' ')}</h1>`,
            `<p>${escape(HERO.description)}</p>`,
            // Desligado em 21/10/2026 com a seção "O que eu vejo" da Home (pages/Home.jsx, SEÇÕES DESLIGADAS)
            // `<h2>${escape(SHIFT.title)}</h2><p>${escape(SHIFT.description)}</p>`,
            `<h2>Livros: ${escape(SERIES.name)}</h2>${list(BOOKS.map(book => `${link(`/books/${book.slug}`, book.title)}: ${escape(book.subtitle)}`))}`,
            `<h2>Infrastructure</h2><p>${link('https://myinfrastructure.click', 'myinfrastructure.click')}</p>`,
            `<h2>${escape(LINES.title)}</h2>${list(LINES.items.map(l => `${link(l.href, l.name)}: ${escape(l.sentence)}`))}`,
            `<h2>${escape(TOOLS.home.title)}</h2><p>${escape(TOOLS.home.description)} ${link('/tools', 'Ver as ferramentas')}</p>`,
            `<h2>${escape(MCP_HOME.home.title)}</h2><p>${escape(MCP_HOME.home.description)} ${link(MCP_HOME.home.cta.href, MCP_HOME.home.cta.label)}</p>`,
        ].join(''),
    }
    const scripts = page.ld.map(data => `<script type="application/ld+json">${JSON.stringify(data)}</script>`).join('\n')
    return shell.replace('</head>', `${scripts}\n</head>`).replace('<div id="root"></div>', `<div id="root">${main(page.body)}</div>`)
}

// ─── Write ────────────────────────────────────────────────────────────────

const shell = await readFile(join(DIST, 'index.html'), 'utf8')
if (!shell.includes('<div id="root"></div>')) throw new Error('prerender: dist/index.html is not the clean shell; run the build first')

await write('/books', render(shell, booksPage()))
for (const book of BOOKS) {
    await write(`/books/${book.slug}`, render(shell, bookPage(book)))
    if (book.kit) await write(book.kit.path, render(shell, kitPage(book)))
    // Only live books are in BOOKS, so a kit of a book not yet on sale never
    // gets a page here (brand/arquitetura.md).
    for (const task of book.kit ? (KITS[book.slug]?.TASKS ?? []) : []) {
        await write(`/books/${book.slug}/kit/${task.id}`, render(shell, kitTaskPage(book, task)))
    }
}
// The kits open by their address before their book is on sale: the kit and
// its tasks, never a book page (data/kit-book.js).
for (const [slug, kit] of Object.entries(KITS)) {
    const book = !BOOKS.some(onSale => onSale.slug === slug) && kit.open && standInBook(slug, kit)
    if (!book) continue
    await write(book.kit.path, render(shell, kitPage(book)))
    for (const task of kit.TASKS) await write(`${book.kit.path}/${task.id}`, render(shell, kitTaskPage(book, task)))
}
for (const collection of [PROMPTS, RULES, AGENTS]) {
    await write(collection.path, render(shell, snippetIndexPage(collection)))
    for (const item of collection.items) await write(`${collection.path}/${item.slug}`, render(shell, snippetPage(collection, item)))
}
await write(ALTERNATIVES.path, render(shell, alternativesIndexPage()))
for (const item of ALTERNATIVES.items) await write(`${ALTERNATIVES.path}/${item.slug}`, render(shell, alternativePage(item)))
await write(MCP.path, render(shell, mcpIndexPage()))
for (const item of MCP.items) await write(`${MCP.path}/${item.id}`, render(shell, mcpPage(item)))
await write('/tools', render(shell, await toolsPage()))
// Three pages the router draws with no head of their own until 31/10/2026: they carried the home's
// canonical and description. Each gets its own head and an h1 with what it is.
for (const page of [
    { url: '/branding', title: 'Marca', description: 'Logotipo, símbolo, cores e tipografia — os arquivos e as regras para exibir a marca Ciro Cesar Maciel do jeito certo.' },
    { url: '/design-system', title: 'Design system', description: 'O design system que este site usa: princípios, tokens, a API dos componentes e o prompt para agentes.' },
    { url: '/legal/security', title: 'Segurança', description: 'Como este site é operado e o que fazer ao encontrar uma vulnerabilidade.' },
]) await write(page.url, render(shell, { seo: page, body: `<h1>${escape(page.title)}</h1><p>${escape(page.description)}</p>` }))
// The home last: dist/index.html is the shell every other page was made from.
await write('/', homePage(shell))
