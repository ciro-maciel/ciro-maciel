import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Button, Container, Divider, Group, Loader, Stack, Text, TextInput, Title } from '@mantine/core'
import { SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconSearch } from '@tabler/icons-react'
import { KINDS } from '../search/search'
import { useSiteSearch } from '../search/useSiteSearch'
import { ResultRow } from '../components/search/ResultRow'
import { PAGE_INPUT_ID, Suggestions } from '../components/search/SiteSearch'
import { useSeoMeta } from '../hooks/useSeoMeta'

/**
 * /search — every result, with a filter per kind. The header's window shows
 * eight; "Ver os N resultados" lands here with the words in `?q=`, so a search
 * can be shared and read back. `?kind=` keeps the filter.
 *
 * THE URL IS READ ONCE, after mounting. The build renders this page with no
 * query (scripts/ssr.js): reading `?q=` during the first render would draw a
 * different tree from the one in the HTML and break the hydration. From then
 * on the field leads and the URL follows, with `replace`, so typing does not
 * fill the browser's history.
 *
 * NOT FOR SEARCH ENGINES: a page of results is not content (noindex below, and
 * it is not in the sitemap).
 */
export function Search() {
    useSeoMeta({ title: 'Buscar no site', description: 'Busque nos livros, nos kits, nos pedidos prontos, nas regras, nos agentes e nas ferramentas.', url: '/search' })
    useNoIndex()

    const [params, setParams] = useSearchParams()
    const [term, setTerm] = useState('')
    const [kind, setKind] = useState(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        setTerm(params.get('q') || '')
        setKind(KINDS[params.get('kind')] ? params.get('kind') : null)
        setIsReady(true)
        // Once, on arrival: see the comment above
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!isReady) return
        const next = new URLSearchParams()
        if (term.trim()) next.set('q', term.trim())
        if (kind) next.set('kind', kind)
        if (next.toString() !== params.toString()) setParams(next, { replace: true })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term, kind, isReady])

    const { results, total, counts, query, isSearchable, isLoading, hasFailed } = useSiteSearch(term, { kinds: kind ? [kind] : [], isEnabled: isReady })
    const allCount = Object.values(counts).reduce((sum, n) => sum + n, 0)
    const kindsFound = Object.keys(KINDS).filter(key => counts[key])

    return (
        <Box
            py={{ base: 48, sm: 100 }}
            // A stage: the kit's band tone, not Mantine's elevated `white` (21/10/2026)
            bg={SECTION_BACKGROUNDS.white}
        >
            <Container size="md">
                <Stack gap="xl">
                    <Title
                        order={1}
                        tt="uppercase"
                        lts="2px"
                        fw={900}
                        fz={{ base: 28, sm: 42 }}
                    >
                        Buscar no site
                    </Title>

                    <TextInput
                        id={PAGE_INPUT_ID}
                        value={term}
                        onChange={event => setTerm(event.currentTarget.value)}
                        placeholder="Livros, pedidos, ferramentas…"
                        aria-label="Buscar no site"
                        type="search"
                        enterKeyHint="search"
                        autoComplete="off"
                        size="lg"
                        radius={0}
                        leftSection={<IconSearch size={20} />}
                        leftSectionWidth={48}
                        rightSection={isLoading ? <Loader size={16} /> : null}
                        // 16px or more: Safari on the iPhone zooms the page on a smaller field.
                        // The padding is explicit, as in the header's window: the text ran under the magnifier
                        styles={{ input: { fontSize: 18, paddingInlineStart: 48 } }}
                    />

                    {/* The filter: one button per kind that has results, with its
                        count. It wraps on a phone instead of scrolling sideways,
                        so every kind stays in sight. */}
                    {allCount > 0 && (
                        <Group gap="xs">
                            <KindButton
                                label="Tudo"
                                count={allCount}
                                isActive={!kind}
                                onClick={() => setKind(null)}
                            />
                            {kindsFound.map(key => (
                                <KindButton
                                    key={key}
                                    label={KINDS[key].plural}
                                    count={counts[key]}
                                    isActive={kind === key}
                                    onClick={() => setKind(kind === key ? null : key)}
                                />
                            ))}
                        </Group>
                    )}

                    <Box>
                        {!isSearchable && (
                            <Box mx="-md">
                                <Suggestions onPick={setTerm} />
                            </Box>
                        )}
                        {isSearchable && hasFailed && <Text c="dimmed">A busca não carregou. Confira a conexão e recarregue a página.</Text>}
                        {isSearchable && !isLoading && !hasFailed && allCount === 0 && <Text c="dimmed">Nada encontrado para “{term.trim()}”. Tente outra palavra, ou uma só.</Text>}
                        {/* A filter that leaves nothing: its kind had results under another word */}
                        {isSearchable && !isLoading && allCount > 0 && total === 0 && <Text c="dimmed">Nenhum resultado deste tipo.</Text>}
                        {results.length > 0 && (
                            <Stack gap={0}>
                                <Text
                                    fz={11}
                                    fw={800}
                                    tt="uppercase"
                                    lts="1px"
                                    c="dimmed"
                                    mb="xs"
                                >
                                    {total === 1 ? '1 resultado' : `${total} resultados`}
                                </Text>
                                {results.map((result, i) => (
                                    <Box key={result.path}>
                                        {i > 0 && <Divider color="var(--mantine-color-default-border)" />}
                                        <ResultRow
                                            result={result}
                                            query={query}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

function KindButton({ label, count, isActive, onClick }) {
    return (
        <Button
            size="xs"
            radius={0}
            variant={isActive ? 'filled' : 'default'}
            color="gray.9"
            onClick={onClick}
            aria-pressed={isActive}
        >
            {label} · {count}
        </Button>
    )
}

// <meta name="robots" content="noindex"> while this page is open
function useNoIndex() {
    useEffect(() => {
        const meta = document.createElement('meta')
        meta.name = 'robots'
        meta.content = 'noindex'
        document.head.appendChild(meta)
        return () => meta.remove()
    }, [])
}
