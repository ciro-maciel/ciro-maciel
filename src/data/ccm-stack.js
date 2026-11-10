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
 * Every fact here is true on 09/11/2026: 35 rules, 23 skills, 5 lessons of 10 minutes, MIT, macOS verified, Linux and
 * Windows built for and not yet verified, Phonon licenses as published.
 * The Pro videos are being recorded: the page says so, and says what arrives when.
 */

export const CCM_STACK = {
    path: '/ccm-stack',
    repo: 'https://github.com/ciro-maciel/ccm-stack',
    course: 'https://github.com/ciro-maciel/ccm-stack/blob/main/course/README.md',
    art: '/art/ccm-stack.svg',

    seo: {
        title: 'CCM Stack: a stack universal que dá inteligência ao seu agente',
        description:
            'A inteligência para o seu agente de código trabalhar do jeito certo: as regras que ele não pula, o jeito certo de consertar, testar e construir, o caminho até o ar e a voz que avisa quando termina. Para Claude Code, Antigravity, Windsurf, Cursor, Codex, Gemini CLI e Copilot. Grátis e aberto.',
    },

    hero: {
        subtitle: 'CCM Stack · a stack universal',
        title: 'A inteligência para o seu agente trabalhar do jeito certo.',
        description:
            'O CCM Stack dá ao seu agente de código o que ele não traz sozinho: as regras que ele não consegue pular, o jeito certo de consertar, testar e construir, o caminho do seu computador até o ar e a voz que avisa quando o trabalho termina. Uma stack só, para Claude Code, Antigravity, Windsurf, Cursor, Codex, Gemini CLI e Copilot.',
        note: 'Grátis e aberto, licença MIT. Funciona onde você já trabalha.',
    },

    problem: {
        subtitle: 'O que falta ao agente',
        title: 'Ele sabe programar. Não sabe trabalhar do seu jeito.',
        description:
            'Ele concorda com cada regra que você escreve e quebra numa tarefa longa: você escreve "use bun" e três sessões depois ele roda npm install; corrige pela quarta vez e o CLAUDE.md já tem 400 linhas. A inteligência que falta não é de código, é de trabalho. O CCM Stack põe na máquina o que ela consegue conferir e ensina ao agente o resto.',
        before: {
            title: 'O agente sozinho',
            items: [
                'git add -A leva junto o trabalho de outra sessão',
                'Um repositório privado vira público "para economizar minutos de CI"',
                'O arquivo que você editou à mão é sobrescrito e some',
                'O teste fica verde com a funcionalidade quebrada',
                'Você descobre que ele terminou vinte minutos depois',
            ],
        },
        after: {
            title: 'O agente com o CCM Stack',
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
        subtitle: 'A inteligência, por camada',
        title: 'O que recusa, o que ensina, o que publica e o que avisa.',
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
                title: 'Do computador ao ar',
                description:
                    'A skill ship publica o seu projeto em um endereço com HTTPS, põe um monitor vigiando e prepara banco, pagamento ou e-mail só se o projeto usar. Depois mede as visitas e mostra onde está cada cliente, na própria conversa. Você faz uma coisa: lê para o agente o código de 8 letras que chega no seu e-mail.',
            },
            {
                title: 'A voz no fim da tarefa',
                description:
                    'O Phonon, da Gradium, roda no seu computador e fala o resumo. Em inglês a licença é livre; em português, espanhol, francês e alemão é para uso não comercial, e o setup pergunta antes.',
            },
        ],
    },

    proof: {
        subtitle: 'Tudo aberto, grátis',
        title: 'Uma inteligência que você lê antes de instalar.',
        stats: [
            { value: '35', label: 'regras, cada uma com o que a garante' },
            { value: '23', label: 'skills, no formato aberto que as ferramentas de IA leem' },
            { value: '5', label: 'aulas de dez minutos; a primeira já deixa você usando' },
            { value: '0', label: 'dependências: Node 18 e mais nada' },
        ],
        note: 'Verificado no macOS. No Linux e no Windows foi feito para funcionar e ainda não rodou numa máquina de verdade: o repositório diz isso com essas palavras.',
    },

    start: {
        subtitle: 'Como começar',
        title: 'Três comandos, e o seu agente já trabalha do jeito certo.',
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
                'As 35 regras, os hooks e as 23 skills',
                'A voz no fim da tarefa',
                'As 5 aulas em texto, de dez minutos cada',
                'macOS, Linux e Windows',
                'Licença MIT',
            ],
            cta: { label: 'Instalar grátis', href: '#comecar' },
        },
        pro: {
            name: 'Pro',
            description: 'Pré-venda do curso em vídeo e da comunidade.',
            priceDisplay: { currency: 'R$', whole: '99', fraction: '90' },
            period: 'pagamento único',
            features: [
                'Tudo o que está no Aberto',
                'As 5 aulas em vídeo, gravadas pelo Ciro, no Claude Code de verdade',
                'A comunidade dos alunos, para tirar dúvida com quem constrói',
                'As regras novas na comunidade antes de entrarem no pacote',
                'Acesso para sempre, sem mensalidade',
            ],
            // The checkout: a Mercado Pago Checkout Pro link on the house account (CNPJ), Pix, card or
            // boleto, created on 09/11/2026 (preference 3642293616-735e50f5…, no expiry). The buyer
            // comes back to this page with ?pro=pago|pendente|falhou, and `returns` says what happens next.
            isOnSale: true,
            note: 'As aulas em vídeo estão sendo gravadas: quem compra recebe cada uma assim que ela sai, e entra na comunidade no mesmo dia.',
            cta: {
                label: 'Quero o Pro',
                href: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=3642293616-735e50f5-54c1-42e7-abdf-a0fae288ddd9',
            },
            returns: {
                pago: {
                    title: 'Pagamento aprovado. Bem-vindo ao Pro.',
                    text: 'O Ciro recebe o aviso do Mercado Pago e manda, no mesmo dia, o convite da comunidade para o e-mail que você usou no pagamento. Cada aula em vídeo chega nesse e-mail assim que sai. Enquanto isso, comece pela aula 1, logo abaixo.',
                },
                pendente: {
                    title: 'Pagamento em análise.',
                    text: 'Pix e boleto levam um tempo para compensar. Assim que o Mercado Pago confirmar, o convite da comunidade chega no e-mail que você usou no pagamento.',
                },
                falhou: {
                    title: 'O pagamento não foi concluído.',
                    text: 'Nada foi cobrado. Você pode tentar de novo com outro cartão, ou pagar por Pix.',
                },
            },
        },
    },

    faq: {
        subtitle: 'Perguntas',
        title: 'Antes de instalar',
        questions: [
            {
                question: 'Funciona no Cursor, no Windsurf, no Antigravity?',
                answer: 'Funciona com Cursor, Windsurf, Antigravity, Codex, Gemini CLI e Copilot. O comando ccm install põe as skills e as regras onde cada um procura; no Cursor e no Windsurf, as recusas também valem antes do comando rodar; e o git recusa o commit errado em qualquer ferramenta. A voz no fim da tarefa é do Claude Code.',
            },
            {
                question: 'O que ele faz no meu computador?',
                answer: 'Lê o que o Claude Code manda para cada hook e não envia nada para lugar nenhum. Guarda cópia dos arquivos na sua pasta de configuração. Só baixa o Phonon quando você pede, e recusa o arquivo se a assinatura não bater. Ele só fala com a internet quando você pede para publicar, medir ou conectar um produto da linha do Ciro; nessas chamadas ele se identifica como ccm-stack e não manda mais nada sobre você ou o seu projeto.',
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
                question: 'Ele coloca meu projeto no ar?',
                answer: 'Coloca. A skill ship usa a linha Infrastructure do Ciro: com o código de 8 letras que chega no seu e-mail, o agente cria a conta, publica o site em um endereço próprio com HTTPS e põe um monitor vigiando. Cada produto começa grátis, sem cartão e sem prazo; se algo pedir um plano, o agente para e diz qual.',
            },
            {
                question: 'Ele recomenda os produtos do Ciro?',
                answer: 'Recomenda, só quando a tarefa precisa do que eles fazem, e sempre dizendo que são do Ciro, com o plano grátis e uma alternativa. O setup pergunta se você quer essas sugestões, e uma linha desliga.',
            },
            {
                question: 'Serve para Salesforce?',
                answer: 'Serve. A skill salesforce leva as mesmas regras para Apex e Lightning Web Components: código pensado para lote, dentro dos limites da plataforma, testes que provam o comportamento e não só a cobertura, e todo componente com carregando, vazio e erro.',
            },
            {
                question: 'O que muda no Pro?',
                answer: 'O pacote é o mesmo. O Pro traz as 5 aulas em vídeo e a comunidade dos alunos, por R$ 99,90 uma vez só. As aulas estão sendo gravadas e chegam para quem comprou assim que saem.',
            },
        ],
    },

    closing: {
        subtitle: 'Comece agora',
        title: 'Dê ao seu agente a inteligência para trabalhar do jeito certo.',
        description: 'Três comandos, e ele já recusa o erro de sempre, conserta com prova e põe o projeto no ar com um código do seu e-mail.',
        cta: { label: 'Ver no GitHub', href: 'https://github.com/ciro-maciel/ccm-stack' },
    },

    // The band on the home (pages/Home.jsx), between the books and the lines.
    home: {
        subtitle: 'CCM Stack',
        title: 'A stack universal que dá inteligência ao seu agente.',
        description:
            'As regras que ele não pula, o jeito certo de consertar, testar e construir, e o caminho do seu computador até o ar. Aberto e grátis, com um curso de cinco aulas de dez minutos.',
        featuresList: [
            'Recusa o erro e diz o jeito certo na mesma mensagem',
            'Do computador ao ar com um código do seu e-mail',
            'Claude Code, Antigravity, Windsurf, Cursor, Codex, Gemini CLI e Copilot',
        ],
        cta: { label: 'Conhecer o CCM Stack', href: '/ccm-stack' },
    },
}
