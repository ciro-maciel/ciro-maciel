/**
 * The search metadata of the pages that matter, in one place.
 *
 * Read twice: by the pages, through useSeoMeta, while the reader browses; and
 * by scripts/prerender.js after the build, which writes each address as its
 * own index.html with these tags and the page's text already in the HTML.
 * One source, so what a crawler reads and what the browser shows never
 * diverge. Plain data, no React and no icons: the build script imports it.
 *
 * WHAT GOES IN, AND WHAT DOES NOT. Only what the page itself says, from the
 * book.yml and the kit data. No price (brand/arquitetura.md: no price on the
 * root, and a schema.org Offer without a live price would be a guess), no
 * rating, no claim the book does not make.
 */
import BOOKS from './books.json'
import { BOOK_EXTRAS, SERIES } from './book-extras.js'
import { ALTERNATIVES } from './alternatives.js'
import { AWESOME } from './awesome.js'
import { MCP } from './mcp.js'

export const SITE_URL = 'https://ciromaciel.click'
export const AUTHOR = 'Ciro Cesar Maciel'

/** Cut at a word, under `max` characters, for the description tag. */
export function clip(text, max = 158) {
    const clean = String(text).replace(/\s+/g, ' ').trim()
    if (clean.length <= max) return clean
    const cut = clean.slice(0, max)
    return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '')}…`
}

const absolute = path => `${SITE_URL}${path}`
// The share card of a book, 1200x630 (tools/og/books.mjs), since 31/10/2026: a portrait cover was cropped
// or shrunk by every network. The book page, its kit and the kit's tasks share it.
const bookCard = book => absolute(`/og/books/${book.slug}.webp`)
// A search title stays under 65 characters: "Title: subtitle" loses the subtitle's end at a word.
const bookTitle = book => {
    const full = `${book.title}: ${book.subtitle}`
    if (full.length <= 65) return full
    const cut = full.slice(0, 65)
    return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '')
}

export const PERSON = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: AUTHOR,
    url: SITE_URL,
}

// ─── Per page ─────────────────────────────────────────────────────────────

export function booksSeo() {
    return {
        title: `Livros: ${SERIES.name}, a série`,
        description: clip(`${SERIES.title} ${SERIES.description}`),
        url: '/books',
    }
}

export function bookSeo(book) {
    // A book's own search lines, when its keyword research wrote them (book-extras.js `seo`).
    const own = BOOK_EXTRAS[book.slug]?.seo?.book
    return {
        title: own?.title ?? bookTitle(book),
        description: clip(own?.description ?? `${book.hook} ${book.summary}`),
        url: `/books/${book.slug}`,
        image: bookCard(book),
        type: 'book',
    }
}

export function kitSeo(book) {
    // A kit open before its book is on sale carries its own (data/kit-book.js).
    const own = book.seoKit ?? BOOK_EXTRAS[book.slug]?.seo?.kit
    return {
        title: own?.title ?? `Kit online do ${book.title}: pedidos, modelos e checklists`,
        description: clip(own?.description ?? `Os pedidos testados no livro ${book.title}, prontos para preencher e copiar, com os modelos de planilha e de texto, os checklists de conferência e os treinos.`),
        url: `/books/${book.slug}/kit`,
        image: bookCard(book),
    }
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────

export function breadcrumbLd(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: absolute(item.path),
        })),
    }
}

export function seriesLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'BookSeries',
        '@id': `${SITE_URL}/books#series`,
        name: SERIES.name,
        description: SERIES.description,
        url: absolute('/books'),
        inLanguage: 'pt-BR',
        author: PERSON,
        hasPart: BOOKS.map(book => ({ '@id': `${absolute(`/books/${book.slug}`)}#book`, '@type': 'Book', name: book.title, url: absolute(`/books/${book.slug}`) })),
    }
}

export function bookLd(book) {
    const amazon = BOOK_EXTRAS[book.slug]?.amazon
    return {
        '@context': 'https://schema.org',
        '@type': 'Book',
        '@id': `${absolute(`/books/${book.slug}`)}#book`,
        name: book.title,
        alternativeHeadline: book.subtitle,
        description: book.summary,
        abstract: book.hook,
        url: absolute(`/books/${book.slug}`),
        image: absolute(book.cover),
        author: PERSON,
        publisher: PERSON,
        inLanguage: 'pt-BR',
        bookFormat: 'https://schema.org/EBook',
        genre: 'Inteligência artificial',
        position: book.volume,
        isPartOf: { '@type': 'BookSeries', '@id': `${SITE_URL}/books#series`, name: SERIES.name, url: absolute('/books') },
        audience: { '@type': 'Audience', audienceType: book.audience },
        ...(amazon ? { sameAs: [amazon] } : {}),
    }
}

export function kitLd(book) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `Kit online do ${book.title}`,
        url: absolute(`/books/${book.slug}/kit`),
        inLanguage: 'pt-BR',
        description: kitSeo(book).description,
        author: PERSON,
        about: { '@id': `${absolute(`/books/${book.slug}`)}#book` },
        isPartOf: { '@type': 'WebSite', name: AUTHOR, url: SITE_URL },
    }
}

