/**
 * O conteúdo da página de marca.
 *
 * Mesma regra do `site.js`: a página não escreve texto, ela lê daqui.
 *
 * O QUE ESTE ARQUIVO NÃO PODE FAZER é herdar a retórica da página da empresa.
 * A página de branding do produto descreve o símbolo como "a manifestação visual da
 * energia que impulsiona a transformação (...) o alinhamento inquebrável entre
 * a velocidade da inovação e o rigor da engenharia estratégica" — é a voz de
 * uma empresa falando de si mesma, e a mesma frase assinada por uma pessoa lê
 * como currículo inflado. Aqui cada bloco diz o que a coisa É e para que ela
 * serve, na mesma voz do resto do site: frases curtas, sem adjetivo de folder.
 */

export const BRANDING = {
    title: 'A marca',
    // Diz para que a página serve na primeira frase. A da empresa abre com
    // "tudo que você precisa para exibir a marca da maneira certa" — aqui
    // quem chega é quase sempre alguém que vai publicar o nome dele em algum
    // lugar (um evento, um post, um slide), então a frase fala com essa pessoa.
    description:
        'Os arquivos e as regras para exibir meu nome em algum lugar — um evento, um post, um slide. Pegue o que precisar.',

    // O LOGOTIPO É SÓ O NOME, desde 19/09/2026. Ele trazia a lâmpada à
    // esquerda; a lâmpada saiu no mesmo dia em que o símbolo passou a ser o
    // raio, e as duas decisões se sustentam: o nome sozinho não disputa com
    // símbolo nenhum, então adotar o raio dos produtos deixou de criar duas
    // marcas concorrentes na mesma página.
    //
    // É também o que o resto do site já fazia. O header e o rodapé usam o
    // `Wordmark` do kit — o nome em texto, sem marca gráfica — porque uma
    // pessoa assina com o nome. Desde 14/10/2026 o logotipo é desenhado, não
    // uma imagem: o mesmo componente das linhas, sem a assinatura, com os
    // cinzas do sistema. O arquivo abaixo é só para baixar.
    logotype: {
        src: '/logotipo.webp',
        caption: 'O nome, e só. É com ele que se assina.',
        // A regra que a página da empresa também carrega, escrita como regra
        // e não como slogan: "a assinatura positiva é o nosso padrão" só
        // significa alguma coisa para quem já sabe o que é assinatura positiva.
        rule: 'A VERSÃO ESCURA SOBRE FUNDO CLARO É O PADRÃO',
    },

    // O RAIO, o mesmo símbolo dos produtos — adotado aqui em 19/09/2026.
    // Funciona porque o logotipo virou só o nome no mesmo dia: não há um
    // segundo desenho na página para competir com ele.
    //
    // UMA MASCOTE DISPUTOU ESTE POSTO EM 21/09/2026 E PERDEU, e o registro
    // fica para a decisão não ser refeita do zero. Ela chegou a ser o símbolo
    // por algumas horas, voltou atrás, e no fim do dia foi aposentada.
    //
    // O QUE PESOU CONTRA, depois de olhar o que a concorrência faz: um
    // personagem como marca exige uma segunda versão só para assinar — o
    // GitHub tem o Invertocat, que é uma silhueta do Octocat, e o manual
    // deles proíbe usar a ilustração no lugar do logo; o Mailchimp reduziu o
    // Freddie a uma silhueta de uma cor quando ele virou logotipo. A
    // ilustração 3D não serve: a 24px o rosto vira massa, e sobre fundo
    // escuro o corpo grafite some e sobra a máscara flutuando. Manter duas
    // versões de um desenho é trabalho permanente, e o raio não cobra isso.
    //
    // O QUE PESOU A FAVOR DO RAIO: ele já assina os produtos, e uma marca só
    // é mais barata de sustentar que duas. O contra conhecido — a Supabase
    // também usa um raio — é real e foi aceito de olhos abertos.
    symbol: {
        src: '/logo.webp',
        description:
            'O raio, o mesmo símbolo dos produtos. Use-o sozinho onde o nome não cabe: favicon, avatar, carimbo. Ao lado do nome, ele não substitui o logotipo — quem assina é o nome.',
    },

    // A paleta é a mesma do site do produto porque é o mesmo kit e a mesma
    // pessoa; o que muda é que aqui ela é descrita pelo uso, não pela
    // "estética monocromática calibrada".
    colorsCaption: 'Três valores, e nenhuma cor de destaque. O que destaca é o tamanho do texto, não a cor.',
    colors: [
        {
            color: '#11181C',
            label: 'Preto profundo',
            hex: '#11181C',
            use: 'Texto, símbolo e logotipo.',
        },
        {
            color: '#F9FAFB',
            label: 'Cinza suave',
            hex: '#F9FAFB',
            use: 'Faixas que separam uma seção da outra.',
        },
        {
            color: '#FFFFFF',
            label: 'Branco puro',
            hex: '#FFFFFF',
            use: 'O fundo padrão, e a maior parte da página.',
        },
    ],

    type: {
        caption: 'Uma família só, em quatro pesos.',
        notes: [
            {
                title: 'Por que Montserrat',
                body: 'Geométrica e sem serifa: mantém a forma tanto num título de 64px quanto num rótulo de 12px, que é o intervalo que este site usa. É a mesma fonte do site dos produtos — os dois são construídos com o mesmo kit.',
            },
            {
                title: 'Como usar',
                body: 'A hierarquia é feita com peso e tamanho, nunca com cor. Pesos altos (700+) nos títulos, regular no corpo — e nada no meio disputando atenção.',
            },
        ],
        weights: [
            { weight: 400, name: 'Regular', use: 'Corpo de texto e descrições' },
            { weight: 500, name: 'Medium', use: 'Subtítulos e ênfase' },
            { weight: 700, name: 'Bold', use: 'Títulos principais' },
            { weight: 900, name: 'Black', use: 'Destaque e alto contraste' },
        ],
    },

    // O CARTÃO SOCIAL É O RETRATO ILUSTRADO, e voltou a ser em 21/09/2026.
    //
    // Ele saiu por algumas horas naquele dia, quando a mascote era candidata a
    // símbolo e a página tinha figuras demais. Com a mascote aposentada, a
    // razão de ele ter saído deixou de existir: não há mais disputa, há o raio
    // que assina e o retrato que mostra quem é.
    //
    // O RAIO ENTROU NO CARTÃO em 21/09/2026. O gerador dizia, em comentário,
    // "sem lockup de raio: o raio é a marca dos produtos e este card é de uma
    // pessoa" — escrito antes de 19/09, quando o raio virou o símbolo daqui
    // também. Com um símbolo só nos dois domínios, o cartão passou a assinar
    // como o resto do site.
    //
    // O cartão é o mesmo para o site inteiro — é um cartão de identidade, não
    // uma miniatura por página.
    opengraph: {
        src: '/opengraph.webp',
        description:
            'É o que aparece quando alguém cola um link deste site no WhatsApp, no LinkedIn ou no X. O mesmo cartão para o site inteiro, com o símbolo, o nome e o retrato.',
        specs: ['Formato: WebP', 'Proporção: 1.91:1', 'Peso: menos de 300KB'],
    },

    // FECHA RESPONDENDO A PERGUNTA QUE A PÁGINA PROVOCA. Quem chega aqui vindo
    // do site do produto reconhece a fonte e a paleta, e merece saber por quê —
    // sem que este site reivindique a marca dos produtos nem finja que são
    // independentes. O lockup abaixo é ilustrativo dessa relação, e não uma
    // assinatura conjunta a ser usada por aí.
    //
    // REESCRITO QUATRO VEZES EM 21/09/2026, e o texto final é o primeiro.
    //
    // O caso, porque a lição vale mais que o texto: (1) dizia "o mesmo símbolo
    // assina os produtos"; (2) virou "os produtos assinam com o raio, aqui é a
    // mascote" quando a mascote tomou o posto neste site; (3) virou "é a mesma
    // marca nos dois lugares" quando o site dos produtos também a adotou; (4)
    // voltou ao começo quando a mascote foi aposentada nos dois.
    //
    // A LIÇÃO: este é o único texto do repositório que pode ficar falso por um
    // commit em OUTRO repositório. Quatro reescritas num dia foi o custo de
    // mexer no símbolo antes de decidir qual é o símbolo. Quem for trocar a
    // marca de qualquer um dos dois sites decide primeiro, escreve depois.
    //
    // O HISTÓRICO ANTERIOR, para não ser refeito: até 20/09 o texto dizia "as
    // duas marcas saem da mesma mão" e separava "aqui é uma pessoa, lá é a
    // empresa". Isso descrevia a arquitetura até 18/09, quando havia duas
    // marcas — a razão social e a pessoa. Não há mais: a razão social só emite
    // a nota e riligar.click redireciona para cá.
    relation: {
        title: 'E os produtos',
        description:
            'O símbolo é o mesmo dos produtos: o raio. A fonte, a paleta e o kit também, porque é a mesma mão construindo. A diferença é o que cada superfície faz: aqui é quem constrói, lá é o que está no ar para você usar.',
    },
}
