import { Link } from 'react-router-dom'
import { Box, Group, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import { Section, scrollBehavior } from '@ciromaciel/components-kit'
import { IconArrowRight, IconArticle, IconBrandGithub, IconBrandInstagram, IconBrandYoutube, IconChartBar, IconForms, IconMailOpened, IconRobot, IconServer } from '@tabler/icons-react'
import { START } from '../data/site'

/**
 * The home as a path (31/10/2026); why each block exists is in data/site.js, START.
 *   StartSteps   after the hero: the reader picks the sentence that is theirs
 *   StartProof   after the steps: the site itself runs on the pieces, each one a link
 *   StartFollow  before the letters: the open channels
 *
 * The cards are the house's hairline grid (marketing/website LinkGrid): shared 1px borders,
 * no radius, no fill of their own, so they follow the section in both themes.
 */
const LINE = '1px solid var(--mantine-color-gray-2)'
// data/site.js names the icon; it imports no component.
const ICONS = { server: IconServer, chart: IconChartBar, article: IconArticle, mail: IconMailOpened, forms: IconForms, robot: IconRobot, youtube: IconBrandYoutube, instagram: IconBrandInstagram, github: IconBrandGithub }

/** A card that goes somewhere: a home anchor (`scrollTo`), a route (`to`) or another site (`href`). */
function CardLink({ item, children }) {
    const shared = { p: { base: 'lg', md: 'xl' }, style: { borderRight: LINE, borderBottom: LINE, textDecoration: 'none', color: 'inherit' } }
    if (item.scrollTo)
        return (
            <Box
                component="a"
                href={`#${item.scrollTo}`}
                onClick={event => {
                    event.preventDefault()
                    document.getElementById(item.scrollTo)?.scrollIntoView({ behavior: scrollBehavior() })
                }}
                {...shared}
            >
                {children}
            </Box>
        )
    if (item.to)
        return (
            <Box
                component={Link}
                to={item.to}
                {...shared}
            >
                {children}
            </Box>
        )
    return (
        <Box
            component="a"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            {...shared}
        >
            {children}
        </Box>
    )
}

function Lead({ text }) {
    return (
        <Text
            c="gray.6"
            mb={48}
            maw={720}
            fz={{ base: 16, md: 18 }}
            lh={1.6}
        >
            {text}
        </Text>
    )
}

/** A card with an icon, a name and a line: the proof and the channels. */
function IconCards({ items, cols }) {
    return (
        <SimpleGrid
            cols={cols}
            spacing={0}
            style={{ borderTop: LINE, borderLeft: LINE }}
        >
            {items.map(item => {
                const Icon = ICONS[item.icon]
                return (
                    <CardLink
                        key={item.name}
                        item={item}
                    >
                        <Group
                            gap="md"
                            wrap="nowrap"
                            align="flex-start"
                        >
                            <ThemeIcon
                                size={40}
                                radius={0}
                                variant="light"
                                color="gray"
                                style={{ flexShrink: 0 }}
                            >
                                <Icon
                                    size={22}
                                    stroke={1.5}
                                />
                            </ThemeIcon>
                            <Stack
                                gap={6}
                                style={{ flex: 1, minWidth: 0 }}
                            >
                                <Text
                                    fw={800}
                                    fz={18}
                                    c="gray.9"
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    c="gray.6"
                                    lh={1.6}
                                >
                                    {item.text}
                                </Text>
                            </Stack>
                            <IconArrowRight
                                size={18}
                                stroke={1.5}
                                style={{ flexShrink: 0, marginTop: 4 }}
                            />
                        </Group>
                    </CardLink>
                )
            })}
        </SimpleGrid>
    )
}

export function StartSteps() {
    const { steps } = START
    return (
        <Section
            id={steps.id}
            subtitle={steps.subtitle}
            title={steps.title}
            background="white"
        >
            <Lead text={steps.description} />
            <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 4 }}
                spacing={0}
                style={{ borderTop: LINE, borderLeft: LINE }}
            >
                {steps.items.map(item => (
                    <CardLink
                        key={item.eyebrow}
                        item={item}
                    >
                        <Stack
                            gap="sm"
                            h="100%"
                        >
                            <Text
                                fz={13}
                                fw={800}
                                tt="uppercase"
                                c="gray.6"
                                lts="1.5px"
                            >
                                {item.eyebrow}
                            </Text>
                            <Text
                                fw={800}
                                fz={22}
                                lh={1.25}
                                c="gray.9"
                            >
                                {item.name}
                            </Text>
                            <Text
                                c="gray.6"
                                lh={1.6}
                                style={{ flex: 1 }}
                            >
                                {item.text}
                            </Text>
                            <Group
                                gap={6}
                                c="gray.9"
                                wrap="nowrap"
                            >
                                <Text
                                    c="gray.9"
                                    fw={700}
                                    fz="sm"
                                >
                                    {item.action}
                                </Text>
                                <IconArrowRight
                                    size={16}
                                    stroke={1.5}
                                    style={{ flexShrink: 0 }}
                                />
                            </Group>
                        </Stack>
                    </CardLink>
                ))}
            </SimpleGrid>
        </Section>
    )
}

export function StartProof() {
    const { proof } = START
    return (
        <Section
            id={proof.id}
            subtitle={proof.subtitle}
            title={proof.title}
            background="gray"
        >
            <Lead text={proof.description} />
            <IconCards
                items={proof.items}
                cols={{ base: 1, sm: 2, md: 3 }}
            />
        </Section>
    )
}

export function StartFollow() {
    const { follow } = START
    return (
        <Section
            id={follow.id}
            subtitle={follow.subtitle}
            title={follow.title}
            background="gray"
        >
            <Lead text={follow.description} />
            <IconCards
                items={follow.items}
                cols={{ base: 1, sm: 2 }}
            />
        </Section>
    )
}
