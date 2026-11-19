import { Anchor, Box, Container, Group, SimpleGrid, Stack, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconArrowRight } from '@tabler/icons-react'
import { guidePath, guidesOfBook } from '../data/guides'
import { LINK_NAMES } from '../data/catalog'

const ORIGIN_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'lk']

/**
 * The origin the guide's form will record: the one the visitor arrived with (a li- or par- link put it on
 * this page's address), carried forward; only without one, this page's own. Read after hydration, so the
 * server and the browser render the same link first.
 */
function useOrigin(fallback) {
    const { search } = useLocation()
    const [query, setQuery] = useState(fallback)
    useEffect(() => {
        const incoming = new URLSearchParams(search)
        const kept = new URLSearchParams()
        for (const name of ORIGIN_PARAMS) if (incoming.get(name)) kept.set(name, incoming.get(name))
        setQuery([...kept.keys()].length ? `?${kept}` : fallback)
    }, [search, fallback])
    return query
}

/**
 * The free guides of a book, as a band: on the kit (right under its hero, so whoever came from a search sees
 * it first) and on the book's page. Nothing when the book has no guide.
 *
 * `from` names the door in the address the form records (utm_content): from the kit it is
 * seo-kit-<book>, the measure the books' sales plan reads ("e-mails com origem seo-kit-…").
 *
 * By default it closes the hero (same gray, no top padding), so the band above and the white band below keep
 * alternating as the kit's sections do.
 */
export function GuideBand({ book, from = 'kit', background = SECTION_BACKGROUNDS.gray, isHeroEnd = true }) {
    const guides = guidesOfBook(book.slug)
    const content = from === 'kit' && LINK_NAMES[book.slug] ? `seo-kit-${LINK_NAMES[book.slug]}` : `livro-${LINK_NAMES[book.slug] ?? book.slug}`
    // Before the early return: the band of another book may have guides, and hooks keep their order.
    const query = useOrigin(`?utm_source=ciromaciel.click&utm_medium=${from}&utm_content=${content}`)
    if (!guides.length) return null
    return (
        <Box
            component="section"
            aria-labelledby={`guides-${book.slug}`}
            bg={background}
            pt={isHeroEnd ? 0 : { base: 40, md: 56 }}
            pb={{ base: 40, md: 56 }}
        >
            <Container size="lg">
                <Stack gap="lg">
                    <Text
                        id={`guides-${book.slug}`}
                        component="h2"
                        m={0}
                        fz={13}
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.6"
                    >
                        {guides.length > 1 ? 'Guias gratuitos do livro, em PDF' : 'Guia gratuito do livro, em PDF'}
                    </Text>
                    <SimpleGrid
                        cols={{ base: 1, sm: Math.min(guides.length, 3) }}
                        spacing="lg"
                    >
                        {guides.map(guide => (
                            <Anchor
                                key={guide.slug}
                                component={Link}
                                to={`${guidePath(guide)}${query}`}
                                underline="never"
                                c="inherit"
                            >
                                <Box
                                    p="lg"
                                    h="100%"
                                    bg="white"
                                    style={{ border: '1px solid var(--mantine-color-gray-3)' }}
                                >
                                    <Stack gap={8}>
                                        <Text
                                            fz={19}
                                            fw={800}
                                            c="gray.9"
                                            lh={1.25}
                                        >
                                            {guide.title}
                                        </Text>
                                        <Text
                                            fz={15}
                                            c="gray.7"
                                            lh={1.55}
                                        >
                                            {guide.promise}
                                        </Text>
                                        <Group gap={6}>
                                            <Text
                                                component="span"
                                                c="gray.9"
                                                fw={700}
                                                fz={15}
                                            >
                                                Receber as dez páginas por e-mail
                                            </Text>
                                            <IconArrowRight size={16} />
                                        </Group>
                                    </Stack>
                                </Box>
                            </Anchor>
                        ))}
                    </SimpleGrid>
                </Stack>
            </Container>
        </Box>
    )
}
