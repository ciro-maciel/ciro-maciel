import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Button, Container, Grid, Group, Image, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { CTAButton, FeatureSplit, SectionHeader, SECTION_BACKGROUNDS, scrollBehavior } from '@ciromaciel/components-kit'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/useSeoMeta'
import { ShiftRail } from '../components/ShiftRail'
import { LineShowcase } from '../components/LineShowcase'
import '../home.css'
import { SITE, HERO, SHIFT, PATH, SHELF, BUILD, TOOLS, MEDIA_MAW } from '../data/site'
import { BOOKS } from '../data/catalog'
import { BookCard } from '../components/BookCard'
import { NewsletterBox } from '../components/NewsletterBox'
import { StartFollow, StartProof, StartSteps } from '../components/StartHere'
import '../books.css'

// The shelf on the home since 31/10/2026: one book per moment (the steps above already send each
// reader to theirs); the whole series is one click away, on /books.
// One book per level, in level order (08/11/2026): the shelf shows the whole climb, from the first request to the profession.
const HOME_BOOKS = BOOKS.filter(book => ['ia-no-dia-a-dia', 'ia-no-escritorio', 'construir-com-ia', 'forward-deployed-engineer'].includes(book.slug))

/**
 * The before/after pair that opens the shift section.
 *
 * Not a kit component: StatsGrid renders a row of equal cards, and this needs
 * two unequal sides with an arrow between them — the contrast is the argument,
 * so it has to read as one sentence, not as two statistics.
 */
