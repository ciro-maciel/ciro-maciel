/**
 * The online kit of "IA no dia a dia" (volume 1), as data. The page is
 * pages/BookKit.jsx, at /books/ia-no-dia-a-dia/kit.
 *
 * Written on 19/11/2026 from the 1.0.1 book (learning/ia-no-dia-a-dia), word
 * for word: the prompts are the tested forms the book prints (chapters 2, 4,
 * 5 and 6, and "Dez pedidos para usar amanhã", all run on 24/09/2026), with
 * the material in {fields}; every check and every result is the book's, with
 * its own numbers and dates. Where the book reports no finding for a prompt,
 * the result says so instead of inventing one. The AI settings are the ones
 * chapters/o-kit.md checked on the official pages on 24/09/2026.
 */

export const TASKS = [
    { id: 'quatro-partes', chap: 'Capítulo 2', name: 'Montar um pedido em quatro partes',
      tpl: '{contexto} {objetivo} {exemplo} {formato}',
      fields: [
          { k: 'contexto', label: '1. Quem sou eu, e para quem é?', ph: 'quem sou eu, e para quem é', area: true, hint: 'O contexto: o seu trabalho, a pessoa que vai ler, a situação. "Trabalho no atendimento de uma loja de móveis planejados. A cliente é a dona Célia, que comprou uma cozinha."' },
          { k: 'objetivo', label: '2. O que eu preciso?', ph: 'o que eu preciso', area: true, hint: 'O objetivo, com os fatos que a IA não tem como adivinhar. "Prometemos a entrega para o dia 10, mas o fornecedor atrasou o tampo de granito, e a nova data é dia 24."' },
          { k: 'exemplo', label: '3. Como é o bom?', ph: 'como é o bom', area: true, hint: 'Um exemplo do jeito certo: uma frase sua, um texto que já deu certo, o tom que você usa. "Eu escrevo assim para os clientes: \'Oi, dona Célia, tudo bem? Aqui é a Renata, da loja.\'"' },
          { k: 'formato', label: '4. Como eu quero receber?', ph: 'como eu quero receber', hint: 'O formato: o tamanho, o canal, a forma. "Para mandar pelo WhatsApp, curta, com no máximo seis linhas." E diga o que ela não deve inventar.' },
      ],
      checks: ['Tudo o que compromete você ou a empresa: um desconto, um prazo, uma compensação', 'O "geralmente" ao lado de um fato: é para conferir', 'No ajuste, diga o que mudar ("mais curto", "sem \'a senhora\'"), e não só que não gostou', 'Depois do ajuste, se ela mudou só o que você pediu', 'O que você não apontou: a IA não adivinha'],
      result: 'Sem as quatro partes, a mensagem saiu com "Prezado(a) Cliente", espaços em branco para o motivo e a nova data e, numa de duas vezes, a sugestão de um desconto que ninguém na loja autorizou. Com as quatro, chegou bem mais perto; mais duas rodadas de ajuste a deixaram do jeito da Renata, e o "Pedimos desculpas", no plural, ficou até o fim, porque ninguém pediu para mudar.',
      privacy: 'Antes de pedir: posso colar isto numa IA? Nome de cliente, documento, número da empresa: o capítulo 4 diz o que nunca colar.' },
    { id: 'golpe', chap: 'Capítulo 4', name: 'Perguntar se uma mensagem é golpe',
      tpl: 'Recebi esta mensagem {onde}, de um número que eu não conheço, {com}: "{mensagem}". Isso é golpe?',
      fields: [
          { k: 'onde', label: 'Por onde chegou', ph: 'no WhatsApp' },
          { k: 'com', label: 'Com o quê', ph: 'com a foto da minha filha', hint: 'A foto, o nome ou a voz de quem a mensagem diz ser.' },
          { k: 'mensagem', label: 'A mensagem', ph: 'cole a mensagem', area: true, hint: 'No teste: "Oi mãe, troquei de número, salva esse. [...] Consegue fazer um Pix de R$ 1.850 pra essa chave? Te devolvo amanhã sem falta".' },
      ],
      checks: ['Pare: nenhum pedido de dinheiro por mensagem precisa ser atendido nos próximos cinco minutos', 'Ligue você, por voz, para um número que você já tinha, ou fale com outra pessoa da família', 'Não responda pela mesma conversa, nem se a mensagem vier do número de sempre', 'Pergunte a senha combinada com a família', 'Nenhum código de verificação passado a ninguém', 'Boleto: o nome e o CPF ou CNPJ de quem recebe, o valor e o vencimento', 'Bloqueie e denuncie o número, e avise a pessoa cuja foto ou voz foi usada'],
      result: 'A IA acertou: disse que era quase certamente um golpe, mandou não fazer o Pix e ligar para a filha no número antigo, ou para alguém da família que tenha contato com ela. É um bom segundo olhar, mas quem confirma se a filha trocou de número não é a IA; é a filha.',
      privacy: 'Se o pedido vier em nome do banco, a regra é parecida: desligue e entre em contato com o banco pelos canais oficiais, de outro telefone.' },
    { id: 'limites', chap: 'Capítulo 5', name: 'Responder a um cliente sem prometer por você',
      tpl: 'Responda este e-mail de cliente para mim. Trabalho {onde}. Não prometa prazo, compensação nem reembolso: isso quem decide é {quem}. Diga só que eu vou verificar o pedido e retorno {quando}.\n\n{email}',
      fields: [
          { k: 'onde', label: 'Onde você trabalha', ph: 'no atendimento da loja' },
          { k: 'quem', label: 'Quem decide', ph: 'o gerente', hint: 'Se a loja é sua, quem decide é você.' },
          { k: 'quando', label: 'Quando você retorna', ph: 'até amanhã às 12h', hint: 'Diga só o que você já sabe e quando vai retornar.' },
          { k: 'email', label: 'O e-mail do cliente', ph: 'cole o e-mail, sem o nome do cliente e sem o número do pedido', area: true, hint: '"Um cliente comprou um sofá há 40 dias" basta para a IA escrever a resposta.' },
      ],
      checks: ['Prazo: "até amanhã", "em até 2 horas"', 'Valor: "desconto", "reembolso", "sem custo"', 'Compromisso: "garantimos", "vamos resolver"', 'Cada promessa que não foi você quem decidiu: tire', 'A data que ela escreveu sozinha, no calendário'],
      result: 'Sem os limites, as 3 respostas prometeram algo que o atendente não tinha como garantir sozinho: contato "ainda hoje", compensação, uma solução "em até 2 horas". Com as duas frases de limites, nenhuma das 3 prometeu além do que foi pedido; a resposta que o livro mostra ainda pôs a data, "25/09", que ninguém escreveu, e estava certa porque o teste foi num dia 24.',
      privacy: 'O e-mail de um cliente tem o nome dele e o número do pedido. Troque os dois antes de colar.' },
    { id: 'sua-voz', chap: 'Capítulo 6', name: 'Escrever do seu jeito',
      tpl: 'Escreva {oque}. Copie o meu jeito de escrever. Três mensagens que eu mandei para {onde}: {exemplos}',
      fields: [
          { k: 'oque', label: 'O que escrever', ph: 'uma mensagem para o grupo da equipe avisando que a reunião de sexta mudou para as 15h', area: true },
          { k: 'onde', label: 'Para quem você mandou', ph: 'esse grupo' },
          { k: 'exemplos', label: 'Três mensagens suas', ph: 'cole três mensagens suas, entre aspas, separadas por /', area: true, hint: 'Parecidas com o que você quer, sem nome de cliente, sem valor e sem assunto interno.' },
      ],
      checks: ['A marca que ela diz ter copiado: é mesmo sua?', 'Reescreva com as suas palavras a primeira frase, a frase em que você pede ou decide e a última', 'Leia em voz alta e tire o que você nunca diria', 'Os fatos, como no capítulo 3: a data, o horário, o nome'],
      result: 'Sem exemplo, o aviso veio com "Aviso importante!", "Passando para informar" e "Por favor, atualizem": certo, mas sem a cara de ninguém. Com três mensagens da Joana, chegou muito mais perto, e a IA disse ter copiado o "me chama" como "uma marca sua", embora ele aparecesse numa só das três.',
      privacy: 'Os textos que você cola como exemplo também vão para a IA. Escolha exemplos sem nome de cliente, sem valor e sem assunto interno, ou troque esses dados antes de colar.' },

    // ─── Dez pedidos para usar amanhã (the back of the book) ──────────────
    { id: 'resumir', chap: 'Dez pedidos para usar amanhã', name: 'Resumir sem inventar',
      tpl: 'Resuma este texto em cinco tópicos, usando só o que está escrito nele. Marque com [?] qualquer coisa que você acrescentar.\n\n{texto}',
      fields: [{ k: 'texto', label: 'O texto', ph: 'cole o texto', area: true }],
      checks: ['As datas, uma a uma, contra o original', 'Os números, um a um, contra o original', 'Os nomes, um a um, contra o original', 'O que veio com [?]: o sinal ajuda a achar o que conferir, mas não confere por você'],
      result: 'Num pedido parecido, no capítulo 3, "use só o que está escrito nas anotações" evitou a data inventada da próxima reunião nas 3 tentativas, mas numa delas a IA pôs no título "segunda, 23/09", e 23/09/2026 foi uma quarta-feira. Pedindo que marcasse com [?] o que acrescentou, ela marcou a data inventada e deixou sem marca o "15/09" que escreveu no lugar de "dia 15".' },
    { id: 'ata', chap: 'Dez pedidos para usar amanhã', name: 'Transformar anotações em ata',
      tpl: 'Transforme estas anotações numa ata organizada, com os assuntos, as decisões e os responsáveis. Onde a anotação não diz quem é o responsável ou o que foi decidido, escreva "a definir", sem inventar.\n\n{anotacoes}',
      fields: [{ k: 'anotacoes', label: 'As anotações', ph: 'cole as anotações', area: true }],
      checks: ['O que virou "decisão": a anotação diz que foi decidido?', 'Cada responsável e cada "a definir", contra as anotações'],
      result: 'Uma anotação solta ("reforço de matemática às quartas") apareceu na coluna das decisões.',
      privacy: 'Anotações de reunião têm nomes de colegas, de clientes e, às vezes, números da empresa. Antes de colar, veja se a regra da sua empresa permite usar aquela IA com esse material.' },
    { id: 'email-curto', chap: 'Dez pedidos para usar amanhã', name: 'Deixar um e-mail claro e curto',
      tpl: 'Reescreva este e-mail para ficar claro e curto, com no máximo três frases, mantendo a educação. Não acrescente nenhuma informação.\n\n{email}',
      fields: [{ k: 'email', label: 'O e-mail', ph: 'cole o e-mail', area: true }],
      checks: ['Se nada importante sumiu na hora de encurtar'],
      result: 'O pedido foi testado com um e-mail de exemplo no lugar do colchete, e o livro não relata tropeço; o que pede conferência é o que pode ter sumido na hora de encurtar.' },
    { id: 'entender', chap: 'Dez pedidos para usar amanhã', name: 'Entender um texto difícil',
      tpl: 'Explique esta {oque} em linguagem simples, como se explicasse para alguém da família. Depois, diga que perguntas eu deveria fazer antes de assinar.\n\n{texto}',
      fields: [
          { k: 'oque', label: 'O que é o texto', ph: 'cláusula de contrato', hint: 'Serve também para um aviso, uma regra, uma carta do banco: troque "cláusula de contrato" pelo que for.' },
          { k: 'texto', label: 'O texto', ph: 'cole a cláusula', area: true, hint: 'Se for um contrato seu, tire antes os nomes, os documentos e os valores.' },
      ],
      checks: ['A explicação ajuda a entender, mas não substitui quem responde pelo documento', 'Contrato, lei e saúde: leve as perguntas a quem sabe'],
      result: 'O pedido foi testado com uma cláusula de exemplo no lugar do colchete, e o livro não relata tropeço; a explicação ajuda a entender, e as perguntas vão para quem responde pelo documento.' },
    { id: 'tarefas', chap: 'Dez pedidos para usar amanhã', name: 'Tirar as tarefas de uma conversa',
      tpl: 'Com base nesta conversa, monte uma lista de tarefas, com quem faz cada uma e até quando. Se a conversa não disser quem faz ou até quando, escreva "a definir".\n\n{conversa}',
      fields: [{ k: 'conversa', label: 'A conversa', ph: 'cole a conversa', area: true }],
      checks: ['Cada nome: essa pessoa ficou mesmo com a tarefa?', 'Cada prazo no calendário, a partir da data de hoje', '"Fim do mês", "semana que vem": que data ela pôs, e se avisou'],
      result: 'Mesmo com o "a definir" no pedido, a IA pôs como responsável pelos preços uma pessoa que só tinha a tabela. Transformou "fim do mês" em 30 de setembro, e avisou; e "semana que vem" em "até ~30/09", sem avisar, o que estava errado: o teste foi feito num dia 24, e a semana seguinte ia até 4 de outubro.' },
    { id: 'revisar', chap: 'Dez pedidos para usar amanhã', name: 'Revisar sem mudar o seu jeito',
      tpl: 'Revise este texto meu. Aponte os erros de português e o que ficou confuso, numa lista, mas não reescreva o texto nem mude o meu jeito de escrever.\n\n{texto}',
      fields: [{ k: 'texto', label: 'O seu texto', ph: 'cole o texto', area: true }],
      checks: ['Cada correção antes de aceitar: você decide quais entram', 'O que ela marcou como informal, como o "pra": num comunicado formal pode ser erro, e com a equipe pode ser o seu jeito'],
      result: 'No capítulo 6, com um aviso sobre o sistema de ponto, a IA fez o que foi pedido: apontou dois acentos e um til que faltavam, uma crase e uma frase confusa, sem mexer no texto. O "pra" ela marcou, e deixou a decisão com quem escreveu.' },
    { id: 'conversa-dificil', chap: 'Dez pedidos para usar amanhã', name: 'Preparar uma conversa difícil',
      tpl: 'Vou ter uma conversa com {quem} sobre {assunto}. Me ajude a preparar: que perguntas a pessoa pode me fazer, e que perguntas eu devo fazer a ela?',
      fields: [
          { k: 'quem', label: 'Com quem', ph: 'quem' },
          { k: 'assunto', label: 'Sobre o quê', ph: 'o assunto' },
      ],
      checks: ['Se as perguntas combinam com a pessoa de verdade', 'Se combinam com o lugar de verdade: a IA não conhece nenhum dos dois'],
      result: 'O pedido foi testado com um caso de exemplo no lugar dos colchetes, e o livro não relata tropeço; a IA não conhece a pessoa nem o lugar, e quem sabe se as perguntas servem é você.' },
    { id: 'formula', chap: 'Dez pedidos para usar amanhã', name: 'Montar uma fórmula de planilha',
      tpl: 'Tenho uma planilha de {oque}. Na coluna A está {a}, na B {b} e na C {c}. Me explique, passo a passo, como fazer uma fórmula na coluna D que {resultado}.',
      fields: [
          { k: 'oque', label: 'Planilha de quê', ph: 'o quê' },
          { k: 'a', label: 'Coluna A', ph: '...' },
          { k: 'b', label: 'Coluna B', ph: '...' },
          { k: 'c', label: 'Coluna C', ph: '...' },
          { k: 'resultado', label: 'O resultado', ph: 'o resultado que você quer', area: true },
      ],
      checks: ['Antes de copiar para a planilha inteira, teste em duas ou três linhas cujo resultado você já sabe'],
      result: 'Com um estoque e um mínimo, a IA acertou e ainda avisou do caso em que os dois são iguais.' },
    { id: 'modelo-de-mensagem', chap: 'Dez pedidos para usar amanhã', name: 'Criar um modelo de mensagem',
      tpl: 'Toda semana eu preciso {situacao}. Crie um modelo de mensagem curta e educada para eu reutilizar, com espaços para {muda}.',
      fields: [
          { k: 'situacao', label: 'A situação', ph: 'a situação' },
          { k: 'muda', label: 'O que muda a cada vez', ph: 'o que muda a cada vez' },
      ],
      checks: ['O tom, uma vez', 'A cada uso, o que você preencheu: nome, data, valor'],
      result: 'O pedido foi testado com uma situação de exemplo no lugar dos colchetes, e o livro não relata tropeço; o que pede conferência é o que você preenche a cada uso.' },
    { id: 'perguntar-antes', chap: 'Dez pedidos para usar amanhã', name: 'Pedir que ela pergunte antes',
      tpl: 'Antes de responder, me faça as perguntas que você precisa para me ajudar bem. Quero {tarefa}.',
      fields: [{ k: 'tarefa', label: 'A tarefa', ph: 'a tarefa', area: true }],
      checks: ['O que ela deduziu sem perguntar', 'Responda as perguntas que souber, na mesma conversa, e então peça a tarefa'],
      result: 'Com a escala de folgas da padaria "para o mês que vem", a IA fez dez perguntas, quase todas as que seria preciso responder de qualquer jeito. Numa delas, sobre um feriado local de outubro, concluiu sozinha que o mês era outubro; estava certo, porque o teste foi feito em setembro.' },
]

