/**
 * Zen — Design Tokens
 *
 * Fonte única de verdade, extraída por engenharia reversa de
 * @ciromaciel/components-kit. Consumida pela página /design-system e pelo
 * `agent-spec-plugin`, que gera /design-system.txt e /design-system.json.
 *
 * CÓPIA, E DE PROPÓSITO. Este arquivo é mantido no repositório do
 * o site do produto e copiado para cá junto com `api.js` e `agent-spec.js`. O kit
 * é o mesmo nos dois sites, então os valores são os mesmos — duplicá-los é o
 * preço de cada site renderizar a própria documentação sem depender do outro.
 *
 * Quem manda é `@ciromaciel/components-kit/theme.js`. Se um valor aqui divergir
 * do kit, o errado é este arquivo: a página que o lê documenta o que o site
 * de fato usa, e um token desatualizado é uma mentira sobre o próprio site.
 *
 * Regra de propagação: token novo nasce no branding, entra no kit, desce para
 * o site do produto e só então é copiado para cá. Nunca o contrário.
 */

// ---------------------------------------------------------------------------
// Cor
// ---------------------------------------------------------------------------

/**
 * A rampa. Os degraus 0–3 são superfície e estrutura; 4–9 são tinta.
 * Nenhum degrau atravessa a fronteira.
 *
 * `count` é a frequência real de uso medida no kit — é o que separa uma cor
 * de trabalho de uma cor de exceção.
 */
export const GRAY_RAMP = [
    { step: 0, hex: '#FFFFFF', token: 'gray.0', role: 'App base', usage: 'Fundo branco puro', count: null },
    { step: 1, hex: '#F9FAFB', token: 'gray.1', role: 'Superfície alternada', usage: 'Palco alternado, numeral fantasma', count: null },
    { step: 2, hex: '#F3F4F6', token: 'gray.2', role: 'Filete padrão', usage: 'Toda borda do sistema', count: 10 },
    { step: 3, hex: '#E5E7EB', token: 'gray.3', role: 'Borda muda', usage: 'Citação, estado desabilitado', count: null },
    { step: 4, hex: '#9CA3AF', token: 'gray.4', role: 'Texto quaternário', usage: 'Label uppercase apenas', count: 7 },
    { step: 5, hex: '#6B7280', token: 'gray.5', role: 'Texto terciário', usage: 'Rótulos, legendas', count: 20 },
    { step: 6, hex: '#4B5563', token: 'gray.6', role: 'Texto secundário', usage: 'Corpo — a cor mais usada', count: 50 },
    { step: 7, hex: '#374151', token: 'gray.7', role: 'Corpo enfático', usage: 'Descrição de destaque', count: 6 },
    { step: 8, hex: '#1F2937', token: 'gray.8', role: 'Texto primário escuro', usage: 'Raro', count: 4 },
    { step: 9, hex: '#11181C', token: 'gray.9', role: 'Preto da marca', usage: 'Títulos, métricas, botão preenchido', count: 36 },
]

export const SEMANTIC_COLORS = [
    { name: 'textHeading', token: 'gray.9', hex: '#11181C', usage: 'Títulos e métricas' },
    { name: 'textBody', token: 'gray.6', hex: '#4B5563', usage: 'Corpo padrão' },
    { name: 'textEmphasis', token: 'gray.7', hex: '#374151', usage: 'Corpo com presença' },
    { name: 'textLabel', token: 'gray.4', hex: '#9CA3AF', usage: 'Label uppercase' },
    { name: 'border', token: 'gray.2', hex: '#F3F4F6', usage: 'Toda borda' },
    { name: 'surface', token: 'gray.0', hex: '#FFFFFF', usage: 'Palco padrão' },
    { name: 'surfaceAlt', token: 'gray.1', hex: '#F9FAFB', usage: 'Palco alternado' },
]

/**
 * A única exceção cromática do sistema. Semântica de PERDA, não de erro:
 * marca o custo total da coluna "modo tradicional" em Comparison.jsx.
 */
export const LOSS_COLOR = { token: 'red.6', hex: '#E03131', usage: 'Custo/perda quantificada' }

/**
 * A segunda exceção (14/10/2026): o "deu certo". Antes eram três — teal na
 * notificação, teal.7 nas barras de status, #16A34A no "No ar". Ficou o verde,
 * que se separa melhor do vermelho para quem tem daltonismo vermelho-verde.
 * green.6 preenche; green.7 é a tinta de texto. Nunca sem a palavra ou o glifo.
 */
export const SUCCESS_COLOR = {
    fill: { token: 'green.6', hex: '#16A34A' },
    ink: { token: 'green.7', hex: '#15803D' },
    css: '--rlg-success / --rlg-success-ink',
    usage: 'Notificação de sucesso, "No ar", barras de status, "Salvo"',
}

/** Contraste sobre #FFFFFF. gray.4 falha AA em corpo — só é legítimo em label. */
export const CONTRAST_TABLE = [
    { token: 'gray.9', ratio: '16,8:1', status: 'AAA', pass: true },
    { token: 'gray.7', ratio: '10,4:1', status: 'AAA', pass: true },
    { token: 'gray.6', ratio: '7,5:1', status: 'AAA', pass: true },
    { token: 'gray.5', ratio: '4,9:1', status: 'AA em corpo', pass: true },
    { token: 'gray.4', ratio: '2,6:1', status: 'Falha AA em corpo', pass: false },
]

// ---------------------------------------------------------------------------
// Tipografia
// ---------------------------------------------------------------------------

export const FONT_FAMILY =
    "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

/** Quatro pesos. Nenhum outro valor é permitido. Contagem real no kit. */
export const FONT_WEIGHTS = [
    { value: 900, name: 'Black', usage: 'Títulos, métricas, wordmark', count: 44 },
    { value: 800, name: 'ExtraBold', usage: 'Labels uppercase, botões, badges', count: 20 },
    { value: 700, name: 'Bold', usage: 'Ênfase em corpo, rótulo de métrica', count: 10 },
    { value: 500, name: 'Medium', usage: 'Legenda técnica, letra miúda', count: 5 },
]

