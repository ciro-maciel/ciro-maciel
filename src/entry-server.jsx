import React from 'react'
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import { App } from './App'

/**
 * One address of the site as HTML, with the same tree main.jsx hydrates.
 * Built by `vite build --ssr` and called by scripts/ssr.js after the build.
 *
 * A stream, not `renderToString`: the design system is `lazy()`, and
 * `onAllReady` waits for its chunk instead of writing the empty fallback.
 */
export function render(url) {
    return new Promise((resolve, reject) => {
        let html = ''
        const sink = new Writable({
            write(chunk, _encoding, done) {
                html += chunk.toString()
                done()
            },
            final(done) {
                resolve(html)
                done()
            },
        })
        const { pipe } = renderToPipeableStream(
            <React.StrictMode>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </React.StrictMode>,
            {
                onAllReady: () => pipe(sink),
                onShellError: reject,
                onError: reject,
            }
        )
    })
}
