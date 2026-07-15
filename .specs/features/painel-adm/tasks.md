# Painel Administrativo — Tasks

## Execution Protocol (MANDATORY -- do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.** Do not search for skill files by filesystem path. The skill is the source of truth for the full flow (per-task cycle, sub-agent delegation, adequacy review, Verifier, discrimination sensor).

**If the skill cannot be activated, STOP and tell the user — do not proceed without it.**

---

**Design**: `.specs/features/painel-adm/design.md`
**Status**: In Progress

## Regressão encontrada e corrigida (pós-crash da Fase 2)

O worker da Fase 2 caiu (erro de API) em T9, com T6/T7/T8 já commitados. Ao retomar, o orquestrador verificou (via `git stash` + build isolado no commit de T8) que **`npm run build` já falhava desde o commit de T8** (`e1d3660`): `cursoHtml` mudou de assinatura (recebia slug, passou a receber objeto) mas `app/cursos/[slug]/page.jsx` — que só é reescrito em T13/Fase 3 — ainda chama `cursoHtml(slug)`. O gate de T8 (Full = vitest+guardrails) não incluía `npm run build`, então a quebra não foi detectada antes do commit.

**Correção**: gate Full passa a incluir `npm run build` (tabela acima atualizada). Fix aplicado (commit `3361609`): `cursoHtml`/`congressoHtml` aceitam temporariamente slug (string, faz lookup no mapa) OU objeto (novo formato), como bridge documentado (`// TODO(Fase 3)`), removido quando T12/T13 reescreverem as páginas para chamar as funções só com objetos do banco. Verificado independentemente pelo orquestrador: build e testes voltaram a passar.

## Phase 4 Result (T15–T20 done — commits f6d40e0, 928f782, 237e96c, 5627e43, 11154f9, b8246d0; fix 30a3d30)

- Verificado independentemente pelo orquestrador: 57 testes, build verde (rotas `/admin/**` dinâmicas, público inalterado), guard rails ok.
- **Bug real encontrado e corrigido pelo orquestrador antes de aceitar a fase**: root layout renderizava Navbar/Footer públicos para toda rota, então `/admin/**` herdava a navbar flutuante e o footer institucional. Corrigido com Route Group `app/(site)/` isolando o site público (URLs/markup idênticos — AD-007 preservado) do painel. Commit `30a3d30`, verificado com smoke limpo (curl) e checagem visual do HTML.
- Lição operacional: neste ambiente (Git Bash/Windows), `kill $!` sobre um `npx next start &` não mata o processo real (mata o wrapper, não o `node.exe`). Smoke tests locais devem localizar e encerrar o processo pela porta (`Get-NetTCPConnection` + `Stop-Process`), não confiar no PID capturado pelo bash.
- Decisões documentadas pelo worker (aceitas): slug na edição omitido do payload de update (preserva o valor já persistido, sem consulta extra); campo obrigatório "local" do congresso mapeado para `local_chip`; listas (`bullets`/`programa`/`prog`) trafegam como JSON serializado no FormData.
- Segurança: nenhuma escrita sem sessão (verificado em teste e por smoke real nas 4 rotas `/admin/cursos`, `/admin/cursos/novo`, `/admin/congressos`, `/admin/congressos/novo` → 307 para login); sem service role key no projeto.

## Phase 3 Result (T12–T14 done — commits 20e9759, da19af7, 3e613b6)

- Verificado independentemente pelo orquestrador (author ≠ verificador): 36 testes, build verde (18 páginas, `[slug]` com `revalidate 1h`), guard rails verdes. Smoke com `next start` numa porta isolada: home lista os 6 cursos, agenda lista os 4 congressos, slug existente → 200, slug inexistente → 404 (curso e congresso), servidor encerrado sem deixar processo órfão.
- Desvios documentados pelo worker, aceitos: (1) `home`/`cursos` renomeados para `homeHtml(cursos)`/`cursosPageHtml(cursos)` (nomes do design.md); `congressosPage`/re-export `congressos` removidos por ficarem mortos (página chama `congressosPageHtml` direto); guard rails ajustado no mesmo commit para não regredir (lição da Fase 2 aplicada). (2) Ordem do carrossel "turmas abertas" passa a seguir `created_at` do banco em vez do array curado hardcoded (sem coluna de posição no schema, sem AC de ordem na spec) — todos os 6 cursos aparecem, só a ordem visual pode diferir sutilmente.
- Bridge temporário slug/objeto removido (T13) — `cursoHtml`/`congressoHtml` voltaram a receber só objeto.

