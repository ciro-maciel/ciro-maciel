/**
 * The extensions, as plain data (no icons): the site reads it through
 * catalog.js, and scripts/generate-llms.js reads it directly.
 */

// THE VS CODE EXTENSIONS POINT TO OPEN VSX (the founder's call, 01/10/2026):
// it lists all ten, and it is also where Cursor, VSCodium and Windsurf
// install from. Checked against the Open VSX API (namespace `ciro-maciel`)
// on 01/10/2026; the lines in Portuguese are the official descriptions.
// The two Chrome extensions are tools with their own page in /tools.
const openVsx = name => `https://open-vsx.org/extension/ciro-maciel/ciro-maciel-${name}`

export const EXTENSIONS = [
    { id: 'database', store: 'openvsx', name: 'Database Studio', description: 'PostgreSQL, MySQL, SQLite e Redis dentro do VS Code, com um copiloto de SQL.', href: openVsx('database') },
    { id: 'rest-studio', store: 'openvsx', name: 'REST Studio', description: 'Cliente de API com as coleções em arquivos no próprio repositório. Funciona também no Cursor.', href: openVsx('rest-studio') },
    { id: 'commit-generator', store: 'openvsx', name: 'Commit Generator', description: 'A mensagem de commit escrita a partir do diff, no padrão Conventional Commits.', href: openVsx('commit-generator') },
    { id: 'stack-trace-triage', store: 'openvsx', name: 'Stack Trace Triage', description: 'Cole o erro e receba a causa: o agente abre os arquivos de cada linha do rastro.', href: openVsx('stack-trace-triage') },
    { id: 'sqlite-editor', store: 'openvsx', name: 'SQLite Editor', description: 'Pergunte ao banco em português e veja o SQL que responde.', href: openVsx('sqlite-editor') },
    { id: 'todo-hunter', store: 'openvsx', name: 'TODO Hunter', description: 'Acha cada TODO e FIXME do projeto e propõe a solução.', href: openVsx('todo-hunter') },
    { id: 'env-var-detective', store: 'openvsx', name: 'Env Var Detective', description: 'Acha cada variável de ambiente usada no código e confere contra os arquivos .env.', href: openVsx('env-var-detective') },
    { id: 'error-message-humanizer', store: 'openvsx', name: 'Error Message Humanizer', description: 'Reescreve mensagens de erro obscuras em mensagens que dizem o que fazer.', href: openVsx('error-message-humanizer') },
    { id: 'regex-whisperer', store: 'openvsx', name: 'Regex Whisperer', description: 'Explica qualquer expressão regular em linguagem simples, ou monta uma a partir de uma descrição.', href: openVsx('regex-whisperer') },
    { id: 'assistencia-dev-tracker', store: 'openvsx', name: 'Dev Tracker', description: 'Registra as sessões de suporte e mentoria e vira relatório.', href: openVsx('assistencia-dev-tracker') },
]

export const STORES = {
    vscode: 'VS Code Marketplace',
    openvsx: 'Open VSX',
    chrome: 'Chrome Web Store',
}
