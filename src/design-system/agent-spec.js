/**
 * agent-spec.js — a especificação inteira como texto puro.
 *
 * Existe porque uma página React não é legível por agente: quem faz fetch em
 * /design-system recebe `<div id="app"></div>` e mais nada. Este módulo gera a
 * mesma informação em Markdown, servida em /design-system.txt e embutida na
 * própria página como <script type="application/llms.txt">.
 *
 * Gerada a partir de tokens.js e api.js — as mesmas constantes que a página
 * renderiza, então não há como o texto divergir do visual.
 */

import {
    BLOCKERS,
    BORDERS,
    BREAKPOINTS,
    CHECKLIST,
    CONTAINERS,
    CONTRAST_TABLE,
    FLUID_SCALE,
    FONT_FAMILY,
    FONT_WEIGHTS,
    GRAY_RAMP,
    LINE_HEIGHTS,
    LOSS_COLOR,
    MEASURES,
    META,
    MOTION,
    PRINCIPLES,
    RADIUS,
    SECTION_VOCABULARY,
    SPACE_SCALE,
    STAGE_RHYTHM,
    TRACKING,
    TYPE_ROLES,
    UNIVERSAL_PROPS,
    SURFACES,
    PANEL_LAYOUT,
    PAGE_HEADER,
    TABLE_SPEC,
    SEARCH_SPEC,
    STATES,
    DESTRUCTIVE,
    FORM_SPEC,
    SIDEBAR_SPEC,
} from './tokens.js'
import { ALIASES, COMPONENTS, PITFALLS, PRIMITIVES, RECIPES, SETUP } from './api.js'

const AUDIT_SCRIPT = `#!/usr/bin/env bash
#
# audit-design-system.sh — auditoria automática do Zen Design System.
#
# Varre o código-fonte e falha (exit 1) se houver violação das regras
# invariantes. Feito para rodar num agente antes de reportar que terminou.
#
#   bash tools/audit-design-system.sh [diretório]   # default: src/
#
# Usa apenas grep POSIX (sem lookahead PCRE), então roda igual em macOS e Linux.
#
# Arquivos que *documentam* o sistema — a página /design-system e seus módulos —
# citam hex e valores proibidos como conteúdo, não como estilo aplicado. Eles
# são ignorados via EXCLUDE. Se você criar outro arquivo de documentação,
# acrescente-o lá.

set -uo pipefail

TARGET="\${1:-src/}"
FAILED=0

EXCLUDE=(
    --exclude-dir=node_modules
    --exclude-dir=dist
    --exclude=tokens.js
    --exclude=api.js
    --exclude=agent-spec.js
    --exclude=DocsKit.jsx
    --exclude=design-system.jsx
    --exclude=branding.jsx
)

# report <título> <saída-do-grep>
report() {
    local title="$1" output="$2"
    if [ -n "$output" ]; then
        printf '\\n  FALHA  %s\\n' "$title"
        printf '%s\\n' "$output" | sed 's/^/         /'
        FAILED=1
    else
        printf '  OK     %s\\n' "$title"
    fi
}

printf '\\nAuditoria Zen — %s\\n\\n' "$TARGET"

# --- Lei 1: conteúdo sobre cromo ---------------------------------------------

# radius que não seja 0. Sem lookahead: pega todos e filtra os válidos depois.
# \`50%\` passa: um avatar redondo é a forma do conteúdo (o retrato de alguém),
# não um canto arredondado aplicado a uma moldura.
report 'radius sempre 0' "$(
    grep -rnoE 'radius=(\\"[^\\"]*\\"|\\{[^}]*\\})' "$TARGET" --include=*.jsx "\${EXCLUDE[@]}" 2>/dev/null \\
        | grep -vE 'radius=("0"|\\{0\\}|"50%"|"var\\(--rlg-radius\\)")' || true
)"

# Sombra é proibida em SUPERFÍCIE (card, painel, seção) — ali a delimitação é
# o filete de 1px. Overlays reais (Menu, Popover, Modal) flutuam sobre o
# conteúdo e a sombra comunica essa camada, então \`--mantine-shadow-*\` passa.
report 'sem box-shadow em superfície' "$(
    grep -rnE 'boxShadow|box-shadow' "$TARGET" --include=*.jsx "\${EXCLUDE[@]}" 2>/dev/null \\
        | grep -vE "none|shadow=\\"none\\"|mantine-shadow-|inset" || true
)"

report 'sem gradiente' "$(
    grep -rnE 'linear-gradient|radial-gradient' "$TARGET" --include=*.jsx "\${EXCLUDE[@]}" 2>/dev/null || true
)"

# Três contextos usam hex legitimamente e ficam fora do alcance dos tokens:
# syntax highlighting (o tema do bloco de código não é o tema da UI), semáforo
# de status up/down (semântica que cinza não expressa) e valor default de um
# color picker que o próprio usuário escolhe. Marque-os com o comentário
# \`design-system-ignore\` na mesma linha.
report 'sem hex literal (use tokens)' "$(
    grep -rnE '#[0-9a-fA-F]{6}\\b' "$TARGET" --include=*.jsx "\${EXCLUDE[@]}" 2>/dev/null \\
        | grep -v 'design-system-ignore' || true
)"

# --- Lei 2: hierarquia massiva ------------------------------------------------

report 'peso em {500,700,800,900}' "$(
    grep -rnoE 'fw=\\{[0-9]+\\}' "$TARGET" --include=*.jsx "\${EXCLUDE[@]}" 2>/dev/null \\
        | grep -vE 'fw=\\{(500|700|800|900)\\}' || true
)"

report 'letter-spacing na escala' "$(
    grep -rnoE '(^|[^a-zA-Z])lts="[^"]*"' "$TARGET" --include=*.jsx "\${EXCLUDE[@]}" 2>/dev/null \\
        | grep -vE 'lts="(-0\\.04em|1px|1\\.5px|2px)"' || true
)"

# gray.4 fora de label. O JSX do projeto quebra cada prop em sua própria linha,
# então o uppercase pode estar até ~6 linhas do c="gray.4": olhamos a vizinhança
# do match, não a linha isolada.
report 'gray.4 só em label uppercase' "$(
    grep -rn -B6 -A6 'c="gray\\.4"' "$TARGET" --include=*.jsx "\${EXCLUDE[@]}" 2>/dev/null \\
        | awk -v RS='--\\n' '!/uppercase/ && /c="gray\\.4"/' \\
        | grep -E 'c="gray\\.4"' || true
)"

# --- Cor ----------------------------------------------------------------------

# \`red.6\` é a exceção cromática única do sistema: semântica de perda
# quantificada, não de erro genérico.
report 'só a rampa gray (+ red.6)' "$(
    grep -rnoE 'c="(blue|green|red|yellow|orange|violet|teal|cyan|pink|indigo|lime|grape)\\.[0-9]"' \\
        "$TARGET" --include=*.jsx "\${EXCLUDE[@]}" 2>/dev/null \\
        | grep -v 'c="red\\.6"' || true
)"

# --- Acessibilidade -----------------------------------------------------------

report 'imagem com alt' "$(
    grep -rn '<img' "$TARGET" --include=*.jsx "\${EXCLUDE[@]}" 2>/dev/null \\
        | grep -v 'alt=' || true
)"

# --- Resultado ----------------------------------------------------------------

printf '\\n'
if [ "$FAILED" -eq 0 ]; then
    printf 'Auditoria passou. Nenhuma violação encontrada.\\n\\n'
    exit 0
fi
printf 'Auditoria FALHOU. Corrija as violações acima antes de entregar.\\n\\n'
exit 1
`

