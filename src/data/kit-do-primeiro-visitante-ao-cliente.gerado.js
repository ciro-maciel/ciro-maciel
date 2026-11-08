// Generated from the chapters by learning/tools/kit.ts (1.0.0): do not edit; regenerate.
// bun tools/kit.ts do-primeiro-visitante-ao-cliente

export const TASKS = [
    {
        id: "c01-1",
        chap: "Capítulo 1",
        group: 1,
        name: "O mapa",
        tpl: "Este é o meu negócio: {f1}.\nMonte o mapa do caminho de quem chega, em seis estações: encontrar, entender, experimentar, deixar o contato, comprar e voltar. Para cada estação, diga a peça que existe hoje (com o endereço), o estado dela (no ar e conferida, no ar e não conferida, quebrada, ou falta) e o estado em que a pessoa chega ali. No fim, diga a primeira estação em que as pessoas provavelmente param, e por quê. Não invente peça que eu não citei. O que eu tenho: {f2}.",
        fields: [
            {
                k: "f1",
                label: "O que você vende, a quem, e onde está no ar",
                ph: "o que você vende, a quem, e onde está no ar"
            },
            {
                k: "f2",
                label: "As suas páginas, perfis, formulários, a forma de pagar, como você responde",
                ph: "as suas páginas, perfis, formulários, a forma de pagar, como você responde"
            }
        ],
        checks: [
            "A peça de cada estação com o endereço, e não \"um site\"",
            "A diferença entre \"no ar\" e \"no ar e conferida\" (o mapa do site que nunca foi enviado estava no ar)",
            "A primeira estação a consertar escolhida pelo caminho, e não pelo que é mais fácil de fazer",
            "Nenhuma peça inventada para preencher a tabela"
        ]
    },
    {
        id: "c02-1",
        chap: "Capítulo 2",
        group: 2,
        name: "O orçamento",
        tpl: "Este é o meu negócio: {business}. Tenho {f1} horas por semana para vender. Monte um orçamento em blocos, com a entrega de cada bloco e a ordem em que eles caem quando a semana encolhe. Marque o bloco que nunca cai: a conversa com quem está perto de comprar. Depois, liste os blocos que se repetem do mesmo jeito toda semana e, para cada um, diga o que uma rotina de agente faria, em que horário, com que regra escrita e em que ponto eu aprovo. Não invente bloco que eu não citei. O que faço hoje para vender: {f2}.",
        fields: [
            {
                k: "f1",
                label: "Quantas horas por semana você tem para vender",
                ph: "N"
            },
            {
                k: "f2",
                label: "O que você faz hoje para vender",
                ph: "a sua lista"
            }
        ],
        checks: [
            "Um bloco que não cai que é uma conversa, e não uma tarefa de produção",
            "A ordem de queda escrita, e não \"depende\"",
            "Para cada rotina proposta, o ponto em que você aprova, antes de qualquer coisa sair em seu nome"
        ]
    },
    {
        id: "c03-1",
        chap: "Capítulo 3",
        group: 3,
        name: "A escada",
        tpl: "Este é o meu negócio: {f1}.\nDesenhe uma escada de preço com no máximo quatro degraus. Para cada degrau: o que a pessoa ganha, o limite que a faz subir, e o momento em que ela encontra esse limite. O primeiro degrau deixa a pessoa ter um resultado de verdade antes do limite. Para cada limite, diga onde ele precisa ser aplicado (o sistema que recebe o pedido, e não só a tela) e o teste que prova que ele existe.\nNão invente preço; deixe o valor em branco para eu decidir.\nAs perguntas de preço que eu mais respondo: {f2}.",
        fields: [
            {
                k: "f1",
                label: "O que vende, a quem, como cobra hoje",
                ph: "o que vende, a quem, como cobra hoje"
            },
            {
                k: "f2",
                label: "As perguntas de preço que você mais responde",
                ph: "a sua lista"
            }
        ],
        checks: [
            "Cada degrau com um limite que a pessoa reconhece pelo uso, e não por uma data",
            "O primeiro degrau que entrega resultado, e não demonstração",
            "Para cada limite, o lugar onde ele é aplicado e o teste",
            "Nenhum preço inventado"
        ]
    },
    {
        id: "c04-1",
        chap: "Capítulo 4",
        group: 4,
        name: "A página nova",
        tpl: "Este é o cartão do meu cliente: {card}. Esta é a minha página hoje: {f1}. Reescreva a página em seis movimentos, nesta ordem: tensão e resposta; reconhecer-se (duas ou três frases em primeira pessoa, cada uma com o próximo passo); um passo pequeno; prova pelo uso (só o que eu citei e que a pessoa pode conferir); dar antes de pedir; um único próximo passo. Use só fatos do texto que mandei. Liste no fim o que saiu da página e por quê. Não invente número, depoimento, escassez ou prazo.",
        fields: [
            {
                k: "f1",
                label: "O texto",
                ph: "o texto"
            }
        ],
        checks: [
            "A manchete com as palavras da pessoa, e não as do seu ramo",
            "Uma prova que se confere, e não um adjetivo",
            "Um único botão principal",
            "A lista do que saiu, para você decidir se volta",
            "Nenhum fato que não estava no seu texto"
        ]
    },
    {
        id: "c05-1",
        chap: "Capítulo 5",
        group: 5,
        name: "A pauta e o primeiro texto",
        tpl: "Este é o meu negócio: {business}. Estas são as perguntas que meus clientes fazem, com as palavras deles: {f1}. Monte uma pauta: para cada pergunta, o título (a pergunta como a pessoa digitaria), o ângulo (o que ela veio buscar) e o próximo passo que o texto oferece no fim. Depois, escreva o texto da primeira pergunta: a resposta no primeiro parágrafo, o exemplo, e o próximo passo. Use só os fatos que eu mandei: {f2}. Não invente número nem estudo.",
        fields: [
            {
                k: "f1",
                label: "As perguntas dos seus clientes, com as palavras deles",
                ph: "a lista"
            },
            {
                k: "f2",
                label: "Os seus fatos",
                ph: "os seus fatos"
            }
        ],
        checks: [
            "Títulos com as palavras da pessoa, e não as do seu ramo",
            "A resposta no primeiro parágrafo",
            "Nenhum número ou estudo que você não mandou",
            "Um próximo passo por texto"
        ]
    },
    {
        id: "c06-1",
        chap: "Capítulo 6",
        group: 6,
        name: "O pedido com estrutura",
        tpl: "ABERTURA (leia primeiro): {f1}. TETO (consulte, não copie): {f2}. NUNCA DIGA: {f3}.\nEscreva o texto de venda de {f4}. Para cada promessa do texto, mostre numa tabela no fim a frase do TETO de onde ela saiu. Se uma promessa precisaria de um fato que não está no TETO, não escreva: pergunte. Nenhum número que não esteja no TETO.",
        fields: [
            {
                k: "f1",
                label: "O cartão do cliente e a tensão da página",
                ph: "o cartão do cliente e a tensão da página"
            },
            {
                k: "f2",
                label: "O que o serviço faz, inclui, custa e não faz",
                ph: "o que o serviço faz, inclui, custa e não faz"
            },
            {
                k: "f3",
                label: "A lista, entre aspas",
                ph: "a lista, entre aspas"
            },
            {
                k: "f4",
                label: "A peça",
                ph: "a peça"
            }
        ],
        checks: [
            "Uma tabela em que toda promessa tem a frase do seu material",
            "As perguntas que o agente fez, que são os fatos que faltam no seu teto",
            "As promessas sem palavra proibida que o conferente achou"
        ]
    },
    {
        id: "c06-2",
        chap: "Capítulo 6",
        group: 6,
        name: "A conferência",
        tpl: "Leia este texto como um conferente de fatos. Para cada afirmação, diga se ela está apoiada no material abaixo, com a frase do material, ou se não está. Liste também toda promessa de prazo, de resultado ou de exclusividade, mesmo sem palavra proibida.\nTEXTO: {f1}. MATERIAL: {f2}.",
        fields: [
            {
                k: "f1",
                label: "O texto a conferir",
                ph: "o texto"
            },
            {
                k: "f2",
                label: "O teto: o que o serviço faz, inclui, custa e não faz",
                ph: "o teto"
            }
        ],
        checks: [
            "Uma tabela em que toda promessa tem a frase do seu material",
            "As perguntas que o agente fez, que são os fatos que faltam no seu teto",
            "As promessas sem palavra proibida que o conferente achou"
        ]
    },
    {
        id: "c07-1",
        chap: "Capítulo 7",
        group: 7,
        name: "A peça e o pedido",
        tpl: "Este é o meu cliente: {card}. Esta é a pergunta que ele mais me faz: {f1}. Proponha três coisas que eu posso dar de graça, sem cadastro, que resolvem um pedaço dessa pergunta e que a pessoa usa hoje. Para cada uma: o formato (guia, ferramenta, exemplo), o que ela leva se nunca mais voltar, e o pedido de contato que vem depois, com o motivo. Escreva também o texto da caixa de consentimento: o que a pessoa vai receber, com que frequência, e como sair. Nada de \"exclusivo\", \"grátis por tempo limitado\" ou escassez.",
        fields: [
            {
                k: "f1",
                label: "A pergunta",
                ph: "a pergunta"
            }
        ],
        checks: [
            "Peças que a pessoa usa sem cadastro",
            "Um pedido com motivo, depois da entrega",
            "Um texto de consentimento que diz o que, com que frequência e como sair",
            "Nenhuma escassez"
        ]
    },
    {
        id: "c08-1",
        chap: "Capítulo 8",
        group: 8,
        name: "A regra e os links",
        tpl: "Estes são os lugares onde eu ponho link: {f1}. Estas são as peças da próxima semana: {f2}. Proponha uma regra de nome para os links, com o canal, a peça e a data, curta e sem acento.\nPara cada peça, escreva o nome do link pela regra e os parâmetros de campanha (utm_source, utm_medium, utm_campaign, utm_content).\nDepois, monte a tabela de origem da semana com as colunas: peça, cliques, visitas, contatos, compras e a fonte de cada número.\nDeixe vazio o que eu ainda não meço.",
        fields: [
            {
                k: "f1",
                label: "Os lugares onde você põe link",
                ph: "a lista"
            },
            {
                k: "f2",
                label: "As peças da próxima semana",
                ph: "a lista"
            }
        ],
        checks: [
            "Uma regra que você entende sem abrir o link",
            "Um link por peça, e não um por canal",
            "Uma tabela que deixa vazio o que não é medido"
        ]
    },
    {
        id: "c09-1",
        chap: "Capítulo 9",
        group: 9,
        name: "O motivo, o ritmo e a primeira carta",
        tpl: "Este é o meu cliente: {card}. Isto é o que ele recebeu ao se inscrever: {f1}. Proponha o motivo recorrente das cartas (o que a pessoa ganha em cada uma), um ritmo que cabe em {f2} horas por semana, e três motivos para as primeiras cartas.\nEscreva a primeira: um assunto que diz o que tem dentro, uma coisa útil, um link, e a assinatura. Nada de \"última chance\", \"só hoje\" ou urgência inventada.",
        fields: [
            {
                k: "f1",
                label: "O que se deu",
                ph: "o que se deu"
            },
            {
                k: "f2",
                label: "Quantas horas por semana cabem nas cartas",
                ph: "N"
            }
        ],
        checks: [
            "Um motivo que é útil à pessoa, e não \"novidades\"",
            "Um ritmo que você consegue manter",
            "Um assunto que diz o que tem dentro",
            "Nenhuma urgência inventada"
        ]
    },
    {
        id: "c10-1",
        chap: "Capítulo 10",
        group: 10,
        name: "Os blocos e as regras",
        tpl: "Este é o meu cliente: {card}. Estas são as perguntas que ele faz: {f1}. Este é o meu acervo: {f2}. Faça três coisas:\n1. Reordene o acervo pela pergunta de quem chega, do primeiro passo ao último, e marque o que deve sair do caminho.\n2. Liste os blocos de uma sessão de gravação: dez ganchos, dez explicações e cinco fechos, cada um sem data, sem preço e sem número na fala.\n3. Escreva as regras para um agente montar peças com esses blocos: que bloco abre, explica e fecha; o que nunca se diz; e o que espera a minha aprovação.",
        fields: [
            {
                k: "f1",
                label: "A lista do capítulo 5",
                ph: "a lista do capítulo 5"
            },
            {
                k: "f2",
                label: "A lista, com a pergunta de cada peça e se ainda vale",
                ph: "a lista, com a pergunta de cada peça e se ainda vale"
            }
        ],
        checks: [
            "Um acervo reordenado por pergunta, e não por data",
            "Blocos sem número na fala",
            "Regras que dizem o que espera a sua aprovação"
        ]
    },
    {
        id: "c11-1",
        chap: "Capítulo 11",
        group: 11,
        name: "A ficha",
        tpl: "Estes são os sistemas onde meus clientes deixam rastro: {f1}. Monte a ficha mínima de uma pessoa: os eventos que entram na linha do tempo (de qual sistema, com que nome), as regras do estágio (contato, interessado, cliente, a partir de quais eventos), o evento que conta como \"começou a usar\", e a regra de juntar duas fichas. Liste também o que nunca entra na ficha, com o motivo. Não proponha nenhum campo que eu precise preencher à mão.",
        fields: [
            {
                k: "f1",
                label: "Os sistemas onde os seus clientes deixam rastro",
                ph: "a lista, com o que cada um registra"
            }
        ],
        checks: [
            "Uma ficha sem campo para digitar",
            "O estágio de cliente só a partir de pagamento confirmado",
            "Uma regra de junção que pede uma pessoa na dúvida",
            "A lista do que nunca entra, com o motivo"
        ]
    },
    {
        id: "c12-1",
        chap: "Capítulo 12",
        group: 12,
        name: "O mapa",
        tpl: "Estas são as famílias de conversa do meu negócio, com exemplos: {f1}. Monte o mapa: para cada família, o dono (agente responde sozinho, agente rascunha e espera eu, ou só eu), o prazo, e a regra do que pode e do que não pode ser dito. O agente só responde sozinho o que está escrito nesta página pública: {f2}. Dinheiro, reclamação e sofrimento são sempre meus.\nEscreva também a mensagem do pós-venda do dia seguinte à compra.",
        fields: [
            {
                k: "f1",
                label: "As famílias de conversa, com exemplos",
                ph: "a lista"
            },
            {
                k: "f2",
                label: "O endereço da página pública de suporte",
                ph: "o endereço"
            }
        ],
        checks: [
            "\"responde sozinho\" só para o que está escrito numa página pública",
            "Dinheiro, reclamação e sofrimento sempre com você",
            "Um prazo para cada família",
            "Uma mensagem de pós-venda que pergunta, e não vende"
        ]
    },
    {
        id: "c13-1",
        chap: "Capítulo 13",
        group: 13,
        name: "A tabela e as regras",
        tpl: "Este é o mapa do caminho do meu negócio: {f1}. Estas são as ferramentas que eu uso: {f2}. Monte a tabela da semana: uma linha por estação, com o número que diz se ela funciona, a fonte, e o mínimo de pessoas abaixo do qual não se tira conclusão. Depois, escreva as regras para um agente que lê esta tabela toda semana: número sem fonte não entra; vazio é \"sem fonte\", nunca zero; abaixo do mínimo, a conclusão é \"coletando\"; diante de um vazio, a ação é medir. Não preencha nenhum número.",
        fields: [
            {
                k: "f1",
                label: "As seis estações e as peças",
                ph: "as seis estações e as peças"
            },
            {
                k: "f2",
                label: "As ferramentas que você usa",
                ph: "a lista"
            }
        ],
        checks: [
            "Um número por estação, e não vários",
            "A fonte de cada um",
            "Um mínimo escrito antes dos números",
            "Regras que impedem o agente de concluir sobre o que não foi medido"
        ]
    },
    {
        id: "c14-1",
        chap: "Capítulo 14",
        group: 14,
        name: "As listas",
        tpl: "Este é o meu negócio: {f1}. Escreva duas listas para o agente que conversa com quem quer comprar:\nNUNCA (em nenhum degrau): preço diferente, desconto, promessa de resultado ou prazo, decidir dinheiro de volta, pressão (escassez, culpa, urgência), falar de novo com quem disse não. Para cada item, o que o agente faz no lugar.\nAUTOMAÇÕES QUE VALEM: as mensagens que ajudam a pessoa a fazer o que ela já decidiu, com o momento de cada uma.\nPor fim, liste as perguntas que eu devo fazer à minha ferramenta para saber se cada NUNCA mora no sistema ou só no texto.",
        fields: [
            {
                k: "f1",
                label: "O que vende, a quem, a política de preço e de dinheiro de volta que está na página",
                ph: "o que vende, a quem, a política de preço e de dinheiro de volta que está na página"
            }
        ],
        checks: [
            "Para cada nunca, o que o agente faz no lugar (passar para você, informar a página)",
            "Automações que servem à decisão que a pessoa já tomou",
            "Perguntas sobre a ferramenta, e não sobre o agente"
        ]
    }
]

