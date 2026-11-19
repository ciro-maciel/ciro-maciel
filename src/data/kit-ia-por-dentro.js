/**
 * The online kit of "IA por dentro" (volume 2), as data. The page is
 * pages/BookKit.jsx, at /books/ia-por-dentro/kit.
 *
 * Written on 19/11/2026 from the 2.0.1 book (learning/ia-por-dentro), word
 * for word. A book on how AI works, not on how to ask, so the kit is what the
 * book gives the reader to try: the experiment at the end of each chapter
 * ("Faça agora"), with the prompt the book prints, what to look at in the
 * answer, and what the book saw when it ran the same thing on 23/09/2026.
 * Where the book shows no answer to an experiment, the result says so and
 * points to the closest test the book did run. Then the book's own lists:
 * the ten things, the glossary and the addresses of chapters/o-kit.md.
 * The book has no spreadsheet, no training material and no notebook of
 * prompts, so the kit has no exercises section and no notebook.
 */

export const TASKS = [
    { id: 'a-mesma-pergunta', chap: 'Capítulo 1', name: 'A mesma pergunta, três vezes',
      tpl: 'Escreva uma frase para convidar a equipe para um café.',
      fields: [],
      checks: ['Faça a mesma pergunta três vezes, cada uma numa conversa nova', 'Compare as três respostas: onde elas começam a se separar?', 'Agora uma pergunta fechada, três vezes: "Qual é a capital do Brasil?"', 'O essencial mudou? E o texto em volta?', 'Por que o sorteio mexe tão pouco no essencial, e tanto no resto? Compare um candidato com 99% de chance com dois candidatos empatados'],
      result: 'Num pedido parecido, três vezes ao Claude Haiku, uma frase curta para abrir um e-mail pedindo desculpas pelo atraso de um relatório: vieram três respostas diferentes, e duas começaram pela mesma frase, "Peço desculpas pelo atraso na entrega do relatório solicitado."; depois, uma ofereceu quatro opções, e a outra, três.' },
    { id: 'o-trofeu-e-o-armario', chap: 'Capítulo 3', name: 'O troféu e o armário',
      tpl: 'O troféu não coube no armário porque ele era grande demais. O que era grande demais?',
      fields: [],
      checks: ['Depois, numa conversa nova: "O troféu não coube no armário porque ele era pequeno demais. O que era pequeno demais?"', 'Nas duas frases, o pronome é o mesmo, "ele", e só uma palavra mudou', 'Na primeira, a resposta certa é o troféu', 'Na segunda, a resposta certa é o armário'],
      result: 'O Claude Haiku acertou as duas, nas duas vezes em que perguntamos: o troféu na primeira, o armário na segunda. Para acertar, o modelo precisa ligar o pronome ao objeto certo, olhando para o resto da frase, e saber como troféus e armários funcionam.' },
    { id: 'o-muito-e-o-pouco', chap: 'Capítulo 4', name: 'O que a lembrança do modelo guarda',
      tpl: 'Resuma em três frases a história de {obra}. Responda sem pesquisar na internet.',
      fields: [{ k: 'obra', label: 'O livro, o filme ou a pessoa', ph: 'um livro, um filme ou uma pessoa pouco conhecida de que você saiba muito', hint: 'Primeiro, Dom Casmurro; depois, numa conversa nova, um que você conheça a fundo.' }],
      checks: ['Primeiro com Dom Casmurro, depois com o seu, cada um numa conversa nova', 'Compare a segurança das duas respostas', 'Onde ela acertou os detalhes, e onde preencheu com o que "parecia" certo?'],
      result: 'O livro não mostra a resposta deste experimento; mostra o mesmo efeito no capítulo 7: perguntado cinco vezes qual é a capital do Brasil, o Claude Haiku disse Brasília nas cinco, e mais da metade das respostas escorregou num detalhe, como dar a Niemeyer o plano da cidade, que é de Lúcio Costa.',
      privacy: 'Quando você precisar de precisão sobre algo específico, como um contrato, um relatório ou uma regra da sua empresa, não conte com a lembrança do modelo: mostre o texto a ele.' },
    { id: 'aprender-pelo-exemplo', chap: 'Capítulo 5', name: 'Os exemplos ensinam um formato',
      tpl: 'Crie o código de cada produto seguindo os exemplos.\nExemplo: \'Caneta azul\' -> CAN-AZU.\nExemplo: \'Caderno grande\' -> CAD-GRA.\nAgora faça: \'Lápis preto\'; \'Borracha branca\'; \'Régua pequena\'.',
      fields: [],
      checks: ['Com os exemplos: a IA seguiu o seu padrão?', 'Depois, numa conversa nova, peça só: "Crie um código curto para cada produto: \'Lápis preto\'; \'Borracha branca\'; \'Régua pequena\'."', 'Sem os exemplos: que formato ela inventou?'],
      result: 'Com os exemplos, o Claude Haiku respondeu LAP-PRE, BOR-BRA e REG-PEQ, o padrão exato. Sem eles, respondeu LP, BB e RP: um código razoável, mas não o seu. Os dois exemplos fizeram o papel do "Gato -> cat": mostraram o padrão.' },
    { id: 'o-ceu-azul', chap: 'Capítulo 6', name: 'Escolher a melhor de duas respostas',
      tpl: 'Explique para uma criança de 10 anos por que o céu é azul.',
      fields: [],
      checks: ['Peça para ela gerar outra resposta (quase toda IA tem um botão para isso)', 'Compare as duas e escolha a melhor', 'Escreva, em uma frase, por que você escolheu essa', 'Foi a mais correta, a mais clara ou a mais simpática?'],
      result: 'Este é o trabalho das pessoas do RLHF, e o livro não mostra uma resposta: a escolha é sua. Milhares de escolhas como a sua, de pessoas contratadas e, hoje, também de outros modelos treinados para julgar, ensinaram o gosto dos assistentes; por isso a resposta que agrada nem sempre é a resposta certa.' },
    { id: 'um-erro-de-verdade', chap: 'Capítulo 7', name: 'Encontrar um erro de verdade',
      tpl: '{perguntas}\n\nResponda sem pesquisar na internet.',
      fields: [{ k: 'perguntas', label: 'Três perguntas sobre um assunto que você conhece a fundo', ph: 'três perguntas, com datas, nomes e números', area: true, hint: 'A sua cidade, a sua profissão, a empresa onde trabalha. Peça detalhes, como datas, nomes e números.' }],
      checks: ['Cada detalhe com o que você sabe', 'Onde ela errou: o tom mudou? Ela avisou que não tinha certeza?', 'Pergunte de novo, acrescentando: "Se não tiver certeza de algum detalhe, diga que não tem." A resposta mudou?', 'No tokenizador do capítulo 2, "arrozeiro": em quantos pedaços a palavra chega ao modelo?'],
      result: 'Sobre Joaquim Tadeval, um nome inventado para o teste, um modelo aberto pequeno escreveu biografias inteiras; o Claude Haiku respondeu que não encontrava informações confiáveis. Perguntado quantas letras "r" tem "arrozeiro", que no tokenizador do GPT-4o chega em três pedaços, ele acertou: três.' },
    { id: 'o-enigma-das-idades', chap: 'Capítulo 8', name: 'Pensar por escrito',
      tpl: 'Ana é mais velha que Bruno. Carla é mais nova que Bruno. Daniel é mais velho que Ana. Quem é o segundo mais novo? Responda só com o nome, sem explicar.',
      fields: [],
      checks: ['Numa conversa nova, troque a última frase por: "Explique o raciocínio passo a passo e depois dê o nome."', 'Se a sua IA tiver um modo de raciocínio, ligue e peça de novo', 'A resposta certa é Bruno', 'Na resposta explicada: você consegue apontar o passo que decide tudo?'],
      result: 'O Claude Haiku acertou mesmo respondendo só o nome. Com o problema da Emily, um modelo aberto pequeno, o Qwen2.5 de 1,5 bilhão de parâmetros, errou as dez vezes respondendo direto, e acertou nove das dez pensando por escrito.',
      privacy: 'O raciocínio que a IA mostra nem sempre é o caminho que ela de fato seguiu. Use-o para conferir as contas e a lógica, não como uma confissão fiel do que aconteceu lá dentro.' },
    { id: 'com-o-documento', chap: 'Capítulo 9', name: 'Responder com base no documento',
      tpl: '{pergunta} Responda só com base no documento e cite o trecho.\n\n{documento}',
      fields: [
          { k: 'pergunta', label: 'A pergunta sobre um detalhe do documento', ph: 'a pergunta' },
          { k: 'documento', label: 'O documento', ph: 'cole o documento', area: true, hint: 'Um documento de trabalho sem dados sensíveis, como um regulamento interno, um manual ou uma política pública.' },
      ],
      checks: ['Antes, numa conversa nova, faça a mesma pergunta sem colar nada', 'Com o documento: o trecho citado diz mesmo isso?', 'Na mesma conversa, pergunte algo que o documento não diz', 'Ela admitiu que o documento não dizia, ou preencheu com a lembrança?', 'Documento longo: confira a resposta no documento; melhor ainda, cole só a parte que interessa'],
      result: 'Sem o documento, o Claude Haiku respondeu que não tinha acesso às políticas da Alfa Logística, uma empresa inventada para o teste. Com a política colada, a resposta veio exata: até dois dias por semana, com pedido até quinta-feira, às 17h, citando os itens 1 e 2. Sobre o que o documento não dizia, respondeu: "O documento não especifica isso."',
      privacy: 'Tudo o que você cola numa conversa vai para os servidores da empresa que oferece a IA. Antes de colar um documento de trabalho, confira as regras da ferramenta e as da sua empresa. E nunca cole senhas, dados de saúde ou documentos pessoais de outras pessoas.' },
]

