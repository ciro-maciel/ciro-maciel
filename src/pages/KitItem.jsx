import { Anchor, Box, Container, Group, Paper, SimpleGrid, Stack, Text } from '@mantine/core'
import { Link, useParams } from 'react-router-dom'
import { CTABanner, SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/useSeoMeta'
import { kitDocumentSeo, kitTaskSeo } from '../data/seo'
import { bookBySlug } from '../data/catalog'
import { standInBook } from '../data/kit-book'
import { KITS, KitContext, TaskPanel, trackKit } from './BookKit'
import { DocumentPanel, PROFESSION_KITS, useStore } from './ProfessionKit'
import { NotFound } from './NotFound'

/**
 * /books/<slug>/kit/<item> — one task (or one document) of a book's kit on a
 * page of its own (docs/2026-10-03-MICRO-ISCAS-A-LISTA.md, series S1).
 *
 * The kit page holds every task behind a tab, so a search for "ata de reunião
 * com IA" can only land on the whole kit. Here each task has its own address,
 * title and text, and the content is the kit's own: the same TaskPanel (or,
 * for a profession book, the same DocumentPanel) the kit renders, with the
 * same storage, so what the reader types here is there too.
 *
 * The book gate is the kit's: a book not yet on sale is not in the catalogue,
 * and its items answer 404 in production and open in development only.
 */

function Hero({ backTo, backLabel, title, lead, note }) {
    return (
        <Box
            bg={SECTION_BACKGROUNDS.gray}
            py={{ base: 64, md: 96 }}
        >
            <Container size="lg">
                <Stack
                    gap="lg"
                    maw={820}
                >
                    <Anchor
                        component={Link}
                        to={backTo}
                        c="gray.6"
                        fz={13}
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        underline="never"
                    >
                        <Group
                            gap={6}
                            component="span"
                        >
                            <IconArrowLeft size={16} />
                            {backLabel}
                        </Group>
                    </Anchor>
                    <Text c="gray.9"
                        component="h1"
                        m={0}
                        fz={{ base: 28, sm: 38, md: 46 }}
                        lh={1.15}
                        fw={800}
                        style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
                    >
                        {title}
                    </Text>
                    <Text
                        fz={{ base: 16, md: 18 }}
                        c="dimmed"
                        lh={1.6}
                    >
                        {lead}
                    </Text>
                    {note && (
                        <Text
                            size="sm"
                            c="gray.5"
                        >
                            {note}
                        </Text>
                    )}
                </Stack>
            </Container>
        </Box>
    )
}

function OtherItems({ items, kitPath, label }) {
    return (
        <Container
            size="lg"
            pb={{ base: 48, md: 80 }}
        >
            <Stack gap="sm">
                <Text
                    fz={13}
                    fw={800}
                    tt="uppercase"
                    c="gray.5"
                    lts="1.5px"
                >
                    {label}
                </Text>
                <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 3 }}
                    spacing="xs"
                >
                    {items.map(item => (
                        <Anchor
                            key={item.id}
                            component={Link}
                            to={`${kitPath}/${item.id}`}
                            c="gray.9"
                            fw={600}
                            fz="sm"
                        >
                            {item.name}
                        </Anchor>
                    ))}
                </SimpleGrid>
            </Stack>
        </Container>
    )
}