## Phase 2 Result (T6–T11 done — commits 31cfec2, 9ded8bb, e1d3660, 3361609 [fix], d99fc5c, 01322cd, ec496f0)

- 36 testes (`npx vitest run`), build verde (18 páginas), guard rails verdes — todos verificados de forma independente pelo orquestrador (author ≠ verificador desta checagem intermediária).
- Nota de design (T10): rótulo/gradiente/título-curto do card do carrossel "turmas abertas" não têm coluna própria no schema (nunca foram campo do curso — eram hardcoded no HTML da home). Mantida tabela local `TURMA_VITRINE` em `lib/content.js` com fallback derivado de `cat`/`title` para cursos novos (criados pelo painel), preservando AD-007. Sem impacto na Fase 4: o painel não edita esses metadados de apresentação.
- Bridge temporário (slug OU objeto) em `cursoHtml`/`congressoHtml` marcado `// TODO(Fase 3)` — T12/T13 devem removê-lo ao rewire das páginas `[slug]`.

## Phase 1 Result (T1, T2, T3, T4, T5 done)

- Projeto Supabase: `grupoclg`, ref `usediuqikjqqqoydydar`, região `sa-east-1`, ACTIVE_HEALTHY.
- Migration `create_cursos_congressos` + corretiva `set_updated_at_security_invoker` aplicadas. RLS ok (4 policies/tabela, sem delete). Advisors: 4 WARNs `rls_policy_always_true` esperados (insert/update de authenticated).
- Seed: 6 cursos, 4 congressos, todos `disponivel=true`.
- `.env.local` criado (fora do git); `.env.example` commitado em `116612f`.
- T4: usuário admin criado manualmente pelo usuário no dashboard (`grupoclg@codesants.com.br`), confirmado.

---

## Test Coverage Matrix

> Generated from codebase, project guidelines, and spec — confirm before Execute. Guidelines found: `CLAUDE.md` (guard rails obrigatórios: `node scripts/check-guardrails.mjs` após edições em `lib/`, `app/`, `components/`); nenhum framework de teste existente — Vitest será introduzido (decisão do design); strong defaults aplicados.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| --- | --- | --- | --- | --- |
| Builders HTML (`lib/*-data.js`, `lib/content.js`) e `lib/escape.js` | unit | Todos os ramos; 1:1 com ACs de P1-D e edge cases (escape de HTML, categoria vazia, agenda vazia) | `tests/*.test.mjs` | `npx vitest run` |
| Server Actions (`app/admin/actions.js`) | unit (Supabase mockado) | 1:1 com ACs P1-A/4, P1-B/2–8, P1-C/2–6 (validação, slug+sufixo, upsert, auth, revalidate) | `tests/*.test.mjs` | `npx vitest run` |
| Data layer (`lib/db.js`) | unit (Supabase mockado) | Caminhos de consulta + falha do banco | `tests/*.test.mjs` | `npx vitest run` |
| Páginas/rotas (`app/**`) e UI do painel | none (sem framework e2e) | Gate de build + guard rails + smoke com `next start` + curl; UAT interativa no fechamento | — | build gate + smoke |
| Migration/SQL/config | none | Verificação via MCP (`list_tables`, `get_advisors`) | — | build gate |

## Parallelism Assessment

> Generated from codebase — confirm before Execute.

| Test Type | Parallel-Safe? | Isolation Model | Evidence |
| --- | --- | --- | --- |
| unit (Vitest) | Yes | Supabase totalmente mockado; sem estado compartilhado | Testes novos — modelo definido aqui |
| smoke (curl) | No | Porta única 3100 compartilhada | Padrão usado nesta sessão |

