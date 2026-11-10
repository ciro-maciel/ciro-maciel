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
    title: 'Listas curadas, em português, com cada endereço conferido',
    description:
        'Dezenove listas abertas no GitHub: IA por profissão, Pix, nota fiscal, pagamentos, APIs brasileiras, agentes e livros. Cada uma em português, traduzida para mais 14 idiomas, com JSON e RSS para quem quiser ler por programa.',
    note: 'As listas aceitam contribuição por pull request ou issue. O que o autor fez aparece marcado como "do autor"; a ordem dentro de cada seção é alfabética.',
    groups: [
        {
            id: 'ia-no-trabalho',
            title: 'IA no trabalho',
            line: 'Uma porta para todo mundo e uma lista por profissão, com as normas e as fontes oficiais de cada ofício.',
            lists: [
                { slug: 'awesome-ia-no-trabalho', title: 'Awesome IA no trabalho', description: 'IA no trabalho, por profissão: assistentes, privacidade, normas e fontes oficiais para conferir o que a IA escreveu.', url: REPO('awesome-ia-no-trabalho') },
                { slug: 'awesome-ia-advocacia', title: 'Awesome IA na advocacia', description: 'IA para advogados: assistentes, privacidade, normas sobre IA na advocacia e no Judiciário, e as fontes oficiais para conferir.', url: REPO('awesome-ia-advocacia') },
                { slug: 'awesome-ia-contabilidade', title: 'Awesome IA na contabilidade', description: 'IA para contadores: assistentes, privacidade, normas do CFC e as fontes da Receita, do eSocial e do Simples para conferir.', url: REPO('awesome-ia-contabilidade') },
                { slug: 'awesome-ia-sala-de-aula', title: 'Awesome IA na sala de aula', description: 'IA para professores: assistentes, idade mínima e privacidade de cada um, e as normas da educação para conferir.', url: REPO('awesome-ia-sala-de-aula') },
                { slug: 'awesome-ia-atendimento-e-vendas', title: 'Awesome IA no atendimento e nas vendas', description: 'IA para quem atende e vende: assistentes, privacidade, direitos do consumidor e as regras do trabalho de quem está no balcão, no caixa e no telefone.', url: REPO('awesome-ia-atendimento-e-vendas') },
                { slug: 'awesome-ia-escritorio', title: 'Awesome IA no escritório', description: 'IA para secretárias, assistentes e auxiliares administrativos: assistentes, privacidade, redação oficial e golpes que chegam por e-mail.', url: REPO('awesome-ia-escritorio') },
                { slug: 'awesome-ia-pequeno-negocio', title: 'Awesome IA no pequeno negócio', description: 'IA para o MEI e o pequeno empresário: assistentes, privacidade, as regras do MEI e do Simples, do consumidor e da LGPD para quem é pequeno.', url: REPO('awesome-ia-pequeno-negocio') },
                { slug: 'awesome-ia-primeiro-trabalho', title: 'Awesome IA no primeiro trabalho', description: 'IA para quem está começando a trabalhar: assistentes, privacidade, onde procurar vaga, os direitos do primeiro emprego e os golpes da vaga falsa.', url: REPO('awesome-ia-primeiro-trabalho') },
            ],
        },
        {
            id: 'integrar',
            title: 'Para quem integra',
            line: 'Pix, nota fiscal, pagamentos, Open Finance, WhatsApp e as APIs públicas brasileiras.',
            lists: [
                { slug: 'awesome-pix', title: 'Awesome Pix', description: 'Pix para quem integra: normas, APIs, SDKs, provedores e ferramentas, conferidos um a um.', url: REPO('awesome-pix') },
                { slug: 'awesome-nfe', title: 'Awesome NF-e', description: 'Nota fiscal eletrônica para quem integra: portais oficiais, bibliotecas por linguagem, APIs de emissão e servidores MCP.', url: REPO('awesome-nfe') },
                { slug: 'awesome-pagamentos-brasil', title: 'Awesome pagamentos Brasil', description: 'Pagamentos no Brasil para quem integra: normas, gateways, adquirentes, boleto, assinatura, split e antifraude.', url: REPO('awesome-pagamentos-brasil') },
                { slug: 'awesome-open-finance-brasil', title: 'Awesome Open Finance Brasil', description: 'Open Finance e Open Insurance no Brasil: normas, especificações, dados abertos, agregadores e código aberto.', url: REPO('awesome-open-finance-brasil') },
                { slug: 'awesome-whatsapp-api', title: 'Awesome WhatsApp API', description: 'WhatsApp para quem integra: a API oficial da Meta, os provedores, as bibliotecas não oficiais e o risco de cada caminho.', url: REPO('awesome-whatsapp-api') },
                { slug: 'awesome-apis-brasil', title: 'Awesome APIs Brasil', description: 'APIs públicas brasileiras: CEP, CNPJ, Banco Central, IBGE, Legislativo, Judiciário, feriados e dados abertos.', url: REPO('awesome-apis-brasil') },
                { slug: 'awesome-mcp-brasil', title: 'Awesome MCP Brasil', description: 'Servidores MCP para serviços brasileiros: dados públicos, CNPJ, fiscal, jurídico, mercado financeiro, comércio e pagamentos.', url: REPO('awesome-mcp-brasil') },
            ],
        },
        {
            id: 'construir',
            title: 'Para quem constrói e aprende',
            line: 'Agentes, ferramentas grátis e livros.',
            lists: [
                { slug: 'awesome-empresa-de-uma-pessoa', title: 'Awesome empresa de uma pessoa', description: 'O que uma pessoa usa para tocar um negócio inteiro com agentes de IA: pôr no ar, cobrar, medir, divulgar e ser encontrada.', url: REPO('awesome-empresa-de-uma-pessoa') },
                { slug: 'awesome-claude-code-br', title: 'Awesome Claude Code BR', description: 'Claude Code em português: documentação, cursos, skills, regras, plugins e servidores MCP feitos no Brasil.', url: REPO('awesome-claude-code-br') },
                { slug: 'awesome-ferramentas-online', title: 'Awesome ferramentas online', description: 'Ferramentas grátis que abrem no navegador, sem instalar: imagem, PDF, texto, código, sites, e-mail, vídeo e vendas.', url: REPO('awesome-ferramentas-online') },
                { slug: 'awesome-livros-ia', title: 'Awesome livros de IA', description: 'Livros sobre inteligência artificial em português: do primeiro uso à profissão, de quem constrói ao debate.', url: REPO('awesome-livros-ia') },
            ],
        },
    ],
}

/** Every list, in page order. */
export const awesomeLists = () => AWESOME.groups.flatMap(group => group.lists)
