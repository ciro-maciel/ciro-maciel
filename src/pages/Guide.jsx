import { useEffect, useState } from 'react'
import { Anchor, Badge, Box, Button, Container, Grid, Group, Stack, Text, Title } from '@mantine/core'
import { Link, useLocation, useParams } from 'react-router-dom'
import { CTABanner, SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconArrowLeft, IconArrowRight, IconChecklist, IconDownload } from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/use-seo-meta'
import { guideSeo } from '../data/seo'
import { guideBySlugs } from '../data/guides'
import { bookBySlug } from '../data/catalog'
import { useFormsEmbed } from '../components/ContactForm'
import { NotFound } from './NotFound'

/**
 * /books/<book>/guides/<guide> — one free guide of a book, given for an e-mail (data/guides.js says how
 * the capture works end to end).
 *
 * The order follows the person who arrives (manager/brand/intencao.md): the tension they are in, what the
 * ten pages hold, the form, and only then the book. Nothing is asked before the guide is described, and
 * what is asked is a first name and the e-mail the guide goes to.
 *
 * ?recebido=1 is where the form sends the visitor after the answer: the guide is offered right there, so
 * nobody depends on the e-mail arriving to read it.
 */

/** Whether the form just sent the visitor back. Read after hydration, so the prerendered HTML is the form. */
function useIsReceived() {
    const { search } = useLocation()
    const [isReceived, setIsReceived] = useState(false)
    useEffect(() => setIsReceived(new URLSearchParams(search).get('recebido') === '1'), [search])
    return isReceived
}

function Eyebrow({ children }) {
    return (
        <Text
            fz={13}
            fw={800}
            tt="uppercase"
            c="gray.6"
            lts="1.5px"
        >
            {children}
        </Text>
    )
}

