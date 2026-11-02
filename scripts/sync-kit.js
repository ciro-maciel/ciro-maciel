/**
 * The online kit of a profession book (level 4 of the series), copied from
 * the `learning` repository into this site.
 *
 *   bun scripts/sync-kit.js [slug]        (default: forward-deployed-engineer)
 *
 * WHY GENERATED. A profession book ends every chapter with a document to fill
 * in (the "Na prática" section: "**O artefato — …**" and a code block). The
 * kit page lets the reader fill those documents in the browser, so it must
 * carry them word for word. Copying them by hand would drift the first time a
 * chapter is rewritten; this script reads them from the chapters instead.
 * Same reason as sync-books.js for committing the output: the CI that deploys
 * this site never checks out `learning`.
 *
 * What it writes, src/data/kit-<slug>.json:
 *
 *   book       title, subtitle, volume, level
 *   parts      the book's parts, each chapter with its number, title,
 *              question, the document (name and text), what it is for (the
 *              table in the chapter "O kit") and the exercise
 *   resources  the lists of the chapter "O kit" (documentation, evals,
 *              interviews, courses, books), each item with its link, and the
 *              date they were checked
 */
import { YAML } from 'bun'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BOOKS_DIR = resolve(process.env.BOOKS_DIR || join(ROOT, '..', 'learning'))
const slug = process.argv[2] || 'forward-deployed-engineer'
const dir = join(BOOKS_DIR, slug)

function fail(message) {
    console.error(`✗ sync-kit: ${message}`)
    process.exit(1)
}

if (!existsSync(dir)) fail(`${dir} não existe (defina BOOKS_DIR)`)

const meta = YAML.parse(readFileSync(join(dir, 'book.yml'), 'utf-8'))
const refs = YAML.parse(readFileSync(join(BOOKS_DIR, 'research', 'referencias.yaml'), 'utf-8'))
const refUrl = Object.fromEntries((refs.references ?? refs).map(ref => [ref.id, ref.URL]))

function chapter(id) {
    const text = readFileSync(join(dir, 'chapters', `${id}.md`), 'utf-8')
    const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    return { front: YAML.parse(match[1]), body: match[2] }
}

// Markdown that survives in the kit as plain text: no emphasis marks, no
// citation keys (the kit lists its sources apart).
const plain = text =>
    text
        .replace(/\s*\[@[^\]]+\]/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/[ \t]*\n(?!\n)/g, ' ')
        .replace(/\n{2,}/g, '\n\n')
        .trim()

const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1)

/** The "Na prática" section: the document after "**O artefato", and the exercise. */
function practice(id, body) {
    const section = body.match(/\n## Na prática\n([\s\S]*?)(?=\n## |$)/)?.[1]
    if (!section) fail(`${id}: sem "## Na prática"`)
    const marker = section.match(/\*\*O artefato\s*[—-]\s*([^*]+?)[.:]?\*\*/)
    if (!marker) fail(`${id}: sem "**O artefato — …**"`)
    const after = section.slice(marker.index)
    const block = after.match(/```[a-z]*\n([\s\S]*?)```/)
    if (!block) fail(`${id}: sem bloco depois do artefato`)
    const exercise = section.match(/\*\*O exercício[.:]?\*\*:?\s*([\s\S]*?)$/)?.[1]
    const name = marker[1].trim()
    return {
        name: capitalize(name),
        text: block[1].replace(/\s+$/, ''),
        exercise: exercise ? capitalize(plain(exercise)) : null,
    }
}

// What each document is for, from the table of the chapter "O kit".
const kitBody = chapter('o-kit').body
const purpose = {}
for (const row of kitBody.matchAll(/^\| *([0-9]+) *\| *([^|]+?) *\| *([^|]+?) *\| *([^|]+?) *\|$/gm)) {
    purpose[row[2].trim()] = row[4].trim()
}

let number = 0
const parts = (meta.parts ?? []).map(part => ({
    title: part.title,
    chapters: part.chapters.map(id => {
        number += 1
        const { front, body } = chapter(id)
        return {
            id,
            number,
            title: front.title,
            question: front.question ?? null,
            purpose: purpose[front.title] ?? null,
            document: practice(id, body),
        }
    }),
}))

// The resource lists: every "## " section of "O kit" after the table, but
// "O que ficou fora", which is a note and not a list.
const resources = []
for (const [, title, text] of kitBody.matchAll(/\n## ([^\n]+)\n([\s\S]*?)(?=\n## |$)/g)) {
    if (/artefatos|ficou fora/i.test(title)) continue
    const items = [...text.matchAll(/^- (.+)$/gm)].map(([, line]) => {
        const key = line.match(/\[@([^\]]+)\]/)?.[1]
        const domain = line.match(/\(([a-z0-9.-]+\.[a-z]{2,}(?:\/[^)\s]*)?)\)/)?.[1]
        const href = (key && refUrl[key]) || (domain ? `https://${domain}` : null)
        const name = line.match(/\*\*([^*]+)\*\*/)?.[1] ?? null
        return { name, text: plain(line.replace(/\s*\(([a-z0-9.-]+\.[a-z]{2,}(?:\/[^)\s]*)?)\)/, '')), href }
    })
    const intro = plain(text.split(/\n- /)[0])
    if (items.length) resources.push({ title, intro: intro || null, items })
}

const checkedOn = kitBody.match(/aberto em ([0-9]+ de [a-zç]+ de [0-9]{4})/)?.[1] ?? null

const out = {
    slug,
    book: {
        title: meta.title,
        subtitle: meta.subtitle,
        volume: meta.series?.number ?? null,
        level: meta.series?.level ?? null,
        levelName: meta.series?.level_name ?? null,
        version: meta.version,
    },
    parts,
    resources,
    checkedOn,
}

const file = join(ROOT, 'src', 'data', `kit-${slug}.json`)
writeFileSync(file, `${JSON.stringify(out, null, 2)}\n`)
const docs = parts.flatMap(part => part.chapters).length
console.log(`✓ sync-kit: ${slug} · ${docs} documentos · ${resources.reduce((n, r) => n + r.items.length, 0)} recursos → ${file.replace(`${ROOT}/`, '')}`)
