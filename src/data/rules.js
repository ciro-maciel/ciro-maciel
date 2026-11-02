/**
 * /rules — one rule for an agent's CLAUDE.md per page.
 *
 * Every rule here was written after a mistake in the founder's own operation,
 * and lives today in the CLAUDE.md of his repositories or in the operation's
 * learnings log (the house notes). The page gives the rule ready
 * to paste, and says where it came from: the story is the proof.
 *
 * A micro-lead (docs/2026-10-03-MICRO-ISCAS-A-LISTA.md, series S6): it solves
 * one splinter in minutes and teaches nothing first. The title says what the
 * reader gets, never what they will learn.
 *
 * Plain data, no React: scripts/prerender.js and scripts/generate-sitemap.js
 * import it too.
 */

export const RULES = {
    path: '/rules',
    eyebrow: 'Regras para o CLAUDE.md',
    title: 'Regras que nasceram de um erro, prontas para o CLAUDE.md do seu agente',
    description: 'Cada regra está no CLAUDE.md da minha operação porque um erro aconteceu antes dela. Copie a que serve para o seu projeto.',
    codeLabel: 'A regra, para colar',
    more: 'Mais regras',
    cta: {
        title: 'Estas regras seguram uma equipe de agentes',
        description: 'Os agentes da minha operação trabalham com estas regras. As versões abertas deles, com o que cada um nunca faz sozinho, estão prontas para baixar.',
        label: 'Ver os agentes',
        to: '/agents',
    },
    items: [
        {
            slug: 'sed-do-mac-nao-entende-b',
            label: 'O sed do Mac e o \\b',
            title: 'A regra que impede o sed do Mac de trocar nada em silêncio',
            description: 'O sed do macOS não entende \\b: a troca não casa nada, não dá erro e sai com código 0. A regra pronta para o CLAUDE.md do seu agente.',
            lead: 'Seu agente roda um sed com \\b, o terminal não reclama, e nada foi trocado. Esta regra impede que ele confie nesse comando.',
            code: "## sed no macOS\nO `sed` do macOS (BSD) não entende `\\b`: a troca não casa nada, não dá erro e sai com código 0.\nPara renomear, escreva um script e confira o resultado. Nunca `sed -i '' 's/\\bfoo\\b/bar/'`.",
            story: 'Está na lista do que nunca fazer do CLAUDE.md da minha operação. O comando parece certo, sai com sucesso e não muda uma linha: o único jeito de perceber é conferir o arquivo depois.',
            checks: ['Depois de qualquer troca em massa, conte as ocorrências antes e depois', 'Se o agente usou sed com \\b no macOS, refaça com um script'],
        },
        {
            slug: 'uma-arvore-de-dependencias',
            label: 'Uma árvore de dependência só',
            title: 'A regra que impede duas árvores de dependência no mesmo projeto',
            description: 'bun e npm lado a lado criam duas árvores de dependência que divergem sem avisar. A regra pronta para o CLAUDE.md do seu agente.',
            lead: 'O agente instala com o gerenciador que lembrar. Esta regra fixa um só, para o projeto não ter duas versões da mesma biblioteca.',
            code: '## Dependências\nUse só `bun`: `bun install`, `bun add`, `bun test`, `bunx`.\nNunca `npm install` neste projeto: duas árvores de dependência lado a lado divergem sem avisar.',
            story: 'É a primeira linha do que nunca fazer nos meus repositórios. Com dois arquivos de trava, cada ferramenta resolve uma versão, e o defeito aparece numa máquina e não na outra.',
            checks: ['Só um arquivo de trava no repositório (bun.lock ou package-lock.json, nunca os dois)', 'Troque `bun` pelo gerenciador que o seu projeto usa'],
        },
        {
            slug: 'listar-colisoes-antes-de-renomear',
            label: 'Listar colisões antes de renomear',
            title: 'A regra que faz o agente listar as colisões antes de renomear em massa',
            description: 'Antes de renomear em massa, o nome de destino pode já existir no arquivo com outro sentido. A regra pronta para o CLAUDE.md do seu agente.',
            lead: 'O agente troca um nome em cem arquivos, e o nome novo já existia com outro sentido. Esta regra o faz olhar antes.',
            code: '## Renomear em massa\nAntes de trocar um nome em vários arquivos, liste as ocorrências do nome antigo E do nome novo.\nSe o nome novo já existe com outro sentido, pare e me pergunte.',
            story: 'Está no CLAUDE.md da minha operação depois de uma troca que juntou duas coisas diferentes sob o mesmo nome. A lista de colisões custa um comando; desfazer a mistura custa uma tarde.',
            checks: ['O agente mostrou a contagem do nome novo antes de trocar', 'Nenhum arquivo ficou com os dois sentidos misturados'],
        },
        {
            slug: 'frase-mista-depois-de-renomear',
            label: 'Frase mista depois de renomear',
            title: 'A regra que pega o texto de tela que a troca por regex estragou',
            description: 'Renomear identificador por regex atinge também o texto que a pessoa lê. A regra pronta para o CLAUDE.md do seu agente.',
            lead: 'O agente passou os identificadores para inglês e um botão passou a dizer "Limpar search". Esta regra manda procurar isso depois.',
            code: '## Idioma\nIdentificadores, arquivos e comentários em inglês. Texto que uma pessoa lê, em português.\nDepois de renomear por regex, procure frases mistas na tela: a troca não distingue código de texto.',
            story: 'Aconteceu: a troca de `busca` por `search` atingiu um `aria-label="Limpar busca"` e deixou `Limpar search` na tela. A fronteira não é string ou não string, é quem lê.',
            checks: ['Procure palavras em inglês dentro de frases em português depois da troca', 'Leia em voz alta os rótulos de botão e os avisos'],
        },
        {
            slug: 'teste-verde-nao-prova-nada',
            label: 'Teste verde não prova nada',
            title: 'A regra que faz o agente provar que o teste dele pega o defeito',
            description: 'Um teste que passa com o defeito presente não protege nada. A regra pronta para o CLAUDE.md: quebrar de propósito e ver o teste falhar.',
            lead: 'O agente escreve o teste, o teste passa, e ninguém sabe se ele pegaria o erro. Esta regra o faz quebrar o código de propósito e ver.',
            code: '## Testes\nUm teste verde não prova nada.\nPara cada teste novo, quebre de propósito o que ele protege e mostre o teste falhando. Depois desfaça.',
            story: 'De quatro testes escritos para um componente da minha operação, três passavam com o defeito presente. Desde então, sabotar o código é como se confere um teste.',
            checks: ['O agente mostrou a saída do teste falhando com o código quebrado', 'O código voltou ao estado certo depois'],
        },
        {
            slug: 'mock-module-vaza-entre-arquivos',
            label: 'O mock.module do bun vaza',
            title: 'A regra que evita o teste que só quebra no CI',
            description: 'O mock.module do bun é global e permanente: vaza entre arquivos e quebra só no CI, onde a ordem muda. A regra pronta para o CLAUDE.md.',
            lead: 'Na sua máquina tudo passa; no CI, um teste que não tem nada a ver quebra. Esta regra evita a causa mais comum disso no bun.',
            code: '## mock.module\nO `mock.module` do bun é global e permanente: vaza para os outros arquivos de teste.\nNão use para isolar um arquivo só. No CI a ordem muda, e o vazamento quebra outro teste.',
            story: 'Está no CLAUDE.md dos meus repositórios depois de uma suíte que passava local e quebrava só no CI, sempre num arquivo diferente.',
            checks: ['Nenhum mock.module num teste que deveria valer só para si', 'Rode a suíte em outra ordem antes de confiar'],
        },
        {
            slug: 'regra-que-nao-vira-teste-nao-existe',
            label: 'Regra que não vira teste não existe',
            title: 'A regra que transforma cada regra do CLAUDE.md em checagem',
            description: 'Regra escrita que nenhum código verifica falha em silêncio. A regra pronta para o CLAUDE.md: ou vira checagem automática, ou fica dito quem lembra.',
            lead: 'O CLAUDE.md cresce e o agente esquece metade. Esta regra obriga cada regra nova a virar uma checagem, ou a dizer que depende de memória.',
            code: '## Regras novas\nRegra que não vira teste não existe.\nAo acrescentar uma regra aqui, crie a checagem automática que a verifica, ou escreva ao lado que ela depende de alguém lembrar.',
            story: 'Em 09/09/2026, "número só com procedência" era regra dura do meu CLAUDE.md e não tinha uma linha de código. Em 20/09, a mesma auditoria achou mais duas regras assim. As três viraram checagem no linter.',
            checks: ['Cada regra nova do CLAUDE.md aponta para o teste ou para o script que a confere', 'As que não têm checagem estão marcadas como tal'],
        },
        {
            slug: 'se-nao-esta-no-log-nao-aconteceu',
            label: 'Se não está no log, não aconteceu',
            title: 'A regra que faz o agente deixar rastro antes de entregar',
            description: 'Toda execução escreve uma linha no log antes de devolver a entrega. A regra pronta para o CLAUDE.md do seu agente.',
            lead: 'Ontem o agente fez alguma coisa, e hoje ninguém sabe o quê. Esta regra o faz registrar cada execução antes de dizer que terminou.',
            code: '## Trilha\nToda execução escreve uma linha em `logs/actions.jsonl` ANTES de devolver a entrega: data, o que fez, o que leu, o que escreveu.\nSe não está no log, não aconteceu.',
            story: 'É a regra que segura a equipe de agentes da minha operação. Sem o log, a revisão de sexta vira lembrança; com ele, cada cargo é medido pelo que entregou.',
            checks: ['A última linha do log corresponde ao último trabalho do agente', 'O log tem o que foi escrito, não só o que foi pedido'],
        },
        {
            slug: 'relatorio-de-subagente-nao-e-verdade',
            label: 'Relatório de subagente não é verdade',
            title: 'A regra que faz o agente conferir o que o subagente disse',
            description: 'O relatório de um subagente diz o que ele acha que fez. A regra pronta para o CLAUDE.md: conferir no arquivo, no comando ou na tela.',
            lead: 'O subagente diz "feito" e o agente principal repassa. Esta regra o faz conferir antes de repassar.',
            code: '## Subagentes\nO relatório de um subagente não é verdade automática.\nAntes de repassar, confira no arquivo, no comando ou na tela o que ele disse que fez.',
            story: 'Em 09/09/2026, um agente da minha operação declarou "bloqueado, só o fundador sabe" sobre uma ferramenta que estava documentada o tempo todo. O diagnóstico errado só caiu porque alguém abriu a documentação.',
            checks: ['Cada "feito" do subagente tem uma evidência: o diff, a saída, a URL', 'O que não foi conferido aparece como "não conferido"'],
        },
        {
            slug: 'conferir-o-codigo-http-antes-de-entregar',
            label: 'Conferir o código HTTP do link',
            title: 'A regra que impede o agente de entregar link morto',
            description: 'Comparar dois textos não detecta que o endereço saiu do ar. A regra pronta para o CLAUDE.md: conferir o código HTTP de todo link antes de entregar.',
            lead: 'O agente entrega um material com sete links, e todos estão fora do ar. Esta regra o faz testar cada endereço antes.',
            code: "## Links\nAntes de entregar qualquer material com link, confira o código HTTP de cada um:\n`curl -s -o /dev/null -w '%{http_code}' --max-time 10 <url>`. `000` (não resolve) e `404` reprovam a entrega inteira.",
            story: 'Em 16/09/2026, o material de entrega da minha operação passou cinco dias apontando para um domínio antigo, que tinha deixado de resolver: sessenta e seis ocorrências, sete endereços em 000. Os textos batiam entre si; o endereço é que não existia.',
            checks: ['Todo link do material respondeu 200 ou um redirecionamento esperado', 'Nenhum endereço de domínio antigo sobrou'],
        },
    ],
}

export const ruleBySlug = slug => RULES.items.find(rule => rule.slug === slug)
