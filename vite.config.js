import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { agentSpecPlugin } from './plugins/agent-spec-plugin.js'

export default defineConfig({
    /* `agentSpecPlugin` serve /design-system.txt, /design-system.json e
       /llms-design.txt — as três rotas que a seção "Para agentes" da página
       /design-system oferece para copiar e baixar. Sem ele os três botões
       fazem fetch em 404 e a SPA devolve o index.html, que é pior que o erro:
       o agente recebe HTML achando que recebeu a spec. */
    plugins: [react(), agentSpecPlugin()],
    /* Development only: the kit of a book not yet on sale shows the cover
       straight from the books repository (pages/BookKit.jsx, `preview`), so
       nothing of an unpublished book is copied into public/. */
    server: { fs: { allow: ['.', '../learning'] } },
})
