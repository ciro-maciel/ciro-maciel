/**
 * The online kit of "Do primeiro visitante ao cliente" (volume 13), as data.
 * The page is pages/BookKit.jsx, at /books/do-primeiro-visitante-ao-cliente/kit.
 *
 * Written on 02/11/2026 from the book (regenerated from 1.0.0), before it is on sale. It lives in
 * the private `learning` repository until then: the site repository is public,
 * and a kit committed there is a kit published. At launch, this file and
 * kit-do-primeiro-visitante-ao-cliente.gerado.js go to ciro-maciel/src/data/
 * (learning/PUBLICAR.md, "O kit online").
 *
 * A build kit like volume 11's (data/kit-feito-para-agentes.js): SYSTEM, the
 * reader's business filled in once, whose values go into every prompt that
 * names it; and TRAIL, the fourteen steps, each with the chapter's "Pronto
 * quando" to tick.
 *
 * TASKS, TRAIL and TEMPLATES are generated from the chapters, never retyped
 * (learning/tools/kit.ts): every prompt is the code block of the chapter's
 * "Na sua operação", word for word, the print line breaks joined; each bracket
 * is a field, and the three that mean the reader's business or card come from
 * SYSTEM. The checks of a prompt are the chapter's "O que ler na resposta".
 * The templates are Helena's worked examples, to show the shape of an answer.
 *
 * The products band names where each technique runs in the author's products,
 * one line each, with the words the chapters use (checked against
 * manager/brand/product-truth*.md when the chapters were written). No price,
 * no count: those change and live on each product's page.
 */
import { TASKS, TRAIL, TEMPLATES } from './kit-do-primeiro-visitante-ao-cliente.gerado'

export { TASKS, TRAIL, TEMPLATES }

export const SYSTEM = {
    title: 'Preencha uma vez, e os prompts saem com o seu negócio',
    lead: 'O que você escrever aqui entra em todo prompt que fala do seu negócio e do seu cliente. Fica só neste navegador; nada de senha, chave ou dado de cliente.',
    fields: [
        { k: 'business', label: 'O que você vende, e a quem', ph: 'o que vende, a quem', hint: 'Em uma frase, como "programa on-line de reeducação alimentar para quem trabalha fora".' },
        {
            k: 'card',
            label: 'O cartão do seu cliente',
            ph: 'o cartão',
            hint: 'As quatro respostas e a pergunta que separa: quem chega e em que estado, o que quer e não diz, o que trava, com o que sai. É o do volume 12; sem ele, escreva as quatro respostas aqui.',
        },
    ],
}

export const KIT = {
    slug: 'do-primeiro-visitante-ao-cliente',
    checkedOn:
        'Os prompts são os do livro na versão 1.0.0, palavra por palavra, gerados dos capítulos; as fontes foram abertas em 2 de novembro de 2026. Quando uma página mudar, muda aqui, com a data da conferência.',
    lead: 'O seu negócio preenchido uma vez, e os prompts dos catorze capítulos saem prontos para ele; a trilha dos catorze passos, com o "pronto quando" de cada um para marcar; os exemplos da Helena, para ver a forma de cada resposta; e as fontes, com a data.',
    promises: ['Os prompts do livro, com o seu negócio', 'O exemplo de cada passo, preenchido', 'O que você digita fica no seu navegador'],
}

export const RULES = [
    {
        lead: 'O seu negócio, com os seus dados; nunca o de outra pessoa.',
        text: 'Nenhum dado de cliente entra num prompt: o cartão descreve um tipo de pessoa, e não alguém com nome. A ficha do capítulo 11 guarda o que a pessoa fez, nunca o que é sensível.',
    },
    {
        lead: 'O agente escreve; quem confere é você.',
        text: 'Cada prompt vem com o que ler na resposta, do capítulo. Leia antes de usar: o agente responde com a mesma segurança quando acerta e quando inventa.',
    },
    {
        lead: 'Nenhuma promessa que o seu texto não sustente.',
        text: 'Número, depoimento, escassez e prazo só entram se forem verdade e estiverem escritos (capítulo 6). E nenhum agente decide preço, desconto ou dinheiro de volta (capítulo 14).',
    },
]

const L = (label, href) => ({ label, href })

