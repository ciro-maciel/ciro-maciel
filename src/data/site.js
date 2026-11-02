/**
 * Conteúdo do site em um lugar só.
 *
 * As páginas do site são config-driven: elas não montam JSX, elas passam estes
 * objetos para os componentes do @ciromaciel/components-kit. Para mudar o texto do
 * site, mude aqui — não nas páginas.
 */

export const SITE = {
    name: 'Ciro Cesar Maciel',
    // A pessoa jurídica por trás do site. Aparece SÓ nos documentos de
    // `/legal`, nas cláusulas que precisam de um sujeito que exista em
    // cartório — parte do contrato, foro, controlador perante a LGPD. Em
    // lugar nenhum da copy: as notas de marca dizem que a RiLiGar
    // "não é marca, não tem site, não tem voz", e quem assina este domínio é
    // a pessoa. É a mesma entidade que responde pelo myinfrastructure.click.
    legalEntity: 'RiLiGar Tecnologia e Educação (CNPJ 33.101.839/0001-75)',
    role: 'Software & AI Engineer',
    url: 'https://ciromaciel.click',
    github: 'https://github.com/ciro-maciel',
    linkedin: 'https://linkedin.com/in/ciromaciel',
    // `@ciro-maciel`, com hífen — é o canal cujo título é "Ciro Cesar
    // Maciel", e é o mesmo que o rodapé de myinfrastructure.click aponta.
    // `@ciromaciel` sem hífen TAMBÉM responde 200, com outro título; é por
    // isso que a checagem aqui foi pelo título da página e não pelo status.
    //
    // O `constants.js` do site dos produtos conta o caso que justifica essa
    // paranoia: dois handles lá apontavam para 404 porque tinham sido
    // renomeados no serviço de origem, e nada no repositório detecta isso —
    // build e teste passam verdes enquanto o visitante bate na parede.
    youtube: 'https://www.youtube.com/@ciro-maciel',
    // O blog do Ciro, no Blogs da linha Marketing (29/10/2026). Endereço
    // próprio, então abre em outra aba, como o YouTube.
    blog: 'https://blog.ciromaciel.click',
    // `ciro.maciel`, COM ponto. O handle sem ponto existe, responde 200 e é
    // de OUTRA PESSOA ("ciro maciel Bautista") — o erro de digitação aqui não
    // quebra nada, só manda o visitante para o perfil de um estranho.
    instagram: 'https://www.instagram.com/ciro.maciel/',
    // wa.me abre direto na conversa, no app instalado ou no WhatsApp Web —
    // sem tela intermediária de "adicionar contato".
    whatsapp: 'https://wa.me/5511986166966',
    // O RETRATO, EM PNG COM ALFA desde 21/09/2026.
    //
    // O anterior (`Ciro Cesar Maciel.webp`) trazia o fundo azul embutido —
    // sem canal alfa, o azul era parte da imagem. Ele era o único bloco de
    // cor saturada da página inteira, num sistema que a `/branding` descreve
    // como "três valores, e nenhuma cor de destaque": ali a cor carrega
    // estado, e um retangulão azul atrás do retrato gastava o único sinal
    // reservado para dizer "olhe aqui".
    //
    // Com alfa, a figura pousa sobre o branco da seção e o que sobra é o
    // desenho. O arquivo antigo fica em `/public` porque ainda é o
    // apple-touch-icon declarado no `index.html`.
    portrait: '/ciro-maciel.webp',
    // THE SIZES THE HERO DRAWS (22/10/2026). The original is 1024px and
    // 536 kB for a picture shown at 200px on a phone and 420px from `md` up:
    // on a phone on slow 4G it arrived at ~6.9 s, five seconds after the rest
    // of the page, and the face filled in on screen in stages. The 400 (16 kB)
    // and 840 (70 kB) are the two widths at 2x, cut from the original.
    portraitSrcSet: '/ciro-maciel-400.webp 400w, /ciro-maciel-840.webp 840w',
    portraitSizes: '(min-width: 62em) 420px, 200px',
}

