import { useMemo, useState } from 'react'
import { Anchor, Box, Button, Container, Group, SimpleGrid, Stack, Table, Text, TextInput, Title, UnstyledButton } from '@mantine/core'
import { Link, useParams } from 'react-router-dom'
import {
    IconActivityHeartbeat,
    IconArrowLeft,
    IconArrowRight,
    IconBoltFilled,
    IconBrandApple,
    IconBrandBing,
    IconBrandGoogle,
    IconBrandGoogleAnalytics,
    IconBrandGoogleDrive,
    IconBrandGooglePlay,
    IconBrandYoutube,
    IconBuildingStore,
    IconCalendarTime,
    IconChartBar,
    IconCheck,
    IconChecklist,
    IconCode,
    IconCopy,
    IconCreditCard,
    IconDatabase,
    IconExternalLink,
    IconFileText,
    IconForms,
    IconLink,
    IconLock,
    IconMail,
    IconMailOpened,
    IconNews,
    IconPlugConnected,
    IconPresentation,
    IconRss,
    IconSearch,
    IconUsers,
    IconVideo,
    IconWorldWww,
} from '@tabler/icons-react'
import { SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { useSeoMeta } from '../hooks/useSeoMeta'
import { MCP, mcpItem, mcpSiblings } from '../data/mcp'
import { mcpIndexSeo, mcpSeo } from '../data/seo'
import { NotFound } from './NotFound'

/**
 * /mcp and /mcp/<id>: what an MCP connector is, every one of the Ciro's
 * connectors, and a page per connector.
 *
 * The words come from data/mcp.js and, for each connector, from the catalog of
 * mcp.myagents.click (the same words as its own page), which
 * scripts/prerender.js also reads: what a crawler gets is what the reader sees.
 */

const BORDER = '1px solid var(--mantine-color-gray-2)'

const ICONS = {
    hoster: IconWorldWww,
    functions: IconCode,
    monitors: IconActivityHeartbeat,
    storage: IconDatabase,
    auth: IconLock,
    messages: IconMail,
    payments: IconCreditCard,
    tasks: IconChecklist,
    videos: IconVideo,
    analytics: IconChartBar,
    people: IconUsers,
    feeds: IconRss,
    blogs: IconNews,
    pages: IconFileText,
    newsletter: IconMailOpened,
    forms: IconForms,
    links: IconLink,
    decks: IconPresentation,
    'search-console': IconBrandGoogle,
    'bing-webmaster': IconBrandBing,
    'google-analytics': IconBrandGoogleAnalytics,
    youtube: IconBrandYoutube,
    'google-calendar': IconCalendarTime,
    'google-drive': IconBrandGoogleDrive,
    'google-business-profile': IconBuildingStore,
    'app-store-connect': IconBrandApple,
    'google-play': IconBrandGooglePlay,
}

// 21/10/2026: Ciro wants the house bolt on every connector, the services'
// included. ICONS stays, so going back is this one line.
const USE_BOLT = true

const iconOf = id => (USE_BOLT ? IconBoltFilled : ICONS[id] || IconPlugConnected)
const needsApproval = tool => /pede aprovação/i.test(tool.text)

/** Accents and case do not matter in the search: "agenda" finds "Agenda". */
const normalize = text =>
    String(text || '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()

function Eyebrow({ children, c = 'gray.5' }) {
    return (
        <Text
            fz={13}
            fw={800}
            tt="uppercase"
            c={c}
            lts="1.5px"
        >
            {children}
        </Text>
    )
}

function SectionTitle({ eyebrow, title, text }) {
    return (
        <Stack
            gap="xs"
            maw={760}
        >
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Title
                order={2}
                fz={{ base: 26, md: 34 }}
                lh={1.15}
                c="gray.9"
                style={{ letterSpacing: '-0.02em' }}
            >
                {title}
            </Title>
            {text && (
                <Text
                    c="gray.6"
                    lh={1.6}
                >
                    {text}
                </Text>
            )}
        </Stack>
    )
}

/** The MCP address, with the button that copies it. */
function Endpoint({ address }) {
    const [isCopied, setIsCopied] = useState(false)
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(address)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 1600)
        } catch {}
    }
    return (
        <Box
            bg="white"
            style={{ border: BORDER }}
        >
            <Text
                px="md"
                pt="sm"
                fz={10}
                fw={800}
                tt="uppercase"
                lts="1.5px"
                c="gray.5"
            >
                Endereço MCP
            </Text>
            <Group
                gap={0}
                wrap="nowrap"
                align="stretch"
                mt={6}
                style={{ borderTop: BORDER }}
            >
                <Text
                    px="md"
                    py="sm"
                    ff="monospace"
                    fz={13}
                    c="gray.9"
                    style={{ flex: 1, minWidth: 0, overflowX: 'auto', whiteSpace: 'nowrap' }}
                >
                    {address}
                </Text>
                <UnstyledButton
                    onClick={copy}
                    px="md"
                    bg="gray.9"
                    c="white"
                    aria-label="Copiar o endereço MCP"
                    style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 'none' }}
                >
                    {isCopied ? (
                        <IconCheck
                            size={16}
                            stroke={1.5}
                        />
                    ) : (
                        <IconCopy
                            size={16}
                            stroke={1.5}
                        />
                    )}
                    <Text
                        fz={11}
                        fw={800}
                        tt="uppercase"
                        lts="1px"
                    >
                        {isCopied ? 'Copiado' : 'Copiar'}
                    </Text>
                </UnstyledButton>
            </Group>
        </Box>
    )
}

