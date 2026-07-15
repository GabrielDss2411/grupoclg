import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock do client Supabase de servidor (Server Actions) -- não bate no banco
// real. `state.supabase` é trocado a cada teste (ver makeSupabaseMock).
const state = { supabase: null };
vi.mock('../lib/supabase/server-actions.js', () => ({
  createClient: () => Promise.resolve(state.supabase),
}));

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
}));

const { revalidateTag, revalidatePath } = await import('next/cache');
const { salvarCurso, salvarCongresso, alternarDisponivel } = await import('../app/admin/actions.js');

// Fake de client Supabase: cobre só as chamadas que as actions realmente
// fazem (auth.getUser, from().select().eq().maybeSingle() para checagem de
// slug, from().insert().select().single() na criação, from().update().eq()
// .select().single() na edição/flag).
//
// Criação usa insert() e edição usa update() -- não upsert() -- porque o
// upsert do PostgREST sempre gera um INSERT ... ON CONFLICT DO UPDATE
// completo: com "slug" ausente do payload de edição (intencional, para
// preservar o valor já persistido), o INSERT falhava com "null value in
// column slug violates not-null constraint" no Postgres real, ANTES de
// chegar na resolução do conflito. Bug real encontrado em UAT com o banco
// de verdade -- o mock anterior (que só simulava upsert) não replicava essa
// constraint e deixou passar. Ver .specs/features/painel-adm/tasks.md.
function makeSupabaseMock({
  user = { id: 'user-1', email: 'grupoclg@codesants.com.br' },
  slugCheckResponses = [],
  insertResult = { data: { id: 'id-1', slug: 'slug-gerado' }, error: null },
  updateResult = { data: { id: 'id-1', slug: 'slug-gerado' }, error: null },
} = {}) {
  const calls = { insert: [], update: [], eqSlug: [] };

  const supabase = {
    auth: {
      getUser: () => Promise.resolve({ data: { user } }),
    },
    from(table) {
      return {
        select() {
          return {
            eq(_col, val) {
              calls.eqSlug.push({ table, val });
              return {
                maybeSingle: () =>
                  Promise.resolve(slugCheckResponses.shift() ?? { data: null, error: null }),
              };
            },
          };
        },
        insert(payload) {
          calls.insert.push({ table, payload });
          return {
            select: () => ({
              single: () => Promise.resolve(insertResult),
            }),
          };
        },
        update(payload) {
          return {
            eq(_col, val) {
              calls.update.push({ table, payload, id: val });
              return {
                select: () => ({
                  single: () => Promise.resolve(updateResult),
                }),
              };
            },
          };
        },
      };
    },
  };

  return { supabase, calls };
}

function cursoFormData(overrides = {}) {
  const fd = new FormData();
  const fields = {
    title: 'Curso de Teste',
    cat: 'Licitações',
    descricao: 'Descrição do curso de teste.',
    poster: '/assets/poster-14133.svg',
    ...overrides,
  };
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== null) fd.set(k, v);
  }
  return fd;
}

function congressoFormData(overrides = {}) {
  const fd = new FormData();
  const fields = {
    nome: 'Congresso de Teste',
    edicao: '1ª edição',
    datas: '10 a 12 de outubro de 2026',
    iso: '2026-10-10',
    local_chip: 'Rio de Janeiro/RJ',
    formato: 'Presencial',
    card_desc: 'Descrição do card de teste.',
    ...overrides,
  };
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== null) fd.set(k, v);
  }
  return fd;
}

beforeEach(() => {
  state.supabase = null;
  vi.clearAllMocks();
});

describe('app/admin/actions.js -- auth obrigatória (AC P1-A/4)', () => {
  it('salvarCurso sem sessão retorna erro de auth e NÃO toca o banco', async () => {
    const { supabase, calls } = makeSupabaseMock({ user: null });
    state.supabase = supabase;

    const result = await salvarCurso(cursoFormData());

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/sess[aã]o/i);
    expect(calls.insert.length).toBe(0);
    expect(calls.update.length).toBe(0);
  });

  it('salvarCongresso sem sessão retorna erro de auth e NÃO toca o banco', async () => {
    const { supabase, calls } = makeSupabaseMock({ user: null });
    state.supabase = supabase;

    const result = await salvarCongresso(congressoFormData());

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/sess[aã]o/i);
    expect(calls.insert.length).toBe(0);
    expect(calls.update.length).toBe(0);
  });

  it('alternarDisponivel sem sessão retorna erro de auth e NÃO toca o banco', async () => {
    const { supabase, calls } = makeSupabaseMock({ user: null });
    state.supabase = supabase;

    const result = await alternarDisponivel('cursos', 'id-1', false);

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/sess[aã]o/i);
    expect(calls.update.length).toBe(0);
  });
});

