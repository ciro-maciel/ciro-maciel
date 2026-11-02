/**
 * The online kit of "IA no atendimento e nas vendas" (volume 6), as data. The
 * page is pages/BookKit.jsx, at /books/ia-no-atendimento-e-nas-vendas/kit.
 *
 * Written on 10/10/2026 from the 1.0.0 book: chapters/o-kit.md (how to use the
 * kit, the tested prompts with [fields], the starting material of each "Faça
 * agora", the models, the values and rules that change, the phone table, the
 * SAC regimes, the extended warranty and the store credit, the cashier's
 * crib, the queue, the ruler of the reader's rights, the customer's laws, how
 * to read a law, where to read each rule and the AIs), each chapter's
 * "Confira", "Faça agora" and privacy box, chapters/introducao.md and
 * chapters/dez-coisas-que-nunca-se-cola.md. The links are the URLs of the
 * series bibliography (books/research/referencias.yaml) for the keys the book
 * cites.
 *
 * Every prompt is the tested form of o-kit.md, "Os pedidos deste livro", word
 * for word, print line breaks joined, with the material in {fields}. Each
 * field's placeholder is the book's bracket, so a field left empty prints the
 * book's text. The line breaks that are real (the cobrança of chapter 10, the
 * table of chapter 11, the regime lines of chapter 8) follow the test scripts
 * in research/testes/. The brackets the AI must use in its answer
 * ([confirmar], [confirmar: ...], [pendente], [gerente], [conferir],
 * [perguntar ao gerente: ...]) stay as they are, as the book says.
 *
 * The tested follow-ups (the warranty, chapter 1; the older lady, chapter 2;
 * the 10%, chapter 3; "vai pensar", chapter 4; "Isso vale para que ano?",
 * chapter 7) are a second message, not a line added to the first, so they are
 * text templates, each saying where it goes. The second tested prompt of
 * chapter 7, the message to the supervisor, is a template too: one task per
 * chapter. Each `result` is the count o-kit.md gives.
 *
 * Templates: only the book's models and starting materials, with the book's
 * text; the ones the book marks as not tested say so. The chapter 5 exercise
 * is the book's question "de primeira", not a tested prompt.
 *
 * Dates as the book has them: the rules checked on 05/10/2026, the new lines
 * on 09/10/2026 "nas cópias guardadas para este livro", and the OpenAI pages
 * read in Internet Archive copies. The book keeps these caveats in its text
 * and marks the government pages read in archive copies during the electoral
 * period to be reopened live after 25/10/2026; this kit keeps the caveats as
 * the book words them and changes, with the date, when they are reopened.
 *
 * The book is in data/books.json, with its kit; `preview` below is only the
 * development stand-in, as in the other kits.
 */

export const TASKS = [
    { id: "produto", chap: "Capítulo 1", name: "Conhecer o produto",
      tpl: "Trabalho numa loja de {loja} e amanhã vou ficar no setor de {setor}. Não conheço direito {quais}. Compare as duas e me dê os argumentos de venda de cada uma. Use só o que está na ficha. Cada argumento tem de citar, entre parênteses, o item da ficha de onde saiu. O que a ficha não diz, escreva [perguntar ao gerente: ...] em vez de completar. Não diga nada sobre {fora}, a não ser que esteja escrito na ficha.\n\n{ficha}",
      fields: [
        { k: "loja", label: "A loja", ph: "eletrodomésticos" },
        { k: "setor", label: "O setor", ph: "geladeiras" },
        { k: "quais", label: "Os dois produtos", ph: "estas duas" },
        { k: "fora", label: "O que a IA não diz sem estar na ficha", ph: "aparência, limpeza, durabilidade, procura, ruído, economia em reais ou parcelamento", hint: "A lista saiu das geladeiras; no seu produto, ponha nela o tipo de frase que escapou na primeira resposta (não testado)." },
        { k: "ficha", label: "A ficha técnica", ph: "a ficha técnica dos dois produtos, como está no sistema da loja", area: true, hint: "Do site do fabricante, ou da foto da etiqueta e da caixa: é do fabricante e pode ir inteira. O modelo está em Modelos." }
      ],
      checks: ["Cada argumento: ache a linha da ficha de onde ele sai", "Se não achar, a frase não vai para o cliente", "As contas de litros, consumo e preço por unidade, na calculadora", "Na garantia, diga ao cliente as duas: a do fabricante, pelo termo, e a da lei, que \"é complementar\" (CDC, art. 50)"],
      result: "No teste, com este pedido, 0 afirmação fora da ficha nas 3 respostas, contra 13 no pedido de primeira, e de 13 a 16 argumentos por resposta, contra 10. A IA não se recusou a ajudar em nenhuma das 9 conversas. O custo é o tom: o argumento sai seco, e a voz é sua. Na garantia, com este pedido, a IA não falou da garantia da lei.",
      privacy: "A ficha técnica é do fabricante e pode ir para a IA. O nome, o telefone e a casa do cliente não precisam ir, e a comparação sai igual sem eles. A tabela de margem e de comissão da loja também não vai: é dado da empresa. O modelo da ficha e a pergunta da garantia, para a mesma conversa, estão em Modelos." },
    { id: "abordagem", chap: "Capítulo 2", name: "Abordar o cliente",
      tpl: "Sou {quem} numa loja de {loja}. Faz um roteiro de abordagem pra eu vender {produto}. Use só estes três fatos: não acrescente característica, vantagem, prazo, brinde, estoque, desconto ou comparação que eu não dei. Onde faltar, escreva [confirmar: ...].\n\n{fatos}",
      fields: [
        { k: "quem", label: "Quem você é", ph: "vendedora" },
        { k: "loja", label: "A loja", ph: "calçados" },
        { k: "produto", label: "O produto", ph: "este tênis" },
        { k: "fatos", label: "Os três fatos", ph: "os três fatos", area: true, hint: "O produto e o preço da etiqueta; o que tem hoje no estoque; a troca, como está escrita na política da loja. O modelo e um pedido preenchido estão em Modelos." }
      ],
      checks: ["Cada frase que diz como o produto é, o que ele faz, quanto ele vende, como se paga, até quando e o que a loja faz por ele (separar, reservar, entregar, avisar)", "Ao lado de cada uma, o fato de onde ela sai: o papel do gerente, a etiqueta, a caixa, a política", "Sem fato, a frase sai do roteiro ou vira pergunta ao gerente", "Cada [confirmar], resolvido antes do turno, com a etiqueta, a caixa ou o gerente"],
      result: "No teste, com este pedido, 1 afirmação fora dos fatos nas 3 respostas (\"Posso separar pra você?\"), contra 21 no pedido de primeira; na versão para a senhora, 0 contra 20. A urgência inventada, \"os números somem rápido\", sumiu junto: 0 de 3, contra 2 de 3. O [confirmar] veio de 3 a 6 vezes por roteiro.",
      privacy: "O roteiro não precisa de nada do cliente. Se quiser treinar uma abordagem com base num atendimento de ontem, conte a situação sem o nome, o telefone e a compra da pessoa. O modelo dos três fatos e a pergunta da senhora, para a mesma conversa, estão em Modelos." },
    { id: "objecao", chap: "Capítulo 3", name: "Objeção e desconto",
      tpl: "Trabalho numa loja de {loja}. Me ajuda a responder as objeções dos clientes? Escreva o que eu falo em cada uma. Não ofereça nada fora da tabela e da minha alçada; onde passar, escreva [gerente].\n\n{tabela}\n\n{alcada}\n\n{objecoes}",
      fields: [
        { k: "loja", label: "A loja", ph: "móveis" },
        { k: "tabela", label: "A tabela da loja", ph: "a tabela da loja", area: true, hint: "O preço da etiqueta, o desconto do Pix, o cartão, a montagem e o que a loja não tem, como no material de partida, em Faça agora." },
        { k: "alcada", label: "A sua alçada", ph: "a minha alçada, como na ficha abaixo", area: true, hint: "A ficha \"minha alçada\" e as quatro perguntas ao gerente estão em Modelos." },
        { k: "objecoes", label: "As objeções", ph: "as objeções que eu mais escuto, do jeito que o cliente falou", area: true }
      ],
      checks: ["Cada número contra a etiqueta e a sua conta", "O desconto dentro da alçada escrita, sem somar com o Pix se ela não deixa", "Risque toda frase sobre estoque, montagem, prazo ou qualidade que a tabela não diz"],
      result: "No teste, com este pedido, a IA usou os 3% da alçada com a conta certa e escreveu [gerente] onde passava, nas 3 respostas. No \"10% ou vou embora\", as 3 ofereceram chamar o gerente, e 2 deram também as duas opções da alçada; sem a alçada, nenhuma das 3 chamou. Mas 1 das 3 ainda pôs escassez no \"vou pensar\", e as 3 puseram na fala um serviço que a tabela não tinha. Em nenhuma das 6 respostas a IA deu desconto fora da tabela.",
      privacy: "O pedido leva a tabela, a alçada e a objeção como o cliente falou. Não leva o nome, o telefone nem o CPF de quem falou, e a IA não precisou de nada disso no teste. A ficha \"minha alçada\" e a mensagem do \"10% ou vou embora\", para a mesma conversa, estão em Modelos." },
    { id: "crediario", chap: "Capítulo 4", name: "Crediário e garantia estendida",
      tpl: "Trabalho numa loja de {loja} e tenho meta de garantia estendida e de cartão da loja. Me faz um script pra oferecer a garantia estendida e o cartão da loja pra esta cliente. No script, diga o preço à vista, o total a prazo e os juros; diga que a garantia estendida é um seguro opcional e quanto custa. Nada de pressa, medo ou condição que não esteja nos dados. A cliente pode desistir do seguro em sete dias corridos a contar da assinatura da proposta (Circular SUSEP 659/2022, art. 7º). Diga quanto fica a mais do que à vista.\n\n{dados}",
      fields: [
        { k: "loja", label: "A loja", ph: "eletro" },
        { k: "dados", label: "Os dados da venda", ph: "os dados da venda: o produto e o preço à vista; o crediário, com a parcela, o total a prazo e os juros; a anuidade do cartão; a garantia estendida e o preço; a idade da cliente", area: true, hint: "Os juros e a anuidade, tirados do sistema ou do contrato. Sem o nome, o CPF, o número do cartão e a renda da cliente." }
      ],
      checks: ["O total a prazo e quanto ele passa do à vista", "Os juros e a anuidade, tirados do sistema ou do contrato", "A palavra \"opcional\" e os sete dias corridos para desistir do seguro", "O que o seguro cobre e como o cartão se cancela, só como está nas condições gerais e no contrato", "Nenhuma frase de pressa, medo ou \"todo mundo leva\"", "Seguro pago junto com o produto, no mesmo cartão ou carnê: o prazo conta da assinatura ou do primeiro pagamento, o que vier por último (art. 11), e a data quem confere é você"],
      result: "No teste, com este pedido, as 3 respostas disseram os R$ 504,30 a mais do que à vista e os sete dias corridos, com a fonte que o pedido deu. Nenhuma trocou a fonte, nenhuma garantiu cancelamento depois dos sete dias, e pressão e cobertura inventada ficaram em 0. Uma acrescentou que o valor \"é devolvido integralmente\": o que foi pago no prazo volta em até quinze dias pela seguradora, ou na hora pela loja (Circular 659, art. 7º, § 6º). Se o seguro for pago junto com o produto, no mesmo cartão ou carnê, a frase dos sete dias fica pela metade. No \"vai pensar\", nenhuma das 3 pressionou, mas o papel que elas mandaram entregar deixou de fora o a mais nas 3.",
      privacy: "Para a IA, vão os números da venda e a idade da cliente, que muda o que a lei pede. O nome, o CPF, o número do cartão e a renda dela não vão. No teste, a IA não precisou de nada disso. O papel do à vista e do a prazo e a mensagem do \"vai pensar\" estão em Modelos; as regras, em \"A garantia estendida e o crediário\", mais abaixo." },
    { id: "caixa", chap: "Capítulo 5", name: "O caixa e a convenção",
      tpl: "Sou operadora de caixa num supermercado. Esta é a convenção coletiva da minha categoria:\n{convencao}\n\nAche nesta convenção as cláusulas sobre quebra de caixa, diferença no caixa, intervalo, feriado e domingo. Para cada assunto, copie o texto exato da cláusula, com o número dela, sem resumir nem completar. Se o assunto não estiver na convenção, escreva \"não achei\".",
      fields: [
        { k: "convencao", label: "A convenção", ph: "o texto da convenção, copiado do arquivo do sindicato", area: true, hint: "A convenção é pública e não tem dado de ninguém. Peça a da sua categoria ao sindicato da sua base e veja primeiro a vigência: a do ano passado pode estar vencida." }
      ],
      checks: ["Cada cópia contra a convenção: a do teste era curta e de nomes óbvios", "O número de cada cláusula", "Se a cláusula disser outra coisa que a régua dos seus direitos, a dúvida vai ao sindicato", "Numa resposta sobre o caixa: ela manda recusar a nota e orientar o cliente a ir ao banco?", "Diz que a R$ 200 não tem faixa holográfica?", "Conhece o limite de 100 moedas?", "Põe o desconto do salário na dependência da cláusula ou do dolo?", "Se a resposta for não a qualquer uma, a regra é a da cola do caixa"],
      result: "No teste, na revisão do livro (9 de outubro de 2026), com uma convenção inventada de nove cláusulas, a IA achou as cláusulas com o número nas 3 respostas, copiou o texto letra por letra em 12 de 12 e disse \"não achei\" para o domingo, que não estava lá. Com a pergunta de primeira, resumiu, e certo.",
      privacy: "Os oito casos do teste do caixa foram para a IA sem nome de cliente, sem CPF, sem número de cartão e sem a chave Pix da loja. Não precisa de nada disso para perguntar o que fazer. A convenção coletiva é pública; o relatório do fechamento e o holerite ficam fora da IA. A cola do caixa e a mensagem à fiscal estão em Modelos." },
    { id: "recepcao", chap: "Capítulo 6", name: "Confirmar na recepção",
      tpl: "Sou recepcionista na {clinica} ({endereco}). Esta é a agenda de {dia}:\n\n{agenda}\n\nEscreva uma mensagem de confirmação de WhatsApp para cada paciente. A mensagem leva só o primeiro nome, o dia, a hora e o endereço da clínica; nada do procedimento nem da observação (dado de saúde é dado sensível, LGPD, art. 5º, II). Confira cada nome e cada horário com a agenda.",
      fields: [
        { k: "clinica", label: "A clínica", ph: "clínica" },
        { k: "endereco", label: "O endereço da clínica", ph: "o endereço" },
        { k: "dia", label: "O dia da agenda", ph: "o dia e a data" },
        { k: "agenda", label: "A agenda", ph: "a agenda: o primeiro nome e a hora de cada paciente", area: true, hint: "Só essas duas colunas; o sobrenome, o telefone, o procedimento e a observação ficam no sistema da clínica. O modelo está em Modelos." }
      ],
      checks: ["O primeiro nome, o dia e a hora de cada mensagem, ao lado da agenda", "O número para onde vai, do paciente ou do responsável", "Sobrou algum exame, especialidade, observação ou valor?", "O preparo, o acompanhante e os documentos vão num recado à parte, sem nomear o exame", "Na fila, a ordem se confere no texto da lei e na regra escrita da clínica, não na resposta da IA"],
      result: "No teste, a agenda foi inteira, com o procedimento e a observação, para medir o que a IA faz com ela. Com este pedido, 0 das 45 mensagens levou dado de saúde, contra 43 de 45 no pedido de primeira; nenhum horário nem nome errado nas 90. Colar só o primeiro nome e a hora, como manda o capítulo, não foi testado; é colar menos, e a mensagem não precisa do resto. Em 2 das 3 respostas, a IA listou quem precisava do recado à parte.",
      privacy: "No seu turno, a confirmação só precisa do primeiro nome, do dia e da hora: cole só essas colunas. O primeiro nome vai porque a confirmação precisa dele; o sobrenome, o telefone, o procedimento e a observação ficam no sistema da clínica. Se a clínica deu uma IA com contrato, vale a regra dela; na sua conta pessoal, dado de paciente não entra. O modelo da agenda está em Modelos; a ordem da fila, mais abaixo." },
    { id: "telemarketing", chap: "Capítulo 7", name: "O roteiro do telemarketing",
      tpl: "Trabalho no telemarketing ativo de {empresa}. O plano que eu ofereço: {oferta}. Escreva um roteiro de ligação para oferecer este plano. Na abertura, eu digo quem sou e de que empresa ligo. Diga ao cliente o preço a partir do {mes} e a fidelidade com a multa. Use só os dados acima: nada de desconto, brinde, prazo ou comparação que eu não dei. Se o cliente disser \"não tenho interesse\", eu posso perguntar uma vez se posso explicar; no segundo \"não\", agradeço e encerro. Use esta regra do telefone: {regra}.",
      fields: [
        { k: "empresa", label: "A empresa", ph: "uma operadora de internet, a empresa" },
        { k: "oferta", label: "A oferta", ph: "a oferta: a velocidade, o preço nos primeiros meses e depois, a fidelidade e a multa, a instalação", area: true, hint: "Os números da oferta que você liga hoje. O modelo está em Modelos." },
        { k: "mes", label: "O mês em que o preço muda", ph: "13º mês" },
        { k: "regra", label: "A regra do telefone", ph: "a linha da tabela do telefone; por exemplo: o 0303 é facultativo desde 15/08/2025 (Acórdão Anatel 201, de 14/08/2025)", area: true, hint: "Da tabela do telefone, mais abaixo, com a data." }
      ],
      checks: ["O roteiro com a oferta ao lado, número por número", "O preço depois do 12º mês e a fidelidade com a multa estão na fala?", "Urgência, desconto, comparação ou prazo que a empresa não deu", "A saída no segundo \"não\"", "A regra do 0303 e do Não Me Perturbe, na página da Anatel e em naomeperturbe.com.br", "O que faltar no script da empresa vai por escrito ao supervisor", "Na mensagem ao supervisor: só fatos, com data, hora e o que foi dito, e a norma com o item que você leu"],
      result: "No teste, na revisão do livro (9 de outubro de 2026), com este pedido, os 3 roteiros disseram o preço a partir do 13º mês e a fidelidade com a multa, e encerraram no segundo \"não\", sem contorno e sem promessa. No teste de 6 de outubro, com o pedido de primeira, vieram 13 contornos depois da segunda recusa e o \"tempo limitado\" inventado em 3 de 3. Perguntada se o telemarketing tem de ligar do 0303, a IA disse \"facultativo\" nas 3 com a linha da regra e \"obrigatório\" nas 3 sem ela, com a norma inventada em 2.",
      privacy: "O roteiro sai com [NOME] e [SEU NOME], e funciona igual. A lista de ligações do dia, com nome, telefone e CPF, não vai para a IA aberta, nem o nome do colega na mensagem sobre a pausa. A pergunta \"Isso vale para que ano?\", o modelo da oferta e a mensagem ao supervisor estão em Modelos; a tabela do telefone, mais abaixo." },
    { id: "sac", chap: "Capítulo 8", name: "SAC e chat",
      tpl: "Trabalho numa central de atendimento {central}. Chegaram estas {quantas} reclamações hoje:\n{reclamacoes}\n\nPara cada reclamação, antes do prazo, diga se a empresa está no Decreto 11.034/2022 (SAC dos serviços regulados pelo governo federal), no Decreto 7.962/2013 (comércio eletrônico) ou em nenhum dos dois, e em qual linha abaixo ela cai. Depois escreva a resposta ao cliente. Não prometa reembolso, troca nem solução que a empresa não autorizou, e não peça ao cliente que repita o que já contou. Onde não tiver certeza, escreva [conferir].\n- Serviço regulado pelo governo federal (telefonia, internet, banco, energia, aviação): resposta em sete dias corridos do registro (Decreto 11.034/2022, art. 13). O cancelamento tem efeito imediato (art. 14, II).\n- Plano de saúde: o decreto vale, e a ANS tem prazo próprio. O pedido que não é de cobertura se responde em sete dias úteis do registro (RN ANS 623/2024, art. 11). O pedido de cobertura: de imediato na urgência; nos outros casos, até cinco dias úteis, ou até dez na alta complexidade e na internação eletiva (art. 12).\n- Loja on-line e aplicativo que vende pela internet: resposta em até cinco dias (Decreto 7.962/2013, art. 4º, parágrafo único).\n- Loja física, academia, oficina: não há prazo de resposta na lei federal; vale o da empresa.",
      fields: [
        { k: "central", label: "A central", ph: "terceirizada que faz o SAC de várias empresas" },
        { k: "quantas", label: "Quantas reclamações", ph: "10" },
        { k: "reclamacoes", label: "As reclamações", ph: "as reclamações, uma por linha, com a empresa e o setor, sem o nome e os dados do cliente", area: true, hint: "Se você não pode usar o celular na posição de atendimento, use as três de exemplo, em Faça agora." }
      ],
      checks: ["A empresa está em qual regime da tabela?", "O prazo da mensagem é o da tabela, com a palavra certa, \"corridos\" ou \"úteis\"?", "Algum cancelamento ficou para depois?", "A mensagem pede ao cliente que conte tudo de novo?", "As linhas do fim são a regra de cada regime, tirada da tabela dos regimes: mantenha as que valem para a sua carteira", "Vale também para o texto que o copiloto da empresa sugere na sua tela: quem manda a resposta é você"],
      result: "No teste, na revisão do livro (9 de outubro de 2026), com as dez reclamações do teste, o prazo da linha veio certo nas dez empresas, nas três respostas (30 de 30). A loja on-line e o aplicativo vieram com os cinco dias, e o plano de saúde com os sete dias úteis. Os dois cancelamentos tiveram efeito imediato nas três. Antes, com uma linha só, a do art. 13 (teste de confirmação), os sete dias corridos vieram nos 15 casos regulados. Mas a loja on-line ficou sem os cinco dias nas 3, e 5 dos 6 cancelamentos ficaram para dentro dos sete dias. Sem nenhuma linha, os sete dias vieram em 5 de 15, todos com o art. 11, e o art. 13 em nenhum.",
      privacy: "O teste usou só a reclamação, sem nome, CPF ou número de contrato. A IA não precisou de mais nada para enquadrar a empresa e escrever a resposta. No chat, a conversa inteira se copia com dois toques; ela não vai para a IA aberta. O protocolo, o nome e os dados do cliente ficam no sistema da central. A tabela dos regimes com a coluna das empresas da sua central está em Modelos." },
    { id: "registro", chap: "Capítulo 9", name: "Registrar o atendimento",
      tpl: "Sou atendente de central numa {empresa}. Faz o resumo de cada um desses atendimentos pra eu colar no sistema. Use só o que o cliente e eu dissemos. Liste os pedidos do cliente um a um, com o que foi feito em cada um; o que ficou sem resposta, escreva [pendente]; o que for dúvida, escreva [confirmar]. Sem CPF, cartão nem endereço (já tirei da transcrição).\n\n{transcricoes}",
      fields: [
        { k: "empresa", label: "A empresa", ph: "operadora de internet" },
        { k: "transcricoes", label: "As transcrições", ph: "as transcrições, com o cliente como [nome] e sem CPF, cartão, endereço e telefone", area: true, hint: "Tire os dados antes de colar. O áudio não vai." }
      ],
      checks: ["Cada pedido do cliente está lá, com o sentido que ele deu?", "Há algum fato que ninguém disse, como \"desistiu\", \"aceitou\", \"concordou\"?", "Os [pendente] e [confirmar]: cada [pendente] é trabalho para hoje, pelo procedimento da sua empresa", "As datas, os valores e o protocolo, contra a tela", "Leia o resumo com a ligação ao lado", "Vale também para o resumo que o sistema gera e para o texto que o copiloto da empresa sugere: quem registra é você"],
      result: "No teste, com este pedido, as 3 respostas marcaram o cancelamento como [pendente] e disseram que ele não foi processado, e nenhuma acrescentou fato. Sem ele, as 3 escreveram que a cliente desistiu do cancelamento, o que ela não disse. Só 1 das 6 registrou que aquela era a terceira ligação pelo mesmo motivo.",
      privacy: "Na transcrição que vai para a IA, o cliente vira [nome], e o CPF, o cartão, o endereço e o telefone saem. O resumo não precisa deles: o sistema já tem. Se a empresa deu uma IA com contrato, vale a regra dela. O modelo do registro está em Modelos." },
    { id: "cobranca", chap: "Capítulo 10", name: "Cobrar por telefone",
      tpl: "Hoje é {hoje}. Trabalho na cobrança do crediário de {loja}.\nCliente: {nome}.\nCompra: {compra}.\nEm atraso: {atraso}. A mais antiga está com {dias} dias de atraso. No contrato: {contrato}.\nO que a loja me autoriza: {autoriza}. Nada além disso.\n{spc}\n\nFaz um roteiro firme pra eu cobrar esse cliente por telefone. Firme é claro, não é ameaça: sem prazo falso, sem falar com outra pessoa além do cliente, e só as condições que a loja autorizou; o que eu não tenho, não ofereça. Diga quem liga e de onde.",
      fields: [
        { k: "hoje", label: "Hoje", ph: "o dia da semana e a data", hint: "Sem a data de hoje, a data dos 90 dias não se confere." },
        { k: "loja", label: "A loja", ph: "uma loja de móveis e eletro" },
        { k: "nome", label: "O cliente", ph: "primeiro nome" },
        { k: "compra", label: "A compra", ph: "o que comprou e o carnê" },
        { k: "atraso", label: "Em atraso", ph: "as parcelas, com as datas, e o total" },
        { k: "dias", label: "Dias de atraso da mais antiga", ph: "60" },
        { k: "contrato", label: "No contrato", ph: "a multa e os juros" },
        { k: "autoriza", label: "O que a loja autoriza", ph: "cada condição" },
        { k: "spc", label: "A regra do SPC", ph: "A regra da loja para o SPC: depois de quantos dias de atraso, e com que aviso.", hint: "Sem a regra do SPC, a IA pode inventar uma." }
      ],
      checks: ["Prazo que a loja não deu (\"só hoje\", \"até amanhã\", \"última chance\")", "Condição fora da autorização: desconto, parcela a mais, pagamento parcial", "O SPC antes dos dias e do aviso da regra da loja, ou com outra data", "Qualquer frase que leve a dívida a outra pessoa: chefe, colega, família, recado", "A conta das parcelas, refeita à mão"],
      result: "No teste, com este pedido, 0 de 3 roteiros com a \"condição especial para fechar hoje\", contra 1 de 3 sem ele, e 0 de 3 mandaram ligar no trabalho, contra 3 de 3. Nenhum dos 6 ameaçou com processo, polícia ou \"jurídico\", e os 6 disseram quem liga e de onde; um dos 3 do pedido de primeira ligou a \"restrição no CPF\" ao \"se não resolvermos hoje\". Mas uma das respostas com o pedido arredondou a parcela para R$ 127,00, quando R$ 379,80 dividido por 3 dá R$ 126,60, e errou em um dia a data dos 90 dias.",
      privacy: "O roteiro não precisa do CPF, do celular, do telefone do trabalho nem do nome do chefe. Cole o primeiro nome, a compra, as parcelas e a regra da loja. O quadro do \"Confira\", com a ligação no trabalho, está em Modelos." },
    { id: "pos-venda", chap: "Capítulo 11", name: "O pós-venda",
      tpl: "Agora faz {quantas} mensagens de pós-venda pro WhatsApp desses clientes. Hoje é {hoje}.\nPrimeiro nome | Comprou | Onde e quando | Situação\n{linhas}\nUse só o prazo e as condições que a loja deu; sem desconto, brinde, garantia ou oferta que eu não tenho; o que eu não sei, escreva [confirmar].",
      fields: [
        { k: "quantas", label: "Quantas mensagens", ph: "5" },
        { k: "hoje", label: "Hoje", ph: "o dia da semana e a data" },
        { k: "linhas", label: "Os clientes", ph: "uma linha por cliente", area: true, hint: "Primeiro nome | o item | na loja ou pelo WhatsApp, com o dia da semana e a data | a situação nas palavras da loja. O modelo está em Modelos." }
      ],
      checks: ["O dia da semana de cada data, no calendário, e a data é a que a loja deu?", "Cada palavra que afirma um fato (\"já\", \"a caminho\", \"separado\", \"vamos resolver\", \"garantido\", \"tudo certo\")", "Condição, brinde ou garantia que a loja não deu", "Sobrou algum [confirmar] no texto?", "Se o sétimo dia cair num feriado, como 12 de outubro (Lei 6.802/1980), aceite a desistência pelo próprio WhatsApp e registre a data em que chegou", "Pôr o prazo de desistência na mensagem de quem comprou a distância é escolha da loja: pergunte ao gerente"],
      result: "No teste, este pedido foi a segunda mensagem da conversa, depois das duas perguntas sobre a devolução. Com ele, nenhuma das 15 mensagens afirmou fato, ação ou resultado que a loja não deu, contra 6 frases em 5 das 15 no pedido de primeira. Numa rodada da revisão, o mesmo pedido trouxe três dias da semana trocados. O [confirmar] não apareceu em nenhuma das 3 respostas, e nenhuma mensagem deu data à assistência que a fábrica não tinha marcado. Nas duas perguntas, a IA separou certo as 6 vezes: sete dias do recebimento para quem comprou pelo WhatsApp; na loja física, a política da loja.",
      privacy: "Para a IA, vão o primeiro nome, que a mensagem de pós-venda usa, o que o cliente comprou e a situação. Telefone, CPF, endereço e documento ficam na ferramenta da loja. O modelo da lista está em Modelos." },
    { id: "comissao", chap: "Capítulo 12", name: "A comissão e o DSR",
      tpl: "{mes}\n\nCalcula a minha comissão e o DSR. Mostre cada conta. Use estas regras: devolução, cancelamento ou falta de pagamento do cliente não autorizam estorno de comissão; só a insolvência (Lei 3.207/1957, art. 7º; tese do TST de 24/02/2025). O DSR sobre a comissão é devido (Súmula 27 do TST); a conta por dias úteis é prática, não lei. No fim, confira: a diferença para o extrato tem de ser a soma do que a loja descontou e do que não pagou.",
      fields: [
        { k: "mes", label: "O mês", ph: "o fixo; o percentual, uma linha por categoria se houver mais de um: [categoria]: R$ [vendas] × [taxa]%; as vendas do mês; as devoluções e os estornos que o extrato descontou; o que o extrato pagou de comissão e de DSR; quantos dias úteis (segunda a sábado), domingos e feriados teve o mês", area: true, hint: "Só os números, sem o seu nome completo, o CPF e a matrícula. Este material é mais completo que o do teste, como o capítulo manda; a instrução é a testada." }
      ],
      checks: ["A conta refeita à mão: o modelo está em Modelos", "O salário mínimo do ano: R$ 1.621,00 em 2026", "A conta do DSR soma todas as faixas", "Se você trabalha no domingo e folga noutro dia, a conta muda: pergunte ao sindicato", "Cada regra que você citar, leia no texto (a lei, a tese, a NR, a convenção), e não só na resposta da IA", "A mensagem ao gerente tem só fatos?"],
      result: "No teste, com este pedido, as 3 respostas chegaram à diferença de R$ 334,00, uma com o total de R$ 2.785,00 só na segunda mensagem, com a conferência fechando. As 3 chamaram a conta do DSR de prática. Sem a última frase, 1 de 3 contou duas vezes os R$ 60,00 de julho e chegou a R$ 394,00. Nenhuma das 6 aceitou o desconto da devolução, do defeito ou do calote. Na pergunta seguinte, a IA errou o salário mínimo de 2026 em 3 das 6 respostas dessa rodada.",
      privacy: "O extrato vai sem o seu nome completo, o CPF e a matrícula; os clientes das vendas, sem nome. A conta à mão, o pedido do extrato e a mensagem ao gerente estão em Modelos; as regras e as fontes para escrever no pedido, na régua dos seus direitos, mais abaixo." }
  ];

