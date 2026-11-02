/**
 * /prompts — the five entry pages of the book IA no pequeno negócio (volume 5).
 *
 * The book is launching (10/10/2026), at version 1.0.0, approved by the
 * author. To publish these pages, move the five items into PROMPTS.items in
 * prompts.js (with BOOK_SMALL_BUSINESS next to BOOK_FIRST_WORK), or import this
 * file there and spread PENDING_PROMPTS_SMALL_BUSINESS into PROMPTS.items. Then
 * add the five addresses to public/sitemap.xml and run `bun test tests/`.
 *
 * Checked on 10/10/2026 against the 1.0.0 book (chapters/*.md).
 *
 * The pages are the five planned in
 * books/ia-no-pequeno-negocio/research/palavras-chave.md §4.3, one per
 * search: "tá caro" and the discount, answering on WhatsApp, pricing, the
 * money of the house and of the business, and the payment reminder. Each
 * request is word for word from chapters/o-kit.md, "Os pedidos deste livro"
 * (the print line breaks joined, the brackets kept); the checks come from that
 * chapter's "Confira" in the kit and the chapter itself; the test result only
 * says what research/testes/ANALISE-*.md allows (Claude Sonnet 4.6,
 * 04/10/2026). No yearly value (DAS, minimum wage, MEI limit) is printed:
 * those live in the kit, dated. The site's tests forbid one payment word, so
 * the payment-key check says "chave de pagamento".
 *
 * Plain data, no React: the build scripts import it too.
 */

export const BOOK_SMALL_BUSINESS = {
    title: 'Os pedidos vêm do livro IA no pequeno negócio',
    description: 'O livro traz um pedido testado para cada tarefa do pequeno negócio, do WhatsApp ao caixa da semana, com o que conferir na resposta e o que nunca colar numa IA.',
    label: 'Ver o livro',
    to: '/books/ia-no-pequeno-negocio',
}

