#!/usr/bin/env node
/**
 * Gera a imagem de Open Graph (1200x630) do ciromaciel.click.
 *
 *   node tools/og/generate.mjs
 *
 * Irmão do gerador dos produtos em website/tools/og — mesma planta, mesma
 * cor quente, mesma guarda de overflow. O que muda é o objeto: aqui o card é
 * de uma pessoa, então não há raio da marca nem assinatura "from <marca>".
 *
 * Renderiza template.html em Chrome headless e converte para WebP com cwebp.
 * A imagem sai em public/opengraph.webp, que é o caminho que o index.html já
 * referencia em og:image e twitter:image.
 *
 * Requisitos: Google Chrome e cwebp (brew install webp).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '../..')

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const QUALITY = 92

/**
 * A TAGLINE É O POSICIONAMENTO, LITERAL. Ela é a única coisa que precisa
 * sobreviver à miniatura do feed, onde o card tem uns 270px de largura.
 *
 * Cada <span> é uma linha e NUNCA quebra no meio: quebra automática partiria
 * o negrito ao meio e desfaria a leitura. O <b> marca o que a frase afirma —
 * aqui, que construir é de todos, e que o que faltava eram as ferramentas.
 *
 * `dirs` são os destinos da imagem, relativos à raiz deste repositório.
 */
const CARDS = {
    ciro: {
        title: 'Ciro Cesar Maciel',
        tagline:
            '<span>Construir é <b>de todos</b>.</span>' +
            '<span>As <b>ferramentas</b> e o <b>saber</b></span>' +
            '<span>é que não eram.</span>',
        // 44px: três linhas a 54px passariam da base do quadro, e a linha do
        // meio passaria por baixo do avatar. Encurtar a frase não é opção —
        // ela é o posicionamento, palavra por palavra.
        tagFz: 44,
        domain: 'ciromaciel.click',
        dirs: ['.'],
    },
    // AS FERRAMENTAS usam este mesmo card: a ferramenta é do site, e quem
    // recebe o link no WhatsApp deve reconhecer o mesmo desenho. O destino
    // é o repositório tools, clonado ao lado deste (../tools).
    'generate-password': {
        title: 'Gerador de senhas',
        tagline:
            '<span>Uma senha <b>forte</b>, criada</span>' +
            '<span><b>no seu navegador</b>.</span>' +
            '<span>Ela não sai da sua máquina.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/generate-password/website'],
    },
    'compare-timezones': {
        title: 'Fusos horários',
        tagline:
            '<span>A hora de <b>várias cidades</b>,</span>' +
            '<span><b>lado a lado</b>. Horário</span>' +
            '<span>de verão incluído.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/compare-timezones/website'],
    },
    'remove-background': {
        title: 'Remover fundo',
        tagline:
            '<span>O fundo sai, <b>no seu</b></span>' +
            '<span><b>navegador</b>. A imagem</span>' +
            '<span>não sai da sua máquina.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/remove-background/website'],
    },
    'generate-background': {
        title: 'Gerador de fundos',
        tagline:
            '<span>Um fundo no <b>tamanho</b></span>' +
            '<span><b>exato</b> de cada tela,</span>' +
            '<span>até 8K.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/generate-background/website'],
    },
    'explore-s3': {
        title: 'Explorador de S3',
        tagline:
            '<span>Os seus <b>buckets S3</b>,</span>' +
            '<span>direto do <b>navegador</b>,</span>' +
            '<span>sem servidor no meio.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/explore-s3/website'],
    },
    'data-to-chart': {
        title: 'CSV em gráfico',
        tagline:
            '<span>Uma <b>tabela</b> vira um</span>' +
            '<span><b>gráfico em SVG</b>, pronto</span>' +
            '<span>para baixar ou usar por link.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/data-to-chart/website'],
    },
    'text-to-speech': {
        title: 'Texto em voz',
        tagline:
            '<span>Um <b>texto</b> vira <b>áudio</b>,</span>' +
            '<span>em <b>49 vozes naturais</b></span>' +
            '<span>e 18 idiomas. Baixe o MP3.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/text-to-speech/website'],
    },
    'web-to-markdown': {
        title: 'Página em Markdown',
        tagline:
            '<span>O <b>texto de uma página</b>,</span>' +
            '<span>sem menu nem anúncio,</span>' +
            '<span><b>pronto para uma IA</b>.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/web-to-markdown/website'],
    },
    'train-gpt': {
        title: 'Treine um GPT',
        tagline:
            '<span>Um <b>GPT de verdade</b>, treinado</span>' +
            '<span>do zero no seu navegador,</span>' +
            '<span>com <b>cada número</b> à vista.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/train-gpt/website'],
    },
    'receive-email': {
        title: 'E-mail temporário',
        tagline:
            '<span>Um <b>e-mail na hora</b>,</span>' +
            '<span>sem cadastro, para receber</span>' +
            '<span>o código e <b>jogar fora</b>.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/receive-email/website'],
    },
    'follow-news': {
        title: 'Suas notícias',
        tagline:
            '<span>A <b>mesma notícia</b> de vários</span>' +
            '<span>sites vira <b>uma história</b>,</span>' +
            '<span>com todas as fontes.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/follow-news/website'],
    },
    feeds: {
        title: 'Feeds',
        tagline:
            '<span>Ache o <b>post que viralizou</b></span>' +
            '<span>em qualquer perfil e</span>' +
            '<span><b>baixe</b> vídeo e transcrição.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/feeds/website'],
    },
    'generate-favicon': {
        title: 'Gerador de favicon',
        tagline:
            '<span>Iniciais, <b>emoji</b> ou a sua</span>' +
            '<span>imagem viram um <b>favicon</b></span>' +
            '<span>que muda no modo escuro.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/generate-favicon/website'],
    },
    pomodoro: {
        title: 'Pomodoro',
        tagline:
            '<span>O <b>timer</b>, a tarefa e os</span>' +
            '<span>sites que distraem, <b>do lado</b></span>' +
            '<span>da página. Grátis.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/pomodoro/website'],
    },
    history: {
        title: 'History',
        tagline:
            '<span>Ache <b>qualquer página</b></span>' +
            '<span>que você já leu, por uma</span>' +
            '<span><b>frase que você lembra</b>.</span>',
        tagFz: 44,
        domain: 'ciromaciel.click/tools',
        dirs: ['../applications/apps/history/website'],
    },
}

