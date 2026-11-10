import { Anchor, Box, Button, Container, Divider, Group, List, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import {
    IconBan,
    IconBook,
    IconBrandWhatsapp,
    IconClock,
    IconCreditCard,
    IconEye,
    IconFileDescription,
    IconMail,
    IconMessageCircle,
    IconPlugConnected,
    IconScale,
    IconShare,
    IconShieldCheck,
    IconTool,
    IconUser,
} from '@tabler/icons-react'

import { SITE } from '../data/site'
import { LEGAL_UPDATED } from '../data/legal'
import { splitLinks } from '../data/links'

const ICONS = {
    ban: IconBan,
    book: IconBook,
    card: IconCreditCard,
    clock: IconClock,
    eye: IconEye,
    file: IconFileDescription,
    mail: IconMail,
    message: IconMessageCircle,
    plug: IconPlugConnected,
    scale: IconScale,
    share: IconShare,
    shield: IconShieldCheck,
    tools: IconTool,
    user: IconUser,
}

/** Text with its addresses as links (data/links.js). */
function Linked({ text }) {
    return splitLinks(text).map((part, i) =>
        part.href ? (
            <Anchor
                key={i}
                href={part.href}
                c="gray.9"
                fw={700}
                style={{ overflowWrap: 'anywhere' }}
                {...(part.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
                {part.text}
            </Anchor>
        ) : (
            part.text
        )
    )
}

/** A paragraph, or a bullet list when the block is an array. */
function Block({ block }) {
    if (Array.isArray(block)) {
        return (
            <List
                size="md"
                c="gray.7"
                spacing={6}
            >
                {block.map(item => (
                    <List.Item key={item}>
                        <Linked text={item} />
                    </List.Item>
                ))}
            </List>
        )
    }
    return (
        <Text
            size="md"
            c="gray.7"
            lh={1.7}
        >
            <Linked text={block} />
        </Text>
    )
}

/**
 * One of the site's own legal documents (src/data/legal.js), drawn in the
 * layout of the kit's LegalPrivacy / LegalTerms — title, subtitle, divider,
 * intro, a section per icon — so the /legal pages keep one look with the
 * kit's LegalSecurity. It ends with the way to reach Ciro and the date.
 * The /about and /contact pages (src/data/trust.js) use it too, with their
 * own `closing` line and `updated` date.
 */
export function LegalDocument({ document: doc }) {
    return (
        <Box
            py={100}
            // A stage, so the kit's band tone: Mantine's `white` is the elevated
            // surface (#1a2127 in dark mode), a third tone on the page (21/10/2026)
            bg={SECTION_BACKGROUNDS.white}
        >
            <Container size="md">
                <Stack gap={64}>
                    <Stack gap="sm">
                        <Title
                            order={1}
                            ta="center"
                            tt="uppercase"
                            lts="2px"
                            fw={900}
                            fz={{ base: 28, sm: 42 }}
                        >
                            {doc.title}
                        </Title>
                        <Text
                            ta="center"
                            c="gray.5"
                            size="sm"
                            fw={800}
                            tt="uppercase"
                            lts="2px"
                        >
                            {doc.subtitle}
                        </Text>
                    </Stack>

                    <Divider color="gray.2" />

                    <Stack gap="lg">
                        {doc.intro.map(paragraph => (
                            <Text
                                key={paragraph}
                                size="lg"
                                lh={1.8}
                                c="gray.8"
                            >
                                {paragraph}
                            </Text>
                        ))}
                    </Stack>

                    <Stack gap={48}>
                        {doc.sections.map(section => {
                            const Icon = ICONS[section.icon] ?? IconFileDescription
                            return (
                                <Group
                                    key={section.title}
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
                                        <Icon
                                            size={28}
                                            stroke={1.5}
                                        />
                                    </ThemeIcon>
                                    <Stack
                                        gap="sm"
                                        style={{ minWidth: 0 }}
                                    >
                                        <Text
                                            component="h2"
                                            m={0}
                                            fw={900}
                                            tt="uppercase"
                                            size="sm"
                                            lts="2px"
                                            c="gray.9"
                                        >
                                            {section.title}
                                        </Text>
                                        {section.body.map((block, i) => (
                                            <Block
                                                key={i}
                                                block={block}
                                            />
                                        ))}
                                    </Stack>
                                </Group>
                            )
                        })}
                    </Stack>

                    <Divider color="gray.2" />

                    <Stack
                        gap="md"
                        align="center"
                    >
                        <Text
                            ta="center"
                            c="gray.7"
                        >
                            {doc.closing ?? 'Dúvidas ou pedidos sobre estes termos e os seus dados: fale comigo.'}
                        </Text>
                        <Button
                            component="a"
                            href={SITE.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            leftSection={<IconBrandWhatsapp size={18} />}
                        >
                            Falar no WhatsApp
                        </Button>
                        <Text
                            size="sm"
                            c="gray.5"
                        >
                            Última atualização: {doc.updated ?? LEGAL_UPDATED}.
                        </Text>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}
