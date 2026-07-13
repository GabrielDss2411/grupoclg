# Grupo CLG — Site institucional

Site em **Next.js (App Router, SSG)**, migrado do estático original preservando o markup e o design system. Deploy na Vercel.

## Guard rails — verificação obrigatória

Após qualquer edição em `lib/`, `app/` ou `components/`, rode:

```
node scripts/check-guardrails.mjs
```

O script falha se: aparecer cor fora da paleta congelada, fonte fora do stack aprovado, travessão (—/–) na copy, seletor responsivo `[style*="..."]` órfão, asset referenciado que não existe em `public/`, ou se a estrutura (exports do content, rotas, CTA, reduced-motion) for quebrada. Um hook em `.claude/settings.json` roda esse check automaticamente após edições nesses diretórios.

## Arquitetura (não mudar sem decisão explícita)

- **Conteúdo em strings HTML**: `lib/content.js` exporta o markup de cada tela (`home`, `cursos`, `congressos`, `sobre`, `incompany`, `navbar`, `footer`) como template strings. Os componentes React (`components/Screen.jsx`, `Navbar.jsx`, `Footer.jsx`) renderizam via `dangerouslySetInnerHTML`.
- **Rotas reais** (App Router): `/`, `/cursos`, `/congressos`, `/in-company`, `/sobre` + detalhes SSG em `/cursos/[slug]` e `/congressos/[slug]` (`generateStaticParams`). Novas páginas = nova rota + novo export/entrada de dados + entrada em `ROUTES`.
- **Páginas de detalhe orientadas a dados**: `lib/cursos-data.js` (mapa `CURSOS` + `cursoHtml(slug)`) e `lib/congressos-data.js` (mapa `CONGRESSOS` + `congressoHtml(slug)` + `congressosPage`). O HTML é gerado no build; para adicionar/editar curso ou congresso, mexa só no mapa. Countdown das LPs via `[data-countdown]`, recalculado no cliente em `Screen.jsx`.
- **Interação por delegação de eventos**: `components/handlers.js` (`useSiteHandlers`) trata cliques em `[data-href]` (caminho literal, ex. cards de detalhe), `[data-nav]` (rota nomeada, mapa `ROUTES`) e `[data-slide]` (carrosséis). Não usar handlers inline no markup.
- **Menu com categorias (dropdown)**: Home · **Capacitação** (Cursos, Congressos) · **Treinamentos** (In Company) · Sobre. Classes `.nav-drop`/`.nav-drop-panel`/`.nav-drop-caret` em `app/base.css` (hover + `:focus-within`); o destaque ativo usa `data-navkey` + prefixo de rota em `components/Navbar.jsx`.
- **CSS global**: `app/base.css` (design system + responsivo + hovers: `data-hv="hvN"` legados e semânticos `gold`/`navy`/`outline`/`card`/`goldlink`) e `app/globals.css` (`.nav-active`). Fontes via `next/font` (`var(--font-inter)`) em `app/layout.jsx`.
- **Animações GSAP**: `lib/animations.js` (reveals por IntersectionObserver, hero, trilha). Respeita `prefers-reduced-motion` — não remover o failsafe.
- **Assets em `public/assets/`**, referenciados como `/assets/nome.ext`.

## ⚠️ Acoplamento frágil: responsivo via `[style*="..."]`

O `app/base.css` faz o responsivo casando **substrings literais dos estilos inline** que estão nas strings de `lib/content.js`, ex.:

```css
@media (max-width: 720px){ [style*="padding:64px 58px"]{padding:34px 24px !important} }
```

Consequência: **alterar um valor inline no content.js pode quebrar silenciosamente o mobile.** Regras:

1. Antes de mudar qualquer valor inline de `max-width`, `padding`, `font-size`, `min-height`, `grid-template-columns` ou `flex`, procure o valor antigo em `app/base.css`. Se houver seletor casando, atualize o seletor junto (ou mantenha o valor).
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

- Stack único: Inter via `next/font` (`var(--font-inter)`) com fallback ao stack Apple (`-apple-system, system-ui, ...`). Headings `font-weight:600` com `letter-spacing:-0.022em`.
- Fontes da exportação original (Newsreader/Hanken Grotesk/Schibsted Grotesk) podem existir em markup antigo, mas **não usar em código novo** e não adicionar família nova.

### Componentes

- **Botões**: sempre pill (`border-radius:999px`). Primário = amarelo `#E9C65A` → hover `#F0D171`, texto `#0A1442`, `font-weight:700`. Secundário = navy `#0C1A57` → hover `#081142`, texto branco.
- **CTA único**: o CTA principal do site é **"Ver turmas abertas"** (`data-nav="cursos"`). Não criar CTAs primários concorrentes; secundário permitido: "Ver treinamentos In Company".
- **Cantos**: o CSS força radius 16–30px para **5px** (cantos crispos). Em código novo, usar diretamente: `5px` (cards/imagens), `8–14px` (elementos menores), `999px` (pills), `50%` (avatares).
- **FAQ**: `<details>/<summary>` com `+`/`−` em dourado — reutilizar o padrão existente.
- **Sliders/carrosséis**: scroll horizontal com `.hide-scroll`, cards `flex:0 0 300px` e `scroll-snap-align:start`; setas via `[data-slide]` dentro de `[data-row]`.

### Copy e acessibilidade

- **Sem travessões** (— ou –) no texto; usar vírgula, dois-pontos ou ponto (decisão de copy, commit e23dd32).
- Português do Brasil, tom direto; termos-chave: Lei 14.133/21, TCU, In Company, Bruno Verzani.
- Toda `<img>` com `alt` descritivo. Respeitar `prefers-reduced-motion` em qualquer animação nova. Não remover outlines de foco.
- Contato/CTAs de conversão: WhatsApp `wa.me/5521980936347` com mensagem pré-preenchida.

## Conteúdo ilustrativo pendente de dados reais

Os programas dos cursos (`lib/cursos-data.js`) e, nos congressos (`lib/congressos-data.js`), a programação por dia, os números do evento (painéis/participantes) e os locais ("Centro de Convenções") são **conteúdo ilustrativo**, criados como placeholder. Substituir pelos dados reais quando fornecidos.
