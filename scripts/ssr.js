/**
 * EVERY PAGE OF THE SITE, WRITTEN AS THE READER SEES IT.
 *
 *   bun scripts/ssr.js        (the last step of `postbuild`)
 *
 * The prerender steps write each page's text inside #root as plain HTML, for
 * crawlers and for the Markdown twins (agent-files.js reads it). That text has
 * none of the site's classes, so on a phone on a slow network the reader saw
 * it unstyled for seconds, until the 1 MB bundle arrived and React replaced
 * it with the real page (13/10/2026: 2.4 s of plain text, the site at 7.3 s).
 *
 * This step runs after the twins are written. For every page of this app it
 * renders the same React tree in the build (src/entry-server.jsx, built by
 * `vite build --ssr` into dist-ssr/) and puts it inside #root, marked
 * `data-ssr`. The first paint is the final page; main.jsx sees the mark and
 * hydrates instead of redrawing.
 *
 * What it leaves alone: the tools (their own apps, under dist/tools/<id>/) and
 * the addresses that only redirect (/privacy, /kit/<id>, …), which keep their
 * text and still mount with `createRoot`.
 */
process.env.NODE_ENV = 'production'

import { readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

const { render } = await import(join(ROOT, 'dist-ssr', 'entry-server.js'))

// The app's own entry: a page that loads another script is a tool.
const shell = await readFile(join(DIST, 'index.html'), 'utf8')
const entry = shell.match(/<script type="module" crossorigin src="(\/assets\/index-[^"]+\.js)"><\/script>/)?.[1]
if (!entry) throw new Error('ssr: the app entry script was not found in dist/index.html')

// Addresses that only send the reader somewhere else: rendered, they are empty.
const REDIRECTS = [/^\/privacy$/, /^\/politica-de-privacidade$/, /^\/kit\//, /^\/solutions\//]

const ROOT_DIV = /<div id="root">[\s\S]*<\/div>(\s*<\/body>)/

async function pages(dir) {
    const found = []
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) found.push(...(await pages(path)))
        else if (entry.name === 'index.html') found.push(path)
    }
    return found
}

const files = [...(await pages(DIST)).map(file => [file, `/${relative(DIST, dirname(file))}`.replace(/\/$/, '') || '/']), [join(DIST, '404.html'), '/404']]

let written = 0
for (const [file, url] of files) {
    const html = await readFile(file, 'utf8')
    if (!html.includes(`src="${entry}"`) || REDIRECTS.some(pattern => pattern.test(url))) continue
    if (!ROOT_DIV.test(html)) throw new Error(`ssr: #root not found in ${relative(DIST, file)}`)
    const app = await render(url)
    await writeFile(file, html.replace(ROOT_DIV, (_, end) => `<div id="root" data-ssr>${app}</div>${end}`))
    written++
}

console.log(`[ssr] ${written} pages rendered by React in the build`)
