/**
 * Everything the founder has put out, in one place: the books and their kits,
 * the tools and the extensions, the Infrastructure. The header menus, the
 * /books pages and the extensions block of /tools all read from here.
 *
 * THE RULE THIS FILE OBEYS (brand/arquitetura.md, rewritten 01/10/2026): the
 * root shows what is live, with its name and one line, and sends each thing
 * to where it is bought or used. No price here, no plan, no cart: those live
 * in each thing's own store — Amazon, Chrome Web Store, the VS Code
 * Marketplace, myinfrastructure.click, or the tool's own page. Nothing that is
 * not live enters, not even as "em breve".
 *
 * Links come in three kinds, and the menu treats each one differently:
 *   `to`      a route of this app (react-router)
 *   `anchor`  a section of the home
 *   `href`    a full page load: another site (opens in a new tab) or a static
 *             page this app does not route, such as /tools/<id> and /kit/<id>
 */
import { IconPlugConnected,
    IconArticle,
    IconBook,
    IconBooks,
    IconBolt,
    IconBrandChrome,
    IconBrandYoutube,
    IconChartBar,
    IconBriefcase,
    IconCode,
    IconComponents,
    IconEye,
    IconMicrophone,
    IconPalette,
    IconFileCode,
    IconPrompt,
    IconRobot,
    IconRoute,
    IconSpeakerphone,
    IconSparkles,
    IconStack2, IconTool,
    IconUser,
    IconUsers,
} from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import BOOKS_DATA from './books.json'
import { BOOK_EXTRAS, SERIES, amazonSearch } from './book-extras'
import { EXTENSIONS, STORES } from './extensions'

export { EXTENSIONS, STORES }

export { SERIES }
import { SITE } from './site'

// ─── Books ────────────────────────────────────────────────────────────────
//
// The content comes from each book.yml, through `scripts/sync-books.js`.
// What the book.yml does not know is kept here: the menu line and the store.
//
export const LEVELS = {
    1: { name: 'Fundamentos', color: '#2E6B58' },
    2: { name: 'No ofício', color: '#B8741F' },
    3: { name: 'Construir', color: '#33509A' },
    4: { name: 'Profissão', color: '#86303D' },
}

export const BOOKS = BOOKS_DATA.map(book => {
    const extras = BOOK_EXTRAS[book.slug] ?? {}
    return { ...book, ...extras, store: extras.amazon ?? amazonSearch(book), levelColor: LEVELS[book.level].color }
})

export const bookBySlug = slug => BOOKS.find(book => book.slug === slug)



// ─── The menus ────────────────────────────────────────────────────────────

const bookItem = (book, line) => ({
    name: book.title,
    description: line,
    icon: IconBook,
    to: `/books/${book.slug}`,
    where: `Volume ${book.volume}${book.kit ? ' · com kit online' : ''}`,
})

const KIT_BOOKS = BOOKS.filter(book => book.kit)
const kitOf = slug => KIT_BOOKS.find(book => book.slug === slug)
const OFFICE = bookBySlug('ia-no-escritorio')
const FIRST_JOB = bookBySlug('ia-no-primeiro-trabalho')
const SMALL_BUSINESS = bookBySlug('ia-no-pequeno-negocio')
const SALES = bookBySlug('ia-no-atendimento-e-nas-vendas')
const CLASSROOM = bookBySlug('ia-na-sala-de-aula')
const ACCOUNTING = bookBySlug('ia-na-contabilidade')
const LAW = bookBySlug('ia-na-advocacia')
const BUILD = bookBySlug('construir-com-ia')
const AGENTS = bookBySlug('feito-para-agentes')

/*
 * THE RULE OF THE HEADER (30/10/2026). Each item lives in ONE place: the
 * menus had 58 items and 17 of them twice (every book under "Produtos" and
 * again under "Para quem", the lines, the prompts, the connectors). A repeated
 * item makes the reader wonder whether the two are different things, and
 * every new book added two rows. Now:
 *
 *   Produtos   what he made, by kind: the tools, the lines, the books (the
 *              covers lead to each one, the series to all of them)
 *   Para quem  the books by what the reader does, each with its kit
 *   Sobre      who he is and where to follow him
 *
 * A menu shows kinds, not the catalog: the full lists live on their index
 * pages (/books, /tools). At most ~8 items per column. A new book enters
 * "Para quem" only; a new tool enters /tools, not here, unless it is a kind.
 */