const table = (headers, rows) =>
    [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`, ...rows.map(r => `| ${r.join(' | ')} |`)].join(
        '\n',
    )

const propsTable = props => table(['Prop', 'Tipo', 'Nota'], props.map(([n, t, d]) => [`\`${n}\``, `\`${t}\``, d || '']))

export function buildAgentSpec() {
    const s = []
    const w = (...lines) => s.push(...lines)

    /* ------------------------------------------------------------------ */
    w(`# ${META.name} — Especificação completa para agentes`)
    w('')
    w(
        `> Design system autocontido. Tudo o que é necessário para construir, atualizar e **validar** uma interface Zen está neste documento — não é preciso abrir o repositório.`,
    )
    w('')
    w(`Versão ${META.version} · extraído de \`${META.source}\` (${META.componentCount} componentes, ${META.primitiveCount} primitivas).`)
    w('')
    w('Cada regra foi medida na frequência real de uso no código em produção. As contagens (`44×`, `57 ocorrências`) são dados, não estimativas.')
    w('')
    w('---')
    w('')

    /* --- Como usar este documento --- */
    w('## Como usar este documento')
    w('')
    w('1. Leia **Regras invariantes** — são bloqueios, não sugestões.')
    w('2. Consulte **Tokens** para qualquer valor. Nunca invente um valor novo.')
    w('3. Use **API dos componentes** para escrever o código.')
    w('4. Copie de **Receitas** quando a tarefa se encaixar num padrão conhecido.')
    w('5. Antes de entregar, rode o **Protocolo de validação** — ele é executável.')
    w('')
    w('---')
    w('')

    /* --- Resumo --- */
    w('## O sistema em 30 segundos')
    w('')
    w('```')
    w('Uma fonte      Montserrat, pesos 500 / 700 / 800 / 900 — nenhum outro')
    w('Uma cor        cinza, 10 degraus, #FFFFFF → #11181C')
    w(`Um raio        0 (${RADIUS.occurrences} ocorrências no kit, ${RADIUS.exceptions} exceções)`)
    w('Um contorno    1px solid #F3F4F6')
    w('Quatro papéis  label 10–13px · dado 12–14px · corpo 15–20px · display 32–120px')
    w('Dois fundos    #FFFFFF e #F9FAFB')
    w('Duas densidades palco (convencer) e painel (operar) — mesmos tokens')
    w('```')
    w('')
    w(
        'Não há cor de marca, sombra, canto arredondado ou segunda família tipográfica. **Tamanho, peso e espaço são os únicos instrumentos de hierarquia.**',
    )
    w('')
    w('---')
    w('')

    /* --- Leis --- */
    w('## As seis leis')
    w('')
    PRINCIPLES.forEach(p => {
        w(`### Lei ${p.n} — ${p.name}`)
        w('')
        w(`**${p.summary}**`)
        w('')
        w(p.detail)
        w('')
        w(`_${p.corollary}_`)
        w('')
    })
    w('---')
    w('')

    /* --- Invariantes --- */
    w('## Regras invariantes')
    w('')
    w('Violar qualquer uma destas reprova o trabalho. Não são preferências:')
    w('')
    w(table(['Regra', 'Valor', 'Lei'], [
        ['`border-radius`', '**sempre 0**, sem exceção', '1'],
        ['`box-shadow`', '**nunca**', '1'],
        ['Cor', 'só a rampa gray (exceção única: `red.6` para perda quantificada)', '1'],
        ['Peso da fonte', 'só 500, 700, 800, 900', '2'],
        ['`letter-spacing`', 'só `-0.04em`, `1.5px`, `2px`', '2'],
        ['Salto tipográfico', '≥3× entre níveis adjacentes', '2'],
        ['Cor de corpo', '`gray.6` — nunca `gray.9`', '2'],
        ['Cor de título', '`gray.9` — nunca `gray.6`', '2'],
        ['`gray.4`', 'só em label uppercase (falha AA em corpo)', '2'],
        ['Borda', '`1px solid gray.2`', '1'],
        ['Palco', 'envolver `Section`, nunca reimplementar', '3'],
        ['Props', 'dados, nunca JSX', '4'],
        ['Fundo', 'alterna `white` ↔ `gray` a cada seção', '3'],
        ['Mobile', 'sempre 1 coluna', '3'],
        ['Métrica grande', 'sempre acompanhada de nota de verificação', '5'],
        ['Piso tipográfico', 'nada abaixo de 12px, exceto label uppercase (10–11px)', '2'],
        ['Erro', 'sempre `red.6` — nunca a mesma cor do sucesso', '5'],
        ['Skeleton', 'reproduz a grade real do conteúdo', '3'],
    ]))
    w('')
    w('---')
    w('')

    /* --- Tokens: cor --- */
    w('## Tokens — Cor')
    w('')
    w('### A rampa')
    w('')
    w('Degraus 0–3 são superfície e estrutura; 4–9 são tinta. Nenhum atravessa a fronteira.')
    w('')
    w(table(['Token', 'Hex', 'Papel', 'Uso', 'Freq.'],
        GRAY_RAMP.map(c => [`\`${c.token}\``, `\`${c.hex}\``, c.role, c.usage, c.count ? `${c.count}×` : '—'])))
    w('')
    w('**As duas cores de trabalho:** `gray.9` para o que grita (36×), `gray.6` para o que fala (50×). Todo o resto é ajuste fino.')
    w('')
    w('### Os três pretos')
    w('')
    w('- `gray.9` (#11181C) — títulos, métricas, fundo de botão. Não é `#000`: o preto puro em tela grande vibra e cansa.')
    w('- `gray.7` (#374151) — corpo quando precisa de mais presença (parágrafo curto e central).')
    w('- `gray.6` (#4B5563) — corpo padrão. Em dúvida sobre a cor de um parágrafo, é esta.')
    w('')
    w('### Fundos de seção')
    w('')
    w('```js')
    w("SECTION_BACKGROUNDS = { white: 'gray.0', gray: 'gray.1' }")
    w('```')
    w('')
    w('Dois tons de palco por página, no claro e no escuro: `gray.0` (#FFFFFF / #0B0F12, o body) e `gray.1` (#F9FAFB / #12181D). Palco é tudo que ocupa a largura: faixa, body, cabeçalho e o painel do menu, rodapé, página de documento. O `white` do Mantine não é palco: no escuro vale #1A2127, a superfície elevada de cartão, modal e menu suspenso. Em 21/10/2026 o cabeçalho e a newsletter usavam `white` e a home escura mostrou três tons.')
    w('')
    w('Palcos consecutivos alternam. O contraste é de ~2% de luminância — deliberado: não separa as seções, apenas dá textura ao scroll. A separação real vem do `py` de 80–120px.')
    w('')
    w('### Exceção cromática')
    w('')
    w(`\`${LOSS_COLOR.token}\` (${LOSS_COLOR.hex}) — ${LOSS_COLOR.usage}. Aparece uma vez no kit inteiro, em \`Comparison.jsx\`, sob o custo da coluna "modo tradicional". É semântica de **perda**, não de erro genérico.`)
    w('')
    w('### Contraste (sobre #FFFFFF)')
    w('')
    w(table(['Token', 'Ratio', 'Status'], CONTRAST_TABLE.map(c => [`\`${c.token}\``, c.ratio, c.pass ? c.status : `**${c.status}**`])))
    w('')
    w('`gray.4` só é legítimo em label uppercase peso 800 — texto curto, não-essencial, redundante com o título abaixo. Nunca em parágrafo.')
    w('')
    w('---')
    w('')

    /* --- Tokens: tipografia --- */
    w('## Tokens — Tipografia')
    w('')
    w('### Família')
    w('')
    w('```css')
    w(`font-family: ${FONT_FAMILY};`)
    w('```')
    w('')
    w('Pilha sistema-primeiro: se o Google Fonts falhar, degrada para a fonte nativa, não para Times.')
    w('')
    w('### Pesos')
    w('')
    w(table(['Peso', 'Nome', 'Uso', 'Freq.'], FONT_WEIGHTS.map(f => [`**${f.value}**`, f.name, f.usage, `${f.count}×`])))
    w('')
    w('Não existe 400 declarado: quando o peso é escrito, é para subir. **900 e 800 nunca se tocam no mesmo bloco** sem um salto de tamanho de 4× separando-os.')
    w('')
    w('**600 não existe neste sistema.** Está próximo demais de 700 para carregar significado distinto — onde aparecer, vira 700.')
    w('')
    w('### Os quatro papéis')
    w('')
    Object.entries(TYPE_ROLES).forEach(([k, r]) => {
        w(`**${r.name}** — _${r.tagline}_`)
        w('')
        w('```')
        w(`${r.fontSize} · peso ${r.fontWeight} · ls ${r.letterSpacing} · ${r.color} · lh ${r.lineHeight}${r.textTransform === 'uppercase' ? ' · UPPERCASE' : ''}`)
        w('```')
        w('')
    })
    w('### Escala fluida')
    w('')
    w('```css')
    FLUID_SCALE.forEach(f => w(`${f.token}: ${f.value};  /* ${f.range} — ${f.usage} */`))
    w('```')
    w('')
    w('Fórmula sempre `clamp(min, Nvw + 1rem, max)`. O `+ 1rem` preserva a preferência de fonte do usuário — `vw` puro a ignora. Nenhum título tem tamanho fixo.')
    w('')
    w('### Tracking')
    w('')
    w(table(['Nome', 'Valor', 'Uso'], TRACKING.map(t => [t.name, `\`${t.value}\``, t.usage])))
    w('')
    w('`-0.04em` é relativo (escala com a fonte fluida); `1.5px` é absoluto (label é sempre 10–13px). A inversão de sinal é o ponto: display precisa reagrupar, label precisa respirar.')
    w('')
    w('### Line-height')
    w('')
    w(table(['Valor', 'Uso', 'Freq.'], LINE_HEIGHTS.map(l => [`\`${l.value}\``, l.usage, `${l.count}×`])))
    w('')
    w('### O par canônico')
    w('')
    w('O padrão que define visualmente a marca — label e título opostos em cinco dimensões ao mesmo tempo:')
    w('')
    w(table(['Dimensão', 'Label', 'Título'], [
        ['Tamanho', '11px', '44px'],
        ['Peso', '800', '900'],
        ['Caixa', 'Alta', 'Sentença'],
        ['Tracking', '+1.5px', '−0.04em'],
        ['Cor', '`gray.4`', '`gray.9`'],
    ]))
    w('')
    w('```jsx')
    w('<Stack gap="xs">')
    w('    <Text size="xs" fw={800} tt="uppercase" lts="1.5px" c="gray.4">Prova verificável</Text>')
    w('    <Title order={2} fz="var(--fz-section-title)" maw={800}>Números que você pode conferir.</Title>')
    w('</Stack>')
    w('```')
    w('')
    w('Nunca reimplemente à mão — use `SectionHeader` ou `Section`.')
    w('')
    w('---')
    w('')

    /* --- Tokens: espaço --- */
    w('## Tokens — Espaço')
    w('')
    w('### A escala')
    w('')
    w(table(['Token', 'px', 'Uso', 'Freq.'], SPACE_SCALE.map(s => [`\`${s.token}\``, s.px, s.usage, `${s.count}×`])))
    w('')
    w('**`xs` e `xl` dominam com 18 usos cada.** Ou colado (é um só objeto), ou muito separado (são objetos distintos). O meio-termo é raro por design — ambiguidade de agrupamento é ruído.')
    w('')
    w('### Ritmo vertical')
    w('')
    w(table(['Contexto', 'Valor'], STAGE_RHYTHM.map(r => [r.name, `\`${r.value}\``])))
    w('')
    w('### Containers')
    w('')
    w(table(['Size', 'Largura', 'Quando'], CONTAINERS.map(c => [`\`${c.size}\``, `${c.width}px`, c.usage])))
    w('')
    w('### Larguras de leitura (`maw`)')
    w('')
    w(table(['maw', 'Uso'], MEASURES.map(m => [`\`${m.maw}\``, m.usage])))
    w('')
    w('**Regra:** título até 900. Corpo nunca acima de 780 (ideal 620 = 60–75 caracteres). Nota sempre estreita.')
    w('')
    w('### Breakpoints')
    w('')
    w(table(['Token', 'em', 'px', 'Papel'], BREAKPOINTS.map(b => [`\`${b.token}\``, b.em, b.px, b.usage])))
    w('')
    w('Quase todo responsivo do kit é `{ base, md }`. **Mobile é sempre 1 coluna.**')
    w('')
    w('### O palco')
    w('')
    w('```jsx')
    w('<Box component="section" id={id} bg={bg} py={{ base: 80, md: 120 }}>')
    w('    <Container size="lg">')
    w('        <Stack gap="xl">                        {/* separa anúncio de conteúdo */}')
    w('            <SectionHeader ... />               {/* gap xs interno cola o par */}')
    w('            <Box>{children}</Box>')
    w('        </Stack>')
    w('    </Container>')
    w('</Box>')
    w('```')
    w('')
    w('---')
    w('')

    /* --- Tokens: forma --- */
    w('## Tokens — Forma')
    w('')
    w(`### Raio: ${RADIUS.value}`)
    w('')
    w(`\`radius="0"\` aparece **${RADIUS.occurrences} vezes** no kit; qualquer outro valor, **${RADIUS.exceptions} vezes**. É invariante, não preferência.`)
    w('')
    w('Canto arredondado é cromo puro — não comunica nada, apenas suaviza, e suavizar é o oposto do que a hierarquia massiva precisa. O canto reto também alinha bordas adjacentes ao pixel. A única forma curva do sistema é o ponto do `Badge variant="dot"`, que é conteúdo.')
    w('')
    w('### Sombra: nenhuma')
    w('')
    w('Profundidade vem de: contraste de superfície (card `white` sobre palco `gray.1`), filete de 1px, ou camada real via `z-index`.')
    w('')
    w('- **`Paper`** = superfície declarada (`withBorder`, `bg white`). Quando o bloco precisa se destacar do palco.')
    w('- **`Card`** = agrupamento invisível (`withBorder: false`, `bg transparent`). Quando o espaço já basta. **Na dúvida, este.**')
    w('')
    w('### Bordas')
    w('')
    w(table(['Nome', 'Valor', 'Uso'], BORDERS.map(b => [b.name, `\`${b.value}\``, b.usage])))
    w('')
    w('### Inputs')
    w('')
    w('O input é uma caixa de borda inteira — o campo se declara antes de ser tocado.')
    w('')
    w('```js')
    w("TextInput: {")
    w("    defaultProps: { size: 'lg', radius: '0' },")
    w("    styles: { input: { border: '1px solid var(--mantine-color-gray-2)', paddingLeft: 16, paddingRight: 16 } },")
    w('}')
    w('```')
    w('')
    w('`size="lg"` porque o alvo de toque precisa ser generoso; a borda de 1px em volta declara a área clicável antes do toque.')
    w('')
    w('### Botões')
    w('')
    w('Um botão é um **label num retângulo preto**: `gray.9` preenchido, texto uppercase peso 800, `ls 1px`, raio 0. Hierarquia sem cor: `filled` (primário) → `outline` (secundário) → `subtle` (terciário).')
    w('')
    w('### Movimento')
    w('')
    w('A única animação do sistema:')
    w('')
    w('```css')
    w(`transition: ${MOTION.transition};`)
    w(`/* :hover */ transform: ${MOTION.transform}; filter: ${MOTION.filter};`)
    w('```')
    w('')
    w('1px de subida, 10% de brilho. Sem escala, sem troca de cor, sem sombra crescendo.')
    w('')
    w('### Ícones')
    w('')
    w('Tabler Icons, sempre `stroke={1.5}` — fino o bastante para não competir com texto peso 800 ao lado. `ThemeIcon` é sempre quadrado (`radius="0"`), nunca círculo.')
    w('')
    w('---')
    w('')

    /* --- Superfícies --- */
    w('## Palco e painel — uma escala, dois problemas')
    w('')
    w('Este é **um** design system. As leis, os tokens e a rampa são os mesmos em qualquer tela. O que muda é a densidade, e ela é decidida pelo problema que a tela resolve — não por ela ser "marketing" ou "app".')
    w('')
    w(table(['Superfície', 'Trabalho', 'Onde', 'Ritmo', 'Tipografia'],
        SURFACES.map(s => [`**${s.name}**`, s.job, s.where, `\`${s.rhythm}\``, s.type])))
    w('')
    w('A regra que separa os dois papéis de texto: **texto que se lê em sequência é `body`; texto que se compara em coluna é `data`.** Um parágrafo de 16px é confortável; uma tabela de 200 linhas em 16px é impossível de varrer.')
    w('')
    w('### Geometria do painel')
    w('')
    w('```')
    w(`Sidebar    ${PANEL_LAYOUT.sidebar.width}px (colapsada ${PANEL_LAYOUT.sidebar.collapsed}px) · bg ${PANEL_LAYOUT.sidebar.bg} · borderRight ${PANEL_LAYOUT.sidebar.border}`)
    w(`Conteúdo   px ${PANEL_LAYOUT.content.px} · pt ${PANEL_LAYOUT.content.pt} · pb ${PANEL_LAYOUT.content.pb} · maw ${PANEL_LAYOUT.content.maw}`)
    w(`Cabeçalho  mb ${PANEL_LAYOUT.pageHeaderMb}`)
    w(`Blocos     gap ${PANEL_LAYOUT.blockGap}`)
    w('```')
    w('')
    w('O palco usa `py 80–120` porque separa seções de uma narrativa. O painel não tem seções: tem uma tela só com barra lateral fixa. O respiro externo vira padding do container.')
    w('')
    w('---')
    w('')

    /* --- Cabeçalho de página --- */
    w('## Cabeçalho de página')
    w('')
    w('O par canônico em versão de painel: label pequeno colado a um título pesado. Duas diferenças do palco — o título é 36px fixo (o painel tem largura controlada, não precisa escalar com a viewport) e a linha ganha zona de ações à direita.')
    w('')
    w(table(['Parte', 'Spec', 'Papel'], PAGE_HEADER.map(p => [`\`${p.part}\``, p.spec, p.role])))
    w('')
    w('```jsx')
    w(`<Group justify="space-between" align="flex-start" wrap="nowrap" gap={24} mb={32}>
    <Stack gap={8} flex={1} miw={0}>
        <Text fz={10} fw={800} c="gray.4" tt="uppercase" lts="1.5px">{crumb}</Text>
        <Title order={1} fz={36} fw={900} lh={1} lts="-0.04em">{title}</Title>
        <Text fz={15} fw={500} c="gray.6" lh={1.5}>{subtitle}</Text>
    </Stack>
    <Group gap="md" wrap="nowrap" flex="none">
        {search}
        {actions}
    </Group>
</Group>`)
    w('```')
    w('')
    w('**Um botão primário por tela.** Se há duas ações igualmente importantes, uma delas não é.')
    w('')
    w('---')
    w('')

    /* --- Sidebar --- */
    w('## Navegação lateral')
    w('')
    w('O item ativo é marcado por **preenchimento `gray.9` + peso 800** contra 500 dos inativos. É a lei 2 aplicada à navegação: contraste de tinta e peso, sem introduzir cor de destaque.')
    w('')
    w(table(['Parte', 'Spec'], SIDEBAR_SPEC.map(s => [`\`${s.part}\``, s.spec])))
    w('')
    w('---')
    w('')

    /* --- Tabela --- */
    w('## Tabela')
    w('')
    w('A implementação é **CSS Grid, não `<Table>`**: as colunas precisam de proporções (`2.4fr 1fr 1fr 40px`) e a linha inteira precisa ser clicável. Grid resolve as duas coisas sem lutar contra o layout de tabela.')
    w('')
    w(table(['Parte', 'Spec'], TABLE_SPEC.map(s => [`\`${s.part}\``, s.spec])))
    w('')
    w('```jsx')
    w(`const COLS = '2.4fr 1fr 1fr 40px'   // fr para conteúdo, px fixo para ações

<Card p={0} withBorder radius="0" style={{ overflow: 'hidden' }}>
    <Box bg="gray.1" style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12,
        alignItems: 'center', padding: '12px 24px',
        borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
        <Text fz={10} fw={800} c="gray.5" tt="uppercase" lts="1.5px">Membro</Text>
        <Text fz={10} fw={800} c="gray.5" tt="uppercase" lts="1.5px">Status</Text>
        <Text fz={10} fw={800} c="gray.5" tt="uppercase" lts="1.5px">Criado</Text>
        <Box />
    </Box>

    {items.map((item, i) => (
        <Box key={item.id} onClick={() => onOpen(item)}
            style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12,
                alignItems: 'center', padding: '14px 24px', cursor: 'pointer',
                borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--mantine-color-gray-2)',
                transition: 'background 120ms ease' }}>
            {/* células em fz 13, c gray.7 — o papel "dado" */}
        </Box>
    ))}
</Card>`)
    w('```')
    w('')
    w('**Sem paginação e sem seleção múltipla** no padrão atual. Ao introduzir qualquer um dos dois, documente aqui antes.')
    w('')
    w('---')
    w('')

    /* --- Busca --- */
    w('## Busca')
    w('')
    w('Um padrão, dois alcances: **global** (⌘K, server-side, cruza entidades) e **local** (filtra a lista da tela). As duas usam a mesma caixa e o mesmo ícone; muda o alcance.')
    w('')
    w(table(['Aspecto', 'Valor'], Object.entries(SEARCH_SPEC).map(([k, v]) => [`\`${k}\``, String(v)])))
    w('')
    w('**Só um componente registra ⌘K por tela.** Dois listeners competem pelo foco.')
    w('')
    w('```jsx')
    w(`const [debounced] = useDebouncedValue(query, 250)

useEffect(() => {
    const term = debounced.trim()
    requestRef.current?.abort()               // cancela a busca anterior
    if (term.length < 2) return setResults([])

    const controller = new AbortController()
    requestRef.current = controller
    search(term, { signal: controller.signal })
        .then(r => !controller.signal.aborted && setResults(r.data))
        .catch(() => {})
    return () => controller.abort()
}, [debounced])`)
    w('```')
    w('')
    w('---')
    w('')

    /* --- Estados --- */
    w('## Estados')
    w('')
    w('**Skeleton domina spinner.** O skeleton reproduz a grade real do conteúdo, então o layout não salta quando o dado chega. Spinner só onde não há forma a antecipar.')
    w('')
    w(table(['Estado', 'Padrão', 'Spec'], STATES.map(s => [`**${s.state}**`, s.pattern, s.spec])))
    w('')
    w('---')
    w('')

    /* --- Formulários --- */
    w('## Formulários')
    w('')
    w('**Modal, nunca drawer.**')
    w('')
    w(table(['Regra', 'Detalhe'], FORM_SPEC.map(f => [`**${f.rule}**`, f.detail])))
    w('')
    w('---')
    w('')

    /* --- Destrutivo --- */
    w('## Ação destrutiva')
    w('')
    w('Confirmação por **permanência**, não por diálogo. Um "tem certeza?" é respondido no automático; segurar exige intenção contínua e é reversível até o último instante.')
    w('')
    w(table(['Aspecto', 'Valor'], Object.entries(DESTRUCTIVE).map(([k, v]) => [`\`${k}\``, String(v)])))
    w('')
    w('> **Exigência aberta:** o padrão atual responde só a mouse e toque. Sem equivalente por teclado, a exclusão fica inacessível — resolva isso antes de replicar o padrão.')
    w('')
    w('---')
    w('')

    /* --- Setup --- */
    w('## Setup')
    w('')
    w('```bash')
    w(SETUP.install)
    w('```')
    w('')
    w('```jsx')
    w(SETUP.entry)
    w('```')
    w('')
    w(`> ${SETUP.note}`)
    w('')
    w('**Peer dependencies:**')
    w('')
    w(table(['Pacote', 'Versão'], Object.entries(SETUP.peerDeps).map(([k, v]) => [`\`${k}\``, `\`${v}\``])))
    w('')
    w('---')
    w('')

    /* --- Contrato --- */
    w('## Contrato universal de props')
    w('')
    w('Toda seção do kit aceita este conjunto. O mesmo shape em todos os componentes é o que permite mover um CTA de seção sem reescrevê-lo.')
    w('')
    w(table(['Prop', 'Tipo', 'Papel'], UNIVERSAL_PROPS.map(p => [`\`${p.prop}\``, `\`${p.type}\``, p.role])))
    w('')
    w('---')
    w('')

    /* --- Primitivas --- */
    w('## Primitivas')
    w('')
    PRIMITIVES.forEach(p => {
        w(`### ${p.name}`)
        w('')
        w(p.job)
        w('')
        w(propsTable(p.props))
        w('')
        w('```jsx')
        w(p.example)
        w('```')
        w('')
    })
    w('---')
    w('')

    /* --- Componentes --- */
    w('## API dos componentes')
    w('')
    w('### Vocabulário por trabalho')
    w('')
    w(table(['Trabalho', 'Componentes'], SECTION_VOCABULARY.map(g => [g.job, g.components.map(c => `\`${c}\``).join(', ')])))
    w('')
    w('### Aliases legados')
    w('')
    w(table(['Alias', 'Componente'], ALIASES.map(([a, c]) => [`\`${a}\``, `\`${c}\``])))
    w('')
    COMPONENTS.forEach(c => {
        w(`### ${c.name}`)
        w('')
        w(`_${c.group}_ — ${c.job}`)
        w('')
        w(propsTable(c.props))
        w('')
        if (c.nested) {
            w(`**${c.nested.title}**`)
            w('')
            w(table(['Campo', 'Tipo', 'Nota'], c.nested.rows.map(([a, b, d]) => [`\`${a}\``, `\`${b}\``, d])))
            w('')
        }
        w('```jsx')
        w(c.example)
        w('```')
        w('')
    })
    w('---')
    w('')

    /* --- Receitas --- */
    w('## Receitas')
    w('')
    w('Código que compila. Copie e adapte o conteúdo — não a estrutura.')
    w('')
    RECIPES.forEach(r => {
        w(`### ${r.name}`)
        w('')
        w(r.when)
        w('')
        w('```jsx')
        w(r.code)
        w('```')
        w('')
    })
    w('---')
    w('')

    /* --- Ordem da landing --- */
    w('## Ordem canônica de uma landing')
    w('')
    w('```')
    w('Header → Hero → SocialProof → StatsGrid → FeatureSplit → Steps →')
    w('FeaturesGrid → Comparison → Pricing → Testimonials → FAQ → CTABanner → Footer')
    w('```')
    w('')
    w('Três regras de sequência:')
    w('')
    w('1. **Fundo alterna sempre** — dois palcos brancos seguidos apagam o ritmo.')
    w('2. **Prova antes de preço** — `StatsGrid` e `Testimonials` sustentam o número que `Pricing` vai pedir.')
    w('3. **`CTABanner` fecha** — a borda-topo de 4px é o único acento estrutural do sistema e marca esse ponto.')
    w('')
    w('---')
    w('')

    /* --- Pitfalls --- */
    w('## Erros frequentes')
    w('')
    w('Cada linha é um erro real que quebra o build ou o sistema:')
    w('')
    PITFALLS.forEach((p, i) => {
        w(`**${i + 1}.** ${p.why}`)
        w('')
        w('```diff')
        w(`- ${p.wrong}`)
        w(`+ ${p.right}`)
        w('```')
        w('')
    })
    w('---')
    w('')

    /* --- Validação --- */
    w('## Protocolo de validação')
    w('')
    w('Rode isto **antes de dizer que terminou**. Não é opcional.')
    w('')
    w('### 1. Build')
    w('')
    w('```bash')
    w('bun run build      # ou: npx vite build')
    w('```')
    w('')
    w('O build precisa passar sem erro. Warning de chunk grande é aceitável.')
    w('')
    w('### 2. Auditoria automática')
    w('')
    w('O repositório traz um script pronto que verifica as regras invariantes. Ele usa apenas grep POSIX, então roda igual em macOS e Linux:')
    w('')
    w('```bash')
    w('bash tools/audit-design-system.sh          # varre src/')
    w('bash tools/audit-design-system.sh app/     # ou um diretório específico')
    w('```')
    w('')
    w('Saída esperada — `OK` em todas as linhas e exit code 0:')
    w('')
    w('```')
    w('  OK     radius sempre 0')
    w('  OK     sem box-shadow em superfície')
    w('  OK     sem gradiente')
    w('  OK     sem hex literal (use tokens)')
    w('  OK     peso em {500,700,800,900}')
    w('  OK     letter-spacing na escala')
    w('  OK     gray.4 só em label uppercase')
    w('  OK     só a rampa gray (+ red.6)')
    w('  OK     imagem com alt')
    w('')
    w('Auditoria passou. Nenhuma violação encontrada.')
    w('```')
    w('')
    w('Se o projeto ainda não tem o script, crie-o com este conteúdo:')
    w('')
    w('```bash')
    w(AUDIT_SCRIPT)
    w('```')
    w('')

    w('### 3. Checklist manual')
    w('')
    CHECKLIST.forEach(g => {
        w(`**${g.group}**`)
        w('')
        g.items.forEach(i => w(`- [ ] ${i}`))
        w('')
    })
    w('### 4. Bloqueios')
    w('')
    w('Se qualquer um destes existir no seu código, **o trabalho está reprovado** — corrija antes de entregar:')
    w('')
    w(table(['Sintoma', 'Lei violada'], BLOCKERS.map(b => [b.symptom, `Lei ${b.law}`])))
    w('')
    w('### 5. Relatório')
    w('')
    w('Ao terminar, informe explicitamente:')
    w('')
    w('- O comando de build rodado e seu resultado')
    w('- O resultado da auditoria automática (todas OK, ou o que foi corrigido)')
    w('- Quais componentes do kit você usou e quais precisou criar')
    w('- Qualquer regra que você **não** conseguiu cumprir, e por quê')
    w('')
    w('Não relate sucesso sem ter rodado o build.')
    w('')
    w('---')
    w('')

    /* --- Instruções negativas --- */
    w('## Instruções negativas')
    w('')
    w('Modelos de linguagem tendem a adicionar exatamente o que este sistema remove. **Não adicione:**')
    w('')
    w('cor de destaque ou accent · gradiente · `border-radius` · `box-shadow` · glassmorphism ou blur · segunda família tipográfica · ícone decorativo sem função · animação além de `translateY(-1px)` + `brightness(1.1)` · badge colorido · card com elevação · dark mode (o sistema é light-only) · emoji em UI.')
    w('')
    w('**Se a tela parecer vazia demais, o problema é o texto, não o design.** Melhore a copy — não adicione moldura.')
    w('')
    w('---')
    w('')
    w(`_Fonte: ${META.source} · documentação conceitual em \`${META.docs}\` · esta especificação é gerada de \`tokens.js\` + \`api.js\`, então não pode divergir da página visual._`)
    w('')

    return s.join('\n')
}
