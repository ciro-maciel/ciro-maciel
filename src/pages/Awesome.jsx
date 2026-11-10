import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Anchor, Box, Button, Container, Group, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core'
import { CTABanner, FeaturesGrid, SECTION_BACKGROUNDS, StatsGrid } from '@ciromaciel/components-kit'
import {
    IconArrowRight,
    IconBraces,
    IconBrandGithub,
    IconCircleCheck,
    IconCoffee,
    IconGitPullRequest,
    IconLanguage,
    IconRss,
    IconSearch,
} from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/use-seo-meta'
import { iconOfList } from '../components/awesome-icons'
import AWESOME_LISTS from '../data/awesome-lists.json'
import { AWESOME } from '../data/awesome'
import { awesomeSeo } from '../data/seo'
import { NewsletterBox } from '../components/NewsletterBox'

/**
 * /awesome: the founder's curated lists, grouped by who they are for, in the
 * shape of /mcp: a hero with a preview of one list, how every list is made,
 * the lists as icon cards with a search, and the call to contribute. Each card
 * opens the list's repository on GitHub, where the README is the list itself.
 * The words live in data/awesome.js, which scripts/prerender.js also reads.
 */

const BORDER = '1px solid var(--mantine-color-gray-2)'

const HOW_ICONS = {
    'circle-check': IconCircleCheck,
    language: IconLanguage,
    braces: IconBraces,
    'git-pull-request': IconGitPullRequest,
}

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

/** The right column of the hero: how one list reads, with real items of awesome-pix. */
function Preview() {
    const { preview } = AWESOME
    return (
        <Box
            bg="white"
            style={{ border: BORDER, alignSelf: 'center' }}
            aria-label={preview.label}
        >
            <Group
                px="md"
                py="sm"
                bg="gray.0"
                justify="space-between"
                wrap="nowrap"
            >
                <Label>{preview.label}</Label>
                <IconBrandGithub
                    size={16}
                    stroke={1.5}
                    color="var(--mantine-color-gray-5)"
                />
            </Group>
            <Stack
                gap="sm"
                px="md"
                py="md"
                style={{ borderTop: BORDER }}
            >
                <Text
                    fw={900}
                    fz={22}
                    c="gray.9"
                    style={{ letterSpacing: '-0.02em' }}
                >
                    {preview.list}
                </Text>
                <Group
                    gap={6}
                    wrap="nowrap"
                    align="center"
                >
                    {preview.languages.map((language, index) => (
                        <img
                            key={language.code}
                            src={`${preview.badges}/${language.code}${index === 0 ? '-on' : ''}.svg`}
                            alt={language.label}
                            // Flags and the badge's own gray: the kit's dark-mode invert of SVGs must not touch them.
                            data-keep-colors
                            height={22}
                            style={{ display: 'block', flexShrink: 0 }}
                        />
                    ))}
                    <Text
                        component="span"
                        fz={12}
                        fw={700}
                        pl={4}
                        c="gray.5"
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        {preview.more}
                    </Text>
                </Group>
            </Stack>
            {preview.items.map(item => (
                <Stack
                    key={item.name}
                    gap={4}
                    px="md"
                    py="sm"
                    style={{ borderTop: BORDER }}
                >
                    <Group
                        gap={8}
                        wrap="nowrap"
                        align="flex-start"
                    >
                        <IconCircleCheck
                            size={16}
                            stroke={1.5}
                            color="var(--mantine-color-gray-9)"
                            style={{ flexShrink: 0, marginTop: 3 }}
                        />
                        <Text
                            fz={14}
                            c="gray.6"
                            lh={1.5}
                        >
                            <Text
                                component="span"
                                fw={800}
                                c="gray.9"
                            >
                                {item.name}
                            </Text>{' '}
                            {item.description}
                        </Text>
                    </Group>
                    <Group
                        gap={6}
                        pl={24}
                    >
                        {item.tags.map(tag => (
                            <Text
                                key={tag}
                                component="span"
                                fz={10}
                                fw={800}
                                tt="uppercase"
                                lts="1px"
                                px={6}
                                py={2}
                                c={tag === 'do autor' ? 'white' : 'gray.7'}
                                bg={tag === 'do autor' ? 'gray.9' : 'transparent'}
                                style={{ border: '1px solid var(--mantine-color-gray-9)' }}
                            >
                                {tag}
                            </Text>
                        ))}
                    </Group>
                </Stack>
            ))}
            <Group
                gap="md"
                px="md"
                py="sm"
                bg="gray.0"
                style={{ borderTop: BORDER }}
            >
                {preview.formats.map(format => (
                    <Label
                        key={format}
                        c="gray.6"
                    >
                        {format}
                    </Label>
                ))}
            </Group>
        </Box>
    )
}

