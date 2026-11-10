import { Box, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'
import { SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { useSeoMeta } from '../hooks/useSeoMeta'
import { AWESOME } from '../data/awesome'
import { awesomeSeo } from '../data/seo'

/**
 * /awesome: the founder's curated lists, grouped by who they are for. Each card
 * opens the list's repository on GitHub, where the README is the list itself.
 * The same words go to the crawler through scripts/prerender.js.
 */

const BORDER = '1px solid var(--mantine-color-gray-2)'

export function Awesome() {
    useSeoMeta(awesomeSeo())
    return (
        <>
            <Box
                bg={SECTION_BACKGROUNDS.gray}
                py={{ base: 64, md: 96 }}
            >
                <Container size="lg">
                    <Stack
                        gap="lg"
                        maw={820}
                    >
                        <Text
                            fz={13}
                            fw={800}
                            tt="uppercase"
                            c="gray.5"
                            lts="1.5px"
                        >
                            {AWESOME.eyebrow}
                        </Text>
                        <Text
                            c="gray.9"
                            component="h1"
                            m={0}
                            fz={{ base: 28, sm: 38, md: 46 }}
                            lh={1.15}
                            fw={800}
                            style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
                        >
                            {AWESOME.title}
                        </Text>
                        <Text
                            fz={{ base: 16, md: 18 }}
                            c="dimmed"
                            lh={1.6}
                        >
                            {AWESOME.description}
                        </Text>
                    </Stack>
                </Container>
            </Box>
            <Container
                size="lg"
                py={{ base: 48, md: 80 }}
            >
                <Stack gap={56}>
                    {AWESOME.groups.map(group => (
                        <Stack
                            key={group.id}
                            gap="md"
                        >
                            <Stack gap={4}>
                                <Title
                                    order={2}
                                    fz={{ base: 22, md: 26 }}
                                    c="gray.9"
                                >
                                    {group.title}
                                </Title>
                                <Text
                                    c="gray.6"
                                    lh={1.6}
                                    maw={720}
                                >
                                    {group.line}
                                </Text>
                            </Stack>
                            <SimpleGrid
                                cols={{ base: 1, sm: 2, md: 3 }}
                                spacing={0}
                                style={{ borderTop: BORDER, borderLeft: BORDER }}
                            >
                                {group.lists.map(list => (
                                    <Box
                                        key={list.slug}
                                        component="a"
                                        href={`${list.url}?ref=site-awesome`}
                                        p={{ base: 'lg', md: 'xl' }}
                                        style={{ borderRight: BORDER, borderBottom: BORDER, textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Stack gap="xs">
                                            <Text
                                                fw={800}
                                                fz={18}
                                                c="gray.9"
                                            >
                                                {list.title}
                                            </Text>
                                            <Text
                                                c="gray.6"
                                                lh={1.6}
                                            >
                                                {list.description}
                                            </Text>
                                            <Group
                                                gap={6}
                                                c="gray.9"
                                            >
                                                <Text
                                                    c="gray.9"
                                                    fw={700}
                                                    fz="sm"
                                                >
                                                    Abrir a lista
                                                </Text>
                                                <IconArrowRight size={16} />
                                            </Group>
                                        </Stack>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Stack>
                    ))}
                    <Text
                        size="sm"
                        c="gray.5"
                        maw={720}
                    >
                        {AWESOME.note}
                    </Text>
                </Stack>
            </Container>
        </>
    )
}
