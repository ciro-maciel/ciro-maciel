/**
 * The online kit of "IA no pequeno negócio" (volume 5), as data. The page is
 * pages/BookKit.jsx, at /books/ia-no-pequeno-negocio/kit.
 *
 * Written on 04/10/2026 from the 0.9.0 book and checked on 10/10/2026 against
 * the 1.0.0 book (approved by the author): chapters/o-kit.md (what the kit
 * holds, the tested prompts with [fields], the material of each "Faça agora",
 * the 2026 values of the MEI, 2026 and from 2027, the official addresses, "Como
 * ler uma lei", the customer's laws in one ruler and the LGPD checklist), each
 * chapter's "Confira", "Faça agora" and privacy box, chapters/introducao.md and
 * chapters/dez-coisas-que-nunca-se-cola.md.
 *
 * Every prompt is the tested form of o-kit.md, "Os pedidos deste livro", word
 * for word, with the material and the test context in {fields}. The brackets
 * the AI must use in its answer ([confirmar: ...], [preencher: ...],
 * [conferir], [negócio], [casa], [não sei]) stay as they are, as the book says.
 * The tested follow-ups (the discount, chapter 4; the question of the law,
 * chapters 9 and 11) are a second message in the same conversation, not a line
 * added to the first: `add` would paste them together and is labelled "not
 * tested", so they are text templates, each saying it goes in the same
 * conversation. Each `result` is the count o-kit.md gives.
 *
 * Templates: only what the chapters promise for the kit (o-kit.md, "O que está
 * no kit online", and the introduction), with the book's own text; the ones the
 * book marks as not tested say so. The spreadsheets exist only here, as the
 * book says.
 *
 * The 2026 values are o-kit.md's, read on the official pages on 04/10/2026.
 * The training settings are volume 1's, checked on 24/09/2026, as o-kit.md
 * repeats them.
 *
 * The book is launching (10/10/2026). With the book in data/books.json, the
 * catalogue entry drives this kit; `preview` below only stands in for it in
 * development, while the entry is missing.
 */

