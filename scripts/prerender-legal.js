/**
 * /legal/privacy, /legal/terms, /privacy, /about and /contact with their
 * text in the HTML itself.
 *
 * The site is a single-page app: without JavaScript, every address shows the
 * home's shell. OpenAI's plugin review fetches the privacy policy without
 * running JavaScript and found nothing there ("Make sure your privacy policy
 * website is accessible", 30/09/2026). So, after the build, each legal
 * document is written to dist/legal/<type>/index.html: the same index.html,
 * with the document's title, description and full text inside #root. The
 * Hoster serves that file for the address, and React replaces the text with
 * the page as soon as it loads — one source, src/data/legal.js.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { LEGAL_UPDATED, PRIVACY, TERMS } from '../src/data/legal.js'
import { SITE } from '../src/data/site.js'
import { ABOUT, CONTACT } from '../src/data/trust.js'
import { splitLinks } from '../src/data/links.js'

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

const PRIVACY_DESCRIPTION = 'O que o site, as ferramentas e os assistentes de IA fazem com os seus dados, e por quanto tempo, conforme a LGPD.'

// `path` is where the file is written; `canonical` is the address the page
// declares as its own. /privacy is a second door to the same policy — agents
// look for the policy there — so it points search engines at /legal/privacy.
const DOCUMENTS = [
    { path: '/legal/privacy', doc: PRIVACY, description: PRIVACY_DESCRIPTION },
    { path: '/privacy', canonical: '/legal/privacy', doc: PRIVACY, description: PRIVACY_DESCRIPTION },
    { path: '/legal/terms', doc: TERMS, description: 'As condições para usar este site, as ferramentas gratuitas, o MCP e os plugins para assistentes de IA.' },
    { path: ABOUT.path, doc: ABOUT, description: ABOUT.description },
    { path: CONTACT.path, doc: CONTACT, description: CONTACT.description },
]

const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

const linked = text =>
    splitLinks(text)
        .map(part => (part.href ? `<a href="${escape(part.href)}">${escape(part.text)}</a>` : escape(part.text)))
        .join('')

const block = item => (Array.isArray(item) ? `<ul>${item.map(entry => `<li>${linked(entry)}</li>`).join('')}</ul>` : `<p>${linked(item)}</p>`)

export function documentHtml(doc) {
    return [
        '<main class="legal-static" style="max-width:760px;margin:0 auto;padding:48px 20px;font-family:Montserrat,sans-serif;line-height:1.6">',
        `<h1>${escape(doc.title)}</h1>`,
        `<p><strong>${escape(doc.subtitle)}</strong></p>`,
        ...doc.intro.map(block),
        ...doc.sections.map(section => `<section><h2>${escape(section.title)}</h2>${section.body.map(block).join('')}</section>`),
        `<p>Contato: <a href="${escape(SITE.whatsapp)}">WhatsApp</a>.</p>`,
        `<p>Última atualização: ${escape(doc.updated ?? LEGAL_UPDATED)}.</p>`,
        '</main>',
    ].join('')
}

export function pageHtml(shell, { doc, description, url }) {
    const title = `${doc.title} — ${SITE.name}`
    // Without the canonical and og:url, every one of these pages declared
    // itself a copy of the home (the shell's values).
    const canonical = `${SITE.url}${url}`
    const replaced = shell
        .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
        .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escape(description)}$2`)
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escape(canonical)}$2`)
        .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${escape(canonical)}$2`)
        .replace('<div id="root"></div>', `<div id="root">${documentHtml(doc)}</div>`)
    if (!replaced.includes('class="legal-static"')) throw new Error('prerender-legal: <div id="root"></div> not found in dist/index.html')
    return replaced
}

const shell = await readFile(join(DIST, 'index.html'), 'utf8')
for (const { path, canonical, doc, description } of DOCUMENTS) {
    const file = join(DIST, path, 'index.html')
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, pageHtml(shell, { doc, description, url: canonical ?? path }))
    console.log(`[prerender-legal] ${file.replace(DIST, 'dist')}`)
}
