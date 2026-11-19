/**
 * The free guides of the books (the "iscas"), each at /books/<book>/guides/<guide>.
 *
 * WHY (19/11/2026, the books' sales plan, manager/gtm/docs/2026-11-19-ESTRATEGIA-DE-VENDAS-DOS-LIVROS.md):
 * the Amazon never says who bought a book, so the series had no list of its own readers. A guide is ten
 * pages of one idea of a book, whole and ready to use the same day (learning/DESIGN.md §14), given in
 * exchange for an e-mail. The person leaves with the thing done and knows what the book has beyond it.
 *
 * HOW THE E-MAIL IS CAPTURED, with the products of the lines, as any customer would:
 *   - one Marketing Forms form per guide (`form`, its public code), embedded with <forms-embed>; the form
 *     sends the PDF link by e-mail through Messages and then sends the visitor back to this page with
 *     ?recebido=1, where the download is offered at once;
 *   - every answer also goes, by the form's webhook, to Customers People, the list of the books' readers;
 *   (the privacy policy says the same: data/legal.js, "Guias gratuitos dos livros")
 *   - the short link that brought the visitor arrives in utm_content (Links sets it), so each door counts.
 * The fields, the consent text and the e-mail live in the Forms panel; this file says only where they go.
 *
 * THE PDF is public/guides/<guide>.pdf, built from learning/iscas/<book>/<guide>/isca.typ, and the cover
 * public/guides/<guide>.jpg is its first page. Each guide says it may be shared as it is, for free.
 *
 * Only what the PDF has: `pages` lists pages 2 to 9 as they are. Changing a guide means rebuilding the PDF,
 * copying it here and reading this list again.
 */

