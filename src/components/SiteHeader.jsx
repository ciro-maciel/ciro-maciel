import { useEffect, useRef, useState } from 'react'
import { ActionIcon, Box, Burger, Button, Collapse, Container, Divider, Drawer, Group, Paper, ScrollArea, Stack, Text } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import { useDisclosure, useWindowScroll } from '@mantine/hooks'
import { IconChevronDown } from '@tabler/icons-react'
import { Logotype, SECTION_BACKGROUNDS, scrollBehavior } from '@ciromaciel/components-kit'

import { MegaMenu } from './MegaMenu'
import { SiteSearch } from './search/SiteSearch'
import { MENUS } from '../data/catalog'
import { SITE } from '../data/site'

/**
 * The bar of the site, with the three menus (Produtos, Para quem, Sobre).
 *
 * WHY NOT THE KIT'S HEADER. Until 01/10/2026 this site used `Header` from
 * @ciromaciel/components-kit, which takes only anchor links. The menus need
 * panels, so this is the header of myinfrastructure.click
 * (infrastructure/website/src/components/SiteHeader.jsx) carried over with
 * the same behaviour, measures and comments that matter: hover on desktop
 * with a short close delay, a drawer with an accordion on the phone, Escape
 * to close. When both sites settle, this is the piece to move into the kit.
 *
 * What is kept from the kit's header: the logotype at 208 px, the bar card
 * that only shows its border after scrolling, and the two calls to action
 * (GitHub, LinkedIn) that turn into icons on a narrow phone; on a phone
 * the search's magnifier takes GitHub's place (SiteSearch.jsx). The theme
 * button lives in the footer (SiteFooter.jsx), not here (decided 16/10/2026).
 */
function Cta({ cta, filled }) {
    const Icon = cta.icon
    // An anchor of the home (`scrollTo`): the router, with the state Home reads to scroll.
    const target = cta.scrollTo ? { component: Link, to: '/', state: { scrollTo: cta.scrollTo } } : { component: 'a', href: cta.href, target: '_blank', rel: 'noopener noreferrer' }
    return (
        <>
            <Button
                {...target}
                size="sm"
                radius="0"
                color="gray.9"
                variant={filled ? 'filled' : 'subtle'}
                c={filled ? undefined : 'gray.7'}
                fw={900}
                visibleFrom="sm"
            >
                {cta.label}
            </Button>
            {/* On a phone the search takes this icon's place (SiteSearch.jsx) */}
            {!cta.isHiddenOnPhone && (
                <ActionIcon
                    {...target}
                    aria-label={cta.label}
                    title={cta.label}
                    size={36}
                    radius={0}
                    color="gray.9"
                    variant={filled ? 'filled' : 'subtle'}
                    hiddenFrom="sm"
                >
                    <Icon
                        size={20}
                        stroke={1.5}
                    />
                </ActionIcon>
            )}
        </>
    )
}