/**
 * A escala fluida. Fórmula sempre `clamp(min, Nvw + 1rem, max)`.
 * O `+ 1rem` preserva a preferência de fonte do usuário — vw puro a ignora.
 * O coeficiente vw codifica a agressividade do crescimento.
 */
export const FLUID_SCALE = [
    {
        token: '--fz-hero',
        value: 'clamp(2.5rem, 8vw + 1rem, 6rem)',
        range: '40 → 96px',
        usage: 'Primeira dobra',
    },
    {
        token: '--fz-section-title',
        value: 'clamp(2rem, 5vw + 1rem, 3.5rem)',
        range: '32 → 56px',
        usage: 'Título de seção — o mais frequente',
    },
    {
        token: '--fz-big-metric',
        value: 'clamp(3rem, 10vw + 1rem, 7.5rem)',
        range: '48 → 120px',
        usage: 'Métrica — a mais dramática',
    },
    {
        token: '--fz-big-metric-sm',
        value: 'clamp(3rem, 5vw, 4.5rem)',
        range: '48 → 72px',
        usage: 'Métrica em grade de 4 colunas',
    },
]

/**
 * Quatro papéis. Todo texto do sistema é um deles. Não há quinto.
 *
 * `data` existe porque leitura contínua e leitura tabular são tarefas
 * diferentes: num parágrafo o olho percorre a linha, numa tabela ele salta
 * entre células e compara valores na vertical. O corpo de 16px que serve a
 * um texto torna uma tabela de 200 linhas impossível de varrer.
 *
 * A regra que separa os dois: texto que se lê em sequência é `body`; texto
 * que se compara em coluna é `data`.
 */
export const TYPE_ROLES = {
    label: {
        name: 'Label',
        tagline: 'o anúncio',
        fontSize: '10–13px',
        fontWeight: 800,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: 'gray.4',
        lineHeight: 1.4,
    },
    body: {
        name: 'Corpo',
        tagline: 'a performance',
        fontSize: '15–20px',
        fontWeight: 400,
        letterSpacing: 'normal',
        textTransform: 'none',
        color: 'gray.6',
        lineHeight: 1.7,
    },
    data: {
        name: 'Dado',
        tagline: 'a evidência',
        fontSize: '12–14px',
        fontWeight: 500,
        letterSpacing: 'normal',
        textTransform: 'none',
        color: 'gray.7',
        lineHeight: 1.4,
    },
    display: {
        name: 'Display',
        tagline: 'a declaração',
        fontSize: '32–120px',
        fontWeight: 900,
        letterSpacing: '-0.04em',
        textTransform: 'none',
        color: 'gray.9',
        lineHeight: 1.2,
    },
}

/**
 * Quatro degraus. `1px` é o tracking de controle — definido no theme.js do
 * Button e usado em Header, Footer, Pricing e Testimonials: onde o label é
 * clicável, o espaçamento é um pouco mais fechado que o de um label de seção.
 * Os valores restantes no código (0.5px, 1.2px, 4px, 0.1em) são drift.
 */
export const TRACKING = [
    { name: 'tight', value: '-0.04em', usage: 'Todo display e título', count: 2 },
    { name: 'control', value: '1px', usage: 'Botão, link de navegação', count: 5 },
    { name: 'label', value: '1.5px', usage: 'Todo label uppercase', count: 10 },
    { name: 'wide', value: '2px', usage: 'Label de destaque, wordmark', count: 19 },
]

export const LINE_HEIGHTS = [
    { value: 1, usage: 'Métrica', count: 7 },
    { value: 1.1, usage: 'Hero', count: 1 },
    { value: 1.2, usage: 'Título de seção', count: 3 },
    { value: 1.4, usage: 'Rótulo compacto', count: 6 },
    { value: 1.5, usage: 'Nota', count: 3 },
    { value: 1.6, usage: 'Corpo curto', count: 16 },
    { value: 1.7, usage: 'Corpo padrão', count: 25 },
    { value: 1.8, usage: 'Bloco longo (legal)', count: 6 },
]

// ---------------------------------------------------------------------------
// Espaço
// ---------------------------------------------------------------------------

/**
 * xs e xl dominam com 18 usos cada. É a assinatura do sistema: ou colado
 * (é um só objeto), ou muito separado (são objetos distintos). O meio-termo
 * é raro por design — ambiguidade de agrupamento é ruído.
 */
export const SPACE_SCALE = [
    { token: 'xs', px: 10, usage: 'Dentro de um par (label ↔ título)', count: 18 },
    { token: 'sm', px: 12, usage: 'Itens de uma lista', count: 12 },
    { token: 'md', px: 16, usage: 'Padding de controle', count: 7 },
    { token: 'lg', px: 20, usage: 'Padding de card compacto', count: 5 },
    { token: 'xl', px: 32, usage: 'Entre blocos de uma seção', count: 18 },
]

export const STAGE_RHYTHM = [
    { name: 'Padrão', value: '{ base: 80, md: 120 }', usage: 'Toda Section' },
    { name: 'Hero', value: '{ base: 80, sm: 100, md: 140 }', usage: 'Primeira dobra respira mais' },
    { name: 'Denso', value: '{ base: 40, md: 60 }', usage: 'SocialProof, Footer' },
]

export const CONTAINERS = [
    { size: 'md', width: 980, usage: 'Leitura contínua: legal, FAQ, artigo' },
    { size: 'lg', width: 1180, usage: 'Padrão de toda seção de landing' },
    { size: 'xl', width: 1320, usage: 'Faixas full-width: Header, Footer' },
]

/** maw não é decorativo: define caracteres por linha, logo define legibilidade. */
export const MEASURES = [
    { maw: 900, usage: 'Título centralizado' },
    { maw: 800, usage: 'Título padrão (default de Section)' },
    { maw: 780, usage: 'Parágrafo de introdução' },
    { maw: 700, usage: 'Título de CTABanner' },
    { maw: 620, usage: 'Corpo longo — 60–75 caracteres' },
    { maw: 550, usage: 'Descrição centralizada de CTA' },
    { maw: 220, usage: 'Nota sob métrica' },
]

