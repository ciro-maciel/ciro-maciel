import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ActionIcon, Box, Button, Group, Kbd, Loader, Modal, ScrollArea, Stack, Text, TextInput, UnstyledButton } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconArrowRight, IconSearch } from '@tabler/icons-react'
import { SUGGESTIONS, searchPagePath } from '../../search/search'
import { loadIndex, useSiteSearch } from '../../search/use-site-search'
import { ResultRow } from './ResultRow'

const LIST_LIMIT = 8
export const PAGE_INPUT_ID = 'site-search-page-input'

/**
 * The site's search in the header: a magnifier on every width, ⌘K on the
 * keyboard. The pattern of an earlier dashboard's header search, with one
 * change the header forced.
 *
 * WHY A BUTTON AND NOT A BOX, ALSO ON THE DESKTOP. The bar has no room for a
 * field: at 992–1279px the menus leave 68px on each side (measured 16/10/2026).
 * So the magnifier opens a window: centred on the desktop, the whole screen on
 * a phone, with the field focused and the keyboard up.
 *
 * ON A PHONE, THE MAGNIFIER TAKES GITHUB'S PLACE (decided 16/10/2026). The bar
 * at 360px holds the logo, two icons and the menu, with 39px to spare: a
 * fourth icon would push the logo. GitHub stays on the desktop bar and in the
 * footer (SiteHeader, `isHiddenOnPhone`).
 *
 * ON /search the page has its own field: the magnifier and ⌘K focus it,
 * instead of opening a second search over the first.
 */
export function SiteSearch() {
    const { pathname } = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const isSearchPage = pathname === '/search'

    const open = () => {
        if (isSearchPage) return document.getElementById(PAGE_INPUT_ID)?.focus()
        setIsOpen(true)
    }

    useEffect(() => {
        const onKey = event => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault()
                open()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    })

    // A new page closes the window
    useEffect(() => setIsOpen(false), [pathname])

    return (
        <>
            <ActionIcon
                size={36}
                radius={0}
                variant="subtle"
                color="gray.9"
                onClick={open}
                // Starts the download on intent: by the time the window opens, the index is there
                onMouseEnter={() => loadIndex().catch(() => {})}
                onFocus={() => loadIndex().catch(() => {})}
                aria-label="Buscar no site"
                title="Buscar no site (⌘K)"
            >
                <IconSearch
                    size={20}
                    stroke={1.5}
                />
            </ActionIcon>
            <SearchWindow
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    )
}

