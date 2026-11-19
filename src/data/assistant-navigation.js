/**
 * /assistant-navigation (19/11/2026): the open-source Chrome extension and MCP server that lets an agent use the person's
 * own logged-in Chrome. In English, like the repository: the people who install it read English.
 *
 * Who arrives: a developer whose agent needs a dashboard, an inbox or an account that only opens logged in as them.
 * What blocks them: the debugger banner and the tab to keep open of the usual tools. What they leave with: the extension
 * installed and their agent connected. Every fact was read from open-source/assistant-navigation/README.md on 19/11/2026.
 */
const REPO = 'https://github.com/ciro-maciel/assistant-navigation'

export const ASSISTANT_NAVIGATION = {
    path: '/assistant-navigation',
    repo: REPO,
    release: `${REPO}/releases/latest`,
    seo: {
        title: 'Assistant Navigation: let AI agents use your real, logged-in Chrome',
        description: 'A free, open-source Chrome extension and MCP server. No debugger banner, no tab to keep open: your agent reads, clicks and types in your own Chrome.',
    },
    hero: {
        eyebrow: 'Open source · Chrome extension and MCP server',
        title: 'Let AI agents use your real, logged-in Chrome.',
        description: 'Your agent needs a dashboard, an inbox or an account that only opens logged in as you. Assistant Navigation gives it your own Chrome: it reads pages, clicks, types and takes pictures in a tab group of its own, in the window you are using. From Claude Code on your laptop or an agent in the cloud.',
        image: '/images/assistant-navigation/icon-512.png',
        alt: 'The Assistant Navigation icon',
    },
    why: {
        title: 'No banner, no tab to keep open',
        text: 'Most tools drive Chrome through its debugger, so Chrome shows a warning on top of every window while it is on, and many need a tab or a window held open. Assistant Navigation uses only plain extension APIs.',
        items: [
            'No debugger banner, ever',
            'No tab to keep open: the extension holds the connection and turns itself back on with Chrome',
            'One connection code, made once: paste it into your agent and forget it',
            'Your window, your tabs: the agents’ tabs open in the background, in their own tab group',
        ],
    },
    install: {
        title: 'Install and connect',
        steps: [
            'Download assistant-navigation-extension.zip from the latest release and unzip it into a folder you will keep.',
            'Open chrome://extensions, turn on Developer mode, click Load unpacked and pick that folder.',
            'The extension opens its page with your connection code. Copy it.',
            'Add it to your agent. In Claude Code:',
        ],
        command: 'claude mcp add assistant-navigation --scope user --env ASSISTANT_NAVIGATION_CODE="<your connection code>" -- npx -y github:ciro-maciel/assistant-navigation',
        note: 'Cursor, Claude Desktop and any MCP client use the same server; the README has the JSON. The server needs Node 22+ or Bun and has no dependencies. The Chrome Web Store listing is on the way.',
    },
    tools: {
        title: 'What the agent can do',
        items: [
            ['browser_tabs', 'Lists your open tabs', 'read'],
            ['browser_open', 'Opens a tab in your window, in the agents’ group', 'act'],
            ['browser_read', 'The page’s text and its elements, numbered, iframes and shadow DOM included', 'read'],
            ['browser_click, browser_type, browser_select', 'Acts on a numbered element', 'act'],
            ['browser_screenshot', 'A picture of a tab; you are taken back to the tab you were on', 'read'],
        ],
        note: 'Each tool has a risk: read only looks or moves around, act changes something. If your app asks a person before acting, weigh the act ones.',
    },
    next: {
        text: 'Assistant Navigation is how the agents of Assistant use your browser. Assistant is the AI assistant that works in your tools, part of the Agents line.',
        label: 'See the Agents line',
        href: 'https://myagents.click/en?ref=assistant-navigation-page',
    },
}
