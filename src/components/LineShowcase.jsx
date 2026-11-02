import { useRef, useState } from 'react'
import { Box, Container, SimpleGrid, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import { FeatureSplit, SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconBolt, IconChartBar, IconRobot, IconSpeakerphone, IconUsers } from '@tabler/icons-react'
import { INFRASTRUCTURE, LINES, MEDIA_MAW } from '../data/site'

// The same icons the header menu gives each line (data/catalog.js).
const ICONS = { Infrastructure: IconBolt, Operations: IconChartBar, Customers: IconUsers, Marketing: IconSpeakerphone, Agents: IconRobot }

// The Infrastructure first, with its own copy untouched, then the lines that run on it.
const TABS = [
    { ...INFRASTRUCTURE, name: 'Infrastructure', domain: 'myinfrastructure.click' },
    // Each line's title is its name, as "Infrastructure" is; the hero sentence of
    // its site opens the paragraph, which on that site sits right under it.
    ...LINES.items.map(line => ({
        ...line,
        title: line.name,
        description: `${line.sentence} ${line.description}`,
        cta: { label: `Conhecer o ${line.name}`, href: line.href },
    })),
]

// "Analytics: uma linha…" → the product name in bold, so the list reads as the
// products of the line at a glance. Items without a product prefix pass through.
const withProductName = item => {
    const match = /^([A-Z][A-Za-z]+): (.*)$/.exec(item)
    if (!match) return item
    return (
        <>
            <strong>{match[1]}</strong>: {match[2]}
        </>
    )
}

/**
 * The lines, in the gray band the Infrastructure had alone (08/10/2026).
 *
 * A row of four tabs on top; the chosen one swaps the block underneath, which
 * is the kit's FeatureSplit in the same shape the Infrastructure always had.
 * The block is keyed by the tab, so a click remounts it and the CSS entrance
 * runs again (home.css, `.line-panel`). It slides in from the side of the tab
 * that was clicked, so moving right reads as moving right.
 */
export function LineShowcase() {
    const [active, setActive] = useState(0)
    const direction = useRef(1)
    const tabRefs = useRef([])

    const choose = index => {
        if (index === active) return
        direction.current = index > active ? 1 : -1
        setActive(index)
    }

    // Arrow keys move between tabs, as a tablist does (WAI-ARIA tabs pattern).
    const onKeyDown = event => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
        if (!step) return
        event.preventDefault()
        const next = (active + step + TABS.length) % TABS.length
        choose(next)
        tabRefs.current[next]?.focus()
    }

    const tab = TABS[active]

    return (
        <Box
            id="infrastructure"
            bg={SECTION_BACKGROUNDS.gray}
            className="line-showcase"
        >
            <Container
                size="lg"
                pt={{ base: 64, md: 96 }}
            >
                {/* THE HEADER (31/10/2026): the second half of the headline's promise, "as
                    ferramentas". The tabs below say what the reader needs to do; the line's
                    name is the small line under it. */}
                <Stack
                    gap="md"
                    maw={640}
                    mb={48}
                >
                    <Text
                        fz={13}
                        fw={700}
                        c="gray.6"
                        tt="uppercase"
                        style={{ letterSpacing: '0.1em' }}
                    >
                        {LINES.header.subtitle}
                    </Text>
                    <Title
                        order={2}
                        fz={{ base: 32, sm: 42, md: 52 }}
                        lh={1.08}
                        fw={800}
                        style={{ letterSpacing: '-0.03em' }}
                    >
                        {LINES.header.title}
                    </Title>
                    <Text
                        fz={{ base: 16, md: 18 }}
                        c="dimmed"
                        lh={1.6}
                    >
                        {LINES.header.description}
                    </Text>
                </Stack>
                <SimpleGrid
                    cols={{ base: 2, sm: 3, lg: 5 }}
                    spacing={12}
                    role="tablist"
                    aria-label="As linhas"
                    onKeyDown={onKeyDown}
                >
                    {TABS.map((item, index) => {
                        const Icon = ICONS[item.name]
                        const isActive = index === active
                        return (
                            <UnstyledButton
                                key={item.name}
                                ref={node => (tabRefs.current[index] = node)}
                                role="tab"
                                id={`line-tab-${index}`}
                                aria-selected={isActive}
                                aria-controls="line-panel"
                                tabIndex={isActive ? 0 : -1}
                                className="line-tab"
                                data-active={isActive || undefined}
                                onClick={() => choose(index)}
                            >
                                <Icon
                                    size={22}
                                    stroke={1.5}
                                    className="line-tab-icon"
                                />
                                <span className="line-tab-text">
                                    <Text
                                        component="span"
                                        fz={{ base: 15, md: 17 }}
                                        fw={800}
                                        lh={1.2}
                                        c="inherit"
                                        display="block"
                                    >
                                        {item.need}
                                    </Text>
                                    <Text
                                        component="span"
                                        fz={12}
                                        // The kit's theme gives Text an inline color, which a
                                        // stylesheet cannot beat: the state sets this variable
                                        // instead (home.css, .line-tab).
                                        c="var(--line-tab-domain)"
                                        display="block"
                                        className="line-tab-domain"
                                    >
                                        {item.name}
                                    </Text>
                                </span>
                            </UnstyledButton>
                        )
                    })}
                </SimpleGrid>
            </Container>

            <div
                key={tab.name}
                id="line-panel"
                role="tabpanel"
                aria-labelledby={`line-tab-${active}`}
                className="line-panel"
                style={{ '--line-from': `${direction.current * 32}px` }}
            >
                <FeatureSplit
                    subtitle={tab.subtitle}
                    title={tab.title}
                    descriptionFz={{ base: 17, md: 18 }}
                    description={tab.description}
                    featuresList={tab.featuresList.map(withProductName)}
                    image={tab.image}
                    imageAlt=""
                    mediaMaw={MEDIA_MAW}
                    cta={tab.cta}
                    background={SECTION_BACKGROUNDS.gray}
                />
            </div>
        </Box>
    )
}