export const HERO = {
    // Two lines: Home joins them with a <br /> so the headline breaks where the
    // sentence breaks, not where the viewport decides.
    titleLines: ['Construir é de todos.', 'As ferramentas e o saber é que não eram.'],
    description:
        'Faço software há mais de vinte anos. Hoje construo os blocos que uma ideia precisa para existir de verdade.',
    // A ARTE DO HERO. Uma lâmpada saindo de uma caixa aberta — "Open Idea" no
    // banco de imagens da casa (assets/illustrations, no repositório privado ciro-maciel/assets).
    //
    // POR QUE ESTA. A manchete diz que construir é de todos e que o que
    // faltava eram as ferramentas e o saber; o desenho é uma ideia saindo da
    // caixa, que é a mesma frase em imagem. Ficou aqui no lugar dos sliders
    // (`mudanca.svg`, ainda em `/public/art`), que tinham vindo da seção "o
    // que mudou" e falavam de ajuste, não de ideia.
    //
    // O QUADRO FOI CONFERIDO, e não é detalhe: o `CLAUDE.md` do monorepo
    // avisa que os SVGs deste banco declaram todos `viewBox 550×550` mas o
    // desenho ocupa de 57% a 95% do quadro, então `maw` igual rende tamanhos
    // visuais diferentes. Medido nos dois: esta ocupa 61%×85% e a anterior
    // 59%×87% — perto o bastante para o mesmo `maxWidth` de 260 servir sem
    // ajuste. Trocar por outra do banco pede essa medição de novo.
    //
    // MONOCROMÁTICA, como toda ilustração da casa. O banco descreve esta como
    // "blue tones", mas o arquivo não tem azul de verdade: a saturação mais
    // alta é 11% (`rgb(95,100,107)`), e dois dos cinco tons são os mesmos da
    // arte anterior. Nada a converter.
    art: '/art/ideia.svg',
}

// A VISÃO, logo depois do hero. Reescrita em 22/09/2026.
//
// A versão anterior abria com "a coisa mais difícil de aprender virou a mais
// fácil de pedir" e um antes/depois de "anos de estudo" contra "uma tarde".
// Tudo verdade, e o dono do site recusou: contada como um custo que caiu, a
// mudança é uma PERDA, e quem passou mais de vinte anos do lado de lá sai dela menor
// — logo abaixo de um hero que diz "faço software há mais de vinte anos". A raiz tem
// de falar como quem vê para onde isso vai e está construindo o caminho, não
// como quem se beneficiou dele.
//
// Então a seção diz para onde vai, e prova que já está acontecendo. As
// três pessoas ficam; o que caiu foi o fechamento "Nenhum dos três é
// programador", que as descrevia pelo que falta — o `voice.md` proíbe isso
// com essas palavras. Agora elas são descritas pelo que só elas sabem.
//
// Sem número e sem nome de concorrente, pelo mesmo motivo de antes: pessoa
// concreta pesa mais que estatística, e citar rival faria a seção ser sobre
// ele.
export const SHIFT = {
    subtitle: 'O que eu vejo',
    title: 'O próximo software vai ser feito por quem vive o problema.',
    description:
        'Desde que o software existe, quem tinha o problema não era quem sabia construir a solução. Entre os dois havia um orçamento, uma fila ou um "não dá". A IA fechou esse intervalo. Isso não é o fim de uma profissão: é o começo de um mundo com muito mais gente construindo.',

    // Three people, not three arguments. Same shape as the three arrivals in
    // the brand notes, with no hierarchy between them. They are the
    // proof that the vision above is already under way, which is why the
    // title is a statement and no longer a question.
    peopleTitle: 'Já está acontecendo.',
    people: [
        {
            who: 'Uma secretária',
            what: 'Fez o controle que a empresa nunca teve orçamento para encomendar.',
        },
        {
            who: 'Um garoto de 15 anos',
            what: 'Publicou o primeiro produto antes de terminar a escola.',
        },
        {
            who: 'Um dono de loja',
            what: 'Automatizou o estoque que ele conferia na mão todo sábado.',
        },
    ],
    // Two paragraphs, not one sentence with a full stop in the middle: the
    // first line states the fact, the second states what it means. Rendered
    // as separate <p> so the break is in the content, not in the layout —
    // a <br /> or a width cap would move with the viewport.
    closing: [
        'Cada um conhece um problema que ninguém de fora conhece.',
        'É daí que vem o próximo software.',
    ],
    // ESTA SEÇÃO NÃO LÊ MAIS O CAMPO, desde 21/09/2026. Ela era duas colunas
    // com esta arte à direita e virou uma coluna de texto centrada: três
    // sliders isométricos ilustrando "o custo caiu" não diziam nada que o
    // texto já não dissesse, e a Lei 1 do design system manda cortar cromo
    // que não carrega informação.
    //
    // NINGUÉM LÊ ESTE CAMPO HOJE. Ele chegou a subir para o hero em
    // 21/09/2026 e saiu de lá no mesmo dia, trocado pela lâmpada
    // (`HERO.art`): os sliders falam de ajuste, e a manchete fala de ideia.
    //
    // O campo e o arquivo ficam. `mudanca.svg` é do banco de imagens da casa
    // (assets/illustrations/svg, no repositório privado ciro-maciel/assets), então
    // apagá-lo custaria uma ida ao banco para recuperar. Um campo não lido não pesa no
    // bundle.
    art: '/art/mudanca.svg',
}