export const BREAKPOINTS = [
    { token: 'xs', em: '36em', px: 576, usage: 'Raro' },
    { token: 'sm', em: '48em', px: 768, usage: '1 col → 2 col' },
    { token: 'md', em: '62em', px: 992, usage: 'O salto principal: mobile → desktop' },
    { token: 'lg', em: '75em', px: 1200, usage: '2 col → 4 col' },
    { token: 'xl', em: '88em', px: 1408, usage: 'Raro' },
]

// ---------------------------------------------------------------------------
// Forma
// ---------------------------------------------------------------------------

/** 57 ocorrências de radius="0". Zero de qualquer outro valor. É invariante. */
export const RADIUS = { value: '0', occurrences: 57, exceptions: 0 }

export const BORDERS = [
    { name: 'Padrão', value: '1px solid gray.2', usage: 'Delimitação neutra', width: 1, color: '#F3F4F6' },
    { name: 'Acento', value: '4px solid gray.2', usage: 'Topo do CTABanner: "aja aqui"', width: 4, color: '#F3F4F6' },
    { name: 'Citação', value: '2px solid gray.3', usage: 'Compete com texto, não com fundo', width: 2, color: '#E5E7EB' },
    { name: 'Input', value: '1px solid gray.2', usage: 'Borda inteira, radius 0', width: 1, color: '#F3F4F6' },
]

/**
 * A única animação do sistema. Perceptível, não performática.
 *
 * `active` é o estado de pressão — o hover não existe no toque, e a Apple pede
 * que todo botão mostre que foi apertado. `reduced` é o que sobra para quem
 * ligou "Reduzir movimento": nada se desloca, o brilho fica como sinal.
 */
export const MOTION = {
    transition: 'transform 0.2s ease, filter 0.2s ease',
    transform: 'translateY(-1px)',
    filter: 'brightness(1.1)',
    active: 'translateY(0) + brightness(0.92)',
    reduced: 'sem transform, sem transição; scroll-behavior smooth só em no-preference',
}

/**
 * O modo escuro por elevação (14/10/2026): os papéis não mudam, muda o valor.
 * A base recua e o que sobe clareia. Raciocínio em
 * the design system notes (dark mode).
 */
export const DARK_RAMP = [
    { token: 'gray.0', light: '#FFFFFF', dark: '#0B0F12', usage: 'Base da página, palco padrão (SECTION_BACKGROUNDS.white)' },
    { token: 'gray.1', light: '#F9FAFB', dark: '#12181D', usage: 'Palco alternado (SECTION_BACKGROUNDS.gray), hover' },
    { token: 'white', light: '#FFFFFF', dark: '#1A2127', usage: 'Cartão, Paper, modal — a superfície elevada. Nunca palco' },
    { token: 'elevated-2', light: '#FFFFFF', dark: '#232B32', usage: 'Menu, popover, lista suspensa, notificação' },
    { token: 'gray.2', light: '#F3F4F6', dark: '#222A31', usage: 'Filete' },
    { token: 'gray.3', light: '#E5E7EB', dark: '#2F3840', usage: 'Borda forte, desabilitado' },
    { token: 'gray.4', light: '#9CA3AF', dark: '#8A94A0', usage: 'Label caixa alta (4,7:1 até no menu)' },
    { token: 'gray.5', light: '#6B7280', dark: '#98A1AC', usage: 'Legenda, nota' },
    { token: 'gray.6', light: '#4B5563', dark: '#B6BEC8', usage: 'Corpo' },
    { token: 'gray.7', light: '#374151', dark: '#D3D8DE', usage: 'Dado de tabela' },
    { token: 'gray.9', light: '#11181C', dark: '#F3F4F6', usage: 'Título, botão' },
]

/** O botão de tema: um ícone que alterna, o estado dito em palavras. */
export const COLOR_SCHEME_TOGGLE = {
    component: 'ColorSchemeToggle (components-kit e dashboard-kit)',
    cycle: 'Automático → Claro → Escuro',
    default: 'Automático — segue o aparelho',
    label: 'Tema: Claro. Mudar para Escuro.',
    where: 'Painel: ao lado do cartão do usuário, no pé da coluna · Site: no cabeçalho, antes dos botões',
}

/** Um anel de foco em todo lugar — nos sites e nos painéis. */
export const FOCUS_RING = {
    outline: '2px solid gray.9',
    offset: '2px',
    shape: 'quadrado, como o elemento (raio 0)',
    danger: 'red.7 em .rlg-danger — muda só a cor',
}

/**
 * "Aumentar contraste" desloca a rampa um degrau para o escuro onde ela é
 * mais fraca. Vive em `global.css` (kit) e `tokens.css` (dashboard-kit).
 */
export const CONTRAST_MORE = [
    { token: 'gray.2', from: '#F3F4F6', to: '#9CA3AF', why: 'O filete some em tela clara' },
    { token: 'gray.3', from: '#E5E7EB', to: '#9CA3AF', why: 'Borda muda e desabilitado' },
    { token: 'gray.4', from: '#9CA3AF', to: '#4B5563', why: 'Label: 2,6:1 → 7,5:1' },
    { token: 'gray.5', from: '#6B7280', to: '#374151', why: 'Legenda: 4,9:1 → 10,4:1' },
    { token: 'gray.6', from: '#4B5563', to: '#374151', why: 'Corpo: 7,5:1 → 10,4:1' },
]

export const ICONS = { library: '@tabler/icons-react', stroke: 1.5 }

// ---------------------------------------------------------------------------
// Princípios
// ---------------------------------------------------------------------------

