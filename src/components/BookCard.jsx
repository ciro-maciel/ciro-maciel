import { Badge, Box, Group, Image, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconArrowRight } from '@tabler/icons-react'

/**
 * One book on a shelf: the cover, the volume and level, the title and the
 * line that says what it is for. The whole card is the link to the book's
 * page — the store button lives there, next to what the reader needs to
 * decide, never on the shelf.
 */
export function BookCard({ book, line }) {
    return (
        <Box
            component={Link}
            to={`/books/${book.slug}`}
            className="book-card"
        >
            <Image
                src={book.cover}
                alt={`Capa de ${book.title}`}
                radius={0}
                className="book-card__cover"
                loading="lazy"
            />
            <Stack
                gap={8}
                mt="md"
            >
                <Group gap={6}>
                    <Badge
                        radius={0}
                        variant="filled"
                        color={book.levelColor}
                        size="sm"
                    >
                        Nível {book.level}
                    </Badge>
                    <Text
                        fz={12}
                        fw={800}
                        tt="uppercase"
                        c="gray.5"
                        lts="1px"
                    >
                        Volume {book.volume}
                        {book.kit ? ' · com kit online' : ''}
                    </Text>
                </Group>
                <Title
                    order={3}
                    fz={22}
                    lh={1.2}
                >
                    {book.title}
                </Title>
                <Text
                    c="gray.6"
                    lh={1.5}
                    fz={15}
                >
                    {line ?? book.subtitle}
                </Text>
                <Group
                    gap={6}
                    mt={4}
                >
                    <Text
                        fw={800}
                        fz={14}
                        c="gray.9"
                    >
                        Conhecer o livro
                    </Text>
                    <IconArrowRight
                        size={16}
                        stroke={2}
                    />
                </Group>
            </Stack>
        </Box>
    )
}
