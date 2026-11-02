import { Box, Group, Image, SimpleGrid, Stack, Text } from '@mantine/core'
import { scrollBehavior } from '@ciromaciel/components-kit'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IconChevronRight, IconPlus } from '@tabler/icons-react'

/**
 * The panel of one header menu: columns of items, each an icon, a bold name
 * and one line. Same anatomy as the menus of myinfrastructure.click
 * (infrastructure/website/src/components/SolutionsDropdown.jsx), so the two
 * sites read as one family; the data is `MENUS` in data/catalog.js.
 *
 * A column may be `side`: the gray one on the right, as on the product site,
 * for what is set apart from the rest (the kits, the extensions for the day).
 * A wide column may lay its items out in `cols` columns of its own, and an
 * item may carry an `extra`: one small second link under it (a book's kit),
 * so the companion does not take a whole item of its own (21/10/2026).
 */

/** The element an item renders as, by the kind of link it carries. */
function useItemLink(item, onNavigate) {
    const navigate = useNavigate()
    const location = useLocation()

    if (item.to) {
        return {
            component: Link,
            to: item.to,
            state: item.state,
            onClick: () => {
                onNavigate?.()
                // Same route, new section: react-router does not remount the
                // page, so the page's own scroll effect would not run again.
                if (item.state?.scrollTo && location.pathname === item.to) {
                    document.getElementById(item.state.scrollTo)?.scrollIntoView({ behavior: scrollBehavior() })
                }
            },
        }
    }
    if (item.anchor) {
        return {
            component: 'a',
            href: `/#${item.anchor}`,
            onClick: event => {
                event.preventDefault()
                onNavigate?.()
                if (location.pathname === '/') document.getElementById(item.anchor)?.scrollIntoView({ behavior: scrollBehavior() })
                else navigate('/', { state: { scrollTo: item.anchor } })
            },
        }
    }
    const external = /^https?:/.test(item.href)
    return {
        component: 'a',
        href: item.href,
        target: external ? '_blank' : undefined,
        rel: external ? 'noopener noreferrer' : undefined,
        onClick: onNavigate,
    }
}

function MenuItem({ item, onNavigate }) {
    const Icon = item.icon
    const { component: Component, ...linkProps } = useItemLink(item, onNavigate)

    return (
        <Box
            component={Component}
            {...linkProps}
            className="mega-item"
            style={{ textDecoration: 'none', display: 'block' }}
        >
            <Group
                gap={10}
                align="flex-start"
                wrap="nowrap"
            >
                <Icon
                    size={16}
                    stroke={1.5}
                    style={{ marginTop: 2, flexShrink: 0, color: 'var(--mantine-color-gray-5)' }}
                />
                <Box style={{ minWidth: 0 }}>
                    {/* The chevron is inline, and the last word and the chevron
                        never part (`nowrap`): in a Group, and even after a
                        no-break space, it fell alone onto the next line when a
                        long name wrapped ("A série O Novo Básico"). */}
                    <Text
                        fw={900}
                        size="sm"
                        c="gray.9"
                        lh={1.2}
                    >
                        {item.name.split(' ').slice(0, -1).join(' ')}{' '}
                        <span style={{ whiteSpace: 'nowrap' }}>
                            {item.name.split(' ').slice(-1)}{' '}
                            <IconChevronRight
                                size={11}
                                stroke={2.5}
                                style={{ color: 'var(--mantine-color-gray-9)', verticalAlign: 'middle' }}
                            />
                        </span>
                    </Text>
                    <Text
                        size="xs"
                        c="gray.5"
                        lh={1.35}
                        mt={2}
                    >
                        {item.description}
                    </Text>
                    {item.where && (
                        <Text
                            fz={10}
                            fw={800}
                            tt="uppercase"
                            c="gray.4"
                            mt={4}
                            style={{ letterSpacing: '0.08em' }}
                        >
                            {item.where}
                        </Text>
                    )}
                </Box>
            </Group>
        </Box>
    )
}

/** The small second link under an item: "+ kit online". */
function ExtraLink({ extra, onNavigate }) {
    return (
        <Box
            component={Link}
            to={extra.to}
            onClick={onNavigate}
            className="mega-extra"
            ml={26}
            mt={6}
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
        >
            <IconPlus
                size={11}
                stroke={2}
                style={{ color: 'var(--mantine-color-gray-6)' }}
            />
            <Text
                fz={11}
                fw={800}
                tt="uppercase"
                c="gray.6"
                style={{ letterSpacing: '0.08em' }}
            >
                {extra.label}
            </Text>
        </Box>
    )
}

function Entry({ item, onNavigate }) {
    if (!item.extra)
        return (
            <MenuItem
                item={item}
                onNavigate={onNavigate}
            />
        )
    return (
        <Box>
            <MenuItem
                item={item}
                onNavigate={onNavigate}
            />
            <ExtraLink
                extra={item.extra}
                onNavigate={onNavigate}
            />
        </Box>
    )
}

export function MegaMenu({ menu, onNavigate }) {
    return (
        // Not SimpleGrid: its columns are always equal, and a column may ask
        // for more room with `span` (data/catalog.js). The template applies
        // from md up; below that the grid is one or two plain columns (site.css).
        <Box
            className="mega-grid"
            style={{ '--mega-cols': menu.columns.map(column => `minmax(0, ${column.span ?? 1}fr)`).join(' ') }}
        >
            {menu.columns.map((column, index) => (
                <Box
                    key={column.label}
                    p="lg"
                    bg={column.side ? 'gray.0' : undefined}
                    bd="1px solid var(--mantine-color-gray-2)"
                    // A rule between columns only, never on the outer edge.
                    style={{ borderWidth: index === 0 ? 0 : '0 0 0 1px' }}
                >
                    <Text
                        size="xs"
                        fw={900}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.4"
                        mb="md"
                    >
                        {column.label}
                    </Text>

                    {column.covers && (
                        <SimpleGrid
                            // Four per row, always, as on /books (11/10/2026).
                            cols={4}
                            spacing={8}
                            mb="md"
                        >
                            {column.covers.map(cover => (
                                <Box
                                    key={cover.src}
                                    component={Link}
                                    to={cover.to}
                                    onClick={onNavigate}
                                    style={{ lineHeight: 0 }}
                                >
                                    <Image
                                        src={cover.src}
                                        alt={cover.alt}
                                        radius={0}
                                        style={{ border: '1px solid var(--mantine-color-gray-2)' }}
                                    />
                                </Box>
                            ))}
                        </SimpleGrid>
                    )}

                    <SimpleGrid
                        cols={{ base: 1, sm: column.cols ?? 1 }}
                        spacing="xl"
                        verticalSpacing="md"
                    >
                        {column.items.map(item => (
                            <Entry
                                key={item.name}
                                item={item}
                                onNavigate={onNavigate}
                            />
                        ))}
                    </SimpleGrid>

                    {column.note && (
                        <Text
                            size="xs"
                            c="gray.5"
                            mt="md"
                            p="sm"
                            bd="1px solid var(--mantine-color-gray-2)"
                        >
                            {column.note}
                        </Text>
                    )}
                </Box>
            ))}
        </Box>
    )
}