describe('app/admin/actions.js -- validação de curso (AC P1-B/3, edge case de limites)', () => {
  it('curso sem título retorna erro com o campo faltante e não persiste', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const result = await salvarCurso(cursoFormData({ title: '' }));

    expect(result.ok).toBe(false);
    expect(result.fields).toContain('title');
    expect(calls.insert.length).toBe(0);
  });

  it('curso com título > 200 caracteres retorna erro e não persiste', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const tituloGigante = 'A'.repeat(201);
    const result = await salvarCurso(cursoFormData({ title: tituloGigante }));

    expect(result.ok).toBe(false);
    expect(result.fields).toContain('title');
    expect(calls.insert.length).toBe(0);
  });

  it('curso com descrição > 2000 caracteres retorna erro e não persiste', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const descricaoGigante = 'A'.repeat(2001);
    const result = await salvarCurso(cursoFormData({ descricao: descricaoGigante }));

    expect(result.ok).toBe(false);
    expect(result.fields).toContain('descricao');
    expect(calls.insert.length).toBe(0);
  });
});

describe('app/admin/actions.js -- slug (AC P1-B/4, P1-B/6)', () => {
  it('slug colidindo na criação ganha sufixo -2', async () => {
    const { supabase, calls } = makeSupabaseMock({
      // 1ª consulta: já existe (colide) -- 2ª: livre.
      slugCheckResponses: [{ data: { id: 'outro-id' }, error: null }, { data: null, error: null }],
      insertResult: { data: { id: 'novo-id', slug: 'curso-de-teste-2' }, error: null },
    });
    state.supabase = supabase;

    const result = await salvarCurso(cursoFormData({ title: 'Curso de Teste' }));

    expect(result.ok).toBe(true);
    expect(calls.eqSlug.map((c) => c.val)).toEqual(['curso-de-teste', 'curso-de-teste-2']);
    expect(calls.insert[0].payload.slug).toBe('curso-de-teste-2');
  });

  it('edição de curso existente (com id) preserva o slug -- UPDATE real, não recalcula nem reenvia', async () => {
    const { supabase, calls } = makeSupabaseMock({
      updateResult: { data: { id: 'id-existente', slug: 'slug-original' }, error: null },
    });
    state.supabase = supabase;

    const result = await salvarCurso(cursoFormData({ id: 'id-existente', title: 'Título Editado' }));

    expect(result.ok).toBe(true);
    expect(calls.eqSlug.length).toBe(0); // uniqueSlug nunca chamado na edição
    expect(calls.insert.length).toBe(0); // edição não faz insert
    expect(calls.update[0].id).toBe('id-existente');
    expect(calls.update[0].payload).not.toHaveProperty('slug');
    expect(calls.update[0].payload).not.toHaveProperty('id');
  });

  it('slug colidindo na criação de congresso ganha sufixo -2 (mesma lógica de P1-B/6)', async () => {
    const { supabase, calls } = makeSupabaseMock({
      slugCheckResponses: [{ data: { id: 'outro-id' }, error: null }, { data: null, error: null }],
      insertResult: { data: { id: 'novo-id', slug: 'congresso-de-teste-2' }, error: null },
    });
    state.supabase = supabase;

    const result = await salvarCongresso(congressoFormData({ nome: 'Congresso de Teste' }));

    expect(result.ok).toBe(true);
    expect(calls.eqSlug.map((c) => c.val)).toEqual(['congresso-de-teste', 'congresso-de-teste-2']);
    expect(calls.insert[0].payload.slug).toBe('congresso-de-teste-2');
  });
});

describe('app/admin/actions.js -- validação de congresso (AC P1-C/2, P1-C/3)', () => {
  it('congresso sem nome retorna erro com o campo faltante e não persiste', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const result = await salvarCongresso(congressoFormData({ nome: '' }));

    expect(result.ok).toBe(false);
    expect(result.fields).toContain('nome');
    expect(calls.insert.length).toBe(0);
  });

  it('congresso com ISO inválida ("não é uma data") retorna erro e não persiste', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const result = await salvarCongresso(congressoFormData({ iso: 'não é uma data' }));

    expect(result.ok).toBe(false);
    expect(result.fields).toContain('iso');
    expect(calls.insert.length).toBe(0);
  });

  it('programação (prog) do congresso na edição preserva a ordem definida no form (AC P1-C/4)', async () => {
    const { supabase, calls } = makeSupabaseMock({
      updateResult: { data: { id: 'id-1', slug: 'congresso-de-teste' }, error: null },
    });
    state.supabase = supabase;

    const prog = [
      { dia: 'Dia 1', titulo: 'Abertura', itens: ['Credenciamento'] },
      { dia: 'Dia 2', titulo: 'Encerramento', itens: ['Certificados'] },
    ];
    const result = await salvarCongresso(congressoFormData({ id: 'id-1', prog: JSON.stringify(prog) }));

    expect(result.ok).toBe(true);
    expect(calls.update[0].payload.prog).toEqual(prog);
  });
});