export const TEMPLATES = [
    { id: 'antes-de-pedir', kind: 'check', title: 'Antes de pedir', chap: 'Capítulo 2',
      desc: 'Três perguntas de um segundo, antes de abrir a conversa.',
      table: [['Pergunta', 'Por quê'], ['Posso colar isto numa IA?', 'Nome de cliente, documento, número da empresa: o capítulo 4 diz o que nunca colar'], ['Se a resposta vier errada, qual é o estrago?', 'Quanto maior, mais conferência (capítulo 3)'], ['Eu sei avaliar a resposta?', 'Se você não saberia dizer se está certa, a tarefa não é para a IA fazer sozinha (capítulo 5)']] },
    { id: 'quanto-conferir', kind: 'check', title: 'Quanto conferir', chap: 'Capítulo 3',
      desc: 'A régua é uma pergunta: se isto estiver errado, qual é o estrago?',
      table: [['Se o erro…', 'Confira'], ['só atrapalha você (uma ideia, um rascunho)', 'uma leitura rápida'], ['chega a outra pessoa (um e-mail, um resumo)', 'fatos, nomes e datas, um a um'], ['custa dinheiro, saúde ou um direito de alguém', 'tudo, na fonte, e com uma segunda pessoa']],
      after: 'A régua vale para o resto do livro. O capítulo 5 usa a mesma pergunta para decidir o que entregar à IA.' },
    { id: 'partes-da-tarefa', kind: 'sheet', title: 'A tarefa em partes, com as quatro perguntas', chap: 'Capítulo 5',
      desc: 'Cole em A1. Escreva o que você faz, do começo ao fim, em cinco ou seis partes, uma por linha, e responda às quatro perguntas de cada uma.',
      rows: [['Parte da tarefa', 'A IA faz isso bem?', 'Se sair errado, qual é o estrago?', 'Precisa de um dado que não pode ir para a IA?', 'Eu sei conferir o resultado?', 'Tipo: só eu, delego e confiro, ou em dupla'], ['1', '', '', '', '', ''], ['2', '', '', '', '', ''], ['3', '', '', '', '', ''], ['4', '', '', '', '', ''], ['5', '', '', '', '', ''], ['6', '', '', '', '', '']],
      after: 'Em um mês, reveja a divisão: o que funcionou pode subir de "em dupla" para "delego e confiro"; o que deu problema volta para "só eu".' },
    { id: 'email-do-sofa', kind: 'check', title: 'O e-mail do sofá, dividido', chap: 'Capítulo 5',
      desc: 'O exemplo do livro. A IA ficou com uma parte e meia de seis; o resto continua com quem responde pelo resultado.',
      table: [['Parte', 'Tipo, e por quê'], ['Entender o que o cliente quer', 'Em dupla: a IA ajuda a ler um e-mail confuso, você conhece o cliente'], ['Ver o que aconteceu com o pedido', 'Só eu: está no sistema da loja, que a IA não vê, e tem dado de cliente'], ['Decidir o que oferecer', 'Só eu: prazo, desconto e reembolso são decisões da loja'], ['Escrever a resposta', 'Delego e confiro: rascunho é o que ela faz melhor'], ['Revisar', 'Só eu: quem assina é você'], ['Enviar', 'Só eu: idem']] },
    { id: 'frase-de-limites', kind: 'text', title: 'Uma frase de limites', chap: 'Capítulo 5',
      desc: 'Guarde uma frase de limites para os pedidos que se repetem, e cole no fim do pedido.',
      text: 'Não prometa prazo, valor nem compensação; diga só o que eu já sei e quando vou retornar.',
      after: 'No teste do sofá, com os limites no pedido, nenhuma das três respostas prometeu compensação, reembolso ou prazo além do que foi pedido.' },
    { id: 'pergunta-da-regra', kind: 'text', title: 'A pergunta a quem responde pela área', chap: 'Capítulo 4',
      desc: 'Se ninguém falou nada sobre o que pode ir para uma IA, pergunte por escrito.',
      text: 'Posso usar uma IA para escrever mensagens e resumos, sem colar dados de clientes? Tem alguma que a empresa prefere?',
      after: 'Na dúvida, trate o material como se não pudesse.' },
    { id: 'regra-da-empresa', kind: 'text', title: 'A regra, se a empresa é sua', chap: 'Capítulo 4',
      desc: 'Se a empresa é sua, a regra é você quem faz: três linhas para você e para quem trabalha com você.',
      text: '1. O que pode ir para a IA: [...]\n2. O que nunca vai: [...]\n3. Quem confere antes de mandar ao cliente: [...]' },
    { id: 'novidade', kind: 'check', title: 'Quando aparece uma novidade', chap: 'Capítulo 8',
      desc: 'Três perguntas separam o que vale a sua meia hora do que é só barulho.',
      table: [['Pergunta', 'Se a resposta não for boa'], ['Resolve uma tarefa que eu já tenho?', 'Se a novidade não toca nenhuma tarefa da sua semana, ela pode esperar'], ['O que ela faz com os meus dados?', 'Antes de testar com material de trabalho, veja o capítulo 4'], ['Eu consigo conferir o que ela entrega?', 'Use só em tarefas em que o erro atrapalha apenas você, como diz o capítulo 3']],
      after: 'Se as três respostas forem boas, teste na próxima meia hora, com uma tarefa real. Se não, anote e siga em frente.' },
]

