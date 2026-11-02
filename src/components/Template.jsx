import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout, scrollBehavior } from '@ciromaciel/components-kit'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { FOOTER } from '../data/catalog'
import { IconBrandGithub, IconMailOpened } from '@tabler/icons-react'
import { SITE } from '../data/site'

/**
 * Casca do site: o SiteHeader, com os menus, e o rodapé (SiteFooter) em volta da
 * rota atual. Os menus e o que eles listam estão em `data/catalog.js`.
 */
export function Template() {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: scrollBehavior() })
    }, [location.pathname])

    return (
        <Layout>
            {/* THE BAR WITH THE MENUS, since 01/10/2026: `SiteHeader`, not the
                kit's `Header`, which only takes anchors. The logotype, its
                208 px and the two calls to action are the same as before; the
                long history of the logotype's size is in SiteHeader. */}
            <SiteHeader
                ctas={[
                    { label: 'GitHub', href: SITE.github, icon: IconBrandGithub, isHiddenOnPhone: true },
                    // 31/10/2026: the filled button captures the contact (the letters) instead of
                    // sending people to LinkedIn; LinkedIn stays in the footer.
                    { label: 'Receber as cartas', scrollTo: 'cartas', icon: IconMailOpened },
                ]}
            />

            <main style={{ flex: 1 }}>
                <Outlet />
            </main>

            {/* THE FOOTER (SiteFooter.jsx): the same one on every tool page
                at /tools/<id>, synced into `applications` by
                scripts/sync-footer.js. The data is FOOTER in data/catalog.js. */}
            <SiteFooter footer={FOOTER} />
        </Layout>
    )
}
