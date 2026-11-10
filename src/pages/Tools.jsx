import { useEffect, useMemo, useState } from 'react'
import { Box, Container, Grid, Group, Image, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core'
import { SECTION_BACKGROUNDS, scrollBehavior } from '@ciromaciel/components-kit'
import { IconArrowRight, IconCheck, IconSearch } from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/use-seo-meta'
import { TOOLS } from '../data/site'
import { EXTENSIONS, STORES } from '../data/catalog'
import { useLocation } from 'react-router-dom'
import '../tools.css'
// Written by `build-tools.js registry` before every dev and build (predev, prebuild).
import REGISTRY from '../../public/tools.json'
import { NewsletterBox } from '../components/NewsletterBox'
import { LINE_TOOLS } from '../data/line-tools'

const LOCALE = 'pt-BR'

/** "Senha Forte" e "senha forte" são a mesma busca; "segurança" e "seguranca" também. */
function normalize(text) {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
}

/** Tudo o que uma pessoa pode digitar para chegar à ferramenta, em qualquer idioma do `tool.json`. */
function searchText(tool) {
    const parts = [tool.id, ...Object.values(tool.title), ...Object.values(tool.description), ...Object.values(tool.keywords ?? {}).flat()]
    return normalize(parts.join(' '))
}

/**
 * O catálogo das ferramentas.
 *
 * A LISTA VEM DE `/tools.json`, o mesmo arquivo que um agente lê. A página não
 * tem cópia própria das ferramentas, então não há como as duas divergirem.
 * It is imported, not fetched (19/10/2026): with `fetch` in an effect, the HTML
 * written at build time (scripts/ssr.js) had no card at all, and a crawler that
 * does not run JavaScript found 16 of the 19 tools linked from nowhere.
 *
 * O HERO É O DA HOME, não o `Hero` do kit: duas colunas, a arte à direita, o
 * mesmo palco (80/120), os mesmos tamanhos de título. A diferença é que aqui o
 * CTA é a busca — quem chega quer achar uma ferramenta, não ler sobre elas.
 *
 * O LINK DO CARD É `<a href>`, NÃO `<Link>`. Cada ferramenta é um app separado
 * em `/tools/<id>`: o router deste site não sabe abri-la, e renderizaria o 404
 * dele.
 */
// The Chrome extensions first (they have a page here), then VS Code.
const INSTALLABLE = [
    { id: 'history', name: 'History', description: 'Ache qualquer página que você já leu, por uma frase que você lembra.', where: STORES.chrome, href: '/tools/history' },
    { id: 'pomodoro', name: 'Pomodoro', description: 'Timer Pomodoro no painel lateral do Chrome, com as tarefas e os sites que distraem.', where: STORES.chrome, href: '/tools/pomodoro' },
    ...EXTENSIONS.map(extension => ({ ...extension, where: STORES[extension.store], external: true })),
]

export function Tools() {
    const location = useLocation()

    // Arriving from the menu ("Para o VS Code"): scroll to the extensions once
    // the page is mounted, the same way the home handles its anchors.
    useEffect(() => {
        const target = location.state?.scrollTo
        if (!target) return
        const timer = setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: scrollBehavior() }), 150)
        return () => clearTimeout(timer)
    }, [location.state])

    const tools = REGISTRY.tools ?? []
    const [query, setQuery] = useState('')

    useSeoMeta({
        title: TOOLS.subtitle,
        description: `${TOOLS.title} ${TOOLS.description}`,
        url: '/tools',
    })

    const visible = useMemo(() => {
        const words = normalize(query).split(/\s+/).filter(Boolean)
        if (!words.length) return tools
        return tools.filter(tool => {
            const text = searchText(tool)
            return words.every(word => text.includes(word))
        })
    }, [tools, query])

    const count = `${visible.length} ${visible.length === 1 ? 'ferramenta' : 'ferramentas'}`

    return (
        <>
            {/* AS FAIXAS SÃO AO CONTRÁRIO DA HOME: hero cinza, lista branca.
                O rodapé é cinza (ver `Template.jsx`), então a última faixa de
                toda página precisa ser branca — com a lista cinza, ela e o
                rodapé viravam um bloco só. No cinza, a busca branca é também o
                elemento mais claro do hero, que é o que ela deve ser. */}
            <Box
                component="section"
                id="busca"
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 80, md: 120 }}
            >
                <Container size="lg">
                    <Grid
                        gutter={{ base: 32, md: 64 }}
                        align="center"
                    >
                        <Grid.Col
                            span={{ base: 12, md: 8 }}
                            order={{ base: 2, md: 1 }}
                        >
                            {/* `minWidth: 0` pelo mesmo motivo da home: a
                                coluna do Grid é flex item e não encolhe abaixo
                                do conteúdo sem ele. */}
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
                                    {TOOLS.subtitle}
                                </Text>
                                <Text c="gray.9"
                                    component="h1"
                                    m={0}
                                    fz={{ base: 30, sm: 42, md: 52 }}
                                    lh={1.15}
                                    fw={800}
                                    style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
                                >
                                    {TOOLS.title}
                                </Text>
                                <Text
                                    fz={{ base: 16, md: 18 }}
                                    c="gray.6"
                                    lh={1.6}
                                    style={{ maxWidth: 'min(520px, 100%)' }}
                                >
                                    {TOOLS.description}
                                </Text>

                                {/* A BUSCA SAI DO PADRÃO DO KIT DE PROPÓSITO.
                                    O tema declara todo TextInput como
                                    `unstyled`, só com a linha de baixo e
                                    `paddingLeft: 0` — o que é certo num
                                    formulário, mas aqui ela é o CTA da página,
                                    e o `paddingLeft: 0` punha a lupa em cima
                                    do texto. A caixa inteira e o respiro para
                                    a lupa são o que faz ela ler como a ação
                                    principal.

                                    50px É A ALTURA DOS CTAs DO SITE (a classe
                                    `rlg-cta` do kit, medida na home). Esteve
                                    em 64 e pesava mais que o título. */}
                                <TextInput
                                    variant="default"
                                    radius={0}
                                    w="100%"
                                    maw={560}
                                    placeholder={TOOLS.searchPlaceholder}
                                    aria-label={TOOLS.searchPlaceholder}
                                    leftSection={<IconSearch
                                        size={20}
                                        stroke={1.5}
                                        aria-hidden
                                    />}
                                    leftSectionWidth={48}
                                    value={query}
                                    onChange={event => setQuery(event.currentTarget.value)}
                                    classNames={{ input: 'tools-search' }}
                                    styles={{ input: { paddingLeft: 48, height: 50, minHeight: 50, fontSize: 16 } }}
                                />

                                <Group
                                    gap="lg"
                                    style={{ rowGap: 'var(--mantine-spacing-xs)' }}
                                >
                                    {TOOLS.promises.map(promise => (
                                        <Group
                                            key={promise}
                                            gap={6}
                                            wrap="nowrap"
                                        >
                                            <IconCheck
                                                size={18}
                                                stroke={1.5}
                                                aria-hidden
                                                color="var(--mantine-color-gray-9)"
                                            />
                                            <Text
                                                size="sm"
                                                fw={500}
                                            >
                                                {promise}
                                            </Text>
                                        </Group>
                                    ))}
                                </Group>
                            </Stack>
                        </Grid.Col>

                        <Grid.Col
                            span={{ base: 12, md: 4 }}
                            order={{ base: 1, md: 2 }}
                        >
                            <Box style={{ display: 'flex', justifyContent: 'center', lineHeight: 0 }}>
                                {/* `alt=""`: o título ao lado já diz o que o
                                    desenho ilustra. 300 é o da home — o
                                    enquadre das duas artes foi medido igual
                                    (ver TOOLS.art). */}
                                <Image
                                    src={TOOLS.art}
                                    alt=""
                                    style={{ width: '100%', maxWidth: 300, height: 'auto' }}
                                />
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            <Box
                component="section"
                id="lista"
                bg={SECTION_BACKGROUNDS.white}
                py={{ base: 80, md: 120 }}
            >
                <Container size="lg">
                    <Stack
                        gap={4}
                        align="center"
                        ta="center"
                        mb={40}
                    >
                        <Title
                            order={2}
                            fz={{ base: 24, md: 32 }}
                        >
                            {TOOLS.listTitle}
                        </Title>
                        <Text
                            c="gray.5"
                            fw={500}
                        >
                            {count}
                        </Text>
                    </Stack>

                    {visible.length === 0 && (
                        <Text
                            c="gray.6"
                            size="lg"
                        >
                            {TOOLS.empty}
                        </Text>
                    )}

                    <SimpleGrid
                        cols={{ base: 1, sm: 2, md: 3 }}
                        spacing="xl"
                    >
                        {visible.map(tool => (
                            <a
                                key={tool.id}
                                href={`/tools/${tool.id}`}
                                className="tools-card"
                            >
                                <Text
                                    size="xs"
                                    fw={800}
                                    tt="uppercase"
                                    lts="1.5px"
                                    c="gray.5"
                                    mb={8}
                                >
                                    {TOOLS.runs[tool.runs] ?? ''}
                                </Text>
                                <Title
                                    order={3}
                                    fz={24}
                                    mb="sm"
                                >
                                    {tool.title[LOCALE]}
                                </Title>
                                <Text
                                    c="gray.6"
                                    lh={1.6}
                                    mb="xl"
                                    style={{ flex: 1 }}
                                >
                                    {tool.description[LOCALE]}
                                </Text>
                                <Group
                                    gap={8}
                                    className="tools-card-cta"
                                >
                                    <Text c="gray.9"
                                        fw={800}
                                        tt="uppercase"
                                        lts="1px"
                                        size="sm"
                                    >
                                        {TOOLS.ctaLabel}
                                    </Text>
                                    <IconArrowRight
                                        size={18}
                                        stroke={1.5}
                                        aria-hidden
                                    />
                                </Group>
                            </a>
                        ))}
                    </SimpleGrid>

                    {TOOLS.mcp && (
                        <Text
                            mt={48}
                            size="sm"
                            c="gray.5"
                        >
                            {TOOLS.mcp}
                        </Text>
                    )}

                    {/* THE EXTENSIONS (01/10/2026): what installs in the
                        Chrome and in VS Code, in the same white band so the
                        page still ends on white above the gray footer. The
                        Chrome ones are tools with a page here; the VS Code
                        ones go to their store. The list is EXTENSIONS in
                        data/catalog.js, checked against the stores. */}
                    <Box
                        id="extensoes"
                        mt={{ base: 80, md: 112 }}
                        style={{ scrollMarginTop: 120 }}
                    >
                        <Stack
                            gap={4}
                            align="center"
                            ta="center"
                            mb={40}
                        >
                            <Title
                                order={2}
                                fz={{ base: 24, md: 32 }}
                            >
                                Para instalar
                            </Title>
                            <Text
                                c="gray.5"
                                fw={500}
                            >
                                Chrome e VS Code
                            </Text>
                        </Stack>
                        <SimpleGrid
                            cols={{ base: 1, sm: 2, md: 3 }}
                            spacing="xl"
                        >
                            {INSTALLABLE.map(item => (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noopener noreferrer' : undefined}
                                    className="tools-card"
                                >
                                    <Text
                                        size="xs"
                                        fw={800}
                                        tt="uppercase"
                                        lts="1.5px"
                                        c="gray.5"
                                        mb={8}
                                    >
                                        {item.where}
                                    </Text>
                                    <Title
                                        order={3}
                                        fz={24}
                                        mb="sm"
                                    >
                                        {item.name}
                                    </Title>
                                    <Text
                                        c="gray.6"
                                        lh={1.6}
                                        mb="xl"
                                        style={{ flex: 1 }}
                                    >
                                        {item.description}
                                    </Text>
                                    {/* The same call to action as the tools above. */}
                                    <Group
                                        gap={8}
                                        className="tools-card-cta"
                                    >
                                        <Text
                                            c="gray.9"
                                            fw={800}
                                            tt="uppercase"
                                            lts="1px"
                                            size="sm"
                                        >
                                            {item.external ? 'Ver na loja' : TOOLS.ctaLabel}
                                        </Text>
                                        <IconArrowRight
                                            size={18}
                                            stroke={1.5}
                                            aria-hidden
                                        />
                                    </Group>
                                </a>
                            ))}
                        </SimpleGrid>
                    </Box>

                    {/* NAS LINHAS (05/11/2026): the free tools of each line, by name, so the
                        pages the search engines already crawl here lead to them (data/line-tools.js). */}
                    <Box
                        id="nas-linhas"
                        mt={{ base: 80, md: 112 }}
                        style={{ scrollMarginTop: 120 }}
                    >
                        <Stack
                            gap={4}
                            align="center"
                            ta="center"
                            mb={40}
                        >
                            <Title
                                order={2}
                                fz={{ base: 24, md: 32 }}
                            >
                                Nas linhas
                            </Title>
                            <Text
                                c="gray.5"
                                fw={500}
                            >
                                Grátis, sem cadastro
                            </Text>
                        </Stack>
                        <SimpleGrid
                            cols={{ base: 1, sm: 2, md: 3 }}
                            spacing={48}
                        >
                            {LINE_TOOLS.map(group => (
                                <Stack
                                    key={group.line}
                                    gap="lg"
                                >
                                    <Text
                                        size="xs"
                                        fw={800}
                                        tt="uppercase"
                                        lts="1.5px"
                                        c="gray.5"
                                    >
                                        {group.line}
                                    </Text>
                                    {group.tools.map(tool => (
                                        <a
                                            key={tool.url}
                                            href={tool.url}
                                            style={{ color: 'inherit', textDecoration: 'none' }}
                                        >
                                            <Text
                                                fw={700}
                                                c="gray.9"
                                            >
                                                {tool.name}
                                            </Text>
                                            <Text
                                                size="sm"
                                                c="gray.6"
                                                lh={1.6}
                                            >
                                                {tool.text}
                                            </Text>
                                        </a>
                                    ))}
                                </Stack>
                            ))}
                        </SimpleGrid>
                    </Box>
                </Container>
            </Box>

            {/* CARTAS DO CIRO (14/10/2026): the second-most visited pages of the root, after the home. */}
            {/* Gray: the band above is white, and since 21/10/2026 the box has no
                tone of its own (the `background` prop) nor the top rule it had. */}
            <NewsletterBox background={SECTION_BACKGROUNDS.gray} />
        </>
    )
}
