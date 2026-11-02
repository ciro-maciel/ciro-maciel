/**
 * /alternatives — one page per paid or closed Mac app, with the free and
 * open-source Mac app of the founder that does the same job.
 *
 * Approved by the founder on 19/10/2026, in place of copying a directory of
 * alternatives: every page here is written from what was read, never scraped.
 *
 * WHERE EACH FACT COMES FROM.
 *   - Our apps: the README.pt-BR.md of each repository (github.com/ciro-maciel/
 *     <repo>) and the app's own page (applications/apps/<id>/website/src/
 *     content.js), which were checked against the code.
 *   - The competitors: the official site, pricing page, Mac App Store page or
 *     GitHub repository, read on the date each page's `sources.note` gives.
 *     A fact that could not be read there is left out, not guessed.
 *
 * Every page carries "Onde o X é melhor": the honest paragraph is what makes
 * the comparison worth reading (brand/voice.md: "admite o que não faz").
 *
 * Plain data, no React: scripts/prerender.js, scripts/generate-sitemap.js and
 * scripts/generate-llms.js import it too.
 */

const REQUIREMENTS_14 = 'Grátis, licença MIT, assinado e notarizado pela Apple. Mac com Apple Silicon (M1 ou mais novo) e macOS 14 ou mais novo. Interface em inglês e em português do Brasil.'

/** The founder's six Mac apps. `id` is the tool's address on this site (/tools/<id>). */
const APPS = {
    cleaner: {
        id: 'cleaner',
        name: 'Cleaner',
        toolPath: '/tools/cleaner',
        repo: 'https://github.com/ciro-maciel/cleaner',
        line: 'O limpador de Mac que mostra tudo antes de apagar: regras públicas, quarentena de 7 dias e nenhum código de rede.',
        requirements: REQUIREMENTS_14,
        operatingSystem: 'macOS 14 ou mais novo, Apple Silicon',
    },
    screenshots: {
        id: 'screenshots',
        name: 'Screenshots',
        toolPath: '/tools/screenshots',
        repo: 'https://github.com/ciro-maciel/screenshots',
        line: 'Captura, anotação e gravação de tela na barra de menus, sem nada sair do Mac.',
        requirements: REQUIREMENTS_14,
        operatingSystem: 'macOS 14 ou mais novo, Apple Silicon',
    },
    windows: {
        id: 'windows',
        name: 'Windows',
        toolPath: '/tools/windows',
        repo: 'https://github.com/ciro-maciel/windows',
        line: 'Janelas no lugar com um atalho ou levando até a borda, só na barra de menus e sem usar a internet.',
        requirements: REQUIREMENTS_14,
        operatingSystem: 'macOS 14 ou mais novo, Apple Silicon',
    },
    'speech-to-text': {
        id: 'speech-to-text',
        name: 'Speech to Text',
        toolPath: '/tools/speech-to-text',
        repo: 'https://github.com/ciro-maciel/speech-to-text',
        line: 'Ditado por atalho em qualquer app, com o Parakeet rodando no Mac: a voz não sai do computador e não há cota de minutos.',
        requirements: REQUIREMENTS_14,
        operatingSystem: 'macOS 14 ou mais novo, Apple Silicon',
    },
    'text-to-speech': {
        id: 'text-to-speech',
        name: 'Text to Speech',
        toolPath: '/tools/text-to-speech',
        repo: 'https://github.com/ciro-maciel/text-to-speech',
        line: 'Selecione um texto em qualquer app, aperte um atalho e ouça, em português do Brasil.',
        requirements: REQUIREMENTS_14,
        operatingSystem: 'macOS 14 ou mais novo, Apple Silicon',
    },
    'voice-assistant': {
        id: 'voice-assistant',
        name: 'Assistant',
        toolPath: '/tools/voice-assistant',
        repo: 'https://github.com/ciro-maciel/voice-assistant',
        line: 'O Claude Code por voz: diga o nome, peça em voz alta, e ele responde falando enquanto trabalha.',
        requirements: 'Grátis, licença MIT, assinado e notarizado pela Apple. Mac com Apple Silicon e macOS 14 ou mais novo, com o Claude Code e login feito. Interface e conversa em inglês e em português do Brasil.',
        operatingSystem: 'macOS 14 ou mais novo, Apple Silicon',
    },
}

import { ITEMS } from './alternatives-items.js'

export const ALTERNATIVES = {
    path: '/alternatives',
    eyebrow: 'Alternativas para Mac',
    title: 'Alternativas grátis e de código aberto a apps pagos de Mac',
    description: 'Apps de Mac grátis, de código aberto e sem conta no lugar de limpador, captura de tela, janelas, ditado e voz pagos, com o que cada um faz melhor.',
    note: 'Os preços, sistemas e recursos dos outros apps vêm dos sites oficiais, das páginas da Mac App Store e dos repositórios no GitHub, conferidos na data que cada página mostra. O que não deu para conferir ficou de fora.',
    apps: APPS,
    items: ITEMS,
}

/** The pages grouped by our app, in the order the apps are declared above. */
export function alternativesByApp() {
    return Object.values(APPS)
        .map(app => ({ app, items: ITEMS.filter(item => item.app === app.id) }))
        .filter(group => group.items.length > 0)
}
