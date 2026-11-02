import { useEffect } from 'react'
import { Anchor, Box, Container, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconMailOpened } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

/**
 * "Cartas do Ciro": the subscribe box of Marketing Newsletter, installed the
 * way any customer installs it — one script that defines
 * <newsletter-subscribe>, the list's slug, and this site in the list's
 * allowed domains. The consent box never comes ticked, and nobody receives a
 * letter before confirming by e-mail (double opt-in, in the product).
 *
 * The prerender writes the empty element; the script is added after
 * hydration, once per page, so server and browser render the same markup.
 * The consent text and the list's name live in the Newsletter panel.
 */
export const NEWSLETTER_EMBED_URL = 'https://newsletter.worker.mymarketing.click/subscribe.js'
const SCRIPT_ID = 'newsletter-subscribe-script'
const LIST_SLUG = 'cartas'

function useNewsletterEmbed() {
    useEffect(() => {
        if (typeof window === 'undefined' || window.customElements?.get('newsletter-subscribe') || document.getElementById(SCRIPT_ID)) return
        const script = document.createElement('script')
        script.id = SCRIPT_ID
        script.src = NEWSLETTER_EMBED_URL
        script.defer = true
        document.body.appendChild(script)
    }, [])
}

/*
 * `background` is one of the kit's SECTION_BACKGROUNDS, like every band of the
 * home. Until 21/10/2026 the box painted Mantine's `white`, which in dark mode
 * is a third tone (#1a2127), between the two the bands alternate.
 */
export function NewsletterBox({ background }) {
    useNewsletterEmbed()
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
                            O que estou construindo e aprendendo, por e-mail. Você só começa a receber depois de confirmar pelo e-mail que chega na hora.
                        </Text>
                        <Box
                            p={{ base: 'md', sm: 'xl' }}
                            bg="gray.0"
                            style={{ border: '1px solid var(--mantine-color-gray-2)' }}
                        >
                            <newsletter-subscribe list={LIST_SLUG} />
                        </Box>
                        <Text
                            size="sm"
                            c="gray.6"
                            lh={1.7}
                        >
                            Toda carta traz o link para sair na hora.{' '}
                            <Anchor
                                component={Link}
                                to="/legal/privacy"
                                c="dark"
                                fw={600}
                                inherit
                            >
                                Política de privacidade
                            </Anchor>
                            .
                        </Text>
                    </Stack>
                </Group>
            </Container>
        </Box>
    )
}
