/**
 * Zen — API reference completa do @ciromaciel/components-kit.
 *
 * Extraída das assinaturas reais dos componentes. É o que permite a um agente
 * escrever uma página inteira sem abrir o repositório: cada entrada traz o
 * shape exato das props, incluindo objetos aninhados, e um exemplo que compila.
 *
 * Consumida pela página /design-system e pela rota de texto /design-system.txt.
 */

/* -------------------------------------------------------------------------
   Instalação e setup
   ------------------------------------------------------------------------- */

export const SETUP = {
    install: 'bun add @ciromaciel/components-kit @mantine/core @mantine/hooks @tabler/icons-react',
    peerDeps: {
        '@mantine/core': '^7.0.0 || ^8.0.0',
        '@mantine/hooks': '^7.0.0 || ^8.0.0',
        '@tabler/icons-react': '^3.0.0',
        react: '^18.0.0 || ^19.0.0',
        'react-dom': '^18.0.0 || ^19.0.0',
    },
    entry: `import '@mantine/core/styles.css'
import '@ciromaciel/components-kit/style.css'

import { MantineProvider } from '@mantine/core'
import { theme } from '@ciromaciel/components-kit'

export default function App() {
    return (
        <MantineProvider theme={theme} defaultColorScheme="auto">
            {/* suas rotas */}
        </MantineProvider>
    )
}`,
    note: 'O theme exportado pelo kit já carrega toda a paleta, tipografia e defaults de componente. Não redefina tokens no consumidor — se um valor precisa mudar, ele muda no kit.',
}

/* -------------------------------------------------------------------------
   Primitivas
   ------------------------------------------------------------------------- */

export const PRIMITIVES = [
    {
        name: 'Section',
        job: 'O palco. Envolve qualquer seção com fundo, respiro e cabeçalho.',
        props: [
            ['children', 'ReactNode', 'Conteúdo — a performance'],
            ['badge', 'string', 'Selo pontilhado acima do label'],
            ['title', 'string | ReactNode', 'Título massivo'],
            ['subtitle', 'string | ReactNode', 'Label uppercase — o anúncio'],
            ['id', 'string', 'Âncora de scroll'],
            ['background', "'white' | 'gray'", "Default: 'white'"],
            ['py', 'number | object', 'Default: { base: 80, md: 120 }'],
            ['maw', 'number', 'Max-width do título. Default: 800'],
            ['ta', "'left' | 'center'", "Default: 'left'"],
            ['stackGap', 'string', "Default: 'xl'"],
        ],
        example: `<Section
    id="beneficios"
    badge="No ar agora"
    subtitle="Por que usar"
    title="O essencial para publicar."
    background="gray"
>
    {/* conteúdo */}
</Section>`,
    },
    {
        name: 'SectionHeader',
        job: 'O par canônico: label leve + título pesado.',
        props: [
            ['badge', 'string', 'Selo pontilhado'],
            ['subtitle', 'string | ReactNode', 'Label uppercase'],
            ['title', 'string | ReactNode', 'Título'],
            ['titleOrder', 'number', 'Nível do heading. Default: 2'],
            ['titleFz', 'string', "Default: 'var(--fz-section-title)'"],
            ['ta', "'left' | 'center'", "Default: 'left'"],
            ['maw', 'number', 'Max-width do título'],
        ],
        example: `<SectionHeader
    subtitle="Prova verificável"
    title="Números que você pode conferir."
    maw={800}
/>`,
    },
    {
        name: 'CTAButton',
        job: 'Botão padronizado. Vira <a> com href, <button> com onClick.',
        props: [
            ['label', 'string', 'Texto do botão'],
            ['href', 'string', 'URL — renderiza como <a>'],
            ['onClick', 'function', 'Handler — renderiza como <button>'],
            ['icon', 'ReactNode', 'Ícone à direita (rightSection)'],
            ['leftSection', 'ReactNode', 'Ícone à esquerda'],
            ['size', 'string', "Default: 'lg'"],
            ['variant', 'string', "Default: 'filled'"],
            ['color', 'string', "Default: gray.9 (via theme)"],
            ['target', 'string', "'_blank' para link externo"],
            ['px', 'number | object', 'Padding horizontal'],
            ['fullWidth', 'boolean', 'Ocupa a largura do container'],
        ],
        example: `<CTAButton
    label="Começar agora"
    href="/signup"
    icon={<IconArrowRight size={18} stroke={1.5} />}
/>`,
    },
    {
        name: 'MediaBlock',
        job: 'Vídeo ou imagem com a11y consistente.',
        props: [
            ['video', '{ src, width, filter }', 'Autoplay, loop, muted, playsInline'],
            ['image', 'string', 'src da imagem (fallback quando não há vídeo)'],
            ['width', 'string', "Default: '100%'"],
            ['maw', 'string | number', 'Max-width'],
            ['alt', 'string', 'Alt da imagem / aria-label do vídeo'],
        ],
        example: `<MediaBlock
    image="https://images.exemplo.com/dashboard.webp"
    alt="Painel de controle"
    maw={500}
/>`,
    },
    {
        name: 'Logotype',
        job: 'O logotipo das linhas: raio, palavra e "by Ciro Cesar Maciel". A assinatura tem tamanho fixo (11px no cabeçalho de 40px, 0,42 da palavra no grande) e começa onde a palavra começa; nunca estica até a largura da palavra.',
        props: [
            ['word', 'string', 'A linha: "Infrastructure", "Cleaner"'],
            ['height', 'number', 'Altura do conjunto. Default: 40 (cabeçalho e rodapé)'],
            ['signature', 'string | null', "Default: 'by Ciro Cesar Maciel'. `null` no logotipo da raiz, o nome do Ciro: quem assina é o nome"],
        ],
        example: `<Logotype word="Infrastructure" />`,
    },
    {
        name: 'Wordmark',
        job: 'Logo em texto, para produtos sem logotipo em imagem.',
        props: [
            ['children', 'ReactNode', 'O nome da marca'],
            ['fz', 'number', 'Default: 28'],
            ['c', 'string', "Default: 'gray.9'"],
        ],
        example: `<Header logo={<Wordmark>Auth</Wordmark>} />`,
    },
    {
        name: 'BrandLogo',
        job: 'Resolve a prop `logo` de Header/Footer: aceita objeto ou nó React.',
        props: [
            ['logo', '{ src, alt, height } | ReactNode', 'Imagem ou wordmark'],
            ['objectPosition', 'string', "Default: 'left'"],
        ],
        example: `<BrandLogo logo={{ src: '/logo.webp', alt: 'Infrastructure', height: 32 }} />`,
    },
]

