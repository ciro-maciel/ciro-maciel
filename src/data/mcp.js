/**
 * /mcp — the MCP connectors: one page that explains what an MCP connector is
 * and lists every one of them, and a page per connector.
 *
 * The connectors themselves come from mcp-catalog.js, a copy of
 * https://mcp.myagents.click/catalog.json that scripts/build-mcp.js refreshes
 * before dev and build: the words of each connector are the ones of its own
 * page at <id>.mcp.myagents.click, never written twice.
 *
 * What may be said (the product notes): one login per line, authorization
 * per product — never "one token for everything".
 *
 * Plain data, no React: scripts/prerender.js, scripts/generate-sitemap.js and
 * scripts/generate-llms.js import it too.
 */

import CATALOG from './mcp-catalog.js'

const LINE_TEXT = {
    Infrastructure: 'Sites, login, e-mail, pagamentos, funções, monitores e dados.',
    Operations: 'Tarefas, vídeos e as visitas dos seus sites.',
    Customers: 'Os seus clientes e o histórico de cada um.',
    Marketing: 'Conteúdo, redes, blog, páginas, formulários, links e newsletter.',
}

/** Every connector, with its group: the services first, then each line. */
const ITEMS = CATALOG.items.map(item => ({
    ...item,
    group: item.line === 'Agents' ? 'servicos' : item.category,
    address: item.addressPrefix ? `${item.addressPrefix}<id do projeto>` : item.url,
    toolCount: item.details.tools.length,
}))

const GROUPS = [
    { id: 'servicos', label: 'Serviços', title: 'Os serviços que você já usa', text: 'Google, Bing, Apple, IndexNow e os cadastros públicos do Brasil: conectores para serviços que ainda não tinham um servidor MCP oficial. Você entra com a conta do próprio serviço, ou com nenhuma, quando o serviço é público.' },
    ...CATALOG.categories.map(category => ({
        id: category.id,
        label: category.label,
        title: `Os produtos do ${category.label}`,
        text: `${LINE_TEXT[category.label] || ''} Mesmo login para a linha inteira, autorização por produto.`.trim(),
    })),
].map(group => ({ ...group, items: ITEMS.filter(item => item.group === group.id) }))

export const MCP = {
    path: '/mcp',
    eyebrow: 'MCP',
    title: 'Conectores MCP: o seu assistente de IA usando o que você já usa',
    description: `${ITEMS.length} conectores MCP com login OAuth, prontos para o Assistant, o Claude e qualquer cliente MCP. O seu assistente lê os seus dados e, com a sua aprovação, age.`,
    lead: `Um conector MCP é o endereço que você cola no seu assistente de IA para ele passar a usar um serviço: ler os seus dados e, quando você aprova, agir. Aqui estão os ${ITEMS.length} conectores do Ciro, um por serviço, cada um com a sua página.`,
    count: ITEMS.length,
    directory: 'https://mcp.myagents.click',
    explain: {
        eyebrow: 'Como funciona',
        title: 'Três passos, uma vez só',
        steps: [
            { title: 'Cole o endereço', text: 'No seu assistente, adicione o conector pelo endereço MCP. No Assistant, ele já está na loja: é só clicar em Conectar.' },
            { title: 'Entre e autorize', text: 'O conector abre o login do próprio serviço (Google, a sua conta da linha ou a chave do serviço; nos serviços públicos, nenhum). Você vê o que ele pede antes de aprovar.' },
            { title: 'Peça em português', text: 'Pergunte do jeito que você falaria. O assistente escolhe a ferramenta certa, e o que muda alguma coisa espera a sua aprovação.' },
        ],
    },
    trust: [
        { title: 'Ler é livre, mudar pede aprovação', text: 'Cada ferramenta diz se só lê ou se cria, envia, publica ou apaga. As que mudam algo passam pela sua aprovação antes.' },
        { title: 'Só o necessário', text: 'Cada conector pede só as permissões do que faz. O do Google Drive, por exemplo, só enxerga os arquivos que ele mesmo criou.' },
        { title: 'Os dados só passam', text: 'O que o serviço responde vai direto para o seu assistente. Os conectores não guardam, não vendem e não usam os seus dados para treinar modelos.' },
        { title: 'Revogue quando quiser', text: 'Desconecte no assistente ou tire o acesso no próprio serviço. A partir daí, nenhuma consulta funciona.' },
    ],
    faq: [
        {
            question: 'O que é MCP?',
            answer: 'MCP (Model Context Protocol) é o padrão aberto que liga um assistente de IA a um serviço. O servidor MCP do serviço diz quais ferramentas existem; o assistente as chama quando você pede algo que precisa delas.',
        },
        { question: 'Em quais assistentes funciona?', answer: 'Em qualquer cliente MCP que entre por OAuth: o Assistant, o Claude e outros. Você cola o endereço do conector, entra no serviço uma vez, e pronto.' },
        {
            question: 'O assistente pode mudar algo sem eu saber?',
            answer: 'As ferramentas que criam, enviam, publicam ou apagam algo se declaram assim, e o assistente pede a sua aprovação antes de usá-las. Os conectores de só leitura não mudam nada.',
        },
        { question: 'Quanto custa?', answer: 'Os conectores de serviços não cobram nada. Os dos produtos das linhas usam a sua conta e o plano que você tem em cada produto.' },
        {
            question: 'Por que o endereço de alguns tem o id do projeto?',
            answer: 'O Auth, o Messages e o Payments servem a um projeto específico da sua conta. O endereço MCP com o id certo está no painel de cada um, e o Assistant pede para você colar.',
        },
    ],
    groups: GROUPS.filter(group => group.items.length),
    items: ITEMS,
}

export const mcpItem = id => ITEMS.find(item => item.id === id) || null

/** Other connectors of the same group, for the end of a connector's page. */
export const mcpSiblings = item => ITEMS.filter(other => other.group === item.group && other.id !== item.id)