export const PENDING_PROMPTS_SMALL_BUSINESS = [
    {
        slug: 'cliente-achou-caro-desconto',
        label: 'Cliente achou caro e pediu desconto',
        title: 'Cliente achou caro e pediu desconto: o pedido que dá as opções',
        description: 'A IA mostra quanto cada desconto tira da sua mão de obra e deixa o número com você, em vez de escrever a contraproposta. O pedido testado.',
        lead: 'A cliente achou caro e pediu um valor menor, e a IA já escreve a resposta com um número que ela escolheu. Mande este pedido na mesma conversa do orçamento: ela devolve as opções com a conta, e quem decide é você.',
        code: 'A cliente achou caro e perguntou se eu faço por [R$ 1.200]. O que eu respondo? Não escolha o valor do desconto por mim; me dê as opções com a conta.',
        checks: [
            'O número ficou com você: cada opção diz quanto tira da sua mão de obra, por dia de serviço',
            'A conta de cada opção, na calculadora: o desconto, o que sobra da mão de obra e quanto fica por dia',
            'Toda frase que você não disse sai da mensagem: o que se escreve ao cliente obriga quem mandou',
            'Escolha o número, ou mantenha o preço, e só então peça a mensagem',
        ],
        test: 'No teste do livro (Claude Sonnet 4.6, 04/10/2026, o orçamento de um eletricista de R$ 1.386,90 e a cliente pedindo R$ 1.200), só com "o que eu respondo?" a IA escolheu sozinha o valor da contraproposta e o pôs na mensagem pronta nas 6 respostas, R$ 1.300 em cinco, com 8 frases que o eletricista não tinha dito. Com este pedido, o número ficou com ele nas 3, e sobrou 1 frase que ele não disse: "posso parcelar o sinal em duas vezes".',
        source: 'Livro IA no pequeno negócio, capítulo "Fazer o orçamento que o cliente entende e você cumpre".',
        cta: BOOK_SMALL_BUSINESS,
    },
    {
        slug: 'responder-clientes-no-whatsapp',
        label: 'Responder clientes no WhatsApp',
        title: 'Responder clientes no WhatsApp com IA, sem prometer o que não tem',
        description: 'Cole a ficha da loja e as mensagens: a IA responde só com o que está nela e marca [confirmar] onde falta. Sem chatbot. O pedido testado.',
        lead: 'As clientes perguntam preço, prazo e desconto, e a IA responde rápido, às vezes com o que a loja não tem. Este pedido usa a IA aberta que você já tem, sem contratar chatbot, e a limita à ficha da loja.',
        code: 'Tenho [uma loja de roupas] e vendo pelo WhatsApp. Me ajuda a responder essas clientes? Escreva a resposta para cada mensagem. Use só as informações da loja abaixo: não prometa preço, prazo, desconto, estoque ou condição que não esteja nelas. Onde faltar informação, escreva [confirmar: ...] em vez de inventar.\n\n[a ficha da loja]\n\n[as mensagens, só com o primeiro nome das clientes]',
        checks: [
            'Cada preço e cada conta contra a ficha',
            'Todo prazo, desconto, estoque ou condição que não está nela',
            'Sobrou algum [confirmar] no texto que vai para a cliente? Então a mensagem ainda não sai',
            'Só o primeiro nome das clientes: no teste, a IA não precisou de mais nada',
        ],
        test: 'No teste do livro (Claude Sonnet 4.6, 04/10/2026, a ficha de uma loja de roupas e cinco mensagens de clientes), preço, estoque e contas saíram certos nas 6 respostas, e nenhuma deu desconto quando a cliente insistiu. No pedido natural, 2 de 3 respostas estimaram o prazo dos Correios, que a ficha não dava; uma escreveu que havia "uma boa chance de chegar antes de sábado". Com este pedido, 0 promessa fora da ficha em 3, e o [confirmar] apareceu onde a ficha se calava. Para a cliente, o que vai na mensagem é a palavra da loja.',
        source: 'Livro IA no pequeno negócio, capítulo "Responder no WhatsApp sem prometer o que você não tem".',
        cta: BOOK_SMALL_BUSINESS,
    },
    {
        slug: 'precificar-produto-com-ia',
        label: 'Formar o preço com a conta conferida',
        title: 'Precificar um produto com IA: o pedido que mostra a conta',
        description: 'A IA monta o preço item por item e diz se a margem fica sobre o custo ou sobre o preço de venda. O pedido testado e a conta que você refaz.',
        lead: 'Você pediu o preço com 30% de margem e a IA deu um número, sem dizer 30% de quê. Este pedido mostra a conta item por item, não inventa custo e diz sobre o que a margem foi calculada.',
        code: 'Sou [confeiteira] (MEI) e quero saber quanto cobrar no [meu bolo]. Qual o preço com [30]% de margem? Mostre a conta item por item. Use só os custos que eu dei; se achar que falta algum, liste no fim, sem pôr valor. Diga se a margem fica sobre o custo ou sobre o preço de venda.\n\n[a ficha: cada item com a quantidade e o preço da embalagem, o seu tempo e o valor da hora, o gás, o DAS, quantos vende por mês e a taxa da maquininha]',
        checks: [
            'Na calculadora: o preço, menos a taxa da maquininha, menos o custo, dividido pelo preço, tem de dar a margem que você pediu',
            'As porcentagens de apoio da resposta: no teste, foi nelas que o erro apareceu',
            'Os custos que ela listou sem valor: levante os que existem no seu caso',
            'Frase sobre o que "a maioria" faz, sem pesquisa citada, não entra na sua decisão',
            'O DAS e o valor da hora do ano: no kit do livro, com a data',
        ],
        test: 'No teste do livro (Claude Sonnet 4.6, 04/10/2026, a ficha de custos de um bolo de 1,5 kg e "30% de margem"), o custo saiu certo nas 6 respostas e nenhuma inventou imposto. No pedido natural, as 3 fizeram markup e deram R$ 167,29, sem avisar que a sobra ficava em 22% do preço. Com este pedido, as 3 explicaram margem e markup e chegaram a R$ 187,18, com 30% sobre o preço de venda. Mas vieram 4 erros nas porcentagens de apoio (2 sem ele), nenhum no preço final.',
        source: 'Livro IA no pequeno negócio, capítulo "Formar o preço sem errar a conta".',
        cta: BOOK_SMALL_BUSINESS,
    },
    {
        slug: 'separar-dinheiro-pessoal-da-empresa',
        label: 'Separar o dinheiro da casa e o do negócio',
        title: 'Separar o dinheiro pessoal da empresa: o pedido que lê o extrato',
        description: 'Cole as linhas do extrato e a IA separa negócio, casa e [não sei], soma e confere com o saldo. O pedido testado para o MEI e o que ainda fica com você.',
        lead: 'O MEI usa a mesma conta para tudo e, no fim da semana, ninguém sabe quanto o negócio deu. Este pedido separa o extrato em três caixas, confere com o saldo e pergunta o que não dá para saber, em vez de adivinhar.',
        code: 'Eu [faço marmita na cozinha de casa] (sou MEI) e uso a mesma conta pra tudo. [Quem é da família, pelo papel: o marido, a mãe.] Separe este extrato em [negócio], [casa] e [não sei]. Ponha em [não sei] o que você não tiver certeza, sem adivinhar, e me diga o que perguntar. Liste cada lançamento uma vez, com a data e o valor. Some cada grupo e confira: o saldo anterior mais as entradas menos as saídas tem de dar o saldo final do extrato. Não invente lançamento. [as linhas do extrato: data, descrição e valor, com o saldo anterior e o final, sem número de conta]',
        checks: [
            'Na calculadora: o saldo anterior mais as entradas menos as saídas tem de dar o saldo final do extrato',
            'Qualquer conta feita fora da tabela, numa nota ou num "se for assim, ficaria": no teste, foi ali que ela errou',
            'Cada [não sei] respondido por você, com um critério para o misto que se repete toda semana',
            'Regra de imposto que vier junto, no Portal do Empreendedor, em gov.br/mei',
            'Vão só as linhas da semana, sem número de conta: o extrato inteiro, o print e o PDF não vão',
        ],
        test: 'No teste do livro (Claude Sonnet 4.6, 04/10/2026, uma semana do extrato de quem faz marmita em casa, 23 lançamentos na mesma conta), as 6 respostas somaram certo e fecharam com o saldo, sem perder nem inventar lançamento. No pedido natural, as 3 decidiram sozinhas o que era misto, como o gás, e escreveram regra de imposto que o MEI não tem. Com este pedido, 0 suposição sem aviso e 0 regra inventada. Mas 14 ou 15 dos 23 lançamentos voltaram como [não sei]: o caixa fecha quando você responde.',
        source: 'Livro IA no pequeno negócio, capítulo "O caixa da semana: o dinheiro da casa e o do negócio".',
        cta: BOOK_SMALL_BUSINESS,
    },
    {
        slug: 'mensagem-de-cobranca-whatsapp',
        label: 'Cobrar sem ofender',
        title: 'Mensagem de cobrança pelo WhatsApp: o pedido educado e firme',
        description: 'A IA escreve a cobrança do cliente em atraso sem ameaça, sem expor a pessoa e sem juros que vocês não combinaram. O pedido testado e o que conferir.',
        lead: 'A cliente não pagou e você não quer perder a cliente nem a razão. Este pedido escreve a cobrança dentro do que a lei permite; os cinco itens de baixo se conferem antes de mandar.',
        code: 'Escreva uma mensagem de WhatsApp para cobrar [o primeiro nome da cliente], que me deve [o valor] de [o que vendeu], vencido em [a data]. Educada e firme; sem ameaça, sem expor a pessoa, sem falar com mais ninguém (CDC, art. 42); sem juros nem multa que não combinamos. Ofereça [as formas que você aceita]. Use só os fatos abaixo. [o que vendeu, quando entregou, o valor, o que já foi pago, o vencimento, os lembretes e o que você aceita]',
        checks: [
            'O valor e a data',
            'A chave de pagamento, copiada do aplicativo do seu banco, nunca da resposta da IA',
            'Prazo, desconto ou condição que você não deu',
            'Frase quebrada ou nome trocado',
            'Nada que exponha a pessoa: a mensagem vai só para ela, em conversa particular',
            'Comprovante não é pagamento: dê como pago só depois de ver o dinheiro no extrato',
        ],
        test: 'No teste do livro (Claude Sonnet 4.6, 04/10/2026, R$ 180,00 de um bolo de aniversário, vencidos em 20/09), as 6 mensagens saíram sem ameaça, sem exposição e sem juros ou multa, com o valor e a data certos, com ou sem a regra. Mas 1 delas, com este pedido, trouxe como chave de pagamento o e-mail da conta usada no teste, e 2 das 6 traziam um prazo que a dona não deu. Quando a cliente mandou o print do comprovante, a IA mandou conferir no extrato nas 6.',
        source: 'Livro IA no pequeno negócio, capítulo "Receber e cobrar sem perder o cliente nem a razão".',
        cta: BOOK_SMALL_BUSINESS,
    },
]