const b64 = (p) => readFileSync(join(HERE, p)).toString('base64')

const FONT = b64('montserrat.woff2')
// WebP com transparência real, não o PNG do gerador dos produtos: aquele
// trazia o fundo azul de estúdio, que brigava com o branco do card e obrigava
// a máscara a disfarçar a emenda.
const AVATAR = b64('avatar.webp')
const BOLT = b64('bolt.png')
const TEMPLATE = readFileSync(join(HERE, 'template.html'), 'utf8')

function render(key, cfg, outDir) {
    let html = TEMPLATE.replaceAll('{{FONT}}', FONT)
        .replaceAll('{{AVATAR}}', AVATAR)
        .replaceAll('{{BOLT}}', BOLT)
        .replaceAll('{{TITLE}}', cfg.title)
        .replaceAll('{{TAGLINE}}', cfg.tagline)
        .replaceAll('{{DOMAIN}}', cfg.domain)

    // a marca-mãe não assina a si mesma
    if (cfg.from === null) {
        html = html.replace(/<div class="from">[\s\S]*?<\/div>/, '')
    }

    if (cfg.tagFz) {
        html = html.replace(/(\.tag\s*\{[^}]*?font-size:\s*)\d+px/, `$1${cfg.tagFz}px`)
    }

    const page = join(outDir, `${key}.html`)
    const png = join(outDir, `${key}.png`)
    const webp = join(outDir, `${key}.webp`)
    writeFileSync(page, html)

    execFileSync(
        CHROME,
        [
            '--headless',
            '--disable-gpu',
            '--force-device-scale-factor=1',
            '--window-size=1200,630',
            '--hide-scrollbars',
            '--virtual-time-budget=8000',
            `--screenshot=${png}`,
            `file://${page}`,
        ],
        { stdio: 'ignore' },
    )

    if (!existsSync(png)) throw new Error(`${key}: Chrome não gerou o PNG`)
    execFileSync('cwebp', ['-quiet', '-q', String(QUALITY), png, '-o', webp], { stdio: 'ignore' })
    return webp
}

