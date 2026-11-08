/**
 * The online kit of "A empresa de uma pessoa" (volume 12), as data. The page
 * is pages/BookKit.jsx, at /books/one-person-business/kit.
 *
 * Written on 02/11/2026 and kept in the private `learning` repository until the
 * book went on sale; generated there (learning/tools/kit.ts) and copied here
 * with kit-one-person-business.gerado.js at launch (learning/PUBLICAR.md §8).
 * The book is in data/books.json since then: no stand-in.
 *
 * A build kit like volume 11's (data/kit-feito-para-agentes.js): SYSTEM, the
 * reader's business filled in once; TRAIL, the fourteen steps, each with the
 * chapter's "Pronto quando" to tick.
 *
 * TASKS, TRAIL and TEMPLATES are generated from the chapters, never retyped
 * (learning/tools/kit.ts): every prompt is the code block of the chapter's
 * "Na sua operação", word for word; the templates are the chapter's own
 * formats (the role, the three memory files) and Helena's worked examples.
 *
 *
 * The products band names where each technique runs in the author's
 * products, with the words the chapters use. The book says "more than fifteen
 * products" and never lists them: only the ones a chapter names are here.
 */
import { TASKS, TRAIL, TEMPLATES } from './kit-one-person-business.gerado'

export { TASKS, TRAIL, TEMPLATES }

export const SYSTEM = {
    title: 'Preencha uma vez, e os prompts saem com o seu negócio',
    lead: 'O que você escrever aqui entra em todo prompt que fala do seu negócio. Fica só neste navegador; nada de senha, chave ou dado de cliente.',
    fields: [{ k: 'business', label: 'O que você vende, e a quem', ph: 'o que você vende e a quem', hint: 'Em uma frase, como "programa on-line de reeducação alimentar para quem trabalha fora".' }],
}

export const KIT = {
    slug: 'one-person-business',
    checkedOn:
        'Os prompts e os modelos são os do livro na versão 1.0.0, à venda desde novembro de 2026, palavra por palavra, gerados dos capítulos. Quando uma página mudar, muda aqui, com a data da conferência.',
    lead: 'O seu negócio preenchido uma vez, e os prompts dos capítulos saem prontos para ele; a trilha dos catorze passos, com o "pronto quando" de cada um para marcar; os modelos para copiar, como o de cargo; e os exemplos da Helena, para ver a forma de cada resposta.',
    promises: ['Os prompts do livro, com o seu negócio', 'Os modelos e os exemplos, para copiar', 'O que você digita fica no seu navegador'],
}

export const RULES = [
    {
        lead: 'Um cargo por vez.',
        text: 'Um agente com um cargo bem escrito ensina mais do que cinco mal escritos. O segundo só vem quando muda o acesso, o ritmo ou o risco (capítulo 6).',
    },
    {
        lead: 'O agente escreve; quem confere é você.',
        text: 'Cada prompt vem com o que ler na resposta, do capítulo. E o relatório do agente não é verdade até o sistema confirmar (capítulo 10).',
    },
    {
        lead: 'O nunca mora no sistema, e não só na instrução.',
        text: 'Pagar, apagar, mandar em seu nome e mexer em conta esperam você, e o acesso do agente não alcança o que a lista do nunca proíbe (capítulo 9).',
    },
]

const L = (label, href) => ({ label, href })

// Each product a chapter names, in one line, as the chapter's "Nas ferramentas que eu construo" says it.
const PRODUCTS = [
    {
        title: 'Capítulos 1 e 5, o Infrastructure',
        text: 'As sete peças que um negócio precisa antes do primeiro agente: login, publicação, dados, cobrança, código, monitoramento e e-mail, cada uma com um servidor MCP, o mesmo login e a autorização dada produto por produto.',
        links: [L('Infrastructure', 'https://myinfrastructure.click/')],
    },
    {
        title: 'Capítulos 1, 9 e 10, o Universal MCP',
        text: 'A ponte que roda perto do sistema do seu negócio (arquivos CSV e JSON, pastas, programas com interface de programação) e dá ao seu assistente um endereço para lê-lo. A primeira escrita só faz um ensaio e pede aprovação no painel; nada fica guardado no caminho.',
        links: [L('Universal MCP', 'https://myagents.click/products/universal')],
    },
    {
        title: 'Capítulos 2, 3 e 7, o Brain',
        text: 'A memória dos agentes: a constituição, o cartão do cliente e as regras viram decisões com a fonte e o porquê; o que muda vira versão nova; o aposentado para de carregar e continua legível; e o ponto em que cada trabalho parou vira uma retomada.',
        links: [L('Brain', 'https://myagents.click/products/brain')],
    },
    {
        title: 'Capítulos 6, 8, 9 e 10, o Assistant',
        text: 'O cargo vira um bot, com um computador próprio na nuvem, rotinas com horário e a sua aprovação antes de enviar, pagar, apagar ou publicar. Cada ferramenta é livre, confirma ou só humano, e o registro de decisões é o dado da escada de confiança.',
        links: [L('Assistant', 'https://myagents.click/products/assistant')],
    },
    {
        title: 'Capítulo 11, o Functions',
        text: 'Um teste que roda sozinho, como código agendado, sem servidor para manter.',
        links: [L('Functions', 'https://myinfrastructure.click/products/functions')],
    },
    {
        title: 'Capítulo 12, os Connectors e o Analytics',
        text: 'Conectores para o Search Console, o Google Analytics, o YouTube, o App Store Connect e o Google Play, com os dados do serviço só de passagem; e o Analytics, que mede o seu site sem cookie, com metas e eventos com nome.',
        links: [L('Connectors', 'https://myagents.click/products/connectors'), L('Analytics', 'https://myoperations.click/products/analytics')],
    },
    {
        title: 'Capítulo 13, o Monitors',
        text: 'Confere se cada endereço responde, confirma o incidente antes de avisar e publica uma página de status no seu domínio.',
        links: [L('Monitors', 'https://myinfrastructure.click/products/monitors')],
    },
    {
        title: 'Capítulo 14, o Payments e o conector de CNPJ e CEP',
        text: 'As duas cobranças do mapa Brasil: a assinatura no cartão, que chega ao seu sistema como permissão, e a cobrança avulsa por Pix e cartão, pelo Mercado Pago da sua própria conta; e a consulta da empresa e do endereço dentro da conversa com o seu assistente.',
        links: [L('Payments', 'https://myinfrastructure.click/products/payments'), L('Connectors', 'https://myagents.click/products/connectors')],
    },
]

