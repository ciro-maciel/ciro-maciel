import { Badge, Box, Card, Container, Divider, Grid, Group, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Logotype } from '@ciromaciel/components-kit'

import { useSeoMeta } from '../hooks/useSeoMeta'
import { BRANDING } from '../data/branding'

/**
 * Os recursos da marca pessoal — logotipo, símbolo, cores, tipografia.
 *
 * A ESTRUTURA VEIO DA PÁGINA DE BRANDING DO PRODUTO; O CONTEÚDO NÃO. A página de lá
 * documenta a marca de uma EMPRESA, e o que ela diz sobre si mesma não
 * sobrevive à troca de nome: "o Raio é a manifestação visual da
 * energia que impulsiona a transformação" descreve um símbolo corporativo, e
 * a mesma frase sobre uma pessoa soa como uma empresa fingindo ser alguém.
 *
 * O que ficou igual é o que É igual de verdade: a lâmpada, a Montserrat e a
 * paleta monocromática. Os dois usam o mesmo kit e a mesma fonte porque é a
 * mesma pessoa construindo — e é isso que esta página pode dizer sem inventar
 * um patrimônio que não existe.
 *
 * NÃO HÁ "ARQUITETURA DE MARCA" AQUI. A página da empresa fecha com um lockup
 * de submarca ("<marca> | ENGENHARIA"), que responde a uma pergunta real de
 * quem tem departamentos. Uma pessoa não tem submarca, e desenhar uma seria
 * inventar estrutura para preencher a seção.
 */