export const EXERCISES = [
    { id: 'e1', chap: 'Capítulo 1', title: 'O mapa da IA na sua semana', text: 'Marque o que aconteceu com você na última semana: o corretor do celular; um áudio que virou texto; o aplicativo de mapas avisando um atraso; o banco bloqueando ou avisando de uma compra; a rede social escolhendo o que mostrar; um atendimento automático por mensagem ou telefone; uma conversa com uma IA. Conte quantos você usou e quantos foram usados sobre você. Depois, abra uma IA de conversa, diga o que você faz no trabalho e faça a pergunta abaixo.', material: 'O que você faz mal, no meu tipo de trabalho?', counts: ['Os que você usou', 'Os que foram usados sobre você'], after: 'Guarde a resposta: no capítulo 5, ela ajuda a decidir o que entregar à IA.' },
    { id: 'e2', chap: 'Capítulo 2', title: 'O pedido curto e o pedido em quatro partes', text: 'Pegue um pedido que você já fez a uma IA, ou que faria esta semana. Primeiro, peça do jeito curto, como faria sem pensar. Depois, abra uma conversa nova e peça de novo, respondendo às quatro perguntas: quem sou e para quem é, o que preciso, como é o bom, como quero receber. Por fim, faça uma rodada de ajuste na segunda, dizendo exatamente o que mudar.', counts: ['Frases da primeira resposta que você usaria sem mexer', 'Frases da segunda'] },
    { id: 'e3', chap: 'Capítulo 3', title: 'O resumo contra o original', text: 'Pegue um texto que você conhece bem e que não tenha dado de ninguém: uma notícia que você leu inteira, um aviso público, a regra de uma promoção, a ficha de um produto. Peça a uma IA um resumo em cinco tópicos. Depois, leia o resumo com o original ao lado, com atenção às datas, aos números e aos nomes.', counts: ['Informações que ela acertou', 'Que ela mudou', 'Que ela acrescentou', 'Que deixou de fora'], after: 'Se ela acertou tudo, ótimo: é um teste, não uma garantia; faça de novo com outro texto. O capítulo 8 sugere repetir uma vez por mês: as IAs mudam, e o jeito de errar delas também.' },
    { id: 'e4', chap: 'Capítulo 4', title: 'Três coisas em quinze minutos', text: 'Primeiro, abra o histórico da IA que você usa e olhe as últimas cinco conversas: alguma tem um dado que não deveria estar lá? Se tiver, apague. Depois, abra as configurações e procure as quatro coisas: treino, memória, conversa temporária e histórico; se não achar alguma, veja neste kit o que cada empresa dizia. Por fim, ligue para alguém da sua família e combinem a senha.', counts: ['Das últimas cinco conversas, as que tinham um dado que não devia estar lá', 'Das quatro coisas, as que você achou nas configurações'], after: 'Para a senha, escolha duas palavras que não combinam, como "caju azul": nada que esteja em rede social, como o nome do cachorro ou a cidade onde vocês nasceram.' },
    { id: 'e5', chap: 'Capítulo 5', title: 'A tarefa em partes', text: 'Escolha uma tarefa da sua semana que você gostaria de passar, pelo menos em parte, para uma IA. Quebre em cinco ou seis partes, do começo ao fim. Para cada parte, faça as quatro perguntas e marque: só eu, delego e confiro, ou em dupla. Se alguma parte for "delego e confiro", anote a frase de limites que você colaria no pedido.', counts: ['Partes', 'Só eu', 'Delego e confiro', 'Em dupla'], after: 'A planilha das partes, com as quatro perguntas, está em Modelos. No e-mail do sofá, a IA ficou com uma parte e meia de seis.' },
    { id: 'e6', chap: 'Capítulo 6', title: 'Sem exemplo e com dois textos seus', text: 'Pegue um texto que você precisa escrever esta semana. Peça à IA um rascunho sem dar exemplo nenhum. Depois, numa conversa nova, peça o mesmo colando dois textos seus como exemplo. Compare os dois. Por fim, pegue o melhor e reescreva a primeira frase, a frase principal e a última com as suas palavras. Leia em voz alta: soa como você?', counts: [] },
    { id: 'e7', chap: 'Capítulo 7', title: 'Quem pode ser prejudicado', text: 'Pense numa decisão do seu trabalho que uma IA poderia influenciar: uma triagem, uma resposta a um pedido, uma avaliação, uma prioridade. Escreva três coisas: quem pode ser prejudicado se a IA errar; que informação a IA não teria sobre essa pessoa; e em que ponto você vai conferir antes de decidir. Se quiser, repita o teste do livro com um caso seu: dois textos iguais, com uma só diferença, cada um três vezes, sempre numa conversa nova e com a memória desligada.', counts: ['Vezes em que as respostas dos dois textos ficaram diferentes (de 3)'], after: 'Se mudaram numa só vez, pode ser o acaso; se mudaram sempre, desconfie. No teste do livro, dois currículos iguais, de Ana Paula Ferreira e de Carlos Eduardo Ferreira, três vezes cada: as seis notas foram 9. É um bom sinal, e não prova muita coisa.' },
    { id: 'e8', chap: 'Capítulo 8', title: 'A meia hora e o plano de quatro semanas', text: 'Abra a agenda e marque meia hora na semana que vem, com dia e hora. Escolha agora a tarefa real que você vai usar. Depois, peça a uma IA um plano de quatro semanas para aprender a usar IA no seu trabalho, dizendo o que você faz e quanto tempo tem. Leia o plano procurando duas coisas: um erro de detalhe, como uma data ou um nome, e a semana de conferir.', counts: ['Erros de detalhe no plano', 'Semanas sobre conferir'], after: 'No teste do livro, o plano trazia "sexta-feira dia 27/09", e 27 de setembro de 2026 foi um domingo; e nenhuma das quatro semanas era sobre conferir. Se não houver, acrescente você.' },
]