export const PRINCIPLES = [
    {
        n: 1,
        name: 'Conteúdo sobre cromo',
        summary:
            'Cada elemento de cromo precisa responder "que informação eu comunico?". Se a resposta for "nenhuma, é estética", ele sai.',
        detail:
            'Sobreviveram ao corte: o filete de 1px (comunica separação), o numeral fantasma de Steps (comunica ordem), o badge dot (categoria com mínimo de tinta). Foram cortados: sombras, bordas de Card, raio.',
        corollary:
            'Quando a página parece vazia demais, o erro está no conteúdo, não no design. A resposta é escrever melhor, não adicionar moldura.',
    },
    {
        n: 2,
        name: 'Hierarquia massiva',
        summary:
            'Não existe cor de destaque. A ênfase vem de contraste de escala, e o contraste precisa ser violento: salto de 3× a 6× entre níveis, nunca 1,2×.',
        detail:
            'O par canônico é o cabeçalho de palco: label minúsculo, leve em tinta e disperso em tracking, imediatamente acima de um título enorme, pesado e apertado. Opostos em cinco dimensões ao mesmo tempo — é isso que cria a tensão.',
        corollary: 'Implementado em SectionHeader. Toda seção do kit passa por ele.',
    },
    {
        n: 3,
        name: 'O Palco',
        summary:
            'Toda seção é um palco: fundo próprio, respiro vertical generoso, e um anúncio antes da performance.',
        detail:
            'Não é opcional nem reimplementado por seção — é a primitiva Section. As únicas exceções (Header, Hero, SocialProof, Footer) existem porque têm geometria própria.',
        corollary: 'Palcos consecutivos alternam white ↔ gray.1. É a única marcação de ritmo da página.',
    },
    {
        n: 4,
        name: 'Config-driven, não JSX',
        summary: 'O consumidor passa dados, nunca marcação.',
        detail:
            'Não é preferência de API — é o que mantém as leis 1–3 aplicáveis. Se o consumidor puder injetar JSX, ele injeta cromo, e o sistema erode em três sprints.',
        corollary: 'Contrato padrão: id, badge, subtitle, title, background, items, cta, note.',
    },
    {
        n: 5,
        name: 'Honestidade verificável',
        summary: 'Cada afirmação forte carrega o que a torna checável.',
        detail:
            'Por isso StatsGrid tem description sob cada número e note sob a grade; Callout tem rodapé de honestidade; Hero tem note com o que custa experimentar. A nota é sempre o degrau mais baixo: 13px, gray.6, lh 1.5.',
        corollary:
            'Sem esta lei, hierarquia massiva vira só um número grande sem lastro. A nota é o que separa design de propaganda.',
    },
    {
        n: 6,
        name: 'Um lugar por item',
        summary: 'No cabeçalho, cada item mora num menu só. O rodapé é o mapa do site, não a cópia do cabeçalho.',
        detail:
            'O cabeçalho mostra tipos de coisa, não o catálogo: no máximo três menus, até quatro colunas, cerca de oito itens por coluna, e a lista completa na página índice (/books, /tools). O rodapé leva às páginas índice, a quem conduz, ao contato e às páginas legais: quatro colunas, até sete links cada, nunca uma linha por livro ou por ferramenta. Em 30/10/2026 o cabeçalho tinha 58 itens, 17 deles duas vezes, e o rodapé 56 links; ficaram 28 e 23.',
        corollary: 'Coisa nova entra no seu lugar único: um livro novo, em "Para quem"; uma ferramenta nova, em /tools. Só entra no menu se for um tipo novo.',
    },
]

// ---------------------------------------------------------------------------
// Composição
// ---------------------------------------------------------------------------

export const LAYERS = [
    { name: 'Tokens', items: 'theme.js · global.css · tokens.js', role: 'Os valores' },
    { name: 'Primitivas', items: 'Section · SectionHeader · CTAButton · MediaBlock · Wordmark · BrandLogo', role: 'Átomos reutilizáveis' },
    { name: 'Seções', items: 'Hero · FeaturesGrid · StatsGrid · Pricing · FAQ · CTABanner …', role: 'Blocos de página' },
    { name: 'Páginas', items: 'website · auth · hoster · storage · payments', role: 'Instâncias' },
]

export const SECTION_VOCABULARY = [
    { job: 'Abertura', components: ['Header', 'Hero', 'SocialProof'] },
    { job: 'Prova', components: ['StatsGrid', 'Testimonials', 'TrustBadge', 'FounderCard'] },
    { job: 'Explicação', components: ['FeatureSplit', 'FeaturesGrid', 'Steps', 'Callout'] },
    { job: 'Decisão', components: ['Comparison', 'CriteriaList', 'Pricing', 'FAQ'] },
    { job: 'Conversão', components: ['CTABanner', 'LeadForm', 'ProductGrid'] },
    { job: 'Fechamento', components: ['Footer', 'LegalPrivacy', 'LegalTerms', 'LegalSecurity'] },
    { job: 'Estrutura', components: ['Layout', 'Section'] },
]

export const UNIVERSAL_PROPS = [
    { prop: 'id', type: 'string', role: 'Âncora de scroll' },
    { prop: 'badge', type: 'string', role: 'Selo pontilhado acima do label' },
    { prop: 'subtitle', type: 'string', role: 'Label uppercase — o anúncio' },
    { prop: 'title', type: 'string | node', role: 'Título massivo' },
    { prop: 'description', type: 'string', role: 'Parágrafo de introdução' },
    { prop: 'background', type: "'white' | 'gray'", role: 'Fundo do palco' },
    { prop: 'ta', type: "'left' | 'center'", role: 'Alinhamento' },
    { prop: 'items', type: 'object[]', role: 'Os dados' },
    { prop: 'cta', type: '{ label, href, icon, variant, target }', role: 'Ação' },
    { prop: 'note', type: 'string', role: 'Nota de verificação (Lei 5)' },
]

// ---------------------------------------------------------------------------
// Auditoria
// ---------------------------------------------------------------------------

