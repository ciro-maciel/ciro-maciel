import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { theme } from '@ciromaciel/components-kit'

import { Template } from './components/Template'
import { Home } from './pages/Home'
import { Legal } from './pages/Legal'
import { Branding } from './pages/Branding'
import { Tools } from './pages/Tools'
import { Books } from './pages/Books'
import { Book } from './pages/Book'
import { BookKit } from './pages/BookKit'
import { PROFESSION_KITS, ProfessionKit } from './pages/ProfessionKit'
import { KitRedirect } from './pages/KitRedirect'
import { KitItem } from './pages/KitItem'
import { SnippetIndex, SnippetPage } from './pages/Snippet'
import { AlternativesIndex, AlternativePage } from './pages/Alternatives'
import { Awesome } from './pages/Awesome'
import { McpIndex, McpPage } from './pages/Mcp'
import { CcmStack } from './pages/CcmStack'
import { PROMPTS } from './data/prompts'
import { RULES } from './data/rules'
import { AGENTS } from './data/agents'
import { NotFound } from './pages/NotFound'
import { Search } from './pages/Search'
import { TrustPage } from './pages/TrustPage'
import { ABOUT, CONTACT } from './data/trust'

/* O DESIGN SYSTEM É `lazy()`, E SOZINHO. São 3.5k linhas com toda a API do
   kit: importá-lo estaticamente levou o bundle de 291KB para 517KB, e quem
   abre a home pagava o download e o parse de uma página que talvez nunca
   visite. As outras rotas ficam estáticas porque são pequenas.

   O Suspense que segura este import está em volta das rotas, abaixo. */
/** /books/<slug>/kit: the kit of a profession book (documents to fill in) or
    the kit of a task book (prompts to paste), by the book. */
/** /solutions/<slug> on this domain: the page lives on myinfrastructure.click
    (an old address Google still shows under the root). A full-page redirect,
    so the visitor and the crawler both land on the real page. */
function SolutionRedirect() {
    const { slug } = useParams()
    useEffect(() => {
        window.location.replace(`https://myinfrastructure.click/solutions/${slug}`)
    }, [slug])
    return null
}

function KitPage() {
    const { slug } = useParams()
    return PROFESSION_KITS[slug] ? <ProfessionKit /> : <BookKit />
}

const DesignSystem = lazy(() => import('./pages/DesignSystem').then((m) => ({ default: m.DesignSystem })))

/**
 * The whole site, without the router: the browser wraps it in a BrowserRouter
 * (main.jsx) and the build in a StaticRouter (entry-server.jsx), so the HTML
 * written at build time is the same tree React hydrates.
 */
