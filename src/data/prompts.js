/**
 * /prompts — one ready request per page, for anyone who uses AI at work.
 *
 * Six come word for word from the book IA no dia a dia (volume 1 of O Novo
 * Básico), with the test the book ran and what it showed: three of the "ten
 * requests to use tomorrow" and three passages of "check before you trust"
 * and "protect your data". A passage each, never a chapter: the book is paid
 * (docs/2026-09-28-ISCAS-DIGITAIS.md, "Grátis ou valor baixo").
 *
 * Two are the founder's own, each tested before going live with its result on
 * the page, as the book's are: the leverage-point request, from the service
 * scope of the house notes (03/10/2026),
 * and the "what changed in the customer conversations" request, the weekly
 * house market memo, made portable.
 *
 * Five come from the book IA no primeiro trabalho (volume 4): the entry pages
 * planned in books/ia-no-primeiro-trabalho/research/palavras-chave.md §4.3,
 * one per search (résumé, fake job ad, interview, payslip, first day). Each
 * request is word for word from chapters/o-kit.md, "Os pedidos deste livro";
 * the checks come from that chapter's "Confira" in the kit and the chapter
 * itself; the test result only says what research/testes/ANALISE-*.md
 * allows. The copy says "trabalho", never "emprego" (the author's choice),
 * and the payslip page carries no yearly value: those live in the kit, dated.
 *
 * Five come from IA no pequeno negócio (volume 5) and five from IA no atendimento
 * e nas vendas (volume 6), each in its own file with the same rules, joined
 * here on launch day (11/10/2026).
 *
 * Plain data, no React: the build scripts import it too.
 */

import { PENDING_PROMPTS_SMALL_BUSINESS } from './prompts-ia-no-pequeno-negocio.js'
import { PENDING_PROMPTS_SALES } from './prompts-ia-no-atendimento-e-nas-vendas.js'

const BOOK = {
    title: 'Os pedidos vêm do livro IA no dia a dia',
    description: 'O livro traz os dez pedidos para usar amanhã, as quatro conferências e o que nunca colar numa IA, cada um testado e com o que conferir.',
    label: 'Ver o livro',
    to: '/books/ia-no-dia-a-dia',
}

const BOOK_FIRST_WORK = {
    title: 'Os pedidos vêm do livro IA no primeiro trabalho',
    description: 'O livro traz um pedido testado para cada tarefa do primeiro trabalho, da vaga ao holerite, com o que conferir na resposta e o que nunca colar numa IA.',
    label: 'Ver o livro',
    to: '/books/ia-no-primeiro-trabalho',
}

