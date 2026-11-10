import { createContext, useContext, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useIsomorphicEffect, useMediaQuery } from '@mantine/hooks'
import {
    Accordion,
    Anchor,
    Box,
    Button,
    Checkbox,
    Code,
    Container,
    CopyButton,
    Grid,
    Group,
    Mark,
    NumberInput,
    Paper,
    Progress,
    SegmentedControl,
    Select,
    SimpleGrid,
    Stack,
    Table,
    Text,
    TextInput,
    Textarea,
    Title,
    UnstyledButton,
} from '@mantine/core'
import { CTABanner, CTAButton, Callout, CriteriaList, Section, SECTION_BACKGROUNDS, Steps } from '@ciromaciel/components-kit'
import {
    IconAlertTriangle,
    IconArrowLeft,
    IconArrowRight,
    IconBuildingBank,
    IconBuildingStore,
    IconCashOff,
    IconCheck,
    IconCopy,
    IconExternalLink,
    IconFileText,
    IconMessageOff,
    IconPhoneCall,
    IconReceipt,
    IconScale,
    IconSearch,
    IconShieldCheck,
    IconTrash,
} from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/use-seo-meta'
import { kitSeo } from '../data/seo'
import { NotFound } from './NotFound'
import { bookBySlug } from '../data/catalog'
import { bookHome, standInBook } from '../data/kit-book'
import ESC from '../data/kit-ia-no-escritorio'
import EMP from '../data/kit-ia-no-primeiro-trabalho'
import NEG from '../data/kit-ia-no-pequeno-negocio'
import ATD from '../data/kit-ia-no-atendimento-e-nas-vendas'
import SAL from '../data/kit-ia-na-sala-de-aula'
import CTB from '../data/kit-ia-na-contabilidade'
import ADV from '../data/kit-ia-na-advocacia'
import CCI from '../data/kit-construir-com-ia'
import FPA from '../data/kit-feito-para-agentes'
import OPB from '../data/kit-one-person-business'
import DPV from '../data/kit-do-primeiro-visitante-ao-cliente'

/**
 * /books/<slug>/kit — the online kit of a book, inside the site.
 *
 * Until 01/10/2026 the kit was a static page of its own (/kit/escritorio),
 * with its own colours. The founder moved it here so the reader can keep
 * browsing the site: the content is the same, word for word
 * (data/kit-ia-no-escritorio.js), and every band is a piece the site already
 * uses — Callout, CriteriaList, Steps, Section, CTABanner — on the house
 * greys. The book is named at the top and at the end, so it is always clear
 * which book the kit belongs to.
 *
 * What the reader types (the fields, the ticks, the counts, the notebook)
 * stays in this browser only, in localStorage, behind try/catch.
 */

// One data module per book with a task kit (data/kit-<slug>.js): the parts
// every kit has, plus `bands`, the sections only that book has.
export const KITS = { 'ia-no-escritorio': ESC, 'ia-no-primeiro-trabalho': EMP, 'ia-no-pequeno-negocio': NEG, 'ia-no-atendimento-e-nas-vendas': ATD, 'ia-na-sala-de-aula': SAL, 'ia-na-contabilidade': CTB, 'ia-na-advocacia': ADV, 'construir-com-ia': CCI, 'feito-para-agentes': FPA, 'one-person-business': OPB, 'do-primeiro-visitante-ao-cliente': DPV }

export const KitContext = createContext(ESC)
const useKit = () => useContext(KitContext)

// The icons a band may name, by name, so the data modules stay plain.
const ICONS = { IconAlertTriangle, IconBuildingBank, IconBuildingStore, IconCashOff, IconCheck, IconFileText, IconMessageOff, IconPhoneCall, IconReceipt, IconScale, IconSearch, IconShieldCheck, IconTrash }

const makeStore = prefix => ({
    get(key, fallback) {
        try {
            const value = localStorage.getItem(`${prefix}:${key}`)
            return value == null ? fallback : JSON.parse(value)
        } catch {
            return fallback
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(`${prefix}:${key}`, JSON.stringify(value))
        } catch {
            // Private window or blocked storage: the page works without it.
        }
    },
})