export function Branding() {
    useSeoMeta({
        title: 'Marca',
        description:
            'Logotipo, símbolo, cores e tipografia — os arquivos e as regras para exibir a marca Ciro Cesar Maciel do jeito certo.',
        url: '/branding',
    })

    return (
        <>
            <Box
                bg="gray.0"
                py={{ base: 72, md: 120 }}
                bd={{ bottom: '1px solid gray.2' }}
            >
                <Container size="md">
                    <Stack
                        align="center"
                        gap="md"
                        ta="center"
                    >
                        <Badge
                            variant="outline"
                            color="gray"
                            size="lg"
                            radius="sm"
                        >
                            Ativos da marca
                        </Badge>
                        {/* 64px é o tamanho da página da empresa, e aqui ele
                            desce no celular: "Recursos da marca" cabe numa
                            linha, mas a 64px num viewport de 360px ela sai
                            pela borda. O `order={1}` mantém o h1 da rota. */}
                        <Title
                            order={1}
                            fz={{ base: 40, sm: 56, md: 64 }}
                            style={{ letterSpacing: '-0.04em' }}
                        >
                            {BRANDING.title}
                        </Title>
                        <Text
                            c="dimmed"
                            size="xl"
                            maw={600}
                            mx="auto"
                        >
                            {BRANDING.description}
                        </Text>
                    </Stack>
                </Container>
            </Box>

            <Container
                size="md"
                py={{ base: 64, md: 100 }}
            >
                <Stack gap={{ base: 64, md: 100 }}>
                    <section>
                        <Box mb="xl">
                            <Title order={2}>Logotipo</Title>
                            <Text c="dimmed">{BRANDING.logotype.caption}</Text>
                        </Box>
                        <Card
                            bg="white"
                            bd="1px solid gray.2"
                            p={{ base: 40, md: 100 }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Stack
                                align="center"
                                gap="xl"
                            >
                                {/* Drawn, not the file: it follows the theme
                                    like every header. The file stays for
                                    download. */}
                                <Logotype
                                    word="Ciro Cesar Maciel"
                                    signature={null}
                                    height={80}
                                />
                                <Text
                                    size="xs"
                                    c="dimmed"
                                    fw={500}
                                    ta="center"
                                    style={{ letterSpacing: '0.1em' }}
                                >
                                    {BRANDING.logotype.rule}
                                </Text>
                            </Stack>
                        </Card>
                    </section>

                    <section>
                        <Grid gutter={{ base: 'md', md: 60 }}>
                            <Grid.Col span={{ base: 12, md: 5 }}>
                                <Title
                                    order={2}
                                    mb="md"
                                >
                                    O símbolo
                                </Title>
                                <Text
                                    c="dimmed"
                                    size="lg"
                                >
                                    {BRANDING.symbol.description}
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 7 }}>
                                <Card
                                    bg="white"
                                    bd="1px solid gray.2"
                                    p="xl"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: '300px',
                                    }}
                                >
                                    <Image
                                        src={BRANDING.symbol.src}
                                        alt="Símbolo: uma lâmpada com um raio dentro"
                                        h={120}
                                        w="auto"
                                        fit="contain"
                                    />
                                </Card>
                            </Grid.Col>
                        </Grid>
                    </section>

                    <section>
                        <Title
                            order={2}
                            mb="xs"
                        >
                            Paleta de cores
                        </Title>
                        <Text
                            c="dimmed"
                            mb="xl"
                        >
                            {BRANDING.colorsCaption}
                        </Text>
                        <SimpleGrid
                            cols={{ base: 1, sm: 3 }}
                            spacing="xl"
                        >
                            {BRANDING.colors.map((color) => (
                                <ColorCard
                                    key={color.hex}
                                    {...color}
                                />
                            ))}
                        </SimpleGrid>
                    </section>

                    <section>
                        <Title
                            order={2}
                            mb="xs"
                        >
                            Tipografia
                        </Title>
                        <Text
                            c="dimmed"
                            mb="xl"
                        >
                            {BRANDING.type.caption}
                        </Text>

                        <Card
                            p="xl"
                            bd="1px solid gray.2"
                            bg="white"
                        >
                            <Stack gap={60}>
                                <Grid
                                    gutter={{ base: 'md', md: 40 }}
                                    align="center"
                                >
                                    <Grid.Col span={{ base: 12, md: 5 }}>
                                        <Box>
                                            {/* O espécime, no tamanho em que a
                                                forma da letra aparece. Não é um
                                                título, então não é um Title: é
                                                uma amostra, e um h3 com "Aa"
                                                dentro entraria no sumário do
                                                leitor de tela como se fosse
                                                uma seção. */}
                                            <Text c="gray.9"
                                                aria-hidden="true"
                                                fw={700}
                                                style={{
                                                    fontSize: '120px',
                                                    lineHeight: 1,
                                                    letterSpacing: '-0.04em',
                                                }}
                                            >
                                                Aa
                                            </Text>
                                            <Title
                                                order={3}
                                                mt="md"
                                            >
                                                Montserrat
                                            </Title>
                                            <Badge
                                                variant="light"
                                                color="gray"
                                                mt="xs"
                                            >
                                                TIPOGRAFIA PRINCIPAL
                                            </Badge>
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, md: 7 }}>
                                        <Stack gap="xl">
                                            {BRANDING.type.notes.map((note) => (
                                                <Box key={note.title}>
                                                    <Title
                                                        order={4}
                                                        mb="xs"
                                                    >
                                                        {note.title}
                                                    </Title>
                                                    <Text c="dimmed">{note.body}</Text>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Grid.Col>
                                </Grid>

                                <Divider
                                    label="AMOSTRAS DE PESO"
                                    labelPosition="center"
                                />

                                <SimpleGrid
                                    cols={{ base: 2, sm: 4 }}
                                    spacing="xl"
                                >
                                    {BRANDING.type.weights.map((weight) => (
                                        <Stack
                                            key={weight.weight}
                                            gap={4}
                                        >
                                            <Text c="gray.9"
                                                fw={weight.weight}
                                                size="xl"
                                            >
                                                {weight.name}
                                            </Text>
                                            <Text
                                                size="xs"
                                                c="dimmed"
                                            >
                                                {weight.use}
                                            </Text>
                                        </Stack>
                                    ))}
                                </SimpleGrid>
                            </Stack>
                        </Card>
                    </section>

                    <section>
                        <Title
                            order={2}
                            mb="xs"
                        >
                            Redes sociais e OpenGraph
                        </Title>
                        <Text
                            c="dimmed"
                            mb="xl"
                        >
                            O cartão que aparece quando um link deste site é compartilhado.
                        </Text>
                        <Card
                            p="xl"
                            bd="1px solid gray.2"
                            bg="white"
                        >
                            <Grid
                                gutter={{ base: 'md', md: 40 }}
                                align="center"
                            >
                                <Grid.Col span={{ base: 12, md: 8 }}>
                                    <Box
                                        style={{
                                            position: 'relative',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <Image
                                            src={BRANDING.opengraph.src}
                                            alt="Cartão de compartilhamento do site"
                                            w="100%"
                                            h="auto"
                                        />
                                        <Box style={{ position: 'absolute', top: 10, right: 10 }}>
                                            <Badge
                                                color="gray.9"
                                                size="sm"
                                            >
                                                1200 x 630 px
                                            </Badge>
                                        </Box>
                                    </Box>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 4 }}>
                                    <Stack gap="md">
                                        <Title order={4}>Visão geral</Title>
                                        <Text
                                            size="sm"
                                            c="dimmed"
                                        >
                                            {BRANDING.opengraph.description}
                                        </Text>
                                        <Divider />
                                        <Box>
                                            <Text
                                                size="xs"
                                                fw={700}
                                                c="dimmed"
                                                style={{ letterSpacing: '0.1em' }}
                                            >
                                                ESPECIFICAÇÕES
                                            </Text>
                                            {BRANDING.opengraph.specs.map((spec) => (
                                                <Text
                                                    key={spec}
                                                    size="sm"
                                                >
                                                    {spec}
                                                </Text>
                                            ))}
                                        </Box>
                                    </Stack>
                                </Grid.Col>
                            </Grid>
                        </Card>
                    </section>

                    {/* ONDE ESTA MARCA ENCOSTA NA OUTRA. A página da empresa
                        fecha com submarcas; esta fecha dizendo por que as duas
                        se parecem — que é a pergunta real de quem chega aqui
                        tendo visto o site do produto, e a resposta honesta é que é
                        a mesma pessoa e o mesmo kit. */}
                    <section>
                        <Title
                            order={2}
                            mb="xs"
                        >
                            {BRANDING.relation.title}
                        </Title>
                        <Text
                            c="dimmed"
                            mb="xl"
                        >
                            {BRANDING.relation.description}
                        </Text>
                        <Card
                            p={{ base: 32, md: 60 }}
                            bd="1px solid gray.2"
                            bg="white"
                        >
                            <Group
                                justify="center"
                                gap={{ base: 20, md: 40 }}
                                wrap="nowrap"
                            >
                                <Logotype
                                    word="Ciro Cesar Maciel"
                                    signature={null}
                                    height={30}
                                />
                                <Box
                                    h={40}
                                    w={1}
                                    bg="gray.3"
                                    style={{ flexShrink: 0 }}
                                />
                                {/* INFRASTRUCTURE, NAO RILIGAR. O par era a
                                    arquitetura de duas marcas irmas que
                                    as notas de marca desfizeram em
                                    19/09/2026: a razao social deixou de ser
                                    marca, e o que assina do outro lado do
                                    divisor e a linha de produto — que e
                                    justamente o que a copy desta secao ("E os
                                    produtos") diz. */}
                                <Text c="gray.9"
                                    fw={700}
                                    fz={{ base: 14, md: 20 }}
                                    style={{ letterSpacing: '0.2em' }}
                                >
                                    INFRASTRUCTURE
                                </Text>
                            </Group>
                        </Card>
                    </section>
                </Stack>
            </Container>
        </>
    )
}

function ColorCard({ color, label, hex, use }) {
    return (
        <Card
            p={0}
            bd="1px solid gray.2"
            radius="md"
            bg="white"
            style={{ overflow: 'hidden' }}
        >
            <Box
                bg={color}
                h={120}
                /* O branco puro num card branco não tem borda nenhuma, e a
                   amostra some. A linha de baixo é o que faz o leitor ver que
                   há uma cor ali. */
                style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
            />
            <Box p="md">
                <Text
                    fw={600}
                    size="sm"
                >
                    {label}
                </Text>
                <Text
                    size="xs"
                    c="dimmed"
                >
                    {hex}
                </Text>
                <Text
                    size="xs"
                    c="dimmed"
                    mt={4}
                >
                    {use}
                </Text>
            </Box>
        </Card>
    )
}
