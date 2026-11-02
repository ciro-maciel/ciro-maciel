/**
 * THE TOOLS, WRITTEN OUT AS THE READER SEES THEM.
 *
 *   bun scripts/prerender-tools.js     (run by `postbuild`, after build-tools.js apps)
 *
 * Each tool is a React app: its HTML arrived with a gray skeleton and, on the
 * search pages, a short text kept off screen for crawlers. A crawler that does
 * not run JavaScript (Bing, Brave, the chat assistants that search them) read
 * about 500 characters per page, and 229 of the 234 addresses of the site were
 * unknown to Google on 09/10/2026 (applications/docs/2026-10-09-generate-background-seo.md).
 * Text kept off screen for crawlers is also what our own SEO rules forbid.
 *
 * So this step serves `dist` the way the Hoster does, opens every tool page and
 * every search page in a headless Chromium, waits for the app to draw, and
 * writes what is inside `#main` back into that page's HTML, together with the
 * style rules the app added at run time. The HTML now holds exactly what the
 * screen shows. The app still mounts with `createRoot` and redraws the same
 * thing on top.
 *
 * Without Chromium on this machine the step warns and leaves the skeleton;
 * in CI (TOOLS_REPO_DIR set) a failure fails the build.
 *
 * ONLY THE TOOLS THAT CHANGED (16/10/2026). build-tools.js takes the
 * unchanged ones from `.cache/tools`, already prerendered, and lists the
 * others in the manifest. Only those open here, and each one that comes out
 * whole is stored in the cache for the next build. When nothing changed,
 * Chromium does not even start — in CI it is installed here, on demand,
 * instead of on every deploy.
 */
import { spawnSync } from 'node:child_process'
import { readFile, writeFile, access, cp, mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CACHE_DIR, MANIFEST } from './build-tools.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const STRICT = Boolean(process.env.TOOLS_REPO_DIR)
const PORT = 4791
const PARALLEL = 4

const exists = path =>
    access(path).then(
        () => true,
        () => false
    )

function fail(message) {
    if (STRICT) {
        console.error(`✗ prerender-tools: ${message}`)
        process.exit(1)
    }
    console.warn(`⚠ prerender-tools: ${message}`)
}

const OPEN = '<!--main-->'
const CLOSE = '<!--/main-->'

/** What the Hoster does: the file, the folder's index.html, else the site's root index.html. */
function serve() {
    return Bun.serve({
        port: PORT,
        async fetch(request) {
            const path = decodeURIComponent(new URL(request.url).pathname)
            for (const candidate of [path, join(path, 'index.html')]) {
                const file = Bun.file(join(DIST, candidate))
                if (!candidate.endsWith('/') && (await file.exists()) && file.size) return new Response(file)
            }
            return new Response(Bun.file(join(DIST, 'index.html')))
        },
    })
}

/** Every address to write: each tool and each of its search pages. */
async function addresses() {
    const { tools } = JSON.parse(await readFile(join(DIST, 'tools.json'), 'utf-8'))
    const list = []
    for (const tool of tools) {
        const base = `/tools/${tool.id}`
        if (!(await exists(join(DIST, base, 'index.html')))) continue
        list.push({ id: tool.id, path: base, file: join(DIST, base, 'index.html') })
        for (const page of tool.pages ?? []) {
            const path = new URL(page.url).pathname
            list.push({ id: tool.id, path, file: join(DIST, path, 'index.html') })
        }
    }
    return list
}

/** Opens one page and returns what the app drew, or throws. */
async function capture(browser, path) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    // The tools carry the site's Analytics script (build-tools.js): a capture
    // is not a visit.
    await page.route('**/analytics.worker.myoperations.click/**', route => route.abort())
    try {
        await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'load', timeout: 60000 })
        await page.waitForFunction(() => document.querySelector('#main') && !document.querySelector('#main .boot') && document.querySelector('#main').children.length, null, { timeout: 20000 })
        await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {})
        await page.waitForTimeout(400)
        return await page.evaluate(() => {
            // The rules the app added at run time (Mantine's variables, the kit's
            // emotion styles). In production emotion writes through the CSSOM, so
            // the text is read from the sheet, not from the tag.
            const styles = [...document.head.querySelectorAll('style')]
                // Everything the app added: Mantine writes its color variables in a
                // style tag with no attribute at all. The skeleton's own style and an
                // earlier prerender are left out.
                .filter(s => !s.hasAttribute('data-prerendered') && !s.textContent.includes('.boot{'))
                .map(s => {
                    let css = ''
                    try {
                        css = [...s.sheet.cssRules].map(rule => rule.cssText).join('\n')
                    } catch {
                        css = s.textContent
                    }
                    return css
                })
                .filter(Boolean)
                .join('\n')
            return {
                main: document.querySelector('#main').innerHTML,
                styles,
                scheme: document.documentElement.getAttribute('data-mantine-color-scheme'),
            }
        })
    } finally {
        await page.close()
    }
}