// ─── The micro-leads (docs/2026-10-03-MICRO-ISCAS-A-LISTA.md) ─────────────

/** One task of a task kit, on its own page: /books/<slug>/kit/<task>. */
export function kitTaskSeo(book, task) {
    // A build kit's prompt has no test result: it says what step it belongs to.
    if (!task.result) {
        return {
            title: `${task.name}: o prompt pronto para copiar`,
            description: clip(`${task.name}: o prompt do ${task.chap.toLowerCase()} do livro ${book.title}, pronto para preencher com o seu sistema e copiar, no passo em que ele entra.`),
            url: `/books/${book.slug}/kit/${task.id}`,
            image: bookCard(book),
        }
    }
    return {
        title: `${task.name}: pedido de IA testado`,
        description: clip(`${task.name}: no teste do livro, ${task.result.charAt(0).toLowerCase()}${task.result.slice(1)} O pedido pronto do livro ${book.title}, para preencher e copiar.`),
        url: `/books/${book.slug}/kit/${task.id}`,
        image: bookCard(book),
    }
}

/** One document of a profession kit, on its own page. `bookMeta` is the kit's own book block. */
export function kitDocumentSeo(bookMeta, chapter, slug) {
    return {
        title: `${chapter.document.name}: modelo para preencher`,
        description: clip(`${chapter.purpose ?? chapter.question} O documento do capítulo ${chapter.number} do livro ${bookMeta.title}, para preencher no navegador e copiar.`),
        url: `/books/${slug}/kit/${chapter.id}`,
    }
}

/** /prompts, /rules or /agents. */
export function snippetIndexSeo(collection) {
    return { title: collection.title, description: clip(collection.description), url: collection.path }
}

/** /prompts/<slug>, /rules/<slug> or /agents/<slug>. */
export function snippetSeo(collection, item) {
    return { title: item.title, description: clip(item.description), url: `${collection.path}/${item.slug}` }
}

/** The page of one micro-lead, as schema.org: a WebPage inside the site, by the author. */
export function snippetLd(seo) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seo.title,
        description: seo.description,
        url: absolute(seo.url),
        inLanguage: 'pt-BR',
        author: PERSON,
        isPartOf: { '@type': 'WebSite', name: AUTHOR, url: SITE_URL },
    }
}

// ─── The awesome lists (data/awesome.js) ──────────────────────────────────

/** /awesome. */
export function awesomeSeo() {
    return { title: 'Listas awesome', description: clip(AWESOME.description), url: AWESOME.path }
}

// ─── The alternatives (data/alternatives.js) ──────────────────────────────

/** /alternatives. */
export function alternativesIndexSeo() {
    return { title: ALTERNATIVES.title, description: clip(ALTERNATIVES.description), url: ALTERNATIVES.path }
}

/** /alternatives/<slug>. */
export function alternativeSeo(item) {
    return { title: item.title, description: clip(item.description), url: `${ALTERNATIVES.path}/${item.slug}` }
}

/**
 * The questions of one alternative page, as schema.org FAQPage: only the
 * questions and answers the page shows, word for word.
 */
export function faqLd(item) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: item.faq.map(entry => ({
            '@type': 'Question',
            name: entry.question,
            acceptedAnswer: { '@type': 'Answer', text: entry.answer },
        })),
    }
}

/** The free app an alternative page recommends, as schema.org SoftwareApplication. */
export function appLd(app) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: app.name,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: app.operatingSystem,
        url: absolute(app.toolPath),
        sameAs: [app.repo],
        isAccessibleForFree: true,
        license: 'https://opensource.org/licenses/MIT',
        author: PERSON,
    }
}

// ─── The MCP connectors (data/mcp.js) ────────────────────────────────────

/** /mcp. */
export function mcpIndexSeo() {
    return { title: MCP.title, description: clip(MCP.description), url: MCP.path }
}

/** /mcp/<id>. */
export function mcpSeo(item) {
    // The connector's own page at <id>.mcp.myagents.click is the one that answers the search (05/11/2026):
    // this page points the search engines there instead of competing with it for the same query.
    const canonical = /^https:\/\/[a-z0-9-]+\.mcp\.myagents\.click\/?$/.test(item.homepage ?? '') ? item.homepage : undefined
    return { title: `${item.title}: conector MCP`, description: clip(`${item.details.headline} ${item.details.lede}`), url: `${MCP.path}/${item.id}`, canonical }
}

/** A connector, as schema.org SoftwareApplication: what its page says, nothing more. */
export function mcpLd(item) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: `${item.title} MCP`,
        applicationCategory: 'DeveloperApplication',
        description: item.description,
        url: absolute(`${MCP.path}/${item.id}`),
        sameAs: [item.homepage],
        author: PERSON,
    }
}
