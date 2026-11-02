/**
 * The site's own privacy policy and terms, replacing the kit's generic ones
 * (LegalPrivacy / LegalTerms) on 29/09/2026.
 *
 * EVERY SENTENCE IS SOMETHING THE CODE DOES. The kit's texts promised HSM
 * keys, annual audits, a DPO and data export — none of it exists here, and
 * OpenAI's plugin review (the favicon generator in ChatGPT) checks that a
 * policy is followed. Each claim below was read in the code: the paths are
 * in tools/apps/generate-favicon/chatgpt/propostas-de-texto.md and in
 * the survey of 29/09/2026. Change a behavior, change the sentence.
 *
 * What the code does not tell (the platforms' own log retention) is said as
 * such, never as a number.
 *
 * Blocks: a string is a paragraph; an array is a bullet list.
 */
import { SITE } from './site'

export const LEGAL_UPDATED = '8 de outubro de 2026'

export const PRIVACY = {
    title: 'Privacidade',
    // The contact form section (13/10/2026); the terms keep LEGAL_UPDATED.
    updated: '14 de outubro de 2026',
    subtitle: `Como ${SITE.url.replace('https://', '')}, as ferramentas e os assistentes de IA tratam os seus dados`,
    intro: [
        'Esta política diz o que acontece com os seus dados quando você visita este site, usa as ferramentas gratuitas, usa as ferramentas pelo seu assistente de IA (como o Gerador de favicon no ChatGPT) ou entra numa ferramenta com conta. Ela descreve o que o código faz, sem promessa a mais.',
        `O responsável é ${SITE.name}, por meio da pessoa jurídica ${SITE.legalEntity}, controladora dos dados para a LGPD (Lei nº 13.709/2018).`,
    ],
    sections: [
        {
            icon: 'eye',
            title: 'Visitas a este site',
            body: [
                'Medimos as visitas com uma ferramenta de análise própria, sem cookie. Se o seu navegador pede para não ser rastreado (Do Not Track), a visita não é contada.',
                'Cada visita guarda: a página, o título, de onde você veio, a campanha do link (se houver), o país, o tipo de aparelho e a família do navegador e do sistema. O seu endereço IP e o seu navegador entram num código calculado com uma chave secreta e a data do dia: não guardamos o IP, não dá para recuperá-lo, e o código muda todo dia.',
                'Esses registros são apagados automaticamente depois de 90 dias. Contagens somadas por dia, que não identificam ninguém, ficam para os gráficos.',
                'As fontes do site são carregadas do Google Fonts, e o Google recebe o seu endereço IP ao entregá-las.',
            ],
        },
        {
            icon: 'message',
            title: 'Formulário de contato',
            body: [
                'A página de contato tem um formulário. Ele roda no Forms, o produto de formulários da linha Marketing, hospedado na Cloudflare, instalado aqui como qualquer cliente instala.',
                'Quando você envia, guardamos o que escreveu (nome, e-mail e, se preencheu, o que quer resolver), a página de onde enviou, a campanha do link (se houver), o navegador declarado e o seu endereço IP transformado num código com uma chave secreta, com só o começo do endereço à mostra. O IP inteiro não é guardado.',
                'O nome e o e-mail servem para responder a você. A caixa de novidades por e-mail é opcional e nunca vem marcada; se você marcar, guardamos a prova: o texto que você viu, a versão dele e a hora.',
                'Contra robôs, um envio rápido demais ou repetido demais é barrado e guardado por 30 dias, para uma pessoa conferir se era gente.',
                'O que você enviou fica guardado até você pedir para apagar. A exclusão é feita por uma pessoa e tira a resposta e a prova do consentimento; fica só um registro sem nada que identifique você.',
            ],
        },
        {
            icon: 'mail',
            title: 'Cartas por e-mail',
            body: [
                'A página inicial, a de ferramentas e a de livros têm uma caixa para receber as Cartas do Ciro. Ela roda no Newsletter, o produto de cartas da linha Marketing, hospedado na Cloudflare, instalado aqui como qualquer cliente instala. As cartas saem pelo Messages, o produto de e-mail do Infrastructure, sobre a Amazon SES.',
                'Quando você assina, guardamos o seu e-mail e a prova do consentimento: o texto que você marcou, a versão dele, a página e as horas do pedido e da confirmação, e o seu endereço IP transformado num código com uma chave secreta. A caixa nunca vem marcada, e você só passa a receber depois de confirmar pelo e-mail que chega na hora.',
                'Em cada carta, contamos quem clica nos links. A abertura não é medida.',
                'Toda carta traz o link para sair na hora, sem login. Para apagar o seu e-mail e a prova do consentimento, fale comigo pelo WhatsApp.',
            ],
        },
        {
            icon: 'tools',
            title: 'Ferramentas gratuitas, sem conta',
            body: [
                'Algumas funcionam só no seu navegador, e o que você faz nelas não sai da sua máquina:',
                [
                    'Gerador de senha e Comparar fusos horários.',
                    'Remover fundo: o modelo de IA é baixado do CDN da IMG.LY; a imagem não sai do navegador.',
                    'Gerador de favicon no site: o desenho e os arquivos são montados no navegador, e a imagem que você envia fica nele. As fontes e os emojis vêm do jsDelivr.',
                    'Explorar S3: o navegador fala direto com a Amazon S3. As suas chaves só assinam os pedidos e ficam guardadas neste navegador apenas se você marcar "Lembrar".',
                    'Pomodoro (extensão do Chrome): tudo fica no armazenamento da própria extensão.',
                ],
                'Outras usam o nosso servidor (manager.ciromaciel.click), que processa o pedido e não guarda o conteúdo:',
                [
                    'Data to Chart (Dados em gráfico): a tabela e os conteúdos dos gráficos e carrosséis, conforme a seção abaixo.',
                    'Página em Markdown: o endereço que você informa; o servidor busca as páginas desse site.',
                    'Texto em voz: o texto vai à Microsoft (vozes do Edge) para virar áudio. Se você usa "Preparar para leitura", o texto vai antes à OpenRouter, para um modelo de IA ajustá-lo.',
                ],
                'Para evitar abuso, o servidor conta as chamadas por endereço IP. Essa contagem fica só na memória e some em cerca de um minuto.',
                'Transcrever voz (aplicativo de computador) transcreve no seu próprio computador. Refinar e traduzir usam a OpenRouter com a chave que você mesmo configura.',
            ],
        },
        {
            icon: 'tools',
            title: 'Data to Chart: gráficos e carrosséis',
            body: [
                'O Data to Chart é gratuito e não pede conta. Para desenhar e exportar, o nosso servidor recebe a tabela e os conteúdos do projeto, como títulos, textos dos slides, fonte dos dados, nome do autor e legenda. Esses conteúdos são processados para gerar as prévias e os arquivos; o serviço não mantém projetos salvos.',
                'Arquivos CSV, TSV e JSON escolhidos no editor são lidos no navegador para preencher o projeto. Ao desenhar e exportar, o conteúdo necessário segue ao servidor. O projeto JSON que você salva fica no destino de download escolhido por você; ele pode ser reaberto no editor.',
                'No editor dentro de um assistente de IA, as ferramentas recebem o projeto e podem devolver o estado editado ao assistente para continuar a conversa. Quem oferece o assistente trata esses dados conforme a própria política. As métricas das chamadas ao MCP são descritas na próxima seção.',
                'Links de cópia editável incluem o projeto no fragmento do endereço, depois de #. Essa parte não vai na requisição da página, mas qualquer pessoa que receba o link pode ler e editar uma cópia dos dados. Compartilhar o JSON também entrega os conteúdos do projeto a quem receber o arquivo.',
                'Links de imagem PNG ou SVG e alguns links alternativos de download levam os dados nos parâmetros do endereço. Esses endereços podem aparecer no histórico do navegador e nos registros técnicos dos provedores. O fluxo normal de prévia e exportação usa pedidos POST ou arquivos entregues pelo assistente. Não compartilhe links ou arquivos com informações que não pode divulgar.',
            ],
        },
        {
            icon: 'tools',
            title: 'Mind Maps Generator: mapas mentais',
            body: [
                'O Mind Maps Generator é gratuito e não pede conta. No site, tópicos e arquivos JSON ou .mind importados são processados no navegador. O último mapa fica no armazenamento local deste navegador até você substituí-lo ou limpar os dados do site. Para guardar ou transferir uma cópia, baixe o projeto JSON.',
                'Pelo assistente de IA, o servidor MCP recebe o texto com tópicos ou o projeto fornecido para validar e organizar o mapa; não mantém projetos salvos. O editor pode devolver o estado editado ao assistente para continuar a conversa. Esses dados ficam sujeitos também à política e aos controles do provedor do assistente. As métricas das chamadas são descritas na seção seguinte e não contêm os tópicos.',
                'PNG, SVG, PDF e JSON são gerados no editor. Quando o assistente não permite baixar diretamente, você pode abrir o mesmo mapa no site para exportar. Os links de cópia contêm o mapa completo no fragmento depois de #, que não vai na requisição da página; quem receber o link poderá ler e editar uma cópia. Não compartilhe informações confidenciais por links ou arquivos.',
            ],
        },
        {
            icon: 'plug',
            title: 'Pelo seu assistente de IA (MCP e ChatGPT)',
            body: [
                'As ferramentas também respondem a assistentes de IA, pelo servidor mcp.tools.ciromaciel.click, e o Gerador de favicon está no ChatGPT. Não há login.',
                'A cada chamada registramos: a ferramenta, o nome do aplicativo que chamou, a versão do protocolo, o código do erro (se houve), uma faixa de tempo de resposta, o dia e um código de sessão. O código de sessão vem do seu endereço IP, transformado duas vezes com uma chave secreta e a data do dia: não guardamos o IP, e o código muda todo dia. O que você pediu (letras, cores, textos, endereços) não entra nesse registro. Os registros são apagados depois de 90 dias.',
                'No Texto em voz pelo assistente, o áudio fica num endereço público de blob.ciromaciel.click, para o assistente poder entregar, e é apagado em 7 dias.',
                'No Gerador de favicon do ChatGPT, a imagem que você escolhe é lida só dentro do editor, no seu aparelho: não vai ao nosso servidor nem ao assistente.',
                'O que você escreve para o assistente é tratado por quem o oferece (como a OpenAI), conforme a política dele.',
            ],
        },
        {
            icon: 'user',
            title: 'Ferramentas com conta',
            body: [
                'History, Feeds e Acompanhar notícias pedem conta. Você entra com um código enviado ao seu e-mail, pelo nosso serviço de login. As ferramentas recebem da conta o seu identificador, o e-mail e o nome.',
                [
                    'History: guarda as páginas que você lê (endereço, título e texto), suas notas, visitas e buscas, e transcrições de vídeos do YouTube. A extensão lê as páginas http e https que você abre e envia só ao nosso servidor. Não guarda abas anônimas, sites de e-mail e de banco, páginas de login e de pagamento, nem textos com cara de senha ou chave.',
                    'Feeds: guarda os perfis que você acompanha e os posts deles (até 180 dias, ao menos os 60 mais recentes e os 50 melhores), com números e resumos. A extensão só envia perfis que você segue ou o seu próprio, com você logado na rede. Legendas, números e capas vão à OpenRouter (modelo DeepSeek) para os resumos.',
                    'Acompanhar notícias: guarda o seu e-mail e os seus temas. Os termos dos temas são buscados no Google Notícias, no Hacker News, no Reddit e no YouTube, e os resumos passam pela OpenRouter (DeepSeek). O resumo diário é enviado por e-mail pela Amazon SES, e cada e-mail traz o link para parar de receber.',
                ],
                'Esses dados ficam guardados enquanto a conta existir, até você apagá-los.',
            ],
        },
        {
            icon: 'card',
            title: 'Pagamentos',
            body: ['Os planos pagos do History são cobrados pela Stripe. Passamos a ela o seu identificador e o seu e-mail; os dados do cartão ficam só com a Stripe, e não temos acesso a eles.'],
        },
        {
            icon: 'share',
            title: 'Quem recebe os dados',
            body: [
                'Não vendemos, alugamos nem repassamos dados para publicidade. Recebem dados só os serviços que fazem as ferramentas funcionarem, cada um na sua parte:',
                [
                    'Cloudflare: hospeda o login, o servidor MCP, a análise de visitas, o formulário de contato, as cartas e os arquivos, e envia o e-mail com o código de entrada.',
                    'Fly.io: hospeda o servidor das ferramentas e o armazenamento das contas.',
                    'Google Fonts, jsDelivr, IMG.LY e Hugging Face: entregam fontes, emojis e modelos de IA ao seu navegador ou aplicativo.',
                    'Microsoft: gera as vozes do Texto em voz.',
                    'OpenRouter e os modelos que ela serve (Google Gemini, DeepSeek): o texto e as legendas enviados para a IA.',
                    'Amazon SES: envia os resumos do Acompanhar notícias e as Cartas do Ciro.',
                    'Stripe: cobra os planos pagos.',
                ],
                'Essas plataformas guardam os próprios registros técnicos (por exemplo, logs de acesso), pelo prazo das políticas delas. Não temos esse prazo em nosso controle.',
            ],
        },
        {
            icon: 'clock',
            title: 'Por quanto tempo',
            body: [
                [
                    'Visitas ao site e chamadas pelo assistente: 90 dias, apagados automaticamente.',
                    'Mensagens do formulário de contato: até você pedir para apagar. Envios barrados como robô: 30 dias.',
                    'Assinatura das cartas: o e-mail e a prova do consentimento ficam enquanto a lista existir, até você pedir para apagar; sair da lista para os envios na hora.',
                    'Áudio do Texto em voz pelo assistente: 7 dias.',
                    'Contagem de chamadas por IP: cerca de um minuto, só em memória.',
                    'Conteúdo das ferramentas sem conta: não é guardado.',
                    'Dados das ferramentas com conta: enquanto a conta existir, até você apagá-los.',
                ],
            ],
        },
        {
            icon: 'shield',
            title: 'Seus direitos e como pedir',
            body: [
                'A LGPD garante a você confirmar se tratamos seus dados, acessá-los, corrigi-los, levá-los para outro serviço e pedir que sejam apagados.',
                [
                    'No History e no Feeds, a sua conta tem "Exportar dados" e "Apagar tudo", que apagam os dados de verdade.',
                    'Para apagar a conta de login, os dados do Acompanhar notícias, o que você enviou pelo formulário de contato, a sua assinatura das cartas ou para qualquer outro pedido, fale comigo pelo WhatsApp (link abaixo). Quem responde é uma pessoa.',
                ],
                'Os registros de visitas e de chamadas não têm nada que identifique você: o código muda todo dia e não guardamos o IP. Por isso não há como achá-los por pessoa, e eles são apagados sozinhos em 90 dias.',
            ],
        },
    ],
}