export const TASKS = [
    { id: "whatsapp", chap: "Capítulo 1", name: "Responder no WhatsApp",
      tpl: "Tenho {negocio} e vendo pelo WhatsApp. Me ajuda a responder essas clientes? Escreva a resposta para cada mensagem. Use só as informações da loja abaixo: não prometa preço, prazo, desconto, estoque ou condição que não esteja nelas. Onde faltar informação, escreva [confirmar: ...] em vez de inventar.\n\n{ficha}\n\n{mensagens}",
      fields: [
        { k: "negocio", label: "O seu negócio", ph: "uma loja de roupas", hint: "O tipo basta, como no teste." },
        { k: "ficha", label: "A ficha da loja", ph: "a ficha da loja", area: true, hint: "Os preços de hoje, os tamanhos, o que acabou, o pagamento, a entrega, a troca, o que a loja não faz e o que você não sabe. O modelo está em Modelos." },
        { k: "mensagens", label: "As mensagens", ph: "as mensagens, só com o primeiro nome das clientes", area: true, hint: "Sem sobrenome e sem telefone." }
      ],
      checks: ["Cada preço e cada conta contra a ficha", "Todo prazo, desconto, estoque ou condição que não está na ficha", "Se sobrou algum [confirmar] no texto que vai para a cliente: ele é um bilhete para você, não para ela", "Se a resposta for sim a uma das duas últimas, a mensagem ainda não sai", "Desconto fora da ficha: a decisão é sua, separada do que vai para a cliente", "Peça com defeito: peça a foto antes do diagnóstico; a etiqueta é condição da troca por gosto, não do defeito (CDC, arts. 18 e 24)"],
      result: "No teste, com este pedido, 0 promessa fora da ficha em 3 respostas, contra 2 em 3 no pedido natural, as duas sobre o prazo dos Correios. Preço, estoque e contas saíram certos nas 6, e nenhuma deu desconto quando a cliente insistiu.",
      privacy: "O teste usou só o primeiro nome das clientes, e a IA não precisou de mais nada. Cole a mensagem sem o sobrenome e sem o telefone. No atendente automático, a conversa inteira fica na plataforma, que pode usá-la para treinar a própria IA; se ligar, dê a ele a mesma ficha e mande passar para você o que não está nela. O modelo da ficha da loja está em Modelos." },
    { id: "divulgar", chap: "Capítulo 2", name: "Divulgar sem mentir",
      tpl: "Tenho {negocio} e quero divulgar {oque}. Faça {pecas}. Use só os fatos abaixo: não acrescente benefício, resultado, prêmio, número, promoção ou prazo que não esteja neles. Se faltar algo para o texto vender, me pergunte no fim em vez de inventar.\n\n{fatos}",
      fields: [
        { k: "negocio", label: "O seu negócio", ph: "um salão" },
        { k: "oque", label: "O que divulgar", ph: "meu corte novo para cacheados" },
        { k: "pecas", label: "O que você quer", ph: "um post para o Instagram e um texto para anúncio pago (Instagram e Facebook)" },
        { k: "fatos", label: "Os fatos", ph: "os fatos que você pode provar", area: true, hint: "Só o que você mostraria a uma cliente que perguntasse: o preço, quanto dura, o horário, o curso com as horas e o ano, a promoção com o prazo." }
      ],
      checks: ["Cada frase que promete alguma coisa: eu consigo provar?", "O preço e a validade da promoção batem com os seus fatos (\"em outubro\", \"de R$ 190 por R$ 170\")?", "\"Especialista\", \"o melhor\" e \"resultado garantido\" não são fatos: corte a frase ou troque por um fato", "Frase sobre os outros, como \"a maioria dos cabeleireiros\", sem pesquisa nenhuma, sai", "A foto é do seu trabalho, sem nada que o serviço não entregue?", "A foto da cliente, só com a autorização dela por escrito"],
      result: "No teste, com este pedido, 0 afirmação fora dos fatos na primeira mensagem, contra 9 em 3 no pedido natural. Depois de \"deixa mais chamativo\", 1, contra 29. O preço saiu certo nos 12 textos; com a regra, o curso de 16 horas virou \"especialização\" numa resposta.",
      privacy: "Ao pedir ajuda à IA, mande os fatos do negócio, não a foto da cliente. A foto da cliente é dela (Código Civil, art. 20): peça autorização por escrito, uma mensagem basta, antes de postar ou de usar no anúncio. O modelo da lista de fatos está em Modelos." },
    { id: "preco", chap: "Capítulo 3", name: "Formar o preço",
      tpl: "Sou {oficio} (MEI) e quero saber quanto cobrar no {produto}. Qual o preço com {margem}% de margem? Mostre a conta item por item. Use só os custos que eu dei; se achar que falta algum, liste no fim, sem pôr valor. Diga se a margem fica sobre o custo ou sobre o preço de venda.\n\n{ficha}",
      fields: [
        { k: "oficio", label: "O seu ofício", ph: "confeiteira" },
        { k: "produto", label: "O produto", ph: "meu bolo" },
        { k: "margem", label: "A margem, em %", ph: "30", hint: "A parte do preço que sobra. A decisão é sua." },
        { k: "ficha", label: "A ficha de custos", ph: "a ficha: cada item com a quantidade e o preço da embalagem, o seu tempo e o valor da hora, o gás, o DAS, quantos vende por mês e a taxa da maquininha", area: true, hint: "A ficha do bolo da Rosa, a do teste, está em \"Faça agora\"; o valor da hora, em \"Os valores do MEI de 2026\"." }
      ],
      checks: ["Na calculadora: o preço, menos a taxa, menos o custo, dividido pelo preço, tem de dar a margem que você pediu", "No bolo: 4% de R$ 187,18 são R$ 7,49; R$ 187,18 − R$ 7,49 − R$ 123,54 = R$ 56,15; R$ 56,15 ÷ R$ 187,18 = 30,0%", "A resposta diz se a margem ficou sobre o custo ou sobre o preço de venda?", "Não confie nas porcentagens de apoio da resposta: confira com a sua conta", "Os custos que ela listou sem valor: quais existem no seu negócio?", "Frase sobre o que \"a maioria das confeiteiras\" faz, sem pesquisa citada, não entra na sua decisão", "Preço diferente no Pix e no cartão pode, com o desconto \"em local e formato visíveis ao consumidor\" (Lei 10.962/2004, art. 5º-A)"],
      result: "No teste, com este pedido, as 3 respostas explicaram margem e markup e chegaram a R$ 187,18. No pedido natural, as 3 fizeram markup e deram R$ 167,29, sem avisar que a sobra ficava em 22% do preço. O custo saiu certo nas 6, e nenhuma inventou imposto. Mas, com o pedido, vieram 4 erros nas porcentagens de apoio (2 sem ele), nenhum no preço final.",
      privacy: "A ficha de custos vai só com os números do produto. Se você é ME ou EPP do Simples, o imposto é uma porcentagem do que o cliente paga, e o contador diz qual; ele entra na conta como a taxa da maquininha, dividindo o preço (não testado). A ficha de custo e preço, com a conta da hora, está em Modelos." },
    { id: "orcamento", chap: "Capítulo 4", name: "Fazer o orçamento",
      tpl: "Sou {oficio}. Faz o orçamento pra eu mandar pra cliente pelo WhatsApp. Pela lei (Código de Defesa do Consumidor, art. 40), o orçamento precisa ter: o valor da mão de obra, dos materiais e equipamentos, as condições de pagamento, as datas de início e de término do serviço e a validade do orçamento (se eu não disser outra, são 10 dias a partir de quando a cliente recebe). Mostre a soma de cada linha. Use só o que eu disse; o que faltar, deixe [preencher: ...].\n\n{anotacao}",
      fields: [
        { k: "oficio", label: "O seu ofício", ph: "eletricista" },
        { k: "anotacao", label: "A anotação da visita", ph: "a anotação da visita, sem o nome, o endereço e o telefone do cliente", area: true, hint: "Cada material com quantidade e preço, a mão de obra de cada parte, o sinal e o resto, as formas de pagamento, quando pode começar e quantos dias leva." }
      ],
      checks: ["As multiplicações e o total, na calculadora", "As datas de início e de término: são as que você cumpre?", "A data do orçamento que a IA puser por conta própria: troque pela do dia em que você manda, ou apague", "Toda frase que você não disse sai", "Os seis itens: mão de obra, material, pagamento, início, término e validade", "No desconto, peça as opções com a conta e escolha você o número: a mensagem do desconto, na mesma conversa, está em Modelos", "O art. 40 e o art. 26 se conferem no planalto.gov.br, pelo número da lei e do artigo"],
      result: "No teste com este pedido, as somas saíram certas nas 3, a validade apareceu nas 3 e o término ficou para preencher nas 3; sem a lista da lei, em 0 de 6. No desconto, a IA escolheu o valor sozinha em 0 de 3, contra 6 de 6 sem a frase; sobrou 1 frase posta na boca do eletricista. Em 2 de 3, a data do orçamento foi a do dia da conversa, que ele não tinha dado.",
      privacy: "Para montar o orçamento, a IA não precisa do nome, do endereço e do telefone do cliente. Escreva [cliente] e [endereço] e complete no celular, antes de mandar. O modelo de orçamento com os itens do art. 40 e a mensagem do desconto estão em Modelos." },
    { id: "regras-da-casa", chap: "Capítulo 5", name: "As regras da casa",
      tpl: "{negocio} Escreva a política de {regras} da minha loja, com o que eu decidi abaixo. Antes, confira cada ponto no Código de Defesa do Consumidor (arts. 18, 26, 49 e 51) e no Código Civil (arts. 417 a 420). Se um ponto contraria a lei, me diga qual é, por quê e o artigo, e não o ponha na política. Não acrescente regra que eu não decidi. O que você não tiver certeza, marque [conferir]. É assim que eu quero:\n{quero}",
      fields: [
        { k: "negocio", label: "O seu negócio, em uma frase", ph: "O seu negócio em uma frase: o que vende, se é MEI, por onde vende e como entrega.", area: true },
        { k: "regras", label: "A política de quê", ph: "troca, devolução, sinal e cancelamento" },
        { k: "quero", label: "O que você decidiu", ph: "uma linha por regra: o prazo, a condição e o que você dá; a venda no balcão separada da venda pelo Instagram e pelo WhatsApp", area: true, hint: "Separe o balcão do Instagram e do WhatsApp, porque a lei separa." }
      ],
      checks: ["Cada artigo citado, no texto da lei, pela régua mais abaixo", "Onde saiu uma regra contra a lei, entrou o direito que a lei dá?", "Entrou alguma regra que você não decidiu?", "Cada artigo citado diz o que a política diz?", "O artigo do sinal: no teste, o número veio trocado (o sinal está no Código Civil, arts. 417 e 418)", "Se faltou, as duas linhas que a lei já dá, que estão no modelo da política da casa, em Modelos"],
      result: "No teste, com este pedido, as 12 regras contra a lei ficaram fora da política nas 3, com o artigo certo; no pedido natural, entraram as 12. Mas o artigo do sinal veio trocado em 2 de 3, e o direito da cliente ficou sem escrever em 2 de 3.",
      privacy: "A política da casa, que você afixa no balcão e põe no Instagram, é pública, e pode ir. Num caso concreto que a régua não resolve, como o sinal de uma encomenda já começada, a dúvida vai ao Procon ou a um advogado. O modelo da política da casa, com as duas linhas da lei, está em Modelos." },
    { id: "cobrar", chap: "Capítulo 6", name: "Receber e cobrar",
      tpl: "Escreva uma mensagem de WhatsApp para cobrar {nome}, que me deve {valor} de {oque}, vencido em {data}. Educada e firme; sem ameaça, sem expor a pessoa, sem falar com mais ninguém (CDC, art. 42); sem juros nem multa que não combinamos. Ofereça {formas}. Use só os fatos abaixo. {fatos}",
      fields: [
        { k: "nome", label: "A cliente", ph: "o primeiro nome da cliente" },
        { k: "valor", label: "O valor", ph: "o valor" },
        { k: "oque", label: "O que vendeu", ph: "o que vendeu" },
        { k: "data", label: "O vencimento", ph: "a data" },
        { k: "formas", label: "Como pode pagar", ph: "as formas que você aceita", hint: "No teste: \"Pix ou 2 vezes\"." },
        { k: "fatos", label: "Os fatos", ph: "o que vendeu, quando entregou, o valor, o que já foi pago, o vencimento, os lembretes e o que você aceita", area: true, hint: "Sem o telefone, o CPF e o print da conversa." }
      ],
      checks: ["O valor e a data", "A chave Pix, copiada do aplicativo do seu banco, nunca da resposta da IA", "Prazo, desconto ou condição que você não deu", "Frase quebrada ou nome trocado", "Nada que exponha a pessoa: a mensagem vai só para ela, em conversa particular", "Comprovante não é pagamento: entregue só depois de ver o dinheiro na conta, no extrato"],
      result: "No teste, com ou sem a regra, as 6 mensagens saíram sem ameaça, sem exposição e sem juros ou multa, com o valor e a data certos. Mas 1 delas, com este pedido, trouxe como chave Pix o e-mail da conta usada no teste, e 2 das 6 traziam um prazo que a dona não deu. Quando a cliente mandou o print do comprovante, a IA mandou conferir no extrato nas 6.",
      privacy: "Para a IA, vão os fatos da venda, sem o telefone, o CPF e o print da conversa. O comprovante que a cliente mandou não precisa ir: quem confere o pagamento é o extrato, não a IA. Na mensagem, escreva [chave Pix] e ponha a sua, copiada do aplicativo do banco, antes de mandar. A lista do que conferir antes de mandar está em Modelos." },
    { id: "caixa", chap: "Capítulo 7", name: "O caixa da semana",
      tpl: "Eu {negocio} (sou MEI) e uso a mesma conta pra tudo. {familia} Separe este extrato em [negócio], [casa] e [não sei]. Ponha em [não sei] o que você não tiver certeza, sem adivinhar, e me diga o que perguntar. Liste cada lançamento uma vez, com a data e o valor. Some cada grupo e confira: o saldo anterior mais as entradas menos as saídas tem de dar o saldo final do extrato. Não invente lançamento. {linhas}",
      fields: [
        { k: "negocio", label: "O que você faz", ph: "faço marmita na cozinha de casa" },
        { k: "familia", label: "Quem é da família", ph: "Quem é da família, pelo papel: o marido, a mãe.", hint: "Pelo papel, nunca pelo nome completo." },
        { k: "linhas", label: "As linhas do extrato", ph: "as linhas do extrato: data, descrição e valor, com o saldo anterior e o final, sem número de conta", area: true, hint: "Copie ou digite só as linhas; o extrato inteiro, o print e o PDF não vão." }
      ],
      checks: ["O saldo anterior mais as entradas menos as saídas tem de dar o saldo final do extrato", "Faça essa conta em toda resposta, com a calculadora do celular", "Refaça qualquer conta feita fora da tabela, numa nota ou num \"se for assim, ficaria\": no teste, foi ali que ela errou", "Responda cada [não sei]: o misto é decisão sua, com o mesmo critério toda semana", "A retirada numa linha própria: o que a casa gastou, menos o que entrou para a casa, mais a parte da casa nos mistos", "A regra de imposto que vier junto se confere no Portal do Empreendedor, em gov.br/mei"],
      result: "No teste, as 6 respostas somaram certo e fecharam com o saldo. Com este pedido, 0 suposição sem aviso e 0 regra de imposto inventada, contra 3 de 3 no pedido natural; os 23 lançamentos apareceram uma vez nas 3. Mas 14 ou 15 dos 23 voltaram como [não sei]: o caixa fecha quando você responde. Dizer antes quem é cliente e o que se compra no atacadista não foi testado.",
      privacy: "Do extrato, só as linhas: a data, a descrição curta e o valor, sem número de conta, CPF ou CNPJ, e com os nomes trocados pelo papel (\"Pix recebido - marido\"). Se a empresa tem conta própria, o pedido é o mesmo com outras caixas, como [venda], [recebido da maquininha], [transferência para mim] e [não sei] (não testado). A planilha do caixa, com a coluna da retirada, e o modelo do relatório mensal estão em Modelos." },
    { id: "obrigacoes-do-mei", chap: "Capítulo 8", name: "As obrigações do MEI",
      tpl: "Sou MEI ({atividade}, desde {ano}). Hoje é {hoje}. Para cada pergunta abaixo, me diga: a regra; de que ano é a informação que você tem e se ela pode ter mudado; e onde eu confiro (a lei ou a página oficial). Se não tiver certeza de um valor, diga, em vez de chutar. {perguntas}",
      fields: [
        { k: "atividade", label: "A sua atividade", ph: "a sua atividade" },
        { k: "ano", label: "Desde quando", ph: "o ano em que abriu" },
        { k: "hoje", label: "A data de hoje", ph: "a data de hoje", hint: "No seu aplicativo, a IA pode não saber o dia." },
        { k: "perguntas", label: "As perguntas", ph: "as suas perguntas, numeradas", area: true }
      ],
      checks: ["Cada valor e cada regra no Portal do Empreendedor, no Portal do Simples ou na lei, digitando o endereço", "Para cada uma: isso vale para que ano?", "Desconfie mais do número dito com segurança e sem ano, como a multa de R$ 25,00, do que do \"não sei\"", "Endereço e aplicativo oficiais, só os desta página: no teste, 3 das 6 respostas inventaram um", "A regra do MEI está na LC 123, mesmo quando a IA citar outra lei que a mudou", "No Pix do DAS, confira na prévia o CNPJ 00.394.460/0058-87"],
      result: "No teste, com este pedido, as 3 respostas disseram até quando sabiam (\"início de 2025\") e onde conferir cada item; no natural, 1 de 3 falou numa \"data de corte\", sem dizer qual. Os erros afirmados quase não caíram: 8 nas 3, contra 10 nas 3 naturais. A multa de \"R$ 25,00\" apareceu em 5 das 6 respostas; a prefeitura que pode exigir nota de pessoa física, em 6 de 6; a nota de 2027, em nenhuma. O SMS falso foi reconhecido como golpe nas 6.",
      privacy: "Para perguntar sobre o MEI, a IA precisa da atividade e do ano de abertura. O CNPJ, o CPF, o código de acesso e a senha do gov.br não vão. O calendário de 2026 está em Modelos; os valores do ano e os endereços oficiais, mais abaixo, com a data." },
    { id: "dados-dos-clientes", chap: "Capítulo 9", name: "Os dados dos clientes",
      tpl: "Tenho {negocio} (sou MEI) e essa é a minha planilha de clientes. Hoje é {hoje}. Faz as mensagens de WhatsApp de feliz aniversário pra quem faz aniversário em {mes}, e uma mensagem de promoção pra quem não vem ao {lugar} há mais de {dias} dias: {promocao}. Colei só as colunas que a tarefa precisa: {colunas}. Use só elas; não acrescente dado, desconto ou condição que eu não dei, e deixe de fora quem não aceita mensagem. Mostre quem entrou em cada mensagem e por quê.\n{dados}",
      fields: [
        { k: "negocio", label: "O seu negócio", ph: "um salão de beleza" },
        { k: "hoje", label: "Hoje", ph: "o dia da semana e a data", hint: "É dela que sai a conta dos dias: não a tire." },
        { k: "mes", label: "O mês do aniversário", ph: "o mês" },
        { k: "lugar", label: "O lugar", ph: "salão" },
        { k: "dias", label: "Há quantos dias", ph: "60" },
        { k: "promocao", label: "A promoção", ph: "a promoção, com o prazo" },
        { k: "colunas", label: "As colunas", ph: "primeiro nome, aniversário, última visita e se aceita mensagem" },
        { k: "dados", label: "Os dados", ph: "só essas colunas, copiadas para uma aba nova", area: true, hint: "Sem sobrenome, ano de nascimento, telefone, CPF, endereço, gasto e observação." }
      ],
      checks: ["Quem entrou em cada lista e por quê", "Entrou só quem aceita mensagem?", "Quem ficou a um dia do corte ficou de fora?", "Alguma mensagem diz o que a cliente contou só a você: saúde, família, dívida?", "Na resposta da lei, cada artigo, no texto, pelo checklist da LGPD, em Modelos", "Se a IA citou um artigo, abra a resolução no gov.br/anpd ou a LGPD no planalto.gov.br e leia o artigo inteiro"],
      result: "No teste, as listas saíram certas nas 6, e quem recusou mensagem ficou de fora nas 6. Com a planilha inteira, a gravidez de uma cliente entrou no parabéns em 2 de 3; com as quatro colunas, nada havia a expor. Na lei, o essencial veio certo nas 6, mas, com a regra, foram 4 erros de artigo nas 3 respostas (2 sem ela), e só 1 deles veio marcado como incerto.",
      privacy: "Para mensagem de cliente, a IA aberta precisa do primeiro nome e da data; nunca do CPF, do endereço, do telefone nem da coluna de saúde. Print da planilha leva tudo, inclusive o que você não viu: copie as colunas da tarefa. A pergunta da lei, para a mesma conversa, e o checklist da LGPD estão em Modelos." },
    { id: "semana", chap: "Capítulo 10", name: "Organizar a semana",
      tpl: "Monta minha semana pra mim e já escreve a mensagem do pedido pra {fornecedor}. Monte minha semana de {inicio} a {fim} só com esta lista. Não crie tarefa, data nem quantidade; o que eu não disse, pergunte. No fim, liste o que conflita, o que ficou sem data e o que eu preciso confirmar.\n{lista}",
      fields: [
        { k: "fornecedor", label: "O fornecedor", ph: "o fornecedor" },
        { k: "inicio", label: "De", ph: "segunda, dia e mês" },
        { k: "fim", label: "Até", ph: "sábado, dia e mês" },
        { k: "lista", label: "A lista", ph: "a lista: cada encomenda com data, hora e quantidade, o que tem em estoque, quanto rende cada insumo e o que você não sabe", area: true, hint: "Com o rendimento de cada insumo, como \"uma lata dá 20 brigadeiros\", e só o primeiro nome das clientes." }
      ],
      checks: ["A conta do insumo principal, com os rendimentos da sua lista", "Cada quantidade do pedido que não saiu de você", "Para cada dia de produção: o ingrediente já chegou? A folha da semana, em Modelos, tem a coluna \"chega quando\"", "Os espaços em branco e a reserva são seus", "As perguntas que ela deixou, respondidas antes do prazo que elas mudam", "Se o fornecedor pedir para pagar em outra conta ou chave, confirme no número que você já tinha antes de pagar qualquer coisa"],
      result: "No teste, nenhum dos 15 itens se perdeu nas 6 respostas, a conta da compra saiu certa nas 6 e nenhuma inventou quantidade. O conflito mais escondido apareceu em 2 das 3 respostas com este pedido, e em 0 das 3 sem ele. Em 4 das 6, 2 delas com este pedido, a produção começou antes de o ingrediente chegar. Pedir à IA que cruze a agenda com o estoque não foi testado.",
      privacy: "A lista do teste tinha só o primeiro nome das clientes, e a IA não precisou de mais nada. Telefone e endereço de cliente não precisam ir. Do boleto, basta o valor e o vencimento; o código de barras fica no aplicativo do banco. A folha da semana está em Modelos." },
    { id: "decidir", chap: "Capítulo 11", name: "Decidir com números",
      tpl: "{numeros}\n\nQuero saber {pergunta}. Me ajuda a decidir. Use só os números que eu dei e mostre cada conta, por {por}. Separe o que os números mostram do que é suposição, e não dê previsão de venda como certa. No fim, diga o que eu ainda preciso saber para decidir.",
      fields: [
        { k: "numeros", label: "O negócio e os números", ph: "O negócio e os números: o que vende, o preço, o custo por unidade e quantas vendeu em cada mês, a perda, os custos fixos do mês e o faturamento do ano até aqui.", area: true, hint: "O preço e o custo saem da ficha do capítulo 3; o faturamento, do relatório mensal ou do caixa da semana." },
        { k: "pergunta", label: "O que você quer saber", ph: "o que dá mais lucro, se paro de vender alguma coisa e se aumento a marmita G para R$ 28,00" },
        { k: "por", label: "A conta, por", ph: "produto e mês" }
      ],
      checks: ["A conta de um mês, produto por produto: preço menos custo, vezes as vendidas", "Todo cenário que a IA inventar (\"se você perder 15%...\"): quem deixa de comprar leva o preço inteiro", "O que os números mostram e o que é suposição", "O limite e a regra do excesso na LC 123, art. 18-A, no planalto.gov.br", "Isso vale para que ano? O limite de R$ 81 mil é o de 2026", "Marcar a dúvida não aponta o erro: a regra se confere na lei", "Decida você"],
      result: "No teste, com este pedido, 0 erro de conta e o fato separado da suposição nas 3. Sem ele, 3 erros de conta em 2 das 3 conversas, e \"sim\", \"sim, se\" e \"não\" para o mesmo aumento. Sobre o que acontece quando se passa do limite, algum detalhe saiu errado em 5 das 6 conversas, com ou sem a regra (4 erros nas 3 sem ela e 5 nas 3 com ela). Com a regra, a IA marcou dúvida em alguns pontos, mas um erro veio sem marca nenhuma: marcar a dúvida não aponta o erro, e a regra se confere na lei.",
      privacy: "Os números do negócio vão para a IA aberta: preço, custo, vendas, contas fixas. O CNPJ, o seu nome e o nome de clientes, não: para a conta, a IA não precisa deles. A pergunta do limite, para a mesma conversa, e a planilha do ano estão em Modelos." }
  ];