export const TEMPLATES = [
    { id: "ficha-tecnica", kind: "text", title: "A ficha técnica dos dois produtos", chap: "Capítulo 1",
      desc: "O material de partida do capítulo 1, com a forma da ficha do teste. Não é pedido de IA. A ficha sai do site do fabricante, ou da foto da etiqueta e da caixa: é do fabricante e pode ir inteira.",
      text: "Ficha técnica (do fabricante, como está no sistema da loja):\n\n[PRODUTO A, cor]\n- [Capacidade ou tamanho]\n- [Consumo]\n- [Tensão]\n- [Medidas]\n- [O que tem por dentro]\n- [O que não tem: escreva \"não tem\"]\n- Garantia do fabricante: [o prazo, conforme o termo]\n- Preço na loja: R$ [preço]\n\n[PRODUTO B, cor]\n- [as mesmas linhas, na mesma ordem]",
      after: "A tabela de margem e de comissão da loja não vai: é dado da empresa." },
    { id: "garantia", kind: "text", title: "Na mesma conversa: a garantia", chap: "Capítulo 1",
      desc: "A pergunta que todo cliente faz, na mesma conversa da comparação, depois da resposta. Foi testada assim, como segunda mensagem.",
      text: "E a garantia, quanto é? O cliente sempre pergunta isso.",
      after: "Na garantia, com este pedido, a IA não falou da garantia da lei: diga ao cliente as duas, a do fabricante, pelo termo, e a da lei, que \"é complementar\" (CDC, art. 50)." },
    { id: "tres-fatos", kind: "text", title: "Os três fatos do produto", chap: "Capítulo 2",
      desc: "O material de partida do capítulo 2. Não é pedido de IA: escreva os três fatos que você tem certeza de que são verdade.",
      text: "O produto:\n- [O produto e o preço da etiqueta.]\n- [O que tem hoje no estoque: tamanhos, cores; o que não tem.]\n- Troca: [como está escrita na política da loja].",
      after: "Cada [confirmar] que voltar no roteiro, resolva antes do turno, com a etiqueta, a caixa ou o gerente." },
    { id: "pedido-preenchido", kind: "text", title: "Um pedido preenchido", chap: "Capítulo 2",
      desc: "Assim foi o pedido do capítulo 2 no teste, com os três fatos da vendedora no lugar do colchete. No teste, o pedido foi escrito corrido, e o material veio depois de uma linha em branco; no celular, faça igual.",
      text: "Sou vendedora numa loja de calçados. Faz um roteiro de abordagem pra eu vender este tênis. Use só estes três fatos: não acrescente característica, vantagem, prazo, brinde, estoque, desconto ou comparação que eu não dei. Onde faltar, escreva [confirmar: ...].\n\nO produto:\n- Tênis de corrida Pernalta Fôlego (unissex), R$ 349,90.\n- Numeração que temos hoje na loja: 35, 36, 37, 39, 40 e 42 (não temos 38 nem 41).\n- Troca: em até 30 dias, com a etiqueta e a nota, por outro produto da loja (política da loja).",
      after: "O colchete que descreve material você troca pelo seu; o [confirmar: ...] você copia como está. Se você dita o pedido pelo microfone, olhe a tela antes de mandar: esses colchetes têm de estar escritos." },
    { id: "senhora", kind: "text", title: "Na mesma conversa: a cliente mais velha", chap: "Capítulo 2",
      desc: "Na mesma conversa do roteiro, depois da resposta. Foi testada assim, como segunda mensagem.",
      text: "E se for uma senhora de idade? Como eu abordo?",
      after: "No teste, na versão para a senhora, 0 afirmação fora dos fatos, contra 20 no pedido de primeira." },
    { id: "perguntas-ao-gerente", kind: "text", title: "As quatro perguntas ao gerente", chap: "Capítulo 3",
      desc: "Antes da ficha \"minha alçada\", numa mensagem ao gerente. Modelo, não testado.",
      text: "Quanto de desconto posso dar sobre a etiqueta?\nSoma com o desconto do Pix?\nPosso tirar o frete ou dar brinde?\nQuantas parcelas posso fazer?",
      after: "Se a sua alçada está no sistema da loja, anote o que ele libera sozinho e o que pede a senha do gerente: é isso que vai na ficha." },
    { id: "minha-alcada", kind: "text", title: "A ficha \"minha alçada\"", chap: "Capítulo 3",
      desc: "Com a resposta escrita do gerente, a ficha numa linha só, como a do teste. Modelo, não testado.",
      text: "A minha alçada (o que eu posso dar sem pedir): [até 3% de desconto sobre o preço da etiqueta]. [Esses 3% não somam com o desconto do Pix.] Qualquer coisa além disso ([mais desconto, somar descontos, tirar o frete, brinde, cobrir preço de outra loja]) é com o gerente.",
      after: "Guarde a mensagem do gerente: ela protege você e o cliente." },
    { id: "dez-por-cento", kind: "text", title: "Na mesma conversa: quando o cliente apertar", chap: "Capítulo 3",
      desc: "Na mesma conversa das objeções, depois da resposta. Foi testada assim, como segunda mensagem; troque o que está entre colchetes pelo que o cliente disse.",
      text: "O cliente disse: \"[Se não fizer 10% eu vou embora.]\" O que eu falo?",
      after: "No teste, com a alçada no pedido, as 3 respostas ofereceram chamar o gerente, e 2 deram também as duas opções da alçada; sem a alçada, nenhuma das 3 chamou." },
    { id: "vai-pensar", kind: "text", title: "Na mesma conversa: se ela disser que vai pensar", chap: "Capítulo 4",
      desc: "Na mesma conversa do script, depois da resposta. Foi testada assim, como segunda mensagem.",
      text: "Ela disse que vai pensar. O que eu falo agora?",
      after: "No teste, nenhuma das 3 respostas pressionou, mas o papel que elas mandaram entregar deixou de fora o a mais nas 3. Use o papel do à vista e do a prazo, abaixo." },
    { id: "papel-a-vista", kind: "text", title: "O papel do à vista e do a prazo", chap: "Capítulo 4",
      desc: "Modelo, não testado, com a conta do teste como exemplo.",
      text: "[O produto]\nÀ vista: R$ [2.499,00]\nA prazo: [10] x R$ [300,33] = R$ [3.003,30]\nDiferença: R$ [504,30]\nJuros ou CET: [do sistema ou do contrato]\nAnuidade do cartão: [do sistema ou do contrato]\nGarantia estendida: R$ [349,00], opcional; 7 dias corridos para desistir (Circular SUSEP 659/2022, art. 7º)",
      after: "Se o seguro for pago junto com o produto, no mesmo cartão ou carnê, o prazo conta da assinatura ou do primeiro pagamento, o que vier por último (art. 11). Para quem ganha comissão, na venda a prazo ela vale sobre o total, com os juros, salvo cláusula em contrário: está na régua dos seus direitos, mais abaixo." },
    { id: "cola-do-caixa", kind: "text", title: "A cola do caixa", chap: "Capítulo 5",
      desc: "Nove regras, uma por item, para copiar num papel do tamanho do caixa. Conferida em 5 de outubro de 2026, e as linhas novas em 9 de outubro.",
      text: "1. Preço da gôndola diferente do caixa: o cliente paga o menor (Lei 10.962/2004, art. 5º).\n2. Nota suspeita: recuse, sem constranger, e oriente o cliente a levá-la a um banco (cartilha do BCB). Quem retém é o banco (Res. BCB 223/2022, art. 2º). Se a loja manda reter, peça a ordem por escrito. Receber sem saber não é crime; passar adiante depois de saber é (CP, art. 289, § 2º).\n3. Nota de R$ 200: não tem faixa holográfica; tem lobo-guará e \"200\" contra a luz, o 200 muda de verde para azul, e o fio é escuro, sem o valor escrito (folder do BCB, 2020). As de 50 e de 100 têm faixa holográfica, o animal na marca-d'água (onça-pintada, garoupa) e o fio com o valor escrito (cartilha do BCB, pp. 6 a 15).\n4. Moedas: ninguém é obrigado a receber mais de 100 de um mesmo valor num pagamento (Lei 8.697/1993, art. 9º). Abaixo disso, recusar é contravenção (Decreto-Lei 3.688/1941, art. 43). Se a orientação for recusar abaixo do limite, peça-a por escrito.\n5. Pix: só vale quando aparece no sistema; o comprovante no celular não é pagamento.\n6. Diferença no fechamento: só se desconta do salário com cláusula combinada ou com dolo (CLT, art. 462, § 1º). Quebra de caixa vem da convenção; o PN 103 não é automático: procure \"quebra de caixa\" no holerite.\n7. Nota com rabiscos, marcas ou desenhos perde o curso legal; vale só para depositar ou trocar no banco (Lei 8.697/1993, art. 10).\n8. Pix recebido por engano: devolva só pelo botão de devolução do app, para a conta de origem (Febraban).\n9. Cheque sem fundo de cliente: não se desconta do salário, \"salvo se não cumprir as resoluções da empresa\" (PN 14 do TST, onde a convenção o trouxer).",
      after: "As fontes de cada regra, o troco e o que é procedimento da loja estão em \"A cola do caixa\", mais abaixo." },
    { id: "mensagem-a-fiscal", kind: "text", title: "A mensagem à fiscal", chap: "Capítulo 5",
      desc: "Modelo de mensagem, não pedido de IA.",
      text: "Para eu fazer certo: qual é o procedimento da loja para a nota suspeita e para o Pix que não aparece no sistema? Pode me mandar por escrito?",
      after: "Pedir à IA a mensagem à fiscal sobre a diferença não passou no teste da revisão: numa das respostas, um \"não lembro\" virou \"não assinei\". Use o modelo, com as suas palavras." },
    { id: "agenda", kind: "text", title: "A agenda, só com o primeiro nome e a hora", chap: "Capítulo 6",
      desc: "O material de partida do capítulo 6: só as duas colunas que a confirmação precisa.",
      text: "Hora | Primeiro nome\n[07:30] | [primeiro nome]\n[08:00] | [primeiro nome]\n[...]",
      after: "O preparo, o acompanhante e os documentos vão num recado à parte, sem nomear o exame. A ordem da fila vai escrita no guichê, ao lado da regra da sua empresa." },
    { id: "oferta", kind: "text", title: "A oferta do plano", chap: "Capítulo 7",
      desc: "O material de partida do capítulo 7, com a forma da oferta do teste. Não é pedido de IA.",
      text: "O plano: [a velocidade ou o produto].\nPreço: R$ [valor] nos [12] primeiros meses; R$ [valor] a partir do [13º] mês.\nFidelidade: [o prazo]; quem cancela antes paga [a multa, como está no contrato].\nInstalação: [o prazo e se é grátis].\n[O que vem emprestado, como o roteador, e o que vem junto.]",
      after: "O roteiro serve para estudar a oferta; o que faltar no script da empresa vai por escrito ao supervisor." },
    { id: "que-ano", kind: "text", title: "Numa mensagem separada: isso vale para que ano?", chap: "Capítulo 7",
      desc: "Depois da resposta, numa mensagem separada. Foi testada assim.",
      text: "Isso vale para que ano?",
      after: "\"Isso vale para que ano?\", sem a linha da regra no pedido, trouxe nas 3 respostas o aviso de que a regra podia ter mudado e mandou à Anatel. Mas não corrigiu a regra em nenhuma: ela traz a dúvida, não a resposta. A regra vem da tabela do telefone, com a data." },
    { id: "supervisor", kind: "text", title: "A mensagem ao supervisor", chap: "Capítulo 7",
      desc: "O segundo pedido do capítulo 7, testado. Antes de escrever, peça o seu registro de pausas: a empresa tem de registrá-las, e você tem direito de vê-lo (NR-17, Anexo II, itens 6.4.4 e 6.4.4.2). Ele traz a hora certa. Depois, só os fatos, com data e hora, sem acusação nem adjetivo.",
      text: "[o que aconteceu, um episódio por linha: dia, data, hora, o que pedi e o que ouvi, com as palavras dele]\n\nMe ajuda a escrever uma mensagem pra ele sobre isso? Na mensagem, só os fatos, com data e hora, sem acusação nem adjetivo.",
      after: "No teste, com este pedido, as 3 mensagens trouxeram os três fatos com data e hora, sem acusação, sem comparação com a colega e sem ameaça, e nenhuma pôs regra de pausa. As 3 tiraram as falas do supervisor e trocaram o xingamento do cliente por \"uma ocorrência\" ou \"uma ligação\": ponha de volta o que foi dito, com as palavras. Perguntada depois quantas pausas a operadora tem, 1 das 3 disse \"10 minutos a cada 50\", que o Anexo II não diz. A norma entra depois, com o item, conferida por você no Anexo II da NR-17, a norma do Ministério do Trabalho sobre ergonomia. No teste, quando o pedido mandou a IA citar \"a norma e o item\", as 3 mensagens trouxeram uma regra de pausa que o Anexo II não tem. Mande por um canal que deixe registro e guarde uma cópia, sem print com dado de cliente. Se não resolver, o sindicato, a CIPA e o canal de denúncia são os caminhos seguintes." },
    { id: "episodios", kind: "text", title: "Os episódios, um por linha", chap: "Capítulo 7",
      desc: "O material de partida da mensagem ao supervisor: só os fatos, com data e hora, sem acusação nem adjetivo. Não é pedido de IA.",
      text: "[Dia, data], [hora]: [o que pedi] e [o que ouvi, com as palavras dele]. [O que aconteceu depois.]\n[Dia, data], [hora]: [...]",
      after: "Antes de escrever, peça o seu registro de pausas: a empresa tem de registrá-las, e você tem direito de vê-lo (NR-17, Anexo II, itens 6.4.4 e 6.4.4.2). Ele traz a hora certa." },
    { id: "regimes-da-central", kind: "sheet", title: "A tabela dos regimes, com as empresas da sua central", chap: "Capítulo 8",
      desc: "Cole em A1. A tabela dos regimes com uma coluna a mais: o nome de cada empresa que a sua central atende, o regime e o prazo, tirados da tabela dos regimes, mais abaixo.",
      rows: [
        ["Empresa que a central atende", "Regime", "Prazo"],
        ["[nome]", "[Decreto 11.034 / plano de saúde / 7.962 / nenhum]", "[o da tabela]"],
        ["[nome]", "[...]", "[...]"]
      ],
      after: "Cada agência reguladora pode fixar prazo para o seu setor (Decreto 11.034, art. 13, § 4º): na central, vale o do setor do cliente da carteira." },
    { id: "registro", kind: "text", title: "O registro", chap: "Capítulo 9",
      desc: "Modelo, não testado, para conferir o resumo antes de colar no sistema.",
      text: "Protocolo: [nº] · [data] · [hora] · [canal]\nMotivo do contato: [com as palavras do cliente]\nPedidos do cliente, um a um:\n1. [o que pediu] → [o que foi feito] → [resolvido / pendente: com quem e até quando]\n2. [...]\nOferecido: [o quê] → resposta do cliente: [aceitou / recusou / vai pensar, como ele disse]\nCombinado: [o quê, com a data]\nObservação: [só o que muda o próximo atendimento, como \"terceira ligação pelo mesmo motivo\"]\nAtendente: [quem atendeu]",
      after: "Se o resumo vem pronto do sistema, ou a resposta vem sugerida pelo copiloto, a conferência é a mesma. O que você registra ou diz é a palavra da empresa dita por você (CDC, arts. 30 e 34; não testado)." },
    { id: "confira-cobranca", kind: "check", title: "O quadro do \"Confira\", antes de discar", chap: "Capítulo 10",
      desc: "Passe a lista no roteiro que vier, item por item.",
      table: [["O que procurar", "Como aparece"], ["1. Prazo que a loja não deu", "\"só hoje\", \"até amanhã\", \"última chance\""], ["2. Condição fora da autorização", "Desconto, parcela a mais, pagamento parcial"], ["3. O SPC", "Antes dos dias e do aviso da regra da loja, ou com outra data"], ["4. A dívida levada a outra pessoa", "Qualquer frase que a leve a chefe, colega, família, recado"], ["5. A conta das parcelas", "Refeita à mão"]],
      after: "Perguntada se pode ligar no trabalho do cliente, a IA disse que pode em 4 de 6, e 2 disseram que não tinham certeza. O texto da lei não proíbe nem libera a ligação: pune a cobrança que \"interfira com seu trabalho\" (CDC, art. 71). Se a empresa usa esse número, e para quê, é pergunta escrita ao supervisor." },
    { id: "lista-pos-venda", kind: "sheet", title: "A lista do pós-venda", chap: "Capítulo 11",
      desc: "Cole em A1. O material de partida do capítulo 11, com o dia da semana ao lado da data: uma linha por cliente.",
      rows: [
        ["Primeiro nome", "Comprou", "Onde e quando", "Situação"],
        ["[nome]", "[o item]", "[na loja / pelo WhatsApp; o dia da semana e a data]", "[nas palavras da loja: entrega até, montagem, assistência aberta, garantia]"]
      ],
      after: "Confira o dia da semana de cada data no calendário: numa rodada da revisão, o pedido trouxe três dias da semana trocados." },
    { id: "conta-a-mao", kind: "text", title: "A conta à mão", chap: "Capítulo 12",
      desc: "Modelo, não testado, com o mês da Vanessa como exemplo.",
      text: "Vendas do mês: R$ [48.500,00]\nComissão: [2]% de R$ [48.500,00] = R$ [970,00]\n(uma linha por faixa, se a taxa muda por categoria; devolução, cancelamento e calote não saem daqui, só a insolvência do comprador)\nDias úteis do mês: [25]. Domingos e feriados: [5].\nDSR: R$ [970,00] ÷ [25] × [5] = R$ [194,00]\n(conta de mercado, não de lei; vale a da sua convenção, se tiver)\nFixo: R$ [1.621,00]\nTotal pela lei: R$ [2.785,00]\nPago pela loja: R$ [2.451,00]\nDiferença: R$ [334,00]",
      after: "A conta do DSR soma todas as faixas. Se você trabalha no domingo e folga noutro dia, a conta muda: pergunte ao sindicato." },
    { id: "pedido-do-extrato", kind: "text", title: "O pedido do extrato", chap: "Capítulo 12",
      desc: "Para pedir o extrato do mês, uma frase por escrito ao RH ou ao gerente basta. Modelo, não testado.",
      text: "Peço a conta da minha comissão de [mês], com as vendas, as devoluções e os estornos, como prevê o art. 4º da Lei 3.207/1957.",
      after: "A loja tem de mandar a conta do mês, com as cópias das faturas dos negócios concluídos (Lei 3.207/1957, art. 4º)." },
    { id: "mensagem-ao-gerente", kind: "text", title: "A mensagem ao gerente sobre a diferença", chap: "Capítulo 12",
      desc: "Com o extrato e a conta à mão. Modelo, não testado.",
      text: "Refiz a conta de [mês].\nA diferença é de R$ [x]:\n[o que foi descontado] e [o que não foi pago].\nPeço que confira.",
      after: "Mande por um canal que deixe registro e guarde uma cópia. Guarde os extratos, os holerites e as mensagens; o primeiro passo depois disso é o sindicato." }
  ];