/** Falhas que reprovam sem discussão. */
export const BLOCKERS = [
    { symptom: 'border-radius diferente de 0', law: 1 },
    { symptom: 'Texto de conteúdo abaixo de 12px', law: 2 },
    { symptom: 'Erro e sucesso com a mesma cor', law: 5 },
    { symptom: 'Métrica ou tabela sem skeleton com a forma do conteúdo', law: 3 },
    { symptom: 'box-shadow em qualquer lugar', law: 1 },
    { symptom: 'Cor fora da rampa gray', law: 1 },
    { symptom: 'Salto tipográfico <2× entre níveis', law: 2 },
    { symptom: 'Corpo em gray.9', law: 2 },
    { symptom: 'Seção que reimplementa o palco', law: 3 },
    { symptom: 'Prop que aceita JSX arbitrário', law: 4 },
    { symptom: 'Métrica grande sem nota', law: 5 },
]

export const CHECKLIST = [
    {
        group: 'Tokens',
        items: [
            'Zero hex literal no componente — tudo via c="gray.N" / bg / var(--mantine-color-gray-N)',
            'Zero px de fonte hardcoded em título — usa var(--fz-*)',
            'Peso é 500, 700, 800 ou 900. Nenhum outro valor',
            'letter-spacing é -0.04em, 1px, 1.5px ou 2px',
            'radius="0" em todo elemento que aceita raio',
        ],
    },
    {
        group: 'Tipografia',
        items: [
            'Salto entre níveis adjacentes é ≥3×',
            'Corpo é gray.6; dado tabular é gray.7 — nunca gray.9',
            'Título é gray.9 — nunca gray.6',
            'Todo label uppercase tem fw={800} e tracking positivo',
            'gray.4 só aparece em label uppercase, nunca em parágrafo',
            'Um único <h1> na página',
            '<br /> manual em título está dentro de .hide-mobile-br',
        ],
    },
    {
        group: 'Cor',
        items: [
            'Nenhuma cor fora da rampa gray, exceto red.6 (perda, erro) e green.6/green.7 (sucesso) — sempre com palavra ou glifo',
            'Toda borda é 1px solid gray.2 — salvo o topo 4px do CTABanner e a citação 2px gray.3',
            'Fundo de palco é white ou gray.1, alternando com o palco anterior',
            'Sem gradiente, sem sombra colorida',
        ],
    },
    {
        group: 'Espaço',
        items: [
            'Palco usa py={{ base: 80, md: 120 }} e Container size="lg"',
            'Stack gap="xl" entre anúncio e conteúdo',
            'Corpo tem maw ≤ 780',
            'Mobile (base) é 1 coluna',
            'Onde há filete divisor, spacing={0}',
            'Borda divisória tem media query que a desliga quando a grade empilha',
        ],
    },
    {
        group: 'Forma',
        items: [
            'Sem sombra',
            'Paper só onde a superfície precisa se declarar; caso contrário Card ou Box',
            'Input tem borda inteira de 1px gray.2 e radius 0',
            'Botão é uppercase, fw={800}, lts="1px"',
            'Botão carregando mantém a cor e mostra as barras (14px no painel, 16px no site), centralizadas; sem camada por cima',
            'Ícone é Tabler com stroke={1.5}',
        ],
    },
    {
        group: 'Arquitetura',
        items: [
            'Componente envolve Section em vez de refazer o palco',
            'Props são dados, não JSX',
            'Contrato padrão presente: id, badge, subtitle, title, background',
            'Usa primitivas em vez de reimplementar',
            'cta segue o shape universal',
            'Exportado em src/index.js',
            'Padrão repetido em 3+ componentes foi promovido a primitiva',
        ],
    },
    {
        group: 'Painel (telas de aplicação)',
        items: [
            'Texto tabular usa o papel "dado" (12–14px), não o corpo de 16px',
            'Nenhum texto abaixo de 12px, exceto label uppercase (10–11px)',
            'Skeleton reproduz a grade real do conteúdo, não um retângulo genérico',
            'Refetch não pisca skeleton por cima de dado já visível',
            'Erro usa red.6 — nunca a mesma cor do sucesso',
            'Só um componente registra ⌘K por tela',
            'Busca cancela a requisição anterior (AbortController)',
            'Ação destrutiva pede permanência (hold 3s), não um "tem certeza?"',
            'Ação destrutiva é acionável por teclado',
            'Linha de tabela inteira é clicável quando leva a um detalhe',
        ],
    },
    {
        group: 'Acessibilidade',
        items: [
            'Imagem tem alt; vídeo tem aria-label',
            'CTA com href renderiza <a>; com onClick, <button>',
            'Contraste ≥4,5:1 em todo texto de corpo',
            'Seção usa <section> semântico com id',
            'Alvo de toque ≥44px em mobile',
            'Foco visível é o anel do sistema (2px gray.9, 2px de distância) — nunca outline: none sem substituto',
            'Nada se desloca sob prefers-reduced-motion — nem hover, nem rolagem suave',
            'Botão tem estado de pressão (:active), não só hover',
            'Botão só de ícone tem aria-label; ícone decorativo tem aria-hidden',
            'Informação nunca só na cor: estado é glifo + palavra',
        ],
    },
    {
        group: 'Escrita',
        items: [
            'Botão e link começam com verbo — nunca "clique aqui" nem "saiba mais"',
            'Ação que pede mais informação antes de concluir termina em reticências: "Exportar…"',
            'Erro diz o que houve e como resolver: "Preencha o campo E-mail", não "Obrigatório"',
            'Sem "Ops", sem culpa, sem "nós": "Não foi possível carregar", não "Tivemos um problema"',
            'Notificação de erro fica até ser fechada; sucesso e info saem sozinhos',
            'Tooltip tem no máximo 75 caracteres e não repete o nome do controle',
            'Controle desabilitado diz por quê (tooltip ou texto de ajuda)',
            'Placeholder é exemplo (nome@exemplo.com), nunca o único rótulo do campo',
            'Gráfico tem título que diz a conclusão, não só o nome da série',
        ],
    },
    {
        group: 'Modo escuro',
        items: [
            'Nenhum hexadecimal da rampa na interface — cor é c="gray.N" ou var(--mantine-color-gray-N)',
            'Palco de seção é gray.0; white é cartão (a superfície elevada no escuro)',
            'Nunca color="dark" nem dark.N — o preto do sistema é gray.9',
            'Superfície escura nos dois temas (terminal, código) usa cor literal, e o comentário diz por quê',
            'Prévia de peça externa (formulário, e-mail) não vira com o tema',
            'Nunca theme.colors.gray[N] nem \'white\' literal num estilo — var(--mantine-color-gray-N) e var(--mantine-color-white)',
            'Item ativo é igual a qualquer ativo, mesmo se for muted — o cinza discreto só vale fora do ativo',
            'Selo de status é o Tag do dashboard-kit, nunca o Badge do Mantine — preenchido só para o que está no ar',
            'MantineProvider com defaultColorScheme="auto", nunca forceColorScheme',
            'index.html tem o script do tema no <head>, antes do CSS',
        ],
    },
]