/** One connector in the list: what it does, how you sign in, how many tools. */
function ConnectorCard({ item }) {
    const Icon = iconOf(item.id)
    return (
        <Box
            component={Link}
            to={`${MCP.path}/${item.id}`}
            p={{ base: 'lg', md: 'xl' }}
            className="mcp-card"
            style={{ borderRight: BORDER, borderBottom: BORDER, textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: 12 }}
        >
            <Group
                justify="space-between"
                align="flex-start"
                wrap="nowrap"
            >
                <Icon
                    size={28}
                    stroke={1.5}
                    color="var(--mantine-color-gray-9)"
                />
                <Text
                    fz={10}
                    fw={800}
                    tt="uppercase"
                    lts="1.5px"
                    c="gray.5"
                    ta="right"
                >
                    {item.details.signIn.label}
                </Text>
            </Group>
            <Stack
                gap={6}
                style={{ flex: 1 }}
            >
                <Text
                    fw={800}
                    fz={18}
                    c="gray.9"
                >
                    {item.title}
                </Text>
                <Text
                    c="gray.6"
                    lh={1.55}
                    fz={15}
                >
                    {item.description}
                </Text>
            </Stack>
            <Group
                justify="space-between"
                c="gray.9"
            >
                <Text
                    fz={13}
                    c="gray.5"
                >
                    {item.toolCount} ferramentas · {item.details.canWrite ? 'lê e age' : 'só leitura'}
                </Text>
                <IconArrowRight
                    size={16}
                    stroke={1.5}
                />
            </Group>
        </Box>
    )
}

function CardGrid({ items, cols = { base: 1, sm: 2, md: 3 } }) {
    return (
        <SimpleGrid
            cols={cols}
            spacing={0}
            style={{ borderTop: BORDER, borderLeft: BORDER }}
        >
            {items.map(item => (
                <ConnectorCard
                    key={item.id}
                    item={item}
                />
            ))}
        </SimpleGrid>
    )
}

/** Numbered cells: the three steps, the promises, the tools. */
function Cells({ items, cols = { base: 1, md: 3 }, render }) {
    return (
        <SimpleGrid
            cols={cols}
            spacing={0}
            style={{ borderTop: BORDER, borderLeft: BORDER }}
        >
            {items.map((item, index) => (
                <Box
                    key={item.title || item.name || index}
                    p={{ base: 'lg', md: 'xl' }}
                    bg="white"
                    style={{ borderRight: BORDER, borderBottom: BORDER }}
                >
                    {render(item, index)}
                </Box>
            ))}
        </SimpleGrid>
    )
}

