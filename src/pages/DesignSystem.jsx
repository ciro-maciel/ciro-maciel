import { useEffect, useState } from 'react'
import {
    Badge,
    Box,
    Container,
    Grid,
    Group,
    List,
    Paper,
    SimpleGrid,
    Stack,
    Table,
    Text,
    ThemeIcon,
    Title,
} from '@mantine/core'
import { IconCheck, IconCopy, IconDownload, IconExternalLink, IconX } from '@tabler/icons-react'

import {
    BLOCKERS,
    BORDERS,
    BREAKPOINTS,
    CHECKLIST,
    CONTAINERS,
    CONTRAST_TABLE,
    FLUID_SCALE,
    FONT_WEIGHTS,
    GRAY_RAMP,
    LAYERS,
    LINE_HEIGHTS,
    LOSS_COLOR,
    MEASURES,
    META,
    MOTION,
    PRINCIPLES,
    RADIUS,
    SECTION_VOCABULARY,
    SEMANTIC_COLORS,
    SPACE_SCALE,
    STAGE_RHYTHM,
    TRACKING,
    TYPE_ROLES,
    UNIVERSAL_PROPS,
    SURFACES,
    PANEL_LAYOUT,
    PAGE_HEADER,
    TABLE_SPEC,
    SEARCH_SPEC,
    STATES,
    DESTRUCTIVE,
    FORM_SPEC,
    SIDEBAR_SPEC,
    APPLE_REFERENCE,
    DARK_RAMP,
    } from '../design-system/tokens.js'
import { ALIASES, COMPONENTS, PITFALLS, PRIMITIVES, RECIPES, SETUP } from '../design-system/api.js'
import { Callout, CodeBlock, DoDont, DoDontCard, DocSection, SpecRow, SubHead, Swatch } from '../design-system/DocsKit.jsx'
import { DocsNav } from '../design-system/DocsNav.jsx'
import { useSeoMeta } from '../hooks/use-seo-meta'

/**
 * useSpecOrigin — a origem de onde esta página está sendo servida.
 *
 * O prompt precisa carregar uma URL que o agente consiga buscar de fato, e
 * isso muda entre localhost e produção. Derivar de window.location evita o
 * link fixo que funcionava só na máquina de quem escreveu.
 *
 * Um hook, e não uma constante lida no import: a página é escrita no build
 * (scripts/ssr.js) com o endereço de produção, e a hidratação precisa do mesmo
 * texto. A origem real entra depois, num efeito.
 */
const PRODUCTION_ORIGIN = 'https://ciromaciel.click'

function useSpecOrigin() {
    const [origin, setOrigin] = useState(PRODUCTION_ORIGIN)
    useEffect(() => setOrigin(window.location.origin), [])
    return origin
}

const SECTIONS = [
    { id: 'principios', label: 'Princípios' },
    { id: 'tipografia', label: 'Tipografia' },
    { id: 'cor', label: 'Cor' },
    { id: 'espaco', label: 'Espaço' },
    { id: 'forma', label: 'Forma' },
    { id: 'composicao', label: 'Composição' },
    { id: 'painel', label: 'Painel' },
    { id: 'api', label: 'API dos componentes' },
    { id: 'receitas', label: 'Receitas' },
    { id: 'erros', label: 'Erros frequentes' },
    { id: 'apple', label: 'Referência: Apple' },
    { id: 'checklist', label: 'Checklist' },
    { id: 'prompt', label: 'Prompt mestre' },
    { id: 'agentes', label: 'Para agentes' },
]

/* EXPORT NOMEADO e não `default`: as rotas deste site são importadas de forma
   estática em `main.jsx`, ao contrário do site do produto, que carrega esta página com
   `lazy()`. Vale reavaliar se o peso incomodar — são ~100KB de JS que só esta
   rota usa. */
export function DesignSystem() {
    useSeoMeta({
        title: 'Design system',
        description:
            'O design system que este site usa: princípios, tokens, a API dos componentes e o prompt para agentes.',
        // `url`, não `path` — o hook deste repositório monta a canônica assim.
        url: '/design-system',
    })

    return (
        <>
            <Hero />
            <Container
                size="lg"
                pt={{ base: 60, md: 100 }}
                pb={140}
            >
                <Grid gutter={{ base: 0, md: 60 }}>
                    <Grid.Col
                        span={{ base: 12, md: 3 }}
                        visibleFrom="md"
                    >
                        <DocsNav sections={SECTIONS} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 9 }}>
                        <Principios />
                        <Tipografia />
                        <Cor />
                        <Espaco />
                        <Forma />
                        <Composicao />
                        <Panel />
                        <ApiReference />
                        <Receitas />
                        <Errors />
                        <AppleReference />
                        <Checklist />
                        <MasterPrompt />
                        <ParaAgentes />
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}

/* ==========================================================================
   Abertura
   ========================================================================== */