export const TRAIL = [
    {
        slug: "o-negocio-no-ar-que-ninguem-conhece",
        title: "O negócio no ar que ninguém conhece",
        ready: [
            "o mapa tem as seis estações, cada uma com a peça, o endereço e o estado, e você escolheu a primeira estação a consertar, com o motivo escrito."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma hora."
            }
        ],
        tasks: [
            "c01-1"
        ],
        step: "o mapa do caminho do seu negócio, estação por estação, com a peça de cada uma e o estado dela, e a primeira estação a consertar.",
        part: "Antes da vitrine"
    },
    {
        slug: "dez-horas-por-semana",
        title: "Dez horas por semana",
        ready: [
            "o orçamento tem um número, os blocos têm entrega e ordem, o bloco que não cai está marcado, e cada bloco repetido tem escrita a rotina que o substituiria, com a hora e o ponto de aprovação."
        ],
        time: [
            {
                label: "Tempo",
                text: "trinta minutos."
            }
        ],
        tasks: [
            "c02-1"
        ],
        step: "o seu orçamento de horas para a próxima semana, com os blocos, a ordem, o bloco que não cai, e a lista do que pode virar rotina.",
        part: "Antes da vitrine"
    },
    {
        slug: "o-preco-que-sobe-sozinho",
        title: "O preço que sobe sozinho",
        ready: [
            "a escada tem no máximo quatro degraus, cada um com o limite que faz subir e o lugar onde o limite é aplicado, e um pagamento de teste provou que o degrau novo vale na hora, sem você."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma tarde."
            }
        ],
        tasks: [
            "c03-1"
        ],
        step: "a sua escada de preço, com o limite de cada degrau, onde o limite é aplicado e o teste que prova que ele existe.",
        part: "Antes da vitrine"
    },
    {
        slug: "a-pagina-que-diz-o-que-voce-faz",
        title: "A página que diz o que você faz",
        ready: [
            "cada bloco da página faz um dos seis movimentos, a página tem um botão principal, toda prova se confere, nada do limite foi usado, e a medição mostra até que bloco as pessoas chegam."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma tarde."
            }
        ],
        tasks: [
            "c04-1"
        ],
        step: "a sua primeira página reescrita pelos seis movimentos, com o que sai e o que entra, e a medição por bloco ligada.",
        part: "A vitrine"
    },
    {
        slug: "o-texto-que-a-busca-encontra",
        title: "O texto que a busca encontra",
        ready: [
            "a pauta tem as perguntas com as palavras do cliente, o primeiro texto responde no primeiro parágrafo, e a rotina de publicação está escrita e foi feita uma vez, com a data da inspeção."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma tarde para a pauta e o primeiro texto."
            }
        ],
        tasks: [
            "c05-1"
        ],
        step: "a lista das perguntas do seu cliente, o texto da primeira delas e a rotina de publicação conferida.",
        part: "A vitrine"
    },
    {
        slug: "o-texto-de-venda-que-a-ia-exagera",
        title: "O texto de venda que a IA exagera",
        ready: [
            "a lista do que nunca se diz está escrita entre aspas, o pedido de venda exige a fonte de cada promessa, e um texto de verdade passou pelas duas conferências, com o que foi corrigido anotado."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma tarde."
            }
        ],
        tasks: [
            "c06-1",
            "c06-2"
        ],
        step: "o seu pedido de texto de venda com estrutura, a lista do que o seu negócio nunca afirma, e a conferência rodada num texto de verdade.",
        part: "A vitrine"
    },
    {
        slug: "dar-antes-de-pedir",
        title: "Dar antes de pedir",
        ready: [
            "existe uma peça que a pessoa usa sem cadastro, o pedido de contato vem depois dela com o motivo, o formulário tem só o campo necessário, e o consentimento fica guardado com o texto, a hora e o jeito de sair."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma tarde, sem contar a peça que se dá."
            }
        ],
        tasks: [
            "c07-1"
        ],
        step: "o que você dá antes de pedir, o formulário com só o necessário, e o texto do consentimento escrito.",
        part: "A captação"
    },
    {
        slug: "o-link-que-diz-de-onde-veio",
        title: "O link que diz de onde veio",
        ready: [
            "a regra de nome está escrita, cada peça da semana tem o seu link, um clique de teste chegou ao formulário com a origem, e a tabela de origem existe, com a fonte de cada coluna e o vazio onde não há medida."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma hora."
            }
        ],
        tasks: [
            "c08-1"
        ],
        step: "a regra de nome dos seus links, os links das peças da próxima semana, e a tabela de origem montada.",
        part: "A captação"
    },
    {
        slug: "a-newsletter-sem-lista-comprada",
        title: "A newsletter sem lista comprada",
        ready: [
            "só entra na lista quem confirmou, há prova disso, a saída é um clique, o motivo e o ritmo estão escritos, e a primeira carta saiu, medida pelo clique."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma hora para a conferência, mais a primeira carta."
            }
        ],
        tasks: [
            "c09-1"
        ],
        step: "a sua lista com confirmação dupla, o motivo e o ritmo das cartas escritos, e a primeira carta pronta.",
        part: "A captação"
    },
    {
        slug: "conteudo-que-nao-depende-de-voce",
        title: "Conteúdo que não depende de você",
        ready: [
            "o acervo está reordenado pela pergunta de quem chega, com o que sai do caminho marcado, a primeira sessão de blocos está listada, e as regras de montagem estão escritas com o ponto em que você aprova."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma tarde para o inventário e a lista de blocos; outra para a gravação."
            }
        ],
        tasks: [
            "c10-1"
        ],
        step: "o inventário do seu acervo, a lista de blocos da primeira sessão, e as regras que um agente segue para montar peças.",
        part: "A captação"
    },
    {
        slug: "a-ficha-da-pessoa",
        title: "A ficha da pessoa",
        ready: [
            "a ficha tem a linha do tempo com a fonte de cada evento, o estágio sai dos eventos, o \"começou a usar\" está escrito, e a lista do que nunca entra está no topo das regras do agente que lê a ficha."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma tarde."
            }
        ],
        tasks: [
            "c11-1"
        ],
        step: "a ficha mínima do seu negócio, com as fontes que a preenchem, o que conta como \"começou a usar\", e a lista do que nunca entra.",
        part: "O relacionamento"
    },
    {
        slug: "a-conversa-do-primeiro-contato-ao-pos-venda",
        title: "A conversa, do primeiro contato ao pós-venda",
        ready: [
            "cada família de conversa tem dono, prazo e regra, o agente só responde sozinho o que está numa página pública, dinheiro, reclamação e sofrimento estão com você, e a mensagem do pós-venda saiu para a última pessoa que comprou."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma hora para o mapa."
            }
        ],
        tasks: [
            "c12-1"
        ],
        step: "o mapa das conversas do seu negócio, com o dono, o prazo e a regra de cada família, e a mensagem do pós-venda escrita.",
        part: "O relacionamento"
    },
    {
        slug: "medir-sem-se-enganar",
        title: "Medir sem se enganar",
        ready: [
            "cada estação tem um número, a fonte e o mínimo escritos, as colunas sem medida dizem \"sem fonte\", e as regras do agente que lê a tabela estão no topo das instruções dele."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma hora."
            }
        ],
        tasks: [
            "c13-1"
        ],
        step: "a tabela dos seis números do seu caminho, com a fonte e o mínimo de cada um, e as regras do agente que lê a tabela.",
        part: "O relacionamento"
    },
    {
        slug: "o-que-o-agente-de-venda-nunca-faz",
        title: "O que o agente de venda nunca faz",
        ready: [
            "a lista do nunca está no topo das regras do agente de venda, cada item tem o que ele faz no lugar, as automações que valem estão escritas, e a conferência da ferramenta mostrou que o acesso do agente não alcança desconto, dinheiro de volta nem envio a quem saiu."
        ],
        time: [
            {
                label: "Tempo",
                text: "uma hora, mais a conferência da ferramenta."
            }
        ],
        tasks: [
            "c14-1"
        ],
        step: "a lista do nunca da venda do seu negócio, a lista das automações que valem, e a conferência de que a sua ferramenta segura cada nunca.",
        part: "O relacionamento"
    }
]

