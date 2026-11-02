/**
 * What each book.yml does not know: the menu line, the line for "Para quem",
 * and the store. Plain data, no icons, so the build scripts can read it too
 * (scripts/prerender.js) — catalog.js imports it for the site.
 *
 * AMAZON LINKS. `amazon` is the product page once the book is live. While a
 * book is in KDP review it has no page yet, so `amazon` is null and the button
 * searches the store for the title and the author — the search finds it the
 * day it goes live, and never sends the reader to a wrong book.
 */
export const BOOK_EXTRAS = {
    'ia-no-dia-a-dia': {
        menuLine: 'O primeiro degrau: pedir, conferir, proteger os dados',
        forWhom: 'Para quem quer usar bem, no trabalho e em casa',
        // Live on Amazon.com.br (ASIN B0HLLC1WDP), given by the founder on 01/10/2026.
        amazon: 'https://www.amazon.com.br/dp/B0HLLC1WDP',
    },
    'ia-por-dentro': {
        menuLine: 'Como funcionam as máquinas que conversam',
        forWhom: 'Para entender o que acontece do outro lado',
        // Live on Amazon.com.br (ASIN B0HLRYRWBF), given by the founder on 02/10/2026.
        amazon: 'https://www.amazon.com.br/dp/B0HLRYRWBF',
    },
    'ia-no-escritorio': {
        menuLine: 'Dez tarefas do ofício, com o pedido testado',
        forWhom: 'Atendimento, agenda, ata, ofício, boleto, viagem',
        // Live on Amazon.com.br (ASIN B0HLYHD11B), found on the store on 05/10/2026.
        amazon: 'https://www.amazon.com.br/dp/B0HLYHD11B',
    },
    'ia-no-primeiro-trabalho': {
        menuLine: 'Onze tarefas do começo, da vaga ao holerite',
        forWhom: 'Vaga, currículo, entrevista, holerite',
        // Live on Amazon.com.br (ASIN B0HLYG2DPX), found on the store on 05/10/2026.
        amazon: 'https://www.amazon.com.br/dp/B0HLYG2DPX',
        // From the book's keyword research (books/ia-no-primeiro-trabalho/research/palavras-chave.md §4.1, §4.2).
        seo: {
            book: {
                title: 'IA no primeiro trabalho: currículo, entrevista e vaga falsa',
                description: 'E-book para quem busca o primeiro trabalho, estágio ou jovem aprendiz: use IA no currículo sem inventar, prepare a entrevista e reconheça vaga falsa.',
            },
            kit: {
                title: 'Kit IA no primeiro trabalho: prompts e modelos de currículo',
                description: 'Pedidos prontos para copiar, modelos de currículo e mensagem, o checklist da vaga de verdade e treinos de entrevista, do livro IA no primeiro trabalho.',
            },
        },
    },
    'ia-no-pequeno-negocio': {
        menuLine: 'Onze tarefas do negócio, do WhatsApp ao caixa',
        forWhom: 'WhatsApp, preço, orçamento, cobrança, o MEI',
        // ASIN B0HMN4LVDJ, from the KDP bookshelf on 11/10/2026 ("Em publicação");
        // the founder asked for the official link before the page went live.
        amazon: 'https://www.amazon.com.br/dp/B0HMN4LVDJ',
        // From the book's keyword research (books/ia-no-pequeno-negocio/research/palavras-chave.md §4.1, §4.2).
        seo: {
            book: {
                title: 'IA no pequeno negócio: WhatsApp, preço, cobrança e o MEI',
                description: 'E-book para MEI e pequeno empresário: use IA para atender no WhatsApp, divulgar, precificar, cobrar e organizar o MEI, com pedidos testados e o que conferir.',
            },
            kit: {
                title: 'Kit IA no pequeno negócio: prompts e modelos de mensagem',
                description: 'Pedidos prontos para copiar, modelos de cobrança, orçamento e política de troca, e o que conferir antes de mandar. Grátis para quem tem o livro.',
            },
        },
    },
    'ia-no-atendimento-e-nas-vendas': {
        menuLine: 'Doze tarefas do balcão ao telefone',
        forWhom: 'Abordagem, caixa, telefone, SAC, comissão',
        // ASIN B0HMMPLQNX, from the KDP bookshelf on 11/10/2026 ("Em publicação");
        // the founder asked for the official link before the page went live.
        amazon: 'https://www.amazon.com.br/dp/B0HMMPLQNX',
        // From the book's keyword research (books/ia-no-atendimento-e-nas-vendas/research/palavras-chave.md §4.1, §4.2).
        seo: {
            book: {
                title: 'IA no atendimento e nas vendas: cliente, script e direitos',
                description: 'E-book para vendedor, caixa, recepção e telemarketing: use IA para abordar, responder reclamação e fazer o pós-venda, e conheça seus direitos e os do cliente.',
            },
            kit: {
                title: 'Kit do atendimento e das vendas: prompts e scripts',
                description: 'Pedidos prontos para abordagem, script de telefone, reclamação e pós-venda, com o que conferir antes de mandar. Grátis para quem tem o livro.',
            },
        },
    },
    'ia-na-sala-de-aula': {
        menuLine: 'Doze tarefas do professor, do plano ao parecer',
        forWhom: 'Plano pela BNCC, PEI, correção, parecer, pais',
        // ASIN B0HNHPQ2VH, from the KDP bookshelf on 18/10/2026 ("Em publicação"), as volume 6 did.
        amazon: 'https://www.amazon.com.br/dp/B0HNHPQ2VH',
        // From the book's keyword research (books/ia-na-sala-de-aula/research/palavras-chave.md §4.1, §4.2).
        seo: {
            book: {
                title: 'IA na sala de aula: plano, correção, relatório e inclusão',
                description: 'E-book para professores da educação básica: use IA para planejar pela BNCC, adaptar atividades, corrigir e escrever relatórios, sem expor dados dos alunos.',
            },
            kit: {
                title: 'Kit IA na sala de aula: prompts para professores',
                description: 'Prompts para plano de aula, atividade adaptada, rubrica, parecer e comunicado aos pais, com o que conferir antes de usar. Grátis para quem tem o livro.',
            },
        },
    },
    'ia-na-contabilidade': {
        menuLine: 'Catorze tarefas do mês, do extrato à DCTFWeb',
        forWhom: 'Conciliação, Simples, folha, prazos, sigilo',
        // ASIN B0HNHQ4P1X, from the KDP bookshelf on 18/10/2026 ("Em publicação"), as volume 6 did.
        amazon: 'https://www.amazon.com.br/dp/B0HNHQ4P1X',
        // From the book's keyword research (books/ia-na-contabilidade/research/palavras-chave.md §4.1, §4.2).
        seo: {
            book: {
                title: 'IA na contabilidade: conciliação, Simples, prazos e sigilo',
                description: 'E-book para contadores, técnicos e auxiliares: IA na conciliação, no Simples, na reforma e nos prazos, sem expor o cliente nem abrir mão da assinatura.',
            },
            kit: {
                title: 'Kit IA na contabilidade: prompts para contadores',
                description: 'Prompts para conciliação, fator R, reforma, prazos e e-mail ao cliente, com o que conferir antes de usar. Grátis para quem tem o livro.',
            },
        },
    },
    'ia-na-advocacia': {
        menuLine: 'Treze tarefas do escritório, da petição ao prazo',
        forWhom: 'Petição, jurisprudência, prazo, contrato, sigilo',
        // ASIN B0HP85G5RR, "À venda" on the KDP bookshelf on 25/10/2026.
        amazon: 'https://www.amazon.com.br/dp/B0HP85G5RR',
        // The book page from the book's keyword research (books/ia-na-advocacia/research/palavras-chave.md §4.1);
        // the kit keeps the default (data/seo.js, kitSeo), which describes what this kit holds.
        seo: {
            book: {
                title: 'IA na advocacia: petição, jurisprudência, contrato e sigilo',
                description: 'E-book para advogados: IA na petição, na pesquisa, no contrato e no atendimento, com toda citação conferida e sem expor o cliente. Kit de prompts.',
            },
        },
    },
    'construir-com-ia': {
        menuLine: 'Do protótipo ao sistema no ar, um passo por capítulo',
        forWhom: 'Login, dados, domínio, cobrança, monitor',
        // ASIN B0HP7S37XP, "À venda" on the KDP bookshelf on 25/10/2026.
        amazon: 'https://www.amazon.com.br/dp/B0HP7S37XP',
        // A build kit (TRAIL): prompts by step, no spreadsheets, no training
        // material, no notebook, so the book page says what this one holds.
        kitParts: [
            'O seu sistema preenchido uma vez, e os prompts do livro saem prontos para ele',
            'A trilha dos quinze passos, com o que conferir em cada um',
            'O que conferir em qualquer fornecedor, com a data',
            'O que você digita fica no seu navegador',
        ],
        // The book page from the book's keyword research (books/construir-com-ia/research/palavras-chave.md §4.1);
        // the kit's own, kept from when the kit opened before the book (23/10/2026).
        seo: {
            book: {
                title: 'Construir com IA: publicar, login, dados e cobrança',
                description: 'Livro e kit para quem cria app e sistema com IA sem saber programar: publicar, domínio, login, dados, cobrança e o que conferir antes do primeiro usuário.',
            },
            kit: {
                title: 'Kit online do Construir com IA: os prompts e a trilha dos 15 passos',
                description: 'Os prompts do livro Construir com IA, preenchidos uma vez com o seu sistema, e a trilha dos 15 passos do protótipo ao sistema aberto ao público, com o que conferir em cada um.',
            },
        },
    },
    'feito-para-agentes': {
        menuLine: 'O agente de IA do seu cliente usando o seu produto',
        forWhom: 'Servidor MCP, llms.txt, autorização',
        // ASIN B0HQ3XKG1H, approved on KDP on 02/11/2026; the product page answered the same day.
        amazon: 'https://www.amazon.com.br/dp/B0HQ3XKG1H',
        // A build kit like volume 10's, plus the tests the book ran, so the book page says what this one holds.
        kitParts: [
            'O seu produto preenchido uma vez, e os prompts do livro saem prontos para ele',
            'A trilha dos treze passos, com o que conferir em cada um',
            'Os testes do livro, com as conversas inteiras',
            'O que você digita fica no seu navegador',
        ],
        // The book page from the book's KDP keywords (learning/feito-para-agentes/KDP.md); the kit's own, kept from
        // when the kit opened before the book (01/11/2026).
        seo: {
            book: {
                title: 'Feito para agentes: servidor MCP, llms.txt e autorização',
                description: 'Livro e kit para quem tem um produto e quer que o agente de IA do cliente o use: servidor MCP, llms.txt, OAuth, escopo, erros, webhooks e segurança contra prompt injection.',
            },
            kit: {
                title: 'Kit online do Feito para agentes: os prompts, a trilha e os testes',
                description: 'Os prompts do livro Feito para agentes, preenchidos uma vez com o seu produto, a trilha dos 13 passos até o agente do cliente operar o seu produto, e os testes do livro com as 120 conversas inteiras.',
            },
        },
    },
}

