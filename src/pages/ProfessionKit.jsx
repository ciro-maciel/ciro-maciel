import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useIsomorphicEffect, useMediaQuery } from '@mantine/hooks'
import {
    ActionIcon,
    Anchor,
    Box,
    Button,
    Container,
    CopyButton,
    Grid,
    Group,
    Paper,
    SegmentedControl,
    Select,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    Textarea,
    UnstyledButton,
} from '@mantine/core'
import { CTABanner, Section, SECTION_BACKGROUNDS, Steps } from '@ciromaciel/components-kit'
import {
    IconArrowLeft,
    IconBriefcase,
    IconCheck,
    IconChecklist,
    IconCopy,
    IconDownload,
    IconExternalLink,
    IconFileText,
    IconListSearch,
    IconPlus,
    IconRefresh,
    IconRoute,
    IconSearch,
    IconTrash,
} from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/useSeoMeta'
import { NotFound } from './NotFound'
import { bookBySlug } from '../data/catalog'
import FDE from '../data/kit-forward-deployed-engineer.json'

/**
 * /books/<slug>/kit for a profession book (level 4 of the series).
 *
 * A profession book ends every chapter with a document to fill in: the scope
 * of one page, the discovery script, the pilot plan, the agent card… This
 * page carries those documents word for word (scripts/sync-kit.js copies them
 * from the chapters) and lets the reader fill them in here, keep them in this
 * browser, copy them or save them as a file to take to the client.
 *
 * It differs from the kit of IA no escritório (BookKit.jsx) because the reader
 * differs: an engineer in front of a client needs documents and a method, not
 * prompts to paste. The bands are the same pieces of the house: Section,
 * Steps, CTABanner, on the greys.
 *
 * NOT LIVE BEFORE THE BOOK. brand/arquitetura.md keeps out of the site
 * anything not yet on sale. Until the book enters the catalogue (data/
 * catalog.js), the page answers 404 in production and opens only in
 * development, for review.
 */

export const PROFESSION_KITS = { 'forward-deployed-engineer': FDE }

// ─── Storage ─────────────────────────────────────────────────────────────

export function useStore(slug) {
    const prefix = `kit-${slug}:`
    return {
        get(key, fallback) {
            try {
                const value = localStorage.getItem(prefix + key)
                return value == null ? fallback : JSON.parse(value)
            } catch {
                return fallback
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(prefix + key, JSON.stringify(value))
            } catch {
                // Private window or blocked storage: the page works without it.
            }
        },
    }
}

function usePersisted(store, key, fallback) {
    // The fallback first, the saved value right after: the page is hydrated
    // from HTML written in the build, where nothing is saved (scripts/ssr.js).
    // Read in the initializer, a reader with saved answers would hydrate a
    // tree different from the HTML. The layout effect runs before the paint.
    const [value, setValue] = useState(fallback)
    useIsomorphicEffect(() => setValue(store.get(key, fallback)), [])
    const update = next => {
        setValue(prev => {
            const resolved = typeof next === 'function' ? next(prev) : next
            store.set(key, resolved)
            return resolved
        })
    }
    return [value, update]
}

// ─── Small pieces ────────────────────────────────────────────────────────

function Eyebrow({ children }) {
    return (
        <Text
            fz={13}
            fw={800}
            tt="uppercase"
            c="gray.5"
            lts="1.5px"
        >
            {children}
        </Text>
    )
}

function CopyAction({ value, label = 'Copiar' }) {
    const isPhone = useMediaQuery('(max-width: 36em)')
    return (
        <CopyButton value={value}>
            {({ copied, copy }) => (
                <Button
                    w={{ base: '100%', xs: 'auto' }}
                    onClick={copy}
                    radius={0}
                    color="gray.9"
                    size={isPhone ? 'xs' : 'sm'}
                    leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                >
                    {copied ? 'Copiado' : label}
                </Button>
            )}
        </CopyButton>
    )
}