// Each product's "Como eu faço", in one line, as the chapter says it.
const PRODUCTS = [
    {
        title: 'Capítulo 1, os Connectors',
        text: 'Dois conectores que o seu assistente de IA usa: um lê no Search Console quais mapas o Google recebeu e inspeciona um endereço; o outro avisa pelo IndexNow, na hora em que a página vai ao ar, os buscadores que aceitam o aviso.',
        links: [L('Connectors', 'https://myagents.click/products/connectors')],
    },
    {
        title: 'Capítulo 2, o Assistant',
        text: 'O bloco que se repete do mesmo jeito toda semana vira um bot, com rotina de horário que roda com o painel fechado e a sua aprovação antes de enviar, pagar, apagar ou publicar; a tarefa no navegador, você ensina fazendo uma vez.',
        links: [L('Assistant', 'https://myagents.click/products/assistant')],
    },
    {
        title: 'Capítulo 3, o Payments',
        text: 'A assinatura chega como permissão: o sistema pergunta "esta pessoa pode?" e a resposta já considera o que ela pagou. O grátis nunca expira e só bloqueia criar o próximo recurso; e há a cobrança avulsa por Pix e cartão.',
        links: [L('Payments', 'https://myinfrastructure.click/products/payments')],
    },
    {
        title: 'Capítulo 4, o Pages',
        text: 'Cada página é uma sequência de blocos, publicada como uma versão que não muda, medida por bloco e por botão, sem cookie. O agente monta o rascunho e propõe textos; a versão publicada mostra quem propôs e quem aprovou.',
        links: [L('Pages', 'https://mymarketing.click/products/pages')],
    },
    {
        title: 'Capítulo 5, o Blogs',
        text: 'O blog mantém o mapa do site e o feed, gera o llms.txt de cada blog, marca os dados estruturados e avisa os buscadores pelo IndexNow na hora em que o post é publicado.',
        links: [L('Blogs', 'https://mymarketing.click/products/blogs')],
    },
    {
        title: 'Capítulo 6, o People',
        text: 'A lista do que nunca se diz vira uma seção do Manual da conta, e toda mensagem que um agente propõe passa por uma checagem sem IA contra ela antes de chegar a você.',
        links: [L('People', 'https://mycustomers.click/products/people')],
    },
    {
        title: 'Capítulo 7, o Forms',
        text: 'Só o e-mail é obrigatório; a caixa de consentimento nunca vem marcada, e a prova guarda a versão do texto, a hora e a página. O agente preenche, mas nunca consente; e apagar a resposta de alguém é de uma pessoa.',
        links: [L('Forms', 'https://mymarketing.click/products/forms')],
    },
    {
        title: 'Capítulo 8, o Links',
        text: 'Um link por peça, com a campanha levada ao site da conta sozinha; prévias de aplicativo e robôs contam à parte, e IP e navegador nunca são gravados. O destino é conferido a cada seis horas.',
        links: [L('Links', 'https://mymarketing.click/products/links')],
    },
    {
        title: 'Capítulo 9, o Newsletter e o Messages',
        text: 'Confirmação dupla sempre ligada; o clique é medido, e a abertura não; descadastro em um clique. As cartas saem por um caminho separado do e-mail transacional, que pausa sozinho se as reclamações passarem do limite.',
        links: [L('Newsletter', 'https://mymarketing.click/products/newsletter'), L('Messages', 'https://myinfrastructure.click/products/messages')],
    },
    {
        title: 'Capítulo 10, o Videos',
        text: 'O player para quem vende ou ensina mede quanto de cada vídeo foi assistido: é o número que diz qual bloco gravado segura a pessoa.',
        links: [L('Videos', 'https://myoperations.click/products/videos')],
    },
    {
        title: 'Capítulo 11, o People',
        text: 'Cada sistema manda eventos assinados para um endereço só, e o reenvio não duplica. O estágio sai dos eventos, cliente só com pagamento confirmado, e duas fichas nunca se juntam sozinhas.',
        links: [L('People', 'https://mycustomers.click/products/people')],
    },
    {
        title: 'Capítulo 12, o Messages e o Decks',
        text: 'A caixa de entrada nasce de um nome, cada assunto vira conversa, e o agente por padrão só rascunha. A apresentação nasce de uma frase, de um texto ou de um arquivo, com a marca da conta, e sai em PDF ou PowerPoint.',
        links: [L('Messages', 'https://myinfrastructure.click/products/messages'), L('Decks', 'https://mymarketing.click/products/decks')],
    },
    {
        title: 'Capítulo 13, o Analytics',
        text: 'Medição sem cookie, com metas e eventos com nome, e o recorte por origem, página ou campanha feito no servidor, para o número que você vê ter a mesma regra que o que o agente lê. E, se você já usa o Google Analytics, o conector que leva o seu assistente até ele.',
        links: [L('Analytics', 'https://myoperations.click/products/analytics'), L('Connectors', 'https://myagents.click/products/connectors')],
    },
    {
        title: 'Capítulo 14, o People e o Assistant',
        text: 'A proposta do agente passa por uma checagem sem IA e, quando é falar com a pessoa, pela aprovação de alguém. No Assistant, pagar e mexer em conta perguntam sempre, e o "Sempre permitir" nem aparece para elas.',
        links: [L('People', 'https://mycustomers.click/products/people'), L('Assistant', 'https://myagents.click/products/assistant')],
    },
]

