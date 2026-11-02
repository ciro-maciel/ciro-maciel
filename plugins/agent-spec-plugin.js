import { writeFileSync } from 'fs'
import { resolve } from 'path'

/**
 * agentSpecPlugin — serve a especificação do design system em texto puro.
 *
 * Motivo: /design-system é uma SPA React. Um agente que faz fetch nela recebe
 * `<div id="app"></div>` e nada mais — a página é legível por humanos e
 * invisível para máquinas. Estas rotas resolvem isso:
 *
 *   /design-system.txt   Markdown completo (a spec inteira)
 *   /design-system.json  Os tokens como dados estruturados
 *   /llms-design.txt     Índice curto do design system, para agente
 *
 * NÃO emitimos /llms.txt aqui, só /llms-design.txt: aquele endereço é o ponto
 * de entrada do SITE (llmstxt.org), não do design system. Se um dia este
 * repositório ganhar um public/llms.txt, emitir os dois faria o build
 * sobrescrever o arquivo público em silêncio.
 *
 * Em dev, um middleware gera sob demanda — o texto acompanha qualquer edição
 * em tokens.js/api.js sem restart. No build, os arquivos são emitidos para
 * dist/ e servidos como estáticos.
 */
export function agentSpecPlugin() {
    // Carrega os módulos via Vite para que o import de .js com JSX-free ES
    // modules funcione igual em dev e build.
    async function render(server) {
        const { buildAgentSpec } = await server.ssrLoadModule('/src/design-system/agent-spec.js')
        return buildAgentSpec()
    }

    async function renderTokens(server) {
        const tokens = await server.ssrLoadModule('/src/design-system/tokens.js')
        const api = await server.ssrLoadModule('/src/design-system/api.js')
        return JSON.stringify(
            {
                meta: tokens.META,
                principles: tokens.PRINCIPLES,
                color: {
                    ramp: tokens.GRAY_RAMP,
                    semantic: tokens.SEMANTIC_COLORS,
                    loss: tokens.LOSS_COLOR,
                    contrast: tokens.CONTRAST_TABLE,
                },
                typography: {
                    fontFamily: tokens.FONT_FAMILY,
                    weights: tokens.FONT_WEIGHTS,
                    fluidScale: tokens.FLUID_SCALE,
                    roles: tokens.TYPE_ROLES,
                    tracking: tokens.TRACKING,
                    lineHeights: tokens.LINE_HEIGHTS,
                },
                space: {
                    scale: tokens.SPACE_SCALE,
                    stage: tokens.STAGE_RHYTHM,
                    containers: tokens.CONTAINERS,
                    measures: tokens.MEASURES,
                    breakpoints: tokens.BREAKPOINTS,
                },
                shape: { radius: tokens.RADIUS, borders: tokens.BORDERS, motion: tokens.MOTION, icons: tokens.ICONS },
                composition: {
                    layers: tokens.LAYERS,
                    vocabulary: tokens.SECTION_VOCABULARY,
                    universalProps: tokens.UNIVERSAL_PROPS,
                },
                audit: { blockers: tokens.BLOCKERS, checklist: tokens.CHECKLIST },
                api: {
                    setup: api.SETUP,
                    primitives: api.PRIMITIVES,
                    components: api.COMPONENTS,
                    aliases: api.ALIASES,
                    recipes: api.RECIPES,
                    pitfalls: api.PITFALLS,
                },
            },
            null,
            2,
        )
    }

    const LLMS_ENTRY = `# Zen Design System

> Design system monocromático, o mesmo de @ciromaciel/components-kit. Uma fonte (Montserrat),
> dez cinzas, raio zero. Especificação completa e autocontida — um agente
> consegue construir e validar uma interface inteira só com ela.

## Documentação

- [Especificação completa](/design-system.txt): tokens, API dos 24 componentes,
  receitas que compilam, erros frequentes e protocolo de validação executável.
- [Tokens em JSON](/design-system.json): os mesmos dados, estruturados.
- [Referência visual](/design-system): a mesma spec renderizada, com specs
  copiáveis e exemplos certo-vs-errado (requer JavaScript).

## Regras invariantes

- border-radius: sempre 0. Sem exceção.
- box-shadow: nunca.
- Cor: apenas a rampa gray (#FFFFFF → #11181C). Sem cor de marca.
- Peso da fonte: apenas 500, 700, 800, 900.
- Corpo é gray.6 (#4B5563); título é gray.9 (#11181C). Nunca invertido.
- Toda borda: 1px solid #F3F4F6.
- Toda seção envolve a primitiva Section. Fundos alternam white ↔ gray.
- Componentes recebem dados, nunca JSX.
`

    return {
        name: 'agent-spec',

        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const url = (req.url || '').split('?')[0]
                try {
                    if (url === '/design-system.txt') {
                        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                        res.setHeader('Access-Control-Allow-Origin', '*')
                        return res.end(await render(server))
                    }
                    if (url === '/design-system.json') {
                        res.setHeader('Content-Type', 'application/json; charset=utf-8')
                        res.setHeader('Access-Control-Allow-Origin', '*')
                        return res.end(await renderTokens(server))
                    }
                    if (url === '/llms-design.txt') {
                        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                        res.setHeader('Access-Control-Allow-Origin', '*')
                        return res.end(LLMS_ENTRY)
                    }
                } catch (err) {
                    res.statusCode = 500
                    return res.end(`Erro ao gerar a spec: ${err.message}`)
                }
                next()
            })
        },

        // No build o Vite não expõe ssrLoadModule, então importamos os módulos
        // direto — eles são ES modules sem JSX, então o Node os lê nativamente.
        async closeBundle() {
            const outDir = resolve(process.cwd(), 'dist')
            try {
                const { buildAgentSpec } = await import('../src/design-system/agent-spec.js')
                writeFileSync(resolve(outDir, 'design-system.txt'), buildAgentSpec(), 'utf-8')

                const tokens = await import('../src/design-system/tokens.js')
                const api = await import('../src/design-system/api.js')
                writeFileSync(
                    resolve(outDir, 'design-system.json'),
                    JSON.stringify({ meta: tokens.META, tokens, api }, null, 2),
                    'utf-8',
                )

                writeFileSync(resolve(outDir, 'llms-design.txt'), LLMS_ENTRY, 'utf-8')
                console.log('\n  agent-spec  design-system.txt · design-system.json · llms-design.txt emitidos')
            } catch (err) {
                console.warn('\n  agent-spec  falhou ao emitir:', err.message)
            }
        },
    }
}