// Each task page says experiment, not tested request (data/seo.js, kitTaskSeo).
for (const task of TASKS) {
    task.seo = {
        title: `${task.name}: um experimento para fazer numa IA`,
        description: `${task.name}: o experimento do ${task.chap.toLowerCase()} do livro IA por dentro, com o pedido pronto para copiar e o que observar na resposta.`,
    }
}

export const TEMPLATES = [
    { id: 'a-sua-prova', kind: 'sheet', title: 'A sua própria prova', chap: 'Capítulo 11',
      desc: 'Cole em A1. Cinco tarefas reais do seu dia, os cinco pedidos sempre com as mesmas palavras, rodados em duas IAs diferentes, ou na mesma IA com e sem o modo de raciocínio.',
      rows: [['Tarefa', 'O pedido, sempre com as mesmas palavras', 'Nota na primeira (1 a 5)', 'Erro mais grave na primeira', 'Nota na segunda (1 a 5)', 'Erro mais grave na segunda'], ['Um e-mail difícil', '', '', '', '', ''], ['Um resumo', '', '', '', '', ''], ['Uma conta', '', '', '', '', ''], ['Uma pergunta sobre um documento (colado na conversa)', '', '', '', '', ''], ['Uma dúvida da sua área', '', '', '', '', '']],
      after: 'Guarde o arquivo. Quando sair um modelo novo que "muda tudo", rode a sua prova de novo, e decida com os seus próprios números.' },
    { id: 'noticia-de-ia', kind: 'check', title: 'Como ler uma notícia de IA', chap: 'Capítulo 11',
      desc: 'As perguntas que dá para fazer a qualquer notícia de IA.',
      table: [['Pergunta', 'Por quê'], ['Quem está dizendo, e o que ganha com isso?', 'Um anúncio de empresa não é uma avaliação independente'], ['Qual é a prova?', '"O modelo é o melhor" em quê? Numa prova padronizada, num ranking de preferência ou numa demonstração escolhida a dedo?'], ['Isso vale para o seu uso?', 'Ir bem numa olimpíada de matemática não diz nada sobre resumir as suas reuniões'], ['É o modelo ou é a ferramenta?', 'Uma resposta que pesquisou na internet não prova que o modelo "sabe" aquilo'], ['Qual é a data?', 'Em IA, uma afirmação de seis meses atrás pode já estar velha']],
      after: 'Desconfie de verbos absolutos: "resolve", "substitui", "entende", "nunca erra". Pergunte: resolve como, medido por quem, e onde falha?' },
    { id: 'os-quatro-gestos', kind: 'check', title: 'Os quatro gestos dos experimentos', chap: 'Antes de começar',
      desc: 'Existem em quase toda IA de conversa, com nomes e lugares que mudam de um aplicativo para outro.',
      table: [['Gesto', 'Como'], ['Abrir uma conversa nova', 'Uma conversa nova começa do zero, sem lembrar da anterior. Procure um botão como "nova conversa" ou um sinal de mais'], ['Pedir outra resposta', 'Muitas IAs têm um botão para gerar de novo a mesma resposta, às vezes com o desenho de uma seta em círculo. Se não achar, faça a mesma pergunta numa conversa nova'], ['Anexar ou colar um texto', 'Cole o texto na caixa da mensagem, ou use o botão de anexar arquivo, às vezes com o desenho de um clipe'], ['Pedir sem pesquisa', 'Escreva no próprio pedido: "responda sem pesquisar na internet"']] },
]