function download(name, text) {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }))
    const link = Object.assign(document.createElement('a'), { href: url, download: name })
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
}

const fileName = name =>
    `${name
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}.md`

// ─── The triage of the steps ─────────────────────────────────────────────
//
// Chapter 11, "Quatro caixas para cada passo": before any agent, every step
// of the mapped process goes to one box. The tool keeps the rows here and
// copies them as the table the chapter prints.

const BOXES = [
    { value: 'apagar', label: 'Apagar', hint: 'Se sumisse amanhã, ninguém perceberia' },
    { value: 'codigo', label: 'Código', hint: 'Se X, então Y; sem julgamento' },
    { value: 'agente', label: 'Agente', hint: 'Julgamento, com histórico para se basear' },
    { value: 'pessoa', label: 'Pessoa', hint: 'Aprovar, negociar, assinar, pagar' },
]

// Fictitious, as the examples of the book are: a shop's accounts payable.
const TRIAGE_EXAMPLE = {
    process: 'Contas a pagar de uma loja (exemplo fictício)',
    rows: [
        { step: 'Baixar a nota que chega por e-mail', box: 'codigo', why: 'Anexo em PDF de remetente cadastrado: regra fixa' },
        { step: 'Imprimir a nota para o coordenador rubricar', box: 'apagar', why: 'A aprovação já fica registrada no ERP' },
        { step: 'Conferir a nota com o pedido de compra', box: 'codigo', why: 'Valor e itens iguais ao pedido: libera' },
        { step: 'Classificar a despesa', box: 'agente', why: 'Depende do item e do fornecedor; o histórico ensina as exceções' },
        { step: 'Aprovar acima de R$ 5.000', box: 'pessoa', why: 'Alçada do coordenador' },
        { step: 'Pagar', box: 'pessoa', why: 'A nota falsa tem cara de verdadeira; quem paga é uma pessoa' },
        { step: 'Mandar a planilha semanal de pagos ao financeiro', box: 'apagar', why: 'O relatório sai do ERP' },
    ],
}

const emptyRow = () => ({ step: '', box: '', why: '' })

function triageTable(process, rows) {
    const mark = (row, box) => (row.box === box ? 'x' : '')
    const lines = [
        `TRIAGEM DOS PASSOS — ${process || '<processo>'} — ${new Date().toLocaleDateString('pt-BR')}`,
        '',
        '| # | passo | apagar | código | agente | pessoa | por quê |',
        '|---|-------|--------|--------|--------|--------|---------|',
        ...rows.map((row, index) => `| ${index + 1} | ${row.step} | ${mark(row, 'apagar')} | ${mark(row, 'codigo')} | ${mark(row, 'agente')} | ${mark(row, 'pessoa')} | ${row.why} |`),
    ]
    return lines.join('\n')
}

