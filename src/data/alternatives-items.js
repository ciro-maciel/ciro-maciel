/**
 * The pages of /alternatives, one per paid or closed app (data/alternatives.js
 * explains the rules). Every fact about a competitor was read on 19/10/2026 on
 * the source the page links; a fact that could not be read there is not here.
 *
 * `compare` rows: cost, open code, where it runs, what leaves the Mac, what it
 * does. Our app first in every row.
 */

const CHECKED = '19/10/2026'

const cleanerOurs = {
    cost: 'R$ 0. Sem plano, sem assinatura',
    open: 'Sim, o app inteiro, licença MIT',
    runs: 'Mac com Apple Silicon e macOS 14 ou mais novo',
    leaves: 'Nada: o app não tem código de rede, nem conta',
}

const screenshotsOurs = {
    cost: 'R$ 0',
    open: 'Sim, licença MIT',
    runs: 'Mac com Apple Silicon e macOS 14 ou mais novo',
    leaves: 'Nada: sem nuvem, sem conta e sem código de rede',
}

const windowsOurs = {
    cost: 'R$ 0',
    open: 'Sim, licença MIT',
    runs: 'Mac com Apple Silicon e macOS 14 ou mais novo',
    leaves: 'Nada: sem conta e sem código de rede',
}

const sttOurs = {
    cost: 'R$ 0, sem cota de palavras ou minutos',
    open: 'Sim, licença MIT',
    runs: 'Mac com Apple Silicon e macOS 14 ou mais novo',
    leaves: 'A voz não sai: o Parakeet roda no Mac. Só o texto, se você ligar o refinamento opcional com a sua chave',
}

const ttsOurs = {
    cost: 'R$ 0',
    open: 'Sim, licença MIT',
    runs: 'Mac com Apple Silicon e macOS 14 ou mais novo',
    leaves: 'O texto vai, trecho por trecho, ao servidor da ferramenta e ao Fish Audio, que não guardam o texto',
}