export const KIT = {
    slug: 'ia-por-dentro',
    checkedOn: 'Endereços abertos e conferidos em 23/09/2026; o Treine um GPT, em 31/10/2026. Se algum tiver saído do ar, procure pelo nome.',
    lead: 'Os experimentos do livro, um por capítulo, com o pedido pronto para copiar, o que observar na resposta e, quando o livro mostra a resposta, o que ele viu; as dez coisas que mudam quando você sabe como ela funciona, o glossário e os endereços que mudam mais rápido do que um livro.',
    promises: ['Um experimento por capítulo', 'Sem programar e sem matemática', 'O que você digita fica no seu navegador'],
}

export const RULES = [
    { lead: 'O provável não é o verdadeiro.', text: 'A IA escolhe o que costuma vir em seguida, e quase sempre isso coincide com a verdade. Quase. Confira os detalhes, não só a resposta principal.' },
    { lead: 'Mostre o texto, não confie na lembrança.', text: 'Cole o contrato, a norma, o e-mail: o que está na conversa é muito mais confiável do que o que o modelo lembra do treinamento.' },
    { lead: 'Nunca cole senhas, dados de saúde ou documentos pessoais de outras pessoas.', text: 'Tudo o que você cola numa conversa sai do seu computador e vai para os servidores da empresa que oferece a IA.' },
]

