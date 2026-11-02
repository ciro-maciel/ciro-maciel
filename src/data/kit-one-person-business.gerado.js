// Generated from the chapters by learning/tools/kit.ts (1.0.0): do not edit; regenerate.
// bun tools/kit.ts one-person-business

export const TASKS = [
    {
        id: "c01-1",
        chap: "Capítulo 1",
        group: 1,
        name: "As cinco perguntas",
        tpl: "Este é o meu negócio: {f1}.\nResponda às cinco perguntas do teste de caber numa pessoa: o que exige presença física; o que exige resposta humana em minutos; o que já é repetível; o que já está num sistema; quem é o cliente que não aceita uma pessoa só. Para cada parte do negócio, diga se cabe numa pessoa com agentes, se cabe com ajuda pontual, ou se não cabe.",
        fields: [
            {
                k: "f1",
                label: "O que você vende, a quem, como entrega",
                ph: "o que você vende, a quem, como entrega"
            }
        ],
        checks: [
            "As partes que não cabem ditas com clareza, e não escondidas num \"com algumas adaptações\"",
            "O repetível e o que já está em sistema marcados como os primeiros candidatos a cargo de agente",
            "O cliente que não aceita uma pessoa só nomeado, porque ele decide o formato antes de você"
        ]
    },
    {
        id: "c02-1",
        chap: "Capítulo 2",
        group: 2,
        name: "A constituição, a partir do que já existe",
        tpl: "Escreva a primeira versão da constituição do meu negócio a partir destes materiais: {f1}. Seções: o que é e para quem; como fala e o que nunca usa; o que pode prometer; o que nunca promete; preço, desconto e dinheiro de volta; dados das pessoas; o que os agentes fazem sozinhos e o que esperam eu; quando me chamar na hora; o que acontece quando um agente erra. Marque cada ponto que os materiais deixam em dúvida.",
        fields: [
            {
                k: "f1",
                label: "Os materiais: o site, o termo de compra, as respostas que você mais dá, a sua lista do não",
                ph: "o site, o termo de compra, as respostas que eu mais dou, a minha lista do não"
            }
        ],
        checks: [
            "Cada promessa com a fonte de onde saiu (o site, o termo), para você conferir se ainda vale",
            "Os pontos em dúvida marcados, e não resolvidos pelo agente",
            "Nenhum número que você não escreveu"
        ]
    },
    {
        id: "c03-1",
        chap: "Capítulo 3",
        group: 3,
        name: "O cartão",
        tpl: "Escreva o cartão do cliente do meu negócio, respondendo: quem chega e em que estado; o que quer e não diz; o que trava; com o que sai do primeiro contato. Proponha a pergunta que separa (uma só, que o cliente certo responde sim sem pensar) e o primeiro ciclo do negócio, decidido pelo estado de quem chega e não pelo que eu vendo. O meu negócio: {business}.",
        fields: [],
        checks: [
            "O estado descrito com o que aconteceu antes de a pessoa chegar, e não com idade e profissão",
            "Uma pergunta que separa que exclui alguém de verdade",
            "Um primeiro ciclo que não começa por \"comprar\", se a pessoa ainda não confia"
        ]
    },
    {
        id: "c04-1",
        chap: "Capítulo 4",
        group: 4,
        name: "As duas perguntas",
        tpl: "Passe cada frase abaixo por duas perguntas. Teste de substituição: com o nome de {f1} no lugar do meu, a frase continua verdadeira? Relevância: a pessoa que compra se importa com isso, e por quê? Marque as que caem e diga em qual pergunta. Depois, diga qual é a categoria do meu negócio na palavra que o cliente usa para procurar. Frases: {f2}",
        fields: [
            {
                k: "f1",
                label: "O seu concorrente mais forte",
                ph: "o seu concorrente mais forte"
            },
            {
                k: "f2",
                label: "As frases de venda do seu site, do perfil e da apresentação, uma por linha",
                ph: "as suas"
            }
        ],
        checks: [
            "O nome do concorrente colado de verdade, e não \"um concorrente genérico\"",
            "As frases do tamanho (\"respondo pessoalmente\", \"é pequeno\") avaliadas na relevância, e não aprovadas só por serem únicas",
            "A categoria na palavra do cliente, e não no seu jargão"
        ]
    },
    {
        id: "c05-1",
        chap: "Capítulo 5",
        group: 5,
        name: "O mapa",
        tpl: "Faça o mapa do que roda no meu negócio, parte por parte: {f1}. Para cada uma, uma palavra (roda sozinho, com gente, quebrado ou falta), o sistema ou a ferramenta em que ela mora, e o que falta para um agente operar aquela parte sem mim no meio. Diga o que é \"com gente\" por desenho (aprovar, pagar) e não por falta.",
        fields: [
            {
                k: "f1",
                label: "As partes do seu negócio",
                ph: "as partes"
            }
        ],
        checks: [
            "O quebrado separado do que falta",
            "O \"com gente\" por desenho marcado, para ninguém tentar automatizar a sua aprovação",
            "Para cada peça, o sistema onde ela mora, e não \"o agente faz\""
        ]
    },
    {
        id: "c06-1",
        chap: "Capítulo 6",
        group: 6,
        name: "O cargo",
        tpl: "Esta é a minha semana de trabalho: {f1}.\nEscolha a área que mais se repete e escreva o cargo de um agente para ela, respondendo às cinco perguntas: o que entrega (uma frase que não termina) e o número que diz se vai bem; o que lê e onde anota o que aprendeu; quando começa sem mim; o que espera eu aprovar; quem o vigia. Na quarta, comece por \"tudo que sai em meu nome, gasta ou devolve dinheiro\".",
        fields: [
            {
                k: "f1",
                label: "A sua semana de trabalho, anotada",
                ph: "a lista"
            }
        ],
        checks: [
            "A frase que não termina, e não uma tarefa (\"nenhum e-mail fica sem resposta além do prazo\", e não \"responder e-mails\")",
            "Um número só, que você consegue ver toda semana",
            "O gatilho escrito no cargo, e não \"quando você pedir\"",
            "A quarta pergunta longa no começo, que você encurta depois, com dado"
        ]
    },
    {
        id: "c07-1",
        chap: "Capítulo 7",
        group: 7,
        name: "As primeiras linhas, com o que está na sua cabeça",
        tpl: "Vou te contar as decisões que tomei no meu negócio e os erros que já aconteceram mais de uma vez. Transforme em linhas destes três arquivos, no formato da primeira linha de cada um. Toda linha de aprendizado termina numa regra que muda o que um agente faz, e não num relato. Se faltar o porquê de uma decisão, pergunte, não invente. O que eu sei: {f1}.",
        fields: [
            {
                k: "f1",
                label: "Conte, do jeito que vier",
                ph: "conte, do jeito que vier"
            }
        ],
        checks: [
            "Toda decisão com o porquê, e as que ficaram sem ele marcadas com uma pergunta",
            "Toda linha de aprendizado terminando numa regra (\"antes de responder sobre prazo, ler o termo\"), e não num lamento (\"o agente errou o prazo\")",
            "Nenhuma linha com dado de uma pessoa que você atende"
        ]
    },
    {
        id: "c08-1",
        chap: "Capítulo 8",
        group: 8,
        name: "A ficha",
        tpl: "Para cada agente abaixo, escreva a ficha de degrau: o degrau de hoje (rascunha / age no que volta atrás / age sozinho numa classe), o que ele pode fazer nesse degrau, a classe que ele subiria primeiro, e a regra de subida em número: quantas semanas e quanto aprovado sem edição. Agentes e cargos: {f1}",
        fields: [
            {
                k: "f1",
                label: "Os seus agentes e os cargos deles",
                ph: "os seus"
            }
        ],
        checks: [
            "Uma classe estreita para subir primeiro (a frase da semana, a resposta de acesso), e não \"o atendimento\"",
            "A regra de subida com número e prazo, e não \"quando estiver confiável\"",
            "Nada que paga, apaga ou mexe em conta com chance de subir"
        ]
    },
    {
        id: "c09-1",
        chap: "Capítulo 9",
        group: 9,
        name: "As três listas",
        tpl: "Com as ações irreversíveis abaixo, escreva as três listas para o topo das regras dos meus agentes: o que fazem sozinhos; o que preparam e esperam eu aprovar, com o que vai sair à vista; e quando me chamam na hora, terminando em \"qualquer situação que estas regras não cobrem\". Ações: {f1}",
        fields: [
            {
                k: "f1",
                label: "As ações irreversíveis do seu negócio",
                ph: "a sua lista"
            }
        ],
        checks: [
            "Nada que paga, devolve, publica ou apaga na primeira lista",
            "A terceira lista com as situações de relação (sofrimento, reclamação pública, ameaça de processo) e não só as técnicas",
            "O fim aberto, \"o que estas regras não cobrem\""
        ]
    },
    {
        id: "c10-1",
        chap: "Capítulo 10",
        group: 10,
        name: "A linha",
        tpl: "A partir de agora, termine toda entrega com uma linha de registro: data, o que você recebeu, o que entregou, onde ficou (o caminho do arquivo, o endereço, o id no sistema) e o que espera minha aprovação. Escreva a linha em {f1}, sem apagar as anteriores.",
        fields: [
            {
                k: "f1",
                label: "O seu arquivo de registro",
                ph: "o seu arquivo de registro"
            }
        ],
        checks: [
            "O lugar exato onde a entrega ficou, e não \"salvei o arquivo\"",
            "A linha acrescentada no registro, sem reescrever as de antes"
        ]
    },
    {
        id: "c11-1",
        chap: "Capítulo 11",
        group: 11,
        name: "A tabela",
        tpl: "Liste as regras do meu negócio que estão nestes documentos: {f1}. Para cada uma, diga se ela vira um teste automático (o que ele confere, e onde) ou se é julgamento (quem julga). Comece pelas que, quebradas, saem em meu nome ou custam dinheiro.",
        fields: [
            {
                k: "f1",
                label: "As suas regras, a constituição, as instruções dos agentes",
                ph: "as suas regras, a constituição, as instruções dos agentes"
            }
        ],
        checks: [
            "Cada teste conferindo a substância (a referência, o número, a frase), e não só se o campo existe",
            "As regras de tom e de escolha na coluna do julgamento, com um nome ao lado",
            "As que custam dinheiro ou saem em seu nome no topo"
        ]
    },
    {
        id: "c12-1",
        chap: "Capítulo 12",
        group: 12,
        name: "A métrica-mãe",
        tpl: "Para o meu negócio, {business}, proponha a métrica-mãe: um número só que, ruim, invalida todo o resto, e que diz se o negócio funciona para quem chega. Escreva o limite a partir do qual o plano muda, e de onde o número sai. Depois, monte o placar semanal com as colunas que importam, cada uma com a fonte, e com os três estados: valor, zero, sem fonte.",
        fields: [],
        checks: [
            "Uma métrica que mede quem chega, e não o seu esforço (posts publicados, horas trabalhadas)",
            "O limite escrito antes de existir o primeiro valor",
            "Cada coluna com a fonte, e o \"sem fonte\" como estado, e não como zero"
        ]
    },
    {
        id: "c13-1",
        chap: "Capítulo 13",
        group: 13,
        name: "A lista",
        tpl: "Liste os pares de coisas no meu negócio que têm de dizer o mesmo: preço no site e no sistema de cobrança, o que a página promete e o que o produto faz, endereços citados e endereços que respondem, e os outros que você achar nestes materiais: {f1}. Para cada par, diga como conferir em segundos, e se a fonte responde. Diga também o que eu vendo ou recebo por um caminho que nenhum sistema lê.",
        fields: [
            {
                k: "f1",
                label: "Os seus materiais: o site, a página de preço, o sistema de cobrança",
                ph: "os seus"
            }
        ],
        checks: [
            "Cada par com uma conferência barata (um endereço que responde, um número contado), e não \"revisar\"",
            "A fonte conferida antes do conteúdo",
            "O caminho que nenhum sistema lê, nomeado"
        ]
    },
    {
        id: "c14-1",
        chap: "Capítulo 14",
        group: 14,
        name: "O mapa",
        tpl: "Este é o meu negócio: {business}. Estas são as minhas cobranças em dólar no último mês: {f1}. Monte o meu mapa Brasil com cinco linhas: a empresa (o que eu preciso perguntar ao contador sobre faturamento e atividade), a marca (onde o nome da empresa aparece e onde não aparece), a moeda (quanto do custo é câmbio e o limite em que eu reviso), a cobrança (Pix avulso, cartão recorrente, e o que libera o acesso em cada um) e a nota (que nota a minha atividade emite e por qual sistema). Para cada linha, diga o que um agente pode preparar e o que só eu faço. Não afirme valor de imposto, teto ou data sem me dizer de onde tirou; o que não souber, liste como pergunta para o contador.",
        fields: [
            {
                k: "f1",
                label: "A lista, com o valor em real",
                ph: "a lista, com o valor em real"
            }
        ],
        checks: [
            "Nenhum número de imposto, teto ou data sem fonte, e as dúvidas listadas como perguntas para o contador",
            "A emissão da nota, o pagamento e a assinatura do lado do \"só eu\"",
            "O câmbio como um número com limite, e não como reclamação"
        ]
    }
]