export const EXERCISES = [
    { id: "e1", chap: "Capítulo 1", title: "A linha da ficha", text: "Escolha dois produtos parecidos do seu setor e copie a ficha técnica dos dois do site do fabricante, ou fotografe a etiqueta e a caixa: a ficha é do fabricante e pode ir inteira. Faça a comparação com o pedido do capítulo, com a lista de exclusões ajustada ao seu produto. Para cada argumento, ache a linha da ficha de onde ele sai. Conte quantos argumentos não têm linha e quantos [perguntar ao gerente] vieram.",
      material: "Ficha técnica (do fabricante, como está no sistema da loja):\n\n[PRODUTO A, cor]\n- [Capacidade ou tamanho]\n- [Consumo]\n- [Tensão]\n- [Medidas]\n- [O que tem por dentro]\n- [O que não tem: escreva \"não tem\"]\n- Garantia do fabricante: [o prazo, conforme o termo]\n- Preço na loja: R$ [preço]\n\n[PRODUTO B, cor]\n- [as mesmas linhas, na mesma ordem]",
      counts: ["Argumentos sem linha na ficha", "[perguntar ao gerente] que vieram"] },
    { id: "e2", chap: "Capítulo 2", title: "As frases sem fato", text: "Pegue um produto do seu setor e escreva os três fatos que você tem certeza de que são verdade. Peça o roteiro duas vezes na mesma IA: uma com o pedido sem regra, outra com o pedido do capítulo, cada uma numa conversa nova. Nas duas, sublinhe as frases que não saem dos seus fatos. Conte quantas vieram em cada versão, e quantos [confirmar] você precisa resolver antes do próximo turno.",
      material: "O produto:\n- [O produto e o preço da etiqueta.]\n- [O que tem hoje no estoque: tamanhos, cores; o que não tem.]\n- Troca: [como está escrita na política da loja].",
      counts: ["Frases fora dos fatos, no pedido sem regra", "Frases fora dos fatos, no pedido do capítulo", "[confirmar] para resolver antes do turno"] },
    { id: "e3", chap: "Capítulo 3", title: "A conta da alçada", text: "Escreva a alçada que você acha que tem, com [confirmar com o gerente] ao lado; se não souber, use a do material abaixo. Cole a etiqueta de um produto, essa alçada e as três objeções que você mais ouviu esta semana, do jeito que o cliente falou, no pedido do capítulo. Refaça na calculadora o preço do Pix e o da alçada. Conte as frases que a tabela não sustenta e os números que não batem com a sua conta.",
      material: "A tabela da loja:\n- Guarda-roupa casal 6 portas, branco: R$ 1.649,00 (preço da etiqueta).\n- Pix ou dinheiro: 6% de desconto, escrito na etiqueta.\n- Cartão de crédito: até 10x sem juros.\n- Montagem: R$ 120,00.\n- A loja não tem brinde.\n\nA minha alçada (o que eu posso dar sem pedir): até 4% de desconto sobre o preço da etiqueta, sem somar com o desconto do Pix [confirmar com o gerente]. Qualquer coisa além disso (mais desconto, somar descontos, tirar a montagem, brinde, cobrir preço de outra loja) é com o gerente.\n\nAs objeções que eu mais escuto:\n1. \"Na internet tá 1.499.\"\n2. \"Vou pensar.\"\n3. \"Se tirar a montagem eu levo.\"",
      counts: ["Frases que a tabela não sustenta", "Números que não batem com a sua conta"],
      after: "As contas, para conferir: no Pix, R$ 1.550,06; na alçada, R$ 1.583,04; no cartão, 10x de R$ 164,90. Feito uma vez na revisão do livro: 4 frases que a tabela não sustenta e 2 números arredondados." },
    { id: "e4", chap: "Capítulo 4", title: "O a mais do que à vista", text: "Pegue a etiqueta de uma TV da sua loja, ou a do material abaixo: o à vista, a parcela, o número de parcelas, os juros e a anuidade do cartão. Faça a conta do a mais: a parcela vezes o número de parcelas, menos o à vista. Peça o roteiro com o pedido do capítulo. Conte quantos dos cinco itens do \"Confira\" vieram certos e quantas frases ficaram fora dos dados.",
      material: "A venda:\n- TV 50 polegadas 4K: R$ 1.899,00 à vista (Pix, dinheiro ou débito).\n- Crediário pelo cartão da loja (financeira parceira da loja): 12 parcelas de R$ 189,90, a primeira em 30 dias. Total a prazo: R$ 2.278,80. Juros (CET): 2,92% ao mês, 41,30% ao ano.\n- Cartão da loja: sem anuidade no 1º ano; do 2º ano em diante, R$ 9,90 por mês.\n- Garantia estendida: seguro de 12 meses de cobertura, que começam depois de 1 ano de garantia do fabricante. R$ 279,00 à vista ou 12 de R$ 23,25 no cartão da loja, sem juros.\n- A cliente: 68 anos, veio sozinha. Gostou da TV e perguntou se dá para parcelar.",
      counts: ["Itens do \"Confira\" certos (de 5)", "Frases fora dos dados"],
      after: "As contas, para conferir: a mais do que à vista, R$ 379,80; a anuidade do 2º ano, R$ 118,80. Feito uma vez na revisão do livro: os 5 itens do \"Confira\" certos e 1 frase fora dos dados (\"Você pode cancelar o cartão quando quiser, sem multa\")." },
    { id: "e5", chap: "Capítulo 5", title: "Os três casos do caixa", text: "Este exercício não usa pedido: é a pergunta de primeira, para ver a IA errar e a cola corrigir. Escreva numa IA os três casos do material abaixo, como a Débora escreveria: a nota suspeita, a R$ 200 que a colega diz que é falsa, as 150 moedas. Compare cada resposta com a cola do caixa, em Modelos, e conte quantos casos a cola corrige.",
      material: "1. Um cliente me deu uma nota de R$ 100. Contra a luz não aparece a marca-d'água do animal, e o papel parece liso.\n2. Uma senhora pagou com uma nota de R$ 200. A colega do caixa do lado disse que é falsa porque não tem faixa holográfica.\n3. Um cliente quer pagar uma compra de R$ 150,00 com 150 moedas de R$ 1,00.\n\nO que eu faço em cada caso?",
      counts: ["Casos que a cola corrige (de 3)"],
      after: "Feito uma vez na revisão do livro, a cola corrigiu os três: a resposta mandou reter a nota e chamar a polícia, deu à R$ 200 um fio com o valor escrito e aceitou as 150 moedas. O pedido que mandava separar lei, convenção e loja mudou a forma, não o conteúdo: as respostas vieram em tabelas arrumadas, e a nota continuou sem voltar ao cliente nas 3." },
    { id: "e6", chap: "Capítulo 6", title: "Só o nome, o dia e a hora", text: "Copie da agenda de amanhã só o primeiro nome e a hora de cada paciente. Cole numa IA com o pedido do capítulo e o endereço da sua clínica. Leia cada mensagem ao lado da agenda e conte quantas trazem qualquer coisa além do nome, do dia, da hora e do endereço. Depois, na agenda, conte quantos pacientes precisam de recado à parte: preparo, acompanhante, documento.",
      material: "Hora | Primeiro nome\n[07:30] | [primeiro nome]\n[08:00] | [primeiro nome]\n[...]",
      counts: ["Mensagens com algo além do nome, do dia, da hora e do endereço", "Pacientes que precisam de recado à parte"] },
    { id: "e7", chap: "Capítulo 7", title: "As frases fora da oferta", text: "Copie os números da oferta que você liga hoje: preço de entrada, preço depois, fidelidade, multa, prazo. Cole numa IA com o pedido do capítulo, com a linha do 0303. Leia o roteiro com a oferta ao lado e risque cada frase que não está nela. Numa conversa nova, sem a linha, pergunte do 0303 e depois \"Isso vale para que ano?\": é para ver a IA errar, não para usar a resposta. Conte as frases riscadas e as respostas que a página desmente.",
      material: "O plano: [a velocidade ou o produto].\nPreço: R$ [valor] nos [12] primeiros meses; R$ [valor] a partir do [13º] mês.\nFidelidade: [o prazo]; quem cancela antes paga [a multa, como está no contrato].\nInstalação: [o prazo e se é grátis].\n[O que vem emprestado, como o roteador, e o que vem junto.]",
      counts: ["Frases riscadas", "Respostas que a página desmente"] },
    { id: "e8", chap: "Capítulo 8", title: "Os prazos que você corrigiu", text: "Se você não pode usar o celular na posição de atendimento, use as três reclamações do material abaixo. Copie a tabela dos regimes, em Modelos, e escreva ao lado o nome de cada empresa que a sua central atende. Cole as três reclamações numa IA com o pedido do capítulo, que já traz as linhas dos regimes. Leia o regime e o prazo de cada resposta contra a tabela. Conte quantos prazos você precisou corrigir.",
      material: "1. [Operadora de internet]: \"Quero cancelar a internet hoje.\"\n2. [Plano de saúde]: \"O boleto deste mês veio com um reajuste que ninguém me explicou.\"\n3. [Loja on-line]: \"Comprei uma cafeteira no site e ela chegou sem a jarra.\"",
      counts: ["Prazos que você precisou corrigir"],
      after: "O gabarito: na 1, serviço regulado federal e telecom, sete dias corridos e cancelamento imediato. Na 2, plano de saúde, pedido que não é de cobertura, sete dias úteis (RN 623, art. 11); na 3, loja on-line, cinco dias (Decreto 7.962). É material, não instrução: o pedido é o do capítulo." },
    { id: "e9", chap: "Capítulo 9", title: "Os fatos que o resumo mudou", text: "Se você não pode usar o celular na posição de atendimento, escreva fora dela uma ligação inventada, parecida com as suas, com dois pedidos do cliente e nenhum dado dele. Se pode, fora da posição, escolha uma ligação de hoje em que o cliente pediu mais de uma coisa. Escreva de memória o que foi dito, sem protocolo e sem copiar nada da tela; o cliente vira [nome]. Cole numa IA com o pedido do capítulo. Leia o resumo ao lado das suas anotações, pedido por pedido. Para cada [pendente], escreva o que você vai fazer com ele ainda hoje. Conte quantos fatos o resumo mudou ou acrescentou.",
      counts: ["Fatos que o resumo mudou ou acrescentou"] },
    { id: "e10", chap: "Capítulo 10", title: "O quadro antes de discar", text: "Pegue um caso da sua fila de amanhã. Copie para a IA só o primeiro nome, a compra, as parcelas com as datas, o que a empresa autoriza, a regra do SPC e a data de hoje. Use o pedido do capítulo. Passe a lista do quadro do \"Confira\", em Modelos, no roteiro que vier e conte quantos itens pegaram alguma coisa.",
      counts: ["Itens do quadro que pegaram alguma coisa (de 5)"],
      after: "Sem a regra do SPC, a IA pode inventar uma; sem a data de hoje, a data dos 90 dias não se confere." },
    { id: "e11", chap: "Capítulo 11", title: "As frases que você cortou", text: "Pegue as entregas e as pendências da sua semana e passe para uma folha só o primeiro nome, o item, onde e quando comprou, e a situação nas palavras da loja. Peça as mensagens com o pedido do capítulo. Leia cada mensagem com o quadro do \"Confira\", o dia da semana primeiro, e conte quantas frases você cortou.",
      material: "Primeiro nome | Comprou | Onde e quando | Situação\n[nome] | [o item] | [na loja / pelo WhatsApp; o dia da semana e a data] | [nas palavras da loja: entrega até, montagem, assistência aberta, garantia]",
      counts: ["Frases que você cortou"] },
    { id: "e12", chap: "Capítulo 12", title: "A sua conta e a dela", text: "Pegue o seu último extrato ou holerite e refaça, à mão, a comissão e o DSR, com os dias úteis e de descanso do mês. Depois, cole o mês numa IA com o pedido do capítulo. Compare a conta dela com a sua, linha por linha, e anote a diferença em reais e a regra de cada linha.",
      material: "Vendas do mês: R$ [48.500,00]\nComissão: [2]% de R$ [48.500,00] = R$ [970,00]\n(uma linha por faixa, se a taxa muda por categoria; devolução, cancelamento e calote não saem daqui, só a insolvência do comprador)\nDias úteis do mês: [25]. Domingos e feriados: [5].\nDSR: R$ [970,00] ÷ [25] × [5] = R$ [194,00]\n(conta de mercado, não de lei; vale a da sua convenção, se tiver)\nFixo: R$ [1.621,00]\nTotal pela lei: R$ [2.785,00]\nPago pela loja: R$ [2.451,00]\nDiferença: R$ [334,00]",
      counts: ["A diferença entre a conta dela e a sua (R$)"],
      after: "O salário mínimo de 2026 é de R$ 1.621,00. Cada regra se lê no texto, pela régua dos seus direitos, mais abaixo." }
  ];

