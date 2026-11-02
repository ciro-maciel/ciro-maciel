/**
 * As ferramentas de ciromaciel.click/tools, montadas a partir do repositório
 * `tools`.
 *
 * O padrão está em `applications/docs/2026-09-22-padrao-das-ferramentas.md`.
 * O que importa aqui:
 *
 * - SÓ ENTRA QUEM TEM `tool.json`. A pasta `apps/<id>/` sem ele não está
 *   pronta, e este script não olha para ela.
 * - O HOSTER SUBSTITUI O PROJETO INTEIRO a cada deploy, então as ferramentas
 *   não têm deploy próprio: elas entram no `dist` do site e sobem junto.
 *
 * Dois passos, chamados pelo package.json:
 *
 *   registry   antes do build (e do dev): junta os `tool.json` em
 *              `public/tools.json`, que a página /tools e o sitemap leem.
 *   apps       depois do build: constrói cada `apps/<id>/website` e copia
 *              para `dist/tools/<id>/`, escreve as páginas de busca dela
 *              (`apps/<id>/pages.json`) e acrescenta as ferramentas ao
 *              `dist/llms.txt`.
 *
 * O CACHE (16/10/2026). Cada deploy recompilava as 18 ferramentas, uma por
 * vez, e o Chromium gerava o HTML de todas: 4min35s de um build de 4min49s,
 * com o site em si levando 11s. Agora cada ferramenta tem uma impressão
 * digital (`fingerprint`: os arquivos dela, `shared/`, as dependências da
 * raiz do repositório e a versão do formato, TOOLS_BUILD_VERSION). Se a impressão é a
 * mesma do último build, a pasta pronta — já com o HTML do prerender — sai de
 * `.cache/tools/<id>/<impressão>/` e nada é compilado. As que mudaram são
 * compiladas em paralelo, e só elas passam pelo Chromium
 * (scripts/prerender-tools.js, que é quem grava no cache, depois do
 * prerender: o cache nunca guarda uma ferramenta sem o HTML dela).
 *
 * No CI o cache vem do `actions/cache` (deploy-website.yml). Para forçar tudo
 * de novo: apague `.cache/tools`, ou rode com `TOOLS_CACHE=off`.
 *
 * ONDE ESTÁ O REPOSITÓRIO `applications` (ex-`tools`): `TOOLS_REPO_DIR`, ou a pasta vizinha
 * `../tools` — é assim que os dois repositórios ficam lado a lado na
 * máquina de quem desenvolve. Com a variável definida (o CI define), não
 * achar o repositório é erro. Sem ela, é aviso: dá para mexer no site sem ter
 * o outro repositório clonado, e a página /tools só aparece vazia.
 */