export const TEMPLATES = [
    {
        id: "e04-1",
        kind: "text",
        title: "O exemplo da Helena: tensão e resposta",
        chap: "Capítulo 4",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "TOPO\nVocê já fez dieta muitas vezes e voltou ao começo.\nAqui você aprende a comer sem contar caloria, uma troca de cada vez.\n[Receber a primeira troca]\n\nQUAL É VOCÊ\n\"Já tentei de tudo e sempre volto\"      → a primeira troca, de graça\n\"Quero entender o que estou comendo\"    → como funciona o programa\n\"Tenho uma condição de saúde\"           → a consulta\n\nPROVA\nA primeira troca inteira, para ler agora, e uma aula de exemplo.\n\nFECHAMENTO\n[Receber a primeira troca]"
    },
    {
        id: "e06-1",
        kind: "text",
        title: "O exemplo da Helena: o teto e a abertura",
        chap: "Capítulo 6",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "NUNCA DIGA\n\"perca [N] quilos\"     \"em [N] dias\"      \"antes e depois\"\n\"garantido\"            \"o melhor\"          \"o mais eficaz\"\n\"sem esforço\"          \"últimas vagas\"     \"cura\""
    },
    {
        id: "e07-1",
        kind: "text",
        title: "O exemplo da Helena: dar antes de pedir",
        chap: "Capítulo 7",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "O QUE SE DÁ\nA primeira troca, inteira, na página: o que trocar no jantar de\nhoje, com três opções e o porquê. Sem cadastro.\n\nO PEDIDO, DEPOIS DA TROCA\n\"Quer receber uma troca nova toda segunda?\"\n[ e-mail ]   [ ] Quero receber uma troca por semana da Helena,\n                 por e-mail. Saio quando quiser, em um clique.\n                 [Receber]"
    },
    {
        id: "e08-1",
        kind: "text",
        title: "O exemplo da Helena: a origem no link",
        chap: "Capítulo 8",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "<canal>-<peca>-<ddmm>\ncanais: ig (Instagram), wa (grupo do WhatsApp), em (e-mail),\n        bio (link do perfil), ct (cartão do consultório)\n\nig-troca-jantar-1110      wa-troca-jantar-1110\nem-troca-semana-1310      bio-primeira-troca\nct-primeira-troca"
    },
    {
        id: "e09-1",
        kind: "text",
        title: "O exemplo da Helena: lista que se ganha",
        chap: "Capítulo 9",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "MOTIVO      Uma troca nova por semana, com três opções e o porquê.\nRITMO       Toda segunda, às 7h. Se a semana apertar, a carta é\n            mais curta, mas sai.\nNUNCA       Promoção sem troca. Mais de uma carta por semana.\n            Lista de outra pessoa.\n\nCARTA 1\nAssunto: A troca desta semana: o lanche da tarde\nOlá! A troca de hoje é para quem chega em casa com fome demais...\n[três opções] [o porquê]\nSe quiser o programa inteiro, ele está aqui: [link]\nAté segunda. Helena\n[Sair da lista, em um clique]"
    },
    {
        id: "e10-1",
        kind: "text",
        title: "O exemplo da Helena: blocos, não temas",
        chap: "Capítulo 10",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "GANCHOS (sem data)\n\"Você chega em casa com fome demais e come o que vê.\"\n\"Contar caloria cansou?\"\n\"A fome da noite tem motivo.\"\n\nEXPLICAÇÕES (uma ideia cada)\nPor que a fome da noite começa no almoço.\nO que é uma troca, e por que uma por semana.\nFome de verdade e fome de ansiedade.\n\nFECHOS\n\"A troca desta semana está no link.\"\n\"Quer uma troca por semana? Link na bio.\""
    },
    {
        id: "e11-1",
        kind: "text",
        title: "O exemplo da Helena: a linha do tempo",
        chap: "Capítulo 11",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "LINHA DO TEMPO (quem avisa)\ninscreveu-se na troca semanal       a lista de e-mail\nclicou numa troca                   a lista de e-mail\ncomprou o programa                  a plataforma de venda\nassistiu à primeira aula            a área de membros\nmarcou a consulta                   a agenda\n\nESTÁGIO\ncontato       inscreveu-se na troca\ninteressada   abriu a página do programa duas vezes, ou perguntou\ncliente       pagamento confirmado do programa ou da consulta\n\nCOMEÇOU A USAR\nassistiu à primeira aula\n\nNUNCA ENTRA\nqualquer dado de saúde (peso, exames, diagnóstico): fica no\nprontuário do consultório, em que nenhum agente entra\no que a pessoa contou sobre a família"
    },
    {
        id: "e12-1",
        kind: "text",
        title: "O exemplo da Helena: a conversa tem dono",
        chap: "Capítulo 12",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "Oi! Aqui é a Helena. Você conseguiu entrar na primeira aula?\nSe travou em alguma coisa, é só responder este e-mail."
    },
    {
        id: "e14-1",
        kind: "text",
        title: "O exemplo da Helena: o nunca da venda",
        chap: "Capítulo 14",
        desc: "O exemplo do capítulo, preenchido com o negócio da Helena, para ver a forma; o seu sai do prompt do capítulo, com o seu negócio.",
        text: "NUNCA, EM NENHUM DEGRAU\n- Preço diferente do da página, desconto ou condição especial.\n  No lugar: informar o preço e o que inclui; pedido de desconto\n  vai para a Helena.\n- Prometer quilos, prazo ou \"antes e depois\".\n  No lugar: dizer o que o programa entrega.\n- Decidir dinheiro de volta.\n  No lugar: juntar o pedido e a regra da página para a Helena.\n- Escassez, culpa ou urgência.\n- Escrever de novo a quem saiu da lista ou disse que não quer.\n\nAUTOMAÇÕES QUE VALEM\n- O link de pagamento, quando a pessoa pede.\n- O aviso de que o acesso chegou, logo depois do pagamento.\n- No dia seguinte, a pergunta se ela conseguiu começar.\n- A lembrança da consulta marcada, na véspera."
    }
]