// O CAMINHO, entre a visão e "O que eu faço". Nasceu em 22/09/2026.
//
// QUEM CONDUZ É ELE. A primeira versão tinha a IA como protagonista ("a IA
// resolveu o meio do caminho; eu construo as duas pontas") e o dono do site
// recusou no mesmo dia: a raiz é de quem vê para onde isso vai, constrói as
// ferramentas e leva as pessoas pelo caminho — não de quem cuida das sobras
// que a IA deixou. Então cada trecho é um momento da pessoa, e o rótulo ao
// lado diz o que ele faz ali.
//
// "ENSINO" NO PRESENTE, E SEM PRODUTO. Ensinar é o papel dele, e ele já o
// exerce (conteúdo, o livro, a conversa). O que não entra é curso, turma ou
// preço: o Learning não tem casa ainda (`brand/arquitetura.md`).
//
// Os três pontos usam a mesma timeline da visão (`ShiftRail`): o último nó é
// o preenchido, e "Crescer" é mesmo o ponto de chegada.
export const PATH = {
    subtitle: 'O caminho',
    // Two sentences, not a dash: with "—" the balanced wrap broke the line
    // right at the dash, and the second line opened on it.
    title: 'Eu construo as ferramentas. E conduzo o caminho inteiro.',
    stages: [
        {
            label: 'Eu mostro',
            value: 'Começar',
            description:
                'Você tem a IA na mão. Eu mostro o que ela pode fazer pelo seu trabalho, e por onde começar.',
            // EACH STAGE HAS A DOOR since 01/10/2026: the stage says what he
            // does, the link shows where it already exists.
            link: { label: 'Os livros', to: '/books' },
        },
        {
            label: 'Eu ensino',
            value: 'Construir',
            description:
                'A IA escreve o programa. Eu ensino a pensar o problema, para que ela construa o que você precisa.',
            link: { label: 'As ferramentas', to: '/tools' },
        },
        {
            label: 'Eu construo',
            // CRESCER, NOT "EXISTIR", since 22/09/2026. "Existir" was the day
            // it goes live, and the founder's point is the whole life after
            // it. It also gives the path a rhythm: Começar, Construir,
            // Crescer.
            value: 'Crescer',
            // NO LIST. Two earlier versions enumerated the stage ("outras
            // pessoas entrando, usando e pagando", then "colocar no ar,
            // receber, operar…") and both read as an infra checklist. The
            // founder chose the open sentence: it covers what is live and
            // what comes, and names no line that does not exist yet
            // (Operations, Analytics) — the root does not announce roadmap.
            description:
                'Tudo o que a sua ideia vai precisar depois de pronta. Eu construo as ferramentas e ensino a usar cada uma.',
            link: { label: 'O Infrastructure', href: 'https://myinfrastructure.click' },
        },
    ],
    // Back to the hero's first sentence, and then his part in it.
    closing: ['Construir é de todos.', 'O meu trabalho é levar cada um até lá.'],
}

// NOT A FEATURE LIST. This block used to read "login, dados, um endereço no
// ar e cobrança" — the parts catalogue, which belongs on the product site.
// Someone arriving here arrives at a person, and what they want to know is
// what this person can do for them, not what the platform ships.
//
// WHAT THIS BLOCK MAY NOT SAY. Teaching is the founder's role, not an offer:
// `brand/arquitetura.md` puts it plainly — "Ciro: constrói a empresa e ensina.
// Vende: nada — ensina e credencia". Learning is under construction and
// Community, where it will live, does not exist. So these lines describe what
// he DOES, in the present tense, and none of them names a course, a mentorship,
// a cohort or a price. The day Community ships, this block can make an offer;
// until then it would be selling a room that has no door.
//
// AND IT NEVER SENDS THE READER ELSEWHERE. A line here once read "inclusive
// quando a resposta certa é uma ferramenta que não é minha" — honest, and the
// wrong page for it. That candour belongs in content, where it earns trust by
// being unprompted; on the founder's own site it spends the reader's attention
// promoting someone else. This is his space.
// THE SHELF, between the path and "Quem conduz" (01/10/2026). The path's
// first stage says "eu mostro"; this is what he shows. The books themselves
// come from data/catalog.js — this block is only the frame.
export const SHELF = {
    // 31/10/2026: the first half of the headline's promise ("o saber"), said as what the
    // reader fears losing (time on theory they never apply). The series name lives on /books.
    subtitle: 'O saber',
    title: 'Do primeiro pedido ao sistema no ar.',
    description:
        'Quatro níveis e um livro por ofício, da série O Novo Básico. Você aprende fazendo: cada conversa com a IA no livro é real, e todo fato tem fonte.',
    cta: { label: 'Achar o livro do meu nível', to: '/books' },
}