function SearchWindow({ isOpen, onClose }) {
    const navigate = useNavigate()
    // The kit's `sm` breakpoint, the same one where the header turns its calls to action into icons
    const isPhone = useMediaQuery('(max-width: 48em)')
    const [term, setTerm] = useState('')
    const [active, setActive] = useState(-1)
    const listRef = useRef(null)
    const { results, total, query, isSearchable, isLoading, hasFailed } = useSiteSearch(term, { isEnabled: isOpen })
    const shown = results.slice(0, LIST_LIMIT)
    // The last row, after the results, leads to the full page
    const rowCount = shown.length + (total > 0 ? 1 : 0)

    useEffect(() => setActive(-1), [term])
    useEffect(() => {
        if (!isOpen) setTerm('')
    }, [isOpen])
    useEffect(() => {
        listRef.current?.querySelector(`[data-row="${active}"]`)?.scrollIntoView({ block: 'nearest' })
    }, [active])

    const openPage = () => {
        onClose()
        navigate(searchPagePath(term))
    }

    const onKeyDown = event => {
        if (event.key === 'ArrowDown' && rowCount) {
            event.preventDefault()
            setActive(i => (i + 1) % rowCount)
        } else if (event.key === 'ArrowUp' && rowCount) {
            event.preventDefault()
            setActive(i => (i <= 0 ? rowCount - 1 : i - 1))
        } else if (event.key === 'Enter') {
            event.preventDefault()
            const result = shown[active]
            if (!result) return term.trim() && openPage()
            onClose()
            if (result.kind === 'tool') window.location.assign(result.path)
            else navigate(result.path)
        }
    }

    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            fullScreen={isPhone}
            size={640}
            radius={0}
            padding={0}
            withCloseButton={false}
            yOffset="10vh"
            transitionProps={{ transition: isPhone ? 'fade' : 'pop', duration: 150 }}
            // Above the sticky header (100) and the menu drawer (1000000)
            zIndex={1000001}
            aria-label="Buscar no site"
        >
            <Group
                gap="xs"
                wrap="nowrap"
                p="sm"
                style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}
            >
                <TextInput
                    data-autofocus
                    flex={1}
                    value={term}
                    onChange={event => setTerm(event.currentTarget.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Buscar livros, pedidos, ferramentas…"
                    aria-label="Buscar no site"
                    type="search"
                    enterKeyHint="search"
                    autoComplete="off"
                    variant="unstyled"
                    leftSection={<IconSearch size={18} />}
                    leftSectionWidth={36}
                    rightSection={isLoading ? <Loader size={14} /> : null}
                    // 16px: under that, Safari on the iPhone zooms the page when the field takes focus.
                    // The padding is explicit: the `unstyled` variant drops the room the left section
                    // asks for, and the text ran under the magnifier (16/10/2026)
                    styles={{ input: { fontSize: 16, paddingInlineStart: 36 } }}
                />
                {/* On a phone the window is the whole screen: a word closes it,
                    where the thumb is. On the desktop, Esc and the overlay. */}
                {isPhone ? (
                    <Button
                        variant="subtle"
                        color="gray.9"
                        radius={0}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                ) : (
                    <Kbd size="xs">Esc</Kbd>
                )}
            </Group>

            <ScrollArea.Autosize
                mah={isPhone ? 'calc(100dvh - 62px)' : '60vh'}
                type="auto"
            >
                <Box
                    ref={listRef}
                    py={isSearchable ? 'xs' : 0}
                    role="listbox"
                >
                    {!isSearchable && <Suggestions onPick={setTerm} />}
                    {isSearchable && hasFailed && (
                        <Message>A busca não carregou. Confira a conexão e tente de novo.</Message>
                    )}
                    {isSearchable && !isLoading && !hasFailed && total === 0 && <Message>Nada encontrado para “{term.trim()}”.</Message>}
                    {shown.map((result, i) => (
                        <ResultRow
                            key={result.path}
                            data-row={i}
                            role="option"
                            aria-selected={i === active}
                            result={result}
                            query={query}
                            isCompact
                            isActive={i === active}
                            onPick={onClose}
                            onMouseEnter={() => setActive(i)}
                        />
                    ))}
                    {total > 0 && (
                        <UnstyledButton
                            data-row={shown.length}
                            role="option"
                            aria-selected={active === shown.length}
                            onClick={openPage}
                            onMouseEnter={() => setActive(shown.length)}
                            display="block"
                            w="100%"
                            px="md"
                            py="sm"
                            bg={active === shown.length ? 'var(--mantine-color-default-hover)' : undefined}
                        >
                            <Text
                                fz={14}
                                fw={700}
                                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                            >
                                {total > LIST_LIMIT ? `Ver os ${total} resultados, com filtros` : 'Abrir na página de busca, com filtros'}
                                <IconArrowRight size={14} />
                            </Text>
                        </UnstyledButton>
                    )}
                </Box>
            </ScrollArea.Autosize>
        </Modal>
    )
}

function Message({ children }) {
    return (
        <Text
            px="md"
            py="lg"
            fz={14}
            c="dimmed"
        >
            {children}
        </Text>
    )
}

// Before the first letters: what people look for here, one tap away
export function Suggestions({ onPick }) {
    return (
        <Stack
            gap="xs"
            p="md"
        >
            <Text
                fz={11}
                fw={800}
                tt="uppercase"
                lts="1px"
                c="dimmed"
            >
                Experimente
            </Text>
            <Group gap="xs">
                {SUGGESTIONS.map(suggestion => (
                    <Button
                        key={suggestion}
                        size="xs"
                        radius={0}
                        variant="default"
                        onClick={() => onPick(suggestion)}
                    >
                        {suggestion}
                    </Button>
                ))}
            </Group>
        </Stack>
    )
}

