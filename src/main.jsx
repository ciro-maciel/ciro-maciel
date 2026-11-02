import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './fonts.css'
import '@mantine/core/styles.css'
import '@ciromaciel/components-kit/style.css'

import './site.css'

import { App } from './App'

/* HYDRATE, DON'T REDRAW (13/10/2026). The build writes every page with the
   same React tree (scripts/ssr.js), so the first paint is already the final
   page. `hydrateRoot` only attaches the events to that HTML. Before, the HTML
   carried a plain-text version for crawlers and `createRoot` threw it away
   when the 1 MB bundle arrived: on a phone on a slow network the reader saw
   the text without styles for seconds, then the site.

   `createRoot` is left for a #root without the `data-ssr` mark: `bun run dev`,
   where nothing is prerendered, and the addresses that only redirect. */
const root = document.getElementById('root')
const app = (
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)

if (root.hasAttribute('data-ssr')) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)