export const BUILD = {
    // QUEM CONDUZ, since 22/09/2026. The band above now says what he does —
    // builds the tools and leads the way — so this block, right under it and
    // on the same white band, answers who: where the twenty years went and
    // why the reader can trust the guide. Its old title ("Construo as peças —
    // e mostro o caminho até elas") repeated the path title word for word.
    subtitle: 'Quem conduz',
    // `\u00a0` between "É" and "ali": the kit's title does not balance its
    // wrap, and at desktop width the "É" was left alone at the end of line 1.
    title: 'Sei onde uma ideia trava. É\u00a0ali que eu construo.',
    // SHORT ON PURPOSE. FeatureSplit sets `lh={1.6}` inline and gives the
    // description no `maw`, so inline beats any stylesheet and the only lever
    // left is the number of words. The previous version ran to seventeen
    // lines in the column and read as a wall.
    description:
        // 31/10/2026: says who it is for and what they take, as the first line (the reading of
        // ratosdeia.com.br). The three items are what the reader takes, not how the Ciro works:
        // that moved to "Em 30 segundos" (START.brief).
        'Faço software há mais de vinte anos. Agora o saber está nos livros, e as ferramentas estão abertas e no ar, para você construir com IA, saiba programar ou não.',
    // Empty since 31/10/2026: the three items repeated what the steps below do better
    // (START.steps). The hero is only the tension and its answer; Home renders no list.
    featuresList: [],
    // THE DOOR THIS BLOCK PROMISES. The last line says "você me acha do outro
    // lado", and until now the only button here went to the product — the same
    // call the hero already makes, so the promise had no door and the page
    // repeated itself. wa.me opens straight into the conversation, with no
    // "add contact" screen in between.
    // NO `target` HERE — FeatureSplit does not forward it. The kit passes only
    // { label, href, icon, size, variant, color } through to the button, so a
    // `target: '_blank'` sits in this object looking correct and does nothing.
    // wa.me handles it anyway: it hands off to the installed app or to
    // WhatsApp Web rather than replacing the page with a dead end.
    cta: {
        label: 'Falar comigo',
        href: SITE.whatsapp,
    },
}

