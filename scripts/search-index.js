/**
 * THE INDEX OF THE SITE'S SEARCH, written into dist/search.json.
 *
 *   bun scripts/search-index.js     (after agent-files.js, in `postbuild`)
 *
 * ONE SOURCE, THE MARKDOWN TWINS. agent-files.js writes a `.md` of every
 * prerendered page from the text the reader sees, so the search reads the
 * same words as the page and as an agent: a book, a kit task or a prompt that
 * goes live is searchable on the next build, with nothing to register here.
 * The tools have no twin (each is its own app), so they come from the
 * registry the build already writes (public/tools.json).
 *
 * WHY A FILE AND NOT A MODULE. The kits alone are thousands of lines: bundled,
 * they would weigh on every visit to the home. The file is fetched the first
 * time someone opens the search (src/search/useSiteSearch.js).
 *
 * In `bun run dev` there are no twins: the search answers with the tools only.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

// Pages that repeat another one or are not a destination
const SKIP = new Set(['/404', '/privacy'])

// How much of a page's text enters the index: enough for the snippet and the
// words of the body, not the whole kit (the file stays under ~200KB)
const BODY_LIMIT = 2400

// What a result is, by its address. The first match wins.
export const KIND_OF_PATH = [
    [/^\/books\/[^/]+\/kit\/[^/]+$/, 'task'],
    [/^\/books\/[^/]+\/kit$/, 'kit'],
    [/^\/books\/[^/]+$/, 'book'],
    [/^\/prompts\/[^/]+$/, 'prompt'],
    [/^\/rules\/[^/]+$/, 'rule'],
    [/^\/agents\/[^/]+$/, 'agent'],
    [/^\/alternatives\/[^/]+$/, 'alternative'],
    [/^\/mcp\/[^/]+$/, 'mcp'],
    [/^\/legal\//, 'legal'],
]

export const kindOf = path => KIND_OF_PATH.find(([pattern]) => pattern.test(path))?.[1] ?? 'page'

async function twins(dir) {
    const found = []
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) {
            // The tools' own apps and the agent cards are not pages of the site
            if (entry.name === '.well-known' || relative(DIST, path).startsWith('tools/')) continue
            found.push(...(await twins(path)))
        } else if (entry.name === 'index.md' || (dir === DIST && entry.name.endsWith('.md'))) found.push(path)
    }
    return found
}

const frontMatter = (text, key) => text.match(new RegExp(`^${key}: "((?:[^"\\\\]|\\\\.)*)"`, 'm'))?.[1]?.replace(/\\"/g, '"') ?? ''

// Markdown to the words a person reads: no links' addresses, no marks
export function plain(markdown) {
    return markdown
        .replace(/```[\s\S]*?```/g, block => block.replace(/```\w*/g, ' '))
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^\s*[-*]\s+/gm, '')
        .replace(/[*_`>|]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

/**
 * One twin into one document of the index.
 * @returns {{ path, kind, title, description, context, body } | null}
 */
export function documentOf(path, markdown) {
    if (SKIP.has(path)) return null
    const [, head = '', content = markdown] = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? []
    // The page's own heading reads better than the <title>, which carries the site's name
    const heading = content.match(/^# (.+)$/m)?.[1]
    // The home's heading is the hero's sentence: as a result it reads as the name of the place
    const title = path === '/' ? 'Página inicial' : plain(heading || frontMatter(head, 'title').replace(/ — Ciro Cesar Maciel$/, ''))
    if (!title) return null
    // The line above the heading, when the page has one, says where it lives ("Kit online · IA no escritório")
    const above = heading ? content.slice(0, content.indexOf(`# ${heading}`)).trim() : ''
    const context = above && !above.includes('\n') ? plain(above) : ''
    const body = plain(heading ? content.slice(content.indexOf(`# ${heading}`) + heading.length + 2) : content)
    return { path, kind: kindOf(path), title, description: frontMatter(head, 'description').replace(/…$/, ''), context, body: body.slice(0, BODY_LIMIT) }
}

export function toolDocuments(registry) {
    const tools = Array.isArray(registry) ? registry : registry.tools || []
    return tools.map(tool => ({
        path: new URL(tool.url).pathname.replace(/\/?$/, '/'),
        kind: 'tool',
        title: (tool.title?.['pt-BR'] || tool.id).replace(/ by Ciro Cesar Maciel$/, ''),
        description: tool.description?.['pt-BR'] || '',
        context: 'Ferramenta gratuita',
        body: (tool.keywords?.['pt-BR'] || []).join(' '),
    }))
}

async function main() {
    const docs = []
    for (const file of await twins(DIST)) {
        const rel = relative(DIST, file)
        const path = rel === 'index.md' ? '/' : `/${rel.replace(/(\/)?index\.md$/, '').replace(/\.md$/, '')}`
        const doc = documentOf(path, await readFile(file, 'utf8'))
        if (doc) docs.push(doc)
    }
    docs.push(...toolDocuments(JSON.parse(await readFile(join(ROOT, 'public', 'tools.json'), 'utf8'))))
    docs.sort((a, b) => a.path.localeCompare(b.path))

    if (docs.length < 50) throw new Error(`search-index: only ${docs.length} documents — the twins were not written?`)
    const json = JSON.stringify(docs)
    await writeFile(join(DIST, 'search.json'), json)
    console.log(`[search-index] ${docs.length} documents, ${Math.round(json.length / 1024)}KB`)
}

if (import.meta.main) await main()
