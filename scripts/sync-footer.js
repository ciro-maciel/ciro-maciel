/**
 * O RODAPÉ DO SITE, LEVADO ÀS FERRAMENTAS (19/10/2026).
 *
 * Toda página de ferramenta (ciromaciel.click/tools/<id>) termina no mesmo
 * rodapé do site: as mesmas colunas, os mesmos links, a mesma ordem, o
 * logotipo, a linha de baixo e o botão de tema. Até esta data as ferramentas
 * tinham um rodapé próprio, uma cópia à mão que tinha ficado com quatro
 * colunas enquanto o do site tinha seis.
 *
 * A FONTE É UMA SÓ, e mora aqui no `website`:
 *
 *   src/components/SiteFooter.jsx   o desenho
 *   src/components/site-footer.css  as duas correções de layout dele
 *   src/data/catalog.js (FOOTER)    as colunas, os canais, a frase
 *
 * Este script escreve em `applications/shared/site-footer/` os dois arquivos,
 * copiados, e o `FOOTER` como `footer.json`, com os links ABSOLUTOS para
 * https://ciromaciel.click: a ferramenta é outro app, e `/about` lá cairia em
 * `/tools/<id>/about`. Os três levam a marca de gerado; editar lá não adianta.
 *
 * QUANDO RODA. No `postbuild` do site, antes de as ferramentas serem
 * construídas: um deploy nunca sai com o rodapé velho, mesmo que a cópia
 * commitada em `applications` esteja atrasada. A cópia commitada existe para
 * o build avulso de uma ferramenta (`bun run build` em apps/<id>/website).
 *
 *   bun scripts/sync-footer.js           escreve a cópia
 *   bun scripts/sync-footer.js --check   só compara; sai 1 se ela divergiu
 *
 * Mudou o rodapé? Rode o script e commite `applications/shared/site-footer/`.
 *
 * ONDE ESTÁ `applications`: `TOOLS_REPO_DIR`, ou a pasta vizinha — a mesma
 * regra de scripts/build-tools.js. Sem a variável e sem a pasta, é aviso.
 */
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FOOTER } from '../src/data/catalog.js'
import { SITE } from '../src/data/site.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const isExplicit = Boolean(process.env.TOOLS_REPO_DIR)
const TOOLS_REPO = resolve(process.env.TOOLS_REPO_DIR || join(ROOT, '..', 'applications'))
const TARGET = join(TOOLS_REPO, 'shared', 'site-footer')
const isCheck = process.argv.includes('--check')

const GENERATED = 'GERADO por website/scripts/sync-footer.js. Não edite aqui: a fonte é'

const exists = path =>
    access(path).then(
        () => true,
        () => false
    )

/** A link of the site, as a tool page needs it: an absolute `href`, no router. */
function absolute({ label, component, to, state, href, ...rest }) {
    let target = to ?? href
    if (to && state?.scrollTo) target = `${to}#${state.scrollTo}`
    if (target.startsWith('/')) target = `${SITE.url}${target}`
    return { label, href: target, ...rest }
}

async function files() {
    const source = name => readFile(join(ROOT, 'src', 'components', name), 'utf-8')
    const data = {
        generatedBy: `${GENERATED} website/src/data/catalog.js (FOOTER)`,
        ...FOOTER,
        sections: FOOTER.sections.map(section => ({ title: section.title, links: section.links.map(absolute) })),
    }
    return {
        'SiteFooter.jsx': `// ${GENERATED} website/src/components/SiteFooter.jsx\n${await source('SiteFooter.jsx')}`,
        'site-footer.css': `/* ${GENERATED} website/src/components/site-footer.css */\n${await source('site-footer.css')}`,
        'footer.json': JSON.stringify(data, null, 4) + '\n',
    }
}

if (!(await exists(join(TOOLS_REPO, 'shared')))) {
    if (isExplicit) {
        console.error(`✗ sync-footer: TOOLS_REPO_DIR=${TOOLS_REPO} não tem a pasta shared/`)
        process.exit(1)
    }
    console.warn(`⚠ sync-footer: ${TOOLS_REPO}/shared não existe — o rodapé das ferramentas não foi conferido`)
    process.exit(0)
}

const stale = []
for (const [name, content] of Object.entries(await files())) {
    const path = join(TARGET, name)
    const current = (await exists(path)) ? await readFile(path, 'utf-8') : null
    if (current === content) continue
    stale.push(name)
    if (isCheck) continue
    await mkdir(TARGET, { recursive: true })
    await writeFile(path, content, 'utf-8')
}

if (isCheck && stale.length) {
    console.error(`✗ sync-footer: o rodapé das ferramentas divergiu do site (${stale.join(', ')}). Rode bun scripts/sync-footer.js e commite applications/shared/site-footer/.`)
    process.exit(1)
}
console.log(stale.length ? `✓ rodapé das ferramentas atualizado: ${stale.join(', ')}` : '✓ rodapé das ferramentas igual ao do site')