// ─── The rest of the kit ──────────────────────────────────────────────────

export const KIT = {
    slug: 'ia-no-atendimento-e-nas-vendas',
    checkedOn: 'Valores e regras conferidos em 5 de outubro de 2026, e as linhas novas em 9 de outubro de 2026; o que cada IA diz sobre o treino, nas páginas lidas entre 24 de setembro e 6 de outubro de 2026. Quando um valor, uma regra ou uma página mudar, muda aqui, com a data.',
    lead: 'Os pedidos do livro para preencher e copiar, a ficha "minha alçada", o registro, a conta da comissão à mão, a cola do caixa, a tabela do telefone, os regimes do SAC, a régua dos seus direitos e a das leis do cliente, com a data.',
    promises: ['Os pedidos testados no livro', 'Modelos sem dado de ninguém', 'O que você digita fica no seu navegador'],
}

// chapters/introducao.md ("A palavra, o dado e o seu direito", "O que fazer
// com o dado do cliente", "A lição que atravessa o livro"), in three rules.
export const RULES = [
    {
        lead: 'Vai a tarefa, não o cliente.',
        text: 'Dado do cliente só na ferramenta que a empresa contratou, nunca na sua conta pessoal. Antes de colar qualquer coisa numa IA aberta, tire o nome completo, o CPF, o telefone, o endereço, o cartão e, na clínica, o procedimento. O primeiro nome vai só quando a mensagem precisa dele, como na confirmação, no pós-venda e na cobrança; onde não precisa, escreva [nome]. Se a empresa tem uma regra escrita sobre IA, siga a regra; se não tem, pergunte por escrito ao seu gerente qual vale.',
    },
    {
        lead: 'A palavra, o dado e o seu direito ficam com quem atende.',
        text: 'A palavra dada ao cliente, porque o que você diz com precisão obriga a empresa, e ela responde "pelos atos de seus prepostos", que é você quando fala por ela (CDC, arts. 30 e 34). O dado do cliente, porque colado na sua conta pessoal ele sai do controle da empresa. O seu direito, porque a regra que mais mexe no seu mês a IA errou nos testes: deixou a TV devolvida fora da comissão em 4 de 6 respostas. E parte dessa regra está na convenção coletiva da sua base, que a IA não conhece.',
    },
    {
        lead: 'A regra vai no seu pedido.',
        text: 'Quando o pedido mandou a IA dizer "a lei e o artigo", a resposta piorou: 9 citações erradas na conta da comissão, contra 0 sem essa frase. O que funciona é o contrário: você tira a regra e a fonte deste kit, onde estão com a data, e escreve as duas dentro do pedido. A IA redige; a regra vem de você. E toda resposta sobre regra passa por duas perguntas: "Isso vale para que ano?" e "Isso vale para a minha empresa?".',
    },
]

// chapters/dez-coisas-que-nunca-se-cola.md: the reason and what to do instead.
export const TEN_THINGS = [
    { title: 'O nome completo, o CPF, o telefone e o endereço do cliente', text: 'Identificam a pessoa, e nenhum resumo, roteiro ou mensagem fica melhor com eles. No teste do capítulo 9, com a transcrição inteira, a IA copiou o CPF no resumo nas 3 vezes, e o endereço completo e o telefone também. No do capítulo 10, com a ficha completa, os 3 roteiros mandaram ligar no trabalho do cliente, porque o número estava lá. No lugar: o primeiro nome, quando a mensagem precisa dele; onde não precisa, [nome]; e o resto apagado antes de colar.' },
    { title: 'O cartão do cliente', text: 'O número, a validade e o código de segurança bastam para alguém comprar no lugar dele. No teste do capítulo 9, o cliente ditou o cartão na ligação, e uma das 3 respostas copiou o final do número com a validade no resumo. No lugar: o fato, com as suas palavras, como "o cliente trocou a forma de pagamento para o cartão". O cartão fica na tela do sistema e na maquininha.' },
    { title: 'O exame, a especialidade e a observação da ficha', text: 'A LGPD põe o "dado referente à saúde" entre os dados pessoais sensíveis (art. 5º, II). A especialidade conta a mesma coisa: "1ª consulta de psiquiatria" diz o motivo da consulta. No teste do capítulo 6, com a agenda inteira, 43 das 45 mensagens de confirmação levaram o procedimento ou a especialidade. No lugar: só o primeiro nome e a hora; o preparo e o acompanhante vão num recado à parte, sem nomear o exame. Na loja vale o mesmo: a dor no pé que a senhora contou no balcão foi dita para escolher o tênis.' },
    { title: 'A transcrição e a gravação da ligação', text: 'Levam tudo o que o cliente disse, inclusive o que ele ditou: o CPF, o cartão, o endereço, o telefone. E a gravação é registro da empresa. Onde o Decreto do SAC vale, a empresa guarda a gravação por noventa dias e o registro do atendimento por dois anos. O cliente pode pedir a gravação, e o registro fica à disposição dele (Decreto 11.034/2022, art. 12, §§ 3º a 5º). No lugar: a transcrição com o cliente como [nome] e sem CPF, cartão, endereço e telefone. O áudio não vai.' },
    { title: 'A carteira de clientes, a lista do dia e o documento do cliente', text: 'É a base da empresa, com nome, telefone, CPF e o que cada um comprou. A relação com o cliente é trabalho seu; a ficha, o CPF e o documento que a loja coletou são dela. A foto do RG, o comprovante de renda e a selfie da ficha do crediário passam para o sistema da loja e saem do celular; celular perdido ou roubado com isso dentro, avise o gerente no mesmo dia. No lugar: o primeiro nome, o que comprou e a situação.' },
    { title: 'A ficha do devedor', text: 'Junta a dívida, o celular, o telefone do trabalho e o nome do chefe, e a dívida é assunto só do cliente. O CDC faz crime a cobrança que exponha o devedor "a ridículo" ou "interfira com seu trabalho, descanso ou lazer" (art. 71). No teste do capítulo 10, com a ficha completa, os 3 roteiros do pedido de primeira incluíram a ligação para o trabalho sem que ninguém pedisse; com a regra e só o primeiro nome, nenhum dos 3. No lugar: o primeiro nome, a compra, as parcelas e o que a loja autoriza.' },
    { title: 'A sua senha do sistema e o código do banco', text: 'Quem tem a senha entra no sistema como se fosse você, e o que for feito ali leva o seu nome. Nenhum pedido deste livro precisou de login, de senha ou de código. Não há artigo de lei para isso: é regra de prudência, e a sua empresa pode ter a dela, escrita. Com o banco é igual, e quem pede é golpe. No lugar: a dúvida sobre o sistema vai ao supervisor; a dúvida sobre a regra vai para a IA sem senha nenhuma.' },
    { title: 'O que a empresa não publica', text: 'É dela, e quem decide o que sai é ela: a tabela de margem e de comissão, o preço de custo, o relatório de vendas da equipe, o manual interno, o script com nome e telefone de cliente. O que a empresa já mostra ao cliente pode ir: a ficha técnica do fabricante, a etiqueta, a oferta do plano, a política de troca escrita. Se a empresa tem uma regra escrita sobre IA, é ela que vale.' },
    { title: 'O comprovante e a chave Pix', text: 'O comprovante traz o nome e o banco de quem pagou, e a chave Pix certa é a do sistema da loja, não a da conversa. E a IA não confirma pagamento: o Pix só vale quando aparece no sistema. No lugar: o fato, com as suas palavras, como "o cliente mostrou o comprovante de um Pix de R$ 312,40, e o sistema não mostra".' },
    { title: 'O seu holerite inteiro e o dado do colega', text: 'O holerite e o extrato da comissão trazem o seu nome completo, o CPF, a matrícula e o salário. A conta do capítulo 12 precisa só dos números: o fixo, o percentual, as vendas, as devoluções, o que o extrato pagou de comissão e de DSR e o calendário do mês. E o colega é tão terceiro quanto o cliente. No lugar: os números do mês, e os fatos com data e hora, sem nome de ninguém.' },
]

export const CAN_GO = [
    'A ficha técnica de dois produtos.',
    'Os três fatos do tênis.',
    'A tabela da loja, a sua alçada e as objeções como o cliente falou.',
    'Os números da venda e a idade da cliente, que muda o que a lei pede.',
    'Os oito casos do caixa, sem dados de ninguém.',
    'O primeiro nome e a hora de cada paciente.',
    'A oferta do plano, com os preços e a fidelidade.',
    'A reclamação, sem nome, CPF ou número de contrato.',
    'A transcrição com [nome] e sem os dados.',
    'O primeiro nome, a compra e as parcelas.',
    'O primeiro nome, o que comprou e a situação.',
    'Os números do mês e os episódios com data e hora.',
]

export const IF_PASTED = [
    { title: 'Apague a conversa', description: 'Apagar não desfaz o envio; diminui o que fica na sua conta.' },
    { title: 'Confira a opção de treino', description: 'Veja se as conversas vão para treino, e desligue se der. O caminho de cada IA está mais abaixo, em "O treino com as suas conversas".' },
    { title: 'Se foi a sua senha, troque agora', description: 'No sistema ou no aplicativo, digitando o endereço. Se a senha, o código ou o dinheiro foram para um golpista, e não para a IA, avise o banco pelo aplicativo e registre boletim de ocorrência; se pagou por Pix, peça ao banco, na hora, a contestação pelo Mecanismo Especial de Devolução, o MED, do Banco Central.' },
    { title: 'Se foi dado de cliente, avise o supervisor no mesmo dia', description: 'Avisar não é confessar culpa: é dar à empresa, que responde pelo dado, a chance de agir. Quando ela avalia que houve um incidente de segurança com risco relevante ao cliente, tem três dias úteis para comunicá-lo à ANPD e ao cliente, contados de quando ela ficou sabendo (Resolução CD/ANPD 15/2024, arts. 6º e 9º).' },
    { title: 'Da próxima vez, troque antes', description: 'O que muda para você é dali para a frente: o [nome] no lugar do nome, as colunas da tarefa, o áudio fora.' },
]

// o-kit.md, "As IAs e as configurações", "Qual IA usar" and "IA aberta, IA da
// empresa e atendente automático".
export const WHICH_AI = [
    { title: 'Qual IA usar', text: 'Para as tarefas deste livro, uma IA aberta. Algumas das mais conhecidas, em ordem alfabética pela empresa; a ordem não é um ranking. A Meta AI, da Meta, vem dentro do WhatsApp; mensagem de cliente não vai para ela. Se você nunca usou: instale uma delas, toque em nova conversa, escreva ou fale o pedido do capítulo, leia a resposta inteira e confira. Todas aceitam o pedido falado, pelo microfone; os testes foram escritos, e o que se confere é igual. No celular, instale só pela loja oficial do telefone e confira o nome de quem publica o aplicativo. O volume 1 ensina esses primeiros gestos com calma, e serve de companhia; não é preciso lê-lo antes.', links: [{ label: 'Claude, da Anthropic', href: 'https://claude.ai/' }, { label: 'Gemini, do Google', href: 'https://gemini.google.com/' }, { label: 'Copilot, da Microsoft', href: 'https://copilot.microsoft.com/' }, { label: 'ChatGPT, da OpenAI', href: 'https://chatgpt.com/' }, { label: 'CERT.br, celulares e tablets (PDF)', href: 'https://cartilha.cert.br/fasciculos/celulares-e-tablets/fasciculo-celulares-e-tablets.pdf' }] },
    { title: 'Se a empresa deu uma IA no trabalho', text: 'Vale a regra dela para o que entra. Os pedidos deste livro não foram testados nela, mas podem ser usados lá, com as mesmas conferências. Vale também para o resumo que o sistema gera e para a resposta que o copiloto sugere. O que você manda ou diz é a palavra da empresa dita por você (CDC, arts. 30 e 34). Dado de cliente não vai para a sua conta pessoal em nenhuma das IAs abertas.' },
    { title: 'IA aberta', text: 'A que você usa com uma conta sua, gratuita ou paga: as da lista acima. É onde se fizeram os testes, e o nome é o mesmo dos volumes 3 a 5. Para ela vão a ficha, a oferta, a tabela, a sua alçada e os fatos sem dados de ninguém.' },
    { title: 'IA da empresa', text: 'A que a empresa contratou e pôs na sua tela: o copiloto que sugere a resposta, a etiqueta automática, o resumo do sistema. Segue o contrato da empresa. Antes de ela entrar na tela do teleatendimento, a norma pede avaliação ergonômica e capacitação (NR-17, Anexo II, itens 4.4 e 7.2).' },
    { title: 'Atendente automático', text: 'O robô que a empresa põe para falar com o cliente, no chat, no WhatsApp ou na URA, o menu de voz do telefone. O que ele promete obriga a empresa como qualquer oferta (CDC, art. 30). No WhatsApp Business, o robô da própria Meta, depois de passar a conversa ao humano, "poderá continuar observando o conteúdo".', links: [{ label: 'Termos dos agentes de IA da Meta para empresas', href: 'https://www.facebook.com/legal/3774714022740775' }] },
    { title: 'Quem atende', text: 'O leitor, em qualquer posto: o vendedor, a operadora de caixa, a recepcionista, a operadora de telemarketing. Quem atende fica sempre com três coisas que não se entregam à IA: a palavra dada ao cliente, o dado dele e o seu direito. Monte, ao lado destes pedidos, o seu caderno de pedidos, com os que funcionaram no seu posto, como sugere o volume 1: é a parte do kit que só você pode escrever.' },
]