function Step({ index, title, text }) {
    return (
        <Stack gap="xs">
            <Text
                fz={40}
                fw={900}
                lh={1}
                c="gray.9"
                style={{ letterSpacing: '-0.04em' }}
            >
                {index + 1}
            </Text>
            <Text
                fw={800}
                c="gray.9"
                mt={6}
            >
                {title}
            </Text>
            <Text
                c="gray.6"
                lh={1.6}
                fz={15}
            >
                {text}
            </Text>
        </Stack>
    )
}

function Chip({ label, count, isActive, onClick }) {
    return (
        <UnstyledButton
            onClick={onClick}
            px="md"
            py={8}
            bg={isActive ? 'gray.9' : 'white'}
            c={isActive ? 'white' : 'gray.7'}
            style={{ border: isActive ? '1px solid var(--mantine-color-gray-9)' : BORDER }}
        >
            <Text
                fz={13}
                fw={isActive ? 800 : 500}
            >
                {label}{' '}
                <Text
                    span
                    c={isActive ? 'gray.4' : 'gray.5'}
                    fz={12}
                >
                    {count}
                </Text>
            </Text>
        </UnstyledButton>
    )
}

/** What an MCP connector does, in one exchange: the question, the tool, the answer. */
function HeroDemo() {
    const Line = ({ label, children, isDark }) => (
        <Box
            px="md"
            py="md"
            bg={isDark ? 'gray.9' : 'white'}
            style={{ borderTop: BORDER }}
        >
            <Text
                fz={10}
                fw={800}
                tt="uppercase"
                lts="1.5px"
                c={isDark ? 'gray.4' : 'gray.5'}
                mb={6}
            >
                {label}
            </Text>
            {children}
        </Box>
    )
    return (
        <Box
            bg="white"
            style={{ border: BORDER, alignSelf: 'center' }}
            aria-label="Exemplo de conversa com um conector MCP"
        >
            <Text
                px="md"
                py="sm"
                bg="gray.0"
                fz={10}
                fw={800}
                tt="uppercase"
                lts="1.5px"
                c="gray.5"
            >
                Como fica na conversa
            </Text>
            <Line label="Você">
                <Text
                    fw={700}
                    fz={15}
                    c="gray.9"
                >
                    “Quais páginas do meu site mais caíram no Google este mês?”
                </Text>
            </Line>
            <Line label="O assistente usa o conector">
                <Group
                    gap="xs"
                    wrap="nowrap"
                >
                    <IconBrandGoogle
                        size={18}
                        stroke={1.5}
                        color="var(--mantine-color-gray-9)"
                    />
                    <Text
                        fz={14}
                        c="gray.9"
                        fw={700}
                    >
                        Google Search Console
                    </Text>
                    <Text
                        ff="monospace"
                        fz={12}
                        c="gray.5"
                    >
                        compare_periods
                    </Text>
                </Group>
            </Line>
            <Line
                label="A resposta"
                isDark
            >
                <Text
                    fz={14}
                    c="white"
                    lh={1.6}
                >
                    “/precos perdeu 31% dos cliques e caiu da posição 3,1 para 5,4. /blog/proposta caiu 18%. As outras subiram.”
                </Text>
            </Line>
            <Text
                px="md"
                py="sm"
                fz={12}
                c="gray.5"
                bg="gray.0"
                style={{ borderTop: BORDER }}
            >
                Exemplo ilustrativo. Ler é livre; o que muda algo pede a sua aprovação.
            </Text>
        </Box>
    )
}