// ─── The rest of the kit ──────────────────────────────────────────────────

export const KIT = {
    slug: 'ia-no-dia-a-dia',
    checkedOn: 'Configurações das IAs conferidas nas páginas de ajuda de cada empresa em 24/09/2026, a data do livro. Quando algo mudar, muda aqui, com a data.',
    lead: 'Os pedidos do livro para preencher e copiar, com o que conferir em cada um, os dez pedidos para usar amanhã, o roteiro contra golpe e o que muda mais rápido do que um livro, conferido nas páginas de ajuda de cada empresa em 24 de setembro de 2026.',
    promises: ['Os pedidos testados no livro', 'Os dez pedidos para usar amanhã', 'O que você digita fica no seu navegador'],
}

export const RULES = [
    { lead: 'Troque os dados antes de colar.', text: 'Em vez de "a cliente Maria Souza, CPF tal, reclamou do atraso", escreva "uma cliente reclamou do atraso". Se você pede para a IA apagar os nomes, eles já foram.' },
    { lead: 'Confira antes de confiar.', text: 'A IA erra com convicção: texto bonito não é texto certo. Quanto maior o estrago de um erro, mais conferência.' },
    { lead: 'A decisão fica com você.', text: 'A IA escreve; prazo, valor e compensação são decisões, e quem decide é você ou a regra da empresa.' },
]