// ---------------------------------------------------------------------------
// Aplicação — densidade, navegação e dados
// ---------------------------------------------------------------------------

/**
 * O sistema é um só, mas uma tela resolve um de dois problemas, e o problema
 * decide a densidade. Não são dois design systems: são as mesmas leis, os
 * mesmos tokens e a mesma rampa, aplicados a tarefas diferentes.
 *
 * Medido em auth/dashboard: 173 usos de tipografia 10–13px contra os 15–20px
 * da landing. A diferença é real e tem causa — não é drift.
 */
export const SURFACES = [
    {
        name: 'Palco',
        job: 'Convencer',
        where: 'Landing, marketing, legal, 404',
        rhythm: 'py 80–120 · Container lg · gap xl',
        type: 'Corpo 15–20px · display 32–120px',
        density: 'Generosa — o vazio é o que cria calma',
    },
    {
        name: 'Painel',
        job: 'Operar',
        where: 'Dashboard, listas, formulários, configurações',
        rhythm: 'px 48 · pt 40 · maw 1280 · gap 16–32',
        type: 'Dado 12–14px · título de página 36px',
        density: 'Compacta — a tela cabe mais linhas',
    },
]

/**
 * O palco tem `py` de 80–120 porque separa seções de uma narrativa. O painel
 * não tem seções: tem uma tela só, com uma barra lateral fixa. O respiro
 * externo vira o padding do container, e o ritmo interno vira o gap entre
 * blocos.
 */
export const PANEL_LAYOUT = {
    sidebar: { width: 300, collapsed: 64, bg: 'white', border: '1px solid gray.2' },
    content: { px: 48, pt: 40, pb: 80, maw: 1280 },
    pageHeaderMb: 32,
    blockGap: 16,
}

/**
 * Cabeçalho de página — o par canônico em versão de painel.
 *
 * Mesma lógica do cabeçalho de palco (label pequeno colado a um título
 * pesado), com dois ajustes: o título é 36px fixo em vez de fluido, porque
 * o painel tem largura controlada e não precisa escalar com a viewport; e a
 * linha ganha uma zona de ações à direita, que o palco não tem.
 */
export const PAGE_HEADER = [
    { part: 'crumb', spec: 'fz 10 · fw 800 · gray.4 · uppercase · ls 1.5px', role: 'Onde você está' },
    { part: 'title', spec: 'fz 36 · fw 900 · lh 1 · ls -0.04em', role: 'O que é esta tela' },
    { part: 'subtitle', spec: 'fz 15 · fw 500 · gray.6 · lh 1.5', role: 'O que dá para fazer aqui' },
    { part: 'actions', spec: 'Group gap md, à direita', role: 'Um botão primário; busca opcional' },
]

/**
 * Tabela — a unidade de dado do painel.
 *
 * A implementação é CSS Grid, não <Table>: as colunas precisam de proporções
 * (`2.4fr 1fr 1fr 40px`) e a linha inteira precisa ser clicável. Grid resolve
 * as duas coisas sem lutar contra o layout de tabela.
 */
export const TABLE_SPEC = [
    { part: 'componente', spec: 'DataTable do dashboard-kit — a única tabela · getRowTone · renderDetail · stackOnPhone · bare' },
    { part: 'selo de status', spec: 'Tag do dashboard-kit · 10px · fw 800 · uppercase · ls 1.5px · filete 1px · neutral (gray.3/gray.6) · dark preenchido só para o que está no ar · up com quadrado verde · no em red · ícone de 12px para o que pede atenção' },
    { part: 'container', spec: 'Card p={0} withBorder · overflow hidden' },
    { part: 'header', spec: 'bg gray.1 · padding 12px 24px · borderBottom 1px gray.2' },
    { part: 'header cell', spec: 'fz 10 · fw 800 · gray.5 · uppercase · ls 1.5px' },
    { part: 'row', spec: 'padding 14px 24px · borderBottom 1px gray.2 (exceto a última)' },
    { part: 'cell', spec: 'fz 13 · gray.7 · lh 1.4 — o papel "dado"' },
    { part: 'hover', spec: 'background gray.1 · transition 120ms' },
    { part: 'destaque', spec: 'background gray.1 + boxShadow inset 2px 0 0 gray.9' },
    { part: 'grade', spec: 'gridTemplateColumns com fr + coluna fixa 40px para ações' },
]

/**
 * Busca — um padrão, dois alcances.
 *
 * Global (⌘K, server-side, cruza entidades) e local (filtra a lista da tela).
 * As duas usam a mesma caixa e o mesmo ícone; o que muda é o alcance.
 *
 * Regra: só um componente registra ⌘K por tela. Dois listeners competem pelo
 * foco — foi o que aconteceu na Overview do dashboard.
 */