export const MENUS = [
    {
        label: 'Produtos',
        width: 1180,
        columns: [
            {
                label: 'Ferramentas',
                span: 1.3,
                items: [
                    { name: 'As ferramentas', description: 'Abrem no navegador, a maioria sem cadastro', icon: IconTool, to: '/tools' },
                    { name: 'CCM Stack', description: 'O seu agente de código seguindo as suas regras', icon: IconStack2, to: '/ccm-stack' },
                    { name: 'Para o Chrome', description: 'History e Pomodoro, na Chrome Web Store', icon: IconBrandChrome, to: '/tools', state: { scrollTo: 'extensoes' } },
                    { name: 'Para o VS Code', description: 'Banco de dados, commit, erros e APIs no editor', icon: IconCode, to: '/tools', state: { scrollTo: 'extensoes' } },
                    { name: 'Speech to Text', description: 'Segure uma tecla, fale e solte, no seu computador', icon: IconMicrophone, href: '/tools/speech-to-text' },
                    { name: 'Conectores MCP', description: 'O seu assistente de IA usando Google, Apple e mais', icon: IconPlugConnected, to: '/mcp' },
                    { name: 'Pedidos prontos', description: 'Um pedido por página, com o teste ao lado', icon: IconPrompt, to: '/prompts' },
                    { name: 'Regras para o CLAUDE.md', description: 'Cada uma nasceu de um erro na minha operação', icon: IconFileCode, to: '/rules' },
                    { name: 'Agentes com cargo', description: 'O arquivo pronto, com o que ele nunca faz sozinho', icon: IconRobot, to: '/agents' },
                ],
            },
            {
                // Each sentence is the hero of the line's own site (brand/messaging.md),
                // no price, as the root shows every line.
                label: 'As linhas',
                items: [
                    { name: 'Infrastructure', description: 'Onde a ideia passa a existir: o seu agente coloca o app no ar', icon: IconBolt, href: 'https://myinfrastructure.click', where: 'myinfrastructure.click' },
                    { name: 'Operations', description: 'Saiba o que acontece no que você colocou no ar', icon: IconChartBar, href: 'https://myoperations.click', where: 'myoperations.click' },
                    { name: 'Customers', description: 'Saiba onde cada pessoa está, e o que fazer agora', icon: IconUsers, href: 'https://mycustomers.click', where: 'mycustomers.click' },
                    { name: 'Marketing', description: 'Saiba o que trouxe cada pessoa, e fique com o contato dela', icon: IconSpeakerphone, href: 'https://mymarketing.click', where: 'mymarketing.click' },
                    { name: 'Agents', description: 'Um bot que faz o trabalho, e pede o seu sim antes do que não tem volta', icon: IconRobot, href: 'https://myagents.click', where: 'myagents.click' },
                ],
                note: 'Os produtos de cada linha estão no site dela.',
            },
            {
                // The books by their covers, each to its page; the books by
                // what the reader does, with their kits, are "Para quem".
                label: 'Livros',
                side: true,
                covers: BOOKS.map(book => ({ src: book.cover, alt: `Capa de ${book.title}`, to: `/books/${book.slug}` })),
                items: [{ name: 'A série O Novo Básico', description: 'Quatro níveis, do primeiro pedido à profissão', icon: IconBooks, to: '/books' }],
            },
        ],
    },
    {
        // One column since 30/10/2026: the books by what the reader does, each
        // with its kit as the small second link. "Quem constrói" and "Para
        // todo dia" only repeated what "Produtos" already has.
        label: 'Para quem',
        width: 820,
        columns: [
            {
                label: 'Um livro para o que você faz',
                cols: 2,
                items: [
                    { ...bookItem(BOOKS[0], BOOKS[0].forWhom), icon: IconSparkles, where: undefined },
                    { ...bookItem(BOOKS[1], BOOKS[1].forWhom), icon: IconEye, where: undefined },
                    ...[OFFICE, FIRST_JOB, SMALL_BUSINESS, SALES, CLASSROOM, ACCOUNTING, LAW].map(book => ({
                        ...bookItem(book, book.forWhom),
                        icon: IconBriefcase,
                        where: undefined,
                        ...(kitOf(book.slug) ? { extra: { label: 'Kit online', to: book.kit.path } } : {}),
                    })),
                    { ...bookItem(BUILD, BUILD.forWhom), icon: IconRoute, where: undefined, ...(kitOf(BUILD.slug) ? { extra: { label: 'Kit online', to: BUILD.kit.path } } : {}) },
                    { ...bookItem(AGENTS, AGENTS.forWhom), icon: IconPlugConnected, where: undefined, ...(kitOf(AGENTS.slug) ? { extra: { label: 'Kit online', to: AGENTS.kit.path } } : {}) },
                ],
            },
        ],
    },
    {
        label: 'Sobre',
        width: 980,
        columns: [
            {
                label: 'Quem conduz',
                items: [
                    { name: 'Quem conduz', description: 'Mais de vinte anos, e por que isso importa agora', icon: IconUser, anchor: 'construo' },
                ],
            },
            {
                label: 'Acompanhe',
                items: [
                    // First since 29/10/2026: the blog is where he writes, the place to follow him.
                    { name: 'Blog', description: 'Textos sobre IA, código e rotina', icon: IconArticle, href: SITE.blog, where: 'blog.ciromaciel.click' },
                    { name: 'YouTube', description: 'Os vídeos das ferramentas e do caminho', icon: IconBrandYoutube, href: SITE.youtube, where: '@ciro-maciel' },
                    { name: 'Branding', description: 'O sistema visual da casa, aberto', icon: IconPalette, to: '/branding' },
                    { name: 'Design system', description: 'Os componentes e as regras, para pessoas e agentes', icon: IconComponents, to: '/design-system' },
                ],
            },
        ],
    },
]