## Gate Check Commands

> Generated from codebase — confirm before Execute.

| Gate Level | When to Use | Command |
| --- | --- | --- |
| Quick | Tarefas com testes unit | `npx vitest run` |
| Full | Tarefas que mexem no site público | `npx vitest run && node scripts/check-guardrails.mjs && npm run build` |
| Build | Fechamento de fase / tarefas de config | `npm run build && node scripts/check-guardrails.mjs && npx vitest run` |

---

## Execution Plan

### Phase 1: Banco e ambiente (Sequential)

```
T1 → T2 → T3 → T4 → T5
```

### Phase 2: Builders e camada de dados (T6 primeiro; depois paralelo)

```
T5 ─→ T6 ─→ T7 ─┬→ T8 [P] ─┐
                ├→ T9 [P] ─┼→ T11
                └→ T10 [P] ┘
```

### Phase 3: Site lendo do banco (Sequential)

```
T11 → T12 → T13 → T14
```

### Phase 4: Painel (Sequential; T19/T20 order-free)

```
T14 → T15 → T16 → T17 → T18 ─┬→ T19 [P]
                             └→ T20 [P]
```

### Phase 5: Integração e verificação (Sequential)

```
T19, T20 → T21 → T22
```

---

## Task Breakdown

### T1: Criar projeto Supabase `grupoclg`

**What**: Projeto novo na org `skbuagugttpvmlxyklqn` (custo US$ 0/mês já confirmado), aguardar ACTIVE_HEALTHY, coletar URL e anon key.
**Where**: Supabase (MCP)
**Depends on**: None · **Requirement**: ADM-07 (fundação)
**Tools**: MCP `Supabase` (`create_project`, `get_project_url`, `get_publishable_keys`)
**Done when**: [ ] projeto ACTIVE_HEALTHY; [ ] URL + anon key anotadas para T5
**Tests**: none · **Gate**: build (n/a — verificação via MCP)

### T2: Migration de tabelas, RLS e trigger

**What**: Tabelas `cursos` e `congressos` (schema do design), RLS (anon lê só `disponivel=true`; authenticated lê tudo e escreve; sem policy de delete), trigger `updated_at`.
**Where**: Supabase (MCP `apply_migration`)
**Depends on**: T1 · **Requirement**: ADM-03/05/07
**Done when**: [ ] `list_tables` mostra ambas com RLS habilitado; [ ] `get_advisors` (security) sem erro sobre as tabelas novas
**Tests**: none · **Gate**: build (n/a)

### T3: Seed dos dados atuais

**What**: Inserir os 6 cursos e 4 congressos dos mapas `lib/*-data.js`, todos `disponivel=true`.
**Where**: Supabase (MCP `execute_sql`)
**Depends on**: T2 · **Requirement**: ADM-10
**Done when**: [ ] `select count(*)` = 6 e 4; [ ] consulta anon retorna os mesmos (todos disponíveis)
**Tests**: none · **Gate**: build (n/a)

### T4: Usuário admin do cliente

**What**: Criar o usuário e-mail/senha no Supabase Auth. Sem tool MCP para isso: passo manual do Victor no dashboard (Authentication → Add user), com e-mail do cliente.
**Where**: Dashboard Supabase (ação do usuário)
**Depends on**: T1 · **Requirement**: ADM-01
**Done when**: [ ] login de teste funciona (verificado em T16)
**Tests**: none · **Gate**: n/a

### T5: Variáveis de ambiente

**What**: `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`), `.env.example` versionado, `.gitignore` cobrindo `.env*.local` (já cobre).
**Where**: raiz
**Depends on**: T1 · **Requirement**: fundação
**Done when**: [ ] `.env.local` presente e fora do git; [ ] `.env.example` commitado
**Tests**: none · **Gate**: build

### T6: Vitest + dependências Supabase