export const GUIDES = [
    {
        book: 'ia-na-sala-de-aula',
        slug: 'o-detector-nao-prova',
        form: 'f_P3UH',
        title: 'O detector de IA não prova nada',
        promise: 'O que fazer quando o texto do aluno parece bom demais: a tarefa que mostra o processo, a conversa reservada e a regra do regimento.',
        tension: 'A redação chegou boa demais, e um site diz que "provavelmente foi IA". Dar zero com base nisso é arriscado; deixar passar também incomoda. Este guia mostra o que o detector mede de verdade e o que um professor pode fazer no lugar dele.',
        forWhom: 'Para professores da educação básica e para quem coordena.',
        pages: [
            'A cena: a crônica do 8º ano, o relatório do detector e o caderno com o rascunho do aluno',
            'Por que nada disso prova quem escreveu: a IA, o detector e a conversa',
            'O teste do livro: a IA viu marcas de IA numa redação do Enem escrita à mão, ao lado do comentário oficial do Inep',
            'O que três estudos mediram sobre os detectores, e por que "o detector pegou" não prova nada',
            'Três jeitos de passar a tarefa que mostram o processo, e a conversa que fica reservada',
            'O pedido do livro para preparar a conversa com o aluno, e o que a IA devolveu',
            'A sanção é do regimento, e o aluno pode contestar',
            'O registro da tarefa para imprimir e a lista do que conferir antes de dar nota',
        ],
        seo: {
            title: 'Detector de IA não prova nada: guia grátis para professores',
            description: 'Guia gratuito em PDF para professores: por que o detector de IA não prova autoria, a tarefa que mostra o processo e a conversa com o aluno.',
        },
    },
    {
        book: 'ia-na-contabilidade',
        slug: 'carta-da-receita-ou-golpe',
        form: 'f_6UA6',
        title: 'Carta da Receita ou golpe?',
        promise: 'Como usar a IA para ler o que o cliente mandou sem pedir a ela o veredito, e em que serviço oficial cada coisa se confere.',
        tension: 'O cliente manda a foto de uma guia, de um e-mail ou de uma carta "da Receita" e pergunta se paga. Perguntar à IA se é verdadeiro parece o caminho rápido, e é aí que mora o erro. Este guia mostra o que pedir a ela e onde a resposta se confere.',
        forWhom: 'Para contadores, técnicos e auxiliares contábeis, no escritório ou no setor contábil de uma empresa.',
        pages: [
            'A cena: a guia do Simples falsa e a carta da malha que a IA chamou de "LEGÍTIMA"',
            'Por que o veredito da IA é o problema, mesmo quando ela acerta',
            'O teste do livro com seis mensagens: o que a IA acertou e o que ela disse sem poder saber',
            'Cada tipo de mensagem, o sinal oficial e o serviço onde se confere',
            'O pedido do livro, palavra por palavra, e como tirar o link antes de colar',
            'O que voltou: o serviço onde se confere nas 18 mensagens, e nenhum veredito',
            'O que ainda escapou, e três passos antes de colar',
            'A resposta padrão para o cliente e a lista para quando chega a foto',
        ],
        seo: {
            title: 'Carta da Receita ou golpe? Guia grátis para contadores',
            description: 'Guia gratuito em PDF para contadores: como usar a IA para ler a carta, a guia ou o e-mail que o cliente mandou, sem pedir veredito, e onde conferir cada um.',
        },
    },
    {
        book: 'ia-na-advocacia',
        slug: 'jurisprudencia-com-ia',
        form: 'f_DVXM',
        title: 'Jurisprudência sem julgado falso',
        promise: 'Quem paga quando a IA inventa o julgado, o que ela fez no teste do livro e a conferência em cinco passos antes de protocolar.',
        tension: 'A peça vence amanhã e a pesquisa de jurisprudência ainda não está feita. Se a IA citar um julgado que não existe, ou um que não diz o que ela disse, quem responde é quem assina. Este guia mostra o que os tribunais já decidiram sobre isso e a conferência antes de protocolar.',
        forWhom: 'Para advogados, do primeiro ano de OAB ao sócio, e para quem prepara a pesquisa.',
        pages: [
            'A cena: as contrarrazões que vencem amanhã, e a IA com e sem os acórdãos colados',
            'Se a IA inventar o julgado, quem paga a multa',
            'Quatro decisões de tribunais brasileiros sobre julgado inventado, e o Estatuto da Advocacia',
            'O que a IA fez no teste do livro, em quatro números, e a premissa falsa sobre a Súmula Vinculante 6',
            'A conferência do julgado em cinco passos, e onde se confere em cada tribunal',
            'O pedido do livro, palavra por palavra, e a resposta real',
            'Não achar não prova que não existe; achar não prova que diz o que a IA disse',
            'A folha da conferência do julgado, para imprimir',
        ],
        seo: {
            title: 'Jurisprudência com IA sem julgado falso: guia para advogados',
            description: 'Guia gratuito em PDF para advogados: quem paga quando a IA inventa jurisprudência, o que os tribunais decidiram e a conferência do julgado em cinco passos.',
        },
    },
    {
        book: 'ia-no-dia-a-dia',
        slug: 'conferir-antes-de-confiar',
        form: 'f_JW9N',
        title: 'As quatro conferências antes de confiar na IA',
        promise: 'A IA erra com o mesmo tom seguro de quando acerta. Quatro conferências simples, e uma régua para saber quanto conferir.',
        tension: 'A resposta saiu limpa, bem escrita e quase toda certa. O problema é o "quase": a IA não avisa quando erra. Este guia mostra as quatro conferências que pegam o erro antes de você mandar, e quanto conferir em cada caso.',
        forWhom: 'Para quem já usa IA no trabalho ou em casa.',
        pages: [
            'A cena: o resumo da reunião com uma data que ninguém disse',
            'Por que a IA erra sem avisar',
            'As quatro conferências, antes de mandar',
            'A fonte: o que confere no documento oficial e o que não está nele',
            'Pedir para a IA marcar o que ela acrescentou, e o que ela não marcou',
            'Se isto estiver errado, qual é o estrago? A régua de quanto conferir',
            'Pedir bem reduz o erro, mas não zera',
            'Faça agora: ponha uma IA à prova com um texto que você conhece',
        ],
        seo: {
            title: 'Como conferir a resposta da IA: guia grátis em PDF',
            description: 'Guia gratuito em PDF: as quatro conferências antes de confiar numa resposta da IA, e a régua para saber quanto conferir. Do livro IA no dia a dia.',
        },
    },
    {
        book: 'ia-no-dia-a-dia',
        slug: 'pedido-de-quatro-partes',
        form: 'f_MZ2V',
        title: 'O pedido de quatro partes',
        promise: 'Por que a IA te devolve resposta genérica, e as quatro perguntas que trazem a resposta para perto do que você precisa.',
        tension: 'Você pede, e a IA devolve um texto que serve para qualquer um. Não é falta de jeito seu: ela não sabe nada sobre você. Este guia mostra as quatro perguntas que todo pedido bom responde.',
        forWhom: 'Para quem usa IA e acha as respostas genéricas.',
        pages: [
            'A mesma IA, dois pedidos: a entrega da cozinha da dona Célia',
            'Por que a resposta sai genérica',
            'O método: as quatro perguntas de todo pedido bom',
            'O pedido montado, e o que a IA devolveu',
            'Conversa, não comando: a primeira resposta é rascunho',
            'Peça no formato em que você vai usar',
            'Quando você não sabe o que dizer, peça para ela perguntar antes',
            'Faça agora: monte o seu primeiro pedido de quatro partes',
        ],
        seo: {
            title: 'Como pedir para a IA: o pedido de quatro partes, guia grátis',
            description: 'Guia gratuito em PDF: por que a IA devolve resposta genérica e as quatro perguntas de todo pedido bom, com o pedido montado. Do livro IA no dia a dia.',
        },
    },
    {
        book: 'ia-no-dia-a-dia',
        slug: 'golpe-com-ia',
        form: 'f_424P',
        title: 'Voz, rosto e número já não provam nada',
        promise: 'O roteiro de seis passos contra o golpe do falso parente, agora que a IA imita quem você conhece.',
        tension: 'A mensagem parece da filha, com a foto dela e o jeito de escrever dela, e pede um Pix urgente. Hoje a IA imita voz e rosto. Este guia mostra o sinal de alerta, o roteiro de defesa e a senha da família.',
        forWhom: 'Para qualquer pessoa, e para mandar no grupo da família.',
        pages: [
            'A cena: terça-feira, 15h, a mãe da Carla recebe uma mensagem',
            'O que a IA mudou: imitar alguém ficou fácil e barato',
            'O sinal de alerta: três perguntas antes de qualquer coisa',
            'O roteiro de defesa em seis passos',
            'Quem confirma que a filha trocou de número é a filha',
            'Faça hoje: a senha da família',
            'Já pagou? O que fazer, e o golpe que não pede dinheiro',
            'Para colar na geladeira ou mandar no grupo da família',
        ],
        seo: {
            title: 'Golpe com IA: voz, rosto e número já não provam nada',
            description: 'Guia gratuito em PDF contra o golpe do falso parente com IA: o sinal de alerta, o roteiro de seis passos e a senha da família. Do livro IA no dia a dia.',
        },
    },
    {
        book: 'forward-deployed-engineer',
        slug: 'fde-de-verdade',
        form: 'f_N3K4',
        title: 'FDE de verdade ou só o título?',
        promise: 'O teste das quatro perguntas para ler qualquer vaga de Forward Deployed Engineer em cinco minutos.',
        tension: 'O título Forward Deployed Engineer está em toda parte, e nem toda vaga com ele é o papel. Este guia mostra de onde o papel veio, com o que ele se parece e o teste para saber se uma vaga é FDE de verdade.',
        forWhom: 'Para engenheiros que olham vagas de Forward Deployed Engineer.',
        pages: [
            'A cena: a vaga da OpenAI com um título nascido na Palantir',
            'A resposta de quem inventou o papel',
            'Parece consultor, sales engineer e engenheiro, e não é nenhum dos três',
            'O teste das quatro perguntas',
            'O teste numa vaga real',
            'Onde o teste engana: o título não garante o papel',
            'Avalie-se: você já faz esse trabalho?',
            'Faça agora: passe três vagas pelo teste',
        ],
        seo: {
            title: 'O que é um Forward Deployed Engineer de verdade: guia grátis',
            description: 'Guia gratuito em PDF: o teste das quatro perguntas para ler qualquer vaga de Forward Deployed Engineer em cinco minutos, aplicado a uma vaga real.',
        },
    },
    {
        book: 'forward-deployed-engineer',
        slug: 'piloto-que-vira-producao',
        form: 'f_M5HW',
        title: 'Seis semanas para construir, quatro meses para confiar',
        promise: 'Por que tantos pilotos de IA não viram produção, e o plano de uma página que faz o seu terminar.',
        tension: 'O piloto funcionou na demonstração e, meses depois, ninguém usa. A tecnologia ficou pronta depressa; as pessoas, não. Este guia mostra por que isso acontece e o plano de uma página que faz o piloto terminar.',
        forWhom: 'Para quem implanta IA dentro de uma empresa cliente.',
        pages: [
            'A cena: Morgan Stanley, 2023',
            'O cronograma que quase todo mundo faz, e os dois jeitos ruins de o piloto terminar',
            'Três consequências: adoção, verificação e degraus',
            'A medida está na vaga: na OpenAI, a adoção vem primeiro',
            'O piloto que termina: seis coisas escritas antes de começar',
            'Faça agora: o plano de piloto em uma página',
            'Onde não funciona, e avalie-se',
            'O rito de uma hora por semana que mantém o piloto vivo',
        ],
        seo: {
            title: 'Piloto de IA que vira produção: guia grátis em PDF',
            description: 'Guia gratuito em PDF: por que tantos pilotos de IA não viram produção e o plano de uma página, escrito antes de começar, que faz o seu terminar.',
        },
    },
]

export const guidePath = guide => `/books/${guide.book}/guides/${guide.slug}`

export const guideBySlugs = (book, slug) => GUIDES.find(guide => guide.book === book && guide.slug === slug)

export const guidesOfBook = book => GUIDES.filter(guide => guide.book === book)