// A HOME COMO UM CAMINHO (31/10/2026), components/StartHere.jsx. Não copia seções de outro
// site: segue o que a manchete promete. "As ferramentas e o saber é que não eram" pede que a
// página entregue os dois, e cada bloco faz um trabalho na cabeça de quem lê:
//   steps   a pessoa se reconhece numa frase em primeira pessoa e dá o primeiro passo pequeno
//           (identificação e compromisso, antes de qualquer oferta);
//   proof   quem desconfia vê a operação real: o próprio site roda nas peças (prova pelo uso,
//           e cada item é verificável no link);
//   follow  no fim, depois de dar, o convite para acompanhar, e só então o e-mail (as cartas).
// Tudo afirmado aqui é fato conferido em 31/10/2026; sem número que envelhece e sem preço.
export const START = {
    steps: {
        id: 'degrau',
        subtitle: 'Por onde começar',
        title: 'Em que degrau você está?',
        description: 'Cada um começa de um lugar. Escolha a frase que é sua: o próximo passo está embaixo dela.',
        items: [
            { eyebrow: 'Degrau 1', name: 'Estou começando a usar IA.', text: 'Pedir, conferir a resposta e proteger os seus dados: o primeiro passo, explicado do zero.', action: 'Começar pelo IA no dia a dia', to: '/books/ia-no-dia-a-dia' },
            { eyebrow: 'Degrau 2', name: 'Quero usar IA no meu trabalho.', text: 'Um livro por ofício, com as tarefas do dia e o pedido testado: escritório, primeiro emprego, negócio, vendas, sala de aula, contabilidade e advocacia.', action: 'Achar o livro do meu ofício', to: '/books' },
            { eyebrow: 'Degrau 3', name: 'Quero construir o meu próprio sistema.', text: 'Do protótipo ao sistema no ar, com login, dados e cobrança, um passo por capítulo.', action: 'Ver o Construir com IA', to: '/books/construir-com-ia' },
            { eyebrow: 'Degrau 4', name: 'Já tenho algo no ar.', text: 'As peças para publicar, medir, atender e trazer gente, pelo seu agente ou pelo painel.', action: 'Ver as linhas', scrollTo: 'infrastructure' },
        ],
    },
    proof: {
        id: 'prova',
        subtitle: 'A prova',
        title: 'Tudo o que você vê aqui roda no que eu construí.',
        description: 'Não é vitrine: é a minha operação. Se uma peça quebrar, quebra para mim primeiro.',
        items: [
            { name: 'Este site', text: 'Publicado pelo Hoster, da linha Infrastructure.', icon: 'server', href: 'https://myinfrastructure.click/products/hoster' },
            { name: 'As visitas', text: 'Medidas pelo Analytics, da linha Operations, sem cookie.', icon: 'chart', href: 'https://myoperations.click/products/analytics' },
            { name: 'O blog', text: 'Publicado no Blogs, da linha Marketing.', icon: 'article', href: 'https://mymarketing.click/products/blogs' },
            { name: 'As cartas', text: 'Enviadas pela Newsletter, da linha Marketing, só para quem confirmou.', icon: 'mail', href: 'https://mymarketing.click/products/newsletter' },
            { name: 'O contato', text: 'Recebido pelo Forms, da linha Marketing.', icon: 'forms', href: 'https://mymarketing.click/products/forms' },
            { name: 'Os agentes', text: 'Trabalham comigo no Assistant, da linha Agents, e pedem o meu sim antes do que não tem volta.', icon: 'robot', href: 'https://myagents.click/products/assistant' },
        ],
    },
    follow: {
        id: 'acompanhe',
        subtitle: 'Acompanhe',
        title: 'Veja enquanto eu construo.',
        description: 'O que eu aprendo construindo sai primeiro nestes canais, aberto. As cartas, logo abaixo, levam o resumo ao seu e-mail.',
        items: [
            { name: 'Blog', text: 'Os textos longos, com o caminho inteiro.', icon: 'article', href: SITE.blog },
            { name: 'YouTube', text: 'A coisa funcionando na tela, do começo ao fim.', icon: 'youtube', href: SITE.youtube },
            { name: 'Instagram', text: 'Cortes curtos e os bastidores do que estou fazendo.', icon: 'instagram', href: SITE.instagram },
            { name: 'GitHub', text: 'O código aberto dos projetos que eu publico.', icon: 'github', href: SITE.github },
        ],
    },
}

// A PEÇA QUE JÁ ESTÁ NO AR, trazida do site do produto sem
// reescrita. O bloco acima diz que ele constrói as peças; este mostra a peça.
// É a mesma copy que a empresa usa, palavra por palavra — duas páginas
// dizendo a mesma frase sobre a mesma coisa é o ponto, não uma duplicação a
// corrigir: quem chega pelo founder e quem chega pelo produto ouve o mesmo.
//
// NÃO LISTA AS OUTRAS PEÇAS. O catálogo é do site do produto e envelhece
// sozinho — aqui entra só o que está no ar hoje, e o botão manda para lá.
export const INFRASTRUCTURE = {
    subtitle: 'Para quem constrói',
    title: 'Infrastructure',
    // The tab's main label since 31/10/2026: what the reader needs to do, not our line's name.
    need: 'Pôr no ar',
    description:
        'Todo aplicativo precisa do mesmo começo: um lugar na internet, um jeito das pessoas entrarem, onde guardar o que elas fazem e como receber por isso. A diferença é quem monta isso: aqui, o próprio agente de IA que escreveu o seu código.',
    featuresList: [
        'A IA já escreve o programa. O que faltava era um lugar onde ela também pudesse colocá-lo no ar — sem um humano no meio traduzindo painel.',
        'Você pede ao seu agente, ele resolve e devolve um endereço funcionando. Ou você mesmo faz pelo painel, se preferir: as duas portas estão abertas.',
        // "E O SUPORTE É COM QUEM ESCREVEU" SAIU EM 20/09/2026. A frase é
        // verdadeira e funciona numa conversa de DM, mas foi aposentada como
        // ARGUMENTO pelo dono em 16/09: nenhuma referência de mercado vende
        // suporte humano, e em auth e cobrança "uma pessoa responde" lê como
        // ponto único de falha — desconto de credibilidade exatamente onde a
        // decisão de compra acontece. É veto de superfície, igual ao "one
        // person business": vale na conversa, não no material que credencia.
        // No lugar entra o que o produto tira do caminho, que é o argumento
        // que a pessoa está procurando aqui.
        'Nada de servidor, certificado, pipeline ou banco para configurar: isso já vem montado, e o que sobra do seu tempo vai para o que você está construindo.',
    ],
    image: '/images/sections/produto-hoster.svg',
    cta: {
        label: 'Conhecer o Infrastructure',
        href: 'https://myinfrastructure.click',
    },
}