export const FOUR_CHECKS = [
    { title: 'Confira o que tem cara de fato', description: 'Números, datas, nomes, valores, endereços, telefones, leis, citações: no documento original, no site oficial, com quem sabe. Nos testes do livro, foi aí que a IA mais inventou.' },
    { title: 'Peça a fonte, e abra a fonte', description: 'Se ela não pesquisou na internet, a fonte que ela dá também sai da lembrança, e pode não existir. Às vezes o link existe, mas não diz o que a IA disse que ele diz. Fonte que você não abriu não conta.' },
    { title: 'Peça para a IA marcar o que ela acrescentou', description: '"Refaça o resumo e marque com [?] tudo o que não estava escrito nas minhas anotações." O [?] ajuda você a achar os pontos a conferir. Não confere por você.' },
    { title: 'Leia como quem vai assinar', description: 'Para quem recebe, o texto é seu, não da IA. E confira a nova versão também: ao corrigir uma coisa, ela pode mudar outra.' },
]

export const NEVER_PASTE = [
    'Senhas e códigos de verificação.',
    'Documentos, CPF, dados bancários e de cartão de outras pessoas.',
    'Dados de saúde de pacientes, clientes ou colegas.',
    'Listas de clientes, de alunos, de pacientes, de funcionários.',
    'Contratos, custos e planos da empresa que não são públicos.',
    'Tudo o que a regra da sua empresa proíbe.',
]