export const TRAIL = [
    {
        slug: "uma-pessoa-sete-produtos",
        title: "Uma pessoa, mais de quinze produtos",
        ready: [
            "cada parte do seu negócio tem uma das três marcas (cabe, cabe com ajuda, não cabe), e você sabe quais partes viram os primeiros cargos."
        ],
        time: [
            {
                label: "Tempo",
                text: "meia hora."
            }
        ],
        tasks: [
            "c01-1"
        ],
        step: "o teste de caber numa pessoa: cinco perguntas sobre o seu negócio, e a marca do que teria de virar cargo de agente.",
        part: "Decidir"
    },
    {
        slug: "o-que-eu-nao-faco",
        title: "O que eu não faço",
        ready: [
            "a lista do não tem três itens com motivo e data, a constituição tem a sua leitura, com o que você riscou e o que decidiu, e está num lugar que todo agente lê antes de agir."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma tarde."
            }
        ],
        tasks: [
            "c02-1"
        ],
        step: "a sua lista do não e a primeira versão da constituição do seu negócio, lida e corrigida por você.",
        part: "Decidir"
    },
    {
        slug: "para-quem-de-verdade",
        title: "Para quem, de verdade",
        ready: [
            "o cartão está escrito, revisado por você, e está no topo do que os seus agentes leem, junto com a constituição."
        ],
        time: [
            {
                label: "Tempo",
                text: "quarenta minutos."
            }
        ],
        tasks: [
            "c03-1"
        ],
        step: "o cartão do seu cliente, com a pergunta que separa e o primeiro ciclo, num lugar que todo agente seu lê.",
        part: "Decidir"
    },
    {
        slug: "o-diferencial-que-o-concorrente-nao-assina",
        title: "O diferencial que o concorrente não assina",
        ready: [
            "cada frase do seu site passou pelas duas perguntas, as que caíram estão na lista do que nunca se usa, e a categoria está escrita na palavra do cliente."
        ],
        time: [
            {
                label: "Tempo",
                text: "quarenta minutos."
            }
        ],
        tasks: [
            "c04-1"
        ],
        step: "a planilha das duas perguntas com as frases do seu site, e as frases que caem fora de tudo o que os seus agentes escrevem.",
        part: "Decidir"
    },
    {
        slug: "o-que-precisa-existir-embaixo",
        title: "O que precisa existir embaixo",
        ready: [
            "o mapa existe, com a palavra e o sistema de cada parte, nada está \"quebrado\" no caminho principal, e a semana zero deu certo uma vez, do começo ao fim."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma tarde para o mapa; a semana zero, o tempo de uma venda de verdade."
            }
        ],
        tasks: [
            "c05-1"
        ],
        step: "o mapa das quatro palavras do seu negócio, com a semana zero feita antes do primeiro agente.",
        part: "Decidir"
    },
    {
        slug: "a-equipe-que-nao-existe",
        title: "A equipe que não existe",
        ready: [
            "o cargo está escrito, com o gatilho dentro dele, e o agente trabalhou uma semana sem você pedir, deixando no arquivo de aprendizados o que aprendeu."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma hora para a lista e o cargo; uma semana para ver o cargo rodar."
            }
        ],
        tasks: [
            "c06-1"
        ],
        step: "um modelo de cargo, em cinco perguntas, para entregar uma área inteira a um agente, e o critério para saber quando um cargo merece um agente só dele.",
        part: "Montar a equipe que não existe"
    },
    {
        slug: "a-memoria-da-equipe",
        title: "A memória da equipe",
        ready: [
            "os três arquivos existem, com o formato na primeira linha, cada um tem pelo menos uma linha sua, e o cargo de cada agente manda ler antes e escrever depois."
        ],
        time: [
            {
                label: "Tempo",
                text: "quarenta minutos para os arquivos e as primeiras linhas; quinze minutos por semana para ler."
            }
        ],
        tasks: [
            "c07-1"
        ],
        step: "criar os três arquivos, pôr a leitura e a escrita no cargo dos seus agentes, e escrever as primeiras linhas com o que você já sabe.",
        part: "Montar a equipe que não existe"
    },
    {
        slug: "a-escada-de-confianca",
        title: "A escada de confiança",
        ready: [
            "cada agente tem a ficha, com o degrau e a regra de subida em número, e você sabe, numa tela ou numa planilha, quanto cada um teve aprovado sem edição e quanto suas aprovações esperaram na semana."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma hora para as fichas; a subida, em semanas, com dado."
            }
        ],
        tasks: [
            "c08-1"
        ],
        step: "a ficha de degrau de cada agente seu, com a regra de subida escrita, e as permissões arrumadas por classe.",
        part: "Montar a equipe que não existe"
    },
    {
        slug: "o-que-nenhum-agente-faz-sozinho",
        title: "O que nenhum agente faz sozinho",
        ready: [
            "as três listas estão no topo das regras de todos os agentes, e a ação mais perigosa não pode ser feita sem você, por desenho do sistema, e não só por instrução."
        ],
        time: [
            {
                label: "Tempo",
                text: "quarenta minutos."
            }
        ],
        tasks: [
            "c09-1"
        ],
        step: "a sua lista do nunca, as três listas no topo das regras de todos os seus agentes, e uma conferência de que o sistema segura pelo menos uma delas.",
        part: "Montar a equipe que não existe"
    },
    {
        slug: "relatorio-de-agente-nao-e-verdade",
        title: "Relatório de agente não é verdade",
        ready: [
            "toda entrega dos seus agentes termina com a linha de registro, você fez as três conferências numa entrega real, e o número da semana chega com a fonte."
        ],
        time: [
            {
                label: "Tempo",
                text: "meia hora."
            }
        ],
        tasks: [
            "c10-1"
        ],
        step: "a linha de registro em toda entrega dos seus agentes, as três conferências baratas na próxima entrega, e um número da sua semana que passa a sair do sistema e não do relatório.",
        part: "Montar a equipe que não existe"
    },
    {
        slug: "regra-que-nao-vira-teste-nao-existe",
        title: "Regra que não vira teste não existe",
        ready: [
            "a tabela existe, com cada regra marcada como teste ou julgamento, e o primeiro teste falhou quando você o quebrou e passou quando você consertou."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma hora para a tabela; meia hora para o primeiro teste."
            }
        ],
        tasks: [
            "c11-1"
        ],
        step: "a sua tabela de regra e teste, e o primeiro teste escrito e quebrado de propósito.",
        part: "Montar a equipe que não existe"
    },
    {
        slug: "vazio-nao-e-zero",
        title: "Vazio não é zero",
        ready: [
            "a métrica-mãe está escrita, com o limite, e o primeiro placar da semana tem cada coluna num dos três estados, com a fonte."
        ],
        time: [
            {
                label: "Tempo",
                text: "quarenta minutos."
            }
        ],
        tasks: [
            "c12-1"
        ],
        step: "a métrica-mãe do seu negócio, com o limite escrito, e um placar semanal com três estados e a fonte de cada número.",
        part: "Operar"
    },
    {
        slug: "quando-os-sistemas-discordam",
        title: "Quando os sistemas discordam",
        ready: [
            "a lista tem os pares e a conferência de cada um, os três primeiros foram conferidos hoje, e a falta da conferência do dia dispara um aviso."
        ],
        time: [
            {
                label: "Tempo",
                text: "quarenta minutos."
            }
        ],
        tasks: [
            "c13-1"
        ],
        step: "a sua lista de concordâncias, o primeiro par conferido hoje, e o vigia do conferente.",
        part: "Operar"
    },
    {
        slug: "o-brasil-real",
        title: "O Brasil real",
        ready: [
            "as cinco linhas do mapa estão escritas, cada número com a data e a fonte, as perguntas do contador respondidas, e a lista do que o agente prepara e do que só você faz está no topo das regras dos seus agentes."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma hora para a fatura e o mapa; uma conversa com o contador."
            }
        ],
        tasks: [
            "c14-1"
        ],
        step: "o seu mapa Brasil: as cinco decisões escritas, cada uma com a data, a fonte e quem decide, e a lista do que o agente prepara e do que só você faz.",
        part: "Operar"
    }
]