describe('app/admin/actions.js -- sucesso chama revalidateTag/revalidatePath (ADM-08)', () => {
  it('salvarCurso (criação) com sucesso persiste via insert e revalida a tag "cursos" e os paths de detalhe/home', async () => {
    const { supabase, calls } = makeSupabaseMock({
      insertResult: { data: { id: 'id-1', slug: 'curso-de-teste' }, error: null },
    });
    state.supabase = supabase;

    const result = await salvarCurso(cursoFormData());

    expect(result.ok).toBe(true);
    // payload persistido: slug gerado do título (sem colisão) + obrigatórios intactos (AC P1-B/2)
    expect(calls.insert[0].payload.slug).toBe('curso-de-teste');
    expect(calls.insert[0].payload.title).toBe('Curso de Teste');
    expect(calls.insert[0].payload.cat).toBe('Licitações');
    expect(calls.insert[0].payload.descricao).toBe('Descrição do curso de teste.');
    expect(calls.insert[0].payload.poster).toBe('/assets/poster-14133.svg');
    expect(revalidateTag).toHaveBeenCalledWith('cursos');
    expect(revalidatePath).toHaveBeenCalledWith('/cursos/curso-de-teste');
    expect(revalidatePath).toHaveBeenCalledWith('/');
  });

  it('salvarCongresso (criação) com sucesso persiste via insert e revalida a tag "congressos" e os paths de detalhe/lista', async () => {
    const { supabase, calls } = makeSupabaseMock({
      insertResult: { data: { id: 'id-1', slug: 'congresso-de-teste' }, error: null },
    });
    state.supabase = supabase;

    const result = await salvarCongresso(congressoFormData());

    expect(result.ok).toBe(true);
    // payload persistido: slug gerado do nome (sem colisão) + obrigatórios intactos (AC P1-C/2)
    expect(calls.insert[0].payload.slug).toBe('congresso-de-teste');
    expect(calls.insert[0].payload.nome).toBe('Congresso de Teste');
    expect(calls.insert[0].payload.edicao).toBe('1ª edição');
    expect(calls.insert[0].payload.datas).toBe('10 a 12 de outubro de 2026');
    expect(calls.insert[0].payload.iso).toBe('2026-10-10');
    expect(calls.insert[0].payload.local_chip).toBe('Rio de Janeiro/RJ');
    expect(calls.insert[0].payload.formato).toBe('Presencial');
    expect(calls.insert[0].payload.card_desc).toBe('Descrição do card de teste.');
    expect(revalidateTag).toHaveBeenCalledWith('congressos');
    expect(revalidatePath).toHaveBeenCalledWith('/congressos/congresso-de-teste');
    expect(revalidatePath).toHaveBeenCalledWith('/congressos');
  });

  it('salvarCurso (edição) com sucesso persiste via update (não insert) e revalida', async () => {
    const { supabase, calls } = makeSupabaseMock({
      updateResult: { data: { id: 'id-1', slug: 'curso-existente' }, error: null },
    });
    state.supabase = supabase;

    const result = await salvarCurso(cursoFormData({ id: 'id-1', title: 'Título Editado' }));

    expect(result.ok).toBe(true);
    expect(calls.insert.length).toBe(0);
    expect(calls.update[0].id).toBe('id-1');
    expect(calls.update[0].payload.title).toBe('Título Editado');
    expect(revalidateTag).toHaveBeenCalledWith('cursos');
    expect(revalidatePath).toHaveBeenCalledWith('/cursos/curso-existente');
  });

  it('alternarDisponivel(cursos) persiste o novo valor da flag e revalida tag/paths (AC P1-B/5)', async () => {
    const { supabase, calls } = makeSupabaseMock({
      updateResult: { data: { id: 'id-1', slug: 'curso-de-teste' }, error: null },
    });
    state.supabase = supabase;

    const result = await alternarDisponivel('cursos', 'id-1', false);

    expect(result.ok).toBe(true);
    // estado realmente persistido (não só a chamada) -- payload/conjunction rule
    expect(calls.update[0].payload).toEqual({ disponivel: false });
    expect(calls.update[0].id).toBe('id-1');
    expect(revalidateTag).toHaveBeenCalledWith('cursos');
    expect(revalidatePath).toHaveBeenCalledWith('/cursos');
    expect(revalidatePath).toHaveBeenCalledWith('/cursos/curso-de-teste');
    expect(revalidatePath).toHaveBeenCalledWith('/');
  });

  it('alternarDisponivel(congressos) persiste o novo valor da flag e revalida tag/paths, sem tocar a home (AC P1-C/5)', async () => {
    const { supabase, calls } = makeSupabaseMock({
      updateResult: { data: { id: 'id-9', slug: 'congresso-de-teste' }, error: null },
    });
    state.supabase = supabase;

    const result = await alternarDisponivel('congressos', 'id-9', true);

    expect(result.ok).toBe(true);
    expect(calls.update[0].payload).toEqual({ disponivel: true });
    expect(calls.update[0].id).toBe('id-9');
    expect(revalidateTag).toHaveBeenCalledWith('congressos');
    expect(revalidatePath).toHaveBeenCalledWith('/congressos');
    expect(revalidatePath).toHaveBeenCalledWith('/congressos/congresso-de-teste');
    expect(revalidatePath).not.toHaveBeenCalledWith('/'); // home não lista congressos
  });
});

