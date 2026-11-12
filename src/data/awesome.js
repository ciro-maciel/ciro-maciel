/**
 * /awesome: the curated lists of the founder, one public repository each
 * (github.com/ciro-maciel/awesome-<theme>), in Brazilian Portuguese with 14
 * translations. Approved on 10/11/2026 ("o sentido é plantar").
 *
 * WHERE EACH FACT COMES FROM. Title and description of each list are the ones
 * in open-source/awesome-kit/data/lists.json, the registry every README
 * reads; when a list is added there, it is added here too. Item counts are
 * left out on purpose: they change with every pull request.
 *
 * Plain data, no React: scripts/prerender.js and scripts/generate-sitemap.js
 * import it too.
 */

const REPO = slug => `https://github.com/ciro-maciel/${slug}`

export const AWESOME = {
    path: '/awesome',
    eyebrow: 'Listas awesome',
    title: 'O que vale a pena, separado por quem já procurou.',
    description:
        'Dezenove listas abertas no GitHub: IA por profissão, Pix, nota fiscal, pagamentos, APIs brasileiras, agentes e livros. Cada uma em português, traduzida para mais 14 idiomas, com JSON e RSS para quem quiser ler por programa.',
    note: 'As listas aceitam contribuição por pull request ou issue. O que o autor fez aparece marcado como "do autor"; a ordem dentro de cada seção é alfabética.',
    github: 'https://github.com/ciro-maciel?tab=repositories&q=awesome',
    // A donation with an open amount, by Pix or card (Mercado Pago), through Links.
    support: { label: 'Apoie com um café', href: 'https://go.mymarketing.click/apoie', note: 'Quem doa escolhe o valor, por Pix ou cartão.' },
    // Every list's Portuguese feed in one, joined once a day by awesome-kit (cron-awesome-feed.yml).
    feed: { label: 'Acompanhar todas pelo RSS', href: 'https://raw.githubusercontent.com/ciro-maciel/awesome-kit/main/feed/all.xml' },

    // The right column of the hero: how one list reads, with three real items of awesome-pix.
    preview: {
        label: 'Como uma lista aparece',
        list: 'Awesome Pix',
        // The same flag badges as the README's language row, drawn by awesome-kit (src/badges.js).
        badges: 'https://raw.githubusercontent.com/ciro-maciel/awesome-kit/main/badges',
        languages: [
            { code: 'pt', label: 'Português' },
            { code: 'en', label: 'English' },
            { code: 'hi', label: 'हिन्दी' },
        ],
        more: '+ 12 idiomas',
        items: [
            { name: 'Pix no Banco Central', description: 'A página oficial do Pix, com o que é, como funciona e os links para o resto.', tags: ['oficial', 'grátis'] },
            { name: 'emv-qrcode', description: 'Gerador e leitor de QR Code no padrão EMV, o padrão que o BR Code segue.', tags: ['código aberto'] },
            { name: 'Infrastructure Payments', description: 'Cobrança avulsa por Pix e cartão pelo Mercado Pago da sua conta.', tags: ['API', 'do autor'] },
        ],
        formats: ['README em 15 idiomas', 'JSON', 'RSS'],
    },

    stats: {
        subtitle: 'Em números',
        title: 'Abertas, traduzidas e livres para copiar.',
        items: [
            { value: '19', label: 'listas', description: 'Uma porta de IA no trabalho, sete profissões e onze temas.' },
            { value: '15', label: 'idiomas', description: 'Português primeiro; as outras 14 línguas são traduzidas a partir dele.' },
            { value: 'CC0', label: 'licença', description: 'Copiar, traduzir e republicar sem pedir.' },
        ],
        note: 'Contagem do registro das listas em 10/11/2026. Cada endereço foi aberto antes de entrar na lista.',
    },

    how: {
        subtitle: 'Como cada lista é feita',
        title: 'Curadoria de gente, entrega de máquina.',
        description: 'Uma pessoa escolhe e confere cada item. O resto, tradução, links e formatos, sai sozinho a cada mudança.',
        items: [
            { icon: 'circle-check', title: 'Cada endereço aberto', description: 'Nenhum link entra sem ter sido aberto na hora da curadoria. Biblioteca precisa ter atividade recente.' },
            { icon: 'language', title: 'Português primeiro', description: 'O texto nasce em português do Brasil e é traduzido para 14 idiomas. Só o que muda é traduzido de novo.' },
            { icon: 'braces', title: 'JSON e RSS', description: 'Cada lista sai também como dados e como feed, para ler por programa ou acompanhar no leitor.' },
            { icon: 'git-pull-request', title: 'Aberta a quem quiser', description: 'Issue e pull request com modelo pronto. O que é do autor fica marcado, entre os outros, com as mesmas regras.' },
        ],
    },

    closing: {
        subtitle: 'Contribuir',
        title: 'Falta algo que você usa?',
        description: 'Abra uma issue na lista certa com o link e uma frase sobre o que ele faz. Se o endereço abrir e servir, entra.',
        cta: { label: 'Ver as listas no GitHub', href: 'https://github.com/ciro-maciel?tab=repositories&q=awesome' },
    },

    groups: [
        {
            id: 'ia-no-trabalho',
            title: 'IA no trabalho',
            line: 'Uma porta para todo mundo e uma lista por profissão, com as normas e as fontes oficiais de cada ofício.',
            lists: [
                { slug: 'awesome-ia-no-trabalho', kind: 'Comece aqui', title: 'Awesome IA no trabalho', description: 'IA no trabalho, por profissão: assistentes, privacidade, normas e fontes oficiais para conferir o que a IA escreveu.', url: REPO('awesome-ia-no-trabalho') },
                { slug: 'awesome-ia-advocacia', kind: 'Profissão', title: 'Awesome IA na advocacia', description: 'IA para advogados: assistentes, privacidade, normas sobre IA na advocacia e no Judiciário, e as fontes oficiais para conferir.', url: REPO('awesome-ia-advocacia') },
                { slug: 'awesome-ia-contabilidade', kind: 'Profissão', title: 'Awesome IA na contabilidade', description: 'IA para contadores: assistentes, privacidade, normas do CFC e as fontes da Receita, do eSocial e do Simples para conferir.', url: REPO('awesome-ia-contabilidade') },
                { slug: 'awesome-ia-sala-de-aula', kind: 'Profissão', title: 'Awesome IA na sala de aula', description: 'IA para professores: assistentes, idade mínima e privacidade de cada um, e as normas da educação para conferir.', url: REPO('awesome-ia-sala-de-aula') },
                { slug: 'awesome-ia-atendimento-e-vendas', kind: 'Profissão', title: 'Awesome IA no atendimento e nas vendas', description: 'IA para quem atende e vende: assistentes, privacidade, direitos do consumidor e as regras do trabalho de quem está no balcão, no caixa e no telefone.', url: REPO('awesome-ia-atendimento-e-vendas') },
                { slug: 'awesome-ia-escritorio', kind: 'Profissão', title: 'Awesome IA no escritório', description: 'IA para secretárias, assistentes e auxiliares administrativos: assistentes, privacidade, redação oficial e golpes que chegam por e-mail.', url: REPO('awesome-ia-escritorio') },
                { slug: 'awesome-ia-pequeno-negocio', kind: 'Profissão', title: 'Awesome IA no pequeno negócio', description: 'IA para o MEI e o pequeno empresário: assistentes, privacidade, as regras do MEI e do Simples, do consumidor e da LGPD para quem é pequeno.', url: REPO('awesome-ia-pequeno-negocio') },
                { slug: 'awesome-ia-primeiro-trabalho', kind: 'Profissão', title: 'Awesome IA no primeiro trabalho', description: 'IA para quem está começando a trabalhar: assistentes, privacidade, onde procurar vaga, os direitos do primeiro emprego e os golpes da vaga falsa.', url: REPO('awesome-ia-primeiro-trabalho') },
            ],
        },
        {
            id: 'integrar',
            title: 'Para quem integra',
            line: 'Pix, nota fiscal, pagamentos, Open Finance, WhatsApp e as APIs públicas brasileiras.',
            lists: [
                { slug: 'awesome-pix', kind: 'Integração', title: 'Awesome Pix', description: 'Pix para quem integra: normas, APIs, SDKs, provedores e ferramentas, conferidos um a um.', url: REPO('awesome-pix') },
                { slug: 'awesome-nfe', kind: 'Integração', title: 'Awesome NF-e', description: 'Nota fiscal eletrônica para quem integra: portais oficiais, bibliotecas por linguagem, APIs de emissão e servidores MCP.', url: REPO('awesome-nfe') },
                { slug: 'awesome-pagamentos-brasil', kind: 'Integração', title: 'Awesome pagamentos Brasil', description: 'Pagamentos no Brasil para quem integra: normas, gateways, adquirentes, boleto, assinatura, split e antifraude.', url: REPO('awesome-pagamentos-brasil') },
                { slug: 'awesome-open-finance-brasil', kind: 'Integração', title: 'Awesome Open Finance Brasil', description: 'Open Finance e Open Insurance no Brasil: normas, especificações, dados abertos, agregadores e código aberto.', url: REPO('awesome-open-finance-brasil') },
                { slug: 'awesome-whatsapp-api', kind: 'Integração', title: 'Awesome WhatsApp API', description: 'WhatsApp para quem integra: a API oficial da Meta, os provedores, as bibliotecas não oficiais e o risco de cada caminho.', url: REPO('awesome-whatsapp-api') },
                { slug: 'awesome-apis-brasil', kind: 'Integração', title: 'Awesome APIs Brasil', description: 'APIs públicas brasileiras: CEP, CNPJ, Banco Central, IBGE, Legislativo, Judiciário, feriados e dados abertos.', url: REPO('awesome-apis-brasil') },
                { slug: 'awesome-mcp-brasil', kind: 'Integração', title: 'Awesome MCP Brasil', description: 'Servidores MCP para serviços brasileiros: dados públicos, CNPJ, fiscal, jurídico, mercado financeiro, comércio e pagamentos.', url: REPO('awesome-mcp-brasil') },
            ],
        },
        {
            id: 'construir',
            title: 'Para quem constrói e aprende',
            line: 'Agentes, ferramentas grátis e livros.',
            lists: [
                { slug: 'awesome-empresa-de-uma-pessoa', kind: 'Negócio', title: 'Awesome empresa de uma pessoa', description: 'O que uma pessoa usa para tocar um negócio inteiro com agentes de IA: pôr no ar, cobrar, medir, divulgar e ser encontrada.', url: REPO('awesome-empresa-de-uma-pessoa') },
                { slug: 'awesome-claude-code-br', kind: 'Agentes', title: 'Awesome Claude Code BR', description: 'Claude Code em português: documentação, cursos, skills, regras, plugins e servidores MCP feitos no Brasil.', url: REPO('awesome-claude-code-br') },
                { slug: 'awesome-ferramentas-online', kind: 'Ferramentas', title: 'Awesome ferramentas online', description: 'Ferramentas grátis que abrem no navegador, sem instalar: imagem, PDF, texto, código, sites, e-mail, vídeo e vendas.', url: REPO('awesome-ferramentas-online') },
                { slug: 'awesome-livros-ia', kind: 'Livros', title: 'Awesome livros de IA', description: 'Livros sobre inteligência artificial em português: do primeiro uso à profissão, de quem constrói ao debate.', url: REPO('awesome-livros-ia') },
            ],
        },
    ],
}

/** Every list, in page order. */
export const awesomeLists = () => AWESOME.groups.flatMap(group => group.lists)

/** The list that goes with each book: its sources and tools, kept current after the book is printed. */
export const BOOK_LISTS = {
    'ia-no-dia-a-dia': 'awesome-ia-no-trabalho',
    'ia-por-dentro': 'awesome-ia-no-trabalho',
    'ia-no-escritorio': 'awesome-ia-escritorio',
    'ia-no-primeiro-trabalho': 'awesome-ia-primeiro-trabalho',
    'ia-no-pequeno-negocio': 'awesome-ia-pequeno-negocio',
    'ia-no-atendimento-e-nas-vendas': 'awesome-ia-atendimento-e-vendas',
    'ia-na-sala-de-aula': 'awesome-ia-sala-de-aula',
    'ia-na-contabilidade': 'awesome-ia-contabilidade',
    'ia-na-advocacia': 'awesome-ia-advocacia',
    'one-person-business': 'awesome-empresa-de-uma-pessoa',
}

/** The list of a book, or null. */
export const listOfBook = slug => awesomeLists().find(list => list.slug === BOOK_LISTS[slug]) ?? null
