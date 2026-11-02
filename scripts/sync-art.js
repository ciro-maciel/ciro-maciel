/**
 * THE SITE'S LICENSED ILLUSTRATIONS, copied in at build time (02/11/2026).
 *
 *   bun scripts/sync-art.js     (run by `predev` and `prebuild`)
 *
 * The animated illustrations of the home page and of the line sections come
 * from a licensed stock gallery that can't be redistributed. They live in the
 * private ciro-maciel/assets (illustrations/website) and are copied here into
 * public/art and public/images/sections, which git ignores: this repository
 * never carries the files.
 *
 * The deploy checks out only that folder with a read-only deploy key
 * (.github/workflows/deploy-website.yml, ASSETS_DIR). Locally it reads the
 * sibling ../assets. Without either, the build goes on and the pages show no
 * illustration.
 */
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ASSETS = resolve(process.env.ASSETS_DIR || join(ROOT, '..', 'assets'))
const SOURCE = join(ASSETS, 'illustrations', 'website')

const TARGETS = {
    art: join(ROOT, 'public', 'art'),
    sections: join(ROOT, 'public', 'images', 'sections'),
}

if (!existsSync(SOURCE)) {
    console.warn(`! sync-art: ${SOURCE} not found, the pages build without illustrations`)
    process.exit(0)
}

let count = 0
for (const [folder, target] of Object.entries(TARGETS)) {
    const from = join(SOURCE, folder)
    mkdirSync(target, { recursive: true })
    for (const file of readdirSync(from).filter(name => name.endsWith('.svg'))) {
        cpSync(join(from, file), join(target, file))
        count++
    }
}
console.log(`✓ sync-art: ${count} illustrations`)
