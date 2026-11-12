import { Anchor, Badge, Box, Button, Container, Grid, Group, List, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link, useParams } from 'react-router-dom'
import { CTABanner, SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconArrowRight, IconChecklist, IconExternalLink, IconListCheck } from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/use-seo-meta'
import { bookSeo } from '../data/seo'
import { BookCard } from '../components/BookCard'
import { NotFound } from './NotFound'
import { BOOKS, SERIES, bookBySlug } from '../data/catalog'
import { AWESOME, listOfBook } from '../data/awesome'
import '../books.css'

/**
 * /books/<slug> — the page of one book.
 *
 * Same order for every book, so the shelf grows without new design: what it
 * is (the cover's question and the summary), the store, who it is for, what
 * you take from it, the chapters, the kit when there is one, and the series.
 * Everything comes from the book.yml (scripts/sync-books.js): the page says
 * nothing the book does not say.
 *
 * NO PRICE. The price changes in KDP and a page with an old number lies;
 * "Ver na Amazon" takes the reader to the product page, where the price is.
 */

// What the kit holds, in the kit's own words (books/kit/<slug>/index.html).
const KIT_PARTS = [
    'Os pedidos do livro para preencher e copiar, com o que conferir em cada um',
    'Modelos de planilha e de texto, prontos para colar',
    'Os treinos com o material pronto, e a contagem de cada um',
    'Um caderno para guardar os pedidos que funcionaram no seu trabalho',
]

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