/**
 * O avatar ocupa a direita do quadro; uma linha de tagline que ultrapasse a
 * faixa livre à esquerda passa por baixo dele e fica ilegível. `nowrap` não
 * respeita max-width, então a checagem tem de ser medida de verdade — no
 * mesmo Chrome que renderiza.
 */
// A silhueta visível do avatar começa por volta de x=938 (medido no render, não
// na caixa da imagem — ela tem transparência à esquerda). Descontado o padding
// de 84 e uma folga de 40 para o texto não encostar nele.
const SAFE_WIDTH = 814

/**
 * A medição tem de usar exatamente a tipografia do template — valores
 * duplicados aqui sairiam de sincronia na primeira vez que alguém mexer no
 * `.tag`, e a checagem passaria a mentir. Então lê a regra de lá.
 */
const TAG_CSS = (TEMPLATE.match(/\.tag\s*\{([^}]*)\}/) || [, ''])[1]
    .split(';')
    .map((d) => d.trim())
    .filter((d) => /^(font-size|font-weight|letter-spacing|line-height)\s*:/.test(d))
    .join(';')

function checkOverflow(key, cfg, outDir) {
    const probe = join(outDir, `${key}.probe.html`)
    const css = cfg.tagFz ? TAG_CSS.replace(/font-size:\s*\d+px/, `font-size: ${cfg.tagFz}px`) : TAG_CSS
    const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'Montserrat';src:url(data:font/woff2;base64,${FONT}) format('woff2');font-weight:100 900;font-display:block}
body{margin:0;font-family:'Montserrat',sans-serif}
.tag{${css}}
.tag b{font-weight:900}
.tag span{display:block;white-space:nowrap;width:max-content}
</style><div class="tag">${cfg.tagline}</div>
<script>
document.fonts.ready.then(() => {
  const w = [...document.querySelectorAll('.tag span')].map(s => Math.ceil(s.getBoundingClientRect().width))
  document.title = 'W:' + w.join(',')
})
</script>`
    writeFileSync(probe, html)
    const out = execFileSync(
        CHROME,
        ['--headless', '--disable-gpu', '--virtual-time-budget=6000', '--dump-dom', `file://${probe}`],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    )
    const m = out.match(/<title>W:([\d,]+)<\/title>/)
    if (!m) return []
    return m[1]
        .split(',')
        .map(Number)
        .map((w, i) => ({ line: i + 1, width: w, over: w > SAFE_WIDTH }))
        .filter((r) => r.over)
}

function main() {
    const only = process.argv[2]
    const keys = only ? [only] : Object.keys(CARDS)

    for (const k of keys) {
        if (!CARDS[k]) {
            console.error(`card desconhecido: ${k}\ndisponíveis: ${Object.keys(CARDS).join(', ')}`)
            process.exit(1)
        }
    }

    const tmp = join(HERE, '.build')
    mkdirSync(tmp, { recursive: true })

    let failed = false

    for (const key of keys) {
        const cfg = CARDS[key]

        const over = checkOverflow(key, cfg, tmp)
        if (over.length) {
            failed = true
            for (const o of over) {
                console.error(`${key.padEnd(9)} ERRO  linha ${o.line} da tagline tem ${o.width}px (máx ${SAFE_WIDTH}px) — passaria por baixo do avatar`)
            }
            continue
        }

        const webp = render(key, cfg, tmp)
        const size = readFileSync(webp).length

        const written = []
        for (const d of cfg.dirs) {
            // public/opengraph.webp, não public/images/ — este site serve o
            // arquivo na raiz do public, e é esse caminho que o index.html
            // referencia em og:image e twitter:image.
            const dest = join(REPO, d, 'public/opengraph.webp')
            if (!existsSync(dirname(dest))) {
                console.warn(`  ! ${d}: public não existe, pulando`)
                continue
            }
            copyFileSync(webp, dest)
            written.push(d)
        }
        console.log(`${key.padEnd(9)} ${String(size).padStart(6)} B  ->  ${written.join(', ') || '(nenhum destino)'}`)
    }

    rmSync(tmp, { recursive: true, force: true })
    if (failed) process.exit(1)
}

main()