export const ITEMS = [
    // ─── Cleaner ─────────────────────────────────────────────────────────
    {
        slug: 'cleanmymac',
        app: 'cleaner',
        competitor: 'CleanMyMac',
        title: 'Uma alternativa grátis e de código aberto ao CleanMyMac para Mac',
        description: 'O Cleaner limpa caches, desinstala apps com os restos e mostra o disco, de graça e com o código aberto. Lado a lado com o CleanMyMac, com fonte e data.',
        lead: 'Quem procura uma alternativa ao CleanMyMac quase sempre quer duas coisas: liberar espaço sem assinatura e saber o que está sendo apagado. O Cleaner foi feito para as duas.',
        card: 'Limpeza, desinstalador e mapa do disco sem assinatura, com as regras de limpeza à vista.',
        forWhom: 'Para quem usa um Mac com Apple Silicon, quer liberar espaço de vez em quando e não quer pagar uma assinatura por isso. Também para quem desconfia de limpador: o Cleaner mostra cada item, a pasta e a regra que o encontrou antes de mover qualquer coisa.',
        ourApp: 'O Cleaner aplica 8 regras públicas, escritas num arquivo que qualquer pessoa lê no GitHub: caches, registros, Lixeira, instaladores velhos, Xcode, ferramentas de desenvolvimento e anexos do Mail. Remover pede segurar o botão por 3 segundos, e tudo passa 7 dias numa quarentena que devolve com um clique. Vêm junto o desinstalador, que procura os restos de um app em 38 lugares, o mapa do disco, o controle do que abre sozinho e um monitor na barra de menus.',
        compare: [
            { name: 'Custo', ours: cleanerOurs.cost, theirs: 'Download grátis na Mac App Store, com compra dentro do app: US$ 9,99 por mês, US$ 39,99 por ano ou US$ 89,99 uma vez (CleanMyMac X)' },
            { name: 'Código aberto', ours: cleanerOurs.open, theirs: 'Não' },
            { name: 'Onde roda', ours: cleanerOurs.runs, theirs: 'Só Mac, macOS 11 ou mais novo' },
            { name: 'O que sai do Mac', ours: cleanerOurs.leaves, theirs: 'O site leva a uma conta MacPaw; se ela é obrigatória, a página não diz' },
            { name: 'O que faz', ours: 'Limpeza, desinstalador, mapa do disco, inicialização, quarentena e monitor', theirs: 'Limpeza e otimização, com varredura de malware' },
        ],
        better: 'O CleanMyMac procura malware, e o Cleaner não: a MacPaw anuncia varreduras feitas com o Moonlock, contra keyloggers, adware e ransomware. Ele também roda em macOS mais antigo (a partir do 11) e tem a interface em 12 idiomas na App Store. Se proteção contra malware é o motivo da compra, o Cleaner não substitui isso; o macOS já traz o XProtect, que bloqueia malware conhecido.',
        faq: [
            { question: 'O Cleaner é grátis de verdade?', answer: 'É. Não há plano pago, nem teste que expira, nem compra dentro do app. O código está no GitHub com licença MIT, e o app baixado desta página é feito a partir dele.' },
            { question: 'O Cleaner tem antivírus como o CleanMyMac?', answer: 'Não. O Cleaner limpa, desinstala e mostra o disco, mas não procura malware nem arquivos duplicados.' },
            { question: 'E se ele apagar algo que eu queria?', answer: 'Nada é apagado na hora. O que sai vai para uma quarentena com o caminho de origem e volta com um clique durante 7 dias. Depois disso, o lote é apagado sozinho.' },
            { question: 'Funciona no meu Mac com Intel?', answer: 'Ainda não. O Cleaner é feito para Mac com Apple Silicon (M1 ou mais novo) e macOS 14 ou mais novo.' },
        ],
        sources: {
            note: `Preços e requisitos do CleanMyMac conferidos na página da Mac App Store em ${CHECKED}; a varredura de malware, no site da MacPaw na mesma data. Do Cleaner, o código e o README no GitHub.`,
            links: [
                { label: 'CleanMyMac na Mac App Store', href: 'https://apps.apple.com/us/app/cleanmymac/id1339170533' },
                { label: 'macpaw.com/cleanmymac', href: 'https://macpaw.com/cleanmymac' },
                { label: 'github.com/ciro-maciel/cleaner', href: 'https://github.com/ciro-maciel/cleaner' },
            ],
        },
    },
    {
        slug: 'appcleaner',
        app: 'cleaner',
        competitor: 'AppCleaner',
        title: 'Uma alternativa grátis e de código aberto ao AppCleaner para Mac',
        description: 'O Cleaner desinstala apps do Mac com os restos em 38 lugares e devolve tudo por 7 dias, com o código aberto. Lado a lado com o AppCleaner.',
        lead: 'O AppCleaner faz uma coisa: você solta um app na janela e ele acha os arquivos que vieram junto. O desinstalador do Cleaner faz o mesmo trabalho, com o código aberto e uma volta garantida.',
        card: 'Desinstalar com os restos, com o código aberto e uma quarentena de 7 dias.',
        forWhom: 'Para quem quer tirar um app do Mac sem deixar preferências, caches e agentes de inicialização para trás, e quer ver o código de quem mexe nesses arquivos. Também para quem já usa o AppCleaner e quer, no mesmo app, a limpeza e o mapa do disco.',
        ourApp: 'O desinstalador do Cleaner lista os apps com o tamanho e o último uso. Para remover, ele para os processos do app, descarrega os agentes de inicialização, tira o registro no macOS e o ícone do Dock, e procura os restos em 38 lugares, inclusive nos recibos de instalação. Tudo vai para uma quarentena: devolver refaz o registro e o ícone. Também acha restos de apps que já saíram do disco.',
        compare: [
            { name: 'Custo', ours: cleanerOurs.cost, theirs: 'A página oficial não cita preço; o site tem um link de doação' },
            { name: 'Código aberto', ours: cleanerOurs.open, theirs: 'Não: "todos os direitos reservados", sem repositório público' },
            { name: 'Onde roda', ours: cleanerOurs.runs, theirs: 'Só Mac. A versão 3.7 pede macOS 15; versões antigas vão até o 10.10' },
            { name: 'O que sai do Mac', ours: cleanerOurs.leaves, theirs: 'A página não menciona conta nem nuvem' },
            { name: 'O que faz', ours: 'Desinstalador, limpeza, mapa do disco, inicialização e monitor', theirs: 'Só desinstalar: soltar o app na janela e apagar os arquivos ligados a ele' },
        ],
        better: 'O AppCleaner roda em muito mais versões do macOS: o site mantém versões para o macOS 10.10 em diante, enquanto o Cleaner pede o macOS 14 e Apple Silicon. E ele é só isso, um desinstalador pequeno de arrastar e soltar; quem não quer limpeza, monitor nem quarentena tem menos coisa na tela.',
        faq: [
            { question: 'O Cleaner apaga os restos na hora?', answer: 'Não. O app e os restos vão para um lote da quarentena com o caminho de origem. Devolver é um clique e refaz o registro e o ícone no Dock; depois de 7 dias o lote se apaga sozinho.' },
            { question: 'Onde ele procura os restos?', answer: 'Em 38 lugares da Biblioteca e do sistema, pelo identificador do app ou pelo nome exato, inclusive pastas do fabricante e os recibos de pacotes .pkg. A lista está no código, no GitHub.' },
            { question: 'Ele pede senha?', answer: 'Só para itens do sistema, uma vez por ação, num pedido que diz o que vai fazer. Itens protegidos pelo macOS ficam onde estão, e o Cleaner diz por quê.' },
        ],
        sources: {
            note: `AppCleaner conferido no site oficial, freemacsoft.net, em ${CHECKED}. Do Cleaner, o código e o README no GitHub.`,
            links: [
                { label: 'freemacsoft.net/appcleaner', href: 'https://freemacsoft.net/appcleaner/' },
                { label: 'github.com/ciro-maciel/cleaner', href: 'https://github.com/ciro-maciel/cleaner' },
            ],
        },
    },
    {
        slug: 'daisydisk',
        app: 'cleaner',
        competitor: 'DaisyDisk',
        title: 'Uma alternativa grátis e de código aberto ao DaisyDisk para Mac',
        description: 'O Cleaner mede o disco do Mac pasta por pasta e ainda limpa e desinstala, de graça e com o código aberto. Lado a lado com o DaisyDisk, com fonte e data.',
        lead: 'O DaisyDisk mostra para onde foi o espaço do disco. O Cleaner também tem um mapa do disco, e depois de achar o que pesa ele limpa e desinstala no mesmo app.',
        card: 'Mapa do disco grátis, com limpeza e desinstalador no mesmo app.',
        forWhom: 'Para quem abre um app de disco quando o Mac avisa que o espaço acabou, e quer resolver ali mesmo: achar a pasta que pesa, limpar o que os apps recriam sozinhos e tirar o app que não usa mais.',
        ourApp: 'O mapa do disco do Cleaner mede uma pasta inteira em paralelo, contando os blocos de fato ocupados, e deixa entrar nas maiores até achar o que pesa. Ao lado dele estão a limpeza por regras públicas, o desinstalador e a quarentena de 7 dias, que devolve qualquer coisa com um clique. O app não fala com a internet.',
        compare: [
            { name: 'Custo', ours: cleanerOurs.cost, theirs: 'US$ 9,99, licença vitalícia, sem assinatura; há download para testar' },
            { name: 'Código aberto', ours: cleanerOurs.open, theirs: 'Não' },
            { name: 'Onde roda', ours: cleanerOurs.runs, theirs: 'Só Mac, Apple Silicon e Intel. O site diz macOS 10.13 ou mais novo; a App Store, 12 ou mais novo' },
            { name: 'O que sai do Mac', ours: cleanerOurs.leaves, theirs: 'Sem conta; o site diz que o app não coleta nem transmite dados' },
            { name: 'O que faz', ours: 'Mapa do disco, limpeza, desinstalador, inicialização e monitor', theirs: 'Mapa do disco em anéis coloridos, com prévia dos arquivos' },
        ],
        better: 'O DaisyDisk desenha o disco como anéis coloridos, o que deixa ver o tamanho de tudo de uma vez, e mede também Dropbox, Google Drive, OneDrive e Box. Roda em Mac com Intel e em macOS bem mais antigo, e tem a interface em 14 idiomas. Se o que você quer é só o mapa, bonito e direto, ele faz isso há anos.',
        faq: [
            { question: 'O mapa do disco do Cleaner é igual ao do DaisyDisk?', answer: 'Não. O do Cleaner é uma lista que você abre pasta por pasta, com o tamanho medido no disco. Não há o desenho em anéis.' },
            { question: 'Ele mede pastas de nuvem?', answer: 'Mede o que está no disco do Mac. O Cleaner não se conecta a serviço de nuvem nenhum: ele não tem código de rede.' },
            { question: 'Por que ele pede o Acesso Total ao Disco?', answer: 'Sem ele, o macOS esconde a Lixeira, o Mail e os contêineres dos apps. O Cleaner funciona sem a permissão, mas avisa que mostra menos.' },
        ],
        sources: {
            note: `Preço, requisitos e recursos do DaisyDisk conferidos no site oficial e na Mac App Store em ${CHECKED}. Do Cleaner, o código e o README no GitHub.`,
            links: [
                { label: 'daisydiskapp.com', href: 'https://daisydiskapp.com' },
                { label: 'DaisyDisk na Mac App Store', href: 'https://apps.apple.com/us/app/daisydisk/id411643860' },
                { label: 'github.com/ciro-maciel/cleaner', href: 'https://github.com/ciro-maciel/cleaner' },
            ],
        },
    },

    // ─── Screenshots ─────────────────────────────────────────────────────
    {
        slug: 'cleanshot-x',
        app: 'screenshots',
        competitor: 'CleanShot X',
        title: 'Uma alternativa grátis e de código aberto ao CleanShot X para Mac',
        description: 'O Screenshots captura, anota e grava a tela do Mac em MP4 ou GIF, de graça e com o código aberto. Lado a lado com o CleanShot X, com fonte e data.',
        lead: 'O Screenshots nasceu no espírito do CleanShot X: um atalho, a captura num cartão no canto da tela, pronta para anotar ou arrastar. Sem licença, sem nuvem e com o código aberto.',
        card: 'Captura, anotação, rolagem, texto da tela e gravação, sem licença e sem nuvem.',
        forWhom: 'Para quem tira print o dia inteiro, para explicar um erro, mostrar uma tela ou mandar um passo a passo, e quer anotar e gravar sem pagar licença. Também para quem prefere que nenhuma captura saia do Mac.',
        ourApp: 'O Screenshots mora na barra de menus. Captura uma área, a área anterior, a tela inteira, uma janela ou uma página longa com rolagem; tira o texto de uma imagem com o Vision da Apple, no próprio Mac; grava a tela em MP4 ou GIF, com som do computador e microfone opcionais. O editor tem 13 ferramentas, de seta e contador a desfoque e recorte, e a imagem pode ficar fixa por cima das janelas.',
        compare: [
            { name: 'Custo', ours: screenshotsOurs.cost, theirs: 'US$ 35 uma vez, com 1 ano de atualizações e renovação opcional de US$ 19 por ano. Pro: US$ 10 por pessoa por mês, cobrado por ano. Sem teste grátis' },
            { name: 'Código aberto', ours: screenshotsOurs.open, theirs: 'Não' },
            { name: 'Onde roda', ours: screenshotsOurs.runs, theirs: 'Só Mac, macOS 13 ou mais novo' },
            { name: 'O que sai do Mac', ours: screenshotsOurs.leaves, theirs: 'Toda licença traz uma conta do CleanShot Cloud, opcional, para subir e compartilhar com um clique' },
            { name: 'O que faz', ours: 'Captura, rolagem, texto da tela, gravação em MP4 e GIF, editor, fixar na tela e histórico', theirs: 'Captura, anotação, gravação e editor de vídeo, com nuvem para compartilhar' },
        ],
        better: 'O CleanShot X compartilha: um clique sobe a captura e devolve um link, com 1 GB de nuvem no plano Basic e espaço ilimitado no Pro. O editor de vídeo dele faz zoom automático, grava em 4K e transcreve. Roda também no macOS 13. O Screenshots não tem nuvem nem link, não corta vídeo, não grava a câmera e não tem modo escuro.',
        faq: [
            { question: 'O Screenshots tem link para compartilhar?', answer: 'Não. Nada sai do Mac: a captura é copiada, salva ou arrastada para o e-mail ou o chat. Quem precisa de link pronto encontra isso no CleanShot X.' },
            { question: 'Os atalhos pedem permissão de Acessibilidade?', answer: 'Não. Os atalhos são registrados de um jeito que não pede Acessibilidade. A única permissão é a de Gravação de Tela, que a janela de boas-vindas ajuda a ligar.' },
            { question: 'Grava o microfone?', answer: 'Grava, a partir do macOS 15. O som do computador funciona a partir do macOS 14.' },
        ],
        sources: {
            note: `Preços, requisitos e recursos do CleanShot X conferidos na página oficial de preços em ${CHECKED}. Do Screenshots, o código e o README no GitHub. O CleanShot X é um produto dos seus criadores; o Screenshots não tem ligação com ele.`,
            links: [
                { label: 'cleanshot.com/pricing', href: 'https://cleanshot.com/pricing' },
                { label: 'github.com/ciro-maciel/screenshots', href: 'https://github.com/ciro-maciel/screenshots' },
            ],
        },
    },
    {
        slug: 'shottr',
        app: 'screenshots',
        competitor: 'Shottr',
        title: 'Uma alternativa grátis e de código aberto ao Shottr para Mac',
        description: 'O Screenshots captura com rolagem, tira o texto da tela e grava em MP4 ou GIF, grátis também no trabalho e com o código aberto. Lado a lado com o Shottr.',
        lead: 'O Shottr é leve e rápido, e cobra licença para uso comercial. O Screenshots faz captura com rolagem, texto da tela e anotação de graça para qualquer uso, e ainda grava a tela.',
        card: 'Captura com rolagem, texto da tela e gravação, grátis também no trabalho.',
        forWhom: 'Para quem usa capturas no trabalho e não quer uma licença por pessoa, e para quem precisa gravar a tela além de capturar. Também para quem quer ler o código do app que vê a tela inteira.',
        ourApp: 'O Screenshots captura área, janela, tela inteira e páginas longas com rolagem, que ele costura sem repetir cabeçalho e rodapé fixos. Reconhece o texto de uma área no próprio Mac e copia. Grava a tela em MP4 ou GIF, anota com 13 ferramentas e fixa a imagem por cima das janelas. Não tem código de rede.',
        compare: [
            { name: 'Custo', ours: screenshotsOurs.cost, theirs: 'Grátis para usar, com pedido de upgrade depois de 30 dias. Uso comercial pede a licença Basic, US$ 12 uma vez' },
            { name: 'Código aberto', ours: screenshotsOurs.open, theirs: 'O site não diz que é' },
            { name: 'Onde roda', ours: screenshotsOurs.runs, theirs: 'macOS 10.15 ou mais novo, otimizado para Apple Silicon' },
            { name: 'O que sai do Mac', ours: screenshotsOurs.leaves, theirs: 'Envio opcional, que precisa ser ativado, inclusive para armazenamento compatível com S3. Usa a internet para validar a licença' },
            { name: 'O que faz', ours: 'Captura, rolagem, texto da tela, gravação em MP4 e GIF, editor e fixar na tela', theirs: 'Captura, rolagem, texto e QR code, pixelar e apagar partes, fixar na tela e régua' },
        ],
        better: 'O Shottr roda a partir do macOS 10.15, lê QR code e tem uma régua para medir a tela, coisas que o Screenshots não tem. Para quem quer subir a captura para um bucket próprio, o envio dele aceita armazenamento compatível com S3.',
        faq: [
            { question: 'Posso usar o Screenshots na empresa?', answer: 'Pode. A licença MIT permite uso comercial, sem pagar e sem registrar.' },
            { question: 'Ele lê o texto de uma imagem?', answer: 'Lê. O atalho de texto da tela reconhece o texto de uma área com o Vision da Apple, no próprio Mac, e copia para a área de transferência.' },
            { question: 'Grava a tela também?', answer: 'Grava em MP4, com som do computador e microfone opcionais, cliques visíveis e contagem de 3 segundos. O GIF sai do vídeo.' },
        ],
        sources: {
            note: `Preços, requisitos e recursos do Shottr conferidos no site oficial e na página de compra em ${CHECKED}. Do Screenshots, o código e o README no GitHub.`,
            links: [
                { label: 'shottr.cc', href: 'https://shottr.cc' },
                { label: 'shottr.cc/purchase.html', href: 'https://shottr.cc/purchase.html' },
                { label: 'github.com/ciro-maciel/screenshots', href: 'https://github.com/ciro-maciel/screenshots' },
            ],
        },
    },

    // ─── Windows ─────────────────────────────────────────────────────────
    {
        slug: 'rectangle',
        app: 'windows',
        competitor: 'Rectangle',
        title: 'Uma alternativa grátis e de código aberto ao Rectangle para Mac',
        description: 'O Windows encaixa as janelas do Mac por atalho ou levando até a borda, com o código aberto e menor de propósito. Lado a lado com o Rectangle.',
        lead: 'O Rectangle já é grátis e aberto. O Windows existe para quem quer menos: as posições do dia a dia, tamanhos seus e uma conferência de atalhos repetidos, num app pequeno.',
        card: 'Menor de propósito, com tamanhos seus e conferência de atalhos repetidos.',
        forWhom: 'Para quem usa poucas posições de janela, metades, tela inteira, centro e a outra tela, e quer cada uma num atalho que não brigue com o resto do Mac. Também para quem quer tamanhos próprios com prévia ao vivo.',
        ourApp: 'O Windows põe a janela da frente em metades, tela inteira, no centro, na próxima tela ou de volta ao lugar de antes, e deixa criar tamanhos seus numa grade 3 × 3, com atalho. Levar a janela até uma borda ou um canto também encaixa. Ao gravar um atalho, ele confere quem mais usa a combinação: o macOS, os menus dos apps abertos e outros gerenciadores de janelas.',
        compare: [
            { name: 'Custo', ours: windowsOurs.cost, theirs: 'Grátis. O Rectangle Pro é pago, com 10 dias de teste' },
            { name: 'Código aberto', ours: windowsOurs.open, theirs: 'Sim, o código está no GitHub. O Pro é fechado' },
            { name: 'Onde roda', ours: windowsOurs.runs, theirs: 'O site diz macOS 10.15 ou mais novo, Intel e Apple Silicon; o README atual pede macOS 14 e mantém versões antigas' },
            { name: 'O que sai do Mac', ours: windowsOurs.leaves, theirs: 'Sem conta. O Pro sincroniza os ajustes pelo iCloud' },
            { name: 'O que faz', ours: 'Metades, tela inteira, centro, próxima tela, desfazer, tamanhos seus e arrastar até a borda', theirs: 'Atalhos e áreas de encaixe, com muito mais posições' },
        ],
        better: 'O Rectangle faz mais e roda em mais Macs: tem muito mais posições, funciona em Mac com Intel e mantém versões para macOS antigos, do 10.13 em diante. O Rectangle Pro soma posições personalizadas, layouts de área de trabalho e ações entre Spaces. O Windows deixa de fora de propósito terços, ciclos de tamanho, espaço entre janelas, layouts salvos e sincronização pelo iCloud.',
        faq: [
            { question: 'Posso usar o Windows junto com o Rectangle?', answer: 'Pode. O Windows reconhece o Rectangle, o Rectangle Pro, o Magnet e outros gerenciadores abertos, avisa no menu e nos Ajustes, e retoma os atalhos assim que o outro fecha.' },
            { question: 'Ele tem terços da tela?', answer: 'Não vem com terços. Você pode criar um tamanho seu com um terço da largura, numa posição da grade e com atalho.' },
            { question: 'Por que ele pede Acessibilidade?', answer: 'É a permissão que o macOS exige para um app mover as janelas de outros apps. O Windows mostra o pedido do sistema e percebe sozinho quando ela foi ligada.' },
        ],
        sources: {
            note: `Rectangle e Rectangle Pro conferidos no site oficial e no repositório do GitHub em ${CHECKED}. O preço do Rectangle Pro não aparece sem JavaScript, por isso fica de fora. Do Windows, o código e o README no GitHub.`,
            links: [
                { label: 'rectangleapp.com', href: 'https://rectangleapp.com' },
                { label: 'rectangleapp.com/pro', href: 'https://rectangleapp.com/pro' },
                { label: 'github.com/rxhanson/Rectangle', href: 'https://github.com/rxhanson/Rectangle' },
                { label: 'github.com/ciro-maciel/windows', href: 'https://github.com/ciro-maciel/windows' },
            ],
        },
    },
    {
        slug: 'magnet',
        app: 'windows',
        competitor: 'Magnet',
        title: 'Uma alternativa grátis e de código aberto ao Magnet para Mac',
        description: 'O Windows encaixa as janelas do Mac por atalho ou levando até a borda, de graça, com o código aberto e em português. Lado a lado com o Magnet.',
        lead: 'O Magnet custa pouco e está na Mac App Store. O Windows faz o mesmo trabalho de graça, com o código aberto e a interface em português do Brasil.',
        card: 'Encaixar janelas de graça, em português, com tamanhos seus.',
        forWhom: 'Para quem quer janelas lado a lado com um atalho ou arrastando até a borda, sem comprar app, e prefere a interface em português.',
        ourApp: 'O Windows põe a janela da frente em metades, tela inteira, no centro, na próxima tela ou de volta ao lugar de antes. Levar a janela até uma borda faz metade; até um canto, um quarto, com um contorno mostrando onde ela vai parar. Tamanhos seus têm nome, posição numa grade 3 × 3, tela e atalho. Fica só na barra de menus.',
        compare: [
            { name: 'Custo', ours: windowsOurs.cost, theirs: 'US$ 4,99, uma vez, sem compras dentro do app' },
            { name: 'Código aberto', ours: windowsOurs.open, theirs: 'Não' },
            { name: 'Onde roda', ours: windowsOurs.runs, theirs: 'Só Mac, macOS 13 ou mais novo' },
            { name: 'O que sai do Mac', ours: windowsOurs.leaves, theirs: 'Sincronização opcional pelo iCloud' },
            { name: 'Idioma', ours: 'Inglês e português do Brasil', theirs: 'Só inglês' },
        ],
        better: 'O Magnet está na Mac App Store, que cuida da instalação e das atualizações, e roda a partir do macOS 13. Ele traz layouts próprios, suporte a monitores na vertical e sincroniza os ajustes pelo iCloud, coisas que o Windows não faz.',
        faq: [
            { question: 'O Windows está na Mac App Store?', answer: 'Não. Ele se baixa pela página dele ou pelo GitHub, assinado com Developer ID e notarizado pela Apple, então o macOS abre sem aviso.' },
            { question: 'Os atalhos são os mesmos do Magnet?', answer: 'Não. Os de fábrica usam Control e Option com as setas, e todos podem ser trocados nos Ajustes. Se a combinação já for de outro app, o Windows avisa.' },
            { question: 'Ele usa a internet?', answer: 'Não. O Windows não tem código de rede: os atalhos e os tamanhos ficam nos ajustes do app, neste Mac.' },
        ],
        sources: {
            note: `Preço, requisitos, idioma e recursos do Magnet conferidos na Mac App Store em ${CHECKED}. Do Windows, o código e o README no GitHub.`,
            links: [
                { label: 'Magnet na Mac App Store', href: 'https://apps.apple.com/us/app/magnet/id441258766' },
                { label: 'github.com/ciro-maciel/windows', href: 'https://github.com/ciro-maciel/windows' },
            ],
        },
    },

    // ─── Speech to Text ──────────────────────────────────────────────────
    {
        slug: 'superwhisper',
        app: 'speech-to-text',
        competitor: 'Superwhisper',
        title: 'Uma alternativa grátis e de código aberto ao Superwhisper para Mac',
        description: 'O Speech to Text dita em qualquer app do Mac com o Parakeet, da NVIDIA, rodando no computador, sem cota e com o código aberto. Lado a lado com o Superwhisper.',
        lead: 'O Superwhisper tem um plano grátis com modelos locais e um Pro pago com modelos na nuvem. O Speech to Text fica do lado local: todo o ditado roda no Mac, de graça e com o código aberto.',
        card: 'Ditado local no Mac, grátis e aberto, com glossário e tradução opcional.',
        forWhom: 'Para quem dita e-mails, mensagens e pedidos ao terminal o dia inteiro e quer que a voz não saia do computador. Também para quem quer ler o código do app que escuta o microfone.',
        ourApp: 'Aperte Cmd + Shift + Espaço, fale e aperte de novo: o texto entra onde está o cursor, com pontuação. A transcrição roda no Mac com o Parakeet, da NVIDIA, no Neural Engine, em cerca de 80 MB de memória. Há glossário para nomes e siglas, histórico só de texto e, se quiser, refinar ou traduzir o ditado com a sua própria chave.',
        compare: [
            { name: 'Custo', ours: sttOurs.cost, theirs: 'Plano grátis com ditado e modelos Whisper locais. Pro: US$ 8,49 por mês no plano mensal' },
            { name: 'Código aberto', ours: sttOurs.open, theirs: 'Não' },
            { name: 'Onde roda', ours: sttOurs.runs, theirs: 'Mac, Windows, iOS e Android' },
            { name: 'O que sai do Mac', ours: sttOurs.leaves, theirs: 'Com modelos locais, nada sai do aparelho. O Pro soma modelos na nuvem' },
            { name: 'O que faz', ours: 'Ditado em qualquer app, em português, inglês e outros idiomas europeus, glossário e refinar ou traduzir opcional', theirs: 'Ditado em qualquer app, modos de escrita, reuniões, arquivos de áudio e vídeo no Pro e mais de 100 idiomas' },
        ],
        better: 'O Superwhisper faz mais do que ditar: tem modos que reescrevem o texto como mensagem, e-mail ou texto formal, transcreve reuniões e, no Pro, arquivos de áudio e vídeo. Roda também no Windows, no iPhone e no Android, e fala de mais de 100 idiomas. O Speech to Text é só o ditado, em idiomas europeus, no Mac.',
        faq: [
            { question: 'Tem limite de palavras ou minutos?', answer: 'Não. Como a transcrição roda no seu Mac, não há cota, conta nem plano.' },
            { question: 'Funciona sem internet?', answer: 'Depois de baixar o modelo, sim. A internet só é usada para baixar o modelo, uma vez, e, se você ligar, refinar ou traduzir o texto.' },
            { question: 'Ele entende português?', answer: 'Entende português, inglês, espanhol, francês, alemão, italiano e russo; você escolhe o idioma falado nos ajustes. A interface é em português do Brasil ou em inglês, conforme o Mac.' },
        ],
        sources: {
            note: `Planos, sistemas e recursos do Superwhisper conferidos no site oficial e na documentação em ${CHECKED}. Do Speech to Text, o código e o README no GitHub.`,
            links: [
                { label: 'superwhisper.com', href: 'https://superwhisper.com' },
                { label: 'superwhisper.com/docs', href: 'https://superwhisper.com/docs' },
                { label: 'github.com/ciro-maciel/speech-to-text', href: 'https://github.com/ciro-maciel/speech-to-text' },
            ],
        },
    },
    {
        slug: 'wispr-flow',
        app: 'speech-to-text',
        competitor: 'Wispr Flow',
        title: 'Uma alternativa grátis e de código aberto ao Wispr Flow para Mac',
        description: 'O Speech to Text dita em qualquer app do Mac sem mandar a voz para a nuvem e sem limite semanal, com o código aberto. Lado a lado com o Wispr Flow.',
        lead: 'No Wispr Flow, a transcrição sempre acontece na nuvem, e o plano grátis tem 2.000 palavras por semana. O Speech to Text transcreve no seu Mac, sem limite.',
        card: 'Ditado sem nuvem e sem limite semanal de palavras.',
        forWhom: 'Para quem dita mais do que um plano grátis aguenta, ou não pode mandar a voz para um servidor: conversas de cliente, dados de saúde, código da empresa.',
        ourApp: 'O Speech to Text cola o texto onde está o cursor, em qualquer app, terminal incluído. A voz vira texto no Mac com o Parakeet e é descartada. O glossário escreve nomes e siglas do seu jeito, e o histórico guarda só texto, por 7 ou 30 dias, ou só na memória.',
        compare: [
            { name: 'Custo', ours: sttOurs.cost, theirs: 'Grátis até 2.000 palavras por semana no computador. Pro: US$ 12 por pessoa por mês no plano anual, ou US$ 15 no mensal' },
            { name: 'Código aberto', ours: sttOurs.open, theirs: 'Não' },
            { name: 'Onde roda', ours: sttOurs.runs, theirs: 'Mac, Windows, iOS e Android' },
            { name: 'O que sai do Mac', ours: sttOurs.leaves, theirs: 'O áudio: a transcrição sempre acontece na nuvem' },
            { name: 'O que faz', ours: 'Ditado em qualquer app, glossário, histórico e refinar ou traduzir opcional', theirs: 'Ditado em qualquer app, dicionário pessoal, contexto e remoção de hesitações' },
        ],
        better: 'O Wispr Flow está no Mac, no Windows, no iPhone e no Android, então o mesmo ditado acompanha a pessoa em todo aparelho. Ele já tira as hesitações e usa o contexto do app, sem você configurar chave nenhuma, e anuncia mais de 100 idiomas. A empresa declara as certificações SOC 2 Tipo II e ISO 27001.',
        faq: [
            { question: 'A minha voz vai para algum servidor?', answer: 'Não. O áudio vira texto no seu Mac e é descartado. Só o texto pode sair, e só se você ligar o refinamento ou a tradução, com a sua chave do OpenRouter.' },
            { question: 'Ele tira os "é" e "hum" do ditado?', answer: 'Com o refinamento opcional ligado, sim: ele limpa as hesitações usando o modelo que você escolher, pela sua chave. Sem ele, o texto sai como o Parakeet transcreveu.' },
            { question: 'Funciona no Windows?', answer: 'Não. Desde a versão 2.0 o app é nativo do Mac, feito em Swift, para Apple Silicon.' },
        ],
        sources: {
            note: `Planos, sistemas e onde a transcrição acontece no Wispr Flow conferidos nas páginas oficiais de preço e de controle de dados em ${CHECKED}. Do Speech to Text, o código e o README no GitHub.`,
            links: [
                { label: 'wisprflow.ai/pricing', href: 'https://wisprflow.ai/pricing' },
                { label: 'wisprflow.ai/data-controls', href: 'https://wisprflow.ai/data-controls' },
                { label: 'github.com/ciro-maciel/speech-to-text', href: 'https://github.com/ciro-maciel/speech-to-text' },
            ],
        },
    },
    {
        slug: 'macwhisper',
        app: 'speech-to-text',
        competitor: 'MacWhisper',
        title: 'Uma alternativa grátis e de código aberto ao MacWhisper para Mac',
        description: 'O Speech to Text dita em qualquer app do Mac com o Parakeet, da NVIDIA, de graça e com o código aberto. Lado a lado com o MacWhisper, que transcreve arquivos.',
        lead: 'O MacWhisper e o Speech to Text transcrevem no Mac. A diferença é o trabalho: o MacWhisper transcreve arquivos e reuniões; o Speech to Text dita onde está o cursor.',
        card: 'Transcrição local para ditar onde está o cursor, sem licença Pro.',
        forWhom: 'Para quem quer falar em vez de digitar, em qualquer app, e não precisa transcrever gravações. Se o seu trabalho é transcrever entrevistas e reuniões gravadas, o MacWhisper é a ferramenta certa.',
        ourApp: 'O Speech to Text é um app de barra de menus: um atalho começa a ouvir, outro cola o texto no cursor, outro cola de novo a última transcrição. O Parakeet, da NVIDIA, fica carregado no Neural Engine, em cerca de 80 MB, para a primeira palavra não esperar, e não cola nada quando só ouve silêncio. Tudo de graça, sem versão Pro.',
        compare: [
            { name: 'Custo', ours: sttOurs.cost, theirs: 'Versão grátis. Pro: € 65, uma vez, sem assinatura, para uso pessoal' },
            { name: 'Código aberto', ours: sttOurs.open, theirs: 'Não; usa o whisper.cpp, que é aberto' },
            { name: 'Onde roda', ours: sttOurs.runs, theirs: 'Mac com macOS 14 ou mais novo, com versões antigas para sistemas anteriores. Apple Silicon e Intel' },
            { name: 'O que sai do Mac', ours: sttOurs.leaves, theirs: 'Nada: toda a transcrição acontece no aparelho' },
            { name: 'O que faz', ours: 'Ditado por atalho em qualquer app', theirs: 'Transcrição de arquivos de áudio e vídeo e de reuniões, em 100 idiomas' },
        ],
        better: 'O MacWhisper transcreve arquivos de áudio e vídeo e reuniões do Zoom e do Teams, que o Speech to Text não faz. Ele também roda em Mac com Intel e fala de 100 idiomas.',
        faq: [
            { question: 'O Speech to Text transcreve um arquivo de áudio?', answer: 'Não. Ele transcreve o que você fala na hora, para colar no cursor. Para gravações, use um app de transcrição de arquivos.' },
            { question: 'Qual modelo ele usa?', answer: 'O Parakeet, da NVIDIA, no Neural Engine do Mac. O app baixa o modelo do Hugging Face uma vez, 643 MB.' },
            { question: 'Ele funciona em Mac com Intel?', answer: 'Não. O app é só para Mac com Apple Silicon e macOS 14 ou mais novo.' },
        ],
        sources: {
            note: `Preço, requisitos e recursos do MacWhisper conferidos na página oficial do app em ${CHECKED}; ela mostra o preço em euro. Do Speech to Text, o código e o README no GitHub.`,
            links: [
                { label: 'MacWhisper, página oficial', href: 'https://goodsnooze.gumroad.com/l/macwhisper' },
                { label: 'github.com/ciro-maciel/speech-to-text', href: 'https://github.com/ciro-maciel/speech-to-text' },
            ],
        },
    },

    // ─── Text to Speech ──────────────────────────────────────────────────
    {
        slug: 'speechify',
        app: 'text-to-speech',
        competitor: 'Speechify',
        title: 'Uma alternativa grátis e de código aberto ao Speechify para Mac',
        description: 'O Text to Speech lê em voz alta o texto que você seleciona em qualquer app do Mac, em português do Brasil, de graça. Lado a lado com o Speechify.',
        lead: 'Selecione um texto em qualquer app do Mac, aperte um atalho e ouça. O Text to Speech faz só isso, em português do Brasil, de graça e sem conta.',
        card: 'Ouvir o texto selecionado em qualquer app, em português do Brasil e sem conta.',
        forWhom: 'Para quem lê muito em português no Mac, e-mails, PDFs, artigos e documentos, e quer descansar os olhos ou revisar ouvindo. Atenção: a voz do Text to Speech fala português do Brasil; texto em outra língua sai com sotaque.',
        ourApp: 'Cmd + Shift + S lê o texto selecionado. Em menos de um segundo o Rafael, uma voz natural em português do Brasil, começa a ler. Um player pequeno flutua na tela, mostra a palavra que está sendo dita e some quando a leitura acaba. Sem conta e sem telemetria.',
        compare: [
            { name: 'Custo', ours: ttsOurs.cost, theirs: 'Grátis com 10 vozes robóticas, até 1,5x. Premium: US$ 29 por mês no plano mensal' },
            { name: 'Código aberto', ours: ttsOurs.open, theirs: 'Não' },
            { name: 'Onde roda', ours: ttsOurs.runs, theirs: 'Mac, Windows, iPhone, iPad, Android, Chrome, Edge e web' },
            { name: 'O que sai do Mac', ours: ttsOurs.leaves, theirs: 'A página do Mac pede para entrar na conta antes de usar' },
            { name: 'Idioma das vozes', ours: 'Só português do Brasil', theirs: 'Premium anuncia mais de 1.000 vozes e mais de 60 idiomas; a página do app de Mac fala em inglês com sotaque americano e britânico' },
        ],
        better: 'O Speechify está em quase todo lugar, do celular ao navegador, e o Premium anuncia mais de mil vozes em dezenas de idiomas. O app de Mac ainda traz ditado por voz. Se você lê em inglês ou em várias línguas, ele cobre o que o Text to Speech não cobre: as nossas vozes só falam português do Brasil.',
        faq: [
            { question: 'Ele lê texto em inglês?', answer: 'Lê, mas com sotaque: o Rafael fala português do Brasil.' },
            { question: 'Precisa de conta?', answer: 'Não. O app não tem conta, nem analytics, nem checagem de atualização.' },
            { question: 'O meu texto vai para algum servidor?', answer: 'Cada trecho do texto vai ao servidor da ferramenta, que o manda ao Fish Audio para gerar o áudio e não guarda o texto.' },
        ],
        sources: {
            note: `Planos, sistemas e vozes do Speechify conferidos nas páginas oficiais de preço e do app de Mac em ${CHECKED}. Do Text to Speech, o código e o README no GitHub.`,
            links: [
                { label: 'speechify.com/pricing', href: 'https://speechify.com/pricing/' },
                { label: 'speechify.com/mac', href: 'https://speechify.com/mac/' },
                { label: 'github.com/ciro-maciel/text-to-speech', href: 'https://github.com/ciro-maciel/text-to-speech' },
            ],
        },
    },
    {
        slug: 'naturalreader',
        app: 'text-to-speech',
        competitor: 'NaturalReader',
        title: 'Uma alternativa grátis e de código aberto ao NaturalReader para Mac',
        description: 'O NaturalReader não lista app de Mac. O Text to Speech lê em voz alta o texto selecionado em qualquer app do Mac, em português do Brasil e de graça.',
        lead: 'O NaturalReader funciona na web, no celular e no Chrome, mas o site não lista um app de Mac. O Text to Speech é um app de Mac: lê o texto selecionado em qualquer programa, não só no navegador.',
        card: 'Um app de Mac de verdade para ouvir o texto selecionado, em português do Brasil.',
        forWhom: 'Para quem quer ouvir textos fora do navegador, no Mail, num PDF, no editor de texto, sem copiar e colar numa página. E que lê em português: a voz fala português do Brasil.',
        ourApp: 'O Text to Speech mora na barra de menus. Selecione o texto, aperte Cmd + Shift + S, e ele lê em partes, em parágrafos inteiros sempre que dá. A primeira parte é curta e o áudio toca enquanto ainda chega, então a voz começa em menos de um segundo mesmo num texto longo. Espaço pausa, as setas voltam e avançam, menos e mais mudam a velocidade.',
        compare: [
            { name: 'Custo', ours: ttsOurs.cost, theirs: 'Tem um plano grátis para sempre. Os preços pagos não abriram na página oficial' },
            { name: 'Código aberto', ours: ttsOurs.open, theirs: 'Não' },
            { name: 'Onde roda', ours: ttsOurs.runs, theirs: 'Web, iOS, Android e extensão do Chrome. Sem app de Mac na página de downloads' },
            { name: 'O que sai do Mac', ours: ttsOurs.leaves, theirs: 'O app de celular tem um modo offline' },
            { name: 'Idioma das vozes', ours: 'Só português do Brasil', theirs: 'Vozes em mais de 90 idiomas' },
        ],
        better: 'O NaturalReader tem vozes em mais de 90 idiomas, exporta a leitura em MP3 e funciona no celular, inclusive sem internet no app. Se você lê em outras línguas ou quer levar o áudio para ouvir depois, ele faz o que o Text to Speech não faz.',
        faq: [
            { question: 'O Text to Speech salva o áudio em MP3?', answer: 'O app de Mac não: ele lê na hora. A ferramenta Texto em voz, no navegador, gera o MP3 de um texto colado.' },
            { question: 'Funciona sem internet?', answer: 'Não. A voz é o Rafael, gerado no servidor da ferramenta: ler precisa de internet.' },
            { question: 'Que permissão ele pede?', answer: 'Só a Acessibilidade: para ler a seleção, o app manda Cmd + C ao app da frente e depois devolve a sua área de transferência como estava.' },
        ],
        sources: {
            note: `Plataformas, plano grátis e idiomas do NaturalReader conferidos no site oficial e na página de downloads em ${CHECKED}. A página de preços não abriu, por isso os valores pagos ficam de fora. Do Text to Speech, o código e o README no GitHub.`,
            links: [
                { label: 'naturalreaders.com', href: 'https://www.naturalreaders.com' },
                { label: 'naturalreaders.com/appdownload.html', href: 'https://www.naturalreaders.com/appdownload.html' },
                { label: 'github.com/ciro-maciel/text-to-speech', href: 'https://github.com/ciro-maciel/text-to-speech' },
            ],
        },
    },

    // ─── Assistant ───────────────────────────────────────────────────────
    {
        slug: 'voicemode',
        app: 'voice-assistant',
        competitor: 'VoiceMode',
        title: 'Uma alternativa grátis e de código aberto ao VoiceMode para Mac',
        description: 'O Assistant conversa por voz com o Claude Code num app de barra de menus, com painel e confirmação falada. Lado a lado com o VoiceMode, também aberto.',
        lead: 'O VoiceMode e o Assistant fazem a mesma coisa: você fala com o Claude Code e ouve a resposta. Os dois são grátis e de código aberto. A diferença está em onde rodam e no que vem em volta.',
        card: 'Falar com o Claude Code num app de Mac, com painel e confirmação falada.',
        forWhom: 'Para quem trabalha com o Claude Code no Mac e quer pedir de longe do teclado: andando, desenhando, com as mãos ocupadas. E que quer ouvir antes de qualquer ação que não se desfaz.',
        ourApp: 'Diga "Assistant" e peça. A fala é transcrita no Mac por um Whisper local, o pedido vai para uma sessão do Claude Code aberta o dia todo e a resposta é falada frase por frase, enquanto chega. Push, deploy, publicar, mandar mensagem, apagar e pagar esperam o seu sim falado. Um painel no navegador mostra o que ele ouviu, o que ignorou e quanto custou cada resposta.',
        compare: [
            { name: 'Custo', ours: 'R$ 0. Usa o seu Claude Code', theirs: 'Grátis. Usa o seu Claude Code' },
            { name: 'Código aberto', ours: 'Sim, licença MIT', theirs: 'Sim, licença MIT' },
            { name: 'Onde roda', ours: 'Mac com Apple Silicon e macOS 14 ou mais novo, como app de barra de menus', theirs: 'macOS, Linux e Windows, como plugin do Claude Code' },
            { name: 'O que sai do Mac', ours: 'A voz fica no Mac. O texto dos pedidos vai à Anthropic pelo seu Claude Code; o das frases faladas, ao Fish Audio, só se você configurar', theirs: 'Pode rodar local, com Whisper e Kokoro, ou usar uma chave da OpenAI' },
            { name: 'O que faz', ours: 'Palavra de chamada, conversa contínua, confirmação falada antes de ações sensíveis e painel', theirs: 'Conversa por voz natural com o Claude Code' },
        ],
        better: 'O VoiceMode roda em macOS, Linux e Windows, e instala com um comando, como plugin do próprio Claude Code. Ele pode funcionar todo local, com Whisper para ouvir e Kokoro para falar, sem nenhuma chave. O Assistant é só para Mac com Apple Silicon e pede ferramentas do Homebrew instaladas antes; sem uma chave do Fish Audio, ele fala com a voz do próprio Mac.',
        faq: [
            { question: 'Preciso de assinatura do Claude?', answer: 'Precisa do Claude Code instalado e com login feito. O Assistant não cobra nada; o uso do Claude é o da sua conta.' },
            { question: 'Ele faz push ou deploy sozinho?', answer: 'Não. Ler, pesquisar e editar arquivos locais ele faz sem perguntar. Push, deploy, publicar, mandar mensagem a alguém, apagar e pagar esperam o seu sim falado naquela conversa, e a lista é sua para mudar.' },
            { question: 'Dá para interromper enquanto ele fala?', answer: 'Dá. Diga "Assistant" e ele para na hora e escuta. Com o app aberto, a voz dele é tirada do microfone, então funciona com o som saindo pelo alto-falante.' },
        ],
        sources: {
            note: `VoiceMode conferido no repositório oficial do GitHub em ${CHECKED}: licença, sistemas, vozes locais e instalação. Do Assistant, o código e o README no GitHub.`,
            links: [
                { label: 'github.com/mbailey/voicemode', href: 'https://github.com/mbailey/voicemode' },
                { label: 'github.com/ciro-maciel/voice-assistant', href: 'https://github.com/ciro-maciel/voice-assistant' },
            ],
        },
    },
]