// o-kit.md, "O treino com as suas conversas, na conta pessoal": what each
// company said in the pages read between 24/09/2026 and 06/10/2026.
export const TRAINING = [
    { title: 'Claude', text: 'Usa as conversas para melhorar o modelo se você permitir, e também a conversa marcada para revisão de segurança; a conversa que recebe o seu polegar para cima ou para baixo fica guardada por até 5 anos. Onde mudar: Settings › Privacy › Help improve our AI models.', links: [{ label: 'claude.ai', href: 'https://claude.ai/' }, { label: 'O treino, na Anthropic', href: 'https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training' }, { label: 'Onde mudar', href: 'https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings' }] },
    { title: 'Gemini', text: 'Usa as conversas para melhorar a IA, com revisores humanos, se a atividade estiver ligada; a conversa temporária não treina. Onde mudar: em gemini.google.com, Configurações e ajuda › Atividade › Ativada › Desativar.', links: [{ label: 'gemini.google.com', href: 'https://gemini.google.com/' }, { label: 'Privacidade do Gemini', href: 'https://support.google.com/gemini/answer/13594961?hl=en' }, { label: 'Onde mudar', href: 'https://support.google.com/gemini/answer/13278892?hl=pt-BR' }] },
    { title: 'Copilot', text: 'A página da versão antiga do aplicativo dizia que os usuários no Brasil ficavam fora do treino; para o volume 1, em 24/09/2026, a Microsoft dizia que, na versão nova, as conversas não treinam os modelos de base. A página dos controles da versão nova não traz opção de treino.', links: [{ label: 'copilot.microsoft.com', href: 'https://copilot.microsoft.com/' }, { label: 'Perguntas sobre privacidade, versão antiga', href: 'https://support.microsoft.com/en-us/topic/privacy-faq-for-microsoft-copilot-27b3a435-8dc9-4b55-9a4b-58eeb9647a7f' }, { label: 'Histórico de atividade', href: 'https://support.microsoft.com/en-us/privacy/microsoft-copilot/activity-history' }, { label: 'Controles de privacidade', href: 'https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls' }] },
    { title: 'ChatGPT', text: 'Nos serviços para pessoas, a OpenAI diz que pode usar o conteúdo para treinar os modelos; só os planos de empresa ficam fora por padrão. Onde mudar: Settings › Data Controls › desligar Improve the model for everyone.', links: [{ label: 'chatgpt.com', href: 'https://chatgpt.com/' }, { label: 'O uso dos dados, na OpenAI', href: 'https://openai.com/policies/how-your-data-is-used-to-improve-model-performance/' }, { label: 'Data Controls', href: 'https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt' }] },
    { title: 'Meta AI', text: '"As IAs podem reter e utilizar essas informações." Os termos pedem: não compartilhe o que você não quer que as IAs usem.', links: [{ label: 'Termos das IAs da Meta', href: 'https://www.facebook.com/legal/br-ai-terms' }] },
    { title: 'Nas contas que as empresas contratam', text: 'A regra é outra. A Anthropic diz que não usa por padrão o que entra nos produtos comerciais. O Google diz o mesmo do Workspace, salvo permissão do cliente. A Microsoft, do Copilot Chat da conta corporativa. É por isso que a regra do livro manda o dado do cliente só para a ferramenta que a empresa contratou.', links: [{ label: 'Anthropic, produtos comerciais', href: 'https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training' }, { label: 'Google Workspace', href: 'https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub' }, { label: 'Microsoft Copilot Chat', href: 'https://learn.microsoft.com/en-us/copilot/privacy-and-protections' }] },
]

const PLANALTO = {
    cf: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm',
    clt: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm',
    cdc: 'https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm',
    lgpd: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm',
    vendedor: 'https://www.planalto.gov.br/ccivil_03/leis/l3207.htm',
    repouso: 'https://www.planalto.gov.br/ccivil_03/leis/l0605.htm',
    domingo: 'https://www.planalto.gov.br/ccivil_03/leis/l10101.htm',
    comerciario: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12790.htm',
    cipa: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14457.htm',
    feriado12: 'https://www.planalto.gov.br/ccivil_03/leis/l6802.htm',
    salario: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12797.htm',
    sac: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d11034.htm',
    ecommerce: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm',
    precoDecreto: 'https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/decreto/d5903.htm',
    preco: 'https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/lei/l10.962.htm',
    meioDePagamento: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13455.htm',
    moedas: 'https://www.planalto.gov.br/ccivil_03/leis/l8697.htm',
    contravencoes: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del3688.htm',
    penal: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm',
    prioridade: 'https://www.planalto.gov.br/ccivil_03/leis/l10048.htm',
    prioridade2023: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14626.htm',
    idoso: 'https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741compilado.htm',
    lbi: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm',
    autismo: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12764.htm',
    ciptea: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l13977.htm',
    fibromialgia: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15176.htm',
    anpd: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/L15352.htm',
}

const SOURCES_OF = {
    portaria1316: 'https://pesquisa.in.gov.br/imprensa/jsp/visualiza/index.jsp?data=22/07/2026&jornal=602&pagina=2&totalArquivos=2',
    nr1: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-01-atualizada-2025-i-3.pdf',
    nr17i: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-17-anexo-i-checkout-atualizado-2023.pdf',
    nr17ii: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-17-anexo-ii-teleatendimento-atualizado-2023.pdf',
    tstBook: 'https://www.tst.jus.br/documents/d/guest/livrointernet-12-pdf',
    tema65: 'https://portal.trt3.jus.br/internet/jurisprudencia/incidentes-suscitados-irr-iac-arginc-tst/downloads/tema-65-acordao-tst-rrag-0011110-03-2023-5-03-0027.pdf',
    teses21: 'https://www.tst.jus.br/en/-/publicada-a-reda%C3%A7%C3%A3o-final-das-21-novas-teses-de-recursos-repetitivos',
    rescisaoIndireta: 'https://jurisprudencia-backend2.tst.jus.br/rest/documentos/84c2e38ac9e921b56407217ca97497b3',
    cartilhaAssedio: 'https://www.tst.jus.br/documents/10157/26144164/Campanha+ass%C3%A9dio+moral+e+sexual+-+a5+-+12092022.pdf',
    metasWhatsapp: 'https://www.tst.jus.br/-/cobranca-de-metas-por-whatsapp-fora-do-expediente-extrapola-poder-do-empregador',
    diferencaCaixa: 'https://www.tst.jus.br/-/segunda-turma-desconto-de-diferenca-de-caixa-e-licito-mas-tem-limite',
    rgc: 'https://informacoes.anatel.gov.br/legislacao/resolucoes/2023/1900-resolucao-765',
    prefixo0303: 'https://www.gov.br/anatel/pt-br/regulado/numeracao/telemarketing-ativo-prefixo-0303',
    ato12712: 'https://informacoes.anatel.gov.br/legislacao/atos-de-numeracao/2140-ato-12712',
    telesintese: 'https://telesintese.com.br/anatel-mantem-autenticacao-de-chamadas-para-grandes-chamadores/',
    naoMePerturbe: 'https://www.naomeperturbe.com.br/',
    sp17832: 'https://www.al.sp.gov.br/repositorio/legislacao/lei/2023/lei-17832-01.11.2023.html',
    rn623: 'https://bvsms.saude.gov.br/bvs/saudelegis/ans/2024/res0623_19_12_2024.html',
    susep659: 'https://www2.susep.gov.br/safe/scripts/bnweb/bnmapi.exe?router=upload%2F25873',
    cnsp436: 'https://www2.susep.gov.br/safe/scripts/bnweb/bnmapi.exe?router=upload%2F25868',
    bcb223: 'https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolu%C3%A7%C3%A3o%20BCB&numero=223',
    bcbCartilha: 'https://www.bcb.gov.br/content/cedulasemoedas/cedulas_moedas_docs/material_apoio/cartilha_segunda_familia_real.pdf',
    bcb200: 'https://www.bcb.gov.br/content/cedulasemoedas/cedulas_moedas_docs/material_apoio/folder_cedula_200_reais.pdf',
    febraban3903: 'https://portal.febraban.org.br/noticia/3903/pt-br/',
    febraban4165: 'https://portal.febraban.org.br/noticia/4165/pt-br/',
    ce16685: 'https://belt.al.ce.gov.br/index.php/legislacao-do-ceara/organizacao-tematica/defesa-do-consumidor/item/6487-lei-n-16-685-de-07-12-18-d-o-10-12-18',
    sinief: 'https://www.confaz.fazenda.gov.br/legislacao/ajustes/2016/AJ_019_16',
    pl2338: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262',
    cctSp: 'https://cdn.comerciariossp.com.br/convencao/lojistas/CCT-SINDILOJAS-2025-2026.pdf',
}

const CDC = { label: 'CDC', href: PLANALTO.cdc }
const CLT = { label: 'CLT', href: PLANALTO.clt }
const TST_BOOK = { label: 'Livro de súmulas do TST (PDF)', href: SOURCES_OF.tstBook }
const NR17_II = { label: 'NR-17, Anexo II (PDF)', href: SOURCES_OF.nr17ii }
const SUSEP = { label: 'Circular SUSEP 659/2022', href: SOURCES_OF.susep659 }
const PRIORITY = { label: 'Lei 10.048/2000', href: PLANALTO.prioridade }

// o-kit.md, "Os valores e as regras que mudam": checked on 05/10/2026.
export const VALUES = [
    { title: 'Salário mínimo', text: 'R$ 1.621,00 por mês, desde 1º de janeiro de 2026 (Decreto 12.797/2025, art. 1º). São R$ 54,04 por dia e R$ 7,37 por hora. É o chão de quem ganha só comissão (CF, art. 7º, VII) e de quem ganha fixo e comissão (CLT, art. 78, parágrafo único). O decreto do ano seguinte costuma sair em dezembro. No primeiro teste do capítulo 12, nenhuma das 6 respostas sabia o valor de 2026, e uma fez a conta com o de 2025. Na rodada de confirmação, a IA errou o valor em 3 de 6.', links: [{ label: 'Decreto 12.797/2025', href: PLANALTO.salario }, { label: 'Constituição', href: PLANALTO.cf }, CLT] },
    { title: 'O piso da sua categoria', text: 'Não é o mínimo nacional: "será fixado em convenção ou acordo coletivo de trabalho" (Lei 12.790/2013, art. 4º). Muda na data-base de cada sindicato, o mês em que a convenção se renova. A convenção dos comerciários de São Paulo de 2025 a 2026, já vencida, dava piso de admissão de R$ 2.120,00. A quem ganha só comissão, dava garantia de R$ 2.536,00, com o DSR incluído, nas lojas com mais de 20 empregados. É a convenção que diz se o piso vale sobre o fixo ou sobre o total de quem ganha fixo e comissão. É um exemplo, não a sua regra.', links: [{ label: 'Lei 12.790/2013', href: PLANALTO.comerciario }, { label: 'Convenção dos comerciários de SP, 2025-2026 (PDF)', href: SOURCES_OF.cctSp }] },
    { title: 'Feriado no comércio', text: 'Desde 2007, a lei permite o trabalho em feriado no comércio "desde que autorizado em convenção coletiva" (Lei 10.101/2000, art. 6º-A). Desde 22 de julho de 2026, a Portaria MTE 1.316/2026 diz o mesmo: no comércio em geral, o trabalho em feriado "depende de autorização prevista em convenção coletiva de trabalho". Ela revogou a Portaria 3.665/2023, que vinha sendo adiada. Quinze atividades têm autorização permanente, e o varejo em geral e o supermercado não estão entre elas. Cada convenção diz se a loja abre no feriado e como paga.', links: [{ label: 'Lei 10.101/2000', href: PLANALTO.domingo }, { label: 'Portaria MTE 1.316/2026, no DOU', href: SOURCES_OF.portaria1316 }] },
    { title: 'A escala 6x1', text: 'Em 5 de outubro de 2026, a proposta de emenda à Constituição que acaba com a escala 6x1 não era lei. Segundo a Agência Brasil, ela passou na Câmara em 27 de maio de 2026 e na Comissão de Constituição e Justiça do Senado no início de setembro, e não foi votada no plenário do Senado. Se for promulgada, a jornada muda, e este kit também.' },
    { title: 'Riscos psicossociais', text: 'Desde 26 de maio de 2026, o gerenciamento de riscos da empresa inclui "os fatores de risco psicossociais relacionados ao trabalho" (NR-1, item 1.5.3.1.4).', links: [{ label: 'NR-1 (PDF)', href: SOURCES_OF.nr1 }] },
    { title: 'O Marco da IA', text: 'O PL 2.338/2023 não é lei. Aprovado no Senado, aguardava parecer na Comissão Especial da Câmara, com o último andamento em 2 de setembro de 2026. Nas leis lidas para este livro, nenhuma obriga a empresa a avisar que o cliente fala com um robô. Os termos da Meta, do Google e da OpenAI proíbem apresentar o texto da IA como escrito por uma pessoa: é contrato, não lei.', links: [{ label: 'PL 2.338/2023, na Câmara', href: SOURCES_OF.pl2338 }] },
    { title: 'O nome da ANPD', text: 'É Agência Nacional de Proteção de Dados desde a Lei 15.352/2026. Os documentos de antes trazem "Autoridade".', links: [{ label: 'Lei 15.352/2026', href: PLANALTO.anpd }] },
]

// o-kit.md, "O telefone: o 0303, a autenticação e o Não Me Perturbe".
export const PHONE = [
    { title: 'Prefixo 0303', text: 'Facultativo pelo Acórdão Anatel 201, de 14/08/2025 (publicado no DOU em 15/08/2025, segundo a Telesíntese): "a Anatel decidiu por tornar o uso do prefixo 0303 facultativo, nos termos do Acórdão nº 201, de 14 de agosto de 2025". Onde conferir: gov.br/anatel, página "Telemarketing Ativo - Prefixo 0303" (modificada em 28/08/2026).', links: [{ label: 'Anatel, prefixo 0303', href: SOURCES_OF.prefixo0303 }, { label: 'Telesíntese', href: SOURCES_OF.telesintese }] },
    { title: 'Autenticação da chamada', text: 'Obrigatória para quem origina mais de 500 mil chamadas por mês, contadas todas as linhas da empresa. Onde conferir: a mesma página da Anatel.', links: [{ label: 'Anatel, prefixo 0303', href: SOURCES_OF.prefixo0303 }] },
    { title: '0304 para cobrança', text: 'Não está no Ato Anatel 12.712/2024, o procedimento de numeração em vigor. Onde conferir: informacoes.anatel.gov.br, atos de numeração.', links: [{ label: 'Ato Anatel 12.712/2024', href: SOURCES_OF.ato12712 }] },
    { title: 'Não Me Perturbe', text: 'Só telecomunicações e bancos de crédito consignado; o bloqueio leva até 30 dias do pedido. Onde conferir: naomeperturbe.com.br.', links: [{ label: 'naomeperturbe.com.br', href: SOURCES_OF.naoMePerturbe }] },
    { title: 'Telecom e o cadastro', text: '"É vedada a realização das chamadas" a quem optou, em plataforma, por não recebê-las; em vigor desde 01/09/2025. Onde conferir: Resolução Anatel 765/2023, Anexo, art. 43, § 3º.', links: [{ label: 'Resolução Anatel 765/2023', href: SOURCES_OF.rgc }] },
    { title: 'São Paulo', text: 'Cadastro estadual de bloqueio, que inclui a cobrança; a Lei 13.226/2008 foi consolidada, com o mesmo conteúdo, na Lei 17.832/2023 (art. 211); no teste, duas respostas citaram a lei de 2008 pelo número antigo. Onde conferir: Lei paulista 17.832/2023, arts. 127 a 130.', links: [{ label: 'Lei paulista 17.832/2023', href: SOURCES_OF.sp17832 }] },
    { title: 'Arrependimento', text: '7 dias na contratação por telefone, contados da assinatura ou do recebimento; o que se pagou volta "de imediato". Onde conferir: CDC, art. 49 e parágrafo único.', links: [CDC] },
    { title: 'O script', text: 'Não pode ser exigido palavra por palavra no teleatendimento; não dispensa dizer o que a lei e a empresa mandam informar (protocolo, preço, multa, aviso de gravação). Onde conferir: NR-17, Anexo II, item 6.11, "a".', links: [NR17_II] },
]

// o-kit.md, "O SAC: os regimes".
export const REGIMES = [
    { title: 'Serviço regulado pelo governo federal, como telefonia, internet, banco, plano de saúde, energia e aviação', text: 'Decreto 11.034/2022, art. 1º. Prazo de resposta: "sete dias corridos, contado da data de seu registro" (art. 13).', links: [{ label: 'Decreto 11.034/2022', href: PLANALTO.sac }] },
    { title: 'Telecom, além do decreto', text: 'Resolução Anatel 765/2023. Reclamação resolvida em "7 (sete) dias corridos" (art. 10); atendente humano das 6h às 22h, e 24 horas no urgente (Anexo, art. 15, IV).', links: [{ label: 'Resolução Anatel 765/2023', href: SOURCES_OF.rgc }] },
    { title: 'Plano de saúde, além do decreto', text: 'Resolução Normativa ANS 623/2024, em vigor desde 01/07/2025. O pedido que não é de cobertura, como mensalidade, reajuste e contrato, em "sete dias úteis" (art. 11); o de cobertura de imediato na urgência, e nos outros casos em "até cinco dias úteis", ou "até dez dias úteis" na alta complexidade e na internação eletiva (art. 12).', links: [{ label: 'RN ANS 623/2024', href: SOURCES_OF.rn623 }] },
    { title: 'Loja on-line e aplicativo que vende pela internet', text: 'Decreto 7.962/2013. "Em até cinco dias" (art. 4º, parágrafo único); o decreto não diz se úteis ou corridos.', links: [{ label: 'Decreto 7.962/2013', href: PLANALTO.ecommerce }] },
    { title: 'Loja física, academia, oficina', text: 'Nenhum dos dois: o CDC e o contrato. Não há prazo de resposta na lei federal.', links: [CDC] },
]

// o-kit.md, "Onde o Decreto 11.034 vale, também".
export const SAC_DECREE = [
    'O decreto "não se aplica à oferta e à contratação" (art. 2º, parágrafo único): é do atendimento, não da venda.',
    'O chat é SAC tanto quanto o telefone: são "diversos canais integrados" (art. 2º).',
    '"É vedado solicitar a repetição da demanda do consumidor após o seu registro no primeiro atendimento" (art. 10).',
    '"Os efeitos do pedido de cancelamento serão imediatos, independentemente do adimplemento contratual, exceto quando for necessário o processamento técnico da demanda" (art. 14, II): a conta atrasada não segura o cancelamento.',
    'A multa da fidelidade continua, e o cliente é informado dela (art. 14, I e III); o cancelamento programado só com a anuência do cliente, isto é, se ele concordar (art. 14, V).',
    'Na retenção, você pode oferecer outra condição; não pode deixar de registrar nem adiar o cancelamento pedido.',
    'Na cobrança indevida, a suspensão é imediata (art. 13, § 3º).',
    'A gravação fica guardada por noventa dias, e o registro do atendimento por dois anos (art. 12, §§ 3º e 5º).',
    'O atendimento humano no telefone é de no mínimo oito horas por dia (art. 5º, I); o tempo máximo de espera, cada agência reguladora fixa.',
]