export function App() {
    return (
        <MantineProvider
            theme={theme}
            defaultColorScheme="auto"
        >
            {/* `fallback={null}` e não um spinner: o chunk do design
                system carrega em milissegundos numa conexão comum, e um
                spinner que pisca é mais ruído do que a espera. */}
            <Suspense fallback={null}>
            <Routes>
                {/* /links NÃO EXISTE MAIS, e não tem rota própria.
                    Removida em 19/09/2026 a pedido do dono do site, junto
                    com `pages/Links.jsx`, `components/LinkCard.jsx`,
                    `links.css` e o bloco `LINKS` de `data/site.js`.

                    Era a página "link na bio": rodava fora do Template,
                    sem header e sem footer, com um card por porta de
                    saída, para quem chegava do perfil do Instagram ou do
                    LinkedIn.

                    NÃO HÁ REDIRECIONAMENTO, de propósito. O endereço cai
                    no `path="*"` lá embaixo e responde o 404, que é o
                    certo: a página não mudou de lugar, ela deixou de
                    existir, e um redirect para a home fingiria que o
                    conteúdo continua em algum lugar. O 404 diz o que
                    aconteceu e oferece a home como saída.

                    SE O LINK AINDA ESTIVER NO PERFIL de alguma rede, é lá
                    que ele precisa ser trocado — este repositório não tem
                    como consertar isso. */}
                <Route element={<Template />}>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/branding"
                        element={<Branding />}
                    />
                    <Route
                        path="/design-system"
                        element={<DesignSystem />}
                    />
                    {/* SÓ O CATÁLOGO É ROTA DESTE APP. Cada ferramenta,
                        em /tools/<id>/, é um app separado que o build
                        copia para dist/tools/ (scripts/build-tools.js) —
                        o Hoster serve o index.html dela antes de chegar
                        aqui. No `bun run dev` ela não existe, e o link
                        cai no 404 deste app. */}
                    <Route
                        path="/tools"
                        element={<Tools />}
                    />
                    {/* THE SHELF AND ONE PAGE PER BOOK (01/10/2026), in
                        English like /tools. The data is generated from
                        the books repository: scripts/sync-books.js. */}
                    <Route
                        path="/books"
                        element={<Books />}
                    />
                    <Route
                        path="/books/:slug"
                        element={<Book />}
                    />
                    {/* THE ONLINE KIT OF A BOOK, inside the site since
                        01/10/2026 (it was a static page at /kit/<id>/). */}
                    <Route
                        path="/books/:slug/kit"
                        element={<KitPage />}
                    />
                    {/* ONE TASK OF A KIT PER PAGE (03/10/2026), so a
                        search for the task lands on it and not on the
                        whole kit: pages/KitItem.jsx. */}
                    <Route
                        path="/books/:slug/kit/:item"
                        element={<KitItem />}
                    />
                    {/* THE MICRO-LEADS (03/10/2026): ready prompts,
                        rules for an agent's CLAUDE.md and agents with a
                        job, an index and one page each (pages/
                        Snippet.jsx). In English like /tools and /books;
                        the slugs are in Portuguese, like the search
                        pages of the tools. */}
                    {[PROMPTS, RULES, AGENTS].map(collection => [
                        <Route
                            key={collection.path}
                            path={collection.path}
                            element={<SnippetIndex collection={collection} />}
                        />,
                        <Route
                            key={`${collection.path}/:slug`}
                            path={`${collection.path}/:slug`}
                            element={<SnippetPage collection={collection} />}
                        />,
                    ])}
                    {/* THE ALTERNATIVES (19/10/2026): one page per paid or
                        closed Mac app, with the free and open-source app
                        that does the same job (pages/Alternatives.jsx). */}
                    <Route
                        path="/alternatives"
                        element={<AlternativesIndex />}
                    />
                    <Route
                        path="/alternatives/:slug"
                        element={<AlternativePage />}
                    />
                    {/* THE AWESOME LISTS (10/11/2026): the founder's curated
                        lists on GitHub, grouped by who they are for
                        (pages/Awesome.jsx). */}
                    <Route
                        path="/awesome"
                        element={<Awesome />}
                    />
                    {/* CCM STACK (09/11/2026): the open stack that makes a coding
                        agent follow the rules, and its Pro (pages/CcmStack.jsx). */}
                    <Route
                        path="/ccm-stack"
                        element={<CcmStack />}
                    />
                    {/* THE MCP CONNECTORS (21/10/2026): what an MCP connector
                        is, and one page per connector, from the catalog of
                        mcp.myagents.click (pages/Mcp.jsx). */}
                    <Route
                        path="/mcp"
                        element={<McpIndex />}
                    />
                    <Route
                        path="/mcp/:id"
                        element={<McpPage />}
                    />
                    {/* The kit's first address, /kit/escritorio, was in a
                        preview of the book: it keeps working. */}
                    <Route
                        path="/kit/:id"
                        element={<KitRedirect />}
                    />
                    {/* Termos, privacidade e segurança, na mesma forma
                        do site do produto: uma rota, três documentos. */}
                    <Route
                        path="/legal/:type"
                        element={<Legal />}
                    />
                    {/* A URL ANTIGA DA PRIVACIDADE, que esteve no
                        sitemap e pode estar em algum lugar que este
                        repositório não controla. `replace` para ela não
                        entrar no histórico do navegador — quem clicar em
                        "voltar" depois do redirecionamento sairia daqui
                        e cairia nele de novo. */}
                    <Route
                        path="/solutions/:slug"
                        element={<SolutionRedirect />}
                    />
                    {/* WHO AND HOW TO REACH, the pages an agent checks
                        before trusting the site (06/10/2026). */}
                    {/* THE SITE'S SEARCH (16/10/2026): every result, with
                        filters. The header's magnifier opens a window and
                        sends here; the index is dist/search.json
                        (scripts/search-index.js). */}
                    <Route
                        path="/search"
                        element={<Search />}
                    />
                    <Route
                        path="/about"
                        element={<TrustPage document={ABOUT} />}
                    />
                    <Route
                        path="/contact"
                        element={<TrustPage document={CONTACT} />}
                    />
                    {/* /privacy is where agents look for the policy. The
                        static file carries the full text (scripts/
                        prerender-legal.js); the app sends the reader to
                        the one address the site links to. */}
                    <Route
                        path="/privacy"
                        element={
                            <Navigate
                                to="/legal/privacy"
                                replace
                            />
                        }
                    />
                    <Route
                        path="/politica-de-privacidade"
                        element={
                            <Navigate
                                to="/legal/privacy"
                                replace
                            />
                        }
                    />
                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Route>
            </Routes>
            </Suspense>
        </MantineProvider>
    )
}