// Checked on the official pages on 24/09/2026 (chapters/o-kit.md of the book).
export const AI_SETTINGS = [
    { name: 'Claude, da Anthropic', open: { label: 'claude.ai', href: 'https://claude.ai/' }, text: 'As conversas são usadas para treinar a IA se você permitir, e também quando são marcadas para revisão de segurança. A página não diz se a opção vem ligada ou desligada; confira na sua conta. Para mudar: Settings › Privacy › Help improve our AI models. A conversa anônima (incognito chat, com o ícone de um fantasma) não fica no histórico nem na memória, e não é usada para treinar.', sources: [{ label: 'treino', href: 'https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training' }, { label: 'conversa anônima', href: 'https://support.claude.com/en/articles/12260368-use-incognito-chats' }] },
    { name: 'Gemini, do Google', open: { label: 'gemini.google.com', href: 'https://gemini.google.com/' }, text: 'Para maiores de 18 anos, a opção Manter atividade vem ligada, e as conversas são usadas para melhorar os serviços, inclusive treinar modelos, com revisão humana. Para desligar: em gemini.google.com, Configurações e ajuda › Atividade › Desativar. Mesmo desligada, as conversas ficam salvas por até 72 horas. As conversas lidas por revisores humanos ficam até três anos, mesmo que você apague o histórico. Existe conversa temporária; ela não é usada para treinar, mas o Google ainda a usa para responder e para proteger o serviço, com revisores humanos.', sources: [{ label: 'atividade', href: 'https://support.google.com/gemini/answer/13278892?hl=pt-BR' }, { label: 'privacidade', href: 'https://support.google.com/gemini/answer/13594961?hl=en' }] },
    { name: 'Meta AI, no WhatsApp', open: { label: 'Dentro do WhatsApp' }, text: 'As suas conversas pessoais no WhatsApp continuam protegidas; o que você manda para a Meta AI, a Meta recebe, e ela recomenda mandar só o que você não se importa que ela lembre.', sources: [{ label: 'privacidade', href: 'https://www.whatsapp.com/privacyquestions' }] },
    { name: 'Copilot, da Microsoft', open: { label: 'copilot.microsoft.com', href: 'https://copilot.microsoft.com/' }, text: 'Desde 18 de agosto de 2026, na versão nova do aplicativo, a Microsoft diz que os pedidos, as respostas e os arquivos não são usados para treinar os modelos de base. Na versão antiga, os usuários no Brasil já estavam fora do treino. Na versão nova não há opção de treino para desligar; os controles são de memória, histórico e anúncios personalizados.', sources: [{ label: 'histórico', href: 'https://support.microsoft.com/en-us/privacy/microsoft-copilot/activity-history' }, { label: 'controles', href: 'https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls' }] },
    { name: 'ChatGPT, da OpenAI', open: { label: 'chatgpt.com', href: 'https://chatgpt.com/' }, text: 'As conversas podem ser usadas para treinar os modelos, a menos que você desligue. Para desligar: no perfil, Settings › Data Controls › desligar Improve the model for everyone. A conversa temporária (Temporary Chat) não fica no histórico, não cria memória, não é usada para treinar e é apagada dos sistemas da empresa em 30 dias.', sources: [{ label: 'controles de dados', href: 'https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt' }] },
]

