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
        faq: [
            ['What is sent to the model?', 'The trace you selected or copied, and the source around the resolved frames. Nothing else. With your own key it goes to OpenRouter and the provider of the model you picked; with Pro it goes to my server, which checks your license and asks Claude Haiku 5.5.'],
            ['Does it need the code locally?', 'Yes, that is the point. Frames that do not resolve to a file in your workspace are still sent as text, without code, and the diagnosis marks them as "source not found".'],
            ['Can it read a trace from production logs?', 'Yes, as long as the files exist in your workspace. When the paths do not match your machine, it falls back to finding the file by name.'],
            ['Which editors?', 'VS Code (Marketplace), and Cursor, VSCodium and Windsurf (Open VSX).'],
            ['How do I activate Pro?', 'Subscribe on this page, copy the license key it shows, run "Enter Pro License Key" from the command palette and paste it. With an OpenRouter key set, the extension keeps using your key and never calls the Pro server.'],
            ['How do I cancel?', 'Write to me at ciromaciel.click/contact and I cancel it.'],
        ],
    },
}