export const SEARCH_SPEC = {
    shortcut: '⌘K / Ctrl+K',
    minLength: 2,
    debounceMs: 250,
    iconSize: 16,
    escape: 'Limpa o termo e devolve o foco',
    abort: 'AbortController cancela a requisição anterior a cada tecla',
    dropdown: 'Nunca abre vazio: ou tem resultado, ou tem o aviso de nenhum',
    rightSection: 'Kbd com o atalho quando vazio; Loader 14px durante a busca',
}

/**
 * Estados — o que a tela mostra quando não tem o que mostrar.
 *
 * Skeleton domina spinner por 32 a 4 no dashboard, e a razão é boa: o
 * skeleton reproduz a grade real da tabela, então o layout não salta quando
 * o dado chega. Spinner só onde não há forma a antecipar.
 */
export const STATES = [
    {
        state: 'Carregando (primeira vez)',
        pattern: 'Skeleton com a grade exata do conteúdo',
        spec: 'Mesmo gridTemplateColumns, mesmo padding. radius 0.',
    },
    {
        state: 'Carregando (refetch)',
        pattern: 'Nada, ou LoadingOverlay sutil',
        spec: 'O dado antigo continua legível — não pisca skeleton por cima.',
    },
    {
        state: 'Vazio (sem dado)',
        pattern: 'Label uppercase + subtítulo + ação',
        spec: 'Stack align center py 56 · título fz 10 fw 800 gray.4 uppercase ls 1.5px',
    },
    {
        state: 'Vazio (busca sem resultado)',
        pattern: 'Mesma anatomia, citando o termo',
        spec: '"Nenhum resultado para «termo»" + botão de limpar busca',
    },
    {
        state: 'Erro',
        pattern: 'Notificação vermelha, nunca cinza',
        spec: 'red.6 com IconAlertCircle. Sucesso e erro precisam ser distinguíveis sem ler.',
    },
    {
        state: 'Bloqueado (falta contexto)',
        pattern: 'Gate com skeleton',
        spec: 'Sem aplicação selecionada, a tela mostra a forma, não um erro.',
    },
]

/**
 * Ação destrutiva — confirmação por permanência, não por diálogo.
 *
 * Segurar 3 segundos com anel de progresso. Um diálogo "tem certeza?" é
 * respondido no automático; segurar exige intenção contínua e é reversível
 * até o último instante — solta e não acontece nada.
 *
 * Teclado: segurar Espaço ou Enter. Leitor de tela: um clique sem pressão
 * antes pede confirmação no diálogo do navegador.
 *
 * Desde 14/10/2026 o hold é só para credencial e conexão. A exclusão
 * frequente não confirma: sai da tela e oferece Desfazer (regra da Apple).
 */
export const DESTRUCTIVE = {
    holdMs: 3000,
    tickMs: 50,
    feedback: 'RingProgress thickness 2 sobre o ícone',
    cancel: 'onMouseUp · onMouseLeave · onTouchEnd · soltar Espaço/Enter',
    variants: 'ícone (tabela) · texto com contagem regressiva (formulário)',
    undo: 'Exclusão frequente (campo, bloco, nota, resposta) → undoable: sai na hora, Desfazer e ⌘Z por 6s, envia depois',
    holdOnlyFor: 'Chave, webhook, domínio, integração, agenda: revogar tem que valer na hora',
    escalation: 'Alvo que pode ser confundido → DeleteModal, digitar o identificador',
    modalFooter: 'Cancelar primeiro; destrutivo por último, contorno red.7',
}

/** Formulários — modal, nunca drawer. Medido: 9 Modal, 0 Drawer. */
export const FORM_SPEC = [
    { rule: 'Modal', detail: 'size md · centered · padding xl' },
    { rule: 'Título', detail: 'ThemeIcon 32 + título h4 + descrição em gray.6' },
    { rule: 'Validação', detail: '@mantine/form, síncrona, mensagem inline em português' },
    { rule: 'Botões', detail: 'Submit à direita; destrutivo à esquerda. Sem "Cancelar" — o X do modal basta. No diálogo cujo ato é excluir, o contrário: Cancelar e o destrutivo por último' },
    { rule: 'Feedback', detail: 'notifications.show no sucesso e no erro, com cores distintas' },
    { rule: 'Loading', detail: 'Botão com loading + disabled; overlay no corpo se a carga for longa' },
]

/**
 * Navegação lateral — o índice do painel.
 *
 * O item ativo é marcado por preenchimento gray.9 e peso 800 (contra 500 dos
 * inativos). É o mesmo instrumento da lei 2 — contraste de escala e tinta —
 * aplicado à navegação, sem introduzir cor de destaque.
 */
export const SIDEBAR_SPEC = [
    { part: 'largura', spec: '300px · a coluna não recolhe' },
    { part: 'componente', spec: 'SidebarShell do dashboard-kit — coluna nova não é desenhada à mão' },
    { part: 'superfície', spec: 'bg gray.0 · borderRight 1px gray.2' },
    { part: 'marca', spec: 'Wordmark 28px no topo · a linha do painel embaixo (ColumnBrand)' },
    { part: 'contexto', spec: 'Em /, a lista dos recursos; dentro de um, o nome dele e as seções' },
    { part: 'busca', spec: '36px · bg gray.1 · borda 1px gray.2 · ícone 16px · fz 13' },
    { part: 'criar', spec: 'CreateButton: quadrado de 36px, bg gray.9, "+" 16px, colado à direita da busca · nome da ação na dica e no rótulo acessível · no limite do plano, contorno gray.4 e ícone gray.5 · sem busca, volta a ser um item escrito' },
    { part: 'label de seção', spec: 'fz 10 · fw 800 · gray.4 · uppercase · ls 1.5px' },
    { part: 'item', spec: 'fz 13 · px 12 · py 9 · ícone 18px stroke 1.5 · radius 0' },
    { part: 'item ativo', spec: 'bg gray.9 · texto gray.0 · fw 800' },
    { part: 'item inativo', spec: 'transparente · gray.7 · fw 500' },
    { part: 'rodapé', spec: 'Cartão do usuário (Docs, suporte e conta no menu dele) e o botão de tema à direita, separados por borderTop 1px gray.2' },
]

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