function usePersisted(key, fallback) {
    const store = makeStore(useKit().storage)
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

/** The site's Analytics (index.html), when it loaded: `kit:<what>` events, never personal data. */
export const trackKit = name => {
    if (typeof window !== 'undefined') window.analytics?.trackEvent?.(`kit:${name}`)
}

function CopyAction({ value, label, event }) {
    const isPhone = useMediaQuery('(max-width: 36em)')
    return (
        <CopyButton value={value}>
            {({ copied, copy }) => (
                <Button
                    // Full width and one size smaller on a phone: "Copiar para
                    // a planilha" broke into two cramped lines at 320 px.
                    w={{ base: '100%', xs: 'auto' }}
                    onClick={() => {
                        copy()
                        if (event) trackKit(event)
                    }}
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

// ─── The prompts ─────────────────────────────────────────────────────────

const isSentence = ph => ph.slice(-1) === '.' && ph.charAt(0) === ph.charAt(0).toUpperCase()
const placeholder = field => (isSentence(field.ph) ? `[${field.ph.slice(0, -1)}.]` : `[${field.ph}]`)

function promptText(task, values, withAdd) {
    const text = task.tpl.replace(/\{(\w+)\}/g, (_, key) => {
        const field = task.fields.find(f => f.k === key)
        const value = (values[key] || '').trim()
        return value || (field ? placeholder(field) : `[${key}]`)
    })
    return task.add && withAdd ? `${text}\n\n${task.add}` : text
}

function PromptPreview({ task, values, withAdd }) {
    const parts = task.tpl.split(/(\{\w+\})/)
    return (
        <Code
            block
            fz={14}
            p="md"
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.6 }}
        >
            {parts.map((part, index) => {
                const match = part.match(/^\{(\w+)\}$/)
                if (!match) return part
                const field = task.fields.find(f => f.k === match[1])
                const value = (values[match[1]] || '').trim()
                if (value) return value
                return (
                    <Mark
                        key={index}
                        color="gray.3"
                    >
                        {field ? placeholder(field) : `[${match[1]}]`}
                    </Mark>
                )
            })}
            {task.add && withAdd ? `\n\n${task.add}` : null}
        </Code>
    )
}

export function TaskPanel({ task }) {
    const { testedNote, workAI, noun = 'pedido', thing = 'sistema', SYSTEM } = useKit()
    // On the kit page, each task links to its own page (pages/KitItem.jsx);
    // on that page, `item` is in the route and the link would point to itself.
    const { slug, item } = useParams()
    const [allValues, setAllValues] = usePersisted('fields', {})
    const [adds, setAdds] = usePersisted('adds', {})
    const [ticks, setTicks] = usePersisted('ticks', {})
    // A build kit fills the reader's system (SYSTEM, typed once) into every
    // prompt that names it; the task's own fields come after.
    const [system] = usePersisted('system', {})
    const values = { ...system, ...(allValues[task.id] ?? {}) }
    const systemFields = SYSTEM ? SYSTEM.fields.filter(field => task.tpl.includes(`{${field.k}}`)) : []
    // The prompt knows the system's fields too, so an empty one prints its placeholder.
    const filled = systemFields.length ? { ...task, fields: [...task.fields, ...systemFields] } : task
    const taskTicks = ticks[task.id] ?? {}
    const withAdd = Boolean(adds[task.id])

    const setField = (key, value) => setAllValues(prev => ({ ...prev, [task.id]: { ...(prev[task.id] ?? {}), [key]: value } }))

    return (
        <Box p={{ base: 'lg', md: 'xl' }}>
            <Stack gap="xl">
                <Stack gap={4}>
                    <Eyebrow>{task.chap}</Eyebrow>
                    <Title
                        order={3}
                        fz={{ base: 22, md: 26 }}
                    >
                        {task.name}
                    </Title>
                    {!item && (
                        <Anchor
                            component={Link}
                            to={`/books/${slug}/kit/${task.id}`}
                            c="gray.6"
                            fz="sm"
                        >
                            Abrir este {noun} numa página própria
                        </Anchor>
                    )}
                </Stack>

                <Grid gutter={{ base: 'xl', md: 40 }}>
                    <Grid.Col span={{ base: 12, lg: 5 }}>
                        <Stack gap="md">
                            {systemFields.length > 0 && (
                                <Text
                                    size="sm"
                                    c="gray.6"
                                >
                                    Do seu {thing}: {systemFields.map(field => field.label.toLowerCase()).join(', ')}. Muda em O seu {thing}, no alto do kit.
                                </Text>
                            )}
                            {task.fields.map(field => {
                                const props = {
                                    id: `kit-${task.id}-${field.k}`,
                                    label: field.label,
                                    description: field.hint,
                                    placeholder: field.ph,
                                    value: values[field.k] ?? '',
                                    onChange: event => setField(field.k, event.currentTarget.value),
                                    radius: 0,
                                }
                                // The key goes on the element, not in the spread props.
                                return field.area ? (
                                    <Textarea
                                        key={field.k}
                                        {...props}
                                        autosize
                                        minRows={3}
                                    />
                                ) : (
                                    <TextInput
                                        key={field.k}
                                        {...props}
                                    />
                                )
                            })}
                            {task.add && (
                                <Checkbox
                                    id={`kit-${task.id}-add`}
                                    color="gray.9"
                                    checked={withAdd}
                                    onChange={event => setAdds(prev => ({ ...prev, [task.id]: event.currentTarget.checked }))}
                                    label="Acrescentar a linha do capítulo"
                                    description="Não testada no livro. Ela deixa claro o que você espera; a conferência é a mesma."
                                />
                            )}
                            <Box>
                                <Button
                                    variant="default"
                                    radius={0}
                                    size="sm"
                                    disabled={task.fields.length === 0}
                                    onClick={() => setAllValues(prev => ({ ...prev, [task.id]: {} }))}
                                >
                                    Limpar os campos
                                </Button>
                            </Box>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 7 }}>
                        <Stack gap="sm">
                            <Group
                                justify="space-between"
                                align="center"
                            >
                                <Eyebrow>O {noun} pronto</Eyebrow>
                                <CopyAction
                                    value={promptText(filled, values, withAdd)}
                                    label={`Copiar o ${noun}`}
                                    event={`copy:${slug}/${task.id}`}
                                />
                            </Group>
                            <PromptPreview
                                task={filled}
                                values={values}
                                withAdd={withAdd}
                            />
                            {workAI && (
                                <Group
                                    gap={8}
                                    wrap="nowrap"
                                    align="flex-start"
                                >
                                    <IconShieldCheck
                                        size={18}
                                        stroke={1.5}
                                        style={{ flexShrink: 0, marginTop: 2 }}
                                    />
                                    <Text
                                        size="sm"
                                        c="gray.6"
                                    >
                                        Antes de colar o material, tire o que as dez coisas mandam tirar. Material do trabalho só na {workAI}.
                                    </Text>
                                </Group>
                            )}
                            {!task.result && task.privacy && (
                                <Group
                                    gap={8}
                                    wrap="nowrap"
                                    align="flex-start"
                                >
                                    <IconAlertTriangle
                                        size={18}
                                        stroke={1.5}
                                        style={{ flexShrink: 0, marginTop: 2 }}
                                    />
                                    <Text
                                        size="sm"
                                        c="gray.7"
                                    >
                                        {task.privacy}
                                    </Text>
                                </Group>
                            )}
                        </Stack>
                    </Grid.Col>
                </Grid>

                {/* A kit without tests (a build kit) has no checks per prompt
                    and no test result: the chapter's checks are in its trail. */}
                {(task.checks.length > 0 || task.result) && (
                    <Grid gutter={{ base: 'xl', md: 40 }}>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Stack gap="sm">
                                <Group justify="space-between">
                                    <Eyebrow>Confira</Eyebrow>
                                    <Anchor
                                        component="button"
                                        type="button"
                                        size="sm"
                                        c="gray.6"
                                        onClick={() => setTicks(prev => ({ ...prev, [task.id]: {} }))}
                                    >
                                        Desmarcar tudo
                                    </Anchor>
                                </Group>
                                {task.checks.map((check, index) => (
                                    <Checkbox
                                        key={check}
                                        id={`kit-${task.id}-check-${index}`}
                                        color="gray.9"
                                        label={check}
                                        checked={Boolean(taskTicks[index])}
                                        onChange={event => setTicks(prev => ({ ...prev, [task.id]: { ...(prev[task.id] ?? {}), [index]: event.currentTarget.checked } }))}
                                    />
                                ))}
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Stack gap="sm">
                                <Eyebrow>No teste do livro</Eyebrow>
                                <Text c="gray.7">{task.result}</Text>
                                <Text
                                    size="sm"
                                    c="gray.5"
                                >
                                    {testedNote}
                                </Text>
                                {task.privacy && (
                                    <>
                                        <Eyebrow>Atenção</Eyebrow>
                                        <Text c="gray.7">{task.privacy}</Text>
                                    </>
                                )}
                            </Stack>
                        </Grid.Col>
                    </Grid>
                )}
            </Stack>
        </Box>
    )
}

function Prompts() {
    const { TASKS, testedOn, promptsNote } = useKit()
    const [current, setCurrent] = usePersisted('task', TASKS[0].id)
    const active = TASKS.find(task => task.id === current) ?? TASKS[0]

    return (
        <Section
            ta="center"
            id="pedidos"
            subtitle="Os pedidos"
            title="Preencha, copie e confira"
            background="gray"
            maw={900}
        >
            <Text
                c="gray.6"
                size="lg"
                lh={1.7}
                maw={760}
                mb="xl"
            >
                Um pedido por tarefa, na forma testada em {testedOn}. Preencha os campos e copie o pedido pronto; o que você não preencher continua entre colchetes.{promptsNote ? ` ${promptsNote}` : ''}
            </Text>

            {/* A select on the phone, the vertical tabs from `md`: eleven
                tasks do not fit a row of tabs on a narrow screen. */}
            <Select
                hiddenFrom="md"
                mb="md"
                radius={0}
                label="Tarefa"
                data={TASKS.map(task => ({ value: task.id, label: `${task.name} · ${task.chap}` }))}
                value={active.id}
                onChange={value => value && setCurrent(value)}
                allowDeselect={false}
            />
            {/* ONE BOX, AS IN THE FIRST VERSION OF THE KIT: the numbered list
                of tasks on the left, a rule, the task on the right. The
                active task is marked in the house greys (gray.1 and a dark
                rule on the left), where the first version used the ochre. */}
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
                        w={280}
                        style={{ borderRight: '1px solid var(--mantine-color-gray-2)' }}
                    >
                        <Stack
                            component="ul"
                            gap={0}
                            m={0}
                            p={0}
                            role="tablist"
                            aria-label="Tarefas"
                            style={{ listStyle: 'none' }}
                        >
                            {TASKS.map((task, index) => {
                                const selected = task.id === active.id
                                return (
                                    <li
                                        key={task.id}
                                        role="presentation"
                                    >
                                        <UnstyledButton
                                            role="tab"
                                            aria-selected={selected}
                                            onClick={() => setCurrent(task.id)}
                                            w="100%"
                                            px="md"
                                            py={14}
                                            bg={selected ? 'gray.1' : undefined}
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: '32px 1fr',
                                                gap: 8,
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
                                                {String(index + 1).padStart(2, '0')}
                                            </Text>
                                            <Text
                                                fw={700}
                                                fz="sm"
                                                c="gray.9"
                                            >
                                                {task.name}
                                            </Text>
                                        </UnstyledButton>
                                    </li>
                                )
                            })}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col
                        span={{ base: 12, md: 'auto' }}
                        style={{ minWidth: 0 }}
                        role="tabpanel"
                    >
                        <TaskPanel
                            key={active.id}
                            task={active}
                        />
                    </Grid.Col>
                </Grid>
            </Paper>
        </Section>
    )
}

// ─── The reader's system and the trail (a build kit) ────────────────────

/** A build kit's SYSTEM: what the reader types once, used by every prompt. */
function YourSystem() {
    const { SYSTEM, thing = 'sistema' } = useKit()
    const [system, setSystem] = usePersisted('system', {})
    return (
        <Section
            ta="center"
            id="sistema"
            subtitle={`O seu ${thing}`}
            title={SYSTEM.title}
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
                {SYSTEM.lead}
            </Text>
            <Paper
                radius={0}
                bg="gray.0"
                bd="1px solid var(--mantine-color-gray-2)"
                p={{ base: 'md', sm: 'xl' }}
            >
                <SimpleGrid
                    cols={{ base: 1, md: 2 }}
                    spacing="lg"
                >
                    {SYSTEM.fields.map(field => {
                        const props = {
                            id: `kit-system-${field.k}`,
                            label: field.label,
                            description: field.hint,
                            placeholder: field.ph,
                            value: system[field.k] ?? '',
                            onChange: event => {
                                const value = event.currentTarget.value
                                setSystem(prev => ({ ...prev, [field.k]: value }))
                            },
                            radius: 0,
                        }
                        return field.area ? (
                            <Textarea
                                key={field.k}
                                {...props}
                                autosize
                                minRows={2}
                            />
                        ) : (
                            <TextInput
                                key={field.k}
                                {...props}
                            />
                        )
                    })}
                </SimpleGrid>
            </Paper>
        </Section>
    )
}

/**
 * One prompt of a build kit, inside its step: its own fields, the prompt
 * filled with the reader's system, and the copy button. Folded under its
 * name; the step opens the first one.
 */
function PromptCard({ task }) {
    const { SYSTEM, thing = 'sistema' } = useKit()
    const { slug } = useParams()
    const [allValues, setAllValues] = usePersisted('fields', {})
    const [system] = usePersisted('system', {})
    const values = { ...system, ...(allValues[task.id] ?? {}) }
    const systemFields = SYSTEM.fields.filter(field => task.tpl.includes(`{${field.k}}`))
    // The prompt knows the system's fields too, so an empty one prints its placeholder.
    const filled = { ...task, fields: [...task.fields, ...systemFields] }
    const setField = (key, value) => setAllValues(prev => ({ ...prev, [task.id]: { ...(prev[task.id] ?? {}), [key]: value } }))

    return (
        <Stack gap="md">
            {task.fields.length > 0 && (
                <SimpleGrid
                    cols={{ base: 1, sm: 2 }}
                    spacing="md"
                >
                    {task.fields.map(field => (
                        <TextInput
                            key={field.k}
                            id={`kit-${task.id}-${field.k}`}
                            label={field.label}
                            description={field.hint}
                            placeholder={field.ph}
                            value={values[field.k] ?? ''}
                            onChange={event => setField(field.k, event.currentTarget.value)}
                            radius={0}
                        />
                    ))}
                </SimpleGrid>
            )}
            <PromptPreview
                task={filled}
                values={values}
            />
            {task.privacy && (
                <Group
                    gap={8}
                    wrap="nowrap"
                    align="flex-start"
                >
                    <IconAlertTriangle
                        size={18}
                        stroke={1.5}
                        style={{ flexShrink: 0, marginTop: 2 }}
                    />
                    <Text
                        size="sm"
                        c="gray.7"
                    >
                        {task.privacy}
                    </Text>
                </Group>
            )}
            <Group
                justify="space-between"
                align="center"
                gap="sm"
            >
                <CopyAction
                    value={promptText(filled, values)}
                    label="Copiar o prompt"
                />
                <Anchor
                    component={Link}
                    to={`/books/${slug}/kit/${task.id}`}
                    c="gray.6"
                    fz="sm"
                >
                    Abrir numa página própria
                </Anchor>
            </Group>
            {systemFields.length > 0 && (
                <Text
                    size="xs"
                    c="gray.6"
                >
                    Do seu {thing}: {systemFields.map(field => field.label.toLowerCase()).join(', ')}. Muda em O seu {thing}, acima.
                </Text>
            )}
        </Stack>
    )
}

/** The step in view: what to do, its prompts, and its "Pronto quando" to tick. */
function StepPanel({ index, done, setDone, go }) {
    const { TRAIL, TASKS, readyNote = 'Marque depois de conferir no navegador, no seu sistema.' } = useKit()
    const step = TRAIL[index]
    const prompts = TASKS.filter(task => task.group === index + 1)
    const ticks = done[index] ?? {}

    return (
        <Box p={{ base: 'lg', md: 'xl' }}>
            <Stack gap="xl">
                <Stack gap={8}>
                    <Eyebrow>
                        Capítulo {index + 1} · {step.part}
                    </Eyebrow>
                    <Title
                        order={3}
                        fz={{ base: 24, md: 30 }}
                    >
                        {step.title}
                    </Title>
                    <Text
                        c="gray.7"
                        size="lg"
                        lh={1.6}
                    >
                        {step.step.charAt(0).toUpperCase() + step.step.slice(1)}
                    </Text>
                    {step.time.length > 0 && (
                        <Text
                            size="sm"
                            c="gray.6"
                        >
                            {step.time.map(item => `${item.label}: ${item.text}`).join(' ')}
                        </Text>
                    )}
                </Stack>

                {prompts.length > 0 && (
                    <Stack gap="sm">
                        <Eyebrow>{prompts.length === 1 ? 'O prompt' : `Os ${prompts.length} prompts, na ordem`}</Eyebrow>
                        <Accordion
                            key={index}
                            defaultValue={prompts[0].id}
                            radius={0}
                            variant="contained"
                            chevronPosition="right"
                        >
                            {prompts.map((task, number) => (
                                <Accordion.Item
                                    key={task.id}
                                    value={task.id}
                                >
                                    <Accordion.Control>
                                        <Group
                                            gap="sm"
                                            wrap="nowrap"
                                        >
                                            <Text
                                                fw={800}
                                                c="gray.5"
                                                fz="sm"
                                                style={{ fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}
                                            >
                                                {index + 1}.{number + 1}
                                            </Text>
                                            <Text
                                                fw={700}
                                                c="gray.9"
                                            >
                                                {task.name}
                                            </Text>
                                        </Group>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <PromptCard task={task} />
                                    </Accordion.Panel>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Stack>
                )}

                <Paper
                    radius={0}
                    bg="gray.0"
                    bd="1px solid var(--mantine-color-gray-2)"
                    p={{ base: 'md', sm: 'lg' }}
                >
                    <Stack gap="sm">
                        <Eyebrow c="gray.7">Pronto quando</Eyebrow>
                        <Text
                            size="sm"
                            c="gray.6"
                        >
                            {readyNote}
                        </Text>
                        {step.ready.map((text, line) => (
                            <Checkbox
                                key={line}
                                id={`kit-trail-${index}-${line}`}
                                color="gray.9"
                                label={text}
                                checked={Boolean(ticks[line])}
                                onChange={event => {
                                    const checked = event.currentTarget.checked
                                    setDone(prev => ({ ...prev, [index]: { ...(prev[index] ?? {}), [line]: checked } }))
                                }}
                            />
                        ))}
                    </Stack>
                </Paper>

                <Group
                    justify="space-between"
                    gap="sm"
                >
                    <Button
                        variant="default"
                        radius={0}
                        leftSection={<IconArrowLeft size={16} />}
                        disabled={index === 0}
                        onClick={() => go(index - 1)}
                    >
                        Passo anterior
                    </Button>
                    <Button
                        radius={0}
                        color="gray.9"
                        rightSection={<IconArrowRight size={16} />}
                        disabled={index === TRAIL.length - 1}
                        onClick={() => go(index + 1)}
                    >
                        Próximo passo
                    </Button>
                </Group>
            </Stack>
        </Box>
    )
}

/**
 * A build kit's TRAIL as one workbench: the steps on the left, the step in
 * view on the right with its prompts and its checks. Everything a step needs
 * is in one place, so nothing sends the reader down the page and back.
 */
function Workbench() {
    const { TRAIL, trailTitle = 'Um passo por vez, até abrir ao público' } = useKit()
    const [current, setCurrent] = usePersisted('step', 0)
    const [done, setDone] = usePersisted('trail', {})
    const index = Math.min(Math.max(Number(current) || 0, 0), TRAIL.length - 1)
    const isDone = at => TRAIL[at].ready.length > 0 && TRAIL[at].ready.every((_, line) => done[at]?.[line])
    const count = TRAIL.filter((_, at) => isDone(at)).length

    // Next and previous keep the reader at the top of the step, not where the
    // button was; only when the top is out of sight.
    const go = at => {
        setCurrent(at)
        const box = document.getElementById('bancada')
        if (box && box.getBoundingClientRect().top < 0) box.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <Section
            ta="center"
            id="trilha"
            subtitle="A trilha"
            title={trailTitle}
            background="gray"
            maw={1080}
        >
            <Text
                c="gray.6"
                size="lg"
                lh={1.7}
                maw={760}
                mb="lg"
            >
                Um passo por capítulo, na ordem do livro. Cada passo traz os prompts dele e o que conferir no fim; o passo fica pronto quando tudo está marcado. As marcas e os campos ficam só neste navegador.
            </Text>
            <Stack
                gap={6}
                mb="xl"
                maw={760}
            >
                <Text
                    fw={700}
                    c="gray.9"
                >
                    {count} de {TRAIL.length} passos prontos
                </Text>
                <Progress
                    value={(count / TRAIL.length) * 100}
                    color="gray.9"
                    bg="gray.2"
                    radius={0}
                    size="sm"
                    aria-label="Passos prontos"
                />
            </Stack>

            <Select
                hiddenFrom="md"
                mb="md"
                radius={0}
                label="Passo"
                data={TRAIL.map((step, at) => ({ value: String(at), label: `${at + 1}. ${step.title}${isDone(at) ? ' (pronto)' : ''}` }))}
                value={String(index)}
                onChange={value => value != null && go(Number(value))}
                allowDeselect={false}
            />
            <Paper
                id="bancada"
                radius={0}
                bg="white"
                bd="1px solid var(--mantine-color-gray-2)"
                style={{ scrollMarginTop: 96 }}
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
                        <Stack
                            component="ul"
                            gap={0}
                            m={0}
                            p={0}
                            pb="md"
                            role="tablist"
                            aria-label="Passos"
                            style={{ listStyle: 'none' }}
                        >
                            {TRAIL.map((step, at) => {
                                const selected = at === index
                                return (
                                    <li
                                        key={step.slug}
                                        role="presentation"
                                    >
                                        {step.part !== TRAIL[at - 1]?.part && (
                                            <Text
                                                px="md"
                                                pt="lg"
                                                pb={6}
                                                fz={11}
                                                fw={800}
                                                tt="uppercase"
                                                lts="1.5px"
                                                c="gray.5"
                                            >
                                                {step.part}
                                            </Text>
                                        )}
                                        <UnstyledButton
                                            role="tab"
                                            aria-selected={selected}
                                            onClick={() => go(at)}
                                            w="100%"
                                            px="md"
                                            py={10}
                                            bg={selected ? 'gray.1' : undefined}
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: '28px 1fr 18px',
                                                gap: 8,
                                                alignItems: 'start',
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
                                                {String(at + 1).padStart(2, '0')}
                                            </Text>
                                            <Text
                                                fw={700}
                                                fz="sm"
                                                c="gray.9"
                                            >
                                                {step.title}
                                            </Text>
                                            {isDone(at) && (
                                                <IconCheck
                                                    size={18}
                                                    stroke={2.5}
                                                    aria-label="pronto"
                                                />
                                            )}
                                        </UnstyledButton>
                                    </li>
                                )
                            })}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col
                        span={{ base: 12, md: 'auto' }}
                        style={{ minWidth: 0 }}
                        role="tabpanel"
                    >
                        <StepPanel
                            key={index}
                            index={index}
                            done={done}
                            setDone={setDone}
                            go={go}
                        />
                    </Grid.Col>
                </Grid>
            </Paper>
        </Section>
    )
}

// ─── The templates ───────────────────────────────────────────────────────

const KIND = { sheet: 'Planilha', text: 'Texto', check: 'Conferência' }
const tsv = rows => rows.map(row => row.join('\t')).join('\n')

function TemplateCard({ template }) {
    const isPhone = useMediaQuery('(max-width: 36em)')
    const rows = template.rows ?? template.table
    return (
        <Paper
            radius={0}
            bg="gray.0"
            bd="1px solid var(--mantine-color-gray-2)"
            p={{ base: 'md', sm: 'xl' }}
            h="100%"
        >
            <Stack gap="md">
                <Stack gap={6}>
                    <Eyebrow>
                        {KIND[template.kind]} · {template.chap}
                    </Eyebrow>
                    <Title
                        order={3}
                        fz={22}
                    >
                        {template.title}
                    </Title>
                    <Text c="gray.7">{template.desc}</Text>
                </Stack>
                {/* A two-column check, on a phone, reads as a list: the item in
                    bold, its text below. As a table, words like
                    "Respeitosamente" kept it wider than 320 px. */}
                {template.table && isPhone ? (
                    <Stack
                        gap={0}
                        bg="white"
                        bd="1px solid var(--mantine-color-gray-2)"
                    >
                        {template.table.slice(1).map(([item, text], index) => (
                            <Box
                                key={item}
                                p="sm"
                                style={index ? { borderTop: '1px solid var(--mantine-color-gray-2)' } : undefined}
                            >
                                <Text
                                    fw={700}
                                    fz="sm"
                                    c="gray.9"
                                >
                                    {item}
                                </Text>
                                <Text
                                    fz="sm"
                                    c="gray.7"
                                >
                                    {text}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : rows ? (
                    <Table.ScrollContainer
                        // A spreadsheet keeps its columns and scrolls; a two-column
                        // check wraps its text instead, so nothing is cut on a phone.
                        minWidth={template.rows ? 520 : 0}
                    >
                        <Table
                            withTableBorder
                            withColumnBorders
                            fz="sm"
                            bg="white"
                        >
                            <Table.Thead>
                                <Table.Tr>
                                    {rows[0].map(cell => (
                                        <Table.Th key={cell}>{cell}</Table.Th>
                                    ))}
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {rows.slice(1).map((row, index) => (
                                    <Table.Tr key={index}>
                                        {row.map((cell, cellIndex) => (
                                            <Table.Td
                                                key={cellIndex}
                                                ff={String(cell).startsWith('=') ? 'monospace' : undefined}
                                            >
                                                {cell}
                                            </Table.Td>
                                        ))}
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                ) : (
                    <Code
                        block
                        fz={13}
                        p="md"
                        bg="white"
                        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.6 }}
                    >
                        {template.text}
                    </Code>
                )}
                {template.after && (
                    <Text
                        size="sm"
                        c="gray.6"
                    >
                        {template.after}
                    </Text>
                )}
                {(template.rows || template.text) && (
                    <Box>
                        <CopyAction
                            value={template.rows ? tsv(template.rows) : template.text}
                            label={template.rows ? 'Copiar para a planilha' : 'Copiar o texto'}
                        />
                    </Box>
                )}
            </Stack>
        </Paper>
    )
}

function Templates() {
    const { TEMPLATES } = useKit()
    const [kind, setKind] = useState('all')
    const isPhone = useMediaQuery('(max-width: 36em)')
    const visible = useMemo(() => TEMPLATES.filter(template => kind === 'all' || template.kind === kind), [TEMPLATES, kind])
    // A kit without spreadsheets (the classroom one) says nothing about A1 or HOJE.
    const hasSheets = TEMPLATES.some(template => template.rows)

    return (
        <Section
            ta="center"
            id="modelos"
            subtitle="Modelos"
            title={hasSheets ? 'Para colar na planilha ou no documento' : 'Para colar no documento'}
            background="white"
            maw={900}
        >
            <Text
                c="gray.6"
                size="lg"
                lh={1.7}
                maw={760}
                mb="lg"
            >
                {hasSheets
                    ? 'Os modelos de planilha se colam na célula A1: as colunas se separam sozinhas no Excel, no Google Planilhas e no LibreOffice. As fórmulas estão em português (HOJE); numa planilha em inglês, troque por TODAY. Nenhum modelo leva dado de ninguém.'
                    : 'Copie o texto e cole no documento; o que estiver entre colchetes você preenche antes de usar. Nenhum modelo leva dado de ninguém.'}
            </Text>
            <SegmentedControl
                mb="xl"
                radius={0}
                // Stacked on a phone: four labels in a row cut "Conferências"
                // at 320 px.
                orientation={isPhone ? 'vertical' : 'horizontal'}
                fullWidth={isPhone}
                value={kind}
                onChange={setKind}
                data={[
                    { value: 'all', label: 'Todos' },
                    ...(hasSheets ? [{ value: 'sheet', label: 'Planilhas' }] : []),
                    { value: 'text', label: 'Textos' },
                    { value: 'check', label: 'Conferências' },
                ]}
            />
            <SimpleGrid
                cols={{ base: 1, md: 2 }}
                spacing="xl"
            >
                {visible.map(template => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                    />
                ))}
            </SimpleGrid>
        </Section>
    )
}

// ─── The exercises and the notebook ─────────────────────────────────────

function Exercises() {
    const { EXERCISES, exercisesNote } = useKit()
    const [counts, setCounts] = usePersisted('counts', {})
    return (
        <Section
            ta="center"
            id="treinos"
            subtitle="Faça agora"
            title="Os treinos do livro, com o material pronto"
            background="gray"
            maw={900}
        >
            <Text
                c="gray.6"
                size="lg"
                lh={1.7}
                maw={760}
                mb="xl"
            >
                Cada treino usa material inventado, cabe em quinze minutos e termina numa contagem. Anote a sua: ela fica guardada só neste navegador.{exercisesNote ? ` ${exercisesNote}` : ''}
            </Text>
            <SimpleGrid
                cols={{ base: 1, md: 2 }}
                spacing="xl"
            >
                {EXERCISES.map(exercise => (
                    <Paper
                        key={exercise.id}
                        radius={0}
                        bg="white"
                        bd="1px solid var(--mantine-color-gray-2)"
                        p={{ base: 'md', sm: 'xl' }}
                    >
                        <Stack gap="md">
                            <Stack gap={6}>
                                <Eyebrow>{exercise.chap}</Eyebrow>
                                <Title
                                    order={3}
                                    fz={22}
                                >
                                    {exercise.title}
                                </Title>
                                <Text c="gray.7">{exercise.text}</Text>
                            </Stack>
                            {exercise.material && (
                                <>
                                    <Code
                                        block
                                        fz={13}
                                        p="md"
                                        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.6, maxHeight: 280, overflowY: 'auto' }}
                                    >
                                        {exercise.material}
                                    </Code>
                                    <Box>
                                        <CopyAction
                                            value={exercise.material}
                                            label="Copiar o material"
                                        />
                                    </Box>
                                </>
                            )}
                            <SimpleGrid
                                cols={{ base: 1, xs: 2 }}
                                spacing="sm"
                            >
                                {exercise.counts.map((count, index) => (
                                    <NumberInput
                                        key={count}
                                        id={`kit-count-${exercise.id}-${index}`}
                                        label={count}
                                        min={0}
                                        radius={0}
                                        value={counts[exercise.id]?.[index] ?? ''}
                                        onChange={value => setCounts(prev => ({ ...prev, [exercise.id]: { ...(prev[exercise.id] ?? {}), [index]: value } }))}
                                    />
                                ))}
                            </SimpleGrid>
                            {exercise.after && (
                                <Text
                                    size="sm"
                                    c="gray.6"
                                >
                                    {exercise.after}
                                </Text>
                            )}
                        </Stack>
                    </Paper>
                ))}
            </SimpleGrid>
        </Section>
    )
}

function Notebook() {
    const [entries, setEntries] = usePersisted('notebook', [])
    const [task, setTask] = useState('')
    const [prompt, setPrompt] = useState('')
    const [check, setCheck] = useState('')
    const [error, setError] = useState('')
    const [armed, setArmed] = useState(null)

    const save = event => {
        event.preventDefault()
        if (!prompt.trim()) return setError('Escreva o pedido para guardar.')
        setEntries(prev => [{ task: task.trim(), prompt: prompt.trim(), check: check.trim(), when: new Date().toLocaleDateString('pt-BR') }, ...prev])
        setTask('')
        setPrompt('')
        setCheck('')
        setError('')
    }
    const all = entries.map(entry => `## ${entry.task || 'Sem título'}\n${entry.prompt}${entry.check ? `\nConferir: ${entry.check}` : ''}`).join('\n\n')

    return (
        <Section
            ta="center"
            id="caderno"
            subtitle="A parte que só você escreve"
            title="Meu caderno de pedidos"
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
                Guarde aqui os pedidos que funcionaram no seu trabalho, com o que conferir em cada um. O caderno fica só neste navegador, neste aparelho: ninguém mais vê, e ele some se os dados do navegador forem apagados. Para guardar de vez, copie tudo e cole num documento seu. Não guarde aqui nada das dez coisas.
            </Text>
            <Grid gutter="xl">
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <Paper
                        component="form"
                        onSubmit={save}
                        radius={0}
                        bg="gray.0"
                        bd="1px solid var(--mantine-color-gray-2)"
                        p={{ base: 'md', sm: 'xl' }}
                    >
                        <Stack gap="md">
                            <TextInput
                                id="kit-nb-task"
                                label="Tarefa"
                                placeholder="Ex.: confirmação de consulta"
                                radius={0}
                                value={task}
                                onChange={event => setTask(event.currentTarget.value)}
                            />
                            <Textarea
                                id="kit-nb-prompt"
                                label="O pedido"
                                placeholder="O pedido como você usa, com [campos] no lugar dos dados"
                                radius={0}
                                autosize
                                minRows={5}
                                value={prompt}
                                error={error || undefined}
                                onChange={event => setPrompt(event.currentTarget.value)}
                            />
                            <Textarea
                                id="kit-nb-check"
                                label="O que conferir"
                                placeholder="Ex.: prazo, valor e consolo que vira compromisso"
                                radius={0}
                                autosize
                                minRows={2}
                                value={check}
                                onChange={event => setCheck(event.currentTarget.value)}
                            />
                            <Box>
                                <Button
                                    type="submit"
                                    radius={0}
                                    color="gray.9"
                                >
                                    Guardar no caderno
                                </Button>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 7 }}>
                    <Stack gap="md">
                        {entries.length === 0 ? (
                            <Paper
                                radius={0}
                                bd="1px dashed var(--mantine-color-gray-3)"
                                p="xl"
                            >
                                <Text c="gray.6">Seu caderno está vazio. Guarde aqui o primeiro pedido que funcionou no seu trabalho: a tarefa, o pedido com [campos] no lugar dos dados e o que você confere antes de usar.</Text>
                            </Paper>
                        ) : (
                            <>
                                <Box>
                                    <CopyAction
                                        value={all}
                                        label="Copiar o caderno inteiro"
                                    />
                                </Box>
                                {entries.map((entry, index) => (
                                    <Paper
                                        key={`${entry.when}-${index}`}
                                        radius={0}
                                        bd="1px solid var(--mantine-color-gray-2)"
                                        p="lg"
                                    >
                                        <Stack gap="sm">
                                            <Group justify="space-between">
                                                <Title
                                                    order={4}
                                                    fz={18}
                                                >
                                                    {entry.task || 'Sem título'}
                                                </Title>
                                                <Text
                                                    size="xs"
                                                    c="gray.5"
                                                >
                                                    {entry.when}
                                                </Text>
                                            </Group>
                                            <Code
                                                block
                                                fz={13}
                                                p="sm"
                                                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                                            >
                                                {entry.prompt}
                                            </Code>
                                            {entry.check && (
                                                <Text
                                                    size="sm"
                                                    c="gray.7"
                                                >
                                                    <b>Conferir:</b> {entry.check}
                                                </Text>
                                            )}
                                            <Group gap="sm">
                                                <CopyAction
                                                    value={entry.prompt}
                                                    label="Copiar o pedido"
                                                />
                                                <Button
                                                    variant="default"
                                                    radius={0}
                                                    size="sm"
                                                    leftSection={<IconTrash size={16} />}
                                                    onClick={() => {
                                                        if (armed !== index) return setArmed(index)
                                                        setEntries(prev => prev.filter((_, i) => i !== index))
                                                        setArmed(null)
                                                    }}
                                                >
                                                    {armed === index ? 'Apagar de vez?' : 'Apagar'}
                                                </Button>
                                            </Group>
                                        </Stack>
                                    </Paper>
                                ))}
                            </>
                        )}
                    </Stack>
                </Grid.Col>
            </Grid>
        </Section>
    )
}

// ─── The page ────────────────────────────────────────────────────────────

const linkNote = (label, href) => (
    <Anchor
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        c="gray.7"
        underline="always"
    >
        {label}
    </Anchor>
)

const linkList = links =>
    links.map((link, index) => (
        <span key={link.label}>
            {index > 0 && ' · '}
            {link.prefix}
            {link.href ? linkNote(link.label, link.href) : link.label}
        </span>
    ))

/** One of a book's own sections, from its data module (see `bands`). */
function Band({ band }) {
    const { type, items, ...props } = band
    if (type === 'criteria') return <CriteriaList {...props} items={items.map(({ links, ...item }) => (links ? { ...item, note: <>{linkList(links)}</> } : item))} />
    if (type === 'steps') return <Steps {...props} items={items.map((item, index) => ({ ...item, number: String(index + 1).padStart(2, '0'), icon: ICONS[item.icon] }))} />
    return <Callout {...props} items={items} />
}

/**
 * The kit's working sections: a task kit's list of prompts, or a build
 * kit's reader's system and workbench, then what every kit may carry.
 */
function KitBody() {
    const { TRAIL, SYSTEM, TEMPLATES, EXERCISES, bands, notebook } = useKit()
    return (
        <>
            {SYSTEM && <YourSystem />}

            {/* A build kit works step by step: its prompts live inside the
                trail. A task kit keeps the list of prompts. */}
            {TRAIL ? <Workbench /> : <Prompts />}

            {TEMPLATES.length > 0 && <Templates />}

            {bands.map(band => (
                <Band
                    key={band.id}
                    band={band}
                />
            ))}

            {EXERCISES.length > 0 && <Exercises />}

            {notebook !== false && <Notebook />}
        </>
    )
}

export function BookKit() {
    const { slug } = useParams()
    const kit = KITS[slug]
    // A book not yet on sale is not in the catalogue (brand/arquitetura.md):
    // its kit answers 404, unless its data module opens it by its address
    // (`open`), and then shows the stand-in it carries (data/kit-book.js).
    const book = bookBySlug(slug) ?? standInBook(slug, kit)

    useSeoMeta(book ? kitSeo(book) : { title: 'Kit não encontrado', description: '', url: `/books/${slug}/kit` })

    if (!book || !kit) return <NotFound />
    const { KIT, RULES, SOURCES, UPDATES } = kit

    const bookPath = bookHome(book)

    return (
        <KitContext.Provider value={kit}>
            {/* The hero of the book page, so the reader sees at once which
                book this kit belongs to: its name, its volume and its cover. */}
            <Box
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 80, md: 120 }}
            >
                <Container size="lg">
                    <Grid
                        gutter={{ base: 32, md: 64 }}
                        align="center"
                    >
                        <Grid.Col
                            span={{ base: 12, md: 8 }}
                            order={{ base: 2, md: 1 }}
                        >
                            <Stack
                                gap="xl"
                                align="flex-start"
                                maw="100%"
                                style={{ minWidth: 0 }}
                            >
                                <Anchor
                                    component={Link}
                                    to={bookPath}
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
                                        {book.kit.label} · {book.title} · Volume {book.volume}
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
                                    O kit do {book.title}
                                </Text>
                                <Text
                                    fz={{ base: 16, md: 18 }}
                                    c="dimmed"
                                    lh={1.6}
                                    style={{ maxWidth: 'min(560px, 100%)' }}
                                >
                                    {KIT.lead}
                                </Text>
                                <Group
                                    gap="lg"
                                    rowGap="xs"
                                >
                                    {KIT.promises.map(promise => (
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
                                                fw={700}
                                            >
                                                {promise}
                                            </Text>
                                        </Group>
                                    ))}
                                </Group>
                                <Text
                                    size="sm"
                                    c="gray.5"
                                    maw={560}
                                >
                                    {KIT.checkedOn}
                                </Text>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col
                            span={{ base: 12, md: 4 }}
                            order={{ base: 1, md: 2 }}
                        >
                            <Box
                                component={Link}
                                to={bookPath}
                                style={{ display: 'flex', justifyContent: 'center', lineHeight: 0 }}
                            >
                                <img
                                    src={book.cover}
                                    alt={`Capa de ${book.title}`}
                                    width="240"
                                    height="384"
                                    style={{ width: '100%', maxWidth: 200, height: 'auto', border: '1px solid var(--mantine-color-gray-2)' }}
                                />
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            <Callout
                id="comece"
                subtitle="Comece aqui"
                title={kit.rulesTitle ?? 'Três regras antes de qualquer pedido'}
                description={`São as do livro ${book.title}, e valem para tudo o que está neste kit.`}
                cardLabel="As três regras"
                items={RULES}
                background="white"
            />

            <KitBody />

            <CriteriaList
                id="fontes"
                subtitle="Onde conferir o que a IA não sabe"
                title="As fontes oficiais"
                items={SOURCES.map(source => ({
                    criterion: source.title,
                    value: source.text,
                    note: source.links.length ? (
                        <>
                            {source.links.map((link, index) => (
                                <span key={link.href}>
                                    {index > 0 && ' · '}
                                    {linkNote(link.label, link.href)}
                                </span>
                            ))}
                        </>
                    ) : undefined,
                }))}
                background="gray"
            />

            <CTABanner
                subtitle={`Atualizado em ${UPDATES[0].date}`}
                title={`Este kit acompanha o livro ${book.title}`}
                description={`${UPDATES[0].text} Feito com o auxílio de inteligência artificial; revisado e aprovado por humanos.`}
                cta={{ label: book.isOnSale === false ? 'Ver os livros' : 'Ver o livro', href: bookPath, icon: <IconArrowLeft size={20} />, size: 'lg' }}
                secondaryCta={book.store ? { label: 'Ver na Amazon', href: book.store, target: '_blank', icon: <IconExternalLink size={20} />, size: 'lg' } : undefined}
                background="white"
            />
        </KitContext.Provider>
    )
}