// o-kit.md, "A garantia estendida e o crediário".
export const WARRANTY = [
    { title: 'Opcional', text: 'A contratação "é facultativa"; a oferta traz "o termo \'opcional\'" (Resolução CNSP 436/2022, art. 4º; Circular SUSEP 659/2022, art. 6º, § 2º).', links: [{ label: 'Resolução CNSP 436/2022', href: SOURCES_OF.cnsp436 }, SUSEP] },
    { title: 'Venda casada', text: 'Proibido "condicionar a compra do bem à contratação do seguro" (Circular SUSEP 659/2022, art. 6º).', links: [SUSEP] },
    { title: 'Desconto', text: 'Proibido "condicionar a concessão de desconto no seu preço à aquisição do seguro" (Circular SUSEP 659/2022, art. 6º).', links: [SUSEP] },
    { title: 'Pagamento', text: 'Transação separada da do produto, com comprovante próprio, salvo em dinheiro; pago junto com o produto, só com termo de autorização assinado pelo cliente (Circular SUSEP 659/2022, art. 6º, § 3º, e art. 10).', links: [SUSEP] },
    { title: 'Desistir', text: '"No prazo de sete dias corridos a contar da assinatura da proposta"; pago junto com o produto, da assinatura ou do primeiro pagamento, o que vier por último (Circular SUSEP 659/2022, arts. 7º e 11).', links: [SUSEP] },
    { title: 'Devolução', text: 'O que foi pago no prazo volta em até quinze dias corridos pela seguradora, ou na hora, se pela loja (Circular SUSEP 659/2022, art. 7º, § 6º).', links: [SUSEP] },
    { title: 'Depois dos sete dias', text: 'Segue as condições gerais do seguro, não a circular. Onde: as condições gerais da seguradora.' },
    { title: 'Regra velha', text: 'A Resolução CNSP 296/2013 foi revogada (Resolução CNSP 436/2022, art. 12).', links: [{ label: 'Resolução CNSP 436/2022', href: SOURCES_OF.cnsp436 }] },
    { title: 'Total a prazo', text: 'O cliente é informado da "soma total a pagar, com e sem financiamento" (CDC, art. 52, V).', links: [CDC] },
    { title: 'Crédito e idade', text: 'Esclarecer "considerada sua idade" sobre "todos os custos incidentes" (CDC, art. 54-D, I).', links: [CDC] },
    { title: 'Pressão', text: 'Vedado "assediar ou pressionar o consumidor", "principalmente" o idoso; e ocultar os ônus (CDC, art. 54-C, III e IV).', links: [CDC] },
]

// o-kit.md, "A cola do caixa", with "O troco" and "O que é da loja".
export const CASHIER = [
    { title: '1. Preço da gôndola diferente do caixa', text: 'O cliente paga o menor (Lei 10.962/2004, art. 5º).', links: [{ label: 'Lei 10.962/2004', href: PLANALTO.preco }] },
    { title: '2. Nota suspeita', text: 'Recuse, sem constranger, e oriente o cliente a levá-la a um banco (cartilha do BCB). Quem retém é o banco (Res. BCB 223/2022, art. 2º). Se a loja manda reter, peça a ordem por escrito. Receber sem saber não é crime; passar adiante depois de saber é (CP, art. 289, § 2º).', links: [{ label: 'Resolução BCB 223/2022', href: SOURCES_OF.bcb223 }, { label: 'Código Penal', href: PLANALTO.penal }] },
    { title: '3. Nota de R$ 200', text: "Não tem faixa holográfica; tem lobo-guará e \"200\" contra a luz, o 200 muda de verde para azul, e o fio é escuro, sem o valor escrito (folder do BCB, 2020). As de 50 e de 100 têm faixa holográfica, o animal na marca-d'água (onça-pintada, garoupa) e o fio com o valor escrito (cartilha do BCB, pp. 6 a 15).", links: [{ label: 'Folder da nota de R$ 200 (PDF)', href: SOURCES_OF.bcb200 }, { label: 'Cartilha do BCB das notas (PDF)', href: SOURCES_OF.bcbCartilha }] },
    { title: '4. Moedas', text: 'Ninguém é obrigado a receber mais de 100 de um mesmo valor num pagamento (Lei 8.697/1993, art. 9º). Abaixo disso, recusar é contravenção (Decreto-Lei 3.688/1941, art. 43). Se a orientação for recusar abaixo do limite, peça-a por escrito.', links: [{ label: 'Lei 8.697/1993', href: PLANALTO.moedas }, { label: 'Lei das Contravenções Penais', href: PLANALTO.contravencoes }] },
    { title: '5. Pix', text: 'Só vale quando aparece no sistema; o comprovante no celular não é pagamento.' },
    { title: '6. Diferença no fechamento', text: 'Só se desconta do salário com cláusula combinada ou com dolo (CLT, art. 462, § 1º). Quebra de caixa vem da convenção; o PN 103 não é automático: procure "quebra de caixa" no holerite.', links: [CLT, TST_BOOK] },
    { title: '7. Nota com rabiscos, marcas ou desenhos', text: 'Perde o curso legal; vale só para depositar ou trocar no banco (Lei 8.697/1993, art. 10).', links: [{ label: 'Lei 8.697/1993', href: PLANALTO.moedas }] },
    { title: '8. Pix recebido por engano', text: 'Devolva só pelo botão de devolução do app, para a conta de origem (Febraban).', links: [{ label: 'Febraban, o Pix errado', href: SOURCES_OF.febraban4165 }] },
    { title: '9. Cheque sem fundo de cliente', text: 'Não se desconta do salário, "salvo se não cumprir as resoluções da empresa" (PN 14 do TST, onde a convenção o trouxer).', links: [TST_BOOK] },
    { title: 'O troco', text: 'Não há lei federal do troco; há leis estaduais. No Ceará, na falta de moedas, o fornecedor "deverá arredondar o valor sempre em benefício do consumidor" (Lei 16.685/2018, art. 2º). Para saber se o seu estado tem lei, pergunte ao Procon do estado ou procure no site da Assembleia Legislativa. O arredondamento sai do seu caixa, e o procedimento da loja, inclusive como ele entra no fechamento, se pede por escrito.', links: [{ label: 'Lei cearense 16.685/2018', href: SOURCES_OF.ce16685 }] },
    { title: 'O que é da loja', text: 'Chamar a fiscal, acertar a etiqueta, levar a nota ao banco, conferir o Pix: é procedimento da loja, e se pede por escrito. Os seus direitos no posto, o intervalo e os casos que viram falta estão na régua dos seus direitos, mais abaixo.' },
]

// o-kit.md, "A ordem da fila".
export const QUEUE = [
    { title: 'Quem tem prioridade', text: 'Pessoas com deficiência e com transtorno do espectro autista; pessoas de 60 anos ou mais; gestantes, lactantes e pessoas com criança de colo; obesos; pessoas com mobilidade reduzida; doadores de sangue (Lei 10.048/2000, art. 1º, na redação da Lei 14.626/2023).', links: [PRIORITY, { label: 'Lei 14.626/2023', href: PLANALTO.prioridade2023 }] },
    { title: 'Mais de 80 anos', text: 'Antes dos outros idosos: "prioridade especial aos maiores de 80 (oitenta) anos" (Estatuto da Pessoa Idosa, art. 3º, § 2º).', links: [{ label: 'Estatuto da Pessoa Idosa', href: PLANALTO.idoso }] },
    { title: 'Entre os outros grupos', text: 'A lei não cria ordem; vale a chegada (Lei 10.048/2000, art. 1º).', links: [PRIORITY] },
    { title: 'Doador de sangue', text: '"Após todos os demais beneficiados", com comprovante "com validade de 120 (cento e vinte) dias" (Lei 10.048/2000, art. 1º, § 2º).', links: [PRIORITY] },
    { title: 'Pessoa autista', text: 'Está na lista desde 2023; a Ciptea, criada em 2020 pela Lei 13.977, existe para garantir "prioridade no atendimento" (art. 3º-A), e a lei não a põe como condição: a pessoa autista "é considerada pessoa com deficiência, para todos os efeitos legais" (art. 1º, § 2º) (Lei 12.764/2012).', links: [{ label: 'Lei 12.764/2012', href: PLANALTO.autismo }, { label: 'Lei 13.977/2020', href: PLANALTO.ciptea }] },
    { title: 'Acompanhante', text: 'Atendido junto (Lei 10.048/2000, art. 1º, § 1º).', links: [PRIORITY] },
    { title: 'Sem guichê preferencial', text: '"Imediatamente após a conclusão do atendimento que estiver em andamento, antes de quaisquer outras pessoas" (Lei 10.048/2000, art. 1º, § 4º).', links: [PRIORITY] },
    { title: 'Quem a Lei 10.048 nomeia', text: 'Repartições públicas, concessionárias de serviço público e bancos (Lei 10.048/2000, art. 2º e parágrafo único).', links: [PRIORITY] },
    { title: 'A loja e a clínica', text: 'O Estatuto vale nos "órgãos públicos e privados prestadores de serviços à população"; a pessoa com deficiência tem prioridade "em todas as instituições e serviços de atendimento ao público" (Estatuto, art. 3º, § 1º, I; Lei 13.146/2015, art. 9º, II).', links: [{ label: 'Estatuto da Pessoa Idosa', href: PLANALTO.idoso }, { label: 'Lei 13.146/2015', href: PLANALTO.lbi }] },
]

// o-kit.md, "A régua dos seus direitos", in its four tables and the
// teleatendimento one.
export const RIGHTS_COMMISSION = [
    { title: 'Comissão ou prêmio', text: 'Comissão é salário; prêmio paga "desempenho superior ao ordinariamente esperado"; o contrato só muda "por mútuo consentimento", sem prejuízo (lei). Onde: CLT, arts. 457, §§ 1º e 4º, e 468.', links: [CLT] },
    { title: 'Quando é devida', text: 'Depois de "ultimada a transação", que o TST lê como o fechamento do negócio (lei; tese do TST); nas prestações, a loja pode pagar à medida que recebe as parcelas, e isso não é estorno (lei). Onde: CLT, art. 466 e § 1º; Lei 3.207/1957, art. 5º; acórdão do Tema 65.', links: [CLT, { label: 'Lei 3.207/1957', href: PLANALTO.vendedor }, { label: 'Acórdão do Tema 65 (PDF)', href: SOURCES_OF.tema65 }] },
    { title: 'Estorno', text: 'Só na "insolvência do comprador" (lei); "A inadimplência ou cancelamento da compra pelo cliente não autoriza o empregador a estornar as comissões", "ainda que haja previsão contratual em sentido contrário" (tese do TST, 24/02/2025); a insolvência "não se identifica com a mera inadimplência". Onde: Lei 3.207/1957, art. 7º; RRAg-0011110-03.2023.5.03.0027.', links: [{ label: 'Lei 3.207/1957', href: PLANALTO.vendedor }, { label: 'Acórdão do Tema 65 (PDF)', href: SOURCES_OF.tema65 }] },
    { title: 'Devolução', text: 'Vedado estornar a comissão de mercadoria devolvida (precedente normativo: só vale se a sua convenção o trouxer). Onde: TST, PN 97.', links: [TST_BOOK] },
    { title: 'Venda a prazo', text: 'As comissões "devem incidir sobre o valor total da operação, incluídos os juros e demais encargos financeiros, salvo se houver pactuação em sentido contrário" (tese do TST, 24/02/2025); venda por financeira: não conferido, pergunte ao sindicato. Onde: 21 teses de recursos repetitivos.', links: [{ label: 'As 21 teses do TST', href: SOURCES_OF.teses21 }] },
    { title: 'Extrato', text: 'A conta do mês, com as cópias das faturas dos negócios concluídos (lei). Onde: Lei 3.207/1957, art. 4º.', links: [{ label: 'Lei 3.207/1957', href: PLANALTO.vendedor }] },
    { title: 'Depois que você sai', text: 'A saída e a desistência do negócio pela empresa "não prejudicará a percepção das comissões" (lei). Onde: Lei 3.207/1957, art. 6º; CLT, art. 466, § 2º.', links: [{ label: 'Lei 3.207/1957', href: PLANALTO.vendedor }, CLT] },
    { title: 'Venda aceita', text: 'Aceita "se o empregador não a recusar por escrito, dentro de 10 (dez) dias" da proposta (lei). Onde: Lei 3.207/1957, art. 3º.', links: [{ label: 'Lei 3.207/1957', href: PLANALTO.vendedor }] },
    { title: 'Corte ou mudança da comissão', text: 'Prescrição "total" (lei; o TST aplica à comissão: OJ); o prazo geral é de cinco anos, até dois depois do fim do contrato (Constituição); é informação, e o primeiro passo é o sindicato. Onde: CLT, art. 11, § 2º; OJ 175 da SBDI-1; CF, art. 7º, XXIX.', links: [CLT, TST_BOOK, { label: 'Constituição', href: PLANALTO.cf }] },
    { title: 'DSR', text: 'Devido ao comissionista (súmula); a conta por dias úteis é prática, não lei; a convenção pode trazer a dela. Onde: Súmula 27 do TST; Lei 605/1949.', links: [TST_BOOK, { label: 'Lei 605/1949', href: PLANALTO.repouso }] },
    { title: 'Hora extra do comissionista', text: 'Sobre a comissão, só o adicional de no mínimo 50%, pelo valor-hora das comissões do mês (súmula); no misto, a parte fixa paga a hora inteira com o adicional (OJ). Onde: Súmula 340; OJ 397 da SBDI-1.', links: [TST_BOOK] },
    { title: 'Mínimo', text: 'Quem ganha só comissão nunca abaixo do mínimo (Constituição); fixo e comissão, o mínimo é garantido, "vedado qualquer desconto em mês subseqüente" (lei). Onde: CF, art. 7º, VII; CLT, art. 78, parágrafo único.', links: [{ label: 'Constituição', href: PLANALTO.cf }, CLT] },
    { title: 'Piso', text: 'Fixado na convenção da sua categoria (lei); pode ser maior que o mínimo. Onde: Lei 12.790/2013, art. 4º.', links: [{ label: 'Lei 12.790/2013', href: PLANALTO.comerciario }] },
]

export const RIGHTS_REST = [
    { title: 'Domingo no comércio', text: 'O descanso cai num domingo ao menos uma vez a cada três semanas (lei). Onde: Lei 10.101/2000, art. 6º, parágrafo único.', links: [{ label: 'Lei 10.101/2000', href: PLANALTO.domingo }] },
    { title: 'Feriado no comércio', text: 'Só com convenção coletiva (lei, desde 2007, e portaria, desde 22/07/2026). Onde: Lei 10.101/2000, art. 6º-A; Portaria MTE 1.316/2026.', links: [{ label: 'Lei 10.101/2000', href: PLANALTO.domingo }, { label: 'Portaria MTE 1.316/2026, no DOU', href: SOURCES_OF.portaria1316 }] },
    { title: 'Domingo ou feriado trabalhado', text: 'Não compensado, paga-se em dobro (súmula). Onde: Súmula 146 do TST.', links: [TST_BOOK] },
    { title: 'Folga depois do 7º dia', text: 'Dada depois do sétimo dia seguido de trabalho, paga-se em dobro (tese do TST, publicada em 22/08/2025). Onde: IRR 265, no livro de súmulas.', links: [TST_BOOK] },
]

export const RIGHTS_CASHIER = [
    { title: 'O seu posto, no checkout', text: 'Você tem direito a: auxiliar para o idoso, a gestante e a pessoa com deficiência quando pedir (4.5); banheiro a qualquer momento, avisando (5.2); nenhum prêmio pelo número de itens (5.3); nenhuma tarefa de segurança patrimonial (5.4); crachá com o nome que escolher (6.1); nenhuma fantasia ou maquiagem que constranja (6.2); treinamento de 2 horas até o 30º dia e todo ano (7.2.1). O Anexo I não fixa pausas: pausa é uma das medidas que a empresa escolhe (5.1) (NR). Onde: NR-17, Anexo I.', links: [{ label: 'NR-17, Anexo I (PDF)', href: SOURCES_OF.nr17i }] },
    { title: 'Intervalo', text: 'Uma hora acima de 6 horas; 15 minutos entre 4 e 6; o cortado se paga com 50% a mais (lei). Onde: CLT, art. 71 e § 4º.', links: [CLT] },
    { title: 'Intervalo negado sempre', text: '"O descumprimento contratual contumaz relativo à ausência do pagamento de horas extraordinárias e a não concessão do intervalo intrajornada autoriza a rescisão indireta" (tese do TST, 24/03/2025, que os juízes seguem); antes, o sindicato. Onde: RRAg-1000642-07.2023.5.02.0086.', links: [{ label: 'A tese de 24/03/2025', href: SOURCES_OF.rescisaoIndireta }] },
    { title: 'Diferença de caixa', text: 'Desconto só se "acordada" ou com "dolo" do empregado (lei). Onde: CLT, art. 462, § 1º.', links: [CLT] },
    { title: 'Quebra de caixa', text: 'Verba de convenção; 10% a quem é caixa permanente (precedente normativo, onde a convenção o trouxer); não é automática: procure no holerite. Onde: TST, PN 103.', links: [TST_BOOK] },
    { title: 'Cheque sem fundo', text: 'Não se desconta, "salvo se não cumprir as resoluções da empresa" (precedente normativo, onde a convenção o trouxer). Onde: TST, PN 14.', links: [TST_BOOK] },
    { title: 'Malote', text: 'O transporte de valores "por trabalhador não especializado configura situação de risco" e dá dano moral (tese do TST, 24/02/2025). Onde: 21 teses de recursos repetitivos.', links: [{ label: 'As 21 teses do TST', href: SOURCES_OF.teses21 }] },
    { title: 'Revista de bolsa', text: 'Só "meramente visual", "impessoal, geral, sem contato físico" e sem exposição humilhante (tese do TST, 24/02/2025). Onde: as mesmas 21 teses.', links: [{ label: 'As 21 teses do TST', href: SOURCES_OF.teses21 }] },
    { title: 'Acusação de furto', text: 'A justa causa por improbidade "infundada ou não comprovada" dá dano moral (tese do TST, 24/02/2025). Onde: as mesmas 21 teses.', links: [{ label: 'As 21 teses do TST', href: SOURCES_OF.teses21 }] },
    { title: 'Assalto no caixa', text: 'O caixa pode provar que não teve culpa "quando, por exemplo, foi vítima de um assalto": boletim de ocorrência e aviso por escrito (decisão de um caso, 2009). Onde: TST, Segunda Turma.', links: [{ label: 'TST, Segunda Turma, 2009', href: SOURCES_OF.diferencaCaixa }] },
]

export const RIGHTS_PHONE = [
    { title: 'Quem está coberto', text: 'O trabalho feito "por intermédio da voz e/ou mensagens eletrônicas", com fone e sistema ao mesmo tempo; se o atendente só de chat, sem fone, está coberto, o texto não responde com clareza: pergunte ao sindicato (NR). Item 2.1.2.' },
    { title: 'Tecnologia nova na tela', text: 'Antes, "avaliação ergonômica preliminar ou Análise Ergonômica do Trabalho", com "capacitação e adaptação"; treinamento quando mudam métodos ou equipamentos (NR; a norma não diz "IA"). Itens 4.4 e 7.2.' },
    { title: 'Gente para as pausas', text: 'O contingente "deve ser suficiente para garantir que todos possam usufruir as pausas" (NR). Item 6.2.1.' },
    { title: 'Jornada', text: '6 horas de trabalho efetivo, "nele incluídas as pausas" (NR). Item 6.3.' },
    { title: 'Pausas', text: 'Duas de 10 minutos contínuos, fora do posto, depois dos primeiros e antes dos últimos 60 minutos (NR). Item 6.4.1.' },
    { title: 'Refeição', text: '20 minutos (NR). Item 6.4.2.' },
    { title: 'Registro de pausas', text: 'As pausas são registradas, e "os trabalhadores devem ter acesso aos seus registros de pausas" (NR). Itens 6.4.4 e 6.4.4.2.' },
    { title: 'Depois do cliente agressivo', text: 'Pausa "imediatamente após operação em que tenham ocorrido ameaças, abuso verbal ou agressões", para "recuperar-se e socializar conflitos"; a norma não fixa a duração (NR). Item 6.4.5.' },
    { title: 'Banheiro', text: '"A qualquer momento da jornada", sem efeito na avaliação nem no salário (NR). Item 6.7.' },
    { title: 'Painel de tempo e fila', text: 'Não pode servir "para aceleração do trabalho" e deve estar "disponíveis para consulta pelo operador, a seu critério" (NR). Item 6.9.' },
    { title: 'Script', text: 'Proibido exigir a "observância estrita"; não dispensa dizer o protocolo, o preço, a multa e o aviso de gravação (NR). Item 6.11, "a".' },
    { title: 'Tempo que não depende de você', text: 'Vedado "imputar ao operador os períodos de tempo ou interrupções no trabalho não dependentes de sua conduta", como o sistema que cai (NR). Item 6.11, "b".' },
    { title: 'Escuta e gravação', text: '"Somente mediante o conhecimento do operador" (NR). Item 6.12.' },
    { title: 'Competição e fantasia', text: 'Vedados o "estímulo abusivo à competição" e as fantasias "com o objetivo de punição, promoção e propaganda" (NR). Item 6.13, "a" e "b".' },
    { title: 'Ranking', text: 'Vedada a "exposição pública das avaliações de desempenho dos operadores" (NR). Item 6.13, "c".' },
    { title: 'Sobrenome', text: 'O script não deve exigir que você dê o sobrenome ao cliente (NR). Item 6.16.' },
]

