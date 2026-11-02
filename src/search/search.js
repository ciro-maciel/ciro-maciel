/**
 * The site's search: books, kit tasks, prompts, rules, agents, tools and pages.
 *
 * The same engine as an earlier dashboard's search, cut to what a public site needs: words
 * weighed by where they appear (the title counts more than the body), accents
 * and case ignored, word starts, synonyms, one typo on long words, "a phrase"
 * and -word. Filters by kind live in the page, not in operators: a visitor
 * does not type `tipo:`.
 *
 * Plain functions over an array of documents (scripts/search-index.js writes
 * it), so the test runs it without a browser.
 */

export const MIN_LENGTH = 2

// What a result can be, in the order the filter shows them
export const KINDS = {
    book: { label: 'Livro', plural: 'Livros' },
    kit: { label: 'Kit', plural: 'Kits' },
    task: { label: 'Tarefa do kit', plural: 'Tarefas dos kits' },
    prompt: { label: 'Pedido', plural: 'Pedidos' },
    rule: { label: 'Regra', plural: 'Regras' },
    agent: { label: 'Agente', plural: 'Agentes' },
    tool: { label: 'Ferramenta', plural: 'Ferramentas' },
    alternative: { label: 'Alternativa', plural: 'Alternativas' },
    mcp: { label: 'Conector MCP', plural: 'Conectores MCP' },
    page: { label: 'Página', plural: 'Páginas' },
    legal: { label: 'Documento', plural: 'Documentos' },
}

// Accent- and case-insensitive, one character in, one character out (so highlight indexes line up)
const foldChar = ch => ch.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().charAt(0) || ch
export const fold = text =>
    String(text ?? '')
        .split('')
        .map(foldChar)
        .join('')

const words = text => fold(text).match(/[a-z0-9]+/g) || []

// Words people use for what the site calls by another name
const SYNONYMS = {
    emprego: ['trabalho', 'vaga', 'curriculo'],
    salario: ['holerite', 'pagamento'],
    contracheque: ['holerite'],
    dinheiro: ['caixa', 'financas', 'preco', 'cobranca'],
    venda: ['vendas', 'vendedor', 'cliente'],
    vender: ['vendas', 'vendedor', 'cliente'],
    loja: ['balcao', 'cliente', 'vendas'],
    mei: ['pequeno', 'negocio'],
    empresa: ['negocio', 'escritorio'],
    chatgpt: ['ia', 'pedido', 'prompt'],
    prompt: ['pedido', 'pedidos'],
    pedido: ['prompt', 'prompts'],
    zap: ['whatsapp'],
    whats: ['whatsapp'],
    reuniao: ['ata'],
    gasto: ['caixa', 'boletos'],
    livro: ['livros', 'volume'],
    ebook: ['livro', 'livros'],
    app: ['ferramenta', 'aplicativo'],
    extensao: ['chrome', 'vscode'],
}

export function parseQuery(raw) {
    const query = { terms: [], phrases: [], excludes: [] }
    const text = String(raw ?? '').replace(/"([^"]+)"/g, (_, phrase) => {
        if (fold(phrase).trim()) query.phrases.push(fold(phrase).trim())
        return ' '
    })
    for (const token of text.split(/\s+/).filter(Boolean)) {
        if (token.startsWith('-') && token.length > 1) query.excludes.push(...words(token.slice(1)))
        else query.terms.push(...words(token))
    }
    return query
}

const isEmptyQuery = q => !q.terms.length && !q.phrases.length

// Small typos on long words still find their target ("curriulo" finds "curriculo")
function isNear(a, b) {
    if (Math.abs(a.length - b.length) > 1 || a.length < 5) return false
    let i = 0
    let j = 0
    let edits = 0
    while (i < a.length && j < b.length) {
        if (a[i] === b[j]) {
            i++
            j++
            continue
        }
        if (++edits > 1) return false
        if (a.length > b.length) i++
        else if (b.length > a.length) j++
        else {
            i++
            j++
        }
    }
    return edits + (a.length - i) + (b.length - j) <= 1
}

/**
 * The documents as they arrive from /search.json, with their words folded once.
 * The index is built once per array, and kept.
 */
const indexes = new WeakMap()
function indexOf(docs) {
    if (!indexes.has(docs)) {
        indexes.set(
            docs,
            docs.map(doc => ({
                doc,
                titleWords: words(doc.title),
                descriptionWords: words(`${doc.description} ${doc.context}`),
                bodyWords: [...new Set(words(doc.body))],
                folded: fold(`${doc.title} ${doc.description} ${doc.context} ${doc.body}`),
            }))
        )
    }
    return indexes.get(docs)
}