export const META = {
    name: 'Zen',
    version: '1.0.0',
    source: '@ciromaciel/components-kit',
    docs: 'ciromaciel.click/design-system',
    componentCount: 28,
    primitiveCount: 7,
}

// ---------------------------------------------------------------------------
// Referência: as Human Interface Guidelines da Apple
// ---------------------------------------------------------------------------

/**
 * O estudo de 13/10/2026 leu 46 páginas das HIG e as cruzou com este sistema.
 * O raciocínio completo está em the design system notes (Apple);
 * aqui fica o veredito de cada regra, em três grupos: o que entrou agora, o
 * que já era assim e o que ficou de fora — com o porquê, para que ninguém
 * reabra a mesma pergunta.
 */
export const APPLE_REFERENCE = [
    {
        group: 'Adotado',
        note: 'Entrou no components-kit e no dashboard-kit; vale em todo site e todo painel.',
        items: [
            { topic: 'Movimento', rule: 'Sob "Reduzir movimento", deslocamento vira nada ou esmaecimento.', here: 'Hover, pressão e rolagem suave desligam; o menu lateral do painel aparece em vez de deslizar.' },
            { topic: 'Pressão', rule: 'Todo botão mostra que foi apertado.', here: 'Botão pressionado volta ao chão e escurece (brightness 0.92).' },
            { topic: 'Foco', rule: 'O anel segue a forma do elemento; um só em toda a interface.', here: '2px gray.9 a 2px de distância, quadrado. Eram três cores diferentes.' },
            { topic: 'Contraste', rule: 'Toda cor própria tem uma variante de contraste aumentado.', here: 'prefers-contrast: more desloca gray.2–gray.6 um degrau para o escuro.' },
            { topic: 'Alvo de toque', rule: '44×44 para o dedo; 28 é o padrão denso do desktop.', here: 'Ponteiro grosso ganha piso de 44px em Button, ActionIcon e CloseButton.' },
            { topic: 'Tempo', rule: 'Prefira fechar à mão a sumir sozinho.', here: 'notify.error fica até ser fechada; sucesso e info saem em 5s.' },
            { topic: 'Erro', rule: 'Diga como resolver, perto do problema, sem culpar e sem "Ops".', here: 'LeadForm: "Preencha o campo E-mail" no lugar de "Obrigatório".' },
            { topic: 'Rastreamento', rule: 'Texto pequeno abre, texto grande fecha.', here: 'O tracking dos labels nunca chegava à tela (prop ls, que o Mantine ignora). Agora é lts, nos 152 arquivos.' },
            { topic: 'Escrita', rule: 'Verbo no botão, reticências quando falta informação, tooltip ≤75 caracteres.', here: 'Grupo "Escrita" no checklist.' },
            { topic: 'Sucesso', rule: 'Uma cor por significado, nunca sozinha.', here: 'Verde para todo "deu certo" (green.6 preenche, green.7 escreve). Eram três.' },
            { topic: 'Texto', rule: 'Hierarquia pela cor do papel, não por acaso.', here: 'Texto sem cor herda o corpo gray.6; título diz gray.9. O padrão era gray.9 nos sites e #000 nos painéis.' },
            { topic: 'Modo escuro', rule: 'A base recua; o que sobe clareia. Não é a rampa invertida.', here: 'Rampa por elevação nos dois kits; padrão Automático; um botão que alterna, com o estado dito em palavras.' },
            { topic: 'Consistência', rule: 'O mesmo papel com a mesma aparência em todo lugar.', here: 'Um panelTheme no dashboard-kit para os 18 painéis. h2 era 48px sobre um h1 de 36px.' },
        ],
    },
    {
        group: 'Já era assim',
        note: 'A Apple chega pelo outro lado à mesma regra — confirma, não muda.',
        items: [
            { topic: 'Cor', rule: 'Nunca só a cor para significar.', here: 'Glifo carrega o estado, palavra carrega o significado.' },
            { topic: 'Hierarquia', rule: 'Uma tinta em vários níveis; superfícies por papel, não por valor.', here: 'A rampa de dez cinzas com papéis nomeados.' },
            { topic: 'Forma', rule: 'Raio interno = raio externo − respiro.', here: 'Raio 0 satisfaz por construção.' },
            { topic: 'Marca', rule: 'A marca cede ao conteúdo; o logo não se repete.', here: 'Lei 1: conteúdo sobre cromo.' },
            { topic: 'Carregamento', rule: 'Placeholder com a forma do que vem.', here: 'Skeleton com a grade real é bloqueio de merge.' },
            { topic: 'Exclusão', rule: 'Desfazer vence confirmar; confirmar só o irreversível; destrutivo nunca como ação primária.', here: 'undoable com Desfazer e ⌘Z; hold de 3s para credencial; no modal de exclusão, Cancelar primeiro e destrutivo em contorno.' },
            { topic: 'Modal', rule: 'Um de cada vez, nunca empilhado.', here: 'useExclusiveModal.' },
        ],
    },
    {
        group: 'Não adotado',
        note: 'Regras de plataforma ou que contrariam uma decisão deste sistema.',
        items: [
            { topic: 'Caixa do botão', rule: 'Title Case em botões e menus.', here: 'Não existe em português. O botão continua em caixa alta, peso 800, 1px.' },
            { topic: 'Liquid Glass', rule: 'Vidro translúcido na camada de controles.', here: 'Contraria a lei 1. O cromo se separa por filete e posição, não por desfoque.' },
            { topic: 'Cápsula', rule: 'Controles em cápsula para o toque.', here: 'Contraria o raio 0.' },
            { topic: 'Tracking do SF', rule: 'Tabela de tracking positivo acima de 24pt.', here: 'É da troca óptica da SF Display. A Montserrat fecha em display: −0.04em.' },
            { topic: 'Peso 600', rule: 'Semibold como peso de ênfase.', here: 'O sistema pula de 500 para 700. Ênfase continua sendo 800.' },
        ],
    },
]