**What**: Instalar `@supabase/supabase-js`, `@supabase/ssr`, `vitest` (dev); `vitest.config.mjs`; script `"test": "vitest run"`; teste de fumaça do runner.
**Where**: `package.json`, `vitest.config.mjs`, `tests/setup.test.mjs`
**Depends on**: T5 · **Requirement**: fundação de teste
**Done when**: [ ] `npx vitest run` verde; [ ] build inalterado
**Tests**: unit (fumaça) · **Gate**: build

### T7: `escapeHtml`

**What**: `lib/escape.js` com `escapeHtml()` (AD-006) + testes (`<script>`, `&`, aspas, acentos preservados).
**Where**: `lib/escape.js`, `tests/escape.test.mjs`
**Depends on**: T6 · **Requirement**: ADM-04 (edge case HTML)
**Done when**: [ ] testes 1:1 com o edge case da spec passam
**Tests**: unit · **Gate**: quick

### T8: Builders de curso parametrizados [P]

**What**: `cursoHtml(curso)` recebe objeto (banco) e escapa toda interpolação; mapa `CURSOS` permanece só como seed.
**Where**: `lib/cursos-data.js`, `tests/cursos-builders.test.mjs`
**Depends on**: T7 · **Requirement**: ADM-07, AD-006/007
**Done when**: [ ] com dados do seed, saída equivalente à atual (site inalterado, AD-007); [ ] título com `<script>` sai escapado; [ ] guard rails verdes
**Tests**: unit · **Gate**: full

### T9: Builders de congresso parametrizados [P]

**What**: `congressoHtml(c)`, `congressosPageHtml(lista)` e card da agenda recebendo dados; agenda vazia → estado "Novos eventos em breve"; escape em tudo.
**Where**: `lib/congressos-data.js`, `tests/congressos-builders.test.mjs`
**Depends on**: T7 · **Requirement**: ADM-07, edge cases
**Done when**: [ ] saída equivalente com seed; [ ] lista vazia renderiza estado amigável; [ ] guard rails verdes
**Tests**: unit · **Gate**: full

### T10: Home e catálogo data-driven [P]

**What**: Extrair carrossel de turmas e fileiras do catálogo de `lib/content.js` para `turmasHtml(cursos)`/`catalogoHtml(cursos)`; `homeHtml(cursos)`/`cursosPageHtml(cursos)`; categoria sem cursos disponíveis → fileira omitida; ícone padrão para categoria nova.
**Where**: `lib/content.js`, `tests/content-builders.test.mjs`
**Depends on**: T7 · **Requirement**: ADM-07, edge cases, AD-007
**Done when**: [ ] com seed, saída equivalente à atual; [ ] categoria vazia omitida; [ ] guard rails verdes
**Tests**: unit · **Gate**: full

### T11: Data layer `lib/db.js`

**What**: `getCursos/getCurso/getCongressos/getCongresso` com `unstable_cache` (tags `cursos`/`congressos`, revalidate 3600) sobre client anon (`lib/supabase/server.js`); ordenação estável (`created_at`).
**Where**: `lib/db.js`, `lib/supabase/server.js`, `tests/db.test.mjs`
**Depends on**: T8, T9, T10 · **Requirement**: ADM-07/08/09
**Done when**: [ ] consultas testadas com mock (incl. falha do banco propagando para ISR stale)
**Tests**: unit · **Gate**: quick

### T12: Páginas de lista lendo do banco

**What**: `app/page.jsx`, `app/cursos/page.jsx`, `app/congressos/page.jsx` viram async e usam `db` + builders novos.
**Where**: `app/**`
**Depends on**: T11 · **Requirement**: ADM-07
**Done when**: [ ] build gera as páginas com dados do banco; [ ] smoke: conteúdo igual ao atual; [ ] guard rails verdes
**Tests**: none (camada de rota) · **Gate**: build

### T13: Páginas de detalhe lendo do banco

**What**: `[slug]` de cursos e congressos com `dynamicParams = true`, `notFound()` para ausente/indisponível; `generateStaticParams` a partir do banco.
**Where**: `app/cursos/[slug]/page.jsx`, `app/congressos/[slug]/page.jsx`
**Depends on**: T12 · **Requirement**: ADM-07 (404 de indisponível)
**Done when**: [ ] slug do seed renderiza; [ ] slug inexistente → 404 (smoke); [ ] guard rails verdes
**Tests**: none (camada de rota) · **Gate**: build

