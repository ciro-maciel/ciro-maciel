/**
 * /prompts — the five entry pages of the book IA no atendimento e nas vendas
 * (volume 6).
 *
 * The book is launching (10/10/2026), at version 1.0.0, approved by the
 * author. KDP.md, "No mesmo dia": move the five items into PROMPTS.items in
 * prompts.js (with BOOK_SALES next to BOOK_FIRST_WORK), or import this file
 * there and spread PENDING_PROMPTS_SALES into PROMPTS.items. Then add the
 * five addresses to public/sitemap.xml and run `bun test tests/`. KDP.md also
 * asks, before opening the law pages (cash shortage, commission, NR-17), to
 * re-check the sources live after 25/10/2026 (AUDITORIA A-18) and the
 * PEC 221/2019 (A-09).
 *
 * The pages are the five planned in
 * books/ia-no-atendimento-e-nas-vendas/research/palavras-chave.md §4.3, one
 * per search: approaching the customer in the shop, the complaint, the cash
 * register shortage, the commissioned seller, and the telemarketing script
 * with the NR-17 breaks. §4.4 keeps the discount, WhatsApp replies and the
 * payment reminder with volume 5, so none of them is here. Each request is
 * word for word from chapters/o-kit.md, "Os pedidos deste livro" (the print
 * line breaks joined, the brackets kept); the checks come from that chapter's
 * "Confira" in the kit and the chapter itself; the test result only says what
 * the chapter and research/testes/ANALISE-*.md allow (Claude Sonnet 4.6,
 * 06/10/2026 and, for the requests changed in the review, 09/10/2026).
 *
 * The pages on workers' rights (cash shortage, commission, NR-17, and the
 * complaint page, which cites NR-17 for the abusive customer) carry the
 * book's own caveat: the government pages were read in archive copies during
 * the election period and are reopened live after 25/10/2026 (KDP.md, "No
 * mesmo dia"; AUDITORIA A-18). Reconfirm before opening these pages.
 *
 * The site's tests forbid one payment word, so no text here names it.
 *
 * Plain data, no React: the build scripts import it too.
 */

export const BOOK_SALES = {
    title: 'Os pedidos vêm do livro IA no atendimento e nas vendas',
    description: 'O livro traz um pedido testado para cada tarefa de quem atende e vende pela empresa, do balcão ao telefone, com o que conferir na resposta e os seus direitos, com a lei e a data.',
    label: 'Ver o livro',
    to: '/books/ia-no-atendimento-e-nas-vendas',
}

// The book's own words (como-este-livro-foi-feito.md), for the pages on rights.
const ARCHIVE_CAVEAT = 'A pesquisa do livro foi feita em período eleitoral: as páginas do governo que pediram login naquele dia, entre elas as do Ministério do Trabalho, foram lidas em cópias guardadas pelo Internet Archive, e estão marcadas para serem reabertas ao vivo depois de 25 de outubro de 2026, quando termina o período eleitoral.'

