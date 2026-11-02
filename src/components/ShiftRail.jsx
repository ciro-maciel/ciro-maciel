import { Anchor, Box, Group, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconArrowRight } from '@tabler/icons-react'

/**
 * The shift, told as a single vertical timeline.
 *
 * Home uses it twice since 22/09/2026: the vision band passes only `people`,
 * and the path band passes only `contrast` (the three stages, with the last
 * one filled as the arrival). The paragraph below describes the original
 * single-rail layout, which the component still supports.
 *
 * One rail runs through the whole block. The before/after pair are the two
 * nodes at the top, the three people are the three nodes below — so the cost
 * falling and the people who showed up because of it read as one movement
 * instead of as three stacked blocks of equal weight.
 *
 * WHY THE BARS ARE GONE. An earlier version animated two bars, the second
 * collapsing to a sliver. The rail replaces that argument rather than hosting
 * it: on a timeline the distance between nodes already reads as duration, and
 * a progress bar inside a timeline node reads as a second, competing scale.
 *
 * Not a kit component. The kit's Steps renders numbered, equal-weight columns
 * and PlatformShelf renders a product shelf with filters and a CTA per card.
 * This is one rail with nodes of two different kinds and nothing to click, so
 * it borrows the shelf's vocabulary (surface, hairline, art as texture)
 * without borrowing furniture that has no function here.
 *
 * Nodes are rendered as a <ol>: the order is the meaning, and a screen reader
 * announcing "1 of 5" is the closest spoken equivalent of the rail.
 */
export function ShiftRail({ contrast = [], peopleTitle, people = [] }) {
    if (!contrast.length && !people.length) return null

    return (
        <Box
            component="ol"
            className="shift-rail"
        >
            {/* The contrast. The second node is filled, so "agora" is the
                point the rail arrives at rather than one more step on it. */}
            {contrast.map((item, index) => (
                <Box
                    component="li"
                    key={item.label}
                    className="shift-rail__node"
                    data-solid={index === contrast.length - 1 ? '' : undefined}
                >
                    <Box className="shift-rail__head">
                        <Title
                            order={3}
                            className="shift-rail__value"
                            fz={{ base: 34, sm: 40, md: 46 }}
                            fw={800}
                        >
                            {item.value}
                        </Title>
                        <Text
                            fz={13}
                            fw={800}
                            c="gray.6"
                            tt="uppercase"
                            className="shift-rail__label"
                        >
                            {item.label}
                        </Text>
                    </Box>
                    <Text
                        fz={{ base: 15, md: 16 }}
                        c="dimmed"
                        lh={1.55}
                        className="shift-rail__desc"
                    >
                        {item.description}
                    </Text>
                    {item.link && (
                        <Anchor
                            {...(item.link.to ? { component: Link, to: item.link.to } : { href: item.link.href, target: '_blank', rel: 'noopener noreferrer' })}
                            className="shift-rail__link"
                            c="gray.9"
                            fw={800}
                            fz={15}
                            mt={10}
                            underline="never"
                        >
                            <Group
                                gap={6}
                                component="span"
                            >
                                {item.link.label}
                                <IconArrowRight
                                    size={16}
                                    stroke={2}
                                />
                            </Group>
                        </Anchor>
                    )}
                </Box>
            ))}

            {/* The people. Same rail, hollow nodes with a dark ring: they are
                a different kind of item, not a later step in the same series. */}
            {people.length > 0 && (
                <Box
                    component="li"
                    className="shift-rail__group"
                >
                    {peopleTitle && (
                        <Text
                            fz={13}
                            fw={800}
                            c="gray.6"
                            tt="uppercase"
                            className="shift-rail__grouptitle"
                        >
                            {peopleTitle}
                        </Text>
                    )}

                    <Stack
                        component="ol"
                        className="shift-rail__people"
                        gap={0}
                    >
                        {people.map((person) => (
                            <Box
                                component="li"
                                key={person.who}
                                className="shift-rail__person"
                            >
                                <Title
                                    order={4}
                                    fz={{ base: 18, md: 19 }}
                                    fw={700}
                                >
                                    {person.who}
                                </Title>
                                <Text
                                    fz={{ base: 14, md: 15 }}
                                    c="dimmed"
                                    lh={1.55}
                                    mt={5}
                                >
                                    {person.what}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}
        </Box>
    )
}
