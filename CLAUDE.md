# Grupo CLG — Site institucional

Site estático de página única (`index.html`, ~1.700 linhas) + `assets/`. Sem build, sem framework, sem package.json. Deploy na Vercel como estático (`vercel.json`).

## Guard rails — verificação obrigatória

Após qualquer edição no `index.html`, rode:

```
node scripts/check-guardrails.mjs
```

O script falha se: aparecer cor fora da paleta congelada, fonte fora do stack aprovado, travessão (—/–) no copy, seletor responsivo `[style*="..."]` órfão, asset referenciado que não existe, ou se a estrutura de telas/scripts for quebrada. Um hook em `.claude/settings.json` roda esse check automaticamente após edições no `index.html`.

## Arquitetura (não mudar sem decisão explícita)

- **SPA de arquivo único.** As 7 "páginas" são telas alternadas por estado, não arquivos: `home`, `cursos`, `curso` (detalhe), `congressos`, `congresso` (LP), `sobre`, `incompany`.
- **Runtime próprio** (exportado de ferramenta de design): classe `Component extends DCLogic` no `<script type="text/x-dc">`; bindings `{{ ... }}`; condicionais `<sc-if value="{{ isCursos }}">`; navegação via `goHome/goCursos/goCurso/goCongressos/goCongresso/goSobre/goInCompany` → `this.nav(tela)`. Não renomear essas chaves — a navbar, o footer e os CTAs dependem delas.
- **Telas de detalhe (curso e congresso/LP)**: uma tela única por tipo, preenchida por script vanilla a partir de um mapa de dados (`CURSOS` no script "DETALHE DO CURSO", `CONGRESSOS` no script "LP DO CONGRESSO", ambos no fim do arquivo). O clique num card com `data-curso="slug"`/`data-congresso="slug"` grava `window.__cursoAtual`/`window.__congressoAtual` (listener em fase de captura) e navega via `{{ goCurso }}`/`{{ goCongresso }}`; um MutationObserver preenche os campos `data-cd-*`/`data-lp-*` quando a tela renderiza. Para adicionar curso/congresso: entrada no mapa + card com o slug. O HTML da tela traz o primeiro item como conteúdo default.
- **Menu com categorias (dropdown)**: Home · **Capacitação** (Cursos, Congressos) · **Treinamentos** (In Company) · Sobre. Implementado com as classes `.nav-drop`/`.nav-drop-panel`/`.nav-drop-caret` no segundo bloco `<style>` (hover + `:focus-within`). O clique no título da categoria leva à primeira tela dela; o destaque ativo usa `isCapacitacao`/`isTreinamentos` no `renderVals`. Nova tela em categoria = novo botão no painel + flag `is*`/`go*` no runtime + entrada no footer.
- **Dois blocos `<style>`**: o primeiro é @font-face (fontes locais em `assets/*.woff2`); o segundo é o design system + responsivo. Todo o resto do estilo é **inline** (`style="..."`).
- **GSAP** (`assets/gsap.min.js`) anima o hero/seções. `html.gsap-ready` esconde o hero até a animação assumir; há failsafe que remove a classe se GSAP faltar ou se `prefers-reduced-motion`. Não remover o failsafe.

## ⚠️ Acoplamento frágil: responsivo via `[style*="..."]`

O bloco responsivo funciona casando **substrings literais dos estilos inline**, ex.:

```css
@media (max-width: 720px){ [style*="padding:64px 58px"]{padding:34px 24px !important} }
```

Consequência: **alterar um valor inline pode quebrar silenciosamente o mobile.** Regras:

1. Antes de mudar qualquer valor inline de `max-width`, `padding`, `font-size`, `min-height`, `grid-template-columns` ou `flex`, procure o valor antigo no segundo bloco `<style>`. Se houver seletor casando, atualize o seletor junto (ou mantenha o valor).
2. Ao criar seção nova, reutilize valores já cobertos pelo responsivo (ex.: container `max-width:1200px`, padding de seção `104px 30px`) em vez de inventar valores novos.
3. O check de guard rails acusa seletores `[style*=...]` que não casam com nada ("órfãos").

