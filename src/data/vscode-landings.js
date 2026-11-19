/**
 * The sales pages of the VS Code extensions on sale (19/11/2026), /vscode/<id>. In English: who installs them reads English.
 *
 * Ciro, 19/11: "ficou muito pobre a proposta, os benefícios... quem vai converter assim". So each page starts from the person
 * who arrives (manager/brand/intencao.md): a developer who searched for "sqlite editor vscode" or "explain stack trace", or who
 * clicked the extension in a store. What they want and do not say: stop leaving the editor, stop guessing. What blocks them:
 * "another AI toy", "what happens to my data", "do I need an account". What they leave with: the extension installed free, or Pro.
 *
 * EVERY FACT here was read from the extension's own README (extensions/vscode/apps/<id>/README.md) on 19/11/2026: the real
 * question and SQL, the real trace and diagnosis, the comparison table (from each competitor's public listing, as the README
 * says), the setup. No invented number, testimonial or scarcity. The Pro price is never written here: the page reads it from
 * Payments (data/vscode.js).
 */

const shot = (id, file) => `/images/vscode/${id}/${file}`

export const LANDINGS = {
    'sqlite-editor': {
        seo: {
            title: 'SQLite Editor for VS Code: ask your .db in plain English',
            description: 'Open a .db file inside VS Code, edit it like a spreadsheet, ask questions in plain English and get SQL you can run. Free; Pro includes the AI.',
        },
        hero: {
            eyebrow: 'SQLite Editor · for VS Code, Cursor, VSCodium and Windsurf',
            title: 'Ask your SQLite database in plain English. Get SQL you can run.',
            lead: 'Open any .db file inside your editor, read what it holds, edit it like a spreadsheet, and ask "which accounts owe us money?" instead of writing four joins by hand. When a query fails, it tells you why and hands you the fix.',
            image: shot('sqlite-editor', 'ask-in-plain-english.png'),
            alt: 'The AI chat: the question "Which accounts owe us money right now?" turned into a SQL query joining accounts, subscriptions, plans and invoices, already run, with the result grid on the left',
        },
        problem: {
            title: 'Every other SQLite editor still makes you write SQL by hand',
            text: [
                'I work with SQLite databases every day. Every time I wanted to ask a simple question of my own data, I bounced between a read-only browser and a SQL prompt. The viewers had no idea what the data meant. The query consoles had no idea what schema was in front of them.',
                'So I built the database editor I wanted to use. It opens the file inside VS Code as a grid you can edit, and on top of that it reads the schema and a few sample rows, so the model talks about your tables, not tables in general.',
            ],
        },
        steps: {
            title: 'From a .db file to the answer, without leaving the editor',
            items: [
                ['Open', 'Click a .db, .sqlite or .sqlite3 file in the Explorer. It opens as a grid. No import, no separate app.'],
                ['Read the briefing', 'One click and it tells you what the database is for, which tables matter and what looks odd in the samples.'],
                ['Ask', 'Press Cmd+K (Ctrl+K) and type the question the way you would ask a colleague.'],
                ['Review and run', 'The SQL comes back explained in one sentence. Nothing runs until you press Run.'],
            ],
        },
        showcase: [
            {
                title: 'A question in plain English becomes SQL, and one click runs it',
                text: 'It knew the amount lives in amount_cents, that you need two joins to get from an invoice to an account, and that dollars means dividing by 100. A real run:',
                image: shot('sqlite-editor', 'ask-in-plain-english.png'),
                alt: 'A plain-English question answered with SQL and its result grid',
                input: 'Which accounts owe us money right now? Show the account, plan, how many invoices are open and the total in dollars, biggest first.',
                output: "SELECT a.name AS account_name, p.name AS plan_name,\n  COUNT(i.id) AS open_invoices_count,\n  ROUND(SUM(i.amount_cents) / 100.0, 2) AS total_owed_dollars\nFROM accounts a\nJOIN subscriptions s ON a.id = s.account_id\nJOIN plans p ON s.plan_id = p.id\nJOIN invoices i ON s.id = i.subscription_id\nWHERE i.status != 'paid' AND i.paid_at IS NULL\nGROUP BY a.id, p.id\nORDER BY total_owed_dollars DESC",
            },
            {
                title: 'A failed query, the reason in one sentence, the fix ready to run',
                text: 'When SQLite says "no such column", it reads your schema and tells you which column you meant. Apply fix & run does the rest.',
                image: shot('sqlite-editor', 'fix-sql-error.png'),
                alt: 'The Fix this error dialog: the SQLite error, the explanation that the column is amount_cents, and the corrected SQL with Apply fix and run',
                input: 'no such column: i.amount',
                output: 'The column `amount` does not exist; the correct column name is `amount_cents`.\nSELECT a.name, SUM(i.amount_cents) / 100.0 AS owed FROM invoices i ...',
            },
            {
                title: 'Open a database you have never seen and understand it in a minute',
                text: 'The Data Briefing reads the schema and samples and says, in plain English, what the database is for, which tables matter and why, and which questions you might want to ask. Click a question and it goes straight to the chat.',
                image: shot('sqlite-editor', 'data-briefing.png'),
                alt: 'The Data Briefing panel over a billing database: what it is, a summary in plain English and the main tables',
            },
        ],
        features: {
            title: 'A full SQLite client, with the AI one click away',
            items: [
                ['Edit like a spreadsheet', 'Browse tables, edit cells, insert and delete rows, alter tables, create indexes and run custom queries. Changes are written to the file.'],
                ['Ask in plain English', 'The chat writes SQL against your real schema, explains it in one sentence and keeps the thread, so you can refine with follow-ups. Run, Explain, Copy SQL.'],
                ['Errors explained and fixed', 'When a query fails, Ask AI to fix names the problem and proposes corrected SQL. Apply fix & run runs it.'],
                ['Data Briefing', 'What the database is for, which tables matter, what looks odd, which questions to ask. One click.'],
                ['Insights on every table', 'When you open a table, one scan flags anomalies, data-quality issues and patterns above the grid. You can turn it off.'],
                ['Filter and edit by intent', 'AI Filter filters a table with a plain-English predicate. AI Edit transforms a column with an instruction like "trim whitespace", and you can undo it.'],
                ['Schema Insights', 'Finds missing indexes on foreign-key columns, CHECK candidates and other structure smells, with the DDL to Apply or Copy.'],
                ['Your model, or ours', 'Free: any model on OpenRouter with your own key, pay per token. Pro: the AI included, no account, no key.'],
            ],
        },
        compare: {
            title: 'How it compares',
            note: 'From each tool’s public listing. Something changed? Tell me at ciromaciel.click/contact.',
            columns: ['SQLite Editor', 'DB Browser for SQLite', 'DBeaver', 'SQLTools'],
            rows: [
                ['Open a .db inside VS Code', 'Yes', 'No: separate app', 'No: separate app', 'Partial: via driver'],
                ['Inline row editing', 'Yes', 'Yes', 'Yes', 'No'],
                ['Schema and structure management', 'Yes', 'Yes', 'Yes', 'Partial'],
                ['Plain English to SQL', 'Yes', 'No', 'No', 'Partial: paid add-on'],
                ['Schema-aware AI briefing', 'Yes', 'No', 'No', 'No'],
                ['AI explanation of SQL errors', 'Yes', 'No', 'No', 'No'],
            ],
        },
        pricing: {
            free: ['The whole editor: grid, edits, alter, indexes, queries', 'Every AI feature with your own OpenRouter key, any model, pay per token', 'The grid, the edits and the queries run on your machine'],
            pro: ['Every AI feature with no OpenRouter account and no key', 'One license key, any editor; it also unlocks Stack Trace Triage Pro if you subscribe to both'],
        },
        closing: 'Try it on the next .db file you open.',
        faq: [
            ['What is sent to the model?', 'Only when you use an AI feature: your question, the schema and a few sample rows of the tables involved. With your own key it goes to OpenRouter and the provider of the model you picked; with Pro it goes to my server, which checks your license and asks Claude Haiku 5.5. The rest of the file never leaves your machine.'],
            ['Does it change my data without asking?', 'No. Generated SQL runs only when you press Run, and AI Edit can be undone. Cell edits are written to the file as you make them, as in any editor.'],
            ['What do I need?', 'Python 3.6 or newer with SQLite 3.8 or newer; the editor finds it on its own. Then click a .db file. For the free AI, an OpenRouter key; for Pro, the license key.'],
            ['Which editors?', 'VS Code (Marketplace), and Cursor, VSCodium and Windsurf (Open VSX).'],
            ['How do I activate Pro?', 'Subscribe on this page, copy the license key it shows, run "Enter Pro License Key" from the command palette and paste it. With an OpenRouter key set, the extension keeps using your key and never calls the Pro server.'],
            ['How do I cancel?', 'Write to me at ciromaciel.click/contact and I cancel it.'],
        ],
    },

    'stack-trace-triage': {
        seo: {
            title: 'Stack Trace Triage for VS Code: the root cause from your own code',
            description: 'Select a stack trace, press one key, get the root cause and the fix. It opens the files in the frames first, so the diagnosis quotes your code. Free; Pro includes the AI.',
        },
        hero: {
            eyebrow: 'Stack Trace Triage · for VS Code, Cursor, VSCodium and Windsurf',
            title: 'Select the stack trace. Press one key. Get the root cause from your own code.',
            lead: 'It opens the files at the lines of the trace before it answers, so the diagnosis quotes what is on your disk, not a guess of it. No more pasting the error into a chat and then pasting the code, file by file.',
            image: shot('stack-trace-triage', 'triage-from-terminal.png'),
            alt: 'A trace copied from the terminal and its diagnosis with the root cause and the fix',
        },
        problem: {
            title: 'Pasting errors into a chat and re-pasting the code is slow',
            text: [
                'A stack trace already says where to look: the file and the line of every frame. A chat window cannot open those files, so you copy the error, then the code, then the other file, and the answer is still a guess about code it saw in pieces.',
                'Stack Trace Triage does the copying for you. It parses the frames, opens the actual files at the line numbers from the trace, skips the framework’s own code, and sends the source around each frame together with the error.',
            ],
        },
        steps: {
            title: 'From the error to the fix in one key',
            items: [
                ['Select or copy', 'Select the trace in any editor or log file, or copy it from the terminal.'],
                ['Press one key', 'Cmd+Alt+T (Ctrl+Alt+T), or "Triage Stack Trace from Clipboard" from the terminal.'],
                ['It reads your code', 'Each frame is resolved to a file in your workspace; node_modules, site-packages, vendor, dist and build are left out.'],
                ['Read the answer', 'Root cause, why it fails, the fix as a diff against the lines it read, and what it would need to be sure.'],
            ],
        },
        showcase: [
            {
                title: 'From the terminal: copy the error, and the frames become your files',
                text: 'A real run of a small orders service. The trace that went in:',
                image: shot('stack-trace-triage', 'triage-from-terminal.png'),
                alt: 'Triage from the clipboard: the frames resolved to files in the workspace',
                input: "TypeError: Cannot read properties of undefined (reading 'tier')\n    at loyaltyDiscount (src/pricing/discounts.ts:10:54)\n    at computeTotals (src/orders/totals.ts:19:5)\n    at settle (src/jobs/settle-orders.ts:10:18)",
                output: 'Root cause: customer.loyalty is undefined for at least one order. The ?? 0 only guards against an unknown tier; it does nothing when loyalty itself is missing, because customer.loyalty.tier throws before the lookup happens.\nWhy it fails: orders are loaded with JSON.parse and cast to Order[]; TypeScript does no runtime validation, and settle has no try/catch, so one bad record kills the whole batch.',
            },
            {
                title: 'The fix comes as a diff against the lines it read',
                text: 'Not a rewrite of a file it never saw: a change to the exact lines of the frames, so you can read it in seconds and apply it with confidence.',
                image: shot('stack-trace-triage', 'fix-as-diff.png'),
                alt: 'The fix shown as a diff against the lines of the frames',
            },
            {
                title: 'From any editor or log file',
                text: 'Select the error, press the key, and the diagnosis opens as a Markdown document with a rendered preview, next to your code.',
                image: shot('stack-trace-triage', 'diagnosis-from-selection.png'),
                alt: 'A diagnosis with root cause and fix for a selected trace',
            },
        ],
        features: {
            title: 'Built to answer about your code, not about code in general',
            items: [
                ['Grounded in your files', 'Each frame is resolved against the workspace: absolute path, path relative to a folder, then a search by file name for compiled or file:// paths.'],
                ['Seven runtimes, plus a fallback', 'Node/V8, Python, Java/Kotlin/Scala, Go, Rust, Ruby and PHP frames, and a generic path:line pattern for anything else.'],
                ['Skips the noise', 'Frames in node_modules, site-packages, .cargo, vendor, dist and build are left out, so the model reads your code.'],
                ['Editor, log file or terminal', 'Select and press Cmd+Alt+T, right-click, or triage straight from the clipboard.'],
                ['A fixed, readable shape', 'Root cause, why it fails, the fix, and what it would need to see to be sure. Environment errors are called out as such.'],
                ['In your language', 'The diagnosis can be written in the language you work in.'],
                ['Production traces too', 'When the paths in a trace do not match your machine (a container, a CI runner, compiled output), it finds the file by name.'],
                ['Your model, or ours', 'Free: any model on OpenRouter with your own key, pay per token. Pro: the AI included, no account, no key.'],
            ],
        },
        compare: {
            title: 'How it compares',
            note: 'From each extension’s public listing. Something changed? Tell me at ciromaciel.click/contact.',
            columns: ['Stack Trace Triage', 'Copilot Chat / ChatGPT', 'Rubberduck', 'Stack Trace Formatter'],
            rows: [
                ['Reads the files from the trace automatically', 'Yes', 'Partial: you attach them', 'No', 'No'],
                ['Diagnosis and fix', 'Yes', 'Yes', 'Yes', 'No: formatting only'],
                ['Node, Python, Java, Go, Rust, Ruby, PHP', 'Yes', 'Yes', 'Yes', 'Partial'],
                ['Any model, pay per token', 'Yes', 'No: subscription', 'Partial', '—'],
                ['Works in Cursor and VSCodium (Open VSX)', 'Yes', 'No', 'Yes', 'No'],
            ],
        },
        pricing: {
            free: ['Every runtime, every source: editor, log file, terminal', 'Diagnoses with your own OpenRouter key, any model, pay per token', 'The frame parsing and the file resolution run on your machine'],
            pro: ['Diagnoses with no OpenRouter account and no key', 'One license key, any editor; it also unlocks SQLite Editor Pro if you subscribe to both'],
        },
        closing: 'Try it on the next error you hit.',
        faq: [
            ['What is sent to the model?', 'The trace you selected or copied, and the source around the resolved frames. Nothing else. With your own key it goes to OpenRouter and the provider of the model you picked; with Pro it goes to my server, which checks your license and asks Claude Haiku 5.5.'],
            ['Does it need the code locally?', 'Yes, that is the point. Frames that do not resolve to a file in your workspace are still sent as text, without code, and the diagnosis marks them as "source not found".'],
            ['Can it read a trace from production logs?', 'Yes, as long as the files exist in your workspace. When the paths do not match your machine, it falls back to finding the file by name.'],
            ['Which editors?', 'VS Code (Marketplace), and Cursor, VSCodium and Windsurf (Open VSX).'],
            ['How do I activate Pro?', 'Subscribe on this page, copy the license key it shows, run "Enter Pro License Key" from the command palette and paste it. With an OpenRouter key set, the extension keeps using your key and never calls the Pro server.'],
            ['How do I cancel?', 'Write to me at ciromaciel.click/contact and I cancel it.'],
        ],
    },
    'commit-generator': {
        seo: {
            title: 'Commit Generator for VS Code: your staged diff becomes a Conventional Commit',
            description: 'One click in Source Control and your staged diff becomes a Conventional Commit with a body that says why. Any model on OpenRouter, the price shown before you pick. Free.',
        },
        hero: {
            eyebrow: 'Commit Generator · for VS Code, Cursor, VSCodium and Windsurf',
            title: 'One click, and your staged diff becomes a commit message worth reading.',
            lead: 'A subject in Conventional Commits and a body that explains why, written from the diff you staged. It lands in the commit box for you to read, edit and commit. It never commits for you.',
            image: shot('commit-generator', 'source-control-commit.png'),
            alt: 'A generated Conventional Commit in the Source Control input box',
        },
        problem: {
            title: 'I got tired of typing "fix stuff" into the commit box',
            text: [
                'The commit message is the only note your future self and your team get about why a change exists. At the end of a long change it is also the last thing anyone wants to write, so the history fills with "update client" and "wip".',
                'Commit Generator reads the diff you staged and writes the message a careful colleague would: the type, the scope, an imperative subject, and when the change is not trivial, a body that says why.',
            ],
        },
        steps: {
            title: 'From staged changes to a message, in one click',
            items: [
                ['Stage', 'Stage what goes in the commit. Nothing staged? It falls back to the working tree, new files included.'],
                ['Click', 'The comment icon in the Source Control title bar, or "Commit Msg" in the status bar.'],
                ['Read', 'The subject and the body land in the commit box. Edit anything you want.'],
                ['Commit', 'You commit. It never does it for you.'],
            ],
        },
        showcase: [
            {
                title: 'A subject and a body that says why',
                text: 'A real run, for a change that added retries with backoff and an idempotency key to a payments client. Compare it with what usually lands in that box: "update client".',
                image: shot('commit-generator', 'source-control-commit.png'),
                alt: 'The generated commit message in the Source Control box',
                output: 'feat(payments): retry transient charge failures with exponential backoff\n\nTransient upstream errors (429 and 5xx) can cause payment processing to\nfail unnecessarily. Add automatic retries with exponential backoff and\npass an idempotency key to make charge requests resilient without risk\nof duplicate charges.',
            },
            {
                title: 'Pick the model, and see the price before you pick',
                text: 'The live OpenRouter list, with each model’s context window and its price per million tokens, in and out. New models show up the day OpenRouter lists them. Type to filter, pick one, done.',
                image: shot('commit-generator', 'select-model.png'),
                alt: 'The model picker filtered by claude-sonnet, each model with its context window and price per million tokens',
            },
        ],
        features: {
            title: 'Small, fast, and it stays out of your way',
            items: [
                ['Conventional Commits by default', 'type(scope): subject, imperative, lowercase, 72 characters at most, and a body when the change is not trivial. Or switch to plain messages.'],
                ['Staged first', 'It uses the staged diff when there is one; with nothing staged, the working tree, untracked files included.'],
                ['It never commits for you', 'The message lands in the input box. You read it, edit it, and commit.'],
                ['Any language', 'English by default; set Portuguese, Spanish, French or the language your team writes in.'],
                ['Any model, one key', 'Gemini Flash, Claude Sonnet, GPT, DeepSeek, Qwen, Llama, Mistral: any model on OpenRouter. Switch whenever a new one drops.'],
                ['The price before you pick', 'The picker shows each model’s price per million tokens, in and out, straight from OpenRouter.'],
                ['A fraction of a cent', 'The diff sent is capped at 12,000 characters by default, about 3,000 tokens: with the default model that is under a tenth of a cent a message.'],
                ['Any editor', 'On the Marketplace and on Open VSX: VS Code, Cursor, VSCodium and Windsurf.'],
            ],
        },
        compare: {
            title: 'How it compares',
            note: 'From each extension’s public listing, September 2026; — means the listing does not say. Something changed? Tell me at ciromaciel.click/contact.',
            columns: ['Commit Generator', 'GitHub Copilot', 'AI Commit', 'Commit Sage'],
            rows: [
                ['Any of 350+ models, one key', 'Yes: OpenRouter', 'No: Copilot models', 'Partial: a few providers', 'Yes: many providers'],
                ['Pay per token, no subscription', 'Yes', 'No: monthly plan', 'Yes', 'Yes'],
                ['Conventional Commits', 'Yes', 'Partial', 'Yes', 'Yes'],
                ['Live model list with prices', 'Yes', '—', '—', '—'],
                ['Works in Cursor and VSCodium (Open VSX)', 'Yes', 'No', 'No', 'Yes'],
            ],
        },
        pricing: {
            free: ['Every feature, for good', 'Your OpenRouter key, any model, pay the model per token', 'No account with me, no telemetry'],
            freeNote: 'Commit Generator is free. It uses your own OpenRouter key: you pick the model and pay the model per token, usually under a tenth of a cent a message.',
        },
        next: {
            text: 'Want every commit in Conventional Commits even when an agent writes the code? CCM Stack makes your coding agent follow that rule and others, and refuses the commit that breaks them.',
            label: 'See CCM Stack, open source',
            href: '/ccm-stack',
        },
        closing: 'Stage your next change and click once.',
        faq: [
            ['What is sent to the model?', 'Your diff (staged first, capped at 12,000 characters by default) and the instructions for the message. It goes to OpenRouter and then to the provider of the model you picked. Nothing is sent until you click.'],
            ['Where is my key stored?', 'In your VS Code user settings. If OpenRouter rejects it, the extension asks for a new one.'],
            ['How much does it cost?', 'Whatever the model charges per token on OpenRouter, and the picker shows it before you choose. There is no subscription.'],
            ['Does it commit for me?', 'No. The message lands in the commit box; you review and commit.'],
            ['Which editors?', 'VS Code (Marketplace), and Cursor, VSCodium and Windsurf (Open VSX).'],
        ],
    },

    'database': {
        seo: {
            title: 'Database Studio for VS Code: PostgreSQL, MySQL, SQLite and Redis from your .env',
            description: 'Open the repo and your database is already in the side bar. Edit rows in a grid, ask for SQL in plain English, and get stopped before you commit to production. Free, no telemetry.',
        },
        hero: {
            eyebrow: 'Database Studio · for VS Code, Cursor, VSCodium and Windsurf',
            title: 'Open the repo, and your database is already in the side bar.',
            lead: 'PostgreSQL, MySQL, SQLite and Redis, found from your .env files. Edit rows in a grid, ask for SQL in plain English, copy a table as TypeScript or Zod, and get stopped before a commit reaches production. No telemetry, no nag screens.',
            image: shot('database', 'data-grid.png'),
            alt: 'Database Studio: the connections side bar and an orders table in the editable data grid',
        },
        problem: {
            title: 'Every database client in VS Code became bloated, slow or nagware',
            text: [
                'The connection string is already in your .env, yet every client asks you to paste it again. Then it phones home, shows a pop-up asking for a yearly license, or treats your production database exactly like your laptop’s.',
                'Database Studio starts from what your repository already knows: it reads the .env files and offers to connect. It marks production as production and asks before every commit to it. And your rows never leave your machine.',
            ],
        },
        steps: {
            title: 'From the repo to an edited row, in a minute',
            items: [
                ['Open the repo', 'It scans the .env files and .db files and lists what it found. Click 1-Click Connect.'],
                ['Browse', 'Schemas, tables with row counts, columns with type, key and nullability.'],
                ['Edit', 'Click a cell and type. Commit sends the changes; Revert drops them.'],
                ['Ask', 'From any table, ask in plain English and get SQL for that table and that engine.'],
            ],
        },
        showcase: [
            {
                title: 'It reads your .env and offers to connect',
                text: 'Any postgres://, mysql://, redis:// or sqlite:// URL in a .env file becomes a connection, one click to add. No connection string to paste.',
                image: shot('database', 'env-auto-detect.png'),
                alt: 'A .env with DATABASE_URL and the notification: Detected 2 database connections, with 1-Click Connect',
            },
            {
                title: 'Ask from a table; get SQL for that table and that engine',
                text: 'The model gets the table’s columns and the engine name, so the SQL fits your schema and your dialect. A real run on SQLite:',
                image: shot('database', 'ai-copilot-sql.png'),
                alt: 'A new SQL tab generated by Ask AI with a monthly revenue query over the orders table',
                input: 'Monthly revenue in 2026 from paid, shipped and delivered orders, per currency, with order count and average order value',
                output: "SELECT strftime('%Y-%m', placed_at) AS month, currency,\n  COUNT(id) AS order_count, SUM(total) AS total_revenue,\n  AVG(total) AS avg_order_value\nFROM orders\nWHERE placed_at >= '2026-01-01' AND placed_at < '2027-01-01'\n  AND status IN ('paid', 'shipped', 'delivered')\nGROUP BY month, currency\nORDER BY month ASC, currency ASC;",
            },
            {
                title: 'Production looks like production, and asks first',
                text: 'A connection is tagged Production when you pick it, or when it sees prod in the variable name or prod, aws, neon, supabase or planetscale in the URL. It gets a shield in the tree, and every commit from the grid stops at a dialog first.',
                image: shot('database', 'production-safeguard.png'),
                alt: 'The production safeguard dialog over the orders grid of a production connection',
            },
        ],
        features: {
            title: 'Everything you open a database client for, and nothing you don’t',
            items: [
                ['Four engines, one side bar', 'PostgreSQL (Supabase, Neon, RDS), MySQL and MariaDB, SQLite files, and Redis or Valkey with key namespaces and counts.'],
                ['Your .env is the connection list', 'Connections found from .env files and .db files on startup; or add one by hand, as Development, Staging or Production.'],
                ['A grid you can edit', 'Edited cells turn yellow; Commit or Revert. A WHERE and ORDER BY bar filters without writing a query.'],
                ['Production safeguard', 'A shield and [PROD] in the tree, and a confirmation before every commit to it.'],
                ['Data to code', 'Copy a table as a TypeScript interface, a Zod schema with its type, or a Mermaid erDiagram for a pull request.'],
                ['Export', 'The current filter’s rows, up to 5,000, as CSV in a new tab.'],
                ['Ask AI with your own model', 'Any OpenRouter model, one key. The model gets column names and types, never row data.'],
                ['Your rows stay on your machine', 'No telemetry, no analytics. Passwords and the key go to VS Code’s secret storage.'],
            ],
        },
        compare: {
            title: 'How it compares',
            note: 'From each tool’s public listing. Something changed? Tell me at ciromaciel.click/contact.',
            columns: ['Database Studio', 'Database Client2', 'DBeaver', 'DataGrip', 'TablePlus'],
            rows: [
                ['Zero telemetry', 'Yes', 'No', 'No', 'No', 'No'],
                ['No nagware, no ads', 'Yes: free', 'No: yearly pop-ups', 'Partial', 'No: paid', 'No: tab limits'],
                ['Connects from .env', 'Yes', 'No', 'No', 'No', 'No'],
                ['Production safeguard', 'Yes: confirm on every commit', 'No', 'Partial: read-only mode', 'Partial', 'Partial: safe mode'],
                ['Copy as TypeScript and Zod', 'Yes', 'No', 'No', 'No', 'No'],
                ['AI query copilot', 'Yes: your key', 'No: paid', 'No', 'Partial', 'No'],
            ],
        },
        pricing: {
            free: ['Every engine, every feature, for good', 'Ask AI with your OpenRouter key, any model, pay the model per token', 'Offline for everything but Ask AI'],
            freeNote: 'Database Studio is free, with no ads and no pop-ups. Ask AI uses your own OpenRouter key; everything else works offline.',
        },
        next: {
            text: 'Starting a new app and need a database without running a server? Storage keeps collections and files with no migration and no cloud credentials, for people and agents alike.',
            label: 'See Storage, free to start',
            href: 'https://myinfrastructure.click/en/products/storage',
        },
        closing: 'Open your next repo and see your database in the side bar.',
        faq: [
            ['Does it send my data anywhere?', 'Only when you use Ask AI, and only your question plus the column names and types of the table you asked from, to OpenRouter with your key. Row data never leaves your machine. There is no telemetry.'],
            ['Does it work offline?', 'Yes, everything but Ask AI: connections, the tree, the grid, edits, export and the code generators.'],
            ['What does SQLite need?', 'python3 on your PATH. Queries run through Python’s built-in sqlite3 module, so there is nothing native to compile.'],
            ['Is my production database safe?', 'A connection tagged Production asks for confirmation before every commit from the grid. Tag it yourself, or let auto-detect do it from the variable name or the host.'],
            ['Which editors?', 'VS Code (Marketplace), and Cursor, VSCodium and Windsurf (Open VSX).'],
        ],
    },
}