export function SiteHeader({ ctas = [] }) {
    const location = useLocation()
    const [scroll] = useWindowScroll()
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
    // Which menu is open, not whether one is: opening one closes the other.
    const [openMenu, setOpenMenu] = useState(null)
    const [openMobileMenu, setOpenMobileMenu] = useState(null)
    const isScrolled = scroll.y > 10

    // The menu closes after a short delay. Between the button and the panel
    // there is a gap (the bar's padding), and the pointer crosses it on the
    // way down: without the tolerance, leaving the button closed the menu
    // before the pointer reached the panel.
    const closeTimer = useRef(null)
    // How the open menu was opened. A mouse click arrives right after the
    // hover that already opened the menu: a plain toggle would close it again
    // on the same gesture. So a click only closes what a click opened.
    const openedBy = useRef(null)
    const open = (label, by = 'hover') => {
        clearTimeout(closeTimer.current)
        if (label !== openMenu) openedBy.current = by
        setOpenMenu(label)
    }
    const toggle = label => {
        if (openMenu === label && openedBy.current === 'click') return close({ immediate: true })
        openedBy.current = 'click'
        open(label, 'click')
    }
    const close = ({ immediate = false } = {}) => {
        clearTimeout(closeTimer.current)
        if (immediate) return setOpenMenu(null)
        closeTimer.current = setTimeout(() => setOpenMenu(null), 220)
    }
    useEffect(() => () => clearTimeout(closeTimer.current), [])

    useEffect(() => {
        if (!openMenu) return
        const onKey = event => event.key === 'Escape' && setOpenMenu(null)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [openMenu])

    // A new page closes whatever was open.
    useEffect(() => {
        setOpenMenu(null)
        closeDrawer()
    }, [location.pathname, closeDrawer])

    const onNavigate = () => {
        close({ immediate: true })
        closeDrawer()
    }

    const current = MENUS.find(menu => menu.label === openMenu)

    return (
        <>
            <Box
                component="header"
                pos="sticky"
                top={0}
                w="100%"
                style={{ zIndex: 100, pointerEvents: 'none' }}
            >
                <Container
                    size="xl"
                    py="md"
                    px="xs"
                    pos="relative"
                >
                    <Paper
                        shadow={isScrolled ? 'sm' : 'none'}
                        radius="0"
                        py="xs"
                        px="sm"
                        // The kit's band tone, not Mantine's `white`: in dark mode
                        // `white` is a third tone (#1a2127) the page does not use (21/10/2026)
                        bg={SECTION_BACKGROUNDS.white}
                        bd={isScrolled ? '1px solid var(--mantine-color-gray-2)' : '1px solid transparent'}
                        style={{ pointerEvents: 'auto', transition: 'all 0.2s ease' }}
                    >
                        <Group
                            justify="space-between"
                            align="center"
                            wrap="nowrap"
                        >
                            <Box
                                component={Link}
                                to="/"
                                aria-label="Ir para a página inicial"
                                onClick={() => {
                                    if (location.pathname === '/') window.scrollTo({ top: 0, behavior: scrollBehavior() })
                                }}
                                // The logotype is live text and does not shrink
                                // by squeezing: on a phone the whole lockup
                                // steps down to height 28, in proportion, so it
                                // fits beside the two calls to action and the
                                // menu at 375px.
                                style={{ display: 'inline-flex', textDecoration: 'none', flex: 'none' }}
                            >
                                {/* The same lockup as the lines' sites, without
                                    the signature: here the name is the one who
                                    signs (decided 14/10/2026). */}
                                <Box visibleFrom="sm">
                                    <Logotype
                                        word={SITE.name}
                                        signature={null}
                                    />
                                </Box>
                                <Box hiddenFrom="sm">
                                    <Logotype
                                        word={SITE.name}
                                        signature={null}
                                        height={28}
                                    />
                                </Box>
                            </Box>

                            <Group
                                gap="xl"
                                visibleFrom="md"
                                wrap="nowrap"
                                component="nav"
                                aria-label="Menu principal"
                                mih={46}
                                align="center"
                            >
                                {MENUS.map(menu => (
                                    <Box
                                        key={menu.label}
                                        onMouseEnter={() => open(menu.label)}
                                        onMouseLeave={() => close()}
                                        // Vertical padding brings the pointer's
                                        // target to the edge of the bar.
                                        py="sm"
                                    >
                                        <Group
                                            gap={4}
                                            component="button"
                                            type="button"
                                            aria-expanded={openMenu === menu.label}
                                            aria-haspopup="true"
                                            onClick={() => toggle(menu.label)}
                                            // `color` explicit: Safari on iOS paints a <button>
                                            // with no color of its own in the system blue.
                                            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, color: 'var(--mantine-color-gray-9)' }}
                                        >
                                            <Text
                                                size="sm"
                                                fw={900}
                                                tt="uppercase"
                                                lts="1px"
                                                c="gray.9"
                                            >
                                                {menu.label}
                                            </Text>
                                            <IconChevronDown
                                                size={14}
                                                stroke={2.5}
                                                style={{
                                                    transition: 'transform 0.2s ease',
                                                    transform: openMenu === menu.label ? 'rotate(180deg)' : 'none',
                                                }}
                                            />
                                        </Group>
                                    </Box>
                                ))}
                            </Group>

                            <Group
                                gap="sm"
                                wrap="nowrap"
                                style={{ flexShrink: 0 }}
                            >
                                <SiteSearch />
                                {ctas.map((cta, index) => (
                                    <Cta
                                        key={cta.label}
                                        cta={cta}
                                        filled={index === ctas.length - 1}
                                    />
                                ))}
                                <Burger
                                    opened={drawerOpened}
                                    onClick={toggleDrawer}
                                    hiddenFrom="md"
                                    aria-label="Abrir menu"
                                />
                            </Group>
                        </Group>
                    </Paper>

                    {/* The panel sits outside the bar's card so it can take the
                        container's whole width. Absolute, not in the flow:
                        closed, it would still hold its height inside the sticky
                        header and push the page down. */}
                    <Box
                        visibleFrom="md"
                        onMouseEnter={() => open(openMenu)}
                        onMouseLeave={() => close()}
                        pos="absolute"
                        left={0}
                        right={0}
                        px="xs"
                        style={{
                            pointerEvents: openMenu ? 'auto' : 'none',
                            opacity: openMenu ? 1 : 0,
                            transform: openMenu ? 'translateY(0)' : 'translateY(-8px)',
                            transition: 'opacity 0.15s ease, transform 0.15s ease',
                        }}
                    >
                        {/* The gap between bar and panel is padding inside
                            the wrapper, so crossing it does not close the menu. */}
                        <Box pt="xs">
                            <Paper
                                shadow="md"
                                radius="0"
                                bg={SECTION_BACKGROUNDS.white}
                                bd="1px solid var(--mantine-color-gray-2)"
                                maw={current?.width ?? 1180}
                                mx="auto"
                            >
                                {current && (
                                    <MegaMenu
                                        menu={current}
                                        onNavigate={onNavigate}
                                    />
                                )}
                            </Paper>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navegação"
                hiddenFrom="md"
                zIndex={1000000}
                // The phone menu is the bar opened up: a stage, in the page's
                // tone, not the elevated #1A2127 the theme gives every Paper in
                // dark (21/10/2026, components-kit README, "Fundos")
                classNames={{ content: 'rlg-stage', header: 'rlg-stage' }}
            >
                <ScrollArea
                    h="calc(100vh - 80px)"
                    mx="-md"
                >
                    <Divider mb="md" />
                    <Stack gap={0}>
                        {MENUS.map(menu => (
                            <Box key={menu.label}>
                                <Group
                                    component="button"
                                    type="button"
                                    w="100%"
                                    p="md"
                                    justify="space-between"
                                    aria-expanded={openMobileMenu === menu.label}
                                    onClick={() => setOpenMobileMenu(o => (o === menu.label ? null : menu.label))}
                                    // `color` explicit, as in the bar above: Safari on iOS
                                    // paints an uncolored <button> blue — the chevrons came
                                    // out blue on the iPhone only.
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mantine-color-gray-9)' }}
                                >
                                    <Text
                                        fw={900}
                                        tt="uppercase"
                                        lts="1px"
                                        c="gray.9"
                                    >
                                        {menu.label}
                                    </Text>
                                    <IconChevronDown
                                        size={16}
                                        stroke={2.5}
                                        style={{
                                            transition: 'transform 0.2s ease',
                                            transform: openMobileMenu === menu.label ? 'rotate(180deg)' : 'none',
                                        }}
                                    />
                                </Group>
                                <Collapse in={openMobileMenu === menu.label}>
                                    <MegaMenu
                                        menu={menu}
                                        onNavigate={onNavigate}
                                    />
                                </Collapse>
                            </Box>
                        ))}
                    </Stack>
                </ScrollArea>
            </Drawer>
        </>
    )
}