/** /mcp: what an MCP connector is, then every connector, filterable. */
export function McpIndex() {
    useSeoMeta(mcpIndexSeo())
    const [filter, setFilter] = useState('all')
    const [query, setQuery] = useState('')

    const groups = useMemo(() => {
        const words = normalize(query).split(/\s+/).filter(Boolean)
        const matches = item => {
            const haystack = normalize([item.title, item.description, item.line, item.details.headline, ...item.details.tools.map(tool => `${tool.name} ${tool.title} ${tool.text}`)].join(' '))
            return words.every(word => haystack.includes(word))
        }
        return MCP.groups
            .filter(group => filter === 'all' || group.id === filter)
            .map(group => ({ ...group, items: group.items.filter(matches) }))
            .filter(group => group.items.length)
    }, [filter, query])

    return (
        <>
            <Box
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 64, md: 104 }}
            >
                <Container size="lg">
                    <SimpleGrid
                        cols={{ base: 1, md: 2 }}
                        spacing={{ base: 40, md: 64 }}
                    >
                        <Stack gap="lg">
                            <Eyebrow>
                                {MCP.eyebrow} · {MCP.count} conectores
                            </Eyebrow>
                            <Text
                                c="gray.9"
                                component="h1"
                                m={0}
                                fz={{ base: 32, sm: 42, md: 50 }}
                                lh={1.08}
                                fw={900}
                                style={{ letterSpacing: '-0.04em', textWrap: 'balance' }}
                            >
                                {MCP.title}
                            </Text>
                            <Text
                                fz={{ base: 17, md: 19 }}
                                c="gray.6"
                                lh={1.6}
                                maw={720}
                            >
                                {MCP.lead}
                            </Text>
                            <Group gap="md">
                                <Button
                                    component="a"
                                    href="#conectores"
                                    radius={0}
                                    color="gray.9"
                                    size="md"
                                    rightSection={
                                        <IconArrowRight
                                            size={16}
                                            stroke={1.5}
                                        />
                                    }
                                >
                                    Ver os conectores
                                </Button>
                                <Button
                                    component="a"
                                    href="#como-funciona"
                                    radius={0}
                                    variant="default"
                                    size="md"
                                >
                                    Como funciona
                                </Button>
                            </Group>
                        </Stack>
                        <HeroDemo />
                    </SimpleGrid>
                </Container>
            </Box>

            <Box
                id="como-funciona"
                py={{ base: 64, md: 96 }}
            >
                <Container size="lg">
                    <Stack gap="xl">
                        <SectionTitle
                            eyebrow={MCP.explain.eyebrow}
                            title={MCP.explain.title}
                            text="MCP é o padrão aberto que liga um assistente de IA a um serviço. O servidor do serviço diz o que dá para fazer; o assistente usa quando você pede."
                        />
                        <Cells
                            items={MCP.explain.steps}
                            render={(step, index) => (
                                <Step
                                    index={index}
                                    {...step}
                                />
                            )}
                        />
                    </Stack>
                </Container>
            </Box>

            <Box
                id="conectores"
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 64, md: 96 }}
                style={{ scrollMarginTop: 72 }}
            >
                <Container size="lg">
                    <Stack gap={48}>
                        <Stack gap="lg">
                            <SectionTitle
                                eyebrow="Os conectores"
                                title="Escolha o serviço"
                            />
                            <TextInput
                                value={query}
                                onChange={event => setQuery(event.currentTarget.value)}
                                placeholder="Buscar: agenda, avaliações, deploy, newsletter…"
                                aria-label="Buscar conectores"
                                radius={0}
                                size="md"
                                maw={520}
                                leftSection={
                                    <IconSearch
                                        size={18}
                                        stroke={1.5}
                                    />
                                }
                            />
                            <Group gap={8}>
                                <Chip
                                    label="Todos"
                                    count={MCP.count}
                                    isActive={filter === 'all'}
                                    onClick={() => setFilter('all')}
                                />
                                {MCP.groups.map(group => (
                                    <Chip
                                        key={group.id}
                                        label={group.label}
                                        count={group.items.length}
                                        isActive={filter === group.id}
                                        onClick={() => setFilter(group.id)}
                                    />
                                ))}
                            </Group>
                        </Stack>

                        {groups.map(group => (
                            <Stack
                                key={group.id}
                                gap="md"
                            >
                                <Stack gap={4}>
                                    <Title
                                        order={3}
                                        fz={{ base: 20, md: 24 }}
                                        c="gray.9"
                                    >
                                        {group.title}
                                    </Title>
                                    <Text
                                        c="gray.6"
                                        lh={1.6}
                                        maw={720}
                                    >
                                        {group.text}
                                    </Text>
                                </Stack>
                                <CardGrid items={group.items} />
                            </Stack>
                        ))}
                        {!groups.length && <Text c="gray.6">Nenhum conector com “{query}”. Tente outra palavra.</Text>}
                    </Stack>
                </Container>
            </Box>

            <Box py={{ base: 64, md: 96 }}>
                <Container size="lg">
                    <Stack gap="xl">
                        <SectionTitle
                            eyebrow="Os seus dados"
                            title="Você no controle"
                        />
                        <Cells
                            items={MCP.trust}
                            cols={{ base: 1, sm: 2 }}
                            render={cell => (
                                <Stack gap="xs">
                                    <Text
                                        fw={800}
                                        c="gray.9"
                                    >
                                        {cell.title}
                                    </Text>
                                    <Text
                                        c="gray.6"
                                        lh={1.6}
                                        fz={15}
                                    >
                                        {cell.text}
                                    </Text>
                                </Stack>
                            )}
                        />
                    </Stack>
                </Container>
            </Box>

            <Box
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 64, md: 96 }}
            >
                <Container size="lg">
                    <Stack
                        gap="xl"
                        maw={820}
                    >
                        <SectionTitle
                            eyebrow="Perguntas"
                            title="O que costumam perguntar"
                        />
                        <Stack gap="lg">
                            {MCP.faq.map(entry => (
                                <Stack
                                    key={entry.question}
                                    gap={6}
                                    pb="lg"
                                    style={{ borderBottom: BORDER }}
                                >
                                    <Title
                                        order={3}
                                        fz={18}
                                        c="gray.9"
                                    >
                                        {entry.question}
                                    </Title>
                                    <Text
                                        c="gray.6"
                                        lh={1.7}
                                    >
                                        {entry.answer}
                                    </Text>
                                </Stack>
                            ))}
                        </Stack>
                        <Text
                            fz="sm"
                            c="gray.5"
                        >
                            A lista também está em{' '}
                            <Anchor
                                href={MCP.directory}
                                c="gray.9"
                            >
                                mcp.myagents.click
                            </Anchor>
                            , com um endereço próprio para cada conector.
                        </Text>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