// O TETO DAS IMAGENS DAS SEÇÕES DA HOME (08/10/2026), passado ao `mediaMaw`
// de cada FeatureSplit. No desktop a imagem divide a linha com o texto e mede
// ~411px; abaixo do `md` ela empilha e ocupava a largura toda — 868px num
// tablet, o retrato e o foguete maiores que a tela. 420 deixa o desktop como
// estava e segura o resto.
export const MEDIA_MAW = 420

// AS LINHAS DEPOIS DO INFRASTRUCTURE (08/10/2026). Na home elas dividem a faixa
// do Infrastructure: uma fila de cinco abas em cima, e a aba escolhida troca o
// bloco embaixo, no mesmo formato do INFRASTRUCTURE acima (Home.jsx, LineShowcase).
//
// NADA AQUI É ESCRITO PARA A RAIZ. O rótulo é a frase da linha
// (brand/arquitetura.md), o título e o parágrafo são o hero do site dela, a lista
// é a frase de cada produto como o site da linha a diz, e a arte é a do hero de
// lá, para quem clica reconhecer onde chegou. Só entra produto no ar: Community
// (Operations) e Blogs/Pages (Marketing) ficam fora até abrirem. Sem preço.
export const LINES = {
    title: 'As outras linhas',
    // 31/10/2026: the section finally has a header, the second half of the headline's promise.
    header: {
        subtitle: 'As ferramentas',
        title: 'O que você precisa fazer, já no ar.',
        description: 'Cada linha resolve uma parte do caminho, do primeiro deploy ao cliente que volta. Escolha pelo que você precisa agora.',
    },
    items: [
        {
            name: 'Operations',
            need: 'Saber o que acontece',
            domain: 'myoperations.click',
            href: 'https://myoperations.click',
            products: ['Analytics', 'Videos', 'Tasks'],
            subtitle: 'Operations é como você toca o que existe',
            sentence: 'Saiba o que acontece no que você colocou no ar.',
            description:
                'De onde veio cada visita, até onde cada vídeo foi assistido, o que cada agente fez e o que ele espera de você. Sem cookie no navegador de quem visita, sem barra que finge duração e sem montar servidor para medir.',
            featuresList: [
                'Analytics: uma linha no <head>, e o tráfego do site aparece. Sem cookie, e nenhum identificador fica no navegador de quem visita.',
                'Videos: a barra é sempre o tempo real. Entre quem se identificou, você sabe quem assistiu e até onde.',
                'Tasks: os agentes trabalham aqui, e você decide o que é seu. Cada ferramenta tem uma regra, e o que só você decide vira um pedido.',
            ],
            image: '/images/sections/linha-operations.svg',
        },
        {
            name: 'Customers',
            need: 'Conhecer cada cliente',
            domain: 'mycustomers.click',
            href: 'https://mycustomers.click',
            products: ['People'],
            subtitle: 'Customers é o caminho de quem ainda não te conhece até quem já paga',
            sentence: 'Saiba onde cada pessoa está. E o que fazer agora.',
            description:
                'Sem planilha e sem estágio digitado à mão. Lead, prospect e customer são a mesma pessoa em três momentos, e o People guarda a ficha dela do primeiro toque ao pagamento.',
            featuresList: [
                'O estágio sai do que a pessoa fez, não do que alguém digitou. Customer só com pagamento confirmado.',
                'O sistema da sua loja, da sua escola ou do seu app manda o que a pessoa fez pelo mesmo webhook assinado. Uma planilha entra por importação CSV.',
                'Agentes propõem o próximo passo. Uma checagem sem IA confere antes, e falar com a pessoa espera a sua aprovação.',
            ],
            image: '/images/sections/linha-customers.svg',
        },
        {
            name: 'Marketing',
            need: 'Trazer gente',
            domain: 'mymarketing.click',
            href: 'https://mymarketing.click',
            products: ['Forms', 'Links', 'Newsletter'],
            subtitle: 'Marketing traz gente e captura contato',
            sentence: 'Saiba o que trouxe cada pessoa, e fique com o contato dela.',
            description:
                'Um link por post, para saber qual trouxe cada clique. Um formulário que entrega cada resposta, mesmo quando o destino recusa. E uma carta do seu domínio, só para quem pediu, medida por clique.',
            featuresList: [
                'Forms: uma linha no site, e o formulário aparece. Cada resposta sai por webhook assinado e espera na fila quando o destino recusa.',
                'Links: saiba qual post trouxe cada clique. Prévia de app e robô que se declara ficam à parte.',
                'Newsletter: uma carta do seu domínio, medida por clique, só para quem confirmou que quer receber.',
            ],
            image: '/images/sections/linha-marketing.svg',
        },
        {
            name: 'Agents',
            need: 'Pôr a IA para trabalhar',
            domain: 'myagents.click',
            href: 'https://myagents.click',
            products: ['Assistant', 'Connectors', 'Brain'],
            subtitle: 'Agents põe a IA para trabalhar nas suas ferramentas',
            sentence: 'Um bot que faz o trabalho, e pede o seu sim antes do que não tem volta.',
            // Sem o número de conectores, como em MCP_HOME: o diretório cresce toda semana.
            description:
                'Um bot com um computador próprio na nuvem: navega, usa o terminal e os seus aplicativos, e roda rotinas com a aba fechada. E conectores MCP para ele, o Claude ou qualquer assistente: cole o endereço, entre e peça.',
            featuresList: [
                'Assistant: um bot com um computador próprio na nuvem, que pede a sua aprovação antes de enviar, pagar, apagar ou publicar.',
                'Connectors: cole o endereço, entre e peça. Servidores MCP com login OAuth, no Assistant, no Claude ou em qualquer cliente MCP.',
                'Brain: a memória dos seus agentes. Um espaço onde o assistente guarda o que foi decidido e acha de novo na próxima conversa.',
            ],
            image: '/images/sections/linha-agents.svg',
        },
    ],
}