describe('app/admin/actions.js -- falha de banco não lança (AC P1-B/7)', () => {
  it('salvarCurso (criação): falha do mock no insert retorna { ok:false } sem lançar', async () => {
    const { supabase, calls } = makeSupabaseMock({
      insertResult: { data: null, error: new Error('conexão recusada') },
    });
    state.supabase = supabase;

    await expect(salvarCurso(cursoFormData())).resolves.toEqual(
      expect.objectContaining({ ok: false })
    );
    expect(calls.insert.length).toBe(1); // tentou, mas não persistiu
  });

  it('salvarCurso (edição): falha do mock no update retorna { ok:false } sem lançar', async () => {
    const { supabase } = makeSupabaseMock({
      updateResult: { data: null, error: new Error('conexão recusada') },
    });
    state.supabase = supabase;

    await expect(salvarCurso(cursoFormData({ id: 'id-1' }))).resolves.toEqual(
      expect.objectContaining({ ok: false })
    );
  });

  it('salvarCongresso: falha do mock no insert retorna { ok:false } sem lançar', async () => {
    const { supabase } = makeSupabaseMock({
      insertResult: { data: null, error: new Error('conexão recusada') },
    });
    state.supabase = supabase;

    await expect(salvarCongresso(congressoFormData())).resolves.toEqual(
      expect.objectContaining({ ok: false })
    );
  });

  it('alternarDisponivel: falha do mock no update retorna { ok:false } sem lançar', async () => {
    const { supabase } = makeSupabaseMock({
      updateResult: { data: null, error: new Error('conexão recusada') },
    });
    state.supabase = supabase;

    await expect(alternarDisponivel('cursos', 'id-1', true)).resolves.toEqual(
      expect.objectContaining({ ok: false })
    );
  });
});

describe('app/admin/actions.js -- idempotência do duplo clique (AC P1-B/8)', () => {
  it('chamar salvarCurso duas vezes com o mesmo id faz update as duas vezes -- nunca insert novo', async () => {
    // Simula duplo clique numa edição: o botão do form fica desabilitado
    // durante o envio (T19), mas a garantia de fundo é esta: update por id
    // não cria linha nova mesmo se a action for chamada mais de uma vez.
    const { supabase, calls } = makeSupabaseMock({
      updateResult: { data: { id: 'id-1', slug: 'slug-original' }, error: null },
    });
    state.supabase = supabase;

    const fd = cursoFormData({ id: 'id-1', title: 'Curso Existente' });
    const [r1, r2] = await Promise.all([salvarCurso(fd), salvarCurso(fd)]);

    expect(r1.ok).toBe(true);
    expect(r2.ok).toBe(true);
    expect(calls.insert.length).toBe(0);
    expect(calls.update.length).toBe(2);
    // as duas chamadas usam o mesmo id (caminho de update) e nenhuma delas
    // gera slug novo -- não há criação de uma segunda linha.
    expect(calls.update[0].id).toBe('id-1');
    expect(calls.update[1].id).toBe('id-1');
    expect(calls.update[0].payload).not.toHaveProperty('slug');
    expect(calls.update[1].payload).not.toHaveProperty('slug');
  });

  it('chamar salvarCongresso duas vezes com o mesmo id faz update as duas vezes -- nunca insert novo (AC P1-C/6, regras idênticas a P1-B/8)', async () => {
    const { supabase, calls } = makeSupabaseMock({
      updateResult: { data: { id: 'id-2', slug: 'slug-original' }, error: null },
    });
    state.supabase = supabase;

    const fd = congressoFormData({ id: 'id-2', nome: 'Congresso Existente' });
    const [r1, r2] = await Promise.all([salvarCongresso(fd), salvarCongresso(fd)]);

    expect(r1.ok).toBe(true);
    expect(r2.ok).toBe(true);
    expect(calls.insert.length).toBe(0);
    expect(calls.update.length).toBe(2);
    expect(calls.update[0].id).toBe('id-2');
    expect(calls.update[1].id).toBe('id-2');
    expect(calls.update[0].payload).not.toHaveProperty('slug');
    expect(calls.update[1].payload).not.toHaveProperty('slug');
  });
});
