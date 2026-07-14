# Painel Administrativo — Context

**Gathered:** 2026-07-13
**Spec:** `.specs/features/painel-adm/spec.md`
**Status:** Ready for design

---

## Feature Boundary

Painel web em `/admin` para o cliente incluir/editar cursos e congressos e controlar a flag `disponivel`; o site público passa a ler esse conteúdo do Supabase com publicação imediata. Nada além de cursos, congressos e a flag.

---

## Implementation Decisions

### Backend / armazenamento

- Supabase (Postgres) como fonte de verdade do conteúdo dinâmico (AD-001).
- Mapas atuais em `lib/cursos-data.js` / `lib/congressos-data.js` viram seed inicial do banco.

### Autenticação

- Supabase Auth com e-mail/senha (AD-002).
- Um único usuário (o cliente), criado manualmente pelo desenvolvedor. Sem tela de cadastro.

### Operações

- Incluir + editar + alternar flag. Sem exclusão pela UI (AD-003).

### Publicação

- Imediata ao salvar, com revalidação on-demand do site (AD-004). A flag `disponivel` cumpre o papel de rascunho.

### Agent's Discretion

- Layout e navegação do painel (seguindo o design system do CLAUDE.md).
- Modelagem exata das tabelas/colunas e formato do campo de programação.
- Mecânica de revalidação (revalidatePath/tag) e estratégia de fallback stale.
- Biblioteca de formulário (ou nenhuma).

### Declined / Undiscussed Gray Areas → Assumptions

- Localização do painel, campos editáveis, pôster sem upload, slug automático, last-write-wins, datas como texto curto, RLS de leitura pública — registrados na tabela de Assumptions da spec.

---

## Specific References

- Modelo mental do cliente: "incluir novos cursos, eventos e marcar uma flag disponível no site ou não" (pedido literal).
- O painel deve seguir o design system existente (paleta navy/dourado, botões pill, CLAUDE.md).

---

## Deferred Ideas

- Upload de imagens/pôsteres próprios.
- Gestão de múltiplos usuários/papéis.
- Histórico de alterações / auditoria além de `updated_at`.