// ─── Página /links: REMOVIDA em 19/09/2026 ───────────────────────────────────
//
// Havia aqui um `export const LINKS` com a tagline e os cards da página "link
// na bio" (/links): o prompt grátis, o produto, o livro e o contato. A página
// inteira saiu a pedido do dono do site, e os dados saíram com ela — dado sem
// consumidor é dado que alguém vai tentar reativar sem saber o porquê.
//
// O endereço /links agora responde 404. O motivo de não haver redirecionamento
// está no comentário da rota, em `main.jsx`.
//
// Para recuperar: o conteúdo está no histórico do git, no commit que a removeu.

/**
 * A página /tools — o catálogo das ferramentas gratuitas.
 *
 * AS FERRAMENTAS NÃO ESTÃO AQUI. Nome, descrição e palavras de busca de cada
 * uma vêm do `tool.json` dela, no repositório tools, e chegam à página
 * pelo `/tools.json` que o build gera. Este bloco é só a moldura: o que a
 * página diz sobre o conjunto.
 */
export const TOOLS = {
    subtitle: 'Ferramentas',
    title: 'Ferramentas gratuitas, para usar agora.',
    description:
        'Sem cadastro e sem custo. A maioria roda no seu navegador: o que você digita não sai da sua máquina.',
    // A ARTE DO HERO. Uma janela de navegador com uma chave inglesa —
    // "Web Maintenance" no banco de imagens da casa (ciro-maciel/assets).
    //
    // POR QUE ESTA: é a promessa da página em imagem — a ferramenta mora no
    // navegador. O quadro foi medido, como o `CLAUDE.md` do monorepo manda:
    // ocupa 62%×91% do viewBox, contra 62%×87% da `ideia.svg` da home, então
    // o mesmo `maxWidth` de 300 rende o mesmo tamanho visual nas duas páginas.
    // Monocromática de origem: saturação máxima de 16%, os mesmos cinzas.
    art: '/art/ferramentas.svg',
    // Curto porque a 390px a caixa mostra ~26 caracteres: com o exemplo
    // ("Ex.: gerar senha") o texto cortava no meio da palavra.
    searchPlaceholder: 'O que você quer fazer?',
    // As três promessas que valem para todas — ditas uma vez aqui, para que
    // cada card não precise repeti-las.
    promises: ['Sem cadastro', 'Roda no seu navegador', 'O link guarda a sua configuração'],
    listTitle: 'Todas as ferramentas',
    // A SEÇÃO DA HOME, depois da Infrastructure: a peça que se compra, e em
    // seguida o que se usa de graça. Mesma arte da página /tools, para quem
    // clica reconhecer onde chegou.
    // O MESMO FORMATO DA INFRASTRUCTURE logo acima: rótulo curto e o nome
    // como título ("Para quem constrói" / "Infrastructure"). O FeatureSplit põe o
    // título por cima das duas colunas; com a frase inteira ele ocupava duas
    // linhas de 52px e a seção pesava mais que a do produto.
    home: {
        subtitle: 'Use agora',
        title: 'Ferramentas abertas, sem cadastro.',
        description:
            'As que eu faço para o meu trabalho com IA e servem para mais gente ficam aqui: abre e usa.',
        featuresList: [
            'Sem cadastro e sem custo: abre e usa.',
            'A maioria roda no seu navegador. O que você digita não sai da sua máquina.',
            'O link guarda a configuração: mande para alguém e a ferramenta abre do mesmo jeito.',
            'E as extensões que uso todo dia, no Chrome e no VS Code.',
        ],
        cta: {
            label: 'Ver as ferramentas',
            href: '/tools',
        },
    },
    empty: 'Nenhuma ferramenta faz isso ainda.',
    ctaLabel: 'Abrir',
    // Onde a ferramenta roda, dito como o que importa para quem usa.
    runs: {
        browser: 'Roda no navegador',
        manager: 'Roda no servidor',
        // Um app para baixar (o Speech to Text): a página é da ferramenta, o
        // uso é no computador de quem instala.
        desktop: 'Roda no seu computador',
    },
    // A terceira porta, para quem usa assistente de IA. NULL ATÉ O MCP ESTAR
    // NO AR: a frase pronta é 'Usa Claude, ChatGPT ou outro assistente? As
    // mesmas ferramentas estão em mcp.tools.ciromaciel.click.' — publicá-la antes do
    // deploy mandaria a pessoa para um endereço que não responde.
    mcp: null,
}

