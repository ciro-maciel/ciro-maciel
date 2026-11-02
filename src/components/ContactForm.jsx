import { useEffect } from 'react'
import { Anchor, Box, Container, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import { SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { IconMail } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

/**
 * The contact form, served by Marketing Forms and installed the way any
 * customer installs it (marketing/forms/embed): the script defines
 * <forms-embed>, the element reads the public schema and posts the answers
 * to the worker, which accepts them only from this site's domain (the form's
 * allowed domains) and keeps the consent proof.
 *
 * The prerender writes the empty element; the script is added after
 * hydration, once per page, so server and browser render the same markup.
 * The fields, the consent text and the thank-you message live in the form,
 * in the Forms panel — this file only says where it goes.
 */
export const FORMS_EMBED_URL = 'https://forms.worker.mymarketing.click/embed.js'
const SCRIPT_ID = 'forms-embed-script'

function useFormsEmbed() {
    useEffect(() => {
        if (typeof window === 'undefined' || window.customElements?.get('forms-embed') || document.getElementById(SCRIPT_ID)) return
        const script = document.createElement('script')
        script.id = SCRIPT_ID
        script.src = FORMS_EMBED_URL
        script.defer = true
        document.body.appendChild(script)
    }, [])
}

export function ContactForm({ form }) {
    useFormsEmbed()
    return (
        <Box
            component="section"
            aria-labelledby="contact-form-title"
            py={80}
            // Gray, after the white band of LegalDocument: gray.0 is the same tone
            // as that band, and the two ran together with no seam (21/10/2026).
            // The boxed form inside stays `white`, the elevated surface.
            bg={SECTION_BACKGROUNDS.gray}
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
                        <IconMail
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
                            id="contact-form-title"
                            m={0}
                            fw={900}
                            tt="uppercase"
                            size="sm"
                            lts="2px"
                            c="gray.9"
                        >
                            {form.title}
                        </Text>
                        <Text
                            size="lg"
                            lh={1.8}
                            c="gray.8"
                        >
                            {form.lead}
                        </Text>
                        <Box
                            p={{ base: 'md', sm: 'xl' }}
                            bg="white"
                            style={{ border: '1px solid var(--mantine-color-gray-2)' }}
                        >
                            <forms-embed form={form.code} />
                        </Box>
                        <Text
                            size="sm"
                            c="gray.6"
                            lh={1.7}
                        >
                            {form.note}{' '}
                            <Anchor
                                component={Link}
                                to="/legal/privacy"
                                c="gray.9"
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