export const TEMPLATES = [
    { id: "ficha-da-loja", kind: "text", title: "A ficha da loja", chap: "Capítulo 1",
      desc: "Um modelo, não testado, em uma página: as peças ou os serviços com o preço de hoje, os tamanhos e o que acabou; as formas de pagamento e o único desconto que existe; a entrega na cidade e fora dela; a troca; o que a loja não faz. E o que você não sabe, do jeito que vai responder.",
      text: "[O negócio] · [o que vende]\nHorário: [os dias e as horas].\nO que tem hoje (os cinco mais perguntados):\n- [produto]: R$ [preço], [tamanhos ou sabores; o que acabou e se tem previsão]\n- [produto]: R$ [preço], [...]\nPagamento: [Pix, débito, crédito; as parcelas; o único desconto que existe].\nEntrega: [na cidade, fora dela, retirada; o valor].\nTroca: [a sua regra].\nEncomenda ou visita: [com quantos dias de antecedência; a região que você atende; se leva material].\nNão faço: [o que você não faz].\nNão sei: [o que você ainda não sabe responder].",
      after: "Se outra pessoa responde por você, ela usa a mesma ficha, e o que ela pode prometer fica escrito nela. Se ligar o atendente automático, dê a ele a mesma ficha e mande passar para você o que não está nela." },
    { id: "lista-de-fatos", kind: "text", title: "A lista de fatos", chap: "Capítulo 2",
      desc: "Um modelo, não testado: o que é o produto ou o serviço; o preço; quanto dura; o horário; o curso, com as horas e o ano; a promoção, com o prazo.",
      text: "Os fatos:\n- [O negócio e o que você faz, sem endereço e sem telefone.]\n- [Há quanto tempo faz isso; o curso, com as horas e o ano.]\n- [O produto ou o serviço: o que é, quanto custa, quanto dura.]\n- [A promoção: o preço e até quando.]\n- [Como se compra ou se marca: os dias e o horário.]",
      after: "Só entra o que você mostraria a uma cliente que perguntasse: o certificado, a tabela, a agenda. \"Especialista\", \"o melhor\" e \"resultado garantido\" não são fatos; são promessas." },
    { id: "ficha-de-custo", kind: "sheet", title: "A ficha de custo e preço", chap: "Capítulo 3",
      desc: "Cole em A1. Uma linha por custo: quanto vai em um produto, o tamanho da embalagem (ou quantos o botijão rende, ou quantos vende no mês) e o preço. A coluna E se calcula sozinha, e o preço sai da margem e da taxa que você escrever. As fórmulas usam SEERRO; numa planilha em inglês, troque por IFERROR e o ponto e vírgula por vírgula.",
      rows: [
        ["Custo", "Quanto vai em um", "Embalagem, rende ou vende no mês", "Preço (R$)", "Custo em um (R$)"],
        ["[ingrediente ou material]", "", "", "", "=SEERRO(B2/C2*D2;\"\")"],
        ["[ingrediente ou material]", "", "", "", "=SEERRO(B3/C3*D3;\"\")"],
        ["[ingrediente ou material]", "", "", "", "=SEERRO(B4/C4*D4;\"\")"],
        ["Embalagem", "1", "1", "", "=SEERRO(B5/C5*D5;\"\")"],
        ["Gás: o botijão ÷ quantos rende", "1", "", "", "=SEERRO(B6/C6*D6;\"\")"],
        ["DAS: o do mês ÷ quantos vende no mês", "1", "", "", "=SEERRO(B7/C7*D7;\"\")"],
        ["Seu tempo: as horas × o valor da hora", "", "1", "", "=SEERRO(B8/C8*D8;\"\")"],
        ["Custo total de um", "", "", "", "=SOMA(E2:E8)"],
        ["Margem sobre o preço (%)", "", "", "", ""],
        ["Taxa da maquininha (%)", "", "", "", ""],
        ["Preço com a margem", "", "", "", "=SEERRO(E9/(1-B10/100-B11/100);\"\")"],
        ["Conferência: (preço − taxa − custo) ÷ preço, em %", "", "", "", "=SEERRO((E12-E12*B11/100-E9)/E12*100;\"\")"],
        ["Valor da hora, ponto de partida: salário mínimo ÷ horas do mês", "1621", "176", "", "=B14/C14"]
      ],
      after: "A margem e a taxa vão na coluna B; a taxa divide o preço, não se soma ao custo. A conferência tem de dar a margem que você pediu. Quanto vale a sua hora é você quem decide. Um ponto de partida para pensar, se você ainda não tem um número, é o salário mínimo dividido pelas horas que você trabalha no mês. Com 8 horas por dia em 22 dias, são 176 horas: R$ 1.621,00 ÷ 176 = R$ 9,21 por hora. Essa conta usa as horas que você trabalha; não é o mínimo da lei. O salário mínimo por hora de 2026, o dos contratos de trabalho, é de R$ 7,37, calculado sobre 220 horas por mês. É uma conta para começar, e não uma recomendação: a hora é sua, e o seu ofício pode valer mais." },
    { id: "orcamento", kind: "text", title: "O orçamento com os itens do art. 40", chap: "Capítulo 4",
      desc: "Um modelo, não testado: o serviço; cada material com quantidade, preço e soma; a mão de obra de cada parte; o total. As condições de pagamento (sinal, resto, formas), o início, o término e a validade.",
      text: "Orçamento · [data do envio]\nCliente: [cliente] · [endereço]\nServiço: [o serviço]\n\nMaterial\n- [material]: [quantidade] × R$ [preço] = R$ [soma]\n- [material]: [quantidade] × R$ [preço] = R$ [soma]\nTotal do material: R$ [soma]\n\nMão de obra\n- [parte do serviço]: R$ [valor]\n- [parte do serviço]: R$ [valor]\nTotal da mão de obra: R$ [soma]\n\nTotal: R$ [material + mão de obra]\n\nPagamento: [sinal], [o resto e quando], [formas]\nInício: [a data que você cumpre]\nTérmino: [a data que você cumpre]\nValidade: [10 dias a partir do recebimento, se você não escrever outra]\nGarantia: [a que você der a mais, se der]",
      after: "Se você não escrever outra validade, são dez dias do recebimento (CDC, art. 40, § 1º). A garantia que você der a mais, escrita no orçamento, obriga (CDC, art. 30). Mande o orçamento escrito, mesmo quando a conversa foi por áudio, e guarde a mensagem da cliente que aprova: aprovado, ele obriga os dois. [cliente] e [endereço] se completam no celular, antes de mandar." },
    { id: "desconto", kind: "text", title: "Na mesma conversa: o desconto", chap: "Capítulo 4",
      desc: "Quando o cliente pedir desconto, mande esta mensagem na mesma conversa do orçamento, depois da resposta. Foi testada assim, como segunda mensagem.",
      text: "A cliente achou caro e perguntou se eu faço por [R$ 1.200]. O que eu respondo? Não escolha o valor do desconto por mim; me dê as opções com a conta.",
      after: "Veja quanto cada valor tira da sua mão de obra, por dia de serviço. Escolha o número, ou mantenha o preço, e só então peça a mensagem. Apague a frase que você não disse." },
    { id: "politica-da-casa", kind: "text", title: "A política da casa", chap: "Capítulo 5",
      desc: "Um modelo, não testado, com as regras que você decidiu e as duas linhas que a lei já dá. A venda no balcão separada da venda pelo Instagram e pelo WhatsApp, porque a lei separa.",
      text: "Política de troca, devolução, sinal e cancelamento · [o negócio] · [mês e ano]\n\nNo balcão\n- [Troca sem defeito: o prazo, a condição e o que você dá.]\n- Promoção: [sem troca por gosto], exceto em caso de defeito.\n\nPelo Instagram e pelo WhatsApp\n- Para desistir: [como, por exemplo, por mensagem neste mesmo número].\n\nEncomenda\n- [Sinal da encomenda: quanto, quando, e o que acontece se a cliente desistir antes de você começar.]\n\nO que a lei já dá\n- Defeito: 30 dias para reclamar do produto não durável e 90 do durável, contados da entrega (CDC, art. 26).\n- Compra pelo Instagram ou pelo WhatsApp: 7 dias para desistir, contados do recebimento, com o dinheiro e o frete de volta (CDC, art. 49).",
      after: "Se você não sabe se a sua peça é durável, escrever 90 dias cumpre os dois casos. Na encomenda pelo WhatsApp, combine por escrito, antes de produzir, o pedido, o sinal e até quando a cliente pode desistir, e guarde a conversa. Cada artigo se confere na régua mais abaixo. O mesmo texto no balcão, no destaque do Instagram e na resposta do WhatsApp, com o mês em que foi escrito." },
    { id: "cobranca", kind: "check", title: "A mensagem de cobrança, antes de mandar", chap: "Capítulo 6",
      desc: "Leia como se fosse a cliente, item por item.",
      table: [["Item", "O que conferir"], ["1. O valor e a data", "Os do seu caderno, não os da resposta"], ["2. A chave Pix", "Copiada do aplicativo do seu banco, nunca da resposta da IA: no teste, uma mensagem trouxe um e-mail que não era da dona"], ["3. Prazo, desconto ou condição", "Os que você não deu saem"], ["4. Frase quebrada ou nome trocado", "Reescreva com as suas palavras"], ["5. Nada que exponha a pessoa", "A mensagem vai só para ela, em conversa particular (CDC, art. 42)"]],
      after: "Comprovante não é pagamento. Abra o aplicativo do banco e procure no extrato o valor, o nome de quem pagou e a data; só depois dê como pago, confirme a encomenda e entregue. Se não caiu, responda com calma: ainda não identifiquei o valor por aqui." },
    { id: "planilha-do-caixa", kind: "sheet", title: "A planilha do caixa da semana", chap: "Capítulo 7",
      desc: "Cole em A1. Cada linha do extrato vai para uma das três caixas, com o sinal: + para entrada, − para saída. Os saldos e a parte da casa nos mistos vão na coluna C. A conferência e a retirada se calculam sozinhas. Para mais linhas, insira acima da linha da soma.",
      rows: [
        ["Data", "Descrição", "Negócio", "Casa", "Não sei"],
        ["[dd/mm]", "[Pix recebido - cliente]", "", "", ""],
        ["[dd/mm]", "[Compra no débito - atacadista]", "", "", ""],
        ["[dd/mm]", "[Pix recebido - marido]", "", "", ""],
        ["[dd/mm]", "[Débito automático - luz]", "", "", ""],
        ["[dd/mm]", "", "", "", ""],
        ["Soma de cada caixa", "", "=SOMA(C2:C6)", "=SOMA(D2:D6)", "=SOMA(E2:E6)"],
        ["Saldo anterior do extrato", "", "", "", ""],
        ["Saldo final do extrato", "", "", "", ""],
        ["Conferência: saldo anterior + as três somas (tem de dar o saldo final)", "", "=C8+C7+D7+E7", "", ""],
        ["Parte da casa nos mistos (decisão sua)", "", "", "", ""],
        ["Retirada: o que a casa gastou, menos o que entrou para a casa, mais a parte da casa nos mistos", "", "=-D7+C11", "", ""],
        ["Resultado do negócio na semana", "", "=C7", "", ""],
        ["O resultado cobre a retirada? (resultado − retirada)", "", "=C13-C12", "", ""],
        ["Vendi na semana, por produto", "[produto]: [quantos]", "[produto]: [quantos]", "[produto]: [quantos]", ""]
      ],
      after: "Retirada é o dinheiro que você tira do negócio para a casa, e não é despesa do negócio. Quanto tirar por semana é decisão sua; com a retirada numa linha própria, você vê se o resultado da semana cobre o que a casa levou. O Pix do marido não é faturamento: não entra no relatório mensal nem na conta do limite. A linha da venda por produto é a que o capítulo 11 usa. Na ME, quanto e como o dono tira do negócio se acerta com o contador." },
    { id: "relatorio-mensal", kind: "sheet", title: "O relatório mensal de receitas", chap: "Capítulo 7",
      desc: "Cole em A1. As entradas do negócio de cada semana somam o faturamento do mês, e é esse número que vai para o Relatório Mensal de Receitas Brutas. Preencha a linha da sua ocupação, como pede o Portal do Empreendedor.",
      rows: [
        ["Relatório Mensal de Receitas Brutas · [mês e ano]", "Valor do mês (R$)"],
        ["Revenda de mercadorias (comércio)", ""],
        ["Venda de produtos industrializados (indústria)", ""],
        ["Prestação de serviços", ""],
        ["Total do mês", "=SOMA(B2:B4)"]
      ],
      after: "O MEI não entrega o relatório a nenhum órgão, mas deve preenchê-lo \"até o dia 20 do mês seguinte\" e guardá-lo com as notas de compra e de venda \"por um período mínimo de 5 anos\". A declaração anual \"é o somatório de todos os relatórios preenchidos durante o ano\", diz o Portal do Empreendedor. O modelo oficial, para baixar, está na página do relatório mensal, no Portal (endereço em \"Os endereços oficiais\", mais abaixo)." },
    { id: "calendario", kind: "check", title: "O calendário do MEI de 2026", chap: "Capítulo 8",
      desc: "O DAS e o relatório mensal até o dia 20 de cada mês, e a declaração anual até 31 de maio. Lido nas páginas oficiais em 04/10/2026.",
      table: [["O quê", "Até quando"], ["DAS do mês", "Dia 20 de cada mês (ou o dia útil seguinte). Fonte: FAQ do Portal do Empreendedor"], ["Relatório Mensal de Receitas Brutas", "Dia 20 do mês seguinte às vendas; guardar com as notas por 5 anos. A declaração anual \"é o somatório de todos os relatórios\". Fonte: Portal do Empreendedor"], ["Declaração anual (DASN-SIMEI)", "31 de maio, sobre o ano anterior, mesmo sem faturamento. Fonte: Portal do Empreendedor"], ["Comunicar o excesso do limite", "Último dia útil do mês seguinte ao do excesso. Fonte: LC 123, art. 18-A, § 7º, III"]],
      after: "A multa da declaração atrasada é de 2% por mês sobre os tributos declarados, até 20%. Na entrega espontânea, cai à metade, mas sem passar do mínimo de R$ 50,00 (LC 123, art. 38, §§ 2º e 6º). A multa de \"R$ 25,00\" que a IA deu no teste não existe." },
    { id: "lgpd", kind: "check", title: "O checklist da LGPD do pequeno negócio", chap: "Capítulo 9",
      desc: "Pela Resolução CD/ANPD nº 2/2022 e pela LGPD. Uma lista para conferir, não um modelo testado.",
      table: [["Ponto", "O que diz, com o artigo"], ["1. Quem é", "O MEI, a microempresa e a empresa de pequeno porte são agentes de tratamento de pequeno porte, quem guarda e usa dado de outras pessoas (Res. 2, art. 2º, I e II). Fica fora das regras mais simples quem faz tratamento de alto risco (art. 3º, I). O dado de saúde, sozinho, não basta para isso: a resolução pede também um critério geral, como tratar dados em larga escala (art. 4º)"], ["2. O encarregado e o canal", "Não precisa indicar encarregado (art. 11), mas precisa de um canal para a cliente falar sobre os dados dela (art. 11, § 1º). Por exemplo, o WhatsApp do negócio, escrito num aviso no balcão ou na descrição do perfil do Instagram"], ["3. O que continua valendo", "As bases legais, os princípios e os direitos das clientes (art. 6º). Quer dizer: guardar o dado para um motivo que a cliente entenda, só o que precisa, e deixar que ela veja e peça para apagar"], ["4. A segurança", "As medidas \"essenciais e necessárias\" (art. 12): senha no celular e no arquivo, planilha longe da tela do balcão"], ["5. O dado de saúde", "Só com o consentimento destacado da cliente, para uma finalidade dita (LGPD, art. 11, I)"], ["6. O que a cliente pode pedir", "Saber que dados você tem, corrigir e excluir (LGPD, art. 18); o pequeno porte tem prazo em dobro para responder (Res. 2, art. 14)"], ["7. Para a IA", "Só as colunas da tarefa"]],
      after: "A resolução está no gov.br/anpd, e a LGPD, no planalto.gov.br, pelo número 13.709. Se a IA citou um artigo, leia o artigo inteiro: no teste, 4 citações saíram erradas e só 1 veio marcada como incerta." },
    { id: "pergunta-lgpd", kind: "text", title: "Na mesma conversa: a pergunta da lei", chap: "Capítulo 9",
      desc: "Depois das mensagens do mês, na mesma conversa. Foi testada assim, como segunda mensagem; troque o que está entre colchetes pelo seu caso.",
      text: "Outra coisa: pela LGPD, como MEI, eu preciso ter um encarregado de dados? O que eu sou [obrigada] a fazer com [a minha planilha completa de clientes (que tem também telefone, CPF, endereço e observações como alergia, gravidez e diabetes)]? Para cada regra, diga a lei e o artigo e onde eu confiro; o que você não tiver certeza, diga que não tem.",
      after: "A planilha completa se descreve; não se cola. Cada artigo da resposta se confere no texto, pelo checklist da LGPD." },
    { id: "folha-da-semana", kind: "sheet", title: "A folha da semana", chap: "Capítulo 10",
      desc: "Cole em A1. Ao lado de cada produção, o insumo que ela gasta e o dia em que ele chega. Em 4 das 6 respostas do teste, a produção começou antes de o ingrediente chegar: a última coluna é essa pergunta.",
      rows: [
        ["Dia", "Encomenda ou produção", "Quantidade", "Para quando", "Insumo que gasta", "Tem em casa", "Chega quando", "Já chegou no dia de produzir?"],
        ["Segunda", "", "", "", "", "", "", ""],
        ["Terça", "", "", "", "", "", "", ""],
        ["Quarta", "", "", "", "", "", "", ""],
        ["Quinta", "", "", "", "", "", "", ""],
        ["Sexta", "", "", "", "", "", "", ""],
        ["Sábado", "", "", "", "", "", "", ""]
      ],
      after: "Se a agenda manda fazer antes de o insumo chegar, mude a agenda ou peça ao fornecedor para entregar antes. O que você não sabe, escreva assim mesmo: \"chega quando: não sei\". A conferência na folha não depende da IA." },
    { id: "planilha-do-ano", kind: "sheet", title: "A planilha do ano, com a coluna do limite", chap: "Capítulo 11",
      desc: "Cole em A1. O faturamento de cada mês, do relatório mensal ou do caixa da semana; o acumulado e o que falta para o limite de R$ 81.000,00 de 2026 se calculam sozinhos. As fórmulas usam SEERRO; numa planilha em inglês, troque por IFERROR e o ponto e vírgula por vírgula.",
      rows: [
        ["Mês", "Faturamento do mês (R$)", "Acumulado no ano (R$)", "Falta para o limite de R$ 81.000 (R$)"],
        ["Janeiro", "", "=B2", "=81000-C2"],
        ["Fevereiro", "", "=C2+B3", "=81000-C3"],
        ["Março", "", "=C3+B4", "=81000-C4"],
        ["Abril", "", "=C4+B5", "=81000-C5"],
        ["Maio", "", "=C5+B6", "=81000-C6"],
        ["Junho", "", "=C6+B7", "=81000-C7"],
        ["Julho", "", "=C7+B8", "=81000-C8"],
        ["Agosto", "", "=C8+B9", "=81000-C9"],
        ["Setembro", "", "=C9+B10", "=81000-C10"],
        ["Outubro", "", "=C10+B11", "=81000-C11"],
        ["Novembro", "", "=C11+B12", "=81000-C12"],
        ["Dezembro", "", "=C12+B13", "=81000-C13"],
        ["Meses que faltam no ano", "", "", ""],
        ["O que falta, por mês que falta", "", "", "=SEERRO((81000-SOMA(B2:B13))/B14;\"\")"]
      ],
      after: "Compare a última linha com o seu mês comum: a diferença, para mais ou para menos, é a folga do ano. No ano em que abriu, o limite é de R$ 6.750,00 por mês de atividade. Quem passa do limite em até 20%, ou até R$ 97.200,00 no ano, continua MEI até dezembro e sai em 1º de janeiro (LC 123, art. 18-A, § 7º, III, a). Não se somam as rendas que não são da atividade, como o Pix do marido ou um empréstimo. Para comparar com o resultado do mês: o salário mínimo de 2026 é de R$ 1.621,00." },
    { id: "pergunta-limite", kind: "text", title: "Na mesma conversa: a pergunta do limite", chap: "Capítulo 11",
      desc: "Depois da análise, na mesma conversa. Foi testada assim, como segunda mensagem; troque o que está entre colchetes pela sua decisão.",
      text: "E o limite do MEI? Eu passo dele este ano? E se eu [aumentar a G]? Para cada regra, diga a lei e o artigo e onde eu confiro; o que você não tiver certeza, diga que não tem.",
      after: "No teste, algum detalhe da regra do excesso saiu errado em 5 das 6 conversas. A regra se confere na LC 123, art. 18-A, e no Portal do Empreendedor." }
  ];

