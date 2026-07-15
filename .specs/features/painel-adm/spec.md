# Painel Administrativo — Specification

## Problem Statement

Hoje cursos e congressos vivem em mapas de dados no código (`lib/cursos-data.js`, `lib/congressos-data.js`): qualquer alteração de conteúdo exige desenvolvedor e deploy. O cliente precisa incluir cursos/eventos e controlar o que aparece no site sozinho, sem depender de ninguém.

## Goals

- [ ] Cliente inclui e edita cursos e congressos por um painel web, sem deploy.
- [ ] Flag `disponivel` controla a presença de cada item no site público.
- [ ] Alteração salva aparece no site em ≤ 60 segundos.
- [ ] Site público continua no ar (última versão em cache) mesmo com o banco fora.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Exclusão de itens pela UI | AD-003: evitar perda acidental; via banco pelo dev |
| Upload de imagens/pôsteres | v1 usa os pôsteres existentes em `/assets` (seleção) + campo de URL; upload é feature própria |
| Gestão de usuários / papéis | AD-002: usuário único criado manualmente |
| Edição das páginas institucionais (home, sobre, in company) | Painel cobre só o conteúdo dinâmico: cursos e congressos |
| Workflow de rascunho/publicação | AD-004: flag `disponivel` já cumpre o papel |
| Histórico/versões de conteúdo | Complexidade sem demanda declarada |

---

## Assumptions & Open Questions

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --- | --- | --- | --- |
| Localização do painel | Rota `/admin` no mesmo app Next.js | Um deploy, reaproveita design system (AD-005) | y (AD) |
| Campos editáveis | Exatamente os campos dos mapas atuais (curso: título, categoria, tag, nível, módulos, horas, descrição, bullets, pôster, inscrições, início, vagas, programa; congresso: nome, edição, tagline, datas, data ISO, textos do card, status, local, formato, sobre, números, local/descrição, programação por dia) | O site já renderiza esses campos; nada a inventar | n |
| Pôster do curso | Seleção entre os SVGs existentes de `/assets` ou URL externa | Sem upload na v1 | n |
| Slug | Gerado automaticamente a partir do título na criação, único, imutável após criado | URLs estáveis, sem 404 em links compartilhados | n |
| Concorrência de edição | Last-write-wins | Usuário único (AD-002); conflito real improvável | n |
| Datas de curso (inscrições/início) | Texto livre curto (ex. "25/07"), como o site exibe hoje | Evita re-trabalho de formatação; validação apenas de presença | n |
| Leitura do site | Server-side com chave anon + RLS de leitura pública apenas de itens `disponivel=true`; escrita exige sessão autenticada | Menor superfície de acesso | n |

**Open questions:** none — all resolved or logged above.

---

## User Stories

### P1-A: Login do painel ⭐ MVP

**User Story**: Como cliente, quero entrar no painel com e-mail e senha para que só eu possa alterar o conteúdo do site.

**Acceptance Criteria**:

1. WHEN acesso `/admin` sem sessão THEN o sistema SHALL exibir a tela de login e nenhum dado administrativo.
2. WHEN informo credenciais válidas THEN o sistema SHALL criar sessão e me levar à lista de conteúdo.
3. WHEN informo credenciais inválidas THEN o sistema SHALL exibir "E-mail ou senha incorretos" sem indicar qual campo errou.
4. WHEN tento executar qualquer ação de escrita sem sessão válida (inclusive chamada direta à API/server action) THEN o sistema SHALL recusar com erro de autenticação e não alterar dados.
5. WHEN clico em "Sair" THEN o sistema SHALL encerrar a sessão e voltar ao login.

**Independent Test**: Abrir `/admin` anônimo (vê login), logar, ver lista, chamar a action de salvar sem cookie de sessão (recusa), sair.

---

### P1-B: Gerenciar cursos ⭐ MVP