/** /mcp/<id>: one connector, the way its own page shows it, and how to connect it. */
export function McpPage() {
    const { id } = useParams()
    const item = mcpItem(id)
    useSeoMeta(item ? mcpSeo(item) : { title: 'Página não encontrada', description: '', url: `${MCP.path}/${id}` })
    if (!item) return <NotFound />

    const { details } = item
    const Icon = iconOf(item.id)
    const siblings = mcpSiblings(item)
    const steps = [
        {
            title: 'Cole o endereço',
            text: item.addressPrefix
                ? `Copie o endereço MCP do seu projeto no painel do ${item.title} e cole no seu assistente. No Assistant, ele já está na loja.`
                : 'Adicione o endereço MCP como conector no seu assistente. No Assistant, ele já está na loja: é só clicar em Conectar.',
        },
        {
            title: { google: 'Entre com o Google', key: 'Cole a sua chave', open: 'Autorize e pronto' }[details.signIn.kind] || `Entre com a conta do ${item.line}`,
            text: details.signIn.text || (details.signIn.kind === 'line' ? `O mesmo login de todos os produtos do ${item.line}, com um código no seu e-mail. A autorização é por produto.` : 'Você vê o que o conector pede antes de aprovar.'),
        },
        { title: 'Peça em português', text: details.canWrite ? 'Pergunte do jeito que você falaria. O que muda alguma coisa espera a sua aprovação.' : 'Pergunte do jeito que você falaria. Tudo aqui é só leitura: nada muda no serviço.' },
    ]

    return (
        <>
            <Box
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 56, md: 88 }}
            >
                <Container size="lg">
                    <SimpleGrid
                        cols={{ base: 1, md: 2 }}
                        spacing={{ base: 40, md: 64 }}
                    >
                        <Stack gap="lg">
                            <Anchor
                                component={Link}
                                to={MCP.path}
                                c="gray.6"
                                fz={13}
                                fw={800}
                                tt="uppercase"
                                lts="1.5px"
                                underline="never"
                            >
                                <Group
                                    gap={6}
                                    component="span"
                                >
                                    <IconArrowLeft
                                        size={16}
                                        stroke={1.5}
                                    />
                                    Conectores MCP
                                </Group>
                            </Anchor>
                            <Group
                                gap="sm"
                                wrap="nowrap"
                            >
                                <Icon
                                    size={32}
                                    stroke={1.5}
                                    color="var(--mantine-color-gray-9)"
                                />
                                <Eyebrow>
                                    {item.title} · {item.line === 'Agents' ? 'Serviço' : item.line}
                                </Eyebrow>
                            </Group>
                            <Text
                                c="gray.9"
                                component="h1"
                                m={0}
                                fz={{ base: 30, sm: 40, md: 48 }}
                                lh={1.1}
                                fw={900}
                                style={{ letterSpacing: '-0.04em', textWrap: 'balance' }}
                            >
                                {details.headline}
                            </Text>
                            <Text
                                fz={{ base: 16, md: 18 }}
                                c="gray.6"
                                lh={1.6}
                            >
                                {details.lede}
                            </Text>
                            <Endpoint address={item.address} />
                            <Text
                                fz={13}
                                c="gray.5"
                            >
                                {details.signIn.label} · {item.toolCount} ferramentas · {details.canWrite ? 'lê e, com a sua aprovação, age' : 'só leitura'}
                            </Text>
                        </Stack>
                        <Example details={details} />
                    </SimpleGrid>
                </Container>
            </Box>

            <Box py={{ base: 64, md: 88 }}>
                <Container size="lg">
                    <Stack gap="xl">
                        <SectionTitle
                            eyebrow="Como conectar"
                            title="Três passos, uma vez só"
                        />
                        <Cells
                            items={steps}
                            render={(step, index) => (
                                <Step
                                    index={index}
                                    {...step}
                                />
                            )}
                        />
                    </Stack>
                </Container>
            </Box>

            <Box
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 64, md: 88 }}
            >
                <Container size="lg">
                    <Stack gap="xl">
                        <SectionTitle
                            eyebrow="Ferramentas"
                            title={details.canWrite ? 'Tudo que o agente consegue fazer' : 'Tudo que o agente consegue ler'}
                        />
                        <Cells
                            items={details.tools}
                            render={tool => (
                                <Stack gap={6}>
                                    <Group
                                        justify="space-between"
                                        wrap="nowrap"
                                        gap="xs"
                                    >
                                        <Text
                                            ff="monospace"
                                            fz={12}
                                            c="gray.5"
                                            style={{ overflowWrap: 'anywhere' }}
                                        >
                                            {tool.name}
                                        </Text>
                                        {needsApproval(tool) && (
                                            <Text
                                                fz={10}
                                                fw={800}
                                                tt="uppercase"
                                                lts="1px"
                                                c="gray.9"
                                                style={{ flex: 'none' }}
                                            >
                                                Pede aprovação
                                            </Text>
                                        )}
                                    </Group>
                                    <Text
                                        fw={800}
                                        c="gray.9"
                                    >
                                        {tool.title}
                                    </Text>
                                    <Text
                                        c="gray.6"
                                        lh={1.55}
                                        fz={15}
                                    >
                                        {tool.text.replace(/\s*Pede aprovação\.?/i, '')}
                                    </Text>
                                </Stack>
                            )}
                        />
                    </Stack>
                </Container>
            </Box>

            <Box py={{ base: 64, md: 88 }}>
                <Container size="lg">
                    <Stack gap="xl">
                        <SectionTitle
                            eyebrow="Os seus dados"
                            title="Você no controle"
                        />
                        <Cells
                            items={details.data}
                            cols={{ base: 1, sm: 2 }}
                            render={cell => (
                                <Stack gap="xs">
                                    <Text
                                        fw={800}
                                        c="gray.9"
                                    >
                                        {cell.title}
                                    </Text>
                                    <Text
                                        c="gray.6"
                                        lh={1.6}
                                        fz={15}
                                    >
                                        {cell.text}
                                    </Text>
                                </Stack>
                            )}
                        />
                        <Group gap="lg">
                            <Anchor
                                href={item.homepage}
                                c="gray.9"
                                fw={700}
                                fz="sm"
                            >
                                <Group
                                    gap={6}
                                    component="span"
                                >
                                    Página do conector
                                    <IconExternalLink
                                        size={14}
                                        stroke={1.5}
                                    />
                                </Group>
                            </Anchor>
                            <Anchor
                                href={`${item.homepage}/privacy`}
                                c="gray.6"
                                fz="sm"
                            >
                                Privacidade
                            </Anchor>
                            <Anchor
                                href={`${item.homepage}/terms`}
                                c="gray.6"
                                fz="sm"
                            >
                                Termos
                            </Anchor>
                        </Group>
                    </Stack>
                </Container>
            </Box>

            {siblings.length > 0 && (
                <Box
                    bg={SECTION_BACKGROUNDS.gray}
                    py={{ base: 64, md: 88 }}
                >
                    <Container size="lg">
                        <Stack gap="xl">
                            <SectionTitle
                                eyebrow={item.line === 'Agents' ? 'Outros serviços' : `Mais do ${item.line}`}
                                title="Conecte também"
                            />
                            <CardGrid items={siblings.slice(0, 6)} />
                            <Anchor
                                component={Link}
                                to={MCP.path}
                                c="gray.9"
                                fw={700}
                            >
                                Ver todos os {MCP.count} conectores
                            </Anchor>
                        </Stack>
                    </Container>
                </Box>
            )}
        </>
    )
}

