import { Anchor, Box, Button, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link, useParams } from 'react-router-dom'
import { CTABanner, SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconArrowLeft, IconArrowRight, IconArrowUpRight, IconBrandGithub, IconCoffee, IconRss } from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/use-seo-meta'
import { AWESOME } from '../data/awesome'
import { awesomeListSeo } from '../data/seo'
import { iconOfList } from '../components/awesome-icons'
import { NewsletterBox } from '../components/NewsletterBox'
import AWESOME_LISTS from '../data/awesome-lists.json'
import { NotFound } from './NotFound'

/**
 * /awesome/<slug>: one curated list, in Portuguese, from the list's own repository
 * (scripts/sync-awesome.js brings it in before every build). Every item links through
 * its short link, as in the README, so a click here counts like a click there.
 * The same words go to the crawler through scripts/prerender.js.
 */

const BORDER = '1px solid var(--mantine-color-gray-2)'

const TAG_LABELS = { oficial: 'oficial', 'codigo-aberto': 'código aberto', gratis: 'grátis', pago: 'pago', api: 'API', sdk: 'SDK' }

const entryOf = slug => AWESOME.groups.flatMap(group => group.lists.map(list => ({ ...list, group }))).find(list => list.slug === slug)

function Label({ children, c = 'gray.5' }) {
    return (
        <Text
            fz={10}
            fw={800}
            tt="uppercase"
            lts="1.5px"
            c={c}
        >
            {children}
        </Text>
    )
}

function Tag({ children, isOurs }) {
    return (
        <Text
            component="span"
            fz={10}
            fw={800}
            tt="uppercase"
            lts="1px"
            px={6}
            py={2}
            c={isOurs ? 'white' : 'gray.7'}
            bg={isOurs ? 'gray.9' : 'transparent'}
            style={{ border: '1px solid var(--mantine-color-gray-9)', whiteSpace: 'nowrap' }}
        >
            {children}
        </Text>
    )
}

function Hero({ entry, list }) {
    const Icon = iconOfList(list.slug)
    return (
        <Box
            bg={SECTION_BACKGROUNDS.gray}
            py={{ base: 56, md: 96 }}
        >
            <Container size="lg">
                <Stack
                    gap="lg"
                    maw={840}
                >
                    <Anchor
                        component={Link}
                        to={AWESOME.path}
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
                            {AWESOME.eyebrow}
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
                        <Text
                            fz={13}
                            fw={800}
                            tt="uppercase"
                            c="gray.5"
                            lts="1.5px"
                        >
                            {entry.kind} · {list.count} itens · 15 idiomas
                        </Text>
                    </Group>
                    <Text
                        c="gray.9"
                        component="h1"
                        m={0}
                        fz={{ base: 32, sm: 42, md: 50 }}
                        lh={1.08}
                        fw={900}
                        style={{ letterSpacing: '-0.04em', textWrap: 'balance' }}
                    >
                        {list.title}
                    </Text>
                    <Text
                        fz={{ base: 17, md: 19 }}
                        c="gray.6"
                        lh={1.6}
                    >
                        {list.intro || list.description}
                    </Text>
                    <Group gap="md">
                        <Button
                            component="a"
                            href={`${entry.url}?ref=site-awesome`}
                            target="_blank"
                            rel="noopener"
                            radius={0}
                            color="gray.9"
                            size="md"
                            leftSection={
                                <IconBrandGithub
                                    size={16}
                                    stroke={1.5}
                                />
                            }
                        >
                            Abrir no GitHub
                        </Button>
                        <Button
                            component="a"
                            href={`https://raw.githubusercontent.com/ciro-maciel/${list.slug}/main/feed/pt.xml`}
                            target="_blank"
                            rel="noopener"
                            radius={0}
                            variant="default"
                            size="md"
                            leftSection={
                                <IconRss
                                    size={16}
                                    stroke={1.5}
                                />
                            }
                        >
                            RSS
                        </Button>
                        <Button
                            component="a"
                            href={AWESOME.support.href}
                            target="_blank"
                            rel="noopener"
                            radius={0}
                            variant="default"
                            size="md"
                            leftSection={
                                <IconCoffee
                                    size={16}
                                    stroke={1.5}
                                />
                            }
                        >
                            Apoie
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </Box>
    )
}

function Contents({ list }) {
    return (
        <Group gap={8}>
            {list.categories.map(category => (
                <Anchor
                    key={category.id}
                    href={`#${category.id}`}
                    underline="never"
                    c="gray.7"
                    fz={13}
                    fw={700}
                    px={10}
                    py={6}
                    style={{ border: BORDER }}
                >
                    {category.title}{' '}
                    <Text
                        component="span"
                        c="gray.5"
                        fz={12}
                        fw={700}
                    >
                        {category.items.length}
                    </Text>
                </Anchor>
            ))}
        </Group>
    )
}

function Item({ item }) {
    return (
        <Box
            component="a"
            href={item.link}
            target="_blank"
            rel="noopener"
            p={{ base: 'md', md: 'lg' }}
            bg="white"
            style={{ borderRight: BORDER, borderBottom: BORDER, textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: 8 }}
        >
            <Group
                justify="space-between"
                align="flex-start"
                wrap="nowrap"
                gap="sm"
            >
                <Text
                    fw={800}
                    fz={16}
                    c="gray.9"
                    lh={1.35}
                >
                    {item.name}
                </Text>
                <IconArrowUpRight
                    size={16}
                    stroke={1.5}
                    color="var(--mantine-color-gray-5)"
                    style={{ flexShrink: 0, marginTop: 3 }}
                />
            </Group>
            <Text
                c="gray.6"
                fz={14}
                lh={1.55}
                style={{ flex: 1 }}
            >
                {item.description}
            </Text>
            {(item.tags.length > 0 || item.ours) && (
                <Group gap={6}>
                    {item.ours && <Tag isOurs>do autor</Tag>}
                    {item.tags.map(tag => (
                        <Tag key={tag}>{TAG_LABELS[tag] ?? tag}</Tag>
                    ))}
                </Group>
            )}
        </Box>
    )
}

