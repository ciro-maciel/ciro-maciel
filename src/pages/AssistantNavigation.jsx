import { useEffect } from 'react'
import { Anchor, Box, Container, Grid, Image, List, Stack, Table, Text } from '@mantine/core'
import { CodeBlock, CTAButton, SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconArrowRight } from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/use-seo-meta'
import { ASSISTANT_NAVIGATION as PAGE } from '../data/assistant-navigation'

/**
 * /assistant-navigation (19/11/2026): the open-source project's own page on the site, so it has an address, a search and
 * a measure of its own (the product kit of the Manager Dashboard), and an honest next step to the Agents line. The words
 * live in data/assistant-navigation.js; scripts/prerender.js writes the same words for crawlers.
 */

const BORDER = '1px solid var(--mantine-color-gray-2)'

function Label({ children }) {
    return (
        <Text fz={13} fw={800} tt="uppercase" lts="1.5px" c="gray.5">
            {children}
        </Text>
    )
}

function Band({ background, children }) {
    return (
        <Box component="section" bg={SECTION_BACKGROUNDS[background]} py={{ base: 64, md: 96 }}>
            <Container size="lg">{children}</Container>
        </Box>
    )
}

function Heading({ children }) {
    return (
        <Text component="h2" m={0} c="gray.9" fz={{ base: 26, md: 34 }} fw={900} lh={1.2} style={{ letterSpacing: '-0.02em' }}>
            {children}
        </Text>
    )
}

export function AssistantNavigation() {
    useSeoMeta({ title: PAGE.seo.title, description: PAGE.seo.description, url: PAGE.path })
    useEffect(() => {
        const previous = document.documentElement.lang
        document.documentElement.lang = 'en'
        return () => {
            document.documentElement.lang = previous
        }
    }, [])
    const { hero, why, install, tools, next } = PAGE
    return (
        <>
            <Band background="gray">
                <Grid gutter={{ base: 40, md: 64 }} align="center">
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Stack gap="lg" align="flex-start">
                            <Label>{hero.eyebrow}</Label>
                            <Text component="h1" m={0} c="gray.9" fz={{ base: 32, sm: 44, md: 52 }} lh={1.1} fw={900} style={{ letterSpacing: '-0.03em', textWrap: 'balance' }}>
                                {hero.title}
                            </Text>
                            <Text fz={{ base: 16, md: 18 }} c="gray.6" lh={1.6} maw={680}>
                                {hero.description}
                            </Text>
                            <CTAButton label="Install it" href="#install" icon={<IconArrowRight size={18} />} />
                            <Anchor href={PAGE.repo} target="_blank" rel="noopener noreferrer" fz={14} fw={700} c="gray.9">
                                The code on GitHub
                            </Anchor>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Image src={hero.image} alt={hero.alt} radius={0} w={160} />
                    </Grid.Col>
                </Grid>
            </Band>

            <Band background="white">
                <Stack gap="md" maw={720}>
                    <Label>Why another browser tool</Label>
                    <Heading>{why.title}</Heading>
                    <Text fz={16} c="gray.6" lh={1.7}>{why.text}</Text>
                    <List spacing="xs" c="gray.7" fz={15}>
                        {why.items.map((item) => <List.Item key={item}>{item}</List.Item>)}
                    </List>
                </Stack>
            </Band>

            <Box id="install" style={{ scrollMarginTop: 96 }}>
                <Band background="gray">
                    <Stack gap="md" maw={760}>
                        <Label>Install</Label>
                        <Heading>{install.title}</Heading>
                        <List type="ordered" spacing="xs" c="gray.7" fz={15}>
                            {install.steps.map((step) => <List.Item key={step}>{step}</List.Item>)}
                        </List>
                        <CodeBlock>{install.command}</CodeBlock>
                        <Text fz={14} c="gray.6" lh={1.6}>{install.note}</Text>
                        <Anchor href={PAGE.release} target="_blank" rel="noopener noreferrer" fz={14} fw={700} c="gray.9">
                            The latest release
                        </Anchor>
                    </Stack>
                </Band>
            </Box>

            <Band background="white">
                <Stack gap="md">
                    <Label>The tools</Label>
                    <Heading>{tools.title}</Heading>
                    <Box style={{ overflowX: 'auto', border: BORDER }}>
                        <Table verticalSpacing="sm" horizontalSpacing="md" fz={14}>
                            <Table.Tbody>
                                {tools.items.map(([name, what, risk]) => (
                                    <Table.Tr key={name}>
                                        <Table.Td><Text component="code" fz={13} fw={700} c="gray.9">{name}</Text></Table.Td>
                                        <Table.Td c="gray.7">{what}</Table.Td>
                                        <Table.Td><Text fz={12} fw={800} tt="uppercase" lts="1.5px" c="gray.5">{risk}</Text></Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Box>
                    <Text fz={14} c="gray.6" lh={1.6} maw={720}>{tools.note}</Text>
                </Stack>
            </Band>

            <Band background="gray">
                <Stack gap="sm" maw={720}>
                    <Label>Next step</Label>
                    <Text fz={16} c="gray.6" lh={1.7}>{next.text}</Text>
                    <Anchor href={next.href} fz={15} fw={700} c="gray.9">{next.label}</Anchor>
                </Stack>
            </Band>
        </>
    )
}