export const EXERCISES = [
    { id: "e1", chap: "Capítulo 1", title: "Os [confirmar] da sua ficha", text: "Copie o material abaixo e troque só os cinco produtos mais perguntados, com preço, tamanho e o que acabou. Pegue três mensagens de clientes de ontem, sem nome e sem telefone, e cole as duas coisas numa IA com o pedido do WhatsApp. Se não quiser digitar, fale a ficha e as mensagens no microfone da IA; depois, leia cada preço que ela escreveu. Cada [confirmar] é uma linha que falta na sua ficha, e a resposta dele entra nela. Conte quantos [confirmar] vieram e onde.",
      material: "[O negócio] · [o que vende]\nHorário: [os dias e as horas].\nO que tem hoje (os cinco mais perguntados):\n- [produto]: R$ [preço], [tamanhos ou sabores; o que acabou e se tem previsão]\n- [produto]: R$ [preço], [...]\nPagamento: [Pix, débito, crédito; as parcelas; o único desconto que existe].\nEntrega: [na cidade, fora dela, retirada; o valor].\nTroca: [a sua regra].\nEncomenda ou visita: [com quantos dias de antecedência; a região que você atende; se leva material].\nNão faço: [o que você não faz].\nNão sei: [o que você ainda não sabe responder].\n\nMensagens de hoje:\n1. [primeiro nome]: \"[a mensagem]\"\n2. [primeiro nome]: \"[a mensagem]\"",
      counts: ["[confirmar] que vieram"] },
    { id: "e2", chap: "Capítulo 2", title: "As promessas sem prova", text: "Pegue o seu último post ou anúncio. Marque cada frase que promete alguma coisa e conte quantas você consegue provar. Depois, escreva os seus fatos numa lista, com o material abaixo, e peça o mesmo post com o pedido de divulgar. Compare as duas versões: quantas promessas sem prova sobraram em cada uma?",
      material: "Os fatos:\n- [O negócio e o que você faz, sem endereço e sem telefone.]\n- [Há quanto tempo faz isso; o curso, com as horas e o ano.]\n- [O produto ou o serviço: o que é, quanto custa, quanto dura.]\n- [A promoção: o preço e até quando.]\n- [Como se compra ou se marca: os dias e o horário.]",
      counts: ["Promessas sem prova no post antigo", "Promessas sem prova na versão nova"] },
    { id: "e3", chap: "Capítulo 3", title: "A margem que você pediu", text: "Copie a ficha do bolo da Rosa, a do teste, e troque só o que muda no produto que você mais vende: até cinco ingredientes ou materiais, com a quantidade e o preço da embalagem, e o seu tempo. O gás, o DAS e a taxa, se não souber os seus, deixe os do exemplo por ora. Peça o preço com o pedido do preço, colando ou falando. Na calculadora, faça a conta da conferência e compare com a margem que você pediu. Depois, conte os custos que a IA listou sem valor e quantos deles existem no seu negócio.",
      material: "Bolo de chocolate com recheio e cobertura de brigadeiro, 1,5 kg (forma de 20 cm). O que vai em um bolo e quanto eu pago:\n1. Farinha de trigo: 300 g (pacote de 1 kg a R$ 6,50)\n2. Açúcar: 350 g (pacote de 1 kg a R$ 5,20)\n3. Ovos: 4 (dúzia a R$ 12,00)\n4. Chocolate em pó 50%: 150 g (pacote de 400 g a R$ 18,00)\n5. Leite condensado: 2 latas (R$ 7,50 cada)\n6. Creme de leite: 2 caixinhas (R$ 3,80 cada)\n7. Manteiga: 100 g (tablete de 200 g a R$ 11,00)\n8. Leite: 240 ml (litro a R$ 5,00)\n9. Óleo: 120 ml (garrafa de 900 ml a R$ 8,10)\n10. Fermento em pó: 15 g (lata de 100 g a R$ 4,00)\n11. Chocolate granulado: 100 g (pacote de 500 g a R$ 22,00)\n12. Caixa com base laminada: R$ 6,90 cada\nGás: o botijão de R$ 120,00 dá uns 30 bolos.\nMeu tempo: umas 3 horas por bolo (fazer, montar e embalar). Quero ganhar R$ 20,00 por hora.\nDAS do MEI: R$ 82,05 por mês. Vendo uns 30 bolos por mês.\nMaquininha: 4% no crédito. Quase todo mundo paga no crédito.",
      counts: ["A margem que deu na calculadora (%)", "Custos listados sem valor", "Desses, os que existem no seu negócio"],
      after: "O DAS de R$ 82,05 é o de 2026 para comércio; o seu está em \"Os valores do MEI de 2026\". No bolo da Rosa, a conferência fecha: 4% de R$ 187,18 são R$ 7,49; R$ 187,18 − R$ 7,49 − R$ 123,54 = R$ 56,15; R$ 56,15 ÷ R$ 187,18 = 30,0%." },
    { id: "e4", chap: "Capítulo 4", title: "Os seis itens do orçamento", text: "Pegue o último orçamento que você mandou e conte quantos destes seis itens ele tem: mão de obra, material, pagamento, início, término, validade. Depois, copie a anotação do exemplo, troque pelos números de um serviço seu, sem os dados do cliente, e passe pelo pedido do orçamento. Refaça o total na calculadora e confira as duas datas: são as que você cumpre? Conte de novo os seis itens na versão nova e anote quantas datas você teve de trocar.",
      material: "Anotação da visita de sábado (03/10). Cliente: [cliente], [endereço].\nServiço: tirar o quadro velho de fusível e pôr quadro novo com disjuntor e DR; passar circuito novo só pro chuveiro (o chuveiro vive desarmando).\nMaterial (cotei na loja de material elétrico):\n- quadro de embutir 12 disjuntores: 89,90\n- 8 disjuntor 20A: 14,50 cada\n- 1 disjuntor bipolar 40A pro chuveiro: 58,00\n- 1 DR 40A 30mA: 145,00\n- 25 m de cabo 6 mm: 7,80 o metro\n- barramento e terminais: 32,00\n- 10 m de conduíte 3/4: 2,10 o metro\nMão de obra: troca do quadro 450,00; circuito do chuveiro 280,00.\nDá 2 dias de serviço. Posso começar na semana do dia 12.\nPagamento: 50% de sinal para comprar o material, o resto quando terminar. Pix ou dinheiro.",
      counts: ["Itens do seu último orçamento (de 6)", "Itens da versão nova (de 6)", "Datas que você teve de trocar"] },
    { id: "e5", chap: "Capítulo 5", title: "A regra que a lei não deixa", text: "Escreva duas regras que você usa hoje: a do defeito e a da venda pelo Instagram ou pelo WhatsApp. Se não tiver, use as da Simone: defeito só em 7 dias; compra pelo Instagram sem devolução. Peça a política com o pedido das regras da casa. Abra só o artigo que a IA citou para o defeito, com \"Como ler uma lei\", mais acima, e veja se ele diz o que ela disse. Escreva no lugar o que faltou, com as duas linhas da lei do modelo da política da casa, e ponha a data.",
      material: "É assim que eu quero:\n- [Troca sem defeito: o prazo, a condição e o que você dá.]\n- [Sinal da encomenda: quanto, quando, e o que acontece se a cliente desistir antes de você começar.]",
      counts: ["Regras contra a lei que ficaram na política", "Das duas linhas da lei, as que faltaram"] },
    { id: "e6", chap: "Capítulo 6", title: "Os cinco itens da cobrança", text: "Pegue uma conta em aberto do seu caderno e escreva os fatos com o material abaixo. Peça a mensagem com o pedido da cobrança. Antes de mandar, troque a chave Pix pela que você copiou do seu banco e passe os cinco itens da lista. Escreva no caderno a regra da próxima entrega: só depois do dinheiro na conta, visto no extrato. No fim, anote quantos dos cinco itens pegaram alguma coisa na mensagem.",
      material: "[Primeiro nome da cliente] me deve R$ [valor] de [o que vendeu]. Entreguei em [data]. Ela pagou R$ [valor] de sinal; o resto venceu em [data].\nMandei lembrete em [data]: [o que aconteceu].\nAceito: [Pix; dividir em 2 vezes].\nNão combinamos juros nem multa.",
      counts: ["Itens que pegaram alguma coisa (de 5)"] },
    { id: "e7", chap: "Capítulo 7", title: "O caixa que fecha com você", text: "Pegue três dias do extrato da semana passada, até 15 linhas. Copie ou digite as linhas sem número de conta e com os nomes trocados pelo papel. Peça com o pedido do caixa. Responda cada [não sei], faça a conferência com a calculadora e anote a retirada desses dias numa linha própria. No fim, anote quantos lançamentos voltaram como [não sei].",
      material: "Saldo anterior em [data]: R$ [valor]\n[dd/mm] | [Pix recebido - cliente] | +[valor]\n[dd/mm] | [Compra no débito - atacadista] | -[valor]\n[dd/mm] | [Pix recebido - marido] | +[valor]\n[dd/mm] | [Débito automático - luz] | -[valor]\n[...]\nSaldo final em [data]: R$ [valor]",
      counts: ["Lançamentos que voltaram como [não sei]"] },
    { id: "e8", chap: "Capítulo 8", title: "Isso vale para que ano?", text: "No App MEI, em \"Consulta DASN-SIMEI\", ou no Portal do Simples Nacional, em \"Consulta Declaração Transmitida\", confira se está lá a declaração sobre 2025, entregue até 31 de maio de 2026. O Portal pede o CNPJ e o código de acesso, ou o certificado digital. Salve no celular o CNPJ 00.394.460/0058-87, com o nome \"DAS verdadeiro\". Depois, faça à IA uma pergunta sobre o MEI com o pedido das obrigações, usando as perguntas do teste ou as suas. Conte quantas regras vieram com um ano escrito ao lado da própria regra (o aviso geral do começo não conta) e quantas você conseguiu conferir na lei ou no Portal.",
      material: "1. Qual o limite de faturamento do MEI em [2026]?\n2. Quanto é o DAS este ano?\n3. Até quando tenho que entregar a declaração anual? E se eu atrasar, quanto é a multa?",
      counts: ["Regras com o ano escrito ao lado", "Regras que você conferiu na lei ou no Portal"] },
    { id: "e9", chap: "Capítulo 9", title: "As quatro colunas", text: "Separe da sua lista de clientes só as quatro colunas do material abaixo, ou escreva numa nota essas quatro coisas de cada cliente. Faça o parabéns do mês com o pedido dos dados dos clientes. Conte quantas clientes entraram em cada lista e quantas mensagens dizem algo que só você sabia.",
      material: "Primeiro nome | Aniversário | Última visita | Aceita mensagem\n[primeiro nome] | [dd/mm] | [dd/mm/aaaa] | [sim]\n[primeiro nome] | [dd/mm] | [dd/mm/aaaa] | [não]",
      counts: ["Clientes na lista do aniversário", "Clientes na lista da promoção", "Mensagens que dizem algo que só você sabia"],
      after: "Sem planilha, escreva no bloco de notas do celular." },
    { id: "e10", chap: "Capítulo 10", title: "O insumo que ainda não chegou", text: "Hoje à noite, escreva a lista de três dias da sua próxima semana, de terça a quinta, com o que você sabe e o que não sabe. Se a sua IA aceita o pedido falado, pode falar a lista. Mande à IA com o pedido da semana. Na resposta, conte as produções que começam antes de o insumo chegar e as quantidades do pedido que não saíram de você. Depois, responda as perguntas que ela deixou.",
      material: "De [terça, dia] a [quinta, dia]:\n- [encomenda]: [quantidade], para [dia e hora].\n- [encomenda]: [quantidade], para [dia e hora].\nTenho em estoque: [o que tem, com a quantidade].\nCada [insumo] rende [quanto].\n[O fornecedor] entrega [quando]; chega quando: [não sei].\nNão sei: [o que ainda falta saber].",
      counts: ["Produções que começam antes de o insumo chegar", "Quantidades do pedido que não saíram de você"] },
    { id: "e11", chap: "Capítulo 11", title: "A folga do ano", text: "Some o faturamento de janeiro até o mês passado, com o relatório mensal, o caixa do capítulo 7 ou, se não tiver nenhum dos dois, o caderno ou os Pix de clientes no extrato; a planilha do ano, em Modelos, faz a conta. Divida o que falta para R$ 81 mil pelos meses que faltam e anote a diferença para o seu mês comum, para mais ou para menos. Se você tem a venda de cada produto em três meses, escolha a decisão que está na sua cabeça (um preço, um produto) e peça a análise com o pedido de decidir. Conte quantas suposições a resposta marcou, e decida você.",
      material: "Vendo [produto] a R$ [preço]; o custo de cada um é R$ [custo] (a ficha do capítulo 3).\nVendi por mês: [mês]: [quantos]; [mês]: [quantos]; [mês]: [quantos].\n[O mesmo para os outros produtos, até três.]\nPerda no mês: [o que se jogou fora].\nCustos fixos do mês: [aluguel, gás, DAS, ...].\nFaturamento do ano até [o mês passado]: R$ [valor].",
      counts: ["O que falta para R$ 81 mil, por mês que falta (R$)", "A diferença para o seu mês comum, sem o sinal (R$)", "Suposições que a resposta marcou"],
      after: "Se você ainda não anota a venda por produto, faça só a soma do ano e comece a anotar. Para comparar com o resultado do mês, o salário mínimo de 2026 é de R$ 1.621,00." }
  ];