## Design system

### Cores (paleta congelada — não introduzir hex novo sem atualizar o allowlist do script)

| Token | Hex | Uso |
|---|---|---|
| Navy (primária) | `#0C1A57` | fundos escuros, botões navy, texto de destaque |
| Navy hover/escuro | `#081142`, `#0A1442`, `#070E33` | hover de botão navy, fundos profundos |
| Dourado (marca) | `#C9A227` | detalhes, foco (`:focus-visible`), ícones |
| Amarelo CTA | `#E9C65A` (hover `#F0D171`) | botão primário; texto do botão em `#0A1442` |
| Texto corpo | `#3A4260` (base), `#5A6180` (secundário), `#42496A` | parágrafos |
| Cinzas claros | `#F5F5F7`, `#E5E5EA` | fundos de seção alternados, bordas |
| Links no navy | `#B8C0DA` (hover branco) | footer/navbar |
| Verde (prova social) | `#5BD6A0`, `#7FE0B0` | indicadores positivos |

### Tipografia

- Stack único: `-apple-system, system-ui, BlinkMacSystemFont,'Inter','Segoe UI',Roboto, sans-serif`. Headings `font-weight:600` com `letter-spacing:-0.022em` (estilo Apple).
- Fontes da exportação original (Newsreader/Hanken Grotesk/Schibsted Grotesk) são **neutralizadas por CSS** — podem existir em inline antigo, mas **não usar em código novo** e não adicionar família nova.
- Mobile: h1 33px / h2 27px / h3 18.5px (já tratado no bloco responsivo).

### Componentes

- **Botões**: sempre pill (`border-radius:999px`). Primário = amarelo `#E9C65A` → hover `#F0D171`, texto `#0A1442`, `font-weight:700`. Secundário = navy `#0C1A57` → hover `#081142`, texto branco. Press-state global `scale(0.96)`.
- **CTA único**: o CTA principal do site é **"Ver turmas abertas"** (→ `goCursos`). Não criar CTAs primários concorrentes; secundário permitido: "Ver treinamentos In Company".
- **Cantos**: o CSS força radius 16–30px para **5px** (cantos crispos) em elementos com estilo inline. Em código novo, usar diretamente: `5px` (cards/imagens), `8–14px` (elementos menores), `999px` (pills), `50%` (avatares).
- **FAQ**: `<details>/<summary>` com `+`/`−` em dourado — reutilizar o padrão existente.
- **Sliders/carrosséis**: scroll horizontal com `.hide-scroll`, cards `flex:0 0 300px` e `scroll-snap-align:start` (vira `78vw` no mobile via responsivo).
- **Cards de congresso** (tela Congressos): linha em grid `190px 1fr auto` (data grande + badge de edição | local/título/descrição | CTA "Saiba mais" navy → WhatsApp `wa.me/5521980936347` com mensagem pré-preenchida). Abaixo de 880px o grid vira 1 coluna automaticamente.

### Copy e acessibilidade

- **Sem travessões** (— ou –) no texto; usar vírgula, dois-pontos ou ponto (decisão de copy já aplicada, ver commit e23dd32).
- Português do Brasil, tom direto; termos-chave: Lei 14.133/21, TCU, In Company, Bruno Verzani.
- Toda `<img>` com `alt` descritivo. Respeitar `prefers-reduced-motion` em qualquer animação nova. Foco visível dourado já é global — não remover outlines.

## Assets

- Imagens/posters em `assets/` (SVG para ilustrações/posters, jpg/png para fotos). Referenciar sempre como `assets/nome.ext` (cache imutável de 1 ano via `vercel.json` — trocar conteúdo exige trocar o nome do arquivo).
- Fontes `.woff2` e os dois `.js` de hash são da exportação original: não renomear nem remover.