export const TOKENIZER = [
    { title: 'O seu nome completo', description: 'Em quantos tokens ele quebra?' },
    { title: 'Uma palavra longa do seu trabalho', description: 'No teste do livro, "procrastinação" virou três tokens: pro · crast · inação.' },
    { title: 'A mesma frase em português e em inglês', description: 'Qual gasta mais? No teste do livro, "Por favor, envie o relatório financeiro até sexta-feira à tarde." deu 13 tokens, e "Please send the financial report by Friday afternoon.", 9.' },
]

export const TOOL = [
    { title: 'Repare se ela mostra que pesquisou', description: 'E quais páginas usou.' },
    { title: 'Abra uma das páginas', description: 'E confira se a informação está lá.' },
    { title: 'Pergunte de novo, sem a ferramenta', description: 'Numa conversa nova, a mesma pergunta acrescentando: "responda sem pesquisar na internet". Ela admitiu que não sabia, ou respondeu com a lembrança antiga?' },
]

export const TEN_THINGS = [
    { title: 'Pergunte de novo quando a resposta importar.', text: 'A resposta sai um token de cada vez, por sorteio; uma segunda resposta mostra o que é firme e o que variou. (Capítulo 1)' },
    { title: 'O provável não é o verdadeiro.', text: 'A IA escolhe o que costuma vir em seguida, e quase sempre isso coincide com a verdade. Quase. (Capítulos 1 e 7)' },
    { title: 'Confira os detalhes, não só a resposta principal.', text: 'O erro costuma morar no nome, na data, no número e na citação que você nem pediu. (Capítulo 7)' },
    { title: 'Mostre o texto, não confie na lembrança.', text: 'Cole o contrato, a norma, o e-mail: o que está na conversa é muito mais confiável do que o que o modelo lembra do treinamento. (Capítulos 4 e 9)' },
    { title: 'Peça para citar o trecho.', text: '"Responda só com base no documento e cite o trecho" transforma uma resposta em algo que você consegue conferir. (Capítulo 9)' },
    { title: 'Dê espaço para pensar.', text: 'Para problemas de vários passos, use o modo de raciocínio ou peça o passo a passo; a IA pensa escrevendo. (Capítulo 8)' },
    { title: 'Leia o raciocínio para conferir, não como confissão.', text: 'O caminho que a IA mostra ajuda a achar o erro, mas nem sempre é o caminho que ela seguiu. (Capítulo 8)' },
    { title: 'Para contas que importam, peça uma ferramenta.', text: 'Uma calculadora ou um programa fazem a conta exata; a IA só precisa escrever o pedido. (Capítulo 10)' },
    { title: 'Não existe resposta neutra.', text: 'O tom, as recusas e as preferências de um assistente vêm dos exemplos e das notas que uma empresa escolheu. (Capítulos 5 e 6)' },
    { title: 'Agente só com acesso mínimo, e com confirmação antes de agir.', text: 'Tudo o que ele lê pode influenciar o que ele faz, e alguns erros não têm volta. (Capítulo 10)' },
]

