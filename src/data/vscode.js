/**
 * /vscode (19/11/2026): the VS Code extensions and the Pro plan of each one, in English.
 *
 * Who arrives: a developer who installed one of these from Open VSX or the Marketplace, or who
 * searched for a commit generator, a SQLite editor or a regex tool. What they want and do not say:
 * the AI without creating one more account and pasting one more key. What blocks them: "will the
 * free one get worse?" and "what happens to my code?". What they leave with: the extension
 * installed, or a Pro key pasted in the editor.
 *
 * Every fact here was read from each extension's README and manifest on 19/11/2026. THE PRICE IS
 * NOT HERE: the page reads it from Payments (project Tools), whose single source is
 * infrastructure/payments/scripts/specs/vscode-pro.json. Pro is sold only where an extension has
 * `pro` below: Stack Trace Triage and SQLite Editor since 19/11/2026. The other six AI extensions
 * show their free version only until Ciro opens their Pro.
 */

const openVsx = id => `https://open-vsx.org/extension/ciro-maciel/ciro-maciel-${id}`
const marketplace = id => `https://marketplace.visualstudio.com/items?itemName=ciro-maciel.ciro-maciel-${id}`
const image = (id, file) => `/images/vscode/${id}/${file}`

export const VSCODE = {
    path: '/vscode',

    // Payments (project Tools). The public key and the gateway are public values: the checkout
    // reads the catalog with them. The LIVE gateway since 19/11/2026 (Ciro approved US$ 3 for two
    // extensions); the test one, f58d52bc-eef2-4698-b88f-f6033dd5fb6b, holds all eight for later.
    payments: {
        apiUrl: 'https://payments.worker.myinfrastructure.click',
        publicKey: 'pk_6b83b40b9135d318331df91a0ccb4d698017b4c7c311b2f2f50ecbbdeef5153d',
        gatewayId: 'cdc89a9a-9d91-4a9d-b327-4d8f2c95d7a3',
    },

    // What the license server allows a day (applications/apps/vscode-pro/manager, LIVE_DAILY_REQUESTS).
    dailyRequests: 50,
    model: 'Claude Haiku 5.5',

    seo: {
        title: 'VS Code extensions: free to install, Pro with the AI included',
        description: 'Eleven extensions for VS Code, Cursor, VSCodium and Windsurf. Free with your own OpenRouter key; Pro includes the AI, so no key is needed.',
    },

    hero: {
        eyebrow: 'VS Code extensions',
        title: 'The AI in your editor, without one more account.',
        description:
            'Eleven extensions I built for my own work: a database studio, a SQLite editor, a commit writer, a stack trace reader and more. Every one is free and stays free. Stack Trace Triage and SQLite Editor also have a Pro plan: the AI is included, so you skip the OpenRouter sign-up and the key.',
        note: 'For VS Code, Cursor, VSCodium and Windsurf.',
        image: image('stack-trace-triage', 'triage-from-terminal.png'),
        alt: 'Stack Trace Triage in VS Code: a trace copied from the terminal and its diagnosis with the root cause and the fix',
    },

    how: {
        eyebrow: 'Free and Pro',
        title: 'Pro adds the AI. It takes nothing away.',
        items: [
            {
                title: 'Free stays free',
                description:
                    'Everything an extension does today stays in the free version. The AI features work with your own OpenRouter key, any of its models, and you pay OpenRouter per token.',
            },
            {
                title: 'Pro includes the AI',
                description:
                    'No OpenRouter account and no key. The extension sends the same request to my server, which answers with Claude Haiku 5.5: up to 50 AI requests a day per extension.',
            },
            {
                title: 'One key, any editor',
                description:
                    'After the payment you get a license key. Paste it with "Enter Pro License Key" in the command palette. The same key carries both extensions if you subscribe to both.',
            },
        ],
    },

    // The two with Pro first: they are the ones on sale.
    extensions: [
        {
            id: 'stack-trace-triage',
            next: { text: 'The trace came from production? Monitors watches your site, confirms an incident before it alerts you, and gives you a status page.', label: 'Monitors, free for one monitor', href: 'https://myinfrastructure.click/en/products/monitors' },
            name: 'Stack Trace Triage',
            summary: 'Paste a stack trace and get the root cause: it opens the files in the frames first.',
            image: image('stack-trace-triage', 'diagnosis-from-selection.png'),
            alt: 'Stack Trace Triage: a diagnosis with root cause and fix for a selected trace',
            free: ['Node, Python, Java, Go, Rust, Ruby and PHP traces', 'From the editor, a log file or the clipboard'],
            pro: ['Diagnoses with no OpenRouter key'],
        },
        {
            id: 'sqlite-editor',
            next: { text: 'When the app needs its data online, Storage keeps collections and files with no migration and no cloud credentials.', label: 'Storage, free to start', href: 'https://myinfrastructure.click/en/products/storage' },
            name: 'SQLite Editor',
            summary: 'Open a .db file, edit it like a spreadsheet and ask it questions in plain English.',
            image: image('sqlite-editor', 'ask-in-plain-english.png'),
            alt: 'SQLite Editor: a question in plain English answered with SQL and its result',
            free: ['Browse, edit, alter tables and run queries', 'Data briefing, AI filter, AI edit and error fixes with your OpenRouter key'],
            pro: ['Every AI feature with no OpenRouter key'],
        },
        {
            id: 'database',
            next: { text: 'Need a database for a new app without running a server? Storage keeps collections and files, reached by people and agents alike.', label: 'Storage, free to start', href: 'https://myinfrastructure.click/en/products/storage' },
            name: 'Database Studio',
            summary: 'PostgreSQL, MySQL, SQLite and Redis in the side bar, found from your .env files.',
            image: image('database', 'data-grid.png'),
            alt: 'Database Studio: the connections side bar and an orders table in the editable data grid',
            free: ['Connections read from your .env files', 'An editable grid with commit and revert', 'Production connections marked and confirmed', 'Ask AI for SQL with your OpenRouter key'],
        },
        {
            id: 'commit-generator',
            next: { text: 'Want every commit in Conventional Commits without thinking about it? CCM Stack makes your coding agent follow that rule and others, and refuses what breaks them.', label: 'CCM Stack, open source', href: '/ccm-stack' },
            name: 'Commit Generator',
            summary: 'One click in Source Control and your staged diff becomes a Conventional Commit.',
            image: image('commit-generator', 'source-control-commit.png'),
            alt: 'Commit Generator: a generated Conventional Commit in the Source Control input box',
            free: ['Conventional Commits or plain messages, in any language', 'Any OpenRouter model, with its price shown before you pick'],
        },
        {
            id: 'regex-whisperer',
            name: 'Regex Whisperer',
            summary: 'Explain any regex in plain English, or build one from a description.',
            image: image('regex-whisperer', 'build-result-local-validation.png'),
            alt: 'Regex Whisperer: a regex built from a description and checked against examples',
            free: ['Explain and build, seven regex flavors', 'JavaScript patterns checked locally against the examples'],
        },
        {
            id: 'error-message-humanizer',
            name: 'Error Message Humanizer',
            summary: 'Rewrites cryptic throw, raise and panic messages into ones that say what to do.',
            image: image('error-message-humanizer', 'rewrite-proposal.png'),
            alt: 'Error Message Humanizer: a proposed rewrite of an error message with Apply and Show diff',
            free: ['A lightbulb on every error site, in eight languages', 'Four tones; nothing changes until you apply'],
        },
        {
            id: 'todo-hunter',
            name: 'TODO Hunter',
            summary: 'Lists every TODO and FIXME in the workspace and proposes the implementation.',
            image: image('todo-hunter', 'proposed-change-diff.png'),
            alt: 'TODO Hunter: a proposed implementation shown as a diff before it is applied',
            free: ['Every TODO, FIXME, XXX and HACK in a side bar', 'Resolve with AI, with a diff before any change'],
        },
        {
            id: 'env-var-detective',
            next: { text: 'Shipping the app? Hoster publishes it with HTTPS and its environment variables, from the CLI or from your agent.', label: 'Hoster, free for one site', href: 'https://myinfrastructure.click/en/products/hoster' },
            name: 'Env Var Detective',
            summary: 'Finds every environment variable your code reads and checks it against your .env files.',
            image: image('env-var-detective', 'sidebar-by-status.png'),
            alt: 'Env Var Detective: variables grouped as undocumented, inconsistent, orphaned and documented',
            free: ['Local scan in 14 languages, grouped by status', 'AI-written .env.example entries with your OpenRouter key'],
        },
        {
            id: 'rest-studio',
            name: 'REST Studio',
            summary: 'A REST and API client whose collections are YAML files in your repository.',
            image: image('rest-studio', 'request-editor.png'),
            alt: 'REST Studio: a POST request with a JSON body and its 201 response with passing tests',
            free: ['Unlimited requests, collections, environments and runs', 'Imports Thunder Client, Postman, Insomnia, OpenAPI and cURL', 'Commercial use allowed, no account'],
            freeOnly: 'Free, with no Pro: nothing in it needs a server or an AI call.',
        },
        {
            id: 'zen-theme',
            name: 'Zen Theme',
            summary: 'A calm light and dark theme: gray around the code, five soft pastels in it.',
            image: image('zen-theme', 'zen-dark.png'),
            alt: 'Zen Dark: TypeScript with bold keywords and pastel strings on a near-black editor',
            free: ['Light and dark, with a file icon theme'],
            freeOnly: 'A theme, free.',
        },
        {
            id: 'assistencia-dev-tracker',
            name: 'Dev Tracker',
            summary: 'Logs support and mentoring sessions and turns them into numbers you can export.',
            image: image('assistencia-dev-tracker', 'dashboard.png'),
            alt: 'Dev Tracker: the dashboard with sessions, tracked time and outcomes',
            free: ['Sessions by client, project and ticket', 'CSV and JSON export; everything stays on your machine'],
            freeOnly: 'Free, and local only: no account, no network.',
        },
    ].map(extension => ({ ...extension, path: `/vscode/${extension.id}`, openVsx: openVsx(extension.id), marketplace: marketplace(extension.id), productId: extension.pro ? `vscode-${extension.id}` : null })),

    returned: {
        title: 'Payment confirmed. Here is your license key.',
        steps: ['Copy the key and keep it: it is your proof of purchase.', 'In the editor, open the command palette and run "Enter Pro License Key" of the extension.', 'Paste the key. The AI works from the next request on, with no OpenRouter key.'],
        missing: 'This browser did not keep the key of the purchase. Write through ciromaciel.click/contact with the e-mail you paid with, and the key is sent to you.',
    },

    faq: [
        {
            question: 'Does the free version lose anything?',
            answer: 'No. Every feature that exists today stays in the free version. Pro only adds a way to use the AI without your own OpenRouter key.',
        },
        {
            question: 'What does Pro send, and where?',
            answer: 'The same text the free version sends to OpenRouter: the stack trace with the code around its frames, or the table names, columns and sample rows the SQLite feature needs, never your whole project. It goes to my server, which checks the license and passes it to Anthropic for Claude Haiku 5.5. My server does not keep it.',
        },
        {
            question: 'I already have an OpenRouter key. Do I need Pro?',
            answer: 'No. With an OpenRouter key set, the extension keeps using it, with the model you picked, and never asks the Pro server anything.',
        },
        {
            question: 'How many AI requests does Pro include?',
            answer: 'Up to 50 a day per extension. They come back at 00:00 UTC.',
        },
        {
            question: 'How do I cancel?',
            answer: 'The subscription is monthly, charged by Stripe. Write through ciromaciel.click/contact with the e-mail you paid with and it is canceled with no further charge; the extension goes back to the free version shortly after the paid month ends.',
        },
        {
            question: 'Does it work in Cursor and VSCodium?',
            answer: 'Yes. Every extension is on Open VSX, where Cursor, VSCodium and Windsurf install from, and on the VS Code Marketplace.',
        },
    ],
}