export const PROMPTS = {
    path: '/prompts',
    eyebrow: 'Pedidos prontos',
    title: 'Pedidos prontos para colar na IA, cada um com o teste ao lado',
    description: 'Um pedido por página, com o que ele resolve, o que conferir na resposta e o que o teste mostrou. Copie, troque o que está entre colchetes e use.',
    codeLabel: 'O pedido, para colar',
    more: 'Mais pedidos prontos',
    items: [
        {
            slug: 'ponto-de-alavanca',
            label: 'Por onde começar a usar IA no trabalho',
            title: 'O pedido que mostra por qual passo do seu processo começar a usar IA',
            description: 'Descreva o seu processo e a IA separa o que apagar, o que vira regra, o que um agente faz e o que fica com você, e escolhe um passo para começar.',
            lead: 'Você quer pôr IA no trabalho e não sabe por onde. Este pedido separa cada passo do seu processo em quatro caixas e escolhe um para começar, com o porquê.',
            code: 'Vou descrever um processo do meu trabalho, passo a passo.\n1. Para cada passo, diga em que caixa ele cai: apagar (é só ritual), regra simples (sempre do mesmo jeito), agente de IA (exige ler e julgar, mas se repete) ou decisão de uma pessoa. Aprovar, assinar, negociar e pagar ficam sempre com uma pessoa, mesmo depois de aprovados.\n2. Para os três passos mais promissores, monte uma tabela com quatro perguntas, respondidas com sim ou não e o número do meu texto que justifica: acontece com frequência? fica no começo do processo, com o resto esperando por ele? resolvê-lo libera trabalho adiante? um agente resolveria só avisando, preparando ou conferindo?\n3. Escolha UM passo para começar: o que tiver mais "sim"; no empate, o que mais atrasa o resto. Explique em três linhas, sem número que não esteja no meu texto.\nSe faltar informação para decidir, pergunte antes.\n\n[descreva o processo, um passo por linha, com quantas vezes ele acontece e quanto atrasa]',
            checks: [
                'Nenhum passo de aprovar, assinar, negociar ou pagar foi parar na caixa do agente',
                'Cada "sim" da tabela aponta para um número que está no seu texto',
                'O passo escolhido é o que mais segura o resto, não o mais vistoso',
            ],
            test: 'No teste (Claude Haiku 4.5, 03/10/2026, as contas a pagar de um escritório pequeno com 120 boletos por mês), a IA fez três perguntas antes de decidir e escolheu o pedido da nota fiscal que falta: o passo que trava 30 boletos antes da aprovação do sócio. Mas pôs o agendamento no banco como "regra simples", mesmo com o pedido dizendo que pagar fica com uma pessoa, e chamou de ritual o boleto que chega do fornecedor. Confira as caixas antes de seguir. Uma primeira versão do pedido, sem a tabela, escolheu a digitação dos boletos e inventou uma economia de horas: por isso a tabela pede o número do seu texto.',
            source: 'O método das quatro caixas, que eu uso para mapear um processo antes de pôr um agente nele.',
            cta: {
                title: 'Quer olhar o seu processo comigo?',
                description: 'Me conta o processo do jeito que contaria a um amigo. Eu digo por onde começaria, e digo com franqueza quando não é caso de IA.',
                label: 'Chamar no WhatsApp',
                href: 'whatsapp',
            },
        },
        {
            slug: 'o-que-mudou-nas-conversas-com-clientes',
            label: 'O que mudou nas conversas com clientes',
            title: 'O pedido que lê as conversas com clientes e diz o que mudou nesta semana, com a frase de prova',
            description: 'Cole as anotações de duas semanas de WhatsApp, loja e avaliações. A IA diz o que mudou, com a frase do cliente e o número da anotação, e propõe um teste.',
            lead: 'Você conversa com cliente o dia todo e não sabe o que mudou desde a semana passada. Este pedido compara as duas semanas e mostra a mudança com a frase de quem disse.',
            code: 'Vou colar anotações de conversas com clientes (venda, suporte, WhatsApp, avaliação), uma por linha, com a data.\n1. Separe as anotações em duas partes: os últimos 7 dias e os 7 dias antes. Diga só o que MUDOU de uma parte para a outra: uma dor nova, uma palavra nova que os clientes usam, uma objeção que cresceu ou sumiu. O que ficou igual não entra.\n2. Cada mudança vem com o recibo: a frase do cliente entre aspas, só as palavras dele (nunca a resposta da empresa), e o número da anotação. Mudança sem recibo não entra. Se só uma ou duas anotações falam de algo, escreva "amostra pequena" ao lado.\n3. Proponha UM teste para esta semana: o que mudar (uma frase do anúncio, do site ou da resposta no WhatsApp), em que número olhar para saber se deu certo e qual é esse número hoje, se estiver nas anotações. Não invente número nem meta. O teste não pode prometer ao cliente o que as anotações mostram que a empresa não cumpre.\nSe as anotações não tiverem data, pergunte antes.\n\n[cole as anotações, uma por linha, com a data e de onde veio: WhatsApp, loja, avaliação, ligação]',
            checks: [
                'Entre as aspas estão só as palavras do cliente, não a resposta da sua empresa',
                'Cada mudança aponta para o número de uma anotação que existe',
                'O teste não promete prazo, preço ou entrega que você não consegue cumprir, e nenhuma meta apareceu sem você pedir',
            ],
            test: 'No teste (Claude Haiku 4.5, 07/10/2026, 20 anotações de duas semanas de uma loja de móveis planejados), as quatro rodadas acharam a mudança: o prazo para o Natal virou a objeção da semana, com as anotações 9, 10, 11, 14 e 18 de prova, e a queda de 2 de 9 para 1 de 11 orçamentos fechados. As duas primeiras versões puseram a resposta da loja dentro da frase do cliente, uma inventou uma meta de 20% e a outra sugeriu prometer entrega no Natal, com uma avaliação reclamando de atraso. O pedido ganhou as regras das aspas, da meta e da promessa; na versão final, uma rodada saiu limpa e a outra ainda colou a resposta da loja nas aspas e escreveu um "alvo de 50%". Confira as aspas e apague a meta que não veio de você.',
            source: 'O memo semanal "o que o mercado está dizendo", que roda toda sexta no meu sistema de marketing: só entra o que mudou, e cada linha leva o recibo.',
            cta: {
                title: 'Quer montar isso no seu negócio?',
                description: 'Me conta de onde vêm as conversas com os seus clientes. Eu digo como juntar tudo num lugar só e ler o que mudou toda semana, e digo com franqueza quando não vale a pena.',
                label: 'Chamar no WhatsApp',
                href: 'whatsapp',
            },
        },
        {
            slug: 'marcar-o-que-a-ia-acrescentou',
            label: 'Marcar o que a IA acrescentou',
            title: 'O pedido que faz a IA marcar com [?] tudo o que ela inventou no resumo',
            description: 'Depois de um resumo, peça para a IA marcar com [?] o que não estava no seu texto. O pedido, o teste do livro e o que o [?] ainda deixa passar.',
            lead: 'A IA resumiu a reunião e você não sabe o que ela acrescentou. Este pedido faz ela marcar, e mostra o que você ainda precisa conferir.',
            code: 'Refaça o resumo e marque com [?] tudo o que não estava escrito nas minhas anotações.',
            checks: ['Cada [?]: confirme ou apague', 'As datas e os nomes, um a um, mesmo os sem [?]', 'Os verbos de tarefa ("acompanhar", "verificar") que você não escreveu'],
            test: 'No teste do livro (Claude Haiku 4.5, 24/09/2026), a data inventada saiu e o [?] mostrou que ninguém tinha ficado responsável pela etiqueta. Mas "dia 15" virou "15/09" sem marca, e dois verbos acrescentados também passaram sem [?]. O [?] ajuda a achar o que conferir; não confere por você.',
            source: 'Livro IA no dia a dia, capítulo "Conferir antes de confiar".',
            cta: BOOK,
        },
        {
            slug: 'pedir-a-fonte',
            label: 'Pedir a fonte, e abrir a fonte',
            title: 'O pedido que faz a IA dizer de onde tirou o número, com o link',
            description: 'Peça a fonte com o link e abra o link: o número principal pode conferir e os detalhes em volta virem sem fonte. O pedido e o teste do livro.',
            lead: 'A IA deu um número e você vai usá-lo. Este pedido traz a fonte, e o teste do livro mostra por que você ainda precisa abri-la.',
            code: '[sua pergunta]. Diga de onde tirou a informação, com o link.',
            checks: ['Abra cada link: ele existe?', 'O número que você vai usar está escrito na página aberta?', 'Os detalhes em volta (percentuais, multas) também estão lá, ou vieram sem fonte?'],
            test: 'No teste do livro (Claude Sonnet 4.6 com pesquisa na internet, 24/09/2026), o salário mínimo de 2026, o número do decreto e a data conferiram no site oficial. O índice de inflação e o "ganho real" que vieram junto não estavam no decreto. Fonte que você não abriu não conta.',
            source: 'Livro IA no dia a dia, capítulo "Conferir antes de confiar".',
            cta: BOOK,
        },
        {
            slug: 'trocar-os-dados-antes-de-colar',
            label: 'Trocar os dados antes de colar',
            title: 'O jeito de pedir ajuda à IA sem entregar o nome nem o documento de ninguém',
            description: 'Troque nome, documento e número de outras pessoas antes de colar o texto na IA. Os exemplos de troca do livro, prontos para usar.',
            lead: 'Você precisa da ajuda da IA, mas o texto tem nome e documento de cliente. Estas trocas resolvem antes de colar.',
            code: 'Em vez de: "a cliente Maria Souza, CPF tal, reclamou do atraso"\nEscreva:  "uma cliente reclamou do atraso"\n\nEm vez da lista inteira: três linhas com nomes inventados, e peça que ela ensine a organizar a planilha. O resto você faz.\n\nNo seu currículo: o texto sem CPF, endereço e telefone. Eles não mudam nada na resposta.',
            checks: ['A troca foi feita ANTES de colar: se você pede para a IA apagar os nomes, eles já foram', 'Saúde, documento e dado de cliente não foram junto', 'Se a empresa tem regra sobre IA, ela vale mais do que esta página'],
            test: 'O livro traz a regra que vale antes de qualquer troca: na dúvida, trate o material como se não pudesse ir para a IA, e pergunte por escrito a quem responde pela área.',
            source: 'Livro IA no dia a dia, capítulo "Proteger seus dados e não cair em golpe".',
            cta: BOOK,
        },
        {
            slug: 'resumir-sem-inventar',
            label: 'Resumir sem inventar',
            title: 'O pedido de resumo que obriga a IA a usar só o que está no texto',
            description: 'Um resumo em cinco tópicos que usa só o que está escrito e marca com [?] o que a IA acrescentar. O pedido testado e o que conferir.',
            lead: 'Você precisa do resumo e não pode receber nada que não estava no texto. Este pedido limita a IA ao que você colou.',
            code: 'Resuma este texto em cinco tópicos, usando só o que está\nescrito nele. Marque com [?] qualquer coisa que você\nacrescentar.\n\n[cole o texto]',
            checks: ['Datas, números e nomes, um a um, contra o original'],
            test: 'Testado em setembro de 2026 com um material de exemplo no lugar dos colchetes, como os dez pedidos do livro.',
            source: 'Livro IA no dia a dia, capítulo "Dez pedidos para usar amanhã" (pedido 1).',
            cta: BOOK,
        },
        {
            slug: 'tarefas-de-uma-conversa',
            label: 'Tirar as tarefas de uma conversa',
            title: 'O pedido que tira de uma conversa a lista de tarefas, com quem faz e até quando',
            description: 'Cole a conversa e receba as tarefas com responsável e prazo, e "a definir" onde a conversa não diz. O pedido testado e o erro que o teste achou.',
            lead: 'A conversa do grupo virou uma lista de coisas a fazer que ninguém escreveu. Este pedido a escreve, e diz onde faltou dono ou prazo.',
            code: 'Com base nesta conversa, monte uma lista de tarefas, com\nquem faz cada uma e até quando. Se a conversa não disser\nquem faz ou até quando, escreva "a definir".\n\n[cole a conversa]',
            checks: ['Os nomes: cada responsável disse mesmo que faria?', 'Os prazos: "semana que vem" e "fim do mês" viraram a data certa?'],
            test: 'No teste do livro (24/09/2026), mesmo com o "a definir" no pedido, a IA pôs como responsável pelos preços uma pessoa que só tinha a tabela. E transformou "semana que vem" em "até ~30/09" sem avisar, o que estava errado: a semana seguinte ia até 4 de outubro.',
            source: 'Livro IA no dia a dia, capítulo "Dez pedidos para usar amanhã" (pedido 5).',
            cta: BOOK,
        },
        {
            slug: 'pedir-que-ela-pergunte-antes',
            label: 'Pedir que a IA pergunte antes',
            title: 'O pedido que faz a IA perguntar o que precisa antes de responder',
            description: 'Em vez de adivinhar, a IA faz as perguntas que precisa para ajudar bem. O pedido testado e o que ela ainda deduz sem perguntar.',
            lead: 'A IA responde rápido e responde errado porque adivinhou o que você queria. Este pedido a faz perguntar primeiro.',
            code: 'Antes de responder, me faça as perguntas que você\nprecisa para me ajudar bem. Quero [a tarefa].',
            checks: ['O que ela deduziu sem perguntar'],
            test: 'No teste do livro (setembro de 2026), ela perguntou o que precisava, mas concluiu sozinha de que mês se tratava.',
            source: 'Livro IA no dia a dia, capítulo "Dez pedidos para usar amanhã" (pedido 10).',
            cta: BOOK,
        },
        {
            slug: 'curriculo-com-ia-sem-inventar',
            label: 'Currículo com IA, sem inventar',
            title: 'Currículo com IA sem inventar: o pedido para o primeiro trabalho',
            description: 'O pedido que faz a IA montar o currículo de jovem aprendiz ou de primeiro trabalho só com o que você disse, e marcar com [?] o que faltar.',
            lead: 'Você pediu o currículo à IA e ela escreveu o que você não fez. Este pedido a limita ao que você contou e marca com [?] o que só você pode preencher.',
            code: 'Faça meu currículo para essa vaga. Use só o que eu disse; marque com [?] o que faltar; não acrescente experiência, curso, nota ou habilidade que eu não disse.\nMeu perfil: [o que você fez, onde, desde quando e com que frequência, sem CPF, RG nem endereço]\nA vaga: [cole o anúncio]',
            checks: [
                'Cada linha contra o que você disse: tarefa que você não fez, data que você não deu, qualidade que você não disse',
                'O verbo: "às vezes fico no caixa" é caixa eventual, não "fechamento do caixa"',
                'O cabeçalho e os requisitos da vaga: o que ela respondeu por você, como uma disponibilidade de horário',
                'Cada [?] preenchido por você antes de mandar, com o que você tem certeza',
            ],
            test: 'No teste do livro (Claude Sonnet 4.6, 02/10/2026, o perfil inventado de uma candidata a aprendiz que ajuda aos sábados na loja da tia), só com "faça meu currículo para essa vaga" os 3 currículos trouxeram 30 informações que não estavam no perfil, de 9 a 11 em cada um: "às vezes fico no caixa" virou "fechamento do caixa". Com a regra, sobraram 4 em 3, nenhuma atividade inventada, e de 5 a 7 lacunas marcadas com [?]. Nenhum dos 6 inventou curso, ferramenta ou número. A regra cortou quase tudo, não tudo: leia linha a linha.',
            source: 'Livro IA no primeiro trabalho, capítulo "Currículo sem inventar nada".',
            cta: BOOK_FIRST_WORK,
        },
        {
            slug: 'vaga-falsa-no-whatsapp',
            label: 'Reconhecer vaga falsa',
            title: 'Vaga falsa no WhatsApp: os sinais de golpe e o que fazer depois',
            description: 'Cole o anúncio e a IA separa o que está escrito do que ela supõe, citando o sinal de golpe. O checklist da vaga de verdade e o que fazer se já pagou.',
            lead: 'Chegou uma vaga por mensagem, com pressa, taxa ou pedido de documento. Este pedido aponta os sinais citando o trecho, e a lista diz o que conferir por fora e o que fazer se você já mandou algo.',
            code: 'Tô procurando [o meu primeiro trabalho] e achei esses anúncios. Para cada um, me diga: 1) o que o anúncio diz (só o que está escrito); 2) se tem sinal de golpe, qual é, citando o trecho; 3) o que não dá para saber só pelo texto (por exemplo, se a empresa existe) e como eu confiro. Separe o que está no anúncio do que você está supondo, e não afirme nada sobre as empresas que não esteja escrito.\n\n[cole os anúncios, sem nenhum documento seu]',
            checks: [
                'Pedido de dinheiro: curso, exame, inscrição, "taxa de cadastro". Nenhuma empresa séria cobra para você participar da seleção',
                'Pedido, por mensagem, antes de qualquer contratação, de foto de documento, selfie, dado de conta ou senha',
                'Contato só por mensagem, que você não pediu, com pressa: "só até sexta", "últimas vagas"',
                'A empresa e a vaga, por fora, no site oficial, digitando você o endereço; e toda regra de lei, no artigo',
                'Se só recebeu a mensagem: não responda, bloqueie e denuncie o número no aplicativo. Se já pagou: avise o banco na hora, pelo aplicativo ou pelos canais oficiais, conteste o pagamento e registre boletim de ocorrência',
            ],
            test: 'No teste do livro (Claude Sonnet 4.6, 04/10/2026, seis anúncios inventados, dois deles golpe), a IA separou certo as vagas falsas das verdadeiras nas 6 respostas, 36 classificações certas em 36, e achou sempre a cobrança e o pedido de documento. No pedido natural, 2 de 3 respostas garantiram "Endereço físico real" a uma padaria que ninguém conferiu; com este pedido, nenhuma afirmação sobre as empresas fora do texto. Mas 5 das 6 trataram o piso do salário do aprendiz como teto, 2 delas com este pedido: a lei se confere no artigo.',
            source: 'Livro IA no primeiro trabalho, capítulo "Achar vaga e reconhecer vaga falsa", e o checklist da vaga de verdade, do kit.',
            cta: BOOK_FIRST_WORK,
        },
        {
            slug: 'entrevista-jovem-aprendiz-estagio',
            label: 'Treinar a entrevista com IA',
            title: 'Entrevista de jovem aprendiz e estágio: o treino com IA',
            description: 'Dez perguntas que costumam cair e respostas só com o que está no seu perfil, com [falta: ...] onde faltar. O pedido testado e o que ler antes de treinar.',
            lead: 'A IA dá as perguntas da entrevista e uma resposta pronta, às vezes com o que você não fez. Este pedido deixa nas respostas só o que é seu e marca o resto para você preencher com um caso real.',
            code: 'Vou fazer entrevista para [a vaga]. A empresa é a [nome], de [cidade]. Me dê 10 perguntas que costumam fazer nessa entrevista e, para 3 delas, a resposta que eu posso dar. Nas respostas, use só experiências que estão no meu perfil; onde faltar alguma coisa, marque [falta: ...] em vez de inventar. Não diga nada sobre a empresa que eu não tenha dito.\nMeu perfil: [o que você fez, sem documento e sem contato]',
            checks: [
                'Cada frase, como quem vai ser perguntado sobre ela: "eu consigo contar um caso disso?"',
                'As palavras que crescem: "organizo", "controlo", "cuido de", "sozinha" ou "sozinho", "por conta própria", "tenho facilidade para"',
                'Cada [falta: ...] preenchido com um caso seu e treinado em voz alta, sem decorar o texto da IA',
                'O que você disser da empresa, na fonte dela: o site, o anúncio, a página da vaga',
            ],
            test: 'No teste do livro (Claude Sonnet 4.6, 02/10/2026, o perfil inventado de uma candidata a aprendiz auxiliar administrativo), sem a regra, 6 de 9 respostas sugeridas traziam experiência que ela não tinha ou não tinha dito: o mesmo "organizo o estoque" nas 3 apresentações, quando ela dobra e arruma as peças. Com a regra, 2 de 9, e o [falta] apareceu nas 3 rodadas, inclusive no ponto fraco. Sobre a empresa, nada inventado nas 6 rodadas; mas ela também não sabe: pesquise na fonte.',
            source: 'Livro IA no primeiro trabalho, capítulo "Preparar a entrevista".',
            cta: BOOK_FIRST_WORK,
        },
        {
            slug: 'ler-o-holerite',
            label: 'Ler o holerite, linha a linha',
            title: 'Holerite do primeiro trabalho: o pedido que explica linha a linha',
            description: 'A IA explica cada linha do holerite com a fonte e marca o que conferir. O que o teste achou, o que não colar nela e onde ver os valores do ano.',
            lead: 'Chegou o primeiro holerite e você quer saber para onde foi o desconto. Este pedido explica cada linha com a regra e a fonte; os seus dados ficam de fora, e a conta se confere na tabela do ano.',
            code: 'Recebi meu holerite de [mês]. Me explica cada linha e confere se está certo. Diga de onde vem cada regra (a lei ou a norma); o que você não tiver certeza, marque para eu conferir no RH ou na lei.\n\n[digite as linhas: código, descrição, referência e valor, e o rodapé com as bases, sem nome, CPF, matrícula, empresa nem banco]',
            checks: [
                'As linhas digitadas, sem nome, CPF, matrícula, empresa nem banco: print ou foto levam tudo, inclusive o que você não viu',
                'A conta, na tabela do ano: o salário mínimo no decreto, no planalto.gov.br; o INSS na página do INSS; o imposto de renda na da Receita Federal',
                'Cada lei citada, no planalto.gov.br: se a página diz "Revogado", a regra não vale mais daquele jeito',
                'Achou um erro: fale com o RH por escrito, com a linha, a conta e o número que você conferiu, nunca o da IA',
            ],
            test: 'No teste do livro (Claude Sonnet 4.6, 02/10/2026, dois holerites inventados, um deles com o INSS calculado com uma alíquota só sobre o salário inteiro, quando ele se calcula por faixas), o "tá certo?" explicou o desconto errado como certo nas 3 respostas. Com este pedido, o erro foi achado nas 3. Mas o valor a cobrar saiu errado nas 3, e cada resposta trouxe de 7 a 9 valores ou regras errados ou desatualizados, quase todos na fonte citada, até decreto revogado. Os valores do ano ficam no kit do livro, com a data.',
            source: 'Livro IA no primeiro trabalho, capítulo "Contrato e holerite".',
            cta: BOOK_FIRST_WORK,
        },
        {
            slug: 'primeiro-dia-de-trabalho',
            label: 'A língua da empresa no primeiro dia',
            title: 'Primeiro dia de trabalho: o pedido que separa a sigla da empresa',
            description: 'Antes do primeiro dia, a IA explica os termos do comércio e diz quais siglas só a empresa explica, com o que perguntar e a quem. O pedido testado.',
            lead: 'O manual chegou cheio de siglas e você começa amanhã. Este pedido explica os termos comuns e separa os que podem ser da casa, com o que perguntar no primeiro dia e a quem.',
            code: 'Começo [quando] como [cargo] num [tipo de lugar]. O que significam essas siglas e termos? Para cada um, diga se é comum no comércio ou se pode ser interno da empresa. Se puder ser interno, diga que não dá para saber pelo texto, não chute o significado, e me diga o que perguntar no primeiro dia e a quem.\n\n[a lista das palavras que você não entendeu, sem o texto do manual e sem o nome da empresa]',
            checks: [
                'Vai a lista das palavras, nunca o manual: ele é material da empresa e só vai para uma IA com o ok dela por escrito',
                'Toda sigla que ganhou nome por extenso: se o manual não dá o nome, é palpite até alguém da empresa confirmar',
                'Um "provável" no título ou um aviso genérico no fim não conta como "não sei"',
                'As perguntas, escritas, para o primeiro dia; e o glossário em três colunas: o termo, o que quer dizer e quem confirmou',
            ],
            test: 'No teste do livro (Claude Sonnet 4.6, 02/10/2026, o trecho de um manual inventado com 7 termos comuns do comércio e 3 siglas inventadas como internas), sem a regra a IA explicou as siglas da empresa com confiança em 9 de 9 respostas, e deu nome por extenso a uma que o manual não nomeava. Com a regra, 0 de 9, cada uma com a pergunta e a pessoa. Nos termos comuns, 0 erro em 42. No teste, o trecho do manual foi colado inteiro, porque era inventado; só com a lista de palavras, o pedido não foi testado.',
            source: 'Livro IA no primeiro trabalho, capítulo "O primeiro dia e a língua da empresa".',
            cta: BOOK_FIRST_WORK,
        },
        ...PENDING_PROMPTS_SMALL_BUSINESS,
        ...PENDING_PROMPTS_SALES,
    ],
}

export const promptBySlug = slug => PROMPTS.items.find(prompt => prompt.slug === slug)