/* -------------------------------------------------------------------------
   Componentes de seção
   ------------------------------------------------------------------------- */

export const COMPONENTS = [
    {
        name: 'Layout',
        job: 'Wrapper raiz. Flex column com minHeight 100vh — um <main style={{flex:1}}> empurra o rodapé para o fim.',
        group: 'Estrutura',
        props: [
            ['children', 'ReactNode', ''],
            ['style', 'object', 'Mesclado ao style interno'],
            ['...props', 'any', 'Encaminhado ao Box (bg, etc.)'],
        ],
        example: `<Layout>
    <Header ... />
    <main style={{ flex: 1 }}>{/* seções */}</main>
    <Footer ... />
</Layout>`,
    },
    {
        name: 'Header',
        job: 'Barra de navegação. Alias legado: Navbar.',
        group: 'Abertura',
        props: [
            ['logo', '{ src, alt, height } | ReactNode', 'Imagem ou <Wordmark>'],
            ['navLinks', '{ label, href, component?, to? }[]', 'Aceita Link do react-router via `component`'],
            ['loginCta', '{ label, href }', 'CTA secundário'],
            ['signupCta', '{ label, href }', 'CTA primário'],
            ['background', "'white' | 'gray'", "Default: 'white'"],
        ],
        example: `<Header
    logo={<Wordmark>Infrastructure</Wordmark>}
    navLinks={[
        { label: 'Produtos', href: '#produtos' },
        { label: 'Preço', href: '#preco' },
    ]}
    loginCta={{ label: 'Entrar', href: '/login' }}
    signupCta={{ label: 'Criar conta', href: '/signup' }}
/>`,
    },
    {
        name: 'Hero',
        job: 'Primeira dobra. Texto à esquerda, mídia à direita (ou centralizado sem mídia).',
        group: 'Abertura',
        props: [
            ['subtitle', 'string', 'Label uppercase'],
            ['title', 'string | ReactNode', 'Aceita <br /> — envolva em .hide-mobile-br'],
            ['description', 'string', 'Parágrafo de abertura'],
            ['cta', '{ label, href, icon, size, variant, color, px }', 'CTA principal'],
            ['secondaryCta', 'mesmo shape de cta', 'Renderizado ao lado'],
            ['note', 'string', 'Letra miúda sob os botões — o que custa experimentar'],
            ['video', '{ src, filter, width }', ''],
            ['image', 'string', 'Alternativa ao vídeo'],
            ['mediaMaw', 'string | number', 'Max-width da mídia'],
            ['background', "'white' | 'gray'", "Default: 'white'"],
            ['titleFz', 'string', "Default: 'var(--fz-hero)'"],
            ['descriptionFz', 'string', "Default: 'xl'"],
        ],
        example: `<Hero
    subtitle="Infraestrutura em português"
    title={<>Login pronto<br />em uma tarde.</>}
    description="Autenticação, sessões e permissões sem três semanas de trabalho."
    cta={{ label: 'Começar grátis', href: '/signup', icon: <IconArrowRight size={18} /> }}
    secondaryCta={{ label: 'Ver a documentação', href: '/docs', variant: 'outline' }}
    note="Grátis até 1.000 usuários ativos. Sem cartão."
    image="https://images.exemplo.com/auth.webp"
    mediaMaw={500}
/>`,
    },
    {
        name: 'SocialProof',
        job: 'Faixa densa de logos. Não usa palco — retorna null sem logos.',
        group: 'Abertura',
        props: [
            ['id', 'string', ''],
            ['title', 'string', 'Label acima dos logos'],
            ['logos', '{ src, alt }[]', 'Obrigatório'],
            ['background', "'white' | 'gray'", "Default: 'gray'"],
        ],
        example: `<SocialProof
    title="Quem já usa"
    logos={[
        { src: '/logos/a.webp', alt: 'Empresa A' },
        { src: '/logos/b.webp', alt: 'Empresa B' },
    ]}
/>`,
    },
    {
        name: 'StatsGrid',
        job: 'Big Type Metrics em grade dividida por filete. Cada número carrega sua nota.',
        group: 'Prova',
        props: [
            ['id', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['items', '{ value, label, description }[]', 'description é a nota de verificação (Lei 5)'],
            ['cols', 'number', 'Colunas a partir de lg. Default: 4'],
            ['background', "'white' | 'gray'", "Default: 'white'"],
            ['ta', "'left' | 'center'", "Default: 'center'"],
            ['note', 'string', 'Nota de rodapé sob a grade'],
        ],
        example: `<StatsGrid
    subtitle="No ar agora"
    title="O que você confere sem falar com ninguém"
    items={[
        { value: '4', label: 'Produtos no ar', description: 'Abra os quatro e teste' },
        { value: '99,9%', label: 'Uptime', description: 'Medido nos últimos 90 dias' },
    ]}
    note="Todo número aqui é verificável em dois minutos."
/>`,
    },
    {
        name: 'Testimonials',
        job: 'Prova social com depoimentos e iniciais.',
        group: 'Prova',
        props: [
            ['id', 'string', ''],
            ['title', 'string', ''],
            ['subtitle', 'string', ''],
            ['items', '{ quote, name, role, company }[]', ''],
            ['background', "'white' | 'gray'", "Default: 'gray'"],
        ],
        example: `<Testimonials
    subtitle="Quem já fez"
    title="O que dizem"
    items={[
        { quote: 'Subimos em uma tarde.', name: 'Ana Souza', role: 'CTO', company: 'Acme' },
    ]}
/>`,
    },
    {
        name: 'TrustBadge',
        job: 'Selo de confiança. Alias legado: SeloExclusivo.',
        group: 'Prova',
        props: [
            ['text', 'string', "Default: 'Selo Exclusivo'"],
            ['color', 'string', "Default: 'green.6'"],
            ['background', "'white' | 'gray'", "Default: 'gray'"],
        ],
        example: `<TrustBadge text="Dados no Brasil" />`,
    },
    {
        name: 'FounderCard',
        job: 'Citação editorial do fundador, com credenciais como métricas.',
        group: 'Prova',
        props: [
            ['id', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['description', 'string', ''],
            ['avatar', '{ src, alt }', ''],
            ['name', 'string', ''],
            ['role', 'string', ''],
            ['quote', 'string', 'A citação'],
            ['credentials', '{ value, label }[]', 'Credenciais em Big Type'],
            ['background', "'white' | 'gray'", "Default: 'white'"],
            ['ta', "'left' | 'center'", "Default: 'center'"],
        ],
        example: `<FounderCard
    subtitle="Quem responde"
    title="O suporte é quem escreveu o código"
    avatar={{ src: '/foto.webp', alt: 'Ciro Maciel' }}
    name="Ciro Cesar Maciel"
    role="Fundador"
    quote="Se quebrar às duas da manhã, é o meu telefone que toca."
    credentials={[{ value: '20+', label: 'Anos em sistemas críticos' }]}
/>`,
    },
    {
        name: 'FeatureSplit',
        job: 'Texto de um lado, mídia do outro. `reverse` inverte.',
        group: 'Explicação',
        props: [
            ['id', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['description', 'string', ''],
            ['featuresList', 'string[]', 'Lista com ícone de check'],
            ['cta', '{ label, href, icon }', ''],
            ['video', '{ src, filter, width }', ''],
            ['image', 'string', ''],
            ['mediaMaw', 'string | number', ''],
            ['reverse', 'boolean', 'Inverte a ordem. Default: false'],
            ['background', "'white' | 'gray'", "Default: 'white'"],
        ],
        example: `<FeatureSplit
    subtitle="Como funciona"
    title="Uma linha para proteger uma rota."
    description="O middleware resolve sessão, refresh e permissão."
    featuresList={['Sessões com refresh automático', 'RBAC por rota']}
    image="https://images.exemplo.com/codigo.webp"
    reverse
/>`,
    },
    {
        name: 'FeaturesGrid',
        job: 'Grade assimétrica de recursos com visual dinâmico por item.',
        group: 'Explicação',
        props: [
            ['id', 'string', ''],
            ['badge', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['description', 'string', ''],
            ['items', '{ label, title, description, visual, span }[]', 'Ver shapes de `visual` abaixo'],
            ['note', 'string', ''],
            ['background', "'white' | 'gray'", "Default: 'gray'"],
            ['ta', "'left' | 'center'", "Default: 'left'"],
        ],
        nested: {
            title: 'Shapes de `visual` (5 tipos)',
            rows: [
                ["type: 'metric'", '{ value, label, badge? }', 'Número grande com rótulo'],
                ["type: 'ring'", '{ value, label, sublabel?, size?, thickness? }', 'Anel de progresso'],
                ["type: 'bars'", '{ data: number[], highlight?, height? }', 'Barras; `highlight` é o índice destacado'],
                ["type: 'typography'", '{ text?, fontSize?, height? }', "Amostra tipográfica. Default: 'Aa'"],
                ["type: 'icon-large'", '{ icon, size?, stroke? }', 'Ícone Tabler grande'],
            ],
        },
        example: `<FeaturesGrid
    subtitle="Por que usar"
    title="O essencial para publicar."
    items={[
        {
            label: 'Config-driven',
            title: 'Passe dados, não JSX',
            description: 'Cinco linhas para uma seção inteira.',
            visual: { type: 'metric', value: '5 linhas', label: 'por seção' },
            span: { base: 12, md: 7 },
        },
        {
            label: 'Performance',
            title: 'Sem runtime extra',
            description: 'Só Mantine e React.',
            visual: { type: 'ring', value: 98, label: '98', sublabel: 'Lighthouse' },
            span: { base: 12, md: 5 },
        },
    ]}
/>`,
    },
    {
        name: 'Steps',
        job: 'Processo numerado. O ordinal vira numeral fantasma de 120px atrás do card.',
        group: 'Explicação',
        props: [
            ['id', 'string', ''],
            ['badge', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['description', 'string', ''],
            ['items', '{ number?, icon?, title, description }[]', '`number` cai para o índice se ausente'],
            ['background', "'white' | 'gray'", "Default: 'gray'"],
            ['ta', "'left' | 'center'", "Default: 'center'"],
        ],
        example: `<Steps
    badge="Como funciona"
    title="Três passos. Zero atrito."
    items={[
        { number: '01', icon: IconCloudUpload, title: 'Você envia', description: 'Suba o projeto.' },
        { number: '02', icon: IconSettings, title: 'A gente configura', description: 'Domínio e SSL.' },
        { number: '03', icon: IconRocket, title: 'Está no ar', description: 'Em menos de dois minutos.' },
    ]}
/>`,
    },
    {
        name: 'Callout',
        job: 'Card de declaração com leads em negrito e rodapé de honestidade.',
        group: 'Explicação',
        props: [
            ['id', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['description', 'string', ''],
            ['cardLabel', 'string', 'Label acima da lista'],
            ['items', '{ lead, text }[]', '`lead` sai em negrito'],
            ['footnote', '{ lead, text }', 'O que ainda falta — a nota de honestidade'],
            ['background', "'white' | 'gray'", "Default: 'gray'"],
            ['ta', "'left' | 'center'", "Default: 'center'"],
        ],
        example: `<Callout
    badge="Antes de qualquer coisa"
    title="Se a gente sumir amanhã, seu app continua de pé"
    cardLabel="O que isso quer dizer na prática"
    items={[{ lead: 'Padrões abertos.', text: 'Seus dados saem em formatos que outra ferramenta lê.' }]}
    footnote={{ lead: 'O que ainda falta:', text: 'o export ainda não é um comando único.' }}
/>`,
    },
    {
        name: 'Comparison',
        job: 'Duas colunas: o jeito tradicional (com custo em red.6) contra o novo.',
        group: 'Decisão',
        props: [
            ['id', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['traditionalCol', '{ title, subtitle, items, totalLabel?, totalValue, footerText? }', '`items`: { label, value }[]'],
            ['newCol', '{ title, badge?, description, items, pricingBox? }', '`items`: string[]'],
            ['background', "'white' | 'gray'", "Default: 'white'"],
        ],
        example: `<Comparison
    subtitle="ROI do seu tempo"
    title="Construir do zero ou usar pronto"
    traditionalCol={{
        title: 'Do zero',
        subtitle: 'O caminho longo',
        items: [{ label: 'Autenticação', value: '3 semanas' }],
        totalValue: 'R$ 42.000',
        footerText: 'Sem contar manutenção',
    }}
    newCol={{
        title: 'Com o kit',
        badge: 'RECOMENDADO',
        description: 'Pronto para produção.',
        items: ['Login em uma tarde', 'Suporte de quem escreveu'],
        pricingBox: { label: 'Tempo até o ar', price: '30 min' },
    }}
/>`,
    },
    {
        name: 'CriteriaList',
        job: 'Régua de comparação em coluna única: critério, resposta e a nota que a torna verificável.',
        group: 'Decisão',
        props: [
            ['id', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['description', 'string', ''],
            ['items', '{ criterion, value, note, muted? }[]', '`muted: true` para "ainda não medimos"'],
            ['note', 'string', ''],
            ['background', "'white' | 'gray'", "Default: 'gray'"],
            ['ta', "'left' | 'center'", "Default: 'center'"],
        ],
        example: `<CriteriaList
    badge="A régua"
    title="Compare pelo que muda o seu dia"
    items={[
        { criterion: 'Em que moeda você paga', value: 'Real', note: 'Sua fatura não muda porque o dólar mudou.' },
        { criterion: 'Tempo de resposta', value: 'Ainda não medimos', note: 'Sem histórico suficiente.', muted: true },
    ]}
    note="Onde está escrito 'ainda não medimos', é porque ainda não medimos."
/>`,
    },
    {
        name: 'Pricing',
        job: 'Cards de planos com alternância mensal/anual controlada pelo consumidor.',
        group: 'Decisão',
        props: [
            ['id', 'string', ''],
            ['badge', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['description', 'string', ''],
            ['billingOptions', '{ label, value }[]', "Default: mensal/anual. `[]` remove o seletor"],
            ['billing', 'string', 'Valor atual — estado do consumidor'],
            ['setBilling', 'function', 'Setter do estado'],
            ['promoBadge', 'string', "Badge exibido quando billing === 'annual'"],
            ['plans', 'object[]', 'Ver shape abaixo'],
            ['background', "'white' | 'gray'", "Default: 'white'"],
        ],
        nested: {
            title: 'Shape de `plans[]`',
            rows: [
                ['name', 'string', 'Nome do plano'],
                ['description', 'string', 'Uma linha'],
                ['priceDisplay', '{ currency, whole, fraction }', 'Preço numérico'],
                ['priceText', 'string', 'Escape hatch: "Sob consulta" (ignora priceDisplay)'],
                ['pricePrefix', 'string | null', "Default: 'A partir de'. `null` remove"],
                ['period', 'string', "Ex.: '/mês'"],
                ['priceNote', 'string', 'Nota sob o preço'],
                ['features', 'string[]', 'Lista com check'],
                ['highlight', 'boolean', 'Borda 2px gray.9'],
                ['highlightBadge', 'string', "Default: 'RECOMENDADO'"],
                ['cta', '{ label, href, target, icon, variant, color, size }', ''],
                ['note', 'string', 'Nota no rodapé do card'],
            ],
        },
        example: `const [billing, setBilling] = useState('monthly')

<Pricing
    subtitle="Preço"
    title="Escolha o tamanho"
    billing={billing}
    setBilling={setBilling}
    promoBadge="2 MESES GRÁTIS"
    plans={[
        {
            name: 'Pro',
            description: 'Para times em produção.',
            priceDisplay: { currency: 'R$', whole: '49', fraction: '90' },
            period: '/mês',
            features: ['Usuários ilimitados', 'Suporte em português'],
            highlight: true,
            cta: { label: 'Começar', href: '/signup' },
        },
        {
            name: 'Enterprise',
            description: 'Para quem precisa de contrato.',
            priceText: 'Sob consulta',
            pricePrefix: null,
            features: ['SLA dedicado'],
            cta: { label: 'Falar com vendas', href: '/contato' },
        },
    ]}
/>`,
    },
    {
        name: 'FAQ',
        job: 'Acordeão em duas colunas com card de contato. A numeração continua entre colunas.',
        group: 'Decisão',
        props: [
            ['id', 'string', ''],
            ['badge', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['description', 'string', ''],
            ['questions', '{ question, answer }[]', ''],
            ['contactCard', '{ title, description, cta }', 'Card lateral'],
            ['background', "'white' | 'gray'", "Default: 'white'"],
            ['ta', "'left' | 'center'", "Default: 'left'"],
        ],
        example: `<FAQ
    subtitle="Perguntas difíceis"
    title="O que costumam perguntar"
    questions={[
        { question: 'Consigo exportar meus dados?', answer: 'Sim, em JSON e CSV, a qualquer momento.' },
    ]}
    contactCard={{
        title: 'Ficou alguma dúvida?',
        description: 'Responde quem escreveu o código.',
        cta: { label: 'Falar no WhatsApp', href: 'https://wa.me/...' },
    }}
/>`,
    },
    {
        name: 'ProductGrid',
        job: 'Catálogo de produtos, cada card com CTA de saída próprio.',
        group: 'Conversão',
        props: [
            ['id', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['description', 'string', ''],
            ['items', '{ name, category, icon, headline, description, href, target, span }[]', '`icon` é o componente Tabler, não o elemento'],
            ['ctaIcon', 'ReactNode', 'Ícone usado em todos os CTAs'],
            ['note', 'string', ''],
            ['background', "'white' | 'gray'", "Default: 'white'"],
            ['ta', "'left' | 'center'", "Default: 'center'"],
        ],
        example: `<ProductGrid
    badge="No ar agora"
    title="As quatro peças"
    ctaIcon={<IconArrowUpRight size={16} />}
    items={[
        {
            name: 'Auth',
            category: 'Login e sessões',
            icon: IconLock,
            headline: 'Três semanas de login, de novo.',
            description: 'Autenticação pronta para produção.',
            href: '/products/auth',
            span: 7,
        },
    ]}
/>`,
    },
    {
        name: 'LeadForm',
        job: 'Captura de lead de baixo atrito que entrega a conversa ao WhatsApp.',
        group: 'Conversão',
        props: [
            ['id', 'string', ''],
            ['badge', 'string', ''],
            ['title', 'string', ''],
            ['description', 'string', ''],
            ['fields', '{ name, label, placeholder, type?, required?, span? }[]', "`span: 'full'` ocupa a linha"],
            ['whatsappNumber', 'string', 'Só dígitos, com DDI'],
            ['messageIntro', 'string', "Default: 'Olá! Vim pelo site.'"],
            ['submit', '{ label, icon }', 'Config do botão'],
            ['reassurance', 'string', 'Letra miúda sob o botão'],
            ['onSubmit', 'function', 'Handler alternativo ao WhatsApp'],
            ['background', "'white' | 'gray'", "Default: 'gray'. Um dos dois tons de palco"],
        ],
        example: `<LeadForm
    badge="Contato"
    title="Conte o que você precisa"
    fields={[
        { name: 'nome', label: 'Seu nome', placeholder: 'Como te chamamos', required: true },
        { name: 'email', label: 'E-mail', type: 'email', required: true },
        { name: 'msg', label: 'O que você precisa', span: 'full' },
    ]}
    whatsappNumber="5511986166966"
    submit={{ label: 'Enviar no WhatsApp' }}
    reassurance="Responde quem escreveu o código, no mesmo dia."
/>`,
    },
    {
        name: 'CTABanner',
        job: 'Faixa final de conversão. Borda-topo de 4px — o único acento estrutural. Alias legado: SecondaryCTA.',
        group: 'Conversão',
        props: [
            ['id', 'string', ''],
            ['subtitle', 'string', ''],
            ['title', 'string', ''],
            ['titleOrder', 'number', 'Default: 2. Use 1 quando for a única seção (404)'],
            ['description', 'string', ''],
            ['featuresList', 'string[]', 'Lista entre descrição e CTA'],
            ['featuresLabel', 'string', 'Lead-in em negrito acima da lista'],
            ['cta', '{ label, href, icon, leftSection, target, size, variant, color, px }', ''],
            ['background', "'white' | 'gray'", "Default: 'gray'"],
            ['ta', "'center' | 'left'", "Default: 'center'"],
        ],
        example: `<CTABanner
    subtitle="Pronto para começar"
    title="Suba seu primeiro projeto hoje."
    description="Grátis até 1.000 usuários. Sem cartão."
    cta={{ label: 'Criar conta', href: '/signup', icon: <IconArrowRight size={18} /> }}
/>`,
    },
    {
        name: 'Footer',
        job: 'Rodapé com colunas de links e redes sociais.',
        group: 'Fechamento',
        props: [
            ['logo', '{ src, alt, height } | ReactNode', ''],
            ['description', 'string | ReactNode', 'Bloco à esquerda'],
            ['sections', '{ title, links: { label, href, to? }[] }[]', 'Colunas de links'],
            ['socialLinks', '{ href, label, icon }[]', ''],
            ['copyrightText', 'string', ''],
            ['madeByText', 'string', ''],
            ['background', "'white' | 'gray'", "Default: 'white'"],
        ],
        example: `<Footer
    logo={{ src: '/logo.webp', alt: 'Infrastructure', height: 28 }}
    description="Infraestrutura em português para quem constrói produto brasileiro."
    sections={[
        { title: 'Produtos', links: [{ label: 'Auth', href: '/products/auth' }] },
    ]}
    socialLinks={[
        { href: 'https://github.com/...', label: 'GitHub', icon: <IconBrandGithub size={18} stroke={1.5} /> },
    ]}
    copyrightText={\`© \${new Date().getFullYear()} Infrastructure.\`}
    background="gray"
/>`,
    },
    {
        name: 'LegalPrivacy',
        job: 'Política de privacidade completa em português (LGPD).',
        group: 'Fechamento',
        props: [
            ['companyName', 'string', "Default: 'Infrastructure'. A marca — é a voz do documento"],
            ['legalEntity', 'string', 'Razão social + CNPJ. Só nas cláusulas que identificam a parte. Default: companyName'],
            ['productName', 'string', "Default: 'nossos produtos'"],
        ],
        example: `<LegalPrivacy
    companyName="Acme"
    legalEntity="Acme Tecnologia LTDA (CNPJ 00.000.000/0001-00)"
    productName="o Acme Cloud"
/>`,
    },
    {
        name: 'LegalTerms',
        job: 'Termos de uso e licenciamento (EULA).',
        group: 'Fechamento',
        props: [
            ['companyName', 'string', "Default: 'Infrastructure'. A marca — é a voz do documento"],
            ['legalEntity', 'string', 'Razão social + CNPJ. Só nas cláusulas que identificam a parte. Default: companyName'],
            ['productName', 'string', "Default: 'nossos produtos'"],
            ['lastUpdated', 'string', "Data da última revisão DO TEXTO, por extenso. Default: '20 de setembro de 2026'"],
        ],
        example: `<LegalTerms
    companyName="Acme"
    legalEntity="Acme Tecnologia LTDA (CNPJ 00.000.000/0001-00)"
    productName="o Acme Cloud"
    lastUpdated="20 de setembro de 2026"
/>`,
    },
    {
        name: 'LegalSecurity',
        job: 'Protocolos de segurança e infraestrutura.',
        group: 'Fechamento',
        props: [
            ['companyName', 'string', "Default: 'Infrastructure'. A marca — é a voz do documento"],
            ['legalEntity', 'string', 'Razão social + CNPJ. Só nas cláusulas que identificam a parte. Default: companyName'],
            ['productName', 'string', "Default: 'nossos produtos'"],
        ],
        example: `<LegalSecurity
    companyName="Acme"
    legalEntity="Acme Tecnologia LTDA (CNPJ 00.000.000/0001-00)"
    productName="o Acme Cloud"
/>`,
    },
]

/* -------------------------------------------------------------------------
   Aliases legados
   ------------------------------------------------------------------------- */

export const ALIASES = [
    ['Navbar', 'Header'],
    ['SecondaryCTA', 'CTABanner'],
    ['SeloExclusivo', 'TrustBadge'],
]

/* -------------------------------------------------------------------------
   Receitas — páginas inteiras que compilam
   ------------------------------------------------------------------------- */

export const RECIPES = [
    {
        name: 'Landing page completa',
        when: 'Página de produto ou serviço, do topo ao rodapé.',
        code: `import { useState } from 'react'
import { IconArrowRight, IconLock, IconRocket, IconSettings } from '@tabler/icons-react'
import {
    Layout, Header, Hero, SocialProof, StatsGrid, FeatureSplit,
    Steps, Comparison, Pricing, Testimonials, FAQ, CTABanner, Footer, Wordmark,
} from '@ciromaciel/components-kit'

export default function LandingPage() {
    const [billing, setBilling] = useState('monthly')

    return (
        <Layout>
            <Header
                logo={<Wordmark>Acme</Wordmark>}
                navLinks={[{ label: 'Preço', href: '#preco' }]}
                signupCta={{ label: 'Criar conta', href: '/signup' }}
            />

            <main style={{ flex: 1 }}>
                {/* Palcos alternam white ↔ gray, sempre */}
                <Hero
                    background="white"
                    subtitle="Infraestrutura em português"
                    title={<>Login pronto<br />em uma tarde.</>}
                    description="Autenticação, sessões e permissões sem três semanas de trabalho."
                    cta={{ label: 'Começar grátis', href: '/signup', icon: <IconArrowRight size={18} /> }}
                    note="Grátis até 1.000 usuários ativos. Sem cartão."
                />

                <SocialProof title="Quem já usa" logos={[{ src: '/a.webp', alt: 'A' }]} />

                {/* Prova antes de preço */}
                <StatsGrid
                    background="gray"
                    subtitle="No ar agora"
                    title="O que você confere sem falar com ninguém"
                    items={[
                        { value: '99,9%', label: 'Uptime', description: 'Medido nos últimos 90 dias' },
                        { value: '<200ms', label: 'Latência p95', description: 'Do Brasil, medido de fora' },
                    ]}
                    note="Todo número aqui é verificável em dois minutos."
                />

                <FeatureSplit
                    background="white"
                    subtitle="Como funciona"
                    title="Uma linha para proteger uma rota."
                    featuresList={['Sessões com refresh automático', 'RBAC por rota']}
                    image="/codigo.webp"
                />

                <Steps
                    background="gray"
                    badge="Como funciona"
                    title="Três passos. Zero atrito."
                    items={[
                        { number: '01', icon: IconLock, title: 'Instale', description: 'Um comando.' },
                        { number: '02', icon: IconSettings, title: 'Configure', description: 'Um arquivo.' },
                        { number: '03', icon: IconRocket, title: 'No ar', description: 'Menos de dois minutos.' },
                    ]}
                />

                <Comparison
                    background="white"
                    subtitle="ROI do seu tempo"
                    traditionalCol={{
                        title: 'Do zero', subtitle: 'O caminho longo',
                        items: [{ label: 'Autenticação', value: '3 semanas' }],
                        totalValue: 'R$ 42.000', footerText: 'Sem contar manutenção',
                    }}
                    newCol={{
                        title: 'Com o kit', badge: 'RECOMENDADO',
                        description: 'Pronto para produção.',
                        items: ['Login em uma tarde'],
                        pricingBox: { label: 'Tempo até o ar', price: '30 min' },
                    }}
                />

                <Pricing
                    background="gray"
                    subtitle="Preço"
                    billing={billing}
                    setBilling={setBilling}
                    plans={[{
                        name: 'Pro',
                        description: 'Para times em produção.',
                        priceDisplay: { currency: 'R$', whole: '49', fraction: '90' },
                        period: '/mês',
                        features: ['Usuários ilimitados'],
                        highlight: true,
                        cta: { label: 'Começar', href: '/signup' },
                    }]}
                />

                <Testimonials
                    background="white"
                    subtitle="Quem já fez"
                    items={[{ quote: 'Subimos em uma tarde.', name: 'Ana', role: 'CTO', company: 'Acme' }]}
                />

                <FAQ
                    background="gray"
                    subtitle="Perguntas difíceis"
                    questions={[{ question: 'Consigo exportar?', answer: 'Sim, JSON e CSV.' }]}
                />

                {/* CTABanner sempre fecha */}
                <CTABanner
                    background="white"
                    subtitle="Pronto para começar"
                    title="Suba seu primeiro projeto hoje."
                    cta={{ label: 'Criar conta', href: '/signup', icon: <IconArrowRight size={18} /> }}
                />
            </main>

            <Footer
                background="gray"
                description="Infraestrutura em português."
                sections={[{ title: 'Produto', links: [{ label: 'Preço', href: '#preco' }] }]}
                copyrightText={\`© \${new Date().getFullYear()} Acme.\`}
            />
        </Layout>
    )
}`,
    },
    {
        name: 'Tela de painel completa',
        when: 'Lista de dados numa aplicação: cabeçalho, busca, filtros, tabela, estados. É a receita para qualquer tela de dashboard.',
        code: `import { useMemo, useState } from 'react'
import { Box, Card, Group, Skeleton, Stack, Text, Title } from '@mantine/core'
import { IconPlus, IconSearch } from '@tabler/icons-react'

const COLS = '2.4fr 1fr 1fr 40px'   // fr para conteúdo, px fixo para ações
const HEAD = { fz: 10, fw: 800, c: 'gray.5', tt: 'uppercase', lts: '1.5px' }

export default function InvoicesPage({ invoices = [], loading, onOpen, onCreate }) {
    const [term, setTerm] = useState('')

    const rows = useMemo(() => {
        const q = term.trim().toLowerCase()
        if (!q) return invoices
        return invoices.filter(i => i.number.toLowerCase().includes(q) || i.customer.toLowerCase().includes(q))
    }, [invoices, term])

    return (
        <Box px={48} pt={40} pb={80} maw={1280} mx="auto">
            {/* Cabeçalho: crumb + título + subtítulo, ações à direita */}
            <Group justify="space-between" align="flex-start" wrap="nowrap" gap={24} mb={32}>
                <Stack gap={8} flex={1} miw={0}>
                    <Text fz={10} fw={800} c="gray.4" tt="uppercase" lts="1.5px">
                        + Acme · Produção · Faturas
                    </Text>
                    <Title order={1} fz={36} fw={900} lh={1} lts="-0.04em">Faturas</Title>
                    <Text fz={15} fw={500} c="gray.6" lh={1.5}>
                        Tudo o que foi cobrado nesta aplicação.
                    </Text>
                </Stack>
                <Group gap="md" wrap="nowrap" flex="none">
                    <Box
                        component="button"
                        onClick={onCreate}
                        px="md" py={8} bg="gray.9" c="white" fz={12} fw={800} tt="uppercase"
                        style={{ letterSpacing: '1px', border: 'none', borderRadius: 0, cursor: 'pointer' }}
                    >
                        Nova fatura
                    </Box>
                </Group>
            </Group>

            <Card p={0} withBorder radius="0" style={{ overflow: 'hidden' }}>
                {/* Busca local — filtra a lista desta tela */}
                <Group px="md" py="sm" justify="space-between" wrap="nowrap"
                    style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                    <Group gap="xs" wrap="nowrap" flex={1} px="sm" py={6}
                        style={{ border: '1px solid var(--mantine-color-gray-2)', borderRadius: 0 }}>
                        <IconSearch size={16} stroke={1.5} color="var(--mantine-color-gray-4)" />
                        <Box
                            component="input"
                            value={term}
                            onChange={e => setTerm(e.currentTarget.value)}
                            onKeyDown={e => e.key === 'Escape' && setTerm('')}
                            placeholder="Buscar por número ou cliente…"
                            style={{ border: 'none', outline: 'none', background: 'transparent',
                                fontFamily: 'inherit', fontSize: 13, width: '100%' }}
                        />
                    </Group>
                    <Text fz={11} fw={800} c="gray.4" tt="uppercase" lts="1.5px" style={{ flexShrink: 0 }}>
                        {rows.length} {rows.length === 1 ? 'fatura' : 'faturas'}
                    </Text>
                </Group>

                {/* Header da tabela */}
                <Box bg="gray.1" style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12,
                    alignItems: 'center', padding: '12px 24px',
                    borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                    <Text {...HEAD}>Fatura</Text>
                    <Text {...HEAD}>Status</Text>
                    <Text {...HEAD}>Valor</Text>
                    <Box />
                </Box>

                {/* Carregando: o skeleton tem a MESMA grade da tabela */}
                {loading && rows.length === 0 &&
                    Array.from({ length: 5 }, (_, i) => (
                        <Box key={i} style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12,
                            alignItems: 'center', padding: '14px 24px',
                            borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                            <Skeleton height={14} width="60%" radius="0" />
                            <Skeleton height={14} width="50%" radius="0" />
                            <Skeleton height={14} width="40%" radius="0" />
                            <Box />
                        </Box>
                    ))}

                {/* Vazio: label uppercase + subtítulo, citando o termo quando houver */}
                {!loading && rows.length === 0 && (
                    <Stack align="center" gap={8} py={56}>
                        <Text fz={10} fw={800} c="gray.4" tt="uppercase" lts="1.5px">
                            {term ? 'Nenhum resultado' : 'Sem faturas'}
                        </Text>
                        <Text fz={12} c="gray.5" fs="italic">
                            {term ? \`Nada encontrado para «\${term}».\` : 'Nada foi cobrado ainda.'}
                        </Text>
                    </Stack>
                )}

                {/* Linhas: a linha inteira é clicável; texto é o papel "dado" */}
                {rows.map((row, i) => (
                    <Box
                        key={row.id}
                        onClick={() => onOpen(row)}
                        style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12,
                            alignItems: 'center', padding: '14px 24px', cursor: 'pointer',
                            transition: 'background 120ms ease',
                            borderBottom: i === rows.length - 1 ? 'none'
                                : '1px solid var(--mantine-color-gray-2)' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--mantine-color-gray-1)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                        <Box miw={0}>
                            <Text fz={13} fw={700} c="gray.9" lineClamp={1}>{row.number}</Text>
                            <Text fz={12} c="gray.5" lineClamp={1}>{row.customer}</Text>
                        </Box>
                        <Text fz={13} c="gray.7">{row.status}</Text>
                        <Text fz={13} c="gray.7" ff="monospace">{row.amount}</Text>
                        <Text fz={13} c="gray.5" ta="center" aria-hidden>⋯</Text>
                    </Box>
                ))}
            </Card>
        </Box>
    )
}`,
    },
    {
        name: 'Página 404',
        when: 'O CTABanner é a única seção — por isso titleOrder={1}.',
        code: `import { CTABanner } from '@ciromaciel/components-kit'
import { IconArrowLeft } from '@tabler/icons-react'

export default function NotFoundPage() {
    return (
        <CTABanner
            titleOrder={1}
            subtitle="Erro 404"
            title="Esta página não existe."
            description="O link pode ter mudado de lugar."
            cta={{ label: 'Voltar ao início', href: '/', leftSection: <IconArrowLeft size={18} /> }}
        />
    )
}`,
    },
    {
        name: 'Página legal',
        when: 'Privacidade, termos ou segurança — container md, leitura contínua.',
        code: `import { LegalPrivacy } from '@ciromaciel/components-kit'

export default function PrivacyPage() {
    return <LegalPrivacy companyName="Acme Ltda" productName="o Acme Cloud" />
}`,
    },
    {
        name: 'Seção customizada',
        when: 'O vocabulário não cobre o caso. Envolva Section — nunca refaça o palco.',
        code: `import { Box, SimpleGrid, Text } from '@mantine/core'
import { Section, CTAButton } from '@ciromaciel/components-kit'

export function IntegrationsGrid({ id, subtitle, title, items = [], cta, note, background = 'white' }) {
    return (
        <Section id={id} subtitle={subtitle} title={title} background={background}>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
                {items.map((item, i) => (
                    <Box key={item.title || i}>
                        <Text fz="lg" fw={800} c="gray.9" mb="xs">{item.title}</Text>
                        <Text c="gray.6" lh={1.7}>{item.description}</Text>
                    </Box>
                ))}
            </SimpleGrid>
            {cta && <CTAButton {...cta} />}
            {note && <Text size="sm" c="gray.6" mt={40}>{note}</Text>}
        </Section>
    )
}`,
    },
]

/* -------------------------------------------------------------------------
   Erros frequentes
   ------------------------------------------------------------------------- */

export const PITFALLS = [
    {
        wrong: "import { theme } from './meu-theme'",
        right: "import { theme } from '@ciromaciel/components-kit'",
        why: 'O theme do kit já traz paleta, tipografia e defaults. Redefinir no consumidor cria um segundo sistema.',
    },
    {
        wrong: '<Section><Container><Stack>…</Stack></Container></Section>',
        right: '<Section>…</Section>',
        why: 'Section já é Box + Container + Stack. Aninhar outro Container dobra o padding e quebra a largura.',
    },
    {
        wrong: 'items={[{ icon: <IconLock /> }]}',
        right: 'items={[{ icon: IconLock }]}',
        why: 'Steps e ProductGrid recebem o componente e o instanciam com o tamanho certo. Um elemento pronto ignora o dimensionamento.',
    },
    {
        wrong: '<Hero title={<>Linha um<br />Linha dois</>} />',
        right: '<Hero title={<span className="hide-mobile-br">Linha um<br />Linha dois</span>} />',
        why: 'Sem a classe, a quebra manual persiste no celular e corta a frase em lugar errado.',
    },
    {
        wrong: '<StatsGrid items={[{ value: "99,9%", label: "Uptime" }]} />',
        right: '<StatsGrid items={[{ value: "99,9%", label: "Uptime", description: "Medido nos últimos 90 dias" }]} />',
        why: 'Lei 5: número forte sem nota de verificação é propaganda, não design.',
    },
    {
        wrong: '<Hero background="white" /><StatsGrid background="white" />',
        right: '<Hero background="white" /><StatsGrid background="gray" />',
        why: 'Palcos consecutivos alternam. Dois brancos seguidos apagam o ritmo do scroll.',
    },
    {
        wrong: '<Text c="gray.9">parágrafo longo…</Text>',
        right: '<Text c="gray.6">parágrafo longo…</Text>',
        why: 'Corpo em preto absoluto achata a hierarquia — o título deixa de liderar.',
    },
    {
        wrong: '<Paper radius="md" shadow="sm">',
        right: '<Paper radius="0" bd="1px solid var(--mantine-color-gray-2)">',
        why: 'Raio e sombra são cromo sem informação. A delimitação é o filete de 1px.',
    },
    {
        wrong: '<Pricing plans={plans} />',
        right: 'const [billing, setBilling] = useState("monthly")\n<Pricing billing={billing} setBilling={setBilling} plans={plans} />',
        why: 'O seletor mensal/anual é controlado. Sem o par billing/setBilling ele trava.',
    },
    {
        wrong: '<FeaturesGrid items={[{ visual: { type: "chart" } }]} />',
        right: '<FeaturesGrid items={[{ visual: { type: "bars", data: [40, 70, 100] } }]} />',
        why: "Só existem cinco tipos: metric, ring, bars, typography, icon-large. Um tipo desconhecido não renderiza nada.",
    },
]