**User Story**: Como cliente, quero listar, incluir e editar cursos, e marcar cada um como disponível ou não, para controlar o catálogo do site.

**Acceptance Criteria**:

1. WHEN abro a lista de cursos THEN o sistema SHALL exibir todos os cursos (disponíveis e indisponíveis) com título, categoria e estado da flag.
2. WHEN preencho o formulário de novo curso com os campos obrigatórios (título, categoria, descrição, pôster) e salvo THEN o sistema SHALL persistir o curso com slug único gerado do título.
3. WHEN salvo um curso sem campo obrigatório THEN o sistema SHALL indicar o(s) campo(s) faltante(s) e não persistir.
4. WHEN edito um curso existente e salvo THEN o sistema SHALL persistir as alterações mantendo o slug.
5. WHEN alterno a flag `disponivel` THEN o sistema SHALL persistir imediatamente o novo estado.
6. WHEN o título de um novo curso gera slug já existente THEN o sistema SHALL acrescentar sufixo numérico (`-2`, `-3`, ...) e persistir sem erro.
7. WHEN a persistência falha (rede/banco) THEN o sistema SHALL exibir erro, manter os dados preenchidos no formulário e não perder a edição.
8. WHEN clico salvar mais de uma vez em sequência THEN o sistema SHALL persistir uma única versão (botão desabilitado durante o envio; edição é upsert por id).

**Independent Test**: Criar curso de teste pelo painel, vê-lo na lista, editar um campo, alternar a flag duas vezes.

---

### P1-C: Gerenciar congressos ⭐ MVP

**User Story**: Como cliente, quero listar, incluir e editar congressos com sua programação por dia, e marcar disponibilidade, para controlar a agenda de eventos do site.

**Acceptance Criteria**:

1. WHEN abro a lista de congressos THEN o sistema SHALL exibir todos os congressos com nome, datas e estado da flag.
2. WHEN preencho o formulário de novo congresso com os campos obrigatórios (nome, edição, datas, data ISO de início, local, formato, descrição do card) e salvo THEN o sistema SHALL persistir com slug único gerado do nome.
3. WHEN informo data ISO inválida THEN o sistema SHALL indicar o erro e não persistir.
4. WHEN edito a programação (dias, título do dia e itens) THEN o sistema SHALL persistir a lista na ordem definida.
5. WHEN alterno a flag `disponivel` THEN o sistema SHALL persistir imediatamente o novo estado.
6. Regras de falha, duplo clique e slug idênticas a P1-B (AC 6–8).

**Independent Test**: Criar congresso de teste com 2 dias de programação, editar um item do dia 2, alternar a flag.

---

### P1-D: Site lê do banco e publica na hora ⭐ MVP

**User Story**: Como visitante do site, quero ver exatamente os cursos e congressos que o cliente marcou como disponíveis, atualizados logo após ele salvar.

**Acceptance Criteria**:

1. WHEN o site renderiza catálogo de cursos, turmas abertas da home, agenda de congressos e páginas de detalhe THEN o sistema SHALL usar os dados do banco, exibindo apenas itens `disponivel=true`.
2. WHEN um item é salvo/alterado no painel THEN o site SHALL refletir a mudança em no máximo 60 segundos, sem novo deploy.
3. WHEN um item está `disponivel=false` THEN sua página de detalhe SHALL responder 404 e ele SHALL sumir de listas, sliders e footer.
4. WHEN o banco está indisponível na revalidação THEN o site SHALL continuar servindo a última versão gerada (stale), sem erro para o visitante.
5. WHEN o banco é criado THEN o sistema SHALL semear (seed) os 6 cursos e 4 congressos atuais dos mapas de código, todos `disponivel=true`.

**Independent Test**: Alterar título de um curso no painel; recarregar o site em até 60s e ver o novo título; desligar a flag e ver o item sumir (detalhe → 404).

---

### P2: Qualidade de vida no painel

**User Story**: Como cliente, quero que o painel seja fácil de usar no dia a dia.

