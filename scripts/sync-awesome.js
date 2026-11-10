/**
 * THE AWESOME LISTS, BROUGHT IN (10/11/2026). Runs before every build (package.json, prebuild).
 *
 *   bun scripts/sync-awesome.js
 *
 * Each list lives in its own public repository (github.com/ciro-maciel/awesome-<theme>). This reads
 * two files of each: data/list.json (the intro and what each section is about, written by hand) and
 * dist/pt.json (the items with their short links, written by the list's build), and writes the
 * Portuguese of all of them to src/data/awesome-lists.json, which /awesome/<slug> renders and
 * prerender.js writes as HTML. A list that does not answer keeps what the file already had, so a
 * GitHub hiccup never empties a page; the file is committed for the same reason.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { awesomeLists } from '../src/data/awesome.js'

const OUT = new URL('../src/data/awesome-lists.json', import.meta.url).pathname
const raw = (slug, path) => `https://raw.githubusercontent.com/ciro-maciel/${slug}/main/${path}`

let previous = {}
try {
    previous = JSON.parse(readFileSync(OUT, 'utf8'))
} catch {}

const get = async url => {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`${response.status} ${url}`)
    return response.json()
}

const result = {}
for (const list of awesomeLists()) {
    try {
        const [source, built] = await Promise.all([get(raw(list.slug, 'data/list.json')), get(raw(list.slug, 'dist/pt.json'))])
        const about = Object.fromEntries(source.categories.map(category => [category.id, category.description ?? '']))
        result[list.slug] = {
            slug: list.slug,
            title: built.title,
            description: built.description,
            intro: source.intro ?? '',
            updated: built.updated,
            count: built.categories.reduce((sum, category) => sum + category.items.length, 0),
            categories: built.categories.map(category => ({
                id: category.id,
                title: category.title,
                description: about[category.id] ?? '',
                items: category.items.map(item => ({
                    name: item.name,
                    link: item.link ?? item.url,
                    description: item.description,
                    tags: item.tags ?? [],
                    ours: Boolean(item.ours),
                })),
            })),
        }
    } catch (error) {
        if (previous[list.slug]) result[list.slug] = previous[list.slug]
        console.warn(`! ${list.slug}: ${error.message}${previous[list.slug] ? ', kept the previous copy' : ', left out'}`)
    }
}

writeFileSync(OUT, JSON.stringify(result, null, 2) + '\n')
const total = Object.values(result).reduce((sum, list) => sum + list.count, 0)
console.log(`ok awesome: ${Object.keys(result).length} lists, ${total} items`)
