import { Box, Group, Mark, Text, UnstyledButton } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconPlugConnected, IconBook, IconBooks, IconChecklist, IconFileText, IconPrompt, IconRobot, IconScale, IconTool, IconFileCode, IconArrowsExchange } from '@tabler/icons-react'
import { KINDS, highlightParts } from '../../search/search'

const KIND_ICONS = { book: IconBook, kit: IconBooks, task: IconChecklist, prompt: IconPrompt, rule: IconFileCode, agent: IconRobot, tool: IconTool, alternative: IconArrowsExchange, mcp: IconPlugConnected, page: IconFileText, legal: IconScale }

// The text with the matched words marked, accent-insensitive
export function Marked({ text, query }) {
    if (!query) return text
    return highlightParts(text, query).map((part, i) =>
        part.isMatch ? (
            <Mark
                key={i}
                color="yellow"
                // Dark text on the yellow in both themes: the inherited light text vanished on it in dark mode
                style={{ color: 'var(--mantine-color-dark-9)', padding: 0 }}
            >
                {part.text}
            </Mark>
        ) : (
            part.text
        )
    )
}

/**
 * Where a result opens. The tools are apps of their own under /tools/<id>/,
 * served before this app: they need a full page load, never the router.
 */
export function resultLinkProps(result) {
    return result.kind === 'tool' ? { component: 'a', href: result.path } : { component: Link, to: result.path }
}

/**
 * One result: the icon of its kind, the title and where it lives; on the page,
 * also the snippet. `isActive` paints the row the keyboard is on.
 */
export function ResultRow({ result, query, isCompact = false, isActive = false, onPick, ...rest }) {
    const Icon = KIND_ICONS[result.kind] || IconFileText
    return (
        <UnstyledButton
            {...resultLinkProps(result)}
            onClick={onPick}
            display="block"
            w="100%"
            px={isCompact ? 'md' : 0}
            py={isCompact ? 10 : 'md'}
            bg={isActive ? 'var(--mantine-color-default-hover)' : undefined}
            style={{ textDecoration: 'none', color: 'inherit' }}
            {...rest}
        >
            <Group
                gap={12}
                wrap="nowrap"
                align="flex-start"
            >
                <Box
                    w={isCompact ? 28 : 34}
                    h={isCompact ? 28 : 34}
                    bg="var(--mantine-color-default-hover)"
                    c="dimmed"
                    style={{ flexShrink: 0, display: 'grid', placeItems: 'center' }}
                >
                    <Icon
                        size={isCompact ? 15 : 17}
                        stroke={1.5}
                    />
                </Box>
                <Box
                    miw={0}
                    flex={1}
                >
                    <Text
                        fz={isCompact ? 14 : 16}
                        fw={600}
                        lineClamp={2}
                    >
                        <Marked
                            text={result.title}
                            query={query}
                        />
                    </Text>
                    {!isCompact && result.snippet && (
                        <Text
                            fz={14}
                            c="dimmed"
                            lh={1.55}
                            mt={4}
                            lineClamp={2}
                        >
                            <Marked
                                text={result.snippet}
                                query={query}
                            />
                        </Text>
                    )}
                    <Text
                        fz={11}
                        fw={800}
                        tt="uppercase"
                        lts="1px"
                        c="dimmed"
                        mt={4}
                        lineClamp={1}
                    >
                        {[KINDS[result.kind]?.label, result.context].filter(Boolean).join(' · ')}
                    </Text>
                </Box>
            </Group>
        </UnstyledButton>
    )
}
