import { ContactForm } from '../components/ContactForm'
import { LegalDocument } from '../components/LegalDocument'
import { useSeoMeta } from '../hooks/use-seo-meta'

/**
 * /about and /contact (src/data/trust.js), drawn like the /legal documents so
 * the site keeps one look for its institutional pages. A document with a
 * `form` (the contact page) ends with the contact form.
 */
export function TrustPage({ document: doc }) {
    useSeoMeta({ title: doc.title, description: doc.description, url: doc.path })
    return (
        <>
            <LegalDocument document={doc} />
            {doc.form && <ContactForm form={doc.form} />}
        </>
    )
}
