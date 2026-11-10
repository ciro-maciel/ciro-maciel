import { useState } from 'react'
import { ActionIcon, Box, Code, CopyButton, Group, Paper, SimpleGrid, Stack, Text, Title, Tooltip } from '@mantine/core'
import { IconCheck, IconCopy, IconX } from '@tabler/icons-react'

/**
 * DocsKit — os blocos de construção da página /design-system.
 *
 * Ficam aqui, e não no components-kit, porque documentar um design system é um
 * trabalho diferente de usá-lo: estes componentes precisam mostrar código cru,
 * marcar violações e renderizar um token ao lado do seu valor. Nada disso tem
 * uso numa landing page.
 */

/* -------------------------------------------------------------------------
   Estrutura
   ------------------------------------------------------------------------- */

/**
 * DocSection — o palco da documentação.
 *
 * Mesma anatomia da primitiva Section do kit (label pequeno + título massivo +
 * conteúdo separado), mas com âncora de navegação e sem Container próprio, já
 * que a página inteira compartilha um só.
 */
export function DocSection({ id, label, title, description, children, first }) {
    return (
        <Box
            component="section"
            id={id}
            // O respiro entre capítulos é padding; o recuo do header fixo é
            // scroll-margin. Usar padding para os dois empurraria a primeira
            // seção para baixo e a desalinharia do índice lateral, que não tem
            // como saber desse espaço.
            pt={first ? 0 : 100}
            style={{ scrollMarginTop: 100 }}
        >
            <Stack gap="xs">
                {label && (
                    <Text
                        size="xs"
                        fw={800}
                        tt="uppercase"
                        lts="1.5px"
                        c="gray.4"
                    >
                        {label}
                    </Text>
                )}
                <Title
                    order={2}
                    fz="var(--fz-section-title)"
                    maw={800}
                >
                    {title}
                </Title>
            </Stack>

            {description && (
                <Text
                    c="gray.6"
                    fz="lg"
                    lh={1.7}
                    maw={780}
                    mt="md"
                >
                    {description}
                </Text>
            )}

            <Box mt={48}>{children}</Box>
        </Box>
    )
}

/** SubHead — divisão interna de um capítulo, um degrau abaixo do DocSection. */
export function SubHead({ children, note, mt = 64 }) {
    return (
        <Stack
            gap={4}
            mt={mt}
            mb="xl"
        >
            <Title
                order={3}
                fz={{ base: 20, md: 24 }}
                fw={800}
            >
                {children}
            </Title>
            {note && (
                <Text
                    c="gray.6"
                    lh={1.7}
                    maw={780}
                >
                    {note}
                </Text>
            )}
        </Stack>
    )
}

/* -------------------------------------------------------------------------
   Código
   ------------------------------------------------------------------------- */

/**
 * CodeBlock — código copiável.
 *
 * O motivo de existir a página inteira: ver a regra e levar o código embora
 * sem reabrir o kit.
 */
export function CodeBlock({ code, label }) {
    return (
        <Paper
            radius="0"
            bd="1px solid var(--mantine-color-gray-2)"
            bg="gray.0"
            pos="relative"
        >
            {label && (
                <Text
                    size="xs"
                    fw={800}
                    tt="uppercase"
                    lts="1.5px"
                    c="gray.4"
                    px="md"
                    pt="md"
                >
                    {label}
                </Text>
            )}
            <Box
                pos="absolute"
                top={8}
                right={8}
            >
                <CopyButton
                    value={code}
                    timeout={1600}
                >
                    {({ copied, copy }) => (
                        <Tooltip
                            label={copied ? 'Copiado' : 'Copiar'}
                            withArrow
                            radius="0"
                        >
                            <ActionIcon
                                variant="subtle"
                                color="gray"
                                onClick={copy}
                                aria-label="Copiar código"
                            >
                                {copied ? <IconCheck size={16} stroke={1.5} /> : <IconCopy size={16} stroke={1.5} />}
                            </ActionIcon>
                        </Tooltip>
                    )}
                </CopyButton>
            </Box>
            <Code
                block
                style={{
                    background: 'transparent',
                    fontSize: 13,
                    lineHeight: 1.7,
                    padding: 'var(--mantine-spacing-md)',
                    paddingRight: 48,
                    overflowX: 'auto',
                }}
            >
                {code}
            </Code>
        </Paper>
    )
}

/**
 * SpecRow — um token ao lado do seu valor e do seu porquê.
 *
 * O `preview` recebe o token já aplicado de verdade, não uma imagem dele:
 * o que você vê na coluna da esquerda é o mesmo CSS que roda em produção.
 */
export function SpecRow({ preview, name, value, usage, count }) {
    return (
        <Box
            py="lg"
            style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
        >
            <SimpleGrid
                cols={{ base: 1, md: 2 }}
                spacing="xl"
                verticalSpacing="md"
            >
                <Box style={{ minWidth: 0, overflow: 'hidden' }}>{preview}</Box>
                <Stack gap={6}>
                    <Group
                        gap="xs"
                        wrap="nowrap"
                    >
                        <Text
                            fw={800}
                            c="gray.9"
                            fz={15}
                        >
                            {name}
                        </Text>
                        {count != null && (
                            <Text
                                size="xs"
                                c="gray.4"
                                fw={700}
                            >
                                {count}× no kit
                            </Text>
                        )}
                    </Group>
                    {value && (
                        <Code
                            style={{
                                background: 'var(--mantine-color-gray-0)',
                                border: '1px solid var(--mantine-color-gray-2)',
                                fontSize: 12,
                                width: 'fit-content',
                                maxWidth: '100%',
                                overflowX: 'auto',
                            }}
                        >
                            {value}
                        </Code>
                    )}
                    {usage && (
                        <Text
                            fz={13}
                            c="gray.6"
                            lh={1.5}
                        >
                            {usage}
                        </Text>
                    )}
                </Stack>
            </SimpleGrid>
        </Box>
    )
}

