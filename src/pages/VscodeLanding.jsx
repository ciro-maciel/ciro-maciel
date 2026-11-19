import { Anchor, Box, Container, Grid, Group, Image, List, SimpleGrid, Stack, Table, Text, ThemeIcon } from '@mantine/core'
import { CodeBlock, CTAButton, FAQ, SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { VSCODE } from '../data/vscode'
import { ProBox } from './Vscode'

/**
 * The sales page of a VS Code extension on sale, /vscode/<id> (19/11/2026). The words are in data/vscode-landings.js,
 * every fact from the extension's README. The order follows the person who arrives: the promise and the two doors
 * (install free, or Pro) at once; why it exists; how it works in four steps; three real runs with what went in and what
 * came out; everything it does, as what the person gets; how it compares; free and Pro side by side; the questions they
 * ask before installing; and the doors again.
 */

const BORDER = '1px solid var(--mantine-color-gray-2)'

function Eyebrow({ children }) {
    return (
        <Text fz={13} fw={800} tt="uppercase" lts="1.5px" c="gray.5">
            {children}
        </Text>
    )
}

function H2({ children, ta }) {
    return (
        <Text component="h2" m={0} c="gray.9" fz={{ base: 28, md: 40 }} fw={900} lh={1.15} ta={ta} style={{ letterSpacing: '-0.03em', textWrap: 'balance' }}>
            {children}
        </Text>
    )
}

function Band({ background = 'white', children, id }) {
    return (
        <Box component="section" id={id} bg={SECTION_BACKGROUNDS[background]} py={{ base: 64, md: 104 }} style={id ? { scrollMarginTop: 96 } : undefined}>
            <Container size="lg">{children}</Container>
        </Box>
    )
}

function Doors({ extension }) {
    return (
        <Stack gap="xs" align="flex-start">
            <Group gap="md">
                <CTAButton label="Install free" href={extension.marketplace} target="_blank" icon={<IconArrowRight size={18} />} />
                {extension.pro ? (
                    <Anchor href="#pricing" fz={15} fw={800} c="gray.9" underline="always">
                        Or get Pro, with the AI included
                    </Anchor>
                ) : null}
            </Group>
            <Text fz={13} c="gray.5">
                VS Code Marketplace ·{' '}
                <Anchor href={extension.openVsx} target="_blank" rel="noopener noreferrer" c="gray.6" fz={13} underline="always">
                    Open VSX for Cursor, VSCodium and Windsurf
                </Anchor>
            </Text>
        </Stack>
    )
}

function Shot({ src, alt }) {
    return <Image src={src} alt={alt} radius={0} style={{ border: BORDER, width: '100%' }} />
}

export function VscodeLanding({ extension, landing, catalog }) {
    const { hero, problem, steps, showcase, features, compare, pricing, faq } = landing
    return (
        <>
            {/* The promise, the two doors and the product in use */}
            <Band background="gray">
                <Stack gap={40}>
                    <Stack gap="lg" maw={860}>
                        <Eyebrow>{hero.eyebrow}</Eyebrow>
                        <Text component="h1" m={0} c="gray.9" fz={{ base: 34, sm: 46, md: 60 }} lh={1.05} fw={900} style={{ letterSpacing: '-0.04em', textWrap: 'balance' }}>
                            {hero.title}
                        </Text>
                        <Text fz={{ base: 17, md: 20 }} c="gray.6" lh={1.6} maw={760}>
                            {hero.lead}
                        </Text>
                        <Doors extension={extension} />
                    </Stack>
                    <Shot src={hero.image} alt={hero.alt} />
                </Stack>
            </Band>

            {/* Why it exists, in the maker's words */}
            <Band background="white">
                <Grid gutter={{ base: 24, md: 64 }}>
                    <Grid.Col span={{ base: 12, md: 5 }}>
                        <Stack gap="sm">
                            <Eyebrow>Why I built it</Eyebrow>
                            <H2>{problem.title}</H2>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 7 }}>
                        <Stack gap="md">
                            {problem.text.map((p) => (
                                <Text key={p.slice(0, 24)} fz={{ base: 16, md: 18 }} c="gray.6" lh={1.75}>
                                    {p}
                                </Text>
                            ))}
                            <Text fz={14} fw={700} c="gray.9">
                                Ciro Cesar Maciel, who builds and maintains it
                            </Text>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Band>

            {/* Four steps */}
            <Band background="gray">
                <Stack gap={40}>
                    <Stack gap="sm" maw={760}>
                        <Eyebrow>How it works</Eyebrow>
                        <H2>{steps.title}</H2>
                    </Stack>
                    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={0} style={{ borderTop: BORDER, borderLeft: BORDER }}>
                        {steps.items.map(([title, text], i) => (
                            <Stack key={title} gap="xs" p="xl" style={{ borderRight: BORDER, borderBottom: BORDER }} bg={SECTION_BACKGROUNDS.white}>
                                <Text fz={48} fw={900} lh={1} c="gray.9" style={{ letterSpacing: '-0.04em' }}>
                                    {i + 1}
                                </Text>
                                <Text fz={17} fw={800} c="gray.9">
                                    {title}
                                </Text>
                                <Text fz={15} c="gray.6" lh={1.6}>
                                    {text}
                                </Text>
                            </Stack>
                        ))}
                    </SimpleGrid>
                </Stack>
            </Band>

            {/* Real runs: what went in, what came out */}
            {showcase.map((s, i) => (
                <Band key={s.title} background={i % 2 === 0 ? 'white' : 'gray'}>
                    <Grid gutter={{ base: 32, md: 64 }} align="center">
                        <Grid.Col span={{ base: 12, md: 5 }} order={{ base: 1, md: i % 2 === 0 ? 1 : 2 }}>
                            <Stack gap="md">
                                <Eyebrow>{i === 0 ? 'See it in action' : 'And then'}</Eyebrow>
                                <Text component="h3" m={0} c="gray.9" fz={{ base: 24, md: 30 }} fw={900} lh={1.2} style={{ letterSpacing: '-0.02em' }}>
                                    {s.title}
                                </Text>
                                <Text fz={16} c="gray.6" lh={1.7}>
                                    {s.text}
                                </Text>
                                {s.input ? (
                                    <Stack gap={6}>
                                        <Eyebrow>What went in</Eyebrow>
                                        <CodeBlock>{s.input}</CodeBlock>
                                    </Stack>
                                ) : null}
                                {s.output ? (
                                    <Stack gap={6}>
                                        <Eyebrow>What came out</Eyebrow>
                                        <CodeBlock>{s.output}</CodeBlock>
                                    </Stack>
                                ) : null}
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 7 }} order={{ base: 2, md: i % 2 === 0 ? 2 : 1 }}>
                            <Shot src={s.image} alt={s.alt} />
                        </Grid.Col>
                    </Grid>
                </Band>
            ))}

            {/* Everything it does, as what the person gets */}
            <Band background={showcase.length % 2 === 0 ? 'white' : 'gray'}>
                <Stack gap={40}>
                    <Stack gap="sm" maw={760}>
                        <Eyebrow>Everything in it</Eyebrow>
                        <H2>{features.title}</H2>
                    </Stack>
                    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl" verticalSpacing={40}>
                        {features.items.map(([title, text]) => (
                            <Stack key={title} gap={8}>
                                <ThemeIcon variant="light" color="gray" radius={0} size={36}>
                                    <IconCheck size={18} stroke={1.5} />
                                </ThemeIcon>
                                <Text fz={16} fw={800} c="gray.9">
                                    {title}
                                </Text>
                                <Text fz={14} c="gray.6" lh={1.65}>
                                    {text}
                                </Text>
                            </Stack>
                        ))}
                    </SimpleGrid>
                </Stack>
            </Band>

            {/* How it compares */}
            <Band background={showcase.length % 2 === 0 ? 'gray' : 'white'}>
                <Stack gap="lg">
                    <Eyebrow>Before you choose</Eyebrow>
                    <H2>{compare.title}</H2>
                    <Box style={{ overflowX: 'auto', border: BORDER }}>
                        <Table verticalSpacing="sm" horizontalSpacing="md" fz={14} miw={720}>
                            <Table.Thead bg={SECTION_BACKGROUNDS.gray}>
                                <Table.Tr>
                                    <Table.Th />
                                    {compare.columns.map((c, i) => (
                                        <Table.Th key={c}>
                                            <Text fz={12} fw={800} tt="uppercase" lts="1px" c={i === 0 ? 'gray.9' : 'gray.5'}>
                                                {c}
                                            </Text>
                                        </Table.Th>
                                    ))}
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {compare.rows.map(([label, ...cells]) => (
                                    <Table.Tr key={label}>
                                        <Table.Td fw={700} c="gray.9">
                                            {label}
                                        </Table.Td>
                                        {cells.map((c, i) => (
                                            <Table.Td key={i} c={i === 0 ? 'gray.9' : 'gray.6'} fw={i === 0 ? 800 : 500}>
                                                {c}
                                            </Table.Td>
                                        ))}
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Box>
                    <Text fz={13} c="gray.6">
                        {compare.note}
                    </Text>
                </Stack>
            </Band>

            {/* Free and Pro side by side */}
            <Band background={showcase.length % 2 === 0 ? 'white' : 'gray'} id="pricing">
                <Stack gap={40}>
                    <Stack gap="sm" maw={760}>
                        <Eyebrow>{extension.pro ? 'Free and Pro' : 'Price'}</Eyebrow>
                        <H2>{extension.pro ? 'Free does everything. Pro skips the AI account.' : 'Free. No account, no trial, no nag screen.'}</H2>
                        <Text fz={17} c="gray.6" lh={1.7}>
                            {extension.pro
                                ? 'The free version keeps every feature, with your own OpenRouter key. Pro is for when you would rather not create one more account and paste one more key: the AI comes included.'
                                : pricing.freeNote || 'Every feature is free. Where it uses AI, it uses your own OpenRouter key: you pick the model and pay the model, per token, with no subscription to me.'}
                        </Text>
                    </Stack>
                    <Grid gutter="xl">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Stack gap="md" p="lg" h="100%" style={{ border: BORDER }} bg={SECTION_BACKGROUNDS.white}>
                                <Group justify="space-between" align="baseline">
                                    <Eyebrow>Free</Eyebrow>
                                    <Text fz={28} fw={900} c="gray.9">
                                        $0
                                    </Text>
                                </Group>
                                <List spacing="sm" c="gray.7" fz={15} icon={<IconCheck size={16} stroke={1.5} />}>
                                    {pricing.free.map((f) => (
                                        <List.Item key={f}>{f}</List.Item>
                                    ))}
                                </List>
                                <CTAButton label="Install free" href={extension.marketplace} target="_blank" icon={<IconArrowRight size={18} />} />
                            </Stack>
                        </Grid.Col>
                        {extension.pro ? (
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Stack gap="md">
                                    <ProBox extension={{ ...extension, pro: pricing.pro }} catalog={catalog} />
                                </Stack>
                            </Grid.Col>
                        ) : landing.next ? (
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Stack gap="sm" p="lg" h="100%" style={{ border: BORDER }} bg={SECTION_BACKGROUNDS.white}>
                                    <Eyebrow>When you need the next thing</Eyebrow>
                                    <Text fz={16} c="gray.6" lh={1.7}>{landing.next.text}</Text>
                                    <Anchor href={landing.next.href} fz={15} fw={800} c="gray.9" underline="always">{landing.next.label}</Anchor>
                                </Stack>
                            </Grid.Col>
                        ) : null}
                    </Grid>
                </Stack>
            </Band>

            <FAQ
                id="questions"
                subtitle="Questions"
                title="Before you install"
                questions={faq.map(([question, answer]) => ({ question, answer }))}
                background={showcase.length % 2 === 0 ? 'gray' : 'white'}
                ta="center"
            />

            {/* The doors again, and the rest of the family */}
            <Band background={showcase.length % 2 === 0 ? 'white' : 'gray'}>
                <Stack gap="lg" align="center" ta="center">
                    <H2 ta="center">{landing.closing}</H2>
                    <Doors extension={extension} />
                    <Anchor component={Link} to={VSCODE.path} fz={14} fw={700} c="gray.9">
                        All {VSCODE.extensions.length} extensions
                    </Anchor>
                </Stack>
            </Band>
        </>
    )
}