/**
 * Os conectores MCP, na home depois das ferramentas (21/10/2026).
 *
 * O diretório mora em mcp.myagents.click (agents/mcp): um servidor MCP remoto
 * para cada produto das linhas e para os serviços que o registro oficial não
 * tinha (Search Console, Analytics, YouTube, App Store Connect…). Cada um tem a
 * sua página com a URL para copiar.
 *
 * SEM NÚMERO no texto: o diretório ganha conector toda semana, e "27" escrito
 * aqui ficaria velho no primeiro conector novo. Quem quer contar, clica.
 *
 * O login é por produto (as notas de produto: "mesmo login, autorização por
 * produto"): cada conector pede a SUA autorização — a conta da linha, o Google,
 * ou a chave do serviço. Nada aqui promete um token para tudo.
 */
export const MCP_HOME = {
    // A arte: um robô de IA com uma ideia, do banco da casa (ciro-maciel/assets,
    // "AI Robot Idea"), escolhido pelo Ciro em 21/10/2026. O mesmo traço
    // isométrico cinza das outras fichas da home.
    art: '/art/conectores.svg',
    home: {
        subtitle: 'Para quem já usa um assistente de IA',
        title: 'O seu assistente, lendo o que você usa.',
        description: 'Cole um endereço no Claude, no Cursor ou em qualquer cliente MCP, e ele passa a consultar o seu Search Console, a sua agenda ou o seu YouTube. São servidores MCP para os produtos das linhas e para os serviços que ainda não tinham conector.',
        featuresList: [
            'Funcionam no Claude, no Cursor e em qualquer cliente MCP: você cola a URL e conecta.',
            'Cada um entra com a sua própria permissão: a conta da linha, o seu Google ou a chave do serviço.',
            'Search Console, Analytics, YouTube, Agenda, Drive, Bing e App Store Connect, além dos produtos das linhas.',
            'Cada conector tem a sua página, com o que ele faz e o que dá para pedir.',
        ],
        cta: {
            label: 'Ver os conectores',
            // A página do site (pages/Mcp.jsx), que lista os conectores e leva
            // ao diretório mcp.myagents.click.
            href: '/mcp',
        },
    },
}
