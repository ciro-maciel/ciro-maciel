import { Navigate, useParams } from 'react-router-dom'
import { NotFound } from './NotFound'

/**
 * /kit/<id>: the first address of the online kits, a static page until
 * 01/10/2026. The kits now live at /books/<slug>/kit; the old short names
 * keep working.
 */
const OLD_KITS = { escritorio: '/books/ia-no-escritorio/kit' }

export function KitRedirect() {
    const { id } = useParams()
    const target = OLD_KITS[id]
    return target ? (
        <Navigate
            to={target}
            replace
        />
    ) : (
        <NotFound />
    )
}
