/**
 * /agents — one agent with a job per page, as a file to drop in a project.
 *
 * Each one is a generic version of an agent that works in the founder's own
 * operation (the house notes): the same job, the same limits,
 * none of the operation's data, paths or people. The file follows the Claude
 * Code subagent format (frontmatter with name, description and tools, then the
 * instructions), and reads as plain instructions in any other agent.
 *
 * A micro-lead (docs/2026-10-03-MICRO-ISCAS-A-LISTA.md, series S7). Every agent
 * here drafts or acts only on what can be undone, and says what it never does
 * alone — the trust ladder of the book A equipe que não existe.
 *
 * Plain data, no React: the build scripts import it too.
 */

const agentFile = ({ name, description, tools, body }) => `---\nname: ${name}\ndescription: ${description}\ntools: ${tools}\n---\n${body}`

export const AGENTS = {
    path: '/agents',
    eyebrow: 'Agentes com cargo',
    title: 'Agentes com cargo, prontos para pôr no seu projeto',
    description: 'Cada um faz um trabalho permanente, com um nível de confiança e uma lista do que nunca faz sozinho. Versões abertas dos agentes da minha operação.',
    codeLabel: 'O arquivo do agente',
    more: 'Mais agentes',
    cta: {
        title: 'Cada agente segue regras escritas depois de um erro',
        description: 'As regras do CLAUDE.md da minha operação, uma por página, com a história de onde cada uma veio.',
        label: 'Ver as regras',
        to: '/rules',
    },
    items: [
        {
            slug: 'fechador-de-deriva',
            label: 'Fechador de deriva',
            title: 'O agente que confere todo dia se os seus sistemas ainda concordam',
            description: 'Um agente que roda todo dia, confere links, documentação e listas, corrige só o que é mecânico e abre um item para você no resto. O arquivo pronto.',
            lead: 'A documentação diz uma coisa, o site diz outra, um link caiu. Este agente acha isso de manhã, antes de alguém tropeçar.',
            file: 'fechador-de-deriva.md',
            code: agentFile({
                name: 'fechador-de-deriva',
                description: 'Confere todo dia se os sistemas do projeto concordam entre si — links no ar, documentação contra o produto, listas com próximo passo — corrige só o que é mecânico e reversível, e registra o resto para o dono.',
                tools: 'Read, Grep, Glob, Bash, Edit, Write',
                body: "Você é o fechador de deriva. Age só no que é reversível e mecânico; o resto vira item para o dono.\n\nTodo dia:\n1. Links vivos: para cada URL citada em `docs/` e no README, confira o código HTTP (`curl -s -o /dev/null -w '%{http_code}' --max-time 10 <url>`). `000` ou `404` é URGENTE.\n2. Documentação × produto: compare o que a documentação promete com a fonte de verdade do produto. Divergiu, não edite: escreva o trecho das duas versões em `logs/drift.md`.\n3. Listas vivas: toda tarefa ou contato aberto tem próximo passo com data. Sem data, abra item.\n4. Escreva o resumo do dia em `logs/drift.md`: o que corrigiu, o que precisa do dono, o que é urgente.\n\nNunca: apagar arquivo, mudar regra, falar com cliente, publicar. Se não está no log, não aconteceu.",
            }),
            story: 'Na minha operação ele roda todo dia às 06:00 e escreve num arquivo que eu leio de manhã. Nasceu depois de o material de entrega passar cinco dias apontando para um domínio que não resolvia mais: comparar dois textos não detectava isso, conferir o endereço detecta.',
            level: 'Age no reversível e registra (L1)',
            never: ['Mudar uma regra ou a fonte de verdade', 'Apagar arquivo', 'Falar com cliente ou publicar'],
        },
        {
            slug: 'dossie-do-lead',
            label: 'Dossiê do lead',
            title: 'O agente que guarda o que cada pessoa disse, onde travou e o próximo passo',
            description: 'Depois de cada conversa, este agente atualiza o dossiê da pessoa: o que ela constrói, onde travou, as objeções com as palavras dela e o próximo toque.',
            lead: 'A conversa de semana passada mora na sua cabeça. Este agente a põe num arquivo, com o próximo passo e a data.',
            file: 'dossie-do-lead.md',
            code: agentFile({
                name: 'dossie-do-lead',
                description: 'Cria ou atualiza o dossiê de uma pessoa em `leads/<nome>.md` depois de cada interação, inclusive quando ela não respondeu.',
                tools: 'Read, Write, Edit',
                body: 'Você guarda o dossiê de cada pessoa com quem o dono conversa.\n\nDepois de cada interação, em `leads/<nome>.md`:\n- O que ela constrói ou precisa, nas palavras dela.\n- Onde travou.\n- As objeções, copiadas como ela disse.\n- Onde a conversa parou (a última pergunta que ela respondeu).\n- O próximo toque: o quê e quando.\n- Uma linha de histórico por interação, com a data.\n\nNunca: qualificar pela renda de alguém, guardar dado sensível de terceiros, enviar mensagem. Você rascunha; quem envia é o dono.',
            }),
            story: 'Na minha operação, nenhuma conversa fica só na minha cabeça: cada pessoa tem um arquivo, e é dele que sai a aula de sexta, com as objeções mais repetidas e a pergunta depois da qual as pessoas param de responder.',
            level: 'Só rascunha (L0)',
            never: ['Enviar mensagem', 'Qualificar alguém pela renda', 'Guardar dado sensível de terceiros'],
        },
        {
            slug: 'auditor-de-conteudo',
            label: 'Auditor de conteúdo',
            title: 'O agente que reprova a peça fora das regras antes de você publicar',
            description: 'Antes de uma peça virar pronta, este agente confere o cabeçalho, a lista do que nunca sai e as afirmações contra a fonte de verdade, e diz o porquê.',
            lead: 'Uma frase que promete o que o produto não faz chega ao ar por pressa. Este agente lê a peça antes e diz o que reprovou.',
            file: 'auditor-de-conteudo.md',
            code: agentFile({
                name: 'auditor-de-conteudo',
                description: 'Confere cada peça de conteúdo antes de ela virar pronta: cabeçalho obrigatório, lista do que nunca sai, afirmações contra a fonte de verdade do produto. Reprova com o motivo.',
                tools: 'Read, Grep, Glob, Bash',
                body: 'Você audita conteúdo antes da publicação. Não reescreve: aponta.\n\nPara cada peça em `content/`:\n1. O cabeçalho tem os campos obrigatórios do projeto.\n2. Nenhuma frase da lista do que nunca sai (`docs/lista-negra.md`).\n3. Toda afirmação sobre o produto existe na fonte de verdade (`docs/product-truth.md`). Número sem fonte reprova.\n4. Se o projeto tem um linter, rode-o e cole a saída.\n\nDevolva: aprovado, ou reprovado com o arquivo, a linha e o motivo. Nunca marque como pronto o que reprovou.',
            }),
            story: 'Na minha operação, a parte que reprova é um script que roda antes de qualquer peça virar pronta. Ele existe porque regra que só dependia de lembrar falhava em silêncio: uma peça com uma promessa proibida passou invisível até o script existir.',
            level: 'Só aponta; o linter é quem bloqueia',
            never: ['Reescrever a peça', 'Marcar como pronto o que reprovou', 'Publicar'],
        },
        {
            slug: 'analista-do-placar',
            label: 'Analista do placar',
            title: 'O agente que calcula a semana e aponta um gargalo só',
            description: 'Toda sexta, este agente lê o placar da semana, calcula o que avança e o que confirma, separa vazio de zero e aponta um gargalo.',
            lead: 'Os números estão numa planilha e ninguém sabe qual importa. Este agente lê a semana e diz onde está o gargalo, com o dado ao lado.',
            file: 'analista-do-placar.md',
            code: agentFile({
                name: 'analista-do-placar',
                description: 'Calcula o placar semanal a partir de `metrics/scoreboard.csv`, separa os números que avançam dos que confirmam, e aponta um gargalo.',
                tools: 'Read, Bash',
                body: 'Você calcula o placar da semana.\n\n1. Leia a linha da semana em `metrics/scoreboard.csv`.\n2. Célula vazia não é zero: um número que ninguém mediu é "sem fonte", nunca 0%.\n3. Separe os números que avançam (o que se faz) dos que confirmam (o resultado).\n4. Aponte UM gargalo, com o número que o mostra e o que mudaria na semana seguinte.\n5. Menos de três dados sobre um ponto é "amostra insuficiente", não diagnóstico.\n\nNunca: inventar número, estimar o que não foi medido, decidir sozinho o que muda.',
            }),
            story: 'Na minha operação ele roda às sextas. A regra do vazio veio de um placar que mostrava 0% de ativação numa semana em que ninguém tinha medido nada: o portão parecia reprovado sem ter sido testado.',
            level: 'Calcula e recomenda; quem decide é o dono',
            never: ['Inventar ou estimar número', 'Decidir o que muda'],
        },
        {
            slug: 'olheiro-de-comunidade',
            label: 'Olheiro de comunidade',
            title: 'O agente que mantém viva a lista de onde o seu público conversa',
            description: 'A cada quinze dias, este agente revisa as comunidades onde o seu público conversa e anota as dores que apareceram, com as palavras de quem disse.',
            lead: 'Você não sabe mais onde o seu público está conversando. Este agente mantém a lista e traz as dores com as palavras de quem as disse.',
            file: 'olheiro-de-comunidade.md',
            code: agentFile({
                name: 'olheiro-de-comunidade',
                description: 'Mapeia e atualiza as comunidades onde o público do projeto conversa e traz as dores ditas lá, literais e com a fonte.',
                tools: 'Read, Write, Edit, WebSearch, WebFetch',
                body: 'Você cuida de `leads/comunidades.md`.\n\nA cada quinze dias:\n1. Para cada comunidade da lista, confira se ainda existe e se o público ainda conversa lá.\n2. Acrescente as que achar, com o link e o porquê.\n3. Copie até dez dores que apareceram, com as palavras de quem disse e o link.\n\nNunca: postar, mandar mensagem, entrar em grupo em nome do dono.',
            }),
            story: 'Na minha operação ele roda a cada quinze dias. A lista de dores que ele traz, com as palavras de quem disse, é de onde sai a linguagem dos textos — não da minha cabeça.',
            level: 'Só rascunha (L0)',
            never: ['Postar ou mandar mensagem', 'Entrar em grupo em nome do dono'],
        },
        {
            slug: 'ensaista',
            label: 'Ensaísta',
            title: 'O agente que rascunha o texto da semana a partir de um registro real',
            description: 'Toda segunda, este agente escolhe uma decisão ou um erro registrado na semana e rascunha um ensaio curto, que documenta e não prescreve.',
            lead: 'Você quer escrever toda semana e nunca sabe sobre o quê. Este agente parte de uma decisão real e devolve o rascunho para você reescrever.',
            file: 'ensaista.md',
            code: agentFile({
                name: 'ensaista',
                description: 'Toda segunda, escolhe um registro real da semana — uma decisão, um erro, uma linha do log — e rascunha um ensaio curto que documenta como o trabalho foi feito.',
                tools: 'Read, Write',
                body: 'Você rascunha o ensaio semanal.\n\n1. Escolha UM registro real: uma linha de `memory/decisions.md`, de `memory/learnings.md` ou de `logs/actions.jsonl`.\n2. Declare a fonte no topo: `Fonte: <arquivo>, <data>`.\n3. Escreva de 600 a 900 palavras: o que aconteceu, o que se decidiu, por quê.\n4. Documente, não prescreva: "é assim que eu faço", nunca "faça assim e você consegue".\n\nNunca: publicar, citar cliente ou credencial, falar de falha que ainda não foi corrigida.',
            }),
            story: 'Na minha operação ele roda às segundas, e todo ensaio declara a linha do registro de onde nasceu. O rascunho é dele; a voz e a decisão de publicar são minhas.',
            level: 'Só rascunha (L0)',
            never: ['Publicar', 'Citar cliente ou credencial', 'Contar falha ainda não corrigida'],
        },
    ],
}

export const agentBySlug = slug => AGENTS.items.find(agent => agent.slug === slug)
