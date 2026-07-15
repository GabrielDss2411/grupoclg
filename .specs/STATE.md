# Project State

## Decisions Log

| ID | Decisão | Contexto | Data |
| --- | --- | --- | --- |
| AD-001 | Conteúdo dinâmico (cursos/congressos) migra dos mapas em código para **Supabase (Postgres)** | Painel admin precisa escrever em runtime; mapas em `lib/*-data.js` viram seed | 2026-07-13 |
| AD-002 | Autenticação do painel via **Supabase Auth, e-mail/senha**, usuário único criado manualmente | Cliente único; sem gestão de usuários no painel | 2026-07-13 |
| AD-003 | Operações do painel: **incluir + editar + flag `disponivel`** — sem exclusão pela UI | Evita perda acidental; exclusão só via banco pelo desenvolvedor | 2026-07-13 |
| AD-004 | Publicação **imediata ao salvar** (revalidação on-demand); a flag `disponivel` faz papel de rascunho | Fluxo mais simples para o cliente | 2026-07-13 |
| AD-005 | Painel vive no mesmo app Next.js, sob rota `/admin` | Um deploy só; reaproveita design system | 2026-07-13 |
| AD-006 | Todo campo vindo do banco é escapado (`escapeHtml`) antes de entrar em template HTML | Conteúdo passa a ser editável pelo cliente e entra via `dangerouslySetInnerHTML` | 2026-07-13 |
| AD-007 | **Site público não muda**: markup, design e comportamento permanecem idênticos; a migração troca só a fonte de dados (código → Supabase) | Exigência explícita do usuário; painel é aditivo | 2026-07-13 |

## Handoff

- Feature ativa: `painel-adm` — Execute em andamento, execução por fase com sub-agentes.
- Fases 1–4 (T1–T20) concluídas e verificadas de forma independente pelo orquestrador. Site público 100% no Supabase; painel `/admin` completo (login, listas, CRUD com flag, sem exclusão). Falta: Fase 5 (T21 smoke E2E + UAT interativa com o usuário; T22 envs no Vercel).
- Projeto Supabase: `grupoclg`, ref `usediuqikjqqqoydydar`, `sa-east-1`. Usuário admin do painel: `grupoclg@codesants.com.br`.
- Branch: `feature/painel-adm`. HEAD local: `30a3d30`. Nenhum push feito ainda desta feature (Execute inteiro é local).
- Lições registradas: (1) gate "Full" de tarefas que tocam builders consumidos por páginas inclui `npm run build`; (2) root layout não deve renderizar chrome público incondicionalmente — rotas `/admin` isoladas via Route Group `app/(site)/`; (3) neste ambiente, matar servidor de smoke test requer localizar o processo pela porta (PowerShell `Get-NetTCPConnection`+`Stop-Process`), `kill $!` do bash não mata o `node.exe` real.
- T21 (UAT) em andamento — servidor local no ar, roteiro entregue ao usuário para testar no browser (login real precisa de sessão/cookies, não simulável por curl).
- T22 (Vercel) **adiado por decisão do usuário**: não existe projeto "grupoclg" nas 10 contas/projetos Vercel encontrados na conta conectada ("victor's projects", team_FooLJlgWhVieM6QfW4Eu6k9L). Usuário optou por pular o deploy por agora — retomar quando a conta/domínio de destino estiverem definidos.
- ADM-09 (resiliência a banco fora do ar) verificado no nível de código/unit test (lib/db.test.mjs simula falha do client e confirma que o erro propaga, permitindo ao Next servir stale via ISR) — não pausei o projeto Supabase real de propósito para não gerar indisponibilidade real sem necessidade.
