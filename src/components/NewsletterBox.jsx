import { Box, Button, Container, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconArrowRight, IconMailOpened } from '@tabler/icons-react'

/**
 * "Cartas do Ciro": since 16/11/2026 the letters live on LinkedIn, as a newsletter there (Ciro: "as cartas do
 * Ciro agora vão começar a ser do LinkedIn"). The box no longer collects an e-mail: it sends the reader to the
 * newsletter's page, where LinkedIn's own Subscribe button sends each edition by notification and e-mail.
 * Until then it was the Marketing Newsletter embed (list `cartas`), which stays untouched in that product.
 */
export const NEWSLETTER_URL = 'https://www.linkedin.com/newsletters/cartas-do-ciro-7527692289108992000/'

/*
 * `background` is one of the kit's SECTION_BACKGROUNDS, like every band of the
 * home. Until 21/10/2026 the box painted Mantine's `white`, which in dark mode
 * is a third tone (#1a2127), between the two the bands alternate.
 */
export function NewsletterBox({ background }) {
    return (
        <Box
            component="section"
            id="cartas"
            aria-labelledby="newsletter-box-title"
            py={{ base: 56, md: 72 }}
            bg={background}
        >
            <Container size="md">
                <Group
                    align="flex-start"
                    wrap="nowrap"
                    gap="xl"
                >
                    <ThemeIcon
                        variant="light"
                        size={56}
                        radius={0}
                        color="gray"
                        visibleFrom="xs"
                    >
                        <IconMailOpened
                            size={28}
                            stroke={1.5}
                        />
                    </ThemeIcon>
                    <Stack
                        gap="md"
                        style={{ minWidth: 0, flex: 1 }}
                    >
                        <Text
                            component="h2"
                            id="newsletter-box-title"
                            m={0}
                            fw={900}
                            tt="uppercase"
                            size="sm"
                            lts="2px"
                            c="gray.9"
                        >
                            Cartas do Ciro
                        </Text>
                        <Text
                            size="lg"
                            lh={1.8}
                            c="gray.8"
                        >
                            Toda segunda, a semana em IA vista por quem constrói todo dia: o que as pessoas da Anthropic, da OpenAI e quem programa com agentes mostraram, testaram e mediram, com quem disse e o link para o post.
                        </Text>
                        <Box>
                            <Button
                                component="a"
                                href={NEWSLETTER_URL}
                                target="_blank"
                                rel="noopener"
                                size="lg"
                                rightSection={<IconArrowRight size={20} />}
                                w={{ base: '100%', sm: 'auto' }}
                            >
                                Assinar no LinkedIn
                            </Button>
                        </Box>
                        <Text
                            size="sm"
                            c="gray.6"
                            lh={1.7}
                        >
                            A carta sai no LinkedIn: quem assina recebe cada edição por notificação e por e-mail, e sai quando quiser, pela própria página da newsletter.
                        </Text>
                    </Stack>
                </Group>
            </Container>
        </Box>
    )
}