export const SCAM = {
    signs: [
        { lead: '', text: 'Diz que é uma pessoa ou organização conhecida?' },
        { lead: '', text: 'Envolve dinheiro, vantagem ou informações pessoais?' },
        { lead: '', text: 'Quer que você faça algo sem tempo para pensar?' },
    ],
    defense: [
        { title: 'Pare', description: 'A pressa é a ferramenta do golpista. Nenhum pedido de dinheiro por mensagem precisa ser atendido nos próximos cinco minutos.' },
        { title: 'Ligue você, por voz', description: 'Para um número que você já tinha, ou fale com outra pessoa da família. Não responda pela mesma conversa, nem se a mensagem vier do número de sempre: a conta pode ter sido clonada, ou o celular, roubado.' },
        { title: 'Combine uma senha com a família', description: 'Pessoalmente ou numa ligação: uma palavra que só vocês sabem, para perguntar quando um pedido estranho chegar com a voz ou o rosto de alguém próximo. Se a pessoa não souber a senha, ou fugir da pergunta, desligue e ligue você.' },
        { title: 'Nunca passe código de verificação', description: 'O que chegou por SMS ou por mensagem, para ninguém. E ative a verificação em duas etapas do WhatsApp, que dificulta a clonagem da conta.' },
        { title: 'Confira o boleto antes de pagar', description: 'O nome e o CPF ou CNPJ de quem recebe, o valor e o vencimento.' },
        { title: 'Bloqueie e denuncie', description: 'O número, no aplicativo, e avise a pessoa cuja foto ou voz foi usada.' },
    ],
    paid: [
        { title: 'Avise o seu banco na hora', description: 'Pelo aplicativo ou pelos canais oficiais, e conteste o Pix.' },
        { title: 'O MED, do Banco Central', description: 'O Mecanismo Especial de Devolução existe para tentar devolver o dinheiro em caso de golpe, e quanto antes você contestar, maior a chance.' },
        { title: 'Registre um boletim de ocorrência', description: 'Depois. Ele pode ser pedido para contestar a fraude.' },
    ],
}

export const FOUR_TYPES = [
    { criterion: 'Só eu', value: 'Tarefas em que a IA atrapalha mais do que ajuda, ou que você acha que devem continuar humanas.' },
    { criterion: 'Delego e confiro', value: 'Tarefas que você passa à IA, e depois revisa, porque ela erra, mas nas quais não quer gastar muito tempo.' },
    { criterion: 'Em dupla', value: 'Tarefas em que você e a IA trabalham juntos, indo e voltando, como no ajuste em rodadas do capítulo 2.' },
    { criterion: 'Automático', value: 'Tarefas que você entrega à IA e nem confere. Para quem está começando, fica de fora.' },
]

export const AUTOMATED_DECISION = [
    { title: 'Pergunte se a decisão foi automática', description: 'Se um crédito, um cadastro ou uma candidatura foi negado por um sistema. Por escrito.' },
    { title: 'Peça os critérios e a revisão', description: 'Pelo canal de atendimento da empresa, ou ao encarregado de dados, a pessoa que responde pelos dados pessoais, cujo contato a lei manda divulgar.' },
    { title: 'Se a empresa não responder', description: 'A lei permite reclamar na ANPD. Guarde a resposta.' },
]

