import { Anchor, Box, Button, Code, Container, CopyButton, Grid, Group, List, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link, useParams } from 'react-router-dom'
import { useMediaQuery } from '@mantine/hooks'
import { CTABanner, SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconArrowLeft, IconArrowRight, IconCheck, IconCopy, IconDownload } from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/useSeoMeta'
import { snippetIndexSeo, snippetSeo } from '../data/seo'
import { SITE } from '../data/site'
import { NotFound } from './NotFound'

/**
 * The micro-lead pages: /prompts, /rules and /agents, each an index and one
 * page per item (docs/2026-10-03-MICRO-ISCAS-A-LISTA.md).
 *
 * One shape for the three collections, because the reader's job is the same
 * in all of them: see what the item solves, copy it, check the result, and
 * see where it came from. The order of the page follows filter 9 of the
 * catalogue of leads: the result first, the thing to copy right below it,
 * nothing to learn before using it.
 *
 * The words live in data/prompts.js, data/rules.js and data/agents.js, which
 * scripts/prerender.js also reads: what a crawler gets in the HTML is what the
 * reader sees.
 */

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

function CopyAction({ value, label }) {
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

/** Saves the agent file as <name>.md, the way it goes into a project. */
function DownloadAction({ value, file }) {
    const save = () => {
        const url = URL.createObjectURL(new Blob([value], { type: 'text/markdown' }))
        const link = Object.assign(document.createElement('a'), { href: url, download: file })
        link.click()
        URL.revokeObjectURL(url)
    }
    return (
        <Button
            w={{ base: '100%', xs: 'auto' }}
            onClick={save}
            radius={0}
            variant="default"
            size="sm"
            leftSection={<IconDownload size={16} />}
        >
            Baixar {file}
        </Button>
    )
}

/** `cta.href: 'whatsapp'` stands for the founder's WhatsApp, kept in data/site.js. */
const ctaHref = cta => (cta.href === 'whatsapp' ? SITE.whatsapp : (cta.href ?? cta.to))

function Hero({ collection, title, lead, back }) {
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
                            to={collection.path}
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
                                {collection.eyebrow}
                            </Group>
                        </Anchor>
                    ) : (
                        <Eyebrow>{collection.eyebrow}</Eyebrow>
                    )}
                    <Text c="gray.9"
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

/** /prompts, /rules or /agents: every item, with its one-line promise. */
export function SnippetIndex({ collection }) {
    useSeoMeta(snippetIndexSeo(collection))
    return (
        <>
            <Hero
                collection={collection}
                title={collection.title}
                lead={collection.description}
            />
            <Container
                size="lg"
                py={{ base: 48, md: 80 }}
            >
                <SimpleGrid
                    cols={{ base: 1, sm: 2 }}
                    spacing={0}
                    style={{ borderTop: '1px solid var(--mantine-color-gray-2)', borderLeft: '1px solid var(--mantine-color-gray-2)' }}
                >
                    {collection.items.map(item => (
                        <Box
                            key={item.slug}
                            component={Link}
                            to={`${collection.path}/${item.slug}`}
                            p={{ base: 'lg', md: 'xl' }}
                            style={{ borderRight: '1px solid var(--mantine-color-gray-2)', borderBottom: '1px solid var(--mantine-color-gray-2)', textDecoration: 'none', color: 'inherit' }}
                        >
                            <Stack gap="xs">
                                <Text
                                    fw={800}
                                    fz={18}
                                    c="gray.9"
                                >
                                    {item.label}
                                </Text>
                                <Text
                                    c="gray.6"
                                    lh={1.6}
                                >
                                    {item.lead}
                                </Text>
                                <Group
                                    gap={6}
                                    c="gray.9"
                                >
                                    <Text c="gray.9"
                                        fw={700}
                                        fz="sm"
                                    >
                                        Abrir
                                    </Text>
                                    <IconArrowRight size={16} />
                                </Group>
                            </Stack>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </>
    )
}

/** /prompts/<slug>, /rules/<slug> or /agents/<slug>. */
export function SnippetPage({ collection }) {
    const { slug } = useParams()
    const item = collection.items.find(entry => entry.slug === slug)
    useSeoMeta(item ? snippetSeo(collection, item) : { title: 'Página não encontrada', description: '', url: `${collection.path}/${slug}` })
    if (!item) return <NotFound />

    const others = collection.items.filter(entry => entry.slug !== item.slug)
    const cta = item.cta ?? collection.cta

    return (
        <>
            <Hero
                collection={collection}
                title={item.title}
                lead={item.lead}
                back
            />

            <Container
                size="lg"
                py={{ base: 48, md: 80 }}
            >
                <Stack gap={48}>
                    <Stack gap="sm">
                        <Group
                            justify="space-between"
                            align="center"
                            gap="sm"
                        >
                            <Eyebrow>{collection.codeLabel}</Eyebrow>
                            <Group gap="sm">
                                {item.file && (
                                    <DownloadAction
                                        value={item.code}
                                        file={item.file}
                                    />
                                )}
                                <CopyAction
                                    value={item.code}
                                    label="Copiar"
                                />
                            </Group>
                        </Group>
                        <Code
                            block
                            fz={14}
                            p="md"
                            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.6 }}
                        >
                            {item.code}
                        </Code>
                    </Stack>

                    <Grid gutter={{ base: 'xl', md: 48 }}>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Stack gap="sm">
                                <Eyebrow>{item.never ? 'O que ele nunca faz sozinho' : 'Confira'}</Eyebrow>
                                <List
                                    spacing="xs"
                                    c="gray.7"
                                    icon={
                                        <IconCheck
                                            size={18}
                                            stroke={2}
                                        />
                                    }
                                >
                                    {(item.never ?? item.checks).map(entry => (
                                        <List.Item key={entry}>{entry}</List.Item>
                                    ))}
                                </List>
                                {item.level && (
                                    <Text
                                        size="sm"
                                        c="gray.5"
                                    >
                                        Nível de confiança: {item.level}
                                    </Text>
                                )}
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Stack gap="sm">
                                <Eyebrow>{item.test ? 'No teste' : 'De onde veio'}</Eyebrow>
                                <Text
                                    c="gray.7"
                                    lh={1.7}
                                >
                                    {item.test ?? item.story}
                                </Text>
                                {item.source && (
                                    <Text
                                        size="sm"
                                        c="gray.5"
                                    >
                                        {item.source}
                                    </Text>
                                )}
                            </Stack>
                        </Grid.Col>
                    </Grid>

                    <Stack gap="sm">
                        <Eyebrow>{collection.more}</Eyebrow>
                        <SimpleGrid
                            cols={{ base: 1, sm: 2, md: 3 }}
                            spacing="xs"
                        >
                            {others.map(entry => (
                                <Anchor
                                    key={entry.slug}
                                    component={Link}
                                    to={`${collection.path}/${entry.slug}`}
                                    c="gray.9"
                                    fw={600}
                                    fz="sm"
                                >
                                    {entry.label}
                                </Anchor>
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Stack>
            </Container>

            <CTABanner
                subtitle={collection.eyebrow}
                title={cta.title}
                description={cta.description}
                cta={{ label: cta.label, href: ctaHref(cta), icon: <IconArrowRight size={20} />, size: 'lg' }}
                background="gray"
            />
        </>
    )
}