// ─── The rest of the kit ──────────────────────────────────────────────────

export const KIT = {
    slug: 'ia-no-pequeno-negocio',
    checkedOn: 'Valores do MEI de 2026 lidos nas páginas oficiais em 04/10/2026; a opção de treino de cada IA, em 24/09/2026. Quando um valor, uma regra ou uma página mudar, muda aqui, com a data.',
    lead: 'Os pedidos do livro para preencher e copiar, a ficha da loja, o orçamento com os itens da lei, a política da casa, as planilhas do caixa e do ano, e os valores do MEI de 2026.',
    promises: ['Os pedidos testados no livro', 'Modelos sem dado de ninguém', 'O que você digita fica no seu navegador'],
}

// chapters/introducao.md ("IA aberta, IA da plataforma e atendente automático",
// "O dinheiro, o cliente e a lei") and chapters/dez-coisas-que-nunca-se-cola.md,
// in three rules.
export const RULES = [
    {
        lead: 'Vai a tarefa, não a pessoa.',
        text: 'No pequeno negócio, quem decide o que vai para a IA é você. A ficha da loja, os custos do bolo, a anotação da visita e as linhas do extrato podem ir, sem dados de ninguém. Em nenhuma IA, aberta ou da plataforma, vão o nome completo, o telefone e o CPF do cliente, nem a ficha com a saúde da cliente, nem a senha do banco. Os treinos deste kit usam material inventado ou o seu, sem dados de clientes.',
    },
    {
        lead: 'O dinheiro, o cliente e a lei ficam com você.',
        text: 'O dinheiro, porque a IA não vê a sua conta: pagamento é o dinheiro na conta, conferido no extrato; comprovante é só um papel. O cliente, porque o que se escreve a ele vira oferta e obriga o negócio, escrito por você, pela IA aberta ou pelo atendente automático (CDC, art. 30). A lei, porque a regra do MEI muda de um ano para o outro.',
    },
    {
        lead: 'Confira antes de usar.',
        text: 'Cada pedido traz o que conferir e o que aconteceu no teste. Os pedidos foram testados numa IA; em outra, a resposta muda, e a conferência é a mesma. O dinheiro se confere no extrato, a conta na calculadora, a lei no artigo, e toda resposta sobre regra passa pela mesma pergunta: isso vale para que ano?',
    },
]

// chapters/dez-coisas-que-nunca-se-cola.md: the reason and what to do instead.
export const TEN_THINGS = [
    { title: 'O nome completo, o telefone e o CPF do cliente', text: 'Identificam a pessoa, e nenhuma resposta, orçamento ou cobrança fica melhor com eles. No lugar: o primeiro nome, ou [cliente] e [endereço], completados no celular antes de mandar. O telefone fica com você, porque quem manda a mensagem é você, do WhatsApp do negócio.' },
    { title: 'O dado de saúde da cliente', text: 'A LGPD põe o "dado referente à saúde" entre os dados pessoais sensíveis (art. 5º, II), que se tratam com o consentimento da cliente "de forma específica e destacada, para finalidades específicas" (art. 11, I). Na cozinha é igual: o "sem açúcar porque é diabética" do pedido do bolo é dado de saúde. No lugar: a coluna de observações fica fora da IA; você usa a anotação no atendimento, e a mensagem não precisa dela.' },
    { title: 'A senha e o código do banco', text: 'Com eles alguém entra na sua conta e mexe no dinheiro do negócio e da casa. Nenhum pedido a uma IA precisa da senha do aplicativo, da senha do cartão ou do código que o banco manda por mensagem. E quem pede é golpe. No lugar: a dúvida sobre o banco vai sem senha nenhuma; o que só o banco sabe se vê no aplicativo dele.' },
    { title: 'A chave Pix, o número da conta e o extrato como sai do banco', text: 'O extrato inteiro, o print e o PDF levam o número da conta, o seu nome e o nome completo, às vezes o CPF, de quem pagou e de quem recebeu. E a chave Pix certa é a do aplicativo do banco, não a da conversa. No lugar: do extrato, só as linhas, com a data, a descrição curta e o valor, e os nomes trocados pelo papel. Na mensagem ao cliente, escreva [chave Pix] e ponha a sua antes de mandar.' },
    { title: 'A planilha inteira', text: 'A planilha das clientes junta numa colagem só o nome completo, o telefone, o CPF, o endereço, o gasto, o fiado e a saúde. No lugar: copie para uma aba nova só as colunas que a tarefa pede, e cole essa aba. Corte antes: o teste mediu o efeito de colar menos, e não o de pedir à IA que ignore o que foi colado.' },
    { title: 'O documento e o comprovante do cliente', text: 'A foto do RG ou da CNH e o comprovante de Pix com o nome e o banco de quem pagou trazem a pessoa inteira, inclusive o que você não viu. E a IA não confirma pagamento: quem confere é o extrato. No lugar: o fato, com as suas palavras, como "a cliente mandou o print de um Pix de R$ 180,00".' },
    { title: 'O contrato e o orçamento com o cliente identificado', text: 'São o acordo de vocês dois: "Uma vez aprovado pelo consumidor, o orçamento obriga os contraentes" (CDC, art. 40, § 2º). No lugar: a IA monta o modelo com [cliente], [endereço] e [CPF], e você preenche no celular. A política da casa, que você afixa no balcão, é outra coisa: é pública, e pode ir.' },
    { title: 'A senha do gov.br e o certificado digital', text: 'A conta gov.br é a sua entrada nos serviços do governo pela internet, e o certificado digital é a identidade eletrônica com que uma empresa ou uma pessoa assina documentos e entra em sistemas do governo. Quem tem a senha ou o certificado entra no seu lugar. No lugar: a pergunta sobre a regra vai com a data e com o pedido das obrigações; o que é do seu CNPJ se vê no Portal do Empreendedor, com o endereço digitado por você.' },
    { title: 'A foto da cliente sem a autorização dela', text: 'A imagem é dela: o uso pode ser proibido, a pedido dela, "se se destinarem a fins comerciais" (Código Civil, art. 20). No lugar: para a legenda, os fatos do serviço. A foto da cliente vai para o post só com a autorização dela por escrito, e uma mensagem basta.' },
    { title: 'A conversa privada do cliente', text: 'O print leva o nome, o telefone, a foto do perfil e tudo o que o cliente contou, inclusive o que contou só a você. No lugar: a mensagem copiada, sem o sobrenome e sem o telefone, ou os fatos da venda, sem o print. O atendente automático lê a conversa do cliente: ligá-lo é decidir que a Meta vê essas conversas, e transferir para você não tira a conversa da plataforma.' },
]