export const PENDING_PROMPTS_SALES = [
    {
        slug: 'como-abordar-cliente-na-loja',
        label: 'Abordar o cliente na loja',
        title: 'O que falar quando o cliente chega na loja: o roteiro de abordagem sem promessa',
        description: 'A IA monta o roteiro de abordagem só com os fatos do produto que você deu e marca [confirmar] onde falta, sem urgência inventada. O pedido testado.',
        lead: 'Você pede à IA um roteiro de abordagem e ela completa com o que soa bem no balcão: conforto, procura, parcelamento, "os números somem rápido". Dita por você, cada frase é a palavra da loja. Este pedido limita o roteiro aos fatos que você deu.',
        code: 'Sou [vendedora] numa loja de [calçados]. Faz um roteiro de abordagem pra eu vender [este tênis]. Use só estes três fatos: não acrescente característica, vantagem, prazo, brinde, estoque, desconto ou comparação que eu não dei. Onde faltar, escreva [confirmar: ...].\n\n[os três fatos]',
        checks: [
            'Cada frase que diz como o produto é, o que ele faz, quanto ele vende, como se paga, até quando e o que a loja faz por ele (separar, reservar, entregar, avisar)',
            'Ao lado de cada uma, o fato de onde ela sai',
            'Cada [confirmar] resolvido antes do turno, com a etiqueta, a caixa ou o gerente: o que ficar sem resposta não vai para o cliente',
            'A troca dita como está escrita na política da loja: troca de produto sem defeito na loja física é regra da loja, não da lei',
            'Pressa, só a verdadeira: "os números somem rápido" e "últimas unidades" só se o sistema mostrar',
        ],
        test: 'No teste do livro (Claude Sonnet 4.6, 06/10/2026, um tênis de corrida com três fatos: o preço, a numeração que tem na loja e a troca), o pedido de primeira trouxe 21 afirmações fora dos fatos nas 3 respostas, e a urgência inventada, "os números somem rápido", em 2 de 3. Com este pedido, sobrou 1 nas 3 ("Posso separar pra você?") e a urgência sumiu: 0 de 3. Na versão para a senhora de idade, 0 contra 20. O [confirmar] veio de 3 a 6 vezes por roteiro.',
        source: 'Livro IA no atendimento e nas vendas, capítulo "Abordar sem prometer o que a loja não dá".',
        cta: BOOK_SALES,
    },
    {
        slug: 'responder-reclamacao-de-cliente',
        label: 'Responder a reclamação do cliente',
        title: 'Responder a reclamação do cliente insatisfeito: o prazo certo, sem prometer solução',
        description: 'A IA diz em que regime cada empresa está antes do prazo e responde à reclamação sem prometer reembolso nem pedir a história de novo. O pedido testado.',
        lead: 'O cliente reclama e pergunta em quanto tempo tem resposta. Pedida de primeira, a IA aplicou o Decreto do SAC onde ele não vale e deu "7 dias úteis" onde o decreto diz sete dias corridos.Este pedido pergunta o regime de cada empresa antes do prazo, e o prazo vem de você, escrito nas linhas do fim.',
        code: 'Trabalho numa central de atendimento [terceirizada que faz o SAC de várias empresas]. Chegaram estas [10] reclamações hoje:\n[as reclamações, uma por linha, com a empresa e o setor, sem o nome e os dados do cliente]\n\nPara cada reclamação, antes do prazo, diga se a empresa está no Decreto 11.034/2022 (SAC dos serviços regulados pelo governo federal), no Decreto 7.962/2013 (comércio eletrônico) ou em nenhum dos dois, e em qual linha abaixo ela cai. Depois escreva a resposta ao cliente. Não prometa reembolso, troca nem solução que a empresa não autorizou, e não peça ao cliente que repita o que já contou. Onde não tiver certeza, escreva [conferir].\n- Serviço regulado pelo governo federal (telefonia, internet, banco, energia, aviação): resposta em sete dias corridos do registro (Decreto 11.034/2022, art. 13). O cancelamento tem efeito imediato (art. 14, II).\n- Plano de saúde: o decreto vale, e a ANS tem prazo próprio. O pedido que não é de cobertura se responde em sete dias úteis do registro (RN ANS 623/2024, art. 11). O pedido de cobertura: de imediato na urgência; nos outros casos, até cinco dias úteis, ou até dez na alta complexidade e na internação eletiva (art. 12).\n- Loja on-line e aplicativo que vende pela internet: resposta em até cinco dias (Decreto 7.962/2013, art. 4º, parágrafo único).\n- Loja física, academia, oficina: não há prazo de resposta na lei federal; vale o da empresa.',
        checks: [
            'O regime e o prazo de cada mensagem contra a tabela dos regimes, com a palavra certa, "corridos" ou "úteis"',
            'Algum cancelamento ficou para depois? Onde o decreto vale, ele tem efeito imediato (art. 14, II)',
            'A mensagem pede ao cliente que conte tudo de novo? "É vedado solicitar a repetição da demanda" (art. 10)',
            'Vale também para o texto que o copiloto da empresa sugere na sua tela: quem manda a resposta é você',
            'Só a reclamação vai para a IA, sem nome, CPF ou número de contrato: no teste, ela não precisou de mais nada',
            'Se o cliente xingou: no teleatendimento, a pausa vem "imediatamente após operação em que tenham ocorrido ameaças, abuso verbal ou agressões" (NR-17, Anexo II, item 6.4.5); no caixa, chame a fiscal e anote a hora e o que foi dito',
        ],
        test: 'No teste do livro (Claude Sonnet 4.6, dez reclamações de dez empresas inventadas, numa central que faz o SAC de várias), o pedido de primeira, em 06/10/2026, aplicou o Decreto do SAC à academia e ao aplicativo de entrega, não deu os sete dias corridos em nenhum dos 15 casos regulados e adiou o cancelamento em 4 de 6. A pergunta do regime já tirou a promessa: nenhuma das 30 mensagens prometeu reembolso ou solução, e nenhuma pediu ao cliente que contasse de novo. Com este pedido, que traz a linha de cada regime, na revisão do livro (09/10/2026), o prazo veio certo nas dez empresas, nas três respostas (30 de 30), e os dois cancelamentos tiveram efeito imediato nas três.',
        source: `Livro IA no atendimento e nas vendas, capítulo "SAC e chat: o prazo certo para a empresa certa". ${ARCHIVE_CAVEAT}`,
        cta: BOOK_SALES,
    },
    {
        slug: 'quebra-de-caixa-desconto-do-operador',
        label: 'Quebra de caixa e a diferença no fechamento',
        title: 'Quebra de caixa: quando a diferença pode sair do salário do operador',
        description: 'Diferença de caixa só se desconta com cláusula ou dolo (CLT, art. 462). O pedido testado acha na sua convenção a cláusula da quebra de caixa e copia o texto.',
        lead: 'Faltou dinheiro no fechamento e a fiscal avisou que vai sair do seu salário. A lei diz quando pode; a sua convenção coletiva diz o resto. Este pedido acha na convenção as cláusulas da quebra de caixa, da diferença, do intervalo, do feriado e do domingo, e copia o texto com o número.',
        code: 'Sou operadora de caixa num supermercado. Esta é a convenção coletiva da minha categoria:\n[o texto da convenção, copiado do arquivo do sindicato]\n\nAche nesta convenção as cláusulas sobre quebra de caixa, diferença no caixa, intervalo, feriado e domingo. Para cada assunto, copie o texto exato da cláusula, com o número dela, sem resumir nem completar. Se o assunto não estiver na convenção, escreva "não achei".',
        checks: [
            'Cada cópia contra a convenção: a do teste era curta e de nomes óbvios',
            'O desconto da diferença só é lícito se "acordada" ou com "dolo" do empregado (CLT, art. 462, § 1º): o erro de contagem e o troco errado sem querer só se descontam com essa cláusula',
            'A quebra de caixa vem da convenção, não da lei: procure no holerite a linha "quebra de caixa" ou "gratificação de caixa"; os 10% do PN 103 do TST, para quem é caixa permanente, só valem se a sua convenção o trouxer',
            'Conte o seu caixa e anote o valor antes de entregar, e peça por escrito o relatório do fechamento, com o valor e quem contou',
            'A convenção vai para a IA; o relatório do fechamento e o holerite, não',
            'Preço da gôndola diferente do caixa: o cliente paga o menor (Lei 10.962/2004, art. 5º)',
            'No supermercado, o Anexo I da NR-17 garante banheiro "a qualquer momento da jornada", avisando (5.2), e nenhuma "tarefa de segurança patrimonial" (5.4)',
        ],
        test: 'Na revisão do livro (Claude Sonnet 4.6, 09/10/2026, uma convenção inventada de nove cláusulas), a IA achou as cláusulas com o número nas 3 respostas, copiou o texto letra por letra em 12 de 12 e disse "não achei" para o domingo, que não estava lá. Perguntadas se a loja podia descontar os R$ 40,00 contados sem a operadora, as seis responderam pela cláusula: não. Sem a convenção, nos oito casos do caixa (06/10/2026), a IA citou o art. 462 da CLT nas seis respostas, mas três somaram a culpa, que o texto não pede, e uma, com a quebra de caixa no holerite, disse que o desconto seria "geralmente permitido".',
        source: `Livro IA no atendimento e nas vendas, capítulo "O caixa sem pagar a diferença do próprio bolso". ${ARCHIVE_CAVEAT}`,
        cta: BOOK_SALES,
    },
    {
        slug: 'vendedor-comissionado-estorno-e-dsr',
        label: 'Conferir a comissão e o DSR',
        title: 'Vendedor comissionado: estorno de comissão, DSR e a conta do mês conferida',
        description: 'Devolução, cancelamento e calote não autorizam estorno de comissão; só a insolvência. O pedido testado refaz a comissão e o DSR e fecha a conta com o extrato.',
        lead: 'O extrato veio com a devolução e o calote descontados da sua comissão, e sem o DSR. Perguntada de primeira, a IA não sabia a regra do estorno. Este pedido leva a regra escrita, com a fonte, mostra cada conta e fecha a diferença com o extrato.',
        code: '[o fixo; o percentual, uma linha por categoria se houver mais de um: [categoria]: R$ [vendas] × [taxa]%; as vendas do mês; as devoluções e os estornos que o extrato descontou; o que o extrato pagou de comissão e de DSR; quantos dias úteis (segunda a sábado), domingos e feriados teve o mês]\n\nCalcula a minha comissão e o DSR. Mostre cada conta. Use estas regras: devolução, cancelamento ou falta de pagamento do cliente não autorizam estorno de comissão; só a insolvência (Lei 3.207/1957, art. 7º; tese do TST de 24/02/2025). O DSR sobre a comissão é devido (Súmula 27 do TST); a conta por dias úteis é prática, não lei. No fim, confira: a diferença para o extrato tem de ser a soma do que a loja descontou e do que não pagou.',
        checks: [
            'A conta refeita à mão: a comissão, o DSR e a diferença para o extrato',
            'O estorno só vale na "insolvência do comprador" (Lei 3.207/1957, art. 7º); a tese do TST de 24/02/2025 vale "ainda que haja previsão contratual em sentido contrário"',
            'O DSR sobre a comissão é devido (Súmula 27 do TST); a conta por dias úteis é prática, não lei, e a convenção pode trazer a dela',
            'Na hora extra de quem tem o horário controlado, sobre a comissão vem só o adicional, de no mínimo 50% (Súmula 340); sobre o fixo, a hora inteira com o adicional (OJ 397)',
            'O salário mínimo do ano: a IA errou o de 2026 em 3 das 6 respostas; use o valor do kit do livro, com a data',
            'Cada regra que você citar, leia no texto (a lei, a tese, a convenção), e não só na resposta da IA',
            'Meta: "estimular o cumprimento de metas não é assédio moral", diz a cartilha do TST; a forma pode ser, como as "punições vexatórias (dancinhas, prendas)"',
        ],
        test: 'No teste do livro (Claude Sonnet 4.6, 06/10/2026, o mês de uma vendedora com 2% sobre R$ 48.500,00, duas devoluções e o estorno de uma venda de julho não paga), nenhuma das 6 respostas ao pedido sem a regra citou a decisão do TST, 4 tiraram da comissão a TV que o cliente devolveu e só 2 chegaram ao total que a lei dá. Com este pedido, as 3 respostas chegaram à diferença de R$ 334,00, uma com o total de R$ 2.785,00 só na segunda mensagem, e chamaram a conta do DSR de prática. Quando o pedido mandou dizer "a lei e o artigo", vieram 9 citações erradas, contra 0 sem essa frase.',
        source: `Livro IA no atendimento e nas vendas, capítulo "Meta, comissão e pressão: conferir a conta e os seus direitos". ${ARCHIVE_CAVEAT}`,
        cta: BOOK_SALES,
    },
    {
        slug: 'script-de-atendimento-telemarketing',
        label: 'Script de telemarketing e as pausas',
        title: 'Script de telemarketing com IA: o roteiro que aceita o não, e as pausas da NR-17',
        description: 'O pedido testado monta o roteiro de ligação com o preço depois do 12º mês e a saída no segundo "não". E as pausas do teleatendimento, pelo Anexo II da NR-17.',
        lead: 'Pedido de primeira, o roteiro de telemarketing veio com um "tempo limitado" que a empresa não deu e sem saída para o segundo "não". Este pedido põe na fala o preço depois do 12º mês e a fidelidade com a multa, e encerra a ligação no segundo "não".',
        code: 'Trabalho no telemarketing ativo de [uma operadora de internet, a empresa]. O plano que eu ofereço: [a oferta: a velocidade, o preço nos primeiros meses e depois, a fidelidade e a multa, a instalação]. Escreva um roteiro de ligação para oferecer este plano. Na abertura, eu digo quem sou e de que empresa ligo. Diga ao cliente o preço a partir do [13º mês] e a fidelidade com a multa. Use só os dados acima: nada de desconto, brinde, prazo ou comparação que eu não dei. Se o cliente disser "não tenho interesse", eu posso perguntar uma vez se posso explicar; no segundo "não", agradeço e encerro. Use esta regra do telefone: [a linha da tabela do telefone; por exemplo: o 0303 é facultativo desde 15/08/2025 (Acórdão Anatel 201, de 14/08/2025)].',
        checks: [
            'O roteiro com a oferta ao lado, número por número',
            'Urgência, desconto, comparação ou prazo que a empresa não deu',
            'A saída no segundo "não"',
            'Depois, numa mensagem separada, "Isso vale para que ano?": ela traz a dúvida, não a resposta; a regra vem escrita no pedido, com a data',
            'A lista de ligações do dia, com nome, telefone e CPF, não vai para a IA aberta: o roteiro sai com [NOME] e funciona igual',
            'As suas pausas, pelo Anexo II da NR-17: duas de 10 minutos, fora do posto, depois dos primeiros e antes dos últimos 60 minutos (item 6.4.1); outra logo após o xingamento (6.4.5); o banheiro "a qualquer momento da jornada" (6.7); e o registro delas, que você tem direito de ver (6.4.4.2)',
            'As 6 horas do teleatendimento vêm da NR-17, Anexo II (item 6.3), e não do art. 227 da CLT, que é da telefonista',
        ],
        test: 'No teste do livro (Claude Sonnet 4.6, um plano de internet inventado, R$ 99,90 nos 12 primeiros meses e R$ 129,90 a partir do 13º), o pedido de primeira, em 06/10/2026, não deu o preço a partir do 13º mês em nenhum dos 3 roteiros, somou 13 contornos depois da segunda recusa e inventou o "tempo limitado" em 3 de 3. Com este pedido, na revisão do livro (09/10/2026), os 3 roteiros disseram o preço a partir do 13º mês e a fidelidade com a multa, e encerraram no segundo "não", sem contorno e sem promessa. Perguntada se o telemarketing tem de ligar do 0303, a IA disse "facultativo" nas 3 com a linha da regra e "obrigatório" nas 3 sem ela, com a norma inventada em 2.',
        source: `Livro IA no atendimento e nas vendas, capítulo "Telemarketing: o roteiro, o 'não' do cliente e a sua pausa". ${ARCHIVE_CAVEAT}`,
        cta: BOOK_SALES,
    },
]