export const GLOSSARY = [
    { term: 'Agente', text: 'Um modelo que trabalha em ciclos, pensando, usando ferramentas e lendo os resultados, até terminar uma tarefa. (Capítulo 10)' },
    { term: 'Ajuste fino (fine-tuning)', text: 'O segundo treinamento, com exemplos de pedidos e respostas ideais, que transforma um modelo base num assistente. (Capítulo 5)' },
    { term: 'Algoritmo', text: 'Uma receita de passos que um computador segue para resolver um problema. (Capítulo 2)' },
    { term: 'Alucinação (hallucination)', text: 'Uma informação falsa apresentada pelo modelo com a mesma segurança de um fato. (Capítulo 7)' },
    { term: 'Aprendizado dentro do contexto (in-context learning)', text: 'A capacidade de aprender uma tarefa na hora, pelos exemplos colocados no prompt. (Capítulo 5)' },
    { term: 'Aprendizado por reforço (reinforcement learning)', text: 'Treinar o modelo deixando que ele tente e dando nota às tentativas, em vez de mostrar a resposta pronta. (Capítulo 6)' },
    { term: 'Arquitetura', text: 'O jeito como um modelo é montado por dentro. (Capítulo 3)' },
    { term: 'Atenção (attention)', text: 'O mecanismo que deixa cada token buscar, entre os anteriores, os que mais importam para o seu sentido. (Capítulo 3)' },
    { term: 'Benchmark', text: 'Uma prova padronizada usada para medir e comparar modelos. (Capítulo 11)' },
    { term: 'Bit e byte', text: 'Um bit é um 0 ou um 1; um byte é um grupo de oito bits, que pode ter 256 valores. (Capítulo 2)' },
    { term: 'BPE (Byte-Pair Encoding)', text: 'O algoritmo que monta o vocabulário de tokens juntando os pares de símbolos mais frequentes. (Capítulo 2)' },
    { term: 'Cadeia de raciocínio (chain of thought)', text: 'Os passos que o modelo escreve antes da resposta, e que servem de apoio para o passo seguinte. (Capítulo 8)' },
    { term: 'Camada', text: 'Cada rodada do Transformer, em que atenção e cálculo se repetem sobre o resultado da rodada anterior. (Capítulo 3)' },
    { term: 'Decoder e encoder', text: 'As duas metades do Transformer original. Os modelos de conversa usam só o decoder, em que cada token vê apenas os anteriores. (Capítulo 3)' },
    { term: 'Embedding', text: 'A lista de números que representa um token dentro do modelo, o seu "perfil" de significado. (Capítulo 3)' },
    { term: 'Injeção de instruções (prompt injection)', text: 'Instruções escondidas num texto que o modelo lê, como uma página ou um e-mail, e que ele pode obedecer como se viessem do usuário. (Capítulo 10)' },
    { term: 'Janela de contexto (context window)', text: 'O trecho máximo de texto, medido em tokens, que o modelo consegue ler de uma vez: a memória de trabalho da conversa. (Capítulos 4 e 9)' },
    { term: 'Lembrança vaga e memória de trabalho', text: 'As duas memórias de um modelo: o que ele aprendeu no treinamento, espalhado nos parâmetros, e o que está na conversa agora, na janela de contexto. (Capítulo 9)' },
    { term: 'Modelo aberto', text: 'Um modelo cujos parâmetros foram publicados, e que qualquer pessoa pode baixar e rodar no próprio computador. (Capítulo 1)' },
    { term: 'Modelo base (base model)', text: 'O resultado do pré-treinamento: um "simulador da internet" que só sabe continuar texto. (Capítulo 4)' },
    { term: 'Modelo de linguagem', text: 'Um programa treinado para prever o próximo token de um texto. Os grandes modelos de linguagem estão por trás do ChatGPT, do Claude e do Gemini. (Capítulo 1)' },
    { term: 'Modelo de raciocínio', text: 'Um modelo treinado para escrever um raciocínio antes da resposta. (Capítulo 8)' },
    { term: 'Modelo de recompensa', text: 'Um segundo modelo, treinado com comparações feitas por pessoas, que dá notas às respostas no RLHF. (Capítulo 6)' },
    { term: 'Parâmetros (parameters)', text: 'Os bilhões de números ajustados no treinamento, que definem o que o modelo faz com cada token. (Capítulo 4)' },
    { term: 'Pré-treinamento (pre-training)', text: 'O primeiro e mais caro treinamento: o jogo de adivinhar o próximo token, jogado com trilhões de tokens de texto. (Capítulo 4)' },
    { term: 'Processamento de linguagem natural (Natural Language Processing, NLP)', text: 'A área da IA que cria a ponte entre a língua das pessoas e a lógica dos computadores. (Capítulo 3)' },
    { term: 'Prompt', text: 'O texto que você entrega ao modelo: o seu pedido, com tudo o que vier junto. (Capítulo 5)' },
    { term: 'Rede neural', text: 'Um programa feito de camadas de cálculos simples, com milhões ou bilhões de números ajustáveis, que aprende padrões a partir de exemplos. (Capítulo 3)' },
    { term: 'Reforço com respostas verificáveis', text: 'O aprendizado por reforço em que a nota vem de uma conferência automática: a conta bateu com o gabarito, o programa passou nos testes. (Capítulo 6)' },
    { term: 'RLHF (Reinforcement Learning from Human Feedback)', text: 'Aprendizado por reforço com retorno humano: o modelo pratica para ganhar notas de um juiz que imita o gosto das pessoas. (Capítulo 6)' },
    { term: 'Sorteio (sampling)', text: 'A escolha do próximo token entre os candidatos, em que os mais prováveis têm mais chance de sair. É por isso que a mesma pergunta pode dar respostas diferentes. (Capítulo 1)' },
    { term: 'Temperatura', text: 'O ajuste de quanto sorteio entra na escolha do próximo token: baixa, respostas mais previsíveis; alta, mais variadas. (Capítulo 1)' },
    { term: 'Token', text: 'O pedaço de texto com que o modelo trabalha: uma palavra, parte de uma palavra, um sinal ou um espaço, cada um com um número. (Capítulos 1 e 2)' },
    { term: 'Tokenizador', text: 'O programa que quebra o texto em tokens e dá um número a cada um. (Capítulo 2)' },
    { term: 'Tokens especiais', text: 'Tokens que não aparecem na tela e marcam quem fala numa conversa e onde uma fala termina. (Capítulo 5)' },
    { term: 'Transformer', text: 'A arquitetura criada em 2017 que está por dentro de quase todos os grandes modelos de linguagem de hoje. (Capítulo 3)' },
    { term: 'Trapaça com a recompensa (reward hacking)', text: 'Quando o modelo aprende a ganhar nota alta do juiz sem dar respostas melhores. (Capítulo 6)' },
    { term: 'Uso de ferramentas (tool use)', text: 'A capacidade de escrever pedidos a outros programas, como uma calculadora ou uma busca, e usar o resultado na resposta. (Capítulo 10)' },
    { term: 'Vetor', text: 'Uma lista de números. Dentro do modelo, cada token vira um vetor. (Apêndice)' },
]