// ─── The footer ───────────────────────────────────────────────────────────
//
// THE MAP OF THE SITE, NOT A COPY OF THE HEADER (30/10/2026). It had five
// columns and 56 links: every book, every kit, every audience, the header
// again. A footer is where a reader who got to the end finds the kinds of
// page, who runs the site and how to reach him, and the legal pages. So:
// four columns, at most ~8 links each, and the links go to INDEX pages
// (/books, /tools), never one row per book or per tool. Crawlers find each
// page through the indexes and the sitemap. The same footer closes every tool
// page (scripts/sync-footer.js).
const internal = (label, to) => ({ label, component: Link, to })
const external = (label, href) => ({ label, href, target: '_blank', rel: 'noopener noreferrer' })

export const FOOTER_SECTIONS = [
    {
        title: 'Produtos',
        links: [
            internal('Livros', '/books'),
            internal('Ferramentas', '/tools'),
            internal('Conectores MCP', '/mcp'),
            internal('Pedidos prontos', '/prompts'),
            internal('Regras para o CLAUDE.md', '/rules'),
            internal('Agentes com cargo', '/agents'),
            internal('Alternativas para Mac', '/alternatives'),
        ],
    },
    {
        title: 'As linhas',
        links: [
            external('Infrastructure', 'https://myinfrastructure.click'),
            external('Operations', 'https://myoperations.click'),
            external('Customers', 'https://mycustomers.click'),
            external('Marketing', 'https://mymarketing.click'),
            external('Agents', 'https://myagents.click'),
        ],
    },
    {
        title: 'Sobre',
        links: [
            { label: 'Quem conduz', href: '/#construo' },
            internal('Sobre', '/about'),
            external('Blog', SITE.blog),
            external('YouTube', SITE.youtube),
            internal('Marca', '/branding'),
            internal('Design system', '/design-system'),
        ],
    },
    {
        title: 'Contato e legal',
        links: [
            internal('Contato', '/contact'),
            external('Falar comigo', SITE.whatsapp),
            internal('Termos de uso', '/legal/terms'),
            internal('Privacidade', '/legal/privacy'),
            internal('Segurança', '/legal/security'),
            { label: 'LLMs.txt (IA)', href: '/llms.txt' },
        ],
    },
]

/**
 * THE WHOLE FOOTER, as data: the columns above, the line under the logotype,
 * the social channels and the copyright line. `components/SiteFooter.jsx`
 * draws it on the site, and every tool page at /tools/<id> draws the same
 * thing: `scripts/sync-footer.js` writes this object, links made absolute,
 * into `applications/shared/site-footer/`. Change the footer here, never there.
 */
export const FOOTER = {
    name: SITE.name,
    tagline: 'Construir é de todos. As ferramentas e o saber é que não eram.',
    sections: FOOTER_SECTIONS,
    // The icon comes from the label (SiteFooter.jsx, SOCIAL_ICONS).
    social: [
        { label: 'GitHub', href: SITE.github },
        { label: 'LinkedIn', href: SITE.linkedin },
        { label: 'YouTube', href: SITE.youtube },
        { label: 'Instagram', href: SITE.instagram },
    ],
    madeBy: 'Todos os direitos reservados',
}
