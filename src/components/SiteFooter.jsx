import { ColorSchemeToggle, Logotype, SECTION_BACKGROUNDS } from '@ciromaciel/components-kit'
import { ActionIcon, Anchor, Box, Container, Divider, Group, SimpleGrid, Stack, Text } from '@mantine/core'
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandYoutube } from '@tabler/icons-react'

/* Depois do kit, porque corrige um layout que vem de dentro dele: a coluna de
   ícones e a linha de baixo. O arquivo explica. Mora aqui, e não no main.jsx,
   para viajar junto com o rodapé que corrige. */
import './site-footer.css'

/**
 * SiteFooter — the footer of ciromaciel.click, on the site AND on every tool
 * page at /tools/<id> (19/10/2026: "o rodapé sempre o grande").
 *
 * ONE SOURCE. This file, `site-footer.css` and `FOOTER` in data/catalog.js are
 * the footer. `scripts/sync-footer.js` copies the two files into
 * `applications/shared/site-footer/` and writes `FOOTER` there as JSON with
 * absolute links (a tool is another app: `/about` there would fall on
 * `/tools/<id>/about`). The site build runs the sync before it builds the
 * tools, so a deploy never ships a stale footer; `bun scripts/sync-footer.js
 * --check` says whether the committed copy in `applications` drifted.
 *
 * SO THIS FILE IMPORTS ONLY what every tool has too: the kit, Mantine and the
 * Tabler icons. No router: a link with `component` (the site's `Link`) gets
 * it, a link with `href` is a plain anchor.
 *
 * The structure is the one of myinfrastructure.click (01/10/2026): the brand on
 * its own band, then one column per menu and the social icons, then the
 * copyright line. The kit's Footer splits the band 50/50 between the brand and
 * the links, and with six columns each would fall to ~85px; here the brand
 * sits above the grid and the columns take the whole width.
 *
 * GRAY by default: every page of the site and every tool page ends on a white
 * band, and the footer is what changes tone. The top rule stays for the day a
 * page ends gray.
 */
const SOCIAL_ICONS = {
    GitHub: IconBrandGithub,
    LinkedIn: IconBrandLinkedin,
    YouTube: IconBrandYoutube,
    Instagram: IconBrandInstagram,
}

export function SiteFooter({ footer, background = SECTION_BACKGROUNDS.gray }) {
    const { name, tagline, sections = [], social = [], madeBy } = footer

    return (
        <Box
            component="footer"
            py="xl"
            // The tone is the opposite of the page's last section (site-footer.css); this is the fallback.
            style={{ borderTop: '1px solid var(--mantine-color-gray-2)', background: `var(--site-footer-bg, var(--mantine-color-${background.replace('.', '-')}))` }}
        >
            <Container size="xl">
                {/* A marca, na própria faixa. O parágrafo fica limitado para
                    não virar uma linha de 1200px de largura. */}
                <Box maw={420}>
                    <Logotype
                        word={name}
                        signature={null}
                    />
                    <Text
                        component="span"
                        display="block"
                        mt="lg"
                        c="gray.6"
                        lh={1.6}
                    >
                        {tagline}
                    </Text>
                </Box>

                {/* Os links, com a largura inteira abaixo da marca. Uma coluna
                    por menu no desktop, quatro no tablet e duas no celular,
                    que é onde o rótulo precisa da linha para si. */}
                <Box mt={48}>
                    <SimpleGrid
                        cols={{ base: 2, sm: 4, lg: sections.length + (social.length > 0 ? 1 : 0) }}
                        spacing="xl"
                        verticalSpacing="xl"
                    >
                        {sections.map(section => (
                            <Stack
                                key={section.title}
                                gap="md"
                            >
                                <Text
                                    c="gray.9"
                                    fw={900}
                                    size="xs"
                                    tt="uppercase"
                                    lts="1.5px"
                                >
                                    {section.title}
                                </Text>
                                <Stack gap="xs">
                                    {section.links.map(({ label, component, ...link }) => (
                                        <Anchor
                                            key={label}
                                            c="gray.6"
                                            size="sm"
                                            fw={500}
                                            {...link}
                                            component={component || 'a'}
                                        >
                                            {label}
                                        </Anchor>
                                    ))}
                                </Stack>
                            </Stack>
                        ))}

                        {social.length > 0 && (
                            <Stack gap="md">
                                <Text
                                    c="gray.9"
                                    fw={900}
                                    size="xs"
                                    tt="uppercase"
                                    lts="1.5px"
                                >
                                    Social
                                </Text>
                                <Group gap="xs">
                                    {social.map(({ label, href }) => {
                                        const Icon = SOCIAL_ICONS[label]
                                        return (
                                            <ActionIcon
                                                key={label}
                                                size="md"
                                                variant="subtle"
                                                color="gray"
                                                radius="0"
                                                component="a"
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={label}
                                            >
                                                {Icon ? (
                                                    <Icon
                                                        size={18}
                                                        stroke={1.5}
                                                    />
                                                ) : (
                                                    label
                                                )}
                                            </ActionIcon>
                                        )
                                    })}
                                </Group>
                            </Stack>
                        )}
                    </SimpleGrid>
                </Box>

                <Divider
                    my="xl"
                    color="gray.2"
                />

                {/* A LINHA DE BAIXO: copyright de um lado, reserva e botão de
                    tema do outro.

                    `rlg-footer-bottom` é a classe do kit, a mesma que o
                    `Footer` de lá usa: ela centra as duas metades QUANDO ELAS
                    QUEBRAM e as deixa nas pontas enquanto couberem lado a lado.
                    A regra vive no `global.css` do kit porque precisa de
                    `@container` e de seletor de filho — nenhum dos dois passa
                    por `style` ou `styles` do Mantine. */}
                <Group
                    justify="space-between"
                    wrap="wrap"
                    gap="sm"
                    w="100%"
                    mt={30}
                    className="rlg-footer-bottom"
                >
                    <Text
                        size="xs"
                        fw={800}
                        tt="uppercase"
                        lts="1px"
                        c="gray.5"
                    >
                        {`© ${new Date().getFullYear()} ${name}`}
                    </Text>
                    {/* O botão de tema mora aqui, não no cabeçalho
                        (decidido em 16/10/2026): é uma escolha que se faz uma
                        vez, e a barra fica com o logo e as duas chamadas. */}
                    <Group
                        gap="sm"
                        wrap="nowrap"
                        className="site-footer-end"
                    >
                        {madeBy && (
                            <Text
                                size="xs"
                                fw={800}
                                tt="uppercase"
                                lts="1px"
                                c="gray.5"
                            >
                                {madeBy}
                            </Text>
                        )}
                        <ColorSchemeToggle />
                    </Group>
                </Group>
            </Container>
        </Box>
    )
}