/** The right side of a connector's hero: a sample answer, or what to ask. */
function Example({ details }) {
    if (details.sample) {
        const { ask, tool, columns, rows, foot } = details.sample
        return (
            <Box
                bg="white"
                style={{ border: BORDER, alignSelf: 'center' }}
            >
                <Group
                    justify="space-between"
                    px="md"
                    py="sm"
                    bg="gray.0"
                    style={{ borderBottom: BORDER }}
                >
                    <Text
                        fz={10}
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.5"
                    >
                        Exemplo de resposta
                    </Text>
                    <Text
                        fz={10}
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.5"
                    >
                        {tool}
                    </Text>
                </Group>
                <Text
                    px="md"
                    pt="md"
                    pb="xs"
                    fw={700}
                    fz={14}
                    c="gray.9"
                >
                    “{ask}”
                </Text>
                <Box style={{ overflowX: 'auto' }}>
                    <Table
                        fz={13}
                        verticalSpacing={8}
                        horizontalSpacing="md"
                    >
                        <Table.Thead>
                            <Table.Tr>
                                {columns.map((column, index) => (
                                    <Table.Th
                                        key={column}
                                        ta={index ? 'right' : 'left'}
                                        fz={10}
                                        fw={800}
                                        tt="uppercase"
                                        c="gray.5"
                                        style={{ letterSpacing: '1.5px', whiteSpace: 'nowrap' }}
                                    >
                                        {column}
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows.map(row => (
                                <Table.Tr key={row.join('|')}>
                                    {row.map((cell, index) => (
                                        <Table.Td
                                            key={index}
                                            ta={index ? 'right' : 'left'}
                                            c={String(cell).startsWith('+') && index ? 'gray.9' : 'gray.7'}
                                            fw={String(cell).startsWith('+') && index ? 700 : 500}
                                            style={{ whiteSpace: index ? 'nowrap' : 'normal', fontVariantNumeric: 'tabular-nums' }}
                                        >
                                            {cell}
                                        </Table.Td>
                                    ))}
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Box>
                <Text
                    px="md"
                    py="sm"
                    fz={12}
                    c="gray.5"
                    bg="gray.0"
                    style={{ borderTop: BORDER }}
                >
                    {foot || 'Dados ilustrativos.'}
                </Text>
            </Box>
        )
    }
    return (
        <Box
            bg="white"
            style={{ border: BORDER, alignSelf: 'center' }}
        >
            <Text
                px="md"
                py="sm"
                bg="gray.0"
                fz={10}
                fw={800}
                tt="uppercase"
                lts="1.5px"
                c="gray.5"
                style={{ borderBottom: BORDER }}
            >
                O que perguntar
            </Text>
            {details.asks.map((ask, index) => (
                <Text
                    key={ask}
                    px="md"
                    py="md"
                    fw={700}
                    fz={14}
                    c="gray.9"
                    style={{ borderTop: index ? BORDER : 'none' }}
                >
                    “{ask}”
                </Text>
            ))}
        </Box>
    )
}
