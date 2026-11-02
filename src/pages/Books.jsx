import { Box, Container, Grid, Group, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconCheck } from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/useSeoMeta'
import { booksSeo } from '../data/seo'
import { BookCard } from '../components/BookCard'
import { BOOKS, LEVELS, SERIES } from '../data/catalog'
import '../books.css'
import { NewsletterBox } from '../components/NewsletterBox'

/**
 * /books — the shelf of the series O Novo Básico.
 *
 * Same frame as /tools: a gray hero with the promise and the art, then the
 * white list (the footer is gray, so the last band of every page is white).
 * The art here is the covers themselves: they are what the reader will look
 * for in the store.
 *
 * The four levels are listed even when a level has no book yet, because the
 * ladder is how the series is read (it is on every cover). A level without a
 * book says what it is for and lists nothing — no "em breve".
 */
export function Books() {
    useSeoMeta(booksSeo())

    return (
        <>
            <Box
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 80, md: 120 }}
            >
                <Container size="lg">
                    <Grid
                        gutter={{ base: 40, md: 64 }}
                        align="center"
                    >
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <Stack
                                gap="xl"
                                align="flex-start"
                                maw="100%"
                                style={{ minWidth: 0 }}
                            >
                                <Text
                                    size="sm"
                                    fw={800}
                                    tt="uppercase"
                                    lts="1.5px"
                                    c="gray.5"
                                >
                                    Livros · {SERIES.name}
                                </Text>
                                <Text c="gray.9"
                                    component="h1"
                                    m={0}
                                    fz={{ base: 30, sm: 42, md: 52 }}
                                    lh={1.15}
                                    fw={800}
                                    style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
                                >
                                    {SERIES.title}
                                </Text>
                                <Text
                                    fz={{ base: 16, md: 18 }}
                                    c="dimmed"
                                    lh={1.6}
                                    style={{ maxWidth: 'min(560px, 100%)' }}
                                >
                                    {SERIES.description}
                                </Text>
                                <Stack gap={8}>
                                    {SERIES.promises.map(promise => (
                                        <Group
                                            key={promise}
                                            gap={8}
                                            wrap="nowrap"
                                        >
                                            <IconCheck
                                                size={18}
                                                stroke={2.5}
                                            />
                                            <Text
                                                size="sm"
                                                fw={600}
                                            >
                                                {promise}
                                            </Text>
                                        </Group>
                                    ))}
                                </Stack>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 5 }}>
                            {/* Four per row, always: with six covers in one row each was too small to read (11/10/2026). */}
                            <SimpleGrid
                                cols={4}
                                spacing={12}
                                maw={360}
                                mx="auto"
                            >
                                {BOOKS.map(book => (
                                    <Image
                                        key={book.slug}
                                        src={book.cover}
                                        alt={`Capa de ${book.title}`}
                                        radius={0}
                                        style={{ border: '1px solid var(--mantine-color-gray-3)' }}
                                    />
                                ))}
                            </SimpleGrid>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            <Box
                bg={SECTION_BACKGROUNDS.white}
                py={{ base: 72, md: 112 }}
            >
                <Container size="lg">
                    <Stack gap={72}>
                        {SERIES.levels.map(({ level, text }) => {
                            const books = BOOKS.filter(book => book.level === level)
                            return (
                                <Stack
                                    key={level}
                                    gap="xl"
                                >
                                    <Stack gap={6}>
                                        <Group
                                            gap={10}
                                            align="center"
                                        >
                                            <span
                                                className="level-mark"
                                                style={{ background: LEVELS[level].color }}
                                            />
                                            <Text
                                                fz={13}
                                                fw={800}
                                                tt="uppercase"
                                                c="gray.6"
                                                lts="1px"
                                            >
                                                Nível {level}
                                            </Text>
                                        </Group>
                                        <Title
                                            order={2}
                                            fz={{ base: 26, md: 34 }}
                                        >
                                            {LEVELS[level].name}
                                        </Title>
                                        <Text
                                            c="dimmed"
                                            fz={17}
                                            maw={640}
                                        >
                                            {text}
                                        </Text>
                                    </Stack>
                                    {books.length > 0 && (
                                        <SimpleGrid
                                            cols={{ base: 1, xs: 2, md: 3 }}
                                            spacing={40}
                                            verticalSpacing={48}
                                        >
                                            {books.map(book => (
                                                <BookCard
                                                    key={book.slug}
                                                    book={book}
                                                    line={book.menuLine}
                                                />
                                            ))}
                                        </SimpleGrid>
                                    )}
                                </Stack>
                            )
                        })}
                        <Text
                            c="gray.5"
                            fz={14}
                        >
                            {SERIES.aiNote}
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {/* CARTAS DO CIRO (14/10/2026): the second-most visited pages of the root, after the home. */}
            {/* Gray: the band above is white, and since 21/10/2026 the box has no
                tone of its own (the `background` prop) nor the top rule it had. */}
            <NewsletterBox background={SECTION_BACKGROUNDS.gray} />
        </>
    )
}