// The addresses of chapters/o-kit.md, opened and checked on 23/09/2026
// (Treine um GPT on 31/10/2026). They take the place of the official sources
// the task kits list: this book has no law, price or setting to check.
export const SOURCES = [
    { title: 'Tokenizador', text: 'O Tiktokenizer. Escolha o tokenizador o200k_base para ver os tokens como o GPT-4o os vê, os mesmos do capítulo 2.', links: [{ label: 'tiktokenizer.vercel.app', href: 'https://tiktokenizer.vercel.app/' }] },
    { title: 'Treine um GPT', text: 'Um GPT minúsculo treina no navegador, com os parâmetros, a atenção e as probabilidades à vista: o capítulo 4 em miniatura. Conferido em 31 de outubro de 2026.', links: [{ label: 'ciromaciel.click/tools/train-gpt', href: 'https://ciromaciel.click/tools/train-gpt' }] },
    { title: 'Uma IA de conversa gratuita', text: 'Qualquer uma serve, como o ChatGPT, o Gemini, o Claude ou o Copilot, que têm versões gratuitas no navegador e no celular. Para os experimentos dos capítulos 8 e 10, vale uma que tenha modo de raciocínio e busca na internet.', links: [] },
    { title: 'Ranking de modelos', text: 'O Arena. Lembre dos limites do capítulo 11: use o ranking como termômetro, não como sentença.', links: [{ label: 'arena.ai/leaderboard', href: 'https://arena.ai/leaderboard' }] },
    { title: 'Newsletters', text: 'Em português, Inteligência Artificial, da Exame, e IA Brasil Notícias. Em inglês, AINews, resumo diário para quem trabalha com IA.', links: [{ label: 'Exame', href: 'https://lps.exame.com/newsletter-ai' }, { label: 'IA Brasil Notícias', href: 'https://iabrasilnoticias.com.br/newsletter/' }, { label: 'AINews', href: 'https://news.smol.ai/' }] },
    { title: 'Artigos científicos', text: 'O arXiv, o repositório aberto onde sai a maior parte das pesquisas citadas neste livro.', links: [{ label: 'arxiv.org', href: 'https://arxiv.org/' }] },
    { title: 'O vídeo que inspirou este livro', text: 'Andrej Karpathy, Deep Dive into LLMs like ChatGPT, em inglês, 3 horas e meia.', links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=7xTGNNLPyMI' }] },
    { title: 'Uma explicação curta e visual', text: '3Blue1Brown, Large Language Models explained briefly, em inglês, com legendas.', links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=LPZh9BOjkQs' }] },
    { title: 'Os modelos abertos dos testes', text: 'A família Qwen2.5, no Hugging Face. Rodá-los exige saber programar.', links: [{ label: 'Qwen2.5-0.5B', href: 'https://huggingface.co/Qwen/Qwen2.5-0.5B' }] },
    { title: 'Para quem programa', text: 'Os projetos de código aberto em alta no GitHub Trending, filtrado por Python, e o r/LocalLLaMA, no Reddit, onde se discute como rodar modelos no próprio computador.', links: [{ label: 'GitHub Trending', href: 'https://github.com/trending/python' }, { label: 'r/LocalLLaMA', href: 'https://www.reddit.com/r/LocalLLaMA/' }] },
]

export const UPDATES = [
    { date: '19/11/2026', text: 'O kit online entra no ar, com os experimentos de cada capítulo, as dez coisas, o glossário e os endereços do livro. Endereços conferidos em 23/09/2026; o Treine um GPT, em 31/10/2026.' },
]

// ─── The kit as one object, for pages/BookKit.jsx ─────────────────────────
//
// No exercises and no notebook: the bands sit between the templates (white)
// and the sources (gray), so they alternate gray and white, starting gray and
// ending white.

const steps = (items, icons) => items.map((item, index) => ({ ...item, icon: icons[index] }))
const alternate = bands => bands.map((band, index) => ({ ...band, background: index % 2 === 0 ? 'gray' : 'white' }))

export default {
    slug: 'ia-por-dentro',
    // The localStorage prefix of this kit: changing it later would lose what
    // readers typed.
    storage: 'kit-ipd',
    testedOn: '23 de setembro de 2026',
    promptsLead: 'O experimento do fim de cada capítulo, com o pedido do livro pronto para copiar. Quando o experimento pede uma resposta "sem pesquisar", a frase já está no pedido. Rode você também: a sua resposta vai sair diferente, e o capítulo 1 explica por quê.',
    testedNote: 'Exemplos rodados de verdade em 23/09/2026: os de assistente com o Claude Haiku 4.5, numa configuração neutra, sem ferramentas e sem configurações pessoais; os de modelos abertos com o Qwen2.5, de meio bilhão a 3 bilhões de parâmetros. Rodados de novo, alguns darão respostas diferentes.',
    rulesTitle: 'Três coisas antes de qualquer experimento',
    // The words of the prompts section and of the task pages, for experiments.
    promptsSubtitle: 'Os experimentos',
    promptsTitle: 'Copie, rode e observe',
    taskLabel: 'Experimento',
    tasksLabel: 'Experimentos',
    resultLabel: 'O que o livro viu',
    hideEmptyInputs: true,
    itemLead: 'O experimento do livro IA por dentro, com o pedido pronto para copiar, o que observar na resposta e, quando o livro mostra a resposta, o que ele viu.',
    bridgeText: 'O livro explica por que a IA responde assim, um capítulo por vez: os tokens, o treino, a atenção, por que ela erra, o que ela lembra e como usa ferramentas, cada um com o seu experimento.',
    sourcesSubtitle: 'Endereços que mudam mais rápido do que um livro',
    sourcesTitle: 'Os endereços do kit',
    notebook: false,
    KIT,
    RULES,
    TASKS,
    TEMPLATES,
    EXERCISES: [],
    SOURCES,
    UPDATES,
    bands: alternate([
        {
            type: 'steps',
            id: 'tokenizador',
            subtitle: 'Capítulo 2',
            title: 'Os tokens com os próprios olhos',
            description: 'Abra um tokenizador, como o Tiktokenizer, em tiktokenizer.vercel.app, e escolha o o200k_base, o do GPT-4o. No celular, a página fica apertada, mas funciona. Anote o que mais surpreendeu: o capítulo 7 volta a esses pedaços, quando a IA erra ao contar letras.',
            items: steps(TOKENIZER, ['IconSearch', 'IconFileText', 'IconScale']),
        },
        {
            type: 'steps',
            id: 'ferramenta',
            subtitle: 'Capítulo 10',
            title: 'Uma ferramenta trabalhando',
            description: 'Numa IA de conversa que faça buscas na internet, pergunte algo que mudou nesta semana, como o resultado de um jogo ou uma notícia recente. No teste do livro, com uma calculadora oferecida, o Qwen2.5 de 1,5 bilhão de parâmetros escreveu um pedido à ferramenta e respondeu 350.073.952, a conta certa de 48.193 × 7.264; sem ela, respondeu 345.000.064, e errou por mais de cinco milhões.',
            items: steps(TOOL, ['IconSearch', 'IconFileText', 'IconMessageOff']),
        },
        {
            type: 'criteria',
            id: 'dez-coisas',
            subtitle: 'O resumo prático',
            title: 'Dez coisas que mudam quando você sabe como ela funciona',
            items: TEN_THINGS.map((thing, index) => ({ criterion: `${index + 1}. ${thing.title}`, value: thing.text })),
        },
        {
            type: 'criteria',
            id: 'glossario',
            subtitle: 'As palavras do livro',
            title: 'O glossário',
            description: 'Cada termo com o capítulo onde é explicado. Os que nasceram em inglês trazem o nome em inglês entre parênteses, para você reconhecê-los quando encontrar por aí.',
            items: GLOSSARY.map(entry => ({ criterion: entry.term, value: entry.text })),
        },
    ]),
}