export const TEMPLATES = [
    {
        id: "e02-1",
        kind: "text",
        title: "O exemplo da Helena: a constituição",
        chap: "Capítulo 2",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "O QUE O PROGRAMA NUNCA PROMETE\n- Quilos perdidos, prazo de resultado ou \"antes e depois\".\n- Plano alimentar individual: isso é a consulta.\n- Resposta sobre o corpo de alguém por mensagem.\n\nCOMO FALA\n- Como quem come junto, e não como quem fiscaliza.\n- Nunca usa: \"sem desculpas\", \"foco total\", \"você não tem\n  disciplina\". Nunca culpa quem voltou a comer como antes.\n\nDECIDIDO PELA HELENA (dd/mm)\n- O espaço de dúvidas responde sobre as aulas e os cardápios;\n  o resto vai para a consulta.\n- A aula ao vivo prometida na página antiga não existe mais."
    },
    {
        id: "e03-1",
        kind: "text",
        title: "O exemplo da Helena: a pergunta que separa",
        chap: "Capítulo 3",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "QUEM CHEGA, E EM QUE ESTADO\nJá fez dieta muitas vezes, perdeu e voltou. Tem vergonha de ir a\nmais uma consulta e ouvir o que já sabe.\n\nO QUE QUER E NÃO DIZ\nComer num almoço de família sem culpa, e parar de recomeçar toda\nsegunda-feira.\n\nO QUE TRAVA\nO medo de mais uma dieta que não se sustenta; e a consulta, que\nparece cara para quem não sabe se vai conseguir seguir.\n\nCOM O QUE SAI DO PRIMEIRO CONTATO\nUma troca simples para o jantar de hoje, que não exige comprar\nnada.\n\nA PERGUNTA QUE SEPARA\n\"Você quer aprender a comer sem contar caloria?\""
    },
    {
        id: "m06-1",
        kind: "text",
        title: "O modelo de cargo",
        chap: "Capítulo 6",
        desc: "O modelo do capítulo, para copiar e preencher: um modelo de cargo, em cinco perguntas, para entregar uma área inteira a um agente, e o critério para saber quando um cargo merece um agente só dele.",
        text: "CARGO: [nome curto]\n1. Entrego: [frase que não termina]. Meu número: [um]\n2. Leio: [fontes]. Lembro em: [arquivo de aprendizados]\n3. Começo sem você: [horário | evento]\n4. Espero você para: [publicar, gastar, devolver, prometer...]\n5. Quem me vigia: [você | teste | outro cargo], [frequência]"
    },
    {
        id: "e06-2",
        kind: "text",
        title: "O exemplo da Helena: a equipe que não existe",
        chap: "Capítulo 6",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "CARGO: Atendimento do programa\n1. Entrego: nenhuma dúvida de quem comprou fica sem resposta além\n   de um dia útil, e toda dúvida sobre o corpo de alguém chega à\n   Helena. Meu número: dúvidas respondidas dentro do prazo, na\n   semana.\n2. Leio: a constituição, a página de suporte, o resumo de cada\n   aula. Lembro em: os aprendizados do atendimento.\n3. Começo sem você: quando chega um e-mail no endereço do\n   programa.\n4. Espero você para: responder sobre o corpo de alguém,\n   devolver dinheiro, prometer prazo ou conteúdo novo, e tudo\n   o que a página de suporte não responde.\n5. Quem me vigia: a Helena, toda sexta, lendo dez respostas\n   escolhidas ao acaso."
    },
    {
        id: "m07-1",
        kind: "text",
        title: "Os três arquivos",
        chap: "Capítulo 7",
        desc: "O modelo do capítulo, para copiar e preencher: os três arquivos de memória de um negócio (decisões, aprendizados e aposentados), o formato de linha de cada um, e a rotina de ler antes de agir e escrever depois.",
        text: "DECISÕES (data · decisão · por quê)\nAPRENDIZADOS (data · cargo · o que aconteceu · regra)\nAPOSENTADOS (data · item · por que saiu · onde vive agora)"
    },
    {
        id: "e07-2",
        kind: "text",
        title: "O exemplo da Helena: o histórico, não o modelo",
        chap: "Capítulo 7",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "DECISÕES\ndd/mm · O programa online não inclui plano individual · Por quê:\nplano individual é consulta, e dentro do programa vira consulta sem\nagenda nem avaliação.\n\nAPRENDIZADOS\ndd/mm · Atendimento · Respondeu que o acesso às aulas vale por um\nano; o termo de compra diz outra coisa · Regra: prazo, preço e\ncondição se leem no termo de compra a cada resposta, nunca da\nmemória da conversa.\n\nAPOSENTADOS\ndd/mm · O guia antigo de cardápios · Saiu porque usava contagem de\ncalorias, que o programa abandonou · Onde vive agora: os cardápios\nnovos, na área de membros."
    },
    {
        id: "e09-1",
        kind: "text",
        title: "O exemplo da Helena: nunca autônomo",
        chap: "Capítulo 9",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "FAZEMOS SOZINHOS\nLer, medir, organizar a semana, escrever rascunhos, e responder o\nque já está escrito na página de suporte.\n\nPREPARAMOS E ESPERAMOS A HELENA\nPublicar; devolver dinheiro; dar desconto; responder sobre o corpo\nde alguém; prometer prazo, aula ou conteúdo novo; apagar dados.\n\nCHAMAMOS A HELENA NA HORA\nAlguém descreve um sintoma grave, um transtorno alimentar ou\nsofrimento; uma reclamação pública; uma contestação de pagamento;\na página de venda ou o acesso fora do ar; e qualquer situação que\nestas regras não cobrem."
    },
    {
        id: "e10-1",
        kind: "text",
        title: "O exemplo da Helena: se não está no registro, não aconteceu",
        chap: "Capítulo 10",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "dd/mm · Atendimento · recebi: os e-mails da manhã · entreguei: as\nrespostas de acesso enviadas, as outras em rascunho · onde: caixa\ndo programa, pastas Enviados e Rascunhos · espera a Helena: duas\ndúvidas sobre o corpo, marcadas com a etiqueta Helena"
    },
    {
        id: "e14-1",
        kind: "text",
        title: "O exemplo da Helena: o mapa Brasil",
        chap: "Capítulo 14",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "EMPRESA   A atividade dela não cabe no MEI; o contador indicou a\n          empresa do Simples. Revisar quando o faturamento mudar\n          de faixa. (dd/mm, contador)\nMARCA     O programa tem nome próprio; o nome da empresa aparece\n          na nota, no termo de compra e no rodapé, nunca num post.\nMOEDA     Quatro ferramentas em dólar. Limite: se o câmbio e o\n          imposto passarem de um quinto do custo, revisar qual\n          tem alternativa em real.\nCOBRANÇA  Consulta: Pix, na hora de marcar. Programa: cartão,\n          em parcelas, ou Pix à vista. O acesso sai do pagamento\n          confirmado, nunca do comprovante.\nNOTA      Nota de serviço pelo padrão nacional, para a consulta\n          e para o programa.\n\nO AGENTE PREPARA          SÓ A HELENA FAZ\no rascunho da nota        emitir a nota\no CNPJ conferido          assinar contrato\no aviso do câmbio         pagar a fatura\no lembrete do Pix aberto  devolver um Pix"
    }
]