function Hero() {
    return (
        <Box
            bg={SECTION_BACKGROUNDS.gray}
            py={{ base: 64, md: 104 }}
        >
            <Container size="lg">
                <SimpleGrid
                    cols={{ base: 1, md: 2 }}
                    spacing={{ base: 40, md: 64 }}
                >
                    <Stack
                        gap="lg"
                        justify="center"
                    >
                        <Eyebrow>
                            {AWESOME.eyebrow} · {AWESOME.stats.items[0].value} listas
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
                            {AWESOME.title}
                        </Text>
                        <Text
                            fz={{ base: 17, md: 19 }}
                            c="gray.6"
                            lh={1.6}
                            maw={720}
                        >
                            {AWESOME.description}
                        </Text>
                        <Group gap="md">
                            <Button
                                component="a"
                                href="#listas"
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
                                Ver as listas
                            </Button>
                            <Button
                                component="a"
                                href={AWESOME.github}
                                target="_blank"
                                rel="noopener"
                                radius={0}
                                variant="default"
                                size="md"
                                leftSection={
                                    <IconBrandGithub
                                        size={16}
                                        stroke={1.5}
                                    />
                                }
                            >
                                No GitHub
                            </Button>
                        </Group>
                    </Stack>
                    <Preview />
                </SimpleGrid>
            </Container>
        </Box>
    )
}

function ListCard({ list }) {
    const Icon = iconOfList(list.slug)
    const data = AWESOME_LISTS[list.slug]
    // A list with its data here opens its page on this site; one not built yet opens GitHub.
    const target = data ? { component: Link, to: `${AWESOME.path}/${list.slug}` } : { component: 'a', href: `${list.url}?ref=site-awesome`, target: '_blank', rel: 'noopener' }
    return (
        <Box
            {...target}
            p={{ base: 'lg', md: 'xl' }}
            bg="white"
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
                <Label>{list.kind}</Label>
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
                    {list.title}
                </Text>
                <Text
                    c="gray.6"
                    lh={1.55}
                    fz={15}
                >
                    {list.description}
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
                    {data ? `${data.count} itens · 15 idiomas` : list.slug}
                </Text>
                <IconArrowRight
                    size={16}
                    stroke={1.5}
                />
            </Group>
        </Box>
    )
}

const normalize = text => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