### T14: Guard rails e CLAUDE.md da nova arquitetura

**What**: `check-guardrails.mjs` passa a escanear `app/admin/**` e novos arquivos; estrutura obrigatória atualizada (exports/builders novos); CLAUDE.md descreve banco/painel.
**Where**: `scripts/check-guardrails.mjs`, `CLAUDE.md`
**Depends on**: T12, T13 · **Requirement**: success criteria (guard rails verdes)
**Done when**: [ ] check verde; [ ] violação injetada em arquivo do admin é detectada
**Tests**: none · **Gate**: full

### T15: Clients Supabase SSR e middleware

**What**: `lib/supabase/{client,middleware}.js` (padrão `@supabase/ssr`); `middleware.js` com matcher `/admin/:path*` para refresh de sessão.
**Where**: `lib/supabase/`, `middleware.js`
**Depends on**: T14 · **Requirement**: ADM-01/02
**Done when**: [ ] build ok; [ ] rota `/admin` passa pelo middleware (smoke: redirect anônimo)
**Tests**: none (infra) · **Gate**: build

### T16: Login, guarda de sessão e sair

**What**: `app/admin/login/page.jsx` (form e-mail/senha, erro único), `app/admin/layout.jsx` (sem sessão → redirect login; navegação + botão sair).
**Where**: `app/admin/`
**Depends on**: T15, T4 · **Requirement**: ADM-01
**Done when**: [ ] anônimo em `/admin` vê login (AC1); [ ] credencial inválida → mensagem única (AC3); [ ] login real entra; [ ] sair volta ao login (AC5)
**Tests**: none (UI; lógica de auth nas actions em T17) · **Gate**: build

### T17: Server actions com validação e revalidação

**What**: `app/admin/actions.js`: `salvarCurso`, `salvarCongresso`, `alternarDisponivel` — exige sessão (erro sem ela), valida obrigatórios/limites/ISO, slug com sufixo em colisão, upsert por id, `revalidateTag`/`revalidatePath`.
**Where**: `app/admin/actions.js`, `tests/actions.test.mjs`
**Depends on**: T16 · **Requirement**: ADM-02/03/04/05/08
**Done when**: [ ] testes 1:1 com P1-A/4, P1-B/2–8, P1-C/2–6 (mock Supabase); [ ] revalidateTag chamado nas escritas
**Tests**: unit · **Gate**: quick

### T18: Listas do painel com flag

**What**: `app/admin/page.jsx` (visão geral) + listas de cursos e congressos (client autenticado vê tudo): badge "fora do site", toggle imediato da flag via action.
**Where**: `app/admin/cursos/page.jsx`, `app/admin/congressos/page.jsx`, componentes do painel
**Depends on**: T17 · **Requirement**: ADM-03/05, ADM-11
**Done when**: [ ] listas exibem todos os itens com estado; [ ] toggle persiste e revalida (smoke)
**Tests**: none (UI sobre actions já testadas) · **Gate**: build

### T19: Formulário de curso [P]

**What**: Form controlado (novo/editar) com todos os campos + editor de listas (bullets, programa) com adicionar/remover/reordenar; botão travado no envio; erro preserva dados; confirmação "Salvo · já no site"; pôster: seleção dos existentes ou URL.
**Where**: `app/admin/cursos/[id]/page.jsx`, componentes de form
**Depends on**: T18 · **Requirement**: ADM-03/04, ADM-11
**Done when**: [ ] criar/editar curso pelo navegador funciona ponta a ponta (smoke guiado)
**Tests**: none (UI sobre actions testadas) · **Gate**: build

### T20: Formulário de congresso [P]

**What**: Idem T19 para congressos, incluindo editor de programação por dia (dia, título, itens) e stats.
**Where**: `app/admin/congressos/[id]/page.jsx`
**Depends on**: T18 · **Requirement**: ADM-05/06, ADM-11
**Done when**: [ ] criar/editar congresso com 2+ dias funciona ponta a ponta (smoke guiado)
**Tests**: none (UI sobre actions testadas) · **Gate**: build