export function Guide() {
    const { slug, guide: guideSlug } = useParams()
    const guide = guideBySlugs(slug, guideSlug)
    const book = guide ? bookBySlug(guide.book) : null
    const isReceived = useIsReceived()
    useFormsEmbed(!isReceived)

    useSeoMeta(guide ? guideSeo(guide) : { title: 'Guia não encontrado', description: '', url: `/books/${slug}/guides/${guideSlug}` })

    if (!guide || !book) return <NotFound />

    const pdf = `/guides/${guide.slug}.pdf`

    return (
        <>
            <Box
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 56, md: 96 }}
            >
                <Container size="lg">
                    <Grid
                        gutter={{ base: 40, md: 64 }}
                        align="flex-start"
                    >
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <Stack
                                gap="lg"
                                align="flex-start"
                                style={{ minWidth: 0 }}
                            >
                                <Anchor
                                    component={Link}
                                    to={`/books/${book.slug}`}
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
                                        wrap="nowrap"
                                    >
                                        <IconArrowLeft size={16} />
                                        Do livro {book.title} · Volume {book.volume}
                                    </Group>
                                </Anchor>
                                <Group gap={8}>
                                    <Badge
                                        radius={0}
                                        variant="filled"
                                        color={book.levelColor}
                                    >
                                        Guia gratuito
                                    </Badge>
                                    <Badge
                                        radius={0}
                                        variant="filled"
                                        color="gray.2"
                                        c="gray.7"
                                    >
                                        PDF · 10 páginas
                                    </Badge>
                                </Group>
                                <Text
                                    c="gray.9"
                                    component="h1"
                                    m={0}
                                    fz={{ base: 32, sm: 42, md: 50 }}
                                    lh={1.1}
                                    fw={800}
                                    style={{ letterSpacing: '-0.03em', textWrap: 'balance' }}
                                >
                                    {guide.title}
                                </Text>
                                <Text
                                    fz={{ base: 18, md: 21 }}
                                    fw={700}
                                    c="gray.9"
                                    style={{ textWrap: 'balance' }}
                                >
                                    {guide.promise}
                                </Text>
                                <Text
                                    fz={{ base: 16, md: 17 }}
                                    c="gray.7"
                                    lh={1.7}
                                    maw={620}
                                >
                                    {guide.tension}
                                </Text>
                                <Text
                                    fz={15}
                                    c="gray.6"
                                >
                                    {guide.forWhom}
                                </Text>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 5 }}>
                            <Box
                                id="receber"
                                p={{ base: 'lg', sm: 'xl' }}
                                bg="white"
                                style={{ border: '1px solid var(--mantine-color-gray-2)' }}
                            >
                                {isReceived ? (
                                    <Stack gap="md">
                                        <Title
                                            order={2}
                                            fz={24}
                                        >
                                            O guia está a caminho do seu e-mail
                                        </Title>
                                        <Text
                                            c="gray.7"
                                            lh={1.7}
                                        >
                                            Mandamos o link para o endereço que você deixou. Se ele demorar, confira a caixa de spam. E se quiser ler agora, o PDF está aqui:
                                        </Text>
                                        <Button
                                            component="a"
                                            href={pdf}
                                            target="_blank"
                                            rel="noopener"
                                            size="lg"
                                            radius={0}
                                            color="gray.9"
                                            leftSection={<IconDownload size={20} />}
                                            fullWidth
                                        >
                                            Baixar o guia
                                        </Button>
                                    </Stack>
                                ) : (
                                    <Stack gap="md">
                                        <Title
                                            order={2}
                                            fz={24}
                                        >
                                            Receba o guia no seu e-mail
                                        </Title>
                                        <Text
                                            c="gray.7"
                                            lh={1.6}
                                        >
                                            O PDF chega em seguida, e você também pode baixar na próxima tela. Sem custo.
                                        </Text>
                                        <forms-embed form={guide.form} />
                                        <Text
                                            size="sm"
                                            c="gray.6"
                                            lh={1.7}
                                        >
                                            Guardo o seu nome e o seu e-mail para mandar o guia e saber quem lê os livros. Os próximos guias só chegam se você marcar a caixa.{' '}
                                            <Anchor
                                                component={Link}
                                                to="/legal/privacy"
                                                c="gray.9"
                                                fw={700}
                                                inherit
                                            >
                                                Política de privacidade
                                            </Anchor>
                                            .
                                        </Text>
                                    </Stack>
                                )}
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            <Box
                bg={SECTION_BACKGROUNDS.white}
                py={{ base: 64, md: 96 }}
            >
                <Container size="lg">
                    <Grid gutter={{ base: 32, md: 64 }}>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Stack gap="md">
                                <Eyebrow>O que tem dentro</Eyebrow>
                                <Title
                                    order={2}
                                    fz={{ base: 26, md: 34 }}
                                    style={{ textWrap: 'balance' }}
                                >
                                    Dez páginas feitas a partir do livro
                                </Title>
                                <img
                                    src={`/guides/${guide.slug}.jpg`}
                                    alt={`Capa do guia ${guide.title}`}
                                    width="794"
                                    height="1123"
                                    loading="lazy"
                                    style={{ width: '100%', maxWidth: 280, height: 'auto', border: '1px solid var(--mantine-color-gray-2)' }}
                                />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 8 }}>
                            <ol className="book-chapters">
                                <li>A capa: {guide.promise.replace(/\.$/, '')}</li>
                                {guide.pages.map(page => (
                                    <li key={page}>{page}</li>
                                ))}
                                <li>O que o livro ensina a seguir, e as fontes de cada fato</li>
                            </ol>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            <CTABanner
                subtitle={`Volume ${book.volume} da série O Novo Básico`}
                title={`O guia foi feito a partir do livro ${book.title}`}
                description={book.hook}
                featuresList={book.kit ? ['O livro inteiro, com as fontes de cada fato', `${book.kit.label}: ${book.kit.detail}`] : undefined}
                cta={{ label: 'Ver o livro', href: `/books/${book.slug}`, icon: <IconArrowRight size={20} />, size: 'lg' }}
                secondaryCta={book.kit ? { label: 'Abrir o kit online', href: book.kit.path, icon: <IconChecklist size={20} />, size: 'lg' } : undefined}
                background="gray"
            />
        </>
    )
}