function TaskItem({ slug, kit, book, task }) {
    useSeoMeta(kitTaskSeo(book, task))
    const kitPath = `/books/${slug}/kit`
    // A build kit (TRAIL) has prompts by step and no test: its words follow.
    const isBuild = Boolean(kit.TRAIL)
    return (
        <KitContext.Provider value={kit}>
            <Hero
                backTo={kitPath}
                backLabel={`Kit online · ${book.title}`}
                title={kitTaskSeo(book, task).title}
                lead={isBuild ? `O prompt do ${task.chap.toLowerCase()} do livro ${book.title}, pronto para preencher com o seu ${kit.thing ?? 'sistema'} e copiar. Confira a resposta como o capítulo ensina.` : `O pedido do livro ${book.title} para esta tarefa, pronto para preencher e copiar, com o que conferir na resposta e o que o teste do livro mostrou.`}
                note={isBuild ? undefined : kit.testedNote}
            />
            <Container
                size="lg"
                py={{ base: 48, md: 80 }}
            >
                <Paper
                    radius={0}
                    bg="white"
                    bd="1px solid var(--mantine-color-gray-2)"
                >
                    <TaskPanel task={task} />
                </Paper>
            </Container>
            {/* THE BRIDGE TO THE BOOK (31/10/2026, the publishing plan):
                the page gave the request first; now it says where it came from and offers
                the book, right after the gift. The whole kit stays one click away (the back
                link at the top, and the other requests below). The kit's CTABanner takes
                no onClick, so the click on the book is read on the wrapper. */}
            <Box
                onClickCapture={event => {
                    if (event.target.closest?.('a')?.href === book.store) trackKit(`book:${slug}/${task.id}`)
                }}
            >
                <CTABanner
                    subtitle={task.chap}
                    title={`${isBuild ? 'Este prompt' : 'Este pedido'} é do livro ${book.title}`}
                    description={isBuild ? 'O livro mostra o passo inteiro: por que cada prompt é escrito assim, o que conferir no fim e o que fazer quando a resposta vem errada.' : 'O livro mostra por que cada pedido é escrito assim, o teste de cada um com o que deu certo e o que deu errado, e as outras tarefas do seu ofício.'}
                    cta={{ label: 'Ver o livro na Amazon', href: book.store, target: '_blank', icon: <IconArrowRight size={20} />, size: 'lg' }}
                    secondaryCta={{ label: 'Abrir o kit inteiro', href: kitPath, size: 'lg' }}
                    background="gray"
                />
            </Box>
            <OtherItems
                items={kit.TASKS.filter(other => other.id !== task.id && (!isBuild || other.group === task.group))}
                kitPath={kitPath}
                label={isBuild ? 'Os outros prompts deste passo' : 'Os outros pedidos do kit'}
            />
        </KitContext.Provider>
    )
}

function DocumentItem({ slug, kit, book, chapter }) {
    const store = useStore(slug)
    const seo = kitDocumentSeo(kit.book, chapter, slug)
    useSeoMeta(seo)
    const kitPath = `/books/${slug}/kit`
    const chapters = kit.parts.flatMap(part => part.chapters)
    return (
        <>
            <Hero
                backTo={kitPath}
                backLabel={`Kit online · ${kit.book.title}`}
                title={seo.title}
                lead={`O documento do capítulo ${chapter.number}, para preencher no navegador, copiar e levar ao cliente. O que você escreve fica só neste navegador.`}
            />
            <Container
                size="lg"
                py={{ base: 48, md: 80 }}
            >
                <Paper
                    radius={0}
                    bg="white"
                    bd="1px solid var(--mantine-color-gray-2)"
                >
                    <DocumentPanel
                        chapter={chapter}
                        store={store}
                    />
                </Paper>
            </Container>
            <OtherItems
                items={chapters.filter(other => other.id !== chapter.id).map(other => ({ id: other.id, name: other.document.name }))}
                kitPath={kitPath}
                label="Os outros documentos do kit"
            />
            <CTABanner
                subtitle="Kit online"
                title={`Os documentos vêm do livro ${kit.book.title}`}
                description="O kit inteiro tem os documentos de todos os capítulos, a triagem dos passos e os recursos conferidos."
                cta={{ label: 'Abrir o kit inteiro', href: book ? kitPath : '/books', icon: <IconArrowRight size={20} />, size: 'lg' }}
                background="gray"
            />
        </>
    )
}

export function KitItem() {
    const { slug, item } = useParams()

    const profession = PROFESSION_KITS[slug]
    if (profession) {
        const book = bookBySlug(slug)
        const chapter = profession.parts.flatMap(part => part.chapters).find(entry => entry.id === item && entry.document)
        if (!chapter || (!book && !import.meta.env.DEV)) return <NotFound />
        return (
            <DocumentItem
                slug={slug}
                kit={profession}
                book={book}
                chapter={chapter}
            />
        )
    }

    const kit = KITS[slug]
    const book = bookBySlug(slug) ?? standInBook(slug, kit)
    const task = kit?.TASKS.find(entry => entry.id === item)
    if (!kit || !book || !task) return <NotFound />
    return (
        <TaskItem
            slug={slug}
            kit={kit}
            book={book}
            task={task}
        />
    )
}
