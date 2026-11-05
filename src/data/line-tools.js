/**
 * The free tools of each line (05/11/2026), listed on /tools so the search engines that already crawl
 * this site find them: the line sites are new, and Google had not visited one of their tool pages.
 * Name, address and the card sentence, as each line's /tools page publishes them; when a line adds a
 * tool, it goes here too. Only public text: no code of a line's repository comes here.
 */
export const LINE_TOOLS = [
    {
        line: 'Infrastructure',
        tools: [
            { name: 'Qual é o meu IP', url: 'https://myinfrastructure.click/tools/my-ip', text: 'O seu IP público, a localização aproximada e o provedor, na hora.' },
            { name: 'Meu site está fora do ar?', url: 'https://myinfrastructure.click/tools/is-it-down', text: 'Status, tempo de resposta, HTTPS e redirecionamentos de qualquer site, verificados de fora da sua rede.' },
            { name: 'Página de status grátis', url: 'https://myinfrastructure.click/tools/status-page', text: 'Até cinco endereços verificados agora e desenhados como uma página de status pública.' },
            { name: 'Verificar SPF, DKIM e DMARC', url: 'https://myinfrastructure.click/tools/email-dns-check', text: 'Os registros que decidem se o seu e-mail chega na caixa de entrada, lidos do DNS público e explicados.' },
            { name: 'Decodificar JWT', url: 'https://myinfrastructure.click/tools/jwt-decoder', text: 'Cabeçalho, payload e validade de um token, lidos no seu navegador. O token não sai da página.' },
            { name: 'Codificar e decodificar Base64', url: 'https://myinfrastructure.click/tools/base64', text: 'Texto para Base64 e de volta, com Base64url e acentos, no seu navegador.' },
            { name: 'Testar expressão cron', url: 'https://myinfrastructure.click/tools/cron-tester', text: 'O que uma expressão cron quer dizer e as próximas execuções, em UTC e em horário de Brasília.' },
            { name: 'Verificar propagação de DNS', url: 'https://myinfrastructure.click/tools/dns-propagation', text: 'O que a Cloudflare e o Google respondem hoje para o seu domínio, lado a lado.' },
            { name: 'Calculadora de taxa de cartão e Pix', url: 'https://myinfrastructure.click/tools/card-fee-calculator', text: 'Valor líquido de uma venda e o preço que cobre a taxa, no cartão e no Pix, com a taxa do seu provedor.' },
            { name: 'Validar e formatar JSON', url: 'https://myinfrastructure.click/tools/json-validator', text: 'Validação com linha e coluna do erro, formatação e os campos com o tipo de cada um, no navegador.' },
        ],
    },
    {
        line: 'Operations',
        tools: [
            { name: 'Gerador de link com UTM', url: 'https://myoperations.click/tools/utm-builder', text: 'Monte o link com utm_source, utm_medium e utm_campaign para saber qual post, e-mail ou anúncio trouxe a visita.' },
            { name: 'Tirar foto de um vídeo', url: 'https://myoperations.click/tools/video-frame', text: 'Pare o vídeo no segundo certo e baixe o quadro em JPG ou PNG, para capa, miniatura ou post. Mostra duração e resolução.' },
            { name: 'Gravar a tela', url: 'https://myoperations.click/tools/screen-recorder', text: 'Grave a tela inteira, uma janela ou uma aba, com o microfone, e baixe o vídeo. Sem instalar nada e sem conta.' },
            { name: 'Checklist online', url: 'https://myoperations.click/tools/checklist', text: 'Cole uma lista, um item por linha, e marque o que já fez. Fica salvo no navegador; copie ou imprima quando quiser.' },
            { name: 'Nome, descrição e regras para grupo', url: 'https://myoperations.click/tools/community-rules', text: 'Ideias de nome por tipo de grupo, a descrição e as regras prontas para colar no WhatsApp, Telegram ou Discord.' },
        ],
    },
    {
        line: 'Customers',
        tools: [
            { name: 'Gerador de link de WhatsApp', url: 'https://mycustomers.click/tools/whatsapp-link', text: 'O link wa.me com a mensagem já escrita e o QR code para imprimir, na hora.' },
            { name: 'QR Code do WhatsApp', url: 'https://mycustomers.click/tools/whatsapp-qr-code', text: 'O QR code que abre a sua conversa no WhatsApp, com a mensagem pronta, para imprimir em PNG ou SVG.' },
            { name: 'Limpar lista de contatos', url: 'https://mycustomers.click/tools/contact-list-cleaner', text: 'Telefones com +55 e DDD, o nono dígito de volta e os duplicados fora, numa planilha só.' },
        ],
    },
    {
        line: 'Marketing',
        tools: [
            { name: 'Contador de caracteres e palavras', url: 'https://mymarketing.click/tools/word-counter', text: 'Caracteres com e sem espaço, palavras, tempo de leitura e as frases longas do seu texto.' },
            { name: 'Página de link na bio', url: 'https://mymarketing.click/tools/link-in-bio', text: 'A página com os seus links, vista no celular e pronta para baixar.' },
            { name: 'Formulário de contato em HTML', url: 'https://mymarketing.click/tools/contact-form-generator', text: 'Os campos que você escolhe, o código HTML e CSS para colar no site.' },
            { name: 'Gerador de QR Code', url: 'https://mymarketing.click/tools/qr-code-generator', text: 'O QR Code do seu link, da rede Wi-Fi ou do seu Pix, em SVG e PNG.' },
            { name: 'Teste de assunto de e-mail', url: 'https://mymarketing.click/tools/subject-line-tester', text: 'Como o assunto aparece no celular, onde corta e o que atrapalha.' },
            { name: 'Texto em slides', url: 'https://mymarketing.click/tools/text-to-slides', text: 'Os slides do seu texto, para apresentar em tela cheia ou salvar em PDF.' },
            { name: 'Calculadora de preço de venda', url: 'https://mymarketing.click/tools/price-calculator', text: 'O preço de venda pela margem que você quer, com taxas e impostos.' },
            { name: 'Foto no tamanho do Instagram', url: 'https://mymarketing.click/tools/instagram-image-resizer', text: 'A sua foto no tamanho do post, do story e do status, sem corte errado.' },
            { name: 'Remover fundo de imagem', url: 'https://mymarketing.click/tools/remove-background', text: 'O fundo da foto sai em segundos, e o PNG transparente fica pronto para baixar.' },
            { name: 'Redimensionar imagem', url: 'https://mymarketing.click/tools/image-resizer', text: 'Qualquer imagem no tamanho que você precisa, em pixels ou porcentagem, em JPG, PNG ou WebP.' },
        ],
    },
    {
        line: 'Agents',
        tools: [
            { name: 'Testar um servidor MCP', url: 'https://myagents.click/tools/mcp-server-test', text: 'Cole o endereço e veja se ele responde, com quais ferramentas e se pede login.' },
            { name: 'Contador de tokens', url: 'https://myagents.click/tools/token-counter', text: 'Cole um texto e veja os tokens e quanto eles ocupam da janela de contexto, no navegador.' },
            { name: 'Gerador de prompt de agente', url: 'https://myagents.click/tools/agent-prompt-generator', text: 'Cinco respostas viram as instruções de um agente, prontas para colar.' },
            { name: 'JSON formatter: formatar e validar JSON', url: 'https://myagents.click/tools/json-validator', text: 'Cole um JSON: o erro com linha e coluna, ou o JSON formatado com os campos e os tipos.' },
            { name: 'Gerador e validador de CPF e CNPJ', url: 'https://myagents.click/tools/cpf-cnpj-generator', text: 'Gere CPF e CNPJ válidos para teste, inclusive o CNPJ com letras, ou confira os dígitos de um número.' },
        ],
    },
]