export function Book() {
    const { slug } = useParams()
    const book = bookBySlug(slug)

    useSeoMeta(book ? bookSeo(book) : { title: 'Livro não encontrado', description: '', url: `/books/${slug}` })

    if (!book) return <NotFound />

    const others = BOOKS.filter(other => other.slug !== book.slug)

    return (
        <>
            <Box
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 64, md: 104 }}
            >
                <Container size="lg">
                    <Grid
                        gutter={{ base: 40, md: 64 }}
                        align="center"
                    >
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Box style={{ display: 'flex', justifyContent: 'center', lineHeight: 0 }}>
                                <img
                                    src={book.cover}
                                    alt={`Capa de ${book.title}`}
                                    className="book-page__cover"
                                    width="300"
                                    height="480"
                                />
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 8 }}>
                            <Stack
                                gap="lg"
                                align="flex-start"
                                maw="100%"
                                style={{ minWidth: 0 }}
                            >
                                <Group gap={8}>
                                    <Badge
                                        radius={0}
                                        variant="filled"
                                        color={book.levelColor}
                                    >
                                        Nível {book.level} · {book.levelName}
                                    </Badge>
                                    <Badge
                                        radius={0}
                                        variant="filled"
                                        color="gray.2"
                                        c="gray.7"
                                    >
                                        Volume {book.volume}
                                    </Badge>
                                    {book.kit && (
                                        <Badge
                                            radius={0}
                                            variant="filled"
                                            color="gray.9"
                                        >
                                            + {book.kit.label}
                                        </Badge>
                                    )}
                                </Group>
                                <Stack gap={8}>
                                    <Text c="gray.9"
                                        component="h1"
                                        m={0}
                                        fz={{ base: 34, sm: 44, md: 54 }}
                                        lh={1.08}
                                        fw={800}
                                        style={{ letterSpacing: '-0.03em', textWrap: 'balance' }}
                                    >
                                        {book.title}
                                    </Text>
                                    <Text
                                        fz={{ base: 18, md: 21 }}
                                        fs="italic"
                                        c="gray.7"
                                        style={{ textWrap: 'balance' }}
                                    >
                                        {book.subtitle}
                                    </Text>
                                </Stack>
                                <Text
                                    fz={{ base: 18, md: 20 }}
                                    fw={700}
                                    c="gray.9"
                                    style={{ textWrap: 'balance' }}
                                >
                                    {book.hook}
                                </Text>
                                <Text
                                    fz={{ base: 16, md: 17 }}
                                    c="dimmed"
                                    lh={1.65}
                                    maw={620}
                                >
                                    {book.summary}
                                </Text>
                                <Group
                                    gap="sm"
                                    w={{ base: '100%', xs: 'auto' }}
                                >
                                    <Button
                                        w={{ base: '100%', xs: 'auto' }}
                                        component="a"
                                        href={book.store}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        size="lg"
                                        radius={0}
                                        color="gray.9"
                                        rightSection={<IconExternalLink size={18} />}
                                    >
                                        Ver na Amazon
                                    </Button>
                                    {book.kit && (
                                        <Button
                                            w={{ base: '100%', xs: 'auto' }}
                                            component={Link}
                                            to={book.kit.path}
                                            size="lg"
                                            radius={0}
                                            color="gray.9"
                                            variant="outline"
                                            leftSection={<IconChecklist size={18} />}
                                        >
                                            Abrir o kit online
                                        </Button>
                                    )}
                                </Group>
                                {listOfBook(book.slug) && (
                                    <Anchor
                                        component={Link}
                                        to={`${AWESOME.path}/${listOfBook(book.slug).slug}`}
                                        c="gray.7"
                                        fz="sm"
                                        fw={700}
                                        underline="never"
                                    >
                                        <Group
                                            gap={6}
                                            component="span"
                                        >
                                            <IconListCheck
                                                size={16}
                                                stroke={1.5}
                                            />
                                            As fontes e ferramentas do livro, sempre atualizadas: {listOfBook(book.slug).title}
                                        </Group>
                                    </Anchor>
                                )}
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            <Box
                bg={SECTION_BACKGROUNDS.white}
                py={{ base: 72, md: 104 }}
            >
                <Container size="lg">
                    <SimpleGrid
                        cols={{ base: 1, md: 3 }}
                        spacing={{ base: 40, md: 56 }}
                    >
                        <Stack gap="sm">
                            <Eyebrow>Para quem é</Eyebrow>
                            <Text
                                fz={17}
                                lh={1.6}
                                c="gray.7"
                            >
                                {book.audience}
                            </Text>
                        </Stack>
                        <Stack gap="sm">
                            <Eyebrow>O que você leva</Eyebrow>
                            <List
                                spacing="xs"
                                fz={17}
                                c="gray.7"
                            >
                                {book.bullets.map(bullet => (
                                    <List.Item key={bullet}>{bullet}</List.Item>
                                ))}
                            </List>
                        </Stack>
                        <Stack gap="sm">
                            <Eyebrow>Como foi feito</Eyebrow>
                            <List
                                spacing="xs"
                                fz={17}
                                c="gray.7"
                            >
                                {SERIES.promises.map(promise => (
                                    <List.Item key={promise}>{promise}</List.Item>
                                ))}
                            </List>
                            <Text
                                fz={14}
                                c="gray.5"
                            >
                                {SERIES.aiNote}
                            </Text>
                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>

            <Box
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 72, md: 104 }}
            >
                <Container size="lg">
                    <Grid gutter={{ base: 32, md: 64 }}>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Stack gap="sm">
                                <Eyebrow>Os capítulos</Eyebrow>
                                <Title
                                    order={2}
                                    fz={{ base: 26, md: 34 }}
                                    style={{ textWrap: 'balance' }}
                                >
                                    O que tem dentro
                                </Title>
                                <Text
                                    c="dimmed"
                                    fz={16}
                                    lh={1.6}
                                >
                                    {book.thisVolume}
                                </Text>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 8 }}>
                            <ol className="book-chapters">
                                {book.chapters.map(chapter => (
                                    <li key={chapter}>{chapter}</li>
                                ))}
                            </ol>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            {/* THE KIT: the kit's CTABanner, the band the site already uses
                (the 404). A dark band drawn for this page was refused by the
                founder on 01/10/2026: not in the house system. White, between
                the gray chapters and the white shelf below; the banner's own
                card is what sets it apart. */}
            {book.kit && (
                <CTABanner
                    subtitle={book.kit.label}
                    title="O livro continua online"
                    description="O que muda mais rápido do que um livro fica no kit, com a data de cada conferência."
                    featuresList={book.kitParts ?? KIT_PARTS}
                    cta={{ label: 'Abrir o kit online', href: book.kit.path, icon: <IconArrowRight size={20} />, size: 'lg' }}
                    background="white"
                />
            )}

            <Box
                bg={SECTION_BACKGROUNDS.white}
                py={{ base: 72, md: 104 }}
            >
                <Container size="lg">
                    <Stack gap={40}>
                        <Stack gap="sm">
                            <Eyebrow>Na série {SERIES.name}</Eyebrow>
                            <Title
                                order={2}
                                fz={{ base: 26, md: 34 }}
                            >
                                Os outros volumes
                            </Title>
                        </Stack>
                        <SimpleGrid
                            cols={{ base: 1, xs: 2, md: 3 }}
                            spacing={40}
                        >
                            {others.map(other => (
                                <BookCard
                                    key={other.slug}
                                    book={other}
                                    line={other.menuLine}
                                />
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}