export const SOURCES = [
    { title: 'Golpes', text: 'A Cartilha de Segurança para Internet, do CERT.br, com fascículos sobre golpes, sobre o que fazer depois de um golpe e sobre IA; e os golpes mais comuns, pela Febraban, com o jeito de evitar cada um.', links: [{ label: 'cartilha.cert.br', href: 'https://cartilha.cert.br/' }, { label: 'Febraban', href: 'https://portal.febraban.org.br/noticia/4279/pt-br/' }] },
    { title: 'Reclamar de uma empresa', text: 'O Consumidor.gov.br.', links: [{ label: 'consumidor.gov.br', href: 'https://www.consumidor.gov.br/' }] },
    { title: 'Dados pessoais', text: 'A ANPD, a Agência Nacional de Proteção de Dados, e a LGPD, a lei, no texto oficial.', links: [{ label: 'ANPD', href: 'https://www.gov.br/anpd/pt-br' }, { label: 'LGPD', href: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm' }] },
    { title: 'Apoio emocional', text: 'O CVV atende de graça, 24 horas por dia, em todo o Brasil, pelo telefone 188 ou pelo chat. Se você, ou alguém perto de você, estiver passando por um momento difícil, procure uma pessoa.', links: [{ label: 'cvv.org.br', href: 'https://cvv.org.br/' }] },
]

export const UPDATES = [
    { date: '19/11/2026', text: 'O kit online entra no ar, com os pedidos do livro, os dez pedidos para usar amanhã, os modelos, os exercícios e o caderno. Configurações das IAs conferidas nas páginas de ajuda em 24/09/2026, a data do livro.' },
]

// ─── The kit as one object, for pages/BookKit.jsx ─────────────────────────
//
// The bands sit between the templates (white) and the exercises (gray), so
// they alternate gray and white, starting gray and ending white.

const steps = (items, icons) => items.map((item, index) => ({ ...item, icon: icons[index] }))
const alternate = bands => bands.map((band, index) => ({ ...band, background: index % 2 === 0 ? 'gray' : 'white' }))

export default {
    slug: 'ia-no-dia-a-dia',
    // The localStorage prefix of this kit: changing it later would lose what
    // readers typed.
    storage: 'kit-dia',
    testedOn: '24 de setembro de 2026',
    testedNote: 'Conversas reais com o Claude Sonnet 4.6 e o Claude Haiku 4.5, em 24/09/2026, numa configuração neutra: sem memória, sem configurações pessoais e, com uma exceção no capítulo 3, sem pesquisa na internet. No seu aplicativo, a resposta pode sair diferente; a mesma IA também responde diferente a cada vez.',
    promptsNote: 'Antes de colar qualquer material, troque nomes, números e documentos de outras pessoas, como mostra o capítulo 4.',
    exercisesTitle: 'Os exercícios do livro, um por capítulo',
    exercisesLead: 'Os "Faça agora" do livro, de até quinze minutos cada, com o seu próprio material e sem dado de ninguém. Onde o livro pede uma contagem, anote a sua: ela fica guardada só neste navegador.',
    notebookNote: 'Não guarde aqui senha, documento nem dado de outra pessoa.',
    // The task pages (pages/KitItem.jsx): four of the ten requests have no finding in the book.
    itemLead: 'O pedido do livro IA no dia a dia para esta tarefa, pronto para preencher e copiar, com o que conferir na resposta e, quando o livro conta, o que o teste mostrou.',
    bridgeText: 'O livro mostra por que cada pedido é escrito assim, com as conversas reais dos testes, o que deu certo e o que deu errado, e as oito coisas que qualquer pessoa precisa saber de IA para trabalhar.',
    KIT,
    RULES,
    TASKS,
    TEMPLATES,
    EXERCISES,
    SOURCES,
    UPDATES,
    bands: alternate([
        {
            type: 'steps',
            id: 'conferencias',
            subtitle: 'Conferir antes de confiar',
            title: 'As quatro conferências',
            description: 'A IA não consulta a verdade: escreve o que parece vir em seguida, e às vezes inventa, com o mesmo tom seguro de quando acerta. Nem tudo precisa das quatro: a régua de quanto conferir está em Modelos.',
            items: steps(FOUR_CHECKS, ['IconSearch', 'IconFileText', 'IconCheck', 'IconShieldCheck']),
        },
        {
            type: 'callout',
            id: 'nunca-cole',
            subtitle: 'Proteger seus dados',
            title: 'O que nunca colar numa IA',
            description: 'O que você cola numa IA vai para os computadores de uma empresa, e pode ser guardado, lido por pessoas, usado para treinar e virar memória. Dado de outra pessoa não vai, e o seu, só o que não faz falta.',
            cardLabel: 'Nunca cole numa IA',
            items: NEVER_PASTE.map(text => ({ lead: '', text })),
            footnote: { lead: 'O que é seu, você decide.', text: 'Para melhorar o seu currículo, cole o texto sem o CPF, o endereço e o telefone; eles não mudam nada na resposta.' },
        },
        {
            type: 'criteria',
            id: 'ias',
            subtitle: 'O que muda rápido',
            title: 'O que cada empresa dizia sobre as suas conversas',
            description: 'Algumas das IAs de conversa mais conhecidas, todas com versão gratuita, em ordem alfabética pela empresa; a ordem não é um ranking. Conferido nas páginas de ajuda de cada empresa em 24/09/2026. As páginas estão em inglês; no aplicativo em português, os nomes aparecem traduzidos: procure em "Configurações" as seções de dados, de privacidade e de memória.',
            items: AI_SETTINGS.map(ai => ({ criterion: ai.name, value: ai.text, links: [ai.open, ...ai.sources.map((source, index) => ({ ...source, prefix: index === 0 ? 'página oficial: ' : '' }))] })),
            note: 'Desligar o treino vale para as próximas conversas; o que já foi usado para treinar não volta. No celular, instale só pela loja oficial do telefone, e confira o nome de quem publica o aplicativo.',
        },
        {
            type: 'callout',
            id: 'sinais',
            subtitle: 'Não cair em golpe',
            title: 'Três perguntas antes de qualquer pedido de dinheiro',
            description: 'A Cartilha de Segurança para Internet, do CERT.br, resume os sinais de golpe em três perguntas. Se a resposta for sim, siga o roteiro.',
            cardLabel: 'Os sinais de golpe',
            items: SCAM.signs,
            footnote: { lead: 'Voz, rosto e número não provam.', text: 'Uma voz conhecida, um rosto conhecido e um português perfeito já não provam quem está falando. Nem o número de sempre prova. O que prova é uma ligação que você mesmo faz, para um número que você já tinha, ou uma senha que só vocês sabem.' },
        },
        {
            type: 'steps',
            id: 'defesa',
            subtitle: 'O roteiro de defesa',
            title: 'Pare, ligue você, pergunte a senha',
            items: steps(SCAM.defense, ['IconAlertTriangle', 'IconPhoneCall', 'IconCheck', 'IconShieldCheck', 'IconReceipt', 'IconMessageOff']),
        },
        {
            type: 'steps',
            id: 'se-ja-pagou',
            subtitle: 'Se já pagou',
            title: 'O caminho é o banco, na hora',
            items: steps(SCAM.paid, ['IconBuildingBank', 'IconCashOff', 'IconFileText']),
        },
        {
            type: 'criteria',
            id: 'tipos',
            subtitle: 'Decidir o que entregar à IA',
            title: 'Quatro jeitos de dividir o trabalho',
            description: 'Em 2023, o professor Ethan Mollick, que estuda o uso de IA no trabalho, propôs separar as tarefas em quatro tipos. Nenhuma tarefa é inteira de um tipo só: quebre em partes, e cada parte cai num lugar.',
            items: FOUR_TYPES,
            note: 'O último tipo, ele mesmo avisou, era muito pequeno, porque a IA ainda errava demais para trabalhar sem ninguém olhando. Os testes do livro, três anos depois, dizem o mesmo.',
        },
        {
            type: 'steps',
            id: 'decisao-automatica',
            subtitle: 'Quando a máquina decide sobre você',
            title: 'Peça os critérios e a revisão, por escrito',
            description: 'Quando uma decisão sobre você foi tomada só por um sistema, sem uma pessoa, a LGPD dá dois direitos: pedir que a decisão seja revista e receber informações claras sobre os critérios usados. A lei garante pedir a revisão, mas não garante que ela seja feita por uma pessoa.',
            items: steps(AUTOMATED_DECISION, ['IconSearch', 'IconFileText', 'IconScale']),
        },
    ]),
}
