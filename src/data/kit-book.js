/**
 * The book a kit page shows when the book is not in the catalogue.
 *
 * A kit can open by its address before its book is on sale: `open: true` in
 * its data module (the founder's call of 23/10/2026, for volumes 9 and 10).
 * The book still stays out of books.json, the menus and the /books page
 * (brand/arquitetura.md: nothing that is not live enters the catalogue), so
 * the kit shows the stand-in its data module carries, and every link that
 * would go to the book's page goes to /books instead. In development any kit
 * with a stand-in opens, as before.
 *
 * Callers look the book up in the catalogue first: this module reads no
 * books.json, so the Node build scripts can import it as it is.
 */
export function standInBook(slug, kit) {
    if (!kit?.preview || !(kit.open || import.meta.env?.DEV)) return null
    return { ...kit.preview, slug, store: null, cover: `/books/${slug}.jpg`, isOnSale: false, kit: { label: 'Kit online', path: `/books/${slug}/kit`, ...kit.preview.kit } }
}

/** Where "the book" links: its page, or /books while it is not on sale. */
export const bookHome = book => (book.isOnSale === false ? '/books' : `/books/${book.slug}`)
