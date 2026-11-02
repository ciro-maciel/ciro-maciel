import { useEffect } from 'react'
import { CTABanner } from '@ciromaciel/components-kit'
import { IconArrowLeft } from '@tabler/icons-react'
import { useSeoMeta } from '../hooks/useSeoMeta'

export function NotFound() {
    useSeoMeta({
        title: 'Página não encontrada',
        description: 'Esta página não existe.',
        url: '/404',
    })

    // NOINDEX WHILE THIS PAGE IS ON SCREEN. The Hoster answers any unknown
    // address with the app's shell and status 200, so Google gets a page with
    // no content where it expected a 404: a soft 404, which it may index as a
    // copy of the site. The meta tag is the signal a single-page app can give
    // (myinfrastructure.click does the same for its 404); it leaves with the
    // page, so the next route is indexable again.
    useEffect(() => {
        const meta = Object.assign(document.createElement('meta'), { name: 'robots', content: 'noindex' })
        document.head.appendChild(meta)
        return () => meta.remove()
    }, [])

    return (
        <CTABanner
            subtitle="Erro 404"
            title="Esta página não existe"
            titleOrder={1}
            description="O endereço está errado ou a página saiu do ar. O conteúdo do site está todo na home."
            cta={{
                label: 'Voltar para a home',
                href: '/',
                leftSection: <IconArrowLeft size={20} />,
                // `lg`, the size of every other button on the site: the
                // banner's default is `xl`, which outweighed the page.
                size: 'lg',
            }}
            background="white"
        />
    )
}