export const amazonSearch = book => `https://www.amazon.com.br/s?k=${encodeURIComponent(`${book.title} ${book.author}`)}&i=digital-text`

// The series, as the site presents it (and as its KDP series page says).
export const SERIES = {
    name: 'O Novo Básico',
    title: 'O que é preciso saber de IA para trabalhar.',
    description:
        'Nos anos 1990, saber usar o computador virou linha obrigatória no currículo. O básico mudou de novo: hoje ele se chama inteligência artificial. A série sobe em quatro níveis, e cada pessoa vai até onde o trabalho dela pede.',
    levels: [
        { level: 1, text: 'Para qualquer pessoa: usar a IA no dia a dia e entender como ela funciona.' },
        { level: 2, text: 'A IA nas tarefas reais de um ofício, como o escritório, o atendimento ou a sala de aula.' },
        { level: 3, text: 'Para quem quer construir com IA: ferramentas, sistemas, um negócio.' },
        { level: 4, text: 'Para quem quer fazer da IA a própria profissão técnica.' },
    ],
    promises: ['As conversas com a IA são de verdade', 'Todo fato tem fonte e data', 'O fim do livro conta como ele foi feito'],
    aiNote: 'Feito com o auxílio de inteligência artificial; revisado e aprovado por humanos.',
}