export function Home() {
    const location = useLocation()

    useSeoMeta({
        description:
            'Construir é de todos. O saber está nos livros e as ferramentas estão no ar: escolha o seu degrau e construa com IA, saiba programar ou não.',
        url: '/',
    })

    // Arrived from another page asking for an anchor: scroll once Home mounted.
    useEffect(() => {
        const target = location.state?.scrollTo
        if (!target) return
        document.getElementById(target)?.scrollIntoView({ behavior: scrollBehavior() })
    }, [location.state])

    return (
        <>
            {/* O HERO É DUAS COLUNAS AQUI, e não o `Hero` do kit.

                O componente do kit centraliza título, descrição e CTA numa
                coluna só e não tem slot de imagem — não há prop que ponha
                nada ao lado, e a arte empilhada acima dele ficava boiando: o
                padding do Hero somava com o espaço dela e o vão até o título
                engolia a relação entre os dois.

                O QUE FOI PRESERVADO do kit: os mesmos tamanhos de fonte, o
                mesmo peso, o mesmo `letterSpacing` e o mesmo CTA. Só o eixo
                mudou — de centrado para alinhado à esquerda, que é o que
                permite a segunda coluna existir.

                NO CELULAR A ARTE VEM PRIMEIRO. A ordem de leitura em uma
                coluna é de cima para baixo, e a figura acima do título é o
                que a página tinha antes de virar duas colunas — só que agora
                sem o vão, porque o `gap` do Grid é único para os dois lados.

                ELA NÃO ASSINA NADA. Quem assina é o logotipo do header: as outras três
                seções já têm imagem (a arte da mudança, o retrato, a arte do
                produto), todas paradas — uma segunda coisa em movimento faria
                as duas disputarem o olho. */}
            {/* PROPOSTA (21/10/2026): o hero absorve "Quem conduz". GRAY porque,
                com um bloco a menos, a alternância só fecha começando cinza:
                hero cinza, livros branco, linhas cinza, ferramentas branco,
                conectores cinza, cartas branco, rodapé cinza. `id="construo"`
                fica aqui para o menu "Quem conduz" continuar chegando. */}
            <Box
                id="construo"
                bg={SECTION_BACKGROUNDS.gray}
                /* 80/120 É O PADDING DE PALCO DO KIT, o mesmo que o `Hero`
                   aplicava antes deste bloco substituí-lo, e o mesmo que o
                   design system define para toda seção ("py 80–120"). Esteve
                   em 48/88 por um momento e o hero ficou apertado contra o
                   header e contra a seção seguinte — o respiro vertical é o
                   que faz a primeira dobra ler como palco e não como faixa. */
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
                            {/* `maw: 100%` e `minWidth: 0` no Stack, não no
                                texto: uma coluna de Grid é um flex item, e o
                                padrão dele é `min-width: auto` — ela não
                                encolhe abaixo do conteúdo, então o parágrafo
                                empurrava a coluna para fora da tela por mais
                                que o `maw` do Text dissesse o contrário. */}
                            <Stack
                                gap="xl"
                                align="flex-start"
                                maw="100%"
                                style={{ minWidth: 0 }}
                            >
                                {/* NÃO É UM `Title`, e não pode ser: o h1 da
                                    rota é este bloco, e um `Title` dentro de
                                    outro heading aninharia dois. O `component`
                                    faz o h1 sair aqui, uma única vez. */}
                                {/* A QUEBRA AUTORAL É SÓ DO TABLET PRA CIMA.
                                    `HERO.titleLines` traz a frase já dividida
                                    onde o autor quis — três linhas que cabem
                                    numa coluna larga. Num celular de 390px
                                    essas mesmas linhas estouram a borda:
                                    "As ferramentas e o saber é" não cabe em
                                    nenhum corpo legível.

                                    Então o <br> vira `display: none` abaixo de
                                    `sm` e o texto quebra sozinho, com as
                                    linhas unidas por espaço. O `hidden` do
                                    Mantine não serve aqui porque ele esconde
                                    por breakpoint com `display: none` em
                                    ambos os lados — o que é exatamente o que
                                    queremos, mas num <br> ele deixaria as
                                    palavras coladas: por isso o espaço
                                    explícito antes de cada quebra. */}
                                <Text c="gray.9"
                                    component="h1"
                                    m={0}
                                    fz={{ base: 30, sm: 42, md: 52 }}
                                    lh={1.15}
                                    fw={800}
                                    style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
                                >
                                    {HERO.titleLines.map((line, i) => (
                                        <span key={line}>
                                            {i > 0 && (
                                                <>
                                                    {' '}
                                                    <Box
                                                        component="br"
                                                        display={{ base: 'none', sm: 'inline' }}
                                                    />
                                                </>
                                            )}
                                            {line}
                                        </span>
                                    ))}
                                </Text>

                                <Text
                                    fz={{ base: 16, md: 18 }}
                                    c="dimmed"
                                    lh={1.6}
                                    /* `maw` sozinho não segura num celular:
                                       520px é maior que a tela, e o Text não
                                       encolhe por conta própria dentro de uma
                                       coluna de Grid. O `%` é o teto real. */
                                    style={{ maxWidth: 'min(520px, 100%)' }}
                                >
                                    {BUILD.description}
                                </Text>
                                {/* OS TRÊS COMPROMISSOS de "Quem conduz", no
                                    mesmo desenho da lista do FeatureSplit. */}
                                {BUILD.featuresList.length > 0 && (
                                <Stack
                                    gap="sm"
                                    style={{ maxWidth: 'min(560px, 100%)' }}
                                >
                                    {BUILD.featuresList.map(item => (
                                        <Group
                                            key={item}
                                            gap="sm"
                                            wrap="nowrap"
                                            align="flex-start"
                                        >
                                            <ThemeIcon
                                                size={22}
                                                radius={0}
                                                variant="light"
                                                color="gray"
                                                style={{ flexShrink: 0, marginTop: 2 }}
                                            >
                                                <IconCheck size={14} />
                                            </ThemeIcon>
                                            <Text
                                                fz={{ base: 15, md: 16 }}
                                                c="dimmed"
                                                lh={1.55}
                                            >
                                                {item}
                                            </Text>
                                        </Group>
                                    ))}
                                </Stack>
                                )}

                                {/* `size="lg"` PARA BATER COM OS OUTROS CTAs
                                    DA PÁGINA. O `Hero` do kit trazia um botão
                                    de 42px (fonte 16), e ao substituí-lo por
                                    este bloco o `size="md"` veio junto — mas
                                    "Falar comigo" e "Conhecer o Infrastructure"
                                    são renderizados pelo FeatureSplit, que usa
                                    a classe `rlg-cta` do kit: 50px de altura,
                                    fonte 18. Três botões pretos na mesma
                                    página com dois tamanhos diferentes lê como
                                    descuido, não como hierarquia — e o do topo
                                    era justamente o menor dos três.

                                    Medido no DOM, não no olho: 42 contra 50. */}
                                <Group
                                    gap="sm"
                                    w={{ base: '100%', sm: 'auto' }}
                                >
                                {/* DESCE ATÉ AS LINHAS (21/10/2026), a faixa
                                    "Para quem constrói" com Infrastructure,
                                    Operations, Customers e Marketing. Antes
                                    abria myinfrastructure.click numa aba nova:
                                    o que está no ar são as quatro linhas, não
                                    só uma. */}
                                <Button
                                    component="a"
                                    href="#degrau"
                                    onClick={event => {
                                        event.preventDefault()
                                        document.getElementById('degrau')?.scrollIntoView({ behavior: scrollBehavior() })
                                    }}
                                    size="lg"
                                    rightSection={<IconArrowRight size={20} />}
                                    /* LARGURA TOTAL NO CELULAR, natural no
                                       desktop. Os dois CTAs do FeatureSplit já
                                       fazem isso — medidos a 390px, ocupam os
                                       358px do container enquanto este parava
                                       em 323. Num dedo, um botão que não chega
                                       às margens parece meio-alvo.

                                       `block` não serve: ele é sempre 100%, e
                                       no desktop um botão da largura da coluna
                                       viraria uma faixa preta de 700px. */
                                    w={{ base: '100%', sm: 'auto' }}
                                >
                                    Achar o meu degrau
                                </Button>
                                {/* DESCE ATÉ OS LIVROS (21/10/2026): um botão
                                    leva ao que ele constrói, o outro ao que
                                    ele escreve. */}
                                <Button
                                    component="a"
                                    href="#prova"
                                    onClick={event => {
                                        event.preventDefault()
                                        document.getElementById('prova')?.scrollIntoView({ behavior: scrollBehavior() })
                                    }}
                                    size="lg"
                                    variant="default"
                                    w={{ base: '100%', sm: 'auto' }}
                                >
                                    Ver a prova
                                </Button>
                                </Group>
                            </Stack>
                        </Grid.Col>

                        <Grid.Col
                            span={{ base: 12, md: 4 }}
                            order={{ base: 1, md: 2 }}
                        >
                            <Box
                                style={{ display: 'flex', justifyContent: 'center', lineHeight: 0 }}
                            >
                                {/* A LÂMPADA SAINDO DA CAIXA diz o que o título
                                    diz — uma ideia que sai — e é o que ela
                                    ilustra.

                                    300px, e o número não é o da caixa: o
                                    desenho ocupa 61%×85% do `viewBox` de
                                    550×550, então sobra quadro vazio em volta
                                    dele e o tamanho visível é bem menor que a
                                    medida. O enquadre foi medido antes de
                                    entrar, que é o que o `CLAUDE.md` do
                                    monorepo manda fazer com arte deste banco:
                                    os SVGs declaram todos o mesmo `viewBox`
                                    mas o desenho ocupa de 57% a 95% dele, e
                                    `maw` igual rende tamanhos diferentes.
                                    Trocar por outra pede a medição de novo.

                                    `alt=""` porque a manchete ao lado já diz o
                                    que o desenho ilustra; repetir isso num
                                    leitor de tela é ruído. */}
                                {/* 200px no celular: na largura do MEDIA_MAW o
                                    retrato ocupava meia tela a 390px e
                                    empurrava o título para baixo da dobra. */}
                                <Image
                                    src={SITE.portrait}
                                    srcSet={SITE.portraitSrcSet}
                                    sizes={SITE.portraitSizes}
                                    alt="Ciro Cesar Maciel"
                                    w="100%"
                                    maw={{ base: 200, md: MEDIA_MAW }}
                                    h="auto"
                                />
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            {/* SEÇÕES DESLIGADAS (21/10/2026), a pedido do Ciro: "O que eu vejo"
                (#mudanca, "O próximo software vai ser feito por quem vive o
                problema") e "O caminho" (#caminho, "Eu construo as ferramentas.
                E conduzo o caminho inteiro."). Ele decide depois o que fazer com
                elas. Ficam aqui inteiras: um comentário JSX não aceita os
                comentários que já existem dentro do bloco, então o bloco está
                desligado com `false &&`. Para religar, apague a linha do
                `false && (` e o `)}` do fim, e descomente os links das duas
                em data/catalog.js e o título em scripts/prerender.js. */}
            {false && (
            <>
            {/* No icon and no number: Steps is used here only for its three
                columns, which is what fits the three claims in one row. The
                before/after pair and the closing line are rendered around it
                so the whole shift reads as a single block. */}
            {/* GRAY. The bands alternate down the page — hero white, this
                one gray, "o que eu construo" white, footer gray — and this
                section declared no background at all, so it inherited white
                and sat flush against the hero with no seam between them.
                The token comes from the kit so the value is the same gray
                every other surface uses. */}
            <Box
                id="mudanca"
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 72, md: 128 }}
            >
                <Container size="lg">
                    {/* `gap` IS NOT RESPONSIVE ON Stack, AND A CLASS CANNOT
                        FIX IT. Mantine writes `--stack-gap` in an INLINE
                        style, and inline beats class — so both of the obvious
                        repairs fail silently:

                        `gap={{ base: 64, md: 104 }}` stringifies the object
                        into `--stack-gap`, which is not a CSS length, and the
                        declaration falls back to the 16px default. That is
                        what shipped, on every screen, with a green build.

                        A `className` setting `--stack-gap` never lands either,
                        because the inline value wins.

                        So the value is a PROP with a single number. One gap
                        for the whole stack means the space above the timeline
                        and below it are equal by construction, not by two
                        numbers kept in agreement. The section's `py` already
                        carries the breakpoint. */}
                    <Stack gap={72}>
                        {/* UMA COLUNA CENTRADA, SEM ILUSTRAÇÃO.

                            Esteve em duas colunas, com a arte dos sliders
                            (`SHIFT.art`) à direita — um comentário aqui dizia
                            que o alinhamento à esquerda dava "uma espinha para
                            o olho seguir". A espinha existe, mas a arte não
                            dizia nada que o texto já não dissesse: três
                            controles isométricos ilustrando "o custo caiu" é
                            decoração, e a Lei 1 do design system manda cortar
                            cromo que não carrega informação.

                            Sem ela, a coluna centrada funciona porque o bloco
                            tem três partes curtas (rótulo, título, parágrafo),
                            não quatro — e porque o que vem logo abaixo é a
                            timeline, que tem eixo próprio e forte. O texto
                            centrado vira o anúncio dela.

                            O `maw` segura a medida de leitura: sem ele, o
                            parágrafo esticaria por toda a largura do container
                            `lg` e passaria de 120 caracteres por linha. */}
                        <Stack
                            gap="md"
                            align="center"
                            ta="center"
                            maw={1000}
                            mx="auto"
                        >
                            <Text
                                fz={13}
                                fw={700}
                                c="gray.6"
                                tt="uppercase"
                                style={{ letterSpacing: '0.1em' }}
                            >
                                {SHIFT.subtitle}
                            </Text>
                            <Title
                                order={2}
                                fz={{ base: 32, sm: 42, md: 52 }}
                                lh={1.08}
                                fw={800}
                                style={{ letterSpacing: '-0.03em', textWrap: 'balance' }}
                            >
                                {SHIFT.title}
                            </Title>
                            {/* O PARÁGRAFO É MAIS ESTREITO QUE O TÍTULO, de
                                propósito: um título de 52px aguenta 1000px de
                                medida, um corpo de 18px vira sopa de linha
                                longa no mesmo espaço. Os dois centrados no
                                mesmo eixo, com larguras diferentes. */}
                            <Text
                                fz={{ base: 16, md: 18 }}
                                c="dimmed"
                                lh={1.6}
                                maw={680}
                            >
                                {SHIFT.description}
                            </Text>
                        </Stack>

                        {/* THE PEOPLE ONLY, since 22/09/2026. The before/after
                            pair that used to open this rail moved out: it told
                            the shift as a cost that fell, and the three stages
                            that replace it live in their own band (`PATH`,
                            below).

                            The group title is rendered HERE, above the rail,
                            and not through `peopleTitle`: inside the rail it
                            sits at the top of the line with no dot beside it,
                            which only read right while the contrast nodes
                            above gave the line somewhere to come from. */}
                        <Stack
                            gap={28}
                            align="center"
                        >
                            <Text
                                fz={13}
                                fw={800}
                                c="gray.6"
                                tt="uppercase"
                                style={{ letterSpacing: '0.1em' }}
                            >
                                {SHIFT.peopleTitle}
                            </Text>
                            <ShiftRail people={SHIFT.people} />
                        </Stack>

                        {/* Two paragraphs, centred. The break is in the data
                            rather than in a `maw` or a <br />: a width cap
                            moves the break around as the viewport changes,
                            and this one belongs where the thought turns —
                            the fact, then what it means.

                            No `maw` on the text: each line holds on its own,
                            and the size steps down on narrow screens instead
                            of the container squeezing it. */}
                        <Stack
                            gap={4}
                            ta="center"
                        >
                            {SHIFT.closing.map((line) => (
                                <Text c="gray.9"
                                    key={line}
                                    fz={{ base: 20, sm: 24, md: 28 }}
                                    lh={1.4}
                                    fw={700}
                                    style={{ letterSpacing: '-0.02em' }}
                                >
                                    {line}
                                </Text>
                            ))}
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* O CAMINHO. Os três trechos entre a ideia e o mundo, na mesma
                timeline da visão — o último nó é o preenchido, e "Crescer" é
                o ponto de chegada.

                WHITE, E SEM COSTURA COM "O QUE EU FAÇO". O fechamento daqui
                ("eu construo as duas pontas") é a pergunta que o bloco de
                baixo responde, então os dois dividem a mesma faixa branca.
                Uma faixa nova, com cor própria, teria virado a alternância
                inteira da home de cabeça para baixo e com ela o rodapé, que
                também fecha /tools e o 404 (ver `Template.jsx`).

                Por isso só `pt`: o espaço até o título de baixo é o topo do
                próprio FeatureSplit, e somar um `pb` aqui abriria um vão
                que parece fim de seção. */}
            <Box
                id="caminho"
                bg={SECTION_BACKGROUNDS.white}
                // `pb` SINCE 01/10/2026: "Quem conduz" below is now gray, so
                // the white no longer continues and this band closes itself.
                py={{ base: 72, md: 128 }}
            >
                <Container size="lg">
                    {/* Single-number gap, for the reason written on the
                        vision band above: Stack's gap is not responsive. */}
                    <Stack gap={72}>
                        <Stack
                            gap="md"
                            align="center"
                            ta="center"
                            maw={1000}
                            mx="auto"
                        >
                            <Text
                                fz={13}
                                fw={700}
                                c="gray.6"
                                tt="uppercase"
                                style={{ letterSpacing: '0.1em' }}
                            >
                                {PATH.subtitle}
                            </Text>
                            <Title
                                order={2}
                                fz={{ base: 32, sm: 42, md: 52 }}
                                lh={1.08}
                                fw={800}
                                style={{ letterSpacing: '-0.03em', textWrap: 'balance' }}
                            >
                                {PATH.title}
                            </Title>
                        </Stack>

                        <ShiftRail contrast={PATH.stages} />

                        <Stack
                            gap={4}
                            ta="center"
                        >
                            {PATH.closing.map((line) => (
                                <Text c="gray.9"
                                    key={line}
                                    fz={{ base: 20, sm: 24, md: 28 }}
                                    lh={1.4}
                                    fw={700}
                                    style={{ letterSpacing: '-0.02em' }}
                                >
                                    {line}
                                </Text>
                            ))}
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            </>
            )}

            {/* "Quem conduz" entrou no hero (proposta de 21/10/2026). */}

            {/* THE STEPS and THE PROOF (31/10/2026, components/StartHere.jsx), white then
                gray: two sections keep the run of backgrounds below as it was. */}
            <StartSteps />
            <StartProof />

            {/* THE SHELF (01/10/2026), after "Quem conduz" and before the
                Infrastructure: first who he is, then what he wrote, then what
                he built (the founder's order). WHITE, in the run: hero white,
                vision gray, path white, "Quem conduz" gray, shelf white,
                Infrastructure gray, tools white, footer gray. */}
            <Box
                id="livros"
                bg={SECTION_BACKGROUNDS.white}
                py={{ base: 72, md: 128 }}
            >
                <Container size="lg">
                    <Stack gap={56}>
                        {/* CENTERED (08/11/2026): every section title of the site sits on the
                            middle axis, the CTA under the paragraph instead of beside it. */}
                        <Stack
                            gap="xl"
                            align="center"
                        >
                            <Stack
                                gap="md"
                                maw={720}
                                align="center"
                                ta="center"
                            >
                                <Text
                                    fz={13}
                                    fw={700}
                                    c="gray.6"
                                    tt="uppercase"
                                    style={{ letterSpacing: '0.1em' }}
                                >
                                    {SHELF.subtitle}
                                </Text>
                                <Title
                                    order={2}
                                    fz={{ base: 32, sm: 42, md: 52 }}
                                    lh={1.08}
                                    fw={800}
                                    style={{ letterSpacing: '-0.03em' }}
                                >
                                    {SHELF.title}
                                </Title>
                                <Text
                                    fz={{ base: 16, md: 18 }}
                                    c="dimmed"
                                    lh={1.6}
                                >
                                    {SHELF.description}
                                </Text>
                            </Stack>
                            {/* The kit's CTAButton, the same as "Falar comigo"
                                and "Conhecer o Infrastructure" (class
                                `rlg-cta`): one button size on the page. `Link`
                                so the shelf opens without reloading the app. */}
                            <CTAButton
                                label={SHELF.cta.label}
                                component={Link}
                                to={SHELF.cta.to}
                                icon={<IconArrowRight size={20} />}
                            />
                        </Stack>
                        {/* FOUR ACROSS FROM md (08/10/2026): with the cards
                            centred, four books in three columns left the
                            fourth alone in a row of its own. The 200px cover
                            fits the ~230px column at md. */}
                        <SimpleGrid
                            cols={{ base: 1, xs: 2, md: 4 }}
                            spacing={40}
                            verticalSpacing={48}
                        >
                            {HOME_BOOKS.map((book) => (
                                <BookCard
                                    key={book.slug}
                                    book={book}
                                    line={book.menuLine}
                                />
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>

            {/* A PEÇA, logo depois de quem a construiu, e desde 08/10/2026
                as outras linhas na mesma faixa cinza: quatro abas em cima, e a
                escolhida troca o bloco embaixo. O Infrastructure abre
                selecionado, com a copy de sempre (data/site.js). */}
            <LineShowcase />

            {/* AS FERRAMENTAS, depois da peça que se compra: o que se usa de
                graça. A arte é a mesma da página /tools.

                SEM `reverse`: a arte à direita, como a da Infrastructure logo
                acima — as duas fichas vizinhas com a mesma forma. (Testada à
                esquerda em 01/10/2026; o dono do site preferiu como está.)

                WHITE, e é ela que fecha a alternância agora — por isso o
                rodapé virou cinza (ver `Template.jsx`).

                O CTA é `href`, não `<Link>`: o FeatureSplit do kit repassa só
                { label, href, ... } ao botão. A página /tools recarrega o app
                ao chegar, o que num clique de saída da home não se nota. */}
            <FeatureSplit
                id="ferramentas"
                subtitle={TOOLS.home.subtitle}
                title={TOOLS.home.title}
                descriptionFz={{ base: 17, md: 18 }}
                description={TOOLS.home.description}
                featuresList={TOOLS.home.featuresList}
                image={TOOLS.art}
                imageAlt=""
                mediaMaw={MEDIA_MAW}
                cta={TOOLS.home.cta}
                background={SECTION_BACKGROUNDS.white}
            />

            {/* The connectors left the home on 31/10/2026: they are the Agents tab above and the
                menu's "Conectores MCP"; MCP_HOME still feeds /mcp. */}

            {/* CARTAS DO CIRO (14/10/2026), the last band, right above the
                footer (moved from under the hero on 21/10/2026, at the Ciro's
                request): whoever read the page to the end is who subscribes.
                WHITE, after the gray of the connectors and before the gray
                footer, so the bands keep alternating. */}
            {/* THE CLOSING (31/10/2026): the open channels (gray), then the letters (white); the
                footer takes the other tone by itself (site-footer.css). */}
            <StartFollow />
            <NewsletterBox background={SECTION_BACKGROUNDS.white} />
        </>
    )
}