function Triage({ store }) {
    const [process, setProcess] = usePersisted(store, 'triage-process', '')
    const [rows, setRows] = usePersisted(store, 'triage-rows', [emptyRow(), emptyRow(), emptyRow()])
    const isPhone = useMediaQuery('(max-width: 36em)')

    const edit = (index, patch) => setRows(prev => prev.map((row, i) => (i === index ? { ...row, ...patch } : row)))
    const counts = Object.fromEntries(BOXES.map(box => [box.value, rows.filter(row => row.box === box.value).length]))
    const filled = rows.filter(row => row.step.trim())

    return (
        <Section
            id="triagem"
            subtitle="Antes do agente"
            title="A triagem dos passos"
            background="white"
            maw={900}
        >
            <Text
                c="gray.6"
                size="lg"
                lh={1.7}
                maw={760}
                mb="xl"
            >
                A ferramenta do capítulo 11. Escreva os passos do processo como as pessoas contaram e como o sistema mostrou, e ponha cada um numa caixa. Só a coluna "agente" segue para a ficha de agente.
            </Text>

            <SimpleGrid
                cols={{ base: 2, sm: 4 }}
                spacing="xs"
                mb="lg"
            >
                {BOXES.map(box => (
                    <Paper
                        key={box.value}
                        radius={0}
                        p="sm"
                        bg="gray.0"
                        bd="1px solid var(--mantine-color-gray-2)"
                    >
                        <Group
                            justify="space-between"
                            wrap="nowrap"
                        >
                            <Text c="gray.9"
                                fw={800}
                                size="sm"
                            >
                                {box.label}
                            </Text>
                            <Text c="gray.9"
                                fw={800}
                                size="sm"
                                style={{ fontVariantNumeric: 'tabular-nums' }}
                            >
                                {counts[box.value]}
                            </Text>
                        </Group>
                        <Text
                            size="xs"
                            c="gray.6"
                            mt={4}
                        >
                            {box.hint}
                        </Text>
                    </Paper>
                ))}
            </SimpleGrid>

            <Paper
                radius={0}
                bg="white"
                bd="1px solid var(--mantine-color-gray-2)"
                p={{ base: 'md', md: 'lg' }}
            >
                <TextInput
                    radius={0}
                    label="Processo"
                    placeholder="Ex.: contas a pagar da filial de Campinas"
                    value={process}
                    onChange={event => setProcess(event.currentTarget.value)}
                    mb="lg"
                />
                <Stack gap="lg">
                    {rows.map((row, index) => (
                        <Box
                            key={index}
                            pb="lg"
                            style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
                        >
                            <Group
                                align="flex-end"
                                wrap="nowrap"
                                gap="xs"
                                mb="xs"
                            >
                                <Text
                                    fw={800}
                                    c="gray.5"
                                    fz="sm"
                                    w={24}
                                    pb={8}
                                    style={{ fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </Text>
                                <Textarea
                                    radius={0}
                                    autosize
                                    minRows={1}
                                    style={{ flex: 1, minWidth: 0 }}
                                    aria-label={`Passo ${index + 1}`}
                                    placeholder="O passo, com o verbo de quem faz"
                                    value={row.step}
                                    onChange={event => edit(index, { step: event.currentTarget.value })}
                                />
                                <ActionIcon
                                    variant="subtle"
                                    color="gray"
                                    size={36}
                                    radius={0}
                                    aria-label={`Remover o passo ${index + 1}`}
                                    onClick={() => setRows(prev => prev.filter((_, i) => i !== index))}
                                >
                                    <IconTrash
                                        size={18}
                                        stroke={1.5}
                                    />
                                </ActionIcon>
                            </Group>
                            <Box pl={{ base: 0, xs: 32 }}>
                                <SegmentedControl
                                    radius={0}
                                    fullWidth={isPhone}
                                    size={isPhone ? 'xs' : 'sm'}
                                    color="gray.9"
                                    data={BOXES.map(box => ({ value: box.value, label: box.label }))}
                                    value={row.box || null}
                                    onChange={value => edit(index, { box: value })}
                                    mb="xs"
                                />
                                <Textarea
                                    radius={0}
                                    autosize
                                    minRows={1}
                                    size="sm"
                                    aria-label={`Por quê, passo ${index + 1}`}
                                    placeholder="Por quê, em uma linha"
                                    value={row.why}
                                    onChange={event => edit(index, { why: event.currentTarget.value })}
                                />
                            </Box>
                        </Box>
                    ))}
                </Stack>

                <Group
                    mt="lg"
                    gap="sm"
                >
                    <Button
                        w={{ base: '100%', xs: 'auto' }}
                        variant="outline"
                        color="gray.9"
                        radius={0}
                        size={isPhone ? 'xs' : 'sm'}
                        leftSection={<IconPlus size={16} />}
                        onClick={() => setRows(prev => [...prev, emptyRow()])}
                    >
                        Mais um passo
                    </Button>
                    <CopyAction
                        value={triageTable(process, filled)}
                        label="Copiar a tabela"
                    />
                    <Button
                        w={{ base: '100%', xs: 'auto' }}
                        variant="subtle"
                        color="gray"
                        radius={0}
                        size={isPhone ? 'xs' : 'sm'}
                        onClick={() => {
                            setProcess(TRIAGE_EXAMPLE.process)
                            setRows(TRIAGE_EXAMPLE.rows)
                        }}
                    >
                        Ver um exemplo
                    </Button>
                    <Button
                        w={{ base: '100%', xs: 'auto' }}
                        variant="subtle"
                        color="gray"
                        radius={0}
                        size={isPhone ? 'xs' : 'sm'}
                        onClick={() => {
                            setProcess('')
                            setRows([emptyRow(), emptyRow(), emptyRow()])
                        }}
                    >
                        Limpar
                    </Button>
                </Group>
            </Paper>
        </Section>
    )
}

// ─── The documents ───────────────────────────────────────────────────────

export function DocumentPanel({ chapter, store }) {
    const { document: doc } = chapter
    const [text, setText] = usePersisted(store, `doc-${chapter.id}`, doc.text)
    const isPhone = useMediaQuery('(max-width: 36em)')
    const edited = text !== doc.text

    return (
        <Stack
            gap="md"
            p={{ base: 'md', md: 'xl' }}
        >
            <Stack gap={6}>
                <Eyebrow>
                    {chapter.label ?? `Capítulo ${chapter.number}`} · {chapter.title}
                </Eyebrow>
                <Text c="gray.9"
                    component="h3"
                    m={0}
                    fz={{ base: 22, md: 26 }}
                    fw={800}
                    lh={1.2}
                >
                    {doc.name}
                </Text>
                {chapter.purpose && (
                    <Text
                        c="gray.7"
                        fz={16}
                        lh={1.6}
                    >
                        {chapter.purpose}.
                    </Text>
                )}
                {chapter.question && (
                    <Text
                        c="gray.5"
                        fz={14}
                        fs="italic"
                    >
                        A pergunta do capítulo: {chapter.question}
                    </Text>
                )}
            </Stack>

            <Textarea
                radius={0}
                autosize
                minRows={12}
                maxRows={40}
                aria-label={doc.name}
                value={text}
                onChange={event => setText(event.currentTarget.value)}
                styles={{
                    input: {
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                        fontSize: isPhone ? 12 : 13,
                        lineHeight: 1.55,
                        background: 'var(--mantine-color-gray-0)',
                        // On a phone the lines wrap: sideways scrolling inside a
                        // field is hard to use with a thumb.
                        whiteSpace: isPhone ? 'pre-wrap' : 'pre',
                        overflowX: isPhone ? 'hidden' : 'auto',
                    },
                }}
            />

            <Group gap="sm">
                <CopyAction value={text} />
                <Button
                    w={{ base: '100%', xs: 'auto' }}
                    variant="outline"
                    color="gray.9"
                    radius={0}
                    size={isPhone ? 'xs' : 'sm'}
                    leftSection={<IconDownload size={16} />}
                    onClick={() => download(fileName(doc.name), text)}
                >
                    Baixar (.md)
                </Button>
                {edited && (
                    <Button
                        w={{ base: '100%', xs: 'auto' }}
                        variant="subtle"
                        color="gray"
                        radius={0}
                        size={isPhone ? 'xs' : 'sm'}
                        leftSection={<IconRefresh size={16} />}
                        onClick={() => setText(doc.text)}
                    >
                        Voltar ao modelo
                    </Button>
                )}
            </Group>

            {doc.exercise && (
                <Box
                    mt="sm"
                    p="md"
                    bd="1px solid var(--mantine-color-gray-2)"
                >
                    <Eyebrow>O exercício</Eyebrow>
                    <Text
                        mt={6}
                        fz={15}
                        lh={1.6}
                        c="gray.7"
                    >
                        {doc.exercise}
                    </Text>
                </Box>
            )}
        </Stack>
    )
}

function Documents({ kit, store }) {
    const chapters = kit.parts.flatMap(part => part.chapters.map(chapter => ({ ...chapter, part: part.title })))
    const [current, setCurrent] = usePersisted(store, 'doc', chapters[0].id)
    const active = chapters.find(chapter => chapter.id === current) ?? chapters[0]

    return (
        <Section
            id="documentos"
            subtitle="Os documentos"
            title="Preencha aqui, leve para o cliente"
            background="gray"
            maw={1080}
        >
            <Text
                c="gray.6"
                size="lg"
                lh={1.7}
                maw={760}
                mb="xl"
            >
                Os {chapters.length} documentos do livro, um por capítulo{chapters.some(chapter => chapter.label) ? ' e um por apêndice' : ''}, com as mesmas palavras. Troque o que está entre os sinais de menor e maior. O que você escreve fica só neste navegador; copie ou baixe para guardar.
            </Text>

            {/* A select on the phone, the list grouped by part from `md`. */}
            <Select
                hiddenFrom="md"
                mb="md"
                radius={0}
                label="Documento"
                data={kit.parts.map(part => ({
                    group: part.title,
                    items: part.chapters.map(chapter => ({ value: chapter.id, label: `${chapter.label ?? `${chapter.number}.`} ${chapter.document.name}` })),
                }))}
                value={active.id}
                onChange={value => value && setCurrent(value)}
                allowDeselect={false}
            />
            <Paper
                radius={0}
                bg="white"
                bd="1px solid var(--mantine-color-gray-2)"
            >
                <Grid
                    gutter={0}
                    align="stretch"
                >
                    <Grid.Col
                        span={{ base: 12, md: 'content' }}
                        visibleFrom="md"
                        w={300}
                        style={{ borderRight: '1px solid var(--mantine-color-gray-2)' }}
                    >
                        {kit.parts.map(part => (
                            <Box key={part.title}>
                                <Text
                                    px="md"
                                    pt="md"
                                    pb={6}
                                    fz={11}
                                    fw={800}
                                    tt="uppercase"
                                    c="gray.5"
                                    lts="1.5px"
                                >
                                    {part.title}
                                </Text>
                                <Stack
                                    component="ul"
                                    gap={0}
                                    m={0}
                                    p={0}
                                    role="tablist"
                                    aria-label={part.title}
                                    style={{ listStyle: 'none' }}
                                >
                                    {part.chapters.map(chapter => {
                                        const selected = chapter.id === active.id
                                        return (
                                            <li
                                                key={chapter.id}
                                                role="presentation"
                                            >
                                                <UnstyledButton
                                                    role="tab"
                                                    aria-selected={selected}
                                                    onClick={() => setCurrent(chapter.id)}
                                                    w="100%"
                                                    px="md"
                                                    py={10}
                                                    bg={selected ? 'gray.1' : undefined}
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '28px 1fr',
                                                        gap: 6,
                                                        textAlign: 'left',
                                                        borderLeft: `3px solid ${selected ? 'var(--mantine-color-gray-9)' : 'transparent'}`,
                                                    }}
                                                >
                                                    <Text
                                                        fw={800}
                                                        c="gray.5"
                                                        fz="sm"
                                                        style={{ fontVariantNumeric: 'tabular-nums' }}
                                                    >
                                                        {chapter.label ? chapter.number : String(chapter.number).padStart(2, '0')}
                                                    </Text>
                                                    <Text
                                                        fw={600}
                                                        fz="sm"
                                                        c="gray.9"
                                                    >
                                                        {chapter.document.name}
                                                    </Text>
                                                </UnstyledButton>
                                            </li>
                                        )
                                    })}
                                </Stack>
                            </Box>
                        ))}
                    </Grid.Col>
                    <Grid.Col
                        span={{ base: 12, md: 'auto' }}
                        style={{ minWidth: 0 }}
                        role="tabpanel"
                    >
                        <DocumentPanel
                            key={active.id}
                            chapter={active}
                            store={store}
                        />
                    </Grid.Col>
                </Grid>
            </Paper>
        </Section>
    )
}

