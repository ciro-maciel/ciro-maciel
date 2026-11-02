import { useEffect, useState } from 'react'
import { Box, Text, Stack } from '@mantine/core'

/**
 * DocsNav — índice lateral com marcação da seção atual.
 *
 * IntersectionObserver e não scroll listener: o browser calcula a interseção
 * fora da thread principal, então a marcação acompanha o scroll sem custo.
 *
 * rootMargin recorta a janela a uma faixa no terço superior — sem isso, uma
 * seção longa continua "ativa" enquanto a próxima já ocupa a tela.
 */
export function DocsNav({ sections }) {
    const [active, setActive] = useState(sections[0]?.id)

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                const visible = entries.filter(e => e.isIntersecting)
                if (visible.length > 0) setActive(visible[0].target.id)
            },
            { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
        )

        sections.forEach(s => {
            const el = document.getElementById(s.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [sections])

    return (
        <Box
            component="nav"
            aria-label="Índice do design system"
            pos="sticky"
            // Mesmo recuo do scrollMarginTop das seções: o índice para de
            // subir na mesma linha em que o capítulo ancorado começa.
            top={100}
        >
            <Text
                fz={11}
                fw={800}
                tt="uppercase"
                lts="1.5px"
                c="gray.4"
                mb="md"
            >
                Nesta página
            </Text>
            <Stack gap={0}>
                {sections.map(s => {
                    const isActive = active === s.id
                    return (
                        <Box
                            key={s.id}
                            component="a"
                            href={`#${s.id}`}
                            py={7}
                            pl="md"
                            style={{
                                textDecoration: 'none',
                                borderLeft: `2px solid ${
                                    isActive ? 'var(--mantine-color-gray-9)' : 'var(--mantine-color-gray-2)'
                                }`,
                                transition: 'border-color 0.2s ease',
                            }}
                        >
                            <Text
                                fz={13}
                                fw={isActive ? 800 : 500}
                                c={isActive ? 'gray.9' : 'gray.5'}
                                lh={1.4}
                            >
                                {s.label}
                            </Text>
                        </Box>
                    )
                })}
            </Stack>
        </Box>
    )
}
