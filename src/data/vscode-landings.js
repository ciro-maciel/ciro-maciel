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
    'env-var-detective': {
        seo: { title: 'Env Var Detective for VS Code: find undocumented env vars, write .env.example with AI', description: 'Every env var your code reads, checked against your .env files and grouped by what is wrong with it. One click and the missing .env.example entries are written. The scan is free and local.' },
        hero: { eyebrow: 'Env Var Detective · for VS Code, Cursor, VSCodium and Windsurf', title: 'Never crash on a missing env var nobody documented again.', lead: 'Every process.env.X and os.getenv("X") in your code, checked against your .env files and sorted into undocumented, inconsistent, orphaned and fine. One click, and the missing .env.example entries are written with a comment and a safe placeholder.', image: shot('env-var-detective', 'sidebar-by-status.png'), alt: 'Env Var Detective: variables grouped as undocumented, inconsistent, orphaned and documented' },
        problem: { title: 'The .env.example is always a year behind the code', text: ['Every time I joined a new repo, the same dance: clone, install, run, crash on a missing STRIPE_WEBHOOK_SECRET, grep for process.env, ask in Slack, repeat. Half the keys the example listed were dead, and the ones that mattered were missing.', 'So I built the side bar I wanted. It reads every env var your code actually reads, in TypeScript, Python, Rust, Java and more, and puts each one in a bucket. Click a variable to land on every line that reads it.'] },
        steps: { title: 'From a new repo to a correct .env.example', items: [['Install', 'Open the Env Var Detective icon in the Activity Bar. The scan is already done. No key needed.'], ['Read the buckets', 'Undocumented, inconsistent across files, defined but never read, documented.'], ['Jump to the code', 'Expand a variable and click a file to land on the line that reads it.'], ['Write the docs', 'Generate .env.example with AI drafts every missing entry. Append only when you click.']] },
        showcase: [
            { title: 'Six undocumented vars become six commented entries', text: 'One click on Generate .env.example with AI, from the usage sites in a TypeScript API and a Python worker. Existing lines are never rewritten; new entries go at the end, only after you click Append. A real run:', image: shot('env-var-detective', 'ai-env-example.png'), alt: '.env.example after the AI appended six commented entries', output: '# Sender email address for order receipt notifications.\nRECEIPT_FROM_EMAIL=receipts@example.com\n# Connection URL for the Redis queue instance.\nREDIS_URL=redis://localhost:6379/0\n# Webhook signing secret for verifying Stripe event payloads.\nSTRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
            { title: 'Every variable, sorted by what is wrong with it', text: 'Undocumented: read in code, in no env file. Inconsistent: in two or more env files with different values, the DATABASE_URL that means one thing locally and another in the file your teammates copy. Orphaned: defined, never read.', image: shot('env-var-detective', 'sidebar-by-status.png'), alt: 'The side bar with the four buckets' },
        ],
        features: { title: 'Reads the code, not just the .env', items: [['14 languages', 'process.env, import.meta.env, Bun.env, Deno.env.get, os.environ, os.getenv, Go, Ruby, Java, Rust, C# and more.'], ['Every env file', '.env, .env.example, .env.local, .env.development, .env.production, .env.staging, .env.test and more.'], ['Four buckets', 'Undocumented, inconsistent, orphaned and documented, at a glance.'], ['One click to the line', 'Every usage of every variable, a click away.'], ['Docs written for you', 'One entry or every missing one, with a comment and a placeholder. Keys and secrets get obviously fake values.'], ['A count in the status bar', '"6/11 env" means 6 of 11 variables read in code are undocumented. Click to rescan.'], ['Free and local scan', 'An OpenRouter key is only needed for the AI-written entries.'], ['Never rewrites your file', 'It only appends to the example file, only when you click Append.']] },
        compare: { title: 'How it compares', note: 'From each extension’s public listing. Something changed? Tell me at ciromaciel.click/contact.', columns: ['Env Var Detective', 'DotENV', 'Dotenv Official', 'ENV'], rows: [['Finds env vars read in your code', 'Yes', 'No', '—', 'No'], ['Undocumented / orphaned / inconsistent report', 'Yes', 'No', 'No', 'No'], ['Writes .env.example with descriptions', 'Yes: AI', 'No', 'No', 'No'], ['.env syntax highlighting', 'No', 'Yes', 'Yes', 'Yes'], ['Works in Cursor and VSCodium (Open VSX)', 'Yes', 'Yes', 'Yes', '—']] },
        pricing: { free: ['The whole scan, local, for good', 'AI-written entries with your OpenRouter key, any model, pay per token', 'No account with me, no telemetry'], freeNote: 'Env Var Detective is free. The scan runs on your machine; only the AI-written entries use your own OpenRouter key.' },
        next: { text: 'Shipping the app? Hoster publishes it with HTTPS and its environment variables, from the CLI or from your agent.', label: 'See Hoster, free for one site', href: 'https://myinfrastructure.click/en/products/hoster' },
        closing: 'Open your next repo and see every env var it needs.',
        faq: [['Are my secrets sent anywhere?', 'The scan is local. Code goes to OpenRouter only when you click Document Var with AI or Generate .env.example with AI: the lines around a few usages of each variable.'], ['Does it change my .env?', 'No. It only appends to the example file (.env.example by default), and only when you click Append.'], ['Why is a var "Inconsistent" when the example just has a placeholder?', 'Because the values differ. That is how you spot a DATABASE_URL that means one thing locally and another in the file your teammates copy.'], ['Which editors?', 'VS Code (Marketplace), and Cursor, VSCodium and Windsurf (Open VSX).']],
    },

    'regex-whisperer': {
        seo: { title: 'Regex Whisperer for VS Code: explain any regex, build one from a description', description: 'Select a regex and read it in plain English, with edge cases and examples. Describe one and get the pattern in your flavor, checked by the JavaScript engine before you paste it. Free.' },
        hero: { eyebrow: 'Regex Whisperer · for VS Code, Cursor, VSCodium and Windsurf', title: 'Read any regex in plain English. Write one by describing it.', lead: 'Select a pattern and get a summary, a token-by-token breakdown, the edge cases and strings that match and don’t. Or describe what you need and get the pattern in your flavor, with its examples run through the real JavaScript engine before you paste it.', image: shot('regex-whisperer', 'explain-selected-regex.png'), alt: 'A selected regex explained in plain English, with edge cases and examples' },
        problem: { title: 'Regex is the canonical write-only code', text: ['Six months later I read my own pattern and had no idea what it did. And when I needed a new one, I lost twenty minutes on a website in another tab, pasting test strings by hand.', 'Both ends are easy for a language model. What I wanted was to do them without leaving the file. So Regex Whisperer does exactly two things, one key each: explain and build.'] },
        steps: { title: 'Two keys, two directions', items: [['Select', 'Select a regex in any file.'], ['Explain', 'Cmd+Alt+R (Ctrl+Alt+R): summary, breakdown, edge cases, matches and non-matches.'], ['Describe', 'Cmd+Alt+Shift+R and type what you need, in your words.'], ['Paste', 'Get the pattern in your flavor, checked against its own examples in JavaScript.']] },
        showcase: [
            { title: 'A validator nobody on the team wanted to touch, read back in plain English', text: 'One keystroke, and a real finding: the pattern happily accepts half-punctuated input like 123456.789-10. The line that went in, and part of what came out:', image: shot('regex-whisperer', 'explain-selected-regex.png'), alt: 'The explanation of a CPF regex', input: 'export const CPF = /^(?!(\\d)\\1{2}\\.?\\1{3}\\.?\\1{3}-?\\1{2}$)\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$/;', output: 'Summary: matches Brazilian CPF numbers, formatted or not, while rejecting invalid CPFs made of identical digits.\nEdge case: the separators are optional, so it matches partially formatted strings like 123456.789-10.\nmatches 123.456.789-10 · matches 12345678910 · no match 111.111.111-11' },
            { title: 'Describe the format, get the pattern where the constant goes', text: 'Describe the timestamp a webhook sends, right in the file, and get the pattern with its examples.', image: shot('regex-whisperer', 'build-from-description.png'), alt: 'The Build a regex box over a webhook handler', input: 'ISO 8601 timestamps with optional milliseconds, ending in Z or an offset like -03:00' },
            { title: 'Checked, not just generated', text: 'In JavaScript, the extension compiles the pattern with new RegExp and runs it against every match and non-match the model proposed. A wrong regex shows up before it reaches your code.', image: shot('regex-whisperer', 'build-result-local-validation.png'), alt: 'The built regex with its examples checked locally' },
        ],
        features: { title: 'Both directions, in your editor', items: [['Explain and build', 'Most regex extensions only generate or only explain. This does both, one keybinding each.'], ['Checked locally', 'JavaScript patterns run against the model’s own examples before you see them.'], ['Seven flavors', 'JavaScript, PCRE, Python, Go, Java, Rust and .NET.'], ['Edge cases named', 'What the pattern accepts that you did not mean, before it bites.'], ['In your language', 'Explanations in English, Portuguese, Spanish or any other.'], ['Insert at cursor', 'The bare pattern, ready for new RegExp, a config file or another language.'], ['Your model', 'Any of the 350+ models on OpenRouter, pay per token, no subscription.'], ['Nothing else leaves', 'Only the regex or your description goes out. No telemetry, no account with me.']] },
        compare: { title: 'How it compares', note: 'From each tool’s public listing. Something changed? Tell me at ciromaciel.click/contact.', columns: ['Regex Whisperer', 'Regex Previewer', 'Regexp Explain', 'regex101 (website)'], rows: [['Explains a regex in plain English', 'Yes', 'No', 'Yes', 'Yes'], ['Builds a regex from a description', 'Yes', 'No', 'No', 'No'], ['Tests against examples', 'Partial: run locally for JS', 'Yes: your text', 'No', 'Yes: your text'], ['Seven flavors', 'Yes', 'Partial', 'Partial', 'Yes'], ['Inside the editor, one key', 'Yes', 'Yes', 'Yes', 'No: browser tab']] },
        pricing: { free: ['Explain and build, for good', 'Your OpenRouter key, any model, pay the model per token', 'No account with me, no telemetry'] },
        closing: 'Select the next regex you are afraid to touch.',
        faq: [['What is sent to the model?', 'The selected regex (Explain) or your typed description (Build), plus a short instruction. Nothing else from your file or workspace.'], ['Why is only JavaScript validated locally?', 'The editor runs JavaScript’s regex engine. Other flavors are generated and explained, but not executed.'], ['Does Insert at cursor add the slashes?', 'No. It inserts the bare pattern, so it fits new RegExp(…), a config file or a non-JS language.'], ['Which editors?', 'VS Code (Marketplace), and Cursor, VSCodium and Windsurf (Open VSX).']],
    },

    'error-message-humanizer': {
        seo: { title: 'Error Message Humanizer for VS Code: error messages your on-call self can act on', description: 'Click the lightbulb on a throw, raise or panic, and a model reads the code around it and rewrites the message into one that says what broke and what to check. Free.' },
        hero: { eyebrow: 'Error Message Humanizer · for VS Code, Cursor, VSCodium and Windsurf', title: 'Stop shipping throw new Error(\'invalid\').', lead: 'Click the lightbulb on any throw, raise or panic, and a model reads the code around it and rewrites the message into one that names what failed and what to check. Nothing changes until you apply it.', image: shot('error-message-humanizer', 'rewrite-proposal.png'), alt: 'A proposed rewrite of an error message with Apply and Show diff' },
        problem: { title: 'The answer was three lines above the throw', text: ['I spent too many 20-minute sessions figuring out which input, where, and why it was rejected, when the answer was right there in the code, three lines above the throw.', 'A model that reads those lines and rewrites the message saves the next reader, often you six months later, those 20 minutes.'] },
        steps: { title: 'From "invalid" to a message you can act on', items: [['Open a file', 'Every throw, raise and panic gets a lightbulb.'], ['Click Humanize', 'From the lightbulb, the context menu or one keystroke.'], ['Read the proposal', 'Apply, Show diff or Cancel.'], ['Or the whole file', 'Every message in one call, before and after, then Apply all.']] },
        showcase: [
            { title: 'The message now names the order and its status', text: 'A real run, in the actionable style. The single-quoted string becomes a template literal so the value fits:', image: shot('error-message-humanizer', 'lightbulb-quick-fix.png'), alt: 'The Quick Fix menu with Humanize as the first entry', input: "throw new Error('invalid')", output: "throw new Error(`Order ${orderId} cannot be refunded: status is '${order.status}' but must be 'paid' or 'partially_refunded'`)" },
            { title: 'The whole file in one call, before and after', text: 'A Go signup handler and a Python worker after Apply all, where a message that gained a variable became an f-string:', image: shot('error-message-humanizer', 'whole-file-preview.png'), alt: 'The whole-file preview with every message before and after', output: 'errors.New("fail")     → errors.New("enter a valid email address")\nerrors.New("weak")     → errors.New("password must be at least 12 characters long")\nerrors.New("conflict") → errors.New("an account with this email address already exists")' },
            { title: 'Four tones, one setting', text: 'Actionable (what broke and what to check), user-facing (friendly, no jargon), log-friendly (dense, greppable) and developer (names the failing API).', image: shot('error-message-humanizer', 'style-presets.png'), alt: 'The style setting with the four tones' },
        ],
        features: { title: 'Better errors, without leaving the file', items: [['Eight languages', 'JS/TS, Python, Go, Rust, Java, C# and more: throw, raise, errors.New, panic!, anyhow!.'], ['Reads the code', '40 lines around the site by default, so it can name the order, the status or the limit that failed.'], ['A lightbulb on every site', 'Next to the built-in refactorings.'], ['Whole-file rewrite', 'Every site in one call, with a before and after preview.'], ['You approve every change', 'Nothing is written until you click Apply. A clear message is left alone.'], ['Four tones', 'Actionable, user-facing, log-friendly or developer.'], ['Any language', 'The prose in English, Portuguese, Spanish or any other.'], ['Your model', 'Any of the 350+ models on OpenRouter, pay per token, no subscription.']] },
        compare: { title: 'How it compares', note: 'From each tool’s public listing. Something changed? Tell me at ciromaciel.click/contact.', columns: ['Error Message Humanizer', 'Error Lens', 'Copilot Chat / ChatGPT'], rows: [['Improves the messages your code throws', 'Yes', 'No: shows diagnostics', 'Partial: one at a time, by hand'], ['Reads the surrounding code', 'Yes, automatically', '—', 'Partial: you paste it'], ['Lightbulb on every throw', 'Yes', 'No', 'No'], ['Whole-file rewrite with preview', 'Yes', 'No', 'No'], ['Any model, pay per token', 'Yes', '—', 'No: subscription']] },
        pricing: { free: ['Every feature, for good', 'Your OpenRouter key, any model, pay the model per token', 'Detection is local; no telemetry'] },
        closing: 'Open the file with your vaguest error and click the lightbulb.',
        faq: [['What is sent to the model?', 'Detection is local. The file’s relative path and the code around each message go to OpenRouter only when you run a humanize command.'], ['Can the model invent causes?', 'It is told never to claim a cause the visible code does not support, and you see every rewrite before it lands.'], ['What if the new message uses a variable?', 'The string is converted for you: a quoted JS message becomes a template literal, a Python one an f-string.'], ['Which editors?', 'VS Code (Marketplace), and Cursor, VSCodium and Windsurf (Open VSX).']],
    },

    'todo-hunter': {
        seo: { title: 'TODO Hunter for VS Code: every TODO in one list, and the fix written for you', description: 'Every TODO, FIXME, XXX and HACK in your workspace in one list. Click one and a model writes the implementation. You read the diff before it lands. Free.' },
        hero: { eyebrow: 'TODO Hunter · for VS Code, Cursor, VSCodium and Windsurf', title: 'Every TODO in your codebase, in one list. Click one, and the fix is written.', lead: 'TODO, FIXME, XXX and HACK, grouped by file. Pick one, and a model reads the code around it and proposes the implementation. You see the diff, then Apply or Cancel.', image: shot('todo-hunter', 'proposed-change-diff.png'), alt: 'A proposed implementation shown as a diff before it is applied' },
        problem: { title: 'The layer of TODOs nobody goes back to', text: ['Every codebase I touch has a layer of "TODO: refactor later" and "FIXME: this breaks for empty arrays" that nobody ever goes back to. They are small, specific, and exactly the kind of work a model does well.', 'I did not want another chat. I wanted a list, a button and a diff.'] },
        steps: { title: 'From a forgotten FIXME to merged code', items: [['See them all', 'The side bar lists every TODO by file, with counts.'], ['Pick one', 'Click the sparkle on the item, or right-click the line.'], ['Read the diff', 'Show diff opens the change side by side with your code.'], ['Apply', 'Save, and the FIXME is gone from the code and from the list.']] },
        showcase: [
            { title: 'A FIXME in a cart, fixed', text: 'A real run. The FIXME for guest carts, the code around it, and what the model proposed:', image: shot('todo-hunter', 'apply-or-show-diff.png'), alt: 'The notification asking to replace the lines, with Apply, Show diff and Cancel', input: '// FIXME: handle empty cart (lines is undefined for guest carts)\nconst subtotal = cart.lines.reduce((sum, line) => sum + lineTotal(line), 0);', output: 'const lines = cart.lines ?? [];\nconst subtotal = lines.reduce((sum, line) => sum + lineTotal(line), 0);' },
            { title: 'The diff before anything changes', text: 'Show diff opens the proposed change next to your code. Nothing touches your file before you choose.', image: shot('todo-hunter', 'proposed-change-diff.png'), alt: 'The diff editor with the proposed change' },
            { title: 'And it leaves the list', text: 'After Apply, save and a rescan, the file no longer appears in the list.', image: shot('todo-hunter', 'after-apply.png'), alt: 'The file after the fix, gone from the TODO list' },
        ],
        features: { title: 'A list, a button and a diff', items: [['Finds them all', 'TODO, FIXME, XXX and HACK after //, #, --, ;, /* or <!--. Globs and tags are yours to change.'], ['Grouped by file', 'Each file with its count, each item with its line. The status bar keeps the total.'], ['One click to resolve', 'The model reads the surrounding code and writes the implementation.'], ['You approve every change', 'Apply, Show diff or Cancel.'], ['At the cursor too', 'Right-click a TODO line: Resolve TODO at Cursor with AI.'], ['Only what is needed leaves', 'Scanning is local; resolving sends the lines around that one TODO.'], ['Vague TODOs are safe', 'When it cannot resolve one safely, it returns the code unchanged.'], ['Your model', 'Any of the 350+ models on OpenRouter, pay per token.']] },
        compare: { title: 'How it compares', note: 'From each extension’s public listing. Something changed? Tell me at ciromaciel.click/contact.', columns: ['TODO Hunter', 'Todo Tree', 'TODO Highlight', 'Better Comments'], rows: [['Lists every TODO in a side bar', 'Yes', 'Yes', 'No', 'No'], ['Writes the implementation with AI', 'Yes', 'No', 'No', 'No'], ['Diff preview before changing code', 'Yes', '—', '—', '—'], ['Highlights tags in the editor', 'No', 'Yes', 'Yes', 'Yes'], ['Works in Cursor and VSCodium (Open VSX)', 'Yes', 'Yes', 'Yes', 'Yes']] },
        pricing: { free: ['The list and every feature, for good', 'Your OpenRouter key, any model, pay the model per token', 'Scanning is local; no telemetry'] },
        closing: 'Open your workspace and see how many TODOs are waiting.',
        faq: [['What is sent to the model?', 'Only the code around the TODO you chose (60 lines by default), and only when you click resolve. Scanning is local.'], ['Will it change my files without asking?', 'No. Every change waits for Apply. Show diff lets you read it first.'], ['What if the TODO is vague?', 'The model picks the most likely intent from the code, or returns it unchanged when it cannot resolve it safely.'], ['Which editors?', 'VS Code (Marketplace), and Cursor, VSCodium and Windsurf (Open VSX).']],
    },

    'rest-studio': {
        seo: { title: 'REST Studio for VS Code: a free API client, collections as YAML in your repo', description: 'Unlimited requests, collections, environments, tests and runs, free for commercial use, in VS Code, Cursor, VSCodium and Windsurf. Imports Thunder Client, Postman, Insomnia, OpenAPI and cURL.' },
        hero: { eyebrow: 'REST Studio · for VS Code, Cursor, VSCodium and Windsurf', title: 'The API client that stays free: no account, no limits, your requests in Git.', lead: 'Unlimited requests, collections, environments, tests and collection runs, free at work too. Your requests are plain YAML files in a .api/ folder of your project, so they live next to the code they test. Coming from Thunder Client or Postman? One click brings everything over.', image: shot('rest-studio', 'request-editor.png'), alt: 'REST Studio: a POST request with a JSON body and its 201 response with passing tests' },
        problem: { title: 'My requests were suddenly somebody else’s product', text: ['I test APIs all day. The extension I used was fast and simple, until collections got capped, Git sync went behind a subscription, and the free version stopped working in Cursor.', 'So I built the API client I wanted: everything that runs on your machine is free, in any editor, and your data is files you own.'] },
        steps: { title: 'From a URL to a tested collection', items: [['Open the side bar', 'New Request, type a URL.'], ['Send', 'Cmd+Enter (Ctrl+Enter). Add tests without code: status == 201, time < 500.'], ['Chain', 'Capture token = body.access_token and use {{token}} in the next request.'], ['Run the collection', 'Log in, create, read, cancel, with every test checked.']] },
        showcase: [
            { title: 'Collections and environments are files', text: 'The side bar is a view of .api/. Review requests in a pull request, edit them by hand, share them with git push. Secrets stay out of the repo.', image: shot('rest-studio', 'api-folder-yaml.png'), alt: 'The side bar next to the YAML files of a collection and its environments' },
            { title: 'Run a whole collection, every test checked', text: 'Seven requests, twenty tests, one click, with status, time and tests for each row.', image: shot('rest-studio', 'collection-runner.png'), alt: 'The collection runner with 7 of 7 requests passed and 20 of 20 tests' },
            { title: 'Already on Thunder Client? One click', text: 'REST Studio finds your thunder-tests folder and brings it over. Postman, Insomnia, OpenAPI, .http files and cURL too.', image: shot('rest-studio', 'import-from-thunder-postman.png'), alt: 'The welcome page listing Thunder Client collections found, with an Import button' },
        ],
        features: { title: 'Everything an API client needs, free for real', items: [['Free for real', 'Unlimited requests, collections, environments, history, tests and runs. Commercial use allowed. No account, no trial.'], ['Any editor', 'VS Code, Cursor, VSCodium and Windsurf, also over Remote SSH and WSL.'], ['Your data, in files', 'Readable YAML in .api/. No proprietary database, no cloud sync.'], ['Secrets stay secret', '{{secret.clientSecret}} is encrypted by the editor; only the name goes in the repo.'], ['Bring everything', 'Import from Thunder Client, Postman, Insomnia, OpenAPI, .http and cURL.'], ['Tests without code', 'status == 201, body.items.length > 0, header contains json, time < 500.'], ['Chained requests', 'Log in once and every call is authenticated.'], ['Safe by default', 'Protected environments ask before sending; nothing in a collection can run code on your machine. Zero telemetry.']] },
        compare: { title: 'How it compares', note: 'From each tool’s public listing. Something changed? Tell me at ciromaciel.click/contact.', columns: ['REST Studio', 'Thunder Client', 'Postman for VS Code', 'Bruno', 'REST Client'], rows: [['Free for commercial use', 'Yes', 'No: free tier is non-commercial', 'Partial: 1 user', 'Yes', 'Yes'], ['Unlimited collections and requests, free', 'Yes', 'No: capped', 'Yes', 'Yes', 'Yes'], ['No account or sign-in', 'Yes', 'Yes', 'No', 'Yes', 'Yes'], ['Collections as files in your repo', 'Yes: YAML', 'Partial: Git sync is paid', 'No: cloud', 'Yes', 'Yes'], ['Free in Cursor, VSCodium, Windsurf', 'Yes', 'No', 'Yes', 'Yes', 'Yes'], ['Tests without writing code', 'Yes', 'Yes', 'No', 'Yes', 'No']] },
        pricing: { free: ['Everything that runs on your machine, for good, at work too', 'No account, no sign-in, no trial, no limits', 'Zero telemetry'], freeNote: 'REST Studio is free, with no limits and commercial use allowed. Nothing in it needs a server or an AI call.' },
        closing: 'Send your next request from the editor, and keep it in Git.',
        faq: [['Is it really free for commercial use?', 'Yes. Requests, collections, environments, secrets, tests, the runner, import and export, Git: free, with no limits, at work too.'], ['Where is my data stored?', 'Requests and environments in .api/ inside your project; secret values in the editor’s encrypted storage; history in local workspace storage. Nothing is uploaded.'], ['Can a teammate’s branch run code on my machine?', 'No. Tests and captures are parsed, never evaluated, and requests are only sent from trusted workspaces.'], ['Which editors?', 'VS Code (Marketplace), and Cursor, VSCodium and Windsurf (Open VSX).']],
    },

    'zen-theme': {
        seo: { title: 'Zen Theme for VS Code: a calm light and dark theme for a full day of code', description: 'Ten grays around the code, five soft pastels in it, and red, green and yellow only when something happened. Measured contrast, bold keywords, light and dark. Free.' },
        hero: { eyebrow: 'Zen Theme · for VS Code, Cursor, VSCodium and Windsurf', title: 'A theme you can read for ten hours, in light and in dark.', lead: 'Everything around the code is gray. Keywords are bold, not colored. Five soft pastels tell strings, functions, types, parameters and values apart, and red, green and yellow appear only when something happened.', image: shot('zen-theme', 'zen-dark.png'), alt: 'Zen Dark: TypeScript with bold keywords and pastel strings on a near-black editor' },
        problem: { title: 'My editor was the loudest thing on my screen', text: ['I spend ten hours a day in an editor. Every popular theme I tried painted the whole screen: purple keywords, pink operators, green strings, orange parameters, a blue-tinted background. After a few hours I stopped seeing the code and started seeing confetti.', 'So I designed the theme I wanted to look at all day, on the design system of my own products.'] },
        steps: { title: 'Two minutes to a calmer editor', items: [['Install', 'From the Marketplace or Open VSX.'], ['Pick', 'Cmd+K Cmd+T (Ctrl+K Ctrl+T): Zen Light or Zen Dark.'], ['Follow your system', 'Set light and dark to switch with your system at sunset.'], ['Add the icons', 'Zen Icons: every vscode-icons icon, in the same key.']] },
        showcase: [
            { title: 'Zen Dark: what floats, rises', text: 'Menus, suggestions, hovers and the command palette sit one step lighter than the panels, so they read as a layer above the code.', image: shot('zen-theme', 'zen-dark.png'), alt: 'Zen Dark' },
            { title: 'Zen Light: the matched pair', text: 'The same roles and the same hues, so switching at sunset does not make your code look like another file.', image: shot('zen-theme', 'zen-light.png'), alt: 'Zen Light' },
        ],
        features: { title: 'Color with a job, contrast you can measure', items: [['Color has a job', 'In the code, five pastels; outside it, color means state: red is an error, green an addition, yellow a warning.'], ['Measured contrast', 'Code colors solved to 5:1 on Zen Light and 7.5:1 on Zen Dark; comments at 4.8:1 and 7.4:1. WCAG AA asks for 4.5:1.'], ['Hierarchy by weight', 'import, export, class, const, return and if are bold, in the same ink as the code.'], ['One gray ramp around the code', 'Side bar, tabs, panels and status bar in ten grays. Nothing competes with the code.'], ['Light and dark, matched', 'Same roles, same hues, both free.'], ['Zen Icons', '1,500 icons for about 600 file extensions, in the same pastels.'], ['Fira Code, with ligatures', 'Set by default; if it is missing, a notice offers the download in one click.'], ['Almost nothing runs', 'One font check at startup. No network, no telemetry, no upsell.']] },
        compare: { title: 'How it compares', note: 'Contrast measured on each theme’s dark variant. Something changed? Tell me at ciromaciel.click/contact.', columns: ['Zen Theme', 'Dracula', 'One Dark Pro', 'Monokai Pro', 'GitHub Theme'], rows: [['Light and dark, free', 'Yes', 'No: light is paid', 'No: dark only', 'Partial: paid', 'Yes'], ['Gray workbench, no tinted chrome', 'Yes', 'No', 'No', 'Partial', 'No'], ['Comment contrast, dark', '7.4:1', '3.0:1', '3.7:1', '2.9:1', '6.2:1'], ['Keywords in bold', 'Yes', 'Partial', 'No', 'No', 'No'], ['Price', 'Free', 'Free; Pro paid', 'Free', 'Paid', 'Free']] },
        pricing: { free: ['Both themes and Zen Icons, for good', 'Every editor, commercial use included', 'No network, no telemetry'], freeNote: 'Zen Theme is free: both themes, the icons, every editor, commercial use included.' },
        closing: 'Give your eyes a calmer screen today.',
        faq: [['Is it free?', 'Yes. Both themes, every editor, commercial use included.'], ['Does it work with semantic highlighting?', 'Yes. Semantic tokens are on, and const variables stay in plain ink: only true literals get the violet.'], ['Why bold instead of a keyword color?', 'Weight is the strongest signal that does not add color, so the five code colors stay free for what they mean.'], ['Which editors?', 'VS Code, Cursor, VSCodium, Windsurf and code-server.']],
    },

    'assistencia-dev-tracker': {
        seo: { title: 'Dev Tracker for VS Code: log support, mentoring and incident work', description: 'Start a session when someone needs you, finish it when they are unblocked: client, ticket, branch, outcome and duration, kept local and exportable to CSV. Free, no account.' },
        hero: { eyebrow: 'Dev Tracker · for VS Code, Cursor, VSCodium and Windsurf', title: 'The help you give every week, finally on record.', lead: 'Start a session when a teammate or a client needs you, finish it when they are unblocked. Client, project, ticket, Git branch, outcome and duration, kept on your machine and exported to CSV for a report or an invoice.', image: shot('assistencia-dev-tracker', 'sidebar-active-session.png'), alt: 'The side bar with an active incident session, its branch and notes' },
        problem: { title: 'The best technical work disappears into calls and threads', text: ['A teammate cannot run the project. A client’s deploy is red. A junior needs forty minutes on the outbox pattern. A good part of every week goes into this kind of help, and at the end of the month none of it is anywhere: not in Git, not in the tickets, not in the invoice.', 'So I built a log that lives where the help happens: one command to start, notes while you work, and the proof when you finish.'] },
        steps: { title: 'From a call for help to a line in the report', items: [['Start', 'Client and project prefilled; pick a category and a priority and type the ticket.'], ['Work', 'Notes go in while you help; the status bar shows who you are helping.'], ['Finish', 'Resolved, Partial, Blocked or Escalated, and one sentence of summary.'], ['Export', 'CSV or JSON, one row per session, for a spreadsheet, an invoice or a client report.']] },
        showcase: [
            { title: 'Start a session in seconds', text: 'Client and project come prefilled. Pick a category: setup, bug, code review, architecture, incident, deploy, security, mentoring.', image: shot('assistencia-dev-tracker', 'start-session.png'), alt: 'The Start Assistance flow with the category picker' },
            { title: 'Always one glance away', text: 'The active session at the top of the side bar, with ticket, priority, branch and notes, and the month’s totals below.', image: shot('assistencia-dev-tracker', 'dashboard.png'), alt: 'The dashboard with completed sessions and tracked time' },
            { title: 'Numbers you can hand over', text: 'One row per session: client, project, ticket, category, outcome, duration, branch, changed files, notes and summary.', image: shot('assistencia-dev-tracker', 'csv-export.png'), alt: 'The exported CSV open in VS Code' },
        ],
        features: { title: 'It logs help, not keystrokes', items: [['Sessions, not surveillance', 'Nothing is recorded until you start a session.'], ['Context without typing', 'Project from the workspace, client from your default, branch read at the start.'], ['Proof at the end', 'The outcome, a one-line summary, the duration and the files Git shows as changed.'], ['One glance away', 'Side bar and status bar always show what is running.'], ['Totals on a dashboard', 'Completed sessions, tracked time and an estimated time saved, with a multiplier you set.'], ['Export everything', 'Every field in CSV or JSON.'], ['Local, and only local', 'No account, no telemetry, no network calls.'], ['Any editor', 'VS Code, Cursor, VSCodium and Windsurf.']] },
        compare: { title: 'How it compares', note: 'From each tool’s public listing. Something changed? Tell me at ciromaciel.click/contact.', columns: ['Dev Tracker', 'WakaTime', 'CodeTime', 'Tempo'], rows: [['Logs help by client, project and ticket', 'Yes', 'No: coding time', 'No: coding time', 'Partial: Jira worklogs'], ['Notes, outcome and summary per session', 'Yes', 'No', 'No', 'Partial'], ['Changed files and branch captured', 'Yes', 'Partial: branch', 'No', 'No'], ['No account, data stays local', 'Yes', 'No', 'No', 'No'], ['CSV / JSON export', 'Yes', 'Partial', '—', 'Partial']] },
        pricing: { free: ['Every feature, for good', 'No account, no key, nothing to configure', 'Local only: no telemetry, no network calls'], freeNote: 'Dev Tracker is free and runs entirely on your machine.' },
        closing: 'Start a session the next time someone asks for your help.',
        faq: [['Where is my data stored?', 'In VS Code’s storage for your profile. Nothing leaves your machine unless you export it.'], ['Does it track me automatically?', 'No. A session starts and ends when you say so; nothing is recorded in the background.'], ['What does "estimated saved time" mean?', 'Tracked time multiplied by a number you set. A rough signal you control, not a measurement.'], ['Which editors?', 'VS Code (Marketplace), and Cursor, VSCodium and Windsurf (Open VSX).']],
    },
}
