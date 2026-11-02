#!/usr/bin/env node
/**
 * The Open Graph card (1200x630) of each book, in public/og/books/<slug>.webp (31/10/2026).
 *
 *   node tools/og/books.mjs
 *
 * Until now a book page shared its cover, a portrait 375x600 that the networks crop or shrink.
 * The house card is 1200x630 (generate.mjs, template.html): the same card here, with the series
 * as the title, the book's title and subtitle as the tagline, and the cover where the avatar is.
 * The book pages, their kit and its tasks use it (src/data/seo.js, bookCard).
 *
 * Requirements: Google Chrome and cwebp (brew install webp), as generate.mjs.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '../..')
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const OUT = join(REPO, 'public/og/books')
const LINE = 30 // characters per line of the subtitle, so it stays left of the cover

const b64 = path => readFileSync(path).toString('base64')
const FONT = b64(join(HERE, 'montserrat.woff2'))
const BOLT = b64(join(HERE, 'bolt.png'))
const TEMPLATE = readFileSync(join(HERE, 'template.html'), 'utf8')
const BOOKS = JSON.parse(readFileSync(join(REPO, 'src/data/books.json'), 'utf8'))

const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;')

/** Breaks the subtitle into lines of at most LINE characters, never inside a word. */
function lines(text) {
    const out = ['']
    for (const word of text.split(' ')) {
        const current = out[out.length - 1]
        if (current && `${current} ${word}`.length > LINE) out.push(word)
        else out[out.length - 1] = current ? `${current} ${word}` : word
    }
    return out
}

// The cover stands in the avatar's place: a book, upright, with room around it.
const COVER_CSS = `
    .av { right: 96px; bottom: auto; top: 64px; height: 502px; border: 1px solid #d9dde0; }
    .tag { font-size: 36px; }
    .tag span { white-space: nowrap; }
`

mkdirSync(OUT, { recursive: true })
const work = mkdtempSync(join(tmpdir(), 'og-books-'))
for (const book of BOOKS) {
    const tagline = [`<span><b>${escape(book.title)}</b></span>`, ...lines(book.subtitle).map(line => `<span>${escape(line)}</span>`)].join('')
    const html = TEMPLATE.replaceAll('{{FONT}}', FONT)
        .replaceAll('{{BOLT}}', BOLT)
        .replaceAll('{{TITLE}}', 'O Novo Básico')
        .replaceAll('{{TAGLINE}}', tagline)
        .replaceAll('{{DOMAIN}}', 'ciromaciel.click/books')
        .replace('data:image/webp;base64,{{AVATAR}}', `data:image/jpeg;base64,${b64(join(REPO, 'public', book.cover))}`)
        .replace('</style>', `${COVER_CSS}</style>`)
    const page = join(work, `${book.slug}.html`)
    const png = join(work, `${book.slug}.png`)
    writeFileSync(page, html)
    execFileSync(CHROME, ['--headless', '--disable-gpu', '--force-device-scale-factor=1', '--window-size=1200,630', '--hide-scrollbars', '--virtual-time-budget=8000', `--screenshot=${png}`, `file://${page}`], { stdio: 'ignore' })
    if (!existsSync(png)) throw new Error(`${book.slug}: Chrome não gerou o PNG`)
    execFileSync('cwebp', ['-quiet', '-q', '90', png, '-o', join(OUT, `${book.slug}.webp`)], { stdio: 'ignore' })
    console.log(`ok ${book.slug}`)
}
