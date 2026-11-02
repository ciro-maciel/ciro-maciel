/**
 * The books of the series, copied from the `learning` repository into this site.
 *
 *   bun scripts/sync-books.js
 *
 * WHY A COPY AND NOT A BUILD STEP. `learning` is a private repository and the CI
 * that deploys this site only checks out `applications` (see build-tools.js).
 * So the book data, the covers and the online kits are generated here, by
 * hand, and committed: the deploy never needs the other repository. Run it
 * again whenever a book.yml, a cover or a kit changes.
 *
 * What it writes:
 *
 *   src/data/books.json           one entry per book in BOOKS, from its book.yml
 *                                 and the `title` of each chapter
 *   public/books/<slug>.jpg       the KDP cover, 600 px wide
 *
 * THE ONLINE KIT IS NOT COPIED (since 01/10/2026). It is a page of this site,
 * /books/<slug>/kit, with its content in src/data/kit-<slug>.js; only its
 * path comes from here, the one the book prints (cover.kit.url).
 *
 * ONLY THE BOOKS LISTED BELOW. A book enters the site when it is on sale or
 * about to be; the drafts (FDE, A equipe que não existe) stay out on purpose,
 * as `brand/arquitetura.md` asks of anything not yet live.
 */
import { YAML } from 'bun'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BOOKS_DIR = resolve(process.env.BOOKS_DIR || join(ROOT, '..', 'learning'))

const BOOKS = ['ia-no-dia-a-dia', 'ia-por-dentro', 'ia-no-escritorio', 'ia-no-primeiro-trabalho', 'ia-no-pequeno-negocio', 'ia-no-atendimento-e-nas-vendas', 'ia-na-sala-de-aula', 'ia-na-contabilidade', 'ia-na-advocacia', 'construir-com-ia', 'feito-para-agentes', 'one-person-business']

function fail(message) {
    console.error(`✗ sync-books: ${message}`)
    process.exit(1)
}

if (!existsSync(BOOKS_DIR)) fail(`${BOOKS_DIR} não existe (defina BOOKS_DIR)`)

/** The `title` in a chapter's front matter. */
function chapterTitle(bookDir, id) {
    const file = join(bookDir, 'chapters', `${id}.md`)
    if (!existsSync(file)) fail(`${file} não existe`)
    const match = readFileSync(file, 'utf-8').match(/^---\n([\s\S]*?)\n---/)
    const front = match ? YAML.parse(match[1]) : {}
    return front.title ?? id
}

const flat = text => String(text ?? '').replace(/\s+/g, ' ').trim()

const out = []
for (const slug of BOOKS) {
    const dir = join(BOOKS_DIR, slug)
    const meta = YAML.parse(readFileSync(join(dir, 'book.yml'), 'utf-8'))
    const chapterIds = meta.parts ? meta.parts.flatMap(p => p.chapters) : meta.chapters
    const kit = meta.cover?.kit ?? null
    const kitPath = kit ? new URL(`https://${kit.url}`).pathname.replace(/\/$/, '') : null

    out.push({
        slug,
        title: meta.title,
        subtitle: meta.subtitle ?? '',
        author: meta.author,
        volume: meta.series.number,
        level: meta.series.level,
        levelName: meta.series.level_name,
        hook: meta.cover.hook,
        summary: flat(meta.summary),
        thisVolume: flat(meta.series.neste_volume),
        bullets: meta.cover.bullets ?? [],
        audience: flat(meta.cover.audience),
        chapters: chapterIds.map(id => chapterTitle(dir, id)),
        cover: `/books/${slug}.jpg`,
        kit: kit ? { label: kit.label, detail: kit.detail, path: kitPath } : null,
    })

    // The cover, 600 px wide: enough for a 2x screen at the 300 px the page shows.
    mkdirSync(join(ROOT, 'public', 'books'), { recursive: true })
    const coverOut = join(ROOT, 'public', 'books', `${slug}.jpg`)
    const sips = spawnSync('sips', ['-Z', '600', join(dir, 'assets', 'cover.jpg'), '--out', coverOut], { stdio: 'ignore' })
    if (sips.status !== 0) copyFileSync(join(dir, 'assets', 'cover.jpg'), coverOut)

}

writeFileSync(join(ROOT, 'src', 'data', 'books.json'), `${JSON.stringify(out, null, 4)}\n`)
console.log(`✓ sync-books: ${out.length} livros, ${out.filter(b => b.kit).length} kit(s)`)
