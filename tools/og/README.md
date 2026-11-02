# Open Graph do ciromaciel.click

Gera `public/opengraph.webp` (1200×630) — a imagem que aparece quando alguém
compartilha o site no WhatsApp, LinkedIn, Slack, X ou Facebook.

```bash
node tools/og/generate.mjs
```

Requer **Google Chrome** (renderiza o template) e **cwebp** (`brew install webp`).

## De onde isto veio

É irmão do gerador dos produtos em `website/tools/og`, e herda dele as decisões
que não se mexem sem mexer lá também: a cor quente da marca, o filete no topo,
a Montserrat embutida em base64 e a guarda de overflow.

Três coisas mudam, porque o objeto é outro — este card é de uma **pessoa**,
não de um produto:

| | Produto | Aqui |
|---|---|---|
| Lockup | raio da marca + nome | só o nome |
| Assinatura | `from <marca>` | nenhuma — ele não é produto de ninguém |
| Título | 92px | 60px (17 caracteres contra os 7 de "Storage") |
| Avatar | PNG com fundo de estúdio + máscara de degradê | WebP com transparência real, sem máscara |

## Arquivos

| Arquivo | Para quê |
|---|---|
| `template.html` | Layout e tokens visuais. É aqui que se mexe no design. |
| `generate.mjs` | A copy, o destino e a checagem de overflow. |
| `avatar.webp` | O retrato, com fundo transparente, em 600 px. |
| `montserrat.woff2` | Montserrat variável (100–900), embutida na imagem. |

A fonte é embutida em base64 no HTML: o Chrome headless não espera download de
fonte externa antes do screenshot, e sem isso a imagem sai com fallback.

## Alterar a frase

Editar `CARDS.ciro.tagline` em `generate.mjs`. Cada `<span>` é uma linha e
**não quebra**; o `<b>` marca o que a frase afirma.

A tagline é o posicionamento, palavra por palavra — ela é a única coisa que
precisa sobreviver à miniatura do feed, onde o card tem uns 270px de largura.
Quando ela mudar em `brand/arquitetura.md`, muda aqui.

### Linha longa demais

O avatar ocupa a direita do quadro e as linhas não quebram, então uma linha
longa passaria por baixo dele. O gerador mede cada linha no próprio Chrome e
aborta antes de escrever:

```
ciro      ERRO  linha 2 da tagline tem 842px (máx 814px) — passaria por baixo do avatar
```

Não aumentar o `SAFE_WIDTH`: ou se reequilibra a quebra entre as linhas, ou se
reduz a fonte com `tagFz`. Encurtar a frase não é opção — ela é o
posicionamento.

## Cor

A marca **não** usa o `gray.9` do `components-kit` (`#11181C`, frio e
azulado). Todos os assets da casa são **`#34322D`**, um preto quente, e o
template segue isso.

## Depois de gerar

A imagem só chega ao ar no próximo deploy. Como as redes cacheiam Open Graph
por dias, vale forçar o refresh depois:

- <https://developers.facebook.com/tools/debug/>
- <https://www.linkedin.com/post-inspector/>
