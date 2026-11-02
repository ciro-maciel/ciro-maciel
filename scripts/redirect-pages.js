/**
 * ADDRESSES THAT MOVED, WRITTEN AS PAGES THAT SEND THE VISITOR ON.
 *
 *   bun scripts/redirect-pages.js     (the last step of `postbuild`)
 *
 * The Hoster serves static files and has no server-side redirect, so an
 * address that moved would answer the 404 page and lose what it ranked for.
 * For each one this writes dist/<from>/index.html with a zero-second
 * `meta refresh` (what search engines read as a permanent move), a canonical
 * to where the page lives now, and `location.replace`, so the old address
 * stays out of the back button. The same page as
 * marketing/website/tools/redirect-pages.mjs, without its `noindex`: the
 * refresh already moves the address, and a noindex next to it is a second,
 * conflicting signal about where the ranking goes.
 *
 * None of these enters sitemap.xml: a sitemap lists pages, not jumps.
 *
 * A rule that lands on a page of the build stops it: the redirect would
 * overwrite that page.
 */
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

// The 49 voice pages of Text to Speech, one per Microsoft voice. They left
// with those voices on 15/10/2026, when the tool moved to Fish Audio
// (applications, ba9214b6), and Google still shows them.
const TEXT_TO_SPEECH_VOICES = [
    'voz-ahmet-turco',
    'voz-alvaro-espanhol-da-espanha',
    'voz-antonio-portugues-do-brasil',
    'voz-aria-ingles-americano',
    'voz-christel-dinamarques',
    'voz-christopher-ingles-americano',
    'voz-colette-holandes',
    'voz-conrad-alemao',
    'voz-dalia-espanhol-do-mexico',
    'voz-denise-frances',
    'voz-diego-italiano',
    'voz-dmitry-russo',
    'voz-duarte-portugues-de-portugal',
    'voz-elsa-italiano',
    'voz-elvira-espanhol-da-espanha',
    'voz-emel-turco',
    'voz-finn-noruegues',
    'voz-francisca-portugues-do-brasil',
    'voz-guy-ingles-americano',
    'voz-hamed-arabe',
    'voz-henri-frances',
    'voz-injoon-coreano',
    'voz-jean-frances-do-canada',
    'voz-jenny-ingles-americano',
    'voz-jeppe-dinamarques',
    'voz-jorge-espanhol-do-mexico',
    'voz-katja-alemao',
    'voz-keita-japones',
    'voz-libby-ingles-britanico',
    'voz-maarten-holandes',
    'voz-madhur-hindi',
    'voz-marek-polones',
    'voz-mattias-sueco',
    'voz-nanami-japones',
    'voz-natasha-ingles-australiano',
    'voz-pernille-noruegues',
    'voz-raquel-portugues-de-portugal',
    'voz-ryan-ingles-britanico',
    'voz-sofie-sueco',
    'voz-sonia-ingles-britanico',
    'voz-sunhi-coreano',
    'voz-svetlana-russo',
    'voz-swara-hindi',
    'voz-sylvie-frances-do-canada',
    'voz-william-ingles-australiano',
    'voz-xiaoxiao-chines-mandarim',
    'voz-yunxi-chines-mandarim',
    'voz-zariyah-arabe',
    'voz-zofia-polones',
]

// The /solutions pages lived on this domain before moving to the
// Infrastructure; Google still shows them here.
const SOLUTIONS = [
    'alternativa-a-aws',
    'alternativa-ao-firebase',
    'alternativa-ao-stripe',
    'alternativa-ao-supabase',
    'app-por-assinatura',
    'backend-para-app-mobile',
    'backend-para-apps-com-ia',
    'backend-para-dev-solo',
    'backend-para-freelancer',
    'backend-para-iniciantes',
    'backend-para-marketplace',
    'backend-para-saas-b2b',
    'backend-para-software-house',
    'backend-para-startups',
    'backend-para-times-de-produto',
    'ferramentas-internas',
]

export const MOVED = [
    ...TEXT_TO_SPEECH_VOICES.map(slug => ({ from: `/tools/text-to-speech/${slug}`, to: 'https://ciromaciel.click/tools/text-to-speech' })),
    ...SOLUTIONS.map(slug => ({ from: `/solutions/${slug}`, to: `https://myinfrastructure.click/solutions/${slug}` })),
]

const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

export function redirectPage(to) {
    const href = escape(to)
    return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${href}">
<link rel="canonical" href="${href}">
<title>Este endereço mudou</title>
<script>location.replace(${JSON.stringify(to)})</script>
</head>
<body><p>Este endereço mudou: <a href="${href}">${href}</a>.</p></body>
</html>
`
}

export async function writeRedirectPages() {
    for (const { from, to } of MOVED) {
        const file = join(DIST, from, 'index.html')
        if (existsSync(file)) throw new Error(`redirect-pages: ${from} is a page of the site, not an address that moved`)
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, redirectPage(to))
    }
    console.log(`[redirect-pages] ${MOVED.length} addresses that moved`)
}

if (import.meta.main) await writeRedirectPages()