const NEXT = [
    { title: 'A empresa de uma pessoa, o volume 12', text: 'O que vem antes deste: decidir o negócio, montar a equipe de agentes e operar. O cartão do cliente e as listas do nunca nascem lá.', links: [L('O livro', '/books/one-person-business')] },
    { title: 'Feito para agentes, o volume 11', text: 'Quando o agente do seu cliente é quem chega: o produto que a IA dos outros sabe operar.', links: [L('O livro', '/books/feito-para-agentes')] },
    { title: 'Construir com IA, o volume 10', text: 'O sistema no ar, com login, dados e cobrança, para quem cria sem ser programador.', links: [L('O livro', '/books/construir-com-ia')] },
    { title: 'O canal do autor', text: 'Os vídeos em que o autor mostra a construção.', links: [L('YouTube', 'https://www.youtube.com/@ciro-maciel')] },
]

export const SOURCES = [
    {
        title: 'O consentimento, na LGPD',
        text: 'O consentimento é uma das bases legais (art. 7º, I), e a prova de que ele foi dado é de quem guarda o dado (art. 8º, § 2º). Capítulos 7 e 9. Aberto em 2 de novembro de 2026.',
        links: [L('Lei 13.709/2018', 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm')],
    },
    {
        title: 'O descadastro em um clique',
        text: 'O padrão que os provedores de e-mail reconhecem para mostrar o "cancelar inscrição" ao lado do remetente. Capítulo 9.',
        links: [L('RFC 8058', 'https://www.rfc-editor.org/rfc/rfc8058')],
    },
    {
        title: 'O mapa do site e a inspeção',
        text: 'O que é o mapa do site, como enviá-lo ao Search Console e como inspecionar um endereço. Capítulos 1 e 5.',
        links: [
            L('O que é um sitemap', 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=pt-br'),
            L('Relatório de sitemaps', 'https://support.google.com/webmasters/answer/7451001?hl=pt-BR'),
            L('Inspeção de URL', 'https://support.google.com/webmasters/answer/9012289?hl=pt-BR'),
        ],
    },
    {
        title: 'O aviso aos buscadores',
        text: 'O IndexNow avisa, na hora em que a página vai ao ar, os buscadores que aceitam o aviso. Capítulos 1 e 5.',
        links: [L('IndexNow', 'https://www.indexnow.org/documentation')],
    },
    {
        title: 'Os parâmetros de campanha',
        text: 'O que são utm_source, utm_medium, utm_campaign e utm_content, na ajuda do Google Analytics; valem para qualquer ferramenta de medição que os leia. Capítulo 8.',
        links: [L('Criadores de URLs', 'https://support.google.com/analytics/answer/10917952?hl=pt-BR')],
    },
    {
        title: 'O llms.txt',
        text: 'A proposta do arquivo que diz a um assistente de IA o que o site tem. Capítulo 5.',
        links: [L('llmstxt.org', 'https://llmstxt.org/')],
    },
]

export const UPDATES = [
    {
        date: '02/11/2026',
        text: 'O kit acompanha o livro na versão 1.0.0: os prompts dos catorze capítulos, palavra por palavra, a trilha dos catorze passos, os exemplos da Helena, as ferramentas do autor onde cada passo roda e as fontes, abertas nesta data.',
    },
]

const criteria = items => items.map(item => ({ criterion: item.title, value: item.text, ...(item.links?.length ? { links: item.links } : {}) }))

export default {
    slug: 'do-primeiro-visitante-ao-cliente',
    // The localStorage prefix of this kit: changing it later would lose what
    // readers typed.
    storage: 'kit-dpv',
    noun: 'prompt',
    thing: 'negócio',
    trailTitle: 'Um passo por vez, do primeiro visitante ao cliente',
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
            description: 'Onde o autor aplica a técnica de cada capítulo, nos produtos que ele construiu, em uma linha. É do autor, e o livro diz isso: o que perguntar a qualquer outra ferramenta está em cada capítulo.',
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