export const TERMS = {
    title: 'Termos de uso',
    subtitle: `As condições para usar ${SITE.url.replace('https://', '')} e as ferramentas`,
    intro: [
        `Estes termos valem para este site, as ferramentas gratuitas, o servidor MCP (mcp.tools.ciromaciel.click) e os plugins para assistentes de IA, como o Gerador de favicon no ChatGPT. Quem oferece é ${SITE.name}, por meio de ${SITE.legalEntity}. Ao usar, você concorda com eles.`,
    ],
    sections: [
        {
            icon: 'tools',
            title: 'Ferramentas gratuitas',
            body: [
                'As ferramentas são gratuitas e a maioria não pede conta. Você pode usar o que elas geram, inclusive em projetos comerciais.',
                'O Data to Chart é gratuito, sem compras ou pagamentos, e cria gráficos e carrosséis a partir dos dados fornecidos. Ele não autentica fontes, não verifica afirmações, não garante alcance e não publica nas redes sociais. Revise os dados, os textos e as permissões de divulgação antes de compartilhar os arquivos ou links.',
                'O Mind Maps Generator organiza os tópicos fornecidos e permite editar e exportar mapas mentais. É gratuito, sem cadastro ou pagamentos. Não oferece colaboração em tempo real, acesso a contas de terceiros, agendamento ou publicação. Revise o conteúdo e as permissões antes de compartilhar um mapa.',
                'O que vem de terceiros segue a licença deles. As fontes do Google Fonts têm licença OFL, Apache ou UFL. Os emojis do Twemoji pedem o crédito "Twemoji" (CC-BY 4.0).',
            ],
        },
        {
            icon: 'user',
            title: 'Ferramentas com conta e planos pagos',
            body: [
                'History, Feeds e Acompanhar notícias pedem conta. Você é responsável pelo acesso ao seu e-mail, por onde chega o código de entrada.',
                'Os planos pagos do History são cobrados pela Stripe. A assinatura é gerenciada no portal da Stripe, aberto pelo próprio History.',
            ],
        },
        {
            icon: 'ban',
            title: 'O que não é permitido',
            body: [
                [
                    'Sobrecarregar o serviço, contornar os limites de uso ou automatizar chamadas em volume.',
                    'Usar as ferramentas para conteúdo ilegal ou que viole direitos de outras pessoas.',
                    'Usar a Página em Markdown ou os Feeds para coletar dados de sites ou perfis sem ter direito a isso.',
                ],
                'Quem desrespeitar pode ter o acesso bloqueado.',
            ],
        },
        {
            icon: 'scale',
            title: 'Sem garantia',
            body: [
                'As ferramentas são oferecidas como estão, sem garantia de funcionamento contínuo ou de resultado. Elas podem mudar, ganhar limites ou sair do ar.',
                'Na medida permitida pela lei, não respondemos por danos indiretos do uso. Nada aqui limita os seus direitos de consumidor garantidos pela lei brasileira.',
            ],
        },
        {
            icon: 'file',
            title: 'O que é nosso e o que é seu',
            body: ['O código, o desenho e os textos do site e das ferramentas são de Ciro Cesar Maciel. O que você cria e o que você envia continuam seus.'],
        },
        {
            icon: 'clock',
            title: 'Mudanças e lei aplicável',
            body: [
                'Estes termos podem mudar. A data da última mudança fica no fim desta página.',
                'Valem as leis do Brasil. Para dúvidas, fale comigo pelo WhatsApp (link abaixo).',
            ],
        },
    ],
}