/* -------------------------------------------------------------------------
   Julgamento
   ------------------------------------------------------------------------- */

/**
 * DoDont — o par certo/errado.
 *
 * Uma regra abstrata ("corpo nunca é gray.9") não sobrevive ao contato com o
 * código. Ver os dois lado a lado, renderizados, sobrevive.
 */
export function DoDont({ children }) {
    return (
        <SimpleGrid
            cols={{ base: 1, md: 2 }}
            spacing="xl"
        >
            {children}
        </SimpleGrid>
    )
}

export function DoDontCard({ good, title, children, why }) {
    const Icon = good ? IconCheck : IconX
    const accent = good ? 'var(--mantine-color-gray-9)' : 'var(--mantine-color-red-6)'

    return (
        <Paper
            radius="0"
            bg="white"
            bd="1px solid var(--mantine-color-gray-2)"
            style={{ borderTop: `4px solid ${accent}` }}
        >
            <Group
                gap="xs"
                px="lg"
                pt="lg"
                wrap="nowrap"
            >
                <Icon
                    size={16}
                    stroke={2}
                    color={accent}
                />
                <Text
                    fw={800}
                    fz="xs"
                    tt="uppercase"
                    lts="1.5px"
                    c={good ? 'gray.9' : 'red.6'}
                >
                    {good ? 'Faça' : 'Não faça'}
                </Text>
                {title && (
                    <Text
                        fz="xs"
                        c="gray.5"
                        fw={700}
                    >
                        — {title}
                    </Text>
                )}
            </Group>

            <Box
                px="lg"
                py="xl"
                mt="md"
                bg="gray.0"
                style={{
                    borderTop: '1px solid var(--mantine-color-gray-2)',
                    borderBottom: why ? '1px solid var(--mantine-color-gray-2)' : 'none',
                }}
            >
                {children}
            </Box>

            {why && (
                <Text
                    fz={13}
                    c="gray.6"
                    lh={1.5}
                    px="lg"
                    py="md"
                >
                    {why}
                </Text>
            )}
        </Paper>
    )
}

/**
 * Callout — nota destacada. `tone="warn"` marca divergência conhecida entre
 * este documento e o estado atual do código.
 */
export function Callout({ title, children, tone = 'neutral' }) {
    const accent = tone === 'warn' ? 'var(--mantine-color-gray-9)' : 'var(--mantine-color-gray-3)'

    return (
        <Paper
            radius="0"
            bg="gray.0"
            bd="none"
            p="lg"
            my="xl"
            style={{ borderLeft: `2px solid ${accent}` }}
        >
            {title && (
                <Text
                    fw={800}
                    fz="xs"
                    tt="uppercase"
                    lts="1.5px"
                    c="gray.9"
                    mb="xs"
                >
                    {title}
                </Text>
            )}
            <Text
                c="gray.6"
                lh={1.7}
                fz={14}
            >
                {children}
            </Text>
        </Paper>
    )
}

/**
 * Swatch — um degrau da rampa, com o hex copiável.
 *
 * Os degraus 0–2 ganham borda porque, sem ela, um branco sobre branco não tem
 * como ser visto — que é justamente o ponto do degrau 0.
 */
export function Swatch({ hex, token, role, usage, count }) {
    const [isHovered, setIsHovered] = useState(false)
    const needsBorder = ['#FFFFFF', '#F9FAFB', '#F3F4F6'].includes(hex)

    return (
        <CopyButton
            value={hex}
            timeout={1600}
        >
            {({ copied, copy }) => (
                <Box
                    onClick={copy}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ cursor: 'pointer' }}
                >
                    <Box
                        h={96}
                        bg={hex}
                        pos="relative"
                        style={{
                            border: needsBorder ? '1px solid var(--mantine-color-gray-2)' : 'none',
                            transition: 'transform 0.2s ease',
                            transform: isHovered ? 'translateY(-2px)' : 'none',
                        }}
                    >
                        {copied && (
                            <Text
                                pos="absolute"
                                bottom={8}
                                right={10}
                                fz={11}
                                fw={800}
                                tt="uppercase"
                                lts="1px"
                                c={['#11181C', '#1F2937', '#374151', '#4B5563'].includes(hex) ? 'white' : 'gray.9'}
                            >
                                Copiado
                            </Text>
                        )}
                    </Box>
                    <Stack
                        gap={2}
                        mt="sm"
                    >
                        <Group
                            justify="space-between"
                            wrap="nowrap"
                            gap="xs"
                        >
                            <Text
                                fw={800}
                                fz={13}
                                c="gray.9"
                            >
                                {token}
                            </Text>
                            {count != null && (
                                <Text
                                    fz={11}
                                    c="gray.4"
                                    fw={700}
                                >
                                    {count}×
                                </Text>
                            )}
                        </Group>
                        <Text
                            fz={12}
                            c="gray.5"
                            ff="monospace"
                        >
                            {hex}
                        </Text>
                        <Text
                            fz={12}
                            fw={700}
                            c="gray.7"
                            mt={4}
                        >
                            {role}
                        </Text>
                        {usage && (
                            <Text
                                fz={12}
                                c="gray.5"
                                lh={1.4}
                            >
                                {usage}
                            </Text>
                        )}
                    </Stack>
                </Box>
            )}
        </CopyButton>
    )
}