**Why P2**: Não bloqueia o MVP, mas reduz erro operacional.

**Acceptance Criteria**:

1. WHEN a lista tem itens indisponíveis THEN o sistema SHALL diferenciá-los visualmente (badge "fora do site").
2. WHEN salvo com sucesso THEN o sistema SHALL exibir confirmação visível ("Salvo · já no site").
3. WHEN edito listas (bullets, programa, dias) THEN o sistema SHALL permitir adicionar, remover e reordenar itens sem editar JSON.

---

## Edge Cases

- WHEN todos os cursos de uma categoria estão indisponíveis THEN a fileira da categoria no catálogo SHALL ser omitida (sem seção vazia).
- WHEN todos os congressos estão indisponíveis THEN a agenda SHALL exibir estado vazio amigável ("Novos eventos em breve") em vez de página quebrada.
- WHEN um texto contém caracteres HTML (`<`, `>`, `&`) THEN o site SHALL renderizá-los como texto (escapado), nunca como markup — o conteúdo do banco não injeta HTML.
- WHEN um campo de texto excede limites razoáveis (título > 200 chars, descrição > 2000) THEN o painel SHALL bloquear com mensagem.
- WHEN a sessão expira durante uma edição THEN o salvar SHALL falhar com pedido de novo login, preservando o formulário.

## Dimensions Sweep (Complex — todas as dimensões)

| Dimensão | Resolução |
| --- | --- |
| Input validation & bounds | P1-B/3, P1-C/3, edge cases de limites e escape de HTML |
| Failure / partial-failure | P1-B/7, P1-D/4 (stale em falha de banco) |
| Idempotency / retry / duplicates | P1-B/8 (double-submit), P1-B/6 (slug único) |
| Auth boundaries & rate limits | P1-A/4 (escrita exige sessão, inclusive fora da UI); rate limit de login delegado ao Supabase Auth (padrão da plataforma) |
| Concurrency / ordering | Last-write-wins — assumido (usuário único, AD-002) |
| Data lifecycle / expiry | Sem exclusão nem TTL (AD-003); indisponível = oculto, dados preservados |
| Observability | Colunas `updated_at` automáticas; logs de auth/queries do Supabase. N/A além disso: usuário único, sem SLA |
| External-dependency failure | P1-D/4; painel exibe erro e preserva formulário (P1-B/7) |
| State-transition integrity | N/A: único estado é a flag booleana, sem workflow |

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| ADM-01 | P1-A Login | Design | Pending |
| ADM-02 | P1-A Proteção de escrita | Design | Pending |
| ADM-03 | P1-B CRUD cursos | Design | Pending |
| ADM-04 | P1-B Validação/slug/idempotência | Design | Pending |
| ADM-05 | P1-C CRUD congressos | Design | Pending |
| ADM-06 | P1-C Programação por dia | Design | Pending |
| ADM-07 | P1-D Site lê do banco (só disponíveis) | Design | Pending |
| ADM-08 | P1-D Revalidação ≤60s | Design | Pending |
| ADM-09 | P1-D Resiliência a banco fora (stale) | Design | Pending |
| ADM-10 | P1-D Seed dos dados atuais | Design | Pending |
| ADM-11 | P2 UX do painel | - | Pending |

**Coverage:** 11 total, 0 mapped to tasks, 11 unmapped ⚠️

---

## Success Criteria

- [ ] Cliente cria um curso novo e o vê no site em menos de 60s, sem ajuda do desenvolvedor.
- [ ] Flag desligada remove o item de todas as superfícies do site (listas, sliders, footer, detalhe → 404).
- [ ] Site público permanece funcional com o Supabase indisponível (serve última versão).
- [ ] Nenhuma ação de escrita é possível sem sessão autenticada, nem por chamada direta.
- [ ] Guard rails do design system continuam verdes (o painel segue a paleta e componentes do CLAUDE.md).