export const RIGHTS_QUOTA = [
    { title: 'Meta', text: '"Estimular o cumprimento de metas não é assédio moral"; a forma pode ser (orientação do TST e do Conselho Superior da Justiça do Trabalho). Onde: cartilha de 2022.', links: [{ label: 'Cartilha do TST sobre assédio (PDF)', href: SOURCES_OF.cartilhaAssedio }] },
    { title: 'Cobrança de meta pelo WhatsApp', text: 'Fora do expediente, deu dano moral a um vendedor (decisão de um caso, 2018). Onde: TST.', links: [{ label: 'TST, 2018', href: SOURCES_OF.metasWhatsapp }] },
    { title: 'Canal de denúncia', text: 'Empresas com CIPA, a comissão de prevenção de acidentes e de assédio, têm regras de conduta, canal com anonimato e treinamento a cada 12 meses (lei). Onde: Lei 14.457/2022, art. 23.', links: [{ label: 'Lei 14.457/2022', href: PLANALTO.cipa }] },
    { title: 'Riscos psicossociais', text: 'Entram no gerenciamento de riscos da empresa desde 26/05/2026 (NR). Onde: NR-1, item 1.5.3.1.4.', links: [{ label: 'NR-1 (PDF)', href: SOURCES_OF.nr1 }] },
]

// o-kit.md, "A régua das leis do cliente".
export const CUSTOMER_RULER = [
    { title: 'O que você diz', text: 'A informação "suficientemente precisa" obriga a empresa e integra o contrato (CDC, art. 30).', links: [CDC] },
    { title: 'Quem responde', text: 'A empresa "é solidariamente responsável pelos atos de seus prepostos" (CDC, art. 34).', links: [CDC] },
    { title: 'Oferta não cumprida', text: 'O cliente escolhe: exigir o prometido, aceitar outro equivalente ou desfazer a compra (CDC, art. 35).', links: [CDC] },
    { title: 'Informação', text: '"Corretas, claras, precisas, ostensivas" sobre características, preço, garantia e riscos (CDC, art. 31).', links: [CDC] },
    { title: 'Omissão', text: 'Deixar de dizer um "dado essencial" é publicidade enganosa; na oferta por telefone, vale o mesmo dever de informar do art. 31 (CDC, art. 37, § 3º, e art. 31).', links: [CDC] },
    { title: 'Pressão', text: 'Proteção contra "métodos comerciais coercitivos ou desleais" (CDC, art. 6º, IV).', links: [CDC] },
    { title: 'Idade, saúde, pouco conhecimento', text: 'Prática abusiva "prevalecer-se da fraqueza ou ignorância do consumidor" (CDC, art. 39, IV).', links: [CDC] },
    { title: 'Venda casada', text: 'Condicionar um produto a outro (CDC, art. 39, I).', links: [CDC] },
    { title: 'Garantia da lei', text: '"Independe de termo expresso" (CDC, art. 24).', links: [CDC] },
    { title: 'Garantia do fabricante', text: '"É complementar à legal"; uma não substitui a outra (CDC, art. 50).', links: [CDC] },
    { title: 'Prazo para reclamar', text: '30 dias no não durável, 90 no durável; no defeito oculto, de quando aparece (CDC, art. 26, I e II, e § 3º).', links: [CDC] },
    { title: 'Protocolo', text: 'A reclamação "comprovadamente formulada" segura o prazo até a resposta (CDC, art. 26, § 2º, I).', links: [CDC] },
    { title: 'Defeito não resolvido', text: 'Em 30 dias, o cliente escolhe outro produto, o dinheiro de volta ou o abatimento (CDC, art. 18, § 1º).', links: [CDC] },
    { title: 'Troca sem defeito na loja', text: 'Não há artigo que obrigue; vale a política da loja, e a política anunciada obriga (CDC, art. 30).', links: [CDC] },
    { title: 'Arrependimento', text: '7 dias só na compra "fora do estabelecimento comercial", como por telefone, internet, WhatsApp ou em casa; tudo volta "de imediato" (CDC, art. 49 e parágrafo único).', links: [CDC] },
    { title: 'Como desistir, na loja on-line', text: 'Informar "de forma clara e ostensiva"; pela "mesma ferramenta utilizada para a contratação"; o decreto não diz se a venda pelo WhatsApp da loja entra nele (Decreto 7.962/2013, art. 5º e § 1º).', links: [{ label: 'Decreto 7.962/2013', href: PLANALTO.ecommerce }] },
    { title: 'Preço que não bate', text: '"O consumidor pagará o menor dentre eles" (Lei 10.962/2004, art. 5º).', links: [{ label: 'Lei 10.962/2004', href: PLANALTO.preco }] },
    { title: 'Preço no Pix e no cartão', text: 'Diferente é permitido, com o desconto "em local e formato visíveis" (Lei 13.455/2017, art. 1º; Lei 10.962/2004, art. 5º-A).', links: [{ label: 'Lei 13.455/2017', href: PLANALTO.meioDePagamento }, { label: 'Lei 10.962/2004', href: PLANALTO.preco }] },
    { title: 'Orçamento a prazo', text: 'O preço se informa "discriminando-se o total à vista"; no parcelado, o total, as prestações e os juros (Decreto 5.903/2006, art. 3º e parágrafo único).', links: [{ label: 'Decreto 5.903/2006', href: PLANALTO.precoDecreto }] },
    { title: 'Cobrança', text: 'Sem ridículo, constrangimento ou ameaça; cobrou errado de quem pagou, devolve em dobro, salvo "engano justificável" (CDC, art. 42 e parágrafo único).', links: [CDC] },
    { title: 'Documento de cobrança', text: 'Nome, endereço e CPF ou CNPJ de quem cobra (CDC, art. 42-A).', links: [CDC] },
    { title: 'Cobrança como crime', text: 'Ameaça, "afirmações falsas", exposição ou o que "interfira com seu trabalho, descanso ou lazer" (CDC, art. 71).', links: [CDC] },
    { title: 'Cadastro de devedores', text: 'A informação negativa não fica por "período superior a cinco anos" (CDC, art. 43, § 1º).', links: [CDC] },
    { title: 'CPF na nota', text: 'Obrigatório só a partir de R$ 10 mil, a pedido do cliente ou na venda não presencial (Ajuste SINIEF 19/2016, cláusula quarta, VII).', links: [{ label: 'Ajuste SINIEF 19/2016', href: SOURCES_OF.sinief }] },
    { title: 'Dado de saúde', text: 'Dado pessoal sensível (LGPD, art. 5º, II).', links: [{ label: 'LGPD', href: PLANALTO.lgpd }] },
]

// o-kit.md, "Como ler uma lei, uma súmula e uma convenção".
export const READ_A_LAW = [
    { title: '1. Abra a lei pelo endereço direto', text: 'No planalto.gov.br, o site da Presidência da República onde se lê o texto das leis e dos decretos. Os outros endereços estão em "Onde ler cada regra", mais abaixo.', links: [{ label: 'CDC', href: PLANALTO.cdc }, { label: 'CLT', href: PLANALTO.clt }, { label: 'Decreto do SAC', href: PLANALTO.sac }] },
    { title: '2. Ache o artigo pela busca da página', text: 'No celular, "Localizar na página", no menu do navegador; digite "Art. 462".' },
    { title: '3. Leia as partes do artigo', text: 'O caput é o texto principal, logo depois do número. O sinal § quer dizer parágrafo: "§ 1º" é o parágrafo primeiro; quando há um só, ele se chama "parágrafo único". Os incisos são os itens em algarismos romanos, I, II, III; as alíneas, as letras a, b, c.' },
    { title: '4. Pule o riscado', text: 'O texto riscado não vale mais; vale o que vem sem risco.' },
    { title: '5. Veja de quando vale', text: 'Uma regra pode estar escrita e só valer depois: a Resolução Anatel 765/2023, por exemplo, só passou a valer em 1º de setembro de 2025.' },
    { title: 'A NR', text: 'A norma regulamentadora do Ministério do Trabalho se lê do mesmo jeito, por itens: "6.4.1" é o item da pausa no Anexo II da NR-17.' },
    { title: 'Os tipos de regra', text: 'Nem toda regra pesa igual. A lei e a NR valem para todos. A súmula e a orientação jurisprudencial, a OJ, mostram como o Tribunal Superior do Trabalho, o TST, decide. A tese de recurso repetitivo, fixada pelo TST com todos os ministros reunidos, é regra que os juízes do trabalho têm de seguir. O precedente normativo, o PN, é uma regra que o TST usa quando julga a briga de uma categoria inteira; só vale se a sua convenção o trouxer. A notícia de um processo é a decisão de um caso, um exemplo, não regra. As súmulas, as OJs e os PNs estão no livro que o TST publica e atualiza; procure a palavra "cancelada" ao lado do número.', links: [TST_BOOK] },
    { title: 'A convenção coletiva', text: 'É a outra lei de quem atende e vende, e a IA não a conhece. Peça a da sua categoria ao sindicato da sua base, a sua cidade. Veja primeiro a vigência: ela vale de uma data-base à outra, e a do ano passado pode estar vencida. Depois procure as palavras que mexem no seu mês: piso, comissionista, garantia, repouso, quebra de caixa, diferença, intervalo, feriado, domingo. O pedido do capítulo 5 acha as cláusulas e copia o texto exato; confira cada cópia na convenção. Se a cláusula disser outra coisa que a régua dos seus direitos, a dúvida vai ao sindicato.' },
]

// o-kit.md, "Onde ler cada regra": [norm, address as the book prints it,
// link, read on]. The links are the bibliography's URLs for the same pages.
const ADDRESS_ROWS = [
    ['Constituição', 'planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm', PLANALTO.cf, '5/10 e 9/10'],
    ['CLT', 'planalto.gov.br/ccivil_03/decreto-lei/del5452.htm', PLANALTO.clt, '5/10 e 9/10'],
    ['CDC', 'planalto.gov.br/ccivil_03/leis/l8078compilado.htm', PLANALTO.cdc, '5/10'],
    ['LGPD', 'planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm', PLANALTO.lgpd, '5/10'],
    ['Lei 3.207/1957, do vendedor', 'planalto.gov.br/ccivil_03/leis/l3207.htm', PLANALTO.vendedor, '5/10 e 9/10'],
    ['Lei 605/1949, do repouso', 'planalto.gov.br/ccivil_03/leis/l0605.htm', PLANALTO.repouso, '5/10'],
    ['Lei 10.101/2000, domingo e feriado', 'planalto.gov.br/ccivil_03/leis/l10101.htm', PLANALTO.domingo, '5/10'],
    ['Lei 12.790/2013, do comerciário', 'planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12790.htm', PLANALTO.comerciario, '5/10'],
    ['Lei 14.457/2022, CIPA e assédio', 'planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14457.htm', PLANALTO.cipa, '5/10'],
    ['Lei 6.802/1980, feriado de 12 de outubro', 'planalto.gov.br/ccivil_03/leis/l6802.htm', PLANALTO.feriado12, '9/10'],
    ['Decreto 12.797/2025, salário mínimo', 'planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12797.htm', PLANALTO.salario, '5/10'],
    ['Portaria MTE 1.316/2026, feriado no comércio', 'pesquisa.in.gov.br (Diário Oficial da União de 22/07/2026, seção 1)', SOURCES_OF.portaria1316, '5/10'],
    ['NR-1', 'gov.br/trabalho-e-emprego, normas regulamentadoras vigentes, "nr-01-atualizada-2025"', SOURCES_OF.nr1, '5/10'],
    ['NR-17, Anexo I, checkout', 'gov.br/trabalho-e-emprego, normas regulamentadoras vigentes, "nr-17-anexo-i-checkout-atualizado-2023"', SOURCES_OF.nr17i, '5/10 e 9/10'],
    ['NR-17, Anexo II, teleatendimento', 'gov.br/trabalho-e-emprego, normas regulamentadoras vigentes, "nr-17-anexo-ii-teleatendimento-atualizado-2023"', SOURCES_OF.nr17ii, '5/10 e 9/10'],
    ['Súmulas, OJs, PNs e o IRR 265 do TST', 'tst.jus.br/documents/d/guest/livrointernet-12-pdf', SOURCES_OF.tstBook, '5/10 e 9/10'],
    ['Acórdão do Tema 65, estorno', 'portal.trt3.jus.br/internet/jurisprudencia/incidentes-suscitados-irr-iac-arginc-tst/downloads/tema-65-acordao-tst-rrag-0011110-03-2023-5-03-0027.pdf', SOURCES_OF.tema65, '5/10'],
    ['As 21 teses de 24/02/2025', 'tst.jus.br/en/-/publicada-a-reda%C3%A7%C3%A3o-final-das-21-novas-teses-de-recursos-repetitivos', SOURCES_OF.teses21, '5/10 e 9/10'],
    ['Tese de 24/03/2025, rescisão indireta', 'jurisprudencia-backend2.tst.jus.br/rest/documentos/84c2e38ac9e921b56407217ca97497b3', SOURCES_OF.rescisaoIndireta, '9/10'],
    ['Cartilha do TST sobre assédio', 'tst.jus.br/documents/10157/26144164/Campanha+ass%C3%A9dio+moral+e+sexual+-+a5+-+12092022.pdf', SOURCES_OF.cartilhaAssedio, '5/10'],
    ['Decreto 11.034/2022, do SAC', 'planalto.gov.br/ccivil_03/_ato2019-2022/2022/decreto/d11034.htm', PLANALTO.sac, '5/10 e 9/10'],
    ['Decreto 7.962/2013, comércio eletrônico', 'planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm', PLANALTO.ecommerce, '5/10'],
    ['Decreto 5.903/2006, preço', 'planalto.gov.br/ccivil_03/_ato2004-2006/2006/decreto/d5903.htm', PLANALTO.precoDecreto, '5/10'],
    ['Resolução Anatel 765/2023', 'informacoes.anatel.gov.br/legislacao/resolucoes/2023/1900-resolucao-765', SOURCES_OF.rgc, '5/10'],
    ['Prefixo 0303', 'gov.br/anatel/pt-br/regulado/numeracao/telemarketing-ativo-prefixo-0303', SOURCES_OF.prefixo0303, '5/10'],
    ['Ato Anatel 12.712/2024', 'informacoes.anatel.gov.br/legislacao/atos-de-numeracao/2140-ato-12712', SOURCES_OF.ato12712, '5/10'],
    ['Não Me Perturbe', 'naomeperturbe.com.br', SOURCES_OF.naoMePerturbe, '5/10'],
    ['Lei paulista 17.832/2023', 'al.sp.gov.br/repositorio/legislacao/lei/2023/lei-17832-01.11.2023.html', SOURCES_OF.sp17832, '5/10'],
    ['RN ANS 623/2024', 'bvsms.saude.gov.br/bvs/saudelegis/ans/2024/res0623_19_12_2024.html', SOURCES_OF.rn623, '5/10 e 9/10'],
    ['Circular SUSEP 659/2022', 'www2.susep.gov.br/safe/scripts/bnweb/bnmapi.exe?router=upload%2F25873', SOURCES_OF.susep659, '5/10 e 9/10'],
    ['Resolução CNSP 436/2022', 'www2.susep.gov.br/safe/scripts/bnweb/bnmapi.exe?router=upload%2F25868', SOURCES_OF.cnsp436, '5/10'],
    ['Lei 10.962/2004, preço', 'planalto.gov.br/ccivil_03/_ato2004-2006/2004/lei/l10.962.htm', PLANALTO.preco, '5/10'],
    ['Lei 13.455/2017, preço por meio de pagamento', 'planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13455.htm', PLANALTO.meioDePagamento, '5/10'],
    ['Lei 8.697/1993, moedas e notas', 'planalto.gov.br/ccivil_03/leis/l8697.htm', PLANALTO.moedas, '5/10 e 9/10'],
    ['Lei das Contravenções Penais', 'planalto.gov.br/ccivil_03/decreto-lei/del3688.htm', PLANALTO.contravencoes, '5/10'],
    ['Código Penal', 'planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm', PLANALTO.penal, '5/10'],
    ['Resolução BCB 223/2022', 'bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Resolução BCB&numero=223', SOURCES_OF.bcb223, '5/10'],
    ['Cartilha do BCB das notas', 'bcb.gov.br/content/cedulasemoedas/cedulas_moedas_docs/material_apoio/cartilha_segunda_familia_real.pdf', SOURCES_OF.bcbCartilha, '5/10 e 9/10'],
    ['Folder da nota de R$ 200', 'bcb.gov.br/content/cedulasemoedas/cedulas_moedas_docs/material_apoio/folder_cedula_200_reais.pdf', SOURCES_OF.bcb200, '5/10'],
    ['Lei cearense 16.685/2018, troco', 'belt.al.ce.gov.br, legislação do Ceará, defesa do consumidor, Lei 16.685', SOURCES_OF.ce16685, '5/10'],
    ['Lei 10.048/2000, prioridade', 'planalto.gov.br/ccivil_03/leis/l10048.htm', PLANALTO.prioridade, '5/10 e 9/10'],
    ['Lei 14.626/2023', 'planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14626.htm', PLANALTO.prioridade2023, '5/10'],
    ['Estatuto da Pessoa Idosa', 'planalto.gov.br/ccivil_03/leis/2003/l10.741compilado.htm', PLANALTO.idoso, '5/10'],
    ['Lei Brasileira de Inclusão', 'planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm', PLANALTO.lbi, '5/10'],
    ['Lei 12.764/2012, autismo', 'planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12764.htm', PLANALTO.autismo, '5/10 e 9/10'],
    ['Lei 13.977/2020, Ciptea', 'planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l13977.htm', PLANALTO.ciptea, '5/10'],
    ['Lei 15.176/2025, fibromialgia', 'planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15176.htm', PLANALTO.fibromialgia, '5/10'],
    ['Ajuste SINIEF 19/2016, CPF na nota', 'confaz.fazenda.gov.br/legislacao/ajustes/2016/AJ_019_16', SOURCES_OF.sinief, '5/10'],
    ['Lei 15.352/2026, ANPD', 'planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/L15352.htm', PLANALTO.anpd, '5/10'],
    ['PL 2.338/2023, Marco da IA', 'camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262', SOURCES_OF.pl2338, '5/10'],
]

export const ADDRESSES = [
    ...ADDRESS_ROWS.map(([title, address, href, readOn]) => ({ title, text: `Lida em ${readOn}.`, links: [{ label: address, href }] })),
    // Two Febraban pages in one row of the book.
    { title: 'Febraban, Pix', text: 'Lida em 4/10.', links: [{ label: 'portal.febraban.org.br/noticia/3903/pt-br', href: SOURCES_OF.febraban3903 }, { label: 'portal.febraban.org.br/noticia/4165/pt-br', href: SOURCES_OF.febraban4165 }] },
]