export const CAN_GO = [
    'A ficha da loja, com os preços, os tamanhos e a regra da entrega.',
    'Os fatos do salão que você pode provar.',
    'A ficha de custos do bolo, com o seu tempo e a taxa da maquininha.',
    'A anotação da visita, sem o cliente.',
    'As regras da casa que você quer escrever.',
    'Os fatos da cobrança, com o primeiro nome.',
    'As linhas do extrato, sem número de conta e com os nomes trocados.',
    'A pergunta sobre a regra do MEI, com a data de hoje.',
    'As quatro colunas do parabéns do mês.',
    'A lista da semana, com o primeiro nome das clientes.',
    'Os números do caderno, para decidir o próximo passo.',
]

export const IF_PASTED = [
    { title: 'Apague a conversa', description: 'Apagar não desfaz o envio; diminui o que fica na sua conta.' },
    { title: 'Confira a opção de treino', description: 'Veja se as conversas vão para treino, e desligue se der. O caminho de cada IA está mais abaixo, em "O treino com as suas conversas".' },
    { title: 'Se foi senha, troque agora', description: 'Se foi a senha do banco ou do gov.br, troque-a agora, no aplicativo do banco ou no gov.br, digitando o endereço. Se a senha, o código ou o dinheiro foram para um golpista, e não para a IA, o caminho está em "Os endereços oficiais", mais abaixo.' },
    { title: 'Da próxima vez, troque antes', description: 'Se foi dado de cliente, o que muda é dali para a frente: a aba das colunas da tarefa, a coluna de saúde fora, o primeiro nome no lugar do nome completo. Se a cliente perguntar, conte o que aconteceu: ela tem o direito de saber que dados você tem e de pedir que sejam apagados (LGPD, art. 18).' },
]

// o-kit.md, "Qual IA usar" and "IA aberta, IA da plataforma e atendente
// automático".
export const WHICH_AI = [
    { title: 'Qual IA usar', text: 'As tarefas deste livro foram testadas numa IA aberta. Para começar, se você nunca usou: instale uma delas, toque em nova conversa, escreva ou fale o pedido do capítulo, leia a resposta e confira. Todas aceitam o pedido falado, pelo microfone; os testes foram escritos, e o que se confere é igual. No celular, instale só pela loja oficial do telefone e confira o nome de quem publica o aplicativo. Algumas das mais conhecidas, em ordem alfabética pela empresa; a ordem não é um ranking. O volume 1, o IA no dia a dia, ensina esses primeiros gestos com calma, e serve de companhia; não é preciso lê-lo antes.', links: [{ label: 'Claude, da Anthropic', href: 'https://claude.ai/' }, { label: 'Gemini, do Google', href: 'https://gemini.google.com/' }, { label: 'Copilot, da Microsoft', href: 'https://copilot.microsoft.com/' }, { label: 'ChatGPT, da OpenAI', href: 'https://chatgpt.com/' }] },
    { title: 'IA aberta', text: 'A que você usa com uma conta sua, gratuita ou paga, no celular ou no computador: as da lista acima. É onde se faz quase tudo deste livro. Quem decide o que vai é você, e o treino com as suas conversas se confere e, se der, se desliga. A ficha da loja, os custos do bolo, a anotação da visita e as linhas do extrato podem ir, sem dados de ninguém.' },
    { title: 'IA da plataforma', text: 'A que já vem dentro do aplicativo onde o negócio vende ou divulga: a Meta AI, dentro dos aplicativos da Meta, e a IA do aplicativo de arte. Os pedidos deste livro não foram testados nela; ela pode servir para o que não tem dado de cliente, como a legenda com os fatos do produto, e os pedidos do kit podem ser usados lá, com as mesmas conferências. Cada uma tem a sua regra: leia a de cada uma antes de usar. Os termos da Meta para as IAs dela dizem: "Não compartilhe informações que você não queira que as IAs usem e armazenem, como informações sobre tópicos sensíveis." A Meta diz que não usa as mensagens privadas entre pessoas para treinar as IAs dela, a menos que alguém na conversa as compartilhe com elas. No aplicativo de arte, a regra muda com o plano: o Canva, por exemplo, diz que o conteúdo dos planos Teams, Business, Enterprise e Education não é usado para melhorar os recursos de IA; para as contas Free e Pro, não achamos onde ele diz o padrão.', links: [{ label: 'Termos das IAs da Meta', href: 'https://www.facebook.com/legal/br-ai-terms' }, { label: 'Meta, privacidade e IA generativa', href: 'https://www.facebook.com/privacy/genai/' }, { label: 'Canva Shield', href: 'https://www.canva.com/newsroom/news/safe-ai-canva-shield/' }] },
    { title: 'Atendente automático', text: 'A IA da plataforma ligada para responder ao cliente em nome do negócio. Ele lê a conversa do cliente: é para isso que existe, e ligá-lo é decidir que a Meta vê essas conversas. Os termos dele dão à Meta uma "licença perpétua" sobre o que entra nele, e dizem que, depois de passar a conversa para você, os atendentes "poderão continuar observando o conteúdo compartilhado na conversa". Essa licença é dos termos do atendente; não vale para o Instagram nem para o aplicativo de arte. Os mesmos termos dizem que "você, não a Meta, é responsável" pelo uso do que ele gera, e o que ele promete obriga a loja como qualquer oferta (CDC, art. 30). Se ligar, dê a ele a mesma ficha da loja e mande passar para você o que não está nela.', links: [{ label: 'Termos do atendente da Meta', href: 'https://www.facebook.com/legal/3774714022740775' }] },
    { title: 'O que não vai', text: 'Na IA aberta e na IA da plataforma, não vão o CPF, o endereço, o telefone e a saúde do cliente, nem a senha do banco. No atendente automático, o que o cliente escreve já vai, e a decisão é ligá-lo ou não. A lista inteira está em "As dez coisas que nunca se colam", mais acima.' },
    { title: 'Os planos para empresas', text: 'O que cada fornecedor diz dos seus planos para empresas está no kit do volume 3, IA no escritório.', links: [{ label: 'Kit do IA no escritório, volume 3', href: '/books/ia-no-escritorio/kit#empresa' }] },
]

// o-kit.md, "O treino com as suas conversas, na conta pessoal": what each
// company said on 24/09/2026, checked for volume 1.
export const TRAINING = [
    { title: 'Claude, da Anthropic', text: 'Settings › Privacy › Help improve our AI models.', links: [{ label: 'claude.ai', href: 'https://claude.ai/' }, { label: 'Página de ajuda', href: 'https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings' }] },
    { title: 'Gemini, do Google', text: 'Em gemini.google.com, Configurações e ajuda › Atividade › Desativar. Para maiores de 18 anos, a opção vem ligada.', links: [{ label: 'gemini.google.com', href: 'https://gemini.google.com/' }, { label: 'Página de ajuda', href: 'https://support.google.com/gemini/answer/13278892?hl=pt-BR' }] },
    { title: 'Copilot, da Microsoft', text: 'Na versão nova do aplicativo, a Microsoft diz que as conversas não treinam os modelos de base, e não há opção de treino para desligar.', links: [{ label: 'copilot.microsoft.com', href: 'https://copilot.microsoft.com/' }, { label: 'Histórico de atividade', href: 'https://support.microsoft.com/en-us/privacy/microsoft-copilot/activity-history' }, { label: 'Controles de privacidade', href: 'https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls' }] },
    { title: 'ChatGPT, da OpenAI', text: 'Settings › Data Controls › desligar Improve the model for everyone, segundo a página de ajuda da OpenAI.', links: [{ label: 'chatgpt.com', href: 'https://chatgpt.com/' }, { label: 'Página de ajuda', href: 'https://help.openai.com/en/articles/7730893-data-controls-faq' }] },
]

const PLANALTO = {
    lc123: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm',
    lc214: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm',
    cdc: 'https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm',
    cc: 'https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm',
    lgpd: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm',
    salario: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12797.htm',
    fgts: 'https://www.planalto.gov.br/ccivil_03/leis/l8036consol.htm',
    ecommerce: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm',
    preco: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13455.htm',
    desconto: 'https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/lei/l10.962.htm',
}

const PORTAL = {
    home: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor',
    faq: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/perguntas-frequentes',
    das: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/pagamento-de-contribuicao-mensal',
    dasn: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/declaracao-anual-de-faturamento',
    relatorio: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/relatorio-mensal',
    nota: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/nota-fiscal',
    fraude: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/orietacoes-sobre-fraude',
    simples: 'https://www8.receita.fazenda.gov.br/SimplesNacional/',
    valores: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Noticias/NoticiaCompleta.aspx?id=c3b2044c-ff97-432a-b33c-ecf2a3df6dc3',
    pgmeiFraude: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Noticias/NoticiaCompleta.aspx?id=69f19148-20cc-42b6-9366-d15018d353b2',
    rtc2026: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Noticias/NoticiaCompleta.aspx?id=e595d010-1e04-4c3b-95d9-185fc58594b5',
}

