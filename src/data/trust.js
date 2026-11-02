/**
 * /about and /contact, the two pages an agent opens to check that a site
 * belongs to a real person before recommending it (06/10/2026).
 *
 * Same shape as src/data/legal.js, so pages/TrustPage.jsx draws them with
 * LegalDocument: a string is a paragraph, an array is a bullet list.
 *
 * EVERY SENTENCE IS SOMETHING THAT EXISTS: the books are on Amazon, the
 * extensions in the stores, the MCP answers at the address below. No e-mail,
 * on purpose: the public way in is WhatsApp and the networks in the footer.
 */
import BOOKS from './books.json'
import { SERIES } from './book-extras.js'
import { SITE } from './site.js'

export const TRUST_UPDATED = '6 de outubro de 2026'

export const MCP_URL = 'https://mcp.tools.ciromaciel.click/mcp'

const host = SITE.url.replace('https://', '')

export const ABOUT = {
    path: '/about',
    title: 'Sobre',
    subtitle: `Quem é ${SITE.name}`,
    description: `${SITE.name}, engenheiro de software há mais de vinte anos: os livros ${SERIES.name}, as ferramentas de IA e a infraestrutura onde um app passa a existir.`,
    updated: TRUST_UPDATED,
    closing: 'Quer conversar sobre um livro, uma ferramenta ou a infraestrutura? Fale comigo.',
    intro: [
        `${SITE.name} é engenheiro de software. Faz software há mais de vinte anos e hoje constrói os blocos que uma ideia precisa para existir de verdade: os livros que ensinam a usar a inteligência artificial no trabalho, as ferramentas que abrem no navegador e a infraestrutura onde um app passa a existir.`,
        'A aposta é simples: construir passou a ser de todos. O que faltava eram as ferramentas e o saber, e é isso que ele põe no ar, uma peça de cada vez, usando todo dia o que entrega.',
    ],
    sections: [
        {
            icon: 'book',
            title: `Os livros: ${SERIES.name}`,
            body: [
                `Uma série sobre o que é preciso saber de IA para trabalhar, em quatro níveis. Cada livro traz as conversas com a IA feitas de verdade e todo fato com fonte e data. Os volumes publicados estão na Amazon e têm página em ${host}/books.`,
                BOOKS.map(book => `${book.title}: ${book.subtitle}`),
            ],
        },
        {
            icon: 'tools',
            title: 'As ferramentas',
            body: [
                `Ferramentas gratuitas que abrem no navegador, extensões para o Chrome e para o VS Code, e um servidor MCP que entrega as mesmas ferramentas a assistentes de IA como Claude e ChatGPT. O catálogo está em ${host}/tools.`,
            ],
        },
        {
            icon: 'plug',
            title: 'A infraestrutura',
            body: [
                'As sete peças que uma aplicação precisa antes de existir — login, publicação, dados, cobrança, functions, monitoramento e e-mail — construídas com agentes e operadas por eles. Estão em produção em myinfrastructure.click, e este site roda nelas.',
            ],
        },
        {
            icon: 'scale',
            title: 'Quem responde',
            body: [
                `O site é assinado pela pessoa. A pessoa jurídica que responde por ele, por contrato e pela LGPD, está nomeada nos termos de uso e na política de privacidade, em ${host}/legal/terms e ${host}/legal/privacy.`,
            ],
        },
    ],
}

export const CONTACT = {
    path: '/contact',
    title: 'Contato',
    subtitle: `Como falar com ${SITE.name}`,
    description: `Os canais para falar com ${SITE.name}: WhatsApp, LinkedIn, GitHub, YouTube e Instagram. Ele mesmo responde.`,
    updated: '13 de outubro de 2026',
    closing: 'O caminho mais rápido:',
    intro: [
        `${SITE.name} responde pessoalmente, sem agenda automática. O caminho mais rápido é o WhatsApp; o formulário no fim desta página e as redes abaixo também chegam até ele.`,
        'As conversas são em português. Dúvida sobre um livro, uma ferramenta, uma extensão ou a infraestrutura: escreva dizendo qual, e o que aconteceu.',
    ],
    sections: [
        {
            icon: 'message',
            title: 'WhatsApp',
            body: [`A conversa direta: ${SITE.whatsapp}. Abre no aplicativo instalado ou no WhatsApp Web.`],
        },
        {
            icon: 'share',
            title: 'Redes',
            body: [[`LinkedIn: ${SITE.linkedin}`, `GitHub: ${SITE.github}`, `YouTube: ${SITE.youtube}`, `Instagram: ${SITE.instagram}`]],
        },
        {
            icon: 'shield',
            title: 'Segurança e dados pessoais',
            body: [
                `Encontrou uma vulnerabilidade? O caminho está em ${host}/legal/security. Pedidos sobre os seus dados pessoais, previstos na LGPD, seguem a política em ${host}/legal/privacy.`,
            ],
        },
        {
            icon: 'plug',
            title: 'Para agentes de IA',
            body: [
                `O resumo do site inteiro, em texto, está em ${host}/llms.txt. As ferramentas respondem por MCP em ${MCP_URL}, sem login, e o manifesto do servidor está em ${host}/.well-known/mcp.json.`,
            ],
        },
    ],
    // Marketing Forms, "Contato · ciromaciel.click" (id e651ff6a-b8d9-4634-bbd6-95466237dddd):
    // the fields, the consent text and the thank-you message are edited in the Forms panel.
    form: {
        code: 'f_888P',
        title: 'Deixe o seu contato',
        lead: 'Prefere escrever? Deixe o seu nome, o seu e-mail e, se quiser, o que você quer resolver. Quem lê e responde é ele.',
        note: 'O nome e o e-mail servem para responder a você. A caixa de novidades é opcional e nunca vem marcada. Para ver, corrigir ou apagar o que você enviou, fale pelo WhatsApp.',
    },
}

export const TRUST_PAGES = [ABOUT, CONTACT]
