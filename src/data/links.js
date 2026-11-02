/**
 * The addresses written inside the text of /about, /contact and /legal, made
 * clickable. One splitter for the page (components/LegalDocument.jsx) and the
 * prerendered HTML (scripts/prerender-legal.js), so the two link the same
 * words — and the Markdown twin, converted from that HTML, carries the links.
 *
 * It matches `https://…` and bare addresses of the two house domains
 * (`ciromaciel.click/tools`, `myinfrastructure.click`). A sentence's final
 * period is never part of the address.
 */
const ADDRESS = /https?:\/\/[^\s,;()]+|(?:[\w-]+\.)*(?:ciromaciel|myinfrastructure)\.click(?:\/[^\s,;()]*)?/g

const SITE_HOST = 'ciromaciel.click'

/** [{ text }, { text, href, isExternal }, …] */
export function splitLinks(text) {
    const parts = []
    let last = 0
    for (const match of String(text).matchAll(ADDRESS)) {
        const address = match[0].replace(/[.:]+$/, '')
        if (match.index > last) parts.push({ text: text.slice(last, match.index) })
        const url = address.startsWith('http') ? address : `https://${address}`
        const { host, pathname } = new URL(url)
        const isExternal = host !== SITE_HOST
        parts.push({ text: address, href: isExternal ? url : pathname, isExternal })
        last = match.index + address.length
    }
    if (last < String(text).length) parts.push({ text: String(text).slice(last) })
    return parts
}