function Categories({ list }) {
    return (
        <Box py={{ base: 56, md: 88 }}>
            <Container size="lg">
                <Stack gap={56}>
                    <Stack gap="sm">
                        <Label>Nesta lista</Label>
                        <Contents list={list} />
                    </Stack>
                    {list.categories.map(category => (
                        <Stack
                            key={category.id}
                            id={category.id}
                            gap="md"
                            style={{ scrollMarginTop: 96 }}
                        >
                            <Stack gap={4}>
                                <Title
                                    order={2}
                                    fz={{ base: 22, md: 26 }}
                                    c="gray.9"
                                >
                                    {category.title}
                                </Title>
                                {category.description && (
                                    <Text
                                        c="gray.6"
                                        lh={1.6}
                                        maw={720}
                                    >
                                        {category.description}
                                    </Text>
                                )}
                            </Stack>
                            <SimpleGrid
                                cols={{ base: 1, sm: 2, md: 3 }}
                                spacing={0}
                                style={{ borderTop: BORDER, borderLeft: BORDER }}
                            >
                                {category.items.map(item => (
                                    <Item
                                        key={item.link}
                                        item={item}
                                    />
                                ))}
                            </SimpleGrid>
                        </Stack>
                    ))}
                    <Text
                        size="sm"
                        c="gray.5"
                        maw={720}
                    >
                        Atualizada em {new Date(`${list.updated}T12:00:00Z`).toLocaleDateString('pt-BR')}. {AWESOME.note}
                    </Text>
                </Stack>
            </Container>
        </Box>
    )
}

function Sisters({ entry }) {
    const sisters = entry.group.lists.filter(list => list.slug !== entry.slug)
    if (!sisters.length) return null
    return (
        <Box
            bg={SECTION_BACKGROUNDS.gray}
            py={{ base: 56, md: 88 }}
        >
            <Container size="lg">
                <Stack gap="lg">
                    <Stack gap={4}>
                        <Label>{entry.group.title}</Label>
                        <Title
                            order={2}
                            fz={{ base: 22, md: 26 }}
                            c="gray.9"
                        >
                            Listas irmãs
                        </Title>
                    </Stack>
                    <SimpleGrid
                        cols={{ base: 1, sm: 2, md: 3 }}
                        spacing={0}
                        style={{ borderTop: BORDER, borderLeft: BORDER }}
                    >
                        {sisters.map(list => {
                            const Icon = iconOfList(list.slug)
                            const isHere = Boolean(AWESOME_LISTS[list.slug])
                            const target = isHere ? { component: Link, to: `${AWESOME.path}/${list.slug}` } : { component: 'a', href: `${list.url}?ref=site-awesome`, target: '_blank', rel: 'noopener' }
                            return (
                                <Box
                                    key={list.slug}
                                    {...target}
                                    p="lg"
                                    bg="white"
                                    style={{ borderRight: BORDER, borderBottom: BORDER, textDecoration: 'none', color: 'inherit' }}
                                >
                                    <Group
                                        gap="sm"
                                        wrap="nowrap"
                                        align="flex-start"
                                    >
                                        <Icon
                                            size={24}
                                            stroke={1.5}
                                            color="var(--mantine-color-gray-9)"
                                            style={{ flexShrink: 0 }}
                                        />
                                        <Stack
                                            gap={2}
                                            style={{ flex: 1 }}
                                        >
                                            <Text
                                                fw={800}
                                                c="gray.9"
                                            >
                                                {list.title}
                                            </Text>
                                            <Text
                                                fz={14}
                                                c="gray.6"
                                                lh={1.5}
                                            >
                                                {list.description}
                                            </Text>
                                        </Stack>
                                        <IconArrowRight
                                            size={16}
                                            stroke={1.5}
                                            style={{ flexShrink: 0 }}
                                        />
                                    </Group>
                                </Box>
                            )
                        })}
                    </SimpleGrid>
                </Stack>
            </Container>
        </Box>
    )
}

export function AwesomeList() {
    const { slug } = useParams()
    const entry = entryOf(slug)
    const list = AWESOME_LISTS[slug]
    useSeoMeta(list && entry ? awesomeListSeo(list) : { title: 'Página não encontrada', description: '', url: `${AWESOME.path}/${slug}` })
    if (!entry || !list) return <NotFound />
    const { closing } = AWESOME
    return (
        <>
            <Hero
                entry={entry}
                list={list}
            />
            <Categories list={list} />
            <Sisters entry={entry} />
            <CTABanner
                subtitle={closing.subtitle}
                title={closing.title}
                description={closing.description}
                cta={{ label: 'Sugerir um item', href: `${entry.url}/issues/new/choose`, icon: <IconBrandGithub size={18} />, target: '_blank' }}
                background="white"
            />
            <NewsletterBox background={SECTION_BACKGROUNDS.gray} />
        </>
    )
}