import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { availableParallelism } from 'node:os'
import { cp, mkdir, readdir, readFile, writeFile, appendFile, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join, dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const REGISTRY = join(ROOT, 'public', 'tools.json')

const exists = path =>
    access(path).then(
        () => true,
        () => false
    )

const explicit = Boolean(process.env.TOOLS_REPO_DIR)
const TOOLS_REPO = resolve(process.env.TOOLS_REPO_DIR || join(ROOT, '..', 'applications'))
const TOOLS_DIR = join(TOOLS_REPO, 'apps')

export const CACHE_DIR = join(ROOT, '.cache', 'tools')
// Which tools this build compiled and which came from the cache: prerender-tools.js reads it
export const MANIFEST = join(CACHE_DIR, 'manifest.json')
const IS_CACHE_ON = process.env.TOOLS_CACHE !== 'off'

/**
 * THE ANALYTICS SCRIPT OF THE SITE, IN EVERY TOOL (23/10/2026). Each tool is
 * its own app with its own index.html, and the catalog card is an `<a href>`:
 * without this, a visit to /tools/<id> was never counted, and the panel only
 * showed /tools. The tag is copied from website/index.html — one `data-site`,
 * one place — and enters the fingerprint, so a new id rebuilds the tools.
 * (applications/docs/2026-10-23-analytics-das-ferramentas.md)
 */
const TRACKER = (await readFile(join(ROOT, 'index.html'), 'utf-8')).match(/<script\b[^>]*analytics\.worker\.myoperations\.click\/tracker\.js[\s\S]*?<\/script>/)?.[0]
// Builds at once. Each is a vite build of its own, mostly one core. IN CI, ONE
// (30/10/2026): our runners report more cores than the memory four vite builds
// need, and rebuilding all twenty at once made a runner lose contact with
// GitHub mid-build. Only changed tools build there, so one at a time is short.
const PARALLEL = process.env.CI ? 1 : Math.max(1, Math.min(4, availableParallelism() - 1))

function fail(message) {
    console.error(`✗ build-tools: ${message}`)
    process.exit(1)
}

/** Every `apps/<id>/tool.json`, with the folder name checked against the id. */
async function loadTools() {
    if (!(await exists(TOOLS_DIR))) {
        if (explicit) fail(`TOOLS_REPO_DIR=${TOOLS_REPO} não tem a pasta apps/`)
        console.warn(`⚠ build-tools: ${TOOLS_DIR} não existe — /tools fica vazia neste build`)
        return []
    }

    const tools = []
    for (const entry of (await readdir(TOOLS_DIR, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
        if (!entry.isDirectory()) continue
        const file = join(TOOLS_DIR, entry.name, 'tool.json')
        if (!(await exists(file))) continue

        const tool = JSON.parse(await readFile(file, 'utf-8'))
        // O identificador é o mesmo em todo lugar — a pasta inclusive. Uma
        // divergência aqui publicaria a ferramenta num endereço e o MCP
        // apontaria para outro.
        if (tool.id !== entry.name) fail(`apps/${entry.name}/tool.json declara id "${tool.id}"`)
        // A TOOL STILL BEING BUILT DOES NOT STOP THE OTHERS. A `tool.json` with
        // no `website/` yet (favicon, 27/09/2026) failed every deploy of the
        // site for a day — the new logo, among others, never went out. It is
        // skipped, out of the catalog too, until its website exists.
        if (!(await exists(join(TOOLS_DIR, entry.name, 'website')))) {
            console.warn(`⚠ build-tools: tools/${entry.name} tem tool.json mas ainda não tem website/ — fica de fora deste build`)
            continue
        }
        const pagesFile = join(TOOLS_DIR, entry.name, 'pages.json')
        const pages = (await exists(pagesFile)) ? JSON.parse(await readFile(pagesFile, 'utf-8')) : null
        tools.push({ ...tool, dir: join(TOOLS_DIR, entry.name), pages })
    }
    return tools
}

/**
 * `routes` e `dir` são do build, não da lista pública. Das páginas de busca,
 * a lista leva só o endereço e o título: é o que o sitemap lê, e o que serve a
 * um agente que queira mandar a pessoa direto para a resposta.
 */
function publicEntry({ routes, dir, pages, ...tool }) {
    if (!pages?.pages.length) return tool
    // Gallery images (`images` in pages.json, today only the background
    // generator's): their address and alt text, for the image sitemap.
    const images = list => (list?.length ? list.map(({ src, alt }) => ({ src, alt })) : undefined)
    return {
        ...tool,
        images: images(pages.images),
        pages: pages.pages.map(page => ({ url: `${tool.url}/${page.slug}`, title: page.title, images: images(page.images) })),
    }
}

async function registry() {
    const tools = await loadTools()
    await writeFile(REGISTRY, JSON.stringify({ tools: tools.map(publicEntry) }, null, 4) + '\n', 'utf-8')
    console.log(`✓ tools.json com ${tools.length} ferramenta(s): ${tools.map(t => t.id).join(', ') || '—'}`)
}

/*
 * Runs a command and keeps its output, printed in one block when it ends:
 * with four builds at once, streamed lines from all of them would interleave
 * into a log nobody can read.
 */
function run(command, args, cwd, env) {
    return new Promise(done => {
        const child = spawn(command, args, { cwd, env: env ? { ...process.env, ...env } : process.env, stdio: ['ignore', 'pipe', 'pipe'] })
        let output = ''
        child.stdout.on('data', chunk => (output += chunk))
        child.stderr.on('data', chunk => (output += chunk))
        child.on('close', status => {
            if (status !== 0) {
                process.stdout.write(output)
                fail(`${command} ${args.join(' ')} falhou em ${cwd}`)
            }
            done(output)
        })
    })
}

// Every file under a folder, sorted, without what a build or an install writes
async function filesOf(dir) {
    const found = []
    for (const entry of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
        if (['node_modules', 'dist', '.DS_Store'].includes(entry.name)) continue
        const path = join(dir, entry.name)
        if (entry.isDirectory()) found.push(...(await filesOf(path)))
        else if (entry.isFile()) found.push(path)
    }
    return found.sort()
}

/**
 * THE VERSION OF WHAT THESE SCRIPTS WRITE INTO A TOOL'S FOLDER (30/10/2026).
 * Raise it when a change to build-tools.js or prerender-tools.js changes the
 * OUTPUT (the search pages, the skeleton, the prerendered HTML, the copied
 * routes). Do not raise it for how the build runs (queues, logs, parallelism):
 * until this date the fingerprint hashed both scripts whole, so a log line
 * rebuilt all twenty tools, and that full rebuild starved a runner.
 */
export const TOOLS_BUILD_VERSION = 1

/**
 * What a tool's folder in dist/ depends on, as one hash: if none of it
 * changed, the folder built last time is the folder this build would write.
 */
export async function fingerprint(tool) {
    const hash = createHash('sha256')
    const files = [
        ...(await filesOf(tool.dir)),
        ...(await filesOf(join(TOOLS_REPO, 'shared'))),
        join(TOOLS_REPO, 'package.json'),
        join(TOOLS_REPO, 'bun.lock'),
    ]
    for (const file of files) {
        hash.update(file.startsWith(TOOLS_REPO) ? file.slice(TOOLS_REPO.length) : file.slice(ROOT.length))
        hash.update(await readFile(file).catch(() => ''))
    }
    hash.update(`build-format-${TOOLS_BUILD_VERSION}`)
    hash.update(TRACKER ?? '')
    hash.update(Bun.version)
    return hash.digest('hex').slice(0, 16)
}

/*
 * ONE INSTALL FOR ALL THE TOOLS (30/10/2026). The tools' websites are members
 * of the `applications` workspace: one `bun install` at its root, one shared
 * node_modules (898 MB, against 6 GB for twenty separate ones). Until this
 * date each tool installed on its own, and parallel installs half-extracted
 * packages in bun's shared cache (a corrupt rollup, an @aws-sdk/client-s3
 * missing, a different tool each deploy).
 *
 * IN CI, A PACKAGE CACHE OF THIS JOB ONLY. Our runners are reused between jobs
 * and keep ~/.bun/install/cache; the broken copies of those installs stayed
 * there. A cache inside the job's folder starts empty and dies with the job.
 */
const INSTALL_ENV = process.env.CI ? { BUN_INSTALL_CACHE_DIR: join(ROOT, '.cache', 'bun-install') } : undefined

async function buildTool(tool) {
    const website = join(tool.dir, 'website')
    const started = Date.now()
    await run('bun', ['run', 'build'], website)
    console.log(`→ ${tool.id} compilada em ${((Date.now() - started) / 1000).toFixed(1)}s`)
}

async function apps() {
    if (!TRACKER) fail('website/index.html não tem o script do Analytics: as ferramentas ficariam sem medição')
    const tools = await loadTools()

    for (const tool of tools) {
        // Um build com outro `base` gera HTML apontando para assets que não
        // existem naquele caminho: a página abre em branco, sem erro no build.
        const base = `/tools/${tool.id}/`
        const config = await readFile(join(tool.dir, 'website', 'vite.config.js'), 'utf-8').catch(() => '')
        if (!config.includes(`base: '${base}'`)) fail(`apps/${tool.id}/website/vite.config.js precisa de base: '${base}'`)
        const target = join(DIST, 'tools', tool.id)
        if (await exists(target)) fail(`dist/tools/${tool.id} já existe — o site tem uma rota com o nome da ferramenta?`)
        tool.key = await fingerprint(tool)
        tool.cached = join(CACHE_DIR, tool.id, tool.key)
        tool.isHit = IS_CACHE_ON && (await exists(join(tool.cached, 'index.html')))
    }

    const hits = tools.filter(tool => tool.isHit)
    const misses = tools.filter(tool => !tool.isHit)

    // The unchanged ones: the finished folder, prerendered HTML included
    for (const tool of hits) await cp(tool.cached, join(DIST, 'tools', tool.id), { recursive: true })
    if (hits.length) console.log(`✓ ${hits.length} ferramenta(s) sem mudança, do cache: ${hits.map(t => t.id).join(', ')}`)

    // The changed ones: the workspace installed once, then a few builds at a time
    if (misses.length) await run('bun', ['install', '--frozen-lockfile'], TOOLS_REPO, INSTALL_ENV)
    const queue = [...misses]
    await Promise.all(
        Array.from({ length: PARALLEL }, async () => {
            for (let tool = queue.shift(); tool; tool = queue.shift()) await buildTool(tool)
        })
    )

    for (const tool of misses) {
        const target = join(DIST, 'tools', tool.id)
        await cp(join(tool.dir, 'website', 'dist'), target, { recursive: true })

        if (tool.pages) await writePages(tool, target)
        else await writeBoot(target)

        // O Hoster, sem achar o arquivo, devolve o index.html da RAIZ do site.
        // Uma cópia do index.html da ferramenta em cada rota dela faz o
        // recarregar de /tools/<id>/changelog abrir a ferramenta, não o 404.
        for (const route of tool.routes ?? []) {
            await mkdir(join(target, route), { recursive: true })
            await cp(join(target, 'index.html'), join(target, route, 'index.html'))
        }
        console.log(`✓ dist/tools/${tool.id}${tool.routes?.length ? ` (+ ${tool.routes.join(', ')})` : ''}`)
    }

    await mkdir(CACHE_DIR, { recursive: true })
    await writeFile(MANIFEST, JSON.stringify({ misses: misses.map(({ id, key }) => ({ id, key })), hits: hits.map(t => t.id) }, null, 4))

    if (tools.length) {
        const lines = tools.map(t => `- [${t.title['pt-BR']}](${t.url}): ${t.description['pt-BR']}`)
        await appendFile(
            join(DIST, 'llms.txt'),
            // O MCP (https://mcp.tools.ciromaciel.click) entra neste texto no dia
            // em que estiver no ar — antes disso, o convite levaria o agente
            // a um endereço que não responde.
            `\n## Ferramentas\n\nGratuitas, sem cadastro. A lista completa, com os parâmetros de cada uma, está em\n[/tools.json](https://ciromaciel.click/tools.json).\n\n${lines.join('\n')}\n`,
            'utf-8'
        )
    }
    console.log(`\n✓ ${tools.length} ferramenta(s) em dist/tools`)
}

const escapeHtml = text =>
    String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

// Dentro de <script>, só `<` é perigoso: `</script>` num texto fecharia a tag.
const inlineJson = value => JSON.stringify(value).replaceAll('<', '\\u003c')

/** Troca o `content` de uma <meta> (ou o `href` do canonical) no HTML da ferramenta. */
function setMeta(html, attribute, name, value) {
    const pattern = new RegExp(`(<meta\\s+${attribute}="${name}"\\s+content=")[^"]*(")`)
    if (!pattern.test(html)) fail(`o index.html não tem <meta ${attribute}="${name}">`)
    return html.replace(pattern, `$1${escapeHtml(value)}$2`)
}

/**
 * O QUE APARECE ANTES DE A FERRAMENTA ABRIR. O HTML de uma ferramenta chega
 * com `#main` vazio, e o app leva um instante para montar: sem nada ali, a
 * tela ficava branca; com o texto para buscadores à mostra, piscava uma página
 * sem estilo. Então vai um skeleton com o desenho da página — cabeçalho,
 * título, texto e o cartão da ferramenta —, e o React troca tudo ao montar.
 *
 * O texto para buscadores (páginas de busca, `writePages`) fica no HTML, mas
 * fora da tela.
 */
const BOOT_STYLE = `<style>
.boot{min-height:100vh;background:#fff}
.boot i{display:block;background:#f1f3f5;animation:boot 1.4s ease-in-out infinite}
.boot-head{display:flex;align-items:center;justify-content:space-between;gap:24px;height:88px;padding:0 48px}
.boot-nav{display:flex;gap:28px}
.boot-hero{display:flex;flex-direction:column;align-items:center;gap:18px;max-width:1200px;margin:0 auto;padding:96px 16px 0}
.boot-card{width:100%;height:420px;margin-top:40px;border:1px solid #f1f3f5;background:#fff!important;animation:none!important}
.boot-seo{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@keyframes boot{50%{opacity:.45}}
@media (max-width:760px){.boot-nav{display:none}.boot-head{padding:0 16px}.boot-hero{padding-top:56px}}
@media (prefers-reduced-motion:reduce){.boot i{animation:none}}
</style>`
const BOOT_SKELETON =
    '<div class="boot" aria-hidden="true">' +
    '<div class="boot-head"><i style="width:min(200px,50%);height:32px"></i><div class="boot-nav"><i style="width:64px;height:12px"></i><i style="width:96px;height:12px"></i><i style="width:80px;height:12px"></i></div><i style="width:120px;height:40px"></i></div>' +
    '<div class="boot-hero"><i style="width:160px;height:12px"></i><i style="width:min(440px,90%);height:56px"></i><i style="width:min(600px,95%);height:16px;margin-top:10px"></i><i style="width:min(480px,80%);height:16px"></i><i class="boot-card"></i></div>' +
    '</div>'

/** O `#main` de uma ferramenta: o skeleton e, se houver, o texto para buscadores. */
// The markers are where scripts/prerender-tools.js writes the page as the
// screen shows it; the skeleton and the off-screen text only survive a build
// without Chromium (a local one), never the deploy.
const bootMain = (seo = '') => `<div id="main"><!--main-->${BOOT_SKELETON}${seo ? `<div class="boot-seo">${seo}</div>` : ''}<!--/main--></div>`

/** Põe o skeleton no `index.html` de uma ferramenta que não tem páginas de busca. */
async function writeBoot(target) {
    const file = join(target, 'index.html')
    const html = await readFile(file, 'utf-8')
    if (!html.includes('<div id="main"></div>')) return
    await writeFile(file, html.replace('</head>', `${BOOT_STYLE}\n${TRACKER}\n</head>`).replace('<div id="main"></div>', bootMain()), 'utf-8')
}

/**
 * AS PÁGINAS DE BUSCA: `tools/<id>/<slug>`, uma por pergunta que as pessoas
 * fazem ao Google. A casca que as mostra está em `applications/shared/
 * searchPages.js`; aqui elas viram arquivos.
 *
 * Cada página é o `index.html` da ferramenta com título, descrição, canonical
 * e Open Graph dela, e três acréscimos:
 *
 * - `window.__TOOL_PAGES__`, a lista inteira, que vira a seção de atalhos
 *   acima do rodapé. Vai também no `index.html` da ferramenta (e nas cópias
 *   das rotas, que saem dele depois deste passo).
 * - `window.__TOOL_PAGE__` e um `history.replaceState` para o endereço da
 *   ferramenta com os parâmetros da página, ANTES de o app abrir: o router
 *   vê `/tools/<id>?zones=…`, o endereço de sempre, e abre a ferramenta
 *   naquele estado. O canonical continua o da página de busca.
 * - O texto da página dentro de `#main` — título, descrição e os atalhos —,
 *   para quem lê o HTML sem rodar JavaScript, fora da tela, atrás do
 *   skeleton (`bootMain`). O React troca tudo ao abrir.
 */
async function writePages(tool, target) {
    const { subtitle, title, pages } = tool.pages
    const base = `/tools/${tool.id}`
    const taken = new Set([...(tool.routes ?? []), ...(await readdir(target))])
    for (const page of pages) {
        if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(page.slug)) fail(`apps/${tool.id}/pages.json: slug inválido "${page.slug}"`)
        if (taken.has(page.slug)) fail(`apps/${tool.id}/pages.json: "${page.slug}" já é uma rota ou um arquivo da ferramenta`)
        taken.add(page.slug)
    }

    // The tool's defaults, as the URL writes them: a tool drops a parameter
    // that is at its default (the voice of the page of Francisca), and the
    // page must still know it is itself (`currentToolPage`).
    const defaults = Object.fromEntries(
        Object.entries(tool.input?.properties ?? {})
            .filter(([, schema]) => schema.default !== undefined)
            .map(([key, schema]) => [key, Array.isArray(schema.default) ? schema.default.join(',') : String(schema.default)])
    )
    const list = {
        subtitle,
        title,
        defaults,
        // Everything but what only its own page carries (`faq`, the gallery and
        // the answer, which the tool reads from its own pages.json): the
        // heading (`title`) and what a tool reads from its page (`places`).
        pages: pages.map(({ faq, images, gallery, facts, source, ...page }) => ({ ...page, href: `${base}/${page.slug}` })),
    }
    const links = list.pages.map(page => `<li><a href="${page.href}">${escapeHtml(page.label)}</a></li>`).join('')
    const faqHtml = (faq = []) => faq.map(item => `<h2>${escapeHtml(item.question)}</h2><p>${escapeHtml(item.answer)}</p>`).join('')
    const staticBody = (heading, text, faq) =>
        bootMain(`<main><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(text)}</p>${faqHtml(faq)}</main><nav><h2>${escapeHtml(title)}</h2><ul>${links}</ul></nav>`)

    const file = join(target, 'index.html')
    const original = await readFile(file, 'utf-8')
    if (!original.includes('<div id="main"></div>')) fail(`apps/${tool.id}: o index.html não tem <div id="main"></div>`)
    const withList = original.replace('</head>', `${BOOT_STYLE}\n${TRACKER}\n<script>window.__TOOL_PAGES__=${inlineJson(list)}</script>\n</head>`)
    await writeFile(file, withList.replace('<div id="main"></div>', staticBody(tool.title['pt-BR'], tool.description['pt-BR'])), 'utf-8')

    for (const [index, page] of list.pages.entries()) {
        const heading = pages[index].title
        const url = `https://ciromaciel.click${page.href}`
        const fullTitle = `${heading} — Ciro Cesar Maciel`
        const search = new URLSearchParams(Object.entries(page.query).map(([key, value]) => [key, String(value)])).toString()
        const boot = `window.__TOOL_PAGE__=${inlineJson(page.slug)};history.replaceState(null,'',${inlineJson(`${base}?${search}`)}+location.hash)`

        let html = withList
            .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`)
            .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
            .replace('</head>', `<script>${boot}</script>\n${pageSchema(tool, pages[index], url)}\n</head>`)
            .replace('<div id="main"></div>', staticBody(heading, page.description, pages[index].faq))
        html = setMeta(html, 'name', 'description', page.description)
        html = setMeta(html, 'property', 'og:url', url)
        html = setMeta(html, 'property', 'og:title', fullTitle)
        html = setMeta(html, 'property', 'og:description', page.description)
        html = setMeta(html, 'name', 'twitter:title', fullTitle)
        html = setMeta(html, 'name', 'twitter:description', page.description)
        // A page with a gallery is shared with its first image, not the tool's card.
        const cover = pages[index].images?.[0]
        if (cover) {
            html = setMeta(html, 'property', 'og:image', `https://ciromaciel.click${cover.src}`)
            html = setMeta(html, 'property', 'og:image:width', String(cover.width))
            html = setMeta(html, 'property', 'og:image:height', String(cover.height))
            html = setMeta(html, 'property', 'og:image:alt', cover.alt)
            html = setMeta(html, 'name', 'twitter:image', `https://ciromaciel.click${cover.src}`)
        }

        await mkdir(join(target, page.slug), { recursive: true })
        await writeFile(join(target, page.slug, 'index.html'), html, 'utf-8')
    }
    console.log(`✓ ${pages.length} página(s) de busca em dist/tools/${tool.id}`)
}

/**
 * The search page's own schema, next to the tool's `WebApplication` (which
 * every copy of the HTML carries, with the tool's address): the page as a
 * `WebPage` at its own address, the path to it (site → tools → tool → page)
 * and, when the page answers questions (`faq` in pages.json), a `FAQPage`
 * with the same text the page shows.
 */
function pageSchema(tool, page, url) {
    const site = 'https://ciromaciel.click'
    const graph = [
        {
            '@type': 'WebPage',
            '@id': url,
            url,
            name: page.title,
            description: page.description,
            inLanguage: 'pt-BR',
            isPartOf: { '@type': 'WebSite', name: 'Ciro Cesar Maciel', url: site },
            about: { '@type': 'WebApplication', name: tool.title['pt-BR'], url: `${site}/tools/${tool.id}` },
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { name: 'Ciro Cesar Maciel', item: site },
                { name: 'Ferramentas', item: `${site}/tools` },
                { name: tool.title['pt-BR'], item: `${site}/tools/${tool.id}` },
                { name: page.label, item: url },
            ].map((entry, i) => ({ '@type': 'ListItem', position: i + 1, ...entry })),
        },
    ]
    // The gallery: each image as an ImageObject, with who made it and the
    // license the page states on screen (free use, commercial included).
    for (const image of page.images ?? []) {
        graph.push({
            '@type': 'ImageObject',
            contentUrl: `${site}${image.src}`,
            name: image.alt,
            caption: image.alt,
            width: image.width,
            height: image.height,
            encodingFormat: 'image/webp',
            creator: { '@type': 'Person', name: 'Ciro Cesar Maciel', url: site },
            creditText: 'Ciro Cesar Maciel',
            copyrightNotice: 'Uso livre, inclusive comercial',
            license: `${site}/tools/${tool.id}#perguntas`,
            acquireLicensePage: `${site}/tools/${tool.id}#perguntas`,
            isPartOf: { '@id': url },
        })
    }
    if (page.faq?.length) {
        graph.push({
            '@type': 'FAQPage',
            '@id': `${url}#perguntas`,
            mainEntity: page.faq.map(item => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
        })
    }
    return `<script type="application/ld+json">${inlineJson({ '@context': 'https://schema.org', '@graph': graph })}</script>`
}

// Only as a script: prerender-tools.js imports the cache's paths from here
if (import.meta.main) {
    const step = process.argv[2]
    if (step === 'registry') await registry()
    else if (step === 'apps') await apps()
    else fail(`passo desconhecido "${step}" — use registry ou apps`)
}