// How well one query word matches a document: exact word, word start, synonym or a near miss
function termScore(entry, term) {
    const alternatives = SYNONYMS[term] || []
    let best = 0
    for (const [fieldWords, weight] of [
        [entry.titleWords, 3],
        [entry.descriptionWords, 1.5],
        [entry.bodyWords, 0.5],
    ]) {
        for (const w of fieldWords) {
            let s = 0
            if (w === term) s = 10
            else if (w.startsWith(term)) s = 7
            else if (alternatives.some(a => w === a || w.startsWith(a))) s = 5
            else if (isNear(w, term)) s = 4
            if (s * weight > best) best = s * weight
        }
    }
    return best
}

function scoreOf(entry, q) {
    const all = [...entry.titleWords, ...entry.descriptionWords, ...entry.bodyWords]
    if (q.excludes.some(x => all.some(w => w.startsWith(x)))) return 0
    if (q.phrases.some(p => !entry.folded.includes(p))) return 0
    let score = q.phrases.length * 25
    for (const term of q.terms) {
        const s = termScore(entry, term)
        if (!s) return 0
        score += s
    }
    return score
}

// The few words of the text around the first match, so the reader sees why it came up
function snippet(doc, q) {
    const text = doc.body || doc.description
    if (!text) return ''
    const folded = fold(text)
    const needles = [...q.phrases, ...q.terms].filter(n => n.length >= MIN_LENGTH)
    const at = needles.map(n => folded.search(new RegExp(`(^|[^a-z0-9])${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))).filter(i => i >= 0)
    if (!at.length) return doc.description || text.slice(0, 180)
    const first = Math.min(...at)
    const start = Math.max(0, first - 60)
    const cut = text.slice(start, start + 200)
    return `${start > 0 ? '…' : ''}${start > 0 ? cut.slice(cut.indexOf(' ') + 1) : cut}${start + 200 < text.length ? '…' : ''}`
}

/**
 * @param {Array} docs  - the index (/search.json)
 * @param {string} raw  - what the person typed
 * @param {object} options - { kinds: ['book', …] } narrows to those kinds; the counts per kind ignore it
 * @returns {{ results, total, counts, query }}
 */
export function searchSite(docs, raw, { kinds = [] } = {}) {
    const q = parseQuery(raw)
    if (isEmptyQuery(q)) return { results: [], total: 0, counts: {}, query: q }

    const scored = []
    for (const entry of indexOf(docs)) {
        const score = scoreOf(entry, q)
        if (score) scored.push({ entry, score })
    }

    const counts = {}
    for (const { entry } of scored) counts[entry.doc.kind] = (counts[entry.doc.kind] || 0) + 1

    // Ties: the shorter title first, it is the more general page
    const results = scored
        .filter(({ entry }) => !kinds.length || kinds.includes(entry.doc.kind))
        .sort((a, b) => b.score - a.score || a.entry.doc.title.length - b.entry.doc.title.length)
        .map(({ entry, score }) => ({ ...entry.doc, body: undefined, snippet: snippet(entry.doc, q), score }))

    return { results, total: results.length, counts, query: q }
}

export const searchPagePath = (term, kind) => {
    const params = new URLSearchParams()
    if (term.trim()) params.set('q', term.trim())
    if (kind) params.set('kind', kind)
    const query = params.toString()
    return `/search${query ? `?${query}` : ''}`
}

/**
 * Splits a text into plain and matched parts, for <mark>. Matches the folded text,
 * so "orc" marks "Orçamento".
 */
export function highlightParts(text, query) {
    const source = String(text ?? '')
    const folded = fold(source)
    const needles = [...query.phrases, ...query.terms.flatMap(t => [t, ...(SYNONYMS[t] || [])])].filter(n => n.length >= MIN_LENGTH)
    if (!needles.length) return [{ text: source, isMatch: false }]

    const marks = new Array(source.length).fill(false)
    for (const needle of needles) {
        // Terms match at the start of a word; phrases anywhere
        const isPhrase = query.phrases.includes(needle)
        let from = 0
        let at
        while ((at = folded.indexOf(needle, from)) >= 0) {
            if (isPhrase || at === 0 || !/[a-z0-9]/.test(folded[at - 1])) for (let i = at; i < at + needle.length; i++) marks[i] = true
            from = at + 1
        }
    }

    const parts = []
    for (let i = 0; i < source.length; i++) {
        const last = parts[parts.length - 1]
        if (last && last.isMatch === marks[i]) last.text += source[i]
        else parts.push({ text: source[i], isMatch: marks[i] })
    }
    return parts
}

export const SUGGESTIONS = ['currículo', 'holerite', 'WhatsApp', 'preço', 'ata de reunião', 'pomodoro', 'CLAUDE.md']