// ─── The resources ───────────────────────────────────────────────────────

function Resources({ kit }) {
    return (
        <Section
            id="recursos"
            subtitle="Para ir além"
            title="O que o livro indica, aberto e conferido"
            background="gray"
            maw={1080}
        >
            <Text
                c="gray.6"
                size="lg"
                lh={1.7}
                maw={760}
                mb="xl"
            >
                Documentação, guias, cursos e livros que mudam rápido demais para o papel. Tudo foi aberto em {kit.checkedOn}; o que não pôde ser conferido ficou de fora, e nenhum preço entra.
            </Text>
            <SimpleGrid
                cols={{ base: 1, md: 2 }}
                spacing="lg"
            >
                {kit.resources.map(group => (
                    <Paper
                        key={group.title}
                        radius={0}
                        bg="white"
                        bd="1px solid var(--mantine-color-gray-2)"
                        p={{ base: 'md', md: 'lg' }}
                    >
                        <Eyebrow>{group.title}</Eyebrow>
                        {group.intro && (
                            <Text
                                size="sm"
                                c="gray.6"
                                mt={6}
                            >
                                {group.intro}
                            </Text>
                        )}
                        <Stack
                            gap="md"
                            mt="md"
                        >
                            {group.items.map(item => (
                                <Box key={item.text}>
                                    <Text
                                        fz={15}
                                        lh={1.55}
                                        c="gray.7"
                                    >
                                        {item.text}
                                    </Text>
                                    {item.href && (
                                        <Anchor
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            c="gray.9"
                                            fw={700}
                                            fz={13}
                                            mt={2}
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                                        >
                                            Abrir
                                            <IconExternalLink
                                                size={14}
                                                stroke={1.5}
                                            />
                                        </Anchor>
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                ))}
            </SimpleGrid>
        </Section>
    )
}

// ─── The page ────────────────────────────────────────────────────────────

const ENGAGEMENT_ICONS = [IconRoute, IconSearch, IconChecklist, IconListSearch, IconBriefcase, IconArrowLeft]

export function ProfessionKit() {
    const { slug } = useParams()
    const kit = PROFESSION_KITS[slug]
    const book = bookBySlug(slug)
    const store = useStore(slug)
    const title = kit ? kit.book.title : 'Kit'

    useSeoMeta({
        title: `Kit online do ${title}: os documentos do livro para preencher`,
        description: `Os documentos do livro ${title}, do escopo de uma página ao relatório de volta, para preencher no navegador, copiar e levar ao cliente; a triagem dos passos e os recursos conferidos.`,
        url: `/books/${slug}/kit`,
    })

    // Not live before the book: see the comment at the top.
    if (!kit || (!book && !import.meta.env.DEV)) return <NotFound />

    const bookPath = `/books/${slug}`
    const engagement = kit.parts.find(part => /engajamento/i.test(part.title))
    const byId = Object.fromEntries(kit.parts.flatMap(part => part.chapters).map(chapter => [chapter.id, chapter]))
    const week = [
        { id: 'o-que-e-um-forward-deployed-engineer', day: 'Segunda', text: 'Leia três vagas com o teste das quatro perguntas e separe as que são FDE das que só usam o título.' },
        { id: 'descobrir-os-substantivos-e-os-verbos', day: 'Terça', text: 'Converse trinta minutos com alguém de outra área da sua empresa, com o roteiro de descoberta. Peça para ver, não para contar.' },
        { id: 'agentes-que-o-cliente-aguenta', name: 'A triagem dos passos', day: 'Quarta', text: 'Faça a triagem dos passos do processo que essa pessoa mostrou: apagar, código, agente, pessoa.' },
        { id: 'agentes-que-o-cliente-aguenta', day: 'Quinta', text: 'Preencha a ficha de agente para um passo da coluna "agente". Se a linha 1 ficar vazia, era um fluxo fixo.' },
        { id: 'entrar-o-escopo-e-a-fatia-fina', day: 'Sexta', text: 'Escreva o escopo de uma página para a fatia fina, com o critério de sucesso, e mostre a alguém que decide.' },
    ]

    return (
        <>
            <Box
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 80, md: 120 }}
            >
                <Container size="lg">
                    <Stack
                        gap="xl"
                        align="flex-start"
                        maw={760}
                    >
                        <Anchor
                            component={Link}
                            to={book ? bookPath : '/books'}
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
                                <IconArrowLeft size={16} />
                                Kit online · {kit.book.title} · Volume {kit.book.volume}
                            </Group>
                        </Anchor>
                        <Text c="gray.9"
                            component="h1"
                            m={0}
                            fz={{ base: 30, sm: 42, md: 52 }}
                            lh={1.15}
                            fw={800}
                            style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
                        >
                            O kit do {kit.book.title}
                        </Text>
                        <Text
                            fz={{ base: 16, md: 18 }}
                            c="dimmed"
                            lh={1.6}
                        >
                            O guia de bolso de quem leva a IA para dentro de um cliente. Os documentos do livro, do escopo de uma página ao relatório de volta, para preencher aqui e levar ao cliente; a triagem dos passos antes de qualquer agente; uma primeira semana para começar; e os recursos que o livro indica, conferidos.
                        </Text>
                        <Group
                            gap="lg"
                            rowGap="xs"
                        >
                            {[`${kit.parts.flatMap(part => part.chapters).length} documentos para preencher`, 'A triagem dos passos', 'Fica só no seu navegador'].map(promise => (
                                <Group
                                    key={promise}
                                    gap={6}
                                    wrap="nowrap"
                                >
                                    <IconCheck
                                        size={18}
                                        stroke={2.5}
                                    />
                                    <Text
                                        size="sm"
                                        fw={600}
                                    >
                                        {promise}
                                    </Text>
                                </Group>
                            ))}
                        </Group>
                    </Stack>
                </Container>
            </Box>

            {engagement && (
                <Steps
                    id="engajamento"
                    subtitle="O caminho de um engajamento"
                    title={`${engagement.chapters.length} fases, um documento em cada`}
                    items={engagement.chapters.map((chapter, index) => ({
                        number: String(chapter.number).padStart(2, '0'),
                        icon: ENGAGEMENT_ICONS[index] ?? IconFileText,
                        title: `${chapter.title.split(' — ')[0]}: ${chapter.document.name.toLowerCase()}`,
                        description: chapter.purpose ? `${chapter.purpose}.` : '',
                    }))}
                    background="white"
                />
            )}

            <Documents
                kit={kit}
                store={store}
            />

            <Triage store={store} />

            <Steps
                id="primeira-semana"
                subtitle="Para começar"
                title="Uma primeira semana, com cinco documentos"
                items={week.map((day, index) => ({
                    number: String(index + 1).padStart(2, '0'),
                    icon: [IconSearch, IconListSearch, IconRoute, IconChecklist, IconFileText][index],
                    title: `${day.day} · ${day.name ?? byId[day.id]?.document.name ?? ''}`,
                    description: day.text,
                }))}
                background="gray"
            />

            <Resources kit={kit} />

            <CTABanner
                subtitle={`Volume ${kit.book.volume} da série O Novo Básico`}
                title={`Este kit acompanha o livro ${kit.book.title}`}
                description={`${kit.book.subtitle}. Os documentos saem do livro, palavra por palavra. Feito com o auxílio de inteligência artificial; revisado e aprovado por humanos.`}
                cta={{ label: book ? 'Ver o livro' : 'Ver a série', href: book ? bookPath : '/books', icon: <IconArrowLeft size={20} />, size: 'lg' }}
                background="white"
            />
        </>
    )
}