function Hero() {
    return (
        <Box
            bg="gray.1"
            py={{ base: 80, sm: 100, md: 140 }}
            style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
        >
            <Container size="lg">
                <Stack gap="xs">
                    <Text
                        size="xs"
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.4"
                    >
                        {META.name} · v{META.version}
                    </Text>
                    <Title
                        order={1}
                        fz="var(--fz-hero)"
                        maw={900}
                    >
                        O sistema por trás de tudo que construímos.
                    </Title>
                </Stack>

                <Text
                    c="gray.6"
                    fz="xl"
                    lh={1.7}
                    maw={780}
                    mt="xl"
                >
                    Uma fonte, dez cinzas, raio zero. Este documento não é aspiracional — cada regra foi medida na
                    frequência real de uso em {META.componentCount} componentes e {META.primitiveCount} primitivas do{' '}
                    <Text
                        component="span"
                        fw={700}
                        c="gray.9"
                    >
                        {META.source}
                    </Text>
                    . Onde o código diverge da regra, a divergência está registrada.
                </Text>

                <SimpleGrid
                    cols={{ base: 2, sm: 4 }}
                    spacing={0}
                    mt={80}
                >
                    {[
                        { value: '1', label: 'Família tipográfica', note: 'Montserrat, 4 pesos' },
                        { value: '10', label: 'Degraus de cinza', note: 'Nenhuma cor de marca' },
                        { value: '0', label: 'Border radius', note: `${RADIUS.occurrences} ocorrências, ${RADIUS.exceptions} exceções` },
                        { value: '4', label: 'Papéis de texto', note: 'Label, dado, corpo, display' },
                    ].map((stat, i) => (
                        <Box
                            key={stat.label}
                            px={{ base: 0, sm: 'lg' }}
                            py="md"
                            style={{
                                borderLeft: i > 0 ? '1px solid var(--mantine-color-gray-2)' : 'none',
                            }}
                        >
                            <Text
                                component="div"
                                fz="var(--fz-big-metric-sm, clamp(48px, 5vw, 72px))"
                                fw={900}
                                lh={1}
                                c="gray.9"
                                style={{ letterSpacing: '-0.04em' }}
                            >
                                {stat.value}
                            </Text>
                            <Text
                                fz={14}
                                fw={700}
                                c="gray.9"
                                mt="md"
                                lh={1.4}
                            >
                                {stat.label}
                            </Text>
                            <Text
                                fz={12}
                                c="gray.6"
                                lh={1.5}
                                mt={4}
                            >
                                {stat.note}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    )
}

/* ==========================================================================
   1 · Princípios
   ========================================================================== */

function Principios() {
    return (
        <DocSection
            first
            id="principios"
            label="Fundamento"
            title="As seis leis"
            description="Tudo o resto é derivado. Se uma decisão de design não puder ser justificada por uma destas leis, a decisão está errada — ou a lei precisa mudar aqui primeiro."
        >
            <Stack gap={0}>
                {PRINCIPLES.map(p => (
                    <Box
                        key={p.n}
                        py={40}
                        style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
                    >
                        <Grid gutter={{ base: 'md', md: 40 }}>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                                <Group
                                    gap="md"
                                    align="baseline"
                                    wrap="nowrap"
                                >
                                    <Text
                                        component="div"
                                        fz={48}
                                        fw={900}
                                        lh={1}
                                        c="gray.2"
                                        style={{ letterSpacing: '-0.04em' }}
                                    >
                                        {String(p.n).padStart(2, '0')}
                                    </Text>
                                    <Title
                                        order={3}
                                        fz={{ base: 20, md: 22 }}
                                        fw={800}
                                    >
                                        {p.name}
                                    </Title>
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 8 }}>
                                <Stack gap="md">
                                    <Text
                                        c="gray.9"
                                        fw={700}
                                        lh={1.6}
                                    >
                                        {p.summary}
                                    </Text>
                                    <Text
                                        c="gray.6"
                                        lh={1.7}
                                        fz={15}
                                    >
                                        {p.detail}
                                    </Text>
                                    <Text
                                        c="gray.5"
                                        lh={1.6}
                                        fz={13}
                                        fs="italic"
                                    >
                                        {p.corollary}
                                    </Text>
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Box>
                ))}
            </Stack>
        </DocSection>
    )
}

/* ==========================================================================
   2 · Tipografia
   ========================================================================== */

function Tipografia() {
    return (
        <DocSection
            id="tipografia"
            label="Token"
            title="Tipografia"
            description="Uma família, quatro pesos, três papéis. Como não há cor de marca, a tipografia carrega sozinha toda a hierarquia — por isso é a parte mais rígida do sistema."
        >
            <SubHead
                mt={0}
                note="Geométrica, altura-x alta, e — decisivo — o peso 900 é genuinamente pesado. Metade do sistema depende de o Black existir de verdade."
            >
                A família
            </SubHead>

            <Paper
                radius="0"
                bd="1px solid var(--mantine-color-gray-2)"
                bg="white"
                p={{ base: 'xl', md: 40 }}
            >
                <Group
                    justify="space-between"
                    align="flex-end"
                    wrap="wrap"
                    gap="xl"
                >
                    <Box>
                        <Text
                            component="div"
                            fz={{ base: 96, md: 140 }}
                            fw={900}
                            lh={0.9}
                            c="gray.9"
                            style={{ letterSpacing: '-0.04em' }}
                        >
                            Aa
                        </Text>
                        <Text c="gray.9"
                            fw={800}
                            fz="lg"
                            mt="md"
                        >
                            Montserrat
                        </Text>
                        <Badge
                            variant="dot"
                            color="gray"
                            radius="0"
                            mt="xs"
                        >
                            Variável 100–900
                        </Badge>
                    </Box>
                    <Text
                        c="gray.6"
                        lh={1.7}
                        maw={420}
                        fz={14}
                    >
                        Pilha de fallback sistema-primeiro: se o Google Fonts falhar, a página degrada para a fonte
                        nativa da plataforma, não para Times.
                    </Text>
                </Group>
            </Paper>

            <Box mt="md">
                <CodeBlock
                    label="CSS"
                    code={`font-family: Montserrat, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Helvetica, Arial, sans-serif;`}
                />
            </Box>

            {/* --- Pesos --- */}
            <SubHead note="Nenhum outro valor é permitido. Não existe 400 declarado neste sistema: quando o peso é escrito, é para subir, nunca para descer.">
                Os quatro pesos
            </SubHead>

            <Box>
                {FONT_WEIGHTS.map(w => (
                    <SpecRow
                        key={w.value}
                        count={w.count}
                        name={`${w.name} ${w.value}`}
                        value={`fw={${w.value}}`}
                        usage={w.usage}
                        preview={
                            <Text
                                fz={{ base: 28, md: 34 }}
                                fw={w.value}
                                c="gray.9"
                                lh={1.2}
                                style={{ letterSpacing: '-0.02em' }}
                            >
                                Infraestrutura
                            </Text>
                        }
                    />
                ))}
            </Box>

            <Callout title="Regra">
                900 e 800 nunca se tocam no mesmo bloco. Se um título 900 e um label 800 estão adjacentes, é porque o
                tamanho os separa em 4×. Sem o salto de tamanho, os dois pesos brigam.
            </Callout>

            {/* --- Papéis --- */}
            <SubHead note="Todo texto do sistema é um dos quatro. Texto que se lê em sequência é corpo; texto que se compara em coluna é dado.">
                Os quatro papéis
            </SubHead>

            <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 4 }}
                spacing="xl"
            >
                {Object.entries(TYPE_ROLES).map(([key, role]) => (
                    <Paper
                        key={key}
                        radius="0"
                        bd="1px solid var(--mantine-color-gray-2)"
                        bg="white"
                    >
                        <Box
                            p="lg"
                            bg="gray.0"
                            mih={140}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                borderBottom: '1px solid var(--mantine-color-gray-2)',
                            }}
                        >
                            <Text
                                c={role.color}
                                fw={role.fontWeight}
                                tt={role.textTransform}
                                lh={role.lineHeight}
                                fz={key === 'display' ? 32 : key === 'label' ? 11 : key === 'data' ? 13 : 15}
                                style={{ letterSpacing: role.letterSpacing }}
                            >
                                {key === 'label' && 'Prova verificável'}
                                {key === 'body' && 'O número carrega a hierarquia e a nota o sustenta.'}
                                {key === 'data' && 'ana@acme.com.br · Ativo · 2h'}
                                {key === 'display' && 'Massivo'}
                            </Text>
                        </Box>
                        <Stack
                            gap={6}
                            p="lg"
                        >
                            <Group
                                gap="xs"
                                align="baseline"
                            >
                                <Text c="gray.9"
                                    fw={800}
                                    fz={15}
                                >
                                    {role.name}
                                </Text>
                                <Text
                                    fz={12}
                                    c="gray.4"
                                    fs="italic"
                                >
                                    {role.tagline}
                                </Text>
                            </Group>
                            <SpecLine label="Tamanho" value={role.fontSize} />
                            <SpecLine label="Peso" value={role.fontWeight} />
                            <SpecLine label="Tracking" value={role.letterSpacing} />
                            <SpecLine label="Cor" value={role.color} />
                            <SpecLine label="Line-height" value={role.lineHeight} />
                        </Stack>
                    </Paper>
                ))}
            </SimpleGrid>

            {/* --- Par canônico --- */}
            <SubHead note="O padrão que define visualmente a marca. Label e título são opostos em cinco dimensões ao mesmo tempo — é isso que cria a tensão.">
                O par canônico
            </SubHead>

            <Paper
                radius="0"
                bd="1px solid var(--mantine-color-gray-2)"
                bg="white"
                p={{ base: 'xl', md: 40 }}
            >
                <Stack gap="xs">
                    <Text
                        size="xs"
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.4"
                    >
                        Prova verificável
                    </Text>
                    <Title
                        order={3}
                        fz="var(--fz-section-title)"
                        maw={600}
                    >
                        Números que você pode conferir.
                    </Title>
                </Stack>
            </Paper>

            <Box
                mt="xl"
                style={{ overflowX: 'auto' }}
            >
                <Table
                    withRowBorders
                    verticalSpacing="sm"
                    miw={480}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th />
                            <Table.Th>
                                <ThLabel>Label</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Título</ThLabel>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {[
                            ['Tamanho', '11px', '44px'],
                            ['Peso', '800', '900'],
                            ['Caixa', 'Alta', 'Sentença'],
                            ['Tracking', '+1.5px', '−0.04em'],
                            ['Cor', 'gray.4', 'gray.9'],
                        ].map(([dim, a, b]) => (
                            <Table.Tr key={dim}>
                                <Table.Td>
                                    <Text
                                        fz={13}
                                        c="gray.5"
                                        fw={700}
                                    >
                                        {dim}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text fz={13}>{a}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={13}
                                        fw={700}
                                        c="gray.9"
                                    >
                                        {b}
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Box>

            <Box mt="md">
                <CodeBlock
                    label="JSX — nunca reimplemente à mão, use SectionHeader"
                    code={`<Stack gap="xs">
    <Text size="xs" fw={800} tt="uppercase" lts="1.5px" c="gray.4">
        Prova verificável
    </Text>
    <Title order={2} fz="var(--fz-section-title)" maw={800}>
        Números que você pode conferir.
    </Title>
</Stack>`}
                />
            </Box>

            {/* --- Escala fluida --- */}
            <SubHead note="Nenhum título tem tamanho fixo. Redimensione a janela — os exemplos abaixo reescalam de verdade, porque são o mesmo clamp() que roda em produção.">
                A escala fluida
            </SubHead>

            <Box>
                {FLUID_SCALE.map(s => (
                    <SpecRow
                        key={s.token}
                        name={s.token}
                        value={s.value}
                        usage={`${s.range} · ${s.usage}`}
                        preview={
                            <Text
                                fz={`var(${s.token}, ${s.value})`}
                                fw={900}
                                lh={1}
                                c="gray.9"
                                style={{
                                    letterSpacing: '-0.04em',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                Aa
                            </Text>
                        }
                    />
                ))}
            </Box>

            <Callout title="A fórmula">
                Sempre <Mono>clamp(mínimo, Nvw + 1rem, máximo)</Mono>. O <Mono>+ 1rem</Mono> garante que o texto ainda
                escale se o usuário aumentar a fonte base — <Mono>vw</Mono> puro ignora a preferência de acessibilidade.
                O coeficiente <Mono>vw</Mono> codifica a agressividade: hero cresce a 8vw, métrica a 10vw (a mais
                dramática), título de seção a 5vw (a mais contida, porque aparece dezenas de vezes por página).
            </Callout>

            {/* --- Tracking --- */}
            <SubHead note="O código tem 8 valores distintos; a escala real é de três. Os demais são drift a consolidar.">
                Letter-spacing
            </SubHead>

            <Box>
                {TRACKING.map(t => (
                    <SpecRow
                        key={t.name}
                        count={t.count}
                        name={t.name}
                        value={`lts="${t.value}"`}
                        usage={t.usage}
                        preview={
                            <Text
                                fz={t.name === 'tight' ? 32 : 13}
                                fw={t.name === 'tight' ? 900 : 800}
                                tt={t.name === 'tight' ? 'none' : 'uppercase'}
                                c="gray.9"
                                style={{ letterSpacing: t.value }}
                            >
                                Infraestrutura
                            </Text>
                        }
                    />
                ))}
            </Box>

            <Callout title="Por que um é relativo e outro absoluto">
                <Mono>-0.04em</Mono> é relativo porque precisa escalar junto com a fonte fluida. <Mono>1.5px</Mono> é
                absoluto porque label é sempre aplicado em 10–13px, então o valor fixo é previsível e mais fácil de
                acertar. A inversão de sinal é o ponto: em tamanho grande o espaçamento natural parece frouxo e precisa
                reagrupar; em caixa alta e peso 800, as letras colidem e precisam respirar.
            </Callout>

            {/* --- Line-height --- */}
            <SubHead note="Cresce com o comprimento do texto e diminui com o tamanho da fonte.">Line-height</SubHead>

            <SimpleGrid
                cols={{ base: 2, sm: 4 }}
                spacing="xl"
            >
                {LINE_HEIGHTS.map(lh => (
                    <Box key={lh.value}>
                        <Text
                            fz={28}
                            fw={900}
                            c="gray.9"
                            lh={1}
                            style={{ letterSpacing: '-0.04em' }}
                        >
                            {lh.value}
                        </Text>
                        <Text
                            fz={13}
                            fw={700}
                            c="gray.9"
                            mt="xs"
                        >
                            {lh.usage}
                        </Text>
                        <Text
                            fz={11}
                            c="gray.4"
                            fw={700}
                        >
                            {lh.count}× no kit
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- Do / Don't --- */}
            <SubHead>Certo e errado</SubHead>

            <DoDont>
                <DoDontCard
                    good
                    title="salto de 4×"
                    why="O contraste violento entre label e título é o que produz hierarquia sem precisar de cor."
                >
                    <Text
                        size="xs"
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.4"
                        mb="xs"
                    >
                        Infraestrutura
                    </Text>
                    <Text
                        fz={36}
                        fw={900}
                        lh={1.1}
                        c="gray.9"
                        style={{ letterSpacing: '-0.04em' }}
                    >
                        Login em minutos.
                    </Text>
                </DoDontCard>

                <DoDontCard
                    title="salto de 1,3×"
                    why="Sem salto de escala, os dois pesos brigam e nenhum dos dois lidera. A hierarquia some."
                >
                    <Text
                        fz={16}
                        fw={700}
                        c="gray.7"
                        mb="xs"
                    >
                        Infraestrutura
                    </Text>
                    <Text
                        fz={21}
                        fw={800}
                        lh={1.3}
                        c="gray.8"
                    >
                        Login em minutos.
                    </Text>
                </DoDontCard>
            </DoDont>

            <Box mt="xl">
                <DoDont>
                    <DoDontCard
                        good
                        title="corpo em gray.6"
                        why="O preto absoluto é reservado a títulos e números. Corpo em gray.6 deixa o título liderar."
                    >
                        <Text
                            fz={20}
                            fw={900}
                            c="gray.9"
                            mb="xs"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            Fatura em real
                        </Text>
                        <Text
                            c="gray.6"
                            lh={1.7}
                            fz={14}
                        >
                            Suporte no seu fuso, nota fiscal brasileira e cobrança sem conversão de moeda.
                        </Text>
                    </DoDontCard>

                    <DoDontCard
                        title="corpo em gray.9"
                        why="Título e corpo com a mesma tinta achatam a hierarquia — a página vira um bloco só."
                    >
                        <Text
                            fz={20}
                            fw={900}
                            c="gray.9"
                            mb="xs"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            Fatura em real
                        </Text>
                        <Text
                            c="gray.9"
                            lh={1.7}
                            fz={14}
                        >
                            Suporte no seu fuso, nota fiscal brasileira e cobrança sem conversão de moeda.
                        </Text>
                    </DoDontCard>
                </DoDont>
            </Box>
        </DocSection>
    )
}

/* ==========================================================================
   3 · Cor
   ========================================================================== */

function Cor() {
    return (
        <DocSection
            id="cor"
            label="Token"
            title="Cor"
            description="Uma rampa de dez cinzas. Zero cor de marca. Cada degrau tem papel semântico fixo — a rampa não é uma paleta de onde se escolhe, é um mapa de funções."
        >
            <SubHead
                mt={0}
                note="Os degraus 0–3 são superfície e estrutura. Os degraus 4–9 são tinta. Nenhum degrau atravessa a fronteira. Clique para copiar o hex."
            >
                A rampa
            </SubHead>

            <SimpleGrid
                cols={{ base: 2, sm: 3, lg: 5 }}
                spacing="xl"
                verticalSpacing={40}
            >
                {GRAY_RAMP.map(c => (
                    <Swatch
                        key={c.token}
                        {...c}
                    />
                ))}
            </SimpleGrid>

            <SubHead note="Duas cores dominam: gray.9 para o que grita, gray.6 para o que fala. Todo o resto é ajuste fino.">
                Distribuição real
            </SubHead>

            <Stack gap="md">
                {GRAY_RAMP.filter(c => c.count)
                    .sort((a, b) => b.count - a.count)
                    .map(c => (
                        <Group
                            key={c.token}
                            gap="md"
                            wrap="nowrap"
                        >
                            <Text
                                fz={13}
                                fw={800}
                                c="gray.9"
                                w={64}
                                style={{ flexShrink: 0 }}
                            >
                                {c.token}
                            </Text>
                            <Box
                                h={20}
                                w={`${(c.count / 50) * 100}%`}
                                bg={c.hex}
                                style={{
                                    border: c.step <= 2 ? '1px solid var(--mantine-color-gray-2)' : 'none',
                                    minWidth: 8,
                                }}
                            />
                            <Text
                                fz={12}
                                c="gray.5"
                                style={{ flexShrink: 0 }}
                            >
                                {c.count}×
                            </Text>
                        </Group>
                    ))}
            </Stack>

            <SubHead note="Confundir os três é o erro mais comum do sistema.">Os três pretos</SubHead>

            <SimpleGrid
                cols={{ base: 1, md: 3 }}
                spacing="xl"
            >
                {[
                    {
                        token: 'gray.9',
                        hex: '#11181C',
                        title: 'Títulos, métricas, botão',
                        why: 'Não é #000: o preto puro em tela grande vibra e cansa. Tem um toque de azul-esverdeado que assenta.',
                    },
                    {
                        token: 'gray.7',
                        hex: '#374151',
                        title: 'Corpo com presença',
                        why: 'Quando o parágrafo é curto e central, como na descrição do CTABanner.',
                    },
                    {
                        token: 'gray.6',
                        hex: '#4B5563',
                        title: 'Corpo padrão',
                        why: 'Se você está em dúvida sobre a cor de um parágrafo, é esta.',
                    },
                ].map(p => (
                    <Paper
                        key={p.token}
                        radius="0"
                        bd="1px solid var(--mantine-color-gray-2)"
                        bg="white"
                    >
                        <Box
                            h={72}
                            bg={p.hex}
                        />
                        <Stack
                            gap={4}
                            p="lg"
                        >
                            <Text c="gray.9"
                                fw={800}
                                fz={14}
                            >
                                {p.token}
                            </Text>
                            <Text
                                fz={12}
                                ff="monospace"
                                c="gray.5"
                            >
                                {p.hex}
                            </Text>
                            <Text
                                fz={13}
                                fw={700}
                                c="gray.7"
                                mt="xs"
                            >
                                {p.title}
                            </Text>
                            <Text
                                fz={13}
                                c="gray.6"
                                lh={1.5}
                            >
                                {p.why}
                            </Text>
                        </Stack>
                    </Paper>
                ))}
            </SimpleGrid>

            <SubHead note="Só existem dois fundos de seção. É o ritmo inteiro da página.">Os dois fundos</SubHead>

            {/* The samples use the stage tokens themselves (gray.0, gray.1), so
                in dark mode they show the real stage tones, not `white`. */}
            <Box style={{ border: '1px solid var(--mantine-color-gray-2)' }}>
                {[
                    { bg: 'gray.0', label: 'SECTION_BACKGROUNDS.white · gray.0 · #FFFFFF / #0B0F12', n: '01' },
                    { bg: 'gray.1', label: 'SECTION_BACKGROUNDS.gray · gray.1 · #F9FAFB / #12181D', n: '02' },
                    { bg: 'gray.0', label: 'SECTION_BACKGROUNDS.white · gray.0 · #FFFFFF / #0B0F12', n: '03' },
                ].map((s, i) => (
                    <Box
                        key={s.n}
                        bg={s.bg}
                        py={40}
                        px="lg"
                        style={{ borderTop: i > 0 ? '1px solid var(--mantine-color-gray-2)' : 'none' }}
                    >
                        <Group
                            justify="space-between"
                            wrap="nowrap"
                        >
                            <Text
                                fz={13}
                                fw={800}
                                tt="uppercase"
                                lts="1.5px"
                                c="gray.4"
                            >
                                Palco {s.n}
                            </Text>
                            <Text
                                fz={12}
                                ff="monospace"
                                c="gray.5"
                            >
                                {s.label}
                            </Text>
                        </Group>
                    </Box>
                ))}
            </Box>

            <Callout title="Por que o contraste é quase imperceptível">
                Apenas ~2% de luminância separa os dois fundos, deliberadamente. Ele não <em>separa</em> as seções —
                apenas dá textura ao scroll. A separação real vem do <Mono>py</Mono> de 80–120px. Um card branco sobre
                fundo branco não é card: é conteúdo com borda.
            </Callout>

            <Callout title="Regra · palco não é cartão">
                Uma página tem exatamente dois tons de palco, no claro e no escuro: <Mono>SECTION_BACKGROUNDS.white</Mono>{' '}
                (<Mono>gray.0</Mono>, #FFFFFF / #0B0F12, o mesmo do body) e <Mono>SECTION_BACKGROUNDS.gray</Mono>{' '}
                (<Mono>gray.1</Mono>, #F9FAFB / #12181D). Palco é tudo que ocupa a largura: faixa, seção, body, a barra do
                cabeçalho e o painel do menu, o rodapé e as páginas de documento. O <Mono>white</Mono> do Mantine não é
                palco: no escuro ele vale #1A2127, a superfície elevada, e só serve para cartão, modal, gaveta, menu
                suspenso e formulário em caixa sobre uma faixa. No claro os dois brancos coincidem, e o erro só aparece no
                escuro: em 21/10/2026 o cabeçalho e a faixa da newsletter usavam <Mono>white</Mono>, e a home escura
                mostrou três tons.
            </Callout>

            <SubHead>Papéis semânticos</SubHead>

            <Box style={{ overflowX: 'auto' }}>
                <Table
                    withRowBorders
                    verticalSpacing="sm"
                    miw={520}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <ThLabel>Papel</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Token</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Uso</ThLabel>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {SEMANTIC_COLORS.map(c => (
                            <Table.Tr key={c.name}>
                                <Table.Td>
                                    <Group
                                        gap="xs"
                                        wrap="nowrap"
                                    >
                                        <Box
                                            w={16}
                                            h={16}
                                            bg={c.hex}
                                            style={{
                                                border: '1px solid var(--mantine-color-gray-2)',
                                                flexShrink: 0,
                                            }}
                                        />
                                        <Text c="gray.9"
                                            fz={13}
                                            fw={700}
                                        >
                                            {c.name}
                                        </Text>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={13}
                                        ff="monospace"
                                        c="gray.6"
                                    >
                                        {c.token}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={13}
                                        c="gray.6"
                                    >
                                        {c.usage}
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Box>

            <Callout title="A única exceção cromática">
                <Mono>{LOSS_COLOR.token}</Mono> ({LOSS_COLOR.hex}) aparece uma única vez no kit inteiro, em{' '}
                <Mono>Comparison.jsx</Mono>: a nota sob o custo total da coluna "modo tradicional". É semântica de{' '}
                <strong>perda</strong>, não de erro — o vermelho ali diz "este é o número que dói", que nenhum grau de
                cinza consegue dizer.
            </Callout>

            <SubHead note="Sobre fundo branco. gray.4 falha AA em corpo e por isso é restrito a label.">
                Contraste
            </SubHead>

            <Box style={{ overflowX: 'auto' }}>
                <Table
                    withRowBorders
                    verticalSpacing="sm"
                    miw={480}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <ThLabel>Cor</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Ratio</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Status</ThLabel>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {CONTRAST_TABLE.map(c => (
                            <Table.Tr key={c.token}>
                                <Table.Td>
                                    <Text
                                        fz={14}
                                        fw={700}
                                        c={c.token}
                                    >
                                        {c.token}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={13}
                                        ff="monospace"
                                    >
                                        {c.ratio}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Group
                                        gap={6}
                                        wrap="nowrap"
                                    >
                                        {c.pass ? (
                                            <IconCheck
                                                size={14}
                                                stroke={2}
                                                color="var(--mantine-color-gray-9)"
                                            />
                                        ) : (
                                            <IconX
                                                size={14}
                                                stroke={2}
                                                color="var(--mantine-color-red-6)"
                                            />
                                        )}
                                        <Text
                                            fz={13}
                                            c={c.pass ? 'gray.6' : 'red.6'}
                                            fw={c.pass ? 400 : 700}
                                        >
                                            {c.status}
                                        </Text>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Box>

            <Callout title="Quando gray.4 é legítimo">
                Só em <strong>label uppercase, peso 800</strong> — onde o peso compensa parcialmente e o texto é curto e
                não-essencial (é rótulo de categoria, redundante com o título logo abaixo). Nunca em parágrafo.
            </Callout>

            <SubHead note="Os papéis não mudam; muda o valor. A base recua e o que sobe clareia — página, cartão, menu. O padrão é Automático, e um botão no cabeçalho do site e no pé da coluna do painel alterna Automático, Claro e Escuro.">
                Modo escuro
            </SubHead>
            <Box style={{ overflowX: 'auto', border: '1px solid var(--mantine-color-gray-2)' }}>
                <Table
                    verticalSpacing="sm"
                    horizontalSpacing="md"
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <ThLabel>Papel</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Claro</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Escuro</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Uso</ThLabel>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {DARK_RAMP.map(r => (
                            <Table.Tr key={r.token}>
                                <Table.Td>
                                    <Mono>{r.token}</Mono>
                                </Table.Td>
                                {[r.light, r.dark].map(hex => (
                                    <Table.Td key={hex}>
                                        <Group
                                            gap={8}
                                            wrap="nowrap"
                                        >
                                            {/* A amostra mostra o valor literal de propósito:
                                                ela é o dado documentado, não a cor da página. */}
                                            <Box
                                                w={14}
                                                h={14}
                                                data-keep-colors
                                                style={{ background: hex, border: '1px solid #9CA3AF', flex: 'none' }}
                                            />
                                            <Mono>{hex}</Mono>
                                        </Group>
                                    </Table.Td>
                                ))}
                                <Table.Td>
                                    <Text fz={13}>{r.usage}</Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Box>
        </DocSection>
    )
}

/* ==========================================================================
   4 · Espaço
   ========================================================================== */

function Espaco() {
    return (
        <DocSection
            id="espaco"
            label="Token"
            title="Espaço"
            description="O principal instrumento de agrupamento. Como não há moldura nem sombra, é a distância que diz o que pertence a quê."
        >
            <SubHead
                mt={0}
                note="xs e xl dominam com 18 usos cada. É a assinatura do sistema: ou os elementos estão colados (é um só objeto), ou muito separados (são objetos distintos). O meio-termo é raro por design — ambiguidade de agrupamento é ruído."
            >
                A escala
            </SubHead>

            <Box>
                {SPACE_SCALE.map(s => (
                    <SpecRow
                        key={s.token}
                        count={s.count}
                        name={`${s.token} · ${s.px}px`}
                        value={`gap="${s.token}"`}
                        usage={s.usage}
                        preview={
                            <Group
                                gap={0}
                                wrap="nowrap"
                                align="center"
                            >
                                <Box
                                    w={4}
                                    h={40}
                                    bg="gray.9"
                                    style={{ flexShrink: 0 }}
                                />
                                <Box
                                    w={s.px}
                                    h={40}
                                    bg="gray.1"
                                    style={{ flexShrink: 0 }}
                                />
                                <Box
                                    w={4}
                                    h={40}
                                    bg="gray.9"
                                    style={{ flexShrink: 0 }}
                                />
                            </Group>
                        }
                    />
                ))}
            </Box>

            <SubHead note="O respiro entre palcos, sempre responsivo. A proporção mobile→desktop é ~1,5×: em telas pequenas o espaço vertical é caro, em desktop o vazio é o que cria a calma.">
                Ritmo vertical
            </SubHead>

            <SimpleGrid
                cols={{ base: 1, md: 3 }}
                spacing="xl"
            >
                {STAGE_RHYTHM.map(r => (
                    <Paper
                        key={r.name}
                        radius="0"
                        bd="1px solid var(--mantine-color-gray-2)"
                        bg="white"
                        p="lg"
                    >
                        <Text c="gray.9"
                            fw={800}
                            fz={14}
                            mb="xs"
                        >
                            {r.name}
                        </Text>
                        <Text
                            fz={12}
                            ff="monospace"
                            c="gray.6"
                            mb="xs"
                            style={{ wordBreak: 'break-word' }}
                        >
                            {r.value}
                        </Text>
                        <Text
                            fz={13}
                            c="gray.6"
                        >
                            {r.usage}
                        </Text>
                    </Paper>
                ))}
            </SimpleGrid>

            <SubHead note="Três camadas de espaço, cada uma com um trabalho distinto.">O Palco</SubHead>

            <Box style={{ border: '1px solid var(--mantine-color-gray-2)' }}>
                <Box
                    bg="gray.1"
                    py={40}
                    ta="center"
                >
                    <Text
                        fz={11}
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.4"
                    >
                        py 80–120 · separa palcos
                    </Text>
                </Box>
                <Box
                    bg="gray.0"
                    p="xl"
                    style={{
                        borderTop: '1px dashed var(--mantine-color-gray-3)',
                        borderBottom: '1px dashed var(--mantine-color-gray-3)',
                    }}
                >
                    <Text
                        fz={11}
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.4"
                        mb={10}
                    >
                        Container lg · 1180px
                    </Text>
                    <Title
                        order={4}
                        fz={28}
                        mb={32}
                    >
                        gap xs cola o par
                    </Title>
                    <Box
                        bg="white"
                        p="lg"
                        style={{ border: '1px solid var(--mantine-color-gray-2)' }}
                    >
                        <Text
                            fz={13}
                            c="gray.6"
                        >
                            gap xl (32px) separa o anúncio da performance
                        </Text>
                    </Box>
                </Box>
                <Box
                    bg="gray.1"
                    py={40}
                    ta="center"
                >
                    <Text
                        fz={11}
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.4"
                    >
                        py 80–120
                    </Text>
                </Box>
            </Box>

            <Box mt="md">
                <CodeBlock
                    label="JSX — a primitiva Section"
                    code={`<Box component="section" id={id} bg={bg} py={{ base: 80, md: 120 }}>
    <Container size="lg">
        <Stack gap="xl">
            <SectionHeader badge subtitle title maw={800} />
            <Box>{children}</Box>
        </Stack>
    </Container>
</Box>`}
                />
            </Box>

            <SubHead note="O código oscila entre md, lg e xl sem regra declarada. Esta é a regra proposta, derivada do uso majoritário.">
                Larguras de container
            </SubHead>

            <Box>
                {CONTAINERS.map(c => (
                    <SpecRow
                        key={c.size}
                        name={`size="${c.size}"`}
                        value={`${c.width}px`}
                        usage={c.usage}
                        preview={
                            <Box
                                h={32}
                                bg="gray.1"
                                w={`${(c.width / 1320) * 100}%`}
                                style={{ border: '1px solid var(--mantine-color-gray-2)' }}
                            />
                        }
                    />
                ))}
            </Box>

            <Callout tone="warn" title="Divergência">
                O <Mono>zen_manifesto.md</Mono> prescreve "containers XL". O código convergiu para <Mono>lg</Mono> e
                ficou melhor — 1180px mantém a linha de leitura confortável. Este documento segue o código.
            </Callout>

            <SubHead note="maw não é decorativo: define quantos caracteres cabem por linha, e isso decide se o texto é legível.">
                Larguras de leitura
            </SubHead>

            <Box>
                {MEASURES.map(m => (
                    <SpecRow
                        key={m.maw}
                        name={`maw={${m.maw}}`}
                        usage={m.usage}
                        preview={
                            <Box
                                h={8}
                                bg="gray.2"
                                w={`${(m.maw / 900) * 100}%`}
                            />
                        }
                    />
                ))}
            </Box>

            <Callout title="Regra">
                Título até 900. Corpo nunca acima de 780 — a faixa ideal de 60–75 caracteres fica em torno de 620. Nota
                sempre estreita.
            </Callout>

            <SubHead note="Quase todo responsivo do kit é { base, md }. sm e lg só entram quando a grade tem passo intermediário.">
                Breakpoints
            </SubHead>

            <Box style={{ overflowX: 'auto' }}>
                <Table
                    withRowBorders
                    verticalSpacing="sm"
                    miw={480}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <ThLabel>Token</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>em</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>px</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Papel</ThLabel>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {BREAKPOINTS.map(b => (
                            <Table.Tr key={b.token}>
                                <Table.Td>
                                    <Text c="gray.9"
                                        fz={13}
                                        fw={800}
                                    >
                                        {b.token}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={13}
                                        ff="monospace"
                                        c="gray.6"
                                    >
                                        {b.em}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={13}
                                        ff="monospace"
                                        c="gray.6"
                                    >
                                        {b.px}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={13}
                                        c="gray.6"
                                    >
                                        {b.usage}
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Box>

            <SubHead>Certo e errado</SubHead>

            <DoDont>
                <DoDontCard
                    good
                    title="xs cola, xl separa"
                    why="O agrupamento é inequívoco: label e título são um objeto, o conteúdo é outro."
                >
                    <Text
                        fz={11}
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.4"
                        mb={10}
                    >
                        Confiança
                    </Text>
                    <Text
                        fz={24}
                        fw={900}
                        c="gray.9"
                        mb={32}
                        style={{ letterSpacing: '-0.03em' }}
                    >
                        Onde os dados moram
                    </Text>
                    <Text
                        fz={13}
                        c="gray.6"
                        lh={1.7}
                    >
                        Servidores em São Paulo, backup diário.
                    </Text>
                </DoDontCard>

                <DoDontCard
                    title="tudo com o mesmo gap"
                    why="Com espaço uniforme, não dá para saber se o label pertence ao título ou ao parágrafo."
                >
                    <Text
                        fz={11}
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.4"
                        mb={20}
                    >
                        Confiança
                    </Text>
                    <Text
                        fz={24}
                        fw={900}
                        c="gray.9"
                        mb={20}
                        style={{ letterSpacing: '-0.03em' }}
                    >
                        Onde os dados moram
                    </Text>
                    <Text
                        fz={13}
                        c="gray.6"
                        lh={1.7}
                    >
                        Servidores em São Paulo, backup diário.
                    </Text>
                </DoDontCard>
            </DoDont>
        </DocSection>
    )
}

/* ==========================================================================
   5 · Forma
   ========================================================================== */

function Forma() {
    return (
        <DocSection
            id="forma"
            label="Token"
            title="Forma"
            description="Raio zero, sem sombra, borda de 1px. O capítulo mais curto porque é o mais absoluto."
        >
            <Paper
                radius="0"
                bd="1px solid var(--mantine-color-gray-2)"
                bg="white"
                p={{ base: 'xl', md: 40 }}
            >
                <Group
                    justify="space-between"
                    align="center"
                    wrap="wrap"
                    gap="xl"
                >
                    <Box>
                        <Text
                            component="div"
                            fz={{ base: 72, md: 96 }}
                            fw={900}
                            lh={1}
                            c="gray.9"
                            style={{ letterSpacing: '-0.04em' }}
                        >
                            0
                        </Text>
                        <Text
                            fz={13}
                            fw={800}
                            tt="uppercase"
                            lts="1.5px"
                            c="gray.4"
                            mt="md"
                        >
                            Border radius
                        </Text>
                    </Box>
                    <Text
                        c="gray.6"
                        lh={1.7}
                        maw={420}
                        fz={14}
                    >
                        <strong>{RADIUS.occurrences} ocorrências</strong> de <Mono>radius="0"</Mono> no kit,{' '}
                        <strong>{RADIUS.exceptions} de qualquer outro valor</strong>. Não é preferência forte — é
                        invariante. A única forma curva do sistema é o ponto do <Mono>Badge variant="dot"</Mono>, e ele
                        é conteúdo, não moldura.
                    </Text>
                </Group>
            </Paper>

            <Callout title="Por que zero">
                Canto arredondado é cromo puro — não comunica nada, apenas suaviza. Suavizar é o oposto do que a
                hierarquia massiva precisa. O canto reto também alinha bordas adjacentes ao pixel, o que faz filetes e
                grades encaixarem sem correção óptica.
            </Callout>

            <SubHead note="Não há elevação por sombra em lugar nenhum. A profundidade vem de contraste de superfície, filete, ou camada real via z-index.">
                Paper vs Card
            </SubHead>

            <DoDont>
                <DoDontCard
                    good
                    title="Paper — superfície declarada"
                    why="Tem borda e fundo. Use quando o bloco precisa se destacar do palco."
                >
                    <Paper
                        radius="0"
                        bg="white"
                        bd="1px solid var(--mantine-color-gray-2)"
                        p="lg"
                    >
                        <Text
                            fz={13}
                            c="gray.6"
                        >
                            withBorder · bg white · shadow none
                        </Text>
                    </Paper>
                </DoDontCard>

                <DoDontCard
                    good
                    title="Card — agrupamento invisível"
                    why="Só padding. Use quando o espaço já basta para agrupar. Na dúvida, este."
                >
                    <Box p="lg">
                        <Text
                            fz={13}
                            c="gray.6"
                        >
                            withBorder false · bg transparent
                        </Text>
                    </Box>
                </DoDontCard>
            </DoDont>

            <SubHead note="Uma única receita, com duas variações justificadas.">A borda</SubHead>

            <Box>
                {BORDERS.map(b => (
                    <SpecRow
                        key={b.name}
                        name={b.name}
                        value={b.value}
                        usage={b.usage}
                        preview={
                            <Box
                                h={b.width * 4}
                                bg={b.color}
                                w="100%"
                                maw={200}
                                style={{ minHeight: b.width }}
                            />
                        }
                    />
                ))}
            </Box>

            <SubHead note="O input é uma caixa de borda inteira — o campo se declara antes de ser tocado.">Inputs</SubHead>

            <Paper
                radius="0"
                bd="1px solid var(--mantine-color-gray-2)"
                bg="white"
                p={{ base: 'xl', md: 40 }}
            >
                <Text
                    fz={11}
                    fw={800}
                    tt="uppercase"
                    lts="1.5px"
                    c="gray.4"
                    mb="xs"
                >
                    Seu e-mail
                </Text>
                <Box
                    component="input"
                    type="email"
                    placeholder="voce@empresa.com.br"
                    w="100%"
                    fz={20}
                    px={16}
                    py={12}
                    style={{
                        border: '1px solid var(--mantine-color-gray-2)',
                        borderRadius: 0,
                        background: 'white',
                        fontFamily: 'inherit',
                        outline: 'none',
                    }}
                />
            </Paper>

            <Box mt="md">
                <CodeBlock
                    label="theme.js"
                    code={`TextInput: {
    defaultProps: { size: 'lg', radius: '0' },
    styles: { input: {
        border: '1px solid var(--mantine-color-gray-2)',
        paddingLeft: 16,
        paddingRight: 16,
    }},
}`}
                />
            </Box>

            <Callout title="Por que size lg">
                A caixa de 1px declara a área clicável antes do toque — e o alvo continua generoso.{' '}
                <Mono>paddingLeft: 16</Mono> afasta o texto digitado da borda, para que a letra nunca encoste no
                filete.
            </Callout>

            <SubHead note="Um botão é um label num retângulo preto. Sem canto, sem sombra, sem cor.">Botões</SubHead>

            <Group gap="md">
                {[
                    { label: 'Primário', bg: 'var(--mantine-color-gray-9)', c: '#fff', bd: 'none' },
                    {
                        label: 'Secundário',
                        bg: 'transparent',
                        c: 'var(--mantine-color-gray-9)',
                        bd: '1px solid var(--mantine-color-gray-2)',
                    },
                    { label: 'Terciário', bg: 'transparent', c: 'var(--mantine-color-gray-9)', bd: 'none' },
                ].map(b => (
                    <Box
                        key={b.label}
                        component="button"
                        px={32}
                        py={14}
                        fz={14}
                        fw={800}
                        tt="uppercase"
                        style={{
                            letterSpacing: '1px',
                            background: b.bg,
                            color: b.c,
                            border: b.bd,
                            borderRadius: 0,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: MOTION.transition,
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = MOTION.transform
                            e.currentTarget.style.filter = MOTION.filter
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'none'
                            e.currentTarget.style.filter = 'none'
                        }}
                    >
                        {b.label}
                    </Box>
                ))}
            </Group>

            <Callout title="A única animação do sistema">
                <Mono>{MOTION.transform}</Mono> e <Mono>{MOTION.filter}</Mono>. 1px de subida e 10% de brilho. Sem
                escala, sem troca de cor, sem sombra crescendo. Perceptível, não performático. Passe o mouse nos botões
                acima.
            </Callout>
        </DocSection>
    )
}

/* ==========================================================================
   6 · Composição
   ========================================================================== */

function Composicao() {
    return (
        <DocSection
            id="composicao"
            label="Arquitetura"
            title="Composição"
            description="Como os tokens viram uma seção, e como as seções viram uma página."
        >
            <SubHead
                mt={0}
                note="Cada camada só conhece a de baixo. Uma seção nunca lê um hex; ela usa c=&quot;gray.6&quot;. Uma página nunca declara py; ela instancia uma seção."
            >
                As quatro camadas
            </SubHead>

            <Box style={{ border: '1px solid var(--mantine-color-gray-2)' }}>
                {LAYERS.map((l, i) => (
                    <Box
                        key={l.name}
                        p="lg"
                        bg={i % 2 === 0 ? 'white' : 'gray.0'}
                        style={{ borderTop: i > 0 ? '1px solid var(--mantine-color-gray-2)' : 'none' }}
                    >
                        <Grid gutter="md">
                            <Grid.Col span={{ base: 12, sm: 3 }}>
                                <Text
                                    fw={800}
                                    fz={14}
                                    c="gray.9"
                                >
                                    {l.name}
                                </Text>
                                <Text
                                    fz={12}
                                    c="gray.4"
                                >
                                    {l.role}
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 9 }}>
                                <Text
                                    fz={13}
                                    c="gray.6"
                                    ff="monospace"
                                    lh={1.6}
                                >
                                    {l.items}
                                </Text>
                            </Grid.Col>
                        </Grid>
                    </Box>
                ))}
            </Box>

            <Callout title="Regra de promoção">
                Um padrão visual que aparece em 3+ componentes vira primitiva. Um token descoberto direto num componente
                é dívida — ele deveria ter nascido na camada de tokens.
            </Callout>

            <SubHead note="Cinco obrigações: Section como casca, contrato de props padrão, dados em vez de JSX, primitivas antes de reimplementar, key estável.">
                Anatomia de uma seção
            </SubHead>

            <CodeBlock
                label="JSX — template para um componente novo"
                code={`export function NovaSecao({ id, badge, subtitle, title, items = [], cta, note, background = 'white' }) {
    return (
        <Section id={id} badge={badge} subtitle={subtitle} title={title} background={background}>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
                {items.map((item, i) => (
                    <Box key={item.title || i}>
                        <Text fz="lg" fw={800} c="gray.9" mb="xs">{item.title}</Text>
                        <Text c="gray.6" lh={1.7}>{item.description}</Text>
                    </Box>
                ))}
            </SimpleGrid>
            {cta && <CTAButton {...cta} />}
            {note && <Text size="sm" c="gray.6" mt={40}>{note}</Text>}
        </Section>
    )
}`}
            />

            <SubHead note="O mesmo shape em todo o kit — é o que permite mover um CTA de seção sem reescrevê-lo.">
                Contrato universal de props
            </SubHead>

            <Box style={{ overflowX: 'auto' }}>
                <Table
                    withRowBorders
                    verticalSpacing="sm"
                    miw={560}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <ThLabel>Prop</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Tipo</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Papel</ThLabel>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {UNIVERSAL_PROPS.map(p => (
                            <Table.Tr key={p.prop}>
                                <Table.Td>
                                    <Text c="gray.9"
                                        fz={13}
                                        fw={800}
                                        ff="monospace"
                                    >
                                        {p.prop}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={12}
                                        ff="monospace"
                                        c="gray.5"
                                    >
                                        {p.type}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={13}
                                        c="gray.6"
                                    >
                                        {p.role}
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Box>

            <SubHead>Certo e errado</SubHead>

            <DoDont>
                <DoDontCard
                    good
                    title="config-driven"
                    why="O componente controla a forma, o consumidor controla o conteúdo. O sistema sobrevive."
                >
                    <CodeBlock
                        code={`<StatsGrid
    items={[
        { value: '99,9%',
          label: 'Uptime',
          description: 'Medido…' }
    ]}
/>`}
                    />
                </DoDontCard>

                <DoDontCard
                    title="JSX em prop"
                    why="Se o consumidor puder injetar JSX, ele injeta cromo — e o sistema erode em três sprints."
                >
                    <CodeBlock
                        code={`<StatsGrid>
    {stats.map(s => (
        <MeuCard {...s} />
    ))}
</StatsGrid>`}
                    />
                </DoDontCard>
            </DoDont>

            <SubHead note="24 componentes, agrupados pelo trabalho que fazem numa página.">
                Vocabulário de seções
            </SubHead>

            <Box style={{ border: '1px solid var(--mantine-color-gray-2)' }}>
                {SECTION_VOCABULARY.map((g, i) => (
                    <Box
                        key={g.job}
                        p="lg"
                        style={{ borderTop: i > 0 ? '1px solid var(--mantine-color-gray-2)' : 'none' }}
                    >
                        <Grid gutter="md">
                            <Grid.Col span={{ base: 12, sm: 3 }}>
                                <Text
                                    fz={11}
                                    fw={800}
                                    tt="uppercase"
                                    lts="1.5px"
                                    c="gray.4"
                                >
                                    {g.job}
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 9 }}>
                                <Group gap="xs">
                                    {g.components.map(c => (
                                        <Text
                                            key={c}
                                            fz={13}
                                            fw={700}
                                            c="gray.9"
                                            px="xs"
                                            py={4}
                                            bg="gray.0"
                                            style={{ border: '1px solid var(--mantine-color-gray-2)' }}
                                        >
                                            {c}
                                        </Text>
                                    ))}
                                </Group>
                            </Grid.Col>
                        </Grid>
                    </Box>
                ))}
            </Box>

            <SubHead note="Sequência canônica, alternando fundo a cada palco.">Montando uma landing</SubHead>

            <CodeBlock
                label="JSX — a ordem que converte"
                code={`<Layout>
    <Header logo={<Wordmark>Seu nome</Wordmark>} navLinks={…} loginCta={…} />
    <main style={{ flex: 1 }}>
        <Hero         background="white" />  {/* promessa + mídia + nota */}
        <SocialProof                     />  {/* faixa densa, sem palco */}
        <StatsGrid    background="gray"  />  {/* prova numérica + note */}
        <FeatureSplit background="white" />  {/* o quê, com mídia */}
        <Steps        background="gray"  />  {/* como funciona, 01/02/03 */}
        <FeaturesGrid background="white" />  {/* o detalhe */}
        <Comparison   background="gray"  />  {/* contra a alternativa */}
        <Pricing      background="white" />  {/* quanto custa */}
        <Testimonials background="gray"  />  {/* quem já fez */}
        <FAQ          background="white" />  {/* objeções finais */}
        <CTABanner    background="gray"  />  {/* a ação — borda-topo 4px */}
    </main>
    <Footer />
</Layout>`}
            />

            <SimpleGrid
                cols={{ base: 1, md: 3 }}
                spacing="xl"
                mt="xl"
            >
                {[
                    {
                        n: '01',
                        title: 'Fundo alterna sempre',
                        text: 'Dois palcos brancos seguidos apagam o ritmo do scroll.',
                    },
                    {
                        n: '02',
                        title: 'Prova antes de preço',
                        text: 'StatsGrid e Testimonials sustentam o número que Pricing vai pedir.',
                    },
                    {
                        n: '03',
                        title: 'CTABanner fecha',
                        text: 'A borda superior de 4px é o único acento estrutural e marca esse ponto.',
                    },
                ].map(r => (
                    <Box key={r.n}>
                        <Text
                            fz={40}
                            fw={900}
                            c="gray.2"
                            lh={1}
                            style={{ letterSpacing: '-0.04em' }}
                        >
                            {r.n}
                        </Text>
                        <Text c="gray.9"
                            fw={800}
                            fz={15}
                            mt="md"
                            mb="xs"
                        >
                            {r.title}
                        </Text>
                        <Text
                            fz={13}
                            c="gray.6"
                            lh={1.6}
                        >
                            {r.text}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </DocSection>
    )
}

/* ==========================================================================
   7 · Painel
   ========================================================================== */

function Panel() {
    return (
        <DocSection
            id="painel"
            label="Densidade"
            title="Palco e painel"
            description="Este é um design system só. As leis, os tokens e a rampa valem em qualquer tela. O que muda é a densidade — e quem decide é o trabalho que a tela faz, não o rótulo de marketing ou app."
        >
            <SimpleGrid
                cols={{ base: 1, md: 2 }}
                spacing="xl"
            >
                {SURFACES.map(s => (
                    <Paper
                        key={s.name}
                        radius="0"
                        bd="1px solid var(--mantine-color-gray-2)"
                        bg="white"
                    >
                        <Box
                            p="lg"
                            bg="gray.0"
                            style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
                        >
                            <Group
                                gap="xs"
                                align="baseline"
                            >
                                <Text
                                    fz={20}
                                    fw={900}
                                    c="gray.9"
                                    style={{ letterSpacing: '-0.02em' }}
                                >
                                    {s.name}
                                </Text>
                                <Text
                                    fz={11}
                                    fw={800}
                                    tt="uppercase"
                                    lts="1.5px"
                                    c="gray.4"
                                >
                                    {s.job}
                                </Text>
                            </Group>
                        </Box>
                        <Stack
                            gap="xs"
                            p="lg"
                        >
                            <SpecLine
                                label="Onde"
                                value={s.where}
                            />
                            <SpecLine
                                label="Ritmo"
                                value={s.rhythm}
                            />
                            <SpecLine
                                label="Tipografia"
                                value={s.type}
                            />
                            <Text
                                fz={13}
                                c="gray.6"
                                lh={1.6}
                                mt="xs"
                            >
                                {s.density}
                            </Text>
                        </Stack>
                    </Paper>
                ))}
            </SimpleGrid>

            <Callout title="A regra que separa corpo de dado">
                Texto que se lê em sequência é <Mono>corpo</Mono> (15–20px). Texto que se compara em coluna é{' '}
                <Mono>dado</Mono> (12–14px). Um parágrafo em 16px é confortável; uma tabela de 200 linhas em 16px é
                impossível de varrer. Não são dois sistemas — é o mesmo instrumento resolvendo tarefas diferentes.
            </Callout>

            <SubHead note="O palco usa py 80–120 porque separa seções de uma narrativa. O painel não tem seções: tem uma tela só, com barra lateral fixa.">
                Geometria do painel
            </SubHead>

            <CodeBlock
                label="Layout"
                code={`Sidebar    ${PANEL_LAYOUT.sidebar.width}px (colapsada ${PANEL_LAYOUT.sidebar.collapsed}px)
           bg ${PANEL_LAYOUT.sidebar.bg} · borderRight ${PANEL_LAYOUT.sidebar.border}

Conteúdo   px ${PANEL_LAYOUT.content.px} · pt ${PANEL_LAYOUT.content.pt} · pb ${PANEL_LAYOUT.content.pb} · maw ${PANEL_LAYOUT.content.maw}
Cabeçalho  mb ${PANEL_LAYOUT.pageHeaderMb}
Blocos     gap ${PANEL_LAYOUT.blockGap}`}
            />

            <SubHead note="O par canônico em versão de painel. O título é 36px fixo — o painel tem largura controlada e não precisa escalar com a viewport.">
                Cabeçalho de página
            </SubHead>

            <Paper
                radius="0"
                bd="1px solid var(--mantine-color-gray-2)"
                bg="white"
                p={{ base: 'xl', md: 40 }}
                mb="md"
            >
                <Group
                    justify="space-between"
                    align="flex-start"
                    wrap="nowrap"
                    gap={24}
                >
                    <Stack
                        gap={8}
                        flex={1}
                        miw={0}
                    >
                        <Text
                            fz={10}
                            fw={800}
                            c="gray.4"
                            tt="uppercase"
                            lts="1.5px"
                        >
                            + Acme · Produção · Usuários
                        </Text>
                        <Title
                            order={3}
                            fz={36}
                            fw={900}
                            lh={1}
                            style={{ letterSpacing: '-0.04em' }}
                        >
                            Membros
                        </Title>
                        <Text
                            fz={15}
                            fw={500}
                            c="gray.6"
                            lh={1.5}
                        >
                            Quem tem acesso a esta aplicação.
                        </Text>
                    </Stack>
                    <Box
                        px="md"
                        py={8}
                        bg="gray.9"
                        c="white"
                        fz={12}
                        fw={800}
                        tt="uppercase"
                        style={{ letterSpacing: '1px', flexShrink: 0 }}
                    >
                        + Convidar
                    </Box>
                </Group>
            </Paper>

            <Box style={{ overflowX: 'auto' }}>
                <Table
                    withRowBorders
                    verticalSpacing="sm"
                    miw={520}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <ThLabel>Parte</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Spec</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Papel</ThLabel>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {PAGE_HEADER.map(p => (
                            <Table.Tr key={p.part}>
                                <Table.Td>
                                    <Text c="gray.9"
                                        fz={12}
                                        fw={800}
                                        ff="monospace"
                                    >
                                        {p.part}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={12}
                                        c="gray.6"
                                    >
                                        {p.spec}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        fz={12}
                                        c="gray.6"
                                    >
                                        {p.role}
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Box>

            <SubHead note="O item ativo é marcado por preenchimento e peso — a lei 2 aplicada à navegação, sem cor de destaque.">
                Navegação lateral
            </SubHead>

            <SimpleGrid
                cols={{ base: 1, md: 2 }}
                spacing="xl"
            >
                <Paper
                    radius="0"
                    bd="1px solid var(--mantine-color-gray-2)"
                    bg="white"
                    p="lg"
                >
                    <Stack gap={2}>
                        <Text
                            fz={10}
                            fw={800}
                            c="gray.4"
                            tt="uppercase"
                            lts="1.5px"
                            mb="xs"
                        >
                            Acme · Produção
                        </Text>
                        {[
                            { label: 'Visão geral', active: true },
                            { label: 'Usuários', active: false },
                            { label: 'Organizações', active: false },
                            { label: 'Configurações', active: false },
                        ].map(i => (
                            <Box
                                key={i.label}
                                px={12}
                                py={9}
                                bg={i.active ? 'gray.9' : 'transparent'}
                            >
                                <Text
                                    fz={13}
                                    fw={i.active ? 800 : 500}
                                    c={i.active ? 'white' : 'gray.7'}
                                >
                                    {i.label}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                </Paper>

                <Stack gap={0}>
                    {SIDEBAR_SPEC.map((s, i) => (
                        <Group
                            key={s.part}
                            justify="space-between"
                            wrap="nowrap"
                            gap="md"
                            py={8}
                            style={{ borderTop: i === 0 ? 'none' : '1px solid var(--mantine-color-gray-2)' }}
                        >
                            <Text
                                fz={12}
                                fw={800}
                                c="gray.9"
                                style={{ flexShrink: 0 }}
                            >
                                {s.part}
                            </Text>
                            <Text
                                fz={12}
                                c="gray.6"
                                ta="right"
                            >
                                {s.spec}
                            </Text>
                        </Group>
                    ))}
                </Stack>
            </SimpleGrid>

            <SubHead note="CSS Grid, não <Table>: as colunas precisam de proporções e a linha inteira precisa ser clicável.">
                Tabela
            </SubHead>

            <Box
                mb="md"
                style={{ border: '1px solid var(--mantine-color-gray-2)', overflow: 'hidden' }}
            >
                <Box
                    bg="gray.1"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '2.4fr 1fr 1fr 40px',
                        gap: 12,
                        alignItems: 'center',
                        padding: '12px 24px',
                        borderBottom: '1px solid var(--mantine-color-gray-2)',
                    }}
                >
                    {['Membro', 'Status', 'Criado'].map(h => (
                        <Text
                            key={h}
                            fz={10}
                            fw={800}
                            c="gray.5"
                            tt="uppercase"
                            lts="1.5px"
                        >
                            {h}
                        </Text>
                    ))}
                    <Box />
                </Box>
                {[
                    { name: 'Ana Souza', mail: 'ana@acme.com.br', status: 'Ativo', when: '2h' },
                    { name: 'Bruno Lima', mail: 'bruno@acme.com.br', status: 'Ativo', when: '5d' },
                    { name: 'Carla Dias', mail: 'carla@acme.com.br', status: 'Pendente', when: '12d' },
                ].map((r, i, arr) => (
                    <Box
                        key={r.mail}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '2.4fr 1fr 1fr 40px',
                            gap: 12,
                            alignItems: 'center',
                            padding: '14px 24px',
                            borderBottom: i === arr.length - 1 ? 'none' : '1px solid var(--mantine-color-gray-2)',
                        }}
                    >
                        <Box>
                            <Text
                                fz={13}
                                fw={700}
                                c="gray.9"
                            >
                                {r.name}
                            </Text>
                            <Text
                                fz={12}
                                c="gray.5"
                            >
                                {r.mail}
                            </Text>
                        </Box>
                        <Text
                            fz={13}
                            c="gray.7"
                        >
                            {r.status}
                        </Text>
                        <Text
                            fz={13}
                            c="gray.7"
                        >
                            {r.when}
                        </Text>
                        <Text
                            fz={13}
                            c="gray.4"
                            ta="center"
                        >
                            ⋯
                        </Text>
                    </Box>
                ))}
            </Box>

            <Box>
                {TABLE_SPEC.map(s => (
                    <Group
                        key={s.part}
                        justify="space-between"
                        wrap="nowrap"
                        gap="md"
                        py={8}
                        style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
                    >
                        <Text
                            fz={12}
                            fw={800}
                            c="gray.9"
                            style={{ flexShrink: 0 }}
                        >
                            {s.part}
                        </Text>
                        <Text
                            fz={12}
                            c="gray.6"
                            ta="right"
                            ff="monospace"
                        >
                            {s.spec}
                        </Text>
                    </Group>
                ))}
            </Box>

            <Callout title="O que ainda não existe">
                Não há paginação nem seleção múltipla no padrão atual — as listas renderizam o array inteiro. Ao
                introduzir qualquer um dos dois, documente aqui antes de implementar.
            </Callout>

            <SubHead note="Um padrão, dois alcances: global (⌘K, cruza entidades) e local (filtra a lista da tela).">
                Busca
            </SubHead>

            <Paper
                radius="0"
                bd="1px solid var(--mantine-color-gray-2)"
                bg="white"
                p="lg"
                mb="md"
            >
                <Group
                    justify="space-between"
                    wrap="nowrap"
                    gap="md"
                >
                    <Group
                        gap="xs"
                        wrap="nowrap"
                        style={{ flex: 1 }}
                    >
                        <Text
                            fz={14}
                            c="gray.4"
                        >
                            ⌕
                        </Text>
                        <Text
                            fz={13}
                            c="gray.4"
                        >
                            Buscar membros…
                        </Text>
                    </Group>
                    <Text
                        fz={10}
                        fw={700}
                        ff="monospace"
                        c="gray.5"
                        px={6}
                        py={2}
                        style={{ border: '1px solid var(--mantine-color-gray-2)', flexShrink: 0 }}
                    >
                        ⌘K
                    </Text>
                </Group>
            </Paper>

            <Box mb="md">
                {Object.entries(SEARCH_SPEC).map(([k, v]) => (
                    <Group
                        key={k}
                        justify="space-between"
                        wrap="nowrap"
                        gap="md"
                        py={8}
                        style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
                    >
                        <Text
                            fz={12}
                            fw={800}
                            ff="monospace"
                            c="gray.9"
                            style={{ flexShrink: 0 }}
                        >
                            {k}
                        </Text>
                        <Text
                            fz={12}
                            c="gray.6"
                            ta="right"
                        >
                            {String(v)}
                        </Text>
                    </Group>
                ))}
            </Box>

            <CodeBlock
                label="JSX — o núcleo da busca"
                code={`const [debounced] = useDebouncedValue(query, 250)

useEffect(() => {
    const term = debounced.trim()
    requestRef.current?.abort()               // cancela a busca anterior
    if (term.length < 2) return setResults([])

    const controller = new AbortController()
    requestRef.current = controller
    search(term, { signal: controller.signal })
        .then(r => !controller.signal.aborted && setResults(r.data))
        .catch(() => {})
    return () => controller.abort()
}, [debounced])`}
            />

            <SubHead note="Skeleton domina spinner: ele reproduz a grade real, então o layout não salta quando o dado chega.">
                Estados
            </SubHead>

            <Box style={{ border: '1px solid var(--mantine-color-gray-2)' }}>
                {STATES.map((s, i) => (
                    <Box
                        key={s.state}
                        p="lg"
                        style={{ borderTop: i > 0 ? '1px solid var(--mantine-color-gray-2)' : 'none' }}
                    >
                        <Group
                            justify="space-between"
                            wrap="wrap"
                            gap="xs"
                            mb={6}
                        >
                            <Text
                                fz={13}
                                fw={800}
                                c="gray.9"
                            >
                                {s.state}
                            </Text>
                            <Text
                                fz={11}
                                fw={700}
                                tt="uppercase"
                                lts="1px"
                                c="gray.4"
                            >
                                {s.pattern}
                            </Text>
                        </Group>
                        <Text
                            fz={13}
                            c="gray.6"
                            lh={1.6}
                        >
                            {s.spec}
                        </Text>
                    </Box>
                ))}
            </Box>

            <SubHead note="Confirmação por permanência, não por diálogo. Um 'tem certeza?' é respondido no automático.">
                Ação destrutiva
            </SubHead>

            <Box mb="md">
                {Object.entries(DESTRUCTIVE).map(([k, v]) => (
                    <Group
                        key={k}
                        justify="space-between"
                        wrap="nowrap"
                        gap="md"
                        py={8}
                        style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
                    >
                        <Text
                            fz={12}
                            fw={800}
                            ff="monospace"
                            c="gray.9"
                            style={{ flexShrink: 0 }}
                        >
                            {k}
                        </Text>
                        <Text
                            fz={12}
                            c="gray.6"
                            ta="right"
                        >
                            {String(v)}
                        </Text>
                    </Group>
                ))}
            </Box>

            <Callout
                tone="warn"
                title="Exigência aberta"
            >
                O padrão atual responde só a mouse e toque. Sem equivalente por teclado, a exclusão fica inacessível —
                resolva isso antes de replicar o padrão em telas novas.
            </Callout>

            <SubHead note="Modal, nunca drawer. Medido no dashboard: 9 Modal, 0 Drawer.">Formulários</SubHead>

            <Box style={{ border: '1px solid var(--mantine-color-gray-2)' }}>
                {FORM_SPEC.map((f, i) => (
                    <Group
                        key={f.rule}
                        wrap="nowrap"
                        gap="md"
                        p="md"
                        align="flex-start"
                        style={{ borderTop: i > 0 ? '1px solid var(--mantine-color-gray-2)' : 'none' }}
                    >
                        <Text
                            fz={12}
                            fw={800}
                            c="gray.9"
                            w={90}
                            style={{ flexShrink: 0 }}
                        >
                            {f.rule}
                        </Text>
                        <Text
                            fz={13}
                            c="gray.6"
                            lh={1.6}
                        >
                            {f.detail}
                        </Text>
                    </Group>
                ))}
            </Box>
        </DocSection>
    )
}

/* ==========================================================================
   8 · API dos componentes
   ========================================================================== */

function ApiReference() {
    return (
        <DocSection
            id="api"
            label="Referência"
            title="API dos componentes"
            description="O shape exato de props de cada primitiva e componente, com um exemplo que compila. É o que permite escrever uma página inteira sem abrir o repositório."
        >
            <SubHead mt={0}>Instalação</SubHead>

            <CodeBlock label="Terminal" code={SETUP.install} />

            <Box mt="md">
                <CodeBlock label="Entry point" code={SETUP.entry} />
            </Box>

            <Callout title="Não redefina o theme">{SETUP.note}</Callout>

            <SubHead note="Blocos atômicos. Um padrão que aparece em 3+ componentes deve virar uma destas.">
                Primitivas
            </SubHead>

            {PRIMITIVES.map(p => (
                <ApiCard key={p.name} entry={p} />
            ))}

            <SubHead note="Componentes de nível de página. Cada um é uma seção completa.">
                Componentes de seção
            </SubHead>

            {COMPONENTS.map(c => (
                <ApiCard key={c.name} entry={c} showGroup />
            ))}

            <SubHead note="Componentes renomeados mantêm alias. Remover um alias é breaking change.">
                Aliases legados
            </SubHead>

            <Box style={{ border: '1px solid var(--mantine-color-gray-2)' }}>
                {ALIASES.map(([alias, target], i) => (
                    <Group
                        key={alias}
                        justify="space-between"
                        p="md"
                        style={{ borderTop: i > 0 ? '1px solid var(--mantine-color-gray-2)' : 'none' }}
                    >
                        <Text fz={13} ff="monospace" c="gray.5">
                            {alias}
                        </Text>
                        <Text fz={13} ff="monospace" fw={700} c="gray.9">
                            → {target}
                        </Text>
                    </Group>
                ))}
            </Box>
        </DocSection>
    )
}

/** ApiCard — uma entrada da referência: o que faz, as props, um exemplo. */
function ApiCard({ entry, showGroup }) {
    return (
        <Paper
            radius="0"
            bd="1px solid var(--mantine-color-gray-2)"
            bg="white"
            mb="xl"
        >
            <Box p="lg" bg="gray.0" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Group gap="xs" align="baseline" wrap="wrap">
                    <Text fz={18} fw={900} c="gray.9" style={{ letterSpacing: '-0.02em' }}>
                        {entry.name}
                    </Text>
                    {showGroup && entry.group && (
                        <Text fz={11} fw={800} tt="uppercase" lts="1.5px" c="gray.4">
                            {entry.group}
                        </Text>
                    )}
                </Group>
                <Text fz={13} c="gray.6" lh={1.6} mt={6}>
                    {entry.job}
                </Text>
            </Box>

            <Box p="lg" style={{ overflowX: 'auto' }}>
                <Table withRowBorders verticalSpacing={6} miw={480}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <ThLabel>Prop</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Tipo</ThLabel>
                            </Table.Th>
                            <Table.Th>
                                <ThLabel>Nota</ThLabel>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {entry.props.map(([name, type, note]) => (
                            <Table.Tr key={name}>
                                <Table.Td>
                                    <Text fz={12} fw={800} ff="monospace" c="gray.9">
                                        {name}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text fz={12} ff="monospace" c="gray.5">
                                        {type}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text fz={12} c="gray.6" lh={1.5}>
                                        {note}
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

                {entry.nested && (
                    <Box mt="xl">
                        <Text fz={11} fw={800} tt="uppercase" lts="1.5px" c="gray.4" mb="md">
                            {entry.nested.title}
                        </Text>
                        <Table withRowBorders verticalSpacing={6} miw={480}>
                            <Table.Tbody>
                                {entry.nested.rows.map(([a, b, d]) => (
                                    <Table.Tr key={a}>
                                        <Table.Td>
                                            <Text fz={12} fw={800} ff="monospace" c="gray.9">
                                                {a}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text fz={12} ff="monospace" c="gray.5">
                                                {b}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text fz={12} c="gray.6" lh={1.5}>
                                                {d}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Box>
                )}
            </Box>

            <Box px="lg" pb="lg">
                <CodeBlock label="Exemplo" code={entry.example} />
            </Box>
        </Paper>
    )
}

/* ==========================================================================
   9 · Receitas
   ========================================================================== */

function Receitas() {
    return (
        <DocSection
            id="receitas"
            label="Copiar e adaptar"
            title="Receitas"
            description="Código que compila. Adapte o conteúdo, não a estrutura — a sequência das seções é parte do sistema."
        >
            {RECIPES.map((r, i) => (
                <Box key={r.name} mt={i === 0 ? 0 : 48}>
                    <SubHead mt={0} note={r.when}>
                        {r.name}
                    </SubHead>
                    <CodeBlock code={r.code} />
                </Box>
            ))}
        </DocSection>
    )
}

/* ==========================================================================
   10 · Erros frequentes
   ========================================================================== */

function Errors() {
    return (
        <DocSection
            id="erros"
            label="Armadilhas"
            title="Erros frequentes"
            description="Cada um destes é um erro real que quebra o build ou erode o sistema. A linha vermelha não compila ou não obedece; a verde é a correção."
        >
            <Stack gap="xl">
                {PITFALLS.map((p, i) => (
                    <Paper
                        key={i}
                        radius="0"
                        bd="1px solid var(--mantine-color-gray-2)"
                        bg="white"
                    >
                        <Box p="lg" bg="gray.0" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                            <Group gap="sm" wrap="nowrap" align="flex-start">
                                <Text fz={13} fw={900} c="gray.2" style={{ flexShrink: 0, lineHeight: 1.5 }}>
                                    {String(i + 1).padStart(2, '0')}
                                </Text>
                                <Text fz={13} c="gray.6" lh={1.6}>
                                    {p.why}
                                </Text>
                            </Group>
                        </Box>
                        <Box p="lg">
                            <Group gap="xs" wrap="nowrap" align="flex-start" mb="sm">
                                <IconX size={14} stroke={2} color="var(--mantine-color-red-6)" style={{ flexShrink: 0, marginTop: 3 }} />
                                <Text fz={12} ff="monospace" c="gray.5" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                                    {p.wrong}
                                </Text>
                            </Group>
                            <Group gap="xs" wrap="nowrap" align="flex-start">
                                <IconCheck size={14} stroke={2} color="var(--mantine-color-gray-9)" style={{ flexShrink: 0, marginTop: 3 }} />
                                <Text fz={12} ff="monospace" c="gray.9" fw={700} style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                                    {p.right}
                                </Text>
                            </Group>
                        </Box>
                    </Paper>
                ))}
            </Stack>
        </DocSection>
    )
}

/* ==========================================================================
   Referência: Apple
   ========================================================================== */

function AppleReference() {
    return (
        <DocSection
            id="apple"
            label="Referência"
            title="O que veio da Apple"
            description="As Human Interface Guidelines lidas regra a regra contra este sistema. Cada uma recebeu um veredito: entrou, já era assim, ou ficou de fora — com o motivo."
        >
            <Stack gap={64}>
                {APPLE_REFERENCE.map(group => (
                    <Box key={group.group}>
                        <SubHead
                            mt={0}
                            note={group.note}
                        >
                            {group.group}
                        </SubHead>
                        <Box style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                            {group.items.map(item => (
                                <SimpleGrid
                                    key={item.topic}
                                    cols={{ base: 1, md: 3 }}
                                    spacing="lg"
                                    py="md"
                                    style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
                                >
                                    <Text
                                        fz={11}
                                        fw={800}
                                        c="gray.5"
                                        tt="uppercase"
                                        lts="1.5px"
                                        lh={1.6}
                                    >
                                        {item.topic}
                                    </Text>
                                    <Text
                                        fz={14}
                                        c="gray.7"
                                        lh={1.6}
                                    >
                                        {item.rule}
                                    </Text>
                                    <Text
                                        fz={14}
                                        c="gray.6"
                                        lh={1.6}
                                    >
                                        {item.here}
                                    </Text>
                                </SimpleGrid>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Stack>
        </DocSection>
    )
}

/* ==========================================================================
   11 · Checklist
   ========================================================================== */

function Checklist() {
    return (
        <DocSection
            id="checklist"
            label="Auditoria"
            title="Antes de dar merge"
            description="Qualquer item marcado como falha é bloqueio, não sugestão."
        >
            <SubHead
                mt={0}
                note="Falhas que reprovam sem discussão, com a lei que cada uma viola."
            >
                Bloqueios automáticos
            </SubHead>

            <Box style={{ border: '1px solid var(--mantine-color-gray-2)' }}>
                {BLOCKERS.map((b, i) => (
                    <Group
                        key={b.symptom}
                        justify="space-between"
                        wrap="nowrap"
                        p="md"
                        gap="md"
                        style={{ borderTop: i > 0 ? '1px solid var(--mantine-color-gray-2)' : 'none' }}
                    >
                        <Group
                            gap="sm"
                            wrap="nowrap"
                        >
                            <IconX
                                size={14}
                                stroke={2}
                                color="var(--mantine-color-red-6)"
                                style={{ flexShrink: 0 }}
                            />
                            <Text
                                fz={14}
                                c="gray.9"
                                fw={700}
                            >
                                {b.symptom}
                            </Text>
                        </Group>
                        <Text
                            fz={11}
                            fw={800}
                            tt="uppercase"
                            lts="1px"
                            c="gray.4"
                            style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                        >
                            Lei {b.law}
                        </Text>
                    </Group>
                ))}
            </Box>

            <SubHead>A lista completa</SubHead>

            <SimpleGrid
                cols={{ base: 1, md: 2 }}
                spacing="xl"
                verticalSpacing={40}
            >
                {CHECKLIST.map(group => (
                    <Box key={group.group}>
                        <Text
                            fz={11}
                            fw={800}
                            tt="uppercase"
                            lts="1.5px"
                            c="gray.4"
                            mb="md"
                            pb="xs"
                            style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
                        >
                            {group.group}
                        </Text>
                        <List
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon
                                    color="gray.1"
                                    size={18}
                                    radius="0"
                                >
                                    <IconCheck
                                        size={11}
                                        stroke={2.5}
                                        color="var(--mantine-color-gray-9)"
                                    />
                                </ThemeIcon>
                            }
                        >
                            {group.items.map(item => (
                                <List.Item key={item}>
                                    <Text
                                        fz={13}
                                        c="gray.6"
                                        lh={1.6}
                                    >
                                        {item}
                                    </Text>
                                </List.Item>
                            ))}
                        </List>
                    </Box>
                ))}
            </SimpleGrid>
        </DocSection>
    )
}

/* ==========================================================================
   12 · Prompt mestre
   ========================================================================== */

function MasterPrompt() {
    return (
        <DocSection
            id="prompt"
            label="Portabilidade"
            title="Prompt mestre"
            description="Para gerar interfaces no sistema em qualquer ferramenta de IA — Claude, ChatGPT, v0, Cursor, Figma. Copie e cole inteiro."
        >
            <SubHead mt={0}>Prompt curto — uma tela ou componente</SubHead>

            <CodeBlock
                label="Cole em qualquer LLM"
                code={`Você é um Senior Product Designer trabalhando no design system Zen.
Gere UI seguindo estritamente estas regras:

FILOSOFIA: conteúdo sobre cromo. Todo elemento que não comunica informação é
removido. A hierarquia vem de tamanho, peso e espaço — nunca de cor.

TIPOGRAFIA: Montserrat, pesos apenas 500/700/800/900.
- Label:   10-13px, peso 800, UPPERCASE, letter-spacing +1.5px, cor #9CA3AF
- Corpo:   15-20px, peso 400-500, line-height 1.7, cor #4B5563
- Display: 32-120px, peso 900, letter-spacing -0.04em, line-height 1-1.2, cor #11181C
- O salto entre níveis adjacentes é de 3x ou mais.

COR: monocromática. Rampa gray: #FFFFFF #F9FAFB #F3F4F6 #E5E7EB #9CA3AF
#6B7280 #4B5563 #374151 #1F2937 #11181C. Sem cor de marca, sem gradiente,
sem sombra. Fundo de seção alterna entre #FFFFFF e #F9FAFB.

FORMA: border-radius 0 em absolutamente tudo. Sem box-shadow. Única borda:
1px solid #F3F4F6. Inputs sem moldura, só border-bottom. Botões são
retângulos #11181C com label uppercase peso 800.

ESPAÇO: cada seção é um "palco" — padding 80px 0 em mobile, 120px 0 em
desktop, container de 1180px. Dentro do palco: um label pequeno, o título
massivo logo abaixo (gap 10px), e o conteúdo separado por 32px. Mobile é
sempre coluna única.

CONTEÚDO: todo número grande carrega abaixo uma nota de 13px em #4B5563
que o torna verificável.

Não adicione cor de destaque, canto arredondado, sombra ou segunda família
tipográfica em nenhuma hipótese.`}
            />

            <SubHead>Prompt de código — React + Mantine</SubHead>

            <CodeBlock
                label="Quando o alvo é o codebase real"
                code={`Gere um componente React usando Mantine e @ciromaciel/components-kit,
seguindo o Zen Design System.

RESTRIÇÕES TÉCNICAS:
- Zero CSS inline (style={{}}), zero arquivo .css. Tudo via props do Mantine.
- Props semânticas: bg, c, bd, fz, fw, ls, lh, maw, py, gap.
- Cores só como token: c="gray.6", bg="gray.1". Nunca hex literal.
- radius="0" em todo elemento que aceita raio.
- Ícones Tabler com stroke={1.5}.
- JavaScript, não TypeScript.

ESTRUTURA OBRIGATÓRIA:
import { Section } from '@ciromaciel/components-kit'

export function MinhaSecao({ id, subtitle, title, items = [], cta, note, background = 'white' }) {
    return (
        <Section id={id} subtitle={subtitle} title={title} background={background}>
            {/* conteúdo config-driven a partir de items */}
        </Section>
    )
}

API CONFIG-DRIVEN: o componente recebe dados
(items={[{ value, label, description }]}), nunca JSX em prop.

CONTRATO DE PROPS: id, badge, subtitle, title, description,
background ('white'|'gray'), ta ('left'|'center'), items,
cta ({ label, href, icon, variant, target }), note.

TIPOGRAFIA VIA TOKENS: títulos usam fz="var(--fz-section-title)",
hero usa var(--fz-hero), métricas usam var(--fz-big-metric).

Use as primitivas existentes (SectionHeader, CTAButton, MediaBlock) em vez
de reimplementar. Se um padrão aparece em 3+ componentes, proponha
promovê-lo a primitiva.`}
            />

            <SubHead>Prompt de auditoria</SubHead>

            <CodeBlock
                label="Para revisar UI existente"
                code={`Audite esta interface contra o Zen Design System e liste as
violações, cada uma com a lei violada e a correção concreta.

REPROVAÇÃO AUTOMÁTICA: border-radius != 0 · qualquer box-shadow · cor fora
da rampa gray · salto tipográfico <2x entre níveis · corpo em #11181C ·
seção que reimplementa o palco em vez de usar Section · prop que aceita JSX
arbitrário · métrica grande sem nota de verificação.

VERIFIQUE TAMBÉM: peso fora de {500,700,800,900} · letter-spacing fora de
{-0.04em, 1.5px, 2px} · borda diferente de 1px solid #F3F4F6 · corpo com
max-width >780px · grade com múltiplas colunas em mobile · texto #9CA3AF
fora de label uppercase · imagem sem alt.

Para cada achado informe: arquivo e linha, lei violada (1 Conteúdo sobre
cromo / 2 Hierarquia massiva / 3 O Palco / 4 Config-driven / 5 Honestidade
verificável), e o diff da correção.`}
            />

            <SubHead note="Ferramentas de IA tendem a adicionar exatamente o que este sistema remove. Anexe quando o modelo insistir.">
                Instruções negativas
            </SubHead>

            <CodeBlock
                code={`NÃO adicione: cor de destaque ou accent · gradiente · border-radius ·
box-shadow · glassmorphism ou blur · segunda família tipográfica · ícone
decorativo sem função · animação além de translateY(-1px) + brightness(1.1)
no hover de botão · badge colorido · card com elevação · dark mode
(o sistema é light-only).

Se a tela parecer vazia demais, o problema é o texto, não o design.
Melhore a copy — não adicione moldura.`}
            />

            <Callout title="Onde este documento vive">
                A versão em markdown — com o raciocínio completo por trás de cada regra — está em{' '}
                <Mono>marketing/brand/design-system/</Mono>. Os valores executáveis estão em{' '}
                <Mono>website/src/design-system/tokens.js</Mono>, que é o que esta página consome. Token novo nasce no
                markdown, entra no <Mono>tokens.js</Mono>, desce para <Mono>components-kit/src/theme.js</Mono>. Nunca o
                contrário.
            </Callout>
        </DocSection>
    )
}

/* ==========================================================================
   13 · Para agentes
   ========================================================================== */

const AGENT_ROUTES = [
    {
        path: '/design-system.txt',
        type: 'text/plain',
        what: 'A especificação completa em Markdown: tokens, API, receitas, erros e protocolo de validação. É o arquivo para passar a um agente.',
    },
    {
        path: '/design-system.json',
        type: 'application/json',
        what: 'Os mesmos dados estruturados, para quem prefere consumir programaticamente.',
    },
    {
        path: '/llms-design.txt',
        type: 'text/plain',
        what: 'Ponto de entrada no padrão llmstxt.org para o design system, com as regras invariantes.',
    },
]

/**
 * AgentRouteRow — uma rota com as três ações que ela comporta.
 *
 * Um <a href> puro não resolve aqui: o browser renderiza text/plain e JSON
 * inline em vez de salvar. "Baixar" busca o conteúdo e o entrega por um Blob
 * com `download`, e "Copiar" evita o download inteiro quando o destino é
 * colar num prompt — que é o caso mais comum.
 */
function AgentRouteRow({ route, first }) {
    const specOrigin = useSpecOrigin()
    const [state, setState] = useState('idle') // idle | loading | copied | error

    const fetchText = async () => {
        const res = await fetch(route.path)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
    }

    const handleCopy = async () => {
        setState('loading')
        try {
            await navigator.clipboard.writeText(await fetchText())
            setState('copied')
            setTimeout(() => setState('idle'), 1800)
        } catch {
            setState('error')
            setTimeout(() => setState('idle'), 2600)
        }
    }

    const handleDownload = async () => {
        setState('loading')
        try {
            const text = await fetchText()
            // Blob + objectURL: `download` num href cross-origin é ignorado, e
            // aqui garante o nome do arquivo em qualquer navegador.
            const url = URL.createObjectURL(new Blob([text], { type: route.type }))
            const a = document.createElement('a')
            a.href = url
            a.download = route.path.replace(/^\//, '')
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
            setState('idle')
        } catch {
            setState('error')
            setTimeout(() => setState('idle'), 2600)
        }
    }

    return (
        <Box
            p="lg"
            style={{ borderTop: first ? 'none' : '1px solid var(--mantine-color-gray-2)' }}
        >
            <Group
                justify="space-between"
                wrap="wrap"
                gap="xs"
                mb="xs"
            >
                <Text
                    fz={14}
                    fw={800}
                    ff="monospace"
                    c="gray.9"
                    style={{ wordBreak: 'break-all' }}
                >
                    {specOrigin}
                    {route.path}
                </Text>
                <Text
                    fz={11}
                    fw={700}
                    tt="uppercase"
                    lts="1px"
                    c="gray.4"
                >
                    {route.type}
                </Text>
            </Group>

            <Text
                fz={13}
                c="gray.6"
                lh={1.6}
                mb="md"
            >
                {route.what}
            </Text>

            <Group gap="xs">
                <RouteAction
                    onClick={handleCopy}
                    icon={state === 'copied' ? IconCheck : IconCopy}
                    label={state === 'copied' ? 'Copiado' : 'Copiar'}
                    primary
                    disabled={state === 'loading'}
                />
                <RouteAction
                    onClick={handleDownload}
                    icon={IconDownload}
                    label="Baixar"
                    disabled={state === 'loading'}
                />
                <RouteAction
                    href={`${specOrigin}${route.path}`}
                    target="_blank"
                    icon={IconExternalLink}
                    label="Abrir"
                />
                {state === 'error' && (
                    <Text
                        fz={12}
                        c="red.6"
                        fw={700}
                    >
                        Falhou — use "Abrir" e salve pelo navegador.
                    </Text>
                )}
            </Group>
        </Box>
    )
}

/**
 * RouteAction — botão do sistema: retângulo, uppercase 800, sem raio.
 *
 * Vira <a> quando recebe href e <button> quando recebe onClick, seguindo o
 * mesmo contrato do CTAButton do kit.
 */
function RouteAction({ onClick, href, target, icon: Icon, label, primary, disabled }) {
    return (
        <Box
            component={href ? 'a' : 'button'}
            type={href ? undefined : 'button'}
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            onClick={onClick}
            disabled={disabled}
            px="md"
            py={8}
            fz={12}
            fw={800}
            tt="uppercase"
            c={primary ? 'white' : 'gray.9'}
            bg={primary ? 'gray.9' : 'transparent'}
            style={{
                letterSpacing: '1px',
                border: primary ? 'none' : '1px solid var(--mantine-color-gray-2)',
                borderRadius: 0,
                cursor: disabled ? 'default' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'inherit',
                transition: 'transform 0.2s ease, filter 0.2s ease',
            }}
            onMouseEnter={e => {
                if (disabled) return
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.filter = 'brightness(1.1)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.filter = 'none'
            }}
        >
            <Icon
                size={14}
                stroke={1.5}
            />
            {label}
        </Box>
    )
}

const buildAgentPrompt = origin => `Construa/atualize [DESCREVA A TAREFA] seguindo o Zen Design System.

A especificação completa e autocontida está em:
${origin}/design-system.txt

Busque esse arquivo ANTES de escrever qualquer código — ele é autossuficiente,
você não precisa de mais nenhuma fonte. Ele contém:
- As 6 leis e as regras invariantes (que reprovam o trabalho se violadas)
- Todos os design tokens com valores exatos
- A API completa dos 24 componentes, com shapes de props aninhadas
- Receitas de páginas inteiras que compilam
- Os 10 erros frequentes que quebram o build
- O protocolo de validação executável

Se você não conseguir acessar a URL, me avise em vez de trabalhar de memória.

Ao terminar, rode o protocolo de validação da seção "Protocolo de validação"
e me relate: o build passou, o resultado da auditoria automática, quais
componentes você usou, e qualquer regra que não conseguiu cumprir.`

function ParaAgentes() {
    const specOrigin = useSpecOrigin()
    return (
        <DocSection
            id="agentes"
            label="Automação"
            title="Para agentes"
            description="Esta página é React — um agente que faz fetch nela recebe uma div vazia. Estas rotas servem a mesma informação em formato legível por máquina."
        >
            <SubHead mt={0}>As três rotas</SubHead>

            <Box style={{ border: '1px solid var(--mantine-color-gray-2)' }}>
                {AGENT_ROUTES.map((r, i) => (
                    <AgentRouteRow
                        key={r.path}
                        route={r}
                        first={i === 0}
                    />
                ))}
            </Box>

            <Callout title="Por que existe uma versão em texto">
                Uma SPA React renderiza no cliente. Quem faz <Mono>fetch</Mono> em <Mono>/design-system</Mono> recebe{' '}
                <Mono>{'<div id="app"></div>'}</Mono> e nada mais — a página é legível por humanos e invisível para
                máquinas. As rotas acima são geradas dos mesmos <Mono>tokens.js</Mono> e <Mono>api.js</Mono> que esta
                página renderiza, então não têm como divergir do que você está vendo.
            </Callout>

            <SubHead note="Cole isto, troque a descrição da tarefa, e o agente tem tudo o que precisa para trabalhar e se validar sozinho.">
                Prompt pronto
            </SubHead>

            <CodeBlock label="Prompt para o agente" code={buildAgentPrompt(specOrigin)} />

            <SubHead note="O agente deve rodar isto antes de dizer que terminou. Qualquer linha de código impressa é uma violação.">
                Auditoria automática
            </SubHead>

            <CodeBlock
                label="bash — na raiz do projeto"
                code={`echo "== radius não-zero =="
grep -rnE 'radius=("(?!0)[^"]*"|\\{(?!0)[^}]*\\})' src/ --include=*.jsx || echo "  OK"

echo "== box-shadow =="
grep -rn 'boxShadow\\|box-shadow' src/ --include=*.jsx | grep -v 'none' || echo "  OK"

echo "== hex literal (use tokens) =="
grep -rnE '#[0-9a-fA-F]{6}' src/ --include=*.jsx || echo "  OK"

echo "== peso fora de {500,700,800,900} =="
grep -rhoE 'fw=\\{[0-9]+\\}' src/ --include=*.jsx | sort -u \\
  | grep -vE 'fw=\\{(500|700|800|900)\\}' || echo "  OK"

echo "== letter-spacing fora da escala =="
grep -rhoE 'lts="[^"]*"' src/ --include=*.jsx | sort -u \\
  | grep -vE 'lts="(-0\\.04em|1\\.5px|2px)"' || echo "  OK"`}
            />

            <Callout title="O que o agente deve relatar">
                O comando de build rodado e seu resultado · o resultado da auditoria automática · quais componentes do
                kit foram usados e quais precisou criar · qualquer regra que <strong>não</strong> conseguiu cumprir, e
                por quê. Não relate sucesso sem ter rodado o build.
            </Callout>
        </DocSection>
    )
}

/* ==========================================================================
   Auxiliares locais
   ========================================================================== */

function SpecLine({ label, value }) {
    return (
        <Group
            justify="space-between"
            wrap="nowrap"
            gap="xs"
        >
            <Text
                fz={12}
                c="gray.4"
            >
                {label}
            </Text>
            <Text
                fz={12}
                c="gray.7"
                ff="monospace"
                fw={700}
            >
                {value}
            </Text>
        </Group>
    )
}

function ThLabel({ children }) {
    return (
        <Text
            fz={11}
            fw={800}
            tt="uppercase"
            lts="1.5px"
            c="gray.4"
        >
            {children}
        </Text>
    )
}

function Mono({ children }) {
    return (
        <Text
            component="code"
            fz={12}
            ff="monospace"
            c="gray.9"
            px={4}
            bg="gray.1"
            style={{ borderRadius: 0 }}
        >
            {children}
        </Text>
    )
}
