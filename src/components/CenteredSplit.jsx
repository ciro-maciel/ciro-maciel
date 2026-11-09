import { Box, Container, Stack, Text, Title } from '@mantine/core'
import { FeatureSplit } from '@ciromaciel/components-kit'

/**
 * A FeatureSplit whose title sits on the middle axis (09/11/2026).
 *
 * Every section title of the site is centered, and the kit's FeatureSplit has no option for it:
 * its title always opens the left column. This is the same answer LineShowcase gives: the
 * subtitle and title centered at the top of the band, and the split below without its own
 * title, carrying the description, the list, the art and the CTA.
 */
export function CenteredSplit({ id, subtitle, title, background, ...split }) {
    return (
        <Box
            id={id}
            component="section"
            bg={background}
        >
            <Container
                size="lg"
                pt={{ base: 64, md: 96 }}
            >
                <Stack
                    gap="md"
                    maw={720}
                    mx="auto"
                    align="center"
                    ta="center"
                >
                    <Text
                        fz={13}
                        fw={700}
                        c="gray.6"
                        tt="uppercase"
                        style={{ letterSpacing: '0.1em' }}
                    >
                        {subtitle}
                    </Text>
                    <Title
                        order={2}
                        fz={{ base: 32, sm: 42, md: 52 }}
                        lh={1.08}
                        fw={800}
                        style={{ letterSpacing: '-0.03em' }}
                    >
                        {title}
                    </Title>
                </Stack>
            </Container>
            <FeatureSplit
                {...split}
                background={background}
            />
        </Box>
    )
}