function write(html, { main, styles, scheme }) {
    const start = html.indexOf(OPEN),
        end = html.indexOf(CLOSE)
    if (start < 0 || end < 0) throw new Error('no <!--main--> markers')
    let out = html.slice(0, start + OPEN.length) + main + html.slice(end)
    // The style rules go before the app's own stylesheet loads, and `</` cannot close the tag early.
    if (styles) out = out.replace('</head>', `<style data-prerendered>${styles.replaceAll('</', '<\\/')}</style>\n</head>`)
    // Mantine's light-scheme variables hang on this attribute of <html>, which the app sets with
    // JavaScript; without it the dark buttons render transparent. Only the <html> tag is checked:
    // the same words appear inside the page's own CSS.
    const htmlTag = out.match(/<html[^>]*>/)?.[0] ?? ''
    if (scheme && !htmlTag.includes('data-mantine-color-scheme')) out = out.replace(htmlTag, htmlTag.replace('<html', `<html data-mantine-color-scheme="${scheme}"`))
    return out
}

// In CI the browser is installed only by a build that has something to render
async function launch(chromium) {
    try {
        return await chromium.launch()
    } catch (error) {
        if (!process.env.CI) throw error
        console.log('· prerender-tools: installing Chromium')
        const install = spawnSync('bunx', ['playwright', 'install', '--with-deps', 'chromium'], { stdio: 'inherit' })
        if (install.status !== 0) throw error
        return chromium.launch()
    }
}

// The tools this build compiled (build-tools.js); without the manifest, all of them
async function changedTools() {
    const manifest = JSON.parse(await readFile(MANIFEST, 'utf-8').catch(() => 'null'))
    return manifest ? manifest.misses : null
}

// A tool that came out whole goes to the cache, replacing its older versions
async function store(misses, errors) {
    for (const { id, key } of misses) {
        if (errors.some(error => error.startsWith(`/tools/${id}:`) || error.startsWith(`/tools/${id}/`))) continue
        await rm(join(CACHE_DIR, id), { recursive: true, force: true })
        await mkdir(join(CACHE_DIR, id), { recursive: true })
        await cp(join(DIST, 'tools', id), join(CACHE_DIR, id, key), { recursive: true })
    }
    if (misses.length) console.log(`✓ ${misses.length} ferramenta(s) guardada(s) no cache`)
}

async function main() {
    const misses = await changedTools()
    const list = (await addresses()).filter(item => !misses || misses.some(tool => tool.id === item.id))
    if (!list.length) return console.log(misses ? '✓ prerender-tools: nenhuma ferramenta mudou, o HTML veio do cache' : '· prerender-tools: no tools in dist')

    let chromium
    try {
        ;({ chromium } = await import('playwright'))
    } catch {
        return fail('playwright is not installed; the tools keep the skeleton')
    }

    const server = serve()
    let browser
    try {
        browser = await launch(chromium)
    } catch (error) {
        server.stop(true)
        return fail(`Chromium did not start (${error.message.split('\n')[0]}); run \`bunx playwright install chromium\``)
    }

    const errors = []
    let done = 0,
        chars = 0
    const queue = [...list]
    await Promise.all(
        Array.from({ length: PARALLEL }, async () => {
            for (let item = queue.shift(); item; item = queue.shift()) {
                try {
                    const html = await readFile(item.file, 'utf-8')
                    // One retry: a page that times out once, under four in parallel, usually opens the second time.
                    const result = await capture(browser, item.path).catch(() => capture(browser, item.path))
                    await writeFile(item.file, write(html, result), 'utf-8')
                    chars += result.main.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').length
                    done++
                } catch (error) {
                    errors.push(`${item.path}: ${error.message.split('\n')[0]}`)
                }
            }
        })
    )
    await browser.close()
    server.stop(true)

    console.log(`✓ ${done} página(s) de ferramenta escritas como a tela as mostra (média de ${Math.round(chars / Math.max(1, done))} caracteres de texto)`)
    if (misses) await store(misses, errors)
    if (errors.length) fail(`${errors.length} página(s) sem prerender:\n  ${errors.join('\n  ')}`)
}

await main()