### T21: Smoke E2E + UAT interativa

**What**: Build de produção + `next start`: fluxo completo — login, editar curso, ver no site ≤60s, flag off → some das listas e detalhe 404, banco pausado → site continua (stale). UAT guiada com o usuário (validate.md).
**Where**: ambiente local
**Depends on**: T19, T20 · **Requirement**: ADM-08/09 + success criteria
**Done when**: [ ] roteiro executado e aprovado pelo usuário
**Tests**: smoke · **Gate**: build

### T22: Deploy: envs no Vercel

**What**: Configurar `NEXT_PUBLIC_SUPABASE_URL`/`ANON_KEY` no projeto Vercel (preview + production) e validar um deploy de preview da branch.
**Where**: Vercel
**Depends on**: T21 · **Requirement**: entrega
**Done when**: [ ] preview funcional com painel e site lendo o banco
**Tests**: none · **Gate**: n/a (verificação no preview)

---

## Task Granularity Check

| Task | Scope | Status |
| --- | --- | --- |
| T1–T5 | 1 ação de infra cada | ✅ |
| T6 | config de teste + deps (coeso) | ✅ |
| T7 | 1 função + testes | ✅ |
| T8/T9/T10 | 1 módulo de builders cada | ✅ |
| T11 | 1 camada (db) | ✅ |
| T12/T13 | rotas de lista / rotas de detalhe | ✅ |
| T14–T18 | 1 preocupação cada | ✅ |
| T19/T20 | 1 formulário cada | ✅ |
| T21/T22 | verificação / deploy | ✅ |

## Diagram-Definition Cross-Check

| Task | Depends On (body) | Diagram | Status |
| --- | --- | --- | --- |
| T1 | — | início Phase 1 | ✅ |
| T2 | T1 | T1→T2 | ✅ |
| T3 | T2 | T2→T3 | ✅ |
| T4 | T1 | T3→T4 na cadeia sequencial (T4 só precisa de T1; mantido sequencial por simplicidade) | ✅ |
| T5 | T1 | T4→T5 (idem) | ✅ |
| T6 | T5 | T5→T6 | ✅ |
| T7 | T6 | T6→T7 | ✅ |
| T8/T9/T10 [P] | T7 | ramificação após T7; sem dependência entre si | ✅ |
| T11 | T8,T9,T10 | junção → T11 | ✅ |
| T12 | T11 | T11→T12 | ✅ |
| T13 | T12 | T12→T13 | ✅ |
| T14 | T12,T13 | T13→T14 (T12 já anterior) | ✅ |
| T15 | T14 | T14→T15 | ✅ |
| T16 | T15,T4 | T15→T16 (T4 da Phase 1) | ✅ |
| T17 | T16 | T16→T17 | ✅ |
| T18 | T17 | T17→T18 | ✅ |
| T19/T20 [P] | T18 | ramificação após T18; sem dependência entre si | ✅ |
| T21 | T19,T20 | junção → T21 | ✅ |
| T22 | T21 | T21→T22 | ✅ |

## Test Co-location Validation

| Task | Code Layer | Matrix Requires | Task Says | Status |
| --- | --- | --- | --- | --- |
| T1–T5 | infra/SQL/config | none | none | ✅ |
| T6 | config de teste | none (fumaça do runner) | unit fumaça | ✅ |
| T7 | lib (escape) | unit | unit | ✅ |
| T8/T9/T10 | builders | unit | unit | ✅ |
| T11 | data layer | unit | unit | ✅ |
| T12/T13 | rotas | none (build+smoke) | none | ✅ |
| T14 | tooling | none | none | ✅ |
| T15/T16 | infra auth / UI | none (build+smoke) | none | ✅ |
| T17 | server actions | unit | unit | ✅ |
| T18/T19/T20 | UI do painel | none (build+smoke; lógica testada em T17) — camada de rota/UI, matriz diz none | none | ✅ |
| T21/T22 | verificação/deploy | smoke | smoke/none | ✅ |