// o-kit.md, "Os valores de 2026": official pages read on 04/10/2026.
export const VALUES_2026 = [
    { title: 'Salário mínimo', text: 'R$ 1.621,00 por mês, desde 1º de janeiro de 2026 (Decreto 12.797/2025, art. 1º). É a base do DAS e do custo do empregado.', links: [{ label: 'Decreto 12.797/2025', href: PLANALTO.salario }] },
    { title: 'O valor da hora', text: 'Quanto vale a sua hora é você quem decide. Um ponto de partida para pensar, se você ainda não tem um número, é o salário mínimo dividido pelas horas que você trabalha no mês. Com 8 horas por dia em 22 dias, são 176 horas: R$ 1.621,00 ÷ 176 = R$ 9,21 por hora. Essa conta usa as horas que você trabalha; não é o mínimo da lei. O salário mínimo por hora de 2026, o dos contratos de trabalho, é de R$ 7,37, calculado sobre 220 horas por mês. É uma conta para começar, e não uma recomendação: a hora é sua, e o seu ofício pode valer mais.' },
    { title: 'O DAS do MEI, como se compõe', text: 'É um valor fixo por mês, "independentemente da receita bruta" (LC 123, art. 18-A). Em 2026, são R$ 81,05 de INSS (5% do salário mínimo), mais R$ 5,00 de ISS para quem presta serviço e R$ 1,00 de ICMS para quem vende mercadoria.', links: [{ label: 'Portal do Simples, valores de 2026', href: PORTAL.valores }] },
    { title: 'DAS de comércio e indústria', text: 'R$ 82,05 por mês em 2026.' },
    { title: 'DAS de serviços', text: 'R$ 86,05 por mês em 2026.' },
    { title: 'DAS de comércio e serviços', text: 'R$ 87,05 por mês em 2026.' },
    { title: 'DAS do MEI caminhoneiro', text: 'O INSS é de 12% do salário mínimo, R$ 194,52, e o DAS vai de R$ 195,52 a R$ 200,52.', links: [{ label: 'Perguntas frequentes do Portal', href: PORTAL.faq }] },
    { title: 'O vencimento e os benefícios', text: 'O DAS vence "até o dia 20 de cada mês, passando para o dia útil seguinte" se cair em fim de semana ou feriado. É o DAS em dia que garante os benefícios do INSS, como a aposentadoria e o auxílio-doença: "basta pagar a contribuição mensal (DAS) em dia e cumprir a carência necessária para cada um". Se o esquecimento é o problema, o débito automático é um dos canais do DAS.', links: [{ label: 'Perguntas frequentes do Portal', href: PORTAL.faq }, { label: 'Pagamento do DAS, no Portal', href: PORTAL.das }] },
    { title: 'O limite do MEI', text: 'Em 2026, MEI é quem faturou no ano anterior "até R$ 81.000,00" (LC 123, art. 18-A, § 1º). No ano em que abriu, são R$ 6.750,00 por mês de atividade, contando o mês incompleto como inteiro (§ 2º). Quem passa do limite em até 20%, ou até R$ 97.200,00 no ano, continua MEI até dezembro e sai em 1º de janeiro (§ 7º, III, a); comunica o excesso até o último dia útil do mês seguinte ao do excesso e paga a diferença "sem acréscimos" com o DAS de janeiro (§ 10). Acima de 20%, os efeitos voltam a 1º de janeiro do ano do excesso (§ 7º, III, b). Os R$ 130 mil são do PLP 108/2021, um projeto que estava "Aguardando Parecer" na Câmara em 24 de agosto de 2026. Projeto não é lei; se virar lei, este kit muda.', links: [{ label: 'LC 123', href: PLANALTO.lc123 }, { label: 'PLP 108/2021, na Câmara', href: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2295251' }] },
    { title: 'Os prazos de 2026', text: 'O DAS do mês, até o dia 20 de cada mês (ou o dia útil seguinte). O Relatório Mensal de Receitas Brutas, até o dia 20 do mês seguinte às vendas, guardado com as notas por 5 anos. A declaração anual (DASN-SIMEI), até 31 de maio, sobre o ano anterior, mesmo sem faturamento. O excesso do limite, comunicado até o último dia útil do mês seguinte ao do excesso (LC 123, art. 18-A, § 7º, III). O calendário está também em Modelos.', links: [{ label: 'Relatório mensal', href: PORTAL.relatorio }, { label: 'Declaração anual', href: PORTAL.dasn }] },
    { title: 'A multa da declaração atrasada', text: '2% por mês sobre os tributos declarados, até 20%. Na entrega espontânea, cai à metade, mas sem passar do mínimo de R$ 50,00 (LC 123, art. 38, §§ 2º e 6º). O Portal diz o mesmo: "caso o valor seja inferior a R$ 50,00, o valor da multa será de R$ 50,00, pois este é o valor mínimo". A multa de "R$ 25,00" que a IA deu no teste não existe.', links: [{ label: 'Declaração anual, no Portal', href: PORTAL.dasn }] },
    { title: 'A declaração de 2025', text: 'É a que se entregou até 31 de maio de 2026, sobre o que entrou em 2025. Para entregar ou ver a sua, use a página "Declaração Anual de Faturamento" do Portal do Empreendedor. O botão "Entregar Declaração Anual de Faturamento" leva ao serviço, que pede a sua identificação (página lida em 4 de outubro de 2026).', links: [{ label: 'Declaração Anual de Faturamento', href: PORTAL.dasn }] },
    { title: 'O custo do empregado do MEI', text: 'O MEI pode ter um único empregado, que receba "exclusivamente um salário mínimo ou o piso salarial da categoria profissional" (LC 123, art. 18-C). Além do salário, o MEI recolhe 3% de INSS sobre o salário (art. 18-C, § 1º, III) e deposita 8% de FGTS (Lei 8.036/1990, art. 15). Com o salário mínimo de 2026: R$ 48,63 mais R$ 129,68, ou R$ 178,31 por mês, o mesmo número que o FAQ do Portal do Empreendedor dá. O próprio FAQ tem trechos que se contradizem sobre esse custo e sobre a guia: antes de contratar, confirme com o contador.', links: [{ label: 'LC 123', href: PLANALTO.lc123 }, { label: 'Lei 8.036/1990', href: PLANALTO.fgts }, { label: 'Perguntas frequentes do Portal', href: PORTAL.faq }] },
]

// o-kit.md, "2026 e a partir de 2027".
export const RULES_2027 = [
    { title: 'Nota para cliente com CNPJ', text: 'Em 2026: obrigatória. A partir de 1º de janeiro de 2027: obrigatória.' },
    { title: 'Nota para o consumidor final', text: 'Em 2026: dispensada (LC 123, art. 26, § 6º, II). A partir de 1º de janeiro de 2027: obrigatória: "será obrigatória a emissão de documento fiscal nas vendas e nas prestações de serviços realizadas pelo MEI".' },
    { title: 'Por onde se emite', text: 'Em 2026: pelos emissores da página de nota fiscal do Portal do Empreendedor. A partir de 1º de janeiro de 2027: serviço, a NFS-e de padrão nacional, pelo emissor gratuito do governo; mercadoria, a Nota Fiscal Fácil (NFF), que a regulamentação põe como preferencial e gratuita.' },
    { title: 'IBS e CBS', text: 'Em 2026: o MEI fica fora do teste de 2026 (LC 214, art. 348, III, c). A partir de 1º de janeiro de 2027: em valor fixo dentro do DAS (LC 214, Anexo XXIII). Para 2027 e 2028, o Anexo XXIII fixa R$ 0,994 de CBS e R$ 0,006 de IBS. Quanto isso muda o DAS de cada MEI depende de regulamentação que o livro não leu; este kit diz quando sair.' },
    { title: 'Limite de faturamento', text: 'Em 2026: R$ 81 mil. A partir de 1º de janeiro de 2027: o mesmo, enquanto nenhuma lei complementar o mudar.' },
    { title: 'Declaração anual', text: 'Em 2026: até 31 de maio; multa mínima de R$ 50,00. A partir de 1º de janeiro de 2027: multa mínima de R$ 50,00.' },
    { title: 'A nota a partir de 2027, na prática', text: 'Para serviço, a nota é a NFS-e de padrão nacional, que o MEI de serviço já emite para cliente com CNPJ pelo emissor gratuito do governo, nas formas do sistema nacional. Para mercadoria, "a regulamentação prevê a utilização preferencial e gratuita da Nota Fiscal Fácil (NFF)", diz o Portal do Simples em 12 de agosto de 2026. Os dois caminhos estão na página de nota fiscal do Portal do Empreendedor, em "Emitir Nota Fiscal de Serviço" e "Emitir Nota Fiscal de Produto". Dá para abrir o emissor uma vez ainda em 2026, com calma, antes de virar obrigação; quando sair regra nova, este kit atualiza, com a data.', links: [{ label: 'Portal da NFS-e, o MEI', href: 'https://www.gov.br/nfse/pt-br/noticias/resolucao-cgsn-no-169-traz-novos-beneficios-ao-mei' }, { label: 'Portal do Simples, 12/08/2026', href: PORTAL.rtc2026 }, { label: 'Nota fiscal, no Portal do Empreendedor', href: PORTAL.nota }] },
    { title: 'Se você é ME ou EPP', text: 'A sua guia, a sua declaração e a sua nota têm outras regras, que o contador cuida; a multa mínima da declaração atrasada, por exemplo, é de R$ 200,00 (LC 123, art. 38, § 3º). Na reforma, as empresas do Simples Nacional "somente passarão a destacar o IBS e a CBS em seus documentos fiscais a partir de 2027", diz o Comitê Gestor do IBS.', links: [{ label: 'Comitê Gestor do IBS', href: 'https://www.cgibs.gov.br/reforma-tributaria-comeca-em-2026-com-periodo-de-adaptacao-destaque-informativo-dos-novos-tributos-e-dispensa-de-penalidades' }] },
]

// o-kit.md, "Os endereços oficiais".
export const ADDRESSES = [
    { title: 'Portal do Empreendedor', text: 'gov.br/mei, que leva ao endereço abaixo. Tem o DAS, a declaração anual, o relatório mensal, a nota fiscal e as perguntas frequentes.', links: [{ label: 'gov.br/empresas-e-negocios/pt-br/empreendedor', href: PORTAL.home }] },
    { title: 'Portal do Simples Nacional', text: 'O PGMEI, que gera o DAS, e a declaração anual estão lá. "O link deve conter "receita.fazenda.gov.br"", diz o Portal do Empreendedor.', links: [{ label: 'Portal do Simples Nacional, em www8.receita.fazenda.gov.br', href: PORTAL.simples }] },
    { title: 'O DAS também sai', text: 'Pelo App MEI, pelo Totem Sebrae ou pelo débito automático.', links: [{ label: 'Perguntas frequentes do Portal', href: PORTAL.faq }] },
    { title: 'O CNPJ do DAS na prévia do Pix', text: '00.394.460/0058-87. "Qualquer outro é fraudulento", avisa o Portal do Simples. Salve no celular com o nome "DAS verdadeiro".', links: [{ label: 'O aviso do Portal do Simples', href: PORTAL.pgmeiFraude }] },
    { title: 'As leis', text: 'No planalto.gov.br, pelo número: a LC 123 e o Código de Defesa do Consumidor.', links: [{ label: 'planalto.gov.br', href: 'https://www.planalto.gov.br/' }, { label: 'LC 123', href: PLANALTO.lc123 }, { label: 'Código de Defesa do Consumidor', href: PLANALTO.cdc }] },
    { title: 'A LGPD do pequeno negócio', text: 'A Resolução CD/ANPD nº 2/2022, no gov.br/anpd.', links: [{ label: 'Resolução CD/ANPD nº 2/2022', href: 'https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022' }] },
    { title: 'O Comitê Gestor do IBS', text: 'cgibs.gov.br.', links: [{ label: 'cgibs.gov.br', href: 'https://www.cgibs.gov.br/' }] },
    { title: 'A nota fiscal', text: 'A página de nota fiscal do Portal do Empreendedor, com os emissores de nota de serviço e de produto.', links: [{ label: 'Nota fiscal, no Portal', href: PORTAL.nota }] },
    { title: 'O Registrato, do Banco Central', text: 'Mostra em que bancos há conta, empréstimo e chave Pix no seu nome. Entra-se com a conta gov.br prata ou ouro, os níveis com mais conferência da sua identidade, e com a verificação em duas etapas ligada. Se mandou documento a um golpista, acompanhe ali.', links: [{ label: 'Registrato', href: 'https://www.bcb.gov.br/meubc/registrato' }] },
    { title: 'Se já pagou um DAS falso', text: '"O Portal do Empreendedor não envia mensagens ou qualquer correspondência que exija algum pagamento." Se já pagou um DAS falso, avise o banco pelo aplicativo e conteste o Pix: quanto antes, maior a chance. Guarde o boleto e as mensagens, e registre boletim de ocorrência.', links: [{ label: 'Portal do Empreendedor, fraude', href: PORTAL.fraude }, { label: 'CERT.br, golpes: o que fazer (PDF)', href: 'https://cartilha.cert.br/fasciculos/golpes-o-que-fazer/fasciculo-golpes-o-que-fazer.pdf' }, { label: 'Ministério da Justiça, boleto falso', href: 'https://www.gov.br/mj/pt-br/acesso-a-informacao/acoes-e-programas/sofri-um-golpe-e-agora/paguei-boletos-ou-ofertas-que-se-mostraram-falsos' }] },
]

// o-kit.md, "As leis do cliente em uma régua".
const CDC = { label: 'CDC', href: PLANALTO.cdc }
const CC = { label: 'Código Civil', href: PLANALTO.cc }
export const CUSTOMER_RULER = [
    { title: 'Troca sem defeito', text: 'Não há artigo que obrigue; na loja, vale a sua política, e a política anunciada obriga (CDC, art. 30).', links: [CDC] },
    { title: 'Arrependimento', text: 'Só na venda "fora do estabelecimento comercial", como pelo Instagram e pelo WhatsApp: 7 dias do recebimento, sem motivo, com tudo de volta, "a qualquer título", o frete também (CDC, art. 49 e parágrafo único).', links: [CDC] },
    { title: 'Como desistir, na venda pela internet', text: 'Informar "de forma clara e ostensiva" como a cliente exerce o arrependimento (Decreto 7.962/2013, art. 5º).', links: [{ label: 'Decreto 7.962/2013', href: PLANALTO.ecommerce }] },
    { title: 'Defeito', text: '30 dias para reclamar no produto ou no serviço não durável, 90 no durável, da entrega ou do fim do serviço; defeito escondido, de quando aparece. Prazo de reclamar maior que o da lei pode; menor, não: se não sabe em qual dos dois o seu produto entra, escrever 90 dias cumpre os dois casos (CDC, arts. 26, I e II, §§ 1º e 3º, e 51, I).', links: [CDC] },
    { title: 'Defeito não resolvido', text: 'Em 30 dias, a cliente escolhe outro produto, o dinheiro de volta ou o abatimento (CDC, art. 18, § 1º).', links: [CDC] },
    { title: 'Garantia', text: '"Independe de termo expresso"; cláusula que diminui a responsabilidade por defeito é nula (CDC, arts. 24 e 51, I).', links: [CDC] },
    { title: 'Oferta', text: 'A informação "suficientemente precisa" obriga, escrita por você, pela IA ou pelo atendente automático (CDC, arts. 30 e 35).', links: [CDC] },
    { title: 'Anúncio', text: 'Proibida a publicidade "inteira ou parcialmente falsa"; a prova é de quem anuncia (CDC, arts. 37, § 1º, e 38).', links: [CDC] },
    { title: 'Orçamento de serviço', text: 'Mão de obra, material, pagamento, início e término; validade de 10 dias do recebimento, se não houver outra; aprovado, obriga. A garantia do serviço segue a linha do defeito (CDC, arts. 40 e 26).', links: [CDC] },
    { title: 'Preço no cartão', text: 'Cobrar diferente no Pix e no cartão é permitido, com o desconto "em local e formato visíveis" (Lei 13.455/2017, art. 1º; Lei 10.962/2004, art. 5º-A).', links: [{ label: 'Lei 13.455/2017', href: PLANALTO.preco }, { label: 'Lei 10.962/2004', href: PLANALTO.desconto }] },
    { title: 'Sinal', text: 'Entra no preço; se a cliente desiste, a loja pode retê-lo; se a loja falha, devolve "mais o equivalente". Na encomenda pelo WhatsApp vale também o arrependimento do art. 49, que não traz exceção escrita para a encomenda personalizada ou perecível: combine por escrito, antes de produzir, o pedido, o sinal e até quando a cliente pode desistir, e guarde a conversa (Código Civil, arts. 417 e 418, I e II; CDC, art. 49).', links: [CC, CDC] },
    { title: 'Cobrança', text: 'Sem ridículo, constrangimento ou ameaça; com ameaça ou exposição, é crime (CDC, arts. 42 e 71).', links: [CDC] },
    { title: 'Documento de cobrança', text: 'Nome, endereço e CPF ou CNPJ de quem cobra (CDC, art. 42-A).', links: [CDC] },
    { title: 'Cadastro de devedor', text: 'Comunicação por escrito à cliente (CDC, art. 43, § 2º).', links: [CDC] },
    { title: 'Juros e multa', text: 'Multa só se combinada; juros pela "taxa legal" (Código Civil, arts. 406, 408 e 409).', links: [CC] },
    { title: 'Dado de saúde do cliente', text: 'Dado sensível; consentimento "de forma específica e destacada" (LGPD, arts. 5º, II, e 11, I).', links: [{ label: 'LGPD', href: PLANALTO.lgpd }] },
]

// o-kit.md, "Como ler uma lei".
export const READ_A_LAW = [
    { title: '1. Abra a lei pelo endereço direto', text: 'No planalto.gov.br, o site oficial das leis. A LC 123 e o Código de Defesa do Consumidor estão em "Os endereços oficiais", mais acima; o Código Civil, no endereço abaixo.', links: [{ label: 'Código Civil', href: PLANALTO.cc }] },
    { title: '2. Ache o artigo pela busca da página', text: 'No computador, use a busca do navegador; no celular, "Localizar na página", no menu do navegador. Digite o número como ele aparece: "Art. 18-A".' },
    { title: '3. Leia as partes do artigo', text: 'O caput é o texto principal, logo depois do número. O sinal § quer dizer parágrafo: "§ 1º" é o parágrafo primeiro, e, quando há um só, ele se chama "parágrafo único". Os incisos são os itens em algarismos romanos, I, II, III; as alíneas, as letras a, b, c.' },
    { title: '4. Pule o riscado', text: 'O texto riscado não vale mais; vale o que vem sem risco, com a nota "(Redação dada pela Lei Complementar...)". A LC 123 tem muito texto riscado.' },
    { title: '5. Veja de quando vale', text: 'Uma redação pode estar na lei e só valer depois: as mudanças da LC 214 no MEI valem a partir de 1º de janeiro de 2027.', links: [{ label: 'LC 214', href: PLANALTO.lc214 }] },
    { title: '6. Valor do ano não se confere na lei', text: 'A LC 123 ainda mostra, no art. 18-A, § 3º, V, o valor "R$ 45,65", sem risco; o DAS de 2026 está mais acima, com a fonte.' },
]

// o-kit.md, "Onde conferir o que a IA não sabe".
export const SOURCES = [
    { title: 'A regra do MEI do ano', text: 'O Portal do Empreendedor e o Portal do Simples, e a LC 123, no planalto.gov.br. A página de nota fiscal do Portal ainda dizia "Para 2023 haverá a padronização nacional da NFS-e"; página com ano velho se lê com a lei ao lado. A regra do MEI está na LC 123, mesmo quando a IA citar outra lei que a mudou.', links: [{ label: 'Portal do Empreendedor', href: PORTAL.home }, { label: 'Portal do Simples Nacional', href: PORTAL.simples }, { label: 'LC 123', href: PLANALTO.lc123 }] },
    { title: 'O dinheiro', text: 'No extrato ou no aplicativo do banco, nunca no comprovante nem na resposta da IA. A chave Pix se copia do aplicativo do banco.', links: [] },
    { title: 'A conta', text: 'Na calculadora do celular, com os números da sua ficha: o preço, o orçamento, o saldo do caixa, o mês e o ano.', links: [] },
    { title: 'A lei do cliente', text: 'No artigo, pela régua mais acima: o Código de Defesa do Consumidor, a Lei 8.078/1990; o Código Civil, a Lei 10.406/2002; a LGPD, a Lei 13.709/2018.', links: [{ label: 'CDC', href: PLANALTO.cdc }, { label: 'Código Civil', href: PLANALTO.cc }, { label: 'LGPD', href: PLANALTO.lgpd }] },
    { title: 'O fornecedor que mudou de conta', text: 'No número que você já tinha, antes de pagar.', links: [] },
    { title: 'O que é do seu caso, e não da regra', text: 'O desenquadramento (a saída do MEI), a dívida antiga, o empregado, o custo de virar ME. É hora do contador, com os seus números na mão.', links: [] },
    { title: 'Se você já é ME ou EPP', text: 'A guia, a declaração, a nota e a folha são com o contador. Os pedidos deste livro servem trocando "sou MEI" por "sou ME do Simples" e a atividade (não testado), e a pergunta "isso vale para que ano?" vale igual.', links: [] },
]

export const UPDATES = [
    { date: '04/10/2026', text: 'O kit online acompanha o livro, com os pedidos testados em 04/10/2026, os modelos, as planilhas, os treinos e o caderno. Valores do MEI de 2026 lidos nas páginas oficiais em 04/10/2026.' },
]

// ─── The kit as one object, for pages/BookKit.jsx ─────────────────────────
//
// The same shape as data/kit-ia-no-primeiro-trabalho.js: the parts every kit
// has and `bands`, the sections only this book has, in order, between the
// templates and the exercises. Icons are named, and must be in ICONS of
// BookKit. The bands alternate gray and white, starting gray after the
// templates (white) and ending white before the exercises (gray).

const steps = (items, icons) => items.map((item, index) => ({ ...item, icon: icons[index] }))
const criteria = items => items.map(item => ({ criterion: item.title, value: item.text, ...(item.links?.length ? { links: item.links } : {}) }))

export default {
    slug: 'ia-no-pequeno-negocio',
    // The localStorage prefix of this kit: changing it later would lose what
    // readers typed.
    storage: 'kit-neg',
    testedOn: '4 de outubro de 2026',
    // o-kit.md of the book up to 1.0.0, "Os pedidos deste livro": the lines that left the book in 1.1.0
    // (12/10/2026) and live here now.
    promptsNote: 'Ficam como estão os colchetes que a IA deve usar na resposta: [confirmar: ...], [preencher: ...], [conferir], [negócio], [casa] e [não sei]. Antes de colar qualquer material, tire o que a lista das dez coisas manda tirar.',
    exercisesNote: 'Nos capítulos 3, 4 e 8, é o material do próprio teste, de um negócio inventado, adaptado para caber no celular (no 4, sem a cliente e com a pontuação simplificada; no 8, três das seis perguntas); nos outros, um modelo com a mesma forma, não testado.',
    workAI: 'IA que você escolheu, e sem dado de cliente: vai a tarefa, não a pessoa',
    // A stand-in for the catalogue entry, used only in development when the
    // book (launching on 10/10/2026) is missing from data/books.json.
    preview: { title: 'IA no pequeno negócio', subtitle: 'Do WhatsApp ao caixa, para o MEI e o pequeno empresário', volume: 5, kit: { label: 'Kit online' } },
    testedNote: 'Conversas com uma mesma IA, numa configuração neutra, em 04/10/2026. Os pedidos foram testados numa IA; em outra, a resposta muda, e a conferência é a mesma. No seu aplicativo, com a memória e as configurações dele, a resposta também pode sair diferente.',
    KIT,
    RULES,
    TASKS,
    TEMPLATES,
    EXERCISES,
    SOURCES,
    UPDATES,
    bands: [
        {
            type: 'criteria',
            id: 'dez',
            subtitle: 'Antes de colar',
            title: 'As dez coisas que nunca se colam',
            description: 'Elas não vão para a IA aberta, a que você usa com uma conta sua, nem para a IA da plataforma, a que vem dentro do WhatsApp Business, do Instagram ou do aplicativo de arte. No pequeno negócio, quem decide o que vai é você; mas o dado do cliente não é seu: é dele, e você responde por ele.',
            items: TEN_THINGS.map((thing, index) => ({ criterion: `${index + 1}. ${thing.title}`, value: thing.text })),
            background: 'gray',
        },
        {
            type: 'callout',
            id: 'pode-ir',
            subtitle: 'O que pode ir',
            title: 'Quase tudo o que o livro mostrou foi feito sem nenhuma das dez',
            cardLabel: 'Pode ir para a IA',
            items: CAN_GO.map(text => ({ lead: '', text })),
            footnote: { lead: 'Anexar é colar tudo.', text: 'Uma foto, um PDF ou um print levam para a conversa o documento inteiro, com o que você não viu: o CPF no canto, a outra aba, o número da conta. Anexe só o que você colaria linha por linha. Troque os dados antes de colar: se você pede para a IA esquecer um nome, ele já foi.' },
            background: 'white',
        },
        {
            type: 'steps',
            id: 'se-ja-colou',
            subtitle: 'Se já colou',
            title: 'Sem alarme, em quatro passos',
            items: steps(IF_PASTED, ['IconTrash', 'IconShieldCheck', 'IconBuildingBank', 'IconCheck']),
            background: 'gray',
        },
        {
            type: 'criteria',
            id: 'qual-ia',
            subtitle: 'Qual IA usar',
            title: 'IA aberta, IA da plataforma e atendente automático',
            description: 'O livro usa três nomes, sempre os mesmos. Dado de cliente não vai para a IA aberta nem para a da plataforma.',
            items: criteria(WHICH_AI),
            background: 'white',
        },
        {
            type: 'criteria',
            id: 'treino',
            subtitle: 'As IAs e as configurações',
            title: 'O treino com as suas conversas, na conta pessoal',
            description: 'Os testes deste livro foram feitos com uma delas, o Claude Sonnet 4.6. Numa conta pessoal, o que você escreve pode ser usado para treinar a IA. Onde fica a opção, pelo que cada empresa dizia em 24 de setembro de 2026, conferido para o volume 1, em ordem alfabética pela empresa; a ordem não é um ranking.',
            items: criteria(TRAINING),
            note: 'Algumas páginas estão em inglês; no aplicativo em português, os nomes aparecem traduzidos. Antes de mudar uma configuração, confira de novo na página de ajuda: os nomes e os caminhos mudam de um mês para outro. A memória, a conversa temporária e o histórico de cada uma estão no kit do volume 1, IA no dia a dia.',
            background: 'gray',
        },
        {
            type: 'criteria',
            id: 'valores-2026',
            subtitle: 'O que muda todo ano',
            title: 'Os valores do MEI de 2026',
            description: 'Lidos nas páginas oficiais em 4 de outubro de 2026. Mudam todo ano: antes de usar, confira de novo. Na microempresa (ME) e na empresa de pequeno porte (EPP) do Simples Nacional, o imposto é uma porcentagem da receita (LC 123, art. 18), e o valor do mês vem do contador.',
            items: criteria(VALUES_2026),
            background: 'white',
        },
        {
            type: 'criteria',
            id: 'a-partir-de-2027',
            subtitle: 'Entre duas regras',
            title: '2026 e a partir de 2027',
            description: 'A Lei Complementar 214/2025 muda o MEI a partir de 1º de janeiro de 2027 (art. 517).',
            items: criteria(RULES_2027),
            note: 'Quando a regulamentação sair, este kit muda, com a data.',
            background: 'gray',
        },
        {
            type: 'criteria',
            id: 'enderecos',
            subtitle: 'Para digitar',
            title: 'Os endereços oficiais',
            description: 'Para digitar, nunca para copiar da resposta da IA nem do primeiro resultado do buscador. No teste do capítulo 8, 3 das 6 respostas inventaram um endereço ou um aplicativo oficial.',
            items: criteria(ADDRESSES),
            background: 'white',
        },
        {
            type: 'criteria',
            id: 'regua',
            subtitle: 'As leis do cliente em uma régua',
            title: 'O que o CDC e o Código Civil dizem nas tarefas do livro',
            description: 'Não muda todo ano, mas a lei pode mudar: confira o artigo antes de imprimir uma regra.',
            items: criteria(CUSTOMER_RULER),
            note: 'O orçamento vai escrito, mesmo quando a conversa foi por áudio: é o escrito que fica, para você e para o cliente. A venda que começa no Instagram e termina no balcão, a lei não trata pelo nome; na dúvida, escreva a regra mais favorável à cliente ou pergunte ao Procon da sua cidade. Num caso concreto que a régua não resolve, como o sinal de uma encomenda já começada, a dúvida vai ao Procon ou a um advogado.',
            background: 'gray',
        },
        {
            type: 'criteria',
            id: 'ler-lei',
            subtitle: 'Quando a IA, o Portal ou o livro cita uma lei',
            title: 'Como ler uma lei',
            description: 'Não é preciso ler a lei toda: procure o artigo que a IA, o Portal ou o capítulo citou.',
            items: criteria(READ_A_LAW),
            background: 'white',
        },
    ],
}