const NEXT = [
    { title: 'Do primeiro visitante ao cliente, o volume 13', text: 'O que vem depois deste: a vitrine, a captação e o relacionamento, montados com agentes.', links: [L('O livro', '/books/do-primeiro-visitante-ao-cliente')] },
    { title: 'Feito para agentes, o volume 11', text: 'Quando o agente do seu cliente é quem chega: o produto que a IA dos outros sabe operar.', links: [L('O livro', '/books/feito-para-agentes')] },
    { title: 'Construir com IA, o volume 10', text: 'O sistema no ar, com login, dados e cobrança, para quem cria sem ser programador.', links: [L('O livro', '/books/construir-com-ia')] },
    { title: 'O canal do autor', text: 'Os vídeos em que o autor mostra a construção.', links: [L('YouTube', 'https://www.youtube.com/@ciro-maciel')] },
]

// The works the chapters cite (research/referencias.yaml), opened on 02/11/2026.
export const SOURCES = [
    {
        title: 'O "unicórnio de uma pessoa"',
        text: 'O caso que a imprensa usou como símbolo, e que terminou com advertência do órgão regulador americano e ação coletiva. Capítulo 1. Yahoo Finance, 7 de abril de 2026.',
        links: [L('A reportagem', 'https://finance.yahoo.com/sectors/healthcare/articles/1-8-billion-startup-just-190000841.html')],
    },
    {
        title: 'A operação feita por código',
        text: 'Pieter Levels, que toca vários produtos sozinho, sobre a operação do dia feita quase toda por código. Capítulo 5. Lex Fridman Podcast, episódio 440, 20 de agosto de 2024.',
        links: [L('A transcrição', 'https://lexfridman.com/pieter-levels-transcript/')],
    },
    {
        title: 'Ficar pequeno de propósito',
        text: 'Company of One, de Paul Jarvis (2019): a linhagem de livros que defende o negócio pequeno como escolha. Capítulo 1.',
        links: [],
    },
    {
        title: 'Para ler depois',
        text: 'Três das leituras recomendadas do livro: quem documenta a própria operação, quem constrói pequeno e quem trabalha com IA.',
        links: [L('MAKE, de Pieter Levels', 'https://readmake.com'), L('Getting Real, da 37signals', 'https://basecamp.com/gettingreal'), L('Cointeligência, de Ethan Mollick', 'https://loja.intrinseca.com.br/cointeligencia-a-vida-e-o-trabalho-com-ia')],
    },
]

export const UPDATES = [
    {
        date: '02/11/2026',
        text: 'O kit acompanha o livro na versão 1.0.0, no lançamento: os prompts e os modelos dos catorze capítulos, palavra por palavra, a trilha dos catorze passos, os exemplos da Helena e as ferramentas do autor onde cada passo roda.',
    },
]

const criteria = items => items.map(item => ({ criterion: item.title, value: item.text, ...(item.links?.length ? { links: item.links } : {}) }))

export default {
    slug: 'one-person-business',
    // The localStorage prefix of this kit: changing it later would lose what
    // readers typed.
    storage: 'kit-opb',
    noun: 'prompt',
    thing: 'negócio',
    trailTitle: 'Um passo por vez, até o negócio caber em uma pessoa',
    readyNote: 'Marque depois de conferir no seu negócio, como o capítulo pede.',
    rulesTitle: 'Três regras antes de qualquer prompt',
    promptsLead: 'Os prompts dos capítulos, palavra por palavra, agrupados pelo passo. O que você preencheu em O seu negócio já entra; o resto continua entre colchetes até você preencher. Confira cada resposta como o capítulo ensina.',
    notebook: false,
    KIT,
    RULES,
    SYSTEM,
    TRAIL,
    TASKS,
    TEMPLATES,
    EXERCISES: [],
    SOURCES,
    UPDATES,
    bands: [
        {
            type: 'criteria',
            id: 'products',
            subtitle: 'Onde cada técnica roda',
            title: 'Cada passo nos produtos do autor',
            description: 'Onde o autor aplica a técnica dos capítulos, nos produtos que ele construiu, em uma linha. É do autor, e o livro diz isso: o que perguntar a qualquer outra ferramenta está em cada capítulo.',
            items: criteria(PRODUCTS),
            background: 'white',
        },
        {
            type: 'criteria',
            id: 'next',
            subtitle: 'Para continuar',
            title: 'Os outros volumes e o canal do autor',
            description: 'Os volumes da série que seguem este caminho, atualizados quando um sair.',
            items: criteria(NEXT),
            background: 'gray',
        },
    ],
}
