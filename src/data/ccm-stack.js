/**
 * CCM STACK (09/11/2026): the words of /ccm-stack and of its band on the home.
 *
 * One source: pages/CcmStack.jsx draws it, pages/Home.jsx takes `home`, and
 * scripts/prerender.js writes the same words into the HTML a crawler reads.
 *
 * Who arrives: someone who uses Claude Code every day and is tired of correcting the agent
 * for the same things. What they want and do not say: to trust the agent without fearing it
 * breaks something. What blocks them: "one more thing to configure" and "does it work?".
 * What they leave with: the stack installed in three commands and the first refusal on screen.
 *
 * Every fact here is true on 09/11/2026: 26 rules, 15 skills, 16 lessons, MIT, macOS and
 * Linux verified, Windows built for and not yet verified, Phonon licenses as published.
 * The Pro videos are being recorded: the page says so, and says what arrives when.
 */

export const CCM_STACK = {
    path: '/ccm-stack',
    repo: 'https://github.com/ciro-maciel/ccm-stack',
    course: 'https://github.com/ciro-maciel/ccm-stack/blob/main/course/README.md',
    art: '/art/ccm-stack.svg',

    seo: {
        title: 'CCM Stack: o seu agente de código seguindo as suas regras',
        description:
            'Regras que o Claude Code não consegue ignorar, skills para o que pede julgamento, a voz que avisa quando o trabalho termina e um curso de 16 aulas. Grátis e aberto; o Pro traz as aulas em vídeo e a comunidade.',
    },

    hero: {
        subtitle: 'CCM Stack',
        title: 'O seu agente concorda com cada regra. Depois quebra numa tarefa longa.',
        description:
            'O CCM Stack recusa o erro antes de ele acontecer, ensina ao agente o que pede julgamento e fala em voz alta quando o trabalho termina. Para o Claude Code, no Mac, no Linux e no Windows.',
        note: 'Grátis e aberto, licença MIT. Três comandos, dois minutos.',
    },

    problem: {
        subtitle: 'Por que regra escrita não basta',
        title: 'Texto é sugestão. Nada falha quando o agente pula uma linha.',
        description:
            'Você escreve "use bun" no CLAUDE.md e três sessões depois ele roda npm install. Corrige pela quarta vez e o arquivo já tem 400 linhas, que ele lê até onde alcança. O CCM Stack põe na máquina a regra que a máquina consegue conferir.',
        before: {
            title: 'Hoje',
            items: [
                'git add -A leva junto o trabalho de outra sessão',
                'Um repositório privado vira público "para economizar minutos de CI"',
                'O arquivo que você editou à mão é sobrescrito e some',
                'O teste fica verde com a funcionalidade quebrada',
                'Você descobre que ele terminou vinte minutos depois',
            ],
        },
        after: {
            title: 'Com o CCM Stack',
            items: [
                'O comando é recusado, com o jeito certo na mesma mensagem',
                'Mudar a visibilidade para público é recusado, sempre',
                'Todo arquivo ganha cópia antes de o agente mexer',
                'A skill de teste exige ver o teste falhar antes de confiar nele',
                'O computador diz o que foi feito, em uma a três frases',
            ],
        },
    },

    how: {
        subtitle: 'Como funciona',
        title: 'O que recusa, o que ensina e o que avisa.',
        description:
            'Cada regra mora num arquivo só, o rules.json. O que a máquina consegue conferir vira hook; o que pede julgamento vira skill. Você vê cada regra, e o que a garante, com /ccm-stack:status.',
        items: [
            {
                title: 'Hooks que recusam',
                description:
                    'Rodam antes de cada comando, antes de cada escrita e quando o agente para. Recusam o erro e dizem o que fazer no lugar: commit fora do padrão, segundo gerenciador de pacotes, emoji, resposta no idioma errado.',
            },
            {
                title: 'Skills que ensinam',
                description:
                    'Carregam quando a tarefa pede: consertar com prova, saber o que uma mudança quebra, escrever para quem vai ler, testar de um jeito que o defeito fique vermelho, desenhar webhooks e servidores MCP.',
            },
            {
                title: 'Princípios em toda sessão',
                description:
                    'Entram sozinhos no começo de cada conversa, com o seu idioma e a sua voz. Você não edita o CLAUDE.md.',
            },
            {
                title: 'A voz no fim da tarefa',
                description:
                    'O Phonon, da Gradium, roda no seu computador e fala o resumo. Em inglês a licença é livre; em português, espanhol, francês e alemão é para uso não comercial, e o setup pergunta antes.',
            },
        ],
    },

    proof: {
        subtitle: 'O que você recebe, grátis',
        title: 'Tudo aberto, para ler antes de instalar.',
        stats: [
            { value: '26', label: 'regras, cada uma com o que a garante' },
            { value: '15', label: 'skills para Claude Code (e editores que leem SKILL.md)' },
            { value: '16', label: 'aulas em texto, em quatro módulos' },
            { value: '0', label: 'dependências: Node 18 e mais nada' },
        ],
        note: 'Verificado no macOS e no Linux. No Windows foi feito para funcionar e ainda não rodou numa máquina de verdade: o repositório diz isso com essas palavras.',
    },

    start: {
        subtitle: 'Como começar',
        title: 'Três comandos. A primeira recusa em dois minutos.',
        steps: [
            {
                title: 'Adicione e instale',
                description: 'No Claude Code, em qualquer sistema:',
                code: '/plugin marketplace add ciro-maciel/ccm-stack\n/plugin install ccm-stack@ccm-stack',
            },
            {
                title: 'Configure do seu jeito',
                description: 'Abra uma sessão nova. O setup pergunta o seu idioma, a voz, o gerenciador de pacotes e o e-mail de teste:',
                code: '/ccm-stack:setup',
            },
            {
                title: 'Veja a primeira recusa',
                description: 'Peça ao agente para rodar git add -A. Ele recebe de volta a recusa e o jeito certo. Depois termine uma tarefa e ouça o resumo.',
                code: 'git add -A',
            },
        ],
    },

    plans: {
        subtitle: 'Planos',
        title: 'Comece grátis. Vá mais rápido com o Pro.',
        description:
            'O pacote é o mesmo nos dois. O Pro é para quem quer ver cada aula feita na frente, e tirar dúvida com quem constrói.',
        free: {
            name: 'Aberto',
            description: 'O CCM Stack inteiro, para sempre.',
            priceText: 'Grátis',
            features: [
                'As 26 regras, os hooks e as 15 skills',
                'A voz no fim da tarefa',
                'As 16 aulas em texto',
                'macOS, Linux e Windows',
                'Licença MIT',
            ],
            cta: { label: 'Instalar grátis', href: '#comecar' },
        },
        pro: {
            name: 'Pro',
            description: 'O curso em vídeo e a comunidade.',
            priceDisplay: { currency: 'R$', whole: '99', fraction: '90' },
            period: 'pagamento único',
            features: [
                'Tudo o que está no Aberto',
                'As 16 aulas em vídeo, gravadas pelo Ciro, no Claude Code de verdade',
                'A comunidade dos alunos, para tirar dúvida com quem constrói',
                'As regras novas na comunidade antes de entrarem no pacote',
                'Acesso para sempre, sem mensalidade',
            ],
            // The day the checkout exists: isOnSale true and cta.href its address. Until then the
            // button says what is true, and takes the person to the letters, where the opening is announced.
            isOnSale: false,
            note: 'As aulas em vídeo estão sendo gravadas: quem comprar recebe cada uma assim que ela sai, e entra na comunidade no mesmo dia.',
            cta: { label: 'Quero o Pro', href: null },
            waiting: {
                label: 'Avise-me quando abrir',
                href: '#cartas',
                note: 'A compra abre nos próximos dias, por Pix ou cartão, pelo mesmo preço. Deixe o seu e-mail nas Cartas do Ciro, logo abaixo, e saiba no dia.',
            },
        },
    },

    faq: {
        subtitle: 'Perguntas',
        title: 'Antes de instalar',
        questions: [
            {
                question: 'Ele funciona com o Cursor?',
                answer: 'As skills sim: seguem o formato aberto de Agent Skills, que o Cursor também lê. Os hooks e a voz são do Claude Code.',
            },
            {
                question: 'O que ele faz no meu computador?',
                answer: 'Lê o que o Claude Code manda para cada hook e não envia nada para lugar nenhum. Guarda cópia dos arquivos na sua pasta de configuração. Só baixa o Phonon quando você pede, e recusa o arquivo se a assinatura não bater.',
            },
            {
                question: 'Posso desligar uma regra?',
                answer: 'Pode. /ccm-stack:status mostra cada regra ligada ou desligada, e uma linha desliga a que você não quer. A configuração é sua e nunca entra num repositório.',
            },
            {
                question: 'A voz em português é grátis?',
                answer: 'É, para uso não comercial: é a licença do modelo em português (CC BY-NC 4.0). Para uso no trabalho, o setup oferece a voz do próprio sistema, também grátis, ou a Fish Audio com a sua chave.',
            },
            {
                question: 'O que muda no Pro?',
                answer: 'O pacote é o mesmo. O Pro traz as 16 aulas em vídeo e a comunidade dos alunos, por R$ 99,90 uma vez só. As aulas estão sendo gravadas e chegam para quem comprou assim que saem.',
            },
        ],
    },

    closing: {
        subtitle: 'Comece agora',
        title: 'Dê autonomia ao agente. Deixe as regras com a máquina.',
        description: 'Três comandos no Claude Code, e a próxima vez que ele tentar o erro de sempre, a máquina responde por você.',
        cta: { label: 'Ver no GitHub', href: 'https://github.com/ciro-maciel/ccm-stack' },
    },

    // The band on the home (pages/Home.jsx), between the books and the lines.
    home: {
        subtitle: 'CCM Stack',
        title: 'O seu agente de código seguindo as suas regras.',
        description:
            'Regras que o Claude Code não consegue ignorar, skills para o que pede julgamento e a voz que avisa quando o trabalho termina. Aberto e grátis, com um curso de 16 aulas.',
        featuresList: [
            'Recusa o erro e diz o jeito certo na mesma mensagem',
            'Copia cada arquivo antes de o agente mexer',
            'Fala em voz alta quando a tarefa termina',
        ],
        cta: { label: 'Conhecer o CCM Stack', href: '/ccm-stack' },
    },
}