// o-kit.md, "Onde conferir o que a IA não sabe".
export const SOURCES = [
    { title: 'A regra do ano', text: 'Nas tabelas deste kit, com a data, e no endereço de cada uma; pergunte "Isso vale para que ano?".', links: [] },
    { title: 'A regra da sua empresa', text: 'O decreto do SAC, o Não Me Perturbe e os anexos da NR-17 não valem para todo mundo; pergunte "Isso vale para a minha empresa?".', links: [] },
    { title: 'A sua alçada, a política de troca e o procedimento do caixa', text: 'Por escrito, com o gerente ou a fiscal (capítulos 3 e 5).', links: [] },
    { title: 'O produto', text: 'Na ficha técnica, no manual e no termo de garantia (capítulo 1).', links: [] },
    { title: 'O pagamento', text: 'No sistema da loja, nunca no comprovante nem na resposta da IA (capítulo 5).', links: [] },
    { title: 'A conta', text: 'Na calculadora do celular: o desconto (capítulo 3), o total a prazo (capítulo 4), o troco (capítulo 5), as parcelas (capítulo 10), a comissão e o DSR (capítulo 12).', links: [] },
    { title: 'A sua convenção', text: 'No sindicato da sua categoria.', links: [] },
    { title: 'O caso de verdade', text: 'O sindicato, um advogado ou a Defensoria, no seu direito; o Procon, no do cliente.', links: [] },
]

export const UPDATES = [
    { date: '10/10/2026', text: 'O kit online acompanha o livro, com os pedidos testados em 6 de outubro de 2026 e os da revisão, em 9 de outubro, os modelos, os materiais de partida, as tabelas, as réguas e o caderno. Regras conferidas em 5 de outubro de 2026, e as linhas novas em 9 de outubro.' },
]

// ─── The kit as one object, for pages/BookKit.jsx ─────────────────────────
//
// The same shape as data/kit-ia-no-pequeno-negocio.js: the parts every kit
// has and `bands`, the sections only this book has, in order, between the
// templates and the exercises. Icons are named, and must be in ICONS of
// BookKit. The bands alternate gray and white, starting gray after the
// templates (white) and ending white before the exercises (gray): `alternate`
// sets them, and the count is even.

const steps = (items, icons) => items.map((item, index) => ({ ...item, icon: icons[index] }))
const criteria = items => items.map(item => ({ criterion: item.title, value: item.text, ...(item.links?.length ? { links: item.links } : {}) }))
const alternate = bands => bands.map((band, index) => ({ ...band, background: index % 2 === 0 ? 'gray' : 'white' }))

export default {
    slug: 'ia-no-atendimento-e-nas-vendas',
    // The localStorage prefix of this kit: changing it later would lose what
    // readers typed.
    storage: 'kit-atd',
    testedOn: '6 e 9 de outubro de 2026',
    workAI: 'ferramenta que a empresa contratou, quando tem dado de cliente; na IA aberta, vai a tarefa, não o cliente',
    // A stand-in for the catalogue entry, used only in development when the
    // catalogue does not answer.
    preview: { title: 'IA no atendimento e nas vendas', subtitle: 'Para vendedores, caixas, recepcionistas e operadores de telemarketing', volume: 6, kit: { label: 'Kit online' } },
    testedNote: 'Conversas com uma mesma IA, numa configuração neutra, em 6 de outubro de 2026; os pedidos que mudaram na revisão do livro, em 9 de outubro. Cada conversa começou do zero, sem memória, sem configurações, sem ferramentas e sem pesquisa na internet, e o programa passava à IA a data do dia. Os pedidos foram testados numa IA; em outra, a resposta muda, e a conferência é a mesma. No seu aplicativo, com a memória e as configurações dele, a resposta também pode sair diferente.',
    KIT,
    RULES,
    TASKS,
    TEMPLATES,
    EXERCISES,
    SOURCES,
    UPDATES,
    bands: alternate([
        {
            // o-kit.md of the book up to 1.0.0, "Como usar este kit" and "A regra vai no seu pedido":
            // the method lines that left the book in 1.1.0 (12/10/2026) and live here now.
            type: 'criteria',
            id: 'como-usar',
            subtitle: 'Como usar este kit',
            title: 'Os colchetes, os dois pedidos e a regra no pedido',
            description: 'O que o livro chama de "Como usar este kit". Um pedido já preenchido, do jeito que fica na tela, está em Modelos: "Um pedido preenchido", do capítulo 2.',
            items: [
                { criterion: 'Os dois tipos de colchete', value: 'O colchete que descreve material, como [a tabela da loja] ou [o produto], você troca pelo seu. Os colchetes [confirmar], [confirmar: ...], [pendente], [gerente], [conferir] e [perguntar ao gerente: ...] você copia como estão. É onde a IA marca o que não sabe, em vez de inventar. Cada um que voltar na resposta é uma pergunta para você resolver antes de o texto ir ao cliente. Se você dita o pedido pelo microfone, olhe a tela antes de mandar: esses colchetes têm de estar escritos.' },
                { criterion: 'Antes do turno', value: 'Salve no bloco de notas do celular o pedido do seu posto e a linha da regra da sua operação, tirada das tabelas deste kit, prontos para colar. Antes de colar qualquer material, tire o que as Dez coisas que nunca se cola numa IA no atendimento mandam tirar.' },
                { criterion: 'O pedido de primeira e o pedido do capítulo', value: 'O pedido de primeira é o que se faz sem pensar, como "Faz um roteiro firme pra eu cobrar esse cliente por telefone". O pedido do capítulo é o mesmo com uma ou duas frases a mais: o que usar, o que não inventar, o que marcar. Cada teste rodou os dois, três vezes cada, e as contagens deste kit comparam um com o outro. Os pedidos deste kit são os do capítulo, palavra por palavra como foram testados em 6 de outubro de 2026, e os que mudaram na revisão do livro, testados em 9 de outubro. Onde um acréscimo não foi testado, o kit diz.' },
                { criterion: 'Como foram testados', value: 'Em configuração neutra: cada conversa começou do zero, sem memória, sem configurações, sem ferramentas e sem pesquisa na internet. A única instrução de fundo foi uma frase: "Você é um assistente prestativo." Neutra não quer dizer anônima: o programa passava à IA a data do dia.' },
                { criterion: 'Conferir', value: 'É refazer ou checar fora da IA, com a fonte ou a conta à vista: a ficha técnica, a etiqueta, o sistema, a calculadora, o texto da lei, a convenção.' },
                { criterion: 'A regra vai no seu pedido', value: 'É a lição que atravessa o livro. Quando o pedido mandou a IA dizer "a lei e o artigo", a resposta piorou: 9 citações erradas na conta da comissão, contra 0 sem essa frase. Na mensagem sobre a pausa, "diga a norma e o item" pôs nas 3 mensagens uma regra de pausa que a NR-17 não tem. No seguro, "diga onde está escrito" trouxe a fonte errada em 2 de 3. No telemarketing, "diga a norma" trouxe o aviso de que a regra podia ter mudado, e também norma inventada. O que funciona é o contrário: você tira a regra e a fonte deste kit, onde estão com a data, e escreve as duas dentro do pedido.' },
                { criterion: 'Ponha o número', value: 'O SAC mostra a segunda metade da lição. Perguntar em que regime cada empresa está melhorou a resposta: com essa pergunta no pedido, as 10 empresas saíram no regime certo nas 3 respostas, 30 de 30. O número ainda errou: o prazo certo saiu em 5 de 15, e chegou a 15 de 15 quando a linha do prazo entrou no pedido. A resposta sobre regra passa ainda por duas perguntas: "Isso vale para que ano?" e "Isso vale para a minha empresa?". A primeira traz a dúvida, não a resposta: no teste do 0303, ela fez a IA avisar que a regra podia ter mudado, sem corrigi-la.' },
            ],
        },
        {
            type: 'criteria',
            id: 'dez',
            subtitle: 'Antes de colar',
            title: 'As dez coisas que nunca se colam',
            description: 'Elas não vão para a IA aberta, a que você usa com uma conta sua, gratuita ou paga. O dado do cliente não é seu: é dele, e quem responde por ele é a empresa. Por isso a regra do livro é curta: dado do cliente só na ferramenta que a empresa contratou, nunca na sua conta pessoal. Vai a tarefa, não o cliente.',
            items: TEN_THINGS.map((thing, index) => ({ criterion: `${index + 1}. ${thing.title}`, value: thing.text })),
        },
        {
            type: 'callout',
            id: 'pode-ir',
            subtitle: 'O que pode ir',
            title: 'Quase tudo o que o livro mostrou foi feito sem nenhuma das dez',
            cardLabel: 'Pode ir para a IA aberta',
            items: CAN_GO.map(text => ({ lead: '', text })),
            footnote: { lead: 'Anexar é colar tudo.', text: 'Uma foto da tela do sistema, um PDF ou um print levam para a conversa o documento inteiro, com o que você não viu: o CPF no canto, o telefone, a observação da ficha. Anexe só o que você colaria linha por linha. Troque os dados antes de colar: se você pede para a IA esquecer um nome, ele já foi.' },
        },
        {
            type: 'steps',
            id: 'se-ja-colou',
            subtitle: 'Se já colou',
            title: 'Sem alarme, em cinco passos',
            items: steps(IF_PASTED, ['IconTrash', 'IconShieldCheck', 'IconAlertTriangle', 'IconBuildingStore', 'IconCheck']),
        },
        {
            type: 'criteria',
            id: 'qual-ia',
            subtitle: 'Qual IA usar',
            title: 'IA aberta, IA da empresa e atendente automático',
            description: 'O livro usa três nomes, sempre os mesmos. Os testes foram feitos com o modelo de uma delas, o Claude Sonnet 4.6, num programa da Anthropic para programadores; em outra IA, a resposta muda, e a conferência é a mesma.',
            items: criteria(WHICH_AI),
        },
        {
            type: 'criteria',
            id: 'treino',
            subtitle: 'As IAs e as configurações',
            title: 'O treino com as suas conversas, na conta pessoal',
            description: 'Numa conta pessoal, o que você escreve pode ser usado para treinar a IA, e pagar o plano individual não garante o contrário. O que cada empresa dizia, nas páginas lidas entre 24 de setembro e 6 de outubro de 2026.',
            items: criteria(TRAINING),
            note: 'As páginas da OpenAI não abriram direto no dia da leitura. Foram lidas em cópias guardadas pelo Internet Archive, o arquivo público de páginas da internet, de 25 de setembro e 2 de outubro de 2026. Algumas páginas estão em inglês; no aplicativo em português, os nomes aparecem traduzidos. Antes de mudar uma configuração, confira de novo na página de ajuda: os nomes e os caminhos mudam de um mês para outro. A memória, a conversa temporária e o histórico de cada uma estão no kit do volume 1, IA no dia a dia.',
        },
        {
            type: 'criteria',
            id: 'valores',
            subtitle: 'O que muda',
            title: 'Os valores e as regras que mudam',
            description: 'Conferidos em 5 de outubro de 2026. Antes de usar, confira de novo.',
            items: criteria(VALUES),
        },
        {
            type: 'criteria',
            id: 'telefone',
            subtitle: 'Para o capítulo 7',
            title: 'O telefone: o 0303, a autenticação e o Não Me Perturbe',
            description: 'Conferido em 5 de outubro de 2026. No teste de 6 de outubro, a IA disse nas 6 respostas que o telemarketing tem de ligar do 0303, e não era mais assim. Deu norma errada ou inventada em 4: a Resolução 689/2018, o RGC de 2014 (Res. 632, revogada) e uma "Resolução 738/2020" com duas datas. Na revisão, sem a regra no pedido, inventou ainda um "Ato 7.523/2020".',
            items: criteria(PHONE),
            note: 'Nos outros estados, pergunte ao Procon se há cadastro estadual. A pergunta irmã é "Isso vale para a minha empresa?": o Não Me Perturbe não vale para a loja nem para a seguradora.',
        },
        {
            type: 'criteria',
            id: 'regimes',
            subtitle: 'Para o capítulo 8',
            title: 'O SAC: os regimes',
            description: 'Conferido em 5 de outubro de 2026, e as linhas do plano de saúde e da telecom em 9 de outubro. O SAC é o serviço de atendimento ao consumidor, por telefone ou por chat. A primeira pergunta é em qual regime a empresa está; depois, o prazo.',
            items: criteria(REGIMES),
            note: 'Cada agência reguladora pode fixar prazo para o seu setor (Decreto 11.034, art. 13, § 4º): na central, vale o do setor do cliente da carteira. As normas da energia e dos bancos não foram conferidas para este livro.',
        },
        {
            type: 'callout',
            id: 'decreto-do-sac',
            subtitle: 'Onde o Decreto 11.034 vale',
            title: 'O que mais o decreto do SAC diz',
            cardLabel: 'Decreto 11.034/2022',
            items: SAC_DECREE.map(text => ({ lead: '', text })),
            footnote: { lead: 'Isso vale para a minha empresa?', text: 'Se a empresa não está no decreto, a regra do cancelamento é o contrato. Na telecom, a rescisão feita com o atendente tem "efeitos imediatos" (Resolução Anatel 765/2023, art. 83). O decreto antigo do SAC, o 6.523/2008, foi revogado pelo 11.034.' },
        },
        {
            type: 'criteria',
            id: 'garantia',
            subtitle: 'Para o capítulo 4',
            title: 'A garantia estendida e o crediário',
            description: 'Conferido em 5 de outubro de 2026, e as linhas do pagamento e da desistência em 9 de outubro. A garantia estendida é seguro, e as regras de balcão estão numa circular da SUSEP, a superintendência que fiscaliza os seguros, em vigor desde 1º de maio de 2022.',
            items: criteria(WARRANTY),
            note: 'O art. 49 do CDC, que uma resposta do teste citou para os sete dias do seguro, é da compra feita fora da loja. Se a cliente desiste do seguro, o que acontece com a comissão desse serviço a pesquisa deste livro não conferiu: pergunte ao sindicato.',
        },
        {
            type: 'criteria',
            id: 'cola',
            subtitle: 'Para o capítulo 5',
            title: 'A cola do caixa',
            description: 'Conferida em 5 de outubro de 2026, e as linhas novas em 9 de outubro. Nove regras, uma por item; a versão para copiar num papel do tamanho do caixa está em Modelos.',
            items: criteria(CASHIER),
            note: 'A cartilha do Banco Central é de 2019 e cita normas que já foram revogadas; a regra de hoje é a Resolução 223. E ela diz que repassar é crime "mesmo quando a pessoa a tenha recebido sem perceber"; o crime, pelo Código Penal, é repassar depois de saber. O exercício do capítulo 5, feito na revisão, mostrou a IA dando à R$ 200 um fio com o valor escrito: a regra 3 corrige.',
        },
        {
            type: 'criteria',
            id: 'fila',
            subtitle: 'Para o capítulo 6',
            title: 'A ordem da fila',
            description: 'Conferida em 5 de outubro de 2026, e relida em 9 de outubro.',
            items: criteria(QUEUE),
            note: 'A ordem da Lei 10.048 serve de referência para a loja e a clínica, que ela não nomeia. A fibromialgia dá prioridade só a quem foi avaliado e equiparado à pessoa com deficiência (Lei 15.176/2025, em vigor desde janeiro de 2026); a prioridade vem da Lei Brasileira de Inclusão, a LBI. Muitos estados e cidades têm lei própria de fila, e a sua empresa tem a sua regra: peça-a por escrito, com esta tabela ao lado.',
        },
        {
            type: 'criteria',
            id: 'direitos',
            subtitle: 'A régua dos seus direitos',
            title: 'A comissão e o mês',
            description: 'O que a lei, a NR, o TST e a convenção dizem do seu mês. Conferida em 5 de outubro de 2026, nos textos oficiais, e as linhas novas em 9 de outubro, nas cópias guardadas para este livro. Cada linha diz de que tipo é a regra, porque o peso é diferente (veja os tipos de regra, em "Como ler uma lei").',
            items: criteria(RIGHTS_COMMISSION),
            note: 'Se o seu variável se chama prêmio, de serviços ou de retenção, a regra está no regulamento da empresa e na convenção. Pergunte ao sindicato se é prêmio ou comissão, e se a taxa pode cair sem a meta.',
        },
        {
            type: 'criteria',
            id: 'descanso',
            subtitle: 'A régua dos seus direitos',
            title: 'O descanso',
            items: criteria(RIGHTS_REST),
            note: 'Quem folga noutro dia que não o domingo conta o DSR de outro jeito: a convenção diz como, e a dúvida vai ao sindicato.',
        },
        {
            type: 'criteria',
            id: 'direitos-do-caixa',
            subtitle: 'A régua dos seus direitos',
            title: 'O caixa',
            items: criteria(RIGHTS_CASHIER),
            note: 'O Anexo I vale para o comércio que usa "autosserviço e checkout", como o supermercado. Conferir o caixa na sua presença é pedido, não direito escrito na lei; vira direito se a sua convenção trouxer a regra.',
        },
        {
            type: 'criteria',
            id: 'teleatendimento',
            subtitle: 'A régua dos seus direitos',
            title: 'O teleatendimento, pela NR-17, Anexo II',
            description: 'É a lista inteira dos itens que o livro usa; o capítulo 7 traz os que respondem à cena do Wagner. Os itens são os do Anexo II da NR-17.',
            items: criteria(RIGHTS_PHONE).map(item => ({ ...item, links: [NR17_II] })),
            note: 'As 6 horas do teleatendimento vêm da NR-17, Anexo II, e não do art. 227 da CLT, que é da telefonista. A pausa de 10 minutos a cada 50 não é regra geral: quando existe, vem de norma coletiva ou interna. Se o painel do salão mostra o ranking com nomes, anote o que aparece e desde quando, sem foto de tela com dado de cliente, e leve por escrito à supervisão, à CIPA ou ao canal de denúncia. Num caso, o TST mandou indenizar um atendente chamado de "ofensor" num ranking por cores.',
        },
        {
            type: 'criteria',
            id: 'meta',
            subtitle: 'A régua dos seus direitos',
            title: 'Meta e assédio',
            items: criteria(RIGHTS_QUOTA),
        },
        {
            type: 'criteria',
            id: 'leis',
            subtitle: 'A régua das leis do cliente',
            title: 'O que o CDC e as leis do balcão dizem nas tarefas do livro',
            description: 'Conferida em 5 de outubro de 2026. A régua do volume 5, IA no pequeno negócio, tem o resto, do lado de quem escreve a política: o sinal, o orçamento, o cadastro de devedores.',
            items: criteria(CUSTOMER_RULER),
            note: 'O CDC não traz horário de cobrança, e o art. 71 não diz "é proibido ligar no trabalho" nem o contrário: ele pune a cobrança que interfere. Num caso de verdade que a régua não resolve, a dúvida vai ao Procon ou a um advogado.',
        },
        {
            type: 'criteria',
            id: 'ler-lei',
            subtitle: 'Quando a IA, o capítulo ou o kit cita uma regra',
            title: 'Como ler uma lei, uma súmula e uma convenção',
            description: 'Não é preciso ler a lei toda: procure o artigo que a IA, o capítulo ou o kit citou.',
            items: criteria(READ_A_LAW),
        },
        {
            type: 'criteria',
            id: 'enderecos',
            subtitle: 'Onde ler cada regra',
            title: 'O endereço de cada norma deste kit, como foi lido',
            description: 'Os textos foram lidos em 5 de outubro de 2026; os marcados com 9/10 foram relidos em 9 de outubro de 2026, nas cópias guardadas para este livro. Página que mudar de endereço se acha pelo nome da norma no site do órgão.',
            items: criteria(ADDRESSES),
        },
    ]),
}