function Lists() {
    const [query, setQuery] = useState('')
    const groups = useMemo(() => {
        const words = normalize(query).split(/\s+/).filter(Boolean)
        return AWESOME.groups
            .map(group => ({
                ...group,
                lists: group.lists.filter(list => {
                    const text = normalize(`${list.title} ${list.description} ${list.kind}`)
                    return words.every(word => text.includes(word))
                }),
            }))
            .filter(group => group.lists.length)
    }, [query])

    return (
        <Box
            id="listas"
            bg={SECTION_BACKGROUNDS.gray}
            py={{ base: 64, md: 96 }}
        >
            <Container size="lg">
                <Stack gap={48}>
                    <Stack
                        gap="lg"
                        align="center"
                    >
                        <Stack
                            gap="xs"
                            maw={760}
                            align="center"
                            ta="center"
                        >
                            <Eyebrow>As listas</Eyebrow>
                            <Title
                                order={2}
                                fz={{ base: 26, md: 34 }}
                                lh={1.15}
                                c="gray.9"
                                style={{ letterSpacing: '-0.02em' }}
                            >
                                Escolha pelo que você faz
                            </Title>
                        </Stack>
                        <TextInput
                            w="100%"
                            maw={520}
                            radius={0}
                            size="md"
                            value={query}
                            onChange={event => setQuery(event.currentTarget.value)}
                            placeholder="Procure: Pix, contador, WhatsApp, livros..."
                            aria-label="Procurar uma lista"
                            leftSection={
                                <IconSearch
                                    size={18}
                                    stroke={1.5}
                                />
                            }
                        />
                    </Stack>
                    {groups.map(group => (
                        <Stack
                            key={group.id}
                            gap="md"
                        >
                            <Stack gap={4}>
                                <Title
                                    order={3}
                                    fz={{ base: 22, md: 26 }}
                                    c="gray.9"
                                >
                                    {group.title}
                                </Title>
                                <Text
                                    c="gray.6"
                                    lh={1.6}
                                    maw={720}
                                >
                                    {group.line}
                                </Text>
                            </Stack>
                            <SimpleGrid
                                cols={{ base: 1, sm: 2, md: 3 }}
                                spacing={0}
                                style={{ borderTop: BORDER, borderLeft: BORDER }}
                            >
                                {group.lists.map(list => (
                                    <ListCard
                                        key={list.slug}
                                        list={list}
                                    />
                                ))}
                            </SimpleGrid>
                        </Stack>
                    ))}
                    {!groups.length && (
                        <Text
                            c="gray.6"
                            ta="center"
                        >
                            Nenhuma lista com “{query}”. Tente outra palavra, ou sugira o tema numa issue.
                        </Text>
                    )}
                    <Stack gap="sm">
                        <Anchor
                            href={AWESOME.feed.href}
                            target="_blank"
                            rel="noopener"
                            c="gray.9"
                            fw={700}
                            fz="sm"
                            underline="never"
                        >
                            <Group
                                gap={6}
                                component="span"
                            >
                                <IconRss
                                    size={16}
                                    stroke={1.5}
                                />
                                {AWESOME.feed.label}
                            </Group>
                        </Anchor>
                        <Anchor
                            href={AWESOME.support.href}
                            target="_blank"
                            rel="noopener"
                            c="gray.9"
                            fw={700}
                            fz="sm"
                            underline="never"
                        >
                            <Group
                                gap={6}
                                component="span"
                            >
                                <IconCoffee
                                    size={16}
                                    stroke={1.5}
                                />
                                {AWESOME.support.label}
                                <Text
                                    component="span"
                                    c="gray.5"
                                    fw={500}
                                    fz="sm"
                                >
                                    {AWESOME.support.note}
                                </Text>
                            </Group>
                        </Anchor>
                        <Text
                            size="sm"
                            c="gray.5"
                            maw={720}
                        >
                            {AWESOME.note}
                        </Text>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

export function Awesome() {
    useSeoMeta(awesomeSeo())
    const { stats, how, closing } = AWESOME
    return (
        <>
            <Hero />

            <StatsGrid
                id="numeros"
                subtitle={stats.subtitle}
                title={stats.title}
                items={stats.items}
                note={stats.note}
                background="white"
            />

            <Lists />

            <FeaturesGrid
                id="como-e-feita"
                subtitle={how.subtitle}
                title={how.title}
                description={how.description}
                items={how.items.map(item => ({
                    title: item.title,
                    description: item.description,
                    visual: { type: 'icon-large', icon: HOW_ICONS[item.icon] },
                }))}
                background="white"
                ta="center"
            />

            <CTABanner
                subtitle={closing.subtitle}
                title={closing.title}
                description={closing.description}
                cta={{ ...closing.cta, icon: <IconBrandGithub size={18} />, target: '_blank' }}
                background="gray"
            />

            <NewsletterBox background={SECTION_BACKGROUNDS.white} />
        </>
    )
}
