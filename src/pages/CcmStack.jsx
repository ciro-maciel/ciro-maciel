import { Box, Container, Grid, List, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { CodeBlock, CTABanner, FAQ, FeaturesGrid, Hero, Pricing, SECTION_BACKGROUNDS, SectionHeader, StatsGrid } from '@ciromaciel/components-kit'
import { IconArrowRight, IconBook, IconBrandGithub, IconCheck, IconShieldCheck, IconVolume, IconX, IconListCheck } from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/useSeoMeta'
import { NewsletterBox } from '../components/NewsletterBox'
import { CCM_STACK } from '../data/ccm-stack'

/**
 * /ccm-stack (09/11/2026): the page of the CCM Stack, the open stack that makes a coding agent
 * follow the rules. It sells the free install first and the Pro second.
 *
 * The bands alternate from the hero down, gray, white, gray, white..., and the footer takes the
 * other tone of the last band by itself (site-footer.css). The words live in data/ccm-stack.js,
 * which scripts/prerender.js also reads.
 */

const BORDER = '1px solid var(--mantine-color-gray-2)'
const HOW_ICONS = [IconShieldCheck, IconBook, IconListCheck, IconVolume]

function BeforeAfter() {
    const { problem } = CCM_STACK
    const column = (side, Icon, isAfter) => (
        <Paper
            p={{ base: 'lg', md: 'xl' }}
            radius={0}
            bg={isAfter ? SECTION_BACKGROUNDS.gray : SECTION_BACKGROUNDS.white}
            style={{ border: isAfter ? '2px solid var(--mantine-color-gray-9)' : BORDER }}
        >
            <Text
                fz={13}
                fw={800}
                tt="uppercase"
                lts="1.5px"
                c={isAfter ? 'gray.9' : 'gray.5'}
                mb="md"
            >
                {side.title}
            </Text>
            <List
                spacing="sm"
                center
                icon={
                    <ThemeIcon
                        variant="transparent"
                        color={isAfter ? 'gray.9' : 'gray.5'}
                        size={20}
                    >
                        <Icon
                            size={18}
                            stroke={2}
                        />
                    </ThemeIcon>
                }
            >
                {side.items.map(item => (
                    <List.Item key={item}>
                        <Text
                            fz={{ base: 15, md: 16 }}
                            c={isAfter ? 'gray.9' : 'gray.7'}
                            lh={1.5}
                        >
                            {item}
                        </Text>
                    </List.Item>
                ))}
            </List>
        </Paper>
    )
    return (
        <Box
            component="section"
            id="por-que"
            bg={SECTION_BACKGROUNDS.white}
            py={{ base: 80, md: 120 }}
        >
            <Container size="lg">
                <Stack gap={48}>
                    <Stack
                        gap="md"
                        align="center"
                        ta="center"
                        maw={860}
                        mx="auto"
                    >
                        <SectionHeader
                            subtitle={problem.subtitle}
                            title={problem.title}
                            ta="center"
                        />
                        <Text
                            fz={{ base: 17, md: 18 }}
                            c="gray.6"
                            lh={1.6}
                        >
                            {problem.description}
                        </Text>
                    </Stack>
                    <SimpleGrid
                        cols={{ base: 1, md: 2 }}
                        spacing="lg"
                    >
                        {column(problem.before, IconX, false)}
                        {column(problem.after, IconCheck, true)}
                    </SimpleGrid>
                </Stack>
            </Container>
        </Box>
    )
}

function Start() {
    const { start } = CCM_STACK
    return (
        <Box
            component="section"
            id="comecar"
            bg={SECTION_BACKGROUNDS.gray}
            py={{ base: 80, md: 120 }}
        >
            <Container size="lg">
                <Stack gap={48}>
                    <SectionHeader
                        subtitle={start.subtitle}
                        title={start.title}
                        ta="center"
                    />
                    <Grid gutter="lg">
                        {start.steps.map((step, index) => (
                            <Grid.Col
                                key={step.title}
                                span={{ base: 12, md: 4 }}
                            >
                                <Stack
                                    gap="sm"
                                    h="100%"
                                >
                                    <Text
                                        fz={13}
                                        fw={800}
                                        tt="uppercase"
                                        lts="1.5px"
                                        c="gray.5"
                                    >
                                        Passo {index + 1}
                                    </Text>
                                    <Title
                                        order={3}
                                        fz={{ base: 20, md: 22 }}
                                        fw={900}
                                        c="gray.9"
                                    >
                                        {step.title}
                                    </Title>
                                    <Text
                                        fz={15}
                                        c="gray.6"
                                        lh={1.6}
                                    >
                                        {step.description}
                                    </Text>
                                    <CodeBlock>{step.code}</CodeBlock>
                                </Stack>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Stack>
            </Container>
        </Box>
    )
}

function plansOf() {
    const { free, pro } = CCM_STACK.plans
    const proCta = pro.isOnSale ? pro.cta : { label: pro.waiting.label, href: pro.waiting.href }
    return [
        { ...free, pricePrefix: null },
        {
            ...pro,
            pricePrefix: null,
            period: ` ${pro.period}`,
            highlight: true,
            highlightBadge: 'COM O CIRO',
            cta: proCta,
            note: pro.isOnSale ? pro.note : `${pro.note} ${pro.waiting.note}`,
        },
    ]
}

export function CcmStack() {
    const { seo, hero, how, proof, plans, faq, closing } = CCM_STACK
    useSeoMeta({ title: seo.title, description: seo.description, url: CCM_STACK.path })

    return (
        <>
            <Hero
                subtitle={hero.subtitle}
                title={hero.title}
                description={hero.description}
                cta={{ label: 'Começar grátis', href: '#comecar', icon: <IconArrowRight size={18} /> }}
                note={hero.note}
                image={CCM_STACK.art}
                mediaMaw={360}
                // The kit's hero size breaks this two-line title one word per line beside the art;
                // the section-title size keeps it to five lines on a laptop.
                titleFz="var(--fz-section-title)"
                background="gray"
            />

            <BeforeAfter />

            <FeaturesGrid
                id="como-funciona"
                subtitle={how.subtitle}
                title={how.title}
                description={how.description}
                items={how.items.map((item, index) => ({
                    title: item.title,
                    description: item.description,
                    visual: { type: 'icon-large', icon: HOW_ICONS[index] },
                }))}
                background="gray"
            />

            <StatsGrid
                id="o-que-recebe"
                subtitle={proof.subtitle}
                title={proof.title}
                items={proof.stats}
                note={proof.note}
                background="white"
            />

            <Start />

            <Pricing
                id="planos"
                subtitle={plans.subtitle}
                title={plans.title}
                description={plans.description}
                billingOptions={[]}
                plans={plansOf()}
                background="white"
            />

            <FAQ
                id="perguntas"
                subtitle={faq.subtitle}
                title={faq.title}
                questions={faq.questions}
                background="gray"
            />

            <CTABanner
                subtitle={closing.subtitle}
                title={closing.title}
                description={closing.description}
                cta={{ ...closing.cta, icon: <IconBrandGithub size={18} />, target: '_blank' }}
                background="white"
            />

            <NewsletterBox background={SECTION_BACKGROUNDS.gray} />
        </>
    )
}
