import { Anchor, Box, Button, Container, Group, SimpleGrid, Stack, Table, Text, Title } from '@mantine/core'
import { Link, useParams } from 'react-router-dom'
import { IconArrowLeft, IconArrowRight, IconBrandGithub, IconDownload } from '@tabler/icons-react'
import { SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { useSeoMeta } from '../hooks/use-seo-meta'
import { ALTERNATIVES, alternativesByApp } from '../data/alternatives'
import { alternativeSeo, alternativesIndexSeo } from '../data/seo'
import { NotFound } from './NotFound'

/**
 * /alternatives and /alternatives/<slug>: one page per paid or closed Mac app,
 * with the free and open-source app of the founder that does the same job.
 *
 * Each page answers what the person who searched "alternativa ao X" wants to
 * know before switching: what it costs, whether the code is open, where it
 * runs, what leaves the Mac, and where X is still the better choice. Every
 * fact about X has its source and date on the page (data/alternatives.js).
 *
 * The words live in data/alternatives.js, which scripts/prerender.js also
 * reads: what a crawler gets in the HTML is what the reader sees.
 */

const BORDER = '1px solid var(--mantine-color-gray-2)'

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

function Hero({ title, lead, back }) {
    return (
        <Box
            bg={SECTION_BACKGROUNDS.gray}
            py={{ base: 64, md: 96 }}
        >
            <Container size="lg">
                <Stack
                    gap="lg"
                    maw={820}
                >
                    {back ? (
                        <Anchor
                            component={Link}
                            to={ALTERNATIVES.path}
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
                                {ALTERNATIVES.eyebrow}
                            </Group>
                        </Anchor>
                    ) : (
                        <Eyebrow>{ALTERNATIVES.eyebrow}</Eyebrow>
                    )}
                    <Text
                        c="gray.9"
                        component="h1"
                        m={0}
                        fz={{ base: 28, sm: 38, md: 46 }}
                        lh={1.15}
                        fw={800}
                        style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
                    >
                        {title}
                    </Text>
                    <Text
                        fz={{ base: 16, md: 18 }}
                        c="dimmed"
                        lh={1.6}
                    >
                        {lead}
                    </Text>
                </Stack>
            </Container>
        </Box>
    )
}

/** /alternatives: every page, grouped by the founder's app that replaces the paid one. */
export function AlternativesIndex() {
    useSeoMeta(alternativesIndexSeo())
    return (
        <>
            <Hero
                title={ALTERNATIVES.title}
                lead={ALTERNATIVES.description}
            />
            <Container
                size="lg"
                py={{ base: 48, md: 80 }}
            >
                <Stack gap={56}>
                    {alternativesByApp().map(({ app, items }) => (
                        <Stack
                            key={app.id}
                            gap="md"
                        >
                            <Stack gap={4}>
                                <Title
                                    order={2}
                                    fz={{ base: 22, md: 26 }}
                                    c="gray.9"
                                >
                                    {app.name}
                                </Title>
                                <Text
                                    c="gray.6"
                                    lh={1.6}
                                    maw={720}
                                >
                                    {app.line}
                                </Text>
                            </Stack>
                            <SimpleGrid
                                cols={{ base: 1, sm: 2, md: 3 }}
                                spacing={0}
                                style={{ borderTop: BORDER, borderLeft: BORDER }}
                            >
                                {items.map(item => (
                                    <Box
                                        key={item.slug}
                                        component={Link}
                                        to={`${ALTERNATIVES.path}/${item.slug}`}
                                        p={{ base: 'lg', md: 'xl' }}
                                        style={{ borderRight: BORDER, borderBottom: BORDER, textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Stack gap="xs">
                                            <Text
                                                fw={800}
                                                fz={18}
                                                c="gray.9"
                                            >
                                                Alternativa ao {item.competitor}
                                            </Text>
                                            <Text
                                                c="gray.6"
                                                lh={1.6}
                                            >
                                                {item.card}
                                            </Text>
                                            <Group
                                                gap={6}
                                                c="gray.9"
                                            >
                                                <Text
                                                    c="gray.9"
                                                    fw={700}
                                                    fz="sm"
                                                >
                                                    Comparar
                                                </Text>
                                                <IconArrowRight size={16} />
                                            </Group>
                                        </Stack>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Stack>
                    ))}
                    <Text
                        size="sm"
                        c="gray.5"
                        maw={720}
                    >
                        {ALTERNATIVES.note}
                    </Text>
                </Stack>
            </Container>
        </>
    )
}

function Section({ title, children }) {
    return (
        <Stack gap="sm">
            <Title
                order={2}
                fz={{ base: 20, md: 24 }}
                c="gray.9"
            >
                {title}
            </Title>
            {children}
        </Stack>
    )
}

function Paragraph({ children }) {
    return (
        <Text
            c="gray.7"
            lh={1.7}
        >
            {children}
        </Text>
    )
}

/** Cost, open code, where it runs, what leaves the Mac: one row each, our app first. */
function Comparison({ app, item }) {
    return (
        <Box style={{ border: BORDER }}>
            <Table
                verticalSpacing="sm"
                horizontalSpacing="sm"
                fz={{ base: 'sm', md: 'md' }}
                layout="fixed"
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w="26%" />
                        <Table.Th c="gray.9">{app.name}</Table.Th>
                        <Table.Th c="gray.9">{item.competitor}</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {item.compare.map(row => (
                        <Table.Tr key={row.name}>
                            <Table.Th
                                fw={700}
                                c="gray.6"
                                style={{ verticalAlign: 'top' }}
                            >
                                {row.name}
                            </Table.Th>
                            <Table.Td style={{ verticalAlign: 'top' }}>{row.ours}</Table.Td>
                            <Table.Td style={{ verticalAlign: 'top' }}>{row.theirs}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Box>
    )
}

/** /alternatives/<slug>. */
export function AlternativePage() {
    const { slug } = useParams()
    const item = ALTERNATIVES.items.find(entry => entry.slug === slug)
    useSeoMeta(item ? alternativeSeo(item) : { title: 'Página não encontrada', description: '', url: `${ALTERNATIVES.path}/${slug}` })
    if (!item) return <NotFound />

    const app = ALTERNATIVES.apps[item.app]
    const others = ALTERNATIVES.items.filter(entry => entry.slug !== item.slug && entry.app === item.app)

    return (
        <>
            <Hero
                title={item.title}
                lead={item.lead}
                back
            />

            <Container
                size="lg"
                py={{ base: 48, md: 80 }}
            >
                <Stack
                    gap={48}
                    maw={820}
                >
                    <Section title="Para quem é">
                        <Paragraph>{item.forWhom}</Paragraph>
                    </Section>

                    <Section title={`O ${app.name}, em poucas linhas`}>
                        <Paragraph>{item.ourApp}</Paragraph>
                        <Group
                            gap="sm"
                            mt="xs"
                        >
                            <Button
                                component="a"
                                href={`${app.toolPath}#baixar`}
                                radius={0}
                                color="gray.9"
                                w={{ base: '100%', xs: 'auto' }}
                                leftSection={<IconDownload size={16} />}
                            >
                                Baixar o {app.name}
                            </Button>
                            <Button
                                component="a"
                                href={app.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                radius={0}
                                variant="default"
                                w={{ base: '100%', xs: 'auto' }}
                                leftSection={<IconBrandGithub size={16} />}
                            >
                                Ver o código no GitHub
                            </Button>
                        </Group>
                        <Text
                            size="sm"
                            c="gray.5"
                        >
                            {app.requirements}
                        </Text>
                    </Section>

                    <Section title={`${app.name} e ${item.competitor}, lado a lado`}>
                        <Comparison
                            app={app}
                            item={item}
                        />
                    </Section>

                    <Section title={`Onde o ${item.competitor} é melhor`}>
                        <Paragraph>{item.better}</Paragraph>
                    </Section>

                    <Section title="Perguntas">
                        <Stack gap="lg">
                            {item.faq.map(entry => (
                                <Stack
                                    key={entry.question}
                                    gap={4}
                                >
                                    <Title
                                        order={3}
                                        fz={17}
                                        c="gray.9"
                                    >
                                        {entry.question}
                                    </Title>
                                    <Paragraph>{entry.answer}</Paragraph>
                                </Stack>
                            ))}
                        </Stack>
                    </Section>

                    <Stack gap={4}>
                        <Eyebrow>Fonte e data</Eyebrow>
                        <Text
                            size="sm"
                            c="gray.6"
                            lh={1.6}
                        >
                            {item.sources.note}{' '}
                            {item.sources.links.map((source, index) => (
                                <span key={source.href}>
                                    {index > 0 && ' · '}
                                    <Anchor
                                        href={source.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        c="gray.7"
                                        size="sm"
                                    >
                                        {source.label}
                                    </Anchor>
                                </span>
                            ))}
                        </Text>
                    </Stack>

                    {others.length > 0 && (
                        <Stack gap="sm">
                            <Eyebrow>{`O ${app.name} também substitui`}</Eyebrow>
                            <Group gap="lg">
                                {others.map(entry => (
                                    <Anchor
                                        key={entry.slug}
                                        component={Link}
                                        to={`${ALTERNATIVES.path}/${entry.slug}`}
                                        c="gray.9"
                                        fw={700}
                                        fz="sm"
                                    >
                                        {`Alternativa ao ${entry.competitor}`}
                                    </Anchor>
                                ))}
                            </Group>
                        </Stack>
                    )}

                    <Anchor
                        component={Link}
                        to={ALTERNATIVES.path}
                        c="gray.9"
                        fw={700}
                        fz="sm"
                    >
                        Ver todas as alternativas para Mac
                    </Anchor>
                </Stack>
            </Container>
        </>
    )
}
